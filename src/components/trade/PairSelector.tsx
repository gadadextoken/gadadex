import React, { useState } from 'react';
import { ChevronDown, Star, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { MarketAsset } from '../../types/market';
import { useWatchlistStore } from '../../store/watchlistStore';

interface PairSelectorProps {
  currentAsset: MarketAsset;
  assets: MarketAsset[];
  onSelect: (symbol: string) => void;
}

export const PairSelector: React.FC<PairSelectorProps> = ({ currentAsset, assets, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { isWatchlisted, toggleWatchlist } = useWatchlistStore();

  const isUp = currentAsset.change24h >= 0;

  const filtered = assets.filter(
    (a) =>
      a.symbol.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Pair Header Bar */}
      <div className="bg-gada-surface border-b border-gada-border px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Pair Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1.5 -ml-1 rounded-xl hover:bg-gada-elevated transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gada-violet/40 to-gada-surface border border-gada-border flex items-center justify-center font-bold text-xs text-white shadow-inner">
              {currentAsset.symbol.slice(0, 3)}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 font-extrabold text-base text-white">
                <span>{currentAsset.symbol}</span>
                <span className="text-xs text-gada-muted font-normal">/USDT</span>
                <ChevronDown className={`w-4 h-4 text-gada-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
              <span className="text-[10px] text-gada-muted">{currentAsset.name}</span>
            </div>
          </button>

          <button
            onClick={() => toggleWatchlist(currentAsset.symbol)}
            className="p-1.5 rounded-lg text-gada-subtle hover:text-amber-400 transition-colors"
            title="Toggle Watchlist"
          >
            <Star className={`w-4 h-4 ${isWatchlisted(currentAsset.symbol) ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* 24h Ticker Stats */}
        <div className="flex items-center gap-6 overflow-x-auto text-xs num-tabular">
          {/* Last Price */}
          <div>
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">Last Price</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-bold ${isUp ? 'text-gada-up' : 'text-gada-down'}`}>
                ${currentAsset.price.toLocaleString(undefined, { minimumFractionDigits: currentAsset.precision })}
              </span>
              <span
                className={`text-[10px] font-semibold flex items-center ${
                  isUp ? 'text-gada-up' : 'text-gada-down'
                }`}
              >
                {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {isUp ? '+' : ''}{currentAsset.change24h.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* 24h High */}
          <div className="hidden sm:block">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">24h High</span>
            <span className="font-semibold text-white">
              ${currentAsset.high24h.toLocaleString(undefined, { minimumFractionDigits: currentAsset.precision })}
            </span>
          </div>

          {/* 24h Low */}
          <div className="hidden sm:block">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">24h Low</span>
            <span className="font-semibold text-white">
              ${currentAsset.low24h.toLocaleString(undefined, { minimumFractionDigits: currentAsset.precision })}
            </span>
          </div>

          {/* 24h Volume */}
          <div className="hidden md:block">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">24h Turnover</span>
            <span className="font-semibold text-white">
              ${((currentAsset.volume24h * currentAsset.price) / 1000000).toFixed(2)}M USDT
            </span>
          </div>
        </div>
      </div>

      {/* Dropdown Selector Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-gada-surface border border-gada-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
          <div className="p-3 border-b border-gada-border bg-gada-elevated/40">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gada-muted" />
              <input
                type="text"
                placeholder="Search market..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gada-midnight border border-gada-border rounded-xl text-xs text-white placeholder-gada-muted focus:outline-none focus:border-gada-violet"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-gada-border/40">
            {filtered.map((asset) => {
              const assetUp = asset.change24h >= 0;
              const isSelected = asset.symbol === currentAsset.symbol;
              return (
                <div
                  key={asset.symbol}
                  onClick={() => {
                    onSelect(asset.symbol);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 hover:bg-gada-elevated cursor-pointer transition-colors ${
                    isSelected ? 'bg-gada-violet/10 border-l-2 border-gada-magenta' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(asset.symbol);
                      }}
                      className="text-gada-subtle hover:text-amber-400"
                    >
                      <Star className={`w-3.5 h-3.5 ${isWatchlisted(asset.symbol) ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <div>
                      <span className="text-xs font-bold text-white block">{asset.symbol}/USDT</span>
                      <span className="text-[10px] text-gada-muted">{asset.name}</span>
                    </div>
                  </div>

                  <div className="text-right num-tabular">
                    <span className="text-xs font-semibold text-white block">
                      ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
                    </span>
                    <span className={`text-[10px] font-semibold ${assetUp ? 'text-gada-up' : 'text-gada-down'}`}>
                      {assetUp ? '+' : ''}{asset.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
