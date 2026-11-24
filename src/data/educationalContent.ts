export interface Lesson {
  id: string;
  category: string;
  title: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
  category: 'trading' | 'blockchain' | 'order-types' | 'risk';
}

export const EDUCATIONAL_LESSONS: Lesson[] = [
  {
    id: 'crypto-basics',
    category: 'Crypto Basics',
    title: 'Introduction to Digital Assets & Cryptography',
    readTime: '4 min read',
    summary: 'Understand the origin, mechanics, and purpose of decentralized digital currencies.',
    content: [
      'Cryptocurrency is a form of digital or virtual currency that is secured by cryptography, which makes it nearly impossible to counterfeit or double-spend.',
      'Unlike fiat currencies issued by central banks, many cryptocurrencies are decentralized networks based on blockchain technology—a distributed ledger enforced by a disparate network of computers.',
      'A defining feature of cryptocurrencies is that they are generally not issued by any central authority, rendering them theoretically immune to government interference or manipulation.',
    ],
    keyTakeaways: [
      'Cryptocurrencies leverage cryptographic proofs rather than trusted third parties.',
      'Decentralization reduces single points of failure across financial transactions.',
      'Public ledgers enable transparent, verifiable transaction records.',
    ],
  },
  {
    id: 'blockchain-basics',
    category: 'Blockchain Basics',
    title: 'How Blockchains Work: Consensus & Blocks',
    readTime: '6 min read',
    summary: 'Explore blocks, hashes, mining, staking, and how global networks reach consensus.',
    content: [
      'A blockchain is a growing list of records, called blocks, that are linked securely together using cryptographic hashes.',
      'Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. Because each block contains information about the previous one, they form a chain.',
      'Consensus mechanisms such as Proof of Work (PoW) and Proof of Stake (PoS) guarantee that all participants agree on the validity of transactions without requiring a centralized master ledger.',
    ],
    keyTakeaways: [
      'Immutability: Once data is recorded in a block, altering it requires altering all subsequent blocks.',
      'Consensus algorithms enforce distributed agreement on the state of the network.',
      'Smart contracts automate contract execution when predefined rules are met.',
    ],
  },
  {
    id: 'market-terminology',
    category: 'Market Terminology',
    title: 'Mastering the Order Book, Spread & Liquidity',
    readTime: '5 min read',
    summary: 'Learn what bids, asks, spreads, and market depth represent in high-performance exchanges.',
    content: [
      'The order book is a real-time list of buy orders (bids) and sell orders (asks) organized by price level for a specific trading pair.',
      'The highest price a buyer is willing to pay is the best bid; the lowest price a seller is willing to accept is the best ask. The difference between them is called the "spread".',
      'Liquidity refers to how easily an asset can be converted into ready cash or another asset without affecting its market price. Deep order books have high liquidity, which minimizes slippage.',
    ],
    keyTakeaways: [
      'Bids represent buy interest; Asks represent sell interest.',
      'Spread is the cost of immediate execution across bid/ask boundaries.',
      'Market depth charts visually illustrate supply and demand walls at various price levels.',
    ],
  },
  {
    id: 'understanding-charts',
    category: 'Understanding Charts',
    title: 'Reading Japanese Candlesticks and Trends',
    readTime: '7 min read',
    summary: 'Decode open, high, low, close (OHLC) candles, wicks, volume bars, and support/resistance.',
    content: [
      'Japanese candlesticks provide a visual representation of price action over a given timeframe (e.g. 1m, 1h, 1D).',
      'The wide part of the candle is called the body. It represents the range between opening and closing prices. Green (or hollow) bodies indicate the close was higher than the open (bullish), while red bodies indicate the close was lower (bearish).',
      'The thin lines extending above and below the body are wicks or shadows, representing the session highs and lows.',
    ],
    keyTakeaways: [
      'Candles convey four vital price points: Open, High, Low, and Close.',
      'Long upper or lower shadows reveal rejected price zones and potential reversals.',
      'Volume indicators validate price moves—high volume breakouts are generally more reliable.',
    ],
  },
  {
    id: 'simulated-trading-guide',
    category: 'Simulation Guide',
    title: 'How Gadadex Simulation Mode Works',
    readTime: '3 min read',
    summary: 'A complete walkthrough of paper-trading, risk-free order execution, and virtual balances.',
    content: [
      'Gadadex operates strictly in Simulation Mode. When you register or open a demo account, you receive 10,000 virtual USDT and 100 GDT.',
      'All orders placed in the trading workspace—whether Market or Limit—are executed using the simulated matching engine without risking real fiat currency or crypto assets.',
      'Simulated trading allows you to test exchange mechanics, practice order types, understand slippage, and track portfolio analytics without financial exposure.',
    ],
    keyTakeaways: [
      'No real funds are ever deposited, withdrawn, or risked.',
      'Simulated accounts can be reset to the original 10,000 USDT at any time in Account Settings.',
      'Ideal for learning the interface before interacting with live platforms.',
    ],
  },
  {
    id: 'risk-awareness',
    category: 'Risk Awareness',
    title: 'Understanding Volatility, Slippage & Risk Management',
    readTime: '6 min read',
    summary: 'Essential risk principles: position sizing, stop-loss discipline, and market volatility.',
    content: [
      'Digital asset markets are characterized by substantial volatility, with prices fluctuating rapidly based on market sentiment, macroeconomic news, and liquidity changes.',
      'Risk management is the discipline of protecting your capital. Professional traders never risk more than a small percentage (e.g., 1-2%) of their total portfolio on a single trade.',
      'Always remember that past performance does not guarantee future results, and simulated paper-trading returns may not reflect live market psychological pressures.',
    ],
    keyTakeaways: [
      'Never trade with capital you cannot afford to lose.',
      'Plan your entry, target exit, and invalidation points before opening a position.',
      'Market volatility offers opportunity but necessitates strict discipline.',
    ],
  },
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  { term: 'Ask / Offer', definition: 'The lowest price a seller is willing to accept for an asset.', category: 'trading' },
  { term: 'Bid', definition: 'The highest price a buyer is willing to pay for an asset.', category: 'trading' },
  { term: 'Spread', definition: 'The price gap between the highest bid and lowest ask in the order book.', category: 'trading' },
  { term: 'Market Order', definition: 'An order to immediately buy or sell at the best available current market price.', category: 'order-types' },
  { term: 'Limit Order', definition: 'An order to buy or sell at a specific target price or better.', category: 'order-types' },
  { term: 'Slippage', definition: 'The difference between the expected execution price of an order and the actual price at which it executes.', category: 'trading' },
  { term: 'Order Book', definition: 'An electronic list of buy and sell orders for a specific financial instrument, organized by price level.', category: 'trading' },
  { term: 'Depth Chart', definition: 'A graphical representation of total bids and asks at various price steps.', category: 'trading' },
  { term: 'Candlestick', definition: 'A price chart display showing Open, High, Low, and Close prices for a specific duration.', category: 'trading' },
  { term: 'Paper Trading', definition: 'Simulated trading using virtual funds to practice strategies without risking actual capital.', category: 'risk' },
  { term: 'USDT', definition: 'Tether, a fiat-pegged stablecoin benchmarked 1:1 against the US Dollar.', category: 'blockchain' },
  { term: 'GDT', definition: 'Gada Token, the native ecosystem and utility token of the Gada ecosystem and Gadadex platform.', category: 'blockchain' },
  { term: 'Sats / Satoshi', definition: 'The smallest unit of Bitcoin, equal to 0.00000001 BTC.', category: 'blockchain' },
  { term: 'Smart Contract', definition: 'A self-executing contract whose terms are directly written into code on a blockchain.', category: 'blockchain' },
  { term: 'Stop Loss', definition: 'A pre-set risk control order designed to limit losses by exiting at an invalidation level.', category: 'risk' },
];
