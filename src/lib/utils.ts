import { WorkoutSet, Exercise } from '@/types';

export function calculateVolume(reps: number, weight: number): number {
  return reps * weight;
}

export function calculateExerciseTonnage(sets: WorkoutSet[]): number {
  return sets.reduce((sum, set) => sum + set.volume, 0);
}

export function calculateSessionTonnage(exercises: Exercise[]): number {
  return exercises.reduce((sum, ex) => sum + ex.tonnage, 0);
}

export function formatTonnage(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t`;
  }
  return `${kg}kg`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateShort(date: Date): string {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

export function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export const EXERCISE_CATEGORIES = [
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'legs', label: 'Legs' },
  { value: 'arms', label: 'Arms' },
  { value: 'core', label: 'Core' },
  { value: 'other', label: 'Other' },
] as const;
