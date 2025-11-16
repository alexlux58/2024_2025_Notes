import {
  NetworkNode,
  Connection,
  Packet,
  PacketPath,
  Route,
  SecurityRule,
} from '../types/network';

export class PacketSimulator {
  private nodes: Map<string, NetworkNode>;
  private connections: Connection[];

  constructor(nodes: NetworkNode[], connections: Connection[]) {
    this.nodes = new Map(nodes.map(n => [n.id, n]));
    this.connections = connections;
  }

  /**
   * Simulate a packet traveling through the network
   */
  simulatePacket(packet: Packet, sourceNodeId: string, destNodeId: string): PacketPath {
    const path: PacketPath = {
      hops: [],
      success: false,
    };

    const visited = new Set<string>();
    let currentNodeId = sourceNodeId;

    // Prevent infinite loops
    const maxHops = 50;
    let hopCount = 0;

    while (hopCount < maxHops) {
      hopCount++;

      if (visited.has(currentNodeId)) {
        path.blockedAt = path.hops.length;
        path.reason = 'Routing loop detected';
        return path;
      }

      visited.add(currentNodeId);
      const currentNode = this.nodes.get(currentNodeId);

      if (!currentNode) {
        path.blockedAt = path.hops.length;
        path.reason = `Node ${currentNodeId} not found`;
        return path;
      }

      // Check if we've reached the destination
      if (currentNodeId === destNodeId) {
        // Check ingress security groups at destination
        const sgIngressCheck = this.checkSecurityGroups(currentNode, packet, 'ingress');
        if (!sgIngressCheck.allowed) {
          path.hops.push({
            nodeId: currentNodeId,
            nodeName: currentNode.name,
            action: 'blocked',
            reason: `Security group denied (ingress): ${sgIngressCheck.reason}`,
            matchedRule: sgIngressCheck.rule,
          });
          path.blockedAt = path.hops.length - 1;
          path.reason = sgIngressCheck.reason;
          return path;
        }

        path.hops.push({
          nodeId: currentNodeId,
          nodeName: currentNode.name,
          action: 'arrived',
          reason: 'Successfully reached destination',
        });
        path.success = true;
        return path;
      }

      // Check security groups at current node (egress/outbound)
      const sgEgressCheck = this.checkSecurityGroups(currentNode, packet, 'egress');
      if (!sgEgressCheck.allowed) {
        path.hops.push({
          nodeId: currentNodeId,
          nodeName: currentNode.name,
          action: 'blocked',
          reason: `Security group denied (egress): ${sgEgressCheck.reason}`,
          matchedRule: sgEgressCheck.rule,
        });
        path.blockedAt = path.hops.length - 1;
        path.reason = sgEgressCheck.reason;
        return path;
      }

      // Check NACLs
      const naclCheck = this.checkNACLs(currentNode, packet);
      if (!naclCheck.allowed) {
        path.hops.push({
          nodeId: currentNodeId,
          nodeName: currentNode.name,
          action: 'blocked',
          reason: `NACL denied: ${naclCheck.reason}`,
          matchedRule: naclCheck.rule,
        });
        path.blockedAt = path.hops.length - 1;
        path.reason = naclCheck.reason;
        return path;
      }

      // Find next hop based on routing table
      const nextHop = this.findNextHop(currentNode, packet.destIp);

      if (!nextHop) {
        path.hops.push({
          nodeId: currentNodeId,
          nodeName: currentNode.name,
          action: 'blocked',
          reason: 'No route to destination (blackhole)',
        });
        path.blockedAt = path.hops.length - 1;
        path.reason = 'No route found';
        return path;
      }

      // Add this hop to the path
      path.hops.push({
        nodeId: currentNodeId,
        nodeName: currentNode.name,
        action: nextHop.target === 'nat-gw' ? 'nat' : 'route',
        reason: `Routing to ${nextHop.target}`,
        matchedRoute: nextHop,
      });

      // Handle NAT (future enhancement: track IP translations)
      // if (nextHop.target === 'nat-gw') {
      //   this.getNATPublicIp(nextHop.targetId);
      // }

      // Move to next node
      const nextNodeId = this.findNextNodeId(currentNodeId, nextHop);
      if (!nextNodeId) {
        path.blockedAt = path.hops.length;
        path.reason = `Cannot find next node for target ${nextHop.target}`;
        return path;
      }

      currentNodeId = nextNodeId;
    }

    path.blockedAt = path.hops.length;
    path.reason = 'Maximum hop count exceeded';
    return path;
  }

  private findNextHop(node: NetworkNode, destIp: string): Route | null {
    const routes = node.config.routes || [];

    // Sort by prefix length (most specific first)
    const sortedRoutes = [...routes].sort((a, b) => {
      const aPrefix = this.getPrefixLength(a.destination);
      const bPrefix = this.getPrefixLength(b.destination);
      return bPrefix - aPrefix;
    });

    // Find first matching route
    for (const route of sortedRoutes) {
      if (this.ipMatchesCIDR(destIp, route.destination)) {
        return route;
      }
    }

    return null;
  }

  private findNextNodeId(currentNodeId: string, route: Route): string | null {
    // For 'local' routes, stay in same VPC
    if (route.target === 'local') {
      return currentNodeId;
    }

    // If route has explicit targetId, use it
    if (route.targetId) {
      return route.targetId;
    }

    // Find connection based on route target type
    const connection = this.connections.find(
      conn =>
        conn.from === currentNodeId &&
        (conn.type === route.target || this.getNodeType(conn.to) === route.target)
    );

    return connection?.to || null;
  }

  private getNodeType(nodeId: string): string | undefined {
    return this.nodes.get(nodeId)?.type;
  }

  private checkSecurityGroups(
    node: NetworkNode,
    packet: Packet,
    direction: 'ingress' | 'egress'
  ): { allowed: boolean; reason?: string; rule?: SecurityRule } {
    const securityGroups = node.config.securityGroups || [];

    if (securityGroups.length === 0) {
      return { allowed: true };
    }

    const rulesToCheck = direction === 'egress' ? 'outboundRules' : 'inboundRules';
    const directionLabel = direction === 'egress' ? 'Outbound' : 'Inbound';

    // Check appropriate rules based on direction
    for (const sg of securityGroups) {
      for (const rule of sg[rulesToCheck]) {
        if (this.ruleMatches(rule, packet)) {
          if (rule.action === 'deny') {
            return {
              allowed: false,
              reason: `${directionLabel} traffic denied by ${sg.name}`,
              rule,
            };
          }
          return { allowed: true, rule };
        }
      }
    }

    // Default deny
    return {
      allowed: false,
      reason: `No matching security group rule (implicit deny on ${direction})`,
    };
  }

  private checkNACLs(
    node: NetworkNode,
    packet: Packet
  ): { allowed: boolean; reason?: string; rule?: any } {
    const nacls = node.config.nacls || [];

    if (nacls.length === 0) {
      return { allowed: true };
    }

    for (const nacl of nacls) {
      const sortedRules = [...nacl.rules].sort((a, b) => a.ruleNumber - b.ruleNumber);

      for (const rule of sortedRules) {
        if (this.naclRuleMatches(rule, packet)) {
          if (rule.action === 'deny') {
            return {
              allowed: false,
              reason: `NACL ${nacl.name} rule ${rule.ruleNumber} denied`,
              rule,
            };
          }
          return { allowed: true, rule };
        }
      }
    }

    return { allowed: true };
  }

  private ruleMatches(rule: SecurityRule, packet: Packet): boolean {
    // Check protocol
    if (rule.protocol !== 'all' && rule.protocol !== packet.protocol) {
      return false;
    }

    // Check port if applicable
    if (rule.portRange && packet.port) {
      if (packet.port < rule.portRange.from || packet.port > rule.portRange.to) {
        return false;
      }
    }

    return true;
  }

  private naclRuleMatches(rule: any, packet: Packet): boolean {
    // Similar to security group rule matching
    if (rule.protocol !== 'all' && rule.protocol !== packet.protocol) {
      return false;
    }

    if (rule.portRange && packet.port) {
      if (packet.port < rule.portRange.from || packet.port > rule.portRange.to) {
        return false;
      }
    }

    return true;
  }

  private ipMatchesCIDR(ip: string, cidr: string): boolean {
    try {
      // Handle default route
      if (cidr === '0.0.0.0/0') {
        return true;
      }

      // Validate CIDR format
      if (!cidr.includes('/')) {
        console.warn(`Invalid CIDR format: ${cidr}`);
        return false;
      }

      const [network, prefixStr] = cidr.split('/');
      const prefix = parseInt(prefixStr, 10);

      // Validate prefix length
      if (isNaN(prefix) || prefix < 0 || prefix > 32) {
        console.warn(`Invalid prefix length in CIDR: ${cidr}`);
        return false;
      }

      const ipParts = ip.split('.').map(Number);
      const networkParts = network.split('.').map(Number);

      // Validate IP format
      if (ipParts.length !== 4 || networkParts.length !== 4) {
        console.warn(`Invalid IP format: ${ip} or ${network}`);
        return false;
      }

      // Validate all octets are numbers 0-255
      if (
        ipParts.some(p => isNaN(p) || p < 0 || p > 255) ||
        networkParts.some(p => isNaN(p) || p < 0 || p > 255)
      ) {
        console.warn(`Invalid IP octets: ${ip} or ${network}`);
        return false;
      }

      const ipBinary = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
      const networkBinary =
        (networkParts[0] << 24) |
        (networkParts[1] << 16) |
        (networkParts[2] << 8) |
        networkParts[3];

      const mask = ~((1 << (32 - prefix)) - 1);

      return (ipBinary & mask) === (networkBinary & mask);
    } catch (error) {
      console.error(`Error matching IP ${ip} to CIDR ${cidr}:`, error);
      return false;
    }
  }

  private getPrefixLength(cidr: string): number {
    const parts = cidr.split('/');
    return parts.length > 1 ? parseInt(parts[1], 10) : 32;
  }
}
