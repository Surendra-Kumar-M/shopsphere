# Project Rules

These rules are non-negotiable for anyone (human or agent) contributing to ShopSphere 2.0.

1. **Expo SDK 57 Remains the Baseline:** Do not upgrade or downgrade major framework versions without a compelling, documented reason.
2. **EAS Development Builds:** Expo Go is not the source of truth due to native dependencies. Native changes require validation via EAS Development Builds.
3. **No Blind Dependency Upgrades:** Do not automatically update packages to their "latest" versions during normal development tasks.
4. **Native Compatibility Checks:** Before adding a dependency, explicitly check its compatibility with Expo SDK 57 and React Native.
5. **Package Management:** The project uses `npm`. Do not use `npm install --force` or `--legacy-peer-deps` as a first resort. Resolve conflicts properly. Do not introduce `yarn.lock`.
6. **Styling System Integrity:** Emotion is the chosen styling solution. Do not introduce Tailwind, NativeWind, or generic Stylesheets. Use the existing theme.
7. **Thin Routes:** Do not put business logic, API calls, or heavy UI implementations inside `src/app/` route files.
8. **Server State is RTK Query:** Use RTK Query for fetching and caching remote API data. Do not put server responses into standard Redux slices manually.
9. **Client State is Redux Toolkit:** Use standard Redux Toolkit slices for offline or local client state (e.g., Cart, Wishlist, Auth Metadata).
10. **No Direct Axios in UI:** UI components must NEVER directly call Axios. The flow must be: UI → Hook → RTK Query → API Layer (Axios).
11. **Strict TypeScript:** Do not use `any`. Strongly type all requests and responses.
12. **Preserve User Work:** Do not delete existing code unless consumers have been migrated and the app safely compiles.
13. **Check Git Status:** Always check `git status` before beginning significant changes.
14. **No Destructive Git Commands:** Do not run `git reset --hard`, `git clean -fd`, or `rm -rf` without explicit approval.
15. **Incremental Refactoring:** Refactor feature-by-feature. Migrate consumers, update imports, run tests, and then delete old files.
16. **Honest Validation:** Do not claim a build passed or a test worked unless you have explicitly run and verified it.
17. **Native Validation:** Any changes to native configuration (`app.json`, `eas.json`, or native node modules) requires a verified EAS rebuild.
