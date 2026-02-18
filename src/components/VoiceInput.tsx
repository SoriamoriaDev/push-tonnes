'use client';

import { useState, useCallback } from 'react';
import { isSpeechSupported, createSpeechRecognition, parseSpeechInput, SpeechResult } from '@/lib/speech';

interface VoiceInputProps {
  onResult: (result: SpeechResult) => void;
}

export default function VoiceInput({ onResult }: VoiceInputProps) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = useCallback(() => {
    if (!isSpeechSupported()) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = createSpeechRecognition();
    if (!recognition) return;

    setListening(true);
    setTranscript('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript as string;
      setTranscript(text);
      const parsed = parseSpeechInput(text);
      onResult(parsed);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  }, [onResult]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={startListening}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
          listening
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-zinc-600'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
          <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
        </svg>
        {listening ? 'Listening...' : 'Voice'}
      </button>
      {transcript && (
        <span className="text-xs text-zinc-500 truncate max-w-[200px]">
          &quot;{transcript}&quot;
        </span>
      )}
    </div>
  );
}
