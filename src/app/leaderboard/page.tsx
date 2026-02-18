'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLeaderboard, getUserSettings, updateUserSettings } from '@/lib/firestore';
import { LeaderboardEntry } from '@/types';
import { formatTonnage, formatDate, getMonthKey } from '@/lib/utils';

type TabType = 'allTime' | 'monthly';

export default function Leaderboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<TabType>('monthly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [togglingVisibility, setTogglingVisibility] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getUserSettings(user.uid).then((s) => setShowOnLeaderboard(s.showOnLeaderboard));
    }
  }, [user]);

  useEffect(() => {
    setLoadingEntries(true);
    const monthKey = tab === 'monthly' ? getMonthKey(new Date()) : undefined;
    getLeaderboard(tab, monthKey)
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoadingEntries(false));
  }, [tab]);

  const handleToggleVisibility = async () => {
    if (!user) return;
    setTogglingVisibility(true);
    const newValue = !showOnLeaderboard;
    try {
      await updateUserSettings(user.uid, { showOnLeaderboard: newValue });
      setShowOnLeaderboard(newValue);
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setTogglingVisibility(false);
    }
  };

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">Leaderboard</h1>
          <button
            onClick={handleToggleVisibility}
            disabled={togglingVisibility}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              showOnLeaderboard
                ? 'border-green-500/30 text-green-400 bg-green-500/10'
                : 'border-zinc-700 text-zinc-500 bg-zinc-800'
            }`}
          >
            {showOnLeaderboard ? 'Visible' : 'Hidden'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('monthly')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'monthly'
                ? 'bg-orange-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {currentMonth}
          </button>
          <button
            onClick={() => setTab('allTime')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'allTime'
                ? 'bg-orange-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All Time
          </button>
        </div>

        {/* Leaderboard Table */}
        {loadingEntries ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <p className="text-lg mb-1">🏆</p>
            <p>No entries yet.</p>
            <p className="text-sm mt-1">Be the first to log a session!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry, index) => {
              const isMe = entry.userId === user.uid;
              const rank = index + 1;
              const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

              return (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                    isMe
                      ? 'bg-orange-500/10 border-orange-500/30'
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  {/* Rank */}
                  <div className="w-8 text-center">
                    {medal ? (
                      <span className="text-lg">{medal}</span>
                    ) : (
                      <span className="text-sm text-zinc-500 font-mono">#{rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0">
                    {entry.photoURL ? (
                      <img
                        src={entry.photoURL}
                        alt=""
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">
                        {entry.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isMe ? 'text-orange-500' : 'text-white'}`}>
                      {entry.displayName} {isMe && '(You)'}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(entry.bestSessionDate)}
                    </p>
                  </div>

                  {/* Tonnage */}
                  <div className="text-right">
                    <p className={`text-lg font-bold ${isMe ? 'text-orange-500' : 'text-white'}`}>
                      {formatTonnage(entry.bestSessionTonnage)}
                    </p>
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
