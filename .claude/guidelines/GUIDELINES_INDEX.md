# Guidelines Index

**Version**: 3.0.0
**Last Updated**: 2025-11-03
**Status**: 🎉 **ALL 26 GUIDELINES COMPLETE!** 🎉

---

## Quick Navigation

- [Design System](#01-design-system) - Visual identity, tokens, components, theming
- [Architecture](#02-architecture) - Monorepo, build system, component patterns
- [Development](#03-development) - Code style, naming, git workflow, testing
- [Accessibility](#04-accessibility) - WCAG compliance, keyboard, screen readers
- [Quality](#05-quality) - Coverage, performance, security, visual regression
- [Documentation](#06-documentation) - API reference, Storybook, VitePress, inline docs

---

## About These Guidelines

These guidelines are the **single source of truth** for all standardization in the Sando Design System. They are:

- **Centralized**: One guideline, one location
- **Referenced**: Agents link to guidelines, never duplicate content
- **Versioned**: Semantic versioning tracks changes
- **Maintained**: Each guideline has a clear owner
- **Enforceable**: Skills and commands validate compliance

**How to use**:

1. Find the guideline category you need
2. Read the specific guideline file
3. Follow the standards and use provided checklists
4. Reference guidelines in your work (agents, skills, commands)

---

## 01. Design System

> **Purpose**: All design-related guidelines consolidated - visual identity, tokens, components, theming, motion.

| Guideline                                                       | Version       | Status    | Description                                                                                        | Owner                   |
| --------------------------------------------------------------- | ------------- | --------- | -------------------------------------------------------------------------------------------------- | ----------------------- |
| [TOKEN_ARCHITECTURE.md](01-design-system/TOKEN_ARCHITECTURE.md) | **v2.0.0** 🆕 | ✅ Active | Three-layer token system (Ingredients/Flavors/Recipes), decision tree, CSS naming, token reference | Design System Architect |
| [COLOR_SYSTEM.md](01-design-system/COLOR_SYSTEM.md)             | **v2.0.0** 🆕 | ✅ Active | OKLCH color space, algorithmic generation, universal lightness scale, WCAG compliance              | UI Designer             |
| [TYPOGRAPHY_SYSTEM.md](01-design-system/TYPOGRAPHY_SYSTEM.md)   | **v2.0.0** 🆕 | ✅ Active | System fonts, modular scale (~1.125-1.25), responsive clamp(), unitless line heights               | UI Designer             |
| [SPACING_SYSTEM.md](01-design-system/SPACING_SYSTEM.md)         | **v2.0.0** 🆕 | ✅ Active | Unified t-shirt sizing (xs/sm/md/lg/xl), 4px base unit, logical properties (RTL support)           | UI Designer             |
| [COMPONENT_DESIGN.md](01-design-system/COMPONENT_DESIGN.md)     | v1.0.0        | ✅ Active | Variant taxonomy, token patterns, API conventions, accessibility baseline (PERFECT LENGTH)         | UI Designer             |
| [THEMING_STRATEGY.md](01-design-system/THEMING_STRATEGY.md)     | v1.0.0        | ✅ Active | Flavors vs Modes, flavor inheritance, 5-file structure, automatic accessibility (PERFECT LENGTH)   | Design System Architect |
| [MOTION_DESIGN.md](01-design-system/MOTION_DESIGN.md)           | **v2.0.0** 🆕 | ✅ Active | Token-based durations, GPU properties, automatic reduced-motion, semantic easing                   | UI Designer             |

**Referenced by**: `ui-designer`, `design-ops-specialist`, `component-creator` skill, `flavor-creator` skill

---

## 02. Architecture

> **Purpose**: Technical architecture patterns and build system configuration.

| Guideline                                                              | Version       | Status    | Description                                                                                                | Owner                        |
| ---------------------------------------------------------------------- | ------------- | --------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [MONOREPO_STRUCTURE.md](02-architecture/MONOREPO_STRUCTURE.md)         | **v1.0.0** 🆕 | ✅ Active | Turborepo + pnpm workspace architecture, build orchestration, dependency management, caching strategies    | Design System Architect      |
| [COMPONENT_ARCHITECTURE.md](02-architecture/COMPONENT_ARCHITECTURE.md) | **v1.0.0** 🆕 | ✅ Active | Monolithic 7-file pattern, Lit patterns, Shadow DOM, FlavorableMixin, token consumption                    | Design System Architect      |
| [TOKEN_BUILD_SYSTEM.md](02-architecture/TOKEN_BUILD_SYSTEM.md)         | **v1.0.0** 🆕 | ✅ Active | Style Dictionary 4.0 orchestrator, custom transforms, three-layer build sequence, dual output (CSS + TS)   | Developer Tooling Specialist |
| [FRAMEWORK_INTEGRATION.md](02-architecture/FRAMEWORK_INTEGRATION.md)   | **v1.0.0** 🆕 | ✅ Active | Framework-agnostic Web Components in React, Vue 3, Angular, Svelte, TypeScript support, SSR considerations | Ecosystem Integration Agent  |

**Referenced by**: `design-system-architect`, `developer-tooling-specialist`, `frontend-developer`, `ecosystem-integration-agent`

---

## 03. Development

> **Purpose**: Day-to-day coding standards and development workflows.

| Guideline                                                     | Version       | Status    | Description                                                                                                                           | Owner                   |
| ------------------------------------------------------------- | ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| [CODE_STYLE.md](03-development/CODE_STYLE.md)                 | **v1.0.0** 🆕 | ✅ Active | TypeScript strict mode, 5-group import organization, kebab-case files, JSDoc standards, Prettier enforcement                          | Frontend Developer      |
| [NAMING_CONVENTIONS.md](03-development/NAMING_CONVENTIONS.md) | **v2.0.0** 🔄 | ✅ Active | Component naming (sando-\* prefix), file naming, token naming, TypeScript conventions - **REFACTORED** (858→485 lines, 43% reduction) | Design System Architect |
| [GIT_WORKFLOW.md](03-development/GIT_WORKFLOW.md)             | **v1.1.0** 🔄 | ✅ Active | Conventional commits, changesets workflow, branch naming, PR validation, GitHub Flow principles - **EXPANDED** (696 lines)            | DevOps Engineer         |
| [TESTING_STRATEGY.md](03-development/TESTING_STRATEGY.md)     | **v1.0.0** 🆕 | ✅ Active | Test pyramid (80% unit, 100% a11y), Vitest patterns, jest-axe, token testing, coverage requirements - **ULTRA-OPTIMIZED** (451 lines) | QA Expert               |

**Referenced by**: `frontend-developer`, `qa-expert`, `/review-component` command, `/test-component` command

---

## 04. Accessibility

> **Purpose**: WCAG compliance and inclusive design standards.

| Guideline                                                             | Version       | Status    | Description                                                                                                                                                                                                                 | Owner       |
| --------------------------------------------------------------------- | ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [WCAG_COMPLIANCE.md](04-accessibility/WCAG_COMPLIANCE.md)             | **v1.0.0**    | ✅ Active | WCAG 2.1 AA/AAA standards, jest-axe automated testing, contrast requirements (4.5:1 AA, 7:1 AAA), semantic HTML, 5 rules of ARIA - **OPTIMIZED** (490 lines)                                                                | QA Expert   |
| [KEYBOARD_NAVIGATION.md](04-accessibility/KEYBOARD_NAVIGATION.md)     | **v1.0.0**    | ✅ Active | Keyboard accessibility (Tab, Enter, Space, Escape), focus visible (:focus-visible, 3:1 contrast), Shadow DOM delegatesFocus, no keyboard traps - **OPTIMIZED** (499 lines)                                                  | QA Expert   |
| [SCREEN_READER_SUPPORT.md](04-accessibility/SCREEN_READER_SUPPORT.md) | **v1.0.0**    | ✅ Active | Semantic HTML first, accessible names (aria-label, text content), ARIA states (pressed, busy, expanded), live regions (aria-live, role="status"), screen reader testing (NVDA, JAWS, VoiceOver) - **OPTIMIZED** (500 lines) | QA Expert   |
| [COLOR_CONTRAST.md](04-accessibility/COLOR_CONTRAST.md)               | **v1.0.0** 🆕 | ✅ Active | WCAG contrast ratios (4.5:1 AA text, 7:1 AAA, 3:1 UI components), automated token validation, OKLCH lightness scale, large text exception (≥18pt), cross-flavor/mode testing - **OPTIMIZED** (491 lines)                    | UI Designer |

**Referenced by**: `qa-expert`, `frontend-developer`, `accessibility-validator` skill, `/check-a11y` command

---

## 05. Quality

> **Purpose**: Quality gates and non-functional requirements.

| Guideline                                                   | Version       | Status    | Description                                                                                                                                                                                                                            | Owner               |
| ----------------------------------------------------------- | ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| [TEST_COVERAGE.md](05-quality/TEST_COVERAGE.md)             | **v1.0.0**    | ✅ Active | 80% coverage threshold (lines, functions, branches, statements), 100% a11y for public components, Vitest v8 provider, CI enforcement, coverage reports (text, html, lcov) - **OPTIMIZED** (498 lines)                                  | QA Expert           |
| [PERFORMANCE_BUDGETS.md](05-quality/PERFORMANCE_BUDGETS.md) | **v1.0.0**    | ✅ Active | Bundle size budgets (<10KB component gzipped, <100KB library), Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1), Lighthouse CI ≥90, tree-shaking, code splitting, performance monitoring - **OPTIMIZED** (497 lines)                  | Performance Monitor |
| [SECURITY_STANDARDS.md](05-quality/SECURITY_STANDARDS.md)   | **v1.0.0** 🆕 | ✅ Active | XSS prevention (Lit escaping, DOMPurify), CSP compliance (no unsafe-inline), dependency scanning (npm audit, Dependabot), OWASP Top 10, license compliance (MIT/Apache/BSD only), vulnerability disclosure - **OPTIMIZED** (496 lines) | Security Auditor    |

**Referenced by**: `qa-expert`, `performance-monitor`, `security-compliance-auditor`, `/coverage` command, `/perf` command

---

## 06. Documentation

> **Purpose**: Documentation format standards for consistency.

| Guideline                                                     | Version       | Status    | Description                                                                                                                                                                                       | Owner              |
| ------------------------------------------------------------- | ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [STORYBOOK_STORIES.md](06-documentation/STORYBOOK_STORIES.md) | **v1.0.0** 🆕 | ✅ Active | Three-section organization (Tokens/Components/Patterns), Strapi-inspired structure, argTypes documentation, automatic flavor modes (@media), comprehensive story templates                        | Technical Writer   |
| [API_REFERENCE.md](06-documentation/API_REFERENCE.md)         | **v1.0.0** 🆕 | ✅ Active | Comprehensive JSDoc headers (@element, @slot, @fires, @cssprop), VitePress property/event/CSS tables, TypeScript type documentation, accessibility documentation patterns                         | Technical Writer   |
| [VITEPRESS_GUIDES.md](06-documentation/VITEPRESS_GUIDES.md)   | **v1.0.0** 🆕 | ✅ Active | Frontmatter configuration, step-by-step tutorial structure, VitePress containers (tip/warning/danger), code groups for multi-framework examples, markdown features, navigation config             | Technical Writer   |
| [INLINE_CODE_DOCS.md](06-documentation/INLINE_CODE_DOCS.md)   | **v1.0.0** 🆕 | ✅ Active | JSDoc for all public APIs (@param/@returns/@throws/@example/@default), private docs with @private, lifecycle method docs, TypeScript explicit types, inline comment best practices (WHY not WHAT) | Frontend Developer |

**Referenced by**: `technical-writer`, `frontend-developer`, `/document-component` command

---

## Guideline Status Legend

- ✅ **Active**: Guideline is complete and in use
- 📝 **Planned**: Guideline is defined but not yet created
- 🔄 **In Progress**: Guideline is being written
- ⚠️ **Deprecated**: Guideline is outdated, see replacement
- 🔒 **Locked**: Guideline is stable, changes require RFC

---

## How to Propose Changes

1. **Create GitHub Issue**: Use template "Guideline Change Proposal"
2. **Tag Owner**: Mention the guideline owner for review
3. **Impact Analysis**: List affected agents, skills, commands
4. **Version Bump**: Specify if major/minor/patch change
5. **Update**: Once approved, update guideline file + this index

---

## Maintenance Schedule

- **Weekly**: Check for outdated links or references
- **Monthly**: Review guideline versions for consistency
- **Quarterly**: Audit guideline usage in agents/skills/commands
- **Yearly**: Major review of all guidelines for relevance

---

## Related Documents

- [GUIDELINES_ARCHITECTURE.md](../GUIDELINES_ARCHITECTURE.md) - Complete architecture and implementation plan
- [skills-implementation-plan.md](../../skills-implementation-plan.md) - Skills replacing agents
- [commands-implementation-plan.md](../../commands-implementation-plan.md) - Slash commands strategy
- [action-plan.md](../../action-plan.md) - Overall project roadmap
