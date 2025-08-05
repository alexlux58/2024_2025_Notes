# Linux Networking Toolkit Deep Dive

Linux provides a powerful suite of tools for network management and traffic engineering through the **iproute2** package. 
This toolkit replaces legacy commands like `ifconfig`, `route`, and `netstat` with modern, more flexible utilities.

Below is a deep dive into the most common tools: `ip`, `tc`, `ss`, and `bridge`.

---

## 1️⃣ ip — Network Configuration Swiss Army Knife

**Purpose:**  
The `ip` command is the primary tool for managing network interfaces, IP addresses, routing tables, and network namespaces.

**Common Subcommands:**
- `ip link` — Manage network interfaces (like `ifconfig`)
- `ip addr` — View and configure IP addresses
- `ip route` — Manage routing tables
- `ip netns` — Handle network namespaces for container-like isolation

**Example Usage:**
```bash
# Show all interfaces
ip link show

# Bring an interface up or down
ip link set eth0 up
ip link set eth0 down

# Assign an IP to an interface
ip addr add 192.168.1.10/24 dev eth0

# Show routing table
ip route show

# Add a static route
ip route add 10.0.0.0/24 via 192.168.1.1
```

**Use Cases:**
- Bringing up/down interfaces
- Assigning multiple IP addresses to an interface
- Managing policy routing and multipath routes
- Creating isolated test networks with namespaces

---

## 2️⃣ tc — Traffic Control

**Purpose:**  
The `tc` command manages traffic shaping, rate limiting, Quality of Service (QoS), and queuing disciplines (qdisc).  
It is essential for controlling bandwidth, simulating latency, and handling congestion.

**Core Concepts:**
- **qdisc** (Queueing Discipline): Defines how packets are queued/dequeued.
- **class**: A subdivision of traffic for prioritization.
- **filter**: Defines which packets match which class.

**Example Usage:**
```bash
# Limit outbound traffic to 1 Mbps on eth0
tc qdisc add dev eth0 root tbf rate 1mbit burst 32kbit latency 400ms

# Show current traffic control settings
tc qdisc show dev eth0

# Delete all qdisc configurations
tc qdisc del dev eth0 root
```

**Use Cases:**
- Limiting bandwidth per interface or container
- Simulating high latency or packet loss in a lab
- Prioritizing VoIP or streaming traffic
- Preventing one application from saturating the network

---

## 3️⃣ ss — Socket Statistics

**Purpose:**  
`ss` is a modern replacement for `netstat`. It provides real-time insights into network sockets and connections.

**Example Usage:**
```bash
# Show all listening sockets
ss -lnt

# Show connections with process information
ss -ltnp

# Display summary statistics of TCP/UDP
ss -s

# Show connections to a specific port
ss -t sport = :443
```

**Use Cases:**
- Debugging open ports and listening services
- Identifying which process owns a socket
- Checking active connections and TCP states
- Investigating latency or congestion via TCP metrics

---

## 4️⃣ bridge — Layer 2 Network Management

**Purpose:**  
The `bridge` command manages Ethernet bridges (virtual switches).  
Bridges are used to connect multiple interfaces at Layer 2 (switching), commonly in virtualization or container networking.

**Example Usage:**
```bash
# Show existing bridges and interfaces
bridge link show

# Create a new bridge called br0
ip link add name br0 type bridge

# Add eth0 and eth1 to the bridge
ip link set eth0 master br0
ip link set eth1 master br0

# Bring up the bridge
ip link set br0 up

# Show MAC address table for the bridge
bridge fdb show br br0
```

**Use Cases:**
- Creating virtual switches for VMs or containers
- Connecting multiple network segments at L2
- Implementing transparent firewalls or taps
- Building home lab topologies with VLAN support

---

## 🧰 Putting It All Together

A Linux network engineer might combine these tools to:

- Create a **virtual network lab** using `ip netns` and `bridge`.
- Shape and limit traffic using `tc` to emulate WAN conditions.
- Monitor active connections with `ss` for troubleshooting.
- Automate deployments via scripts or Ansible playbooks for reproducibility.

---

### 📌 Tip

Combine these tools with namespaces and virtual Ethernet pairs (veth) to create **fully isolated network environments** for testing routing, firewalls, or distributed systems without physical hardware.

