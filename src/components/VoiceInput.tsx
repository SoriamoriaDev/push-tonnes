'use client';

import { useState, useCallback, useRef } from 'react';
import { isSpeechSupported, createSpeechRecognition, parseSpeechInput, getBrowserLanguage, SpeechResult } from '@/lib/speech';

interface VoiceInputProps {
  onResult: (result: SpeechResult) => void;
}

export default function VoiceInput({ onResult }: VoiceInputProps) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [lang, setLang] = useState<'fr' | 'en'>(getBrowserLanguage);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
    setInterimTranscript('');
  }, []);

  const startListening = useCallback(() => {
    if (!isSpeechSupported()) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (listening) {
      stopListening();
      return;
    }

    const recognition = createSpeechRecognition(lang);
    if (!recognition) return;

    recognitionRef.current = recognition;
    setListening(true);
    setTranscript('');
    setInterimTranscript('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript as string;
        if (event.results[i].isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }

      if (interim) setInterimTranscript(interim);

      if (final) {
        setTranscript(final);
        setInterimTranscript('');
        const parsed = parseSpeechInput(final);
        onResult(parsed);
        setListening(false);
        recognitionRef.current = null;
      }
    };

    recognition.onerror = () => {
      setListening(false);
      setInterimTranscript('');
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      // If we still have interim but no final, use it
      if (interimTranscript && listening) {
        const parsed = parseSpeechInput(interimTranscript);
        onResult(parsed);
        setTranscript(interimTranscript);
      }
      setListening(false);
      setInterimTranscript('');
      recognitionRef.current = null;
    };

    recognition.start();
  }, [onResult, lang, listening, stopListening, interimTranscript]);

  const toggleLang = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLang((l) => (l === 'fr' ? 'en' : 'fr'));
  }, []);

  const displayText = interimTranscript || transcript;

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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${listening ? 'animate-pulse' : ''}`}>
          <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
          <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
        </svg>
        {listening ? 'Stop' : 'Voice'}
      </button>

      <button
        type="button"
        onClick={toggleLang}
        className="text-xs text-zinc-500 hover:text-zinc-300 px-1.5 py-1 rounded border border-zinc-800 hover:border-zinc-600"
        title="Toggle language"
      >
        {lang.toUpperCase()}
      </button>

      {displayText && (
        <span className={`text-xs truncate max-w-[160px] ${interimTranscript ? 'text-zinc-500 italic' : 'text-zinc-400'}`}>
          &quot;{displayText}&quot;
        </span>
      )}
    </div>
  );
}
