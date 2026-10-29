import { ColorPalette } from '../types';

export const PALETTES: ColorPalette[] = [
  {
    id: 'lila-flores-mariposas',
    name: 'Lila Real & Flores y Mariposas (Predeterminada)',
    description: 'Atmósfera mágica en tonos lila resplandeciente, pétalos primaverales, violeta amatista y blanco nupcial.',
    colors: {
      fondoBase: '#0d041c',
      fondoGradienteStart: '#250a47',
      fondoGradienteEnd: '#4a157d',
      resplandorGlow: '#e879f9',
      resplandorGlowRgb: '232, 121, 249',
      acentoSecundario: '#c084fc',
      acentoSecundarioRgb: '192, 132, 252',
      metalAcento: '#f5d0fe',
      metalLight: '#ffffff',
      metalDark: '#a855f7',
      tarjetaGlass: 'rgba(28, 11, 52, 0.84)',
      tarjetaBorde: 'rgba(232, 121, 249, 0.32)',
      textoTitulo: '#ffffff',
      textoMuted: '#fae8ff',
    },
  },
  {
    id: 'lila-lavanda-luminosa',
    name: 'Lavanda & Pétalos de Rosa',
    description: 'Tonalidades suaves en lila pastel, rosa orquídea y destellos perlados de alta costura.',
    colors: {
      fondoBase: '#120624',
      fondoGradienteStart: '#2e1053',
      fondoGradienteEnd: '#5b1e8e',
      resplandorGlow: '#f0abfc',
      resplandorGlowRgb: '240, 171, 252',
      acentoSecundario: '#d946ef',
      acentoSecundarioRgb: '217, 70, 239',
      metalAcento: '#fdf4ff',
      metalLight: '#ffffff',
      metalDark: '#c084fc',
      tarjetaGlass: 'rgba(32, 12, 58, 0.82)',
      tarjetaBorde: 'rgba(240, 171, 252, 0.35)',
      textoTitulo: '#ffffff',
      textoMuted: '#f5d0fe',
    },
  },
  {
    id: 'violeta-blanco-puro',
    name: 'Violeta Profundo & Blanco Nácar',
    description: 'Contraste señorial en violeta medianoche con mariposas en blanco níveo y destellos plateados.',
    colors: {
      fondoBase: '#090214',
      fondoGradienteStart: '#1d0833',
      fondoGradienteEnd: '#3b0764',
      resplandorGlow: '#c084fc',
      resplandorGlowRgb: '192, 132, 252',
      acentoSecundario: '#9333ea',
      acentoSecundarioRgb: '147, 51, 234',
      metalAcento: '#ede9fe',
      metalLight: '#ffffff',
      metalDark: '#7e22ce',
      tarjetaGlass: 'rgba(22, 7, 40, 0.86)',
      tarjetaBorde: 'rgba(192, 132, 252, 0.28)',
      textoTitulo: '#ffffff',
      textoMuted: '#e9d5ff',
    },
  },
  {
    id: 'rosa-champagne',
    name: 'Rosa Bebé Pastel & Cristal',
    description: 'Elegancia etérea con bandas translúcidas de cristal, pétalos en rosa bebé pastel y destellos perlados.',
    colors: {
      fondoBase: '#12040e',
      fondoGradienteStart: '#26071c',
      fondoGradienteEnd: '#420c30',
      resplandorGlow: '#fbcfe8',
      resplandorGlowRgb: '251, 207, 232',
      acentoSecundario: '#f472b6',
      acentoSecundarioRgb: '244, 114, 182',
      metalAcento: '#fdf2f8',
      metalLight: '#ffffff',
      metalDark: '#f9a8d4',
      tarjetaGlass: 'rgba(255, 235, 245, 0.16)',
      tarjetaBorde: 'rgba(255, 220, 238, 0.42)',
      textoTitulo: '#ffffff',
      textoMuted: '#fce7f3',
    },
  },
  {
    id: 'zafiro-plata',
    name: 'Noche Zafiro & Flores de Plata',
    description: 'Azul noche profundo con mariposas de plata y destellos celestes.',
    colors: {
      fondoBase: '#030712',
      fondoGradienteStart: '#081438',
      fondoGradienteEnd: '#0c2461',
      resplandorGlow: '#38bdf8',
      resplandorGlowRgb: '56, 189, 248',
      acentoSecundario: '#2563eb',
      acentoSecundarioRgb: '37, 99, 235',
      metalAcento: '#e2e8f0',
      metalLight: '#ffffff',
      metalDark: '#94a3b8',
      tarjetaGlass: 'rgba(3, 7, 18, 0.78)',
      tarjetaBorde: 'rgba(226, 232, 240, 0.22)',
      textoTitulo: '#ffffff',
      textoMuted: '#bae6fd',
    },
  },
];

export function applyPaletteToDocument(palette: ColorPalette) {
  const root = document.documentElement;
  const { colors } = palette;
  root.style.setProperty('--color-fondo-base', colors.fondoBase);
  root.style.setProperty('--color-fondo-grad-1', colors.fondoGradienteStart);
  root.style.setProperty('--color-fondo-grad-2', colors.fondoGradienteEnd);
  root.style.setProperty('--color-resplandor-glow', colors.resplandorGlow);
  root.style.setProperty('--color-resplandor-glow-rgb', colors.resplandorGlowRgb);
  root.style.setProperty('--color-acento-secundario', colors.acentoSecundario);
  root.style.setProperty('--color-acento-secundario-rgb', colors.acentoSecundarioRgb);
  root.style.setProperty('--color-metal-acento', colors.metalAcento);
  root.style.setProperty('--color-metal-light', colors.metalLight);
  root.style.setProperty('--color-metal-dark', colors.metalDark);
  root.style.setProperty('--color-tarjeta-glass', colors.tarjetaGlass);
  root.style.setProperty('--color-tarjeta-borde', colors.tarjetaBorde);
  root.style.setProperty('--color-texto-titulo', colors.textoTitulo);
  root.style.setProperty('--color-texto-muted', colors.textoMuted);
  root.style.setProperty('--theme-name', palette.name);
}
