import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMarketStore } from '../store/marketStore';
import { useWatchlistStore } from '../store/watchlistStore';
import { TradingChart } from '../components/trade/TradingChart';
import { OrderBook } from '../components/trade/OrderBook';
import { Button } from '../components/common/Button';
import {
  Star,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Info,
  ShieldAlert,
} from 'lucide-react';

export const AssetDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { getAsset, orderBooks } = useMarketStore();
  const { isWatchlisted, toggleWatchlist } = useWatchlistStore();

  const asset = getAsset(symbol || 'BTC') || getAsset('BTC')!;
  const isUp = asset.change24h >= 0;
  const starred = isWatchlisted(asset.symbol);
  const book = orderBooks[asset.symbol] || orderBooks['BTC'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-semibold text-gada-muted hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleWatchlist(asset.symbol)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              starred
                ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                : 'bg-gada-surface text-gada-muted border-gada-border hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${starred ? 'fill-amber-400' : ''}`} />
            {starred ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
          <Link to={`/trade/${asset.symbol}-USDT`}>
            <Button variant="buy" size="sm">
              Trade {asset.symbol}/USDT
            </Button>
          </Link>
        </div>
      </div>

      {/* Asset Header Info */}
      <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gada-violet/40 to-gada-surface border border-gada-border flex items-center justify-center font-black text-lg text-white shadow-inner">
            {asset.symbol.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{asset.name}</h1>
              <span className="text-xs font-bold text-gada-muted bg-gada-elevated px-2 py-0.5 rounded-lg border border-gada-border">
                {asset.symbol}/USDT
              </span>
              <span className="text-xs text-gada-subtle font-semibold">Rank #{asset.rank}</span>
            </div>
            <p className="text-xs text-gada-muted mt-1 max-w-lg line-clamp-1">{asset.description}</p>
          </div>
        </div>

        {/* Real-time stats */}
        <div className="flex flex-wrap items-center gap-6 text-xs num-tabular">
          <div>
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">Price (USDT)</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">
                ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
              </span>
              <span
                className={`text-xs font-bold flex items-center px-2 py-0.5 rounded ${
                  isUp ? 'bg-gada-up/15 text-gada-up' : 'bg-gada-down/15 text-gada-down'
                }`}
              >
                {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {isUp ? '+' : ''}{asset.change24h.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="border-l border-gada-border/70 pl-6 hidden sm:block">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">24h High</span>
            <span className="font-bold text-white text-sm">
              ${asset.high24h.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
            </span>
          </div>

          <div className="border-l border-gada-border/70 pl-6 hidden sm:block">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">24h Low</span>
            <span className="font-bold text-white text-sm">
              ${asset.low24h.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
            </span>
          </div>

          <div className="border-l border-gada-border/70 pl-6 hidden md:block">
            <span className="text-[10px] text-gada-subtle block uppercase font-medium">24h Volume</span>
            <span className="font-bold text-white text-sm">
              ${((asset.volume24h * asset.price) / 1000000).toFixed(2)}M
            </span>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 h-[480px]">
          <TradingChart
            symbol={asset.symbol}
            basePrice={asset.price}
            precision={asset.precision}
          />
        </div>

        {/* Order Book Side Preview */}
        <div className="h-[480px]">
          <OrderBook
            orderBook={book}
            precision={asset.precision}
            onSelectPrice={(p) => navigate(`/trade/${asset.symbol}-USDT`)}
          />
        </div>
      </div>

      {/* Asset Fundamentals & Educational Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gada-surface border border-gada-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gada-magenta" />
            <h2 className="text-base font-bold text-white">About {asset.name}</h2>
          </div>
          <p className="text-xs sm:text-sm text-gada-muted leading-relaxed">
            {asset.description}
          </p>
          <div className="p-3 rounded-xl bg-gada-midnight/70 border border-gada-border text-xs text-gada-muted flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Simulated asset representation. Statistics and price movements reflect paper-trading demo streams only.
            </span>
          </div>
        </div>

        <div className="bg-gada-surface border border-gada-border rounded-2xl p-6 space-y-4 text-xs num-tabular">
          <h2 className="text-base font-bold text-white">Market Statistics</h2>
          <div className="divide-y divide-gada-border/50 space-y-2.5">
            <div className="flex justify-between pt-2">
              <span className="text-gada-muted">Market Capitalization</span>
              <span className="font-semibold text-white">${(asset.marketCap / 1000000000).toFixed(2)} Billion</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gada-muted">Circulating Supply</span>
              <span className="font-semibold text-white">{asset.circulatingSupply || 'Simulated'}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gada-muted">All-Time High</span>
              <span className="font-semibold text-white">${asset.allTimeHigh?.toLocaleString() || '—'}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gada-muted">Trading Pair</span>
              <span className="font-semibold text-gada-magenta">{asset.symbol}/USDT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
