import { useState } from 'react';
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Mail,
  ShoppingBag,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';
import {
  IMAGES,
  COMPANY_INFO,
  SUBSCRIPTION_PLANS,
  SERVICE_VERTICALS,
  CLOSED_LOOP_STEPS,
  REFURBISHED_PRODUCTS,
  REGIONAL_CENTRES,
  SubscriptionPlan,
  RefurbishedProduct,
  AssetCondition,
  formatLkr,
  calculateBuyBackValuation,
} from '../data/fixbackData';
import { ResilientImage } from './ResilientImage';

interface PublicWebsiteProps {
  onSelectPlan: (plan: SubscriptionPlan, billingCycle: 'monthly' | 'annual') => void;
  onOpenPortal: (tab: string) => void;
  onAddToCart: (product: RefurbishedProduct) => void;
  onInspectProduct: (product: RefurbishedProduct) => void;
  onOpenCart: () => void;
  cartCount: number;
  activePlanId: string;
}

export function PublicWebsite({
  onSelectPlan,
  onOpenPortal,
  onAddToCart,
  onInspectProduct,
  onOpenCart,
  cartCount,
  activePlanId,
}: PublicWebsiteProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showCompareTable, setShowCompareTable] = useState(false);

  // Closed-loop step selector
  const [activeLoopIndex, setActiveLoopIndex] = useState(0);

  // Instant Buy-Back Estimator state
  const [estCategory, setEstCategory] = useState<'Appliances' | 'Vehicles' | 'Electronics'>('Appliances');
  const [estModel, setEstModel] = useState('LG Inverter Refrigerator 320L');
  const [estMarketValue, setEstMarketValue] = useState(125000);
  const [estAge, setEstAge] = useState(3);
  const [estCondition, setEstCondition] = useState<AssetCondition>('Good');
  const [estSubscriber, setEstSubscriber] = useState(true);

  const valuation = calculateBuyBackValuation({
    baseMarketLkr: estMarketValue,
    ageYears: estAge,
    condition: estCondition,
    hasServiceRecord: estSubscriber,
    subscriberMonths: estSubscriber ? 8 : 0,
  });

  // Marketplace filter state
  const [shopCategory, setShopCategory] = useState<'All' | 'Phones' | 'Laptops' | 'Appliances'>('All');
  const [shopSearch, setShopSearch] = useState('');

  const filteredProducts = REFURBISHED_PRODUCTS.filter((item) => {
    const matchCat = shopCategory === 'All' || item.category === shopCategory;
    const matchQuery =
      !shopSearch.trim() ||
      item.title.toLowerCase().includes(shopSearch.toLowerCase()) ||
      item.conditionSummary.toLowerCase().includes(shopSearch.toLowerCase());
    return matchCat && matchQuery;
  });

  // Regional centres filter
  const [selectedCentreId, setSelectedCentreId] = useState(REGIONAL_CENTRES[0].id);
  const selectedCentre = REGIONAL_CENTRES.find((c) => c.id === selectedCentreId) || REGIONAL_CENTRES[0];

  // Lead / Corporate Inquiry Form
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadVertical, setLeadVertical] = useState('Home & Appliance Subscription');
  const [leadNotes, setLeadNotes] = useState('');
  const [leadError, setLeadError] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadContact.trim()) {
      setLeadError('Please enter your name and phone number or email address.');
      return;
    }
    setLeadError('');
    setLeadSubmitted(true);
  };

  return (
    <div id="top" className="bg-slate-50 text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-medium text-emerald-800 tracking-wide mb-3">
                Sri Lanka · Electronics · Vehicles · Home Repairs
              </p>
              <h1
                className="font-display font-bold tracking-tight text-slate-900 leading-[1.1]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance' }}
              >
                Keep what you own working. Sell it back when you upgrade.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                FixBack replaces unpredictable informal repairs with a fixed monthly subscription — delivering scheduled preventive maintenance, NVQ Level 4 certified technicians, written warranties, QR digital service records, and a guaranteed buy-back valuation.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#plans"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Explore Subscription Plans
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenPortal('dashboard')}
                  className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Open Member Portal
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[300px] lg:min-h-[420px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={IMAGES.heroWorkshop}
                  alt="FixBack technicians inspecting household appliances at our refurbishment and diagnostic facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4-column quantitative proof strip below hero split */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">92%</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">First-time fix rate target with van-stocked parts</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">8 Centres</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Regional service hubs plus Kelaniya refurbishment plant</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">30–180 Days</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Written warranty logged to each asset QR record</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">120 Tonnes</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">3-year e-waste & mechanical landfill diversion goal</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES & 10-STEP CLOSED LOOP */}
      <section id="services" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-emerald-800 mb-2">Three Integrated Verticals</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
              One accountable network for appliances, vehicles, and property upkeep
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Every job is dispatched from our Rajagiriya control room with published price bands, digital diagnostic checklists, and formal warranty records.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICE_VERTICALS.map((vert, idx) => (
              <div
                key={vert.id}
                className={`bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div className={`grid ${idx === 0 ? 'grid-cols-1 md:grid-cols-2 h-full' : 'grid-cols-1'}`}>
                  <div className={`${idx === 0 ? 'h-64 md:h-full' : 'h-48'} bg-slate-100 overflow-hidden`}>
                    <ResilientImage
                      src={vert.imageUrl}
                      alt={vert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-mono text-slate-500">
                        {vert.index} · {vert.metrics}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-slate-900 mt-2">
                        {vert.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        {vert.summary}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-500">
                        Pay-per-job avg <strong className="font-mono text-slate-900 tabular-nums">{formatLkr(vert.payPerJobLkr)}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenPortal('book')}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                      >
                        Book service <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 10-Step Closed-Loop Service Lifecycle */}
          <div className="mt-12 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  The 10-Step Closed-Loop Service Process
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Select a stage to inspect how every registered asset moves from preventive care to certified resale or CEA recycling.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                Stage {CLOSED_LOOP_STEPS[activeLoopIndex].step} of 10
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
              {CLOSED_LOOP_STEPS.map((item, idx) => (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveLoopIndex(idx)}
                  className={`p-3 text-left rounded-lg border transition-colors cursor-pointer ${
                    activeLoopIndex === idx
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className={`block text-xs font-mono ${activeLoopIndex === idx ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {item.step}
                  </span>
                  <span className="block text-xs font-medium mt-1 truncate">{item.title}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {CLOSED_LOOP_STEPS[activeLoopIndex].step}. {CLOSED_LOOP_STEPS[activeLoopIndex].title}
                </p>
                <p className="text-sm text-slate-600 mt-0.5">
                  {CLOSED_LOOP_STEPS[activeLoopIndex].detail}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenPortal('assets')}
                className="text-xs font-medium text-emerald-800 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inspect sample QR record →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUBSCRIPTION PLANS & COMPARISON */}
      <section id="plans" className="py-16 lg:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-emerald-800 mb-2">Subscription Plans</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Predictable monthly protection in LKR
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Prepay 12 months and receive 1 month free. Every active month adds loyalty equity to your guaranteed buy-back valuation.
              </p>
            </div>

            {/* Segmented Billing Toggle */}
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual (1 Month Free)
              </button>
            </div>
          </div>

          {/* 4 Plans Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const price = billingCycle === 'monthly' ? plan.monthlyPriceLkr : plan.annualPriceLkr;
              const isCurrent = activePlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`rounded-xl p-6 flex flex-col justify-between border ${
                    plan.highlighted
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-900 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                      {plan.highlighted && (
                        <span className="text-xs font-medium text-emerald-400">Most Popular</span>
                      )}
                    </div>
                    <p className={`text-xs mt-1.5 min-h-[32px] ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                      {plan.tagline}
                    </p>

                    <div className="mt-5 pb-5 border-b border-current/10">
                      <span className="font-mono text-2xl font-bold tabular-nums">
                        {formatLkr(price)}
                      </span>
                      <span className={`text-xs ml-1 ${plan.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs leading-relaxed">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-emerald-400' : 'text-emerald-700'}`} />
                          <span className={plan.highlighted ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan, billingCycle)}
                    className={`mt-6 w-full py-2.5 px-4 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      plan.highlighted
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-300'
                    }`}
                  >
                    {isCurrent ? 'Manage Plan' : 'Choose Plan'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Compare Plans Toggle & Table (Wireframe 11) */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowCompareTable(!showCompareTable)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              {showCompareTable ? 'Hide plan comparison table' : 'Compare all plans side-by-side'}
              {showCompareTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showCompareTable && (
              <div className="mt-4 overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                    <tr>
                      <th className="py-3.5 px-4 font-medium">Coverage Metric</th>
                      {SUBSCRIPTION_PLANS.map((p) => (
                        <th key={p.id} className="py-3.5 px-4 font-semibold text-slate-900">{p.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-xs sm:text-sm">
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-700">Monthly Fee</td>
                      {SUBSCRIPTION_PLANS.map((p) => (
                        <td key={p.id} className="py-3 px-4 font-mono tabular-nums text-slate-900">{formatLkr(p.monthlyPriceLkr)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-700">Asset Allowance</td>
                      {SUBSCRIPTION_PLANS.map((p) => (
                        <td key={p.id} className="py-3 px-4 text-slate-600">{p.assetLimit}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-700">Preventive Visits</td>
                      {SUBSCRIPTION_PLANS.map((p) => (
                        <td key={p.id} className="py-3 px-4 font-mono tabular-nums text-slate-600">{p.visitsPerYear} / year</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-700">Response SLA</td>
                      {SUBSCRIPTION_PLANS.map((p) => (
                        <td key={p.id} className="py-3 px-4 text-slate-600">{p.responseWindow}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-700">Labour & Parts</td>
                      {SUBSCRIPTION_PLANS.map((p) => (
                        <td key={p.id} className="py-3 px-4 text-slate-600">{p.labourDiscount}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. INSTANT BUY-BACK VALUATION ENGINE (Wireframe 29-32) */}
      <section id="buyback" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-emerald-800 mb-2">Buy-Back Valuation Engine</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
                Know what your device or vehicle is worth before you upgrade
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Our valuation engine combines asset age, physical condition, live Sri Lankan second-hand market benchmarks, and your verified QR service record to quote a guaranteed buy-back price.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <p>01. No haggling with informal brokers or unverified marketplace buyers.</p>
                <p>02. Subscribers earn monthly loyalty equity on registered assets.</p>
                <p>03. Free doorstep pickup scheduled straight to our Kelaniya refurbishment line.</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Asset Category</label>
                  <select
                    value={estCategory}
                    onChange={(e) => {
                      const val = e.target.value as 'Appliances' | 'Vehicles' | 'Electronics';
                      setEstCategory(val);
                      if (val === 'Appliances') {
                        setEstModel('LG Inverter Refrigerator 320L');
                        setEstMarketValue(125000);
                      } else if (val === 'Vehicles') {
                        setEstModel('Honda CB Hornet 160R');
                        setEstMarketValue(480000);
                      } else {
                        setEstModel('Dell XPS 13 9310 Ultrabook');
                        setEstMarketValue(215000);
                      }
                    }}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Appliances">Household Appliance</option>
                    <option value="Vehicles">Motorcycle / Three-Wheeler / Car</option>
                    <option value="Electronics">Laptop / Smartphone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Brand & Model</label>
                  <input
                    type="text"
                    value={estModel}
                    onChange={(e) => setEstModel(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Estimated Replacement Value (LKR)
                  </label>
                  <input
                    type="number"
                    min={15000}
                    step={5000}
                    value={estMarketValue}
                    onChange={(e) => setEstMarketValue(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Asset Age ({estAge} {estAge === 1 ? 'year' : 'years'})
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={7}
                    value={estAge}
                    onChange={(e) => setEstAge(Number(e.target.value))}
                    className="w-full mt-2 accent-emerald-700"
                  />
                </div>
              </div>

              <div className="mt-5">
                <span className="block text-xs font-medium text-slate-700 mb-2">Current Condition</span>
                <div className="grid grid-cols-4 gap-2">
                  {(['Excellent', 'Good', 'Fair', 'Poor'] as AssetCondition[]).map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setEstCondition(cond)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                        estCondition === cond
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-4 flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={estSubscriber}
                  onChange={(e) => setEstSubscriber(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span>Include active FixBack QR Digital Service Record & 8-month loyalty accrual</span>
              </label>

              {/* Valuation Result Strip */}
              <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Base {formatLkr(valuation.baseOffer)} + History {formatLkr(valuation.serviceRecordBonus)} + Loyalty {formatLkr(valuation.loyaltyBonus)}
                    {valuation.assessmentFee > 0 ? ` − Assessment ${formatLkr(valuation.assessmentFee)}` : ''}
                  </p>
                  <p className="font-display text-3xl font-bold text-emerald-800 font-mono tabular-nums mt-1">
                    {formatLkr(valuation.totalOffer)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenPortal('buyback')}
                  className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Schedule Pickup
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CERTIFIED REFURBISHED MARKETPLACE (Wireframe 33-37) */}
      <section id="marketplace" className="py-16 lg:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-emerald-800 mb-2">Certified Refurbished Storefront</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Graded, tested, and warrantied at Kelaniya
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={shopSearch}
                  onChange={(e) => setShopSearch(e.target.value)}
                  placeholder="Search refurbished stock..."
                  aria-label="Search refurbished stock"
                  className="pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg bg-white w-56 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="inline-flex p-1 bg-slate-100 rounded-lg">
                {(['All', 'Phones', 'Laptops', 'Appliances'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setShopCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${
                      shopCategory === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                Cart ({cartCount})
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="mt-10 py-12 text-center bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-sm font-medium text-slate-900">No refurbished items match "{shopSearch}"</p>
              <button
                type="button"
                onClick={() => {
                  setShopCategory('All');
                  setShopSearch('');
                }}
                className="mt-3 text-xs font-medium text-emerald-800 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => (
                <article
                  key={item.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onInspectProduct(item)}
                      className="block w-full aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer text-left"
                    >
                      <ResilientImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    <div className="p-5">
                      <p className="text-xs text-slate-500">
                        {item.category} · {item.grade} · {item.warrantyMonths}m Warranty
                      </p>
                      <button
                        type="button"
                        onClick={() => onInspectProduct(item)}
                        className="font-display text-base font-semibold text-slate-900 mt-1.5 text-left hover:text-emerald-800 cursor-pointer"
                      >
                        {item.title}
                      </button>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {item.conditionSummary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-slate-200/70 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                        {formatLkr(item.priceLkr)}
                      </span>
                      <span className="block font-mono text-xs text-slate-400 line-through tabular-nums">
                        {formatLkr(item.originalPriceLkr)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="px-4 py-2 bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-300 hover:border-slate-900 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. REGIONAL SERVICE CENTRES, LEADERSHIP & CONTACT FORM */}
      <section id="centres" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: 8 Regional Service Centres + Rajagiriya HQ + Kelaniya */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-medium text-emerald-800 mb-2">Island-Wide Infrastructure</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Head office, Kelaniya refurbishment line & 8 service centres
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {REGIONAL_CENTRES.map((centre) => (
                <button
                  key={centre.id}
                  type="button"
                  onClick={() => setSelectedCentreId(centre.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors whitespace-nowrap ${
                    selectedCentreId === centre.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {centre.city}
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <p className="text-xs text-emerald-800 font-medium">
                    {selectedCentre.type} · {selectedCentre.province}
                  </p>
                  <h3 className="font-display text-lg font-semibold text-slate-900 mt-0.5">
                    {selectedCentre.city}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">{selectedCentre.hours}</span>
              </div>

              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{selectedCentre.address}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {selectedCentre.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership & Governance */}
            <div className="pt-4">
              <h3 className="text-xs font-semibold text-slate-500 mb-3">
                Founding Board · {COMPANY_INFO.name} (Reg. {COMPANY_INFO.regNumber})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COMPANY_INFO.leadership.map((leader) => (
                  <div key={leader.name} className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-slate-900">{leader.name}</p>
                    <p className="text-xs text-emerald-800 mt-0.5">{leader.role}</p>
                    <p className="text-xs text-slate-500 mt-1.5">{leader.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Validated Lead Capture / Corporate Inquiry Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 h-fit">
            <h3 className="font-display text-xl font-semibold text-slate-900">
              Request an SME Contract or Diagnostic Call
            </h3>
            <p className="text-sm text-slate-600 mt-1.5">
              Our Sinhala, Tamil, and English dispatch desk responds within one business hour.
            </p>

            {leadSubmitted ? (
              <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Request Logged</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Thank you, {leadName}. A FixBack coordinator from our Rajagiriya desk will contact you at <strong>{leadContact}</strong> regarding {leadVertical}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLeadSubmitted(false);
                    setLeadName('');
                    setLeadContact('');
                    setLeadNotes('');
                  }}
                  className="text-xs font-medium text-emerald-800 hover:underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name or Business</label>
                  <input
                    type="text"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g., Nimal Jayasuriya / Lanka Guest House"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Phone or Email</label>
                  <input
                    type="text"
                    value={leadContact}
                    onChange={(e) => setLeadContact(e.target.value)}
                    placeholder="+94 77 000 0000 or email@domain.lk"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Service Interest</label>
                  <select
                    value={leadVertical}
                    onChange={(e) => setLeadVertical(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option>Home & Appliance Subscription</option>
                    <option>Auto Care Vehicle Plan</option>
                    <option>Business / SME Annual Maintenance Contract</option>
                    <option>Bulk Refurbished Equipment & ESG Diversion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Assets or Notes (Optional)</label>
                  <textarea
                    rows={3}
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="Tell us about your appliances, vehicles, or premises location..."
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                {leadError && <p className="text-xs text-red-600">{leadError}</p>}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Schedule Callback
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* QUIET FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            <div className="md:col-span-2">
              <span className="font-display text-xl font-bold text-white">FixBack</span>
              <p className="text-sm text-slate-400 mt-2 max-w-md leading-relaxed">
                {COMPANY_INFO.name} · Reg. {COMPANY_INFO.regNumber}. Subscription-based repair, preventive maintenance, guaranteed buy-back, and certified refurbishment across Sri Lanka.
              </p>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-white">Head Office</p>
              <p className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="font-mono">{COMPANY_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </p>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-white">Platform</p>
              <div className="flex flex-col space-y-1.5 text-slate-400">
                <a href="#services" className="hover:text-white">Service Verticals</a>
                <a href="#plans" className="hover:text-white">Subscription Plans</a>
                <a href="#buyback" className="hover:text-white">Buy-Back Valuation</a>
                <a href="#marketplace" className="hover:text-white">Refurbished Store</a>
                <button type="button" onClick={() => onOpenPortal('dashboard')} className="text-left hover:text-white cursor-pointer">
                  Member Portal
                </button>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
            <p>Keep it working · Repair · Maintain · Renew</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
