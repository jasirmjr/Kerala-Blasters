import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  ChevronRight,
  Filter,
  Share2,
  Newspaper,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { NewsItem } from '../types';
import { CrestLogo } from './CrestLogo';

interface AllNewsPageProps {
  news: NewsItem[];
  onSelectArticle: (article: NewsItem) => void;
  onBackToHome: () => void;
  onOpenTickets?: () => void;
}

export const AllNewsPage: React.FC<AllNewsPageProps> = ({
  news,
  onSelectArticle,
  onBackToHome,
  onOpenTickets,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'First Team', 'Match Report', 'Academy', 'Transfer', 'Community', 'Club'];

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  const featuredArticle = filteredNews.find((n) => n.featured) || filteredNews[0];
  const regularArticles = filteredNews.filter((n) => n.id !== featuredArticle?.id);

  return (
    <div className="min-h-screen bg-[#0A120D] text-slate-100 flex flex-col selection:bg-kbfc-yellow selection:text-kbfc-dark">
      {/* Top Sticky Bar */}
      <header className="sticky top-0 z-50 bg-[#0E1B12]/95 backdrop-blur-md border-b border-emerald-900/30 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-kbfc-yellow" />
            <span>Back to Home</span>
          </button>

          <div
            onClick={onBackToHome}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <CrestLogo size="sm" />
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-base sm:text-lg tracking-tight text-white group-hover:text-kbfc-yellow transition-colors leading-none">
                KBFC NEWSROOM
              </span>
              <span className="text-[9px] tracking-widest text-emerald-400 font-extrabold uppercase mt-0.5">
                Official Dispatches
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {onOpenTickets && (
              <button
                onClick={onOpenTickets}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-kbfc-yellow to-amber-400 text-kbfc-dark font-black text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Tickets</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Header Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Dispatches & Club Journalism</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                All News &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-kbfc-yellow">Events</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2 leading-relaxed">
                Stay updated with first-team developments, ISL match reports, academy breakthroughs, transfer announcements, and community initiatives from Kerala Blasters FC.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#142318] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0 mr-1" />
            {categories.map((cat) => {
              const count = cat === 'All' ? news.length : news.filter((n) => n.category.toLowerCase() === cat.toLowerCase()).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                      : 'bg-[#142318] hover:bg-[#1C2E20] text-slate-300 border border-white/5'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Story (Hero Layout) */}
        {featuredArticle && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelectArticle(featuredArticle)}
            className="cursor-pointer group rounded-3xl bg-gradient-to-br from-[#16271A] to-[#0E1A11] border border-emerald-900/40 hover:border-emerald-500/40 overflow-hidden shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A11] via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-400 text-slate-950 shadow-lg">
                  {featuredArticle.category} • Featured Dispatch
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-emerald-300/80">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {featuredArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-light">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-xs text-slate-400">{featuredArticle.author}</span>
                <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                  <span>Read Full Story</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular News Grid */}
        {filteredNews.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-[#142318]/50 rounded-3xl border border-white/5">
            <Newspaper className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No dispatches found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn't find any articles matching &ldquo;{searchQuery}&rdquo;. Try searching for something else or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Showing {regularArticles.length + (searchQuery ? 1 : 0)} articles</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery ? filteredNews : regularArticles).map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => onSelectArticle(article)}
                  className="group cursor-pointer rounded-3xl bg-[#142417] border border-emerald-900/30 hover:border-emerald-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[11px] text-emerald-300/70">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-serif font-normal text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-300/80 leading-relaxed font-light line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between border-t border-white/5 text-xs">
                      <span className="text-slate-400 text-[11px]">{article.author}</span>
                      <span className="inline-flex items-center text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">
                        Read Story →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Home CTA */}
        <div className="pt-10 pb-6 text-center border-t border-white/10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Kerala Blasters Home</span>
          </button>
        </div>
      </main>
    </div>
  );
};
