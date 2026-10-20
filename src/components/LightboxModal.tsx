import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar, Aperture, Film } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';

interface LightboxModalProps {
  isOpen: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  item,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close fullscreen inspection"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
          >
            <div className="relative max-h-[72vh] overflow-hidden bg-zinc-950 shadow-2xl">
              <img
                src={item.src}
                alt={item.title}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Bottom Monograph & Technical EXIF Bar */}
            <div className="w-full mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white px-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  <span>{item.indexFormatted}</span>
                  <span>·</span>
                  <span>{item.category}</span>
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-normal text-white mt-0.5">
                  {item.title}
                </h3>
              </div>

              {/* Technical EXIF */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{item.exif.camera}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{item.exif.lens}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Aperture className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{item.exif.aperture} · {item.exif.shutter} · ISO {item.exif.iso}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{item.location}</span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
