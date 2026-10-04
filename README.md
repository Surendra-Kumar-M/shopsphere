# ShopSphere

**A production-oriented e-commerce mobile application built with React Native and Expo, featuring product discovery, authentication, cart and wishlist management, barcode scanning, and payment integration.**

**Status: 🚧 Active development**

## Overview

ShopSphere is a robust e-commerce mobile application designed to provide a seamless and engaging shopping experience. Built on a modern React Native and Expo stack, the project emphasizes a clean, modular architecture, making it highly maintainable and suitable for production deployments. It leverages Expo Router for file-based navigation, Redux Toolkit for centralized state management, and integrates with essential third-party services like Firebase and Stripe.

## Key Features

- **Authentication System**: Complete user onboarding flow, including Login, Registration, Forgot Password, and Reset Password, utilizing Firebase and Google Sign-in.
- **Product Discovery**: Browse products by category, view detailed product pages, and search for items.
- **Shopping Cart & Wishlist**: Manage cart items and save favorites to a wishlist, with locally persisted state using Redux Persist and AsyncStorage.
- **Checkout & Payments**: Stripe payment integration supporting the application's checkout flow.
- **Barcode Scanner**: In-app camera scanning for quick product lookups using Expo Camera.
- **Real-time Chat**: Customer support and interaction capabilities powered by Socket.IO.
- **User Profile**: Manage user settings, orders, and account details.

## Tech Stack

The application is built using a modern, scalable technology stack:

- **Framework**: React Native, Expo (SDK 57)
- **Navigation**: Expo Router (with typed routes)
- **State Management**: Redux Toolkit, React-Redux, Redux Persist (AsyncStorage)
- **Data Fetching/API**: Axios
- **Styling**: Emotion (`@emotion/native`), React Native Reanimated
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **External Integrations**: Firebase, Stripe (`@stripe/stripe-react-native`), Socket.IO Client
- **UI Icons**: Lucide React Native

## Architecture & Project Structure

The codebase is organized by feature to maintain separation of concerns and scalability.

```text
shopsphere/
├── app/                  # Expo Router file-based routing
│   ├── (auth)/           # Authentication flow screens
│   ├── (tabs)/           # Main application tab screens (Home, Cart, Profile, etc.)
│   ├── category/         # Category-specific routes
│   ├── product/          # Product detail routes
│   └── scanner.tsx       # Barcode scanner route
├── src/
│   ├── components/       # Reusable UI components grouped by feature (auth, cart, product, etc.)
│   ├── services/         # External integrations (API, Firebase, Payment, Storage)
│   ├── store/            # Redux setup, root reducer, and domain slices
│   ├── screens/          # Screen-level UI implementations mapped to routes
│   ├── hooks/            # Custom React hooks
│   └── theme/            # Global styling and theme tokens
├── assets/               # Static assets, images, and app icons
├── app.json              # Expo application configuration
└── eas.json              # Expo Application Services (EAS) build configuration
```

## Application Flow

1. **Authentication**: Users begin at the `(auth)` flow with an onboarding screen, followed by login or registration.
2. **Main Navigation**: Once authenticated, users enter the `(tabs)` flow consisting of:
   - **Home**: Product highlights and search.
   - **Categories**: Browse products by domain.
   - **Cart**: Review selected items.
   - **Wishlist**: View saved favorites.
   - **Chat**: Real-time customer support.
   - **Profile**: Account management.
3. **Standalone Screens**: Users can navigate to specific product details (`/product/[id]`), category lists (`/category/[id]`), or use the barcode scanner (`/scanner`).

## State Management & Data Layer

- **Redux Toolkit**: Centralized state management utilizing domain-specific slices (`authSlice`, `cartSlice`, `wishlistSlice`).
- **Persistence**: Application state (like cart and wishlist items) is persisted locally using redux-persist and @react-native-async-storage/async-storage, allowing state to be retained between app sessions.
- **API Integration**: RESTful API communication is handled through custom Axios instances configured within the `services/api` directory.

## Development Status

- **Completed**: Core application architecture, Expo Router navigation, Redux state management (with persistence), authentication flows, UI components for major tabs, and barcode scanning integration.
- **Active Development**: Ongoing refinement of the checkout flow (Stripe), real-time chat polish, and final API integrations for live product data.
- **Deployment**: Configured for Expo Application Services (EAS) for internal development and preview builds, but not yet published to public App/Play Stores.

## Running Locally

To run the project locally on your machine:

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Ensure your `.env` file is present in the root directory and populated with the necessary keys (Firebase config, Stripe publishable key, API URLs).

3. **Start the Expo development server:**
   ```bash
   npm start
   ```

4. Open the app using a development build, Android Emulator, iOS Simulator, or the Expo Go app by scanning the QR code in your terminal.

## Build & Deployment

The project is configured to use Expo Application Services (EAS). Build profiles for `development`, `preview`, and `production` are defined in `eas.json`.

To create a build:
```bash
eas build --profile development --platform all
```

## Engineering Highlights

- **Typed Routing**: Utilizes Expo Router's `typedRoutes` for safer navigation and autocomplete across the app.
- **Robust Validation**: Enforces strict form validation using Zod schemas with React Hook Form.
- **Modular Services**: Decoupled external integrations (Firebase, Stripe, API) into dedicated service modules for easier testing and maintainability.
- **Performance**: Incorporates `react-native-reanimated` for fluid animations and UI interactions.

## Author
**Surendra Kumar M**
