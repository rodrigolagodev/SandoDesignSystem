---
title: Theming & Customization
description: Learn how to apply flavors, switch color modes, and customize Sando Design System to match your brand — all through the three-layer token architecture.
---

# Theming & Customization

Theming in Sando works like seasoning a dish: you start with quality ingredients, pick a flavor profile, and adjust to taste. The three-layer token architecture — Ingredients, Flavors, Recipes — gives you full control over your UI's identity without touching a single component.

## Two Independent Controls

Sando separates visual identity into two orthogonal concepts:

| Concept        | What It Controls      | How You Set It                     | Example                             |
| -------------- | --------------------- | ---------------------------------- | ----------------------------------- |
| **Flavor**     | Brand identity        | `flavor` attribute on any element  | `flavor="strawberry"`               |
| **Color Mode** | Accessibility variant | Automatic via CSS `@media` queries | Dark, high contrast, reduced motion |

::: warning Flavor ≠ Color Mode
**Flavors** define _what_ your brand looks like — colors, typography, spacing, animation. **Color modes** define _how_ that brand adapts to user accessibility preferences — dark backgrounds, maximum contrast, no motion. They're completely independent: every flavor works in every mode.
:::

## Applying a Flavor

Set the `flavor` attribute on any HTML element. Every Sando component inside it will adopt that flavor's identity:

```html
<!-- Apply flavor at the page level -->
<body flavor="kiwi">
  <sando-button variant="solid">Kiwi Button</sando-button>
</body>
```

Sando ships with **6 curated flavors**:

| Flavor            | Primary    | Personality                | Best For                               |
| ----------------- | ---------- | -------------------------- | -------------------------------------- |
| 🍱 **sando**      | Brown      | Warm, crafted, artisanal   | Official brand, design system docs     |
| 🍞 **original**   | Orange     | Clean, modern, versatile   | SaaS, tech products, content sites     |
| 🍓 **strawberry** | Red (rose) | Elegant, romantic, premium | Fashion, luxury, editorial             |
| 🍖 **tonkatsu**   | Brown      | Bold, rugged, handcrafted  | Craft brands, artisan, food & beverage |
| 🥝 **kiwi**       | Green      | Serene, natural, fresh     | Wellness, sustainability, eco brands   |
| 🥚 **egg-salad**  | Yellow     | Cheerful, warm, inviting   | Breakfast brands, creative, education  |

::: tip Explore All 6 Flavors
Each flavor defines far more than colors — typography pairings, border radius, animation timing, and spacing rhythm are all included. See the **[Flavors reference](/tokens/flavors)** for the complete breakdown.
:::

### Scoped Flavors

You can scope different flavors to different sections of your page. Like serving different sandwiches at the same table:

```html
<body flavor="original">
  <header>
    <!-- Uses Original flavor -->
    <sando-button variant="solid">Original Action</sando-button>
  </header>

  <section flavor="strawberry">
    <!-- Uses Strawberry flavor in this section only -->
    <sando-button variant="solid">Strawberry Action</sando-button>
  </section>

  <aside flavor="kiwi">
    <!-- Uses Kiwi flavor here -->
    <sando-button variant="outline">Kiwi Outline</sando-button>
  </aside>
</body>
```

## Color Modes: Automatic Accessibility

Sando detects user system preferences via CSS `@media` queries and adapts automatically. No JavaScript required.

Every flavor ships with **5 mode variants**:

| Mode              | CSS Media Query                           | What Changes                         |
| ----------------- | ----------------------------------------- | ------------------------------------ |
| **Light**         | Default                                   | Standard light palette               |
| **Dark**          | `@media (prefers-color-scheme: dark)`     | Inverted palette for low-light       |
| **High Contrast** | `@media (prefers-contrast: more)`         | Maximum contrast, WCAG AAA           |
| **Forced Colors** | `@media (forced-colors: active)`          | Windows High Contrast system colors  |
| **Motion Reduce** | `@media (prefers-reduced-motion: reduce)` | All animation durations set to `0ms` |

```html
<!-- You pick the flavor, the system handles the mode -->
<body flavor="tonkatsu">
  <!-- User has dark mode enabled? Colors adapt automatically. -->
  <!-- User prefers reduced motion? Animations stop automatically. -->
  <sando-button variant="solid">Always Accessible</sando-button>
</body>
```

::: info Modes Are Automatic
Color modes respond to the user's operating system settings. This ensures accessibility preferences are always honored — users with high contrast needs or motion sensitivity get the right experience without any manual configuration.
:::

### Testing Modes in Browser DevTools

You don't need any special attributes to test different modes — just use your browser's built-in emulation.

**Chrome/Edge:**

1. Open DevTools → Rendering tab
2. Scroll to "Emulate CSS media feature"
3. Select the preference to test:
   - `prefers-color-scheme: dark`
   - `prefers-contrast: more`
   - `prefers-reduced-motion: reduce`
   - `forced-colors: active`

**Firefox:**

1. Open DevTools → Accessibility tab
2. Use the simulation controls for dark theme, high contrast, and reduced motion

### Programmatic Detection

```ts
// Check current system preferences
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const prefersHighContrast = window.matchMedia(
  "(prefers-contrast: more)",
).matches;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Listen for changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    console.log("Dark mode:", e.matches);
  });
```

## Customizing with CSS Custom Properties

Every Sando token is a CSS custom property you can override. This is your escape hatch — like adding your own secret sauce to a proven recipe.

### Per-Component Overrides

Override specific Recipe tokens (Layer 3) without changing the flavor:

```css
/* Custom button styling using OKLCH */
.my-special-button {
  --sando-button-solid-backgroundColor-default: oklch(0.56 0.11 230);
  --sando-button-solid-backgroundColor-hover: oklch(0.47 0.1 230);
  --sando-button-solid-textColor-default: oklch(1 0 0);
}
```

```html
<sando-button class="my-special-button" variant="solid">
  Custom Blue Button
</sando-button>
```

### Global Token Overrides

Override Flavor tokens (Layer 2) at the page level to adjust an entire flavor's personality:

```css
/* Override the Kiwi flavor's primary action color */
[flavor="kiwi"] {
  --sando-color-action-solid-background-default: oklch(0.47 0.09 145);
  --sando-color-action-solid-background-hover: oklch(0.38 0.07 145);
  --sando-color-focus-ring: oklch(0.47 0.09 145);
}
```

### Token Override Hierarchy

Sando tokens cascade like CSS itself — specificity wins:

```
Ingredients (raw values)
  └── Flavors (semantic mapping)
        └── Your CSS overrides (highest priority)
```

::: tip Override, Don't Replace
When customizing, override individual tokens rather than rebuilding from scratch. This preserves the accessibility guarantees (contrast ratios, focus visibility) built into each flavor. If you override colors, verify contrast with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
:::

## Semantic Token Categories

Every flavor defines tokens across these semantic categories. When overriding, you'll work with these:

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
--sando-color-text-heading           /* Headings */
--sando-color-text-body              /* Body text */
--sando-color-text-caption           /* Captions, labels */
--sando-color-text-muted             /* De-emphasized text */
--sando-color-text-link-default      /* Link default state */
--sando-color-text-on-solid          /* Text on solid backgrounds */
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
--sando-color-state-success-*        /* Confirmations, completed */
--sando-color-state-destructive-*    /* Errors, danger */
--sando-color-state-warning-*        /* Cautions */
--sando-color-state-info-*           /* Helpful information */
```

### Border, Focus, Typography, and More

```css
--sando-color-border-default         /* Default borders */
--sando-color-border-emphasis        /* Emphasized borders */
--sando-color-focus-ring             /* Focus indicator color */
--sando-font-family-heading          /* Heading typeface */
--sando-font-family-body             /* Body typeface */
--sando-border-radius-default        /* Default corner radius */
--sando-animation-duration-normal    /* Standard animation speed */
```

## Creating a Custom Flavor

If the 6 built-in flavors don't match your brand, create your own. Use an existing flavor as a template — the `original` flavor is a clean starting point.

### Step 1: Create the Flavor Directory

```bash
mkdir packages/tokens/src/flavors/lavender
```

### Step 2: Define Your Flavor Tokens

```json
// packages/tokens/src/flavors/lavender/flavor.json
{
  "$description": "Lavender flavor - Calm, creative, contemplative.",
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
      "body": { "value": "{color.neutralWarm.800.value}", "type": "color" },
      "heading": { "value": "{color.neutralWarm.950.value}", "type": "color" }
    },
    "focus": {
      "ring": { "value": "{color.purple.500.value}", "type": "color" }
    }
  }
}
```

::: tip Reference Ingredients Only
Flavors should only reference Ingredient tokens (Layer 1) — never other flavors or recipes. This keeps the architecture clean: `{color.purple.600.value}` ✅, not `{sando.color.action.solid.background.value}` ❌.
:::

### Step 3: Add Mode Variants

For full accessibility support, create mode-specific override files:

- `flavor-dark.json` — dark mode overrides
- `flavor-high-contrast.json` — high contrast overrides
- `flavor-forced-colors.json` — forced colors overrides
- `flavor-motion-reduce.json` — motion reduce overrides

::: details Full Custom Flavor Checklist
Copy a complete flavor directory (like `original/`) for a full template with all mode variants. Each file only needs to override the tokens that change for that mode — the base `flavor.json` values are used as defaults.
:::

### Step 4: Build and Use

```bash
pnpm build
```

```html
<body flavor="lavender">
  <sando-button variant="solid">Lavender Button</sando-button>
</body>
```

## Accessibility Compliance Across Modes

All 6 built-in flavors meet these contrast standards in every mode:

| Mode          | WCAG Level | Min Contrast | Notes               |
| ------------- | ---------- | ------------ | ------------------- |
| Light         | AA         | 4.5:1        | Standard compliance |
| Dark          | AA         | 4.5:1        | Inverted palette    |
| High Contrast | AAA        | 7:1          | Maximum readability |
| Forced Colors | System     | System       | User-defined colors |

::: warning Custom Flavor Responsibility
When creating custom flavors, you're responsible for verifying contrast ratios across all modes. Use the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to validate your color pairings meet WCAG AA minimums (4.5:1 for normal text, 3:1 for large text and UI components).
:::

## Best Practices

### ✅ DO

- **Use `flavor` for brand identity** — one attribute, total transformation
- **Let modes be automatic** — system preferences ensure the right experience for every user
- **Override tokens, not components** — CSS custom properties are your customization API
- **Test all modes** — verify your UI works in light, dark, high contrast, and reduced motion
- **Use semantic tokens** — `--sando-color-action-solid-background-default`, not `--sando-color-brown-600`

### ❌ DON'T

- **Hard-code colors** — always reference tokens for automatic theme adaptation
- **Override modes in production** — let the system respect user accessibility preferences
- **Skip contrast testing** — custom overrides can break accessibility guarantees
- **Mix flavor references** — flavors reference ingredients only, never other flavors
- **Assume light mode** — many users prefer dark mode by default

## Next Steps

- **[Flavors Reference](/tokens/flavors)** — Explore all 6 flavors in detail
- **[Ingredients](/tokens/ingredients)** — Understand the primitive tokens flavors are built from
- **[Recipes](/tokens/recipes)** — See how components consume flavor tokens
- **[Accessibility Guide](/guides/accessibility)** — Deep dive into WCAG compliance and accessibility modes
