# Network Troubleshooting Reference Guide

This guide is a comprehensive cheat sheet for diagnosing and resolving network issues. It is organized into sections covering advanced diagnostic tools, performance monitoring, automation techniques, and best practices for systematic troubleshooting. Each tool or technique includes a description, real-world use cases, example commands with key flags, sample output (and how to interpret it), and pro tips for advanced usage. Additional topics such as IPv6, MTU troubleshooting, wireless diagnostics, and OSI model workflows are included. The document is structured with clear headings, bullet points, and tables to serve as a quick-reference for daily work and team knowledge sharing.

## Advanced Diagnostic Tools

This section covers powerful tools for in-depth network analysis and troubleshooting. These tools help inspect traffic, test connectivity, and gather low-level network information beyond basic commands.

### Wireshark -- Protocol Analyzer (GUI)

**Description:** Wireshark is a free, open-source packet analyzer used for network troubleshooting and analysis​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Wireshark#:~:text=Wireshark%20is%20a%20free%20and,5)

. It captures network traffic and allows interactive examination of packets, with rich filtering and decoding for hundreds of protocols. Wireshark has a graphical interface, and a terminal version called `tshark` for CLI use.

**Use Cases:**

- Investigating complex protocol issues (e.g. TCP handshake problems, TLS negotiation failures).
- Debugging application-level problems by inspecting packet contents (HTTP requests, DNS queries, etc.).
- Comparing normal vs. problematic traffic captures to pinpoint anomalies (e.g. missing packets or resets).

**Common Features:**

- **Capture Filters:** Limit which packets are captured (set before capture). For example, capture only TCP port 80 traffic.
- **Display Filters:** Refine which captured packets are shown (post-capture). For example, show only packets with a specific IP or HTTP response code.
- **Protocol Decoding:** Wireshark interprets protocol fields (TCP flags, HTTP headers, etc.) for easy reading.
- **Color-Coding:** It highlights packet types (e.g. TCP errors in red) to draw attention to potential issues.

**Example Workflow:** Start a capture on the interface connected to the problem network. Reproduce the issue (e.g. a failed login or an API call). Stop the capture and apply a display filter for relevant traffic (such as IP address or protocol). Inspect packet details: for example, check if a TCP three-way handshake completes, if DNS queries get responses, or if there are HTTP error codes.

**Command Example (TShark):** While Wireshark is GUI-based, you can use `tshark` for command-line captures. For instance:

bash

Copy

`# Capture 100 packets on interface eth0 filtering port 80, and write to file
$ tshark -i eth0 -c 100 -f "port 80" -w output.pcap`

- `-i eth0` specifies the interface.
- `-c 100` limits to 100 packets.
- `-f "port 80"` is a capture filter for port 80 traffic.
- `-w output.pcap` writes packets to a file for later analysis in Wireshark.

**Interpreting Output:** In Wireshark's GUI, you will see a three-pane view -- a packet list (with summary like source, destination, protocol, length, info), packet details (decoded fields), and raw bytes. Look for abnormal patterns: e.g., many retransmissions or duplicate ACKs (could indicate packet loss or congestion), ICMP "Destination unreachable" messages (routing or firewall issues), or application-level errors (HTTP 500 responses, etc.). For instance, excessive TCP Retransmissions and a high round-trip time in the "Info" column might suggest network congestion or packet loss.

**Pro Tips:**

- Use **Display Filters** (Wireshark filter language) to drill down (e.g., `tcp.flags.reset == 1` to find TCP resets, or `dns && ip.addr == 8.8.8.8` to see DNS traffic involving 8.8.8.8).
- Leverage **Follow Streams**: right-click a packet and choose "Follow TCP Stream" to see the full conversation between two endpoints (useful for reassembling HTTP requests/responses, etc.).
- **Name Resolution:** By default, Wireshark may do DNS lookups for addresses -- enable or disable this for clarity/performance. (Or use the `-n` flag in tshark to prevent DNS resolution.)
- **Packet Coloring:** Customize coloring rules to highlight important packets (e.g., red for resets, blue for DNS, etc.) to speed up visual analysis.
- **Remote Capture:** If you need to capture on a remote machine, use `dumpcap` or `tcpdump` there to create a capture file, then open it in Wireshark locally (to avoid heavy GUI on servers).

### tcpdump -- Packet Capture (CLI)

**Description:** `tcpdump` is a command-line packet analyzer that captures and prints network packets. Like Wireshark's engine, it uses libpcap to capture traffic. It's useful on servers or systems without a GUI. tcpdump can write captures to file for later analysis or display a summary of packets in real-time​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Tcpdump#:~:text=tcpdump%20is%20a%20data,4%20%5D%20tcpdump)

.

**Use Cases:**

- Capturing packets on servers to troubleshoot connectivity (e.g. capturing traffic on a webserver's interface to see incoming requests).
- Filtering traffic by protocol, IP, port, etc., to debug specific network flows (e.g. verifying if packets leave the server towards a certain destination).
- Checking for network anomalies like ARP issues, duplicate IP addresses (via ARP who-has requests), or routing loops.

**Command Examples:**

bash

Copy

`# Basic usage: capture on eth0 and print packet summaries
$ sudo tcpdump -i eth0

# Example: capture TCP traffic on port 443 with no DNS lookups and verbose output

$ sudo tcpdump -i eth0 tcp port 443 -nnvv

# Example: capture 5 ICMP packets and display in hex+ASCII

$ sudo tcpdump -i eth0 -c 5 -nn -X icmp`

- `-i eth0` chooses interface eth0.
- `tcp port 443` is a **filter** (only TCP traffic on port 443).
- `-nnvv` (`-nn` disables DNS and service name resolution, `-vv` increases verbosity for more details like TTL, TOS).
- `-X` prints packet payload in hex and ASCII (useful for inspecting data, e.g. HTTP content).
- `-c 5` captures only 5 packets then stops.

**Expected Output:** tcpdump outputs one line per packet (in summary mode). For example, a TCP packet line might look like:

nginx

Copy

`IP 192.168.1.5.51578 > 93.184.216.34.https: Flags [S], seq 123456789, win 64240, options [mss 1460,sackOK, ...], length 0`

This indicates a SYN packet from 192.168.1.5:51578 to 93.184.216.34:https (443) with certain TCP options. If `-X` is used, a dump of packet bytes follows. You might see output like HTTP requests (`"GET /index.html HTTP/1.1"` in ASCII) or DNS query details.

**Interpreting Output:** Key fields in tcpdump output include source > destination, protocol flags (e.g. `[S]` for SYN, `[F]` for FIN, `[P]` for PUSH, `[R]` for RST), sequence and acknowledgment numbers (if verbose), and payload lengths. For example:

- Repeated `[S]` (SYN) retries with no response indicate the remote host or port is unreachable or filtered.
- ICMP messages like "Destination unreachable (Port unreachable)" point to routing or firewall issues.
- ARP outputs (`Who has 192.168.1.50? Tell 192.168.1.1`) can reveal if ARP resolution is failing (no reply for who-has means the IP might be down or not in network).
- If capturing with `-X`, you can read plaintext protocols (e.g., HTTP headers, SMTP commands) in the ASCII dump for clues.

**Pro Tips:**

- **Write to File:** Use `tcpdump -w capture.pcap -i eth0 filter` to save a capture for later analysis (e.g. open in Wireshark). This is useful when you need to share capture data or analyze it with Wireshark's GUI.
- **Advanced Filters:** Learn pcap filter syntax for complex conditions (combine with `and`, `or`, `not`). Example: `tcpdump -i eth0 'tcp and (port 80 or port 443) and not src 10.0.0.5'` to capture HTTP/S traffic excluding a specific source.
- **Buffering:** Add `-l` to make tcpdump line-buffered (useful when piping output to other commands or viewing real-time).
- **Time Stamps:** By default, output is time-stamped. Use `-tttt` for a human-readable timestamp or `-j adapter` to use hardware date stamps if available.
- **Snapshot Length:** By default tcpdump grabs 262144 bytes per packet in newer versions (sufficient for most packets). You can reduce with `-s <bytes>` to capture only header bytes if you don't need full payload (saves disk and privacy for payloads).
- **Permission:** It usually requires root or CAP_NET_RAW. On some systems, you can give tcpdump limited capability or run via sudo.

### Netcat (nc) -- Network Connectivity Swiss-Army Knife

**Description:** Netcat (`nc`) is a versatile networking utility for reading and writing raw data over network connections using TCP or UDP​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Netcat#:~:text=netcat%20,in%20capabilities)

. Often called the "Swiss-army knife" of networking, it can open TCP/UDP connections, send data, listen on ports, port scan, and more. It's useful for quick tests of services or data transfers and can be scripted easily​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Netcat#:~:text=command%20%20is%20designed%20to,in%20capabilities)

​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Netcat#:~:text=It%20is%20able%20to%20perform,86%20and%20port%20listening)

.

**Use Cases:**

- **Port Connectivity Testing:** Check if a TCP port is open and accessible (e.g., is a service listening or blocked by firewall?).
- **Simple Chat/Transfer:** Set up a listener on one machine and connect from another to send text or files (e.g., quick file transfer without FTP).
- **Banner Grabbing:** Connect to services (like HTTP, SMTP) to manually send or receive data for debugging (e.g., send an HTTP request or see a server banner).
- **Port Scanning:** As a rudimentary port scanner to detect open ports (though Nmap is more powerful for extensive scanning).
- **Server Simulation:** Use `nc -l` to simulate a server that accepts connections, for testing clients or pipelines.

**Command Examples:**

bash

Copy

`# 1. Test connectivity to a port (e.g. SSH on 192.168.1.50)
$ nc -vz 192.168.1.50 22
Connection to 192.168.1.50 22 port [tcp/ssh] succeeded!

# 2. Start a listener on port 8080 and output any received data

$ nc -l 8080

# 3. Send a file (file.txt) to a listener at 10.0.0.5:8080

$ nc 10.0.0.5 8080 < file.txt

# 4. Simple port scan of ports 1-100 on a host

$ nc -zv 192.168.1.100 1-100

# 5. UDP example: send a message via UDP

$ echo "hello" | nc -u -w1 192.168.1.60 514`

- In example 1, `-v` (verbose) prints connection details and `-z` (zero-I/O mode) just checks the port without sending data; the output **"succeeded!"** indicates the port is open​

  [ionos.com](https://www.ionos.com/digitalguide/server/tools/netcat/#:~:text=Netcat%20confirms%20the%20detection%20of,port%20with%20the%20message%20%E2%80%9Csucceeded%21%E2%80%9D)

  .

- Example 2 uses `-l` to listen on TCP port 8080.
- Example 3 connects to 10.0.0.5:8080 and redirects file.txt into the connection (the receiver's nc should be listening and redirect output to a file).
- Example 4 scans ports 1 through 100 (`-z` with a port range; `-v` shows which succeeded or failed).
- Example 5 sends "hello" via UDP (`-u`) to port 514 with a 1 second wait (`-w1`) before closing (useful since UDP has no connection).

**Expected Output & Interpretation:** For a successful TCP connection test (example 1 or 4), netcat will output a success message as shown (with the service name if known). If the port is closed or filtered, you might see **"Connection refused"** or it might hang until timeout. For listeners (example 2), netcat will simply wait; any data received will be printed to stdout (your terminal). For sending data (example 3 or 5), there's typically no output on success (unless verbose mode is used) --- you would confirm by checking the receiving end. In port scanning mode, netcat outputs a line for each successful connection; closed ports usually don't produce output (in verbose mode, you may see an error for refused connections).

**Pro Tips:**

- **UDP Scanning/Testing:** When using `-u` (UDP), note that UDP is connectionless -- netcat will always report "succeeded" for a UDP "connection" even if no listener (because no handshake)​

  [gist.github.com](https://gist.github.com/lenciel/8780269#:~:text=Useful%20netcat%20examples%20on%20Linux,succeeded)

  . Instead, you have to wait for a response or use other tools to truly confirm a UDP port.

- **Timeouts:** Use `-w <seconds>` to set a timeout for connections or for listening. This prevents hanging forever on a non-responsive connection.
- **Hex Dump:** Some versions (OpenBSD netcat with `-x`) or using `xxd` with netcat can help debug binary protocols by showing hex output.
- **Pipe and Chain:** You can chain netcat with other commands. For example, to serve a file over HTTP (simple one-liner web server):\
  `while true; do { echo -e "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n$(date)" | nc -l -p 8080; } done`\
  This listens on 8080 and responds with the date to any connection.
- **Ncat (from Nmap):** Nmap provides an enhanced `ncat` which supports SSL, proxy, and more features, which can be handy for advanced scenarios.
- **Security:** Be cautious with netcat on open ports, especially with `-e` option (in some versions) that executes programs -- it can be a security risk. Many OSes alias `nc` to safer versions without `-e`.

### ss -- Socket Statistics (Connection Inspection)

**Description:** `ss` is a modern CLI tool to dump socket statistics and details in Linux​

[phoenixnap.com](https://phoenixnap.com/kb/ss-command#:~:text=The%20ss%20,information%20and%20troubleshooting%20network%20issues)

. It replaces the older `netstat` with faster performance and more features. It shows listening ports, established connections, and UNIX domain sockets. It's essential for checking what ports are in use, connection states, and which processes are associated (when run with proper options).

**Use Cases:**

- Identifying if a service is listening on the expected port and on which addresses (IPv4, IPv6, localhost only, etc.).
- Checking current TCP connections to see if clients are connected, and how many (useful on servers to gauge load or if an expected connection is established).
- Viewing UDP endpoints (sockets) to ensure a service bound to the correct port.
- Examining socket states for troubleshooting (e.g., many sockets in `TIME-WAIT` could indicate frequent short-lived connections, or sockets stuck in `SYN-RECV` might suggest a half-open connection possibly due to a firewall).
- Summarizing overall socket usage and counts for capacity planning or diagnosing exhaustion of ports.

**Command Examples and Flags:**

bash

Copy

`# Show all listening sockets (TCP and UDP) with numeric addresses and process info
$ ss -tulwnp
State Recv-Q Send-Q Local Address:Port Peer Address:Port Process
LISTEN 0 128 0.0.0.0:22 0.0.0.0:_ users:(("sshd",pid=1234,fd=3))
LISTEN 0 100 127.0.0.1:3306 0.0.0.0:_ users:(("mysqld",pid=2345,fd=19))
LISTEN 0 128 [::]:80 [::]:\* users:(("nginx",pid=3456,fd=6))

# Show all established TCP connections

$ ss -s
$ ss -t state established

# Filter: Show connections to a specific IP or port

$ ss -tan dst 10.0.0.5
$ ss -uap sport = 53 # UDP sockets with source port 53 (likely DNS server)

# Show summary statistics of TCP states

$ ss -s`

- `-tulwnp` breakdown: `-t` (TCP), `-u` (UDP), `-l` (listening), `-w` (raw addresses, wide output), `-n` (don't resolve names), `-p` (show process/PID owning the socket). This combination lists all listening sockets with clear details.
- `-tan` shows all TCP sockets (`-t`), all states (default includes established and listening), with numeric output (`-n`).
- `state established` or `state listening` can filter by state.
- `dst 10.0.0.5` filters connections where destination is 10.0.0.5; `sport = 53` filters source port 53.
- `ss -s` gives a summary like:

  makefile

  Copy

  `Total: 100 (kernel 110)
TCP:   5 (estab 2, closed 0, orphaned 0, synrecv 0, timewait 3/0), ...`

  This high-level view shows counts of sockets in various states.

**Interpreting Output:** Each line of `ss` (like netstat) shows:

- **Netid** (network type: tcp, udp, u_dgr, etc.) -- often shown under "State" or as part of that column.
- **Recv-Q / Send-Q:** Data queued (bytes) on receive/send side. A non-zero Send-Q might indicate data stuck (receiver not reading?).
- **Local Address:Port / Peer Address:Port:** The local socket and the remote endpoint. If the Peer is `*` or empty on a LISTEN, it means no remote (it's a listening socket). The addresses may show `0.0.0.0` or `::` for all interfaces, or specific IPs.
- **State:** e.g., LISTEN, ESTAB (established), TIME-WAIT, CLOSE-WAIT, SYN-SENT, SYN-RECV, etc.
- **Process:** (if `-p` used) shows the program name and PID using that socket.

From the example:

- SSH (`sshd`) is listening on 0.0.0.0:22 (all IPv4 interfaces on port 22) with backlog 128.
- MySQL (`mysqld`) is listening on 127.0.0.1:3306 (only localhost, port 3306) -- indicating it's not accessible externally.
- Nginx is listening on [::]:80 (all IPv6 interfaces on port 80) -- likely also on IPv4 via dual-stack. If we saw an established connection line, e.g.,:

nginx

Copy

`ESTAB 0 0 192.168.1.10:22 192.168.1.50:52520 users:(("sshd",pid=1234,fd=4))`

That would mean an SSH connection from 192.168.1.50:52520 to local 192.168.1.10:22 is established (sshd process).

**Pro Tips:**

- Use **`ss -p` carefully**, it usually requires root to show processes. Without `-p`, you still see the connections but not which process owns them.
- For **UDP**, note that "UNCONN" state is common (since UDP is connectionless). `ss -u -a` shows UDP endpoints; Recv-Q in UDP may indicate datagrams received but not read by application.
- **Monitoring:** You can watch sockets in real-time by using watch: e.g., `watch -n1 'ss -tuna | grep ESTAB | wc -l'` to see count of established connections update every second, or use `watch ss -st` for summary.
- **Compare to netstat:** Many netstat flags have direct ss counterparts. For example, `netstat -plant` is roughly `ss -tulpn` (with some differences in default shown states).
- **Advanced filtering:** `ss` can filter by more than address/port. You can filter by state, by process name (with `grep` on the output), or even by packet criteria if using `ss -o` to show TCP socket options (like timers, etc.).
- **Namespace/Container networking:** If troubleshooting in containers/net namespaces, ensure you run `ss` in the correct namespace (e.g., enter the container or use `nsenter`) because it shows sockets of the current namespace.

### Nmap -- Network Mapper (Port Scanner & More)

**Description:** Nmap ("Network Mapper") is a powerful open-source tool for network discovery and security auditing​

[wiki.archlinux.org](https://wiki.archlinux.org/title/Nmap#:~:text=Nmap%20,service%20upgrade%20schedules%2C%20and%20monitoring)

. It can scan hosts to find open ports, detect services and versions, identify operating systems, and more. While often used for security assessments, it's extremely useful in troubleshooting to map out network reachability and what services are running where. Nmap sends various probes (TCP, UDP, ICMP, etc.) and analyzes responses​

[wiki.archlinux.org](https://wiki.archlinux.org/title/Nmap#:~:text=works%20fine%20against%20single%20hosts,service%20upgrade%20schedules%2C%20and%20monitoring)

.

**Use Cases:**

- **Port Scanning:** Find out which ports are open on a host or a range of hosts (e.g., is a service accessible, or is a firewall blocking it?).
- **Service/Version Detection:** Confirm that the correct service is running and identify its version (e.g., ensure the web server is Apache 2.4.x as expected, or find what SSH version is running).
- **Network Inventory:** Scan subnets to discover what hosts are up and what services they offer (useful for documentation or finding rogue devices).
- **Testing Firewall Rules:** Use Nmap from different points to see which ports are filtered vs open, to validate firewall configurations.
- **Troubleshooting Connectivity:** If an application can't reach a service, an Nmap scan can help determine if the port is closed, filtered, or reachable.

**Command Examples:**

bash

Copy

`# 1. Simple port scan of a single host (common 1000 ports, TCP)
$ nmap 192.168.1.10

# 2. Full TCP port scan (1-65535) of a host

$ nmap -p1-65535 192.168.1.10

# 3. Scan a subnet for live hosts and list open ports 80 and 443

$ nmap -sn 192.168.1.0/24 # Ping scan to find live hosts
$ nmap -p 80,443 192.168.1.0/24 # Then scan those hosts for web ports

# 4. Service version and OS detection on a host

$ nmap -sV -O 192.168.1.10

# 5. UDP scan of DNS and SNMP ports

$ nmap -sU -p 53,161 192.168.1.50

# 6. Aggressive scan (OS, version, scripts) on multiple hosts

$ nmap -A 10.0.0.1-10`

- Example 1: Default scan uses SYN scans on the most common ports and gives a quick report.
- Example 2: Scans all TCP ports (this is slower).
- Example 3: `-sn` (ping scan) finds which IPs are up; then scanning ports 80,443 on the subnet (note: can combine into one command with `-Pn` if needed).
- Example 4: `-sV` enables service version detection by sending probes, `-O` attempts to identify OS by TCP/IP fingerprinting.
- Example 5: `-sU` performs UDP scans (can be slower and requires root). Scanning DNS (53) and SNMP (161) in this example.
- Example 6: `-A` is aggressive (equivalent to `-sV -O --script=default -T4`), enabling OS detect, version detect, default NSE scripts, and a faster timing.

**Expected Output:** Nmap outputs a structured report. For example:

bash

Copy

`Nmap scan report for 192.168.1.10
Host is up (0.0012s latency).
Not shown: 998 filtered ports
PORT STATE SERVICE VERSION
22/tcp open ssh OpenSSH 7.9p1 Ubuntu 10 (Ubuntu Linux; protocol 2.0)
80/tcp open http Apache httpd 2.4.41
443/tcp closed https
MAC Address: 00:0C:29:4D:8A:11 (VMware)

Device type: general purpose
Running: Linux 5.X|3.X
OS CPE: cpe:/o:linux:linux_kernel:5 cpe:/o:linux:linux_kernel:3
OS detection performed. Exact OS matches for host: Linux 5.4 - 5.8 (95%), Linux 3.10 - 4.11 (generic) (90%)`

Interpretation:

- Ports 22 and 80 are open; port 443 is reported as closed (no service).
- The service names and versions are identified for 22 and 80 (OpenSSH and Apache in this case).
- Many ports were filtered (likely by a firewall, since not shown).
- Host is up with very low latency.
- MAC address and vendor were identified (helpful if scanning local LAN).
- OS detection guessed Linux kernel version range with a confidence.
- Device type is "general purpose" (so likely a server or PC). If a port is filtered, Nmap means no response or an ICMP unreachable was received (firewall). "Closed" means an RST was received (nothing listening). "Open" means a response (SYN-ACK for TCP) was received.

**Pro Tips:**

- **Timing and Stealth:** Nmap has timing templates - `-T0` (paranoid, very slow) to `-T5` (insane, very fast). For troubleshooting (not stealth), `-T4` is usually a good fast option on a reliable network.
- **Specific Scripts:** Nmap's NSE scripts can check for specific issues (e.g., `--script=dns-check-zone` for DNS issues, or `http-*` scripts for web vulnerabilities). Use scripts relevant to troubleshooting, like `broadcast-ping` to find hosts, or `traceroute-geolocation` to map path.
- **Output Formats:** Use `-oN` (normal), `-oG` (grepable), or `-oX` (XML) to save results. For documentation or sharing results with colleagues, the normal output is easy to read, or use `-oA myscan` to output in all formats (myscan.nmap, myscan.gnmap, myscan.xml).
- **IPv6 Scanning:** Use `nmap -6` for IPv6 targets (note that some scan types like ARP don't apply to IPv6; Nmap will adjust).
- **Firewall Evasion:** If you suspect firewall interference, you can try options like `-Pn` (treat host as up, skip ping) or change source port (`--source-port`) or use Decoys (`-D`) -- these are more for security testing, but occasionally relevant if troubleshooting why only certain traffic gets through.
- **Compare results:** If a service _should_ be open but Nmap shows filtered/closed, that's a red flag -- maybe the service isn't running or a firewall is blocking. Conversely, if unexpected open ports appear, it might indicate rogue services.

### MTR -- My Traceroute (Combined Traceroute & Ping)

**Description:** MTR (my traceroute) is a network diagnostic tool that combines the functionality of the traditional `traceroute` and continuous ping in one interface​

[en.wikipedia.org](<https://en.wikipedia.org/wiki/MTR_(software)#:~:text=My%20traceroute%2C%20originally%20named%20Matt%27s,2>)

. It shows the route packets take to a destination and measures the round-trip latency and packet loss at each hop in real-time. Essentially, MTR continuously sends packets (ICMP by default) with incrementing TTL values and constantly updates the results for each hop along the path​

[en.wikipedia.org](<https://en.wikipedia.org/wiki/MTR_(software)#:~:text=MTR%20probes%20routers%20%20on,the%20hops%20along%20the%20path>)

.

**Use Cases:**

- **Identify routing issues:** Find out where along the path packets are being dropped or delayed (e.g., if hop 7 consistently has 50% packet loss, that router or its link might be problematic).
- **Monitor path stability:** Because MTR runs continuously, you can observe fluctuations in latency or intermittent packet loss over time, which a one-time traceroute might miss.
- **Compare directions:** Running MTR from source to dest and dest to source can reveal asymmetric routing issues or differences in return path quality.
- **Troubleshoot ISP problems:** Determine if high latency is due to a local network, the ISP's network, or the destination by seeing which hop introduces the latency jump.
- **Baseline and change detection:** Use MTR periodically to a critical host to have a baseline, so when an issue arises, you can compare current MTR output to normal conditions.

**Command Examples:**

bash

Copy

`# Basic usage: Interactive MTR to a host (IPv4)
$ mtr 8.8.8.8

# Use numeric output and report mode (useful for non-interactive environments)

$ mtr -4 -n -c 10 -r example.com

# Force IPv6

$ mtr -6 2620:119:35::35 # (Quad9 DNS IPv6 address as example)

# UDP mode instead of ICMP (often requires root)

$ sudo mtr -u 8.8.8.8

# Wide report for easier reading/scripting

$ mtr -r -w example.com > report.txt`

- Running `mtr` without flags will start the curses-based live update in the terminal. It will resolve names by default (use `-n` to disable DNS resolution for speed).
- `-4` or `-6` forces IPv4 or IPv6.
- `-c 10` limits to 10 pings per hop (otherwise it runs indefinitely in interactive mode).
- `-r` gives a report at the end instead of interactive (non-interactive mode), good for logging or pasting results.
- `-u` uses UDP packets (like traditional traceroute on Linux, which defaults to UDP on high ports) -- sometimes certain networks treat ICMP differently than UDP, so this can reveal different behavior.
- `-w` wide report mode adds more stats columns (like standard deviation).

**Sample Output (Report Mode):**

![https://en.m.wikipedia.org/wiki/File:Mtr_0.95_screenshot.png](blob:https://chatgpt.com/94e8077f-20dd-4cce-a99b-632175e6e15f)

A sample MTR report showing each hop, loss, and latency statistics.

In an MTR report, columns typically are:

- Host (either hostname or IP, depending on resolution settings) -- each hop in the route.
- %Loss -- percentage of packets lost to that hop.
- Snt -- number of packets sent.
- Last -- latency of the last packet to that hop.
- Avg -- average latency.
- Best -- best (lowest) latency seen.
- Wrst -- worst (highest) latency seen.
- StDev -- standard deviation of latency (jitter measure).

Interpreting an example:

matlab

Copy

`Host Loss% Snt Last Avg Best Wrst StDev

1.  192.168.0.1 0.0% 10 1.2 1.1 0.9 1.5 0.2
2.  10.5.0.1 0.0% 10 10.4 10.7 10.3 12.1 0.5
3.  203.0.113.5 0.0% 10 25.8 26.0 25.5 27.2 0.6
4.  198.51.100.14 30.0% 10 150.0 150.3 149.8 151.0 0.4
5.  203.0.113.254 40.0% 10 150.8 - - - -
6.  ??? 100.0% 10 - - - - -
7.  192.0.2.1 40.0% 10 160.0 159.9 158.0 162.0 1.2`

- Hop 1 is the local router (very low latency ~1ms, 0% loss).
- Hop 2,3 are intermediate with small latency increases (~10ms, ~25ms), 0% loss -- looks fine.
- Hop 4 shows 30% packet loss and high latency ~150ms; this is likely where a problem starts. Hop 5 shows 40% loss and only some responses (the dashes indicate no reply for some probes).
- Hop 6 shows `???` -- meaning no response at all (100% loss), the router at hop 6 completely drops the traceroute probes (could be a firewall or an unreachable hop).
- Hop 7 (which might actually be the final destination, or beyond the lossy hops) shows 40% loss too at ~160ms. If hop 7 is the destination, 40% of probes didn't reach it.

**Interpreting MTR:** Key points:

- If loss starts at a certain hop and continues onward, it can be _real_ packet loss affecting the route beyond that point. If the final destination shows loss, that loss is actual.
- If an intermediate hop shows loss but subsequent hops show _no loss_, it often means that hop is de-prioritizing ICMP (not all probes are answered) but forwarding traffic fine. (Common with some routers that don't respond to all pings when busy -- check if later hops/destination are fine.)
- High latency at one hop that _does not_ carry forward to subsequent hops can usually be ignored (probably that router is slow to respond to ICMP but not actually introducing delay to forwarded packets).
- Consistent high latency that appears and remains for all later hops indicates that link is adding delay (could be a long-distance link or congestion).
- `???` means no reply (could be simply an ISP not allowing traceroute on that hop, or it's beyond a firewall -- but if subsequent hops respond, it's not a fatal problem).
- Use both numeric IP and DNS names: DNS can reveal the router's name (which often encodes location or ISP), but numeric avoids delays.

**Pro Tips:**

- **Permissions:** On many systems, `mtr` needs to run as root for full functionality (to send ICMP or UDP with privileged ports). There is usually an `mtr` setuid binary or you run with `sudo`.
- **Report Mode for Logs:** Use `mtr -r` (and `-c` with a fixed count) to generate a report that can be saved. This is good for documenting an issue to share with e.g. an ISP (they often ask for MTR outputs).
- **UDP vs ICMP:** If you suspect ICMP is treated differently (some networks rate-limit ICMP), try UDP mode (`-u`) or TCP mode (some versions allow `--tcp`). A TCP MTR (e.g., `mtr --tcp -p 443 target`) will send TCP SYN packets to a given port -- useful to trace the path a specific application might take (though intermediate hops still send ICMP Time Exceeded).
- **Firewall Consideration:** If you run MTR to a host and see loss at the final hop, ensure the host isn't itself filtering ICMP Echo (the final reply in traceroute). Some servers drop pings but the route is fine. In such cases, earlier hops might show no loss but final shows 100% loss -- not a route issue, just no ping replies from destination. Always correlate with whether the actual application works.
- **Graphical MTR:** There are GUI frontends or web-based tools for MTR if needed (WinMTR for Windows, for example, or online Looking Glass with MTR).
- **Long-Running Monitoring:** You can leave `mtr` running to observe changes. For instance, run for a few minutes and see if a particular hop's latency spikes coincide with user-reported slowness.

### dig -- DNS Lookup Utility

**Description:** `dig` (Domain Information Groper) is a command-line tool for querying DNS name servers​

[en.wikipedia.org](<https://en.wikipedia.org/wiki/Dig_(command)#:~:text=dig%20is%20a%20network%20administration,DNS>)

. It's widely used for DNS troubleshooting because it provides detailed output of DNS queries and responses. It can query various DNS record types (A, AAAA, CNAME, MX, TXT, etc.) and allows specifying which DNS server to ask. `dig` is part of the BIND utilities and often available on Linux/macOS by default (Windows users may use `nslookup` or install BIND utils).

**Use Cases:**

- **DNS Resolution Testing:** Verify that a domain name resolves to the correct IP (A for IPv4, AAAA for IPv6) or that reverse DNS (PTR) is correct.
- **DNS Propagation Checks:** After updating DNS records, use `dig @<server>` to ask different name servers (like 8.8.8.8 or a specific NS) to see if changes have taken effect.
- **MX and Email Troubleshooting:** Use `dig MX example.com` to see mail exchanger records for a domain (are they pointing to the right mail server?).
- **Text and Config Records:** Retrieve TXT records (for SPF, DKIM, etc.), SRV records, or any other DNS info necessary for diagnosing issues (e.g., `_sip._tcp.example.com` SRV for VoIP services).
- **Delegation/Authority issues:** Use `dig NS domain.com` to check what name servers are authoritative, or `dig +trace domain.com` to trace the delegation path from the root.

**Command Examples:**

bash

Copy

`# Basic A record lookup (IPv4 address)
$ dig example.com A

# AAAA (IPv6) record lookup

$ dig example.com AAAA

# Reverse DNS lookup of an IP

$ dig -x 8.8.8.8

# Specify a DNS server to query (@server) and get only answer section

$ dig @8.8.8.8 example.com MX +noall +answer

# Query the NS records for a domain

$ dig example.com NS +noall +authority

# Use +trace to perform iterative resolution from the root servers

$ dig example.com +trace

# Query any type of record (ANY can be used but is deprecated on many servers for public use)

$ dig example.com ANY`

- By default, `dig` without `@server` uses the system's default resolver (from `/etc/resolv.conf` on Linux).
- `-x` performs reverse lookup (PTR). E.g., `dig -x 8.8.8.8` should return a PTR like `dns.google`.
- `+noall +answer` flags suppress all sections except the answer (clean output). The output line will typically show the question and answer in a terse format.
- `+authority` shows the authority section (useful for delegation issues).
- `+trace` causes `dig` to resolve from the root name servers downwards, which is very useful to identify where a failure occurs (e.g., domain not known at parent .com servers vs. no A record on authoritative server).

**Expected Output:** A standard `dig example.com A` output contains header, question, answer, authority, and additional sections. For example:

yaml

Copy

`; <<>> DiG 9.16.1 <<>> example.com A
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 2, ADDITIONAL: 5

;; QUESTION SECTION:
;example.com. IN A

;; ANSWER SECTION:
example.com. 3600 IN A 93.184.216.34

;; AUTHORITY SECTION:
example.com. 3600 IN NS a.iana-servers.net.
example.com. 3600 IN NS b.iana-servers.net.

... (additional section with glue A records for those NS)`

Interpretation:

- The **HEADER** shows status `NOERROR` meaning query was processed successfully (as opposed to NXDOMAIN for non-existent domain, SERVFAIL for server failure, REFUSED, etc.).
- **QUESTION** just echoes what was asked (example.com IN A).
- **ANSWER** gives the result: example.com has A record 93.184.216.34 with a 3600s TTL.
- **AUTHORITY** indicates the nameservers for example.com (in this case iana-servers.net), meaning those are authoritative for the domain.
- **ADDITIONAL** often lists the IP addresses of those NS servers (for convenience).

If you do `+noall +answer`, you would just get:

css

Copy

`example.com.      3600 IN A 93.184.216.34`

which is succinct.

For an MX query, you might see:

yaml

Copy

`example.com.    3600 IN MX 10 mail.example.com.`

meaning mail for example.com goes to mail.example.com with priority 10.

For `-x` on 8.8.8.8:

Copy

`8.8.8.8.in-addr.arpa. 300 IN PTR dns.google.`

This means the PTR (reverse) for 8.8.8.8 is `dns.google.`.

**Pro Tips:**

- **Check ALL servers:** When troubleshooting, query multiple DNS servers:
  - The local DNS (`dig example.com A`) -- uses your system/ISP resolver.
  - The authoritative DNS (`dig @ns1.provider.com example.com A`) -- to ensure the record is present at source.
  - A public DNS like Google (`@8.8.8.8`) or Cloudflare (`@1.1.1.1`) -- to see if it has the record (cache) or if it's able to resolve it. Differences may indicate propagation delay or DNSSEC issues (if one validates and another doesn't).
- **DNSSEC:** If DNSSEC is in play, add `+dnssec` to see DNSSEC records (RRSIG, etc.), and check `AD` flag in the header if using a validating resolver. Use `dig +dnssec +multi` for a formatted view.
- **Timeouts & Retries:** If `dig` is slow or times out, that indicates either network issues reaching the DNS server or the DNS server not responding. Use `+time=2 +retry=1` to make `dig` fail faster for script usage.
- **Batch queries:** `dig -f domains.txt +short` can query a list of domains from a file, outputting just answers. The `+short` option gives very terse output (just the answer data, one per line), great for scripts.
- **CNAME chasing:** If you query a name with a CNAME, `dig` will by default show the CNAME in answer and not automatically fetch the A. You need to explicitly `dig the.cname.target A` or use a resolver query via `+trace` or rely on resolver recursion. For quick info, the answer section showing a CNAME tells you the alias target.
- **hosts vs dig vs nslookup:** Remember that `dig` queries specified DNS servers directly. Using system commands like `getent hosts` or `nslookup` without specifying server might use system's resolver, which could have caching, search domains, etc. For pure DNS debugging, `dig` is usually preferred due to its clarity and precision.

### ethtool -- NIC Diagnostics and Configuration

**Description:** `ethtool` is a Linux utility for querying and modifying network interface card (NIC) settings and driver options​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Ethtool#:~:text=ethtool%20is%20the%20primary%20means,application%20programs%20running%20in%20userspace)

​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Ethtool#:~:text=Most%20Linux%20distributions%20%20provide,refer%20to%20this%20utility%20program)

. It is the primary tool for diagnosing link-level issues on Ethernet devices in Linux. With ethtool, you can check link status, speed, duplex, auto-negotiation, and even driver information or statistics. It also allows you to change settings such as speed/duplex (if not auto-negotiating properly), or turn on/off features like offloads.

**Use Cases:**

- **Verify Link Status:** Check if the interface has link detected, and at what speed/duplex it connected. (E.g., verify that a gigabit card is indeed linked at 1000Mb/s full-duplex and not, say, 100Mb/s half due to a bad cable or port.)
- **Troubleshoot Physical Layer:** Identify if frequent errors are occurring at the NIC level (ethtool can show NIC driver stats like CRC errors, etc., via `-S` flag).
- **Change Settings:** Temporarily force an interface to a lower speed or turn off auto-negotiation to test if a link comes up (useful with some older switches or when diagnosing auto-negotiation failures).
- **Check Supported Modes:** See what link modes and features the NIC and driver support (e.g., does it support 10G? Does it support wake-on-LAN? Offloading features?).
- **Diagnostics:** Some NICs support cable diagnostics through ethtool (e.g., `--cable-test` on newer ethtool for some drivers).
- **Driver Info:** Get firmware version, driver name, bus location (to correlate with physical slot in server).

**Command Examples:**

bash

Copy

`# 1. Show basic status of eth0
$ ethtool eth0
Settings for eth0:
Supported ports: [ TP ]
Supported link modes: 10baseT/Half 10baseT/Full
100baseT/Half 100baseT/Full
1000baseT/Full
Supported pause frame use: No
Supports auto-negotiation: Yes
Advertised link modes: 1000baseT/Full
Advertised pause frame use: No
Advertised auto-negotiation: Yes
Speed: 1000Mb/s
Duplex: Full
Auto-negotiation: on
Port: Twisted Pair
PHYAD: 1
Link detected: yes

# 2. Change speed/duplex (force 100Mb Full). Caution: This will disrupt link.

$ sudo ethtool -s eth0 speed 100 duplex full autoneg off

# 3. Query driver and bus info

$ ethtool -i eth0
driver: e1000e
version: 3.2.6-k
firmware-version: 0.13-4
bus-info: 0000:00:19.0
...

# 4. Get NIC statistics (counters)

$ ethtool -S eth0

# 5. Check offload settings (segmentation offload, checksum, etc.)

$ ethtool -k eth0

# 6. Enable verbose output (if supported by driver) for debugging

$ ethtool -d eth0 # (dump NIC registers, rarely used)`

**Interpreting Output:**

- In example 1 (basic status), key items:
  - _Supported link modes:_ lists speeds/duplex the NIC can handle.
  - _Advertised link modes:_ what the NIC is currently advertising (in auto-negotiation) -- often matches supported, but you can limit it.
  - _Speed / Duplex:_ Current link speed and duplex. If you see `Speed: Unknown!` or a very low speed like 10Mb, that could indicate a problem (or a mismatched auto-negotiation).
  - _Auto-negotiation:_ on/off.
  - _Link detected:_ yes/no -- **"no"** means the interface doesn't sense carrier (cable unplugged or other end down).
- If Speed is lower than expected (e.g., 100Mb on a gigabit card), suspect cable issues or negotiation mismatches. Duplex mismatches (one side full, one half) will cause heavy packet loss and errors.
- Driver info (`-i`): Knowing the driver (e.g., e1000e for Intel cards) and firmware can help if there are known bugs (one might then update the driver or firmware if an issue is suspected).
- Statistics (`-S`): Output varies by driver, but common counters include `rx_crc_errors`, `rx_dropped`, `tx_dropped`, etc. Non-zero CRC errors could indicate physical layer issues (bad cabling or interference). Dropped RX could indicate overruns (maybe high load).
- Offload features (`-k`): Shows which offloads are on (e.g., large receive offload, generic segmentation offload). If troubleshooting performance or weird behavior, you might try toggling these (`ethtool -K`) as some offloads can cause issues with certain traffic (though generally they help performance).

**Pro Tips:**

- **Do not force speed/duplex unless necessary:** Forcing settings (`-s` option) can solve certain negotiation problems, but typically auto-negotiation should be left on for gigabit and above (GBE requires auto-negotiation for full duplex). Use it for testing and always match both ends (e.g., if you force one side, force the other similarly).
- **Cable Testing:** Some modern NICs and ethtool versions support cable tests (e.g., `ethtool --cable-test eth0` and `ethtool --cable-test-tdr eth0`). This can detect cable faults like opens/shorts and even distance to fault. Check `man ethtool` if your NIC supports it -- extremely useful for physical layer debugging without specialized tools.
- **Energy Efficient Ethernet (EEE):** ethtool can show if EEE (802.3az) is enabled (`--show-eee` and `--set-eee`). EEE can sometimes cause latency spikes when waking link from low power; if troubleshooting latency, consider checking or disabling EEE as a test.
- **Wake-on-LAN:** `ethtool eth0` output will also show "Wake-on" capabilities and what is enabled (`g` for magic packet). If troubleshooting wake-on-LAN, use `ethtool -s eth0 wol g` to enable magic-packet wake, etc.
- **Multiple interfaces and naming:** In modern systems, interfaces might be named `enp3s0` etc. Make sure to target the right interface. `ethtool -a` can show pause frame (flow control) settings; if you have a congested link, enabling flow control on both ends (`ethtool -A eth0 rx on tx on`) might help in certain environments (though can also mask underlying problems).
- **Cross-Platform:** `ethtool` is Linux-specific. For other OS, use equivalent tools: e.g., `dmesg` or `sysctl` on BSD for link status, or `Get-NetAdapter` in PowerShell on Windows to get link info. On Linux, older `mii-tool` can show link status but it's mostly subsumed by ethtool now​

  [en.wikipedia.org](https://en.wikipedia.org/wiki/Ethtool#:~:text=The%20command%20is%20useful%20for%3A)

  .

### strace -- System Call Tracer (for Application-Level Network Debugging)

**Description:** `strace` is a diagnostic tool that intercepts and records system calls made by a process​

[strace.io](https://strace.io/#:~:text=strace%20is%20a%20diagnostic%2C%20debugging,and%20changes%20of%20process%20state)

. While not a network tool per se, it is extremely useful to troubleshoot how an application is interacting with the network. By tracing system calls, you can see DNS queries (`getaddrinfo()` calls), socket calls (`socket()`, `connect()`, `send()`, `recv()`, etc.), and errors returned from these calls. This helps when an application is failing to connect or resolve names, and you need to pinpoint why.

**Use Cases:**

- **Diagnose Application Connectivity Issues:** E.g., a client app failing with "could not connect" -- strace can show if it's attempting to connect to the right address/port and what the error is (ECONNREFUSED, ETIMEDOUT, etc.).
- **DNS Resolution Problems:** If an app is hanging, maybe it's stuck on DNS -- strace will show calls to `getaddrinfo` and responses or timeouts. You might see it trying IPv6 then IPv4, etc., which can hint at IPv6 misconfigs or DNS issues.
- **SSL/TLS issues:** While strace won't decode SSL, it can show system calls related to opening cert files or the `connect()` to an IP before the TLS handshake, or if it's using some syscall that fails.
- **Identify what config files or network resources are being accessed:** E.g., when a service starts, strace can show if it opens `/etc/hosts` or tries to contact a particular IP (maybe a license server or API endpoint).
- **Compare Working vs. Broken:** strace a working scenario vs a failing one to see differences in system call sequence or timing.

**Command Examples:**

bash

Copy

`# 1. Trace an existing running process by PID (attach)
$ sudo strace -p 1234 -f -e trace=network

# 2. Start a program under strace, tracing network-related calls

$ strace -f -e trace=network,connect,recvfrom,sendto curl http://example.com

# 3. Trace all system calls but output to a file for review (to not slow down app too much by printing)

$ strace -o trace.log -tt -T -f myapp

# 4. Filter for specific descriptors or addresses (use grep on output)

$ strace -f -e trace=network myapp 2>&1 | grep "connect("

# 5. Use ltrace for library calls (not system calls) if needed, e.g., to see gethostbyname usage

$ ltrace -e getaddrinfo myapp`

- In example 1, `-p 1234` attaches to process with PID 1234. `-f` follows forks (threads/child processes). `-e trace=network` limits to network-related syscalls (socket, connect, bind, accept, send, recv, etc.) to reduce noise​

  [strace.io](https://strace.io/#:~:text=strace%20is%20a%20diagnostic%2C%20debugging,and%20changes%20of%20process%20state)

  .

- Example 2 starts a new process (`curl http://example.com`) and traces network, connect, recvfrom, sendto calls. You can specify `trace=network` and also specific calls or categories.
- Example 3 logs all calls (`-o trace.log`) with timestamps (`-tt`) and time spent in each call (`-T`). This is useful if you need full detail, though log can be large. Running without `-e trace=` will trace everything (file I/O, etc., which might be too much).
- Example 4 shows using grep to filter the real-time output for interesting calls (like connect).
- `ltrace` is complementary, tracing library calls (like `getaddrinfo` which isn't a syscall but a library function that internally calls `sendto` to DNS port).

**Interpreting Output:** strace output lines show the system call and its return value. For example:

perl

Copy

`socket(AF_INET, SOCK_STREAM, IPPROTO_TCP) = 3
connect(3, {sa_family=AF_INET, sin_port=htons(80), sin_addr=inet_addr("93.184.216.34")}, 16) = -1 ECONNREFUSED (Connection refused)
close(3) = 0
socket(AF_INET, SOCK_STREAM, IPPROTO_TCP) = 3
connect(3, {sa_family=AF_INET, sin_port=htons(80), sin_addr=inet_addr("93.184.216.34")}, 16) = 0
send(3, "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n", 39, 0) = 39
...`

This hypothetical snippet shows:

- The app creates a socket (fd 3).
- First connect on port 80 to 93.184.216.34 failed with ECONNREFUSED (perhaps a SYN was RST by server or firewall).
- It then retries (or next attempt) and the connect succeeds (=0).
- Then it sends an HTTP GET (we see the exact data in the send). This tells us the app initially hit a refusal (maybe trying a different IP or after a short delay it was allowed). If we only saw ECONNREFUSED and then the app gave up, we'd know why it failed.

Another example:

perl

Copy

`getaddrinfo("example.com", "http", ...) = 0 <0.05>
socket(AF_INET6, SOCK_STREAM, IPPROTO_TCP) = 3
connect(3, {AF_INET6, [2606:2800:...]:80}, 28) ... = -1 EINPROGRESS (Progress)
...
connect(3, ...) = -1 ETIMEDOUT (Connection timed out)
close(3)
socket(AF_INET, SOCK_STREAM, IPPROTO_TCP) = 3
connect(3, {AF_INET, 93.184.216.34:80}, 16) = 0`

This indicates:

- `getaddrinfo` returned quickly (0.05s) giving possibly an IPv6 and IPv4 (likely trying v6 first).
- The app tried IPv6 (connect EINPROGRESS and then it times out after some time).
- It then falls back to IPv4 which succeeds. This pattern is typical of dual-stack: if IPv6 path was unreachable, it times out and then IPv4 works. As a result, the user might experience a delay. The solution might be to fix IPv6 connectivity or disable IPv6 if not used, etc.

**Pro Tips:**

- **Use `-e trace=network` to reduce noise:** Without filtering, strace will show every open, read, write, etc., which can be overwhelming. The `network` qualifier is very handy (it includes socket, connect, accept, send, recv, etc.). You can also add `-e trace=recvfrom,sendto` if you want UDP send/receive specifically.
- **Timestamps and durations:** Using `-tt -T` can show how long each call took. If an app call is blocking (e.g., connect taking 60 seconds), you'll see it. This is useful to identify _where_ a slowdown is (DNS taking 5s, connect hanging for 30s, etc.).
- **Follow forks (`-f`):** Many network server processes fork or create threads. `-f` ensures you trace those. Otherwise you might only see the parent process which might not do the actual socket work.
- **Combine with ltrace:** For higher-level issues, sometimes strace's syscalls are too low-level. `ltrace` can show library calls like `gethostbyname`, `SSL_read`, etc. For example, if an app uses a high-level HTTP client library, strace will just show `read`/`write` on a socket, whereas ltrace might show `curl_easy_perform` or others. Use the right tool depending on what you need to see.
- **Permissions:** Attaching to processes or using strace usually requires root (to ptrace other processes). For your own processes, you can run under strace as a normal user. When troubleshooting, you might need to `sudo strace -p` if attaching to a service (ensure minimal impact, maybe test on a staging environment if possible).
- **Performance Impact:** strace can slow down a process significantly, especially if unfiltered. For quick debugging it's fine, but be mindful if attaching to a production process -- it might introduce latency. Use filtering and output to file to mitigate.
- **Kernel vs User errors:** strace shows system call _return values_. If an application handles an error internally or retries, you might not see it unless you catch it in strace. But if the app doesn't report much, strace can reveal hidden errors (e.g., lots of EAGAIN or a series of failing attempts).
- **Understand the output:** If unfamiliar, recall some common network-related errno:
  - `ECONNREFUSED` -- no one listening on that port or firewall actively refused.
  - `ETIMEDOUT` -- no answer to SYN (dropped by firewall or host down).
  - `ENETUNREACH` -- no route to network (routing issue or no IPv6 route, etc.).
  - `EHOSTUNREACH` -- no route to host (or offlink without gateway).
  - `EADDRINUSE` -- when binding: address/port already in use.
  - `ECONNRESET` -- connection reset (sudden close by peer).
  - `EPIPE` -- tried to write to a broken pipe (connection already closed).
- **Use Cases Beyond Networking:** strace is also great for troubleshooting permission issues (seeing `EACCES` on file opens), missing config files (`ENOENT` on open), etc., which often accompany network issues (like misreading `/etc/resolv.conf` or hosts file).

## Performance Monitoring & Throughput Testing

This section focuses on tools and techniques to measure network performance (throughput, latency, packet loss) rather than just connectivity. These tools help validate network capacity, identify bottlenecks, and monitor link utilization.

### iperf3 -- Bandwidth Throughput Tester

**Description:** `iperf3` is a tool for active measurements of the maximum achievable bandwidth on IP networks​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Iperf#:~:text=iperf%2C%20Iperf%2C%20or%20iPerf%2C%20is,transferred%20and%20the%20throughput%20measured)

. It operates in a client-server model: one end runs as a server listening on a port, and the other end runs as a client sending data. iperf3 can test both TCP and UDP throughput, and reports metrics like transfer rate, jitter, and packet loss (for UDP)​

[en.wikipedia.org](https://en.wikipedia.org/wiki/Iperf#:~:text=The%20data%20streams%20can%20be,UDP)

. It's a standard for network performance testing (often used to check if a network link is performing up to its expected capacity).

**Use Cases:**

- **Benchmark Network Links:** Verify if a link (LAN, WAN, VPN, etc.) can handle the expected bandwidth (e.g., test if a gigabit connection actually yields ~940 Mbps throughput, or if a WAN link is delivering promised 50 Mbps).
- **Identify Bottlenecks:** If experiencing slow transfers, use iperf to determine if the bottleneck is the network. For example, if iperf between two servers gives only 100 Mbps on a gigabit network, there may be a duplex issue or CPU bottleneck.
- **Compare Different Paths:** Test performance to different servers (perhaps one local, one over internet) to see differences (maybe an ISP peering issue if one route is significantly slower).
- **UDP Capacity and Packet Loss:** Use UDP mode to test for packet loss at high rates, useful for real-time apps. You can see at what rate packet loss begins to occur.
- **Buffer and Window Tuning:** iperf3 allows adjusting socket buffer sizes and testing the effect of TCP window size on throughput, which is useful for high-latency high-bandwidth networks (long fat networks) to see if tuning is needed.

**Command Examples:**

1.  **Basic TCP Test (Default):** On one machine, run the server:

    bash

    Copy

    `$ iperf3 -s   # listens on TCP port 5201 by default`

    On the other machine, run the client:

    bash

    Copy

    `$ iperf3 -c 10.0.0.1    # replace with server's IP or hostname`

    This will run a 10-second TCP test from client to server and output the results.

2.  **Longer Test with Multiple Streams:**

    bash

    Copy

    `$ iperf3 -c 10.0.0.1 -t 30 -P 4`

    `-t 30` runs it for 30 seconds instead of 10. `-P 4` uses 4 parallel TCP streams. Multiple streams can sometimes achieve higher total throughput if a single stream is not saturating due to TCP window limits or other constraints.

3.  **Reverse Direction Test:** By default, client sends data to server (so testing upload from client's perspective). Use `-R` to reverse, making the server send and client receive:

    bash

    Copy

    `$ iperf3 -c 10.0.0.1 -R`

    This tests the opposite direction (download from client perspective).

4.  **UDP Test:**

    bash

    Copy

    `$ iperf3 -c 10.0.0.1 -u -b 50M -t 10`

    `-u` for UDP mode. `-b 50M` sets bandwidth target to 50 Mbits/sec (server will try to send at that rate). In UDP mode, iperf3 will report jitter and packet loss. (If `-b` is not set in UDP mode, iperf will default to 1 Mbit/s, which may be too low for testing.)

5.  **Bind to a specific interface or IP (if multi-homed):**

    bash

    Copy

    `$ iperf3 -c 10.0.0.1 -B 192.168.1.5`

    `-B` binds the client to a specific local IP (useful if the machine has several network interfaces and you want to test a non-default route).

6.  **JSON output (for scripts):**

    bash

    Copy

    `$ iperf3 -c 10.0.0.1 -J`

    This outputs results in JSON format, which can be parsed programmatically.

**Expected Output (TCP):** On the client side, iperf3 will produce an output like:

css

Copy

`Connecting to host 10.0.0.1, port 5201
[ 5] local 192.168.1.5 port 50000 connected to 10.0.0.1 port 5201
[ ID] Interval Transfer Bitrate
[ 5] 0.00-1.00 sec 112 MBytes 943 Mbits/sec
[ 5] 1.00-2.00 sec 112 MBytes 941 Mbits/sec
[ 5] 2.00-3.00 sec 112 MBytes 942 Mbits/sec
[ 5] 3.00-4.00 sec 112 MBytes 940 Mbits/sec
[ 5] 4.00-5.00 sec 112 MBytes 941 Mbits/sec

---

[ 5] 0.00-5.00 sec 561 MBytes 941 Mbits/sec sender
[ 5] 0.00-5.00 sec 560 MBytes 939 Mbits/sec receiver

iperf3 Done.`

This indicates roughly 940 Mbits/sec throughput, which is expected on a gigabit network (accounting for overhead; 940 Mbps is near line-rate considering typical overhead). The breakdown:

- Each second interval, ~112 MBytes were transferred, equating to ~941 Mbits/sec.
- The final summary shows sender sent 561 MB, receiver got 560 MB in 5 seconds (~939-941 Mbps average). The small discrepancy between sender and receiver can be due to TCP in-flight data at the end or minor loss (in UDP, differences would indicate packet loss).

If multiple streams (`-P 4`), output will list each stream ID and also a `[SUM]` line summarizing across streams.

**Output (UDP):** For UDP tests, output looks like:

matlab

Copy

`[  5] local 192.168.1.5 port 50000 connected to 10.0.0.1 port 5201
[ ID] Interval        Transfer     Bitrate         Total Datagrams
[  5]   0.00-1.00 sec  6.00 MBytes  50.3 Mbits/sec  4291
...
[  5]   0.00-10.00 sec  60.0 MBytes 50.3 Mbits/sec  42910  sender
[  5]   0.00-10.00 sec  59.5 MBytes 50.0 Mbits/sec  42480  receiver
[  5]   0.00-10.00 sec  0.198 ms   0/42910 (0%)  **Jitter**: 0.123 ms  **Lost/Total Datagrams**: 430 (1.0%)`

Interpretation:

- The client (sender) sent 42910 UDP datagrams totaling 60.0 MB at ~50.3 Mbps.
- The server (receiver) reports receiving 42480 datagrams (59.5 MB at 50.0 Mbps).
- **Loss**: 430 packets were lost (42910 - 42480) which is about 1.0% loss.
- **Jitter**: 0.198 ms (this is very low, meaning latency variance is negligible -- likely a LAN).
- If loss was higher, you'd see that percentage increase. If you overshoot a link's capacity with UDP, packet loss will climb (indicative of buffers dropping packets).
- If you run UDP without specifying `-b` (bandwidth), iperf's default 1Mbps may not reveal anything useful unless you adjust it.

**Interpreting Results and Best Practices:**

- **Throughput vs Line Rate:** On TCP tests, achieving ~94% of nominal line rate (like ~940 Mbps on 1 Gbps, ~9.4 Gbps on 10 Gbps) is typically "good". If you get much less, examine potential issues:
  - Check CPU usage (iperf can be CPU heavy at high speeds, especially single-threaded per stream).
  - Check for TCP window issues on long latency links (iperf3 by default auto-tunes on modern OS with large windows, but on some older systems you might need `-w` to set window size).
  - If using VMs or containers, ensure the virtual NIC can handle the throughput.
  - Duplex mismatches or bad cabling can cap at ~100 Mbps even on gig links.
- **Multiple Streams:** Sometimes one stream doesn't fully utilize a high BDP (bandwidth-delay product) path due to window limits; using `-P` multiple streams can fill the pipe. If multiple streams significantly outperform one (e.g., one stream 2 Gbps, four streams 4x2=8 Gbps), that suggests window tuning issues or a protocol limitation.
- **Reverse Option:** Always test both directions (`-R` flag) especially on asymmetric links (like broadband often has lower upload than download).
- **Bufferbloat and Latency:** Note that while saturating a link with iperf, latency for other traffic can spike due to queueing (bufferbloat). Tools like `ping` run concurrently can measure that. iperf3 does not directly show latency except in UDP jitter, but you can observe the effects externally.
- **Jitter and Loss (UDP):** If testing for VoIP, you might do `iperf3 -u -b <rate>` at the codec rate (or multiple streams to simulate calls) to see jitter/loss. High jitter can be as problematic as packet loss for real-time traffic.
- **Parallel vs Serial tests:** For critical links, run iperf at different times to account for network variability. A congested network might show different results at peak vs off-peak hours.
- **Compatibility:** iperf3 is not compatible with iperf2 in terms of protocol. Ensure both sides use the same version. Many distros have iperf3 now. If needed, iperf2 is still available (with slightly different options and output).
- **Security:** iperf is a benign load tool but note that running an iperf server opens a port where anyone could potentially send data. If on a sensitive network, consider enabling authentication (iperf3 has an option `--username`/`--password` for authorized tests).
- **Alternative Tools:** If iperf is not available, `nload`, `bmon`, or `dstat -n` can monitor ongoing traffic, but they don't generate traffic. There are also GUI tools or web-based testers, but iperf gives controlled environment. For UDP multicast, there's an `iperf2` option; iperf3 doesn't support multicast as of writing, so use iperf2 or other tools for that scenario.

### Monitoring Throughput and Latency in Real-Time

Beyond synthetic tests like iperf, it's often useful to monitor network performance on live interfaces or through continuous tools:

- **Linux CLI Tools for Traffic Monitoring:**

  - `iftop`: Shows a real-time bandwidth usage per connection or per host, on a given interface (like a top for network). Useful to see who/what is consuming bandwidth.
  - `nload`: A simple console graph of incoming and outgoing traffic on an interface.
  - `bmon`: A bandwidth monitor with curses interface, showing rates and totals per interface.
  - `sar -n DEV 1`: Using sysstat's sar to print network interface stats (bytes, packets) every 1 second.
  - `vnstat`: Monitors and logs bandwidth usage over time (not real-time rates, but good for historical usage).
  - `ss -s` (as shown earlier) gives a quick summary of TCP connections which can hint at issues (e.g., lots of retransients or timewaits).

- **Latency Monitoring:**

  - `ping` in a continuous mode can track latency jitter and drops. E.g., `ping -i 0.2 8.8.8.8` for high-frequency ping.
  - `mtr` in interactive mode effectively monitors latency continuously as discussed.
  - Tools like **Smokeping** (a web-based tool) can continuously track latency and graph it, which is great for long-term monitoring and catching intermittent spikes.

- **Combining Tools in Workflows:**

  - When transferring a file (say via scp or http) and it's slow, use `iftop` or `nload` on both ends to see actual throughput, and `ping` to see if latency is spiking (which could indicate congestion).
  - Use `traceroute` or `mtr` while a high-bandwidth transfer is running to see if a specific hop's latency jumps (e.g., your local router bufferbloat).

**Interpreting Live Monitor Outputs:**

- iftop will show lines like:

  bash

  Copy

  `192.168.1.5 <-> 192.168.1.10       500Kb   1Mb   2Mb
                             Total send rate: 1.50Mb/sec
                             Total receive rate: 0.00Mb/sec`

  indicating the traffic between .5 and .10 is around 1.5 Mb/s. It's interactive and you can press keys to sort, etc.

- nload might show a graph and numeric:

  makefile

  Copy

  `Device: eth0
In:  125.30 kBit/s
Out: 980.00 kBit/s`

  which can help quickly see if you're saturating an interface.

- sar's output for network (`sar -n DEV`) might show something like:

  bash

  Copy

  `12:00:01 AM  IFACE   rxpck/s txpck/s rxkB/s txkB/s ...
12:00:02 AM  eth0    1000    900     800   760   ...`

  which is more granular numeric info per interval.

**Pro Tips for Performance Monitoring:**

- **Set Baselines:** Know what is normal on your network. E.g., typical ping to gateway, typical bandwidth when copying a known test file, etc. Then when things "feel slow", you have a baseline to compare.
- **Hardware Limits:** Remember that routers/switches or even server NICs might have limits (throughput, pps, CPU if software-based). Monitoring CPU on networking equipment (if possible) or observing if throughput hits a ceiling at a specific number (like always stops at ~100 Mbps, etc.) can hint at a limit or configuration cap.
- **Packet Loss vs Throughput:** Even low packet loss can drastically reduce TCP throughput due to congestion control. So, monitoring for even a few percent of packet loss (with ping or iperf UDP) is important if throughput is much lower than expected.
- **Buffering:** Large buffers in network devices might hide loss but increase latency (bufferbloat). Tools like `ping -f` (flood ping) or specialized ones like **flent** (Flexible Network Tester) have tests for bufferbloat (combining ping and bandwidth tests).
- **Quality of Service (QoS):** If QoS is configured, your throughput might be limited by class. Monitoring tools that can show DSCP marks (like tcpdump) combined with throughput measures can ensure your traffic is in the right class.
- **External Speed Tests:** Sometimes it's useful to compare with an external speed test (like speedtest.net or FAST) to see if the issue is specific to your internal network or also affects general internet connectivity. But for controlled results, iperf to a known good server is preferable.

## Automation in Network Troubleshooting

Automation can greatly enhance troubleshooting efficiency, especially in complex or repetitive scenarios. Scripts and tools can collect data from multiple sources, run tests on schedule, or apply configuration changes quickly. This section discusses ways to automate network diagnostics and some best practices for doing so.

**Why Automate?**

- **Consistency:** Ensure the same checks (ping, service tests, log gathering) are done every time an issue occurs, reducing human error or oversight.
- **Speed:** Quickly gather info from dozens of servers or network devices, which would be time-consuming manually.
- **Continuous Monitoring:** Automation can be used to detect issues before users notice (proactive alerting).
- **Documentation:** Automated scripts can log outputs to files, building a knowledge base of historical data.

### Scripting Common Checks

**Shell Scripts:** Simple Bash or Python scripts can sequence through common troubleshooting steps. For example:

- A script to ping a list of important hosts and report any that fail.
- A script to SSH into multiple servers and run `ss -s` or `ping -c 4 gateway` on each to check their network health.
- Using `for` loops:

  bash

  Copy

  `for host in server1 server2 server3; do
    echo "Checking $host..."
    ssh $host "ping -c4 8.8.8.8; ip route; ss -s" >> results.txt
done`

  This loops through servers, runs a few commands and appends to a results file. Reviewing `results.txt` could quickly show that, say, server2 has no default route or cannot ping out.

**Expect Scripts/Automation for network devices:** If dealing with switches/routers that don't have API, using `expect` or automation tools to run show commands can gather info:

- For example, an expect script to telnet/SSH to a router and issue `show interface status` or `show logging` and save it.

**Using Cron or Scheduled Tasks:**

- You might schedule an `mtr -r -c 100 target >> daily_mtr.log` nightly to capture daily snapshot of network route quality.
- Or a cron job that runs a speedtest or iperf to a reference server every hour and logs results, so you can see when performance drops.

**Python and Libraries:**

- Python's `subprocess` can call system tools or use libraries (like `psutil` for interfaces, or `scapy` for custom packet tests).
- There are higher-level libraries/SDKs for network devices (Netmiko, Paramiko for SSH; NAPALM for multi-vendor network automation; REST APIs for devices like Cisco DNA, etc.).
- Example: a Python script using Paramiko to SSH to a list of switches and run `show interface errors` to identify any port with errors.

**Example: Automated Ping Sweep (Bash one-liner):**

bash

Copy

`#!/bin/bash
network=192.168.1
for host in {1..254}; do
  if ping -c1 -W1 ${network}.${host} > /dev/null; then
    echo "${network}.${host} is up"
  else
    echo "${network}.${host} is down"
  fi
done`

This pings all addresses in 192.168.1.0/24 and prints whether each is up or down. Useful to quickly see what's offline.

### Configuration Management & Infrastructure as Code

If you manage many network devices or servers:

- **Ansible:** You can write Ansible playbooks to gather network info. Ansible modules exist for networking (e.g., `ios_facts` for Cisco, or using raw SSH for less supported devices). Ansible can parallelize gathering of data.
  - E.g., an Ansible play to run a set of show commands on all routers and register outputs. Or to push a temporary config (like enabling an interface) and then test pings, then revert if needed.
- **SaltStack, Puppet, Chef:** These can also be used to ensure configurations are correct (less interactive troubleshooting, more state enforcement, but relevant if an outage is due to config drift).
- **Version Control for Configs:** Storing network configs in git and automating the deployment can reduce human errors that lead to issues. If something goes wrong after a change, automated rollback can be quicker.

### Automated Testing and CI/CD for Networks

For advanced setups, treat network like code:

- Use tools like **Batfish** (which can simulate and verify network configurations).
- Automated tests (maybe using ping or curl) in a pipeline whenever a network change is made. For instance, if a new firewall rule is added, automatically test that critical services are still reachable (could use scripts or tools like **cURL** to test HTTP endpoints, or small programs for more complex protocol tests).
- **Smoke tests:** After a change or on a schedule, run a series of tests:
  - Ping key gateways.
  - DNS lookup critical domains.
  - Connect to important application ports (perhaps using netcat or telnet in a script).
  - Validate that from each site, you can reach the others (if internal network).
  - These could be run by a central orchestrator (like Jenkins triggering an Ansible playbook).

### Logging and Alerting

Automation isn't just active tests; it's also processing logs:

- **Log Scraping:** Write scripts to automatically scan logs for certain errors (e.g., a script that tails system logs and looks for "link down" messages or DHCP failures and sends an alert/email when found).
- **Syslog/SNMP Traps:** Ensure network devices send syslog or SNMP traps to a collector. Then use automation (maybe a simple Python script or a tool like Nagios/Prometheus) to trigger alerts on certain events (interface flaps, high CPU, BGP neighbor down, etc.).
- **Combining Data:** For example, cross-reference log timestamp of an interface down with pings failing in your ping monitoring script to pinpoint exact timelines and potentially root cause.

### Pro Tips for Automation:

- **Don't Over-automate in Crisis:** While automation is great, in the middle of an outage, rely on known-good tools and methods. Use automation to prepare or to do heavy lifting of data collection, but ensure you verify critical findings manually to avoid script bugs misleading you.
- **Idempotence:** If automating changes (like resetting an interface or clearing arp cache via script), make sure running it multiple times doesn't worsen the situation (the concept of idempotence -- the action can be repeated safely).
- **Dry Runs:** For config automation, always have a way to do a "dry run" or gather facts first. For example, have a script gather current config and state, and perhaps only suggest actions. Some automation tools have check modes.
- **Credentials Management:** When writing automation to log into devices, secure your credentials (use vaults, environment variables, or prompt). Logs from these automation runs should also avoid containing sensitive info.
- **Feedback and Logging:** Make your scripts verbose in logging to a file. If something was changed, record it. If tests were run, log their results. This creates an audit trail that helps in post-incident analysis.
- **Community and Existing Tools:** Don't reinvent the wheel. Many open-source tools exist for network health monitoring (Nagios, Zabbix, Prometheus + exporters, etc.) that can be configured to do a lot of these tasks. Use them and perhaps extend with custom scripts where needed.
- **APIs:** If your environment includes cloud or SDN controllers, leverage their APIs. For instance, a script could query your SD-WAN controller for the status of all tunnels every morning and report anomalies.
- **Self-Healing Scripts:** In some cases, automation can not only detect but also remediate common issues. Example: a script that detects "interface down" on a secondary WAN link and automatically toggles a modem power via a PDU, then checks if it came back. Use with caution -- only for well-understood issues where automation actions won't cause harm.

By automating aspects of troubleshooting, network engineers can focus on analysis and complex problem-solving, while letting scripts and tools handle repetitive checks and data gathering. This results in faster resolution and more reliable network operations.

## Troubleshooting by OSI Model Layers

Networking issues can often be approached methodically by considering the OSI model (7-layer model) or a similar layered approach. This structured method helps isolate the problem domain (Physical, Data Link, Network, Transport, or Application, etc.). Below is a breakdown of common troubleshooting steps and tools at each layer:

![https://commons.wikimedia.org/wiki/File:OSI_Model_v1.svg](blob:https://chatgpt.com/b93c9b47-6691-4a9e-a73b-cb2fe10f5c2f)

_Layers of the OSI model, from Physical (Layer 1) up to Application (Layer 7). A systematic approach often starts at one end (Physical or Application) and moves through layers to pinpoint issues._

### Layer 1: Physical

**Scope:** Covers the physical medium -- cables, wireless signals, connectors, voltage, light (fiber), etc.

**Symptoms of Layer 1 issues:**

- No link lights on NIC/switch.
- Intermittent or no connectivity on a specific cable.
- High error rates (CRC errors) on interface.
- One device says 1Gbps, other says 100Mbps (speed/duplex mismatch potentially Layer1/Layer2 interplay).

**Checks and Tools:**

- **Cabling:** Ensure cables are plugged in, not damaged. Reseat connectors. Use cable testers for continuity and pair correctness.
- **Link Lights:** Check NIC and switch port LEDs. No light = no physical connection (could be cable or port or device off). Amber vs green can indicate speed differences or errors depending on equipment.
- **ethtool:** As above, use `ethtool eth0` to see `Link detected: yes/no` and current speed/duplex​

  [en.wikipedia.org](https://en.wikipedia.org/wiki/Ethtool#:~:text=Advertised%20link%20modes%3A%2010baseT%2FHalf%2010baseT%2FFull,MII%20PHYAD%3A%201%20Transceiver%3A%20internal)

  . If `no`, focus on cable or remote device.

- **Interface Status:** On switches/routers, `show interfaces` will often list physical status (up/down) and error counters. Look at output errors, input errors, CRC, collisions:
  - Increasing CRC errors or alignment errors: likely cable or electrical interference.
  - Many collisions (in half-duplex environments): could indicate duplex mismatch or old hub.
  - Interface flapping (down/up frequently): possibly bad cable or NIC, or auto-negotiation issues.
- **Transceivers (GBIC/SFP):** If fiber, check transceiver LEDs, ensure correct wavelength (LX vs SX, etc.), fiber type, and that TX on one end goes to RX on the other.
- **Wireless Physical:** Check antenna connections, signal strength (via `iwconfig` showing Signal level), and interference sources (microwave, etc.). Tools like Wi-Fi analyzers or `iwlist scan` to see channel usage.
- **Environmental:** For critical links, ensure no electromagnetic interference (e.g., high-power devices near UTP cables), and check if cable length is within spec (~100m for Cat5e/6). Also check power (e.g., PoE devices getting correct power?).

**Actionable Steps:**

- Reseat or replace cables one at a time (label to avoid confusion).
- Try a known-good cable or port.
- If duplex mismatch is suspected (one side HDX, one FDX), set both to auto or both to fixed full -- a mismatch often shows as lots of FCS errors on the full-duplex side and collisions on the half side.
- Use cable diagnostics (`ethtool --cable-test` if supported, or a Fluke tester) to identify faults.
- For fiber, use laser visual fault locator (red light) or optical power meter to ensure light is transmitted.
- For wireless, adjust antennas, reduce distance, remove obvious interferers (or change channel in case of Wi-Fi).

### Layer 2: Data Link

**Scope:** Covers switching, MAC addresses, ARP, VLANs, link layer protocols (PPP, Frame Relay, etc.), and so on.

**Symptoms of Layer 2 issues:**

- IP configured correctly but cannot reach gateway (perhaps ARP not resolving).
- Duplicate IP address warnings (often a result of duplicate MAC or misconfig at L2).
- VLAN issues: devices in same IP subnet not reaching each other because they are on different VLANs or VLAN mis-tagged.
- STP (spanning tree) problems: certain ports blocked causing network segments unreachable, or STP topology changes causing flapping.
- Flooding or loops: network is very slow or unreachable because of a broadcast storm or loop (often L2 issue).

**Checks and Tools:**

- **ARP Table:** Run `arp -a` on hosts to see if the MAC of the gateway (for example) is present. If an IP cannot be reached, see if ARP resolution happens. No ARP entry or incomplete indicates L2 might be at fault (no reply to ARP request).
- **ARPing:** Use `arping` tool to send ARP pings to a neighbor on the same subnet -- useful for isolating whether basic L2 connectivity and ARP works.
- **Duplicate MAC/IP:** If duplicate IP, you might see an ARP flux (MAC for IP oscillating). Some OS warn "duplicate IP detected". Use `arp -a` to see if two different MACs show up for the same IP intermittently.
- **Switch Port/VLAN:** On managed switches, check that the ports are in the correct VLAN and not in err-disable state. Commands like `show vlan`, `show interface switchport` on Cisco, etc. If using trunking, ensure tagging is correct and native VLAN matches.
- **Spanning Tree:** If a switch thinks there is a loop, STP may block ports. `show spanning-tree` can identify if the port connecting a segment is in blocking state. If an entire VLAN is not forwarding, STP might have put it in an unintended topology. Look for topology change counters incrementing frequently (sign of instability).
- **MAC Address Table:** On switches, `show mac address-table address <MAC>` or similar, to see where a MAC is learned. If a MAC is not present where expected, frames might not be getting through. Or if one MAC is seen on two ports, that indicates a loop or mirror.
- **Link Aggregation (LAG):** If using EtherChannel/bonding, ensure all member links are up and in the bundle. A misconfigured LAG (LACP) can cause traffic black-holing if one side bundles and other doesn't.
- **PPP/Frame-relay** (if applicable): Check LCP status, DLCI mappings, etc. Often more specialized, but e.g., a PPPoE link, use `poe-status` or logs to see if link layer is up.
- **Linux Bridge / Virtualization:** If troubleshooting inside a VM host: ensure the virtual switch or bridge has the correct interfaces added, and that it's not blocking traffic (some hypervisors by default block promiscuous or unknown MACs unless allowed).

**Actionable Steps:**

- Clear ARP cache (`ip neigh flush` in Linux, `arp -d` on Windows) and see if it re-populates when you ping -- if not, likely the ARP request isn't getting through. Then focus on the switch or VLAN.
- If suspect VLAN issue, do a controlled test: Put two devices in the same switch port VLAN and see if they communicate. Or use a laptop on a switch port and tag it as needed to test reachability.
- For duplicate IP: identify the MAC addresses involved (the `arp -a` shows MAC). Use switch's MAC address table to trace which port that MAC is on, then find the offending device.
- Temporarily disable STP (not recommended in production blindly) or use STP tools: e.g., `spanning-tree bpduguard` and BPDUguard errors in logs indicate unexpected switches connected.
- Use a packet capture (tcpdump/Wireshark in promisc mode) on one device to see if ARP requests are coming and going. For instance, Device A ARPs for gateway -- capture on Device B in same VLAN: does Device B see the ARP? Does gateway respond? If Device B doesn't see it, VLAN or switch issue. If it sees request but no reply, maybe gateway issue or L3 problem.
- If a loop is suspected (broadcast storm): physically unplug suspected links to break the loop and observe if traffic normalizes. Then redesign or fix STP (enable RSTP, add loop guard, etc.).

### Layer 3: Network

**Scope:** IP layer -- routing, IP addressing, subnetting, ICMP, etc.

**Symptoms of Layer 3 issues:**

- "Host unreachable" or "Network unreachable" errors.
- Can communicate within local subnet (Layer2) but not outside (routing issue).
- One subnet can't reach another (missing or incorrect route, or wrong default gateway).
- Duplicate IP addresses (could also be considered L3 if same IP on two hosts).
- Routing loops (packets going in circles) or black holes (packets disappear).
- TTL expired messages (could indicate routing loop or extremely long path).

**Checks and Tools:**

- **IP Configuration:** Verify IP address, subnet mask, and default gateway on hosts (`ifconfig`/`ip addr` on Linux, `ipconfig` on Windows). A single wrong netmask can cause host to think something is local when it's not or vice versa.
- **Route Table:** On hosts, check `ip route show` (Linux) or `route PRINT` (Windows) to ensure there's a default route and any specific routes needed. Missing default gateway = can't reach outside local subnet. Wrong metrics or multiple default routes can cause unpredictable behavior.
- **Ping Tests:**
  - Ping the local gateway (if that fails, likely a L2 or gateway down issue).
  - Ping a host on another subnet (if fails, possibly routing or firewall).
  - Ping 8.8.8.8 (to test external without DNS).
  - Use IPv6 ping (`ping6` or `ping -6`) to test IPv6 connectivity if relevant, as it might be separate from IPv4.
- **Traceroute:** Use traceroute (`traceroute` on Linux, `tracert` on Windows) to see the path and where it stops​

  [kb.wisc.edu](https://kb.wisc.edu/ir/12364#:~:text=,6%20neighbor%20show)

  ​

  [kb.wisc.edu](https://kb.wisc.edu/ir/12364#:~:text=%3E%20%20%20,)

  . If it stops immediately after your gateway, likely the next-hop router doesn't know how to reach the destination (or is filtering). If it goes out a few hops and then loops or oscillates, could be a routing loop.

- **Routing Devices:** On routers, check routing tables (`show ip route` on Cisco etc.). Look for missing routes or incorrect next-hops. If using dynamic routing (OSPF/BGP), check neighbor status (`show ip ospf neighbor`, etc.) and ensure routes are being advertised.
- **ICMP Errors:** If ping says "destination host unreachable" and the message comes from your local router, that means your router has no route. If it says "destination net unreachable" from some intermediate router, that router didn't have a route. "TTL expired" indicates a loop or extremely long path.
- **Subnet overlaps:** Ensure subnets are unique. If two interfaces/networks have overlapping IP ranges, routers can get confused where to send traffic.
- **NAT issues:** If using NAT (on a firewall or router), misconfig can cause no connectivity. E.g., if NAT overload is not configured, internal may ping out but not get replies. Tools: try to see if your source IP is seen correctly on the other side (maybe use a service like httpbin to see your IP).
- **Policy routing / VPNs:** If there are PBR (policy-based routes) or VPN, ensure traffic is hitting the correct policy. For VPN, common issue: traffic goes out VPN but reply doesn't come back because of missing route on far end (or vice versa). Use traceroute or specific host pings to verify path.
- **IPv6 Considerations:** Check `ip -6 route` for IPv6 routes, ensure link-local addresses are used properly for next-hops (with `%interface` notation if pinging link-local). Common IPv6 issue: IPv6 address configured but no default gateway (or RAs not received). Use `rdisc6` or `ndisc6` to see RA details or check for DHCPv6.

**Actionable Steps:**

- If a host can't reach outside: confirm it has the correct default gateway and that gateway is alive. If not, set the correct gateway.
- If a particular network is unreachable from another: add or correct the route in the router. For example, if Network A can't reach Network B, likely either the router connecting them is missing a route for B or the reply route from B's side is missing.
- Use traceroute results to decide where to investigate next. If it dies at a certain hop consistently, log into that hop (if possible) to check routes or ACLs.
- For internet issues: try different public IP (maybe the site is down). If all external pings fail but internal works, suspect DNS (if by name) or default route/ISP. Check modem/router to ISP, maybe reboot if needed or check ISP's status.
- Remove any recently added static routes that might be wrong or have incorrect netmask. Or conversely, add static route for a network if dynamic routing isn't set up for it.
- **Routing loop**: If TTL expired at some point, do a traceroute with maximum TTL and see repeating pattern. Identify the devices involved and inspect their routing tables for a route pointing to each other. Break the loop by correcting the route or removing the faulty one.
- Test with and without firewall (if host firewall, disable temporarily to ensure it's not that).
- For multi-homed servers (two NICs), ensure that replies go back out the same interface they came (asymmetric routing can cause firewalls to drop). Use policy routing if needed to separate traffic.
- **IPv6**: If ping6 to another local link-local requires specifying interface (e.g., `ping6 fe80::1%eth0`), that's normal. But if global IPv6 doesn't work, ensure default via router's link-local is set (e.g., `fe80::1%eth0`). Many OS get this from router advertisements -- check if RA is received (use `tcpdump -nv icmp6 and 'ip6[40] == 134'` to capture RAs). If not, enable RA on router or set static gateway.

### Layer 4: Transport

**Scope:** TCP/UDP (and others like ICMP in Layer3 already). Focus is on ports, connections, flow control.

**Symptoms of Layer 4 issues:**

- Cannot connect to a service even though ping works (so IP is reachable but TCP port might be closed or filtered).
- Connections are reset or timeout (could be firewall or service crash).
- Many connections in SYN-SENT or SYN-RECEIVED state (half-open connections).
- Specific protocols (TCP vs UDP) behave differently (e.g., UDP works but TCP doesn't, maybe due to MTU or firewall).
- Throughput issues due to window size or packet loss (manifest as slowness at the transport layer).

**Checks and Tools:**

- **Port reachability:** Use `nc -vz host port` as described to test TCP ports. Or `telnet host port` (for TCP) to see if you get a connect (even if nothing useful prints, a blank screen means open usually, and "Connection refused" means no service or firewall actively refused).
- **ss/netstat:** Check `ss -tulwn` on server to ensure the service is actually listening on the expected port and on the expected address (listening on 127.0.0.1 vs 0.0.0.0 will make it unreachable externally).
- **Firewall Rules:** On the host, check `iptables -L` (or `ufw status`, `firewall-cmd --list` depending on firewall) to see if the port is allowed. On network firewall, verify rules for that port.
- **TCP three-way handshake:** If possible, capture with tcpdump to see if SYN, SYN/ACK, ACK happens. If you see SYN repeated with no SYN/ACK, likely server never responded (service down or filtered). If SYN, SYN/ACK, then RST, possibly the client or some device sent RST (maybe firewall or OS RST because app not listening).
- **Connection states:** If you suspect too many open connections, check `ss -s` which shows count in each state​

  [phoenixnap.com](https://phoenixnap.com/kb/ss-command#:~:text=,of%20remote%20machine%20and%20port)

  . For example, a high number of sockets in `TIME-WAIT` is normal after a server handling many short connections (could tune TIME_WAIT or use reuse). Many in `SYN-RECV` could indicate half-open (maybe a SYN flood or backlog issue).

- **Window size / performance:** Use `ss -ti` to see info on specific TCP connections (cwnd, etc.). Or capture traffic and look at window size in Wireshark.
- **UDP behavior:** Use `tcpdump` to see if UDP packets are reaching the service and if any response comes. Remember UDP has no built-in handshake, so you rely on application protocol or lack of ICMP errors to gauge success.
- **Reset vs Timeout:** Distinguish these failure modes: "Connection refused" (means you got a RST -- port closed) vs timeout (no response -- filtered or host down).
- **Special Transport Protocols:** If using something like QUIC (UDP-based), ensure UDP can flow. For SCTP, use appropriate tools or fall back to generic logs/captures.
- **Load balancers/NAT:** If a load balancer is in play, it might be resetting or not passing traffic. Check LB health checks and config. If NAT, ensure the mapping is correct (especially for UDP, might need persistent).
- **Simulate traffic with tools:** Use `hping3` for custom TCP/UDP packet crafting (e.g., send a SYN to a port and watch for SYN/ACK or RST).
- **Server logs:** Sometimes the application log will show connection attempts or errors at transport (like "Too many open files" if running out of sockets).

**Actionable Steps:**

- On the server, start the service if not running, or correct it to listen on the right interface. Example: a web server might only listen on IPv6 and not IPv4, so IPv4 connections fail -- fix config to listen on both.
- If firewall is blocking, add a rule to allow the port or disable firewall for testing. Many times "I can ping but not telnet port 80" is firewall dropping port 80.
- For ephemeral port issues (like firewall blocking high ports needed for responses), ensure those are allowed or use active mode alternatives (like FTP passive vs active issues).
- If lots of TIME_WAIT causing resource issues, consider enabling TCP reuse or adjusting kernel params (or in application use SO_LINGER or proper shutdown).
- Adjust TCP window scaling or offloads if you suspect they cause issues (some firewalls or older systems might have problems with window scaling -- disabling it on a test connection might confirm).
- For long fat networks (high latency, high bandwidth), if throughput is low, maybe increase `tcp_rmem`/`tcp_wmem` (Linux) or use iperf with larger window to see improvement.
- If you see repeated SYN and then a late SYN/ACK (like after 3 SYNs, then connection), maybe the server was overloaded (not responding promptly). Check server performance or backlog (`net.core.somaxconn` etc on Linux).
- If clients are getting reset after some time, could be idle timeout on a stateful firewall or load balancer. Check those configurations.
- For UDP services (e.g., DNS, VoIP), if no response, try from server's perspective: does it receive the request (use tcpdump) and does it send a reply? If reply sent but client not getting it, maybe an intermediate firewall is blocking or NAT not set for UDP return.

### Layer 5-7: Session, Presentation, Application

(These layers often blend together in real-world troubleshooting, focusing on the application-level protocols and data.)

**Scope:** Everything above transport -- e.g., SSL/TLS (session/encryption), application protocols (HTTP, FTP, SSH, SQL, etc.). Most troubleshooting at these layers involves specific application behaviors or data formats.

**Symptoms:**

- The connection is established (TCP okay) but the application is not functioning (e.g., you can telnet to port and it connects, but the application itself returns an error or nothing).
- Authentication failures, data corruption, incorrect content.
- Protocol-specific errors: HTTP 500 errors, FTP transfer failing after connect, email not being delivered (SMTP issues), etc.
- Session timeouts or disconnects (maybe an application server dropping connections after a certain time).
- SSL handshake failures (cannot establish TLS session, certificate errors).

**Checks and Tools:**

- **Application Logs:** Most services (web server, database, etc.) have logs. Check those for errors (500 errors with stack trace, etc.). They often pinpoint misconfigurations or deeper issues.
- **Try a different client/tool:** Use command-line clients to remove GUI or app complexities. e.g., `curl` for HTTP/HTTPS to see raw output and headers (use `-v` for verbose SSL handshake info). Use `openssl s_client -connect host:443` to see details of TLS handshake (certs, etc.). Use `ftp` or `sftp` command-line to isolate issues.
- **Session layer (TLS):** For TLS issues: Check certificate validity (dates, CN/SAN matching host, trusted CA). `openssl s_client` will show certificate chain and any certificate sent by server. If failing in browser but working in s_client, could be intermediate cert missing, etc. Also check if both client and server support a common TLS version and cipher (tools like `nmap --script ssl-enum-ciphers -p 443 host` can list ciphers).
- **Data formatting:** If data looks garbled, maybe an encoding issue. For example, if transferring a file in ASCII mode vs binary in FTP can corrupt binary files.
- **Session management:** If an app uses sticky sessions (in load balancer) and that's not working, user might get logged out or session lost. Monitoring cookies or session IDs between requests can show if it's switching.
- **API/Protocol Testing:** For structured protocols (REST APIs, SOAP, etc.), use tools like `curl` or Postman with known good requests. Compare a working environment to the problematic one. If API returns error, check server side for that error context.
- **DNS at App level:** Some apps might use DNS differently (e.g., looking up specific records). Ensure DNS is not the issue at app layer (we covered basic DNS earlier at L3, but e.g., an app might expect a certain DNS SRV record for service discovery).
- **Throughput vs App Speed:** Maybe network is fine (iperf good) but app is slow due to application issues (N+1 queries in a database, etc.). Distinguish network throughput from application throughput (maybe measure how fast app sends data once connection established).
- **Wireshark for application protocols:** Use Wireshark to decode application protocol. It can parse HTTP, FTP, SMB, etc. See if, for example, an HTTP request gets a redirect or a specific error code with details. The **Follow TCP Stream** helps to see the full request/response.

**Actionable Steps:**

- If authentication fails (e.g., SSH "no matching key exchange"), update configurations to support common algorithms, or check credentials. For example, a user may be using wrong password or the server using LDAP that's down.
- For encrypted traffic, if suspecting TLS version mismatch, enable newer TLS on server or use a client that supports older if needed (temporary workaround). Ultimately upgrade outdated components (TLS1.0/1.1 no longer recommended).
- Clear caches or cookies for web issues to ensure it's not a client caching problem. Or try a different browser.
- Restart application service if it's hung (after checking logs). Sometimes the service might accept TCP but then not respond (thread hung). A restart might restore service, and logs/monitoring should be reviewed to prevent recurrence.
- If a specific operation always fails (like uploading a file via HTTP gives 502 error), isolate: is it file size (maybe hitting a limit), file content (triggering a bug), or consistent after certain time (possibly a timeout). Adjust server config (e.g., increase timeout or file upload limit).
- **Reconfigure after changes:** If network changes occurred (like moved server to new IP), ensure application config updated (some apps have IPs in config or require restart to pick up new DNS).
- For database-driven apps, ensure the app can actually reach the DB (use `telnet dbhost 3306` for MySQL, etc.). If the network path is fine but app still can't query, check DB logs for refused connections (maybe user privileges or max connections reached).
- **Use maintenance modes:** Some apps have debug modes or can output more info to client. For example, an API might return detailed error with a debug flag. Utilize that when safe.
- If suspect intermediate devices (like an HTTP proxy or content filter) messing with traffic, test direct if possible (bypass proxy).
- **Comparative Analysis:** Does the problem occur for all clients or just some? If one user has issue, could be client-side (clear their config, reinstall client software, etc.). If all users have issue, focus server-side.
- **Load Impact:** If problem is only under load (e.g., slow at peak time), consider scaling resources or optimizing application. Use performance monitoring (CPU, memory of app servers, DB performance) to see if it's an app bottleneck vs. network.

**Session timeouts:** E.g., VPN disconnects every 2 hours -- likely a session key lifetime. Check settings on VPN server. Or an application logs people out after 5 minutes -- possibly a config or an unintended consequence of a proxy with a short idle timeout.

**In summary**, layers 5-7 troubleshooting often boils down to application-specific knowledge:

- Understand how the application is supposed to work (protocol and sequence).
- Use appropriate client tools and logs to find deviations.
- Verify no lower-layer issues; once confirmed, focus on the app's error messages or lack thereof.

## Best Practices for Effective Troubleshooting

Finally, regardless of tools and layers, certain best practices can make network troubleshooting more efficient and prevent common pitfalls:

- **Baseline Knowledge:** Know your network's normal state. Maintain documentation: network diagrams, IP addressing schemes, device configs, and typical performance metrics. This helps quickly identify what's abnormal.

- **Change Management:** Keep track of recent changes. Many outages are caused by a recent config change or update. Always ask "What changed?" if something suddenly broke. Use version control for configurations if possible, to diff changes.

- **One Change at a Time:** When adjusting things to fix an issue, change one variable at a time and test. If you reconfigure multiple things at once, you may not know which action solved it (or which caused a new issue).

- **Reproduce the Problem:** If possible, recreate the issue in a controlled environment. For instance, if a certain API call fails, try it on a test system. Or if a user's PC can't connect but others can, see if any specific config on that PC differs.

- **Layered Approach:** As shown above, use a structured approach. Often **Bottom-Up** (start at physical and move up) is useful if you suspect physical issues. **Top-Down** (start at application) can be faster if the symptom is clearly an application failure (and you assume lower layers are likely okay). Be ready to jump layers if evidence points that way.

- **Divide and Conquer:** Isolate segments of the network. Use loopback tests (ping 127.0.0.1 to test local TCP/IP stack, ping own IP to test NIC handling). If an issue is between A and D, test between A and B, B and C, etc. along the path to find where it fails.

- **Use the Right Tool for the Scope:** Don't use only ping for everything -- while it's a great basic tool, it might mislead (ICMP might be blocked even if other traffic flows). Choose tools relevant to the protocol (use HTTP tools for web issues, etc.).

- **Documentation of Findings:** As you troubleshoot, note what you checked and results. This not only helps if you have to escalate to someone else (they see what's done) but also builds a personal knowledge base. It also prevents going in circles checking the same thing repeatedly.

- **Time Management:** If an issue is taking too long or is too critical, escalate or get a second pair of eyes. Sometimes just explaining the problem to someone or writing it down can spark an idea (Rubber Duck debugging).

- **Non-Intrusive vs Intrusive:** Start with monitoring and diagnostics that don't disrupt service (sniffing, observing, querying). Only start pulling cables, rebooting devices, or changing configs when you have evidence pointing to that and during an appropriate maintenance window if possible (unless it's an emergency outage).

- **Check for Common Causes:** Some issues occur frequently:

  - Wrong default gateway, subnet mask.
  - Overlooked ACL blocking traffic.
  - Duplex mismatch causing slow performance.
  - DNS name not updated (still pointing to old IP).
  - Expired certificates causing TLS failure.
  - MAC address flapping between ports (spanning-tree issue).
  - Broadcast storm consuming bandwidth.
  - Power saving settings disabling NIC (on some PCs).
  - Misconfigured MTU leading to dropped large packets (especially with VPNs -- see MTU section).

- **Use Maintenance Mode / Windows:** For planned changes or testing, if possible, schedule downtime. This reduces pressure and risk. E.g., if you suspect a switch is faulty, plan to swap it in a window rather than ripping it out mid-day (unless outage dictates).

- **Communication:** Keep stakeholders informed in major incidents. And if you identify the issue, share the knowledge with the team (update that cheat sheet!). Over time, a team builds a collective memory of "we saw something like this before, it was the DHCP relay...".

- **Monitoring Systems:** Make use of NMS (Network Monitoring Systems). If SNMP traps or monitoring alerts show a device down or high utilization at the time of issue, those clues can save troubleshooting time.

- **Backup Configs and Firmware:** Sometimes upgrading firmware fixes obscure issues (like a NIC driver bug causing resets). Keep devices updated (in a controlled manner). And always have backups of configs so that if you need to factory reset a device for troubleshooting, you can restore it.

- **Be Systematic but Creative:** Follow the logic systematically, but also consider atypical causes if standard checks don't yield results (e.g., consider ISP routing issues, misconfigured client software, etc.). Think of the OSI layers as a guide, but real issues can span multiple layers (e.g., a flapping link (L1) causing OSPF adjacency resets (L3) which in turn cause intermittent app timeouts (L7)).

- **Safety and Impact:** When capturing traffic or enabling debug logs, be mindful of performance and security. For instance, on a production firewall, enabling detailed logging might max CPU. Or capturing packets on a busy interface might drop packets. Plan accordingly (short captures, filters, or span the traffic to another monitoring box if possible). Also handle any captured data securely (it might contain sensitive info).

- **Continual Learning:** Networking is vast. Each troubleshooting session can be a learning experience. Note anything new (like a command or a symptom) and add it to reference material. Over time, patterns emerge and you'll troubleshoot faster.

**Tables of Common Commands & Outputs:**

For quick reference, here's a summary of some common commands and their purpose:

| **Tool/Command**       | **Purpose**                                 | **Example**              | **Expected Output/Interpretation**                                                                                          |
| ---------------------- | ------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **ping**               | Check IP reachability (ICMP Echo)           | `ping -c 4 8.8.8.8`      | 4 replies with TTL and time if OK. Loss% if some dropped; timeout for no reply. Latency indicates round-trip time.          |
| **traceroute/tracert** | Trace path (hops) to destination            | `traceroute example.com` | Lists hops with their IP/hostnames and response times per TTL. `* * *` indicates no reply for that TTL (hop may be hidden). |
| **arp -a**             | View ARP cache (Layer 2 resolution)         | `arp -a`                 | Shows IP to MAC mappings. Incomplete or none for a needed IP means ARP failing.                                             |
| **ip addr / ifconfig** | Show local interface IP configuration       | `ip addr show eth0`      | Lists IP addresses, subnet, and state (UP/DOWN) for eth0. Check if correct and UP.                                          |
| **ip route / route**   | Show routing table (Layer 3 routes)         | `ip route`               | Shows default gateway and network routes. Ensure a default route exists for internet traffic.                               |
| **ss / netstat**       | Show socket connections and listening ports | `ss -tuln`               | Lists listening ports (tcp/udp) with addresses. Verify service is listening on correct interface/port.                      |
| **nc (netcat)**        | Test port connectivity / send data          | `nc -vz 10.1.1.5 80`     | Verbose scan result: "succeeded" if able to connect​                                                                        |

[ionos.com](https://www.ionos.com/digitalguide/server/tools/netcat/#:~:text=Netcat%20confirms%20the%20detection%20of,port%20with%20the%20message%20%E2%80%9Csucceeded%21%E2%80%9D)

, or "refused/timed out" if not. |
| **tcpdump** | Capture packets for analysis | `tcpdump -i eth0 -nn port 53` | Shows DNS queries/replies on eth0. Use to verify if packets are arriving or leaving. |
| **mtr** | Continuous traceroute + ping | `mtr -rw 8.8.8.8` | Displays each hop, latency, loss%. Identify where loss or latency begins to spike. |
| **dig** | DNS lookup queries | `dig @8.8.8.8 example.com A +short` | Returns IP(s) for example.com. If none, possibly DNS issue or domain doesn't exist. |
| **ethtool** | NIC link status and config | `ethtool eth0` | Shows speed/duplex and "Link detected". Non "yes" link or incorrect speed indicates L1 problem. |
| **openssl s_client** | Test SSL/TLS handshake to a server | `openssl s_client -connect host:443` | Outputs certificate and handshake details or errors. Useful for debugging SSL issues (cert trust, protocols). |
| **curl** | Send web/API request (supports HTTP, etc.) | `curl -I http://example.com` | Gets HTTP headers. Check for HTTP status (200 OK, 404, 500, etc.). `-I` fetches HEAD only. |
| **iperf3** | Measure throughput between two hosts | `iperf3 -c server -P 4 -t 10` | Outputs bandwidth per thread and total. Use to verify network can push expected Mbps. |
| **ss -s** | Socket summary (states) | `ss -s` | Shows counts like `estab 5, syn-sent 2, timewait 10`. Many in syn-sent or timewait might indicate issues (half-open or heavy usage).​

[phoenixnap.com](https://phoenixnap.com/kb/ss-command#:~:text=,of%20remote%20machine%20and%20port)

|
| **tracepath** (Linux) | Trace route and also discover MTU along path | `tracepath 8.8.8.8` | Similar to traceroute but also prints Path MTU if it discovers (e.g., `pmtu 1500`). If MTU issue, might show a lower MTU or where fragmentation needed. |
| **nslookup** / **host** | Simple DNS lookup tools | `nslookup example.com` | Resolves DNS using system resolver. (Deprecated in favor of dig for detailed info, but quick check). |
| **wireshark** (or **tshark**) | Deep packet inspection and protocol decode | `tshark -i eth0 -Y "tcp.flags.reset==1"` | Captures and filters e.g. TCP resets. Wireshark GUI for detailed analysis (e.g., follow stream, decode SSL with keys if provided, etc.). |

_(The above table provides a quick glance of commands discussed throughout and how to interpret their outputs.)_
