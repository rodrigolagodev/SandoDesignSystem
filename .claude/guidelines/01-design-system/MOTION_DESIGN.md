# Motion Design

**Category**: 01-design-system
**Version**: 2.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: UI Designer + Frontend Developer

---

## Purpose

Establishes motion and animation principles using token-based durations and easing curves. Ensures consistent, purposeful, and accessible motion with automatic `prefers-reduced-motion` support.

---

## Core Rules

### Rule 1: Token-Based Durations (No Hardcoded Values)

**All animations use token-based durations**, not hardcoded values.

**Pattern**:
```json
{
  "animation": {
    "duration": {
      "0": { "value": "0ms", "type": "duration" },       // Instant
      "200": { "value": "200ms", "type": "duration" },   // Fast
      "300": { "value": "300ms", "type": "duration" },   // Normal (default)
      "500": { "value": "500ms", "type": "duration" }    // Slow
    }
  }
}
```

**Usage in Recipes**:
```json
{
  "button": {
    "transition": {
      "duration": { "value": "{animation.duration.200.value}" }  // Fast hover
    }
  }
}
```

**Anti-pattern**:
```css
/* ❌ Hardcoded duration */
.button {
  transition: background-color 200ms;  /* Not responsive to prefers-reduced-motion */
}

/* ✅ Token-based */
.button {
  transition: background-color var(--sando-button-transition-duration);
}
```

**Why This Matters**: Token-based durations enable automatic `prefers-reduced-motion` support—all durations become 0ms when user has motion sensitivity.

---

### Rule 2: Automatic Reduced Motion (No Developer Action)

**System automatically disables animations** for users with `prefers-reduced-motion: reduce`.

**Pattern** (`flavor-motion-reduce.json` for ALL Flavors):
```json
{
  "$description": "Reduced motion mode. Disables animations for users with motion sensitivity.",
  "animation": {
    "duration": {
      "instant": { "value": "0ms" },
      "fast": { "value": "0ms" },
      "normal": { "value": "0ms" },
      "slow": { "value": "0ms" }
    }
  }
}
```

**Build System**: Wraps in `@media (prefers-reduced-motion: reduce)` automatically.

**Component-Level Fallback** (optional defense-in-depth):
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }

  .button:active {
    transform: none;  /* Remove scale transforms */
  }
}
```

**Why 0.01ms?**: Allows transitions to fire (for state tracking) without visible animation.

**Why This Matters**: Accessibility compliance (WCAG 2.3.3) without manual developer intervention.

---

### Rule 3: Fast Motion (100-300ms Default)

**Most UI animations should be FAST** (100-300ms) to avoid perceived slowness.

**Duration Guidelines**:

| Duration | Value | Use Case |
|----------|-------|----------|
| **instant** | 0ms | Reduced motion mode, immediate state changes |
| **fast** | 200ms | **Hover, focus, small transitions (most common)** |
| **normal** | 300ms | Modal entrance, dropdown, tab switching |
| **slow** | 500ms | Page transitions, complex animations |

**Pattern**:
```json
{
  "button": {
    "transition": {
      "duration": { "value": "{animation.duration.fast.value}" }  // 200ms - snappy
    }
  },
  "modal": {
    "animation": {
      "duration": { "value": "{animation.duration.normal.value}" }  // 300ms - noticeable but not slow
    }
  }
}
```

**Anti-pattern**:
```json
// ❌ Too slow - feels sluggish
{
  "button": {
    "transition": {
      "duration": { "value": "1000ms" }  // Users perceive as lag
    }
  }
}
```

---

### Rule 4: GPU-Accelerated Properties Only

**Animate ONLY GPU-accelerated properties** to avoid layout thrashing.

**✅ ALWAYS use** (hardware accelerated):
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness)

**❌ NEVER animate** (triggers layout/paint):
- `width`, `height`
- `margin`, `padding`
- `top`, `left`, `right`, `bottom` (use `transform: translate()` instead)
- `font-size`

**Pattern**:
```css
/* ✅ Good - GPU accelerated */
.modal {
  animation: fadeIn 300ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);  /* GPU accelerated */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ❌ Bad - triggers layout reflow */
.modal {
  animation: slideDown 300ms ease-out;
}

@keyframes slideDown {
  from {
    top: -20px;  /* Causes layout reflow */
  }
  to {
    top: 0;
  }
}
```

**Why This Matters**: GPU properties run at 60fps. Layout properties can drop to <30fps, causing jank.

---

### Rule 5: Semantic Easing (Context-Appropriate)

**Use semantic easing tokens** matched to animation context.

**Pattern**:
```json
{
  "animation": {
    "easing": {
      "default": { "value": "cubic-bezier(0.4, 0, 0.2, 1)" },      // Smooth transitions
      "entrance": { "value": "cubic-bezier(0, 0, 0.2, 1)" },       // Elements entering (ease-out)
      "exit": { "value": "cubic-bezier(0.4, 0, 1, 1)" }            // Elements leaving (ease-in)
    }
  }
}
```

**Usage Guidelines**:
- **entrance** (ease-out): Elements appearing—starts fast, settles into place
- **exit** (ease-in): Elements leaving—accelerates away
- **default** (ease-in-out): State transitions—smooth throughout

**Pattern**:
```css
/* Entrance animations */
.modal {
  animation: fadeIn 300ms var(--sando-animation-easing-entrance);
}

/* Exit animations */
.notification-leaving {
  animation: fadeOut 200ms var(--sando-animation-easing-exit);
}

/* State transitions */
.button {
  transition: background-color 200ms var(--sando-animation-easing-default);
}
```

---

## Token Structure

### Layer 1: Ingredients (Primitives)

**Duration Scale** (milliseconds):
```json
{
  "animation": {
    "duration": {
      "0": { "value": "0ms", "type": "duration" },
      "100": { "value": "100ms", "type": "duration" },
      "200": { "value": "200ms", "type": "duration" },
      "300": { "value": "300ms", "type": "duration" },
      "500": { "value": "500ms", "type": "duration" },
      "700": { "value": "700ms", "type": "duration" }
    }
  }
}
```

**Easing Functions**:
```json
{
  "animation": {
    "easing": {
      "linear": { "value": "linear", "type": "cubicBezier" },
      "ease-in": { "value": "cubic-bezier(0.4, 0, 1, 1)", "type": "cubicBezier" },
      "ease-out": { "value": "cubic-bezier(0, 0, 0.2, 1)", "type": "cubicBezier" },
      "ease-in-out": { "value": "cubic-bezier(0.4, 0, 0.2, 1)", "type": "cubicBezier" }
    }
  }
}
```

---

### Layer 2: Flavors (Semantic)

**Semantic Duration Tokens**:
```json
{
  "animation": {
    "duration": {
      "instant": { "value": "{animation.duration.0.value}" },
      "fast": { "value": "{animation.duration.200.value}" },
      "normal": { "value": "{animation.duration.300.value}" },
      "slow": { "value": "{animation.duration.500.value}" }
    }
  }
}
```

**Semantic Easing Tokens**:
```json
{
  "animation": {
    "easing": {
      "default": { "value": "{animation.easing.ease-in-out.value}" },
      "entrance": { "value": "{animation.easing.ease-out.value}" },
      "exit": { "value": "{animation.easing.ease-in.value}" }
    }
  }
}
```

**Mode Override** (`flavor-motion-reduce.json`):
```json
{
  "animation": {
    "duration": {
      "instant": { "value": "0ms" },
      "fast": { "value": "0ms" },
      "normal": { "value": "0ms" },
      "slow": { "value": "0ms" }
    }
  }
}
```

---

### Layer 3: Recipes (Component-Specific)

Components consume semantic animation tokens:

**Pattern**:
```json
{
  "button": {
    "transition": {
      "duration": { "value": "{animation.duration.fast.value}" },
      "timing": { "value": "{animation.easing.default.value}" }
    }
  },
  "modal": {
    "animation": {
      "duration": { "value": "{animation.duration.normal.value}" },
      "entrance": { "value": "{animation.easing.entrance.value}" },
      "exit": { "value": "{animation.easing.exit.value}" }
    }
  }
}
```

---

## Animation Patterns

### Pattern 1: State Transitions (Hover, Focus, Active)

**Use for**: Interactive elements changing state.

**Pattern**:
```css
.button {
  transition-property: background-color, transform, box-shadow;
  transition-duration: var(--sando-button-transition-duration);  /* 200ms */
  transition-timing-function: var(--sando-button-transition-timing);  /* ease-in-out */
}

.button:hover {
  background-color: var(--sando-button-solid-backgroundColor-hover);
}

.button:active {
  transform: scale(0.98);  /* Subtle press feedback */
}
```

**Properties to animate**: background-color, color, border-color, transform, opacity, box-shadow

---

### Pattern 2: Entrance Animations (Fade In, Slide In)

**Use for**: Elements appearing in viewport.

**Pattern**:
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal {
  animation: fadeIn var(--sando-animation-duration-normal) var(--sando-animation-easing-entrance);
}
```

---

### Pattern 3: Exit Animations (Fade Out, Slide Out)

**Use for**: Elements leaving viewport.

**Pattern**:
```css
@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

.notification-leaving {
  animation: fadeOut var(--sando-animation-duration-fast) var(--sando-animation-easing-exit);
}
```

---

## Component Implementation

### Complete Pattern: Button with Transitions

**Recipe Tokens**:
```json
{
  "button": {
    "transition": {
      "duration": { "value": "{animation.duration.fast.value}" },
      "timing": { "value": "{animation.easing.default.value}" }
    }
  }
}
```

**Component Consumption**:
```typescript
import { css } from 'lit';

export const buttonStyles = css`
  .button {
    transition-property: background-color, color, transform, box-shadow;
    transition-duration: var(--sando-button-transition-duration);
    transition-timing-function: var(--sando-button-transition-timing);
  }

  @media (prefers-reduced-motion: reduce) {
    .button {
      transition-duration: 0.01ms !important;
    }
  }
`;
```

**This pattern applies to**: All interactive components (Buttons, Inputs, Links, Cards with hover)

**Special cases**:
- **Loading spinners**: Use `linear` easing, longer duration (600ms)
- **Modals/Dialogs**: Use `entrance` easing for opening, `exit` for closing
- **Micro-interactions** (checkbox check, toggle switch): 200ms with slight scale

---

## Motion vs Modes

### Critical Distinction

**Motion operates independently** from color modes (dark, high-contrast).

**Pattern**: User can have:
- `flavor="original"` (brand theme) +
- `prefers-color-scheme: dark` (dark mode) +
- `prefers-reduced-motion: reduce` (motion disabled)

All three apply simultaneously via separate media queries.

See [THEMING_STRATEGY.md](THEMING_STRATEGY.md) for complete Flavors vs Modes explanation.

---

## Validation Checklist

### Token Structure
- [ ] Ingredients use millisecond values: `"200ms"`
- [ ] Flavors reference ONLY Ingredients: `{animation.duration.200.value}`
- [ ] Recipes reference ONLY Flavors: `{animation.duration.fast.value}`
- [ ] All Flavors have `flavor-motion-reduce.json` with 0ms durations

### Component Implementation
- [ ] Uses token-based durations: `var(--sando-button-transition-duration)`
- [ ] Animates ONLY GPU properties: `transform`, `opacity`, `filter`
- [ ] No layout properties animated: `width`, `height`, `top`, `margin`
- [ ] Includes `@media (prefers-reduced-motion: reduce)` fallback
- [ ] Duration ≤500ms for primary interactions
- [ ] No flashing content (>3 flashes/second)

### Accessibility
- [ ] Motion has clear functional purpose (not decorative only)
- [ ] `prefers-reduced-motion` disables/reduces motion
- [ ] Doesn't interfere with keyboard navigation or screen readers

---

## Related Guidelines

- [THEMING_STRATEGY.md](THEMING_STRATEGY.md) → Flavors vs Modes, automatic mode activation
- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) → Three-layer token system structure
- [COMPONENT_DESIGN.md](COMPONENT_DESIGN.md) → Interactive state patterns requiring motion

---

## Changelog

### 2.0.0 (2025-11-02)
- **BREAKING**: Consolidated 5 animation patterns to 3 core patterns
- **BREAKING**: Removed duplicate explanations (reduced from 631 to ~400 lines)
- **BREAKING**: Removed extensive anti-pattern examples
- **IMPROVED**: Clearer rules with pattern/anti-pattern examples
- **IMPROVED**: Focus on fundamental motion rules for agent consumption
- Reduced from 631 to ~400 lines (37% reduction)

### 1.0.0 (2025-11-02)
- Initial motion design guideline with duration scales, easing patterns, accessibility
