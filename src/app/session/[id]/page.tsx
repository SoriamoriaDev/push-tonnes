'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSession, deleteSession, saveAnalysis } from '@/lib/firestore';
import { Session, AIAnalysis } from '@/types';
import { formatTonnage, formatDate } from '@/lib/utils';

export default function SessionDetail() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user && sessionId) {
      getSession(user.uid, sessionId)
        .then((s) => {
          setSession(s);
          if (s?.aiAnalysis) setAnalysis(s.aiAnalysis);
        })
        .catch(console.error)
        .finally(() => setLoadingSession(false));
    }
  }, [user, sessionId]);

  const handleDelete = async () => {
    if (!user || !session?.id) return;
    if (!confirm('Delete this session? This cannot be undone.')) return;

    setDeleting(true);
    try {
      await deleteSession(user.uid, session.id);
      router.push('/history');
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleAnalyze = async () => {
    if (!session || !user || !session.id) return;
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session }),
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
        // Save to Firestore so it persists
        await saveAnalysis(user.uid, session.id, data);
      } else {
        const errData = await res.json().catch(() => null);
        alert(errData?.error || 'AI analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading || loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">Session not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Sticky header with tonnage */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="text-zinc-400 text-sm hover:text-zinc-200"
              >
                ←
              </button>
              <div>
                <h1 className="text-sm font-medium text-white leading-tight">
                  {formatDate(session.date)}
                </h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-500 leading-tight">
                {formatTonnage(session.totalTonnage)}
              </p>
              <p className="text-zinc-500 text-[10px]">total tonnage</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 pt-4">
        {/* Action buttons */}
        <div className="flex justify-end gap-4 mb-4">
          <button
            onClick={() => router.push(`/session/${sessionId}/edit`)}
            className="text-orange-500 text-xs hover:text-orange-400"
          >
            Edit session
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-500 text-xs hover:text-red-400 disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete session'}
          </button>
        </div>

        {/* Exercises */}
        <div className="space-y-3 mb-6">
          {session.exercises.map((exercise, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">{exercise.name}</h3>
                <span className="text-sm font-bold text-orange-500">
                  {formatTonnage(exercise.tonnage)}
                </span>
              </div>
              <div className="space-y-1">
                {exercise.sets.map((set, j) => (
                  <div key={j} className="flex items-center gap-4 text-sm text-zinc-400">
                    <span className="text-zinc-600 w-6">#{j + 1}</span>
                    <span>{set.reps} × {set.weight}kg</span>
                    <span className="text-zinc-500">= {set.volume}kg</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        {session.notes && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
            <p className="text-zinc-400 text-xs mb-1">Notes</p>
            <p className="text-sm text-zinc-300">{session.notes}</p>
          </div>
        )}

        {/* AI Analysis */}
        <div className="mb-24">
          {!analysis ? (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span>🤖</span>
                  Get AI Analysis
                </>
              )}
            </button>
          ) : (
            <div className="bg-zinc-900 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span>🤖</span>
                  <h3 className="font-medium text-white">AI Coach Analysis</h3>
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="text-xs text-zinc-500 hover:text-zinc-300 disabled:opacity-50"
                >
                  {analyzing ? 'Analyzing...' : 'Re-analyze'}
                </button>
              </div>
              <p className="text-sm text-zinc-300 mb-3">{analysis.summary}</p>

              {analysis.strengths.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-green-400 mb-1">Strengths</p>
                  <ul className="space-y-1">
                    {analysis.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-zinc-400">+ {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.improvements.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-yellow-400 mb-1">Areas to Improve</p>
                  <ul className="space-y-1">
                    {analysis.improvements.map((s, i) => (
                      <li key={i} className="text-xs text-zinc-400">→ {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.recommendations.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-blue-400 mb-1">Recommendations</p>
                  <ul className="space-y-1">
                    {analysis.recommendations.map((s, i) => (
                      <li key={i} className="text-xs text-zinc-400">• {s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
