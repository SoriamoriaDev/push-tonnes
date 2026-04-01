import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What Is Tonnage Training? The Complete Guide for Lifters',
  description: 'Tonnage (or volume load) is one of the most reliable predictors of muscle growth and strength gains. Learn how to calculate it and why it matters for your training.',
  alternates: { canonical: '/blog/what-is-tonnage-training' },
  openGraph: {
    title: 'What Is Tonnage Training? The Complete Guide for Lifters',
    description: 'Learn how to calculate workout tonnage and why it\'s the most reliable predictor of long-term strength gains.',
    type: 'article',
    publishedTime: '2026-03-15',
  },
};

export default function WhatIsTonnageTraining() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="border-b border-zinc-900">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icons/icon-192x192.png" alt="Push Tonnes" className="w-7 h-7 rounded-md" />
            <span className="font-bold text-sm">Push Tonnes</span>
          </Link>
          <span className="text-zinc-700">/</span>
          <Link href="/blog" className="text-sm text-zinc-400 hover:text-white">Blog</Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-16">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded-full">Training Science</span>
            <span className="text-xs text-zinc-500">6 min read · March 15, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            What Is Tonnage Training? The Complete Guide for Lifters
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Tonnage (or volume load) is one of the most reliable predictors of muscle growth and strength gains. Here&apos;s what it is, how to calculate it, and why it should be the primary number you track.
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-base leading-relaxed">
          <h2 className="text-xl font-bold text-white mt-8">The simple definition</h2>
          <p>
            Tonnage — also called <strong>volume load</strong> — is the total amount of weight you move in a training session. The formula is dead simple:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 my-6 font-mono text-sm text-orange-400">
            Tonnage = Sets × Reps × Weight
          </div>
          <p>
            For example, if you do 4 sets of 8 reps at 100kg on the bench press, your tonnage for that exercise is <strong>3,200kg</strong>. Add up all your exercises and you get your session tonnage.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Why tonnage matters more than reps and sets alone</h2>
          <p>
            Most lifters track "4×8 bench" and call it done. But two sessions with identical sets and reps can have wildly different training effects if the weights are different. Tonnage captures both dimensions — intensity and volume — in a single number.
          </p>
          <p>
            Research consistently shows that total volume load is one of the strongest predictors of hypertrophy. In a landmark 2010 study by Schoenfeld, higher-volume protocols (matched for intensity) produced significantly greater muscle thickness than lower-volume ones.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Tonnage vs. training volume: what&apos;s the difference?</h2>
          <p>
            &quot;Training volume&quot; is often used loosely to mean the number of sets per week. Tonnage is more precise — it accounts for how heavy those sets are. A powerlifter doing 3×3 at 200kg and a hypertrophy-focused lifter doing 4×12 at 70kg both have meaningful &quot;volume&quot;, but their tonnage tells a very different story about training stimulus.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">How to track your tonnage</h2>
          <p>
            The traditional approach is a spreadsheet, but it&apos;s tedious and nobody actually does it consistently. Apps like <strong>Push Tonnes</strong> calculate it automatically as you log each set — so your session total, weekly total, and all-time total are always up to date without any manual arithmetic.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Setting a tonnage benchmark</h2>
          <p>
            Your first month of tracking establishes your baseline. From there, aim for a 5–10% increase in weekly tonnage every 4–6 weeks. This is gradual enough to be sustainable and fast enough to keep driving progress.
          </p>
          <p>
            Avoid increasing tonnage by more than 10% week-over-week — this is the most common cause of overuse injury in recreational lifters.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">The bottom line</h2>
          <p>
            Tonnage is the single number that bridges the gap between effort and progress. If your tonnage is going up over time, you&apos;re almost certainly getting stronger and building muscle. If it plateaus, you know exactly what to adjust.
          </p>
          <p>
            Start tracking it today — even a rough log is better than none.
          </p>
        </div>

        <div className="mt-12 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
          <p className="font-bold text-white mb-2">Track your tonnage automatically</p>
          <p className="text-sm text-zinc-400 mb-4">Push Tonnes calculates your volume load in real-time as you log each set. Free, no spreadsheet required.</p>
          <Link href="/#login" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors">
            Start tracking free →
          </Link>
        </div>
      </article>

      <footer className="py-8 px-6 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-xs">© 2026 Push Tonnes</p>
      </footer>
    </div>
  );
}
