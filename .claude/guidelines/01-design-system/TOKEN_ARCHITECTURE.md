# Token Architecture

**Category**: 01-design-system
**Version**: 2.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: Design System Architect

---

## Purpose

Defines the **three-layer token architecture** (Ingredients → Flavors → Recipes) that enables strict separation of concerns, unlimited theming flexibility, and system scalability. This is the MOST CRITICAL architectural pattern—violations break theming.

---

## Core Rules

### Rule 1: Strict Layer References (Non-Negotiable)

**Each layer references ONLY the layer directly below it**. This one-way flow is enforced by automated tests.

**Pattern**:
```
Components → Recipes (Layer 3) → Flavors (Layer 2) → Ingredients (Layer 1) → Absolute values
```

**Critical Rules**:
- ✅ **Ingredients**: Absolute values ONLY (no `{...}` references)
- ✅ **Flavors**: Reference ONLY Ingredients: `{color.orange.700.value}`
- ✅ **Recipes**: Reference ONLY Flavors: `{color.action.solid.background.default.value}`
- ✅ **Components**: Use ONLY Recipe CSS variables: `var(--sando-button-solid-backgroundColor-default)`

**Anti-patterns**:
```json
// ❌ Recipe skipping Flavors layer
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": { "value": "{color.orange.700.value}" }  // Recipe → Ingredient (WRONG)
      }
    }
  }
}

// ❌ Flavor referencing another Flavor
{
  "color": {
    "text": {
      "link": {
        "value": "{color.action.solid.background.default.value}"  // Flavor → Flavor (WRONG)
      }
    }
  }
}
```

**Why This Matters**: Violations break theming (can't swap colors), lose semantic meaning, and create circular dependencies.

---

### Rule 2: When to Create New Tokens

**Decision Tree**:

**Create NEW Ingredient if**:
- ✅ Need absolute value not in existing scale
- ✅ Example: New color hue, spacing value outside 0-64

**Create NEW Flavor if**:
- ✅ Need new semantic meaning/use context
- ✅ Example: `color.sidebar.background` (new use case not covered by `color.background.surface`)

**Create NEW Recipe if**:
- ✅ Building a new component
- ✅ Example: `datepicker.json` for DatePicker component

**REUSE existing token if**:
- ✅ Value exists in scale
- ✅ Semantic meaning already defined
- ✅ Can use generic Flavor pattern

**Anti-pattern**:
```json
// ❌ Too specific - should use existing Flavor
{
  "color": {
    "button-primary-blue": { ... }  // WRONG - too specific, not reusable
  }
}

// ✅ Correct - use existing semantic Flavor
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": { "value": "{color.action.solid.background.default.value}" }
      }
    }
  }
}
```

---

### Rule 3: CSS Variable Naming Convention

**Pattern**: `--sando-{category}-{property}-{variant?}-{state?}`

**Rules**:
1. Always kebab-case
2. Include variant if property is variant-specific
3. Include state if property is state-specific
4. Order: variant before state

**Examples**:
```css
/* Ingredients */
--sando-color-orange-500
--sando-space-4

/* Flavors */
--sando-color-action-solid-background-default
--sando-space-inset-md

/* Recipes */
--sando-button-solid-backgroundColor-default
--sando-button-solid-backgroundColor-hover
--sando-button-size-md-paddingInline
```

**Anti-patterns**:
```css
/* ❌ Wrong order */
--sando-button-hover-solid-backgroundColor  /* state before variant */

/* ❌ Not kebab-case */
--sandoButtonSolidBg

/* ❌ Missing category */
--sando-orange-500  /* should be --sando-color-orange-500 */
```

---

### Rule 4: Flavors vs Modes Distinction

**CRITICAL**: Flavors and Modes are fundamentally different concepts.

**Flavors** (Manual brand themes):
- Selected via `flavor="name"` attribute
- Examples: `original`, `strawberry`, `midnight`
- **Developer chooses** which flavor to apply
- Created by adding Flavor files: `src/flavors/{name}/flavor.json`

**Modes** (Automatic accessibility):
- Activated via `@media` queries (user's system preference)
- Examples: `dark`, `high-contrast`, `motion-reduce`
- **User's system** determines which mode is active
- Created by adding mode files: `flavor-dark.json`, `flavor-high-contrast.json`

**Pattern**:
```html
<!-- ✅ Correct: Flavor selection -->
<div flavor="original">Theme with orange actions</div>
<div flavor="strawberry">Theme with pink actions</div>

<!-- ❌ WRONG: Dark is a MODE, not a flavor -->
<div flavor="dark">This doesn't work!</div>

<!-- ✅ Correct: Dark mode is automatic -->
<div flavor="original">
  <!-- Automatically switches to dark when user has prefers-color-scheme: dark -->
</div>
```

**Why This Matters**: Confusing Flavors with Modes breaks accessibility. Dark mode MUST respond to `prefers-color-scheme`, not manual selection.

See [THEMING_STRATEGY.md](THEMING_STRATEGY.md) for complete Flavors vs Modes explanation.

---

### Rule 5: Semantic Meaning Over Values

**Flavors provide semantic meaning** (use context), not value descriptions.

**Pattern**:
```json
// ✅ Good - describes USE CONTEXT
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.orange.700.value}" }
        }
      }
    }
  }
}

// ❌ Bad - describes VALUE
{
  "color": {
    "brand": {
      "primary": { "value": "{color.orange.700.value}" }  // What is "primary" used for?
    }
  }
}
```

**Why This Matters**: Semantic naming enables brand-agnostic design. `color.action.solid.background` can map to ANY color—orange, purple, blue—without changing component code.

---

## Three-Layer Architecture (Complete)

This section is the DEFINITIVE source for the three-layer system. Other guidelines reference this.

### Layer 1: Ingredients (Primitives)

**Definition**: Raw, absolute values with NO references. Brand-agnostic primitives.

**Location**: `packages/tokens/src/ingredients/*.json`

**File Structure**:
```
src/ingredients/
├── color.json          # 15 colors × 11 steps = 165 tokens
├── space.json          # 0-64 (multiples of 4px)
├── font.json           # Families, sizes, weights, line heights
├── border.json         # Radius, widths
├── elevation.json      # Shadow scales
├── animation.json      # Duration, easing
├── opacity.json        # Opacity values
└── z-index.json        # Z-index layers
```

**Naming**: `{category}-{property}-{scale}`

**Examples**:
- `color-orange-700` = `"oklch(0.47 0.20 25)"`
- `space-4` = `"1rem"` (16px)
- `font-size-300` = `"1.125rem"` (18px)

**Pattern**:
```json
{
  "color": {
    "orange": {
      "500": { "value": "oklch(0.64 0.20 25)", "type": "color" },
      "700": { "value": "oklch(0.47 0.20 25)", "type": "color" }
    }
  },
  "space": {
    "4": { "value": "1rem", "type": "dimension" }
  }
}
```

**Rules**:
- ✅ MUST contain only absolute values
- ❌ NEVER reference other tokens
- ✅ MUST be brand-agnostic (no "primary", "brand")
- ✅ SHOULD follow algorithmic generation

See [COLOR_SYSTEM.md](COLOR_SYSTEM.md), [SPACING_SYSTEM.md](SPACING_SYSTEM.md) for complete Ingredient specifications.

---

### Layer 2: Flavors (Semantic)

**Definition**: Semantic tokens that reference ONLY Ingredients. Enable theming.

**Location**: `packages/tokens/src/flavors/{flavor-name}/`

**File Structure** (per Flavor):
```
src/flavors/original/
├── flavor.json                  # Base (light mode)
├── flavor-dark.json             # Dark mode overrides
├── flavor-high-contrast.json    # High contrast overrides
├── flavor-forced-colors.json    # Forced colors mode
└── flavor-motion-reduce.json    # Reduced motion overrides
```

**Naming**: `{category}-{element}-{modifier}-{state}`

**Examples**:
- `color-action-solid-background-default`
- `color-text-body`
- `space-inset-md`

**Pattern** (Base Flavor):
```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.orange.700.value}", "type": "color" },
          "hover": { "value": "{color.orange.800.value}", "type": "color" }
        },
        "text": {
          "default": { "value": "{color.neutral-warm.50.value}", "type": "color" }
        }
      }
    },
    "text": {
      "body": { "value": "{color.neutral-warm.800.value}", "type": "color" }
    }
  }
}
```

**Pattern** (Dark Mode Override):
```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.orange.600.value}", "type": "color" }
        }
      }
    },
    "text": {
      "body": { "value": "{color.neutral-warm.200.value}", "type": "color" }
    }
  }
}
```

**Rules**:
- ✅ MUST reference ONLY Ingredients: `{color.orange.700.value}`
- ❌ NEVER reference other Flavors or Recipes
- ❌ NEVER contain absolute values (except mode overrides for special cases)
- ✅ MUST provide semantic context
- ✅ MUST have base `flavor.json`
- ✅ MAY have mode files with ONLY overrides

---

### Layer 3: Recipes (Component-Specific)

**Definition**: Component-specific tokens that reference ONLY Flavors. One file per component.

**Location**: `packages/tokens/src/recipes/*.json`

**File Structure**:
```
src/recipes/
├── button.json         # Button tokens
├── input.json          # Input tokens
├── card.json           # Card tokens
└── modal.json          # Modal tokens
```

**Naming**: `{component}-{variant}-{property}-{state}`

**Examples**:
- `button-solid-backgroundColor-default`
- `button-solid-backgroundColor-hover`
- `input-borderColor-error`

**Pattern**:
```json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": { "value": "{color.action.solid.background.default.value}", "type": "color" },
        "hover": { "value": "{color.action.solid.background.hover.value}", "type": "color" },
        "active": { "value": "{color.action.solid.background.active.value}", "type": "color" },
        "disabled": { "value": "{color.action.solid.background.disabled.value}", "type": "color" }
      },
      "textColor": {
        "default": { "value": "{color.action.solid.text.default.value}", "type": "color" }
      }
    },
    "size": {
      "md": {
        "paddingInline": { "value": "{space.inset.md.value}", "type": "dimension" },
        "paddingBlock": { "value": "{space.inset.sm.value}", "type": "dimension" },
        "minHeight": { "value": "{sizing.control.md.value}", "type": "dimension" }
      }
    }
  }
}
```

**Rules**:
- ✅ MUST reference ONLY Flavors: `{color.action.solid.background.default.value}`
- ❌ NEVER reference Ingredients directly
- ❌ NEVER reference other Recipes
- ✅ MUST have one file per component
- ✅ SHOULD group by variant (solid, outline, ghost)
- ✅ SHOULD include all states (default, hover, active, focus, disabled)

---

## Complete Token Flow Example

**Scenario**: Button component with solid variant

```json
// 1. INGREDIENT (Layer 1) - Absolute value
// File: src/ingredients/color.json
{
  "color": {
    "orange": {
      "700": {
        "value": "oklch(0.47 0.20 25)",  // ← Absolute OKLCH color
        "type": "color"
      }
    }
  }
}

// 2. FLAVOR (Layer 2) - Semantic meaning
// File: src/flavors/original/flavor.json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": {
            "value": "{color.orange.700.value}",  // ← References Ingredient
            "type": "color",
            "description": "Primary action button background"
          }
        }
      }
    }
  }
}

// 3. RECIPE (Layer 3) - Component-specific
// File: src/recipes/button.json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": {
          "value": "{color.action.solid.background.default.value}",  // ← References Flavor
          "type": "color"
        }
      }
    }
  }
}

// 4. COMPONENT - Uses Recipe token
// File: packages/components/src/components/button/sando-button.ts
import { css } from 'lit';

static styles = css`
  .button--solid {
    background: var(--sando-button-solid-backgroundColor-default);  // ← Uses Recipe CSS var
  }
`;
```

**CSS Output** (build generates):
```css
/* Layer 1: Ingredient */
--sando-color-orange-700: oklch(0.47 0.20 25);

/* Layer 2: Flavor */
--sando-color-action-solid-background-default: var(--sando-color-orange-700);

/* Layer 3: Recipe */
--sando-button-solid-backgroundColor-default: var(--sando-color-action-solid-background-default);
```

**Result**: Component uses `--sando-button-solid-backgroundColor-default`, which resolves through all layers to the final OKLCH color.

**This pattern applies to**: All components (Cards, Inputs, Modals, etc.)

**Special cases**: See individual guidelines for domain-specific patterns:
- Colors: [COLOR_SYSTEM.md](COLOR_SYSTEM.md)
- Spacing: [SPACING_SYSTEM.md](SPACING_SYSTEM.md)
- Typography: [TYPOGRAPHY_SYSTEM.md](TYPOGRAPHY_SYSTEM.md)

---

## Build System

The token build uses **Style Dictionary 4.0.0** with custom orchestrator.

**Build Flow**:
```
1. Read source files (ingredients, flavors, recipes)
2. Validate references (automated tests enforce layer rules)
3. Transform (add --sando- prefix, convert {refs} to var())
4. Generate output (CSS + TypeScript)
5. Validate output (check for broken references)
```

**Build Commands**:
```bash
pnpm tokens:build           # Build all tokens
pnpm tokens:build --force   # Bypass cache
pnpm tokens:dev             # Watch mode (rebuild on changes)
```

**Output Structure**:
```
dist/sando-tokens/
├── css/
│   ├── ingredients/ingredients.css
│   ├── flavors/original/flavor.css
│   ├── flavors/original/flavor-dark.css     # Wrapped in @media (prefers-color-scheme: dark)
│   └── recipes/button.css
└── ts/
    ├── ingredients/index.ts
    ├── flavors/original.ts
    └── recipes/button.ts
```

**Cache**: `.build-cache.json` - Incremental builds (skip unchanged layers)

---

## Validation Checklist

### Ingredients Layer
- [ ] All files in `src/ingredients/*.json`
- [ ] All tokens have absolute values (no `{...}` references)
- [ ] Naming: `{category}-{property}-{scale}`
- [ ] Colors use OKLCH: `oklch(L C H)`
- [ ] Spacing uses rem: `"1rem"`, `"0.5rem"`
- [ ] All tokens have `type` property
- [ ] No semantic names (`orange-700`, not `brand-primary`)

### Flavors Layer
- [ ] Each Flavor has folder: `src/flavors/{flavor-name}/`
- [ ] Base file exists: `flavor.json`
- [ ] Mode files contain ONLY overrides
- [ ] All tokens reference ONLY Ingredients: `{color.orange.700.value}`
- [ ] No references to other Flavors or Recipes
- [ ] Naming: `{category}-{element}-{modifier}-{state}`
- [ ] Semantic context is clear
- [ ] Dark mode maintains WCAG AA contrast

### Recipes Layer
- [ ] One file per component: `src/recipes/{component}.json`
- [ ] All tokens reference ONLY Flavors: `{color.action.solid.background.default.value}`
- [ ] No references to Ingredients or other Recipes
- [ ] Naming: `{component}-{variant}-{property}-{state}`
- [ ] All variants documented
- [ ] All states documented (default, hover, active, focus, disabled)

### Component Integration
- [ ] Components use ONLY Recipe tokens
- [ ] No hardcoded colors/values in component styles
- [ ] No direct Flavor or Ingredient CSS variables

---

## Related Guidelines

- [COLOR_SYSTEM.md](COLOR_SYSTEM.md) → OKLCH color generation, universal lightness scale
- [SPACING_SYSTEM.md](SPACING_SYSTEM.md) → 4px base unit, t-shirt sizing
- [TYPOGRAPHY_SYSTEM.md](TYPOGRAPHY_SYSTEM.md) → Font scales, type tokens
- [THEMING_STRATEGY.md](THEMING_STRATEGY.md) → Creating Flavors, Flavors vs Modes distinction
- [packages/tokens/src/ JSON source files) → Complete token specifications (165 colors, all scales)

---

## Changelog

### 2.0.0 (2025-11-02)
- **BREAKING**: Consolidated 5 examples to 1 complete token flow example
- **BREAKING**: Removed duplicate explanations (reduced from 1095 to ~550 lines)
- **NEW**: Added "When to Create New Tokens" decision tree (Rule 2)
- **NEW**: Added "CSS Variable Naming Convention" complete specification (Rule 3)
- **NEW**: Added "Flavors vs Modes Distinction" to prevent confusion (Rule 4)
- **IMPROVED**: Clearer rules with pattern/anti-pattern examples
- **IMPROVED**: Maintained as definitive source for 3-layer architecture
- Reduced from 1095 to ~550 lines (50% reduction)

### 1.0.0 (2025-11-02)
- Initial token architecture guideline with three-layer system

---

**This guideline is the foundation of the Sando Design System. The three-layer architecture is non-negotiable and must be followed strictly to maintain theming flexibility and system scalability.**
