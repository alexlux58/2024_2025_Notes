import React from 'react';
import { PacketPath } from '../types/network';

interface SimulationPanelProps {
  results: PacketPath[];
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({ results }) => {
  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Simulation Results</h3>

      {results.map((path, index) => (
        <div key={index} style={styles.pathContainer}>
          <div style={styles.pathHeader}>
            <span style={styles.pathTitle}>Packet {index + 1}</span>
            <span
              style={{
                ...styles.pathStatus,
                ...(path.success ? styles.pathSuccess : styles.pathFailed),
              }}
            >
              {path.success ? '✓ Success' : '✗ Failed'}
            </span>
          </div>

          {/* Hops */}
          <div style={styles.hopsContainer}>
            {path.hops.map((hop, hopIndex) => (
              <div key={hopIndex} style={styles.hop}>
                <div style={styles.hopNumber}>{hopIndex + 1}</div>
                <div style={styles.hopContent}>
                  <div style={styles.hopNode}>{hop.nodeName}</div>
                  <div style={styles.hopAction}>
                    {hop.action === 'arrived' && '🎯 Arrived at destination'}
                    {hop.action === 'forward' && '→ Forwarded'}
                    {hop.action === 'route' && `→ Routed via ${hop.matchedRoute?.target || 'unknown'}`}
                    {hop.action === 'nat' && '🔄 NAT Translation'}
                    {hop.action === 'blocked' && '🚫 Blocked'}
                  </div>
                  {hop.reason && (
                    <div style={styles.hopReason}>{hop.reason}</div>
                  )}
                  {hop.matchedRoute && (
                    <div style={styles.hopRoute}>
                      Route: {hop.matchedRoute.destination} → {hop.matchedRoute.target}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Failure reason */}
          {!path.success && path.reason && (
            <div style={styles.failureReason}>
              <strong>Failure Reason:</strong> {path.reason}
              {path.blockedAt !== undefined && ` (at hop ${path.blockedAt + 1})`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  panel: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #34495e',
  },
  title: {
    margin: '0 0 20px 0',
    color: '#2c3e50',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  pathContainer: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
  },
  pathHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '2px solid #dee2e6',
  },
  pathTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  pathStatus: {
    padding: '5px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  pathSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  pathFailed: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  hopsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  hop: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start',
  },
  hopNumber: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    flexShrink: 0,
  },
  hopContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  hopNode: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  hopAction: {
    fontSize: '14px',
    color: '#34495e',
  },
  hopReason: {
    fontSize: '13px',
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  hopRoute: {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#3498db',
    backgroundColor: '#ecf0f1',
    padding: '4px 8px',
    borderRadius: '3px',
    display: 'inline-block',
    marginTop: '4px',
  },
  failureReason: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    border: '1px solid #f5c6cb',
  },
};
