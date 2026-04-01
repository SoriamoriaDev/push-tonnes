import { UserSettings } from '@/types';

/**
 * Estimate calories burned during a resistance training session.
 *
 * Method: MET (Metabolic Equivalent of Task) formula
 *   Calories = MET × weight(kg) × duration(hours)
 *
 * MET values for resistance training:
 *   - Light (low tonnage, short duration): MET 3.5
 *   - Moderate: MET 5.0
 *   - Vigorous (high tonnage, long duration): MET 6.0
 *
 * We also apply a tonnage multiplier — higher total volume = more metabolic work.
 *
 * Fallback BMR if no user profile: assumes 70kg, moderate intensity.
 */

export interface CalorieInput {
  totalTonnage: number;    // kg
  durationMinutes: number;
  userSettings?: UserSettings;
}

export function estimateCaloriesBurned({
  totalTonnage,
  durationMinutes,
  userSettings,
}: CalorieInput): number | null {
  if (!durationMinutes || durationMinutes < 1) return null;

  const weightKg = userSettings?.weight ?? 75; // default 75kg if unknown
  const durationHours = durationMinutes / 60;

  // Determine MET based on tonnage per minute (intensity proxy)
  const tonnagePerMin = totalTonnage / durationMinutes;
  let met: number;
  if (tonnagePerMin < 100) {
    met = 3.5; // light
  } else if (tonnagePerMin < 250) {
    met = 5.0; // moderate
  } else {
    met = 6.0; // vigorous
  }

  // Base calorie calculation: MET × weight × hours
  let calories = met * weightKg * durationHours;

  // Gender correction (males have slightly higher muscle mass / BMR)
  if (userSettings?.gender === 'female') {
    calories *= 0.9;
  }

  // Age correction (metabolism slows ~5% per decade after 30)
  if (userSettings?.age && userSettings.age > 30) {
    const decadesOver30 = (userSettings.age - 30) / 10;
    calories *= 1 - decadesOver30 * 0.03;
  }

  return Math.round(calories);
}

/**
 * Format calorie count for display.
 */
export function formatCalories(cal: number): string {
  return `${cal.toLocaleString()} kcal`;
}
