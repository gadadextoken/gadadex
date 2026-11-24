import React, { useState } from 'react';
import { DollarSign, TrendingUp, Wallet, Lock, RotateCcw, PlusCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface PortfolioSummaryCardsProps {
  totalValue: number;
  pnl24h: number;
  pnlPercent24h: number;
  availableUsdt: number;
  lockedValue: number;
  onReset: () => void;
  onFaucet: () => void;
}

export const PortfolioSummaryCards: React.FC<PortfolioSummaryCardsProps> = ({
  totalValue,
  pnl24h,
  pnlPercent24h,
  availableUsdt,
  lockedValue,
  onReset,
  onFaucet,
}) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const isPositive = pnl24h >= 0;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Asset Value */}
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gada-muted mb-2">
            <span className="font-semibold uppercase tracking-wider">Net Asset Value (Est.)</span>
            <div className="p-2 rounded-xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white num-tabular tracking-tight">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-gada-subtle mt-1 block">Simulated Valuation</span>
        </div>

        {/* 24h PnL */}
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gada-muted mb-2">
            <span className="font-semibold uppercase tracking-wider">24h Simulated PnL</span>
            <div className={`p-2 rounded-xl ${isPositive ? 'bg-gada-up/20 text-gada-up border border-gada-up/30' : 'bg-gada-down/20 text-gada-down border border-gada-down/30'}`}>
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-black num-tabular tracking-tight ${isPositive ? 'text-gada-up' : 'text-gada-down'}`}>
            {isPositive ? '+' : ''}${pnl24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className={`text-[11px] font-semibold num-tabular mt-1 block ${isPositive ? 'text-gada-up' : 'text-gada-down'}`}>
            {isPositive ? '+' : ''}{pnlPercent24h.toFixed(2)}% vs 24h ago
          </span>
        </div>

        {/* Available USDT */}
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gada-muted mb-2">
            <span className="font-semibold uppercase tracking-wider">Available Free Cash</span>
            <div className="p-2 rounded-xl bg-gada-elevated text-gada-muted border border-gada-border">
              <Wallet className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-white num-tabular tracking-tight">
            ${availableUsdt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={onFaucet}
              className="text-[11px] font-semibold text-gada-magenta hover:underline inline-flex items-center gap-1"
            >
              <PlusCircle className="w-3 h-3" />
              Claim +5,000 Faucet
            </button>
          </div>
        </div>

        {/* In Open Orders & Reset */}
        <div className="bg-gada-surface border border-gada-border rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-gada-muted mb-2">
              <span className="font-semibold uppercase tracking-wider">Locked in Orders</span>
              <div className="p-2 rounded-xl bg-gada-elevated text-gada-subtle border border-gada-border">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white num-tabular tracking-tight">
              ${lockedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowResetModal(true)}
              className="text-xs text-gada-muted hover:text-gada-down flex items-center gap-1.5 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Demo Portfolio"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-gada-down/10 border border-gada-down/30 text-xs text-gada-down flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>
              This action will reset your simulated wallet to the default 10,000 USDT and 100 GDT balance. All open orders and holdings will be cleared.
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowResetModal(false)}>
              Keep Portfolio
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onReset();
                setShowResetModal(false);
              }}
            >
              Reset to 10k USDT
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
