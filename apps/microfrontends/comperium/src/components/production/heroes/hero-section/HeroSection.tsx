import { HeroSectionSlideType } from '@tauro/shared/types';

import * as React from 'react';
import 'tailwindcss/tailwind.css';

import SemiCircle from '@/components/production/svg/SemiCircle';
import NavigationArrows from '@/components/production/ui/NavigationArrows';
import NavigationDots from '@/components/production/ui/NavigationDots';
import ProgressBar from '@/components/production/ui/ProgressBar';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import HeroeSectionSlide from './HeroSlide';

type HeroSectionProps = {
  heroSectionSlides: HeroSectionSlideType[];
};

function HeroSection({ heroSectionSlides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Auto-rotate slides every 5 seconds
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSectionSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Progress bar animation
  React.useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / 5000) * 100; // 5000ms = 5s
      setProgress(newProgress > 100 ? 0 : newProgress);
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSectionSlides.length);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSectionSlides.length) % heroSectionSlides.length);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleDotClick = (index: number) => {
    setIsPaused(true);
    setCurrentSlide(index);
    // Resume auto-slide after some time
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white select-none"
      aria-label="Featured content"
    >
      <SemiCircle />

      {/* Slides */}
      <div className="relative lg:-top-5 mx-auto h-[90vh] md:h-[150vh] lg:h-[84vh] min-h-[500px] lg:max-h-[900px] w-full max-w-screen-2xl px-4 lg:px-12">
        <div className="relative h-full w-full">
          {heroSectionSlides.map((slide, index) => (
            <HeroeSectionSlide key={slide.id} slide={slide} isActive={currentSlide === index} />
          ))}
        </div>

        {/* Navigation controls */}
        <div>
          <ProgressBar progress={progress} />
          <NavigationDots
            currentSlide={currentSlide}
            totalSlides={heroSectionSlides.length}
            onDotClick={handleDotClick}
          />
          <NavigationArrows onPrevSlide={prevSlide} onNextSlide={nextSlide} isDesktop={isDesktop} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
