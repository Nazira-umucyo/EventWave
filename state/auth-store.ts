import { createStore } from './create-store';

type AuthState = {
  isSignedIn: boolean;
  hasCompletedOnboarding: boolean;
  hasSelectedInterests: boolean;
  hasSelectedLocation: boolean;
  fullName: string;
  email: string;
  about: string;
  interests: string[];
  avatarUri: string | null;
};

const store = createStore<AuthState>({
  isSignedIn: false,
  hasCompletedOnboarding: false,
  hasSelectedInterests: false,
  hasSelectedLocation: false,
  fullName: '',
  email: '',
  about: '',
  interests: [],
  avatarUri: null,
});

function nameFromEmail(email: string) {
  const local = email.split('@')[0] ?? '';
  return local
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export const authStore = {
  ...store,
  completeOnboarding: () => store.set((s) => ({ ...s, hasCompletedOnboarding: true })),
  signIn: (email: string) =>
    store.set((s) => ({
      ...s,
      isSignedIn: true,
      email,
      fullName: s.fullName || nameFromEmail(email),
    })),
  signUp: (data: { fullName: string; email: string }) =>
    store.set((s) => ({ ...s, isSignedIn: true, fullName: data.fullName, email: data.email })),
  signOut: () =>
    store.set((s) => ({
      ...s,
      isSignedIn: false,
      hasSelectedInterests: false,
      hasSelectedLocation: false,
    })),
  completeInterests: (interests: string[]) =>
    store.set((s) => ({ ...s, hasSelectedInterests: true, interests })),
  completeLocation: () => store.set((s) => ({ ...s, hasSelectedLocation: true })),
  updateAbout: (about: string) => store.set((s) => ({ ...s, about })),
  updateAvatar: (avatarUri: string) => store.set((s) => ({ ...s, avatarUri })),
};

export const useAuthState = store.useStore;