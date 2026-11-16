import React, { useState } from 'react';
import {
  ShieldAlert,
  Wind,
  Users,
  Presentation,
  FileCode,
  Radio,
  SlidersHorizontal,
  Key,
  Eye,
} from 'lucide-react';
import { CityPreset, FamilyProfile } from '../types';
import { CITY_PRESETS } from '../constants/cities';

interface NavbarProps {
  selectedCity: CityPreset;
  onSelectCity: (city: CityPreset) => void;
  isDemoSafeMode: boolean;
  onToggleDemoSafe: () => void;
  isLiveStreaming?: boolean;
  familyProfile: FamilyProfile;
  onOpenProfileModal: () => void;
  onOpenPitchDeck: () => void;
  onOpenDossier: () => void;
  onOpenApiKeyModal: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onSelectCity,
  isDemoSafeMode,
  onToggleDemoSafe,
  isLiveStreaming: _unused = true,
  familyProfile,
  onOpenProfileModal,
  onOpenPitchDeck,
  onOpenDossier,
  onOpenApiKeyModal,
  highContrast,
  onToggleHighContrast,
}) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07090f]/85 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Mission Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-300 p-0.5 shadow-xl shadow-emerald-500/20">
              <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-emerald-400" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-white font-mono">
                  SmogShield<span className="text-emerald-400">.AI</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 shadow-sm">
                  Team Spectronz
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                GenAI Urban Winter Smog & Community Resilience Copilot
              </p>
            </div>
          </div>

          {/* Center: City Selector & Telemetry Status */}
          <div className="hidden md:flex items-center space-x-3">
            {/* City Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl glass-panel hover:border-emerald-500/50 text-xs font-bold text-slate-200 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none shadow-sm"
                aria-haspopup="listbox"
                aria-expanded={isCityDropdownOpen}
                aria-label={`Current location: ${selectedCity.name}, ${selectedCity.country}. Click to change.`}
              >
                <Wind className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>
                  {selectedCity.name}, {selectedCity.country}
                </span>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              </button>

              {isCityDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-2xl glass-panel shadow-2xl py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 border border-slate-700"
                  role="listbox"
                >
                  <div className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-white/10">
                    Winter Smog Hotspots & Presets
                  </div>
                  {CITY_PRESETS.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => {
                        onSelectCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between hover:bg-emerald-500/10 transition-colors ${
                        selectedCity.id === city.id
                          ? 'text-emerald-400 font-bold bg-emerald-500/15'
                          : 'text-slate-300'
                      }`}
                      role="option"
                      aria-selected={selectedCity.id === city.id}
                    >
                      <div>
                        <div className="font-bold">{city.name}</div>
                        <div className="text-[10px] text-slate-400">{city.country}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-700">
                        AQI {city.baselineMetrics.usAqi}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Mode vs Demo-Safe Mode Toggle */}
            <button
              type="button"
              onClick={onToggleDemoSafe}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none shadow-sm ${
                isDemoSafeMode
                  ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/60 shadow-amber-950/30'
                  : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60 shadow-emerald-950/30'
              }`}
              title="Toggle between Live Open-Meteo API and Deterministic Demo-Safe Ground Truth for offline hackathon evaluations"
              aria-label={`Mode: ${isDemoSafeMode ? 'Demo Safe Ground Truth Active' : 'Live Open-Meteo Feed Active'}`}
            >
              <Radio
                className={`w-3.5 h-3.5 ${isDemoSafeMode ? 'text-amber-400' : 'text-emerald-400 animate-pulse'}`}
                aria-hidden="true"
              />
              <span>{isDemoSafeMode ? 'DEMO-SAFE MODE' : 'LIVE TELEMETRY'}</span>
            </button>
          </div>

          {/* Right: Actions, Family Profile, Pitch Deck & Dossier */}
          <div className="flex items-center space-x-2.5">
            {/* High Contrast Accessibility Toggle */}
            <button
              type="button"
              onClick={onToggleHighContrast}
              className={`p-2.5 rounded-xl border text-xs transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                highContrast
                  ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-slate-500'
              }`}
              title="Toggle High-Contrast WCAG Mode"
              aria-label="Toggle High-Contrast Accessibility Mode"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* API Key Modal Button */}
            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className="p-2.5 rounded-xl glass-panel hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
              title="Configure Google Gemini API Key"
              aria-label="Google Gemini API Key Configuration"
            >
              <Key className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            </button>

            {/* Family Profile Button */}
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl glass-panel hover:border-emerald-500/50 text-xs font-bold text-slate-200 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
              aria-label="Configure Family & Household Profile"
            >
              <Users className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span className="hidden sm:inline">{familyProfile.familyName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                {familyProfile.memberCount}
              </span>
            </button>

            {/* Pitch Deck Button */}
            <button
              type="button"
              onClick={onOpenPitchDeck}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/30 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
              aria-label="Open Interactive Pitch Deck (10 Slides)"
            >
              <Presentation className="w-4 h-4 text-slate-950" aria-hidden="true" />
              <span className="hidden md:inline">Pitch Deck</span>
            </button>

            {/* Technical Dossier Button */}
            <button
              type="button"
              onClick={onOpenDossier}
              className="hidden lg:flex items-center space-x-2 px-3.5 py-2 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
              aria-label="Open Technical Architecture Dossier"
            >
              <FileCode className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
