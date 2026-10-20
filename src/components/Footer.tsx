import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenCatalog: () => void;
  activeTitle: string;
  activeLocation: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCatalog, activeTitle, activeLocation }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex items-end justify-between px-6 md:px-12 py-6 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-auto">
      {/* Bottom-Left: Copyright & Portfolio Label */}
      <div className="flex flex-col gap-0.5 text-left">
        <span className="text-[11px] md:text-xs font-mono text-zinc-400 tracking-wider uppercase">
          © 2026 Atelier Lumière
        </span>
        <span className="hidden sm:inline text-xs text-zinc-500 font-editorial italic">
          Monograph Series IV · Spatial Photography
        </span>
      </div>

      {/* Center discreet hint on desktop */}
      <div className="hidden lg:flex items-center gap-3 text-xs text-zinc-400 font-mono tracking-wider uppercase">
        <span>← Prev</span>
        <span className="text-zinc-300">·</span>
        <span>Drag or Scroll</span>
        <span className="text-zinc-300">·</span>
        <span>Next →</span>
      </div>

      {/* Bottom-Right: Subtle "See all projects" link */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenCatalog}
          className="group inline-flex items-center gap-1.5 text-xs md:text-sm font-medium tracking-wide uppercase text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
        >
          <span>See all projects</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
};
