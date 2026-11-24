import React, { useState } from 'react';
import { OrderBook as IOrderBook } from '../../types/market';

interface OrderBookProps {
  orderBook: IOrderBook;
  precision: number;
  onSelectPrice?: (price: number) => void;
}

export const OrderBook: React.FC<OrderBookProps> = ({ orderBook, precision, onSelectPrice }) => {
  const [viewMode, setViewMode] = useState<'both' | 'bids' | 'asks'>('both');

  const maxAskTotal = orderBook.asks.length > 0 ? orderBook.asks[0].total : 1;
  const maxBidTotal = orderBook.bids.length > 0 ? orderBook.bids[orderBook.bids.length - 1].total : 1;
  const maxTotal = Math.max(maxAskTotal, maxBidTotal) || 1;

  const visibleAsks = viewMode === 'bids' ? [] : viewMode === 'asks' ? orderBook.asks.slice(-10) : orderBook.asks.slice(-6);
  const visibleBids = viewMode === 'asks' ? [] : viewMode === 'bids' ? orderBook.bids.slice(0, 10) : orderBook.bids.slice(0, 6);

  return (
    <div className="flex flex-col h-full bg-gada-surface rounded-2xl border border-gada-border overflow-hidden text-xs">
      {/* Header & Controls */}
      <div className="px-3 py-2.5 border-b border-gada-border flex items-center justify-between bg-gada-elevated/40">
        <span className="font-bold text-white tracking-wide text-xs">Order Book</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('both')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              viewMode === 'both' ? 'bg-gada-violet/30 text-gada-magenta' : 'text-gada-subtle hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setViewMode('bids')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              viewMode === 'bids' ? 'bg-gada-up/20 text-gada-up' : 'text-gada-subtle hover:text-white'
            }`}
          >
            Bids
          </button>
          <button
            onClick={() => setViewMode('asks')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              viewMode === 'asks' ? 'bg-gada-down/20 text-gada-down' : 'text-gada-subtle hover:text-white'
            }`}
          >
            Asks
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-3 px-3 py-1.5 text-[10px] font-semibold text-gada-subtle uppercase border-b border-gada-border/40 bg-gada-midnight/30">
        <span>Price (USDT)</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sell Orders - Red) */}
      <div className="flex-1 overflow-y-auto divide-y divide-gada-border/20 num-tabular">
        {visibleAsks.map((ask, idx) => {
          const depthPercent = Math.min(100, Math.max(10, (ask.total / maxTotal) * 100));
          return (
            <div
              key={`ask-${idx}`}
              onClick={() => onSelectPrice && onSelectPrice(ask.price)}
              className="grid grid-cols-3 px-3 py-1 cursor-pointer hover:bg-gada-elevated/60 relative group"
            >
              {/* Depth Background Bar */}
              <div
                className="absolute inset-y-0 right-0 bg-gada-down/15 pointer-events-none transition-all"
                style={{ width: `${depthPercent}%` }}
              />
              <span className="text-gada-down font-medium z-10">
                {ask.price.toFixed(precision)}
              </span>
              <span className="text-right text-white/90 z-10">{ask.amount.toFixed(4)}</span>
              <span className="text-right text-gada-muted z-10">{ask.total.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
            </div>
          );
        })}

        {/* Spread Row */}
        {viewMode === 'both' && (
          <div className="px-3 py-2 bg-gada-midnight/70 border-y border-gada-border/50 flex items-center justify-between font-medium">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gada-subtle uppercase">Spread:</span>
              <span className="text-xs font-bold text-white num-tabular">{orderBook.spread.toFixed(precision)}</span>
            </div>
            <span className="text-[10px] text-gada-muted num-tabular">
              ({orderBook.spreadPercent.toFixed(2)}%)
            </span>
          </div>
        )}

        {/* Bids (Buy Orders - Green) */}
        {visibleBids.map((bid, idx) => {
          const depthPercent = Math.min(100, Math.max(10, (bid.total / maxTotal) * 100));
          return (
            <div
              key={`bid-${idx}`}
              onClick={() => onSelectPrice && onSelectPrice(bid.price)}
              className="grid grid-cols-3 px-3 py-1 cursor-pointer hover:bg-gada-elevated/60 relative group"
            >
              {/* Depth Background Bar */}
              <div
                className="absolute inset-y-0 right-0 bg-gada-up/15 pointer-events-none transition-all"
                style={{ width: `${depthPercent}%` }}
              />
              <span className="text-gada-up font-medium z-10">
                {bid.price.toFixed(precision)}
              </span>
              <span className="text-right text-white/90 z-10">{bid.amount.toFixed(4)}</span>
              <span className="text-right text-gada-muted z-10">{bid.total.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
