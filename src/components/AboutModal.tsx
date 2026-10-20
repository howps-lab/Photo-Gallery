import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Eye, Layers } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white border border-zinc-200/80 shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Close about dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                Curatorial Monograph IV
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-zinc-900 mt-1">
                Perspective & Form
              </h2>
            </div>

            {/* Prose */}
            <div className="space-y-4 text-zinc-600 text-sm leading-relaxed font-sans-custom">
              <p>
                Atelier Lumière presents an experimental spatial photography showcase investigating
                the interplay between brutalist volume, nocturnal momentum, and architectural silence.
                Rather than treating photography as static pixel flatlands, the gallery suspends physical
                prints within a responsive 3D perspective field.
              </p>
              <p>
                Each photographic study is rendered with optical accuracy, preserving authentic aspect
                ratios, depth cues, and tonal fidelity. Captured across Basel, London, Milan, Big Sur,
                and Tokyo, the collection bridges medium-format digital sensor technology with the
                contemplative pacing of traditional exhibition spaces.
              </p>
            </div>

            {/* Curatorial Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 pt-6 border-t border-zinc-100">
              <div className="flex flex-col gap-1.5">
                <Layers className="w-4 h-4 text-zinc-900" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  Spatial Depth
                </h4>
                <p className="text-[12px] text-zinc-500 leading-normal">
                  Genuine 3D transforms, perspective distortion, and layered depth.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Eye className="w-4 h-4 text-zinc-900" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  Pure Aesthetic
                </h4>
                <p className="text-[12px] text-zinc-500 leading-normal">
                  Minimalist white canvas, typography in counterpoint, zero clutter.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Award className="w-4 h-4 text-zinc-900" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  Archival Prints
                </h4>
                <p className="text-[12px] text-zinc-500 leading-normal">
                  Museum-grade Hahnemühle cotton rag fine-art editions.
                </p>
              </div>
            </div>

            {/* Exhibition Details */}
            <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400 font-mono gap-3">
              <span>Curated by Atelier Lumière Studios</span>
              <span>Available for Gallery Inquiries</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
