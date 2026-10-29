import { EventData } from '../types';

export function createGoogleCalendarUrl(event: EventData): string {
  // Target date parsing
  const startDate = new Date(event.isoDate);
  const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000); // 8 hours party duration

  const formatGoogleDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const title = encodeURIComponent(`Mis 15 Años · ${event.quinceaneraName}`);
  const details = encodeURIComponent(
    `¡Te espero para celebrar mis Quince Años!\nLugar: ${event.venueName}\nDirección: ${event.venueAddress}, ${event.venueCity}\nCódigo de Vestimenta: ${event.dressCodeTitle}`
  );
  const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}, ${event.venueCity}`);
  const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event: EventData) {
  const startDate = new Date(event.isoDate);
  const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

  const formatIcsDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mis 15 Años//Invitacion Gala//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:xv-valen-${Date.now()}@invitacion.gala`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:Mis 15 Años · ${event.quinceaneraName}`,
    `DESCRIPTION:Celebración de Mis 15 Años en ${event.venueName}. Dress code: ${event.dressCodeTitle}.`,
    `LOCATION:${event.venueName}, ${event.venueAddress}, ${event.venueCity}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Mis_15_Anos_${event.quinceaneraName.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
