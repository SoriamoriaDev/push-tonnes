'use client';

import { useEffect, useRef, useCallback } from 'react';
import { signInWithGoogleCredential } from '@/lib/auth';

// Extend Window for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export default function GoogleSignInButton({ onSuccess, onError, disabled }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const handleCredentialResponse = useCallback(
    async (response: { credential: string }) => {
      try {
        await signInWithGoogleCredential(response.credential);
        onSuccess();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        onError(message);
      }
    },
    [onSuccess, onError]
  );

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
      return;
    }

    const initializeGIS = () => {
      if (!window.google || !buttonRef.current || initializedRef.current) return;
      initializedRef.current = true;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'filled_black',
        size: 'large',
        width: buttonRef.current.offsetWidth,
        shape: 'pill',
        text: 'continue_with',
        logo_alignment: 'left',
      });
    };

    // Load GIS script if not already loaded
    if (window.google?.accounts?.id) {
      initializeGIS();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGIS;
      document.head.appendChild(script);
    }
  }, [handleCredentialResponse]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    return null;
  }

  return (
    <div
      ref={buttonRef}
      className={`w-full ${disabled ? 'pointer-events-none opacity-50' : ''}`}
      style={{ minHeight: 44 }}
    />
  );
}
