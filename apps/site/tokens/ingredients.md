# Ingredients (Primitives)

Raw, atomic design values that form the foundation of the design system.

## Overview

Ingredients are the most basic tokens in Sando. They have **no semantic meaning** and **never reference other tokens**. Think of them as the raw ingredients you'd buy at the store before making a sandwich.

## Color

HSL color values organized in scales.

### Brand Colors

Full scale from 50 (lightest) to 950 (darkest):

```css
--sando-color-brand-50: hsl(33, 100%, 96%)
--sando-color-brand-100: hsl(34, 100%, 92%)
--sando-color-brand-200: hsl(32, 98%, 83%)
--sando-color-brand-300: hsl(31, 97%, 72%)
--sando-color-brand-400: hsl(27, 96%, 61%)
--sando-color-brand-500: hsl(25, 95%, 53%)
--sando-color-brand-600: hsl(21, 90%, 48%)
--sando-color-brand-700: hsl(17, 88%, 40%)
--sando-color-brand-800: hsl(15, 79%, 34%)
--sando-color-brand-900: hsl(15, 75%, 28%)
--sando-color-brand-950: hsl(13, 81%, 15%)
```

### Neutral Colors

Scale from 100 (lightest) to 950 (darkest):

```css
--sando-color-neutral-100: hsl(30, 50%, 98%)
--sando-color-neutral-200: hsl(30, 14%, 89%)
--sando-color-neutral-300: hsl(30, 7%, 79%)
--sando-color-neutral-400: hsl(40, 5%, 69%)
--sando-color-neutral-500: hsl(38, 5%, 59%)
--sando-color-neutral-600: hsl(39, 6%, 49%)
--sando-color-neutral-700: hsl(38, 8%, 39%)
--sando-color-neutral-800: hsl(42, 11%, 29%)
--sando-color-neutral-900: hsl(41, 19%, 19%)
--sando-color-neutral-950: hsl(40, 43%, 10%)
```

::: info Note
Neutral scale starts at 100, not 50. Brand scale includes 50.
:::

### State Colors

Purpose-specific colors for UI states:

**Error:**
```css
--sando-color-state-error-100: hsl(354, 100%, 90%)
--sando-color-state-error-400: hsl(1, 83%, 63%)
--sando-color-state-error-500: hsl(4, 90%, 58%)
--sando-color-state-error-700: hsl(0, 66%, 47%)
```

**Warning:**
```css
--sando-color-state-warning-100: hsl(45, 100%, 85%)
--sando-color-state-warning-500: hsl(45, 100%, 51%)
--sando-color-state-warning-700: hsl(34, 100%, 50%)
```

**Success:**
```css
--sando-color-state-success-100: hsl(122, 39%, 84%)
--sando-color-state-success-400: hsl(123, 39%, 57%)
--sando-color-state-success-500: hsl(122, 39%, 49%)
--sando-color-state-success-700: hsl(123, 46%, 34%)
```

**Info:**
```css
--sando-color-state-info-100: hsl(213, 94%, 93%)
--sando-color-state-info-500: hsl(221, 91%, 60%)
--sando-color-state-info-700: hsl(224, 71%, 40%)
```

### Utility Colors

```css
--sando-color-utility-white: hsl(0, 0%, 100%)
--sando-color-utility-black: hsl(0, 0%, 0%)
--sando-color-utility-transparent: transparent
```

[View all color ingredients →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/ingredients/color.json)

## Spacing

Spacing values using numeric scale (base unit: 0.25rem / 4px):

```css
--sando-space-0: 0rem         /* 0px */
--sando-space-1: 0.25rem      /* 4px */
--sando-space-2: 0.5rem       /* 8px */
--sando-space-3: 0.75rem      /* 12px */
--sando-space-4: 1rem         /* 16px */
--sando-space-5: 1.25rem      /* 20px */
--sando-space-6: 1.5rem       /* 24px */
--sando-space-7: 1.75rem      /* 28px */
--sando-space-8: 2rem         /* 32px */
--sando-space-10: 2.5rem      /* 40px */
--sando-space-12: 3rem        /* 48px */
--sando-space-16: 4rem        /* 64px */
--sando-space-20: 5rem        /* 80px */
--sando-space-24: 6rem        /* 96px */
--sando-space-32: 8rem        /* 128px */
--sando-space-40: 10rem       /* 160px */
--sando-space-48: 12rem       /* 192px */
--sando-space-64: 16rem       /* 256px */
```

[View all spacing ingredients →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/ingredients/space.json)

## Typography

Font sizes, weights, families, line heights, and letter spacing.

### Font Sizes

```css
--sando-font-size-50: 0.625rem    /* 10px */
--sando-font-size-100: 0.75rem    /* 12px */
--sando-font-size-200: 0.875rem   /* 14px */
--sando-font-size-300: 1rem       /* 16px - base */
--sando-font-size-400: 1.125rem   /* 18px */
--sando-font-size-500: 1.25rem    /* 20px */
--sando-font-size-600: 1.5rem     /* 24px */
--sando-font-size-700: 2rem       /* 32px */
--sando-font-size-800: 2.5rem     /* 40px */
--sando-font-size-900: 3rem       /* 48px */
```

### Font Weights

Numeric scale from 100 (thin) to 900 (black):

```css
--sando-font-weight-100: 100
--sando-font-weight-200: 200
--sando-font-weight-300: 300
--sando-font-weight-400: 400  /* Regular */
--sando-font-weight-500: 500  /* Medium */
--sando-font-weight-600: 600  /* Semibold */
--sando-font-weight-700: 700  /* Bold */
--sando-font-weight-800: 800
--sando-font-weight-900: 900
```

::: info Note
Font weights use numeric values (100-900), not semantic names. Use 400 for regular, 500 for medium, 600 for semibold, and 700 for bold.
:::

### Font Families

```css
--sando-font-family-sans: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif
--sando-font-family-serif: Georgia, Cambria, 'Times New Roman', Times, serif
--sando-font-family-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace
```

### Line Heights

```css
--sando-font-lineHeight-100: 1
--sando-font-lineHeight-120: 1.2
--sando-font-lineHeight-140: 1.4
--sando-font-lineHeight-150: 1.5
--sando-font-lineHeight-160: 1.6
--sando-font-lineHeight-180: 1.8
--sando-font-lineHeight-200: 2
```

### Letter Spacing

```css
--sando-font-letterSpacing-0: 0em
--sando-font-letterSpacing-25: 0.025em
--sando-font-letterSpacing-50: 0.05em
--sando-font-letterSpacing-100: 0.1em
```

[View all font ingredients →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/ingredients/font.json)

## Border

Border radius and width values.

### Border Radius

```css
--sando-border-radius-0: 0rem
--sando-border-radius-50: 0.125rem      /* 2px */
--sando-border-radius-100: 0.25rem      /* 4px */
--sando-border-radius-200: 0.5rem       /* 8px */
--sando-border-radius-300: 0.75rem      /* 12px */
--sando-border-radius-400: 1rem         /* 16px */
--sando-border-radius-500: 1.25rem      /* 20px */
--sando-border-radius-600: 1.5rem       /* 24px */
--sando-border-radius-circle: 50%
--sando-border-radius-full: 9999px
```

### Border Width

```css
--sando-border-width-0: 0px
--sando-border-width-50: 1px
--sando-border-width-100: 2px
--sando-border-width-150: 3px
--sando-border-width-200: 4px
--sando-border-width-300: 6px
--sando-border-width-400: 8px
```

[View all border ingredients →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/ingredients/border.json)

## Animation

Duration and easing values.

### Duration

```css
--sando-animation-duration-instant: 100ms
--sando-animation-duration-fast: 200ms
--sando-animation-duration-normal: 300ms
--sando-animation-duration-slow: 500ms
```

### Easing

```css
--sando-animation-easing-smooth: cubic-bezier(0.4, 0, 0.2, 1)
--sando-animation-easing-enter: cubic-bezier(0, 0, 0.2, 1)
--sando-animation-easing-exit: cubic-bezier(0.4, 0, 1, 1)
```

[View all animation ingredients →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/ingredients/animation.json)

## Opacity

Opacity values for transparency.

```css
--sando-opacity-subtle: 0.05
--sando-opacity-muted: 0.1
--sando-opacity-emphasis: 0.9
--sando-opacity-full: 1
```

## Z-Index

Layering hierarchy.

```css
--sando-zIndex-hide: -1
--sando-zIndex-base: 0
--sando-zIndex-raised: 10
--sando-zIndex-dropdown: 100
--sando-zIndex-modal: 1000
--sando-zIndex-tooltip: 1100
```

## Elevation (Shadows)

Box shadow values for depth.

```css
--sando-elevation-none: none
--sando-elevation-small: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--sando-elevation-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--sando-elevation-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

## Usage

Ingredients should **never** be used directly in components. They should only be referenced by Flavors:

```json
// ❌ BAD - Component referencing ingredient directly
{
  "button": {
    "backgroundColor": {
      "value": "{color.brand.500.value}"  // Skip flavors layer!
    }
  }
}

// ✅ GOOD - Flavor referencing ingredient
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "value": "{color.brand.500.value}"  // Flavor layer
        }
      }
    }
  }
}
```

## Adding New Ingredients

1. **Identify the need**: Do you need a new primitive value?
2. **Choose the category**: Color, spacing, typography, etc.
3. **Follow naming convention**: `{category}-{variant}-{scale}`
4. **Add to JSON**: `packages/tokens/src/ingredients/{category}.json`
5. **Build and test**: `pnpm build && pnpm test`

Example:

```json
{
  "color": {
    "accent": {
      "500": {
        "value": "hsl(280, 70%, 50%)",
        "type": "color"
      }
    }
  }
}
```

## Next Steps

- **[Flavors](/tokens/flavors)** - Learn how ingredients are used semantically
- **[Token Architecture](/tokens/architecture)** - Understand the three-layer system
- **[Testing](/tokens/testing)** - Token validation and testing
