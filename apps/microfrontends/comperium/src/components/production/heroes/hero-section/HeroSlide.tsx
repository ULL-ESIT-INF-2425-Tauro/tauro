import { Button } from '@tauro/shared/shadcn/button';
import { HeroSectionSlideType } from '@tauro/shared/types';
import { cn } from '@tauro/shared/utils';

import Image from 'next/image';
import Link from 'next/link';

type HeroeSectionSlideProps = {
  slide: HeroSectionSlideType;
  isActive: boolean;
};

function HeroeSectionSlide({ slide, isActive }: HeroeSectionSlideProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex h-full w-full flex-col transition-opacity duration-500',
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
      aria-hidden={!isActive}
    >
      {/* Text content */}
      <div className="relative z-10 flex h-[45%] lg:h-full flex-col justify-center text-center lg:text-left px-2 lg:px-0 lg:w-1/2">
        <h2 className="whitespace-pre-line text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-blue-800">
          {slide.title}
        </h2>
        <div className="mt-10 lg:mt-16 flex justify-center sm:mt-12 lg:justify-start lg:ms-14">
          <Button
            className="rounded-full bg-blue-600 px-5 py-2 sm:px-6 sm:py-4 sm:text-xl lg:px-6 flex items-center text-base lg:text-lg font-medium text-white shadow-lg transition-colors hover:bg-blue-500/90"
            asChild
          >
            <Link href={slide.buttonLink}>
              {slide.buttonText}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="absolute bottom-16 lg:bottom-auto lg:right-0 lg:top-0 left-0 right-0 lg:left-auto z-0 h-[55%] lg:h-full lg:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src={slide.image || '/placeholder.svg'}
            alt={slide.imageAlt}
            fill
            className="object-contain transform -rotate-12 p-4 lg:object-right-top"
            priority={slide.id === 1}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroeSectionSlide;
