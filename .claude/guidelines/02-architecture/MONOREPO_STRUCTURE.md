# Monorepo Structure

**Category**: 02-architecture
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: Design System Architect

---

## Purpose

Defines the **Turborepo + pnpm workspace architecture**, build orchestration, dependency management, and package organization for the Sando Design System monorepo. This ensures strict build order, efficient caching, and proper cross-package dependencies.

---

## Core Rules

### Rule 1: Strict Build Order (Non-Negotiable)

**Tokens MUST be built before components, components before apps**. This dependency chain is enforced by Turborepo.

**Pattern**:

```
@sando/tokens (build) → @sando/components (build) → @sando/docs + @sando/site (dev/build)
```

**Why This Matters**: Components consume generated token files (CSS + TS). Building components before tokens fails. Apps import components, so components must be built first.

**Turborepo Configuration**:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"] // ← "^" means dependencies build first
    }
  }
}
```

**Anti-pattern**:

```bash
# ❌ WRONG: Building components before tokens
pnpm --filter @sando/components build  # Fails - no token files exist yet

# ✅ CORRECT: Build tokens first
pnpm --filter @sando/tokens build
pnpm --filter @sando/components build

# ✅ BEST: Let Turborepo handle order
pnpm build  # Turborepo builds in correct order automatically
```

---

### Rule 2: Package Organization

**Each workspace package MUST follow strict folder structure and naming**. Packages are either libraries (shared) or apps (deployable).

**Structure**:

```
sando-design-system/
├── packages/              # Shared libraries
│   ├── tokens/           # @sando/tokens
│   └── components/       # @sando/components
└── apps/                 # Deployable applications
    ├── docs/             # @sando/docs (Storybook)
    └── site/             # @sando/site (VitePress)
```

**Naming Convention**:

- **Scope**: All packages use `@sando/` scope
- **Package names**: kebab-case matching folder name
- **Example**: `packages/tokens/` → `@sando/tokens`

**Pattern** (package.json):

```json
{
  "name": "@sando/tokens",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "exports": {
    ".": "./dist/index.js",
    "./ingredients": "./dist/sando-tokens/css/ingredients/ingredients.css"
  }
}
```

**Anti-pattern**:

```json
// ❌ WRONG: No scope, wrong name format
{
  "name": "sando_tokens", // Should be @sando/tokens
  "version": "0.1.0"
}
```

---

### Rule 3: Workspace Dependencies

**Use `workspace:*` protocol for cross-package references**. This ensures local packages always use the workspace version, not npm registry.

**Pattern** (packages/components/package.json):

```json
{
  "dependencies": {
    "@sando/tokens": "workspace:*" // ← Always use workspace version
  }
}
```

**Why This Matters**: Without `workspace:*`, pnpm might fetch from npm registry instead of using local package. This breaks local development and causes version mismatches.

**Anti-pattern**:

```json
// ❌ WRONG: Version number instead of workspace protocol
{
  "dependencies": {
    "@sando/tokens": "^0.1.0"  // Might fetch from npm, not local
  }
}

// ❌ WRONG: File path instead of package name
{
  "dependencies": {
    "tokens": "file:../tokens"  // Use workspace protocol instead
  }
}
```

---

### Rule 4: Turborepo Caching Strategy

**Cache build outputs, never cache dev/watch tasks**. Caching speeds up CI/local builds but must not interfere with live reload.

**Cache-Enabled Tasks**:

- `build` - Outputs: `dist/**`, `.next/**`, `storybook-static/**`
- `test` - Outputs: `coverage/**`, `test-results/**`
- `lint` - No outputs, but results are cached

**Non-Cached Tasks** (persistent = true):

- `dev` - Live reload for development
- `test:watch` - Auto-rerun tests
- `test:ui` - Interactive test UI

**Pattern** (turbo.json):

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"],
      "cache": true // ← Implicit (default)
    },
    "dev": {
      "cache": false,
      "persistent": true // ← Long-running process
    }
  }
}
```

**When to Force Rebuild**:

```bash
# Bypass cache for fresh build
pnpm build --force

# Clean all artifacts and rebuild
pnpm clean && pnpm build
```

---

### Rule 5: pnpm Workspace Configuration

**All packages MUST be defined in pnpm-workspace.yaml**. This file is the single source of truth for workspace members.

**Pattern** (pnpm-workspace.yaml):

```yaml
packages:
  - "packages/*" # All folders in packages/ are workspace packages
  - "apps/*" # All folders in apps/ are workspace apps
```

**Adding New Package**:

1. Create folder in `packages/` or `apps/`
2. Add `package.json` with `@sando/{name}`
3. No need to update `pnpm-workspace.yaml` (glob pattern covers it)
4. Run `pnpm install` to register

**Anti-pattern**:

```yaml
# ❌ WRONG: Hardcoding package names
packages:
  - 'packages/tokens'
  - 'packages/components'
  # New package? Must update this list manually (fragile)

# ✅ CORRECT: Use glob patterns
packages:
  - 'packages/*'  # Automatically includes all packages
```

---

## Package Responsibilities

### packages/tokens (@sando/tokens)

**Purpose**: Design token source files (JSON) and build system (Style Dictionary). Generates CSS + TypeScript token files.

**Key Files**:

- `src/ingredients/*.json` - Primitive tokens
- `src/flavors/*/flavor*.json` - Semantic tokens + modes
- `src/recipes/*.json` - Component tokens
- `build/index.js` - Build orchestrator
- `dist/sando-tokens/` - Generated output (CSS + TS)

**Exports**:

```json
{
  "exports": {
    "./ingredients": "./dist/sando-tokens/css/ingredients/ingredients.css",
    "./flavors/original": "./dist/sando-tokens/css/flavors/original/flavor.css",
    "./recipes/button": "./dist/sando-tokens/css/recipes/button.css",
    "./ts/ingredients": "./dist/sando-tokens/ts/ingredients/index.ts"
  }
}
```

**Build Commands**:

```bash
pnpm --filter @sando/tokens build         # Build tokens
pnpm --filter @sando/tokens dev           # Watch mode
pnpm --filter @sando/tokens test          # Token structure tests
```

**Dependencies**: None (leaf package in dependency graph)

---

### packages/components (@sando/components)

**Purpose**: Lit Web Components consuming tokens. Each component is self-contained in its own folder.

**Key Files**:

- `src/components/button/` - Button component (7-file pattern)
- `src/components/input/` - Input component
- `src/mixins/` - Shared mixins (FlavorableMixin)
- `src/styles/tokens.css.js` - Token CSS imports
- `dist/` - Compiled components

**Exports**:

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./button": "./dist/components/button/index.js",
    "./input": "./dist/components/input/index.js"
  }
}
```

**Build Commands**:

```bash
pnpm --filter @sando/components build     # Build components
pnpm --filter @sando/components test      # Unit tests
pnpm --filter @sando/components test:e2e  # E2E tests
```

**Dependencies**:

- `@sando/tokens` (workspace) - Token CSS/TS files
- `lit` - Web Component framework

---

### apps/docs (@sando/docs)

**Purpose**: Storybook documentation for components. Interactive component explorer.

**Key Files**:

- `.storybook/main.ts` - Storybook config
- `stories/` - Component stories
- `public/` - Static assets
- `storybook-static/` - Build output

**Dev/Build Commands**:

```bash
pnpm --filter @sando/docs dev             # Start Storybook (port 6006)
pnpm --filter @sando/docs build           # Build static Storybook
```

**Dependencies**:

- `@sando/components` (workspace) - Components to document
- `@sando/tokens` (workspace) - Tokens for theming
- `storybook` - Documentation framework

**Port**: 6006 (default, configurable in `.env.local`)

---

### apps/site (@sando/site)

**Purpose**: VitePress documentation site. Guides, tutorials, API reference.

**Key Files**:

- `.vitepress/config.ts` - VitePress config
- `components/` - Component docs (Markdown)
- `guides/` - Tutorial guides
- `.vitepress/dist/` - Build output

**Dev/Build Commands**:

```bash
pnpm --filter @sando/site dev             # Start VitePress (port 3000)
pnpm --filter @sando/site build           # Build static site
pnpm --filter @sando/site preview         # Preview built site
```

**Dependencies**:

- `@sando/components` (workspace) - Components to document
- `vitepress` - Static site generator

**Port**: 3000 (default, configurable in `.env.local`)

---

## Build Order Visualization

```
┌─────────────────┐
│  @sando/tokens  │  (Layer 1: Build first)
└────────┬────────┘
         │ generates CSS/TS files
         ▼
┌─────────────────┐
│ @sando/components│ (Layer 2: Consume tokens)
└────────┬────────┘
         │ imports components
         ▼
┌──────────────────────────┐
│ @sando/docs (Storybook)  │ (Layer 3: Document components)
│ @sando/site (VitePress)  │
└──────────────────────────┘
```

**Turborepo enforces this via `dependsOn: ["^build"]`** - Each package's build waits for dependencies to finish.

---

## Common Commands

### Root-Level Commands

Run from monorepo root (`C:\Users\rodri\SandoDesingSystem\`):

```bash
# Install dependencies (MUST use pnpm)
pnpm install

# Build all packages (respects build order)
pnpm build

# Development mode (parallel: Storybook + VitePress)
pnpm dev

# Run all tests across all packages
pnpm test

# Lint all packages
pnpm lint

# Format all files
pnpm format

# Clean all artifacts
pnpm clean
```

---

### Package-Specific Commands

**Filter syntax**: `pnpm --filter <package-name> <command>`

```bash
# Tokens
pnpm --filter @sando/tokens build
pnpm --filter @sando/tokens dev
pnpm --filter @sando/tokens test

# Components
pnpm --filter @sando/components build
pnpm --filter @sando/components test
pnpm --filter @sando/components test:e2e

# Storybook
pnpm --filter @sando/docs dev
pnpm --filter @sando/docs build

# VitePress
pnpm --filter @sando/site dev
pnpm --filter @sando/site build
pnpm --filter @sando/site preview
```

---

### Shorter Aliases (Root package.json)

```bash
# Tokens
pnpm tokens:build      # Build only tokens
pnpm tokens:dev        # Watch mode

# Components
pnpm components:build  # Build only components

# Storybook
pnpm docs:dev          # Start Storybook
pnpm docs:build        # Build Storybook

# VitePress
pnpm site:dev          # Start VitePress
pnpm site:build        # Build VitePress
pnpm site:preview      # Preview VitePress
```

---

## Turborepo Configuration Deep Dive

**File**: `turbo.json` (monorepo root)

### Task Configuration

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui", // Terminal UI for build progress
  "tasks": {
    "build": {
      "dependsOn": ["^build"], // ← Wait for dependencies to build
      "outputs": [
        "dist/**",
        ".next/**",
        "!.next/cache/**",
        "storybook-static/**",
        ".vitepress/dist/**"
      ],
      "env": ["NODE_ENV"] // Invalidate cache if NODE_ENV changes
    },
    "test": {
      "dependsOn": ["build"], // Tests need built packages
      "outputs": ["coverage/**", "test-results/**"],
      "cache": true
    },
    "dev": {
      "cache": false, // Never cache dev mode
      "persistent": true // Long-running process
    },
    "lint": {
      "outputs": [], // No file outputs
      "cache": true // Cache lint results
    }
  },
  "globalDependencies": [
    "**/.env.*local" // Invalidate cache if env files change
  ]
}
```

### Key Concepts

**`dependsOn: ["^build"]`**:

- `^` prefix means "dependencies" (packages this package depends on)
- Without `^`, it means "tasks in THIS package"
- Example: `"dependsOn": ["^build", "test"]` = dependencies build first, then THIS package's test task

**Outputs**:

- Files to cache for reuse
- Glob patterns: `dist/**` includes all files in dist/
- Negations: `!.next/cache/**` excludes files from cache

**Persistent Tasks**:

- Long-running processes (dev servers, watch modes)
- Cannot be cached (always run fresh)

---

## Build Cache Management

### Turborepo Cache Location

```
node_modules/.cache/turbo/  # Local cache (gitignored)
```

### When Cache is Used

Turborepo reuses cached outputs if:

1. Source files unchanged (git hash)
2. Dependencies unchanged (package.json, lockfile)
3. Environment variables unchanged (listed in `env`)
4. Global dependencies unchanged (.env files)

### Force Rebuild (Bypass Cache)

```bash
# Method 1: --force flag
pnpm build --force

# Method 2: Clean + rebuild
pnpm clean
pnpm build

# Method 3: Delete Turbo cache
rm -rf node_modules/.cache/turbo
pnpm build
```

### Token Build Cache

**Separate from Turborepo**: Tokens have their own incremental build cache.

**Location**: `packages/tokens/.build-cache.json`

**Force token rebuild**:

```bash
# Delete token cache
rm packages/tokens/.build-cache.json

# Or use --force flag
pnpm --filter @sando/tokens build -- --force
```

---

## Cross-Package Imports

### Importing Tokens in Components

**Pattern**:

```typescript
// packages/components/src/components/button/sando-button.ts
import { tokenStyles } from "../../styles/tokens.css.js"; // Local import
```

**Token CSS Import** (packages/components/src/styles/tokens.css.js):

```typescript
import { css } from "lit";

// Import generated token CSS
import ingredientsCss from "@sando/tokens/ingredients";
import flavorCss from "@sando/tokens/flavors/original";
import buttonRecipesCss from "@sando/tokens/recipes/button";

export const tokenStyles = css`
  ${ingredientsCss}
  ${flavorCss}
  ${buttonRecipesCss}
`;
```

**Why This Works**: `@sando/tokens` exports individual CSS files. Components import what they need.

---

### Importing Components in Apps

**Pattern** (apps/docs):

```typescript
// Storybook story
import "@sando/components/button"; // Auto-registers <sando-button>
import type { SandoButton } from "@sando/components/button";
```

**Pattern** (apps/site):

```vue
<!-- VitePress markdown -->
<script setup>
import "@sando/components/button";
</script>

<sando-button>Click me</sando-button>
```

---

## Adding New Packages

### Step-by-Step Guide

1. **Create folder**:

```bash
mkdir packages/new-package
cd packages/new-package
```

2. **Create package.json**:

```json
{
  "name": "@sando/new-package",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "exports": {
    ".": "./dist/index.js"
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "test": "vitest"
  },
  "dependencies": {
    "@sando/tokens": "workspace:*"
  }
}
```

3. **Add to workspace** (automatic - glob pattern covers it):

```bash
pnpm install  # Registers new package
```

4. **Create source files**:

```bash
mkdir src
touch src/index.ts
```

5. **Build and test**:

```bash
pnpm --filter @sando/new-package build
pnpm --filter @sando/new-package test
```

---

## Validation Checklist

### Workspace Structure

- [ ] All packages in `packages/` or `apps/` folders
- [ ] All packages use `@sando/` scope
- [ ] All packages have `package.json` with correct name
- [ ] `pnpm-workspace.yaml` includes glob patterns

### Dependencies

- [ ] Cross-package deps use `workspace:*` protocol
- [ ] No version numbers for workspace packages
- [ ] External deps (lit, vite) are NOT workspace protocol

### Build Order

- [ ] Tokens package has no workspace dependencies
- [ ] Components depend on tokens (`@sando/tokens: workspace:*`)
- [ ] Apps depend on components (`@sando/components: workspace:*`)
- [ ] `turbo.json` has `dependsOn: ["^build"]`

### Turborepo Config

- [ ] Build tasks have `outputs` defined
- [ ] Dev/watch tasks have `persistent: true`
- [ ] Dev/watch tasks have `cache: false`
- [ ] Test tasks depend on build (`dependsOn: ["build"]`)

### Commands

- [ ] `pnpm build` builds in correct order
- [ ] `pnpm dev` starts Storybook + VitePress
- [ ] `pnpm test` runs all tests
- [ ] Package filters work: `pnpm --filter @sando/tokens build`

---

## Related Guidelines

- [TOKEN_ARCHITECTURE.md](../01-design-system/TOKEN_ARCHITECTURE.md) - Three-layer token system (explains why tokens build first)
- [TOKEN_BUILD_SYSTEM.md](TOKEN_BUILD_SYSTEM.md) - Style Dictionary orchestrator and token build process
- [COMPONENT_ARCHITECTURE.md](COMPONENT_ARCHITECTURE.md) - Component structure (explains component package organization)
- [GIT_WORKFLOW.md](../03-development/GIT_WORKFLOW.md) - Changesets for versioning workspace packages

---

## External References

- [Turborepo Documentation](https://turbo.build/repo/docs) - Official Turborepo guide
- [pnpm Workspaces](https://pnpm.io/workspaces) - pnpm workspace documentation
- [pnpm Filtering](https://pnpm.io/filtering) - Using `--filter` for package-specific commands

---

## FAQ

### Why use pnpm instead of npm/yarn?

**Reasons**:

1. **Faster installs**: Symlinks packages instead of copying
2. **Disk space**: Single store for all package versions
3. **Strict mode**: Prevents phantom dependencies (can't import undeclared deps)
4. **Workspace protocol**: `workspace:*` ensures local packages always used

### What happens if I build components before tokens?

Build **fails**. Components import token CSS/TS files that don't exist until tokens are built.

**Error**:

```
Error: Cannot find module '@sando/tokens/ingredients'
```

**Solution**: Build tokens first, or use `pnpm build` (Turborepo handles order).

### Can I run multiple dev servers simultaneously?

**Yes**. `pnpm dev` runs Storybook (port 6006) and VitePress (port 3000) in parallel.

**Turborepo** uses `--parallel` flag for dev tasks (no dependency waiting).

### How do I know if cache is being used?

**Turborepo output**:

```
>>> FULL TURBO     # Cache hit (reused previous build)
>>> >>> LOCAL      # Cache miss (building fresh)
```

Use `--force` to bypass cache.

### Can I build a single package?

**Yes**:

```bash
# Build only tokens
pnpm --filter @sando/tokens build

# Build tokens and everything that depends on it
pnpm --filter @sando/tokens... build
```

---

## Changelog

### 1.0.0 (2025-11-02)

**Initial Release**

- Defined monorepo structure (packages vs apps)
- Documented Turborepo build order enforcement
- Explained pnpm workspace configuration
- Added package responsibilities and exports
- Included build cache management guide
- Added cross-package import patterns
- Created validation checklist

---

**This guideline establishes the foundation for the Sando Design System monorepo architecture. All build, dependency, and package organization decisions reference these rules.**
