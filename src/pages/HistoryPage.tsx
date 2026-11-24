import React, { useState } from 'react';
import { useTradingStore } from '../store/tradingStore';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Search, Download, History, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Gift, Wallet } from 'lucide-react';
import { TransactionRecord } from '../types/order';

export const HistoryPage: React.FC = () => {
  const { transactions, clearHistory } = useTradingStore();
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);

  const filtered = transactions.filter((tx) => {
    const matchesFilter = filterType === 'all' || tx.type.includes(filterType);
    const matchesSearch =
      tx.asset.toLowerCase().includes(search.toLowerCase()) ||
      (tx.note && tx.note.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'trade_buy':
        return <ArrowUpRight className="w-4 h-4 text-gada-up" />;
      case 'trade_sell':
        return <ArrowDownRight className="w-4 h-4 text-gada-down" />;
      case 'airdrop':
        return <Gift className="w-4 h-4 text-gada-magenta" />;
      default:
        return <Wallet className="w-4 h-4 text-gada-violet" />;
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Asset', 'Amount', 'Price', 'Total', 'Fee', 'Status', 'Note'];
    const rows = filtered.map((tx) => [
      tx.id,
      new Date(tx.timestamp).toISOString(),
      tx.type,
      tx.asset,
      tx.amount,
      tx.price || '',
      tx.total || '',
      tx.fee || '',
      tx.status,
      tx.note || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gadadex_transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Transaction History
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30">
              SIMULATED LOGS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gada-muted mt-1">
            Complete audit trail of simulated trade executions, order cancellations, and demo deposits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-gada-surface border border-gada-border rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-lg">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-gada-midnight/80 rounded-xl border border-gada-border">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'all'
                ? 'bg-gradient-to-r from-gada-violet to-gada-electric text-white shadow-glow-purple'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            All Activity ({transactions.length})
          </button>
          <button
            onClick={() => setFilterType('trade')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'trade'
                ? 'bg-gradient-to-r from-gada-violet to-gada-electric text-white shadow-glow-purple'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            Trades
          </button>
          <button
            onClick={() => setFilterType('deposit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'deposit'
                ? 'bg-gradient-to-r from-gada-violet to-gada-electric text-white shadow-glow-purple'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            Demo Deposits
          </button>
          <button
            onClick={() => setFilterType('airdrop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'airdrop'
                ? 'bg-gradient-to-r from-gada-violet to-gada-electric text-white shadow-glow-purple'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            Airdrops
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gada-muted" />
          <input
            type="text"
            placeholder="Search asset or note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gada-midnight border border-gada-border rounded-xl text-xs text-white placeholder-gada-muted focus:outline-none focus:border-gada-violet"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gada-surface border border-gada-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left num-tabular">
            <thead>
              <tr className="border-b border-gada-border/40 text-[10px] text-gada-subtle uppercase bg-gada-midnight/40">
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Asset</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Fee</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gada-border/30 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-14 text-center text-gada-muted">
                    No transactions match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className="hover:bg-gada-elevated/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono text-[11px] text-gada-subtle group-hover:text-gada-magenta">
                      #{tx.id.slice(-8)}
                    </td>
                    <td className="py-3 px-4 text-gada-muted">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-bold uppercase text-white">
                        {getIcon(tx.type)}
                        <span>{tx.type.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-gada-magenta">{tx.asset}</td>
                    <td className="py-3 px-4 text-white font-semibold">{tx.amount}</td>
                    <td className="py-3 px-4 text-white">
                      {tx.price ? `$${tx.price.toFixed(tx.price < 10 ? 4 : 2)}` : '—'}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {tx.total ? `$${tx.total.toFixed(2)}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-gada-subtle">
                      {tx.fee ? `$${tx.fee.toFixed(4)}` : '0.00'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tx.status === 'completed'
                            ? 'bg-gada-up/15 text-gada-up border border-gada-up/25'
                            : 'bg-gada-down/15 text-gada-down border border-gada-down/25'
                        }`}
                      >
                        {tx.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gada-subtle text-[11px] max-w-[180px] truncate">
                      {tx.note || 'Simulated Event'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <Modal
          isOpen={!!selectedTx}
          onClose={() => setSelectedTx(null)}
          title="Transaction Details"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs num-tabular">
            <div className="p-3 rounded-xl bg-gada-midnight/80 border border-gada-border space-y-2.5">
              <div className="flex justify-between">
                <span className="text-gada-muted">Transaction ID:</span>
                <span className="font-mono text-white select-all">{selectedTx.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gada-muted">Timestamp:</span>
                <span className="text-white">{new Date(selectedTx.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gada-muted">Type:</span>
                <span className="font-bold text-white uppercase">{selectedTx.type.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gada-muted">Asset:</span>
                <span className="font-bold text-gada-magenta">{selectedTx.asset}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gada-muted">Amount:</span>
                <span className="font-bold text-white">{selectedTx.amount}</span>
              </div>
              {selectedTx.price && (
                <div className="flex justify-between">
                  <span className="text-gada-muted">Price:</span>
                  <span className="font-bold text-white">${selectedTx.price}</span>
                </div>
              )}
              {selectedTx.total && (
                <div className="flex justify-between">
                  <span className="text-gada-muted">Gross Total:</span>
                  <span className="font-bold text-white">${selectedTx.total.toFixed(2)} USDT</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gada-muted">Status:</span>
                <span className="font-bold text-gada-up uppercase">{selectedTx.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gada-muted">Note:</span>
                <span className="text-white">{selectedTx.note || 'None'}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedTx(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
