import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Layers,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { CityPreset, AirPollutantMetrics, AtmosphericMetrics, FamilyProfile, RoutineActivity } from '../types';
import { generateDiurnalHourlyForecast } from '../utils/aqiPhysics';
import { computeRoutineOptimizationImpact } from '../utils/impactCalculator';

interface DiurnalRoutineOptimizerProps {
  city: CityPreset;
  pollutants: AirPollutantMetrics;
  atmosphere: AtmosphericMetrics;
  familyProfile: FamilyProfile;
  onImpactUpdated?: (avoidedUg: number, cigarettesAvoided: number) => void;
}

export const DiurnalRoutineOptimizer: React.FC<DiurnalRoutineOptimizerProps> = ({
  city,
  pollutants,
  atmosphere,
  familyProfile,
  onImpactUpdated: _unused,
}) => {
  const hourlyForecast = generateDiurnalHourlyForecast(
    pollutants.pm25,
    atmosphere.boundaryLayerHeightM
  );

  const [activities, setActivities] = useState<RoutineActivity[]>([
    {
      id: 'act-1',
      timeRange: '07:00 - 08:00 AM',
      title: 'Aerobic Exercise & Jogging',
      category: 'EXERCISE',
      baselineHour: 7,
      optimizedHour: 13,
      isShifted: true,
      baselineExposureUg: Math.round(pollutants.pm25 * 1.85 * 2.5), // High minute ventilation (2.5 m3/h)
      optimizedExposureUg: Math.round(pollutants.pm25 * 0.22 * 0.85), // Indoor filtered room (0.85 m3/h)
      rationale: 'During 07:00 AM radiative ground inversion, minute ventilation during jogging deposits 5x more fine soot deep into alveolar sacs. Shifting to an indoor filtered sanctuary room drops inhaled dose by 88%.',
      actionableTip: 'Perform indoor HIIT, treadmill, or yoga inside the sealed bedroom sanctuary with purifier on medium.',
      emissionReductionTag: 'Zero direct vehicle trips avoided',
    },
    {
      id: 'act-2',
      timeRange: '08:15 - 09:00 AM',
      title: 'School Run & Morning Office Commute',
      category: 'COMMUTE',
      baselineHour: 8,
      optimizedHour: 9,
      isShifted: true,
      baselineExposureUg: Math.round(pollutants.pm25 * 1.7 * 1.4),
      optimizedExposureUg: Math.round(pollutants.pm25 * 0.65 * 1.2),
      rationale: 'Cold vehicle engines produce 3x higher cold-start particulate spikes in bumper-to-bumper school traffic. Coordinating a 4-family HEPA carpool pod or shifting departure to 09:15 cuts idling exposure.',
      actionableTip: 'Equip car with a Corsi-Rosenthal cabin filter and set HVAC to recirculate mode 5 minutes before entering the school zone.',
      emissionReductionTag: 'Spares 3.4 kg CO2e & 75% idling soot',
    },
    {
      id: 'act-3',
      timeRange: '13:00 - 13:25 PM',
      title: 'Solar Convective Window Aeration Flush',
      category: 'VENTILATION',
      baselineHour: 9,
      optimizedHour: 13,
      isShifted: true,
      baselineExposureUg: Math.round(pollutants.pm25 * 1.4 * 0.5),
      optimizedExposureUg: Math.round(pollutants.pm25 * 0.45 * 0.5),
      rationale: 'Solar thermal convection expands the boundary layer up to 900m between 12:30 and 15:00. This is the only window of the day where flushing accumulated indoor CO2 does not poison the home with trapped nocturnal smog.',
      actionableTip: 'Open two opposing windows for exactly 20 minutes to achieve 3 air changes, then seal hermetically before 15:30 dusk.',
      emissionReductionTag: 'Flushes 600 ppm indoor CO2 without PM2.5 spike',
    },
    {
      id: 'act-4',
      timeRange: '21:30 - 06:30 AM',
      title: 'Overnight Sanctuary Bedroom Sealing',
      category: 'SLEEP_PREP',
      baselineHour: 22,
      optimizedHour: 22,
      isShifted: true,
      baselineExposureUg: Math.round(pollutants.pm25 * 1.5 * 0.42 * 8), // 8 hours unsealed
      optimizedExposureUg: Math.round(pollutants.pm25 * 0.15 * 0.42 * 8), // 8 hours filtered
      rationale: 'During sleep, 8 hours of uninterrupted breathing in an unsealed room allows outdoor smog to infiltrate. Sealing the door threshold with a damp towel and operating a Corsi-Rosenthal Box creates a clean-air positive pressure zone.',
      actionableTip: 'Seal bedroom door bottom with a damp rolled towel and keep the purifier running on low/medium all night.',
      emissionReductionTag: 'Protects lungs through 8 hours of steady ventilation',
    },
  ]);

  const toggleActivityShift = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isShifted: !a.isShifted } : a))
    );
  };

  const impact = computeRoutineOptimizationImpact(activities, familyProfile, pollutants.pm25);

  return (
    <section
      className="w-full rounded-3xl glass-panel p-6 sm:p-8 space-y-8"
      aria-labelledby="routine-heading"
    >
      {/* Header & Impact Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-950/50">
              <Calendar className="w-5 h-5 text-slate-950" aria-hidden="true" />
            </div>
            <h2 id="routine-heading" className="text-xl font-extrabold text-white tracking-tight">
              24-Hour Diurnal Smog Routine Optimizer
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Synchronizes family activities with solar convective mixing windows in {city.name} to minimize inhaled particulate dose.
          </p>
        </div>

        {/* Quantified Impact Badge Bar */}
        <div className="flex flex-wrap items-center gap-4 glass-panel px-5 py-3 rounded-2xl border border-emerald-500/30 shadow-xl">
          <div className="text-center pr-4 border-r border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Inhaled Dose Avoided</span>
            <div className="text-base font-black font-mono text-emerald-400">
              {impact.dailyAvoidedInhaledUg} <span className="text-[10px]">µg</span>
            </div>
          </div>
          <div className="text-center pr-4 border-r border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Cigarettes Spared</span>
            <div className="text-base font-black font-mono text-amber-300">
              {impact.cigarettesAvoidedPerPerson} <span className="text-[10px]">/person</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Acute Risk Reduction</span>
            <div className="text-base font-black font-mono text-cyan-400">
              -{impact.respiratoryRiskReductionPct}%
            </div>
          </div>
        </div>
      </div>

      {/* Dazzling 24-Hour Diurnal Chart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            Diurnal Inversion Dynamics (Hourly US AQI vs Planetary Boundary Layer Height)
          </span>
          <div className="flex items-center space-x-4 text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-gradient-to-t from-purple-800 to-rose-600 shadow-sm shadow-rose-950" /> Nocturnal Inversion Trap
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-gradient-to-t from-emerald-600 to-teal-400 shadow-sm shadow-emerald-950" /> Solar Mixing Window
            </span>
          </div>
        </div>

        {/* Day / Night Celestial Horizon Strip */}
        <div className="grid grid-cols-4 text-center text-[11px] font-mono font-bold text-slate-400 py-1.5 px-3 rounded-xl bg-slate-950/70 border border-white/5">
          <span className="flex items-center justify-center gap-1 text-purple-300">
            <Moon className="w-3.5 h-3.5" /> 00:00 - 06:00 (Nocturnal Lid)
          </span>
          <span className="flex items-center justify-center gap-1 text-rose-300">
            <Clock className="w-3.5 h-3.5" /> 06:00 - 11:00 (Morning Trap & Rush)
          </span>
          <span className="flex items-center justify-center gap-1 text-emerald-300 font-extrabold">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} /> 11:00 - 16:00 (Solar Convective Window)
          </span>
          <span className="flex items-center justify-center gap-1 text-indigo-300">
            <Moon className="w-3.5 h-3.5" /> 16:00 - 24:00 (Dusk Cooling Lid)
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div
          className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 p-4 rounded-2xl glass-panel relative overflow-x-auto"
          role="region"
          aria-label="24-Hour Diurnal Smog Forecast Chart"
        >
          {hourlyForecast.map((hour) => {
            const isWindow = hour.isOptimalVentilationWindow;
            const isSevere = hour.inversionState === 'SEVERE_TRAP';
            const heightPct = Math.min(100, Math.max(18, (hour.usAqi / 450) * 100));

            return (
              <div
                key={hour.hour}
                className="flex flex-col items-center justify-end h-36 group relative cursor-pointer"
                title={`${hour.timeLabel}: AQI ${hour.usAqi} (PBL: ${hour.boundaryLayerHeightM}m) - ${hour.inversionState}`}
              >
                {/* Glowing Bar */}
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t-md transition-all duration-300 group-hover:scale-105 ${
                    isWindow
                      ? 'bg-gradient-to-t from-emerald-600 via-teal-500 to-cyan-400 shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-300'
                      : isSevere
                      ? 'bg-gradient-to-t from-purple-900 via-rose-700 to-rose-500 opacity-90 shadow-sm shadow-rose-950'
                      : 'bg-gradient-to-t from-amber-900 via-amber-600 to-yellow-500 opacity-80'
                  }`}
                />

                {/* Hour Label */}
                <span className="text-[10px] font-mono text-slate-400 mt-1.5 font-semibold">
                  {hour.hour % 3 === 0 ? hour.timeLabel.slice(0, 2) : ''}
                </span>

                {/* Hover Popover Card */}
                <div className="absolute bottom-full mb-3 hidden group-hover:flex flex-col items-center z-30 pointer-events-none w-36 p-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-[11px] text-white">
                  <span className="font-bold text-slate-100">{hour.timeLabel}</span>
                  <span className="text-amber-300 font-mono font-bold">US AQI: {hour.usAqi}</span>
                  <span className="text-cyan-300 font-mono">PBL: {hour.boundaryLayerHeightM}m</span>
                  <span className="text-slate-400 text-[10px] text-center mt-1">
                    {isWindow ? '✨ Optimal Aeration' : isSevere ? '⚠️ Severe Inversion' : 'Moderate'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Routine Activities Cards */}
      <div className="space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Personalized Routine Adjustments for {familyProfile.familyName}:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Click toggle to simulate before vs after
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((act) => (
            <div
              key={act.id}
              className={`p-5 rounded-2xl border transition-all duration-200 glass-card-interactive ${
                act.isShifted
                  ? 'glass-panel-glow border-emerald-500/50 shadow-xl shadow-emerald-950/20'
                  : 'glass-panel opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                      act.isShifted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{act.title}</h3>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">{act.timeRange}</span>
                  </div>
                </div>

                {/* Shift Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleActivityShift(act.id)}
                  className={`text-[11px] font-extrabold px-3 py-1.5 rounded-xl border transition-all ${
                    act.isShifted
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  aria-pressed={act.isShifted}
                >
                  {act.isShifted ? '✓ SHIFT APPLIED' : '+ APPLY SHIFT'}
                </button>
              </div>

              {/* Rationale & Actionable Tip */}
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {act.rationale}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <span className="text-emerald-300 font-bold">💡 Action: {act.actionableTip}</span>
                {act.emissionReductionTag && (
                  <span className="font-mono text-cyan-300 shrink-0 font-bold text-[11px]">
                    {act.emissionReductionTag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
