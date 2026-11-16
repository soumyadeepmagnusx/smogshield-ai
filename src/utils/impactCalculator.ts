/**
 * Direct Impact Mathematical Engine
 * Quantifies physiological inhaled dose reductions, Berkeley Earth cigarette equivalents,
 * lifecycle carbon savings, and clinical acute respiratory exacerbation risk reductions.
 */

import { FamilyProfile, QuantifiedImpactMetrics, RoutineActivity, SustainableAlternative } from '../types';

/**
 * Minute ventilation rates (m3/h) calibrated from EPA Exposure Factors Handbook (Table 6-1)
 */
export const VENTILATION_RATES = {
  SLEEP: 0.42,          // m3/h
  SEDENTARY_DESK: 0.50, // m3/h
  LIGHT_CHORE: 0.85,    // m3/h
  BRISK_WALK: 1.35,     // m3/h
  STRENUOUS_RUN: 2.50,  // m3/h
};

/**
 * Berkeley Earth Rule of Thumb:
 * One cigarette corresponds to ~22 ug/m3 PM2.5 exposure for 24 hours.
 * 22 ug/m3 * 24 hours = 528 ug * h / m3
 */
const BERKELEY_EARTH_CIGARETTE_FACTOR = 528;

/**
 * Calculates total inhaled PM2.5 dose (ug) given concentration, breathing rate, and duration.
 */
export function calculateInhaledDoseMicrograms(
  pm25ConcentrationUgM3: number,
  ventilationRateM3H: number,
  durationHours: number
): number {
  return Number((pm25ConcentrationUgM3 * ventilationRateM3H * durationHours).toFixed(1));
}

/**
 * Evaluates the impact of shifting daily routines from high-smog nocturnal inversion traps
 * to the afternoon solar mixing window, combined with indoor sanctuary filtration.
 */
export function computeRoutineOptimizationImpact(
  activities: RoutineActivity[],
  profile: FamilyProfile,
  _ambientPm25: number
): {
  dailyAvoidedInhaledUg: number;
  cigarettesAvoidedPerPerson: number;
  familyCigarettesAvoidedTotal: number;
  respiratoryRiskReductionPct: number;
} {
  let totalAvoidedUg = 0;

  for (const act of activities) {
    if (act.isShifted) {
      const avoidedExposure = Math.max(0, act.baselineExposureUg - act.optimizedExposureUg);
      // Average adult + child blended ventilation rate ~ 0.85 m3/h
      const activityDoseSaved = avoidedExposure * 0.85;
      totalAvoidedUg += activityDoseSaved;
    }
  }

  // Vulnerability weighting multiplier: infants and asthmatics have higher ventilation/weight ratios
  let vulnerabilityWeight = 1.0;
  if (profile.hasAsthmaOrRespiratory) vulnerabilityWeight += 0.45;
  if (profile.hasInfantsOrToddlers) vulnerabilityWeight += 0.35;
  if (profile.hasElderlyMembers) vulnerabilityWeight += 0.25;

  const personalAvoidedUg = totalAvoidedUg * vulnerabilityWeight;
  const familyTotalAvoidedUg = personalAvoidedUg * Math.max(1, profile.memberCount);

  // Cigarettes calculation
  const cigarettesPerPerson = Number((personalAvoidedUg / BERKELEY_EARTH_CIGARETTE_FACTOR).toFixed(2));
  const familyCigarettesTotal = Number((familyTotalAvoidedUg / BERKELEY_EARTH_CIGARETTE_FACTOR).toFixed(1));

  // Acute respiratory exacerbation risk curve (Pope et al. log-linear concentration-response)
  // Baseline risk reduction % = (1 - exp(-0.005 * deltaC)) * 100
  const deltaC = totalAvoidedUg / 4.0; // average hourly concentration delta
  const riskReductionPct = Math.min(
    78,
    Number(((1 - Math.exp(-0.006 * deltaC)) * 100).toFixed(1))
  );

  return {
    dailyAvoidedInhaledUg: Math.round(personalAvoidedUg),
    cigarettesAvoidedPerPerson: cigarettesPerPerson,
    familyCigarettesAvoidedTotal: familyCigarettesTotal,
    respiratoryRiskReductionPct: Math.max(8.5, riskReductionPct),
  };
}

/**
 * Aggregates holistic impact metrics combining routine optimization, indoor filtration,
 * and active sustainable lifestyle alternatives.
 */
export function calculateComprehensiveImpact(
  profile: FamilyProfile,
  selectedAlternatives: SustainableAlternative[],
  routineImpact: { dailyAvoidedInhaledUg: number; cigarettesAvoidedPerPerson: number; respiratoryRiskReductionPct: number }
): QuantifiedImpactMetrics {
  let dailyCo2AvoidedKg = 0;
  let dailyPrimaryPmGrams = 0;
  let monthlyFinancialSavings = 0;

  for (const alt of selectedAlternatives) {
    dailyCo2AvoidedKg += alt.dailyAvoidedCo2Kg;
    // Primary PM tailpipe/chimney avoidance ~ 0.12g per kg CO2 saved
    dailyPrimaryPmGrams += alt.dailyAvoidedCo2Kg * 0.12;
    monthlyFinancialSavings += Math.max(0, alt.monthlyCostDeltaUsd);
  }

  // Bonus impact if DIY air purifier is active
  let diyPurifierBonusUg = 0;
  if (profile.hasDiyAirPurifier) {
    // A Corsi-Rosenthal Box running in living/bedroom drops indoor PM2.5 by ~75%
    diyPurifierBonusUg = 450 * 0.75 * 0.5 * 10; // ~1687 ug inhaled avoided over 10 indoor hours
  }

  const totalInhaledAvoidedUg = routineImpact.dailyAvoidedInhaledUg + diyPurifierBonusUg;
  const cigarettesAvoided = Number((totalInhaledAvoidedUg / BERKELEY_EARTH_CIGARETTE_FACTOR).toFixed(2));

  // Resilience score points (gamified community metrics)
  const resiliencePoints = Math.round(
    cigarettesAvoided * 25 + dailyCo2AvoidedKg * 15 + routineImpact.respiratoryRiskReductionPct * 4
  );

  return {
    avoidedPm25InhaledMicrograms: Math.round(totalInhaledAvoidedUg),
    berkeleyCigarettesAvoided: cigarettesAvoided,
    avoidedCo2eKg: Number(dailyCo2AvoidedKg.toFixed(2)),
    avoidedPrimaryPmGrams: Number(dailyPrimaryPmGrams.toFixed(2)),
    respiratoryExacerbationRiskReductionPct: routineImpact.respiratoryRiskReductionPct,
    financialSavingsMonthUsd: Math.round(monthlyFinancialSavings),
    communityResiliencePoints: resiliencePoints,
  };
}
