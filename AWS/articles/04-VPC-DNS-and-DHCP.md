---
title: "VPC DNS and DHCP: Name Resolution and Network Configuration in AWS"
subtitle: "Understanding Route 53 Resolver, DHCP Option Sets, and DNS Configuration"
author: "Alex Lux"
date: "2023-11-24"
image: "/images/vpc-dns-dhcp.jpg"
tags: ["AWS", "DNS", "DHCP", "Route 53", "VPC"]
---

<a href="https://poetic-maamoul-8ea5fe.netlify.app/" target="_blank">Use this link for review flash cards</a>

<br>

<br>

# VPC DNS and DHCP: Name Resolution and Network Configuration in AWS

DNS (Domain Name System) and DHCP (Dynamic Host Configuration Protocol) are fundamental networking services that enable name resolution and automatic network configuration in your VPC. Understanding how AWS implements these services is crucial for building functional and maintainable network architectures. This article explores Amazon Route 53 Resolver, DHCP option sets, and DNS configuration in VPCs.

## Amazon Route 53 Resolver: The VPC DNS Server

Every VPC comes with a built-in DNS server called the Amazon Route 53 Resolver. This service provides DNS resolution for resources within your VPC and integrates seamlessly with AWS services.

### Route 53 Resolver Location

The DNS resolver runs at:
- **VPC Base + 2 Address**: For example, if your VPC CIDR is `10.0.0.0/16`, the DNS server is at `10.0.0.2`
- **Virtual IP**: Also accessible at `169.254.169.253` from within the VPC

### DNS Resolution Capabilities

The Route 53 Resolver handles:

1. **Route 53 Private Hosted Zones**:
   - Resolves custom domain names in private hosted zones
   - Enables internal DNS for your applications
   - Supports custom domain names like `example.internal`

2. **VPC Internal DNS**:
   - Resolves EC2 instance private DNS names
   - Format: `ip-<private-ipv4-address>.region.compute.internal`
   - Example: `ip-10-0-1-5.us-east-1.compute.internal`

3. **Public DNS Forwarding**:
   - Forwards requests to public DNS servers
   - Resolves public domain names (google.com, amazon.com, etc.)
   - Resolves Route 53 Public Hosted Zones

4. **AWS Service Endpoints**:
   - Resolves AWS service endpoints
   - Examples: `s3.us-east-1.amazonaws.com`, `sqs.us-east-1.amazonaws.com`

### DNS Resolution Settings

**Default Behavior**:
- DNS resolution is **enabled by default** in VPCs
- DNS resolution is **disabled by default** in peered VPCs
- Can be enabled/disabled per VPC

**Accessibility**:
- Accessible from within the VPC only
- Automatically configured on EC2 instances
- No additional configuration required

## Route 53 Private Hosted Zones

Private hosted zones allow you to create custom DNS names for resources within your VPC.

### Setting Up Private Hosted Zones

1. **Create Private Hosted Zone**:
   - In Route 53, create a private hosted zone
   - Example: `example.internal` or `example.com`
   - Associate with your VPC

2. **Create Record Sets**:
   - Create A records pointing to EC2 instance private IPs
   - Example: `web.example.internal` → `10.0.1.5`
   - Supports various record types (A, AAAA, CNAME, etc.)

3. **Automatic Resolution**:
   - DNS queries from within the VPC resolve to private IP addresses
   - No changes needed on EC2 instances
   - Works seamlessly with existing applications

### Use Cases for Private Hosted Zones

- **Service Discovery**: Use friendly names for microservices
- **Environment Separation**: Different zones for dev, staging, prod
- **Application Migration**: Maintain existing DNS names during migration
- **Internal Services**: Name internal APIs and services

## EC2 DNS Names

AWS automatically assigns DNS names to EC2 instances based on their IP addresses and configuration.

### Internal DNS Names

**Format**:
- **us-east-1**: `ip-<private-ipv4-address>.ec2.internal`
- **Other regions**: `ip-<private-ipv4-address>.region.compute.internal`

**Example**:
- Instance with IP `10.0.1.5` in `us-west-2`:
  - DNS name: `ip-10-0-1-5.us-west-2.compute.internal`

**Characteristics**:
- Always resolves to private IP address
- Available for all instances
- No public IP required

### External DNS Names

**Format**:
- **us-east-1**: `ec2-<public-ipv4-address>.compute-1.amazonaws.com`
- **Other regions**: `ec2-<public-ipv4-address>.region.amazonaws.com`

**Example**:
- Instance with public IP `54.123.45.67` in `us-west-2`:
  - DNS name: `ec2-54-123-45-67.us-west-2.amazonaws.com`

**Requirements**:
- Instance must have a public IP address
- Requires `enableDnsHostnames` to be enabled
- Resolves to public IP address

## DHCP Option Sets

DHCP (Dynamic Host Configuration Protocol) option sets provide network configuration parameters to EC2 instances automatically.

### Default DHCP Option Set

AWS automatically creates and associates a default DHCP option set for your VPC with:

**Domain Name Servers**:
- Default: `AmazonProvidedDNS`
- Points to Route 53 Resolver at VPC+2

**Domain Name**:
- Default: Internal Amazon domain name for your region
- Example: `us-east-1.compute.internal`
- Used for hostname configuration

**NTP Servers**:
- Default: `AmazonProvidedNTP`
- Provides time synchronization

**NetBIOS Name Servers**:
- Default: `AmazonProvidedNetBIOS`
- For Windows networking (if needed)

**NetBIOS Node Type**:
- Default: `2`
- Determines NetBIOS name resolution method

### DHCP Configuration Process

When an instance launches:

1. **Hostname Assignment**:
   - Set to private DNS name
   - Format: `ip-<private-ipv4-address>.<region>.compute.internal`

2. **DNS Configuration** (`/etc/resolv.conf`):
   ```
   search us-east-1.compute.internal
   nameserver 10.0.0.2
   ```
   - Search domain: Region-specific compute domain
   - Nameserver: VPC DNS server (VPC+2)

3. **Automatic Application**:
   - Applied automatically on instance launch
   - No manual configuration required
   - Updates when DHCP option set changes

## VPC DNS Attributes

Two critical DNS attributes control DNS behavior in your VPC:

### enableDnsSupport (DNS Resolution)

**Default**: `True`

**Function**:
- Controls whether DNS resolution is supported for the VPC
- When `True`, queries AWS DNS server at `169.254.169.253` (VPC+2)
- When `False`, DNS queries may fail or use alternative resolvers

**Impact**:
- Affects all DNS resolution in the VPC
- Required for Route 53 Private Hosted Zones
- Required for VPC internal DNS names

### enableDnsHostnames (DNS Hostnames)

**Default**: 
- `True` for default VPC
- `False` for newly created VPCs

**Function**:
- Controls whether public hostnames are assigned to EC2 instances
- Only works if `enableDnsSupport` is `True`
- When `True`, assigns public hostname if instance has public IP

**Impact**:
- Enables external DNS names for instances
- Required for some AWS service integrations
- Needed for custom domain names in private hosted zones

### Important Configuration Rule

**For custom DNS domain names in Route 53 Private Hosted Zones, you must set both attributes to `True`.**

## DHCP Option Sets: Advanced Configuration

### Creating Custom DHCP Option Sets

You can create custom DHCP option sets for specific requirements:

1. **Custom DNS Servers**:
   - Point to your own DNS servers
   - Useful for hybrid cloud scenarios
   - Integrate with on-premises DNS

2. **Custom Domain Names**:
   - Set your own domain name
   - Example: `company.internal`
   - Used for hostname configuration

3. **Custom NTP Servers**:
   - Use your own NTP servers
   - Ensure time synchronization
   - Meet compliance requirements

### DHCP Option Set Limitations

**Modification**:
- Once created, DHCP option sets **cannot be modified**
- Create a new option set and associate it with the VPC
- Old option set can be deleted if not in use

**Association**:
- Only **one DHCP option set** can be associated with a VPC
- New association replaces the old one
- Instances automatically use new settings (may take a few hours)

**Without DHCP Option Set**:
- VPC can be created without DHCP option set
- Instances won't have DNS server access
- May impact internet connectivity

### Refreshing DHCP Configuration

To apply new DHCP settings immediately:

```bash
sudo dhclient -r eth0
sudo dhclient eth0
```

This releases and renews the DHCP lease, applying new settings immediately.

## Best Practices

### DNS Configuration

1. **Enable Both DNS Attributes**: Set both `enableDnsSupport` and `enableDnsHostnames` to `True` for full functionality
2. **Use Private Hosted Zones**: Create private hosted zones for service discovery
3. **Plan Domain Names**: Plan your internal domain structure before deployment
4. **Monitor DNS Resolution**: Use CloudWatch to monitor DNS query performance

### DHCP Configuration

1. **Use Default When Possible**: Default DHCP option set works for most scenarios
2. **Custom DNS for Hybrid**: Use custom DNS servers for hybrid cloud integration
3. **Document Changes**: Document any custom DHCP configurations
4. **Test Changes**: Test DHCP option set changes in non-production first

### Security Considerations

1. **DNS Security**: Use Route 53 Resolver DNS Firewall for security
2. **Private Zones**: Keep sensitive DNS information in private hosted zones
3. **Access Control**: Control access to DNS configuration changes
4. **Monitoring**: Monitor DNS queries for suspicious activity

## Troubleshooting DNS Issues

### Common Issues

**DNS Resolution Not Working**:
- Check `enableDnsSupport` is `True`
- Verify security groups allow DNS traffic (port 53)
- Check route tables for proper routing

**Private Hosted Zone Not Resolving**:
- Ensure both DNS attributes are `True`
- Verify hosted zone is associated with correct VPC
- Check record configurations

**External DNS Names Not Available**:
- Verify `enableDnsHostnames` is `True`
- Ensure instance has public IP
- Check instance configuration

### Diagnostic Commands

```bash
# Check DNS configuration
cat /etc/resolv.conf

# Test DNS resolution
nslookup example.internal
dig example.internal

# Check hostname
hostname
```

## Conclusion

VPC DNS and DHCP are essential services that enable automatic network configuration and name resolution in your AWS environment. Route 53 Resolver provides seamless DNS resolution for both internal and external resources, while DHCP option sets ensure instances are properly configured automatically.

Understanding these services helps you build more maintainable and user-friendly network architectures. Whether you're setting up service discovery with private hosted zones, configuring custom DNS servers for hybrid cloud, or troubleshooting DNS issues, these concepts form the foundation of AWS networking.

In the next article, we'll explore network performance optimization, including MTU configuration, jumbo frames, and enhanced networking capabilities. Stay tuned!

