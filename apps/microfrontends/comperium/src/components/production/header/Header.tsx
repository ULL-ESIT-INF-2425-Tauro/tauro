import { EditContext } from '@tauro/shared/shadcn/*';
import { CartItemType, NavigationItemType } from '@tauro/shared/types';
import { cn } from '@tauro/shared/utils';

import * as React from 'react';
import 'tailwindcss/tailwind.css';

import { Logo } from '@/components/production/brand/Logo';
import { CartButton } from '@/components/production/buttons/CartButton';
import { MobileMenuButton } from '@/components/production/buttons/MobileMenuButton';
import { Navigation } from '@/components/production/header/Navigation';
import { WaveDivider } from '@/components/production/svg/WaveDivider';
import { useEditableState } from '@/hooks/useEditableState';
import { EditableComponent } from '@/types/types';

export type HeaderProps = {
  cartItems: CartItemType[];
  navigationItems: NavigationItemType[];
};

function Header({
  cartItems,
  navigationItems,
  isEditMode,
  setEditedProp,
  setBlur,
}: HeaderProps & EditableComponent) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const { state: header, handleUpdate: handleHeaderUpdate } = useEditableState<HeaderProps>(
    { cartItems, navigationItems },
    setEditedProp,
  );

  // Close the mobile menu when the screen resizes into desktop dimensions
  React.useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (!isMounted) return;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMounted]);

  return (
    <EditContext.Provider value={{ isEditMode, setEditedProp, setBlur }}>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-18">
            <Logo />
            <Navigation
              navigationItems={header.navigationItems}
              handleUpdate={handleHeaderUpdate}
            />

            <div className="flex items-center">
              <CartButton cartItems={header.cartItems} isEditMode={isEditMode} />
              <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            id="mobile-menu"
            className={cn(
              'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
              isMenuOpen ? 'py-3 sm:py-4' : 'max-h-0',
            )}
          >
            <Navigation
              navigationItems={header.navigationItems}
              isMobile
              onItemClick={closeMenu}
              handleUpdate={handleHeaderUpdate}
            />
          </div>
        </div>

        <WaveDivider />
      </header>
    </EditContext.Provider>
  );
}

export default Header;
