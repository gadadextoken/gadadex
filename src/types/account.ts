export interface AssetBalance {
  symbol: string;
  name: string;
  free: number;       // Available to trade
  locked: number;     // Locked in open limit orders
  total: number;      // free + locked
  usdValue?: number;  // Calculated dynamically
}

export interface DemoProfile {
  id: string;
  username: string;
  email: string;
  avatarSeed: string;
  tier: 'VIP 1 Demo Trader';
  joinedAt: string;
  isSimulated: true;
}

export interface UserPreferences {
  currency: 'USD' | 'EUR' | 'GBP';
  theme: 'dark';
  orderConfirmations: boolean;
  soundEffects: boolean;
  layoutDensity: 'compact' | 'comfortable';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'order_fill' | 'order_cancel' | 'deposit' | 'system';
  timestamp: number;
  read: boolean;
}
