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
      className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="alternatives-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h2 id="alternatives-heading" className="text-lg font-bold text-white tracking-tight">
              Sustainable Alternatives & Lifestyle Swaps
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Targeted switches for heating, transit, and cooking tailored to {familyProfile.familyName}'s lifestyle.
          </p>
        </div>

        {/* Selected Swaps Count Badge */}
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Active Swaps:</span>
          <span className="text-emerald-400 font-bold">
            {selectedAlternatives.length} of {SUSTAINABLE_ALTERNATIVES.length} Adopted
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
              filterCategory === cat
                ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-950/40'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Alternatives List */}
      <div className="space-y-3">
        {filteredAlternatives.map((alt) => {
          const active = isSelected(alt.id);
          const isExpanded = expandedId === alt.id;

          return (
            <div
              key={alt.id}
              className={`rounded-xl border transition-all ${
                active
                  ? 'bg-slate-950/90 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Checkbox & Title */}
                <div className="flex items-start space-x-3">
                  <button
                    type="button"
                    onClick={() => onToggleAlternative(alt)}
                    className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                      active
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-slate-700 bg-slate-900 hover:border-slate-500'
                    }`}
                    aria-label={`Adopt sustainable alternative: ${alt.title}`}
                    aria-checked={active}
                    role="checkbox"
                  >
                    {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {alt.category.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400">
                        {alt.implementationEase.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1">{alt.title}</h3>

                    {/* Current vs Swap */}
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-slate-300">
                        <span className="text-[10px] uppercase font-bold text-rose-400 block mb-0.5">
                          Current Baseline:
                        </span>
                        {alt.currentHabit}
                      </div>
                      <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-slate-200">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
                          Sustainable Alternative:
                        </span>
                        {alt.sustainableSwap}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Impact Telemetry Badges */}
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-900 text-center min-w-[85px] border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold block">Inhaled Cut</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      -{alt.dailyAvoidedPm25Micrograms} µg
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900 text-center min-w-[85px] border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold block">CO₂e Spared</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      -{alt.dailyAvoidedCo2Kg} kg
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900 text-center min-w-[85px] border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase font-semibold block">Risk Delta</span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      -{alt.respiratoryRiskReductionPct}%
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : alt.id)}
                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                    aria-label={isExpanded ? 'Collapse details' : 'Expand scientific rationale'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Scientific & Subsidy Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/60 text-xs text-slate-300 space-y-2">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 font-bold block mb-1">
                      Scientific & Emissions Mechanism:
                    </span>
                    <p className="leading-relaxed">{alt.explanation}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                    <span className="font-bold block mb-1">
                      💰 Financial Incentives & Municipal Programs:
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
