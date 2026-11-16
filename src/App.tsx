import React, { useState, useEffect } from 'react';
import {
  Bot,
  Calendar,
  Wrench,
  Leaf,
  Flame,
  Users,
  ArrowRight,
} from 'lucide-react';
import { CityPreset, AirPollutantMetrics, AtmosphericMetrics, FamilyProfile, SustainableAlternative } from './types';
import { CITY_PRESETS } from './constants/cities';
import { SUSTAINABLE_ALTERNATIVES } from './constants/alternatives';
import { fetchLiveAirQualityData, LiveTelemetryResponse } from './services/openMeteoService';
import { calculateComprehensiveImpact } from './utils/impactCalculator';
import { Navbar } from './components/Navbar';
import { LiveAqiBanner } from './components/LiveAqiBanner';
import { SmogCopilot } from './components/SmogCopilot';
import { DiurnalRoutineOptimizer } from './components/DiurnalRoutineOptimizer';
import { IndoorHacksLab } from './components/IndoorHacksLab';
import { SustainableAlternatives } from './components/SustainableAlternatives';
import { ImpactExplainer } from './components/ImpactExplainer';
import { CommunityResilienceBoard } from './components/CommunityResilienceBoard';
import { FamilyProfileModal } from './components/FamilyProfileModal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { TechnicalDossierModal } from './components/TechnicalDossierModal';
import { ApiKeyModal } from './components/ApiKeyModal';

export const App: React.FC = () => {
  // Active City Selection (Defaults to Delhi NCR)
  const [selectedCity, setSelectedCity] = useState<CityPreset>(CITY_PRESETS[0]);
  const [isDemoSafeMode, setIsDemoSafeMode] = useState<boolean>(false);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [sourceLabel, setSourceLabel] = useState<string>('Live Open-Meteo High-Resolution Telemetry');

  // Atmospheric Telemetry
  const [pollutants, setPollutants] = useState<AirPollutantMetrics>(selectedCity.baselineMetrics);
  const [atmosphere, setAtmosphere] = useState<AtmosphericMetrics>({
    temperatureC: selectedCity.baselineMetrics.temperatureC,
    relativeHumidityPct: selectedCity.baselineMetrics.relativeHumidityPct,
    boundaryLayerHeightM: selectedCity.baselineMetrics.boundaryLayerHeightM,
    thermalInversionStrength: selectedCity.baselineMetrics.thermalInversionStrength,
    windSpeedKmh: selectedCity.baselineMetrics.windSpeedKmh,
    solarRadiationWm2: selectedCity.baselineMetrics.solarRadiationWm2,
  });

  // Family Profile State
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile>({
    familyName: 'Sharma Family',
    cityId: selectedCity.id,
    memberCount: 4,
    hasInfantsOrToddlers: true,
    hasElderlyMembers: true,
    hasAsthmaOrRespiratory: true,
    hasCardiovascularCondition: false,
    hasOutdoorWorkers: false,
    hasPets: false,
    housingType: 'APARTMENT_HIGH_RISE',
    insulationLevel: 'MODERATE',
    cookingFuel: 'GAS',
    heatingType: 'SPACE_HEATER',
    commuteMode: 'GAS_CAR_SOLO',
    commuteDistanceKm: 14,
    hasDiyAirPurifier: true,
    hasCommercialHepa: false,
  });

  // Selected Sustainable Alternatives
  const [selectedAlternatives, setSelectedAlternatives] = useState<SustainableAlternative[]>([
    SUSTAINABLE_ALTERNATIVES[0], // Metro commute
    SUSTAINABLE_ALTERNATIVES[2], // School carpool pod
    SUSTAINABLE_ALTERNATIVES[3], // Induction cooking
  ]);

  // Active Tab View State
  const [activeTab, setActiveTab] = useState<
    'copilot' | 'diurnal' | 'indoor_hacks' | 'alternatives' | 'impact' | 'community'
  >('copilot');

  // Modal States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Fetch telemetry whenever city or demo mode changes
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const result: LiveTelemetryResponse = await fetchLiveAirQualityData(
        selectedCity,
        isDemoSafeMode
      );
      if (isMounted) {
        setPollutants(result.pollutants);
        setAtmosphere(result.atmosphere);
        setIsLiveStreaming(result.isLive);
        setSourceLabel(result.sourceLabel);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [selectedCity, isDemoSafeMode]);

  const handleToggleAlternative = (alt: SustainableAlternative) => {
    setSelectedAlternatives((prev) =>
      prev.some((a) => a.id === alt.id) ? prev.filter((a) => a.id !== alt.id) : [...prev, alt]
    );
  };

  // Compute Global Direct Impact
  const impactMetrics = calculateComprehensiveImpact(familyProfile, selectedAlternatives, {
    dailyAvoidedInhaledUg: Math.round(pollutants.pm25 * 0.75 * 0.85 * 8),
    cigarettesAvoidedPerPerson: Number(
      ((pollutants.pm25 * 0.75 * 0.85 * 8) / 528).toFixed(2)
    ),
    respiratoryRiskReductionPct: familyProfile.hasAsthmaOrRespiratory ? 58 : 42,
  });

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors relative selection:bg-emerald-500 selection:text-black ${
        highContrast ? 'bg-black text-white contrast-125' : 'bg-mesh-dark text-slate-100'
      }`}
    >
      {/* Primary Top Navigation */}
      <Navbar
        selectedCity={selectedCity}
        onSelectCity={(c) => {
          setSelectedCity(c);
          setFamilyProfile((prev) => ({ ...prev, cityId: c.id }));
        }}
        isDemoSafeMode={isDemoSafeMode}
        onToggleDemoSafe={() => setIsDemoSafeMode(!isDemoSafeMode)}
        isLiveStreaming={isLiveStreaming}
        familyProfile={familyProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
      />

      {/* Main Container */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Live AQI & Atmospheric Inversion Header Banner */}
        <LiveAqiBanner
          city={selectedCity}
          pollutants={pollutants}
          atmosphere={atmosphere}
          familyProfile={familyProfile}
          isDemoSafe={isDemoSafeMode}
          sourceLabel={sourceLabel}
        />

        {/* Dazzling Glassmorphic Tabbed Navigation Bar */}
        <nav
          className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2 rounded-2xl glass-panel shadow-2xl"
          aria-label="Main Application Sections"
        >
          {[
            { id: 'copilot', label: 'AeroGuard Copilot', icon: Bot, badge: 'Gemini AI', color: 'from-emerald-500 to-teal-400' },
            { id: 'diurnal', label: 'Diurnal Routine Optimizer', icon: Calendar, badge: '24h Timeline', color: 'from-amber-500 to-orange-400' },
            { id: 'indoor_hacks', label: 'Indoor Hacks & DIY Lab', icon: Wrench, badge: 'Corsi-Rosenthal', color: 'from-cyan-500 to-blue-400' },
            { id: 'alternatives', label: 'Sustainable Alternatives', icon: Leaf, badge: `${selectedAlternatives.length} Active`, color: 'from-teal-500 to-emerald-400' },
            { id: 'impact', label: 'Direct Impact Engine', icon: Flame, badge: `${impactMetrics.berkeleyCigarettesAvoided} Cigs Cut`, color: 'from-rose-500 to-pink-400' },
            { id: 'community', label: 'Community Resilience', icon: Users, badge: 'OASIS CAP v1.2', color: 'from-purple-500 to-indigo-400' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/50 scale-[1.02]'
                    : 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-black/40 text-emerald-300 border border-emerald-400/30' : 'bg-slate-800/80 text-slate-400 border border-white/5'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Active Tab Content Display */}
        <div className="space-y-6">
          {activeTab === 'copilot' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <SmogCopilot
                  city={selectedCity}
                  pollutants={pollutants}
                  atmosphere={atmosphere}
                  familyProfile={familyProfile}
                />
              </div>

              {/* Side Quick Action Cards */}
              <div className="lg:col-span-4 space-y-4">
                {/* Corsi-Rosenthal Quick Hack Card */}
                <div className="p-5 rounded-2xl glass-panel space-y-2.5 glass-card-interactive border border-emerald-500/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4" /> Recommended Hack
                    </span>
                    <span className="font-mono text-cyan-300 font-bold text-[11px]">$58 / ₹4,800</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">The Corsi-Rosenthal Box</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Build a 4-filter MERV 13 box fan cube. Delivers <strong>430 CFM of Clean Air Delivery Rate (CADR)</strong>—outperforming $500 commercial HEPA units.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('indoor_hacks')}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 pt-1"
                  >
                    <span>Launch CADR & ACH Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Diurnal Solar Window Card */}
                <div className="p-5 rounded-2xl glass-panel space-y-2.5 glass-card-interactive border border-amber-500/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> Diurnal Optimization
                    </span>
                    <span className="font-mono text-emerald-400 font-bold text-[11px]">12:30 - 15:00</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Solar Convective Aeration</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Solar insolation lifts the boundary layer inversion cap up to 900m at midday. Open opposing windows for 20 minutes to flush indoor CO2 without trapping nocturnal smog.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('diurnal')}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1 pt-1"
                  >
                    <span>Inspect 24h Routine Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Direct Impact Preview Card */}
                <div className="p-5 rounded-2xl glass-panel space-y-2.5 glass-card-interactive border border-rose-500/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                      <Flame className="w-4 h-4" /> Household Impact
                    </span>
                    <span className="font-mono text-emerald-300 font-bold text-[11px]">
                      {impactMetrics.communityResiliencePoints} PTS
                    </span>
                  </div>
                  <div className="text-3xl font-black font-mono text-amber-300">
                    {impactMetrics.berkeleyCigarettesAvoided} Cigarettes
                  </div>
                  <p className="text-xs text-slate-300">
                    Avoided per person today based on the Berkeley Earth PM2.5 cigarette equivalence formula.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('impact')}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 pt-1"
                  >
                    <span>View Transparent Physics Proofs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diurnal' && (
            <DiurnalRoutineOptimizer
              city={selectedCity}
              pollutants={pollutants}
              atmosphere={atmosphere}
              familyProfile={familyProfile}
            />
          )}

          {activeTab === 'indoor_hacks' && <IndoorHacksLab familyProfile={familyProfile} />}

          {activeTab === 'alternatives' && (
            <SustainableAlternatives
              familyProfile={familyProfile}
              selectedAlternatives={selectedAlternatives}
              onToggleAlternative={handleToggleAlternative}
            />
          )}

          {activeTab === 'impact' && (
            <ImpactExplainer metrics={impactMetrics} familyProfile={familyProfile} />
          )}

          {activeTab === 'community' && (
            <CommunityResilienceBoard city={selectedCity} pollutants={pollutants} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07090f]/90 backdrop-blur-md py-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white font-mono">SmogShield.AI</span>
            <span>• Built for Challenge 6 by</span>
            <span className="font-bold text-emerald-400">Team Spectronz</span>
          </div>

          <div className="flex items-center space-x-4 font-medium">
            <button
              type="button"
              onClick={() => setIsPitchDeckOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              Pitch Deck (10 Slides)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsDossierOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              Technical Dossier
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsApiKeyModalOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              API Credentials
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FamilyProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={familyProfile}
        onSaveProfile={(updated) => setFamilyProfile(updated)}
      />

      <PitchDeckModal isOpen={isPitchDeckOpen} onClose={() => setIsPitchDeckOpen(false)} />

      <TechnicalDossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />

      <ApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} />
    </div>
  );
};
