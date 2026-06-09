# ADR-004: CSS Bundle Chunking Strategy

**Status:** Accepted  
**Date:** 2026-06-09  
**Author:** sando-architect  
**Affects:** PB-CR-R1 (performance budget), packages/tokens/build, packages/tokens/package.json, packages/components/src/styles/tokens.css.ts  
**Priority:** P0

---

## Context

Post-M0 audit: the full CSS bundle (`dist/sando-tokens/css/index.css` via `@import` cascade) gzipped measures ~195 KB, violating **PB-CR-R1** which mandates <100 KB for the full library.

The token build system uses **Style Dictionary 4.0** and produces per-file CSS output at:
- `dist/sando-tokens/css/ingredients/{name}.css` (10 files)
- `dist/sando-tokens/css/flavors/{flavor}/{mode}.css` (7 flavors × 5 modes = 35 files)
- `dist/sando-tokens/css/recipes/{component}.css` (25 files)
- Barrel `index.css` files generated post-build by `barrel-generator.js`

Component packages (`packages/components/`) import individual recipe CSS files directly via `@sando-ds/tokens/css/recipes/{component}.css?inline` for Shadow DOM injection, and flavor CSS files globally for Light DOM.

### Current Measurements (gzipped)

| Layer | Files | Raw (total) | Gzip (total) |
|---|---|---|---|
| Ingredients | 10 | 22.32 KB | 5.94 KB |
| Flavors (1 flavor, 5 modes) | 5 | 36.53 KB | 5.66 KB |
| Flavors (all 7 flavors, 35 modes) | 35 | 255.70 KB | 36.82 KB |
| Recipes (all 25) | 25 | 2,070.38 KB | 187.23 KB |
| **Full bundle** (1 flavor + all recipes) | 40 | **2,129 KB** | **198.8 KB** |

### Root Cause: Recipe Filter Bug

Each recipe CSS file (e.g., `recipes/button.css`) contains **ALL 25 components' tokens** (identical content per file, modulo timestamp). The `recipes.config.js` filter uses:

```js
filter: (token) => {
  const componentName = getComponentName(filename);
  return token.path[0] === componentName || token.filePath?.includes('/recipes/');
},
```

The `|| token.filePath?.includes('/recipes/')` clause is overly broad: every recipe token has `filePath` containing `/recipes/`, so the filter always returns `true` for all recipe tokens regardless of `componentName`. This means each recipe file emits every component's tokens.

**Impact of fixing the bug alone:**
- Each recipe would drop from ~82.83 KB raw / ~7.5 KB gzip to ~200-800 B gzip (only its own tokens)
- Total recipe gzip: ~187 KB → **~10-12 KB**
- Full bundle gzip: ~199 KB → **~22-24 KB** — already under the 100 KB threshold without any chunking

---

## Options Considered

### Option A — Flavor-level CSS entry points

Expose `@sando-ds/tokens/css/sando.css`, `@sando-ds/tokens/css/original.css`, etc. Each flavor CSS includes its ingredients + flavor modes + all recipes.

| Metric | Value |
|---|---|
| Main entry (1 flavor + all recipes) | ~16.5 KB gzip |
| Single recipe | ~500 B gzip |
| New package.json exports | 7 per-flavor entries |
| Recipe duplication | Yes — each flavor re-exports all recipes under a different selector |

Precedence: P3 decision (ADR-003) noted this as the fallback option.

### Option B — Separate ingredients / flavors / recipes (max granularity)

Consumers import exactly what they need from three separate layers.

| Metric | Value |
|---|---|
| Ingredients only | 5.9 KB gzip |
| 1 flavor all modes | 5.7 KB gzip |
| 1 recipe | ~500 B gzip |
| New package.json exports | 0 (already exists) |
| Consumer ergonomics | Poor — must import 3+ files manually |

### Option C — Hybrid (recommended)

- `@sando-ds/tokens/css/theme.css` — ingredients + all flavors (for full-theme consumers)
- `@sando-ds/tokens/css/{flavor}.css` — per-flavor, includes that flavor's modes
- `@sando-ds/tokens/css/recipes/{component}.css` — per-recipe, standalone (already exists)
- `@sando-ds/tokens/css/index.css` — remains as deprecated re-export of `theme.css`

| Metric | Value |
|---|---|
| theme.css (all ingredients + all 7 flavors) | ~42.8 KB gzip |
| Single flavor entry | ~5.7 KB gzip |
| Single recipe entry | ~500 B gzip |
| New package.json exports | 9 (theme + 7 flavors) |
| Consumer ergonomics | Excellent — progressive enhancement |

### Option D — Fix bug only, no new entry points

Fix the `|| token.filePath?.includes('/recipes/')` bug. Existing imports remain valid and drop to ~22 KB automatically.

| Metric | Value |
|---|---|
| Full bundle (existing index.css) | ~22.5 KB gzip |
| Changes required | 1 line in recipes.config.js |
| Effort | Minimal |

---

## Decision

**Adopt Option C (Hybrid) with the following specifics:**

### 1. Fix the recipe filter bug (prerequisite)

Change the filter in `packages/tokens/build/configs/recipes.config.js` from:

```js
filter: (token) => {
  const componentName = getComponentName(filename);
  return token.path[0] === componentName || token.filePath?.includes('/recipes/');
},
```

To:

```js
filter: (token) => {
  const componentName = getComponentName(filename);
  return token.path[0] === componentName;
},
```

This ensures each recipe CSS file emits only its own component's tokens. This is the single most impactful change — it reduces the recipe layer from ~187 KB gzip to ~10-12 KB gzip.

### 2. Add per-flavor entry points

For each flavor (original, sando, nori, strawberry, egg-salad, kiwi, tonkatsu), create a barrel file at `dist/sando-tokens/css/{flavor}.css` that imports:

```css
@import "./ingredients/index.css";
@import "./flavors/{flavor}/index.css";
```

(Note: recipes are intentionally excluded from per-flavor entry points — components import recipes individually in Shadow DOM, and recipes reference flavor tokens dynamically via `var()` references.)

### 3. Add theme.css entry point

Create `dist/sando-tokens/css/theme.css` that imports:

```css
@import "./ingredients/index.css";
@import "./flavors/original/index.css";
@import "./flavors/sando/index.css";
@import "./flavors/nori/index.css";
@import "./flavors/strawberry/index.css";
@import "./flavors/egg-salad/index.css";
@import "./flavors/kiwi/index.css";
@import "./flavors/tonkatsu/index.css";
```

### 4. Deprecate root index.css

The root `index.css` continues to exist but its content changes to re-export `theme.css`:

```css
@import "./theme.css";
```

A deprecation comment is added. After the next major version, it can be removed.

### Estimated Post-Fix Sizes

| Entry point | Gzip size | Description |
|---|---|---|
| `index.css` (deprecated → theme.css) | ~42.8 KB | All ingredients + all 7 flavors |
| `theme.css` | ~42.8 KB | All ingredients + all 7 flavors |
| `original.css` | ~11.6 KB | Ingredients + original (5 modes) |
| `sando.css` | ~11.8 KB | Ingredients + sando (5 modes) |
| `strawberry.css` | ~11.7 KB | Ingredients + strawberry (5 modes) |
| `nori.css` | ~12.2 KB | Ingredients + nori (5 modes) |
| `egg-salad.css` | ~11.5 KB | Ingredients + egg-salad (5 modes) |
| `kiwi.css` | ~11.5 KB | Ingredients + kiwi (5 modes) |
| `tonkatsu.css` | ~11.6 KB | Ingredients + tonkatsu (5 modes) |
| `recipes/{component}.css` | ~200-800 B | Single component tokens |
| `ingredients/{name}.css` | ~200-800 B | Single ingredient category |

All estimates include the recipe filter bug fix. Without the fix, the `theme.css` entry would be ~231 KB gzip.

### Estimated Effort

| Task | Files changed | Effort |
|---|---|---|
| Fix recipe filter bug | 1 | XS |
| Generate per-flavor CSS barrels in barrel-generator.js | 1 | S |
| Generate theme.css in barrel-generator.js | 1 | S |
| Update package.json exports map | 1 | XS |
| Mark index.css as deprecated | 1 | XS |
| Update component imports (optional — no breakage) | 0 | None |

---

## Consequences

### Positive

- **PB-CR-R1 is met** — full bundle drops from ~199 KB to ~42.8 KB gzip for multi-flavor setups, or ~11.6 KB for single-flavor
- **No breaking changes** — existing import paths (`@sando-ds/tokens/css/recipes/button.css`, `@sando-ds/tokens/css/ingredients/color.css`, `@sando-ds/tokens/css/index.css`) all continue to work
- **Progressive enhancement** — consumers start with `index.css`, then optimize to per-flavor or per-component imports
- **Granularity available** — per-recipe imports already exist and are already used by the component package
- **Components unaffected** — the recipe filter fix only makes component-level imports smaller; no component code changes needed

### Negative

- **More files in dist/** — 7 new per-flavor barrel files + 1 theme.css
- **Maintenance overhead** — flavor list in barrel-generator must stay in sync with actual flavor folders
- **index.css deprecation** — consumers importing `@sando-ds/tokens/css` will get a deprecation notice

### Mitigations

- Flavor detection in barrel-generator is automated via `discoverSubdirectories()` — no hardcoded list
- Deprecation notice is a CSS comment, not a runtime warning — silent for consumers
- The recipe filter fix is a single-line change with zero API surface impact

---

## Implementation Spec

### 1. Fix recipe.config.js

**File:** `packages/tokens/build/configs/recipes.config.js`

Change the file mapping filter:

```js
const files = recipeFiles.map(filename => ({
  destination: `recipes/${filename}.css`,
  format: 'css/recipes',
  filter: (token) => {
    const componentName = getComponentName(filename);
    return token.path[0] === componentName;  // REMOVED: || token.filePath?.includes('/recipes/')
  },
  options: {
    outputReferences: true
  }
}));
```

### 2. Update barrel-generator.js

**File:** `packages/tokens/build/utils/barrel-generator.js`

Add two new functions and update the root barrel:

```js
const ALL_FLAVORS = null; // detected dynamically

function generateFlavorEntries(cssDir) {
  const flavorsDir = path.join(cssDir, 'flavors');
  const flavorFolders = discoverSubdirectories(flavorsDir);
  
  for (const flavor of flavorFolders) {
    const content = [
      `@import "./ingredients/index.css";`,
      `@import "./flavors/${flavor}/index.css";`
    ].join('\n');
    const outputPath = path.join(cssDir, `${flavor}.css`);
    writeBarrelFile(outputPath, content, `${flavor} Flavor Entry Point`);
    console.log(`   🎨 ${flavor}.css`);
  }
  
  return flavorFolders;
}

function generateThemeBarrel(cssDir, flavorFolders) {
  const imports = [
    '@import "./ingredients/index.css";',
    ...flavorFolders.map(f => `@import "./flavors/${f}/index.css";`)
  ];
  const content = imports.join('\n');
  const outputPath = path.join(cssDir, 'theme.css');
  writeBarrelFile(outputPath, content, 'Full Theme Bundle');
  console.log(`   🎨 theme.css (all flavors)`);
}
```

Update `generateRootBarrel` to re-export `theme.css`:

```js
function generateRootBarrel(cssDir) {
  const content = [
    '/**',
    ' * @deprecated Use @sando-ds/tokens/css/theme.css instead.',
    ' * This file will be removed in the next major version.',
    ' */',
    '',
    '@import "./theme.css";'
  ].join('\n');
  // ...
}
```

### 3. Update package.json exports

**File:** `packages/tokens/package.json`

Add to `exports`:

```json
{
  "exports": {
    "./css": "./dist/sando-tokens/css/index.css",
    "./css/theme": "./dist/sando-tokens/css/theme.css",
    "./css/original": "./dist/sando-tokens/css/original.css",
    "./css/sando": "./dist/sando-tokens/css/sando.css",
    "./css/nori": "./dist/sando-tokens/css/nori.css",
    "./css/strawberry": "./dist/sando-tokens/css/strawberry.css",
    "./css/egg-salad": "./dist/sando-tokens/css/egg-salad.css",
    "./css/kiwi": "./dist/sando-tokens/css/kiwi.css",
    "./css/tonkatsu": "./dist/sando-tokens/css/tonkatsu.css",
    "./css/theme/*": null,
    "./css/original/*": null,
    "./css/sando/*": null,
    // ... (wildcard overrides for per-flavor subpaths not mapped)
  }
}
```

The `sideEffects` field already covers `**/*.css` — no change needed.
The `files` field already covers `dist/**` — no change needed.

### 4. Build and verify

```bash
pnpm tokens:build
```

Then verify:

```bash
# Verify per-flavor entry points exist
ls packages/tokens/dist/sando-tokens/css/{original,sando,nori,strawberry,egg-salad,kiwi,tonkatsu}.css

# Verify theme.css exists
ls packages/tokens/dist/sando-tokens/css/theme.css

# Measure gzipped sizes
gzip -k packages/tokens/dist/sando-tokens/css/theme.css && wc -c packages/tokens/dist/sando-tokens/css/theme.css.gz
gzip -k packages/tokens/dist/sando-tokens/css/original.css && wc -c packages/tokens/dist/sando-tokens/css/original.css.gz

# Verify recipe files are now unique (no longer duplicates)
gzip -k packages/tokens/dist/sando-tokens/css/recipes/button.css && wc -c packages/tokens/dist/sando-tokens/css/recipes/button.css.gz
gzip -k packages/tokens/dist/sando-tokens/css/recipes/alert.css && wc -c packages/tokens/dist/sando-tokens/css/recipes/alert.css.gz

# Run tests
pnpm test
```

---

## References

- PB-CR-R1 in `.opencode/guidelines/01-design-system/PERFORMANCE_BUDGET.toon`
- TA-CR-R5 in `.opencode/guidelines/01-design-system/TOKEN_ARCHITECTURE.toon`
- `packages/tokens/build/configs/recipes.config.js` (recipe filter)
- `packages/tokens/build/utils/barrel-generator.js` (barrel file generation)
- `packages/tokens/package.json` (exports map)
- `packages/components/src/styles/tokens.css.ts` (consumer import pattern)
- ADR-003: Component-Named Sizing Tokens
