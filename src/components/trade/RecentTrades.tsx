import React from 'react';
import { RecentTrade } from '../../types/market';

interface RecentTradesProps {
  trades: RecentTrade[];
  precision: number;
}

export const RecentTrades: React.FC<RecentTradesProps> = ({ trades, precision }) => {
  return (
    <div className="flex flex-col h-full bg-gada-surface rounded-2xl border border-gada-border overflow-hidden text-xs">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-gada-border flex items-center justify-between bg-gada-elevated/40">
        <span className="font-bold text-white tracking-wide text-xs">Recent Trades</span>
        <span className="text-[10px] text-gada-subtle px-1.5 py-0.5 rounded bg-gada-midnight border border-gada-border">
          Live Tape
        </span>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-3 px-3 py-1.5 text-[10px] font-semibold text-gada-subtle uppercase border-b border-gada-border/40 bg-gada-midnight/30">
        <span>Price (USDT)</span>
        <span className="text-right">Size</span>
        <span className="text-right">Time</span>
      </div>

      {/* Trades List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gada-border/20 num-tabular">
        {trades.map((trade) => {
          const isBuy = trade.side === 'buy';
          return (
            <div
              key={trade.id}
              className="grid grid-cols-3 px-3 py-1 hover:bg-gada-elevated/40 transition-colors"
            >
              <span className={`font-semibold ${isBuy ? 'text-gada-up' : 'text-gada-down'}`}>
                {trade.price.toFixed(precision)}
              </span>
              <span className="text-right text-white/90">{trade.amount.toFixed(4)}</span>
              <span className="text-right text-gada-subtle">{trade.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
