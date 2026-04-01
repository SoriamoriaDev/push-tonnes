import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Progressive Overload: The Only Principle You Really Need',
  description: 'Progressive overload is the foundation of every successful training program. Here\'s how to apply it systematically using volume tracking to build strength consistently.',
  alternates: { canonical: '/blog/progressive-overload-guide' },
  openGraph: {
    title: 'Progressive Overload: The Only Principle You Really Need',
    description: 'Progressive overload is the foundation of every successful training program. Here\'s how to apply it systematically.',
    type: 'article',
    publishedTime: '2026-03-29',
  },
};

export default function ProgressiveOverloadGuide() {
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
            <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded-full">Programming</span>
            <span className="text-xs text-zinc-500">7 min read · March 29, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Progressive Overload: The Only Principle You Really Need
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Strip away every training methodology, every fancy programme, every argument about optimal sets and reps — and you&apos;re left with one principle that explains virtually all long-term progress: progressive overload.
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-base leading-relaxed">
          <h2 className="text-xl font-bold text-white mt-8">What progressive overload actually means</h2>
          <p>
            Progressive overload means systematically increasing the demands placed on your muscles over time. Your body adapts to stress — if the stress never increases, adaptation stops. Simple as that.
          </p>
          <p>
            The classic version is adding weight to the bar. But overload can also mean:
          </p>
          <ul className="list-none space-y-2 pl-0">
            <li className="flex gap-3"><span className="text-orange-500">→</span><span>More reps with the same weight</span></li>
            <li className="flex gap-3"><span className="text-orange-500">→</span><span>More sets per session</span></li>
            <li className="flex gap-3"><span className="text-orange-500">→</span><span>Higher total tonnage per week</span></li>
            <li className="flex gap-3"><span className="text-orange-500">→</span><span>Same tonnage with shorter rest periods</span></li>
            <li className="flex gap-3"><span className="text-orange-500">→</span><span>Better technique (more effective recruitment)</span></li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">Why most lifters plateau</h2>
          <p>
            Plateaus happen for one of two reasons:
          </p>
          <p>
            <strong className="text-white">1. They&apos;re not actually overloading.</strong> They go to the gym, do the same workout, feel tired, and assume they&apos;re progressing. Without tracking, there&apos;s no way to know. Six months later, they&apos;re lifting exactly what they were before.
          </p>
          <p>
            <strong className="text-white">2. They&apos;re overloading too fast.</strong> Adding weight every single session works for a few weeks, then leads to a stall or injury. Progress isn&apos;t linear — you need cycles of accumulation and recovery.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">The tonnage approach to progressive overload</h2>
          <p>
            Instead of trying to add weight to every exercise every session, track total weekly tonnage and aim to increase it by 5–10% per month. This gives you flexibility in how you achieve the overload — sometimes you add weight, sometimes you add a set, sometimes you improve rep quality.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 my-6">
            <p className="text-sm font-bold text-white mb-3">Example: 4-week tonnage progression</p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Week 1</span><span className="text-white">12,400 kg</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Week 2</span><span className="text-white">13,100 kg</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Week 3</span><span className="text-white">13,800 kg</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Week 4 (deload)</span><span className="text-orange-500">10,500 kg</span>
              </div>
            </div>
          </div>
          <p>
            The deload week is intentional — pulling back allows your connective tissue and nervous system to recover. You come back the next cycle stronger, not beaten up.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">How to implement it in practice</h2>
          <p>
            <strong className="text-white">Step 1:</strong> Establish a baseline. Log your sessions for 2–3 weeks without changing anything. Get a real picture of your current weekly tonnage.
          </p>
          <p>
            <strong className="text-white">Step 2:</strong> Set a target. Add 5% to your baseline weekly tonnage as a 4-week target.
          </p>
          <p>
            <strong className="text-white">Step 3:</strong> Distribute the increase. Don&apos;t try to add tonnage to every session. Pick your 2–3 priority exercises and add one set or 2.5kg to those.
          </p>
          <p>
            <strong className="text-white">Step 4:</strong> Deload every 4th week. Drop to ~70–80% of your peak week tonnage. This isn&apos;t optional — it&apos;s where adaptation actually happens.
          </p>
          <p>
            <strong className="text-white">Step 5:</strong> Review and repeat. After each 4-week cycle, look at what worked. Did you hit the tonnage target? Was recovery good? Adjust the next cycle accordingly.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">The role of AI coaching</h2>
          <p>
            Tracking is useful. Analysis is better. Push Tonnes uses Claude to review your session data and flag patterns you might miss — an exercise where your tonnage has stalled for 6 weeks, or a warning that your weekly volume is increasing too fast. It&apos;s like having a coach review your training log after every session.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">The bottom line</h2>
          <p>
            Progressive overload is not complicated. The tricky part is staying consistent and honest about whether you&apos;re actually doing it. That&apos;s what tracking is for.
          </p>
          <p>
            If your tonnage is higher this month than last month, you&apos;re on track. If it isn&apos;t, you know exactly what to fix.
          </p>
        </div>

        <div className="mt-12 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
          <p className="font-bold text-white mb-2">Apply progressive overload with data</p>
          <p className="text-sm text-zinc-400 mb-4">Push Tonnes tracks your tonnage automatically so you always know if you&apos;re actually overloading. Free to use.</p>
          <Link href="/#login" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors">
            Start free today →
          </Link>
        </div>
      </article>

      <footer className="py-8 px-6 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-xs">© 2026 Push Tonnes</p>
      </footer>
    </div>
  );
}
