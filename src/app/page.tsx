'use client';

import { useAuth } from '@/components/AuthProvider';
import { signInWithGoogle } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M6.5 6.5v11M17.5 6.5v11M2 9.5h5M2 14.5h5M17 9.5h5M17 14.5h5M6.5 12h11" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">PushAtonne</h1>
          <p className="text-zinc-400 text-sm">
            Track your tonnage. Analyze your progress. Compete with friends.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-10 text-left">
          {[
            { icon: '📊', text: 'Auto-calculate tonnage per session' },
            { icon: '🎤', text: 'Voice dictation for quick logging' },
            { icon: '🤖', text: 'AI coaching powered by Claude' },
            { icon: '🏆', text: 'Compete on the leaderboard' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
              <span className="text-lg">{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={signingIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-zinc-900 font-medium py-3 px-6 rounded-xl hover:bg-zinc-100 transition-colors disabled:opacity-50"
        >
          {signingIn ? (
            <div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          <span>{signingIn ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>
      </div>
    </div>
  );
}
