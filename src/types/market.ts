export interface MarketAsset {
  symbol: string;           // e.g. "BTC"
  name: string;             // e.g. "Bitcoin"
  pair: string;             // e.g. "BTC/USDT"
  category: 'spot' | 'gada';
  price: number;
  change24h: number;        // percentage e.g. 3.45 or -1.20
  high24h: number;
  low24h: number;
  volume24h: number;        // Base asset volume or USDT volume
  marketCap: number;
  precision: number;        // Price decimals e.g. 2 for BTC, 4 for GDT
  sparkline: number[];      // 20-30 data points for mini sparkline
  description: string;
  circulatingSupply?: string;
  allTimeHigh?: number;
  rank: number;
  icon?: string;
}

export interface Candle {
  time: number | string; // unix timestamp in seconds or YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookEntry[]; // Buy orders
  asks: OrderBookEntry[]; // Sell orders
  spread: number;
  spreadPercent: number;
}

export interface RecentTrade {
  id: string;
  price: number;
  amount: number;
  time: string; // HH:mm:ss
  side: 'buy' | 'sell';
}
