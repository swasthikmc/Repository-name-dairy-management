import React from 'react';
import {
  Milk,
  Users,
  DollarSign,
  TrendingUp,
  PlusCircle,
  ShoppingBag,
  Clock,
  Printer,
  ChevronRight
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { formatCurrency, formatNumber } from '../utils/rateCalculator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({
  collections,
  farmers,
  sales,
  customers,
  onNavigate,
  onPrintReceipt
}) {
  const today = new Date().toISOString().split('T')[0];

  // Calculate Key Metrics
  const todayCollections = collections.filter(c => c.date === today);
  const todayLiters = todayCollections.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  const todayPayout = todayCollections.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);

  const todaySales = sales.filter(s => s.date === today);
  const todayRevenue = todaySales.reduce((sum, s) => sum + (parseFloat(s.totalAmount) || 0), 0);

  // Cow vs Buffalo Milk breakdown
  const cowLiters = collections.filter(c => c.milkType === 'Cow').reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  const buffaloLiters = collections.filter(c => c.milkType === 'Buffalo').reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);

  // Daily Trend Data (Last 5 Days)
  const last5Days = [...Array(5)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (4 - i));
    return d.toISOString().split('T')[0];
  });

  const shiftDataMorning = last5Days.map(dateStr => {
    return collections
      .filter(c => c.date === dateStr && c.shift === 'Morning')
      .reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  });

  const shiftDataEvening = last5Days.map(dateStr => {
    return collections
      .filter(c => c.date === dateStr && c.shift === 'Evening')
      .reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  });

  const fatAvgData = last5Days.map(dateStr => {
    const dayCols = collections.filter(c => c.date === dateStr);
    if (dayCols.length === 0) return 4.0;
    const avg = dayCols.reduce((sum, c) => sum + (parseFloat(c.fat) || 0), 0) / dayCols.length;
    return Math.round(avg * 100) / 100;
  });

  const collectionBarChartData = {
    labels: last5Days.map(d => d.slice(5)),
    datasets: [
      {
        label: 'Morning Shift (L)',
        data: shiftDataMorning,
        backgroundColor: '#10b981',
        borderRadius: 6
      },
      {
        label: 'Evening Shift (L)',
        data: shiftDataEvening,
        backgroundColor: '#3b82f6',
        borderRadius: 6
      }
    ]
  };

  const doughnutData = {
    labels: ['Cow Milk', 'Buffalo Milk'],
    datasets: [
      {
        data: [cowLiters || 1, buffaloLiters || 1],
        backgroundColor: ['#10b981', '#f59e0b'],
        borderWidth: 0
      }
    ]
  };

  const qualityLineData = {
    labels: last5Days.map(d => d.slice(5)),
    datasets: [
      {
        label: 'Avg Fat %',
        data: fatAvgData,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#9ca3af', font: { family: 'Plus Jakarta Sans' } }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af' } }
    }
  };

  return (
    <div>
      {/* Top Banner Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--text-main)' }}>
            Dairy Operations Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time milk collection metrics, quality control, and financial ledger.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onNavigate('collection')}
        >
          <PlusCircle size={18} />
          <span>New Milk Entry</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="kpi-card glass-card">
          <div className="kpi-icon-wrapper">
            <Milk size={26} />
          </div>
          <div>
            <div className="kpi-title">Today's Milk Collection</div>
            <div className="kpi-value">{formatNumber(todayLiters, 1)} L</div>
            <div className="kpi-subtitle">
              {todayCollections.length} farmer entries today
            </div>
          </div>
        </div>

        <div className="kpi-card blue glass-card">
          <div className="kpi-icon-wrapper">
            <DollarSign size={26} />
          </div>
          <div>
            <div className="kpi-title">Today's Milk Payout</div>
            <div className="kpi-value">{formatCurrency(todayPayout)}</div>
            <div className="kpi-subtitle">
              Calculated from Fat & SNF rate chart
            </div>
          </div>
        </div>

        <div className="kpi-card amber glass-card">
          <div className="kpi-icon-wrapper">
            <ShoppingBag size={26} />
          </div>
          <div>
            <div className="kpi-title">Daily Customer Revenue</div>
            <div className="kpi-value">{formatCurrency(todayRevenue)}</div>
            <div className="kpi-subtitle">
              {todaySales.length} milk & dairy sales recorded
            </div>
          </div>
        </div>

        <div className="kpi-card purple glass-card">
          <div className="kpi-icon-wrapper">
            <Users size={26} />
          </div>
          <div>
            <div className="kpi-title">Registered Farmers</div>
            <div className="kpi-value">{farmers.length}</div>
            <div className="kpi-subtitle">
              Active milk suppliers
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Bar Chart: Daily Milk Trends */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.1rem' }}>Shift Milk Collection Trend</h3>
            <span className="badge badge-success">5 Days</span>
          </div>
          <div style={{ height: '230px' }}>
            <Bar data={collectionBarChartData} options={chartOptions} />
          </div>
        </div>

        {/* Doughnut Chart: Cow vs Buffalo */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.1rem' }}>Milk Type Share</h3>
            <span className="badge badge-info">Total Liters</span>
          </div>
          <div style={{ height: '230px', position: 'relative' }}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Line Chart: Fat Quality */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.1rem' }}>Average Fat % Quality</h3>
            <span className="badge badge-warning">Quality Control</span>
          </div>
          <div style={{ height: '230px' }}>
            <Line data={qualityLineData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Milk Collections & Quick Shortcuts */}
      <div className="glass-card">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem' }}>Recent Milk Collections</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Latest entries recorded at the collection counter
            </p>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('collection')}
          >
            <span>View All Collections</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Farmer Name</th>
                <th>Shift</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Fat %</th>
                <th>SNF %</th>
                <th>Rate / L</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collections.slice(0, 5).map((col) => (
                <tr key={col.id}>
                  <td style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>
                    {col.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{col.farmerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      ID: {col.farmerId}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${col.shift === 'Morning' ? 'badge-warning' : 'badge-purple'}`}>
                      {col.shift === 'Morning' ? '☀️ Morning' : '🌙 Evening'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${col.milkType === 'Cow' ? 'badge-success' : 'badge-info'}`}>
                      {col.milkType}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700' }}>{col.quantity} L</td>
                  <td>{col.fat}%</td>
                  <td>{col.snf}%</td>
                  <td>{formatCurrency(col.rate)}</td>
                  <td style={{ fontWeight: '800', color: 'var(--primary)' }}>
                    {formatCurrency(col.amount)}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onPrintReceipt(col)}
                      title="Print Collection Slip"
                    >
                      <Printer size={14} />
                      <span>Print Slip</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
