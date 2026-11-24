import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchlistStore } from '../store/watchlistStore';
import { useMarketStore } from '../store/marketStore';
import { Sparkline } from '../components/common/Sparkline';
import { Button } from '../components/common/Button';
import { Star, ArrowRight, ArrowUpRight, ArrowDownRight, Compass } from 'lucide-react';

export const WatchlistPage: React.FC = () => {
  const { watchlist, toggleWatchlist } = useWatchlistStore();
  const { assets } = useMarketStore();

  const watchlistedAssets = assets.filter((a) => watchlist.includes(a.symbol));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Your Watchlist
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gada-violet/20 text-gada-magenta font-semibold border border-gada-violet/30">
              {watchlistedAssets.length} Saved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gada-muted mt-1">
            Pin and monitor your favorite simulated trading pairs with quick execution access.
          </p>
        </div>

        <Link to="/markets">
          <Button variant="secondary" size="sm">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover More Markets</span>
          </Button>
        </Link>
      </div>

      {watchlistedAssets.length === 0 ? (
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gada-elevated border border-gada-border flex items-center justify-center mx-auto text-amber-400">
            <Star className="w-8 h-8 opacity-40" />
          </div>
          <h2 className="text-lg font-bold text-white">Your watchlist is currently empty</h2>
          <p className="text-xs sm:text-sm text-gada-muted max-w-md mx-auto">
            Click the star icon next to any asset on the Markets page or Trading workspace to pin it here for rapid monitoring.
          </p>
          <Link to="/markets">
            <Button variant="primary" size="md">
              Browse Markets
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlistedAssets.map((asset) => {
            const isUp = asset.change24h >= 0;
            return (
              <div
                key={asset.symbol}
                className="bg-gada-surface border border-gada-border hover:border-gada-violet/40 rounded-2xl p-5 shadow-xl transition-all group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gada-violet/30 to-gada-surface border border-gada-border flex items-center justify-center font-bold text-sm text-white">
                      {asset.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/market/${asset.symbol}`}
                          className="font-bold text-white group-hover:text-gada-magenta transition-colors"
                        >
                          {asset.symbol}/USDT
                        </Link>
                      </div>
                      <span className="text-xs text-gada-muted">{asset.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleWatchlist(asset.symbol)}
                    className="p-1.5 rounded-lg text-amber-400 hover:text-white hover:bg-gada-elevated transition-colors"
                    title="Remove from Watchlist"
                  >
                    <Star className="w-4 h-4 fill-amber-400" />
                  </button>
                </div>

                <div className="flex items-end justify-between num-tabular">
                  <div>
                    <span className="text-[10px] text-gada-subtle uppercase block font-medium">Last Price</span>
                    <span className="text-xl font-black text-white">
                      ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.precision })}
                    </span>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-1 rounded-md ${
                      isUp ? 'bg-gada-up/15 text-gada-up' : 'bg-gada-down/15 text-gada-down'
                    }`}
                  >
                    {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{isUp ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gada-border/50 flex items-center justify-between">
                  <Sparkline data={asset.sparkline} isPositive={isUp} width={110} height={30} />
                  <Link to={`/trade/${asset.symbol}-USDT`}>
                    <Button variant="buy" size="sm">
                      Trade
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
