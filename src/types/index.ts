export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  createdAt: Date;
}

export interface UserSettings {
  showOnLeaderboard: boolean;
  age?: number;
  weight?: number;
  gender?: 'male' | 'female' | 'other';
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  volume: number; // reps * weight
}

export interface Exercise {
  id?: string;
  name: string;
  order: number;
  tonnage: number; // sum of all set volumes
  sets: WorkoutSet[];
}

export interface SessionLocation {
  lat: number;
  lng: number;
  accuracy: number;
}

export interface Session {
  id?: string;
  userId: string;
  date: Date;
  totalTonnage: number;
  exercises: Exercise[];
  notes?: string;
  aiAnalysis?: AIAnalysis;
  location?: SessionLocation;
  createdAt: Date;
}

export interface ExerciseCatalogEntry {
  id?: string;
  name: string;
  category: ExerciseCategory;
  lastUsed: Date;
}

export type ExerciseCategory =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'legs'
  | 'arms'
  | 'core'
  | 'other';

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL: string | null;
  bestSessionTonnage: number;
  bestSessionDate: Date;
}

export interface AIAnalysis {
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}
