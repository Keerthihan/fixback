import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type AppView = 'website' | 'portal';

interface NavbarProps {
  activeView: AppView;
  onNavigateWebsite: (sectionId?: string) => void;
  onOpenPortal: (tab?: string) => void;
  onBookRepair: () => void;
}

export function Navbar({
  activeView,
  onNavigateWebsite,
  onOpenPortal,
  onBookRepair,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleWebsiteLink = (sectionId: string) => {
    setMobileOpen(false);
    onNavigateWebsite(sectionId);
  };

  const handlePortalLink = () => {
    setMobileOpen(false);
    onOpenPortal('dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark only */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleWebsiteLink('top');
          }}
          className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
        >
          FixBack
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600" aria-label="Primary navigation">
          <button
            type="button"
            onClick={() => handleWebsiteLink('services')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
              activeView === 'website'
                ? 'border-transparent hover:border-slate-900 hover:text-slate-900'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => handleWebsiteLink('plans')}
            className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Plans
          </button>
          <button
            type="button"
            onClick={() => handleWebsiteLink('buyback')}
            className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Buy-Back
          </button>
          <button
            type="button"
            onClick={() => handleWebsiteLink('marketplace')}
            className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900 hover:text-slate-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Marketplace
          </button>
          <button
            type="button"
            onClick={handlePortalLink}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
              activeView === 'portal'
                ? 'border-emerald-700 text-emerald-800 font-semibold'
                : 'border-transparent hover:border-slate-900 hover:text-slate-900'
            }`}
          >
            Member Portal
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onBookRepair();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Book Repair
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          <button
            type="button"
            onClick={() => handleWebsiteLink('services')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => handleWebsiteLink('plans')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Plans
          </button>
          <button
            type="button"
            onClick={() => handleWebsiteLink('buyback')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Buy-Back
          </button>
          <button
            type="button"
            onClick={() => handleWebsiteLink('marketplace')}
            className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Marketplace
          </button>
          <button
            type="button"
            onClick={handlePortalLink}
            className="block w-full text-left px-3 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg"
          >
            Member Portal
          </button>
        </div>
      )}
    </header>
  );
}
