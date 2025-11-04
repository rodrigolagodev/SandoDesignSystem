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

## Changelog

### 3.1.0 (2025-11-04) - **GIT_WORKFLOW v1.1.0: GitHub Flow Integration** 🚀

- **UPDATED**: GIT_WORKFLOW.md (v1.0.0 → v1.1.0) - Added GitHub Flow principles (+175 lines)
- **New section**: GitHub Flow Principles with complete workflow documentation
  - Core philosophy: Deployable master, short-lived branches (<3 days), PR-based workflow, frequent deployment
  - Branch lifecycle diagram (Mermaid) showing full PR workflow
  - Short-lived feature branches rule with scope examples (good vs bad patterns)
  - Always deployable master principle with enforcement mechanisms
  - Branch auto-delete requirement and automation
  - Deployment workflow and rollback strategy
  - Continuous deployment rationale (small changes, fast feedback, easy rollback)
- **Formalized**: Continuous deployment from master branch
- **Expanded**: Enforcement mechanisms documentation (branch protection, CI checks, code review, automated deployment)
- **File size**: 521 → 696 lines (+175 lines, 34% expansion)
- **Purpose**: Align entire design system with GitHub Flow workflow for single developer and future team growth
- **Related changes**: Will update CONTRIBUTING.md, CLAUDE.md, and devops-automation-engineer agent to reference v1.1.0

### 3.0.0 (2025-11-03) - **🎉 ALL GUIDELINES COMPLETE! 100% 🎉**

- **MILESTONE**: All 26/26 guidelines now Active ✅
- **NEW**: INLINE_CODE_DOCS.md (v1.0.0 Active) - Fourth and FINAL guideline in 06-documentation category
- **CATEGORY COMPLETE**: All 4/4 documentation guidelines now Active ✅
- **INLINE_CODE_DOCS.md highlights**:
  - JSDoc for all public APIs: @param, @returns, @throws, @example, @default tags required
  - Property JSDoc with @default and @example for all @property decorators
  - Private/internal documentation with @private tag and "Internal:" prefix
  - Lifecycle method documentation with "Lifecycle:" prefix explaining when called
  - Complex logic inline comments explaining WHY not WHAT
  - JSDoc tag reference: essential tags (8 tags) and advanced tags (5 tags)
  - TypeScript type annotations: explicit return types (required), parameter types (required), type narrowing comments
  - Documentation patterns: file headers, interface/type docs with property descriptions, build script docs (JavaScript)
  - Inline comment best practices: when to comment (✅ DO/❌ DON'T), comment style (WHY vs WHAT examples), TODO format (KEYWORD(issue): Description)
  - Build scripts use JSDoc with type hints (@param {Type}, @returns {Type}, @typedef)
  - Validation checklist: public API docs (8 items), type annotations (4 items), private/internal (4 items), code quality (5 items)
  - References to flavorable.ts (lines 1-259), orchestrator.js (lines 11-64), sando-button.ts
  - Optimized format (500 lines exact) - patterns, examples, checklists
- **Documentation patterns**: File headers for context, interfaces with property JSDoc, JavaScript JSDoc for IDE support
- **Comment conventions**: TODO(#issue), FIXME(#issue), HACK, NOTE for special cases
- **Category progress**: 06-documentation now **100% complete (4/4 guidelines Active)** 🎉🎉🎉
- **Total progress**: **26/26 guidelines complete (100%)** 🎉🎉🎉

---

## 🏆 Project Completion Summary

**All 6 categories: 100% complete**

- ✅ 01-design-system: 7/7 guidelines (100%)
- ✅ 02-architecture: 4/4 guidelines (100%)
- ✅ 03-development: 4/4 guidelines (100%)
- ✅ 04-accessibility: 4/4 guidelines (100%)
- ✅ 05-quality: 3/3 guidelines (100%)
- ✅ 06-documentation: 4/4 guidelines (100%)

**Total**: 26/26 guidelines (100%) ✅
**Average length**: ~495 lines per guideline (99% of 500-line target)
**Agent-optimized**: All guidelines use tables, templates, and reference-based content
**Zero duplication**: Cross-references eliminate redundant content
**Production-ready**: All guidelines reference actual codebase patterns

---

### 2.15.0 (2025-11-03) - **06-DOCUMENTATION 75% COMPLETE** 🎯

- **NEW**: VITEPRESS_GUIDES.md (v1.0.0 Active) - Third guideline in 06-documentation category
- **VITEPRESS_GUIDES.md highlights**:
  - Frontmatter configuration (title, description for SEO) - OPTIONAL, VitePress can extract from content
  - Progressive step-by-step tutorial structure (numbered h2 headings, Next Steps section)
  - VitePress containers: tip (helpful hints), warning (important notices), danger (critical warnings), details (collapsible)
  - Code groups for multi-framework examples (Vite/Next.js, React/Vue, HTML/TS files)
  - Syntax highlighting for 10+ languages (html, css, ts, tsx, vue, bash, json, yaml)
  - VitePress guide patterns: tutorial structure, conceptual guide structure, integration guide structure
  - Markdown features: internal links, external links, emoji conventions, lists, tables
  - Navigation configuration: sidebar grouping, top nav, file naming (kebab-case)
  - Content organization: directory structure (getting-started/, guides/, tokens/, components/)
  - Writing guidelines: tone (clear, active voice, second person), code examples (complete, commented, with output)
  - Accessibility: semantic headings, descriptive links, screen reader testing
  - Validation checklist: structure, content quality, code examples, VitePress features, navigation, a11y
  - References to quick-start.md (lines 9-213), accessibility.md, button.md, .vitepress/config.ts (lines 12-76)
  - Optimized format (500 lines exact) - templates, patterns, examples
- **Guide structure templates**: Tutorial (step-by-step), Conceptual (what/why/how), Integration (framework-specific)
- **Markdown features**: Inline code, code blocks with language tags, emoji conventions (✅❌⚠️💡📚🎨♿🔒⚡)
- **Category progress**: 06-documentation now **75% complete (3/4 guidelines Active)** 🎉
- **Total progress**: 25/26 guidelines complete (96%)

### 2.14.0 (2025-11-03) - **06-DOCUMENTATION 50% COMPLETE** 🎯

- **NEW**: API_REFERENCE.md (v1.0.0 Active) - Second guideline in 06-documentation category
- **API_REFERENCE.md highlights**:
  - Comprehensive JSDoc component headers (@element, @slot, @fires, @cssprop, @example)
  - VitePress property tables (Property, Type, Default, Description columns)
  - Inline property JSDoc with @default tags for all @property decorators
  - Slots, events, and CSS custom properties documentation in tables
  - TypeScript type definitions with JSDoc comments
  - Standard component page template structure
  - Property patterns: string unions, booleans, optional, numbers, objects
  - Event documentation: custom events (CustomEvent<T>), native events
  - CSS custom properties grouping by category (base, variants, states)
  - Slot patterns: default slot, named slots with usage examples
  - Accessibility documentation: WCAG table, keyboard navigation, screen reader
  - Examples patterns: basic, interactive JavaScript, framework-specific (React, Vue)
  - Validation checklist: JSDoc, properties, VitePress, types, a11y, examples
  - References to sando-button.ts (lines 1-200), button.md (lines 254-299)
  - Optimized format (500 lines exact) - tables, templates, patterns
- **Documentation structure**: VitePress template covers Features, Usage, Variants, States, Theming, API Reference, Accessibility, Examples, Best Practices, Framework Integration
- **Type notation conventions**: Union types with escaped pipes (`\|`), lowercase boolean, undefined for optional
- **Category progress**: 06-documentation now **50% complete (2/4 guidelines Active)** 🎉
- **Total progress**: 24/26 guidelines complete (92%)

### 2.13.0 (2025-11-03) - **06-DOCUMENTATION STARTED** 🚀

- **NEW**: STORYBOOK_STORIES.md (v1.0.0 Active) - First guideline in 06-documentation category
- **STORYBOOK_STORIES.md highlights**:
  - Three-section organization following Strapi Design System (Design Tokens, Components, Patterns)
  - Main story file pattern with comprehensive argTypes (controls, descriptions, categories)
  - Automatic flavor modes via @media queries (NO manual flavorMode controls)
  - Story templates: Design Tokens showcase, Component documentation, Pattern compositions
  - Common story patterns: All variants, flavor comparison, interactive playground, responsive
  - Accessibility integration: jest-axe testing, keyboard navigation documentation
  - Focused story files pattern for complex scenarios (stories/ subdirectory)
  - Naming conventions: PascalCase exports, kebab-case files, hierarchical titles
  - JSDoc documentation in stories with markdown formatting
  - Validation checklist: component, design tokens, pattern story requirements
  - References to Strapi Design System (3 sections: tokens, components, pages)
  - Optimized format (500 lines exact) - tables, templates, minimal prose
- **Critical correction**: Removed manual flavorMode controls (modes are automatic via @media prefers-color-scheme)
- **Structure inspiration**: Following Strapi's presentation and organization patterns
- **Category progress**: 06-documentation now **25% complete (1/4 guidelines Active)** 🎯
- **Total progress**: 23/26 guidelines complete (88%)

### 2.12.0 (2025-11-03) - **05-QUALITY 100% COMPLETE** 🎉🎉🎉

- **NEW**: SECURITY_STANDARDS.md (v1.0.0 Active) - Third and FINAL guideline in 05-quality category
- **CATEGORY COMPLETE**: All 3/3 quality guidelines now Active ✅
- **VISUAL_REGRESSION.md ELIMINATED**: Deemed unnecessary (covered by existing guidelines + Storybook manual review)
- **SECURITY_STANDARDS.md highlights**:
  - XSS prevention: Lit automatic HTML escaping, DOMPurify for `unsafeHTML` directive
  - CSP compliance: No `unsafe-inline`, Shadow DOM CSS patterns, strict CSP headers
  - Dependency scanning: npm audit (CI enforcement), Dependabot (automated PRs), Snyk (optional)
  - OWASP Top 10 coverage: Injection, broken auth, sensitive data exposure, XXE, access control, misconfig, XSS, insecure deserialization, vulnerable components, logging
  - License compliance: MIT/Apache/BSD allowed, GPL/AGPL forbidden (copyleft incompatible)
  - Severity levels: Critical (<24h), High (<7d), Moderate (<30d), Low (next major)
  - Secure build pipeline: CodeQL scanning, git-secrets, supply chain security (lock files, provenance)
  - Vulnerability disclosure: SECURITY.md template, coordinated disclosure (90-day embargo)
  - Validation checklist: component development, dependency management, build/CI, release
  - Optimized format (496 lines) - OWASP Top 10 table, compact security patterns
- **Visual Regression Analysis**:
  - ❌ Eliminated due to: High cost ($149+/mo), maintenance overhead (900+ screenshots), duplication (Storybook manual review)
  - ✅ Alternatives preferred: CLS monitoring (PERFORMANCE_BUDGETS.md), jest-axe (WCAG_COMPLIANCE.md), Storybook PR review
  - 📊 Cost-benefit analysis: Poor ROI for design systems (intentional visual changes vs. pixel-perfect apps)
- **Quality Coverage Assessment**:
  - ✅ Testing: Unit, E2E, a11y, coverage thresholds (TEST_COVERAGE.md)
  - ✅ Performance: Bundle size, Core Web Vitals, Lighthouse (PERFORMANCE_BUDGETS.md)
  - ✅ Security: XSS, CSP, dependencies, OWASP Top 10 (SECURITY_STANDARDS.md)
  - ✅ No gaps identified - category is complete and comprehensive
- **Optimization achievements**:
  - TEST_COVERAGE: 498 lines ✅
  - PERFORMANCE_BUDGETS: 497 lines ✅
  - SECURITY_STANDARDS: 496 lines ✅
  - **Average: 497 lines** (99.4% of 500-line target)
- **Category progress**: 05-quality now **100% complete (3/3 guidelines Active)** 🎉🎉🎉
- **Total progress**: 22/26 guidelines complete (85%) - Only 06-documentation remains!

### 2.11.0 (2025-11-03) - **05-QUALITY 50% COMPLETE** 🎯

- **NEW**: PERFORMANCE_BUDGETS.md (v1.0.0 Active) - Second guideline in 05-quality category
- **PERFORMANCE_BUDGETS.md highlights**:
  - Bundle size budgets: <10KB per component (gzipped), <100KB full library
  - Component categories: Simple (<10KB), Medium (<12KB), Complex (<15KB), Overlays (<18KB)
  - Core Web Vitals targets: LCP <2.5s, FID <100ms, CLS <0.1, INP <200ms, TTFB <800ms
  - Lighthouse CI integration: ≥90 Performance score required, automatic PR blocking
  - Tree-shaking support: Vite preserveModules enabled (vite.config.js lines 24-26)
  - Bundle analysis tools: vite-bundle-visualizer, size-limit, bundlephobia
  - Performance optimization: Code splitting, lazy loading, image/font optimization
  - CI enforcement: Bundle size checks, Lighthouse CI, regression detection
  - Monitoring strategy: Lab data (Lighthouse CI), Field data (CrUX), Frequency (every PR)
  - .lighthouserc.json configuration example with assertion thresholds
  - GitHub Actions workflow for automated performance testing
  - Validation checklist: component development, build config, documentation sites, CI/CD
  - References to vite.config.js (lines 16-27, preserveModules pattern)
  - Optimized format (497 lines) - compact tables, focused examples
- **Category progress**: 05-quality now **50% complete (2/4 guidelines Active)** 🎉
- **Total progress**: 21/27 guidelines complete (78%)

### 2.10.0 (2025-11-03) - **05-QUALITY STARTED** 🚀

- **NEW**: TEST_COVERAGE.md (v1.0.0 Active) - First guideline in 05-quality category
- **TEST_COVERAGE.md highlights**:
  - 80% coverage threshold across lines, functions, branches, statements (industry standard)
  - 100% accessibility coverage requirement (all public components)
  - Vitest v8 coverage provider (fast, accurate, built-in)
  - CI enforcement: Vitest exits 1 if below thresholds, PR merge blocked
  - Coverage exclusions: `*.test.ts`, `*.spec.ts`, `*.a11y.test.ts`, `*.stories.ts`, `*.types.ts`, `index.ts`
  - Report formats: text (terminal), html (interactive), lcov (CI), json (programmatic)
  - HTML report viewing: `pnpm test:coverage && open coverage/index.html`
  - GitHub Actions integration pattern (automatic failure on threshold miss)
  - Strategies for improvement: parametrized tests, edge cases, mocking
  - Coverage anti-patterns: testing implementation details, coverage for sake, ignoring branches
  - Common low-coverage patterns: error handlers (40-60%), private methods (0%), async code (60-75%)
  - Validation checklist: component creation, accessibility, CI/CD, monitoring
  - References to vitest.config.js (components lines 40-43, tokens lines 29-33)
  - Optimized format (498 lines) - compact tables, focused examples
- **Category progress**: 05-quality now **25% complete (1/4 guidelines Active)** 🎯
- **Total progress**: 20/27 guidelines complete (74%)

### 2.9.0 (2025-11-03) - **04-ACCESSIBILITY 100% COMPLETE** 🎉🎉🎉

- **NEW**: COLOR_CONTRAST.md (v1.0.0 Active) - Fourth and FINAL guideline in 04-accessibility category
- **CATEGORY COMPLETE**: All 4/4 accessibility guidelines now Active ✅
- **COLOR_CONTRAST.md highlights**:
  - WCAG contrast ratios: 4.5:1 AA (normal text), 7:1 AAA, 3:1 UI components (WCAG 1.4.3, 1.4.11)
  - Large text exception: ≥18pt or ≥14pt bold can use 3:1 AA instead of 4.5:1
  - Automated token validation from `packages/tokens/tests/accessibility/contrast.test.js`
  - Contrast calculation formula: (L1 + 0.05) / (L2 + 0.05) with relative luminance
  - OKLCH lightness scale guidelines (L0-L15 dark text, L85-L100 light backgrounds)
  - Safe combinations: L10 on L95+ meets 4.5:1, L90+ on L5-15 for dark mode
  - Cross-flavor/mode testing (light, dark, high-contrast, forced-colors × 5 flavors)
  - Token-based validation pattern (text/background pairs, UI borders, status colors)
  - Tools: WebAIM Contrast Checker, Contrast Ratio, axe DevTools, Lighthouse
  - Common issues table (light gray fails, focus indicators, brand colors, placeholders)
  - Validation checklist (token design, automated testing, manual verification, documentation)
  - Optimized format (491 lines) - compact tables, reference-based
- **Quality review completed**:
  - ✅ Minimal duplication across 4 guidelines (jest-axe pattern acceptable overlap)
  - ✅ Excellent differentiation (each guideline has distinct focus)
  - ✅ Strong WCAG 2.1 AA coverage (keyboard, screen readers, contrast, testing)
  - ✅ Good cross-referencing (no circular dependencies)
  - ✅ Average 495 lines (99% of target) - exceptional agent optimization
  - ⚠️ Minor gaps identified (modal patterns, reduced-motion, form errors) - planned for v1.1.0
- **Optimization achievements**:
  - WCAG_COMPLIANCE: 490 lines ✅
  - KEYBOARD_NAVIGATION: 499 lines ✅
  - SCREEN_READER_SUPPORT: 500 lines ✅
  - COLOR_CONTRAST: 491 lines ✅
  - **Average: 495 lines** (99% of 500-line target)
- **Category progress**: 04-accessibility now **100% complete (4/4 guidelines Active)** 🎉🎉🎉
- **Total progress**: 19/27 guidelines complete (70%)

### 2.8.0 (2025-11-03) - **04-ACCESSIBILITY 75% COMPLETE** 🎯

- **NEW**: SCREEN_READER_SUPPORT.md (v1.0.0 Active) - Third guideline in 04-accessibility category
- **SCREEN_READER_SUPPORT.md highlights**:
  - Semantic HTML first (native elements over ARIA roles)
  - Accessible names priority: text content > aria-label > aria-labelledby
  - ARIA states and properties (aria-pressed, aria-expanded, aria-busy, aria-disabled)
  - Live regions for announcements (aria-live="polite/assertive", role="status/alert")
  - Screen reader testing guide (NVDA, JAWS, VoiceOver, TalkBack)
  - WCAG criteria (4.1.2 Name/Role/Value, 4.1.3 Status Messages, 1.3.1 Info/Relationships)
  - Patterns from sando-button (aria-label, role="status" spinner, aria-busy loading)
  - Common patterns (icon-only buttons, loading states, toggles, disabled links)
  - Testing procedure (navigate, listen, activate, verify announcements)
  - Validation checklist (accessible names, ARIA usage, live regions, screen reader testing)
  - Exactly 500 lines (at hard limit) - heavily optimized with compact tables
- **Category progress**: 04-accessibility now **75% complete (3/4 guidelines Active)** 🎉
- **Total progress**: 18/27 guidelines complete (67%)

### 2.7.0 (2025-11-03) - **04-ACCESSIBILITY 50% COMPLETE** 🎯

- **NEW**: KEYBOARD_NAVIGATION.md (v1.0.0 Active) - Second guideline in 04-accessibility category
- **KEYBOARD_NAVIGATION.md highlights**:
  - All interactive elements keyboard accessible (Tab, Shift+Tab, Enter, Space, Escape, Arrows)
  - Focus visible indicators (:focus-visible pseudo-class, 3:1 contrast ratio, WCAG 2.4.7 AA)
  - Logical tab order (DOM order = visual order, no positive tabindex values)
  - No keyboard traps (WCAG 2.1.2, Escape to close modals/dialogs)
  - Shadow DOM focus delegation (delegatesFocus: true for Web Components)
  - WCAG keyboard criteria table (2.1.1 Keyboard, 2.1.2 No Trap, 2.4.3 Focus Order, 2.4.7 Focus Visible)
  - Standard keyboard interactions (navigation, activation, component-specific keys)
  - Focus management patterns (modal focus trap, focus restoration)
  - Testing procedures (manual 7-step, automated with Vitest/Playwright)
  - Production patterns from sando-button.test.ts keyboard tests
  - Optimized format (499 lines) - tables for interactions, minimal code examples
- **Category progress**: 04-accessibility now **50% complete (2/4 guidelines Active)** 🎉
- **Total progress**: 17/27 guidelines complete (63%)

### 2.6.0 (2025-11-03) - **04-ACCESSIBILITY STARTED** 🚀

- **NEW**: WCAG_COMPLIANCE.md (v1.0.0 Active) - First guideline in 04-accessibility category
- **WCAG_COMPLIANCE.md highlights**:
  - WCAG 2.1 Level AA compliance (required), AAA where possible
  - jest-axe automated testing with toHaveNoViolations matcher
  - Contrast requirements: 4.5:1 AA normal text, 7:1 AAA, 3:1 UI components
  - Semantic HTML first approach (native elements over ARIA)
  - 5 Rules of ARIA (use native, don't change semantics, keyboard accessible, no hiding focusable, accessible names)
  - ARIA patterns table (button, alert, dialog, menu, tabs, etc.)
  - Testing coverage: 100% public components across all states/flavors/modes
  - Key WCAG criteria table (1.4.3 Contrast, 2.1.1 Keyboard, 4.1.2 Name/Role/Value)
  - References to production code (sando-button.a11y.test.ts, contrast.test.js)
  - Optimized format (490 lines) - tables, minimal prose, reference-based
- **Category progress**: 04-accessibility now **25% complete (1/4 guidelines Active)** 🎯
- **Total progress**: 16/27 guidelines complete (59%)

### 2.5.0 (2025-11-03) - **03-DEVELOPMENT 100% COMPLETE** 🎉

- **NEW**: TESTING_STRATEGY.md (v1.0.0 Active) - Fourth and FINAL guideline in 03-development category
- **CATEGORY COMPLETE**: All 4/4 development guidelines now Active ✅
- **TESTING_STRATEGY.md highlights**:
  - Test pyramid structure: 80% unit coverage, 100% a11y for public components, E2E for critical flows
  - Vitest unit testing: @open-wc/testing, fixture pattern, Shadow DOM queries, Lit reactivity
  - Accessibility testing: jest-axe with toHaveNoViolations, separate .a11y.test.ts files
  - Token testing: WCAG contrast validation (4.5:1 AA, 7:1 AAA), reference integrity, build output
  - Test file organization: Monolithic structure (tests colocated with components)
  - Coverage requirements: 80% thresholds from vitest.config.js
  - Test commands reference: Global, components, tokens test commands
  - Validation checklist: 4 stages (creation, commit, PR, release)
  - Ultra-optimized format (451 lines) - heavy use of tables, minimal prose, reference-based
- **Optimization achievements**:
  - CODE_STYLE: 609 lines ✅
  - NAMING_CONVENTIONS: 485 lines (refactored from 858) ✅
  - GIT_WORKFLOW: 521 lines ✅
  - TESTING_STRATEGY: 451 lines ✅
  - **Average: 516 lines** (perfectly within 400-600 range)
- **Category progress**: 03-development now **100% complete (4/4 guidelines Active)** 🎉🎉🎉
- **Total progress**: 15/27 guidelines complete (56%)

### 2.4.0 (2025-11-03) - **03-DEVELOPMENT 75% COMPLETE + OPTIMIZATION** 🎯

- **NEW**: GIT_WORKFLOW.md (v1.0.0 Active) - Third guideline in 03-development category
- **REFACTORED**: NAMING_CONVENTIONS.md (v1.0.0 → v2.0.0) - Agent optimization (858→485 lines, 43% reduction)
- **GIT_WORKFLOW.md highlights**:
  - Conventional commits standard: `type(scope): description` format with 10 commit types
  - Changesets workflow: Automated semantic versioning for monorepo releases
  - Branch naming: `type/description` pattern (feat/, fix/, docs/, chore/)
  - PR validation: CI checks (tests, lint, build) + 1+ approval required
  - 4-step release process: changeset → version-packages → build → release
  - Compact tables for commit types, semantic versioning rules, CI checks
  - Agent-optimized format (521 lines, reference-based)
- **NAMING_CONVENTIONS.md optimization**:
  - Reduced from 858→485 lines (43% reduction, 373 lines saved)
  - Cut verbose token architecture (now references TOKEN_ARCHITECTURE.md)
  - Reduced examples from 51 to 20 (kept essential patterns only)
  - Consolidated TypeScript conventions into compact tables
  - Streamlined file naming section (table format)
  - Reduced validation checklist from 35+ to 25 items
  - All critical content preserved (5 Core Rules, component/token/variable naming)
- **Optimization strategy**: Reference-based approach, tables over verbose text, 1-2 examples per rule
- **Category progress**: 03-development now **75% complete (3/4 guidelines Active)** 🎉
- **Only remaining**: TESTING_STRATEGY.md

### 2.3.0 (2025-11-03) - **NAMING_CONVENTIONS COMPLETE** 🎯

- **NEW**: NAMING_CONVENTIONS.md (v1.0.0 Active) - Second guideline in 03-development category
- Component naming: `sando-*` tag prefix (kebab-case), `Sando*` class prefix (PascalCase)
- File naming: kebab-case with standardized suffixes (.test.ts, .spec.ts, .a11y.test.ts, .types.ts, .stories.ts)
- Token naming: `--sando-` CSS prefix, three-layer architecture (Ingredients/Flavors/Recipes)
- Variable naming: camelCase (variables), PascalCase (types), UPPER_SNAKE_CASE (constants)
- Export naming: Named exports, type keyword for types, barrel exports via index.ts
- TypeScript conventions: Types vs interfaces, type suffix patterns, avoid enums
- Boolean naming: Descriptive prefixes (is*, has*, can*, should*) or clear short forms
- Event handler naming: handle* prefix for methods, on* prefix for callback props
- Production examples from sando-button.ts, sando-button.types.ts, color.json, button.json
- Comprehensive validation checklist covering all naming categories
- Agent-optimized format (~551 lines, reference-based, no duplication)
- **Category progress**: 03-development now 50% complete (2/4 guidelines Active) 🎉

### 2.2.0 (2025-11-03) - **03-DEVELOPMENT STARTED** 🚀

- **NEW**: CODE_STYLE.md (v1.0.0 Active) - First guideline in 03-development category
- Documented TypeScript strict mode configuration (references tsconfig.json)
- Established 5 Core Rules: strict mode, import organization, file naming, JSDoc, Prettier
- Import organization: 5 groups (external, Lit, types, internal, styles) with blank lines
- File naming: kebab-case with specific suffixes (.test.ts, .spec.ts, .a11y.test.ts, .types.ts, .stories.ts)
- JSDoc standards: Component-level docs with @element, @slot, @fires, @cssprop tags
- Prettier enforcement: Single quotes, 2-space indent, 100-char line width, no trailing commas
- Component code organization: static styles → public props → private state → lifecycle → helpers → render
- Variable naming: camelCase, PascalCase, UPPER_CASE conventions
- Token consumption patterns: Recipe tokens only (no Flavors/Ingredients in components)
- Referenced ESLint config (.eslintrc.cjs): TypeScript + Web Components + Lit plugins
- Referenced Prettier config (.prettierrc.json): Standard settings
- Production examples from sando-button.ts component
- Validation checklist covering TypeScript, formatting, naming, documentation
- Agent-optimized format (~609 lines, reference-based, no duplication)
- **Category progress**: 03-development now 25% complete (1/4 guidelines Active)

### 2.1.0 (2025-11-03) - **02-ARCHITECTURE COMPLETE** 🎉

- **NEW**: Complete 02-architecture category with 4 guidelines (all v1.0.0 Active)
- **MONOREPO_STRUCTURE.md** (~600 lines): Turborepo + pnpm workspace architecture, build orchestration, caching
- **COMPONENT_ARCHITECTURE.md** (~530 lines): Monolithic 7-file pattern, Lit patterns, Shadow DOM, FlavorableMixin
- **TOKEN_BUILD_SYSTEM.md** (~550 lines): Style Dictionary orchestrator, custom transforms, three-layer build
- **FRAMEWORK_INTEGRATION.md** (~480 lines): React, Vue 3, Angular, Svelte integration patterns, TypeScript support
- **Agent-optimized**: Reference-based (no duplication), 400-600 lines each, clear cross-references
- **Total added**: ~2160 lines of focused architectural documentation
- **Category progress**: 02-architecture now 100% complete (4/4 guidelines Active) 🎉

### 2.0.0 (2025-11-02) - **MAJOR GUIDELINE REFACTOR** 🎉

- **BREAKING**: All guidelines refactored for agent consumption (67% reduction: ~10,000 → ~3,300 lines)
- **BREAKING**: DESIGN_IDENTITY.md eliminated (redundant with specialized guidelines + JSON source files)
- **Optimized for AI agents**: Reduced duplication, focused on fundamental rules only
- **5 guidelines updated to v2.0.0**: TOKEN_ARCHITECTURE, COLOR_SYSTEM, TYPOGRAPHY_SYSTEM, SPACING_SYSTEM, MOTION_DESIGN
- **Added 3 critical new rules** to TOKEN_ARCHITECTURE.md:
  - "When to Create New Tokens" decision tree (Rule 2)
  - "CSS Variable Naming Convention" complete specification (Rule 3)
  - "Flavors vs Modes Distinction" to prevent confusion (Rule 4)
- **Pattern/anti-pattern examples** added to all rules for clarity
- **Single complete example** per guideline instead of 3-4 redundant examples
- **3-layer architecture** explanation reduced from ~80 lines to ~10 lines + link in each guideline
- **Source of truth**: Guidelines for rules/patterns, JSON source files for exact values
- **Token consumption savings**: ~120,000 → ~39,600 tokens (67% reduction for agent invocations)

#### Detailed Changes by Guideline:

- **DESIGN_IDENTITY.md**: ELIMINATED (~2900 lines removed)
  - Rationale: Redundant with specialized guidelines + JSON source files
  - Guidelines provide rules/patterns, JSON files provide exact values
  - Eliminates maintenance burden of syncing 3 sources of truth
- **TOKEN_ARCHITECTURE.md**: 1095 → 590 lines (46% reduction)
  - Added decision tree for when to create new tokens
  - Complete CSS variable naming specification
  - Flavors vs Modes distinction clarified
- **COLOR_SYSTEM.md**: 921 → 374 lines (59% reduction)
  - Complete palette (165 tokens) available in `packages/tokens/src/ingredients/color.json`
  - Reduced chroma curves to conceptual explanation
  - Contrast pairs defined in source JSON, not duplicated
- **TYPOGRAPHY_SYSTEM.md**: 736 → 442 lines (40% reduction)
  - Reduced duplicate 3-layer architecture explanation
  - Consolidated font size table (key sizes only)
  - Single complete example instead of 3
- **SPACING_SYSTEM.md**: 988 → 358 lines (64% reduction)
  - Eliminated migration guide (60 lines)
  - Consolidated 3 examples to 1 complete pattern
  - Reduced 3-layer explanation from 80 to 10 lines
- **MOTION_DESIGN.md**: 631 → 528 lines (16% reduction)
  - Consolidated 5 animation patterns to 3 core patterns
  - Removed extensive anti-pattern examples
  - Focus on GPU properties and token-based durations

### 1.0.5 (2025-11-02)

- Added MOTION_DESIGN.md guideline (Active v1.0.0)
- **Category 01-design-system now 100% complete (7/7 guidelines Active)** 🎉
- Documented duration scales (0ms-1000ms) and semantic timing (instant/fast/normal/slow)
- Established easing patterns for entrance/exit/state transitions
- Animation categories (feedback, transition, attention, decorative)
- Performance optimization with GPU-accelerated properties
- Automatic reduced-motion support via flavor-motion-reduce.json
- WCAG motion accessibility requirements (2.2.2, 2.3.1, 2.3.3)
- Animation anti-patterns and best practices

### 1.0.4 (2025-11-02)

- Added THEMING_STRATEGY.md guideline (Active)
- Documented critical distinction between Flavors (manual brand themes) and Modes (automatic accessibility)
- Established 5-file structure pattern per flavor (base + 4 mode files)
- FlavorableMixin automatic inheritance patterns
- Build system @media query wrapping for modes
- Sando-inspired flavor naming conventions
- Mode-specific behavior (dark, high-contrast, forced-colors, motion-reduce)

### 1.0.3 (2025-11-02)

- Added TYPOGRAPHY_SYSTEM.md guideline (Active)
- Added SPACING_SYSTEM.md guideline (Active)
- Added COMPONENT_DESIGN.md guideline (Active)
- Unified t-shirt sizing system (xs/sm/md/lg/xl) across spacing and components
- Documented system font stacks, responsive typography with clamp()
- Established variant taxonomy (visual, size, status, shape)
- Component API conventions and accessibility baseline

### 1.0.2 (2025-11-02)

- Added COLOR_SYSTEM.md guideline (Active)
- Documented OKLCH color space rationale and advantages
- Complete 15-color palette with algorithmic generation
- Contrast requirements and colorblind accessibility guidelines

### 1.0.1 (2025-11-02)

- Added TOKEN_ARCHITECTURE.md guideline (Active)
- Documented three-layer token system with real build system examples
- Updated guideline status tracking

### 1.0.0 (2025-11-02)

- Initial guidelines architecture established
- Moved DESIGN_IDENTITY.md to 01-design-system/
- Defined 6 categories: Design System, Architecture, Development, Accessibility, Quality, Documentation
- Created standard guideline template format
- Mapped agent/skill/command relationships

---

## Related Documents

- [GUIDELINES_ARCHITECTURE.md](../GUIDELINES_ARCHITECTURE.md) - Complete architecture and implementation plan
- [skills-implementation-plan.md](../../skills-implementation-plan.md) - Skills replacing agents
- [commands-implementation-plan.md](../../commands-implementation-plan.md) - Slash commands strategy
- [action-plan.md](../../action-plan.md) - Overall project roadmap
