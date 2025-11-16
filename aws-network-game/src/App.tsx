import React, { useState } from 'react';
import { GameLevelComponent } from './components/GameLevel';
import { GameLevel } from './types/game';
import level1Data from './data/levels/world1-level1.json';

function App() {
  const [currentLevel, setCurrentLevel] = useState<GameLevel | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set());

  const handleStartLevel = (level: GameLevel) => {
    setCurrentLevel(level);
  };

  const handleLevelComplete = (levelId: string, stars: number) => {
    setCompletedLevels(prev => new Set([...prev, levelId]));
    // Save to localStorage
    localStorage.setItem('completedLevels', JSON.stringify([...completedLevels, levelId]));
    localStorage.setItem(`level-${levelId}-stars`, stars.toString());
  };

  const handleExitLevel = () => {
    setCurrentLevel(null);
  };

  // Load the first level
  const level1 = level1Data as unknown as GameLevel;

  if (currentLevel) {
    return (
      <GameLevelComponent
        level={currentLevel}
        onComplete={(stars) => handleLevelComplete(currentLevel.id, stars)}
        onExit={handleExitLevel}
      />
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Packet's Escape</h1>
        <p style={styles.subtitle}>An AWS Network Puzzle Game</p>
      </header>

      <div style={styles.content}>
        <div style={styles.intro}>
          <h2 style={styles.introTitle}>Welcome, Network Architect!</h2>
          <p style={styles.introText}>
            You're the lead AWS network architect for a growing SaaS company. Each level presents
            new networking challenges that you must solve by configuring VPCs, subnets, routing
            tables, security groups, and more.
          </p>
          <p style={styles.introText}>
            Your goal is to ensure packets can successfully travel from source to destination
            while maintaining security, optimizing costs, and minimizing latency.
          </p>
        </div>

        <div style={styles.worldsContainer}>
          <div style={styles.world}>
            <h2 style={styles.worldTitle}>World 1: Core VPC & Routing</h2>
            <p style={styles.worldDescription}>
              Master the fundamentals of AWS networking with VPCs, subnets, and internet
              connectivity.
            </p>

            <div style={styles.levelsGrid}>
              <div style={styles.levelCard}>
                <div style={styles.levelHeader}>
                  <h3 style={styles.levelTitle}>{level1.title}</h3>
                  {completedLevels.has(level1.id) && (
                    <span style={styles.completedBadge}>
                      {'⭐'.repeat(
                        parseInt(localStorage.getItem(`level-${level1.id}-stars`) || '1')
                      )}
                    </span>
                  )}
                </div>
                <p style={styles.levelDesc}>{level1.description}</p>
                <button
                  onClick={() => handleStartLevel(level1)}
                  style={styles.playButton}
                >
                  {completedLevels.has(level1.id) ? 'Play Again' : 'Start Level'}
                </button>
              </div>

              <div style={{ ...styles.levelCard, ...styles.lockedCard }}>
                <h3 style={styles.levelTitle}>Level 2: Private Subnet & NAT</h3>
                <p style={styles.levelDesc}>
                  Enable outbound internet access from a private subnet using a NAT Gateway
                </p>
                <div style={styles.lockedBadge}>🔒 Complete Level 1</div>
              </div>

              <div style={{ ...styles.levelCard, ...styles.lockedCard }}>
                <h3 style={styles.levelTitle}>Level 3: Debugging Routes</h3>
                <p style={styles.levelDesc}>
                  Fix a broken network configuration to restore connectivity
                </p>
                <div style={styles.lockedBadge}>🔒 Complete Level 2</div>
              </div>
            </div>
          </div>

          <div style={{ ...styles.world, ...styles.lockedWorld }}>
            <h2 style={styles.worldTitle}>World 2: Multi-VPC & Transit</h2>
            <p style={styles.worldDescription}>
              Learn VPC peering and Transit Gateway for complex multi-VPC architectures.
            </p>
            <div style={styles.lockedBadge}>🔒 Complete World 1</div>
          </div>

          <div style={{ ...styles.world, ...styles.lockedWorld }}>
            <h2 style={styles.worldTitle}>World 3: Hybrid Connectivity</h2>
            <p style={styles.worldDescription}>
              Master Direct Connect, VPN, and hybrid cloud networking.
            </p>
            <div style={styles.lockedBadge}>🔒 Complete World 2</div>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Built with React + TypeScript | Deploy to S3 for static hosting
        </p>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f23',
    color: '#cccccc',
  },
  header: {
    textAlign: 'center',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  title: {
    margin: '0',
    fontSize: '48px',
    color: '#ffffff',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    margin: '10px 0 0 0',
    fontSize: '20px',
    color: '#f0f0f0',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  intro: {
    backgroundColor: '#1a1a2e',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '40px',
    border: '2px solid #667eea',
  },
  introTitle: {
    margin: '0 0 20px 0',
    color: '#ffffff',
    fontSize: '28px',
  },
  introText: {
    margin: '0 0 15px 0',
    lineHeight: '1.6',
    fontSize: '16px',
    color: '#cccccc',
  },
  worldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  world: {
    backgroundColor: '#1a1a2e',
    padding: '25px',
    borderRadius: '12px',
    border: '2px solid #667eea',
  },
  lockedWorld: {
    opacity: 0.6,
    border: '2px solid #444',
  },
  worldTitle: {
    margin: '0 0 10px 0',
    color: '#667eea',
    fontSize: '24px',
  },
  worldDescription: {
    margin: '0 0 20px 0',
    color: '#999',
  },
  levelsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  levelCard: {
    backgroundColor: '#16213e',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #667eea',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  lockedCard: {
    opacity: 0.5,
    cursor: 'not-allowed',
    border: '1px solid #444',
  },
  levelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  levelTitle: {
    margin: '0',
    color: '#ffffff',
    fontSize: '18px',
  },
  levelDesc: {
    margin: '0 0 15px 0',
    color: '#aaa',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  playButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  completedBadge: {
    fontSize: '16px',
  },
  lockedBadge: {
    color: '#888',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    borderTop: '1px solid #333',
    marginTop: '40px',
  },
  footerText: {
    margin: '0',
    color: '#666',
    fontSize: '14px',
  },
};

export default App;
