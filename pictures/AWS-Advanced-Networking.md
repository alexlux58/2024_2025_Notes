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
