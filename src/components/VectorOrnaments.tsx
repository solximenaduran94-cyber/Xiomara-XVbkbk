import React from 'react';

/**
 * Ornamental Floral Blossom for gala invitations
 * (Flowers & Butterflies theme)
 */
export const OrnamentalFlower: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className = '', size = 28, glow = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${glow ? 'glow-filter' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`flower-grad-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="var(--color-metal-light)" />
          <stop offset="70%" stopColor="var(--color-resplandor-glow)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-metal-dark)" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id={`flower-glow-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-resplandor-glow)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Gentle floral ambient halo */}
      <circle cx="50" cy="50" r="44" fill={`url(#flower-glow-${size})`} opacity="0.5" />

      {/* 6 Elegant Curving Petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 50 C40 33 36 15 50 8 C64 15 60 33 50 50 Z"
            fill={`url(#flower-grad-${size})`}
            stroke="var(--color-metal-light)"
            strokeWidth="0.9"
            opacity="0.95"
          />
          {/* Petal Inner Vein */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            stroke="var(--color-metal-light)"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      ))}

      {/* Center Pistil & Botanical Stamens */}
      {[30, 90, 150, 210, 270, 330].map((angle, idx) => (
        <circle
          key={`stamen-${idx}`}
          cx={50 + 10 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 10 * Math.sin((angle * Math.PI) / 180)}
          r="1.8"
          fill="var(--color-metal-light)"
          opacity="0.9"
        />
      ))}

      {/* Radiant Floral Heart */}
      <circle
        cx="50"
        cy="50"
        r="6.5"
        fill="#ffffff"
        stroke="var(--color-resplandor-glow)"
        strokeWidth="1.2"
      />
      <circle cx="50" cy="50" r="3" fill="var(--color-resplandor-glow)" />
    </svg>
  );
};

// Safe alias replacing old star references with floral ornament
export const Star8Point = OrnamentalFlower;

/**
 * Filigree Regal Butterfly with glowing wings and antennae
 */
export const OrnamentalButterfly: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className = '', size = 32, glow = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${glow ? 'glow-filter' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="butterfly-wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="var(--color-metal-acento)" />
          <stop offset="70%" stopColor="var(--color-resplandor-glow)" />
          <stop offset="100%" stopColor="var(--color-acento-secundario)" />
        </linearGradient>
      </defs>

      {/* Butterfly Head & Slender Body */}
      <circle cx="50" cy="27" r="3" fill="var(--color-metal-light)" />
      <path
        d="M48.8 31 C49.2 31 50.8 31 51.2 31 C52 38 52 52 51 68 C50.5 73 49.5 73 49 68 C48 52 48 38 48.8 31 Z"
        fill="var(--color-metal-acento)"
      />

      {/* Antennae with delicate pearls at the tips */}
      <path
        d="M48.5 24 C44 17 38 14 34 15"
        stroke="var(--color-metal-light)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="34" cy="15" r="1.5" fill="#ffffff" />

      <path
        d="M51.5 24 C56 17 62 14 66 15"
        stroke="var(--color-metal-light)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="66" cy="15" r="1.5" fill="#ffffff" />

      {/* Left Upper Wing */}
      <path
        d="M48 33 C40 22 24 16 12 25 C3 32 4 48 16 54 C26 59 40 50 48 42 Z"
        fill="url(#butterfly-wing-grad)"
        fillOpacity="0.8"
        stroke="var(--color-metal-light)"
        strokeWidth="1"
      />
      {/* Left Wing Lace Filigree */}
      <path
        d="M46 36 C38 28 26 24 18 30 C12 34 14 44 22 47 C30 50 40 45 46 41"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.85"
        fill="none"
      />
      <circle cx="20" cy="33" r="2.2" fill="#ffffff" />

      {/* Right Upper Wing */}
      <path
        d="M52 33 C60 22 76 16 88 25 C97 32 96 48 84 54 C74 59 60 50 52 42 Z"
        fill="url(#butterfly-wing-grad)"
        fillOpacity="0.8"
        stroke="var(--color-metal-light)"
        strokeWidth="1"
      />
      {/* Right Wing Lace Filigree */}
      <path
        d="M54 36 C62 28 74 24 82 30 C88 34 86 44 78 47 C70 50 60 45 54 41"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.85"
        fill="none"
      />
      <circle cx="80" cy="33" r="2.2" fill="#ffffff" />

      {/* Left Lower Wing */}
      <path
        d="M48 48 C38 52 24 58 20 69 C17 78 26 84 34 81 C41 78 45 66 48 56 Z"
        fill="url(#butterfly-wing-grad)"
        fillOpacity="0.7"
        stroke="var(--color-metal-light)"
        strokeWidth="0.9"
      />

      {/* Right Lower Wing */}
      <path
        d="M52 48 C62 52 76 58 80 69 C83 78 74 84 66 81 C59 78 55 66 52 56 Z"
        fill="url(#butterfly-wing-grad)"
        fillOpacity="0.7"
        stroke="var(--color-metal-light)"
        strokeWidth="0.9"
      />
    </svg>
  );
};

/**
 * Botanical Floral Branch divider ornament
 */
export const FloralBranchOrnament: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size * 2}
      height={size}
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <path
        d="M5 20 C20 18 35 22 40 20 C45 18 60 22 75 20"
        stroke="var(--color-metal-acento)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Delicate leaves */}
      <path
        d="M20 19 C23 14 30 15 31 19 C28 20 22 21 20 19 Z"
        fill="var(--color-resplandor-glow)"
        opacity="0.85"
      />
      <path
        d="M60 21 C57 26 50 25 49 21 C52 20 58 19 60 21 Z"
        fill="var(--color-resplandor-glow)"
        opacity="0.85"
      />
      {/* Blossom buds */}
      <circle cx="40" cy="20" r="3" fill="#ffffff" />
      <circle cx="20" cy="19" r="1.5" fill="var(--color-metal-light)" />
      <circle cx="60" cy="21" r="1.5" fill="var(--color-metal-light)" />
    </svg>
  );
};

/**
 * Metallic Divider with center flower and flanking floral buds (NO STARS)
 */
export const MetallicDivider: React.FC<{
  className?: string;
  withFlower?: boolean;
}> = ({ className = '', withFlower = true }) => {
  return (
    <div className={`flex items-center justify-center w-full my-6 gap-3 ${className}`}>
      <div
        className="h-[1px] flex-1 max-w-[180px] sm:max-w-[220px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(var(--color-resplandor-glow-rgb), 0.25) 40%, var(--color-metal-acento) 100%)',
        }}
      />
      {withFlower && (
        <div className="flex items-center gap-2 px-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-resplandor-glow)] opacity-80 shadow-[0_0_6px_var(--color-resplandor-glow)]" />
          <OrnamentalFlower size={20} />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-resplandor-glow)] opacity-80 shadow-[0_0_6px_var(--color-resplandor-glow)]" />
        </div>
      )}
      <div
        className="h-[1px] flex-1 max-w-[180px] sm:max-w-[220px]"
        style={{
          background:
            'linear-gradient(90deg, var(--color-metal-acento) 0%, rgba(var(--color-resplandor-glow-rgb), 0.25) 60%, transparent 100%)',
        }}
      />
    </div>
  );
};

/**
 * Gala Medallion surrounded by floral wreath and butterflies
 * NO PHOTOS - pure regal visual identity
 */
export const GalaMedallion: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Ethereal Pulsing Lilac Glow */}
      <div
        className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full pointer-events-none opacity-40 blur-2xl animate-pulse-subtle"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--color-resplandor-glow-rgb), 0.6) 0%, rgba(var(--color-acento-secundario-rgb), 0.3) 50%, transparent 75%)',
        }}
      />

      {/* Main Medallion Circular Frame */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 flex items-center justify-center">
        {/* SVG Concentric Rings and Floral Botanical Wreath */}
        <svg
          viewBox="0 0 320 320"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            <linearGradient id="medallion-metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="var(--color-metal-acento)" />
              <stop offset="50%" stopColor="var(--color-resplandor-glow)" />
              <stop offset="75%" stopColor="var(--color-metal-acento)" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <linearGradient id="inner-gold-grad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="var(--color-metal-dark)" />
              <stop offset="100%" stopColor="var(--color-metal-acento)" />
            </linearGradient>
          </defs>

          {/* Outer Dotted Filigree Ring */}
          <circle
            cx="160"
            cy="160"
            r="152"
            fill="none"
            stroke="url(#medallion-metal-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.8"
          />

          {/* Solid Middle Gala Ring */}
          <circle
            cx="160"
            cy="160"
            r="144"
            fill="none"
            stroke="url(#medallion-metal-grad)"
            strokeWidth="2.5"
          />

          {/* Inner Lace Beaded Ring */}
          <circle
            cx="160"
            cy="160"
            r="134"
            fill="none"
            stroke="var(--color-metal-acento)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
            opacity="0.75"
          />

          {/* Botanical Floral Garland Leaf Nodes around circumference */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle} 160 160)`}>
              <circle cx="160" cy="18" r="3" fill="#ffffff" />
              <circle cx="160" cy="18" r="1.5" fill="var(--color-resplandor-glow)" />
            </g>
          ))}
        </svg>

        {/* Medallion Glass Center Surface with deep amethyst/lilac glow */}
        <div
          className="relative w-34 h-34 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center p-2 border border-white/25 shadow-xl overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(100, 30, 160, 0.75) 0%, rgba(20, 6, 40, 0.96) 80%)',
            boxShadow:
              'inset 0 0 25px rgba(var(--color-resplandor-glow-rgb), 0.4), 0 8px 30px rgba(0, 0, 0, 0.85)',
          }}
        >
          {/* Subtle Internal Radial Light Accent */}
          <div
            className="absolute top-1 w-24 h-16 rounded-full blur-xl pointer-events-none opacity-50"
            style={{ background: 'var(--color-resplandor-glow)' }}
          />

          {/* Top Crest: Ornamental Butterfly */}
          <div className="absolute top-2.5 z-10 flex items-center justify-center gap-1">
            <OrnamentalButterfly size={22} className="glow-filter" />
          </div>

          {/* Number 15 / XV in Display Roman Gala Typography */}
          <div className="mt-3.5 flex flex-col items-center justify-center z-10">
            <span
              className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-metallic-silver leading-none select-none drop-shadow-md"
              style={{
                textShadow:
                  '0 0 16px rgba(var(--color-resplandor-glow-rgb), 0.7), 0 2px 6px rgba(0,0,0,0.9)',
              }}
            >
              15
            </span>

            {/* "XV AÑOS" in Regal Script/Caps */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="h-[1px] w-4"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, var(--color-metal-acento))',
                }}
              />
              <span
                className="font-cinzel text-[8px] sm:text-[9px] font-semibold tracking-[0.25em] uppercase text-[var(--color-metal-light)]"
                style={{ textShadow: '0 0 8px rgba(var(--color-resplandor-glow-rgb), 0.8)' }}
              >
                XV AÑOS
              </span>
              <span
                className="h-[1px] w-4"
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-metal-acento), transparent)',
                }}
              />
            </div>
          </div>

          {/* Lower Floral & Butterfly Charm */}
          <div className="absolute bottom-2 z-10 flex items-center gap-1 opacity-90">
            <OrnamentalFlower size={10} />
            <OrnamentalFlower size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};
