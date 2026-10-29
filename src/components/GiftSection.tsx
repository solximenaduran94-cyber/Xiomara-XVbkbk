import React, { useState } from 'react';
import { Check, Copy, Gift, ShieldCheck } from 'lucide-react';
import { EventData } from '../types';
import { MetallicDivider, OrnamentalButterfly } from './VectorOrnaments';

interface GiftSectionProps {
  event: EventData;
  onNotify: (title: string, desc?: string) => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ event, onNotify }) => {
  const [copiedAlias, setCopiedAlias] = useState(false);

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(event.bankInfo.alias);
    setCopiedAlias(true);
    onNotify('¡Alias Copiado!', `${event.bankInfo.alias} copiado al portapapeles`);
    setTimeout(() => setCopiedAlias(false), 2500);
  };

  return (
    <section className="relative py-3 w-full z-10">
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center">
          {/* Section Heading */}
          <div className="flex items-center gap-1.5 mb-1 text-white">
            <OrnamentalButterfly size={12} className="text-white/85" />
            <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              Presentes & Buenos Deseos
            </span>
            <div className="transform -scale-x-100 inline-block">
              <OrnamentalButterfly size={12} className="text-white/85" />
            </div>
          </div>

          <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-white uppercase text-center drop-shadow-md">
            Regalos & Colaboración
          </h3>

          <div className="my-1.5 scale-90">
            <MetallicDivider />
          </div>

          {/* Content in Translucent Pink Band */}
          <div className="w-full flex flex-col items-center text-center mt-2">
            {/* Gift Icon Emblem */}
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/15 border border-white/40 mb-2 text-white shadow-sm">
              <Gift size={20} className="text-white" />
            </div>

            <p className="font-garamond italic text-xs sm:text-sm text-white max-w-md mx-auto leading-relaxed mb-3 text-balance drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-medium">
              “Tu presencia es mi mayor regalo. Pero si deseás colaborar con mis proyectos y viaje soñado, podés hacerlo a través de:”
            </p>

            {/* Bank Details */}
            <div className="w-full py-3 my-2 border-y border-pink-200/25 flex flex-col gap-3 text-left">
              {/* Titular & Entidad */}
              <div className="flex items-center justify-between text-xs pb-2 border-b border-pink-200/20">
                <div>
                  <span className="text-[9px] font-cinzel uppercase tracking-wider text-white font-bold block drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    Titular & Entidad
                  </span>
                  <span className="font-bold text-white text-xs sm:text-sm drop-shadow-[0_1.5px_3px_rgba(20,2,20,0.85)]">
                    {event.bankInfo.accountHolder} · {event.bankInfo.bankName}
                  </span>
                </div>
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              </div>

              {/* ALIAS Highlight Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 py-1">
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-cinzel uppercase tracking-widest text-white font-bold block drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    ALIAS BANCARIO
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tracking-normal block select-all break-all mt-0.5 drop-shadow-[0_1.5px_3px_rgba(20,2,20,0.85)]">
                    {event.bankInfo.alias}
                  </span>
                </div>

                <button
                  onClick={handleCopyAlias}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-[10px] font-cinzel font-bold tracking-wider uppercase shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 border border-white/70"
                  style={{
                    background:
                      'linear-gradient(135deg, #ffe0ec 0%, #fbcfe8 50%, #f9a8d4 100%)',
                    boxShadow:
                      '0 4px 18px rgba(251, 207, 232, 0.55)',
                    color: '#3b0822',
                  }}
                >
                  {copiedAlias ? <Check size={13} className="text-[#3b0822]" /> : <Copy size={13} className="text-[#3b0822]" />}
                  <span>{copiedAlias ? '¡Copiado!' : 'Copiar Alias'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
