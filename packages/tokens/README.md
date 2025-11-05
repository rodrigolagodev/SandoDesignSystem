# @sando/tokens

Design tokens for Sando Design System built with Style Dictionary 4.0.

## 📦 Installation

```bash
npm install @sando/tokens
# or
pnpm add @sando/tokens
```

## 🎨 Token Architecture

Three-layer architecture for scalable design tokens:

### Layer 1: Ingredients (Primitives)

**Absolute values** - Raw materials of the design system

```json
{
  "color": {
    "brand": {
      "500": { "value": "#f97415", "type": "color" }
    }
  }
}
```

### Layer 2: Flavors (Semantic)

**References to Ingredients** - Contextual meaning and theming

```json
{
  "color": {
    "background": {
      "base": { "value": "{color.neutral.100.value}", "type": "color" }
    }
  }
}
```

### Layer 3: Recipes (Component-specific)

**References to Flavors** - Component tokens

```json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": {
          "value": "{color.action.solid.background.default.value}",
          "type": "color"
        }
      }
    }
  }
}
```

## 🚀 Usage

### CSS Usage

```css
/* Import all tokens */
@import "@sando/tokens/css/ingredients";
@import "@sando/tokens/css/flavors";
@import "@sando/tokens/css/recipes";

/* Use in your components */
.my-button {
  background: var(--sando-button-solid-backgroundColor-default);
  color: var(--sando-button-solid-textColor-default);
  padding: var(--sando-button-size-medium-paddingBlock)
    var(--sando-button-size-medium-paddingInline);
}
```

### TypeScript Usage (Type-Safe)

```typescript
import { tokens } from "@sando/tokens/recipes";
import { values } from "@sando/tokens/ingredients/color";
import { css, LitElement } from "lit";

class MyButton extends LitElement {
  static styles = css`
    button {
      /* CSS variable names (type-safe autocomplete) */
      background: var(${tokens.button.solid.backgroundColor.default});
      color: var(${tokens.button.solid.textColor.default});
    }
  `;

  // Access absolute values for JavaScript calculations
  calculateLighterColor() {
    const brandColor = values.brand[500]; // '#f97415'
    return lighten(brandColor, 0.2);
  }
}
```

## 📁 Project Structure

```
packages/tokens/
├── src/                           # Token source files
│   ├── ingredients/               # Primitive tokens
│   │   ├── color.json
│   │   ├── font.json
│   │   ├── space.json
│   │   └── ...
│   ├── flavors/                   # Semantic tokens (themes)
│   │   └── original.json
│   └── recipes/                   # Component tokens
│       └── button.json
│
├── build/                         # Build system
│   ├── core/                      # Core modules
│   │   ├── orchestrator.js        # Build coordination
│   │   ├── layer-builder.js       # Layer building
│   │   └── metrics.js             # Build metrics
│   │
│   ├── formats/                   # Output formats
│   │   ├── css/                   # CSS generation
│   │   │   ├── base.js            # Shared factory
│   │   │   ├── ingredients.js
│   │   │   ├── flavors.js
│   │   │   └── recipes.js
│   │   └── typescript/            # TypeScript generation
│   │       ├── css-variables.js   # CSS var names
│   │       ├── primitive-values.js # Absolute values
│   │       └── index-file.js      # Index files
│   │
│   ├── transforms/                # Custom transforms
│   │   ├── name-css-sando.js      # Adds --sando- prefix
│   │   └── css-var-reference.js   # Converts refs to var()
│   │
│   ├── configs/                   # Layer configurations
│   │   ├── ingredients.config.js
│   │   ├── flavors.config.js
│   │   └── recipes.config.js
│   │
│   ├── utils/                     # Shared utilities
│   │   ├── file-discovery.js
│   │   ├── token-tree.js
│   │   ├── formatting.js
│   │   └── build-cache.js
│   │
│   └── index.js                   # Main entry point
│
├── tests/                         # Test suite
│   ├── tokens/                    # Token validation
│   ├── build/                     # Build output tests
│   ├── accessibility/             # A11y tests
│   └── helpers/                   # Test utilities
│
└── dist/                          # Generated output
    └── sando-tokens/
        ├── css/                   # CSS custom properties
        │   ├── ingredients/
        │   ├── flavors/
        │   └── recipes/
        └── ts/                    # TypeScript files
            ├── ingredients/       # Absolute values
            ├── flavors/          # CSS var names
            └── recipes/          # CSS var names
```

## 🛠️ Development

### Build Commands

```bash
# Build all tokens
npm run build

# Force rebuild (bypass cache)
npm run build -- --force

# Clean and rebuild
rm -rf dist .build-cache.json && npm run build
```

### Testing

```bash
# Run all tests (default reporter - clean output)
npm test

# Different output formats
npm run test:dot            # Minimal output (just dots: . for pass, x for fail)
npm run test:verbose        # Detailed output (shows all test names)
npm run test:summary        # Summary with statistics

# Interactive UI (browser-based test runner)
npm run test:ui

# Watch mode (re-runs on file changes)
npm run test:watch

# Coverage report
npm run test:coverage

# Run specific test suites
npm run test:structure      # Token structure validation
npm run test:references     # Token reference integrity
npm run test:values         # Token value validation
npm run test:accessibility  # WCAG contrast compliance
npm run test:build          # CSS/TypeScript output validation
```

**From monorepo root:**

```bash
# Run tests for tokens package only
pnpm --filter @sando/tokens test

# With coverage
pnpm --filter @sando/tokens test:coverage
```

**Reporter Options:**

- **`default`** (recommended): Clean summary, only shows failures
- **`dot`**: Minimal (best for CI), just shows pass/fail dots
- **`verbose`**: Shows every single test (very long output)
- **`summary`**: Statistical summary at the end

## 📖 Token Naming Convention

### CSS Custom Properties

```
--sando-{category}-{property}-{variant?}-{state?}
```

**Examples:**

- `--sando-color-brand-500` (ingredient)
- `--sando-color-background-base` (flavor)
- `--sando-button-solid-backgroundColor-hover` (recipe)

### TypeScript Imports

```typescript
// Absolute primitive values (ingredients)
import { values } from "@sando/tokens/ingredients/color";
values.brand[500]; // '#f97415'

// CSS variable names (flavors/recipes)
import { tokens } from "@sando/tokens/recipes";
tokens.button.solid.backgroundColor.default; // '--sando-button-solid-backgroundColor-default'
```

## 🔄 Adding New Tokens

### 1. Add to Source Files

```json
// src/ingredients/color.json
{
  "color": {
    "success": {
      "500": { "value": "#4cae4f", "type": "color" }
    }
  }
}
```

### 2. Build

```bash
npm run build
```

### 3. Use

```css
.success-button {
  background: var(--sando-color-success-500);
}
```

## 🎯 Output Formats

| Format            | Layer            | Purpose                 | Example                                          |
| ----------------- | ---------------- | ----------------------- | ------------------------------------------------ |
| **CSS**           | All              | Runtime styling         | `var(--sando-color-brand-500)`                   |
| **TS (CSS vars)** | Flavors, Recipes | Type-safe CSS var names | `'--sando-button-solid-backgroundColor-default'` |
| **TS (Values)**   | Ingredients      | JS calculations         | `'#f97415'`                                      |

## 📝 License

MIT © Sando Design System
