/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar, AppView } from './components/Navbar';
import { PublicWebsite } from './components/PublicWebsite';
import { MemberPortal, PortalTab } from './components/MemberPortal';
import { CartCheckoutDrawer, CartItem } from './components/CartCheckoutDrawer';
import { PlanCheckoutModal } from './components/PlanCheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthOnboardingModal } from './components/AuthOnboardingModal';
import {
  SUBSCRIPTION_PLANS,
  INITIAL_ASSETS,
  INITIAL_ACTIVE_REPAIR,
  REFURBISHED_PRODUCTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ADDRESSES,
  SubscriptionPlan,
  RegisteredAsset,
  RepairBooking,
  RefurbishedProduct,
  NotificationItem,
  SavedAddress,
  MarketplaceOrder,
} from './data/fixbackData';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('website');
  const [portalTab, setPortalTab] = useState<PortalTab>('dashboard');

  // Shared platform state
  const [user, setUser] = useState({
    name: 'Kasun Perera',
    email: 'kasun.perera@gmail.com',
    phone: '+94 77 412 8904',
  });
  const [activePlan, setActivePlan] = useState<SubscriptionPlan>(SUBSCRIPTION_PLANS[1]); // Home Plus
  const [assets, setAssets] = useState<RegisteredAsset[]>(INITIAL_ASSETS);
  const [activeRepair, setActiveRepair] = useState<RepairBooking>(INITIAL_ACTIVE_REPAIR);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);

  // Marketplace & Cart state
  const [cart, setCart] = useState<CartItem[]>([
    { product: REFURBISHED_PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<MarketplaceOrder[]>([]);
  const [inspectedProduct, setInspectedProduct] = useState<RefurbishedProduct | null>(null);

  // Plan checkout modal
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<{
    plan: SubscriptionPlan;
    cycle: 'monthly' | 'annual';
  } | null>(null);

  // Auth / Onboarding modal
  const [authModal, setAuthModal] = useState<{
    open: boolean;
    mode: 'onboarding' | 'login' | 'signup';
  }>({ open: false, mode: 'login' });

  const handleNavigateWebsite = (sectionId?: string) => {
    setActiveView('website');
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 40);
    }
  };

  const handleOpenPortal = (tab: string = 'dashboard') => {
    setPortalTab(tab as PortalTab);
    setActiveView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: RefurbishedProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activeView={activeView}
        onNavigateWebsite={handleNavigateWebsite}
        onOpenPortal={handleOpenPortal}
        onBookRepair={() => handleOpenPortal('book')}
      />

      <main className="flex-1">
        {activeView === 'website' ? (
          <PublicWebsite
            onSelectPlan={(plan, cycle) => setSelectedPlanForModal({ plan, cycle })}
            onOpenPortal={handleOpenPortal}
            onAddToCart={handleAddToCart}
            onInspectProduct={(p) => setInspectedProduct(p)}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartCount}
            activePlanId={activePlan.id}
          />
        ) : (
          <MemberPortal
            activeTab={portalTab}
            onChangeTab={setPortalTab}
            user={user}
            onUpdateUser={setUser}
            activePlan={activePlan}
            onOpenPlanModal={(plan) => setSelectedPlanForModal({ plan, cycle: 'monthly' })}
            allPlans={SUBSCRIPTION_PLANS}
            assets={assets}
            onAddAsset={(asset) => setAssets((prev) => [asset, ...prev])}
            activeRepair={activeRepair}
            onUpdateRepair={setActiveRepair}
            notifications={notifications}
            onMarkAllRead={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
            addresses={addresses}
            onAddAddress={(addr) => setAddresses((prev) => [...prev, addr])}
            orders={orders}
            products={REFURBISHED_PRODUCTS}
            onAddToCart={handleAddToCart}
            onInspectProduct={(p) => setInspectedProduct(p)}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartCount}
            onOpenAuthModal={(mode) => setAuthModal({ open: true, mode })}
          />
        )}
      </main>

      <CartCheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        addresses={addresses}
        onPlaceOrder={(order) => setOrders((prev) => [order, ...prev])}
        latestOrder={orders[0] || null}
      />

      <ProductDetailModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <PlanCheckoutModal
        plan={selectedPlanForModal?.plan || null}
        billingCycle={selectedPlanForModal?.cycle || 'monthly'}
        onClose={() => setSelectedPlanForModal(null)}
        onConfirmSubscription={(plan) => setActivePlan(plan)}
        onGoToPortal={() => handleOpenPortal('dashboard')}
      />

      <AuthOnboardingModal
        isOpen={authModal.open}
        initialMode={authModal.mode}
        onClose={() => setAuthModal((prev) => ({ ...prev, open: false }))}
        onAuthenticated={(u) => setUser(u)}
      />
    </div>
  );
}
