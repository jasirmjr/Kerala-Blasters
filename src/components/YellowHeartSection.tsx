import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface YellowHeartSectionProps {
  onReadMore: () => void;
}

export const YellowHeartSection: React.FC<YellowHeartSectionProps> = ({ onReadMore }) => {
  return (
    <section
      id="yellow-heart-section"
      className="py-8 sm:py-10 lg:py-12 text-white relative select-none"
      style={{
        backgroundColor: '#002b7a',
        backgroundImage: `
          radial-gradient(circle at 15% 25%, rgba(255, 209, 0, 0.08) 0%, transparent 55%),
          radial-gradient(circle at 85% 75%, rgba(0, 18, 55, 0.7) 0%, transparent 60%),
          linear-gradient(180deg, #001f5c 0%, #002b7a 50%, #001f5c 100%)
        `,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Yellow Heart Logo (Simple Fade-In in place) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="md:col-span-5 lg:col-span-4 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[190px] sm:max-w-[220px] lg:max-w-[240px] aspect-square flex items-center justify-center">
              <img
                src="/yellow-heart.png"
                alt="The Yellow Heart Initiative"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(255,209,0,0.3)] hover:scale-105 transition-transform duration-300 select-none"
              />
            </div>
          </motion.div>

          {/* Right Column: Left-Aligned Content with White Text & White Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="md:col-span-7 lg:col-span-8 space-y-3.5 sm:space-y-4 text-left"
          >
            {/* Left-Aligned Heading matching top section font in white */}
            <h2
              style={{
                fontFamily: "'Avenir Arabic', 'Avenir Next', 'Inter', system-ui, sans-serif",
                fontWeight: 800,
              }}
              className="text-2xl sm:text-3xl lg:text-[2.2rem] text-white tracking-tight leading-snug text-left"
            >
              The <span className="text-kbfc-yellow">Yellow Heart</span> Initiative
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-2xl">
              Kerala Blasters FC's community outreach program is dedicated to giving back to the local community, recognizing the unwavering support the club has received since its founding.
            </p>

            {/* White "Read More" CTA button */}
            <div className="pt-1">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onReadMore}
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white hover:bg-white/90 text-[#002b7a] font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all inline-flex items-center space-x-2 cursor-pointer"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#002b7a]" />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
