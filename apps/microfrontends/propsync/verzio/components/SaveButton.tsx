import React from 'react';

interface SaveButtonProps {
  onSave: () => void;
}

const styles = {
  container: {
    width: '100%',
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#16a34a',
    color: 'white',
    padding: '6px 14px',
    borderRadius: 6,
    fontSize: 14,
    border: 'none',
    cursor: 'pointer',
  },
};

const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return (
      <button onClick={onSave} style={styles.saveButton}>
        Save changes
      </button>
  );
};

export default SaveButton;
