import React from 'react';
import { ChevronUp } from 'lucide-react';
import { EventData } from '../types';
import { MetallicDivider, OrnamentalButterfly, OrnamentalFlower } from './VectorOrnaments';

interface FooterProps {
  event: EventData;
}

export const Footer: React.FC<FooterProps> = ({ event }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-4 pb-12 w-full z-10 text-center select-none">
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center">
          {/* Ornamental Flanks */}
          <div className="flex items-center justify-center gap-3 mb-2 text-white/85">
            <div className="transform -scale-x-100">
              <OrnamentalButterfly size={20} />
            </div>
            <OrnamentalFlower size={18} />
            <div>
              <OrnamentalButterfly size={20} />
            </div>
          </div>

          {/* Calligraphic phrase */}
          <p
            className="font-cursive text-2xl sm:text-3xl text-white my-1 drop-shadow-md"
            style={{ textShadow: '0 0 16px rgba(255, 255, 255, 0.75), 0 2px 4px rgba(0, 0, 0, 0.85)' }}
          >
            ¡Te espero para festejar juntos!
          </p>

          {/* Signature */}
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-white mt-1 drop-shadow-sm">
            {event.quinceaneraName} · {event.subtitle}
          </p>

          <div className="my-3 scale-80">
            <MetallicDivider />
          </div>

          {/* Return to top */}
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-1.5 text-[9px] font-cinzel uppercase tracking-widest text-white hover:text-white transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full banda-rosa-pill flex items-center justify-center border border-white/30 group-hover:border-white transition-colors shadow-sm">
              <ChevronUp size={14} className="text-white" />
            </div>
            <span className="font-bold">Volver Arriba</span>
          </button>

          <p className="text-[10px] text-white/80 font-sans mt-4 drop-shadow-sm font-medium">
            Invitación de Gala · XV Años de {event.quinceaneraName}
          </p>
        </div>
      </div>
    </footer>
  );
};
