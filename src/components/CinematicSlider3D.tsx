import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Compass, Camera } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import { playTactileClick, playShutterSound } from '../utils/audio';

interface CinematicSlider3DProps {
  items: GalleryItem[];
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  onOpenLightbox: (item: GalleryItem) => void;
  soundEnabled: boolean;
}

export const CinematicSlider3D: React.FC<CinematicSlider3DProps> = ({
  items,
  activeIndex,
  onChangeIndex,
  onOpenLightbox,
  soundEnabled,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef<number>(0);
  const wheelLockRef = useRef<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const total = items.length;
  const activeItem = items[activeIndex];

  // Track window resize for responsive 3D adjustments
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Gentle Mouse Parallax Tilt (controlled & sophisticated)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMouseTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseTilt({ x: 0, y: 0 });
  }, []);

  // Safe navigation helpers
  const handleNext = useCallback(() => {
    playTactileClick(soundEnabled);
    onChangeIndex((activeIndex + 1) % total);
  }, [activeIndex, total, onChangeIndex, soundEnabled]);

  const handlePrev = useCallback(() => {
    playTactileClick(soundEnabled);
    onChangeIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onChangeIndex, soundEnabled]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'KeyL') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'KeyH') {
        handlePrev();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onOpenLightbox(activeItem);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, activeItem, onOpenLightbox]);

  // Smooth debounced mouse wheel / trackpad scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If delta is noticeable
      if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
        e.preventDefault();
        if (wheelLockRef.current) return;

        wheelLockRef.current = true;
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }

        setTimeout(() => {
          wheelLockRef.current = false;
        }, 550);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleNext, handlePrev]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - dragStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  // Compute spatial arrangement per item
  const getItemTransform = (itemIndex: number) => {
    let diff = (itemIndex - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Mobile parameters
    if (isMobile) {
      if (diff === 0) {
        return {
          x: '0%',
          y: '0%',
          z: 30,
          rotateY: mouseTilt.x * 4,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          zIndex: 40,
          pointerEvents: 'auto' as const,
        };
      }
      if (diff === -1) {
        return {
          x: '-72%',
          y: '-1%',
          z: -120,
          rotateY: 26,
          rotateZ: -2,
          scale: 0.72,
          opacity: 0.55,
          zIndex: 20,
          pointerEvents: 'auto' as const,
        };
      }
      if (diff === 1) {
        return {
          x: '72%',
          y: '1%',
          z: -120,
          rotateY: -26,
          rotateZ: 2,
          scale: 0.72,
          opacity: 0.55,
          zIndex: 20,
          pointerEvents: 'auto' as const,
        };
      }
      return {
        x: diff < 0 ? '-120%' : '120%',
        y: '0%',
        z: -300,
        rotateY: diff < 0 ? 35 : -35,
        rotateZ: 0,
        scale: 0.45,
        opacity: 0,
        zIndex: 10,
        pointerEvents: 'none' as const,
      };
    }

    // Tablet parameters
    if (isTablet) {
      if (diff === 0) {
        return {
          x: '0%',
          y: '0%',
          z: 40,
          rotateY: mouseTilt.x * 6,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          zIndex: 40,
          pointerEvents: 'auto' as const,
        };
      }
      if (diff === -1) {
        return {
          x: '-52%',
          y: '-2%',
          z: -130,
          rotateY: 20,
          rotateZ: -2,
          scale: 0.76,
          opacity: 0.7,
          zIndex: 30,
          pointerEvents: 'auto' as const,
        };
      }
      if (diff === 1) {
        return {
          x: '52%',
          y: '2%',
          z: -130,
          rotateY: -20,
          rotateZ: 2,
          scale: 0.76,
          opacity: 0.7,
          zIndex: 30,
          pointerEvents: 'auto' as const,
        };
      }
      if (diff === -2) {
        return {
          x: '-88%',
          y: '-3%',
          z: -260,
          rotateY: 30,
          rotateZ: -3,
          scale: 0.55,
          opacity: 0.3,
          zIndex: 20,
          pointerEvents: 'auto' as const,
        };
      }
      if (diff === 2) {
        return {
          x: '88%',
          y: '3%',
          z: -260,
          rotateY: -30,
          rotateZ: 3,
          scale: 0.55,
          opacity: 0.3,
          zIndex: 20,
          pointerEvents: 'auto' as const,
        };
      }
      return {
        x: diff < 0 ? '-130%' : '130%',
        y: '0%',
        z: -420,
        rotateY: diff < 0 ? 40 : -40,
        rotateZ: 0,
        scale: 0.4,
        opacity: 0,
        zIndex: 10,
        pointerEvents: 'none' as const,
      };
    }

    // Desktop parameters (Full layered 3D depth)
    if (diff === 0) {
      return {
        x: '0%',
        y: '0%',
        z: 60,
        rotateY: mouseTilt.x * 7,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        zIndex: 40,
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === -1) {
      return {
        x: '-46%',
        y: '-1.8%',
        z: -130,
        rotateY: 22 + mouseTilt.x * 4,
        rotateZ: -2,
        scale: 0.78,
        opacity: 0.78,
        zIndex: 30,
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === 1) {
      return {
        x: '46%',
        y: '1.8%',
        z: -130,
        rotateY: -22 + mouseTilt.x * 4,
        rotateZ: 2,
        scale: 0.78,
        opacity: 0.78,
        zIndex: 30,
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === -2) {
      return {
        x: '-82%',
        y: '-3.5%',
        z: -270,
        rotateY: 33 + mouseTilt.x * 3,
        rotateZ: -3.5,
        scale: 0.58,
        opacity: 0.36,
        zIndex: 20,
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === 2) {
      return {
        x: '82%',
        y: '3.5%',
        z: -270,
        rotateY: -33 + mouseTilt.x * 3,
        rotateZ: 3.5,
        scale: 0.58,
        opacity: 0.36,
        zIndex: 20,
        pointerEvents: 'auto' as const,
      };
    }
    return {
      x: diff < 0 ? '-125%' : '125%',
      y: '0%',
      z: -480,
      rotateY: diff < 0 ? 44 : -44,
      rotateZ: 0,
      scale: 0.38,
      opacity: 0,
      zIndex: 10,
      pointerEvents: 'none' as const,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none bg-white perspective-stage touch-none"
    >
      {/* 1. Large Expressive Editorial Typography (Floating behind images in 3D) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 preserve-3d"
        style={{
          transform: `translate3d(0, -5%, -140px) rotateY(${mouseTilt.x * -4}deg) rotateX(${mouseTilt.y * 3}deg)`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.94, letterSpacing: '0.12em', filter: 'blur(8px)' }}
            animate={{ opacity: 0.08, scale: 1, letterSpacing: '0.04em', filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, letterSpacing: '0.16em', filter: 'blur(8px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-[18vw] leading-none text-zinc-950 uppercase tracking-tighter text-center"
          >
            {activeItem.editorialWord}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* 2. Main 3D Stage / Spatial Floating Gallery */}
      <div
        className="relative w-full max-w-7xl h-[56vh] md:h-[64vh] flex items-center justify-center preserve-3d cursor-grab active:cursor-grabbing"
        style={{
          transform: `rotateY(${mouseTilt.x * 4}deg) rotateX(${-mouseTilt.y * 3}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {items.map((item, index) => {
          const transform = getItemTransform(index);
          const isFocal = (index - activeIndex) % total === 0;

          // Determine card sizing based on photography aspect ratio
          let aspectClass = 'aspect-[4/3] w-[75vw] sm:w-[460px] md:w-[540px] lg:w-[600px]';
          if (item.aspect === '16:9') {
            aspectClass = 'aspect-[16/9] w-[82vw] sm:w-[500px] md:w-[600px] lg:w-[680px]';
          } else if (item.aspect === '3:4') {
            aspectClass = 'aspect-[3/4] w-[62vw] sm:w-[380px] md:w-[420px] lg:w-[460px]';
          }

          return (
            <motion.div
              key={item.id}
              animate={{
                x: transform.x,
                y: transform.y,
                z: transform.z,
                rotateY: transform.rotateY,
                rotateZ: transform.rotateZ,
                scale: transform.scale,
                opacity: transform.opacity,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'absolute',
                zIndex: transform.zIndex,
                pointerEvents: transform.pointerEvents,
              }}
              className="preserve-3d flex items-center justify-center"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFocal) {
                    playShutterSound(soundEnabled);
                    onOpenLightbox(item);
                  } else {
                    playTactileClick(soundEnabled);
                    onChangeIndex(index);
                  }
                }}
                className={`group relative ${aspectClass} rounded-none bg-white p-3 md:p-4 transition-all duration-300 backface-hidden cursor-pointer ${
                  isFocal
                    ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] ring-1 ring-zinc-950/10'
                    : 'shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] ring-1 ring-zinc-950/5 hover:ring-zinc-950/20 hover:opacity-95'
                }`}
              >
                {/* Image Container with pristine white matting border (Physical Print Aesthetic) */}
                <div className="relative w-full h-full overflow-hidden bg-zinc-100">
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading={Math.abs((index - activeIndex) % total) <= 2 ? 'eager' : 'lazy'}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isFocal ? 'group-hover:scale-[1.025]' : 'group-hover:scale-[1.01]'
                    }`}
                  />

                  {/* Focal Inspect Prompt on Hover */}
                  {isFocal && (
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-sm px-4 py-2 text-xs font-mono uppercase tracking-wider text-zinc-900 shadow-lg flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Print</span>
                      </div>
                    </div>
                  )}

                  {/* Non-focal click to focus indicator */}
                  {!isFocal && (
                    <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors duration-200" />
                  )}
                </div>

                {/* Subtle Print Index in bottom-right margin */}
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  <span>{item.indexFormatted}</span>
                  <span className="truncate max-w-[140px] text-right font-sans-custom">{item.location}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Floating Editorial Caption Lockup (Directly connected to focal image) */}
      <div className="relative z-30 mt-3 md:mt-5 text-center max-w-xl px-6 pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Metadata Line: Zero-Pill unboxed typography */}
            <div className="flex items-center gap-2 text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
              <span>{activeItem.indexFormatted}</span>
              <span aria-hidden="true">·</span>
              <span>{activeItem.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeItem.year}</span>
            </div>

            {/* Artwork Title */}
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-normal text-zinc-900 tracking-tight mb-2">
              {activeItem.title}
            </h2>

            {/* Curator Monograph Lead */}
            <p className="text-xs sm:text-sm text-zinc-600 font-sans-custom max-w-md line-clamp-2 leading-relaxed">
              {activeItem.curatorNote}
            </p>

            {/* Quick EXIF camera stamp */}
            <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <Camera className="w-3 h-3 text-zinc-400" />
                <span>{activeItem.exif.camera}</span>
              </span>
              <span className="text-zinc-300">/</span>
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-zinc-400" />
                <span>{activeItem.location}</span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Left & Right Architectural Navigation Chevrons */}
      <button
        onClick={handlePrev}
        aria-label="Previous photograph"
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center text-zinc-700 hover:text-zinc-950 bg-white/70 hover:bg-white backdrop-blur-sm border border-zinc-200/80 hover:border-zinc-300 transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 group"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next photograph"
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center text-zinc-700 hover:text-zinc-950 bg-white/70 hover:bg-white backdrop-blur-sm border border-zinc-200/80 hover:border-zinc-300 transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 group"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* 5. Minimal Slide Track Indicator Dots / Lines */}
      <div className="absolute bottom-16 sm:bottom-20 flex items-center gap-2 z-30">
        {items.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => {
                playTactileClick(soundEnabled);
                onChangeIndex(idx);
              }}
              className="group p-2 cursor-pointer focus:outline-none"
              aria-label={`Jump to slide ${idx + 1}`}
            >
              <div
                className={`h-[2px] transition-all duration-500 ${
                  isActive
                    ? 'w-8 bg-zinc-900'
                    : 'w-3 bg-zinc-300 group-hover:bg-zinc-500 group-hover:w-5'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
