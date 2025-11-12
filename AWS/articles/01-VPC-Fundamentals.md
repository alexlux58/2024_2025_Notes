---
title: "AWS VPC Fundamentals: Building Your Network Foundation in the Cloud"
subtitle: "A Comprehensive Guide to Virtual Private Clouds, Subnets, and Network Architecture"
author: "Alex Lux"
date: "2023-11-24"
image: "/images/vpc-fundamentals.jpg"
tags: ["AWS", "VPC", "Networking", "Cloud Computing", "Subnets"]
---

<a href="https://poetic-maamoul-8ea5fe.netlify.app/" target="_blank">Use this link for review flash cards</a>

<br>

<br>

# AWS VPC Fundamentals: Building Your Network Foundation in the Cloud

A Virtual Private Cloud (VPC) is the foundational networking component that enables you to launch AWS resources in a logically isolated virtual network that you define. Understanding VPC fundamentals is essential for anyone working with AWS infrastructure. In this comprehensive guide, we'll explore the core concepts of VPCs, subnets, IP addressing, and how to build your network architecture from the ground up.

## Understanding VPCs

A VPC is your own private network within AWS, where you have complete control over your virtual networking environment. This includes selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.

### Key VPC Concepts

**CIDR Blocks**: When you create a VPC, you must specify a range of IPv4 addresses for the VPC in the form of a Classless Inter-Domain Routing (CIDR) block. For example, `10.0.0.0/16` provides 65,536 IP addresses.

**Isolation**: Each VPC is isolated from other VPCs by default. Resources in one VPC cannot communicate with resources in another VPC unless you explicitly configure connectivity.

## Subnets: Dividing Your Network

Subnets are logical subdivisions of your VPC's IP address range. They allow you to organize your network and control how traffic flows to and from your resources.

### Reserved IP Addresses

AWS reserves 5 IP addresses in each subnet that cannot be assigned to instances:

- **First IP (x.x.x.0)**: Network address
- **Second IP (x.x.x.1)**: Reserved by AWS for the VPC router
- **Third IP (x.x.x.2)**: Reserved by AWS for mapping to Amazon-provided DNS
- **Fourth IP (x.x.x.3)**: Reserved by AWS for future use
- **Last IP (x.x.x.255)**: Network broadcast address (AWS does not support broadcast in a VPC)

For example, in a subnet with CIDR `10.0.0.0/24`:
- `10.0.0.0` - Network address
- `10.0.0.1` - VPC router
- `10.0.0.2` - Amazon DNS
- `10.0.0.3` - Reserved for future use
- `10.0.0.255` - Broadcast address

### Public vs Private vs Elastic IP Addresses

Understanding the different types of IP addresses is crucial for designing your network:

| Feature                   | Private                                           | Public                                                  | Elastic                                                      |
| ------------------------- | ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| Communication             | Communication within VPC                          | Can communicate over the internet                       | Can communicate over the internet                            |
| Address range             | Gets IP address from subnet range. Ex: 10.200.0.1 | Gets IP address from Amazon Pool within region          | Gets IP address from Amazon Pool within region               |
| Instance restart behavior | Once assigned cannot be changed                   | Changes over instance restart                           | Do not change over instance restart. Can be removed anytime. |
| Releasing IP              | Released when instance is terminated              | Released to POOL when instance is stopped or terminated | Not released. Remains in your account. (Billed)              |
| DNS resolution            | Resolves to private IP                            | Resolves to public IP                                   | Resolves to public IP                                        |
| Security                  | Private subnet is more secure                     | Public subnet is less secure                            | Elastic is less secure                                       |
| Use case                  | Internal communication                            | Web servers, Load balancers, etc.                       | Web servers, Load balancers, etc.                            |

## Default VPC in AWS

AWS automatically creates a default VPC in each region to simplify getting started. Understanding the default VPC helps you appreciate what AWS provides out of the box.

### Default VPC Characteristics

- **CIDR Block**: `172.31.0.0/16`
- **Subnets**: Created in every Availability Zone (AZ) with a CIDR block of `/20`
- **Internet Gateway**: Automatically created and attached
- **Route Table**: Includes routes for:
  - Local traffic within the VPC (`172.31.0.0/16`)
  - Internet traffic through the Internet Gateway (`0.0.0.0/0`)

### Default VPC Architecture

The default VPC provides:
- Subnets in each Availability Zone with CIDR ranges like:
  - `172.31.0.0/20` (AZ1)
  - `172.31.16.0/20` (AZ2)
  - `172.31.32.0/20` (AZ3)
- All subnets are public due to the route table configuration
- Immediate internet connectivity without additional configuration

**Key Note**: All subnets in the default VPC are public, making it easy to get started but requiring careful consideration for production workloads.

## Creating a Custom VPC

While the default VPC is convenient, creating a custom VPC gives you full control over your network architecture. Here's a step-by-step approach:

### Step 1: Create the VPC

1. Navigate to **VPC Service** → **Your VPCs** → **Create VPC**
2. Specify:
   - **Name**: Your VPC name (e.g., MyVPC)
   - **CIDR**: Your IP address range (e.g., `10.100.0.0/16`)
3. Click **Create**

### Step 2: Create an Internet Gateway

1. Navigate to **Internet Gateways** → **Create Internet Gateway**
2. After creation, attach it to your VPC:
   - Select the Internet Gateway → **Actions** → **Attach to VPC** → Select your VPC

### Step 3: Create Public Subnets

1. Navigate to **Subnets** → **Create Subnet**
2. Specify:
   - **Name**: MyVPC-Public
   - **VPC**: Your VPC
   - **AZ**: Select an Availability Zone
   - **CIDR**: Subnet range (e.g., `10.100.0.0/24`)
3. Enable auto-assign public IP:
   - Select Subnet → **Actions** → **Modify Auto-Assign Public IP** → Enable

### Step 4: Create Route Table for Public Subnet

1. Navigate to **Route Tables** → **Create Route Table**
2. Specify:
   - **Name**: MyVPC-Public
   - **VPC**: Your VPC
3. Add internet route:
   - Select Route Table → **Routes** → **Edit**
   - Add route:
     - **Destination**: `0.0.0.0/0`
     - **Target**: Internet Gateway (igw-xxx)
   - Save

### Step 5: Create Private Subnets

1. Create subnet in a different AZ:
   - **Name**: MyVPC-Private
   - **VPC**: Your VPC
   - **AZ**: Different AZ (e.g., ap-south-1b)
   - **CIDR**: `10.100.1.0/24`

2. Create private route table:
   - **Name**: MyVPC-Private
   - **VPC**: Your VPC

3. Associate route table with private subnet:
   - Select Route Table → **Subnet Associations** → **Edit** → Check private subnet → Save

## VPC Secondary CIDR Blocks

As your network grows, you may need additional IP address space. AWS allows you to add secondary CIDR blocks to your VPC.

### Key Rules for Secondary CIDR Blocks

1. You can add up to 4 secondary CIDR blocks to a VPC
2. CIDR block must not overlap with existing CIDR or peered VPC CIDR
3. If primary CIDR is from RFC1918, you cannot add secondary CIDR from other RFC1918 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
4. CIDR block must not be same or larger than the CIDR range of routes in any of the VPC Route tables
5. You can associate secondary CIDR blocks with subnets

### Use Cases for Secondary CIDRs

- Expanding IP address space without recreating the VPC
- Migrating networks with overlapping CIDRs
- Supporting multiple network segments within a single VPC

## Best Practices for VPC Design

### Network Planning

1. **Plan your IP addressing**: Use CIDR notation that allows for growth
2. **Consider Availability Zones**: Distribute subnets across multiple AZs for high availability
3. **Separate public and private**: Use public subnets for internet-facing resources and private subnets for internal resources
4. **Use appropriate subnet sizes**: Balance between having enough IPs and not wasting address space

### Security Considerations

1. **Minimize public subnets**: Only place resources that need direct internet access in public subnets
2. **Use private subnets**: Keep databases, application servers, and other sensitive resources in private subnets
3. **Implement security groups**: Use security groups as your primary firewall mechanism
4. **Network ACLs**: Use NACLs for subnet-level security when needed

## Conclusion

Understanding VPC fundamentals is the first step in building robust, secure, and scalable network architectures in AWS. From understanding how subnets work and how IP addresses are reserved, to creating custom VPCs with proper public and private subnet configurations, these concepts form the foundation of AWS networking.

The default VPC provides a quick start, but custom VPCs give you the control and flexibility needed for production environments. By carefully planning your CIDR blocks, subnet design, and route tables, you can create network architectures that support your application requirements while maintaining security and scalability.

In future articles, we'll explore advanced topics like NAT gateways, VPC peering, and Transit Gateways to extend your network connectivity beyond a single VPC. Stay tuned for more insights into AWS Advanced Networking!

