/**
 * @file useSpeechSynthesis.ts
 * @description Custom React hook managing Web Speech API text-to-speech (TTS) accessibility playback.
 * Ensures clean cancellation, browser speech support detection, and active utterance state tracking.
 */

import { useState, useCallback, useEffect } from 'react';
import { logger } from '../utils/logger.ts';

export interface UseSpeechSynthesisResult {
  isSpeaking: boolean;
  isSupported: boolean;
  speak: (text: string) => void;
  stop: () => void;
}

export function useSpeechSynthesis(): UseSpeechSynthesisResult {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      logger.warn('useSpeechSynthesis', 'SpeechSynthesis API not supported by browser environment');
      return;
    }

    // Clean any running utterance
    window.speechSynthesis.cancel();

    // Strip markdown formatting for cleaner audio rendering
    const plainText = text
      .replace(/[*_#`[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .trim();

    if (!plainText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        logger.error('useSpeechSynthesis', 'Speech utterance encountered error', e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err: unknown) {
      logger.error('useSpeechSynthesis', 'Failed to dispatch utterance', err);
      setIsSpeaking(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSpeaking,
    isSupported,
    speak,
    stop
  };
}
