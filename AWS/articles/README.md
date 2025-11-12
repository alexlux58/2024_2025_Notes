# AWS Advanced Networking Articles

This directory contains articles created from the AWS Advanced Networking notes, broken down into manageable, focused topics suitable for blog posts or documentation.

## Created Articles

### 1. VPC Fundamentals
**File**: `01-VPC-Fundamentals.md`
**Topics Covered**:
- Understanding VPCs and CIDR blocks
- Subnets and reserved IP addresses
- Public vs Private vs Elastic IP addresses
- Default VPC in AWS
- Creating custom VPCs with public and private subnets
- VPC Secondary CIDR Blocks
- Best practices for VPC design

### 2. NAT Gateway and NAT Instances
**File**: `02-NAT-Gateway-and-NAT-Instances.md`
**Topics Covered**:
- Why NAT is needed for private subnets
- NAT Gateway: AWS managed solution
- NAT Instance: Self-managed solution
- Detailed comparison table
- High availability considerations
- Cost considerations
- Best practices for each approach

### 3. Elastic Network Interfaces and BYOIP
**File**: `03-Elastic-Network-Interfaces-and-BYOIP.md`
**Topics Covered**:
- Understanding ENIs and their attributes
- ENI use cases (requester managed, dual-homed instances, IP preservation)
- Bring Your Own IP (BYOIP) prerequisites and process
- Use cases for BYOIP
- Best practices for ENI and BYOIP

### 4. VPC DNS and DHCP
**File**: `04-VPC-DNS-and-DHCP.md`
**Topics Covered**:
- Amazon Route 53 Resolver
- Route 53 Private Hosted Zones
- EC2 DNS names (internal and external)
- DHCP Option Sets
- VPC DNS attributes (enableDnsSupport, enableDnsHostnames)
- Best practices and troubleshooting

### 5. Network Performance Optimization
**File**: `05-Network-Performance-Optimization.md`
**Topics Covered**:
- Network performance fundamentals
- MTU and Jumbo Frames
- Enhanced Networking (SR-IOV, PCI Passthrough)
- Elastic Network Adapter (ENA) vs Intel 82599 VF
- Elastic Fabric Adapter (EFA) for HPC
- Bandwidth limits and network credits
- Placement groups and EBS optimization
- Best practices for performance

### 6. VPC Endpoints
**File**: `06-VPC-Endpoints.md`
**Topics Covered**:
- Gateway Endpoints (S3 and DynamoDB)
- Interface Endpoints (most AWS services)
- VPC Endpoint security and policies
- Prefix lists
- DNS configuration for endpoints
- Best practices and use cases

## Remaining Topics from Notes

The following topics from your AWS Advanced Networking notes could be covered in additional articles:

### High Priority Topics

1. **VPC Monitoring and Analysis**
   - VPC Flow Logs
   - VPC Traffic Mirroring
   - VPC Reachability Analyzer
   - VPC Network Access Analyzer

2. **VPC Peering**
   - VPC Peering connections
   - Limitations and considerations
   - Use cases and best practices

3. **AWS PrivateLink**
   - VPC Endpoint Services
   - PrivateLink vs VPC Peering
   - Use cases and architecture

4. **Transit Gateway**
   - Hub and spoke architecture
   - Transit Gateway attachments
   - Multicast support
   - Transit Gateway peering
   - Connect attachments
   - Centralized architectures (egress, inspection, endpoints)
   - Sharing Transit Gateway with RAM

5. **VPN (Site-to-Site VPN)**
   - Virtual Private Gateway (VGW)
   - VPN tunnels and high availability
   - Static vs Dynamic routing (BGP)
   - Dead Peer Detection (DPD)
   - VPN CloudHub
   - Monitoring VPN connections

6. **AWS Direct Connect**
   - Connection types (Dedicated vs Hosted)
   - Virtual Interfaces (Public, Private, Transit)
   - Direct Connect Gateway
   - Link Aggregation Groups (LAG)
   - MACSec encryption
   - Routing policies and BGP communities
   - SiteLink
   - Resilient connections
   - Billing and cost optimization

7. **AWS Cloud WAN**
   - Core Network and Core Network Policy
   - Segments and attachments
   - Use cases and architecture

8. **VPC Lattice**
   - Service networks
   - Services and resources
   - Auth policies
   - Network associations
   - Traffic flow
   - Features and use cases

### Content Delivery and Load Balancing

9. **CloudFront**
   - CDN fundamentals
   - Origins and behaviors
   - SSL/TLS certificates
   - CloudFront Functions vs Lambda@Edge
   - Geographic restrictions
   - Security features

10. **Global Accelerator**
    - Anycast IP addresses
    - Health checks and failover
    - Use cases vs CloudFront

11. **Elastic Load Balancer**
    - Application Load Balancer (ALB)
    - Network Load Balancer (NLB)
    - Gateway Load Balancer (GWLB)
    - Classic Load Balancer (CLB)
    - Health checks, sticky sessions, SSL termination

### DNS and Routing

12. **Route 53**
    - Hosted zones (public and private)
    - Routing policies
    - Health checks
    - DNSSEC
    - Resolver endpoints and rules
    - DNS Firewall
    - Hybrid DNS

### Security Services

13. **AWS Security Services**
    - AWS WAF (Web Application Firewall)
    - AWS Shield (Standard and Advanced)
    - AWS Network Firewall
    - Gateway Load Balancer (GWLB)
    - AWS Firewall Manager
    - Security Groups and NACLs recap

### Container Networking

14. **EKS Networking**
    - Amazon EKS architecture
    - VPC CNI plugin
    - Pod networking
    - IPv4 and IPv6 support
    - Multi-homed pods with Multus
    - Security groups for EKS

## Article Template

Each article follows this structure:
- Frontmatter with metadata (title, subtitle, author, date, image, tags)
- Link to flash cards
- Comprehensive content covering the topic
- Best practices section
- Use cases and real-world scenarios
- Conclusion with reference to next article

## Next Steps

To create additional articles:

1. Review the remaining topics list above
2. Select topics based on priority or audience needs
3. Use the existing articles as templates
4. Extract relevant content from `AWS-Advanced-Networking.md`
5. Format following the established structure
6. Add practical examples and best practices

## Notes

- All articles are formatted in Markdown
- Each article is self-contained but references related topics
- Articles can be published individually or as a series
- The flash card link can be updated or removed as needed
- Images should be added to match the image paths in frontmatter

