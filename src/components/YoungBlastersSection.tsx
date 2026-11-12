import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface YoungBlastersSectionProps {
  onLearnMore: () => void;
}

export const YoungBlastersSection: React.FC<YoungBlastersSectionProps> = ({ onLearnMore }) => {
  return (
    <section
      id="young-blasters-section"
      className="py-14 sm:py-18 lg:py-20 bg-white text-slate-900 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-5 sm:space-y-6 text-left"
          >
            <h2
              style={{
                fontFamily: "'Avenir Arabic', 'Avenir Next', 'Inter', system-ui, sans-serif",
                fontWeight: 800,
              }}
              className="text-3xl sm:text-4xl md:text-5xl text-[#002b7a] tracking-tight leading-tight text-left"
            >
              Young Blasters Sporthood Academy
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Our exclusive grassroots program, tailored for children aged 5 to 18, is designed to nurture budding football talent at every stage of their development. In partnership with Sporthood, this initiative offers personalized coaching, skill-building sessions, and a vibrant community atmosphere. With a focus on holistic development, we’re committed to fostering talent, teamwork, and a passion for the game.
            </p>

            {/* "Learn More" CTA Button */}
            <div className="pt-1">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onLearnMore}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-kbfc-yellow via-amber-400 to-kbfc-gold text-[#002b7a] font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all inline-flex items-center space-x-2 cursor-pointer"
              >
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Imagery Showcase (Two Images Side-by-Side) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 items-center">
              {/* Image 1: Tactical Youth Coaching */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80"
                  alt="Young Blasters Coaching Session"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Image 2: Grassroots Match & Training Action */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group sm:translate-y-4">
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
                  alt="Young Blasters Football Training Drills"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
