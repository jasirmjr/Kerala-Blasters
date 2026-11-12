import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Ticket, Volume2, VolumeX, Menu, X, ChevronRight } from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useCart } from '../context/CartContext';
import { useStadiumAudio } from '../context/AudioContext';

interface NavbarProps {
  onOpenTickets: () => void;
  onOpenClub: () => void;
  onOpenHouseOfKbfc: () => void;
  onOpenFanAdvisory: () => void;
  onOpenKidsClub: () => void;
  onOpenAllNews?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTickets,
  onOpenClub,
  onOpenHouseOfKbfc,
  onOpenFanAdvisory,
  onOpenKidsClub,
  onOpenAllNews,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { isPlaying, toggleAudio } = useStadiumAudio();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Landing Page Only Top Navigation Bar (Not fixed across other sections) */}
      <header className="absolute top-0 inset-x-0 z-40 w-full bg-kbfc-dark/80 backdrop-blur-md border-b border-white/10 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <div
              onClick={() => scrollToSection('top')}
              className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
            >
              <CrestLogo size="sm" />
              <div className="flex flex-col">
                <span className="font-display font-black text-base sm:text-lg tracking-tight text-white group-hover:text-kbfc-yellow transition-colors leading-none">
                  KERALA BLASTERS
                </span>
                <span className="text-[9px] tracking-widest text-kbfc-yellow font-extrabold uppercase mt-0.5 opacity-90">
                  #SwanthamNadu
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <button
                onClick={() => scrollToSection('top')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-kbfc-yellow hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                Home
              </button>
              <button
                onClick={onOpenClub}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-kbfc-yellow hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                Club
              </button>
              <button
                onClick={() => {
                  if (onOpenAllNews) {
                    onOpenAllNews();
                  } else {
                    scrollToSection('news-section');
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-kbfc-yellow hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                News
              </button>
              <button
                onClick={onOpenTickets}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-kbfc-yellow hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                Tickets
              </button>
              <button
                onClick={onOpenHouseOfKbfc}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-kbfc-yellow hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                House of KBFC
              </button>
              <button
                onClick={onOpenFanAdvisory}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-kbfc-yellow hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                FAB
              </button>
              <button
                onClick={onOpenKidsClub}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-kbfc-yellow hover:bg-kbfc-yellow/10 transition-colors uppercase tracking-wider flex items-center space-x-1"
              >
                <span>Kids Club</span>
                <span className="text-[8px] px-1 py-0.2 rounded bg-kbfc-yellow text-kbfc-dark font-black">LSI</span>
              </button>
            </nav>

            {/* Actions: Audio Chant Toggle + Cart + Book Tickets CTA */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Stadium Chant Audio Ambient Toggle */}
              <button
                onClick={toggleAudio}
                title={isPlaying ? 'Mute Stadium Atmosphere' : 'Play Manjappada Stadium Chant'}
                className={`relative p-2 rounded-xl border transition-all flex items-center space-x-1.5 ${
                  isPlaying
                    ? 'bg-kbfc-yellow/20 border-kbfc-yellow text-kbfc-yellow box-glow-yellow'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span className="hidden xl:inline-flex space-x-0.5 items-end h-2.5">
                      <span className="w-0.5 h-2.5 bg-kbfc-yellow rounded-full animate-bounce" />
                      <span className="w-0.5 h-1.5 bg-kbfc-yellow rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-0.5 h-3 bg-kbfc-yellow rounded-full animate-bounce [animation-delay:0.3s]" />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span className="hidden xl:inline text-[10px] font-semibold">Chant</span>
                  </>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:border-kbfc-yellow/40"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 text-slate-200" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-kbfc-yellow text-kbfc-dark text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Matchday Ticket CTA Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenTickets}
                className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-kbfc-yellow via-amber-400 to-kbfc-gold text-kbfc-dark font-display font-black text-xs uppercase tracking-wider shadow-md shadow-kbfc-yellow/20 flex items-center space-x-1.5"
              >
                <Ticket className="w-3.5 h-3.5 animate-pulse" />
                <span>Tickets</span>
              </motion.button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation (Positioned directly under header) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full inset-x-0 z-50 bg-kbfc-dark/95 backdrop-blur-xl border-b border-kbfc-yellow/30 px-6 py-5 lg:hidden glass-panel space-y-2 shadow-2xl"
            >
              <div className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('top')}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-kbfc-yellow/20 hover:text-kbfc-yellow"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClub();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-kbfc-yellow/20 hover:text-kbfc-yellow"
              >
                <span>Club & Squad</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAllNews) {
                    onOpenAllNews();
                  } else {
                    scrollToSection('news-section');
                  }
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-kbfc-yellow/20 hover:text-kbfc-yellow"
              >
                <span>Latest News</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTickets();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-kbfc-yellow/15 border border-kbfc-yellow/30 text-kbfc-yellow font-bold text-sm"
              >
                <span>Matchday Tickets</span>
                <Ticket className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHouseOfKbfc();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-kbfc-yellow/20 hover:text-kbfc-yellow"
              >
                <span>House of KBFC</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFanAdvisory();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-kbfc-yellow/20 hover:text-kbfc-yellow"
              >
                <span>Fan Advisory Board</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenKidsClub();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/20 text-kbfc-yellow font-bold text-sm border border-kbfc-yellow/30"
              >
                <span>KBFC Kids Club (KBFCLSI)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-kbfc-yellow text-kbfc-dark font-black">JUNIOR</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
};
