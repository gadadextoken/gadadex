import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { OrderConfirmModal } from './OrderConfirmModal';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useTradingStore } from '../../store/tradingStore';
import { MarketAsset } from '../../types/market';
import { OrderSide, OrderType } from '../../types/order';
import { Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';

interface OrderFormProps {
  asset: MarketAsset;
  selectedPrice?: number;
}

export const OrderForm: React.FC<OrderFormProps> = ({ asset, selectedPrice }) => {
  const [side, setSide] = useState<OrderSide>('buy');
  const [type, setType] = useState<OrderType>('limit');
  const [priceInput, setPriceInput] = useState<string>(asset.price.toString());
  const [amountInput, setAmountInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const { balances } = usePortfolioStore();
  const { placeOrder } = useTradingStore();

  const usdtBalance = balances['USDT']?.free || 0;
  const assetBalance = balances[asset.symbol]?.free || 0;

  // Sync price if selected from order book
  useEffect(() => {
    if (selectedPrice && type === 'limit') {
      setPriceInput(selectedPrice.toString());
    }
  }, [selectedPrice, type]);

  // Sync price on asset change
  useEffect(() => {
    setPriceInput(asset.price.toString());
    setAmountInput('');
    setError(null);
    setSuccessMsg(null);
  }, [asset.symbol]);

  const price = type === 'market' ? asset.price : parseFloat(priceInput) || 0;
  const amount = parseFloat(amountInput) || 0;
  const total = price * amount;
  const fee = total * 0.001; // 0.1% simulated fee

  const handlePercentage = (pct: number) => {
    if (side === 'buy') {
      const maxQuote = usdtBalance * (pct / 100);
      const estAmount = price > 0 ? (maxQuote / price) * 0.999 : 0;
      setAmountInput(estAmount > 0 ? estAmount.toFixed(4) : '');
    } else {
      const maxBase = assetBalance * (pct / 100);
      setAmountInput(maxBase > 0 ? maxBase.toFixed(4) : '');
    }
  };

  const handleValidateAndOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (amount <= 0 || isNaN(amount)) {
      setError('Please specify a valid order amount.');
      return;
    }

    if (type === 'limit' && (price <= 0 || isNaN(price))) {
      setError('Please specify a valid limit price.');
      return;
    }

    if (side === 'buy') {
      const totalCost = total + fee;
      if (totalCost > usdtBalance) {
        setError(`Insufficient USDT. Required: $${totalCost.toFixed(2)}, Available: $${usdtBalance.toFixed(2)}`);
        return;
      }
    } else {
      if (amount > assetBalance) {
        setError(`Insufficient ${asset.symbol}. Required: ${amount}, Available: ${assetBalance}`);
        return;
      }
    }

    setShowConfirm(true);
  };

  const handleExecuteConfirmedOrder = () => {
    const res = placeOrder({
      pair: `${asset.symbol}/USDT`,
      baseSymbol: asset.symbol,
      quoteSymbol: 'USDT',
      side,
      type,
      price,
      amount,
    });

    if (res.success) {
      setSuccessMsg(res.message);
      setAmountInput('');
    } else {
      setError(res.message);
    }
  };

  const isBuy = side === 'buy';

  return (
    <div className="bg-gada-surface rounded-2xl border border-gada-border p-4 shadow-xl flex flex-col justify-between h-full">
      <form onSubmit={handleValidateAndOpenConfirm} className="space-y-4">
        {/* Buy / Sell Tabs */}
        <div className="grid grid-cols-2 p-1 bg-gada-midnight rounded-xl border border-gada-border">
          <button
            type="button"
            onClick={() => {
              setSide('buy');
              setError(null);
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              isBuy
                ? 'bg-gada-up text-gada-midnight shadow-glow-up'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            Buy {asset.symbol}
          </button>
          <button
            type="button"
            onClick={() => {
              setSide('sell');
              setError(null);
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              !isBuy
                ? 'bg-gada-down text-white shadow-glow-down'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            Sell {asset.symbol}
          </button>
        </div>

        {/* Limit / Market Selector */}
        <div className="flex items-center gap-4 text-xs font-semibold border-b border-gada-border/50 pb-2">
          <button
            type="button"
            onClick={() => {
              setType('limit');
              setPriceInput(asset.price.toString());
            }}
            className={`pb-1 transition-colors relative ${
              type === 'limit' ? 'text-white' : 'text-gada-muted hover:text-white'
            }`}
          >
            Limit Order
            {type === 'limit' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gada-magenta" />}
          </button>
          <button
            type="button"
            onClick={() => setType('market')}
            className={`pb-1 transition-colors relative ${
              type === 'market' ? 'text-white' : 'text-gada-muted hover:text-white'
            }`}
          >
            Market Order
            {type === 'market' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gada-magenta" />}
          </button>
        </div>

        {/* Available Balance */}
        <div className="flex items-center justify-between text-xs text-gada-muted num-tabular bg-gada-midnight/60 p-2.5 rounded-xl border border-gada-border">
          <span className="flex items-center gap-1.5 text-gada-subtle">
            <Wallet className="w-3.5 h-3.5 text-gada-magenta" />
            Available
          </span>
          <span className="font-semibold text-white">
            {isBuy
              ? `$${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`
              : `${assetBalance.toFixed(4)} ${asset.symbol}`}
          </span>
        </div>

        {/* Price Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-gada-subtle">
            <span>Price</span>
            <span>USDT</span>
          </div>
          {type === 'limit' ? (
            <input
              type="number"
              step="any"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="w-full px-3 py-2 bg-gada-midnight border border-gada-border rounded-xl text-sm font-semibold text-white num-tabular focus:outline-none focus:border-gada-violet transition-colors"
              placeholder="0.00"
            />
          ) : (
            <div className="w-full px-3 py-2 bg-gada-midnight/50 border border-gada-border rounded-xl text-sm font-semibold text-gada-muted num-tabular flex justify-between items-center">
              <span>Best Market Price</span>
              <span className="text-white">${asset.price.toFixed(asset.precision)}</span>
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-gada-subtle">
            <span>Amount</span>
            <span>{asset.symbol}</span>
          </div>
          <input
            type="number"
            step="any"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            className="w-full px-3 py-2 bg-gada-midnight border border-gada-border rounded-xl text-sm font-semibold text-white num-tabular focus:outline-none focus:border-gada-violet transition-colors"
            placeholder="0.0000"
          />
        </div>

        {/* Percentage Selector Buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handlePercentage(pct)}
              className="py-1 rounded-lg text-[11px] font-bold bg-gada-elevated hover:bg-gada-border text-gada-muted hover:text-white border border-gada-border transition-all"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Order Summary & Fee */}
        <div className="pt-2 border-t border-gada-border/60 space-y-1.5 text-xs num-tabular">
          <div className="flex justify-between text-gada-muted">
            <span>Estimated Total</span>
            <span className="font-bold text-white">${total > 0 ? total.toFixed(2) : '0.00'} USDT</span>
          </div>
          <div className="flex justify-between text-[11px] text-gada-subtle">
            <span>Simulated Fee (0.1%)</span>
            <span className="text-gada-magenta font-semibold">${fee > 0 ? fee.toFixed(4) : '0.0000'} USDT</span>
          </div>
        </div>

        {/* Error / Success Feedback */}
        {error && (
          <div className="p-2.5 rounded-xl bg-gada-down/15 border border-gada-down/30 text-xs text-gada-down flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-2.5 rounded-xl bg-gada-up/15 border border-gada-up/30 text-xs text-gada-up flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant={isBuy ? 'buy' : 'sell'}
          fullWidth
          size="md"
        >
          {isBuy ? `Buy ${asset.symbol}` : `Sell ${asset.symbol}`} (Simulated)
        </Button>
      </form>

      {/* Confirmation Modal */}
      <OrderConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleExecuteConfirmedOrder}
        pair={`${asset.symbol}/USDT`}
        baseSymbol={asset.symbol}
        quoteSymbol="USDT"
        side={side}
        type={type}
        price={price}
        amount={amount}
        total={total}
        fee={fee}
        precision={asset.precision}
      />
    </div>
  );
};
