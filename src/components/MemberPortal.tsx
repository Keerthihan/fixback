import { useState } from 'react';
import {
  LayoutDashboard,
  QrCode,
  Wrench,
  RefreshCw,
  ShoppingBag,
  LifeBuoy,
  Plus,
  Search,
  Check,
  CheckCircle2,
  Star,
  MapPin,
  Phone,
  Bell,
  UserCheck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  RegisteredAsset,
  RepairBooking,
  SubscriptionPlan,
  NotificationItem,
  SavedAddress,
  MarketplaceOrder,
  RefurbishedProduct,
  AssetCategory,
  AssetCondition,
  FAQS,
  IMAGES,
  COMPANY_INFO,
  formatLkr,
  calculateBuyBackValuation,
} from '../data/fixbackData';
import { ResilientImage } from './ResilientImage';

export type PortalTab = 'dashboard' | 'assets' | 'book' | 'buyback' | 'orders' | 'support';

interface MemberPortalProps {
  activeTab: PortalTab;
  onChangeTab: (tab: PortalTab) => void;
  user: { name: string; email: string; phone: string };
  onUpdateUser: (user: { name: string; email: string; phone: string }) => void;
  activePlan: SubscriptionPlan;
  onOpenPlanModal: (plan: SubscriptionPlan) => void;
  allPlans: SubscriptionPlan[];
  assets: RegisteredAsset[];
  onAddAsset: (asset: RegisteredAsset) => void;
  activeRepair: RepairBooking;
  onUpdateRepair: (repair: RepairBooking) => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  addresses: SavedAddress[];
  onAddAddress: (addr: SavedAddress) => void;
  orders: MarketplaceOrder[];
  products: RefurbishedProduct[];
  onAddToCart: (product: RefurbishedProduct) => void;
  onInspectProduct: (product: RefurbishedProduct) => void;
  onOpenCart: () => void;
  cartCount: number;
  onOpenAuthModal: (mode: 'onboarding' | 'login' | 'signup') => void;
}

export function MemberPortal({
  activeTab,
  onChangeTab,
  user,
  onUpdateUser,
  activePlan,
  onOpenPlanModal,
  allPlans,
  assets,
  onAddAsset,
  activeRepair,
  onUpdateRepair,
  notifications,
  onMarkAllRead,
  addresses,
  onAddAddress,
  orders,
  products,
  onAddToCart,
  onInspectProduct,
  onOpenCart,
  cartCount,
  onOpenAuthModal,
}: MemberPortalProps) {
  // Dashboard search & vertical filter
  const [dashSearch, setDashSearch] = useState('');
  const [dashVertical, setDashVertical] = useState<'All' | 'Electronics' | 'Auto' | 'Home'>('All');

  // Assets view state
  const [assetFilter, setAssetFilter] = useState<'All' | AssetCategory>('All');
  const [assetSearch, setAssetSearch] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || '');
  const [showAddAssetForm, setShowAddAssetForm] = useState(false);
  const [newAssetCat, setNewAssetCat] = useState<AssetCategory>('Appliances');
  const [newAssetBrand, setNewAssetBrand] = useState('');
  const [newAssetSerial, setNewAssetSerial] = useState('');
  const [newAssetPurchase, setNewAssetPurchase] = useState('2024-05-10');
  const [newAssetCondition, setNewAssetCondition] = useState<AssetCondition>('Good');

  // Book Repair 4-step wizard state
  const [repairWizardMode, setRepairWizardMode] = useState<'tracker' | 'wizard'>('tracker');
  const [bookStep, setBookStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [bookCategory, setBookCategory] = useState('Appliance repair');
  const [bookAssetId, setBookAssetId] = useState(assets[0]?.id || '');
  const [bookProblemCat, setBookProblemCat] = useState('Not cooling / power fault');
  const [bookDesc, setBookDesc] = useState('');
  const [bookDate, setBookDate] = useState('2026-11-20');
  const [bookSlot, setBookSlot] = useState<RepairBooking['timeSlot']>('Morning (8:30 AM - 12:30 PM)');
  const [bookAddress, setBookAddress] = useState(
    addresses[0] ? `${addresses[0].line1}, ${addresses[0].city}` : 'No. 28/4, Hospital Road, Nugegoda'
  );
  const [bookAccessNotes, setBookAccessNotes] = useState('');
  const [showQuotation, setShowQuotation] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionSent, setQuestionSent] = useState(false);
  const [serviceRating, setServiceRating] = useState(5);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Buy-Back flow state (Wireframe 29-32)
  const [bbStep, setBbStep] = useState<'start' | 'condition' | 'estimate' | 'pickup' | 'confirmed'>('start');
  const [bbAssetId, setBbAssetId] = useState(assets[0]?.id || 'manual');
  const [bbManualModel, setBbManualModel] = useState('');
  const [bbAge, setBbAge] = useState(2);
  const [bbCondition, setBbCondition] = useState<AssetCondition>('Good');
  const [bbDetails, setBbDetails] = useState('Fully operational, original charger/accessories included.');
  const [bbPickupAddress, setBbPickupAddress] = useState(
    addresses[0] ? `${addresses[0].line1}, ${addresses[0].city}` : 'No. 28/4, Hospital Road, Nugegoda'
  );
  const [bbPickupDate, setBbPickupDate] = useState('2026-11-22');
  const [bbPickupSlot, setBbPickupSlot] = useState('Afternoon (1:00 PM - 5:00 PM)');
  const [bbRefCode, setBbRefCode] = useState('');

  // Support & Profile sub-state (Wireframe 38-43)
  const [supportSubTab, setSupportSubTab] = useState<'notifications' | 'support' | 'profile'>('notifications');
  const [faqQuery, setFaqQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profilePhone, setProfilePhone] = useState(user.phone);
  const [profileSaved, setProfileSaved] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [prefLang, setPrefLang] = useState<'English' | 'Sinhala' | 'Tamil'>('English');
  const [prefSmsAlerts, setPrefSmsAlerts] = useState(true);
  const [prefMaintReminders, setPrefMaintReminders] = useState(true);

  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  const filteredAssets = assets.filter((a) => {
    const matchCat = assetFilter === 'All' || a.category === assetFilter;
    const matchQ =
      !assetSearch.trim() ||
      a.name.toLowerCase().includes(assetSearch.toLowerCase()) ||
      a.qrCode.toLowerCase().includes(assetSearch.toLowerCase());
    return matchCat && matchQ;
  });

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetBrand.trim()) return;
    const newId = `ast-${Date.now()}`;
    const qrNum = Math.floor(1000 + Math.random() * 9000);
    const created: RegisteredAsset = {
      id: newId,
      qrCode: `FB-AST-${qrNum}`,
      name: newAssetBrand,
      category: newAssetCat,
      brandModel: newAssetBrand,
      serialOrReg: newAssetSerial || `SN-${qrNum}-LK`,
      purchaseDate: newAssetPurchase,
      condition: newAssetCondition,
      baseMarketValueLkr: newAssetCat === 'Vehicles' ? 380000 : 95000,
      guaranteedBuyBackLkr: newAssetCat === 'Vehicles' ? 245000 : 54000,
      nextMaintenanceDate: '2027-02-15',
      imageUrl:
        newAssetCat === 'Vehicles'
          ? IMAGES.vehicleCare
          : newAssetCat === 'Electronics'
          ? IMAGES.refurbLaptop
          : IMAGES.refurbAppliance,
      history: [
        {
          id: `srv-${Date.now()}`,
          date: '2026-11-18',
          title: 'Initial QR Registration & Baseline Inspection',
          technician: 'FixBack Onboarding Desk',
          partsReplaced: 'None',
          costLkr: 0,
          warrantyDays: 30,
          notes: 'Asset photographed and registered in digital service record.',
        },
      ],
    };
    onAddAsset(created);
    setSelectedAssetId(created.id);
    setNewAssetBrand('');
    setNewAssetSerial('');
    setShowAddAssetForm(false);
  };

  const handleSubmitRepairBooking = () => {
    const chosenAsset = assets.find((a) => a.id === bookAssetId) || assets[0];
    const newRepair: RepairBooking = {
      id: `FB-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      assetId: chosenAsset?.id || 'manual',
      assetName: chosenAsset?.name || bookCategory,
      category: bookCategory,
      problemCategory: bookProblemCat,
      description: bookDesc || 'Scheduled diagnostic and repair visit requested via web portal.',
      date: bookDate,
      timeSlot: bookSlot,
      address: bookAddress,
      accessNotes: bookAccessNotes || 'Call upon arrival at main gate.',
      stage: 'Assigned',
      technicianName: 'Dilantha Perera',
      technicianCert: 'NVQ Level 4 · Multi-Vertical Specialist',
      technicianEta: 'Scheduled for selected slot',
      technicianNotes: 'Parts checklist verified from Rajagiriya central inventory.',
      quotation: {
        diagnosisSummary: 'Standard diagnostic check & preventive calibration.',
        partsLkr: 3200,
        labourLkr: 2000,
        planDiscountLkr: activePlan.id === 'home-plus' || activePlan.id === 'business-sme' ? 2000 : 400,
        serviceFeeLkr: 0,
        approved: false,
      },
      warrantyDays: 180,
    };
    onUpdateRepair(newRepair);
    setBookStep(6);
  };

  const selectedBbAsset = assets.find((a) => a.id === bbAssetId);
  const bbValuation = calculateBuyBackValuation({
    baseMarketLkr: selectedBbAsset ? selectedBbAsset.baseMarketValueLkr : 110000,
    ageYears: bbAssetId === 'manual' ? bbAge : 2,
    condition: bbCondition,
    hasServiceRecord: bbAssetId !== 'manual',
    subscriberMonths: bbAssetId !== 'manual' ? 9 : 0,
  });

  const quotationTotal =
    activeRepair.quotation.partsLkr +
    activeRepair.quotation.labourLkr +
    activeRepair.quotation.serviceFeeLkr -
    activeRepair.quotation.planDiscountLkr;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: { id: PortalTab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assets', label: 'My Assets', icon: QrCode },
    { id: 'book', label: 'Repairs & Track', icon: Wrench },
    { id: 'buyback', label: 'Buy-Back', icon: RefreshCw },
    { id: 'orders', label: 'Marketplace & Orders', icon: ShoppingBag },
    { id: 'support', label: 'Support & Profile', icon: LifeBuoy },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Portal Sub-Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChangeTab(item.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                  {item.id === 'support' && unreadCount > 0 && (
                    <span className="font-mono text-[11px] opacity-80">({unreadCount})</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              className="text-xs font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 border border-slate-200 rounded-lg cursor-pointer whitespace-nowrap"
            >
              Cart ({cartCount})
            </button>
            <button
              type="button"
              onClick={() => onOpenAuthModal('login')}
              className="text-xs font-medium text-emerald-800 hover:underline cursor-pointer whitespace-nowrap"
            >
              {user.name} · Switch / Tour
            </button>
          </div>
        </div>
      </div>

      {/* Main Portal Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: DASHBOARD (Wireframe 09-10) */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Greeting & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">FixBack Subscriber Portal · {activePlan.name}</p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Good morning, {user.name.split(' ')[0]}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={dashSearch}
                    onChange={(e) => setDashSearch(e.target.value)}
                    placeholder="Search registered assets or repairs..."
                    aria-label="Search registered assets or repairs"
                    className="pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div className="inline-flex p-1 bg-slate-200/70 rounded-lg">
                  {(['All', 'Electronics', 'Auto', 'Home'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setDashVertical(v)}
                      className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                        dashVertical === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Grid: Active Plan + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-emerald-400 font-medium">Active Subscription</p>
                  <h2 className="font-display text-xl font-semibold mt-1">{activePlan.name}</h2>
                  <p className="font-mono text-2xl font-bold tabular-nums mt-3">
                    {formatLkr(activePlan.monthlyPriceLkr)}
                    <span className="text-xs font-sans font-normal text-slate-300"> / month</span>
                  </p>
                  <p className="text-xs text-slate-300 mt-2">
                    {assets.length} registered assets · {activePlan.responseWindow} · {activePlan.labourDiscount}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenPlanModal(activePlan)}
                    className="text-xs font-medium text-emerald-400 hover:underline cursor-pointer"
                  >
                    Switch or upgrade plan
                  </button>
                  <span className="text-xs font-mono text-slate-400">Next bill: Dec 01</span>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-lg font-semibold text-slate-900">Quick Actions</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dispatch a certified technician, log a new QR asset, or get an instant buy-back offer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setRepairWizardMode('wizard');
                      setBookStep(1);
                      onChangeTab('book');
                    }}
                    className="p-4 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Wrench className="w-5 h-5 text-emerald-700 mb-2" />
                    <p className="text-sm font-semibold text-slate-900">Book a Repair</p>
                    <p className="text-xs text-slate-500 mt-0.5">Schedule technician visit</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAddAssetForm(true);
                      onChangeTab('assets');
                    }}
                    className="p-4 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <QrCode className="w-5 h-5 text-emerald-700 mb-2" />
                    <p className="text-sm font-semibold text-slate-900">Register Asset</p>
                    <p className="text-xs text-slate-500 mt-0.5">Generate QR service record</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBbStep('start');
                      onChangeTab('buyback');
                    }}
                    className="p-4 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-5 h-5 text-emerald-700 mb-2" />
                    <p className="text-sm font-semibold text-slate-900">Buy-Back Quote</p>
                    <p className="text-xs text-slate-500 mt-0.5">Guaranteed asset valuation</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Maintenance & Active Repair Tracker Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-900">Active Repair Status</h3>
                    <p className="text-xs text-slate-500">
                      {activeRepair.id} · {activeRepair.assetName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRepairWizardMode('tracker');
                      onChangeTab('book');
                    }}
                    className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Track & View Quote →
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Current Stage</span>
                    <span className="font-semibold text-slate-900">{activeRepair.stage}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Assigned Technician</span>
                    <span className="font-medium text-slate-900">{activeRepair.technicianName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Live ETA</span>
                    <span className="font-mono text-emerald-800">{activeRepair.technicianEta}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-900">Upcoming Preventive Maintenance</h3>
                    <p className="text-xs text-slate-500">Scheduled to preserve warranty & buy-back value</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onChangeTab('assets')}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                  >
                    All Assets →
                  </button>
                </div>

                <div className="mt-4 divide-y divide-slate-100">
                  {assets
                    .filter((a) => {
                      const matchesSearch = !dashSearch.trim() || a.name.toLowerCase().includes(dashSearch.toLowerCase());
                      const matchesVert =
                        dashVertical === 'All' ||
                        (dashVertical === 'Auto' && a.category === 'Vehicles') ||
                        (dashVertical === 'Electronics' && (a.category === 'Electronics' || a.category === 'Appliances')) ||
                        (dashVertical === 'Home' && a.category === 'Appliances');
                      return matchesSearch && matchesVert;
                    })
                    .slice(0, 3)
                    .map((asset) => (
                      <div key={asset.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                        <div>
                          <p className="font-medium text-slate-900">{asset.name}</p>
                          <p className="text-slate-500 font-mono">{asset.qrCode} · Due {asset.nextMaintenanceDate}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setBookAssetId(asset.id);
                            setRepairWizardMode('wizard');
                            setBookStep(1);
                            onChangeTab('book');
                          }}
                          className="px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 font-medium text-slate-700 cursor-pointer whitespace-nowrap"
                        >
                          Schedule
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY ASSETS & DIGITAL SERVICE RECORD (Wireframe 15-18) */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">My Registered Assets</h1>
                <p className="text-sm text-slate-600">
                  Every asset carries a QR-linked digital service record that increases buy-back resale value.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddAssetForm(!showAddAssetForm)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="w-4 h-4" />
                Register New Asset
              </button>
            </div>

            {/* Add Asset Panel (Wireframe 16) */}
            {showAddAssetForm && (
              <form onSubmit={handleCreateAsset} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="font-display text-base font-semibold text-slate-900">Register an Asset</h2>
                  <button type="button" onClick={() => setShowAddAssetForm(false)} className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer">
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Asset Category</label>
                    <select
                      value={newAssetCat}
                      onChange={(e) => setNewAssetCat(e.target.value as AssetCategory)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Appliances">Appliances</option>
                      <option value="Vehicles">Vehicles</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Brand & Model</label>
                    <input
                      type="text"
                      required
                      value={newAssetBrand}
                      onChange={(e) => setNewAssetBrand(e.target.value)}
                      placeholder="e.g., Samsung 9kg EcoBubble"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Serial / Reg. No.</label>
                    <input
                      type="text"
                      value={newAssetSerial}
                      onChange={(e) => setNewAssetSerial(e.target.value)}
                      placeholder="SN-882910"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Purchase Date</label>
                    <input
                      type="date"
                      value={newAssetPurchase}
                      onChange={(e) => setNewAssetPurchase(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Condition</label>
                    <select
                      value={newAssetCondition}
                      onChange={(e) => setNewAssetCondition(e.target.value as AssetCondition)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg cursor-pointer">
                    Save Asset & Generate QR
                  </button>
                </div>
              </form>
            )}

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex p-1 bg-slate-200/70 rounded-lg">
                {(['All', 'Appliances', 'Vehicles', 'Electronics'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setAssetFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                      assetFilter === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={assetSearch}
                onChange={(e) => setAssetSearch(e.target.value)}
                placeholder="Filter by name or QR ID..."
                className="px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg w-64"
              />
            </div>

            {/* Split Grid: Asset List + Asset Details & Service History */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-3">
                {filteredAssets.map((asset) => {
                  const isSel = selectedAsset?.id === asset.id;
                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center gap-4 cursor-pointer ${
                        isSel
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <ResilientImage
                        src={asset.imageUrl}
                        alt={asset.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-slate-100"
                      />
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-mono ${isSel ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {asset.qrCode} · {asset.category}
                        </p>
                        <p className="font-display font-semibold text-sm truncate mt-0.5">{asset.name}</p>
                        <p className={`text-xs mt-1 font-mono tabular-nums ${isSel ? 'text-slate-300' : 'text-slate-600'}`}>
                          Buy-Back: {formatLkr(asset.guaranteedBuyBackLkr)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedAsset && (
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-200">
                    <div>
                      <p className="text-xs font-mono text-emerald-800">
                        {selectedAsset.qrCode} · {selectedAsset.category} · {selectedAsset.condition} Condition
                      </p>
                      <h2 className="font-display text-xl font-bold text-slate-900 mt-1">
                        {selectedAsset.name}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Serial / Reg: <span className="font-mono text-slate-700">{selectedAsset.serialOrReg}</span> · Purchased {selectedAsset.purchaseDate}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs text-slate-500">Guaranteed Buy-Back</p>
                      <p className="font-mono text-xl font-bold text-emerald-800 tabular-nums">
                        {formatLkr(selectedAsset.guaranteedBuyBackLkr)}
                      </p>
                    </div>
                  </div>

                  {/* Quick Asset Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setBookAssetId(selectedAsset.id);
                        setRepairWizardMode('wizard');
                        setBookStep(1);
                        onChangeTab('book');
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg cursor-pointer"
                    >
                      Request Service
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBbAssetId(selectedAsset.id);
                        setBbStep('condition');
                        onChangeTab('buyback');
                      }}
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs font-medium rounded-lg cursor-pointer"
                    >
                      Buy Back This Asset
                    </button>
                  </div>

                  {/* Digital Service History (Wireframe 18) */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 mb-3">
                      Verified Digital Service Record ({selectedAsset.history.length} entries)
                    </h3>
                    <div className="space-y-3">
                      {selectedAsset.history.map((entry) => (
                        <div key={entry.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-slate-900">{entry.title}</p>
                            <span className="text-xs font-mono text-slate-500">{entry.date}</span>
                          </div>
                          <p className="text-xs text-slate-600">{entry.notes}</p>
                          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span>Tech: {entry.technician}</span>
                            <span>·</span>
                            <span>Parts: {entry.partsReplaced}</span>
                            <span>·</span>
                            <span className="font-mono text-slate-800">{entry.warrantyDays}-day warranty</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BOOK REPAIR & LIVE TRACKING / QUOTATION (Wireframe 19-28) */}
        {activeTab === 'book' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">Repairs, Live Tracking & Quotations</h1>
                <p className="text-sm text-slate-600">
                  Book a certified visit in 4 steps or manage your active dispatch request.
                </p>
              </div>
              <div className="inline-flex p-1 bg-slate-200/70 rounded-lg self-start">
                <button
                  type="button"
                  onClick={() => setRepairWizardMode('tracker')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    repairWizardMode === 'tracker' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Active Repair ({activeRepair.id})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRepairWizardMode('wizard');
                    setBookStep(1);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    repairWizardMode === 'wizard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  + Book New Repair
                </button>
              </div>
            </div>

            {repairWizardMode === 'wizard' ? (
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 max-w-3xl">
                {/* Step Indicator */}
                {bookStep <= 5 && (
                  <p className="text-xs font-mono text-emerald-800 mb-4">
                    Step 0{bookStep} of 05 · {bookStep === 1 ? 'Select Category' : bookStep === 2 ? 'Issue Details' : bookStep === 3 ? 'Visit Schedule' : bookStep === 4 ? 'Service Location' : 'Review Request'}
                  </p>
                )}

                {bookStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-lg font-semibold text-slate-900">Select Service Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Appliance repair', 'Vehicle service', 'Electrical / plumbing', 'Home repair', 'Preventive diagnostics'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setBookCategory(cat)}
                          className={`p-4 text-left rounded-lg border text-sm font-medium cursor-pointer ${
                            bookCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button type="button" onClick={() => setBookStep(2)} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer">
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {bookStep === 2 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-lg font-semibold text-slate-900">Tell us about the issue</h2>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Select Registered Asset</label>
                      <select value={bookAssetId} onChange={(e) => setBookAssetId(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white">
                        {assets.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.name} ({a.qrCode})
                          </option>
                        ))}
                        <option value="manual">Other / Unregistered Item</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Problem Category</label>
                      <input type="text" value={bookProblemCat} onChange={(e) => setBookProblemCat(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Describe the problem</label>
                      <textarea rows={3} value={bookDesc} onChange={(e) => setBookDesc(e.target.value)} placeholder="Describe symptoms, error codes, or noises..." className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg" />
                    </div>
                    <div className="flex justify-between pt-2">
                      <button type="button" onClick={() => setBookStep(1)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm cursor-pointer">Back</button>
                      <button type="button" onClick={() => setBookStep(3)} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer">Continue</button>
                    </div>
                  </div>
                )}

                {bookStep === 3 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-lg font-semibold text-slate-900">Choose Visit Date & Time Slot</h2>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Date</label>
                      <input type="date" value={bookDate} onChange={(e) => setBookDate(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg" />
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-slate-700 mb-2">Available Time Slots</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {([
                          'Morning (8:30 AM - 12:30 PM)',
                          'Afternoon (1:00 PM - 5:00 PM)',
                          'Evening (5:30 PM - 8:30 PM)',
                        ] as const).map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookSlot(slot)}
                            className={`p-3 text-left text-xs font-medium rounded-lg border cursor-pointer ${
                              bookSlot === slot ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <button type="button" onClick={() => setBookStep(2)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm cursor-pointer">Back</button>
                      <button type="button" onClick={() => setBookStep(4)} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer">Continue</button>
                    </div>
                  </div>
                )}

                {bookStep === 4 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-lg font-semibold text-slate-900">Service Location</h2>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Saved Address</label>
                      <select value={bookAddress} onChange={(e) => setBookAddress(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white">
                        {addresses.map((addr) => (
                          <option key={addr.id} value={`${addr.line1}, ${addr.city}`}>
                            {addr.label} — {addr.line1}, {addr.city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Access Instructions (Optional)</label>
                      <input type="text" value={bookAccessNotes} onChange={(e) => setBookAccessNotes(e.target.value)} placeholder="Gate code, floor number, parking note..." className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg" />
                    </div>
                    <div className="flex justify-between pt-2">
                      <button type="button" onClick={() => setBookStep(3)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm cursor-pointer">Back</button>
                      <button type="button" onClick={() => setBookStep(5)} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer">Review Booking</button>
                    </div>
                  </div>
                )}

                {bookStep === 5 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-lg font-semibold text-slate-900">Confirm Service Request</h2>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-500">Category</span><span className="font-medium">{bookCategory}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Asset</span><span className="font-medium">{assets.find((a) => a.id === bookAssetId)?.name || 'Unregistered Item'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Schedule</span><span className="font-medium">{bookDate} · {bookSlot}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="font-medium">{bookAddress}</span></div>
                      <div className="flex justify-between pt-2 border-t border-slate-200"><span className="text-slate-500">Diagnostic Fee</span><span className="font-mono font-semibold text-emerald-800">LKR 0 (Plan Covered)</span></div>
                    </div>
                    <div className="flex justify-between">
                      <button type="button" onClick={() => setBookStep(4)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm cursor-pointer">Back</button>
                      <button type="button" onClick={handleSubmitRepairBooking} className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg cursor-pointer">
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}

                {bookStep === 6 && (
                  <div className="text-center py-6 space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                    <h2 className="font-display text-xl font-bold text-slate-900">Your service request is confirmed</h2>
                    <p className="text-sm text-slate-600">
                      Booking ID <strong className="font-mono text-slate-900">{activeRepair.id}</strong> assigned to {activeRepair.technicianName}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setRepairWizardMode('tracker')}
                      className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer"
                    >
                      Track Technician & Status
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ACTIVE REPAIR TRACKER, QUOTATION & COMPLETION (Wireframe 25-28) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                    <div>
                      <p className="text-xs font-mono text-emerald-800">{activeRepair.id} · {activeRepair.category}</p>
                      <h2 className="font-display text-xl font-semibold text-slate-900 mt-0.5">{activeRepair.assetName}</h2>
                    </div>
                    <div className="flex gap-2">
                      {(['Requested', 'Assigned', 'Diagnosing', 'Repair', 'Completed'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => onUpdateRepair({ ...activeRepair, stage: st })}
                          className={`px-2.5 py-1 text-xs font-medium rounded cursor-pointer ${
                            activeRepair.stage === st
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technician Dispatch Card */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Assigned Technician</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{activeRepair.technicianName}</p>
                      <p className="text-xs text-slate-600">{activeRepair.technicianCert}</p>
                      <p className="text-xs font-mono text-emerald-800 mt-1">{activeRepair.technicianEta}</p>
                    </div>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-900 hover:bg-slate-100 whitespace-nowrap self-start sm:self-center"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Contact Dispatch
                    </a>
                  </div>

                  {/* Technician Notes */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 mb-1.5">Technician Diagnostic Notes</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{activeRepair.technicianNotes}</p>
                  </div>

                  {/* Repair Completed Rating (Wireframe 28) */}
                  {activeRepair.stage === 'Completed' && (
                    <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                        <ShieldCheck className="w-5 h-5" />
                        <span>Repair Completed · {activeRepair.warrantyDays}-Day Written Warranty Issued</span>
                      </div>
                      {ratingSubmitted ? (
                        <p className="text-xs text-slate-700">
                          Thank you for rating {serviceRating}/5. Service record synced to your asset QR profile.
                        </p>
                      ) : (
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setServiceRating(star)}
                                aria-label={`Rate ${star} stars`}
                                className="p-1 cursor-pointer"
                              >
                                <Star className={`w-5 h-5 ${star <= serviceRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setRatingSubmitted(true)}
                            className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg cursor-pointer"
                          >
                            Submit Service Rating
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: Itemized Quotation Panel (Wireframe 27) */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-900">Repair Quotation</h3>
                      <p className="text-xs text-slate-500">Published price band · Written warranty</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowQuotation(!showQuotation)}
                      className="text-xs text-emerald-800 hover:underline cursor-pointer"
                    >
                      {showQuotation ? 'Collapse' : 'Expand'}
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeRepair.quotation.diagnosisSummary}
                  </p>

                  <div className="space-y-2 text-sm pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>OEM / Verified Parts</span>
                      <span className="font-mono tabular-nums">{formatLkr(activeRepair.quotation.partsLkr)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Standard Labour</span>
                      <span className="font-mono tabular-nums">{formatLkr(activeRepair.quotation.labourLkr)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>{activePlan.name} Discount</span>
                      <span className="font-mono tabular-nums">− {formatLkr(activeRepair.quotation.planDiscountLkr)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total Estimate</span>
                      <span className="font-mono tabular-nums">{formatLkr(quotationTotal)}</span>
                    </div>
                  </div>

                  {activeRepair.quotation.approved ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Quotation approved. Technician authorized to proceed.</span>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateRepair({
                            ...activeRepair,
                            stage: 'Repair',
                            quotation: { ...activeRepair.quotation, approved: true },
                          })
                        }
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg cursor-pointer"
                      >
                        Approve Quotation ({formatLkr(quotationTotal)})
                      </button>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={questionText}
                          onChange={(e) => setQuestionText(e.target.value)}
                          placeholder="Ask technician a question..."
                          className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (questionText.trim()) {
                              setQuestionSent(true);
                              setQuestionText('');
                            }
                          }}
                          className="px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                        >
                          Ask
                        </button>
                      </div>
                      {questionSent && (
                        <p className="text-xs text-emerald-800">Message sent to {activeRepair.technicianName}.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BUY-BACK FLOW (Wireframe 29-32) */}
        {activeTab === 'buyback' && (
          <div className="max-w-3xl bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs font-mono text-emerald-800">Buy-Back Valuation & Collection</p>
              <h1 className="font-display text-2xl font-bold text-slate-900 mt-1">
                {bbStep === 'start' && 'Sell an asset to FixBack'}
                {bbStep === 'condition' && 'Tell us about its condition'}
                {bbStep === 'estimate' && 'Guaranteed Estimated Offer'}
                {bbStep === 'pickup' && 'Schedule Doorstep Collection'}
                {bbStep === 'confirmed' && 'Pickup Scheduled'}
              </h1>
            </div>

            {bbStep === 'start' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Choose Registered Asset</label>
                  <select value={bbAssetId} onChange={(e) => setBbAssetId(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white">
                    {assets.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.qrCode}) — Current Record
                      </option>
                    ))}
                    <option value="manual">Enter asset details manually</option>
                  </select>
                </div>

                {bbAssetId === 'manual' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Asset Type / Model</label>
                      <input type="text" value={bbManualModel} onChange={(e) => setBbManualModel(e.target.value)} placeholder="e.g., Apple iPhone 13 128GB" className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Age (Years)</label>
                      <input type="number" min={1} max={10} value={bbAge} onChange={(e) => setBbAge(Number(e.target.value) || 1)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg" />
                    </div>
                  </div>
                )}

                <button type="button" onClick={() => setBbStep('condition')} className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer">
                  Assess Condition & Get Valuation
                </button>
              </div>
            )}

            {bbStep === 'condition' && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {(['Excellent', 'Good', 'Fair', 'Poor'] as AssetCondition[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setBbCondition(c)}
                      className={`py-2.5 text-xs font-medium rounded-lg border cursor-pointer ${
                        bbCondition === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Condition Details</label>
                  <textarea rows={3} value={bbDetails} onChange={(e) => setBbDetails(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg" />
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={() => setBbStep('start')} className="px-4 py-2 border border-slate-300 rounded-lg text-sm cursor-pointer">Back</button>
                  <button type="button" onClick={() => setBbStep('estimate')} className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer">Submit for Estimate</button>
                </div>
              </div>
            )}

            {bbStep === 'estimate' && (
              <div className="space-y-5">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <p className="text-xs text-slate-500">
                    {selectedBbAsset ? `${selectedBbAsset.name} (${selectedBbAsset.qrCode})` : bbManualModel || 'Manual Asset'} · {bbCondition}
                  </p>
                  <p className="font-display text-3xl font-bold text-emerald-800 font-mono tabular-nums mt-1">
                    {formatLkr(bbValuation.totalOffer)}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between"><span>Base Market Offer</span><span className="font-mono tabular-nums">{formatLkr(bbValuation.baseOffer)}</span></div>
                    <div className="flex justify-between"><span>Digital Service Record Bonus</span><span className="font-mono tabular-nums text-emerald-700">+ {formatLkr(bbValuation.serviceRecordBonus)}</span></div>
                    <div className="flex justify-between"><span>Subscription Loyalty Accrual</span><span className="font-mono tabular-nums text-emerald-700">+ {formatLkr(bbValuation.loyaltyBonus)}</span></div>
                  </div>
                </div>
                <p className="text-xs text-slate-500">Offer subject to 5-minute physical verification at doorstep collection.</p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setBbStep('start')} className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm cursor-pointer">Decline Offer</button>
                  <button type="button" onClick={() => setBbStep('pickup')} className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg cursor-pointer">
                    Schedule Pickup
                  </button>
                </div>
              </div>
            )}

            {bbStep === 'pickup' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Pickup Address</label>
                  <select value={bbPickupAddress} onChange={(e) => setBbPickupAddress(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white">
                    {addresses.map((addr) => (
                      <option key={addr.id} value={`${addr.line1}, ${addr.city}`}>{addr.label} — {addr.line1}, {addr.city}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Collection Date</label>
                    <input type="date" value={bbPickupDate} onChange={(e) => setBbPickupDate(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Time Slot</label>
                    <select value={bbPickupSlot} onChange={(e) => setBbPickupSlot(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white">
                      <option>Morning (8:30 AM - 12:30 PM)</option>
                      <option>Afternoon (1:00 PM - 5:00 PM)</option>
                      <option>Evening (5:30 PM - 8:30 PM)</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBbRefCode(`FB-BB-${Math.floor(1000 + Math.random() * 9000)}`);
                    setBbStep('confirmed');
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer"
                >
                  Confirm Pickup
                </button>
              </div>
            )}

            {bbStep === 'confirmed' && (
              <div className="py-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Buy-Back Pickup Confirmed ({bbRefCode})</span>
                </div>
                <p className="text-sm text-slate-600">
                  Rider will collect from <strong>{bbPickupAddress}</strong> on {bbPickupDate} ({bbPickupSlot}) for intake at our Kelaniya Refurbishment Facility. Instant bank transfer on verification.
                </p>
                <button type="button" onClick={() => setBbStep('start')} className="text-xs font-medium text-emerald-800 hover:underline cursor-pointer">
                  Value another asset
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MARKETPLACE & ORDERS (Wireframe 33-37) */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">Refurbished Store & Order Tracking</h1>
                <p className="text-sm text-slate-600">Shop Kelaniya-certified devices or track recent deliveries.</p>
              </div>
              <button
                type="button"
                onClick={onOpenCart}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg cursor-pointer"
              >
                Open Cart ({cartCount})
              </button>
            </div>

            {orders.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <h2 className="font-display text-base font-semibold text-slate-900">Your Recent Orders</h2>
                <div className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <div key={ord.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                      <div>
                        <p className="font-mono font-semibold text-slate-900">{ord.id} · {ord.stage}</p>
                        <p className="text-xs text-slate-500">{ord.deliveryAddress} · {ord.eta}</p>
                      </div>
                      <span className="font-mono font-semibold text-slate-900 tabular-nums">{formatLkr(ord.totalLkr)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between">
                  <div>
                    <button type="button" onClick={() => onInspectProduct(item)} className="block w-full aspect-[4/3] bg-slate-100 cursor-pointer">
                      <ResilientImage src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </button>
                    <div className="p-4">
                      <p className="text-xs text-slate-500">{item.category} · {item.grade} · {item.warrantyMonths}m Warranty</p>
                      <h3 className="font-display text-sm font-semibold text-slate-900 mt-1">{item.title}</h3>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">{formatLkr(item.priceLkr)}</span>
                    <button
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: NOTIFICATIONS, SUPPORT & PROFILE / SETTINGS (Wireframe 38-43) */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="inline-flex p-1 bg-slate-200/70 rounded-lg">
              <button
                type="button"
                onClick={() => setSupportSubTab('notifications')}
                className={`px-4 py-2 text-xs font-medium rounded-md cursor-pointer ${
                  supportSubTab === 'notifications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Notifications ({unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setSupportSubTab('support')}
                className={`px-4 py-2 text-xs font-medium rounded-md cursor-pointer ${
                  supportSubTab === 'support' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Help & Support
              </button>
              <button
                type="button"
                onClick={() => setSupportSubTab('profile')}
                className={`px-4 py-2 text-xs font-medium rounded-md cursor-pointer ${
                  supportSubTab === 'profile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Profile, Addresses & Settings
              </button>
            </div>

            {supportSubTab === 'notifications' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 max-w-3xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="font-display text-lg font-semibold text-slate-900 inline-flex items-center gap-2">
                    <Bell className="w-4 h-4 text-slate-500" />
                    Updates & Reminders
                  </h2>
                  <button type="button" onClick={onMarkAllRead} className="text-xs text-emerald-800 hover:underline cursor-pointer">
                    Mark all as read
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-3.5 flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-sm ${n.read ? 'font-medium text-slate-700' : 'font-semibold text-slate-900'}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">{n.detail}</p>
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {supportSubTab === 'support' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-slate-900">Frequently Asked Questions</h2>
                  <input
                    type="search"
                    value={faqQuery}
                    onChange={(e) => setFaqQuery(e.target.value)}
                    placeholder="Search FAQs..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                  <div className="divide-y divide-slate-100">
                    {FAQS.filter(
                      (f) =>
                        !faqQuery.trim() ||
                        f.q.toLowerCase().includes(faqQuery.toLowerCase()) ||
                        f.a.toLowerCase().includes(faqQuery.toLowerCase())
                    ).map((faq) => (
                      <div key={faq.q} className="py-3.5">
                        <p className="text-sm font-semibold text-slate-900">{faq.q}</p>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4 h-fit">
                  <h2 className="font-display text-lg font-semibold text-slate-900">Contact Support</h2>
                  <p className="text-xs text-slate-600">
                    Tri-lingual Hotline (Sinhala · Tamil · English): <strong className="font-mono text-slate-900">{COMPANY_INFO.phone}</strong> (8:00 AM – 8:00 PM)
                  </p>
                  {ticketSubmitted ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                      Support ticket logged. Our Rajagiriya desk will follow up shortly.
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (ticketSubject.trim()) setTicketSubmitted(true);
                      }}
                      className="space-y-3"
                    >
                      <textarea
                        rows={3}
                        required
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="Report a problem or ask about your plan..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                      <button type="submit" className="w-full py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer">
                        Send Support Request
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {supportSubTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Edit Profile (Wireframe 40-41) */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onUpdateUser({ name: profileName, email: profileEmail, phone: profilePhone });
                    setProfileSaved(true);
                  }}
                  className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold text-slate-900 inline-flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-700" />
                      Edit Profile
                    </h2>
                    <button
                      type="button"
                      onClick={() => onOpenAuthModal('onboarding')}
                      className="text-xs text-emerald-800 hover:underline cursor-pointer"
                    >
                      App Onboarding Tour
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                    <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                  </div>
                  {profileSaved && <p className="text-xs text-emerald-700">Profile updated.</p>}
                  <button type="submit" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg cursor-pointer">
                    Save Changes
                  </button>
                </form>

                {/* Saved Addresses & Settings (Wireframe 42-43) */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                    <h2 className="font-display text-lg font-semibold text-slate-900 inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      Saved Addresses
                    </h2>
                    <div className="space-y-2">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{addr.label}</p>
                            <p className="text-slate-600">{addr.line1}, {addr.city}</p>
                          </div>
                          {addr.isDefault && <span className="text-emerald-800 font-medium">Default</span>}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input type="text" placeholder="Label (e.g., Parents)" value={newAddrLabel} onChange={(e) => setNewAddrLabel(e.target.value)} className="px-2.5 py-2 text-xs border border-slate-300 rounded-lg" />
                      <input type="text" placeholder="Street address" value={newAddrLine} onChange={(e) => setNewAddrLine(e.target.value)} className="px-2.5 py-2 text-xs border border-slate-300 rounded-lg" />
                      <div className="flex gap-2">
                        <input type="text" placeholder="City" value={newAddrCity} onChange={(e) => setNewAddrCity(e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            if (newAddrLabel.trim() && newAddrLine.trim()) {
                              onAddAddress({
                                id: `addr-${Date.now()}`,
                                label: newAddrLabel,
                                line1: newAddrLine,
                                city: newAddrCity || 'Colombo',
                                district: 'Colombo',
                                isDefault: false,
                              });
                              setNewAddrLabel('');
                              setNewAddrLine('');
                              setNewAddrCity('');
                            }
                          }}
                          className="px-3 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg cursor-pointer shrink-0"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                    <h2 className="font-display text-lg font-semibold text-slate-900">Preferences & Subscriptions</h2>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-medium">Interface & Hotline Language</span>
                      <div className="inline-flex p-1 bg-slate-100 rounded-lg">
                        {(['English', 'Sinhala', 'Tamil'] as const).map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setPrefLang(lang)}
                            className={`px-2.5 py-1 rounded text-xs cursor-pointer ${
                              prefLang === lang ? 'bg-white text-slate-900 shadow-sm font-medium' : 'text-slate-600'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                    <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                      <span>SMS & WhatsApp Technician Dispatch Alerts</span>
                      <input type="checkbox" checked={prefSmsAlerts} onChange={(e) => setPrefSmsAlerts(e.target.checked)} className="accent-emerald-700" />
                    </label>
                    <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                      <span>Preventive Maintenance Reminders</span>
                      <input type="checkbox" checked={prefMaintReminders} onChange={(e) => setPrefMaintReminders(e.target.checked)} className="accent-emerald-700" />
                    </label>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Current Plan: <strong className="text-slate-900">{activePlan.name}</strong></span>
                      <button
                        type="button"
                        onClick={() => onOpenPlanModal(allPlans.find((p) => p.id !== activePlan.id) || activePlan)}
                        className="text-emerald-800 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        Compare Plans <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
