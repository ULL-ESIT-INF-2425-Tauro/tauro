import React from 'react'

interface VersionHistoryItem {
  version: string
  timestamp: string
  comment?: string
}

interface VersionHistoryProps {
  history: VersionHistoryItem[]
  onRestore: (versionId: string) => void
  onDelete: (versionId: string) => void
}

const styles = {
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    border: '1px solid #ddd',
    borderRadius: 6,
    background: 'white',
    padding: 12,
    marginBottom: 10,
  },
  versionId: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#555',
    margin: 0,
  },
  versionDate: {
    fontSize: 13,
    color: '#333',
    margin: '4px 0',
  },
  versionComment: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
    margin: '4px 0',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  restoreButton: {
    fontSize: 12,
    color: '#2563eb',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  deleteButton: {
    fontSize: 12,
    color: '#dc2626',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ history, onRestore, onDelete }) => (
  <ul style={styles.list}>
    {history.map((v) => (
      <li key={v.version} style={styles.item}>
        <p style={styles.versionId}>{v.version}</p>
        <p style={styles.versionDate}>{new Date(v.timestamp).toLocaleString()}</p>
        {v.comment && <p style={styles.versionComment}>💬 {v.comment}</p>}
        <div style={styles.actions}>
          <button onClick={() => onRestore(v.version)} style={styles.restoreButton}>
            Restore
          </button>
          <button onClick={() => onDelete(v.version)} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
)

export default VersionHistory