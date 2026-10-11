import React, { useState } from 'react';
import {
  X, Plus, Trash2, Edit3, Save, RotateCcw, Search, Check,
  Package, DollarSign, Tag, Sparkles, AlertCircle, LogOut,
  Sliders, Image, ArrowUpRight, ShieldCheck, Eye
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const PRESET_IMAGE_OPTIONS = [
  { label: 'Royal Sherwani', value: '/assets/cloth_sherwani_cutout.png' },
  { label: 'Indo-Western Achkan', value: '/assets/cloth_achkan_cutout.png' },
  { label: 'Banarasi Jodhpuri', value: '/assets/cloth_jodhpuri_cutout.png' },
  { label: 'Mirror-Work Kurta', value: '/assets/cloth_mirror_kurta_cutout.png' },
  { label: 'Raw Silk Bandhgala', value: '/assets/cloth_bandhgala_cutout.png' },
  { label: 'Italian Wool Tuxedo', value: '/assets/cloth_tuxedo_cutout.png' },
  { label: 'Pure Linen Kurta', value: '/assets/cloth_kurta_cutout.png' },
  { label: 'Pashmina Nehru Vest', value: '/assets/cloth_vest_cutout.png' },
  { label: 'Egyptian Giza Shirt', value: '/assets/cloth_shirt_cutout.png' }
];

const CATEGORY_PRESETS = [
  'Party Wear',
  'Luxury Festive Party Wear',
  'Imperial Evening & Cocktail',
  'Festive Sangeet & Reception',
  'Bespoke Festive & Wedding',
  'Formal Couture',
  'Modern Evening Wear',
  'Artisanal Layering',
  'Executive Essentials'
];

const BADGE_PRESETS = [
  'Party Wear',
  'Couture Party Wear',
  'Bestseller Party Wear',
  'Masterpiece',
  'Signature',
  'Exclusive',
  'Heritage',
  'Daily Luxury',
  'New Arrival'
];

export default function AdminDashboardModal({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetFactory,
  onLogout,
  adminUser
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'add', 'system'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notification, setNotification] = useState('');

  // Form state for creating a new garment
  const initialNewProduct = {
    name: '',
    category: 'Party Wear',
    badge: 'Party Wear',
    tagline: '',
    description: '',
    material: 'Pure Handloom Silk & Metallic Embroidery',
    price: 18500,
    compareAtPrice: 22000,
    sizes: ['38R', '40R', '42R', '44R'],
    colors: [
      { name: 'Imperial Noir', hex: '#111218', meshColor: 0x111218, filter: 'none', tint: null },
      { name: 'Royal Emerald', hex: '#0e3a2f', meshColor: 0x0e3a2f, filter: 'sepia(0.4) hue-rotate(110deg) saturate(2.4)', tint: 'rgba(14, 58, 47, 0.42)' }
    ],
    fabricType: 'raw_silk',
    garmentType: 'achkan',
    image: '/assets/cloth_achkan_cutout.png',
    collar: 'Mandarin Bandhgala Stand Collar',
    cut: 'Contemporary Tailored Fit',
    accent: 'Hand-crafted Jewel Enamelled Buttons',
    rating: 5.0,
    reviewsCount: 12,
    inStock: true
  };

  const [newProduct, setNewProduct] = useState(initialNewProduct);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // CREATE Product Handler
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const numStr = nextId < 10 ? `0${nextId}` : `${nextId}`;

    const created = {
      ...newProduct,
      id: nextId,
      number: numStr,
      price: Number(newProduct.price),
      compareAtPrice: Number(newProduct.compareAtPrice) || Number(newProduct.price) * 1.2
    };

    onAddProduct(created);
    sounds.playChime(784, 'sine', 0.2);
    showToast(`Added "${created.name}" to Showroom Catalog!`);
    setNewProduct(initialNewProduct);
    setActiveTab('inventory');
  };

  // UPDATE Product Handler
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    onUpdateProduct(editingProduct);
    sounds.playChime(659.25, 'sine', 0.2);
    showToast(`Updated "${editingProduct.name}" successfully!`);
    setEditingProduct(null);
  };

  // DELETE Product Handler
  const handleConfirmDelete = (id) => {
    const prod = products.find((p) => p.id === id);
    onDeleteProduct(id);
    sounds.playChime(330, 'sawtooth', 0.2);
    showToast(`Removed "${prod?.name || 'Item'}" from Catalog.`);
    setDeleteConfirmId(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0d0d12] border border-[#d4af37]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#14141c] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#d4af37]/60 bg-black/60 flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#f5e0aa] tracking-wider uppercase">
                  ADMIN PORTAL & INVENTORY CRUD
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#f5e0aa] text-[10px] font-mono font-bold border border-[#d4af37]/40">
                  AUTHORIZED
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                Logged in as: <span className="text-white">{adminUser?.email || 'mohdabduleaheem@gmail'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl border border-red-500/30 hover:border-red-500 bg-red-950/30 hover:bg-red-950/60 text-red-300 text-xs flex items-center gap-1.5 transition-colors font-mono"
              title="Logout Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toast Notification Banner */}
        {notification && (
          <div className="bg-[#d4af37] text-black px-6 py-2 text-xs font-bold font-mono tracking-wider flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 bg-[#0a0a0e] text-xs font-mono">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 px-4 border-b-2 font-bold tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'border-[#d4af37] text-[#f5e0aa]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>INVENTORY CATALOG ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-4 border-b-2 font-bold tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'add'
                ? 'border-[#d4af37] text-[#f5e0aa]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>+ ADD NEW GARMENT (CREATE)</span>
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-3 px-4 border-b-2 font-bold tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'system'
                ? 'border-[#d4af37] text-[#f5e0aa]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>SYSTEM & FACTORY RESET</span>
          </button>
        </div>

        {/* TAB 1: INVENTORY CATALOG (READ, UPDATE, DELETE) */}
        {activeTab === 'inventory' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {/* Search and Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, category, badge..."
                  className="w-full pl-10 pr-4 py-2 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none font-mono"
                />
              </div>

              <button
                onClick={() => setActiveTab('add')}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#f5e0aa] to-[#d4af37] hover:brightness-110 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>Add Garment</span>
              </button>
            </div>

            {/* Inventory Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-[#14141c]/80 border border-white/10 hover:border-[#d4af37]/40 transition-all flex gap-4 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-32 rounded-xl bg-black/50 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-contain p-1 filter drop-shadow-md"
                    />
                    <span className="absolute top-1 left-1 font-mono text-[9px] bg-black/80 px-1 rounded text-[#d4af37]">
                      #{prod.number}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#f5e0aa] text-[9px] font-bold uppercase border border-[#d4af37]/30">
                          {prod.badge || 'Haute Couture'}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono truncate">
                          {prod.category}
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white mt-1 line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5">
                        {prod.description}
                      </p>
                    </div>

                    {/* Price & Stock status */}
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-sm font-bold text-[#f5e0aa]">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.compareAtPrice && (
                          <span className="font-mono text-[10px] text-neutral-500 line-through ml-1.5">
                            ₹{prod.compareAtPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Action buttons (Edit & Delete) */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingProduct({ ...prod })}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37] text-neutral-300 hover:text-[#f5e0aa] transition-colors"
                          title="Edit this garment"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(prod.id)}
                          className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/70 border border-red-500/30 hover:border-red-500 text-red-300 transition-colors"
                          title="Delete this garment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 text-neutral-400">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-30 text-[#d4af37]" />
                <p className="font-serif text-base text-neutral-300">No matching garments found</p>
                <p className="text-xs font-mono text-neutral-500 mt-1">Try another search or add a new piece.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CREATE NEW GARMENT (ADD) */}
        {activeTab === 'add' && (
          <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-1">
                  Garment Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Royal Zardozi Raw Silk Bandhgala"
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-sm text-white font-sans"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-1">
                  Short Tagline
                </label>
                <input
                  type="text"
                  value={newProduct.tagline}
                  onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                  placeholder="e.g. Hand-embroidered with 24K gold zari threads."
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-sm text-white font-sans"
                />
              </div>

              {/* Price (INR) */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-1">
                  Selling Price (₹ INR) *
                </label>
                <input
                  type="number"
                  required
                  min="500"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-sm text-white font-mono"
                />
              </div>

              {/* Compare At Price (INR) */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-1">
                  Original Price / MRP (₹ INR)
                </label>
                <input
                  type="number"
                  min="500"
                  value={newProduct.compareAtPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, compareAtPrice: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-sm text-white font-mono"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-1">
                  Showroom Category
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-sm text-white font-sans"
                >
                  {CATEGORY_PRESETS.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#14141c]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-1">
                  Highlight Badge
                </label>
                <select
                  value={newProduct.badge}
                  onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-sm text-white font-sans"
                >
                  {BADGE_PRESETS.map((bdg) => (
                    <option key={bdg} value={bdg} className="bg-[#14141c]">
                      {bdg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Visual Cutout Image */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-1">
                  Garment Cutout Asset (Select Preset or Paste URL)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                  {PRESET_IMAGE_OPTIONS.map((img) => (
                    <button
                      type="button"
                      key={img.value}
                      onClick={() => setNewProduct({ ...newProduct, image: img.value })}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                        newProduct.image === img.value
                          ? 'border-[#d4af37] bg-[#d4af37]/20 shadow-md'
                          : 'border-white/10 hover:border-white/30 bg-black/40'
                      }`}
                    >
                      <img src={img.value} alt={img.label} className="w-12 h-14 object-contain" />
                      <span className="text-[9px] font-mono text-neutral-300 truncate w-full text-center">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="Custom image path or URL e.g. /assets/cloth_achkan_cutout.png"
                  className="w-full px-3.5 py-2 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-xs text-white font-mono"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-1">
                  Couture Description
                </label>
                <textarea
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Crafted from hand-spun raw silk with antique brass button accents..."
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#d4af37] rounded-xl text-xs text-white font-sans resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className="px-4 py-2.5 rounded-xl border border-white/15 text-neutral-400 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f5e0aa] to-[#d4af37] hover:brightness-110 text-black font-serif font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#d4af37]/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>SAVE & PUBLISH TO CATALOG</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: SYSTEM & FACTORY RESET */}
        {activeTab === 'system' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
            <div className="p-5 rounded-2xl bg-[#14141c] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-[#f5e0aa]">
                <RotateCcw className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-serif font-bold text-base uppercase tracking-wider">
                  Restore Factory Default Collection
                </h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Revert all additions, edits, and deletions back to the pristine 9-garment flagship catalog
                (including Royal Sherwani, Bandhgala, Party Wear Achkan, Banarasi Jodhpuri, and Mirror-Work Kurta).
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all catalog customizations back to factory default?')) {
                    onResetFactory();
                    showToast('Catalog restored to default factory state.');
                    sounds.playChime(523.25, 'sine', 0.25);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/40 hover:border-red-500 text-red-200 hover:text-white text-xs font-mono font-bold transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESTORE FACTORY CATALOG</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#14141c] border border-white/10 space-y-2">
              <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
                Admin Authentication Info
              </h4>
              <p className="text-xs font-mono text-neutral-400">
                Authorized Administrator: <span className="text-[#f5e0aa]">mohdabduleaheem@gmail</span>
              </p>
              <p className="text-xs font-mono text-neutral-400">
                Session Persistence: <span className="text-emerald-400">Active (Encrypted in LocalStorage)</span>
              </p>
            </div>
          </div>
        )}

        {/* EDIT PRODUCT MODAL OVERLAY */}
        {editingProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-xl bg-[#121218] border border-[#d4af37] rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#d4af37]" />
                  <h3 className="font-serif text-base font-bold text-[#f5e0aa] uppercase">
                    Edit Garment: {editingProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-neutral-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-mono text-neutral-400 mb-1 uppercase">Title</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-neutral-400 mb-1 uppercase">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-neutral-400 mb-1 uppercase">Compare Price (₹)</label>
                    <input
                      type="number"
                      value={editingProduct.compareAtPrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, compareAtPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-neutral-400 mb-1 uppercase">Category</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-sans"
                    >
                      {CATEGORY_PRESETS.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#14141c]">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-neutral-400 mb-1 uppercase">Badge</label>
                    <select
                      value={editingProduct.badge}
                      onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                      className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-sans"
                    >
                      {BADGE_PRESETS.map((b) => (
                        <option key={b} value={b} className="bg-[#14141c]">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-neutral-400 mb-1 uppercase">Description</label>
                  <textarea
                    rows="3"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-sans resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-xl border border-white/15 text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#f5e0aa] to-[#d4af37] text-black font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION DIALOG */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-sm bg-[#15151c] border border-red-500/40 rounded-3xl p-6 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-white uppercase">
                Confirm Removal
              </h3>
              <p className="text-xs text-neutral-400">
                Are you sure you want to delete this garment from the showroom? This will remove it from the 3D Almira sequence and the collection.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-xl border border-white/15 text-neutral-300 hover:text-white text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmDelete(deleteConfirmId)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono shadow-lg shadow-red-600/30"
                >
                  Yes, Delete Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
