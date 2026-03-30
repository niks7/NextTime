// NeoCloud Analytics - Chart Rendering Module
// All Chart.js chart creation and configuration

const ChartColors = {
  blue: '#3b82f6', green: '#10b981', amber: '#f59e0b',
  red: '#ef4444', purple: '#8b5cf6', cyan: '#06b6d4',
  blueAlpha: 'rgba(59,130,246,0.15)', greenAlpha: 'rgba(16,185,129,0.15)',
  amberAlpha: 'rgba(245,158,11,0.15)', redAlpha: 'rgba(239,68,68,0.15)',
  purpleAlpha: 'rgba(139,92,246,0.15)', cyanAlpha: 'rgba(6,182,212,0.15)',
  grid: 'rgba(30,41,59,0.5)', gridLight: 'rgba(30,41,59,0.3)',
  textMuted: '#64748b', textSecondary: '#94a3b8'
};

const defaultScaleOpts = {
  grid: { color: ChartColors.gridLight, drawBorder: false },
  ticks: { color: ChartColors.textMuted, font: { family: "'JetBrains Mono', monospace", size: 10 } }
};

const defaultPluginOpts = {
  legend: { labels: { color: ChartColors.textSecondary, font: { family: "'Inter', sans-serif", size: 11 }, boxWidth: 12, padding: 16 } },
  tooltip: {
    backgroundColor: 'rgba(17,24,39,0.95)', titleColor: '#e2e8f0', bodyColor: '#94a3b8',
    borderColor: 'rgba(30,41,59,0.8)', borderWidth: 1, padding: 12,
    titleFont: { family: "'Inter', sans-serif", weight: '600', size: 12 },
    bodyFont: { family: "'JetBrains Mono', monospace", size: 11 },
    cornerRadius: 8, displayColors: true
  }
};

// Store chart instances for destroy/recreate
const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

// 1. Sector Allocation Doughnut
function renderSectorAllocation(data) {
  destroyChart('sectorAllocation');
  const sectors = {};
  data.forEach(c => { sectors[c.sector] = (sectors[c.sector] || 0) + c.marketCap; });
  const labels = Object.keys(sectors);
  const values = Object.values(sectors);
  const colors = labels.map(s => sectorColors[s] || '#666');

  chartInstances.sectorAllocation = new Chart(document.getElementById('chartSectorAllocation'), {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: colors, borderColor: 'rgba(10,14,23,0.8)', borderWidth: 2, hoverOffset: 8 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        ...defaultPluginOpts,
        legend: { ...defaultPluginOpts.legend, position: 'right' },
        tooltip: { ...defaultPluginOpts.tooltip, callbacks: {
          label: ctx => `${ctx.label}: $${ctx.parsed.toFixed(1)}B (${((ctx.parsed / values.reduce((a,b) => a+b, 0)) * 100).toFixed(1)}%)`
        }},
        datalabels: { display: false }
      }
    }
  });
}

// 2. EV/Revenue Multiple Horizontal Bar
function renderMultipleBar(data) {
  destroyChart('multipleBar');
  const sorted = [...data].sort((a, b) => b.evToRevenueNTM - a.evToRevenueNTM);
  const median = [...data].sort((a, b) => a.evToRevenueNTM - b.evToRevenueNTM);
  const medVal = median[Math.floor(median.length / 2)].evToRevenueNTM;

  chartInstances.multipleBar = new Chart(document.getElementById('chartMultipleBar'), {
    type: 'bar',
    data: {
      labels: sorted.map(c => c.ticker),
      datasets: [{
        data: sorted.map(c => c.evToRevenueNTM),
        backgroundColor: sorted.map(c => sectorColors[c.sector] + '99'),
        borderColor: sorted.map(c => sectorColors[c.sector]),
        borderWidth: 1, borderRadius: 3, barThickness: 16
      }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      scales: {
        x: { ...defaultScaleOpts, title: { display: true, text: 'EV / Revenue (NTM)', color: ChartColors.textMuted, font: { size: 10 } } },
        y: { ...defaultScaleOpts, grid: { display: false } }
      },
      plugins: {
        ...defaultPluginOpts, legend: { display: false },
        tooltip: { ...defaultPluginOpts.tooltip, callbacks: {
          label: ctx => `EV/Rev NTM: ${ctx.parsed.x.toFixed(1)}x`
        }},
        datalabels: { display: false },
        annotation: undefined
      }
    },
    plugins: [{
      id: 'medianLine',
      afterDraw(chart) {
        const { ctx, scales: { x } } = chart;
        const xPos = x.getPixelForValue(medVal);
        ctx.save();
        ctx.strokeStyle = ChartColors.amber;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(xPos, chart.chartArea.top);
        ctx.lineTo(xPos, chart.chartArea.bottom);
        ctx.stroke();
        ctx.fillStyle = ChartColors.amber;
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillText(`Median: ${medVal.toFixed(1)}x`, xPos + 4, chart.chartArea.top + 12);
        ctx.restore();
      }
    }]
  });
}

// 3. Growth vs Valuation Bubble Chart
function renderBubbleChart(data) {
  destroyChart('bubble');
  const sectors = {};
  data.forEach(c => {
    if (!sectors[c.sector]) sectors[c.sector] = [];
    sectors[c.sector].push({
      x: c.revenueGrowthNTM * 100, y: c.evToRevenueNTM,
      r: Math.sqrt(c.marketCap) * 2.2, company: c
    });
  });

  const datasets = Object.entries(sectors).map(([sector, points]) => ({
    label: sector,
    data: points,
    backgroundColor: sectorColors[sector] + '55',
    borderColor: sectorColors[sector],
    borderWidth: 1.5
  }));

  chartInstances.bubble = new Chart(document.getElementById('chartBubble'), {
    type: 'bubble',
    data: { datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { ...defaultScaleOpts, title: { display: true, text: 'Revenue Growth NTM (%)', color: ChartColors.textMuted, font: { size: 11 } } },
        y: { ...defaultScaleOpts, title: { display: true, text: 'EV / Revenue NTM (x)', color: ChartColors.textMuted, font: { size: 11 } } }
      },
      plugins: {
        ...defaultPluginOpts,
        tooltip: { ...defaultPluginOpts.tooltip, callbacks: {
          title: ctx => ctx[0].raw.company.name,
          label: ctx => {
            const c = ctx.raw.company;
            return [
              `Ticker: ${c.ticker}`, `Growth NTM: ${(c.revenueGrowthNTM * 100).toFixed(0)}%`,
              `EV/Rev NTM: ${c.evToRevenueNTM.toFixed(1)}x`, `Mkt Cap: $${c.marketCap.toFixed(1)}B`
            ];
          }
        }},
        datalabels: {
          display: true, color: '#e2e8f0', font: { family: "'JetBrains Mono', monospace", size: 9, weight: '500' },
          formatter: (val) => val.company.ticker, anchor: 'center', align: 'center'
        }
      }
    }
  });
}

// 4. Rule of 40 Scatter
function renderRule40Chart(data) {
  destroyChart('rule40');
  const datasets = {};
  data.forEach(c => {
    if (!datasets[c.sector]) datasets[c.sector] = [];
    datasets[c.sector].push({
      x: c.revenueGrowthNTM * 100, y: c.fcfMargin * 100, company: c
    });
  });

  const dsList = Object.entries(datasets).map(([sector, points]) => ({
    label: sector, data: points, pointRadius: 7, pointHoverRadius: 10,
    backgroundColor: sectorColors[sector] + '88', borderColor: sectorColors[sector], borderWidth: 1.5,
    pointStyle: 'circle'
  }));

  chartInstances.rule40 = new Chart(document.getElementById('chartRule40'), {
    type: 'scatter',
    data: { datasets: dsList },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { ...defaultScaleOpts, min: 0, max: 40, title: { display: true, text: 'Revenue Growth NTM (%)', color: ChartColors.textMuted, font: { size: 11 } } },
        y: { ...defaultScaleOpts, min: -10, max: 40, title: { display: true, text: 'FCF Margin (%)', color: ChartColors.textMuted, font: { size: 11 } } }
      },
      plugins: {
        ...defaultPluginOpts,
        tooltip: { ...defaultPluginOpts.tooltip, callbacks: {
          title: ctx => ctx[0].raw.company.name,
          label: ctx => {
            const c = ctx.raw.company;
            return [`Growth: ${(c.revenueGrowthNTM * 100).toFixed(0)}%`, `FCF Margin: ${(c.fcfMargin * 100).toFixed(0)}%`, `Rule of 40: ${c.ruleOf40Score}`];
          }
        }},
        datalabels: {
          display: true, color: '#e2e8f0', font: { family: "'JetBrains Mono', monospace", size: 9 },
          formatter: (val) => val.company.ticker, anchor: 'end', align: 'top', offset: 2
        }
      }
    },
    plugins: [{
      id: 'rule40Line',
      afterDraw(chart) {
        const { ctx, scales: { x, y } } = chart;
        ctx.save();
        ctx.strokeStyle = 'rgba(245,158,11,0.5)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(x.getPixelForValue(0), y.getPixelForValue(40));
        ctx.lineTo(x.getPixelForValue(40), y.getPixelForValue(0));
        ctx.stroke();
        ctx.fillStyle = ChartColors.amber;
        ctx.font = "11px 'Inter', sans-serif";
        ctx.fillText('Rule of 40 Line', x.getPixelForValue(28), y.getPixelForValue(14));
        ctx.restore();

        // Shade above line green, below red
        ctx.save();
        ctx.globalAlpha = 0.03;
        const ca = chart.chartArea;
        // Green triangle (above line)
        ctx.fillStyle = ChartColors.green;
        ctx.beginPath();
        ctx.moveTo(x.getPixelForValue(0), y.getPixelForValue(40));
        ctx.lineTo(x.getPixelForValue(40), y.getPixelForValue(0));
        ctx.lineTo(x.getPixelForValue(0), y.getPixelForValue(0));
        ctx.lineTo(ca.left, ca.top);
        ctx.lineTo(x.getPixelForValue(0), y.getPixelForValue(40));
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }]
  });
}

// 5. Revenue Stacked Area by Sector
function renderRevenueStack(data) {
  destroyChart('revenueStack');
  const sectorRevByQ = {};
  const allSectors = [...new Set(data.map(c => c.sector))];
  allSectors.forEach(s => { sectorRevByQ[s] = new Array(8).fill(0); });
  data.forEach(c => {
    c.quarterlyRevenue.forEach((v, i) => { sectorRevByQ[c.sector][i] += v; });
  });

  const datasets = allSectors.map(sector => ({
    label: sector, data: sectorRevByQ[sector].map(v => +v.toFixed(2)),
    backgroundColor: sectorColors[sector] + '44', borderColor: sectorColors[sector],
    borderWidth: 1.5, fill: true, tension: 0.3, pointRadius: 3, pointBackgroundColor: sectorColors[sector]
  }));

  chartInstances.revenueStack = new Chart(document.getElementById('chartRevenueStack'), {
    type: 'line',
    data: { labels: quarterLabels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { ...defaultScaleOpts },
        y: { ...defaultScaleOpts, stacked: true, title: { display: true, text: 'Revenue ($B)', color: ChartColors.textMuted, font: { size: 11 } } }
      },
      plugins: { ...defaultPluginOpts, datalabels: { display: false } },
      interaction: { mode: 'index', intersect: false }
    }
  });
}

// 6. Magic Number Bar Chart
function renderMagicNumber(data) {
  destroyChart('magicNumber');
  const sorted = [...data].sort((a, b) => b.magicNumber - a.magicNumber);

  chartInstances.magicNumber = new Chart(document.getElementById('chartMagicNumber'), {
    type: 'bar',
    data: {
      labels: sorted.map(c => c.ticker),
      datasets: [{
        data: sorted.map(c => c.magicNumber),
        backgroundColor: sorted.map(c => c.magicNumber >= 0.75 ? ChartColors.green + '88' : c.magicNumber >= 0.5 ? ChartColors.amber + '88' : ChartColors.red + '88'),
        borderColor: sorted.map(c => c.magicNumber >= 0.75 ? ChartColors.green : c.magicNumber >= 0.5 ? ChartColors.amber : ChartColors.red),
        borderWidth: 1, borderRadius: 3, barThickness: 14
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { ...defaultScaleOpts, grid: { display: false } },
        y: { ...defaultScaleOpts, title: { display: true, text: 'Magic Number', color: ChartColors.textMuted, font: { size: 10 } } }
      },
      plugins: { ...defaultPluginOpts, legend: { display: false }, datalabels: { display: false } }
    },
    plugins: [{
      id: 'thresholdLine',
      afterDraw(chart) {
        const { ctx, scales: { y } } = chart;
        [0.75, 0.5].forEach((val, i) => {
          const yPos = y.getPixelForValue(val);
          ctx.save();
          ctx.strokeStyle = i === 0 ? ChartColors.green : ChartColors.amber;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(chart.chartArea.left, yPos);
          ctx.lineTo(chart.chartArea.right, yPos);
          ctx.stroke();
          ctx.restore();
        });
      }
    }]
  });
}

// 7. NRR Horizontal Bar
function renderNRR(data) {
  destroyChart('nrr');
  const sorted = [...data].sort((a, b) => b.netRetentionRate - a.netRetentionRate);

  chartInstances.nrr = new Chart(document.getElementById('chartNRR'), {
    type: 'bar',
    data: {
      labels: sorted.map(c => c.ticker),
      datasets: [{
        data: sorted.map(c => c.netRetentionRate * 100),
        backgroundColor: sorted.map(c => c.netRetentionRate >= 1.2 ? ChartColors.green + '88' : c.netRetentionRate >= 1.1 ? ChartColors.blue + '88' : ChartColors.amber + '88'),
        borderColor: sorted.map(c => c.netRetentionRate >= 1.2 ? ChartColors.green : c.netRetentionRate >= 1.1 ? ChartColors.blue : ChartColors.amber),
        borderWidth: 1, borderRadius: 3, barThickness: 14
      }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      scales: {
        x: { ...defaultScaleOpts, min: 100, title: { display: true, text: 'NRR (%)', color: ChartColors.textMuted, font: { size: 10 } } },
        y: { ...defaultScaleOpts, grid: { display: false } }
      },
      plugins: { ...defaultPluginOpts, legend: { display: false }, datalabels: { display: false } }
    }
  });
}

// 8. Historical Multiple Trends Line Chart
function renderHistoricalMultiples(tickers) {
  destroyChart('historicalMultiples');
  const colors = [ChartColors.blue, ChartColors.green, ChartColors.purple];
  const datasets = tickers.filter(Boolean).map((ticker, i) => {
    const c = companies.find(co => co.ticker === ticker);
    if (!c) return null;
    return {
      label: c.ticker, data: c.historicalMultiples,
      borderColor: colors[i], backgroundColor: colors[i] + '22',
      borderWidth: 2, pointRadius: 3, pointBackgroundColor: colors[i],
      tension: 0.3, fill: false
    };
  }).filter(Boolean);

  chartInstances.historicalMultiples = new Chart(document.getElementById('chartHistoricalMultiples'), {
    type: 'line',
    data: { labels: monthLabels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { ...defaultScaleOpts },
        y: { ...defaultScaleOpts, title: { display: true, text: 'EV / Revenue (x)', color: ChartColors.textMuted, font: { size: 11 } } }
      },
      plugins: { ...defaultPluginOpts, datalabels: { display: false } },
      interaction: { mode: 'index', intersect: false }
    }
  });
}

// 9. Radar Comparison
function renderRadarChart(tickers) {
  destroyChart('radar');
  const colors = [ChartColors.blue, ChartColors.green, ChartColors.purple];
  const allCompanies = companies;

  // Normalize dimensions to 0-100 scale
  const maxGrowth = Math.max(...allCompanies.map(c => c.revenueGrowthNTM));
  const maxMargin = Math.max(...allCompanies.map(c => c.grossMargin));
  const maxNRR = Math.max(...allCompanies.map(c => c.netRetentionRate));
  const maxEVRev = Math.max(...allCompanies.map(c => c.evToRevenueNTM));
  const maxMagic = Math.max(...allCompanies.map(c => c.magicNumber));
  const maxMktCap = Math.max(...allCompanies.map(c => c.marketCap));

  const datasets = tickers.filter(Boolean).map((ticker, i) => {
    const c = allCompanies.find(co => co.ticker === ticker);
    if (!c) return null;
    return {
      label: c.name,
      data: [
        (c.revenueGrowthNTM / maxGrowth) * 100,
        (c.grossMargin / maxMargin) * 100,
        (c.netRetentionRate / maxNRR) * 100,
        (1 - c.evToRevenueNTM / maxEVRev) * 100, // Invert: lower multiple = better value
        (c.magicNumber / maxMagic) * 100,
        (c.marketCap / maxMktCap) * 100
      ],
      backgroundColor: colors[i] + '22', borderColor: colors[i],
      borderWidth: 2, pointRadius: 4, pointBackgroundColor: colors[i]
    };
  }).filter(Boolean);

  chartInstances.radar = new Chart(document.getElementById('chartRadar'), {
    type: 'radar',
    data: {
      labels: ['Growth', 'Margins', 'Retention', 'Valuation\n(Attractiveness)', 'Efficiency', 'Scale'],
      datasets
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true, max: 100,
          grid: { color: ChartColors.gridLight },
          angleLines: { color: ChartColors.gridLight },
          pointLabels: { color: ChartColors.textSecondary, font: { family: "'Inter', sans-serif", size: 11 } },
          ticks: { display: false }
        }
      },
      plugins: { ...defaultPluginOpts, datalabels: { display: false } }
    }
  });
}

// 10. Risk/Return Heatmap
function renderRiskMatrix(data) {
  const container = document.getElementById('riskMatrix');
  // Bucket companies by growth and valuation
  const growthBuckets = ['<15%', '15-20%', '20-25%', '>25%'];
  const valBuckets = ['<8x', '8-12x', '12-18x', '>18x'];

  function getGrowthBucket(g) {
    const pct = g * 100;
    if (pct < 15) return 0; if (pct < 20) return 1; if (pct < 25) return 2; return 3;
  }
  function getValBucket(v) {
    if (v < 8) return 0; if (v < 12) return 1; if (v < 18) return 2; return 3;
  }

  // Score: higher growth + lower valuation = more attractive
  function attractiveness(gi, vi) {
    return gi - vi; // -3 to +3 range
  }

  const grid = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => []));
  data.forEach(c => {
    const gi = getGrowthBucket(c.revenueGrowthNTM);
    const vi = getValBucket(c.evToRevenueNTM);
    grid[vi][gi].push(c.ticker);
  });

  let html = '<div style="overflow-x:auto;">';
  html += '<table style="border-collapse:collapse; width:100%; font-size:12px;">';
  html += '<tr><th style="background:transparent;border:none;width:80px;"></th>';
  growthBuckets.forEach(b => {
    html += `<th style="background:var(--bg-tertiary);color:var(--text-secondary);padding:10px;border:1px solid rgba(30,41,59,0.5);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;">${b}</th>`;
  });
  html += '</tr>';

  for (let vi = 3; vi >= 0; vi--) {
    html += `<tr><td style="background:var(--bg-tertiary);color:var(--text-secondary);padding:10px;border:1px solid rgba(30,41,59,0.5);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;text-align:center;">${valBuckets[vi]}</td>`;
    for (let gi = 0; gi < 4; gi++) {
      const score = attractiveness(gi, vi);
      let bg, color;
      if (score >= 2) { bg = 'rgba(16,185,129,0.2)'; color = '#34d399'; }
      else if (score >= 0) { bg = 'rgba(16,185,129,0.08)'; color = '#6ee7b7'; }
      else if (score >= -1) { bg = 'rgba(245,158,11,0.1)'; color = '#fbbf24'; }
      else { bg = 'rgba(239,68,68,0.12)'; color = '#f87171'; }

      const tickers = grid[vi][gi].join(', ') || '—';
      html += `<td style="background:${bg};color:${color};padding:12px 10px;border:1px solid rgba(30,41,59,0.3);font-family:'JetBrains Mono',monospace;font-size:11px;text-align:center;vertical-align:middle;min-width:120px;">${tickers}</td>`;
    }
    html += '</tr>';
  }

  html += '</table>';
  html += '<div style="display:flex;justify-content:space-between;margin-top:8px;font-size:10px;color:var(--text-muted);">';
  html += '<span>← Lower Growth</span><span style="font-weight:600;">Revenue Growth NTM →</span><span>Higher Growth →</span>';
  html += '</div>';
  html += '<div style="text-align:right;margin-top:2px;font-size:10px;color:var(--text-muted);">↑ Higher Valuation (EV/Rev)</div>';
  html += '</div>';

  container.innerHTML = html;
}
