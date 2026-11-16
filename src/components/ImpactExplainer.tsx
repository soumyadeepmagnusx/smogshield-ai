import React, { useState } from 'react';
import {
  Flame,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { QuantifiedImpactMetrics, FamilyProfile } from '../types';

interface ImpactExplainerProps {
  metrics: QuantifiedImpactMetrics;
  familyProfile: FamilyProfile;
}

export const ImpactExplainer: React.FC<ImpactExplainerProps> = ({ metrics, familyProfile }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('berkeley');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <section
      className="w-full rounded-3xl glass-panel p-6 sm:p-8 space-y-8"
      aria-labelledby="impact-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-rose-950/50">
              <Flame className="w-5 h-5 text-slate-950" aria-hidden="true" />
            </div>
            <h2 id="impact-heading" className="text-xl font-extrabold text-white tracking-tight">
              Direct Physical & Health Impact Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Transparent, physics-grounded mathematical quantification for {familyProfile.familyName}'s smog navigation choices.
          </p>
        </div>

        {/* Gamified Community Resilience Score */}
        <div className="flex items-center space-x-3.5 glass-panel-glow px-5 py-3 rounded-2xl shadow-xl">
          <Award className="w-6 h-6 text-emerald-400" aria-hidden="true" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Community Resilience Score
            </span>
            <span className="text-lg font-black font-mono text-emerald-300">
              {metrics.communityResiliencePoints} PTS
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* KPI 1: Inhaled Dose Avoided */}
        <div className="p-4 rounded-2xl glass-panel text-center flex flex-col justify-between glass-card-interactive border border-emerald-500/20">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Inhaled Dose Avoided</span>
          <div className="text-2xl font-black font-mono text-emerald-400 my-1">
            {metrics.avoidedPm25InhaledMicrograms}
          </div>
          <span className="text-[10px] text-slate-400">µg PM2.5 / day</span>
        </div>

        {/* KPI 2: Berkeley Cigarettes */}
        <div className="p-4 rounded-2xl glass-panel text-center flex flex-col justify-between glass-card-interactive border border-amber-500/20">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Cigarettes Spared</span>
          <div className="text-2xl font-black font-mono text-amber-300 my-1">
            {metrics.berkeleyCigarettesAvoided}
          </div>
          <span className="text-[10px] text-slate-400">eq. cigs / person</span>
        </div>

        {/* KPI 3: CO2 Spared */}
        <div className="p-4 rounded-2xl glass-panel text-center flex flex-col justify-between glass-card-interactive border border-cyan-500/20">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Emissions Spared</span>
          <div className="text-2xl font-black font-mono text-cyan-400 my-1">
            {metrics.avoidedCo2eKg}
          </div>
          <span className="text-[10px] text-slate-400">kg CO₂e / day</span>
        </div>

        {/* KPI 4: Primary PM */}
        <div className="p-4 rounded-2xl glass-panel text-center flex flex-col justify-between glass-card-interactive border border-teal-500/20">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tailpipe / Soot Cut</span>
          <div className="text-2xl font-black font-mono text-teal-400 my-1">
            {metrics.avoidedPrimaryPmGrams}
          </div>
          <span className="text-[10px] text-slate-400">grams PM / day</span>
        </div>

        {/* KPI 5: Acute Risk Reduction */}
        <div className="p-4 rounded-2xl glass-panel text-center flex flex-col justify-between glass-card-interactive border border-rose-500/20">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Acute Risk Avoided</span>
          <div className="text-2xl font-black font-mono text-rose-400 my-1">
            -{metrics.respiratoryExacerbationRiskReductionPct}%
          </div>
          <span className="text-[10px] text-slate-400">bronchial flare-up</span>
        </div>

        {/* KPI 6: Monthly Savings */}
        <div className="p-4 rounded-2xl glass-panel text-center flex flex-col justify-between glass-card-interactive border border-purple-500/20">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Monthly Savings</span>
          <div className="text-2xl font-black font-mono text-purple-400 my-1">
            ${metrics.financialSavingsMonthUsd}
          </div>
          <span className="text-[10px] text-slate-400">fuel & filter cost</span>
        </div>
      </div>

      {/* Explanatory Scientific Proof Accordions */}
      <div className="space-y-3.5 pt-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <BookOpen className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span>Transparent Science: How These Metrics Are Formulated</span>
        </div>

        {/* Accordion 1: Berkeley Earth Cigarette Equivalence */}
        <div className="rounded-2xl glass-panel overflow-hidden border border-white/10 transition-all">
          <button
            type="button"
            onClick={() => toggleAccordion('berkeley')}
            className="w-full p-5 text-left flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white transition-colors"
            aria-expanded={openAccordion === 'berkeley'}
          >
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
              <span className="text-sm font-bold text-white">1. The Berkeley Earth Cigarette Equivalence Formulation</span>
            </div>
            {openAccordion === 'berkeley' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openAccordion === 'berkeley' && (
            <div className="px-5 pb-5 text-xs text-slate-300 space-y-3 border-t border-white/5 pt-4">
              <p className="leading-relaxed">
                Formulated by physicists Richard Muller and Elizabeth Rohde (Berkeley Earth, 2015), one cigarette per day delivers a physiological inhaled particulate burden roughly equivalent to breathing an outdoor concentration of <strong>22 µg/m³ of PM2.5 over 24 hours</strong>:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 border border-amber-500/30 text-center font-bold">
                Cigarettes Avoided = Δ Inhaled Micrograms / (22 µg/m³ × 24 hours) = Δ Inhaled / 528 µg
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                In severe winter smog episodes (e.g., Delhi NCR at 350 µg/m³), an unprotected adult inhaling 12 m³ of air per day breathes the toxic equivalent of <strong>~16 cigarettes every single day</strong>. Shifting exercise indoors and deploying Corsi-Rosenthal filtration cuts this by up to 13 cigarettes.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 2: Diurnal Planetary Boundary Layer Box Model */}
        <div className="rounded-2xl glass-panel overflow-hidden border border-white/10 transition-all">
          <button
            type="button"
            onClick={() => toggleAccordion('pbl')}
            className="w-full p-5 text-left flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white transition-colors"
            aria-expanded={openAccordion === 'pbl'}
          >
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
              <span className="text-sm font-bold text-white">2. Eulerian Atmospheric Boundary Layer Inversion Box Model</span>
            </div>
            {openAccordion === 'pbl' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openAccordion === 'pbl' && (
            <div className="px-5 pb-5 text-xs text-slate-300 space-y-3 border-t border-white/5 pt-4">
              <p className="leading-relaxed">
                Urban pollutant concentration is governed by the Eulerian box dispersion model:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 border border-cyan-500/30 text-center font-bold">
                C_ground ≈ Q / (u · z_i · W)
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Where <em>Q</em> is emission rate, <em>u</em> is wind velocity, <em>W</em> is city width, and <strong>z_i</strong> is the planetary boundary layer (PBL) mixing height. During calm winter nights, radiative cooling drops <em>z_i</em> to <strong>80–120 meters</strong>, trapping exhaust at high concentrations. At 13:30 PM, solar heating expands <em>z_i</em> to <strong>800–1200 meters</strong>, diluting ground concentration by up to <strong>8x</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 3: Minute Ventilation & Pulmonary Deposition Physics */}
        <div className="rounded-2xl glass-panel overflow-hidden border border-white/10 transition-all">
          <button
            type="button"
            onClick={() => toggleAccordion('ventilation')}
            className="w-full p-5 text-left flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white transition-colors"
            aria-expanded={openAccordion === 'ventilation'}
          >
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              <span className="text-sm font-bold text-white">3. Minute Ventilation (V_E) & Oronasal Breathing Switch</span>
            </div>
            {openAccordion === 'ventilation' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openAccordion === 'ventilation' && (
            <div className="px-5 pb-5 text-xs text-slate-300 space-y-3 border-t border-white/5 pt-4">
              <p className="leading-relaxed">
                Inhaled particulate dose is calculated as:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-emerald-500/30 text-center font-bold">
                Dose = ∫ (V_E(t) · C_PM2.5(t) · η_deposition) dt
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                At rest, an adult breathes <strong>0.5 m³/h</strong> primarily through the nasal passage, where nasal hair and turbinates capture large particulates. During aerobic jogging (07:00 AM), minute ventilation surges to <strong>2.5 m³/h</strong> (a 500% increase), and mouth-breathing bypasses nasal defense, delivering ultrafine carbon nanoparticles directly into the unciliated alveoli. Shifting exercise indoors avoids this 10x lung deposition surge.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
