'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSessions } from '@/lib/firestore';
import { Session } from '@/types';
import { formatTonnage, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function History() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getSessions(user.uid, 100)
        .then(setSessions)
        .catch(console.error)
        .finally(() => setLoadingSessions(false));
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Group sessions by month
  const grouped = sessions.reduce<Record<string, Session[]>>((acc, session) => {
    const key = `${session.date.getFullYear()}-${String(session.date.getMonth() + 1).padStart(2, '0')}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(session);
    return acc;
  }, {});

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-xl font-bold text-white mb-6">Session History</h1>

        {loadingSessions ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <p className="text-lg mb-2">No sessions yet</p>
            <Link href="/session/new" className="text-orange-500 hover:text-orange-400">
              Log your first session →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([monthKey, monthSessions]) => {
                const [year, month] = monthKey.split('-');
                const monthTonnage = monthSessions.reduce(
                  (sum, s) => sum + s.totalTonnage,
                  0
                );

                return (
                  <div key={monthKey}>
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-sm font-medium text-zinc-400">
                        {monthNames[parseInt(month) - 1]} {year}
                      </h2>
                      <span className="text-xs text-zinc-500">
                        {monthSessions.length} sessions · {formatTonnage(monthTonnage)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {monthSessions.map((session) => (
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
                              <p className="text-xs text-zinc-500 mt-0.5">
                                {session.exercises.map((e) => e.name).join(', ')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-orange-500">
                                {formatTonnage(session.totalTonnage)}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {session.exercises.length} exercises
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
