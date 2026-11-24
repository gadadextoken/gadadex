import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarketStore } from '../store/marketStore';
import { useTradingStore } from '../store/tradingStore';
import { PairSelector } from '../components/trade/PairSelector';
import { TradingChart } from '../components/trade/TradingChart';
import { OrderBook } from '../components/trade/OrderBook';
import { RecentTrades } from '../components/trade/RecentTrades';
import { OrderForm } from '../components/trade/OrderForm';
import { OrdersTable } from '../components/trade/OrdersTable';

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
