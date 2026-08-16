import React from 'react';
import { ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/chocoData';

export default function ChocoFooter({ onNavigate, lang }) {
  return (
    <footer style={{
      background: '#0a0301',
      color: 'var(--text-muted)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 2rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem'
      }}>
        {/* Col 1: Brand Info */}
        <div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontFamily: 'Playfair Display', marginBottom: '0.5rem' }}>
            {COMPANY_INFO.name}
          </h3>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
            {COMPANY_INFO.kannadaName}
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            Handcrafted with finest cocoa solids and fresh dairy milk in the lush Western Ghats of Malnad, Karnataka.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#166534', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
            🟢 100% VEGETARIAN
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', fontFamily: 'Playfair Display', marginBottom: '1rem' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => onNavigate('home')}>Home</button></li>
            <li><button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => onNavigate('products')}>Chocolates & Nuts</button></li>
            <li><button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => onNavigate('wrapper')}>3D Wrapper Inspector</button></li>
            <li><button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => onNavigate('founder')}>Founder Story (Tharun T)</button></li>
            <li><button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => onNavigate('wholesale')}>Wholesale Partnership</button></li>
          </ul>
        </div>

        {/* Col 3: Compliance & FSSAI */}
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', fontFamily: 'Playfair Display', marginBottom: '1rem' }}>
            Quality & Compliance
          </h4>
          <div style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
            <div><strong>FSSAI License:</strong> {COMPANY_INFO.fssaiNo}</div>
            <div><strong>GSTIN:</strong> {COMPANY_INFO.gstin}</div>
            <div><strong>Batch Standard:</strong> ISO 22000 Certified</div>
            <div><strong>Shelf Life:</strong> 12 Months from MFG</div>
          </div>
        </div>

        {/* Col 4: Corporate Office */}
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', fontFamily: 'Playfair Display', marginBottom: '1rem' }}>
            Corporate Office
          </h4>
          <div style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
            <div><strong>Managing Director:</strong> {COMPANY_INFO.founder}</div>
            <div>{COMPANY_INFO.headquarters}</div>
            <div>Phone: {COMPANY_INFO.phone}</div>
            <div>Email: {COMPANY_INFO.email}</div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem'
      }}>
        <div>
          © {new Date().getFullYear()} <strong>{COMPANY_INFO.name}</strong>. All Rights Reserved. Owned by <strong>{COMPANY_INFO.founder}</strong>.
        </div>
        <div style={{ color: 'var(--accent-gold)' }}>
          Crafted with ❤️ in Karnataka, India
        </div>
      </div>
    </footer>
  );
}
