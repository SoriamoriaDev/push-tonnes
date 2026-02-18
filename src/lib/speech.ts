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

export function createSpeechRecognition(): any | null {
  if (typeof window === 'undefined') return null;

  const win = window as any;
  const SpeechRecognitionAPI = win.webkitSpeechRecognition || win.SpeechRecognition;

  if (!SpeechRecognitionAPI) return null;

  const recognition = new SpeechRecognitionAPI();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  return recognition;
}

export function parseSpeechInput(transcript: string): SpeechResult {
  const result: SpeechResult = {};
  const lower = transcript.toLowerCase().trim();

  // Try to extract reps: "30 reps" or just a number before "reps"
  const repsMatch = lower.match(/(\d+)\s*reps?/);
  if (repsMatch) {
    result.reps = parseInt(repsMatch[1], 10);
  }

  // Try to extract weight: "30 kilos" or "30 kg" or "30 pounds"
  const weightMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:kilos?|kg|pounds?|lbs?)/);
  if (weightMatch) {
    result.weight = parseFloat(weightMatch[1]);
  }

  // Try to extract exercise name: everything before the first number
  const nameMatch = lower.match(/^([a-z\s-]+?)(?:\d|\s*$)/);
  if (nameMatch) {
    const name = nameMatch[1].trim();
    if (name.length > 1) {
      result.exerciseName = name
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }

  // If no reps/weight found, try "NUMBERxNUMBER" format like "30 by 30" or "30 times 30"
  if (!result.reps && !result.weight) {
    const byMatch = lower.match(/(\d+)\s*(?:by|times|x|×)\s*(\d+)/);
    if (byMatch) {
      result.reps = parseInt(byMatch[1], 10);
      result.weight = parseInt(byMatch[2], 10);
    }
  }

  return result;
}
