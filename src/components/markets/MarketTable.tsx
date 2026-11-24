import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowUpDown, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MarketAsset } from '../../types/market';
import { Sparkline } from '../common/Sparkline';
import { useWatchlistStore } from '../../store/watchlistStore';

interface MarketTableProps {
  assets: MarketAsset[];
  filterCategory?: 'all' | 'spot' | 'gada';
  limit?: number;
}

type SortField = 'rank' | 'price' | 'change24h' | 'volume24h';
type SortOrder = 'asc' | 'desc';

export const MarketTable: React.FC<MarketTableProps> = ({
  assets,
  filterCategory = 'all',
  limit,
}) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'spot' | 'gada'>(filterCategory);
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const { watchlist, toggleWatchlist, isWatchlisted } = useWatchlistStore();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filter by category and search query
  let filtered = assets.filter((asset) => {
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'spot'
        ? asset.category === 'spot'
        : asset.category === 'gada';

    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Sort
  filtered.sort((a, b) => {
    let comparison = 0;
    if (sortField === 'rank') comparison = a.rank - b.rank;
    else if (sortField === 'price') comparison = a.price - b.price;
    else if (sortField === 'change24h') comparison = a.change24h - b.change24h;
    else if (sortField === 'volume24h') comparison = a.volume24h - b.volume24h;

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <div className="bg-gada-surface border border-gada-border rounded-2xl overflow-hidden shadow-xl">
      {/* Top Controls: Tabs and Search */}
      <div className="p-4 sm:p-5 border-b border-gada-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-gada-elevated/40">
        <div className="flex items-center gap-1.5 p-1 bg-gada-midnight/80 rounded-xl border border-gada-border">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-gada-violet to-gada-electric text-white shadow-glow-purple'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            All Markets ({assets.length})
          </button>
          <button
            onClick={() => setActiveTab('spot')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'spot'
                ? 'bg-gradient-to-r from-gada-violet to-gada-electric text-white shadow-glow-purple'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            Spot
          </button>
          <button
            onClick={() => setActiveTab('gada')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'gada'
                ? 'bg-gradient-to-r from-gada-violet to-gada-electric text-white shadow-glow-purple'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            GADA Ecosystem
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gada-muted" />
          <input
            type="text"
            placeholder="Search coin or symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gada-midnight border border-gada-border rounded-xl text-xs text-white placeholder-gada-muted focus:outline-none focus:border-gada-violet transition-colors"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gada-border text-[11px] font-semibold text-gada-subtle uppercase tracking-wider bg-gada-midnight/40">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4">Market</th>
              <th
                onClick={() => handleSort('price')}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Price (USDT)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('change24h')}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>24h Change</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3.5 px-4 hidden md:table-cell">24h High / Low</th>
              <th
                onClick={() => handleSort('volume24h')}
                className="py-3.5 px-4 hidden lg:table-cell cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>24h Volume</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3.5 px-4 hidden sm:table-cell">24h Trend</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gada-border/50 text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gada-muted text-sm">
                  No digital assets match your filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((asset) => {
                const isUp = asset.change24h >= 0;
                const starActive = isWatchlisted(asset.symbol);

                return (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-gada-elevated/40 transition-colors group"
                  >
                    {/* Star / Watchlist */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleWatchlist(asset.symbol)}
                        className={`p-1 rounded transition-colors ${
                          starActive ? 'text-amber-400' : 'text-gada-subtle hover:text-white'
                        }`}
                        title={starActive ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Star className={`w-4 h-4 ${starActive ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>

                    {/* Market Name & Symbol */}
                    <td className="py-4 px-4">
                      <Link
                        to={`/market/${asset.symbol}`}
                        className="flex items-center gap-3 group-hover:text-gada-magenta transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gada-violet/30 to-gada-surface border border-gada-border flex items-center justify-center font-bold text-xs text-white shadow-inner">
                          {asset.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-gada-magenta">
                            <span>{asset.symbol}</span>
                            <span className="text-[10px] text-gada-muted font-normal">/USDT</span>
                            {asset.category === 'gada' && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-gada-magenta/20 text-gada-magenta font-semibold border border-gada-magenta/30">
                                ECOSYSTEM
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gada-muted">{asset.name}</span>
                        </div>
                      </Link>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-bold text-white num-tabular">
                      ${asset.price.toLocaleString(undefined, {
                        minimumFractionDigits: asset.precision,
                        maximumFractionDigits: asset.precision,
                      })}
                    </td>

                    {/* 24h Change */}
                    <td className="py-4 px-4 num-tabular">
                      <div
                        className={`inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-1 rounded-md ${
                          isUp
                            ? 'bg-gada-up/15 text-gada-up border border-gada-up/25'
                            : 'bg-gada-down/15 text-gada-down border border-gada-down/25'
                        }`}
                      >
                        {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        <span>
                          {isUp ? '+' : ''}
                          {asset.change24h.toFixed(2)}%
                        </span>
                      </div>
                    </td>

                    {/* 24h High / Low */}
                    <td className="py-4 px-4 hidden md:table-cell text-xs num-tabular">
                      <div className="text-gada-muted">
                        H: <span className="text-white">${asset.high24h.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}</span>
                      </div>
                      <div className="text-gada-muted">
                        L: <span className="text-white">${asset.low24h.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}</span>
                      </div>
                    </td>

                    {/* Volume */}
                    <td className="py-4 px-4 hidden lg:table-cell text-xs text-white num-tabular">
                      ${(asset.volume24h * asset.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      <span className="block text-[10px] text-gada-muted">
                        {asset.volume24h.toLocaleString(undefined, { maximumFractionDigits: 1 })} {asset.symbol}
                      </span>
                    </td>

                    {/* Sparkline Trend */}
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <Sparkline data={asset.sparkline} isPositive={isUp} width={100} height={32} />
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/market/${asset.symbol}`}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-gada-muted hover:text-white hover:bg-gada-elevated transition-colors border border-transparent hover:border-gada-border hidden sm:inline-block"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/trade/${asset.symbol}-USDT`}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gada-violet/20 hover:bg-gada-violet text-gada-magenta hover:text-white border border-gada-violet/40 transition-all shadow-glow-purple"
                        >
                          Trade
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
