import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  DollarSign,
  FileSpreadsheet,
  Plus,
  Printer,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { calculateFarmerPayout, formatCurrency } from '../utils/rateCalculator';

export default function FarmerManagement({
  farmers,
  collections,
  feedSales,
  advances,
  onAddFarmer,
  onIssueAdvance,
  onPrintPassbook
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);

  // New Farmer Form state
  const [newFarmer, setNewFarmer] = useState({
    name: '',
    phone: '',
    village: '',
    cattleCount: '5',
    milkType: 'Cow',
    bankAccount: '',
    ifsc: ''
  });

  // Advance Form state
  const [advanceData, setAdvanceData] = useState({
    farmerId: '',
    amount: '',
    reason: 'Emergency Loan'
  });

  const handleAddFarmerSubmit = (e) => {
    e.preventDefault();
    if (!newFarmer.name || !newFarmer.phone) {
      alert('Please fill out required fields!');
      return;
    }

    const created = {
      id: `F-${100 + farmers.length + 1}`,
      name: newFarmer.name,
      phone: newFarmer.phone,
      village: newFarmer.village || 'Green Valley',
      cattleCount: parseInt(newFarmer.cattleCount) || 1,
      milkType: newFarmer.milkType,
      bankAccount: newFarmer.bankAccount || 'Not Provided',
      ifsc: newFarmer.ifsc || 'N/A',
      advanceBalance: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    onAddFarmer(created);
    setShowAddModal(false);
    setNewFarmer({ name: '', phone: '', village: '', cattleCount: '5', milkType: 'Cow', bankAccount: '', ifsc: '' });
  };

  const handleAdvanceSubmit = (e) => {
    e.preventDefault();
    if (!advanceData.farmerId || parseFloat(advanceData.amount) <= 0) {
      alert('Please select a farmer and enter a valid advance amount!');
      return;
    }

    onIssueAdvance({
      id: `ADV-${Date.now().toString().slice(-5)}`,
      farmerId: advanceData.farmerId,
      farmerName: farmers.find(f => f.id === advanceData.farmerId)?.name || 'Farmer',
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(advanceData.amount),
      reason: advanceData.reason,
      status: 'Outstanding'
    });

    setShowAdvanceModal(false);
    setAdvanceData({ farmerId: '', amount: '', reason: 'Emergency Loan' });
  };

  const filteredFarmers = farmers.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--text-main)' }}>
            Farmer Management & Passbook Ledger
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Register milk suppliers, manage advance loans, and generate settlement passbooks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowAdvanceModal(true)}
          >
            <DollarSign size={18} />
            <span>Issue Advance</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus size={18} />
            <span>Register Farmer</span>
          </button>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="glass-card">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h2 style={{ fontSize: '1.2rem' }}>Registered Suppliers ({filteredFarmers.length})</h2>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by name, ID or village..."
              className="form-control"
              style={{ paddingLeft: '36px' }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Farmer Code</th>
                <th>Supplier Name</th>
                <th>Village</th>
                <th>Cattle Count</th>
                <th>Milk Preference</th>
                <th>Bank Account</th>
                <th>Outstanding Advance</th>
                <th>Net Payout Summary</th>
                <th>Passbook Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map(farmer => {
                const payout = calculateFarmerPayout(farmer.id, collections, feedSales, advances);
                return (
                  <tr key={farmer.id}>
                    <td style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>
                      {farmer.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{farmer.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{farmer.phone}</div>
                    </td>
                    <td>{farmer.village}</td>
                    <td>
                      <span className="badge badge-info">
                        {farmer.cattleCount} Cattle
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${farmer.milkType === 'Cow' ? 'badge-success' : 'badge-warning'}`}>
                        {farmer.milkType}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {farmer.bankAccount}
                    </td>
                    <td>
                      {farmer.advanceBalance > 0 ? (
                        <span style={{ fontWeight: '700', color: '#f87171' }}>
                          {formatCurrency(farmer.advanceBalance)}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-dim)' }}>Nil</span>
                      )}
                    </td>
                    <td>
                      <div>
                        <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>
                          {formatCurrency(payout.netPayout)}
                        </strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          {payout.totalMilkLiters} L ({payout.collectionCount} deliveries)
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onPrintPassbook(farmer, payout)}
                      >
                        <Printer size={14} />
                        <span>Passbook Slip</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Farmer Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Register New Farmer</h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddFarmerSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Gurdeep Singh"
                    value={newFarmer.name}
                    onChange={e => setNewFarmer({ ...newFarmer, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+91 98765 00000"
                      value={newFarmer.phone}
                      onChange={e => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Village / Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Green Valley"
                      value={newFarmer.village}
                      onChange={e => setNewFarmer({ ...newFarmer, village: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Cattle Count</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={newFarmer.cattleCount}
                      onChange={e => setNewFarmer({ ...newFarmer, cattleCount: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Primary Milk Type</label>
                    <select
                      className="form-control"
                      value={newFarmer.milkType}
                      onChange={e => setNewFarmer({ ...newFarmer, milkType: e.target.value })}
                    >
                      <option value="Cow">Cow</option>
                      <option value="Buffalo">Buffalo</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Bank Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="SBI - 3400012399"
                      value={newFarmer.bankAccount}
                      onChange={e => setNewFarmer({ ...newFarmer, bankAccount: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">IFSC Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="SBIN0001234"
                      value={newFarmer.ifsc}
                      onChange={e => setNewFarmer({ ...newFarmer, ifsc: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Advance Modal */}
      {showAdvanceModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Issue Advance / Loan to Farmer</h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowAdvanceModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAdvanceSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Select Farmer *</label>
                  <select
                    className="form-control"
                    value={advanceData.farmerId}
                    onChange={e => setAdvanceData({ ...advanceData, farmerId: e.target.value })}
                    required
                  >
                    <option value="">-- Choose Supplier --</option>
                    {farmers.map(f => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.id}) - Advance Bal: {formatCurrency(f.advanceBalance)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Advance Amount (₹) *</label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    className="form-control"
                    placeholder="e.g. 2000"
                    value={advanceData.amount}
                    onChange={e => setAdvanceData({ ...advanceData, amount: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Purpose / Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Veterinary doctor fees or cattle feed loan"
                    value={advanceData.reason}
                    onChange={e => setAdvanceData({ ...advanceData, reason: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAdvanceModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Issue Advance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
