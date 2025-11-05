# Typography System

**Category**: 01-design-system
**Version**: 2.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: UI Designer + Design System Architect

---

## Purpose

Establishes scalable, accessible typographic foundation using system fonts, modular scale, and responsive sizing. Operates through three-layer token architecture.

---

## Core Rules

### Rule 1: System Font Stack (Performance First)

**Use native system fonts** for zero network latency and familiar rendering.

**Pattern**:

```json
{
  "font": {
    "family": {
      "sans": {
        "value": "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        "type": "fontFamily"
      },
      "mono": {
        "value": "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        "type": "fontFamily"
      }
    }
  }
}
```

**Why This Matters**: System fonts are already installed—zero download time, consistent with OS, no FOIT/FOUT issues.

**Anti-pattern**:

```json
// ❌ Custom web fonts (add latency, FOIT issues)
{
  "font": {
    "family": {
      "sans": { "value": "'Inter', 'Helvetica', sans-serif" } // Requires download
    }
  }
}
```

See [packages/tokens/src/ JSON source files) for complete stack specifications.

---

### Rule 2: Modular Scale (Consistent Ratio)

**Font sizes follow modular scale** with ~1.125-1.25 ratio (Major Third to Perfect Fourth).

**Key Sizes**:

```json
{
  "font": {
    "size": {
      "100": { "value": "0.75rem", "type": "dimension" }, // 12px - Captions
      "300": { "value": "1rem", "type": "dimension" }, // 16px - BODY (default)
      "500": { "value": "1.25rem", "type": "dimension" }, // 20px - Small headings
      "700": { "value": "2rem", "type": "dimension" }, // 32px - Large headings
      "900": { "value": "3rem", "type": "dimension" } // 48px - Display
    }
  }
}
```

**Rules**:

- ✅ Use `rem` units (respects user preferences)
- ✅ Maintain consistent scale ratio
- ❌ Never add custom sizes outside scale

**Anti-pattern**:

```json
// ❌ Arbitrary sizes break scale
{
  "font": {
    "size": {
      "custom": { "value": "1.3rem" } // Not in scale
    }
  }
}
```

---

### Rule 3: Three-Layer Architecture

This operates at **Layer 2 (Flavors)** - provides semantic naming for typography.

**Critical**: Flavors reference ONLY Layer 1 (Ingredients), never Layer 3 (Recipes).

See [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) for complete layer rules.

**Pattern**:

```json
// Layer 2: Flavors (semantic)
{
  "font": {
    "size": {
      "body": { "value": "{font.size.300.value}" },         // ✅ References Ingredient
      "heading": { "value": "{font.size.700.value}" }
    }
  }
}

// Layer 3: Recipes (component-specific)
{
  "button": {
    "fontSize": { "value": "{font.size.body.value}" }       // ✅ References Flavor
  }
}
```

**Anti-pattern**:

```json
// ❌ Recipe skipping Flavors layer
{
  "button": {
    "fontSize": { "value": "{font.size.300.value}" } // Recipe → Ingredient (WRONG)
  }
}
```

---

### Rule 4: Semantic Naming (Context Over Size)

**Flavors use contextual names**, not size descriptors.

**Pattern**:

```json
// ✅ Good - describes USE CONTEXT
{
  "font": {
    "size": {
      "body": { "value": "{font.size.300.value}" },         // Paragraph text
      "caption": { "value": "{font.size.100.value}" },      // Small supplementary
      "heading": { "value": "{font.size.700.value}" }       // Titles
    }
  }
}

// ❌ Bad - describes SIZE
{
  "font": {
    "size": {
      "small": { "value": "{font.size.100.value}" },        // What is "small" for?
      "medium": { "value": "{font.size.300.value}" },
      "large": { "value": "{font.size.700.value}" }
    }
  }
}
```

**Why This Matters**: `font.size.body` can map to 16px, 18px, or 20px depending on flavor—without changing component code.

---

### Rule 5: Unitless Line Heights (Proportional Scaling)

**Always use unitless line height values** so they scale proportionally with font size.

**Pattern**:

```json
{
  "font": {
    "lineHeight": {
      "120": { "value": "1.2", "type": "number" }, // ✅ Unitless - scales correctly
      "150": { "value": "1.5", "type": "number" } // WCAG minimum for body
    }
  }
}
```

**Anti-pattern**:

```json
{
  "font": {
    "lineHeight": {
      "default": { "value": "1.5rem", "type": "dimension" } // ❌ With unit - breaks scaling
    }
  }
}
```

**WCAG 2.1 AA**: Body text requires minimum **1.5** line height.

---

## Token Structure

### Layer 1: Ingredients (Primitives)

**Numeric scale** - absolute values, no semantic meaning.

**Font Sizes** (50-900 scale):

```json
{
  "font": {
    "size": {
      "50": { "value": "0.625rem", "type": "dimension" }, // 10px - Micro
      "100": { "value": "0.75rem", "type": "dimension" }, // 12px - Captions
      "200": { "value": "0.875rem", "type": "dimension" }, // 14px - Small
      "300": { "value": "1rem", "type": "dimension" }, // 16px - DEFAULT
      "400": { "value": "1.125rem", "type": "dimension" }, // 18px - Large body
      "500": { "value": "1.25rem", "type": "dimension" }, // 20px - Small heading
      "600": { "value": "1.5rem", "type": "dimension" }, // 24px - Medium heading
      "700": { "value": "2rem", "type": "dimension" }, // 32px - Large heading
      "800": { "value": "2.5rem", "type": "dimension" }, // 40px - XL heading
      "900": { "value": "3rem", "type": "dimension" } // 48px - Display
    }
  }
}
```

**Font Weights** (100-900 standard):

```json
{
  "font": {
    "weight": {
      "400": { "value": "400", "type": "fontWeight" }, // Regular (body default)
      "500": { "value": "500", "type": "fontWeight" }, // Medium
      "700": { "value": "700", "type": "fontWeight" } // Bold (heading default)
    }
  }
}
```

**Line Heights** (unitless multipliers):

```json
{
  "font": {
    "lineHeight": {
      "100": { "value": "1", "type": "number" }, // Tight (badges)
      "120": { "value": "1.2", "type": "number" }, // Headings
      "150": { "value": "1.5", "type": "number" }, // Body (WCAG AA)
      "160": { "value": "1.6", "type": "number" } // Comfortable reading
    }
  }
}
```

---

### Layer 2: Flavors (Semantic)

**Semantic tokens** that reference ONLY Ingredients.

**Pattern**:

```json
{
  "font": {
    "family": {
      "body": { "value": "{font.family.sans.value}", "type": "fontFamily" },
      "heading": { "value": "{font.family.sans.value}", "type": "fontFamily" }
    },
    "size": {
      "body": { "value": "{font.size.300.value}", "type": "dimension" }, // 16px
      "caption": { "value": "{font.size.100.value}", "type": "dimension" }, // 12px
      "heading-sm": { "value": "{font.size.500.value}", "type": "dimension" }, // 20px
      "heading-md": {
        "value": "clamp({font.size.600.value}, 5vw, {font.size.700.value})", // Responsive
        "type": "dimension"
      }
    },
    "weight": {
      "body": { "value": "{font.weight.400.value}", "type": "fontWeight" },
      "heading": { "value": "{font.weight.700.value}", "type": "fontWeight" }
    },
    "lineHeight": {
      "body": { "value": "{font.lineHeight.150.value}", "type": "number" }, // 1.5
      "heading": { "value": "{font.lineHeight.120.value}", "type": "number" } // 1.2
    }
  }
}
```

**Responsive Headings** using `clamp()`:

- Minimum size for mobile
- Fluid scaling via viewport units
- Maximum size for desktop
- Uses `rem` to respect user preferences

---

### Layer 3: Recipes (Component-Specific)

Recipes reference Flavors to define component typography.

**Pattern**:

```json
{
  "button": {
    "fontFamily": { "value": "{font.family.body.value}", "type": "fontFamily" },
    "fontSize": { "value": "{font.size.body.value}", "type": "dimension" },
    "fontWeight": { "value": "{font.weight.700.value}", "type": "fontWeight" }, // Emphasis
    "lineHeight": { "value": "{font.lineHeight.body.value}", "type": "number" }
  }
}
```

---

## Component Implementation

### Complete Pattern: Button Component

**Recipe Tokens** (`packages/tokens/src/recipes/button.json`):

```json
{
  "button": {
    "fontFamily": { "value": "{font.family.body.value}", "type": "fontFamily" },
    "fontWeight": { "value": "{font.weight.700.value}", "type": "fontWeight" },
    "lineHeight": { "value": "{font.lineHeight.body.value}", "type": "number" },
    "size": {
      "sm": {
        "fontSize": {
          "value": "{font.size.caption.value}",
          "type": "dimension"
        } // 12px
      },
      "md": {
        "fontSize": { "value": "{font.size.body.value}", "type": "dimension" } // 16px
      },
      "lg": {
        "fontSize": { "value": "{font.size.body.value}", "type": "dimension" } // 16px
      }
    }
  }
}
```

**Component Consumption** (`sando-button.ts`):

```typescript
import { css } from "lit";

export const buttonStyles = css`
  button {
    font-family: var(--sando-button-fontFamily);
    font-weight: var(--sando-button-fontWeight);
    line-height: var(--sando-button-lineHeight);
  }

  :host([size="sm"]) button {
    font-size: var(--sando-button-size-sm-fontSize);
  }

  :host([size="md"]) button {
    font-size: var(--sando-button-size-md-fontSize);
  }

  :host([size="lg"]) button {
    font-size: var(--sando-button-size-lg-fontSize);
  }
`;
```

**This pattern applies to**: All text-containing components (Cards, Inputs, Modals, etc.)

**Special cases**:

- **Responsive headings**: Use `clamp()` in Flavors. See example above.
- **Monospace code**: Use `{font.family.mono.value}` for code blocks
- **Different font stacks per flavor**: Override in `flavor.json` (e.g., serif theme)

---

## Responsive Typography

### Using `clamp()` for Fluid Scaling

**Pattern**:

```css
/* Fluid scaling without media queries */
font-size: clamp(
  1.5rem,
  /* Minimum (mobile) */ 5vw,
  /* Preferred (fluid) */ 2rem /* Maximum (desktop) */
);
```

**When to use**:

- ✅ Large headings (h1, h2)
- ✅ Hero text, display typography
- ❌ Body text (fixed for readability)
- ❌ UI controls (buttons, inputs)

---

## Validation Checklist

### Token Structure

- [ ] Ingredients use `rem` units for sizes
- [ ] Line heights are unitless numbers
- [ ] Flavors reference ONLY Ingredients: `{font.size.300.value}`
- [ ] Flavors use semantic names: `body`, `heading`, `caption`
- [ ] Recipes reference ONLY Flavors: `{font.size.body.value}`

### Component Implementation

- [ ] Uses CSS variables from Recipes: `var(--sando-button-fontSize)`
- [ ] No hardcoded pixel values
- [ ] Typography scales at 200% zoom
- [ ] Font size ≥16px for body text (WCAG AA)
- [ ] Line height ≥1.5 for body text (WCAG AA)

### Accessibility

- [ ] Body text minimum 16px (1rem)
- [ ] Text color contrast ≥4.5:1 (normal), ≥3:1 (large text ≥18px)
- [ ] Heading hierarchy is semantic (h1→h2→h3)
- [ ] Text resizes with user preferences (uses `rem`)

---

## Related Guidelines

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) → Three-layer system rules
- [COLOR_SYSTEM.md](COLOR_SYSTEM.md) → Text color contrast requirements
- [SPACING_SYSTEM.md](SPACING_SYSTEM.md) → Vertical rhythm coordination
- [packages/tokens/src/ JSON source files) → Complete font scales, stacks

---

## Changelog

### 2.0.0 (2025-11-02)

- **BREAKING**: Consolidated 3 examples to 1 complete pattern
- **BREAKING**: Removed duplicate 3-layer architecture explanation (links to TOKEN_ARCHITECTURE.md)
- **BREAKING**: Reduced font size table (key sizes only, full scale in packages/tokens/src/ JSON source files)
- **IMPROVED**: Clearer rules with pattern/anti-pattern examples
- **IMPROVED**: Focus on fundamental rules for agent consumption
- Reduced from 736 to ~450 lines (39% reduction)

### 1.0.0 (2025-11-02)

- Initial typography system with modular scale, system fonts
