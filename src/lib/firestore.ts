import {
  collection,
  doc,
  setDoc,
  updateDoc,
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
  AIAnalysis,
  ExerciseCatalogEntry,
  LeaderboardEntry,
  UserSettings,
  getWeightCategory,
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
    ...(session.location ? { location: session.location } : {}),
    ...(session.duration !== undefined ? { duration: session.duration } : {}),
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
      aiAnalysis: data.aiAnalysis as AIAnalysis | undefined,
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
    aiAnalysis: data.aiAnalysis as AIAnalysis | undefined,
    duration: data.duration,
    createdAt: data.createdAt.toDate(),
  };
}

export async function saveAnalysis(
  userId: string,
  sessionId: string,
  analysis: AIAnalysis
): Promise<void> {
  const db = getFirebaseDb();
  const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
  await setDoc(sessionRef, { aiAnalysis: analysis }, { merge: true });
}

export async function updateSession(
  userId: string,
  sessionId: string,
  updates: Partial<Pick<Session, 'date' | 'exercises' | 'notes' | 'totalTonnage'>>
): Promise<void> {
  const db = getFirebaseDb();
  const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {};
  if (updates.date) data.date = Timestamp.fromDate(updates.date);
  if (updates.totalTonnage !== undefined) data.totalTonnage = updates.totalTonnage;
  if (updates.exercises) {
    data.exercises = updates.exercises.map((ex) => ({
      name: ex.name,
      order: ex.order,
      tonnage: ex.tonnage,
      sets: ex.sets,
    }));
  }
  if (updates.notes !== undefined) data.notes = updates.notes;
  if (updates.duration !== undefined) data.duration = updates.duration;
  await updateDoc(sessionRef, data);
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

  const userWeight = settings.weight;
  const weightCategory = getWeightCategory(userWeight) ?? null;

  const entry = {
    userId,
    displayName: userData?.displayName || 'Anonymous',
    photoURL: userData?.photoURL || null,
    bestSessionTonnage: session.totalTonnage,
    bestSessionDate: Timestamp.fromDate(session.date),
    ...(userWeight ? { weight: userWeight } : {}),
    ...(weightCategory ? { weightCategory } : {}),
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
      weight: data.weight,
      weightCategory: data.weightCategory,
    };
  });
}

// ---- Gym Leaderboard ----

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function getGymLeaderboard(
  lat: number,
  lng: number,
  radiusKm: number = 1
): Promise<LeaderboardEntry[]> {
  const db = getFirebaseDb();
  // Get all-time leaderboard entries that have location data in sessions
  // Strategy: load recent sessions collection-group filtered by recent date, find users near location
  const { collectionGroup } = await import('firebase/firestore');
  const sessionsRef = collectionGroup(db, 'sessions');
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90); // last 90 days
  const q = query(
    sessionsRef,
    where('location', '!=', null),
    where('date', '>=', Timestamp.fromDate(cutoff)),
    limit(500)
  );
  const snapshot = await getDocs(q);

  // Find users with sessions near this location
  const userBestTonnage: Map<string, { tonnage: number; date: Date; userId: string }> = new Map();

  for (const d of snapshot.docs) {
    const data = d.data();
    const loc = data.location;
    if (!loc?.lat || !loc?.lng) continue;

    const dist = haversineKm(lat, lng, loc.lat, loc.lng);
    if (dist > radiusKm) continue;

    const userId = d.ref.parent.parent?.id;
    if (!userId) continue;

    const tonnage = data.totalTonnage || 0;
    const existing = userBestTonnage.get(userId);
    if (!existing || tonnage > existing.tonnage) {
      userBestTonnage.set(userId, { tonnage, date: data.date.toDate(), userId });
    }
  }

  if (userBestTonnage.size === 0) return [];

  // Fetch display names from allTime leaderboard
  const allTimeRef = collection(db, 'leaderboard', 'allTime', 'entries');
  const userIds = Array.from(userBestTonnage.keys());
  const entries: LeaderboardEntry[] = [];

  for (const userId of userIds) {
    const entrySnap = await getDoc(doc(allTimeRef, userId));
    const best = userBestTonnage.get(userId)!;
    const entryData = entrySnap.exists() ? entrySnap.data() : null;
    entries.push({
      userId,
      displayName: entryData?.displayName || 'Anonymous',
      photoURL: entryData?.photoURL || null,
      bestSessionTonnage: best.tonnage,
      bestSessionDate: best.date,
      weight: entryData?.weight,
      weightCategory: entryData?.weightCategory,
    });
  }

  return entries.sort((a, b) => b.bestSessionTonnage - a.bestSessionTonnage);
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
      aiAnalysis: data.aiAnalysis as AIAnalysis | undefined,
      createdAt: data.createdAt.toDate(),
    };
  });
}
