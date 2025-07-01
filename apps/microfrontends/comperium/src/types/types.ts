export type EditableComponent = {
  isEditMode: boolean;
  componentId: string;
  setEditedProp: (data: unknown) => void;
  setBlur: (blur: boolean) => void;
};
