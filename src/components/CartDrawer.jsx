import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateGarmentImage } from '../utils/textureGenerator';
import { sounds } from '../utils/soundEffects';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'RAHEEMROYAL' || promoCode.trim().toUpperCase() === 'ROYAL') {
      setDiscountApplied(true);
      sounds.playChime(783.99, 'sine', 0.3); // G5
    } else {
      alert("Try promo code: RAHEEMROYAL for 10% boutique privilege savings");
    }
  };

  const handleCheckout = () => {
    sounds.playChime(880, 'triangle', 0.5); // A5 celebration
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f5e0aa', '#ffffff', '#b38328']
    });
    setCheckoutComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e13] border-l border-[#d4af37]/30 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#181822] border border-[#d4af37]/40 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  YOUR BOUTIQUE BAG
                </h3>
                <p className="text-[10px] text-neutral-400 tracking-widest font-mono">
                  {cartItems.length} {cartItems.length === 1 ? 'PIECE' : 'PIECES'} SELECTED
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkoutComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#f5e0aa]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl text-white">Order Confirmed</h4>
                <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
                  Thank you for shopping at <strong>Raheem Cloths Showroom</strong>. Your personal concierge has been notified to prepare your bespoke garments.
                </p>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-[#f5e0aa] text-left">
                  <div className="font-mono text-[10px] text-neutral-500 mb-1">CONCIERGE DESK</div>
                  <div className="font-medium">+91 98765 43210</div>
                  <div className="text-[11px] text-neutral-400">Order Reference: #RCS-{(Math.random() * 90000 + 10000).toFixed(0)}</div>
                </div>
                <button
                  onClick={() => {
                    onClearCart();
                    setCheckoutComplete(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f5e0aa]"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto stroke-[1.5]" />
                <p className="font-serif text-lg text-neutral-400">Your bag is currently empty</p>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our 3D showroom collection and add handcrafted sartorial pieces.
                </p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}-${idx}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-black/40 border border-white/10 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 bg-[#121216] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || generateGarmentImage(item.garmentType, item.selectedColor.hex)}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-sm font-semibold text-white truncate">
                      {item.name}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                      <span>Size: {item.selectedSize}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                    <div className="font-serif text-xs font-bold text-[#f5e0aa] mt-1.5">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedSize, item.selectedColor.name)}
                      className="text-neutral-500 hover:text-red-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-white/5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs hover:bg-white/10 text-neutral-300"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs text-white font-mono">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs hover:bg-white/10 text-neutral-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Section */}
          {!checkoutComplete && cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
              {/* Promo code box */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Privilege code (RAHEEMROYAL)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder:normal-case placeholder:text-neutral-500 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-[#f5e0aa] rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Apply
                </button>
              </form>

              {discountApplied && (
                <div className="text-[11px] text-emerald-400 flex items-center justify-between">
                  <span>10% Royal Privilege Savings applied</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Delivery (India)</span>
                  <span className="text-[#d4af37]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-[#f5e0aa]">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38328] hover:from-[#f5e0aa] hover:to-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 transition-all hover:scale-[1.01]"
              >
                Proceed To Secure Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                Secure 256-bit Encrypted Luxury Gateway
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
