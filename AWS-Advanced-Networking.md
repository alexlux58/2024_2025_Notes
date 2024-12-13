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
