import React, { useState } from 'react';
import { Key, X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [keyInput, setKeyInput] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('smogshield_gemini_key') || '' : '';
  });
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('smogshield_gemini_key', keyInput.trim());
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('smogshield_gemini_key');
    }
    setKeyInput('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-key-modal-title"
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Key className="w-5 h-5" aria-hidden="true" />
            <h3 id="api-key-modal-title" className="text-sm font-bold text-white">
              Google Gemini API Configuration
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Provide your Google Gemini API key to enable live streaming multi-turn reasoning with <strong>Gemini 2.5 Flash</strong>.
        </p>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Config Offline Fallback Active</span>
          </div>
          <p className="text-[11px] text-slate-400">
            If no API key is provided, SmogShield AI automatically engages its internal deterministic neural reasoning engine, generating context-specific guidance grounded in active telemetry and family profile.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label htmlFor="gemini-api-key" className="text-slate-300 font-semibold block mb-1">
              Gemini API Key (Optional):
            </label>
            <input
              id="gemini-api-key"
              type="password"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-600 font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
            >
              Clear Key
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center space-x-1 transition-colors"
              >
                {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{isSaved ? 'Saved!' : 'Save Key'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
