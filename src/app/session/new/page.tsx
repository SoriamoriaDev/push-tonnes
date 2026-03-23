'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import VoiceInput from '@/components/VoiceInput';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import { saveSession, getExerciseCatalog } from '@/lib/firestore';
import { calculateVolume, calculateExerciseTonnage, calculateSessionTonnage, formatTonnage } from '@/lib/utils';
import { Exercise, WorkoutSet, ExerciseCatalogEntry, SessionLocation } from '@/types';
import { SpeechResult } from '@/lib/speech';

const DRAFT_KEY = 'pushTonnes_draftSession';

interface ExerciseFormData {
  name: string;
  sets: WorkoutSet[];
}

interface DraftData {
  date: string;
  exercises: ExerciseFormData[];
  notes: string;
}

export default function NewSession() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [exercises, setExercises] = useState<ExerciseFormData[]>([
    { name: '', sets: [{ reps: 0, weight: 0, volume: 0 }] },
  ]);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [catalog, setCatalog] = useState<ExerciseCatalogEntry[]>([]);
  const [showCatalog, setShowCatalog] = useState<number | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [location, setLocation] = useState<SessionLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'acquiring' | 'ok' | 'denied'>('idle');
  const [startTime] = useState(() => Date.now());
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getExerciseCatalog(user.uid).then(setCatalog).catch(console.error);
    }
  }, [user]);

  // Check for draft on mount
  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      try {
        const draft: DraftData = JSON.parse(raw);
        if (draft.exercises?.some((e) => e.name || e.sets?.some((s) => s.reps > 0))) {
          setShowDraftBanner(true);
        }
      } catch { /* ignore */ }
    }
  }, []);

  // Autosave draft on every change (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const draft: DraftData = { date, exercises, notes };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [date, exercises, notes]);

  // Request geolocation silently on mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    setLocationStatus('acquiring');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
        setLocationStatus('ok');
      },
      () => setLocationStatus('denied'),
      { timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  const restoreDraft = () => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      const draft: DraftData = JSON.parse(raw);
      if (draft.date) setDate(draft.date);
      if (draft.exercises) setExercises(draft.exercises);
      if (draft.notes !== undefined) setNotes(draft.notes);
    } catch { /* ignore */ }
    setShowDraftBanner(false);
  };

  const discardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setShowDraftBanner(false);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ reps: 0, weight: 0, volume: 0 }] }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExerciseName = (index: number, name: string) => {
    const updated = [...exercises];
    updated[index].name = name;
    setExercises(updated);
  };

  const addSet = (exerciseIndex: number) => {
    const updated = [...exercises];
    const lastSet = updated[exerciseIndex].sets[updated[exerciseIndex].sets.length - 1];
    updated[exerciseIndex].sets.push({
      reps: lastSet?.reps || 0,
      weight: lastSet?.weight || 0,
      volume: calculateVolume(lastSet?.reps || 0, lastSet?.weight || 0),
    });
    setExercises(updated);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets = updated[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    setExercises(updated);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => {
    const updated = [...exercises];
    const set = updated[exerciseIndex].sets[setIndex];
    set[field] = value;
    set.volume = calculateVolume(set.reps, set.weight);
    setExercises(updated);
  };

  const handleVoiceResult = useCallback((result: SpeechResult) => {
    if (result.exerciseName) {
      // Find empty exercise or add new one
      const emptyIdx = exercises.findIndex((e) => !e.name);
      if (emptyIdx >= 0) {
        updateExerciseName(emptyIdx, result.exerciseName);
        if (result.reps && result.weight) {
          const updated = [...exercises];
          updated[emptyIdx].sets[0] = {
            reps: result.reps,
            weight: result.weight,
            volume: calculateVolume(result.reps, result.weight),
          };
          setExercises(updated);
        }
      }
    } else if (result.reps && result.weight) {
      // Add set to last exercise
      const lastIdx = exercises.length - 1;
      if (lastIdx >= 0) {
        const updated = [...exercises];
        const lastExercise = updated[lastIdx];
        const emptySetIdx = lastExercise.sets.findIndex((s) => s.reps === 0 && s.weight === 0);
        if (emptySetIdx >= 0) {
          lastExercise.sets[emptySetIdx] = {
            reps: result.reps,
            weight: result.weight,
            volume: calculateVolume(result.reps, result.weight),
          };
        } else {
          lastExercise.sets.push({
            reps: result.reps,
            weight: result.weight,
            volume: calculateVolume(result.reps, result.weight),
          });
        }
        setExercises(updated);
      }
    }
  }, [exercises]);

  const handleSave = async () => {
    if (!user) return;

    const validExercises = exercises.filter(
      (e) => e.name && e.sets.some((s) => s.reps > 0 && s.weight > 0)
    );

    if (validExercises.length === 0) {
      alert('Add at least one exercise with sets.');
      return;
    }

    setSaving(true);
    try {
      const sessionExercises: Exercise[] = validExercises.map((e, i) => {
        const validSets = e.sets.filter((s) => s.reps > 0 && s.weight > 0);
        return {
          name: e.name,
          order: i,
          sets: validSets,
          tonnage: calculateExerciseTonnage(validSets),
        };
      });

      await saveSession({
        userId: user.uid,
        date: new Date(date),
        totalTonnage: calculateSessionTonnage(sessionExercises),
        exercises: sessionExercises,
        notes,
        duration: Math.round((Date.now() - startTime) / 60000),
        ...(location ? { location } : {}),
        createdAt: new Date(),
      });

      localStorage.removeItem(DRAFT_KEY);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save session:', error);
      alert('Failed to save session. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const totalTonnage = exercises.reduce((sum, e) => {
    return sum + e.sets.reduce((setSum, s) => setSum + s.volume, 0);
  }, 0);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Draft restore banner */}
      {showDraftBanner && (
        <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-2 flex items-center justify-between max-w-lg mx-auto">
          <span className="text-sm text-zinc-300">You have an unsaved draft</span>
          <div className="flex gap-3">
            <button onClick={restoreDraft} className="text-sm text-orange-400 font-medium">Restore</button>
            <button onClick={discardDraft} className="text-sm text-zinc-500">Discard</button>
          </div>
        </div>
      )}

      {/* Sticky header with tonnage */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-medium text-white">New Session</h1>
              <VoiceInput onResult={handleVoiceResult} />
              <span
                title={locationStatus === 'ok' ? 'Location acquired' : locationStatus === 'acquiring' ? 'Getting location...' : 'Location unavailable'}
                className={`text-sm ${locationStatus === 'ok' ? 'text-green-500' : 'text-zinc-600'}`}
              >
                📍
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-500 leading-tight">
                {formatTonnage(totalTonnage)}
              </p>
              <p className="text-zinc-500 text-[10px]">total tonnage</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 pt-4">
        {/* Date */}
        <div className="mb-4">
          <label className="text-sm text-zinc-400 mb-1 block">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Exercises */}
        <div className="space-y-4 mb-4">
          {exercises.map((exercise, exIdx) => {
            const exerciseTonnage = exercise.sets.reduce((s, set) => s + set.volume, 0);
            return (
              <div key={exIdx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                {/* Exercise Name */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) => updateExerciseName(exIdx, e.target.value)}
                      onFocus={() => setShowCatalog(exIdx)}
                      onBlur={() => setTimeout(() => setShowCatalog(null), 200)}
                      placeholder="Exercise name"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                    {/* Catalog dropdown */}
                    {showCatalog === exIdx && catalog.length > 0 && (
                      <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg max-h-32 overflow-y-auto">
                        {catalog
                          .filter((c) =>
                            c.name.toLowerCase().includes(exercise.name.toLowerCase())
                          )
                          .slice(0, 5)
                          .map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                updateExerciseName(exIdx, c.name);
                                setShowCatalog(null);
                              }}
                              className="block w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700"
                            >
                              {c.name}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-bold text-orange-500 min-w-[60px] text-right">
                    {formatTonnage(exerciseTonnage)}
                  </span>
                  {exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExercise(exIdx)}
                      className="text-zinc-500 hover:text-red-400 text-sm"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Sets */}
                <div className="space-y-2">
                  <div className="grid grid-cols-[1fr_80px_80px_60px_30px] gap-1 text-xs text-zinc-500 px-1">
                    <span>Set</span>
                    <span>Reps</span>
                    <span>Weight</span>
                    <span>Vol</span>
                    <span></span>
                  </div>
                  {exercise.sets.map((set, setIdx) => (
                    <div key={setIdx} className="grid grid-cols-[1fr_80px_80px_60px_30px] gap-1 items-center">
                      <span className="text-xs text-zinc-500 pl-1">#{setIdx + 1}</span>
                      <input
                        type="number"
                        value={set.reps || ''}
                        onChange={(e) => updateSet(exIdx, setIdx, 'reps', parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-white text-sm text-center focus:outline-none focus:border-orange-500 w-full"
                      />
                      <input
                        type="number"
                        value={set.weight || ''}
                        onChange={(e) => updateSet(exIdx, setIdx, 'weight', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-white text-sm text-center focus:outline-none focus:border-orange-500 w-full"
                      />
                      <span className="text-xs text-zinc-400 text-center">{set.volume}</span>
                      {exercise.sets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSet(exIdx, setIdx)}
                          className="text-zinc-600 hover:text-red-400 text-xs text-center"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addSet(exIdx)}
                  className="mt-2 text-xs text-orange-500 hover:text-orange-400"
                >
                  + Add Set
                </button>
              </div>
            );
          })}
        </div>

        {/* Add Exercise */}
        <button
          type="button"
          onClick={addExercise}
          className="w-full border border-dashed border-zinc-700 rounded-xl py-3 text-zinc-400 hover:text-orange-500 hover:border-orange-500/50 transition-colors text-sm mb-4"
        >
          + Add Exercise
        </button>

        {/* Notes */}
        <div className="mb-6">
          <label className="text-sm text-zinc-400 mb-1 block">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How was the session?"
            rows={2}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 mb-4"
        >
          {saving ? 'Saving...' : `Save Session (${formatTonnage(totalTonnage)})`}
        </button>
      </main>
      <BottomNav />
    </div>
  );
}
