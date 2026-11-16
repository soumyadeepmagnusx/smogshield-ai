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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Mission Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-950/40">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-tight text-white font-mono">
                  SmogShield<span className="text-emerald-400">.AI</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Team Spectronz
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
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
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-xs font-medium text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                aria-haspopup="listbox"
                aria-expanded={isCityDropdownOpen}
                aria-label={`Current location: ${selectedCity.name}, ${selectedCity.country}. Click to change.`}
              >
                <Wind className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span>
                  {selectedCity.name}, {selectedCity.country}
                </span>
                <SlidersHorizontal className="w-3 h-3 text-slate-400" aria-hidden="true" />
              </button>

              {isCityDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  role="listbox"
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    Winter Smog Benchmark Presets
                  </div>
                  {CITY_PRESETS.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => {
                        onSelectCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                        selectedCity.id === city.id
                          ? 'text-emerald-400 font-bold bg-emerald-500/10'
                          : 'text-slate-300'
                      }`}
                      role="option"
                      aria-selected={selectedCity.id === city.id}
                    >
                      <div>
                        <div className="font-medium">{city.name}</div>
                        <div className="text-[10px] text-slate-400">{city.country}</div>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
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
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                isDemoSafeMode
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/50'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/50'
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

          {/* Right: Actions, Family Profile, Presentation Deck & Technical Dossier */}
          <div className="flex items-center space-x-2">
            {/* High Contrast Accessibility Toggle */}
            <button
              type="button"
              onClick={onToggleHighContrast}
              className={`p-2 rounded-lg border text-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                highContrast
                  ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
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
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
              title="Configure Google Gemini API Key"
              aria-label="Google Gemini API Key Configuration"
            >
              <Key className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            </button>

            {/* Family Profile Button */}
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-xs font-medium text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
              aria-label="Configure Family & Household Profile"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span className="hidden sm:inline">{familyProfile.familyName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-emerald-400 border border-emerald-500/30">
                {familyProfile.memberCount}
              </span>
            </button>

            {/* Pitch Deck Button */}
            <button
              type="button"
              onClick={onOpenPitchDeck}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950/50 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
              aria-label="Open Interactive Pitch Deck (10 Slides)"
            >
              <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden md:inline">Pitch Deck</span>
            </button>

            {/* Technical Dossier Button */}
            <button
              type="button"
              onClick={onOpenDossier}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
              aria-label="Open Technical Architecture Dossier"
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
