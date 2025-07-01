import { Input, Label } from '@tauro/shared/shadcn/*';
import type { Category } from '@tauro/shared/types';

import Link from 'next/link';

import { createEditable } from '@/utils/createEditable';

import { CategoryIcon } from '../production/brand/categories/CategoryIcon';

function lightenHexColor(hex: string, amount = 0.3): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + 255 * amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + 255 * amount);
  const b = Math.min(255, (num & 0x0000ff) + 255 * amount);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export const EditableCategoryCard = createEditable<
  Pick<Category, 'name' | 'href' | 'icon' | 'color'>
>({
  display: ({ name, href, icon, color }, className = '', isEditMode = false) => {
    const softenedColor = lightenHexColor(color, 0.1);

    const content = (
      <>
        <CategoryIcon category={{ name, href, icon, color: softenedColor }} />
        <h2 className="text-white text-xl md:text-2xl font-bold text-center whitespace-pre-line">
          {name}
        </h2>
      </>
    );

    return isEditMode ? (
      <div
        style={{ backgroundColor: color }}
        className={`flex flex-col items-center justify-center p-8 rounded-lg aspect-square transition-transform hover:scale-105 ${className}`}
      >
        {content}
      </div>
    ) : (
      <Link
        href={href ?? '#'}
        style={{ backgroundColor: color }}
        className={`flex flex-col items-center justify-center p-8 rounded-lg aspect-square transition-transform hover:scale-105 ${className}`}
      >
        {content}
      </Link>
    );
  },
  form: (value, setValue) => (
    <div className="space-y-4">
      <div>
        <Label>Nombre de categoría</Label>
        <Input
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Enlace</Label>
        <Input
          value={value.href}
          onChange={(e) => setValue({ ...value, href: e.target.value })}
          required
        />
      </div>
    </div>
  ),
  wrenchLabel: 'Edit Category Card',
  dialogTitle: 'Edit Category Info',
  contextInfo: 'Update category name and link',
});
