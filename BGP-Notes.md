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
