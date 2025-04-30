# What is multicast?

## One Packet Source - Multiple Receivers

- Advantages compared to replicated unicast:
  - Efficient use of bandwidth
  - Reduced network congestion
  - Lower latency
  - No single like should theoretically have multiple copies of the same packet
  - The packets are replicated by the multicast core on an as needed basis
- Advantages compared to broadcast:
  - More efficient use of bandwidth
  - Reduced network congestion
  - Lower latency
  - No single link should theoretically have multiple copies of the same packet
  - The packets are replicated by the multicast core on an as needed basis
- Disadvantages:
  - More complex to configure
  - More complex to troubleshoot
  - More complex to manage
  - More complex to monitor
  - More complex to secure
  - More complex to scale

# L3 Multicast

- Source IPs in multicast packets remain unicast
- The destination IPs represent the multicast group
- These destination Multicast IPs belong to a special class
  - Class D
  - All IP addresses that start with 1110
    - 224.0.0.0 - 239.255.255.255
  - 2^28 or 228 mullion addresses
- Class D is considered flat IP space
  - No concept of subnetting
  - Every single IP simply represents a multicast group
- Just like Unicast IPs, there are sub-ranges (not subnets) within this class
  - 224.0.0.0/24 - Local Network Control Block (Routing Protocols)
    - Operate within a link-local scope
    - TTL of 1 or 2
    - e.g., 224.0.0.5 and 224.0.0.6 for OSPF and 224.0.0.9 for EIGRP
  - 232.0.0.0/8 - Source Specific Multicast Block
    - For multicast streams whose sources are already known
  - 239.0.0.0/8 - Organization-Local Scop (Private IPs)
    - Comparable to RFC 1918 IP addresses
    - Should be limited to use within an AS
