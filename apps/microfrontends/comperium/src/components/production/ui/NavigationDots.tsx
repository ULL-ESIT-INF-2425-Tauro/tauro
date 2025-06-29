import { cn } from '@tauro/shared/utils';

type NavigationDotsProps = {
  currentSlide: number;
  totalSlides: number;
  onDotClick: (index: number) => void;
};

function NavigationDots({ currentSlide, totalSlides, onDotClick }: NavigationDotsProps) {
  return (
    <div className="absolute bottom-20 lg:bottom-0 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            'h-2 w-2 rounded-full transition-all',
            currentSlide === index ? 'w-8 bg-blue-600' : 'bg-blue-300 hover:bg-blue-400',
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={currentSlide === index ? 'true' : 'false'}
        />
      ))}
    </div>
  );
}

export default NavigationDots;
