import { Label, Textarea } from '@tauro/shared/shadcn/*';

import { createEditable } from '@/utils/createEditable';

export const EditableHeading = createEditable<{ text: string }>({
  display: ({ text }, className) => <div className={className}>{text}</div>,
  form: (value, setValue) => (
    <div className="space-y-2">
      <Label htmlFor="title">Text</Label>
      <Textarea
        id="title"
        name="title"
        placeholder="Edit text"
        value={value.text}
        onChange={(e) => setValue({ text: e.target.value })}
        className="font-bold resize-none min-h-[100px]"
        required
      />
    </div>
  ),
  wrenchLabel: 'Edit Heading',
  dialogTitle: 'Edit Heading Text',
  contextInfo: 'Update heading content',
});
