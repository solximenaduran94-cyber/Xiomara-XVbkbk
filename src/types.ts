export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  colors: {
    fondoBase: string;
    fondoGradienteStart: string;
    fondoGradienteEnd: string;
    resplandorGlow: string;
    resplandorGlowRgb: string;
    acentoSecundario: string;
    acentoSecundarioRgb: string;
    metalAcento: string;
    metalLight: string;
    metalDark: string;
    tarjetaGlass: string;
    tarjetaBorde: string;
    textoTitulo: string;
    textoMuted: string;
  };
}

export interface EventData {
  quinceaneraName: string;
  subtitle: string;
  emotionalQuote: string;
  dateDisplay: string;
  timeDisplay: string;
  endTimeDisplay: string;
  isoDate: string; // "2026-11-21T21:00:00"
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string;
  dressCodeTitle: string;
  dressCodeDescription: string;
  reservedColor: string;
  reservedColorWarning: string;
  bankInfo: {
    bankName: string;
    accountHolder: string;
    alias: string;
    cbu: string;
  };
  sharedAlbumUrl: string;
  organizerWhatsApp: string; // e.g. "5492994222654"
  musicYoutubeUrl?: string;
  musicYoutubeId?: string;
}

export interface Dedication {
  id: string;
  author: string;
  relationship: string;
  message: string;
  timestamp: string;
  likes: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

export type BackgroundType = 'uploaded-image' | 'crystal-flowers' | 'video';
export type BackgroundFitMode = 'cover' | 'contain';
export type BackgroundOverlayIntensity = 'soft' | 'medium' | 'intense';
