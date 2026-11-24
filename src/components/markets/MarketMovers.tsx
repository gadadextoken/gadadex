import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MarketAsset } from '../../types/market';

interface MarketMoversProps {
  assets: MarketAsset[];
}

export const MarketMovers: React.FC<MarketMoversProps> = ({ assets }) => {
  // Top Gainers (highest positive change24h)
  const gainers = [...assets].sort((a, b) => b.change24h - a.change24h).slice(0, 3);

  // Top Losers (lowest change24h)
  const losers = [...assets].sort((a, b) => a.change24h - b.change24h).slice(0, 3);

  // High Volume
  const hot = [...assets].sort((a, b) => (b.volume24h * b.price) - (a.volume24h * a.price)).slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Top Gainers */}
      <div className="bg-gada-surface border border-gada-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gada-up/15 text-gada-up border border-gada-up/25">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Gainers</h3>
          </div>
          <span className="text-[10px] text-gada-muted bg-gada-elevated px-2 py-0.5 rounded-full border border-gada-border">
            24h Simulated
          </span>
        </div>

        <div className="space-y-3">
          {gainers.map((asset) => (
            <Link
              key={asset.symbol}
              to={`/trade/${asset.symbol}-USDT`}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gada-elevated transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gada-elevated border border-gada-border flex items-center justify-center font-bold text-[11px] text-white">
                  {asset.symbol.slice(0, 3)}
                </div>
                <div>
                  <span className="text-xs font-bold text-white group-hover:text-gada-magenta transition-colors block">
                    {asset.symbol}/USDT
                  </span>
                  <span className="text-[10px] text-gada-muted">{asset.name}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-white num-tabular block">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
                </span>
                <span className="text-[11px] font-semibold text-gada-up num-tabular flex items-center justify-end gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +{asset.change24h.toFixed(2)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-gada-surface border border-gada-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gada-down/15 text-gada-down border border-gada-down/25">
              <TrendingDown className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Losers</h3>
          </div>
          <span className="text-[10px] text-gada-muted bg-gada-elevated px-2 py-0.5 rounded-full border border-gada-border">
            24h Simulated
          </span>
        </div>

        <div className="space-y-3">
          {losers.map((asset) => (
            <Link
              key={asset.symbol}
              to={`/trade/${asset.symbol}-USDT`}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gada-elevated transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gada-elevated border border-gada-border flex items-center justify-center font-bold text-[11px] text-white">
                  {asset.symbol.slice(0, 3)}
                </div>
                <div>
                  <span className="text-xs font-bold text-white group-hover:text-gada-magenta transition-colors block">
                    {asset.symbol}/USDT
                  </span>
                  <span className="text-[10px] text-gada-muted">{asset.name}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-white num-tabular block">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
                </span>
                <span className="text-[11px] font-semibold text-gada-down num-tabular flex items-center justify-end gap-0.5">
                  <ArrowDownRight className="w-3 h-3" />
                  {asset.change24h.toFixed(2)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* High Volume / Hot */}
      <div className="bg-gada-surface border border-gada-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Most Active</h3>
          </div>
          <span className="text-[10px] text-gada-muted bg-gada-elevated px-2 py-0.5 rounded-full border border-gada-border">
            24h Turnover
          </span>
        </div>

        <div className="space-y-3">
          {hot.map((asset) => (
            <Link
              key={asset.symbol}
              to={`/trade/${asset.symbol}-USDT`}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gada-elevated transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gada-elevated border border-gada-border flex items-center justify-center font-bold text-[11px] text-white">
                  {asset.symbol.slice(0, 3)}
                </div>
                <div>
                  <span className="text-xs font-bold text-white group-hover:text-gada-magenta transition-colors block">
                    {asset.symbol}/USDT
                  </span>
                  <span className="text-[10px] text-gada-muted">
                    ${((asset.volume24h * asset.price) / 1000000).toFixed(1)}M Vol
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-white num-tabular block">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
                </span>
                <span
                  className={`text-[11px] font-semibold num-tabular flex items-center justify-end gap-0.5 ${
                    asset.change24h >= 0 ? 'text-gada-up' : 'text-gada-down'
                  }`}
                >
                  {asset.change24h >= 0 ? '+' : ''}
                  {asset.change24h.toFixed(2)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
