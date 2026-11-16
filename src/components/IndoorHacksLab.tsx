import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  Wind,
} from 'lucide-react';
import { IndoorHack, FamilyProfile } from '../types';
import { INDOOR_HACKS } from '../constants/hacks';
import { computeCorsiRosenthalPerformance, CorsiRosenthalConfig } from '../utils/corsiRosenthal';

interface IndoorHacksLabProps {
  familyProfile: FamilyProfile;
}

export const IndoorHacksLab: React.FC<IndoorHacksLabProps> = ({ familyProfile }) => {
  const [selectedHack, setSelectedHack] = useState<IndoorHack>(INDOOR_HACKS[0]);

  // Interactive Corsi-Rosenthal Calculator State
  const [crConfig, setCrConfig] = useState<CorsiRosenthalConfig>({
    fanType: '20_INCH_BOX_FAN',
    filterCount: 4,
    filterGrade: 'MERV_13',
    roomDimensionsM: { length: 5.5, width: 4.2, height: 2.7 }, // ~62 m3 typical family room
    fanSpeed: 'MEDIUM',
  });

  const crOutput = computeCorsiRosenthalPerformance(crConfig);

  return (
    <section
      className="w-full rounded-3xl glass-panel p-6 sm:p-8 space-y-8"
      aria-labelledby="hacks-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-950/50">
              <Wrench className="w-5 h-5 text-slate-950" aria-hidden="true" />
            </div>
            <h2 id="hacks-heading" className="text-xl font-extrabold text-white tracking-tight">
              Indoor Air Quality Hacks & DIY Engineering Lab
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Frugal engineering solutions and fluid mechanics models that drop indoor PM2.5 by up to 92% without commercial markups.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono px-3.5 py-2 rounded-2xl glass-panel text-slate-200 border border-emerald-500/30">
          <span className="text-slate-400">Dwelling:</span>
          <span className="text-emerald-400 font-bold">
            {familyProfile.housingType.replace(/_/g, ' ')} ({familyProfile.insulationLevel})
          </span>
        </div>
      </div>

      {/* Interactive Corsi-Rosenthal Fluid Mechanics & 3D Visualizer Lab */}
      <div className="rounded-2xl glass-panel-glow p-5 sm:p-7 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                Interactive Fluid Mechanics Simulator
              </span>
              <h3 className="text-base font-bold text-white">
                Corsi-Rosenthal Box (CADR & ACH Sizing Engine)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Adjust fan geometry, MERV filter grade, and room dimensions to simulate particle clearance in real time.
            </p>
          </div>

          {/* Adequacy Safety Badge */}
          <div
            className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center space-x-2 shadow-lg transition-all ${
              crOutput.isAdequateForSmogEmergency
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-emerald-950/40'
                : 'bg-amber-950/80 border-amber-500/60 text-amber-300 shadow-amber-950/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>
              {crOutput.isAdequateForSmogEmergency
                ? `PASSED: ${crOutput.airChangesPerHour} ACH (Meets CDC ≥5.0 ACH)`
                : `WARNING: ${crOutput.airChangesPerHour} ACH (Under-ventilated for smog)`}
            </span>
          </div>
        </div>

        {/* 3D Animated Schematic & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Controls: Left 6 columns */}
          <div className="lg:col-span-6 space-y-5">
            {/* Filter Count Geometry Buttons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                1. Filter Geometry & Assembly:
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { count: 1, label: '1-Filter', desc: 'Flat Back (High Drag)' },
                  { count: 2, label: '2-Filter', desc: 'V-Wedge (Moderate)' },
                  { count: 4, label: '4-Filter', desc: 'Cube (Ideal 430 CFM)' },
                  { count: 5, label: '5-Filter', desc: 'Pentagon (Max Media)' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setCrConfig({ ...crConfig, filterCount: item.count as 1 | 2 | 4 | 5 })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      crConfig.filterCount === item.count
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Grade & Fan Speed Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  2. Filter Media Grade:
                </label>
                <select
                  value={crConfig.filterGrade}
                  onChange={(e) =>
                    setCrConfig({ ...crConfig, filterGrade: e.target.value as CorsiRosenthalConfig['filterGrade'] })
                  }
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="MERV_11">MERV 11 (65% PM2.5 Capture)</option>
                  <option value="MERV_13">MERV 13 (85% PM2.5 Capture - Recommended)</option>
                  <option value="MERV_14">MERV 14 (90% PM2.5 Capture)</option>
                  <option value="HEPA_H13">HEPA H13 (99.7% Capture - High Drag)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  3. Fan Operating Speed:
                </label>
                <select
                  value={crConfig.fanSpeed}
                  onChange={(e) =>
                    setCrConfig({ ...crConfig, fanSpeed: e.target.value as CorsiRosenthalConfig['fanSpeed'] })
                  }
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="LOW">Low Speed (~39 dBA Quiet Sleep)</option>
                  <option value="MEDIUM">Medium Speed (~46 dBA Optimal CADR)</option>
                  <option value="HIGH">High Speed (~51 dBA Maximum Clearance)</option>
                </select>
              </div>
            </div>

            {/* Room Dimensions Inputs */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                4. Target Room Dimensions (Meters):
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Length (m)</span>
                  <input
                    type="number"
                    min="2"
                    max="15"
                    step="0.5"
                    value={crConfig.roomDimensionsM.length}
                    onChange={(e) =>
                      setCrConfig({
                        ...crConfig,
                        roomDimensionsM: { ...crConfig.roomDimensionsM, length: parseFloat(e.target.value) || 4 },
                      })
                    }
                    className="w-full bg-transparent text-center font-bold font-mono text-emerald-400 text-sm focus:outline-none"
                  />
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Width (m)</span>
                  <input
                    type="number"
                    min="2"
                    max="15"
                    step="0.5"
                    value={crConfig.roomDimensionsM.width}
                    onChange={(e) =>
                      setCrConfig({
                        ...crConfig,
                        roomDimensionsM: { ...crConfig.roomDimensionsM, width: parseFloat(e.target.value) || 4 },
                      })
                    }
                    className="w-full bg-transparent text-center font-bold font-mono text-cyan-400 text-sm focus:outline-none"
                  />
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Ceiling Height (m)</span>
                  <input
                    type="number"
                    min="2"
                    max="5"
                    step="0.1"
                    value={crConfig.roomDimensionsM.height}
                    onChange={(e) =>
                      setCrConfig({
                        ...crConfig,
                        roomDimensionsM: { ...crConfig.roomDimensionsM, height: parseFloat(e.target.value) || 2.7 },
                      })
                    }
                    className="w-full bg-transparent text-center font-bold font-mono text-amber-400 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dazzling Visual Schematic & Real-time Outputs: Right 6 columns */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            {/* Visual Schematic Diagram */}
            <div className="p-5 rounded-2xl glass-panel relative flex flex-col items-center justify-center overflow-hidden border border-emerald-500/20">
              {/* Animated Clean Air Jet Simulation */}
              <div className="relative w-48 h-36 flex flex-col items-center justify-end">
                {/* Floating clean air particles */}
                <div className="absolute top-1 w-2 h-2 rounded-full bg-emerald-400 blur-[1px] animate-ping" />
                <div className="absolute top-6 left-12 w-2.5 h-2.5 rounded-full bg-cyan-400 opacity-60 animate-bounce" />
                <div className="absolute top-4 right-14 w-2 h-2 rounded-full bg-teal-300 opacity-80 animate-pulse" />

                {/* Upward clean airflow jet */}
                <div className="w-20 h-16 bg-gradient-to-t from-emerald-500/40 via-cyan-400/20 to-transparent rounded-t-full filter blur-sm" />

                {/* 20" Box Fan with Shroud */}
                <div className="w-36 h-10 bg-slate-800 border-2 border-emerald-400 rounded-lg flex items-center justify-center shadow-lg relative z-10">
                  <div className="w-8 h-8 rounded-full border border-dashed border-emerald-300 flex items-center justify-center">
                    <Wind className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <span className="text-[9px] font-bold font-mono text-emerald-300 ml-2">
                    {crOutput.cadrCfm} CFM JET
                  </span>
                </div>

                {/* Filter Media Cube (4 sides) */}
                <div className="w-32 h-14 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 rounded-b-md flex items-center justify-around px-2 shadow-inner">
                  <div className="h-10 w-5 bg-slate-800 border border-emerald-500/40 rounded flex items-center justify-center text-[7px] text-emerald-400 rotate-90">
                    MERV13
                  </div>
                  <div className="h-10 w-12 bg-slate-900 border border-emerald-500/50 rounded flex items-center justify-center text-[8px] font-bold text-slate-300">
                    {crConfig.filterCount}-FILTER CUBE
                  </div>
                  <div className="h-10 w-5 bg-slate-800 border border-emerald-500/40 rounded flex items-center justify-center text-[7px] text-emerald-400 rotate-90">
                    MERV13
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-center text-slate-300 font-semibold">
                ✨ <strong>Fluid Mechanics Principle:</strong> Pleating {crConfig.filterCount} MERV 13 filters expands total media surface to ~64 ft², reducing air drag by 75% and delivering whisper-quiet {crConfig.fanSpeed.toLowerCase()} mode ({crOutput.estimatedDecibels} dBA).
              </div>
            </div>

            {/* Performance KPIs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl glass-panel text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Clean Air CADR</span>
                <div className="text-xl font-black font-mono text-emerald-400 my-0.5">{crOutput.cadrCfm}</div>
                <span className="text-[9px] text-slate-400">CFM ({crOutput.cadrM3H} m³/h)</span>
              </div>

              <div className="p-3.5 rounded-2xl glass-panel text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Room ACH Rate</span>
                <div className="text-xl font-black font-mono text-cyan-400 my-0.5">{crOutput.airChangesPerHour}</div>
                <span className="text-[9px] text-slate-400">Air Changes / Hour</span>
              </div>

              <div className="p-3.5 rounded-2xl glass-panel text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">90% Clean Time</span>
                <div className="text-xl font-black font-mono text-amber-400 my-0.5">
                  {crOutput.timeToClean90PctMinutes}m
                </div>
                <span className="text-[9px] text-slate-400">Rapid Clearance</span>
              </div>

              <div className="p-3.5 rounded-2xl glass-panel text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Material Cost</span>
                <div className="text-xl font-black font-mono text-white my-0.5">${crOutput.estimatedMaterialCostUsd}</div>
                <span className="text-[9px] text-slate-400">₹{crOutput.estimatedMaterialCostInr} Total</span>
              </div>

              <div className="p-3.5 rounded-2xl glass-panel text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Store HEPA Eq.</span>
                <div className="text-xl font-black font-mono text-emerald-300 my-0.5">
                  {crOutput.commercialHepaEquivalentCount}x
                </div>
                <span className="text-[9px] text-slate-400">Units Matched</span>
              </div>

              <div className="p-3.5 rounded-2xl glass-panel text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Annual Savings</span>
                <div className="text-xl font-black font-mono text-teal-300 my-0.5">${crOutput.annualSavingsUsd}</div>
                <span className="text-[9px] text-slate-400">vs Store HEPA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog of Tested Indoor Air Hacks */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Explore Curated Indoor Air Purification Hacks:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {INDOOR_HACKS.map((hack) => (
            <button
              key={hack.id}
              type="button"
              onClick={() => setSelectedHack(hack)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedHack.id === hack.id
                  ? 'glass-panel-glow text-white shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/60'
                  : 'glass-panel text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              <div className="text-xs font-bold truncate">{hack.title}</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1 font-bold">
                {hack.particulateReductionEfficiencyPct}% Reduction
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {hack.estimatedCostUsd === 0 ? 'Free ($0)' : `$${hack.estimatedCostUsd} / ₹${hack.estimatedCostInr}`}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Hack Blueprint & Steps */}
        <div className="mt-5 p-6 rounded-2xl glass-panel space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white">{selectedHack.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedHack.tagline}</p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-xl glass-panel text-slate-300 font-bold">
                ⏱️ {selectedHack.estimatedBuildTimeMinutes} mins
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-black">
                🛡️ {selectedHack.particulateReductionEfficiencyPct}% PM2.5 Cut
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5">
                Required Materials & Tools:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedHack.materials.map((mat, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-sm shadow-emerald-400" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-5 mb-2.5">
                Scientific Mechanism:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed glass-panel p-3.5 rounded-xl border border-white/5">
                {selectedHack.scientificMechanism}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5">
                Step-by-Step Implementation:
              </h4>
              <ol className="space-y-2.5 text-xs text-slate-300">
                {selectedHack.steps.map((step, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>

              {/* Dos and Don'ts */}
              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/10">
                <div className="text-[11px] text-emerald-300">
                  <span className="font-bold block mb-1">✓ Critical Do's:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 text-[10px]">
                    {selectedHack.dosAndDonts.do.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-[11px] text-rose-300">
                  <span className="font-bold block mb-1">✗ Critical Don'ts:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 text-[10px]">
                    {selectedHack.dosAndDonts.dont.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
