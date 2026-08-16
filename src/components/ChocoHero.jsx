import React from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS } from '../data/chocoData';

export default function ChocoHero({ onNavigate, onAddToCart, lang }) {
  const flagship = PRODUCTS[0]; // Malnad Choco Milk

  return (
    <section style={{
      position: 'relative',
      padding: '4rem 2rem',
      background: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(45, 106, 79, 0.15) 0%, transparent 60%)',
      borderBottom: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* Left Text Content */}
        <div>
          <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-gold">
              <Sparkles size={13} /> {COMPANY_INFO.established} Heritage
            </span>
            <span className="badge badge-green">
              <ShieldCheck size={13} /> 100% Pure & Veg
            </span>
            <span className="badge badge-gold">
              🌿 Malnad Estate Cocoa
            </span>
          </div>

          <h1 style={{
            fontSize: '3rem',
            lineHeight: '1.15',
            color: 'var(--text-main)',
            marginBottom: '1.25rem',
            fontFamily: 'Playfair Display'
          }}>
            {lang === 'ka' ? (
              <>ಮಲೆನಾಡಿನ ಸುವಾಸಿತ <br /><span style={{ color: 'var(--accent-gold)' }}>ಪ್ರೀಮಿಯಂ ಚಾಕೊಲೇಟ್</span></>
            ) : (
              <>Handcrafted in <br /><span style={{ color: 'var(--accent-gold)' }}>Western Ghats of Malnad</span></>
            )}
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            marginBottom: '1.75rem',
            maxWidth: '520px'
          }}>
            {lang === 'ka'
              ? 'ಮಲ್ನಾಡ್ ಚಾಕೋ ಕಂಪನಿ ಪ್ರೈವೇಟ್ ಲಿಮಿಟೆಡ್‌ನಿಂದ ಶ್ರೇಷ್ಠ ಮಟ್ಟದ ಕೋಕೋ ಮತ್ತು ಶುದ್ಧ ಹಾಲಿನಿಂದ ತಯಾರಿಸಿದ ಅತ್ಯುತ್ತಮ ರುಚಿಯ ಚಾಕೊಲೇಟ್‌ಗಳು.'
              : 'Experience smooth, rich, and creamy chocolates crafted with finest Karnataka cocoa beans and fresh dairy milk. Managed by ' + COMPANY_INFO.founder + '.'
            }
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button
              className="btn btn-gold"
              style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
              onClick={() => onAddToCart(flagship)}
            >
              <ShoppingBag size={18} />
              <span>Buy Malnad Choco (₹5 Bar)</span>
            </button>

            <button
              className="btn btn-secondary"
              style={{ padding: '0.9rem 1.6rem', fontSize: '0.95rem' }}
              onClick={() => onNavigate('products')}
            >
              <span>Explore All Products</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 4 Pillars Badges from Packaging */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--accent-gold)', fontWeight: '800', fontSize: '1.1rem' }}>🍫</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '600', marginTop: '2px' }}>Finest Cocoa</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--accent-gold)', fontWeight: '800', fontSize: '1.1rem' }}>🥛</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '600', marginTop: '2px' }}>Rich Milk</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--accent-gold)', fontWeight: '800', fontSize: '1.1rem' }}>🌿</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '600', marginTop: '2px' }}>No Artificials</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--accent-gold)', fontWeight: '800', fontSize: '1.1rem' }}>❤️</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '600', marginTop: '2px' }}>Made with Care</div>
            </div>
          </div>
        </div>

        {/* Right Hero Product Feature */}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div className="glass-card" style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(61, 28, 16, 0.9) 0%, rgba(26, 12, 7, 0.95) 100%)',
            border: '2px solid var(--accent-gold)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
          }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
              MRP ₹5.00 | Net Wt: 5g
            </span>

            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <img
                src="/malnad_choco.jpg"
                alt="Malnad Choco Milk Bar"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#166534',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '800'
              }}>
                🟢 100% VEG
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
              MALNAD CHOCO - MILK
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Premium Milk Chocolate Crafted in Karnataka, India
            </p>

            <button
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.85rem' }}
              onClick={() => onAddToCart(flagship)}
            >
              <ShoppingBag size={18} />
              <span>Add to Cart - ₹5.00</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
