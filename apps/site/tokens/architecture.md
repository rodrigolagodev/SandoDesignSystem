# Token Architecture

Sando's token system is built on a three-layer architecture inspired by the layers of a sandwich.

## The Sandwich Analogy

Just like a well-crafted sandwich has distinct layers that work together, Sando has three token layers:

```
┌─────────────────────────────────────────────────┐
│  🍞 Recipes Layer (Component Tokens)            │
│  • button-solid-backgroundColor-default         │
│  • button-size-medium-paddingBlock              │
│  • button-borderRadius                          │
│  ↓ References Flavors                           │
├─────────────────────────────────────────────────┤
│  🥬 Flavors Layer (Semantic Tokens)             │
│  • color-action-solid-background-default        │
│  • color-text-body                              │
│  • color-background-base                        │
│  ↓ References Ingredients                       │
├─────────────────────────────────────────────────┤
│  🥓 Ingredients Layer (Primitive Tokens)        │
│  • color-brand-700: hsl(17, 88%, 40%)          │
│  • space-4: 1rem                                │
│  • font-size-300: 1rem                          │
└─────────────────────────────────────────────────┘
```

## Layer 1: Ingredients (Primitives)

**Raw, atomic values with no opinion or context.**

Ingredients are the most fundamental tokens in the system. They have no semantic meaning and never reference other tokens.

### Characteristics

- ✅ **Concrete values** (`hsl(17, 88%, 40%)`, `0.25rem`, `400`)
- ✅ **No references** (primitives only)
- ✅ **Numeric scale naming** (`color-brand-500`, `space-4`, `font-weight-400`)
- ❌ **No semantic meaning** (not "primary" or "interactive")

### Example: Color Ingredients

```json
{
  "color": {
    "brand": {
      "500": {
        "value": "hsl(17, 88%, 40%)",
        "type": "color"
      },
      "600": {
        "value": "hsl(17, 88%, 35%)",
        "type": "color"
      },
      "700": {
        "value": "hsl(17, 88%, 30%)",
        "type": "color"
      }
    },
    "neutral": {
      "50": {
        "value": "hsl(0, 0%, 98%)",
        "type": "color"
      },
      "100": {
        "value": "hsl(0, 0%, 95%)",
        "type": "color"
      }
    }
  }
}
```

### Categories

| Category          | Example Tokens                                | Values       |
| ----------------- | --------------------------------------------- | ------------ |
| **Color**         | `color-brand-500`                             | HSL colors   |
| **Space**         | `space-base`, `space-2x`                      | rem units    |
| **Font Size**     | `font-size-100`, `font-size-600`              | rem/px units |
| **Font Weight**   | `font-weight-regular`, `font-weight-bold`     | 100-900      |
| **Border Radius** | `border-radius-small`, `border-radius-circle` | px/rem/%     |
| **Opacity**       | `opacity-subtle`, `opacity-emphasis`          | 0-1          |
| **Duration**      | `animation-duration-fast`                     | ms           |
| **Easing**        | `animation-easing-smooth`                     | cubic-bezier |
| **Z-Index**       | `zIndex-base`, `zIndex-modal`                 | integers     |

## Layer 2: Flavors (Semantic Tokens)

**Context and meaning applied to ingredients.**

Flavors give semantic meaning to ingredients and enable theming. They reference ingredients only.

### Characteristics

- ✅ **Semantic names** (`color-background-interactive`, `spacing-comfortable`)
- ✅ **Reference ingredients only** (`{color.brand.500.value}`)
- ✅ **Enable theming** (different flavors = different themes)
- ❌ **Not component-specific** (generic concepts)

### Example: Color Flavors

```json
{
  "color": {
    "background": {
      "base": {
        "value": "{color.neutral.50.value}",
        "type": "color"
      },
      "interactive": {
        "value": "{color.brand.500.value}",
        "type": "color"
      }
    },
    "text": {
      "body": {
        "value": "{color.neutral.900.value}",
        "type": "color"
      },
      "heading": {
        "value": "{color.neutral.950.value}",
        "type": "color"
      }
    },
    "action": {
      "solid": {
        "background": {
          "default": {
            "value": "{color.brand.700.value}",
            "type": "color"
          },
          "hover": {
            "value": "{color.brand.800.value}",
            "type": "color"
          }
        }
      }
    }
  }
}
```

### Theming with Flavors

Different flavors reference different ingredients:

```json
// flavors/original.json
{
  "color": {
    "background": {
      "base": {
        "value": "{color.neutral.50.value}",  // Light background
        "type": "color"
      }
    }
  }
}

// flavors/dark.json
{
  "color": {
    "background": {
      "base": {
        "value": "{color.neutral.900.value}",  // Dark background
        "type": "color"
      }
    }
  }
}
```

## Layer 3: Recipes (Component Tokens)

**Component-specific tokens that reference flavors.**

Recipes are consumed directly by components. They reference flavors only, never ingredients.

### Characteristics

- ✅ **Component-specific** (`button-background-color`, `card-padding`)
- ✅ **Reference flavors only** (`{color.action.solid.background.default.value}`)
- ✅ **Consumed by components** (direct usage in CSS)
- ❌ **Never reference ingredients** (must go through flavors)

### Example: Button Recipe

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
        }
      },
      "textColor": {
        "default": {
          "value": "{color.action.solid.text.default.value}",
          "type": "color"
        }
      }
    },
    "size": {
      "medium": {
        "paddingBlock": {
          "value": "{spacing.comfortable.value}",
          "type": "dimension"
        }
      }
    }
  }
}
```

## Reference Chain

The power of this architecture is the reference chain:

```
Component CSS
    ↓ uses
Recipe Token (button-background-color)
    ↓ references
Flavor Token (color-action-solid-background-default)
    ↓ references
Ingredient Token (color-brand-700)
    ↓ resolves to
Actual Value (hsl(17, 88%, 30%))
```

### Example Flow

```css
/* Component uses recipe */
.sando-button {
  background: var(--sando-button-solid-backgroundColor-default);
}

/* Recipe references flavor */
:root {
  --sando-button-solid-backgroundColor-default: var(
    --sando-color-action-solid-background-default
  );
}

/* Flavor references ingredient */
:root {
  --sando-color-action-solid-background-default: var(--sando-color-brand-700);
}

/* Ingredient has concrete value */
:root {
  --sando-color-brand-700: hsl(17, 88%, 30%);
}
```

## Why Three Layers?

### Single Source of Truth

Ingredients define all raw values once. Changes propagate automatically.

```json
// Change ONE ingredient
"color-brand-500": "hsl(17, 88%, 40%)" → "hsl(220, 88%, 50%)"

// ALL buttons, cards, inputs update automatically!
```

### Powerful Theming

Change flavors to retheme entire system without touching components:

```
Same Components + Same Ingredients + Different Flavors = New Theme
```

### Component Independence

Components don't care about the underlying values:

```css
/* Component never changes */
.button {
  background: var(--sando-button-background-color);
}

/* Theming happens at flavor level */
```

## Token Naming Convention

All tokens follow this pattern:

```
--sando-{layer}-{category}-{variant}-{property}-{state}
```

### Examples

```css
/* Ingredient */
--sando-color-brand-700

/* Flavor */
--sando-color-action-solid-background-default

/* Recipe */
--sando-button-solid-backgroundColor-default
```

## File Structure

Tokens are organized by layer:

```
packages/tokens/src/
├── ingredients/
│   ├── color.json
│   ├── space.json
│   ├── font.json
│   ├── border.json
│   ├── animation.json
│   ├── opacity.json
│   ├── z-index.json
│   └── elevation.json
├── flavors/
│   ├── original.json     # Default theme
│   ├── dark.json         # Dark theme
│   └── strawberry.json   # Custom theme
└── recipes/
    ├── button.json
    ├── card.json
    └── input.json
```

## Build Process

Tokens are built with Style Dictionary:

```bash
pnpm build
```

**Input:** JSON token files
**Output:** CSS custom properties

```
src/ingredients/color.json
    ↓ Style Dictionary
dist/css/ingredients/color.css
```

## Validation

All tokens are validated through comprehensive tests:

- ✅ **Structure**: JSON validity, DTCG compliance
- ✅ **References**: No broken references, proper layering
- ✅ **Values**: Correct formats, valid ranges
- ✅ **Accessibility**: WCAG contrast ratios
- ✅ **Build**: Correct CSS output

```bash
pnpm test
```

[Learn more about testing →](/tokens/testing)

## Best Practices

### ✅ DO

- Add new primitive values to **Ingredients**
- Add semantic meaning at **Flavors** layer
- Create component tokens in **Recipes**
- Keep reference chain: Recipes → Flavors → Ingredients
- Test accessibility of all color combinations

### ❌ DON'T

- Skip layers (Recipes → Ingredients)
- Create circular references
- Use magic numbers in components
- Put semantic names in Ingredients
- Put concrete values in Flavors or Recipes

## Next Steps

- **[Ingredients Reference](/tokens/ingredients)** - All available primitive tokens
- **[Flavors Reference](/tokens/flavors)** - Semantic token catalog
- **[Recipes Reference](/tokens/recipes)** - Component token reference
- **[Token Testing](/tokens/testing)** - Comprehensive test suite
