import { NavigationItemType } from '@tauro/shared/types';

import Link from 'next/link';

import { EditableLink } from '@/components/editable/EditableLink';

import { HeaderProps } from './Header';

type NavigationProps = {
  navigationItems: NavigationItemType[];
  isMobile?: boolean;
  onItemClick?: () => void;
  handleUpdate: (header: Partial<HeaderProps>) => void;
};

export function Navigation({
  navigationItems,
  isMobile = false,
  onItemClick,
  handleUpdate,
}: NavigationProps) {
  if (isMobile) {
    return (
      <nav aria-label="Mobile Navigation" className="w-full">
        <ul className="flex flex-col space-y-3 w-full">
          {navigationItems.map((item) => (
            <li key={item.href} className="w-full">
              <Link
                href={item.href}
                className="block w-full py-2.5 px-2 rounded-md hover:bg-white/10 hover:text-blue-200 transition duration-300 font-medium text-base"
                onClick={onItemClick}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="hidden md:block md:ml-8 lg:ml-16 xl:ml-28" aria-label="Main Navigation">
      <ul className="flex md:space-x-4 lg:space-x-6">
        {navigationItems.map((item, index) => (
          <li key={index}>
            <EditableLink
              value={{ label: item.label, href: item.href }}
              className="block w-full py-2.5 px-2 rounded-md hover:bg-white/10 hover:text-blue-200 transition duration-300 font-medium text-base flex justify-center items-center text-center"
              dialogTitle="Editar enlace"
              contextInfo={`Editar item de navegación ${index + 1}`}
              onSave={({ label, href }) => {
                const newNavItems = [...navigationItems];
                newNavItems[index] = { ...item, label, href };
                handleUpdate({ navigationItems: newNavItems });
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
