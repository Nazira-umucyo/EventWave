import { createStore } from './create-store';

/**
 * Placeholder auth state. Replace the body of `signIn`/`signUp`/`signOut`
 * with real Firebase Auth calls later — screens only ever call these
 * actions, never touch `state` directly, so the swap is isolated here.
 */
type AuthState = {
  isSignedIn: boolean;
  hasCompletedOnboarding: boolean;
  hasSelectedInterests: boolean;
  hasSelectedLocation: boolean;
};

const store = createStore<AuthState>({
  isSignedIn: false,
  hasCompletedOnboarding: false,
  hasSelectedInterests: false,
  hasSelectedLocation: false,
});

export const authStore = {
  ...store,
  completeOnboarding: () => store.set((s) => ({ ...s, hasCompletedOnboarding: true })),
  signIn: () => store.set((s) => ({ ...s, isSignedIn: true })),
  signUp: () => store.set((s) => ({ ...s, isSignedIn: true })),
  signOut: () =>
    store.set((s) => ({ ...s, isSignedIn: false, hasSelectedInterests: false, hasSelectedLocation: false })),
  completeInterests: () => store.set((s) => ({ ...s, hasSelectedInterests: true })),
  completeLocation: () => store.set((s) => ({ ...s, hasSelectedLocation: true })),
};

export const useAuthState = store.useStore;
