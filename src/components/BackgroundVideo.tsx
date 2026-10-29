import React, { useEffect, useRef, useState } from 'react';
import { BackgroundFitMode, BackgroundType, BackgroundOverlayIntensity } from '../types';

export type VideoFitMode = BackgroundFitMode;

interface BackgroundVideoProps {
  backgroundType?: BackgroundType;
  fitMode?: BackgroundFitMode;
  overlayIntensity?: BackgroundOverlayIntensity;
  isImmersive?: boolean;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  backgroundType = 'uploaded-image',
  fitMode = 'cover',
  overlayIntensity = 'medium',
  isImmersive = false,
}) => {
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const ambientVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Asset sources
  const uploadedImageSrc = '/uploaded-background.jpg';
  const uploadedImageFallback = '/35d1ca2f8de8e5eaf13e35784a765ce4.jpg';
  const crystalFlowersSrc = '/crystal-flowers.png';
  const videoSrc = '/background-video.mp4';
  const videoFallbackSrc = '/starosta050771_pindown.io_1792534409.mp4';

  const currentImageSrc =
    backgroundType === 'crystal-flowers' ? crystalFlowersSrc : uploadedImageSrc;

  // Video autoplay triggers only when in video mode
  useEffect(() => {
    if (backgroundType !== 'video') return;

    const playVideos = async () => {
      try {
        if (ambientVideoRef.current && ambientVideoRef.current.paused) {
          await ambientVideoRef.current.play();
        }
      } catch {
        // Autoplay policy or low-power mode
      }

      try {
        if (mainVideoRef.current && mainVideoRef.current.paused) {
          await mainVideoRef.current.play();
        }
      } catch {
        // Autoplay policy or low-power mode
      }
    };

    playVideos();

    const handleFirstTouch = () => {
      playVideos();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };

    window.addEventListener('touchstart', handleFirstTouch, { passive: true });
    window.addEventListener('click', handleFirstTouch, { passive: true });
    window.addEventListener('scroll', handleFirstTouch, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };
  }, [backgroundType]);

  // Determine overlay vignette opacity based on settings
  const getVignetteOpacityClass = () => {
    if (isImmersive) return 'opacity-5';
    switch (overlayIntensity) {
      case 'soft':
        return 'opacity-10';
      case 'intense':
        return 'opacity-40';
      case 'medium':
      default:
        return 'opacity-20';
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] pointer-events-none select-none overflow-hidden z-0"
      style={{ backgroundColor: 'var(--color-fondo-base)' }}
    >
      {/* 1. Ambient Background Layer (Creates a rich, glowing edge bleed on desktop & ultrawide) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-60">
        {backgroundType === 'video' ? (
          <video
            ref={ambientVideoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            aria-hidden="true"
            className="w-full h-full object-cover blur-3xl scale-125 transform-gpu"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoFallbackSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={currentImageSrc}
            onError={(e) => {
              if (e.currentTarget.src !== uploadedImageFallback) {
                e.currentTarget.src = uploadedImageFallback;
              }
            }}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover blur-3xl scale-125 transform-gpu"
          />
        )}

        {/* Soft radial overlay for natural color integration with current palette */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-fondo-base)]/50 via-transparent to-[var(--color-fondo-base)]/80"
          aria-hidden="true"
        />
      </div>

      {/* 2. Main Content Layer (Image or Video) */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <div
          className={`relative w-full h-full ${
            fitMode === 'contain' ? 'max-w-xl md:max-w-2xl mx-auto' : 'w-full'
          } flex items-center justify-center overflow-hidden`}
        >
          {backgroundType === 'video' ? (
            <video
              ref={mainVideoRef}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`w-full h-full transition-all duration-700 transform-gpu ${
                fitMode === 'contain' ? 'object-contain max-h-[100dvh]' : 'object-cover'
              } ${isVideoLoaded ? 'opacity-90' : 'opacity-0'}`}
              style={{
                filter: 'drop-shadow(0 0 25px rgba(232, 121, 249, 0.25))',
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              <source src={videoFallbackSrc} type="video/mp4" />
            </video>
          ) : (
            <img
              src={currentImageSrc}
              onError={(e) => {
                if (e.currentTarget.src !== uploadedImageFallback) {
                  e.currentTarget.src = uploadedImageFallback;
                }
              }}
              onLoad={() => setIsImageLoaded(true)}
              alt="Fondo de Gala XV Años"
              className={`w-full h-full transition-all duration-700 transform-gpu animate-ambient-breathe ${
                fitMode === 'contain'
                  ? 'object-contain max-h-[100dvh]'
                  : 'object-cover object-center'
              } ${isImageLoaded ? 'opacity-95' : 'opacity-80'}`}
              style={{
                filter: 'drop-shadow(0 0 30px rgba(var(--color-resplandor-glow-rgb), 0.35))',
              }}
            />
          )}
        </div>
      </div>

      {/* 3. Subtle Atmospheric Vignette & Contrast Mask for Content Legibility */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${getVignetteOpacityClass()}`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(12, 4, 24, 0.15) 0%, rgba(12, 4, 24, 0.68) 100%)',
        }}
        aria-hidden="true"
      />

      {/* 4. Top & Bottom Smooth Gradient Fade for Header & Footer Legibility */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isImmersive ? 'opacity-0' : 'opacity-40'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(12, 4, 24, 0.4) 0%, rgba(12, 4, 24, 0) 18%, rgba(12, 4, 24, 0) 82%, rgba(12, 4, 24, 0.5) 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};
