# ADR-007: Theme Builder — Storybook Placement and V1 Scope

**Status:** Accepted  
**Date:** 2026-06-24  
**Author:** sando-architect  
**Affects:** Storybook section taxonomy, issue #88 (Theme Builder)  
**Priority:** P2 (unblocks Theme Builder implementation)

---

## Context

Issue #88 introduces the **Theme Builder**: an interactive Storybook tool that lets developers generate custom OKLCH color palettes, preview them scoped to a wrapper element (never mutating `:root`), and export them as CSS or JSON.

The tool is a docs-only, interactive story. It is **not** a public component and will not be published in `packages/components`. It uses `palette-generator.js` from `packages/tokens/scripts/generators/` and the `culori` library (already a dependency of `@sando-ds/tokens`).

Two decisions are required before implementation:

1. Where in the Storybook navigation tree does the tool live?
2. Does V1 include a light/dark toggle in the preview pane?

### Current Storybook section structure

| Top-level section  | Source directory                      | Content                            |
|--------------------|---------------------------------------|------------------------------------|
| `Getting Started/` | `apps/docs/stories/getting-started/`  | Installation, Introduction, Theming |
| `Tokens/`          | `apps/docs/stories/01-ingredients/`   | Ingredient and Flavor token stories |
| `Components/`      | `packages/components/src/components/` | Component stories                   |
| `Guides/`          | `apps/docs/stories/guides/`           | Architecture, Contributing, A11y    |

There is no existing `Tools/` section.

---

## Decision 1: Storybook Section — `Tools/` as new top-level section

### Options Considered

**Option A — New `Tools/` top-level section**  
Add `apps/docs/stories/tools/` and register its glob in `main.js`. The Theme Builder renders at `Tools/Theme Builder`.

**Option B — Under `Guides/`**  
Render at `Guides/Theme Builder`. No new section or glob needed.

**Option C — Under `Patterns/`**  
Create a `Patterns/` top-level section containing both UX patterns and developer tools.

### Analysis

| Criterion                      | A (Tools/) | B (Guides/) | C (Patterns/) |
|-------------------------------|------------|-------------|---------------|
| Semantically accurate          | ✅         | ✗           | ✗             |
| Extensible for future tools    | ✅         | ✗           | ~             |
| Avoids conflating written docs | ✅         | ✗           | ~             |
| Minimal structural impact      | ~          | ✅          | ✗             |

`Guides/` conflates written documentation (Contributing.mdx, Architecture.mdx) with interactive tools — a fundamentally different content type. `Patterns/` adds ambiguity: patterns are typically UX or structural patterns, not tools. A dedicated `Tools/` section is semantically unambiguous and extensible (Spacing Explorer, Icon Browser, and similar developer tools can join it in the future).

### Decision

**Option A — `Tools/` as a new top-level Storybook section.**

Implementation requires:
1. Add `apps/docs/stories/tools/` directory.
2. Add glob `"../stories/tools/**/*.stories.@(js|jsx|ts|tsx)"` to the `stories` array in `apps/docs/.storybook/main.js`.
3. Add glob `"../stories/tools/**/*.mdx"` if MDX docs are included (the Theme Builder will have one).
4. Theme Builder title: `meta.title = 'Tools/Theme Builder'`.

---

## Decision 2: V1 Scope — Light mode only (no light/dark toggle)

### Options Considered

**Option A — Light/dark toggle included in V1**  
The preview pane includes a toggle that switches between Sando's light and dark variants of the generated palette. Requires correctly applying Sando's Flavor CSS within the scoped preview wrapper.

**Option B — Light mode only in V1**  
The preview pane shows light mode only. Dark mode toggle is deferred to V2.

### Analysis

The Theme Builder's primary value is palette generation — extracting OKLCH `{h, c}` from a brand color input and producing an 11-step palette. Dark mode preview requires additional work:
- Generating a corresponding dark palette (inverted lightness curve)
- Wiring Sando's `@media (prefers-color-scheme: dark)` flavor CSS correctly within a scoped preview wrapper
- Ensuring the WCAG contrast table reflects both light and dark combinations

This scope is meaningful and correct but introduces non-trivial complexity. V1 should deliver maximum value at minimum risk: generating and exporting a well-validated light palette. Dark mode preview is a natural V2 addition once the light-mode pipeline is proven.

### Decision

**Option B — Light mode only in V1.**

The V1 preview pane renders with light mode only. A `// TODO(v2): add light/dark toggle` comment is placed in the story where the toggle would eventually go.

---

## Consequences

### Positive
- `Tools/` section is extensible: future tools (Spacing Explorer, Icon Browser, etc.) have a clear, semantically correct home.
- Clean separation between interactive tools and written documentation.
- V1 is scoped to deliver the core palette generation workflow without dark-mode complexity.
- No restructuring of existing Storybook sections.

### Negative
- A fifth top-level section is added to the Storybook navigation — minor cognitive overhead for users who see an empty `Tools/` until more tools are added.
- Light-mode-only V1 means the export does not show dark mode behavior; developers using the generated palette must manually verify dark mode after adding tokens to the system.

### Mitigations
- The `Tools/Theme Builder` MDX doc will note that the export covers the light palette only and that dark mode variants follow Sando's `flavor-dark.json` pattern.
- The `// TODO(v2)` comment in the story ensures the intent is not lost.

---

## References

- Issue #88 — Theme Builder implementation
- `apps/docs/.storybook/main.js` — Storybook story glob configuration
- `packages/tokens/scripts/generators/palette-generator.js` — palette generation function
- `apps/docs/stories/guides/` — existing Guides section (for contrast with Tools)
- `.opencode/guidelines/01-design-system/THEMING_STRATEGY.toon` — flavor/mode architecture
