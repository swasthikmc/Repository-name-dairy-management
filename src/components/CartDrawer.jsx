import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'THARUN10') {
      const discount = Math.round(subtotal * 0.10);
      setAppliedDiscount(discount);
      setPromoMessage('10% Founder Discount Applied! (₹' + discount + ' off)');
    } else if (code === 'MALNADFIRST') {
      setAppliedDiscount(20);
      setPromoMessage('₹20 Welcome Voucher Applied!');
    } else {
      alert('Invalid Promo Code! Try "THARUN10" or "MALNADFIRST"');
    }
  };

  const shippingCost = subtotal >= 199 || subtotal === 0 ? 0 : 40;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + shippingCost);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#160904',
        borderLeft: '1px solid var(--accent-gold)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.8)',
        animation: 'slideLeft 0.3s ease-out'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(12, 4, 2, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display', color: 'var(--text-main)' }}>
              Your Shopping Cart ({cartItems.length})
            </h3>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ background: 'rgba(212, 175, 55, 0.08)', padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
          {subtotal >= 199 ? (
            <div style={{ color: '#40916c', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} /> Congratulations! You unlocked FREE Delivery across India.
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>
              Add <strong>₹{199 - subtotal}</strong> more for <strong>FREE Shipping</strong>!
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontFamily: 'Playfair Display' }}>Your cart is empty!</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Add some delicious Malnad Choco Milk bars or Protein Nuts to get started.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)'
              }}>
                <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: '800', margin: '2px 0' }}>₹{item.price}.00</div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    {/* Qty Switcher */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-darker)', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <button style={{ border: 'none', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }} onClick={() => onUpdateQty(item.id, item.quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>{item.quantity}</span>
                      <button style={{ border: 'none', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }} onClick={() => onUpdateQty(item.id, item.quantity + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>

                    <button style={{ border: 'none', background: 'transparent', color: '#f87171', cursor: 'pointer' }} onClick={() => onRemoveItem(item.id)}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Voucher Section */}
        {cartItems.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)' }}>
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Promo Code (e.g. THARUN10)"
                className="form-control"
                style={{ textTransform: 'uppercase', height: '38px', fontSize: '0.8rem' }}
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary btn-sm">Apply</button>
            </form>
            {promoMessage && <div style={{ fontSize: '0.75rem', color: '#40916c', marginTop: '6px', fontWeight: '700' }}>{promoMessage}</div>}
          </div>
        )}

        {/* Drawer Footer Total */}
        {cartItems.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', background: 'rgba(12, 4, 2, 0.95)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Subtotal:</span>
              <span>₹{subtotal}.00</span>
            </div>

            {appliedDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#40916c', marginBottom: '4px' }}>
                <span>Discount:</span>
                <span>- ₹{appliedDiscount}.00</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              <span>Shipping Fee:</span>
              <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}.00`}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-gold)', borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginBottom: '1.25rem' }}>
              <span>Total Payable:</span>
              <span>₹{finalTotal}.00</span>
            </div>

            <button
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              onClick={onProceedCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
