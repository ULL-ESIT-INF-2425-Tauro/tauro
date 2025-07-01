import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@tauro/shared/shadcn/*';

import * as React from 'react';

type EditableDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTitle: string;
  contextInfo?: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  children: React.ReactNode;
};

function EditableDialog({
  isOpen,
  onOpenChange,
  dialogTitle,
  contextInfo,
  onSubmit,
  onCancel,
  children,
}: EditableDialogProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="relative select-none sm:max-w-[500px] z-[100] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 pt-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-800">{dialogTitle}</DialogTitle>
            {contextInfo && <DialogDescription>{contextInfo}</DialogDescription>}
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4 py-4">
            {children}

            <DialogFooter className="flex justify-between pt-7">
              <Button
                type="button"
                variant="outline"
                className="bg-red-300/75"
                onClick={onCancel ?? (() => onOpenChange(false))}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditableDialog;
