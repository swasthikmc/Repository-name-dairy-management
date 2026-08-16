import React from 'react';
import { Printer, X, CheckCircle, Milk } from 'lucide-react';
import { formatCurrency } from '../utils/rateCalculator';

export default function ReceiptModal({ data, type, settings, onClose }) {
  if (!data) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '420px' }}>
        <div className="modal-header no-print">
          <h3 style={{ fontSize: '1.1rem' }}>
            {type === 'collection' && 'Milk Collection Slip'}
            {type === 'passbook' && 'Farmer Settlement Passbook'}
            {type === 'invoice' && 'Customer Invoice'}
          </h3>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1rem' }}>
          {/* Printable Receipt Card */}
          <div className="printable-slip" style={{
            background: '#ffffff',
            color: '#000000',
            padding: '1.25rem',
            borderRadius: '8px',
            fontFamily: "'Courier New', Courier, monospace",
            border: '2px dashed #333'
          }}>
            {/* Header Logo & Address */}
            <div style={{ textAlign: 'center', marginBottom: '1rem', borderBottom: '1px solid #000', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, textTransform: 'uppercase' }}>
                {settings.dairyName}
              </h2>
              <div style={{ fontSize: '0.75rem' }}>{settings.address}</div>
              <div style={{ fontSize: '0.75rem' }}>Phone: {settings.phone}</div>
              {settings.gstin && <div style={{ fontSize: '0.7rem' }}>GSTIN: {settings.gstin}</div>}
            </div>

            {/* Milk Collection Entry Slip */}
            {type === 'collection' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <span>Slip #: <strong>{data.id}</strong></span>
                  <span>{data.date}</span>
                </div>
                <div style={{ fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                  Shift: <strong>{data.shift}</strong> | Type: <strong>{data.milkType}</strong>
                </div>

                <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '0.5rem 0', margin: '0.5rem 0', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Farmer:</span>
                    <strong>{data.farmerName} ({data.farmerId})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>Quantity (L):</span>
                    <strong>{data.quantity} L</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>Fat % / SNF %:</span>
                    <span>{data.fat}% / {data.snf}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>Rate / Liter:</span>
                    <span>{formatCurrency(data.rate)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', marginTop: '0.75rem' }}>
                  <span>NET PAYABLE:</span>
                  <span>{formatCurrency(data.amount)}</span>
                </div>
              </div>
            )}

            {/* Farmer Passbook Payout Slip */}
            {type === 'passbook' && (
              <div>
                <div style={{ textAlign: 'center', fontWeight: '700', textDecoration: 'underline', marginBottom: '0.5rem' }}>
                  FARMER PAYOUT SETTLEMENT
                </div>

                <div style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <div>Farmer Code: <strong>{data.farmer.id}</strong></div>
                  <div>Supplier: <strong>{data.farmer.name}</strong></div>
                  <div>Village: {data.farmer.village}</div>
                  <div>Bank: {data.farmer.bankAccount}</div>
                </div>

                <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '0.5rem 0', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total Deliveries:</span>
                    <span>{data.payout.collectionCount} entries</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>Total Milk Quantity:</span>
                    <strong>{data.payout.totalMilkLiters} L</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>Gross Milk Earnings:</span>
                    <span>{formatCurrency(data.payout.totalMilkEarnings)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', color: '#c53030' }}>
                    <span>Cattle Feed Deductions:</span>
                    <span>- {formatCurrency(data.payout.totalFeedDeductions)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', color: '#c53030' }}>
                    <span>Advance Loan Recovery:</span>
                    <span>- {formatCurrency(data.payout.totalAdvanceDeductions)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', marginTop: '0.75rem' }}>
                  <span>NET BANK PAYOUT:</span>
                  <span>{formatCurrency(data.payout.netPayout)}</span>
                </div>
              </div>
            )}

            {/* Customer Sales Invoice */}
            {type === 'invoice' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <span>Invoice #: <strong>{data.id}</strong></span>
                  <span>{data.date}</span>
                </div>
                <div style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  Customer: <strong>{data.customerName}</strong>
                </div>

                <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '0.5rem 0', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Item:</span>
                    <strong>{data.item}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>Qty x Rate:</span>
                    <span>{data.quantity} {data.unit || 'L'} @ {formatCurrency(data.rate)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', marginTop: '0.75rem' }}>
                  <span>TOTAL BILL:</span>
                  <span>{formatCurrency(data.totalAmount)}</span>
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  Status: <strong>{data.paymentStatus}</strong>
                </div>
              </div>
            )}

            <div style={{ textAlign: 'center', fontSize: '0.7rem', marginTop: '1.25rem', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
              *** Thank You for Partnering with Us ***<br />
              Generated on {new Date().toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="modal-footer no-print">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Receipt / Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
