import { createStore } from './create-store';
import { auth, db } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

type AuthState = {
  isSignedIn: boolean;
  isInitializing: boolean;
  hasCompletedOnboarding: boolean;
  hasSelectedInterests: boolean;
  hasSelectedLocation: boolean;
  uid: string | null;
  fullName: string;
  email: string;
  emailVerified: boolean;
  about: string;
  interests: string[];
  avatarUri: string | null;
};

const store = createStore<AuthState>({
  isSignedIn: false,
  isInitializing: true,
  hasCompletedOnboarding: false,
  hasSelectedInterests: false,
  hasSelectedLocation: false,
  uid: null,
  fullName: '',
  email: '',
  emailVerified: false,
  about: '',
  interests: [],
  avatarUri: null,
});

async function loadUserProfile(uid: string) {
  const snap = await getDoc(doc(db, 'users', uid));
  if (snap.exists()) {
    return snap.data() as Partial<AuthState>;
  }
  return {};
}

export const authStore = {
  ...store,

  completeOnboarding: () => store.set((s) => ({ ...s, hasCompletedOnboarding: true })),

  signUp: async (data: { fullName: string; email: string; password: string }) => {
    const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const uid = credential.user.uid;

    await sendEmailVerification(credential.user);

    await setDoc(doc(db, 'users', uid), {
      fullName: data.fullName,
      email: data.email,
      about: '',
      interests: [],
      avatarUri: null,
    });

    store.set((s) => ({
      ...s,
      isSignedIn: true,
      uid,
      fullName: data.fullName,
      email: data.email,
      emailVerified: false,
      about: '',
      interests: [],
      avatarUri: null,
      hasSelectedInterests: false,
      hasSelectedLocation: false,
    }));
  },

  resendVerificationEmail: async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  },

  checkEmailVerified: async () => {
    if (!auth.currentUser) return false;
    await auth.currentUser.reload();
    const verified = auth.currentUser.emailVerified;
    store.set((s) => ({ ...s, emailVerified: verified }));
    return verified;
  },

  signIn: async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const uid = credential.user.uid;
    const profile = await loadUserProfile(uid);

    store.set((s) => ({
      ...s,
      isSignedIn: true,
      uid,
      email,
      emailVerified: credential.user.emailVerified,
      fullName: profile.fullName ?? '',
      about: profile.about ?? '',
      interests: profile.interests ?? [],
      avatarUri: profile.avatarUri ?? null,
      hasSelectedInterests: (profile.interests ?? []).length > 0,
      hasSelectedLocation: s.hasSelectedLocation,
    }));
  },

  signOut: async () => {
    await firebaseSignOut(auth);
    store.set((s) => ({
      ...s,
      isSignedIn: false,
      uid: null,
      fullName: '',
      email: '',
      emailVerified: false,
      about: '',
      interests: [],
      avatarUri: null,
      hasSelectedInterests: false,
      hasSelectedLocation: false,
    }));
  },

  completeInterests: async (interests: string[]) => {
    const uid = store.get().uid;
    if (uid) {
      await setDoc(doc(db, 'users', uid), { interests }, { merge: true });
    }
    store.set((s) => ({ ...s, hasSelectedInterests: true, interests }));
  },

  completeLocation: () => store.set((s) => ({ ...s, hasSelectedLocation: true })),

  updateProfile: async (data: { fullName?: string; about?: string; interests?: string[]; avatarUri?: string | null }) => {
    const uid = store.get().uid;
    if (uid) {
      await setDoc(doc(db, 'users', uid), data, { merge: true });
    }
    store.set((s) => ({ ...s, ...data }));
  },
};

export const useAuthState = store.useStore;

export function initAuthListener() {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const profile = await loadUserProfile(firebaseUser.uid);
      store.set((s) => ({
        ...s,
        isSignedIn: true,
        isInitializing: false,
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        emailVerified: firebaseUser.emailVerified,
        fullName: profile.fullName ?? '',
        about: profile.about ?? '',
        interests: profile.interests ?? [],
        avatarUri: profile.avatarUri ?? null,
        hasSelectedInterests: (profile.interests ?? []).length > 0,
      }));
    } else {
      store.set((s) => ({ ...s, isSignedIn: false, isInitializing: false, uid: null }));
    }
  });
}