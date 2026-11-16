/**
 * OASIS Common Alerting Protocol (CAP v1.2) Generator
 * Standardized XML emergency alert schema used by national meteorological
 * authorities, civil defense, and community early warning platforms.
 */

import { CommunityAlert, CityPreset, AirPollutantMetrics } from '../types';

export function generateOasisCapXml(
  alert: CommunityAlert,
  city: CityPreset,
  metrics: AirPollutantMetrics
): string {
  const sentIso = new Date().toISOString();
  const alertIdentifier = `SMOGSHIELD-CAP-${alert.id}-${Date.now()}`;

  const urgency = alert.severity === 'EMERGENCY' ? 'Immediate' : alert.severity === 'WARNING' ? 'Expected' : 'Future';
  const severity = alert.severity === 'EMERGENCY' ? 'Extreme' : alert.severity === 'WARNING' ? 'Severe' : 'Moderate';
  const certainty = 'Observed';

  return `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>${alertIdentifier}</identifier>
  <sender>smogshield-ai@spectronz.org</sender>
  <sent>${sentIso}</sent>
  <status>Actual</status>
  <msgType>Alert</msgType>
  <scope>Public</scope>
  <code>IPAWS-CAP-1.2</code>
  <info>
    <category>Env</category>
    <event>Severe Winter Smog & Urban Particulate Alert</event>
    <urgency>${urgency}</urgency>
    <severity>${severity}</severity>
    <certainty>${certainty}</certainty>
    <eventCode>
      <valueName>EPA-AQI</valueName>
      <value>${metrics.usAqi}</value>
    </eventCode>
    <expires>${new Date(Date.now() + 24 * 3600 * 1000).toISOString()}</expires>
    <senderName>SmogShield AI Community Resilience Network</senderName>
    <headline>${alert.type.replace(/_/g, ' ')}: ${alert.neighborhood}, ${city.name}</headline>
    <description>${escapeXml(alert.description)}. Current PM2.5: ${metrics.pm25} ug/m3 (AQI: ${metrics.usAqi}). Thermal inversion capping atmospheric dispersion.</description>
    <instruction>${escapeXml(alert.actionsSuggested.join('; '))}</instruction>
    <parameter>
      <valueName>PM2.5</valueName>
      <value>${metrics.pm25} ug/m3</value>
    </parameter>
    <parameter>
      <valueName>NO2</valueName>
      <value>${metrics.no2} ug/m3</value>
    </parameter>
    <parameter>
      <valueName>AffectedRadiusKm</valueName>
      <value>${alert.affectedRadiusKm}</value>
    </parameter>
    <area>
      <areaDesc>${alert.neighborhood}, ${city.name}, ${city.country}</areaDesc>
      <circle>${city.coordinates.lat},${city.coordinates.lng},${alert.affectedRadiusKm}</circle>
    </area>
  </info>
</alert>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
