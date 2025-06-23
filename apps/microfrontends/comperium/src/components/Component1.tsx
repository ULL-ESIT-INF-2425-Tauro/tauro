import { Component1Props } from '@tauro/shared/types';

import 'tailwindcss/tailwind.css';

export default function Component1({ text }: Component1Props) {
  return (
    <div className="bg-blue w-full h-full">
      <p className="font-bold text-lg">{text ?? 'default'}</p>
    </div>
  );
}
