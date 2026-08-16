import {
  INITIAL_FARMERS,
  DEFAULT_RATE_CHARTS,
  INITIAL_COLLECTIONS,
  INITIAL_CUSTOMERS,
  INITIAL_SALES,
  INITIAL_INVENTORY,
  INITIAL_ADVANCES,
  INITIAL_FEED_SALES
} from '../data/mockData';

const KEYS = {
  FARMERS: 'dairy_mgmt_farmers',
  RATE_CHARTS: 'dairy_mgmt_rate_charts',
  COLLECTIONS: 'dairy_mgmt_collections',
  CUSTOMERS: 'dairy_mgmt_customers',
  SALES: 'dairy_mgmt_sales',
  INVENTORY: 'dairy_mgmt_inventory',
  ADVANCES: 'dairy_mgmt_advances',
  FEED_SALES: 'dairy_mgmt_feed_sales',
  SETTINGS: 'dairy_mgmt_settings'
};

function getStoredItem(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.error(`Error loading key ${key}:`, err);
    return defaultValue;
  }
}

function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving key ${key}:`, err);
  }
}

export const StorageService = {
  loadFarmers: () => getStoredItem(KEYS.FARMERS, INITIAL_FARMERS),
  saveFarmers: (farmers) => setStoredItem(KEYS.FARMERS, farmers),

  loadRateCharts: () => getStoredItem(KEYS.RATE_CHARTS, DEFAULT_RATE_CHARTS),
  saveRateCharts: (charts) => setStoredItem(KEYS.RATE_CHARTS, charts),

  loadCollections: () => getStoredItem(KEYS.COLLECTIONS, INITIAL_COLLECTIONS),
  saveCollections: (collections) => setStoredItem(KEYS.COLLECTIONS, collections),

  loadCustomers: () => getStoredItem(KEYS.CUSTOMERS, INITIAL_CUSTOMERS),
  saveCustomers: (customers) => setStoredItem(KEYS.CUSTOMERS, customers),

  loadSales: () => getStoredItem(KEYS.SALES, INITIAL_SALES),
  saveSales: (sales) => setStoredItem(KEYS.SALES, sales),

  loadInventory: () => getStoredItem(KEYS.INVENTORY, INITIAL_INVENTORY),
  saveInventory: (inventory) => setStoredItem(KEYS.INVENTORY, inventory),

  loadAdvances: () => getStoredItem(KEYS.ADVANCES, INITIAL_ADVANCES),
  saveAdvances: (advances) => setStoredItem(KEYS.ADVANCES, advances),

  loadFeedSales: () => getStoredItem(KEYS.FEED_SALES, INITIAL_FEED_SALES),
  saveFeedSales: (feedSales) => setStoredItem(KEYS.FEED_SALES, feedSales),

  loadSettings: () => getStoredItem(KEYS.SETTINGS, {
    dairyName: 'Kamdhenu Dairy Cooperative',
    tagline: 'Fresh Milk & Organic Dairy Products',
    phone: '+91 98765 00000',
    address: 'Plot 42, Dairy Complex Road, Anand',
    gstin: '24AAAAA0000A1Z5',
    activeShift: 'Morning'
  }),
  saveSettings: (settings) => setStoredItem(KEYS.SETTINGS, settings),

  resetToDefaults: () => {
    localStorage.clear();
    window.location.reload();
  }
};
