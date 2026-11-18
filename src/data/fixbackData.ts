export type ServiceVerticalId = 'electronics' | 'vehicle' | 'home' | 'construction' | 'diagnostics';

export type AssetCategory = 'Appliances' | 'Vehicles' | 'Electronics';
export type AssetCondition = 'Excellent' | 'Good' | 'Fair' | 'Poor';

export interface SubscriptionPlan {
  id: 'home-essential' | 'home-plus' | 'auto-care' | 'business-sme';
  name: string;
  tagline: string;
  monthlyPriceLkr: number;
  annualPriceLkr: number; // 11 months for 12 (1 month free)
  assetLimit: string;
  visitsPerYear: number;
  responseWindow: string;
  labourDiscount: string;
  partsBenefit: string;
  buyBackBonus: string;
  features: string[];
  highlighted?: boolean;
}

export interface ServiceHistoryEntry {
  id: string;
  date: string;
  title: string;
  technician: string;
  partsReplaced: string;
  costLkr: number;
  warrantyDays: number;
  notes: string;
}

export interface RegisteredAsset {
  id: string;
  qrCode: string;
  name: string;
  category: AssetCategory;
  brandModel: string;
  serialOrReg: string;
  purchaseDate: string;
  condition: AssetCondition;
  baseMarketValueLkr: number;
  guaranteedBuyBackLkr: number;
  nextMaintenanceDate: string;
  imageUrl: string;
  history: ServiceHistoryEntry[];
}

export interface RepairBooking {
  id: string;
  assetId: string;
  assetName: string;
  category: string;
  problemCategory: string;
  description: string;
  date: string;
  timeSlot: 'Morning (8:30 AM - 12:30 PM)' | 'Afternoon (1:00 PM - 5:00 PM)' | 'Evening (5:30 PM - 8:30 PM)';
  address: string;
  accessNotes: string;
  stage: 'Requested' | 'Assigned' | 'Diagnosing' | 'Repair' | 'Completed';
  technicianName: string;
  technicianCert: string;
  technicianEta: string;
  technicianNotes: string;
  quotation: {
    diagnosisSummary: string;
    partsLkr: number;
    labourLkr: number;
    planDiscountLkr: number;
    serviceFeeLkr: number;
    approved: boolean;
  };
  warrantyDays: number;
  rating?: number;
}

export interface RefurbishedProduct {
  id: string;
  title: string;
  category: 'Phones' | 'Laptops' | 'Appliances';
  grade: 'Grade A' | 'Grade B';
  priceLkr: number;
  originalPriceLkr: number;
  warrantyMonths: number;
  conditionSummary: string;
  specs: string[];
  qrRecordId: string;
  imageUrl: string;
  inStock: boolean;
}

export interface RegionalCentre {
  id: string;
  city: string;
  province: string;
  type: 'Head Office' | 'Central Refurbishment Facility' | 'Regional Service Centre';
  address: string;
  hours: string;
  capabilities: string[];
}

export interface NotificationItem {
  id: string;
  type: 'repair' | 'maintenance' | 'payment' | 'offer';
  title: string;
  detail: string;
  timestamp: string;
  read: boolean;
}

export interface SavedAddress {
  id: string;
  label: string;
  line1: string;
  city: string;
  district: string;
  isDefault: boolean;
}

export interface MarketplaceOrder {
  id: string;
  date: string;
  items: { product: RefurbishedProduct; quantity: number }[];
  totalLkr: number;
  deliveryAddress: string;
  paymentMethod: string;
  stage: 'Placed' | 'Packed' | 'Shipped' | 'Delivered';
  eta: string;
}

export const IMAGES = {
  heroWorkshop: '/src/assets/images/hero_fixback_workshop_1794997976611.jpg',
  vehicleCare: '/src/assets/images/service_vehicle_care_1794997976576.jpg',
  refurbLaptop: '/src/assets/images/product_refurb_laptop_1794997976401.jpg',
  refurbAppliance: '/src/assets/images/product_refurb_appliance_1794997977064.jpg',
};

export const COMPANY_INFO = {
  name: 'FixBack (Pvt) Ltd',
  brand: 'FixBack',
  tagline: 'Keep it working.',
  regNumber: 'PV 00312456',
  established: '2025',
  address: 'No. 142, Nawala Road, Rajagiriya, Sri Lanka',
  phone: '+94 11 2 456 780',
  email: 'hello@fixback.lk',
  website: 'www.fixback.lk',
  leadership: [
    { name: 'A.R.M. Hinamul', role: 'Chief Executive Officer', share: '25%', focus: 'Strategy, finance & corporate partnerships' },
    { name: 'Nabris MN', role: 'Chief Operating Officer', share: '25%', focus: 'Kelaniya facility, 8 regional centres & SLAs' },
    { name: 'R. Verjith', role: 'Chief Marketing Officer', share: '25%', focus: 'Subscriber acquisition, retention & B2B growth' },
    { name: 'Keerthihan .M', role: 'Chief Technology Officer', share: '25%', focus: 'Dispatch platform, QR registry & valuation engine' },
  ],
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'home-essential',
    name: 'Home Essential',
    tagline: 'Core appliance protection for urban households',
    monthlyPriceLkr: 1500,
    annualPriceLkr: 16500,
    assetLimit: 'Up to 5 registered appliances',
    visitsPerYear: 2,
    responseWindow: '48-hour response',
    labourDiscount: '20% off repair labour',
    partsBenefit: 'Published genuine parts pricing',
    buyBackBonus: '+4% annual buy-back loyalty accrual',
    features: [
      'Up to 5 registered household appliances',
      '2 scheduled preventive maintenance visits per year',
      'Unlimited free diagnostic assessments',
      '20% off labour on all repair work',
      'Guaranteed buy-back valuation & QR digital service record',
    ],
  },
  {
    id: 'home-plus',
    name: 'Home Plus',
    tagline: 'Complete household electronics, plumbing & electrical care',
    monthlyPriceLkr: 3500,
    annualPriceLkr: 38500,
    assetLimit: 'Up to 12 appliances + home utilities',
    visitsPerYear: 4,
    responseWindow: 'Priority 24-hour response',
    labourDiscount: 'Free labour on covered repairs',
    partsBenefit: 'Free doorstep pickup & return',
    buyBackBonus: '+6% annual buy-back loyalty accrual',
    highlighted: true,
    features: [
      'Up to 12 registered appliances plus minor plumbing, electrical & carpentry',
      '4 scheduled preventive maintenance visits per year',
      'Free labour on all covered repairs',
      'Priority 24-hour technician dispatch guarantee',
      'Free doorstep pickup & return with 30–180 day written warranty',
    ],
  },
  {
    id: 'auto-care',
    name: 'Auto Care',
    tagline: 'Predictable servicing for motorcycles, three-wheelers & cars',
    monthlyPriceLkr: 2500,
    annualPriceLkr: 27500,
    assetLimit: '1 registered vehicle',
    visitsPerYear: 4,
    responseWindow: 'Same-day breakdown dispatch',
    labourDiscount: 'Scheduled servicing included',
    partsBenefit: '25% off genuine spare parts',
    buyBackBonus: 'Annual condition report & buy-back guarantee',
    features: [
      '1 registered motorcycle, three-wheeler or passenger car',
      'Scheduled preventive servicing & fluids inspection',
      'Free vehicle pickup and drop-off within service zone',
      '25% discount on genuine spare parts & consumables',
      'Annual digital condition report that boosts resale value',
    ],
  },
  {
    id: 'business-sme',
    name: 'Business / SME',
    tagline: 'Commercial equipment uptime & ESG waste reporting',
    monthlyPriceLkr: 12000,
    annualPriceLkr: 132000,
    assetLimit: 'Up to 30 commercial assets',
    visitsPerYear: 6,
    responseWindow: '8-hour SLA guarantee',
    labourDiscount: 'Zero call-out fees & priority crew',
    partsBenefit: 'Consolidated monthly billing & trade terms',
    buyBackBonus: 'Quarterly asset health & ESG diversion report',
    features: [
      'Up to 30 assets across electronics, refrigeration, AC & IT',
      '6 scheduled maintenance sweeps per year',
      'Guaranteed 8-hour SLA response with automatic fee credit if missed',
      'Single consolidated invoice for offices, salons, hotels & factories',
      'Quarterly asset lifecycle & CEA-verified e-waste diversion report',
    ],
  },
];

export const SERVICE_VERTICALS = [
  {
    id: 'electronics' as ServiceVerticalId,
    index: '01',
    title: 'Household Electronics & Appliances',
    summary: 'Refrigerators, inverter air conditioners, washing machines, laptops, smartphones, and televisions serviced at home or at our Kelaniya line.',
    metrics: 'Free diagnostics · 30–180 day written warranty',
    payPerJobLkr: 4500,
    imageUrl: IMAGES.heroWorkshop,
  },
  {
    id: 'vehicle' as ServiceVerticalId,
    index: '02',
    title: 'Vehicle Repair & Servicing',
    summary: 'Scheduled servicing, breakdown diagnostics, brake and fluid maintenance, and doorstep pickup for cars, motorcycles, and three-wheelers.',
    metrics: '25% parts discount · Verified digital logbook',
    payPerJobLkr: 5500,
    imageUrl: IMAGES.vehicleCare,
  },
  {
    id: 'home' as ServiceVerticalId,
    index: '03',
    title: 'Mini Construction & Home Repairs',
    summary: 'Accountable, fixed-band plumbing, electrical wiring, tiling, waterproofing, painting, and tenant-turnover maintenance by vetted tradesmen.',
    metrics: 'Published price bands · No informal bargaining',
    payPerJobLkr: 15000,
    imageUrl: IMAGES.refurbAppliance,
  },
];

export const CLOSED_LOOP_STEPS = [
  { step: '01', title: 'Subscription & QR Registration', detail: 'Assets are inspected, photographed, and assigned a permanent QR digital record.' },
  { step: '02', title: 'Service Request', detail: 'Report faults via web portal, mobile app, WhatsApp, or tri-lingual hotline.' },
  { step: '03', title: 'Dispatch & Diagnosis', detail: 'Skill-matched NVQ Level 4 technician arrives with central-inventory parts.' },
  { step: '04', title: 'Quotation & Approval', detail: 'Out-of-plan work receives an itemized digital quote before any repair begins.' },
  { step: '05', title: 'Certified Repair', detail: 'Minor repairs completed on-site; complex rebuilds handled at Kelaniya.' },
  { step: '06', title: 'Quality Check & Warranty', detail: 'Every repair is tested, logged with photos, and backed by a 30–180 day warranty.' },
  { step: '07', title: 'Guaranteed Buy-Back', detail: 'Trade in registered assets at a transparent, system-calculated valuation.' },
  { step: '08', title: 'A/B/C Refurbishment', detail: 'Units are disassembled, tested, graded A/B/C, and certified at Kelaniya.' },
  { step: '09', title: 'Warrantied Resale', detail: 'Refurbished devices are sold online and at regional centres with warranty.' },
  { step: '10', title: 'Responsible Disposal', detail: 'Non-reusable parts go to CEA-licensed recyclers for ESG waste reporting.' },
];

export const INITIAL_ASSETS: RegisteredAsset[] = [
  {
    id: 'ast-1',
    qrCode: 'FB-AST-4092',
    name: 'LG Inverter Refrigerator 320L',
    category: 'Appliances',
    brandModel: 'LG GN-B372SLCN',
    serialOrReg: 'SN-308KPL9214',
    purchaseDate: '2023-04-12',
    condition: 'Good',
    baseMarketValueLkr: 125000,
    guaranteedBuyBackLkr: 68500,
    nextMaintenanceDate: '2026-12-08',
    imageUrl: IMAGES.refurbAppliance,
    history: [
      {
        id: 'srv-101',
        date: '2026-08-14',
        title: 'Condenser coil service & door seal replacement',
        technician: 'Dilantha Perera (NVQ-L4)',
        partsReplaced: 'Magnetic door gasket (OEM)',
        costLkr: 3400,
        warrantyDays: 180,
        notes: 'Cooling efficiency restored to 3°C cabin target; compressor draw nominal at 0.85A.',
      },
      {
        id: 'srv-102',
        date: '2026-02-10',
        title: 'Scheduled Preventive Maintenance',
        technician: 'Ruwan Kumara (NVQ-L4)',
        partsReplaced: 'None (Inspection & cleaning)',
        costLkr: 0,
        warrantyDays: 90,
        notes: 'Covered under Home Plus plan. Thermostat calibrated and drain line cleared.',
      },
    ],
  },
  {
    id: 'ast-2',
    qrCode: 'FB-AST-2184',
    name: 'Honda CB Hornet 160R',
    category: 'Vehicles',
    brandModel: 'Honda Hornet 160R (WP BGH-4821)',
    serialOrReg: 'WP BGH-4821',
    purchaseDate: '2022-08-03',
    condition: 'Good',
    baseMarketValueLkr: 480000,
    guaranteedBuyBackLkr: 315000,
    nextMaintenanceDate: '2026-11-29',
    imageUrl: IMAGES.vehicleCare,
    history: [
      {
        id: 'srv-201',
        date: '2026-09-22',
        title: 'Full 18,000 km scheduled service',
        technician: 'Sanjeewa Bandara (Auto Specialist)',
        partsReplaced: '10W-30 Synthetic Oil, Air Filter, Front Brake Pads',
        costLkr: 6200,
        warrantyDays: 90,
        notes: 'Chain tension adjusted, valve clearance verified, battery load test 12.7V.',
      },
    ],
  },
  {
    id: 'ast-3',
    qrCode: 'FB-AST-8831',
    name: 'Dell XPS 13 9310 Ultrabook',
    category: 'Electronics',
    brandModel: 'Dell XPS 13 (i7 / 16GB / 512GB)',
    serialOrReg: 'DL-XPS9310-774A',
    purchaseDate: '2023-11-19',
    condition: 'Excellent',
    baseMarketValueLkr: 215000,
    guaranteedBuyBackLkr: 142000,
    nextMaintenanceDate: '2027-01-15',
    imageUrl: IMAGES.refurbLaptop,
    history: [
      {
        id: 'srv-301',
        date: '2026-07-04',
        title: 'Thermal paste renewal & cooling fan clean',
        technician: 'Thilina Jayawardena (Senior Electronics)',
        partsReplaced: 'Thermal compound (Arctic MX-6)',
        costLkr: 0,
        warrantyDays: 180,
        notes: 'Peak CPU temperature reduced by 14°C under sustained load. Covered under Home Plus.',
      },
    ],
  },
  {
    id: 'ast-4',
    qrCode: 'FB-AST-5510',
    name: 'Panasonic Inverter AC 18,000 BTU',
    category: 'Appliances',
    brandModel: 'Panasonic CS-PU18XKH',
    serialOrReg: 'PN-AC18-9920',
    purchaseDate: '2021-06-25',
    condition: 'Fair',
    baseMarketValueLkr: 160000,
    guaranteedBuyBackLkr: 84000,
    nextMaintenanceDate: '2026-11-24',
    imageUrl: IMAGES.heroWorkshop,
    history: [
      {
        id: 'srv-401',
        date: '2026-06-18',
        title: 'High-pressure jet wash & R32 refrigerant top-up',
        technician: 'Dilantha Perera (NVQ-L4)',
        partsReplaced: 'R32 Refrigerant (250g)',
        costLkr: 4100,
        warrantyDays: 90,
        notes: 'Flare nut tightened to eliminate micro-leak; indoor blower balanced.',
      },
    ],
  },
];

export const INITIAL_ACTIVE_REPAIR: RepairBooking = {
  id: 'FB-REQ-9041',
  assetId: 'ast-4',
  assetName: 'Panasonic Inverter AC 18,000 BTU',
  category: 'Appliance repair',
  problemCategory: 'Insufficient cooling / intermittent error',
  description: 'Indoor unit blinking H11 communication fault after 15 minutes of operation; airflow weaker than normal.',
  date: '2026-11-18',
  timeSlot: 'Afternoon (1:00 PM - 5:00 PM)',
  address: 'No. 28/4, Hospital Road, Nugegoda',
  accessNotes: 'Gate code 4820; outdoor condenser mounted on first-floor balcony.',
  stage: 'Diagnosing',
  technicianName: 'Dilantha Perera',
  technicianCert: 'NVQ Level 4 · HVAC & Electronics',
  technicianEta: '14 mins away · Nugegoda Mobile Van #03',
  technicianNotes: 'Tested indoor-to-outdoor communication line. Main outdoor inverter PCB relay shows thermal degradation; compatible OEM relay board in van stock.',
  quotation: {
    diagnosisSummary: 'Replace faulty outdoor inverter communication relay & clean indoor blower assembly.',
    partsLkr: 6800,
    labourLkr: 2500,
    planDiscountLkr: 2500, // Free labour on Home Plus
    serviceFeeLkr: 0,
    approved: false,
  },
  warrantyDays: 180,
};

export const REFURBISHED_PRODUCTS: RefurbishedProduct[] = [
  {
    id: 'prd-1',
    title: 'Dell Latitude 7420 Core i5 (11th Gen)',
    category: 'Laptops',
    grade: 'Grade A',
    priceLkr: 98500,
    originalPriceLkr: 165000,
    warrantyMonths: 12,
    conditionSummary: 'Zero screen blemishes, 91% battery health, fresh NVMe SSD & thermal service at Kelaniya.',
    specs: ['Intel Core i5-1145G7', '16GB DDR4 RAM', '512GB NVMe SSD', '14" FHD IPS Anti-Glare', '12-Month FixBack Warranty'],
    qrRecordId: 'FB-REF-1104',
    imageUrl: IMAGES.refurbLaptop,
    inStock: true,
  },
  {
    id: 'prd-2',
    title: 'Samsung Galaxy S22 5G (128GB)',
    category: 'Phones',
    grade: 'Grade A',
    priceLkr: 74000,
    originalPriceLkr: 132000,
    warrantyMonths: 6,
    conditionSummary: 'Genuine AMOLED display verified, new OEM battery cell installed, 42-point burn-in tested.',
    specs: ['Snapdragon 8 Gen 1', '8GB RAM / 128GB Storage', '100% New Battery Cell', 'TRCSL Approved IMEI', '6-Month FixBack Warranty'],
    qrRecordId: 'FB-REF-2089',
    imageUrl: IMAGES.refurbLaptop,
    inStock: true,
  },
  {
    id: 'prd-3',
    title: 'LG 260L Smart Inverter Refrigerator',
    category: 'Appliances',
    grade: 'Grade A',
    priceLkr: 89000,
    originalPriceLkr: 148000,
    warrantyMonths: 12,
    conditionSummary: 'New compressor relay & magnetic door gasket; pressure-tested and sanitised.',
    specs: ['260L Frost-Free Capacity', 'Smart Inverter Compressor', '24-Hour Cooling Burn-in Pass', 'Energy Star Rated', '12-Month FixBack Warranty'],
    qrRecordId: 'FB-REF-3312',
    imageUrl: IMAGES.refurbAppliance,
    inStock: true,
  },
  {
    id: 'prd-4',
    title: 'Singer Front-Load Washer 7kg',
    category: 'Appliances',
    grade: 'Grade B',
    priceLkr: 56000,
    originalPriceLkr: 112000,
    warrantyMonths: 6,
    conditionSummary: 'Light cosmetic scuffs on side panel; drum bearings, pump, and control PCB newly replaced.',
    specs: ['7kg Wash Capacity', '1200 RPM Spin', 'New Drum Bearings & Drain Pump', 'Tested 15 Wash Cycles', '6-Month FixBack Warranty'],
    qrRecordId: 'FB-REF-3490',
    imageUrl: IMAGES.refurbAppliance,
    inStock: true,
  },
  {
    id: 'prd-5',
    title: 'Apple iPhone 12 (128GB)',
    category: 'Phones',
    grade: 'Grade B',
    priceLkr: 82500,
    originalPriceLkr: 145000,
    warrantyMonths: 6,
    conditionSummary: 'Micro-wear on aluminium bezel; Face ID, True Tone, and 94% battery health verified.',
    specs: ['A14 Bionic Chip', '128GB Storage', '94% Battery Health', 'Original OLED Panel', '6-Month FixBack Warranty'],
    qrRecordId: 'FB-REF-2145',
    imageUrl: IMAGES.refurbLaptop,
    inStock: true,
  },
  {
    id: 'prd-6',
    title: 'Lenovo ThinkPad T14 Gen 2',
    category: 'Laptops',
    grade: 'Grade A',
    priceLkr: 112000,
    originalPriceLkr: 195000,
    warrantyMonths: 12,
    conditionSummary: 'Corporate off-lease unit with full keyboard, hinge, and battery diagnostics passed.',
    specs: ['AMD Ryzen 5 Pro 5650U', '16GB RAM / 512GB SSD', '14" FHD Matte Display', 'Backlit Spill-Resistant Keyboard', '12-Month FixBack Warranty'],
    qrRecordId: 'FB-REF-1298',
    imageUrl: IMAGES.refurbLaptop,
    inStock: true,
  },
];

export const REGIONAL_CENTRES: RegionalCentre[] = [
  {
    id: 'hq-rajagiriya',
    city: 'Rajagiriya (Head Office)',
    province: 'Western Province',
    type: 'Head Office',
    address: 'No. 142, Nawala Road, Rajagiriya',
    hours: 'Mon–Sat · 8:00 AM – 6:30 PM',
    capabilities: ['Dispatch Control Room', 'Tri-lingual Call Centre', 'Corporate B2B Desk', 'Technician Training Academy'],
  },
  {
    id: 'crf-kelaniya',
    city: 'Kelaniya Industrial Corridor',
    province: 'Western Province',
    type: 'Central Refurbishment Facility',
    address: 'Plot 18, Kelaniya Industrial Zone, Biyagama Rd',
    hours: 'Mon–Sat · 7:30 AM – 7:00 PM',
    capabilities: ['Buy-Back Intake & Grading', 'Electronics Rework Line', 'Two-Post Vehicle Bays', 'CEA Segregated E-Waste Store'],
  },
  {
    id: 'rc-colombo',
    city: 'Colombo Central',
    province: 'Western Province',
    type: 'Regional Service Centre',
    address: 'No. 84, Maradana Road, Colombo 10',
    hours: 'Daily · 8:00 AM – 7:00 PM',
    capabilities: ['Walk-in Diagnostics', 'Quick Appliance Bench', 'Spare-Parts Counter', 'Refurbished Pickup'],
  },
  {
    id: 'rc-nugegoda',
    city: 'Nugegoda',
    province: 'Western Province',
    type: 'Regional Service Centre',
    address: 'No. 210, High Level Road, Nugegoda',
    hours: 'Daily · 8:00 AM – 7:00 PM',
    capabilities: ['Walk-in Reception', 'Mobile Van Dispatch Hub', 'Motorcycle & Car Bay', 'Buy-Back Drop-off'],
  },
  {
    id: 'rc-negombo',
    city: 'Negombo',
    province: 'Western Province',
    type: 'Regional Service Centre',
    address: 'No. 52, Chilaw Road, Negombo',
    hours: 'Mon–Sat · 8:30 AM – 6:30 PM',
    capabilities: ['Appliance Diagnostics', 'Three-Wheeler & Bike Service', 'Parts Store'],
  },
  {
    id: 'rc-kalutara',
    city: 'Kalutara',
    province: 'Western Province',
    type: 'Regional Service Centre',
    address: 'No. 119, Galle Road, Kalutara South',
    hours: 'Mon–Sat · 8:30 AM – 6:30 PM',
    capabilities: ['Home Appliance Bench', 'Home Repair Crew Hub', 'Customer Collection'],
  },
  {
    id: 'rc-kandy',
    city: 'Kandy',
    province: 'Central Province',
    type: 'Regional Service Centre',
    address: 'No. 304, Peradeniya Road, Kandy',
    hours: 'Mon–Sat · 8:00 AM – 6:30 PM',
    capabilities: ['Walk-in Repair Workshop', 'SME AC & IT Support', 'Buy-Back Assessment'],
  },
  {
    id: 'rc-galle',
    city: 'Galle',
    province: 'Southern Province',
    type: 'Regional Service Centre',
    address: 'No. 67, Wakwella Road, Galle',
    hours: 'Mon–Sat · 8:30 AM – 6:30 PM',
    capabilities: ['Hotel & SME Maintenance', 'Appliance & Vehicle Bay', 'Refurbished Showroom'],
  },
  {
    id: 'rc-kurunegala',
    city: 'Kurunegala',
    province: 'North Western Province',
    type: 'Regional Service Centre',
    address: 'No. 148, Colombo Road, Kurunegala',
    hours: 'Mon–Sat · 8:30 AM – 6:30 PM',
    capabilities: ['Auto Care Service Bay', 'Electronics Repair', 'Parts Dispatch'],
  },
  {
    id: 'rc-ratnapura',
    city: 'Ratnapura',
    province: 'Sabaragamuwa Province',
    type: 'Regional Service Centre',
    address: 'No. 91, Main Street, Ratnapura',
    hours: 'Mon–Sat · 8:30 AM – 6:00 PM',
    capabilities: ['Walk-in Diagnostics', 'Mobile Rider Dispatch', 'Buy-Back Drop-off'],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'ntf-1',
    type: 'repair',
    title: 'Diagnostic quotation ready for Panasonic AC',
    detail: 'Technician Dilantha Perera uploaded quotation for FB-REQ-9041 (LKR 6,800 parts · LKR 0 labour with Home Plus).',
    timestamp: '12 mins ago',
    read: false,
  },
  {
    id: 'ntf-2',
    type: 'maintenance',
    title: 'Preventive maintenance due in 6 days',
    detail: 'Honda CB Hornet 160R (FB-AST-2184) is due for its scheduled checkup. Book a free pickup slot.',
    timestamp: 'Yesterday',
    read: false,
  },
  {
    id: 'ntf-3',
    type: 'payment',
    title: 'Home Plus monthly subscription renewed',
    detail: 'LKR 3,500 processed for November 2026. +0.5% buy-back loyalty bonus accrued.',
    timestamp: 'Nov 01, 2026',
    read: true,
  },
  {
    id: 'ntf-4',
    type: 'offer',
    title: 'Annual prepayment offer: 1 month free',
    detail: 'Switch Home Plus to annual billing (LKR 38,500/yr) and save LKR 3,500 immediately.',
    timestamp: 'Oct 28, 2026',
    read: true,
  },
];

export const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home — Nugegoda',
    line1: 'No. 28/4, Hospital Road',
    city: 'Nugegoda',
    district: 'Colombo',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Work — Nawala',
    line1: 'Level 3, No. 76, Nawala Road',
    city: 'Rajagiriya',
    district: 'Colombo',
    isDefault: false,
  },
];

export const FAQS = [
  {
    q: 'How does the guaranteed buy-back valuation work?',
    a: 'Every asset registered under an active FixBack plan receives a QR-linked digital service record. Our valuation engine combines age, model, live second-hand Sri Lankan market benchmarks, and continuous subscription loyalty accrual to lock in a transparent buy-back price.',
  },
  {
    q: 'What is covered by the 30 to 180-day written warranty?',
    a: 'All repairs performed by FixBack certified technicians carry a digital and written warranty covering both workmanship and the genuine or clearly declared compatible parts installed. Warranty claims link directly to your asset QR record.',
  },
  {
    q: 'Can I book a repair without a monthly subscription?',
    a: 'Yes. Pay-per-Job repair services are available starting from an average of LKR 4,500. If you sign up at a regional service centre or online, we can credit your first job value toward your opening month subscription.',
  },
  {
    q: 'What happens if FixBack misses a guaranteed response window?',
    a: 'Under our Service Level Agreement guarantee (24 hours for Home Plus, 8 hours for Business / SME), if we miss the published response window, an automatic credit is applied to your next month’s subscription fee with no claim form required.',
  },
];

export function formatLkr(amount: number): string {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

export function calculateBuyBackValuation(params: {
  baseMarketLkr: number;
  ageYears: number;
  condition: AssetCondition;
  hasServiceRecord: boolean;
  subscriberMonths: number;
}) {
  const conditionFactor: Record<AssetCondition, number> = {
    Excellent: 0.72,
    Good: 0.58,
    Fair: 0.42,
    Poor: 0.22,
  };
  const ageDecay = Math.max(0.45, 1 - params.ageYears * 0.085);
  const baseOffer = Math.round((params.baseMarketLkr * conditionFactor[params.condition] * ageDecay) / 500) * 500;
  const serviceRecordBonus = params.hasServiceRecord ? Math.round((baseOffer * 0.08) / 100) * 100 : 0;
  const loyaltyRate = Math.min(0.12, params.subscriberMonths * 0.005);
  const loyaltyBonus = Math.round((baseOffer * loyaltyRate) / 100) * 100;
  const assessmentFee = params.hasServiceRecord ? 0 : 1200;
  const totalOffer = Math.max(3500, baseOffer + serviceRecordBonus + loyaltyBonus - assessmentFee);

  return {
    baseOffer,
    serviceRecordBonus,
    loyaltyBonus,
    assessmentFee,
    totalOffer,
  };
}
