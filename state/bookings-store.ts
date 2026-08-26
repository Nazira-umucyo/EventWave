import { createStore } from './create-store';
import type { Booking } from '@/data/types';

const store = createStore<Booking[]>([]);

export const bookingsStore = {
  ...store,
  add: (booking: Booking) => store.set((prev) => [booking, ...prev]),
  getForEvent: (eventId: string) => store.get().find((b) => b.eventId === eventId),
};

export const useBookings = store.useStore;
