import React from 'react';
import {
  LayoutDashboard,
  Milk,
  Users,
  ShoppingBag,
  Package,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange, counts }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'collection', label: 'Milk Collection', icon: Milk, badge: counts.collections },
    { id: 'farmers', label: 'Farmers & Ledger', icon: Users, badge: counts.farmers },
    { id: 'customers', label: 'Customer Sales', icon: ShoppingBag, badge: counts.customers },
    { id: 'inventory', label: 'Stock & Feed', icon: Package },
    { id: 'ratechart', label: 'Rate Chart Config', icon: TrendingUp },
    { id: 'reports', label: 'Reports & Slips', icon: FileText }
  ];

  return (
    <aside style={{
      width: '240px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      gap: '0.5rem'
    }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: '700',
        color: 'var(--text-dim)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '0 0.75rem 0.5rem 0.75rem'
      }}>
        Main Menu
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? '700' : '500',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--bg-glass)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span style={{
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-input)',
                  color: isActive ? '#ffffff' : 'var(--text-dim)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
