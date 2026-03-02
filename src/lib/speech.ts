/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SpeechResult {
  exerciseName?: string;
  reps?: number;
  weight?: number;
}

export function isSpeechSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

export function getBrowserLanguage(): 'fr' | 'en' {
  if (typeof window === 'undefined') return 'en';
  const lang = navigator.language || 'en';
  return lang.startsWith('fr') ? 'fr' : 'en';
}

export function createSpeechRecognition(lang: 'fr' | 'en' = 'en'): any | null {
  if (typeof window === 'undefined') return null;

  const win = window as any;
  const SpeechRecognitionAPI = win.webkitSpeechRecognition || win.SpeechRecognition;

  if (!SpeechRecognitionAPI) return null;

  const recognition = new SpeechRecognitionAPI();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US';

  return recognition;
}

export function parseSpeechInput(transcript: string): SpeechResult {
  const result: SpeechResult = {};
  const lower = transcript.toLowerCase().trim();

  // ---- Weight extraction ----
  // FR: "80 kilos", "80 kg", "80 kilo"
  // EN: "80 kg", "80 kilos", "80 pounds", "80 lbs"
  const weightMatch = lower.match(/(\d+(?:[.,]\d+)?)\s*(?:kilos?|kg|pounds?|lbs?)/);
  if (weightMatch) {
    result.weight = parseFloat(weightMatch[1].replace(',', '.'));
  }

  // ---- Reps extraction ----
  // FR: "10 répétitions", "10 reps", "10 fois"
  // EN: "10 reps", "10 repetitions"
  const repsMatch = lower.match(/(\d+)\s*(?:r[eé]p[sé]?(?:étitions?)?|fois|times?)/);
  if (repsMatch) {
    result.reps = parseInt(repsMatch[1], 10);
  }

  // ---- Sets/series format ----
  // FR: "3 séries de 10" → 10 reps (weight already captured above)
  // We capture reps from "N séries de M"
  if (!result.reps) {
    const seriesMatch = lower.match(/\d+\s*s[eé]ries?\s*de\s*(\d+)/);
    if (seriesMatch) {
      result.reps = parseInt(seriesMatch[1], 10);
    }
  }

  // ---- NxM or N×M or "N by M" or "N times M" format ----
  // e.g. "3x10" could be reps x weight or sets x reps — treat as reps x weight
  if (!result.reps || !result.weight) {
    const byMatch = lower.match(/(\d+)\s*(?:x|×|by|par)\s*(\d+)/);
    if (byMatch) {
      if (!result.reps) result.reps = parseInt(byMatch[1], 10);
      if (!result.weight) result.weight = parseInt(byMatch[2], 10);
    }
  }

  // ---- Exercise name extraction ----
  // Remove known patterns to isolate the name
  let nameStr = lower
    .replace(/\d+(?:[.,]\d+)?\s*(?:kilos?|kg|pounds?|lbs?)/g, '')
    .replace(/\d+\s*(?:r[eé]p[sé]?(?:étitions?)?|fois|times?)/g, '')
    .replace(/\d+\s*s[eé]ries?\s*de\s*\d+/g, '')
    .replace(/\d+\s*(?:x|×|by|par)\s*\d+/g, '')
    .replace(/\bà\b|\bde\b|\bpour\b|\ble\b|\bla\b|\bles\b|\bau\b|\bdu\b/g, '') // FR articles
    .replace(/\s+/g, ' ')
    .trim();

  // Clean leading/trailing punctuation
  nameStr = nameStr.replace(/^[\s,.-]+|[\s,.-]+$/g, '').trim();

  if (nameStr.length > 1) {
    result.exerciseName = nameStr
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return result;
}
