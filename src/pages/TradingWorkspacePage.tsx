import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMarketStore } from '../store/marketStore';
import { useTradingStore } from '../store/tradingStore';
import { PairSelector } from '../components/trade/PairSelector';
import { TradingChart } from '../components/trade/TradingChart';
import { OrderBook } from '../components/trade/OrderBook';
import { RecentTrades } from '../components/trade/RecentTrades';
import { OrderForm } from '../components/trade/OrderForm';
import { OrdersTable } from '../components/trade/OrdersTable';
import { ExternalLink, ShieldCheck, Coins } from 'lucide-react';

export const TradingWorkspacePage: React.FC = () => {
  const { pair } = useParams<{ pair: string }>();
  const navigate = useNavigate();

  const { assets, selectedSymbol, setSelectedSymbol, orderBooks, recentTrades, updateTick } =
    useMarketStore();
  const { checkLimitOrders } = useTradingStore();

  const [clickedPrice, setClickedPrice] = useState<number | undefined>(undefined);

  // Sync route param with store
  useEffect(() => {
    if (pair) {
      const symbol = pair.split('-')[0].split('/')[0].toUpperCase();
      setSelectedSymbol(symbol);
    }
  }, [pair, setSelectedSymbol]);

  // Interval simulation tick for live order book and price micro-fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      updateTick();
      const current = useMarketStore.getState().getAsset(selectedSymbol);
      if (current) {
        checkLimitOrders(current.symbol, current.price);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [selectedSymbol, updateTick, checkLimitOrders]);

  const currentAsset = assets.find((a) => a.symbol === selectedSymbol) || assets[0];
  const orderBook = orderBooks[currentAsset.symbol] || orderBooks['BTC'];
  const trades = recentTrades[currentAsset.symbol] || recentTrades['BTC'] || [];

  const handleSelectPair = (sym: string) => {
    setSelectedSymbol(sym);
    navigate(`/trade/${sym}-USDT`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gada-midnight">
      {/* Pair Header & Ticker Bar */}
      <PairSelector
        currentAsset={currentAsset}
        assets={assets}
        onSelect={handleSelectPair}
      />

      {/* GDT Verified Ecosystem Banner */}
      {currentAsset.symbol === 'GDT' && (
        <div className="bg-gradient-to-r from-gada-violet/25 via-gada-surface to-gada-surface border-b border-gada-violet/30 px-4 py-2 flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-gada-magenta/20 text-gada-magenta font-bold text-[10px] border border-gada-magenta/30 flex items-center gap-1">
              <Coins className="w-3 h-3" />
              BNB Smart Chain (BEP-20)
            </span>
            <span className="text-gada-muted hidden sm:inline">
              Contract:{' '}
              <code className="text-white font-mono select-all text-[11px]">
                0x090458b49D6deAA9F7334a5e628aa26D82A3A082
              </code>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://gadatoken.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gada-magenta hover:underline font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>gadatoken.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link to="/gdt" className="text-white hover:text-gada-magenta text-[11px] font-medium">
              Ecosystem & Tokenomics &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Main Exchange Workspace Layout */}
      <div className="flex-1 p-2 sm:p-3 space-y-2 sm:space-y-3">
        {/* Upper Workspace Grid: Chart, OrderBook, RecentTrades, OrderForm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3">
          {/* Main Chart Area (7 Cols) */}
          <div className="lg:col-span-7 h-[460px] xl:h-[500px]">
            <TradingChart
              symbol={currentAsset.symbol}
              basePrice={currentAsset.price}
              precision={currentAsset.precision}
            />
          </div>

          {/* Center Book & Trades (2.5 Cols) */}
          <div className="lg:col-span-2.5 grid grid-rows-2 gap-2 sm:gap-3 h-[460px] xl:h-[500px]">
            <div className="h-full overflow-hidden">
              <OrderBook
                orderBook={orderBook}
                precision={currentAsset.precision}
                onSelectPrice={(p) => setClickedPrice(p)}
              />
            </div>
            <div className="h-full overflow-hidden">
              <RecentTrades trades={trades} precision={currentAsset.precision} />
            </div>
          </div>

          {/* Order Placement Panel (2.5 Cols) */}
          <div className="lg:col-span-2.5 h-[460px] xl:h-[500px]">
            <OrderForm asset={currentAsset} selectedPrice={clickedPrice} />
          </div>
        </div>

        {/* Lower Workspace Area: Orders, Fills, Balances */}
        <div className="w-full">
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};
