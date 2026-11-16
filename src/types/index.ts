/**
 * SmogShield AI — Domain Types & Interfaces
 * GenAI-Powered Urban Winter Smog & Community Resilience Copilot
 * Built by Team Spectronz for Build with AI: Code for Communities
 */

export type AqiSeverity = 'GOOD' | 'MODERATE' | 'UNHEALTHY_SENSITIVE' | 'UNHEALTHY' | 'VERY_UNHEALTHY' | 'HAZARDOUS';

export type InversionState = 'SEVERE_TRAP' | 'MODERATE_INVERSION' | 'SOLAR_MIXING_WINDOW' | 'NOCTURNAL_SETTLING';

export interface AirPollutantMetrics {
  pm25: number; // ug/m3
  pm10: number; // ug/m3
  no2: number;  // ug/m3
  so2: number;  // ug/m3
  co: number;   // ug/m3
  ozone: number;// ug/m3
  usAqi: number;
  europeanAqi: number;
}

export interface AtmosphericMetrics {
  temperatureC: number;
  relativeHumidityPct: number;
  boundaryLayerHeightM: number; // Planetary boundary layer / inversion ceiling in meters
  thermalInversionStrength: number; // 0 to 100 index
  windSpeedKmh: number;
  solarRadiationWm2: number;
}

export interface CityPreset {
  id: string;
  name: string;
  country: string;
  coordinates: { lat: number; lng: number };
  climateDescription: string;
  typicalWinterSmogCause: string;
  baselineMetrics: AirPollutantMetrics & AtmosphericMetrics;
}

export interface HourlyAtmosphericProfile {
  hour: number; // 0 - 23
  timeLabel: string;
  pm25: number;
  usAqi: number;
  boundaryLayerHeightM: number;
  inversionState: InversionState;
  ambientRiskMultiplier: number;
  isOptimalVentilationWindow: boolean;
  recommendedOutdoorActivity: 'SAFE' | 'RESTRICTED_MASK' | 'AVOID_OUTDOORS';
}

export type HousingType = 'APARTMENT_HIGH_RISE' | 'APARTMENT_GROUND' | 'STANDALONE_HOUSE';
export type InsulationLevel = 'POOR' | 'MODERATE' | 'HERMETIC_WEATHERSTRIPPED';
export type CookingFuel = 'GAS' | 'ELECTRIC_INDUCTION' | 'BIOMASS_WOOD';
export type HeatingType = 'CENTRAL_GAS' | 'ELECTRIC_HEAT_PUMP' | 'SPACE_HEATER' | 'FIREPLACE_WOOD';
export type CommuteMode = 'WALK_CYCLE' | 'PUBLIC_TRANSIT' | 'ELECTRIC_VEHICLE' | 'GAS_CAR_SOLO' | 'CARPOOL';

export interface FamilyProfile {
  familyName: string;
  cityId: string;
  customCityName?: string;
  memberCount: number;
  hasInfantsOrToddlers: boolean;
  hasElderlyMembers: boolean;
  hasAsthmaOrRespiratory: boolean;
  hasCardiovascularCondition: boolean;
  hasOutdoorWorkers: boolean;
  hasPets: boolean;
  housingType: HousingType;
  insulationLevel: InsulationLevel;
  cookingFuel: CookingFuel;
  heatingType: HeatingType;
  commuteMode: CommuteMode;
  commuteDistanceKm: number;
  hasDiyAirPurifier: boolean;
  hasCommercialHepa: boolean;
}

export interface RoutineActivity {
  id: string;
  timeRange: string;
  title: string;
  category: 'COMMUTE' | 'EXERCISE' | 'VENTILATION' | 'SCHOOL' | 'INDOOR_CHORE' | 'SLEEP_PREP';
  baselineHour: number;
  optimizedHour: number;
  isShifted: boolean;
  baselineExposureUg: number;
  optimizedExposureUg: number;
  rationale: string;
  actionableTip: string;
  emissionReductionTag?: string;
}

export interface IndoorHack {
  id: string;
  title: string;
  tagline: string;
  category: 'DIY_PURIFIER' | 'VENTILATION_TIMING' | 'SANCTUARY_ROOM' | 'EMISSION_SOURCE_CONTROL' | 'SEALING_FILTRATION';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedCostUsd: number;
  estimatedCostInr: number;
  estimatedBuildTimeMinutes: number;
  particulateReductionEfficiencyPct: number;
  materials: string[];
  steps: string[];
  scientificMechanism: string;
  dosAndDonts: { do: string[]; dont: string[] };
}

export interface SustainableAlternative {
  id: string;
  category: 'COMMUTE' | 'HOME_HEATING' | 'COOKING' | 'SCHOOL_TRANSIT' | 'EXERCISE';
  title: string;
  currentHabit: string;
  sustainableSwap: string;
  dailyAvoidedPm25Micrograms: number;
  dailyAvoidedCo2Kg: number;
  monthlyCostDeltaUsd: number;
  respiratoryRiskReductionPct: number;
  explanation: string;
  implementationEase: 'IMMEDIATE' | 'MODERATE_SETUP' | 'CAPITAL_INVESTMENT';
  subsidiesOrSupportInfo: string;
}

export interface QuantifiedImpactMetrics {
  avoidedPm25InhaledMicrograms: number;
  berkeleyCigarettesAvoided: number; // 22 ug/m3 * 24h = 1 cigarette
  avoidedCo2eKg: number;
  avoidedPrimaryPmGrams: number;
  respiratoryExacerbationRiskReductionPct: number;
  financialSavingsMonthUsd: number;
  communityResiliencePoints: number;
}

export interface CommunityAlert {
  id: string;
  timestamp: string;
  neighborhood: string;
  type: 'OPEN_BURNING_REPORT' | 'CLEAN_AIR_SANCTUARY_OPEN' | 'CARPOOL_CLUSTER_ACTIVE' | 'SMOG_PEAK_ADVISORY';
  severity: 'INFO' | 'WARNING' | 'EMERGENCY';
  description: string;
  affectedRadiusKm: number;
  reportedBy: string;
  status: 'ACTIVE' | 'VERIFIED' | 'RESOLVED';
  actionsSuggested: string[];
}

export interface GenAIChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  structuredCard?: {
    type: 'ROUTINE_PATCH' | 'DIY_HACK' | 'IMPACT_METRIC' | 'URGENT_SHIELD';
    headline: string;
    details: string[];
    quantifiedBenefit?: string;
  };
}
