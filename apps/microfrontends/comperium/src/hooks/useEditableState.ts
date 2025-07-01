import * as React from 'react';

/**
 * Hook to manage editable component state and sync it with setEditedProp.
 */
export function useEditableState<T extends Record<string, any>>(
  initialState: T,
  setEditedProp: (updatedData: Partial<T>) => void,
) {
  const [state, setState] = React.useState<T>(initialState);

  const handleUpdate = (updated: Partial<T>) => {
    const merged = { ...state, ...updated };
    setState(merged);
    setEditedProp(updated);
  };

  return { state, setState, handleUpdate };
}
