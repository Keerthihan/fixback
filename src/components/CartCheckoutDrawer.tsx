import { useState } from 'react';
import { X, Plus, Minus, Trash2, CheckCircle2, Truck, PackageCheck, ShieldCheck } from 'lucide-react';
import {
  RefurbishedProduct,
  MarketplaceOrder,
  SavedAddress,
  formatLkr,
} from '../data/fixbackData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: RefurbishedProduct;
  quantity: number;
}

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  addresses: SavedAddress[];
  onPlaceOrder: (order: MarketplaceOrder) => void;
  latestOrder: MarketplaceOrder | null;
}

export function CartCheckoutDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  addresses,
  onPlaceOrder,
  latestOrder,
}: CartCheckoutDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'tracking'>('cart');
  const [selectedAddress, setSelectedAddress] = useState(
    addresses[0] ? `${addresses[0].line1}, ${addresses[0].city}` : 'No. 28/4, Hospital Road, Nugegoda'
  );
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Bank Transfer' | 'Mobile Wallet'>('Card');
  const [customerPhone, setCustomerPhone] = useState('+94 77 412 8904');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.priceLkr * item.quantity, 0);
  const deliveryFee = cart.length === 0 ? 0 : deliveryOption === 'express' ? 1200 : subtotal >= 75000 ? 0 : 650;
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddress.trim() || !customerPhone.trim()) {
      setFormError('Please provide both a delivery address and contact phone number.');
      return;
    }
    setFormError('');
    const newOrder: MarketplaceOrder = {
      id: `FB-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: '2026-11-18',
      items: cart.map((c) => ({ product: c.product, quantity: c.quantity })),
      totalLkr: total,
      deliveryAddress: selectedAddress,
      paymentMethod,
      stage: 'Packed',
      eta: deliveryOption === 'express' ? 'Tomorrow by 2:00 PM' : 'Within 2–3 business days',
    };
    onPlaceOrder(newOrder);
    onClearCart();
    setStep('tracking');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[1px]" role="dialog" aria-modal="true" aria-label="Shopping cart and checkout">
      <div className="w-full max-w-md bg-white h-full flex flex-col border-l border-slate-200 shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900">
              {step === 'cart' && 'Your Shopping Cart'}
              {step === 'checkout' && 'Shop Checkout'}
              {step === 'tracking' && 'Order Tracking'}
            </h2>
            <p className="text-xs text-slate-500">
              {step === 'cart' && `${cart.reduce((s, i) => s + i.quantity, 0)} certified refurbished items`}
              {step === 'checkout' && 'Kelaniya Refurbishment Dispatch'}
              {step === 'tracking' && latestOrder ? `Order ${latestOrder.id}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep('cart');
              onClose();
            }}
            aria-label="Close cart drawer"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <PackageCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-slate-900">Your cart is empty</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Browse certified Grade A and Grade B devices tested at our Kelaniya facility.
                  </p>
                  {latestOrder && (
                    <button
                      type="button"
                      onClick={() => setStep('tracking')}
                      className="mt-5 px-4 py-2 text-xs font-medium text-emerald-800 border border-emerald-700 rounded-lg hover:bg-emerald-50 cursor-pointer"
                    >
                      Track Last Order ({latestOrder.id})
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4 pb-4 border-b border-slate-100">
                      <ResilientImage
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-20 h-20 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500">
                          {product.grade} · {product.warrantyMonths}m Warranty
                        </p>
                        <h3 className="text-sm font-semibold text-slate-900 truncate">{product.title}</h3>
                        <p className="text-sm font-mono tabular-nums text-slate-900 mt-1">
                          {formatLkr(product.priceLkr)}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center border border-slate-200 rounded-md">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(product.id, -1)}
                              aria-label={`Decrease quantity of ${product.title}`}
                              className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-mono tabular-nums text-slate-900">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(product.id, 1)}
                              aria-label={`Increase quantity of ${product.title}`}
                              className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Remove ${product.title}`}
                            className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="shop-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Delivery Address</label>
                <select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {addresses.map((addr) => (
                    <option key={addr.id} value={`${addr.line1}, ${addr.city}`}>
                      {addr.label} — {addr.line1}, {addr.city}
                    </option>
                  ))}
                  <option value="No. 142, Nawala Road, Rajagiriya (Pickup)">
                    Head Office Pickup — Nawala Road, Rajagiriya
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Contact Phone</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="+94 77 000 0000"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-700 mb-1.5">Delivery Option</span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('standard')}
                    className={`p-3 text-left rounded-lg border text-xs cursor-pointer transition-colors ${
                      deliveryOption === 'standard'
                        ? 'border-emerald-700 bg-emerald-50/50 text-slate-900'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold">Standard Delivery</p>
                    <p className="text-slate-500 mt-0.5">2–3 days · {subtotal >= 75000 ? 'Free' : 'LKR 650'}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('express')}
                    className={`p-3 text-left rounded-lg border text-xs cursor-pointer transition-colors ${
                      deliveryOption === 'express'
                        ? 'border-emerald-700 bg-emerald-50/50 text-slate-900'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold">Express Van</p>
                    <p className="text-slate-500 mt-0.5">Next day · LKR 1,200</p>
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-700 mb-1.5">Payment Method</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Card', 'Bank Transfer', 'Mobile Wallet'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2.5 px-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors whitespace-nowrap ${
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

              {formError && <p className="text-xs text-red-600">{formError}</p>}
            </form>
          )}

          {step === 'tracking' && latestOrder && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Order {latestOrder.id} Confirmed
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Estimated arrival: {latestOrder.eta}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 mb-3">Fulfilment Progress</h3>
                <div className="space-y-3">
                  {(['Placed', 'Packed', 'Shipped', 'Delivered'] as const).map((st, idx) => {
                    const activeIdx = ['Placed', 'Packed', 'Shipped', 'Delivered'].indexOf(latestOrder.stage);
                    const done = idx <= activeIdx;
                    return (
                      <div key={st} className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                            done ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1 flex items-center justify-between text-sm">
                          <span className={done ? 'font-medium text-slate-900' : 'text-slate-400'}>
                            {st}
                          </span>
                          <span className="text-xs text-slate-500">
                            {idx === 0 && 'Payment verified'}
                            {idx === 1 && 'Kelaniya QC seal applied'}
                            {idx === 2 && 'FixBack courier van'}
                            {idx === 3 && 'Customer signature'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Delivery Address</span>
                  <span className="font-medium text-slate-900 text-right max-w-[210px]">{latestOrder.deliveryAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-medium text-slate-900">{latestOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Paid</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {formatLkr(latestOrder.totalLkr)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Includes Kelaniya written warranty & QR service record transfer.</span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {(step === 'cart' && cart.length > 0) && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">{formatLkr(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-mono tabular-nums">{deliveryFee === 0 ? 'Free' : formatLkr(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="font-mono tabular-nums">{formatLkr(total)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep('checkout')}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}

        {step === 'checkout' && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex justify-between text-sm font-semibold text-slate-900">
              <span>Order Total</span>
              <span className="font-mono tabular-nums">{formatLkr(total)}</span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                form="shop-checkout-form"
                className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </div>
        )}

        {step === 'tracking' && (
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => {
                setStep('cart');
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              Continue Browsing Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
