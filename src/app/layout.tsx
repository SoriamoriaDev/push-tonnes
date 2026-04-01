import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: {
    default: 'Push Tonnes — Track Your Workout Tonnage',
    template: '%s | Push Tonnes',
  },
  description: 'Push Tonnes is the free gym tracker that automatically calculates your workout volume. Log sessions, get AI coaching, and compete on the leaderboard.',
  keywords: ['workout tracker', 'tonnage training', 'gym log', 'progressive overload', 'weightlifting app', 'strength training tracker', 'workout volume'],
  authors: [{ name: 'Push Tonnes' }],
  creator: 'Push Tonnes',
  publisher: 'Push Tonnes',
  metadataBase: new URL('https://www.push-tonnes.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.push-tonnes.com',
    title: 'Push Tonnes — Track Your Workout Tonnage',
    description: 'The free gym tracker that automatically calculates your workout volume. Log sessions, get AI coaching, and compete on the leaderboard.',
    siteName: 'Push Tonnes',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Push Tonnes logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Push Tonnes — Track Your Workout Tonnage',
    description: 'The free gym tracker that automatically calculates your workout volume.',
    images: ['/icons/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Push Tonnes',
  },
};

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="antialiased bg-zinc-950 text-zinc-100 min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Push Tonnes',
              url: 'https://www.push-tonnes.com',
              description: 'Free gym tracker that automatically calculates workout tonnage. Log sessions, get AI coaching, and compete on the leaderboard.',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Web, iOS, Android',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            }),
          }}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
