# Guidelines Architecture

**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-02

---

## Purpose

This document defines the **centralized guidelines architecture** for the Sando Design System. It establishes a single source of truth for all project standardization, ensuring consistency across agents, skills, slash commands, and developer workflows.

**Core Principle**: Guidelines are centralized and referenced, never duplicated. When a guideline changes, it changes once.

---

## Guidelines Directory Structure

All guidelines are stored in `.claude/guidelines/` with a strict naming convention:

```
.claude/guidelines/
├── GUIDELINES_INDEX.md              # Master index and navigation
├── 01-design-system/                # ALL design-related guidelines
│   ├── DESIGN_IDENTITY.md           # Visual identity and brand philosophy (EXISTING)
│   ├── TOKEN_ARCHITECTURE.md        # Three-layer token system (Ingredients/Flavors/Recipes)
│   ├── COLOR_SYSTEM.md              # OKLCH color space, palettes, semantic colors
│   ├── TYPOGRAPHY_SYSTEM.md         # Type scale, font families, line heights
│   ├── SPACING_SYSTEM.md            # Spatial rhythm, grid system
│   ├── COMPONENT_DESIGN.md          # Component design patterns and variants
│   ├── THEMING_STRATEGY.md          # Flavor switching, theme creation
│   └── MOTION_DESIGN.md             # Animation principles, transitions, timing
├── 02-architecture/                 # Technical architecture patterns
│   ├── MONOREPO_STRUCTURE.md        # Turborepo, pnpm workspaces, build order
│   ├── COMPONENT_ARCHITECTURE.md    # Monolithic component structure (7-file pattern)
│   ├── TOKEN_BUILD_SYSTEM.md        # Style Dictionary orchestrator, custom transforms
│   └── FRAMEWORK_INTEGRATION.md     # React, Vue, Angular, Svelte usage
├── 03-development/                  # Coding standards and workflows
│   ├── CODE_STYLE.md                # TypeScript strict mode, ESLint, Prettier
│   ├── NAMING_CONVENTIONS.md        # Component names (sando-*), files, variables
│   ├── GIT_WORKFLOW.md              # Branching, commits, changesets, versioning
│   └── TESTING_STRATEGY.md          # Unit (Vitest), E2E (Playwright), coverage targets
├── 04-accessibility/                # WCAG and inclusive design
│   ├── WCAG_COMPLIANCE.md           # AA/AAA standards, ARIA patterns
│   ├── KEYBOARD_NAVIGATION.md       # Focus management, tab order, shortcuts
│   ├── SCREEN_READER_SUPPORT.md     # Semantic HTML, ARIA labels, live regions
│   └── COLOR_CONTRAST.md            # Contrast ratios, colorblind-safe palettes
├── 05-quality/                      # Quality assurance standards
│   ├── TEST_COVERAGE.md             # Coverage targets (85%+), test types
│   ├── PERFORMANCE_BUDGETS.md       # Bundle size, Core Web Vitals, Lighthouse
│   ├── SECURITY_STANDARDS.md        # XSS prevention, CSP, dependency scanning
│   └── VISUAL_REGRESSION.md         # Screenshot testing, diff thresholds
└── 06-documentation/                # Documentation standards
    ├── API_REFERENCE.md             # Props, slots, events, CSS variables
    ├── STORYBOOK_STORIES.md         # Story structure, controls, docs blocks
    ├── VITEPRESS_GUIDES.md          # Tutorial format, code examples
    └── INLINE_CODE_DOCS.md          # JSDoc, type annotations, comments
```

---

## Guideline Categories

### 01. Design System (Consolidated Design Guidelines)

**Purpose**: ALL design-related guidelines in one category - visual identity, tokens, components, theming, motion.

**Why consolidated**: Design decisions are interconnected. Token architecture informs color system, which affects theming, which influences component design. Keeping these together ensures designers and developers see the complete picture.

**Key Guidelines**:

- `DESIGN_IDENTITY.md` - Brand philosophy, visual identity, design principles (EXISTING)
- `TOKEN_ARCHITECTURE.md` - Three-layer system rules, reference integrity
- `COLOR_SYSTEM.md` - OKLCH rationale, palette generation, semantic mapping
- `TYPOGRAPHY_SYSTEM.md` - Type scale math, font loading, responsive typography
- `SPACING_SYSTEM.md` - 4px base unit, comfortable/compact modes
- `COMPONENT_DESIGN.md` - Variant patterns, size scales, state design
- `THEMING_STRATEGY.md` - Flavor creation, CSS variable overrides
- `MOTION_DESIGN.md` - Easing curves, duration scales, accessibility preferences

**Referenced by**: `ui-designer` agent, `design-ops-specialist` agent, `component-creator` skill, `flavor-creator` skill

---

### 02. Architecture

**Purpose**: Technical architecture patterns and build system configuration.

**Key Guidelines**:

- `MONOREPO_STRUCTURE.md` - Package organization, Turborepo caching, build order
- `COMPONENT_ARCHITECTURE.md` - 7-file monolithic pattern, Shadow DOM, Lit patterns
- `TOKEN_BUILD_SYSTEM.md` - Style Dictionary config, custom transforms, output formats
- `FRAMEWORK_INTEGRATION.md` - Web Component usage in React/Vue/Angular/Svelte

**Referenced by**: `design-system-architect` agent, `developer-tooling-specialist` agent, `frontend-developer` agent

---

### 03. Development

**Purpose**: Day-to-day coding standards and development workflows.

**Key Guidelines**:

- `CODE_STYLE.md` - TypeScript config, linting rules, formatting
- `NAMING_CONVENTIONS.md` - `sando-*` prefix, file naming, variable naming, token naming
- `GIT_WORKFLOW.md` - Conventional commits, changesets, release process
- `TESTING_STRATEGY.md` - Test pyramid, mocking patterns, test organization

**Referenced by**: `frontend-developer` agent, `qa-expert` agent, `/review-component` command, `/test-component` command

---

### 04. Accessibility

**Purpose**: WCAG compliance and inclusive design standards.

**Key Guidelines**:

- `WCAG_COMPLIANCE.md` - AA/AAA checklist, testing tools (axe-core), audit process
- `KEYBOARD_NAVIGATION.md` - Focus visible, tab order, escape/enter patterns
- `SCREEN_READER_SUPPORT.md` - Semantic HTML, ARIA usage, testing with NVDA/JAWS
- `COLOR_CONTRAST.md` - 4.5:1 normal text, 3:1 large text, tools (Contrast Checker)

**Referenced by**: `accessibility-advocate` agent (if retained), `qa-expert` agent, `frontend-developer` agent, `/check-a11y` command

---

### 05. Quality

**Purpose**: Quality gates and non-functional requirements.

**Key Guidelines**:

- `TEST_COVERAGE.md` - 85% unit, 80% E2E, 100% a11y for public components
- `PERFORMANCE_BUDGETS.md` - 50kb/component, LCP <2.5s, CLS <0.1
- `SECURITY_STANDARDS.md` - CSP headers, npm audit CI, XSS prevention checklist
- `VISUAL_REGRESSION.md` - Percy/Chromatic setup, diff tolerance, review workflow

**Referenced by**: `qa-expert` agent, `performance-monitor` agent, `security-compliance-auditor` agent, `/coverage` command, `/perf` command

---

### 06. Documentation

**Purpose**: Documentation format standards for consistency.

**Key Guidelines**:

- `API_REFERENCE.md` - Property tables, event documentation, CSS variable listings
- `STORYBOOK_STORIES.md` - Story naming, controls setup, MDX docs blocks
- `VITEPRESS_GUIDES.md` - Tutorial structure, code snippet formatting, frontmatter
- `INLINE_CODE_DOCS.md` - JSDoc format, type annotations, helpful comments

**Referenced by**: `technical-writer` agent, `frontend-developer` agent, `/document-component` command

---
