# Sando Design System — Comparative Analysis Prompt

---

## ROLE

You are a **Senior Design System Architect & Strategist** with 10+ years of hands-on experience building, scaling, and auditing design systems across enterprise and open-source organizations. You have deep expertise in:

- Token architecture (Style Dictionary, design token standards, multi-layer systems)
- Web Components (Lit, Stencil, Shoelace), React component libraries, and framework-agnostic patterns
- Color science (OKLCH, perceptual uniformity, WCAG contrast algorithms)
- Accessibility engineering (WCAG 2.1/2.2, ARIA, automated a11y testing, forced-colors mode)
- Monorepo tooling (Turborepo, Nx, pnpm workspaces, tree-shaking, CDN distribution)
- You have personally worked with or audited: Material Design 3, Radix UI, Chakra UI, Tailwind CSS, IBM Carbon, Adobe Spectrum, Shoelace, and Lion Web Components

---

## INSTRUCTIONS

Perform a **comprehensive comparative analysis** of the **Sando Design System** against 8 industry-leading design systems. Your goal is to evaluate Sando's production-readiness, identify its unique innovations worth preserving, expose critical gaps, and deliver a prioritized action plan to bring Sando to production release.

This analysis will directly inform architectural and strategic decisions. Be rigorous, honest, and specific. Praise only what genuinely deserves it. Flag everything that falls short.

---

## SANDO DESIGN SYSTEM — FULL ARCHITECTURE CONTEXT

> **Read this entire section carefully.** This is the complete architectural specification of Sando. You do NOT need external files — everything required for analysis is embedded below.

### Brand & Philosophy

- **Metaphor**: Named after the Japanese Katsu Sando sandwich. Every layer of the system maps to sandwich ingredients — bread (structure), filling (content), sauce (flavor/theme).
- **7 Pillars**: Craftsmanship, Accessibility, Intentionality, Flexibility, Simplicity, Transparency, Balance.
- **Core Philosophy**: "Curated Not Custom" — ship 8 hand-tuned palettes rather than infinite customization knobs. Opinionated defaults over configuration burden.
- **Warm Color Identity**: Tonkatsu Amber (brown primary), Shokupan Cream (warm off-white background), Ink (warm dark brown text). Anti-corporate, warm, approachable.
- **6 Shipped Flavors (themes)**: original, sando, tonkatsu, strawberry, egg-salad, kiwi.

### Three-Layer Token Architecture

Sando uses a strict three-layer token system with **one-way referencing** enforced by tests:

| Layer | Name            | Purpose                                                                                 | References                | Location                                                   |
| ----- | --------------- | --------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------- |
| 1     | **Ingredients** | Raw absolute values (OKLCH colors, rem spacing, font sizes). Brand-agnostic primitives. | Nothing (absolute values) | `packages/tokens/src/ingredients/*.json`                   |
| 2     | **Flavors**     | Semantic tokens that map to brand intent. Enable theming.                               | ONLY Ingredients          | `packages/tokens/src/flavors/{name}/` (5 files per flavor) |
| 3     | **Recipes**     | Component-specific tokens. One file per component.                                      | ONLY Flavors              | `packages/tokens/src/recipes/*.json`                       |

- **Strict flow**: Components consume Recipes → Recipes reference Flavors → Flavors reference Ingredients → Ingredients hold absolute values. **No layer skipping.** Enforced by automated tests.
- **CSS variable naming**: `--sando-{category}-{property}-{variant?}-{state?}`
- **Build tooling**: Style Dictionary 4.0, outputs CSS custom properties + TypeScript constants.
- **Each flavor has 5 files**: `flavor.json` (base/light), `flavor-dark.json`, `flavor-high-contrast.json`, `flavor-forced-colors.json`, `flavor-motion-reduce.json`.

### Color System

- **Color space**: OKLCH for perceptual uniformity (not HSL/hex).
- **Universal lightness scale**: 11 steps — 50(L:0.98), 100(0.95), 200(0.90), 300(0.82), 400(0.73), 500(0.64), 600(0.56), 700(0.47), 800(0.38), 900(0.30), 950(0.22).
- **15 color hues** + 3 utilities (white, black, transparent) = **165 color tokens** total (15 hues x 11 steps).
- **4 saturation profiles**: High (0.20-0.22), Medium (0.17-0.20), Low (0.14-0.16), Neutral (0.005-0.018).
- **Algorithmic generation**: A function generates any new color by specifying hue angle + saturation profile. The lightness scale is universal.
- **Accessibility**: WCAG AA minimum (4.5:1 text, 3:1 UI elements), AAA target. Colorblind safety achieved via lightness contrast (not just hue differentiation).

### Theming Strategy

Two orthogonal systems:

| Concept     | Mechanism               | Triggered By                                    | Purpose                                                 |
| ----------- | ----------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| **Flavors** | Manual brand themes     | `flavor="name"` HTML attribute (developer sets) | Brand differentiation, visual variety                   |
| **Modes**   | Automatic accessibility | `@media` queries (user's OS preference)         | dark mode, high-contrast, forced-colors, reduced-motion |

- **FlavorableMixin**: A Lit mixin that enables flavor inheritance through the DOM tree. Resolution: check own `flavor` attribute → traverse ancestors → fall back to default flavor.
- **Section-level overrides**: Any container can set `flavor="strawberry"` and all descendants inherit it.
- **Component-level overrides**: Individual components can override with their own `flavor` attribute.

### Typography System

- **Font stacks**: System fonts by default (system-ui, -apple-system, Segoe UI, Roboto, etc.) — zero network latency, no FOUT.
- **Modular scale**: Ratio ~1.125-1.25, 10 steps: 50(10px), 100(11px), 200(13px), 300(16px=base), 400(18px), 500(20px), 600(24px), 700(30px), 800(36px), 900(48px).
- **Units**: `rem` throughout. `clamp()` for responsive headings (fluid between breakpoints).
- **Line-heights**: Unitless values (1.0, 1.2, 1.5, 1.6). WCAG minimum 1.5 for body text.

### Spacing System

- **Base unit**: 4px (0.25rem). Linear scale 0-13, then exponential 16-64.
- **T-shirt sizing**: xs(4px), sm(8px), md(16px), lg(24px), xl(32px).
- **Inset vs Stack**: Inset = padding inside components. Stack = spacing/gap between elements.
- **Control sizing**: xs(32px), sm(36px), md(44px = WCAG touch target default), lg(52px), xl(64px).
- **Logical properties**: Mandated (`padding-inline-start`, not `padding-left`) for RTL/LTR support.

### Motion Design

- **Token-based durations**: instant(0ms), fast(200ms), normal(300ms), slow(500ms).
- **GPU-only properties**: Only animate transform, opacity, filter. Never width, height, margin, or layout-triggering properties.
- **Semantic easing**: default(ease-in-out), entrance(ease-out), exit(ease-in).
- **Automatic reduced-motion**: The `flavor-motion-reduce.json` mode file overrides all durations to 0ms. Applied via `@media (prefers-reduced-motion: reduce)`. No developer action needed.

### Component Architecture

- **Framework**: Lit 3.x Web Components with Shadow DOM (mandatory, no opt-out).
- **Element prefix**: `sando-*` (e.g., `sando-button`, `sando-card`).
- **Class prefix**: `Sando*` (e.g., `SandoButton`).
- **Base class**: `FlavorableMixin(LitElement)` for all themeable components.
- **7-file monolithic pattern** per component:

  | File           | Purpose                                           |
  | -------------- | ------------------------------------------------- |
  | `component.ts` | Main Lit element class, render, lifecycle         |
  | `types.ts`     | TypeScript types, interfaces, unions for variants |
  | `test.ts`      | Unit tests (Vitest + @open-wc/testing)            |
  | `a11y.test.ts` | Accessibility tests (axe-core)                    |
  | `stories.ts`   | Storybook stories                                 |
  | `index.ts`     | Public barrel export                              |
  | `styles/`      | Directory for CSS (constructed stylesheets)       |

- **resetStyles**: Mandatory first style import in every component for cross-browser normalization inside Shadow DOM.

### Variant Taxonomy

| Category | Options                                      | Default |
| -------- | -------------------------------------------- | ------- |
| Visual   | solid, outline, ghost, text                  | solid   |
| Size     | xs, sm, md, lg, xl                           | md      |
| Status   | default, success, destructive, warning, info | default |
| Shape    | none, default, full                          | default |

- **Required interactive states**: default, hover, active, focus, disabled.
- **Optional states**: loading, pressed, invalid, readonly.
- **API conventions**: `reflect: true` for styling props, sensible defaults, TypeScript union types.
- **Events**: Use native events when possible. Custom events use `bubbles: true, composed: true` to cross Shadow DOM boundaries.

### Monorepo & Build

- **Tooling**: Turborepo + pnpm workspaces.
- **Packages**: `@sando-ds/tokens`, `@sando-ds/components`.
- **Apps**: `@sando-ds/docs` (Storybook 8), `@sando-ds/site` (VitePress).
- **Build chain**: tokens → components → apps (strict dependency order).
- **Dependency protocol**: `workspace:*` for internal packages.

### Framework Integration

- **Framework-agnostic**: Web Components work natively in vanilla JS, Vue, Angular, Svelte.
- **React**: Requires wrapper or `@lit/react` for event handling and property binding.
- **SSR**: Client-only rendering or Declarative Shadow DOM (DSD) for server-rendered content.
- **Events**: `composed: true` ensures events cross shadow boundaries for framework compatibility.

### Accessibility

- WCAG 2.1 AA minimum, AAA target for all components.
- 4 automatic accessibility modes via `@media` queries (dark, high-contrast, forced-colors, reduced-motion).
- 44px minimum touch targets (WCAG 2.5.5 Level AAA).
- Focus visible: minimum 2px outline, minimum 2px offset.
- Automated testing: axe-core via `a11y.test.ts` for every public component.
- Colorblind safety: Contrast relies on lightness differences, not hue alone.

### Quality Targets

- 80% test coverage minimum, 100% a11y coverage for public components.
- Testing stack: Vitest + @open-wc/testing + axe-core.
- Performance budget: <10KB gzipped per component, Lighthouse score >= 90.

---

## COMPETITORS TO COMPARE AGAINST

Analyze Sando against these 8 design systems. For each, use your knowledge of their current (2025) architecture:

| #   | System                         | Org           | Key Characteristics                                                                        |
| --- | ------------------------------ | ------------- | ------------------------------------------------------------------------------------------ |
| 1   | **Material Design 3**          | Google        | Design Tokens (Material You), dynamic color, Compose/Web, massive ecosystem                |
| 2   | **Radix UI / Radix Themes**    | WorkOS        | Headless primitives (unstyled) + opinionated theme layer, React-focused                    |
| 3   | **Chakra UI**                  | Chakra        | Style props DX, runtime CSS-in-JS (→ Panda CSS migration), React-focused                   |
| 4   | **Tailwind CSS / Headless UI** | Tailwind Labs | Utility-first CSS + unstyled accessible components, framework-agnostic CSS                 |
| 5   | **IBM Carbon**                 | IBM           | Enterprise-grade, comprehensive token system, extensive guidelines, Web Components + React |
| 6   | **Adobe Spectrum**             | Adobe         | Spectrum Web Components (Lit-based), sophisticated token system, rigorous a11y             |
| 7   | **Shoelace / Web Awesome**     | Cory LaViska  | Lit-based Web Components, similar tech stack to Sando, growing community                   |
| 8   | **Lion Web Components**        | ING Bank      | Lit-based, enterprise-grade, white-label first, form-heavy, extension model                |

---

## STEPS

Execute the analysis in this exact order:

### Phase 1: Understand Sando

Re-read the Sando architecture context above. Identify the system's core design decisions, trade-offs, and stated goals. Note: Sando is PRE-RELEASE — evaluate it as an emerging system, not a mature one.

### Phase 2: Dimension-by-Dimension Comparison

For each of the 12 analysis dimensions below, evaluate Sando and all 8 competitors on a **1-5 maturity scale**:

| Score | Meaning                                        |
| ----- | ---------------------------------------------- |
| 1     | Missing or fundamentally broken                |
| 2     | Basic/partial implementation, significant gaps |
| 3     | Functional but incomplete, some gaps           |
| 4     | Solid implementation, minor gaps               |
| 5     | Industry-leading, exemplary                    |

**The 12 Dimensions:**

1. **Token Architecture** — Layers, naming conventions, build pipeline, composability, Standards compliance (W3C Design Tokens)
2. **Color System** — Color space, palette generation, semantic mapping, contrast tooling
3. **Theming Strategy** — Multi-theme support, dark mode, high-contrast, forced-colors, cascading/inheritance
4. **Typography System** — Type scale, fluid/responsive sizing, font loading strategy, vertical rhythm
5. **Spacing System** — Base unit, consistency, responsive spacing, logical properties, density support
6. **Motion Design** — Duration/easing tokens, reduced-motion support, GPU optimization, choreography
7. **Component Architecture** — Patterns, composition model, Shadow DOM strategy, extensibility
8. **Accessibility** — WCAG level, automated testing, mode support, keyboard/screen reader, touch targets
9. **Developer Experience** — API consistency, TypeScript quality, documentation, error messages, onboarding
10. **Framework Integration** — Cross-framework support, SSR, hydration, wrapper quality, bundle impact
11. **Ecosystem Maturity** — Community size, third-party integrations, adoption, learning resources, stability
12. **Build & Distribution** — Monorepo structure, tree-shaking, CDN delivery, versioning, changelog

### Phase 3: Identify Sando's Unique Innovations

List architectural decisions or design choices in Sando that are **genuinely novel or superior** compared to the competitors. For each innovation, explain:

- What it is
- Why it matters
- Which competitors lack it or implement it worse
- Whether it should be kept, enhanced, or promoted as a differentiator

### Phase 4: Critical Gap Analysis

Identify every significant gap or weakness in Sando. For each gap:

- **Severity**: P0 (blocks production) / P1 (should fix before v1.0) / P2 (nice to have for v1.0, required for v2.0)
- **Description**: What's missing or wrong
- **Impact**: What breaks or suffers because of it
- **Best-in-class reference**: Which competitor handles this best, and how
- **Recommended action**: Keep as-is / Modify / Adopt pattern from [competitor] / Remove

### Phase 5: Strategic Positioning & Action Plan

Synthesize everything into a strategic view and actionable roadmap.

---

## EXPECTATIONS

Your output MUST include ALL of the following sections, in this order:

### 1. Executive Summary (2-3 paragraphs)

Sando's overall position in the landscape. Core strengths, critical weaknesses, and strategic recommendation in plain language. Be direct.

### 2. Maturity Scorecard

A markdown table with scores for all 12 dimensions across Sando + 8 competitors (9 columns total). Include a TOTAL row. Format:

```
| Dimension              | Sando | MD3 | Radix | Chakra | Tailwind | Carbon | Spectrum | Shoelace | Lion |
|------------------------|-------|-----|-------|--------|----------|--------|----------|----------|------|
| Token Architecture     |   ?   |  ?  |   ?   |   ?    |    ?     |   ?    |    ?     |    ?     |  ?   |
| ...                    |       |     |       |        |          |        |          |          |      |
| **TOTAL**              |   ?   |  ?  |   ?   |   ?    |    ?     |   ?    |    ?     |    ?     |  ?   |
```

### 3. Sando's Unique Innovations

Bulleted list of innovations with analysis per Phase 3 instructions. Minimum 5 items.

### 4. Critical Gaps

Table or structured list per Phase 4 instructions. Every gap must have severity, description, impact, reference, and recommended action.

### 5. Competitive Position Map

Describe Sando's position on two strategic axes:

- **X-axis**: Developer Experience (low → high)
- **Y-axis**: Enterprise Readiness (low → high)

Place all 9 systems on this map (use a text-based quadrant diagram or descriptive positioning). Identify Sando's natural competitive neighborhood.

### 6. Prioritized Action Plan

Three tiers:

- **P0 — Must-fix for production release**: Items that would make Sando embarrassing or non-functional in production.
- **P1 — Should-fix for v1.0**: Items that significantly impact adoption or developer trust.
- **P2 — Target for v1.x/v2.0**: Items that improve competitive position but aren't blockers.

For each item: describe what to do, estimated effort (S/M/L/XL), and which competitor to reference as a model.

### 7. Decision Matrix

For each gap identified, provide a clear recommendation:

| Gap | Decision                       | Rationale | Reference System |
| --- | ------------------------------ | --------- | ---------------- |
| ... | Keep / Modify / Adopt / Remove | ...       | ...              |

---

## NARROWING

### DO

- Be brutally honest about Sando's weaknesses — this analysis informs real decisions.
- Score based on current (2025) state of each system, not roadmaps or promises.
- Consider Sando's pre-release status: be fair but hold it to production standards.
- Highlight where Sando's smaller scope is an advantage (less complexity, faster decisions).
- Provide specific, actionable recommendations, not vague "improve documentation."
- When recommending adoption from a competitor, describe WHAT to adopt and HOW to adapt it to Sando's architecture.

### DO NOT

- Do not pad scores to make Sando look better or worse than it is.
- Do not give academic comparisons with no actionable takeaway.
- Do not recommend changes that contradict Sando's core philosophy ("Curated Not Custom," warm brand identity, Web Components commitment).
- Do not suggest switching to React or abandoning Web Components — Sando is committed to framework-agnostic Lit/Web Components.
- Do not recommend adopting every feature from every competitor — focus on what moves the needle for production readiness.
- Do not evaluate ecosystems by community size alone — quality and architectural fit matter more.

### ASSUMPTIONS

- Sando is targeting mid-size teams (5-50 developers) building product UIs, not a Google/IBM-scale enterprise system.
- First-party component count at v1.0 will be 15-30 components (not 60+).
- The primary distribution channel is npm, not CDN.
- Documentation will be Storybook + VitePress site.

---

## FINAL NOTE

The ultimate purpose of this analysis is to make **informed, confident decisions** about what to keep, what to change, and what to build next — so that Sando ships a production-quality v1.0 that is architecturally sound, genuinely accessible, and delightful to use. Do not hold back.
