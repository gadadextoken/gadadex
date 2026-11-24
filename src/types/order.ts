export type OrderSide = 'buy' | 'sell';
export type OrderType = 'limit' | 'market';
export type OrderStatus = 'pending' | 'filled' | 'cancelled';

export interface SimulatedOrder {
  id: string;
  pair: string;            // e.g. "BTC/USDT"
  baseSymbol: string;      // e.g. "BTC"
  quoteSymbol: string;     // e.g. "USDT"
  side: OrderSide;
  type: OrderType;
  price: number;           // Target price for limit, or executed price
  amount: number;          // Quantity of base asset
  total: number;           // price * amount in USDT
  fee: number;             // 0.1% simulated fee
  status: OrderStatus;
  createdAt: number;       // timestamp
  filledAt?: number;
}

export interface TransactionRecord {
  id: string;
  timestamp: number;
  type: 'trade_buy' | 'trade_sell' | 'demo_deposit' | 'demo_reset' | 'airdrop';
  asset: string;
  amount: number;
  price?: number;
  total?: number;
  fee?: number;
  status: 'completed' | 'cancelled';
  note?: string;
}
