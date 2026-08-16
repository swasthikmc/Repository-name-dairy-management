import React from 'react';
import { Sun, Moon, Milk, Calendar, RefreshCw, Layers } from 'lucide-react';

export default function Navbar({
  settings,
  onShiftChange,
  theme,
  onToggleTheme,
  onResetData,
  todayLiters,
  todayCount
}) {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header style={{
      height: '70px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
        }}>
          <Milk size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', lineHeight: '1.1', color: 'var(--text-main)' }}>
            {settings.dairyName}
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {settings.tagline}
          </span>
        </div>
      </div>

      {/* Center Quick Shift & Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <Calendar size={16} />
          <span>{currentDate}</span>
        </div>

        {/* Active Shift Switcher */}
        <div className="shift-toggle">
          <button
            className={`shift-btn ${settings.activeShift === 'Morning' ? 'active' : ''}`}
            onClick={() => onShiftChange('Morning')}
          >
            ☀️ Morning
          </button>
          <button
            className={`shift-btn ${settings.activeShift === 'Evening' ? 'active' : ''}`}
            onClick={() => onShiftChange('Evening')}
          >
            🌙 Evening
          </button>
        </div>

        {/* Live Today Summary Pills */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          background: 'var(--bg-glass)',
          padding: '0.4rem 0.85rem',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          fontSize: '0.8rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Today: </span>
            <strong style={{ color: 'var(--primary)' }}>{todayLiters} L</strong>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Entries: </span>
            <strong style={{ color: 'var(--accent-blue)' }}>{todayCount}</strong>
          </div>
        </div>
      </div>

      {/* Controls Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={onToggleTheme}
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            if (window.confirm('Reset app data to default sample records?')) {
              onResetData();
            }
          }}
          title="Reset Sample Data"
        >
          <RefreshCw size={14} />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
}
