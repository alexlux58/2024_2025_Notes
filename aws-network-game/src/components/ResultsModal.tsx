import React from 'react';

interface ResultsModalProps {
  isOpen: boolean;
  stars: number;
  cost: number;
  security: number;
  latency: number;
  feedback: string[];
  onTryAgain: () => void;
  onContinue: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  stars,
  cost,
  security,
  latency,
  feedback,
  onTryAgain,
  onContinue,
}) => {
  if (!isOpen) return null;

  const getStarColor = (index: number) => {
    return index < stars ? '#ffd700' : '#555';
  };

  const getMessage = () => {
    if (stars === 3) return 'Perfect! All objectives completed optimally!';
    if (stars === 2) return 'Good job! Some optimizations possible.';
    if (stars === 1) return 'Completed, but needs improvement.';
    return 'Level Failed. Try again!';
  };

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={(e) => e.stopPropagation()} />

      {/* Modal */}
      <div style={styles.modal}>
        <h2 style={styles.title}>Level Complete!</h2>

        {/* Stars */}
        <div style={styles.starsContainer}>
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              style={{
                ...styles.star,
                color: getStarColor(index),
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Message */}
        <p style={styles.message}>{getMessage()}</p>

        {/* Metrics */}
        <div style={styles.metricsContainer}>
          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Cost</div>
            <div style={styles.metricValue}>${cost.toFixed(2)}/mo</div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Security</div>
            <div style={styles.metricValue}>{security}/100</div>
            <div style={styles.metricBar}>
              <div
                style={{
                  ...styles.metricBarFill,
                  width: `${security}%`,
                  backgroundColor: security >= 80 ? '#27ae60' : security >= 50 ? '#f39c12' : '#e74c3c',
                }}
              />
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Latency</div>
            <div style={styles.metricValue}>{latency}ms</div>
          </div>
        </div>

        {/* Feedback */}
        {feedback.length > 0 && (
          <div style={styles.feedbackContainer}>
            <h3 style={styles.feedbackTitle}>Feedback</h3>
            <ul style={styles.feedbackList}>
              {feedback.map((item, index) => (
                <li key={index} style={styles.feedbackItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div style={styles.actions}>
          <button onClick={onTryAgain} style={styles.tryAgainButton}>
            Try Again
          </button>
          {stars > 0 && (
            <button onClick={onContinue} style={styles.continueButton}>
              Continue
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    zIndex: 1001,
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '32px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  starsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  star: {
    fontSize: '48px',
    transition: 'color 0.3s ease',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#34495e',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  metricsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '30px',
  },
  metricCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginBottom: '8px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  metricValue: {
    fontSize: '24px',
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  metricBar: {
    marginTop: '10px',
    height: '8px',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    transition: 'width 0.5s ease',
  },
  feedbackContainer: {
    backgroundColor: '#e8f4f8',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  feedbackTitle: {
    margin: '0 0 15px 0',
    fontSize: '18px',
    color: '#2c3e50',
  },
  feedbackList: {
    margin: '0',
    paddingLeft: '20px',
  },
  feedbackItem: {
    color: '#34495e',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  actions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  tryAgainButton: {
    padding: '15px 30px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  continueButton: {
    padding: '15px 30px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
