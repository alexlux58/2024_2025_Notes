# AWX Automated Installer (Ubuntu + K3s)

This repository provides a **Python automation script** (`awx_install.py`) that installs and configures **AWX** (the open-source upstream project of Red Hat Ansible Tower) on an **Ubuntu Server VM** using **K3s (lightweight Kubernetes)**.

---

## 🚀 Features
- Installs required dependencies (Docker, Python packages, Kubernetes CLI).
- Deploys **K3s** (single-node Kubernetes).
- Installs **AWX Operator** via `kubectl apply`.
- Creates an **AWX instance** automatically.
- Exposes AWX UI via a NodePort service.
- Generates an `admin` password secret for first login.

---

## 📦 Requirements
- Ubuntu Server 20.04+ (VM or bare-metal).
- Minimum resources:
  - **4 vCPUs**
  - **4 GB RAM** (8 GB recommended)
  - **20 GB disk**
- Internet access to pull container images.

---

## 🔧 Usage

### 1. Clone and run the script
```bash
git clone https://github.com/your-repo/awx-automation.git
cd awx-automation
python3 awx_install.py
```

### 2. Verify installation
Check pods:
```bash
kubectl -n awx get pods
```

All pods should be in **Running** state:
```
NAME                              READY   STATUS    RESTARTS   AGE
awx-operator-controller-manager   2/2     Running   0          3m
awx-abcdef-1234-xyz               4/4     Running   0          2m
awx-postgres-15-0                 1/1     Running   0          2m
```

### 3. Access the AWX UI
Find the NodePort:
```bash
kubectl -n awx get svc
```
Example:
```
awx-service   NodePort   10.43.120.55   <none>   80:32204/TCP   5m
```

Open in a browser:
```
http://<your-server-ip>:32204
```

### 4. Get admin password
```bash
kubectl -n awx get secret awx-admin-password -o jsonpath="{.data.password}" | base64 --decode
```

Login:
- **Username:** `admin`
- **Password:** (from above command)

---

## 📘 Kubernetes Commands

### Check namespace resources
```bash
kubectl -n awx get all
```

### Inspect pod logs
```bash
kubectl -n awx logs deploy/awx -c awx-web
kubectl -n awx logs deploy/awx -c awx-task
kubectl -n awx logs statefulset/awx-postgres-15
```

### Describe pod (debugging crash)
```bash
kubectl -n awx describe pod <pod-name>
```

### Exec into a pod
```bash
kubectl -n awx exec -it deploy/awx -- bash
```

---

## 🛠️ Troubleshooting

### ❌ UI shows “Server Error”
This usually means AWX web is running but can’t reach backend services.

1. **Check pods**
   ```bash
   kubectl -n awx get pods
   ```
   Look for `CrashLoopBackOff` or `Error`.

2. **Check logs**
   ```bash
   kubectl -n awx logs deploy/awx -c awx-web --tail=50
   kubectl -n awx logs deploy/awx -c awx-task --tail=50
   kubectl -n awx logs statefulset/awx-postgres-15 --tail=50
   ```

3. **Verify database connectivity**
   ```bash
   kubectl -n awx exec -it deploy/awx -- bash
   psql -h awx-postgres-15 -U awx -d awx
   ```

4. **Check secrets**
   ```bash
   kubectl -n awx get secrets
   ```

5. **Resource issues**
   - Ensure **≥4 GB RAM** free.
   - Increase VM resources if pods keep restarting.

---

## 📚 References
- [AWX Operator Docs](https://github.com/ansible/awx-operator)
- [K3s Documentation](https://rancher.com/docs/k3s/latest/en/)

---

## ✅ Notes
- AWX is **upstream open-source**; Red Hat Ansible Tower is the **enterprise version**.
- This script is meant for **lab/test environments**. For production, consider a hardened Kubernetes setup.
