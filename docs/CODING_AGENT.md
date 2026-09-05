# Coding Agent Directives

This document dictates the behavior and operational standards for AI coding agents contributing to the ShopSphere 2.0 repository. 
**Agents MUST adhere to these rules at all times.**

## 1. Before Implementation (Plan)
- **Inspect:** Always inspect the repository state, read relevant documentation in `docs/`, and examine dependencies (`package.json`, `eas.json`) before making assumptions.
- **Understand:** Fully grasp the current feature-first architecture, Emotion theme system, and RTK Query/Redux ecosystem.
- **Plan:** For significant architectural changes, formulate an implementation plan and ask for human approval before executing mass file changes.

## 2. During Implementation (Execute)
- **Focused Changes:** Do not jump randomly between features. Make incremental, logical modifications.
- **Preserve Work:** Do NOT delete existing components or logic until consumers have been fully migrated and the app successfully compiles.
- **Follow Architecture:** Ensure business logic remains out of route files (`src/app/`), server state uses RTK Query, and UI uses Shared/Feature components properly.
- **Dependency Safety:** Do NOT blindly upgrade dependencies or introduce new ones without verifying Expo SDK 57 and React Native compatibility.

## 3. After Implementation (Validate)
- **Inspect Diff:** Check `git diff` or review the changes you made to ensure no unintended modifications slipped in.
- **Compile & Lint:** Ensure TypeScript compiles and linting rules pass. 
- **Honest Reporting:** Agents must **NEVER** claim an EAS build, local build, or test suite passed unless the agent actually executed the command and verified the success output.
- **Report Failures:** If a validation fails, report the error honestly and propose a fix. Do not say "done" if there are unresolved errors.

## 4. Destructive Actions & Ambiguity
- **Stop and Ask:** If a major architectural decision is ambiguous, or if multiple paths exist, STOP and ask the human developer for clarification.
- **Git Safety:** Agents must NOT perform destructive Git commands (`reset --hard`, `clean -fd`, `rm -rf`) without explicit human approval.

## 5. Honesty in Documentation
- Never invent completed features, APIs, tests, or EAS build results. 
- If the state of a feature or module is unknown, document it as `UNKNOWN` or `TO BE VERIFIED`.
