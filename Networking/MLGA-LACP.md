Below is a deep-dive, CCIE-level exploration of MLAG (Multi-Chassis Link Aggregation) on Arista and Brocade platforms. I’ll cover the underlying control- and data-plane mechanisms, failure scenarios, STP interactions, load-balancing intricacies, consistency checks, and vendor-specific nuances. Grab a cup of coffee—this will be detailed!

Table of Contents
MLAG Fundamentals
1.1. What MLAG Solves
1.2. Control Plane Components
1.3. Data Plane Behavior
1.4. Split-Brain & Failure Handling

MLAG on Arista EOS
2.1. Control-Plane Mechanics (EOS Implementation)
2.2. Configuration & Consistency Checks
2.3. CEF/FIB Load Balancing & Hashing
2.4. STP/MSTP/EVPN Integration
2.5. Failure Modes & Convergence
2.6. Key “Show” Commands & Interpretation

MLAG on Brocade ICX/VDX
3.1. Control-Plane Mechanics (ICX/VDX Implementation)
3.2. Configuration & Consistency Checks
3.3. Forwarding Behavior & Hashing
3.4. STP/MSTP Integration & Options
3.5. Failure Modes & Convergence
3.6. Key “Show” Commands & Interpretation

Comparative Analysis & Best Practices
4.1. Peer Keepalive vs. Peer Link Distinction
4.2. Configuration Consistency Checks Across Vendors
4.3. STP Interaction & Loop Prevention
4.4. Load-Balancing Considerations
4.5. Scaling, MTU, and Jumbo Frames
4.6. Troubleshooting Methodology

Deep-Dive Failure Scenarios & Packet Walks
5.1. Peer Link Down, Keepalive Alive
5.2. Keepalive Down, Peer Link Alive
5.3. Symmetric Failure: Both Down
5.4. Downstream Device Mis-configuration

<a name="mlag-fundamentals"></a>

1. MLAG Fundamentals
   Before jumping into vendor specifics, let’s make sure we share a rock-solid understanding of why MLAG exists, what its control-plane pieces are, and how data forwarding works. At a CCIE level, you must be able to verbally (and in writing) explain both the theory and the practical “why-it-works” behind each behavior.

<a name="what-mlag-solves"></a>

1.1. What MLAG Solves
Active/Active access aggregation across two physical switches:

Traditional LACP/EtherChannel requires all member links to terminate on the same switch (or a switchstack). If you plug half your LAG links into Switch-A and half into Switch-B without MLAG, LACP negotiation will fail or STP blocks to prevent loops.

MLAG (a.k.a. multi-chassis EtherChannel, vPC on Cisco Nexus, Virtual Chassis LAG on Juniper) lets you spread LAG member ports across two separate chassis while making downstream devices believe they are connecting to a single logical switch.

Improved resiliency:

If one chassis dies completely (power-off, control-plane crash), the downstream device’s LAG does not flap entirely; instead, traffic shifts onto the surviving MLAG peer’s member ports.

No STP blocking on MLAG links:

Because the two choke points (switches) present themselves as a single logical L2 entity, spanning-tree treats their MLAG port-channel to downstream as one link. This lets you run active/active L2 multipathing without STP blocking one of the paths.

Graceful “split-brain” handling:

The MLAG control protocol (keepalive + peer link) ensures that if the two peers lose control-plane synchronization, they don’t both believe the other is gone and stay active for downstream. Instead, one side shuts down its MLAG member ports (“orphan ports”) to avoid a dual-active scenario.

<a name="control-plane-components"></a>

1.2. Control Plane Components
MLAG control-plane has two primary components:

Peer Keepalive (Heartbeat)

A small L3 (or OOB) channel, usually via an SVI, loopback, or dedicated management interface, on a separate VLAN or L3 network.

Purpose: Exchange periodic “I’m alive” messages so each peer knows the other’s control plane is healthy and active.

Peer Link (LACP Port-Channel)

A logical LAG built from a set of physical links carrying both data VLANs (if desired) and MLAG synchronization information.

Purpose: Forward LACP data-plane PDUs from downstream, sync FDB/ARP entries, and allow each peer to confirm that its neighbor is still forwarding and has consistent state.

Can also carry VLANs used by downstream, but many designs recommend isolating keepalive on a separate VLAN to avoid mixing data and control.

Note: Some vendors support dedicated “MLAG inter-switch link” protocols that ride inside the Peer Link to exchange MAC-table updates, IGMP snooping sync, etc.—but generally, the Peer Link itself piggybacks on LACP + BPDUs + MLAG info.

<a name="data-plane-behavior"></a>

1.3. Data Plane Behavior
When everything is healthy:

Downstream sends a frame (e.g., host H1 sends to H2).

Ingress hashing: The host’s NIC (or downstream switch) picks one of the physical member links of the LAG using a hash (often based on IP/MAC tuple). That frame goes to one of the MLAG peers (A or B).

Peer Link utilization: If the MAC-table lookup tells the network that the destination resides on the other MLAG peer, the first switch forwards the frame across the Peer Link to the other.

Egress: The switch that has the destination MAC sends it to the correct downstream port (either out its local LAG member or out to upstream).

FDB Sync: Both MLAG peers synchronize learned MAC addresses and VLAN membership across the Peer Link so that future frames from the same source can be forwarded directly without “hairpinning.”

In effect, the MLAG peers maintain a single, synchronized FDB/MACT per VLAN and appear as one logical switch to downstream.

<a name="split-brain--failure-handling"></a>

1.4. Split-Brain & Failure Handling
Split-brain = loss of MLAG control-plane synchronization (Peer Keepalive fails or Peer Link fails). The goal is to avoid a scenario where both switches independently believe they’re the “only” active peer and continue forwarding, causing duplicated or unknown unicast frames, MAC confusion, or loops.

Peer Keepalive Up, Peer Link Down

The control plane still “knows” the neighbor is alive, but it cannot forward data/VLAN/MACT updates.

Each switch must decide which one is the “primary” and which is the “secondary” (often by comparing system MAC or a configured priority).

Primary: Continues forwarding on its MLAG member ports.

Secondary: Shuts down its MLAG member ports to avoid dual-active. All downstream traffic is forwarded via the Primary.

Example: Arista uses “Role Election” rules—default: higher system MAC → Primary. You can also explicitly assign mlag role primary/secondary in config.

Peer Keepalive Down, Peer Link Up

Some traffic can still cross the Peer Link, but since nodes cannot verify the neighbor’s control-plane status, both peers shut down their MLAG member ports to avoid split-brain. This is called a “safeguard.”

Neither switch forwards on its LAG to downstream until Keepalive returns. This effectively blackholes downstream until the keepalive link is re-established.

Both Peer Keepalive & Peer Link Down

Complete isolation: neither peer believes it can forward with confidence. Typically, both shut down MLAG member ports. Downstream sees the entire LAG go down (fail-open).

Re-synchronization

When both control channels come back up, MACT tables and VLAN membership must be re-synchronized.

Some platforms use an “MLAG reconciliation” handshake to compare local vs. remote VLAN lists and FDB entries. Arista runs a “Full Sync” over the Peer Link if a discrepancy is detected.

<a name="mlag-on-arista-eos"></a>

2. MLAG on Arista (EOS)
   Arista’s MLAG implementation is mature—widely deployed in leaf/spine fabrics. It’s sometimes called “Multi-Chassis Ethernet” or simply “MLAG.” Below is a CCIE-grade exploration of how Arista’s control-plane works, how CEF (WEDGE/RIB/FIB) handles hashing, consistency checks, and the detailed failure modes.

<a name="control-plane-mechanics-eos"></a>

2.1. Control-Plane Mechanics (EOS Implementation)
MLAG Configuration Namespace

Under mlag configuration, you define:

domain-id <X>

peer-link <port-channel>

keepalive destination <IP> source <IP> [vrf <vrf-name>]

Optional: role primary/secondary, keepalive retry-interval, keepalive timeout.

Arista stores this data in a logically separate MLAG control process that sits alongside the switching “agent” (FRR + CFM).

Keepalive Mechanism

EOS crafts a proprietary MLAG heartbeat packet (not standard BFD) and sends it to the peer’s keepalive IP via the SVI.

Default is every 200ms, timeout 2s. These can be tuned for faster detection (e.g., 50ms/500ms for data center latency).

The “keepalive” is an encapsulated packet with a small header:

css
Copy
Edit
[ETH] → [VLAN Tag] → [IPv4 src=10.1.1.1 dst=10.1.1.2] → [MLAG-keepalive header]
If a peer misses 10 consecutive keepalives (given 200ms retry), it flags Keepalive Down.

Peer Link

Built as a LACP Channel-Group (Active/Passive) across Arista nodes.

Once the peer link comes up, the MLAG process sends a “Hello” over the port-channel’s LACP data path (using a dedicated EtherType) to exchange:

VLAN membership lists (so each peer knows which VLANs the other is trunking over).

FDB/MACT entries: each MAC learned on Switch-A is replicated to Switch-B (and vice versa) so they maintain a single MAC database.

IGMP snooping group membership (if enabled).

ARP snooping or ND entries (if EVPN/Azure).

Role Election

By default, Arista picks the higher system MAC as Primary, lower as Secondary.

You can override with:

pgsql
Copy
Edit
mlag configuration
domain-id 1
role primary ← forces this switch to be Primary if matched
Once roles are set and both Keepalive & Peer Link are up, both peers have the same “authorized VLANs,” identical MACT, and a common state for STP, LACP, and EVPN.

FDB Synchronization

When a MAC is learned on one peer’s downstream port, it sends an MLAG FDB-update to the other over the Peer Link.

That entry is then installed in the kernel’s Bridge Forwarding Database on both devices.

The CEF (EPHY) can then pick the correct outgoing port—whether locally to a downstream VLAN port or across the Peer Link to the other peer.

Consistency Checks
EOS enforces:

Peer Link consistency:

Port-Channel members must match speed/duplex/MTU.

VLAN trunks must match (S/T native VLAN, allowed VLAN list).

Downstream LAG consistency:

VLAN lists, trunk mode, and LACP mode must match on both peers’ side.

If any mismatch appears in show mlag consistency-check, it marks that MLAG group as “inconsistent” and prevents it from forwarding until fixed.

<a name="configuration--consistency-checks-eos"></a>

2.2. Configuration & Consistency Checks
Peer Link (Port-Channel10) Setup Example

shell
Copy
Edit
aristaA(config)# interface Ethernet1/1-2
aristaA(config-if-range)# speed 10000
aristaA(config-if-range)# mtu 9216
aristaA(config-if-range)# channel-group 10 mode active
aristaA(config-if-range)# no shutdown
aristaA(config)# interface Port-Channel10
aristaA(config-if-po10)# description MLAG-Peer-Link
aristaA(config-if-po10)# switchport mode trunk
aristaA(config-if-po10)# switchport trunk native vlan 1
aristaA(config-if-po10)# switchport trunk allowed vlan 10,100-200
aristaA(config-if-po10)# mtu 9216
aristaA(config-if-po10)# no shutdown
Both peers must mirror exactly these settings (speed, MTU, trunk VLAN list, etc.) or show mlag consistency-check will flag a failure.

MLAG Domain & Keepalive

shell
Copy
Edit
aristaA(config)# mlag configuration
aristaA(config-mlag)# domain-id 1
aristaA(config-mlag)# peer-link Port-Channel10
aristaA(config-mlag)# keepalive destination 10.1.1.2 source 10.1.1.1
aristaA(config-mlag)# keepalive retry-interval 50 ! faster MLAG convergence
aristaA(config-mlag)# keepalive timeout 500
aristaA(config-mlag)# role primary ! override default role
aristaA(config-mlag)# exit
Downstream MLAG LAG (Port-Channel20)

shell
Copy
Edit
aristaA(config)# interface Ethernet1/3-4
aristaA(config-if-range)# speed 10000
aristaA(config-if-range)# mtu 9216
aristaA(config-if-range)# channel-group 20 mode active
aristaA(config-if-range)# no shutdown

aristaA(config)# interface Port-Channel20
aristaA(config-if-po20)# description MLAG-Downstream
aristaA(config-if-po20)# switchport mode trunk
aristaA(config-if-po20)# switchport trunk native vlan 1
aristaA(config-if-po20)# switchport trunk allowed vlan 100-200
aristaA(config-if-po20)# mtu 9216
aristaA(config-if-po20)# mlag 1 ! tie to MLAG domain 1
aristaA(config-if-po20)# no shutdown
Again, ensure Switch-B has identical configuration:

Same channel-group number (20), same LACP mode, same MTU, same trunk VLAN list, and mlag 1 under Port-Channel20.

Checking Consistency

shell
Copy
Edit
aristaA# show mlag consistency-check
This command will list any parameter mismatches:

Speed/duplex mismatches on Peer Link or MLAG link members

VLAN mismatches (native VLAN, allowed VLAN list)

MTU mismatches

LACP mode mismatches

ABORT vs. SHUTDOWN

If a mismatch is detected, the MLAG peer will not enable that Port-Channel as an MLAG member (it could still forward traffic locally, but MLAG functions are disabled).

In EOS 4.x/5.x, you might see port-channel interface get “suspended” for MLAG until you fix the inconsistency.

<a name="cef-fib-load-balancing--hashing-eos"></a>

2.3. CEF/FIB Load Balancing & Hashing
Default Hash Algorithm

Arista uses a symmetric CRC hash over packet fields to decide which link in a Port-Channel carries a given flow. By default, this is based on:

Layer-2: Source MAC, Destination MAC

Layer-3: Source IP, Destination IP

Layer-4: Source TCP/UDP port, Destination TCP/UDP port

Symmetric Hash

Ensures that a bidirectional flow (A→B and B→A) uses the same physical link to avoid out-of-order packet delivery.

Customization

You can adjust the hashing behavior per port-channel:

shell
Copy
Edit
aristaA(config)# port-channel load-balance ethernet source-destination-ip
or

shell
Copy
Edit
aristaA(config)# port-channel load-balance ethernet source-destination-mac-ip
This is important for workloads with very few unique flows (e.g., big-data clusters) where default hash might concentrate many flows on one link.

CEF (Distributed Forwarding)

Once the packet enters the switch and resolves the LAG hash, CEF programs the corresponding egress interface into the ASIC (e.g., Arista’s Broadcom Trident, Jericho, etc.).

If the destination MAC resides on Switch-B (peer), the forwarding decision looks like:

bash
Copy
Edit
dest_mac → lookup FIB → next_hop = Peer-Link (Port-Channel10) → hash → egress physical link (Ethernet1/1 or 1/2) → hardware forwards
On the receiving peer, CEF then replicates the packet to the correct downstream port, following the local MAC table.

<a name="stp-mstp-evpn-integration-eos"></a>

2.4. STP/MSTP/EVPN Integration
Spanning Tree (PVST+/RSTP/MSTP)

Downstream sees Port-Channel20 as one logical STP port. Engines within EOS (bridge SSM) allocate a single STP port-ID to that port-channel.

Since both peers present the same STP Bridge ID, the LAG to downstream never blocks—there’s no RBPU/TCPU storms or alternate port states on the MLAG link.

If one peer fails, the surviving peer continues forwarding BPDUs (for that Port-Channel) so the downstream stays in forwarding state.

EVPN Integration

Arista EVPN multi-homed scenario uses MLAG as the underlay. Under BGP‐EVPN, you run EVPN Type-2 (MAC/IP advertisement), and both peers advertise identical ESI (Ethernet Segment Identifier), so upstream L3 gateway (or VPC peer) sees a single segment.

Control-plane peering uses EVPN‐Multicast for ARP/ND suppression.

Typically, you also add evpn multi-homing under MLAG domain for proper ES-import/ES-export behavior.

IGMP Snooping & MLD

When IGMP snooping is enabled, MLAG peers exchange IGMP group membership over the Peer Link. This ensures multicast traffic floods only on ports where hosts want it—even on the MLAG Peer Link.

<a name="failure-modes--convergence-eos"></a>

2.5. Failure Modes & Convergence
Peer Keepalive Failure (but Peer Link Up)

Detection: After missing keepalive retry-interval × retry-count (e.g., 50ms × 10 = 500ms), switch marks Keepalive as Down.

Role Check:

If this switch is Primary: stays as active, continues forwarding on MLAG ports.

If this switch is Secondary: immediately shuts down all its MLAG member ports, sending a “LACP down” to downstream. Downstream then re-hashes traffic to Primary’s member ports.

Peer Link: remains Up, so FDB updates still flow, but no new traffic should go to Secondary.

Peer Link Failure (but Keepalive Up)

Detection: LACP PDUs or MLAG PDUs over the Peer Link cease.

Both peers detect “Peer Link Down”—they can no longer guarantee synchronized forwarding.

VLAN membership might still match, but FDB updates will not propagate.

Action:

Primary: continues forwarding on its MLAG member ports.

Secondary: brings down (blocks) its MLAG member ports to avoid a dual-active situation.

Result: Downstream sees only Primary’s LAG up.

Simultaneous Keepalive & Peer Link Failure

Essentially a total split. Neither peer can verify the other’s control-plane or data-plane.

Both peers block MLAG member ports. Downstream sees the entire LAG down. Next-hop-level redundant paths (if any) must handle traffic.

Unidirectional Peer Link Congestion

If the Peer Link carries data VLANs (not just MLAG control), a congested Peer Link can lead to delayed FDB updates.

Arista’s QoS (CoS) mechanisms let you prioritize MLAG PDUs over regular traffic. You can assign CoS 7 to MLAG control frames so they don’t starve.

MAC-Flap Suppression

If the same MAC is learned on both MLAG peers due to a loop, Arista suppresses flaps by marking that MAC as “flapping” and may shut down the associated ports if flaps exceed a threshold.

You can tune mac address-table max-flaps or disable flap detection on that VLAN if necessary.

<a name="key-show-commands--interpretation-eos"></a>

2.6. Key “Show” Commands & Interpretation
show mlag

Provides a one-line summary:

yaml
Copy
Edit
MLAG Configuration:
Domain ID: 1
Local Role: Primary
Peer Address: 10.1.1.2
Local Interface: Port-Channel10
Peer-Link Status: up
Keepalive Status: up
show mlag detail

Displays instantiated LAGs, VLAN sync status, and if any consistency checks failed.

Shows the number of FDB entries learned locally vs. remote, IGMP sync status, EVPN status (if enabled).

show mlag consistency-check

Lists each mismatch category (e.g., VLAN allowed lists, MTU, LACP mode).

Very useful immediately after config changes: if a port-channel is not coming up as MLAG, this is the first place to look.

show port-channel summary / show port-channel load-balance

Ensures the port-channel is up (SU for L2, RU for routed).

Verifies member interfaces are “Active” and that the channel is synchronized with MLAG.

show interfaces ethernet 1/1 detail (or the physical ports)

Check transceiver status, interface counters (drops, errors), and negotiate speed/duplex/MTU.

If physical link mismatches occur (e.g., one side forced to 10G full, other to auto), the port-channel cannot form.

show vlan / show running-config mlag

Confirm VLAN membership, SVI addresses, VRRP (if used), and that keepalive SVI is correctly configured.

show lacp neighbor

Verifies that downstream LACP neighbors see the same system priority, port priority, key, and LACP rate (fast/slow). A mismatch here can prevent downstream forming a stable LAG.

<a name="mlag-on-brocade-icxvdx"></a>

3. MLAG on Brocade ICX/VDX
   Brocade’s MLAG (often called Private Trunk on older ICX, or “Multi-Chassis Trunking” on VDX) has subtle syntax differences but similar functionality: maintain a single FDB across two peers, present one logical LAG to downstream, and gracefully handle failure. Below is a CCIE-level breakdown.

<a name="control-plane-mechanics-icxvdx"></a>

3.1. Control-Plane Mechanics (ICX/VDX Implementation)
MLAG Configuration Namespace

On Brocade ICX (7.x+), you run:

arduino
Copy
Edit
switch(config)# mlag configuration
switch(config-mlag)# domain-id 10
switch(config-mlag)# local-ip <IP> peer-ip <IP>
switch(config-mlag)# peer-link port-channel <X>
switch(config-mlag)# keepalive-interval <ms> ← optional
switch(config-mlag)# exit
On some VDX releases, the syntax is identical; on older ones, you might see peer-id <ID> instead.

Peer Keepalive

Brocade uses a proprietary “MLag Keepalive” encapsulation over a VLAN’s SVI or a dedicated L3 link.

Default keepalive is every 1s, with a 3s timeout. Can be tuned via keepalive-interval <ms>.

Brocade’s MLAG keepalives also carry:

MAC-table synchronization data

IGMP membership (if snooping is enabled)

Optional QoS counters for MLAG link health.

Peer Link

Configured as a LACP port-channel (e.g., port-channel 1 mode active).

Underneath, Brocade’s bridging SU process multiplexes:

LACP PDUs for downstream negotiation

MLAG FDB sync PDUs (Brocade proprietary encapsulation)

STP BPDUs (if the Peer Link is also doing STP across MLAG)

Regular VLAN data frames (if body VLANs are trunked).

Role Election

By default, Brocade picks the higher switch MAC address as Primary.

You can override with mlag configuration local-priority <number> (lower number = higher priority, so 1 wins over 2).

The Primary handles bottom-of-funnel forwarding if the Peer Link fails; the Secondary gracefully surrenders.

FDB Synchronization

When a MAC is learned on Switch-A’s downstream interface, it unconditionally sends an MLAG update to Switch-B over the Peer Link.

If both peers have the same MAC learned on different ports (e.g., ephemeral loop), Brocade logs a MAC-flap event and may disable the offending port if flapping exceeds a threshold.

Consistency Checks

Brocade enforces:

VLAN trunk configuration match (native VLAN, allowed VLANs, voice VLAN)

Interface speed/duplex/MTU on port-channel member ports

LACP rate (fast vs. slow)

If a downstream LAG on Switch-B has a mismatched VLAN list vs. Switch-A, that MLAG member port is flagged “suspended” for MLAG but may still pass local traffic if not tied to MLAG.

<a name="configuration--consistency-checks-icxvdx"></a>

3.2. Configuration & Consistency Checks
Peer Keepalive VLAN (VLAN 100)

shell
Copy
Edit
ICX-A(config)# vlan 100 name MLAG-KEEPALIVE
ICX-A(config-vlan-100)# exit
ICX-A(config)# interface ve 100
ICX-A(config-if-ve100)# ip address 192.168.100.1/24
ICX-A(config-if-ve100)# no shutdown
Peer Link (LACP Port-Channel 1)

shell
Copy
Edit
ICX-A(config)# interface ethernet 1/1/1-1/1/2
ICX-A(config-if-range)# port-channel 1 mode active
ICX-A(config-if-range)# speed 10000
ICX-A(config-if-range)# mtu 2124 jumbo ! if using Jumbo
ICX-A(config-if-range)# no shutdown

ICX-A(config)# interface port-channel 1
ICX-A(config-if-po1)# description MLAG-Peer-Link
ICX-A(config-if-po1)# switchport mode trunk
ICX-A(config-if-po1)# switchport trunk allowed vlan 100,200-300
ICX-A(config-if-po1)# no shutdown
MLAG Domain Setup

shell
Copy
Edit
ICX-A(config)# mlag configuration
ICX-A(config-mlag)# domain-id 10
ICX-A(config-mlag)# local-ip 192.168.100.1
ICX-A(config-mlag)# peer-ip 192.168.100.2
ICX-A(config-mlag)# peer-link port-channel 1
ICX-A(config-mlag)# keepalive-interval 500 ! 500ms between heartbeats
ICX-A(config-mlag)# exit
Downstream MLAG LAG (Port Channel 2)

shell
Copy
Edit
ICX-A(config)# interface ethernet 1/1/3-1/1/4
ICX-A(config-if-range)# port-channel 2 mode active
ICX-A(config-if-range)# speed 10000
ICX-A(config-if-range)# mtu 9216 jumbo
ICX-A(config-if-range)# no shutdown

ICX-A(config)# interface port-channel 2
ICX-A(config-if-po2)# description MLAG-Downstream
ICX-A(config-if-po2)# switchport mode trunk
ICX-A(config-if-po2)# switchport trunk allowed vlan 200-300
ICX-A(config-if-po2)# mlag 10 ! tie port-channel2 to domain 10
ICX-A(config-if-po2)# no shutdown
Verifying Consistency

shell
Copy
Edit
ICX-A# show mlag consistency
Checks VLAN lists, trunk type (tagged vs. untagged), LACP mode, MTU, and speed.

Flags “Non-compliant” member ports if their configuration mismatches the peer.

<a name="forwarding-behavior--hashing-icxvdx"></a>

3.3. Forwarding Behavior & Hashing
Hashing Algorithm

Brocade uses a 32-bit symmetric CRC hash that can include:

Source MAC, Destination MAC

Source IP, Destination IP

L4 ports (if enabled)

VLAN ID (optional for even distribution)

Symmetric Guarantee

Ensures both directions of a flow traverse the same physical port. Critical for TCP reliability.

Customization

You can adjust via:

shell
Copy
Edit
ICX-A(config)# port-channel load-balance ethernet source-destination-ip ! or
ICX-A(config)# port-channel load-balance ethernet source-destination-mac-ip-port ! etc.
FDB & ARP Synchronization

When ICX-A learns a MAC or ARP, it sends a “Multicast MLAG FDB Sync” to ICX-B.

Brocade encapsulates this in a proprietary EtherType (0x88XX). Both peers install the MAC into their bridging and CEF tables.

<a name="stp-mstp-integration--options-icxvdx"></a>

3.4. STP/MSTP Integration & Options
Spanning Tree

Brocade runs RSTP/MSTP on each switch. Downstream sees the port-channel as one logical STP port.

Since both peers share the same Bridge ID (they sync BPDUs across the Peer Link if you run STP on that port), STP never blocks one of the MLAG member links.

BPDU Forwarding

If you do run STP across the Peer Link, BPDUs learned on downstream Port-Channel2 are forwarded over the Peer Link to the other switch so both appear as one logical bridge. This prevents an unintended root election between the two peers.

Loop Avoidance

If the Peer Link fails, the Secondary (lower-priority) stops forwarding BPDUs on the downstream port, so the Primary’s downstream path remains the only STP-forwarding path.

IGMP/MLD Snooping Sync

By default, Brocade MLAG syncs IGMP group membership over the Peer Link so multicast traffic only floods where there are listeners.

<a name="failure-modes--convergence-icxvdx"></a>

3.5. Failure Modes & Convergence
Peer Keepalive Failure (Peer Link Up)

After missing keepalive-interval × retry-count (e.g., 500ms × 3 = 1.5s), each peer sees “Keepalive Down.”

Primary remains forwarding on its MLAG member ports.

Secondary disables (“suspends”) all MLAG member ports. Downstream sees only Primary’s member links.

Peer Link Down (Keepalive Up)

LACP PDUs from the peer no longer are received, but keepalive still arrives via SVI.

Primary: continues forwarding.

Secondary: suspends MLAG member ports.

Note: Both peers still accept keepalives, so they both know the other is alive—this ensures one side (Secondary) doesn’t try to forward.

Both Keepalive & Peer Link Down

Neither peer can confirm the other’s status—both shut down MLAG member ports, forcing a complete blackout on that MLAG. Downstream LAG goes down entirely.

Re-sync After Failure

When Keepalive and Peer Link return, they exchange full FDB/MACT over the Peer Link before allowing MLAG member ports to re-activate.

If a MAC was learned on Secondary while in isolation, it repopulates the new FDB on Primary (and vice versa) to ensure both have synchronized state.

<a name="key-show-commands--interpretation-icxvdx"></a>

3.6. Key “Show” Commands & Interpretation
show mlag

Basic MLAG summary:

yaml
Copy
Edit
MLAG Domain 10
Peer IP: 192.168.100.2
Local IP: 192.168.100.1
Peer State: Active
Local State: Active
Peer Link: port-channel1 (Up)
Keepalive: Up
show mlag detail

Provides:

List of synchronized VLANs

Number of MAC entries learned locally vs. remote

IGMP group membership counters

Timestamp of last Sync

show mlag consistency

Enumerates any config mismatches on port-channel members (speed, MTU, VLAN mismatches).

If a downstream LAG is not coming up, likely a “non-compliant” error is flagged here.

show lacp neighbor

Verifies the downstream LACP neighbor sees the correct system priority, key, port priority.

A mismatch in LACP key or rate will prevent the LAG from forming or cause it to be passive/active mismatch (one side “active,” other “on”).

show interfaces ethernet 1/1/1 counters detail

Check CRC, input errors, discards—especially on Peer Link. Any physical-layer issues here can cause intermittent Peer Link failures.

show vlan / show running-config mlag

Double-check VLAN membership on the Peer Link: if you forgot to allow VLAN 100, keepalive SVIs cannot reach each other.

<a name="comparative-analysis--best-practices"></a>

4. Comparative Analysis & Best Practices
   Below is a side-by-side summary of key points, followed by CCIE-level best practices.

<a name="peer-keepalive-vs-peer-link-distinction"></a>

4.1. Peer Keepalive vs. Peer Link Distinction
Aspect Arista EOS Brocade ICX/VDX
Encapsulation Proprietary MLAG heartbeat inside IPv4 (SVI or loopback) Proprietary “MLAG Keepalive” over IPv4 (SVI or MGMT port)
Default Timers Retry 200 ms / Timeout 2000 ms Interval 1 s / Timeout 3 s (tunable via keepalive-interval)
Priority Election Higher System MAC → Primary (override with mlag role primary) Higher System MAC → Primary (override with local-priority)
Config Namespace mlag configuration under global config mlag configuration under global config
Packet Types Over Link MLAG FDB sync, IGMP sync, VLAN sync, EVPN Type-2 (if enabled) MLAG FDB sync, IGMP sync, VLAN sync
Failure Behavior Keepalive fails → Secondary’s MLAG ports down; Peer Link fails → Secondary’s MLAG ports down; Both fail → both down Identical behavior: Secondary suspends MLAG member ports when any control plane failure occurs

<a name="configuration-consistency-checks-across-vendors"></a>

4.2. Configuration Consistency Checks Across Vendors
Peer Link Settings:

Speed, duplex, MTU, channel-group mode (Active/Passive vs. On), and VLAN trunk configuration (native VLAN, allowed VLAN list) must match exactly on both peers.

Downstream LAG (MLAG member ports) also must match between peers: same LACP mode, same VLAN trunk config, same MTU.

BEST PRACTICE:

Script or use IaC (Ansible/Puppet) to push identical configurations to both MLAG peers.

Immediately run show mlag consistency-check (Arista) or show mlag consistency (Brocade) after config changes.

<a name="stp-interaction--loop-prevention"></a>

4.3. STP Interaction & Loop Prevention
Single Bridge ID

Both peers must present the same STP Bridge ID for the downstream MLAG port. This is usually automatic because they share the same system MAC or because the Peer Link floods BPDUs across the domain.

If you manually tweak STP Bridge IDs (e.g., on Arista: spanning-tree bridge-priority), ensure they match.

BPDU Forwarding

On Arista, if STP runs on the Peer Link, the MLAG code forwards BPDUs learned on downstream ports to the peer so both have a unified topology view.

Same for Brocade’s MLAG: BPDUs from downstream sides go across Peer Link so both think they’re a single bridge for those VLANs.

Failure & STP

If the Peer Link fails but Keepalive is Up, Secondary blocks downstream MLAG ports, so downstream STP sees only Primary’s connection—no loop.

If Keepalive fails (Peer Link Up), same behavior: Secondary blocks, Primary stays forwarding.

PortFast/Edge Port

If your downstream is an access port to a server, you can configure PortFast (Arista: spanning-tree portfast, Brocade: spanning-tree portfast) on Port-Channel interfaces. MLAG peers will sync the portfast state across.

<a name="load-balancing-considerations"></a>

4.4. Load-Balancing Considerations
Hash Distribution

Both vendors use symmetric CRC-based hashing to distribute flows evenly.

CCIE-level nuance:

If you have asymmetric traffic patterns (e.g., East-West large flows), consider adding Layer-4 fields into the hash (source/dest ports) to better distribute TCP flows.

If two hosts keep communicating with same endpoints (single 5-tuple), all traffic might end up on one link; adjust hash algorithm accordingly.

Peer Link Utilization

In a pure leaf/spine fabric, you want minimal hairpinning. Design FIB such that the ARP/MAC for the destination is learned locally whenever possible.

If a downstream MAC is learned on Switch-B, and a frame arrives at Switch-A, Switch-A will forward across the Peer Link only for that first frame (to learn the MAC). Subsequent frames go directly to that same peer by rewriting the FIB entry.

Symmetric Hash Under Failure

When Secondary’s member ports go down, downstream LACP rehashes to Primary’s remaining links. This can cause micro-bursts. Tune LACP timers (fast timers: 1 s or 100 ms) to speed up rehash.

<a name="scaling-mtu-and-jumbo-frames"></a>

4.5. Scaling, MTU, and Jumbo Frames
MTU Synchronization

All MLAG ports (Peer Link + Downstream LAGs) must share the same MTU. A mismatch leads to packet drops or PMTU blackholing.

Arista: set system mtu jumbo <bytes> globally before configuring port-channels; verify show system mtu.

Brocade: set jumbo mtu <bytes> globally, then on individual interfaces if necessary.

Jumbo & FDB Sync

MLAG control frames (FDB sync, IGMP sync) are typically small, but if data VLANs carry jumbo frames, the Peer Link must also carry jumbo.

CCIE Tip: Always test with ping -s <payload> across MLAG domains before production—e.g., ping 192.168.100.2 size 9000 to validate jumbo path.

<a name="troubleshooting-methodology"></a>

4.6. Troubleshooting Methodology
Verify Physical Connectivity

show interfaces ethernet <x/y> status (Arista) or show interfaces ethernet <x/y> (Brocade).

Check for flaps, CRC errors, speed mismatches.

Check LACP Status

show lacp neighbor (both platforms): confirm neighbors see the same system ID, port priority, and active mode.

A mismatch (e.g., one side “active,” other “passive” when mismatch) can cause the bundle not to form.

Validate Peer Link

show port-channel summary to ensure the Peer Link port-channel is Up (Arista: SU for L2).

show mlag consistency-check (Arista) or show mlag consistency (Brocade) to catch trunk/VLAN mismatches.

Check Keepalive

show mlag and show mlag detail. Look for “Keepalive Status: up/down.”

If it’s down, confirm SVI reachability: ping <peer-keepalive-ip> vrf <vrf>.

Look for Split-Brain

If “Peer Link Up” but “Keepalive Down,” Secondary should have MLAG member ports down—downstream link lights can confirm.

If both Up but one traffic path doesn’t work, check FDB sync: show mac address-table | include <MAC> on each peer—does each peer know the same entries?

Test Downstream LAG

Use a Linux or Arista test box: ethtool -S bond0 (Linux) or show interfaces port-channel <n> counters detail (Arista) to see if traffic is balanced.

<a name="deep-dive-failure-scenarios--packet-walks"></a>

5. Deep-Dive Failure Scenarios & Packet Walks
   At CCIE level, you should be able to walk through exactly what happens in each failure event. Below are four critical scenarios, with packet-level detail.

<a name="peer-link-down-keepalive-alive"></a>

5.1. Peer Link Down, Keepalive Alive
Event: Fiber cut (or cable unplug) on one of Peer Link’s member ports → LACP on Peer Link goes down. Now the port-channel remains “down” or “partial.”

Arista/Brocade Reaction:

Peer Link is marked Down, but keepalive SVIs still communicate (peer keepalive up).

Each peer’s MLAG control sees “Peer Link Down, Keepalive Up.”

Role election is revisited: the peer with mlag role primary (Arista) or local-priority 1 (Brocade) becomes/maintains Primary.

Primary: Continues advertising FDB entries, keeps downstream MLAG LAG forwarding.

Secondary: Immediately shuts down (“suspends”) MLAG member ports to prevent loop or duplicated forwarding.

Packet Walk:

Host H1 sends a frame to H2. Hash picks a member interface on the downstream LAG towards Secondary (which is now suspended). That port is administratively down → fails immediately.

Downstream LACP rehashes to Primary’s member ports (within <1 s if fast LACP).

Host H1’s traffic now flows via Primary’s link to MLAG domain; destination MAC either local or forwarded across Peer Link (if learned on Secondary) → continues as normal.

Downstream Impact: Micro-burst while LACP rehashes, but no traffic drop once rebalanced.

<a name="keepalive-down-peer-link-alive"></a>

5.2. Keepalive Down, Peer Link Alive
Event: SVI for keepalive is accidentally misconfigured or routed away. Peer Link remains up, so LACP and some MLAG PDUs still cross.

Arista/Brocade Reaction:

Peer Link PDUs (LACP sync, etc.) continue, but keepalive heartbeats stop. Both peers see “Keepalive Down.”

Fail-safe: Both peers conclude they can’t trust each other’s control plane.

Both peers flush or stop advertising MLAG FDB entries. Both suspend MLAG member ports (secondary behavior).

Result: Downstream sees the entire MLAG LAG go down (fail-open). Traffic blackholes until keepalive is restored.

Packet Walk:

H1 sends to H2. Hash picks a port toward Switch-A’s MLAG LAG. That port is suspended → packet dropped. Downstream sees LAG as down.

To restore, fix keepalive SVI connectivity. Once keepalive comes back, peers exchange full FDB sync, then bring MLAG member ports back up one by one.

<a name="symmetric-failure-both-down"></a>

5.3. Symmetric Failure: Both Down
Event: Both Peer Link and Keepalive go down simultaneously (e.g., a power failure on one switch, plus VLAN outage).

Arista/Brocade Reaction:

Both peers detect control plane failure.

Both peers shut down MLAG member ports. Downstream sees entire LAG down.

Packet Walk:

Same as Keepalive Down scenario. No split-brain risk because both peers are isolated.

Recovery:

Bring keepalive and/or Peer Link back. If keepalive returns first, peers stay down until Peer Link also returns (to ensure data-plane sync). Then a full FDB sync happens before MLAG member ports recover.

<a name="downstream-device-mis-configuration"></a>

5.4. Downstream Device Mis-configuration
Event: The downstream server is configured for static “mode on” port-channels, but Arista/Brocade peers expect LACP (mode active/passive).

Arista/Brocade Reaction:

LACP negotiation never completes. Port-channel stays in “down” or “suspended” state, so no frames can pass.

Packet Walk:

Host H1’s NIC sends a packet on eth0. That NIC is forced up (no LACP negotiation), but Switch disconnects it since it’s not in an active LACP bundle.

No traffic flows.

Resolution:

Align the downstream LAG to LACP: set channel-group 20 mode active (Arista) or port-channel 2 mode active (Brocade).

Alternatively, configure MLAG to accept mode on (some platforms allow static LAG with MLAG, but it is unsupported or dangerous—always best practice to use LACP).

6. Comparative Analysis & Best Practices
   Now that you’ve seen how both vendors implement MLAG, here are distilled CCIE-level best practices and subtle differences to call out:

<a name="peer-keepalive-vs-peer-link-distinction"></a>

6.1. Peer Keepalive vs. Peer Link Distinction
Peer Keepalive

Purpose: Verify liveness of the control plane only. No large-scale state (like VLAN lists or FDB) is exchanged here—only heartbeat.

Vendor nuance:

Arista: Runs proprietary L3 keepalive over an SVI, often untagged or on a dedicated VLAN.

Brocade: Similar, but can also run on dedicated OOB interfaces if desired.

Peer Link

Purpose: Exchange all “stateful” information: FDB, VLAN membership, IGMP, EVPN, etc. Relies on LACP data path for reliability.

Always an LACP port-channel (Arista: mgmt-if up, channel-group X mode active with peer-link; Brocade: port-channel X mode active with peer-link).

CCIE Tip: Always isolate keepalive on its own network (either a dedicated VLAN or an OOB network). Never carry user data or MLAG data VLANs on the same link used for keepalive. This prevents a data-plane congestion event or VLAN misconfiguration from blackholing the keepalive.

<a name="configuration-consistency-checks-across-vendors"></a>

6.2. Configuration Consistency Checks Across Vendors
Exact Matching:

Speed/Duplex/MTU: Mismatch → port always down or “suspended for MLAG”.

Allowed VLAN List: Suppose Port-Channel10 on Arista allows VLANs {10,100–200}, but on Brocade you configure {10,100,200} (missing the “101–199”). Consistency check fails → MLAG disabled.

Native VLAN: Must match on both sides.

LACP Mode: One side “active,” other “passive” is acceptable, but both “on” (static) is not.

LACP Rate: Fast (1 s) vs. Slow (30 s) must match.

Automate with IaC:

Use Ansible/Jinja2 templates to generate identical configs for Peer Link and downstream LAG on both peers.

Immediately run a “dry-run” config compare or use “show mlag consistency-check” to catch issues before going live.

<a name="stp-interaction--loop-prevention"></a>

6.3. STP Interaction & Loop Prevention
Single Bridge ID Requirement:

Both MLAG peers must share the same Bridge ID for each VLAN. This is automatic if they share the same system MAC or if you configure the priority identical.

CCIE nuance: If you run MSTP, make sure MST region names, revision levels, and VLAN-to-instance mappings match exactly on both MLAG peers. Otherwise MSTP denies that region—STP information won’t sync over the Peer Link, causing weird behavior.

BPDU Forwarding on Peer Link:

If you trunk STP BPDUs over Peer Link, each MLAG peer effectively sees BPDUs from the downstream side. This ensures a single spanning-tree view.

If you do not trunk STP BPDUs over Peer Link, you must manually configure both peers with the same root-bridge priority for that VLAN (CCIE caution: this is error-prone unless you have a strict design with no VLAN changes).

<a name="load-balancing-considerations"></a>

6.4. Load-Balancing Considerations
Hash Tuning:

With only 2 physical links in a 2-member LAG, hash granularity is coarse—roughly 50/50. If you add more links, you can get closer to equal distribution.

CCIE nuance: Some workloads (e.g., iSCSI, flash-to-flash replication) create few high-bandwidth flows. If your hash only uses L2 fields, a single flow can saturate one link. Use L3/L4 hash.

Arista: port-channel load-balance ethernet source-destination-ip-port

Brocade: port-channel load-balance ethernet source-destination-ip-port

Peer Link RAID:

If downstream MACs flap between peers, you can end up hair-pinning packets (Switch-A → Peer Link → Switch-B → Downstream).

CCIE nuance: In extreme hairpin cases, the Peer Link can become the bottleneck. Design fabrics such that the majority of MAC learning occurs on the local leaf so hairpin is minimized.

<a name="scaling-mtu-and-jumbo-frames"></a>

6.5. Scaling, MTU, and Jumbo Frames
Global MTU Setting Before Peer Link:

Arista: system mtu jumbo 9216 must be issued before you configure ports in a LAG if you plan to run jumbo.

Brocade: jumbo mtu 9216 globally, then verify each interface inherits the MTU (or explicitly set with mtu 9216 under each interface).

CCIE nuance: Inconsistent MTU is one of the most common “unexplained” packet drops—always verify MTU end-to-end.

FDB Sync Encapsulation:

Brocade’s MLAG FDB sync frames are small (under 512 bytes), so they typically fit in non-jumbo frames. Arista’s MLAG uses standard L2 frames—also unaffected by jumbo.

But VLAN data frames if they’re jumbo must use jumbo MTU on both Peer Link and downstream LAG.

<a name="troubleshooting-methodology"></a>

6.6. Troubleshooting Methodology
When MLAG is misbehaving, do the following in order:

Physical Layer

show interfaces EthernetX/Y counters → Check CRC errors, discards, speed mismatch.

show interfaces transceiver <X/Y> → Verify SFP is a matching twin (e.g., two 10 G SR optics).

LACP Status

show lacp neighbor → Confirm downstream sees same system MAC, key, state.

If LACP never forms, the MLAG peer link can’t form, so MLAG never comes up.

Configuration Consistency

show mlag consistency-check (Arista) or show mlag consistency (Brocade).

Fix any mismatch, then do a clear mac address-table dynamic vlan <X> on both peers to force a reboot of FDB sync.

Keepalive Verification

show mlag → Check “Keepalive Status: up/down.”

Try ping <peer-keepalive-ip> from each peer to confirm L3 reachability.

If not reachable, inspect ACLs, VRFs, VLAN membership on SVI.

FDB Table Sync

show mac address-table dynamic vlan <X> → Compare FDB entries on both peers.

If entries differ, run a forced MLAG FDB resync (Arista: clear mlag name <domain> fdb, Brocade: clear mlag fdb).

STP Convergence

show spanning-tree vlan <X> on both peers. They should show identical root bridge info for that VLAN.

If STP config is inconsistent (root guard enabled on one, not on the other), the MLAG domain won’t present as a single bridge.

Traffic-Path Testing

Use a traffic generator (iperf3) from a downstream host to a host on VLAN X on a different switch.

Check counters: show interfaces counters on both MLAG members, and on Peer Link. This reveals hairpin activity or imbalanced hashing.

Event Logs

show logging last 100 | include MLAG (Arista) or show logging buffer | include MLAG (Brocade).

Inspect for FDB flaps, keepalive timeouts, consistency-check errors.

7. Wrapping Up
   At a CCIE level, you should be able to:

Explain the MLAG Control Plane

Exactly how Peer Keepalive and Peer Link interact.

The circumstances under which each peer suspends or re-activates MLAG member ports.

Diagnose Any Failure Scenario

Walk through “If Peer Link goes down, then…,” “If Keepalive goes down, then…,” “Split-brain scenario, then…,” with precise packet flows and control-plane decisions.

Configure & Verify

Push identical, consistent configs to both peers.

Use show mlag consistency-check / show mlag consistency.

Validate FDB/ARP/IGMP sync, STP state, and downstream LACP stability.

Optimize for Production

Tune keepalive intervals, LACP hash, jumbo MTU.

Deploy coherent VLAN/stp designs so MLAG domains don’t inadvertently cause loops.

Document role elections (primary/secondary priorities) so in maintenance windows you know which switch will forward.

Bridge the Concepts

“MLAG is like a logical stack of two switches, but each still has its own CPU, control plane, and management address. They share control state so that to downstream it looks like one big switch.”

“If you can walk through every failure path, re-synchronization step, and audit the show mlag outputs, you can troubleshoot any downstream or upstream misbehavior.”

Feel free to ask if you want even more details—like a step-by-step CLI capture of MLAG bring-up on an EOS lab, or a deeper dive into how Arista’s ASIC programs FDB entries after MLAG sync. You’re well on your way to mastering multi-chassis aggregation, CCIE style!
