import { HeroSectionSlideType } from '@tauro/shared/types';
import { cn } from '@tauro/shared/utils';

import Image from 'next/image';

import { EditableButtonCTA } from '@/components/editable/EditableButtonCTA';
import { EditableHeading } from '@/components/editable/EditableHeading';

type HeroeSectionSlideProps = {
  slide: HeroSectionSlideType;
  isActive: boolean;
  onSlideUpdate: (updatedSlide: HeroSectionSlideType) => void;
};

function HeroeSectionSlide({ slide, isActive, onSlideUpdate }: HeroeSectionSlideProps) {
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
        <EditableHeading
          value={{ text: slide.title }}
          onSave={({ text }) => onSlideUpdate({ ...slide, title: text })}
          className="whitespace-pre-line text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-blue-800"
          dialogTitle="Hero Slide Title"
          contextInfo={`Edit slide ${slide.id}`}
        />
        <div className="mt-10 lg:mt-16 flex justify-center sm:mt-12 lg:justify-start lg:ms-14">
          <EditableButtonCTA
            value={{ text: slide.buttonText, link: slide.buttonLink }}
            onSave={({ text, link }) =>
              onSlideUpdate({ ...slide, buttonText: text, buttonLink: link })
            }
            className="rounded-full bg-blue-600 px-5 py-2 sm:px-6 sm:py-4 sm:text-xl lg:px-6 flex items-center text-base lg:text-lg font-medium text-white shadow-lg transition-colors hover:bg-blue-500/90"
            dialogTitle="Hero Button CTA"
            contextInfo={`Edit button props of slide ${slide.id}`}
          />
        </div>
      </div>

      {/* Image */}
      <div className="absolute bottom-16 lg:bottom-auto lg:right-0 lg:top-0 left-0 right-0 lg:left-auto z-0 h-[55%] lg:h-full lg:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src={slide.image || '/placeholder.svg'}
            alt={slide.imageAlt}
            fill
            className={`object-contain transform ${slide.image === '/TauroHeadRotated.png' ? '' : '-rotate-12'} p-4 lg:object-right-top`}
            priority={slide.id === 1}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroeSectionSlide;
