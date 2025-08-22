# High Load with High I/O Wait — Troubleshooting Guide (K3s + Sourcegraph + Prometheus/MinIO)

**Author:** Alex’s Mentor (ChatGPT)  
**Use case:** Linux VM/host running K3s and the Sourcegraph stack (+ Prometheus, Grafana, MinIO) showing **very high load averages** with **CPU idle ≈ 0%** and **I/O wait (wa) ≫ 50%**.  
**Real fix in this case:** Increasing RAM resolved the issue by allowing enough page cache and avoiding constant read amplification under heavy startup/indexing I/O.

---

## 0) At‑a‑glance checklist

- [ ] Confirm symptoms: `top` shows **wa ≥ 30%** and load >> vCPUs, many tasks in **D** state.  
- [ ] Check memory pressure: free memory low, `kswapd` active, page cache tiny, lots of page faults.  
- [ ] Confirm disk saturation: `iostat -x` high `%util`/`await`, `flush-253:0` or similar writeback worker busy.  
- [ ] Identify culprits: `pidstat -d`, `iotop` — typically `zoekt-*`, `gitserver`, `repo-updater`, Prometheus, MinIO.  
- [ ] **Immediate relief:** scale down noisy workloads (indexing/updaters/monitoring), stagger startup.  
- [ ] **Structural fix:** add RAM (and/or faster SSD/NVMe), place data dirs on fast disks, tune concurrency.  

---

## 1) Quick triage (5–10 minutes)

### 1.1 Confirm the pattern
```bash
top -H -o %wa
# Expect: wa very high (e.g., 60–98%), many tasks in 'D' state.
```

### 1.2 Memory snapshot
```bash
free -h
vmstat 1 10      # Look at 'si/so' (swap in/out) and 'b' (blocked) columns
cat /proc/meminfo | egrep 'MemTotal|MemFree|MemAvailable|Dirty|Writeback'
ps aux --sort=-%mem | head -n 20
```

**What it means**
- If `MemAvailable` is small and `Dirty` is constantly large or climbing, the kernel is juggling cache/writeback under tight memory.  
- Low available RAM → smaller page cache → more read I/O → higher I/O wait.

### 1.3 Disk saturation
```bash
iostat -x 1 10   # Look for %util ~100%, high await/svctm, low r/s throughput
pidstat -d 1     # Per-process rKB/s, wKB/s, cancelled writeback
sudo iotop -oPa  # Top I/O consumers (requires iotop package)
dmesg -T | egrep -i 'blk|nvme|sda|i/o error|writeback|hung task|ext4'
```

**Red flags**
- `%util` ~100% and `await` in tens/hundreds of ms → disk is saturated.  
- kworker `flush-<major:minor>` threads busy → writeback pressure.

---

## 2) Immediate mitigations (safe to run)

> Goal: reduce the concurrent I/O storm from Sourcegraph/K3s while the system stabilizes.

### 2.1 Temporarily scale down noisy workloads
```bash
kubectl get ns
kubectl get deploy -A | egrep -i 'zoekt|gitserver|repo|prom|grafana|minio|worker|frontend'

# Examples (adjust namespace names accordingly):
kubectl -n sourcegraph scale deploy zoekt-webserver --replicas=0
kubectl -n sourcegraph scale deploy zoekt-indexserver --replicas=0  # if present
kubectl -n sourcegraph scale deploy repo-updater --replicas=0
kubectl -n sourcegraph scale deploy prom-server --replicas=0        # or prometheus
kubectl -n sourcegraph scale deploy grafana --replicas=0
# Keep essentials at minimal:
kubectl -n sourcegraph scale deploy gitserver --replicas=1
kubectl -n sourcegraph scale deploy frontend --replicas=1
```

### 2.2 Stagger startup
- Bring up `k3s-server` and storage backends first.  
- Then start Sourcegraph core (`frontend`, `gitserver`).  
- Add `zoekt` indexers/repo-updater **after** the host cache warms up.

### 2.3 Tame writeback bursts (temporary sysctls)
```bash
# Reduce burstiness by kicking writeback earlier
sudo sysctl -w vm.dirty_background_ratio=5
sudo sysctl -w vm.dirty_ratio=10
# Optionally make readahead smaller on slow disks (identify device as needed)
sudo blockdev --getra /dev/sda
sudo blockdev --setra 128 /dev/sda
```

> Note: These are safe runtime tweaks; persist in `/etc/sysctl.d/*.conf` if they help.

---

## 3) Why adding RAM fixes this

- **Indexing (zoekt/gitserver)** and **time-series** (Prometheus) engines touch a lot of small files. With insufficient RAM, the page cache stays tiny → **every read misses** → **disk churn** → **I/O wait skyrockets**.  
- More RAM = larger cache = dramatically fewer physical reads. Writeback also smooths out because the kernel has room to buffer changes without blocking readers/writers immediately.

**Rule of thumb (lab/small installs):**
- Baseline: **8–16 GB** for K3s + Sourcegraph core, more if indexing many repos.  
- Prometheus + MinIO add overhead; add **an extra few GB** for each if used seriously.  
- If you see `kswapd` active or `MemAvailable` hovering very low during normal load, you likely need more RAM.

---

## 4) Deep dive diagnostics (optional but useful)

### 4.1 Workload-level stats
```bash
# Container-level I/O (if cgroup v2):
cat /sys/fs/cgroup/<slice or container>/io.stat

# Kubernetes events for restarts and throttling
kubectl get events -A --sort-by=.lastTimestamp | tail -n 50
```

### 4.2 Filesystem and mount options
```bash
findmnt -t ext4,xfs
mount | egrep 'ext4|xfs'
# Prefer 'noatime' where appropriate; ensure journaling modes are sane
```

### 4.3 Storage backend health
- If on **VM (Proxmox/ESXi/Cloud)**: check the storage datastore latency, cache mode (writeback vs writethrough), and guaranteed IOPS.  
- If using **LVM** or **ZFS**: confirm ZFS ARC size or LVM cache settings.  
- If on **cloud block storage**: watch burst credits / baseline IOPS limits.

---

## 5) Sourcegraph/K3s specific levers

### 5.1 Concurrency & scheduling
- **Zoekt**: limit index concurrency via deployment env/args; split indices across multiple disks if possible.
- **gitserver**: cap clone/fetch concurrency and disk workers.
- **repo-updater**: increase intervals or disable auto-updates during heavy operations.
- **Prometheus**: reduce retention and scrape frequency; remote-write if feasible.
- **MinIO**: keep only what’s needed; avoid large parallel uploads during initial warm-up.

### 5.2 Place hot data on fast storage
- `zoekt` indices, `gitserver` repos, Prometheus TSDB, and MinIO buckets should live on **SSD/NVMe**.  
- Verify your K3s storage class points to the fast device. With local-path provisioner, ensure its path is on SSD/NVMe.

### 5.3 Stagger jobs
- Use backoff/cron windows for indexing and repo updates during low traffic periods.

---

## 6) Memory‑specific checks & mitigations

### 6.1 Detect pressure
```bash
grep -A2 -E 'low|high|min' /proc/zoneinfo | head -n 50
cat /proc/pressure/memory     # PSI if available
```

### 6.2 Short‑term safety nets
- **Add swap** (small) to prevent OOM while you scale:  
  *Caveat:* swap can **increase** I/O wait; keep it small and temporary.
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo swapon -a
```
- Increase RAM limits/requests for the hot pods if your node has room.

---

## 7) Disk‑specific checks & mitigations

### 7.1 Confirm saturation
```bash
iostat -x 1 10   # %util ~100%, high await => saturated
```
### 7.2 Options
- Move hot data to **faster media** (NVMe).  
- Spread writes: separate disks/vmdks for `zoekt` vs Prometheus.  
- For cloud volumes, pick classes with higher baseline IOPS; provisioned IOPS if necessary.

---

## 8) Permanent hardening

- **RAM**: size for working set + cache; plan **headroom** (30–50%) for spikes.  
- **Storage**: SSD/NVMe for hot paths; verify storage class mapping.  
- **Concurrency**: tune Sourcegraph `zoekt/gitserver` and Prometheus retention.  
- **Boot order**: stagger heavy services; bake systemd dependencies if running outside K8s.  
- **Monitoring**: alert on `%wa > 20%` sustained, `iostat %util > 80%`, and `MemAvailable < 10% of RAM`.

---

## 9) Runbook (copy/paste)

```bash
# 1) Snapshot
echo "== TOP =="; top -b -n1 | head -n 15
echo "== FREE =="; free -h
echo "== VMSTAT =="; vmstat 1 5
echo "== IOSTAT =="; iostat -x 1 5
echo "== PIDSTAT =="; pidstat -d 1 5
echo "== IOTOP (optional) =="; sudo iotop -oPa -t -d 2 -n 5
echo "== DMSG =="; dmesg -T | tail -n 100

# 2) Immediate relief (adjust ns/name as needed)
kubectl -n sourcegraph scale deploy zoekt-webserver --replicas=0 || true
kubectl -n sourcegraph scale deploy zoekt-indexserver --replicas=0 || true
kubectl -n sourcegraph scale deploy repo-updater --replicas=0 || true
kubectl -n sourcegraph scale deploy prom-server --replicas=0 || true
kubectl -n sourcegraph scale deploy grafana --replicas=0 || true

# 3) Optional writeback tuning (runtime)
sudo sysctl -w vm.dirty_background_ratio=5
sudo sysctl -w vm.dirty_ratio=10

# 4) After stabilizing, re-enable components gradually
kubectl -n sourcegraph scale deploy gitserver --replicas=1
kubectl -n sourcegraph scale deploy frontend --replicas=1
sleep 120
kubectl -n sourcegraph scale deploy repo-updater --replicas=1
sleep 120
kubectl -n sourcegraph scale deploy zoekt-webserver --replicas=1
```

---

## 10) What “healthy” looks like

- `%Cpu(s)` I/O wait (**wa**) consistently **< 10%** (spikes OK).  
- `iostat -x`: `%util` well **< 70%** most of the time, reasonable `await`.  
- Load average near **# of vCPUs** or lower during steady state.  
- MemAvailable not chronically low; swap mostly idle.  
- Indexing completes, steady small I/O from Prometheus/MinIO.

---

## Appendix: Notes for future-you

- If you see `flush-253:0` (or other major:minor) busy, map it to the device with `lsblk -o NAME,MAJ:MIN`.  
- On Proxmox, check the storage **cache mode** and **latency** in node graphs; use **write-back** with a BBU/UPS.  
- On cloud block storage, consider **provisioned IOPS** or higher tiers during initial bulk indexing.

---

**TL;DR**: The load looked scary because tasks were stuck in disk I/O. The **real bottleneck was memory** — too little page cache made every read hit disk. **Adding RAM** (and optionally throttling initial indexing) fixes the core problem and keeps wa down.
