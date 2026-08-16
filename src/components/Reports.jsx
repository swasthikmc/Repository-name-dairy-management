import React, { useState } from 'react';
import {
  FileText,
  Download,
  Upload,
  Calendar,
  Filter,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/rateCalculator';

export default function Reports({ collections, farmers, sales, settings }) {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const dayCollections = collections.filter(c => c.date === selectedDate);
  const morningCols = dayCollections.filter(c => c.shift === 'Morning');
  const eveningCols = dayCollections.filter(c => c.shift === 'Evening');

  const morningLiters = morningCols.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  const morningAmount = morningCols.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);

  const eveningLiters = eveningCols.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  const eveningAmount = eveningCols.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);

  // CSV Export Handler
  const exportToCSV = () => {
    const headers = ['Receipt ID', 'Date', 'Shift', 'Farmer Code', 'Farmer Name', 'Milk Type', 'Quantity (L)', 'Fat %', 'SNF %', 'Rate/L', 'Total Amount'];
    const rows = collections.map(c => [
      c.id,
      c.date,
      c.shift,
      c.farmerId,
      `"${c.farmerName}"`,
      c.milkType,
      c.quantity,
      c.fat,
      c.snf,
      c.rate,
      c.amount
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Milk_Collection_Report_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Backup JSON Export Handler
  const exportJSONBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      collections,
      farmers,
      sales,
      settings,
      exportDate: new Date().toISOString()
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dairy_management_backup_${today}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
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
            Daily Shift & Export Reports
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Generate daily summary sheets, export CSV ledgers, and download system backups.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={exportToCSV}>
            <FileSpreadsheet size={18} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={exportJSONBackup}>
            <Download size={18} />
            <span>Backup Data (JSON)</span>
          </button>
        </div>
      </div>

      {/* Date Filter Bar */}
      <div className="glass-card" style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Calendar size={20} style={{ color: 'var(--primary)' }} />
        <label style={{ fontWeight: '600' }}>Select Shift Date:</label>
        <input
          type="date"
          className="form-control"
          style={{ width: '200px' }}
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Shift Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="badge badge-warning">☀️ Morning Shift Summary</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedDate}</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--text-main)' }}>
            {formatNumber(morningLiters, 1)} Liters
          </div>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', marginTop: '0.25rem' }}>
            Payout: {formatCurrency(morningAmount)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
            Total entries: {morningCols.length}
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="badge badge-purple">🌙 Evening Shift Summary</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedDate}</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--text-main)' }}>
            {formatNumber(eveningLiters, 1)} Liters
          </div>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-blue)', marginTop: '0.25rem' }}>
            Payout: {formatCurrency(eveningAmount)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
            Total entries: {eveningCols.length}
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="badge badge-success">📊 Total Daily Milk Combined</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedDate}</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--primary)' }}>
            {formatNumber(morningLiters + eveningLiters, 1)} Liters
          </div>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '0.25rem' }}>
            Total Payout: {formatCurrency(morningAmount + eveningAmount)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
            Total entries: {dayCollections.length}
          </div>
        </div>
      </div>

      {/* Selected Day Collection Table */}
      <div className="glass-card">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>
          Shift Detailed Entries ({dayCollections.length})
        </h2>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Shift</th>
                <th>Farmer Code</th>
                <th>Supplier Name</th>
                <th>Milk Type</th>
                <th>Liters</th>
                <th>Fat %</th>
                <th>SNF %</th>
                <th>Rate / L</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {dayCollections.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No collections recorded for date {selectedDate}.
                  </td>
                </tr>
              ) : (
                dayCollections.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>{c.id}</td>
                    <td>
                      <span className={`badge ${c.shift === 'Morning' ? 'badge-warning' : 'badge-purple'}`}>
                        {c.shift}
                      </span>
                    </td>
                    <td>{c.farmerId}</td>
                    <td style={{ fontWeight: '600' }}>{c.farmerName}</td>
                    <td>{c.milkType}</td>
                    <td style={{ fontWeight: '700' }}>{c.quantity} L</td>
                    <td>{c.fat}%</td>
                    <td>{c.snf}%</td>
                    <td>{formatCurrency(c.rate)}</td>
                    <td style={{ fontWeight: '800', color: 'var(--primary)' }}>
                      {formatCurrency(c.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
