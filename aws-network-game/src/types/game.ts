import { NetworkNode, Connection, Packet } from './network';

export interface GameLevel {
  id: string;
  worldId: number;
  levelNumber: number;
  title: string;
  description: string;
  story: string;

  // Initial network state
  nodes: NetworkNode[];
  connections: Connection[];

  // What the player needs to achieve
  objectives: Objective[];

  // Test packets to send
  testPackets: Packet[];

  // Scoring thresholds
  scoring: ScoringCriteria;

  // Optional hints
  hints?: string[];

  // Locked config (things player cannot change)
  lockedNodes?: string[];
  lockedConnections?: string[];
}

export interface Objective {
  id: string;
  description: string;
  type: 'connectivity' | 'security' | 'cost' | 'latency';
  required: boolean;
  validate: (state: GameState) => boolean;
}

export interface ScoringCriteria {
  threeStars: ScoreRequirements;
  twoStars: ScoreRequirements;
  oneStar: ScoreRequirements;
}

export interface ScoreRequirements {
  maxCost?: number;
  maxLatency?: number;
  minSecurityScore?: number;
  requiredObjectives: string[]; // objective IDs
}

export interface GameState {
  currentLevel: string;
  nodes: NetworkNode[];
  connections: Connection[];
  completedLevels: string[];
  unlockedLevels: string[];
  levelScores: Record<string, number>; // levelId -> stars (1-3)
  playerStats: PlayerStats;
}

export interface PlayerStats {
  totalStars: number;
  rank: string;
  badges: Badge[];
  totalPlayTime: number; // seconds
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface SimulationResult {
  success: boolean;
  packetPaths: Map<string, PacketPath>;
  totalCost: number;
  avgLatency: number;
  securityScore: number;
  objectivesCompleted: string[];
  stars: number;
  feedback: string[];
}

export interface World {
  id: number;
  name: string;
  description: string;
  theme: string;
  levels: GameLevel[];
  unlockRequirement?: {
    minStars: number;
    requiredLevels?: string[];
  };
}

// For packet animation
export interface AnimationFrame {
  timestamp: number;
  packetId: string;
  position: Position;
  currentNodeId: string;
  action: string;
}

export interface Position {
  x: number;
  y: number;
}

export type PacketPath = import('./network').PacketPath;
