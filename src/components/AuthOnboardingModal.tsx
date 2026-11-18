import { useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthOnboardingModalProps {
  isOpen: boolean;
  initialMode?: 'onboarding' | 'login' | 'signup';
  onClose: () => void;
  onAuthenticated: (user: { name: string; email: string; phone: string }) => void;
}

const ONBOARDING_SLIDES = [
  {
    step: '01',
    title: 'Reliable repairs, made simple',
    body: 'Book certified NVQ Level 4 technicians for household electronics, vehicles, and home repairs in a few taps — with published price bands and written warranties.',
  },
  {
    step: '02',
    title: 'Keep every asset in good shape',
    body: 'Every registered appliance or vehicle receives a QR-coded digital service record, scheduled preventive maintenance alerts, and verified parts history.',
  },
  {
    step: '03',
    title: 'Repair, trade in, reuse',
    body: 'Get guaranteed buy-back valuations powered by your service history, or shop Grade A and B certified refurbished devices from our Kelaniya facility.',
  },
];

export function AuthOnboardingModal({
  isOpen,
  initialMode = 'login',
  onClose,
  onAuthenticated,
}: AuthOnboardingModalProps) {
  const [mode, setMode] = useState<'onboarding' | 'login' | 'signup' | 'otp' | 'forgot'>(initialMode);
  const [slideIdx, setSlideIdx] = useState(0);
  const [fullName, setFullName] = useState('Kasun Perera');
  const [phone, setPhone] = useState('+94 77 412 8904');
  const [email, setEmail] = useState('kasun.perera@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [otp, setOtp] = useState('482910');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticated({ name: fullName, email, phone });
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticated({ name: fullName, email, phone });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px] p-4" role="dialog" aria-modal="true" aria-label="Account access and onboarding">
      <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <span className="font-display font-bold text-slate-900">FixBack Account</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {mode === 'onboarding' && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <p className="text-xs font-mono text-emerald-700 font-semibold">
                  Step {ONBOARDING_SLIDES[slideIdx].step} / 03
                </p>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {ONBOARDING_SLIDES[slideIdx].title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {ONBOARDING_SLIDES[slideIdx].body}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {ONBOARDING_SLIDES.map((s, i) => (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setSlideIdx(i)}
                      aria-label={`Onboarding step ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i === slideIdx ? 'w-6 bg-emerald-700' : 'w-2 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (slideIdx < 2) setSlideIdx(slideIdx + 1);
                    else setMode('login');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  {slideIdx < 2 ? 'Continue' : 'Get Started'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">Welcome back</h3>
                <p className="text-xs text-slate-500 mt-0.5">Sign in to manage registered assets, repairs & buy-back quotes.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Phone number or Email</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-emerald-700 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg cursor-pointer"
              >
                Log in
              </button>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <button type="button" onClick={() => setMode('signup')} className="hover:text-slate-900 font-medium cursor-pointer">
                  Create FixBack account
                </button>
                <button type="button" onClick={() => setMode('onboarding')} className="text-emerald-700 hover:underline cursor-pointer">
                  View App Tour
                </button>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">Create your FixBack account</h3>
                <p className="text-xs text-slate-500 mt-0.5">Verify your mobile number to activate QR asset records.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Phone number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg cursor-pointer"
              >
                Create account
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Already have an account? Log in
              </button>
            </form>
          )}

          {mode === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">Verify your phone number</h3>
                <p className="text-xs text-slate-500 mt-1">Enter the 6-digit verification code sent to {phone}.</p>
              </div>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 text-center text-xl font-mono tracking-[0.4em] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg cursor-pointer"
              >
                Verify & Continue
              </button>
            </form>
          )}

          {mode === 'forgot' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">Reset your password</h3>
                <p className="text-xs text-slate-500 mt-1">Enter your registered email or phone to receive a reset code.</p>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg"
              />
              {forgotSent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Reset code dispatched to {email}.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg cursor-pointer"
                >
                  Send reset code
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setForgotSent(false);
                  setMode('login');
                }}
                className="w-full text-center text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Back to log in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
