import { Button, Input, Label } from '@tauro/shared/shadcn/*';

import Link from 'next/link';

import { createEditable } from '@/utils/createEditable';

export const EditableLink = createEditable<{ label: string; href: string }>({
  display: ({ label, href }, className = '', isEditMode = false) => {
    return isEditMode ? (
      <div className={className}>{label}</div>
    ) : (
      <Button className={className} asChild>
        <Link href={href}>{label}</Link>
      </Button>
    );
  },
  form: (value, setValue) => (
    <div className="space-y-2">
      <div>
        <Label>Label</Label>
        <Input
          value={value.label}
          onChange={(e) => setValue({ ...value, label: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Link</Label>
        <Input
          value={value.href}
          onChange={(e) => setValue({ ...value, href: e.target.value })}
          required
        />
      </div>
    </div>
  ),
  wrenchLabel: 'Edit Link',
  dialogTitle: 'Edit Link Text',
  contextInfo: 'Update label and link target',
});
