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
  isDemoSafe,
  sourceLabel,
}) => {
  const aqiTokens = getAqiDisplayTokens(pollutants.usAqi);
  const currentHour = new Date().getHours();
  const inversionState = evaluateInversionState(currentHour, atmosphere.boundaryLayerHeightM);

  // Radial Gauge Math
  const clampedAqi = Math.min(500, Math.max(0, pollutants.usAqi));

  return (
    <section
      className="w-full rounded-3xl glass-panel-glow p-6 sm:p-8 relative overflow-hidden transition-all duration-300"
      aria-labelledby="banner-heading"
    >
      {/* Dynamic Ambient Background Aurora */}
      <div
        className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none transition-colors duration-700 ${
          pollutants.usAqi > 200
            ? 'bg-rose-600'
            : pollutants.usAqi > 100
            ? 'bg-amber-500'
            : 'bg-emerald-500'
        }`}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full blur-[110px] opacity-20 pointer-events-none bg-cyan-600"
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left: Dazzling Radial Speedometer Gauge */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative w-44 h-28 flex items-end justify-center">
            {/* SVG Radial Arc */}
            <svg className="w-44 h-44 -rotate-90 transform overflow-visible" viewBox="0 0 200 200">
              {/* Background Track */}
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray="219.9"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              {/* Active Gradient Arc */}
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="url(#aqi-neon-grad)"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray="219.9"
                strokeDashoffset={219.9 - 219.9 * (clampedAqi / 500)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 10px ${
                    pollutants.usAqi > 200
                      ? 'rgba(244, 63, 94, 0.8)'
                      : pollutants.usAqi > 100
                      ? 'rgba(245, 158, 11, 0.8)'
                      : 'rgba(16, 185, 129, 0.8)'
                  })`,
                }}
              />
              <defs>
                <linearGradient id="aqi-neon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="70%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Centered Readout Value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-400">
                US AQI
              </span>
              <span
                className={`text-4xl sm:text-5xl font-black font-mono tracking-tight leading-none ${aqiTokens.badgeText}`}
              >
                {pollutants.usAqi}
              </span>
              <div className="flex items-center space-x-1.5 mt-1">
                <span className={`w-2 h-2 rounded-full ${aqiTokens.dotColor}`} aria-hidden="true" />
                <span className={`text-[11px] font-black uppercase tracking-wider ${aqiTokens.badgeText}`}>
                  {aqiTokens.label}
                </span>
              </div>
            </div>
          </div>

          {/* Location Title & Inversion Layer Physics Tag */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <h1 id="banner-heading" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {city.name}
              </h1>
              <span className="text-xs text-slate-400 font-semibold">• {city.country}</span>
              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                  sourceLabel.includes('Live')
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}
              >
                {isDemoSafe ? '🟡 DEMO-SAFE' : '🟢 LIVE SATELLITE STREAM'}
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {city.typicalWinterSmogCause}
            </p>

            {/* Inversion Status & PBL Mixing Height Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
              <div
                className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-md shadow-lg ${
                  inversionState === 'SEVERE_TRAP'
                    ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 shadow-rose-950/40'
                    : inversionState === 'SOLAR_MIXING_WINDOW'
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-emerald-950/40'
                    : 'bg-amber-950/80 border-amber-500/60 text-amber-300 shadow-amber-950/40'
                }`}
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {inversionState === 'SEVERE_TRAP'
                    ? '⚠️ Severe Nocturnal Inversion Lid (Pollutants Trapped at Surface)'
                    : inversionState === 'SOLAR_MIXING_WINDOW'
                    ? '✨ Convective Solar Mixing Window Active'
                    : '⏳ Moderate Atmospheric Inversion Settling'}
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900/90 text-slate-200 border border-slate-700/80 shadow-md">
                <span className="text-slate-400">PBL Mixing Height:</span>
                <span className="text-cyan-400 font-bold">{atmosphere.boundaryLayerHeightM}m</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900/90 text-slate-200 border border-slate-700/80 shadow-md">
                <span className="text-slate-400">Inversion Trap Index:</span>
                <span className="text-amber-400 font-bold">{atmosphere.thermalInversionStrength}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Glassmorphic Telemetry Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 w-full lg:w-auto">
          {/* PM2.5 */}
          <div className="p-3 rounded-2xl glass-panel text-center glass-card-interactive">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">PM2.5</span>
            <div className="text-lg font-black font-mono text-rose-400 my-0.5">{pollutants.pm25}</div>
            <span className="text-[9px] text-slate-400">µg/m³</span>
          </div>

          {/* PM10 */}
          <div className="p-3 rounded-2xl glass-panel text-center glass-card-interactive">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">PM10</span>
            <div className="text-lg font-black font-mono text-amber-400 my-0.5">{pollutants.pm10}</div>
            <span className="text-[9px] text-slate-400">µg/m³</span>
          </div>

          {/* NO2 */}
          <div className="p-3 rounded-2xl glass-panel text-center glass-card-interactive">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">NO₂</span>
            <div className="text-lg font-black font-mono text-cyan-400 my-0.5">{pollutants.no2}</div>
            <span className="text-[9px] text-slate-400">µg/m³</span>
          </div>

          {/* Temp */}
          <div className="p-3 rounded-2xl glass-panel text-center glass-card-interactive">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Temp</span>
            <div className="text-lg font-black font-mono text-slate-100 my-0.5">{atmosphere.temperatureC}°C</div>
            <span className="text-[9px] text-slate-400">Surface</span>
          </div>

          {/* Humidity */}
          <div className="p-3 rounded-2xl glass-panel text-center glass-card-interactive">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Humidity</span>
            <div className="text-lg font-black font-mono text-blue-400 my-0.5">{atmosphere.relativeHumidityPct}%</div>
            <span className="text-[9px] text-slate-400">RH</span>
          </div>

          {/* Wind */}
          <div className="p-3 rounded-2xl glass-panel text-center glass-card-interactive">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Wind</span>
            <div className="text-lg font-black font-mono text-emerald-400 my-0.5">{atmosphere.windSpeedKmh}</div>
            <span className="text-[9px] text-slate-400">km/h</span>
          </div>
        </div>
      </div>

      {/* Vulnerable Family Member Real-time Advisory Bar */}
      {(familyProfile.hasAsthmaOrRespiratory ||
        familyProfile.hasInfantsOrToddlers ||
        familyProfile.hasElderlyMembers) && (
        <div
          className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-3 bg-amber-950/20 p-3 rounded-xl border border-amber-500/30"
          role="region"
          aria-label="Vulnerable Household Members Advisory"
        >
          <div className="flex items-center space-x-2.5 text-amber-200 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" aria-hidden="true" />
            <span>
              <strong className="text-white">Household Shield Directive for {familyProfile.familyName}:</strong>{' '}
              {familyProfile.hasAsthmaOrRespiratory && 'Asthma/Respiratory member; '}
              {familyProfile.hasInfantsOrToddlers && 'Infants/Toddlers; '}
              {familyProfile.hasElderlyMembers && 'Elderly (65+). '}
              Keep bedroom door thresholds sealed with damp towels. Maintain Corsi-Rosenthal filtration on medium.
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-300 font-bold shrink-0 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/40">
            Current: {Math.round(pollutants.pm25 / 15)}x WHO 24h Guideline
          </span>
        </div>
      )}
    </section>
  );
};
