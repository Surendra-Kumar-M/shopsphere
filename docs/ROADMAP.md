# ShopSphere 2.0 Roadmap

This roadmap outlines the phased development and migration plan for ShopSphere 2.0.
Features should only be marked complete `[x]` when fully verified and merged.

## Phase 0 — Documentation and Audit
- [x] Repository inspection
- [x] Documentation bootstrap (`docs/`)
- [ ] Architecture audit

## Phase 1 — Foundation
- [x] Migrate `src/components/ui` to `src/shared/components`
- [ ] Establish strict Emotion theme usage
- [ ] Solidify Redux and RTK Query base configuration
- [ ] Centralize error handling and loading systems

## Phase 2 — Navigation
- [ ] Clean up `src/app` routes to be thin delegators
- [ ] Ensure Expo Router typed routes are functioning correctly

## Phase 3 — Home
- [ ] Extract Home feature (`src/features/home`)
- [ ] Implement live DummyJSON integration for Home sections
- [ ] Search, Categories, Hero banner, and Featured products

## Phase 4 — Products
- [ ] Extract Product feature (`src/features/products`)
- [ ] Product listing and performant FlatList/FlashList
- [ ] Product filtering and search
- [ ] Product details, reviews, and related products

## Phase 5 — Cart
- [ ] Extract Cart feature (`src/features/cart`)
- [ ] Add/remove items, quantity changes
- [ ] Offline cart persistence
- [ ] Subtotal, discount, and shipping calculations

## Phase 6 — Wishlist
- [ ] Extract Wishlist feature (`src/features/wishlist`)
- [ ] Add/remove favorites
- [ ] Persistence and empty states

## Phase 7 — Authentication
- [ ] Extract Auth feature (`src/features/auth`)
- [ ] Sign in, sign up, validation
- [ ] Secure token storage (Expo Secure Store)
- [ ] Session restoration and auth guards

## Phase 8 — Orders
- [ ] Extract Orders feature (`src/features/orders`)
- [ ] Order history list
- [ ] Order details

## Phase 9 — Checkout
- [ ] Checkout flow and form validation (React Hook Form + Zod)
- [ ] Address selection

## Phase 10 — Stripe
- [ ] Safe, native Stripe payment integration
- [ ] Payment intents and server-side secret handling

## Phase 11 — Barcode Scanner
- [ ] Expo SDK 57 compatible camera/scanner integration
- [ ] Native permission handling

## Phase 12 — Chat
- [ ] Real-time infrastructure audit
- [ ] Conversation and message UI

## Phase 13 — Store Locator
- [ ] Audit existing WebView vs native Maps
- [ ] Implement store locator with deep linking

## Phase 14 — Production Polish
- [ ] Performance optimization (memoization, image caching)
- [ ] Accessibility pass
- [ ] Automated testing for critical business logic

## Phase 15 — EAS Release
- [ ] Final native dependency checks
- [ ] Build and verify EAS development, preview, and production profiles
