import React, { useState } from 'react';
import { Building2, Phone, Mail, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/chocoData';

export default function WholesalePortal({ lang }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    location: 'Bengaluru',
    volume: '50-100 Cartons / month',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.businessName || !form.contactPerson || !form.phone) {
      alert('Please fill out required fields!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section style={{ padding: '4rem 2rem', background: 'var(--bg-darker)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> Retailer & Distributor Network
          </span>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', fontFamily: 'Playfair Display' }}>
            Stock Malnad Choco at Your Store
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
            Partner with <strong>Malnad Choco Company Private Limited</strong> for wholesale bulk distribution across Karnataka and pan-India.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Partnership Form */}
          <div className="glass-card">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'Playfair Display', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                  Wholesale Bulk Inquiry Form
                </h3>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Store / Business Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Royal Supermarket"
                    value={form.businessName}
                    onChange={e => setForm({ ...form, businessName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Contact Person *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      value={form.contactPerson}
                      onChange={e => setForm({ ...form, contactPerson: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Phone Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+91 98765 00000"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="store@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Expected Monthly Volume</label>
                    <select
                      className="form-control"
                      value={form.volume}
                      onChange={e => setForm({ ...form, volume: e.target.value })}
                    >
                      <option value="10-50 Cartons">10 - 50 Cartons / month</option>
                      <option value="50-100 Cartons">50 - 100 Cartons / month</option>
                      <option value="100+ Cartons">100+ Cartons (Distributor)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Additional Requirement Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Tell us about your distribution locations..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '0.85rem' }}>
                  <Send size={16} /> Submit Bulk Inquiry
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle size={48} style={{ color: 'var(--accent-green-bright)', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Thank you <strong>{form.contactPerson}</strong>! Managing Director <strong>Tharun T</strong>'s wholesale team will contact you within 24 hours.
                </p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>Send Another Inquiry</button>
              </div>
            )}
          </div>

          {/* Direct Contact & Key Benefits */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              Direct Wholesale Contacts
            </h3>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-gold)', marginBottom: '0.3rem' }}>
                {COMPANY_INFO.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                FSSAI License: {COMPANY_INFO.fssaiNo} | GSTIN: {COMPANY_INFO.gstin}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                <div>📍 <strong>Address:</strong> {COMPANY_INFO.headquarters}</div>
                <div>📞 <strong>Phone:</strong> {COMPANY_INFO.phone}</div>
                <div>✉️ <strong>Email:</strong> {COMPANY_INFO.email}</div>
                <div>👑 <strong>Founder & MD:</strong> {COMPANY_INFO.founder}</div>
              </div>
            </div>

            {/* Why Partner with Us */}
            <div style={{ background: 'rgba(45, 106, 79, 0.15)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--accent-green-bright)', fontSize: '0.85rem' }}>
              <div style={{ color: '#52b788', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                ✓ Retailer Margin Highlights:
              </div>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                <li>High retail margin on flagship ₹5 bar (24/50 count display boxes).</li>
                <li>Fast moving impulse buying product at checkout counters.</li>
                <li>Attractive Karnataka regional packaging in English & Kannada.</li>
                <li>Direct factory fresh supply with 12 months shelf life.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
