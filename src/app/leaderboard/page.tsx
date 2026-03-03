'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { getLeaderboard, getGymLeaderboard, getUserSettings, updateUserSettings } from '@/lib/firestore';
import { LeaderboardEntry, WeightCategory, getWeightCategory } from '@/types';
import { formatTonnage, formatDate, getMonthKey } from '@/lib/utils';

type TabType = 'monthly' | 'allTime' | 'gym' | 'category';

const WEIGHT_CATEGORIES: WeightCategory[] = ['-70kg', '70-80kg', '80-90kg', '90-100kg', '+100kg'];

export default function Leaderboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<TabType>('monthly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [togglingVisibility, setTogglingVisibility] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [userWeight, setUserWeight] = useState<number | undefined>();
  const [userCategory, setUserCategory] = useState<WeightCategory | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getUserSettings(user.uid).then((s) => {
        setShowOnLeaderboard(s.showOnLeaderboard);
        setUserWeight(s.weight);
        setUserCategory(getWeightCategory(s.weight));
      });
    }
  }, [user]);

  const fetchEntries = useCallback(async () => {
    setLoadingEntries(true);
    setLocationError('');
    try {
      if (tab === 'gym') {
        if (!userLocation) {
          // Request location
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
              setUserLocation(loc);
              const gymEntries = await getGymLeaderboard(loc.lat, loc.lng, 1);
              setEntries(gymEntries);
              setLoadingEntries(false);
            },
            () => {
              setLocationError('Location access denied. Enable location to see your gym leaderboard.');
              setLoadingEntries(false);
            },
            { timeout: 8000 }
          );
          return;
        } else {
          const gymEntries = await getGymLeaderboard(userLocation.lat, userLocation.lng, 1);
          setEntries(gymEntries);
        }
      } else if (tab === 'category') {
        const monthKey = getMonthKey(new Date());
        const all = await getLeaderboard('monthly', monthKey);
        const filtered = userCategory
          ? all.filter((e) => e.weightCategory === userCategory)
          : all;
        setEntries(filtered);
      } else {
        const monthKey = tab === 'monthly' ? getMonthKey(new Date()) : undefined;
        const result = await getLeaderboard(tab, monthKey);
        setEntries(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEntries(false);
    }
  }, [tab, userLocation, userCategory]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

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

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'monthly', label: currentMonth, icon: '📅' },
    { key: 'allTime', label: 'All Time', icon: '🏆' },
    { key: 'gym', label: 'My Gym', icon: '🏋️' },
    { key: 'category', label: userCategory ?? 'My Weight', icon: '⚖️' },
  ];

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
        <div className="grid grid-cols-4 gap-1 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-colors flex flex-col items-center gap-0.5 ${
                tab === t.key
                  ? 'bg-orange-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{t.icon}</span>
              <span className="truncate w-full text-center">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Gym tab info */}
        {tab === 'gym' && (
          <div className="mb-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400">
            🏋️ Showing people who trained within <strong className="text-white">1km</strong> of your current location in the last 90 days.
          </div>
        )}

        {/* Category tab info */}
        {tab === 'category' && (
          <div className="mb-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400">
            {userCategory ? (
              <>⚖️ Showing this month&apos;s top lifters in your weight category: <strong className="text-orange-500">{userCategory}</strong></>
            ) : (
              <>⚖️ Set your body weight in <button onClick={() => router.push('/settings')} className="text-orange-500 underline">Settings</button> to see your category.</>
            )}
          </div>
        )}

        {/* Location error */}
        {locationError && (
          <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400">
            {locationError}
          </div>
        )}

        {/* Leaderboard Table */}
        {loadingEntries ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <p className="text-lg mb-1">🏆</p>
            <p>No entries yet.</p>
            {tab === 'gym' && <p className="text-sm mt-1">Log a session at the gym to appear here!</p>}
            {tab === 'category' && !userCategory && <p className="text-sm mt-1">Set your weight in Settings first.</p>}
            {(tab === 'monthly' || tab === 'allTime') && <p className="text-sm mt-1">Be the first to log a session!</p>}
          </div>
        ) : (
          <div className="space-y-2 pb-24">
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
                  <div className="w-8 text-center">
                    {medal ? (
                      <span className="text-lg">{medal}</span>
                    ) : (
                      <span className="text-sm text-zinc-500 font-mono">#{rank}</span>
                    )}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0">
                    {entry.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={entry.photoURL} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">
                        {entry.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isMe ? 'text-orange-500' : 'text-white'}`}>
                      {entry.displayName} {isMe && '(You)'}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-zinc-500">{formatDate(entry.bestSessionDate)}</p>
                      {entry.weightCategory && (
                        <span className="text-xs text-zinc-600 border border-zinc-700 rounded px-1">{entry.weightCategory}</span>
                      )}
                    </div>
                  </div>

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
