# CCNP ENCOR

## Broadcast Domains

- A broadcast domain is a logical division of a network in which all nodes can reach each other by Layer 2 broadcast.
  - a group of devices which will receive a broadcast fame sent by any one of the other devices
- All devices connected to a switch are in the same broadcast domain; switches flood broadcast frames
  - VLANs can be used to divide up broadcast domains on a switch
- Each router interface is a unique broadcast domain; routers do not forward Layer 2 broadcast messages.

## Collision Domains

- A collision domain is a logical division of a network in which collisions can occur.
  - a group of devices which will experience a collision if two devices transmit at the same time
  - All devices connected to a hub are in the same collision domain; hubs do not separate collision domains
  - Each switch port is a separate collision domain; switches do not forward collisions
  - Each router interface is a separate collision domain; routers do not forward collisions
  - Each VLAN is a separate collision domain; VLANs do not forward collisions
  - Each full-duplex Ethernet connection is a separate collision domain; full-duplex connections do not experience collisions
  - Each half-duplex Ethernet connection is a single collision domain; half-duplex connections experience collisions
  - Each wireless network is a single collision domain; wireless networks experience collisions

## Layer 2 forwarding

- Layer 2 forwarding refers to the process switches use to forward frames within a LAN.

  - Although routers operate at "Layer 3", they still are layer 2 aware as they must inspect the destination MAC address of frames they receive,
    and use layer 2 to address frames to the next hop device.

- There are four main message types to be aware of from a layer 2 forwarding perspective:
  - Broadcast: A frame sent to all devices on a network (flooded)
  - Multicast: A frame sent to a group of devices on a network (flood by default )
  - Unicast: A frame sent to a single device on a network (forwarded based on MAC address)
  - Unknown unicast: A frame sent to a device that is not in the switch's MAC address table (flooding)

---

# LAB (L2 Forwarding)

## Linux Commands

```bash
sudo hostname SRV1
sudo ifconfig eth0 192.168.1.11 netmask 255.255.255.0
sudo route add -net 0.0.0.0 gw 192.168.1.1
sudo /etc/init.d/services/dhcp stop
```

---

# Layer 3 Forwarding

- How does a network host (PC, Server, etc.) determine if a packet should be forwarded to the default gateway, or if it can be forwarded directly to the destination host?
  - Source and Destination in same subnet = forward directly
  - source and destination in different subnets = forward to default gateway
- Two operations are used: XOR and AND
  - A 'bitwise operation' operates on a number (IP address) at the level of its individual bits
- XOR is used to compare the bits of the source IP and the destination IP
  - If two bits are the same, the result is 0. If two bits are different, the result is 1.
- After the XOR operation, an AND operation is preformed
- AND compares bits of two numbers and will give a result of 1 if both bits are 1. If either or both of the bits are 0, the result will be 0.
- The sending host uses the AND operator to compare the XOR result and its own subnet mask.
- If the AND result is 0, the destination host is on the same subnet and the packet can be sent directly.
- If the AND result is not 0, the destination host is on a different subnet and the packet must be sent to the default gateway.

- When the router receives the frame/packet, it will change the destination MAC address to that of the next-hop router, and the source MAC address to that of its sending interface.
  - It will also decrement the IP TTL, recalculate the IP header checksum, and recalculate the Ethernet FCS.
- When the final router in the path receives the frame/packet, it will change the destination MAC address to that of the destination host and the source MAC address to that of its sending interface.

  - TTL decrement, IP header checksum, Ethernet FCS

- When it comes to making a Layer 3 forwarding decision, the matching route with the longest prefix length wins.
- What about Administrative Distance and Metric?
  - They are used to determine which routes are added to the routing table.
- After routes are in the routing table, a router will use the most specific matching route rule to make forwarding decisions.

example:

R1 receives a packet destined for 192.168.1.35. The following routes are in its routing table. Which route will it use to forward the packet?

- A RIP route to 192.168.1.32/28, metric 10 (This one is the most specific match)
- An EIGRP route to 192.168.0.0/16, metric 1000
- An OSPF route to 192.0.0.0/8, metric 5
- A static route to 192.168.1.32/32

- A directed broadcast message is a message sent to the broadcast address of another subnet (not the subnet of the sending host)
- When a device wants to send a broadcast to its own subnet, it will use the 255.255.255.255. broadcast address.
- Routers in the path will forward these directed broadcast packets as normal packets.
  - They don't know that the message is destined for a broadcast address, because the IP header only includes a destination IP address, not a destination subnet mask. To them, the packet looks like a unicast packet.
- When the router connected to the destination subnet receives the message, it will know that the destination is a broadcast address (because it knows the subnet mask of the destination network)
  - By default, it will drop the message.
- Forwarding of directed broadcast messages can be enabled with the following command (on the interface the message will be broadcast out of):
  R1 (config-if)# ip directed-broadcast

# ARP (Address Resolution Protocol)

- Layer 2 and Layer 3 addressing provide different functions.

  - Layer 2 addressing is used to identify devices on a local network segment (MAC address)
    - The physical address of each NIC (Network Interface Card) assigned by the manufacturer
    - Deals with directly connected devices
  - Layer 3 addressing is used to identify devices on a network (IP address) from source to the destination host
    - A logical address configured by a network admin
    - Deals with indirectly (and directly) connected devices

- The Layer 3 packet is destined for the end host, and Layer 2 addressing is used to pass the packet to the next hop in the path to the end host.

- ARP is the bridge between L2 and L3; it is used to map a known L3 address to an unknown L2 address.
- ARP was originally defined in RFC 826, and is now defined in RFC 9 03.
- The ARP protocol was designed for Ethernet, but can be used with a variety of L2 and L3 address types
- The sender will use ARP to learn the MAC address of the next hop (\*not necessarily Destination IP of the packet)
- ARP information is stored in a cache so ARP doesn't have to be done for every single packet

## ARP Message Format

- ARP messages are encapsulated directly within an Ethernet header/trailer
  - There is no IP header
- The EtherType (Type field of the Ethernet header) will be 0x0806 to indicate ARP.
- ARP messages are variable in length because it can be used for various L2 and L3 protocols.
  - An IPv4 / Ethernet ARP message is 28 bytes in length.
- Hardware ype (HTYPE)
  - Layer 2 protocol type. Value of 1 indicates Ethernet.
- Protocol type (PTYPE)
  - Layer 3 protocol type. Value of 0x0800 (0d2048) indicates IPv4.
- Hardware Address Length (HLEN)
  - Length of L2 address in bytes. Value of 6 for MAC address.
- Protocol Address Length (PLEN)
  - Length of L3 address in bytes. Value of 4 for IPv4 address.
- Operation (OPER)
  - Indicates the type of ARP message. 1 for ARP request, 2 for ARP reply.
- Sender Hardware Address (SHA)
  - L2 Address of the message's sender
- Sender Protocol Address (SPA)
  - L3 Address of the message's sender
- Target Hardware Address (THA)
  - L2 Address of the message's intended recipient
- Target Protocol Address (TPA)
  - L3 Address of the message's intended recipient

## Proxy ARP

- Proxy ARP was originally defined in RFC 1027, and is now defined in RFC 9 03.
- It allows a device (usually a router) to respond to ARP requests for IP addresses that are not its own.
  - Read RFC 1027 for the original use case of Proxy ARP.
- Modern use cases involve end hosts with incorrect subnet masks. 'directly connected' static routes, and some NAT scenarios.
- Proxy ARP is enabled globally and on each router interface by default (in Cisco IOS).

### Proxy ARP - Mismatched Subnet Masks

- In the below network, PC1 believes that PC1, PC2, PC3, and PC4 are all in the same subnet (192.168.0.0/16).
- When PC1 tries to communicate with PC3 (or PC4), it will send an ARP Request directly to the IP address of PC3 (not the default gateway, R1).
- With Proxy ARP router will think, there is an ARP Request for 192.168.1.13 on my G0/0 interface, even though the 192.168.1.0/24 subnet is not connected to G0/0 (192.168.0.0/16) and is in a different subnet than the source. 192.168.1.13 is not my IP address, but I do have a route for 192.168.1.0/24 in my routing table. So I will reply to PC1's ARP Request on behalf of 192.168.1.13, using MAC address.

## Gratutious ARP

- A Gratuitous ARP message is an ARP Reply (Operation code 2) message sent without receiving an ARP Request.
- There are a few reasons for sending Gratuitous ARP messages:

  - Announcing when an interface comes up
  - Announcing when an interface IP address changes (Failover)
  - Announcing when a MAC address changes

- It serves the purpose of update switches' MAC Address Tables and hosts ARP Tables
  - Cisco IOS devices will refresh an existing ARP Table entry if they receive a Gratuitous ARP message (they will reset the timer to 0 and update the MAC address if it is different than the current entry)
  - However, Cisco IOS devices will not create a new ARP Table entry if they receive a Gratuitous ARP.

# What is MTU?

- The Maximum Transmission Unit (MTU) is the largest size of a packet that can be sent/received over a network from an interface sent from a device.
  - The 'unit' is usually an IP packet (including the IP header)
  - This doesn't include the L2 header/trailer
