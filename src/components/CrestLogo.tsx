import React from 'react';

interface CrestLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({ size = 'md', animated = true }) => {
  const dimensions = {
    sm: 'w-9 h-11',
    md: 'w-11 h-14',
    lg: 'w-16 h-20',
  }[size];

  return (
    <div className={`relative flex items-center justify-center ${dimensions} group cursor-pointer select-none`}>
      {/* Background radial glow */}
      {animated && (
        <div className="absolute inset-0 bg-kbfc-yellow/30 rounded-full blur-xl group-hover:bg-kbfc-yellow/60 group-hover:blur-2xl transition-all duration-500 scale-90 group-hover:scale-125" />
      )}

      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_4px_12px_rgba(255,209,0,0.35)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="crestGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="45%" stopColor="#FFD100" />
            <stop offset="100%" stopColor="#D99B00" />
          </linearGradient>
          <linearGradient id="shieldNavyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0E2A4F" />
            <stop offset="50%" stopColor="#08182B" />
            <stop offset="100%" stopColor="#040D18" />
          </linearGradient>
          <filter id="goldenGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FFD100" floodOpacity="0.6"/>
          </filter>
        </defs>

        {/* Shield Base */}
        <path
          d="M10 18 C10 10 22 4 50 4 C78 4 90 10 90 18 C90 74 68 102 50 114 C32 102 10 74 10 18 Z"
          fill="url(#shieldNavyGradient)"
          stroke="url(#crestGoldGradient)"
          strokeWidth="4"
        />

        {/* Inner Gold Border */}
        <path
          d="M16 22 C16 16 26 10 50 10 C74 10 84 16 84 22 C84 70 65 96 50 107 C35 96 16 70 16 22 Z"
          stroke="#FFD100"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Elephant Head Silhouette */}
        <path
          d="M50 24 C40 24 33 30 31 40 C29 48 33 54 37 57 C39 50 44 46 50 46 C56 46 61 50 63 57 C67 54 71 48 69 40 C67 30 60 24 50 24 Z"
          fill="url(#crestGoldGradient)"
        />

        {/* Curved Elephant Trunk */}
        <path
          d="M47 48 C47 58 45 68 40 76 C39 78 41 80 43 79 C48 76 53 68 53 52 Z"
          fill="url(#crestGoldGradient)"
        />

        {/* Sharp White Tusks */}
        <path d="M37 57 C33 63 28 73 34 81 C36 76 38 68 40 60 Z" fill="#FFFFFF" />
        <path d="M63 57 C67 63 72 73 66 81 C64 76 62 68 60 60 Z" fill="#FFFFFF" />

        {/* Football At Base */}
        <circle cx="50" cy="85" r="11" fill="#FFD100" stroke="#08182B" strokeWidth="2.5" />
        <polygon points="50,78 56,82 54,89 46,89 44,82" fill="#08182B" />

        {/* Ribbon Banner Top */}
        <rect x="25" y="16" width="50" height="11" rx="3" fill="#FFD100" />
        <text
          x="50"
          y="24.5"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="900"
          fontSize="7.5"
          fill="#08182B"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          KERALA
        </text>

        {/* Sub text */}
        <text
          x="50"
          y="103"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="800"
          fontSize="6"
          fill="#FFD100"
          textAnchor="middle"
          letterSpacing="1.2"
          opacity="0.9"
        >
          BLASTERS
        </text>
      </svg>
    </div>
  );
};
