import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
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
      className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="hacks-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h2 id="hacks-heading" className="text-lg font-bold text-white tracking-tight">
              Indoor Air Quality Hacks & DIY Lab
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Frugal engineering solutions and physics-grounded hacks to drop indoor PM2.5 by up to 92%.
          </p>
        </div>

        <div className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
          <span>Household Dwelling: </span>
          <span className="text-emerald-400 font-bold">
            {familyProfile.housingType.replace(/_/g, ' ')} ({familyProfile.insulationLevel} Insulation)
          </span>
        </div>
      </div>

      {/* Interactive Corsi-Rosenthal Physics & CADR Sizing Lab */}
      <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Interactive Fluid Mechanics Lab
              </span>
              <h3 className="text-sm font-bold text-white">
                Corsi-Rosenthal CADR & Room Air Exchange (ACH) Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Simulate fluid dynamics, filter face velocity derating, and room volume particle clearance in real time.
            </p>
          </div>

          {/* Adequacy Badge */}
          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 ${
              crOutput.isAdequateForSmogEmergency
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
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

        {/* Simulator Controls & Live Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          {/* Controls: Left 6 columns */}
          <div className="lg:col-span-6 space-y-4">
            {/* Filter Count Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Filter Geometry & Configuration:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { count: 1, label: '1-Filter', desc: 'Flat Back' },
                  { count: 2, label: '2-Filter', desc: 'V-Wedge' },
                  { count: 4, label: '4-Filter', desc: 'Cube (Ideal)' },
                  { count: 5, label: '5-Filter', desc: 'Pentagon' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setCrConfig({ ...crConfig, filterCount: item.count as 1 | 2 | 4 | 5 })}
                    className={`p-2 rounded-lg border text-left transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                      crConfig.filterCount === item.count
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Grade & Fan Speed */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Filter Media Grade:
                </label>
                <select
                  value={crConfig.filterGrade}
                  onChange={(e) =>
                    setCrConfig({ ...crConfig, filterGrade: e.target.value as CorsiRosenthalConfig['filterGrade'] })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="MERV_11">MERV 11 (65% PM2.5 capture)</option>
                  <option value="MERV_13">MERV 13 (85% PM2.5 capture - Recommended)</option>
                  <option value="MERV_14">MERV 14 (90% PM2.5 capture)</option>
                  <option value="HEPA_H13">HEPA H13 (99.7% capture - High Drag)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Fan Operating Speed:
                </label>
                <select
                  value={crConfig.fanSpeed}
                  onChange={(e) =>
                    setCrConfig({ ...crConfig, fanSpeed: e.target.value as CorsiRosenthalConfig['fanSpeed'] })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="LOW">Low Speed (~39 dBA quiet)</option>
                  <option value="MEDIUM">Medium Speed (~46 dBA balanced)</option>
                  <option value="HIGH">High Speed (~51 dBA max CADR)</option>
                </select>
              </div>
            </div>

            {/* Room Dimensions Inputs */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Target Room Dimensions (Meters):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400">Length (m)</span>
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white text-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Width (m)</span>
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white text-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Ceiling (m)</span>
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Computed Physics Outputs: Right 6 columns */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Clean Air CADR</span>
                <div className="text-lg font-bold font-mono text-emerald-400">{crOutput.cadrCfm}</div>
                <span className="text-[9px] text-slate-400">CFM ({crOutput.cadrM3H} m³/h)</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Room ACH Rate</span>
                <div className="text-lg font-bold font-mono text-cyan-400">{crOutput.airChangesPerHour}</div>
                <span className="text-[9px] text-slate-400">Air Changes / Hour</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">90% Clean Time</span>
                <div className="text-lg font-bold font-mono text-amber-400">
                  {crOutput.timeToClean90PctMinutes}
                </div>
                <span className="text-[9px] text-slate-400">Minutes</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">DIY Material Cost</span>
                <div className="text-lg font-bold font-mono text-white">${crOutput.estimatedMaterialCostUsd}</div>
                <span className="text-[9px] text-slate-400">₹{crOutput.estimatedMaterialCostInr}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">HEPA Equivalent</span>
                <div className="text-lg font-bold font-mono text-emerald-300">
                  {crOutput.commercialHepaEquivalentCount}x
                </div>
                <span className="text-[9px] text-slate-400">Commercial Units</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Annual Savings</span>
                <div className="text-lg font-bold font-mono text-teal-300">${crOutput.annualSavingsUsd}</div>
                <span className="text-[9px] text-slate-400">vs Store HEPA</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-300 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
              💡 <strong>Physics Insight:</strong> Using a 4-filter cube expands filter surface area to ~64 ft², reducing air resistance by 75% compared to strapping a single filter to the fan. This keeps the motor cool, lowers noise by ~8 dBA, and delivers 430 CFM of high-volume particulate clearance.
            </div>
          </div>
        </div>
      </div>

      {/* Catalog of Tested Indoor Hacks */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Explore Curated Indoor Air Purification Hacks:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {INDOOR_HACKS.map((hack) => (
            <button
              key={hack.id}
              type="button"
              onClick={() => setSelectedHack(hack)}
              className={`p-3 rounded-xl border text-left transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                selectedHack.id === hack.id
                  ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold truncate">{hack.title}</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1">
                {hack.particulateReductionEfficiencyPct}% Reduction
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {hack.estimatedCostUsd === 0 ? 'Free ($0)' : `$${hack.estimatedCostUsd} / ₹${hack.estimatedCostInr}`}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Hack Deep Dive */}
        <div className="mt-4 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">{selectedHack.title}</h3>
              <p className="text-xs text-slate-400">{selectedHack.tagline}</p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                ⏱️ {selectedHack.estimatedBuildTimeMinutes} mins
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold">
                🛡️ {selectedHack.particulateReductionEfficiencyPct}% PM2.5 Cut
              </span>
            </div>
          </div>

          {/* Materials & Step by Step */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                Required Materials:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedHack.materials.map((mat, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-4 mb-2">
                Scientific Mechanism:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {selectedHack.scientificMechanism}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                Step-by-Step Implementation:
              </h4>
              <ol className="space-y-2 text-xs text-slate-300">
                {selectedHack.steps.map((step, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>

              {/* Dos and Donts */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800">
                <div className="text-[11px] text-emerald-300">
                  <span className="font-bold block mb-1">✓ Critical Do's:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px]">
                    {selectedHack.dosAndDonts.do.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-[11px] text-rose-300">
                  <span className="font-bold block mb-1">✗ Critical Don'ts:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px]">
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
