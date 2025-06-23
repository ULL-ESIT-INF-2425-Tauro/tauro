import type { CSSProperties } from 'react';

export const tabStyle = (active: boolean): CSSProperties => ({
  padding: '10px 20px',
  fontWeight: 500,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  border: '1px solid #d1d5db',
  borderBottom: active ? 'none' : '1px solid #d1d5db',
  backgroundColor: active ? '#ffffff' : '#e5e7eb',
  color: active ? '#111827' : '#6b7280',
  cursor: 'pointer',
  marginRight: 8,
  marginBottom: '-1px',
  position: 'relative',
  top: active ? '1px' : '0',
  boxShadow: active ? '0 -2px 6px rgba(0, 0, 0, 0.05)' : 'none',
  transition: 'all 0.2s ease-in-out',
});

export const tabBar: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  backgroundColor: '#f9fafb',
  padding: '0 12px',
  borderBottom: '1px solid #d1d5db',
  height: 48,
};

const styles: Record<string, CSSProperties> = {
    container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    },
  sidebar: {
    width: 280,
    borderRight: '1px solid #eee',
    padding: 16,
    overflowY: 'auto',
    background: '#f9f9f9',
  },
  inspector: {
    flex: 1,
    padding: 24,
    overflowY: 'auto',
    background: '#fefefe',
  },
  historyPanel: {
    width: 280,
    padding: 16,
    overflowY: 'auto',
    background: '#f9f9f9',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  entityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 0,
  },
  saveVersionButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '6px 12px',
    borderRadius: 6,
    fontSize: 14,
    border: 'none',
    cursor: 'pointer',
  },
  readonlyJson: {
    background: '#f3f3f3',
    padding: 16,
    borderRadius: 6,
    fontFamily: 'monospace',
    fontSize: 13,
    whiteSpace: 'pre-wrap',
  },
tabs: {
  display: 'flex',
  alignItems: 'flex-end',
  backgroundColor: '#f9fafb',
  padding: '0 16px',
  borderBottom: '1px solid #d1d5db',
  height: 48,
},


};

export default styles;
