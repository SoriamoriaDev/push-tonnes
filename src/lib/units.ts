export type UnitSystem = 'metric' | 'imperial';

export const KG_TO_LBS = 2.20462;
export const LBS_TO_KG = 1 / KG_TO_LBS;

/** Detect preferred unit system from browser locale */
export function detectUnitSystem(): UnitSystem {
  if (typeof navigator === 'undefined') return 'metric';
  const locale = navigator.language || 'en-US';
  // US, Liberia, Myanmar use imperial
  const imperialLocales = ['en-US', 'en-LR', 'my'];
  if (imperialLocales.some((l) => locale.startsWith(l.split('-')[0]) && locale.includes(l.split('-')[1] || ''))) {
    return 'imperial';
  }
  // Also check US specifically
  if (locale === 'en-US' || locale.includes('US')) return 'imperial';
  return 'metric';
}

/** Convert kg to display weight in the user's unit system */
export function toDisplayWeight(kg: number, unit: UnitSystem): number {
  if (unit === 'imperial') return Math.round(kg * KG_TO_LBS * 10) / 10;
  return kg;
}

/** Convert display weight back to kg for storage */
export function toStorageKg(displayWeight: number, unit: UnitSystem): number {
  if (unit === 'imperial') return Math.round((displayWeight * LBS_TO_KG) * 10) / 10;
  return displayWeight;
}

/** Format a weight value with unit label */
export function formatWeight(kg: number, unit: UnitSystem): string {
  if (unit === 'imperial') {
    const lbs = Math.round(kg * KG_TO_LBS * 10) / 10;
    return `${lbs}lbs`;
  }
  return `${kg}kg`;
}

/** Format total tonnage/volume with appropriate unit */
export function formatVolume(kg: number, unit: UnitSystem): string {
  if (unit === 'imperial') {
    const lbs = kg * KG_TO_LBS;
    if (lbs >= 1000) {
      return `${(lbs / 1000).toFixed(1)}klbs`;
    }
    return `${Math.round(lbs)}lbs`;
  }
  // Metric
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t`;
  }
  return `${kg}kg`;
}

/** Always format as tonnes (or klbs for imperial) — used for the big tonnage display */
export function formatVolumeAsTonnes(kg: number, unit: UnitSystem): string {
  if (unit === 'imperial') {
    const lbs = kg * KG_TO_LBS;
    return `${(lbs / 1000).toFixed(1)}klbs`;
  }
  return `${(kg / 1000).toFixed(1)}t`;
}

/** Unit label for input fields */
export function weightLabel(unit: UnitSystem): string {
  return unit === 'imperial' ? 'lbs' : 'kg';
}
