import React, { useState } from 'react';
import { TrendingUp, Settings, Save, CheckCircle, Table } from 'lucide-react';
import { calculateMilkRate, formatCurrency } from '../utils/rateCalculator';

export default function RateChart({ rateCharts, onSaveRateCharts }) {
  const [charts, setCharts] = useState(rateCharts);
  const [activeTab, setActiveTab] = useState('cow');

  const handleChange = (type, field, value) => {
    setCharts(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveRateCharts(charts);
    alert('Rate Chart Configuration saved successfully!');
  };

  const currentChart = charts[activeTab];

  // Generate Matrix Preview
  const fatValues = activeTab === 'cow' ? [3.2, 3.5, 3.8, 4.0, 4.2, 4.5] : [5.5, 6.0, 6.5, 7.0, 7.5, 8.0];
  const snfValues = activeTab === 'cow' ? [8.2, 8.5, 8.8, 9.0] : [8.5, 9.0, 9.2, 9.5];

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
            Milk Rate Chart Configurator
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Set base rates, Fat/SNF increment factors, and view calculated rate lookup grids.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={18} />
          <span>Save Rate Charts</span>
        </button>
      </div>

      {/* Cow vs Buffalo Tab Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${activeTab === 'cow' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('cow')}
        >
          🐄 Cow Milk Rate Chart
        </button>
        <button
          className={`btn ${activeTab === 'buffalo' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('buffalo')}
        >
          🐃 Buffalo Milk Rate Chart
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Parameters Form */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <Settings style={{ color: 'var(--primary)' }} size={22} />
            <h2 style={{ fontSize: '1.2rem' }}>
              {activeTab === 'cow' ? 'Cow' : 'Buffalo'} Formula Settings
            </h2>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Base Rate per Liter (₹) *</label>
              <input
                type="number"
                step="0.5"
                className="form-control"
                value={currentChart.baseRate}
                onChange={e => handleChange(activeTab, 'baseRate', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Base Fat %</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={currentChart.baseFat}
                  onChange={e => handleChange(activeTab, 'baseFat', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Base SNF %</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={currentChart.baseSNF}
                  onChange={e => handleChange(activeTab, 'baseSNF', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Fat Factor (₹ / 1.0%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={currentChart.fatFactor}
                  onChange={e => handleChange(activeTab, 'fatFactor', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">SNF Factor (₹ / 1.0%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={currentChart.snfFactor}
                  onChange={e => handleChange(activeTab, 'snfFactor', e.target.value)}
                />
              </div>
            </div>

            <div style={{
              background: 'var(--bg-glass)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginTop: '1rem'
            }}>
              <strong>Formula:</strong><br />
              <code style={{ color: 'var(--accent-blue)', display: 'block', marginTop: '4px' }}>
                Rate = BaseRate + (Fat - BaseFat) × FatFactor + (SNF - BaseSNF) × SNFFactor
              </code>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.25rem' }}>
              <Save size={16} /> Save Changes
            </button>
          </form>
        </div>

        {/* Generated Rate Matrix Grid */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
          }}>
            <h2 style={{ fontSize: '1.2rem' }}>Calculated Rate Lookup Matrix (₹/L)</h2>
            <span className="badge badge-info">Live Preview</span>
          </div>

          <div className="table-responsive">
            <table className="data-table" style={{ textAlig: 'center' }}>
              <thead>
                <tr>
                  <th style={{ background: 'var(--bg-card)' }}>Fat % ↓ \ SNF % →</th>
                  {snfValues.map(snf => (
                    <th key={snf} style={{ textAlign: 'center' }}>{snf}% SNF</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fatValues.map(fat => (
                  <tr key={fat}>
                    <td style={{ fontWeight: '700', background: 'var(--bg-card)' }}>{fat}% Fat</td>
                    {snfValues.map(snf => {
                      const rate = calculateMilkRate(activeTab, fat, snf, charts);
                      const isBase = fat === currentChart.baseFat && snf === currentChart.baseSNF;
                      return (
                        <td
                          key={snf}
                          style={{
                            textAlign: 'center',
                            fontWeight: isBase ? '800' : '600',
                            color: isBase ? 'var(--primary)' : 'var(--text-main)',
                            background: isBase ? 'var(--primary-glow)' : 'transparent'
                          }}
                        >
                          ₹{rate.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
