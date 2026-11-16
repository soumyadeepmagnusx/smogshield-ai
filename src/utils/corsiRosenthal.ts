/**
 * Corsi-Rosenthal Box Physics & Clean Air Delivery Rate (CADR) Calculator
 * Models fluid mechanics, filter face velocity, derating factors,
 * and room Air Changes per Hour (ACH) according to ASHRAE 52.2 standards.
 */

export interface CorsiRosenthalConfig {
  fanType: '20_INCH_BOX_FAN' | 'CIRCULATOR_FAN' | 'PC_FAN_ARRAY';
  filterCount: 1 | 2 | 4 | 5;
  filterGrade: 'MERV_11' | 'MERV_13' | 'MERV_14' | 'HEPA_H13';
  roomDimensionsM: { length: number; width: number; height: number };
  fanSpeed: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface CorsiRosenthalOutput {
  cadrCfm: number;
  cadrM3H: number;
  roomVolumeM3: number;
  airChangesPerHour: number; // ACH
  timeToClean90PctMinutes: number;
  estimatedMaterialCostUsd: number;
  estimatedMaterialCostInr: number;
  estimatedDecibels: number;
  commercialHepaEquivalentCount: number;
  annualSavingsUsd: number;
  isAdequateForSmogEmergency: boolean;
}

export function computeCorsiRosenthalPerformance(config: CorsiRosenthalConfig): CorsiRosenthalOutput {
  // Free air delivery rating of standard 20" box fan in CFM
  let rawFanCfm = 650;
  if (config.fanType === 'CIRCULATOR_FAN') rawFanCfm = 800;
  if (config.fanType === 'PC_FAN_ARRAY') rawFanCfm = 420;

  // Fan speed derating
  let speedMultiplier = 1.0;
  let decibels = 51;
  if (config.fanSpeed === 'LOW') {
    speedMultiplier = 0.62;
    decibels = 39;
  } else if (config.fanSpeed === 'MEDIUM') {
    speedMultiplier = 0.82;
    decibels = 46;
  }

  // Filter single-pass PM2.5 collection efficiency
  let filterEfficiency = 0.85; // MERV 13 captures ~85% of 0.3-1.0 um particles
  if (config.filterGrade === 'MERV_11') filterEfficiency = 0.65;
  if (config.filterGrade === 'MERV_14') filterEfficiency = 0.90;
  if (config.filterGrade === 'HEPA_H13') filterEfficiency = 0.997;

  // Multi-filter pleat surface area derating factor
  // A 4-filter cube reduces static pressure resistance by 4x compared to a single filter!
  let surfaceAreaFactor = 0.88; // 4-filter cube has very low backpressure
  if (config.filterCount === 1) surfaceAreaFactor = 0.55; // High static pressure chokes the fan
  if (config.filterCount === 2) surfaceAreaFactor = 0.74; // Wedge design
  if (config.filterCount === 5) surfaceAreaFactor = 0.92; // Pentagon design with bottom filter

  const totalEffectiveCfm = Math.round(rawFanCfm * speedMultiplier * surfaceAreaFactor * filterEfficiency);
  const cadrM3H = Math.round(totalEffectiveCfm * 1.699); // 1 CFM = 1.699 m3/h

  // Room volume: Length * Width * Height in meters
  const roomVolumeM3 = Number(
    (config.roomDimensionsM.length * config.roomDimensionsM.width * config.roomDimensionsM.height).toFixed(1)
  );

  // Air Changes per Hour (ACH) = (CADR in m3/h) / (Room Volume in m3)
  const ach = Number((cadrM3H / Math.max(1, roomVolumeM3)).toFixed(1));

  // Time to achieve 90% particle reduction: t_90 = -ln(1 - 0.90) / (ACH / 60) = 2.3026 / (ACH / 60)
  const timeToClean90Minutes = Math.round(2.3026 / (ach / 60));

  // Material costs: $22 box fan + ($9 * filterCount) + $8 tape/shroud cardboard
  const baseFanCostUsd = 24;
  const filterCostUsd = 9.5 * config.filterCount;
  const hardwareCostUsd = 8;
  const totalCostUsd = Math.round(baseFanCostUsd + filterCostUsd + hardwareCostUsd);
  const totalCostInr = Math.round(totalCostUsd * 84);

  // A typical $350 commercial HEPA purifier provides ~180-220 CFM CADR
  const commercialHepaEquivalentCount = Number((totalEffectiveCfm / 200).toFixed(1));
  const annualSavingsUsd = Math.round(commercialHepaEquivalentCount * 280);

  // CDC and Harvard T.H. Chan recommendation for airborne hazards is >= 5 ACH
  const isAdequate = ach >= 5.0;

  return {
    cadrCfm: totalEffectiveCfm,
    cadrM3H,
    roomVolumeM3,
    airChangesPerHour: ach,
    timeToClean90PctMinutes: Math.max(5, timeToClean90Minutes),
    estimatedMaterialCostUsd: totalCostUsd,
    estimatedMaterialCostInr: totalCostInr,
    estimatedDecibels: decibels,
    commercialHepaEquivalentCount,
    annualSavingsUsd,
    isAdequateForSmogEmergency: isAdequate,
  };
}
