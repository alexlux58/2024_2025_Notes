#!/usr/bin/env python3
import base64
import json
import os
import re
import shutil
import shlex
import subprocess
import sys
import tarfile
import time
from io import BytesIO
from pathlib import Path

AWX_NAMESPACE = "awx"
INSTALL_DIR = Path.home() / "awx-install"
OPERATOR_DIR = INSTALL_DIR / "awx-operator"
KUSTOMIZATION = INSTALL_DIR / "kustomization.yaml"
AWX_CR = INSTALL_DIR / "awx.yaml"
K3S_KUBECONFIG = Path("/etc/rancher/k3s/k3s.yaml")


def run(cmd, check=True, capture_output=False, env=None):
    if isinstance(cmd, str):
        cmd_list = shlex.split(cmd)
    else:
        cmd_list = cmd
    print(f"→ {' '.join(cmd_list)}")
    r = subprocess.run(cmd_list, check=check,
                       capture_output=capture_output, text=True, env=env)
    return r.stdout.strip() if capture_output else ""


def run_sh(cmd, check=True, capture_output=False, env=None):
    print(f"→ {cmd}")
    r = subprocess.run(cmd, shell=True, check=check,
                       capture_output=capture_output, text=True, env=env)
    return r.stdout.strip() if capture_output else ""


def sudo():
    return "sudo " if os.geteuid() != 0 else ""


def require_cmd(cmd, pkg_hint=None):
    return bool(shutil.which(cmd))


def apt_install(packages):
    run(f"{sudo()}apt-get update -y")
    run(f"{sudo()}apt-get install -y {' '.join(packages)}")


def ensure_basics():
    print("\n=== 1) Preparing system packages ===")
    need = []
    for cmd, pkg in [("curl", "curl"), ("git", "git"), ("jq", "jq"), ("base64", "coreutils")]:
        if not require_cmd(cmd):
            need.append(pkg)
    if need:
        apt_install(list(dict.fromkeys(need)))


def ensure_k3s():
    print("\n=== 2) Installing/validating k3s (single-node Kubernetes) ===")
    if not (Path("/usr/local/bin/k3s").exists() or Path("/usr/bin/k3s").exists()):
        run_sh("curl -sfL https://get.k3s.io | " + sudo() +
               "sh -s - --write-kubeconfig-mode 644", check=True)

    try:
        run(f"{sudo()}systemctl is-active k3s",
            check=True, capture_output=True)
    except subprocess.CalledProcessError:
        logs = run(f"{sudo()}journalctl -u k3s -n 120 --no-pager",
                   check=False, capture_output=True)
        print(logs)
        raise SystemExit("[x] k3s service is not active. See logs above.")

    if not K3S_KUBECONFIG.exists():
        logs = run(f"{sudo()}journalctl -u k3s -n 120 --no-pager",
                   check=False, capture_output=True)
        print(logs)
        raise SystemExit(
            "[x] k3s installed but kubeconfig not found at /etc/rancher/k3s/k3s.yaml.")

    ensure_kubeconfig_for_user()
    wait_for_node_ready()


def ensure_kubeconfig_for_user():
    print("\n=== 3) Wiring kubectl for current user ===")
    kubeconfig_path = Path.home() / ".kube" / "config"
    kubeconfig_path.parent.mkdir(parents=True, exist_ok=True)
    run(f"{sudo()}cp {K3S_KUBECONFIG} {kubeconfig_path}")
    run(f"{sudo()}chown {os.getuid()}:{os.getgid()} {kubeconfig_path}")

    if not shutil.which("kubectl"):
        if Path("/usr/local/bin/k3s").exists() and not Path("/usr/local/bin/kubectl").exists():
            run(f"{sudo()}ln -sf /usr/local/bin/k3s /usr/local/bin/kubectl")
        elif Path("/usr/bin/k3s").exists() and not Path("/usr/bin/kubectl").exists():
            run(f"{sudo()}ln -sf /usr/bin/k3s /usr/bin/kubectl")

    for _ in range(60):
        try:
            out = run("kubectl get nodes -o name",
                      capture_output=True, check=True)
            if out.strip():
                print("kubectl is configured.")
                return
        except subprocess.CalledProcessError:
            pass
        time.sleep(2)
    raise SystemExit("[x] Could not talk to the cluster with kubectl.")


def wait_for_node_ready():
    print("Waiting for the k3s node to become Ready…")
    try:
        run("kubectl wait --for=condition=Ready node --all --timeout=300s")
    except subprocess.CalledProcessError:
        nodes = run("kubectl get nodes -o wide",
                    capture_output=True, check=False)
        print(nodes)
        raise SystemExit("[x] Node did not become Ready in time.")


def fetch_latest_operator_tag():
    print("\n=== 4) Fetching latest AWX Operator release tag from GitHub ===")
    try:
        raw = run(
            'curl -fsSL https://api.github.com/repos/ansible/awx-operator/releases/latest', capture_output=True)
        data = json.loads(raw)
        tag = data.get("tag_name", "")
        if not tag:
            raise ValueError("No tag_name in response")
        print(f"Latest operator tag: {tag}")
        return tag
    except Exception as e:
        print(f"[!] Could not fetch latest tag automatically ({e}).")
        tag = input("Enter AWX Operator tag (e.g., 2.19.1): ").strip()
        return tag


def fetch_operator_sources(tag: str):
    """
    Ensure OPERATOR_DIR has the awx-operator sources for the given tag.
    Prefer `git clone --branch <tag> --depth 1`. If that fails, download the tarball.
    """
    print("\n=== 5) Fetching AWX Operator sources locally ===")
    INSTALL_DIR.mkdir(parents=True, exist_ok=True)
    if OPERATOR_DIR.exists():
        print(f"{OPERATOR_DIR} already present; reusing.")
        return

    # Try git first
    try:
        run(f"git clone --branch {tag} --depth 1 https://github.com/ansible/awx-operator {OPERATOR_DIR}")
        return
    except subprocess.CalledProcessError:
        print("[!] git clone failed; falling back to tarball download.")

    # Tarball fallback (no git required)
    import urllib.request
    url = f"https://github.com/ansible/awx-operator/archive/refs/tags/{tag}.tar.gz"
    print(f"→ downloading tarball {url}")
    with urllib.request.urlopen(url) as resp:
        data = resp.read()
    with tarfile.open(fileobj=BytesIO(data), mode="r:gz") as tf:
        # Tarball root is awx-operator-<tag>/
        root = tf.getmembers()[0].name.split('/')[0]
        tf.extractall(INSTALL_DIR)
        (INSTALL_DIR / root).rename(OPERATOR_DIR)
    print("Operator sources extracted.")


def write_kustomization(tag):
    print("\n=== 6) Writing kustomization.yaml (local path) ===")
    content = f"""apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
# Use the local copy of the operator to avoid remote fetch timeouts
resources:
  - ./awx-operator/config/default
images:
  - name: quay.io/ansible/awx-operator
    newTag: {tag}
namespace: {AWX_NAMESPACE}
"""
    KUSTOMIZATION.write_text(content)
    print(f"Wrote {KUSTOMIZATION}")


def ensure_namespace():
    print("\n=== 7) Creating namespace (if missing) ===")
    run(f"kubectl create namespace {AWX_NAMESPACE}", check=False)


def apply_operator():
    print("\n=== 8) Applying AWX Operator manifests ===")
    run(f"kubectl apply -k {INSTALL_DIR}")

    print("Waiting for AWX Operator to become Ready…")
    selectors = [
        "-l control-plane=controller-manager",
        "-l name=awx-operator-controller-manager",
        "-l app.kubernetes.io/name=awx-operator",
    ]
    ok = False
    for sel in selectors:
        try:
            run(f"kubectl -n {AWX_NAMESPACE} wait --for=condition=Ready pod {sel} --timeout=300s")
            ok = True
            break
        except subprocess.CalledProcessError:
            pass
    if not ok:
        pods = run(
            f"kubectl -n {AWX_NAMESPACE} get pods -o wide", capture_output=True, check=False)
        print(pods)
        raise SystemExit(
            "[x] AWX Operator did not become Ready. Check: kubectl -n awx get pods; kubectl -n awx logs deploy/awx-operator-controller-manager -c manager")


def write_awx_cr(service_type="NodePort"):
    print("\n=== 9) Creating AWX Custom Resource (instance) ===")
    if not AWX_CR.exists():
        AWX_CR.write_text(f"""apiVersion: awx.ansible.com/v1beta1
kind: AWX
metadata:
  name: awx
  namespace: {AWX_NAMESPACE}
spec:
  service_type: {service_type}
""")
        # Make sure kustomize applies this CR (append if not present)
        k = KUSTOMIZATION.read_text()
        if "awx.yaml" not in k:
            if "resources:" in k:
                KUSTOMIZATION.write_text(
                    k.replace("resources:\n", "resources:\n  - awx.yaml\n", 1))
            else:
                KUSTOMIZATION.write_text(k + "\nresources:\n  - awx.yaml\n")
        print(f"Wrote {AWX_CR}")
    else:
        print(f"{AWX_CR} already exists; leaving as-is.")


def apply_awx_cr():
    run(f"kubectl apply -k {INSTALL_DIR}")
    print("Waiting for AWX to deploy (this can take several minutes)…")
    run(f"kubectl -n {AWX_NAMESPACE} wait --for=condition=Ready pod --all --timeout=900s")


def get_admin_password():
    try:
        pw_b64 = run(
            f"kubectl -n {AWX_NAMESPACE} get secret awx-admin-password -o jsonpath='{{.data.password}}'", capture_output=True)
        if pw_b64:
            return base64.b64decode(pw_b64).decode().strip()
    except subprocess.CalledProcessError:
        pass
    return None


def get_nodeport_url():
    svcs = json.loads(
        run(f"kubectl -n {AWX_NAMESPACE} get svc -o json", capture_output=True))
    node_port = None
    for item in svcs.get("items", []):
        if item["spec"].get("type") == "NodePort" and item["metadata"]["name"].startswith("awx"):
            for p in item["spec"].get("ports", []):
                if p.get("port") == 80 and "nodePort" in p:
                    node_port = p["nodePort"]
                    break
    if not node_port:
        return None
    vm_ip = (run("hostname -I", capture_output=True).split()
             or ["127.0.0.1"])[0]
    return f"http://{vm_ip}:{node_port}"


def main():
    ensure_basics()
    ensure_k3s()
    tag = fetch_latest_operator_tag()
    fetch_operator_sources(tag)          # NEW: local clone/tarball
    write_kustomization(tag)             # points to local ./awx-operator/...
    ensure_namespace()
    apply_operator()
    write_awx_cr(service_type="NodePort")
    apply_awx_cr()

    url = get_nodeport_url()
    pw = get_admin_password()

    print("\n✅ AWX installation complete.")
    print(f"AWX URL: {url or '(run: kubectl -n awx get svc | grep awx)'}")
    print("Admin username: admin")
    print(
        f"Admin password: {pw or '(run: kubectl -n awx get secret awx-admin-password -o jsonpath={.data.password} | base64 -d; echo)'}")
    print("\nNext steps (optional): Ingress + TLS with cert-manager for a friendly HTTPS hostname.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n[!] Aborted by user.")
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(
            f"\n[x] Command failed: {e}\nSTDOUT: {e.stdout}\nSTDERR: {e.stderr}")
        sys.exit(e.returncode)
