import { cn } from '@tauro/shared/utils';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type NavigationArrowsProps = {
  onPrevSlide: () => void;
  onNextSlide: () => void;
  isDesktop: boolean;
};

function NavigationArrows({ onPrevSlide, onNextSlide, isDesktop }: NavigationArrowsProps) {
  const buttonBaseClasses =
    'flex items-center justify-center rounded-full shadow-lg transition-all focus:outline-none';

  if (isDesktop) {
    return (
      <>
        <button
          className={cn(
            buttonBaseClasses,
            'absolute left-2 sm:left-20 lg:left-12 top-[88%] lg:top-[92%] z-20 w-12 h-12 bg-white/80 text-blue-800 lg:bg-blue-600 lg:text-white/85 hover:bg-blue-500/90',
          )}
          onClick={onPrevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className={cn(
            buttonBaseClasses,
            'absolute right-2 sm:right-20 lg:right-12 top-[88%] lg:top-[92%] z-20 w-12 h-12 bg-white/80 text-blue-800 lg:bg-blue-600 lg:text-white/85 hover:bg-blue-500/90',
          )}
          onClick={onNextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </>
    );
  }

  return (
    <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-around space-x-4">
      <button
        className={cn(
          buttonBaseClasses,
          'h-10 w-10 text-white/80 bg-blue-600 hover:bg-blue-500/90',
        )}
        onClick={onPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className={cn(
          buttonBaseClasses,
          'h-10 w-10 text-white/80 bg-blue-600 hover:bg-blue-500/90',
        )}
        onClick={onNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

export default NavigationArrows;
