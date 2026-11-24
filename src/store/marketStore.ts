import { create } from 'zustand';
import { INITIAL_ASSETS } from '../data/mockAssets';
import { MarketAsset, OrderBook, RecentTrade } from '../types/market';

interface MarketState {
  assets: MarketAsset[];
  selectedSymbol: string;
  orderBooks: Record<string, OrderBook>;
  recentTrades: Record<string, RecentTrade[]>;
  setSelectedSymbol: (symbol: string) => void;
  updateTick: () => void;
  getAsset: (symbol: string) => MarketAsset | undefined;
}

function generateOrderBook(price: number, precision: number): OrderBook {
  const bids = [];
  const asks = [];
  const step = price * 0.0005;

  let cumBidTotal = 0;
  for (let i = 1; i <= 8; i++) {
    const bidPrice = Number((price - i * step).toFixed(precision));
    const amount = Number((Math.random() * (price > 1000 ? 0.8 : 500) + 0.05).toFixed(4));
    cumBidTotal += bidPrice * amount;
    bids.push({ price: bidPrice, amount, total: Number(cumBidTotal.toFixed(2)) });
  }

  let cumAskTotal = 0;
  for (let i = 1; i <= 8; i++) {
    const askPrice = Number((price + i * step).toFixed(precision));
    const amount = Number((Math.random() * (price > 1000 ? 0.8 : 500) + 0.05).toFixed(4));
    cumAskTotal += askPrice * amount;
    asks.push({ price: askPrice, amount, total: Number(cumAskTotal.toFixed(2)) });
  }

  const spread = Number((asks[0].price - bids[0].price).toFixed(precision));
  const spreadPercent = Number(((spread / price) * 100).toFixed(3));

  return { bids, asks: asks.reverse(), spread, spreadPercent };
}

function generateInitialTrades(price: number, precision: number): RecentTrade[] {
  const trades: RecentTrade[] = [];
  const now = Date.now();
  for (let i = 0; i < 12; i++) {
    const time = new Date(now - i * 4000).toTimeString().split(' ')[0];
    const offset = (Math.random() - 0.5) * price * 0.001;
    const tradePrice = Number((price + offset).toFixed(precision));
    const amount = Number((Math.random() * (price > 1000 ? 0.5 : 300) + 0.01).toFixed(4));
    const side = Math.random() > 0.48 ? 'buy' : 'sell';
    trades.push({
      id: `trade-${now}-${i}`,
      price: tradePrice,
      amount,
      time,
      side,
    });
  }
  return trades;
}

export const useMarketStore = create<MarketState>((set, get) => {
  // Initialize order books and recent trades for each asset
  const initialBooks: Record<string, OrderBook> = {};
  const initialTrades: Record<string, RecentTrade[]> = {};

  INITIAL_ASSETS.forEach((asset) => {
    initialBooks[asset.symbol] = generateOrderBook(asset.price, asset.precision);
    initialTrades[asset.symbol] = generateInitialTrades(asset.price, asset.precision);
  });

  return {
    assets: INITIAL_ASSETS,
    selectedSymbol: 'BTC',
    orderBooks: initialBooks,
    recentTrades: initialTrades,

    setSelectedSymbol: (symbol: string) => {
      const normalized = symbol.toUpperCase();
      if (get().assets.some((a) => a.symbol === normalized)) {
        set({ selectedSymbol: normalized });
      }
    },

    getAsset: (symbol: string) => {
      return get().assets.find((a) => a.symbol.toUpperCase() === symbol.toUpperCase());
    },

    updateTick: () => {
      set((state) => {
        const updatedAssets = state.assets.map((asset) => {
          // Subtle micro-fluctuation between -0.15% and +0.15%
          const pctDelta = (Math.random() - 0.495) * 0.002;
          const newPrice = Number((asset.price * (1 + pctDelta)).toFixed(asset.precision));
          const newHigh = Math.max(asset.high24h, newPrice);
          const newLow = Math.min(asset.low24h, newPrice);
          const newVolume = Number((asset.volume24h + Math.random() * 2).toFixed(2));

          // Shift sparkline
          const updatedSparkline = [...asset.sparkline.slice(1), newPrice];

          return {
            ...asset,
            price: newPrice,
            high24h: newHigh,
            low24h: newLow,
            volume24h: newVolume,
            sparkline: updatedSparkline,
          };
        });

        // Update active symbol order book & recent trades
        const activeSymbol = state.selectedSymbol;
        const currentAsset = updatedAssets.find((a) => a.symbol === activeSymbol) || updatedAssets[0];

        const newBook = generateOrderBook(currentAsset.price, currentAsset.precision);

        // Add a new recent trade
        const now = new Date().toTimeString().split(' ')[0];
        const newTrade: RecentTrade = {
          id: `trade-${Date.now()}`,
          price: currentAsset.price,
          amount: Number((Math.random() * (currentAsset.price > 1000 ? 0.4 : 200) + 0.01).toFixed(4)),
          time: now,
          side: Math.random() > 0.5 ? 'buy' : 'sell',
        };

        const updatedTrades = [newTrade, ...(state.recentTrades[activeSymbol] || []).slice(0, 19)];

        return {
          assets: updatedAssets,
          orderBooks: {
            ...state.orderBooks,
            [activeSymbol]: newBook,
          },
          recentTrades: {
            ...state.recentTrades,
            [activeSymbol]: updatedTrades,
          },
        };
      });
    },
  };
});
