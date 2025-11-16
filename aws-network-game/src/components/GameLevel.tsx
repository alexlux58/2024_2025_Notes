import React, { useState } from 'react';
import { NetworkCanvas } from './NetworkCanvas';
import { ConfigPanel } from './ConfigPanel';
import { SimulationPanel } from './SimulationPanel';
import { ResultsModal } from './ResultsModal';
import { GameLevel } from '../types/game';
import { NetworkNode, Packet, PacketPath } from '../types/network';
import { PacketSimulator } from '../engine/packetSimulator';
import { calculateScore } from '../engine/scoring';

interface GameLevelProps {
  level: GameLevel;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

export const GameLevelComponent: React.FC<GameLevelProps> = ({
  level,
  onComplete,
  onExit,
}) => {
  const [nodes, setNodes] = useState<NetworkNode[]>(level.nodes);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<PacketPath[]>([]);
  const [currentPacket, setCurrentPacket] = useState<Packet | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scoreData, setScoreData] = useState<{
    stars: number;
    cost: number;
    security: number;
    latency: number;
    feedback: string[];
  } | null>(null);

  const handleNodeUpdate = (updatedNode: NetworkNode) => {
    setNodes(prevNodes =>
      prevNodes.map(n => (n.id === updatedNode.id ? updatedNode : n))
    );
    setSelectedNode(updatedNode);
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    setSimulationResults([]);

    const simulator = new PacketSimulator(nodes, level.connections);
    const results: PacketPath[] = [];

    // Simulate each test packet
    for (const packet of level.testPackets) {
      // Find source and destination nodes
      const sourceNode = nodes.find(n =>
        n.config.privateIp === packet.sourceIp ||
        n.config.publicIp === packet.sourceIp
      );
      const destNode = nodes.find(n =>
        n.config.privateIp === packet.destIp ||
        n.config.publicIp === packet.destIp ||
        n.name === 'Internet'
      );

      if (!sourceNode || !destNode) {
        continue;
      }

      // Animate packet movement
      setCurrentPacket(packet);
      await animatePacket(packet, sourceNode.id);

      // Run simulation
      const path = simulator.simulatePacket(packet, sourceNode.id, destNode.id);
      results.push(path);

      // Delay between packets
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setSimulationResults(results);
    setCurrentPacket(null);
    setIsSimulating(false);

    // Calculate score
    const score = calculateScore(level, nodes, results);

    // Show results
    setTimeout(() => {
      setScoreData(score);
      setShowResults(true);
    }, 500);
  };

  const animatePacket = async (packet: Packet, startNodeId: string) => {
    // Simple animation: just update packet position
    const startNode = nodes.find(n => n.id === startNodeId);
    if (!startNode) return;

    packet.currentPosition = { ...startNode.position };

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleTryAgain = () => {
    setShowResults(false);
    setScoreData(null);
    setSimulationResults([]);
    // Reset to initial level state
    setNodes(level.nodes);
  };

  const handleContinue = () => {
    if (scoreData && scoreData.stars > 0) {
      onComplete(scoreData.stars);
    }
  };

  const isNodeLocked = (nodeId: string): boolean => {
    return level.lockedNodes?.includes(nodeId) || false;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.levelTitle}>{level.title}</h1>
          <p style={styles.levelDescription}>{level.description}</p>
        </div>
        <button onClick={onExit} style={styles.exitButton}>
          Exit Level
        </button>
      </div>

      {/* Story */}
      <div style={styles.storyBox}>
        <h3 style={styles.storyTitle}>Mission Brief</h3>
        <p style={styles.storyText}>{level.story}</p>
      </div>

      {/* Objectives */}
      <div style={styles.objectivesBox}>
        <h3 style={styles.objectivesTitle}>Objectives</h3>
        <ul style={styles.objectivesList}>
          {level.objectives.map(obj => (
            <li key={obj.id} style={styles.objectiveItem}>
              <span style={styles.objectiveIcon}>
                {obj.required ? '⚠️' : '✨'}
              </span>
              {obj.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Game Area */}
      <div style={styles.gameArea}>
        {/* Canvas */}
        <div style={styles.canvasContainer}>
          <NetworkCanvas
            nodes={nodes}
            connections={level.connections}
            packet={currentPacket || undefined}
            onNodeClick={setSelectedNode}
            width={800}
            height={600}
          />
          <div style={styles.controls}>
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              style={{
                ...styles.simulateButton,
                ...(isSimulating ? styles.simulateButtonDisabled : {}),
              }}
            >
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </button>
            <button onClick={() => setShowHints(!showHints)} style={styles.hintsButton}>
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
          </div>
        </div>

        {/* Configuration Panel */}
        <div style={styles.sidePanel}>
          <ConfigPanel
            selectedNode={selectedNode}
            onUpdateNode={handleNodeUpdate}
            isLocked={selectedNode ? isNodeLocked(selectedNode.id) : false}
          />
        </div>
      </div>

      {/* Hints */}
      {showHints && level.hints && (
        <div style={styles.hintsBox}>
          <h3 style={styles.hintsTitle}>Hints</h3>
          <ul style={styles.hintsList}>
            {level.hints.map((hint, idx) => (
              <li key={idx} style={styles.hintItem}>
                💡 {hint}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Simulation Results */}
      {simulationResults.length > 0 && (
        <SimulationPanel results={simulationResults} />
      )}

      {/* Results Modal */}
      {scoreData && (
        <ResultsModal
          isOpen={showResults}
          stars={scoreData.stars}
          cost={scoreData.cost}
          security={scoreData.security}
          latency={scoreData.latency}
          feedback={scoreData.feedback}
          onTryAgain={handleTryAgain}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f6fa',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  levelTitle: {
    margin: '0',
    color: '#2c3e50',
    fontSize: '28px',
  },
  levelDescription: {
    margin: '5px 0 0 0',
    color: '#7f8c8d',
    fontSize: '16px',
  },
  exitButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  storyBox: {
    backgroundColor: '#fff3cd',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '2px solid #ffc107',
  },
  storyTitle: {
    margin: '0 0 10px 0',
    color: '#856404',
    fontSize: '16px',
  },
  storyText: {
    margin: '0',
    color: '#856404',
    lineHeight: '1.5',
  },
  objectivesBox: {
    backgroundColor: '#d1ecf1',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '2px solid #17a2b8',
  },
  objectivesTitle: {
    margin: '0 0 10px 0',
    color: '#0c5460',
    fontSize: '16px',
  },
  objectivesList: {
    margin: '0',
    paddingLeft: '20px',
  },
  objectiveItem: {
    color: '#0c5460',
    marginBottom: '5px',
  },
  objectiveIcon: {
    marginRight: '8px',
  },
  gameArea: {
    display: 'grid',
    gridTemplateColumns: '800px 1fr',
    gap: '20px',
    marginBottom: '20px',
  },
  canvasContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  sidePanel: {
    minWidth: '300px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
  },
  simulateButton: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  simulateButtonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
  },
  hintsButton: {
    padding: '15px 30px',
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  hintsBox: {
    backgroundColor: '#fff5e6',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '2px solid #f39c12',
  },
  hintsTitle: {
    margin: '0 0 10px 0',
    color: '#e67e22',
    fontSize: '16px',
  },
  hintsList: {
    margin: '0',
    paddingLeft: '20px',
  },
  hintItem: {
    color: '#d68910',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
};
