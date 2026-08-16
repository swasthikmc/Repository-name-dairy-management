import React from 'react';
import { ShoppingBag, Globe, Award, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/chocoData';

export default function ChocoNavbar({
  cartCount,
  onOpenCart,
  lang,
  onToggleLang,
  onNavigate
}) {
  return (
    <header className="navbar">
      {/* Brand Logo & Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }} onClick={() => onNavigate('home')}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#140804',
          fontWeight: '800',
          fontSize: '1.4rem',
          fontFamily: 'Playfair Display',
          boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4)'
        }}>
          MC
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontFamily: 'Playfair Display' }}>
            {lang === 'ka' ? COMPANY_INFO.kannadaName : COMPANY_INFO.name}
          </h1>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', display: 'block', marginTop: '-2px' }}>
            {lang === 'ka' ? COMPANY_INFO.kannadaTagline : COMPANY_INFO.tagline}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
          onClick={() => onNavigate('products')}
        >
          <span>Chocolates</span>
        </button>

        <button
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
          onClick={() => onNavigate('wrapper')}
        >
          <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
          <span>3D Wrapper</span>
        </button>

        <button
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
          onClick={() => onNavigate('founder')}
        >
          <Award size={14} style={{ color: 'var(--accent-gold)' }} />
          <span>Founder Story</span>
        </button>

        <button
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
          onClick={() => onNavigate('wholesale')}
        >
          <span>Wholesale Inquiry</span>
        </button>
      </nav>

      {/* Right Controls: Bilingual & Cart */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Kannada / English Language Switcher */}
        <button
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          onClick={onToggleLang}
          title="Switch Language (Kannada / English)"
        >
          <Globe size={15} style={{ color: 'var(--accent-gold)' }} />
          <span>{lang === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
        </button>

        {/* Shopping Cart Button */}
        <button
          className="btn btn-gold"
          style={{ padding: '0.55rem 1.15rem', position: 'relative' }}
          onClick={onOpenCart}
        >
          <ShoppingBag size={18} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: '800',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #140804'
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
