---
title: Ingredients (Primitives)
description: The raw design tokens that form Sando's foundation — OKLCH colors, spacing, typography, borders, animation, and more
---

# Ingredients (Primitives)

Like pantry staples — always available, never change. Ingredients are the most basic tokens in Sando. They have **no semantic meaning** and **never reference other tokens**. Think of them as the raw ingredients you'd buy at the market before assembling your sandwich.

## How Ingredients Fit the System

```
Ingredients → Flavors → Recipes → Components
(you are here)
```

Ingredients should **never** be used directly in components. They flow through the system:

1. **Ingredients** define raw values (e.g., `color.orange.500`)
2. **Flavors** give them meaning (e.g., `color.action.solid.background.default`)
3. **Recipes** assign them to components (e.g., `button.solid.backgroundColor.default`)

::: warning Never Skip Layers
Components should never reference ingredients directly. Always go through flavors and recipes — that's how theming works.
:::

## Color Palettes

All colors are built using the **OKLCH color space** — a perceptually uniform color model that ensures consistent lightness across hues and guarantees accessibility (WCAG AA). No HSL, no RGB — just scientifically precise color.

::: tip Why OKLCH?
OKLCH ensures that two colors at the same lightness value _actually look_ the same brightness to human eyes. This means our 500-step across all palettes shares visual weight — something impossible with HSL or RGB.
:::

### Brand Colors (8 palettes)

#### Orange — Energetic, Friendly, Approachable

Sando's signature palette. Perfect for startups, creative agencies, food & beverage, and e-commerce.

| Step    | Value                     | Lightness |
| ------- | ------------------------- | --------- |
| 50      | `oklch(0.985 0.02 38)`    | Lightest  |
| 100     | `oklch(0.96 0.03 38)`     |           |
| 200     | `oklch(0.92 0.05 38)`     |           |
| 300     | `oklch(0.84 0.08 38)`     |           |
| 400     | `oklch(0.74 0.10 38)`     |           |
| **500** | **`oklch(0.65 0.12 38)`** | **Base**  |
| 600     | `oklch(0.56 0.12 38)`     |           |
| 700     | `oklch(0.47 0.11 38)`     |           |
| 800     | `oklch(0.38 0.09 38)`     |           |
| 900     | `oklch(0.30 0.07 38)`     |           |
| 950     | `oklch(0.22 0.06 38)`     | Darkest   |

```css
--sando-color-orange-50: oklch(0.985 0.02 38);
--sando-color-orange-500: oklch(0.65 0.12 38); /* Base */
--sando-color-orange-950: oklch(0.22 0.06 38);
```

#### Blue — Trust, Professional, Calm

SaaS, finance, healthcare, corporate, and tech. Hue 230.

| Step    | Value                      |
| ------- | -------------------------- |
| 50      | `oklch(0.985 0.015 230)`   |
| 200     | `oklch(0.92 0.045 230)`    |
| **500** | **`oklch(0.65 0.11 230)`** |
| 800     | `oklch(0.38 0.08 230)`     |
| 950     | `oklch(0.22 0.05 230)`     |

#### Green — Growth, Success, Natural

Sustainability, health & wellness, finance, and education. Hue 145.

| Step    | Value                      |
| ------- | -------------------------- |
| 50      | `oklch(0.985 0.015 145)`   |
| 200     | `oklch(0.92 0.04 145)`     |
| **500** | **`oklch(0.65 0.10 145)`** |
| 800     | `oklch(0.38 0.07 145)`     |
| 950     | `oklch(0.22 0.05 145)`     |

#### Red — Urgent, Important, Bold

News, alerts, e-commerce deals, and gaming. Hue 15.

| Step    | Value                     |
| ------- | ------------------------- |
| 50      | `oklch(0.985 0.02 15)`    |
| 200     | `oklch(0.92 0.06 15)`     |
| **500** | **`oklch(0.65 0.14 15)`** |
| 800     | `oklch(0.38 0.10 15)`     |
| 950     | `oklch(0.22 0.06 15)`     |

#### Purple — Creative, Premium, Sophisticated

Luxury brands, creative tools, entertainment, and fashion. Hue 290.

| Step    | Value                      |
| ------- | -------------------------- |
| 50      | `oklch(0.985 0.015 290)`   |
| 200     | `oklch(0.92 0.045 290)`    |
| **500** | **`oklch(0.65 0.10 290)`** |
| 800     | `oklch(0.38 0.07 290)`     |
| 950     | `oklch(0.22 0.05 290)`     |

#### Pink — Playful, Modern, Vibrant

Fashion, beauty, lifestyle, and social apps. Hue 350.

| Step    | Value                      |
| ------- | -------------------------- |
| 50      | `oklch(0.985 0.02 350)`    |
| 200     | `oklch(0.92 0.05 350)`     |
| **500** | **`oklch(0.65 0.11 350)`** |
| 800     | `oklch(0.38 0.08 350)`     |
| 950     | `oklch(0.22 0.05 350)`     |

#### Yellow — Warm, Optimistic, Attention

Warnings, highlights, creative brands, and education. Hue 90.

| Step    | Value                     |
| ------- | ------------------------- |
| 50      | `oklch(0.985 0.02 90)`    |
| 200     | `oklch(0.92 0.06 90)`     |
| **500** | **`oklch(0.75 0.10 90)`** |
| 800     | `oklch(0.40 0.07 90)`     |
| 950     | `oklch(0.24 0.04 90)`     |

#### Brown — Earthy, Organic, Grounded

Natural brands, artisan products, and coffee shops. Hue 50.

| Step    | Value                     |
| ------- | ------------------------- |
| 50      | `oklch(0.985 0.015 50)`   |
| 200     | `oklch(0.92 0.035 50)`    |
| **500** | **`oklch(0.65 0.08 50)`** |
| 800     | `oklch(0.37 0.06 50)`     |
| 950     | `oklch(0.21 0.04 50)`     |

### Neutral Colors (3 variants)

Choose the neutral that complements your brand palette. Each provides 11 steps from 50 to 950.

#### Neutral (Pure Gray — Balanced)

True neutral with minimal chroma. Pairs with any brand color. Hue 0, chroma 0.005.

```css
--sando-color-neutral-50: oklch(0.98 0.005 0);
--sando-color-neutral-500: oklch(0.64 0.005 0);
--sando-color-neutral-950: oklch(0.22 0.005 0);
```

#### Neutral Warm (Slight Warmth — Cozy)

Warm-tinted gray that pairs beautifully with orange, red, and brown palettes. Hue 30, chroma 0.018.

```css
--sando-color-neutralWarm-50: oklch(0.98 0.018 30);
--sando-color-neutralWarm-500: oklch(0.64 0.018 30);
--sando-color-neutralWarm-950: oklch(0.22 0.018 30);
```

#### Neutral Cool (Slight Blue Tint — Clean)

Cool-tinted gray for sophistication. Pairs with blue, purple, and green palettes. Hue 220, chroma 0.018.

```css
--sando-color-neutralCool-50: oklch(0.98 0.018 220);
--sando-color-neutralCool-500: oklch(0.64 0.018 220);
--sando-color-neutralCool-950: oklch(0.22 0.018 220);
```

### State Colors

Semantic colors for communicating status. Each includes multiple steps for backgrounds, text, and borders.

| State       | Hue   | Sample (500)           | Use Case                               |
| ----------- | ----- | ---------------------- | -------------------------------------- |
| **Error**   | 15    | `oklch(0.62 0.18 15)`  | Validation errors, destructive actions |
| **Warning** | 85/90 | `oklch(0.82 0.14 90)`  | Caution messages, attention needed     |
| **Success** | 145   | `oklch(0.60 0.11 145)` | Confirmations, completed actions       |
| **Info**    | 250   | `oklch(0.60 0.13 250)` | Informational messages, tips           |

::: details Error Steps

```css
--sando-color-state-error-100: oklch(0.92 0.04 15); /* Background */
--sando-color-state-error-300: oklch(0.78 0.12 15);
--sando-color-state-error-400: oklch(0.7 0.15 15);
--sando-color-state-error-500: oklch(0.62 0.18 15); /* Default */
--sando-color-state-error-600: oklch(0.54 0.16 15);
--sando-color-state-error-700: oklch(0.46 0.14 15);
--sando-color-state-error-900: oklch(0.36 0.1 15); /* Dark text */
```

:::

::: details Success Steps

```css
--sando-color-state-success-100: oklch(0.92 0.03 145);
--sando-color-state-success-300: oklch(0.78 0.08 145);
--sando-color-state-success-400: oklch(0.68 0.1 145);
--sando-color-state-success-500: oklch(0.6 0.11 145);
--sando-color-state-success-600: oklch(0.52 0.1 145);
--sando-color-state-success-700: oklch(0.44 0.08 145);
--sando-color-state-success-900: oklch(0.34 0.06 145);
```

:::

::: details Warning Steps

```css
--sando-color-state-warning-100: oklch(0.94 0.06 85);
--sando-color-state-warning-400: oklch(0.82 0.12 85);
--sando-color-state-warning-500: oklch(0.82 0.14 90);
--sando-color-state-warning-700: oklch(0.68 0.14 60);
```

:::

::: details Info Steps

```css
--sando-color-state-info-100: oklch(0.96 0.02 250);
--sando-color-state-info-400: oklch(0.74 0.1 250);
--sando-color-state-info-500: oklch(0.6 0.13 250);
--sando-color-state-info-700: oklch(0.48 0.1 250);
```

:::

### Utility Colors

```css
--sando-color-utility-white: oklch(1 0 0);
--sando-color-utility-black: oklch(0 0 0);
--sando-color-utility-transparent: transparent;
```

[View all color ingredients →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/ingredients/color.json)

## Spacing

A numeric scale based on `0.25rem` (4px) increments. Linear from 0–13, then larger jumps for layout spacing.

| Token              | Value     | Pixels |
| ------------------ | --------- | ------ |
| `--sando-space-0`  | `0rem`    | 0px    |
| `--sando-space-1`  | `0.25rem` | 4px    |
| `--sando-space-2`  | `0.5rem`  | 8px    |
| `--sando-space-3`  | `0.75rem` | 12px   |
| `--sando-space-4`  | `1rem`    | 16px   |
| `--sando-space-5`  | `1.25rem` | 20px   |
| `--sando-space-6`  | `1.5rem`  | 24px   |
| `--sando-space-7`  | `1.75rem` | 28px   |
| `--sando-space-8`  | `2rem`    | 32px   |
| `--sando-space-9`  | `2.25rem` | 36px   |
| `--sando-space-10` | `2.5rem`  | 40px   |
| `--sando-space-11` | `2.75rem` | 44px   |
| `--sando-space-12` | `3rem`    | 48px   |
| `--sando-space-13` | `3.25rem` | 52px   |
| `--sando-space-16` | `4rem`    | 64px   |
| `--sando-space-20` | `5rem`    | 80px   |
| `--sando-space-24` | `6rem`    | 96px   |
| `--sando-space-32` | `8rem`    | 128px  |
| `--sando-space-40` | `10rem`   | 160px  |
| `--sando-space-48` | `12rem`   | 192px  |
| `--sando-space-64` | `16rem`   | 256px  |

[View all spacing ingredients →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/ingredients/space.json)

## Typography

### Font Families

A curated collection of 20 font families — from system defaults to premium web fonts for different brand personalities.

**System Stacks:**

| Token   | Value                                                                        | Use Case          |
| ------- | ---------------------------------------------------------------------------- | ----------------- |
| `sans`  | `system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif` | Default UI text   |
| `serif` | `Georgia, Cambria, 'Times New Roman', Times, serif`                          | Editorial content |
| `mono`  | `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`   | Code blocks       |

**Display Fonts:**

| Token           | Value                                     | Description              |
| --------------- | ----------------------------------------- | ------------------------ |
| `display`       | `'Bebas Neue', Impact, ...`               | Bold display headings    |
| `display-serif` | `'Playfair Display', Didot, ...`          | Elegant serif headings   |
| `rounded`       | `'Nunito', Verdana, ...`                  | Friendly rounded text    |
| `condensed`     | `'Barlow Condensed', 'Arial Narrow', ...` | Space-efficient text     |
| `handwritten`   | `'Caveat', 'Brush Script MT', cursive`    | Personal, casual feel    |
| `slab`          | `'Roboto Slab', Rockwell, ...`            | Strong, structured serif |

**Premium Sans-Serif:**

| Token           | Value                       | Description                              |
| --------------- | --------------------------- | ---------------------------------------- |
| `inter`         | `'Inter', system-ui, ...`   | Premium UI sans — Original flavor        |
| `plus-jakarta`  | `'Plus Jakarta Sans', ...`  | Modern geometric — warm but professional |
| `dm-sans`       | `'DM Sans', system-ui, ...` | Clean geometric — contemporary           |
| `space-grotesk` | `'Space Grotesk', ...`      | Distinctive tech — craft/artisanal       |

**Premium Serifs:**

| Token          | Value                          | Description                          |
| -------------- | ------------------------------ | ------------------------------------ |
| `cormorant`    | `'Cormorant Garamond', ...`    | Elegant display serif — luxury       |
| `literata`     | `'Literata', Georgia, ...`     | Humanist serif — readable, warm      |
| `newsreader`   | `'Newsreader', Georgia, ...`   | Transitional serif — calm, editorial |
| `merriweather` | `'Merriweather', Georgia, ...` | Robust slab-serif — craft feel       |

**Premium Monospace:**

| Token            | Value                             | Description                     |
| ---------------- | --------------------------------- | ------------------------------- |
| `jetbrains-mono` | `'JetBrains Mono', Consolas, ...` | Coding-optimized with ligatures |
| `fira-code`      | `'Fira Code', Consolas, ...`      | Mozilla heritage, warm mono     |

### Font Sizes

| Token                   | Value      | Pixels      |
| ----------------------- | ---------- | ----------- |
| `--sando-font-size-50`  | `0.625rem` | 10px        |
| `--sando-font-size-100` | `0.75rem`  | 12px        |
| `--sando-font-size-200` | `0.875rem` | 14px        |
| `--sando-font-size-300` | `1rem`     | 16px (base) |
| `--sando-font-size-400` | `1.125rem` | 18px        |
| `--sando-font-size-500` | `1.25rem`  | 20px        |
| `--sando-font-size-600` | `1.5rem`   | 24px        |
| `--sando-font-size-700` | `2rem`     | 32px        |
| `--sando-font-size-800` | `2.5rem`   | 40px        |
| `--sando-font-size-900` | `3rem`     | 48px        |

### Font Weights

| Token                     | Value | Name        |
| ------------------------- | ----- | ----------- |
| `--sando-font-weight-100` | `100` | Thin        |
| `--sando-font-weight-200` | `200` | Extra Light |
| `--sando-font-weight-300` | `300` | Light       |
| `--sando-font-weight-400` | `400` | Regular     |
| `--sando-font-weight-500` | `500` | Medium      |
| `--sando-font-weight-600` | `600` | Semibold    |
| `--sando-font-weight-700` | `700` | Bold        |
| `--sando-font-weight-800` | `800` | Extra Bold  |
| `--sando-font-weight-900` | `900` | Black       |

::: info
Font weights use numeric values (100–900), not semantic names. Use 400 for regular text, 500 for medium emphasis, 600 for semibold UI elements, and 700 for bold headings.
:::

### Line Heights

| Token                         | Value |
| ----------------------------- | ----- |
| `--sando-font-lineHeight-100` | `1`   |
| `--sando-font-lineHeight-120` | `1.2` |
| `--sando-font-lineHeight-140` | `1.4` |
| `--sando-font-lineHeight-150` | `1.5` |
| `--sando-font-lineHeight-160` | `1.6` |
| `--sando-font-lineHeight-180` | `1.8` |
| `--sando-font-lineHeight-200` | `2`   |

### Letter Spacing

| Token                            | Value     |
| -------------------------------- | --------- |
| `--sando-font-letterSpacing-0`   | `0em`     |
| `--sando-font-letterSpacing-25`  | `0.025em` |
| `--sando-font-letterSpacing-50`  | `0.05em`  |
| `--sando-font-letterSpacing-100` | `0.1em`   |

[View all font ingredients →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/ingredients/font.json)

## Border

### Border Radius

| Token                          | Value      | Pixels | Description          |
| ------------------------------ | ---------- | ------ | -------------------- |
| `--sando-border-radius-0`      | `0rem`     | 0px    | Sharp corners        |
| `--sando-border-radius-50`     | `0.125rem` | 2px    | Barely rounded       |
| `--sando-border-radius-100`    | `0.25rem`  | 4px    | Subtle               |
| `--sando-border-radius-150`    | `0.375rem` | 6px    | Warm, artisanal feel |
| `--sando-border-radius-200`    | `0.5rem`   | 8px    | Standard             |
| `--sando-border-radius-300`    | `0.75rem`  | 12px   | Rounded              |
| `--sando-border-radius-400`    | `1rem`     | 16px   | Very rounded         |
| `--sando-border-radius-500`    | `1.25rem`  | 20px   | Extra rounded        |
| `--sando-border-radius-600`    | `1.5rem`   | 24px   | Maximum rounded      |
| `--sando-border-radius-circle` | `50%`      | —      | Perfect circle       |
| `--sando-border-radius-pill`   | `9999px`   | —      | Pill / capsule shape |

### Border Width

| Token                      | Value |
| -------------------------- | ----- |
| `--sando-border-width-0`   | `0px` |
| `--sando-border-width-50`  | `1px` |
| `--sando-border-width-100` | `2px` |
| `--sando-border-width-150` | `3px` |
| `--sando-border-width-200` | `4px` |
| `--sando-border-width-300` | `6px` |
| `--sando-border-width-400` | `8px` |

[View all border ingredients →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/ingredients/border.json)

## Animation

### Duration

| Token                             | Value    | Use Case                          |
| --------------------------------- | -------- | --------------------------------- |
| `--sando-animation-duration-0`    | `0ms`    | No animation                      |
| `--sando-animation-duration-100`  | `100ms`  | Micro-interactions (hover, focus) |
| `--sando-animation-duration-200`  | `200ms`  | Quick transitions                 |
| `--sando-animation-duration-300`  | `300ms`  | Standard transitions              |
| `--sando-animation-duration-500`  | `500ms`  | Moderate animations               |
| `--sando-animation-duration-700`  | `700ms`  | Deliberate animations             |
| `--sando-animation-duration-1000` | `1000ms` | Slow, dramatic                    |
| `--sando-animation-duration-1500` | `1500ms` | Extended                          |
| `--sando-animation-duration-2000` | `2000ms` | Very slow                         |
| `--sando-animation-duration-2500` | `2500ms` | Longest                           |

### Easing

| Token         | Value                                    | Description                |
| ------------- | ---------------------------------------- | -------------------------- |
| `linear`      | `linear`                                 | Constant speed             |
| `ease-in`     | `cubic-bezier(0.4, 0, 1, 1)`             | Accelerate                 |
| `ease-out`    | `cubic-bezier(0, 0, 0.2, 1)`             | Decelerate                 |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)`           | Accelerate then decelerate |
| `bounce`      | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful overshoot          |
| `smooth`      | `cubic-bezier(0.45, 0.05, 0.55, 0.95)`   | Gradual, smooth            |
| `gentle`      | `cubic-bezier(0.4, 0.1, 0.6, 0.9)`       | Subtle, gentle             |
| `energetic`   | `cubic-bezier(0.2, 0.8, 0.2, 1)`         | Snappy, energetic          |
| `organic`     | `cubic-bezier(0.42, 0, 0.58, 1)`         | Natural, symmetric         |

[View all animation ingredients →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/ingredients/animation.json)

## Opacity

A linear scale from fully transparent to fully opaque.

| Token                  | Value |
| ---------------------- | ----- |
| `--sando-opacity-0`    | `0`   |
| `--sando-opacity-100`  | `0.1` |
| `--sando-opacity-200`  | `0.2` |
| `--sando-opacity-300`  | `0.3` |
| `--sando-opacity-400`  | `0.4` |
| `--sando-opacity-500`  | `0.5` |
| `--sando-opacity-600`  | `0.6` |
| `--sando-opacity-700`  | `0.7` |
| `--sando-opacity-800`  | `0.8` |
| `--sando-opacity-900`  | `0.9` |
| `--sando-opacity-1000` | `1`   |

## Z-Index

A structured layering hierarchy to prevent z-index wars.

| Token                     | Value  | Use Case            |
| ------------------------- | ------ | ------------------- |
| `--sando-zIndex-hide`     | `-1`   | Hidden elements     |
| `--sando-zIndex-base`     | `0`    | Default layer       |
| `--sando-zIndex-raised`   | `1`    | Slightly elevated   |
| `--sando-zIndex-dropdown` | `1000` | Dropdown menus      |
| `--sando-zIndex-sticky`   | `1100` | Sticky headers      |
| `--sando-zIndex-banner`   | `1200` | Banners, alerts     |
| `--sando-zIndex-overlay`  | `1300` | Overlays, backdrops |
| `--sando-zIndex-modal`    | `1400` | Modal dialogs       |
| `--sando-zIndex-popover`  | `1500` | Popovers            |
| `--sando-zIndex-toast`    | `1600` | Toast notifications |
| `--sando-zIndex-tooltip`  | `1700` | Tooltips            |
| `--sando-zIndex-max`      | `9999` | Nuclear option      |

## Elevation (Shadows)

Box shadows for creating depth. Each level adds more visual separation from the background.

| Token                   | Value                                                                 |
| ----------------------- | --------------------------------------------------------------------- |
| `--sando-elevation-0`   | `none`                                                                |
| `--sando-elevation-100` | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)`           |
| `--sando-elevation-200` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)`     |
| `--sando-elevation-300` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)`   |
| `--sando-elevation-400` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)` |
| `--sando-elevation-500` | `0 25px 50px -12px rgba(0,0,0,0.25)`                                  |

## Adding New Ingredients

1. **Identify the need** — Do you need a new primitive value that doesn't exist?
2. **Choose the category** — Color, spacing, typography, border, animation, opacity, z-index, or elevation.
3. **Follow the naming convention** — `{category}-{variant}-{scale}`
4. **Add to the JSON file** — `packages/tokens/src/ingredients/{category}.json`
5. **Build and test** — `pnpm build && pnpm test`

```json
{
  "color": {
    "teal": {
      "500": {
        "value": "oklch(0.65 0.10 180)",
        "type": "color",
        "description": "teal 500"
      }
    }
  }
}
```

::: tip Remember: OKLCH Only
All color values must use the OKLCH format: `oklch(lightness chroma hue)`. No HSL, no RGB, no hex. This ensures perceptual uniformity across the entire system.
:::

## Next Steps

- **[Flavors](/tokens/flavors)** — Learn how ingredients get semantic meaning
- **[Recipes](/tokens/recipes)** — See how components consume tokens
- **[Token Architecture](/tokens/architecture)** — Understand the three-layer system
