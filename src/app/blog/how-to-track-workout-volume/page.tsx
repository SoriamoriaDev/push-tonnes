import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Track Workout Volume (And Why Most Lifters Don\'t Bother)',
  description: 'Most lifters track reps and weights but ignore total volume. Here\'s why that\'s a mistake — and the simplest way to fix it with consistent workout logging.',
  alternates: { canonical: '/blog/how-to-track-workout-volume' },
  openGraph: {
    title: 'How to Track Workout Volume (And Why Most Lifters Don\'t Bother)',
    description: 'Most lifters track reps and weights but ignore total volume. Here\'s why that\'s a mistake.',
    type: 'article',
    publishedTime: '2026-03-22',
  },
};

export default function HowToTrackWorkoutVolume() {
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
            <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded-full">Tracking</span>
            <span className="text-xs text-zinc-500">5 min read · March 22, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            How to Track Workout Volume (And Why Most Lifters Don&apos;t Bother)
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Most lifters write down their reps and weights, stare at the numbers, and have no idea if they&apos;re actually progressing. Tracking volume fixes this — here&apos;s how to do it without the faff.
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-base leading-relaxed">
          <h2 className="text-xl font-bold text-white mt-8">Why lifters avoid tracking volume</h2>
          <p>
            The honest answer: it&apos;s maths. Even simple multiplication across 5 exercises with 4 sets each is tedious mid-workout. So most people skip it, stick to writing &quot;4×8 @ 80kg&quot; in a notebook, and wonder why progress stalls.
          </p>
          <p>
            The irony is that <strong>volume tracking is the only metric that reliably predicts long-term progress</strong>. Not the weight on the bar in isolation, not the number of sets — the total load moved.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">What exactly are you tracking?</h2>
          <p>
            Volume load (or tonnage) is calculated as:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 my-6 font-mono text-sm text-orange-400">
            Volume = Sets × Reps × Weight (kg)
          </div>
          <p>
            You can track this at three levels:
          </p>
          <ul className="list-none space-y-2 pl-0">
            <li className="flex gap-3"><span className="text-orange-500">→</span><span><strong className="text-white">Exercise level:</strong> How much tonnage you moved on bench, squats, etc.</span></li>
            <li className="flex gap-3"><span className="text-orange-500">→</span><span><strong className="text-white">Session level:</strong> Total tonnage for today&apos;s workout.</span></li>
            <li className="flex gap-3"><span className="text-orange-500">→</span><span><strong className="text-white">Weekly level:</strong> Total tonnage across all sessions that week.</span></li>
          </ul>
          <p>
            All three are useful. Session tonnage tells you if today was a hard or light day. Weekly tonnage tells you if your training load is trending in the right direction.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Method 1: Spreadsheet (works, but painful)</h2>
          <p>
            Google Sheets or Excel with columns for date, exercise, sets, reps, weight, and an auto-calculated volume column. Works fine if you love spreadsheets and have patience. Most people abandon this within 3 weeks.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Method 2: A notebook with end-of-session maths</h2>
          <p>
            Write everything down during the session, then calculate totals at the end. Better than nothing, but the overhead still makes it a chore. And you can&apos;t see trends easily.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Method 3: An app that does it automatically</h2>
          <p>
            The fastest method. You log your sets as normal — exercise, reps, weight — and the app calculates volume in real-time. You can see your session total climb as you go, which is surprisingly motivating.
          </p>
          <p>
            Push Tonnes is built specifically for this. It shows your session tonnage in the header as you log, and your all-time total on the dashboard. No maths required.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">What to do with the data</h2>
          <p>
            Once you have 4–6 weeks of data, patterns emerge quickly:
          </p>
          <ul className="list-none space-y-2 pl-0">
            <li className="flex gap-3"><span className="text-orange-500">1.</span><span>Compare your average weekly tonnage month-over-month. Going up = good.</span></li>
            <li className="flex gap-3"><span className="text-orange-500">2.</span><span>Identify your strongest sessions (high tonnage, good recovery) vs. flat sessions.</span></li>
            <li className="flex gap-3"><span className="text-orange-500">3.</span><span>Use AI analysis to get specific recommendations based on your patterns.</span></li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">One common mistake</h2>
          <p>
            Don&apos;t optimise for tonnage at the expense of technique. It&apos;s easy to inflate your numbers by doing high-rep, low-weight sets that don&apos;t actually build strength. Tonnage is a useful proxy for productive work — but only if the sets themselves are quality.
          </p>
          <p>
            A good rule of thumb: all tracked sets should be done with weight you could realistically perform for 1–2 more reps (i.e., not failure, not junk volume).
          </p>
        </div>

        <div className="mt-12 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
          <p className="font-bold text-white mb-2">Start tracking your volume today</p>
          <p className="text-sm text-zinc-400 mb-4">Push Tonnes calculates session tonnage automatically as you log. Free forever.</p>
          <Link href="/#login" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors">
            Create free account →
          </Link>
        </div>
      </article>

      <footer className="py-8 px-6 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-xs">© 2026 Push Tonnes</p>
      </footer>
    </div>
  );
}
