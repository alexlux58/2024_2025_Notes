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

**Explanation:**
AWS Direct Connect is a cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS. Using AWS Direct Connect, you create a private connection between AWS and you data center. AWS Direct Connect is compatible with all AWS services accessible over the internet and is available in speeds starting at 50 Mbps and scaling up to 100 Gbps.

These are two types of Direct Connect connections:

Dedicated Connection: A physical Ethernet connection associated with a single customer. Customers can request a dedicated connection through the AWS Direct Connect console, the CLI, or the API.

Hosted Connection: A physical Ethernet connection that an AWS Direct Connect Partner provisions on behalf of a customer. Customers request a hosted connection by contacting a partner in the AWS Direct Connect Partner Program, which provisions the connection.

You can use local preference BGP community tags to achieve load balancing and route preference for incoming traffic to your network. For each prefix that you advertise over a BGP session, you can apply a community tag to indicate the priority of the associated path for returning traffic.

The following local preference BGP community tags are supported: 7224:7100 -- Low preference, 7224:7200 -- Medium preference, 7224:7300 -- High preference, Local preference BGP community tags are mutually exclusive. If you apply more than one tag to a prefix, the last tag applied is used.

A Virtual Interface (VIF) is necessary to access AWS services, and can be either public, private or transit, like so:

Private virtual interface: A private virtual interface should be used to access an Amazon VPC using private IP addresses.

Public virtual interface: A public virtual interface can access all AWS public services using public IP addresses. A public virtual interface enables access to public services, such as Amazon S3

Transit virtual interface: A transit virtual interface should be used to access one or more Amazon VPC Transit Gateways associated with Direct Connect gateways. You can use transit virtual interfaces with 1/2/5/10 Gbps AWS Direct Connect connections.

**You should note the allowed VIF types for the various configurations of Direct Connect connections:**

A Hosted Connection with a capacity of 500 Mbps or less can support one private VIF or one public VIF. A Hosted Connection with a capacity of 1 Gbps or more can support one private, public, or transit VIF. Each Hosted Connection supports a single VIF and you can obtain multiple VIFs by configuring multiple hosted connections.

Hosted VIFs can connect to public resources or an Amazon Virtual Private Cloud (Amazon VPC) in the same way as standard VIFs. However, the account that owns the VIF is different from the connection owner. Bandwidth is shared across all VIFs on the parent connection. A hosted VIF can support one private VIF or one public VIF.

A Dedicated Connection can support up to 50 public/private VIFs and 1 transit VIF.

"Uptime Target" means a percentage of Maximum Uptime in a monthly billing cycle applicable to your Included Resource, based upon meeting the Minimum Configuration Requirements. To ensure an uptime target of 99.9% as mandated in the given use case, the included resources should use virtual interfaces on Dedicated Connections at a minimum of 2 Direct Connect locations, and at least one of those Direct Connect locations uses the Associated AWS Region in which your workload is located.

**Reference:**

https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithConnections.html
https://aws.amazon.com/premiumsupport/knowledge-center/direct-connect-types/
https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html

**Domain**
Design and implement hybrid IT network architectures

</details>

---

### Question 7

A company has a Direct Connect connection between its on-premises data center and its VPC on the AWS Cloud. An application running on an EC2 instance in the VPC needs to access customer data stored in the on-premises data center with consistent performance. To meet the compliance guidelines, the data should remain encrypted during this operation.

As an AWS Certified Networking Specialist, which of the following solutions would you recommend to address these requirements?

A. Set up a public virtual interface on the Direct Connect connection. Create an AWS Site-to-Site VPN between the customer gateway and the virtual private gateway in the VPC. Use the VPN connection to access the customer data
B. Set up a public virtual interface on the Direct Connect connection. Create an AWS Site-to-Site VPN between the customer gateway and the virtual public gateway in the VPC.
C. Set up private virtual interface on the Direct Connect connection. Create an AWS Site-to-Site VPN between the customer gateway and the virtual private gateway in the VPC.
D. Set up a transit virtual interface on the Direct Connect connection. Create an AWS Site-to-Site VPN between the customer gateway and the virtual private gateway in the VPC.

<details>
<summary style="color: red;">Answer</summary>

A. Set up a public virtual interface on the Direct Connect connection. Create an AWS Site-to-Site VPN between the customer gateway and the virtual private gateway in the VPC. Use the VPN connection to access the customer data

**Explanation:**
AWS Direct connect is a networking service that provides an alternative to using the internet to connect to AWS. Using Direct Connect, data that would have previously been transported over the internet is delivered through a private network connection between you facilities and AWS.

AWS Direct Connect (DX) provides three types of virtual interfaces - public, private and transit.

Private virtual interface: A private virtual interface should be used to access an Amazon VPC using private IP addresses.

Public virtual interface: A public virtual interface can access all AWS public services using public IP addresses.

Transit virtual interface: A transit virtual interface should be used to access one or more Amazon VPC Transit Gateways associated with Direct Connect gateways. You can use transit virtual interfaces with 1/2/5/10 Gbps AWS Direct Connect connections.

By default, instances that you launch into an Amazon VPC can't communicate with your own (remote) network. You can enable access to your remote network from your VPC by creating an AWS Site-to-Site VPN connection, and configuring routing to pass traffic through the connection. A Site-to-Site VPN connection offers two VPN tunnels between a virtual private gateway or a transit gateway on the AWS side, and a customer gateway (which represents a VPN device) on the remote (on-premises) side. When you create a Site-to-Site VPN connection, you must specify the type of routing that you plan to use (static or dynamic) and update the route table for your subnet.

You can combine AWS Direct Connect dedicated network connections with the Amazon VPC VPN. AWS Direct Connect public VIF can be used to establish a dedicated network connection between your network to public AWS resources, such as an Amazon virtual private gateway IPsec endpoint. This solution combines the benefits of the end-to-end secure IPSec connection with low latency and increased bandwidth of the AWS Direct Connect to provide a more consistent network experience than internet-based VPN connections.

**Reference:**

https://aws.amazon.com/premiumsupport/knowledge-center/public-private-interface-dx/
https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html
https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-vpn.html

**Domain**
Design and implement hybrid IT network architectures

</details>

---

### Question 8

A Network Engineer is setting up DNS failover configuration for Route 53. The engineer needs to use multiple routing policies (such as latency-based and weighted) to configure a more complex DNS failover.
Which of the following are the key points to consider while configuring a failover configuration on Route 53? (Select Two)

A. If you're routing traffic to any AWS resources that you can create alias records for, you need to create health checks for these resources too
B. When responding to queries, Route 53 includes only the healthy primary resources in Active-active failover configuration
C. More than half of the configured records with nonzero weights must be unhealthy before Route 53 starts to respond to DNS queries using records that have weights of zero
D. If you're creating failover records in a private hosted zone, you must assign a public IP address to an instance in the VPC to check the health of an endpoint within a VPC by IP address
E. Records without a health check are always considered healthy. If no record is healthy, all records are deemed to be healthy.

<details>
<summary style="color: red;">Answer</summary>

D. If you're creating failover records in a private hosted zone, you must assign a public IP address to an instance in the VPC to check the health of an endpoint within a VPC by IP address
E. Records without a health check are always considered healthy. If no record is healthy, all records are deemed to be healthy.

**Explanation:**
If a record in a group of records that have the same name and type doesn't have an associated health check, Route 53 always considers it healthy and always includes it among possible responses ot a query.

If none of the records in a group of records are healthy, Route 53 needs to return something in response to DNS queries, but it has no basis for choosing one record over another. In this circumstance, Route 53 considers all the records in thr group to be healthy and selects one based on the routing policy and on the values that you specify for each record.

If you're creating failover records in a private hosted zone, note the following:

1. Route 53 health checkers are outside the VPC. To check the health of an endpoint within a VPC by IP address, you must assign a public IP address to an instance in the VPC.
2. You can create a CloudWatch metric, associate an alarm with the metric, and then create a health check that is based on the data stream of the alarm.

**Reference:**

https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html

**Domain**
Configure network integration with application services

</details>

---

### Question 9

An analytics company uses Amazon QuickSight (Enterprise Edition) to easily create and publish interactive BI dashboards that can be accessed from any device. For a specific requirement, the company needs to create a private connection from Amazon QuickSight to an Amazon RDS DB instance that's in a private subnet to fetch data for analysis.

Which of the following represents an optimal solution for configuring a private connection between QuickSight and Amazon RDS DB instance?

A. Create a new private subnet in the same VPC as the Amazon RDS DB instance. Create a new security group with necessary inbound rules for QuickSight in the same VPC. Sign in to QuickSight as a QuickSight admin and create a new QuickSight VPC connection. Create a new dataset from the RDS DB instance
B. Create a Private Virtual Interface between VPC that hosts Amazon RDS DB instance and QuickSight. Use this connection to privately access necessary data from RDS DB
C. Amazon QuickSight Enterprise edition is fully integrated with the Amazon VPC service. Create an ENI in QuickSight that points to the VPC that hosts the RDS DB instance. However, the subnet has to be a private subnet and not a public subnet
D. Create a new private subnet in the same VPC as the Amazon RDS DB instance. Create a new network Access Control List (ACL) with necessary inbound rules for QuickSight in the same VPC. Connect from QuickSight using VPC connector

<details>
<summary style="color: red;">Answer</summary>

A. Create a new private subnet in the same VPC as the Amazon RDS DB instance. Create a new security group with necessary inbound rules for QuickSight in the same VPC. Sign in to QuickSight as a QuickSight admin and create a new QuickSight VPC connection. Create a new dataset from the RDS DB instance

**Explanation:**
Amazon QuickSight Enterprise edition is fully integrated with the Amazon VPC service. A VPC based on this service closely resembles a traditional network that you operate in your own data center. It enables you to secure and isolate traffic between resources. You define and control the network elements to suit your requirements, while still getting the benefit of cloud networking and the scalable infrastructure of AWS.

By creating a VPC connection in QuickSight, you're adding an elastic network interface in your VPC. This network interface allows QuickSight to exchange network traffic with a network instance within your VPC. You can provide all of the standard security controls for this network traffic, as you do with other traffic in your VPC. Route tables, network access control lists (ACLs), subnets, and security groups settings all apply to network traffic to and from QuickSight in the same way that they apply to traffic between other resources in your VPC.

When you register a VPC connection with QuickSight, you can securely connect to data that's available only in your VPC,
for example:

1. Data you can reach by IP address
2. Data that isn't available on the public internet
3. Private databases
4. On-premises data

This works if you set up connectivity between the VPC and your on-premises network. For example, you might set up connectivity with AWS Direct Connect, a virtual private network (VPN), or a proxy.

After you connect to the data, you can use it to create data analyses and public secure data dashboards.

**Reference:**

https://docs.aws.amazon.com/quicksight/latest/user/working-with-aws-vpc.html
https://docs.aws.amazon.com/quicksight/latest/user/vpc-creating-a-connection-in-quicksight.html
https://aws.amazon.com/premiumsupport/knowledge-center/quicksight-redshift-private-connection/

**Domain**
Configure network integration with application services

</details>

---

### Question 10

A company has a three-tier web application with separate subnets for Web, Application and Database tiers. The CTO at the company wants to monitor any malicious activity targeting the web application running on EC2 instances. As a network engineer, you have been tasked with developing a solution to notify the network security team in case the network exposure of EC2 instances on specific ports violates the security policies of the company.

Which of the following AWS Services would you use to build such an automated notification system that requires the last development effort? (Select Two)

A. Amazon CloudWatch
B. VPC Flow Logs
C. AWS Shield
D. Amazon SNS
E. Amazon Inspector

<details>
<summary style="color: red;">Answer</summary>

D. Amazon SNS
E. Amazon Inspector

**Explanation:**
Amazon inspector is an automated security assessment service that helps you test the network accessibility of your Amazon EC2 instances and the security state of your applications running on the instances.
You can perform network security assessments via your own custom solutions, however, that entails significant time and effort. You might need to run network port-scanning tools to test routing and firewall configurations, then validate what processes are listening on your instance network ports, before finally mapping the IPs identified in the port scan back to the host's owner.
To make this process simpler for its customers, AWS offers the Network Reachability rules package in Amazon Inspector, which is an automated security assessment service that enables you to understand and improve the security and compliance of applications deployed on AWS. The existing Amazon Inspector host assessment rules packages check the software and configurations on your EC2 instances for vulnerabilities and unintended network exposure. The Network Reachability rules package checks the network exposure of your EC2 instances and notifies you if any of your instances are exposed to the internet on ports that violate your security policies.

You can use these rules packages to analyze the accessibility of critical ports, as well as all other network ports. For critical ports, Amazon Inspector will show the exposure of each and will offer findings per port. When critical, well-known ports (based on Amazon's standard guidance) are reachable, findings will be created with higher severities.

The findings also have recommendations that include information about exactly which Security Group you can edit to remove the access. And like all Amazon Inspector findings, these can be published to an SNS topic for additional processing or you could use a Lambda to automatically remove ingress rules in the Security Group to address a network reachability finding. For the given use-case, the network engineer can use the SNS topic to send the notifications to the team.

**Reference:**

https://aws.amazon.com/blogs/security/amazon-inspector-assess-network-exposure-ec2-instances-aws-network-reachability-assessments/
https://aws.amazon.com/blogs/security/amazon-inspector-assess-network-exposure-ec2-instances-aws-network-reachability-assessments/
https://aws.amazon.com/blogs/security/amazon-inspector-assess-network-exposure-ec2-instances-aws-network-reachability-assessments/

**Domain**
Automate AWS tasks

</details>

---

### Question 11

The networking team at a company wants to set up two AWS Direct Connect connections between its on-premises data center and the AWS Cloud. The Direct Connect connections need to be set up in an Active/Active configuration from a public virtual interface using a public ASN.

As an AWS Certified Networking Specialist, which solution would you recommend for this requirement?

A. Set up the customer gateway to advertise the longer prefix on your secondary connection.
B. Active/active configuration from a public virtual interface is not supported using public ASN
C. Set up the customer gateway to advertise the longer prefix on your primary connection.
D. Configure your customer gateway to advertise the same prefix with the same Border Gateway Protocol (BGP) attributes on both public virtual interfaces

<details>
<summary style="color: red;">Answer</summary>

D. Configure your customer gateway to advertise the same prefix with the same Border Gateway Protocol (BGP) attributes on both public virtual interfaces

**Explanation:**
AWS Direct Connect links your internal network to an AWS Direct Connect location over a standard Ethernet fiber-optic cable. One end of the cable is connected to your router, the other to an AWS Direct Connect router. With this connection, you can create virtual interfaces directly to public AWS services (for example, to Amazon S3) or Amazon VPC, bypassing internet service providers in your network path. An AWS Direct Connect location provides access to AWS in the Region with which it is associated.

When using Direct Connect to transport production workloads between AWS services, it's a best practice to create two connections through different data centers or providers. You have two options on how to configure your connections:

- Active/active - traffic is load-shared between interfaces based on flow. If one connection becomes unavailable, all traffic is routed through the other connection.
- Active/passive - traffic is routed through one interface, and the other interface is used only if the first becomes unavailable.

To configure an Active/Passive connection using a public ASN:

Allow your customer gateway to advertise the same prefix (public IP or network that you own) with the same Border Gateway Protocol (BGP) attributes on both public virtual interfaces. This configuration permits you to load balance traffic over both public virtual interfaces.

Check the vendor documentation for device-specific commands for your customer gateway device.

**Reference:**
https://aws.amazon.com/premiumsupport/knowledge-center/dx-create-dx-connection-from-public-vif/
https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html
https://aws.amazon.com/premiumsupport/knowledge-center/dx-create-dx-connection-from-public-vif/

**Domain**
Design and implement AWS networks

</details>

---

### Question 12

A developer has configured a private hosted zone using Route 53. The developer needs to configure health checks for record sets within the private hosted zone that are associated with EC2 instances.

How can the developer build a solution to address the given use-case?

A. Set up a Route 53 health check that monitors an SNS topic which in turn notifies a CloudWatch alarm when the EC2 StatusCheckFailed metric fails
B. Set up a Route 53 health check to a private IP associated with the instances inside the VPC to be checked
C. Set up a CloudWatch metric that checks the status of the EC2 StatusCheckFailed metric and then configure a health check that monitors the status of the metric
D. Set up a CloudWatch metric that checks the status of the EC2 StatusCheckFailed metric, add an alarm to the metric, and then configure a health check that monitors the state of the alarm

<details>
<summary style="color: red;">Answer</summary>

D. Set up a CloudWatch metric that checks the status of the EC2 StatusCheckFailed metric, add an alarm to the metric, and then configure a health check that monitors the state of the alarm

**Explanation:**
A private hosted zone is a container that holds information about how you want Amazon Route 53 to respond to DNS queries for a domain and its subdomains within one or more VPCs that you create with the Amazon VPC service. Amazon Route 53 health checks monitor the health and performance of your web applications, web servers, and other resources. Each health check that you create can monitor one of the following:

- The health of a specified resource, such as a web server.
- The status of other health checks.
- The status of an Amazon CloudWatch alarm.

Additionally, with Amazon Route 53 Application Recovery Controller, you can set up routing control health checks with DNS failover records to manage traffic failover for your application.

For the given use-case, you need to create a CloudWatch metric that checks the status of the EC2 StatusCheckFailed metric, add an alarm to the metric, and then create a health check that is based on the data stream for the alarm. To improve resiliency and availability, Route 53 doesn't wait for the CloudWatch alarm to go into the ALARM state. The status of a health check changes from healthy to unhealthy based on the data stream and the criteria in the CloudWatch alarm.

**Reference:**
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-private-hosted-zones.html
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html

**Domain**
Configure network integration with application services

</details>

---

### Question 13

A company has decided to adopt IPv6 for its network. As an intermediary step in the path to fully adopting IPv6, the company is looking for dual-stack IPv4/IPv6 designs. To kickstart the change, the company has picked a straightforward hybrid network that consists of an on-premises connection to AWS over a Site-to-Site VPN connection via a Transit Gateway and an AWS Direct Connect connection between AWS and the on-premises data center.

As a Network Engineer, which of the following measures would you suggest to meet the given requirements? (Select Three)

A. For AWS Direct Connect connection, reuse your existing VIFs and enable them for dual-stack support
B. For dual-stack connectivity on the Site-to-Site VPN connection via a Transit Gateway, you need to create two VPN connections, one for the IPv4 stack and one for the IPv6 stack
C. AWS Transit Gateway does not support IPv6 traffic. Hence, VPC peering should be considered for dual-stack connectivity
D. AWS Site-to-Site VPN connection on a Transit Gateway can support both IPv4 traffic and IPv6 traffic inside the VPN tunnels. Hence, no changes are required on this connection
E. To use Direct Connect connection for dual-stack traffic, you need to create a separate virtual interfaces (VIFs-Private VIF or Public VIF or Transit VIF) for each stack
F. To configure an IPv6-enabled VPC attachment for the Transit Gateway, the VPC and the attachment subnets need to have associated IPv6 CIDRs. The remaining Transit Gateway configurations continue to have the same functionalities across both stacks

<details>
<summary style="color: red;">Answer</summary>

A. For AWS Direct Connect connection, reuse your existing VIFs and enable them for dual-stack support
B. For dual-stack connectivity on the Site-to-Site VPN connection via a Transit Gateway, you need to create two VPN connections, one for the IPv4 stack and one for the IPv6 stack
F. To configure an IPv6-enabled VPC attachment for the Transit Gateway, the VPC and the attachment subnets need to have associated IPv6 CIDRs. The remaining Transit Gateway configurations continue to have the same functionalities across both stacks

**Explanation:**
To use your Direct Connect connection for dual-stack traffic, you need to create one of the following virtual interfaces (VIFs): Private VIF, Public VIF, or Transit VIF, or reuse your existing VIFs and enable them for dual-stack support. The following considerations apply to dual-stack VIFs:

1. A virtual interface can support a BGP peering session for IPv4, IPv6, or both (dual-stack)
2. For the IPv6 stack, Amazon automatically assigns a /125 IPv6 CIDR for the BGP peering connection.
3. On Public VIFs, you must advertise to AWS /64 prefixes or larger.

Your Site-to-Site VPN connection on a Transit Gateway can support either IPv4 traffic or IPv6 traffic inside the VPN tunnels. This means that for dual-stack connectivity, you need to create two VPN connections, one for the IPv4 stack and one for the IPv6 stack. For the Site-to-Site VPN connection, you intend to use for IPv4 routing, each tunnel will have a /30 IPv4 CIDR in the 169.254.0.0/16 range, while for the VPN connection intended for IPv6 routing, each VPN tunnel will have two CIDR blocks: one /30 IPv4 CIDR in the 169.254.0.0/16 range and one /126 IPv6 CIDR in the fd00::/8 range.

AWS Transit Gateway is a network transit hub that you can use to interconnect your VPCs and hybrid networks for both IPv4 and IPv6 stacks. All Transit Gateway concepts and constructs - attachments, peering connections, associations, propagations, and routing - continue to have the same functionalities across both stacks. Note that to configure an IPv6-enabled VPC attachment to the Transit Gateway, the VPC and attachment subnets need to have associated IPv6 CIDRs.

**Reference:**
https://aws.amazon.com/blogs/networking-and-content-delivery/dual-stack-ipv6-architectures-for-aws-and-hybrid-networks/

**Domain**
Design and implement hybrid IT network architectures

</details>

---

### Question 14

A VPC is deployed with a 10.2.0.0/16 CIDR block. The networking team is reviewing DHCP options, and there is disagreement about the valid DNS addresses available for the VPC.
Which of the following addresses are valid IP addresses provided by Amazon for this scenario.

A. 10.0.0.2
B. 10.2.0.2
C. 10.1.0.2
D. 169.254.169.253
E. 169.254.169.254

<details>
<summary style="color: red;">Answer</summary>

B. 10.2.0.2
D. 169.254.169.253

**Explanation:**
Domain Name System (DNS) is a standard by which names used on the internet are resolved to their corresponding IP addresses. A DNS hostname is a name that uniquely and absolutely names a computer; it's composed of a hostname and a domain name. DNS servers resolve DNS hostnames to their corresponding IP addresses. Public IPv4 addresses enable communication over the internet, while private IPv4 addresses enable communication within the network of the instance (either EC2-Classis or a VPC).

To support DNS resolution, Amazon provides DNS server at the 169.254.169.253 IPv4 address or the reserved IP address at the base of the VPC IPv4 network range plus two. So for the given use case, 10.2.0.2 is also reserved by Amazon for DNS resolution.

The Dynamic Host configuration Protocol (DHCP) provides a standard for passing configuration information to hosts on a TCP/IP network. The options field of a DHCP message contains configuration parameters, including the domain name, domain name server, and the netbios-node-type. By default, all instances in a nondefault VPC receive an unresolvable hostname that AWS assigns (for example, ip-10-0-0-202). You can assign your own domain name to your instances, and use up to four of your own DNS servers. To do that, you must create a custom set of DHCP options to use with the VPC.

**Reference:**
https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html
https://docs.aws.amazon.com/vpc/latest/userguide/VPC_DHCP_Options.html

**Domain**
Design and implement AWS networks

</details>

---

### Question 15

The networking team at a company wants to set up an AWS Site-to-Site VPN connection between its on-premises data center and the AWS Cloud. The VPN connection should use dynamic routing and the team wants to make sure that tunnel A is preferred over tunnel B when sending traffic from AWS to the on-premises network.

Which solution would you recommend for this requirement?

A. Configure the VPN connection in an Active/Passive configuration and advertise a more specific prefix for tunnel B.
B. Configure the VPN connection in an Active/Active configuration and advertise a more specific prefix for tunnel A.
C. Configure the VPN connection in an Active/Passive configuration and advertise a more specific prefix for tunnel A.
D. Configure the VPN connection in an Active/Active configuration and advertise a more specific prefix for tunnel B.

<details>
<summary style="color: red;">Answer</summary>

B. Configure the VPN connection in an Active/Active configuration and advertise a more specific prefix for tunnel A.

**Explanation:**
You can enable access to your remote network from your VPC by creating an AWS Site-to-Site VPN (Site-to-Site VPN) connection, and configuring routing to pass traffic through the connection. A VPN connection refers to the connection between your VPC and your own on-premises network. Site-to-Site VPN supports Internet Protocol security (IPsec) VPN connections.

The type of routing that you select can depend on the make and model of your customer gateway device. If your customer gateway device supports Border Gateway Protocol (BGP), specify dynamic routing when you configure your Site-to-Site VPN connection. If your customer gateway device does not support BGP, specify static routing. If you use a device that supports BGP advertising, you don't specify static routes to the Site-to-Site VPN connection because the device uses BGP to advertise its routes to the virtual private gateway. If you use a device that doesn't support BGP advertising, you must select static routing and enter the routes (IP prefixes) for your network that should be communicated to the virtual private gateway.

A Site-to-Site VPN connection offers two VPN tunnels between a virtual private gateway or a transit gateway on the AWS side, and a customer gateway (which represents a VPN device) on the remote (on-premises) side.

To address the given requirement, you need to set the customer gateway device to prefer one VPN tunnel over the other by leveraging the order of preference criteria:

Advertise a more specific prefix to the virtual private gateway or transit gateway on the tunnel (Tunnel A for the given use case) that the customer prefers to receive traffic from AWS.

For matching prefixes where each VPN connection uses BGP, the AS PATH is compared and the prefix with the shortest AS PATH is preferred.

When the AS PATHs are the same length, and the first AS in the AS_SEQUENCE is the same across multiple paths, multi-exit discriminators (MEDs) are compared. The path with the lowest MED value is preferred.

**Reference:**
https://aws.amazon.com/premiumsupport/knowledge-center/vpn-configure-tunnel-preference/

**Domain**
Design and implement AWS networks
