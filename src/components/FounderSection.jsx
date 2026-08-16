import React from 'react';
import { Award, ShieldCheck, Heart, MapPin, Sparkles, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/chocoData';

export default function FounderSection({ lang }) {
  return (
    <section style={{
      padding: '5rem 2rem',
      background: 'linear-gradient(180deg, var(--bg-darker) 0%, #1a0b06 100%)',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Founder Profile Card */}
          <div className="glass-card" style={{
            padding: '2.5rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(61, 28, 16, 0.95) 0%, rgba(20, 8, 4, 0.98) 100%)',
            border: '2px solid var(--accent-gold)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
              color: '#140804',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: '800',
              fontFamily: 'Playfair Display',
              margin: '0 auto 1.25rem auto',
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)'
            }}>
              TT
            </div>

            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
              <Award size={13} /> {COMPANY_INFO.role}
            </span>

            <h3 style={{ fontSize: '1.85rem', color: 'var(--text-main)', fontFamily: 'Playfair Display', marginBottom: '0.2rem' }}>
              {COMPANY_INFO.founder}
            </h3>

            <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '1.25rem' }}>
              {COMPANY_INFO.name}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              "Our mission is to bring the authentic, rich aroma of Karnataka's Western Ghats cocoa to chocolate connoisseurs across India and the globe."
            </p>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <MapPin size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>{COMPANY_INFO.headquarters}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <Phone size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>{COMPANY_INFO.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Right Brand Story & Heritage */}
          <div>
            <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
              <Sparkles size={13} /> Western Ghats Cocoa Heritage
            </span>

            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', fontFamily: 'Playfair Display', marginBottom: '1.25rem', lineHeight: '1.2' }}>
              The Malnad Choco Story
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              Deep in the lush, mist-covered hills of <strong>Malnad, Karnataka</strong>, cocoa trees thrive alongside pepper vines and coffee plantations. Founded by <strong>Tharun T</strong> in 2026, <strong>Malnad Choco Company Private Limited</strong> was established to craft premium, unadulterated milk chocolates and chocolate-coated nut confections directly at origin.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
              Every single bar of <strong>Malnad Choco Milk (₹5)</strong> and pouch of <strong>Malnad Choco Protein Nuts</strong> is made using 100% vegetarian ingredients, zero artificial flavors, and pure cocoa solids.
            </p>

            {/* Quality Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--accent-gold)', fontWeight: '800', fontSize: '1.2rem', marginBottom: '4px' }}>🛡️ FSSAI Certified</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Lic No: {COMPANY_INFO.fssaiNo}</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--accent-gold)', fontWeight: '800', fontSize: '1.2rem', marginBottom: '4px' }}>🌱 100% Vegetarian</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Pure fresh ingredients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
