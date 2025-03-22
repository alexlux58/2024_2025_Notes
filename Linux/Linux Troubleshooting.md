# Linux Troubleshooting

## "USE" Method

- **U**tilization: How busy is the resource?
- **S**aturation: How much extra work is waiting or queued?
- **E**rrors: Is there anything that's failing or producing errors?

## Basic System Stats

- **Check uptime** (how long the system has been running) with:
  - `uptime`
  - `top`
  - `w`

---

## Key Commands & Their Uses

1.  **dmesg**

    - **Purpose**: Displays the kernel buffer (kernel ring buffer messages).
    - **Typical Use**: Look for hardware errors, driver information, and kernel-level events.

2.  **vmstat**

    - **Purpose**: Reports on virtual memory usage.
    - **Typical Use**: Observe processes, memory, paging, block IO, interrupts, and CPU activity.

3.  **pidstat**

    - **Purpose**: Checks every PID (process) status.
    - **Typical Use**: Monitor CPU usage, memory usage, and I/O usage on a per-process basis.

4.  **mtr**

    - **Purpose**: Combines the functionality of `traceroute` and `ping` to show network latency and packet loss.
    - **Typical Use**: Diagnose network connection issues to a host over time, see if any hop has high latency or packet drops.

5.  **mpstat**

    - **Purpose**: Shows statistics for each CPU/core usage.
    - **Typical Use**: Identify if certain cores are heavily utilized (helpful for multi-core systems).

6.  **iostat**

    - **Purpose**: Checks disk I/O status.
    - **Typical Use**: Monitor performance of storage devices (e.g., how busy your disks are, read/write throughput).

7.  **free**

    - **Purpose**: Shows memory usage statistics.
    - **Typical Use**: Quickly check total memory, used memory, free memory, swap usage, etc.

8.  **ifconfig** (or `ip addr` / `ip link` on more modern systems)

    - **Purpose**: Shows network interface configuration.
    - **Typical Use**: View or configure IP addresses and network interfaces.

9.  **sar**

    - **Purpose**: Provides a historical view of system performance (CPU usage, memory usage, I/O, network, etc.).
    - **Typical Use**: Collect performance data over time; can help find anomalies or performance bottlenecks historically.

10. **ss**

    - **Purpose**: Shows socket statistics and connection performance.
    - **Typical Use**: View all current TCP/UDP connections, ports in use, or sockets in various states.

11. **iftop**

    - **Purpose**: Monitors network performance in real time.
    - **Typical Use**: See which hosts are using the most bandwidth, useful for diagnosing sudden network spikes.

12. **smem**

    - **Purpose**: Shows memory usage allocated per process in a more detailed manner.
    - **Typical Use**: Determine which processes are consuming the most RAM (both private and shared memory).

13. **bmon**

    - **Purpose**: Bandwidth monitor and rate estimator.
    - **Typical Use**: Real-time bandwidth usage on interfaces, useful for diagnosing network performance.

14. **nethogs**

    - **Purpose**: Monitors network traffic per process.
    - **Typical Use**: Identify which processes are consuming the most bandwidth.

15. **pmap**

    - **Purpose**: Reports memory map of a process.
    - **Typical Use**: Detailed view of memory usage by a specific process.

16. **lsof**

    - **Purpose**: Lists open files and the processes that opened them.
    - **Typical Use**: Identify which files are being accessed by which processes.

17. **mpstat**

    - **Purpose**: Displays CPU usage statistics.
    - **Typical Use**: Monitor CPU usage across multiple processors.

ex: mpstat -P ALL 1

---

## Additional Helpful Tips

- **Uptime/Load Averages**:

  - Use `uptime` or `top` to see load averages. Compare the load average to the number of CPU cores:
    - If load average exceeds core count regularly, you may have saturation issues.

- **Check CPU vs. I/O Bound**:

  - If CPU usage is consistently high, you might be CPU-bound.
  - If the CPU usage is low but load is high, you might be I/O-bound. Check disk or network usage.

- **Monitoring Memory**:

  - `free -h` (the `-h` shows values in human-readable format).
  - Check swap usage to see if the system is under memory pressure.
  - Use `smem` or `pmap` to further dissect which processes use the most memory.

- **Monitoring Disk I/O**:

  - `iostat -x 1` (the `-x` option shows extended stats, the `1` runs it repeatedly).
  - Check metrics like `await` (average wait time in milliseconds for I/O operations).
  - If `await` or `%util` is high, disk saturation might be an issue.

- **Network Diagnostics**:

  - `mtr` for continuous latency/traceroute analysis.
  - `iftop` or `nethogs` for real-time bandwidth usage.
  - `ss -tulnp` to see listening ports (`-t` for TCP, `-u` for UDP, `-l` for listening, `-n` for numeric, `-p` for process).

- **Check Logs**:

  - Don't forget to look at logs under `/var/log/` (for example, `tail -f /var/log/syslog` or `dmesg`) to see error messages and timestamps related to problems.

- **Historical Metrics**:

  - Tools like `sar` (part of the `sysstat` package) can show you performance data from the past day(s).
  - This is invaluable when diagnosing issues that occurred at specific times.

- **Automation & Alerting**:

  - Consider using monitoring platforms (e.g., Nagios, Zabbix, Prometheus, Grafana) to capture key metrics over time and alert you if thresholds are reached.

---

1. CPU Usage
   Real-Time Monitoring:

Use top or htop for an overview of processes and their CPU usage.
bash
Copy
Edit
top
htop
Look for processes with high %CPU.
Detailed CPU Statistics:

Use mpstat (from the sysstat package) for detailed CPU stats:
bash
Copy
Edit
mpstat -P ALL 1
Check for high %iowait, which indicates CPU is waiting on disk I/O. 2. Memory Usage
Overall Memory Usage:

Use free to check memory utilization:
bash
Copy
Edit
free -h
Look for high usage in the "Used" column under "Mem" and significant "Swap" usage.
Process-Specific Memory Usage:

Use top or htop and sort by memory usage (Shift + M in htop).
Check for processes consuming excessive memory.
Memory Stats:

Check memory pressure and swapping with:
bash
Copy
Edit
vmstat 1 5
Look for non-zero "si" (swap-in) and "so" (swap-out) values, which indicate the system is using swap space. 3. Disk Usage
Disk Space:

Check for full partitions:
bash
Copy
Edit
df -h
Look for partitions close to 100% usage.
Disk I/O:

Use iostat (from the sysstat package) to check disk I/O performance:

bash
Copy
Edit
iostat -x 1 5
Check for high values in %util (near 100% indicates saturation).

Use iotop for a real-time view of processes causing high I/O:

bash
Copy
Edit
sudo iotop
Disk Health:

Check for disk errors in the logs:
bash
Copy
Edit
dmesg | grep -i error
Use smartctl (from the smartmontools package) to check disk health:
bash
Copy
Edit
sudo smartctl -a /dev/sda 4. Network Usage
Bandwidth and Packet Stats:

Use ifconfig or ip -s link to check for dropped packets and errors:
bash
Copy
Edit
ip -s link
Real-Time Monitoring:

Use nload or iftop for bandwidth usage:
bash
Copy
Edit
sudo nload
sudo iftop
Network Diagnostics:

Use netstat or ss to view network connections and identify unusual activity:
bash
Copy
Edit
netstat -tunapl
ss -tunapl
Latency and Routing Issues:

Check connectivity and latency:
bash
Copy
Edit
ping -c 4 google.com
traceroute google.com 5. Logs
System Logs:

Check logs for errors or warnings:
bash
Copy
Edit
sudo journalctl -p err
sudo journalctl -xe
Application Logs:

Review logs specific to applications causing issues (e.g., web servers, databases). 6. File Descriptors and Processes
Check Limits:

Ensure the system isn’t running out of file descriptors:
bash
Copy
Edit
ulimit -n
lsof | wc -l
Zombie Processes:

Check for zombie processes in top (marked as Z) or:
bash
Copy
Edit
ps aux | grep Z 7. General Monitoring Tools
Built-In:

vmstat: Provides CPU, memory, and I/O stats:
bash
Copy
Edit
vmstat 1 5
sar (from sysstat package): Historical resource usage.
Advanced Monitoring:

Install tools like netdata, glances, or monitorix for comprehensive system monitoring with visual dashboards.

---

network:

version: 2

renderer: networkd

ethernets:

enp0s3:

addresses:

- 192.168.1.10/24

gateway4: 192.168.1.1

nameservers:

addresses: [8.8.8.8, 8.8.4.4]

dhcp4: false

optional: true

wifis:

wlan0:

dhcp4: true

access-points:

"HomeWiFi":

password: "secretpassword"

mode: infrastructure

key-mgmt: wpa-psk

bonds:

bond0:

dhcp4: no

addresses: [10.0.0.2/24]

interfaces: [enp0s4, enp0s5]

parameters:

mode: active-backup

mii-monitor-interval: 100

vlans:

vlan10:

id: 10

link: enp0s3

addresses: [10.10.10.2/24]

bridges:

br0:

dhcp4: yes

interfaces: [ bond0, vlan10 ]

parameters:

stp: true

tunnels:

tun0:

mode: ipip

local: 203.0.113.1

remote: 203.0.113.2

addresses:

- 10.100.0.1/24**ping** doesn't allow you to specify a port directly by appending something like `:443`. Unlike some other tools (for example, `nc`/`netcat`, `nmap`, or specific TCP Ping utilities), **fping** is strictly for sending ICMP echo requests (pinging) to the host/IP. This means if you give it `alexflux.com:443` or `8.8.8.8:443`, it will interpret the entire string as a hostname, which doesn't exist---hence the "nodename nor servname provided" error.

If you want to verify basic connectivity (like a regular ping) to `alexflux.com` or `8.8.8.8`, you'd simply use:

bash

CopyEdit

`fping alexflux.com
fping 8.8.8.8`

**But**, if you specifically want to check whether port **443** (HTTPS) is reachable on a host, you'll need a different command or tool altogether. Here are a few options:

1.  **Netcat (nc)**:

    bash

    CopyEdit

    `nc -vz alexflux.com 443`

    - The `-v` flag makes it verbose (so it tells you more), and the `-z` flag just checks if the port is open without sending data.

2.  **Nmap** (Network Mapper):

    bash

    CopyEdit

    `nmap -p 443 alexflux.com`

    - This will scan port 443 on the domain. Nmap is more feature-rich for network diagnostics.

3.  **telnet**:

    bash

    CopyEdit

    `telnet alexflux.com 443`

    - This will try to open a telnet connection on port 443. If it connects, you'll see some kind of handshake prompt or a blinking cursor. If it fails, you'll know the port is blocked or closed.

4.  **curl** (if checking HTTPS connectivity):

    bash

    CopyEdit

    `curl -I https://alexflux.com`

    - This will attempt to connect over port 443 using HTTPS and show you the HTTP headers returned. If there is no service listening on 443 or the connection is blocked, you'll see an error.

---

### TL;DR

- **fping** does not support port specification in the syntax `host:port`.
- To ping at the ICMP level, drop the `:443`.
- To specifically check port 443 connectivity, use `nc -vz host 443`, `nmap -p 443 host`, or similar.

I hope this helps clarify things, Alex! If you have any more questions about checking connectivity or ports, feel free to ask---happy to keep guiding you along!

o1

##### You said:

what are some tcp ping utilitis?

ChatGPT

Thought about TCP ping utilities for 4 seconds

Hey Alex, great question! While standard "ping" (including fping) only uses ICMP echo requests, a "TCP ping" utility tries to establish a TCP connection (often on a specified port) to confirm that the port is open and reachable. Here are some popular tools you can check out:

---

## 1\. **tcping**

- **Platforms:** Primarily Windows (though there are some community builds for Linux).
- **Usage Example (Windows):**

  powershell

  CopyEdit

  `tcping google.com 443`

  This will attempt to do a TCP "ping" (a connection attempt) on port 443 to `google.com`. You'll see connection statistics for that specific TCP port.

---

## 2\. **hping3**

- **Platforms:** Linux/Unix (though it can be built for other platforms).
- **Usage Example:**

  bash

  CopyEdit

  `sudo hping3 -S -p 443 google.com`

  - `-S` sends an SYN packet, `-p 443` targets port 443.
  - Hping3 can do a lot more than just TCP pings---it can craft customized packets, test firewalls, perform traceroutes, etc.

---

## 3\. **nmap** (Using TCP SYN Ping or TCP Connect)

While **nmap** is typically known for port scanning, you can do a form of TCP "ping":

bash

CopyEdit

`nmap -Pn -p 443 --host_timeout 2000 --max-retries 0 google.com`

- `-Pn` tells **nmap** not to do the default ICMP ping first.
- `-p 443` checks port 443.
- You can add or adjust other options for faster checking or more details.

Alternatively, for a simple connect test:

bash

CopyEdit

`nmap -p 443 --script=tcp-connect google.com`

This uses the `tcp-connect` script to verify if port 443 is open.

---

## 4\. **nc (netcat)**

Netcat can do a quick TCP port check:

bash

CopyEdit

`nc -vz google.com 443`

- `-v` for verbose output.
- `-z` means "don't send data, just check if we can open a TCP connection."\
  If successful, it'll say "Connection succeeded," if not, it'll time out or show "Connection refused."

While not strictly labeled a "TCP ping" program, netcat is often used for this purpose because it's readily available on many systems.

---

## 5\. **nping** (part of the Nmap suite)

**nping** is a command-line tool included with Nmap. It lets you do various packet-based pings. For a TCP ping:

bash

CopyEdit

`nping --tcp -p 443 google.com`

You can also fine-tune packet size, flags, and more.

---

## 6\. **paping** (Port Pinging)

- **Platforms:** Windows, Linux (via third-party ports).
- **Usage Example:**

  bash

  CopyEdit

  `paping google.com -p 443`

  This will show you a series of attempts to connect on port 443 and how long each attempt took.

---

### Tips

- **Install:** Most of these tools don't come pre-installed on all systems. On Debian/Ubuntu, for example, you might run `sudo apt-get install hping3 nmap netcat` or similar. On Windows, you often download `.exe` installers or use **chocolatey** / **winget**.
- **Ports:** If you don't specify a port, tools like `nc`, `tcping`, etc. generally won't do anything meaningful (they need that port for a TCP handshake).
- **Privileges:** Some tools may require running as root or Administrator if sending raw packets (like hping3 with SYN packets).
