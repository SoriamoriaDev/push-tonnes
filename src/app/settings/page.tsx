'use client';

import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserSettings, updateUserSettings } from '@/lib/firestore';
import { signOut } from '@/lib/auth';
import { updateProfile } from 'firebase/auth';
import { UserSettings } from '@/types';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings>({ showOnLeaderboard: true });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getUserSettings(user.uid)
        .then((s) => {
          // Pre-fill displayName from Firebase Auth if not set in settings
          if (!s.displayName && user.displayName) {
            s.displayName = user.displayName;
          }
          setSettings(s);
        })
        .catch(console.error)
        .finally(() => setLoadingSettings(false));
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserSettings(user.uid, settings);
      // Also update Firebase Auth display name if changed
      if (settings.displayName && settings.displayName !== user.displayName) {
        await updateProfile(user, { displayName: settings.displayName });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading || loadingSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3 flex items-center justify-between">
          <h1 className="text-sm font-medium text-white">Settings</h1>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 pt-4 pb-24">
        {/* Profile */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
          <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Profile</p>
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-white text-sm font-medium">{user?.displayName || 'No name'}</p>
              <p className="text-zinc-400 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Personal info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
          <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Personal Info</p>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Display Name</label>
              <input
                type="text"
                value={settings.displayName ?? ''}
                onChange={(e) => setSettings({ ...settings, displayName: e.target.value || undefined })}
                placeholder="Your name"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-1">Age</label>
              <input
                type="number"
                min={10}
                max={120}
                value={settings.age ?? ''}
                onChange={(e) => setSettings({ ...settings, age: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Your age"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-1">Body weight (kg)</label>
              <input
                type="number"
                min={20}
                max={300}
                step={0.5}
                value={settings.weight ?? ''}
                onChange={(e) => setSettings({ ...settings, weight: e.target.value ? parseFloat(e.target.value) : undefined })}
                placeholder="Your weight in kg"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-1">Gender</label>
              <select
                value={settings.gender ?? ''}
                onChange={(e) => setSettings({ ...settings, gender: e.target.value as UserSettings['gender'] || undefined })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
          <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Preferences</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Show on leaderboard</p>
              <p className="text-xs text-zinc-500">Let others see your best sessions</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, showOnLeaderboard: !settings.showOnLeaderboard })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showOnLeaderboard ? 'bg-orange-500' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showOnLeaderboard ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 mb-3"
        >
          {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Settings'}
        </button>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-medium py-3 rounded-xl transition-colors"
        >
          Sign out
        </button>
      </main>
      <BottomNav />
    </div>
  );
}
