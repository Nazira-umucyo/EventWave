/**
 * Minimal store factory shared by every state module in this folder.
 *
 * There's no backend yet, and pulling in a state-management dependency
 * wasn't part of the brief, so this leans on React's built-in
 * `useSyncExternalStore` instead. Every store below follows the same
 * shape: a plain object, a set of listeners, and get/set/subscribe.
 *
 * When Firebase is wired in, the `set()` calls in each store's actions are
 * the natural place to also fire off the corresponding Firestore read/write
 * — the screens themselves won't need to change.
 */

import { useSyncExternalStore } from 'react';

export function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((l) => l());

  return {
    get: () => state,
    set: (updater: T | ((prev: T) => T)) => {
      state = typeof updater === 'function' ? (updater as (prev: T) => T)(state) : updater;
      emit();
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    useStore: () => useSyncExternalStore(
      (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      () => state
    ),
  };
}
