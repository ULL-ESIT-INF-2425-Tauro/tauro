import { CartItem } from '@tauro/shared/types';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { CartPreview } from '@/components/production/header/CartPreview';

type CartButtonProps = {
  cartItems: CartItem[];
};

export function CartButton({ cartItems }: CartButtonProps) {
  const [isCartPreviewOpen, setIsCartPreviewOpen] = React.useState(false);
  const itemCount = cartItems.length;

  return (
    <div
      className="relative mr-2 md:mr-0"
      onMouseEnter={() => setIsCartPreviewOpen(true)}
      onMouseLeave={() => setIsCartPreviewOpen(false)}
      onClick={() => setIsCartPreviewOpen(!isCartPreviewOpen)} // Touchable devices
    >
      <Link
        href="/carrito"
        className="flex items-center p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
        <span className="sr-only">Ver carrito de compras</span>
        <span className="absolute -top-1 -right-1 bg-white text-blue-600 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs font-bold">
          {itemCount}
        </span>
      </Link>

      <CartPreview cartItems={cartItems} isOpen={isCartPreviewOpen} />
    </div>
  );
}
