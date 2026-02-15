---
title: Contributing Guide
description: Everything you need to start contributing to Sando Design System — from setting up the monorepo to submitting your first pull request.
---

# Contributing

Welcome to the Sando kitchen! Whether you're fixing a typo, adding a component, or improving accessibility, every contribution makes the system better. This guide gets you from clone to pull request.

For the complete contributing guidelines, see our [CONTRIBUTING.md](https://github.com/rodrigolagodev/SandoDesignSystem/blob/master/CONTRIBUTING.md) in the repository.

## Quick Links

- [GitHub Repository](https://github.com/rodrigolagodev/SandoDesignSystem)
- [Issues](https://github.com/rodrigolagodev/SandoDesignSystem/issues)
- [Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions)

## Prerequisites

| Tool        | Version | Why                                    |
| ----------- | ------- | -------------------------------------- |
| **Node.js** | ≥20.0.0 | Runtime for builds, tests, and tooling |
| **pnpm**    | ≥8.15.0 | Fast, disk-efficient package manager   |
| **Git**     | Latest  | Version control                        |

::: tip Check Your Versions

```bash
node --version   # Should be v20.x or higher
pnpm --version   # Should be 8.15.x or higher
git --version    # Any recent version
```

:::

## Getting Started

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/rodrigolagodev/SandoDesignSystem.git
cd SandoDesignSystem

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

### Monorepo Structure

Sando is a monorepo managed by [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build/repo) for orchestrated builds:

```
SandoDesignSystem/
├── packages/
│   ├── tokens/          # @sando/tokens — Design tokens (Ingredients, Flavors, Recipes)
│   └── components/      # @sando/components — Web Components (Lit 3+)
├── apps/
│   ├── docs/            # @sando/docs — Storybook (component playground)
│   └── site/            # @sando/site — VitePress (documentation site)
├── package.json         # Root config, scripts, engines
├── turbo.json           # Turborepo pipeline config
└── pnpm-workspace.yaml  # Workspace definitions
```

### Common Commands

All commands run from the **root directory** via Turborepo:

```bash
# Development
pnpm dev                  # Start all packages in dev mode (parallel)
pnpm build                # Build everything (tokens → components → apps)

# Testing
pnpm test                 # Run all tests
pnpm test:watch           # Run tests in watch mode
pnpm test:coverage        # Run tests with coverage report
pnpm test:ui              # Open Vitest UI

# Code Quality
pnpm lint                 # Lint all packages
pnpm format               # Format all files with Prettier
pnpm format:check         # Check formatting without changing files

# Package-Specific
pnpm tokens:build         # Build tokens only
pnpm tokens:dev           # Tokens dev mode
pnpm components:build     # Build components only
pnpm docs:dev             # Start Storybook dev server
pnpm docs:build           # Build Storybook
pnpm site:dev             # Start VitePress dev server
pnpm site:build           # Build VitePress site
```

::: info Build Order Matters
Turborepo handles dependencies automatically: tokens build first, then components (which depend on tokens), then apps (which depend on both). Just run `pnpm build` and it figures out the rest.
:::

## Code Style

| Rule            | Convention                                             |
| --------------- | ------------------------------------------------------ |
| **Indentation** | 2 spaces                                               |
| **Quotes**      | Single quotes in TypeScript, double in HTML            |
| **Semicolons**  | Required                                               |
| **Formatting**  | Prettier (runs automatically on commit)                |
| **Linting**     | ESLint with `eslint-plugin-lit` and `eslint-plugin-wc` |

Husky and lint-staged run automatically on commit — formatting and linting happen before your code is committed.

```bash
# Manual formatting
pnpm format

# Check without changing
pnpm format:check
```

## Testing

Every component needs three types of tests:

| Test Type      | File Pattern     | What It Covers                             |
| -------------- | ---------------- | ------------------------------------------ |
| **Unit tests** | `*.test.ts`      | Props, events, rendering, state management |
| **E2E tests**  | `*.spec.ts`      | User interaction flows (Playwright)        |
| **A11y tests** | `*.a11y.test.ts` | WCAG compliance across states and flavors  |

**Minimum coverage: 80%**

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test -- --grep "sando-button"
```

::: warning Accessibility Tests Are Required
Every component **must** have an `.a11y.test.ts` file. No component ships without passing automated accessibility tests. We use [axe-core](https://github.com/dequelabs/axe-core) via [jest-axe](https://github.com/nickcolley/jest-axe) for automated WCAG validation.
:::

## Commit Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add loading state to sando-button
fix: resolve focus ring visibility in dark mode
docs: update theming guide with all 6 flavors
test: add a11y tests for sando-checkbox
chore: update dependencies
refactor: simplify FlavorableMixin token resolution
style: format sando-input styles
```

### Commit Types

| Type       | When To Use                                      |
| ---------- | ------------------------------------------------ |
| `feat`     | New feature or component                         |
| `fix`      | Bug fix                                          |
| `docs`     | Documentation changes                            |
| `test`     | Adding or fixing tests                           |
| `chore`    | Build config, dependencies, tooling              |
| `refactor` | Code changes that don't add features or fix bugs |
| `style`    | Code formatting (not CSS styling)                |

## Pull Request Checklist

Before submitting, make sure:

- [ ] `pnpm build` succeeds
- [ ] `pnpm test` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm format:check` passes
- [ ] Accessibility tests included (`.a11y.test.ts`)
- [ ] Documentation updated (JSDoc, stories, VitePress guides if applicable)
- [ ] Storybook stories added for new components
- [ ] PR description explains _what_ and _why_

## What Can I Contribute?

### 🐛 Bug Fixes

Found a bug? Check the [issues page](https://github.com/rodrigolagodev/SandoDesignSystem/issues) first. If it's not reported, create an issue, then submit a fix.

### 📝 Documentation

Documentation improvements are always welcome — typos, unclear explanations, missing examples. You don't need to be an expert to make docs better.

### ♿ Accessibility

Accessibility improvements are treated as **high priority**. If you find a WCAG violation, report it with the specific criterion (e.g., "1.4.3 Contrast Minimum") and we'll fix it fast.

### 🧩 New Components

New components follow the [7-file pattern](/guides/component-architecture). Before building, open a [discussion](https://github.com/rodrigolagodev/SandoDesignSystem/discussions) to align on the component's API and behavior.

### 🎨 Design Tokens

New ingredients, flavor adjustments, or recipe improvements. Token changes affect the entire system, so discuss first.

## Need Help?

- **Questions?** → [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions)
- **Found a bug?** → [GitHub Issues](https://github.com/rodrigolagodev/SandoDesignSystem/issues)
- **Full guidelines?** → [CONTRIBUTING.md](https://github.com/rodrigolagodev/SandoDesignSystem/blob/master/CONTRIBUTING.md)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](https://github.com/rodrigolagodev/SandoDesignSystem/blob/master/LICENSE).
