import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Training Tips & Guides',
  description: 'Expert guides on workout volume, tonnage training, and progressive overload for serious lifters.',
  alternates: { canonical: '/blog' },
};

const posts = [
  {
    slug: 'what-is-tonnage-training',
    title: 'What Is Tonnage Training? The Complete Guide for Lifters',
    excerpt: 'Tonnage (or volume load) is one of the most reliable predictors of muscle growth and strength gains. Learn how to calculate it and why it matters.',
    date: '2026-03-15',
    readTime: '6 min read',
    tag: 'Training Science',
  },
  {
    slug: 'how-to-track-workout-volume',
    title: 'How to Track Workout Volume (And Why Most Lifters Don\'t Bother)',
    excerpt: 'Most lifters track reps and weights but ignore total volume. Here\'s why that\'s a mistake — and the simplest way to fix it.',
    date: '2026-03-22',
    readTime: '5 min read',
    tag: 'Tracking',
  },
  {
    slug: 'progressive-overload-guide',
    title: 'Progressive Overload: The Only Principle You Really Need',
    excerpt: 'Progressive overload is the foundation of every successful training program. Here\'s how to apply it systematically using volume tracking.',
    date: '2026-03-29',
    readTime: '7 min read',
    tag: 'Programming',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-900">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icons/icon-192x192.png" alt="Push Tonnes" className="w-7 h-7 rounded-md" />
            <span className="font-bold text-sm">Push Tonnes</span>
          </Link>
          <Link href="/#login" className="text-sm text-orange-500 hover:text-orange-400">
            Get started →
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-3">Training Guides</h1>
          <p className="text-zinc-400 text-lg">Science-backed articles for serious lifters.</p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                  {post.tag}
                </span>
                <span className="text-xs text-zinc-500">{post.readTime}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2 leading-snug">{post.title}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">{post.excerpt}</p>
              <p className="text-xs text-zinc-600">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-xs">© 2026 Push Tonnes</p>
      </footer>
    </div>
  );
}
