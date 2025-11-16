// Core AWS Network Game Type Definitions

export type NodeType =
  | 'vpc'
  | 'subnet'
  | 'igw'
  | 'nat-gw'
  | 'tgw'
  | 'tgw-attachment'
  | 'vgw'
  | 'vpn'
  | 'dx'
  | 'on-prem'
  | 'internet'
  | 'alb'
  | 'nlb'
  | 's3-endpoint'
  | 'rds'
  | 'ec2'
  | 'route53'
  | 'cloudfront'
  | 'global-accelerator'
  | 'network-firewall'
  | 'gwlb';

export type SubnetType = 'public' | 'private' | 'isolated';

export type RouteTarget =
  | 'local'
  | 'igw'
  | 'nat-gw'
  | 'tgw'
  | 'vgw'
  | 'peering'
  | 'privatelink'
  | 'blackhole';

export interface Position {
  x: number;
  y: number;
}

export interface NetworkNode {
  id: string;
  type: NodeType;
  name: string;
  position: Position;
  config: NodeConfig;
}

export interface NodeConfig {
  // VPC specific
  cidr?: string;
  ipv6Cidr?: string;

  // Subnet specific
  subnetType?: SubnetType;
  availabilityZone?: string;

  // EC2/Instance specific
  privateIp?: string;
  publicIp?: string;

  // Route table
  routes?: Route[];

  // Security groups
  securityGroups?: SecurityGroup[];

  // NACLs
  nacls?: NACL[];

  // BGP for DX/VPN
  bgpAsn?: number;
  bgpPreference?: number;

  // Health check for Route53
  healthCheckEnabled?: boolean;

  // Custom properties
  [key: string]: any;
}

export interface Route {
  destination: string;
  target: RouteTarget;
  targetId?: string;
  priority?: number;
}

export interface SecurityGroup {
  id: string;
  name: string;
  inboundRules: SecurityRule[];
  outboundRules: SecurityRule[];
}

export interface SecurityRule {
  protocol: 'tcp' | 'udp' | 'icmp' | 'all';
  portRange?: { from: number; to: number };
  source?: string; // CIDR or SG ID
  destination?: string;
  action: 'allow' | 'deny';
}

export interface NACL {
  id: string;
  name: string;
  rules: NACLRule[];
}

export interface NACLRule {
  ruleNumber: number;
  protocol: 'tcp' | 'udp' | 'icmp' | 'all';
  portRange?: { from: number; to: number };
  source?: string;
  destination?: string;
  action: 'allow' | 'deny';
  egress: boolean;
}

export interface Connection {
  id: string;
  from: string; // node ID
  to: string;   // node ID
  type: 'peering' | 'tgw' | 'vpn' | 'dx' | 'privatelink' | 'internet' | 'route';
  bidirectional: boolean;
  cost?: number; // for scoring
  latency?: number; // ms
}

export interface PacketPath {
  hops: PacketHop[];
  success: boolean;
  blockedAt?: number; // hop index where blocked
  reason?: string;
}

export interface PacketHop {
  nodeId: string;
  nodeName: string;
  action: 'forward' | 'nat' | 'route' | 'blocked' | 'arrived';
  reason?: string;
  matchedRoute?: Route;
  matchedRule?: SecurityRule | NACLRule;
}

export interface Packet {
  id: string;
  sourceIp: string;
  destIp: string;
  protocol: 'tcp' | 'udp' | 'icmp';
  port?: number;
  currentPosition?: Position;
}
