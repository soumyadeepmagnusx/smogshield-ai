import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * SmogShield AI — Corsi-Rosenthal Fluid Dynamics & Air Changes per Hour (ACH) Tests
 */

function computeCorsiRosenthalCfm(filterCount, fanSpeed = 'MEDIUM') {
  const rawFanCfm = 650;
  const speedMult = fanSpeed === 'HIGH' ? 1.0 : fanSpeed === 'MEDIUM' ? 0.82 : 0.62;
  const filterEff = 0.85; // MERV 13

  let surfaceAreaFactor = 0.88;
  if (filterCount === 1) surfaceAreaFactor = 0.55;
  if (filterCount === 2) surfaceAreaFactor = 0.74;

  return Math.round(rawFanCfm * speedMult * surfaceAreaFactor * filterEff);
}

function computeAch(cadrCfm, roomLengthM, roomWidthM, roomHeightM) {
  const cadrM3H = cadrCfm * 1.699;
  const roomVolumeM3 = roomLengthM * roomWidthM * roomHeightM;
  return Number((cadrM3H / roomVolumeM3).toFixed(1));
}

test('Corsi-Rosenthal Physics: 4-filter cube reduces backpressure compared to single-filter', () => {
  const singleFilterCfm = computeCorsiRosenthalCfm(1, 'HIGH'); // ~304 CFM
  const fourFilterCubeCfm = computeCorsiRosenthalCfm(4, 'HIGH'); // ~486 CFM

  assert.ok(fourFilterCubeCfm > singleFilterCfm);
  assert.ok(fourFilterCubeCfm >= 450);
});

test('Room Air Changes per Hour (ACH): verifies adequacy against CDC 5.0 ACH standard', () => {
  const cadrCfm = 430; // Medium speed 4-filter cube
  // Typical bedroom: 4m x 3.5m x 2.7m = 37.8 m3
  const bedroomAch = computeAch(cadrCfm, 4.0, 3.5, 2.7);
  assert.ok(bedroomAch >= 15.0); // Extreme high clearance (~19.3 ACH)

  // Large family living room: 6m x 5m x 3m = 90 m3
  const livingRoomAch = computeAch(cadrCfm, 6.0, 5.0, 3.0);
  assert.ok(livingRoomAch >= 5.0); // Meets CDC >= 5.0 ACH requirement (8.1 ACH)
});
