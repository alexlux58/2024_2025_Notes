# AWS Security Specialty

## Amazon GuardDuty

- Intelligent Threat discovery to protect you AWS Account
- Uses Machine Learning algorithms, anomaly detection, 3rd party data
- One click to enable (30 days trial), no need to install software
- Input data includes:
  - CloudTrail Events Logs - unusual API calls, unauthorized deployments
    - CloudTrail Management Events - create VPC subnet, create trail, ...
    - CloudTrail S3 Data Events - get object, list objects, delete object, ...
  - VPC Flow Logs - unusual internal traffic, unusual IP addresses
  - DNS Logs - compromised EC2 instances sending encoded data within DNS queries
  - Optional Features - EKS Audit Logs, RDS & Aurora, EBS, Lambda, S3 Data Events ...
- Can setup EventBridge rules to be notified in case of findings
- EventBridge rules can target AWS Lambda or SNS
- Can protect against CryptoCurrency attacks (has a dedicated "finding" for it)

### Amazon GuardDuty - Multi-Account Strategy

- You can manage multiple accounts in GuardDuty
- Associate the Member accounts with the Administrator account
  - Through an AWS Organization
  - Sending invitation through GuardDuty
- Administrator account can:

  - Add and remove member accounts
  - Manage GuardDuty within the associated member accounts
  - Manage findings, suppression rules, trusted IP lists, threat lists

- In an AWS Organization, you can specify a member accounts as the Organization's delegated administrator for GuardDuty
  - This account can manage GuardDuty for all accounts in the organization
  - This account can't be a member account
  - This account can't be the management account of the organization

### Amazon GuardDuty - Findings Automated Response

- Findings are potential security issue for malicious events happening in your AWS account
- Automate response to security issues revealed by GuardDuty Findings using EventBridge
- Send alerts to SNS (email, Lambda, Slack, Chime, ...)

- GuardDuty pulls independent streams of data directly from CloudTrail logs (management events, data events), VPC Flow Logs or EKS logs
- Each finding has a severity value between 0.1 to 8+ (High, Medium, Low)
- Finding naming convention: ThreatPurpose: ResourceTypeAffected/ThreatFamilyName.DetectionMechanism!Artifact

  - ThreatPurpose: Primary purpose of the threat (e.g., Backdoor, CryptoCurrency)
  - ResourceTypeAffected: which AWS resource is the target (e.g., EC2, S3)
  - ThreatFamilyName: describes the potential malicious activity (e.g., NetworkPortUnusual)
  - DetectionMechanism: method GuardDuty detecting the finding (e.g., Tcp, Udp)
  - Artifact: describes a resource that is used in the malicious activity (e.g., DNS)

- You can generate sample findings in GuardDuty to test your automations

### Amazon GuardDuty - Finding Types

- EC2 Finding Types
  - UnauthorizedAccess: EC2/SSHBruteForce, CryptoCurrency: EC2/BitcoinToo.B!DNS
- IAM Finding Types
  - Stealth:IAMUser/CloudTrailLoggingDisabled, Persistence:IAMUser/Policy:EC2FullAccess!DNS, Policy:IAMUser/RootCredentialUsage
- Kubernetes Audit Logs Finding Types
  - CredentialAccess:Kubernetes/MaliciousIPCaller
- Malware Protection Finding Types
  - Execution:EC2/SuspiciousFile, Execution:ECS/SuspiciousFile
- RDS Protection Finding Types
  - CredentialAccess:RDS/AnomalousBehavior.SuccessfulLogin
- S3 Finding Types
  - Policy:S3/AccountBlockPublicAccessDisabled, PenTest:S3/KaliLinux

### Amazon GuardDuty - Trusted and Threat IP Lists

- Works only for public IP addresses
- Trusted IP list
  - List of IP addresses and CIDR ranges that you trust
  - GuardDuty doesn't generate findings for these trusted lists
- Threat IP List

  - List of known malicious IP addresses and CIDR ranges
  - GuardDuty generates findings based on these threat lists
  - Can be supplied by 3rd party threat intelligence or created custom for you

- In a multi-account GuardDuty setup, only the GuardDuty administrator account can manage those lists

### Amazon GuardDuty - Suppression Rules

- Set of criteria that automatically filter and archive new findings
- Example: low-value findings, false-positive findings, or threats you don't intend to act on
- Can suppress entire findings types or define more granular criteria (e.g., suppress only specific EC2 instances)
- Suppressed findings are NOT sent to Security Hub, S3, Detective, or EventBridge
- Suppressed findings can be still viewed in the Archive

Finding type: Recon:EC2/Portscan Instance image ID: ami-999999999 (automatically archive findings when there is a port scan on a specific EC2 instance, e.g., running vulnerability assessment)

Finding type: UnauthorizedAccess:EC2/SSHBruteForce Instance tag value: devops (automatically archive findings when SSH Brute Force attacks are targeting Bastion Hosts EC2 instances)

### Troubleshooting - GuardDuty didn't generate any finding types

- Problem: GuardDuty is activated but it didn't generate any DNS based findings
- Reason: GuardDuty only processes DNS logs if you use the default VPC DNS resolver. All other types of DNS resolvers won't generate DNS based findings.

- If GuardDuty is suspended or disabled, then no finding types are generated
- Best practice to enable GuardDuty even on regions you don't use

---

# AWS Security Hub

- Central security tool to manage security across several AWS accounts and automate security checks
- Integrated dashboards showing current security and compliance status to quickly take actions
- Automatically aggregates alerts in predefined or personal findings formats from various AWS services and AWS partner tools
  - Config
  - GuardDuty
  - Inspector
  - Macie
  - IAM Access Analyzer
  - Firewall Manager
  - Systems Manager
  - Partner Tools
- Must first enable the AWS config service

## Security Hub - Main Features

- Cross-region aggregation: aggregate findings, insights, and security scores from multiple Regions to a single aggregation region
- AWS organizations integration
  - Manage all accounts in the Organization
  - Security hub automatically detects new accounts
  - By default, organization management account is the security hub administrator
  - Ability to have a designated security hub administrator from member accounts
- AWS config must be enabled
  - Security hub uses AWS config to perform its security checks
  - Must be enabled on all accounts (Security Hub does NOT manage AWS config)

## Security Hub - Security Standards

- Security Hub generates findings and continuous checks against the rules in a set of supported security standards
- Security Hub supports the following standards: CIS AWS Foundations, PCI DSS, AWS Foundational Security Best Practices, AWS Security Best Practices, ISO 27001, SOC 2, GDPR, HIPAA, FedRAMP, FISMA, and more

---

# Security Hub - Integration with GuardDuty

- Automatically enabled when Security Hub is enabled (can be disabled)
- GuardDuty will send findings to Security Hub
- Findings are sent in AWS Security Finding Format (ASFF)
- Findings are usually sent within 5 minutes
- Archiving a GuardDuty finding will NOT update the finding in Security Hub

## Security Hub - 3rd Party Integration

- Security Hub integrates with multiple 3rd partner products
- Send findings to Security Hub
  - 3CORESEC
  - ALERT LOGIC
  - AQUA
- Receive Findings from Security Hub
  - ATLASSIAN
  - FIREEYE
  - FORTINET
- Update Findings in Security Hub
  - ATLASSIAN
  - ServiceNow

## Security Hub - Findings

- Security Hub consumes findings using AWS Security Finding Format (ASFF)
- Security Hub automatically updates and deletes findings
- Findings past 90 days are automatically deleted
- Filter by Region, Integration, Security Standard, Inights

## Security Hub - Insights

- Collection of related findings that identifies a security area that requires attention and intervention
- Example: Insight points out EC2 instances that are subject of findings that detect poor security practices
- Brings findings from across finding providers (GuardDuty, Inspector, Macie, IAM Access Analyzer, Firewall Manager, Systems Manager, Partner Tools)
- Each insight defined by a group by statement and optional filters
- Built-In Managed Insights: return results only if you enabled related product integration or security standard (can not edit or delete)
- Custom Insights: create your own insights based on your own criteria
  - example: custom insight to track critical findings affecting member accounts

## Security Hub - Custom Actions

- Helps you automate Security Hub with EventBridge
- Allows you to create actions for response and remediation to selected findings within the Security Hub console
- EventBridge event type is Security Hub Findings - Custom Action

---

# Detective Overview

- GuardDuty, Macie, and Security Hub are used to identify potential security issues, or findings
- Sometimes security findings require deeper analysis to isolate the root cause and take action - it's a complex process
- Amazon Detective analyzes, investigates, and quickly identifies the root cause of security issues or suspicious activities (using ML and graphs)
- Automatically collects and processes events from VPC Flow Logs, CloudTrail, GuardDuty and create a unified view

---

# DDos Simulation Testing on AWS

- Controlled DDoS attack which enables you to evaluate the resiliency of you applications and to practice event response
- Must be performed by an approved AWS DDoS Test Partner
- The target can be either Protected Resources or Edge-Optimized API gateway that is subscribed to Shield Advanced
- Attack must NOT be originated from AWS resources
- Attack must NOT exceed 20G/s
- Attack must NOT exceed 5 million packets per second for CloudFront and 50k packets per second for any other service

---

# Compromised EC2 Instances

- Steps to address compromised instances:

  - Capture the instance's metadata
  - Enable Termination Protection
  - Isolate the instance (replace instances's SG - no outbound traffic authorized)
  - Detach the instance from any ASG (Suspend processes)
  - Deregister the instance from any ELB
  - Snapshot the EBS volumes (deep analysis)
  - Tag the EC2 instance (investigation)

- Offline investigation: shutdown instance
- Online investigation: snapshot memory, capture network traffic
- Automate the isolation process: Lambda
- Automate memory capture: SSM Run command

# Compromised S3 Buckets

- Identify the compromised S3 bucket using GuardDuty
- Identify the source of the malicious activity (e.g. IAM user, role) and the API calls using CloudTrail or Amazon Detective
- Identify whether the source was authorized to make those API calls
- Secure your S3 bucket, recommended settings:
  - S3 block public access settings, S3 bucket policies and user policies, VPC endpoints for S3, S3 pre-signed URLs, S3 access points, S3 ACLs

# Compromised ECS cluster

- Identify the affected ECS cluster using GuardDuty
- Identify the source of the malicious activity (e.g., container image, tasks)
- Isolate the impacted tasks (deny all ingress/egress traffic to the task using security groups)
- Evaluate the presence of malicious activity (e.g., malware)

# Compromised Standalone Container

- identify the malicious container using GuardDuty
- Isolate the malicious container (deny all ingress/egress traffic to the container)
- Suspend all processes in the container (pause the container)
- Or stop the container and look at EBS Snapshots retained by GuardDuty (snapshots retention feature)
- Evaluate the presence of malicious activity (e.g., malware)

# Compromised RDS Database Instance

- Identify the affected DB instance and DB user using GuardDuty
- If it is NOT legitimate behavior:
  - Restrict network access (SGs & NACLs)
  - Restrict the DB access for the suspected DB user
- Rotate the suspected DB user's passwords
- Review DB Audit Logs to identify leaked data
- Secure your RDS DB instance, recommended settings:
  - Use secrets manager to rotate the DB password
  - Use IAM DB Authentication to manage DB users' access without passwords

# Compromised AWS Credentials

- Identify the affected IAM user using GuardDuty
- Rotate the exposed AWS Credentials
- Invalidate temporary credentials by attaching an explicit Deny policy to the affected IAM user with an STS
  date condition (see IAM section)
- Check CloudTrail logs for other unauthorized activity
- Review your AWS resources (e.g., delete unauthorized resources)
- Verify your AWS account information

# Compromised IAM role

- Invalidate temporary credentials by attaching an explicit Deny policy to the affected IAM user with an STS date condition
- Revoke access for the identity to the linked AD if any
- Check CloudTrail logs for other unauthorized activity
- Review your AWS resources (e.g., delete unauthorized resources)
- Verify your AWS account information

# Compromised Account

- Rotate and delete exposed AWS Access Keys
- Rotate and delete any unauthorized IAM user credentials (rotate existing IAM user's passwords)
- Rotate and delete all EC2 key pairs
- Check CloudTrail logs for other unauthorized activity
- Review your AWS resources (e.g., delete unauthorized resources)
- Verify your AWS account information

---

# EC2 serial console

- Use cases: troubleshoot boot, troubleshoot configuration, analyze reboot issues...
- Directly access your EC2 instance's serial port (as if keyboard and monitor are directly attached to the EC2 instance)
- Does NOT require any network capabilities
- Use with supported Nitro-based EC2 instances
- Must setup OS user and password
- Only one active session per EC2 instance
- Disabled by default (enabled at AWS account level)

---

# Connect to Linux EC2 Instance with a lost SSH Key Pair - Using EC2 user data

- Create a new Key Pair, then copy the public key
- Stop the instance, update the EC2 User data (cloud-config format)
- Start the instance and connect with the private key
- Note: This method override the existing public keys
- Delete the EC2 User data

# Connect to Linux EC2 Instance with a lost SSH Key Pair - Using Systems Manager

- Use AWSSupport-ResetAccess Automation Document
- Will create and apply a new key pair (/ec2rl/openssh/instance_id/key)
- Works for both Linux and Windows
- The private key stored encrypted in SSM Parameter Store /ec2rl/openssh/instance_id/key

# Connect to Linux EC2 Instance with a lost SSH Key Pair - Using EC2 Instance Connect

- EC2 Instance Connect agent must be installed (already installed on Amazon Linux 2 and Ubuntu 16.04 or later)
- Connect using EC2 Instance Connect temporary session
- Store permanent new public SSH key into ~/.ssh/authorized_keys

# Connect to Linux EC2 Instance with a lost SSH Key Pair - Using EC2 serial console

- Connect to your instance without a working network connection
- Used with supported Nitro-based instances
- Must be enabled at the AWS account level

# Connect to Linux EC2 Instance with a lost SSH Key Pair - Using EBS Volume Swap

- Create a new key pair
- stop the original EC2 instance
- Detach the EBS root volume
- Attach the EBS volume to a temporary EC2 instance as a secondary volume
- Add the new public key to ~/.ssh/authorized_keys on the volume
- Re-attach the volume to the original instance, then restart the instance

# Connect to Windows EC2 instance with a lost password - Using EC2Launch v2

- Verify EC2Launch v2 service is running (Windows AMIs with the EC2Launch v2 service)
- Detach the EBS root volume
- Attach the volume to a temporary instance as a secondary volume
- Delete file %ProgramData%/Amazon/EC2Launch/state/.run-once
- Re-attach the volume to the original instance, then restart the instance, you will be able to set a new password

# Connect to Windows EC2 instance with a lost password - Using EC2Config

- Verify EC2Config service is running
- Windows AMIs before Windows Server 2016
- Detach the EBS root volume
- Attach the volume to a temporary instance as a secondary volume
- Modify file \ProgramFiles\Amazon\Ec2ConfigService\Settings\Config.xml
- Set EC2SetPassword to Enabled
- Reattach the volume to the original instance, then restart the instance

# Connect to Windows EC2 instance with a lost password - Using EC2Launch

- Windows Server 2016 and later AMIs that doesn't include EC2Launch v2
- Detach the EBS root volume
- Download and install EC2Rescue Tool for Windows Server
- Select Offline instance option -> Diagnose and Rescue -> Reset Administrator password
- Reattach the volume to the original instance, then restart the instance

# Connect to Windows EC2 instance with a lost password - Using Systems Manager

- Must have SSM Agent installed
- Method 1:
  - Use AWSSupport-RunEc2RescueForWindowsTool Run Command Document
  - Install and run EC2Rescue Tool for Windows Server
  - Command is set to ResetAccess
- Method 2:
  - use AWSSupport-ResetAccess Automation Document
  - Works for both Linux and Windows
- Method 3:
  - Manually AWS-RunPowerShellScript Run Command Document
  - Command: net user Administrator Password@123

# EC2Rescue Tool for Linux

- Diagnose and troubleshoot common issues
- Gather syslog logs, diagnose problematic kernel parameters, diagnose common OpenSSH issues, ...
- Supports over 100 modules
- Amazon Linux 2, Ubuntu, RHEL, SUSE Linux
- Install manually or using AWSSupport-TroubleshootSSH Automation Document
  - Installs the tool and tries to fix issues with SSH connections to the instance
- Upload the results directly to AWS Support or an S3 bucket

# Use Cases

- Collect System Utilization Reports
  - vmstate, iostat, mpstat, ...
- Collect Logs and Details
  - syslog, dmesg, application error logs, and SSM logs
- Detect System Problems
  - Asymmetric routing or duplicate root device labels
- Automatically Remediate System Problems
  - Correcting OpenSSH file permissions
  - Disabling known problematic kernel problems
- You can create your own custom module

# EC2Rescue Tool for Windows Server

- Diagnose and troubleshoot common issues
- Collect log files, troubleshoot issues, provide suggestions, ...
- Supports 2 modules (data collector, analyzer)
- Windows Server 2008 R2 or later
- Install manually or using AWSSupport-AWSSupport-RunEC2RescueForWindowsTool Run Command Document
  - Commands: CollectLogs, FixAll, ResetAccess
- Use AWSSupport-ExecuteEC2Rescue Automation Document to troubleshoot connectivity issues
- Upload the results directly to an S3 bucket

# Use Cases

- Instance Connectivity Issues
  - Firewall, RDP, or network interface configuration
- OS Boot Issues
  - Blue screen or stop error, a boot loop, or a corrupted registry
- Gather OS logs and Configuration Files
  - If you need advanced log analysis and troubleshooting
- Common OS issues
  - Disk signature collision, missing drivers, or incorrect registry settings
- ## Perform a restore

---

# AWS Acceptable Use Policy (AUP)

- Governs your use of the services offered by AWS
- You may not use for:
  - Illegal activities
  - Harmful activities
  - Activities that interfere with the services
  - Activities that infringe on the rights of others
  - Activities that may expose AWS to legal liability
- https://aws.amazon.com/aup/

# Abuse Report - AWS

- When you suspect that AWS resources are used for abusive or illegal activities
- You can create an AWS Abuse Report
- Examples: spam, port scanning, DDoS attacks, intrusion attempts, hosting prohibited content, distributing malware, phishing, copyright infringement
- Contact AWS Trust and Safety team with details (e.g., logs, email headers)
- If you receive an email that your AWS resources are used for illegal activity:
  - Respond to the email and explain how you're preventing this
  - If you don't respond within 24 hours, AWS might suspend your AWS account

# IAM Security Tools

- IAM Credentials Report (account-level)
  - A report that lists all your account's users and the status of their various credentials
- IAM Access Advisor (user-level)
  - Access advisor shows the service permissions granted to a user and when those services were last accessed
  - You can use this information to revise your policies

# IM Access Analyzer

- Find out which resources are shared with external entities

  - S3 buckets
  - IAM Roles
  - KMS keys
  - SQS Queues
  - Secrets Manager secrets
  - Lambda functions and Layers

- Define Zone of Trust (trusted accounts) = AWS Account or AWS Organization
- Access outside zone of trusts => findings

- IAM Access Analyzer Policy Validation

  - Validates your policy against IAM policy grammar and best practices
  - General warnings, security warnings, errors, suggestions
  - Provides actionable recommendations

- IAM Access Analyzer Policy Generation
  - Generates IAM policy based on access activity
  - CloudTrail logs is reviewed to generate the policy with the fine-grained permissions and the appropriate Actions and Services
  - Reviews CloudTrail logs for up to 90 days

---

# Amazon Inspector

- Automated Security Assessments
- For EC2 instances
  - Leveraging the AWS System Manager (SSM) agent
  - Analyze against unintended network accessability, vulnerabilities, deviations from best practices
  - Analyze the running OS against known vulnerabilities
- For container Images push to Amazon ECR
  - Assessment of Container Images as they are pushed
- For Lambda Functions

  - Identifies software vulnerabilities in function code and package dependencies
  - Assessment of functions as they are deployed

- Reporting and Integration with AWS Security Hub
- Send findings to Amazon Event Bridge
- Remember: Only for EC2 instances, Container Images and Lambda Functions
- Continuous scanning of the infrastructure, only when needed
- Package vulnerabilities (Ec2, ECR and Lambda) database of CVE
- Network reachability (Ec2) - unintended network accessibility
- A risk score is associated with all vulnerabilities for prioritization

---

# Logging in AWS for security and compliance

- To help compliance requirements, AWS provides many service-specific security and audit logs
- Service Logs include:
  - CloudTrail trails - trace all API calls
  - Config Rules - for config and compliance over time
  - CloudWatch logs - for full data retention
  - VPC Flow Logs - IP traffic within your VPC
  - ELB Access Logs - metadata of requests made to your load balancers
  - CloudFront Logs - web distribution access logs
  - WAF Logs - full logging of all requests analyzed by the service
- Logs can be analyzed using AWS Athena if they're stored in S3
- You should encrypt logs in S3, control access using IAM and Bucket policies, MFA
- Move Logs to Glacier for cost savings on long term storage

- AWS security at scale logging whitepaper (https://d0.awsstatic.com/whitepapers/compliance/AWS_Security_at_Scale_Logging_in_AWS_Whitepaper.pdf)

---

# AWS Systems Manager (SSM) Overview

- Helps you manage your EC2 and On-premises systems at scale
- Get operational insights about the state of your infrastructure
- Easily detect problems
- Patching automation for enhanced compliance
- Works for both Windows and Linux OS
- Integrated with CloudWatch metrics / dashboards
- Integrated with AWS Config
- Free service

# AWS Systems Manager - Features

- Resource Groups
- Operations Management
  - Explorer
  - OpsCenter
  - CloudWatch Dashboard
  - PHD
  - Incident manager
- Shared Resources
  - Documents
- Change Management
  - Change Manager
  - Automation
  - Change Calendar
  - Maintenance Windows
- Application Management
  - Application Manager
  - Application Insights
  - AppConfig
  - Parameter Store
- Node Management
  - Fleet Manager
  - Compliance
  - Inventory
  - Hybrid Activations
  - Session Manager
  - Run Command
  - State Manager
  - Patch Manager
  - Distributor

## How Systems Manager works

- We need to install the SSM agent onto the systems we control
- Installed by default on Amazon Linux 2 AMI and some Ubuntu AMI
- If an instance can't be controlled with SSM, it's probably an issue with the SSM agent or IAM permissions
- Make sure the EC2 instances have proper IAM role to allow SSM actions

# AWS Tags

- You can add text key-value pairs called Tags to many AWS resources
- Commonly used in EC2
- Free naming, common tags are Name, Environment, Team ...
- They're used for
  - Resource grouping
  - Automation
  - Cost allocation
- Better to have too many tags than too few

# Resource Groups

- Create, view or manage logical group of resources thanks to tags
- Allows creation of logical groups of resources such as
  - Applications
  - Different layers of an application stack
  - Production versus development environments
- Regional service
- Works with EC2, S3, DynamoDB, Lambda, etc...

# SSM - Documents

- Documents can be in JSON or YAML
- You define parameters
- You define actions
- Many documents already exist in AWS

# SSM - Run Command

- Execute a document (=script) or just run a command
- Run command across multiple instances (using resource groups)
- Rate Control / Error Control
- Integrated with IAM and CloudTrail
- No need for SSH
- Command output can be shown in the Console, sent to S3 bucket or CloudWatch logs
- Send notifications to SNS about command status (In progress, Success, Failed)
- Can be invoked using EventBridge

# SSM - Automation

- Simplifies common maintenance and deployment tasks of EC2 instances and other AWS resources
- Example: restart instances, create an AMI, EBS snapshot
- Automation Runbook
  - SSM Documents of type Automation
  - Defines actions preformed on your EC2 instances or AWS resources
  - Pre-defined runbooks (AWS) or create custom runbooks
- Can be triggered
  - Manually using AWS Console, AWS CLI or SDK
  - By Amazon EventBridge
  - On a schedule using Maintenance Windows
  - By AWS Config for rules remediation's

# SSM - Parameter Store

- Secure storage for configuration and secrets
- Optional Seamless Encryption using KMS
- Serverless, scalable, durable, easy SDK
- Version tracking of configurations / secrets
- Security through IAM
- Notifications with Amazon EventBridge
- Integration with CloudFormation

## SSM Parameter Store Hierarchy

- /my-department/
  - my-app/
    - dev/
      - db-url
      - db-password
    - prod/
      - db-url
  - other-app/
- /other-department
- /aws/reference/secretsmanager/secret_ID_in_Secrets_Manager
- /aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2 (public)

## Standard and advanced parameter tiers

|                                                                 | Standard             | Advanced                               |
| --------------------------------------------------------------- | -------------------- | -------------------------------------- |
| Total number of parameters allowed (per AWS account and Region) | 10,000               | 100,000                                |
| Maximum size of a parameter value                               | 4 KB                 | 8 KB                                   |
| Parameter policies available                                    | No                   | Yes                                    |
| Cost                                                            | No additional charge | Charges apply                          |
| Storage Pricing                                                 | Free                 | $0.05 per advanced parameter per month |

## Parameters Policies (for advanced parameters)

- Allow to assign a TTL to a parameter (expiration date) to force updating or deleting sensitive data such as passwords
- Can assign multiple policies at a time

**Expiration (to delete a parameter)**

```json
{
  "Type": "Expiration",
  "Version": "1.0",
  "Attributes": {
    "Timestamp": "2020-12-02T21:34:33.000Z"
  }
}
```

**ExpirationNotification (EventBridge)**

```json
{
  "Type": "ExpirationNotification",
  "Version": "1.0",
  "Attributes": {
    "Before": "15",
    "Unit": "Days"
  }
}
```

**NoChangeNotification (EventBridge)**

```json
{
  "Type": "NoChangeNotification",
  "Version": "1.0",
  "Attributes": {
    "After": "20",
    "Unit": "Days"
  }
}
```

# SSM - Inventory

- Collect metadata from your managed instances (EC2/On-premises)
- Metadata includes installed software, OS drivers, configurations, installed updates, running services...
- View data in AWS Console or store in S3 and query and analyze using Athena and QuickSight
- Specify metadata collection interval (minutes, hours, days)
- Query data from multiple AWS accounts and regions
- Create Custom Inventory for your custom metadata (e.g., rack location of each managed instance)

## SSM - State Manager

- Automate the process of keeping your managed instances (EC2/On-premises) in a state that you define
- Use cases: bootstrap instances with software, path OS/Software updates on a schedule
- State Manager Association:
  - Defines the state that you want to maintain to your managed instances
  - Example: port 22 must be closed, antivirus must be installed...
  - Specify a schedule when this configuration is applied
- Uses SSM Documents to create an Association (e.g., SSM Document to configure CW Agent)

## SSM - Patch Manager

- Automates the process of patching managed instances
- OS updates, applications updates, security updates,...
- Supports both EC2 instances and on-premises servers
- Supports Linux, MacOS, and Windows
- Patch on-demand or on a schedule using Maintenance Windows
- Scan instances and generate patch compliance report (missing patches)
- Patch compliance report can be sent to S3

- Patch Baseline
  - Defines which patches should and shouldn't be installed on your instances
  - Ability to create custom Patch Baselines (specify approved/rejected patches)
  - Patches can be auto-approved within days of their release
  - By default, install only critical patches and patches related to security
- Patch Group
  - Associate a set of instances with a specific Patch Baseline
  - Example: create Patch Groups for different environments (dev, test, prod)
  - Instances should be defined with the tag key Patch Group
  - An instance can only be in one Patch Group
  - Patch Group can be registered with only one Patch Baseline

# SSM - Patch Manager Patch Baselines

- Pre-Defined Patch Baseline
  - Managed by AWS for different Operating Systems (can't be modified)
  - AWS-RunPatchBaseline (SSM Document) - apply both operating system and application patches (Linux, macOS, Windows Server)
- Custom Patch Baseline
  - Create your own Patch Baseline and choose which patches to auto-approve
  - Operating System, allowed patches, rejected patches, ...
  - Ability to specify custom and alternative patch repositories

# SSM - Maintenance Windows

- Defines a schedule for when to perform actions on your instances
- Example: OS patching, updating drivers, installing software, ...
- Maintenance Windows contains
  - Schedule
  - Duration
  - Set of registered instances
  - Set of registered tasks

# SSM - Session Manager

- Allows you to start a secure shell on your EC2 and on-premises servers
- Access through AWS Console, AWS CLI, or Session Manager SDK
- Does not need SSH access, bastion hosts, or SSH keys
- Supports Linux, macOS, and Windows
- Log connections to your instances and executed commands
- Session log data can be sent to S3 or CloudWatch Logs
- CloudTrail can intercept StartSession events
- IAM Permissions
  - Control which users/groups can access Session Manager and which instances
  - Use tags to restrict access to only specific EC2 instances
- Optionally, you can restrict commands a user can run in a session

# Unified CloudWatch Agent

- For virtual servers (EC2 instances, on-premises servers, ...)
- Collect additional system-level metrics such as RAM, processes, used disk space, etc.
- Collect logs to send to CloudWatch Logs
  - No logs from inside your EC2 instance will be sent to CloudWatch Logs without using an agent
- Centralized configuration using SSM Parameter Store
- Make sure IAM permissions are correct
- Default namespace for metrics collected by the Unified CloudWatch agent is CWAgent (can be configured/changed)

# Unified CloudWatch Agent - procstat Plugin

- Collect metrics and monitor system utilization of individual processes
- Supports both Linux and Windows servers
- Example: amount of time the process uses CPU, amount of memory the process uses, ...
- Select which processes to monitor by
  - pid_file: name of process identification number (PID) files they create
  - exe: process name that match string you specify (RegEx)
  - pattern: command lines used to start the processes (RegEx)
- Metrics collected by procstat begins with "procstat" prefix (e.g., procstat_cpu_time, procstat_cpu_usage, ...)

# Unified CloudWatch Agent - Troubleshooting

- CloudWatch Agent Fails to Start
  - Might be an issue with the configuration file
  - Check configuration file logs at /opt/aws/amazon-cloudwatch-agent/logs/configuration-validation.log
- Can't Find Metrics Collected by the CloudWatch Agent
  - Check you're using the correct namespace (default: CWAgent)
  - Check the configuration file amazon-cloudwatch-agent.json

```json
"agent": {
 "metrics_collection_interval": 60,
 "region": "us-east-1",
 "logfile": "/opt/aws/amazon-cloudwatch-agent/logs/amazon-cloudwatch-agent.log",
 "debug": true,
 "run_as_user": "cwagent"
}
```

- CloudWatch Agent Not pushing log events

  - Update to the latest CloudWatch Agent version
  - Test connectivity to the CloudWatch logs endpoint
    "logs.<region>.amazonaws.com" (check SGs, NACLs, VPC endpoints)
  - Review account, region, and log group configurations
  - Check IAM Permissions
  - Verify the system time on the instance is correctly configured

- Check CloudWatch Agent logs at /opt/aws/amazon-cloudwatch-agent/logs/amazon-cloudwatch-agent.log

# CloudWatch Logs

- Log groups: arbitrary name, usually representing an application
- Log stream: instances within application / log files / containers
- Can define log expiration policies (never expire, 1 day to 10 years)
- CloudWatch Logs can send logs to:
  - Amazon S3 (exports)
  - Kinesis Data Streams
  - Kinesis Data Firehose
  - AWS Lambda
  - OpenSearch Service (formerly Elasticsearch Service)
- Logs are encrypted by default
- Can setup KMS-based encryption with your own keys

# CloudWatch Logs - Sources

- SDK, CloudWatch Logs Agent, CloudWatch Unified Agent
- Elastic Beanstalk: collection of logs from application
- ECS: collection of logs from containers
- Lambda: collection of logs from functions
- VPC Flow Logs: collection of logs from VPC
- CloudTrail: collection of logs from API calls
- Route 53: collection of logs from DNS queries
- Amazon API Gateway: collection of logs from API calls

# CloudWatch Logs Insights

- Search and analyze log data stored in CloudWatch Logs
- Example: find a specific IP inside a log, count occurrences of "ERROR" in your logs..
- Provides a purpose-built query language
  - Automatically discovers fields from AWS services and JSON log events
  - Fetch desired event fields, filter based on conditions, calculate aggregate statistics, sort events, limit number of events...
  - Can save queries and add them to CloudWatch Dashboards
- Can query multiple Log Groups in different AWS accounts
- It's a query engine, not a real-time engine

# CloudWatch Logs - S3 Export

- Log data can take up to 12 hours to become available for export
- The API call is CreateExportTask
- Not near-real time or real-time...use Logs Subscriptions instead

# CloudWatch Logs Subscriptions

- Get a real-time log events from CloudWatch Logs for processing and analysis
- Send to Kinesis Data Streams, Kinesis Data Firehose, or Lambda

# CloudWatch Alarms

- Alarms are used to trigger notifications for any metric
- Various options (sampling, %, max, min, etc...)
- Alarm States:
  - OK: metric is within the defined threshold
  - ALARM: metric is outside the defined threshold
  - INSUFFICIENT_DATA: not enough data to determine the state of the alarm
- Period:
  - Length of time in seconds to evaluate the metric
  - High resolution custom metrics: 10 sec, 30 sec or multiples of 60 sec

# CloudWatch Alarm Targets

- Stop, Terminate, Reboot, or Recover an EC2 instance
- Trigger Auto Scaling Action
- Send notification to SNS (from which you can send email, SMS, Lambda, HTTP/S, SQS, Step Functions, Chime, Slack, ...)

# CloudWatch Alarms - Composite Alarms

- CloudWatch Alarms are on a single metric
- Composite Alarms are monitoring the states of multiple other alarms
- AND and OR conditions
- Helpful to reduce "alarm noise" by creating complex composite alarms

# EC2 Instance Recovery

- Status Check:
  - Instance status = check the EC2 VM
  - System status = check the underlying hardware
  - Attached EBS status = check attached EBS volumes
- Recovery: Same Private, Public, Elastic IP, metadata, placement group

# CloudWatch Alarm: good to know

- Alarms can be created based on CloudWatch Logs Metrics Filters
- To test alarms and notifications, set the alarm state to Alarm using CLI
  ```bash
  aws cloudwatch set-alarm-state --alarm-name MyAlarm --state-value ALARM --state-reason "Testing alarm state"
  ```

# CloudWatch - Contributed Insights (Metrics)

- Analyze log data and create time series that display contributor data
- Helps you find top talkers and understand who/what is impacting system performance
- Example: find bad hosts, identify the heaviest network users, find the URLs that generate the most errors
- Works for any AWS-generated logs (VPC, DNS, etc...)
- Built-in rules created by AWS (leverages your CW Logs) or build your own rules

# Amazon EventBridge (formerly CloudWatch Events)

- Schedule: Cron jobs (scheduled scripts)
- Event Pattern: Event rules to react to a service doing something
- Trigger Lambda functions, send SQS/SNS messages...

- Event buses can be accessed by other AWS accounts using Resource-based Policies
- You can archive events (all/filter) sent to an event bus (indefinitely or set period)

# Amazon EventBridge - Schema Registry

- EventBridge can analyze the events in your bus and infer the schema
- The Schema Registry allows you to generate code for your application, that will know in advance how data is structured in the event bus

# Amazon EventBridge - Resource based Policy

- Manage permissions for a specific Event Bus
- Example: allow/deny events from another AWS account or AWS region
- Use case: aggregate all events from your AWS Organization in a single AWS account or AWS region

# Amazon Athena

- Serverless query service to analyze data stored in Amazon S3
- Uses standard SQL language to query the files (built on Presto)
- Supports CSV, JSON, ORC, Avro, and Parquet
- Commonly used with Amazon Quicksight for reporting/dashboards
- Use cases: Business intelligence / analytics / reporting, analyze and query VPC Flow Logs, ELB Logs, CloudTrail trails, etc...
- Exam Tip: Analyze data in S3 using serverless SQL, use Athena

# Amazon Athena - Performance Improvement

- Use columnar data for cost-savings (less scan)
  - Apache Parquet or ORC is recommended
  - Huge performance improvement
  - Use Glue to convert your data to Parquet or ORC
- Compress data for smaller retrievals (bzip2, gzip, lz4, snappy, zlip, zstd...)
- Partition datasets in S3 for easy querying on virtual columns
  - s3://yourBucket/pathToTable/<PARTITION_COLUMN_NAME>=<VALUE>...
  - Example: s3://athena-examples/flight/parquet/year=1991/month-1/day=1/
- Use larger files (> 128 MB) to minimize overhead

# Amazon Athena - Federated Query

- Allows you to run SQL queries across data stored in relational, non-relational, object, and custom data sources (AWS or on-premises)
- Uses Data Source Connectors that run on AWS Lambda to run Federated Queries (e.g., CloudWatch Logs, DynamoDB, RDS,...)
- Store the results back in Amazon S3

# Amazon Athena - Troubleshooting

- Insufficient Permissions When using Athena with QuickSight
  - Validate QuickSight can access S3 buckets used by Athena
  - If the data in the S3 buckets is encrypted using AWS KMS key (SSE-KMS), then QuickSight IAM role must be granted access to decrypt with the key (kms:Decrypt)
    - arn:aws:iam::<account_id>:role/service-role/aws-quicksight-s3-consumers-role-v0 (Default)
    - arn:aws:iam::<account_id>:role/service-role/aws-quicksight-service-role-v0

# AWS CloudTrail

- Provides governance, compliance and audit for your AWS account
- CloudTrail is enabled by default
- Get a history of events / API calls made within your AWS Account by:

  - AWS Management Console
  - AWS SDKs
  - Command Line Tools
  - Other AWS Services

- Can put logs from CloudTrail into CloudWatch Logs or S3
- A trail can be applied to All Regions (default) or a single Region
- If a resource is deleted in AWS, investigate CloudTrail first

# CloudTrail Events

- Management Events:
  - Operations that are performed on resources in your AWS account
  - Examples:
    - Configuring security (IAM AttachRolePolicy)
    - Configuring rules for routing data (Amazon EC2 CreateSubnet)
    - Setting up logging (AWS CloudTrail CreateTrail)
  - By default, trails are configured to log management events
  - Can separate Read Events (that don't modify resources) from Write Events (that may modify resources)
- Data Events:
  - By default, data events are not logged (because high volume operations)
  - Amazon S3 object-level activity (ex: GetObject, DeleteObject, PutObject): can separate Read and Write Events
  - AWS Lambda function execution activity (the Invoke API)

# CloudTrail Insights

- Enable CloudTrail Insights to detect unusual activity in your account:
  - inaccurate resource provisioning
  - hitting service limits
  - Bursts of AWS IAM actions
  - Gaps in periodic maintenance activity
- CloudTrail Insights analyzes normal management events to create a baseline
- Then continuously analyzes write events to detect unusual patters
  - Anomalies appear in the CloudTrail console
  - Event is sent to Amazon S3
  - An EventBridge event is generated (for automation needs)

# CloudTrail Events Retention

- Events are stored for 90 days in CloudTrail
- To keep events beyond this period, log them to S3 and use Athena

# CloudTrail - Log File Integrity Validation

- Digest Files:
  - References the log files for the last hour and contains a hash of each
  - Stored in the same S3 bucket as log files (different folder)
- Helps you determine whether a log file was modified/deleted after CloudTrail delivered it
- Hashing using SHA-256, Digital Signing using SHA-256 with RSA
- Protect the S3 bucket using bucket policy, versioning, MFA Delete protection, encryption, object lock
- Protect CloudTrail using IAM

# CloudTrail - Integration with EventBridge

- Used to react to any API call being made in your account
- CloudTrail is not "real-time":
  - Delivers an event within 15 minutes of an API call
  - Delivers log files to an S3 bucket every 5 minutes

# CloudTrail - Organizations Trails

- A trail that will log all events for all AWS accounts in an AWS Organization
- Log events for management and member accounts
- Trail with the same name will be created in every AWS account (IAM permissions)
- Member accounts can't remove or modify the organization trail (view only)

# CloudTrail - Integration with Athena

- You can use Athena to directly query CloudTrail Logs stored in S3
- Example: analyze operational activity for security and compliance
- Can create Athena table directly from the CloudTrail Console, then specify the S3 bucket location where the CloudTrail logs are stored

# Monitor Account Activity

- AWS Config Configuration History
  - Must have AWS Config Configuration Recorder on
- CloudTrail Event History
  - Search API history for past 90 days
  - Filter by resource name, resource type, event name, ...
  - Filter by IAM user, assumed IAM role session name, or AWS Access Key
- CloudWatch Logs Insights
  - Search API history beyond the past 90 days
  - CloudTrail Trail must be configured to send logs to CloudWatch Logs
- Athena Queries
  - Search API history beyond the past 90 days

# Amazon Macie

- Amazon Macie is a fully managed data security and data privacy service that uses machine learning and pattern matching to discover and protect your sensitive data in AWS.
- Macie helps identify and alert you to sensitive data, such as personally identifiable information (PII)

# AWS Macie - Data Identifiers

- Used to analyze and identify sensitive data in your S3 buckets
- Managed Data Identifier
  - A set of built-in criteria that are designed to detect specific type of sensitive data
  - Examples: credit card numbers, AWS Credentials, bank accounts
- Custom Data Identifier
  - A set of criteria that you define to detect sensitive data
  - Regular expression, keywords, proximity rule
  - Examples: employee IDs, customer account numbers

# AWS Macie - Findings

- A report of a potential issue or sensitive data that Macie found
- Each finding has a severity rating, affected resource, datetime, ...
- Sensitive Data Discovery Result
  - A record that logs details about the analysis of an S3 object
  - Configure Macie to store the results in S3, then query using Athena
- Suppression Rules - set of attribute-based filter criteria to archive findings automatically
- Findings are stored for 90 days
- Review findings using AWS console, EventBridge, Security Hub

# AWS Macie - Finding Types

- Policy Findings
  - A detailed report of policy violation or issue with the security of S3 bucket
  - Examples: default encryption is disabled, bucket is public,...
  - Policy: IAMUser/S3BucketEncryptionDisabled, Policy:IAMUser/S3BucketPublic
  - Detect changes only after you enable Macie
- Sensitive Data Findings
  - A detailed report of sensitive data that's found in S3 buckets
  - Examples: Credentials (private keys), Financial (credit card numbers),...
  - SensitiveData:S3Object/Credentials, SensitiveData:S3Object/Financial
  - For Custom Data Identifier SensitiveData:S3Object/CustomIdentifier

# AWS Macie - Multi-Account Strategy

- You can manage multiple accounts in Macie
- Associate the Member accounts with the Administrator account
  - Through an AWS Organization
  - Sending invitation through Macie
  - Supports Delegated Administrator in an AWS Organization
- Administrator account can:
  - Add and remove member accounts
  - Have access to all S3 sensitive data and settings for all accounts
  - Manage Automated Sensitive Data Discovery and run Data Discovery jobs
  - Manage Data Identifiers and Findings

# S3 Event Notifications

- S3:ObjectCreated, S3:ObjectRemoved, S3:ObjectRestore, S3:Replication...
- Object name filtering possible (\*.jpg)
- Use case: generate thumbnails of images uploaded to S3
- Can create as many "S3 events" as desired
- S3 event notifications typically deliver events in seconds but can sometimes take a minute or longer

# S3 Event Notifications with Amazon EventBridge

- Advanced filtering options with JSON rules (metadata, object size, name...)
- Multiple Destinations - ex Step Functions, Kinesis Streams / Firehose ...
- EventBridge Capabilities - Archive, Replay Events, Reliable delivery

# VPC Flow Logs

- Capture information about IP traffic going into your interfaces:
  - VPC Flow Logs
  - Subnet Flow Logs
  - Elastic Network Interface (ENI) Flow Logs
- Helps to monitor and troubleshoot connectivity issues
- Flow logs data can go to S3, CloudWatch Logs, and Kinesis Data Firehose
- Captures network information from AWS managed interfaces too: ELB, RDS, ElasticCache, Redshift, WorkSpaces, NATGW, Transit Gateway...

# VPC Flow Logs Syntax

![AWS Security Specialty](2019-08-13_10-41-04.png)

- srcaddr and dstaddr -- help identify problematic IP
- srcport and dstport -- help identify problematic ports
- Action - success or failure of the request due to Security Group or NACL
- Can be used for analytics on usage patterns, or malicious behavior
- Query VPC flow logs using Athena on S3 or CloudWatch Logs Insights

# VPC Flow Logs - Traffic not captured

- Traffic to Amazon DNS server (custom DNS server traffic is logged)
- Traffic for Amazon Windows license activation
- Traffic to and from 169.254.169.254 for EC2 instance metadata
- Traffic to and from 169.254.169.123 for Amazon Time Sync service
- DHCP traffic
- Mirrored traffic
- Traffic to the VPC router reserved IP address (e.g., 10.0.0.1)
- Traffic between VPC Endpoint ENI and Network Load Balancer ENI

# VPC - Traffic Mirroring

- Allows you to capture and inspect network traffic in your VPC
- Route the traffic to security appliances that you manage
- Capture the traffic
  - From (Source) - ENIs
  - To (Targets) - an ENI or a Network Load Balancer
- Capture all packets or capture the packets of your interest (optionally, truncate packets)
- Source and Target can be in the same VPC or different VPCs (VPC Peering)
- Use cases: content inspection, threat monitoring, troubleshooting,...

# VPC Network Access Analyzer

- Helps you understand potential network paths to/from your resources
- Define Network Access Requirements
  - Example: identify publicly available resources
- Evaluate against them and find issues / demonstrate compliance
  - Evaluate network access to resources in your VPCs (Ec2, RDS, Aurora, OpenSearch, Redshift, ElastiCache, Lambda, ECS, EKS, ...)
  - Match against the configurations of your VPC resources (SG, NACL, NATGW, IGW...)
- Network Access Scope - json document contains conditions to define your network security policy (e.g. detect public databases)

# Route 53 -- DNS Query Logging

- Log information about public DNS queries Route 53 Resolver receives
- Only for Public Hosted Zones
- Logs are sent to CloudWatch Logs only

# Route 53 -- Resolver Query Logging

- Logs all DNS queries...
  - Made by resources within a VPC (EC2, Lambda, etc...)
  - From on-premises resources that are using Resolver Inbound Endpoints
  - Leveraging Resolvers Outbound Endpoints
  - Using Resolver DNS Firewall
- Can send logs to CloudWatch Logs, S3 bucket, or Kinesis Data Firehose
- Configurations can be shared with other AWS Accounts using AWS Resource Access Manager (RAM)

# Amazon OpenSearch Service

- Amazon OpenSearch is successor to Amazon Elasticsearch Service
- In DynamoDB, queries only exist by primary key or indexes...
- With OpenSearch, you can search any field, even partially matches
- It's common to use OpenSearch as a complement to another database
- Two modes: managed cluster or serverless cluster
- Does not natively support SQL (can be enabled via a plugin)
- Ingestion from Kinesis Data Firehose, AWS IoT, and CloudWatch Logs
- Security through Cognito and IAM, KMS encryption, TLS
- Comes with OpenSearch Dashboards (visualization)

# OpenSearch - Public Access

- Accessible from the Internet with a public endpoint
- Restrict access using Access Policies, Identity-based Policies, and IP-based Policies

# OpenSearch - VPC Access

- Specify VPC, Subnets, Security Groups, and IAM Role
- VPC Endpoints and ENIs will be created (IAM Role)
- You need to use VPN, Transit Gateway, managed network, or proxy server to connect to the domain
- Restrict access using Access Policies and Identity-base Policies

# Bastion Hosts

- We can use a Bastion Host to SSH into our private EC2 instances
- The bastion is in the public subnet which is then connected to all other private subnets
- Bastion Host security group must allow inbound from the internet on port 22 from restricted CIDR, for example the public CIDR of your corporation
- Security Group of the EC2 instances must allow the security group of the bastion host, or the private IP of the bastion host

# AWS Site-to-Site VPN

- Virtual Private Gateway (VGW)
  - VPN concentrator on the AWS side of the VPN connection
  - VGW is created and attached to the VPC from which you want to create the Site-to-Site VPN connection
  - Possibility to customize the ASN (Autonomous System Number) of the VGW
- Customer Gateway (CGW)
  - Physical device or software application on your side of the VPN connection
  - CGW is created and configured with the public IP address of your customer gateway device
  - Possibility to customize the ASN (Autonomous System Number) of the CGW

# Site-to-Site VPN Connections

- Customer Gateway Device (on-premises)
  - What IP address to use?
    - Public Internet-routable IP address for your Customer Gateway device
    - If it's behind a NAT device that's enabled for NAT traversal (NAT-T), use the public IP address of the NAT device
    - Important step: enable Route Propagation for the Virtual Private Gateway in the route table that is associated with your subnets
    - If you need to ping your EC2 instances from on-premises, make sure you add the ICMP protocol on the inbound of your security groups

# AWS VPN CloudHub

- Provides secure communication between multiple sites, if you have multiple VPN connections
- Low-cost hub-and-spoke model for primary or secondary network connectivity between different locations (VPN only)
- It's a VPN connection so it goes over the public internet
- To set it up, connect multiple VPN connections on the same VGW, setup dynamic routing and configure route tables

# AWS Client VPN

- Connect from your computer using OpenVPN to your private network in AWS and on-premises
- Allow you to connect to your EC2 instances over a private IP (just as if you were in the private VPC network)
- Goes over public internet

# ClientVPN - Authentication Types

- Active Directory Authentication
  - Authenticate against Microsoft Active Directory (User-Based)
  - AWS Managed Microsoft AD or on-premises AD through AD Connector
  - Supports MFA
- Mutual Authentication
  - Authenticate using client certificates (Device-Based)
  - Client certificate must be signed by a trusted CA
  - Must upload the server certificate to AWS Certificate Manager (ACM)
  - One client certificate per user (recommended)
- Single Sign-On (supports IAM identity Center / AWS SSO)
  - Authenticate against SAML 2.0-based identity providers (User-based)
  - Establish trust relationship between AWS and the identity provider
  - Only one identity provider at a time

# VPC Peering

- Privately connect two VPCs using AWS network
- Make them behave as if they were in the same network
- Must not have overlapping CIDRs
- VPC Peering connection is NOT transitive (must be established for each VPC that needs to communicate with one another)
- You must update route tables in each VPC's subnets to ensure EC2 instances can communicate with each other
- You can create VPC Peering connection between VPCs in different AWS accounts/regions
- You can reference a security group in a peered VPC (works cross accounts - same region)

# DNS Resolution in VPC

- DNS Resolution (enableDnsSupport)
  - Decides if DNS resolution from Route 53 Resolver server is supported for the VPC
  - True (default): it queries the Amazon Provider DNS server at 169.254.168.253 or the reserved IP address at the base of the VPC IPv4 network range plus two (.2)
- DNS Hostname (enableDnsHostnames)
  - By default,
    - True => default VPC
  - Won't do anything unless enableDnsSupport=true
  - IfTrue, assigns public hostname to EC2 instance if it has a public IPv4
- If you use custom DNS domain names in a Private Hosted Zone in Route 53, you must set both these attributes (enableDnsSupport and enableDnsHostname) to true

# VPC Endpoints

- Endpoints allow you to connect to AWS Services using a private network instead of the public www network
- They scale horizontally and are redundant
- No more IGW, NAT, etc...to access AWS Services
- VPC Endpoint Gateway (S3 and DynamoDB)
- VPC Endpoint Interface (all services except DynamoDB)
- In case of issues:
  - Check DNS setting resolution in your VPC
  - Check Route Tables

# VPC Endpoint Gateway

- Only works for S3 and DynamoDB, must create one gateway per vpc
- Must update route tables entries (no security groups)
- Gateway is defined at the VPC level
- DNS resolution must be enabled in the VPC
- The same public hostname for S3 can be used
- Gateway endpoint cannot be extended out of a VPC (VPN, DX, TGW, peering)

# VPC Endpoint Interface

- Provision an ENI that will have a private endpoint interface hostname
- Leverage Security Groups for security
- Private DNS (setting when you create the endpoint)
  - The public hostname of a service will resolve to the private Endpoint Interface hostname
  - VPC Setting: "Enable DNS hostnames" and "Enable DNS Support" must be 'true'
- Interface can be accessed from Direct Connect and Site-to-Site VPN

# VPC Endpoint Policy

example:

```json
{
  "version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "StringEquals": {
          "aws:SourceVpce": "vpce-1234567890abcdef0"
        }
      }
    }
  ]
}
```

- Controls which AWS principals (AWS accounts, IAM users, IAM Roles) can use the VPC Endpoint to access AWS services
- Can be attached to both Interface Endpoint and Gateway Endpoint
- Can restrict specific API calls on specific resources
- Doesn't override or replace Identity-based Policies or service-specific policies (e.g, S3 bucket policies)
- Note: can use aws:PrincipalOrgId to restrict access only within the Organization

# VPC Endpoint - API Gateway

- Private REST APIs can only be accessed using VPC Interface Endpoint
- VPC Endpoint Policies can be used together with API Gateway resource policies
- Restrict access to your private APIs from VPC and VPC Endpoints using resource policies (aws:SourceVpc and aws:SourceVpce)

# Exposing services in your VPC to other VPC

- Option 1: make it public

  - Goes through the public internet (www)
  - Tough to manage access

- Option 2: VPC Peering

  - Create a VPC Peering connection between the two VPCs
  - Must update route tables in each VPC's subnets to ensure EC2 instances can communicate with each other
  - Not transitive (must be established for each VPC that needs to communicate with one another)
  - Can reference a security group in a peered VPC (works cross accounts - same region)

- Option 3: VPC Endpoint Services (PrivateLink)
  - Create a VPC Endpoint Interface for the service you want to expose
  - Use Security Groups to control access
  - Private DNS (setting when you create the endpoint)
    - The public hostname of a service will resolve to the private Endpoint Interface hostname
    - VPC Setting: "Enable DNS hostnames" and "Enable DNS Support" must be 'true'
  - Interface can be accessed from Direct Connect and Site-to-Site VPN
  - Most secure and scalable way to expose a service to 1000s of VPCs
  - Requires a Network Load Balancer (NLB) in the service VPC
  - If the NLB is in multiple AZ, and the ENIs in multiple AZ, the solution is fault tolerant

# Network Access Control List (NACL)

- NACLs are like firewalls which control traffic from and to subnets
- One NACL per subnet, new subnets are assigned the Default NACL
- You define NACL Rules:
  - Rules have a number (1-32766), higher precedence with a lower number
  - First rule match will drive the decision
  - Example: if you define #100 ALLOW 10.0.0.10/32 and #200 DENY 10.0.0.10/32, the IP address will be allowed because 100 has a higher precedence over 200
  - The last rule is an asterisk (\*) and denies a request in case of no rule match
  - AWS recommends adding rules by increment of 100
- Newly created NACLs will deny everything
- NACLs are a great way of blocking a specific IP address at the subnet level

# Default NACL

- Accepts everything inbound/outbound with the subnets it's associated with
- Do NOT modify the Default NACL, instead create custom NACLs

# Ephemeral Ports

- For any two endpoints to establish a connection, they must use ports
- Clients connect to a defined port, and expect a response on an ephemeral port
- Different Operating Systems use different port ranges, examples:
  - IANA and MS Windows 10 -> 49152 - 65535
  - Many Linux Kernels -> 32768 - 60999

# Security Groups - Outbound Rules

- Default is allowed 0.0.0.0/0 anywhere
- But we can remove and just allow specific prefixes

# Managed Prefix List

- A set of one or more CIDR blocks
- Makes it easier to configure and maintain Security Groups and Route Tables
- Customer-Managed Prefix List
  - Set of CIDRs that you define and managed by you
  - Can be shared with other AWS accounts or AWS Organization
  - Modify to update many Security Groups to once
- AWS-Managed Prefix List
  - Set of CIDRs for AWS services
  - You can't create, modify, share, or delete them
  - S3, CloudFront, DynamoDB, Ground Station...

# Security Groups - Extras

- Modifying Security Group Rule NEVER disrupts its tracked connections
- Existing connections are kept until they time out
- Use NACLs to interrupt/block connections immediately

# Transit gateway

- For having transitive peering between thousands of VPC and on-premises, hub-and-spoke (star) connection
- Regional resource, can work cross-region
- Share cross-account using Resource Access Manager (RAM)
- You can peer Transit Gateways across regions
- Route Tables: limit which VPC can talk with other VPC
- Works with Direct Connect Gateway, VPN connections
- Supports IP multicast (not supported by any other AWS service)

# Transit Gateway: Site-to-Site VPN ECMP

- ECMP = Equal Cost Multi-Path Routing
- Routing strategy to allow to forward a packet over multiple best path
- Use case: create multiple Site-to-Site VPN connections to increase the bandwidth of your connection to AWS

# AWS CloudFront

- Content Delivery Network (CDN) to deliver content with low latency and high transfer speeds
- Improves read performance, content is cached at the edge
- Improves users experience
- 216 Point of Presence globally (edge locations)
- DDoS protection (because worldwide), integration with Shield, AWS Web Application Firewall

# CloudFront - Origins

- S3 bucket
  - For distributing files and caching them at the edge
  - For uploading files to S3 through CloudFront
  - Secured using Origin Access Control (OAC)
- VPC Origin
  - For applications hosted in VPC private subnets
  - Application Load Balancer / Network Load Balancer / EC2 Instances
    Custom Origin (HTTP)
  - S3 website (must first enable the bucket as a static S3 website)
  - Any public HTTP backend you want

# CloudFront vs S3 Cross Region Replication

- CloudFront:
  - Global Edge network
  - Files are cached for a TTL (maybe a day)
  - Great for static content that must be available everywhere
- S3 Cross Region Replication:
  - must be setup for each region you want replication to happen
  - Files are updated in near real-time
  - Read only
  - Great for dynamic content that needs to be available at low-latency in few regions

# CloudFront Geo Restriction

- You can restrict who can access your distribution
  - Allowlist: Allow your users to access your content only if they're in one of the countries on a list of approved countries
  - Blocklist: Prevent your users from accessing your content if they're in one of the countries on a list of banned countries
- The "country" is determined using a 3rd party Geo-IP database
- Use case: Copyright Laws to control access to content

# CloudFront Signed URL / Signed Cookies

- You want to distribute paid shared content to premium users over the world
- We can use CloudFront Signed URL / Cookie. We attach a policy with:
  - Includes URL expiration
  - Includes IP ranges to access the data from
  - Trusted signers (which AWS accounts can create a signed URL)
- How long should the URL be valid for?
  - Shared content (movie, music): make it short (a few minutes)
  - Private content (private to the user): you can make it last for years
- Signed URL = access to individual files (one signed URL per file)
- Signed Cookie = access to multiple files (one signed cookie for many files)

# CloudFront Signed URL vs S3 Pre-Signed URL

- CloudFront Signed URL:

  - Used to restrict access to content in CloudFront distributions
  - Can include expiration, IP ranges, and trusted signers
  - Ideal for distributing paid or premium content
  - Allow access to a path, no matter the origin
  - Account wide key-pair, only the root can manage it
  - Can filter by IP, path, date, expiration
  - Can leverage caching features

- S3 Pre-Signed URL:
  - Issue a request as the person who pre-signed the URL
  - Uses the IAM key of the signing IAM principal
  - Limited lifetime

# CloudFront Signed URL Process

- Two types of signers:
  - Either a trusted key group (recommended)
    - Can leverage APIs to create and rotate keys (and IAM for API security)
  - An AWS account that contains a CloudFront Key Pair
    - Need to manage keys using the root account and the AWS console
    - Not recommended because you shouldn't use the root account for this
  - In your CloudFront distribution, create one or more trusted key groups
  - You generate your own public / private key
    - The private key is used by your applications (e.g. EC2) to sign URLs
    - The public key (uploaded) is used by CloudFront to verify URLs

# CoudFront - Field Level Encryption

- Protect user sensitive information through application stack
- Adds an additional layer of security along with HTTPS
- Sensitive information encrypted at the edge close to user
- Usage:
  - Specify set of fields in POST requests that you want to be encrypted (up to 10 fields)
  - Specify the public key to encrypt them

# Origin Access Control with SSE-KMS

- OAC supports SSE-KMS natively (as requests are signed with Sigv4)
- Add a statement to the KMS Key Policy to authorize the OAC

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/CloudFrontOriginAccessControlRole",
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": ["kms:Decrypt", "kms:GenerateDataKey*", "kms:Encrypt"],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:SourceArn": "arn:aws:cloudfront::123456789012:origin-access-control/OAID1234567890"
        }
      }
    }
  ]
}
```

# Origin Access Identity with SSE-KMS

- OAI doesn't support SSE-KMS natively (only SSE-S3)
- Use Lambda@Edge to sign requests from CloudFront to S3
- Make sure to disable OAI for this to work

# CloudFront Authorization Header

- Configure CloudFront distribution to forward the Authorization header using Cache Policy
- Not supported for S3 Origins

# CloudFront - Restrict access to ALB

- Prevent direct access to your ALB or Custom Origins (only access through CloudFront)
- First, configure CloudFront to add a Custom HTTP Header for the requests it sends to the ALB
- Second, configure the ALB to only forward requests that contain that Custom HTTP Header
- Keep the custom header name and value secret

# AWS WAF (Web Application Firewall)

- Protects your web applications from common web exploits (Layer 7)
- Deploy on Application Load Balancer (localized rules)
- Deploy on Amazon CloudFront (global or edge location rules)
  - Used to front other solutions: CLB, EC2 instances, custom origins, S3 websites
- Deploy on API Gateway (regional rules or edge level)
- Deploy on AppSync (regional rules, protect your GraphQL APIs)
- Deploy on AWS App Runner (regional rules)
- WAF is not for DDoS protection, use AWS Shield for that
- Define Web ACL (Web Access Control List) to protect your resources
  - Rules can include IP addresses, HTTP headers, HTTP body, or URI strings
  - Protects from common attack - SQL injection and Cross-Site Scripting (XSS)
  - Size constraints, Geo match
  - Rate-based rules (to count occurrences of events)
- Rule Actions: Count | Allow | Block | CAPTCHA | Challenge

# AWS WAF - Managed Rules

- Library of over 190 managed rules
- Ready-to-use rules that are managed by AWS and AWS Marketplace Sellers
- Baseline Rule Groups - general protection from common threats
  - AWSManagedRulesCommonRuleSet, AWSManagedRulesAdminProtectionRuleSet,...
- Use-case Specific Rule Groups - protection for many AWS WAF use cases
  - AWSManagedRulesSQLiRuleSet, AWSManagedRulesWindowRuleSet, AWSManagedRulesPHPRuleSet, AWSManagedRulesWordPressRuleSet,...
- IP Reputation Rule Groups - block requests based on source (e.g., malicious IPs)
  - AWSManagedRulesAmazonIpReputationList, AWSManagedRulesAnonymouslpList
- Bot Control Rule Groups - detect and mitigate bot traffic

# WAF - Web ACL - Logging

- You can send your logs to an:
  - Amazon CloudWatch Logs log group - 5 MB per second
  - Amazon Simple Storage Service (Amazon S3) bucket - 5 minutes interval
  - Amazon Kinesis Data Firehose - limited by Firehose quotas

# AWS Shield: protect from DDoS attack

- DDoS: Distributed Denial of Service - many requests at the same time
- AWS Shield Standard:
  - Free service that is activated for every AWS customer
  - Provides protection from attacks such as SYN/UDP Floods, Reflection attacks and other layer 3/layer 4 attacks
- AWS Shield Advanced:
  - Optional DDoS mitigation service ($3,000 per month per organization)
  - Protect against more sophisticated attack on Amazon EC2, Elastic Load Balancing (ELB), Amazon CloudFront, AWS Global Accelerator, and Route 53
  - 24/7 access to AWS DDoS response team (DRT)
  - Protect against higher fees during usage spikes due to DDoS
  - Shield Advanced automatic application layer DDoS mitigation automatically creates, evaluates and deploys AWS WAF rules to mitigate layer 7 attacks

# AWS Firewall Manager

- Manage rules in all accounts of an AWS Organization
- Security policy: common set of security rules
  - WAF rules (Application Load Balancer, API Gateways, CloudFront)
  - AWS Shield Advanced (ALB, CLB, NLB, Elastic IP, CloudFront)
  - Security Groups for EC2, Application Load Balancer and ENI resources in VPC
  - AWS Network Firewall (VPC Level)
  - Amazon Route 53 Resolver DNS Firewall
  - Policies are created at the region level
  - Rules are applied to new resources as they are created (good for compliance) across all future accounts in your Organization
  - Rules are applied to new resources as they are created (good for compliance) across all and future accounts in your Organization

# WAF vs. Firewall Manager vs. Shield

- WAF, Shield and Firewall Manager are used together for comprehensive protection
- Define your Web ACL rules in WAF
- For granular protection of your resources, WAF alone is the correct choice
- If you want to use AWS WAF across accounts, accelerate WAF configuration, automate the protection of new resources, use Firewall Manager with AWS WAF
- Shield Advanced adds additional features on top of AWS WAF, such as dedicated support from the Shield Response Team (SRT) and advanced reporting.
- If you're prone to frequent DDoS attacks, consider purchasing Shield Advanced

# Shield Advanced CloudWatch Metrics

- Helps you to detect if there's a DDoS attack happening
- DDoSDetected - indicates whether a DDoS event is happening for a specific resource
- DDoSAttackBitsPerSecond - number of bits per second during a DDoS event for a specific resource
- DDoSAttackPacketsPerSecond - number of packets per second during a DDoS event for a specific resource
- DDoSAttackRequestsPerSecond - number of requests per second during a DDoS event for a specific resource

# AWS Best Practices for DDoS Resiliency Edge Location Mitigation (BPI, BP3)

- BPI: CloudFront
  - Web Application delivery at the edge
  - Protect from DDoS Common Attacks (SYN floods, UDP reflection...)
- BPI: Global Accelerator
  - Access your application from the edge
  - Integration with Shield for DDoS protection
  - Helpful if your backend is not compatible with CloudFront
- BP3 - Route 53
  - Domain Name Resolution at the edge
  - DDoS Protection mechanism
- Infrastructure layer defense (BPI, BP3, BP6)
  - Protect Amazon Ec2 against hight traffic
  - That includes using Global Accelerator, Route 53, CloudFront, Elastic Load Balancing
- Amazon EC2 with Auto Scaling (BP7)
  - Helps scale in case of sudden traffic surges including a flash crowd or a DDoS attack
- Elastic Load Balancing (BP6)
  - Elastic Load Balancing scales with the traffic increases and will distribute the traffic to many EC2 instances
- Detect and filter malicious web requests (BPI, BP2)
  - CloudFront cache static content and serve it from edge locations, protecting your backend
  - AWS WAF is used on top of CloudFront and Application Load Balancer to filter and block requests based on request signatures
  - WAF rate-based rules can automatically block the IPs of bad actors
  - Use managed rules on WAF to block attacks based on IP reputation, or block anonymous IPs
  - CloudFront can block specific geographies
- Shield Advanced (BP1, BP2, BP6)
  - Shield Advanced automatic application layer DDoS mitigation automatically creates, evaluates and deploys AWS WAF rules to mitigate layer 7 attacks
- Obfuscating AWs resources (BP1, BP4, BP6)
  - Using CloudFront, API Gateway, Elastic Load Balancing to hide your backend resources (Lambda functions, EC2 instances)
- Security groups and Network ACLs (BP5)
  - Use security groups and NACLs to filter traffic based on specific IP at the subnet or ENI-level
  - Elastic IP are protected by AWS Shield Advanced
- Protecting API endpoints (BP4)
  - Hide EC2, Lambda, elsewhere
  - Edge-optimized mode, or CloudFront+ regional mode (more control for DDoS)
  - WAF + API Gateway: burst limits, headers filtering, use API keys

# AWS API Gateway

- AWS Lambda + API Gateway: No infrastructure to manage
- Support for the websocket protocol
- Handle API versioning (v1, v2...)
- Handle different environments (dev, test, prod...)
- Handle security (Authentication and Authorization)
- Create API keys, handle request throttling
- Swagger / Open API import to quickly define APIs
- Transform and validate requests and responses
- Generate SDK and API specifications
- Cache API responses

# API Gateway - Integrations High Level

- Lambda Function
  - Invoke Lambda function
  - Easy way to expose REST API backed by AWS Lambda
- HTTP
  - Expose HTTP endpoints in the backend
  - Example: internal HTTP API on premise, Application Load Balancer...
  - Why? Add rate limiting, caching, user authentications, API keys, etc...
- AWS Service
  - Expose any AWS API through the API Gateway?
  - Example: start an AWS Step Function workflow, post a message to SQS
  - Why? Add authentication, deploy publicly, rate control...

# API Gateway - AWS Service Integration Kinesis Data Streams example

Client -> API Gateway -> Kinesis Data Streams -> Kineses Data Firehose -> S3

# API Gateway - Endpoint Types

- Edge-Optimized (default): For global clients
  - Requests are routed through the CloudFront Edge locations (improves latency)
- Regional:
  - For clients within the same region
  - Could manually combine with CloudFront (more control over the caching strategies and the distribution)
- Private:
  - Can only be accessed from your VPC using an interface VPC endpoint (ENI)
  - Use a resource policy to define access

# API Gateway - Security

- User Authentication through

  - IAM Roles (useful for internal applications)
  - Cognito (identity for external users - examples mobile users)
  - Custom Authorizer (your own logic)

- Custom Domain Name HTTPS security through integration with AWS
  - Certificate Manager (ACM)
    - If using Edge-Optimized endpoint, then the certificate must be in us-east-1
    - If using Regional endpoint, the certificate must be in the API Gateway region
    - Must setup CNAME or A-alias record in Route 53

# API Gateway - Throttling

- Account Limit
  - API Gateway throttles requests at 10,000 RPS across all APIs
  - Soft limit that can be increased upon request
- In case of throttling => 429 Too Many Requests (retry error)
- Can set stage limit and Method limits to improve performance
- Or you can define usage Plans to throttle per customer

- Note: One API Gateway that is overloaded and not limited can cause the other APIs to be throttled

# AWS Artifact (not really a service)

- Portal that provides customers with on-demand access to AWS compliance documentation and AWS agreements
- Artifact Reports - Allows you to download AWS security and compliance documents from third-party auditors, like AWS ISO certifications, Payment Card Industry (PCI) compliance, System and Organization Control (SOC) reports, FedRAMP, HIPAA, and more
- Artifact Agreements - Allows you to review, accept, and track the status of AWS agreements such as the Business Associate Addendum (BAA) or the Health Insurance Portability and Accountability Act (HIPAA) for an individual account or in your organization
- Can be used to support internal audit or compliance

# DNS Poisoning (DNS Spoofing)

- DNS works on UDP protocol which makes it easy to hack
- There is no cryptographic DNS verification process

# Route 53 - DNS Security Extensions (DNSSEC)

- A protocol for securing DNS traffic, verifies DNS data integrity and origin
- Works only with Public Hosted Zones
- Route 53 supports both DNSSEC for Domain Registration and Signing
- DNSSEC Signing
  - Validate that a DNS response came from Route 53 and has not been tampered with
  - Route 53 cryptographically signs each record in the Hosted Zone
  - Two Keys:
    - Managed by you: Key Signing Key (KSK) - signs the Zone Signing Key (ZSK), based on an asymmetric CMK in AWS KMS
    - Managed by AWS Zone Signing Key (ZSK) - signs the DNS records in the zone
- When enabled, Route 53 enforces a TTL of one week for all records in the Hosted Zone (records that have TTL less than one week are not affected)

# Route 53 - Enable DNSSEC on a hosted zone

- Step 1 - Prepare for DNSSEC signing
  - Monitor zone availability (through customer feedback)
  - Lower TTL for records (recommended 1 hour)
  - Lower SOA minimum for 5 minutes
- Step 2 - Enable DNSSEC signing and create a KSK
  - Enable DNSSEC in Route 53 for your hosted zone (Console or CLI)
  - Make Route 53 create a KSK in the console and link it to a Customer managed CMK
- Step 3 - Establish chain of trust
  - Create a chain of trust between the hosted zone and the parent hosted zone
  - By creating a Delegation Signer (DS) record in the parent zone
  - It contains a hash of the public key used to sign DNS records
  - Your registrar can be Route 53 or a 3rd party registrar
- Step 4 - (good to have) Monitor for errors using CloudWatch Alarms
  - Create CloudWatch alarms for DNSSECInternalFailure and DNSSECKevSigningKeysNeedingAction

# Network Protection on AWS

- To protect network on AWS, we've seen
  - Network Access Control Lists (NACLs)
  - Amazon VPC security groups
  - AWS WAF (protect against malicious requests)
  - AWS Shield and AWS Shield Advanced
  - AWS Firewall Manager (to manage them across accounts)

# AWS Network Firewall

- Protect your entire Amazon VPC
- From Layer 3 to Layer 7 protection
- Any direction, you can inspect

  - VPC to VPC traffic
  - Outbound internet
  - Inbound internet
  - To / from Direct Connect and Site-to-Site VPN

- Internally, the AWS Network Firewall uses the AWS Gateway Load Balancer
- Rules can be centrally managed cross-account by AWS Firewall Manager to apply to many VPCs

# Network Firewall - Fine Grained Controls

- Supports 1000s of rules
  - IP and port - example: 10,000s of IPs filtering
  - Protocol - example: block the SMB protocol for outbound communications
  - Stateful domain list rule groups: only allow outbound traffic to \*.mycorp.com or third-party software repo
  - General pattern matching using regex
- Traffic filtering: Allow, drop, or alert for the traffic that matches the rules
- Active flow inspection to protect against network threats with intrusion-prevention capabilities (like Gateway Load Balancer, but all managed by AWS)
- Send logs of rule matches to Amazon S3, CloudWatch Logs, Kinesis Data Firehose, or Amazon OpenSearch Service

# Network Firewall - Encrypted Traffic

- AWS Network Firewall supports Deep Packet Inspection (DPI) for encrypted traffic Transport Layer Security (TLS)
- It decrypts the TLS traffic, inspects and blocks any malicious content, then re-encrypts the traffic for the destination.
- Integrates with AWS Certificate Manager (ACM)

# Amazon Simple Email Service (Amazon SES)

- Fully managed service to send emails securely, globally and at scale
- Allows inbound/outbound emails
- Reputation dashboard, performance insights, anti-spam feedback
- Provides statistics such as email deliveries, bounces, feedback loop results, email open
- Supports DomainKeys Identified Mail (DKIM) and and Sender Policy Framework (SPF)
- Flexible IP deployment: shared, dedicated, and customer-owned IPs
- Send emails using your application using AWS Console, APIs or SMTP
- Use cases: transactional, marketing and bulk email communications

# Amazon SES - Configuration Sets

- Configuration sets help you customize and analyze your email send events
- Event destinations:
  - Kinesis Data Firehose: receives metric (numbers of sends, deliveries, opens, clicks, bounces, and complaints) for each email
  - SNS: for immediate feedback on bounce and complaint events
- IP pool management: use IP pools to send particular types of emails

# IAM Policy - NotAction with Allow

- Provide access to all the actions in an AWS service, except for the actions specified in NotAction
- Example: allow all actions in the S3 service, except for the PutObject action

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "NotAction": "s3:PutObject",
      "Resource": "*"
    }
  ]
}
```

- Use with the Resource element to provide scope for the policy, limiting the allowed actions
  to the actions that can be performed on the specified resources

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "NotAction": "s3:PutObject",
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    }
  ]
}
```

# IAM Policy - NotAction with Deny

- Use the NotAction element in a statement with "Effect": "Deny" to deny access to all the listed resources except for the actions specified in the NotAction element

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "NotAction": "s3:GetObject",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:SourceVpce": "vpce-1234567890abcdef0"
        }
      }
    }
  ]
}
```

- This combination does not allow the listed items, but instead explicitly denies the actions not listed
- You must still allow explicitly actions that you want to allow

# IAM Policy - Restrict to One Region (NotAction)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "NotAction": [
        "s3:ListBucket",
        "cloudfront:*",
        "iam:*",
        "route53:*",
        "support:*"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "us-west-2"
        }
      }
    }
  ]
}
```

# Principal Options in IAM Policies

- AWS Account and Root User

```json
{
  "Principal": { "AWS": "123456789012" },
  "Principal": { "AWS": "arn:aws:iam::123456789012:root" }
}
```

- IAM Roles

```json
{
  "Principal": { "AWS": "arn:aws:iam::123456789012:role/MyRole" }
}
```

- IAM Role Sessions

```json
{
  "Principal": {
    "AWS": "arn:aws:sts::123456789012:assumed-role/MyRole/MySessionName"
  },
  "Principal": {
    "Federated": "arn:aws:iam::123456789012:saml-provider/MySAMLProvider"
  },
  "Principal": {
    "Federated": "cognito-identity.amazonaws.com"
  }
}
```

- IAM Users

```json
{
  "Principal": { "AWS": "arn:aws:iam::123456789012:user/MyUser" }
}
```

- Federated User Sessions

```json
{
  "Principal": {
    "Federated": "arn:aws:iam::123456789012:saml-provider/MySAMLProvider"
  },
  "Principal": {
    "Federated": "cognito-identity.amazonaws.com"
  }
}
```

- AWS Services

```json
{
  "Principal": { "Service": "ec2.amazonaws.com" },
  "Principal": { "Service": "lambda.amazonaws.com" },
  "Principal": { "Service": "s3.amazonaws.com" }
}
```

- All Principals

```json
{
  "Principal": "*"
}

{
  "NotPrincipal": {"AWS": "*"}
}
```

# IAM Condition - Condition Operators

- StringEquals/StringNotEquals: Case sensitive, Exact matching

```json
{
  "Condition": {
    "StringEquals": {
      "aws:RequestTag/Department": "Finance"
    }
  }
}
```

- StringLike/StringNotLike: Case insensitive, Wildcard/partial matching using \*,?

```json
{
  "Condition": {
    "StringLike": {
      ""s3:prefix": ["", "home/\*/data/", "home/${aws:username}/"]
    }
  }
}
```

- DateEquals, DateLessThan...

```json
{
  "Condition": {
    "DateLessThan": {
      "aws:TokenIssueTime": "2023-12-31T23:59:59Z"
    }
  }
}
```

- NumericEquals, NumericLessThan...

```json
{
  "Condition": {
    "NumericEquals": {
      "aws:MultiFactorAuthAge": 3600
    }
  }
}
```

- Bool: True/False condition

```json
{
  "Condition": {
    "Bool": {
      "aws:SecureTransport": "true"
    }
  }
}
```

- ArnLike / ArnNotLike: Match ARN patterns

```json
{
  "Condition": {
    "ArnLike": {
      "aws:SourceArn": "arn:aws:s3:::my-bucket/*"
    }
  }
}
```

- IpAddress / NotIpAddress (CIDR format)
  - Resolves to the IP address that the request originates from
  - Public IP only - IpAddress does not apply to requests through VPC endpoints

```json
"IpAddress": {
  "aws:SourceIp": 203.0.113.0/24"
}
```

- For all conditions, you can use the "ForAllValues" and "ForAnyValue" prefixes to match multiple values in a list

```json
{
  "Condition": {
    "ForAllValues:StringEquals": {
      "aws:TagKeys": ["Department", "Environment"]
    }
  }
}
```

# IAM Conditions - RequestedRegion

- The AWS region of the request
- Used to restrict specific actions in spcific AWS regions

```json
{
  "Condition": {
    "StringEquals": {
      "aws:RequestedRegion": "us-west-2"
    }
  }
}
```

- When using a global AWS service (e.g., IAM, CloudFront, Route53, Support), the AWS region is always us-east-1
- Work around using NotAction and Deny

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "NotAction": [
        "s3:ListBucket",
        "cloudfront:*",
        "iam:*",
        "route53:*",
        "support:*"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "us-west-2"
        }
      }
    }
  ]
}
```

# IAM Conditions - PrincipalArn

- The ARN of the IAM principal making the request
- Used to restrict access to specific IAM users or roles
- Compare the ARN of the principal that made the request with the ARN specified in the policy
- Note: For IAM roles, the request context returns the ARN of the role, not the ARN of the user that assumed the role

```json
{
  "Condition": {
    "ArnEquals": {
      "aws:PrincipalArn": "arn:aws:iam::123456789012:user/MyUser"
    }
  }
}
```

- The following types of Principals are allowed:
  - IAM users
  - IAM roles
  - Federated users (e.g., SAML, OIDC)
  - AWS services (e.g., Lambda, EC2)
- The following types of Principals are NOT allowed:
  - Anonymous users (e.g., unauthenticated requests)
  - AWS accounts (e.g., root user)
  - IAM groups

# IAM Conditions - SourceArn

- The ARN of the resource that initiated the request
- Used to restrict access to specific resources
- Compare the ARN of the resource making a service-to-service request with the ARN that you specify in the policy
- This key is included in the request context only if accessing a resource triggers an AWS service to call another service on behalf of the resource owner
- Example: an S3 bucked update triggers an SN topic sns:Publish API, the policy set the value of the condition key to the ARN of the S3 bucket

```json
{
  "Condition": {
    "ArnEquals": {
      "aws:SourceArn": "arn:aws:s3:::my-bucket/*"
    }
  }
}
```

# IAM Conditions - CalledVia

- Look at the AWS service that made the request on behalf of the IAM User or Role
- Contains an ordered list of each AWS service in the chain that made requests on the principal's behalf
- Supports:
  - athena.amazonaws.com
  - cloudformation.amazonaws.com
  - dynamodb.amazonaws.com
  - kms.amazonaws.com

# IAM Conditions - IP and VPC Conditions

- aws:SourceIp
  - Public requester IP (e.g., public EC2 IP if coming from EC2)
  - Not present in requests through VPC endpoints
- aws:VpcSourceIp
  - Requester IP through VPC endpoints (private IP)
- aws:SourceVpce
  - Restrict access to a specific VPC endpoint
- aws:SourceVpc
  - Restrict to a specific VPC ID
  - Request must be made through a VPC Endpoint
- Common to use these conditions with S3 Bucket Policies

# IAM Conditions - IP and VPC Conditions

- Restrict Access from Public IP Addresses

```json
"Version": "2012-10-17",
"Statement": [
  {
    "Effect": "Deny",
    "Action": "*",
    "Resource": "*",
    "Condition": {
      "NotIpAddress": {
        "aws:SourceIp": ["192.0.2.0/24", "203.0.113.0/24"]
      }
    }
  }
]
```

- Restrict Access from Private IP addresses (through a VPC Endpoint)

```json
"Version": "2012-10-17",
"Statement": [
  {
    "Effect": "Deny",
    "Action": "*",
    "Resource": "*",
    "Condition": {
      "NotIpAddress": {
        "aws:VpcSourceIp": ["192.0.2.0/24", "198.51.100.0/24"]
      }
    }
  }
]
```

# IAM Conditions - Resource Tag and Principal Tag

- Controls access to AWS Resources using tags
- aws:ResourceTag
  - tags that exist on AWS Resources
    - Sometimes you will see ec2:ResourceTag(service-specific)
- aws:PrincipalTag
  - tags that exist on the IAM user or IAM role making the request

# IAM Permission Boundaries

- IAM Permission Boundries are supported for users and roles (not groups)
- Advanced feature to use a managed policy to set the maximum permissions an IAM entity can get.
- Can be used in combinations of AWS Organizations SCP

- Use cases:
  - Delegate responsibilities to non administrators within their permission boundaries, for example create new IAM users
  - Allow developers to self-assign policies and manage their own permissions, while making sure they can't escalate their privileges (= make themselves admin)

# IAM Policy - Simplified Evaluation Logic (Allow/Deny)

1. By default, all requests are implicitly denied except for the AWS account root user, which has full access.
2. An explicit allow in an identity-based or resource-based policy overrides the default in 1.
3. If a permission boundary, Organizations SCP, or session policy is present, an explicit allow is used to limit actions. Anything not explicitly allowed is an implicit deny and may override the decision in 2.
4. An explicit deny in any policy overrides any allows

# Cross-Account Access Policy Evaluation Logic

- Request from Account A to Account B
- The requester in Account A must have an identity-based policy
- That policy must allow the requester to make a request to the resource in Account B
- The resource-based policy in Account B must allow the requester in Account A to access the resource

# IAM Roles vs Resource Based Policies

- Cross account:

  - attaching a resource-based policy to a resource (example: S3 bucket policy)
  - OR using a role as a proxy
  - When you assume a role (user, application or service), you give up your original permissions and take the permissions
    assigned to the role
  - When using a resource-based policy, the principal doesn't have to give up his permissions
  - Example: user in account A needs to scan a DynamoDB table in Account A and dump it in an S3 bucket in Account B.
  - Supported by: Amazon S3 buckets, SNS topics, SQS queues, etc...

- IAM Roles:

  - Helpful to give temporary permissions for a specific task
  - Allow a user/application to perform many actions in a different account
  - Permissions expire over time

- Resource-based policies:
  - Used to control access to specific resources (resource-centric view)
  - Allow cross-account access
  - Permanent authorization (as long as it exists in the resource-based policy)

# Amazon EventBridge - Security

- When a rule runs, it needs permissions on the target
- Resource-based policy: Lambda, SNS, SQS, CloudWatch Logs, API Gateway...
- IAM role: Kinesis stream, Systems Manager Run Command, ECS task...

# Resource Policies and aws:PrincipalOrgID

- aws:PrincipalOrgID can be used in any resource policies to restrict access to accounts that are member of an AWS Organization

# ABAC - Attribute-Based Access Control

- Defines fine-grained permissions based on user attributes
- Example: department, job role, team name,...
- Instead of creating IAM roles for every team, use ABAC to group attributes to identify which resources a set of users can access.
- Allow operations when the principal's tags matches the resource tag
- Helpful in rapidly-growing environments

# ABAC (Attribute-Based Access Control) vs RBAC (Role-Based Access Control)

- RBAC

  - Defines fine-grained permissions based on user role or job function
  - Example: Administrator, DB Admins, DevOps,...
  - Create different policies for different job functions
  - Disadvantage: must update policies when resources are added

- Attribute-Based Access Control (ABAC) - Advantages
  - Scale permissions easily (no need to update policies when new resources added)
  - Permissions automatically granted based on attributes
  - Require fewer policies (you don't create different policies for different job functions)
  - Ability to use users' attributes from corporate directory (e.g., SAML 2.0-based IdP or Web IdP)

# Multi Factor Authentication (MFA)

- Users have access to your account and can possibly change configurations or delete resources in your AWS account
- You want to protect your Root Accounts and IAM users
- MFA = password you know + security device you own
- Main benefit of MFA:
  - if a password is stolen or hacked, the account is not compromised

# Amazon S3 - MFA Delete

- MFA (Multi-Factor Authentication) - force users to generate a code on a device (usually a mobile phone or hardware) before doing important operations on S3
- MFA will be required to:
  - Permanently delete an object version
  - Suspend Versioning on the bucket
- MFA won't be required to:
  - Enable Versioning
  - List deleted versions
- To use MFA Delete, Versioning must be enabled on the bucket
- Only the bucket owner (root account) can enable/disable MFA Delete

# IAM Conditions - MultiFactorAuthPresent

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "BoolIfExists": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}
```

- Restrict access to AWS services for users not authenticated using MFA
- aws:MultiFactorAuthPresent
- Compatible with the AWS Console and the AWS CLI

# IAM Conditions - MultiFactorAuthAge

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "NumericGreaterThan": {
          "aws:MultiFactorAuthAge": 3600
        }
      }
    }
  ]
}
```

- Grant access only within a specified time after MFA authentication
- aws:MultiFactorAuthAge

# Not Authorized to Perform iam:DeleteVirtualMFADevice

- This error happens even when the user has the correct IAM permissions
- This happens if someone began assigning a virtual MFA device to a user and then cancelled the process
  - E.g. created an MFA device for the user but never activates it
  - Must delete the existing MFA device then associate a new device
  - AWS recommends a policy that allows a user to delete their own virtual MFA device only if they are authenticated using MFA
- To fix the issue, the administrator must use the AWS CLI or AWS API to remove the existing but deactivated device

# IAM Credentials Report

- IAM users and the status of their passwords, access keys, and MFA devices
- Download using IAM Console, AWS API, AWS CLI, or AWS SDK
- Helps in auditing and compliance
- Contains information such as:
  - User name
  - Password last used
  - Access key last used
  - MFA device associated
  - Whether the user has a password set
- The report is generated in CSV format
- The report is updated daily, and you can download it at any time

# IAM Roles for Services

- Some AWS service will need to perform actions on your behalf
- To do so, we will assign permissions to AWS services with IAM Roles
- Common roles:
  - EC2 instance roles
  - Lambda Function Roles
  - Roles for CloudFormation

# Delegate Passing Permissions to AWS Services

- You can grant users permissions to pass an IAM role to an AWS service
- Ensure that only approved users can configure an AWS service with an IAM role that grants permissions
- Grant iam:PassRole permission to the user's IAM user, role, or group
- PassRole is not an API call (no CloudTrail logs generated)
  - Review CLoudTrail log that created or modified the resource receiving the IAM role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["iam:PassRole", "GetRole"],
      "Resource": "arn:aws:iam::123456789012:role/MyServiceRole",
      "Condition": {
        "StringEquals": {
          "iam:PassedToService": "ec2.amazonaws.com"
        }
      }
    }
  ]
}
```

# AWS STS - Security Token Service

- Allows to grant limited and temporary access to AWS resources.
- Token is valid for up to one hour (must be refreshed)
- AssumeRole
  - Within your own account: for enhanced security
  - Cross Account Access: assume role in target account to perform actions there
- AssumeRoleWithSAML
  - return credentials for users logged with SAML
- AssumeRoleWithWebIdentity
  - return creds for users logged with an IdP (Facebook Login, Google Login, OIDC compatible)
  - AWS recommends against using this, and using Cognito instead
- GetSessionToken
  - For MFA, from a user or AWS account root user

# Using STS to Assume a Role

- Define an IAM Role within your account or cross-account
- Define which principals can access this IAM role
- Use AWS STS (Security Token Service) to retrieve credentials and impersonate the IAM Role you have access to (AssumeRole API)
- Temporary credentials can be valid between 15 minutes to 1 hour

# STS - Version 1 vs Version 2

- STS Version 1
  - By default, STS is available as a global single endpoint https://sts.amazonaws.com
  - Only support AWS Regions that are enabled by default
  - Option to enable "All Regions"
- STS Version 2

  - Version 1 tokens do not work for new AWS Regions (e.g., me-south-1)
  - Regional STS endpoints is available in all AWS Regions
  - Reduce latency, built-in redundancy, increase session token validity

- Error: "An error occurred (AuthFailure) when calling the DescribeInstances operation: AWS was not able to validate the provided access credentials."

- To solve, two options:
  1. Use the Regional STS Endpoint (any region) which will return STS Tokens Version 2. Use the closest regional endpoint for lowest latency.
  2. By default, the AWS STS calls to the STS global endpoint issues session tokens which are a Version 1 (Default AWS Regions).
     You can configure STS global endpoint to issue STS Tokens Version 2 (All AWS Regions)

# Getting Access to 3rd Party using external ID

- External ID is a piece of data that can be passed to AssumeRole API
- Allowing the IAM role to be assumed only if a certain value is present (External ID)
- It solves the Confused Deputy problem
- Prevent any other customer from tricking 3rd party into unwittingly accessing your resources

# Revoking IAM Role Temporary Credentials

- Users usually have a long session duration time (e.g., 12 hours)
- If credentials are exposed, they can be used for the duration of the session
  - Immediately revoke all permissions to the IAM role's credentials issues before a certain time
  - AWS attaches a new inline IAM policy to the IAM role that denies all permissions (forces users to reauthenticate) if the token is too old
  - Doesn't affect users who assumes the IAM role after you revoke sessions (don't worry about deleting the policy)

# AWS EC2 Instance Metadata Service (IMDS)

- Information about an EC2 instance (e.g., hostname, instance type, network settings,...)
- Can be accessed from within the EC2 instance itself by making a request to the EC2 metadata service endpoint
  http://169.254.169.254/latest/meta-data
- Can be accessed using EC2 API or CLI tools (e.g., curl or wget)
- Metadata is stored in key-value pairs
- Useful for automating tasks such as setting up an instance's hostname, configuring networking, or installing software

# AWS EC2 Instance Metadata - Example

- ami-id, block-device-mapping/, instance-id, instance-type, network/
- hostname, local-hostname, local-ipv4, public-hostname, public-ipv4
- Iam - InstanceProfileArn, InstanceId
- iam/security-credentials/role-name - temporary credentials for the role attached to your instance
- security-groups - names of security groups
- placement/ - launch region, launch AZ, placement group name...
- tags/instance - tags attached to the instance

# EC2 Instance Metadata - Restrict Access

- You can use local firewall rules to disable access for some or all processes

  - iptables for Linux, PF or IPFW for FreeBSD

  $ sudo iptables --append OUTPUT --proto tcp --destination 169.254.169.254 --match owner --uid-owner apache --jump REJECT

  - Turn off access using AWS Console or AWS CLI (HttpEndpoint=disabled)

# IMDSv2 vs IMDSv1

- IMDSv1 is accessing http://169.254.169.254/latest/meta-data directly
- IMDSv2 is more secure and is done in two steps:
  1. Get Session Token (limited validity) -- using headers and PUT
     $ TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 2100"`
  2. Use Session Token in IMDSv2 calls - using headers
     $ curl http://169.254.169.254/latest/meta-data/profile -H "X-aws-ec2-metadata-token: $TOKEN"

# Requiring the usage of IMDSv2

- Both IMDSv1 and IMDSv2 are available (enabled by default)
- The CloudWatch Metric MetadataNoToken provide information on how much MDSv1 is used

You can force Metadata Version 2 at Instance Launch using either:

- AWS console
- AWS CLI "HttpTokens:required"

- You can require IMDSv2 when registering an AMI: --imds-support v2.0

# Require EC2 Role Credentials to be retreived from IMDSv2

- AWS credentials provided by the IMDS now include an ec2:RoleDelivery IAM context key
  - 1.0 for IMDSv1
  - 2.0 for IMDSv2
- Attach this policy to the IAM Role of the EC2 Instance

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "sts:AssumeRole",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ec2:RoleDelivery": "1.0"
        }
      }
    }
  ]
}
```

- Or attach it to an S3 bucket to only require IMDSv2 when API calls are made by an IAM role
- Or attach it as an SCP in your account

# IAM Policy or SCP to force IMDSv2

- Prevent the launch of an EC2 instance using old instance metadata (IMDSv1)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "ec2:RunInstances",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ec2:MetadataHttpTokens": "optional"
        }
      }
    }
  ]
}
```

- Prevent modifying a running EC2 instance using ModifyInstanceMetadataOptions API
  to re-enable old instance metadata (IMDSv1)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "ec2:ModifyInstanceMetadataOptions",
      "Resource": "*",
      "Condition": {
        "StringNotLike": {
          "aws:PrincipalARN": "arn:aws:iam::*role/ec2-imds-admins"
        }
      }
    }
  ]
}
```

# How Authorization Works in Amazon S3

- User Context
  - Is the IAM principal authorized by the parent AWS account (IAM policy)?
  - If the parent owns the bucket or object, then bucket policy/ACL or object ACL is evaluated
  - If the parent owns the bucket/object, it can grant permissions to its IAM principals using Identity-Based Policy or Resource-Based Policy
- Bucket Context
  - Evaluates the policies of the AWS account that owns the bucket (check for Explicit Deny)
- Object Context
  - Requester must have permission from the object owner (using Object ACL)
  - If bucket owner = object owner, then access granted using Bucket Policy
  - If bucket owner != object owner, then access granted using object owner ACL
  - If you want to own all objects in your bucket and only use Bucket Policy and IAM-based Policies
    to grant access, enable Bucket Owner Enforced Setting for Object Ownership
    - Then Bucket and objects ACLs can't be edited and no longer considered for access

# Bucket Operations vs. Object Operations

```json
{
  "version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": "arn:aws:s3:::test"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::test/*"
    }
  ]
}
```

- s3:ListBucket permission applies to arn:aws:s3:::test
- => bucket level permission

- s3:GetObject, s3:PutObject, s3:DeleteObject applies to arn:aws:s3:::test/\*
- => object level permission

# Cross-Account Access to Objects in S3 Buckets

- Use one of the following to grant cross-account access to S3 objects:
  - IAM Policies and S3 Bucket Policy
  - IAM Policies and Access Control Lists (ACLs)
    - ACLs only work if Bucket Owner Enforced setting = Disabled
    - By default, all newly created buckets have Bucket Owner Enforced = Enabled
  - Cross-Account IAM Roles

# Object Permissions in Cross-Account Setting

- Account A user can make sure it gives up object ownership by granting the object ownership to the Account B administrator
- Using ACL: with adding condition that requests include ACL-specific headers, that either:
  - Grant full permissions explicitly (ex: x-amz-grant-full-control)
  - Use canned ACL
- Using S3 Object Ownership (bucket-level setting to disable ACLs)

# Canned ACL, Object Permissions in Cross-Account Setting

- You can require the x-amz-acl header with a Canned ACL granting full control permission to the bucket owner
- To require the x-amz-acl header in the request, specify the s3:x-amz-acl condition key

# S3 Canned ACL - Deep Dive

- Canned ACL are "Shortcut ACLs
- ACL are NOT recommended (disabled by default since Apr 2023)
- By default, enable "Object Ownership" so that only Bucket Policies, IAM Policies, SCP, and VPC Endpoint Policies control access to your S3 Bucket Objects
- The bucket owner will own all the objects

| Canned ACL                | Applies to      | Permissions Added to ACL                                                                                                              |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| private                   | Bucket & Object | Owner gets FULL_CONTROL. No one else has access rights (default).                                                                     |
| public-read               | Bucket & Object | Owner gets FULL_CONTROL. AllUsers group gets READ access.                                                                             |
| public-read-write         | Bucket & Object | Owner gets FULL_CONTROL. AllUsers group gets READ and WRITE access. (not recommended)                                                 |
| aws-exec-read             | Bucket & Object | Owner gets FULL_CONTROL. EC2 gets READ access to GET an Amazon Machine Image (AMI).                                                   |
| authenticated-read        | Bucket & Object | Owner gets FULL_CONTROL. AuthenticatedUsers group gets READ access.                                                                   |
| bucket-owner-read         | Object          | Object owner gets FULL_CONTROL. Bucket owner gets READ access. (S3 ignores it if you specify it when creating a bucket)               |
| bucket-owner-full-control | Object          | Both the object owner and the bucket owner get FULL_CONTROL over the object. (S3 ignores it if you specify it when creating a bucket) |
| log-delivery-write        | Bucket          | LogDelivery group gets WRITE and READ ACP permissions on the bucket.                                                                  |

# Cross-Account IAM Roles

- You can use cross-account IAM roles to centralize permission management when providing cross-account access to multiple services
- Example: access to S3 objects that are stored in multiple S3 buckets
- Bucket Policy is not required as the API calls to S3 come from within the account (through the assumed IAM role)

# Sample bucket policies force HTTPS in flight

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EnforceSSLRequestsOnly",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

# S3 Bucket Policies - Restrict Access to Specific IP Addresses

- Block traffic to the bucket unless request is from specified external IP addresses

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"],
      "Condition:": {
        "NotIpAddress": {
          "aws:SourceIp": ["11.11.11.11/24"]
        }
      }
    }
  ]
}
```

# S3 Bucket policy - restrict by user ID

- Block traffic to the bucket unless request is from specified users (same AWS account)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "_",
      "Action": "s3:_",
      "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"],
      "Condition": {
        "StringNotEquals": {
          "aws:userid": ["AIDAEXAMPLEUSERID1", "RoleIDExample:*"]
        }
      }
    }
  ]
}
```

# VPC Gateway Endpoint for Amazon S3

- No cost
- Only accessed by resources in the VPC where it's created
- Make sure "DNS Support" is Enabled
- Keep on using the public DNS of Amazon S3
- Make sure Outbound rules of SG of EC2 instance allows traffic to S3

# VPC Interface Endpoint for S3

- ENI(s) are deployed in your Subnets (Security Groups can be attached to ENIs)
- Can access from on-premises (VPN or Direct Connect)
- Costs $0.01 per hour AZ
- The public hostname of a service will resolve to the private Endpoint Interface hostname
- Both VPC Setting "Enable DNS hostnames" and "Enable DNS support" must be 'true'
- No "Private DNS name" option for VPC Interface Endpoint for S3

# VPC Endpoint Restrictions aws:SourceVpc and aws:SourceVpce

- aws:SourceVpc - restrict access to a specific VPCs

```json
{
  "Effect": "Deny",
  "Action": "s3:*",
  "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"],
  "Condition": {
    "StringNotEquals": {
      "aws:SourceVpc": "vpc-12345678"
    }
  }
}
```

- aws:SourceVpce - restrict access to a specific VPC Endpoint

```json
{
  "Effect": "Deny",
  "Action": "s3:*",
  "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"],
  "Condition": {
    "StringNotEquals": {
      "aws:SourceVpce": "vpce-1234567890abcdef0"
    }
  }
}
```

# Regain Access to Locked S3 Buckets

- If you incorrectly configured your S3 bucket policy to deny access to everyone (Deny s3:_, Principal:_)
- You must delete the S3 bucket policy using the AWS account root user
- Note: Deny statements in IAM policies do not affect the root account

# Bucket settings for Block Public Access

- These settings were created to prevent company data leaks
- If you know your bucket should never be public, leave these on
- Can be set at the account level

# S3 - Access Points

- Access Points simplify security management for S3 Buckets
- Each Access Point has:

  - its own DNS name (internet Origin or VPC Origin)
  - an access point policy (similar to bucket policy) - manage security at scale

- We can define the access point to be accessible only from within the VPC
- You must create a VPC Endpoint to access the Access Point (Gateway or Interface Endpoint)
- The VPC Endpoint Policy must allow access to the target bucket and Access Point

# S3 - Multi-Region Access Points

- Provide a global endpoint that span S3 buckets in multiple AWS regions
- Dynamically route requests to the nearest S3 bucket (lowest latency)
- Bi-directional S3 bucket replication rules are created to keep data in sync across regions
- Failover Controls - allows you to shift requests across S3 buckets in different AWS regions within minutes (Activate-Active or Active-Passive)

# What is CORS

- Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers to allow requests to other origins while visiting the main origin
- origin = scheme (protocol) + host (domain) + port
  - example: https://www.example.com (implied port is 443 for HTTPS, 80 for HTTP)
- Same origin: http://example.com/app1 and http://example.com/app2
- Different origins: http://www.example.com and http://other.example.com
- The requests won't be fulfilled unless the other origin allows for the requests, using CORS Headers (example: Access-Control-Allow-Origin)

# Amazon S3 - CORS

- If a client makes a cross-origin request on our S3 bucket, we need to enable the correct CORS headers
- It's a popular exam question
- You can allow for a specific origin or for \* (all origins)

# Cognito User Pools (CUP) - User Features

- Create a serverless database of user for your web and mobile apps
- Simple login: Username (or email) / password combination
- Password reset
- Email and Phone number verification
- Multi-factor authentication (MFA)
- Federated identities: users from Facebook, Google, SAML...
- Feature: block users if their credentials are compromised elsewhere
- Login sends back a JSON Web Token (JWT) that can be used to access other AWS services

# Cognito User Pools (CUP) - Integrations

- CUP integrates with API Gateway and Application Load Balancer (ALB) to authenticate users

# Cognito Identity Pools (Federated Identities)

- Get identities for "users" so they obtain temporary AWS credentials
- Your identity pool (e.g identity source) can include:

  - Public Providers (Login with Amazon, Facebook, Google, Apple)
  - Users in an Amazon Cognito user pool
  - OpenID Connect Providers and SAML Identity Providers
  - Developer Authenticated Identities (custom login server)
  - Cognito Identity Pools allow for unauthenticated (guest) access

- Users can then access AWS services directly or through API Gateway
  - The IAM policies applied to the credentials are defined in Cognito
  - They can be customized based on the user_id for fine grained control

# Cognito Identity Pools - IAM Roles

- Default IAM roles for authenticated and guest users
- Define rules to choose the role for each user based on the user's ID
- You can partition your users' access using policy variables
- IAM credentials are obtained by Cognito Identity Pools through STS
- The roles must have a "trust" policy of Cognito Identity Pools

# Cognito User Pool Groups

- Collection of users in a logical group in Cognito User Pool
- Defines the permissions for users in the group by assigning IAM role to the group
- Users can be in multiple groups:
  - Assign precedence values to each group (lower will be chosen and its IAM role will be applied)
  - Choose from available IAM roles by specifying the IAM role ARN
- You can't create nested groups

# Identity Federation in AWS

- Give users outside of AWS permissions to access AWS resources in your account
- You don't need to create IAM users (user management is outside AWS)
- Use cases:
  - A corporation has its own identity system (e.g., Active Directory)
  - Web/Mobile application that needs access to AWS resources
- Identity Federation can have many flavors:
  - SAML 2.0
  - Custom Identity broker
  - Web identity Federation With(out) Amazon Cognito
  - IAM Identity Center

# SAML 2.0 Federation

- Security Assertion Markup Language 2.0 (SAML 2.0)
- Open standard used by many identity providers (e.g., ADFS)
  - Supports integration with Microsoft Active Directory Federations Services (ADFS)
  - Or any SAML 2.0 compliant identity provider
- Access to AWS Console, AWS CLI, or AWS API using temporary credentials
  - No need to create IAM users for each of your employees
  - Need to setup a trust between AWS IAM and SAML 2.0 Identity Provider (both ways)
- User-the-hood: Uses the STS API AssumeRoleWithSAML
- SAML 2.0 Federation is the "old way", IAM Identity Center Federation is the new managed and simpler way
  - https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html

# Custom Identity broker application

- Use only if Identity Provider is NOT compatible with SAML 2.0
- The Identity Broker Authenticates users and requests temporary credentials from AWS STS
- The Identity Broker must determine the appropriate IAM role
- Uses the STS API AssumeRole or GetFederationToken

# Web Identity Federation - Without Cognito

- Not recommended by AWS - use Cognito instead

# Web Identity Federation - With Cognito

- Preferred over the Web Identity Federation
  - Create IAM Roles using Cognito with the least privilege needed
  - Build trust between the OIDC IdP and AWS
- Cognito benefits:
  - Supports anonymous users
  - Supports MFA
  - Data Synchronization
- Cognito replaces a Token Vending Machine (TVM)

# Web Identity Federation - IAM Policy

- After being authenticated with Web Identity Federation, you can identify the user with an IAM policy variable

- Examples:
  - cognito-identity.amazonaws.com:sub
  - www.amazon.com:user_id
  - graph.facebook.com:id
  - accounts.google.com:sub

# SAML 2.0 Federation - Troubleshooting

- Error: Response signature invalid (service: AWSSecurityTokenService; status code: 400; error code: InvalidIdentityToken)
- Reason: federation metadata of the identity provider does NOT match the metadata of the IAM identity provider
  - Example: metadata file might have changed to update an expired certificate
- Resolution:
  - Download the updated SAML 2.0 metadata file from the identity provider
  - Update in the IAM identity provider using AWS CLI aws iam update-saml-provider

# AWS Identity Center (successor to AWS Single Sign-On)

- One login (single sign-on) for all your

  - AWS accounts in AWS Organizations
  - Business cloud applications (e.g., Salesforce, Box, Microsoft 365)
  - SAML 2.0 enabled applications
  - EC2 Windows Instance

- Identity Providers
  - Built-in Identity Store in IAM identity center
  - 3rd party: Active Directory, OneLogin, Okta

# AWS IAM Identity Center - Fine Grained Permissions and Assignments

- Multi account permissions

  - Manage access across AWS accounts in your AWS organization
  - Permission Sets - a collection of one or more IAM policies assigned to users and groups to define AWS access.

- Application Assignments

  - SSO access to many SAML 2.0 business applications (Salesforce, Box, Microsoft 365)
  - Provide required URLs, certificates, and metadata

- Attribute Based Access Control (ABAC)
  - Fine grained permissions based on users' attributes stored in IAM identity center identity store.
  - example: cost center, title, locale,...
  - use case: define permissions once, then modify AWS access by changing the attributes

# AWS Directory Services

- AWS Managed Microsoft AD

  - Create your own AD in AWS, manage users locally, supports MFA
  - Establish "trust" connections with your on-premise AD
  - Managed Service: Microsoft AD in your AWS VPC
  - EC2 Windows Instances:
    - EC2 Windows instances can join the domain and run traditional AD applications (sharepoint, etc)
    - Seamlessly Domain Join Amazon EC2 Instances from Multiple Accounts and VPCs
  - Integrations:
    - RDS for SQL Server, AWS Workspaces, Quicksight...
    - AWS SSO to provide access to 3rd party applications
  - Standalone repository in AWS or joined to on-premise AD
  - Multi AZ deployment of AD in 2 AZ, # of DC (Domain Controllers) can be increased for scaling
  - Automated backups
  - Automated Multi-Region replication of your directory

- AD Connector

  - Directory Gateway (Proxy) to redirect to on-premiss AD, supports MFA
  - Users are managed on the on-premise AD

- Simple AD
  - AD-compatible managed directory on AWS
  - Cannot be joined with on-premise AD

# Connect to on-premise AD

- Ability to connect your on-premise Active Directory to AWS Managed Microsoft AD
- Must establish a Direct Connect (DX) or VPN connection
- Can setup three kinds of forest trust:
  - One-way trust:
    AWS => On-Premise
  - One-way trust:
    On-Premise => AWS
  - Two-way forest trust:
    AWS <=> On-Premise
- Forest trust is different than Synchronization (replication is not supported)

# Solution Architecture: Active Directory Replication

- You may want to create a replica of your AD on EC2 in the cloud to minimize latency of in case DX or VPN goes down
- Establish trust between the AWS Managed Microsoft AD and EC2

# AWS Directory Services - AD Connector

- AD Connector is a directory gateway to redirect directory requests to your on-premises Microsoft Active Directory
- No caching capability
- Manage users solely on-premise, no possibility of setting up a trust
- VPN or Direct Connect
- Doesn't work with SQL Server, doesn't do seamless joining, can't share directory

# AWS Directory Services - Simple AD

- Simple AD is an inexpensive Active Directory - compatible service with the common directory features.
- Supports joining EC2 instances, manage users and groups
- Does not support MFA, RDS SQL server, AWS SSO
- Small: 500 users, large: 5000 users
- Powered by Samba 4, compatible with Microsoft AD
- lower cost, low scale, basic AD compatible, or LDAP compatibility
- No trust relationship

# Encryption in flight (TLS/SSL)

- Data is encrypted before sending and decrypted after receiving
- TLS certificates help with encryption (HTTPS)
- Encryption in flight ensures no MITM (man in the middle attack) can happen

# Server-side encryption (SSE) at rest

- Data is encrypted after being received by the server
- Data is decrypted before being sent
- It is stored in an encrypted form thanks to a key (usually a data key)
- The encryption / decryption keys must be managed somewhere, and the server must have access to it

# Client-side encryption

- Data is encrypted by the client and never decrypted by the server
- Data will be decrypted by a receiving client
- The server should not be able to decrypt the data
- Could leverage Envelope Encryption

# CloudHSM

- KMS => AWS manages the software for encryption
- CloudHSM => AWS provisions encryption hardware
- Dedicated Hardware (HSM = Hardware Security Module)
- You manage your own encryption keys entirely (not AWS)
- HSM device is tamper resistant, FIPS 140-2 level 3 compliance
- Supports both symmetric and asymmetric encryption (SSL/TLS keys)
- No free tier available
- Must use the CloudHSM Client Software
- Redshift supports CloudHSM for database encryption and key management
- Good option to use with SSE-C encryption

# CloudHSM - High Availability

- CloudHSM clusters are spread across Multi AZ (HA)
- Great for availability and durability

# CloudHSM vs. KMS

| **Feature**                    | **AWS KMS**                                                               | **AWS CloudHSM**                                                               |
| ------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Tenancy**                    | Multi-Tenant                                                              | Single-Tenant                                                                  |
| **Standard**                   | FIPS 140-2 Level 3                                                        | FIPS 140-2 Level 3                                                             |
| **Master Keys**                | - AWS Owned Keys <br> - AWS Managed Keys <br> - Customer Managed KMS Keys | Customer Managed CMK                                                           |
| **Key Types**                  | - Symmetric <br> - Asymmetric <br> - Digital Signing                      | - Symmetric <br> - Asymmetric <br> - Digital Signing & Hashing                 |
| **Key Accessibility**          | Accessible in multiple AWS regions <br> KMS Key Replication               | - Deployed and managed in a VPC <br> - Can be shared across VPCs (VPC Peering) |
| **Cryptographic Acceleration** | None                                                                      | - SSL/TLS Acceleration <br> - Oracle TDE Acceleration                          |
| **Access & Authentication**    | AWS IAM                                                                   | You create users and manage their permissions                                  |

# CloudHSM - Integration with AWS and 3rd Party Services

- Integration with AWS Services

  - Through integration with AWS KMS
  - Configure KMS Custom Key Store with CloudHSM
  - Example: EBS, S3, RDS,...
  - Supports RDS Oracle TDE (through KMS)

- Integration with 3rd Party Services
  - Allows creating and storing keys in CloudHSM
  - Use cases: SSL/TLS Offload, Windows Server Certificate Authority (CA), Oracle TDE, Microsoft SignTool, Java Keytool,...

# CloudHSM - Sharing Cluster Across-Accounts

- You can share the private subnets a CloudHSM clusters resides in using AWS RAM
- You CANNOT share the CloudHSM cluster itself
- Share VPC Subnets with entire Organization, specific OUs, or AWS accounts
- Note: configure CloudHSM Security Group to allow traffic from clients

# AWS KMS (Key Management Service)

- Anytime you hear "encryption" for an AWS service, it's most likely KMS
- Easy way to control access to your data, AWS manages keys for us
- Fully integrated with IAM for authorization
- Seamlessly integrated into:
  - Amazon EBS: encrypted volumes
  - Amazon S3: Server-side encryption of objects
  - Amazon Redshift: encryption of data
  - Amazon RDS: encryption of data
  - Amazon SSM: Parameter store
- But you can also use the CLI/SDK

# KMS - KMS Key Types

- Symmetric (AES-256 keys)
  - First offering of KMS, single encryption key that is used to Encrypt and Decrypt
  - AWS services that are integrated with KMS use Symmetric KMS keys
  - Necessary for envelope encryption
  - You never get access to the KMS key unencrypted (must call KMS API to use)
- Asymmetric (RSA and ECC key pairs)
  - Public (Encrypt) and Private Key (Decrypt) pair
  - Used for Encrypted/Decrypt, or Sign/Verify operations
  - The public key is downloadable, but you can't access the Private Key unencrypted
  - Use case: encryption outside of AWS by users who can't call the KMS API

# Types of KMS Keys

- Customer Managed Keys
  - Create, manage and use, can enable or disable
  - Possibility of rotation policy (new key generated every year, old key preserved)
  - Can add a Key Policy (resource policy) and audit in CloudTrail
  - Leverage for envelope encryption
- AWS Managed Keys
  - Used by AWS service (aws/s3, aws/ebs, aws/redshift)
  - Managed by AWS (automatically rotated every 1 year)
- AWS Owned Keys
  - Created and managed by AWS, used by some AWS services to protect your resources
  - Used in multiple AWS accounts, but they are not in your AWS account
  - You can't view, use, track, or audit

# KMS Key Material Origin

- Identifies the source of the key material in the KMS key
- Can't be changed after creation
- KMS (AWS_KMS) - default
  - AWS KMS creates and manages the key material in its own key store
- External (EXTERNAL)
  - You import the key material into the KMS key
  - You're responsible for securing and managing this key material outside of AWS
- Custom Key Store (AWS_CLOUDHSM)
  - AWS KMS creates the key material in a custom key store (CloudHSM Cluster)

# KMS Key Source - Custom Key Store (CloudHSM)

- Integrate KMS with CloudHSM cluster as a Custom Key Store
- Key materials are stored in a CloudHSM cluster that you own and manage
- The cryptographic operations are performed in the HSMs
- Use cases:
  - You need direct control over the HSMs
  - KMS keys needs to be stored in a dedicated HSMs

# KMS Key Source - External

- Import your own key material into KMS key, Bring Your Own Key (BYOK)
- You're responsible for key material's security, availability, and durability outside of AWS
- Can't be used with Custom Key Store (CloudHSM)
- Manually rotate your KMS key (Automatic Key Rotation is NOT supported)

# KMS Multi-Region Keys

- A set of identical KMS keys in different AWS Regions that can be used interchangeably (~same KMS key in multiple Regions)
- Encrypt in one Region and decrypt in other Regions (No need to re-encrypt or making cross-region API calls)
- Multi-Region keys have the same key ID, key material, automatic rotation,...
- KMS Multi-Region are NOT global (Primary + Replicas)
- Each Multi-Region key is managed independently
- Only one primary key at a time, can promote replicas into their own primary
- Use cases: Disaster Recovery, Global Data management (e.g., DynamoDB Global Tables), Active-Active Applications that span multiple Regions, Distributed Signing applications,...

# DynamoDB Global Tables and KMS Multi-Region Keys Client-Side encryption

- We can encrypt specific attributes client-side in our DynamoDB table using the Amazon DynamoDB Encryption Client
- Combined with Global Tables, the client-side encrypted data is replicated to other regions
- If we use a multi-region key, replicated in the same region as the DynamoDB Global table, then clients in these regions can use low-latency API calls to KMS in their region to decrypt the data client-side
- Using client-side encryption we can protect specific fields and guarantee only decryption if the client has access to an API key

# Global Aurora and KMS Multi-Region Keys Client-Side encryption

- We can encrypt specific attributes client-side in our Aurora table using the AWS Encryption SDK
- Combined with Aurora Global Tables, the client-side encrypted data is replicated to other regions
- If we use multi-region key, replicated in the same region as the Global Aurora DB, then clients in these regions can use low-latency API calls to KMS in their region to decrypt the data client-side
- Using client-side encryption we can protect specific fields and guarantee only decryption if the client has access to an API key, we can protect specific fields even from database admins

# How does KMS work? API - Encrypt and Decrypt

# Envelope Encryption

- KMS Encrypt API call has a limit of 4 KB
- If you want to encrypt >4 KB, we need to use Envelope Encryption
- The main API that will help us is the GenerateDataKey API
- For the exam: anything over 4 KB of data that needs to be encrypted must use the Envelope Encryption == GenerateDataKey API

# Encryption SDK

- The AWS Encryption SDK implemented Envelope Encryption for us
- The Encryption SDK also exists as a CLI tool we can install
- Implementations for Java, Python, C, Javascript
- Feature - Data Key Caching:
  - re-use data keys instead of creating new ones for each encryption
  - Helps with reducing the number of calls to KMS with a security trade-off
  - Use LocalCryptoMaterialsCache (max age, max bytes, max number of messages)

# KMS Symmetric - API Summary

- Encrypt: encrypt up to 4 KB of data through KMS
- GenerateDataKey: generates a unique symmetric data key (DEK)
  - returns a plaintext copy of the data key
  - AND a copy that is encrypted under the CMK that you specify
- GenerateDataKeyWithoutPlaintext:
  - Generate a DEK to use at some point (not immediately)
  - DEK that is encrypted under the CMK that you specify (must use Decrypt later)
- Decrypt: decrypt up to 4 KB of data (including Data Encryption Keys)
- GenerateRandom: Returns a random byte string

# KMS Automatic Key Rotation

- AWS-managed KMS Keys: automatically rotated every 1 year
- For Customer-Managed Symmetric KMS Key
  - Automatic key rotation is optionally enabled
  - Customize Rotation Period between 90 and 2560 days (default: 365 days)
  - Previous key is kept active so you can decrypt old data
  - New Key has the same KMS Key ID (only the backing key is changed)

# KMS On-Demand Key Rotation

- For Customer-Managed Symmetric KMS Key (not AWS managed CMK)
- Does NOT require Automatic Key Rotation to be enabled
- Does NOT change existing Automatic Rotation schedules
- Limit to how many times you can trigger an on-demand key rotation

# KMS Manual Key Rotation (Customer-Managed Symmetric KMS Key and Imports)

- When you want to rotate key (example: every month)
- New Key has a different KMS Key ID
- Keep the previous key active so you can decrypt old data
- Better to use aliases in this case (to hide the change of key for the application)
- Good solution to rotate KMS Key that are not eligible for automatic rotation (like asymmetric KMS Key)

# KMS Alias Updating

- Better to use aliases in this case (to hide the change of key for the application)

# KMS Key Deletion

- Generated Keys (from within KMS)
  - No expiration date
  - Cannot be deleted immediately, mandatory 7 to 30 days waiting period
    - You can cancel key deletion during the waiting period
    - During the waiting period, the KMS Key cannot be used for Encrypt / Decrypt
    - Everything will be deleted at the end of the waiting period
  - You may manually disable it immediately instead (to re-enable it later)
- Imported Keys:
  - You may set an expiration period on the key
    - KMS will delete the key material
    - You can also delete the key material on demand
    - The metadata is kept so you can re-import in the future
  - You may manually disable it and schedule for deletion (everything is deleted)
- AWS managed keys or AWS owned keys cannot be deleted

# KMS Key Deletion - CloudWatch Alarms

- Use CloudTrail, CloudWatch Logs, CloudWatch Alarms and SNS to be notified when someone tries to use a CMK that's "Pending deletion" in a cryptographic operation (Encrypt, Decrypt, ...)

# KMS Key Deletion - Notifications

- To be notified of Keys being deleted or disabled
- Using CloudTrail + EventBridge

# KMS Multi Region Key Deletion

- Deleting Replica Key
  - Less risky, can always be re-created from the primary key (if it exists)
  - Must be scheduled (7 to 30 days)
- Deleting Primary Key
  - Cannot happen until all Replicas have been deleted
  - If you want to delete a Primary Key but keep Replicas, promote another one as Primary and then delete the "old Primary Key"

# KMS Key Policies

- Control access to KMS keys, "similar" to S3 bucket policies
- Difference: you cannot control access without them

- Default KMS Key Policy:

  - Created if you don't provide a specific KMS Key Policy
  - Complete access to the key to the root user = entire AWS account

- Custom KMS Key Policy:
  - Define users, roles that can access the KMS key
  - Define who can administer the key
  - Useful for cross-account access of your KMS key

# Default KMS Key Policy

```json
{
  "Effect": "Allow",
  "Action": "kms:*",
  "Resource": "*",
  "Principal": {
    "AWS": "arn:aws:iam::123456789012:root"
  }
}
```

- It gives the AWS account that owns the KMS key, full access to the KMS key
- KMS Key policy does NOT automatically give permission to the account or any of its users
- Allows the account to use IAM policies to allow access to the KMS key, in addition to the key policy

# KMS Key Policies

- AWS Owned Keys

  - You cannot view or change the Key Policy

- AWS Managed Keys (e.g., aws/ebs)

  - You can view the Key Policy
  - You cannot change the Key Policy

- AWS Customer Managed Keys
  - You can view the Key Policy
  - You can edit the Key Policy

# Custom KMS Key Policy - Allow Admins

- KMS Key administrators have permissions to manage the KMS key
- KMS Key administrators cannot use the KMS Key Cryptographic Operations (Encrypt / Decrypt...)
- You can add IAM Users / Roles as KMS Key administrators

```json
{
  "Sid": "AllowAdmins",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::123456789012:role/KMSAdmins"
  },
  "Action": [
    "kms:Create*",
    "kms:Describe*",
    "kms:Enable*",
    "kms:List*",
    "kms:Put*",
    "kms:Update*"
  ],
  "Resource": "*"
}
```

# Custom KMS Key Policy - Allow Users to Directly Use the KMS Key

- Allows IAM Users / Roles to use the KMS Key directly
- IAM Users / Roles don't need IAM Policies if the KMS Key is in the same account
  - The KMS Key explicitly authorizes the IAM Principal
- Alternative is Default KMS Key + IAM Policy

# KMS Grants

- Allows you to grant access to specific AWS KMS keys to other AWS accounts and IAM Users / Roles within your AWS account
- Often used for temporary permissions
- Can be created for a variety of operations, including encrypt, decrypt, sign, and verify, as well as creating more grants
- Grant are for one KMS Key only, and one or more IAM Principal
- Once granted, a principal can perform any operation as specified in the Grant
- Grants do NOT expire automatically, you must delete them manually
- You don't need to change KMS Key Policy or IAM Policy

# Creating a KMS Key Grant

- Using AWS CLI

```bash
aws kms create-grant --key-id <KMS Key ID> --grantee-principal <IAM User ARN> --operations <Operation> --name <Grant Name>
```

- Make sure to delete a KMS Key Grant when you're done using it
- For now, there's no support in the AWS Console

# KMS Grants - AWS Service Usage

- Grants are commonly used by AWS services that integrate with AWS KMS to encrypt your data at rest
- The AWS service creates a Grant on behalf of a user in the account, uses its permissions, and retires the grant as soon as its task is complete
- Users must have the CreateGrant IAM permission

# Custom KMS Key Policy - Grants for AWS Services Use Cases

- Use this KMS Key Policy with:
  - Amazon EBS and Amazon EC2 to attach an encrypted EBS volume to an EC2 instance
  - Amazon Redshift to launch an encrypted cluster
  - AWS services integrated with AWS KMS that use grants to create, manage, or use encrypted resources with those services

```json
{
  "Sid": "AllowEBSGrants",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM"
  },
  "Action": "kms:CreateGrant",
  "Resource": "*",
  "Condition": {
    "Bool": {
      "kms:GrantIsForAWSResource": "true"
    }
  }
}
```

# Troubleshooting: Can't start an EC2 instance with Encrypted EBS Volume

- Reasons:
  - The KMS Key is disabled
  - The KMS Key is scheduled for deletion
  - The KMS Key policy does not allow the IAM role to use the KMS key
  - The IAM role does not have the kms:Decrypt permission for the KMS key
- Solution:
  - Check the KMS Key policy and IAM role permissions
  - Check if the KMS Key is enabled and not scheduled for deletion
  - Ensure that the IAM role has the necessary permissions to use the KMS key

# Condition Keys - kms:ViaService

- kms:ViaService - limits the use of a KMS key to requests from specified AWS services
- Example: the following key policy allow usage of the KMS Key through EC2 or RDS in us-west-2 on behalf of the ExampleUser
- IAM user must be authorized to use the KMS Key and Grant it to the AWS service

# Condition Keys - kms:CallerAccount

- kms:CallerAccount - Allow or deny access to all identities (IAM users and roles) in an AWS account
- Example: the following KMS Key policy is the Key policy for AWS Managed Key for Amazon EBS (aws/ebs)

```json
{
  "Effect": "Allow",
  "Principal": {
    "AWS": "*"
  },
  "Action": "kms:Decrypt",
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "kms:CallerAccount": "123456789012"
    },
    "StringLike": {
      "kms:ViaService": "ec2.us-west-2.amazonaws.com"
    }
  }
}
```

# Sharing KMS Encrypted RDS DB Snapshots

- You can share RDS DB snapshots encrypted with KMS CMK with other accounts, but must first share the KMS CMK with the target account using Key Policy

# Asymmetric Encryption

- An encryption process that uses a pair of related keys (public and private) to encrypt and decrypt data
- Public Key can be shared, Private Key must be kept secret
- KMS supports 3 types of asymmetric KMS keys:
  - RSA (2048, 3072, or 4096 bits)
  - ECC (Elliptic Curve Cryptography) keys
  - Digital Signature keys
- KMS supports 3 types of asymmetric KMS keys:
  - RSA KMS Keys - encryption/decryption or signing/verification
  - Elliptic Curve (ECC) KMS Keys - signing and verification
  - SM2 KMS Keys (China Regions only) - encryption/decryption or signing/verification
- Private Keys never leaves AWS KMS unencrypted

# Digital Signing with KMS Asymmetric

- Helps you verify the integrity of messages or files sent across different systems
- Verify that file has not been tampered with in transit
- Public Key used to verify the signature while Private Key used in the signing process
- Use cases: document e-signing, secure messaging, authentication/authorization tokens, trusted source code, e-commerce transactions,...

# KMS API Calls Limits and Data Key Caching

- When your application makes multiple API calls to KMS and you hit service limits (requests per second limit)...
- Data Key Caching allows you to reuse data keys that protect your data
- Instead of generating a new data key for each encryption operation
- Reduce latency, improve throughput, reduce cost, stay within service limits,...
- Implemented using AWS Encryption SDK
- Note: encryption best practices discourages reuse of data keys (tradeoff cost / security)

# Changing the KMS Key for an encrypted EBS volume

- You can't change the encryption keys used by an EBS volume
- Create an EBS snapshot and create a new EBS volume and specify the new KMS key

# EBS Encryption - Account level setting

- New Amazon EBS volumes aren't encrypted by default
- There's an account-level setting to encrypt automatically new EBS volumes and Snapshots
- This setting needs to be enabled on a per-region basis

# Encrypt Un-encrypted EFS File System

- You can't encrypt an existing un-encrypted EFS file system
- Create a new encrypted EFS File System and migrate the file using AWS DataSync

# ABAC with KMS

- Control access to your KMS Keys based on tags and aliases

# KMS with SSM Parameter Store

- SSM Parameter Store uses KMS to encrypt/decrypt parameter values of type Secure String
- Two types of Secure String Parameters:
  - Standard - all parameters encrypted using the same KMS key
  - Advanced - each parameter encrypted with a unique data key (Envelope Encryption)
- Specify the KMS key or use AWS Managed key (aws/ssm)
- Works only with Symmetric KMS Keys
- Encryption process takes place in AWS KMS
- Note: you must have access to both the KMS key and the parameter in SSM Parameter Store

# AWS Secrets Manager

- Newer service, meant for storing secrets
- Capability to force rotation of secrets every X days
- Automate generation of secrets on rotation (uses Lambda)
- Integration with Amazon RDS (MySQL, PostgreSQL, Aurora)
- Secrets are encrypted using KMS
- Mostly meant for RDS integration

# AWS Secrets Manager - Multi-Region Secrets

- Replicate Secrets across multiple AWS Regions
- Secrets Manager keeps read replicas in sync with the primary Secret
- Ability to promote a read replica Secret to a standalone Secret
- Use cases: multi-region apps, disaster recovery strategies, multi-region DB...

# KMS with Secrets Manager

- Secrets Manager uses KMS to encrypt/decrypt every version of every Secret value
- Each Secret value is encrypted with a unique data key (Envelope Encryption)
- Specify the KMS key or use AWS Managed Key (aws/secretsmanager)
- Works only with Symmetric KMS Keys
- Encryption process takes place in Secrets Manager
- Note: you must have access to both the KMS key and the Secret in Secrets Manager

# Secrets Manager - Secrets Rotation

- Automatically and periodically updating a Secret
- Automated password rotation for integrated databases
- RDS, Redshift, DocumentDB, other databases...
- Credentials are changed in the Secret and the database
- Secrets Manager uses Lambda function to rotate Secrets
- When you Enable Secret Rotation, the Secret is rotated immediately
- Note: Lambda function must have access to both Secrets Manager and your database (if Lambda in VPC private subnet, use VPC Endpoints or NAT Gateway)

# Secrets Manager - Resource Policy

- Specify who can access a Secret and what actions an IAM identity can perform
- Use cases:
  - Grant access to a single Secret for multiple users
  - Enforcing permissions (e.g., adding an explicit deny to a secret)
  - Sharing a Secret between AWS accounts

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "secretsmanager:*",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/SecretsManagerRole"
      },
      "Resource": "*"
    }
  ]
}
```

# Amazon S3 - Object Encryption

- You can encrypt objects in S3 buckets using one of 4 methods
- Server-Side Encryption (SSE)
  - Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3) - Enabled by default
    - Encrypts S3 objects using key handled, managed, and owned by AWS
  - Server-Side Encryption with KMS Keys stored in AWS KMS (SSE-KMS)
    - Leverage AWS Key Management Service (AWS KMS) to manage encryption keys
  - Server-Side Encryption with Customer-Provided Keys (SSE-C)
    - When you want to manage your own encryption keys
- Client-Side Encryption

# Amazon S3 Encryption - SSE-S3

- Encryption using keys handled, managed, and owned by AWS
- Object is encrypted server-side
- Encryption type is AES-256
- Must set header "x-amz-server-side-encryption":"AES256"
- Enabled by default for new buckets and new objects

# Amazon S3 Encryption - SSE-KMS

- Encryption using keys handled and managed by AWS KMS (Key Management Service)
- KMS advantages: user control + audit key usage using CloudTrail
- Object is encrypted server side
- Must set header "x-amz-server-side-encryption":"aws:kms"

# SSE-KMS Limitation

- If you use SSE-KMS, you may be impacted by the KMS limits
- When you upload, it calls the GenerateDataKey KMS API
- When you download, it calls the Decrypt KMS API
- Count towards the KMS quota per second (5500, 10000, 30000 req/s based on region)
- You can request a quota increase using the Service Quotas Console

# Amazon S3 Encryption - SSE-C

- Server-Side Encryption using keys fully managed by the customer outside of AWS
- Amazon S3 does NOT store the encryption key you provide
- HTTPS must be used
- Encryption key must be provided in HTTP headers, for every HTTP request made

# Amazon S3 Encryption - Client-Side Encryption

- Use client libraries such as Amazon S3 Client-Side Encryption Library
- Client must encrypt data themselves before sending to Amazon S3
- Clients must decrypt data themselves when retrieving from Amazon S3
- Customer fully manages the keys and encryption cycle

# Amazon S3 - Encryption in transit (SSL/TLS)

- Encryption in flight is also called SSL/TLS
- Amazon S3 exposes two endpoints:
  - HTTP (unencrypted)
  - HTTPS (encrypted)
- HTTPS is recommended for all S3 operations
- HTTPS is mandatory for SSE-C (Server-Side Encryption with Customer-Provided Keys)
- Most clients would use the HTTPS endpoint by default

# Amazon S3 - Force Encryption in Transit aws:SecureTransport

# S3 Encryption for Objects

- SSE-S3: encrypts S3 objects using keys handled and managed by AWS
- SSE-KMS: leverage KMS to manage encryption keys
  - Key usage appears in CloudTrail
  - objects made public can never be read
  - Ob s3:PutObject, make the permission kms:GenerateDataKey is allowed
- SSE-C: when you want to manage your own encryption keys
- Client-Side Encryption
- Glacier: all data is AES-256 encrypted, key under AWS control

# Amazon S3 - Default Encryption vs. Bucket Policies

- SSE-S3 encryption is automatically applied to new objects stored in S3 buckets
- Optionally, you can "force encryption" using a bucket policy and refuse any API call to PUT an S3 object without encryption headers (SSE-KMS or SSE-C)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "aws:kms"
        }
      }
    }
  ]
}
```

Note: Bucket Policies are evaluated before "Default Encryption"

# S3 Bucket Key for SSE-KMS encryption

- New setting to decrease...
  - Number of API calls made to KMS from S3 by 99%
  - Costs of overall KMS encryption with Amazon S3 by 99%
- This leverages data keys
  - A "S3 bucket key" is generated
  - That key is used to encrypt KMS objects with new data keys
- You will see less KMS CloudTrail events in CloudTrail

# Large File Upload to S3 with KMS key

- When uploading a large file to S3 with KMS encryption, you'll have to use S3 multi-part upload
- You must have the following permissions to the KMS Key:
  - kms:GenerateDataKey - allows you to encrypt object part with a unique Data Key
  - kms:Decrypt - decrypt object parts before they can be assembled, then re-encrypt them with the KMS key

# S3 Batch - Object Encryption

- S3 Batch - perform bulk operations on existing S3 objects with a single request (e.g., encrypt un-encrypted objects)
- S3 Inventory - to get the list of all objects and it's associated metadata (select Encryption Status from optional fields)
- Athena - to filter and list only un-encrypted objects
- Note: S3 Batch Operations job must have access to the S3 bucket and the KMS key

# S3 Glacier Vault Lock

- Adopt a WORM (Write Once Read Many) model
- Create a Vault Lock policy
- Lock the policy for future edits (can no longer be changed or deleted)
- Helpful for compliance and data retention

# S3 Object Lock (versioning must be enabled)

- Adopt a WORM (Write Once Read Many) model
- Block an object version deletion for a specified amount of time
- Retention mode - Compliance:
  - Object versions can't be overwritten or deleted by any user, including the root user
  - Objects retention modes can't be changed, and retention periods can't be shortened
- Retention mode - Governance:
  - Most users can't overwrite or delete an object version or alter its lock settings
  - Some users have special permissions to change the retention or delete the object
- Retention Period: protect the object for a fixed period, it can be extended
- Legal Hold:
  - protect the object indefinitely, independent from retention period
  - can be freely placed and removed using the s3:PutObjectLegalHold IAM permission

# Amazon S3 Glacier - Vault Policies and Vault Lock

- Each Vault has:
  - ONE vault access policy
  - ONE vault lock policy
- Vault Policies are written in JSON
- Vault Access Policy is like a bucket policy (restrict user / account permissions)
- Vault Lock Policy is a policy you lock, for regulatory and compliance requirements
  - The policy is immutable, it can never be changed (that's why it's call LOCK)
  - Example 1: forbid deleting an archive if less than 1 year old
  - Example 2: implement WORM policy (write once read many)

# Amazon S3 - Moving between Storage Classes

- You can transition objects between storage classes
- For infrequently accessed object, move them to Standard IA
- For archive objects that you don't need fast access to, move them to Glacier or Glacier Deep Archive
- Moving objects can be automated using a Lifecycle Rules

# Amazon S3 - Lifecycle Rules

- Transition Actions - configure objects to transition to another storage class
  - Move objects to Standard IA class 60 days after creation
  - Move to Glacier for archiving after 6 months
- Expiration actions - configure objects to expire (delete) after some time
  - Access log files can be set to delete after 365 days
  - Can be used to delete old versions of files (if versioning is enabled)
  - Can be used to delete incomplete Multi-Part Uploads
- Rules can be created for a certain prefix (example:s3://mybucket/mp3/\*)
- Rules can be created for certain objects Tags (example: Department:Finance)

# Amazon S3 - Lifecycle Rules (Scenario 1)

- Your application on EC2 creates images thumbnails after profile photos are uploaded to Amazon S3.
  These thumbnails can be easily recreated, and only need to be kept for 60 days. The source images should be able to be immediately retrieved for these 60 days, and afterwards, the user can wait up to 6 hours. How would you design this?
- S3 source images can be on Standard, with a lifecycle configuration to transition them to Glacier after 60 days
- S3 thumbnails can be on One-Zone IA, with a lifecycle configuration to expire them (delete them) after 60 days

# Amazon S3 - Lifecycle Rules (Scenario 2)

- A rule in your company states that you should be able to recover your deleted S3 objects immediately for 30 days, although this may happen rarely. After this time, and for up to 365 days, deleted objects should be recoverable within 48 hours.
- Enable S3 Versioning in order to have object versions, so that "deleted objects" are in fact hidden by a "delete marker" and can be recovered
- Transition the "noncurrent versions" of the object to Standard IA
- Transition afterwards the "noncurrent versions" to Glacier Deep Archive

# Amazon S3 Analytics - Storage Class Analysis

- Help you decide when to transition objects to the right storage class
- Recommendations for Standard and Standard IA
  - Does NOT work for One-Zone IA or Glacier
- Report is updated daily
- 24 to 48 hours to start seeing data analysis

# Amazon S3 - Replication (CRR and SRR)

- Must enable Versioning in source and destination buckets
- Cross-Region Replication (CRR)
  - Replicate objects across different AWS Regions
  - Use cases: disaster recovery, compliance, low-latency access to data in multiple regions
- Same-Region Replication (SRR)
  - Replicate objects within the same AWS Region
  - Use cases: compliance, data protection, data lifecycle management
- Buckets can be in different AWS accounts
- Copying is asynchronous
- Must give proper IAM permissions to S3

- Use cases:
  - CRR - compliance, lower latency access, replication across accounts
  - SRR - log aggregation, live replication between production and test accounts

# Amazon S3 - Replication (Notes)

- After you enable Replication, only new objects are replicated
- Optionally, you can replicate existing objects using S3 Batch Replication

  - Replicates existing objects and objects that failed replication

- For DELETE operations
  - Can replicate delete markers from source to target (optional setting)
  - Deletions with a version ID are not replicated (to avoid malicious deletes)

# What is load balancing?

- Load balancers are servers that forward internet traffic to multiple servers (EC2 instances) downstream

# Why use a load balancer?

- Spread load across multiple downstream instances
- Expose a single point of access (DNS) to your application
- Seamlessly handle failures of downstream instances
- Do regular health checks to your instances
- Provide SSL termination (HTTPS) for your websites
- High availability across zones

# Why use an Elastic Load Balancer?

- An ELB (Elastic Load Balancer) is a managed load balancer
  - AWS guarantees that it will be working
  - AWS takes care of upgrades, maintenance, high availability
  - AWS provides only a few configuration knobs
- It costs less to setup your own load balancer but it will be a lot more effort on your end (maintenance, integrations)
- 4 kinds of load balancers offered by AWS
  - Application Load Balancer (HTTP / HTTPS only) - Layer 7
  - Network Load Balancer (TCP, UDP, TLS) - Layer 4
  - Gateway Load Balancer (Third party appliances) - Layer 3
  - Classic Load Balancer (Old, not recommended anymore, retired in 2023) - Layer 4 and Layer 7

# Network Load Balancer (v2)

- Network load balancers (Layer 4) allow to:

  - Forward TCP and UDP traffic to your instances
  - Handle millions of request per seconds
  - Ultra-low latency

- NLB has one static IP per AZ, and supports assigning Elastic IP (helpful for whitelisting specific IP)
- NLB are used for extreme performance, TCP or UDP traffic
- Not included in the AWS free tier

# Network Load Balancer - Target Groups

- EC2 instances
- IP addresses - must be private IPs
- Application load balancer
- Health checks support the TCP, HTTP and HTTPs protocols

# Network Load Balancer - Client IP Preservation

- Client IP addresses are forwarded to Network Load Balancer targets
- When disabled, the private IP address of the network load balancer becomes the client IP address for all incoming traffic
- Default Settings:
  - Targets by instance ID / ECS Tasks: Enabled
  - Targets by IP address TCP and TLS: Disabled (default)
  - Targets by IP address UDP and TCP_UDP: Enabled (default)
- Note: Can't be disabled for both targets by instance ID and by IP address (UDP and TCP_UDP)

# Network Load Balancer - Security Groups

- Network Load Balancers can have associated Security Groups

# Sticky Sessions (Session Affinity)

- It is possible to implement stickiness so that the same client is always redirected to the same instance behind a load balancer
- This works for Classic Load Balancer, Application Load Balancer, and Network Load Balancer
- The "cookie" used for stickiness has an expiration date you control, (note: NLB works without cookies)
- Use case: make sure the user doesn't lose his session data
- Enabling stickiness may bring imbalance to the load over the backend EC2 instances

# Sticky Sessions - Cookies Names

- Application-based Cookies
  - Custom cookie
    - Generated by the target
    - Can include any custom attributes required by the application
    - Cookie name must be specified individually for each target group
    - Don't use AWSALB, AWSALBAPP, or AWSALBTG (reserved for use by the ELB)
  - Application cookie
    - Generated by the load balancer
    - Cookies name is AWSALBAPP
    - Cookie name must be specified individually for each target group
- Duration-based Cookies
  - Generated by the load balancer
  - Cookie name is AWSALB for ALB, AWSELB for CLB
  - Cookie name is the same for all target groups

# SSL/TLS - Basics

- An SSL Certificate allows traffic between your clients and your load balancer to be encrypted in transit (in-flight encryption)
- SSL refers to Secure Sockets Layer, used to encrypt connections
- TLS refers to Transport Layer Security, which is a newer version
- Nowadays, TLS certificates are mainly used, but people still refer to them as SSL certificates
- Public SSL certificates are issued by Certificate Authorities (CA)
- Comodo, Symantec, GoDaddy, GlobalSign, DigiCert, Letsencrypt, etc...
- SSL certificates have an expiration date (you set) and must be renewed

# Load Balancer - SSL Certificates

- The load balancer uses an X.509 certificate (SSL/TLS server certificate)
- You can manage certificates using ACM (AWS Certificate Manager)
- You can create upload your own certificates alternatively
- HTTPS listener:
  - You must specify a default certificate
  - You can add an optional list of certs to support multiple domains
  - Clients can use SNI (Server Name Indication) to specify the hostname they reach
  - Ability to specify a security policy to support older versions of SSL / TLS (legacy clients)

# SSL - Server Name Indication (SNI)

- SNI solves the problem of loading multiple SSL certificates onto one web server (to serve multiple websites)
- It's a "newer" protocol, and requires the client to indicate the hostname of the target server in the initial SSL handshake
- The server will then find the correct certificate, or return to the default one

## Note:

- Only works for ALB and NLB (newer generation), CloudFront
- Does not work for CLB (older gen)

# Elastic Load Balancers - SSL Certificates

- Classic Load Balancer (v1)
  - Support only one SSL certificate
  - Must use multiple CLB for multiple hostname with multiple SSL certificates
  - The SSL certificate can have many Subject Alternative Names (SAN), but the SSL certificate must be changed anytime a SAN is added / edited / removed
- Application Load Balancer (v2)
  - Supports multiple listeners with multiple SSL certificates
  - Uses Server Name Indication (SNI) to make it work
- Network Load Balancer (v2)
  - Supports multiple listeners with multiple SSL certificates
  - Uses Server Name Indication (SNI) to make it work

# Elastic Load Balancer - SSL Certificates

- The load balancer uses an X.509 certificate (SSL/TLS server certificate)
- You can manage certificates using ACM (AWS Certificate Manager)
- You can create upload your own certificates alternatively
- HTTPS listener:
  - You must specify a default certificate
  - You can add an optional list of certs to support multiple domains
  - Clients can use SNI (Server Name Indication) to specify the hostname they reach
  - Ability to specify a Security Policy (for compliance, features, compatibility or security)

# HTTPS/SSL Listener - Security Policy

- A combination of SSL protocols, SSL ciphers, and Server Order Preference option supported during SSL negotiations
- Predefined Security Policies (e.g., ELBSecurityPolicy-2016-08)
- For ALB and NLB
  - Frontend connections, you can use a predefined Security Policy
  - Backend connections, ELBSecurityPolicy-2016-08 Security Policy is always used
- Use ELBSecurityPolicy-TLS policies
  - To meet compliance and security standards that require certain TLS protocol version
  - To support older versions of SSL/TLS (legacy clients)
- Use ELBSecurityPolicy-FS policies, if you require Forward Secrecy
  - Forward Secrecy (FS) ensures that session keys will not be compromised even if the private key of the server is compromised
  - FS uses ephemeral keys (DHE or ECDHE) to generate unique session keys for each connection

# Network Load Balancer - SSL/TLS and HTTPS

- NLB uses a Server Certificate to terminate and decrypt the front-end connections before sending them to the targets
- To create a TLS listener, you must attach at least one server certificate from ACM on NLB
- If client IP preservation enabled: both source IP address and port is presented to your backend servers, even when TLS is terminated at the NLB
- Network Load Balancers do not support TLS re-negotiation or mutual TLS authentication (mTLS)
- Use TCP Listener on port 443 to pass encrypted traffic to the targets without the NLB decrypting it
- Important: don't use a TLS listener
- The targets must be able to decrypt the traffic
- TCP Listeners also support mTLS, because the NLB passes the request as is, and you can implement mTLS on the targets

# AWS Certificate Manager (ACM)

- To host public SSL certificates in AWS, you can:
  - Buy your own and upload them using the CLI
  - Have ACM provision and renew public SSL certificates for you (free of cost)
- ACM loads SSL certificates on the following integrations:
  - Load Balancers (including the ones created by Elastic Beanstalk)
  - CLoudFront distributions
  - APIs on API gateway
- SSL certificates is overall a pain to manually manage, so ACM is great to leverage in your AWS infrastructure

# ACM - Good to known

- Possibility of creating public certificates
  - Must verify public DNS
  - Must be issues by a trusted public certificate authority (CA)
- Possibility of creating private certificates
  - For your internal applications
  - You create your own private CA using ACM Private CA
- Certificate renewal:
  - Automatically done if generated provisioned by ACM
  - Any manually uploaded certificates must be renewed manually and re-uploaded
- ACM is a regional service
  - To use with a global application (multiple ALB for example), you need to issues an SSL certificate in each region where your application is deployed
  - You cannot copy cert across regions

# AWS Private certificate authority (CA)

- Managed service allows you to create private Certificate Authorities (CAs), including root and subordinary CAs
- Can issue and deploy end-entity X.509 certificates
- Certificates are trusted only by your Organization (not the public internet)
- Integrates with Amazon EKS with and any AWS service that is integrated with ACM
- Use cases:
  - Encrypted TLS communication, Cryptographically signing code
  - Authenticate users, computers, API endpoints, and IoT devices
  - Enterprise customers building a Public Key Infrastructure (PKI)

# ACM - Validation Techniques

- Before ACM issue a public certificate, you must prove that you own/control the domain
- DNS validation (recommended)
  - Leverages a CNAME record created in DNS config (e.g., Route 53)
  - Preferred for automatic renewal purposes
  - Takes a few minutes to verify
- Email validation
  - a validation email is sent to contact addresses in the WHOIS database
  - takes a few minutes to verify
- Note: ACM Validation is NOT required for imported certificates signed by a Private CA

# ACM - Automatic Renewal

- ACM Fails to renew a DNS validated certificate
  - Most likely due to missing or inaccurate CNAME records in your DNS configuration
  - You can try email validation (requires action by the domain owner)
- ACM sends renewal notices 45 days before expiration
- Renewal emails sent to the Domains WHOIS mailbox addresses
- Email contains a link that Domain owner can click for easy renewal
- ACM issues a renewed certificate with the same ARN

# ACM - Pending Validation - How to resolve?

- Resolution:
  - Confirm CNAME record is added to the correct DNS config.
  - `dig +short _a79b2c3d4e5f6g7h8i9.example.com`
  - Confirms CNAME record in your DNS config. contains no additional characters or has no missing characters
  - If your DNS provider automatically adds the bare domain to the end of its DNS records, remove the bare domain from the DNS record name
    - \_a79b2c3d4e5f6g7h8i9.example.com.example.com
  - If there are both CNAME and TXT records for the same domain name, then delete the TXT record
    - `dig +short CNAME _a79b2c3d4e5f6g7h8i9.example.com`
    - `dig TXT _a79b2c3d4e5f6g7h8i9.example.com`

# Process to Manually Create a Certificate

- You can create a Certificate manually, then upload the Certificate to either ACM or IAM

# ACM - Monitor Expired Imported Certificates

- ACM sends daily expiration events starting 45 days prior to expiration
  - The # of days can be configured
- AWS Config has a managed rule named acm-certificate-expiration-check to check for expiring certificates (configurable number of days)

# AWS Backup

- Fully managed service
- Centrally manage and automate backups across AWS services
- No need to create custom scripts and manual processes
- Supported services:
  - Amazon EC2 / Amazon EBS
  - Amazon S3
  - Amazon RDS (all DBs engines) / Amazon Aurora / Amazon DynamoDB
  - Amazon DocumentDB / Amazon Neptune
  - Amazon EFS / Amazon FSx (Lustre and Windows File Server)
  - AWS Storage Gateway (Volume Gateway)
- Supports cross-region backups
- Supports cross-account backups
- Supports PITR for supported services
- On-Demand and Scheduled backups
- Tag-based backup policies
- You create backup policies known as Backup Plans
  - Backup frequency (every 12 hours, daily, weekly, monthly, cron expression)
  - Backup window
  - Transition to Cold Storage (Never, Days, Weeks, Months, Years)
  - Retention Period (Always, Days, Weeks, Months, Years)

# AWS Backup Vault Lock

- Enforce a WORM (Write Once Ready Many) state for all the backups that you store in your AWS Backup Vault
- Additional layer of defense to protect your backups against:
  - Inadvertent or malicious delete operations
  - Updates that shorten or alter retention periods
- Even the root user cannot delete backups when enabled

# Amazon Data Lifecycle Manager

- Automate the creation, retention, and deletion of EBS snapshots and EBS-backed AMIs
- Schedule backups, cross-account snapshot copies, delete outdated backups,...
- Uses resource tags to identify the resources (EC2 instances, EBS volumes)
- Can't be used to manage snapshots / AMIs created outside DLM
- Can't be used to manage instance-store backed AMIs

# AWS Nitro Enclaves

- Process highly sensitive data in an isolated compute environment
  - Personally Identifiable Information (PII), healthcare, financial, ...
- Fully isolated virtual machines, hardened, and highly constrained
  - Not a container, not persistent storage, no interactive access, no external networking
- Helps reduce the attack surface for sensitive data processing apps
  - Cryptographic Attestation - only authorized code can be running in your Enclave
  - Only Enclaves can access sensitive data (integration with KMS)
- use cases: securing private keys, processing credits cards, secure multi-party computation...

# AWS Organizations

- Global service
- Allows to manage multiple AWS accounts
- The main account is the management account
- Other accounts are member accounts
- Member accounts can only be part of one organization
- Consolidated Billing across all accounts - single payment method
- Pricing benefits from aggregated usage (volume discount for EC2, S3...)
- Shared reserved instances and Savings Plans discounts across accounts
- API is available to automate AWS account creation

- Advantages
  - Multi Account vs. One Account Multi VPC
  - Use tagging standards for billing purposes
  - Enable CloudTrail on all accounts, send logs to central S3 account
  - Send CloudWatch Logs to a central logging account
  - Establish Cross Account Roles for Admin purposes
- Security: Service Control Policies (SCP)
  - IAM policies applied to OU or Accounts to restrict Users and Roles
  - They do not apply to the management account (full admin power)
  - Must have an explicit allow from the root through each OU in the direct path to the target account (does not allow anything by default - like IAM)

# AWS Organizations - Reserved Instances

- For billing purposes, the consolidated billing feature of AWS Organizations treats all the accounts in the organization as one account
- This means that all accounts in the organization can receive the hourly cost benefit of Reserved Instances that are purchased by any other account.
- The payer account (master account) of an organization can turn off Reserved Instance (RI) discount and Savings Plans discount sharing for any accounts in that organization, including the payer account.
- This means that RIs and Savings Plans discounts aren't shared between any accounts that have sharing turned off.
- To share an RI or Savings Plans discount with an account, both accounts must have sharing turned on.

# AWS Organizations - IAM Policies

- Use aws:PrincipalOrgID condition key in your resource-based policies to restrict access to IAM principals from accounts in an AWS Organization

# AWS Organizations - Tag Policies

- Helps you standardize tags across resources in an AWS Organization
- Ensure consistent tags, audit tagged resources, maintain proper resources categorization...
- You define tag keys and their allowed values
- Helps with AWS Cost Allocation Tags and Attribute-based Access Control (ABAC)
- Prevent any non-compliant tagging operations on specified services and resources (has no effect on resources without tags)
- Generate a report that lists all tagged/non-compliant resources
- Use CloudWatch Events to monitor non-compliant tags

# AWS Control Tower

- Easy way to set up and govern a secure and compliant multi-account AWS environment based on best practices
- Benefits:
  - Automate the set up of your environment in a few clicks
  - Automate ongoing policy management using guardrails
  - Detect policy violations and remediate them
  - Monitor compliance through an interactive dashboard

# AWS Control Tower - Account Factory

- Aoutomates account provisioning and deploymenets
- Enables you to create pre-approved baselines and configuration options for AWS accounts in your organziation (e.g., VPC default configuration, subnets, region,...)
- Uses AWS Service Catalog to provision new AWS accounts

# AWS Control Tower - Detect and Remediate Policy Violations

- Guardrail
  - Provides ongionig governance for your Control Tower environment (AWS Accounts)
  - Preventive - using SCPs (e.g., Dissalow Creation of Access Keys for the Root User)
  - Detective - using AWS Config (e.g., Detect Whether MFA for the Root User is Enabled)
  - Example: identify non-compliant resources (e.g., untagged resources)

# AWS Control Tower - Guardrails Levels

- Mandatory

  - Automatically enabled and enforced by AWS Control Tower
  - Example: Disallow public Read access to the Log Archive account

- Strongly recommended

  - Based on AWS best practices
  - Example: Enable encryption for EBS volumes attached to EC2 instances

- Elective
  - Commonly used by enterprises
  - Example: Disallow delete actions without MFA in S3 buckets

# AWS Config

- Helps with auditing and recording compliance of your AWS resources
- Helps record configurations and changes over time
- Questions that can be solved by AWS Config:
  - Is there unrestricted SSH access to my security groups?
  - Do my buckets have any public access?
  - How has my ALB configuration changed over time?
- You can receive alerts (SNS notifications) for any changes
- AWS Config is a per-region service
- Can be aggregated across regions and accounts
- Possibility of storing the configuration data into S3 (analyzed by Athena)

# Config Rules

- Can use AWS managed config rules (over 75)
- Can make custom config rules (must be defined in AWS Lambda)
  - Ex: evaluate if each EBS disk is of type gp2
  - Ex: evaluate if each EC2 instance is t2.micro
- Rules can be evaluated / triggered
  - For each config change
  - And / or: at regular time intervals
- AWS Config Rules does not prevent actions from happening (no deny)
- Pricing: no free tier, $0.003 per configuration item recorded per region, $0.001 per config rule evaluation per region

# AWS Config resource

- View compliance of a resource over time
- View configuration of a resource over time
- View CloudTrail API calls of a resource over time

# Config Rules - Remediations

- Automate remediation of non-compliant resources using SSM Automation Documents
- Use AWS-Managed Automation Documents or create custom Automation Documents
  Tip: you can create custom Automation Documents that invokes Lambda function
- You can set Remediation Retries if the resource is still non-compliant after auto-remediation

# Config Rules - Notifications

- Use EventBridge to trigger notifications when AWS resources are non-compliant
- Ability to send configuration changes and compliance state notifications to SNS (all events - use SNS Filtering or filter at client-side)

# AWS Config - Aggregators

- The aggregator is crated in one central aggregator account
- Aggregates rules, resources, etc... across multiple accounts and regions
- If using AWS Organizations, no need for individual Authorization
- Rules are created in each individual source AWS account
- Can deploy rules to multiple target accounts using CloudFormation StackSets

# AWS Config - Use Cases

- Audit IAM policies
- Detect if CloudTrail has been disabled
- Detect if EC2 instances are created with unapproved AMIs
- Detect if Security Groups are open to the public
- Detect if Internet Gateway is added to unauthorized VPC
- Detect if EBS volumes are encrypted
- Detect if RDS databases are public

# Trusted Advisor

- No need to install anything - high level AWS account assessment
- Analyze your AWS accounts and provides recommendations on 6 categories:
  - Cost Optimization
  - Performance
  - Security
  - Fault Tolerance
  - Service Limits
  - Operational Excellence
- Business and Enterprise Support plans have access to all Trusted Advisor checks
  - Full Set of checks
  - Programmatic access to Trusted Advisor using the API

# Cost Explorer

- Visualize, understand, and manage your AWS costs and usage over time
- Create custom reports that analyze cost and usage data
- Analyze your data at a high level: total costs and usage across all accounts
- Or Monthly, hourly, resource level granularity
- Choose an optimal Savings Plan (to lower prices on your bill)
- Forecast usage up to 12 months based on previous usage

# AWS Cost Anamoly Detection

- Continously monitor your cost and usage using ML to detect unusual spends
- It learns your unique, historic spend patterns to detect one-time cost spike and/or continuous cost insreases (you don't need to define thresholds)
- Monitor AWS services, memeber accounts, cost allocation tags, or cost categories
- Sends you the anomaly detection report with root-cause analysis
- Get notified with individual alerts or daily/weekly summary (using SNS)

# Well Architected Framework general guiding principles

- http://aws.amazon.com/architecture/well-architected/
- stop guessing your capacity needs
- test systems at production scale
- automate to make architectural experimentation easier
- allow for evolutionary architectures
  - design based on changing requirements
- Drive architectures using data
- improve through game days
  - simulate applications for flash sale days

# Well Architected Framework - 6 Pillars

1. operational excellence
   - operations in the cloud
   - monitoring, incident response, change management, etc...
2. security
   - protect data, systems, and assets
   - risk management, identity and access management, detective controls, infrastructure protection, data protection, incident response
3. reliability
   - ensure a workload performs its intended function correctly and consistently
   - recover from failures, dynamically acquire computing resources to meet demand, mitigate disruptions
4. performance efficiency
   - use IT and computing resources efficiently
   - adapt to ever-changing requirements and technologies
5. cost optimization
   - avoid unnecessary costs
   - control where the money goes, use managed services, analyze spend over time
6. sustainability
   - minimize the environmental impacts of running your workloads in the cloud
   - energy efficiency, sustainable architecture, sustainable operations

# AWS Well Architected Tool

- Free tool to review your architectures against the 6 pillars well-architected framework and adopt architectural best practices
- How does it work?
  - Select your workload and answer questions
  - Review your answers against 6 pillars
  - obtain advice: get videos and documentations, generate a report, see the results in a dashboard
- Let's have a look: https://console.aws.amazon.com/wellarchitected

# AWS Audit Manager

- Assess risk and compliance of your AWS workloads
- Continuously audit AWS services usage and prepare audits
- Prebuilt frameworks include:
  - CIS AWS Foundations Benchmark 1.2.0 and 1.3.0
  - General Data Protection Regulation (GDPR)
  - Health Insurance Portability and Accountability Act (HIPAA)
  - Payment Card Industry Data Security Standard (PCI DSS)
  - Service Organization Control (SOC) 2
- Generates reports of compliance alongside evidence folders
- Integrates with security hub, config, control tower, cloudtrail, license manager
- Run over multi-account via integration with AWS Organizations

# CloudFormation - Service Role

- IAM role that allows CloudFormation to create/update/delete stack resources on your behalf
- Give ability to users to create/update/delete the stack resources even if they don't have permissions to work with the resources in the stack
- Use cases:
  - You want to achieve the least privilege principle
  - But you don't want to give the user all the required permissions to create the stack resources
- User must have iam:PassRole permissions

# CloudFormation Stack Policies

- During a CloudFormation Stack update, all update actions are allowed on all resources (default)
- A stack policy is a JSON document that defines the update actions that are allowed on specific resources during Stack updates
- Protect resources from unintentional updates
- When you set a Stack Policy, all resources in the Stack are protected by default
- Specify an explicit ALLOW for the resources you want to be allowed to be updated

# CoudFormation - Dynamic References

- You can reference external values stored in SSM Parameter Store or Secrets Manager within a CFN template
- CloudFormation retrieves the value during stack create and update operations
- Database credentials, passwords, 3rd party API keys, etc...
- Example: retrieve RDS DB Instance master password from Secrets Manager
- Supports
  - ssm - plaintext values stored in SSM Parameter Store
  - ssm-secure - secure strings stored in SSM Parameter Store
  - secretsmanager - secret values stored in Secrets Manager

# CloudFormation - Termination Protection

- To prevent accidental deletes of CloudFormation Stacks, use TerminationProtection

# CloudFormation - Drift

- CloudFormation allows you to create infrastructure
- But it doesn't protect you against manual configuration changes
- How do we know if our resources have drifted?
- We can use CloudFormation Drift

# StackSet Drift Detection

- Performs drift detection on the stack associated with each stack instance in the StackSet
- If the current state of a resource in a stack varies from the expected state:
  - The stack considered drifted
  - And the stack instance that the stack associated with considered drifted
  - And the StackSet is considered drifted
- Drift detection identifies unmanaged changes (outside CloudFormation)
- Changes made through CloudFormation to a stack directly (not at the StackSet level), aren't considered drifted
- You can stop drift detection on a StackSet

# CloudFormation Guard (cfn-guard)

- An open-source CLI tool to validate CFN templates against organization policy guidelines
- Example: ensure users always create encrypted S3 buckets
- You define your own policies as code using a declarative Domain-Specific Language (DSL)
- Provides a built-in testing framework to verify that your rules work as intended
- Doesn't validate CFN templates against syntax
- Can be used as part of CI/CD pipeline

# AWS Service Catalog

- Users that are new to AWS have too many options, and may create stacks that are not compliant / in line with the rest of the organization
- Some users just want a quick self-service portal to launch a set of authorized products pre-defined by admins

# AWS Resource Access Manager (RAM)

- Share AWS resources that you own with other AWS accounts
- Share with any account or within your Organization
- Avoid resource duplication
- VPC Subnets:
  - allow to have all the resources launched in the same subnets
  - must be from the same AWS Organizations
  - Cannot share security groups and decault VPC
  - Participants can manage their own resources in there
  - Participant can't view, modify, delete resources that belong to other participants or the owner
- AWS Transit Gateway
- Route53 Resolver Rules
- License Manager License Configurations

# Site-to-Site VPN connection as a backup

- In case direct connect fails, you can set up a backup Direct Connect connection (expensive), or a Site-to-Site VPN connection
