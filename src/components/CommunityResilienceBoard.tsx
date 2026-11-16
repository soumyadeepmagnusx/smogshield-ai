import React, { useState } from 'react';
import {
  Users,
  Radio,
  FileCode,
  AlertTriangle,
  MapPin,
  Car,
  Home,
  Copy,
  Check,
  Download,
  PlusCircle,
  X,
  Send,
} from 'lucide-react';
import { CommunityAlert, CityPreset, AirPollutantMetrics } from '../types';
import { generateOasisCapXml } from '../utils/oasisCapExport';

interface CommunityResilienceBoardProps {
  city: CityPreset;
  pollutants: AirPollutantMetrics;
}

export const CommunityResilienceBoard: React.FC<CommunityResilienceBoardProps> = ({
  city,
  pollutants,
}) => {
  const [alerts, setAlerts] = useState<CommunityAlert[]>([
    {
      id: 'alert-1',
      timestamp: '15 mins ago',
      neighborhood: 'North Sector Commercial District',
      type: 'OPEN_BURNING_REPORT',
      severity: 'EMERGENCY',
      description: 'Reported municipal trash and biomass burning near the highway flyover. Thick toxic plume settling into residential apartments.',
      affectedRadiusKm: 2.5,
      reportedBy: 'EcoWatch Volunteer #42',
      status: 'VERIFIED',
      actionsSuggested: [
        'Residents within 2.5km seal windows immediately',
        'Turn air purifiers to maximum speed',
        'Civic enforcement dispatch ticket #4928 generated',
      ],
    },
    {
      id: 'alert-2',
      timestamp: '1 hour ago',
      neighborhood: 'Central Public Library & Civic Hall',
      type: 'CLEAN_AIR_SANCTUARY_OPEN',
      severity: 'INFO',
      description: 'Community Clean Air Sanctuary active with 6x high-volume Corsi-Rosenthal boxes. Indoor AQI maintained at 24 (Good). Free public access.',
      affectedRadiusKm: 5.0,
      reportedBy: 'Municipal Resilience Officer',
      status: 'ACTIVE',
      actionsSuggested: [
        'Vulnerable community members (elderly, asthma) welcome for daytime respite',
        'Free N95 mask distribution at front desk',
      ],
    },
    {
      id: 'alert-3',
      timestamp: '2 hours ago',
      neighborhood: 'Westside Primary School Cluster',
      type: 'CARPOOL_CLUSTER_ACTIVE',
      severity: 'INFO',
      description: '4-Family Electric School Carpool Pod deployed. Eliminated 16 individual vehicle idling trips at the morning school gate.',
      affectedRadiusKm: 3.0,
      reportedBy: 'Parent Clean Air Association',
      status: 'ACTIVE',
      actionsSuggested: [
        'Morning drop-off idling cut by 78%',
        'Schoolyard PM2.5 reduced by 45 µg/m³ during morning bell',
      ],
    },
  ]);

  const [selectedAlertForXml, setSelectedAlertForXml] = useState<CommunityAlert | null>(null);
  const [copiedXml, setCopiedXml] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // New report form state
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newSeverity, setNewSeverity] = useState<'EMERGENCY' | 'WARNING' | 'INFO'>('EMERGENCY');

  const handleCopyXml = (xml: string) => {
    navigator.clipboard.writeText(xml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleDownloadXml = (alert: CommunityAlert) => {
    const xml = generateOasisCapXml(alert, city, pollutants);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CAP-SmogAlert-${alert.id}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNeighborhood.trim() || !newDescription.trim()) return;

    const newAlert: CommunityAlert = {
      id: `alert-${Date.now()}`,
      timestamp: 'Just now',
      neighborhood: newNeighborhood.trim(),
      type: 'OPEN_BURNING_REPORT',
      severity: newSeverity,
      description: newDescription.trim(),
      affectedRadiusKm: 2.0,
      reportedBy: 'Community Citizen Sentinel',
      status: 'ACTIVE',
      actionsSuggested: [
        'Nearby households seal all window perimeter sashes',
        'Civic dispatch alert generated via OASIS CAP v1.2 XML',
      ],
    };

    setAlerts([newAlert, ...alerts]);
    setIsReportModalOpen(false);
    setNewNeighborhood('');
    setNewDescription('');
  };

  return (
    <section
      className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="community-heading"
    >
      {/* Header & Report Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h2 id="community-heading" className="text-lg font-bold text-white tracking-tight">
              Community Resilience & Hyperlocal Action Board
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Crowdsourced clean air sanctuaries, school carpool pods, and anti-burning dispatch networks in {city.name}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40 transition-all focus-visible:ring-2 focus-visible:ring-rose-400 focus:outline-none"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          <span>Report Toxic Smoke / Burning</span>
        </button>
      </div>

      {/* Community Resilience Collective Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Clean Air Hubs</span>
            <span className="text-base font-bold text-white font-mono">14 Public Sanctuaries</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active School Carpool Pods</span>
            <span className="text-base font-bold text-white font-mono">38 Coordinated Pods</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">OASIS CAP v1.2 Protocol</span>
            <span className="text-base font-bold text-white font-mono">100% Interoperable</span>
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border transition-all ${
              alert.severity === 'EMERGENCY'
                ? 'bg-rose-950/20 border-rose-900/50 hover:border-rose-700/60'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                    alert.severity === 'EMERGENCY'
                      ? 'bg-rose-950 text-rose-300 border border-rose-600/60'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-600/60'
                  }`}
                >
                  {alert.severity}
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {alert.neighborhood}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                <span>{alert.timestamp}</span>
                <span className="text-emerald-400 font-semibold">• {alert.status}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{alert.description}</p>

            {/* Actions Suggested */}
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <span className="font-semibold text-slate-300">Action Directives:</span>{' '}
                {alert.actionsSuggested.join(' | ')}
              </div>

              {/* OASIS CAP XML Action */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedAlertForXml(alert)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono flex items-center space-x-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect CAP v1.2 XML</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadXml(alert)}
                  className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                  title="Download OASIS CAP v1.2 XML file"
                  aria-label="Download CAP XML"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* OASIS CAP XML Inspection Modal */}
      {selectedAlertForXml && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cap-xml-title"
        >
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                <h3 id="cap-xml-title" className="text-sm font-bold text-white">
                  OASIS Common Alerting Protocol (CAP v1.2) XML Dispatch
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAlertForXml(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Standard emergency broadcast XML schema ingested by municipal civil defense, weather portals, and IoT smart signs.
            </p>

            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-80 leading-relaxed">
              {generateOasisCapXml(selectedAlertForXml, city, pollutants)}
            </pre>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  handleCopyXml(generateOasisCapXml(selectedAlertForXml, city, pollutants))
                }
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                {copiedXml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedXml ? 'Copied XML!' : 'Copy to Clipboard'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadXml(selectedAlertForXml)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download .xml</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Open Burning / Incident Modal */}
      {isReportModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
        >
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-rose-400">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                <h3 id="report-modal-title" className="text-sm font-bold text-white">
                  Report Waste Burning or Toxic Plume
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Neighborhood / Location:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South Outer Ring Road Sector 4"
                  value={newNeighborhood}
                  onChange={(e) => setNewNeighborhood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Incident Description & Source:
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Municipal dry leaf & plastic burning causing visible dense white smoke; blowing into nearby school playground."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Severity Level:</label>
                <select
                  value={newSeverity}
                  onChange={(e) =>
                    setNewSeverity(e.target.value as 'EMERGENCY' | 'WARNING' | 'INFO')
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:border-rose-500 focus:outline-none"
                >
                  <option value="EMERGENCY">Emergency (Active Dense Smoke / Immediate Risk)</option>
                  <option value="WARNING">Warning (Localized Smoldering)</option>
                  <option value="INFO">Info (Sanctuary / Carpool Update)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center space-x-1.5 shadow-lg shadow-rose-950/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Report & Generate CAP XML</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
