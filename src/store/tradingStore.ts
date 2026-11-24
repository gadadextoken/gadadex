import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SimulatedOrder, TransactionRecord, OrderSide, OrderType } from '../types/order';
import { usePortfolioStore } from './portfolioStore';
import { useNotificationStore } from './notificationStore';

interface PlaceOrderParams {
  pair: string;
  baseSymbol: string;
  quoteSymbol: string;
  side: OrderSide;
  type: OrderType;
  price: number;
  amount: number;
}

interface TradingState {
  openOrders: SimulatedOrder[];
  orderHistory: SimulatedOrder[];
  transactions: TransactionRecord[];
  placeOrder: (params: PlaceOrderParams) => { success: boolean; message: string };
  cancelOrder: (orderId: string) => boolean;
  checkLimitOrders: (symbol: string, currentPrice: number) => void;
  clearHistory: () => void;
}

export const useTradingStore = create<TradingState>()(
  persist(
    (set, get) => ({
      openOrders: [],
      orderHistory: [],
      transactions: [
        {
          id: 'tx-init-1',
          timestamp: Date.now() - 3600000,
          type: 'demo_deposit',
          asset: 'USDT',
          amount: 10000,
          status: 'completed',
          note: 'Initial Demo Balance Credited',
        },
        {
          id: 'tx-init-2',
          timestamp: Date.now() - 3590000,
          type: 'airdrop',
          asset: 'GDT',
          amount: 100,
          status: 'completed',
          note: 'Gada Token Starter Ecosystem Bonus',
        },
      ],

      placeOrder: (params) => {
        const { pair, baseSymbol, quoteSymbol, side, type, price, amount } = params;
        const total = price * amount;
        const fee = Number((total * 0.001).toFixed(4)); // 0.1% simulated fee
        const portfolio = usePortfolioStore.getState();

        if (amount <= 0 || price <= 0) {
          return { success: false, message: 'Invalid order quantity or price.' };
        }

        const orderId = `ord-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const now = Date.now();

        if (type === 'market') {
          // Market order: immediate execution
          const executed = portfolio.executeTrade(
            baseSymbol,
            quoteSymbol,
            side,
            amount,
            total,
            fee
          );

          if (!executed) {
            return {
              success: false,
              message: `Insufficient ${side === 'buy' ? quoteSymbol : baseSymbol} available balance.`,
            };
          }

          const order: SimulatedOrder = {
            id: orderId,
            pair,
            baseSymbol,
            quoteSymbol,
            side,
            type: 'market',
            price,
            amount,
            total,
            fee,
            status: 'filled',
            createdAt: now,
            filledAt: now,
          };

          const tx: TransactionRecord = {
            id: `tx-${now}-${Math.random().toString(36).substring(2, 5)}`,
            timestamp: now,
            type: side === 'buy' ? 'trade_buy' : 'trade_sell',
            asset: baseSymbol,
            amount,
            price,
            total,
            fee,
            status: 'completed',
            note: `Simulated Market ${side.toUpperCase()} ${amount} ${baseSymbol} @ ${price} ${quoteSymbol}`,
          };

          set((state) => ({
            orderHistory: [order, ...state.orderHistory],
            transactions: [tx, ...state.transactions],
          }));

          useNotificationStore
            .getState()
            .addNotification(
              `Order Filled: ${side.toUpperCase()} ${amount} ${baseSymbol}`,
              `Successfully executed simulated market order at ${price} ${quoteSymbol}.`,
              'order_fill'
            );

          return { success: true, message: `Market order executed successfully!` };
        } else {
          // Limit order: lock funds first
          const lockAsset = side === 'buy' ? quoteSymbol : baseSymbol;
          const lockAmount = side === 'buy' ? total + fee : amount;

          const locked = portfolio.lockBalance(lockAsset, lockAmount);
          if (!locked) {
            return {
              success: false,
              message: `Insufficient ${lockAsset} to place limit order.`,
            };
          }

          const limitOrder: SimulatedOrder = {
            id: orderId,
            pair,
            baseSymbol,
            quoteSymbol,
            side,
            type: 'limit',
            price,
            amount,
            total,
            fee,
            status: 'pending',
            createdAt: now,
          };

          set((state) => ({
            openOrders: [limitOrder, ...state.openOrders],
          }));

          useNotificationStore
            .getState()
            .addNotification(
              `Limit Order Placed: ${side.toUpperCase()} ${baseSymbol}`,
              `Submitted simulated limit order for ${amount} ${baseSymbol} at ${price} ${quoteSymbol}.`,
              'system'
            );

          return { success: true, message: `Limit order placed in open orders.` };
        }
      },

      cancelOrder: (orderId: string) => {
        const order = get().openOrders.find((o) => o.id === orderId);
        if (!order) return false;

        const portfolio = usePortfolioStore.getState();
        const unlockAsset = order.side === 'buy' ? order.quoteSymbol : order.baseSymbol;
        const unlockAmount = order.side === 'buy' ? order.total + order.fee : order.amount;

        portfolio.unlockBalance(unlockAsset, unlockAmount);

        const cancelledOrder: SimulatedOrder = {
          ...order,
          status: 'cancelled',
        };

        const tx: TransactionRecord = {
          id: `tx-cancel-${Date.now()}`,
          timestamp: Date.now(),
          type: order.side === 'buy' ? 'trade_buy' : 'trade_sell',
          asset: order.baseSymbol,
          amount: order.amount,
          status: 'cancelled',
          note: `Cancelled Limit ${order.side.toUpperCase()} ${order.amount} ${order.baseSymbol}`,
        };

        set((state) => ({
          openOrders: state.openOrders.filter((o) => o.id !== orderId),
          orderHistory: [cancelledOrder, ...state.orderHistory],
          transactions: [tx, ...state.transactions],
        }));

        useNotificationStore
          .getState()
          .addNotification(
            `Order Cancelled: ${order.side.toUpperCase()} ${order.baseSymbol}`,
            `Limit order #${order.id.slice(-6)} has been cancelled. Funds returned.`,
            'order_cancel'
          );

        return true;
      },

      checkLimitOrders: (symbol: string, currentPrice: number) => {
        const orders = get().openOrders;
        const matching = orders.filter((o) => o.baseSymbol === symbol);
        if (matching.length === 0) return;

        matching.forEach((order) => {
          let shouldFill = false;
          if (order.side === 'buy' && currentPrice <= order.price) {
            shouldFill = true;
          } else if (order.side === 'sell' && currentPrice >= order.price) {
            shouldFill = true;
          }

          if (shouldFill) {
            const portfolio = usePortfolioStore.getState();
            const unlockAsset = order.side === 'buy' ? order.quoteSymbol : order.baseSymbol;
            const unlockAmount = order.side === 'buy' ? order.total + order.fee : order.amount;

            // Unlock the locked funds first so executeTrade can deduct them cleanly
            portfolio.unlockBalance(unlockAsset, unlockAmount);
            portfolio.executeTrade(
              order.baseSymbol,
              order.quoteSymbol,
              order.side,
              order.amount,
              order.total,
              order.fee
            );

            const now = Date.now();
            const filled: SimulatedOrder = {
              ...order,
              status: 'filled',
              filledAt: now,
            };

            const tx: TransactionRecord = {
              id: `tx-${now}-${Math.random().toString(36).substring(2, 5)}`,
              timestamp: now,
              type: order.side === 'buy' ? 'trade_buy' : 'trade_sell',
              asset: order.baseSymbol,
              amount: order.amount,
              price: order.price,
              total: order.total,
              fee: order.fee,
              status: 'completed',
              note: `Simulated Limit ${order.side.toUpperCase()} Filled @ ${order.price}`,
            };

            set((state) => ({
              openOrders: state.openOrders.filter((o) => o.id !== order.id),
              orderHistory: [filled, ...state.orderHistory],
              transactions: [tx, ...state.transactions],
            }));

            useNotificationStore
              .getState()
              .addNotification(
                `Limit Order Filled: ${order.side.toUpperCase()} ${order.amount} ${order.baseSymbol}`,
                `Your limit order at ${order.price} ${order.quoteSymbol} was reached and executed.`,
                'order_fill'
              );
          }
        });
      },

      clearHistory: () => {
        set({ orderHistory: [], transactions: [] });
      },
    }),
    {
      name: 'gadadex-trading-storage',
    }
  )
);
