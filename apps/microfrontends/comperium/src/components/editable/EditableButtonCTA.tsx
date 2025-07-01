import { Button, Input, Label } from '@tauro/shared/shadcn/*';

import Link from 'next/link';

import { createEditable } from '@/utils/createEditable';

export const EditableButtonCTA = createEditable<{ text: string; link: string }>({
  display: ({ text, link }, className = '', isEditMode = false) => {
    return isEditMode ? (
      <Button className={className} asChild>
        <span>
          {text}
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </span>
      </Button>
    ) : (
      <Button className={className} asChild>
        <Link href={link}>
          {text}
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </Link>
      </Button>
    );
  },
  form: (value, setValue) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cta-text">Button Text</Label>
        <Input
          id="cta-text"
          value={value.text}
          onChange={(e) => setValue({ ...value, text: e.target.value })}
          placeholder="Enter CTA text"
          className="bg-neutral-100/85 text-black placeholder:text-neutral-500"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cta-link">Button Link</Label>
        <Input
          id="cta-link"
          value={value.link}
          onChange={(e) => setValue({ ...value, link: e.target.value })}
          placeholder="Enter URL"
          className="bg-neutral-100/85 text-black placeholder:text-neutral-500"
          required
        />
      </div>
    </div>
  ),
  wrenchLabel: 'Edit Button',
  dialogTitle: 'Edit CTA',
  contextInfo: 'Edit call-to-action text and link',
});
