import { Button } from '@tauro/shared/shadcn/button';

import { Menu, X } from 'lucide-react';

type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden ml-1 p-1.5 h-auto w-auto"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      {isOpen ? (
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      ) : (
        <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
      )}
    </Button>
  );
}
