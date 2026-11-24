import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import { generateCandles, getTimeframeSeconds } from '../../data/mockCandles';
import { BarChart3, Clock, Maximize2 } from 'lucide-react';

interface TradingChartProps {
  symbol: string;
  basePrice: number;
  precision: number;
}

export const TradingChart: React.FC<TradingChartProps> = ({ symbol, basePrice, precision }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  const [timeframe, setTimeframe] = useState<string>('1h');
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight || 420,
      layout: {
        background: { color: '#10091E' },
        textColor: '#A6A0B4',
        fontSize: 11,
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        vertLines: { color: '#1F1730' },
        horzLines: { color: '#1F1730' },
      },
      crosshair: {
        vertLine: {
          color: '#8000FF',
          width: 1,
          style: 3,
          labelBackgroundColor: '#24005E',
        },
        horzLine: {
          color: '#8000FF',
          width: 1,
          style: 3,
          labelBackgroundColor: '#24005E',
        },
      },
      rightPriceScale: {
        borderColor: '#2A2238',
        scaleMargins: {
          top: 0.1,
          bottom: 0.25,
        },
      },
      timeScale: {
        borderColor: '#2A2238',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#0ECB81',
      downColor: '#F6465D',
      borderVisible: false,
      wickUpColor: '#0ECB81',
      wickDownColor: '#F6465D',
      priceFormat: {
        type: 'price',
        precision: precision,
        minMove: 1 / Math.pow(10, precision),
      },
    });

    // Add volume histogram series
    const volumeSeries = chart.addHistogramSeries({
      color: '#8000FF',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // set as an overlay by setting a blank priceScaleId
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [precision]);

  // Load candle data when timeframe, symbol, or basePrice changes
  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;

    const intervalSec = getTimeframeSeconds(timeframe);
    const mockCandles = generateCandles(basePrice, 90, intervalSec);

    const candleData: CandlestickData[] = mockCandles.map((c) => ({
      time: c.time as Time,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    const volumeData = mockCandles.map((c) => ({
      time: c.time as Time,
      value: c.volume,
      color: c.close >= c.open ? 'rgba(14, 203, 129, 0.4)' : 'rgba(246, 70, 93, 0.4)',
    }));

    candleSeriesRef.current.setData(candleData);
    volumeSeriesRef.current.setData(volumeData);

    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [symbol, timeframe, basePrice]);

  return (
    <div className="flex flex-col h-full bg-gada-midnight rounded-2xl border border-gada-border overflow-hidden">
      {/* Chart Toolbar */}
      <div className="px-4 py-2.5 border-b border-gada-border bg-gada-surface/80 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-gada-subtle mr-1.5" />
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-gada-violet/30 text-gada-magenta border border-gada-violet/50 shadow-glow-purple'
                  : 'text-gada-muted hover:text-white hover:bg-gada-elevated'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gada-muted">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gada-elevated text-gada-muted border border-gada-border">
            <span className="w-2 h-2 rounded-full bg-gada-up animate-pulse" />
            <span className="text-[11px] font-medium">Simulated Data Stream</span>
          </div>
          <button
            onClick={() => chartRef.current?.timeScale().fitContent()}
            className="p-1.5 rounded-lg hover:bg-gada-elevated text-gada-muted hover:text-white transition-colors"
            title="Reset Chart View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={chartContainerRef} className="flex-1 w-full min-h-[380px]" />
    </div>
  );
};
