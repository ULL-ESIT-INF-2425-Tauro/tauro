import { useEditContext } from '@tauro/shared/shadcn/*';

import { Wrench } from 'lucide-react';
import * as React from 'react';

import EditableDialog from '@/components/editable/dialogs/EditableDialog';

type EditableFactoryOptions<T> = {
  display: (value: T, className?: string, isEditMode?: boolean) => React.ReactNode;
  form: (value: T, setValue: (newValue: T) => void) => React.ReactNode;
  wrenchLabel?: string;
  dialogTitle?: string;
  contextInfo?: string;
};

type EditableProps<T> = {
  value: T;
  onSave: (value: T) => void;
  className?: string;
  dialogTitle?: string;
  contextInfo?: string;
};

export function createEditable<T>(options: EditableFactoryOptions<T>) {
  const defaultWrenchLabel = options.wrenchLabel || 'Edit';
  const defaultDialogTitle = options.dialogTitle || 'Edit';
  const defaultContextInfo = options.contextInfo || '';

  return function EditableComponent({
    value,
    onSave,
    className = '',
    dialogTitle,
    contextInfo,
  }: EditableProps<T>) {
    const { isEditMode, setBlur } = useEditContext();

    const [showWrench, setShowWrench] = React.useState(false);
    const [wrenchPosition, setWrenchPosition] = React.useState({ x: 0, y: 0 });
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [editedValue, setEditedValue] = React.useState<T>(value);

    React.useEffect(() => {
      setEditedValue(value);
    }, [value]);

    const handleMouseMove = (e: React.MouseEvent) => {
      setWrenchPosition({ x: e.clientX, y: e.clientY - 40 });
    };

    const handleClick = () => {
      setEditedValue(value);
      setIsDialogOpen(true);
      setBlur(true);
    };

    const handleDialogOpenChange = (open: boolean) => {
      setIsDialogOpen(open);
      if (!open) setBlur(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(editedValue);
      setIsDialogOpen(false);
      setBlur(false);
    };

    return (
      <>
        {isEditMode && showWrench && (
          <div
            className="fixed z-50 pointer-events-none transition-all duration-100"
            style={{
              left: `${wrenchPosition.x}px`,
              top: `${wrenchPosition.y < 80 ? wrenchPosition.y + 60 : wrenchPosition.y - 40}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
              <Wrench className="h-5 w-5" />
              <span className="text-sm font-medium whitespace-nowrap">{defaultWrenchLabel}</span>
            </div>
          </div>
        )}

        <div
          onMouseEnter={() => setShowWrench(true)}
          onMouseLeave={() => setShowWrench(false)}
          onMouseMove={handleMouseMove}
          onClick={isEditMode ? handleClick : undefined}
          className={`${isEditMode ? 'cursor-pointer' : ''}`}
        >
          {options.display(value, className, isEditMode)}
        </div>

        {isEditMode && (
          <EditableDialog
            isOpen={isDialogOpen}
            onOpenChange={handleDialogOpenChange}
            dialogTitle={dialogTitle || defaultDialogTitle}
            contextInfo={contextInfo || defaultContextInfo}
            onSubmit={handleSubmit}
          >
            {options.form(editedValue, setEditedValue)}
          </EditableDialog>
        )}
      </>
    );
  };
}
