import React, { useState } from 'react';
import {
  Leaf,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SustainableAlternative, FamilyProfile } from '../types';
import { SUSTAINABLE_ALTERNATIVES } from '../constants/alternatives';

interface SustainableAlternativesProps {
  familyProfile: FamilyProfile;
  selectedAlternatives: SustainableAlternative[];
  onToggleAlternative: (alt: SustainableAlternative) => void;
}

export const SustainableAlternatives: React.FC<SustainableAlternativesProps> = ({
  familyProfile,
  selectedAlternatives,
  onToggleAlternative,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['ALL', 'COMMUTE', 'HOME_HEATING', 'COOKING', 'SCHOOL_TRANSIT', 'EXERCISE'];

  const filteredAlternatives =
    filterCategory === 'ALL'
      ? SUSTAINABLE_ALTERNATIVES
      : SUSTAINABLE_ALTERNATIVES.filter((a) => a.category === filterCategory);

  const isSelected = (id: string) => selectedAlternatives.some((a) => a.id === id);

  return (
    <section
      className="w-full rounded-3xl glass-panel p-6 sm:p-8 space-y-8"
      aria-labelledby="alternatives-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-950/50">
              <Leaf className="w-5 h-5 text-slate-950" aria-hidden="true" />
            </div>
            <h2 id="alternatives-heading" className="text-xl font-extrabold text-white tracking-tight">
              Sustainable Alternatives & Lifestyle Swaps
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Targeted switches for heating, transit, and cooking tailored to {familyProfile.familyName}'s lifestyle.
          </p>
        </div>

        {/* Selected Swaps Count Badge */}
        <div className="flex items-center space-x-2.5 glass-panel px-4 py-2.5 rounded-2xl text-xs font-mono border border-emerald-500/30">
          <span className="text-slate-400">Active Swaps:</span>
          <span className="text-emerald-400 font-bold">
            {selectedAlternatives.length} of {SUSTAINABLE_ALTERNATIVES.length} Adopted
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
              filterCategory === cat
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            {cat.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Alternatives List */}
      <div className="space-y-4">
        {filteredAlternatives.map((alt) => {
          const active = isSelected(alt.id);
          const isExpanded = expandedId === alt.id;

          return (
            <div
              key={alt.id}
              className={`rounded-2xl border transition-all duration-200 glass-card-interactive ${
                active
                  ? 'glass-panel-glow border-emerald-500/50 shadow-xl shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                  : 'glass-panel hover:border-white/20'
              }`}
            >
              <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                {/* Checkbox & Title */}
                <div className="flex items-start space-x-3.5">
                  <button
                    type="button"
                    onClick={() => onToggleAlternative(alt)}
                    className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                      active
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/40'
                        : 'border-slate-700 bg-slate-950 hover:border-slate-500'
                    }`}
                    aria-label={`Adopt sustainable alternative: ${alt.title}`}
                    aria-checked={active}
                    role="checkbox"
                  >
                    {active && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700">
                        {alt.category.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold">
                        {alt.implementationEase.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5">{alt.title}</h3>

                    {/* Current vs Swap */}
                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-slate-300">
                        <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                          Current Baseline Habit:
                        </span>
                        {alt.currentHabit}
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-slate-200">
                        <span className="text-[10px] uppercase font-bold text-emerald-300 block mb-1">
                          Sustainable Alternative:
                        </span>
                        {alt.sustainableSwap}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Impact Telemetry Badges */}
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
                  <div className="p-2.5 rounded-xl glass-panel text-center min-w-[95px]">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Inhaled Cut</span>
                    <span className="text-xs font-mono font-black text-emerald-400">
                      -{alt.dailyAvoidedPm25Micrograms} µg
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl glass-panel text-center min-w-[95px]">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">CO₂e Spared</span>
                    <span className="text-xs font-mono font-black text-cyan-400">
                      -{alt.dailyAvoidedCo2Kg} kg
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl glass-panel text-center min-w-[95px]">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Risk Delta</span>
                    <span className="text-xs font-mono font-black text-amber-300">
                      -{alt.respiratoryRiskReductionPct}%
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : alt.id)}
                    className="p-2.5 rounded-xl glass-panel text-slate-400 hover:text-white border border-slate-700 focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                    aria-label={isExpanded ? 'Collapse details' : 'Expand scientific rationale'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Scientific & Subsidy Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-white/10 text-xs text-slate-300 space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-300 font-bold block mb-1">
                      Scientific & Emissions Mechanism:
                    </span>
                    <p className="leading-relaxed text-slate-400">{alt.explanation}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                    <span className="font-bold block mb-1">
                      💰 Financial Incentives & Municipal Support Programs:
                    </span>
                    <p>{alt.subsidiesOrSupportInfo}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
