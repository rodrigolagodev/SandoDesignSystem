---
title: Brutalist Flavor
description: Japanese brutalist design meets modern web aesthetics. Pure neutrals, electric vermillion accents, sharp edges, and bold typography for maximum visual impact.
---

# Brutalist Flavor

The Brutalist flavor embodies modern Japanese brutalist design principles: stark contrasts, bold typography, sharp edges, and purposeful minimalism. Inspired by contemporary Japanese web design trends and brutalist architecture, it delivers maximum visual impact through intentional restraint.

## Design Philosophy

Brutalist is the most opinionated flavor in the Sando system, making bold choices that prioritize clarity and impact over softness:

- **Pure Neutrals**: Zero-chroma `ink` palette for absolute clarity — no warm or cool bias
- **Electric Accent**: High-impact `vermillion` (hue 25°) for maximum visual punch
- **Sharp Geometry**: Minimal border-radius (0-4px max) — brutalist aesthetic
- **Bold Typography**: Condensed headings with extra-bold weight for impactful headlines
- **No Shadows**: Surfaces defined by borders, not depth — flat, honest design
- **Snappy Motion**: Fast, linear animations (100ms default) — no leisurely transitions

::: tip Inspired by Japanese Brutalism
Brutalist draws from the stark beauty of Japanese brutalist architecture and contemporary web design trends from Tokyo studios. It's designed for tech products, developer tools, and brands that want to make a bold statement.
:::

## Color Palette

### Ink (Neutrals)

The `ink` palette has **zero chroma** (`oklch(L 0 0)`), producing absolutely neutral grays with no warm or cool undertones. This creates maximum contrast and pairs cleanly with the electric vermillion accent.

| Token   | Light Mode                  | Dark Mode                   | Description           |
| ------- | --------------------------- | --------------------------- | --------------------- |
| Base    | `ink.50` `oklch(0.98 0 0)`  | `ink.950` `oklch(0.22 0 0)` | Page background       |
| Surface | `ink.100` `oklch(0.95 0 0)` | `ink.900` `oklch(0.30 0 0)` | Card/panel background |
| Raised  | `utility.white`             | `ink.800` `oklch(0.38 0 0)` | Elevated surfaces     |
| Text    | `ink.950` `oklch(0.22 0 0)` | `ink.50` `oklch(0.98 0 0)`  | Primary text          |
| Body    | `ink.800` `oklch(0.38 0 0)` | `ink.200` `oklch(0.90 0 0)` | Body text             |
| Muted   | `ink.500` `oklch(0.64 0 0)` | `ink.400` `oklch(0.73 0 0)` | De-emphasized text    |
| Border  | `ink.300` `oklch(0.82 0 0)` | `ink.600` `oklch(0.56 0 0)` | Default borders       |

### Vermillion (Accent)

Electric red-orange with **maximum chroma** for high visual impact. The vermillion hue (25°) sits between red and orange, creating an energetic, attention-grabbing accent that cuts through the neutral backdrop.

| Token   | Value            | OKLCH                 | Usage                 |
| ------- | ---------------- | --------------------- | --------------------- |
| Primary | `vermillion.600` | `oklch(0.56 0.22 25)` | Buttons, links, focus |
| Hover   | `vermillion.700` | `oklch(0.47 0.20 25)` | Hover states          |
| Active  | `vermillion.800` | `oklch(0.38 0.16 25)` | Active/pressed states |
| Subtle  | `vermillion.100` | `oklch(0.95 0.06 25)` | Emphasis backgrounds  |

::: warning High Chroma Accent
Vermillion uses chroma values up to `0.22` — significantly higher than most flavors. This creates the "electric" visual impact but should be used purposefully. The flavor already constrains accent usage to action elements and links.
:::

## When to Use

Choose Brutalist when you want:

- **Modern, contemporary aesthetic** — tech-forward and cutting-edge
- **Maximum contrast and clarity** — zero-chroma neutrals eliminate ambiguity
- **Bold, attention-grabbing design** — high-impact headlines and CTAs
- **Japanese-inspired minimalism** — purposeful restraint, every element earns its place
- **Professional, tech-forward appearance** — developer tools, SaaS, documentation sites

### Ideal Use Cases

- Developer tools and documentation
- Tech startups and SaaS products
- Portfolio sites for designers/developers
- Editorial and blog platforms
- Admin dashboards and internal tools

## When NOT to Use

Consider other flavors when:

- **You need a warm, approachable feel** — use `sando` or `tonkatsu` instead
- **Accessibility requires softer contrasts** — the stark black/white may be intense for some users
- **Brand colors don't align with red-orange** — vermillion is non-negotiable in this flavor
- **You want a softer, more organic aesthetic** — try `kiwi` for wellness or `strawberry` for elegance

## Usage

### HTML

Apply the brutalist flavor at any level of your DOM:

```html
<!-- Page-level flavor -->
<body flavor="brutalist">
  <sando-button>Bold Action</sando-button>
</body>
```

### Scoped Sections

Mix brutalist with other flavors on the same page:

```html
<body flavor="original">
  <header>
    <!-- Uses original flavor -->
    <sando-button variant="solid">Primary</sando-button>
  </header>

  <section flavor="brutalist">
    <!-- Brutalist section for impact -->
    <h2>Featured Content</h2>
    <sando-button variant="solid">View Project</sando-button>
  </section>
</body>
```

### Individual Component Override

Override a single component without affecting its context:

```html
<div flavor="sando">
  <sando-button>Sando Button</sando-button>
  <sando-button flavor="brutalist">Brutalist CTA</sando-button>
</div>
```

### With Dark Mode

Dark mode is automatic via CSS media queries — no additional attributes needed:

```html
<body flavor="brutalist">
  <!-- Components automatically adapt to system preference -->
  <sando-button variant="solid">Always Accessible</sando-button>
</body>
```

To force a specific mode, use the `flavor-mode` attribute:

```html
<div flavor="brutalist" flavor-mode="dark">
  <!-- Forces dark mode regardless of system preference -->
  <sando-button>Dark Mode Button</sando-button>
</div>
```

## Comparison with Other Flavors

| Aspect          | Brutalist           | Sando           | Original         | Tonkatsu      |
| --------------- | ------------------- | --------------- | ---------------- | ------------- |
| **Neutrals**    | Pure ink (0 chroma) | Warm neutrals   | Warm neutrals    | Warm neutrals |
| **Accent**      | Vermillion (25°)    | Brown (50°)     | Orange (38°)     | Brown (50°)   |
| **Radius**      | 0-4px (sharp)       | 6-8px (soft)    | 4-8px (moderate) | 2-4px (tight) |
| **Shadows**     | None                | Soft            | Subtle           | None          |
| **Typography**  | Condensed Bold      | Space Grotesk   | Inter            | Space Grotesk |
| **Motion**      | 100ms linear        | 200ms ease      | 200ms ease       | 150ms ease    |
| **Personality** | Stark, modern       | Artisanal, warm | Clean, versatile | Bold, rugged  |

## Design Token Details

### Typography

Brutalist uses a bold, condensed heading typeface for maximum impact:

```css
/* Heading */
--sando-font-family-heading: var(
  --sando-font-family-condensed
); /* Barlow Condensed */
--sando-font-weight-heading: var(--sando-font-weight-800); /* Extra bold */
--sando-font-lineHeight-heading: var(--sando-font-lineHeight-120); /* Tight */

/* Body */
--sando-font-family-body: var(--sando-font-family-inter); /* Inter */
--sando-font-weight-body: var(--sando-font-weight-400); /* Regular */

/* Code */
--sando-font-family-mono: var(
  --sando-font-family-jetbrains-mono
); /* JetBrains Mono */
```

### Shape and Borders

Sharp corners and defined borders — no soft edges or shadows:

```css
/* Border Radius */
--sando-border-radius-muted: var(--sando-border-radius-0); /* 0px - sharp */
--sando-border-radius-default: var(
  --sando-border-radius-50
); /* 2px - minimal */
--sando-border-radius-emphasis: var(--sando-border-radius-100); /* 4px - max */

/* Elevation (no shadows) */
--sando-elevation-muted: var(--sando-elevation-0); /* none */
--sando-elevation-default: var(--sando-elevation-0); /* none */
--sando-elevation-emphasis: var(--sando-elevation-0); /* none */
```

### Animation

Fast, linear transitions — snappy and decisive:

```css
/* Duration */
--sando-animation-duration-fast: var(
  --sando-animation-duration-100
); /* 100ms */
--sando-animation-duration-normal: var(
  --sando-animation-duration-100
); /* 100ms */
--sando-animation-duration-slow: var(
  --sando-animation-duration-200
); /* 200ms */

/* Easing */
--sando-animation-easing-default: var(
  --sando-animation-easing-linear
); /* linear */
```

### Action Colors

Primary action tokens using the vermillion palette:

```css
/* Solid variant */
--sando-color-action-solid-background-default: var(
  --sando-color-vermillion-600
);
--sando-color-action-solid-background-hover: var(--sando-color-vermillion-700);
--sando-color-action-solid-text-default: var(--sando-color-utility-white);

/* Outline variant */
--sando-color-action-outline-border-default: var(--sando-color-ink-300);
--sando-color-action-outline-text-default: var(--sando-color-ink-800);

/* Ghost variant */
--sando-color-action-ghost-background-hover: var(--sando-color-ink-100);
--sando-color-action-ghost-text-default: var(--sando-color-ink-800);

/* Focus */
--sando-color-focus-ring: var(--sando-color-vermillion-600);
```

## Mode Variants

Like all Sando flavors, Brutalist ships with 5 mode variants that respond automatically to user preferences:

| Mode              | Trigger                                   | Purpose                                         |
| ----------------- | ----------------------------------------- | ----------------------------------------------- |
| **Light**         | Default                                   | White background, dark text — maximum clarity   |
| **Dark**          | `@media (prefers-color-scheme: dark)`     | Inverted ink palette for low-light environments |
| **High Contrast** | `@media (prefers-contrast: more)`         | Maximum contrast for WCAG AAA compliance        |
| **Forced Colors** | `@media (forced-colors: active)`          | Windows High Contrast using system colors       |
| **Motion Reduce** | `@media (prefers-reduced-motion: reduce)` | All animation durations set to `0ms`            |

## Best Practices

### DO

- **Use for impact sections** — Brutalist works great for hero sections, CTAs, and featured content
- **Pair with neutral content** — Let the vermillion accent do the heavy lifting
- **Leverage the typography** — Condensed bold headings are a key feature; use them prominently
- **Trust the borders** — Without shadows, borders define your surfaces; use them intentionally
- **Test both modes** — The stark contrast shift between light and dark is dramatic; verify both

### DON'T

- **Don't overuse the accent** — Vermillion is powerful; too much dilutes its impact
- **Don't add shadows** — The flavor intentionally removes them; adding shadows breaks the aesthetic
- **Don't mix with warm flavors in the same section** — The temperature clash is jarring
- **Don't use for soft, approachable contexts** — Brutalist is intentionally stark

## Accessibility Considerations

Brutalist maintains WCAG AA compliance while pursuing its stark aesthetic:

- **Contrast ratios**: The zero-chroma ink palette ensures maximum text contrast
- **Focus indicators**: Vermillion focus rings are highly visible against neutral backgrounds
- **Color independence**: State colors (error, success, warning, info) use semantic palettes, not just the vermillion accent
- **Motion**: Respects `prefers-reduced-motion` automatically

::: tip High Contrast Mode
In high contrast mode, Brutalist increases the vermillion chroma even further and ensures all interactive elements meet WCAG AAA contrast ratios. The stark aesthetic actually benefits accessibility.
:::

## Related Resources

- **[Flavors Overview](/tokens/flavors)** — Explore all available flavors
- **[Theming Guide](/getting-started/theming)** — Learn how to apply and customize flavors
- **[Token Architecture](/tokens/architecture)** — Understand the Ingredients → Flavors → Recipes system
- **[Accessibility Guide](/guides/accessibility)** — Deep dive into WCAG compliance

---

[View brutalist flavor source](https://github.com/rodrigolagodev/SandoDesignSystem/tree/master/packages/tokens/src/flavors/brutalist)
