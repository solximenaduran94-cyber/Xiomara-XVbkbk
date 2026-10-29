import React, { useEffect, useState } from 'react';
import { Heart, Send, Trash2, User } from 'lucide-react';
import { Dedication } from '../types';
import { MetallicDivider, OrnamentalButterfly } from './VectorOrnaments';

interface GuestbookSectionProps {
  onNotify: (title: string, desc?: string) => void;
}

const STORAGE_KEY = 'xv_xiomara_real_messages_v1';

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({ onNotify }) => {
  const [dedications, setDedications] = useState<Dedication[]>(() => {
    try {
      localStorage.removeItem('xv_xiomara_dedications');
      localStorage.removeItem('xv_xiomara_dedications_v2');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed)
          ? parsed.filter(
              (item: Dedication) =>
                !['ded-1', 'ded-2', 'ded-3', 'ded-4'].includes(item.id)
            )
          : [];
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [author, setAuthor] = useState('');
  const [relationship, setRelationship] = useState('Amigo / Amiga');
  const [message, setMessage] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dedications));
    } catch {
      // ignore
    }
  }, [dedications]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      onNotify('Campos requeridos', 'Por favor ingresá tu nombre y dedicatoria');
      return;
    }

    const newDedication: Dedication = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      author: author.trim(),
      relationship: relationship.trim() || 'Invitado',
      message: message.trim(),
      timestamp: 'Recién',
      likes: 1,
    };

    setDedications((prev) => [newDedication, ...prev]);
    setAuthor('');
    setMessage('');
    onNotify('¡Dedicatoria Publicada!', 'Tu mensaje ya brilla en el libro de recuerdos');
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setDedications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const handleDeleteMessage = (id: string) => {
    setDedications((prev) => prev.filter((item) => item.id !== id));
    onNotify('Mensaje eliminado', 'El mensaje fue quitado');
  };

  return (
    <section className="relative py-3 w-full z-10">
      <div className="banda-rosa-traslucida w-full relative shadow-2xl">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center">
          {/* Section Heading */}
        <div className="flex items-center gap-1.5 mb-1 text-white">
          <OrnamentalButterfly size={12} className="text-white/85" />
          <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
            Libro de Recuerdos
          </span>
          <div className="transform -scale-x-100 inline-block">
            <OrnamentalButterfly size={12} className="text-white/85" />
          </div>
        </div>

        <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-white uppercase text-center drop-shadow-md">
          Muro de Deseos
        </h3>

        <div className="my-1.5 scale-90">
          <MetallicDivider />
        </div>

        <p className="font-garamond italic text-xs sm:text-sm text-white text-center max-w-md mx-auto mb-4 text-balance drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-medium">
          Dejale a Xiomara tus palabras de cariño y buenos deseos para sus 15 años.
        </p>

        {/* Dedication Form */}
        <div className="w-full mb-5">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 text-left text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[9px] font-cinzel uppercase tracking-wider text-white font-bold mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  Tu Nombre <span className="text-white/80">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/80">
                    <User size={14} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Lucía, Familia..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl banda-rosa-input placeholder-white/50 text-xs sm:text-sm font-sans text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-cinzel uppercase tracking-wider text-white font-bold mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  Vínculo
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl banda-rosa-input text-xs sm:text-sm font-sans cursor-pointer text-white"
                >
                  <option value="Amigo / Amiga" className="bg-[#350a2b]">Amigo / Amiga</option>
                  <option value="Familia" className="bg-[#350a2b]">Familia</option>
                  <option value="Primos" className="bg-[#350a2b]">Primos</option>
                  <option value="Tíos" className="bg-[#350a2b]">Tíos</option>
                  <option value="Compañeros" className="bg-[#350a2b]">Compañeros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-cinzel uppercase tracking-wider text-white font-bold mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                Tu Mensaje <span className="text-white/80">*</span>
              </label>
              <textarea
                rows={2}
                required
                placeholder="Escribí aquí tus deseos para Xiomara..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl banda-rosa-input placeholder-white/50 text-xs sm:text-sm font-sans resize-none text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full py-3 px-4 rounded-xl text-[10px] sm:text-[11px] font-cinzel font-bold tracking-wider uppercase shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/70"
              style={{
                background:
                  'linear-gradient(135deg, #ffe0ec 0%, #fbcfe8 50%, #f9a8d4 100%)',
                boxShadow:
                  '0 4px 18px rgba(251, 207, 232, 0.55)',
                color: '#3b0822',
              }}
            >
              <Send size={13} className="text-[#3b0822]" />
              <span>Publicar Mensaje</span>
            </button>
          </form>
        </div>

        {/* Public Wall of Dedications */}
        {dedications.length === 0 ? (
          <div className="w-full text-center py-4 px-3 border-t border-pink-200/25 flex flex-col items-center">
            <p className="font-garamond italic text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(20,2,20,0.8)]">
              Sé el primero en inaugurar el libro de recuerdos para Xiomara.
            </p>
          </div>
        ) : (
          <div className="w-full divide-y divide-pink-200/20 border-t border-pink-200/25">
            {dedications.map((item) => (
              <div
                key={item.id}
                className="py-3.5 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-[0_1.5px_3px_rgba(20,2,20,0.85)]">
                      {item.author}
                    </span>
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full banda-rosa-pill text-white font-bold">
                      {item.relationship}
                    </span>
                  </div>

                  <p className="font-garamond italic text-xs sm:text-sm text-white leading-relaxed break-words drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] font-medium">
                    “{item.message}”
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-1.5 text-[9px] text-white/90 font-medium">
                  <span>{item.timestamp}</span>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center gap-1 transition-colors cursor-pointer ${
                        likedMap[item.id] ? 'text-pink-300 font-bold' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <Heart
                        size={13}
                        className={likedMap[item.id] ? 'fill-pink-400 text-pink-400' : ''}
                      />
                      <span>{item.likes}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteMessage(item.id)}
                      className="text-white/40 hover:text-red-400 transition-colors p-1"
                      title="Eliminar"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  );
};
