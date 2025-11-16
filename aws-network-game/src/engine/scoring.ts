import { GameLevel } from '../types/game';
import { NetworkNode, PacketPath } from '../types/network';

export interface ScoreResult {
  stars: number;
  cost: number;
  security: number;
  latency: number;
  feedback: string[];
  objectivesCompleted: string[];
}

export function calculateScore(
  level: GameLevel,
  nodes: NetworkNode[],
  packetPaths: PacketPath[]
): ScoreResult {
  const feedback: string[] = [];
  const objectivesCompleted: string[] = [];

  // Calculate cost
  const cost = calculateCost(nodes);

  // Calculate security score
  const security = calculateSecurityScore(nodes);

  // Calculate latency
  const latency = calculateLatency(packetPaths);

  // Check if all test packets succeeded
  const allPacketsSucceeded = packetPaths.every(path => path.success);

  if (!allPacketsSucceeded) {
    feedback.push('Not all packets reached their destination');
    return {
      stars: 0,
      cost,
      security,
      latency,
      feedback,
      objectivesCompleted,
    };
  }

  // Check objectives
  for (const objective of level.objectives) {
    const completed = checkObjective(objective, nodes, packetPaths);
    if (completed) {
      objectivesCompleted.push(objective.id);
    } else if (objective.required) {
      feedback.push(`Required objective not met: ${objective.description}`);
    }
  }

  // Determine star rating
  let stars = 0;

  const threeStarReqs = level.scoring.threeStars;
  const twoStarReqs = level.scoring.twoStars;
  const oneStarReqs = level.scoring.oneStar;

  const meetsThreeStars =
    allPacketsSucceeded &&
    objectivesCompleted.length >= threeStarReqs.requiredObjectives.length &&
    (threeStarReqs.maxCost === undefined || cost <= threeStarReqs.maxCost) &&
    (threeStarReqs.maxLatency === undefined || latency <= threeStarReqs.maxLatency) &&
    (threeStarReqs.minSecurityScore === undefined || security >= threeStarReqs.minSecurityScore);

  const meetsTwoStars =
    allPacketsSucceeded &&
    objectivesCompleted.length >= twoStarReqs.requiredObjectives.length &&
    (twoStarReqs.maxCost === undefined || cost <= twoStarReqs.maxCost) &&
    (twoStarReqs.maxLatency === undefined || latency <= twoStarReqs.maxLatency);

  const meetsOneStar =
    allPacketsSucceeded &&
    objectivesCompleted.length >= oneStarReqs.requiredObjectives.length;

  if (meetsThreeStars) {
    stars = 3;
    feedback.push('Excellent! Perfect score!');
  } else if (meetsTwoStars) {
    stars = 2;
    feedback.push('Good job! Room for optimization.');

    if (threeStarReqs.maxCost !== undefined && cost > threeStarReqs.maxCost) {
      feedback.push(`Cost is $${cost.toFixed(2)}, try to reduce it to $${threeStarReqs.maxCost}`);
    }
    if (threeStarReqs.minSecurityScore !== undefined && security < threeStarReqs.minSecurityScore) {
      feedback.push(`Security score is ${security}, try to improve it to ${threeStarReqs.minSecurityScore}`);
    }
  } else if (meetsOneStar) {
    stars = 1;
    feedback.push('Completed, but needs improvement.');

    if (twoStarReqs.maxCost !== undefined && cost > twoStarReqs.maxCost) {
      feedback.push(`Cost is too high: $${cost.toFixed(2)}`);
    }
    if (security < 50) {
      feedback.push('Security configuration needs improvement');
    }
  } else {
    stars = 0;
    feedback.push('Some required objectives are not completed');
  }

  return {
    stars,
    cost,
    security,
    latency,
    feedback,
    objectivesCompleted,
  };
}

function calculateCost(nodes: NetworkNode[]): number {
  let cost = 0;

  for (const node of nodes) {
    // NAT Gateway costs
    if (node.type === 'nat-gw') {
      cost += 45; // ~$45/month per NAT GW
    }

    // Transit Gateway costs
    if (node.type === 'tgw') {
      cost += 50; // ~$50/month per TGW
    }

    // Direct Connect costs
    if (node.type === 'dx') {
      cost += 200; // ~$200/month for DX connection
    }

    // VPN costs
    if (node.type === 'vpn') {
      cost += 36; // ~$36/month per VPN connection
    }

    // Global Accelerator
    if (node.type === 'global-accelerator') {
      cost += 25;
    }

    // Network Firewall
    if (node.type === 'network-firewall') {
      cost += 395; // ~$395/month per AZ
    }
  }

  return cost;
}

function calculateSecurityScore(nodes: NetworkNode[]): number {
  let score = 100;
  const penalties: string[] = [];

  for (const node of nodes) {
    // Check for overly permissive security groups
    const securityGroups = node.config.securityGroups || [];

    for (const sg of securityGroups) {
      // Check inbound rules
      for (const rule of sg.inboundRules) {
        if (rule.source === '0.0.0.0/0') {
          // Allow for port 80/443 on web servers
          if (
            rule.portRange &&
            (rule.portRange.from === 80 || rule.portRange.from === 443)
          ) {
            // This is acceptable for web servers
          } else if (rule.protocol === 'all') {
            score -= 30;
            penalties.push('Fully open security group (0.0.0.0/0 all traffic)');
          } else {
            score -= 10;
            penalties.push(`Overly permissive rule: ${rule.protocol} from 0.0.0.0/0`);
          }
        }
      }
    }

    // Check routes
    const routes = node.config.routes || [];
    for (const route of routes) {
      // Having multiple routes to internet is fine
      // But routing private subnets directly to IGW is a concern
      if (
        route.target === 'igw' &&
        node.config.subnetType === 'private'
      ) {
        score -= 15;
        penalties.push('Private subnet routing directly to Internet Gateway');
      }
    }
  }

  return Math.max(0, score);
}

function calculateLatency(packetPaths: PacketPath[]): number {
  if (packetPaths.length === 0) {
    return 0;
  }

  let totalLatency = 0;

  for (const path of packetPaths) {
    // Base latency per hop (simplified)
    const hops = path.hops.length;
    totalLatency += hops * 2; // 2ms per hop

    // Additional latency for NAT
    const natHops = path.hops.filter(h => h.action === 'nat').length;
    totalLatency += natHops * 3; // 3ms extra for NAT
  }

  return Math.round(totalLatency / packetPaths.length);
}

function checkObjective(
  objective: any,
  nodes: NetworkNode[],
  packetPaths: PacketPath[]
): boolean {
  // Basic objective validation
  // In a real implementation, this would be more sophisticated

  switch (objective.type) {
    case 'connectivity':
      // Check if all packets succeeded
      return packetPaths.every(path => path.success);

    case 'security':
      // Check security score
      const securityScore = calculateSecurityScore(nodes);
      return securityScore >= 80;

    case 'cost':
      // Check cost
      const cost = calculateCost(nodes);
      return cost <= 100;

    default:
      return true;
  }
}
