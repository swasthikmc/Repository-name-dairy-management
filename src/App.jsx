import React, { useState, useEffect } from 'react';
import ChocoNavbar from './components/ChocoNavbar';
import ChocoHero from './components/ChocoHero';
import WrapperInspector from './components/WrapperInspector';
import ProductCatalog from './components/ProductCatalog';
import FounderSection from './components/FounderSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WholesalePortal from './components/WholesalePortal';
import ChocoFooter from './components/ChocoFooter';
import { PRODUCTS } from './data/chocoData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('en');

  // Shopping Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('malnad_choco_cart');
      return saved ? JSON.parse(saved) : [{ ...PRODUCTS[0], quantity: 2 }];
    } catch {
      return [{ ...PRODUCTS[0], quantity: 2 }];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('malnad_choco_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Cart save error:', err);
    }
  }, [cart]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ka' : 'en'));
  };

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ChocoNavbar
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        lang={lang}
        onToggleLang={toggleLang}
        onNavigate={setActiveTab}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <>
            <ChocoHero
              onNavigate={setActiveTab}
              onAddToCart={handleAddToCart}
              lang={lang}
            />
            <WrapperInspector lang={lang} />
            <ProductCatalog
              onAddToCart={handleAddToCart}
              lang={lang}
            />
            <FounderSection lang={lang} />
            <WholesalePortal lang={lang} />
          </>
        )}

        {activeTab === 'products' && (
          <ProductCatalog
            onAddToCart={handleAddToCart}
            lang={lang}
          />
        )}

        {activeTab === 'wrapper' && (
          <WrapperInspector lang={lang} />
        )}

        {activeTab === 'founder' && (
          <FounderSection lang={lang} />
        )}

        {activeTab === 'wholesale' && (
          <WholesalePortal lang={lang} />
        )}
      </main>

      <ChocoFooter onNavigate={setActiveTab} lang={lang} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
