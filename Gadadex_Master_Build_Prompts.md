# Gadadex — Master Build Prompts

This file contains two prompts for building **Gadadex**, a crypto-exchange-style simulation application with a distinct Gada brand identity.

> **Scope:** These prompts describe a simulated/paper-trading prototype. They do not authorize or specify real-money trading, custody, deposits, withdrawals, real order execution, or leverage.

---

# Prompt 1 — Gadadex Master Project Specification

Act as a senior product designer, fintech UI/UX architect, full-stack software engineer, database architect, cybersecurity engineer, and QA engineer.

Your task is to build **GADADEX**, a modern, sophisticated cryptocurrency exchange-style web application inspired by the user experience, functional organization, information density, and interface sophistication of leading platforms such as Bybit.

Do not create a generic crypto landing page. Build a comprehensive, polished, interactive exchange-style application with realistic navigation, simulated trading functionality, market data presentation, account interfaces, portfolio dashboards, and a cohesive design system.

The product must have its own identity. Do not copy Bybit's logos, trademarks, proprietary assets, exact layouts, or brand identity. Use Bybit as a functional and UX reference for the quality, depth, and organization expected of a professional exchange platform.

The platform name is **GADADEX**.
The parent ecosystem is **GADA**.
The ecosystem token is **GADA TOKEN (GDT)**.

The first release must operate in simulation mode. All trading operations, balances, orders, portfolio holdings and transaction histories must be simulated. Do not connect to real cryptocurrency exchanges for order execution. Do not enable deposits, withdrawals, custody of assets, real-money trading, real leverage or real financial transactions.

## 1. Product vision

Build Gadadex as a modern digital-asset exchange-style platform with the appearance and usability of a sophisticated crypto trading platform.

The platform should feel professional, modern, fast, reliable, responsive, data-driven, intuitive, premium and technologically advanced.

Prioritize desktop while making the application fully responsive and usable on mobile and tablet.

## 2. Brand identity and design system

Use the approved Gadadex brand identity consistently.

### Approved app icon reference
- Rounded-square icon.
- Deep purple gradient background.
- Bold, angular white G symbol.
- Purple-to-magenta accent cuts and movement motif.
- Minimal glossy layered curves.
- Premium, modern fintech appearance.
- Clean geometric composition.

Do not redesign, replace, simplify or reinterpret the approved symbol. When the original icon asset is provided, use that asset rather than generating a different logo.

### Approved wordmark
- GADA in white.
- DEX in violet-to-magenta.
- Futuristic geometric lettering.
- Clean, bold, modern typography.

Maintain consistent brand usage.

### Working colour palette
- Primary deep purple: `#24005E`
- Midnight background: `#10091E`
- Dark surface: `#171124`
- Violet: `#8000FF`
- Electric purple: `#A020F0`
- Magenta: `#D946FF`
- White: `#FFFFFF`
- Muted text: `#A6A0B4`
- Border: `#2A2238`

These are working colour approximations based on the original Gada branding.

Use a dark theme. Use purple and magenta primarily for brand identity, active states, highlights, selected navigation, buttons and visual accents. Avoid excessive neon effects and ensure the interface is comfortable for extended use.

### Typography
Use a professional modern sans-serif font such as Inter, Manrope or Geist. Maintain consistent typography scales, font weights, spacing and hierarchy. Use tabular numerals for prices, balances, percentages and quantities where practical.

## 3. Platform architecture and navigation

Create a structured application with:
- Markets
- Trade
- Portfolio
- Watchlist
- Learn
- Account
- Notifications

### Desktop navigation
Include the Gadadex logo and wordmark, Markets, Trade, Portfolio, Watchlist, Learn, Account, Notifications, theme controls where appropriate, and a user profile menu.

### Markets
- Overview
- Spot Markets
- Market Detail
- Top Movers
- Watchlist

### Trade
- Trading Workspace
- Simulated Spot Trading

### Portfolio
- Portfolio Overview
- Assets
- Order History
- Transaction History

### Learn
- Market Basics
- Crypto Glossary
- Platform Tutorials
- Simulation Guide
- Risk Awareness

### Account
- Profile
- Preferences
- Security UI demonstration
- Activity Log
- Demo Account Settings

All navigation items must lead to working pages or meaningful interfaces. Do not leave dead links or empty pages.

## 4. Landing page

Create a sophisticated exchange homepage.

### Header
Include Gadadex logo, Markets, Trade, Portfolio, Learn, demo account entry, login UI and user menu where appropriate.

### Hero
Headline: **“Explore the Digital Asset Market.”**

Subheadline: **“Discover digital assets, explore market movements and experience a modern trading interface in simulation mode.”**

Primary CTA: **“Explore Markets”**
Secondary CTA: **“Open Demo”**

Use a sophisticated purple visual background with restrained gradients, abstract digital elements, floating data cards or subtle motion. Avoid excessive decoration.

### Market overview
Display clearly identified simulated/sample values for:
- Total market capitalization
- Market activity indicator
- Bitcoin price
- Ethereum price
- Market movement
- Number of listed assets

Do not represent fabricated values as verified real market statistics.

### Featured markets
Display a responsive grid or horizontally scrollable row of popular assets such as BTC, ETH, SOL, XRP, BNB, DOGE and GDT. Cards should include asset icon, name, symbol, price, change percentage and mini chart.

### Market movers
Create Top Gainers, Top Losers and Most Viewed sections using clearly labelled simulated data.

### GDT feature
Include Gada Token (GDT) with icon, name, symbol, sample price, sample market activity and ecosystem overview. Do not imply it is listed, liquid, investable, tradable or backed by a real market unless verified information has been provided.

### Platform features
Introduce market exploration, interactive charts, watchlists, simulated trading, portfolio tracking and market education.

### Footer
Include About Gadadex, Platform, Learn, Privacy, Terms, Risk Disclosure, Contact and social-media placeholders.

## 5. Markets page

Build a complete market exploration interface with tabs:
- All Assets
- Spot
- GDT Ecosystem

The market table should display:
- Asset
- Symbol
- Price
- 24-hour change
- 24-hour high
- 24-hour low
- Volume
- Market capitalization where available
- Mini chart
- View Details action

Implement sorting by price, percentage change and volume; search; asset filtering; pagination or progressive loading; watchlist selection; and responsive table layouts. Provide a mobile-friendly alternative to wide tables.

Search by asset name or symbol and update results immediately.

Clearly identify mock data. If public data is used, identify its source and timestamp where practical.

## 6. Asset detail page

Provide dedicated pages, for example `/market/BTC`, `/market/ETH` and `/market/GDT`.

Display asset icon, name, symbol, sample price, percentage change, high, low, volume and watchlist toggle.

### Chart
Provide time intervals:
- 1m
- 5m
- 15m
- 1h
- 4h
- 1D
- 1W

Support candlestick and line views, zoom, crosshair, tooltip, responsive sizing, loading, empty and error states. Use TradingView Lightweight Charts or another appropriate library if supported. Use sample or verified public data only.

### Asset information
Display description, market information, technical overview where appropriate, related assets and educational content. Avoid unsupported token claims.

## 7. Trading workspace

Build a sophisticated simulated trading workspace.

### Layout
Use a responsive multi-panel layout:
- Left: market selection or asset list.
- Centre: chart and market information.
- Right: simulated order panel.
- Lower section: order history, transaction history and demo account activity.

Panels should collapse, rearrange or resize where practical.

### Pair selector
Sample pairs:
- BTC/USDT
- ETH/USDT
- SOL/USDT
- XRP/USDT
- BNB/USDT
- GDT/USDT as a clearly labelled simulated market

Selecting a pair should update chart, market header, sample price, order panel and order-history context.

### Order panel
Include Buy and Sell tabs, Limit and Market order types, price field for limit orders, amount, total, percentage selection controls, estimated simulated fee, simulated available balance and order summary.

Use a clear simulation notice.

Do not execute real transactions.

### Validation
Validate missing values, invalid numbers, negative amounts, amounts exceeding simulated available balance, limit-price validation and minimum simulated order amounts.

### Confirmation
Before submission, display a confirmation modal containing selected asset, order type, side, price, amount, estimated total, simulated fee and simulation notice. Require confirmation or cancellation.

### Simulation
After confirmation, create a simulated order record, update simulated account balances and holdings, update transaction history, display feedback and keep state consistent.

Market orders may complete in simulation. Limit orders may remain pending until a simulated condition is met or until cancelled. Clearly identify simulated behaviour.

Do not implement leverage, margin borrowing, real derivatives or liquidation mechanics.

## 8. Order book

Create a professional simulated order-book panel displaying sell orders, buy orders, price, amount, total, spread and market-depth visualization.

Features:
- Adjustable precision
- Buy and Sell sections
- Market-depth visualization
- Price aggregation
- Responsive layout
- Loading states

Update it when the selected simulated asset changes.

## 9. Recent trades

Create a recent-trades panel displaying price, amount, time and trade-direction indicator. Use simulated trades and controlled simulation/mock streams. Do not claim these are actual market transactions.

## 10. Portfolio dashboard

Create a comprehensive demo portfolio dashboard.

Display simulated portfolio value, simulated available balance, asset allocation, portfolio performance visualization, asset distribution and recent simulated activity.

### Assets table
Display asset, symbol, quantity, simulated price, simulated value and percentage allocation.

### Charts
Create asset allocation, portfolio history and asset distribution charts.

### Activity
Display simulated buys, simulated sells, demo deposits, demo transfers and order cancellations. Each record should include type, asset, amount, timestamp and status.

Clearly label the portfolio as simulated.

## 11. Watchlist

Implement a fully functional watchlist. Users can add/remove assets, search, view prices, percentage changes and mini charts, and open asset detail pages. Persist watchlist data for demo users where appropriate.

## 12. Simulated account system

Create a demo account experience. Users should be able to create a demo profile, sign in to demo mode, sign out, view profile, change display preferences, reset the demo portfolio and view activity.

If authentication is implemented, use secure authentication architecture and never store plaintext passwords. Prefer mock authentication or a secure provider in test mode.

Do not request, store or process real financial credentials.

Provide a configurable initial demo balance, for example 10,000 USDT. Clearly label it as simulated. Users should be able to reset the demo account.

## 13. Transaction history

Create a dedicated page displaying date, transaction type, asset, amount, price, total, fee and status. Add filters, search, pagination, date range selection and transaction details modal. All transactions must be simulated.

## 14. Notifications

Create a functional notification centre with simulated order completed, pending, cancelled, watchlist updates, demo account activity and platform announcements.

Include notification list, unread/read state, clear notifications and preferences.

## 15. Learning centre

Create educational categories:
- Crypto Basics
- Blockchain Basics
- Market Terminology
- Understanding Charts
- Risk Awareness
- Understanding Market Volatility
- Digital Asset Security
- Understanding Simulated Trading

Use educational content and a glossary. Do not provide personalized investment advice.

## 16. GDT token page

Create a dedicated Gada Token (GDT) information page consistent with Gadadex.

Include Gada Token branding, token name, symbol, overview, ecosystem overview, owner-supplied token information, tokenomics only when verified information is supplied, roadmap only when supplied, community section and FAQ.

Do not invent tokenomics, contract addresses, supply, utility, listing status, partnerships, returns, liquidity or security claims. Use clearly labelled placeholders where information is unavailable.

## 17. Responsive design

Support desktop, laptop, tablet and mobile.

Desktop: multi-column layouts, data-rich tables, chart panels, compact navigation and optimized dashboard spacing.

Tablet: adapt tables, navigation, charts and panel arrangement.

Mobile: compact navigation, menu or bottom navigation where appropriate, stacked trading panels, scrollable charts, responsive cards, compact market tables, touch-friendly controls and proper spacing. Do not simply shrink the desktop layout.

## 18. Reusable UI component system

Build reusable components such as:
- Navbar
- Footer
- AssetCard
- AssetIcon
- MarketTable
- PriceDisplay
- PercentageChange
- MiniChart
- TradingChart
- OrderBook
- RecentTrades
- OrderForm
- OrderConfirmation
- PortfolioSummary
- PortfolioChart
- Watchlist
- NotificationPanel
- Modal
- Tabs
- Dropdown
- Tooltip
- Toast
- LoadingSkeleton
- EmptyState
- ErrorState

Maintain consistency throughout the application.

## 19. Technical stack

Use the most appropriate stack supported by the environment.

Preferred:
- React
- TypeScript
- Next.js if supported
- Tailwind CSS
- Reusable component architecture
- TradingView Lightweight Charts where appropriate
- Recharts for portfolio visualizations where appropriate
- Lucide icons
- Node.js or framework-native backend if required
- REST API or appropriate structured API
- PostgreSQL where persistent backend is available
- Prisma or another appropriate ORM
- Secure authentication provider or test-mode authentication
- Zustand, Context API or another appropriate state-management solution
- Mock market data and clearly identified sample datasets
- Optional read-only public market-data sources where permitted

Do not introduce unnecessary dependencies. Adapt to the environment while maintaining clean, modular architecture.

## 20. Data architecture

Suggested models:
- User
- DemoAccount
- Asset
- MarketPair
- SimulatedOrder
- SimulatedTrade
- Portfolio
- PortfolioAsset
- Watchlist
- WatchlistAsset
- Transaction
- Notification
- UserPreferences

Ensure data consistency: orders, balances, holdings and transaction records must remain consistent; cancelled orders must not be counted as completed trades; pending orders must be identified; and UI state must update consistently.

## 21. Security and privacy

Implement secure application-development practices:
- Validate inputs.
- Sanitize appropriate user-controlled content.
- Use secure authentication patterns.
- Protect API routes.
- Avoid exposing secrets.
- Never hardcode production credentials.
- Never store plaintext passwords.
- Do not collect private keys, seed phrases or exchange API credentials.
- Do not implement real deposits, withdrawals, custody or order execution.
- Use safe environment-variable handling.
- Include basic rate limiting where appropriate.
- Avoid unnecessary personal-data collection.

## 22. Performance

Optimize with lazy-loading, efficient chart rendering, caching where appropriate, optimized images, minimal unnecessary API calls, responsive chart sizing, efficient state updates and pagination/progressive loading.

## 23. Accessibility

Implement keyboard navigation, accessible form labels, proper contrast, focus indicators, semantic HTML, screen-reader-friendly controls, accessible dialogs, appropriate ARIA attributes and reduced-motion support.

## 24. Empty states, errors and loading

Every major page should have loading, empty, error and success states. Do not leave blank screens. Provide clear feedback and skeleton loaders where appropriate.

## 25. Testing

Test navigation, routes, responsive navigation, market search/sorting/filters, asset detail pages, watchlist actions, simulated order validation, market orders, limit-order creation/cancellation, balance and holding updates, transaction records, portfolio charts and mobile usability.

## 26. Development execution strategy

Build progressively:

**Phase 1:** Brand design system, application layout, navigation, landing page, markets page and asset detail pages.

**Phase 2:** Trading workspace, chart integration, order book, recent trades and simulated order-entry interface.

**Phase 3:** Demo account, portfolio dashboard, simulated order management and transaction history.

**Phase 4:** Watchlist, notifications, learning centre and GDT page.

**Phase 5:** Responsive refinement, security review, accessibility, testing and performance optimization.

Do not stop after creating a static homepage. Each phase should produce working functionality.

## 27. Quality expectations

The finished product must not look like a generic AI-generated dashboard, basic template, static marketing website, collection of disconnected pages, placeholder UI or low-quality crypto clone.

Use thoughtful spacing, precise typography, strong hierarchy, subtle animations, consistent cards, polished charts and professional interaction design.

Prioritize usability over excessive visual effects. Avoid random gradients, excessive glassmorphism and clutter.

Do not create buttons that do nothing. Do not make fake live-data claims. Do not fabricate token information. Do not leave major sections unfinished.

## 28. Final deliverable

Deliver a cohesive, polished Gadadex simulation application including:
- Landing page
- Markets overview
- Asset listings
- Asset detail pages
- Interactive charts
- Trading workspace
- Simulated order-entry functionality
- Order book
- Recent simulated trades
- Demo portfolio
- Watchlist
- Transaction history
- Notifications
- Learning centre
- GDT token information page
- Demo account experience
- Responsive mobile layout
- Consistent Gadadex brand identity

Before declaring the project complete, review the application, test navigation and interactions, test simulated orders and portfolio updates, test responsive layouts, resolve errors, remove broken links, label simulated data and confirm readiness for a controlled demonstration.

Build Gadadex as a coherent, polished product experience rather than a superficial visual mockup.

Begin by establishing the architecture and design system, then implement in structured phases.

---

# Prompt 2 — Architecture and Implementation Execution

You are now the lead engineer responsible for implementing Gadadex.

Use the Gadadex Master Project Specification above as the product requirements document. This document is the architecture and implementation guide.

Do not restart the project with a generic template. Do not simplify the exchange interface into a landing page. Do not ignore the architecture.

## Architecture requirements

1. Establish a modular React and TypeScript architecture.
2. Create a reusable design system based on the approved Gadadex brand.
3. Establish routing for every major page.
4. Create shared UI components.
5. Separate market data, demo account state, simulation logic, portfolio logic and UI state.
6. Use TypeScript interfaces for the application's data contracts.
7. Build the application progressively.
8. Ensure all simulated data is clearly labelled.
9. Keep all order functionality confined to a simulated environment.
10. Do not implement real-money trading, custody, deposits, withdrawals or real order execution.

## Implementation order

### Milestone 1 — Foundation
Implement:
- Application shell
- Navbar
- Footer
- Routing
- Responsive layout
- Theme system
- Brand icon
- Wordmark
- UI components
- Loading states
- Error states

Do not proceed without verifying the foundation.

### Milestone 2 — Markets
Implement:
- Markets overview
- Market table
- Search
- Sorting
- Asset filtering
- Asset detail routes
- Charts
- Watchlist integration

### Milestone 3 — Trading workspace
Implement:
- Pair selector
- Chart
- Order book
- Recent simulated trades
- Simulated order panel
- Order confirmation
- Input validation

### Milestone 4 — Simulation
Implement:
- Demo account
- Demo balances
- Simulated orders
- Portfolio calculations
- Simulated activity
- Pending order state
- Cancelled order state
- Reset functionality
- State persistence

### Milestone 5 — Ecosystem
Implement:
- Portfolio dashboard
- Watchlist
- Transaction history
- Notifications
- GDT information page
- Learning centre
- Account preferences

### Milestone 6 — QA
Test:
- Every route
- Every navigation item
- Every primary button
- Every form
- Search
- Filters
- Sorting
- Responsive behavior
- Simulated order validation
- Portfolio consistency
- State persistence
- Error handling

## Development rules

- Never build the entire application as a single file.
- Never use placeholder buttons for completed functionality.
- Never silently omit requested pages.
- Never claim functionality exists when it has not been implemented.
- Never represent simulated prices or orders as real.
- Never fabricate GDT token information.
- Use reusable components.
- Maintain consistent spacing, typography, colours and interaction patterns.
- Maintain a clear separation between data, business logic and presentation.
- Keep the application accessible.
- Use appropriate responsive layouts.
- Keep code organized and maintainable.

## Workflow

At the start:

1. Inspect the development environment.
2. Identify the available framework and constraints.
3. Establish the project structure.
4. Create the design system.
5. Implement Milestone 1.

At the end of each milestone:

1. Verify what was implemented.
2. Test the functionality.
3. Identify unresolved issues.
4. Fix issues before proceeding.
5. Document the completed milestone.

Do not attempt to generate the entire project in one uncontrolled code dump.

Work incrementally, maintain a consistent architecture, and ensure that each milestone builds on the previous one.

The final product must be a cohesive, polished Gadadex simulation application that meets the original product specification.
