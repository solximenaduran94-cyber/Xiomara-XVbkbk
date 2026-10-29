import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Music, VolumeX } from 'lucide-react';

interface FloatingMusicPlayerProps {
  youtubeId?: string;
  youtubeUrl?: string;
  isPlaying?: boolean;
  onTogglePlay?: (playing: boolean) => void;
  audioSrc?: string;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  isPlaying: externalIsPlaying,
  onTogglePlay,
  audioSrc = '/bts-mikrokosmos-piano.mp3',
}) => {
  const [internalIsPlaying, setInternalIsPlaying] = useState<boolean>(false);
  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Attempt autoplay immediately on page entrance; fallback to first interaction if blocked by browser policy
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85;

    const playAudio = () => {
      audio
        .play()
        .then(() => {
          if (externalIsPlaying === undefined) {
            setInternalIsPlaying(true);
          }
          onTogglePlay?.(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy: attach one-time listener to user interaction
          const handleFirstGesture = () => {
            audio
              .play()
              .then(() => {
                if (externalIsPlaying === undefined) {
                  setInternalIsPlaying(true);
                }
                onTogglePlay?.(true);
              })
              .catch(() => {});

            ['click', 'touchstart', 'pointerdown', 'scroll', 'keydown'].forEach((evt) => {
              window.removeEventListener(evt, handleFirstGesture);
            });
          };

          ['click', 'touchstart', 'pointerdown', 'scroll', 'keydown'].forEach((evt) => {
            window.addEventListener(evt, handleFirstGesture, { once: true, passive: true });
          });
        });
    };

    playAudio();

    return () => {
      // Cleanup listeners if unmounted before interaction
    };
  }, []);

  // Synchronize playing state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    } else {
      if (!audio.paused) {
        audio.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      if (externalIsPlaying === undefined) setInternalIsPlaying(false);
      onTogglePlay?.(false);
    } else {
      audio
        .play()
        .then(() => {
          if (externalIsPlaying === undefined) setInternalIsPlaying(true);
          onTogglePlay?.(true);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      {/* HTML5 Audio element playing the uploaded track */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => {
          if (!isPlaying) {
            if (externalIsPlaying === undefined) setInternalIsPlaying(true);
            onTogglePlay?.(true);
          }
        }}
        onPause={() => {
          if (isPlaying) {
            if (externalIsPlaying === undefined) setInternalIsPlaying(false);
            onTogglePlay?.(false);
          }
        }}
      />

      {/* Floating Vinyl Button - discreet bottom right */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
        {/* Tooltip on hover / status */}
        {showTooltip && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-left border border-white/20 shadow-lg backdrop-blur-md">
            <span className="text-[10px] font-cinzel uppercase text-white font-medium">
              {isPlaying ? 'BTS - Mikrokosmos (Piano Cover)' : 'Tocar para reproducir música'}
            </span>
          </div>
        )}

        <button
          onClick={toggleMusic}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-11 h-11 rounded-full flex items-center justify-center p-0.5 transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
            isPlaying
              ? 'shadow-[0_0_20px_rgba(var(--color-resplandor-glow-rgb),0.6)] scale-105'
              : 'hover:scale-105 opacity-85 hover:opacity-100'
          }`}
          style={{
            background:
              'linear-gradient(135deg, #ffffff 0%, var(--color-resplandor-glow) 50%, #f472b6 100%)',
          }}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          title={isPlaying ? 'Pausar BTS - Mikrokosmos' : 'Reproducir BTS - Mikrokosmos'}
        >
          {/* Inner Vinyl Surface */}
          <div
            className={`w-full h-full rounded-full flex items-center justify-center relative overflow-hidden ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
            style={{
              background: 'radial-gradient(circle, #2a0836 0%, #15031d 70%, #07000b 100%)',
            }}
          >
            <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[var(--color-resplandor-glow)]">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>

          {/* Floating mini icon badge */}
          {isPlaying ? (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-resplandor-glow)] text-slate-950 flex items-center justify-center shadow-xs">
              <Volume2 size={10} className="stroke-[2.5]" />
            </div>
          ) : (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black/70 text-white/90 flex items-center justify-center border border-white/20">
              <VolumeX size={9} />
            </div>
          )}
        </button>
      </div>
    </>
  );
};
