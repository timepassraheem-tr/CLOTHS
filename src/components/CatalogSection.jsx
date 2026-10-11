import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Eye, Star, ShieldCheck, Sparkles, MapPin, Phone, Mail, Clock, ArrowRight, Heart, Plus, Edit3, Trash2 } from 'lucide-react';
import { PRODUCTS, SHOWROOM_INFO } from '../data/products';
import { generateGarmentImage } from '../utils/textureGenerator';
import { sounds } from '../utils/soundEffects';

export default function CatalogSection({
  products = PRODUCTS,
  isAdmin = false,
  onEditProduct,
  onDeleteProduct,
  onOpenAddProduct,
  onAddToCart,
  onQuickView,
  onOpenBooking,
  scrollY = 0
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState({});
  const sectionRef = useRef(null);
  // Compute local scroll offset within catalog section directly from scrollY
  const sectionOffset = Math.max(0, scrollY - 5500);

  const rawCategories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const categories = ['All', 'Party Wear', ...rawCategories.filter((c) => c !== 'Party Wear')];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : selectedCategory === 'Party Wear'
      ? products.filter((p) => (p.badge && p.badge.toLowerCase().includes('party')) || (p.category && p.category.toLowerCase().includes('party')) || (p.category && p.category.toLowerCase().includes('cocktail')) || (p.category && p.category.toLowerCase().includes('sangeet')))
      : products.filter((p) => p.category === selectedCategory);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    sounds.playChime(659.25, 'sine', 0.15);
  };

  // Parallax rates
  const watermarkOffset1 = (scrollY * 0.12) % 300;
  const watermarkOffset2 = (scrollY * -0.09) % 300;
  const col1Parallax = (sectionOffset * -0.04);
  const col2Parallax = (sectionOffset * -0.08);
  const col3Parallax = (sectionOffset * -0.03);

  return (
    <section
      ref={sectionRef}
      id="collection-section"
      className="relative z-20 text-white pt-28 pb-20 px-6 lg:px-16 overflow-hidden border-t border-[#d4af37]/30 bg-black/60 backdrop-blur-md"
    >
      {/* ======================================================== */}
      {/* 1. BACKGROUND FLOATING PARALLAX WATERMARK TYPOGRAPHY */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div
          className="absolute -top-10 -left-20 font-serif text-[14vw] font-bold text-[#d4af37]/[0.03] uppercase whitespace-nowrap tracking-widest transition-transform duration-75"
          style={{ transform: `translate3d(${watermarkOffset1}px, ${watermarkOffset1 * 0.5}px, 0)` }}
        >
          RAHEEM SHOWROOM
        </div>
        <div
          className="absolute top-1/2 -right-40 font-serif text-[12vw] font-bold text-[#f5e0aa]/[0.025] uppercase whitespace-nowrap tracking-widest transition-transform duration-75"
          style={{ transform: `translate3d(${watermarkOffset2}px, ${watermarkOffset2 * -0.4}px, 0)` }}
        >
          HAUTE COUTURE
        </div>
        <div
          className="absolute bottom-10 left-10 font-serif text-[11vw] font-bold text-[#d4af37]/[0.02] uppercase whitespace-nowrap tracking-widest transition-transform duration-75"
          style={{ transform: `translate3d(${watermarkOffset1 * -0.5}px, 0, 0)` }}
        >
          DELHI ATELIER • 1994
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Parallax Float */}
        <div
          className="text-center max-w-2xl mx-auto mb-16 transition-transform duration-100"
          style={{ transform: `translateY(${sectionOffset * -0.02}px)` }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-[#121217]/80 backdrop-blur-md mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#f5e0aa] uppercase">
              THE FULL BOUTIQUE COLLECTION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow-md">
            Handcrafted Haute Couture
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Every garment in our Delhi showroom is cut individually from rare heritage mill textiles, tailored to contour with natural grace and unmatched longevity.
          </p>
        </div>

        {/* Admin Quick Action Banner (When Logged in as Admin) */}
        {isAdmin && (
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#14141d]/90 border border-[#d4af37]/40 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shadow-xl shadow-black/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#f5e0aa] uppercase tracking-wider">
                    Administrator Mode Active
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-neutral-300">
                  Total {products.length} garments in database • Direct CRUD controls enabled on all cards below.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenAddProduct}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f5e0aa] hover:from-[#c5a030] hover:to-[#e6d095] text-black font-semibold text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-[#d4af37]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Add New Garment
            </button>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all uppercase backdrop-blur-sm ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b38328] text-black font-semibold shadow-lg shadow-[#d4af37]/25 scale-105'
                  : 'bg-[#14141a]/80 text-neutral-400 hover:text-white hover:bg-[#1f1f28] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 2. PRODUCTS GRID WITH STAGGERED COLUMN PARALLAX */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
          {filteredProducts.map((product, index) => {
            const cardImg = product.image || generateGarmentImage(
              product.garmentType,
              product.colors[0].hex,
              '#d4af37'
            );

            // Staggered column parallax offset
            const colIndex = index % 3;
            const parallaxShift = colIndex === 0
              ? col1Parallax
              : colIndex === 1
                ? col2Parallax
                : col3Parallax;

            return (
              <div
                key={product.id}
                className="group relative bg-[#111116]/85 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-[#d4af37]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl hover:shadow-[#d4af37]/20"
                style={{
                  transform: `translateY(${parallaxShift}px)`,
                  willChange: 'transform'
                }}
              >
                {/* Image Container with Badges */}
                <div className="relative bg-black/50 p-6 flex items-center justify-center overflow-hidden border-b border-white/5">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/30 text-[#f5e0aa] text-[9px] font-semibold tracking-widest uppercase">
                      {product.badge}
                    </span>
                  </div>

                  {/* Top Right Actions (Favorites + Admin Quick Controls) */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                    {isAdmin && (
                      <div className="flex items-center gap-1 bg-black/85 backdrop-blur-md px-1.5 py-1 rounded-full border border-[#d4af37]/40 shadow-lg">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onEditProduct) onEditProduct(product);
                          }}
                          title="Edit this Garment (Admin)"
                          className="w-6 h-6 rounded-full hover:bg-[#d4af37]/30 flex items-center justify-center text-[#f5e0aa] hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onDeleteProduct) onDeleteProduct(product.id);
                          }}
                          title="Delete this Garment (Admin)"
                          className="w-6 h-6 rounded-full hover:bg-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#d4af37] transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites[product.id] ? 'fill-[#d4af37] text-[#d4af37]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <img
                    src={cardImg}
                    alt={product.name}
                    className="w-full h-72 object-contain group-hover:scale-108 transition-transform duration-700 drop-shadow-xl"
                  />

                  {/* Quick View Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-3 px-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onQuickView(product)}
                      className="px-4 py-2 rounded-full bg-black/90 backdrop-blur-md border border-[#d4af37]/40 text-[#f5e0aa] text-xs font-medium tracking-wider flex items-center gap-1.5 shadow-xl hover:bg-[#d4af37] hover:text-black transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" /> Quick View &amp; Specs
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                      <span className="uppercase tracking-widest">{product.category}</span>
                      <div className="flex items-center gap-1 text-[#d4af37]">
                        <Star className="w-3 h-3 fill-[#d4af37]" />
                        <span className="font-semibold">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#f5e0aa] transition-colors mb-1.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    <div className="text-[11px] text-[#d4af37]/90 mb-4">
                      Fabric: <span className="text-neutral-200">{product.material}</span>
                    </div>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <span className="text-[10px] text-neutral-400 mr-1">Tones:</span>
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shadow-sm"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Cart CTA */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-xl font-bold text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-neutral-400 line-through block">
                        ₹{product.compareAtPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart({
                        ...product,
                        selectedSize: product.sizes[0],
                        selectedColor: product.colors[0]
                      })}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38328] hover:from-[#f5e0aa] hover:to-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center border border-dashed border-[#d4af37]/30 rounded-3xl bg-[#101016]/60 backdrop-blur-md max-w-xl mx-auto my-12 p-8">
            <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto mb-3 opacity-60" />
            <h4 className="font-serif text-xl font-bold text-[#f5e0aa] mb-2">No Garments in this Category</h4>
            <p className="text-xs text-neutral-400 mb-6">There are currently no items listed under "{selectedCategory}".</p>
            {isAdmin ? (
              <button
                onClick={onOpenAddProduct}
                className="px-4 py-2.5 rounded-full bg-[#d4af37] text-black text-xs font-bold tracking-wider hover:bg-[#e6c35c] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Garment Here
              </button>
            ) : (
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-4 py-2 rounded-full border border-white/20 text-neutral-300 text-xs hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
              >
                View All Collection
              </button>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. CRAFTSMANSHIP BANNER WITH INTERNAL PARALLAX WINDOW */}
        {/* ======================================================== */}
        <div className="my-24 rounded-3xl border border-[#d4af37]/40 p-8 sm:p-14 relative overflow-hidden shadow-2xl bg-black/60 backdrop-blur-xl">
          {/* Inner parallax image layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 transition-transform duration-75"
            style={{
              backgroundImage: `url(${SHOWROOM_INFO.almiraImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${sectionOffset * 0.08}px) scale(1.15)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-transparent pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#d4af37] uppercase mb-2 block">
              THREE DECADES OF MASTERY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              The Art of Raheem Tailoring
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-6 font-light">
              Since 1994, Raheem Cloths Showroom has outfitted royalty, statesmen, and discerning connoisseurs across the globe. Every sherwani, tuxedo, and kurta undergoes over 40 hours of hand stitching, floating canvas shaping, and triple-steam pressing to ensure a silhouette that belongs uniquely to you.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 mb-8">
              {SHOWROOM_INFO.perks.map((perk, i) => (
                <div key={i} className="text-left">
                  <h5 className="font-serif text-xs font-bold text-[#f5e0aa] mb-1">{perk.title}</h5>
                  <p className="text-[10px] text-neutral-300 leading-normal">{perk.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 rounded-full bg-[#d4af37] hover:bg-[#f5e0aa] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all hover:scale-105"
            >
              Reserve Private Atelier Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. CLIENT TESTIMONIALS WITH 3D FLOATING CARDS */}
        {/* ======================================================== */}
        <div className="mb-28">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
              DISTINGUISHED PATRONS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Testimonials from Our Private Salon
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="p-6 rounded-2xl bg-[#111116]/80 backdrop-blur-md border border-white/10 space-y-3 shadow-xl transition-transform duration-100"
              style={{ transform: `translateY(${sectionOffset * -0.03}px)` }}
            >
              <div className="flex text-[#d4af37] text-sm">★★★★★</div>
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                "The velvet sherwani for my wedding was breathtaking. The weight, the zardozi luster, and the fit were immaculate. Raheem Cloths Showroom sets the benchmark for Indian luxury."
              </p>
              <div className="pt-2 border-t border-white/5">
                <div className="font-serif text-sm font-semibold text-[#f5e0aa]">Karan Singhania</div>
                <div className="text-[10px] text-neutral-400">Bespoke Wedding Groom • New Delhi</div>
              </div>
            </div>

            <div
              className="p-6 rounded-2xl bg-[#111116]/80 backdrop-blur-md border border-white/10 space-y-3 shadow-xl transition-transform duration-100"
              style={{ transform: `translateY(${sectionOffset * -0.06}px)` }}
            >
              <div className="flex text-[#d4af37] text-sm">★★★★★</div>
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                "Their Super 140s wool tuxedo fits sharper than Savile Row. Seamless showroom service with private trial salon and single-needle tailoring."
              </p>
              <div className="pt-2 border-t border-white/5">
                <div className="font-serif text-sm font-semibold text-[#f5e0aa]">Rohan Malhotra</div>
                <div className="text-[10px] text-neutral-400">Managing Partner • London / Delhi</div>
              </div>
            </div>

            <div
              className="p-6 rounded-2xl bg-[#111116]/80 backdrop-blur-md border border-white/10 space-y-3 shadow-xl transition-transform duration-100"
              style={{ transform: `translateY(${sectionOffset * -0.02}px)` }}
            >
              <div className="flex text-[#d4af37] text-sm">★★★★★</div>
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                "The pure Belgian linen kurta sets are my daily summer staple. Incredible craftsmanship, breathable elegance, and genuine horn buttons."
              </p>
              <div className="pt-2 border-t border-white/5">
                <div className="font-serif text-sm font-semibold text-[#f5e0aa]">Arjun Roy</div>
                <div className="text-[10px] text-neutral-400">Art Curator • South Delhi</div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. LUXURY SHOWROOM FOOTER */}
        {/* ======================================================== */}
        <footer className="pt-16 border-t border-white/15">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-[#d4af37] bg-[#16161f] flex items-center justify-center font-serif text-[#d4af37] text-xs font-bold">
                  R
                </div>
                <h4 className="font-serif text-base font-bold text-white tracking-wider">
                  RAHEEM CLOTHS SHOWROOM
                </h4>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                India's premier 3D digital &amp; physical flagship boutique for bespoke sartorial creations and heritage craftsmanship.
              </p>
              <div className="text-[11px] text-[#d4af37] font-mono">
                ESTABLISHED 1994 • NEW DELHI
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-serif text-sm font-semibold text-[#f5e0aa] uppercase tracking-wider">
                Boutique Address
              </h5>
              <div className="text-xs text-neutral-300 space-y-2">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>{SHOWROOM_INFO.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span>{SHOWROOM_INFO.hours}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-serif text-sm font-semibold text-[#f5e0aa] uppercase tracking-wider">
                VIP Concierge
              </h5>
              <div className="text-xs text-neutral-300 space-y-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>{SHOWROOM_INFO.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#d4af37]" />
                  <span>{SHOWROOM_INFO.email}</span>
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="mt-2 text-xs text-[#d4af37] hover:underline flex items-center gap-1"
              >
                Schedule Private Fitting Room <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              <h5 className="font-serif text-sm font-semibold text-[#f5e0aa] uppercase tracking-wider">
                Exclusive Gazette
              </h5>
              <p className="text-xs text-neutral-300">
                Receive private invitations to seasonal handloom drops and bespoke previews.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your royal email"
                  className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] flex-1"
                />
                <button
                  onClick={() => alert("Welcome to the Raheem Cloths Showroom Royal Circle.")}
                  className="px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold uppercase rounded-xl hover:bg-[#f5e0aa]"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-4">
            <div>
              © 2026 Raheem Cloths Showroom. All Rights Reserved. Master Sartorial Atelier.
            </div>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Bespoke Terms</a>
              <a href="#concierge" className="hover:text-white transition-colors">Doorstep Trials</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
