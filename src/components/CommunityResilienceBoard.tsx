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
      className="w-full rounded-3xl glass-panel p-6 sm:p-8 space-y-8"
      aria-labelledby="community-heading"
    >
      {/* Header & Report Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-purple-950/50">
              <Users className="w-5 h-5 text-slate-950" aria-hidden="true" />
            </div>
            <h2 id="community-heading" className="text-xl font-extrabold text-white tracking-tight">
              Community Resilience & Hyperlocal Action Board
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Crowdsourced clean air sanctuaries, school carpool pods, and anti-burning dispatch networks in {city.name}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-black shadow-lg shadow-rose-950/50 transition-all focus-visible:ring-2 focus-visible:ring-rose-400 focus:outline-none"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          <span>Report Toxic Smoke / Burning</span>
        </button>
      </div>

      {/* Community Resilience Collective Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-panel flex items-center space-x-3.5 glass-card-interactive border border-emerald-500/20">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-md">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Clean Air Hubs</span>
            <span className="text-lg font-black text-white font-mono">14 Public Sanctuaries</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel flex items-center space-x-3.5 glass-card-interactive border border-cyan-500/20">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 shadow-md">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Active School Carpool Pods</span>
            <span className="text-lg font-black text-white font-mono">38 Coordinated Pods</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel flex items-center space-x-3.5 glass-card-interactive border border-purple-500/20">
          <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 shadow-md">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">OASIS CAP v1.2 Protocol</span>
            <span className="text-lg font-black text-white font-mono">100% Interoperable</span>
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-2xl border transition-all duration-200 glass-card-interactive ${
              alert.severity === 'EMERGENCY'
                ? 'bg-rose-950/25 border-rose-900/60 shadow-xl shadow-rose-950/20'
                : 'glass-panel hover:border-white/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase font-mono ${
                    alert.severity === 'EMERGENCY'
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/80 shadow-sm'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-500/80 shadow-sm'
                  }`}
                >
                  {alert.severity}
                </span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {alert.neighborhood}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span>{alert.timestamp}</span>
                <span className="text-emerald-400 font-bold">• {alert.status}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">{alert.description}</p>

            {/* Actions Suggested */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <span className="font-bold text-slate-200">Action Directives:</span>{' '}
                {alert.actionsSuggested.join(' | ')}
              </div>

              {/* OASIS CAP XML Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedAlertForXml(alert)}
                  className="px-3 py-1.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect CAP v1.2 XML</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadXml(alert)}
                  className="p-1.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                  title="Download OASIS CAP v1.2 XML file"
                  aria-label="Download CAP XML"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* OASIS CAP XML Inspection Modal */}
      {selectedAlertForXml && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cap-xml-title"
        >
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
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

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-80 leading-relaxed shadow-inner">
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
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-lg shadow-emerald-950/40"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
        >
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-rose-400 font-bold">
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

            <form onSubmit={handleCreateReport} className="space-y-3.5 text-xs">
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Severity Level:</label>
                <select
                  value={newSeverity}
                  onChange={(e) =>
                    setNewSeverity(e.target.value as 'EMERGENCY' | 'WARNING' | 'INFO')
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-rose-500 focus:outline-none"
                >
                  <option value="EMERGENCY">Emergency (Active Dense Smoke / Immediate Risk)</option>
                  <option value="WARNING">Warning (Localized Smoldering)</option>
                  <option value="INFO">Info (Sanctuary / Carpool Update)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold flex items-center space-x-1.5 shadow-lg shadow-rose-950/40"
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
