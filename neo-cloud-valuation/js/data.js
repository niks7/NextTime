// Neo Cloud Company Universe - Mock Data
// Realistic financial metrics as of Q4 2025 / early 2026

const companies = [
  {
    ticker: "SNOW", name: "Snowflake", sector: "Data Infrastructure",
    marketCap: 62.5, enterpriseValue: 58.2, currentPrice: 192.40, sharesOutstanding: 324.8,
    ltmRevenue: 3.42, ntmRevenue: 4.28, revenueGrowthLTM: 0.29, revenueGrowthNTM: 0.25,
    grossMargin: 0.71, operatingMargin: -0.03, fcfMargin: 0.26,
    evToRevenueLTM: 17.0, evToRevenueNTM: 13.6, evToGrossProfit: 23.9,
    netRetentionRate: 1.27, ruleOf40Score: 55,
    magicNumber: 0.82, cacPaybackMonths: 22,
    quarterlyRevenue: [0.73, 0.79, 0.85, 0.87, 0.92, 0.98, 1.05, 1.10],
    historicalMultiples: [21.2, 20.5, 19.8, 18.4, 17.9, 16.5, 15.8, 16.2, 15.4, 14.8, 14.2, 13.6],
    dcfAssumptions: { wacc: 0.10, terminalGrowth: 0.03, revenueCAGR5yr: 0.22, targetFCFMargin: 0.30 }
  },
  {
    ticker: "DDOG", name: "Datadog", sector: "Observability",
    marketCap: 48.3, enterpriseValue: 46.1, currentPrice: 145.60, sharesOutstanding: 331.7,
    ltmRevenue: 2.68, ntmRevenue: 3.24, revenueGrowthLTM: 0.26, revenueGrowthNTM: 0.21,
    grossMargin: 0.79, operatingMargin: 0.22, fcfMargin: 0.30,
    evToRevenueLTM: 17.2, evToRevenueNTM: 14.2, evToGrossProfit: 21.8,
    netRetentionRate: 1.19, ruleOf40Score: 56,
    magicNumber: 0.91, cacPaybackMonths: 18,
    quarterlyRevenue: [0.56, 0.60, 0.63, 0.67, 0.70, 0.74, 0.78, 0.82],
    historicalMultiples: [18.5, 17.8, 17.2, 16.5, 16.0, 15.8, 15.2, 14.9, 14.5, 14.8, 14.3, 14.2],
    dcfAssumptions: { wacc: 0.10, terminalGrowth: 0.03, revenueCAGR5yr: 0.20, targetFCFMargin: 0.32 }
  },
  {
    ticker: "NET", name: "Cloudflare", sector: "Security",
    marketCap: 38.7, enterpriseValue: 37.5, currentPrice: 114.20, sharesOutstanding: 338.9,
    ltmRevenue: 1.82, ntmRevenue: 2.29, revenueGrowthLTM: 0.30, revenueGrowthNTM: 0.26,
    grossMargin: 0.77, operatingMargin: 0.04, fcfMargin: 0.12,
    evToRevenueLTM: 20.6, evToRevenueNTM: 16.4, evToGrossProfit: 26.8,
    netRetentionRate: 1.16, ruleOf40Score: 42,
    magicNumber: 0.74, cacPaybackMonths: 26,
    quarterlyRevenue: [0.38, 0.40, 0.43, 0.45, 0.48, 0.51, 0.54, 0.57],
    historicalMultiples: [24.1, 23.2, 22.0, 21.5, 20.8, 20.1, 19.5, 18.8, 17.9, 17.2, 16.8, 16.4],
    dcfAssumptions: { wacc: 0.11, terminalGrowth: 0.03, revenueCAGR5yr: 0.25, targetFCFMargin: 0.25 }
  },
  {
    ticker: "CRWD", name: "CrowdStrike", sector: "Security",
    marketCap: 78.4, enterpriseValue: 75.8, currentPrice: 322.50, sharesOutstanding: 243.1,
    ltmRevenue: 3.95, ntmRevenue: 4.74, revenueGrowthLTM: 0.33, revenueGrowthNTM: 0.20,
    grossMargin: 0.75, operatingMargin: 0.15, fcfMargin: 0.31,
    evToRevenueLTM: 19.2, evToRevenueNTM: 16.0, evToGrossProfit: 25.6,
    netRetentionRate: 1.22, ruleOf40Score: 64,
    magicNumber: 1.05, cacPaybackMonths: 16,
    quarterlyRevenue: [0.82, 0.89, 0.95, 0.99, 1.02, 1.06, 1.10, 1.14],
    historicalMultiples: [22.5, 21.8, 20.5, 19.8, 19.2, 18.5, 18.0, 17.5, 17.0, 16.8, 16.3, 16.0],
    dcfAssumptions: { wacc: 0.10, terminalGrowth: 0.03, revenueCAGR5yr: 0.19, targetFCFMargin: 0.33 }
  },
  {
    ticker: "MDB", name: "MongoDB", sector: "Data Infrastructure",
    marketCap: 28.4, enterpriseValue: 27.6, currentPrice: 385.20, sharesOutstanding: 73.7,
    ltmRevenue: 2.01, ntmRevenue: 2.35, revenueGrowthLTM: 0.22, revenueGrowthNTM: 0.17,
    grossMargin: 0.73, operatingMargin: 0.10, fcfMargin: 0.18,
    evToRevenueLTM: 13.7, evToRevenueNTM: 11.7, evToGrossProfit: 18.8,
    netRetentionRate: 1.21, ruleOf40Score: 40,
    magicNumber: 0.68, cacPaybackMonths: 28,
    quarterlyRevenue: [0.43, 0.46, 0.48, 0.50, 0.52, 0.55, 0.57, 0.60],
    historicalMultiples: [16.8, 16.2, 15.5, 14.8, 14.2, 13.8, 13.5, 13.2, 12.8, 12.5, 12.0, 11.7],
    dcfAssumptions: { wacc: 0.11, terminalGrowth: 0.025, revenueCAGR5yr: 0.18, targetFCFMargin: 0.25 }
  },
  {
    ticker: "CFLT", name: "Confluent", sector: "Data Infrastructure",
    marketCap: 10.8, enterpriseValue: 10.2, currentPrice: 34.50, sharesOutstanding: 313.0,
    ltmRevenue: 0.96, ntmRevenue: 1.16, revenueGrowthLTM: 0.25, revenueGrowthNTM: 0.21,
    grossMargin: 0.72, operatingMargin: -0.08, fcfMargin: 0.05,
    evToRevenueLTM: 10.6, evToRevenueNTM: 8.8, evToGrossProfit: 14.8,
    netRetentionRate: 1.18, ruleOf40Score: 30,
    magicNumber: 0.55, cacPaybackMonths: 34,
    quarterlyRevenue: [0.20, 0.21, 0.22, 0.24, 0.25, 0.26, 0.28, 0.29],
    historicalMultiples: [14.2, 13.5, 12.8, 12.2, 11.8, 11.2, 10.8, 10.5, 10.2, 9.8, 9.5, 8.8],
    dcfAssumptions: { wacc: 0.12, terminalGrowth: 0.025, revenueCAGR5yr: 0.20, targetFCFMargin: 0.22 }
  },
  {
    ticker: "ZS", name: "Zscaler", sector: "Security",
    marketCap: 32.5, enterpriseValue: 31.8, currentPrice: 215.80, sharesOutstanding: 150.6,
    ltmRevenue: 2.32, ntmRevenue: 2.81, revenueGrowthLTM: 0.28, revenueGrowthNTM: 0.21,
    grossMargin: 0.78, operatingMargin: 0.12, fcfMargin: 0.27,
    evToRevenueLTM: 13.7, evToRevenueNTM: 11.3, evToGrossProfit: 17.6,
    netRetentionRate: 1.20, ruleOf40Score: 55,
    magicNumber: 0.88, cacPaybackMonths: 20,
    quarterlyRevenue: [0.50, 0.53, 0.55, 0.58, 0.60, 0.63, 0.66, 0.69],
    historicalMultiples: [17.5, 16.8, 16.0, 15.5, 15.0, 14.5, 14.0, 13.8, 13.5, 13.2, 12.8, 11.3],
    dcfAssumptions: { wacc: 0.10, terminalGrowth: 0.03, revenueCAGR5yr: 0.21, targetFCFMargin: 0.30 }
  },
  {
    ticker: "S", name: "SentinelOne", sector: "Security",
    marketCap: 7.8, enterpriseValue: 7.2, currentPrice: 24.30, sharesOutstanding: 321.0,
    ltmRevenue: 0.72, ntmRevenue: 0.90, revenueGrowthLTM: 0.36, revenueGrowthNTM: 0.25,
    grossMargin: 0.72, operatingMargin: -0.18, fcfMargin: -0.02,
    evToRevenueLTM: 10.0, evToRevenueNTM: 8.0, evToGrossProfit: 13.9,
    netRetentionRate: 1.15, ruleOf40Score: 34,
    magicNumber: 0.62, cacPaybackMonths: 32,
    quarterlyRevenue: [0.14, 0.15, 0.16, 0.17, 0.19, 0.20, 0.21, 0.22],
    historicalMultiples: [14.5, 13.8, 13.0, 12.5, 12.0, 11.5, 11.0, 10.5, 10.2, 9.8, 9.5, 8.0],
    dcfAssumptions: { wacc: 0.13, terminalGrowth: 0.025, revenueCAGR5yr: 0.28, targetFCFMargin: 0.18 }
  },
  {
    ticker: "ESTC", name: "Elastic", sector: "Data Infrastructure",
    marketCap: 12.1, enterpriseValue: 11.5, currentPrice: 120.40, sharesOutstanding: 100.5,
    ltmRevenue: 1.38, ntmRevenue: 1.60, revenueGrowthLTM: 0.18, revenueGrowthNTM: 0.16,
    grossMargin: 0.74, operatingMargin: 0.08, fcfMargin: 0.17,
    evToRevenueLTM: 8.3, evToRevenueNTM: 7.2, evToGrossProfit: 11.3,
    netRetentionRate: 1.12, ruleOf40Score: 35,
    magicNumber: 0.58, cacPaybackMonths: 30,
    quarterlyRevenue: [0.30, 0.31, 0.33, 0.34, 0.35, 0.37, 0.38, 0.40],
    historicalMultiples: [10.8, 10.2, 9.8, 9.5, 9.2, 9.0, 8.8, 8.5, 8.2, 8.0, 7.8, 7.2],
    dcfAssumptions: { wacc: 0.11, terminalGrowth: 0.025, revenueCAGR5yr: 0.15, targetFCFMargin: 0.22 }
  },
  {
    ticker: "DT", name: "Dynatrace", sector: "Observability",
    marketCap: 16.2, enterpriseValue: 15.5, currentPrice: 55.80, sharesOutstanding: 290.3,
    ltmRevenue: 1.52, ntmRevenue: 1.76, revenueGrowthLTM: 0.20, revenueGrowthNTM: 0.16,
    grossMargin: 0.82, operatingMargin: 0.22, fcfMargin: 0.28,
    evToRevenueLTM: 10.2, evToRevenueNTM: 8.8, evToGrossProfit: 12.4,
    netRetentionRate: 1.14, ruleOf40Score: 48,
    magicNumber: 0.76, cacPaybackMonths: 21,
    quarterlyRevenue: [0.34, 0.35, 0.37, 0.38, 0.39, 0.41, 0.42, 0.44],
    historicalMultiples: [12.5, 12.0, 11.5, 11.2, 10.8, 10.5, 10.2, 10.0, 9.8, 9.5, 9.2, 8.8],
    dcfAssumptions: { wacc: 0.10, terminalGrowth: 0.025, revenueCAGR5yr: 0.15, targetFCFMargin: 0.30 }
  },
  {
    ticker: "PLTR", name: "Palantir", sector: "AI/ML Platform",
    marketCap: 145.0, enterpriseValue: 140.5, currentPrice: 62.80, sharesOutstanding: 2309.0,
    ltmRevenue: 3.05, ntmRevenue: 3.81, revenueGrowthLTM: 0.26, revenueGrowthNTM: 0.25,
    grossMargin: 0.81, operatingMargin: 0.28, fcfMargin: 0.35,
    evToRevenueLTM: 46.1, evToRevenueNTM: 36.9, evToGrossProfit: 56.9,
    netRetentionRate: 1.18, ruleOf40Score: 61,
    magicNumber: 0.95, cacPaybackMonths: 19,
    quarterlyRevenue: [0.63, 0.67, 0.73, 0.76, 0.80, 0.85, 0.90, 0.95],
    historicalMultiples: [28.5, 30.2, 32.8, 35.5, 38.0, 40.2, 42.5, 44.0, 45.5, 46.0, 46.5, 46.1],
    dcfAssumptions: { wacc: 0.11, terminalGrowth: 0.03, revenueCAGR5yr: 0.24, targetFCFMargin: 0.35 }
  },
  {
    ticker: "PATH", name: "UiPath", sector: "AI/ML Platform",
    marketCap: 8.5, enterpriseValue: 7.2, currentPrice: 14.80, sharesOutstanding: 574.3,
    ltmRevenue: 1.42, ntmRevenue: 1.56, revenueGrowthLTM: 0.10, revenueGrowthNTM: 0.10,
    grossMargin: 0.84, operatingMargin: 0.05, fcfMargin: 0.18,
    evToRevenueLTM: 5.1, evToRevenueNTM: 4.6, evToGrossProfit: 6.0,
    netRetentionRate: 1.10, ruleOf40Score: 28,
    magicNumber: 0.42, cacPaybackMonths: 38,
    quarterlyRevenue: [0.33, 0.34, 0.35, 0.35, 0.36, 0.36, 0.37, 0.38],
    historicalMultiples: [8.2, 7.8, 7.2, 6.8, 6.5, 6.2, 5.8, 5.5, 5.3, 5.1, 4.9, 4.6],
    dcfAssumptions: { wacc: 0.11, terminalGrowth: 0.02, revenueCAGR5yr: 0.10, targetFCFMargin: 0.22 }
  },
  {
    ticker: "GTLB", name: "GitLab", sector: "DevOps",
    marketCap: 10.2, enterpriseValue: 9.5, currentPrice: 63.50, sharesOutstanding: 160.6,
    ltmRevenue: 0.76, ntmRevenue: 0.93, revenueGrowthLTM: 0.28, revenueGrowthNTM: 0.22,
    grossMargin: 0.89, operatingMargin: 0.02, fcfMargin: 0.15,
    evToRevenueLTM: 12.5, evToRevenueNTM: 10.2, evToGrossProfit: 14.0,
    netRetentionRate: 1.25, ruleOf40Score: 43,
    magicNumber: 0.72, cacPaybackMonths: 24,
    quarterlyRevenue: [0.16, 0.17, 0.18, 0.19, 0.20, 0.21, 0.22, 0.24],
    historicalMultiples: [15.5, 14.8, 14.2, 13.8, 13.2, 12.8, 12.5, 12.2, 11.8, 11.5, 10.8, 10.2],
    dcfAssumptions: { wacc: 0.11, terminalGrowth: 0.025, revenueCAGR5yr: 0.22, targetFCFMargin: 0.25 }
  },
  {
    ticker: "FSLY", name: "Fastly", sector: "Security",
    marketCap: 2.4, enterpriseValue: 2.5, currentPrice: 17.20, sharesOutstanding: 139.5,
    ltmRevenue: 0.55, ntmRevenue: 0.61, revenueGrowthLTM: 0.08, revenueGrowthNTM: 0.11,
    grossMargin: 0.54, operatingMargin: -0.16, fcfMargin: -0.05,
    evToRevenueLTM: 4.5, evToRevenueNTM: 4.1, evToGrossProfit: 8.4,
    netRetentionRate: 1.05, ruleOf40Score: 3,
    magicNumber: 0.28, cacPaybackMonths: 52,
    quarterlyRevenue: [0.13, 0.13, 0.13, 0.13, 0.14, 0.14, 0.14, 0.15],
    historicalMultiples: [7.2, 6.8, 6.5, 6.0, 5.5, 5.2, 5.0, 4.8, 4.6, 4.5, 4.3, 4.1],
    dcfAssumptions: { wacc: 0.13, terminalGrowth: 0.02, revenueCAGR5yr: 0.10, targetFCFMargin: 0.12 }
  },
  {
    ticker: "BRZE", name: "Braze", sector: "AI/ML Platform",
    marketCap: 5.1, enterpriseValue: 4.8, currentPrice: 50.20, sharesOutstanding: 101.6,
    ltmRevenue: 0.58, ntmRevenue: 0.72, revenueGrowthLTM: 0.27, revenueGrowthNTM: 0.24,
    grossMargin: 0.68, operatingMargin: -0.06, fcfMargin: 0.04,
    evToRevenueLTM: 8.3, evToRevenueNTM: 6.7, evToGrossProfit: 12.2,
    netRetentionRate: 1.17, ruleOf40Score: 31,
    magicNumber: 0.65, cacPaybackMonths: 29,
    quarterlyRevenue: [0.12, 0.13, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18],
    historicalMultiples: [12.0, 11.2, 10.5, 10.0, 9.5, 9.2, 8.8, 8.5, 8.2, 8.0, 7.5, 6.7],
    dcfAssumptions: { wacc: 0.12, terminalGrowth: 0.025, revenueCAGR5yr: 0.22, targetFCFMargin: 0.18 }
  },
  {
    ticker: "FROG", name: "JFrog", sector: "DevOps",
    marketCap: 4.6, enterpriseValue: 4.2, currentPrice: 38.40, sharesOutstanding: 119.8,
    ltmRevenue: 0.43, ntmRevenue: 0.52, revenueGrowthLTM: 0.24, revenueGrowthNTM: 0.21,
    grossMargin: 0.78, operatingMargin: 0.01, fcfMargin: 0.12,
    evToRevenueLTM: 9.8, evToRevenueNTM: 8.1, evToGrossProfit: 12.5,
    netRetentionRate: 1.19, ruleOf40Score: 36,
    magicNumber: 0.60, cacPaybackMonths: 30,
    quarterlyRevenue: [0.09, 0.10, 0.10, 0.11, 0.11, 0.12, 0.12, 0.13],
    historicalMultiples: [13.2, 12.5, 12.0, 11.5, 11.0, 10.5, 10.2, 10.0, 9.8, 9.5, 9.2, 8.1],
    dcfAssumptions: { wacc: 0.11, terminalGrowth: 0.025, revenueCAGR5yr: 0.20, targetFCFMargin: 0.20 }
  },
  {
    ticker: "HCP", name: "HashiCorp", sector: "DevOps",
    marketCap: 6.8, enterpriseValue: 6.2, currentPrice: 33.90, sharesOutstanding: 200.6,
    ltmRevenue: 0.65, ntmRevenue: 0.78, revenueGrowthLTM: 0.18, revenueGrowthNTM: 0.20,
    grossMargin: 0.82, operatingMargin: -0.02, fcfMargin: 0.10,
    evToRevenueLTM: 9.5, evToRevenueNTM: 7.9, evToGrossProfit: 11.6,
    netRetentionRate: 1.16, ruleOf40Score: 28,
    magicNumber: 0.52, cacPaybackMonths: 33,
    quarterlyRevenue: [0.14, 0.15, 0.15, 0.16, 0.16, 0.17, 0.18, 0.19],
    historicalMultiples: [12.8, 12.2, 11.5, 11.0, 10.5, 10.2, 10.0, 9.8, 9.5, 9.2, 8.8, 7.9],
    dcfAssumptions: { wacc: 0.11, terminalGrowth: 0.025, revenueCAGR5yr: 0.18, targetFCFMargin: 0.22 }
  }
];

const sectorColors = {
  "Security": "#3b82f6",
  "Data Infrastructure": "#10b981",
  "Observability": "#f59e0b",
  "AI/ML Platform": "#8b5cf6",
  "DevOps": "#ef4444"
};

const quarterLabels = ["Q1'24", "Q2'24", "Q3'24", "Q4'24", "Q1'25", "Q2'25", "Q3'25", "Q4'25"];
const monthLabels = ["Apr'25", "May'25", "Jun'25", "Jul'25", "Aug'25", "Sep'25", "Oct'25", "Nov'25", "Dec'25", "Jan'26", "Feb'26", "Mar'26"];

function getSectorAverages() {
  const sectors = {};
  companies.forEach(c => {
    if (!sectors[c.sector]) sectors[c.sector] = [];
    sectors[c.sector].push(c);
  });
  const avgs = {};
  Object.entries(sectors).forEach(([sector, list]) => {
    const avg = (arr, fn) => arr.reduce((s, x) => s + fn(x), 0) / arr.length;
    avgs[sector] = {
      sector,
      count: list.length,
      avgEvToRevenueNTM: avg(list, c => c.evToRevenueNTM),
      avgGrowthNTM: avg(list, c => c.revenueGrowthNTM),
      avgGrossMargin: avg(list, c => c.grossMargin),
      avgFCFMargin: avg(list, c => c.fcfMargin),
      avgRuleOf40: avg(list, c => c.ruleOf40Score),
      avgNRR: avg(list, c => c.netRetentionRate),
      totalMarketCap: list.reduce((s, c) => s + c.marketCap, 0)
    };
  });
  return avgs;
}

function getMarketAggregates() {
  const totalMarketCap = companies.reduce((s, c) => s + c.marketCap, 0);
  const totalEV = companies.reduce((s, c) => s + c.enterpriseValue, 0);
  const sorted = (arr, fn) => [...arr].sort((a, b) => fn(a) - fn(b));
  const median = (arr, fn) => {
    const s = sorted(arr, fn);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? fn(s[mid]) : (fn(s[mid - 1]) + fn(s[mid])) / 2;
  };
  return {
    totalMarketCap,
    totalEV,
    companyCount: companies.length,
    medianEvToRevenueNTM: median(companies, c => c.evToRevenueNTM),
    medianGrowthNTM: median(companies, c => c.revenueGrowthNTM),
    medianGrossMargin: median(companies, c => c.grossMargin),
    medianFCFMargin: median(companies, c => c.fcfMargin),
    medianRuleOf40: median(companies, c => c.ruleOf40Score),
    medianNRR: median(companies, c => c.netRetentionRate),
    medianMagicNumber: median(companies, c => c.magicNumber)
  };
}
