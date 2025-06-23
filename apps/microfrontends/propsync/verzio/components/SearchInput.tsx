import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="🔍 Search..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      marginBottom: 16,
      padding: 8,
      borderRadius: 6,
      border: '1px solid #ccc',
      fontSize: 14,
      width: '100%',
    }}
  />
);
