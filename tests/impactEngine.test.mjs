import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * SmogShield AI — Direct Impact, Berkeley Earth & Minute Ventilation Tests
 */

const BERKELEY_EARTH_FACTOR = 528; // 22 ug/m3 * 24h = 528 ug-hours

function calculateBerkeleyCigarettes(avoidedInhaledUg) {
  return Number((avoidedInhaledUg / BERKELEY_EARTH_FACTOR).toFixed(2));
}

function computeInhaledDose(concentration, ventilationRate, durationHours) {
  return concentration * ventilationRate * durationHours;
}

test('Berkeley Earth Model: correctly translates avoided microgram-hours to cigarette equivalents', () => {
  // 528 ug avoided = exactly 1.0 cigarette spared
  assert.equal(calculateBerkeleyCigarettes(528), 1.0);

  // Severe smog day: 5,280 ug avoided = 10.0 cigarettes spared
  assert.equal(calculateBerkeleyCigarettes(5280), 10.0);

  // Moderate routine shift: 1,056 ug avoided = 2.0 cigarettes spared
  assert.equal(calculateBerkeleyCigarettes(1056), 2.0);
});

test('Minute Ventilation Physics: aerobic outdoor exercise deposits 5x higher particulate dose than resting', () => {
  const pm25 = 200; // ug/m3
  const restDose = computeInhaledDose(pm25, 0.5, 1.0);      // 100 ug
  const runningDose = computeInhaledDose(pm25, 2.5, 1.0);   // 500 ug

  assert.equal(restDose, 100);
  assert.equal(runningDose, 500);
  assert.equal(runningDose / restDose, 5.0);

  // Shifting a 1-hour workout from outdoors (200 ug/m3) to an indoor filtered room (25 ug/m3)
  const indoorWorkoutDose = computeInhaledDose(25, 2.5, 1.0); // 62.5 ug
  const doseAvoided = runningDose - indoorWorkoutDose;        // 437.5 ug
  assert.ok(doseAvoided > 430);
});
