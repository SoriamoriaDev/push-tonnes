import {
  GoogleAuthProvider,
  signInWithCredential,
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

/**
 * Sign in with Google using Google Identity Services (GIS).
 * Uses signInWithCredential instead of signInWithPopup to avoid
 * iOS Safari ITP issues that block popup-based auth flows.
 */
export async function signInWithGoogleCredential(idToken: string): Promise<User> {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);

  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);
  await createUserProfile(result.user);
  return result.user;
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
