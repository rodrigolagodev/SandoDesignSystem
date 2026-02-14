---
title: Token Architecture
description: Understand Sando's three-layer token system — Ingredients, Flavors, and Recipes — and how they work together to create themeable, consistent UIs.
---

# Token Architecture

Every great dish starts with understanding your ingredients, your flavor profile, and your recipe. Sando's token system works the same way — three distinct layers that build on each other to give you consistency, flexibility, and infinite themeability.

This matters because tokens are the single source of truth for every visual decision in the system. Change one token, and it ripples through every component that uses it — automatically.

## The Three Layers

```
┌─────────────────────────────────────────────────┐
│  🍞 Recipes (Component Tokens)                   │
│  button-solid-backgroundColor-default            │
│  checkbox-solid-backgroundColor-checked          │
│  ↓ References Flavors                            │
├─────────────────────────────────────────────────┤
│  🥬 Flavors (Semantic Tokens)                    │
│  color-action-solid-background-default           │
│  color-text-body                                 │
│  ↓ References Ingredients                        │
├─────────────────────────────────────────────────┤
│  🥓 Ingredients (Primitive Tokens)               │
│  color-orange-700: oklch(0.47 0.11 38)           │
│  space-4: 1rem                                   │
│  font-size-300: 1rem                             │
└─────────────────────────────────────────────────┘
```

## Layer 1: Ingredients (Primitives)

**Your pantry staples — raw, absolute values with no opinion.**

Ingredients are the foundation. Like having salt, flour, and eggs in your pantry, these tokens don't decide what you're building. They're just the raw materials, ready for anything.

### Characteristics

- ✅ **Concrete values** — `oklch(0.65 0.12 38)`, `1rem`, `400`
- ✅ **No references** — they never point to other tokens
- ✅ **Numeric scale naming** — `color-orange-500`, `space-4`, `font-size-300`
- ❌ **No semantic meaning** — never "primary" or "interactive"

### Real Color Ingredients

All colors use [OKLCH](https://oklch.com/) — a perceptually uniform color space where lightness values are predictable and consistent across hues:

```json
{
  "color": {
    "orange": {
      "500": { "value": "oklch(0.65 0.12 38)", "type": "color" },
      "600": { "value": "oklch(0.56 0.12 38)", "type": "color" },
      "700": { "value": "oklch(0.47 0.11 38)", "type": "color" }
    },
    "blue": {
      "500": { "value": "oklch(0.65 0.11 230)", "type": "color" },
      "600": { "value": "oklch(0.56 0.11 230)", "type": "color" },
      "700": { "value": "oklch(0.47 0.10 230)", "type": "color" }
    },
    "neutralWarm": {
      "50": { "value": "oklch(0.98 0.018 30)", "type": "color" },
      "800": { "value": "oklch(0.38 0.018 30)", "type": "color" },
      "950": { "value": "oklch(0.22 0.018 30)", "type": "color" }
    }
  }
}
```

::: tip Why OKLCH?
Notice how `orange-500` and `blue-500` both have `L=0.65`? That means they appear equally bright to the human eye. This is perceptual uniformity — and it's why Sando's color system feels balanced across palettes. HSL can't do this: `hsl(30, 100%, 50%)` and `hsl(230, 100%, 50%)` look wildly different in brightness.
:::

### Spacing and Typography Ingredients

```json
{
  "space": {
    "0": { "value": "0rem", "type": "dimension" },
    "1": { "value": "0.25rem", "type": "dimension" },
    "2": { "value": "0.5rem", "type": "dimension" },
    "4": { "value": "1rem", "type": "dimension" },
    "8": { "value": "2rem", "type": "dimension" }
  }
}
```

### All Ingredient Categories

| Category          | Example Tokens            | Values       |
| ----------------- | ------------------------- | ------------ |
| **Color**         | `color-orange-500`        | OKLCH values |
| **Space**         | `space-4`                 | rem units    |
| **Font Size**     | `font-size-300`           | rem units    |
| **Font Weight**   | `font-weight-700`         | 100–900      |
| **Border Radius** | `border-radius-md`        | px/rem units |
| **Opacity**       | `opacity-50`              | 0–1          |
| **Duration**      | `animation-duration-fast` | ms           |
| **Easing**        | `animation-easing-smooth` | cubic-bezier |
| **Z-Index**       | `zIndex-modal`            | integers     |
| **Elevation**     | `elevation-md`            | box-shadow   |

## Layer 2: Flavors (Semantic Tokens)

**The chef's signature — where raw materials become meaningful.**

Flavors take ingredients and assign intent. Instead of "orange-700", you now have "action-solid-background-default". This is where theming happens.

### Characteristics

- ✅ **Semantic names** — `color-background-base`, `color-text-body`
- ✅ **Reference ingredients only** — `{color.neutralWarm.50.value}`
- ✅ **Enable theming** — different flavors = different themes
- ❌ **Not component-specific** — generic concepts only

### Real Flavor Tokens (Tonkatsu)

Here's what the Tonkatsu flavor looks like — rich, warm browns inspired by a craft kitchen:

```json
{
  "color": {
    "background": {
      "base": { "value": "{color.neutralWarm.50.value}", "type": "color" },
      "surface": { "value": "{color.neutralWarm.100.value}", "type": "color" },
      "raised": { "value": "{color.utility.white.value}", "type": "color" }
    },
    "text": {
      "heading": { "value": "{color.neutralWarm.950.value}", "type": "color" },
      "body": { "value": "{color.neutralWarm.800.value}", "type": "color" },
      "muted": { "value": "{color.neutralWarm.500.value}", "type": "color" },
      "on-solid": { "value": "{color.utility.white.value}", "type": "color" }
    },
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.brown.600.value}", "type": "color" },
          "hover": { "value": "{color.brown.700.value}", "type": "color" }
        }
      }
    },
    "focus": {
      "ring": { "value": "{color.brown.500.value}", "type": "color" }
    }
  }
}
```

### How Different Flavors Work

Same semantic tokens, different ingredient references — that's the magic:

```
Tonkatsu flavor:
  color-action-solid-background-default → brown-600  → oklch(0.55 0.08 50)

Strawberry flavor:
  color-action-solid-background-default → pink-600   → oklch(0.56 0.11 350)

Kiwi flavor:
  color-action-solid-background-default → green-600  → oklch(0.56 0.10 145)
```

Same component. Same recipe. Different flavor. Entirely different look.

### 6 Available Flavors

| Flavor       | Description                   | Neutral Base | Accent |
| ------------ | ----------------------------- | ------------ | ------ |
| `original`   | Default — warm orange tones   | neutral-warm | orange |
| `sando`      | Brand identity — golden amber | neutral-warm | brown  |
| `tonkatsu`   | Craft kitchen — artisanal     | neutral-warm | brown  |
| `strawberry` | Fresh and vibrant             | neutral      | pink   |
| `egg-salad`  | Sunny and cheerful            | neutral-warm | yellow |
| `kiwi`       | Natural and fresh             | neutral      | green  |

Each flavor also includes **dark**, **high-contrast**, **forced-colors**, and **motion-reduce** mode variants — applied automatically via CSS media queries.

## Layer 3: Recipes (Component Tokens)

**The finished dish — plated and ready to serve.**

Recipes are what components actually consume. Every button, input, and checkbox reads from recipe tokens, never from ingredients or flavors directly.

### Characteristics

- ✅ **Component-specific** — `button-solid-backgroundColor-default`
- ✅ **Reference flavors only** — `{color.action.solid.background.default.value}`
- ✅ **Consumed by components** — used directly in CSS
- ❌ **Never reference ingredients** — must go through flavors

### Real Button Recipe

```json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": {
          "value": "{color.action.solid.background.default.value}",
          "type": "color"
        },
        "hover": {
          "value": "{color.action.solid.background.hover.value}",
          "type": "color"
        },
        "disabled": {
          "value": "{color.action.disabled.background.value}",
          "type": "color"
        }
      },
      "textColor": {
        "default": {
          "value": "{color.action.solid.text.default.value}",
          "type": "color"
        },
        "disabled": {
          "value": "{color.action.disabled.text.value}",
          "type": "color"
        }
      }
    }
  }
}
```

### Available Recipe Files

| Recipe              | Component            |
| ------------------- | -------------------- |
| `button.json`       | `sando-button`       |
| `input.json`        | `sando-input`        |
| `checkbox.json`     | `sando-checkbox`     |
| `switch.json`       | `sando-switch`       |
| `select.json`       | `sando-select`       |
| `textarea.json`     | `sando-textarea`     |
| `radio.json`        | `sando-radio`        |
| `radio-group.json`  | `sando-radio-group`  |
| `badge.json`        | `sando-badge`        |
| `tag.json`          | `sando-tag`          |
| `spinner.json`      | `sando-spinner`      |
| `icon.json`         | `sando-icon`         |
| `label.json`        | `sando-label`        |
| `help-text.json`    | `sando-help-text`    |
| `form-group.json`   | `sando-form-group`   |
| `option.json`       | `sando-option`       |
| `option-group.json` | `sando-option-group` |
| `skeleton.json`     | `sando-skeleton-*`   |

## The Reference Chain

Here's how a single CSS property flows through all three layers:

```
Component CSS
    ↓ reads
Recipe Token (--sando-button-solid-backgroundColor-default)
    ↓ references
Flavor Token (--sando-color-action-solid-background-default)
    ↓ references
Ingredient Token (--sando-color-orange-700)
    ↓ resolves to
Concrete Value (oklch(0.47 0.11 38))
```

### In CSS

```css
/* The component reads the recipe */
:host {
  background: var(--sando-button-solid-backgroundColor-default);
}

/* The recipe references the flavor */
:root {
  --sando-button-solid-backgroundColor-default: var(
    --sando-color-action-solid-background-default
  );
}

/* The flavor references the ingredient */
:root {
  --sando-color-action-solid-background-default: var(--sando-color-orange-700);
}

/* The ingredient holds the concrete value */
:root {
  --sando-color-orange-700: oklch(0.47 0.11 38);
}
```

This matters because you can override at any level. Need to change every primary action across the system? Change the flavor. Need to change just one button? Override its recipe token.

## Why Three Layers?

### Single Source of Truth

Change one ingredient, and it propagates everywhere:

```
/* Before: orange brand */
--sando-color-orange-700: oklch(0.47 0.11 38)

/* After: blue brand — every component updates */
--sando-color-orange-700: oklch(0.47 0.10 230)
```

### Powerful Theming

Same components + same ingredients + different flavors = entirely new theme. No component changes needed.

### Component Independence

Components don't know or care about the underlying color values. They read their recipe tokens. The flavor layer handles the translation.

### Override Flexibility

```css
/* Level 1: Change one component's token */
sando-button.danger {
  --sando-button-solid-backgroundColor-default: var(--sando-color-red-600);
}

/* Level 2: Change all action colors via flavor */
:root {
  --sando-color-action-solid-background-default: oklch(0.56 0.14 15);
}

/* Level 3: Change the raw ingredient */
:root {
  --sando-color-orange-700: oklch(0.5 0.12 45);
}
```

## Token Naming Convention

All CSS custom properties follow this pattern:

```
--sando-{category}-{subcategory}-{property}-{state}
```

### Examples by Layer

```css
/* Ingredient — raw value, numeric scale */
--sando-color-orange-700
--sando-space-4
--sando-font-size-300

/* Flavor — semantic meaning, no component name */
--sando-color-action-solid-background-default
--sando-color-text-body
--sando-color-background-base

/* Recipe — component name, variant, property, state */
--sando-button-solid-backgroundColor-default
--sando-checkbox-solid-backgroundColor-checked
--sando-input-outlined-borderColor-focus
```

## File Structure

```
packages/tokens/src/
├── ingredients/           # Layer 1: Raw values
│   ├── color.json         # 8 OKLCH palettes + neutrals + states
│   ├── space.json         # Spacing scale (0–16+)
│   ├── font.json          # Typography scale
│   ├── border.json        # Border radii
│   ├── animation.json     # Durations, easings
│   ├── opacity.json       # Opacity scale
│   ├── z-index.json       # Stacking order
│   └── elevation.json     # Box shadows
├── flavors/               # Layer 2: Semantic themes
│   ├── original/          # Default flavor
│   │   ├── flavor.json
│   │   ├── flavor-dark.json
│   │   ├── flavor-high-contrast.json
│   │   ├── flavor-forced-colors.json
│   │   └── flavor-motion-reduce.json
│   ├── sando/             # Brand identity flavor
│   ├── tonkatsu/          # Craft kitchen flavor
│   ├── strawberry/        # Fresh vibrant flavor
│   ├── egg-salad/         # Sunny cheerful flavor
│   └── kiwi/              # Natural fresh flavor
└── recipes/               # Layer 3: Component tokens
    ├── button.json
    ├── input.json
    ├── checkbox.json
    ├── switch.json
    └── ... (18 recipe files total)
```

## Build Process

Tokens are built with [Style Dictionary](https://amzn.github.io/style-dictionary/):

```bash
# Build all token layers
pnpm build
```

**Input:** JSON token files with references
**Output:** CSS custom properties with resolved values

```
src/ingredients/color.json  →  dist/css/ingredients/color.css
src/flavors/tonkatsu/       →  dist/css/flavors/tonkatsu/flavor.css
src/recipes/button.json     →  dist/css/recipes/button.css
```

::: details How the build works
Style Dictionary reads the JSON token files, resolves all `{reference.paths}`, and outputs platform-specific formats. For Sando, the primary output is CSS custom properties scoped to `:root` (ingredients and flavors) or component selectors (recipes). Each flavor's mode variants use CSS `@media` queries for automatic activation.
:::

## Validation

All tokens are validated through comprehensive tests:

- ✅ **Structure** — JSON validity, naming conventions
- ✅ **References** — no broken references, proper layering (recipes → flavors → ingredients)
- ✅ **Values** — correct formats, valid OKLCH ranges
- ✅ **Accessibility** — WCAG contrast ratios for all flavor/mode combinations
- ✅ **Build** — correct CSS output, no missing variables

```bash
pnpm test
```

## Best Practices

### ✅ DO

- Add new primitive values to **Ingredients**
- Add semantic meaning at the **Flavors** layer
- Create component tokens in **Recipes**
- Keep the chain: Recipes → Flavors → Ingredients
- Test accessibility of all color combinations
- Use OKLCH for any new color values

### ❌ DON'T

- Skip layers (Recipes referencing Ingredients directly)
- Create circular references
- Use hardcoded colors in components
- Put semantic names in Ingredients (no "primary" at this layer)
- Put concrete values in Flavors or Recipes

## Next Steps

- **[Ingredients Reference →](/tokens/ingredients)** — All available primitive tokens
- **[Flavors Reference →](/tokens/flavors)** — Semantic token catalog and flavor comparison
- **[Recipes Reference →](/tokens/recipes)** — Component token reference
- **[Theming Guide →](/getting-started/theming)** — How to use flavors in practice
