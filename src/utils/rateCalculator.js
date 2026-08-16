/**
 * Calculates milk rate per liter based on Fat and SNF percentages.
 * Formula: Rate = BaseRate + (Fat - BaseFat) * FatFactor + (SNF - BaseSNF) * SNFFactor
 */
export function calculateMilkRate(milkType, fat, snf, rateCharts) {
  const chartKey = milkType.toLowerCase() === 'buffalo' ? 'buffalo' : 'cow';
  const chart = rateCharts[chartKey] || rateCharts.cow;

  const numFat = parseFloat(fat) || 0;
  const numSNF = parseFloat(snf) || 0;

  if (numFat <= 0 || numSNF <= 0) {
    return { rate: 0, totalAmount: 0 };
  }

  const fatDiff = numFat - chart.baseFat;
  const snfDiff = numSNF - chart.baseSNF;

  let calculatedRate = chart.baseRate + (fatDiff * chart.fatFactor) + (snfDiff * chart.snfFactor);

  // Ensure rate doesn't drop below minimum safety threshold (e.g. ₹20/L)
  if (calculatedRate < 20) {
    calculatedRate = 20;
  }

  return Math.round(calculatedRate * 100) / 100;
}

export function formatCurrency(amount) {
  const num = parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(num);
}

export function formatNumber(value, decimals = 2) {
  const num = parseFloat(value) || 0;
  return num.toFixed(decimals);
}

/**
 * Calculates farmer payout breakdown for a period.
 */
export function calculateFarmerPayout(farmerId, collections, feedSales, advances) {
  const farmerCollections = collections.filter(c => c.farmerId === farmerId);
  const farmerFeed = feedSales.filter(f => f.farmerId === farmerId && f.deductFromPayout);
  const farmerAdvances = advances.filter(a => a.farmerId === farmerId && a.status === 'Outstanding');

  const totalMilkLiters = farmerCollections.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  const totalMilkEarnings = farmerCollections.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
  const totalFeedDeductions = farmerFeed.reduce((sum, f) => sum + (parseFloat(f.totalAmount) || 0), 0);
  const totalAdvanceDeductions = farmerAdvances.reduce((sum, a) => sum + (parseFloat(a.amount) || 0), 0);

  const netPayout = Math.max(0, totalMilkEarnings - totalFeedDeductions - totalAdvanceDeductions);

  return {
    farmerId,
    totalMilkLiters: Math.round(totalMilkLiters * 100) / 100,
    totalMilkEarnings: Math.round(totalMilkEarnings * 100) / 100,
    totalFeedDeductions: Math.round(totalFeedDeductions * 100) / 100,
    totalAdvanceDeductions: Math.round(totalAdvanceDeductions * 100) / 100,
    netPayout: Math.round(netPayout * 100) / 100,
    collectionCount: farmerCollections.length
  };
}
