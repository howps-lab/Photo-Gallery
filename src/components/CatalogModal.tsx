import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import { playTactileClick } from '../utils/audio';

interface CatalogModalProps {
  isOpen: boolean;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
  soundEnabled: boolean;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  items,
  currentIndex,
  onClose,
  onSelect,
  soundEnabled,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-white border border-zinc-200/80 shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-zinc-100">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                  Exhibition Index
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-zinc-900 mt-0.5">
                  Complete Photographic Collection
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                aria-label="Close catalog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of Projects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {items.map((item, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      playTactileClick(soundEnabled);
                      onSelect(idx);
                      onClose();
                    }}
                    className={`group relative flex flex-col bg-white border transition-all duration-300 p-3 cursor-pointer ${
                      isCurrent
                        ? 'border-zinc-900 ring-1 ring-zinc-900 shadow-md'
                        : 'border-zinc-200 hover:border-zinc-400 hover:shadow-sm'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 mb-3">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {isCurrent && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-zinc-900 text-white font-mono text-[10px] uppercase tracking-wider">
                          Active
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      <span>{item.indexFormatted}</span>
                      <span>{item.location}</span>
                    </div>

                    <h3 className="font-editorial text-lg text-zinc-900 group-hover:text-zinc-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-500 font-sans-custom mt-1 line-clamp-1">
                      {item.category}
                    </p>

                    <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:text-zinc-900 transition-colors">
                      <span>View in 3D Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
