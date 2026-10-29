import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { ToastMessage } from '../types';
import { OrnamentalButterfly } from './VectorOrnaments';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-22 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto glass-panel border border-[var(--color-resplandor-glow)]/40 p-3.5 rounded-2xl shadow-2xl flex items-start gap-3 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
          style={{
            background: 'var(--color-tarjeta-glass)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 18px rgba(var(--color-resplandor-glow-rgb), 0.35)',
          }}
        >
          <div className="p-1 rounded-full bg-[var(--color-resplandor-glow)]/20 text-[var(--color-resplandor-glow)] shrink-0 mt-0.5">
            {toast.type === 'info' ? <OrnamentalButterfly size={16} /> : <CheckCircle2 size={16} />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[var(--color-texto-titulo)] leading-snug">
              {toast.title}
            </h4>
            {toast.description && (
              <p className="text-xs text-[var(--color-texto-muted)] mt-0.5 leading-relaxed">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[var(--color-texto-muted)] hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
