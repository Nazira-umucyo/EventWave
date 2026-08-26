const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));

export function formatDate(iso: string, style: 'long' | 'short' = 'short'): string {
  const d = new Date(iso + 'T00:00:00');
  const month = style === 'long' ? MONTHS[d.getMonth()] : MONTHS_SHORT[d.getMonth()];
  return `${d.getDate()} ${month}, ${String(d.getFullYear()).slice(2)}`;
}

export function formatDateRange(startIso: string, endIso?: string): string {
  if (!endIso || endIso === startIso) return formatDate(startIso);
  const start = new Date(startIso + 'T00:00:00');
  const end = new Date(endIso + 'T00:00:00');
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}-${end.getDate()} ${MONTHS_SHORT[start.getMonth()]}, ${String(start.getFullYear()).slice(2)}`;
  }
  return `${formatDate(startIso)} - ${formatDate(endIso)}`;
}

export function formatWeekday(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  const symbol = currency === 'USD' ? '$' : currency;
  return `${symbol}${amount.toFixed(2)}`;
}

export function formatDayNumber(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return String(d.getDate()).padStart(2, '0');
}

export function formatMonthShort(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return MONTHS_SHORT[d.getMonth()];
}

/**
 * All mock event dates sit in October 2022 (matching the Figma content), so
 * "upcoming vs past" is computed against this fixed reference date rather
 * than the real device clock — otherwise every mock event would show as
 * "past" today. Swap this for `new Date()` once real event data (with
 * current dates) comes from Firebase.
 */
export const MOCK_NOW = new Date('2022-10-09T00:00:00');

export function isUpcoming(iso: string): boolean {
  return new Date(iso + 'T00:00:00') >= MOCK_NOW;
}
