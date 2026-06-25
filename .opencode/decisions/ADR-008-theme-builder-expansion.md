# ADR-008: Theme Builder Expansion — Multi-Tab Architecture

**Status:** Accepted  
**Date:** 2026-06-24  
**Author:** sando-architect  
**Affects:** `apps/docs/stories/tools/` — Theme Builder docs tool  
**Priority:** P2 (multi-tab expansion, not a public component change)

---

## Context

The Theme Builder (`apps/docs/stories/tools/ThemeBuilder.stories.ts`) currently exists as a single monolithic Lit class `SandoThemeBuilder` handling one tab: Colors (OKLCH palette via `palette-generator.js`).

The planned expansion adds four additional tabs, each generating a JSON artifact that matches the shape of a Sando ingredient file:

| Tab        | Output JSON shape        | Ingredient file                                  |
| ---------- | ------------------------ | ------------------------------------------------ |
| Colors     | `color.{name}.{step}`    | `packages/tokens/src/ingredients/color.json`     |
| Typography | `font.family.*` + config | `packages/tokens/src/ingredients/font.json`      |
| Shape      | `border.radius.*`        | `packages/tokens/src/ingredients/border.json`    |
| Motion     | `animation.*`            | `packages/tokens/src/ingredients/animation.json` |
| Elevation  | `elevation.*`            | `packages/tokens/src/ingredients/elevation.json` |

The "Download All" action must produce a ZIP containing all five JSON files named after each ingredient file, ready to drop into the token pipeline.

Three architecture questions drive this ADR:

1. How to split the monolith into sub-components while keeping everything in-file vs. split across files.
2. How sub-components communicate their generated state to the root builder (for Download All).
3. How to produce the ZIP download without adding a runtime dependency to `apps/docs`.

---

## Decision 1: File Organization — Single orchestrator file + four tab-panel files

### Options Considered

**Option A — All classes in one file (`ThemeBuilder.stories.ts`)**  
Define all five tab-panel Lit classes inline, as the current `SandoThemeBuilder` already does. One file, zero imports between tool files.

**Option B — Orchestrator + one file per tab-panel**  
`ThemeBuilder.stories.ts` remains the Storybook entry point and hosts `SandoThemeBuilder`. Each tab panel lives in its own file under `apps/docs/stories/tools/`:

```
ThemeBuilder.stories.ts          ← Storybook entry; SandoThemeBuilder shell + state
theme-builder-colors-panel.ts    ← SandoThemeColorsPanel
theme-builder-typography-panel.ts← SandoThemeTypographyPanel
theme-builder-shape-panel.ts     ← SandoThemeShapePanel
theme-builder-motion-panel.ts    ← SandoThemeMotionPanel
theme-builder-elevation-panel.ts ← SandoThemeElevationPanel
theme-builder-types.ts           ← Shared TypeScript types and constants
```

**Option C — All panels in a single `theme-builder-panels.ts` companion file**  
Split into two files only: the Storybook story file and one companion panels file.

### Analysis

| Criterion                           | A (one file) | B (one file/panel) | C (two files) |
| ----------------------------------- | :----------: | :----------------: | :-----------: |
| Each panel independently reviewable |      No      |        Yes         |    Partial    |
| File size manageable (< ~500 LOC)   | No (~1500+)  |  Yes (~250 each)   |  No (~1200)   |
| Storybook only needs one entry      |     Yes      |        Yes         |      Yes      |
| Grep/search clarity per domain      |      No      |        Yes         |      No       |
| Import overhead                     |     None     |      Minimal       |    Minimal    |

Option A would produce a single file exceeding 1500 lines. Option C reduces the count but still produces a companion file that is difficult to navigate. Option B gives each panel a clear, independently readable file with a predictable naming convention.

### Decision

**Option B.** Five tab-panel files + one shared types file, all in `apps/docs/stories/tools/`. The Storybook entry remains `ThemeBuilder.stories.ts`.

---

## Decision 2: Sub-component Communication — Custom events + root state accumulation

### Options Considered

**Option A — Root owns all state; panels are stateless form fragments**  
Panels render inputs and fire granular `CustomEvent`s on every input change. Root accumulates state in a `ThemeBuilderState` object. Panels receive their current config back as attributes/properties.

**Option B — Panels own local state; root queries them on demand**  
Panels manage their own `@state()` internally. When "Download All" is triggered, the root calls `panel.exportJson()` on each panel element imperatively via `shadowRoot.querySelector`.

**Option C — Shared singleton state object (module-level)**  
A plain TS object exported from `theme-builder-types.ts` holds all panel states. Root and panels both read/write it and call `requestUpdate()` when needed.

### Analysis

Option B (imperative query) tightly couples the root to the panel's internal DOM structure and requires non-null assertions throughout. Option C (module singleton) creates implicit shared mutable state that makes reactivity unpredictable in Lit's update lifecycle.

Option A is the standard Lit/web-component pattern: panels fire typed events up the tree, root listens and accumulates. This is consistent with how existing Sando components handle upward communication (`sando-input` → `sando-form`). The root's `ThemeBuilderState` type gives the Download All action a single source of truth.

### Decision

**Option A.** Each panel fires a typed `CustomEvent<PanelChangeEvent>` named `tb-panel-change` on the root's host element when its output changes. The root's `SandoThemeBuilder` listens with `@tb-panel-change` and merges the payload into `_builderState`.

Event shape:

```typescript
interface PanelChangeEvent {
  tab: "colors" | "typography" | "shape" | "motion" | "elevation";
  json: Record<string, unknown>; // matches ingredient file shape exactly
  isReady: boolean; // true when output is fully valid
}
```

Panels do NOT receive their state back as properties — they are self-contained. The root uses `isReady` flags to enable/disable Download All.

---

## Decision 3: ZIP Download — fflate (zero-dependency, tree-shakeable)

### Options Considered

**Option A — JSZip**  
`jszip` is the most widely known ZIP library. ~90 KB minified. Adds a runtime dep to `apps/docs`.

**Option B — fflate**  
`fflate` is a modern, tree-shakeable DEFLATE/ZIP implementation. ~23 KB minified for the full ZIP subset, ~8 KB if only `zipSync` is imported. Pure ESM, no Node.js-specific APIs. Zero transitive dependencies.

**Option C — Multiple Blob downloads (no ZIP)**  
Instead of a ZIP, trigger one `<a download>` per JSON file (five sequential downloads). No new dependency.

**Option D — Native Compression Streams API (browser-native)**  
The Compression Streams API (`CompressionStream`) supports only `gzip` and `deflate-raw`, not the ZIP container format. Not viable for multi-file archives.

### Analysis

| Criterion                | JSZip | fflate | Multi-Blob | Native |
| ------------------------ | :---: | :----: | :--------: | :----: |
| Single ZIP archive       |  Yes  |  Yes   |     No     |   No   |
| Bundle size impact       | ~90KB |  ~8KB  |     0      |   0    |
| ESM / tree-shakeable     |  No   |  Yes   |    N/A     |  N/A   |
| Storybook devDep only    |  Yes  |  Yes   |    N/A     |  N/A   |
| UX: one click → one file |  Yes  |  Yes   | No (5 dlg) |   No   |
| No transitive deps       |  No   |  Yes   |    N/A     |  N/A   |

Multi-Blob (Option C) is acceptable as a fallback but creates five separate browser download dialogs in some configurations, which is poor UX. JSZip works but is 4x larger than fflate and ships CommonJS by default. `fflate` is the modern standard for pure-browser ZIP, used by Vite's build internals.

The dependency lands in `apps/docs` as a `devDependency` — it is never published in `packages/components` or `packages/tokens`.

### Decision

**Option B — `fflate` as a `devDependency` of `@sando-ds/docs`.**

Usage pattern:

```typescript
import { zipSync, strToU8 } from "fflate";

function downloadFlavorZip(flavorName: string, files: Record<string, string>) {
  const zipFiles: Record<string, Uint8Array> = {};
  for (const [filename, content] of Object.entries(files)) {
    zipFiles[filename] = strToU8(content);
  }
  const zipped = zipSync(zipFiles, { level: 6 });
  const blob = new Blob([zipped], { type: "application/zip" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${flavorName}-ingredients.zip`;
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## Decision 4: Tab Navigation Pattern — attribute-driven active tab

The root `SandoThemeBuilder` renders a tab bar. The active tab is stored as `@state() private _activeTab`. Tab panels are always rendered into the DOM (not conditionally created/destroyed) to preserve user input when switching tabs. Inactive panels are hidden via `display: none` on a wrapper div — NOT via Lit's `${condition ? html`...` : nothing}` conditional rendering.

This preserves each panel's `@state()` across tab switches without any persistence layer.

---

## Architecture Summary

### Component tree

```
SandoThemeBuilder                    (ThemeBuilder.stories.ts)
  ├── tab-bar (plain HTML, root-rendered)
  ├── SandoThemeColorsPanel           (theme-builder-colors-panel.ts)
  ├── SandoThemeTypographyPanel       (theme-builder-typography-panel.ts)
  ├── SandoThemeShapePanel            (theme-builder-shape-panel.ts)
  ├── SandoThemeMotionPanel           (theme-builder-motion-panel.ts)
  └── SandoThemeElevationPanel        (theme-builder-elevation-panel.ts)
```

### Custom element names

| Class                     | Custom element name         |
| ------------------------- | --------------------------- |
| SandoThemeBuilder         | `sando-theme-builder`       |
| SandoThemeColorsPanel     | `sando-tb-colors-panel`     |
| SandoThemeTypographyPanel | `sando-tb-typography-panel` |
| SandoThemeShapePanel      | `sando-tb-shape-panel`      |
| SandoThemeMotionPanel     | `sando-tb-motion-panel`     |
| SandoThemeElevationPanel  | `sando-tb-elevation-panel`  |

All elements are registered only within `apps/docs` — none are exported from `packages/components`.

### State flow

```
Panel input change
  → panel fires CustomEvent<PanelChangeEvent>('tb-panel-change', { bubbles: true, composed: true })
  → root @tb-panel-change handler merges into _builderState[tab]
  → root re-renders Download All button enabled state

Download All click (root)
  → collects _builderState[*].json for all isReady panels
  → calls downloadFlavorZip(flavorName, filemap) via fflate zipSync
```

### JSON output shapes per panel

Each panel's `json` payload must match the ingredient file shape exactly so files can be dropped into `packages/tokens/src/ingredients/` without transformation:

| Panel      | Root key    | Output keys                                                                              |
| ---------- | ----------- | ---------------------------------------------------------------------------------------- |
| Colors     | `color`     | `{ [paletteName]: { [step]: { value, type, description } } }`                            |
| Typography | `font`      | `{ family: {...}, size: {...}, weight: {...}, lineHeight: {...}, letterSpacing: {...} }` |
| Shape      | `border`    | `{ radius: { [step]: { value, type } }, width: {...} }`                                  |
| Motion     | `animation` | `{ duration: {...}, easing: {...} }`                                                     |
| Elevation  | `elevation` | `{ [step]: { value, type } }`                                                            |

For Typography, Shape, Motion, and Elevation the approach is: the panel presents a **personality selector** (slider or radio group). The root key's full structure is output unchanged from the base ingredient, with only the designer-controlled subset of tokens overridden. This avoids requiring the builder to enumerate all 50+ token steps by hand — it selects a profile and the panel maps it to token overrides on top of the base ingredient template.

---

## Consequences

### Positive

- Each panel file is independently readable and under ~300 LOC.
- Event-driven upward communication is consistent with existing component patterns.
- `fflate` adds ~8 KB to the Storybook bundle (devDep only, never published).
- Tab state is preserved across tab switches without localStorage or URL params.
- Each panel's JSON output is drop-in compatible with the ingredient pipeline.
- `sando-tb-*` prefix namespaces all tool elements away from `sando-*` component elements.

### Negative

- Six new files instead of one (manageable; they share a directory and clear naming convention).
- `fflate` is a new dependency in `apps/docs`, requiring a `pnpm add -D fflate` in that workspace.
- Personality-to-token mapping logic (e.g., "rounded" shape profile → specific `border.radius.*` overrides) must be hand-authored in each panel — it cannot be derived automatically from ingredient JSON.

### Mitigations

- Personality profiles are finite (3–4 per panel) and their token mappings are stable design decisions, not arbitrary runtime values.
- `fflate` has zero transitive dependencies and is already used by Vite internals in this repo indirectly.

---

## References

- ADR-007 — Theme Builder Storybook placement and V1 scope
- `apps/docs/stories/tools/ThemeBuilder.stories.ts` — current monolith
- `packages/tokens/src/ingredients/` — target JSON shapes for all panels
- `apps/docs/package.json` — dependency landing zone for `fflate`
- `.opencode/guidelines/01-design-system/THEMING_STRATEGY.toon` — flavor/mode architecture
- `packages/tokens/scripts/generators/palette-generator.js` — colors panel generator (already wired via `@sando-tokens/generators` alias in Storybook main.js)
