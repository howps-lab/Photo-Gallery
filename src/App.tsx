/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS, GalleryItem } from './data/galleryData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CinematicSlider3D } from './components/CinematicSlider3D';
import { LightboxModal } from './components/LightboxModal';
import { AboutModal } from './components/AboutModal';
import { CatalogModal } from './components/CatalogModal';
import { playTactileClick } from './utils/audio';

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  const total = GALLERY_ITEMS.length;
  const activeItem = GALLERY_ITEMS[activeIndex];

  // Autoplay progression (pauses automatically when any modal is open)
  useEffect(() => {
    if (!isPlaying || lightboxItem || isAboutOpen || isCatalogOpen) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
      if (soundEnabled) {
        playTactileClick(true);
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [isPlaying, lightboxItem, isAboutOpen, isCatalogOpen, total, soundEnabled]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  return (
    <div className="relative w-full h-screen bg-white text-zinc-900 overflow-hidden font-sans-custom">
      {/* 1. Header (Top Bar Contract: 1 row, 3 zones, zero pills) */}
      <Header
        currentIndex={activeIndex}
        totalItems={total}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />

      {/* 2. Core 3D Cinematic Spatial Stage */}
      <main className="w-full h-full">
        <CinematicSlider3D
          items={GALLERY_ITEMS}
          activeIndex={activeIndex}
          onChangeIndex={(newIndex) => setActiveIndex(newIndex)}
          onOpenLightbox={(item) => setLightboxItem(item)}
          soundEnabled={soundEnabled}
        />
      </main>

      {/* 3. Minimal Footer */}
      <Footer
        onOpenCatalog={() => setIsCatalogOpen(true)}
        activeTitle={activeItem.title}
        activeLocation={activeItem.location}
      />

      {/* 4. Fullscreen Lightbox / EXIF Inspector Modal */}
      <LightboxModal
        isOpen={Boolean(lightboxItem)}
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onNext={() => {
          const nextIndex = (activeIndex + 1) % total;
          setActiveIndex(nextIndex);
          setLightboxItem(GALLERY_ITEMS[nextIndex]);
          playTactileClick(soundEnabled);
        }}
        onPrev={() => {
          const prevIndex = (activeIndex - 1 + total) % total;
          setActiveIndex(prevIndex);
          setLightboxItem(GALLERY_ITEMS[prevIndex]);
          playTactileClick(soundEnabled);
        }}
      />

      {/* 5. Curatorial Monograph / About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* 6. Complete Project Index / Catalog Modal */}
      <CatalogModal
        isOpen={isCatalogOpen}
        items={GALLERY_ITEMS}
        currentIndex={activeIndex}
        onClose={() => setIsCatalogOpen(false)}
        onSelect={(newIndex) => setActiveIndex(newIndex)}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
