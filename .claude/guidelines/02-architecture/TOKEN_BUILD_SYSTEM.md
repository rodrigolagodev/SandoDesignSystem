# Token Build System

**Category**: 02-architecture
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: Developer Tooling Specialist

---

## Purpose

Defines the **Style Dictionary 4.0 orchestrator** that builds the three-layer token system (Ingredients ’ Flavors ’ Recipes), including custom transforms, formats, build caching, and output structure. This system generates CSS custom properties and TypeScript files from JSON source tokens.

---

## Core Rules

### Rule 1: Three-Layer Build Sequence (Non-Negotiable)

**Tokens build in strict order: Ingredients ’ Flavors ’ Recipes**. Each layer must complete before the next begins.

**Build Flow**:
```
1. Ingredients  (Layer 1) ’ Generate CSS + TS primitives
2. Flavors      (Layer 2) ’ Generate CSS + TS semantic tokens (references Layer 1)
3. Recipes      (Layer 3) ’ Generate CSS + TS component tokens (references Layer 2)
```

**Why This Matters**: Flavors reference Ingredients, Recipes reference Flavors. Building out of order causes broken CSS variable references.

**Pattern** (`packages/tokens/build/index.js`):
```javascript
const layers = [
  { name: 'Ingredients', config: ingredientsConfig },
  ...flavorLayers,  // Multiple flavors (original, strawberry, etc.)
  { name: 'Recipes', config: recipesConfig }
];

await buildAllLayers({ layers, force, verbose });
```

**Reference**: See `packages/tokens/build/index.js` for complete orchestrator.

---

### Rule 2: Custom Transforms for CSS Variables

**Two custom transforms process all tokens**: `name/css-sando` and `name/css-var-reference`.

#### Transform 1: `name/css-sando`

**Purpose**: Adds `--sando-` prefix to all CSS variable names.

**Example**:
```
Input:  color.orange.700
Output: --sando-color-orange-700
```

**Implementation** (`build/transforms/name-css-sando.js`):
```javascript
{
  name: 'name/css-sando',
  type: 'name',
  transform: (token) => {
    return `--sando-${token.path.join('-')}`;
  }
}
```

#### Transform 2: `name/css-var-reference`

**Purpose**: Converts `{reference}` syntax to `var(--sando-*)`.

**Example**:
```
Input:  {color.orange.700.value}
Output: var(--sando-color-orange-700)
```

**Implementation** (`build/transforms/css-var-reference.js`):
```javascript
{
  name: 'name/css-var-reference',
  type: 'value',
  filter: (token) => token.original?.value?.includes('{'),
  transform: (token) => {
    return token.original.value.replace(
      /\{([^}]+)\.value\}/g,
      (match, path) => `var(--sando-${path.replace(/\./g, '-')})`
    );
  }
}
```

**Why This Matters**: This creates the CSS variable chain that enables theming. Without these transforms, references would be resolved to absolute values, breaking theme switching.

**Reference**: See `packages/tokens/build/transforms/` for complete implementations.

---

### Rule 3: Layer-Specific Transform Groups

**Each layer uses a specific transform group** that determines which transforms apply.

**Transform Groups**:
```javascript
// Ingredients: Only name transform (no references)
StyleDictionary.registerTransformGroup({
  name: 'sando/css/ingredients',
  transforms: ['name/css-sando']
});

// Flavors: Name + reference transforms
StyleDictionary.registerTransformGroup({
  name: 'sando/css/flavors',
  transforms: ['name/css-sando', 'name/css-var-reference']
});

// Recipes: Name + reference transforms
StyleDictionary.registerTransformGroup({
  name: 'sando/css/recipes',
  transforms: ['name/css-sando', 'name/css-var-reference']
});
```

**Why This Matters**: Ingredients have no references (absolute values), so they don't need the reference transform. Flavors and Recipes reference other layers, so they need both transforms.

---

### Rule 4: Dual Output Formats (CSS + TypeScript)

**Every token layer generates TWO outputs**: CSS custom properties and TypeScript files.

**CSS Output** (`dist/sando-tokens/css/`):
```css
/* Ingredients: Absolute values */
:root {
  --sando-color-orange-700: oklch(0.47 0.20 25);
}

/* Flavors: var() references */
[flavor="original"] {
  --sando-color-action-solid-background-default: var(--sando-color-orange-700);
}

/* Recipes: var() references */
:root {
  --sando-button-solid-backgroundColor-default: var(--sando-color-action-solid-background-default);
}
```

**TypeScript Output** (`dist/sando-tokens/ts/`):
```typescript
// CSS variable names (for component consumption)
export const tokens = {
  color: {
    orange: {
      700: '--sando-color-orange-700'
    }
  }
};

// Absolute values (for testing, calculations)
export const values = {
  color: {
    orange: {
      700: 'oklch(0.47 0.20 25)'
    }
  }
};
```

**Why Both**:
- **CSS**: Runtime styling in components
- **TypeScript**: Type safety, testing, design tool integration

**Reference**: See `packages/tokens/build/formats/` for custom format implementations.

---

### Rule 5: Incremental Build Caching

**The build system caches layer hashes** in `.build-cache.json` to skip unchanged layers.

**Cache Structure**:
```json
{
  "ingredients": "abc123...",
  "flavors": "def456...",
  "recipes": "ghi789..."
}
```

**Cache Behavior**:
- If source files unchanged ’ Skip build (use cached output)
- If source files changed ’ Rebuild layer + update cache
- `--force` flag ’ Bypass cache, rebuild everything

**Force Rebuild**:
```bash
# Option 1: --force flag
pnpm tokens:build --force

# Option 2: Delete cache
rm packages/tokens/.build-cache.json && pnpm tokens:build

# Option 3: build:clean script
pnpm --filter @sando/tokens build:clean
```

**Why This Matters**: Speeds up development. Changing one color shouldn't rebuild all 3 layers.

**Reference**: See `packages/tokens/build/utils/build-cache.js` for cache implementation.

---

## Build Orchestration

### Entry Point: `build/index.js`

**Responsibilities**:
1. Register custom transforms
2. Register transform groups
3. Register custom formats
4. Define layer configurations
5. Execute build sequence
6. Print build summary
7. Validate results

**Key Flow**:
```javascript
// 1. Register transforms
StyleDictionary.registerTransform(nameCssSando);
StyleDictionary.registerTransform(cssVarReference);

// 2. Register transform groups
StyleDictionary.registerTransformGroup({
  name: 'sando/css/ingredients',
  transforms: ['name/css-sando']
});

// 3. Register formats
StyleDictionary.registerFormat({ name: 'css/ingredients', format: cssIngredients });

// 4. Build all layers
const results = await buildAllLayers({ layers, force, verbose });

// 5. Validate
const allSucceeded = validateBuildResults(results);
```

**Reference**: See `packages/tokens/build/index.js` (complete file ~145 lines).

---

### Core Orchestrator: `build/core/orchestrator.js`

**Responsibilities**:
- Iterate through layers sequentially
- Check cache for each layer
- Build layer if needed
- Update cache after successful build
- Collect results

**Key Function**:
```javascript
export async function buildAllLayers(options) {
  const { layers, force, verbose } = options;
  const results = {};

  for (const layer of layers) {
    const { name, config, cacheKey } = layer;

    // Build layer
    const result = await buildLayer({ name, config, verbose });
    results[name] = result;

    // Update cache if successful
    if (result.success && cacheKey) {
      updateCache(cacheKey, `src/${cacheKey}`);
    }
  }

  return results;
}
```

**Reference**: See `packages/tokens/build/core/orchestrator.js` (complete file ~65 lines).

---

### Layer Builder: `build/core/layer-builder.js`

**Responsibilities**:
- Execute Style Dictionary for single layer
- Measure build time
- Handle errors
- Return build result

**Key Function**:
```javascript
export async function buildLayer({ name, config, verbose }) {
  const startTime = Date.now();

  try {
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();

    return {
      success: true,
      duration: Date.now() - startTime
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      duration: Date.now() - startTime
    };
  }
}
```

**Reference**: See `packages/tokens/build/core/layer-builder.js` (complete file ~40 lines).

---

## Layer Configurations

### Ingredients Config

**File**: `build/configs/ingredients.config.js`

**Key Settings**:
- **Source**: `src/ingredients/*.json`
- **Transform group**: `sando/css/ingredients` (no references)
- **Formats**: `css/ingredients`, `typescript/css-variables`, `typescript/primitive-values`
- **Output**: `dist/sando-tokens/css/ingredients/`, `dist/sando-tokens/ts/ingredients/`

**Output Structure**:
```
dist/sando-tokens/
   css/ingredients/
      color.css
      space.css
      index.css  (imports all)
   ts/ingredients/
       color.ts
       space.ts
       index.ts   (exports all)
```

---

### Flavors Config

**File**: `build/configs/flavors.config.js`

**Key Settings**:
- **Source**: `src/flavors/{flavor-name}/*.json`
- **Transform group**: `sando/css/flavors` (has references)
- **Formats**: `css/flavors-modes` (special format for @media wrapping)
- **Output**: `dist/sando-tokens/css/flavors/{flavor-name}/`

**Special Behavior**: Mode files (`flavor-dark.json`, `flavor-high-contrast.json`) are wrapped in `@media` queries:

```css
/* Base flavor */
[flavor="original"] {
  --sando-color-action-solid-background-default: var(--sando-color-orange-700);
}

/* Dark mode (automatic @media wrapper) */
@media (prefers-color-scheme: dark) {
  [flavor="original"] {
    --sando-color-action-solid-background-default: var(--sando-color-orange-600);
  }
}
```

**Why This Matters**: Modes are automatic (user's system preference), not manual like Flavors.

**Reference**: See [THEMING_STRATEGY.md](../01-design-system/THEMING_STRATEGY.md) for Flavors vs Modes distinction.

---

### Recipes Config

**File**: `build/configs/recipes.config.js`

**Key Settings**:
- **Source**: `src/recipes/*.json`
- **Transform group**: `sando/css/recipes` (has references)
- **Formats**: `css/recipes`, `typescript/css-variables`
- **Output**: `dist/sando-tokens/css/recipes/`, `dist/sando-tokens/ts/recipes/`

**Output Structure**:
```
dist/sando-tokens/
   css/recipes/
      button.css
      input.css
      index.css
   ts/recipes/
       button.ts
       input.ts
       index.ts
```

---

## Build Commands

### Primary Commands

```bash
# Standard build (uses cache)
pnpm tokens:build

# Force rebuild (bypass cache)
pnpm tokens:build --force

# Verbose output (shows all tokens)
pnpm tokens:build --verbose

# Watch mode (rebuild on file changes)
pnpm tokens:dev
```

### Development Commands

```bash
# Clean all outputs and cache
pnpm --filter @sando/tokens clean

# Clean + rebuild
pnpm --filter @sando/tokens build:clean

# Test tokens (validation tests)
pnpm --filter @sando/tokens test
```

---

## Output Structure

### Complete Directory Tree

```
packages/tokens/dist/sando-tokens/
   css/
      ingredients/
         color.css                      # Color primitives
         space.css                      # Spacing primitives
         font.css                       # Typography primitives
         index.css                      # Imports all ingredients
      flavors/
         original/
            flavor.css                 # Base flavor (light mode)
            flavor-dark.css            # Dark mode (@media wrapped)
            flavor-high-contrast.css   # High contrast mode
            flavor-motion-reduce.css   # Reduced motion mode
         strawberry/
            [same structure]
         index.css                      # Imports all flavors
      recipes/
         button.css                     # Button tokens
         input.css                      # Input tokens
         index.css                      # Imports all recipes
      index.css                          # Imports ingredients + flavors + recipes

   ts/
       ingredients/
          color.ts                       # Color exports (names + values)
          index.ts                       # Barrel export
       flavors/
          original.ts                    # Original flavor exports
          index.ts
       recipes/
           button.ts                      # Button token exports
           index.ts
```

---

## Custom Formats

### CSS Formats

**`css/ingredients`**: Simple `:root` selector, absolute values
**`css/flavors-modes`**: `[flavor="name"]` selector + `@media` wrapping for modes
**`css/recipes`**: `:root` selector with var() references

**Reference**: See `packages/tokens/build/formats/css/` for implementations.

---

### TypeScript Formats

**`typescript/css-variables`**: Exports CSS variable names
```typescript
export const tokens = {
  color: {
    orange: {
      700: '--sando-color-orange-700'
    }
  }
};
```

**`typescript/primitive-values`**: Exports absolute values
```typescript
export const values = {
  color: {
    orange: {
      700: 'oklch(0.47 0.20 25)'
    }
  }
};
```

**Reference**: See `packages/tokens/build/formats/typescript/` for implementations.

---

## Adding New Tokens

### Adding Ingredient

```bash
# 1. Edit source
echo '{
  "color": {
    "purple": {
      "500": { "value": "oklch(0.55 0.25 310)", "type": "color" }
    }
  }
}' >> packages/tokens/src/ingredients/color.json

# 2. Build (auto-detects changes)
pnpm tokens:build

# 3. Output generated
# dist/sando-tokens/css/ingredients/color.css
# dist/sando-tokens/ts/ingredients/color.ts
```

---

### Adding Flavor Token

```bash
# 1. Edit flavor source
echo '{
  "color": {
    "sidebar": {
      "background": {
        "value": "{color.neutral.100.value}",
        "type": "color"
      }
    }
  }
}' >> packages/tokens/src/flavors/original/flavor.json

# 2. Build
pnpm tokens:build

# 3. Output: var(--sando-color-neutral-100) reference generated
```

---

### Adding Recipe

```bash
# 1. Create new recipe file
touch packages/tokens/src/recipes/card.json

# 2. Add tokens
echo '{
  "card": {
    "backgroundColor": {
      "value": "{color.background.surface.value}",
      "type": "color"
    }
  }
}' > packages/tokens/src/recipes/card.json

# 3. Build
pnpm tokens:build

# 4. Output: dist/sando-tokens/css/recipes/card.css
```

---

## Validation Checklist

### Build Setup
- [ ] Style Dictionary 4.0.0 installed
- [ ] Custom transforms registered (`name/css-sando`, `name/css-var-reference`)
- [ ] Transform groups registered (ingredients, flavors, recipes)
- [ ] Custom formats registered (css, typescript)

### Build Execution
- [ ] `pnpm tokens:build` runs without errors
- [ ] All 3 layers build in order (Ingredients ’ Flavors ’ Recipes)
- [ ] Build cache created (`.build-cache.json`)
- [ ] CSS output in `dist/sando-tokens/css/`
- [ ] TypeScript output in `dist/sando-tokens/ts/`

### Output Validation
- [ ] Ingredients use `:root` selector with absolute values
- [ ] Flavors use `[flavor="name"]` selector with var() references
- [ ] Dark mode wrapped in `@media (prefers-color-scheme: dark)`
- [ ] Recipes use `:root` selector with var() references
- [ ] TypeScript exports both names and values

### Token Tests
- [ ] Token structure tests pass (`pnpm --filter @sando/tokens test:structure`)
- [ ] Token reference tests pass (`pnpm --filter @sando/tokens test:references`)
- [ ] No broken references in output

---

## Related Guidelines

- [../01-design-system/TOKEN_ARCHITECTURE.md](../01-design-system/TOKEN_ARCHITECTURE.md) - Three-layer token system rules
- [../01-design-system/THEMING_STRATEGY.md](../01-design-system/THEMING_STRATEGY.md) - Flavors vs Modes, @media wrapping
- [MONOREPO_STRUCTURE.md](MONOREPO_STRUCTURE.md) - Build order, Turborepo dependencies
- [COMPONENT_ARCHITECTURE.md](COMPONENT_ARCHITECTURE.md) - Token consumption in components

---

## External References

- [Style Dictionary Documentation](https://styledictionary.com/) - Configuration, transforms, formats
- [Style Dictionary GitHub](https://github.com/amzn/style-dictionary) - Source code, examples

---

## Changelog

### 1.0.0 (2025-11-02)
- Initial token build system guideline
- Documented Style Dictionary 4.0 orchestrator
- Custom transforms and formats
- Three-layer build sequence
- Build caching and incremental builds
- Output structure (CSS + TypeScript)
- Agent-optimized format (~550 lines, focused on architecture)

---

**This guideline documents the token build orchestration that generates CSS custom properties and TypeScript files from JSON source tokens. The three-layer build sequence (Ingredients ’ Flavors ’ Recipes) is critical for maintaining proper CSS variable references.**
