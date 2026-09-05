# API Guidelines

## API Architecture

The application strictly separates UI from direct network requests. The target architecture is:
**UI → Feature Hook → RTK Query → API Layer (Axios) → Backend**

**Rule:** The UI must NEVER directly call Axios.

## Core Technologies
- **Axios:** Handles low-level request interception, base URLs, timeouts, header injection, and token refresh logic.
- **RTK Query:** Handles data fetching, caching, synchronization, and provides React hooks.

## Organization
- **Base Query:** Located in `src/services/api/baseQuery.ts`. It acts as the bridge between RTK Query and Axios, handling authentication headers and token reauth.
- **Central API Slice:** Defined in `src/services/api/api.ts`. It provides an empty endpoint structure.
- **Endpoint Injection:** Features define their own endpoints and inject them into the central API slice.
  *Example:* `features/products/api/productsApi.ts` uses `api.injectEndpoints(...)`.

## Typing
- **Requests and Responses:** Must be strongly typed. No `any` allowed.
- **Interfaces:** Define response interfaces near the endpoint definition or in the feature's `types` folder.

## DummyJSON Integration
- DummyJSON is used as the initial ecommerce backend.
- Utilize it for products, categories, product search, and details.
- Avoid mocking local data manually once a DummyJSON endpoint is available.
- **Future Migration:** Keep RTK Query abstractions clean so swapping DummyJSON for a real backend only requires changing the base URL and response mappers, not UI components.

## Error Handling
- Axios intercepts raw network errors.
- RTK Query normalizes these errors.
- UI components must check RTK Query's `isError` state and gracefully display fallback UI. Do not expose raw backend JSON strings to the user.

## Authentication
- Handled securely inside `baseQuery.ts`.
- `baseQueryWithReauth` handles 401 Unauthorized responses, attempts a token refresh via Secure Store, and replays the failed request automatically.

## Caching & Pagination
- Utilize RTK Query's cache tags (e.g., `Product`, `Category`) for automatic invalidation.
- For pagination/infinite scrolling (e.g., product lists), utilize RTK Query's merge logic to append pages.
