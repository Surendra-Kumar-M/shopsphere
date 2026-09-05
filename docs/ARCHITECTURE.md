# ShopSphere 2.0 Architecture

## Project Overview
ShopSphere 2.0 is a production-quality Expo React Native ecommerce application. It is currently being modernized and refactored from an older reference application into a scalable, feature-first architecture.

## Technology Stack
- **Framework:** React Native with Expo SDK 57
- **Language:** TypeScript
- **Routing:** Expo Router
- **State Management (Client):** Redux Toolkit (with Redux Persist)
- **State Management (Server):** RTK Query
- **Network / API:** Axios
- **Styling:** Emotion (`@emotion/native`)
- **Forms & Validation:** React Hook Form & Zod
- **UI Libraries:** Expo Image, React Native Reanimated, React Native Gesture Handler, Lucide React Native
- **Build System:** EAS Build (Development Builds)

## Current Folder Structure (CURRENT STATE)
Currently, the architecture is separated by technical concerns rather than business domains:
```
src/
├── app/          # Expo Router routes
├── components/   # Grouped loosely by feature (auth, cart, home)
├── hooks/        # Custom React hooks, grouped loosely by feature
├── providers/    # App, Auth, Redux, Theme providers
├── screens/      # Screen implementations separated from routing
├── services/     # API config (Axios/RTK Query) and Storage utilities
├── store/        # Redux root reducer, slices, and persist config
├── theme/        # Emotion design system tokens
└── utils/        # Helper functions
```

## Target Folder Structure (TARGET DIRECTION)
The project is migrating towards a **feature-first architecture**:
```
src/
├── app/                  # Expo Router routes (thin delegators)
├── features/             # Feature domains (e.g., auth, home, products, cart)
│   └── [feature_name]/
│       ├── api/          # Feature-specific RTK Query endpoints
│       ├── components/   # Feature-specific components
│       ├── hooks/        # Feature-specific hooks
│       ├── screens/      # Screen implementations
│       └── store/        # Feature-specific Redux slices
├── shared/
│   └── components/       # Truly generic, reusable UI (Button, Screen, Text)
├── services/             # Core generic services (Storage, API base config)
├── store/                # Root Redux configuration
├── theme/                # Emotion design system tokens
└── assets/               # Local static assets
```

## Expo Architecture & Routing
**CURRENT STATE:** `src/app` handles routing using Expo Router. However, there is some mixing of concerns where routes directly hold logic instead of delegating entirely to screens.
**TARGET DIRECTION:** `src/app` should act strictly as the routing authority. Files inside `app/` should remain thin and delegate complex UI and business logic to `src/features/[feature]/screens`.

## Feature Architecture
**CURRENT STATE:** Features are split across `screens/`, `components/`, and `hooks/`.
**TARGET DIRECTION:** A highly cohesive feature-first architecture. A feature (e.g., `products`) contains its own API definitions, components, hooks, and screens. Business logic lives inside the feature.

## Component Architecture
**CURRENT STATE:** Components are grouped loosely by feature in `src/components/`, with shared UI elements now residing in `src/shared/components/`.
**TARGET DIRECTION:** 
- `src/shared/components/`: Only truly reusable UI (Button, Input, Avatar).
- `src/features/[feature]/components/`: Business-specific components (ProductCard, CartItem).
- Avoid atomic design abstractions (atoms/molecules).

## State Management
**CURRENT STATE:** Redux Toolkit is configured globally in `src/store/` with slices like `authSlice`, `cartSlice`, and `wishlistSlice`. Redux Persist is used for offline capabilities.
**TARGET DIRECTION:** Redux Toolkit handles **client state** only (e.g., cart, auth session). Slices will co-locate with their features in `src/features/[feature]/store/`. 

## API Layer & RTK Query
**CURRENT STATE:** `src/services/api/` contains the base query configuration and a central `api.ts`.
**TARGET DIRECTION:** RTK Query manages **server state** (products, categories, search). The UI must never directly call Axios. The flow is: UI → Feature Hook → RTK Query → API Layer (Axios) → Backend.

## Theme & Providers
- **Theme:** The app uses Emotion with defined tokens (`colors.ts`, `spacing.ts`, `typography.ts`). Hardcoded values should be avoided.
- **Providers:** Global providers (ReduxProvider, ThemeProvider, AppProvider) wrap the application at the root level.

## Storage
**CURRENT STATE:** `AsyncStorage` and `expo-secure-store` are used. Redux Persist relies on `AsyncStorage`.
**TARGET DIRECTION:** Continue using `expo-secure-store` for sensitive tokens and standard storage abstractions for general persistence.

## Native Dependencies & EAS Workflow
The project contains native dependencies (Firebase, Google Sign-In). 
- **EAS Development Builds** are the primary source of truth for testing.
- Expo Go is **NOT** fully supported due to native code.
- Any new dependency must be checked for Expo SDK 57 compatibility and EAS build requirements.
