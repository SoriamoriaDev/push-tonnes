import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from './firebase';
import { UserSettings } from '@/types';

const googleProvider = new GoogleAuthProvider();

function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isPWA(): boolean {
  if (typeof window === 'undefined') return false;
  return (window.navigator as { standalone?: boolean }).standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;
}

async function createUserProfile(user: User): Promise<void> {
  const db = getFirebaseDb();
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      photoURL: user.photoURL,
      createdAt: new Date(),
    });

    const settingsRef = doc(db, 'users', user.uid, 'settings', 'preferences');
    await setDoc(settingsRef, {
      showOnLeaderboard: true,
    } satisfies UserSettings);
  }
}

export async function signInWithGoogle(): Promise<User | null> {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);

  if (isIOS() || isPWA()) {
    // Use redirect on iOS/PWA — result handled by getGoogleRedirectResult()
    await signInWithRedirect(auth, googleProvider);
    return null;
  }

  const result = await signInWithPopup(auth, googleProvider);
  await createUserProfile(result.user);
  return result.user;
}

export async function getGoogleRedirectResult(): Promise<User | null> {
  const auth = getFirebaseAuth();
  const result = await getRedirectResult(auth);
  if (result?.user) {
    await createUserProfile(result.user);
    return result.user;
  }
  return null;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);
  const result = await signInWithEmailAndPassword(auth, email, password);
  await createUserProfile(result.user);
  return result.user;
}

export async function signUpWithEmail(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(result.user);
  return result.user;
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getFirebaseAuth());
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}
