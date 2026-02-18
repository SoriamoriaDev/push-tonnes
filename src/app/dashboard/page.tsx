'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSessions } from '@/lib/firestore';
import { signOut } from '@/lib/auth';
import { Session } from '@/types';
import { formatTonnage, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getSessions(user.uid, 5)
        .then(setRecentSessions)
        .catch(console.error)
        .finally(() => setLoadingSessions(false));
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const weekTonnage = recentSessions
    .filter((s) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return s.date >= weekAgo;
    })
    .reduce((sum, s) => sum + s.totalTonnage, 0);

  return (
    <div className="min-h-screen">
      <main className="max-w-lg mx-auto px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-zinc-400 text-sm">Welcome back,</p>
            <h1 className="text-xl font-bold text-white">
              {user.displayName?.split(' ')[0] || 'Athlete'}
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <p className="text-zinc-400 text-xs mb-1">This Week</p>
            <p className="text-2xl font-bold text-orange-500">
              {formatTonnage(weekTonnage)}
            </p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <p className="text-zinc-400 text-xs mb-1">Total Sessions</p>
            <p className="text-2xl font-bold text-white">
              {recentSessions.length}
            </p>
          </div>
        </div>

        {/* New Session CTA */}
        <Link
          href="/session/new"
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl text-center transition-colors mb-6"
        >
          + Log New Session
        </Link>

        {/* Recent Sessions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Recent Sessions</h2>
            <Link href="/history" className="text-orange-500 text-sm hover:text-orange-400">
              View all
            </Link>
          </div>

          {loadingSessions ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentSessions.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              <p>No sessions yet.</p>
              <p className="text-sm mt-1">Start logging your workouts!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentSessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/session/${session.id}`}
                  className="block bg-zinc-900 rounded-xl p-4 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {formatDate(session.date)}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {session.exercises.length} exercise{session.exercises.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-500">
                        {formatTonnage(session.totalTonnage)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
