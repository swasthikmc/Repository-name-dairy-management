import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Printer, CreditCard, Smartphone } from 'lucide-react';
import { COMPANY_INFO } from '../data/chocoData';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onClearCart
}) {
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Bengaluru',
    pincode: '560001',
    paymentMethod: 'UPI'
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 199 || subtotal === 0 ? 0 : 40;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill out required shipping details!');
      return;
    }

    const createdOrder = {
      orderId: `MC-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-IN'),
      customer: form,
      items: cartItems,
      totalAmount: total,
      paymentMethod: form.paymentMethod,
      timestamp: new Date().toLocaleString('en-IN')
    };

    setOrderData(createdOrder);
    setOrderComplete(true);
    onClearCart();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '540px' }}>
        {!orderComplete ? (
          <div>
            <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display', color: 'var(--text-main)' }}>
                Secure Checkout - Malnad Choco
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={onClose}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Shipping & Delivery Info
                </h4>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Suresh Gowda"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Mobile Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+91 98765 00000"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Pincode *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.pincode}
                      onChange={e => setForm({ ...form, pincode: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Shipping Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Door #, Street, Area"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    required
                  />
                </div>

                <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', margin: '1.25rem 0 0.75rem 0', textTransform: 'uppercase' }}>
                  Payment Method
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {['UPI (GPay / PhonePe)', 'Credit / Debit Card', 'NetBanking', 'Cash on Delivery'].map(pm => (
                    <button
                      key={pm}
                      type="button"
                      className={`btn ${form.paymentMethod === pm ? 'btn-gold' : 'btn-secondary'}`}
                      style={{ padding: '0.6rem', fontSize: '0.78rem' }}
                      onClick={() => setForm({ ...form, paymentMethod: pm })}
                    >
                      {pm}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px dashed var(--border-color)', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}><span>Total Order Value:</span><strong>₹{total}.00</strong></div>
                </div>
              </div>

              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-gold">Confirm Order (₹{total})</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="modal-header" style={{ padding: '1.25rem 1.5rem', background: 'rgba(45, 106, 79, 0.2)', borderBottom: '1px solid var(--accent-green-bright)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#52b788' }}>
                <CheckCircle size={22} />
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display', margin: 0 }}>
                  Order Confirmed!
                </h3>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={onClose}>✕</button>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem' }}>
              <div style={{
                background: '#ffffff',
                color: '#000000',
                padding: '1.5rem',
                borderRadius: '8px',
                fontFamily: "'Courier New', Courier, monospace",
                border: '2px dashed #333'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem', borderBottom: '1px solid #000', paddingBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', margin: 0 }}>MALNAD CHOCO COMPANY PVT LTD</h3>
                  <div style={{ fontSize: '0.75rem' }}>Managing Director: {COMPANY_INFO.founder}</div>
                  <div style={{ fontSize: '0.7rem' }}>FSSAI Lic No: {COMPANY_INFO.fssaiNo}</div>
                </div>

                <div style={{ fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  <div>Order ID: <strong>{orderData.orderId}</strong></div>
                  <div>Customer: {orderData.customer.name} ({orderData.customer.phone})</div>
                  <div>Address: {orderData.customer.address}, {orderData.customer.city} - {orderData.customer.pincode}</div>
                  <div>Payment: <strong>{orderData.paymentMethod}</strong></div>
                </div>

                <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '0.5rem 0', margin: '0.5rem 0', fontSize: '0.8rem' }}>
                  {orderData.items.map(it => (
                    <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>{it.quantity}x {it.name}</span>
                      <span>₹{it.quantity * it.price}.00</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '900', marginTop: '0.5rem' }}>
                  <span>TOTAL PAID:</span>
                  <span>₹{orderData.totalAmount}.00</span>
                </div>

                <div style={{ textAlign: 'center', fontSize: '0.68rem', marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '0.4rem' }}>
                  Thank you for ordering Malnad Choco! Handcrafted in Karnataka.<br />
                  Order Placed on {orderData.timestamp}
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => window.print()}>
                <Printer size={16} /> Print Receipt
              </button>
              <button className="btn btn-gold" onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
