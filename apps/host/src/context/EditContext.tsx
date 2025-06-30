import React from 'react';

type EditContextType = {
  isEditMode: boolean;
  setEditedProp: (componentId: string, data: any) => void;
  setBlur: (blur: boolean) => void;
};

export const EditContext = React.createContext<EditContextType | undefined>(
  undefined,
);

export function useEditContext() {
  const context = React.useContext(EditContext);
  if (!context) {
    throw new Error('useEditContext must be used within an EditProvider');
  }
  return context;
}
