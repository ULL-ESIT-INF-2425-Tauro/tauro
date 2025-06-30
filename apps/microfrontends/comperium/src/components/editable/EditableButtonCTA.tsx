import { Input, Label } from '@tauro/shared/shadcn/*';
import { Button } from '@tauro/shared/shadcn/button';

import { Wrench } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import EditableDialog from '@/components/editable/dialogs/EditableDialog';

type EditableButtonCTAProps = {
  buttonText: string;
  buttonLink: string;
  onSave: (data: { text: string; link: string }) => void;
  isEditMode?: boolean;
  className?: string;
  dialogTitle?: string;
  contextInfo?: string;
};

function EditableButtonCTA({
  buttonText,
  buttonLink,
  onSave,
  isEditMode = false,
  className = '',
  dialogTitle = 'Edit CTA',
  contextInfo = '',
}: EditableButtonCTAProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [showWrench, setShowWrench] = React.useState(false);
  const [wrenchPosition, setWrenchPosition] = React.useState({ x: 0, y: 0 });

  const [text, setText] = React.useState(buttonText);
  const [link, setLink] = React.useState(buttonLink);

  React.useEffect(() => {
    setText(buttonText);
    setLink(buttonLink);
  }, [buttonText, buttonLink]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setWrenchPosition({ x: e.clientX, y: e.clientY - 40 });
  };

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ text, link });
    setIsDialogOpen(false);
  };

  return (
    <>
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
            <span className="text-sm font-medium whitespace-nowrap">Edit Button</span>
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
        <Button className={className} asChild>
          {isEditMode ? (
            <span className="pointer-events-none select-none">
              {buttonText}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </span>
          ) : (
            <Link href={buttonLink}>
              {buttonText}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          )}
        </Button>
      </div>

      {isEditMode && (
        <EditableDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          dialogTitle={dialogTitle}
          contextInfo={contextInfo}
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cta-text">Button Text</Label>
              <Input
                id="cta-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter CTA text"
                className="bg-neutral-100/85 text-black placeholder:text-neutral-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-link">Button Link</Label>
              <Input
                id="cta-link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter URL"
                className="bg-neutral-100/85 text-black placeholder:text-neutral-500"
                required
              />
            </div>
          </div>
        </EditableDialog>
      )}
    </>
  );
}

export default EditableButtonCTA;
