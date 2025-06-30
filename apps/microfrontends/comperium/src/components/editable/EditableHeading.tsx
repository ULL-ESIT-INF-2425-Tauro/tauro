import { Label, Textarea } from '@tauro/shared/shadcn/*';

import { Wrench } from 'lucide-react';
import * as React from 'react';

import EditableDialog from '@/components/editable/dialogs/EditableDialog';

type EditableHeadingProps = {
  text: string;
  onSave: (newText: string) => void;
  isEditMode?: boolean;
  className?: string;
  dialogTitle?: string;
  contextInfo?: string;
};

export function EditableHeading({
  text,
  onSave,
  isEditMode = false,
  className = '',
  dialogTitle = 'Edit Text',
  contextInfo = '',
}: EditableHeadingProps) {
  const [showWrench, setShowWrench] = React.useState(false);
  const [wrenchPosition, setWrenchPosition] = React.useState({ x: 0, y: 0 });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingText, setEditingText] = React.useState(text);

  React.useEffect(() => {
    setEditingText(text);
  }, [text]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setWrenchPosition({ x: e.clientX, y: e.clientY - 40 });
  };

  const handleClick = () => {
    setEditingText(text);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editingText);
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* Wrench floating icon */}
      {isEditMode && showWrench && (
        <div
          className="fixed z-50 pointer-events-none transition-all duration-100"
          style={{
            left: `${wrenchPosition.x}px`,
            top: `${wrenchPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
            <Wrench className="h-5 w-5" />
            <span className="text-sm font-medium whitespace-nowrap">Edit</span>
          </div>
        </div>
      )}

      <div
        onMouseEnter={() => setShowWrench(true)}
        onMouseLeave={() => setShowWrench(false)}
        onMouseMove={handleMouseMove}
        onClick={isEditMode ? handleClick : undefined}
        className={`${className} ${isEditMode ? 'cursor-pointer hover:text-blue-700' : ''}`}
      >
        {text}
      </div>

      {isEditMode && (
        <EditableDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          dialogTitle={dialogTitle}
          contextInfo={contextInfo}
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="title">Text</Label>
            <Textarea
              id="title"
              name="title"
              placeholder="Edit text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="font-bold resize-none min-h-[100px]"
              required
            />
          </div>
        </EditableDialog>
      )}
    </>
  );
}
