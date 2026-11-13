import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CinematicVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee immediate autoplay on mount and when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Both muted & defaultMuted are required by modern browsers for zero-click autoplay
    video.defaultMuted = true;
    video.muted = true;

    video.play().catch((err) => {
      console.warn('Video autoplay prevented:', err);
    });

    // Auto play/pause when entering/leaving viewport to conserve GPU & battery
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cinematic-video-section"
      ref={containerRef}
      className="relative w-full h-screen min-h-[500px] lg:h-screen lg:max-h-[1080px] bg-black text-white overflow-hidden flex items-center justify-center select-none"
    >
      {/* Full-Screen GIF-Model Loop Video */}
      <video
        ref={videoRef}
        src="/1113.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Subtle Cinematic Vignette Overlays for Depth and Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none z-10" />

      {/* Dead-Center Aligned Heading (Both Horizontally and Vertically Centered) */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none mx-auto max-w-5xl"
      >
        <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-[0.28em] uppercase text-amber-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-1 sm:mb-2">
          Passion Unleashed
        </span>
        <h2
          style={{
            fontFamily: "'Avenir Arabic', 'Avenir Next', 'Inter', system-ui, sans-serif",
            fontWeight: 800,
          }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
        >
          The Yellow Brigade
        </h2>
      </motion.div>
    </section>
  );
};
