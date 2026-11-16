import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  RotateCcw,
  Wrench,
  Calendar,
  Flame,
} from 'lucide-react';
import { CityPreset, AirPollutantMetrics, AtmosphericMetrics, FamilyProfile, GenAIChatMessage } from '../types';
import { askGeminiSmogAssistant } from '../services/geminiService';

interface SmogCopilotProps {
  city: CityPreset;
  pollutants: AirPollutantMetrics;
  atmosphere: AtmosphericMetrics;
  familyProfile: FamilyProfile;
}

const SUGGESTED_PROMPTS = [
  'How should I shift our family\'s morning routine to avoid the smog inversion?',
  'How do I build a $50 Corsi-Rosenthal DIY air purifier for our home?',
  'When is the exact safe solar window to open windows today?',
  'Explain the Berkeley Earth cigarette calculation for our air quality.',
  'What sustainable commute swaps reduce winter smog for our family?',
];

export const SmogCopilot: React.FC<SmogCopilotProps> = ({
  city,
  pollutants,
  atmosphere,
  familyProfile,
}) => {
  const [messages, setMessages] = useState<GenAIChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello ${familyProfile.familyName}! I am **AeroGuard**, your GenAI Urban Smog & Community Resilience Copilot powered by Google Gemini.

I am actively tracking atmospheric inversion dynamics in **${city.name}** (Current US AQI: **${pollutants.usAqi}**, Boundary Layer: **${atmosphere.boundaryLayerHeightM}m**).

Ask me for:
- 🗓️ **Optimized low-emission daily routines** synchronized with diurnal solar mixing windows.
- 🛠️ **DIY indoor air purification hacks** (Corsi-Rosenthal boxes, bedroom sanctuary isolation).
- 🚲 **Sustainable lifestyle alternatives** tailored to your commute, heating, and family health.
- 📊 **Quantified physical impact explanations** (Berkeley Earth cigarettes spared, inhaled dose avoided).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messageCounter = useRef(100);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    messageCounter.current += 1;
    const userMessage: GenAIChatMessage = {
      id: `usr-${messageCounter.current}`,
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const assistantMessage = await askGeminiSmogAssistant(
        query.trim(),
        messages,
        city,
        pollutants,
        atmosphere,
        familyProfile
      );
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting for speech
    const cleanText = text
      .replace(/[#*_`]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .slice(0, 350);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'assistant',
        content: `Conversation reset. I am ready to advise ${familyProfile.familyName} on navigating winter smog in ${city.name}. What can I analyze for you?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <section
      className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col h-[650px] relative"
      aria-labelledby="copilot-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
            <Bot className="w-5 h-5 text-slate-950" aria-hidden="true" />
          </div>
          <div>
            <h2 id="copilot-heading" className="text-base font-bold text-white flex items-center space-x-2">
              <span>AeroGuard Smog Copilot</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Gemini 2.5 Flash
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Context-grounded reasoning • Inversion physics • Frugal DIY engineering
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetChat}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
          title="Reset conversation"
          aria-label="Reset conversation"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-slate-800/60">
        <span className="text-[11px] text-slate-400 font-semibold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-400" aria-hidden="true" /> Prompt Ideas:
        </span>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-emerald-950/60 hover:text-emerald-300 border border-slate-700/80 hover:border-emerald-500/40 text-slate-300 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div
        className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 focus:outline-none"
        tabIndex={0}
        aria-label="Conversation messages"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" aria-hidden="true" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-tl-none'
              }`}
            >
              {/* Message Content Rendered */}
              <div className="prose prose-invert prose-xs max-w-none space-y-2 whitespace-pre-wrap">
                {msg.content}
              </div>

              {/* Structured Card Rendering */}
              {msg.structuredCard && (
                <div className="mt-3 pt-3 border-t border-slate-700/70 bg-slate-900/60 rounded-xl p-3 border border-slate-800">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-1.5">
                    {msg.structuredCard.type === 'ROUTINE_PATCH' && <Calendar className="w-3.5 h-3.5" />}
                    {msg.structuredCard.type === 'DIY_HACK' && <Wrench className="w-3.5 h-3.5" />}
                    {msg.structuredCard.type === 'IMPACT_METRIC' && <Flame className="w-3.5 h-3.5" />}
                    <span>{msg.structuredCard.headline}</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                    {msg.structuredCard.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  {msg.structuredCard.quantifiedBenefit && (
                    <div className="mt-2 text-[10px] font-mono px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-semibold">
                      ⚡ Direct Impact: {msg.structuredCard.quantifiedBenefit}
                    </div>
                  )}
                </div>
              )}

              {/* Timestamp & Speech Action */}
              <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-slate-400">
                <span>{msg.timestamp}</span>
                {msg.role === 'assistant' && (
                  <button
                    type="button"
                    onClick={() => handleSpeak(msg.content)}
                    className="p-1 rounded hover:text-slate-200 transition-colors focus-visible:ring-1 focus-visible:ring-emerald-400 focus:outline-none"
                    title={isSpeaking ? 'Mute Speech' : 'Listen via Voice Synthesizer'}
                    aria-label={isSpeaking ? 'Mute Speech' : 'Listen to message'}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-200 shrink-0 mt-0.5">
                <User className="w-4 h-4" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Bot className="w-4 h-4 animate-spin" aria-hidden="true" />
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Analyzing boundary layer inversion physics and household parameters...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="pt-3 border-t border-slate-800 flex items-center gap-2"
      >
        <label htmlFor="copilot-input" className="sr-only">
          Ask AeroGuard about winter smog routines, indoor hacks, and impact
        </label>
        <input
          id="copilot-input"
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask about routines, Corsi-Rosenthal hacks, or ventilation for ${city.name}...`}
          className="flex-1 bg-slate-950 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-950/40 focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
          aria-label="Send message to AeroGuard"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </section>
  );
};
