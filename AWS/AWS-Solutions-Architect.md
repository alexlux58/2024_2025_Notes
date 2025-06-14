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
