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
