import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertTriangle, ArrowUpRight, ArrowDownRight, ShieldCheck } from 'lucide-react';
import { OrderSide, OrderType } from '../../types/order';

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pair: string;
  baseSymbol: string;
  quoteSymbol: string;
  side: OrderSide;
  type: OrderType;
  price: number;
  amount: number;
  total: number;
  fee: number;
  precision: number;
}

export const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  pair,
  baseSymbol,
  quoteSymbol,
  side,
  type,
  price,
  amount,
  total,
  fee,
  precision,
}) => {
  const isBuy = side === 'buy';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Simulated Order"
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Simulation Banner Notice */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <span>
            <strong>Simulated Execution Notice:</strong> This is a virtual order. No real cryptocurrency, fiat currency, or exchange balances are used or affected.
          </span>
        </div>

        {/* Order Details Card */}
        <div className="p-4 rounded-xl bg-gada-midnight/80 border border-gada-border space-y-3 text-xs num-tabular">
          <div className="flex items-center justify-between pb-2.5 border-b border-gada-border/60">
            <span className="text-gada-muted">Market Pair</span>
            <span className="font-bold text-white text-sm">{pair}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gada-muted">Order Side</span>
            <span
              className={`font-bold uppercase px-2 py-0.5 rounded text-xs inline-flex items-center gap-1 ${
                isBuy ? 'bg-gada-up/20 text-gada-up' : 'bg-gada-down/20 text-gada-down'
              }`}
            >
              {isBuy ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {side}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gada-muted">Order Type</span>
            <span className="font-semibold text-white uppercase">{type}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gada-muted">Order Price</span>
            <span className="font-bold text-white">
              ${price.toFixed(precision)} {quoteSymbol}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gada-muted">Order Amount</span>
            <span className="font-bold text-white">
              {amount} {baseSymbol}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gada-muted">Simulated Fee (0.1%)</span>
            <span className="text-gada-magenta font-semibold">
              ${fee.toFixed(4)} {quoteSymbol}
            </span>
          </div>

          <div className="pt-2.5 border-t border-gada-border flex items-center justify-between text-sm">
            <span className="font-semibold text-white">Total Estimated</span>
            <span className="font-extrabold text-white">
              ${total.toFixed(2)} {quoteSymbol}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isBuy ? 'buy' : 'sell'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm {side.toUpperCase()}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
