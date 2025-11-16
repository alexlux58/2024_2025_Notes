import React, { useState } from 'react';
import { NetworkNode, Route } from '../types/network';

interface ConfigPanelProps {
  selectedNode: NetworkNode | null;
  onUpdateNode: (node: NetworkNode) => void;
  isLocked: boolean;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  selectedNode,
  onUpdateNode,
  isLocked,
}) => {
  const [newRoute, setNewRoute] = useState<Partial<Route>>({
    destination: '',
    target: 'igw',
  });

  if (!selectedNode) {
    return (
      <div style={styles.panel}>
        <h3 style={styles.title}>Configuration Panel</h3>
        <p style={styles.helpText}>Select a node to configure its settings</p>
      </div>
    );
  }

  const handleAddRoute = () => {
    if (!newRoute.destination || !newRoute.target) {
      alert('Please enter both destination and target');
      return;
    }

    const updatedNode = {
      ...selectedNode,
      config: {
        ...selectedNode.config,
        routes: [
          ...(selectedNode.config.routes || []),
          {
            destination: newRoute.destination,
            target: newRoute.target,
            targetId: newRoute.targetId,
          } as Route,
        ],
      },
    };

    onUpdateNode(updatedNode);
    setNewRoute({ destination: '', target: 'igw' });
  };

  const handleDeleteRoute = (index: number) => {
    const updatedNode = {
      ...selectedNode,
      config: {
        ...selectedNode.config,
        routes: selectedNode.config.routes?.filter((_, i) => i !== index) || [],
      },
    };
    onUpdateNode(updatedNode);
  };

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>
        {selectedNode.name} ({selectedNode.type})
      </h3>

      {isLocked && (
        <div style={styles.lockWarning}>
          This node is locked and cannot be modified
        </div>
      )}

      {/* Node Info */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Node Information</h4>
        {selectedNode.config.cidr && (
          <div style={styles.infoRow}>
            <span style={styles.label}>CIDR:</span>
            <span style={styles.value}>{selectedNode.config.cidr}</span>
          </div>
        )}
        {selectedNode.config.subnetType && (
          <div style={styles.infoRow}>
            <span style={styles.label}>Type:</span>
            <span style={styles.value}>{selectedNode.config.subnetType}</span>
          </div>
        )}
        {selectedNode.config.availabilityZone && (
          <div style={styles.infoRow}>
            <span style={styles.label}>AZ:</span>
            <span style={styles.value}>{selectedNode.config.availabilityZone}</span>
          </div>
        )}
      </div>

      {/* Route Table */}
      {selectedNode.type === 'subnet' && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Route Table</h4>

          {/* Existing Routes */}
          <div style={styles.routeList}>
            {selectedNode.config.routes && selectedNode.config.routes.length > 0 ? (
              selectedNode.config.routes.map((route, index) => (
                <div key={index} style={styles.routeItem}>
                  <div style={styles.routeInfo}>
                    <span style={styles.routeDest}>{route.destination}</span>
                    <span style={styles.routeArrow}>→</span>
                    <span style={styles.routeTarget}>{route.target}</span>
                  </div>
                  {!isLocked && (
                    <button
                      onClick={() => handleDeleteRoute(index)}
                      style={styles.deleteButton}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p style={styles.emptyText}>No routes configured</p>
            )}
          </div>

          {/* Add Route Form */}
          {!isLocked && (
            <div style={styles.addRouteForm}>
              <h5 style={styles.formTitle}>Add Route</h5>
              <input
                type="text"
                placeholder="Destination (e.g., 0.0.0.0/0)"
                value={newRoute.destination || ''}
                onChange={e =>
                  setNewRoute({ ...newRoute, destination: e.target.value })
                }
                style={styles.input}
              />
              <select
                value={newRoute.target || 'igw'}
                onChange={e =>
                  setNewRoute({
                    ...newRoute,
                    target: e.target.value as Route['target'],
                  })
                }
                style={styles.select}
              >
                <option value="igw">Internet Gateway</option>
                <option value="nat-gw">NAT Gateway</option>
                <option value="tgw">Transit Gateway</option>
                <option value="vgw">Virtual Private Gateway</option>
                <option value="peering">VPC Peering</option>
                <option value="local">Local</option>
                <option value="blackhole">Blackhole</option>
              </select>
              <button onClick={handleAddRoute} style={styles.addButton}>
                Add Route
              </button>
            </div>
          )}
        </div>
      )}

      {/* Security Groups */}
      {selectedNode.config.securityGroups && selectedNode.config.securityGroups.length > 0 && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Security Groups</h4>
          {selectedNode.config.securityGroups.map(sg => (
            <div key={sg.id} style={styles.sgItem}>
              <div style={styles.sgName}>{sg.name}</div>
              <div style={styles.sgRules}>
                <div style={styles.ruleSection}>
                  <strong>Inbound:</strong>
                  {sg.inboundRules.map((rule, idx) => (
                    <div key={idx} style={styles.rule}>
                      {rule.protocol} {rule.portRange && `${rule.portRange.from}-${rule.portRange.to}`} from {rule.source}
                    </div>
                  ))}
                </div>
                <div style={styles.ruleSection}>
                  <strong>Outbound:</strong>
                  {sg.outboundRules.map((rule, idx) => (
                    <div key={idx} style={styles.rule}>
                      {rule.protocol} to {rule.destination}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  panel: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '2px solid #34495e',
    minHeight: '400px',
    maxHeight: '600px',
    overflowY: 'auto',
  },
  title: {
    margin: '0 0 20px 0',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  helpText: {
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  lockWarning: {
    backgroundColor: '#ffe5e5',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    color: '#c0392b',
    fontSize: '14px',
  },
  section: {
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #ecf0f1',
  },
  sectionTitle: {
    margin: '0 0 10px 0',
    color: '#34495e',
    fontSize: '16px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
  },
  label: {
    fontWeight: 'bold',
    color: '#34495e',
  },
  value: {
    color: '#7f8c8d',
  },
  routeList: {
    marginBottom: '15px',
  },
  routeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px',
    marginBottom: '5px',
  },
  routeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  routeDest: {
    fontFamily: 'monospace',
    color: '#2c3e50',
  },
  routeArrow: {
    color: '#95a5a6',
  },
  routeTarget: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
  },
  emptyText: {
    color: '#95a5a6',
    fontStyle: 'italic',
    fontSize: '14px',
  },
  addRouteForm: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '4px',
  },
  formTitle: {
    margin: '0 0 10px 0',
    color: '#34495e',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  addButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  sgItem: {
    marginBottom: '10px',
  },
  sgName: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '5px',
  },
  sgRules: {
    fontSize: '12px',
    color: '#7f8c8d',
  },
  ruleSection: {
    marginBottom: '5px',
  },
  rule: {
    paddingLeft: '10px',
    fontFamily: 'monospace',
    fontSize: '11px',
  },
};
