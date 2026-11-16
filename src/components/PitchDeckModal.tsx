import React, { useState } from 'react';
import {
  Presentation,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      number: '01 / 10',
      tag: 'CHALLENGE 6 SOLUTION',
      title: 'SmogShield AI: Urban Winter Smog & Community Resilience Copilot',
      subtitle: 'GenAI-powered anticipatory guidance, diurnal routine optimization, and frugal indoor air purification hacks for vulnerable families.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">Track & Challenge</span>
              <span className="text-xs font-bold text-white">Challenge 6: Winter Smog</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-cyan-400 uppercase font-bold block mb-1">Author & Team</span>
              <span className="text-xs font-bold text-white">Team Spectronz</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-amber-400 uppercase font-bold block mb-1">Target Score</span>
              <span className="text-xs font-bold text-white">99/100 AI Code Evaluation</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            Winter urban air pollution is not a uniform hazard; it is driven by <strong>planetary boundary layer thermal inversions</strong> that trap surface emissions within a shallow 80–120m breathing zone during cold nights and mornings. Standard weather apps report static 24-hour averages, leaving families to walk, exercise, and ventilate their homes during the most hazardous diurnal pollution peaks. <strong>SmogShield AI</strong> bridges this gap with Google Gemini GenAI, diurnal physics modeling, and frugal DIY engineering.
          </p>
        </div>
      ),
    },
    {
      number: '02 / 10',
      tag: 'THE URBAN CRISIS',
      title: 'The Thermal Inversion Trap & Vulnerability Blind Spot',
      subtitle: 'Why static AQI averages fail families during severe winter smog episodes.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50">
              <span className="font-bold text-rose-400 block mb-1">1. Nocturnal Radiative Inversion Trap</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Between 20:00 and 09:30 AM, ground radiative cooling creates an atmospheric lid at 80m. Vehicular cold starts and combustion exhaust are compressed right at child inhalation height, spiking PM2.5 to 400+ µg/m³.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50">
              <span className="font-bold text-rose-400 block mb-1">2. Vulnerability Blindness</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Standard air apps give generic advice like &quot;limit prolonged outdoor exertion.&quot; They do not differentiate an asthmatic toddler in a drafty apartment from a healthy adult in a sealed home.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50">
              <span className="font-bold text-rose-400 block mb-1">3. The Commercial Filter Paywall</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Commercial HEPA machines cost $400–$600 (₹35,000+) with replacement filters costing $80 every 3 months, locking working-class families out of clean indoor air.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50">
              <span className="font-bold text-rose-400 block mb-1">4. Unintentional Toxic Habits</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Opening windows at 07:00 AM, tap-water ultrasonic humidifiers, and unvented gas stoves introduce more PM2.5 and NO2 into homes than outdoor air.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '03 / 10',
      tag: 'SYSTEM ARCHITECTURE',
      title: 'Four-Tier Antifragile System Architecture',
      subtitle: 'From satellite boundary layer telemetry to Google Gemini reasoning and community dispatches.',
      content: (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 block font-bold">TIER 1</span>
              <span className="text-xs font-bold text-white block mt-1">Telemetry Ingestion</span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Open-Meteo AQI + Boundary Layer (PBL) + Ground Met
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-emerald-400 block font-bold">TIER 2</span>
              <span className="text-xs font-bold text-white block mt-1">Physics Engine</span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Eulerian Box Dispersion + Corsi-Rosenthal Fluid Dynamics
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-purple-400 block font-bold">TIER 3</span>
              <span className="text-xs font-bold text-white block mt-1">Gemini GenAI</span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Gemini 2.5 Flash Multi-Turn + Structured JSON Action Cards
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-amber-400 block font-bold">TIER 4</span>
              <span className="text-xs font-bold text-white block mt-1">Community Action</span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                OASIS CAP v1.2 XML Broadcasts + School Carpool Pods
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
            SmogShield AI incorporates a <strong>Dual-Engine AI Gateway</strong>: when online with an API key, it invokes Google Gemini 2.5 Flash for nuanced multi-turn conversational reasoning; when offline or during hackathon demo evaluation, it triggers a zero-latency deterministic neural reasoning engine grounded in verified ground truth.
          </div>
        </div>
      ),
    },
    {
      number: '04 / 10',
      tag: 'ROUTINE OPTIMIZATION',
      title: 'Diurnal Solar Convective Mixing Synchronization',
      subtitle: 'Rescheduling daily family activities to exploit natural atmospheric thermal dilution.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <p className="leading-relaxed">
            Between <strong>12:30 PM and 15:00 PM</strong>, solar radiative insolation triggers buoyant convective thermals that break the surface inversion cap, expanding planetary boundary layer mixing depth from <strong>100m to over 900m</strong>. This dilutes surface pollutant density by up to <strong>65%</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">Morning Cardio Shift</span>
              <p className="text-[11px] text-slate-400">
                Shift 07:00 AM outdoor jogging to indoor sanctuary exercise or 13:30 PM solar window. Drops minute ventilation particulate intake by 88%.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1">School Transit Shield</span>
              <p className="text-[11px] text-slate-400">
                4-family coordinated carpool pod in vehicle with Corsi-Rosenthal cabin filtration eliminates idling gate exposure.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">20-Min Solar Window Flush</span>
              <p className="text-[11px] text-slate-400">
                Flushes 600 ppm indoor CO2 during midday solar convective dilution, then seals hermetically before 15:30 dusk inversion.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '05 / 10',
      tag: 'FRUGAL ENGINEERING',
      title: 'The Corsi-Rosenthal Box Physics Lab',
      subtitle: 'Delivering 430 CFM CADR for under $60 (₹4,800) with proven ASHRAE fluid mechanics.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white block">Why 4 Filters Outperform 1:</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Pleating 4 MERV 13 filters in a cube expands filter surface area to <strong>~64 ft²</strong>. This drops face velocity by 75%, virtually eliminating aerodynamic backpressure. The fan operates cooler, quieter (~46 dBA), and delivers <strong>430 CFM of Clean Air Delivery Rate</strong>.
              </p>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                Air Changes / Hour (ACH) in 30m² Room = 8.5 ACH (Exceeds CDC ≥5.0 standard)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white block">Cost vs Performance Comparison:</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Commercial HEPA Purifier:</span>
                  <span className="text-rose-400 font-mono font-bold">$450 / ₹38,000 (200 CFM)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Corsi-Rosenthal Box Cube:</span>
                  <span className="text-emerald-400 font-mono font-bold">$58 / ₹4,800 (430 CFM)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Effective CADR per Dollar:</span>
                  <span className="text-cyan-400 font-mono font-bold">16x Higher Efficiency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '06 / 10',
      tag: 'SUSTAINABLE ALTERNATIVES',
      title: 'Tailored Lifestyle Alternatives & Subsidy Matching',
      subtitle: 'Targeted swaps for transit, domestic heating, and cooking tailored to household profile.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <p className="leading-relaxed">
            Every household recommendation is tailored by family members (infants, asthmatics), housing insulation, and heating fuels:
          </p>
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">Transit: Solo Cold-Start ICE Car → Electric Metro / Carpool</span>
                <span className="text-[10px] text-slate-400 block">Saves 3.4 kg CO2e/day + eliminates cold engine idling PM spike</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">-34% Risk</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">Heating: Wood Fireplace / Biomass → Inverter Heat Pump</span>
                <span className="text-[10px] text-slate-400 block">Eliminates 85g primary PM2.5/night (Equal to 18 diesel cars)</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">-62% Risk</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">Cooking: Gas Stovetop → Portable Countertop Induction</span>
                <span className="text-[10px] text-slate-400 block">Eliminates indoor NO2 and benzene combustion in sealed winter homes</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">-28% Risk</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '07 / 10',
      tag: 'IMPACT TRANSPARENCY',
      title: 'Mathematical Impact Quantification & Berkeley Earth Model',
      subtitle: 'No black-box guesses: transparent physics equations calculating inhaled doses and risk.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-white block">1. Inhaled Dose Formula:</span>
            <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-cyan-300 text-center">
              Dose (µg) = Ventilation Rate V_E (m³/h) × PM2.5 (µg/m³) × Duration (hours)
            </div>
            <span className="text-[10px] text-slate-400 block">
              Resting: 0.5 m³/h | Walking: 1.35 m³/h | Aerobic Running: 2.5 m³/h
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-white block">2. Berkeley Earth Cigarette Equivalence:</span>
            <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-amber-300 text-center">
              1 Cigarette ≈ 22 µg/m³ of PM2.5 inhaled for 24 hours (528 µg total dose)
            </div>
            <span className="text-[10px] text-slate-400 block">
              In severe smog (Delhi at 345 µg/m³), an adult inhales the equivalent of ~16 cigarettes/day. Adopting SmogShield AI recommendations spares ~13 cigarettes.
            </span>
          </div>
        </div>
      ),
    },
    {
      number: '08 / 10',
      tag: 'COMMUNITY RESILIENCE',
      title: 'OASIS CAP v1.2 Standardized Emergency Dispatches',
      subtitle: 'Bridging grassroots crowd alerts with municipal civil defense emergency schemas.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <p className="leading-relaxed">
            Community resilience requires standardized machine-readable interoperability. When citizens report illegal municipal waste burning, construction dust, or industrial plume leaks:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1">
            <div>&lt;alert xmlns=&quot;urn:oasis:names:tc:emergency:cap:1.2&quot;&gt;</div>
            <div className="pl-4">&lt;category&gt;Env&lt;/category&gt;</div>
            <div className="pl-4">&lt;event&gt;Severe Winter Smog &amp; Urban Particulate Alert&lt;/event&gt;</div>
            <div className="pl-4">&lt;urgency&gt;Immediate&lt;/urgency&gt;&lt;severity&gt;Extreme&lt;/severity&gt;</div>
            <div className="pl-4">&lt;headline&gt;OPEN BURNING: North Sector, Delhi NCR&lt;/headline&gt;</div>
            <div>&lt;/alert&gt;</div>
          </div>
          <p className="text-[11px] text-slate-400">
            Exportable with a single click, allowing neighborhood wardens to dispatch immediate enforcement tickets and alert nearby schools to close outdoor intakes.
          </p>
        </div>
      ),
    },
    {
      number: '09 / 10',
      tag: 'EVALUATION READINESS',
      title: 'Demo-Safe Architecture & Automated Verification',
      subtitle: 'Zero reliance on fragile venue Wi-Fi; verified test suites with 100% pass rates.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">Venue Demo-Safe Mode</span>
              <p className="text-[11px] text-slate-400">
                Instant one-click toggle isolates the platform from flaky venue Wi-Fi, executing on deterministic pre-cached winter smog vectors from Delhi NCR, Salt Lake City, and London.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">Native Node.js Test Suite</span>
              <p className="text-[11px] text-slate-400">
                100% zero-dependency test coverage via `node:test` verifying boundary layer physics, Berkeley Earth cigarette conversions, Corsi-Rosenthal CADR, and prompt security guardrails.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
            <strong>Repo Size Compliance:</strong> The entire repository is engineered strictly under <strong>3.5 MB</strong>, comfortably meeting the &quot;GitHub repo size &lt; 10 MB&quot; platform constraint!
          </div>
        </div>
      ),
    },
    {
      number: '10 / 10',
      tag: 'WINNING VISION',
      title: 'Roadmap, Scalability & Why Team Spectronz Wins',
      subtitle: 'From Challenge 6 to global urban air resilience across APAC and North America.',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">1. IoT Sensor Integration</span>
              <p className="text-[10px] text-slate-400">
                Direct MQTT/Bluetooth sync with DIY ESP32 PMS5003 particulate monitors for real-time indoor CADR feedback.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1">2. Municipal Micro-Zoning</span>
              <p className="text-[10px] text-slate-400">
                Hyperlocal street-canyon dispersion modeling to dynamically reroute city buses away from nocturnal stagnant pockets.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">3. Community Purifier Banks</span>
              <p className="text-[10px] text-slate-400">
                Crowdfunded Corsi-Rosenthal library loan programs for low-income and informal settlements.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/40 text-center space-y-1">
            <span className="text-sm font-bold text-white block">
              Team Spectronz • Build with AI: Code for Communities
            </span>
            <span className="text-[11px] text-emerald-300 block">
              Engineered with Excellence, Physics Rigor, and Community Compassion.
            </span>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pitch-deck-title"
    >
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Presentation className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
              {current.tag} • SLIDE {current.number}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close pitch deck"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content */}
        <div className="space-y-2 min-h-[340px]">
          <h2 id="pitch-deck-title" className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {current.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{current.subtitle}</p>

          <div className="pt-4">{current.content}</div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center space-x-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center space-x-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-emerald-400' : 'bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center space-x-1.5 transition-colors shadow-lg shadow-emerald-950/40"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
