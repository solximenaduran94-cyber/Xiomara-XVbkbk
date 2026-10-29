import React, { useState } from 'react';
import { CheckCircle2, Music, Send, User, Users, XCircle } from 'lucide-react';
import { EventData } from '../types';
import { MetallicDivider, OrnamentalFlower } from './VectorOrnaments';

interface RsvpSectionProps {
  event: EventData;
  onNotify: (title: string, desc?: string) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ event, onNotify }) => {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [companions, setCompanions] = useState('1');
  const [favoriteSong, setFavoriteSong] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      onNotify('Nombre Requerido', 'Por favor ingresá tu nombre y apellido');
      return;
    }

    const attendingText = attending === 'yes' ? '¡Sí, confirmo mi asistencia! 🎉' : 'Lamentablemente no podré asistir 😢';
    
    let message = `👑 *CONFIRMACIÓN DE ASISTENCIA · MIS 15 AÑOS*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Invitado:* ${fullName.trim()}\n`;
    message += `✨ *¿Asiste?:* ${attendingText}\n`;
    
    if (attending === 'yes') {
      message += `👥 *Lugares confirmados:* ${companions} persona(s)\n`;
      if (favoriteSong.trim()) {
        message += `🎵 *Canción recomendada:* "${favoriteSong.trim()}"\n`;
      }
    }
    
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `¡Muchas gracias por organizar esta noche tan soñada! 💕`;

    const cleanPhone = event.organizerWhatsApp.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
    onNotify('RSVP Generado', 'Abriendo WhatsApp para enviar confirmación');
  };

  return (
    <section id="rsvp" className="relative py-3 w-full z-10 scroll-mt-16">
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center">
          {/* Section Heading */}
        <div className="flex items-center gap-1.5 mb-1 text-white">
          <OrnamentalFlower size={12} className="text-white/85" />
          <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
            Asegurá tu lugar
          </span>
          <OrnamentalFlower size={12} className="text-white/85" />
        </div>

        <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-white uppercase text-center drop-shadow-md">
          Confirmación de Asistencia
        </h3>

        <div className="my-1.5 scale-90">
          <MetallicDivider />
        </div>

        <p className="font-garamond italic text-xs sm:text-sm text-white text-center max-w-md mx-auto mb-4 text-balance drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-medium">
          Por favor confirmá tu asistencia para preparar tu lugar y todos los detalles de la fiesta.
        </p>

        {/* Form presentation inside Translucent Pink Band */}
        <div className="w-full mt-1">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 text-left text-xs">
            {/* Field 1: Full Name */}
            <div>
              <label className="block text-[9px] font-cinzel uppercase tracking-wider text-white font-bold mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                Nombre y Apellido <span className="text-white/80">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/80">
                  <User size={14} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sofía Martínez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl banda-rosa-input placeholder-white/50 text-xs sm:text-sm font-sans text-white"
                />
              </div>
            </div>

            {/* Field 2: Attendance Selector - Una arriba de la otra para máxima legibilidad */}
            <div>
              <label className="block text-[9px] font-cinzel uppercase tracking-wider text-white font-bold mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                ¿Asistís al festejo? <span className="text-white/80">*</span>
              </label>
              <div className="flex flex-col gap-2.5 w-full">
                {/* Option YES */}
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer w-full ${
                    attending === 'yes'
                      ? 'bg-pink-600/40 border-pink-200 text-white shadow-lg ring-1 ring-pink-200/70'
                      : 'bg-black/40 border-white/25 text-white hover:border-white/50 hover:bg-black/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={20}
                      className={attending === 'yes' ? 'text-white' : 'text-white/50'}
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold block leading-tight text-white drop-shadow-sm">
                        ¡Sí, confirmo mi asistencia!
                      </span>
                      <span className="text-[10px] text-white/90 block mt-0.5">
                        Voy a estar presente para celebrar tus 15
                      </span>
                    </div>
                  </div>
                  {attending === 'yes' && (
                    <span className="text-[9px] font-cinzel uppercase tracking-widest text-white font-bold px-2.5 py-0.5 rounded-full bg-pink-400/30 border border-white/50 shrink-0">
                      Seleccionado
                    </span>
                  )}
                </button>

                {/* Option NO */}
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer w-full ${
                    attending === 'no'
                      ? 'bg-rose-950/70 border-rose-300 text-white shadow-lg ring-1 ring-rose-200/70'
                      : 'bg-black/40 border-white/25 text-white hover:border-white/50 hover:bg-black/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <XCircle
                      size={20}
                      className={attending === 'no' ? 'text-rose-200' : 'text-white/50'}
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold block leading-tight text-white drop-shadow-sm">
                        Lamentablemente no podré ir
                      </span>
                      <span className="text-[10px] text-white/90 block mt-0.5">
                        Avisar con anticipación
                      </span>
                    </div>
                  </div>
                  {attending === 'no' && (
                    <span className="text-[9px] font-cinzel uppercase tracking-widest text-white font-bold px-2.5 py-0.5 rounded-full bg-rose-500/30 border border-white/50 shrink-0">
                      Seleccionado
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Conditional fields if attending */}
            {attending === 'yes' && (
              <div className="flex flex-col gap-3 pt-1 animate-in fade-in duration-200">
                {/* Companions */}
                <div>
                  <label className="block text-[9px] font-cinzel uppercase tracking-wider text-white font-bold mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    Lugares a Confirmar
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/80">
                      <Users size={14} />
                    </div>
                    <select
                      value={companions}
                      onChange={(e) => setCompanions(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-xl banda-rosa-input text-xs sm:text-sm font-sans cursor-pointer text-white"
                    >
                      <option value="1" className="bg-[#350a2b]">1 Persona</option>
                      <option value="2" className="bg-[#350a2b]">2 Personas</option>
                      <option value="3" className="bg-[#350a2b]">3 Personas</option>
                      <option value="4" className="bg-[#350a2b]">4 Personas</option>
                      <option value="5+" className="bg-[#350a2b]">5+ Personas</option>
                    </select>
                  </div>
                </div>

                {/* Favorite Song */}
                <div>
                  <label className="block text-[9px] font-cinzel uppercase tracking-wider text-white font-bold mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    Canción sugerida para la fiesta
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/80">
                      <Music size={14} />
                    </div>
                    <input
                      type="text"
                      placeholder="Ej: Tema para no parar de bailar"
                      value={favoriteSong}
                      onChange={(e) => setFavoriteSong(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-xl banda-rosa-input placeholder-white/50 text-xs sm:text-sm font-sans text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Direct WhatsApp RSVP Button - Cambiado de color para combinar con la invitación */}
            <button
              type="submit"
              className="mt-2 w-full py-3.5 px-4 rounded-xl text-[11px] sm:text-xs font-cinzel font-bold tracking-wider uppercase text-white shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-pink-200/80"
              style={{
                background:
                  'linear-gradient(135deg, #f472b6 0%, #db2777 50%, #9d174d 100%)',
                boxShadow: '0 6px 24px rgba(219, 39, 119, 0.45)',
              }}
            >
              <Send size={15} className="text-white drop-shadow-sm" />
              <span className="drop-shadow-sm">Enviar Confirmación por WhatsApp</span>
            </button>

            {isSubmitted && (
              <p className="text-center text-xs text-pink-200 mt-1 flex items-center justify-center gap-1 font-semibold">
                <CheckCircle2 size={14} />
                <span>¡Confirmación enviada con éxito!</span>
              </p>
            )}
          </form>
        </div>
        </div>
      </div>
    </section>
  );
};
