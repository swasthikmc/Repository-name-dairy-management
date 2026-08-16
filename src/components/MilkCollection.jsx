import React, { useState, useEffect } from 'react';
import {
  Milk,
  PlusCircle,
  Search,
  Filter,
  Printer,
  Trash2,
  CheckCircle,
  Calculator
} from 'lucide-react';
import { calculateMilkRate, formatCurrency, formatNumber } from '../utils/rateCalculator';

export default function MilkCollection({
  farmers,
  collections,
  rateCharts,
  activeShift,
  onAddCollection,
  onDeleteCollection,
  onPrintReceipt
}) {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    farmerId: '',
    date: today,
    shift: activeShift || 'Morning',
    milkType: 'Cow',
    quantity: '',
    fat: '3.8',
    snf: '8.5'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterShift, setFilterShift] = useState('All');
  const [filterType, setFilterType] = useState('All');

  // Update form shift when active shift changes globally
  useEffect(() => {
    setFormData(prev => ({ ...prev, shift: activeShift }));
  }, [activeShift]);

  // Selected farmer details
  const selectedFarmer = farmers.find(f => f.id === formData.farmerId);

  // Auto set milk type when farmer is selected
  const handleFarmerChange = (e) => {
    const fId = e.target.value;
    const f = farmers.find(item => item.id === fId);
    setFormData(prev => ({
      ...prev,
      farmerId: fId,
      milkType: f ? (f.milkType || 'Cow') : prev.milkType
    }));
  };

  // Calculate live rate and total amount
  const calculatedRate = calculateMilkRate(
    formData.milkType,
    formData.fat,
    formData.snf,
    rateCharts
  );
  const qty = parseFloat(formData.quantity) || 0;
  const calculatedTotal = Math.round(calculatedRate * qty * 100) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.farmerId) {
      alert('Please select a farmer!');
      return;
    }
    if (qty <= 0) {
      alert('Please enter a valid quantity in liters!');
      return;
    }

    const newRecord = {
      id: `COL-${Date.now().toString().slice(-6)}`,
      farmerId: formData.farmerId,
      farmerName: selectedFarmer ? selectedFarmer.name : 'Unknown Farmer',
      date: formData.date,
      shift: formData.shift,
      milkType: formData.milkType,
      quantity: parseFloat(formData.quantity),
      fat: parseFloat(formData.fat),
      snf: parseFloat(formData.snf),
      rate: calculatedRate,
      amount: calculatedTotal,
      timestamp: new Date().toLocaleString('en-IN')
    };

    onAddCollection(newRecord);

    // Reset quantity
    setFormData(prev => ({
      ...prev,
      quantity: ''
    }));

    // Auto open print receipt for user convenience
    onPrintReceipt(newRecord);
  };

  // Filtered collection list
  const filteredCollections = collections.filter(c => {
    const matchesSearch = c.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.farmerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShift = filterShift === 'All' || c.shift === filterShift;
    const matchesType = filterType === 'All' || c.milkType === filterType;
    return matchesSearch && matchesShift && matchesType;
  });

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--text-main)' }}>
          Milk Collection Counter
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Record daily morning and evening milk entries with auto Fat/SNF rate calculation.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Entry Form Column */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <Calculator style={{ color: 'var(--primary)' }} size={22} />
            <h2 style={{ fontSize: '1.2rem' }}>New Collection Entry</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Farmer Selection */}
            <div className="form-group">
              <label className="form-label">Select Farmer *</label>
              <select
                className="form-control"
                value={formData.farmerId}
                onChange={handleFarmerChange}
                required
              >
                <option value="">-- Choose Farmer --</option>
                {farmers.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.id}) - {f.village}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Shift Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Shift</label>
                <select
                  className="form-control"
                  value={formData.shift}
                  onChange={e => setFormData({ ...formData, shift: e.target.value })}
                >
                  <option value="Morning">☀️ Morning</option>
                  <option value="Evening">🌙 Evening</option>
                </select>
              </div>
            </div>

            {/* Milk Type */}
            <div className="form-group">
              <label className="form-label">Milk Type</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['Cow', 'Buffalo', 'Mixed'].map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`btn ${formData.milkType === type ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, padding: '0.5rem' }}
                    onClick={() => setFormData({ ...formData, milkType: type })}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label">Quantity (Liters) *</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                className="form-control"
                placeholder="e.g. 25.5"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>

            {/* Fat & SNF Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Fat %</label>
                <input
                  type="number"
                  step="0.1"
                  min="1.0"
                  max="12.0"
                  className="form-control"
                  value={formData.fat}
                  onChange={e => setFormData({ ...formData, fat: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">SNF %</label>
                <input
                  type="number"
                  step="0.1"
                  min="6.0"
                  max="12.0"
                  className="form-control"
                  value={formData.snf}
                  onChange={e => setFormData({ ...formData, snf: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Calculation Live Preview Card */}
            <div style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color-glow)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginTop: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Calculated Rate / L:</span>
                <strong style={{ color: 'var(--accent-blue)', fontSize: '1rem' }}>
                  {formatCurrency(calculatedRate)}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>Total Amount Payable:</span>
                <strong style={{ color: 'var(--primary)', fontSize: '1.2rem', fontFamily: 'Outfit' }}>
                  {formatCurrency(calculatedTotal)}
                </strong>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <CheckCircle size={18} />
              <span>Save & Print Slip</span>
            </button>
          </form>
        </div>

        {/* Collection History Table Column */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <h2 style={{ fontSize: '1.2rem' }}>Collection History ({filteredCollections.length})</h2>

            {/* Filters & Search */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search farmer or ID..."
                  className="form-control"
                  style={{ paddingLeft: '30px', height: '34px', fontSize: '0.8rem', width: '180px' }}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="form-control"
                style={{ height: '34px', fontSize: '0.8rem', width: '110px' }}
                value={filterShift}
                onChange={e => setFilterShift(e.target.value)}
              >
                <option value="All">All Shifts</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>

              <select
                className="form-control"
                style={{ height: '34px', fontSize: '0.8rem', width: '110px' }}
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Cow">Cow</option>
                <option value="Buffalo">Buffalo</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
          </div>

          <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date & Shift</th>
                  <th>Farmer</th>
                  <th>Milk</th>
                  <th>Qty (L)</th>
                  <th>Fat / SNF</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCollections.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No collection entries found. Use the form to record a new entry.
                    </td>
                  </tr>
                ) : (
                  filteredCollections.map(col => (
                    <tr key={col.id}>
                      <td style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--accent-blue)' }}>
                        {col.id}
                      </td>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>{col.date}</div>
                        <span className={`badge ${col.shift === 'Morning' ? 'badge-warning' : 'badge-purple'}`}>
                          {col.shift}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600' }}>{col.farmerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          {col.farmerId}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${col.milkType === 'Cow' ? 'badge-success' : 'badge-info'}`}>
                          {col.milkType}
                        </span>
                      </td>
                      <td style={{ fontWeight: '700' }}>{col.quantity}</td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {col.fat}% / {col.snf}%
                      </td>
                      <td style={{ fontWeight: '800', color: 'var(--primary)' }}>
                        {formatCurrency(col.amount)}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => onPrintReceipt(col)}
                            title="Print Receipt"
                          >
                            <Printer size={13} />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              if (window.confirm(`Delete collection entry ${col.id}?`)) {
                                onDeleteCollection(col.id);
                              }
                            }}
                            title="Delete Entry"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
