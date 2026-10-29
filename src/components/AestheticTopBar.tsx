import React from 'react';
import { Music } from 'lucide-react';
import { OrnamentalButterfly } from './VectorOrnaments';

interface AestheticTopBarProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isImmersive?: boolean;
  onToggleImmersive?: () => void;
  onOpenThemeModal?: () => void;
  quinceaneraName: string;
}

export const AestheticTopBar: React.FC<AestheticTopBarProps> = ({
  isPlayingMusic,
  onToggleMusic,
  quinceaneraName,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2.5 pt-2 pb-1.5 pointer-events-none">
      <div className="max-w-xs sm:max-w-sm mx-auto flex items-center justify-between glass-pill px-3 py-1.5 rounded-full pointer-events-auto border border-white/20 shadow-lg backdrop-blur-xl">
        {/* Left: Music Player Mini-Affordance */}
        <button
          onClick={onToggleMusic}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-medium transition-all cursor-pointer ${
            isPlayingMusic
              ? 'bg-pink-500/30 text-white border border-pink-200/50 shadow-xs'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title={isPlayingMusic ? 'Pausar música' : 'Reproducir música de gala'}
          aria-label="Reproductor de música"
        >
          {isPlayingMusic ? (
            <>
              <div className="flex items-center gap-0.5 h-2.5">
                <span className="w-0.5 h-2 bg-pink-200 animate-pulse" />
                <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-pink-200 animate-pulse delay-150" />
              </div>
              <span className="text-[9px] tracking-wide uppercase font-cinzel font-bold">Música</span>
            </>
          ) : (
            <>
              <Music size={11} />
              <span className="text-[9px] tracking-wide uppercase font-cinzel font-bold">Música</span>
            </>
          )}
        </button>

        {/* Right: Delicate Title with butterfly */}
        <div className="flex items-center gap-1.5 px-2">
          <OrnamentalButterfly size={11} className="text-white/90" />
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-white truncate max-w-[140px] sm:max-w-[180px]">
            {quinceaneraName}
          </span>
        </div>
      </div>
    </header>
  );
};
