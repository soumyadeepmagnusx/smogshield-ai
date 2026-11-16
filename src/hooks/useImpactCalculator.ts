/**
 * @file useImpactCalculator.ts
 * @description Custom React hook providing memoized environmental impact and health risk reduction metrics.
 * Integrates inhaled particulate integration, Berkeley Earth cigarette translation, and CO2e abatement.
 */

import { useMemo } from 'react';
import type { FamilyProfile, SustainableAlternative, QuantifiedImpactMetrics } from '../types/index.ts';
import { calculateComprehensiveImpact } from '../utils/impactCalculator.ts';

export function useImpactCalculator(
  familyProfile: FamilyProfile,
  selectedAlternatives: SustainableAlternative[],
  routineImpact: {
    dailyAvoidedInhaledUg: number;
    cigarettesAvoidedPerPerson: number;
    respiratoryRiskReductionPct: number;
  }
): QuantifiedImpactMetrics {
  return useMemo(() => {
    return calculateComprehensiveImpact(familyProfile, selectedAlternatives, routineImpact);
  }, [familyProfile, selectedAlternatives, routineImpact]);
}
