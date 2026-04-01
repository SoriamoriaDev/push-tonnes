'use client';

import { useAuth } from '@/components/AuthProvider';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, sendPasswordReset } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Mode = 'google' | 'email';
type EmailMode = 'signin' | 'signup' | 'reset';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<Mode>('google');
  const [emailMode, setEmailMode] = useState<EmailMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setError('');
    try {
      const u = await signInWithGoogle();
      if (u) router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setSigningIn(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setError('');
    try {
      if (emailMode === 'reset') {
        await sendPasswordReset(email);
        setResetSent(true);
        setSigningIn(false);
        return;
      }
      if (emailMode === 'signup') {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('user-not-found') || message.includes('wrong-password') || message.includes('invalid-credential')) {
        setError('Invalid email or password.');
      } else if (message.includes('email-already-in-use')) {
        setError('An account with this email already exists.');
      } else if (message.includes('weak-password')) {
        setError('Password must be at least 6 characters.');
      } else {
        setError(message);
      }
      setSigningIn(false);
    }
  };

  const scrollToLogin = () => {
    document.getElementById('login')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icons/icon-192x192.png" alt="Push Tonnes" className="w-7 h-7 rounded-md" />
            <span className="font-bold text-white text-sm">Push Tonnes</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</a>
            <button
              onClick={scrollToLogin}
              className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
            >
              Get started →
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-xs text-orange-400 font-medium mb-6">
          🏋️ Built for serious lifters
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
          Track every kilo.<br />
          <span className="text-orange-500">Push more tonnes.</span>
        </h1>
        <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          The simplest way to log workout volume, track your progress over time, and see how you stack up against other athletes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={scrollToLogin}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-colors text-base"
          >
            Start tracking free
          </button>
          <button
            onClick={scrollToLogin}
            className="border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white font-medium px-8 py-4 rounded-2xl transition-colors text-base"
          >
            Sign in
          </button>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 px-6 border-y border-zinc-900">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: '1000+', label: 'Tonnes logged' },
            { value: 'AI', label: 'Powered coaching' },
            { value: '100%', label: 'Free to use' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-2xl sm:text-4xl font-black text-orange-500 mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Everything you need</h2>
          <p className="text-zinc-400 text-base max-w-md mx-auto">No fluff. Just the tools that make you lift more.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: '📊',
              title: 'Auto tonnage calculation',
              desc: 'Every set you log automatically contributes to your session and all-time totals. No math required.',
            },
            {
              icon: '🎤',
              title: 'Voice dictation',
              desc: 'Speak your sets hands-free between reps. "Bench press, 5 reps, 100kg" — done.',
            },
            {
              icon: '🤖',
              title: 'AI coach analysis',
              desc: 'Claude analyses your sessions and gives you personalised feedback on strengths, weaknesses, and what to do next.',
            },
            {
              icon: '🏆',
              title: 'Leaderboard',
              desc: 'See where you rank against other lifters — globally, by weight category, or at your gym.',
            },
            {
              icon: '⏱️',
              title: 'Session timing',
              desc: 'Automatic start and end time tracking. See exactly how long your sessions last.',
            },
            {
              icon: '📈',
              title: 'Progress analytics',
              desc: 'Visualise your tonnage over weeks and months. Spot the trend before you feel it.',
            },
          ].map((f, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:-translate-y-0.5 transition-transform">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-zinc-900/40 border-y border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">How it works</h2>
            <p className="text-zinc-400 text-base">Three steps to your first session</p>
          </div>
          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Log your session',
                desc: 'Add exercises, sets, reps and weight. Use voice input to log without touching your phone between sets.',
              },
              {
                step: '02',
                title: 'Review your tonnage',
                desc: 'See your total volume calculated instantly. Track how today compares to your previous sessions.',
              },
              {
                step: '03',
                title: 'Get AI feedback & compete',
                desc: 'Let Claude analyse your training and get actionable advice. Then see where you rank on the leaderboard.',
              },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <span className="text-orange-500 font-black text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGIN ── */}
      <section id="login" className="py-20 px-6">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <img src="/icons/icon-192x192.png" alt="Push Tonnes" className="w-16 h-16 rounded-2xl mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-1">Start lifting smarter</h2>
            <p className="text-zinc-400 text-sm">Free account. No credit card.</p>
          </div>

          {/* Mode tabs */}
          <div className="flex rounded-xl overflow-hidden border border-zinc-800 mb-5">
            <button
              onClick={() => { setMode('google'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'google' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Google
            </button>
            <button
              onClick={() => { setMode('email'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'email' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Email
            </button>
          </div>

          {mode === 'google' && (
            <button
              onClick={handleGoogleSignIn}
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
              <span>{signingIn ? 'Signing in...' : 'Continue with Google'}</span>
            </button>
          )}

          {mode === 'email' && (
            <div>
              <div className="flex gap-3 mb-4 justify-center">
                {(['signin', 'signup'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setEmailMode(m); setError(''); setResetSent(false); }}
                    className={`text-sm pb-1 border-b-2 transition-colors ${emailMode === m ? 'border-orange-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {m === 'signin' ? 'Sign in' : 'Sign up'}
                  </button>
                ))}
              </div>

              {emailMode === 'reset' ? (
                <form onSubmit={handleEmailAuth} className="space-y-3">
                  {resetSent ? (
                    <p className="text-green-400 text-sm py-2">Reset email sent! Check your inbox.</p>
                  ) : (
                    <>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                      />
                      <button
                        type="submit"
                        disabled={signingIn}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {signingIn ? 'Sending...' : 'Send reset link'}
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => { setEmailMode('signin'); setError(''); setResetSent(false); }}
                    className="text-sm text-zinc-500 hover:text-zinc-300"
                  >
                    ← Back to sign in
                  </button>
                </form>
              ) : (
                <form onSubmit={handleEmailAuth} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    minLength={6}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    disabled={signingIn}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {signingIn ? '...' : emailMode === 'signin' ? 'Sign in' : 'Create account'}
                  </button>
                  {emailMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => { setEmailMode('reset'); setError(''); }}
                      className="text-xs text-zinc-500 hover:text-zinc-300"
                    >
                      Forgot password?
                    </button>
                  )}
                </form>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-xs break-all">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-xs">© 2026 Push Tonnes — Track every kilo.</p>
      </footer>

    </div>
  );
}
