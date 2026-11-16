import React from 'react';
import {
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { CityPreset, AirPollutantMetrics, AtmosphericMetrics, FamilyProfile } from '../types';
import { getAqiDisplayTokens, evaluateInversionState } from '../utils/aqiPhysics';

interface LiveAqiBannerProps {
  city: CityPreset;
  pollutants: AirPollutantMetrics;
  atmosphere: AtmosphericMetrics;
  familyProfile: FamilyProfile;
  isDemoSafe: boolean;
  sourceLabel: string;
}

export const LiveAqiBanner: React.FC<LiveAqiBannerProps> = ({
  city,
  pollutants,
  atmosphere,
  familyProfile,
  isDemoSafe: _unused = false,
  sourceLabel,
}) => {
  const aqiTokens = getAqiDisplayTokens(pollutants.usAqi);
  const currentHour = new Date().getHours();
  const inversionState = evaluateInversionState(currentHour, atmosphere.boundaryLayerHeightM);

  return (
    <section
      className="w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-5 sm:p-6 shadow-2xl relative overflow-hidden"
      aria-labelledby="banner-heading"
    >
      {/* Background ambient glow matching AQI severity */}
      <div
        className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none ${
          pollutants.usAqi > 200
            ? 'bg-rose-600'
            : pollutants.usAqi > 100
            ? 'bg-amber-600'
            : 'bg-emerald-600'
        }`}
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Major AQI & Meteorological Inversion Readout */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-6">
          {/* Circular/Pill AQI Badge */}
          <div
            className={`flex flex-col items-center justify-center min-w-[130px] p-4 rounded-2xl border ${aqiTokens.badgeBg} ${aqiTokens.borderClass} shadow-xl`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              US AQI
            </span>
            <div className="flex items-baseline space-x-1 my-0.5">
              <span className={`text-5xl font-black font-mono tracking-tight ${aqiTokens.badgeText}`}>
                {pollutants.usAqi}
              </span>
            </div>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className={`w-2 h-2 rounded-full ${aqiTokens.dotColor}`} aria-hidden="true" />
              <span className={`text-xs font-bold uppercase tracking-wide ${aqiTokens.badgeText}`}>
                {aqiTokens.label}
              </span>
            </div>
          </div>

          {/* Location & Inversion Dynamics Overview */}
          <div>
            <div className="flex items-center space-x-2">
              <h1 id="banner-heading" className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {city.name}, {city.country}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {sourceLabel.includes('Live') ? '🟢 LIVE API' : '🟡 DEMO-SAFE'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {city.typicalWinterSmogCause}
            </p>

            {/* Inversion Status Alert Tag */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <div
                className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                  inversionState === 'SEVERE_TRAP'
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                    : inversionState === 'SOLAR_MIXING_WINDOW'
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {inversionState === 'SEVERE_TRAP'
                    ? '⚠️ Severe Nocturnal Inversion Cap (Pollutants Trapped)'
                    : inversionState === 'SOLAR_MIXING_WINDOW'
                    ? '✨ Convective Solar Mixing Window Active'
                    : '⏳ Moderate Atmospheric Inversion Settling'}
                </span>
              </div>

              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700">
                <span>PBL Mixing Height:</span>
                <span className="text-cyan-400 font-bold">{atmosphere.boundaryLayerHeightM}m</span>
              </div>

              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700">
                <span>Inversion Index:</span>
                <span className="text-amber-400 font-bold">{atmosphere.thermalInversionStrength}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Key Pollutants Telemetry Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full lg:w-auto">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">PM2.5</span>
            <div className="text-base font-bold font-mono text-rose-400">{pollutants.pm25}</div>
            <span className="text-[9px] text-slate-400">µg/m³</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">PM10</span>
            <div className="text-base font-bold font-mono text-amber-400">{pollutants.pm10}</div>
            <span className="text-[9px] text-slate-400">µg/m³</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">NO₂</span>
            <div className="text-base font-bold font-mono text-cyan-400">{pollutants.no2}</div>
            <span className="text-[9px] text-slate-400">µg/m³</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Temp</span>
            <div className="text-base font-bold font-mono text-slate-200">
              {atmosphere.temperatureC}°C
            </div>
            <span className="text-[9px] text-slate-400">Surface</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Humidity</span>
            <div className="text-base font-bold font-mono text-blue-400">
              {atmosphere.relativeHumidityPct}%
            </div>
            <span className="text-[9px] text-slate-400">RH</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Wind</span>
            <div className="text-base font-bold font-mono text-emerald-400">
              {atmosphere.windSpeedKmh}
            </div>
            <span className="text-[9px] text-slate-400">km/h</span>
          </div>
        </div>
      </div>

      {/* Vulnerable Family Shield Advisory Bar */}
      {(familyProfile.hasAsthmaOrRespiratory ||
        familyProfile.hasInfantsOrToddlers ||
        familyProfile.hasElderlyMembers) && (
        <div
          className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2"
          role="region"
          aria-label="Vulnerable Household Members Advisory"
        >
          <div className="flex items-center space-x-2 text-amber-300 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span>
              <strong>Household Advisory for {familyProfile.familyName}:</strong>{' '}
              {familyProfile.hasAsthmaOrRespiratory && 'Asthma/Respiratory member; '}
              {familyProfile.hasInfantsOrToddlers && 'Infants/Toddlers; '}
              {familyProfile.hasElderlyMembers && 'Elderly (65+). '}
              Seal windows shut during current inversion. Keep Corsi-Rosenthal filtration running.
            </span>
          </div>
          <span className="text-[11px] text-slate-400 shrink-0">
            WHO 2021 24h PM2.5 Guideline: 15 µg/m³ (Current: {Math.round(pollutants.pm25 / 15)}x higher)
          </span>
        </div>
      )}
    </section>
  );
};
