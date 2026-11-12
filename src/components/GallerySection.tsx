import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Maximize2, MapPin } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Manjappada', 'Matchday', 'Celebration', 'Training'];

  const filteredGallery = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  // Always display top 6 items matching the exact 6-card bento orientation
  const displayedItems = filteredGallery.slice(0, 6);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + displayedItems.length) % displayedItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayedItems.length);
    }
  };

  // Reusable Gallery Card Component
  const renderCard = (
    item: GalleryItem,
    index: number,
    heightClass: string,
    isWide: boolean
  ) => {
    if (!item) return null;
    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
        onClick={() => openLightbox(index)}
        className={`group relative ${heightClass} w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-slate-900 select-none`}
      >
        {/* Background Image with Gentle Hover Zoom */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Smooth Dark Vignette Overlay - darker at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-colors" />

        {/* Title Content - Positioned at the bottom inside the card */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 z-10">
          <h3
            className={`font-extrabold text-white leading-snug drop-shadow-md line-clamp-2 ${
              isWide ? 'text-sm sm:text-base lg:text-lg max-w-lg' : 'text-xs sm:text-sm lg:text-base'
            }`}
          >
            {item.title}
          </h3>
        </div>


      </motion.div>
    );
  };

  // Dimensions to fit comfortably within a single screen:
  // Short card: ~200px (desktop)
  // Tall card: ~280px (desktop)
  // Total stage height: 200 + gap (16px) + 280 = ~496px
  const shortHeight = 'h-[175px] sm:h-[195px] lg:h-[205px] xl:h-[215px]';
  const tallHeight = 'h-[250px] sm:h-[275px] lg:h-[285px] xl:h-[295px]';

  return (
    <section
      id="gallery-section"
      className="relative min-h-screen lg:h-screen lg:max-h-[1080px] flex flex-col justify-center py-4 sm:py-6 lg:py-6 bg-white text-slate-900 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center flex-1">
        
        {/* Header - Compact Left-Aligned Format */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-4 mb-4 sm:mb-5 lg:mb-6 text-left"
        >
          <div>
            <h2
              style={{
                fontFamily: "'Avenir Arabic', 'Avenir Next', 'Inter', system-ui, sans-serif",
                fontWeight: 800,
              }}
              className="text-2xl sm:text-3xl lg:text-4xl text-[#002b7a] tracking-tight leading-tight"
            >
              Gallery
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal">
              Experience the heart and soul of Kerala Blasters FC through our gallery
            </p>
          </div>

        </motion.div>

        {/* 6-Card Bento Mosaic Grid (Exact Reference Alignment) */}
        {/* Left Half: [Top Wide] + [Bottom 2 Portraits] */}
        {/* Right Half: [Top 2 Portraits] + [Bottom Wide] */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 items-stretch w-full">
          
          {/* ========================================================= */}
          {/* LEFT HALF (Col 1): Top Wide + Bottom 2 Portraits          */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-3.5 sm:gap-4 lg:gap-5 w-full">
            {/* Card 0: Top Left Wide Card (Short) */}
            {displayedItems[0] && renderCard(displayedItems[0], 0, shortHeight, true)}

            {/* Bottom 2 Portrait Cards Side-by-Side (Tall) */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 w-full">
              {/* Card 3: Bottom Left 1 Portrait */}
              {displayedItems[3] && renderCard(displayedItems[3], 3, tallHeight, false)}

              {/* Card 4: Bottom Left 2 Portrait */}
              {displayedItems[4] && renderCard(displayedItems[4], 4, tallHeight, false)}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT HALF (Col 2): Top 2 Portraits + Bottom Wide         */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-3.5 sm:gap-4 lg:gap-5 w-full">
            {/* Top 2 Portrait Cards Side-by-Side (Tall) */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 w-full">
              {/* Card 1: Top Right 1 Portrait */}
              {displayedItems[1] && renderCard(displayedItems[1], 1, tallHeight, false)}

              {/* Card 2: Top Right 2 Portrait */}
              {displayedItems[2] && renderCard(displayedItems[2], 2, tallHeight, false)}
            </div>

            {/* Card 5: Bottom Right Wide Card (Short) */}
            {displayedItems[5] && renderCard(displayedItems[5], 5, shortHeight, true)}
          </div>

        </div>

      </div>

      {/* Interactive Lightbox Preview */}
      <AnimatePresence>
        {lightboxIndex !== null && displayedItems[lightboxIndex] && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-kbfc-yellow/40 shadow-2xl bg-slate-900 flex flex-col"
            >
              <div className="relative overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={displayedItems[lightboxIndex].image}
                  alt={displayedItems[lightboxIndex].title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              {/* Lightbox Footer Caption */}
              <div className="p-4 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-kbfc-yellow text-[#002b7a]">
                      {displayedItems[lightboxIndex].category}
                    </span>
                    <h3 className="text-white font-bold text-base">
                      {displayedItems[lightboxIndex].title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {displayedItems[lightboxIndex].fixture} • {displayedItems[lightboxIndex].stadium}
                  </p>
                </div>
                <div className="text-xs text-slate-400 sm:text-right">
                  <span className="block font-medium">Photo: {displayedItems[lightboxIndex].photographer}</span>
                  <span className="font-mono text-[11px] text-kbfc-yellow">
                    {lightboxIndex + 1} / {displayedItems.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
