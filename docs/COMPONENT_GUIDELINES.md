# Component Guidelines

ShopSphere 2.0 adheres to a strict separation between domain-agnostic UI and business-specific features. 
We do NOT use the old atomic design hierarchy (`atoms`, `molecules`, `organisms`, `templates`).

## 1. Shared Components (`src/shared/components/`)
A component belongs here ONLY if it is truly generic, reusable across multiple unrelated features, and contains zero business logic.

**Examples of Shared Components:**
- `Button`
- `AppText` / `Text`
- `Input`
- `Icon`
- `Image` / `Avatar`
- `Badge` / `Chip`
- `Divider`
- `Loader` / `Spinner`
- `Skeleton`
- `EmptyState`
- `ErrorState`
- `Screen`
- `Modal`

*Rule of thumb:* If you can drag and drop the component into a completely different app (like a to-do list app) and it still makes sense, it belongs in `shared`.

## 2. Feature Components (`src/features/[feature]/components/`)
A component belongs here if it represents a specific business domain or requires domain-specific data structures.

**Examples of Feature Components:**
- `ProductCard` (Features/Products)
- `CartItem` (Features/Cart)
- `CategoryCard` (Features/Categories)
- `OrderCard` (Features/Orders)
- `SearchSuggestion` (Features/Search)
- `GreetingHeader` (Features/Home)

*Rule of thumb:* If a component expects a prop of type `Product`, `CartItem`, or dispatches a specific Redux action like `addToCart`, it is a feature component.

## 3. Best Practices
- **Composition over Configuration:** Build complex UI by composing small shared components rather than creating massive feature components with dozens of prop flags.
- **Styling:** Use Emotion theme tokens. Do not pass inline styles if avoidable.
- **Premature Abstraction:** Do not create a "reusable" abstraction if a component is only used once. Keep it simple and inline it within the feature until reuse is actually required.
