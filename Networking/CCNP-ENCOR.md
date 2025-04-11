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
