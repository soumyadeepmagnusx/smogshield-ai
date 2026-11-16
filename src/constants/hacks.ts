import { IndoorHack } from '../types';

export const INDOOR_HACKS: IndoorHack[] = [
  {
    id: 'corsi-rosenthal-box',
    title: 'The Corsi-Rosenthal Box (4-Filter High CADR Cube)',
    tagline: 'Outperforms $500 commercial HEPA purifiers for less than $60.',
    category: 'DIY_PURIFIER',
    difficulty: 'BEGINNER',
    estimatedCostUsd: 58,
    estimatedCostInr: 4800,
    estimatedBuildTimeMinutes: 25,
    particulateReductionEfficiencyPct: 88,
    materials: [
      '1x 20" standard box fan (3-speed)',
      '4x 20"x20"x2" MERV 13 pleated furnace filters',
      '1x Cardboard bottom shroud (cut from filter box)',
      '1x Duct tape or painter tape (2" width)',
      '1x Cardboard circular fan shroud template',
    ],
    steps: [
      'Arrange the 4 MERV 13 filters in a cube with all airflow direction arrows pointing inward toward the center.',
      'Tape all 4 vertical corner seams securely with duct tape to form an airtight filter perimeter.',
      'Cut a square cardboard base from the packaging and tape it firmly to seal the bottom of the cube.',
      'Place the 20" box fan on top of the cube with airflow exhausting upward into the room.',
      'Cut a circular cardboard donut shroud (15" inner diameter) and tape it to the front face of the fan to prevent aerodynamic blade-tip back-flow leakage.',
      'Seal the junction between the fan housing and filter cube with double-layered tape. Plug in and run on medium/high.',
    ],
    scientificMechanism: 'Pleating 4 MERV 13 filters expands total filter media surface area to ~64 square feet, drastically lowering face velocity and aerodynamic backpressure. This allows the fan to deliver ~430 CFM of Clean Air Delivery Rate (CADR) with 85%+ single-pass capture of PM2.5 and aerosolized winter combustion particulates.',
    dosAndDonts: {
      do: [
        'Ensure filter arrows point inward toward the fan intake cavity.',
        'Install the circular cardboard shroud over the front face of the box fan to increase air output by 25%.',
        'Replace filters every 5-6 months during severe winter smog episodes.',
      ],
      dont: [
        'Do not use fiberglass MERV 8 filters; they only catch dust and fail on fine PM2.5.',
        'Do not block the 4 intake sides; keep at least 6 inches clearance from walls.',
      ],
    },
  },
  {
    id: 'diurnal-solar-window-flush',
    title: 'Diurnal Solar Window Aeration Protocol',
    tagline: 'Flush indoor CO2 without letting toxic nocturnal smog into your home.',
    category: 'VENTILATION_TIMING',
    difficulty: 'BEGINNER',
    estimatedCostUsd: 0,
    estimatedCostInr: 0,
    estimatedBuildTimeMinutes: 5,
    particulateReductionEfficiencyPct: 65,
    materials: [
      'SmogShield AI Live Inversion Window Tracker',
      'Two opposite-facing windows for cross-ventilation',
      'Timer or smartphone alarm',
    ],
    steps: [
      'Keep all exterior windows and vents hermetically sealed from 18:00 (dusk) through 11:30 (morning) during the nocturnal inversion trap.',
      'Check SmogShield AI for the daily solar convective window (typically 12:30 PM - 2:30 PM) when ground heating breaks the boundary inversion cap.',
      'At peak solar insolation, open two opposing windows across the house for exactly 20-30 minutes to generate cross-flow air displacement.',
      'Turn off all indoor air purifiers during the 25-minute aeration flush.',
      'Hermetically seal all windows shut at 15:00 before the evening temperature inversion begins settling back down.',
      'Turn indoor purifiers to maximum speed for 15 minutes immediately following the window closure.',
    ],
    scientificMechanism: 'Nocturnal radiative cooling compresses the planetary boundary layer down to 80-120 meters, concentrating surface particulate emissions. Between 12:30 and 15:00, solar radiation induces vertical convective thermals that lift the mixing height up to 800-1200m, dispersing surface smog by up to 8x. Aerating during this window flushes accumulated indoor CO2, VOCs, and moisture while minimizing PM2.5 entry.',
    dosAndDonts: {
      do: [
        'Check live boundary layer mixing height before opening windows.',
        'Use rapid cross-ventilation for 20 minutes rather than leaving a single window cracked open all day.',
      ],
      dont: [
        'Never open windows between 06:00 and 10:00 AM; morning rush-hour smog combined with cold nocturnal inversion produces the day\'s highest toxic particulate peak.',
      ],
    },
  },
  {
    id: 'clean-air-sanctuary-room',
    title: 'Clean-Air Bedroom Sanctuary Isolation',
    tagline: 'Create an ultra-pure breathing safe zone where your family sleeps.',
    category: 'SANCTUARY_ROOM',
    difficulty: 'INTERMEDIATE',
    estimatedCostUsd: 14,
    estimatedCostInr: 1150,
    estimatedBuildTimeMinutes: 30,
    particulateReductionEfficiencyPct: 92,
    materials: [
      'Removable weatherstripping foam tape (V-seal or silicone strip)',
      '1x Wet rolled cotton towel or silicone draft stopper for door threshold',
      'Blue painter\'s tape for window perimeter gaps',
      '1x Dedicated air purifier (Corsi-Rosenthal Box or HEPA)',
    ],
    steps: [
      'Select the bedroom where vulnerable members (infants, asthmatics, elderly) sleep as the designated Clean-Air Sanctuary.',
      'Apply weatherstripping foam tape along the perimeter of the bedroom window sashes to seal micro-infiltration air gaps.',
      'Tape over exterior electrical outlet faceplates and AC wall sleeve conduits using removable painter\'s tape.',
      'Place a damp rolled cotton towel across the bottom crack of the bedroom entry door to block hallway particulate back-drafts.',
      'Operate the bedroom air purifier continuously on low/medium to establish slight positive pressure relative to exterior walls.',
      'Enforce a strict "doors-closed" rule at all times during sleeping hours.',
    ],
    scientificMechanism: 'During sleep, breathing minute volume is steady (~0.42 m3/h) for 7-9 continuous hours. Standard unsealed residential rooms suffer an air infiltration rate of 0.5-1.5 air changes per hour from outdoor smog. Creating a sealed sanctuary bedroom with dedicated filtration reduces overnight inhaled particulate dose by over 90%, preventing nocturnal asthma flares.',
    dosAndDonts: {
      do: [
        'Keep the bedroom door closed at all times.',
        'Wash bedding weekly in hot water to eliminate settled fine particulate matter.',
      ],
      dont: [
        'Do not burn scented candles, incense, or use mosquito coils in the sanctuary bedroom; combustion products counteract all filtration.',
      ],
    },
  },
  {
    id: 'culinary-emission-suppression',
    title: 'Culinary Emission & Indoor Combustion Controls',
    tagline: 'Prevent cooking from generating higher PM2.5 levels than the outdoor smog.',
    category: 'EMISSION_SOURCE_CONTROL',
    difficulty: 'BEGINNER',
    estimatedCostUsd: 0,
    estimatedCostInr: 0,
    estimatedBuildTimeMinutes: 5,
    particulateReductionEfficiencyPct: 75,
    materials: [
      'Exhaust range hood or portable kitchen box fan',
      'Cooking pot lids / splash guards',
      'Shift to steaming, braising, or induction boiling',
    ],
    steps: [
      'Turn on the kitchen exhaust hood 3 minutes BEFORE turning on any stovetop burner to establish an upward convective airflow draft.',
      'Cook exclusively on the back burners directly beneath the exhaust hood canopy to maximize particulate capture efficiency from 35% to 85%.',
      'Cover all pans with tight-fitting lids when frying or sautéing to trap aerosolized fatty acid droplets and oil vapors.',
      'Keep kitchen doors closed to isolate culinary aerosols from living rooms and sleeping zones.',
      'Leave the range hood exhaust running for 10 minutes AFTER cooking is completed.',
    ],
    scientificMechanism: 'High-temperature oil frying and stir-frying can generate peak indoor PM2.5 concentrations exceeding 600 ug/m3, along with acrolein and polycyclic aromatic hydrocarbons (PAHs). Cooking on back burners maximizes the capture velocity of kitchen hoods and prevents culinary plumes from spreading into residential living quarters.',
    dosAndDonts: {
      do: [
        'Use back burners instead of front burners under the hood.',
        'Substitute deep frying with steaming, boiling, or pressure cooking during red-alert smog days.',
      ],
      dont: [
        'Never fry or sear food with an unvented recirculating kitchen hood without a clean activated charcoal filter.',
      ],
    },
  },
  {
    id: 'ultrasonic-humidifier-purity-hack',
    title: 'Humidifier Mineral Aerosol Prevention',
    tagline: 'Stop your winter humidifier from generating artificial indoor PM2.5.',
    category: 'EMISSION_SOURCE_CONTROL',
    difficulty: 'BEGINNER',
    estimatedCostUsd: 6,
    estimatedCostInr: 450,
    estimatedBuildTimeMinutes: 5,
    particulateReductionEfficiencyPct: 95,
    materials: [
      'Distilled or demineralized water (or reverse osmosis RO water with TDS < 10 ppm)',
      'Or switch to an evaporative wick humidifier',
    ],
    steps: [
      'Check your humidifier type: if it creates a cool visible white mist, it is an ultrasonic nebulizer.',
      'Never fill ultrasonic humidifiers with municipal tap water or hard well water.',
      'Fill exclusively with distilled water or low-mineral filtered water (RO).',
      'Alternatively, replace ultrasonic units with an evaporative wick humidifier which naturally prevents minerals from aerosolizing.',
    ],
    scientificMechanism: 'Ultrasonic humidifiers atomize bulk liquid into 1-5 micron water droplets. When tap water evaporates in dry winter room air, the dissolved minerals (calcium, magnesium, carbonates) precipitate out as dry airborne mineral dust particles under 2.5 microns, raising laser particle counter readings to 200+ ug/m3 and irritating sensitive lung bronchial tracts.',
    dosAndDonts: {
      do: [
        'Maintain indoor winter relative humidity between 40% and 50% to soothe airways and promote mucosal cilia clearance.',
      ],
      dont: [
        'Never use tap water with high total dissolved solids (TDS) in ultrasonic humidifiers.',
      ],
    },
  },
];
