# Component Design

**Category**: 01-design-system
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: UI Designer + Frontend Developer

---

## Purpose

This guideline establishes the design philosophy, variant taxonomy, and API conventions for all components in the Sando Design System. It serves as a reference for agents and skills when creating or modifying components, ensuring consistency, predictability, and adherence to the three-layer token architecture.

---

## Core Principles

1. **Token-Driven Design**: All visual properties derive from Recipe tokens (Layer 3), never hardcoded values
2. **Predictable Patterns**: Variants follow consistent naming and behavior across all components
3. **T-Shirt Sizing**: Unified sizing scale (xs, sm, md, lg, xl) for cognitive simplicity
4. **Accessibility First**: WCAG 2.1 AA minimum for all components
5. **Composition Over Configuration**: Flexible APIs that balance simplicity with extensibility

---

## Variant Taxonomy

Components use standardized variant categories to ensure predictability and consistency.

### Category 1: Visual Variants (Appearance)

Defines the **visual style** and **emphasis level** of a component.

**Standard Pattern**:

| Variant | Emphasis Level | Visual Characteristics | When to Use |
|---------|---------------|------------------------|-------------|
| `solid` | High | Filled background, contrasting text | Primary actions, high prominence |
| `outline` | Medium | Border only, transparent background | Secondary actions, medium prominence |
| `ghost` | Low | No border, subtle hover state | Tertiary actions, low prominence |
| `text` | Minimal | Text only, no background/border | Inline actions, minimal prominence |

**Type Definition Pattern**:
```typescript
export type ComponentVariant = 'solid' | 'outline' | 'ghost' | 'text';
```

**Applicable to**: Button, Badge, Card, Alert, Chip, Tag, etc.

**Recipe Token Pattern**:
```json
{
  "component": {
    "solid": { "backgroundColor": {...}, "textColor": {...} },
    "outline": { "borderColor": {...}, "textColor": {...} },
    "ghost": { "backgroundColor": {...}, "textColor": {...} },
    "text": { "textColor": {...} }
  }
}
```

---

### Category 2: Size Variants (Scale)

Defines the **physical dimensions** and **density** of a component.

**Standard Pattern (T-Shirt Sizing)**:

| Size | Purpose | Interactive Target | Visual Density |
|------|---------|-------------------|----------------|
| `xs` | Extra compact | 32px | Very dense UIs |
| `sm` | Small | 36px | Compact layouts |
| `md` | Medium (default) | **44px (WCAG)** | Standard comfortable |
| `lg` | Large | 52px | Prominent elements |
| `xl` | Extra large | 64px | Hero/maximum impact |

**Type Definition Pattern**:
```typescript
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

**Applicable to**: All interactive components (Button, Input, Select, etc.), Layout components (Card, Modal, etc.)

**Recipe Token Pattern**:
```json
{
  "component": {
    "size": {
      "xs": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} },
      "sm": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} },
      "md": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} },
      "lg": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} },
      "xl": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} }
    }
  }
}
```

**Default**: Always `md` for WCAG 2.5.5 compliance (44px minimum touch target).

**Spacing Pattern**: `paddingInline > paddingBlock` (horizontal > vertical for better click targets).

---

### Category 3: Status Variants (Semantic State)

Communicates **semantic meaning** through color coding.

**Standard Pattern**:

| Status | Semantic Meaning | Color Scheme | Use Cases |
|--------|-----------------|--------------|-----------|
| `default` | Neutral, standard | Theme colors | Normal state, no specific meaning |
| `success` | Positive, confirmation | Green palette | Success messages, confirmations |
| `destructive` | Negative, dangerous | Red palette | Errors, destructive actions |
| `warning` | Caution, attention | Yellow/Orange palette | Warnings, non-critical issues |
| `info` | Informational | Blue palette | Helpful information, tips |

**Type Definition Pattern**:
```typescript
export type ComponentStatus = 'default' | 'success' | 'destructive' | 'warning' | 'info';
```

**Applicable to**: Alert, Badge, Button (destructive actions), Input (validation), Toast, Banner, etc.

**Recipe Token Pattern**:
```json
{
  "component": {
    "status": {
      "success": { "backgroundColor": {...}, "textColor": {...}, "borderColor": {...} },
      "destructive": { "backgroundColor": {...}, "textColor": {...}, "borderColor": {...} },
      "warning": { "backgroundColor": {...}, "textColor": {...}, "borderColor": {...} },
      "info": { "backgroundColor": {...}, "textColor": {...}, "borderColor": {...} }
    }
  }
}
```

---

### Category 4: Shape Variants (Border Radius)

Defines the **corner rounding** of a component.

**Standard Pattern**:

| Radius | Value Range | Visual Result | Use Cases |
|--------|-------------|---------------|-----------|
| `none` | 0px | Sharp corners | Corporate, formal designs |
| `default` | 4px-8px | Subtle rounding | Standard, balanced design |
| `full` | 9999px | Pill/circular | Pills, badges, icon buttons |

**Type Definition Pattern**:
```typescript
export type ComponentRadius = 'none' | 'default' | 'full';
```

**Applicable to**: Button, Badge, Card, Input, Avatar, etc.

**Recipe Token Pattern**:
```json
{
  "component": {
    "radius": {
      "none": { "value": "0" },
      "default": { "value": "{border.radius.default.value}" },
      "full": { "value": "{border.radius.circle.value}" }
    }
  }
}
```

---

## Token Structure Patterns

Recipe tokens (Layer 3) for components follow predictable hierarchies.

### Pattern: Variant-State-Property

```json
{
  "component": {
    "variant": {
      "property": {
        "state": { "value": "{flavor.token.value}" }
      }
    }
  }
}
```

**Example**:
```json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": { "value": "{color.action.solid.background.default.value}" },
        "hover": { "value": "{color.action.solid.background.hover.value}" },
        "active": { "value": "{color.action.solid.background.hover.value}" },
        "disabled": { "value": "{color.action.disabled.background.value}" }
      }
    }
  }
}
```

### Pattern: Size-Property

```json
{
  "component": {
    "size": {
      "sizeValue": {
        "property": { "value": "{flavor.token.value}" }
      }
    }
  }
}
```

**Example**:
```json
{
  "button": {
    "size": {
      "md": {
        "paddingInline": { "value": "{space.inset.md.value}" },
        "paddingBlock": { "value": "{space.inset.sm.value}" },
        "fontSize": { "value": "{font.size.body.value}" },
        "minHeight": { "value": "{sizing.control.md.value}" }
      }
    }
  }
}
```

### Pattern: Component-Level Base Properties

Properties that don't change across variants/sizes.

```json
{
  "component": {
    "fontFamily": { "value": "{font.family.body.value}" },
    "fontWeight": { "value": "{font.weight.emphasis.value}" },
    "lineHeight": { "value": "{font.lineHeight.body.value}" },
    "borderRadius": { "value": "{border.radius.default.value}" },
    "transition": {
      "duration": { "value": "{animation.duration.fast.value}" },
      "timing": { "value": "{animation.easing.default.value}" }
    }
  }
}
```

**Critical Rule**: Recipes ONLY reference Flavors (Layer 2), NEVER Ingredients (Layer 1).

---

## Standard Interactive States

All interactive components must handle these states:

### Required States

| State | Description | Visual Feedback | Interactivity |
|-------|-------------|-----------------|---------------|
| **default** | Resting state | Base styling | Interactive |
| **hover** | Mouse over | Subtle color change | Interactive |
| **active** | Being pressed | Visual "press" feedback | Interactive |
| **focus** | Keyboard focused | Visible outline (WCAG 2.4.7) | Interactive |
| **disabled** | Not available | Muted colors, cursor change | Non-interactive |

### Optional States (Context-Dependent)

| State | Description | When to Use |
|-------|-------------|-------------|
| **loading** | Processing | Async operations (submit, fetch) |
| **pressed** | Toggle active | Toggle buttons, selections |
| **invalid** | Validation error | Form inputs, required fields |
| **readonly** | View-only | Non-editable form fields |

### Token Pattern for States

```json
{
  "component": {
    "variant": {
      "property": {
        "default": { "value": "{...}" },
        "hover": { "value": "{...}" },
        "active": { "value": "{...}" },
        "focus": { "value": "{...}" },
        "disabled": { "value": "{...}" }
      }
    }
  }
}
```

---

## API Design Principles

### Property Design

**Guidelines**:
- Use `reflect: true` for properties that affect styling (variant, size, disabled, etc.)
- Provide sensible defaults (variant: 'solid', size: 'md')
- Use TypeScript union types for variant enums
- Boolean properties for binary states (disabled, loading, etc.)

**Naming Conventions**:
- Use camelCase for properties (`fullWidth`, not `full-width`)
- Use kebab-case for attributes (`full-width`, not `fullWidth`)
- Boolean properties: No `is` prefix (`disabled`, not `isDisabled`)

### Event Design

**Standard Events**:
- Use native events when possible (`click`, `change`, `input`)
- Custom events for component-specific actions (`remove`, `select`, `toggle`)
- Set `bubbles: true, composed: true` for cross-shadow-DOM events

**Naming Conventions**:
- Use lowercase, no prefix (`remove`, not `onRemove` or `handleRemove`)

### Slot Design

**Common Slot Patterns**:
- `default`: Main content
- `header`, `footer`: Semantic sections
- `icon-start`, `icon-end`: Icon positioning (when applicable)

**Guidelines**:
- Provide slots for flexible composition
- Offer prop alternatives for simple cases
- Document slot purpose and expected content

---

## Naming Conventions

### Component Names

**Pattern**: `sando-{component-name}`

**Examples**: `sando-button`, `sando-input`, `sando-card`, `sando-modal`

**Rules**:
- Lowercase, hyphen-separated
- Descriptive, not abbreviated (`sando-button`, not `sando-btn`)
- Single word when possible (`button`, `input`, `modal`)
- Compound when necessary (`date-picker`, `combo-box`)

### CSS Variable Names

**Pattern**: `--sando-{component}-{variant?}-{property}-{state?}`

**Examples**:
- `--sando-button-solid-backgroundColor-default`
- `--sando-input-borderColor-focus`
- `--sando-card-padding`

**Rules**:
- Kebab-case for all parts
- Include variant if property is variant-specific
- Include state if property is state-specific

### Type Names

**Pattern**: `{Component}{Category}` (PascalCase)

**Examples**:
- `ButtonVariant`, `InputSize`, `CardStatus`
- `SandoButtonProps`, `SandoInputProps`

---

## Accessibility Baseline

All components MUST meet WCAG 2.1 Level AA:

### Required (All Components)

- ✅ **1.4.3 Contrast**: 4.5:1 text, 3:1 large text, 3:1 UI components
- ✅ **4.1.2 Name, Role, Value**: Proper ARIA attributes
- ✅ **4.1.3 Status Messages**: Screen reader announcements for dynamic content

### Required (Interactive Components)

- ✅ **2.1.1 Keyboard**: All functionality via keyboard
- ✅ **2.4.7 Focus Visible**: Visible focus indicator (≥2px outline, ≥2px offset)
- ✅ **2.5.5 Target Size**: ≥44×44px touch targets (use `size="md"` default)
- ✅ **3.2.2 On Input**: No unexpected context changes

### Required (Form Components)

- ✅ **3.3.1 Error Identification**: Clear error messages
- ✅ **3.3.2 Labels or Instructions**: Descriptive labels
- ✅ **3.3.3 Error Suggestion**: Helpful error recovery

### ARIA Patterns

**Common Attributes**:
- `aria-label`: Non-visible label (icon-only components)
- `aria-labelledby`: Reference to visible label
- `aria-describedby`: Additional description/help text
- `aria-disabled`: Disabled state (visual only, not truly disabled)
- `aria-invalid`: Validation error state
- `aria-required`: Required field indicator
- `aria-busy`: Loading state indicator
- `aria-live`: Dynamic content announcements

---

## Component Design Checklist

When creating a new component, verify:

### Variants & Sizing
- [ ] Determines which variant categories apply (visual, size, status, shape)
- [ ] Uses standard variant names (solid/outline/ghost, xs/sm/md/lg/xl, etc.)
- [ ] Sets sensible defaults (variant: 'solid', size: 'md')
- [ ] Size 'md' meets 44px WCAG requirement for interactive elements

### Token Architecture
- [ ] All visual properties consume Recipe tokens
- [ ] Recipes ONLY reference Flavors (never Ingredients)
- [ ] Follows standard token hierarchy (variant-property-state)
- [ ] Includes all interactive states (default, hover, active, focus, disabled)

### API Design
- [ ] Properties use camelCase, attributes use kebab-case
- [ ] Important properties reflect to attributes (variant, size, disabled)
- [ ] TypeScript types defined for all props and events
- [ ] Events use native when possible, custom when needed

### Accessibility
- [ ] Semantic HTML element or proper ARIA role
- [ ] Keyboard navigation support (Tab, Enter, Space, Escape, Arrows)
- [ ] Focus indicator visible (≥2px outline, ≥2px offset)
- [ ] Screen reader tested (proper announcements, labels, live regions)
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)

### Implementation
- [ ] Uses logical properties (paddingInline, paddingBlock) for RTL support
- [ ] Integrates with FlavorableMixin for theming
- [ ] Component name follows `sando-{name}` pattern
- [ ] CSS variables follow `--sando-{component}-{property}` pattern

---

## Decision Matrix for Variant Selection

When designing a component, use this matrix to decide which variant categories apply:

| Component Type | Visual Variants | Size Variants | Status Variants | Shape Variants |
|----------------|----------------|---------------|-----------------|----------------|
| **Interactive** (Button, Link) | ✅ solid/outline/ghost | ✅ xs/sm/md/lg/xl | ⚠️ Optional (destructive) | ✅ Optional |
| **Input** (Input, Select, Textarea) | ❌ Usually not needed | ✅ xs/sm/md/lg | ⚠️ Validation states | ✅ Optional |
| **Feedback** (Alert, Toast, Banner) | ✅ solid/outline | ⚠️ Optional | ✅ success/destructive/warning/info | ✅ Optional |
| **Display** (Card, Panel, Modal) | ✅ solid/outline/ghost | ⚠️ Optional | ❌ Usually not needed | ✅ Optional |
| **Data** (Badge, Tag, Chip) | ✅ solid/outline/ghost | ✅ xs/sm/md | ✅ Optional (semantic colors) | ✅ full radius common |
| **Layout** (Container, Grid, Stack) | ❌ Not applicable | ⚠️ Optional (spacing scale) | ❌ Not applicable | ❌ Not applicable |

**Legend**:
- ✅ Recommended
- ⚠️ Optional (context-dependent)
- ❌ Not applicable

---

## Related Guidelines

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) - Three-layer token system rules
- [SPACING_SYSTEM.md](SPACING_SYSTEM.md) - T-shirt sizing for spacing
- [TYPOGRAPHY_SYSTEM.md](TYPOGRAPHY_SYSTEM.md) - Type scales and font usage
- [COLOR_SYSTEM.md](COLOR_SYSTEM.md) - Color palettes and semantic colors
- [THEMING_STRATEGY.md](THEMING_STRATEGY.md) - Flavor system and theming
- [../02-architecture/COMPONENT_ARCHITECTURE.md](../../02-architecture/COMPONENT_ARCHITECTURE.md) - Component file structure
- [../04-accessibility/WCAG_COMPLIANCE.md](../../04-accessibility/WCAG_COMPLIANCE.md) - Accessibility standards

---

## Changelog

- **1.0.0** (2025-11-02): Initial component design guidelines establishing variant taxonomy, token patterns, and API conventions for the Sando Design System
