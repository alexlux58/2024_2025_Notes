### Question 1

A retail company has set up an AWS Direct Connect connection which includes a private Virtual Interface (VIF) and a VPN connection
to the on-premises data center. On the AWS side, the application environment is contained in a VPC and includes a virtual private gateway.

For traffic originating in the VPC, what is the order of BGP path selection from the MOST preferred to the LEAST preferred?

A. Longest prefix match, Static routes, Direct-connect BGP routes, VPN BGP routes
B. Static routes, Longest prefix match, Direct-Connect BGP routes, VPN BGP routes
C. Direct-connect BGP routes, VPN BGP routes, Longest prefix match, Static routes
D. Longest prefix match, Direct-connect BGP routes, Static routes, VPN BGP routes

<details>
<summary style="color: red;">Answer</summary>

A. Longest prefix match, Static routes, Direct-connect BGP routes, VPN BGP routes

**Explanation:**
AWS uses the most specific route in your route table that matches the traffic to determine how to route the traffic (longest prefix match).
If your route table has overlapping or matching routes, the following rules apply:

If propagated routes from a Site-to-Site VPN connection or AWS Direct Connect connection overlap with the local route for your VPC, the local route is most preferred even if the propagated routes are most specific.

If Propagated routes from a Site-to-Site VPN connection or AWS Direct Connect connection have the same destination CIDR block as other existing static routes (longest prefix match cannot be applied), AWS prioritizes the static routes whose targets are an internet gateway, a virtual private gateway, a network interface, an instance ID, a VPC peering connection, a NAT gateway, a transit gateway, or a gateway VPC endpoint.

When a virtual private gateway receives routing information, it uses path selection to determine how to route traffic. The longest prefix match applies. If the prefixes are the same, then the virtual private gateway prioritizes routes as follows, from most preferred to least preferred:

- BGP propagated routes from an AWS Direct Connect connection
- Manually added static routes for a Site-to-Site VPN connection
- BGP propagated routes from a Site-to-Site VPN connection

Reference:

**https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNRoutingTypes.html**

**Domain**
Design and implement for security and compliance

</details>

---

### Question 2

The networking team at a global company has set up separate VPCs for applications managed by the Finance,
Marketing, Audit and HR departments. You need to set up AWS Direct Connect to enable data flow from
the on-premises data center to each of these VPCs. The company has monitoring software running in the
Audit department's VPC that needs to collect metrics from the instances in all the other VPCs.

Due to budget constraints, the data transfer charges should be kept to a minimum.
Which of the following solutions would you recommend for the given requirement?

A. Create a public VIF to the Audit department's VPC. Peer this VPC to all the other VPCs
B. Create four private VIFs, that is, one VIF each from the on-premises data center to each of the VPCs. Enable VPC peering between all VPCs
C. Create a private VIF to the Audit department's VPC. Peer this VPC to all the other VPCs
D. Create four private VIFs, that is, one VIF each from the on-premises data center to each of the VPCs.
Route traffic between VPCs using the Direct Connect link

<details>
<summary style="color: red;">Answer</summary>

B. Create four private VIFs, that is, one VIF each from the on-premises data center to each of the VPCs. Enable VPC peering between all VPCs

**Explanation:**
A virtual Interface (VIF) is necessary to access AWS services, and can be either public, private or transit, like so:

- Private virtual interface: Should be used to access an Amazon VPC using private IP Addresses.
- Public virtual interface: Can access all AWS public service using public IP addresses.
  A public virtual interface enables access to public services, such as Amazon S3, Amazon DynamoDB, and Amazon EC2.
- Transit virtual interfaces: Should be used to access one or more Amazon VPC Transit Gateways associated with
  Direct Connect gateways. You can use transit virtual interfaces with 1/2/5/10 Gbps AWS Direct Connect connections.
- Direct Connect gateways only support routing traffic from Direct Connect VIFs to VGW (associated with VPC).
  VPC to VPC communication or VIF to VIF communication is not supported via Direct Connect gateways.
  Therefore, to send traffic between two VPCs, you must configure a VPC peering connection.

**Reference:**

**https://docs.aws.amazon.com/directconnect/latest/UserGuide/virtualgateways.html**
**https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/vpc-peering.html**
**https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/amazon-vpc-to-amazon-vpc-connectivity-options.html**

**Domain**
Design and implement AWS networks

</details>

---

### Question 3

A VPC peering connection exists between VPC A and VPC B. The network team has added the following additional configurations
to the existing peering connection:

- VPC A has an AWS Direct Connect connection to a corporate network
- VPC A has a VPC gateway endpoint that connects it to an Amazon S3 bucket

What will be the outcome? (Select Two)

A. Traffic from the corporate network can access VPC B if AWS Direct Connect connection to VPC A is converted to a Site-to-Site VPN connection to VPC A
B. Traffic from the corporate network cannot directly access VPC B by using the AWS Direct Connect connection to VPC A
C. VPC A can be used to extend the peering relationship between VPC B and the corporate network
D. VPC B can't directly access Amazon S3 using the VPC gateway endpoint connection
E. VPC B can directly access Amazon S3 using the VPC gateway endpoint connection to VPC A

<details>
<summary style="color: red;">Answer</summary>

B. Traffic from the corporate network cannot directly access VPC B by using the AWS Direct Connect connection to VPC A
D. VPC B can't directly access Amazon S3 using the VPC gateway endpoint connection

**Explanation:**

- Traffic from the corporate network cannot directly access VPC B by using the AWS Direct Connect connection to VPC A:

You have a VPC peering connection between VPC A and VPC B. VPC A also has a Site-to-Site VPN connection or an AWS Direct Connect connection
to a corporate network. Edge-to-edge routing is not supported; you cannot use VPC A to extend the peering relationship
to exist between VPC B and the corporate network.

- VPC B can't directly access Amazon S3 using the VPC gateway endpoint connection:

You have a VPC peering connection between VPC A and VPC B. VPC A has a VPC gateway endpoint that connects it to Amazon S3.
Edge-to-edge routing is not supported; you cannot use VPC A to extend the peering relationship to exist between VPC B and Amazon S3.
For example, VPC B can't directly access Amazon S3 using the VPC gateway endpoint connection to VPC A.

- Edge to edge routing through a gateway or private connection:

If either VPC in a peering relationship has one of the following connections, you cannot extend the peering relationship to the other VPC:

- A VPN connection or an AWS Direct Connect connection to a corporate network
- An internet connection through an internet gateway
- An internet connection in a private subnet through a NAT device
- A gateway VPC endpoint to an AWS service; for example, an endpoint to Amazon S3.
- (IPv6) A ClassicLink connection. You can enable IPv4 communication between a linked EC2-Classic instance and instances in a VPC
  on the other side of a VPC peering connection. However, you cannot enable IPv6 communication between a linked EC2-Classic instance
  and instances in a VPC on the other side of a VPC peering connection.

**Reference:**

**https://docs.aws.amazon.com/vpc/latest/peering/invalid-peering-configurations.html#edge-to-edge-vgw**
**https://docs.aws.amazon.com/vpc/latest/peering/invalid-peering-configurations.html#edge-to-edge-vgw**
**https://docs.aws.amazon.com/vpc/latest/peering/invalid-peering-configurations.html#edge-to-edge-vgw**

**Domain**

Design and implement AWS networks

</details>

---

### Question 4

A retail company operates its IT infrastructure in a hybrid cloud configuration with the on-premises data center connected to the AWS Cloud
via an AWS Site-to-Site VPN connection. The networking team has set up an AWS VPC with a CIDR range of 172.31.0.0/16 and the on-premises network
has a CIDR range of 172.31.1.0/24. The VPC's route table also has a propagated route to a virtual private gateway with a destination of 172.31.1.0/24.

Which of the following represents a correct statement regarding the routing for traffic destined to the on-premises network?

A. All traffic destined for 172.31.1.0/24 is routed via the internet gateway
B. All traffic destined for 172.31.1.0/24 is routed via the virtual private gateway
C. The on-premises network would be unreachable as the local route would be preferred for all traffic destined for 172.31.1.0/24
D. All traffic destined for 172.31.1.0/24 is routed via the virtual private gateway or the internet gateway

<details>
<summary style="color: red;">Answer</summary>

C. The on-premises network would be unreachable as the local route would be preferred for all traffic destined for 172.31.1.0/24

**Explanation:**
You can enable access to your remote network from your VPC by creating an AWS Site-to-Site VPN connection, and configuring routing to pass
traffic through the connection. A Site-to-Site VPN connection offers two VPN tunnels between a virtual private gateway or a transit gateway on the AWS side, and a customer gateway (which represents a VPN device) on the remote (on-premises) side. When you create a Site-to-Site VPN connection, you must specify the type of routing that you plan to use (static or dynamic) and update the route table for your subnet.

**Reference:**

**https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html**
**https://docs.aws.amazon.com/vpn/latest/s2svpn/how_it_works.html**
**https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNRoutingTypes.html**

**Domain**
Design and implement hybrid IT network architectures

</details>

---

### Question 5

A company has set up a network having two Transit Gateways configured as follows: Transit Gateway 1 is in AWS region 1 and has two VPC attachments
connecting to VPC A and VPC B respectively. Transit Gateway 2 is in AWS region 2 and has one Site-to-Site VPN attachment to the corporate network
and an AWS Direct Connect connection to the corporate data center. A service discovery application has been proposed that will be added to Transit Gateway 1 and it needs to connect to Transit Gateway 2. To support service discovery multicast traffic will be routed across the network.

As a Network Engineer, which of the following would you identify as the correct option for the given use case?

A. Multicast traffic is only supported over AWS Direct Connect and AWS Site-to-Site VPN. Multicast is not supported on Transit Gateway peering attachments
B. Multicast traffic is only supported over AWS Direct Connect, hence the data center (accessible via Transit Gateway 2) will be discoverable to the proposed service discovery application via Transit Gateway 1
C. Multicast traffic is only supported over VPC and VPN attachments to a Transit Gateway. AWS Direct Connect and Transit Gateway peering attachments do not support multicast traffic.
D. Multicast traffic is only supported within and between VPC attachments to a Transit Gateway. Hence, peering at Transit Gateways across regions will not work in this scenario.

<details>
<summary style="color: red;">Answer</summary>

D. Multicast traffic is only supported within and between VPC attachments to a Transit Gateway. Hence, peering at Transit Gateways across regions will not work in this scenario.

**Explanation:**
Service discovery means that a service client, such as network file system browser, does not need to have explicit, configured, knowledge of the hostnames or IP addresses of servers offering that service. To enable service discovery, multicast-based protocols are necessary.

To support multicast and broadcast, the network has to create additional copies of non-unicast packets. An Ethernet switch , for instance, receiving a broadcast frame on one of its ports will send copies of that frame on all of its other ports. Multicast is handled similarly, but more efficiently, by replicating frames potentially only to a subset of ports. This flooding behavior is the key principle that enables service discovery because it allows both 'announcement' and 'query' type traffic to permeate the entire network.

In the Amazon VPC environment, AWS Transit Gateway can perform this task of selectively flooding multicast traffic to multiple destinations. AWS Transit Gateway acts as a virtual routing appliance and can flexibly connect Amazon VPCs with no single point of failure and the ability to scale to thousands of VPC interconnections. Connected VPCs can all be in the same AWS account or separate accounts.

**Reference:**
https://docs.aws.amazon.com/vpc/latest/tgw/tgw-multicast-overview.html

**Domain**
Design and implement hybrid IT network architectures

</details>

---

### Question 6

An e-commerce company has its technology infrastructure deployed in hybrid mode with applications running in a single AWS Region as well as its on-premises data center. The company has a 10 Gbps AWS Direct Connect connection from the data center to AWS that is 70% utilized. The company wants to deploy a new flagship application on AWS that will connect with existing applications running on-premises. The application SLA requires a minimum of 99.9% network uptime between the on-premises data center and the AWS Cloud. The company has an AWS Enterprise Support plan.

Which of the following options would you recommend as the MOST cost-effective solution to address this requirement?

A. Purchase another 10 Gbps Direct Connect hosted connection through an AWS Direct Connect partner in a different Direct Connect location that terminates in the associated AWS Region. Set up a new virtual interface (VIF) to the existing VPC and use BGP for load balancing
B. Purchase another 10 Gbps Direct Connect dedicated connection from AWS in the existing Direct Connect location that terminates in the associated AWS Region. Set up a new virtual interface (VIF) to the existing VPC and use BGP for load balancing
C. Purchase another 10 Gbps Direct Connect dedicated connection from AWS in a different Direct Connect location that terminates in the associated AWS Region. Set up a new virtual interface (VIF) to the existing VPC and use BGP for load balancing
D. Purchase two new Direct Connect hosted connections of 5 Gbps each through an AWS Direct Connect partner. Provision two virtual interfaces (VIFs)
to the existing VPC on both Direct Connect connections and use BGP for load balancing. Terminate the existing 10 Gbps Direct Connect connection

<details>
<summary style="color: red;">Answer</summary>

C. Purchase another 10 Gbps Direct Connect dedicated connection from AWS in a different Direct Connect location that terminates in the associated AWS Region. Set up a new virtual interface (VIF) to the existing VPC and use BGP for load balancing
