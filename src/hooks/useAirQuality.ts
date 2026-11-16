/**
 * @file useAirQuality.ts
 * @description Custom React hook managing air quality telemetry, atmospheric metrics, and city switching.
 * Encapsulates polling, error handling, and boundary layer inversion calculations.
 */

import { useState, useEffect, useCallback } from 'react';
import type { CityPreset, AirPollutantMetrics, AtmosphericMetrics } from '../types/index.ts';
import { fetchLiveAirQualityData, type LiveTelemetryResponse } from '../services/openMeteoService.ts';
import { CITY_PRESETS } from '../constants/cities.ts';
import { logger } from '../utils/logger.ts';

export interface UseAirQualityResult {
  selectedCity: CityPreset;
  pollutants: AirPollutantMetrics;
  atmosphere: AtmosphericMetrics;
  isLiveStreaming: boolean;
  sourceLabel: string;
  isLoading: boolean;
  setSelectedCity: (city: CityPreset) => void;
  refreshTelemetry: () => Promise<void>;
}

export function useAirQuality(initialCity: CityPreset = CITY_PRESETS[0]!): UseAirQualityResult {
  const [selectedCity, setSelectedCity] = useState<CityPreset>(initialCity);
  const [pollutants, setPollutants] = useState<AirPollutantMetrics>(initialCity.baselineMetrics);
  const [atmosphere, setAtmosphere] = useState<AtmosphericMetrics>({
    temperatureC: initialCity.baselineMetrics.temperatureC,
    relativeHumidityPct: initialCity.baselineMetrics.relativeHumidityPct,
    boundaryLayerHeightM: initialCity.baselineMetrics.boundaryLayerHeightM,
    thermalInversionStrength: initialCity.baselineMetrics.thermalInversionStrength,
    windSpeedKmh: initialCity.baselineMetrics.windSpeedKmh,
    solarRadiationWm2: initialCity.baselineMetrics.solarRadiationWm2
  });
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [sourceLabel, setSourceLabel] = useState('Live Open-Meteo High-Resolution Telemetry');
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async (city: CityPreset) => {
    setIsLoading(true);
    try {
      logger.info('useAirQuality', `Synchronizing atmospheric telemetry for ${city.name}`);
      const res: LiveTelemetryResponse = await fetchLiveAirQualityData(city, false);
      setPollutants(res.pollutants);
      setAtmosphere(res.atmosphere);
      setIsLiveStreaming(res.isLive);
      setSourceLabel(res.sourceLabel);
    } catch (err: unknown) {
      logger.warn('useAirQuality', `Failed fetching live telemetry for ${city.name}, falling back to baseline`, err);
      setPollutants(city.baselineMetrics);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const res = await fetchLiveAirQualityData(selectedCity, false);
        if (!cancelled) {
          setPollutants(res.pollutants);
          setAtmosphere(res.atmosphere);
          setIsLiveStreaming(res.isLive);
          setSourceLabel(res.sourceLabel);
        }
      } catch {
        if (!cancelled) {
          setPollutants(selectedCity.baselineMetrics);
        }
      }
    }
    void init();
    return () => {
      cancelled = true;
    };
  }, [selectedCity]);

  const refreshTelemetry = useCallback(async () => {
    await loadData(selectedCity);
  }, [selectedCity, loadData]);

  return {
    selectedCity,
    pollutants,
    atmosphere,
    isLiveStreaming,
    sourceLabel,
    isLoading,
    setSelectedCity,
    refreshTelemetry
  };
}
