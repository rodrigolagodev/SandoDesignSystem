---
title: Flavors
description: Explore the 6 curated flavor themes in Sando Design System — each one a complete brand identity built from the same quality ingredients.
---

# Flavors

Every great sandwich starts with the same quality bread, but what makes each one unforgettable is the filling. Flavors are Sando's filling — the semantic token layer that transforms raw ingredients into a complete brand identity.

Each flavor tells a different brand story, but they all share the same foundation: OKLCH-based color palettes, accessible contrast ratios, and consistent semantic structure.

::: tip 6 Flavors, Infinite Possibilities
Sando ships with 6 curated flavors. Each one defines not just colors, but typography pairings, spacing rhythm, border radius personality, animation timing, and elevation style — a complete design language in a single `flavor` attribute.
:::

## The Flavor Menu

| Flavor            | Primary Color          | Personality                | Best For                                             |
| ----------------- | ---------------------- | -------------------------- | ---------------------------------------------------- |
| 🍱 **Sando**      | Brown (Tonkatsu Amber) | Warm, crafted, artisanal   | Official brand, design system docs                   |
| 🍞 **Original**   | Orange                 | Clean, modern, versatile   | SaaS, tech products, content sites                   |
| 🍓 **Strawberry** | Red (Deep Rose)        | Elegant, romantic, premium | Fashion, luxury, editorial                           |
| 🍖 **Tonkatsu**   | Brown (Burnt Amber)    | Bold, rugged, handcrafted  | Craft brands, artisan, food & beverage               |
| 🥝 **Kiwi**       | Green (Emerald)        | Serene, natural, fresh     | Wellness, sustainability, eco brands                 |
| 🥚 **Egg Salad**  | Yellow (Amber/Gold)    | Cheerful, warm, inviting   | Breakfast brands, creative work, children's products |

## Applying a Flavor

Swap the entire look and feel of your UI with a single attribute:

```html
<!-- Set flavor at the page level -->
<body flavor="strawberry">
  <sando-button variant="solid">Strawberry Button</sando-button>
</body>
```

You can also scope a flavor to a section of your page:

```html
<body flavor="original">
  <header>
    <!-- Uses Original flavor -->
    <sando-button variant="solid">Header Action</sando-button>
  </header>

  <section flavor="kiwi">
    <!-- Uses Kiwi flavor in this section only -->
    <sando-button variant="solid">Kiwi Action</sando-button>
  </section>
</body>
```

::: warning Flavor ≠ Color Mode
**Flavors** control brand identity (which colors, fonts, spacing, animations). **Color modes** control accessibility variants (light, dark, high-contrast). They're independent — every flavor works in every mode automatically via CSS `@media` queries.
:::

## The 6 Flavors in Detail

### 🍱 Sando (Official Brand)

The signature flavor — Sando's own brand identity. Warm, crafted aesthetic inspired by the Katsu Sando itself: golden fried cutlet, warm bread, rich sauce. Japanese-inspired minimalism meets approachable expertise.

**Primary palette:** `brown` + `neutralWarm`
**Typography:** Space Grotesk (headings) + Inter (body) + JetBrains Mono (code)
**Personality:** Artisanal warmth with technical precision

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-brown-600);
--sando-color-background-base: var(--sando-color-neutralWarm-50);
--sando-color-text-body: var(--sando-color-neutralWarm-800);
--sando-color-focus-ring: var(--sando-color-brown-500);
```

**Use case:** The official Sando Design System documentation, products that want to embody the Sando philosophy of craftsmanship and warmth.

[View sando flavor source →](https://github.com/rodrigolagodev/SandoDesignSystem/tree/master/packages/tokens/src/flavors/sando)

---

### 🍞 Original

Premium minimalist Japanese aesthetic inspired by Vercel, Linear, and Stripe. Warm whites with sophisticated orange accents. Clean, confident, and versatile — a modern baseline that works for almost anything.

**Primary palette:** `orange` + `neutralWarm`
**Typography:** Inter (headings + body) + JetBrains Mono (code)
**Personality:** Polished, modern, universally appealing

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-orange-600);
--sando-color-background-base: var(--sando-color-neutralWarm-50);
--sando-color-text-body: var(--sando-color-neutralWarm-800);
--sando-color-focus-ring: var(--sando-color-orange-600);
```

**Use case:** SaaS products, developer tools, content-focused sites, business applications. The safe-yet-distinctive default.

[View original flavor source →](https://github.com/rodrigolagodev/SandoDesignSystem/tree/master/packages/tokens/src/flavors/original)

---

### 🍓 Strawberry

Parisian Patisserie elegance. Warm neutral foundation with deep rose/wine accents. Romantic, premium, and sophisticated — like a strawberry Sando from a Tokyo bakery.

**Primary palette:** `red` (deep rose) + `neutralWarm`
**Typography:** Cormorant (headings) + DM Sans (body) + JetBrains Mono (code)
**Personality:** Elegant, editorial, refined

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-red-700);
--sando-color-background-base: var(--sando-color-neutralWarm-50);
--sando-color-text-body: var(--sando-color-neutralWarm-800);
--sando-color-focus-ring: var(--sando-color-red-600);
```

::: info Not Orange — It's Rose
The previous documentation incorrectly described Strawberry as "orange-based." It uses the **red** palette with deep rose/wine tones — faithful to its namesake.
:::

**Use case:** Fashion brands, luxury products, editorial sites, beauty and lifestyle platforms.

[View strawberry flavor source →](https://github.com/rodrigolagodev/SandoDesignSystem/tree/master/packages/tokens/src/flavors/strawberry)

---

### 🍖 Tonkatsu

Craft Kitchen aesthetic. Artisanal, bold, handmade. Warm neutral foundation with burnt amber/brown accents. Heavier borders, tighter corners, serif body text — like a chalkboard menu at a craft restaurant.

**Primary palette:** `brown` (burnt amber) + `neutralWarm`
**Typography:** Space Grotesk (headings) + Merriweather (body) + Fira Code (code)
**Personality:** Bold, rugged, grounded

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-brown-600);
--sando-color-background-base: var(--sando-color-neutralWarm-50);
--sando-color-text-body: var(--sando-color-neutralWarm-800);
--sando-color-focus-ring: var(--sando-color-brown-500);
```

**Design details:** Tonkatsu uses thicker borders (`border.width.100` default vs `border.width.50`), tighter corner radius (`border.radius.50` default), and bolder heading weight (`font.weight.900`). It's the most opinionated flavor — deliberately different.

**Use case:** Craft brands, artisan food & beverage, hospitality, handmade products.

[View tonkatsu flavor source →](https://github.com/rodrigolagodev/SandoDesignSystem/tree/master/packages/tokens/src/flavors/tonkatsu)

---

### 🥝 Kiwi

Japanese Garden Spa serenity. Minimal aesthetic with warm neutral foundation and emerald green accents. Calm, natural, and breathable — like a quiet garden path.

**Primary palette:** `green` (emerald) + `neutralWarm`
**Typography:** Plus Jakarta Sans (headings) + Newsreader (body) + Fira Code (code)
**Personality:** Serene, organic, mindful

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-green-600);
--sando-color-background-base: var(--sando-color-neutralWarm-50);
--sando-color-text-body: var(--sando-color-neutralWarm-800);
--sando-color-focus-ring: var(--sando-color-green-500);
```

**Design details:** Kiwi uses generous spacing, rounded corners (`border.radius.200` default), and gentle animation curves. Press interactions use subtle scale (`scale.98`) instead of aggressive bounce — respecting the spa-like calm.

**Use case:** Wellness, sustainability, eco-friendly brands, health apps, organic products.

[View kiwi flavor source →](https://github.com/rodrigolagodev/SandoDesignSystem/tree/master/packages/tokens/src/flavors/kiwi)

---

### 🥚 Egg Salad

Parisian Breakfast elegance. Warm neutral foundation with sophisticated amber/gold accents. Professional yet approachable — like a sunny morning café where everything feels just right.

**Primary palette:** `yellow` (amber/gold) + `neutralWarm`
**Typography:** DM Sans (headings) + Literata (body) + Fira Code (code)
**Personality:** Warm, cheerful, inviting

```css
/* Key tokens */
--sando-color-action-solid-background-default: var(--sando-color-yellow-500);
--sando-color-background-base: var(--sando-color-neutralWarm-50);
--sando-color-background-surface: var(--sando-color-yellow-50);
--sando-color-focus-ring: var(--sando-color-yellow-500);
```

**Design details:** Egg Salad uniquely tints its surface background with `yellow.50` and uses `yellow.100` for emphasis backgrounds, giving the entire UI a warm, sun-kissed glow. Ghost button hovers use `yellow.100` instead of neutral.

**Use case:** Breakfast and food brands, children's products, creative agencies, educational platforms.

[View egg-salad flavor source →](https://github.com/rodrigolagodev/SandoDesignSystem/tree/master/packages/tokens/src/flavors/egg-salad)

## Mode Variants

Every flavor ships with **5 mode variants** — because a great recipe needs to taste good in any lighting:

| Mode              | Trigger                                   | Purpose                                         |
| ----------------- | ----------------------------------------- | ----------------------------------------------- |
| **Light**         | Default                                   | Standard light background, optimal for daylight |
| **Dark**          | `@media (prefers-color-scheme: dark)`     | Inverted palette for low-light environments     |
| **High Contrast** | `@media (prefers-contrast: more)`         | Maximum contrast for WCAG AAA compliance        |
| **Forced Colors** | `@media (forced-colors: active)`          | Windows High Contrast using system colors       |
| **Motion Reduce** | `@media (prefers-reduced-motion: reduce)` | All animation durations set to `0ms`            |

Color modes are **automatic** — they respond to user system preferences via CSS media queries. No JavaScript required, no manual override needed.

```html
<!-- You set the flavor, the system handles the mode -->
<body flavor="kiwi">
  <!-- Dark mode? Automatic. High contrast? Automatic. -->
  <sando-button variant="solid">Always Accessible</sando-button>
</body>
```

::: tip Testing Modes in DevTools
To test different color modes during development, use your browser's CSS media emulation. In Chrome/Edge, open DevTools → Rendering → "Emulate CSS media feature" and select `prefers-color-scheme: dark`, `prefers-contrast: more`, or `prefers-reduced-motion: reduce`. This lets you verify every flavor looks right across all modes.
:::

## Flavor vs. Theme: What's the Difference?

Think of it like cooking:

- **Ingredients** (Layer 1) = raw pantry staples — colors, spacing, typography scales. Universal, no opinion.
- **Flavors** (Layer 2) = the chef's signature seasoning. Same ingredients, different personality.
- **Recipes** (Layer 3) = the plated dish. Component-specific tokens assembled from flavors, ready to serve.

A **flavor** is more than a color theme. It defines:

| What a Flavor Controls | Example                                                 |
| ---------------------- | ------------------------------------------------------- |
| Action colors          | Brown-600 vs Red-700 vs Green-600                       |
| Typography pairings    | Space Grotesk + Inter vs Cormorant + DM Sans            |
| Spacing rhythm         | Compact vs generous padding                             |
| Border radius          | Sharp (2px) vs rounded (8px) vs soft (12px)             |
| Animation timing       | Snappy (100ms) vs graceful (300ms) vs leisurely (500ms) |
| Elevation style        | Subtle vs prominent shadows                             |
| Interaction feedback   | Aggressive press scale vs gentle subtle scale           |

## How Flavors Work Under the Hood

Flavors reference **ingredients only**, never recipes or other flavors. This keeps the architecture clean and predictable:

```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": {
            "value": "{color.green.600.value}",
            "type": "color"
          }
        }
      }
    },
    "background": {
      "base": {
        "value": "{color.neutralWarm.50.value}",
        "type": "color"
      }
    }
  }
}
```

Style Dictionary compiles these references into CSS custom properties that components consume. Components never know which flavor is active — they just use semantic tokens like `--sando-color-action-solid-background-default`.

## Token Categories

Every flavor defines tokens across these semantic categories:

### Background Colors

```css
--sando-color-background-base        /* Page background */
--sando-color-background-surface     /* Card/panel background */
--sando-color-background-raised      /* Elevated surfaces */
--sando-color-background-overlay     /* Modal overlay */
--sando-color-background-emphasis    /* Highlighted areas */
```

### Text Colors

```css
--sando-color-text-heading   /* Headings */
--sando-color-text-body      /* Body text */
--sando-color-text-caption   /* Captions, labels */
--sando-color-text-muted     /* De-emphasized text */
--sando-color-text-link-*    /* Link states (default, hover, active, visited) */
--sando-color-text-on-solid  /* Text on solid-colored backgrounds */
```

### Action Colors

```css
/* Solid variant */
--sando-color-action-solid-background-default
--sando-color-action-solid-background-hover
--sando-color-action-solid-text-default

/* Outline variant */
--sando-color-action-outline-border-default
--sando-color-action-outline-text-default

/* Ghost variant */
--sando-color-action-ghost-background-hover
--sando-color-action-ghost-text-default

/* Disabled state */
--sando-color-action-disabled-background
--sando-color-action-disabled-text
```

### State Colors

```css
--sando-color-state-success-*      /* Confirmations, completed actions */
--sando-color-state-destructive-*  /* Errors, destructive actions */
--sando-color-state-warning-*      /* Cautions, non-critical issues */
--sando-color-state-info-*         /* Helpful information, tips */
```

### Border, Focus, and More

```css
--sando-color-border-default       /* Default borders */
--sando-color-border-emphasis      /* Emphasized borders */
--sando-color-focus-ring           /* Focus indicator color */
--sando-font-family-heading        /* Heading typeface */
--sando-font-family-body           /* Body typeface */
--sando-border-radius-default      /* Default corner radius */
--sando-animation-duration-normal  /* Standard animation speed */
```

## Creating a Custom Flavor

Want to tell your own brand story? Create a new flavor file in `packages/tokens/src/flavors/`:

```json
// packages/tokens/src/flavors/lavender/flavor.json
{
  "$description": "Lavender flavor - Calm and creative.",
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.purple.600.value}", "type": "color" },
          "hover": { "value": "{color.purple.700.value}", "type": "color" }
        },
        "text": {
          "default": { "value": "{color.utility.white.value}", "type": "color" }
        }
      }
    },
    "background": {
      "base": { "value": "{color.neutralWarm.50.value}", "type": "color" }
    },
    "text": {
      "body": { "value": "{color.neutralWarm.800.value}", "type": "color" }
    }
  }
}
```

Then build and use:

```bash
pnpm build
```

```html
<body flavor="lavender">
  <sando-button variant="solid">Lavender Button</sando-button>
</body>
```

::: details Full Custom Flavor Checklist
A complete custom flavor should define tokens for all semantic categories. Use an existing flavor like `original` as a template — copy its `flavor.json` and replace the color palette references with your own.

For full mode support, also create:

- `flavor-dark.json` — dark mode overrides
- `flavor-high-contrast.json` — high contrast overrides
- `flavor-forced-colors.json` — forced colors overrides
- `flavor-motion-reduce.json` — motion reduce overrides
  :::

## Best Practices

### ✅ DO

- **Use `flavor` for brand identity** — it's the right abstraction level
- **Reference ingredients only** — flavors map semantic roles to primitive tokens
- **Use semantic names** — `background-interactive`, not `color-blue`
- **Maintain consistency** — all flavors should define the same token categories
- **Test all modes** — verify your flavor works in light, dark, and high contrast

### ❌ DON'T

- **Reference other flavors** — flavors are independent, never cross-reference
- **Use hard-coded values** — always reference ingredient tokens
- **Skip accessibility testing** — every flavor must meet WCAG AA contrast ratios
- **Create too many flavors** — 2-3 is usually enough for a project; each one is a full design language

## Next Steps

- **[Theming Guide](/getting-started/theming)** — Learn how to apply flavors and customize your theme
- **[Ingredients](/tokens/ingredients)** — Explore the primitive tokens that flavors are built from
- **[Recipes](/tokens/recipes)** — See how components consume flavor tokens
- **[Accessibility](/guides/accessibility)** — Understand how modes ensure WCAG compliance
