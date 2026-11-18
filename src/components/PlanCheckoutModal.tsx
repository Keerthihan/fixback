import { useState } from 'react';
import { X, Check, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SubscriptionPlan, formatLkr } from '../data/fixbackData';

interface PlanCheckoutModalProps {
  plan: SubscriptionPlan | null;
  billingCycle: 'monthly' | 'annual';
  onClose: () => void;
  onConfirmSubscription: (plan: SubscriptionPlan, billingCycle: 'monthly' | 'annual') => void;
  onGoToPortal: () => void;
}

export function PlanCheckoutModal({
  plan,
  billingCycle,
  onClose,
  onConfirmSubscription,
  onGoToPortal,
}: PlanCheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'checkout' | 'success'>('details');
  const [cycle, setCycle] = useState<'monthly' | 'annual'>(billingCycle);
  const [billingAddress, setBillingAddress] = useState('No. 28/4, Hospital Road, Nugegoda');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Bank' | 'Wallet'>('Card');

  if (!plan) return null;

  const payableLkr = cycle === 'monthly' ? plan.monthlyPriceLkr : plan.annualPriceLkr;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSubscription(plan, cycle);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] p-4" role="dialog" aria-modal="true" aria-label={`${plan.name} plan subscription`}>
      <div className="bg-white w-full max-w-lg rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">
              {step === 'details' && 'Plan Details & Coverage'}
              {step === 'checkout' && 'Confirm Subscription'}
              {step === 'success' && 'Subscription Activated'}
            </p>
            <h3 className="font-display text-lg font-semibold text-slate-900">{plan.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-5">
              <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="font-display text-3xl font-bold text-slate-900 font-mono tabular-nums">
                    {formatLkr(payableLkr)}
                  </span>
                  <span className="text-sm text-slate-500 ml-1.5">
                    / {cycle === 'monthly' ? 'month' : 'year (1 month free)'}
                  </span>
                </div>
                <div className="inline-flex p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setCycle('monthly')}
                    className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                      cycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setCycle('annual')}
                    className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                      cycle === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Annual
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-slate-500">Asset Allowance</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{plan.assetLimit}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-slate-500">SLA Response</p>
                  <p className="font-semibold text-slate-900 mt-0.5">{plan.responseWindow}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2.5">Included Benefits</p>
                <ul className="space-y-2">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                Includes automatic credit on missed SLA windows and continuous buy-back loyalty accrual. Cancel anytime.
              </p>

              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Subscribe Now
              </button>
            </div>
          )}

          {step === 'checkout' && (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{plan.name}</p>
                  <p className="text-xs text-slate-500">
                    {cycle === 'monthly' ? 'Monthly auto-renewal' : 'Annual prepayment (12 months for price of 11)'}
                  </p>
                </div>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {formatLkr(payableLkr)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Billing Address</label>
                <input
                  type="text"
                  required
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-700 mb-1.5">Payment Method</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Card', 'Bank', 'Wallet'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2.5 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
                        paymentMethod === method
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Compliant with Personal Data Protection Act No. 09 of 2022.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Pay and Subscribe ({formatLkr(payableLkr)})
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-slate-900">You are now subscribed</h4>
                <p className="text-sm text-slate-600 mt-1">
                  {plan.name} is active. You can register your assets and schedule your first preventive maintenance visit now.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg text-left text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span className="font-semibold text-slate-900">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">{formatLkr(payableLkr)} / {cycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <div className="flex justify-between">
                  <span>SLA Guarantee</span>
                  <span className="font-semibold text-slate-900">{plan.responseWindow}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToPortal();
                }}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Go to Member Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
