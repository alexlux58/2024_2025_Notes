# VPC

## Subnets

- AWS reserves 5 IP addresses in each subnet. 1st 4 and last 1.
- These 5 IPs are not available for use and cannot be assigned to an instance.
- example:
  - 10.0.0.0 - Network address
  - 10.0.0.1 - Reserved by AWS for VPC router
  - 10.0.0.2 - Reserved by AWS for mapping to Amazon-provided DNS
  - 10.0.0.3 - Reserved by AWS for future use
  - 10.0.0.255 - Network broadcast address. AWS does not support broadcast in a VPC, therefore the address is reserved.

| Feature                   | Private                                           | Public                                                  | Elastic                                                      |
| ------------------------- | ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| Communication             | Communication within VPC                          | Can communicate over the internet                       | Can communicate over the internet                            |
| Address range             | Gets IP address from subnet range. Ex: 10.200.0.1 | Gets IP address from Amazon Pool within region          | Gets IP address from Amazon Pool within region               |
| Instance restart behavior | Once assigned cannot be changed                   | Changes over instance restart                           | Do not change over instance restart. Can be removed anytime. |
| Releasing IP              | Released when instance is terminated              | Released to POOL when instance is stopped or terminated | Not released. Remains in your account. (Billed)              |
| DNS resolution            | Resolves to private IP                            | Resolves to public IP                                   | Resolves to public IP                                        |
| Security                  | Private subnet is more secure                     | Public subnet is less secure                            | Elastic is less secure                                       |
| Use case                  | Internal communication                            | Web servers, Load balancers, etc.                       | Web servers, Load balancers, etc.                            |

---

# Default VPC in AWS

- **AWS Default VPC**:

  - Created automatically in each AWS region.
  - **CIDR Block**: `172.31.0.0/16`.

- **Subnets**:

  - Subnets are created in every Availability Zone (AZ) with a **CIDR block** of `/20`.

- **Internet Gateway**:

  - A default Internet Gateway is created and attached to the VPC.

- **Main Route Table**:
  - Includes routes for:
    - **Local traffic** within the VPC (`172.31.0.0/16`).
    - **Internet traffic** through the Internet Gateway (`0.0.0.0/0`).

### Diagram Overview

1. **Region**: Shows the default VPC with a `172.31.0.0/16` CIDR block.
2. **Availability Zones (AZs)**:
   - Subnets with CIDR ranges:
     - `172.31.0.0/20` (AZ1)
     - `172.31.16.0/20` (AZ2)
     - `172.31.32.0/20` (AZ3)
3. **Route Table**:
   - Destination: `172.31.0.0/16` → Target: `local`.
   - Destination: `0.0.0.0/0` → Target: `igw-xxxxxxx`.

### Key Notes:

- All subnets in the default VPC are public due to the route table configuration.
- Default VPC simplifies networking setup for new AWS users by providing immediate internet connectivity.

---

# Exercise 1: Creating a Custom VPC

1. **Delete Default VPC**

   - This step assumes you will create your own VPC.

2. **Create a VPC**

   - Navigate to **VPC Service** → **Your VPCs** → **Create VPC**.
   - Details:
     - **Name**: MyVPC
     - **CIDR**: 10.100.0.0/16
   - Click **Create**.

3. **Create an Internet Gateway**

   - Navigate to **Internet Gateways** → **Create Internet Gateway**.

4. **Attach Internet Gateway to the VPC**

   - Select the **Internet Gateway** → **Actions** → **Attach to VPC** → Select **Your VPC**.

5. **Create a Subnet**

   - Navigate to **Subnets** → **Create Subnet**.
     - Details:
       - **Name**: MyVPC-Public
       - **VPC**: MyVPC
       - **AZ**: Select the first AZ (e.g., ap-south-1a)
       - **CIDR**: 10.100.0.0/24
   - After creating the subnet:
     - **Select Subnet** → **Action** → **Modify Auto-Assign Public IP** → Enable → Save.

6. **Create a Route Table**
   - Navigate to **Route Tables** → **Create Route Table**.
     - Details:
       - **Name**: MyVPC-Public
       - **VPC**: MyVPC
   - After creating the route table:
     - **Select Route Table** → **Routes** → **Edit**.
     - Add another route:
       - **Destination**: 0.0.0.0/0
       - **Target**: Internet Gateway (igw-xxx)
     - Save the route.

---

### Exercise 2 (Continuing with previous setup)

1. **Create a Private Subnet**

   - Create subnet (Name: MyVPC-Private, VPC: MyVPC, AZ: Select different AZ (e.g., ap-south-1b), CIDR: 10.100.1.0/24)

2. **Create Private Route Table**

   - Route Tables => Create Route Table (Name: MyVPC-Private, VPC: MyVPC)

3. **Associate Route Table with Subnet to make it Private**

   - Select Route Table => Subnet Associations => Edit => Check the MyVPC-Private subnet => Save

4. **Launch another EC2 instance in the same VPC but in the newly created Private Subnet**

   - Tag this instance with Name=EC2-B
   - New security group:
     - Add rule SSH for CIDR of Public Subnet source CIDR
     - Add rule All-ICMP IPv4 for Public Subnet source CIDR

5. **Note down EC2-B Private IP Address**

---

# NAT Gateway

- AWS managed NAT, higher bandwidth, better availability, and no maintenance/admin.
- Pay by the hour for usage and bandwidth.
- NAT is created in a specific AZ, uses an EIP, and is associated with a specific subnet.
- 5 Gbps bandwidth with automatic scaling up to 100Gbps.
- No security group to manage / required. NACL at subnet level applies to NACL at subnet level applies to NAT Gateway.
- Supported protocols: TCP, UDP and ICMP.
- Uses ports 1024-65535 for outbound traffic.
- NAT gateway must be created in a public subnet so that it can communicate with the internet.
- NAT gateway should be allocated Elastic IP (EIP) to communicate with the internet.
- NAT gateway is used to provide internet access to instances in private subnets.

# EC2 NAT Instance

- Must be in a public subnet.
- Must have a Public IP or Elastic IP.
- Should be launched using AWS provided NAT AMIs.
- Disable Source/Destination Check on the NAT instance.
- Update Private subnet route tables to route internet traffic through NAT instance.
- For internet traffic set target as NAT instance ID in the route table.

**Exercise 3 (Continuing with previous setup)**

- **Create a NAT Gateway in your VPC**

  - VPC => NAT Gateways => Create NAT Gateway
  - Subnet: MyVPC-Public (Must select Public Subnet)
  - EIP: Create New EIP
  - Create NAT Gateway
  - It takes 5--10 minutes for NAT Gateway to be Active

- **Add a route in Private subnet for internet traffic and route through NAT Gateway**

  - Route Tables => Select MyVPC-Private route table
  - Routes => Edit => Add another route
    - Destination: 0.0.0.0/0
    - Target: nat-gateway
    - Save

- **Now again try to ping google.com from EC2-B**

  - `ping google.com`
  - It should work now.

---

# NAT Gateway vs NAT Instance

| **Attribute**           | **NAT Gateway**                                                                                                                                                | **NAT Instance**                                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Availability**        | Highly available within AZ. Create a NAT Gateway in each Availability Zone to ensure zone-independent architecture.                                            | Use a script to manage failover between instances.                                                                   |
| **Bandwidth**           | Can scale up to 45 Gbps.                                                                                                                                       | Depends on the bandwidth of the instance type.                                                                       |
| **Maintenance**         | Managed by AWS. You do not need to perform any maintenance.                                                                                                    | Managed by you, for example, by installing software updates or operating system patches on the instance.             |
| **Performance**         | Software is optimized for handling NAT traffic.                                                                                                                | A generic Amazon Linux AMI that's configured to perform NAT.                                                         |
| **Cost**                | Charged depending on the number of NAT Gateways you use, duration of usage, and amount of data that you send through the NAT Gateways.                         | Charged depending on the number of NAT Instances that you use, duration of usage, and instance type and size.        |
| **Type and size**       | Uniform offering; you don't need to decide on the type or size.                                                                                                | Choose a suitable instance type and size, according to your predicted workload.                                      |
| **Public IP addresses** | Choose the Elastic IP address to associate with a NAT Gateway at creation.                                                                                     | Use an Elastic IP address or a public IP address with a NAT Instance.                                                |
| **Security groups**     | Cannot be associated with a NAT Gateway. You can associate security groups with your resources behind the NAT Gateway to control inbound and outbound traffic. | Associate with your NAT Instance and the resources behind your NAT Instance to control inbound and outbound traffic. |
| **Port forwarding**     | Not supported.                                                                                                                                                 | Manually customize the configuration to support port forwarding.                                                     |
| **Bastion servers**     | Not supported.                                                                                                                                                 | Use as a bastion server.                                                                                             |

---

# VPC Secondary CIDR Blocks

1. You can add secondary CIDR blocks to your existing VPC.
2. CIDR block must not overlap with existing CIDR or peered VPC CIDR.
3. If primary CIDR is from RFC1918 then you can not add secondary CIDR from other RFC1918 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).
4. CIDR block must not be same or larger than the CIDR range of routes in any of the VPC Route tables.
5. You can add up to 4 secondary CIDR blocks to a VPC.
6. You can associate secondary CIDR blocks with subnets.

---

# Elastic Network Interfaces (ENI)

- Logical component in a VPC that represents a virtual network card.
- ENIs are bound to a specific subnet and availability zone.
- The ENI can have the following attributes:
  - A primary private IPv4 address for the IPv4 address range of the VPC.
  - A primary private IPv6 address for the IPv6 address range of the VPC.
  - One or more secondary private IPv4 addresses.
  - One Elastic IP address (IPv4) per private IPv4 address.
  - One public IPv4 address.
  - One or more IPv6 addresses.
  - One or more security groups.
  - A MAC address.
  - A source/destination check flag.

---

## ENI Use cases

- Requester managed ENIs that AWS creates in your VPC
- Creating Management Network / Dual home instances
- Preserving EC2 IP address in case of instance failure
- Using ENI secondary IPs for EKS Pods

## Requester managed ENIs

- RDS DB instance is fully managed by AWS but allows customer to control
  the traffic using security groups. For this, AWS creates a requester managed ENI into customer VPC.

- EKS (Control Plane) master nodes are launched in AWS managed VPC and it creates ENIs into your VPC so that it can communicate with EKS worker nodes.

- For AWS Workspaces or Appstream2.0, the underlying EC2 instances are launched inside AWS managed VPC and ENIs are created into your VPC so that those instances
  can communicate with applications inside your VPC.

---

## ENI Exam Essentials

1. The number of ENIs that you can attach to an instance and number of secondary IP addresses per ENI depends on the EC2 instance type.
2. You can not detach primary network interface from an instance. Secondary ENI can be detached and attached to another instance in the same AZ.
3. You associate security groups with network interfaces and not with individual IP addresses.
4. For applications licenses which are bound to MAC addresses, you can preserve the MAC address by using the same ENI.
5. Second ENI allows instance to be multi-homed (subnets) in same AZ, it can be created across AWS account (e.g. requester managed ENI).
6. ENIs can not be used for NIC teaming which means they can not be used together to increase instance network bandwidth.

---

## Bring Your Own IP (BYOIP)

- You can migrate your publicly routable IPv4 and IPv6 addresses to AWS.
- But Why?
  - Keep your IP address reputation.
  - Avoid changes to IP Address whitelisting.
  - Avoid DNS changes.
  - Avoid changing IP addresses in your applications.
  - AWS as a hot standby for disaster recovery.

### Pre-requisites to BYOIP

- The address range must be registered with regional internet registry (RIR) - ARIN or RIPE or APNIC.
- The address in the IP address range must have a clean history. AWS reserve the right to reject poor reputation IP address ranges.
- The most specific IPv4 address range that you can bring is /24.
- The most specific IPv6 address range that you can bring is /48 for CIDRs that are publicly advertised.
- The most specific IPv6 address range that you can bring is /56 for CIDRs that are not publicly advertised (can be advertised over Direct Connect if required).
- Create a Route Origin Authorization (ROA) to authorize Amazon ASNs 16509 and 14618 to advertise your IP address range.

### Good to know about BYOIP

- You continue to own the address range, but AWS advertises it on the internet by default.
- After you bring the address range to AWS, it appears in your AWS account as an address pool.
- You can associate these IP addresses to Amazon EC2 instances, Network Load Balancers, and NAT gateways.
- You can bring a total of five IPv4 and IPv6 address ranges per Region to your AWS account.

---

# VPC DNS and DHCP

- Amazon VPC DNS server (Route53 DNS Resolver) resolves DNS names to IP addresses within your VPC.
- DHCP Options sets
- EC2 DNS names - internal and external
- VPC DNS Attributes - enableDnsSupport and enableDnsHostnames
- Hands-on:
  - VPC DNS with Route53 Hosted Zones
  - VPC DNS with custom DNS server
- Introduction to Route 53 resolver endpoints

---

### Amazon DNS Server - Amazon Route 53 Resolver

- VPC comes with default DNS server also called as Route53 DNS Resolver.
- Runs at VPC Base + 2 Address (can also be accessed from within the VPC at virtual IP 169.254.169.253)
- Resolves DNS requests from:
  - Route 53 Private Hosted Zone
  - VPC internal DNS
  - Forwards other requests to Public DNS (including Route 53 Public Hosted Zones)
  - DNS resolution is enabled by default in VPC.
  - DNS resolution is disabled by default in peered VPCs.
- Accessible from within the VPC

#### Amazon Route 53 Private Hosted Zone

1. Create a private hosted zone in Route 53. (e.g. example.internal or example.com)
2. Create record sets pointing to EC2 instances private IPs in the VPC.
3. DNS queries from within the VPC will resolve to the private IP addresses.

#### VPC DNS

- EC2 instances get Private DNS name such as
  - ip-<private-ipv4-address>.region.compute.internal

#### Public DNS

- google.com, amazon.com, etc.
- Amazon services public endpoints
  - sqs.ap-south-1.aws.amazon.com
  - s3.ap-south-1.amazonaws.com

#### DHCP Option Sets

- VPC comes with default DHCP option sets which provides these dynamic host configurations to the instances on launch

  - Domain Name: ec2.internal
  - Domain Name Servers: Amazon provided DNS server
  - NTP Servers: Amazon provided NTP server
  - NetBIOS Name Servers: Amazon provided NetBIOS Name Servers
  - NetBIOS Node Type: Amazon provided NetBIOS Node Type

- The options field of a Dynamic Host Configuration Protocol (DHCP) message contains the configuration parameters
  like domain name, domain name server, NTP server and the NetBIOS node type.

- AWS automatically creates and associates a DHCP option set for your VPC upon creation and sets the following parameters:
  - domain-name-servers: This defaults to AmazonProvidedDNS.
  - domain-name: This defaults to the internal Amazon domain name for your region (e.g., <ip>.ap-south-1.compute.internal).
  - ntp-servers: This defaults to AmazonProvidedNTP.
  - netbios-name-servers: This defaults to AmazonProvidedNetBIOS.
  - netbios-node-type: This defaults to 2.

#### DHCP Option Set (default)

1. Sets the hostname of the instance to the private DNS name.

- ip-<private-ipv4-address>.<region>.compute.internal

2. Sets the resolve.conf

- `cat /etc/resolv.conf`
- `search ap-south-1.compute.internal`
- `nameserver 10.10.0.2 (VPC DNS Server)`

#### AWS assigned domain name for EC2

- Internal DNS

  - ip-<private-ipv4-address>.ec2.internal (for the us-east-1 region)
  - ip-<private-ipv4-address>.region.compute.internal (for other regions)

- External DNS (if instance has Public IP)
  - ec2-<public-ipv4-address>.compute-1.amazonaws.com (for the us-east-1 region)
  - ec2-<public-ipv4-address>.region.amazonaws.com (for other regions)

**VPC DNS Attributes**

- **enableDnsSupport:** (= DNS Resolution setting)

  - Default: True
  - Helps decide if DNS resolution is supported for the VPC
  - If True, queries the AWS DNS server at 169.254.169.253 (=> VPC+2)

- **enableDnsHostname:** (= DNS Hostname setting)

  - False by default for newly created VPC, True by default for Default VPC
  - Won't do anything unless enableDnsSupport=True
  - If True, assigns public hostname to EC2 instance if it has a public IP

**If you use custom DNS domain names in a Route 53 Private hosted zone, you must set both these attributes to True.**

#### DHCP Option Sets Good to Know

- Once created you can not modify the DHCP option set. However you can create a new one and associate it with the VPC.
- You can only associate a single DHCP option set with a VPC.
- VPC can also be setup without DHCP option set. In that case the instances in
  the VPC can't access the internet as there is no access to a DNS server.
- After DHCP option set is associated with VPC, the instances automatically use new option set, but this may take a few hours.
- You can also refresh the DHCP option parameters using an operating system command:
  - `sudo dhclient -r eth0`

---

**Network Performance - Basics**

- **Bandwidth** -- Maximum rate of transfer over the network
- **Latency** -- Delay between two points in a network
  - Delays include propagation delays for signals to travel across medium
  - Also includes the processing delays by network devices
- **Jitter** -- Variation in inter-packet delays.
- **Throughput** -- Rate of successful data transfer (measured in bits per sec)
  - Bandwidth, Latency, and Packet loss directly affect the throughput
- **Packet Per Second (PPS)** -- How many packets processed per second
- **Maximum Transmission Unit (MTU)** -- Largest packet that can be sent over the network

- **Jumbo Frames** -- Ethernet frames with more than 1500 bytes of payload

**Jumbo Frames**

- **9001 MTU**
- Reduces overhead and increases throughput
- Requires all devices in the network to support Jumbo Frames
- Jumbo frames are enabled in a VPC by default
- AWS supports Jumbo frame within VPC; however, traffic leaving VPC over IGW or VPC peering does not support Jumbo frames (Limited to 1500 byte)
- Jumbo frames are also supported between VPC and on-premises network using AWS Direct Connect
- Using Jumbo frames inside EC2 cluster placement groups provides maximum network throughput
- Jumbo frames should be used with caution for traffic leaving the VPC. If packets are over 1500 bytes, they are fragmented, or they are dropped if the "Don't Fragment" flag is set in the IP header

**Defining MTU on EC2 instances**

- MTU also depends on Instance Type
- Defined at the ENI level
- You can check the path MTU between your device and target endpoint using the tracepath command:

  `tracepath amazon.com`

- To check the MTU on your interface:

  `ip link show eth0`

- To set MTU value on Linux:

  `sudo ip link set dev eth0 mtu 9001`

You can use third-party tools or scripts to determine the MTU on macOS.
Alternatively, you can use `ping` with the "Do Not Fragment" flag to test MTU manually.

Example:

`ping -D -s 1472 amazon.com`

- Replace `1472` with smaller or larger values until you find the MTU limit (1472 is used here because it's 1500 minus 28 bytes for headers).

**MTU**

**Within AWS:**

- Within VPC: Supports Jumbo frames (9001 bytes)
- Over the VPC Endpoint: MTU 8500 bytes
- Over the Internet Gateway: MTU 1500 bytes
- Intra-region VPC Peering: MTU 9001 bytes
- Inter-region VPC Peering: MTU 1500 bytes

**On-premise network:**

- Over the VPN using VGW: MTU 1500 bytes
- Over the VPN via Transit Gateway: MTU 1500 for traffic for Site-to-Site VPN
- Over the DirectConnect (DX): Supports Jumbo frames (9001 bytes)
- Over the DX via Transit Gateway: MTU 8500 for VPC attachments connected over the Direct Connect

---

**Placement Groups - Cluster**

- A logical grouping of instances within a single Availability Zone.
- Ideal for distributed applications that need low network latency, high network throughput, or both.

**EBS Optimized Instances**

- EBS is a network drive that can be attached to EC2 instances. (not physically attached)
  - It uses the network to communicate with the instance, which means there might be a bit of latency.
- EBS input/output will affect network performance.
- Amazon EBS-optimized instances enable EC2 instances to fully use the IOPS provisioned on an EBS volume. (Dedicated throughput between EC2 and EBS)
- This minimizes contention between EBS I/O and other traffic from your instance.

---

## Enhanced Networking

- Enhanced Networking provides higher bandwidth, higher packet per second (PPS) performance, and consistently lower inter-instance latencies.
- Over IM PPS performance
- SR-IOV (Single Root I/O Virtualization) with PCI passthrough, to get the hypervisor out of the way and for consistent performance. Method of device virtualization that provide higher I/O performance and lower CPU utilization.
- SR-IOV allows a single physical NIC to present itself as multiple vNICs
- PCI passthrough enables PCI devices such as ENI to appear as if they are physically attached to the guest operating system bypassing hypervisor.
- Ultimately in combination this allows low latency, high rate data transfer (> 1 M PPS)
- Depending on Instance Type, Enhanced Networking can be enabled using one of the following Network drivers
  - option 1: Intel 82599 VF interface up to 10Gbps (VF uses ixgbevf driver)
  - option 2: Elastic Network Adapter (ENA) up to 100Gbps
- The eligible EC2 instance families support either of the above two drivers

**Supported Instance Types**

- Instances supporting `Elastic Network Adapter (ENA)` for speed upto 100 Gbps
  - C5, C5d, C5n, I3en, M5, M5a, M5n, M5zn, R5, R5a, R5n, R5dn, Z1d, H1, I3, M5d, R5ad, R5d, z1d
- Instances supporting `Intel 82599 VF` interface for speed upto 10 Gbps
  - C3, C4, D2, I2, M4 (excluding m4.16xlarge), and R3.

**Additional Tuning and Optimization - DPDK**

- Intel Data Plane Development Kit (DPDK) is a set of libraries and drivers for fast packet processing.
- While Enhanced Networking and SR-IOV reduce overhead of packet processing between instance and hypervisor, DPDK reduces overhead of packet processing inside the Operating System.
- DPDK provides
  - Lower CPU overhead
  - Low latency due to Kernel bypass
  - Predictable packet processing
  - High throughput

**Elastic Fabric Adapter (EFA)**

- EFA is an ENA with added capabilities for HPC workloads.
- HPC means High Performance Computing.
- Provides lower latency and higher throughput for tightly coupled HPC applications.
- Provides OS bypass functionality (Linux)
- For windows instance, it acts just as ENA
- With an EFA, HPC applications use MPI to interface with the Libfabric API which bypasses OS kernel and communicates directly with the EFA
  device to put packet on the network.

---

## Bandwidth Limits

- No VPC specific limits on bandwidth.
- No limit for any Internet Gateway
- No limit for VPC peering
- Each NAT gateway can provide up to 45 Gbps. Use multiple NAT gateways to scale beyond 45 Gbps.

**EC2 Instance Bandwidth Limits**

- With Intel 82599 VF interface
  - 10 Gbps aggregate and 5 Gbps flow-based bandwidth limit
- With AWS ENA driver
  - 10 Gbps flow limit inside a placement group
  - 5 Gbps flow limit outside of a placement group
  - Aggregate bandwidth of 100 Gbps with multiple flows within a VPC or a peered VPC or to S3 (using VPC endpoint) in the same region.

## **Note**: AWS P4d instances deployed in UltraClusters supercomputer provides 400 Gbps networking.

---

# Network Credits

- Instance families such as R4 and C5 use a network I/O credit mechanism.
- Most applications do not consistently need a high network performance.
- These instances perform well above baseline network performance during peak requirement.
- Make sure that you consider the accumulated network credits before doing performance benchmark for instances supporting network I/O credits mechanism.

---

# VPC Flow Logs

- Capture information about IP traffic going in/out of your ENIs:
  - VPC Flow Logs
  - Subnet Flow Logs
  - Elastic Network Interface Flow Logs
- Data is stored in CloudWatch Logs or S3
- Helps to monitor and troubleshoot connectivity issues
- Flow logs data can go to S3 / CloudWatch Logs / Kinesis Data Firehose
- Captures network information from AWS managed interfaces as well
  - ELB, RDS, ElastiCache, Redshift, Amazon Workspaces, NAT Gateway, and VPN Gateway, Transit Gateway

VPC Flow Logs custom format:

- vpc-id
- subnet-id
- instance-id
- type: IPv4 / IPv6
- pkt-src: Source IP
- pkt-dst: Destination IP
- pkt-src-aws-service: Source AWS service
- pkt-dst-aws-service: Destination AWS service
- traffic-path
- region
- az-id
- flow-direction: ingress or egress

---

# VPC Traffic Mirroring

- Copy network traffic from an elastic network interface of Amazon EC2 instances
- Send the traffic to out-of-band security and monitoring appliances for Content inspection or threat monitoring or for troubleshooting
- How to set up Traffic Mirroring (via AWS VPC console)
  - Create a traffic mirror session
  - Specify the source and target
  - Choose the traffic to mirror
  - Start the session

---

# VPC Reachability Analyzer

- Connectivity testing between the source resource and a destination resource
- Produces hop-by-hop details of the virtual network path
- Points out the blocking components when traffic is not reachable
- Does not send a real packet, it uses network configurations to find out if network is reachable

Use Cases:

- Troubleshoot connectivity issues caused by network misconfiguration
- Automate the verification of connectivity after network configuration changes

- Supported Source and Destination:

  - EC2 instances
  - Network Load Balancers
  - Network INterfaces
  - NAT Gateways
  - Internet Gateways
  - VPC Peering Connections
  - VPC endpoints
  - Transit Gateways
  - VPN Connections

- Intermediate components:
  - ALB and NLB
  - NAT Gateway
  - TGW, TGW attachment, VPC peering

The source and destination resources:

- Must be in the same VPC or VPCs connected through a VPC peering or Transit Gateway
- Must be in the same Region
- Can be across AWS accounts in the same AWS organization

# VPC Network Access Analyzer

- Identify un-intended network access to the AWS resources
- Isolated network segments
- No communication between production and development VPCs
- Internet accessibility
- Only required resources can be reached over the internet
- Trusted network paths
- NAT gateways or firewalls in the path
- Trusted network access
- Accessible only from specific resource, IP range, port, protocol etc.

- Specify network access scope and analyze if it meets you compliance

---

# VPC Peering Limitations

- Must not have overlapping CIDR
- VPC Peering connection is not transitive (must be established for each VPC that need to communicate with one another)
- You can setup only 1 VPC peering connection between 2 VPCs
- Maximum 125 VPC peering connections per VPC

---

# VPC Endpoints

- Endpoints allow you to connect to AWS Services using a private network instead of the public network
- They remove the need of IGW, NAT Gateway to access AWS Services
- Endpoint devices are horizontally scaled, redundant and highly available without any bandwidth constraints on your network traffic
- **Gateway Endpoint**: provisions a target and must be used in a route table
  - S3 and DynamoDB
- **Interface Endpoint**: provisions an ENI (private IP) as an entry point - most other AWS services

---

# VPC Gateway Endpoint

- Enables private connection between VPC and S3/DynamoDB
- Need to modify the route tables and add an entry to route the traffic to S3 or DynamoDB through the gateway VPC endpoint
- When we create an Amazon S3 endpoint, a prefix list is created in VPC
- The prefix list is the collection of IP addresses that Amazon S3 uses.
- The prefix list is formatted as pl-xxxxxxxx and becomes an available option in both subnet routing tables and security groups
- Prefix list should be added in Security group Outbound rule (if Security group outbound rules do not have default "Allo All" rule)

---

# VPC Endpoint Security

- Endpoint allows more granular access to VPC resources as compared to broad access through VPC peering connection
- Access to S3 through VPC endpoint can be secured using bucket policies and endpoint policies
- VPC Endpoint policy
  - An IAM policy which is attached to VPC endpoint
  - Default policy allows full control to the AWS service

# VPC Endpoint Policy

- **VPC Endpoint Policy to restrict access to a specific S3 bucket or a DynamoDB table**

## Restrict access to S3 Bucket

```json
{
  "Statement": [
    {
      "Sid": "Access-to-specific-bucket-only",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Effect": "Allow",
      "Resource": [
        "arn:aws:s3:::my_secure_bucket",
        "arn:aws:s3:::my_secure_bucket/*"
      ]
    }
  ]
}
```

## Restrict access to DynamoDB Table

```json
{
  "Statement": [
    {
      "Sid": "AccessToSpecificTable",
      "Principal": "*",
      "Action": [
        "dynamodb:Batch*",
        "dynamodb:Delete*",
        "dynamodb:DescribeTable",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Update*"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/StockTable"
    }
  ]
}
```

## S3 Bucket policy to restrict access to a specific VPC endpoint

```json
{
  "Version": "2012-10-17",
  "Id": "Qolicy1415115909152",
  "Statement": [
    {
      "Sid": "Access-to-specific-VPCE-only",
      "Principal": "*",
      "Action": "s3:*",
      "Effect": "Deny",
      "Resource": [
        "arn:aws:s3:::my_secure_bucket",
        "arn:aws:s3:::my_secure_bucket/*"
      ],
      "Condition": {
        "StringNotEquals": {
          "aws:sourceVpce": "vpce-1a2b3c4d"
        }
      }
    }
  ]
}
```

---

## VPC Endpoint Policy & S3 Bucket Policy

- S3 bucket policy may have

  - Condition: "aws:sourceVpce": "vpce-la2b3c4d" to Deny any traffic that doesn't come from a specific VPC endpoint (more secure)
  - Condition: "aws:sourceVpc": "vpc-111bbb22" for a specific VPC

- The aws:sourceVpc condition only works for VPC Endpoints, in case you have multiple endpoints and want to manage access to your S3 bucket for all your endpoints
- The S3 bucket policies can restrict access only from a specific public IP address or an elastic IP address. You can't restrict based on private IP.

---

# Interface Endpoint

- Interface endpoints create local IP addresses (using ENI) in your VPC
- You create one interface endpoint per Availability zone for high availability
- There is per hour cost (~$0.01/hr per AZ) and data processing cost (~$0.01/GB)
- Uses Security Groups - inbound rules
- For interface endpoints, AWS creates Regional and zonal DNS entries that resolves to private IP address of interface endpoint.
- Interface endpoint supports only IPv4 traffic
- Interface VPC endpoints support traffic only over TCP

---

# AWS PrivateLink (VPC Endpoint Services)

- Most secure & scalable way to expose a service to 1000s of VPC (own or other accounts)
- Does not require VPC peering, internet gateway, NAT, route tables...
- Requires a network load balancer (Service VPC) and ENI (Customer VPC)
- If the NLB is in multiple AZs, and the ENI is in multiple AZs, the solution is fault tolerant

---

# VPC Interface Endpoint

- Porvisions an ENI that will have a private endpoint interface hostname
- Private DNS settings for interface endpoint

  - The public hostname of a service will resolve to the private Endpoint Interface hostname
  - VPC Setting: "Enable DNS hostnames" and "Enable DNS support" must be 'true'
  - Example for Athena:
    - Regional: vpce-0b7d2995e9dfe5418-mwrths3x.athena.us-east-1.vpce.amazonaws.com
    - Zonal: vpce-0b7d2995e9dfe5418-mwrths3x-us-east-1a.athena.us-east-1.vpce.amazonaws.com
    - Service DNS: athena.us-east-1.amazonaws.com (Private DNS name)

- With Private DNS enabled, the consumer VPC can access the endpoint services using Service's default DNS e.g ec2.us-east-1.amazonaws.com instead of using endpoint specific DNS e.g vpce-12345-ab.ec2.us-east-1.vpce.amazonaws.com

---

# VPC Interface endpoint

- An Interface endpoint can be accessed through
  - Direct Connect
  - AWS Managed VPN
  - VPC peering connection

---

# AWS PrivateLink vs VPC Peering

- VPC peering is useful when there are many resources that should communicate between peered VPCs
- PrivateLink should be used when you want to allow access to only single application hosted in your VPC to other VPCs without peering the VPCs
- When there is overlapping CIDRs, VPC peering connection can not be created. However private link does support overlapping CIDR
- We can create a maximum of 125 peering connections. There is no limit on private link connections.
- VPC peering enables bidirectional traffic origin. PrivateLink allows only consumer to originate the traffic.

---

# Exam essentials

- VPC interface endpoint create an ENI into your subnets
- Interface endpoint receives the Regional and zonal DNS name
- You can also use Route53 private hosted zone to use your custom DNS with Alias record to interface DNS
- Interface endpoint can be accessed over Direct Connect connection AWS managed VPN and VPC peering connection
- Traffic originates from the resources in the VPC and endpoint service can only respond to the request. Endpoint service initiate the request.

---

# Transit Gateway (TGW)

- Allows customers to interconnect thousands of Virtual Private Clouds (VPCs) and on-premises networks
- Transit Gateway attachments:

  - One or more VPCss
  - Peering connection with another Transit Gateway
  - A Connect SD-WAN/third-party network appliance
  - VPN
  - Direct Connect Gateway

- Transit Gateway features - Multicast support, MTU, Appliance mode, AZ consideration, TGW sharing.
- Transit Gateway architectures - Centralized traffic inspection, egress, interface endpoints etc.

---

# Transit Gateway AZ considerations

- When you attach a VPC to a transit gateway, you must enable one or more AZs to be used by the transit gateway to route traffic to resources
  in the VPC subnets.
- To enable each AZ, you specify exactly one subnet (typically /28 range to save IPs for workload subnets)
- The transit gateway places a network interface in that subnet using one IP address from the subnet
- After you enable an AZ, traffic can be routed to all subnets in that zone, not just the specified subnet
- Resources that reside in AZs where there is no transit gateway attachment cannot reach the transit gateway

---

# Transit Gateway Peering

- Transit gateways are regional routers which means you can connect VPCs from the same region
- For inter region network connectivity you can peer the transit gateways across the regions
- Static routes need to be added for peering connection
- The inter-region traffic is encrypted, traverses the AWS global network, and is not exposed to the public internet. Supports bandwidth up to 50 Gbps.
- Use unique ASNs for the peered transit gateways (as much as possible)

---

# Transit Gateway - Connect attachment

- You can create a transit gateway Connect attachment to establish a connection between a transit gateway and third-party virtual appliances (such as SD-WAN appliances) running in a VPC.
- A connect attachment uses an existing VPC or AWS Direct connect attachment as the underlying transport mechanism.
- Supports Generic Routing Encapsulation (GRE) tunnel protocol for high performance, and Border Gateway Protocol (BGP) for dynamic routing.
- Connect attachments do not support static routes. BGP is a minimum requirement for Transit Gateway Connect.
- Transit Gateway connect supports a maximum bandwidth of 5 Gbps per GRE tunnel. Bandwidth above 5 Gbp is achieved by advertising the same prefixes across multiple Connect peer (GRE tunnel) for the same Connect attachment.
- A maximum of four Connect peers are supported for each Connect attachment there by providing total 20 Gbps bandwidth per connection.

---

# Transit Galway Multicast

- Multicast is a communication protocol used for delivering a single stream of data to multiple receiving computers simultaneously.
- Single/multiple sources and destinations
- Destination is a multicast group address:
  - Class D - 224.0.0.0 to 239.255.255.255
- Connection less UDP based transport
- One way communication
- Examples: Sending email to the email-list, Conference call / Group chat, OTT platforms / TV media, Stock exchange transaction updates
- Multicast components
  - Multicast Domain
  - Multicast Group member
  - Multicast source receivers
  - Internet Group Management Protocol (IGMP) - used by hosts to join multicast group

# Multicast with Transit Gateway

- Enable Transit Gateway for Multicast services while creating the transit gateway
- Supports IPv4 and IPv6 IP addressing
- Supports hybrid integration with external applications
- Supports both static (API based) and Dynamic group membership through IGMP (supports IGMPv2 and IGMPv3)
- Supports multicast routing protocols such as Protocol Independent Multicast (PIM) and Multicast Source Discovery Protocol (MSDP)
- Supports multicast traffic over VPN and Direct Connect
- Supports multicast traffic over VPC attachments and peering connections
- Supports multicast traffic over Connect attachments

---

# Multicast traffic in a VPC

- Create multicast domain and add participating subnets
- Create multicast group and associate group membership IP ( e.g. 224.0.0.100)
- Configure the group membership statically using CLI/SDK or dynamically using IGMPv2
- Send traffic from source to multicast group IP
- All members in the group receive the multicast traffic
- Similar network flow works in case of multi-vpc and multi-account architecture

---

# Multicast considerations for TGW

- Transit Gateway supports routing multicast traffic between subnets of attached VPCs.
- A subnet can only be in one multicast domain.
- Host (ENIs) in the subnet can be part of one or more multicast groups within the Multicast domain.
- Multicast group membership is managed using the VPC Console or the AWS CLI, or IGMP.
- IGMPv2 support attribute determines how hosts join the multicast group. Members send JOIN or LEAVE IGMP message.
- Transit gateway issues an IGMPv2 QUERY message to all members every two minutes. Each member sends an IGMPv2 JOIN message in response, which is how the members renew their membership.
- Members that do not support IGMP must be added or removed from the group using the Amazon VPC console or the AWS CLI.
- Igmpv2Support attribute determines how group members join or leave a multicast group. When this attribute is enabled, members can send JOIN or LEAVE messages to join or leave a multicast group.
- StaticSourcesSupport multicast domain attributes determine whether there are static multicast sources for the group.
- A non-Nitro instance cannot be a multicast sender. If you use a non-Nitro instance as a receiver, you must disable the Source/Destination check
- Multicast routing is not supported over AWS Direct Connect, Site-to-Site VPN, TGW peering attachments, or transit gateway Connect attachments.
- Security group configuration on the IGMP hosts (instances), and any ACLs configuration on the host subnets must allow these IGMP protocol messages.
- You can share multicast domain with AWS accounts or OU inside its organization or across organizations. Multicast domain sharing also integrates with AWS Resource Access Manager (RAM).

---

# TGW Architecture: Centralized Egress internet

- Use NAT gateway's in each AZ for high availability and for saving inter-AZ data transfer cost
- If one AZ entirely fails, all traffic will flow via the Transit Gateway and NAT gateway endpoints in the other AZ.
- A NAT gateway can support up to 55,000 simultaneous connections to each unique destination.
- NAT gateway can scale from 5 Gbps to 100 Gbps.
- Black hole routes in the Transit Gateway route tables to restrict inter-VPC traffic
- This architecture doesn't necessarily save the cost because instead of per VPC NAT Gateway charge (e.g. ~$0.045/hr + ~$0.045/GB) it adds TG attachment & data processing charge (~$0.05/hr per VPC attachment + ~$0.02/GB)

---

# Centralized inspection with AWS GWLB

- Using AWS PrivateLink, GWLB Endpoint routes traffic to GWLB. Traffic is routed securely over Amazon network without any additional configuration.
- GWLB encapsulates the original IP traffic with a <u>GENEVE</u> header and forward it to the network appliance over UDP port 6081.
- GWLB uses 5-tuples or 3-tuples of an IP packet to pick an appliance for the life of that flow. This creates session stickiness to an appliance for the life of a flow required for stateful appliances like firewalls.
- This combined with Transit Gateway Appliance mode, provides session stickiness irrespective of source and destination AZ.

---

# Centralized VPC interface endpoints

- VPC interface endpoints provide the regional and AZ level DNS endpoints
- The regional DNS endpoint will return the IP addresses for all the AZ endpoints
- In order to save the inter-AZ data transfer cost from Spoke VPC to Hub VPC, you can use the AZ specific DNS endpoints. Selection has to be done by the client.

---

### **VPC Peering vs Transit Gateway**

| **Category**                              | **VPC Peering**                                                                                                   | **Transit Gateway**                                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Architecture**                          | One-One connection -- Full Mesh                                                                                   | Hub and Spoke with multiple attachments                                                   |
| **Hybrid Connectivity**                   | Not supported                                                                                                     | Supported hybrid connectivity via VPN and DX                                              |
| **Complexity**                            | Simple for fewer VPCs, complex as the number of VPCs increases                                                    | Simple for any number of VPCs and hybrid network connectivity                             |
| **Scale**                                 | 125 peering / VPC                                                                                                 | 5000 attachments / TGW                                                                    |
| **Latency**                               | Lowest                                                                                                            | Additional hop                                                                            |
| **Bandwidth**                             | No limit                                                                                                          | 50 Gbps / attachment                                                                      |
| **Ref Security Group**                    | Supported                                                                                                         | Not supported                                                                             |
| **Subnet Connectivity**                   | For all subnets across AZs                                                                                        | Only subnets within the same AZ in which TGW attachment is created                        |
| **Transitive Routing (e.g., IGW access)** | Not supported                                                                                                     | Supported                                                                                 |
| **TCO (Total Cost of Ownership)**         | Lowest -- Only data transfer cost (free within same AZ, $0.01 across AZs in each direction, $0.02 across regions) | Per attachment cost + data transfer cost (e.g., N. Virginia: $0.05 per hour + $0.02 / GB) |

---

# Sharing Transit Gateway

- Use AWS Resource Access Manager (RAM) to share a transit gateway for VPC attachments across accounts or across your organization in AWS Organizations.
- An AWS site-to-site VPN attachment must be created in the same AWS account that owns the transit gateway.
- An attachment to a Direct Connect gateway can be in the same AWS account as the Direct Connect Gateway, or a different account from the Direct Connect gateway.
- When a transit gateway is shared with the AWS account, that AWS account cannot create, modify, or delete transit gateway route tables, or route table propagations and associations.
- When the transit gateway and the attachment entities are in different accounts, use the Availability Zone ID to uniquely and consistently identify the Availability Zone.
  For example, use 1 -az 1 is an AZ ID for the us-east-1 region and maps to the same location in every AWS account.

---

# AS - Autonomous System

- Routers controlled by one entity in a network
- Assigned by IANA for Public ASN (1 - 64495)
- Private ASN (64512-65534)

---

# BGP - Border Gateway Protocol

- Dynamic Routing using Path-Vector protocol where it exchanges the best path to a destination between peers or AS (ASPATH)
- iBGP - Routing within AS
- eBGP - Routing between AS
- Routing decision is influenced by
  - Weight (Cisco routers specific - works within AS)
  - ASPATH - Series of AS's to traverse the path (Works between AS)
  - Local Preference LOCAL_PREF (Works within AS), highest is proffered, default value 100
  - MED - Multi-Exit Discriminator (Works between AS), used when there are multiple paths between two AS's

---

# VPN Basics

- VPN allows hosts to communicate privately over an untrusted intermediary network like internet, in encrypted form
- AWS supports Layer 3 VPN (not layer 2)
- VPN has 2 forms - site to site VPN and Client to site VPN
  - Site to site VPN connects 2 different networks
  - client to site VPN connect the client device like laptop to the private network
- VPN types
  - IPSec (IP security) VPN which is supported by AWS managed VPN
  - Other VPNs like GRE and DMVPN are not supported by AWS managed VPN

## How site-to-site VPN works in AWS

- VPN connection terminated at Virtual Private Gateway (VGW) on AWS end
- VGW creates 2 tunnel endpoints in different AZs for high availability

### Virtual private gateway (VGW)

- Managed gateway endpoint for the VPC
- Only one VGW can be attached to VPC at a time
- VGW supports both Static Routing and Dynamic routing using Border gateway protocol (BGP)
- For BGP, you can assign the private ASN (Autonomous System Number) to VGW in the range of 64512 to 65534
- If you don't define ASN, AWS assigns default ASN. ASN can not be modified once assigned (default 64512)
- VGW Supports AES-256 and SHA-2 for encryption and data integrity

---

# VPN Support for NAT-Traversal (NAT-T)

- AWS VPN supports the VPN termination behind NAT on customer side
- You must open UDP port 4500 on customer side of firewall for NAT-T

## VPN Static and Dynamic routing

- In case of static routing, you must pre-define the CIDR ranges on both sides of the VPN connection. If you add new network ranges
  on either sides, the routing changes are not propagated automatically.
- In case of Dynamic routing, both the ends learns the new network changes automatically. On AWS side, the new routes are automatically propagated in the route tables.
- AWS route table can not have more than 100 propagated routes. Hence you need to make sure you don't publish more than 100 routes from on-premises network.
- To avoid the situation, you may think to consolidate network ranges into larger CIDR range

---

# Dead peer detection (DPD)

- DPD is a method to detect liveliness of IPSec VPN connection
- VPN peers can decide during "IKE Phase 1" if they want to use DPD
- If DPD is enabled AWS continuously (every 10 sec) sends DPD (R-U-THERE) message to customer gateway and waits for the R-U-THERE-ACK message.
  If there is no response to consecutive 3 requests, then DPD times out.
- By default, when DPD occurs, the gateways delete the security associations. During this process, the alternate IPsec tunnel is used if possible.
- Default DPD timeout value is 30 sec which can be set higher than 30 seconds
- DPD uses UDP 500 or UDP 4500 to send DPD messages
- DPD timeout actions:
  - Clear (default action) - End the IPSec IKE session, stop the tunnel and clear the routes
  - Restart - AWS Restarts the IKE Phase 1 session
  - None - No action is taken
- Customer router must support DPD when using Dynamic Routing (BGP)
- VPN tunnel can still be terminated due to inactivity or idle connection. You can set up appropriate idle timeout or setup a host which sends ICMP (ping) requests every say 5-10 seconds

---

# VPN Monitoring with CloudWatch

- TunnelState: The state of the tunnel. 0 indicates DOWN and 1 indicates UP. Value between 0 and 1 indicates that at least 1 tunnel is not UP.
- TunnelDataIn: The bytes received through the VPN tunnel
- TunnelDataOut: The bytes sent through the VPN tunnel

## VPN Monitoring with Health Dashboard

- AWS site-to-site VPN automatically sends notifications to the AWS personal health dashboard (PHD)
- Tunnel endpoint replacement notification
- Single Tunnel VPN notification (when one of the tunnel is down for more than one hour in a day)

### AWS site-to-site VPN architectures

- Single site-to-site VPN connection
  - with virtual private gateway
  - with transit gateway (TGW)
- Multiple site-to-site VPN connections to branch offices
- Redundant VPN connections for high availability

---

# VPN CloudHub - Routing between multiple customer sites

- using VPN gateway in detached mode
- each customer gateway must have unique BGP ASN with dynamic routing
- sites must not have overlapping IP ranges
- Connect up to 10 customer gateways
- Can serve as failover connection between on-premises locations

---

# AWS Direct Connect (DX)

- A dedicated network connection from on-premises to AWS
- AWS <-> DirectConnect Location <-> On-premises Data Center
- Low latency and consistent bandwidth
- Lower data transfer cost
- Access AWS Private Network (VPC) and AWS public services endpoints (e.g S3, DynamoDB)
- Leverages AWS Global network backbone
- DX locations are provided by authoritative 3rd party providers
- 115 DX locations across the world across 31 AWS regions (as of today)
- End to end provisioning time of 4-12 weeks
- Get bandwidth of 1, 10 or 100 Gbps with Dedicated connection
- Get sub-1 Gbps bandwidth (50/100/200/400/500 Mbps, 1, 10 Gbps) by leveraging AWS Direct Connect APN partner

# DX network requirements

- Single-mode fiber

  - 1000BASE-LX (1310 nm) transceiver for 1G
  - 10GBASE-LR (1310 nm) transceiver for 10G
  - 100GBASE-LR4 for 100G

- 802.1Q VLAN encapsulation must be supported
- Auto-negotiation for the port must be disabled for port speed for more than 1Gbps
- End Customer Router (on-premises) must support Boarder Gateway Protocol (BGP) and BGP MD5 authentication
- (optional) Bidirectional Forwarding Detection (BFD) for faster link failure detection

# Auto-negotiation of the ports

- Auto-negotiation is the ability of a network interface to automatically coordinate its own connection parameters (speed and duplex) with another network interface.

# BGP

- Current version is BGP-4 (V4) which is defined in RFC 4271 in 2006
- Dynamic Routing using Path-Vector protocol where it exchanges the best path to a destination between peer or AS
- TCP based protocol on port 179
- iBGP - Routing within AS
- eBGP - Routing between AS's
- Network path selection decision is influenced by BGP routing parameters
  - ASPATH - Series of AS's to traverse the path (works between AS)
  - Local preference LOCAL_PREF (works within AS)
  - MED - Multi-Exit Discriminator (works between AS)

# BFD - Bidirectional Forwarding Detection (optional)

- It's a simple Hello Network Protocol
- Lowers the network failure detection time between the neighboring peers
- Provides the detection time less than 1 sec

# ASN - Autonomous System Number

- Public and Private ASN
  - Public ASNs are assigned by IANA via Regional Internet Registries (RIRs)
  - You need to use the Public ASN if you are exchanging routes over a public internet
  - You can use private ASN for private connection between two AS
- 2 Byte (16 bit) ASN (0 - 65535)
  - Public ASN is assigned by IANA in the range of 1 to 64495
  - Private ASN can be assigned in the range of 64512 to 65534
- 4 Byte (32 bit) ASN (0 to 4294967295)
  - Public ASN is assigned by IANA in the range 1 to 2147483647
  - Private ASN can be assigned in the range of 4200000000 to 4294967294

---

# Direct Connect - Connection Types

- Dedicated Connections: 1 Gbps, 10 Gbps, 100 Gbps capacity

  - Physical ethernet port dedicated to a customer
  - Request made to AWS first, then completed by AWS Direct Connect Partners
  - Can be either setup by your Network Provider or AWS Direct Connect Partner

- Hosted Connections:
  - 50, 100, 200, 300, 400, 500 Mbps and 1 Gbps, 2 Gbps, 5 Gbps, 10 Gbps
  - Connections requests are made via AWS Direct Connect Partners
  - 1, 2, 5, 10 Gbps available at select AWS Direct Connect partners
  - AWS uses traffic policing on hosted connections - excess traffic is dropped

# Dedicated Connection - Sequence of events

1. You select the AWS region, DX location and submit the connection request via AWS console or CLI or API
2. AWS provisions your port within 72 hours and provides you with the Letter of Authorization - Connection facility assignment (LOA-CFA)
3. LOA contains the demarcation details of assigned port within the facility
4. If your organization has physical presence in DX location, then you can request for cross-connect within the facility to connect to AWS device
5. If not, you provide the copy of LOA to DX APN partner and partner places the order for cross-connect
6. After connection is up, you receive Tx/Rx optical signal at your equipment
7. Now, you can create Private or Public Virtual Interfaces to connect to your VPC or public AWS services

# Hosted connection - Sequence of events

- To order Hosted connection, you don't need to get LOA. You can directly contact a Direct Connect Partner to order the connection
- You provide your 12-digit AWS account number to the partner
- Partner will setup the hosted connection and this connection will be available in your account (in the given region) to accept it
- Once you accept the connection, it enables the billing for associated port hours and data transfer charges

---

# Hosted VIF

- Don't get confused with Hosted Connection
- When creating a VIF you may choose "Another AWS account"
- A hosted interface works the same as a standard virtual interface and can connect to public resources or a VPC
- You are still the owner of the Direct connect Connection however the VIF is created in another AWS account who must accept it
- Typically used in a scenario where centralized network team manages the DX connection and provisions VIFs for business accounts

---

# Virtual Interfaces - VIF (Logical connectivity)

- In order to use the DX connection you must provision the Virtual Interfaces
- A VIF is a configuration consisting primarily of an 802.1Q VLAN
- There are 3 types of VIFs
  - Public VIF: Enables the connectivity to all AWS public IP addresses
  - Private VIF: Enables the connectivity to VPC via Virtual Private Gateway or Direct Connect Gateway
  - Transit VIF: Enables the connectivity to Transit Gateways via Direct Connect gateway

# VIF Parameters

- Connection: AWS DX connection or a LAG
- VIF Type: Public or Private or Transit
- VIF Name: Anything
- VIF Owner: Your AWS account or other AWS account (hosted VIF)
- Gateway Type (Private VIF only)
  - Virtual Private Gateway (VPG)
  - Direct Connect Gateway (DXGW)
- VLAN: 802.1Q VLAN ID
  - Not duplicated on same DX connection (1 - 4094)
  - For hosted connection VLAN ID is already configured by the partner
- BGP ASN: Your ASN (Public or Private) IPV4 and IPV6 AWS ASN (7224) for Public VIF and 64512 for Private VIF (default)
  - Public or Private BGP ASN
  - Public ASN must be owned by the customer and assigned by IANA
  - Private ASN can be set by you and must be between 64512 to 65534 (16-bit) or 1 to 2147483647 (32-bit)
  - BGP MD5 authentication key (optional) If not provided, AWS generates authentication key
- BGP Peer IP Addresses
  - Public VIF (IPv4): Public IPs (/30) allocated by you for the BGP session. Request to AWS if you don't have it.
  - Private VIF (IPv4): Specify private IPs in the range 169.254.0.0/16. By default AWS provides address space.
  - IPv6: Amazon automatically allocates you a /125 IPv6 CIDR. You cannot specify your own peer IPv6 addresses.
- Prefixes to be advertised
  - Public VIF: You can advertise any public IP range
  - Private VIF: You can advertise the VPC CIDR or any other CIDR range
- Jumbo Frames (Private and Transit VIF only)
  - private VIF: 9001 MTU supported for propagated routes only (Default is 1500 MTU)

---

# AWS IP Ranges - ip-ranges.json

- AWS Publishes all its current public IP addresses in JSON format
- Download json: https://ip-ranges.amazonaws.com/ip-ranges.json
- You can filter the IP addresses by Region, AWS Service, IPv4 or IPv6
- Useful when you want to restrict access to only AWS services public IPs
- Get notified by subscribing to AWS SNS topic in N. Virginia region
  - Topic Name: AmazonIpSpaceChanged
  - Topic ARN: arn:aws:sns:us-east-1:806199016981:AmazonIpSpaceChanged

---

# Public VIF

- Enables your network to connect to all AWS public IPs globally
- You can access services outside VPC e.g S3, SQS, DynamoDB and other public endpoints like AWS managed VPN (VGW) public IPs
- To create a public VIF with IPv4 addresses, you need to provide both the AWS router public IPs and your side of the router public IPs with /30 CIDR
- In case you don't have your own Public IPs for peering, raise a support case to get it from AWS owned IP ranges (AWS Provides /31 range)
- You must also specify the IPv4 address prefixes you want to advertise
- AWS verifies with internet registries that these IP prefixes are owned by you and you are authorized to advertise them
- AWS advertises all Amazon prefixes over a BGP session. These includes prefixes for AWS services like EC2, S3 and Amazon.com
- No access to non-amazon prefixes
- refer to ip-ranges.json for current list of Amazon prefixes
- At customer router the firewall can be used to restrict access to and from specific Amazon prefixes
- From customer router to AWS maximum 1000 route prefixes can be advertised per Border Gateway Protocol (BGP) session

---

# Private VIF

- Enables your network to connect to resources inside VPC using Private IPs for resources like EC2, RDS, Redshift over Private IPs
- You must attach your VPC to VGW and associate VGW with Private VIF
- Private VIF and VGW must be in the same AWS Region
- On BGP session, customer router will receive all the prefixes of VPC
- You can announce a maximum of 100 prefixes to AWS. These routes can be automatically propagated into subnet route tables
- In order to advertise more than 100 prefixes, you should summarize the prefixes into larger range to reduce number of prefixes
- The propagated routes will take precedence over default route to internet via IGW
- Supports MTU of 1500 (default) and 9001 for propagated routes

# What you can't access inside VPC (Private VIF)

- Does not provide access to VPC DNS resolver at Base + 2

---

# Transit VIF

- Enables the connection between Direct Connect and Transit Gateway
- Transit VIF is connected to Direct Connect Gateway and Direct Connect Gateway connects to transit Gateway
- Support MTU of 1500 and 8500 (Jumbo frames)
- You can attach multiple Transit Gateways to a single DX Gateway
- You can attach multiple DX Gateways to a single Transit Gateway
- The ASN for DX Gateway and Transit Gateway must be different. If you use the default ASN (64512) for both of them then the association fails.

---

# Direct Connect Gateway

- Global network device - Accessible in all regions
- Direct Connect integrates via a private VIF or a transit VIF
- DX Gateway is used for VPC <-> On-premises connectivity and can not be used for Public endpoint connectivity
- The private VIF or Transit VIF and Direct Connect gateway must be owned by same AWS account however VPCs (VGWs) or Transit Gateways can be from
  same or different AWS accounts
- Overlapping CIDRs for VPCs are not allowed
- VPC to VPC communication is not allowed via DX Gateway
- Maximum 100 routes each for IPv4 and IPv6 can be advertised from on-premise to AWS (same as Private VIF and Transit VIF limit)
- Single Direct Connect Gateway can connect to 20 VGWs (VPCs) and this limit may increase in the future

# DX Gateway with TGW - Summary

- 4 Transit VIF per Direct Connect dedicated connection
- 1 Transit VIF per Direct Connect hosted connection
- TGW is associated with the Direct Connect Gateway
- 6 TGWs can be attached per Direct Connect Gateway
- TGW's can be peered across AWS Regions to enable inter VPC communication

---

# What is AWS Direct Connect SiteLink?

- Connects on-premises networks through the AWS global network backbone
- SiteLink can be enabled for a Private VIF or a Transit VIF
- Supported on any combination of a dedicated or a hosted DX connection with different port speeds
- Takes the shortest path for the traffic sent over AWS global network
- Turn SiteLink on or off in minutes
- Supports both IPv4 and IPv6 routing prefixes and traffic
- Full mesh or isolated network connections between customer locations
- Cost: $0.50/hr + Data transfer cost

---

# DX Routing Policies and BGP Communities

- Routing policies influence the routing decision when traffic flows through Direct Connect connections
- Inbound routing Policies - from on-premises to AWS
- Outbound routing Policies - from AWS to on-premises
- Rouging policies and BGP communities work differently for Public VIF and Private / Transit VIFs

# Public VIF

- For path selection (routing priority) use BGP attributes like Longest prefix, AS_PATH
- For route propagation scope, use BGP community tags
  - Inbound: 7224:9100, 7224:9200, 7224:9300
  - NO_EXPORT

# Private VIF

- For path selection (routing priority) use BGP attributes:
  - Longest prefix
  - AS_PATH
  - Local preference BGP community tags:
    - 7224:7100 (Low)
    - 7224:7200 (Medium)
    - 7224:7300 (High)

# Routing priority out of the VPC

1. Longest prefix match first

- e.g 10.10.2.15/32 has priority over 10.10.2.0/24

2. Static routes over propagated routes

3. Propagated routes

- Direct Connect BGP routes (Dynamic Routes)
- VPN Static routes
- VPN BGP routes (Dynamic Routes)

---

# Public VIF Routing policies - Inbound

- You must specify the public IPv4 prefixes or IPv6 prefixes to advertise over BGP
- You must own the public prefixes (Regional Internet Registry)
- Traffic must be destined to Amazon public prefixes
- Transitive routing between connections is not supported
- AWS Direct Connect performs inbound packet filtering

# Public VIF Routing policies - Outbound

- Longest Prefix Match and AS_PATH can be used to influence the routing
- AWS Direct Connect advertises all local and remote AWS Region prefixes
- Advertises all public prefixes with NO_EXPORT BGP community tag.
- Additionally AWS advertises 7224:8100 and 7224:8200 BGP community tags
- The prefixes advertised by AWS Direct Connect must not be advertised beyond the network boundaries of your connection
- In case of multiple AWS DX connections, you can adjust the load-sharing of traffic by advertising prefixes with similar path attributes (ECMP)

---

# Public VIF routing scenarios

# Multiple DX connections traffic routing scenarios using Routing policies for Public VIF

# Active-Active connection using Public VIF

- If using a public ASN:
  - Customer gateway to advertise the same prefix with the same Border Gateway Protocol (BGP) attributes on both public virtual interfaces (VIFs)
  - This configuration load balances traffic over both public virtual interfaces.
- If using a private ASN:

  - Load balancing on a public virtual interface is not supported.

- If using a public ASN:
  - Customer gateway to advertising the same prefix (public IP or network that you own) on both BGP sessions
  - Start advertising the on-premises public prefixes with additional AS_PATH prepends in the BGP attributes for Secondary connection
  - Increase the Local Preference (local-pref) to be sure that the on-premises router always chooses the correct path for sending traffic to AWS
- If using a private ASN:
  - Use longer prefixes on primary connection.
  - Example: two prefixes (X.X.X.0/25 and X.X.X.128/25) on your primary connection and X.X.X.0/24 on secondary connection.

---

# DX route advertisement scenarios for Public VIF using BGP communities

## Public VIF - BGP Communities

- BGP Community tags help control the scope for the advertisement of the prefixes (Regional or Global)
- Supports scope BGP community tags
  - Inbound 7224:9100, 7224:9200, 7224:9300
  - Outbound 7224:8100, 7224:8200
- Supports NO_EXPORT BGP community tag

## Public VIF BGP Communities - Inbound

- The prefixes received from customer on Public VIFs are advertised within AWS as per below BGP community tags
  - 7224:9100 - Local AWS Region
  - 7224:9200 - All AWS Regions for a continent
    - North America - wide
    - Asia pacific
    - Europe, the Middle East and Africa
- 7224:9300 - Global (all public AWS Regions)

## Public VIF BGP Communities - Outbound

- AWS applies following BGP community tags on the prefixes advertised based on the origin of the traffic at AWS end
  - 7224:8100 - Routes that originate from the same AWS Region in which the AWS Direct Connect point of presence is associated
  - 7224:8200 - Routes that originate from the same continent with which the AWS Direct Connect point of presence is associated
  - No tag - global (all public AWS Regions)
  - Apart from above Tags, AWS Direct Connect also advertises NO_EXPORT community tag for all routes
  - Customer router can choose which prefixes to accept by filtering the routes based on BGP communities associated with the routes

---

# Private VIF Routing policies and BGP communities

- AWS evaluates the longest prefix match first
- If prefix is same, AWS uses the distance from the local Region to the AWS Direct Connect Location to determine the virtual (or transit) interface for routing.
- This behavior can be modified by assigning a local preference BGP communities (7224:7300 > 7224:7200 > 7224:7100)
- In case of multiple virtual interfaces in a same local region, Set the AS_PATH attribute to prioritize which interface AWS uses to route the traffic.

---

# DX Ling Aggregation Groups (LAG)

- Get increased bandwidth and failover by aggregating multiple Direct Connect connections into a single logical connection
- Uses Link Aggregation Control Protocol (LACP)
- All connections must be dedicated connections and have a port speed of 1 Gbps, 10 Gbps, or 100 Gbps
- Can aggregate up to 4 connections (active-active mode)
- Can use existing connection or add new connections to the LAG
- All connections in the LAG must have the ame bandwidth
- All connections in the LAG must terminate at the same AWS Direct Connect Endpoint
- Supports all virtual interface types - public, private, and transit

## LAG operational status

- All LAG connections operate in Active/Active mode
- LAG supports attribute to define minimum number of operational connections for the LAG to function (Default value = 0)
  - If there are say 4 connections in the LAG and operational connection attribute value = 1 then LAG will be operational even if 3 connections are down
  - If there are say 4 connections in the LAG and operational connection attribute value = 3 then LAG will be non-operational if 2 or more connections are down
  - This attribute prevents over-utilization of active LAG connections in case of failures in other connections

## MACSec with LAGs

- We can enable MACsec for the LAGs
- MACsec uses MACsec secret key which is generated using Connection Key Name (CKN) and Connectivity Association Key (CAK)
- For existing connections with MACsec, the MACsec key is disassociated with the connection and LAG MACsec security key is associated with the connection after connection is added to the LAG
- LAG Macsec key is associated with all the member connections

---

# Resilient DX Connections

## Using DX console for Resiliency

- Use AWS DirectConnect console to choose between Classic or Connection Wizard
- Classic allows you to create a single connection
- Connection Wizard allows you to choose from three types of resiliency options
  - Maximum Resiliency
  - High Resiliency
  - Development and Testing

---

# DX Failure detection with BFD

- BFD - Bidirectional Forwarding Detection
- It's a simple Hello Network Protocol
- Lowers the network failure detection time between the neighboring peers
- BFD control packets are transmitted and received periodically between the BFD peers (Asynchronous mode)
- Neighbors can use dynamic routing protocol or static routes (BGP / OSPF)
- Provides the detection time less than 1 sec
- BFD is not a replacement for the routing protocol

- While using multiple DX connections or using VPN backup, it's important to have fast failover to redundant connections
- By default, BGP waits for three keep-alive messages to fail at a hold-down time of 90 seconds
- AWS enables BFD by default on DX connections. However BFD should be configured on customer side of the router.
- AWS sets the BFD liveness detection interval to 300ms and BFD liveness detection count to 3 which results in failover under 1 second.
- Cisco Router example:
  - bfd interval 300 min_rx 300 multiplier 3

---

# DX Security and Encryption (VPN over DX and MACSec)

## DX network traffic security

- Layer3 VPN over a Direct Connect connection
- Layer2 encryption using MACSec

## Encrypting DX traffic

- DirectConnect traffic is not encrypted by default
- Ideal way to have the traffic encrypted is to have layer 4 (TLS) encryption between hosts communicating over Direct Connect
- If its still required to have a Layer 3 encryption, set up a VPN over Direct Connect connection using Public VIF
- AWS publishes Public IPs which also includes the Public IPs of AWS managed VPN (VGW) and Transit Gateways (TGW)
- Set up IPSec tunnels using Public IPs of VGW or TGW on AWS end and customer router Public IP on the other end

- Public VIF can access TGW public endpoint IP address
- 1.25 Gbps bandwidth per tunnel with ECMP which allows bandwidth aggregation

## MAC Security (MACSec) - Layer 2

- Mac Security (MACSec) is an IEEE 802.1 Layer 2 standard that provides data confidentiality, data integrity, and data origin authenticity
- MACSec provides Layer2 security for Dedicated connection
- MACSec is available for certain Direct Connect partners only. Currently its not supported by all Direct connect partners
- Make sure that you have a device on your end of the connection that supports MACSec
- When you configure your connection, you can specify one of the following values: MACSec - should_encrypt, must_encrypt, or not_encrypt

---

# DX support for MTU and Jumbo Frames

## MTU and Jumbo Frames

- MTU Recap: The size in bytes of the largest permissible packet that can be passed over the connection.
- Until Oct 2018, Direct connect used to support MTU of 1500 bytes
- Now Direct connect supports MTU up to 9001 bytes i.e. Jumbo frames
- Public VIFs don't support Jumbo frames
- Transit VIFs support MTU of 1500 and 8500 bytes
- Private VIFs support MTU of 1500 and 9001 bytes
- For supporting jumbo frames the Direct connect connection or a LAG must be jumbo frame capable
- Jumbo frames apply only to propagated routes from DX (traffic routed through the static routes is sent using 1500 MTU)

---

# DX Billing

- Port hour charges as per the DX connection type and capacity

  - Dedicated Connection
  - Hosted Connection

- Data transfer out charges - per GB depending on the DX location and source AWS region

# Dedicated Connections

| Port Speed | Hourly Rate | Hourly Rate (Japan) |
| ---------- | ----------- | ------------------- |
| 1Gbps      | $0.30/hr    | $0.285/hr           |
| 10Gbps     | $2.25/hr    | $2.142/hr           |
| 100Gbps    | $22.50/hr   | $22.50/hr           |

# Hosted Connections

| Port Speed | Hourly Rate | Hourly Rate (Japan) |
| ---------- | ----------- | ------------------- |
| 50Mbps     | $0.03/hr    | $0.029/hr           |
| 100Mbps    | $0.06/hr    | $0.057/hr           |
| 200Mbps    | $0.12/hr    | $0.114/hr           |
| 300Mbps    | $0.18/hr    | $0.171/hr           |
| 400Mbps    | $0.24/hr    | $0.228/hr           |
| 500Mbps    | $0.30/hr    | $0.285/hr           |
| 1Gbps      | $0.30/hr    | $0.285/hr           |
| 2Gbps      | $0.60/hr    | $0.57/hr            |
| 5Gbps      | $1.50/hr    | $1.425/hr           |
| 10Gbps     | $2.25/hr    | $2.142/hr           |

---

# Port hour charges

- The account that owns the Direct Connect connection i.e the account which requested the connection
- For Dedicated connection Port-hour charges are applied from the moment the connection is available. After ordering the DX connection, even if you don't proceed with connection setup process then it's billed port 90 days of connection requested
- For Hosted connections port-hours are billed once you have accepted the Hosted Connection
- Billing for port-hours stops when the dedicated connection or hosted connection is deleted from your AWS account. Being in a "down" state does not cause the charges to stop.

# Data Transfer Out Charges

- Data transfer out charges are usually allocated to the account that owns the resources sending the traffic
- For Public/Private/Transit VIFs the resource owner (EC2, S3, VPC etc) pays for DTO
- For S3 you can enable billing option of "Requester Pays"

# DTO while using Transit Gateway

- In case the traffic is sent through an AWS Transit Gateway:
  - Data Transfer out is allocated to the owner of the last resource to send traffic before traffic hits the Direct Connect VIF
- If the owner of a Direct Connect connection and the owner of the resource sending traffic are in different AWS Organizations, Data Transfer out costs are allocated to the owner of the resource sending traffic, and charged the internet Data Transfer rate for the specific service they are using (not the Direct Connect DTO rate)

---

# Monitoring

- CloudWatch monitors DX connection and Virtual interfaces

# DX Connection CW Metrics

- ConnectionState: 1 indicates the connection is up and 0 indicates the connection is down
- ConnectionBpsEgress: Bitrate for outbound data from the AWS side to the DX side
- ConnectionBpsIngress: Bitrate for inbound data to the AWS side from the DX side
- ConnectionPpsEgress: Packet rate for outbound data from the AWS side to the DX side
- ConnectionPpsIngress: Packet rate for inbound data to the AWS side from the DX side
- ConnectionErrorCount: The total error count for all types on the AWS device
- ConnectionLightLevelTx: Health of the fiber connection for outbound (egress) from AWS
- ConnectionLightLevelRx: Health of the fiber connection for inbound (ingress) traffic to AWS
- ConnectionEncryptionState: 1 indicates the encryption is up and 0 indicates down (MACSec)

---

# Troubleshooting DX connections

## When no physical connectivity (Layer 1 issue)

1. Cross Connect is complete
2. Ports are correct
3. Routers are powered ON
4. Tx/Rx optical signals are receiving (CW)
5. Contact colocation provider and get report for Tx/Rx signals
6. CW Metrics for Physical error count
7. Contact AWS support

## When VIF is down (Layer 2 issue)

1. IP addresses are correct
2. VLAN IDs are correct
3. Router MAC address in ARP table
4. Try clearing ARP table
5. VLAN trunking is enabled at intermediate devices
6. Contact AWS support

## When BGP is down (Layer 3/4 issue)

1. Both ends have correct BGP ASN #s
2. Peer IPs are correct
3. MD5 Auth key - no spaces or extra chars
4. <= 100 prefixes for Private VIF
5. <= 1000 prefixes for Public VIF
6. Firewall not blocking TCP 179 port
7. BGP logs
8. Contact AWS support

## When not able to reach destination (BGP/Routing issues)

1. Advertising routes for on-premises prefixes
2. For Public VIF, it should be publicly routable prefixes
3. Security group and NACL
4. VPC Route table

---

# AWS Cloud WAN

- A managed wide-area networking (WAN) service to build, manage, and monitor a global network across AWS and on-premises network
- Simple network policies to configure and automate network management
- Provides a central dashboard (through AWS Network Manager)

# AWS Cloud Wan components

- Global Network - Core Networks + Transit Gateway Network
- Core Network
  - Core Network Edge
  - Core Network Policy
- Network Segments
  - Segment actions
- Attachments
  - Attachment policies
- Peering

---

# Core Network Policy

- Network Configurations
  - ASN ranges
    - 64512-65534
    - 4200000000-4294967294
  - Edge locations (Regions)
  - Inside CIDR blocks
    - For Transit Gateway Connect tunnels
    - Can be defined per region
  - ECMP support
  - Regions (Core Network Edge)
- Segments
  - name
  - Edge locations
    - subset of core network edges
  - Isolate attachments (default: False)
    - If true, attachment routes are not shared automatically
    - Routes can be shared through Share segment action or by adding static routes
  - Require attachment acceptance (default: True)
  - Allow or Deny list
    - To allow or deny segments to share routes
  - Segment actions
    - Share segments
    - Create static routes
  - regions
  - require acceptance
  - sharing between segments
  - static routes
- Attachements
  - VPC
  - VPN
  - Connect and Connect Peer
    - Connects to 3rd party virtual appliances hosted inside VPC
    - Supports both GRE and Tunnel-less protocols
    - BGP for Dynamic routing (two BGP sessions for redundancy)
- Attachment policies
  - rules
    - 1-65535
    - Lower number takes priority
    - Rule evaluation stops after first match
  - Require acceptance
    - In effect only when Segment requires acceptance is false
  - Logical conditions: AND or OR
    - AWS account
    - Region
    - TagKey, TagValue
    - Resource ID (e.g. VPC ID/ VPN ID)
  - associate the attachments to the segments
  - require acceptance
  - Association-method
    - Constant or Tag
    - If "Constant" then provide the segment name

```json
{
  "version": "2021.12",
  "coreNetworkConfiguration": {
    "coreNetworkId": "core-1234abcd",
    "description": "WAN core network for global connectivity",
    "asnRanges": ["64512-65534"],
    "edgeLocations": [
      {
        "region": "us-east-1",
        "availabilityZones": ["us-east-1a", "us-east-1b"]
      },
      {
        "region": "us-west-2",
        "availabilityZones": ["us-west-2a", "us-west-2b"]
      }
    ]
  },
  "segments": [
    {
      "segmentName": "Corporate",
      "description": "Segment for corporate VPCs and Direct Connect",
      "segmentActions": [
        {
          "action": "add",
          "segmentAttachmentPolicy": {
            "attachmentType": "VPC",
            "attachmentName": "CorporateVPC",
            "propagation": "enabled",
            "priority": 10
          }
        },
        {
          "action": "add",
          "segmentAttachmentPolicy": {
            "attachmentType": "DIRECT_CONNECT",
            "attachmentName": "CorpDirectConnect",
            "propagation": "enabled",
            "priority": 20
          }
        }
      ]
    },
    {
      "segmentName": "BranchOffice",
      "description": "Segment for branch office connectivity via VPN",
      "segmentActions": [
        {
          "action": "add",
          "segmentAttachmentPolicy": {
            "attachmentType": "VPN",
            "attachmentName": "BranchVPN",
            "propagation": "enabled",
            "priority": 30
          }
        }
      ]
    }
  ],
  "attachments": [
    {
      "attachmentName": "CorporateVPC",
      "attachmentType": "VPC",
      "vpcId": "vpc-0a1b2c3d4e5f6g7h",
      "region": "us-east-1",
      "coreNetworkEdge": {
        "region": "us-east-1",
        "availabilityZone": "us-east-1a"
      }
    },
    {
      "attachmentName": "CorpDirectConnect",
      "attachmentType": "DIRECT_CONNECT",
      "dxConnectionId": "dxcon-abcdef12",
      "region": "us-east-1",
      "coreNetworkEdge": {
        "region": "us-east-1",
        "location": "DirectConnectLocation1"
      }
    },
    {
      "attachmentName": "BranchVPN",
      "attachmentType": "VPN",
      "vpnConnectionId": "vpn-1234abcd",
      "region": "us-west-2",
      "coreNetworkEdge": {
        "region": "us-west-2",
        "availabilityZone": "us-west-2a"
      }
    }
  ]
}
```

# AWS Cloud WAN Summary

- A managed wide-area networking (WAN) service
- AWS Network Manager provides a central dashboard
- Uses simple network policies to centrally configure and automate network management
- Segments to segregate network traffic (like VRF)
- Core network can be shared across AWS accounts using Resource Access Manager (RAM)
- Supports attachments such as VPC, Site-to-Site VPN, Connect (SDWAN), Transit Gateway route table (for connecting existing TGW)
- Connect attachments support GRE and Tunnel-less protocols
- Direct Connect attachment is currently not supported. You can connect DX gateway through the Transit Gateway.

---

# VPC Lattice

- Simplifies service-to-service (application to application) communication
- Enables secure, consistent connectivity without needing complex network peering like VPC peering or Transit Gateways
- Provides Service discovery and dynamic routing capabilities
- Supports Zero Trust architectures with centralized access controls, IAM authentication, and context-specific authorization

# VPC Lattice components

- Service Network
- Service
- Resource
- Service Directory
- Auth Policies

# VPC Lattice - Service

- An independently deployable unit of code that delivers a specific function or task
- A service can run on EC2 instances, ALB, ECS/EKS/Fargate containers, Lambda functions or IP address
- VPC Lattice service has target groups, listeners and rules
- Target groups can have weights and Rules can have priorities and conditions like header match, method match or path match

# VPC Lattice - Resource

- A resource is an entity such as an Amazon RDS database, a cluster of nodes, an instance, an application endpoint, a domain-name target, or an IP address.
- Resource gateway is a point of ingress in which resources reside

# VPC Lattice Auth policies

- Fine-grained authorization policies that can be used to define access to services
- Auth policy can be attached to individual services or to the service network
- Auth type can be None or AWS_IAM
- By default, all requests are implicitly denied when auth is AWS_IAM
- Authorization evaluation
  - Collect all IAM identity-based policies and auth policies
  - Requestor should have IAM allow permissions in their identity-based policy in their AWS account (IAM User, Role)
  - VPC lattice service network auth policy and/or VPC lattice service auth policy should have explicit allow for the principal or None to allow the access

# example auth policies

## Allow access only from within AWS organization

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "vpc-lattice:Invoke",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalOrgID": "<Your AWS Organization ID>"
        }
      }
    }
  ]
}
```

## Allow only GET method access for a particular VPC lattice service to a particular IAM role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "<IAM Role ARN>"
      },
      "Action": "vpc-lattice:Invoke",
      "Resource": "<VPC Lattice Service ARN>",
      "Condition": {
        "StringEquals": {
          "http:method": "GET"
        }
      }
    }
  ]
}
```

---

# VPC Lattice network associations

- Service association
- Resource Configuration association
- VPC association
- VPC endpoint association

## Service association

- Service is discoverable and reachable from VPC Lattice network when you associate a service with the VPC lattice network
- Service can be in the same AWS account or can be shared using RAM from another account

## Resource configuration association

- Resource is discoverable and reachable from VPC Lattice network when you associate a resource configuration with the VPC lattice network
- Resource configuration can be in the same AWS account or can be shared using RAM from another AWS account

## VPC endpoint association

- A VPC endpoint of type service network connects a VPC to a service network.
- Client traffic that comes from outside the VPC over a VPC peering connection, Transit Gateway, Direct Connect, or VPN can use the VPC endpoint to reach lattice services
- When you create a VPC endpoint in a VPC, IPs from the VPC (and not link local IPs) are used to establish connectivity to the service network.

**Notes**
If the VPC in which Service is hosted is not associated with the Service network over VPC association, then that Service can not initiate the request for other Service. It can only respond to the requests.

---

# VPC Lattice traffic flow

## 1. DNS query

- DNS query for VPC lattice service DNS or DNS query to Route53 for custom DNS
- Returns link-local address 169.254.171.x (This address is only accessible from within the VPC)
- VPC lattice service DNS is automatically registered in Route53 private hosted zone (serivcea.xxx.xxx.vpc-lattice-svcs.ap-south-1.on.aws)
- Custom domain name: servicea.example.com

## 2. Check security groups

- Outbound security group for EC2 to allow traffic for VPC lattice prefix list or 0.0.0.0/0
- Inbound security group for VPC lattice VPC association to allow traffic from EC2 instance Private IP

## 3. Check VPC Lattice Auth policy for Service Network and Service

- Validate if traffic is allowed based on service network auth policy and Service auth policy
- If auth policy is disabled (None) then the traffic is allowed by default

## 4. Follow the traffic rules and send traffic to the target group

- Depending on the service listener port/protocol and rules configurations the traffic is routed to corresponding target group
- Check security group for the target to allow the incoming traffic
- If the target is EC2 instance, ALB (EKS/ECS) then inbound security group rule should allow the traffic from link local address (169.254.x.x) or VPC Lattice Managed Prefix list

---

# VPC Lattice features

- Connectivity - Cross VPCs and Cross AWS accounts
- Protocols - HTTP, HTTPS, gRPC for lattice services and TCP/TLS for VPC lattice resources
- Request routing - Path based, Method, Weighted
- Security - IAM authorization, Security groups
- Targets - EC2 instances, Lambda functions, IP address, ALB/NLB
  - EKS services can be registered with AWS Gateway API controller
  - ECS services can be registered using ALB/NLB
- VPC lattice service, resource and network sharing with RAM
- NAT and NAT64 for supporting overlapping CIDR and IPv4 <-> IPv6 traffic

## VPC lattice - Sharing with RAM

- AWS Resource Access Manager (RAM): Share Service networks, services, and resource configurations

## VPC Lattice - Overlapping CIDRs, IPv6

- VPCs can have overlapping CIDRs
- Supports IPv4 and IPv6 traffic
- VPC lattice performs the NAT/NAT64 to allow
  - Overlapping CIDRs
  - IPv4 to IPv6 traffic
  - IPv6 to IPv4 traffic

---

# AWS CloudFront

- Content Delivery Network (CDN)
- Improves read performance, content is cached at the edge
- 225+ Point of Presence globally (215+ Edge Locations and 13 Regional Edge Caches)

## Edge Locations and Regional Edge Caches

### Edge Locations

- Serve content quickly/directly to users
- Cache more popular content

### Regional Edge Caches

- Serve content to Edge locations
- Cache less popular content that might suddenly find popularity
- Larger cache than Edge Location (objects remain longer)
- Improve performance, reduce the load on your origins
- Dynamic content doesn't pass through it (directly to origin)

# CloudFront Components

- Distribution
  - Identified by a domain (e.g., d1111abcdef8.cloudfront.net)
  - You can use this distribution domain name to access the website
  - You can also use Route53 CNAME (non-root) or Alias (root and non-root) which points to distribution's domain name
- Origin
  - Where actual contents resides (S3 Bucket, ALB, HTTP Server, API Gateway, etc.)
- Cache Behavior
  - Cache configurations (e.g., Object Expiration, TTL, Cache invalidations)

# CloudFront - Origins

- S3 Bucket
  - For distributing files
  - For uploading files to S3 (using CloudFront as an ingress)
  - Enhanced security with CloudFront Origin Access Control (OAC)
- MediaStore Container and MediaPackage Endpoint
  - To deliver Video On Demand (VOD) or live streaming video using AWS Media Services
- VPC Origin
  - For applications hosted in VPC private subnets
  - Application Load Balancer / Network Load Balancer / EC2 instance
- Custom Origin (HTTP)
  - API Gateway (for more control... otherwise use API Gateway Edge)
  - S3 Bucket configured as a website (enable Static Website hosting)
  - Any HTTP backend you want

# CloudFront - ALB or EC2 as an origin Using VPC Origins

- Allows you to deliver content from your applications hosted in your VPC private subnets (no need to expose them on the internet)
- Deliver traffic to private:
  - Application Load Balancer (ALB)
  - Network Load Balancer (NLB)
  - EC2 instance

# CloudFront - Multiple Origins

- To route to different kind of origins based on the content type
- Based on path pattern:
  - /images/\*
  - /api/\*
  - /\*

# CloudFront - Origin groups

- To increase high-availability and do failover
- Origin Group: one primary and one secondary origin
- If the primary origin fails, the second one is used

# CloudFront - Origin Custom Headers

- Add custom headers to requests CloudFront sends to your origin
- Can be customized for each origin
- Supports custom and S3 origins
- Use cases:
  - Identify which requests coming from CloudFront or a particular distribution
  - Control access to content (configure origin to respond to requests only when they include a custom header)

# CloudFront HTTP Headers

- Specific HTTp headers added based on the viewer request
- Viewer's Device Type Headers (based on User-Agent)
  - CloudFront-Is-(Android/Desktop/IOS/Mobile/SmartTV/Tablet)-Viewer
- Viewer's Location Headers (based on viewer's IP address)
  - CloudFront-Viewer-(City/Country/Latitude/Longitude, ...)
- Viewer's Request Protocol and HTTP Version
  - CloudFront-Forwarded-Proto and CloudFront-Viewer-Http-Version
- You can include them in the Cache Key (using Legacy Cache Settings or Cache Policies) or receive them at your origin (Using Origin Request Policies)

# CloudFront - Restrict Access to S3 Bucket

- Prevent direct access to files in your S3 bucket (only access through CloudFront)
- First, create an Origin Access Control and associate it with your distribution (previously known as OAI)
- Second, edit your S3 bucket policy so that only OAC has permission

# CloudFront - Restrict Access to Application Load Balancers and Custom Origins

- Prevent direct access to your ALB or Custom Origins (only access through CloudFront)
- First, configure CLoudFront to add a Custom HTTP Header to requests it sends to the ALB
- Second, configure the ALB to only forward requests that contain that Custom HTTP Header
- Keep the custom header name value secret

# CLoudFront and HTTPS

- Viewer Protocol Policy:

  - HTTP and HTTPS
  - Redirect HTTP to HTTPS
  - HTTPS only

- Origin Protocol Policy (HTTP or S3):

  - HTTP Only (default for S3 Static Website)
  - HTTPS Only
  - Or Match Viewer
    (HTTP => HTTP and HTTPS => HTTPS)

- Note:

  - S3 bucket "static websites" don't support HTTPS
  - You must use a valid SSL/TLS certificate between CloudFront and your origin (can't use self-signed certificates)

- Alternate Domain Names
  - Use your own domain name instead of the domain assigned by CloudFront to your distribution
- Example:
  - http://d111111abcdef8.cloudfront.net/cat.jpg
    => http://www.example.com/cat.jpg
- You must have a valid SSL/TLS Certificate from an authorized CA that covers:
  - Your domain name
  - All Alternate Domain Names you added to your distribution
- You can use wildcards in Alternate Domain Names (e.g., \*.example.com)

# CloudFront - SSL Certificates

- Default CloudFront Certificate (\*.cloudfront.net)
  - Used with default CloudFront domain names assigned to your distribution
    - https://d111111abcdef8.cloudfront.net/cat.jpg
- Custom SSL Certificate
  - When using your own domain name - Alternate Domain Names (e.g., https://www.example.com)
  - CloudFront can server HTTPS requests using:
    - Server Name Indication (SNI) - Recommended
      - For all custom domains
      - No additional cost
  - You can use
    - Certificates provided by ACM
    - 3rd party certificates uploaded to ACM or IAM Certificate Store (manually rotate when expired)
  - Certificate must be created/imported in US East (N. Virginia) region

# End-to-End Encryption: CloudFront, ALB, EC2

- CloudFront
  - Origin protocol policy: HTTPS Only
  - Install an SSL / TLS certificate on your custom origin
  - The origin certificate must include either the Origin domain field (configured in CloudFront) or the domain in the "Host" header if it's forwarded to the origin
- Application Load Balancer
  - Use a certificate provided by AWS Certificate Manager or imported into ACM
- EC2 instance
  - ACM is not supported on EC2
  - Can use a third-party SSL certificate (any domain name)
  - Can use a self-signed certificate (ALB does not verify the certificate itself)

# CloudFront - Restrict Content Geographically

- Prevent users in specific locations from accessing your content/distribution
- CloudFront Geo Restriction
  - Restrict access to content based on the country of the viewer
  - You can allow or block specific countries
  - You can also use AWS WAF to restrict access based on IP address or other criteria
- Use Case: Copyright Laws to control access to content

# CloudFront - Customization At The Edge

- Many modern applications execute some form of the logic at the edge
- Edge Function:
  - A code that you write and attach to CloudFront distributions
  - Runs close to your users to minimize latency
  - Doesn't have any cache, only to change requests/responses
  - CloudFront provides two types: CloudFront Functions and Lambda@Edge
- Use cases:
  - Manipulate HTTP requests and responses
  - Implement request filtering before reaching your application
  - User authentication and authorization
  - Generate HTTP responses at the edge
  - A/B Testing
  - Bot mitigation at the edge
- You don't

# CloudFront - CloudFront Functions

- Lightweight functions written in Javascript
- For high-scale, latency-sensitive CDN customizations
- Sub-ms startup times, millions of requests/second
- RuN at Edge Locations
- Process-based isolation
- Used to change Viewer requests and responses:
  - Viewer Request: after CloudFront receives a request from a viewer
  - Viewer Response: before CloudFront forwards the response to the viewer
- Native feature of CloudFront (manage code entirely within CloudFront)

# CloudFront - Lambda@Edge

- Lambda functions written in NodeJS or Python
- Scales to 1000s of requests/second
- Runs at the nearest Regional Edge Cache
- VM-based isolation
- Used to change CloudFront requests and responses:
  - Viewer Request: after CloudFront receives a request from a viewer
  - Origin Request: before CloudFront forwards the request to the origin
  - Origin Response: after CloudFront receives the response from the origin
  - Viewer Response: before CloudFront forwards the response to the viewer
- Author your functions in one AWS Region (us-east-1), then CloudFront replicates to its locations

## **CloudFront Functions vs. Lambda@Edge**

| Feature                                | **CloudFront Functions**                  | **Lambda@Edge**                              |
| -------------------------------------- | ----------------------------------------- | -------------------------------------------- |
| **Runtime Support**                    | JavaScript                                | Node.js, Python                              |
| **Execution Location**                 | Edge Locations                            | Regional Edge Caches                         |
| **CloudFront Triggers**                | - Viewer Request/Response                 | - Viewer Request/Response\                   |
| - Origin Request/Response              |
| **Isolation**                          | Process-based                             | VM-based                                     |
| **Max. Execution Time**                | < 1 ms                                    | - 5 seconds (viewer triggers)\               |
| - 30 seconds (origin triggers)         |
| **Max. Memory**                        | 2 MB                                      | - 128 MB (viewer triggers)\                  |
| - 10 GB (origin triggers)              |
| **Total Package Size**                 | 10 KB                                     | - 1 MB (viewer triggers)\                    |
| - 50 MB (origin triggers)              |
| **Network Access, File System Access** | No                                        | Yes                                          |
| **Access to the Request Body**         | No                                        | Yes                                          |
| **Pricing**                            | Free tier available, 1/6th price of @Edge | No free tier, charged per request & duration |

# CloudFront Functions vs. Lambda@Edge - Use Cases

## CloudFront Functions

- Cache key normalization
  - Transform request attributes (headers, cookies, query strings, URL) to create an optimal Cache Key
- Header manipulation
  - Insert/modify/delete HTTP headers in the request or response
- URL rewrites or redirects
- Request authentication and authorization
  - Create and validate user-generated tokens (e.g., JWT) to allow/deny requests

## Lambda@Edge

- Longer execution time (several ms)
- Adjustable CPU or memory
- Your code depends on a 3rd libraries (e.g., AWS SDK to access other AWS services)
- Network access to use external services for processing
- File system access or access to the body of HTTP requests

# Global users for our application

- You have deployed an application and have global users who want to access it directly.
- They go over the public internet, which can add a lot of latency due to many hops

# Unicast IP vs Anycast IP

- Unicast IP: A single IP address assigned to a single network interface on a server
- Anycast IP: A single IP address assigned to multiple network interfaces (servers), the client is routed to the nearest one

# AWS Global Accelerator

- Leverage the AWS internal network to route to your application
- 2 Anycast IP addresses are created for your application
- The Anycast IP will send traffic directly to Edge Locations

# AWS Global Accelerator

- Works with Elastic IP, EC2 instances, ALB, NLB, public or private
- Consistent Performance
  - Intelligent routing to lowest latency and fast regional failover
  - No issue with client cache (because the IP doesn't change)
  - Internal AWS network
- Health Checks
  - Global Accelerator performs a health check of your applications
  - Helps make your application global (failover less than 1 minute for unhealthy)
  - Great for disaster recovery (thanks to the health checks)
- Security
  - only 2 external IP need to be whitelisted
  - DDoS protection thanks to AWS Shield

# AWS Global Accelerator vs CLoudFront

- They both use the AWS global network and its edge locations around the world
- Both services integrate with AWS Shield for DDoS protection.

- CloudFront

  - Improves performance for both cashable content (such as images and videos)
  - Dynamic content (such as API acceleration and dynamic site delivery)
  - Content is served at the edge

- Global Accelerator
  - Improves performance for TCP and UDP traffic
  - No caching, only routing
  - Content is served from the origin (ALB, EC2, etc.)
  - Proxying packets at the edge to applications running in one or more AWS Regions
  - Good fit for non-HTTP use cases, such as gaming (UDP), IoT (MQTT), or Voice over IP (VoIP)
  - Good for HTTP use cases that require static IP addresses
  - Good for HTTP use cases that required deterministic, fast regional failover

# What is load balancing?

- Load Balancers are servers that forward traffic to multiple servers (e.g., EC2 instances) downstream

# Why use a load balancer?

- Spread load across multiple downstream instances
- Expose a single point of access (DNS) to your application
- Seamlessly handle failures of downstream instances
- Do regular health checks to your instances
- Provide SSL termination (HTTPS) for your websites
- Enforce stickiness with cookies
- High availability across zones
- Separate public traffic from private traffic

# Why use an Elastic Load Balancer?

- An Elastic Load Balancer is a managed load balancer

  - AWS guarantees that it will be working
  - AWS takes care of upgrades, maintenance, high availability
  - AWS provides only a few configuration knobs

- It costs less to setup your own load balancer but it wil be a lot more effort on your end
- It is integrated with many AWS offerings / services
  - EC2, EC2 Auto Scaling Groups, Amazon ECS
  - AWS Certificate Manager (ACM), CloudWatch
  - Route 53, AWS WAF, AWS Global Accelerator

# Health Checks

- Health Checks are crucial for Load Balancers
- They enable the load balancer to know if instances it forwards traffic to are available to reply to requests
- The health check is done on a port and a route (/health is common)
- If the response is not 200 (OK), then the instance is unhealthy

# Types of load balancer on AWS

- AWS has 4 kinds of managed Load Balancers

  - Classic Load Balancer (CLB) - v1 - old generation - 2009

    - HTTP, HTTPS, TCP, SSL (secure TCP)
    - Operates at layer 4 (TCP) and layer 7 (HTTP)
    - EC2 instances registered directly with the CLB (no Target Groups)
    - Health Checks can be HTTP, HTTPS, or TCP
    - Supports EC2 - Classic networks

  - Classic Load Balancer - SSL considerations

    - Enabling HTTPS or SSL on EC2 instances is called "Backend Authentication" (between the CLB and the backend EC2 instances)
    - TCP => TCP passes all the traffic to the EC2 instance (no termination):
      - The only way to do 2-way Mutual SSL Authentication

  - Application Load Balancer (ALB) - v2 - new generation - 2016

    - HTTP, HTTPS, WebSocket
    - Layer 7 (HTTP) load balancer
    - Content-based routing
    - Path-based routing
    - Host-based routing
    - HTTP/2 and gRPC support
    - WebSocket support
    - Load balancing to multiple HTTP applications across machines (Target Groups)
    - Load balancing to multiple applications/ports on the same server (e.g., containers)
    - Support for returning custom HTTP responses
    - Supports redirects (e.g., from HTTP to HTTPS)
    - Target Groups
      - EC2 instances (can be managed by an ASG) - HTTP
      - ECS Tasks (managed by ECS itself) - HTTP
      - Lambda functions (managed by Lambda) - HTTP request is translated into a JSON event
      - IP Addresses - must be private IP addresses (e.g., EC2 instances in peered VPC, on-premises servers over AWS Direct Connect or VPN connection)
    - Supports Weighted Target Groups
      - Example: multiple versions of your application, blue/green deployment
    - Health Checks can be HTTP or HTTPS (WebSocket is not supported)
    - Each subnet must have a min of /27 and 8 free IP addresses
    - Across all subnets, a maximum of 100 IP addresses will be used per ALB
    - Routing to different target groups
      - Path-based routing (e.g., /api/_, /images/_)
      - Host-based routing (e.g., api.example.com, images.example.com)
      - Routing based on Query String parameters, HTTP Headers, Source IP address (e.g., ?id=123, ?name=abc), HTTP method (e.g., GET, POST), HTTP version (e.g., HTTP/1.1, HTTP/2)
    - ALB are a great fit for micro services and container-based applications (e.g., Docker and Amazon ECS)
    - Has a port mapping feature to redirect to a dynamic port in ECS
    - Ability to authenticate users before routing requests to registered targets
      - Amazon Cognito User Pools and Identity Providers
      - Microsoft Active Directory, OIDC, SAML, LDAP, OpenID
      - Social Identity Providers (e.g., Google, Facebook, Amazon)
    - TLS Certificates (multiple listeners and SNI)
      - You can use multiple TLS certificates on the same ALB
      - You can use Server Name Indication (SNI) to route traffic to the right certificate
      - You can use AWS Certificate Manager (ACM) to manage your TLS certificates
    - Processed in order (last is Default Rule)
    - Supported Actions (forward, redirect, fixed-response)
    - Rule Conditions:

      - host-header
      - http-request-method
      - path-pattern
      - source-ip
      - http-header
      - query-string

    - Target Group Weighting
      - Specify weight for each Target Group on a single Rule
      - Example: multiple versions of your app, blue/green deployment
      - Allows you to control the distribution of the traffic to your applications

  - Network Load Balancer (NLB) - v2 - new generation - 2017

    - TCP, TLS (secure TCP), UDP
    - Layer 4 (TCP) load balancer
    - Static IP address support
    - Can handle millions of requests per second
    - Can handle sudden spikes in traffic
    - NLB has one static IP per AZ, and supports assigning Elastic IP (Internet-facing NLB) (helpful for whitelisting specific IP addresses)
    - Load balancing to multiple applications/ports on the same machine (e.g., containers, Amazon ECS)
    - Less latency ~100ms (vs. 400 ms for ALB)
    - Supports WebSocket protocol
    - Network Load Balancers are mostly used:
      - For extreme performance, TCP or UDP traffic
      - With AWS PrivateLink: privately expose an internal service
    - Target Groups
      - EC2 instances - can be managed by an ASG
      - ECS Tasks - (managed by ECS itself)
      - IP addresses
        - must be private IP addresses, TCP listeners only (on-premises servers over AWS DX or VPN)
        - can be inter-region peered VPC
    - You can't register EC2 instances by instance ID if these EC2 instances are in another VPC (even if peered with NLB VPC)

      - Register by IP address instead

    - Health Checks

      - Supported protocols HTTP, HTTPS, and TCP
      - Active Health Check - periodically sends a request to registered targets
      - Passive Health Check - observer how targets respond to connections. Detect unhealthy targets before Active Health Checks (can't be disabled or configured)

    - Client IP Preservation: client IP is forwarded to targets

      - Targets by instance ID / ECS Task: Enabled
      - Targets by IP address TCP and TLS: Disabled by default
      - Targets by IP address UDP and TCP_UDP: Enabled by default

    - When disabled, use Proxy Protocol v2 (will add headers)
    - You must enable an AZ before traffic is sent to that AZ (can be added after NLB creation)
    - You can not remove an AZ after it is enabled

    - You must enable an AZ before traffic is sent to that AZ (can be added after NLB creation)
    - You cannot remove an AZ after is is enabled
    - Cross Zones Load Balancing only works for the availability zones that are enabled on the NLB

    - Resolving Regional NLB DNS name returns the IP addresses for all NLB nodes in all enabled AZs

      - my-nlb-1234567890abcdef.elb.us-east-1.amazonaws.com

    - Zonal DNS Name

      - NLB has DNS names for each of its nodes
      - Use to determine the IP address of each node
      - us-east-1a.my-nlb-1234567890abcdef.elb.amazonaws.com
      - Use to minimize latency and data transfer costs
      - You need to implement app specific logic

    - You can't disable/remove an AZ after you create it
    - You can't modify ENIs created for the NLB in each AZ (view only)
    - You can't change EIPs and private IPv4 addresses attached to the ENIs after you create the load balancer
    - Supports 440,000 simultaneous connections/minute per target

      - If exceeded, you'll receive port allocation errors
      - Solution: add more targets to the target group

    - For internet-facing load balancers, the subnets that you specify must have at least 8 available IP addresses (e.g. min /28). For internal load balancers, this is only required if you let AWS select a private IPv4 address from the subnet.

  - Gateway Load Balancer (GWLB) - v2 - new generation - 2020

    - Transparent network gateway
    - Layer 3 (IP) load balancer
    - Used to deploy, scale, and manage third-party virtual appliances (firewalls, intrusion detection and prevention systems, deep packet inspection systems)
    - Works with AWS Marketplace partners

# Connection Idle Timeout

- Idle Timeout period for ELB's connections (client-ELB connection and ELB-target connection)
  - Connection closed if no data has been sent/received during that period
  - Opened if at least 1 byte is sent before that timeout period elapses
- Supported for CLB, ALB, NLB
- Can be configured for CLB and ALB (default 60 seconds)
- Can't be configured for NLB (350 sec. for TCP, 120 sec. for UDP)
- Usage: avoid timeouts while uploading files

Recommended to enable HTTP keep-alive in the web server settings for your EC2 instances, thus making the ELB reuse the backend connections until the keep-alive timeout expires

## Request Routing Algorithms - Least Outstanding Requests

- Chooses the next instance to receive the request by selecting the instance that has the lowest number of pending/unfinished requests
- Works with Application Load Balancer and Classic Load Balancer (HTTP/HTTPS)

## Request Routing Algorithms - Round Robin

- Equally distributes requests across all registered instances

## Request Routing Algorithms - Flow Hash

- Selects a target based on the protocol, source/destination IP address, source/destination port, and TCP sequence number
- Each TCP/UDP connection is routed to a single target for the life of the connection
- Works with Network Load Balancer and Gateway Load Balancer

# Sticky Sessions (Session Affinity)

- It is possible to implement stickiness so that the same client is always redirected to the same instance behind a load balancer
- This works for classic load balancers and application load balancers and network load balancers
- The "cookie" used for stickiness has an expiration date you control
- Use case: make sure the user doesn't lose his session data
- Enabling stickiness may bring imbalance to the load over the backend EC2 instances

# Sticky Sessions - Cookie Names

- Application-based Cookies
  - Custom cookie
    - Generated by the target
    - Can include any custom attributes required by the application
    - Cookie name must be specified individually for each target group
    - Don't use AWSALB, AWSALBAPP, or AWSALBTG (reserved for use by the ELB)
  - Application cookie
    - Generated by the load balancer
    - AWSALBAPP
  - Duration-based Cookies
    - Cookie generated by the load balancer
    - Cookie name is AWSALB for ALB, AWSELB for CLB

## Cross-Zone Load Balancing

### With Cross Zone Load Balancing

- Each load balancer instance distributes evenly across all registered instances in all AZ

### Without Cross Zone Load Balancing:

- Requests are distributed in the instances of the node of the Elastic Load Balancer

- Application Load Balancer
  - Enabled by default (can be disabled at the Target Group level)
  - No charges for inter AZ data
- Network Load Balancer and Gateway Load Balancer
  - Disabled by default
  - You pay charges ($) for inter AZ data if enabled
- Classic Load Balancer
  - Disabled by default
  - No charges for inter AZ data if enabled

# Elastic Load Balancer - SSL Certificates

- The load balancer uses an X.509 certificate (SSL/TLS server certificate)
- You can manage certificates using ACM (AWS Certificate Manager)
- You can create and upload your own certificates alternatively
- HTTPS listener:
  - You must specify a default certificate
  - You can add an optional list of certs to support multiple domains
  - Clients can use SNI (Server Name Indication) to specify the hostname they reach
  - Ability to specify a Security Policy (for compliance, features, compatibility or security)

## SSL - Server Name Indication (SNI)

- SNI solves the problem of loading multiple SSL certificates onto one web server (to serve multiple websites)
- It's a "newer" protocol, and requires the client to indicate the hostname of the target hostname in the initial SSL handshake
- Only works for ALB and NLB

## Elastic Load Balancers - SSL Certificates

- Classic Load Balancer

  - Supports only one SSL certificate
  - The SSL certificate can have many Subject Alternate Name (SAN), but the SSL certificate must be changed anytime a SAN is added / edited / removed
  - Must use multiple CLB for multiple hostname's with multiple SSL certificates
  - Better to use ALB with Server Name Indication (SNI) if possible

- Application Load Balancer

  - Supports multiple listeners with multiple SSL certificates

- Network Load Balancer
  - Supports multiple listeners with multiple SSL certificates
  - Supports Server Name Indication (SNI)
  - Can use multiple SSL certificates on the same listener
  - Can use multiple SSL certificates on the same NLB
  - Can use multiple SSL certificates on the same target group

### HTTPS/SSL Listener - Security Policy

- A combination of SSL protocols, SSL ciphers, and server order preference option supported during SSL negotiations
- Predefined Security Policies (e.g., ELBSecurityPolicy-2016-08)
- For ALB and NLB
  - Frontend connections, you can use a predefined Security Policy
  - Backend connections, ELBSecurityPolicy-2016-08 Security Policy is always used
- Use ELBSecurityPolicy-TLS policies
  - To meet compliance and security standards that require certain TLS protocol version
  - To support older versions of SSL/TLS (legacy clients)
- Use ELBSecurityPolicy-FS policies, if you require Forward Secrecy
  - Provides additional safeguards against the eavesdropping of encrypted data
  - Using a unique random session key
- Connection Draining

  - Feature naming

    - Connection Draining - for CLB
    - Deregistration Delay - for ALB and NLB

  - Time to complete "in-flight requests" while the instance is de-registering or unhealthy
  - Stops sending new requests to the EC2 instance which is de-registering
  - Between 1 to 3600 seconds (default 300 seconds)

- Can be disabled (set value to 0)
- Set to a low value if your requests are short

### X-Forwarded Headers (HTTP)

- Non-standard HTTP headers that have an X-Forwarded prefix
- Used by ELB to forward client information to the targets (e.g, client IP address)
- You can use to log client requests on your server
- Supported by Classic Load Balancer (HTTP/HTTPS) and Application Load Balancer
- X-Forwarded-For
  - Contains the IP address of the client
  - May contain comma-separated list of multiple IP addresses, such as proxies (left-most is the client IP address)
- X-Forwarded-Proto
  - The protocol used between client and the ELB (HTTP or HTTPS)

### Proxy Protocol

- An internet protocol used to carry information from the source (requesting the connection) to the destination (where connection was requested)
- If the LB terminates the connection, the source IP address of the client cannot be preserved
- We use the Proxy Protocol to pass the source/destination IP address and port numbers
- The load balancer prepends a proxy protocol header to the TCP data
- Available for both Classic Load Balancer (TCP/SSL) and Network Load Balancer (TCP/UDP)
- CLB uses Proxy Protocol v1 and NLB uses Proxy Protocol v2
- For Network Load Balancer
  - Target with Instance ID and ECS Tasks: the source IP of the client is preserved
  - Target with IP address:
    - TCP and TLS: the source IP of the client isn't preserved, enable Proxy Protocol
    - UDP and TCP_UDP: the source IP of the client is preserved, Proxy Protocol is enabled by default
- Load balancer should not be behind proxy server; otherwise backend may receive duplicate configuration resulting in error
- Proxy protocol is not needed when using an Application Load Balancer, as ALB already inserts HTTP X-Forwarded-For headers

#### Application Load Balancer and gRPC

- gRPC is a popular choice for microservices interactions using HTTP/2
- The Application Load Balancer supports gRPC
  - Supports gRPC health checks from target group
  - Content based routing feature to route to the appropriate service
  - Supports all kind of gRPC communication (including bidirectional streaming)
  - Listener protocol is HTTPS
- Note: gRPC would work with NLB but you wouldn't have any "HTTP-specific" features (e.g., content-based routing, health checks, etc.)

# Route53 - DNS

- Domain Registrar: Amazon Route 53, GoDaddy, Namecheap, etc.
- DNS Records

  - A record: IPv4 address
  - AAAA record: IPv6 address
  - CNAME record: Canonical Name (alias)
  - MX record: Mail Exchange (email)
  - TXT record: Text (SPF, DKIM, DMARC)
  - SRV record: Service (SRV records are used to identify the location of services)
  - PTR record: Pointer (reverse DNS lookup)
  - NS record: Name Server (delegation)
  - SOA record: Start of Authority (zone information)
  - DS record: Delegation Signer (DNSSEC)
  - NAPTR record: Naming Authority Pointer (used for SIP, ENUM, and other applications)
  - DNSKEY record: DNS Key (DNSSEC)
  - RRSIG record: DNS Signature (DNSSEC)
  - CAA record: Certification Authority Authorization (DNSSEC)
  - TLSA record: TLS Authentication (DNSSEC)
  - SSHFP record: SSH Fingerprint (DNSSEC)
  - URI record: Uniform Resource Identifier (DNSSEC)
  - DNAME record: Delegation Name (DNSSEC)
  - NSEC record: Next Secure (DNSSEC)
  - DKIM record: DomainKeys Identified Mail (email)
  - DMARC record: Domain-based Message Authentication, Reporting & Conformance (email)
  - SPF record: Sender Policy Framework (email)

- Zone File: A file that contains DNS records for a domain
- Name Server: A server that stores DNS records for a domain, resolves DNS queries, and returns the IP address of the requested domain (Authoritative vs. Non-authoratative DNS server)
- Top Level Domain (TLD): The last part of a domain name (e.g., .com, .org, .net, .edu, .gov, .mil, .int)
- Second Level Domain (SLD): The part of a domain name that comes before the TLD (e.g., example.com, example.org, example.net)
- Subdomain: A domain that is part of a larger domain (e.g., www.example.com, mail.example.com, blog.example.com)
- Fully Qualified Domain Name (FQDN): A domain name that includes the hostname and the domain name (e.g., www.example.com, mail.example.com)
- Reverse DNS Lookup: A process of resolving an IP address to a domain name
- Forward DNS Lookup: A process of resolving a domain name to an IP address
- DNS Caching: A process of storing DNS records in memory to speed up DNS resolution
- DNS TTL (Time to Live): The amount of time a DNS record is cached before it expires and needs to be refreshed
- DNS Propagation: The time it takes for DNS changes to be reflected across the internet
- DNSSEC (Domain Name System Security Extensions): A set of security extensions to DNS that provide data integrity and authenticity
- DNS Failover: A process of redirecting traffic to a backup site in case the primary site is unavailable
- DNS Latency: The time it takes for a DNS query to be resolved
- DNS Query: A request for information from a DNS server
- DNS Response: A reply from a DNS server containing the requested information
- DNS Resolver: A server that resolves DNS queries and returns the IP address of the requested domain
- DNS Root Server: A server that stores the root zone file and provides information about TLD name servers
- DNS Root Zone: The top-level zone in the DNS hierarchy that contains information about TLD name servers
- DNS Root Hints: A list of IP addresses of root name servers used by DNS resolvers to start the DNS resolution process
- DNS Root Zone File: A file that contains information about TLD name servers and their IP addresses
- DNS Root Zone Management: A process of managing the root zone file and TLD name servers

## Amazon Route 53

- A highly available, scalable, fully managed and Authoritative DNS service
  - Authoritative DNS: A DNS server that has the authority to answer queries for a specific domain name (can update DNS records)
- Route 53 is also a Domain Registrar
- Ability to check the health of your resources (e.g., EC2 instances, ELB, S3 buckets, etc.)
- THe only AWS service which provides 100% availability SLA

### Route 53 - Records

- How you want to route traffic for a domain
- Each record contains:
  - Domain/subdomain Name - e.g., www.example.com
  - Record Type - e.g., A record, AAAA record, CNAME record, etc.
  - Value - e.g., IP address, domain name, etc.
  - Routing Policy - e.g., Simple, Weighted, Latency-based, Failover, Geolocation, Geoproximity, Multi-Value Answer
  - TTL - amount of time the record cached at DNS Resolvers
- Route 53 supports the following DNS record types:
  - (must know) A / AAAA / CNAME / NS
  - (advanced) CAA / DS / MX / NAPTR / PTR / SOA / TXT / SPF / SRV

### Route 53 - Records TTL (Time to Live)

- High TTL - e.g., 24 hr
  - Less traffic on Route 53
  - Possibly outdated records
- Low TTL - e.g., 60 sec
  - More traffic on Route 53 ($$)
  - Records are outdated for less time
  - Easy to change records
- Except for Alias records, TTL is mandatory for each DNS record

#### CNAME vs Alias

- AWS Resources (Load Balancer, CloudFront...) expose an AWS hostname:

  - lbl-1234.us-east-2.elb.amazonaws.com and you want myapp.mydomain.com

- CNAME:
  - Points a hostname to any other hostname. (app.mydomain.com => blabla.anything.com)
  - ONLY FOR NON ROOT DOMAIN (aka. something.mydomain.com)
- Alias:
  - Points a hostname to an AWS Resource (app.mydomain.com => blabla.amazonaws.com)
  - Works for ROOT DOMAIN and NON ROOT DOMIN (aka mydomain.com)
  - Free of charge
  - Native health check

##### Route 53 - Alias Records

- Maps a hostname to an AWS resource (e.g., ELB, CloudFront, S3 bucket, etc.)
- An extension to DNS functionality
- Automatically recognizes changes in the resource's IP addresses
- Unlike CNAME, it can be used for the top node of a DNS namespace (Zone Apex), e.g., example.com
- Alias Record is always of type A/AAAA for AWS resources (IPv4 / IPv6)
- You can't set the TTL

##### Route 53 - Alias Records Targets

- Elastic Load Balancers
- CloudFront distributions
- API Gateway
- Elastic Beanstalk environments
- S3 websites
- VPC interface endpoints
- Global Accelerator
- Route 53 record in the same hosted zone
- You CAN NOT set an ALIAS record for an EC2 DNS name

##### Route 53 - Routing Policies

- Define how Route 53 responds to DNS queries
- Don't get confused by the word "Routing"
  - It's not the same as Load balancer routing which routes the traffic
  - DNS does not route any traffic, it only responds to the DNS queries
- Route 53 Supports the following Routing Policies
  - Simple Routing Policy
  - Weighted Routing Policy
  - Latency-based Routing Policy
  - Failover Routing Policy
  - Geolocation Routing Policy
  - Geoproximity Routing Policy (Traffic Flow only)
  - Multi-Value Answer Routing Policy

###### Routing Policies - Simple

- Typically, route traffic to a single resource
- Can specify multiple values in the same record
- If multiple values are returned, a random one is chosen by the client
- When Alias enabled, specify only one AWS resource
- Can't be associated with Health Checks

##### Routing Policies - Weighted

- Control the % of the requests that go to each specific resource
- Assign each record a relative weight:
  - traffic % = weight / sum of all weights
  - weights don't need to sum to 100
- DNS records must have the same name and type
- Can be associated with Health Checks
- Use cases: load balancing between regions, testing new application versions...
- Assign a weight of 0 to a record to stop sending traffic to a resource
- If all records have a weight of 0, then all records will be returned equally

##### Routing Policies - Latency-based

- Redirect to the resources that has the least latency close to us
- Super helpful when latency for users is a priority
- Latency is based on traffic between users and AWS regions
- Germany users may be directed to the US (if that's the lowest latency)
- Can be associated with Health Checks (has a failover capability)

##### Route 53 - Health Checks

- HTTP Health Checks are only for public resources
- Health Check => Automated DNS failover
  1. Health checks that monitor an endpoint (application, server, other AWS resource)
  2. Health checks that monitor other health checks (Calculated Health Checks)
  3. Health checks that monitor CloudWatch Alarms (full control) - e.g., thorttles of DynamoDB, alarms on RDS,
     custom metrics, ...(helpful for private resources)
- Health Checks are integrated with CW metrics

##### Health Checks - Monitor an Endpoint

- About 15 global health checkers will check the endpoint health
  - Healthy/Unhealthy Threshold - 3 (default)
  - Interval - 30 sec (default, can set to 10 sec - higher cost)
  - Supported protocol: HTTP, HTTPS and TCP
  - If > 18% of health checkers report the endpoint is healthy, Route 53 considers it Healthy. Otherwise, it's unhealthy
  - Ability to choose which locations you want Route 53 to use
- Health Checks pass only when the endpoint responds with the 2xx and 3xx status codes
- Health Checks can be setup to pass / fail based on the text in the first 5120 bytes of the response
- Configure your router/firewall to allow incoming Requests from Route 53 Health Checkers

##### Route 53 - Calculated Health Checks

- Combine the results of multiple Health Checks into a single Health Check
- You can use OR, AND, or NOT
- Can monitor up to 256 Child Health Checks
- Specify how many of the health checks need to pass to make the parent pass
- Usage: perform maintenance to your website without causing all health checks to fail

##### Health Checks - Private Hosted Zones

- Route 53 health checkers are outside the VPC
- They can't access private endpoints (priavte VPC or on-premises resource)
- You can create a CloudWatch Metric and associate a CloudWatch Alarms, then create a Health Check that checks the alarm itself.

# Routing Policies - Failover (Active-Passive)

DNS Records / health checks

# Routing Policies - Geolocation

- Different from Latency-based
- This routing is based on user location
- Specify location by Continent, Country or by US State (if there's overlapping, most precise location selected)
- Should create a "Default" record (in case there's no match on location)
- Use cases: website localization, restrict content distribution, compliance with laws, load balancing
- Can be associated with Health Checks

# Geoproximity Routing Policy

- Route traffic to your resources based on the geographic location of users and resources
- Ability to shift more traffic to resrouces based on the defined bias
- To change the size of the geographic region, specify bias values:
  - To expand (1 to 99) - more traffic to the resource
  - To shrink (-1 to -99) - less traffic to the resource
- Resources can be:
  - AWS resources (specify AWS region)
  - Non-AWS resources (specify Latitude and Longitude)
- You must use Route 53 Traffic Flow (advanced) to use this feature

# Route 53 - Traffic Flow

- Simplify the process of creating and maintaining records in large and complex configurations
- Visual editor to manage complex routing decision trees
- Configurations can be saved as Traffic Flow Policy
  - Can be applied to different Route 53 Hosted Zones (different domain names)
  - Supports versioning

# Routing Policies - IP based Routing

- Routing is based on client's IP addresses
- You provide a list of CIDRs for your clients and the corresponding endpoints/locations (user-IP-to-endpoint mapping)
- Use cases: Optimize performance, reduce network costs...
- Example: route end users from a particular ISP to a specific endpoint

# Routing Policies - Multi Value

- Use when routing traffic to multiple resources
- Route 53 return multiple values/resources
- Can be associated with Health Checks (return only values for healthy resources)
- Up to 8 healthy records are returned for each Multi-Value query
- Multi-Value is not a substitute for having an ELB

# Domain Registar vs DNS Service

- You buy or register your domain name with a Domain Registrar typically by paying annual charges (e.g., GoDaddy, Namecheap, etc.)
- The Domain Registrar usually provides you with a DNS service to manage your DNS records
- But you can use another DNS service to manage your DNS records
- Example: purchase the domain from GoDaddy and use Route 53 to manage your DNS records

# Making Route 53 the DNS service for a domain that is in use (users are accessing it)

1. Get the current DNS configuration (records to duplicate)
2. Create a public hosted zone in Route 53
3. Create all records in the newly created zone
4. Lower TTL settings of NS record to 15 minutes (to roll back in case)
5. Wait two days to ensure the new NS record TTL has propagated
6. Update the NS record to use the Route 53 name servers
7. Monitor traffic for the domain
8. Change NS record TTL on Route 53 to a higher value (two days)
9. Transfer domain registration to Amazon Route 53 (optional)

# Route 53 Scenarios - EC2 Instance

- Your domain points to an EC2 instances with public or Elastic IP
- Example:
  - exmaple.com => 54.55.56.57 (A)

# Route 53 Scnarios - EC2 DNS name

- Example:
  - app.example.com => ec2-54-55-56-57.compute.amazonaws.com (CNAME)

# Route 53 Scenarios - Application Load Balancer

- You domain points to AWS provided ALB DNS name
- Example:
  - example.com => my-load-balancer-1234567890abcdef.elb.amazonaws.com (Alias)
  - lb.example.com => my-load-balancer-1234567890abcdef.elb.amazonaws.com (Alias or CNAME)

# Route 53 Scenarios - CloudFront Distribution

- Example:
  - example.com => d1234567890abcdef.cloudfront.net (Alias)
  - cdn.example.com => d1234567890abcdef.cloudfront.net (Alias or CNAME)

# Route 53 Scenarios - API Gateway

- Points to API Gateway Regional/Edge Optimized DNS name
- Example:
  - example.com => b1234567890abcdef.execute-api.us-east-1.amazonaws.com (Alias)

# Route 53 Scenarios - RDS DB Instance

- Your domain name points to RDS DB instance DNS name
- You must create a CNAME record (other record types are not supported)
- Example:
  - db.example.com => mydbinstance.123456789012.us-east-1.rds.amazonaws.com (CNAME)

# Route 53 Scenarios - S3 Bucket

- Your domain name points to S3 website endpoint
- You must create an Alias record for S3 endpoints
- Bucket name must be the same as domain name
- Example:
  - example.com => example.com.s3-website-us-east-1.amazonaws.com (Alias)

# Route 53 Scenarios - VPC Interface Endpoint

- Your domain name points to a VPC Interface Endpoint (AWS PrivateLink)

# Route 53 - Hosted Zones

- Route 53 automatically creates NS and SOA records
- For public/private and private Hosted Zones that have overlapping namespaces, Route 53 Resolvers routes traffic to the most specific match

## Route 53 - Routing Traffic For Subdomains

- Create a Hosted Zone for the Subdomain
- Known as, either:
  - Delegation Responsibility for a Subdomain to a Hosted Zone
  - Delegating a Subdomain to Another Name Servers
- Use cases:
  - different subdomains managed by different teams
  - Restrict access using IAM Permissions (you can't use IAM to control access to Route 53 records)

## Route 53 - DNS Security Extensions (DNSSEC)

- A protocol for scuring DNS traffic, verifies DNS data integrity and origin
- Works only with Public Hosted Zones
- Route 53 supports both DNSSEC for Domain Registration and Signing
- DNSSEC Signing
  - Validate that a DNS response came from Route 53 and has not been tampered with
  - Route 53 cryptographically signs each record in the Hosted Zone
  - Two Keys:
    - Managed by us: Key-Signing Key (KSK) - based on an asymmetric CMK in AWS KMS
    - Managed by AWS: Zone-signing Key (ZSK)
- When enabled, Route 53 enforces a TTL of one week for all records in the Hosted Zone (records that have TTL less than one week are not affected)

## Route 53 - Enable DNSSEC on a hosted zone

1. Prepare for DNSSEC signing

- Monitor zone availability (through customer feedback)
- Lower TTL for records (recommended 1 hour)
- Lower SOA minimum for 5 minutes

2. Enable DNSSEC signing and create a KSK

- Enable DNSSEC in Route 53 for your hosted zone (Console or CLI)
- Make Route 53 create a KSK in the console and link it to a Customer managed CMK

3. Establish chain of trust

- Create a chain of trust between the hosted zone and the parent hosted zone
- Creating a Delegation Signer (DS) record in the parent zone
- It contains a hash of the public key used to sign DNS records
- Your registrar can be Route 53 or a 3rd party registrar

4. (good to have) Monitor for errors using CloudWatch Alarms

- Create CloudWatch alarms for DNSSECInternalFailure and DNSSECKevSigningKeysNeedingAction

# Route 53 - Hybrid DNS

- By default, Route 53 Resolver automatically answers DNS queries for:

  - Local domain names for EC2 instances
  - Records in Private Hosted Zones

- Hybrid DNS
  - Resolving DNS queries between VPC (Route 53 Resolver) and your networks (other DNS Resolvers)
- Networks can be:
  - VPC itself / Peered VPC
  - On-premises Network (connected through Direct Connect or VPN)

# Route 53 - Resolver Endpoints

- Inbound Endpoint
  - DNS Resolvers on your network can forward DNS queries to Route 53 Resolver
  - Allows your DNS Resolvers to resolve domain names for AWS resources (e.g., EC2 instances) and records in Route 53 Private Hosted Zones
- Outbound Endpoint
  - Route 53 Resolver conditionally forwards DNS queries to your DNS Resolvers
  - Use Resolver Rules to forward DNS queries to your DNS Resolvers
- Associated with one or more VPCs in the same AWS Region
- Create in two AZs for high availability
- Each Endpoint supports 10,000 queries per second per IP address

# Route 53 - Resolver Rules

- Control which DNS queries are forwarded to DNS Resolvers on your network
- Conditional Forwarding Rules (Forwarding Rules)
  - Forward DNS queries for a spcified domain and all its subdomains to target IP addresses
- System Rules
  - Selectively overriding the behavior defined in Forwarding Rules (e.g, don't forward DNS queries for a subdomain acme.exmaple.com)
- Auto-defined System Rules
  - Defines how DNS queries for selected domains are resolved (e.g., AWS internal domain names, Private Hosted Zones)
- If multiple rules matched, Route 53 Resolver chooses the most specific match
- Resolver Rules can be shared across accounts using AWS RAM
  - Manage them centrally in one account
  - Send DNS queries from multiple VPC to the target IP defined in the rule
