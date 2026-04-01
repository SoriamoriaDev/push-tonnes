import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Tonnage Strategy for Fat Loss: Why I Built This App',
  description: 'The real reason I built Push Tonnes — using total workout tonnage as a proxy for calorie burn, and why this strategy naturally leads to full-body training every session.',
  alternates: { canonical: '/blog/tonnage-strategy-for-fat-loss' },
  openGraph: {
    title: 'The Tonnage Strategy for Fat Loss: Why I Built This App',
    description: 'Using total workout tonnage as a calorie burn proxy — and why it leads to full-body training every session.',
    type: 'article',
    publishedTime: '2026-04-01',
  },
};

export default function TonnageStrategyForFatLoss() {
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
            <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded-full">Fat Loss</span>
            <span className="text-xs text-zinc-500">6 min read · April 1, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            The Tonnage Strategy for Fat Loss: Why I Built This App
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            I didn&apos;t build Push Tonnes to optimise for strength or hypertrophy. I built it to lose weight — and when I started thinking clearly about what actually burns calories in the gym, tonnage was the answer.
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-base leading-relaxed">
          <h2 className="text-xl font-bold text-white mt-8">The real goal: burn more calories lifting</h2>
          <p>
            Most weight-loss advice circles around cardio — run more, cycle more, sweat more. And it works. But I&apos;ve always preferred lifting, and I wanted to know: <em>how do I make lifting as metabolically demanding as possible?</em>
          </p>
          <p>
            The answer is straightforward once you think about it. The amount of energy you expend lifting weights is proportional to how much total work you do. Work, in the physics sense, is force times distance — which in lifting terms translates directly to <strong>total weight moved</strong>. That&apos;s tonnage.
          </p>
          <p>
            More tonnes pushed = more calories burned. Not perfectly linear, not the only factor — but a solid, trackable proxy.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">The unexpected consequence: full-body training</h2>
          <p>
            Once you start optimising for maximum tonnage per session, something interesting happens. You quickly realise that your legs can move vastly more weight than your upper body.
          </p>
          <p>
            A set of leg press at 200kg for 10 reps contributes 2,000kg to your session tonnage. A set of lateral raises at 12kg for 12 reps contributes 144kg. The difference is enormous.
          </p>
          <p>
            If your goal is maximum tonnage — and therefore maximum calorie burn — you cannot afford to skip legs. Or to do an &quot;upper body only&quot; session. <strong>You naturally end up training the whole body every session</strong> because leaving out your lower body means leaving tonnes of potential on the table.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 my-6">
            <p className="text-sm font-bold text-white mb-3">Example: Upper-only vs. Full-body session tonnage</p>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-zinc-500 mb-1">Upper body only (chest, back, shoulders, arms)</p>
                <p className="text-orange-500 font-mono font-bold">≈ 8,000 – 12,000 kg</p>
              </div>
              <div className="border-t border-zinc-800 pt-3">
                <p className="text-zinc-500 mb-1">Full body (add squats, leg press, RDLs)</p>
                <p className="text-orange-500 font-mono font-bold">≈ 18,000 – 28,000 kg</p>
              </div>
            </div>
          </div>

          <p>
            That&apos;s not a marginal difference — it can be double the metabolic work from adding two or three leg exercises.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Is this backed by science?</h2>
          <p>
            The relationship between volume load and energy expenditure is well established in exercise physiology. Resistance training sessions with higher total volume show meaningfully greater EPOC (excess post-exercise oxygen consumption) — the &quot;afterburn&quot; effect that continues burning calories for hours after the session ends.
          </p>
          <p>
            Research from the <em>Journal of Strength and Conditioning Research</em> consistently shows that total volume load is one of the strongest predictors of metabolic cost in resistance training sessions. Full-body protocols typically produce higher EPOC than split routines matched for session duration, precisely because larger muscle groups (legs, back) are recruited.
          </p>
          <p>
            The strategy isn&apos;t new — it&apos;s essentially what Olympic weightlifters and powerlifters have always done when they talk about &quot;accumulating tonnage&quot; in training blocks. It&apos;s just rarely framed explicitly as a fat-loss tool.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">How this changes your training structure</h2>
          <p>
            If you adopt this framework, here&apos;s what changes practically:
          </p>
          <ul className="list-none space-y-3 pl-0">
            <li className="flex gap-3">
              <span className="text-orange-500 shrink-0">→</span>
              <span><strong className="text-white">No more split routines.</strong> Chest/back/arms days go out the window. Every session hits the full body, prioritising compound movements on the largest muscle groups.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 shrink-0">→</span>
              <span><strong className="text-white">Legs first, not last.</strong> If you train legs at the end when you&apos;re tired, you leave the biggest tonnage potential untapped. Start with squats or leg press.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 shrink-0">→</span>
              <span><strong className="text-white">Track the number that matters.</strong> Not calories (hard to measure accurately), not steps, not heart rate — just tonnes pushed per session. Is it going up week over week? You&apos;re doing more work. You&apos;re burning more.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 shrink-0">→</span>
              <span><strong className="text-white">Rest days become essential.</strong> Full-body training is demanding. You need at least one day between sessions, and probably two if intensity is high.</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">The honest caveats</h2>
          <p>
            This isn&apos;t a magic system. A few things to be clear about:
          </p>
          <p>
            <strong className="text-white">Nutrition still dominates.</strong> You cannot out-train a bad diet. Tonnage strategy works best when combined with a modest caloric deficit — think of the training as protecting muscle mass and amplifying fat loss, not replacing dietary discipline.
          </p>
          <p>
            <strong className="text-white">High tonnage ≠ high intensity forever.</strong> You need deload weeks. Chasing maximum tonnage every session will grind you down. Plan for lighter weeks every 4th week where you drop to 70% of your peak tonnage.
          </p>
          <p>
            <strong className="text-white">Technique doesn&apos;t care about your tonnage goal.</strong> Moving bad weight doesn&apos;t count. Heavy leg press with your spine doing something inadvisable isn&apos;t a win. Quality reps only.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Why I built the app</h2>
          <p>
            When I started using this framework seriously, I found myself doing mental arithmetic mid-session, trying to calculate if today&apos;s tonnage was ahead of last week. Then I&apos;d forget the numbers. Then I&apos;d lose motivation because I had no clear feedback on whether I was actually progressing.
          </p>
          <p>
            Push Tonnes fixes that. You log your sets, it calculates tonnage in real-time, shows you your session total and how it compares to previous sessions, and shows your all-time total on the dashboard. The feedback loop is immediate and motivating.
          </p>
          <p>
            The leaderboard was a natural addition — if you&apos;re competing with yourself on tonnage, why not with others too?
          </p>

          <h2 className="text-xl font-bold text-white mt-8">The bottom line</h2>
          <p>
            If your goal is fat loss through lifting, optimise for tonnage. Push more total weight each week, train your full body every session (especially legs), and watch the number go up. It&apos;s a simple, measurable goal that naturally leads to more productive training.
          </p>
          <p>
            That&apos;s why this app exists.
          </p>
        </div>

        <div className="mt-12 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
          <p className="font-bold text-white mb-2">Track your tonnage — free</p>
          <p className="text-sm text-zinc-400 mb-4">Push Tonnes shows your session tonnage in real-time as you log. No maths, no spreadsheets.</p>
          <Link href="/#login" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors">
            Start today →
          </Link>
        </div>
      </article>

      <footer className="py-8 px-6 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-xs">© 2026 Push Tonnes</p>
      </footer>
    </div>
  );
}
