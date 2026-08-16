import React, { useState } from 'react';
import { ShoppingBag, Star, Info, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/chocoData';

export default function ProductCatalog({ onAddToCart, lang }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Chocolate Bars', 'Nut Confectionery', 'Premium Nuts', 'Gift Boxes', 'Assorted Packs'];

  const filteredProducts = PRODUCTS.filter(p =>
    selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <section style={{ padding: '4rem 2rem', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> Full Product Suite
          </span>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', fontFamily: 'Playfair Display' }}>
            {lang === 'ka' ? 'ಉತ್ಪನ್ನಗಳ ವಿವರ' : 'Explore Malnad Choco Collection'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Handcrafted chocolates, protein-rich chocolate coated nuts, and artisanal gift boxes from the Western Ghats.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justify: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn ${selectedCategory === cat ? 'btn-gold' : 'btn-secondary'}`}
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProducts.map(prod => (
            <div key={prod.id} className="glass-card" style={{
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              position: 'relative'
            }}>
              <div>
                {/* Badge Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                    {prod.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '700' }}>
                    {prod.weight}
                  </span>
                </div>

                {/* Product Image */}
                <div style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '1.25rem',
                  height: '220px',
                  border: '1px solid var(--border-color)',
                  background: '#0e0503'
                }}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={12} fill="#d4af37" /> {prod.rating} ({prod.reviewsCount})
                  </div>
                </div>

                {/* Product Title & Kannada */}
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontFamily: 'Playfair Display', marginBottom: '0.2rem' }}>
                  {lang === 'ka' ? prod.kannadaName : prod.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
                  {lang === 'ka' ? prod.kannadaDescription : prod.description}
                </p>
              </div>

              {/* Footer Price & Add Button */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Price:</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-gold)', fontFamily: 'Playfair Display' }}>
                      ₹{prod.price}.00
                    </div>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedProduct(prod)}
                    title="View Nutrition & Ingredients"
                  >
                    <Info size={14} />
                    <span>Specs</span>
                  </button>
                </div>

                <button
                  className="btn btn-gold"
                  style={{ width: '100%' }}
                  onClick={() => onAddToCart(prod)}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Nutrition Modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display', color: 'var(--text-main)' }}>
                {selectedProduct.name} - Specifications
              </h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedProduct(null)}>✕</button>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-color)' }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)' }}>{selectedProduct.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0' }}>{selectedProduct.category} | Weight: {selectedProduct.weight}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>₹{selectedProduct.price}.00</div>
                  <span className="badge badge-green" style={{ marginTop: '6px' }}>🟢 100% Vegetarian</span>
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                <strong>Ingredients:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedProduct.ingredients}</p>
              </div>

              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Nutrition Information (per 100g):</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem' }}>
                <div style={{ background: 'var(--bg-darker)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>Energy: <strong>{selectedProduct.nutrition.energy}</strong></div>
                <div style={{ background: 'var(--bg-darker)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>Protein: <strong>{selectedProduct.nutrition.protein}</strong></div>
                <div style={{ background: 'var(--bg-darker)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>Carbohydrates: <strong>{selectedProduct.nutrition.carbs}</strong></div>
                <div style={{ background: 'var(--bg-darker)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>Total Fat: <strong>{selectedProduct.nutrition.fat}</strong></div>
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>Close</button>
              <button className="btn btn-gold" onClick={() => { onAddToCart(selectedProduct); setSelectedProduct(null); }}>Add to Cart (₹{selectedProduct.price})</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
