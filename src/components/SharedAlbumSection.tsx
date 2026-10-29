import React from 'react';
import { Camera, UploadCloud } from 'lucide-react';
import { EventData } from '../types';
import { MetallicDivider, OrnamentalButterfly } from './VectorOrnaments';

interface SharedAlbumSectionProps {
  event: EventData;
  onNotify: (title: string, desc?: string) => void;
}

export const SharedAlbumSection: React.FC<SharedAlbumSectionProps> = ({ event, onNotify }) => {
  const handleOpenAlbum = () => {
    window.open(event.sharedAlbumUrl, '_blank', 'noopener,noreferrer');
    onNotify('Álbum Digital', 'Abriendo carpeta compartida para fotos');
  };

  return (
    <section className="relative py-3 w-full z-10">
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center text-center">
          {/* Section Heading */}
          <div className="flex items-center gap-1.5 mb-1 text-white">
            <OrnamentalButterfly size={12} className="text-white/85" />
            <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              Recuerdos Compartidos
            </span>
            <div className="transform -scale-x-100 inline-block">
              <OrnamentalButterfly size={12} className="text-white/85" />
            </div>
          </div>

          <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-white uppercase text-center drop-shadow-md">
            Álbum de Fotos
          </h3>

          <div className="my-1.5 scale-90">
            <MetallicDivider />
          </div>

          {/* Content in Translucent Pink Band */}
          <div className="w-full flex flex-col items-center text-center mt-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/15 border border-white/40 mb-2.5 text-white shadow-md">
              <Camera size={22} className="text-white" />
            </div>

            <h4 className="font-cinzel text-sm sm:text-base font-bold text-white mb-1 drop-shadow-sm">
              ¡Capturá cada momento mágico!
            </h4>

            <p className="font-garamond italic text-xs sm:text-sm text-white max-w-md mx-auto leading-relaxed mb-4 text-balance drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-medium">
              Compartí todas las fotos y videos que tomes durante la noche para revivir juntos cada instante.
            </p>

            {/* Action CTA: Subir Fotos */}
            <div className="w-full max-w-xs mx-auto">
              <button
                onClick={handleOpenAlbum}
                className="w-full py-3.5 px-5 rounded-xl text-[11px] font-cinzel font-bold tracking-wider uppercase shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/80"
                style={{
                  background:
                    'linear-gradient(135deg, #ffe0ec 0%, #fbcfe8 50%, #f9a8d4 100%)',
                  boxShadow:
                    '0 4px 20px rgba(251, 207, 232, 0.6)',
                  color: '#3b0822',
                }}
              >
                <UploadCloud size={16} className="text-[#3b0822]" />
                <span>Subir Fotos al Álbum</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
