# Recipes (Component Tokens)

Component-specific tokens that reference semantic flavors.

## Overview

Recipes are the top layer of the token system. They are consumed directly by components and reference **flavors only**, never ingredients.

## Structure

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

## Button Tokens

### Variants

- **Solid**: Filled background
- **Outline**: Border with transparent background
- **Ghost**: Text only, no background or border

### States

- `default` - Normal state
- `hover` - Mouse hover
- `active` - Click/press
- `focus` - Keyboard focus
- `disabled` - Non-interactive

### Sizes

- `small` - Compact button
- `medium` - Default size
- `large` - Prominent button

[View button recipe →](https://github.com/yourusername/sando-design-system/blob/master/packages/tokens/src/recipes/button.json)

## Using Recipes in Components

```css
/* Lit component */
.button--solid {
  background-color: var(--sando-button-solid-backgroundColor-default);
  color: var(--sando-button-solid-textColor-default);
  padding: var(--sando-button-size-medium-paddingBlock)
    var(--sando-button-size-medium-paddingInline);
}

.button--solid:hover {
  background-color: var(--sando-button-solid-backgroundColor-hover);
}
```

## All Available Recipes

| Component  | Recipe File   | Tokens                        |
| ---------- | ------------- | ----------------------------- |
| **Button** | `button.json` | Variants, sizes, states       |
| **Card**   | Coming soon   | Padding, borders, backgrounds |
| **Input**  | Coming soon   | Borders, focus, validation    |

## Creating a New Recipe

1. Create file in `packages/tokens/src/recipes/`
2. Reference flavors only:

```json
{
  "myComponent": {
    "backgroundColor": {
      "value": "{color.background.surface.value}",
      "type": "color"
    },
    "padding": {
      "value": "{spacing.comfortable.value}",
      "type": "dimension"
    }
  }
}
```

3. Build and test:

```bash
pnpm build
pnpm test
```

## Best Practices

### ✅ DO

- Reference flavors only
- Use component-specific names
- Include all component states

### ❌ DON'T

- Reference ingredients directly
- Create generic tokens (use flavors instead)

## Next Steps

- **[Token Architecture](/tokens/architecture)** - Understand the system
- **[Component API](/components/button)** - Use tokens in components
