import React, { useState } from 'react';
import { useTradingStore } from '../../store/tradingStore';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Trash2, CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const OrdersTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'orders' | 'trades' | 'balances'>('open');

  const { openOrders, orderHistory, transactions, cancelOrder } = useTradingStore();
  const { balances } = usePortfolioStore();

  const balanceList = Object.values(balances).filter((b) => b.total > 0);

  return (
    <div className="bg-gada-surface rounded-2xl border border-gada-border overflow-hidden text-xs">
      {/* Tab Navigation */}
      <div className="px-4 border-b border-gada-border flex items-center justify-between bg-gada-elevated/40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('open')}
            className={`py-3 px-3 font-semibold text-xs border-b-2 transition-colors relative ${
              activeTab === 'open'
                ? 'border-gada-magenta text-white'
                : 'border-transparent text-gada-muted hover:text-white'
            }`}
          >
            <span>Open Orders</span>
            {openOrders.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-gada-violet/30 text-gada-magenta text-[10px]">
                {openOrders.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 font-semibold text-xs border-b-2 transition-colors relative ${
              activeTab === 'orders'
                ? 'border-gada-magenta text-white'
                : 'border-transparent text-gada-muted hover:text-white'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            className={`py-3 px-3 font-semibold text-xs border-b-2 transition-colors relative ${
              activeTab === 'trades'
                ? 'border-gada-magenta text-white'
                : 'border-transparent text-gada-muted hover:text-white'
            }`}
          >
            Trade History
          </button>
          <button
            onClick={() => setActiveTab('balances')}
            className={`py-3 px-3 font-semibold text-xs border-b-2 transition-colors relative ${
              activeTab === 'balances'
                ? 'border-gada-magenta text-white'
                : 'border-transparent text-gada-muted hover:text-white'
            }`}
          >
            Demo Balances
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="overflow-x-auto min-h-[160px] max-h-64 overflow-y-auto">
        {/* Open Orders Tab */}
        {activeTab === 'open' && (
          <table className="w-full text-left num-tabular">
            <thead>
              <tr className="border-b border-gada-border/40 text-[10px] text-gada-subtle uppercase bg-gada-midnight/30">
                <th className="py-2.5 px-4">Time</th>
                <th className="py-2.5 px-4">Pair</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Side</th>
                <th className="py-2.5 px-4">Price</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Total</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gada-border/30">
              {openOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gada-muted">
                    No active limit orders.
                  </td>
                </tr>
              ) : (
                openOrders.map((order) => {
                  const isBuy = order.side === 'buy';
                  return (
                    <tr key={order.id} className="hover:bg-gada-elevated/40 transition-colors">
                      <td className="py-2.5 px-4 text-gada-muted">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-white">{order.pair}</td>
                      <td className="py-2.5 px-4 uppercase text-gada-subtle">{order.type}</td>
                      <td className="py-2.5 px-4">
                        <span className={`font-bold uppercase ${isBuy ? 'text-gada-up' : 'text-gada-down'}`}>
                          {order.side}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-white">${order.price.toFixed(2)}</td>
                      <td className="py-2.5 px-4 text-white">{order.amount}</td>
                      <td className="py-2.5 px-4 text-white">${order.total.toFixed(2)}</td>
                      <td className="py-2.5 px-4 text-right">
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-2 py-1 rounded bg-gada-down/15 hover:bg-gada-down/25 text-gada-down transition-colors font-semibold text-[11px]"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Order History Tab */}
        {activeTab === 'orders' && (
          <table className="w-full text-left num-tabular">
            <thead>
              <tr className="border-b border-gada-border/40 text-[10px] text-gada-subtle uppercase bg-gada-midnight/30">
                <th className="py-2.5 px-4">Time</th>
                <th className="py-2.5 px-4">Pair</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Side</th>
                <th className="py-2.5 px-4">Executed Price</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Total</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gada-border/30">
              {orderHistory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gada-muted">
                    No order history yet.
                  </td>
                </tr>
              ) : (
                orderHistory.map((order) => {
                  const isBuy = order.side === 'buy';
                  const isFilled = order.status === 'filled';
                  return (
                    <tr key={order.id} className="hover:bg-gada-elevated/40 transition-colors">
                      <td className="py-2.5 px-4 text-gada-muted">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-white">{order.pair}</td>
                      <td className="py-2.5 px-4 uppercase text-gada-subtle">{order.type}</td>
                      <td className="py-2.5 px-4">
                        <span className={`font-bold uppercase ${isBuy ? 'text-gada-up' : 'text-gada-down'}`}>
                          {order.side}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-white">${order.price.toFixed(2)}</td>
                      <td className="py-2.5 px-4 text-white">{order.amount}</td>
                      <td className="py-2.5 px-4 text-white">${order.total.toFixed(2)}</td>
                      <td className="py-2.5 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            isFilled ? 'bg-gada-up/15 text-gada-up' : 'bg-gada-down/15 text-gada-down'
                          }`}
                        >
                          {isFilled ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Trade History Tab */}
        {activeTab === 'trades' && (
          <table className="w-full text-left num-tabular">
            <thead>
              <tr className="border-b border-gada-border/40 text-[10px] text-gada-subtle uppercase bg-gada-midnight/30">
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Asset</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Price</th>
                <th className="py-2.5 px-4">Total</th>
                <th className="py-2.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gada-border/30">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gada-muted">
                    No transactions recorded.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gada-elevated/40 transition-colors">
                    <td className="py-2.5 px-4 text-gada-muted">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 font-bold uppercase text-white">
                      {tx.type.replace('_', ' ')}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-gada-magenta">{tx.asset}</td>
                    <td className="py-2.5 px-4 text-white">{tx.amount}</td>
                    <td className="py-2.5 px-4 text-white">{tx.price ? `$${tx.price.toFixed(2)}` : '—'}</td>
                    <td className="py-2.5 px-4 text-white">{tx.total ? `$${tx.total.toFixed(2)}` : '—'}</td>
                    <td className="py-2.5 px-4 text-right text-gada-muted">{tx.note || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Balances Tab */}
        {activeTab === 'balances' && (
          <table className="w-full text-left num-tabular">
            <thead>
              <tr className="border-b border-gada-border/40 text-[10px] text-gada-subtle uppercase bg-gada-midnight/30">
                <th className="py-2.5 px-4">Asset</th>
                <th className="py-2.5 px-4">Name</th>
                <th className="py-2.5 px-4">Available Free</th>
                <th className="py-2.5 px-4">In Orders (Locked)</th>
                <th className="py-2.5 px-4 text-right">Total Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gada-border/30">
              {balanceList.map((bal) => (
                <tr key={bal.symbol} className="hover:bg-gada-elevated/40 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">{bal.symbol}</td>
                  <td className="py-2.5 px-4 text-gada-muted">{bal.name}</td>
                  <td className="py-2.5 px-4 text-gada-up font-semibold">{bal.free.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-gada-subtle">{bal.locked.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-white">{bal.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
