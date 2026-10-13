import React from 'react';

// 1. Stick Figure: Cheering / Success
export const StickFigureCheer: React.FC<{ className?: string }> = ({ className = 'w-16 h-20' }) => (
  <svg viewBox="0 0 100 120" className={className} fill="none" stroke="#0000CD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Head */}
    <circle cx="50" cy="25" r="14" strokeWidth="2.5" />
    {/* Face: eyes and smile */}
    <circle cx="45" cy="22" r="1.5" fill="#0000CD" />
    <circle cx="55" cy="22" r="1.5" fill="#0000CD" />
    <path d="M44 28 Q50 34 56 28" strokeWidth="2" />
    {/* Body */}
    <line x1="50" y1="39" x2="50" y2="75" strokeWidth="2.5" />
    {/* Arms: cheering up */}
    <path d="M50 48 L25 25 L15 32" strokeWidth="2.5" />
    <path d="M50 48 L75 25 L85 32" strokeWidth="2.5" />
    {/* Legs: jumping */}
    <path d="M50 75 L30 105 L22 102" strokeWidth="2.5" />
    <path d="M50 75 L70 105 L78 102" strokeWidth="2.5" />
  </svg>
);

// 2. Stick Figure: Thinking / Detective
export const StickFigureThinking: React.FC<{ className?: string }> = ({ className = 'w-16 h-20' }) => (
  <svg viewBox="0 0 100 120" className={className} fill="none" stroke="#0000CD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Head */}
    <circle cx="45" cy="25" r="14" strokeWidth="2.5" />
    {/* Face */}
    <circle cx="40" cy="23" r="1.5" fill="#0000CD" />
    <circle cx="50" cy="23" r="1.5" fill="#0000CD" />
    <line x1="40" y1="30" x2="48" y2="30" strokeWidth="2" />
    {/* Body */}
    <line x1="45" y1="39" x2="45" y2="78" strokeWidth="2.5" />
    {/* Arm touching chin */}
    <path d="M45 52 L30 65 L44 38" strokeWidth="2.5" />
    {/* Arm on hip */}
    <path d="M45 52 L62 64 L50 72" strokeWidth="2.5" />
    {/* Legs */}
    <line x1="45" y1="78" x2="32" y2="110" strokeWidth="2.5" />
    <line x1="45" y1="78" x2="58" y2="110" strokeWidth="2.5" />
    {/* Question mark above head */}
    <path d="M68 12 Q74 5 80 12 Q80 18 73 20 L73 24" stroke="#FF0000" strokeWidth="2.5" />
    <circle cx="73" cy="29" r="1.5" fill="#FF0000" stroke="none" />
  </svg>
);

// 3. Stick Figure: Running / Escaping
export const StickFigureRunning: React.FC<{ className?: string }> = ({ className = 'w-16 h-20' }) => (
  <svg viewBox="0 0 100 120" className={className} fill="none" stroke="#0000CD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="60" cy="22" r="13" strokeWidth="2.5" />
    <line x1="56" y1="35" x2="40" y2="70" strokeWidth="2.5" />
    {/* Pumping arms */}
    <path d="M52 46 L30 40 L22 52" strokeWidth="2.5" />
    <path d="M52 46 L70 56 L85 50" strokeWidth="2.5" />
    {/* Running legs */}
    <path d="M40 70 L20 85 L10 102" strokeWidth="2.5" />
    <path d="M40 70 L65 80 L75 105" strokeWidth="2.5" />
    {/* Motion speed lines */}
    <line x1="8" y1="38" x2="2" y2="38" stroke="#0000CD" strokeWidth="1.5" />
    <line x1="12" y1="46" x2="4" y2="46" stroke="#0000CD" strokeWidth="1.5" />
  </svg>
);

// 4. Coffee Ring Stain (리얼한 머그잔 커피 얼룩)
export const CoffeeRingStain: React.FC<{ className?: string }> = ({ className = 'w-28 h-28' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#B45309"
      strokeWidth="4"
      strokeDasharray="6 2 8 3 4 1"
      strokeOpacity="0.22"
    />
    <circle
      cx="50"
      cy="50"
      r="38.5"
      stroke="#92400E"
      strokeWidth="1.8"
      strokeOpacity="0.15"
    />
    {/* Coffee drops / drips */}
    <ellipse cx="68" cy="85" rx="3" ry="2" fill="#B45309" fillOpacity="0.18" />
    <ellipse cx="28" cy="20" rx="2" ry="3" fill="#B45309" fillOpacity="0.15" />
    <ellipse cx="82" cy="42" rx="2.5" ry="2.5" fill="#B45309" fillOpacity="0.2" />
  </svg>
);

// 5. Doodle Star (손으로 그린 별)
export const DoodleStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#FF0000',
}) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M25 5 L30 18 L44 19 L33 29 L37 43 L25 35 L13 43 L17 29 L6 19 L20 18 Z" />
  </svg>
);

// 6. Doodle Arrow (손그림 지그재그 화살표)
export const DoodleArrow: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-12 h-8',
  color = '#0000CD',
}) => (
  <svg viewBox="0 0 80 40" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22 Q25 8 50 18 T72 20" />
    <polyline points="60,10 74,20 62,30" />
  </svg>
);

// 7. Lightbulb / Hint Doodle (전구 힌트)
export const DoodleLightbulb: React.FC<{ className?: string }> = ({ className = 'w-8 h-10' }) => (
  <svg viewBox="0 0 50 60" className={className} fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Bulb outline */}
    <path d="M15 30 C10 24 10 14 18 8 C25 2 35 4 39 12 C43 20 38 26 35 30 L35 38 L15 38 Z" fill="#FEF3C7" />
    {/* Filament */}
    <path d="M22 28 L22 18 L28 18 L28 28" stroke="#D97706" strokeWidth="1.5" />
    {/* Base */}
    <line x1="18" y1="42" x2="32" y2="42" />
    <line x1="20" y1="46" x2="30" y2="46" />
    {/* Glow rays */}
    <line x1="25" y1="1" x2="25" y2="5" />
    <line x1="7" y1="12" x2="3" y2="10" />
    <line x1="43" y1="12" x2="47" y2="10" />
  </svg>
);

// 8. Scotch Tape Strip (마스킹 테이프 장식)
export const TapeStrip: React.FC<{ className?: string }> = ({ className = 'w-20 h-6' }) => (
  <div
    className={`bg-amber-100/70 border-t border-b border-amber-300/60 shadow-sm transform -rotate-3 backdrop-blur-[1px] ${className}`}
    style={{
      clipPath: 'polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)',
    }}
  />
);

// 9. Paper Clip (클립)
export const DoodlePaperClip: React.FC<{ className?: string }> = ({ className = 'w-6 h-12' }) => (
  <svg viewBox="0 0 30 60" className={className} fill="none" stroke="#4A5568" strokeWidth="2.5" strokeLinecap="round">
    <path d="M10 20 L10 45 C10 52 24 52 24 45 L24 15 C24 6 6 6 6 15 L6 48 C6 58 28 58 28 48 L28 25" />
  </svg>
);
