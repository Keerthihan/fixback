import { X, Check, ShieldCheck, QrCode } from 'lucide-react';
import { RefurbishedProduct, formatLkr } from '../data/fixbackData';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: RefurbishedProduct | null;
  onClose: () => void;
  onAddToCart: (product: RefurbishedProduct) => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  const savingsLkr = product.originalPriceLkr - product.priceLkr;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[1px] p-4" role="dialog" aria-modal="true" aria-label={product.title}>
      <div className="bg-white w-full max-w-3xl rounded-xl border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Product Photography */}
        <div className="bg-slate-100 relative min-h-[260px]">
          <ResilientImage
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-slate-500">
                {product.category} · {product.grade} · {product.warrantyMonths}-Month Warranty
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close product details"
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-display text-xl font-semibold text-slate-900 mt-2">
              {product.title}
            </h3>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                {formatLkr(product.priceLkr)}
              </span>
              <span className="font-mono text-xs text-slate-400 line-through tabular-nums">
                {formatLkr(product.originalPriceLkr)}
              </span>
              <span className="text-xs font-medium text-emerald-700">
                Save {formatLkr(savingsLkr)}
              </span>
            </div>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              {product.conditionSummary}
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-2">Verified Specifications</p>
              <ul className="space-y-1.5">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-slate-500" />
                Digital Service Record: <strong className="font-mono text-slate-900">{product.qrRecordId}</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Kelaniya QC Pass
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              Add to Cart — {formatLkr(product.priceLkr)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
