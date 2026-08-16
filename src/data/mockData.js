export const INITIAL_FARMERS = [
  {
    id: 'F-101',
    name: 'Ramesh Patel',
    phone: '+91 98765 43210',
    village: 'Green Valley',
    cattleCount: 8,
    milkType: 'Cow',
    bankAccount: 'SBI - 34982019482',
    ifsc: 'SBIN0001234',
    advanceBalance: 2500,
    joinedDate: '2025-01-15'
  },
  {
    id: 'F-102',
    name: 'Suresh Kumar',
    phone: '+91 98123 45678',
    village: 'Sunrise Heights',
    cattleCount: 12,
    milkType: 'Buffalo',
    bankAccount: 'HDFC - 50100293847',
    ifsc: 'HDFC0004567',
    advanceBalance: 0,
    joinedDate: '2025-02-01'
  },
  {
    id: 'F-103',
    name: 'Anita Sharma',
    phone: '+91 97654 32109',
    village: 'Green Valley',
    cattleCount: 5,
    milkType: 'Cow',
    bankAccount: 'PNB - 19283746501',
    ifsc: 'PUNB0192837',
    advanceBalance: 1200,
    joinedDate: '2025-02-20'
  },
  {
    id: 'F-104',
    name: 'Vikram Singh',
    phone: '+91 99887 76655',
    village: 'Riverdale',
    cattleCount: 15,
    milkType: 'Buffalo',
    bankAccount: 'ICICI - 00192837465',
    ifsc: 'ICIC0000192',
    advanceBalance: 5000,
    joinedDate: '2025-03-10'
  },
  {
    id: 'F-105',
    name: 'Mahesh Verma',
    phone: '+91 94567 89012',
    village: 'Sunrise Heights',
    cattleCount: 6,
    milkType: 'Mixed',
    bankAccount: 'BOB - 78901234567',
    ifsc: 'BARB0SUNRIS',
    advanceBalance: 800,
    joinedDate: '2025-04-05'
  }
];

export const DEFAULT_RATE_CHARTS = {
  cow: {
    baseRate: 36.00,
    baseFat: 3.5,
    baseSNF: 8.5,
    fatFactor: 4.50, // Per 1.0% fat variation
    snfFactor: 3.20, // Per 1.0% SNF variation
    minFat: 3.0,
    maxFat: 5.5,
    minSNF: 8.0,
    maxSNF: 9.5
  },
  buffalo: {
    baseRate: 54.00,
    baseFat: 6.0,
    baseSNF: 9.0,
    fatFactor: 6.50,
    snfFactor: 4.50,
    minFat: 5.0,
    maxFat: 9.5,
    minSNF: 8.5,
    maxSNF: 10.0
  }
};

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const dayBefore = new Date(Date.now() - 172800000).toISOString().split('T')[0];
const threeDaysAgo = new Date(Date.now() - 259200000).toISOString().split('T')[0];

export const INITIAL_COLLECTIONS = [
  {
    id: 'COL-1001',
    farmerId: 'F-101',
    farmerName: 'Ramesh Patel',
    date: today,
    shift: 'Morning',
    milkType: 'Cow',
    quantity: 24.5,
    fat: 3.8,
    snf: 8.6,
    rate: 37.67,
    amount: 922.92,
    timestamp: `${today} 06:45:00`
  },
  {
    id: 'COL-1002',
    farmerId: 'F-102',
    farmerName: 'Suresh Kumar',
    date: today,
    shift: 'Morning',
    milkType: 'Buffalo',
    quantity: 42.0,
    fat: 6.5,
    snf: 9.2,
    rate: 58.15,
    amount: 2442.30,
    timestamp: `${today} 07:15:00`
  },
  {
    id: 'COL-1003',
    farmerId: 'F-103',
    farmerName: 'Anita Sharma',
    date: today,
    shift: 'Morning',
    milkType: 'Cow',
    quantity: 18.0,
    fat: 3.6,
    snf: 8.4,
    rate: 36.13,
    amount: 650.34,
    timestamp: `${today} 07:30:00`
  },
  {
    id: 'COL-1004',
    farmerId: 'F-104',
    farmerName: 'Vikram Singh',
    date: yesterday,
    shift: 'Evening',
    milkType: 'Buffalo',
    quantity: 55.0,
    fat: 6.8,
    snf: 9.1,
    rate: 59.65,
    amount: 3280.75,
    timestamp: `${yesterday} 18:20:00`
  },
  {
    id: 'COL-1005',
    farmerId: 'F-101',
    farmerName: 'Ramesh Patel',
    date: yesterday,
    shift: 'Evening',
    milkType: 'Cow',
    quantity: 22.0,
    fat: 3.7,
    snf: 8.5,
    rate: 36.90,
    amount: 811.80,
    timestamp: `${yesterday} 18:45:00`
  },
  {
    id: 'COL-1006',
    farmerId: 'F-105',
    farmerName: 'Mahesh Verma',
    date: dayBefore,
    shift: 'Morning',
    milkType: 'Cow',
    quantity: 30.0,
    fat: 3.9,
    snf: 8.7,
    rate: 38.44,
    amount: 1153.20,
    timestamp: `${dayBefore} 07:00:00`
  },
  {
    id: 'COL-1007',
    farmerId: 'F-102',
    farmerName: 'Suresh Kumar',
    date: threeDaysAgo,
    shift: 'Morning',
    milkType: 'Buffalo',
    quantity: 40.0,
    fat: 6.4,
    snf: 9.0,
    rate: 56.60,
    amount: 2264.00,
    timestamp: `${threeDaysAgo} 07:10:00`
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'C-201',
    name: 'Apex Dairy & Sweets',
    type: 'Commercial',
    phone: '+91 91234 56789',
    address: 'Main Market Road, City Center',
    dailyQuotaLiters: 100,
    milkPreference: 'Buffalo',
    agreedRatePerLiter: 68.00,
    currentBalance: 14200,
    status: 'Active'
  },
  {
    id: 'C-202',
    name: 'Hotel Grand Residency',
    type: 'Commercial',
    phone: '+91 98765 12345',
    address: 'Station Road, Ward 4',
    dailyQuotaLiters: 50,
    milkPreference: 'Cow',
    agreedRatePerLiter: 48.00,
    currentBalance: 4800,
    status: 'Active'
  },
  {
    id: 'C-203',
    name: 'Mrs. Priya Kulkarni',
    type: 'Retail Subscriber',
    phone: '+91 99001 12233',
    address: 'B-402, Green Park Apartments',
    dailyQuotaLiters: 3,
    milkPreference: 'Cow',
    agreedRatePerLiter: 50.00,
    currentBalance: 450,
    status: 'Active'
  },
  {
    id: 'C-204',
    name: 'Fresh Bakers & Cafe',
    type: 'Commercial',
    phone: '+91 97788 99000',
    address: 'College Road, Opp. Library',
    dailyQuotaLiters: 25,
    milkPreference: 'Cow',
    agreedRatePerLiter: 48.00,
    currentBalance: 0,
    status: 'Active'
  }
];

export const INITIAL_SALES = [
  {
    id: 'SAL-3001',
    customerId: 'C-201',
    customerName: 'Apex Dairy & Sweets',
    date: today,
    item: 'Raw Buffalo Milk',
    quantity: 100,
    unit: 'Liters',
    rate: 68.00,
    totalAmount: 6800.00,
    paymentStatus: 'Pending',
    timestamp: `${today} 08:30:00`
  },
  {
    id: 'SAL-3002',
    customerId: 'C-202',
    customerName: 'Hotel Grand Residency',
    date: today,
    item: 'Raw Cow Milk',
    quantity: 50,
    unit: 'Liters',
    rate: 48.00,
    totalAmount: 2400.00,
    paymentStatus: 'Paid',
    timestamp: `${today} 09:00:00`
  },
  {
    id: 'SAL-3003',
    customerId: 'C-203',
    customerName: 'Mrs. Priya Kulkarni',
    date: yesterday,
    item: 'Cow Milk Packet',
    quantity: 3,
    unit: 'Liters',
    rate: 50.00,
    totalAmount: 150.00,
    paymentStatus: 'Paid',
    timestamp: `${yesterday} 07:45:00`
  }
];

export const INITIAL_INVENTORY = [
  {
    id: 'INV-01',
    category: 'Processed Product',
    name: 'Fresh Paneer (Cottage Cheese)',
    stockQuantity: 45.5,
    unit: 'kg',
    pricePerUnit: 340,
    reorderLevel: 10
  },
  {
    id: 'INV-02',
    category: 'Processed Product',
    name: 'Pure Desi Cow Ghee',
    stockQuantity: 82.0,
    unit: 'kg',
    pricePerUnit: 680,
    reorderLevel: 25
  },
  {
    id: 'INV-03',
    category: 'Processed Product',
    name: 'Cultured Fresh Curd (Dahi)',
    stockQuantity: 120.0,
    unit: 'kg',
    pricePerUnit: 65,
    reorderLevel: 30
  },
  {
    id: 'INV-04',
    category: 'Processed Product',
    name: 'Salted Dairy Butter',
    stockQuantity: 35.0,
    unit: 'kg',
    pricePerUnit: 480,
    reorderLevel: 15
  },
  {
    id: 'INV-05',
    category: 'Cattle Feed',
    name: 'High Protein Cattle Feed Pellets (50kg)',
    stockQuantity: 65,
    unit: 'Bags',
    pricePerUnit: 1250,
    reorderLevel: 20
  },
  {
    id: 'INV-06',
    category: 'Cattle Feed',
    name: 'Mineral Mixture Granules (1kg)',
    stockQuantity: 110,
    unit: 'Packs',
    pricePerUnit: 180,
    reorderLevel: 25
  },
  {
    id: 'INV-07',
    category: 'Cattle Feed',
    name: 'Liquid Calcium Booster (5L)',
    stockQuantity: 40,
    unit: 'Cans',
    pricePerUnit: 620,
    reorderLevel: 10
  }
];

export const INITIAL_ADVANCES = [
  {
    id: 'ADV-4001',
    farmerId: 'F-101',
    farmerName: 'Ramesh Patel',
    date: '2025-02-10',
    amount: 2500,
    reason: 'Emergency Vet Medical Bills',
    status: 'Outstanding'
  },
  {
    id: 'ADV-4002',
    farmerId: 'F-104',
    farmerName: 'Vikram Singh',
    date: '2025-03-01',
    amount: 5000,
    reason: 'Cattle Purchase Advance',
    status: 'Outstanding'
  }
];

export const INITIAL_FEED_SALES = [
  {
    id: 'FS-5001',
    farmerId: 'F-103',
    farmerName: 'Anita Sharma',
    date: yesterday,
    feedItem: 'High Protein Cattle Feed Pellets (50kg)',
    quantity: 1,
    unitPrice: 1250,
    totalAmount: 1250,
    deductFromPayout: true
  }
];
