# Git Workflow

## Branching Strategy
- **Main Branch:** `main` (or `master`) always reflects production-ready or stable development state.
- **Feature Branches:** Create branches for specific features or fixes (e.g., `feature/home-screen`, `fix/cart-calculation`).

## Commit Conventions
We follow Conventional Commits to maintain a readable and automated history.

**Format:**
`<type>(<scope>): <description>`

**Types:**
- `feat`: A new feature (e.g., `feat(home): integrate categories`)
- `fix`: A bug fix (e.g., `fix(cart): persist quantity updates`)
- `refactor`: Code change that neither fixes a bug nor adds a feature (e.g., `refactor(api): centralize axios client`)
- `docs`: Documentation only changes (e.g., `docs(architecture): update feature boundaries`)
- `style`: Changes that do not affect the meaning of the code (formatting, missing semi-colons)
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

## Commit Guidelines
- Keep commits focused and atomic. Do not mix formatting changes with feature logic in a single commit.
- Use imperative mood in the subject line (e.g., "add", not "added" or "adds").
- Ensure the app builds and tests pass before committing.

## Git Safety
- Always run `git status` and `git diff` to understand exactly what you are committing.
- Do NOT run destructive commands (`git reset --hard`, `git clean -fd`) without explicit confirmation and understanding of what will be lost.
- Do not overwrite uncommitted user work.
