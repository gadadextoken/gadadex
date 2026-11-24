import { Candle } from '../types/market';

export function generateCandles(
  basePrice: number,
  count: number = 80,
  intervalSeconds: number = 3600
): Candle[] {
  const candles: Candle[] = [];
  const now = Math.floor(Date.now() / 1000);
  const startTime = now - count * intervalSeconds;

  let currentPrice = basePrice * 0.92; // start a bit lower
  const volatility = basePrice * 0.015;

  for (let i = 0; i < count; i++) {
    const time = startTime + i * intervalSeconds;
    const change = (Math.random() - 0.48) * volatility;
    const open = currentPrice;
    const close = Math.max(open * 0.5, open + change);
    const high = Math.max(open, close) + Math.random() * volatility * 0.6;
    const low = Math.min(open, close) - Math.random() * volatility * 0.6;
    const volume = Math.floor(Math.random() * 500 + 50) * (basePrice > 1000 ? 1 : 100);

    candles.push({
      time,
      open: Number(open.toFixed(basePrice < 10 ? 4 : 2)),
      high: Number(high.toFixed(basePrice < 10 ? 4 : 2)),
      low: Number(low.toFixed(basePrice < 10 ? 4 : 2)),
      close: Number(close.toFixed(basePrice < 10 ? 4 : 2)),
      volume,
    });

    currentPrice = close;
  }

  // Ensure last candle is close to current basePrice
  const last = candles[candles.length - 1];
  if (last) {
    last.close = basePrice;
    last.high = Math.max(last.high, basePrice);
    last.low = Math.min(last.low, basePrice);
  }

  return candles;
}

export function getTimeframeSeconds(tf: string): number {
  switch (tf) {
    case '1m': return 60;
    case '5m': return 300;
    case '15m': return 900;
    case '1h': return 3600;
    case '4h': return 14400;
    case '1D': return 86400;
    case '1W': return 604800;
    default: return 3600;
  }
}
