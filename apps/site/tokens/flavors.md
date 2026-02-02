# Flavors (Semantic Tokens)

Semantic tokens that give meaning and context to primitive ingredients.

::: info Current Status
All 5 curated flavors are now available, each inspired by a type of Japanese Sando (sandwich):

- **Original** 🍞 - Tonos naranjas cálidos (pan tostado dorado)
- **Strawberry** 🍓 - Tonos rojos (fresa fresca)
- **Egg Salad** 🥚 - Tonos amarillos (yema de huevo cremosa)
- **Tonkatsu** 🍖 - Tonos marrones (carne empanizada crujiente)
- **Kiwi** 🥝 - Tonos verdes (fruta kiwi vibrante)
  :::

## Overview

Flavors are the middle layer of the token system. They transform raw ingredients into meaningful, contextual tokens that can be used to create different themes.

## Why Flavors?

Flavors enable **theming** without changing components or ingredients:

```
Same Ingredients + Different Flavors = Different Themes
```

**The Sando Philosophy:**

- We provide **8 curated color palettes** (orange, blue, green, red, purple, pink + 3 neutrals)
- You create **flavors** by mapping these palettes to semantic roles
- Components consume flavors, never ingredients directly
- Result: Consistent components with unique brand identity

## How Flavors Work

```
1. Choose a palette: blue, green, orange, purple, pink, red
2. Map to semantic roles: action.solid.background → blue.500
3. Build tokens: pnpm build
4. Use in components: <sando-button flavor="tonkatsu">
```

## Structure

Flavors reference **ingredients only**, never recipes or other flavors.

```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": {
            "value": "{color.blue.500.value}", // Maps palette to semantic role
            "type": "color"
          },
          "hover": {
            "value": "{color.blue.600.value}",
            "type": "color"
          }
        }
      }
    },
    "background": {
      "base": {
        "value": "{color.neutral-cool.50.value}", // Choose neutral variant
        "type": "color"
      }
    }
  }
}
```

## Available Flavors

### Original (Default) ✅

Neutral-based flavor - the base theme and default for all components.

**Palette:** `neutral`
**Personality:** Professional, balanced, versatile
**Use case:** Default theme, business applications, content-focused sites

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-neutral-700)
  --sando-color-background-base: var(--sando-color-neutral-100)
  --sando-color-text-body: var(--sando-color-neutral-900);
```

[View original flavor →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/flavors/original.json)

### Strawberry ✅

Orange-based flavor with warm neutral - **currently available**.

**Palette:** `orange` + `neutral-warm`
**Personality:** Energetic, friendly, approachable
**Use case:** Startups, creative agencies, food & beverage

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-orange-700)
  --sando-color-background-base: var(--sando-color-neutral-warm-100)
  --sando-color-text-body: var(--sando-color-neutral-warm-900);
```

[View strawberry flavor →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/flavors/strawberry.json)

### Tonkatsu 🍖 ✅

Brown-based flavor inspired by crispy breaded cutlet - **currently available**.

**Palette:** `brown` + `neutral-warm`
**Personality:** Warm, hearty, grounded
**Use case:** Food & beverage, hospitality, artisanal brands

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-brown-700)
  --sando-color-background-base: var(--sando-color-neutral-warm-100)
  --sando-color-text-body: var(--sando-color-neutral-warm-800);
```

[View tonkatsu flavor →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/flavors/tonkatsu.json)

### Kiwi 🥝 ✅

Green-based flavor inspired by fresh kiwi fruit - **currently available**.

**Palette:** `green` + `neutral`
**Personality:** Fresh, natural, vibrant
**Use case:** Sustainability, health & wellness, organic products

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-green-700)
  --sando-color-background-base: var(--sando-color-neutral-100)
  --sando-color-text-body: var(--sando-color-neutral-900);
```

[View kiwi flavor →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/flavors/kiwi.json)

### Egg Salad 🥚 ✅

Yellow-based flavor inspired by creamy egg yolk - **currently available**.

**Palette:** `yellow` + `neutral-warm`
**Personality:** Warm, cheerful, inviting
**Use case:** Breakfast brands, children's products, creative work

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-yellow-600)
  --sando-color-background-base: var(--sando-color-neutral-warm-100)
  --sando-color-text-body: var(--sando-color-neutral-warm-900);
```

[View egg-salad flavor →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/flavors/egg-salad.json)

## Token Categories

### Background Colors

```css
--sando-color-background-base        /* Page background */
--sando-color-background-surface     /* Card/panel background */
--sando-color-background-raised      /* Elevated surfaces */
--sando-color-background-overlay     /* Modal overlay */
--sando-color-background-interactive /* Interactive elements */
```

### Text Colors

```css
--sando-color-text-body      /* Body text */
--sando-color-text-heading   /* Headings */
--sando-color-text-caption   /* Captions, labels */
--sando-color-text-muted     /* De-emphasized text */
--sando-color-text-link      /* Link text */
```

### Action Colors

```css
/* Solid buttons */
--sando-color-action-solid-background-default
--sando-color-action-solid-background-hover
--sando-color-action-solid-background-active
--sando-color-action-solid-text-default

/* Outline buttons */
--sando-color-action-outline-border-default
--sando-color-action-outline-text-default

/* Ghost buttons */
--sando-color-action-ghost-text-default
```

### Border Colors

```css
--sando-color-border-default   /* Default borders */
--sando-color-border-emphasis  /* Emphasized borders */
--sando-color-border-muted     /* Subtle borders */
```

### State Colors

```css
/* Success */
--sando-color-state-success-background
--sando-color-state-success-text
--sando-color-state-success-border

/* Destructive/Error */
--sando-color-state-destructive-background
--sando-color-state-destructive-text

/* Warning */
--sando-color-state-warning-background
--sando-color-state-warning-text
```

### Focus

```css
--sando-color-focus-ring       /* Focus indicator color */
--sando-color-focus-background /* Focus background */
```

## Creating a Custom Flavor

### Option 1: Using Our Curated Palettes (Recommended)

Create a new file in `packages/tokens/src/flavors/`:

```json
// lavender.json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": {
            "value": "{color.purple.600.value}", // Choose from 8 palettes
            "type": "color"
          },
          "hover": {
            "value": "{color.purple.700.value}",
            "type": "color"
          }
        }
      }
    },
    "background": {
      "base": {
        "value": "{color.neutral-cool.50.value}", // Choose neutral variant
        "type": "color"
      }
    },
    "text": {
      "body": {
        "value": "{color.neutral-cool.900.value}",
        "type": "color"
      }
    }
  }
}
```

Build and use:

```bash
pnpm build
```

```html
<div flavor="lavender">
  <sando-button variant="solid">Lavender Button</sando-button>
</div>
```

### Option 2: Generate Brand-Specific Palette (Coming Soon)

::: warning Generator Under Development
If you need an exact brand color that doesn't match our 8 palettes, you'll soon be able to generate a custom palette:

```bash
npx @sando/flavor-generator create \
  --name "myBrand" \
  --color "#8B5CF6" \
  --neutral "cool"

# Outputs:
# ✓ Generated custom purple palette (11 steps, OKLCH)
# ✓ Generated myBrand flavor (light + dark)
# ✓ WCAG AA validation passed
# → packages/tokens/src/ingredients/color-mybrand.json
# → packages/tokens/src/flavors/mybrand.json
```

**What it does:**

- Generates a scientifically designed 11-step palette using OKLCH
- Validates WCAG AA accessibility automatically
- Creates light + dark mode flavor variants
- Outputs ready-to-use token files

**Status:** Flavor generator is under development.
**Timeline:** Q2 2025
**Priority:** High

[Track development progress →](https://github.com/your-org/sando-design-system/issues/XX)
:::

## Applying Flavors

See [Theming Guide](/getting-started/theming) for complete theming documentation.

## Best Practices

### ✅ DO

- Reference ingredients only
- Use semantic names (`background-interactive`, not `color-blue`)
- Maintain consistency across flavors
- Test accessibility (WCAG AA contrast)

### ❌ DON'T

- Reference other flavors or recipes
- Use hard-coded values
- Skip accessibility testing
- Create too many flavors (2-3 is usually enough)

## Next Steps

- **[Recipes](/tokens/recipes)** - Component-specific tokens
- **[Theming](/getting-started/theming)** - Apply flavors to components
- **[Accessibility](/guides/accessibility)** - Ensure WCAG compliance
