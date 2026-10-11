import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Check, Star, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { sounds } from '../utils/soundEffects';

export default function ProductPresentation({
  activeProductIndex,
  onAddToCart,
  onQuickView,
  onOpenBooking,
  selectedColors = {},
  onColorChange,
  products = PRODUCTS
}) {
  if (activeProductIndex < 0 || !products || activeProductIndex >= products.length) {
    return null;
  }

  const product = products[activeProductIndex];
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const activeColor = selectedColors?.[product.id] || product.colors?.[0] || { name: 'Original', hex: '#d4af37', filter: '' };
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product?.id]);

  const handleColorSelect = (c) => {
    sounds.playChime(698.46, 'sine', 0.12); // F5
    if (onColorChange) {
      onColorChange(product.id, c);
    }
  };

  const handleAdd = () => {
    sounds.playChime(659.25, 'sine', 0.25); // E5
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor: activeColor
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-end px-4 sm:px-8 lg:px-16 pt-16 pb-8">
      {/* 3D Garment Interactive Hint (Center Left) */}
      <div className="hidden lg:flex absolute left-12 bottom-12 items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 text-xs text-neutral-200 shadow-xl">
        <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
        <span>Drag garment with finger or mouse for 360° rotation • Select swatches to recolor</span>
      </div>

      {/* Synchronized Luxury Product Detail Card (Right Side) */}
      <div className="w-full max-w-lg pointer-events-auto bg-[#0d0d12]/92 backdrop-blur-xl border border-[#d4af37]/35 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 transition-all duration-500 animate-fadeIn overflow-y-auto max-h-[85vh]">
        {/* Top Header: Number & Badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#d4af37] tracking-[0.25em]">
              PIECE {product.number} / 0{PRODUCTS.length}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#f5e0aa] text-[10px] font-semibold tracking-wider uppercase border border-[#d4af37]/30">
              {product.badge}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#f5e0aa]">
            <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-neutral-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title & Category with mini swatch preview */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-sans mb-1">
              {product.category}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {product.name}
            </h3>
          </div>

          {/* Mini Live Garment Swatch Preview */}
          <div className="w-14 h-18 rounded-xl bg-black/60 border border-[#d4af37]/40 p-1 flex-shrink-0 relative overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.name}
              style={{
                filter: activeColor?.filter || 'none',
                transition: 'filter 0.4s ease'
              }}
              className="w-full h-full object-contain"
            />
            {activeColor?.tint && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-400"
                style={{ backgroundColor: activeColor.tint, mixBlendMode: 'color' }}
              />
            )}
          </div>
        </div>

        <p className="text-xs text-[#f5e0aa]/90 italic mb-3">
          "{product.tagline}"
        </p>
        <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3 mb-5">
          {product.description}
        </p>

        {/* Sartorial Details Pill Grid */}
        <div className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-xl bg-black/40 border border-white/5 text-[11px]">
          <div>
            <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">Fabric</span>
            <span className="text-[#f5e0aa] font-medium">{product.material}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">Collar &amp; Cut</span>
            <span className="text-neutral-200">{product.collar}</span>
          </div>
        </div>

        {/* LIVE COLOR SELECTION SWATCHES */}
        <div className="mb-4 p-3 rounded-2xl bg-black/50 border border-white/10">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-neutral-300 font-medium flex items-center gap-1.5">
              <span>Select Colorway:</span>
              <strong className="text-[#f5e0aa]">{activeColor.name}</strong>
            </span>
            <span className="text-[10px] text-[#d4af37] font-mono tracking-wider">
              LIVE 3D RECOLOR
            </span>
          </div>
          <div className="flex items-center gap-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => handleColorSelect(c)}
                style={{ backgroundColor: c.hex }}
                className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center relative ${
                  activeColor.name === c.name
                    ? 'border-[#f5e0aa] scale-110 shadow-lg shadow-[#d4af37]/40 ring-2 ring-[#d4af37]'
                    : 'border-white/20 hover:border-white/60 hover:scale-105'
                }`}
                title={`Change color to ${c.name}`}
              >
                {activeColor.name === c.name && (
                  <Check className={`w-3.5 h-3.5 ${c.hex === '#ffffff' || c.hex === '#ece3d4' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-neutral-400 font-medium">Select Size</span>
            <button
              onClick={onOpenBooking}
              className="text-[#d4af37] text-[11px] underline hover:text-[#f5e0aa]"
            >
              Need Custom Measurements?
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wider transition-all ${
                  selectedSize === sz
                    ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                    : 'bg-[#181820] text-neutral-300 hover:bg-[#252530] border border-white/5'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing in INR */}
        <div className="flex items-baseline gap-3 mb-5 pt-3 border-t border-white/10">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-neutral-500 line-through">
            ₹{product.compareAtPrice.toLocaleString('en-IN')}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold tracking-wider">
            SAVE {discountPercent}%
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className={`flex-1 py-3.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-[#d4af37] to-[#b38328] hover:from-[#f5e0aa] hover:to-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" /> Added To Bag
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add To Bag • ₹{product.price.toLocaleString('en-IN')}
              </>
            )}
          </button>

          <button
            onClick={() => onQuickView(product)}
            title="Inspect 3D Fabric Specs & Fit Guide"
            className="w-12 h-12 rounded-xl bg-[#1a1a24] hover:bg-[#252535] border border-white/10 hover:border-[#d4af37]/50 flex items-center justify-center text-[#f5e0aa] transition-all"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Assurance badges */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#d4af37]" /> 100% Authentic Handloom
          </span>
          <span className="flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-[#d4af37]" /> 7-Day Boutique Exchange
          </span>
        </div>
      </div>
    </div>
  );
}
