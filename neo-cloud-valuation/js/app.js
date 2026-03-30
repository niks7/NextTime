// NeoCloud Analytics - Main Application Logic

(function () {
  'use strict';

  // ---------- State ----------
  let filteredData = [...companies];
  let sortKey = null;
  let sortDir = 'desc';

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    Chart.register(ChartDataLabels);
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#94a3b8';

    document.getElementById('navDate').textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    setupNavigation();
    setupFilters();
    setupCompanySelectors();
    setupDCF();
    renderAll();
  });

  // ---------- Navigation ----------
  function setupNavigation() {
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const section = item.dataset.section;
        document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('panel-' + section).classList.add('active');
        // Re-render active section charts (canvas resize fix)
        setTimeout(() => renderSection(section), 50);
      });
    });
  }

  function renderSection(section) {
    const d = filteredData;
    switch (section) {
      case 'overview': renderOverview(d); break;
      case 'comptable': renderCompTable(d); break;
      case 'growth': renderGrowthCharts(d); break;
      case 'valuation': renderValuationMap(d); break;
      case 'dcf': updateDCF(); break;
      case 'rule40': renderRule40Section(d); break;
      case 'cohort': renderCohortSection(); break;
      case 'risk': renderRiskMatrix(d); break;
    }
  }

  // ---------- Filters ----------
  function setupFilters() {
    document.getElementById('filterSector').addEventListener('change', applyFilters);
    document.getElementById('searchInput').addEventListener('input', applyFilters);
  }

  function applyFilters() {
    const sector = document.getElementById('filterSector').value;
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    filteredData = companies.filter(c => {
      if (sector !== 'all' && c.sector !== sector) return false;
      if (search && !c.ticker.toLowerCase().includes(search) && !c.name.toLowerCase().includes(search)) return false;
      return true;
    });
    renderAll();
  }

  // ---------- Render All ----------
  function renderAll() {
    const d = filteredData;
    renderStats(d);
    renderOverview(d);
    renderCompTable(d);
    renderGrowthCharts(d);
    renderValuationMap(d);
    renderRule40Section(d);
    renderRiskMatrix(d);
    renderCohortSection();
    buildSectorLegend();
  }

  // ---------- Stats Cards ----------
  function renderStats(data) {
    const agg = computeAggregates(data);
    const grid = document.getElementById('statsGrid');
    grid.innerHTML = `
      <div class="stat-card">
        <div class="stat-label">Universe Market Cap</div>
        <div class="stat-value">$${agg.totalMarketCap.toFixed(0)}B</div>
        <div class="stat-change positive">${data.length} companies</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Median EV/Rev NTM</div>
        <div class="stat-value">${agg.medianEvRevNTM.toFixed(1)}x</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Median Growth NTM</div>
        <div class="stat-value">${(agg.medianGrowthNTM * 100).toFixed(0)}%</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Median Rule of 40</div>
        <div class="stat-value">${agg.medianRule40.toFixed(0)}</div>
        <div class="stat-change ${agg.medianRule40 >= 40 ? 'positive' : 'negative'}">${agg.medianRule40 >= 40 ? 'Above threshold' : 'Below threshold'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Median Gross Margin</div>
        <div class="stat-value">${(agg.medianGrossMargin * 100).toFixed(0)}%</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Median FCF Margin</div>
        <div class="stat-value">${(agg.medianFCFMargin * 100).toFixed(0)}%</div>
      </div>
    `;
  }

  function computeAggregates(data) {
    const totalMarketCap = data.reduce((s, c) => s + c.marketCap, 0);
    const med = (arr, fn) => {
      const s = [...arr].sort((a, b) => fn(a) - fn(b));
      const m = Math.floor(s.length / 2);
      return s.length % 2 ? fn(s[m]) : (fn(s[m - 1]) + fn(s[m])) / 2;
    };
    return {
      totalMarketCap,
      medianEvRevNTM: med(data, c => c.evToRevenueNTM),
      medianGrowthNTM: med(data, c => c.revenueGrowthNTM),
      medianRule40: med(data, c => c.ruleOf40Score),
      medianGrossMargin: med(data, c => c.grossMargin),
      medianFCFMargin: med(data, c => c.fcfMargin)
    };
  }

  // ---------- Overview ----------
  function renderOverview(data) {
    renderSectorAllocation(data);
    renderMultipleBar(data);
    const tickers = [
      document.getElementById('histSelect1').value,
      document.getElementById('histSelect2').value,
      document.getElementById('histSelect3').value
    ];
    renderHistoricalMultiples(tickers);
  }

  // ---------- Comp Table ----------
  function renderCompTable(data) {
    const tbody = document.getElementById('compTableBody');
    const sorted = sortKey ? [...data].sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    }) : data;

    tbody.innerHTML = sorted.map(c => {
      const sectorClass = 'sector-' + c.sector.replace(/[\/\s]/g, '-');
      return `<tr>
        <td>${c.ticker}</td>
        <td>${c.name}</td>
        <td><span class="sector-badge ${sectorClass}">${c.sector}</span></td>
        <td>$${c.marketCap.toFixed(1)}</td>
        <td>$${c.enterpriseValue.toFixed(1)}</td>
        <td>$${c.ltmRevenue.toFixed(2)}</td>
        <td>$${c.ntmRevenue.toFixed(2)}</td>
        <td class="${colorClass(c.revenueGrowthLTM * 100, 30, 15)}">${(c.revenueGrowthLTM * 100).toFixed(0)}%</td>
        <td class="${colorClass(c.revenueGrowthNTM * 100, 30, 15)}">${(c.revenueGrowthNTM * 100).toFixed(0)}%</td>
        <td class="${colorClass(c.grossMargin * 100, 75, 65)}">${(c.grossMargin * 100).toFixed(0)}%</td>
        <td class="${colorClass(c.fcfMargin * 100, 20, 5)}">${(c.fcfMargin * 100).toFixed(0)}%</td>
        <td>${c.evToRevenueLTM.toFixed(1)}x</td>
        <td>${c.evToRevenueNTM.toFixed(1)}x</td>
        <td>${c.evToGrossProfit.toFixed(1)}x</td>
        <td class="${colorClass(c.netRetentionRate * 100, 120, 110)}">${(c.netRetentionRate * 100).toFixed(0)}%</td>
        <td class="${colorClass(c.ruleOf40Score, 40, 25)}">${c.ruleOf40Score}</td>
        <td class="${colorClass(c.magicNumber * 100, 75, 50)}">${c.magicNumber.toFixed(2)}</td>
      </tr>`;
    }).join('');

    // Setup sort headers
    document.querySelectorAll('.comp-table th').forEach(th => {
      th.classList.remove('sorted-asc', 'sorted-desc');
      if (th.dataset.key === sortKey) th.classList.add(sortDir === 'asc' ? 'sorted-asc' : 'sorted-desc');
      th.onclick = () => {
        if (sortKey === th.dataset.key) { sortDir = sortDir === 'asc' ? 'desc' : 'asc'; }
        else { sortKey = th.dataset.key; sortDir = 'desc'; }
        renderCompTable(filteredData);
      };
    });

    // Export button
    document.getElementById('exportBtn').onclick = () => exportTableTSV();
  }

  function colorClass(val, high, mid) {
    if (val >= high) return 'val-high';
    if (val >= mid) return 'val-mid';
    return 'val-low';
  }

  function exportTableTSV() {
    const headers = ['Ticker', 'Company', 'Sector', 'Mkt Cap ($B)', 'EV ($B)', 'LTM Rev', 'NTM Rev',
      'Rev Gr LTM', 'Rev Gr NTM', 'Gross Mgn', 'FCF Mgn', 'EV/Rev LTM', 'EV/Rev NTM', 'EV/GP', 'NRR', 'Rule of 40', 'Magic #'];
    const rows = filteredData.map(c => [
      c.ticker, c.name, c.sector, c.marketCap.toFixed(1), c.enterpriseValue.toFixed(1),
      c.ltmRevenue.toFixed(2), c.ntmRevenue.toFixed(2),
      (c.revenueGrowthLTM * 100).toFixed(0) + '%', (c.revenueGrowthNTM * 100).toFixed(0) + '%',
      (c.grossMargin * 100).toFixed(0) + '%', (c.fcfMargin * 100).toFixed(0) + '%',
      c.evToRevenueLTM.toFixed(1), c.evToRevenueNTM.toFixed(1), c.evToGrossProfit.toFixed(1),
      (c.netRetentionRate * 100).toFixed(0) + '%', c.ruleOf40Score, c.magicNumber.toFixed(2)
    ].join('\t'));
    const tsv = [headers.join('\t'), ...rows].join('\n');
    navigator.clipboard.writeText(tsv).then(() => showToast('Copied to clipboard as TSV'));
  }

  // ---------- Growth Charts ----------
  function renderGrowthCharts(data) {
    renderRevenueStack(data);
    renderMagicNumber(data);
    renderNRR(data);
  }

  // ---------- Valuation Map ----------
  function renderValuationMap(data) {
    renderBubbleChart(data);
  }

  // ---------- Rule of 40 ----------
  function renderRule40Section(data) {
    renderRule40Chart(data);
  }

  // ---------- Cohort ----------
  function renderCohortSection() {
    const tickers = [
      document.getElementById('radarSelect1').value,
      document.getElementById('radarSelect2').value,
      document.getElementById('radarSelect3').value
    ];
    renderRadarChart(tickers);
  }

  // ---------- Company Selectors ----------
  function setupCompanySelectors() {
    const opts = companies.map(c => `<option value="${c.ticker}">${c.ticker} — ${c.name}</option>`).join('');
    ['histSelect1', 'histSelect2', 'histSelect3', 'radarSelect1', 'radarSelect2', 'radarSelect3'].forEach((id, i) => {
      const el = document.getElementById(id);
      el.innerHTML = `<option value="">— Select —</option>` + opts;
      // Set defaults
      const defaults = ['SNOW', 'CRWD', 'PLTR', 'DDOG', 'NET', 'MDB'];
      if (defaults[i]) el.value = defaults[i];
    });

    ['histSelect1', 'histSelect2', 'histSelect3'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        renderHistoricalMultiples([
          document.getElementById('histSelect1').value,
          document.getElementById('histSelect2').value,
          document.getElementById('histSelect3').value
        ]);
      });
    });

    ['radarSelect1', 'radarSelect2', 'radarSelect3'].forEach(id => {
      document.getElementById(id).addEventListener('change', renderCohortSection);
    });
  }

  // ---------- Sector Legend ----------
  function buildSectorLegend() {
    const html = Object.entries(sectorColors).map(([sector, color]) =>
      `<div class="sector-legend-item"><div class="sector-legend-dot" style="background:${color}"></div>${sector}</div>`
    ).join('');
    document.querySelectorAll('.sector-legend').forEach(el => { el.innerHTML = html; });
  }

  // ---------- DCF Model ----------
  function setupDCF() {
    const select = document.getElementById('dcfCompany');
    select.innerHTML = companies.map(c => `<option value="${c.ticker}">${c.ticker} — ${c.name}</option>`).join('');
    select.value = 'SNOW';

    // Set initial slider values from company defaults
    select.addEventListener('change', () => {
      const c = companies.find(co => co.ticker === select.value);
      if (c) {
        document.getElementById('dcfCagr').value = Math.round(c.dcfAssumptions.revenueCAGR5yr * 100);
        document.getElementById('dcfFcf').value = Math.round(c.dcfAssumptions.targetFCFMargin * 100);
        document.getElementById('dcfWacc').value = (c.dcfAssumptions.wacc * 100).toFixed(1);
        document.getElementById('dcfTg').value = (c.dcfAssumptions.terminalGrowth * 100).toFixed(1);
        document.getElementById('dcfExit').value = Math.round(c.evToRevenueNTM);
        updateDCF();
      }
    });

    ['dcfCagr', 'dcfFcf', 'dcfWacc', 'dcfTg', 'dcfExit'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateDCF);
    });

    // Trigger initial load
    select.dispatchEvent(new Event('change'));
  }

  function updateDCF() {
    const ticker = document.getElementById('dcfCompany').value;
    const c = companies.find(co => co.ticker === ticker);
    if (!c) return;

    const cagr = parseInt(document.getElementById('dcfCagr').value) / 100;
    const fcfM = parseInt(document.getElementById('dcfFcf').value) / 100;
    const wacc = parseFloat(document.getElementById('dcfWacc').value) / 100;
    const tg = parseFloat(document.getElementById('dcfTg').value) / 100;
    const exitMult = parseInt(document.getElementById('dcfExit').value);

    // Update display values
    document.getElementById('dcfCagrVal').textContent = (cagr * 100).toFixed(0) + '%';
    document.getElementById('dcfFcfVal').textContent = (fcfM * 100).toFixed(0) + '%';
    document.getElementById('dcfWaccVal').textContent = (wacc * 100).toFixed(1) + '%';
    document.getElementById('dcfTgVal').textContent = (tg * 100).toFixed(1) + '%';
    document.getElementById('dcfExitVal').textContent = exitMult + 'x';

    // 5-year projections
    const baseRev = c.ntmRevenue;
    const years = [];
    for (let i = 1; i <= 5; i++) {
      const rev = baseRev * Math.pow(1 + cagr, i);
      const growthRate = i <= 2 ? cagr : cagr * (1 - (i - 2) * 0.08); // Decelerate slightly
      const margin = fcfM * (i / 5); // Ramp to target
      const fcf = rev * margin;
      years.push({ year: 2026 + i, rev, growthRate, margin, fcf });
    }

    // Terminal value (exit multiple method)
    const terminalRev = years[4].rev;
    const terminalValue = terminalRev * exitMult;

    // Discount back
    let pvFCF = 0;
    years.forEach((y, i) => { pvFCF += y.fcf / Math.pow(1 + wacc, i + 1); });
    const pvTerminal = terminalValue / Math.pow(1 + wacc, 5);
    const impliedEV = pvFCF + pvTerminal;
    const impliedPrice = (impliedEV / c.sharesOutstanding) * 1000; // Convert $B to per share
    const upside = ((impliedPrice / c.currentPrice) - 1) * 100;

    // Summary cards
    document.getElementById('dcfSummary').innerHTML = `
      <div class="dcf-summary-card">
        <div class="label">Current Price</div>
        <div class="value" style="color:var(--text-primary)">$${c.currentPrice.toFixed(2)}</div>
      </div>
      <div class="dcf-summary-card">
        <div class="label">Implied EV ($B)</div>
        <div class="value" style="color:var(--accent-blue)">$${impliedEV.toFixed(1)}B</div>
      </div>
      <div class="dcf-summary-card">
        <div class="label">Implied Price</div>
        <div class="value" style="color:var(--accent-cyan)">$${impliedPrice.toFixed(2)}</div>
      </div>
      <div class="dcf-summary-card">
        <div class="label">Upside / Downside</div>
        <div class="value" style="color:${upside >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'}">${upside >= 0 ? '+' : ''}${upside.toFixed(1)}%</div>
      </div>
    `;

    // Projections table
    let projHtml = `<table class="dcf-projection-table">
      <thead><tr><th>Metric</th><th>Base (NTM)</th>`;
    years.forEach(y => { projHtml += `<th>FY${y.year}</th>`; });
    projHtml += `</tr></thead><tbody>`;

    projHtml += `<tr><td>Revenue ($B)</td><td>$${baseRev.toFixed(2)}</td>`;
    years.forEach(y => { projHtml += `<td>$${y.rev.toFixed(2)}</td>`; });
    projHtml += `</tr>`;

    projHtml += `<tr><td>YoY Growth</td><td>${(cagr * 100).toFixed(0)}%</td>`;
    years.forEach((y, i) => {
      const prevRev = i === 0 ? baseRev : years[i - 1].rev;
      const g = ((y.rev / prevRev) - 1) * 100;
      projHtml += `<td>${g.toFixed(0)}%</td>`;
    });
    projHtml += `</tr>`;

    projHtml += `<tr><td>FCF Margin</td><td>${(c.fcfMargin * 100).toFixed(0)}%</td>`;
    years.forEach(y => { projHtml += `<td>${(y.margin * 100).toFixed(0)}%</td>`; });
    projHtml += `</tr>`;

    projHtml += `<tr><td>FCF ($B)</td><td>$${(baseRev * c.fcfMargin).toFixed(2)}</td>`;
    years.forEach(y => { projHtml += `<td>$${y.fcf.toFixed(2)}</td>`; });
    projHtml += `</tr></tbody></table>`;

    document.getElementById('dcfProjections').innerHTML = projHtml;

    // Sensitivity table: WACC vs Terminal Growth
    const waccRange = [0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15];
    const tgRange = [0.015, 0.02, 0.025, 0.03, 0.035, 0.04];

    let sensHtml = `<table class="sensitivity-table"><thead><tr><th>WACC \\ TG</th>`;
    tgRange.forEach(t => { sensHtml += `<th>${(t * 100).toFixed(1)}%</th>`; });
    sensHtml += `</tr></thead><tbody>`;

    waccRange.forEach(w => {
      sensHtml += `<tr><th>${(w * 100).toFixed(0)}%</th>`;
      tgRange.forEach(t => {
        // Recalculate implied price for this combo
        let pv = 0;
        for (let i = 0; i < 5; i++) {
          const yr = years[i];
          pv += yr.fcf / Math.pow(1 + w, i + 1);
        }
        const tv = terminalRev * exitMult;
        const pvTv = tv / Math.pow(1 + w, 5);
        const ev = pv + pvTv;
        const price = (ev / c.sharesOutstanding) * 1000;
        const up = ((price / c.currentPrice) - 1) * 100;

        const isCurrent = Math.abs(w - wacc) < 0.001 && Math.abs(t - tg) < 0.001;
        let cls = '';
        if (isCurrent) cls = 'sens-current ';
        if (up >= 20) cls += 'sens-high';
        else if (up >= 0) cls += 'sens-mid';
        else cls += 'sens-low';

        sensHtml += `<td class="${cls}">$${price.toFixed(0)}</td>`;
      });
      sensHtml += `</tr>`;
    });
    sensHtml += `</tbody></table>`;
    document.getElementById('dcfSensitivity').innerHTML = sensHtml;
  }

  // ---------- Toast ----------
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

})();
