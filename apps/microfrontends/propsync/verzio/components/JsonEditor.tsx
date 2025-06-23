import React, { useCallback } from 'react';

type JsonEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  isValid: boolean;
}

const styles = {
  container: {
    width: '100%',
    marginBottom: 16,
  },
  textarea: (isValid: boolean) => ({
    width: '100%',
    height: 250,
    fontFamily: 'monospace',
    fontSize: 13,
    padding: 10,
    borderRadius: 6,
    border: isValid ? '1px solid #ccc' : '1px solid red',
    backgroundColor: isValid ? '#f3f3f3' : '#fff3f3',
  }),
  validationMessage: (isValid: boolean) => ({
    fontSize: 12,
    marginTop: 4,
    color: isValid ? 'green' : 'red',
  }),
  saveButton: (isValid: boolean) => ({
    marginTop: 10,
    backgroundColor: isValid ? '#16a34a' : '#9ca3af',
    color: 'white',
    padding: '6px 14px',
    borderRadius: 6,
    fontSize: 14,
    border: 'none',
    cursor: isValid ? 'pointer' : 'not-allowed',
  }),
};

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, onSave, isValid }) => {
  const handleBlur = useCallback(() => {
    if (isValid) {
      onChange(JSON.stringify(JSON.parse(value), null, 2));
    }
  }, [value, isValid, onChange]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const pasted = e.clipboardData.getData('text');
      try {
        const parsed = JSON.parse(pasted);
        onChange(JSON.stringify(parsed, null, 2));
        e.preventDefault();
      } catch {
        // Ignore invalid JSON
      }
    },
    [onChange]
  );

  return (
    <div style={styles.container}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        onPaste={handlePaste}
        style={styles.textarea(isValid)}
      />
      <p style={styles.validationMessage(isValid)}>
        {isValid ? '✅ valid JSON' : '❌ invalid JSON'}
      </p>
      <button onClick={onSave} disabled={!isValid} style={styles.saveButton(isValid)}>
        Save changes
      </button>
    </div>
  );
};

export default JsonEditor;
