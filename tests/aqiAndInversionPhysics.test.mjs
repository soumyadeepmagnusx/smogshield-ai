import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * SmogShield AI — Atmospheric Physics & Breakpoint Mathematical Tests
 */

// Replicate mathematical logic for isolated node testing
function calculateUsAqiFromPm25(pm25) {
  const conc = Math.max(0, pm25);
  const breakpoints = [
    { cLow: 0.0,   cHigh: 9.0,   iLow: 0,   iHigh: 50 },
    { cLow: 9.1,   cHigh: 35.4,  iLow: 51,  iHigh: 100 },
    { cLow: 35.5,  cHigh: 55.4,  iLow: 101, iHigh: 150 },
    { cLow: 55.5,  cHigh: 125.4, iLow: 151, iHigh: 200 },
    { cLow: 125.5, cHigh: 225.4, iLow: 201, iHigh: 300 },
    { cLow: 225.5, cHigh: 500.4, iLow: 301, iHigh: 500 },
  ];

  for (const bp of breakpoints) {
    if (conc <= bp.cHigh) {
      const aqi = Math.round(
        ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (conc - bp.cLow) + bp.iLow
      );
      return Math.min(500, Math.max(0, aqi));
    }
  }
  return 500;
}

function evaluateInversionState(hour, boundaryLayerHeightM) {
  if (hour >= 23 || hour <= 8) {
    return boundaryLayerHeightM < 180 ? 'SEVERE_TRAP' : 'MODERATE_INVERSION';
  }
  if (hour >= 11 && hour <= 16) {
    return 'SOLAR_MIXING_WINDOW';
  }
  if (hour >= 17 && hour <= 22) {
    return boundaryLayerHeightM < 250 ? 'SEVERE_TRAP' : 'NOCTURNAL_SETTLING';
  }
  return 'MODERATE_INVERSION';
}

test('EPA PM2.5 to AQI: Piecewise linear calculation matches revised 2024 standards', () => {
  // Low concentration: 4.5 ug/m3 -> AQI 25
  assert.equal(calculateUsAqiFromPm25(4.5), 25);

  // Moderate boundary: 35.4 ug/m3 -> AQI 100
  assert.equal(calculateUsAqiFromPm25(35.4), 100);

  // Unhealthy sensitive: 45.0 ug/m3 -> AQI ~124
  const sensitiveAqi = calculateUsAqiFromPm25(45.0);
  assert.ok(sensitiveAqi >= 120 && sensitiveAqi <= 130);

  // Severe hazardous: 350 ug/m3 -> AQI ~391
  const hazardousAqi = calculateUsAqiFromPm25(350);
  assert.ok(hazardousAqi >= 380 && hazardousAqi <= 410);

  // Beyond scale: 600 ug/m3 caps at 500
  assert.equal(calculateUsAqiFromPm25(600), 500);
});

test('Boundary Layer Thermal Inversion: correctly identifies diurnal convective windows', () => {
  // 04:00 AM with shallow 110m PBL -> SEVERE_TRAP
  assert.equal(evaluateInversionState(4, 110), 'SEVERE_TRAP');

  // 13:30 PM (Midday Solar Heating) -> SOLAR_MIXING_WINDOW
  assert.equal(evaluateInversionState(13, 850), 'SOLAR_MIXING_WINDOW');

  // 21:00 PM (Dusk cooling) with 140m PBL -> SEVERE_TRAP
  assert.equal(evaluateInversionState(21, 140), 'SEVERE_TRAP');
});
