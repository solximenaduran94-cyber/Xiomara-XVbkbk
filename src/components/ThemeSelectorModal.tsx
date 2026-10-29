import React, { useState } from 'react';
import { Palette, Settings, X, Check, RotateCcw, Video, Maximize2, Minimize2, Eye, Image as ImageIcon, Sparkles } from 'lucide-react';
import { ColorPalette, EventData, BackgroundType, BackgroundOverlayIntensity } from '../types';
import { PALETTES, applyPaletteToDocument } from '../constants/palettes';
import { DEFAULT_EVENT_DATA } from '../constants/eventData';
import { OrnamentalButterfly, OrnamentalFlower } from './VectorOrnaments';
import { VideoFitMode } from './BackgroundVideo';

interface ThemeSelectorModalProps {
  currentPaletteId: string;
  onSelectPalette: (palette: ColorPalette) => void;
  event: EventData;
  onUpdateEvent: (updated: EventData) => void;
  onNotify: (title: string, desc?: string) => void;
  backgroundType?: BackgroundType;
  onSelectBackgroundType?: (type: BackgroundType) => void;
  videoFitMode?: VideoFitMode;
  onSelectFitMode?: (mode: VideoFitMode) => void;
  overlayIntensity?: BackgroundOverlayIntensity;
  onSelectOverlayIntensity?: (intensity: BackgroundOverlayIntensity) => void;
  onToggleImmersive?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  currentPaletteId,
  onSelectPalette,
  event,
  onUpdateEvent,
  onNotify,
  backgroundType = 'uploaded-image',
  onSelectBackgroundType,
  videoFitMode = 'cover',
  onSelectFitMode,
  overlayIntensity = 'medium',
  onSelectOverlayIntensity,
  onToggleImmersive,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (externalOnClose && !open) externalOnClose();
    setInternalIsOpen(open);
  };
  const [activeTab, setActiveTab] = useState<'palettes' | 'video' | 'details'>('palettes');

  // Form state for details
  const [formData, setFormData] = useState<EventData>(event);

  const handlePaletteClick = (palette: ColorPalette) => {
    onSelectPalette(palette);
    applyPaletteToDocument(palette);
    onNotify('Paleta Actualizada', `Se aplicó la paleta ${palette.name}`);
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEvent(formData);
    onNotify('Datos Guardados', 'Se actualizaron los datos de la Quinceañera');
    setIsOpen(false);
  };

  const handleResetDefaults = () => {
    const defaultPal = PALETTES[0];
    onSelectPalette(defaultPal);
    applyPaletteToDocument(defaultPal);
    setFormData(DEFAULT_EVENT_DATA);
    onUpdateEvent(DEFAULT_EVENT_DATA);
    onNotify('Valores Restablecidos', 'Se aplicó la configuración predeterminada');
  };

  return (
    <>
      {/* Standalone floating button only when not controlled by top bar */}
      {externalIsOpen === undefined && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="glass-pill px-3 py-1.5 rounded-full text-xs font-cinzel text-purple-200 flex items-center gap-1.5 shadow-xl hover:text-white cursor-pointer"
            title="Personalizar Paleta de Colores"
            aria-label="Personalizar Paleta de Colores"
          >
            <Palette size={14} className="text-[var(--color-resplandor-glow)]" />
            <span className="hidden sm:inline">Colores</span>
          </button>
        </div>
      )}

      {/* Modal Backdrop & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-xl max-h-[90vh] rounded-3xl border border-[var(--color-tarjeta-borde)] shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[var(--color-resplandor-glow)]/20 text-[var(--color-resplandor-glow)]">
                  <OrnamentalButterfly size={20} />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">
                    Personalizador de Gala
                  </h3>
                  <p className="text-xs text-[var(--color-texto-muted)]">
                    Configuración de paletas de color y detalles del festejo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tab controls */}
            <div className="flex border-b border-white/10 px-5 pt-3 gap-3 sm:gap-4 text-xs font-cinzel uppercase tracking-wider overflow-x-auto">
              <button
                onClick={() => setActiveTab('palettes')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'palettes'
                    ? 'border-[var(--color-resplandor-glow)] text-white font-bold'
                    : 'border-transparent text-[var(--color-metal-acento)] hover:text-white'
                }`}
              >
                <OrnamentalFlower size={14} />
                <span>Paletas</span>
              </button>

              <button
                onClick={() => setActiveTab('video')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'video'
                    ? 'border-[var(--color-resplandor-glow)] text-white font-bold'
                    : 'border-transparent text-[var(--color-metal-acento)] hover:text-white'
                }`}
              >
                <ImageIcon size={14} />
                <span>Fondo</span>
              </button>

              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'details'
                    ? 'border-[var(--color-resplandor-glow)] text-white font-bold'
                    : 'border-transparent text-[var(--color-metal-acento)] hover:text-white'
                }`}
              >
                <Settings size={14} />
                <span>Datos del Evento</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4 text-left">
              {activeTab === 'palettes' ? (
                <div className="space-y-3">
                  <p className="text-xs text-[var(--color-metal-acento)] leading-relaxed">
                    Elegí cualquiera de las combinaciones de gala para transformar en tiempo real los
                    fondos, flores, mariposas, reflejos y tarjetas:
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    {PALETTES.map((pal) => {
                      const isSelected = pal.id === currentPaletteId;
                      return (
                        <button
                          key={pal.id}
                          onClick={() => handlePaletteClick(pal)}
                          className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-purple-950/70 border-[var(--color-resplandor-glow)] shadow-lg'
                              : 'bg-purple-950/20 border-white/10 hover:border-white/25 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                                {pal.name}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] text-emerald-400 font-sans font-medium flex items-center gap-1">
                                  <Check size={12} /> Activa
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[var(--color-texto-muted)] mt-0.5 line-clamp-1">
                              {pal.description}
                            </p>
                          </div>

                          {/* Color preview swatch dots */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                              style={{ backgroundColor: pal.colors.fondoBase }}
                              title="Fondo Base"
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                              style={{ backgroundColor: pal.colors.fondoGradienteEnd }}
                              title="Degradé"
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                              style={{ backgroundColor: pal.colors.resplandorGlow }}
                              title="Resplandor"
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                              style={{ backgroundColor: pal.colors.metalAcento }}
                              title="Metal Acento"
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : activeTab === 'video' ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                      <ImageIcon size={16} className="text-[var(--color-resplandor-glow)]" />
                      Fondo de la Invitación
                    </h4>
                    <p className="text-xs text-[var(--color-texto-muted)] leading-relaxed">
                      Elegí qué fondo deseas mostrar en la celebración. La imagen que subiste se encuentra activa de forma predeterminada con efecto mágico.
                    </p>
                  </div>

                  {/* 1. Background Source Selection */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-cinzel uppercase tracking-wider text-[var(--color-metal-acento)] font-semibold">
                      Tipo de Fondo
                    </label>

                    <div className="grid grid-cols-1 gap-2.5">
                      {/* Option 1: Uploaded Image */}
                      <button
                        type="button"
                        onClick={() => {
                          onSelectBackgroundType?.('uploaded-image');
                          onNotify('Fondo Aplicado', 'Se estableció la imagen subida como fondo');
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                          backgroundType === 'uploaded-image'
                            ? 'bg-purple-950/70 border-[var(--color-resplandor-glow)] shadow-lg'
                            : 'bg-purple-950/20 border-white/10 hover:border-white/25 hover:bg-white/5'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black/40 shadow-inner">
                          <img
                            src="/uploaded-background.jpg"
                            onError={(e) => {
                              e.currentTarget.src = '/35d1ca2f8de8e5eaf13e35784a765ce4.jpg';
                            }}
                            alt="Tu Imagen Subida"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider truncate">
                              Arco Floral & Rosas (Tu Imagen)
                            </span>
                            {backgroundType === 'uploaded-image' && (
                              <span className="text-[10px] text-emerald-400 font-sans font-medium flex items-center gap-1 shrink-0">
                                <Check size={12} /> Activo
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--color-texto-muted)] mt-0.5 line-clamp-2">
                            Arco de ensueño con glicinas lilas, escalinatas de gala, rosas y flores luminosas.
                          </p>
                        </div>
                      </button>

                      {/* Option 2: Crystal Flowers */}
                      <button
                        type="button"
                        onClick={() => {
                          onSelectBackgroundType?.('crystal-flowers');
                          onNotify('Fondo Aplicado', 'Se establecieron las flores de cristal');
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                          backgroundType === 'crystal-flowers'
                            ? 'bg-purple-950/70 border-[var(--color-resplandor-glow)] shadow-lg'
                            : 'bg-purple-950/20 border-white/10 hover:border-white/25 hover:bg-white/5'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black/40 shadow-inner">
                          <img
                            src="/crystal-flowers.png"
                            alt="Flores de Cristal"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider truncate">
                              Flores de Cristal Violeta
                            </span>
                            {backgroundType === 'crystal-flowers' && (
                              <span className="text-[10px] text-emerald-400 font-sans font-medium flex items-center gap-1 shrink-0">
                                <Check size={12} /> Activo
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--color-texto-muted)] mt-0.5 line-clamp-2">
                            Pétalos de orquídeas de cristal con destellos estelares sobre cielo púrpura.
                          </p>
                        </div>
                      </button>

                      {/* Option 3: Dynamic Video */}
                      <button
                        type="button"
                        onClick={() => {
                          onSelectBackgroundType?.('video');
                          onNotify('Fondo Aplicado', 'Se activó el video dinámico');
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                          backgroundType === 'video'
                            ? 'bg-purple-950/70 border-[var(--color-resplandor-glow)] shadow-lg'
                            : 'bg-purple-950/20 border-white/10 hover:border-white/25 hover:bg-white/5'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-purple-900/60 flex items-center justify-center text-[var(--color-resplandor-glow)]">
                          <Video size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider truncate">
                              Video Dinámico Animado
                            </span>
                            {backgroundType === 'video' && (
                              <span className="text-[10px] text-emerald-400 font-sans font-medium flex items-center gap-1 shrink-0">
                                <Check size={12} /> Activo
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--color-texto-muted)] mt-0.5 line-clamp-2">
                            Video vertical en bucle continuo con movimiento de brillos y destellos.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 2. Fit Mode Options */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-[10px] font-cinzel uppercase tracking-wider text-[var(--color-metal-acento)] font-semibold">
                      Ajuste Visual a la Pantalla
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectFitMode?.('cover');
                          onNotify('Ajuste: Llenar Pantalla', 'El fondo cubre toda el área de pantalla');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                          videoFitMode === 'cover'
                            ? 'bg-purple-950/70 border-[var(--color-resplandor-glow)] shadow-md text-white'
                            : 'bg-purple-950/20 border-white/10 hover:border-white/25 text-purple-200'
                        }`}
                      >
                        <Maximize2 size={15} className="text-[var(--color-resplandor-glow)]" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-cinzel font-semibold block truncate">
                            Llenar Pantalla (Cover)
                          </span>
                        </div>
                        {videoFitMode === 'cover' && <Check size={12} className="text-emerald-400 shrink-0" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectFitMode?.('contain');
                          onNotify('Ajuste: Completo Centrado', 'Se muestra el cuadro completo con aura');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                          videoFitMode === 'contain'
                            ? 'bg-purple-950/70 border-[var(--color-resplandor-glow)] shadow-md text-white'
                            : 'bg-purple-950/20 border-white/10 hover:border-white/25 text-purple-200'
                        }`}
                      >
                        <Minimize2 size={15} className="text-[var(--color-resplandor-glow)]" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-cinzel font-semibold block truncate">
                            Completo Centrado (Contain)
                          </span>
                        </div>
                        {videoFitMode === 'contain' && <Check size={12} className="text-emerald-400 shrink-0" />}
                      </button>
                    </div>
                  </div>

                  {/* 3. Contrast/Intensity for readability */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-[10px] font-cinzel uppercase tracking-wider text-[var(--color-metal-acento)] font-semibold">
                      Contraste de Fondo para Lectura
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['soft', 'medium', 'intense'] as const).map((intensity) => (
                        <button
                          key={intensity}
                          type="button"
                          onClick={() => {
                            onSelectOverlayIntensity?.(intensity);
                            onNotify('Contraste Actualizado', `Nivel de sombreado: ${intensity}`);
                          }}
                          className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                            overlayIntensity === intensity
                              ? 'bg-purple-950/70 border-[var(--color-resplandor-glow)] shadow-md text-white'
                              : 'bg-purple-950/20 border-white/10 hover:border-white/25 text-purple-200'
                          }`}
                        >
                          <span className="text-[10px] font-cinzel uppercase tracking-wider block">
                            {intensity === 'soft' ? 'Suave' : intensity === 'medium' ? 'Equilibrado' : 'Marcado'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Immersive View Action */}
                  {onToggleImmersive && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onToggleImmersive();
                        }}
                        className="w-full py-3 px-4 rounded-xl font-cinzel text-xs uppercase font-semibold text-white bg-[var(--color-acento-secundario)] hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Eye size={16} />
                        <span>Ver Fondo Completo (Ocultar Tarjetas)</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSaveDetails} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-cinzel uppercase tracking-wider text-[var(--color-metal-light)] mb-1">
                      Nombre de la Quinceañera
                    </label>
                    <input
                      type="text"
                      value={formData.quinceaneraName}
                      onChange={(e) =>
                        setFormData({ ...formData, quinceaneraName: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/80 border border-white/20 text-white font-sans text-sm focus:border-[var(--color-resplandor-glow)] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-cinzel uppercase tracking-wider text-[var(--color-metal-light)] mb-1">
                        Fecha Visible
                      </label>
                      <input
                        type="text"
                        value={formData.dateDisplay}
                        onChange={(e) => setFormData({ ...formData, dateDisplay: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-purple-950/80 border border-white/20 text-white font-sans text-sm focus:border-[var(--color-resplandor-glow)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-cinzel uppercase tracking-wider text-[var(--color-metal-light)] mb-1">
                        Horario
                      </label>
                      <input
                        type="text"
                        value={formData.timeDisplay}
                        onChange={(e) => setFormData({ ...formData, timeDisplay: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-purple-950/80 border border-white/20 text-white font-sans text-sm focus:border-[var(--color-resplandor-glow)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-cinzel uppercase tracking-wider text-[var(--color-metal-light)] mb-1">
                      Salón / Lugar
                    </label>
                    <input
                      type="text"
                      value={formData.venueName}
                      onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/80 border border-white/20 text-white font-sans text-sm focus:border-[var(--color-resplandor-glow)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-cinzel uppercase tracking-wider text-[var(--color-metal-light)] mb-1">
                      Dirección y Ciudad
                    </label>
                    <input
                      type="text"
                      value={formData.venueAddress}
                      onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/80 border border-white/20 text-white font-sans text-sm focus:border-[var(--color-resplandor-glow)] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-cinzel uppercase tracking-wider text-[var(--color-metal-light)] mb-1">
                        Alias Bancario
                      </label>
                      <input
                        type="text"
                        value={formData.bankInfo.alias}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bankInfo: { ...formData.bankInfo, alias: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-purple-950/80 border border-white/20 text-white font-sans text-sm focus:border-[var(--color-resplandor-glow)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-cinzel uppercase tracking-wider text-[var(--color-metal-light)] mb-1">
                        WhatsApp Organizador
                      </label>
                      <input
                        type="text"
                        value={formData.organizerWhatsApp}
                        onChange={(e) =>
                          setFormData({ ...formData, organizerWhatsApp: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-purple-950/80 border border-white/20 text-white font-sans text-sm focus:border-[var(--color-resplandor-glow)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-cinzel uppercase tracking-wider text-[var(--color-metal-light)] mb-1">
                      Música / Enlace de YouTube
                    </label>
                    <input
                      type="text"
                      value={formData.musicYoutubeUrl || ''}
                      onChange={(e) => {
                        const url = e.target.value;
                        let extractedId = '';
                        if (url.includes('youtu.be/')) {
                          extractedId = url.split('youtu.be/')[1].split('?')[0];
                        } else if (url.includes('v=')) {
                          extractedId = url.split('v=')[1].split('&')[0];
                        }
                        setFormData({
                          ...formData,
                          musicYoutubeUrl: url,
                          musicYoutubeId: extractedId || formData.musicYoutubeId,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/80 border border-white/20 text-white font-sans text-sm focus:border-[var(--color-resplandor-glow)] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-cinzel uppercase font-semibold text-white bg-[var(--color-acento-secundario)] hover:opacity-90 transition-all cursor-pointer shadow-md"
                  >
                    Guardar Cambios
                  </button>
                </form>
              )}
            </div>

            {/* Footer with Reset */}
            <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-[var(--color-metal-acento)]">
              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Restablecer predeterminados</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-lg glass-panel hover:text-white transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
