import { NavigationItemType } from '@tauro/shared/types';

import Link from 'next/link';

type NavigationProps = {
  navigationItems: NavigationItemType[];
  isMobile?: boolean;
  onItemClick?: () => void;
};

export function Navigation({ navigationItems, isMobile = false, onItemClick }: NavigationProps) {
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
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block py-1.5 px-2 rounded-md hover:bg-white/10 hover:text-blue-200 transition duration-300 font-medium text-sm lg:text-base"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
