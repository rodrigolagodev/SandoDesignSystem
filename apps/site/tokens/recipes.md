---
title: Recipes (Component Tokens)
description: Component-level design tokens that reference flavors and power every Sando component's visual styling
---

# Recipes (Component Tokens)

The final dish, plated and ready to serve. Recipes are the top layer of the token system — consumed directly by components. They reference **flavors only**, never ingredients. This is what makes theming work: swap a flavor, and every recipe updates automatically.

## How Recipes Fit the System

```
Ingredients → Flavors → Recipes → Components
                        (you are here)
```

Recipes answer the question: _"What does this specific part of this specific component look like in this specific state?"_

## Token Naming Pattern

Every recipe token follows a predictable convention:

```
--sando-{component}-{variant}-{property}-{state}
```

**Examples:**

```css
--sando-button-solid-backgroundColor-default
--sando-button-outline-borderColor-hover
--sando-checkbox-solid-backgroundColor-checked
--sando-input-outlined-borderColor-focus
--sando-badge-neutral-solid-backgroundColor
```

## All 18 Recipes

Sando provides recipe tokens for every component in the system, organized by category.

### Form Controls

#### Button

Three visual variants (solid, outline, ghost) with full state coverage.

```json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": { "value": "{color.action.solid.background.default.value}" },
        "hover": { "value": "{color.action.solid.background.hover.value}" },
        "active": { "value": "{color.action.solid.background.hover.value}" },
        "disabled": { "value": "{color.action.disabled.background.value}" }
      },
      "textColor": {
        "default": { "value": "{color.action.solid.text.default.value}" },
        "disabled": { "value": "{color.action.disabled.text.value}" }
      }
    },
    "outline": {
      /* borderColor, textColor, backgroundColor for all states */
    },
    "ghost": {
      /* textColor, backgroundColor for hover/active/disabled */
    }
  }
}
```

**CSS usage:**

```css
.button--solid {
  background-color: var(--sando-button-solid-backgroundColor-default);
  color: var(--sando-button-solid-textColor-default);
}

.button--solid:hover {
  background-color: var(--sando-button-solid-backgroundColor-hover);
}

.button--solid:disabled {
  background-color: var(--sando-button-solid-backgroundColor-disabled);
  color: var(--sando-button-solid-textColor-disabled);
}
```

[View button recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/button.json)

#### Input

Outlined variant with validation states for form feedback.

**States:** default, disabled, placeholder, hover, focus, error

[View input recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/input.json)

#### Textarea

Multi-line input tokens, following the same pattern as Input.

[View textarea recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/textarea.json)

#### Select

Dropdown selector tokens with outlined variant and full state coverage.

[View select recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/select.json)

#### Checkbox

Rich state model including checked, indeterminate, and error states.

```json
{
  "checkbox": {
    "solid": {
      "backgroundColor": {
        "default": { "value": "{color.background.raised.value}" },
        "hover": { "value": "{color.background.hover.value}" },
        "checked": { "value": "{color.action.solid.background.default.value}" },
        "checkedHover": {
          "value": "{color.action.solid.background.hover.value}"
        },
        "indeterminate": {
          "value": "{color.action.solid.background.default.value}"
        },
        "indeterminateHover": {
          "value": "{color.action.solid.background.hover.value}"
        },
        "disabled": { "value": "{color.action.disabled.background.value}" },
        "error": { "value": "{color.state.destructive.background.value}" }
      },
      "borderColor": {
        "default": { "value": "{color.border.default.value}" },
        "hover": { "value": "{color.border.emphasis.value}" },
        "focus": { "value": "{color.focus.ring.value}" },
        "checked": { "value": "{color.action.solid.background.default.value}" },
        "checkedHover": {
          "value": "{color.action.solid.background.hover.value}"
        },
        "disabled": { "value": "{color.action.disabled.border.value}" },
        "error": { "value": "{color.state.destructive.border.value}" }
      }
    }
  }
}
```

[View checkbox recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/checkbox.json)

#### Radio

Single selection control tokens, similar structure to checkbox.

[View radio recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/radio.json)

#### Radio Group

Container tokens for radio button groups.

[View radio-group recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/radio-group.json)

#### Option

Individual option item tokens for select menus.

[View option recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/option.json)

#### Option Group

Grouped option container tokens.

[View option-group recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/option-group.json)

#### Switch

Toggle control with track and thumb tokens.

**States:** default, hover, checked, checkedHover, disabled, error

[View switch recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/switch.json)

### Form Structure

#### Label

Sized label tokens for consistent form labeling.

**Sizes:** sm, md, lg — each with fontSize and lineHeight

[View label recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/label.json)

#### Form Group

Layout tokens for grouping label, control, and help text together.

[View form-group recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/form-group.json)

#### Help Text

Descriptive text tokens for form control context and error messages.

[View help-text recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/help-text.json)

### Feedback & Status

#### Spinner

Loading indicator tokens with 5 size variants.

**Sizes:** xs, sm, md, lg, xl

[View spinner recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/spinner.json)

#### Badge

Status indicator with semantic variants and 4 style options.

```json
{
  "badge": {
    "neutral": {
      "solid": {
        "backgroundColor": "...",
        "textColor": "...",
        "borderColor": "..."
      },
      "soft": {
        "backgroundColor": "...",
        "textColor": "...",
        "borderColor": "..."
      },
      "outline": {
        "backgroundColor": "...",
        "textColor": "...",
        "borderColor": "..."
      },
      "surface": {
        "backgroundColor": "...",
        "textColor": "...",
        "borderColor": "..."
      }
    }
    /* success, error, warning, info follow the same structure */
  }
}
```

**Semantic variants:** neutral, success, error, warning, info
**Style variants:** solid, soft, outline, surface

[View badge recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/badge.json)

#### Tag

Interactive label tokens with solid and outline variants.

**States:** default, hover, active, disabled

[View tag recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/tag.json)

### Media

#### Icon

Icon tokens with 5 size variants and color references.

**Sizes:** xs, sm, md, lg, xl

[View icon recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/icon.json)

### Loading

#### Skeleton

Loading placeholder tokens for color, animation, and border radius.

[View skeleton recipe →](https://github.com/rodrigolagodev/SandoDesignSystem/blob/main/packages/tokens/src/recipes/skeleton.json)

## How Recipes Reference Flavors

The key principle: recipes never contain raw values. They always reference flavor tokens using the `{path.to.value}` syntax:

```json
// ✅ CORRECT — Recipe references a flavor
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

```json
// ❌ WRONG — Recipe contains a raw value
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": {
          "value": "oklch(0.65 0.12 38)",
          "type": "color"
        }
      }
    }
  }
}
```

This indirection is what makes theming work. When you switch from the Original flavor to Strawberry, the flavor token `{color.action.solid.background.default.value}` resolves to a different ingredient — and every recipe that references it updates automatically.

## Using Recipes in Components

Inside a Lit component, recipe tokens become CSS custom properties:

```css
/* Button component styles */
:host([variant="solid"]) .button {
  background-color: var(--sando-button-solid-backgroundColor-default);
  color: var(--sando-button-solid-textColor-default);
  border: var(--sando-border-width-50) solid transparent;
  border-radius: var(--sando-button-borderRadius);
}

:host([variant="solid"]) .button:hover {
  background-color: var(--sando-button-solid-backgroundColor-hover);
}

:host([variant="solid"]) .button:disabled {
  background-color: var(--sando-button-solid-backgroundColor-disabled);
  color: var(--sando-button-solid-textColor-disabled);
}
```

## Customizing Recipes

Override any recipe token from the outside to customize a specific component:

```css
/* Make all solid buttons green */
sando-button {
  --sando-button-solid-backgroundColor-default: oklch(0.65 0.1 145);
  --sando-button-solid-backgroundColor-hover: oklch(0.56 0.1 145);
}
```

::: tip
Recipe tokens give you surgical control over individual component states. For broader changes, consider creating a custom flavor instead.
:::

## Creating a New Recipe

1. Create a JSON file in `packages/tokens/src/recipes/{component}.json`
2. Reference flavor tokens only — never raw values
3. Cover all visual variants and interactive states
4. Build and test: `pnpm build && pnpm test`

```json
{
  "myComponent": {
    "backgroundColor": {
      "default": {
        "value": "{color.background.surface.value}",
        "type": "color"
      },
      "hover": {
        "value": "{color.background.hover.value}",
        "type": "color"
      }
    },
    "textColor": {
      "default": {
        "value": "{color.text.body.value}",
        "type": "color"
      }
    },
    "borderColor": {
      "default": {
        "value": "{color.border.default.value}",
        "type": "color"
      }
    }
  }
}
```

## Best Practices

**DO:**

- Reference flavor tokens only — never ingredients directly
- Use component-specific token names (`button.solid.backgroundColor`, not `primary-bg`)
- Include all interactive states (default, hover, active, focus, disabled)
- Include validation states where applicable (error, success)
- Follow the naming convention: `{component}-{variant}-{property}-{state}`

**DON'T:**

- Put raw color values in recipes
- Create generic tokens (that's what flavors are for)
- Skip disabled states — they're essential for accessibility
- Forget to test with multiple flavors after creating a recipe

## Next Steps

- **[Ingredients](/tokens/ingredients)** — The raw values recipes ultimately resolve to
- **[Flavors](/tokens/flavors)** — The semantic layer recipes reference
- **[Token Architecture](/tokens/architecture)** — Understand the full three-layer system
- **[Components Overview](/components/overview)** — See recipes in action inside components
