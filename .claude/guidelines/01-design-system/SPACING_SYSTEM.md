# Spacing System

**Category**: 01-design-system
**Version**: 2.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: UI Designer + Design System Architect

---

## Purpose

Establishes spatial rhythm using a 4px base unit and unified t-shirt sizing (xs/sm/md/lg/xl) for all spacing and sizing tokens in the Sando Design System.

---

## Core Rules

### Rule 1: 4px Base Unit Foundation

**All spacing values are multiples of 4px** (0.25rem).

**Why**: Ensures pixel-perfect alignment, creates consistent visual rhythm, compatible with common screen densities.

**Pattern**:
```json
{
  "space": {
    "1": { "value": "0.25rem" },  // 4px
    "4": { "value": "1rem" },     // 16px - default
    "8": { "value": "2rem" }      // 32px
  }
}
```

**Scale**: Linear 0-13 (4px increments), exponential 16-64 (larger layouts).

---

### Rule 2: Three-Layer Architecture

This operates at **Layer 2 (Flavors)** - provides semantic naming for spacing.

**Critical**: Flavors reference ONLY Layer 1 (Ingredients), never Layer 3 (Recipes).

See [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) for complete layer rules.

**Pattern**:
```json
{
  "space": {
    "inset": {
      "md": { "value": "{space.4.value}" }  // ✅ References Ingredient
    }
  }
}
```

**Anti-pattern**:
```json
{
  "space": {
    "inset": {
      "md": { "value": "16px" }  // ❌ Absolute value in Flavor
    }
  }
}
```

---

### Rule 3: Unified T-Shirt Naming

**All Flavors use: xs → sm → md → lg → xl**

**Why**: Single mental model, industry standard, predictable scaling.

| Size | Inset (Padding) | Stack (Spacing) | Control (Height) |
|------|----------------|-----------------|------------------|
| **xs** | 4px | 4px | 32px |
| **sm** | 8px | 8px | 36px |
| **md** | 16px (default) | 16px (default) | **44px (WCAG)** |
| **lg** | 24px | 24px | 52px |
| **xl** | 32px | 32px | 64px |

**Pattern applies to**: All spacing and sizing tokens (no exceptions).

---

### Rule 4: Inset vs Stack Distinction

**Inset** = Padding INSIDE components
**Stack** = Spacing BETWEEN elements

**Pattern**:
```json
{
  "space": {
    "inset": {
      "md": { "value": "{space.4.value}" }  // Internal padding
    },
    "stack": {
      "md": { "value": "{space.4.value}" }  // External spacing
    }
  }
}
```

**Usage**:
```css
.card {
  padding: var(--sando-space-inset-md);  /* Internal */
}

.card-list {
  gap: var(--sando-space-stack-md);  /* Between items */
}
```

---

### Rule 5: Use Logical Properties (RTL Support)

**Always use logical properties** for internationalization.

| Physical | Logical | Use Case |
|----------|---------|----------|
| `padding-left/right` | `padding-inline` | Horizontal padding |
| `padding-top/bottom` | `padding-block` | Vertical padding |
| `margin-left/right` | `margin-inline` | Horizontal margins |

**Pattern**:
```css
.element {
  padding-inline: var(--sando-space-inset-md);  /* ✅ RTL-aware */
  padding-block: var(--sando-space-inset-sm);
}
```

**Anti-pattern**:
```css
.element {
  padding-left: var(--sando-space-inset-md);  /* ❌ Breaks in RTL */
  padding-right: var(--sando-space-inset-md);
}
```

---

## Token Structure

### Layer 1: Ingredients (Primitives)

**Numeric scale** - absolute values, no semantic meaning.

```json
{
  "space": {
    "0": { "value": "0rem" },
    "1": { "value": "0.25rem" },   // 4px
    "2": { "value": "0.5rem" },    // 8px
    "4": { "value": "1rem" },      // 16px - default
    "6": { "value": "1.5rem" },    // 24px
    "8": { "value": "2rem" },      // 32px
    "11": { "value": "2.75rem" },  // 44px - WCAG minimum
    // ... up to space.64 (256px)
  }
}
```

Complete scale: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 20, 24, 32, 40, 48, 64

---

### Layer 2: Flavors (Semantic T-Shirt Sizing)

#### Inset Tokens (Padding)

```json
{
  "space": {
    "inset": {
      "xs": { "value": "{space.1.value}" },  // 4px - micro padding
      "sm": { "value": "{space.2.value}" },  // 8px - compact
      "md": { "value": "{space.4.value}" },  // 16px - default
      "lg": { "value": "{space.6.value}" },  // 24px - comfortable
      "xl": { "value": "{space.8.value}" }   // 32px - spacious
    }
  }
}
```

**When to use**:
- **xs**: Badges, tags, dense elements
- **sm**: Small buttons, compact UIs
- **md**: Default for most components (cards, panels)
- **lg**: Large cards, comfortable layouts
- **xl**: Modals, hero sections

---

#### Stack Tokens (Spacing)

```json
{
  "space": {
    "stack": {
      "xs": { "value": "{space.1.value}" },  // 4px - tight coupling
      "sm": { "value": "{space.2.value}" },  // 8px - close items
      "md": { "value": "{space.4.value}" },  // 16px - default
      "lg": { "value": "{space.6.value}" },  // 24px - sections
      "xl": { "value": "{space.8.value}" }   // 32px - major divisions
    }
  }
}
```

**When to use**:
- **xs**: Icon + text gap, tightly related elements
- **sm**: Form field groups, related list items
- **md**: Paragraph spacing, default flexbox gap
- **lg**: Section headings, content blocks
- **xl**: Major page sections

---

#### Control Sizing (Component Heights)

```json
{
  "sizing": {
    "control": {
      "xs": { "value": "{space.8.value}" },   // 32px - extra compact
      "sm": { "value": "{space.9.value}" },   // 36px - small
      "md": { "value": "{space.11.value}" },  // 44px - WCAG compliant
      "lg": { "value": "{space.13.value}" },  // 52px - prominent
      "xl": { "value": "{space.16.value}" }   // 64px - hero CTAs
    }
  }
}
```

**WCAG 2.5.5**: Minimum 44px touch target (Level AAA).
**Rule**: Default to `md` for all interactive elements.

---

### Layer 3: Recipes (Component-Specific)

Recipes reference Flavors to define component spacing.

**Pattern**:
```json
{
  "button": {
    "size": {
      "md": {
        "paddingInline": { "value": "{space.inset.md.value}" },  // 16px
        "paddingBlock": { "value": "{space.inset.sm.value}" },   // 8px
        "minHeight": { "value": "{sizing.control.md.value}" }    // 44px
      }
    }
  }
}
```

**Key Pattern**: `paddingInline > paddingBlock` (wider buttons = better click targets)

---

## Component Implementation

### Complete Pattern: Button Component

**Recipe Tokens** (`packages/tokens/src/recipes/button.json`):
```json
{
  "button": {
    "size": {
      "sm": {
        "paddingInline": { "value": "{space.inset.sm.value}" },
        "paddingBlock": { "value": "{space.inset.sm.value}" },
        "minHeight": { "value": "{sizing.control.sm.value}" }
      },
      "md": {
        "paddingInline": { "value": "{space.inset.md.value}" },
        "paddingBlock": { "value": "{space.inset.sm.value}" },
        "minHeight": { "value": "{sizing.control.md.value}" }
      },
      "lg": {
        "paddingInline": { "value": "{space.inset.lg.value}" },
        "paddingBlock": { "value": "{space.inset.md.value}" },
        "minHeight": { "value": "{sizing.control.lg.value}" }
      }
    }
  }
}
```

**Component Consumption** (`sando-button.ts`):
```typescript
import { css } from 'lit';

export const sizeStyles = css`
  :host([size="md"]) button {
    padding-inline: var(--sando-button-size-md-paddingInline);
    padding-block: var(--sando-button-size-md-paddingBlock);
    min-height: var(--sando-button-size-md-minHeight);
  }
`;
```

---

## Validation Checklist

### Token Structure
- [ ] Ingredients use multiples of 4px (0.25rem increments)
- [ ] Flavors reference ONLY Ingredients: `{space.N.value}`
- [ ] Flavors use t-shirt naming: xs, sm, md, lg, xl
- [ ] Flavors separate `inset` (padding) from `stack` (spacing)
- [ ] Recipes reference ONLY Flavors: `{space.inset.md.value}`

### Component Implementation
- [ ] Uses logical properties: `paddingInline`, `paddingBlock`
- [ ] Interactive elements meet 44px minimum (`sizing.control.md`)
- [ ] Consistent t-shirt size within component (don't mix xs + xl)
- [ ] No hardcoded pixel values in styles

### Accessibility
- [ ] Touch targets ≥44×44px for primary interactions
- [ ] Focus outlines have adequate offset (2px+)
- [ ] Spacing works at 200% browser zoom

---

## Related Guidelines

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) → Three-layer system rules
- [COMPONENT_DESIGN.md](COMPONENT_DESIGN.md) → How spacing integrates with variants
- [TYPOGRAPHY_SYSTEM.md](TYPOGRAPHY_SYSTEM.md) → Type scale coordination
- [packages/tokens/src/ JSON source files) → Complete spacing scale reference

---

## Changelog

### 2.0.0 (2025-11-02)
- **BREAKING**: Removed migration guide (legacy content)
- **BREAKING**: Consolidated examples from 3 to 1 complete pattern
- **BREAKING**: Reduced duplicated 3-layer architecture explanation
- **IMPROVED**: Clearer rules with pattern/anti-pattern examples
- **IMPROVED**: Focus on fundamental rules for agent consumption
- Reduced from 988 to ~450 lines (54% reduction)

### 1.0.0 (2025-11-02)
- Initial spacing system with unified t-shirt naming
