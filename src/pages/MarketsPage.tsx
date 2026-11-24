import React from 'react';
import { MarketTable } from '../components/markets/MarketTable';
import { MarketMovers } from '../components/markets/MarketMovers';
import { useMarketStore } from '../store/marketStore';
import { TrendingUp, BarChart3, ShieldCheck } from 'lucide-react';

export const MarketsPage: React.FC = () => {
  const { assets } = useMarketStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Markets Overview
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30">
              SIMULATED
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gada-muted mt-1">
            Real-time simulated digital asset prices, 24h market activity, volume, and trends.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs num-tabular">
          <div className="p-3 rounded-xl bg-gada-surface border border-gada-border">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">Active Pairs</span>
            <span className="font-bold text-white text-sm">{assets.length} Markets</span>
          </div>
          <div className="p-3 rounded-xl bg-gada-surface border border-gada-border">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">Simulated Volume 24h</span>
            <span className="font-bold text-white text-sm">$482.9M USDT</span>
          </div>
        </div>
      </div>

      {/* Market Movers Preview */}
      <MarketMovers assets={assets} />

      {/* Main Market Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">All Digital Assets</h2>
          <span className="text-xs text-gada-muted">Click any coin to view charts or launch trade</span>
        </div>
        <MarketTable assets={assets} />
      </div>
    </div>
  );
};
