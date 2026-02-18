import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import {
  Session,
  Exercise,
  ExerciseCatalogEntry,
  LeaderboardEntry,
  UserSettings,
} from '@/types';
import { getMonthKey } from './utils';

// ---- Sessions ----

export async function saveSession(session: Session): Promise<string> {
  const db = getFirebaseDb();
  const sessionRef = doc(collection(db, 'users', session.userId, 'sessions'));
  const sessionId = sessionRef.id;

  await setDoc(sessionRef, {
    date: Timestamp.fromDate(session.date),
    totalTonnage: session.totalTonnage,
    exercises: session.exercises.map((ex) => ({
      name: ex.name,
      order: ex.order,
      tonnage: ex.tonnage,
      sets: ex.sets,
    })),
    notes: session.notes || '',
    createdAt: Timestamp.fromDate(new Date()),
  });

  for (const exercise of session.exercises) {
    await updateExerciseCatalog(session.userId, exercise.name);
  }

  await updateLeaderboard(session.userId, session);

  return sessionId;
}

export async function getSessions(
  userId: string,
  maxResults: number = 50
): Promise<Session[]> {
  const db = getFirebaseDb();
  const sessionsRef = collection(db, 'users', userId, 'sessions');
  const q = query(sessionsRef, orderBy('date', 'desc'), limit(maxResults));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userId,
      date: data.date.toDate(),
      totalTonnage: data.totalTonnage,
      exercises: data.exercises as Exercise[],
      notes: data.notes,
      createdAt: data.createdAt.toDate(),
    };
  });
}

export async function getSession(
  userId: string,
  sessionId: string
): Promise<Session | null> {
  const db = getFirebaseDb();
  const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
  const snap = await getDoc(sessionRef);
  if (!snap.exists()) return null;

  const data = snap.data();
  return {
    id: snap.id,
    userId,
    date: data.date.toDate(),
    totalTonnage: data.totalTonnage,
    exercises: data.exercises as Exercise[],
    notes: data.notes,
    createdAt: data.createdAt.toDate(),
  };
}

export async function deleteSession(
  userId: string,
  sessionId: string
): Promise<void> {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, 'users', userId, 'sessions', sessionId));
}

// ---- Exercise Catalog ----

async function updateExerciseCatalog(
  userId: string,
  exerciseName: string
): Promise<void> {
  const db = getFirebaseDb();
  const catalogRef = collection(db, 'users', userId, 'exercises');
  const q = query(catalogRef, where('name', '==', exerciseName));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    await setDoc(doc(catalogRef), {
      name: exerciseName,
      category: 'other',
      lastUsed: Timestamp.fromDate(new Date()),
    });
  } else {
    await setDoc(
      snapshot.docs[0].ref,
      { lastUsed: Timestamp.fromDate(new Date()) },
      { merge: true }
    );
  }
}

export async function getExerciseCatalog(
  userId: string
): Promise<ExerciseCatalogEntry[]> {
  const db = getFirebaseDb();
  const catalogRef = collection(db, 'users', userId, 'exercises');
  const q = query(catalogRef, orderBy('lastUsed', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      category: data.category,
      lastUsed: data.lastUsed.toDate(),
    };
  });
}

// ---- User Settings ----

export async function getUserSettings(
  userId: string
): Promise<UserSettings> {
  const db = getFirebaseDb();
  const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
  const snap = await getDoc(settingsRef);
  if (!snap.exists()) return { showOnLeaderboard: true };
  return snap.data() as UserSettings;
}

export async function updateUserSettings(
  userId: string,
  settings: Partial<UserSettings>
): Promise<void> {
  const db = getFirebaseDb();
  const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
  await setDoc(settingsRef, settings, { merge: true });
}

// ---- Leaderboard ----

async function updateLeaderboard(
  userId: string,
  session: Session
): Promise<void> {
  const db = getFirebaseDb();
  const settings = await getUserSettings(userId);
  if (!settings.showOnLeaderboard) return;

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  const entry = {
    userId,
    displayName: userData?.displayName || 'Anonymous',
    photoURL: userData?.photoURL || null,
    bestSessionTonnage: session.totalTonnage,
    bestSessionDate: Timestamp.fromDate(session.date),
  };

  // Update all-time leaderboard
  const allTimeRef = doc(db, 'leaderboard', 'allTime', 'entries', userId);
  const allTimeSnap = await getDoc(allTimeRef);

  if (
    !allTimeSnap.exists() ||
    session.totalTonnage > allTimeSnap.data().bestSessionTonnage
  ) {
    await setDoc(allTimeRef, entry);
  }

  // Update monthly leaderboard
  const monthKey = getMonthKey(session.date);
  const monthlyRef = doc(db, 'leaderboard', 'monthly', monthKey, userId);
  const monthlySnap = await getDoc(monthlyRef);

  if (
    !monthlySnap.exists() ||
    session.totalTonnage > monthlySnap.data().bestSessionTonnage
  ) {
    await setDoc(monthlyRef, entry);
  }
}

export async function getLeaderboard(
  type: 'allTime' | 'monthly',
  monthKey?: string
): Promise<LeaderboardEntry[]> {
  const db = getFirebaseDb();
  let entriesRef;

  if (type === 'allTime') {
    entriesRef = collection(db, 'leaderboard', 'allTime', 'entries');
  } else {
    const key = monthKey || getMonthKey(new Date());
    entriesRef = collection(db, 'leaderboard', 'monthly', key);
  }

  const q = query(entriesRef, orderBy('bestSessionTonnage', 'desc'), limit(50));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      userId: data.userId,
      displayName: data.displayName,
      photoURL: data.photoURL,
      bestSessionTonnage: data.bestSessionTonnage,
      bestSessionDate: data.bestSessionDate.toDate(),
    };
  });
}

// ---- Analytics helpers ----

export async function getSessionsForRange(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<Session[]> {
  const db = getFirebaseDb();
  const sessionsRef = collection(db, 'users', userId, 'sessions');
  const q = query(
    sessionsRef,
    where('date', '>=', Timestamp.fromDate(startDate)),
    where('date', '<=', Timestamp.fromDate(endDate)),
    orderBy('date', 'asc')
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userId,
      date: data.date.toDate(),
      totalTonnage: data.totalTonnage,
      exercises: data.exercises as Exercise[],
      notes: data.notes,
      createdAt: data.createdAt.toDate(),
    };
  });
}
