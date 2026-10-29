import React from 'react';
import { Sparkles } from 'lucide-react';
import { EventData } from '../types';
import { MetallicDivider, OrnamentalButterfly } from './VectorOrnaments';

interface DressCodeSectionProps {
  event: EventData;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ event }) => {
  return (
    <section className="relative py-3 w-full z-10">
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center text-center">
          {/* Section Heading */}
          <div className="flex items-center gap-1.5 mb-1 text-white">
            <OrnamentalButterfly size={12} className="text-white/85" />
            <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              Estilo de la noche
            </span>
            <div className="transform -scale-x-100 inline-block">
              <OrnamentalButterfly size={12} className="text-white/85" />
            </div>
          </div>

          <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-white uppercase text-center drop-shadow-md">
            Código de Vestimenta
          </h3>

          <div className="my-1.5 scale-90">
            <MetallicDivider />
          </div>

          {/* Content in Translucent Pink Band */}
          <div className="w-full flex flex-col items-center text-center mt-2">
            {/* Dress Code Title Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full banda-rosa-pill mb-2 shadow-sm border border-white/30">
              <Sparkles size={13} className="text-white/85" />
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-white drop-shadow-sm">
                {event.dressCodeTitle}
              </span>
            </div>

            <p className="font-garamond italic text-xs sm:text-sm text-white max-w-md mx-auto mb-3 text-balance leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-medium">
              {event.dressCodeDescription}
            </p>

            {/* Reserved Color Aesthetic Strip */}
            <div className="w-full py-3.5 my-2 border-y border-pink-200/40 text-center flex flex-col items-center">
              <h4 className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-white drop-shadow-[0_1.5px_3px_rgba(20,2,20,0.85)]">
                Color Reservado para Xiomara
              </h4>
              <p className="text-[11px] sm:text-xs text-white/90 mt-1 leading-relaxed text-balance max-w-md drop-shadow-[0_1px_2px_rgba(20,2,20,0.8)]">
                {event.reservedColorWarning}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full banda-rosa-pill text-xs font-bold text-white mt-2 shadow-sm border border-pink-200/50">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-300 to-pink-500 shadow-sm" />
                <span>{event.reservedColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
