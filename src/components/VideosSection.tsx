import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight, X } from 'lucide-react';
import { VideoItem } from '../types';

interface VideosSectionProps {
  videos?: VideoItem[];
  onPlayVideo?: (video: VideoItem) => void;
}

// 3 Curated Official Kerala Blasters YouTube Channel Videos
const FEATURED_KBFC_VIDEOS: (VideoItem & { shortTitle: string; tag: string })[] = [
  {
    id: 'vid-1',
    title: 'The Yellow Wave Podcast E02 | Ft Adrian Luna | Kerala Blasters',
    shortTitle: 'ADRIÁN LUNA',
    tag: 'THE YELLOW WAVE',
    category: 'The Yellow Wave',
    duration: '24:43',
    youtubeId: 'pcZdz_H7C7c',
    thumbnail: 'https://img.youtube.com/vi/pcZdz_H7C7c/maxresdefault.jpg',
    views: '120K views',
    date: 'Official Podcast',
    description:
      'In-depth conversation with captain Adrián Luna on leadership, tactical growth, and the Manjappada faithful.',
  },
  {
    id: 'vid-2',
    title: 'The Yellow Wave | S02 EP02 | Ft. Ivan Vukomanović | Kerala Blasters FC',
    shortTitle: 'IVAN VUKOMANOVIĆ',
    tag: 'CLUB EXCLUSIVE',
    category: 'Club Exclusive',
    duration: '28:15',
    youtubeId: 'br3IpPiEEt0',
    thumbnail: 'https://img.youtube.com/vi/br3IpPiEEt0/maxresdefault.jpg',
    views: '185K views',
    date: 'Official Interview',
    description:
      'Special sit-down episode with former head coach Ivan Vukomanović discussing his tactical philosophy and love for Kerala.',
  },
  {
    id: 'vid-3',
    title: 'The Yellow Wave Podcast E01 | Ft Noah Sadaoui | Kerala Blasters',
    shortTitle: 'NOAH SADAOUI',
    tag: 'EPISODE 01',
    category: 'The Yellow Wave',
    duration: '26:10',
    youtubeId: 'HcCnuIqIkBo',
    thumbnail: 'https://img.youtube.com/vi/HcCnuIqIkBo/maxresdefault.jpg',
    views: '240K views',
    date: 'Official Podcast',
    description:
      'Moroccan maestro Noah Sadaoui discusses his football journey, flair on the pitch, and the roar of the Kaloor fortress.',
  },
];

export const VideosSection: React.FC<VideosSectionProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Guaranteed official 3-card Kerala Blasters YouTube lineup
  const displayVideos = FEATURED_KBFC_VIDEOS;

  const handleCardClick = (idx: number, video: VideoItem) => {
    setActiveIndex(idx);
    setPlayingVideoId(video.youtubeId);
  };

  const handleStopPlaying = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingVideoId(null);
  };

  return (
    <section
      id="featured-videos-section"
      className="py-14 sm:py-18 lg:py-20 bg-white text-slate-900 relative select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Animated Coming in from the Left each time in view */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-8 text-left"
        >
          <h2
            style={{
              fontFamily: "'Avenir Arabic', 'Avenir Next', 'Inter', system-ui, sans-serif",
              fontWeight: 800,
            }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#002b7a] tracking-tight leading-tight"
          >
            Featured Videos
          </h2>
          <p className="mt-2 text-sm sm:text-base lg:text-lg text-slate-600 font-normal">
            Hover to expand and explore exclusive insights from our latest videos
          </p>
        </motion.div>

        {/* 3 Expanding Cards Row - Animated Coming from Left Side */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6 items-stretch w-full min-h-[440px] sm:min-h-[480px] lg:h-[480px] xl:h-[500px]">
          {displayVideos.map((video, idx) => {
            const isActive = activeIndex === idx;
            const isPlaying = playingVideoId === video.youtubeId && isActive;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -90 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => {
                  setActiveIndex(idx);
                }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  }
                }}
                className={`group relative rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-[flex,width] duration-500 ease-out bg-slate-950 flex flex-col justify-between ${
                  isActive
                    ? 'lg:flex-[2.8] xl:flex-[3] min-h-[340px] lg:min-h-0'
                    : 'lg:flex-[0.9] xl:flex-1 min-h-[140px] lg:min-h-0'
                }`}
              >
                {/* Background Image / Official YouTube Thumbnail */}
                {!isPlaying && (
                  <>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('maxresdefault')) {
                          target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Vignette Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-colors duration-500 ${
                        isActive
                          ? 'bg-gradient-to-t from-black/95 via-black/45 to-black/30'
                          : 'bg-gradient-to-t from-black/95 via-black/55 to-black/40 group-hover:via-black/45'
                      }`}
                    />
                  </>
                )}

                {/* If Playing: Render Interactive YouTube Embed */}
                {isPlaying ? (
                  <div className="relative w-full h-full min-h-[320px] lg:min-h-0 bg-black flex-1">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&enablejsapi=1`}
                      title={video.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    {/* Stop Playing Button */}
                    <button
                      onClick={handleStopPlaying}
                      title="Close video"
                      className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    {/* ==================================================== */}
                    {/* Top Bar: YouTube Red Circle / Translucent Play Badge */}
                    {/* ==================================================== */}
                    <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                      {isActive ? (
                        // Expanded state: Red YouTube circular badge
                        <a
                          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Open on YouTube"
                          className="w-10 h-10 rounded-full bg-[#FF0000] hover:bg-[#cc0000] text-white flex items-center justify-center shadow-lg shadow-red-950/40 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </a>
                      ) : (
                        // Collapsed state: Small translucent play icon badge
                        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:border-white/50 group-hover:scale-105 transition-all">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      )}

                      {/* Duration Tag on Top Right */}
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white/80 text-[10px] sm:text-xs font-semibold">
                        {video.duration}
                      </span>
                    </div>

                    {/* ==================================================== */}
                    {/* Center Area: Big Play Button & Watermark             */}
                    {/* ==================================================== */}
                    <div
                      onClick={() => handleCardClick(idx, video)}
                      className="relative z-10 flex-1 flex flex-col items-center justify-center px-4"
                    >
                      {isActive ? (
                        <div className="flex flex-col items-center">
                          {/* Large Center Watermark Text (like BRAND GROWTH in reference) */}
                          <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white/10 tracking-widest uppercase select-none pointer-events-none mb-3 text-center">
                            THE YELLOW WAVE
                          </div>

                          {/* Center Golden Play Button */}
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-kbfc-yellow text-[#002b7a] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                            <Play className="w-6 h-6 fill-[#002b7a] ml-1" />
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* ==================================================== */}
                    {/* Bottom Area: Typography & Action Button              */}
                    {/* ==================================================== */}
                    <div className="relative z-10 p-4 sm:p-5 lg:p-6 w-full">
                      {isActive ? (
                        // Expanded Card Bottom Content
                        <div className="flex items-end justify-between gap-4 transition-opacity duration-300">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-kbfc-yellow mb-1">
                              {video.tag}
                            </p>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight drop-shadow-md line-clamp-2">
                              {video.title}
                            </h3>
                            <p className="hidden sm:block text-xs sm:text-sm text-white/75 mt-1.5 line-clamp-2 max-w-xl">
                              {video.description}
                            </p>
                          </div>

                          {/* Circular Arrow Button (linking directly to YouTube) */}
                          <a
                            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Watch full video on YouTube"
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                          >
                            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </a>
                        </div>
                      ) : (
                        // Collapsed Card Bottom Content (clean bold uppercase label)
                        <div className="transition-opacity duration-300">
                          <p className="text-[10px] font-bold tracking-widest text-kbfc-yellow uppercase mb-0.5 truncate">
                            {video.tag}
                          </p>
                          <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-wider truncate drop-shadow-md">
                            {video.shortTitle}
                          </h4>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
