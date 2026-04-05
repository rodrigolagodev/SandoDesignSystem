---
name: agent-guidelines-compact
description: >-
  Compact guidelines digest for Sando Design System agents. Replaces the
  full `## 📚 MANDATORY: Read Guidelines Before ANY Work` block that is
  duplicated across every specialist agent. Provides pre-digested, token-
  efficient rules organized by agent type. Trigger: inject into sub-agent
  prompts before task-specific instructions to avoid each agent re-reading
  full .toon guideline files (saves ~2000-5000 tokens per workflow).

license: MIT
metadata:
  version: 1.0.0
  author: Sando Design System
---

# Agent Guidelines Compact

Pre-digested rules from Sando Design System guidelines. Inject the relevant
section(s) into sub-agent prompts to eliminate per-agent guideline file reads.

---

## For Delegators (Orchestrators)

Inject the matching block(s) into the sub-agent prompt under
`## Project Standards (auto-resolved)` BEFORE task-specific instructions.
Select blocks by agent role:

- `sando-developer` → inject **DEVELOPER** + **SHARED**
- `sando-tokens` → inject **TOKENS** + **SHARED**
- `sando-quality` → inject **QUALITY** + **SHARED**
- `sando-storybook` → inject **STORYBOOK** + **SHARED**
- `sando-architect` → inject **ARCHITECT** + **SHARED**
- `sando-documenter` → inject **DOCUMENTER** + **SHARED**
- `sando-ux-designer` → inject **UX_DESIGNER** + **SHARED**
- `sando-ux-writer` → inject **UX_WRITER** + **SHARED**

---

## SHARED — All Agents

```
NAMING: All web component tags → `sando-{name}`, class → `Sando{Name}`,
events → `sando-{event}` (bubbles: true, composed: true).
FILE PATTERN: 7 files per component: sando-{name}.ts, .types.ts, .test.ts,
.a11y.test.ts, .stories.ts, index.ts, styles/ dir.
TOKEN LAYERS: Ingredients (L1) → Flavors (L2) → Recipes (L3).
Components ONLY consume L3 Recipe tokens: var(--sando-{component}-{prop}-{state}).
NEVER use L1 var(--sando-color-*) or L2 var(--sando-flavor-*) in components.
COMMIT: type(scope): description — no Co-Authored-By, no AI attribution.
```

---

## DEVELOPER — sando-developer

```
COMPONENT BASE: always extends FlavorableMixin(LitElement).
STYLES: only Recipe (L3) tokens. Hardcoded colors/spacing = BLOCKING violation.
KEYBOARD: every interactive element needs @keydown for Enter/Space/Escape.
ARIA: role, aria-checked/pressed/expanded, aria-disabled, aria-label as needed.
SHADOW DOM: use `part="{name}"` on root element for external CSS targeting.
REGISTRATION: @customElement('sando-{name}') + declare global HTMLElementTagNameMap.
EXPORTS: index.ts must re-export class + all types. Update packages/components/src/index.ts.
STYLE IMPORTS: import { css } from 'lit' — never external CSS files.
```

**Key guideline files (read only if task is ambiguous):**

- `COMPONENT_ARCHITECTURE.toon` — 7-file pattern, shadow DOM, mixins
- `TOKEN_ARCHITECTURE.toon` — three-layer rule (L3 only in components)
- `NAMING_CONVENTIONS.toon` — prefix rules, camelCase tokens
- `KEYBOARD_NAVIGATION.toon` — only for new interactive components

---

## TOKENS — sando-tokens

```
L1 INGREDIENTS: absolute values only (oklch colors, rem spacing). NO references.
L2 FLAVORS: reference ONLY L1 ingredients via {token.path.value}.
L3 RECIPES: reference ONLY L2 flavor semantic tokens (color.action.*, color.background.*).
NAMING: --sando-{component}-{variant}-{property}-{state}
 e.g. --sando-button-solid-backgroundColor-default
RECIPE STRUCTURE: define all variants × states × sizes for each component.
BUILD: always run `pnpm tokens:build` after changes. Never mark complete if build fails.
COLORS: use OKLCH format for all new colors — not hex, not hsl.
```

**Key guideline files (read only if task is ambiguous):**

- `TOKEN_ARCHITECTURE.toon` — three-layer rule, reference chaining
- `THEMING_STRATEGY.toon` — when creating new flavors
- `TOKEN_BUILD_SYSTEM.toon` — Style Dictionary config

---

## QUALITY — sando-quality

```
COVERAGE: unit ≥ 80% (blocking), a11y = 100% for public components (blocking).
AXE-CORE: 0 critical or serious violations (blocking).
TEST GROUPS: rendering, props, events, keyboard navigation.
A11Y GROUPS: axe-core, ARIA attributes, focus management, keyboard accessibility.
FIXTURES: use @open-wc/testing `fixture()` + Chai assertions.
KEYBOARD: use @web/test-runner-commands `sendKeys()` for keyboard tests.
COVERAGE: run `pnpm test:coverage` — never report passing without actual run.
NEVER: mock shadow DOM internals, skip disabled-state tests, ignore edge cases.
```

**Key guideline files (read only if task is ambiguous):**

- `TESTING_STRATEGY.toon` — test pyramid, frameworks, patterns
- `TEST_COVERAGE.toon` — exact thresholds and blocking rules
- `WCAG_COMPLIANCE.toon` — WCAG 2.1 AA requirements

---

## STORYBOOK — sando-storybook

```
FORMAT: CSF 3.0 — named exports per story, default export as meta.
CONTROLS: argTypes must map 1:1 to component @property decorators.
DECORATOR: FlavorDecorator wraps every story for flavor switching.
SECTIONS: stories live in Tokens/ Components/ or Patterns/ top-level sections.
TITLE: 'Components/sando-{name}' or 'Tokens/{category}'.
PLAY FUNCTIONS: use @storybook/test userEvent + expect for interaction tests.
A11Y ADDON: configure via parameters.a11y — never disable globally.
IMPORT: always `import './sando-{name}.js'` (not .ts) in story file.
```

**Key guideline files (read only if task is ambiguous):**

- `STORYBOOK_STORIES.toon` — story structure, argTypes, organization
- `COMPONENT_ARCHITECTURE.toon` — component API reference
- `THEMING_STRATEGY.toon` — flavor decorator patterns

---

## ARCHITECT — sando-architect

```
DECISIONS: always document rationale in ADR format (title, status, context, decision, consequences).
LAYERS: Ingredient → Flavor → Recipe chain must be preserved on all token decisions.
BREAKING CHANGES: require migration guide + semver major bump proposal.
PATTERNS: establish patterns in .toon guidelines — not inline in components.
FLAVORS: new flavor = flavor.json + flavor-dark.json minimum. Other variants optional.
COMPOUND COMPONENTS: use slots + parts pattern — no tight coupling via properties.
```

**Key guideline files (read only if task is ambiguous):**

- Full `.opencode/guidelines/` tree — architect reads whatever is relevant

---

## DOCUMENTER — sando-documenter

```
API DOCS: JSDoc on every public @property, event, slot, CSS part.
FORMAT: @property with type + default + description. @fires for events. @slot for slots.
README: component name, description, installation, usage (HTML + JS), API table.
VITEPRESS: docs live in docs/components/{name}.md — follow existing structure.
NEVER: write Storybook stories (→ sando-storybook handles those).
```

**Key guideline files (read only if task is ambiguous):**

- `INLINE_CODE_DOCS.toon` — JSDoc format and coverage requirements
- `COMPONENT_ARCHITECTURE.toon` — what to document per component

---

## UX_DESIGNER — sando-ux-designer

```
STATES: every interactive component needs: default, hover, focus, active, disabled, loading (if async).
WCAG: AA minimum — 4.5:1 text, 3:1 UI elements. Never sacrifice accessibility for aesthetics.
MOTION: respect prefers-reduced-motion. Provide reduced-motion flavor variant.
PATTERNS: favor native HTML semantics before ARIA. Use ARIA only when native falls short.
SPEC FORMAT: component name, states matrix, interaction flows, accessibility notes, open questions.
```

---

## UX_WRITER — sando-ux-writer

```
TONE: warm precision — clear, direct, friendly but not chatty. See VOICE_AND_TONE.toon.
ERRORS: specific + actionable — state what happened + what to do. Never blame the user.
EMPTY STATES: explain why it's empty + what action resolves it.
LABELS: verb + noun for CTAs ("Add component"), noun phrases for labels ("Component name").
LENGTH: UI copy → as short as possible. Docs → as long as needed.
```

**Key guideline file:** `VOICE_AND_TONE.toon` — always read before writing any copy.

---

## Compact Rules (for skill-registry)

- Inject SHARED block into every sub-agent prompt
- Select agent-specific block by agent role (DEVELOPER, TOKENS, QUALITY, etc.)
- Inject both blocks under `## Project Standards (auto-resolved)` BEFORE task instructions
- This replaces the full guidelines_protocol block in each agent — saves 2000-5000 tokens/workflow
- Sub-agents that receive these digests SKIP reading .toon files unless the task is explicitly ambiguous
- The digest is NOT a substitute for reading guidelines when implementing a NEW pattern or making architectural decisions
