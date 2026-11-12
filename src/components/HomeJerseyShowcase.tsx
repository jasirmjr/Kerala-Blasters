import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

export interface ShowcaseKit {
  id: string;
  name: string;
  type: 'Home Kit' | 'Away Kit';
  colorTag: string;
  frontImage: string;
  backImage: string;
  price: number;
  originalPrice: number;
  discount: string;
  purchaseUrl: string;
  description: string;
}

export const SHOWCASE_KITS: ShowcaseKit[] = [
  {
    id: 'kbfc-home',
    name: 'Kerala Blasters FC Home Kit',
    type: 'Home Kit',
    colorTag: 'Signature Yellow • Official Matchwear',
    frontImage: '/hjf1.webp',
    backImage: '/hjf2.webp',
    price: 999,
    originalPrice: 1999,
    discount: '50% OFF',
    purchaseUrl: 'https://six5six.in/products/kbfc-home-jersey-fan-edition-2026-27',
    description:
      'Inspired by Kerala’s coastal heritage of coir craftsmanship. Coir rope-inspired stripes bring a distinctive local identity to the classic yellow design, while the navy collar and cuffs feature a subtle coir motif for a refined finish. A piece of Kerala, woven into every thread.',
  },
  {
    id: 'kbfc-away',
    name: 'Kerala Blasters FC Away Kit',
    type: 'Away Kit',
    colorTag: 'Monsoon Mist White • Official Matchwear',
    frontImage: '/ajf1.webp',
    backImage: '/ajf2.webp',
    price: 999,
    originalPrice: 1999,
    discount: '50% OFF',
    purchaseUrl: 'https://six5six.in/products/kbfc-away-jersey-fan-edition-2026-27',
    description:
      'The Kerala Blasters FC Away Kit draws inspiration from Edavappathi, Kerala’s southwest monsoon, featuring a flowing rain-droplet pattern in layered shades of grey. Sky blue, navy, and white ombré accents on the collar and cuffs reflect the changing tones of a monsoon sky, capturing the season’s calm and atmospheric character.',
  },
];

export const HomeJerseyShowcase: React.FC = () => {
  const [hoveredHome, setHoveredHome] = useState(false);
  const [hoveredAway, setHoveredAway] = useState(false);

  const homeKit = SHOWCASE_KITS[0];
  const awayKit = SHOWCASE_KITS[1];

  const handleBuy = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="home-jersey-sale-section"
      className="relative min-h-screen lg:h-screen lg:max-h-[1080px] w-full bg-[#002b7a] text-white overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 lg:px-12 select-none"
      style={{
        backgroundColor: '#002b7a',
        backgroundImage: `
          radial-gradient(circle at 35% 35%, rgba(255, 209, 0, 0.08) 0%, transparent 60%),
          radial-gradient(circle at 85% 70%, rgba(0, 18, 55, 0.75) 0%, transparent 60%),
          linear-gradient(180deg, #001f5c 0%, #002b7a 50%, #001f5c 100%)
        `,
      }}
    >
      {/* Background Architectural Grid Lines & Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px]" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: "Stitch by stitch, we're crafting something special" */}
      <header className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-center sm:text-left">
          <h2
            style={{
              fontFamily: "'Avenir Arabic', 'Avenir Next', 'Inter', system-ui, sans-serif",
              fontWeight: 400,
            }}
            className="text-xl sm:text-2xl lg:text-[2.1rem] tracking-tight leading-tight text-white font-serif select-none"
          >
            <span>Stitch by stitch, </span>
            <span className="text-white/90">we're crafting something special</span>
          </h2>
        </div>

       
      </header>

      {/* MAIN TWO-COLUMN SHOWCASE STAGE */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-3 sm:py-5">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: BOTH JERSEYS HANGING FIXED ONTO THE REAL ROPE */}
        {/* ========================================================= */}
        <div className="relative w-full lg:w-7/12 xl:w-3/5 flex flex-col items-center justify-center">
          
          {/* UNIFIED ROPE & JERSEYS STAGE */}
          <div className="relative w-full max-w-[640px] sm:max-w-[680px] flex flex-col items-center">
            
            {/* JERSEYS HANGING STAGE (CALIBRATED HEIGHT MATCHING CROPPED JERSEYS) */}
            <div className="relative w-full h-[320px] sm:h-[370px] lg:h-[395px] xl:h-[405px]">
              
              {/* LUMINOUS CURVED WHITE ROPE (EXACT GEMINI WAVE GEOMETRY) */}
              {/* Enters from screen far-left, dips through Home hook, crests between kits, dips through Away hook, soars to top AFTER heading */}
              <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
                <svg
                  viewBox="0 0 1000 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Multi-layer soft luminous bloom filter for illuminated rope effect */}
                    <filter id="geminiThreadGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="9" result="wideGlow" />
                      <feGaussianBlur stdDeviation="3.5" result="tightGlow" />
                      <feMerge>
                        <feMergeNode in="wideGlow" />
                        <feMergeNode in="tightGlow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 1. Deep Wall Ambient Shadow underneath the rope */}
                  <path
                    d="M -1800 -30 C -600 30, 50 75, 250 75 C 330 75, 420 26, 500 26 C 580 26, 670 75, 750 75 C 920 75, 1300 -50, 1650 -280"
                    stroke="#000e26"
                    strokeWidth="7"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                    fill="none"
                    transform="translate(0, 8)"
                  />

                  {/* 2. Soft Luminous White Halo Layer */}
                  <path
                    d="M -1800 -30 C -600 30, 50 75, 250 75 C 330 75, 420 26, 500 26 C 580 26, 670 75, 750 75 C 920 75, 1300 -50, 1650 -280"
                    stroke="#ffffff"
                    strokeWidth="6"
                    strokeOpacity="0.4"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#geminiThreadGlow)"
                  />

                  {/* 3. Main Crisp Glowing Solid White Core */}
                  <path
                    d="M -1800 -30 C -600 30, 50 75, 250 75 C 330 75, 420 26, 500 26 C 580 26, 670 75, 750 75 C 920 75, 1300 -50, 1650 -280"
                    stroke="#ffffff"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* TWO JERSEYS HANGING IN COLUMNS (Z-20 in front of rope, hook passes through) */}
              <div className="w-full h-full grid grid-cols-2 gap-0 relative z-20">
                
                {/* 1. HOME JERSEY (SIGNATURE YELLOW) */}
                <div
                  onMouseEnter={() => setHoveredHome(true)}
                  onMouseLeave={() => setHoveredHome(false)}
                  onClick={() => handleBuy(homeKit.purchaseUrl)}
                  className="group relative flex flex-col items-center justify-start cursor-pointer w-full h-full px-2 sm:px-3 select-none"
                  style={{ perspective: 1400 }}
                >
                  {/* 3D FLIP CARD FOR HOME KIT (Pivots naturally around hook fixed on the rope at 15%) */}
                  <motion.div
                    animate={{
                      rotateY: hoveredHome ? 180 : 0,
                      rotateZ: [-1.4, 1.4, -0.9, 1.2, -1.4],
                      x: [-1, 1, -0.8, 0.8, -1],
                      scale: hoveredHome ? 1.04 : 0.98,
                    }}
                    transition={{
                      rotateY: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                      rotateZ: { duration: 6.8, repeat: Infinity, ease: 'easeInOut' },
                      x: { duration: 7.2, repeat: Infinity, ease: 'easeInOut' },
                      scale: { duration: 0.3 },
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: '50% 15%',
                    }}
                    className="relative w-full h-full flex items-start justify-center"
                  >
                    {/* Front Face (hjf1) */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className="absolute inset-0 w-full h-full flex items-start justify-center pointer-events-none"
                    >
                      <picture className="w-auto h-full flex items-start justify-center">
                        <source srcSet={homeKit.frontImage} type="image/webp" />
                        <img
                          src="/hjf1.png"
                          alt="Home Kit Front"
                          className="w-auto h-full object-contain object-top filter-none drop-shadow-none"
                          loading="eager"
                          decoding="async"
                        />
                      </picture>
                    </div>

                    {/* Back Face (hjf2) */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                      className="absolute inset-0 w-full h-full flex items-start justify-center pointer-events-none"
                    >
                      <picture className="w-auto h-full flex items-start justify-center">
                        <source srcSet={homeKit.backImage} type="image/webp" />
                        <img
                          src="/hjf2.png"
                          alt="Home Kit Back"
                          className="w-auto h-full object-contain object-top filter-none drop-shadow-none"
                          loading="eager"
                          decoding="async"
                        />
                      </picture>
                    </div>
                  </motion.div>
                </div>

                {/* 2. AWAY JERSEY (MONSOON MIST WHITE) */}
                <div
                  onMouseEnter={() => setHoveredAway(true)}
                  onMouseLeave={() => setHoveredAway(false)}
                  onClick={() => handleBuy(awayKit.purchaseUrl)}
                  className="group relative flex flex-col items-center justify-start cursor-pointer w-full h-full px-2 sm:px-3 select-none"
                  style={{ perspective: 1400 }}
                >
                  {/* 3D FLIP CARD FOR AWAY KIT (Pivots naturally around hook fixed on the rope at 15%) */}
                  <motion.div
                    animate={{
                      rotateY: hoveredAway ? 180 : 0,
                      rotateZ: [1.2, -1.4, 0.9, -1.2, 1.2],
                      x: [1, -1, 0.8, -0.8, 1],
                      scale: hoveredAway ? 1.04 : 0.98,
                    }}
                    transition={{
                      rotateY: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                      rotateZ: { duration: 7.1, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
                      x: { duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                      scale: { duration: 0.3 },
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: '50% 15%',
                    }}
                    className="relative w-full h-full flex items-start justify-center"
                  >
                    {/* Front Face (ajf1) */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className="absolute inset-0 w-full h-full flex items-start justify-center pointer-events-none"
                    >
                      <picture className="w-auto h-full flex items-start justify-center">
                        <source srcSet={awayKit.frontImage} type="image/webp" />
                        <img
                          src="/ajf1.png"
                          alt="Away Kit Front"
                          className="w-auto h-full object-contain object-top filter-none drop-shadow-none"
                          loading="eager"
                          decoding="async"
                        />
                      </picture>
                    </div>

                    {/* Back Face (ajf2) */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                      className="absolute inset-0 w-full h-full flex items-start justify-center pointer-events-none"
                    >
                      <picture className="w-auto h-full flex items-start justify-center">
                        <source srcSet={awayKit.backImage} type="image/webp" />
                        <img
                          src="/ajf2.png"
                          alt="Away Kit Back"
                          className="w-auto h-full object-contain object-top filter-none drop-shadow-none"
                          loading="eager"
                          decoding="async"
                        />
                      </picture>
                    </div>
                  </motion.div>
                </div>

              </div>

            </div>

            {/* KIT LABELS IN WHITE - Placed directly below the image */}
            <div className="w-full grid grid-cols-2 gap-0 mt-2 sm:mt-2.5 relative z-20">
              <div className="text-center px-2 sm:px-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider block text-white drop-shadow-sm">
                  HOME KIT
                </span>
              </div>
              <div className="text-center px-2 sm:px-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider block text-white drop-shadow-sm">
                  AWAY KIT
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: SIMULTANEOUS DESCRIPTIONS OF BOTH JERSEYS    */}
        {/* WITH SEPARATE WHITE BUY NOW BUTTONS                       */}
        {/* ========================================================= */}
        <div className="relative w-full lg:w-5/12 xl:w-2/5 flex flex-col justify-center space-y-8 sm:space-y-10 max-w-xl">
          
          {/* 1. HOME JERSEY DETAILS (NO CARD BACKGROUND) */}
          <div className="transition-opacity duration-300">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2.5">
              {homeKit.name}
            </h3>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal mb-4">
              {homeKit.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBuy(homeKit.purchaseUrl)}
              className="py-3 px-6 rounded-full bg-white hover:bg-white/90 text-[#002b7a] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#002b7a]" />
              <span>BUY HOME KIT</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#002b7a]" />
            </motion.button>
          </div>

          {/* 2. AWAY JERSEY DETAILS (NO CARD BACKGROUND) */}
          <div className="transition-opacity duration-300">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2.5">
              {awayKit.name}
            </h3>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal mb-4">
              {awayKit.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBuy(awayKit.purchaseUrl)}
              className="py-3 px-6 rounded-full bg-white hover:bg-white/90 text-[#002b7a] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#002b7a]" />
              <span>BUY AWAY KIT</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#002b7a]" />
            </motion.button>
          </div>

        </div>

      </div>


    </section>
  );
};
