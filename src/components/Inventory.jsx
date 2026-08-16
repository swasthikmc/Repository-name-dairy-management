import React, { useState } from 'react';
import {
  Package,
  PlusCircle,
  AlertTriangle,
  ShoppingBag,
  Milk,
  CheckCircle,
  TrendingDown
} from 'lucide-react';
import { formatCurrency } from '../utils/rateCalculator';

export default function Inventory({
  inventory,
  collections,
  sales,
  farmers,
  onUpdateStock,
  onAddFeedSale
}) {
  const [showFeedSaleModal, setShowFeedSaleModal] = useState(false);
  const [feedForm, setFeedForm] = useState({
    farmerId: '',
    feedItem: 'High Protein Cattle Feed Pellets (50kg)',
    quantity: '1',
    unitPrice: '1250',
    deductFromPayout: true
  });

  // Calculate Raw Milk Balance
  const totalCollectedLiters = collections.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  const totalSoldLiters = sales
    .filter(s => s.item.toLowerCase().includes('milk'))
    .reduce((sum, s) => sum + (parseFloat(s.quantity) || 0), 0);

  const rawMilkBalance = Math.max(0, totalCollectedLiters - totalSoldLiters);

  const handleFeedSaleSubmit = (e) => {
    e.preventDefault();
    if (!feedForm.farmerId) {
      alert('Please select a farmer!');
      return;
    }

    const qty = parseFloat(feedForm.quantity) || 1;
    const price = parseFloat(feedForm.unitPrice) || 0;
    const selectedFarmer = farmers.find(f => f.id === feedForm.farmerId);

    onAddFeedSale({
      id: `FS-${Date.now().toString().slice(-5)}`,
      farmerId: feedForm.farmerId,
      farmerName: selectedFarmer ? selectedFarmer.name : 'Farmer',
      date: new Date().toISOString().split('T')[0],
      feedItem: feedForm.feedItem,
      quantity: qty,
      unitPrice: price,
      totalAmount: Math.round(qty * price * 100) / 100,
      deductFromPayout: feedForm.deductFromPayout
    });

    setShowFeedSaleModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--text-main)' }}>
            Raw Milk & Product Stock Inventory
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Track raw milk balance, dairy product stock, and cattle feed distribution.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowFeedSaleModal(true)}
        >
          <PlusCircle size={18} />
          <span>Issue Feed to Farmer</span>
        </button>
      </div>

      {/* Raw Milk Live Tank Balance Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
        border: '1px solid var(--border-color-glow)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.75rem 2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 8px 24px var(--primary-glow)'
          }}>
            <Milk size={32} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              CURRENT RAW MILK BULK TANK BALANCE
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--text-main)' }}>
              {rawMilkBalance.toFixed(1)} Liters
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Total Collected: {totalCollectedLiters.toFixed(1)} L | Total Sales: {totalSoldLiters.toFixed(1)} L
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
            <CheckCircle size={14} /> Tank Status: Healthy
          </span>
        </div>
      </div>

      {/* Processed & Feed Inventory Table */}
      <div className="glass-card">
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.2rem' }}>Inventory Stock List</h2>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU ID</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Available Stock</th>
                <th>Unit Price</th>
                <th>Reorder Level</th>
                <th>Stock Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => {
                const isLow = item.stockQuantity <= item.reorderLevel;
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>{item.id}</td>
                    <td>
                      <span className={`badge ${item.category === 'Cattle Feed' ? 'badge-amber' : 'badge-purple'}`}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: '600' }}>{item.name}</td>
                    <td style={{ fontWeight: '800', fontSize: '1rem' }}>
                      {item.stockQuantity} {item.unit}
                    </td>
                    <td>{formatCurrency(item.pricePerUnit)}</td>
                    <td style={{ color: 'var(--text-dim)' }}>{item.reorderLevel} {item.unit}</td>
                    <td>
                      {isLow ? (
                        <span className="badge badge-warning">
                          <AlertTriangle size={12} /> Low Stock
                        </span>
                      ) : (
                        <span className="badge badge-success">Sufficient</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          const newQty = prompt(`Update stock quantity for ${item.name}:`, item.stockQuantity);
                          if (newQty !== null && !isNaN(newQty)) {
                            onUpdateStock(item.id, parseFloat(newQty));
                          }
                        }}
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Feed Modal */}
      {showFeedSaleModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Issue Cattle Feed to Farmer</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowFeedSaleModal(false)}>✕</button>
            </div>
            <form onSubmit={handleFeedSaleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Select Farmer *</label>
                  <select
                    className="form-control"
                    value={feedForm.farmerId}
                    onChange={e => setFeedForm({ ...feedForm, farmerId: e.target.value })}
                    required
                  >
                    <option value="">-- Choose Supplier --</option>
                    {farmers.map(f => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Cattle Feed Item</label>
                  <select
                    className="form-control"
                    value={feedForm.feedItem}
                    onChange={e => setFeedForm({ ...feedForm, feedItem: e.target.value })}
                  >
                    <option value="High Protein Cattle Feed Pellets (50kg)">High Protein Cattle Feed Pellets (50kg) - ₹1,250</option>
                    <option value="Mineral Mixture Granules (1kg)">Mineral Mixture Granules (1kg) - ₹180</option>
                    <option value="Liquid Calcium Booster (5L)">Liquid Calcium Booster (5L) - ₹620</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={feedForm.quantity}
                      onChange={e => setFeedForm({ ...feedForm, quantity: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Unit Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={feedForm.unitPrice}
                      onChange={e => setFeedForm({ ...feedForm, unitPrice: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginTop: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={feedForm.deductFromPayout}
                      onChange={e => setFeedForm({ ...feedForm, deductFromPayout: e.target.checked })}
                    />
                    <span>Deduct amount directly from next Milk Payout</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowFeedSaleModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Issue Feed</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
