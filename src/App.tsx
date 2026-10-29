/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ColorPalette, EventData, ToastMessage, BackgroundType, BackgroundOverlayIntensity } from './types';
import { DEFAULT_EVENT_DATA } from './constants/eventData';
import { PALETTES, applyPaletteToDocument } from './constants/palettes';
import { BackgroundVideo, VideoFitMode } from './components/BackgroundVideo';
import { StarrySkyCanvas } from './components/StarrySkyCanvas';
import { SparkleClickEffect } from './components/SparkleClickEffect';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { AestheticTopBar } from './components/AestheticTopBar';
import { ToastContainer } from './components/Toast';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { LocationSection } from './components/LocationSection';
import { DressCodeSection } from './components/DressCodeSection';
import { GiftSection } from './components/GiftSection';
import { SharedAlbumSection } from './components/SharedAlbumSection';
import { RsvpSection } from './components/RsvpSection';
import { GuestbookSection } from './components/GuestbookSection';
import { Footer } from './components/Footer';

const EVENT_STORAGE_KEY = 'xv_xiomara_event_data_v5';
const PALETTE_STORAGE_KEY = 'xv_xiomara_palette_id_v5';
const VIDEO_FIT_STORAGE_KEY = 'xv_xiomara_video_fit_v2';
const BG_TYPE_STORAGE_KEY = 'xv_xiomara_bg_type_v2';
const BG_OVERLAY_STORAGE_KEY = 'xv_xiomara_bg_overlay_v1';

export default function App() {
  // Event data state
  const [eventData, setEventData] = useState<EventData>(() => {
    try {
      const saved = localStorage.getItem(EVENT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_EVENT_DATA;
  });

  // Current palette state
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>(() => {
    try {
      const savedId = localStorage.getItem(PALETTE_STORAGE_KEY);
      if (savedId && savedId !== 'zafiro-plata') {
        const found = PALETTES.find((p) => p.id === savedId);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return PALETTES[0];
  });

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Background type state: 'uploaded-image' by default as requested
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(() => {
    try {
      const saved = localStorage.getItem(BG_TYPE_STORAGE_KEY);
      if (saved === 'uploaded-image' || saved === 'crystal-flowers' || saved === 'video') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'uploaded-image';
  });

  // Background contrast / overlay intensity state
  const [overlayIntensity, setOverlayIntensity] = useState<BackgroundOverlayIntensity>(() => {
    try {
      const saved = localStorage.getItem(BG_OVERLAY_STORAGE_KEY);
      if (saved === 'soft' || saved === 'medium' || saved === 'intense') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'medium';
  });

  // Video background fit mode: 'cover' default for full aesthetic mobile canvas
  const [videoFitMode, setVideoFitMode] = useState<VideoFitMode>(() => {
    try {
      const saved = localStorage.getItem(VIDEO_FIT_STORAGE_KEY);
      if (saved === 'contain' || saved === 'cover') return saved;
    } catch {
      // ignore
    }
    return 'cover';
  });

  // Music playback state
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Theme modal open state
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  // Immersive video view (hide cards to appreciate full background animation)
  const [isImmersive, setIsImmersive] = useState<boolean>(false);

  // Apply palette variables to document root on mount and update
  useEffect(() => {
    applyPaletteToDocument(currentPalette);
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, currentPalette.id);
    } catch {
      // ignore
    }
  }, [currentPalette]);

  // Persist custom event data changes
  const handleUpdateEvent = (updated: EventData) => {
    setEventData(updated);
    try {
      localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSelectPalette = (palette: ColorPalette) => {
    setCurrentPalette(palette);
  };

  const handleSelectFitMode = (mode: VideoFitMode) => {
    setVideoFitMode(mode);
    try {
      localStorage.setItem(VIDEO_FIT_STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  };

  const handleSelectBackgroundType = (type: BackgroundType) => {
    setBackgroundType(type);
    try {
      localStorage.setItem(BG_TYPE_STORAGE_KEY, type);
    } catch {
      // ignore
    }
  };

  const handleSelectOverlayIntensity = (intensity: BackgroundOverlayIntensity) => {
    setOverlayIntensity(intensity);
    try {
      localStorage.setItem(BG_OVERLAY_STORAGE_KEY, intensity);
    } catch {
      // ignore
    }
  };

  const handleToggleMusic = () => {
    setIsPlayingMusic((prev) => {
      const next = !prev;
      addToast(
        next ? 'Música de la Fiesta' : 'Música en Pausa',
        next ? 'BTS - Mikrokosmos (Piano Cover)' : 'Música pausada',
        'info'
      );
      return next;
    });
  };

  const handleToggleImmersive = () => {
    setIsImmersive((prev) => {
      const next = !prev;
      addToast(
        next ? 'Modo Fondo Completo' : 'Invitación Visible',
        next
          ? 'Tarjetas ocultas para apreciar el fondo'
          : 'Tarjetas de invitación restauradas',
        'info'
      );
      return next;
    });
  };

  const addToast = (title: string, description?: string, type: 'success' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-x-hidden text-white font-sans selection:bg-purple-500/30 selection:text-purple-200"
      style={{ backgroundColor: 'var(--color-fondo-base)' }}
    >
      {/* 0. Real Background Image/Video with Ambient Glow & Mobile Fit Adaptation */}
      <BackgroundVideo
        backgroundType={backgroundType}
        fitMode={videoFitMode}
        overlayIntensity={overlayIntensity}
        isImmersive={isImmersive}
      />

      {/* 1. Dynamic Particle Sky Canvas (twinkling petals, butterflies & fireflies over video) */}
      <StarrySkyCanvas />

      {/* 2. Interactive Click/Tap Sparkles Layer */}
      <SparkleClickEffect />

      {/* 3. Sleek Unified Top Navigation Bar for Mobile */}
      <AestheticTopBar
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        quinceaneraName={eventData.quinceaneraName}
      />

      {/* 4. Synced Background Music Player Audio Engine */}
      <FloatingMusicPlayer
        youtubeId={eventData.musicYoutubeId}
        youtubeUrl={eventData.musicYoutubeUrl}
        isPlaying={isPlayingMusic}
        onTogglePlay={(playing) => setIsPlayingMusic(playing)}
      />

      {/* 5. Theme & Event Details Customizer Modal */}
      <ThemeSelectorModal
        currentPaletteId={currentPalette.id}
        onSelectPalette={handleSelectPalette}
        event={eventData}
        onUpdateEvent={handleUpdateEvent}
        onNotify={(title, desc) => addToast(title, desc, 'info')}
        backgroundType={backgroundType}
        onSelectBackgroundType={handleSelectBackgroundType}
        videoFitMode={videoFitMode}
        onSelectFitMode={handleSelectFitMode}
        overlayIntensity={overlayIntensity}
        onSelectOverlayIntensity={handleSelectOverlayIntensity}
        onToggleImmersive={handleToggleImmersive}
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* 6. Elegant Glass Toast Alerts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Immersive View Return Pill */}
      {isImmersive && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4">
          <button
            onClick={handleToggleImmersive}
            className="glass-pill px-4 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider text-white shadow-2xl flex items-center gap-1.5 border border-[var(--color-resplandor-glow)] active:scale-95 transition-all cursor-pointer"
            style={{
              boxShadow: '0 0 20px rgba(var(--color-resplandor-glow-rgb), 0.5)',
            }}
          >
            <span>Volver a la Invitación</span>
          </button>
        </div>
      )}

      {/* Main Sections Container - Translucent Pink Bands across all sections */}
      <main
        className={`relative z-10 w-full transition-all duration-700 space-y-6 sm:space-y-8 pb-10 ${
          isImmersive ? 'opacity-0 pointer-events-none translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* SECTION 1: PORTADA HERO */}
        <HeroSection event={eventData} onNotify={addToast} />

        {/* SECTION 2: CUENTA REGRESIVA EN TIEMPO REAL */}
        <CountdownSection event={eventData} />

        {/* SECTION 3: UBICACIÓN Y HORARIOS */}
        <LocationSection event={eventData} onNotify={addToast} />

        {/* SECTION 4: CÓDIGO DE VESTIMENTA & COLOR RESERVADO */}
        <DressCodeSection event={eventData} />

        {/* SECTION 5: REGALOS Y TRANSFERENCIA BANCARIA */}
        <GiftSection event={eventData} onNotify={addToast} />

        {/* SECTION 6: ÁLBUM DIGITAL COMPARTIDO */}
        <SharedAlbumSection event={eventData} onNotify={addToast} />

        {/* SECTION 7: CONFIRMACIÓN DE ASISTENCIA (RSVP POR WHATSAPP) */}
        <RsvpSection event={eventData} onNotify={addToast} />

        {/* SECTION 8: MURO DE MENSAJES Y DEDICATORIAS */}
        <GuestbookSection onNotify={addToast} />

        {/* SECTION 9: PIE DE PÁGINA (FOOTER) */}
        <Footer event={eventData} />
      </main>
    </div>
  );
}
