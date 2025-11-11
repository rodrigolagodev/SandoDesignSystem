# CLAUDE.md

## 🧠 Critical Instruction: Read the Source of Truth

This file provides the high-level overview, tech stack, and the definitive index of guidelines for the **Sando Design System**.

**CRITICAL**: Do NOT rely on this file for architectural or development rules. This file's purpose is to **index and load** the official guidelines located in the `.claude/guidelines/` directory.

**You MUST load and reference the XML files in the `.claude/guidelines/` directory as the non-negotiable, single source of truth** for all tasks, analysis, and code generation.

---

## Project Overview

**Sando Design System** is a modern, accessible, token-based design system built as a monorepo using Turborepo, pnpm workspaces, Lit Web Components, and Style Dictionary.

The name "Sando" is inspired by the Japanese "katsu sando" sandwich - a metaphor for the three-layer token architecture (Ingredients, Flavors, Recipes) that forms the core of this system.

## Tech Stack

- **Monorepo**: Turborepo 2.5.8 with pnpm 8.15.0 workspaces
- **Components**: Lit 3.3.1 (Web Components)
- **Tokens**: Style Dictionary 4.0.0
- **Build**: Vite 5.0.8
- **Testing**: Vitest 4.0.4 (@vitest/ui 4.0.4 + @vitest/coverage-v8 4.0.4) + Playwright 1.55.1
- **Docs**: Storybook 8.6.14 + VitePress 1.6.4
- **Language**: TypeScript 5.9.3 (strict mode)

---

## Project Guidelines (Single Source of Truth)

**CRITICAL**: All Sando Design System decisions MUST follow the official guidelines located in `.claude/guidelines/`.

### Guidelines Index (Primary Reference)

@.claude/guidelines/GUIDELINES_INDEX.md

### Core Architecture Guidelines

**Token Architecture** - Three-layer system (Ingredients/Flavors/Recipes):
@.claude/guidelines/01-design-system/TOKEN_ARCHITECTURE.md

**Component Architecture** - Monolithic 7-file pattern:
@.claude/guidelines/02-architecture/COMPONENT_ARCHITECTURE.md

**Monorepo Structure** - Turborepo + pnpm setup:
@.claude/guidelines/02-architecture/MONOREPO_STRUCTURE.md

**Token Build System** - Style Dictionary orchestrator:
@.claude/guidelines/02-architecture/TOKEN_BUILD_SYSTEM.md

### Development Standards

**Code Style** - TypeScript, imports, formatting:
@.claude/guidelines/03-development/CODE_STYLE.md

**Naming Conventions** - Components, files, tokens:
@.claude/guidelines/03-development/NAMING_CONVENTIONS.md

**Git Workflow** - GitHub Flow, conventional commits:
@.claude/guidelines/03-development/GIT_WORKFLOW.md

**Testing Strategy** - Test pyramid, coverage requirements:
@.claude/guidelines/03-development/TESTING_STRATEGY.md

### Quality Standards

**WCAG Compliance** - Accessibility requirements:
@.claude/guidelines/04-accessibility/WCAG_COMPLIANCE.md

**Test Coverage** - Coverage thresholds:
@.claude/guidelines/05-quality/TEST_COVERAGE.md

**Performance Budgets** - Bundle sizes, Core Web Vitals:
@.claude/guidelines/05-quality/PERFORMANCE_BUDGETS.md

**Security Standards** - XSS prevention, CSP:
@.claude/guidelines/05-quality/SECURITY_STANDARDS.md

### Documentation Standards

**API Reference** - JSDoc, VitePress tables:
@.claude/guidelines/06-documentation/API_REFERENCE.md

**Storybook Stories** - Story organization:
@.claude/guidelines/06-documentation/STORYBOOK_STORIES.md

**Inline Code Docs** - JSDoc standards:
@.claude/guidelines/06-documentation/INLINE_CODE_DOCS.md

---

## AI Agent System

The `.claude/agents/` directory contains **18 production agents** specialized for design system development. Each agent has specific expertise and references guidelines as the single source of truth.

**Core Agents (8):**

- `design-system-architect`
- `design-system-pm`
- `ui-designer`
- `frontend-developer`
- `technical-writer`
- `qa-expert`
- `devops-automation-engineer`
- `developer-tooling-specialist`

**Phase 2 - Design Operations (4):**

- `design-ops-specialist`
- `version-migration-manager`
- `ecosystem-integration-agent`
- `performance-monitor`

**Phase 3 - Quality & Architecture (2):**

- `security-compliance-auditor`
- `component-composition-specialist`

**Phase 4 - Community & Growth (4):**

- `community-contribution-manager`
- `analytics-insights-agent`
- `localization-i18n-specialist`
- `accessibility-advocate`

**Slash Commands:**

- `/project-status` - Comprehensive project status (git, builds, tests, coverage)

**Skills:**

- `component-creator` - Scaffold new components with 7-file structure
- `command-creator` - Create new slash commands following Sando's Golden Rule
- `skill-creator` - Create new skills with progressive disclosure

**Usage**: Invoke agents via Task tool. Each agent will reference guidelines automatically.

---

## Important Notes

### Package Manager

**MUST use pnpm**. Do NOT use npm or yarn. The repo uses pnpm workspaces.

### Node Version

Requires Node.js >=20.0.0 (specified in package.json engines)

### Environment Variables

Optional: Copy `.env.example` to `.env.local` to customize ports.
Default ports:

- Storybook: 6006
- VitePress: 3000

### Build Caching

Turborepo caches build outputs. To force rebuild:
`pnpm clean && pnpm build`
or
`pnpm build -- --force`

---

## CI/CD Workflows

The project uses GitHub Actions for automation:

### Active Workflows

1. **pr.yml** - PR Validation (Informational)
   - Runs tests, lint, and build on PRs
   - **Tests & Lint**: Informational only (don't block merge)
   - **Build**: Required (blocks merge if fails)
   - Purpose: Provide feedback without blocking development

2. **deploy.yml** - Documentation Deployment
   - Deploys Storybook + VitePress to GitHub Pages
   - Runs automatically on push to master
   - URLs:
     - Storybook: `https://rodrigolagodev.github.io/SandoDesignSystem/storybook/`
     - Docs: `https://rodrigolagodev.github.io/SandoDesignSystem/docs/`

### Development Phase Configuration

During active development:

- ✅ PRs don't require approval (can self-merge)
- ✅ Tests/lint are informational (don't block)
- ✅ Only build failures block merge
- ⚠️ No automatic npm publishing (configured for future)

### Framework Integration

- **Vanilla HTML/JS**: Direct `<sando-button>` usage
- **React**: Import and use (see components README for TypeScript setup)
- **Vue 3**: Configure `isCustomElement` in vite.config
- **Angular**: Add `CUSTOM_ELEMENTS_SCHEMA`
- **Svelte**: Direct usage

Details in `packages/components/README.md`

## Versioning & Publishing

Uses Changesets (configured but not publishing yet):

```bash
pnpm changeset           # Create changeset
pnpm version-packages    # Bump versions
# pnpm release           # Disabled - for future npm publishing
```

**Note**: NPM publishing is currently disabled. To enable:

1. Create npm token at npmjs.com
2. Add `NPM_TOKEN` secret to GitHub repository
3. Re-enable release workflow if needed

---

## Key Files

- `turbo.json` - Turborepo task configuration
- `pnpm-workspace.yaml` - Workspace definition
- `packages/tokens/build/index.js` - Token build orchestrator
- `packages/components/ARCHITECTURE.md` - Component architecture details
- `.claude/guidelines/GUIDELINES_INDEX.md` - Complete guidelines index
- `.claude/agents/` - 18 specialized agents
