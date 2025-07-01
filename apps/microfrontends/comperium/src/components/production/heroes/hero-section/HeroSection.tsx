import { EditContext } from '@tauro/shared/shadcn/*';
import { HeroSectionSlideType } from '@tauro/shared/types';

import * as React from 'react';
import 'tailwindcss/tailwind.css';

import SemiCircle from '@/components/production/svg/SemiCircle';
import NavigationArrows from '@/components/production/ui/NavigationArrows';
import NavigationDots from '@/components/production/ui/NavigationDots';
import ProgressBar from '@/components/production/ui/ProgressBar';
import { useEditableState } from '@/hooks/useEditableState';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { EditableComponent } from '@/types/types';

import HeroeSectionSlide from './HeroSectionSlide';

export type HeroSectionProps = {
  heroSectionSlides: HeroSectionSlideType[];
};

function HeroSection({
  heroSectionSlides,
  isEditMode,
  setEditedProp,
  setBlur,
}: HeroSectionProps & EditableComponent) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { state, handleUpdate } = useEditableState<{ heroSectionSlides: HeroSectionSlideType[] }>(
    { heroSectionSlides },
    setEditedProp,
  );

  const slides = state.heroSectionSlides;

  React.useEffect(() => {
    if (isPaused || isEditMode) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isEditMode, slides.length]);

  React.useEffect(() => {
    if (isEditMode) return;

    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / 5000) * 100;
      setProgress(newProgress > 100 ? 0 : newProgress);
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentSlide, isEditMode]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index: number) => {
    setIsPaused(true);
    setCurrentSlide(index);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleSlideUpdate = (updatedSlide: HeroSectionSlideType) => {
    const newSlides = slides.map((slide) => (slide.id === updatedSlide.id ? updatedSlide : slide));
    handleUpdate({ heroSectionSlides: newSlides });
  };

  return (
    <EditContext.Provider value={{ isEditMode, setEditedProp, setBlur }}>
      <section
        className="relative w-full overflow-hidden bg-white select-none"
        aria-label="Featured content"
      >
        <SemiCircle />
        <div className="relative lg:-top-5 mx-auto h-[90vh] md:h-[150vh] lg:h-[84vh] min-h-[500px] lg:max-h-[900px] w-full max-w-screen-2xl px-4 lg:px-12">
          <div className="relative h-full w-full">
            {slides.map((slide, index) => (
              <HeroeSectionSlide
                key={slide.id}
                slide={slide}
                isActive={currentSlide === index}
                onSlideUpdate={handleSlideUpdate}
              />
            ))}
          </div>
          <div>
            <ProgressBar progress={progress} />
            <NavigationDots
              currentSlide={currentSlide}
              totalSlides={slides.length}
              onDotClick={handleDotClick}
            />
            <NavigationArrows
              onPrevSlide={prevSlide}
              onNextSlide={nextSlide}
              isDesktop={isDesktop}
            />
          </div>
        </div>
      </section>
    </EditContext.Provider>
  );
}

export default HeroSection;
