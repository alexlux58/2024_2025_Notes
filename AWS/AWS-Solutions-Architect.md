# IAM: Users and Groups

- IAM = Identity and Access Management, Global service
- Root account created by default, shouldn't be used or shared
- Users are people within your organization, and can be grouped
- Groups only contain users, not other groups
- Users don't have to belong to a group, and user can belong to multiple groups

# IAM: Permissions

- Users or groups can be assigned JSON documents called policies
- These policies define the permissions of the users
- In AWS you apply the least privilege principle: don't give more permissions than a user needs

# IAM Policies Structure

- Consists of
  - Version: policy language version, always include "2012-10-17"
  - ID: an identifier for the policy, optional
  - Statement: one or more individual statements (required)
- Statements consists of
  - Sid: an identifier for the statement (optional)
  - Effect: whether the statement allows or denies access (Allow, Deny)
  - Principal: account/user/role to which this policy applied to
  - Action: list of actions this policy allows or denies
  - Resource: list of resources to which the actions applied to
  - Condition: optional, additional conditions for the policy to be applied

```json
{
  "Version": "2012-10-17",
  "Id": "S3-Account-Permissions",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:root"
      },
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": ["arn:aws:s3:::examplebucket/*"]
    }
  ]
}
```

# IAM - Password Policy

- Strong passwords = higher security for your account
- In AWS, you can setup a password policy:
  - Set a minimum password length
  - Require specific character types:
    - including uppercase letters
    - lowercase letters
    - numbers
    - non-alphanumeric characters
  - Allow all IAM users to change their own passwords
  - Require users to change their password after some time (password expiration)
  - Prevent password re-use

# Multi-Factor Authentication (MFA)

- Users have access to your account and can possibly change configurations or delete resources in your AWS account
- You want to protect your Root Accounts and IAM users
- MFA = password you know + security device you own

---

# How can users access AWS?

- To access AWS, you have three options:
  - AWS Management Console (protected by password and MFA)
  - AWS Command Line Interface (CLI): protected by access keys
  - AWS Software Developer Kit (SDK) - for code: protected by access keys
- Access Keys are generated through the AWS Console
- Users manage their own access keys
- Access Keys are secret, just like a password. Don't share them.
- Access Key ID ~= username
- Secret Access Key ~= password

# What's the AWS SDK?

- AWS Software Development Kit (AWS SDK)
- Language-specific APIs (set of libraries)
- Enables you to access and manage AWS services programmatically
- Embedded within your application
- Supports
  - SDKs (Javascript, Python, PHP, .NET, Ruby, Java, Go, Node.js, C++)
  - Mobile SDKs (Android, iOS,...)
  - IoT Device SDKs (Embedded C, Arduino)
- Example: AWS CLI is built on AWS SDK for Python (Boto3)

# IAM Roles for Services

- Some AWS service will need to perform actions on your behalf
- To do so, we will assign permissions to AWS services with IAM Roles
- Common roles:
  - EC2 Instance Roles
  - Lambda Function Roles
  - Roles for CloudFormation

# IAM Security Tools

- IAM Credentials Report (account-level)
  - A report that lists all your account's users and the status of their various credentials
- IAM Access Advisor (user-level)
  - Access advisor shows the service permissions granted to a user and when those services were last accessed
  - You can use this information to revise your policies.

# IAM Guidelines and Best Practices

- Don't use the root account except for AWS account setup
- One physical user = One AWS user
- Assign users to groups and assign permissions to groups
- Create a strong password policy
- Use and enforce the use of Multi Factor Authentication (MFA)
- Create and use Roles for giving permissions to AWS services
- Use Access Keys for Programmatic Access (CLI/SDK)
- Audit permissions of your account using IAM Credentials Report and IAM Access Advisor
- Never share IAM users and Access Keys

---

# Amazon EC2

- EC2 is one of the most popular of AWS' offerings
- EC2 = Elastic Compute Cloud = Infrastructure as a Service (IaaS)
- It mainly consists in the capability of:

  - Renting virtual machines (EC2)
  - Storing data on virtual drives (EBS)
  - Distributing load across machines
  - Scaling the services using an auto-scaling group (ASG)

- Knowing EC2 is fundamental to understanding how the Cloud works

# EC2 sizing and configuration options

- Operating System (OS): Linux, Windows or Mac OS
- How much compute power and cores (CPU)
- How much random-access memory (RAM)
- How much storage:
  - Network-attached storage (EBS and EFS)
  - Hardware (EC2 Instance Store)
- Network card: speed of the card, Public IP address
- Firewall rules: security group
- Bootstrap script (configure at first launch): EC2 User Data

# EC2 User Data

- It is possible to bootstrap our instances using an EC2 User data script
- bootstrapping means launching commands when a machine starts
- That script is only run once at the instance first start
- EC2 user data is used to automate boot tasks such as:
  - Install software
  - Configure the OS
  - Download files
  - Run scripts
- The EC2 User Data Script runs with the root user

# EC2 Instance Types - Overview

- You can use different types of EC2 instances that are optimised for different use cases (https://aws.amazon.com/ec2/instance-types/)
- AWS has the following naming convention:
  m5.2xlarge

  - m: instance class
  - 5: generation (AWS improves them over time)
  - 2xlarge: size within the instance class

- General Purpose
- Compute Optimized
- Memory Optimized
- Accelerated Computing
- Storage Optimized
- HPC Optimized
- Instance Features
- Measuring Instance Performance

## EC2 Instance Types - General Purpose

- Great for a diversity of workloads such as web servers or code repositories
- Balance between:
  - Compute
  - Memory
  - Networking
- In the course, we will be using the t2.micro which is a General Purpose EC2 instance

## EC2 Instance Types - Compute Optimized

- Great for compute-intensive tasks that require high performance processors:
  - Batch processing workloads
  - Media transcoding
  - High performance web servers
  - High performance computing (HPC)
  - Scientific modeling and machine learning
  - Dedicated gaming server

## EC2 Instance Types - Memory Optimized

- Fast performance for workloads that process large data sets in memory
- Use cases:
  - High performance, relational/non-relational databases
  - Distributed web scale cache stores
  - In-memory databases optimized for BI (business intelligence)
  - Applications performing real-time processing of big unstructured data

## EC2 Instance Types - Storage Optimized

- Great for storage-intensive tasks that require high, sequential read and write access to large data sets on local storage
- Use cases:
  - High frequency online transaction processing (OLTP) systems
  - Relational and NoSQL databases
  - Cache for in memory databases (for example, Redis)
  - Data warehousing applications
  - Distributed file systems

---

# Introduction to Security Groups

- Security Groups are the fundamental building block of network security in AWS
- They control how traffic is allowed into or out of our EC2 Instances.
- Security groups only contain allow rules
- Security group rules can reference by IP or by security group

# Security Groups Deeper Dive

- Security groups are acting as a "firewall" on EC2 instances
- They regulate:
  - Access to Ports
  - Authorized IP ranges - IPv4 and IPv6
  - Control of Inbound network (from other to the instance)
  - Control of outbound network (from the instance to other)

## Security Groups Good to know

- Can be attached to multiple instances
- Locked down to a region / VPC combination
- Does live "outside" the EC2 - if traffic is blocked the EC2 instance won't see it
- It's good to maintain one separate security group for SSH access
- IF you application is not accessible (time out), then it's a security group issue
- If you application gives a "connection refused" error, then it's an application error or it's not launched
- All inbound traffic is blocked by default
- All outbound traffic is authorized by default

# EC2 Instances Purchasing Options

- On-Demand Instances: short workload, predictable pricing, pay by second
- Reserved (1 and 3 years)
  - Reserved Instances: long workloads
  - Convertible Reserved Instances: long workloads with flexible instances
- Savings Plans (1 and 3 years): commitment to an amount of usage, long workload
- Spot Instances: short workloads, cheap, can lose instances (less reliable)
- Dedicated Hosts: book an entire physical server, control instance placement
- Dedicated Instances: no other customers will share you hardware
- Capacity Reservation: reserve capacity in a specific AZ for any duration

# AWS charges for IPv4 addresses

- Starting February 1st 2024, there's a charge for all Public IPv4 created in your account
- $0.005 per hour of Public IPv4 (~$3.60 per month)
- For new accounts in AWS, you have a free tier for the EC2 service: 750 hours of Public IPv4 per month for the first 12 months
- For all other services there is no free tier

# EC2 Spot Instance Requests

- Can get a discount of up to 90% compared to On-Demand
- Define **max spot price and get the instance while current spot price < max**
  - The hourly spot price varies based on offer and capacity
  - If the current spot price varies based on offer and capacity
  - If the current spot price > you max price you can choose to stop or terminate your instance with a 2 minute grace period
- Other strategy: Spot Block (not supported as of 1/31/22)
  - "block" spot instance during a specified time frame (1 to 6 hours) without interruptions
- Spot instances used for batch jobs, data analysis, or workloads that are resilient to failures

# Spot Fleets

- Spot Fleets: set of Spot Instances + (optional) On-Demand Instances
- The Spot Fleet will try to meet the target capacity with price constraints
  - define possible launch pools: instance type (m5.large), OS, Availability Zone
  - Can have multiple launch pools, so that the fleet can choose
  - Spot Fleet stops launching instances when reaching capacity or max cost
- Strategies to allocate Spot Instances:
  - Lowest price: launch the cheapest instances first
  - Diversified: launch instances across all pools
  - Capacity Optimized: launch instances from pools with optimal capacity
  - price capacity optimized (recommended): launch instances from pools with optimal capacity and lowest price

# Placement Groups

- Sometimes you want control over the EC2 Instance placement strategy
- That strategy can be defined using placement groups
- When you create a placement group, you specify one of the following strategies for the group:
  - Cluster: clusters instances into a low-latency group in a single AZ
    - Pros: Great network (10 Gbps bandwidth between instances with Enhanced Networking enabled - recommended)
    - Cons: if the AZ goes down, all instances go down
    - Use case: Big Data job that needs to complete fast
  - Spread: spreads instances across underlying hardware (max 7 instances per group per AZ) - critical applications
    - Pros: High availability, if one instance goes down, the others are still up
    - Cons: Limited to 7 instances per group per AZ
    - Use case: Critical applications that need high availability (like a web server)
  - Partition: spreads instances across many different partitions (which rely on different sets of racks) within an AZ. Scales to 100s of EC2 instances per group (Hadoop, Cassandra, Kafka)
    - Pros: High availability, if one partition goes down, the others are still up
    - Cons: Limited to 100s of instances per group
    - Use case: Big Data applications that need high availability (like Hadoop, Cassandra, Kafka)

# What's an EBS Volume?

- An EBS (Elastic Block Store) Volume is a network drive you can attach to your instances while they run
- It allows your instances to persist data, even after their termination
- They can only be mounted to one instance at a time (at the CCP level) / "multi-attach" feature for some EBS
- They are bound to a specific availability zone
- Analogy: "Network USB stick"
- Free tier: 30 GB of free EBS storage of type General Purpose (SSD) or Magnetic per month

# EBS - Delete on Termination attribute

- Controls the EBS behavior when an EC2 instance terminates
  - By default, the root EBS volume is deleted (attribute enabled)
  - By default, any other attached EBS volume is not deleted (attribute disabled)
- This can be controlled by the AWS console / AWS CLI / AWS SDK
- Use case: preserve root volume when instance is terminated

# EBS Snapshots

- Make a backup (snapshot) of your EBS volume at a point in time
- Not necessary to detach volume to do snapshot, but recommended
- Cna copy snapshots across AZ or Region

# EBS Snapshots Features

- EBS Snapshot Archive
  - Move a Snapshot to an "archive tier" that is 75% cheaper than the standard snapshot tier
  - Takes within 24 to 72 hours for restoring the archive
- Recycle Bin for EBS Snapshots
  - Setup rules to retain deleted snapshots so you can recover them after an accidental deletion
  - Specify retention (from 1 day to 1 year)
- Fast Snapshot Restore (FSR)
  - Force full initialization of snapshot to have no latency on the first use ($$$)

# AMI Overview

- AMI = Amazon Machine Image
- AMI are a customization of an EC2 instance
  - You add your own software, configuration, operating system, monitoring...
  - Faster boot / configuration time because all your software is pre-packaged
- AMI are built for a specific region (and can be copied across regions)
- You can launch EC2 instances from:
  - A Public AMI: AWS provided
  - Your own AMI: you make and maintain them yourself
  - An AWS Marketplace AMI: an AMI someone else made (and potentially sells)

# AMI Process (from an EC2 Instance)

- Start an EC2 instance and customize it
- Stop the instance (for data integrity)
- Build an AMI - this will also create EBS snapshots
- Launch instances from other AMIs

# EC2 Instance Store

- EBS volumes are network drives with good but "limited" performance
- If you need a high performance hardware disk, use EC2 Instance Store
- Better I/O performance
- EC2 instance store lose their storage if the're stopped (ephemeral)
- Good for buffer / cache / scratch data / temporary content
- Risk of data loss if hardware fails
- Backups and Replication are your responsibility

# EBS Volume Types

- EBS Volumes come in 6 types

  - gp2 / gp3 (SSD): General purpose SSD volume that balances price and performance for a wide variety of workloads
  - io1 / io2 Block Express (SSD): Provisioned IOPS SSD volume for mission-critical low-latency or high-throughput workloads
  - st1 (HDD): Throughput Optimized HDD volume for frequently accessed, throughput-intensive workloads
  - sc1 (HDD): Cold HDD volume for less frequently accessed workloads

- EBS Volumes are characterized in Size | Throughput | IOPS (I/O Ops Per Sec)
- When in doubt always consult the AWS documentation - it's good!
- Only gp2/gp3 and io1/io2 Block Express can be used as boot volumes

# EBS Volume Types Use Cases General Purpose SSD

- Cost effective storage, low-latency
- System boot volumes, Virtual desktops, Development and test environments
- 1 GiB - 16 TiB
- gp3:
  - 3,000 IOPS baseline, 16,000 IOPS max
  - 125 MiB/s throughput baseline, 1,000 MiB/s max
- gp2:
  - Small gp2 volumes can burst IOPS to 3,000
  - Size of the volume and IOPS are linked, max IOPS is 16,000
  - 3 IOPS per GB, means at 5,334 GB we are at the max IOPS

# EBS Volume Types Use Cases Provisioned IOPS (PIOPS) SSD

- Critical business applications with sustained IOPS performance
- Or applications that need more than 16,000 IOPS
- Great for databases workloads (sensitive to storage perf and consistency)
- io1 (4GiB - 16TiB):
  - Max PIOPS: 64,000 for Nitro EC2 instances and 32,000 for other
  - Can increase PIOPS independently from storage size
- io2 Block Express (4 GiB - 64 TiB):
  - Sub millisecond latency
  - Max PIOPS: 256,000 with an IOPS: GiB ratio of 1,000:1
- Supports EBS Multi-attach

# EBS Volume Types Use cases Hard Disk Drives (HDD)

- Cannot be a boot volume
- 125 GiB to 16 TiB
- Throughput Optimized HDD (st1):
  - Frequently accessed, throughput-intensive workloads
  - Max throughput: 500 MiB/s
  - Max IOPS: 500
- Cold HDD (sc1):
  - Less frequently accessed workloads
  - Max throughput: 250 MiB/s
  - Max IOPS: 250

# EBS Multi-Attach - io 1/io2 family

- Attach the same EBS volume to multiple EC2 instances in the same AZ
- Each instance has full read and write permissions to the high-performance volume
- Use case:
  - Achieve higher application availability in clustered Linux applications (ex: Teradata)
  - Applications must manage concurrent write operations
- Up to 16 EC2 instances at a time
- Must use a file system that's cluster-aware (not XFS, EXT4, etc...)

# EBS Encryption

- When you create an encrypted EBS volume, you get the following:
  - Data at rest is encrypted inside the volume
  - All the data in flight moving between the instance and the volume is encrypted
  - All snapshots are encrypted
  - All volumes create from the snapshot
- Encryption and decryption are handled transparently (you have nothing to do)
- Encryption has a minimal impact on latency
- EBS Encryption leverages keys from KMS (AES-256)
- Copying an unencrypted snapshot allows encryption

# Encryption: encrypt an unencrypted EBS Volume

- Create an EBS snapshot of the volume
- Encrypt the EBS snapshot (using copy)
- Create new ebs volume from the snapshot (the volume will also be encrypted)
- Now you can attach the encrypted volume to the original instance

# Amazon EFS - Elastic File System

- Managed NFS (network file system) that can be mounted on many EC2
- EFS works with EC2 instances in multi-AZ
- Highly available, scalable, expensive (3x gp2), pay per use
- Use cases: content management, web serving, data sharing, wordpress
- uses NFSv4.1 protocol
- Uses security group to control access to EFS
- Compatible with Linux based AMI (not Windows)
- Encryption at rest using KMS
- POSIX file system (~Linux) that has a standard file API
- File system scales automatically, pay-per-use, no capacity planning

# EFS - Performance and Storage Classes

- EFS Scale
  - 1000s of concurrent NFS clients, 10 GB+ /s throughput
  - Grow to Petabyte-scale network file system, automatically
- Performance Mode (set at EFS creation time)
  - General Purpose (default) - latency sensitive use cases (web server, CMS, etc...)
  - Max I/O - higher latency, throughput, highly parallel (big data, media processing)
- Throughput Mode
  - Bursting - 1 TB = 50 MiB/s + burst of up to 100 MiB/s
  - Provisioned - set your throughput regardless of storage size, ex: 1 GiB/s for 1 TB storage
  - Elastic - automatically scales throughput up or down based on your workloads
    - Up to 3 GiB/s for reads and 1 GiB/s for writes
    - Used for unpredictable workloads

# EFS - Storage Classes

- Storage Tiers (lifecycle management feature - move file after N days)
  - Standard: for frequently accessed files
  - Infrequent access (EFS-IA): cost to retrieve files, lower price to store.
  - Archive: rarely accessed data (few times each year), 50%
  - Implement lifecycle policies to move files between storage classes
- Availability and durability
  - Standard: Multi-AZ, great for prod
  - One Zone: One AZ, great for dev, backup enabled by default, compatible with IA (EFS One Zone-IA)
- Over 90% in cost savings

# EBS vs EFS - Elastic Block Storage

- EBS volumes...
  - one instance (except multi-attach io 1/io2)
  - are locked at the Availability Zone level
  - gp2: IO increases if the disk size increases
  - gp3 and io 1: can increase IO independently
- To migrate an EBS volume across AZs, you need to create a snapshot and then create a new volume in the target AZ
  - Take a snapshot
  - Restore the snapshot to another AZ
  - EBS backups use IO and you shouldn't run them while your application is handling a lot of traffic
- Root EBS volumes of instances get terminated by default if the EC2 instance gets terminated. (you can disable that)

# EBS vs EFS - Elastic File System

- Mounting 100s of instances across AZ
- EFS share website files (WordPress)
- Only for Linux Instances (POSIX)
- EFS has a higher price point than EBS
- Can leverage Storage Tiers for cost savings

# Scalability and High Availability

- Scalability means that an application / system can handle greater loads by adapting.
- There are two kinds of scalability:
  - Vertical scalability
  - Horizontal Scalability (= elasticity)
- Scalability is linked but different to High Availability
- Let's deep dive into the distinction, using a call center as an example

# Vertical Scalability

- Vertically scalability means increasing the size of the instance
- For example, your application runs on a t2.micro
- Scaling that application vertically means running it on a t2.large
- Vertical scalability is very common for non distributed systems, such as a database.
- RDS, ElastiCache are services that can scale vertically
- There's usually a limit to how much you can vertically scale (hardware limit)

# Horizontal Scalability

- Horizontal Scalability means increasing the number of instances / systems for your application
- Horizontal scaling implies distributed systems.
- This is very common for web applications / modern applications
- It's easy to horizontally scale thanks to the cloud offerings such as Amazon EC2

# High Availability

- High Availability usually goes hand in hand with horizontal scaling
- High availability means running your application / system in at least 2 data centers (== Availability Zones)
- The goal of high availability is to survive a data center loss
- The high availability can be passive (for RDS Multi AZ for example)
- The high availability can be active (for horizontal scaling)

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
- It costs less to setup your own load balancer but it will be a lot more effort on your end
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
- Classic Load Balancer (v1 - old generation) - 2009 - CLB
  - HTTP, HTTPS, TCP, SSL (secure TCP)
- Application Load Balancer (v2 - new generation) - 2016 - ALB
  - HTTP, HTTPS, WebSocket
- Network Load Balancer (v2 - new generation) - 2017 - NLB
  - TCP, TLS (secure TCP), UDP, TCP_UDP
- Gateway Load Balancer (v2 - new generation) - 2019 - GWLB
  - Operates at layer 3 (network layer) - IP traffic

# Application Load Balancer (v2)

- Application load balancers is layer 7 (HTTP)
- Load balancing to multiple HTTP applications across machines (target groups)
- Load balancing to multiple applications on the same machine (ex: containers)
- Support for HTTP/2 and WebSocket
- Support redirects (from HTTP to HTTPS for example)
- Routing tables to different target groups:

  - Routing based on path in URL (example.com/users & example.com/posts)
  - Routing based on hostname in URL (one.example.com and other.example.com)
  - Routing based on Query String, Headers (example.com/users?id=123&order=false)

- ALB are a great fit for micro services and container-based application (example: Docker and Amazon ECS)
- Has a port mapping feature to redirect to a dynamic port in ECS
- In comparison, we'd need multiple Classic Load Balancer per application

# Application Load Balancer (v2) Good to know

- Fixed hostname (XXX.region.elb.amazonaws.com)
- The application servers don't see the IP of the client directly
  - The true IP of the client is inserted in the header X-forwarded-for
  - we can also get port (x-forwarded-port) and proto (x-forwarded-proto)

# Network Load Balancer (v2)

- Network Load Balancer is layer 4 (TCP)
  - Forwards TCP and UDP traffic to your instances
  - Handle millions of requests per second
  - Ultra-low latency
- NLB has one static IP per AZ, and supports assigning Elastic IP (helpful for whitelisting specific IP)
- NLB are used for extreme performance, TCP or UDP traffic
- Not included in the AWS free tier

# Network Load Balancer - Target Groups

- EC2 instances
- IP Addresses - must be private IPs
- Application Load Balancers
- Health Checks support the TCP, HTTP and HTTPS Protocols

# Gateway Load Balancer

- Deploy, scale, and manage a fleet of 3rd party network virtual appliances in AWS
- Example: Firewalls, Intrusion Detection and Prevention Systems, Deep Packet Inspection Systems, payload manipulation,...
- Operates at Layer 3 (network layer) - IP packets
- Combines the following functions:
  - Transparent Network Gateway - single entry/exit for all traffic
  - Load Balancer - distributes traffic to your virtual appliances
- Uses the GENEVE protocol on port 6081

## Gateway Load Balancer - Target Groups

- EC2 instances
- IP Addresses - must be private IPs

# Sticky Sessions (Session Affinity)

- It is possible to implement stickiness so that the same client is always redirected to the same instance behind a load balancer
- This works for Classic Load Balancer, Application Load Balancer, and Network Load Balancer
- The "cookie" used for stickiness has an expiration date you control
- Use case: make sure the user doesn't lose his session data

# Cross-Zone Load Balancing

- Application Load Balancer
  - Enabled by default (can be disabled at the Target Group level)
  - No charges for inter AZ data

# SSL/TLS - Basics

- An SSl Certificate allows traffic between your clients and your load balancer to be encrypted in transit (in-flight encryption)
- SSL refers to Secure Socket Layer, used to encrypt connections
- TLS refers to Transport Layer Security, which is a newer version of SSL
- Nowadays, TLS certificate are mainly used, but people still refer as SSL
- Public SSL certificates are issues by Certificate Authorities (CA)
- Comodo, Symantec, GoDaddy, GlobalSign, Digicert, Letsencrypt, etc...
- SSL certificates have an expiration date (you set) and must be renewed

# Load Balancer - SSL Certificates

- The load balancer uses an X.509 certificate (SSL/TLS server certificate)
- You can manage certificates using ACM (AWS Certificate Manager)
- You can create upload your own certificate alternatively
- HTTPS listener:
  - You must specify a default certificate
  - You can add an optional list of cert to support multiple domains
  - Clients can use SNI (Server Name Indication) to specify the hostname they reach
  - Ability to specify a security policy to support older versions of SSL/TLS (legacy clients)

# SSL - Server Name Indication (SNI)

- SNI solves the problem of loading multiple SSL certificates onto one web server (to serve multiple websites)
- It's a "newer" protocol, and requires the client to indicate the hostname of the target server in the initial SSL handshake
- The server will then find the correct certificate, or return the default one

Note:

- Only works for ALB and NLB (newer generation), CloudFront
- Does not work for CLB (older gen)

# Elastic Load Balancers - SSL Certificates

- Classic Load Balancer (v1)
  - Support only one SSL certificate
  - Must use multiple CLB for multiple hostname with multiple SSL certificates
- Application Load Balancer (v2)
  - Supports multiple listeners with multiple SSL certificates
  - Uses Server Name Indication (SNI) to make it work
- Network Load Balancer (v2)
  - Supports multiple listeners with multiple SSL certificates
  - Uses Server Name Indication (SNI) to make it work

# Connection Draining

- Feature naming
  - Connection Draining - for CLB
  - Deregistration Delay - for ALB and NLB
- Time to complete "in-flight requests" while the instance is de-registering or unhealthy
- Stops sending new requests to the EC2 instance which is de-registering
- Between 1 to 3600 seconds (default: 300 seconds)
- Can be disabled (set value to 0)
- Set to a low value if your requests are short

# What's an Auto Scaling Group?

- In real-life, the load on your websites and application can change
- In the cloud, you can create and get rid of servers very quickly
- The goal of an Auto Scaling Group (ASG) is to:
  - Scale out (add EC2 instances) to match an increased load
  - Scale in (remove EC2 instances) to match a decreased load
  - Ensure we have a minimum and a maximum number of EC2 instances running
  - Automatically register new instances to a load balancer
  - Re-create an EC2 instance in case a previous one is terminated (ex: if unhealthy)
- ASG are free (you only pay for the underlying EC2 instances)

# Auto Scaling Group Attributes

- A Launch Template (older "Launch Configurations" are deprecated)
  - AMI + Instance Type
  - EC2 User Data
  - EBS Volumes
  - Security Groups
  - SSH Key Pair
  - IAM Roles for your EC2 instances
  - Network + Subnets Information
  - Load Balancer Information
- Min Size / Max Size / Initial Capacity
- Scaling Policies

# Auto Scaling - CloudWatch Alarms and Scaling

- It is possible to scale an ASG based on CloudWatch alarms
- An alarms monitors a metric (such as Average CPU, or a custom metric)
- Metrics such as Average CPU are computed for the overall ASG instances
- Based on the alarm:
  - We can create scale-out policies (increase the number of instances)
  - We can create scale-in policies (decrease the number of instances)

# Auto Scaling Groups - Scaling Policies

- Dynamic Scaling
  - Target Tracking Scaling
    - Simple to set-up
    - Example: I want the average ASG CPU to stay at around 40%
  - Simple / Step Scaling
    - When a CloudWatch alarm is triggered (example CPU > 70%), then add 2 units
    - When a CloudWatch alarm is triggered (example CPU < 30%), then remove 1 unit
- Scheduled Scaling
  - Anticipate a scaling based on known usage patterns
  - Example: increase the min capacity to 10 at 5pm on Fridays
- Predictive Scaling: continuously analyzes historical data and automatically adjusts the capacity of your ASG
  - Uses machine learning to predict future traffic patterns
  - Requires Application Auto Scaling

# Good metrics to scale on

- CPUUtilization: Average CPU utilization across your instances
- RequestCountPerTarget: to make sure the number of requests per EC2 instances is stable
- Average Network In/Out (If you're application is network bound)
- Any custom metric (that you push using CloudWatch)

# Auto Scaling Groups - Scaling Cooldowns

- After a scaling activity happens, you are in the cooldown period (default 300 seconds)
- During the cooldown period, the ASG will not launch or terminate additional instances (to allow for metrics to stabilize)
- Advice: Use a ready-to-use AMI to reduce configuration time in order to be serving requests faster and reduce the cooldown period.

# Amazon RDS Overview

- RDS stands for Relational Database Service
- It's a managed DB service for DB use SQL as a query language
- It allows you to create databases in the cloud that are managed by AWS
  - Postgres
  - MySQL
  - MariaDB
  - Oracle
  - Microsoft SQL Server
  - IBM DB2
  - Aurora (AWS Proprietary database)

# Advantage over using RDS versus deploying DB on EC2

- RDS is a managed service:
  - Automated provisioning, OS patching
  - Continuous backups and restore to specific timestamp (Point in Time Restore)
  - Monitoring and metrics dashboards
  - Read replicas for improved read performance
  - Multi AZ setup for DR (disaster recovery)
  - Maintenance windows for upgrades
  - Scaling capability (vertical and horizontal)
  - Storage backed by EBS
- BUT you can't SSH into your instances

# RDS - Storage Auto Scaling

- Helps you increase storage on your RDS DB instance dynamically
- When RDS detects you are running out of free database storage, it scales automatically
- Avoid manually scaling your database storage
- You have to set Maximum Storage Threshold (maximum limit for DB storage)
- Automatically modify storage if:
  - Free storage is less than 10% of allocated storage
  - Low-storage lasts at least 5 minutes
  - 6 hours have passed since last modification
  - Useful for applications with unpredictable workloads
  - Supports all RDS database engines

# RDS Read Replicas for read scaling

- Up to 15 Read Replicas
- Within AZ, Cross AZ or Cross Region
- Replication is ASYNC, so reads are eventually consistent
- Replicas can be promoted to their own DB
- Applications must update the connection strings to leverage read replicas

# RDS Read Replicas - Use Cases

- You have a production database that is taking on normal load
- You want to run a reporting application to run some analytics on the data
- You create a Read Replica to run the new workload there
- The production application is unaffected
- Read replicas are used for SELECT (=read) only kind of statements (not INSERT, UPDATE, DELETE)

# RDS Read Replicas - Network Cost

- In AWS there's a network cost when data goes from one AZ to another
- For RDS Read Replicas within the same region, you don't pay that fee

# RDS Multi AZ (Disaster Recovery)

- SYNC replication
- One DNS name - automatic app failover to standby
- increase availability
- failover in case of loss of AZ, loss of network, instance or storage failure
- No manual intervention required
- Not used for scaling

# RDS From Single AZ to Multi AZ

- Zero downtime operation (no need to stop the DB)
- Just click on "modify" for the database
- The following happens internally:
  - A snapshot is taken
  - A new DB is restored from the snapshot in a new AZ
  - Synchronization is established between the two databases

# RDS Custom

- Managed Oracle and Microsoft SQL Server Database with OS and database customizations
- RDS: Automates setup, operation, and scaling of database in AWS
- Custom: access to the underlying OS and database so you can
  - Configure settings
  - Install patches
  - Enable native features
  - Access the underlying EC2 instance using SSH or SSM Session Manager
- De-activate Automation Mode to perform your customization, better to take a DB snapshot before
- RDS vs. RDS Custom
  - RDS: entire database and the OS to be managed by AWS

# Amazon Aurora

- Aurora is a proprietary technology from AWS (not open sourced)
- Postgres and MySQL are bot supported as Aurora DB (that means your drivers will work as if Aurora was a Postgres or MySQL DB)
- Aurora is "AWS cloud optimized" and claims 5x performance improvement over MySQL on RDS, over 3x the performance of Postgres on RDS
- Aurora storage automatically grows in increments of 10GB, up to 128TB.
- Aurora can have up to 15 replicas and the replication process is faster than MySQL (sub 10 ms replica lag)
- Failover in Aurora is instantaneous. It's HA native
- Aurora costs more than RDS (20% more) - but is more efficient

# Aurora High Availability and Read Scaling

- 6 copies of your data across 3 AZs:
  - 4 copies out of 6 needed for writes
  - 3 copies out of 6 needed for reads
  - Self healing with peer-to-peer replication
  - Storage is striped across 100s of volumes
- One Aurora Instance takes writes (master)
- Automated failover for master in less than 30 seconds
- Master + up to 15 aurora read replicas serve reads

# Features of Aurora

- Automatic fail-over
- Backup and Recovery
- Isolation and security
- Industry compliance
- Push-button scaling
- Automated Patching with Zero Downtime
- Advanced Monitoring
- Routine Maintenance
- Backtrack: restore data at any point of time without using backups

# Aurora - Custom Endpoints

- Define a subnet of Aurora instances as a Custom Endpoint
- Example: Run analytical queries on specific replicas
- The Reader Endpoint is generally not used after defining Custom Endpoints

# Aurora Serverless

- Automated database instantiation and auto scaling based on actual usage
- Good for infrequent, intermittent or unpredictable workloads
- No capacity planning

# Global Aurora

- Aurora Cross Region Read Replicas:
  - useful for disaster recovery
  - simple to put in place
- Aurora global database (recommended):
  - 1 Primary Region (read/write)
  - Up to 10 secondary (read-only) regions, replication lag is less than 1 second
  - Up to 16 read replicas per secondary region
  - Helps for decreasing latency

# Aurora - Custom Endpoints

- Define a subset of Aurora Instances as a Custom Endpoint
- Example: Run analytical queries on specific replicas
- The Reader Endpoint is generally not used after defining Custom Endpoints

# Aurora Serverless

- Automated database instantiation and auto-scaling based on actual usage
- Good for infrequent, intermittent or uneditable workloads
- No capacity planning needed
- Pay per second, can be more cost-effective

# Global Aurora

- Aurora Cross Region Read Replicas:
  - Useful for disaster recovery
  - Simple to put in place

# Aurora Global Database (recommended):

- 1 primary region (read/write)
- Up to 10 secondary (read-only) regions, replication lag is less than 1 second
- Up to 16 read replicas per secondary region
- Helps for decreasing latency
- Promoting another region (for disaster recovery) has an RTO of < 1 minute
- Typical cross-region replication takes less than 1 second

# Aurora Machine Learning

- Enables you to add ML-based predictions to your applications via SQL
- Simple, optimized, and secure integration between Aurora and AWS ML services
- Supported services
  - Amazon SageMaker (use with any ML model)
  - Amazon Comprehend (for sentiment analysis)
- You don't need to have ML experience
- Use cases: fraud detection, ads targeting, sentiment analysis, product recommendations

# Babelfish for Aurora PostgreSQL

- Allows Aurora PostgreSQL to understand commands targeted for MS SQL Server (e.g.,T-SQL)
- Therefore Microsoft SQL Server based applications can work on Aurora PostgreSQL
- Requires no to little code changes (using the same MS SQL Server client driver)
- The same application can be used after a migration of your database (using AWS SCT and DMS)

# RDS Backups

- Automated backups:
  - Daily full backup of the database (during the backup window)
  - Transaction logs are backed-up by RDS every 5 minutes
  - => ability to restore to any point in time (from oldest backup to 5 minutes ago)
  - 1 to 35 days of retention, set 0 to disable automated backups
- Manual DB Snapshots
  - Manually triggered by the user
  - Retention of backup for as long as you want
- Trick: in a stopped RDS database, you will still pay for storage. If you plan on stopping it for a long time, you should snapshot and restore instead

# Aurora Backups

- Automated backups
  - 1 to 35 days (cannot be disabled)
  - point-in-time recovery in that timeframe
- Manual DB Snapshots
  - Manually triggered by the user
  - Retention of backup for as long as you want

# RDS and Aurora Restore options

- Restoring a RDS / Aurora backup or a snapshot creates a new database
- Restoring MySQL RDS database from S3
  - Create a backup of your on-premises database
  - Store it on Amazon S3 (object storage)
  - Restore the backup file onto a new RDS instance running MySQL

# Restoring MySQL Aurora cluster from S3

- Create a backup of your on-premises database using Percona XtraBackup
- Store the backup file on Amazon S3
- Restore the backup file onto a new Aurora cluster running MySQL

# Aurora Database Cloning

- Create a new Aurora DB Cluster from an existing one
- Faster than snapshot and restore
- Uses copy-on-write protocol
- Uses copy-on-write protocol
  - Initially, the new DB cluster uses the same data volume as the original DB cluster (fast and efficient - no copying is needed)
  - When updates are made to the new DB cluster data, then additional storage is allocated and data is copied to be separated
- Very fast and cost-effective
- Useful to create a "staging" database from a "production" database without impacting the production database

# RDS and Aurora - Security

- At-rest encryption:
