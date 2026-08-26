import { createStore } from './create-store';
import type { EventTicketTier, PaymentMethodType, SavedCard } from '@/data/types';

/**
 * Carries state through the multi-screen booking flow:
 * Buy Ticket -> Covid Declaration -> Payment -> (Add Card) -> Ticket.
 */
type CheckoutState = {
  eventId: string | null;
  tierId: EventTicketTier['id'] | null;
  seats: number;
  covidConfirmed: boolean;
  paymentMethod: PaymentMethodType | null;
  voucherCode: string | null;
  voucherApplied: boolean;
  savedCards: SavedCard[];
};

const store = createStore<CheckoutState>({
  eventId: null,
  tierId: null,
  seats: 1,
  covidConfirmed: false,
  paymentMethod: null,
  voucherCode: null,
  voucherApplied: false,
  savedCards: [
    { id: 'card-1', brand: 'visa', holder: 'Peter Crouch', last4: '3090', expiry: '09/24' },
  ],
});

export const checkoutStore = {
  ...store,
  start: (eventId: string, tierId: EventTicketTier['id']) =>
    store.set((s) => ({ ...s, eventId, tierId, seats: 1, covidConfirmed: false, voucherApplied: false })),
  setSeats: (seats: number) => store.set((s) => ({ ...s, seats: Math.max(1, seats) })),
  confirmCovid: () => store.set((s) => ({ ...s, covidConfirmed: true })),
  setPaymentMethod: (method: PaymentMethodType) => store.set((s) => ({ ...s, paymentMethod: method })),
  applyVoucher: (code: string) => store.set((s) => ({ ...s, voucherCode: code, voucherApplied: true })),
  removeVoucher: () => store.set((s) => ({ ...s, voucherCode: null, voucherApplied: false })),
  addCard: (card: SavedCard) =>
    store.set((s) => ({ ...s, savedCards: [...s.savedCards, card], paymentMethod: 'card' })),
  reset: () =>
    store.set((s) => ({
      ...s,
      eventId: null,
      tierId: null,
      seats: 1,
      covidConfirmed: false,
      paymentMethod: null,
      voucherCode: null,
      voucherApplied: false,
    })),
};

export const useCheckoutState = store.useStore;
