import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Share2, Tag, ChevronRight } from 'lucide-react';
import { NewsItem } from '../../types';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsItem | null;
}

export const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl my-8 bg-kbfc-dark/95 border border-kbfc-yellow/30 rounded-2xl shadow-2xl overflow-hidden glass-panel max-h-[90vh] flex flex-col"
      >
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white bg-black/60 hover:bg-kbfc-yellow hover:text-kbfc-dark rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Story Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Banner */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kbfc-dark via-kbfc-dark/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-kbfc-yellow text-kbfc-dark mb-2">
                {article.category}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white leading-tight">
                {article.title}
              </h1>
            </div>
          </div>

          {/* Metadata bar */}
          <div className="px-6 py-3 bg-black/40 border-y border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-kbfc-yellow" />
                {article.date}
              </span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-kbfc-yellow" />
                {article.readTime}
              </span>
              <span className="text-kbfc-yellow font-medium">By {article.author}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          {/* Story Body */}
          <div className="p-6 md:p-8 space-y-4 text-slate-200 text-sm md:text-base leading-relaxed">
            <p className="font-semibold text-lg text-kbfc-yellow leading-snug">
              {article.excerpt}
            </p>
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-300">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 p-4 rounded-xl bg-kbfc-blue/30 border border-kbfc-yellow/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">Stay Updated with Kerala Blasters</h4>
                <p className="text-xs text-slate-400">Get breaking line-ups, ticket alerts, and match analysis directly.</p>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-kbfc-yellow text-kbfc-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110"
              >
                Back to News
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
