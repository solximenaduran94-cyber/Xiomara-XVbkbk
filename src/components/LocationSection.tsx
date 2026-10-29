import React, { useState } from 'react';
import { Clock, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { EventData } from '../types';
import { MetallicDivider, OrnamentalFlower } from './VectorOrnaments';

interface LocationSectionProps {
  event: EventData;
  onNotify: (title: string, desc?: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ event, onNotify }) => {
  const [copied, setCopied] = useState(false);
  const [showLiveEmbed, setShowLiveEmbed] = useState(false);

  const fullAddress = `${event.venueAddress}, ${event.venueCity}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.venueName} - ${fullAddress}`);
    setCopied(true);
    onNotify('Dirección Copiada', 'Copiada al portapapeles');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenGoogleMaps = () => {
    const url =
      event.googleMapsUrl ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${event.venueName} ${fullAddress}`
      )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="ubicacion" className="relative py-3 w-full z-10 scroll-mt-16">
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center">
          {/* Section Heading */}
          <div className="flex items-center gap-1.5 mb-1 text-white">
          <OrnamentalFlower size={12} className="text-white/85" />
          <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
            Dónde & Cuándo
          </span>
          <OrnamentalFlower size={12} className="text-white/85" />
        </div>

        <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-white uppercase text-center drop-shadow-md">
          Ubicación & Horarios
        </h3>

        <div className="my-1.5 scale-90">
          <MetallicDivider />
        </div>

        {/* Venue Information inside Translucent Pink Band */}
        <div className="w-full flex flex-col gap-3.5 text-center mt-2">
          {/* Venue Info */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-white/90 mb-0.5">
              <MapPin size={13} className="text-white/80" />
              <span className="font-cinzel text-[9px] uppercase tracking-wider font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                Salón de Fiestas
              </span>
            </div>
            <h4 className="font-cinzel text-lg sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
              {event.venueName}
            </h4>
            <p className="text-xs sm:text-sm text-white font-medium mt-0.5 font-sans drop-shadow-sm">
              {event.venueAddress} · {event.venueCity}
            </p>
          </div>

          {/* Schedule Highlight */}
          <div className="w-full flex items-center justify-center gap-2 py-2.5 my-1 border-y border-pink-200/25 text-center">
            <Clock size={14} className="text-white/80 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wider font-cinzel drop-shadow-[0_1.5px_3px_rgba(20,2,20,0.85)]">
              Recepción 21:00 hrs
            </span>
          </div>

          {/* Map Preview / Embed */}
          <div className="w-full relative rounded-2xl overflow-hidden border border-pink-200/35 h-44 sm:h-56 bg-slate-950/80 shadow-lg">
            {showLiveEmbed ? (
              <iframe
                title="Mapa de ubicación"
                src={`https://maps.google.com/maps?q=${
                  event.googleMapsUrl?.match(/q=(-?\d+\.?\d*,-?\d+\.?\d*)/)?.[1] ||
                  encodeURIComponent(`${event.venueName} ${fullAddress}`)
                }&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center relative bg-gradient-to-b from-purple-950/60 to-pink-950/80">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-400/35 border border-pink-200/60 text-white mb-2 shadow-sm">
                  <MapPin size={18} />
                </div>
                <p className="font-cinzel text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm">
                  {event.venueName}
                </p>
                <p className="text-[11px] text-white/90 mt-0.5 line-clamp-1 drop-shadow-sm">
                  {event.venueAddress}
                </p>
                <button
                  type="button"
                  onClick={() => setShowLiveEmbed(true)}
                  className="mt-2 text-[9px] font-cinzel uppercase tracking-wider text-white hover:text-white flex items-center gap-1 cursor-pointer banda-rosa-pill px-3.5 py-1.5 rounded-full border border-white/50 transition-all shadow-sm font-bold"
                >
                  <span>Ver mapa en pantalla</span>
                  <ExternalLink size={10} />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons: Google Maps + Copy */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 w-full">
            <button
              onClick={handleOpenGoogleMaps}
              className="w-full py-3 px-3 rounded-xl text-[10px] font-cinzel font-bold tracking-wider uppercase shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/70"
              style={{
                background:
                  'linear-gradient(135deg, #ffe0ec 0%, #fbcfe8 50%, #f9a8d4 100%)',
                boxShadow:
                  '0 4px 18px rgba(251, 207, 232, 0.55)',
                color: '#3b0822',
              }}
            >
              <Navigation size={13} className="text-[#3b0822]" />
              <span>Cómo Llegar</span>
            </button>

            <button
              onClick={handleCopyAddress}
              className="w-full py-3 px-3 rounded-xl text-[10px] font-cinzel font-bold tracking-wider uppercase text-white banda-rosa-pill hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Copy size={13} />
              <span>{copied ? '¡Copiado!' : 'Copiar Dir.'}</span>
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
