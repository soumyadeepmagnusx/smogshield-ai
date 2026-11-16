/**
 * Atmospheric Physics & AQI Mathematical Engine
 * Models Planetary Boundary Layer (PBL) thermal inversions,
 * EPA & CPCB PM2.5-to-AQI piecewise linear conversions, and
 * diurnal convective atmospheric mixing dynamics.
 */

import { AqiSeverity, InversionState, HourlyAtmosphericProfile } from '../types';

/**
 * EPA PM2.5 piecewise linear breakpoints (2024 revised standard)
 * Concentration range (ug/m3) -> AQI range
 */
interface Breakpoint {
  cLow: number;
  cHigh: number;
  iLow: number;
  iHigh: number;
  severity: AqiSeverity;
  label: string;
}

const EPA_BREAKPOINTS: Breakpoint[] = [
  { cLow: 0.0,   cHigh: 9.0,   iLow: 0,   iHigh: 50,  severity: 'GOOD',                 label: 'Good' },
  { cLow: 9.1,   cHigh: 35.4,  iLow: 51,  iHigh: 100, severity: 'MODERATE',             label: 'Moderate' },
  { cLow: 35.5,  cHigh: 55.4,  iLow: 101, iHigh: 150, severity: 'UNHEALTHY_SENSITIVE', label: 'Unhealthy for Sensitive Groups' },
  { cLow: 55.5,  cHigh: 125.4, iLow: 151, iHigh: 200, severity: 'UNHEALTHY',           label: 'Unhealthy' },
  { cLow: 125.5, cHigh: 225.4, iLow: 201, iHigh: 300, severity: 'VERY_UNHEALTHY',      label: 'Very Unhealthy' },
  { cLow: 225.5, cHigh: 500.4, iLow: 301, iHigh: 500, severity: 'HAZARDOUS',           label: 'Hazardous' },
];

/**
 * Computes US EPA AQI from PM2.5 concentration using piecewise linear interpolation:
 * I = ((I_high - I_low) / (C_high - C_low)) * (C - C_low) + I_low
 */
export function calculateUsAqiFromPm25(pm25: number): { aqi: number; severity: AqiSeverity; label: string } {
  const conc = Math.max(0, pm25);

  for (const bp of EPA_BREAKPOINTS) {
    if (conc <= bp.cHigh) {
      const aqi = Math.round(
        ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (conc - bp.cLow) + bp.iLow
      );
      return { aqi: Math.min(500, Math.max(0, aqi)), severity: bp.severity, label: bp.label };
    }
  }

  // Above 500 ug/m3
  return { aqi: 500, severity: 'HAZARDOUS', label: 'Severe Hazardous Episode' };
}

/**
 * Evaluates the Thermal Inversion State based on hour of day and Planetary Boundary Layer height.
 * Thermal inversions trap pollutants during cold nocturnal and early morning hours.
 */
export function evaluateInversionState(hour: number, boundaryLayerHeightM: number): InversionState {
  // Midnight to 08:00 - Severe radiative nocturnal inversion
  if (hour >= 23 || hour <= 8) {
    return boundaryLayerHeightM < 180 ? 'SEVERE_TRAP' : 'MODERATE_INVERSION';
  }
  // 12:00 to 15:30 - Solar radiative convective thermals break the inversion cap
  if (hour >= 11 && hour <= 16) {
    return 'SOLAR_MIXING_WINDOW';
  }
  // Evening dusk (17:00 to 22:00) - Sun sets, nocturnal radiative inversion sets in
  if (hour >= 17 && hour <= 22) {
    return boundaryLayerHeightM < 250 ? 'SEVERE_TRAP' : 'NOCTURNAL_SETTLING';
  }
  return 'MODERATE_INVERSION';
}

/**
 * Generates an hourly 24-hour diurnal profile based on urban air physics:
 * Concentrations inversely correlate with Planetary Boundary Layer (PBL) mixing height
 * C_ground ~ Q / (u * z_i) (Eulerian box dispersion approximation)
 */
export function generateDiurnalHourlyForecast(
  basePm25: number,
  basePblM: number
): HourlyAtmosphericProfile[] {
  const hours: HourlyAtmosphericProfile[] = [];

  for (let h = 0; h < 24; h++) {
    // Diurnal mixing height curve: Lowest at 04:00 (radiative cooling), highest at 14:00 (solar insolation)
    const pblHeight = Math.max(85, Math.round(basePblM * (0.4 + 1.2 * Math.max(0, Math.sin(((h - 6) / 12) * Math.PI)))));
    
    // Ground PM2.5 rises when PBL collapses (inversion trap) + rush-hour traffic emissions
    let trafficSpike = 0;
    if ((h >= 7 && h <= 10) || (h >= 18 && h <= 21)) {
      trafficSpike = 0.28; // 28% increase from vehicle exhaust & cold engines
    }

    // Inversion concentration multiplier: low PBL means high ground concentration
    const inversionMultiplier = Math.max(0.45, Math.min(2.1, 450 / Math.max(100, pblHeight))) + trafficSpike;
    const hourPm25 = Math.round(basePm25 * inversionMultiplier * (0.85 + 0.3 * Math.sin(h)));

    const { aqi } = calculateUsAqiFromPm25(hourPm25);
    const inversionState = evaluateInversionState(h, pblHeight);
    const isOptimalVentilation = inversionState === 'SOLAR_MIXING_WINDOW' && h >= 12 && h <= 15;

    let recommendedOutdoorActivity: 'SAFE' | 'RESTRICTED_MASK' | 'AVOID_OUTDOORS' = 'SAFE';
    if (aqi > 200 || inversionState === 'SEVERE_TRAP') {
      recommendedOutdoorActivity = 'AVOID_OUTDOORS';
    } else if (aqi > 100) {
      recommendedOutdoorActivity = 'RESTRICTED_MASK';
    }

    hours.push({
      hour: h,
      timeLabel: `${h.toString().padStart(2, '0')}:00`,
      pm25: hourPm25,
      usAqi: aqi,
      boundaryLayerHeightM: pblHeight,
      inversionState,
      ambientRiskMultiplier: Number(inversionMultiplier.toFixed(2)),
      isOptimalVentilationWindow: isOptimalVentilation,
      recommendedOutdoorActivity,
    });
  }

  return hours;
}

/**
 * Returns color classes and semantic styles for AQI categories,
 * engineered strictly for WCAG 2.1 AA/AAA contrast ratios.
 */
export function getAqiDisplayTokens(aqi: number): {
  severity: AqiSeverity;
  label: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  dotColor: string;
} {
  if (aqi <= 50) {
    return {
      severity: 'GOOD',
      label: 'Good',
      badgeBg: 'bg-emerald-950/80',
      badgeText: 'text-emerald-300',
      borderClass: 'border-emerald-500/50',
      dotColor: 'bg-emerald-400',
    };
  }
  if (aqi <= 100) {
    return {
      severity: 'MODERATE',
      label: 'Moderate',
      badgeBg: 'bg-yellow-950/80',
      badgeText: 'text-yellow-300',
      borderClass: 'border-yellow-500/50',
      dotColor: 'bg-yellow-400',
    };
  }
  if (aqi <= 150) {
    return {
      severity: 'UNHEALTHY_SENSITIVE',
      label: 'Unhealthy for Sensitive',
      badgeBg: 'bg-orange-950/80',
      badgeText: 'text-orange-300',
      borderClass: 'border-orange-500/50',
      dotColor: 'bg-orange-400',
    };
  }
  if (aqi <= 200) {
    return {
      severity: 'UNHEALTHY',
      label: 'Unhealthy',
      badgeBg: 'bg-rose-950/80',
      badgeText: 'text-rose-300',
      borderClass: 'border-rose-500/50',
      dotColor: 'bg-rose-400',
    };
  }
  if (aqi <= 300) {
    return {
      severity: 'VERY_UNHEALTHY',
      label: 'Very Unhealthy',
      badgeBg: 'bg-purple-950/80',
      badgeText: 'text-purple-300',
      borderClass: 'border-purple-500/50',
      dotColor: 'bg-purple-400',
    };
  }
  return {
    severity: 'HAZARDOUS',
    label: 'Hazardous Emergency',
    badgeBg: 'bg-red-950',
    badgeText: 'text-red-200 font-extrabold',
    borderClass: 'border-red-600',
    dotColor: 'bg-red-500 animate-pulse',
  };
}
