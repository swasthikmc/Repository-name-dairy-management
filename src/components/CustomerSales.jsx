import React, { useState } from 'react';
import {
  ShoppingBag,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  DollarSign,
  UserCheck
} from 'lucide-react';
import { formatCurrency } from '../utils/rateCalculator';

export default function CustomerSales({
  customers,
  sales,
  inventory,
  onAddCustomer,
  onAddSale,
  onPrintInvoice
}) {
  const today = new Date().toISOString().split('T')[0];

  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    type: 'Commercial',
    phone: '',
    address: '',
    dailyQuotaLiters: '20',
    milkPreference: 'Cow',
    agreedRatePerLiter: '48'
  });

  // New Sale Form State
  const [saleForm, setSaleForm] = useState({
    customerId: '',
    item: 'Raw Cow Milk',
    quantity: '10',
    unit: 'Liters',
    rate: '48',
    paymentStatus: 'Paid'
  });

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) {
      alert('Please fill out required fields!');
      return;
    }

    onAddCustomer({
      id: `C-${200 + customers.length + 1}`,
      name: newCustomer.name,
      type: newCustomer.type,
      phone: newCustomer.phone,
      address: newCustomer.address || 'Local City',
      dailyQuotaLiters: parseFloat(newCustomer.dailyQuotaLiters) || 0,
      milkPreference: newCustomer.milkPreference,
      agreedRatePerLiter: parseFloat(newCustomer.agreedRatePerLiter) || 50,
      currentBalance: 0,
      status: 'Active'
    });

    setShowCustomerModal(false);
    setNewCustomer({ name: '', type: 'Commercial', phone: '', address: '', dailyQuotaLiters: '20', milkPreference: 'Cow', agreedRatePerLiter: '48' });
  };

  const handleSaleSubmit = (e) => {
    e.preventDefault();
    if (!saleForm.customerId || parseFloat(saleForm.quantity) <= 0) {
      alert('Please select a customer and enter valid quantity!');
      return;
    }

    const selectedCust = customers.find(c => c.id === saleForm.customerId);
    const qty = parseFloat(saleForm.quantity);
    const rate = parseFloat(saleForm.rate);
    const totalAmount = Math.round(qty * rate * 100) / 100;

    const saleRecord = {
      id: `SAL-${Date.now().toString().slice(-5)}`,
      customerId: saleForm.customerId,
      customerName: selectedCust ? selectedCust.name : 'Walk-in Customer',
      date: today,
      item: saleForm.item,
      quantity: qty,
      unit: saleForm.unit,
      rate: rate,
      totalAmount: totalAmount,
      paymentStatus: saleForm.paymentStatus,
      timestamp: new Date().toLocaleString('en-IN')
    };

    onAddSale(saleRecord);
    setShowSaleModal(false);
    onPrintInvoice(saleRecord);
  };

  const filteredSales = sales.filter(s =>
    s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
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
            Customer Sales & Subscriptions
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage commercial buyers, daily milk subscriptions, and product sales billing.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowCustomerModal(true)}
          >
            <UserCheck size={18} />
            <span>Add Buyer / Subscriber</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setShowSaleModal(true)}
          >
            <PlusCircle size={18} />
            <span>Record New Sale</span>
          </button>
        </div>
      </div>

      {/* Customer Quick Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {customers.map(c => (
          <div key={c.id} className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className={`badge ${c.type === 'Commercial' ? 'badge-info' : 'badge-purple'}`}>
                {c.type}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-blue)' }}>
                {c.id}
              </span>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{c.name}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              {c.phone} | {c.address}
            </div>
            <div style={{
              display: 'flex',
              justify: 'space-between',
              fontSize: '0.85rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Quota: </span>
                <strong>{c.dailyQuotaLiters} L / day</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Rate: </span>
                <strong style={{ color: 'var(--primary)' }}>{formatCurrency(c.agreedRatePerLiter)}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Transactions Table Card */}
      <div className="glass-card">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h2 style={{ fontSize: '1.2rem' }}>Sales Transactions ({filteredSales.length})</h2>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search customer or item..."
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
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Buyer Name</th>
                <th>Product / Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => (
                <tr key={sale.id}>
                  <td style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>{sale.id}</td>
                  <td>{sale.date}</td>
                  <td style={{ fontWeight: '600' }}>{sale.customerName}</td>
                  <td>{sale.item}</td>
                  <td style={{ fontWeight: '700' }}>{sale.quantity} {sale.unit || 'L'}</td>
                  <td>{formatCurrency(sale.rate)}</td>
                  <td style={{ fontWeight: '800', color: 'var(--primary)' }}>
                    {formatCurrency(sale.totalAmount)}
                  </td>
                  <td>
                    <span className={`badge ${sale.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                      {sale.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onPrintInvoice(sale)}
                    >
                      <Printer size={14} />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showCustomerModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Add Customer / Wholesale Buyer</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowCustomerModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCustomerSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Buyer Name / Business Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Royal Sweets & Bakery"
                    value={newCustomer.name}
                    onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select
                      className="form-control"
                      value={newCustomer.type}
                      onChange={e => setNewCustomer({ ...newCustomer, type: e.target.value })}
                    >
                      <option value="Commercial">Commercial (Hotel/Sweet Shop)</option>
                      <option value="Retail Subscriber">Retail Household</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={newCustomer.phone}
                      onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Shop #12, Market Square"
                    value={newCustomer.address}
                    onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Daily Milk Quota (Liters)</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={newCustomer.dailyQuotaLiters}
                      onChange={e => setNewCustomer({ ...newCustomer, dailyQuotaLiters: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Agreed Rate / Liter (₹)</label>
                    <input
                      type="number"
                      step="0.5"
                      className="form-control"
                      value={newCustomer.agreedRatePerLiter}
                      onChange={e => setNewCustomer({ ...newCustomer, agreedRatePerLiter: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCustomerModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Buyer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Sale Modal */}
      {showSaleModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Record Customer Sale</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowSaleModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Select Customer *</label>
                  <select
                    className="form-control"
                    value={saleForm.customerId}
                    onChange={e => {
                      const cId = e.target.value;
                      const cust = customers.find(c => c.id === cId);
                      setSaleForm({
                        ...saleForm,
                        customerId: cId,
                        rate: cust ? cust.agreedRatePerLiter.toString() : saleForm.rate
                      });
                    }}
                    required
                  >
                    <option value="">-- Select Buyer --</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.type}) - Agreed Rate: ₹{c.agreedRatePerLiter}/L
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Item / Product</label>
                    <select
                      className="form-control"
                      value={saleForm.item}
                      onChange={e => setSaleForm({ ...saleForm, item: e.target.value })}
                    >
                      <option value="Raw Cow Milk">Raw Cow Milk</option>
                      <option value="Raw Buffalo Milk">Raw Buffalo Milk</option>
                      <option value="Fresh Paneer (Cottage Cheese)">Fresh Paneer</option>
                      <option value="Pure Desi Cow Ghee">Desi Ghee</option>
                      <option value="Cultured Fresh Curd (Dahi)">Fresh Curd</option>
                      <option value="Salted Dairy Butter">Butter</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      className="form-control"
                      value={saleForm.quantity}
                      onChange={e => setSaleForm({ ...saleForm, quantity: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Unit Rate (₹)</label>
                    <input
                      type="number"
                      step="0.5"
                      className="form-control"
                      value={saleForm.rate}
                      onChange={e => setSaleForm({ ...saleForm, rate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Payment Status</label>
                    <select
                      className="form-control"
                      value={saleForm.paymentStatus}
                      onChange={e => setSaleForm({ ...saleForm, paymentStatus: e.target.value })}
                    >
                      <option value="Paid">Paid Immediately</option>
                      <option value="Pending">Pending (Add to Balance)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowSaleModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Complete Sale & Print</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
