import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsSectionProps {
  news: NewsItem[];
  onSelectArticle: (article: NewsItem) => void;
  onOpenAllNews: () => void;
  onPlayVideo?: () => void;
}

const FALLBACK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80';
const FALLBACK_CARD_IMAGE =
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';

export const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  onSelectArticle,
  onOpenAllNews,
}) => {
  // 1. Featured Lead Story (matches left large card in reference)
  const featuredArticle = news.find((n) => n.featured) || news[0];

  // 2. Six cards for the right-side 2-row grid (total 7 news)
  const sixCards = news
    .filter((n) => n.id !== featuredArticle?.id)
    .slice(0, 6);

  return (
    <section id="news-section" className="relative min-h-screen lg:h-screen lg:max-h-[1080px] flex flex-col justify-center py-6 sm:py-8 lg:py-6 bg-[#FBFBFC] text-slate-900 overflow-hidden select-none">
      {/* Subtle topographic contour watermark lines matching the reference design */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          className="w-full h-full text-slate-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M-100 200 C 300 120, 600 300, 1000 180 C 1300 80, 1500 250, 1600 200" opacity="0.4" />
          <path d="M-100 280 C 250 200, 550 380, 950 260 C 1250 160, 1450 330, 1600 280" opacity="0.35" />
          <path d="M-100 360 C 200 280, 500 460, 900 340 C 1200 240, 1400 410, 1600 360" opacity="0.3" />
          <path d="M-100 440 C 150 360, 450 540, 850 420 C 1150 320, 1350 490, 1600 440" opacity="0.25" />
          <path d="M-100 520 C 100 440, 400 620, 800 500 C 1100 400, 1300 570, 1600 520" opacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 xl:gap-8 items-stretch">

          {/* LEFT COLUMN: HERO FEATURED DOMINATING LARGE CARD (FITS SINGLE SCREEN) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => featuredArticle && onSelectArticle(featuredArticle)}
            className="lg:col-span-5 xl:col-span-5 relative rounded-[28px] sm:rounded-[34px] overflow-hidden group cursor-pointer shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-slate-900 min-h-[460px] lg:min-h-full h-full flex flex-col justify-end transition-all duration-300"
          >
            {/* Background Image - Bright and vividly visible */}
            <img
              src={featuredArticle?.image || FALLBACK_HERO_IMAGE}
              alt={featuredArticle?.title}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_HERO_IMAGE;
              }}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
            />

            {/* Dark Vignette Overlay strictly at the bottom behind text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 via-35% to-transparent to-70% pointer-events-none transition-opacity duration-300 group-hover:opacity-95" />

            {/* Content at Bottom of Featured Card */}
            <div className="relative z-10 p-5 sm:p-7 space-y-3">
              {/* Category Subtitle */}
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-amber-300 uppercase block">
                  FEATURED
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                  {featuredArticle?.title}
                </h3>
              </div>

              {/* 2-line Excerpt */}
              <p className="text-xs text-slate-300/95 line-clamp-2 leading-relaxed font-light">
                {featuredArticle?.excerpt}
              </p>

              {/* Bottom Row: Large Play / Explore Glassmorphism Button + Date */}
              <div className="pt-1.5 flex items-center justify-between">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/60 bg-black/35 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 shadow-xl">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>

                <span className="text-xs text-slate-300 font-medium">
                  {featuredArticle?.date}
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: TOP HEADER & 6 CARDS (2 ROWS OF 3 FITTING SINGLE SCREEN) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-3.5">

            {/* TOP AREA: SIMPLE HEADING AS "NEWS" & SUBTITLE + DISCOVER MORE BUTTON (SAME COLOR AS "NEWS" TEXT #0C2340) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pt-0.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0C2340] tracking-tight leading-none">
                    News
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">
                    Recent happenings around the club
                  </p>
                </div>

                {/* DISCOVER MORE BUTTON: COLORED IN THE SAME COLOR AS THE "NEWS" TEXT (#0C2340) */}
                <div className="flex-shrink-0">
                  <button
                    onClick={onOpenAllNews}
                    className="px-5 py-2 sm:py-2.5 rounded-full bg-[#0C2340] hover:bg-[#16355d] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center space-x-1.5 border border-[#0C2340]"
                  >
                    <span>DISCOVER MORE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* BOTTOM AREA: 6 CARDS IN 2 ROWS (3 PER ROW) FITTING COMPACTLY IN SINGLE SCREEN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4 xl:gap-4.5 pt-0.5">
              {sixCards.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => onSelectArticle(article)}
                  className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer shadow-md hover:shadow-xl bg-slate-900 h-[195px] sm:h-[210px] lg:h-[215px] xl:h-[225px] flex flex-col justify-end transition-all duration-300 hover:-translate-y-1.5 border border-slate-100"
                >
                  {/* Full Bleed Card Preview Image (Clear, Vivid, Unobstructed) */}
                  <img
                    src={article.image || FALLBACK_CARD_IMAGE}
                    alt={article.title}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_CARD_IMAGE;
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Overlay strictly at the bottom behind text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-35% to-transparent to-70% pointer-events-none transition-opacity duration-300 group-hover:opacity-95" />

                  {/* Text Details at Bottom */}
                  <div className="relative z-10 p-3 sm:p-3.5 space-y-1.5">
                    <span className="text-[9px] sm:text-[10px] text-amber-300 font-semibold tracking-wide uppercase block">
                      {article.date}
                    </span>

                    <h4 className="text-xs sm:text-[13px] font-bold text-white leading-snug line-clamp-2 group-hover:text-amber-200 transition-colors">
                      {article.title}
                    </h4>

                    {/* Category & Arrow Button */}
                    <div className="pt-0.5 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium">
                        {article.category}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all group-hover:bg-[#0C2340] group-hover:text-amber-400 group-hover:border-[#0C2340] shadow-sm">
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
