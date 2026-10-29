import React, { useEffect, useState } from 'react';
import { EventData } from '../types';
import { MetallicDivider, OrnamentalButterfly } from './VectorOrnaments';

interface CountdownSectionProps {
  event: EventData;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ event }) => {
  const calculateTime = (): TimeRemaining => {
    const target = new Date(event.isoDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [time, setTime] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [event.isoDate]);

  const padZero = (n: number) => n.toString().padStart(2, '0');

  const blocks = [
    { label: 'días', value: padZero(time.days) },
    { label: 'horas', value: padZero(time.hours) },
    { label: 'min.', value: padZero(time.minutes) },
    { label: 'seg.', value: padZero(time.seconds) },
  ];

  return (
    <section className="relative py-3 w-full z-10">
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-7 flex flex-col items-center text-center">
          {/* Section Lead */}
          <div className="flex items-center gap-1.5 mb-1 text-white">
            <OrnamentalButterfly size={12} className="text-white/85" />
            <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              Falta muy poco
            </span>
            <div className="transform -scale-x-100 inline-block">
              <OrnamentalButterfly size={12} className="text-white/85" />
            </div>
          </div>

          <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-white uppercase drop-shadow-md">
            Cuenta Regresiva
          </h3>

          <div className="my-1.5 scale-90">
            <MetallicDivider />
          </div>

          {/* Countdown display with distinctly marked cards and separations */}
          <div className="w-full my-3">
            <div className="grid grid-cols-4 gap-2 sm:gap-3.5 text-center w-full">
              {blocks.map((block, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center py-3 sm:py-4 px-1 rounded-2xl bg-black/40 border border-white/45 shadow-xl backdrop-blur-md transition-transform hover:scale-[1.02]"
                  style={{
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <span className="font-cinzel text-2xl sm:text-4xl font-extrabold tabular-nums text-white tracking-tight leading-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    {block.value}
                  </span>
                  <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.15em] font-bold text-white mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Caption */}
          <p className="font-garamond italic text-xs sm:text-sm text-white mt-1 max-w-sm text-balance drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-medium">
            {time.isPast
              ? '¡El gran día ha llegado! Que comience la fiesta.'
              : 'Cada segundo nos acerca a una noche mágica e inolvidable.'}
          </p>
        </div>
      </div>
    </section>
  );
};
