import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle,
  Shield,
  Heart,
  ChevronRight,
  ExternalLink,
  Globe,
  Share2,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { SplitHeading, SlideIn } from './ScrollMotion';
import { subscribeNewsletterApi } from '../services/api';

interface BannerAndFooterProps {
  onOpenTickets: () => void;
  onOpenClub: () => void;
  onOpenHouseOfKbfc: () => void;
  onOpenFanAdvisory: () => void;
  onOpenKidsClub: () => void;
}

const SPONSORS = [
  { name: 'Reyaur Sports', role: 'Official Kit Manufacturer', icon: '⚡' },
  { name: 'Medimix', role: 'Official Co-Sponsor', icon: '🌿' },
  { name: 'Kalliyath TMT', role: 'Official Strength Partner', icon: '🏗️' },
  { name: 'BYJU’S Legacy', role: 'Grassroots Development', icon: '📚' },
  { name: 'Aster Medcity', role: 'Official Medical Partner', icon: '🏥' },
  { name: 'RedFM 93.5', role: 'Official Radio Partner', icon: '📻' },
];

export const BannerAndFooter: React.FC<BannerAndFooterProps> = ({
  onOpenTickets,
  onOpenClub,
  onOpenHouseOfKbfc,
  onOpenFanAdvisory,
  onOpenKidsClub,
}) => {
  const [email, setEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      await subscribeNewsletterApi(email);
      setNewsletterSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 1. Full-Height High-Impact Club Banner Section */}
      <section className="relative py-28 md:py-36 bg-gradient-to-r from-[#0a1d36] via-[#051120] to-[#0a1d36] border-y-2 border-kbfc-yellow/30 overflow-hidden">
        {/* Background Image / Crowd & Squad Celebration */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=2000&q=80"
            alt="Kerala Blasters Stadium Roar"
            className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kbfc-dark via-transparent to-kbfc-dark/80" />
          <div className="absolute inset-0 bg-radial-gradient from-kbfc-yellow/10 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SlideIn from="bottom" distance={60}>
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-kbfc-yellow/20 border border-kbfc-yellow/40 backdrop-blur-md">
            <span className="text-xl">🐘</span>
            <span className="text-xs font-black uppercase tracking-widest text-kbfc-yellow">
              THE PRIDE OF GOD'S OWN COUNTRY
            </span>
          </div>
          </SlideIn>

          <SplitHeading
            align="center"
            first="WE ARE KERALA,"
            second={
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kbfc-yellow via-amber-300 to-kbfc-gold text-glow-yellow">
                WE ARE YELLOW.
              </span>
            }
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase text-white tracking-tight leading-[0.95]"
          />

          <SlideIn from="bottom" distance={70} lag={1}>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            35 Million Malayalis. One shared heartbeat. Join us in Kochi this weekend as we defend the Kaloor fortress.
          </p>
          </SlideIn>

          <SlideIn from="bottom" distance={70} lag={2} className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenTickets}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-kbfc-yellow via-amber-400 to-kbfc-gold text-kbfc-dark font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-kbfc-yellow/40 hover:brightness-110 flex items-center space-x-2"
            >
              <span>Secure Matchday Tickets</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-colors"
            >
              Official Team Shop
            </motion.button>
          </SlideIn>
        </div>
      </section>

      {/* 2. Sponsor Roll */}
      <div className="bg-black/60 border-b border-white/10 py-8 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
            Official Club Partners & Sponsors
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            {SPONSORS.map((s, idx) => (
              <SlideIn
                key={idx}
                from={idx < 3 ? 'left' : 'right'}
                distance={idx < 3 ? 60 + (2 - idx) * 50 : 60 + (idx - 3) * 50}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-kbfc-yellow/30 w-full transition-all group"
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{s.icon}</span>
                <span className="font-bold text-white text-xs text-center">{s.name}</span>
                <span className="text-[9px] text-slate-400 text-center">{s.role}</span>
              </SlideIn>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Rich Multi-Column Footer */}
      <footer className="bg-gradient-to-b from-kbfc-dark via-[#040c17] to-black pt-16 pb-12 border-t border-white/10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Column 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center space-x-3">
                <CrestLogo size="md" />
                <div>
                  <h3 className="font-display font-black text-xl text-white tracking-tight leading-none">
                    KERALA BLASTERS FC
                  </h3>
                  <span className="text-[10px] text-kbfc-yellow font-extrabold uppercase tracking-widest block mt-1">
                    Official Digital Portal
                  </span>
                </div>
              </div>
              <p className="leading-relaxed text-slate-400 text-xs">
                Founded in 2014, Kerala Blasters Football Club is Kerala's flagship sports institution and three-time Indian Super League finalists. Home ground: Jawaharlal Nehru Stadium, Kaloor, Kochi.
              </p>
              {/* Social Links */}
              <div className="flex items-center space-x-2 pt-2">
                {[
                  {
                    name: 'Instagram',
                    href: 'https://instagram.com/keralablasters',
                    svg: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    ),
                  },
                  {
                    name: 'YouTube',
                    href: 'https://youtube.com/@KeralaBlastersFC',
                    svg: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ),
                  },
                  {
                    name: 'X',
                    href: 'https://x.com/KeralaBlasters',
                    svg: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                  },
                  {
                    name: 'Facebook',
                    href: 'https://facebook.com/keralablasters',
                    svg: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                      </svg>
                    ),
                  },
                ].map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.name}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-kbfc-yellow hover:text-kbfc-dark border border-white/10 text-slate-300 transition-colors"
                  >
                    {soc.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                Club & Football
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={onOpenClub} className="hover:text-kbfc-yellow transition-colors">
                    First Team Squad
                  </button>
                </li>
                <li>
                  <button onClick={onOpenClub} className="hover:text-kbfc-yellow transition-colors">
                    Club History & Trophies
                  </button>
                </li>
                <li>
                  <a href="#news-section" className="hover:text-kbfc-yellow transition-colors">
                    Match Reports
                  </a>
                </li>
                <li>
                  <button onClick={onOpenTickets} className="hover:text-kbfc-yellow transition-colors">
                    Matchday Tickets
                  </button>
                </li>
                <li>
                  <a href="#shop-section" className="hover:text-kbfc-yellow transition-colors">
                    2025/26 Kits
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Community & Academy */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                Community & Fans
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={onOpenHouseOfKbfc} className="hover:text-kbfc-yellow transition-colors">
                    House of KBFC Hub
                  </button>
                </li>
                <li>
                  <button onClick={onOpenFanAdvisory} className="hover:text-kbfc-yellow transition-colors">
                    Fan Advisory Board (FAB)
                  </button>
                </li>
                <li>
                  <button onClick={onOpenKidsClub} className="hover:text-kbfc-yellow transition-colors">
                    KBFC Kids Club (KBFCLSI)
                  </button>
                </li>
                <li>
                  <button onClick={onOpenClub} className="hover:text-kbfc-yellow transition-colors">
                    The Yellow Heart Initiative
                  </button>
                </li>
                <li>
                  <button onClick={onOpenClub} className="hover:text-kbfc-yellow transition-colors">
                    Young Blasters Academy
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter Subscription */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                Yellow Army Newsletter
              </h4>
              <p className="text-xs text-slate-400">
                Receive starting lineups, exclusive ticket access, and 10% off your first shop order.
              </p>

              {!newsletterSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs focus:border-kbfc-yellow outline-none pr-10"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-kbfc-yellow text-kbfc-dark flex items-center justify-center hover:brightness-110 transition-all"
                    >
                      {loading ? (
                        <div className="w-3.5 h-3.5 border-2 border-kbfc-dark border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-[11px]">Welcome to the Manjappada family!</span>
                </div>
              )}
            </div>
          </div>

          {/* Copyright & Legal Disclaimers */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>
              © {new Date().getFullYear()} Kerala Blasters Football Club. All Rights Reserved. Yennum Yellow.
            </p>
            <div className="flex flex-wrap space-x-4">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Ticketing Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Cookie Preferences</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
