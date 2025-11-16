import React, { useRef, useEffect, useState } from 'react';
import { NetworkNode, Connection, Packet } from '../types/network';

interface NetworkCanvasProps {
  nodes: NetworkNode[];
  connections: Connection[];
  packet?: Packet;
  onNodeClick?: (node: NetworkNode) => void;
  width?: number;
  height?: number;
}

export const NetworkCanvas: React.FC<NetworkCanvasProps> = ({
  nodes,
  connections,
  packet,
  onNodeClick,
  width = 800,
  height = 600,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw connections first (so they appear behind nodes)
    drawConnections(ctx, connections, nodes);

    // Draw nodes
    nodes.forEach(node => {
      drawNode(ctx, node, node.id === selectedNode);
    });

    // Draw packet if present
    if (packet && packet.currentPosition) {
      drawPacket(ctx, packet);
    }
  }, [nodes, connections, packet, selectedNode, width, height]);

  const drawConnections = (
    ctx: CanvasRenderingContext2D,
    connections: Connection[],
    nodes: NetworkNode[]
  ) => {
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);

      if (!fromNode || !toNode) return;

      ctx.beginPath();
      ctx.moveTo(fromNode.position.x, fromNode.position.y);
      ctx.lineTo(toNode.position.x, toNode.position.y);

      // Style based on connection type
      switch (conn.type) {
        case 'internet':
          ctx.strokeStyle = '#3498db';
          ctx.lineWidth = 3;
          ctx.setLineDash([]);
          break;
        case 'peering':
          ctx.strokeStyle = '#9b59b6';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          break;
        case 'vpn':
          ctx.strokeStyle = '#e74c3c';
          ctx.lineWidth = 2;
          ctx.setLineDash([10, 5]);
          break;
        case 'tgw':
          ctx.strokeStyle = '#f39c12';
          ctx.lineWidth = 3;
          ctx.setLineDash([]);
          break;
        default:
          ctx.strokeStyle = '#95a5a6';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
      }

      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Draw arrow if not bidirectional
      if (!conn.bidirectional) {
        drawArrow(ctx, fromNode.position, toNode.position);
      }
    });
  };

  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) => {
    const headlen = 10;
    const angle = Math.atan2(to.y - from.y, to.x - from.x);

    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - headlen * Math.cos(angle - Math.PI / 6),
      to.y - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - headlen * Math.cos(angle + Math.PI / 6),
      to.y - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  };

  const drawNode = (
    ctx: CanvasRenderingContext2D,
    node: NetworkNode,
    isSelected: boolean
  ) => {
    const { x, y } = node.position;
    const radius = 30;

    // Draw selection highlight
    if (isSelected) {
      ctx.beginPath();
      ctx.arc(x, y, radius + 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
      ctx.fill();
    }

    // Draw node circle with type-specific color
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = getNodeColor(node.type);
    ctx.fill();
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw node icon/label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(getNodeIcon(node.type), x, y - 5);

    // Draw node name below
    ctx.fillStyle = '#2c3e50';
    ctx.font = '11px Arial';
    ctx.fillText(node.name, x, y + radius + 15);
  };

  const drawPacket = (ctx: CanvasRenderingContext2D, packet: Packet) => {
    if (!packet.currentPosition) return;

    const { x, y } = packet.currentPosition;

    // Draw packet as a small animated circle
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pulse effect
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(231, 76, 60, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const getNodeColor = (type: string): string => {
    const colors: Record<string, string> = {
      vpc: '#3498db',
      subnet: '#5dade2',
      igw: '#2ecc71',
      'nat-gw': '#27ae60',
      tgw: '#f39c12',
      vgw: '#e67e22',
      vpn: '#e74c3c',
      dx: '#8e44ad',
      'on-prem': '#95a5a6',
      alb: '#16a085',
      nlb: '#1abc9c',
      ec2: '#3498db',
      rds: '#9b59b6',
      's3-endpoint': '#f39c12',
      internet: '#34495e',
    };
    return colors[type] || '#95a5a6';
  };

  const getNodeIcon = (type: string): string => {
    const icons: Record<string, string> = {
      vpc: 'VPC',
      subnet: 'SUB',
      igw: 'IGW',
      'nat-gw': 'NAT',
      tgw: 'TGW',
      vgw: 'VGW',
      vpn: 'VPN',
      dx: 'DX',
      'on-prem': 'ON',
      alb: 'ALB',
      nlb: 'NLB',
      ec2: 'EC2',
      rds: 'RDS',
      's3-endpoint': 'S3',
      internet: '🌐',
    };
    return icons[type] || '?';
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find clicked node
    const clickedNode = nodes.find(node => {
      const dx = node.position.x - x;
      const dy = node.position.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= 30;
    });

    if (clickedNode) {
      setSelectedNode(clickedNode.id);
      onNodeClick?.(clickedNode);
    } else {
      setSelectedNode(null);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleCanvasClick}
      style={{
        border: '2px solid #34495e',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#ecf0f1',
      }}
    />
  );
};
