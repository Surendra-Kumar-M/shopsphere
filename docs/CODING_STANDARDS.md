# Coding Standards

## TypeScript
- **Strict Mode:** TypeScript strict mode is enabled and must be respected.
- **`any` Type:** Do NOT use `any`. Use `unknown` if the type is truly dynamic, and narrow it.
- **Interfaces/Types:** Co-locate domain types with their respective features. Avoid duplicating types.
- **API Typing:** Strongly type all API requests and responses. Do not leave them implicit.

## React & React Native
- **Functional Components:** Use functional components and hooks exclusively.
- **Hooks:** Keep hooks focused. Co-locate feature-specific hooks inside the feature folder.
- **Async Code:** Use `async/await`. Avoid raw `.then().catch()` chains unless absolutely necessary.
- **Performance:** Avoid premature optimization, but use stable callbacks (`useCallback`), stable keys, and `memo` for expensive renders or large lists. Use `FlatList` or `FlashList` for large collections.

## Expo & Expo Router
- **Expo SDK:** Stick to the current SDK version (57) unless there is a strong compatibility reason to upgrade.
- **Expo Router:** Route files in `src/app/` must be kept thin. They should primarily define navigation, passing responsibility to feature screens (e.g., `src/features/home/screens/HomeScreen.tsx`).
- **No Business Logic in Routes:** Never put API calls, Redux logic, or complex UI implementations directly in a route file.

## Styling (Emotion)
- **Theme Usage:** Always use Emotion theme tokens (`colors`, `spacing`, `typography`). Do not hardcode colors or dimensions if a token exists.
- **Styled Components:** Prefer composed styled-components over large amounts of inline styling.
- **No Mixing Systems:** Do not introduce Tailwind, NativeWind, or regular StyleSheet heavily where Emotion styled-components suffice.

## State Management (Redux & RTK Query)
- **Client State:** Use Redux Toolkit for global UI state, cart, wishlist, and session metadata.
- **Server State:** Use RTK Query exclusively for remote data fetching, caching, and synchronization.
- **Slices:** Co-locate feature slices inside `src/features/[feature]/store/`.

## File Organization & Naming
- **PascalCase:** For components and screen files (e.g., `ProductCard.tsx`, `HomeScreen.tsx`).
- **camelCase:** For hooks, utils, services, and instances (e.g., `useHome.ts`, `api.ts`).
- **Imports:** Use absolute imports configured via `babel-plugin-module-resolver` (`@/features/...`) instead of deeply nested relative imports (`../../../`).

## Error Handling
- **Graceful Failure:** Never silently swallow errors. Log them appropriately.
- **UI States:** Ensure every data-fetching component considers Loading, Empty, Error, and Success states.
- **Backend Errors:** Normalize API errors and display user-friendly messages rather than raw backend errors.

## Comments & Documentation
- **Why, not What:** Code should be self-documenting. Use comments to explain complex business logic, workarounds, or *why* a particular decision was made.
- **JSDoc:** Use JSDoc for complex utility functions or shared hooks to aid IDE intellisense.

## Accessibility
- Provide accessible labels (`accessibilityLabel`), roles (`accessibilityRole`), and adequate touch target sizes (minimum 44x44).
- Ensure readability with adequate contrast.
