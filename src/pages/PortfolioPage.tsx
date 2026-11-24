import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioStore } from '../store/portfolioStore';
import { useMarketStore } from '../store/marketStore';
import { useTradingStore } from '../store/tradingStore';
import { PortfolioSummaryCards } from '../components/portfolio/PortfolioSummaryCards';
import { AllocationChart } from '../components/portfolio/AllocationChart';
import { PerformanceChart } from '../components/portfolio/PerformanceChart';
import { Button } from '../components/common/Button';
import { PieChart, TrendingUp, History, ArrowRight } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { balances, resetPortfolio, claimFaucet } = usePortfolioStore();
  const { assets } = useMarketStore();
  const { clearHistory } = useTradingStore();

  // Price map
  const priceMap: Record<string, number> = {
    USDT: 1.0,
  };
  assets.forEach((a) => {
    priceMap[a.symbol] = a.price;
  });

  // Calculate USD valuation for each holding
  const holdings = Object.values(balances).map((bal) => {
    const price = priceMap[bal.symbol] || 0;
    const value = bal.total * price;
    return {
      ...bal,
      price,
      usdValue: value,
    };
  });

  const totalValue = holdings.reduce((sum, h) => sum + (h.usdValue || 0), 0);
  const availableUsdt = balances['USDT']?.free || 0;
  const lockedValue = Object.values(balances).reduce(
    (sum, b) => sum + b.locked * (priceMap[b.symbol] || 0),
    0
  );

  // Simulated 24h PnL
  const pnl24h = (totalValue - 10000) * 0.45;
  const pnlPercent24h = totalValue > 0 ? (pnl24h / 10000) * 100 : 0;

  // Colors for donut chart
  const palette = ['#8000FF', '#D946FF', '#0ECB81', '#3B82F6', '#F59E0B', '#EF4444', '#10B981'];
  const nonZeroHoldings = holdings.filter((h) => (h.usdValue || 0) > 0.01);

  const allocationData = nonZeroHoldings.map((h, i) => ({
    name: h.symbol,
    value: Number((h.usdValue || 0).toFixed(2)),
    color: palette[i % palette.length],
  }));

  const handleResetAll = () => {
    resetPortfolio();
    clearHistory();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Demo Portfolio Dashboard
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30">
              PAPER TRADING
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gada-muted mt-1">
            Simulated asset allocations, net asset value performance, and holding balances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/history">
            <Button variant="secondary" size="sm">
              <History className="w-3.5 h-3.5" />
              <span>Transaction History</span>
            </Button>
          </Link>
          <Link to="/trade">
            <Button variant="primary" size="sm">
              <span>Go to Trade</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <PortfolioSummaryCards
        totalValue={totalValue}
        pnl24h={pnl24h}
        pnlPercent24h={pnlPercent24h}
        availableUsdt={availableUsdt}
        lockedValue={lockedValue}
        onReset={handleResetAll}
        onFaucet={claimFaucet}
      />

      {/* Visual Analytics Grid: Allocation & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allocation Donut */}
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30">
                <PieChart className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">Asset Allocation</h2>
            </div>
            <span className="text-xs text-gada-muted">By Value ($)</span>
          </div>
          <AllocationChart data={allocationData} />
        </div>

        {/* Performance Trend */}
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gada-up/20 text-gada-up border border-gada-up/30">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">Simulated Net Value Trend</h2>
            </div>
            <span className="text-xs text-gada-muted">7-Day Curve</span>
          </div>
          <PerformanceChart totalValue={totalValue} />
        </div>
      </div>

      {/* Detailed Holdings Table */}
      <div className="bg-gada-surface border border-gada-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-gada-border bg-gada-elevated/40 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Asset Balances</h2>
          <span className="text-xs text-gada-muted">
            {nonZeroHoldings.length} Active Holding{nonZeroHoldings.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left num-tabular">
            <thead>
              <tr className="border-b border-gada-border/40 text-[10px] text-gada-subtle uppercase bg-gada-midnight/30">
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4">Total Balance</th>
                <th className="py-3 px-4">Available Free</th>
                <th className="py-3 px-4">In Orders (Locked)</th>
                <th className="py-3 px-4">Simulated Price</th>
                <th className="py-3 px-4">Est. Value (USDT)</th>
                <th className="py-3 px-4">Allocation %</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gada-border/30 text-xs">
              {holdings.map((h) => {
                const allocPct = totalValue > 0 ? ((h.usdValue || 0) / totalValue) * 100 : 0;
                return (
                  <tr key={h.symbol} className="hover:bg-gada-elevated/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gada-elevated border border-gada-border flex items-center justify-center font-bold text-[11px] text-white">
                          {h.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{h.symbol}</span>
                          <span className="text-[10px] text-gada-muted">{h.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">{h.total.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-gada-up font-semibold">{h.free.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-gada-subtle">{h.locked.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-white">${h.price.toFixed(h.price < 10 ? 4 : 2)}</td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      ${(h.usdValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-gada-elevated overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-gada-violet to-gada-magenta rounded-full"
                            style={{ width: `${allocPct}%` }}
                          />
                        </div>
                        <span className="text-gada-muted text-[11px]">{allocPct.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {h.symbol !== 'USDT' ? (
                        <Link
                          to={`/trade/${h.symbol}-USDT`}
                          className="px-2.5 py-1 rounded-lg bg-gada-violet/20 hover:bg-gada-violet text-gada-magenta hover:text-white font-semibold transition-all border border-gada-violet/30"
                        >
                          Trade
                        </Link>
                      ) : (
                        <button
                          onClick={claimFaucet}
                          className="px-2.5 py-1 rounded-lg bg-gada-elevated hover:bg-gada-border text-white transition-colors border border-gada-border"
                        >
                          +Faucet
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
