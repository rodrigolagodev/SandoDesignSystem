# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sando Design System** is a modern, accessible, token-based design system built as a monorepo using Turborepo, pnpm workspaces, Lit Web Components, and Style Dictionary.

The name "Sando" is inspired by the Japanese "katsu sando" sandwich - a metaphor for the three-layer token architecture (Ingredients, Flavors, Recipes) that forms the core of this system.

## Tech Stack

- **Monorepo**: Turborepo 2.5.8 with pnpm 8.15.0 workspaces
- **Components**: Lit 3.3.1 (Web Components)
- **Tokens**: Style Dictionary 4.0.0
- **Build**: Vite 5.0.8
- **Testing**: Vitest 3.2.4 + Playwright 1.55.1
- **Docs**: Storybook 8.6.14 + VitePress 1.6.4
- **Language**: TypeScript 5.9.3 (strict mode)

## Architecture

### Monorepo Structure

```
sando-design-system/
├── packages/
│   ├── tokens/           @sando/tokens - Design tokens (Style Dictionary)
│   └── components/       @sando/components - Lit Web Components
├── apps/
│   ├── docs/            @sando/docs - Storybook (localhost:6006)
│   └── site/            @sando/site - VitePress docs (localhost:3000)
└── .claude/
    └── agents/          18 specialized AI agents for design system development
```

### Three-Layer Token Architecture

This is the CORE architectural pattern of the design system:

**Layer 1: Ingredients** (Primitives)

- Raw, absolute values with NO references to other tokens
- Examples: `color-brand-500: #f97415`, `space-base: 4px`
- Location: `packages/tokens/src/ingredients/*.json`

**Layer 2: Flavors** (Semantic)

- ONLY reference Ingredients (never other Flavors or Recipes)
- Provide contextual meaning and enable theming
- Examples: `color-background-base: {color.neutral.100}`, `spacing-comfortable: {space.base}`
- Location: `packages/tokens/src/flavors/*.json`

**Layer 3: Recipes** (Component-specific)

- ONLY reference Flavors (never Ingredients directly)
- Component-specific tokens
- Examples: `button-background-color: {color.action.solid.background.default}`
- Location: `packages/tokens/src/recipes/*.json`

**Critical Rule**: This layering is STRICT. Violations break the theming system.

### Monolithic Component Architecture

Each component is **completely self-contained** in its own folder:

```
packages/components/src/components/button/
├── sando-button.ts              # Component implementation (Lit)
├── sando-button.types.ts        # TypeScript types
├── sando-button.stories.ts      # Storybook documentation
├── sando-button.test.ts         # Unit tests (Vitest)
├── sando-button.spec.ts         # E2E tests (Playwright)
├── sando-button.a11y.test.ts    # Accessibility tests (axe-core)
└── index.ts                     # Barrel export
```

**Benefits**: Portable, easy to find everything, clear ownership, minimal shared dependencies.

## Common Development Commands

### Root-Level Commands

```bash
# Install dependencies (REQUIRED: use pnpm)
pnpm install

# Build all packages (tokens must be built before components)
pnpm build

# Development mode (parallel: Storybook on :6006, VitePress on :3000)
pnpm dev

# Run all tests
pnpm test

# Lint and format
pnpm lint
pnpm format
```

### Package-Specific Commands

```bash
# Tokens (@sando/tokens)
pnpm --filter @sando/tokens build          # Build tokens (required first!)
pnpm --filter @sando/tokens dev            # Watch mode
pnpm --filter @sando/tokens test           # Test tokens
pnpm --filter @sando/tokens test:structure # Token structure tests

# Components (@sando/components)
pnpm --filter @sando/components build      # Build components
pnpm --filter @sando/components test       # Unit tests
pnpm --filter @sando/components test:e2e   # E2E tests

# Storybook (@sando/docs)
pnpm --filter @sando/docs dev              # Start Storybook (:6006)
pnpm --filter @sando/docs build            # Build Storybook

# VitePress (@sando/site)
pnpm --filter @sando/site dev              # Start VitePress (:3000)
pnpm --filter @sando/site build            # Build VitePress
```

### Shorter Aliases

```bash
# From root package.json
pnpm tokens:build      # Build only tokens
pnpm components:build  # Build only components
pnpm docs:dev          # Start Storybook
pnpm site:dev          # Start VitePress
```

## Build Order Dependencies

**CRITICAL**: Tokens MUST be built before components.

```
1. @sando/tokens → build (generates CSS/TS token files)
2. @sando/components → build (consumes token files)
3. @sando/docs → dev/build (imports components)
4. @sando/site → dev/build (imports components)
```

Turborepo handles this automatically via `dependsOn: ["^build"]` in `turbo.json`.

## Testing Commands

### Tokens Testing

```bash
# From packages/tokens/
pnpm test                  # Clean output (recommended)
pnpm test:verbose          # Detailed output
pnpm test:ui               # Interactive browser UI
pnpm test:watch            # Auto-rerun on changes
pnpm test:coverage         # Coverage report

# Specific test suites
pnpm test:structure        # Token structure validation
pnpm test:references       # Token reference integrity
pnpm test:values           # Token value validation
pnpm test:accessibility    # WCAG contrast compliance
pnpm test:build            # Output validation
```

### Components Testing

```bash
# From packages/components/
pnpm test                  # Unit tests (Vitest)
pnpm test:watch            # Watch mode
pnpm test:coverage         # Coverage report
pnpm test:e2e              # E2E tests (Playwright)
pnpm test:e2e:ui           # E2E with UI
```

## Token System Details

### Token Naming Convention

```
CSS Custom Properties: --sando-{category}-{property}-{variant?}-{state?}

Examples:
--sando-color-brand-500                            (ingredient)
--sando-color-background-base                      (flavor)
--sando-button-solid-backgroundColor-default       (recipe)
--sando-button-solid-backgroundColor-hover         (recipe with state)
```

### Token Build Process

The token build uses a custom Style Dictionary orchestrator:

```
packages/tokens/build/
├── index.js                     # Main orchestrator entry
├── core/
│   ├── orchestrator.js          # Coordinates layer builds
│   ├── layer-builder.js         # Builds individual layers
│   └── metrics.js               # Build performance metrics
├── configs/                     # Layer configurations
│   ├── ingredients.config.js
│   ├── flavors.config.js
│   └── recipes.config.js
├── formats/                     # Custom output formats
│   ├── css/                     # CSS generation
│   └── typescript/              # TypeScript generation
└── transforms/                  # Custom transforms
    ├── name-css-sando.js        # Adds --sando- prefix
    └── css-var-reference.js     # Converts refs to var()
```

Build outputs:

- `dist/sando-tokens/css/` - CSS custom properties
- `dist/sando-tokens/ts/` - TypeScript (CSS var names + absolute values)

### Adding New Tokens

1. Add to source: `packages/tokens/src/{layer}/*.json`
2. Build: `pnpm tokens:build` or `pnpm build`
3. Use in components: `var(--sando-your-new-token)`

## Component Development

### Creating New Components

1. Create folder: `packages/components/src/components/your-component/`
2. Create ALL required files (see monolithic structure above)
3. Export from `packages/components/src/index.ts`
4. Add to package.json exports if needed

**Template**: See `packages/components/docs/COMPONENT_TEMPLATE.md`

### Component Guidelines

- Use Lit 3.3.1 (no React/Vue - these are Web Components)
- Consume tokens from Recipes layer: `var(--sando-component-*)`
- Follow WCAG 2.1 AA accessibility standards
- Include comprehensive tests (unit + E2E + a11y)
- Document in Storybook stories
- TypeScript strict mode enabled

### Token Consumption in Components

```typescript
import { css } from 'lit';
import { token } from '@sando/components/styles/tokens';
import { tokens } from '@sando/tokens/recipes';

static styles = css`
  .button {
    /* Recommended: Using token helper */
    background: ${token(tokens.button.solid.backgroundColor.default)};

    /* Also valid: Direct CSS variable */
    color: var(--sando-button-solid-textColor-default);
  }
`;
```

## Theming System

Themes are applied via the `flavor` HTML attribute:

```html
<!-- Global theme -->
<html flavor="dark">
	<body>
		<sando-button>Dark button</sando-button>
	</body>
</html>

<!-- Section theme -->
<div flavor="strawberry">
	<sando-button>Strawberry themed</sando-button>
</div>

<!-- Component override via CSS -->
<sando-button style="--sando-button-solid-backgroundColor-default: #custom;">
	Custom color
</sando-button>
```

## AI Agent System

The `.claude/agents/` directory contains **18 production agents** specialized for design system development:

**Core Agents (8):**

- `design-system-architect` - Three-layer token architecture, Web Components, theming
- `design-system-pm` - Product roadmap, RICE prioritization, adoption metrics
- `ui-designer` - Interface design, Ingredients/Flavors tokens, WCAG 2.1 AA
- `frontend-developer` - Lit Web Components, token consumption, accessibility
- `technical-writer` - API docs, token guides, Storybook documentation
- `qa-expert` - Test strategy, unit/E2E/a11y tests, WCAG validation
- `devops-automation-engineer` - CI/CD pipelines, NPM publishing, Storybook deployment
- `developer-tooling-specialist` - Build optimization, DX, Style Dictionary, tooling

**Phase 2 - Design Operations (4):**

- `design-ops-specialist` - Token versioning, Figma automation, visual regression
- `version-migration-manager` - Breaking changes, codemods, deprecation tracking
- `ecosystem-integration-agent` - React/Vue/Angular wrappers, SSR support
- `performance-monitor` - Core Web Vitals, bundle sizes, Lighthouse CI

**Phase 3 - Quality & Architecture (2):**

- `security-compliance-auditor` - Vulnerability scanning, XSS prevention, license compliance
- `component-composition-specialist` - Compound components, headless patterns, layout primitives

**Phase 4 - Community & Growth (3):**

- `community-contribution-manager` - Issue triage, PR reviews, RFC process
- `analytics-insights-agent` - Usage metrics, adoption tracking, developer satisfaction
- `localization-i18n-specialist` - Multi-language support, RTL layouts, locale formatting

**Meta Agents (3):**

- `general-purpose` - Complex searches and multi-step tasks
- `statusline-setup` - Configure Claude Code status line
- `output-style-setup` - Configure Claude Code output styles

Each agent has specific expertise. See `.claude/agents/team-agents-analysis.md` for collaboration workflows. Use this agents for specific tasks.

## Important Notes

### Build Caching

Turborepo caches build outputs. To force rebuild:

```bash
pnpm clean              # Clean all artifacts
pnpm build              # Fresh build

# Or bypass cache
pnpm build -- --force
```

### Token Build Cache

Tokens have build cache: `packages/tokens/.build-cache.json`

Force rebuild: `rm .build-cache.json && pnpm build`

### Package Manager

**MUST use pnpm**. Do NOT use npm or yarn. The repo uses pnpm workspaces.

### Node Version

Requires Node.js >=18.0.0 (specified in package.json engines)

### Environment Variables

Optional: Copy `.env.example` to `.env.local` to customize ports.

Default ports:

- Storybook: 6006
- VitePress: 3000

## Framework Integration

The Web Components work with ANY framework:

- **Vanilla HTML/JS**: Direct `<sando-button>` usage
- **React**: Import and use (see components README for TypeScript setup)
- **Vue 3**: Configure `isCustomElement` in vite.config
- **Angular**: Add `CUSTOM_ELEMENTS_SCHEMA`
- **Svelte**: Direct usage

Details in `packages/components/README.md`

## Versioning & Publishing

Uses Changesets:

```bash
pnpm changeset           # Create changeset
pnpm version-packages    # Bump versions
pnpm release             # Build and publish to npm
```

## Key Files

- `turbo.json` - Turborepo task configuration
- `pnpm-workspace.yaml` - Workspace definition
- `packages/tokens/build/index.js` - Token build orchestrator
- `packages/components/ARCHITECTURE.md` - Component architecture details
- `.claude/agents/team-agents-analysis.md` - Agent team documentation
