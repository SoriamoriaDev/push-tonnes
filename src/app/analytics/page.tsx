'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { getSessions } from '@/lib/firestore';
import { Session } from '@/types';
import { formatTonnage, getMonthKey } from '@/lib/utils';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function Analytics() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getSessions(user.uid, 200)
        .then(setSessions)
        .catch(console.error)
        .finally(() => setLoadingSessions(false));
    }
  }, [user]);

  // Monthly tonnage data
  const monthlyData = useMemo(() => {
    const monthMap = new Map<string, number>();
    sessions.forEach((s) => {
      const key = getMonthKey(s.date);
      monthMap.set(key, (monthMap.get(key) || 0) + s.totalTonnage);
    });
    return Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, tonnage]) => ({
        month: month.slice(2), // "26-01" instead of "2026-01"
        tonnage: Math.round(tonnage),
      }));
  }, [sessions]);

  // All unique exercise names
  const exerciseNames = useMemo(() => {
    const names = new Set<string>();
    sessions.forEach((s) => s.exercises.forEach((e) => names.add(e.name)));
    return Array.from(names).sort();
  }, [sessions]);

  // Per-exercise progress
  const exerciseProgress = useMemo(() => {
    if (!selectedExercise) return [];
    return sessions
      .filter((s) => s.exercises.some((e) => e.name === selectedExercise))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((s) => {
        const exercise = s.exercises.find((e) => e.name === selectedExercise)!;
        const maxWeight = Math.max(...exercise.sets.map((set) => set.weight));
        return {
          date: `${s.date.getMonth() + 1}/${s.date.getDate()}`,
          tonnage: exercise.tonnage,
          maxWeight,
        };
      });
  }, [sessions, selectedExercise]);

  // Personal records
  const records = useMemo(() => {
    const prs: Record<string, { maxWeight: number; maxVolume: number; maxTonnage: number }> = {};
    sessions.forEach((s) => {
      s.exercises.forEach((e) => {
        if (!prs[e.name]) prs[e.name] = { maxWeight: 0, maxVolume: 0, maxTonnage: 0 };
        const maxWeight = Math.max(...e.sets.map((s) => s.weight));
        const maxVolume = Math.max(...e.sets.map((s) => s.volume));
        if (maxWeight > prs[e.name].maxWeight) prs[e.name].maxWeight = maxWeight;
        if (maxVolume > prs[e.name].maxVolume) prs[e.name].maxVolume = maxVolume;
        if (e.tonnage > prs[e.name].maxTonnage) prs[e.name].maxTonnage = e.tonnage;
      });
    });
    return Object.entries(prs)
      .sort(([, a], [, b]) => b.maxTonnage - a.maxTonnage)
      .slice(0, 10);
  }, [sessions]);

  // Week comparison
  const weekComparison = useMemo(() => {
    const now = new Date();
    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(now.getDate() - now.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const thisWeek = sessions
      .filter((s) => s.date >= thisWeekStart)
      .reduce((sum, s) => sum + s.totalTonnage, 0);

    const lastWeek = sessions
      .filter((s) => s.date >= lastWeekStart && s.date < thisWeekStart)
      .reduce((sum, s) => sum + s.totalTonnage, 0);

    const change = lastWeek > 0 ? ((thisWeek - lastWeek) / lastWeek) * 100 : 0;

    return { thisWeek, lastWeek, change };
  }, [sessions]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-xl font-bold text-white mb-6">Analytics</h1>

        {loadingSessions ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <p>No data yet. Start logging sessions!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Week Comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <p className="text-zinc-400 text-xs mb-1">This Week</p>
                <p className="text-xl font-bold text-white">{formatTonnage(weekComparison.thisWeek)}</p>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <p className="text-zinc-400 text-xs mb-1">Last Week</p>
                <p className="text-xl font-bold text-white">{formatTonnage(weekComparison.lastWeek)}</p>
                {weekComparison.change !== 0 && (
                  <p className={`text-xs mt-1 ${weekComparison.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {weekComparison.change > 0 ? '+' : ''}{weekComparison.change.toFixed(0)}%
                  </p>
                )}
              </div>
            </div>

            {/* Monthly Tonnage Chart */}
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <h2 className="text-sm font-medium text-zinc-400 mb-3">Monthly Tonnage</h2>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#71717a', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: 8 }}
                      labelStyle={{ color: '#a1a1aa' }}
                      formatter={(value) => [formatTonnage(value as number), 'Tonnage']}
                    />
                    <Bar dataKey="tonnage" fill="#f97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-zinc-500 text-sm text-center py-8">Not enough data yet</p>
              )}
            </div>

            {/* Exercise Progress */}
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <h2 className="text-sm font-medium text-zinc-400 mb-3">Exercise Progress</h2>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:outline-none focus:border-orange-500"
              >
                <option value="">Select exercise...</option>
                {exerciseNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>

              {selectedExercise && exerciseProgress.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={exerciseProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#71717a', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: 8 }}
                      labelStyle={{ color: '#a1a1aa' }}
                    />
                    <Line type="monotone" dataKey="tonnage" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
                    <Line type="monotone" dataKey="maxWeight" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : selectedExercise ? (
                <p className="text-zinc-500 text-sm text-center py-8">No data for this exercise</p>
              ) : null}
            </div>

            {/* Personal Records */}
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <h2 className="text-sm font-medium text-zinc-400 mb-3">Personal Records</h2>
              <div className="space-y-2">
                {records.map(([name, pr]) => (
                  <div key={name} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                    <span className="text-sm text-white">{name}</span>
                    <div className="flex gap-4 text-xs">
                      <span className="text-zinc-400">{pr.maxWeight}kg max</span>
                      <span className="text-orange-500 font-medium">{formatTonnage(pr.maxTonnage)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
