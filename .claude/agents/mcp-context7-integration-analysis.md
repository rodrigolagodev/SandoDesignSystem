# MCP Context7 Documentation Integration Analysis

**Date**: 2025-10-09
**Purpose**: Identify which Sando Design System agents should leverage the Context7 MCP server for up-to-date documentation access

---

## Executive Summary

The Context7 MCP server provides access to up-to-date documentation for programming languages and frameworks. After analyzing all 20 Sando Design System agents, **12 agents** would significantly benefit from Context7 integration to access current documentation for their technical stacks.

### High Priority Integration (8 agents)
These agents work directly with code implementation and would benefit most:

1. **frontend-developer** - Lit, TypeScript, Web Components
2. **developer-tooling-specialist** - Vite, Rollup, esbuild, Style Dictionary, Turbo/Nx
3. **ecosystem-integration-agent** - React, Vue, Angular framework wrappers
4. **design-system-architect** - Lit, Vite, Style Dictionary, Storybook
5. **qa-expert** - Jest, Playwright, axe-core, testing frameworks
6. **devops-automation-engineer** - GitHub Actions, CI/CD, NPM publishing
7. **accessibility-advocate** - WCAG standards, axe-core, ARIA patterns
8. **performance-monitor** - Lighthouse, web-vitals, bundling tools

### Medium Priority Integration (4 agents)
These agents have occasional need for technical documentation:

9. **technical-writer** - Documentation frameworks, Storybook APIs
10. **component-builder** - Composite of frontend-developer needs
11. **design-ops-specialist** - Figma APIs, visual regression tools
12. **localization-i18n-specialist** - Intl APIs, i18n libraries

### No Integration Needed (8 agents)
These agents focus on strategy, design, or management rather than code implementation:

- design-system-pm
- ui-designer
- community-contribution-manager
- analytics-insights-agent
- version-migration-manager
- security-compliance-auditor
- component-composition-specialist
- agent-system-optimizer

---

## Detailed Agent Analysis

### 🔥 HIGH PRIORITY AGENTS

#### 1. **frontend-developer** ⭐⭐⭐⭐⭐

**Primary Technologies:**
- Lit 3.3.1 (Web Components)
- TypeScript 5.9.3
- Shadow DOM APIs
- Custom Elements v1
- Jest + @web/test-runner
- Playwright

**Why Context7 Integration is Critical:**
- Lit framework evolves rapidly with new reactive controller patterns, decorators, and rendering optimizations
- TypeScript updates frequently affect strict mode compliance and type inference
- Shadow DOM and Custom Elements specifications have ongoing updates
- Testing library APIs (Jest, Playwright) change between versions

**Recommended Context7 Queries:**
- `/lit-element/lit` - Lit framework documentation
- `/microsoft/TypeScript` - TypeScript language reference
- `/microsoft/playwright` - E2E testing framework
- `/jestjs/jest` - Unit testing framework
- `/open-wc/open-wc` - Web Components testing utilities

**Integration Point in Agent:**
Add to "Phase 1: Component Discovery & Planning" section after the context manager query:

```markdown
**Documentation Lookup (if needed):**
When working with unfamiliar Lit patterns, TypeScript features, or testing APIs, use Context7 MCP:
- Resolve library ID: `resolve-library-id` with library name (e.g., "lit", "playwright")
- Fetch docs: `get-library-docs` with library ID and specific topic
- Example: Get Lit reactive controller docs for complex state management patterns
```

---

#### 2. **developer-tooling-specialist** ⭐⭐⭐⭐⭐

**Primary Technologies:**
- Vite 5.0.8
- Rollup (bundling)
- esbuild (transpilation)
- Style Dictionary 4.0.0
- Turborepo 2.5.8
- pnpm 8.15.0
- ESLint + Prettier

**Why Context7 Integration is Critical:**
- Build tool configurations change significantly between versions
- Style Dictionary 4.0 introduced major breaking changes from 3.x
- Monorepo tools (Turbo/Nx) have different optimization strategies per version
- Plugin ecosystems evolve rapidly

**Recommended Context7 Queries:**
- `/vitejs/vite` - Vite build configuration
- `/rollup/rollup` - Bundling optimizations
- `/evanw/esbuild` - Fast transpilation
- `/amzn/style-dictionary` - Token transformation
- `/vercel/turbo` - Monorepo orchestration

**Integration Point in Agent:**
Add to "Phase 1: Analysis & Diagnosis" section:

```markdown
**Technology Documentation Access:**
Before configuring build tools or diagnosing performance issues, use Context7 MCP to access:
- Latest Vite optimization patterns (resolve: "vite", topic: "performance")
- Style Dictionary 4.x migration guide (resolve: "style-dictionary", topic: "migration")
- Turborepo caching strategies (resolve: "turborepo", topic: "caching")
```

---

#### 3. **ecosystem-integration-agent** ⭐⭐⭐⭐⭐

**Primary Technologies:**
- React 18+ (@lit/react)
- Vue 3+ (Composition API)
- Angular 15+ (standalone components)
- @lit/react wrapper library
- Framework-specific TypeScript types

**Why Context7 Integration is Critical:**
- Each framework has different Web Component integration patterns
- React 18+ changed how custom elements are handled
- Vue 3 Composition API requires different configuration than Options API
- Angular standalone components changed the module system

**Recommended Context7 Queries:**
- `/facebook/react` - React integration patterns
- `/vuejs/core` - Vue 3 Web Components support
- `/angular/angular` - Angular custom elements
- `/lit/lit` - @lit/react wrapper utilities

**Integration Point in Agent:**
Add to "Core Responsibilities" section:

```markdown
**Framework Documentation Access:**
When creating or troubleshooting framework wrappers, leverage Context7 MCP:
- React custom elements integration: `get-library-docs('/facebook/react', topic: 'web-components')`
- Vue 3 defineCustomElement: `get-library-docs('/vuejs/core', topic: 'custom-elements')`
- Angular CUSTOM_ELEMENTS_SCHEMA: `get-library-docs('/angular/angular', topic: 'elements')`
```

---

#### 4. **design-system-architect** ⭐⭐⭐⭐

**Primary Technologies:**
- Lit 3.3.1
- Style Dictionary 4.0.0
- Vite 5.0.8
- Storybook 8.6.14
- Playwright 1.55.1
- Jest/Vitest

**Why Context7 Integration is Critical:**
- Architectural decisions require understanding latest framework capabilities
- Style Dictionary 4.0 introduced new transform/format APIs
- Storybook 8.x has new Web Components support patterns

**Recommended Context7 Queries:**
- `/lit-element/lit` - Web Components architecture
- `/amzn/style-dictionary` - Token architecture
- `/vitejs/vite` - Build architecture
- `/storybookjs/storybook` - Documentation architecture

**Integration Point in Agent:**
Add to "Phase 1: Architectural Discovery & Planning" section:

```markdown
**Technical Documentation Research:**
When evaluating architectural decisions, consult Context7 MCP for:
- Latest Lit patterns (reactive controllers, directives): `get-library-docs('/lit-element/lit', topic: 'reactive-controllers')`
- Style Dictionary 4.x capabilities: `get-library-docs('/amzn/style-dictionary', topic: 'transforms')`
- Vite optimization strategies: `get-library-docs('/vitejs/vite', topic: 'build-optimizations')`
```

---

#### 5. **qa-expert** ⭐⭐⭐⭐

**Primary Technologies:**
- Jest + @web/test-runner
- Playwright 1.55.1
- axe-core (accessibility testing)
- Vitest 3.2.4
- Testing Library utilities

**Why Context7 Integration is Critical:**
- Testing framework APIs change between versions (especially Playwright)
- axe-core rule sets update with new WCAG interpretations
- Web Components testing patterns evolve (Shadow DOM queries)

**Recommended Context7 Queries:**
- `/microsoft/playwright` - E2E testing
- `/jestjs/jest` - Unit testing
- `/vitest-dev/vitest` - Vite-native testing
- `/dequelabs/axe-core` - Accessibility testing
- `/open-wc/open-wc` - Web Components testing

**Integration Point in Agent:**
Add to "Phase 1: Quality Analysis & Test Planning" section:

```markdown
**Testing Framework Documentation:**
When designing test strategy or troubleshooting test issues, use Context7 MCP:
- Playwright Shadow DOM queries: `get-library-docs('/microsoft/playwright', topic: 'selectors')`
- axe-core rule configuration: `get-library-docs('/dequelabs/axe-core', topic: 'api')`
- Vitest Web Components testing: `get-library-docs('/vitest-dev/vitest', topic: 'browser-mode')`
```

---

#### 6. **devops-automation-engineer** ⭐⭐⭐⭐

**Primary Technologies:**
- GitHub Actions
- NPM publishing
- Changesets (versioning)
- Vercel/Netlify (hosting)
- npm/pnpm

**Why Context7 Integration is Critical:**
- GitHub Actions syntax and available actions change frequently
- NPM publishing best practices evolve (provenance, package exports)
- Hosting platform APIs update regularly

**Recommended Context7 Queries:**
- `/actions/toolkit` - GitHub Actions development
- `/npm/cli` - NPM publishing
- `/changesets/changesets` - Version management
- `/vercel/vercel` - Deployment platform

**Integration Point in Agent:**
Add to "Phase 1: Maturity Analysis & Gap Identification" section:

```markdown
**CI/CD Documentation Reference:**
When configuring pipelines or troubleshooting deployments, consult Context7 MCP:
- GitHub Actions best practices: `get-library-docs('/actions/toolkit', topic: 'workflow-syntax')`
- NPM provenance publishing: `get-library-docs('/npm/cli', topic: 'publish')`
- Changesets automation: `get-library-docs('/changesets/changesets', topic: 'github-actions')`
```

---

#### 7. **accessibility-advocate** ⭐⭐⭐⭐

**Primary Technologies:**
- axe-core (automated testing)
- WCAG 2.1/2.2 standards
- ARIA Authoring Practices Guide
- Web Accessibility Initiative (WAI)
- Screen reader APIs (NVDA, JAWS, VoiceOver)

**Why Context7 Integration is Critical:**
- WCAG interpretations and techniques update regularly
- axe-core rules evolve with new success criteria interpretations
- ARIA patterns receive updates from W3C
- Shadow DOM accessibility best practices are still emerging

**Recommended Context7 Queries:**
- `/dequelabs/axe-core` - Automated accessibility testing
- `/w3c/aria-practices` - ARIA design patterns
- `/w3c/wcag` - WCAG standards

**Integration Point in Agent:**
Add to "Phase 1: Accessibility Analysis & Audit" section:

```markdown
**Accessibility Standards Reference:**
When auditing components or implementing ARIA patterns, leverage Context7 MCP:
- axe-core rule documentation: `get-library-docs('/dequelabs/axe-core', topic: 'rules')`
- ARIA patterns for complex widgets: `get-library-docs('/w3c/aria-practices', topic: 'patterns')`
- WCAG techniques: `get-library-docs('/w3c/wcag', topic: 'techniques')`
```

---

#### 8. **performance-monitor** ⭐⭐⭐⭐

**Primary Technologies:**
- web-vitals library
- Lighthouse CI
- size-limit
- webpack-bundle-analyzer / rollup-plugin-visualizer
- Chrome DevTools Performance API

**Why Context7 Integration is Critical:**
- Core Web Vitals metrics definitions evolve (INP replacing FID)
- Lighthouse scoring algorithms change
- Performance measurement APIs get updated

**Recommended Context7 Queries:**
- `/GoogleChrome/web-vitals` - Web performance metrics
- `/GoogleChrome/lighthouse` - Performance auditing
- `/ai/size-limit` - Bundle size limits

**Integration Point in Agent:**
Add to "Core Responsibilities" section:

```markdown
**Performance Documentation Access:**
When setting up monitoring or diagnosing performance issues, use Context7 MCP:
- web-vitals API changes: `get-library-docs('/GoogleChrome/web-vitals', topic: 'api')`
- Lighthouse CI configuration: `get-library-docs('/GoogleChrome/lighthouse', topic: 'lighthouse-ci')`
- size-limit setup: `get-library-docs('/ai/size-limit', topic: 'configuration')`
```

---

### 🟡 MEDIUM PRIORITY AGENTS

#### 9. **technical-writer** ⭐⭐⭐

**Primary Technologies:**
- Storybook 8.6.14
- VitePress 1.6.4
- Markdown/MDX
- Mermaid diagrams

**Why Context7 Integration is Useful:**
- Storybook addon APIs and MDX syntax change
- VitePress configuration and plugin system evolves
- Documentation tools get new features regularly

**Recommended Context7 Queries:**
- `/storybookjs/storybook` - Component documentation
- `/vuejs/vitepress` - Documentation site

**Integration Point:**
Add to "Phase 2: Content Creation & Iteration" under "Visual Elements":

```markdown
**Documentation Tool Reference:**
When using advanced Storybook or VitePress features, consult Context7 MCP:
- Storybook addons: `get-library-docs('/storybookjs/storybook', topic: 'addons')`
- VitePress theming: `get-library-docs('/vuejs/vitepress', topic: 'theme')`
```

---

#### 10. **component-builder** ⭐⭐⭐

**Primary Technologies:**
- (Composite of frontend-developer technologies)
- Lit, TypeScript, Style Dictionary

**Why Context7 Integration is Useful:**
- Same rationale as frontend-developer
- Creates complete components from scratch

**Recommended Approach:**
Inherit Context7 integration from frontend-developer agent since component-builder orchestrates similar tasks.

**Integration Point:**
Add reference to frontend-developer's documentation access patterns.

---

#### 11. **design-ops-specialist** ⭐⭐

**Primary Technologies:**
- Figma API
- Chromatic (visual regression)
- Token transformation tools

**Why Context7 Integration is Useful:**
- Figma API evolves with new plugin capabilities
- Visual regression tools have changing APIs

**Recommended Context7 Queries:**
- `/figma/plugin-api` - Figma automation
- `/chromaui/chromatic-cli` - Visual regression

**Integration Point:**
Add to core responsibilities section.

---

#### 12. **localization-i18n-specialist** ⭐⭐

**Primary Technologies:**
- Intl APIs (Web standard)
- i18next or similar i18n libraries
- CLDR (Common Locale Data Repository)

**Why Context7 Integration is Useful:**
- Intl API proposals and browser support change
- i18n library APIs evolve

**Recommended Context7 Queries:**
- `/tc39/ecma402` - Intl specification
- `/i18next/i18next` - Translation framework

**Integration Point:**
Add to "Technical Implementation" section.

---

## Implementation Recommendations

### 1. **Agent Prompt Modifications**

For each HIGH PRIORITY agent, add a new section called **"Documentation Access via Context7 MCP"** that includes:

```markdown
## Documentation Access via Context7 MCP

You have access to the Context7 MCP server for retrieving up-to-date documentation. Use this when:

- Working with unfamiliar APIs or framework features
- Debugging version-specific issues
- Evaluating new capabilities for architectural decisions
- Researching best practices for current framework versions

**Usage Pattern:**

1. **Resolve Library ID** (if not using explicit ID):
   ```
   resolve-library-id: "lit" → returns '/lit-element/lit'
   ```

2. **Fetch Documentation**:
   ```
   get-library-docs: library_id='/lit-element/lit', topic='reactive-controllers', tokens=5000
   ```

**Available Libraries for This Agent:**
- Lit: `/lit-element/lit`
- TypeScript: `/microsoft/TypeScript`
- Playwright: `/microsoft/playwright`
- Jest: `/jestjs/jest`
- [Add agent-specific libraries]

**When to Use:**
- ✅ Checking syntax for specific framework version
- ✅ Understanding new API capabilities
- ✅ Resolving deprecation warnings
- ✅ Learning best practices for current versions

**When NOT to Use:**
- ❌ For general web standards (use MDN Web Docs knowledge)
- ❌ For project-specific code (use codebase context)
- ❌ For design patterns (use architecture knowledge)
```

### 2. **Workflow Integration**

For each agent, integrate Context7 at these key decision points:

**frontend-developer:**
- Before implementing unfamiliar Lit patterns
- When encountering TypeScript errors in strict mode
- Before writing tests with new Playwright features

**developer-tooling-specialist:**
- When configuring build tools (Vite, Rollup, esbuild)
- When optimizing Style Dictionary transforms
- When setting up monorepo caching strategies

**ecosystem-integration-agent:**
- When creating React/Vue/Angular wrappers
- When troubleshooting framework-specific integration issues
- When updating wrappers for new framework versions

**design-system-architect:**
- During architectural discovery (Phase 1)
- When evaluating technology stack decisions
- When researching scalability patterns

**qa-expert:**
- During test strategy development (Phase 1)
- When implementing new test types
- When debugging test failures with framework updates

**devops-automation-engineer:**
- When configuring CI/CD pipelines
- When troubleshooting deployment issues
- When implementing new automation workflows

**accessibility-advocate:**
- When implementing complex ARIA patterns
- When interpreting new WCAG techniques
- When configuring axe-core rules

**performance-monitor:**
- When setting up performance monitoring
- When interpreting Core Web Vitals changes
- When configuring performance budgets

### 3. **Example Integration: frontend-developer**

Add this section after "Phase 1: Component Discovery & Planning":

```markdown
### Documentation Lookup Strategy

When encountering unfamiliar patterns or version-specific features:

1. **Identify the library/framework** causing uncertainty
2. **Resolve library ID** if needed: `resolve-library-id("lit")`
3. **Fetch targeted documentation**: `get-library-docs('/lit-element/lit', topic='decorators', tokens=5000)`
4. **Apply learning** to component implementation
5. **Document pattern** for team knowledge sharing

**Common Documentation Needs:**

- **Lit Decorators**: `@property()`, `@state()`, `@query()` updates
- **TypeScript Types**: Strict mode, type inference, generics
- **Playwright Selectors**: Shadow DOM queries, accessibility selectors
- **Jest Config**: Web Components testing, coverage thresholds
- **Accessibility APIs**: ARIA patterns, focus management
```

---

## Metrics for Success

Track these metrics after Context7 integration:

1. **Documentation Query Frequency**: How often agents use Context7
2. **Time to Resolution**: Reduced time debugging framework-specific issues
3. **Code Quality**: Fewer framework-related bugs due to outdated knowledge
4. **Agent Confidence**: Self-reported confidence when working with latest APIs
5. **Documentation Currency**: Using latest framework versions vs. outdated patterns

---

## Maintenance Plan

### Quarterly Review (Every 3 Months)

1. **Update Available Libraries List**: Add new frameworks/tools as they're adopted
2. **Review Query Patterns**: Identify most-used documentation topics
3. **Add Integration Examples**: Document successful Context7 usage patterns
4. **Update Agent Prompts**: Refine documentation access sections based on usage

### After Major Version Updates

When Sando Design System upgrades major dependencies (Lit 4.x, Vite 6.x, etc.):

1. **Update Context7 library versions** in agent prompts
2. **Create migration guides** using Context7 documentation
3. **Test agents** with new framework documentation
4. **Document breaking changes** affecting agent workflows

---

## Conclusion

**12 agents** should receive Context7 MCP integration, with **8 high-priority agents** benefiting most from up-to-date documentation access. This integration will:

- ✅ Reduce debugging time for framework-specific issues
- ✅ Ensure agents use current best practices
- ✅ Enable faster adoption of new framework features
- ✅ Improve code quality with version-accurate implementations
- ✅ Reduce reliance on potentially outdated LLM training data

### Immediate Actions

1. **Update high-priority agent prompts** (frontend-developer, developer-tooling-specialist, ecosystem-integration-agent, design-system-architect, qa-expert, devops-automation-engineer, accessibility-advocate, performance-monitor)

2. **Add Context7 usage examples** to agent documentation

3. **Create Context7 quick reference guide** for common library IDs

4. **Monitor usage patterns** and refine integration based on actual usage

5. **Educate human team** on how agents leverage Context7 for better results

---

**Document Version**: 1.0
**Last Updated**: 2025-10-09
**Next Review**: 2026-01-09 (Quarterly)
