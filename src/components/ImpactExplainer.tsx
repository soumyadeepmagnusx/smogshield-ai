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
      className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="impact-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400" aria-hidden="true" />
            <h2 id="impact-heading" className="text-lg font-bold text-white tracking-tight">
              Direct Physical & Health Impact Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent, physics-grounded mathematical quantification for {familyProfile.familyName}'s smog navigation choices.
          </p>
        </div>

        {/* Gamified Community Resilience Score */}
        <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-950/60 to-teal-950/60 px-4 py-2 rounded-xl border border-emerald-500/40">
          <Award className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Community Resilience Score
            </span>
            <span className="text-sm font-black font-mono text-emerald-300">
              {metrics.communityResiliencePoints} PTS
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: Inhaled Dose Avoided */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Avoided Inhaled Dose</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 my-1">
            {metrics.avoidedPm25InhaledMicrograms}
          </div>
          <span className="text-[10px] text-slate-400">µg PM2.5 / day</span>
        </div>

        {/* KPI 2: Berkeley Cigarettes */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Cigarettes Spared</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-400 my-1">
            {metrics.berkeleyCigarettesAvoided}
          </div>
          <span className="text-[10px] text-slate-400">eq. cigs / person</span>
        </div>

        {/* KPI 3: CO2 Spared */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Emissions Spared</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-cyan-400 my-1">
            {metrics.avoidedCo2eKg}
          </div>
          <span className="text-[10px] text-slate-400">kg CO₂e / day</span>
        </div>

        {/* KPI 4: Primary PM */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Tailpipe/Soot Cut</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-teal-400 my-1">
            {metrics.avoidedPrimaryPmGrams}
          </div>
          <span className="text-[10px] text-slate-400">grams PM / day</span>
        </div>

        {/* KPI 5: Acute Risk Reduction */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Acute Risk Avoided</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-rose-400 my-1">
            -{metrics.respiratoryExacerbationRiskReductionPct}%
          </div>
          <span className="text-[10px] text-slate-400">bronchial flare-up</span>
        </div>

        {/* KPI 6: Monthly Savings */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Monthly Savings</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-purple-400 my-1">
            ${metrics.financialSavingsMonthUsd}
          </div>
          <span className="text-[10px] text-slate-400">fuel & filter cost</span>
        </div>
      </div>

      {/* Explanatory Scientific Proof Accordions */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <BookOpen className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span>Transparent Science: How These Metrics Are Formulated</span>
        </div>

        {/* Accordion 1: Berkeley Earth Cigarette Equivalence */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('berkeley')}
            className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white transition-colors"
            aria-expanded={openAccordion === 'berkeley'}
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>1. The Berkeley Earth Cigarette Equivalence Formulation</span>
            </div>
            {openAccordion === 'berkeley' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openAccordion === 'berkeley' && (
            <div className="px-4 pb-4 text-xs text-slate-300 space-y-2 border-t border-slate-800/80 pt-3">
              <p className="leading-relaxed">
                Formulated by physicists Richard Muller and Elizabeth Rohde (Berkeley Earth, 2015), one cigarette per day delivers a physiological inhaled particulate burden roughly equivalent to breathing an outdoor concentration of <strong>22 µg/m³ of PM2.5 over 24 hours</strong>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-amber-300 border border-slate-800 text-center">
                Cigarettes Avoided = Δ Inhaled Micrograms / (22 µg/m³ × 24 hours) = Δ Inhaled / 528 µg
              </div>
              <p className="text-[11px] text-slate-400">
                In severe winter smog episodes (e.g., Delhi NCR at 350 µg/m³), an unprotected adult inhaling 12 m³ of air per day breathes the toxic equivalent of <strong>~16 cigarettes every single day</strong>. Shifting exercise indoors and deploying Corsi-Rosenthal filtration cuts this by up to 13 cigarettes.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 2: Diurnal Planetary Boundary Layer Box Model */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('pbl')}
            className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white transition-colors"
            aria-expanded={openAccordion === 'pbl'}
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>2. Eulerian Atmospheric Boundary Layer Inversion Box Model</span>
            </div>
            {openAccordion === 'pbl' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openAccordion === 'pbl' && (
            <div className="px-4 pb-4 text-xs text-slate-300 space-y-2 border-t border-slate-800/80 pt-3">
              <p className="leading-relaxed">
                Urban pollutant concentration is governed by the Eulerian box model:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-cyan-300 border border-slate-800 text-center">
                C_ground ≈ Q / (u · z_i · W)
              </div>
              <p className="text-[11px] text-slate-400">
                Where <em>Q</em> is emission rate, <em>u</em> is wind velocity, <em>W</em> is city width, and <strong>z_i</strong> is the planetary boundary layer (PBL) mixing height. During calm winter nights, radiative cooling drops <em>z_i</em> to <strong>80–120 meters</strong>, trapping exhaust at high concentrations. At 13:30 PM, solar heating expands <em>z_i</em> to <strong>800–1200 meters</strong>, diluting ground concentration by up to <strong>8x</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 3: Minute Ventilation & Pulmonary Deposition Physics */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('ventilation')}
            className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white transition-colors"
            aria-expanded={openAccordion === 'ventilation'}
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>3. Minute Ventilation (V_E) & Oronasal Breathing Switch</span>
            </div>
            {openAccordion === 'ventilation' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openAccordion === 'ventilation' && (
            <div className="px-4 pb-4 text-xs text-slate-300 space-y-2 border-t border-slate-800/80 pt-3">
              <p className="leading-relaxed">
                Inhaled particulate dose is calculated as:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-emerald-300 border border-slate-800 text-center">
                Dose = ∫ (V_E(t) · C_PM2.5(t) · η_deposition) dt
              </div>
              <p className="text-[11px] text-slate-400">
                At rest, an adult breathes <strong>0.5 m³/h</strong> primarily through the nasal passage, where nasal hair and turbinates capture large particulates. During aerobic jogging (07:00 AM), minute ventilation surges to <strong>2.5 m³/h</strong> (a 500% increase), and mouth-breathing bypasses nasal defense, delivering ultrafine carbon nanoparticles directly into the unciliated alveoli. Shifting exercise indoors avoids this 10x lung deposition surge.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
