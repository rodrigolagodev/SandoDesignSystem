# Flavors (Semantic Tokens)

Semantic tokens that give meaning and context to primitive ingredients.

::: info Current Status
Currently, only the `original` flavor is implemented. Additional flavor files (dark, custom themes) are planned for future releases.
:::

## Overview

Flavors are the middle layer of the token system. They transform raw ingredients into meaningful, contextual tokens that can be used to create different themes.

## Why Flavors?

Flavors enable **theming** without changing components or ingredients:

```
Same Ingredients + Different Flavors = Different Themes
```

## Structure

Flavors reference **ingredients only**, never recipes or other flavors.

```json
{
  "color": {
    "background": {
      "base": {
        "value": "{color.neutral.50.value}",  // References ingredient
        "type": "color"
      }
    }
  }
}
```

## Available Flavors

### Original (Default) ✅

The default light theme - **currently available**.

```css
/* Light backgrounds */
--sando-color-background-base: var(--sando-color-neutral-100)
--sando-color-text-body: var(--sando-color-neutral-900)
```

[View original flavor →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/flavors/original.json)

### Future Flavors (Planned)

**Dark Mode** 🚧

Dark theme for low-light environments (coming soon).

```css
/* Planned dark theme */
--sando-color-background-base: var(--sando-color-neutral-900)
--sando-color-text-body: var(--sando-color-neutral-100)
```

**Custom Themes** 🚧

Create your own branded flavors (guide coming soon).

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

Create a new file in `packages/tokens/src/flavors/`:

```json
// mint.json
{
  "color": {
    "background": {
      "base": {
        "value": "{color.green.50.value}",
        "type": "color"
      }
    },
    "text": {
      "body": {
        "value": "{color.green.900.value}",
        "type": "color"
      }
    },
    "action": {
      "solid": {
        "background": {
          "default": {
            "value": "{color.green.600.value}",
            "type": "color"
          },
          "hover": {
            "value": "{color.green.700.value}",
            "type": "color"
          }
        }
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
<div flavor="mint">
  <sando-button variant="solid">Mint Button</sando-button>
</div>
```

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
