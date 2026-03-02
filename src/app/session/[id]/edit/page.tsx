'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import VoiceInput from '@/components/VoiceInput';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { getSession, updateSession, getExerciseCatalog } from '@/lib/firestore';
import { calculateVolume, calculateExerciseTonnage, calculateSessionTonnage, formatTonnage } from '@/lib/utils';
import { Exercise, WorkoutSet, ExerciseCatalogEntry } from '@/types';
import { SpeechResult } from '@/lib/speech';

interface ExerciseFormData {
  name: string;
  sets: WorkoutSet[];
}

export default function EditSession() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState<ExerciseFormData[]>([]);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);
  const [catalog, setCatalog] = useState<ExerciseCatalogEntry[]>([]);
  const [showCatalog, setShowCatalog] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getExerciseCatalog(user.uid).then(setCatalog).catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    if (user && sessionId) {
      getSession(user.uid, sessionId)
        .then((s) => {
          if (!s) { router.push('/history'); return; }
          setDate(s.date.toISOString().split('T')[0]);
          setExercises(s.exercises.map((e) => ({ name: e.name, sets: e.sets })));
          setNotes(s.notes || '');
        })
        .catch(console.error)
        .finally(() => setLoadingSession(false));
    }
  }, [user, sessionId, router]);

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

      await updateSession(user.uid, sessionId, {
        date: new Date(date),
        totalTonnage: calculateSessionTonnage(sessionExercises),
        exercises: sessionExercises,
        notes,
      });

      router.push(`/session/${sessionId}`);
    } catch (error) {
      console.error('Failed to update session:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const totalTonnage = exercises.reduce((sum, e) => {
    return sum + e.sets.reduce((setSum, s) => setSum + s.volume, 0);
  }, 0);

  if (loading || loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="text-zinc-400 text-sm hover:text-zinc-200">←</button>
              <h1 className="text-sm font-medium text-white">Edit Session</h1>
              <VoiceInput onResult={handleVoiceResult} />
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
                    {showCatalog === exIdx && catalog.length > 0 && (
                      <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg max-h-32 overflow-y-auto">
                        {catalog
                          .filter((c) => c.name.toLowerCase().includes(exercise.name.toLowerCase()))
                          .slice(0, 5)
                          .map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => { updateExerciseName(exIdx, c.name); setShowCatalog(null); }}
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
                    <button type="button" onClick={() => removeExercise(exIdx)} className="text-zinc-500 hover:text-red-400 text-sm">✕</button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-[1fr_80px_80px_60px_30px] gap-1 text-xs text-zinc-500 px-1">
                    <span>Set</span><span>Reps</span><span>Weight</span><span>Vol</span><span></span>
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
                        <button type="button" onClick={() => removeSet(exIdx, setIdx)} className="text-zinc-600 hover:text-red-400 text-xs text-center">✕</button>
                      )}
                    </div>
                  ))}
                </div>

                <button type="button" onClick={() => addSet(exIdx)} className="mt-2 text-xs text-orange-500 hover:text-orange-400">
                  + Add Set
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={addExercise}
          className="w-full border border-dashed border-zinc-700 rounded-xl py-3 text-zinc-400 hover:text-orange-500 hover:border-orange-500/50 transition-colors text-sm mb-4"
        >
          + Add Exercise
        </button>

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

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 mb-4"
        >
          {saving ? 'Saving...' : `Save Changes (${formatTonnage(totalTonnage)})`}
        </button>
      </main>
      <BottomNav />
    </div>
  );
}
