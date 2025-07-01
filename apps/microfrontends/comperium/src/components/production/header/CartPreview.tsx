import { Button } from '@tauro/shared/shadcn/button';
import { CartItemType } from '@tauro/shared/types';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PausedComponent } from '@/types/types';

type CartPreviewProps = {
  cartItems: CartItemType[];
  isOpen: boolean;
} & PausedComponent;

export function CartPreview({ cartItems, isOpen, isEditMode }: CartPreviewProps) {
  if (!isOpen) return null;

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-lg shadow-xl overflow-hidden z-50 text-gray-800 origin-top-right animate-in fade-in zoom-in-95 duration-200">
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <h3 className="font-bold text-base sm:text-lg">Tu Carrito</h3>
        <p className="text-xs sm:text-sm text-gray-500">{itemCount} productos</p>
      </div>

      <div className="max-h-[40vh] sm:max-h-80 overflow-y-auto">
        {cartItems.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50"
              >
                <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    // TODO Assign placeholder
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x {item.price.toFixed(2)}€
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-xs sm:text-sm">
                    {(item.price * item.quantity).toFixed(2)}€
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">Tu carrito está vacío</div>
        )}
      </div>

      <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex justify-between mb-3 sm:mb-4">
          <span className="font-medium text-sm sm:text-base">Subtotal:</span>
          <span className="font-bold text-sm sm:text-base">{subtotal.toFixed(2)}€</span>
        </div>
        <div className="grid gap-2">
          {isEditMode ? (
            <>
              <Button
                className="w-full h-9 sm:h-10 text-xs sm:text-sm bg-gray-300 text-gray-500 cursor-not-allowed"
                disabled
              >
                Pagar ahora
              </Button>
              <span className="flex items-center justify-center text-xs sm:text-sm text-gray-400 font-medium py-1">
                Ver carrito completo
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
              </span>
            </>
          ) : (
            <>
              <Button className="w-full h-9 sm:h-10 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Pagar ahora
              </Button>
              <Link
                href="/carrito"
                className="flex items-center justify-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium py-1"
              >
                Ver carrito completo
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
