import React from 'react';
import { motion } from 'framer-motion';
import { X, Play, Clock, Eye } from 'lucide-react';
import { VideoItem } from '../../types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoItem | null;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, video }) => {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-kbfc-dark border border-kbfc-yellow/30 rounded-2xl shadow-2xl overflow-hidden glass-panel"
      >
        <div className="relative p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-kbfc-yellow">
              {video.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex items-center space-x-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center">
              <Eye className="w-3.5 h-3.5 mr-1 text-kbfc-yellow" />
              {video.views}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-kbfc-yellow" />
              {video.duration}
            </span>
            <span>•</span>
            <span>{video.date}</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold font-display text-white mb-2">
            {video.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {video.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
