import React, { useState } from 'react';
import { Calendar, ChevronDown, Clock, MapPin, Sparkles } from 'lucide-react';
import { EventData } from '../types';
import { GalaMedallion, OrnamentalButterfly } from './VectorOrnaments';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface HeroSectionProps {
  event: EventData;
  onNotify: (title: string, desc?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ event, onNotify }) => {
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  const handleDownloadIcs = () => {
    downloadIcsFile(event);
    setShowCalendarOptions(false);
    onNotify('Calendario Guardado', 'Se descargó el archivo .ics para Apple/Outlook');
  };

  const handleGoogleCalendar = () => {
    const url = createGoogleCalendarUrl(event);
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowCalendarOptions(false);
    onNotify('Google Calendar', 'Abriendo evento en Google Calendar');
  };

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLocation = () => {
    const el = document.getElementById('ubicacion');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90dvh] flex flex-col items-center justify-center pt-16 pb-6 w-full text-center z-10">
      {/* Soft atmospheric radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full blur-[90px] pointer-events-none opacity-25"
        style={{ background: 'var(--color-resplandor-glow)' }}
        aria-hidden="true"
      />

      {/* Banda Rosa Traslúcida de lado a lado para Máxima Legibilidad */}
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center">
        {/* Kicker: "TE INVITO A CELEBRAR" */}
        <div className="inline-flex items-center justify-center gap-1.5 mb-2 px-3.5 py-1 rounded-full banda-rosa-pill text-[9px] font-cinzel font-bold tracking-[0.2em] uppercase text-white">
          <OrnamentalButterfly size={12} className="text-white/85" />
          <span>Te invito a celebrar</span>
          <div className="transform -scale-x-100 inline-block">
            <OrnamentalButterfly size={12} className="text-white/85" />
          </div>
        </div>

        {/* Central Gala Monogram & Medallion */}
        <div className="my-1.5">
          <GalaMedallion />
        </div>

        {/* Subtitle in Gala Cursive Script with Glow */}
        <h2
          className="font-cursive text-3xl sm:text-4xl text-white mt-1 mb-0.5 select-none leading-none"
          style={{ textShadow: '0 0 16px rgba(255, 255, 255, 0.7), 0 2px 4px rgba(0, 0, 0, 0.9)' }}
        >
          {event.subtitle}
        </h2>

        {/* Quinceañera's Name */}
        <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.14em] uppercase text-white my-1 select-none leading-tight drop-shadow-[0_2px_4px_rgba(20,2,20,0.9)]">
          {event.quinceaneraName}
        </h1>

        {/* Emotional Quote */}
        <div className="my-2.5 px-3 max-w-sm sm:max-w-md text-center">
          <p className="font-garamond italic text-xs sm:text-sm text-white leading-relaxed text-balance drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-medium">
            “{event.emotionalQuote}”
          </p>
        </div>

        {/* Full-width metadata stack - una arriba de la otra */}
        <div className="w-full py-1 my-3 border-y border-pink-200/25">
          <div className="flex flex-col divide-y divide-pink-200/20 text-center w-full">
            {/* 1. Date */}
            <div className="flex flex-col items-center justify-center py-2.5 px-2">
              <div className="flex items-center gap-1.5 text-white/90 mb-0.5">
                <Calendar size={13} className="text-white/80" />
                <span className="text-[9px] font-cinzel uppercase tracking-widest text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  Fecha
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)]">
                {event.dateDisplay}
              </span>
            </div>

            {/* 2. Time */}
            <div className="flex flex-col items-center justify-center py-2.5 px-2">
              <div className="flex items-center gap-1.5 text-white/90 mb-0.5">
                <Clock size={13} className="text-white/80" />
                <span className="text-[9px] font-cinzel uppercase tracking-widest text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  Horario
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)]">
                {event.timeDisplay}
              </span>
            </div>

            {/* 3. Venue */}
            <button
              type="button"
              onClick={scrollToLocation}
              className="flex flex-col items-center justify-center py-2.5 px-2 group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center gap-1.5 text-white/90 mb-0.5">
                <MapPin size={13} className="group-hover:scale-110 transition-transform text-white/80" />
                <span className="text-[9px] font-cinzel uppercase tracking-widest text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  Lugar
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide underline underline-offset-2 decoration-white/60 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)]">
                {event.venueName}
              </span>
            </button>
          </div>
        </div>

        {/* Hero Actions (Confirmar Asistencia + Agendar Fecha) */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-3 w-full">
          {/* Primary RSVP button in baby pink */}
          <button
            onClick={scrollToRsvp}
            className="w-full sm:flex-1 py-3 px-4 rounded-full text-[11px] font-cinzel tracking-[0.14em] uppercase font-bold shadow-lg active:scale-95 transition-all focus:outline-none cursor-pointer flex items-center justify-center gap-1.5 border border-white/70"
            style={{
              background:
                'linear-gradient(135deg, #ffe0ec 0%, #fbcfe8 50%, #f9a8d4 100%)',
              boxShadow:
                '0 4px 18px rgba(251, 207, 232, 0.55)',
              color: '#3b0822',
            }}
          >
            <Sparkles size={13} className="text-[#3b0822]" />
            <span>Confirmar Asistencia</span>
          </button>

          {/* Save Date / Calendar Dropdown Trigger */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowCalendarOptions(!showCalendarOptions)}
              className="w-full sm:w-auto py-3 px-4 rounded-full text-[11px] font-cinzel tracking-[0.1em] uppercase font-bold text-white banda-rosa-pill hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Calendar size={13} />
              <span>Agendar</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${
                  showCalendarOptions ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showCalendarOptions && (
              <div className="absolute top-full mt-1.5 left-0 right-0 sm:left-auto sm:right-0 sm:w-48 banda-rosa-traslucida rounded-xl p-1.5 shadow-2xl z-30 border border-pink-300/40 animate-in fade-in">
                <button
                  onClick={handleGoogleCalendar}
                  className="w-full text-left px-3 py-2 text-[11px] font-medium rounded-lg text-white hover:bg-white/15 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  Google Calendar
                </button>
                <button
                  onClick={handleDownloadIcs}
                  className="w-full text-left px-3 py-2 text-[11px] font-medium rounded-lg text-white hover:bg-white/15 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-300" />
                  Apple / Outlook (.ics)
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-5 opacity-70 animate-bounce">
        <ChevronDown size={18} className="text-white" />
      </div>
    </section>
  );
};
