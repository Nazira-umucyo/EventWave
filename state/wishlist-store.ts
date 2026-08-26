import { createStore } from './create-store';

const store = createStore<Set<string>>(new Set());

export const wishlistStore = {
  ...store,
  toggle: (eventId: string) =>
    store.set((prev) => {
      const next = new Set(prev);
      next.has(eventId) ? next.delete(eventId) : next.add(eventId);
      return next;
    }),
  isWishlisted: (eventId: string) => store.get().has(eventId),
};

export const useWishlist = store.useStore;
