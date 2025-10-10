# Context7 MCP Quick Reference Guide

**Version**: 1.0
**Last Updated**: 2025-10-09
**Purpose**: Quick reference for agents using Context7 MCP server for documentation access

---

## Overview

The Context7 MCP server provides up-to-date documentation for programming languages, frameworks, and tools. This guide lists all available library IDs for the Sando Design System agent team.

---

## Quick Start

### 1. Resolve Library ID (if needed)

```
Tool: mcp__context7__resolve-library-id
Parameter: libraryName="lit"
Returns: '/lit-element/lit'
```

### 2. Fetch Documentation

```
Tool: mcp__context7__get-library-docs
Parameters:
  - context7CompatibleLibraryID="/lit-element/lit"
  - topic="reactive-controllers"
  - tokens=5000
```

---

## Library IDs by Category

### Web Components & Frameworks

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **Lit** | `/lit-element/lit` | Web Components framework (v3.3.1) |
| **React** | `/facebook/react` | React framework (v18+) |
| **Vue** | `/vuejs/core` | Vue 3 framework |
| **Angular** | `/angular/angular` | Angular framework (v15+) |
| **Svelte** | `/sveltejs/svelte` | Svelte framework |

### Build Tools & Bundlers

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **Vite** | `/vitejs/vite` | Build tool and dev server (v5.0.8) |
| **Rollup** | `/rollup/rollup` | JavaScript bundler |
| **esbuild** | `/evanw/esbuild` | Fast bundler and transpiler |
| **Style Dictionary** | `/amzn/style-dictionary` | Token transformation (v4.0.0) |
| **Turborepo** | `/vercel/turbo` | Monorepo build orchestration (v2.5.8) |

### Testing Frameworks

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **Playwright** | `/microsoft/playwright` | E2E testing (v1.55.1) |
| **Jest** | `/jestjs/jest` | Unit testing framework |
| **Vitest** | `/vitest-dev/vitest` | Vite-native testing (v3.2.4) |
| **axe-core** | `/dequelabs/axe-core` | Accessibility testing |
| **Open WC** | `/open-wc/open-wc` | Web Components testing utilities |
| **Testing Library** | `/testing-library/dom-testing-library` | DOM testing utilities |

### DevOps & CI/CD

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **GitHub Actions** | `/actions/toolkit` | Workflow automation |
| **NPM** | `/npm/cli` | Package publishing |
| **pnpm** | `/pnpm/pnpm` | Package manager (v8.15.0) |
| **Changesets** | `/changesets/changesets` | Version management |
| **Vercel** | `/vercel/vercel` | Deployment platform |

### Code Quality

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **ESLint** | `/eslint/eslint` | Linting |
| **Prettier** | `/prettier/prettier` | Code formatting |
| **TypeScript** | `/microsoft/TypeScript` | Language (v5.9.3) |

### Documentation

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **Storybook** | `/storybookjs/storybook` | Component documentation (v8.6.14) |
| **VitePress** | `/vuejs/vitepress` | Documentation site (v1.6.4) |

### Accessibility

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **WCAG** | `/w3c/wcag` | Web accessibility standards |
| **ARIA Practices** | `/w3c/aria-practices` | ARIA design patterns |

### Performance

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **web-vitals** | `/GoogleChrome/web-vitals` | Core Web Vitals library |
| **Lighthouse** | `/GoogleChrome/lighthouse` | Performance auditing |
| **size-limit** | `/ai/size-limit` | Bundle size limiting |

### Internationalization

| Library | Context7 ID | Description |
|---------|------------|-------------|
| **Intl (ECMA-402)** | `/tc39/ecma402` | Intl specification |
| **i18next** | `/i18next/i18next` | Translation framework |

---

## Agent-Specific Library Lists

### frontend-developer

**Primary Libraries:**
- `/lit-element/lit` - Lit framework
- `/microsoft/TypeScript` - TypeScript
- `/microsoft/playwright` - E2E testing
- `/jestjs/jest` - Unit testing
- `/vitest-dev/vitest` - Vite testing
- `/open-wc/open-wc` - Web Components testing

**Common Topics:**
- `reactive-controllers`, `decorators`, `directives`, `shadow-dom`

---

### developer-tooling-specialist

**Primary Libraries:**
- `/vitejs/vite` - Build configuration
- `/rollup/rollup` - Bundling
- `/evanw/esbuild` - Transpilation
- `/amzn/style-dictionary` - Token transformation
- `/vercel/turbo` - Monorepo orchestration
- `/eslint/eslint` - Linting
- `/prettier/prettier` - Formatting

**Common Topics:**
- `performance`, `build-optimizations`, `caching`, `plugins`, `migration`

---

### ecosystem-integration-agent

**Primary Libraries:**
- `/facebook/react` - React integration
- `/vuejs/core` - Vue 3 integration
- `/angular/angular` - Angular integration
- `/lit/lit` - @lit/react wrapper
- `/sveltejs/svelte` - Svelte integration

**Common Topics:**
- `web-components`, `custom-elements`, `ssr`, `typescript-types`

---

### design-system-architect

**Primary Libraries:**
- `/lit-element/lit` - Architecture
- `/amzn/style-dictionary` - Token system
- `/vitejs/vite` - Build architecture
- `/storybookjs/storybook` - Documentation platform
- `/microsoft/playwright` - Testing infrastructure
- `/vitest-dev/vitest` - Testing framework

**Common Topics:**
- `architecture`, `patterns`, `best-practices`, `scalability`

---

### qa-expert

**Primary Libraries:**
- `/microsoft/playwright` - E2E testing
- `/jestjs/jest` - Unit testing
- `/vitest-dev/vitest` - Vite testing
- `/dequelabs/axe-core` - Accessibility testing
- `/open-wc/open-wc` - Web Components testing
- `/testing-library/dom-testing-library` - DOM testing

**Common Topics:**
- `selectors`, `shadow-dom`, `api`, `configuration`, `assertions`

---

### devops-automation-engineer

**Primary Libraries:**
- `/actions/toolkit` - GitHub Actions
- `/npm/cli` - NPM publishing
- `/changesets/changesets` - Versioning
- `/pnpm/pnpm` - Package manager
- `/vercel/vercel` - Deployment

**Common Topics:**
- `workflow-syntax`, `publish`, `github-actions`, `ci-cd`, `deployment`

---

### accessibility-advocate

**Primary Libraries:**
- `/dequelabs/axe-core` - Accessibility testing
- `/w3c/aria-practices` - ARIA patterns
- `/w3c/wcag` - WCAG standards

**Common Topics:**
- `rules`, `patterns`, `dialog`, `techniques`, `success-criteria`

---

### performance-monitor

**Primary Libraries:**
- `/GoogleChrome/web-vitals` - Core Web Vitals
- `/GoogleChrome/lighthouse` - Performance auditing
- `/ai/size-limit` - Bundle size

**Common Topics:**
- `api`, `lighthouse-ci`, `configuration`, `metrics`

---

## Common Topics by Library

### Lit (`/lit-element/lit`)
- `reactive-controllers` - State management
- `decorators` - @property, @state, @query
- `directives` - Custom template directives
- `shadow-dom` - Shadow DOM patterns
- `lifecycle` - Component lifecycle methods
- `events` - Custom event patterns
- `performance` - Optimization strategies

### TypeScript (`/microsoft/TypeScript`)
- `decorators` - Decorator syntax
- `strict-mode` - Strict type checking
- `generics` - Generic types
- `utility-types` - Built-in utility types
- `type-inference` - Type inference rules

### Playwright (`/microsoft/playwright`)
- `selectors` - Element selectors
- `shadow-dom` - Shadow DOM queries
- `accessibility` - Accessibility selectors
- `fixtures` - Test fixtures
- `assertions` - Assertion library

### Vite (`/vitejs/vite`)
- `performance` - Build optimization
- `build-optimizations` - Production builds
- `plugins` - Plugin development
- `ssr` - Server-side rendering
- `configuration` - Config options

### Style Dictionary (`/amzn/style-dictionary`)
- `transforms` - Token transforms
- `formats` - Output formats
- `migration` - Version migration
- `architecture` - Token architecture
- `configuration` - Config setup

### axe-core (`/dequelabs/axe-core`)
- `rules` - Accessibility rules
- `api` - JavaScript API
- `configuration` - Rule configuration
- `shadow-dom` - Shadow DOM testing

---

## Best Practices

### When to Use Context7

✅ **DO use when:**
- Checking syntax for specific framework versions
- Understanding new API capabilities
- Resolving deprecation warnings
- Learning framework-specific best practices
- Debugging version-specific issues
- Researching migration paths

❌ **DON'T use when:**
- General web standards (HTML, CSS, DOM) - use built-in knowledge
- Sando-specific patterns - use project context
- Architecture decisions - use agent collaboration
- Design patterns - use general knowledge

### Token Limits

- Default: `tokens=5000`
- For comprehensive docs: `tokens=10000`
- For quick reference: `tokens=2000`

### Topic Specificity

Be specific with topics for better results:
- ✅ Good: `topic="shadow-dom"`
- ✅ Good: `topic="reactive-controllers"`
- ❌ Poor: `topic="lit"`
- ❌ Poor: `topic="documentation"`

---

## Troubleshooting

### Library ID Not Found

If `resolve-library-id` returns no results:
1. Try alternative names (e.g., "react" instead of "reactjs")
2. Check if using the full GitHub org/repo format (e.g., "facebook/react")
3. Use explicit ID format: `/org/project` or `/org/project/version`

### Empty Documentation Response

If `get-library-docs` returns empty:
1. Try a more general topic
2. Reduce token limit (may be timing out)
3. Check if library ID is correct

### Outdated Documentation

Context7 retrieves current documentation, but if results seem outdated:
1. Verify the library ID points to the correct version
2. Use version-specific IDs: `/org/project/v3.0.0`

---

## Version-Specific Library IDs

When you need documentation for a specific version:

```
# General (latest)
/lit-element/lit

# Version-specific
/lit-element/lit/v3.3.1
/facebook/react/v18.2.0
/microsoft/TypeScript/v5.9.0
```

---

## Frequently Used Queries

### Lit Shadow DOM Queries
```
mcp__context7__get-library-docs('/lit-element/lit', 'shadow-dom')
```

### React Web Components Integration
```
mcp__context7__get-library-docs('/facebook/react', 'web-components')
```

### Playwright Shadow DOM Selectors
```
mcp__context7__get-library-docs('/microsoft/playwright', 'selectors')
```

### Style Dictionary Transforms
```
mcp__context7__get-library-docs('/amzn/style-dictionary', 'transforms')
```

### axe-core Rule Configuration
```
mcp__context7__get-library-docs('/dequelabs/axe-core', 'rules')
```

### Vite Build Optimization
```
mcp__context7__get-library-docs('/vitejs/vite', 'build-optimizations')
```

---

## Quick Command Templates

### Resolve + Fetch Pattern

```typescript
// Step 1: Resolve
const libId = await resolveLibraryId("playwright");
// Returns: '/microsoft/playwright'

// Step 2: Fetch
const docs = await getLibraryDocs(libId, "shadow-dom", 5000);
```

### Direct Fetch (When ID Known)

```typescript
const docs = await getLibraryDocs(
  '/lit-element/lit',
  'reactive-controllers',
  5000
);
```

---

## Updates & Maintenance

### Quarterly Review Checklist

- [ ] Verify all library IDs are still valid
- [ ] Add new libraries adopted by Sando Design System
- [ ] Update version-specific IDs for major upgrades
- [ ] Review most-used topics and add to this guide
- [ ] Update agent-specific library lists

### When to Update

1. **Major framework upgrade** - Update version-specific IDs
2. **New tool adoption** - Add library ID to relevant categories
3. **Agent role changes** - Update agent-specific lists
4. **Documentation improvements** - Add new common topics

---

## Support

For issues with Context7 MCP integration:

1. **Check agent prompt** - Verify Context7 section exists
2. **Verify MCP server** - Ensure Context7 server is running
3. **Test library ID** - Use `resolve-library-id` to validate
4. **Review analysis doc** - See `.claude/agents/mcp-context7-integration-analysis.md`

---

**Document Version**: 1.0
**Next Review**: 2026-01-09 (Quarterly)
**Maintained by**: Sando Design System Team
