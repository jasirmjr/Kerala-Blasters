import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { MatchItem, NewsItem } from '../types';

interface HeroSectionProps {
  onReadNow: () => void;
  onBookTickets?: () => void;
  featuredNews?: NewsItem;
  nextMatch?: MatchItem;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onReadNow,
  featuredNews,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Full-Screen Pure Background Image (No Vignette Overlay) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=2560&q=95"
          alt="Kerala Blasters Stadium Atmosphere"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Main Hero Content (Clean, No Box, No Overlay) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          

          {/* Hero Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-[0.95] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] mb-4"
          >
            YENNUM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kbfc-yellow via-amber-300 to-kbfc-gold text-glow-yellow drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
              YELLOW.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
          >
            {featuredNews
              ? featuredNews.title
              : 'Masterclass in Kochi: Blasters roar back in front of 41,000 Yellow Army faithful at the Kaloor fortress.'}
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Prominent Animated Call-to-Action Button: "Read Now" */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onReadNow}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-kbfc-yellow via-amber-400 to-kbfc-gold text-kbfc-dark font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-kbfc-yellow/40 flex items-center space-x-2 group hover:brightness-110"
            >
              <span>Read Now</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 sm:py-4 rounded-xl bg-black/60 hover:bg-black/80 border border-white/30 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-sm transition-all flex items-center space-x-2 shadow-lg"
            >
              <span>Explore 2025 Kits</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
