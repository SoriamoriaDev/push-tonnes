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
  duration?: number;
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

export type WeightCategory = '-70kg' | '70-80kg' | '80-90kg' | '90-100kg' | '+100kg';

export function getWeightCategory(weight?: number): WeightCategory | null {
  if (!weight) return null;
  if (weight < 70) return '-70kg';
  if (weight < 80) return '70-80kg';
  if (weight < 90) return '80-90kg';
  if (weight < 100) return '90-100kg';
  return '+100kg';
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL: string | null;
  bestSessionTonnage: number;
  bestSessionDate: Date;
  weight?: number;
  weightCategory?: WeightCategory;
}

export interface AIAnalysis {
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}
