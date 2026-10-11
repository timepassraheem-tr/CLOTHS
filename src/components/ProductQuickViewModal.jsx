import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, ShoppingBag, Ruler, Sparkles } from 'lucide-react';
import { generateGarmentImage } from '../utils/textureGenerator';
import { sounds } from '../utils/soundEffects';

export default function ProductQuickViewModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeTab, setActiveTab] = useState('details'); // details, sizing, reviews

  const garmentImgUrl = product.image || generateGarmentImage(
    product.garmentType,
    selectedColor.hex,
    '#d4af37'
  );

  const handleAdd = () => {
    sounds.playChime(659.25, 'sine', 0.25);
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0e0e13] border border-[#d4af37]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/10 hover:border-white/40 flex items-center justify-center text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Garment Studio Visual */}
        <div className="md:w-1/2 bg-[#09090c] p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/10">
          <div className="relative overflow-hidden rounded-2xl w-full flex items-center justify-center">
            <img
              src={garmentImgUrl}
              alt={product.name}
              style={{
                filter: selectedColor?.filter || 'none',
                transition: 'filter 0.4s ease'
              }}
              className="w-full max-h-[380px] sm:max-h-[460px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
            {selectedColor?.tint && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-400"
                style={{ backgroundColor: selectedColor.tint, mixBlendMode: 'color' }}
              />
            )}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-[#f5e0aa]/80 tracking-wider font-mono">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            STUDIO ATELIER SPECIFICATION • {selectedColor.name}
          </div>
        </div>

        {/* Right: Details & Options */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Badge & Number */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                SHOWROOM EXCLUSIVE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#f5e0aa] text-[10px] font-semibold tracking-wider uppercase border border-[#d4af37]/30">
                {product.badge}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-neutral-400 mb-4">{product.category}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-2xl font-bold text-[#f5e0aa]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-neutral-500 line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 mb-4 text-xs tracking-wider">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 mr-6 font-medium uppercase transition-colors ${
                  activeTab === 'details'
                    ? 'border-b-2 border-[#d4af37] text-[#f5e0aa]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Fabric &amp; Cut
              </button>
              <button
                onClick={() => setActiveTab('sizing')}
                className={`pb-2 mr-6 font-medium uppercase transition-colors ${
                  activeTab === 'sizing'
                    ? 'border-b-2 border-[#d4af37] text-[#f5e0aa]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Size Guide
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 font-medium uppercase transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#d4af37] text-[#f5e0aa]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Reviews ({product.reviewsCount})
              </button>
            </div>

            {/* Tab 1: Details */}
            {activeTab === 'details' && (
              <div className="space-y-3 text-xs text-neutral-300 leading-relaxed mb-6">
                <p>{product.description}</p>
                <div className="p-3 bg-white/5 rounded-xl space-y-1.5 text-[11px]">
                  <div><strong className="text-[#f5e0aa]">Material:</strong> {product.material}</div>
                  <div><strong className="text-[#f5e0aa]">Collar:</strong> {product.collar}</div>
                  <div><strong className="text-[#f5e0aa]">Cut:</strong> {product.cut}</div>
                  <div><strong className="text-[#f5e0aa]">Trims:</strong> {product.accent}</div>
                </div>
              </div>
            )}

            {/* Tab 2: Sizing Guide */}
            {activeTab === 'sizing' && (
              <div className="mb-6 text-xs text-neutral-300">
                <p className="mb-3 text-[11px] text-neutral-400">
                  Precision tailored to standard Indian &amp; International bespoke sizing:
                </p>
                <div className="border border-white/10 rounded-xl overflow-hidden text-[11px]">
                  <div className="grid grid-cols-4 bg-white/5 p-2 font-semibold text-[#f5e0aa]">
                    <span>Size</span>
                    <span>Chest (in)</span>
                    <span>Waist (in)</span>
                    <span>Length (in)</span>
                  </div>
                  <div className="grid grid-cols-4 p-2 border-t border-white/5">
                    <span>38 (S)</span><span>38 - 39</span><span>32 - 33</span><span>42</span>
                  </div>
                  <div className="grid grid-cols-4 p-2 border-t border-white/5 bg-white/[0.02]">
                    <span>40 (M)</span><span>40 - 41</span><span>34 - 35</span><span>43</span>
                  </div>
                  <div className="grid grid-cols-4 p-2 border-t border-white/5">
                    <span>42 (L)</span><span>42 - 43</span><span>36 - 37</span><span>44</span>
                  </div>
                  <div className="grid grid-cols-4 p-2 border-t border-white/5 bg-white/[0.02]">
                    <span>44 (XL)</span><span>44 - 45</span><span>38 - 39</span><span>45</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-3 mb-6 text-xs text-neutral-300 max-h-40 overflow-y-auto">
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#f5e0aa]">Vikramaditya S.</span>
                    <span className="text-[10px] text-neutral-500">Verified Client • New Delhi</span>
                  </div>
                  <div className="flex text-[#d4af37] mb-1">★★★★★</div>
                  <p className="text-[11px] text-neutral-300">
                    "The fabric quality and fall are unmatched. Visited their flagship showroom and the final fitting was perfection."
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#f5e0aa]">Sameer K.</span>
                    <span className="text-[10px] text-neutral-500">Verified Client • Mumbai</span>
                  </div>
                  <div className="flex text-[#d4af37] mb-1">★★★★★</div>
                  <p className="text-[11px] text-neutral-300">
                    "Exceptional zardozi detailing on the collar. Feels genuinely regal."
                  </p>
                </div>
              </div>
            )}

            {/* Color Swatches */}
            <div className="mb-4">
              <span className="text-[11px] text-neutral-400 block mb-1.5">Color: {selectedColor.name}</span>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor.name === c.name
                        ? 'border-[#d4af37] scale-110'
                        : 'border-white/20'
                    }`}
                  >
                    {selectedColor.name === c.name && (
                      <Check className={`w-3 h-3 ${c.hex === '#ffffff' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="mb-6">
              <span className="text-[11px] text-neutral-400 block mb-1.5">Size</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedSize === sz
                        ? 'bg-[#d4af37] text-black font-semibold'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Bag CTA */}
          <button
            onClick={handleAdd}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38328] hover:from-[#f5e0aa] hover:to-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 transition-all hover:scale-[1.01]"
          >
            <ShoppingBag className="w-4 h-4" /> Add To Bag • ₹{product.price.toLocaleString('en-IN')}
          </button>
        </div>
      </div>
    </div>
  );
}
