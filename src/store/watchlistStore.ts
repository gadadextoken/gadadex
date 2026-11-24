import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistState {
  watchlist: string[]; // List of symbols, e.g. ['BTC', 'ETH', 'GDT']
  toggleWatchlist: (symbol: string) => void;
  isWatchlisted: (symbol: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: ['BTC', 'ETH', 'GDT'],

      toggleWatchlist: (symbol: string) => {
        const sym = symbol.toUpperCase();
        set((state) => {
          const exists = state.watchlist.includes(sym);
          return {
            watchlist: exists
              ? state.watchlist.filter((s) => s !== sym)
              : [...state.watchlist, sym],
          };
        });
      },

      isWatchlisted: (symbol: string) => {
        return get().watchlist.includes(symbol.toUpperCase());
      },
    }),
    {
      name: 'gadadex-watchlist-storage',
    }
  )
);
