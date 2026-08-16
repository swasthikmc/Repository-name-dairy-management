import React, { useState } from 'react';
import { RotateCw, CheckCircle2, ShieldAlert, Award, Sparkles, Barcode } from 'lucide-react';
import { PRODUCTS, COMPANY_INFO } from '../data/chocoData';

export default function WrapperInspector({ lang }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const p = PRODUCTS[0];

  return (
    <section style={{ padding: '4rem 2rem', background: 'var(--bg-darker)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> Interactive 3D Wrapper Inspection
          </span>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--text-main)', fontFamily: 'Playfair Display' }}>
            Inspect Authentic Malnad Choco Packaging
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Click or tap the wrapper card below to flip between the <strong>Front Artwork</strong> and <strong>Back Nutritional & Batch Details</strong>.
          </p>
        </div>

        {/* 3D Flip Card Container */}
        <div className="flip-card-container" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            {/* FRONT OF WRAPPER */}
            <div className="flip-card-front">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  EST. 2026 | KARNATAKA
                </span>
                <span style={{ background: '#15803d', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
                  🟢 100% VEG
                </span>
              </div>

              <div style={{ margin: '1rem 0' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', letterSpacing: '0.15em', fontWeight: '800' }}>
                  SINCE 2026
                </div>
                <h3 style={{ fontSize: '2rem', color: '#fefae0', fontFamily: 'Playfair Display', margin: '0.2rem 0' }}>
                  MALNAD CHOCO
                </h3>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '800',
                  color: 'var(--accent-gold)',
                  background: 'rgba(212, 175, 55, 0.15)',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  display: 'inline-block'
                }}>
                  — MILK —
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase' }}>
                  PREMIUM MILK CHOCOLATE
                </div>
              </div>

              <div style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'flex-end',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '0.75rem'
              }}>
                <div style={{ textAlign: 'left', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <div>🐮 Fresh Cow Milk</div>
                  <div>🌴 Karnataka Estate Cocoa</div>
                </div>
                <div style={{
                  background: 'var(--accent-gold)',
                  color: '#140804',
                  fontWeight: '900',
                  fontSize: '1rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '8px',
                  fontFamily: 'Playfair Display'
                }}>
                  5g NET WT.
                </div>
              </div>

              <div style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <RotateCw size={12} /> Click to view Back Nutritional Info
              </div>
            </div>

            {/* BACK OF WRAPPER */}
            <div className="flip-card-back">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '0.68rem', textAlign: 'left' }}>
                <div style={{ flex: 1, paddingRight: '0.75rem' }}>
                  <div style={{ fontWeight: '800', fontSize: '0.75rem', color: '#2b140b' }}>
                    MALNAD CHOCO COMPANY PVT. LTD.
                  </div>
                  <p style={{ fontSize: '0.62rem', color: '#4a2c1d', marginTop: '2px', lineHeight: '1.2' }}>
                    {p.description}
                  </p>
                </div>

                {/* Nutrition Table */}
                <div style={{
                  border: '1px solid #b08968',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  background: '#fcf8f2',
                  fontSize: '0.6rem',
                  minWidth: '135px'
                }}>
                  <div style={{ fontWeight: '800', borderBottom: '1px solid #b08968', paddingBottom: '2px' }}>
                    NUTRITION INFO (per 100g)
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Energy</span><strong>535 kcal</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Protein</span><strong>6.5 g</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Fat</span><strong>30 g</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Carbs / Sugars</span><strong>56g / 46g</strong></div>
                </div>
              </div>

              {/* 4 Pillar Icons */}
              <div style={{ display: 'flex', justifyContent: 'space-around', margin: '0.4rem 0', padding: '4px 0', borderTop: '1px solid #d4c5b3', borderBottom: '1px solid #d4c5b3', fontSize: '0.6rem', color: '#2b140b' }}>
                <div>🍫 Finest Cocoa</div>
                <div>🥛 Rich Milk</div>
                <div>🌿 No Artificials</div>
                <div>❤️ Made with Care</div>
              </div>

              {/* Batch & Price Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', textAlign: 'left' }}>
                <div>
                  <div>MFG DATE: <strong>{p.mfgDate}</strong></div>
                  <div>EXP DATE: <strong>{p.expDate}</strong></div>
                  <div>BATCH NO: <strong>{p.batchNo}</strong></div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#854d0e' }}>
                    MRP: ₹5.00
                  </div>
                  <div style={{ fontSize: '0.55rem', color: '#666' }}>(Incl. of all taxes)</div>
                </div>
              </div>

              {/* Barcode & FSSAI Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem', borderTop: '1px solid #d4c5b3', paddingTop: '4px' }}>
                <div style={{ fontSize: '0.55rem', textAlign: 'left', color: '#444' }}>
                  FSSAI Lic No: {COMPANY_INFO.fssaiNo}<br />
                  Contains Milk. May contain traces of nuts.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace', fontSize: '0.65rem', fontWeight: '700' }}>
                  <Barcode size={16} /> {p.barcode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
