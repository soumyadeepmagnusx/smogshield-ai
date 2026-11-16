/**
 * @file useCopilot.ts
 * @description Custom React hook managing conversational interactions with the AeroGuard Copilot.
 * Integrates Google Gemini 2.5 Flash, offline deterministic fallback, and security guardrail filtering.
 */

import { useState, useCallback } from 'react';
import type { GenAIChatMessage, CityPreset, AirPollutantMetrics, AtmosphericMetrics, FamilyProfile } from '../types/index.ts';
import { askGeminiSmogAssistant } from '../services/geminiService.ts';
import { sanitizeUserInput } from '../utils/security.ts';
import { logger } from '../utils/logger.ts';

export interface UseCopilotResult {
  messages: GenAIChatMessage[];
  inputQuery: string;
  isLoading: boolean;
  securityNotice: string | null;
  setInputQuery: (val: string) => void;
  sendMessage: (customText?: string) => Promise<void>;
  clearConversation: () => void;
}

export function useCopilot(
  city: CityPreset,
  pollutants: AirPollutantMetrics,
  atmosphere: AtmosphericMetrics,
  familyProfile: FamilyProfile,
  apiKeyOverride?: string
): UseCopilotResult {
  const [messages, setMessages] = useState<GenAIChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hello! I am **AeroGuard Copilot**, powered by Google Gemini 2.5 Flash. I am analyzing live air quality for **${city.name}** (AQI: ${pollutants.usAqi}, PM2.5: ${pollutants.pm25} µg/m³) alongside your family's profile (${familyProfile.familyName}). How can I help protect your household today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  const sendMessage = useCallback(async (customText?: string) => {
    const rawText = customText ?? inputQuery;
    if (!rawText.trim() || isLoading) return;

    // Security guardrail evaluation
    const check = sanitizeUserInput(rawText);
    if (!check.isSafe) {
      logger.warn('useCopilot', 'Prompt injection attempt detected and neutralized', { threat: check.threatDetected });
      setSecurityNotice('Security Guardrail: Unsupported instruction flagged and sanitized.');
      setTimeout(() => setSecurityNotice(null), 5000);
    }

    const userMsg: GenAIChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: check.sanitizedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputQuery('');
    setIsLoading(true);

    try {
      logger.info('useCopilot', 'Dispatching reasoning prompt to Gemini engine');
      const response = await askGeminiSmogAssistant(
        check.sanitizedText,
        messages,
        city,
        pollutants,
        atmosphere,
        familyProfile,
        apiKeyOverride
      );

      setMessages(prev => [...prev, response]);
    } catch (err: unknown) {
      logger.error('useCopilot', 'Copilot reasoning execution encountered failure', err);
      const errorMsg: GenAIChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an unexpected communication issue. Reverting to local emergency guidance: keep windows sealed, avoid morning outdoor exertion, and operate your Corsi-Rosenthal unit continuously.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [inputQuery, isLoading, messages, city, pollutants, atmosphere, familyProfile, apiKeyOverride]);

  const clearConversation = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    inputQuery,
    isLoading,
    securityNotice,
    setInputQuery,
    sendMessage,
    clearConversation
  };
}
