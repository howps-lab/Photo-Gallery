import React from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface HeaderProps {
  currentIndex: number;
  totalItems: number;
  onOpenAbout: () => void;
  onOpenCatalog: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentIndex,
  totalItems,
  onOpenAbout,
  onOpenCatalog,
  isPlaying,
  onTogglePlay,
  soundEnabled,
  onToggleSound,
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalItems).padStart(2, '0');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-8 px-6 md:px-12 py-6 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-auto">
      {/* Zone 1: Wordmark / Brand */}
      <div className="flex items-center gap-6 shrink-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-base md:text-lg font-bold tracking-tight text-zinc-900 uppercase hover:opacity-75 transition-opacity whitespace-nowrap"
        >
          Atelier Lumière
        </a>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="flex items-center gap-6 md:gap-8 text-xs md:text-sm font-medium tracking-wide uppercase text-zinc-600">
        <button
          onClick={onOpenCatalog}
          className="hover:text-zinc-950 transition-colors cursor-pointer whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all"
        >
          Gallery
        </button>
        <button
          onClick={onOpenAbout}
          className="hover:text-zinc-950 transition-colors cursor-pointer whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all"
        >
          About
        </button>
      </nav>

      {/* Zone 3: Actions & Discrete Slide Counter */}
      <div className="flex items-center gap-5 md:gap-6 shrink-0">
        {/* Autoplay Toggle */}
        <button
          onClick={onTogglePlay}
          className="hidden sm:flex items-center gap-1.5 text-xs tracking-wider uppercase text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
          title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden md:inline text-[11px] font-mono">{isPlaying ? 'Auto' : 'Play'}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="flex items-center text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer p-1"
          title={soundEnabled ? 'Mute shutter sounds' : 'Enable tactile shutter sounds'}
          aria-label={soundEnabled ? 'Mute shutter sounds' : 'Enable tactile shutter sounds'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-zinc-900" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Discrete Slide Number Counter */}
        <button
          onClick={onOpenCatalog}
          className="flex items-baseline gap-1 font-mono text-xs md:text-sm text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer group"
          title="Open project index"
        >
          <span className="font-semibold text-zinc-900 tabular-nums">{currentFormatted}</span>
          <span className="text-zinc-300">/</span>
          <span className="text-zinc-400 tabular-nums">{totalFormatted}</span>
        </button>
      </div>
    </header>
  );
};
