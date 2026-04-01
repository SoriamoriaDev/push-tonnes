'use client';

import { useEffect, useState } from 'react';

const DISMISSED_KEY = 'pushTonnes_pwaDismissed';
const DISMISSED_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

type BannerType = 'chromium' | 'ios' | null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallBanner() {
  const [bannerType, setBannerType] = useState<BannerType>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Check if already dismissed recently
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed && Date.now() - parseInt(dismissed) < DISMISSED_DURATION_MS) return;

    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if ((window.navigator as unknown as { standalone?: boolean }).standalone) return;

    // Detect iOS Safari
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isSafari = /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
      setBannerType('ios');
      return;
    }

    // Listen for Chrome/Edge/Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setBannerType('chromium');
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setBannerType(null);
    } else {
      setInstalling(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
    setBannerType(null);
  };

  if (!bannerType) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-lg mx-auto">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-3">
          <img src="/icons/icon-192x192.png" alt="Push Tonnes" className="w-10 h-10 rounded-xl shrink-0" />
          <div className="flex-1 min-w-0">
            {bannerType === 'chromium' ? (
              <>
                <p className="text-sm font-semibold text-white mb-0.5">Install Push Tonnes</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Add to your home screen for the best experience — works offline, no browser UI.
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleInstall}
                    disabled={installing}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {installing ? 'Installing...' : '⬇ Install'}
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="text-zinc-500 hover:text-zinc-300 text-xs px-3 py-2 transition-colors"
                  >
                    Not now
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-white mb-0.5">Add to Home Screen</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tap <span className="text-white font-medium">Share</span>{' '}
                  <span className="text-base">⎙</span> then{' '}
                  <span className="text-white font-medium">"Add to Home Screen"</span> for the full app experience.
                </p>
                <button
                  onClick={handleDismiss}
                  className="mt-2 text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
                >
                  Dismiss
                </button>
              </>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="text-zinc-600 hover:text-zinc-400 transition-colors shrink-0 text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
