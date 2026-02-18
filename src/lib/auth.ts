import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from './firebase';
import { UserSettings } from '@/types';

const googleProvider = new GoogleAuthProvider();

function isStandalonePWA(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.navigator as any).standalone === true
  );
}

async function createUserProfile(user: User): Promise<void> {
  const db = getFirebaseDb();
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
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

  if (isStandalonePWA()) {
    // In standalone PWA mode, popups don't work — use redirect
    await signInWithRedirect(auth, googleProvider);
    // This won't return — the page navigates away and comes back
    return null;
  } else {
    // In browser, popup works fine
    const result = await signInWithPopup(auth, googleProvider);
    await createUserProfile(result.user);
    return result.user;
  }
}

export async function handleRedirectResult(): Promise<User | null> {
  const auth = getFirebaseAuth();
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      await createUserProfile(result.user);
      return result.user;
    }
  } catch (error) {
    console.error('Redirect sign-in error:', error);
  }
  return null;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getFirebaseAuth());
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}
