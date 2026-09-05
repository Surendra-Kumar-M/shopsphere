# ShopSphere 2.0 Architecture Audit

## Executive Summary
ShopSphere 2.0 is a React Native ecommerce application utilizing Expo SDK 57, Expo Router, Redux Toolkit, RTK Query, and Emotion. The current repository contains a substantial foundational structure but suffers from separation of concerns by technical type (e.g., all hooks in one folder, all screens in another) rather than business domains. The codebase demonstrates good practices such as strict TypeScript usage, Emotion theming, and an established API layer, but requires a significant migration toward a feature-first architecture to support scaling, maintainability, and production-quality standards.

## Current Architecture
The current architecture splits logic horizontally across the `src/` directory. 
- **Routing:** Handled via file-based Expo Router (`src/app/`).
- **UI & Presentation:** Spread across `src/screens/` and `src/components/`. 
- **State Management:** Handled globally in `src/store/` with slices for auth, cart, and wishlist, backed by `redux-persist`.
- **API:** Managed globally via RTK Query in `src/services/api/`.

## Current Folder Structure
```
src/
├── app/          # Expo Router configuration and basic layouts
├── components/   # Grouped loosely by feature (auth, cart, home, ui)
├── config/       # Environment and global configurations
├── constants/    # Global constants (e.g., auth, home)
├── hooks/        # Custom hooks (e.g., useAuth, useHome)
├── providers/    # Global providers (App, Auth, Redux, Theme)
├── screens/      # Feature screens (auth, home, cart, product)
├── services/     # API configuration and device storage utilities
├── store/        # Redux root reducer, slices, and persist migrations
├── theme/        # Emotion design system tokens
├── types/        # Global TypeScript definitions
└── utils/        # Shared utility functions
```

## Technology Stack
- **Framework:** React Native 0.86, Expo SDK 57
- **Routing:** Expo Router
- **State (Client):** Redux Toolkit, Redux Persist
- **State (Server):** RTK Query
- **Network:** Axios
- **Styling:** Emotion (`@emotion/native`)
- **Forms/Validation:** React Hook Form, Zod
- **UI Dependencies:** Expo Image, Reanimated, Gesture Handler, Lucide React Native, `react-native-svg`
- **Build/Deploy:** EAS Build

## Navigation Audit
**Observations:**
- Uses Expo Router properly with standard `_layout.tsx` files.
- `app/(tabs)` implements tab-based navigation.
- Dynamic routes exist (e.g., `product/[id]`, `category/[slug]`).
**Issues:**
- Navigation is solid, but care must be taken to ensure business logic remains isolated in `src/features/` and does not leak into `app/` routes.

## State Management Audit
**Observations:**
- Redux Toolkit is correctly installed and configured.
- `redux-persist` is used effectively to persist `auth`, `cart`, and `wishlist` state using AsyncStorage.
**Issues:**
- Slices (`authSlice.ts`, `cartSlice.ts`) are centralized in `src/store/slices/`. They need to be relocated into their respective feature directories.

## API Audit
**Observations:**
- `src/services/api/api.ts` provides an empty base API structure for RTK Query.
- `baseQuery.ts` successfully integrates Axios with token re-authentication logic.
- DummyJSON is currently targeted as the primary API provider.
**Issues:**
- The application currently relies on a centralized API folder. Endpoints must be broken out and injected from individual feature domains (`api.injectEndpoints`).

## Component Architecture Audit
**Observations:**
- `src/components/ui/` contains reusable components (Button, Input, Avatar, SkeletonLoader, etc.).
- There is **no evidence** of an atomic design hierarchy (`atoms`, `molecules`, `organisms`) currently active in the `src/` directory, despite older project references.
**Issues:**
- `src/components/ui` should be relocated to `src/shared/components`.
- Feature-specific components (e.g., `GreetingHeader` in Home) reside in `src/components/home` but are disconnected from their parent screens and hooks.

## Theme Audit
**Observations:**
- Emotion is implemented effectively.
- `src/theme/` contains solid foundational tokens (`colors.ts`, `spacing.ts`, `typography.ts`, `shadows.ts`, `radius.ts`).
**Issues:**
- The team must strictly enforce the use of these tokens over hard-coded values in feature migrations.

## Feature Audit
**Implemented Features (Foundational):**
- **Home:** Uses `useHome.ts` hook, renders sections (Banner, Categories, Products).
- **Auth:** Google Sign-In integration in `services/auth/googleAuth.ts`, basic session management.
- **Cart/Wishlist:** Basic Redux slices and persist configuration exist.
- **Product/Category:** Basic routing and screen shells exist.
**Missing Features (To Be Built):**
- Stripe Payments, Chat, Store Locator, Barcode Scanner, complete Checkout flow.

## Dependency Audit
**Observations:**
- Only one lockfile exists (`package-lock.json`), confirming `npm` as the strict package manager.
- `lucide-react-native` and `react-native-svg` are correctly installed.
- **`react-native-mmkv` is NOT installed.** The project currently relies on `AsyncStorage` and `expo-secure-store`.
**Issues:**
- Both Axios and RTK Query are installed. While this is acceptable (Axios acting as the base fetcher), the UI must strictly interact through RTK Query hooks.

## Native/EAS Audit
**Observations:**
- `eas.json` is configured with `development`, `preview`, and `production` build profiles.
- Native modules like Firebase and `@react-native-google-signin/google-signin` are present.
**Issues:**
- **High Risk:** The presence of custom native modules completely invalidates the use of Expo Go. All native testing must be conducted via EAS Development Builds.

## TypeScript Audit
**Observations:**
- Strict mode is enabled.
- Types are primarily centralized in `src/types/`.
**Issues:**
- Types should be decentralized and co-located with their respective features (e.g., `Product` type should live in `src/features/products/types/`).

## Performance Risks
- **Lists:** Large product grids require strict adherence to `FlatList` (or `FlashList` if introduced later) with proper key extraction and memoization to prevent re-render thrashing.
- **Images:** Must consistently utilize `expo-image` for caching, which is currently installed.

## Security Risks
- Tokens are currently managed via `expo-secure-store` within `baseQuery.ts`, which is correct.
- Stripe secrets (when implemented) must absolutely never be exposed on the client.

## Existing Work Worth Preserving
- The **Emotion theme foundation** is solid and should be retained.
- The **RTK Query + Axios baseQuery** implementation handling token refresh is robust.
- The **Redux Persist** configuration is well-structured.
- The **Expo Router** navigation shell is correctly established.

## Technical Debt
- Separation by technical concern (`hooks`, `components`, `screens`) rather than business domain.
- Centralized type definitions and API slices.

## Proposed Target Architecture
Transition to a **Feature-First Architecture**:
```
src/
├── app/                  # Routing delegators
├── features/             # Business domains (auth, home, products, cart, etc.)
│   └── [feature_name]/
│       ├── api/          # Injected RTK endpoints
│       ├── components/   # Feature-specific UI
│       ├── hooks/        # Feature logic
│       ├── screens/      # Screen UI
│       ├── store/        # Redux slices
│       └── types/        # Feature models
├── shared/
│   └── components/       # Truly reusable UI (e.g., Button, Text)
├── services/             # Core infrastructure (storage, baseQuery)
├── store/                # Root Redux configuration
└── theme/                # Emotion tokens
```

## Migration Strategy
1. **Foundation First:** Relocate `src/components/ui/` to `src/shared/components/`. 
2. **Feature Extraction:** Incrementally create folders in `src/features/` (e.g., `features/home`). Move related screens, components, and hooks into these folders one by one.
3. **Verify:** After moving each feature, update imports, run TypeScript validation, and ensure the app compiles before proceeding to the next.

## Risk Assessment
- **Medium Risk:** Moving files will heavily disrupt imports. Utilizing absolute imports (`@/features/...`) will mitigate future issues.
- **High Risk:** Implementing Barcode Scanning and Stripe will introduce new native dependencies, requiring rigorous EAS compatibility testing against Expo SDK 57.

## Recommended Phase Order
- **Phase 0:** Documentation and Audit (Complete).
- **Phase 1:** Foundation Migration (`shared/components`, `theme`).
- **Phase 2:** Navigation Routing updates.
- **Phase 3:** Home Feature Extraction and Implementation.
- **Phase 4-9:** Extract and implement remaining features (Products, Cart, Wishlist, Auth, Orders, Checkout).
- **Phase 10-13:** Advanced Integrations (Stripe, Scanner, Chat, Store Locator).
- **Phase 14-15:** Performance Polish and EAS Release.

## Immediate Next Steps
1. Create the `src/features/` and `src/shared/` directories.
2. Relocate `src/components/ui/` to `src/shared/components/`.
3. Update all associated imports to resolve compilation errors.
