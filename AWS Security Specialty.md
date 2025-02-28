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
