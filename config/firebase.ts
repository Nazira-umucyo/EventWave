import { initializeApp, getApps, getApp } from 'firebase/app';
// @ts-ignore — getReactNativePersistence exists at runtime but is missing from this Firebase version's type declarations
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCbWSW6BzG61FMuNm-YvC3f9PhQ0PRm4_g',
  authDomain: 'eventwave-4a32c.firebaseapp.com',
  projectId: 'eventwave-4a32c',
  storageBucket: 'eventwave-4a32c.firebasestorage.app',
  messagingSenderId: '534061091095',
  appId: '1:534061091095:web:b893abdca53409efeacf52',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth =
  getApps().length === 0
    ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
    : getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;