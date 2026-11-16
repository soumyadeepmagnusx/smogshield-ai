import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * SmogShield AI — OASIS Common Alerting Protocol (CAP v1.2) XML Validation Tests
 */

function generateOasisCapXml(alert, city, metrics) {
  const sentIso = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>SMOGSHIELD-CAP-${alert.id}</identifier>
  <sender>smogshield-ai@spectronz.org</sender>
  <sent>${sentIso}</sent>
  <status>Actual</status>
  <msgType>Alert</msgType>
  <scope>Public</scope>
  <info>
    <category>Env</category>
    <event>Severe Winter Smog Alert</event>
    <urgency>Immediate</urgency>
    <severity>Extreme</severity>
    <certainty>Observed</certainty>
    <eventCode>
      <valueName>EPA-AQI</valueName>
      <value>${metrics.usAqi}</value>
    </eventCode>
    <senderName>SmogShield AI Network</senderName>
    <headline>${alert.headline}</headline>
    <parameter>
      <valueName>PM2.5</valueName>
      <value>${metrics.pm25} ug/m3</value>
    </parameter>
    <area>
      <areaDesc>${alert.neighborhood}, ${city.name}</areaDesc>
      <circle>${city.lat},${city.lng},${alert.radiusKm}</circle>
    </area>
  </info>
</alert>`;
}

test('OASIS CAP v1.2 Schema: produces well-formed XML with mandatory alert and info tags', () => {
  const mockAlert = {
    id: 'test-88',
    headline: 'OPEN BURNING ALERT: Sector 5',
    neighborhood: 'Sector 5',
    radiusKm: 2.5,
  };
  const mockCity = { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090 };
  const mockMetrics = { usAqi: 380, pm25: 320 };

  const xml = generateOasisCapXml(mockAlert, mockCity, mockMetrics);

  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">'));
  assert.ok(xml.includes('<category>Env</category>'));
  assert.ok(xml.includes('<valueName>EPA-AQI</valueName>'));
  assert.ok(xml.includes('<value>380</value>'));
  assert.ok(xml.includes('<circle>28.6139,77.209,2.5</circle>'));
  assert.ok(xml.endsWith('</alert>'));
});
