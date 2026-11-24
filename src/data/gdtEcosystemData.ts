import whitepaperData from './whitepaper.json';

export interface TokenomicsAllocation {
  id: string;
  name: string;
  percentage: number;
  amount: number; // in billions
  amountFormatted: string;
  color: string;
  description: string;
  vesting?: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'current' | 'upcoming';
  timeline: string;
  items: string[];
}

export interface WhitepaperChapter {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  bullets: Array<{
    heading: string;
    description: string;
  }>;
  callout?: string;
}

export interface EcosystemPlatform {
  name: string;
  domain: string;
  role: string;
  badge: string;
  description: string;
  url: string;
  features: string[];
}

export const GDT_SPECIFICATIONS = {
  name: 'GADA TOKEN',
  symbol: 'GDT',
  network: 'BNB Smart Chain (BEP-20)',
  networkShort: 'BSC BEP-20',
  contractAddress: '0x090458b49D6deAA9F7334a5e628aa26D82A3A082',
  decimals: 18,
  totalSupplyRaw: 50000000000,
  totalSupplyFormatted: '50,000,000,000 GDT',
  tokenType: 'Utility Token',
  mintingPolicy: 'Mathematically Capped (No Hidden Minting)',
  version: 'Version 1.0',
  parentPortal: 'https://gadatoken.com',
  explorerUrl: 'https://bscscan.com/token/0x090458b49D6deAA9F7334a5e628aa26D82A3A082',
  socials: {
    telegram: 'https://t.me/gadachat',
    facebook: 'https://www.facebook.com/share/1E1epkWBcr',
  },
};

export const GDT_TOKENOMICS: TokenomicsAllocation[] = [
  {
    id: 'reserve',
    name: 'Strategic Reserve',
    percentage: 30,
    amount: 15,
    amountFormatted: '15,000,000,000 GDT',
    color: '#8000FF', // Violet
    description: 'Reserved for operational continuity, protocol security, network insurance, and future multi-chain expansion.',
    vesting: 'Multi-year governance locked reserve',
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem & Development',
    percentage: 20,
    amount: 10,
    amountFormatted: '10,000,000,000 GDT',
    color: '#D946FF', // Neon Magenta
    description: 'Dedicated to continuous engineering and scaling of gada.chat, gadavoice.com, Gadadex, and integrated toolkits.',
    vesting: 'Milestone-based release schedule',
  },
  {
    id: 'liquidity',
    name: 'Liquidity & Exchange Listings',
    percentage: 20,
    amount: 10,
    amountFormatted: '10,000,000,000 GDT',
    color: '#06B6D4', // Cyan
    description: 'Provisioned for deep decentralized automated market makers (AMMs) and tier-1 centralized exchange capital requirements.',
    vesting: 'Allocated upon market liquidity activation',
  },
  {
    id: 'team',
    name: 'Team & Advisors',
    percentage: 15,
    amount: 7.5,
    amountFormatted: '7,500,000,000 GDT',
    color: '#EC4899', // Pink
    description: 'Allocated to core architects, security auditors, and technical advisors under strict multi-year linear vesting.',
    vesting: '12-month cliff followed by 36-month linear vesting',
  },
  {
    id: 'banking',
    name: 'Banking & Strategic Partnerships',
    percentage: 10,
    amount: 5,
    amountFormatted: '5,000,000,000 GDT',
    color: '#F59E0B', // Amber
    description: 'Designated for TradFi banking integrations, licensed fiat ramps, merchant settlement pilots, and institutional partners.',
    vesting: 'Partner onboarding milestones',
  },
  {
    id: 'community',
    name: 'Community & Rewards',
    percentage: 5,
    amount: 2.5,
    amountFormatted: '2,500,000,000 GDT',
    color: '#10B981', // Emerald
    description: 'Incentives for platform early adopters, creator micro-rewards, community engagement, and referral bonuses.',
    vesting: 'Ongoing programmatic distribution',
  },
];

export const GDT_ROADMAP: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'Foundation & Genesis',
    subtitle: 'Verified Protocol Launch',
    status: 'current',
    timeline: 'Phase 1 (Active)',
    items: [
      'Smart contract deployment on BNB Smart Chain (BEP-20)',
      'Contract source code verified on BscScan',
      'Official hub launch at gadatoken.com with Whitepaper v1.0',
      'Community governance channels launched on Telegram',
      'Gadadex exchange simulation architecture design and release',
    ],
  },
  {
    phase: 2,
    title: 'Ecosystem Integration',
    subtitle: 'Real App Utility Activation',
    status: 'upcoming',
    timeline: 'Phase 2',
    items: [
      'Native GDT tipping integration inside gada.chat social network',
      'Encrypted voice/video streaming reward system on gadavoice.com',
      'Simulated fee discounts and tier unlocks on Gadadex',
      'Community creator grants and decentralized onboarding',
    ],
  },
  {
    phase: 3,
    title: 'Financial & Banking Bridges',
    subtitle: 'TradFi Interoperability',
    status: 'upcoming',
    timeline: 'Phase 3',
    items: [
      'Strategic bank partnerships & licensed regional payment rails',
      'Frictionless sovereign currency on/off-ramp APIs',
      'Cooperative merchant checkout pilots with gadacoop.org',
      'Institution-grade regulatory compliance and auditable reporting',
    ],
  },
  {
    phase: 4,
    title: 'Market Liquidity & Exchange Expansion',
    subtitle: 'Public Market Velocity',
    status: 'upcoming',
    timeline: 'Phase 4',
    items: [
      'Decentralized Exchange (DEX) deep liquidity pool provisioning',
      'Tier-1 Centralized Exchange (CEX) compliance applications',
      'Gadadex advanced order types and portfolio analytics',
      'Institutional custodial solutions and public proof-of-reserves',
    ],
  },
  {
    phase: 5,
    title: 'Global Scaling & Enterprise Adoption',
    subtitle: 'Worldwide Ecosystem Maturation',
    status: 'upcoming',
    timeline: 'Phase 5',
    items: [
      'Enterprise e-commerce merchant plugins and SDKs',
      'Cross-border regional merchant drives across emerging markets',
      'Next-generation cross-chain interoperability bridges',
      'Decentralized autonomous proposal and voting mechanisms',
    ],
  },
];

export const GADA_ECOSYSTEM_PLATFORMS: EcosystemPlatform[] = [
  {
    name: 'gadatoken.com',
    domain: 'gadatoken.com',
    role: 'Parent Portal & Token Authority',
    badge: 'Official Token Authority',
    description: 'The authoritative central portal for verified GDT contract details, tokenomics distribution, official Whitepaper v1.0, and ecosystem governance.',
    url: 'https://gadatoken.com',
    features: ['Tokenomics Verification', 'Whitepaper v1.0 Access', 'BscScan Contract Links', 'Ecosystem Updates'],
  },
  {
    name: 'Gadadex',
    domain: 'gadadex.pages.dev',
    role: 'Exchange & Trading Simulation',
    badge: 'Exchange Simulation Engine',
    description: 'A high-performance cryptocurrency exchange simulation platform featuring real-time charts, depth books, order execution, and GDT simulated fee tier discounts.',
    url: 'https://gadadex.pages.dev',
    features: ['Simulated Spot Trading', 'Interactive Candlestick Charts', 'Order Book & Depth Visualizer', 'GDT Fee Discount Tier (25%)'],
  },
  {
    name: 'gada.chat',
    domain: 'gada.chat',
    role: 'Decentralized Social & Chat',
    badge: 'Social & Communication',
    description: 'Decentralized social networking and encrypted messaging platform powered by GDT utility for creator tipping and micro-payments.',
    url: 'https://gada.chat',
    features: ['Encrypted Messaging', 'Creator Social Feeds', 'GDT Tipping', 'Community Groups'],
  },
  {
    name: 'gadavoice.com',
    domain: 'gadavoice.com',
    role: 'Voice, Video & Streaming',
    badge: 'Media & Streaming',
    description: 'High-definition encrypted voice/video calling, creator live broadcasting, and virtual community audio rooms with live viewer gifting.',
    url: 'https://gadavoice.com',
    features: ['HD Video Rooms', 'Live Creator Broadcasting', 'Audience Super-Tips', 'Sub-cent Micropayments'],
  },
  {
    name: 'gadacoop.org',
    domain: 'gadacoop.org',
    role: 'Decentralized Commerce & Cooperatives',
    badge: 'Commerce & Marketplace',
    description: 'Decentralized cooperative commerce network enabling peer-to-peer marketplace trade, cooperative rewards, and digital merchandise settlement.',
    url: 'https://gadacoop.org',
    features: ['Peer-to-Peer Marketplace', 'Escrow-backed Checkout', 'Cooperative Incentives', 'Merchant Invoicing'],
  },
];

export const GDT_WHITEPAPER_CHAPTERS = whitepaperData as WhitepaperChapter[];
