# BGP

Configuring Border Gateway Protocol (BGP) on an Arista router involves several key steps to establish and manage routing information between autonomous systems. Here's a comprehensive guide to help you set up BGP on your Arista device:

**1\. Enable BGP and Define the Autonomous System (AS):**

Begin by entering the BGP configuration mode and specifying your router's AS number.

`configure
router bgp [Your_AS_Number]`

**2\. Set the Router ID:**

Assign a unique router ID, typically the IP address of a loopback interface, to identify your router in the BGP network.

`router bgp [Your_AS_Number]
   router-id [Loopback_IP_Address]`

**3\. Configure BGP Neighbors:**

Define the IP addresses and AS numbers of your BGP peers. For external BGP (eBGP) peers, specify their AS numbers; for internal BGP (iBGP) peers within your AS, use your AS number.

`router bgp [Your_AS_Number]
   neighbor [Neighbor_IP_Address] remote-as [Neighbor_AS_Number]`

**4\. Activate Address Families:**

Enable the appropriate address families (IPv4, IPv6, etc.) for your BGP neighbors.

`router bgp [Your_AS_Number]
   address-family ipv4
      neighbor [Neighbor_IP_Address] activate
   exit
   address-family ipv6
      neighbor [Neighbor_IP_Address] activate`

**5\. Advertise Networks:**

Specify the networks you want to advertise to your BGP peers. Ensure these networks are present in your routing table.

`router bgp [Your_AS_Number]
   network [Network_IP_Address/Prefix_Length]`

**6\. Apply Route Policies (Optional but Recommended):**

Implement route maps and prefix lists to control the advertisement and acceptance of routes, enhancing security and manageability.

`ip prefix-list [Prefix_List_Name] seq [Sequence_Number] permit [Network_IP_Address/Prefix_Length]
route-map [Route_Map_Name] permit [Sequence_Number]
   match ip address prefix-list [Prefix_List_Name]
   set [BGP_Attributes]
router bgp [Your_AS_Number]
   neighbor [Neighbor_IP_Address] route-map [Route_Map_Name] in
   neighbor [Neighbor_IP_Address] route-map [Route_Map_Name] out`

**7\. Save the Configuration:**

After completing the setup, save your configuration to ensure it persists across reboots.

`write memory`

**Example Configuration:**

Here's an example of configuring eBGP with a neighbor:

`configure
router bgp 65001
   router-id 192.168.1.1
   neighbor 203.0.113.1 remote-as 65002
   address-family ipv4
      neighbor 203.0.113.1 activate
      network 192.168.1.0/24
   exit
exit
write memory`

**Additional Considerations:**

- **Security:** Implement control-plane access control lists (ACLs) and control-plane policing (CoPP) to protect your router from unauthorized access and potential attacks.

  [Arista](https://arista.my.site.com/AristaCommunity/s/article/bgp-peering-configuration-best-practices-security-and-manageability)

- **Route Reflectors:** In larger networks, consider using BGP route reflectors to reduce the number of iBGP peerings required.

  [IPSpace Blog](https://blog.ipspace.net/2022/10/arista-route-reflector-woes/)

- **Monitoring and Maintenance:** Regularly monitor BGP sessions and routes using commands like `show ip bgp summary` and `show ip bgp neighbors`.

---

## BGP Peering via Loopback Addresses (NX-OS)

switch(config)# feature bgp
switch(config)# router bgp AS-NUMBER
switch(config-router)# router-id A.B.C.D
switch(config-router)# address-family ipv4 unicast
switch(config-router)# neighbor IP-ADDRESS
switch(config-router-neighbor)# remote-as AS-NUMBER
switch(config-router-neighbor)# update-source INT_NAME
switch(config-router-neighbor)# ebgp-multihop [TTL-VALUE]
switch(config-router-neighbor)# address-family AFI SAFI
switch# show bgp ipv4 unicast summary
switch# show bgp ipv4 unicast neighbors

**Explanation**

- `feature bgp`: Enables BGP routing.
- `router bgp AS-NUMBER`: Enters BGP configuration mode and specifies the AS number.
- `router-id A.B.C.D`: Sets the router ID to the specified IP address.
- `address-family ipv4 unicast`: Activates the IPv4 unicast address family.
- `neighbor IP-ADDRESS`: Specifies the IP address of the BGP neighbor.
- `remote-as AS-NUMBER`: Defines the remote AS number of the BGP neighbor.
- `update-source INT_NAME`: Specifies the interface name for the BGP neighbor update source.
- `ebgp-multihop [TTL-VALUE]`: Configures eBGP multihop with the specified TTL value.
- `address-family AFI SAFI`: Activates the specified address family and subsequent address family identifier (SAFI).
- `show bgp ipv4 unicast summary`: Displays a summary of BGP IPv4 unicast routes.
- `show bgp ipv4 unicast neighbors`: Shows detailed information about BGP IPv4 unicast neighbors.

---

## BGP Keep Alive and Hold Time

BGP uses keep-alive and hold-time parameters to maintain the BGP session between peers.
The keep-alive timer determines how often BGP peers exchange keep-alive messages, while the hold-time timer specifies
the maximum time a BGP peer can remain silent before the session is considered down.

**Keep-Alive Timer:**

- Default value: 60 seconds
- BGP peers exchange keep-alive messages to confirm the session is active.
- If a BGP peer does not receive a keep-alive message within the hold-time interval, it considers the session down.

**Hold-Time Timer:**

- Default value: 180 seconds
- Specifies the maximum time a BGP peer can remain silent before the session is considered down.
- The hold-time value should be less than the product of 3 and the keep-alive timer value.

**Adjusting Timers:**

- To adjust the keep-alive and hold-time timers, use the following commands:
  - `neighbor [Neighbor_IP_Address] timers keepalive holdtime`
  - `neighbor [Neighbor_IP_Address] timers keepalive [Keepalive_Time] holdtime [Holdtime_Time]`

**Example Configuration:**

```
router bgp 65001
   timers bgp 30 90 (global timers)
   neighbor Neighbor_IP_Address timers keepalive 30 holdtime 90 (per neighbor )
```
