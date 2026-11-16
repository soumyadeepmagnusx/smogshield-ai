import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Layers,
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
      baselineExposureUg: Math.round(pollutants.pm25 * 1.85 * 2.5), // High breathing rate (2.5 m3/h)
      optimizedExposureUg: Math.round(pollutants.pm25 * 0.22 * 0.85), // Indoor filtered room (0.85 m3/h)
      rationale: 'During 07:00 AM radiative ground inversion, minute ventilation during jogging deposits 5x more fine soot deep into alveolar sacs. Shifting to an indoor filtered sanctuary room drops inhaled dose by 88%.',
      actionableTip: 'Perform indoor HIIT, treadmill, or bodyweight circuit inside the sealed bedroom sanctuary with purifier on medium.',
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
      className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="routine-heading"
    >
      {/* Header & Impact Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h2 id="routine-heading" className="text-lg font-bold text-white tracking-tight">
              24-Hour Diurnal Smog Routine Optimizer
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronizes family activities with solar convective mixing windows in {city.name} to minimize inhaled particulate dose.
          </p>
        </div>

        {/* Quantified Impact Badge Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 sm:px-4">
          <div className="text-center pr-3 border-r border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Avoided Inhaled Dose</span>
            <div className="text-sm font-bold font-mono text-emerald-400">
              {impact.dailyAvoidedInhaledUg} <span className="text-[10px]">µg</span>
            </div>
          </div>
          <div className="text-center pr-3 border-r border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Berkeley Cigarettes Spared</span>
            <div className="text-sm font-bold font-mono text-amber-400">
              {impact.cigarettesAvoidedPerPerson} <span className="text-[10px]">/person</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Acute Risk Reduction</span>
            <div className="text-sm font-bold font-mono text-cyan-400">
              -{impact.respiratoryRiskReductionPct}%
            </div>
          </div>
        </div>
      </div>

      {/* Visual 24-Hour Diurnal Chart */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            Diurnal Inversion Dynamics (Hourly US AQI vs Boundary Layer Height)
          </span>
          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-950 border border-rose-500/50" /> Nocturnal Trap
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950 border border-emerald-500/50" /> Solar Mixing Window
            </span>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div
          className="grid grid-cols-12 sm:grid-cols-24 gap-1 p-3 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto"
          role="region"
          aria-label="24-Hour Diurnal Smog Forecast Chart"
        >
          {hourlyForecast.map((hour) => {
            const isWindow = hour.isOptimalVentilationWindow;
            const isSevere = hour.inversionState === 'SEVERE_TRAP';
            const heightPct = Math.min(100, Math.max(15, (hour.usAqi / 450) * 100));

            return (
              <div
                key={hour.hour}
                className="flex flex-col items-center justify-end h-32 group relative"
                title={`${hour.timeLabel}: AQI ${hour.usAqi} (PBL: ${hour.boundaryLayerHeightM}m) - ${hour.inversionState}`}
              >
                {/* Bar */}
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t transition-all group-hover:opacity-100 ${
                    isWindow
                      ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-md shadow-emerald-950/60'
                      : isSevere
                      ? 'bg-gradient-to-t from-purple-800 to-rose-600 opacity-80'
                      : 'bg-gradient-to-t from-amber-800 to-yellow-600 opacity-70'
                  }`}
                />

                {/* Hour Label */}
                <span className="text-[9px] font-mono text-slate-400 mt-1">
                  {hour.hour % 3 === 0 ? hour.timeLabel.slice(0, 2) : ''}
                </span>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none w-32 p-2 rounded-lg bg-slate-900 border border-slate-700 shadow-xl text-[10px] text-white">
                  <span className="font-bold">{hour.timeLabel}</span>
                  <span className="text-amber-300 font-mono">AQI: {hour.usAqi}</span>
                  <span className="text-cyan-300 font-mono">PBL: {hour.boundaryLayerHeightM}m</span>
                  <span className="text-slate-400 text-[9px] text-center mt-0.5">
                    {isWindow ? '✨ Optimal Aeration' : isSevere ? '⚠️ Inversion Trap' : 'Normal'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Routine Activities Cards */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Personalized Routine Adjustments for {familyProfile.familyName}</span>
          <span className="text-emerald-400 font-normal">Click toggle to simulate impact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className={`p-4 rounded-xl border transition-all ${
                act.isShifted
                  ? 'bg-slate-950/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-950/40 border-slate-800 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      act.isShifted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{act.title}</h3>
                    <span className="text-[10px] font-mono text-slate-400">{act.timeRange}</span>
                  </div>
                </div>

                {/* Shift Toggle */}
                <button
                  type="button"
                  onClick={() => toggleActivityShift(act.id)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                    act.isShifted
                      ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                  aria-pressed={act.isShifted}
                >
                  {act.isShifted ? '✓ SHIFT APPLIED' : '+ APPLY SHIFT'}
                </button>
              </div>

              {/* Rationale & Actionable Tip */}
              <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed">
                {act.rationale}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-400 gap-1.5">
                <span className="text-emerald-400 font-semibold">💡 Action: {act.actionableTip}</span>
                {act.emissionReductionTag && (
                  <span className="font-mono text-cyan-400 shrink-0">
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
