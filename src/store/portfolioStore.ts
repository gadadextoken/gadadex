import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssetBalance } from '../types/account';

const INITIAL_BALANCES: Record<string, AssetBalance> = {
  USDT: { symbol: 'USDT', name: 'Tether USD', free: 10000, locked: 0, total: 10000 },
  GDT: { symbol: 'GDT', name: 'Gada Token', free: 100, locked: 0, total: 100 },
  BTC: { symbol: 'BTC', name: 'Bitcoin', free: 0, locked: 0, total: 0 },
  ETH: { symbol: 'ETH', name: 'Ethereum', free: 0, locked: 0, total: 0 },
  SOL: { symbol: 'SOL', name: 'Solana', free: 0, locked: 0, total: 0 },
  BNB: { symbol: 'BNB', name: 'BNB', free: 0, locked: 0, total: 0 },
  XRP: { symbol: 'XRP', name: 'XRP', free: 0, locked: 0, total: 0 },
  DOGE: { symbol: 'DOGE', name: 'Dogecoin', free: 0, locked: 0, total: 0 },
};

interface PortfolioState {
  balances: Record<string, AssetBalance>;
  getBalance: (symbol: string) => AssetBalance;
  lockBalance: (symbol: string, amount: number) => boolean;
  unlockBalance: (symbol: string, amount: number) => void;
  executeTrade: (
    baseSymbol: string,
    quoteSymbol: string,
    side: 'buy' | 'sell',
    baseAmount: number,
    quoteTotal: number,
    fee: number
  ) => boolean;
  resetPortfolio: () => void;
  claimFaucet: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      balances: INITIAL_BALANCES,

      getBalance: (symbol: string) => {
        const sym = symbol.toUpperCase();
        return (
          get().balances[sym] || {
            symbol: sym,
            name: sym,
            free: 0,
            locked: 0,
            total: 0,
          }
        );
      },

      lockBalance: (symbol: string, amount: number) => {
        const sym = symbol.toUpperCase();
        const current = get().getBalance(sym);
        if (current.free < amount) return false;

        set((state) => {
          const updated = {
            ...current,
            free: Number((current.free - amount).toFixed(6)),
            locked: Number((current.locked + amount).toFixed(6)),
          };
          return {
            balances: {
              ...state.balances,
              [sym]: updated,
            },
          };
        });
        return true;
      },

      unlockBalance: (symbol: string, amount: number) => {
        const sym = symbol.toUpperCase();
        const current = get().getBalance(sym);
        const unlockedAmount = Math.min(current.locked, amount);

        set((state) => {
          const updated = {
            ...current,
            free: Number((current.free + unlockedAmount).toFixed(6)),
            locked: Number(Math.max(0, current.locked - unlockedAmount).toFixed(6)),
          };
          return {
            balances: {
              ...state.balances,
              [sym]: updated,
            },
          };
        });
      },

      executeTrade: (baseSymbol, quoteSymbol, side, baseAmount, quoteTotal, fee) => {
        const base = baseSymbol.toUpperCase();
        const quote = quoteSymbol.toUpperCase();

        const baseBal = get().getBalance(base);
        const quoteBal = get().getBalance(quote);

        if (side === 'buy') {
          // Paying quote total + fee in USDT, receiving base amount
          const totalCost = quoteTotal + fee;
          if (quoteBal.free < totalCost) return false;

          set((state) => ({
            balances: {
              ...state.balances,
              [quote]: {
                ...quoteBal,
                free: Number((quoteBal.free - totalCost).toFixed(4)),
                total: Number((quoteBal.total - totalCost).toFixed(4)),
              },
              [base]: {
                ...baseBal,
                free: Number((baseBal.free + baseAmount).toFixed(6)),
                total: Number((baseBal.total + baseAmount).toFixed(6)),
              },
            },
          }));
          return true;
        } else {
          // Selling base amount, receiving quote total minus fee
          if (baseBal.free < baseAmount) return false;
          const netProceeds = quoteTotal - fee;

          set((state) => ({
            balances: {
              ...state.balances,
              [base]: {
                ...baseBal,
                free: Number((baseBal.free - baseAmount).toFixed(6)),
                total: Number((baseBal.total - baseAmount).toFixed(6)),
              },
              [quote]: {
                ...quoteBal,
                free: Number((quoteBal.free + netProceeds).toFixed(4)),
                total: Number((quoteBal.total + netProceeds).toFixed(4)),
              },
            },
          }));
          return true;
        }
      },

      resetPortfolio: () => {
        set({ balances: INITIAL_BALANCES });
      },

      claimFaucet: () => {
        set((state) => {
          const usdt = state.balances['USDT'] || INITIAL_BALANCES['USDT'];
          return {
            balances: {
              ...state.balances,
              USDT: {
                ...usdt,
                free: Number((usdt.free + 5000).toFixed(2)),
                total: Number((usdt.total + 5000).toFixed(2)),
              },
            },
          };
        });
      },
    }),
    {
      name: 'gadadex-portfolio-storage',
    }
  )
);
