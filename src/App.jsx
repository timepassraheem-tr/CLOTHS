import React, { useState, useEffect, useRef } from 'react';
import ShowroomScene from './components/ShowroomScene';
import CinematicOverlay from './components/CinematicOverlay';
import ProductPresentation from './components/ProductPresentation';
import CatalogSection from './components/CatalogSection';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import BookingModal from './components/BookingModal';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ParallaxParticles from './components/ParallaxParticles';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import { PRODUCTS } from './data/products';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [catalogProgress, setCatalogProgress] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(-1);

  // Dynamic Catalog State with localStorage persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('raheem_products_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.warn('Could not read catalog from storage', err);
    }
    return PRODUCTS;
  });

  // Admin authentication state with localStorage persistence
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('raheem_admin_session') === 'true';
    } catch (err) {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('raheem_admin_user');
      if (saved) return JSON.parse(saved);
    } catch (err) {}
    return {
      email: 'mohdabduleaheem@gmail',
      name: 'Mohd Abdul Raheem',
      role: 'Head of Haute Couture Operations'
    };
  });

  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Live color selection state for 3D preview & product cards
  const [selectedColors, setSelectedColors] = useState({});

  // Auto-scroll cinematic tour state
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeedMultiplier, setScrollSpeedMultiplier] = useState(2); // 1 = 3.2px, 2 = 5.5px (Fast default), 3 = 9.2px (Turbo), 4 = 14.5px (Ultra)
  const autoScrollAnimRef = useRef(null);

  const getSpeedPx = (multiplier) => {
    if (multiplier === 1) return 3.2;
    if (multiplier === 2) return 5.5; // Fast, energetic default
    if (multiplier === 3) return 9.2; // Turbo
    return 14.5; // 4X Ultra
  };

  // Helper to persist catalog changes
  const saveProductsToStorage = (newProducts) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('raheem_products_catalog', JSON.stringify(newProducts));
    } catch (err) {
      console.error('Failed to save catalog to localStorage', err);
    }
  };

  // CRUD Handlers
  const handleAddProduct = (newProduct) => {
    const updated = [newProduct, ...products];
    saveProductsToStorage(updated);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    saveProductsToStorage(updated);
  };

  const handleDeleteProduct = (productId) => {
    const updated = products.filter((p) => p.id !== productId);
    saveProductsToStorage(updated);
  };

  const handleResetFactory = () => {
    try {
      localStorage.removeItem('raheem_products_catalog');
    } catch (err) {}
    setProducts(PRODUCTS);
  };

  const handleLoginSuccess = (user) => {
    setIsAdmin(true);
    setAdminUser(user);
    try {
      localStorage.setItem('raheem_admin_session', 'true');
      localStorage.setItem('raheem_admin_user', JSON.stringify(user));
    } catch (err) {}
    setAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminDashboardOpen(false);
    try {
      localStorage.removeItem('raheem_admin_session');
      localStorage.removeItem('raheem_admin_user');
    } catch (err) {}
    sounds.playChime(440, 'triangle', 0.2);
  };

  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    const defaultItem = PRODUCTS[0];
    return [
      {
        ...defaultItem,
        selectedSize: defaultItem.sizes[1],
        selectedColor: defaultItem.colors[0],
        quantity: 1
      }
    ];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Scroll references
  const scrollTrackRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef(null);

  // Total height of the 3D cinematic opening sequence
  const CINEMATIC_SCROLL_HEIGHT = 6500;

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);

      // Hero walk-through sequence progress (0.0 to 1.0)
      const progress = Math.min(Math.max(sy / CINEMATIC_SCROLL_HEIGHT, 0), 1);
      targetProgressRef.current = progress;

      // Global catalog progress across the rest of the site (0.0 to 1.0)
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      const catProg = Math.max(
        0,
        (sy - CINEMATIC_SCROLL_HEIGHT * 0.9) / Math.max(1, totalDocHeight - CINEMATIC_SCROLL_HEIGHT * 0.9)
      );
      setCatalogProgress(Math.min(1, catProg));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth lerping loop for 60fps camera motion
    const updateProgress = () => {
      animFrameRef.current = requestAnimationFrame(updateProgress);
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.085;
        setScrollProgress(currentProgressRef.current);
      }
    };
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Cinematic Auto-Scroll Engine
  useEffect(() => {
    if (!isAutoScrolling) {
      if (autoScrollAnimRef.current) cancelAnimationFrame(autoScrollAnimRef.current);
      return;
    }

    const stepAutoScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 4) {
        setIsAutoScrolling(false);
        return;
      }

      window.scrollBy(0, getSpeedPx(scrollSpeedMultiplier));
      autoScrollAnimRef.current = requestAnimationFrame(stepAutoScroll);
    };

    autoScrollAnimRef.current = requestAnimationFrame(stepAutoScroll);

    // Pause auto-scroll on manual user interaction
    const handleUserInterrupt = () => {
      setIsAutoScrolling(false);
    };
    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchmove', handleUserInterrupt, { passive: true });

    return () => {
      if (autoScrollAnimRef.current) cancelAnimationFrame(autoScrollAnimRef.current);
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchmove', handleUserInterrupt);
    };
  }, [isAutoScrolling, scrollSpeedMultiplier]);

  const toggleAutoScroll = () => {
    sounds.playChime(isAutoScrolling ? 440 : 880, 'triangle', 0.25);
    setIsAutoScrolling((prev) => !prev);
  };

  const cycleSpeed = (e) => {
    if (e) e.stopPropagation();
    setScrollSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : prev === 3 ? 4 : 1));
    sounds.playChime(740, 'sine', 0.15);
  };

  const handleColorChange = (productId, colorObj) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorObj
    }));
  };

  // Cart actions
  const handleAddToCart = (productWithSelection) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.id === productWithSelection.id &&
          item.selectedSize === productWithSelection.selectedSize &&
          item.selectedColor.name === productWithSelection.selectedColor.name
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { ...productWithSelection, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, size, colorName, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size, colorName);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size && item.selectedColor.name === colorName
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (id, size, colorName) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.selectedSize === size && item.selectedColor.name === colorName)
      )
    );
  };

  const handleClearCart = () => setCartItems([]);

  // Jump to specific point in scroll timeline
  const navigateToProgress = (progress) => {
    setIsAutoScrolling(false);
    const targetY = progress * CINEMATIC_SCROLL_HEIGHT;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-[#09090c] text-neutral-100 select-none">
      {/* Luxury Loading Screen */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Persistent Navigation Header with Auto Tour Button, Speed Multiplier & Admin Login */}
      <Navigation
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
        scrollProgress={scrollProgress}
        onNavigateSection={navigateToProgress}
        isAutoScrolling={isAutoScrolling}
        onToggleAutoScroll={toggleAutoScroll}
        scrollSpeedMultiplier={scrollSpeedMultiplier}
        onCycleSpeed={cycleSpeed}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* ======================================================== */}
      {/* GLOBAL BACKGROUND SHOWROOM SCENE (CONTINUOUS ACROSS WHOLE SITE!) */}
      {/* ======================================================== */}
      <ShowroomScene
        scrollProgress={scrollProgress}
        catalogProgress={catalogProgress}
        scrollY={scrollY}
        activeProductIndex={activeProductIndex}
        onProductChange={setActiveProductIndex}
        selectedColors={selectedColors}
        products={products}
      />

      {/* ======================================================== */}
      {/* GLOBAL PARALLAX GOLD PARTICLES & LIGHT MOTES */}
      {/* ======================================================== */}
      <ParallaxParticles scrollY={scrollY} />

      {/* ======================================================== */}
      {/* HERO SCROLL CINEMATIC TRACK (OUTSIDE -> ENTRANCE -> ALMIRA -> CLOTHES) */}
      {/* ======================================================== */}
      <div
        ref={scrollTrackRef}
        style={{ height: `${CINEMATIC_SCROLL_HEIGHT}px` }}
        className="relative w-full z-20 pointer-events-none"
      >
        {/* Sticky foreground viewport holding overlays & floating product cards */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Cinematic Narrative Text Overlays & Progress */}
          <CinematicOverlay
            scrollProgress={scrollProgress}
            onExploreClick={() => navigateToProgress(0.24)}
          />

          {/* Full-Screen Synchronized Product Presentation Card with Live Color Recoloring */}
          <ProductPresentation
            activeProductIndex={activeProductIndex}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onOpenBooking={() => setBookingOpen(true)}
            selectedColors={selectedColors}
            onColorChange={handleColorChange}
            products={products}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* FULL BOUTIQUE CATALOG & EXPERIENCE SECTION (SEAMLESS PARALLAX) */}
      {/* ======================================================== */}
      <CatalogSection
        products={products}
        isAdmin={isAdmin}
        onEditProduct={(p) => setAdminDashboardOpen(true)}
        onDeleteProduct={handleDeleteProduct}
        onOpenAddProduct={() => setAdminDashboardOpen(true)}
        scrollY={scrollY}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* Admin Authentication & Management Modals */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminDashboardModal
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetFactory={handleResetFactory}
        onLogout={handleLogout}
        adminUser={adminUser}
      />
    </div>
  );
}
