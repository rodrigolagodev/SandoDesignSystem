# Theming Strategy

**Category**: 01-design-system
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: Design System Architect + Design Ops Specialist

---

## Purpose

This guideline establishes the theming architecture for the Sando Design System, explaining the critical distinction between **Flavors** (manual brand themes) and **Modes** (automatic accessibility variants), and how the system enables flexible theming while maintaining accessibility standards.

---

## Core Principles

1. **Flavors and Modes are Separate Concerns**: Flavors provide brand identity, Modes ensure accessibility
2. **Automatic Accessibility**: Modes activate automatically via user preferences (no manual selection needed)
3. **Flavor Inheritance**: Components inherit flavor from ancestors via FlavorableMixin
4. **Token-Layer Separation**: Theming happens at Flavors layer (Layer 2), never Ingredients (Layer 1)
5. **Developer Choice**: Developers choose flavors, users control modes via system preferences

---

## Flavors vs Modes

### Flavors (Brand Themes)

**Definition**: Brand color schemes and visual identities applied manually by developers.

**Characteristics**:
- Selected via HTML `flavor` attribute
- Brand-focused (sando-inspired naming)
- Developer-controlled
- Persistent across the application or sections

**Examples**: original, strawberry, matcha, tamago, sakura, midnight

**Application**:
```html
<!-- Global flavor -->
<html flavor="original">
  <body>
    <sando-button>Original themed button</sando-button>
  </body>
</html>

<!-- Section flavor -->
<section flavor="strawberry">
  <sando-card>Strawberry themed card</sando-card>
</section>

<!-- Component-level override -->
<sando-button flavor="matcha">Matcha themed button</sando-button>
```

### Modes (Accessibility Variants)

**Definition**: Accessibility-focused variations that respond to user system preferences automatically.

**Characteristics**:
- Activated via CSS `@media` queries
- User-controlled (system preferences)
- Automatic (no manual selection)
- Apply on top of any flavor

**Supported Modes**:
- `dark` - Dark color scheme (prefers-color-scheme: dark)
- `high-contrast` - Enhanced contrast (prefers-contrast: high)
- `forced-colors` - System color overrides (forced-colors: active)
- `motion-reduce` - Reduced motion (prefers-reduced-motion: reduce)

**Application**: Automatic via media queries, no developer action required.

---

## Theming Architecture

### File Structure Pattern

Each flavor is defined in a directory with **5 separate files**:

```
packages/tokens/src/flavors/{flavor-name}/
├── flavor.json                    # Base flavor (default mode)
├── flavor-dark.json               # Dark mode overrides
├── flavor-high-contrast.json      # High contrast overrides
├── flavor-forced-colors.json      # Forced colors overrides
└── flavor-motion-reduce.json      # Motion reduce overrides
```

**Critical Pattern**: Mode files contain **only changed tokens**, not full token set.

**Example** - `flavor-dark.json`:
```json
{
  "color": {
    "background": {
      "base": { "value": "{color.neutral.900.value}" },
      "subtle": { "value": "{color.neutral.800.value}" }
    },
    "text": {
      "primary": { "value": "{color.neutral.50.value}" }
    }
  }
}
```

Only tokens that differ in dark mode are redefined (inverted lightness, adjusted contrast).

---

## Build System Pattern

### CSS Output Structure

The build system generates CSS files wrapped in appropriate `@media` queries:

**Base Flavor** (`flavor-original.css`):
```css
:host([flavor="original"]), [flavor="original"] {
  --sando-color-background-base: oklch(98% 0.02 120);
  --sando-color-text-primary: oklch(20% 0.02 120);
}
```

**Dark Mode** (`flavor-original-dark.css`):
```css
@media (prefers-color-scheme: dark) {
  :host([flavor="original"]), [flavor="original"] {
    --sando-color-background-base: oklch(15% 0.02 120);
    --sando-color-text-primary: oklch(95% 0.02 120);
  }
}
```

**High Contrast Mode** (`flavor-original-high-contrast.css`):
```css
@media (prefers-contrast: high) {
  :host([flavor="original"]), [flavor="original"] {
    --sando-color-background-base: oklch(100% 0 0);
    --sando-color-text-primary: oklch(0% 0 0);
  }
}
```

**Pattern**: Each mode file is wrapped in its corresponding `@media` query during build.

---

## FlavorableMixin Integration

### Automatic Inheritance

The FlavorableMixin enables automatic flavor inheritance from ancestor elements:

**Behavior**:
1. Component checks its own `flavor` attribute
2. If not set, traverses DOM ancestors to find nearest `[flavor]`
3. Falls back to default flavor if none found
4. Applies flavor by updating internal state

**Example**:
```html
<div flavor="strawberry">
  <sando-card>
    <!-- Inherits flavor="strawberry" automatically -->
    <sando-button>Inherits strawberry theme</sando-button>
  </sando-card>
</div>
```

**Implementation Pattern**: All themeable components use `FlavorableMixin` to enable this behavior.

---

## Token Layer Responsibilities

### Layer 1: Ingredients (Primitives)

**Role in Theming**: Provides raw color values in OKLCH format.

**Not Themeable**: Ingredients are absolute values, never change per theme.

**Example**:
```json
{
  "color": {
    "brand": {
      "500": { "value": "oklch(65% 0.19 35)" }
    }
  }
}
```

### Layer 2: Flavors (Semantic Theming)

**Role in Theming**: **This is where theming happens.**

**Responsibilities**:
- Map semantic names to Ingredient colors
- Define different mappings per flavor
- Provide mode-specific overrides (dark, high-contrast, etc.)

**Pattern**:
```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.brand.500.value}" },
          "hover": { "value": "{color.brand.600.value}" }
        }
      }
    }
  }
}
```

**Mode Override Pattern** (flavor-dark.json):
```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.brand.400.value}" }
        }
      }
    }
  }
}
```

### Layer 3: Recipes (Component Tokens)

**Role in Theming**: Consume Flavor tokens, remain theme-agnostic.

**Not Themeable**: Recipes reference Flavors, don't change per theme.

**Pattern**:
```json
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

**Critical Rule**: Recipes ONLY reference Flavors, never Ingredients. This ensures theming works correctly.

---

## Theming Patterns

### Pattern 1: Global Theme

Apply a single flavor across the entire application:

```html
<html flavor="original">
  <body>
    <!-- All components inherit "original" flavor -->
  </body>
</html>
```

### Pattern 2: Section Themes

Different flavors for different sections:

```html
<html flavor="original">
  <body>
    <header flavor="midnight">
      <!-- Dark header with midnight flavor -->
    </header>

    <main>
      <!-- Main content with original flavor -->
    </main>

    <aside flavor="strawberry">
      <!-- Sidebar with strawberry flavor -->
    </aside>
  </body>
</html>
```

### Pattern 3: Component-Level Override

Override flavor for specific components:

```html
<section flavor="original">
  <sando-button>Original themed</sando-button>
  <sando-button flavor="matcha">Matcha override</sando-button>
</section>
```

### Pattern 4: CSS Variable Override

Direct CSS custom property override for one-off customization:

```html
<sando-button
  style="--sando-button-solid-backgroundColor-default: oklch(50% 0.2 280);">
  Custom color button
</sando-button>
```

**Use sparingly**: This bypasses the token system. Prefer creating new flavors for reusable themes.

---

## Creating New Flavors

### Step 1: Create Flavor Directory

```bash
packages/tokens/src/flavors/{new-flavor-name}/
```

### Step 2: Define Base Flavor

Create `flavor.json` with semantic token mappings:

```json
{
  "color": {
    "background": {
      "base": { "value": "{color.neutral.50.value}" }
    },
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.brand.500.value}" }
        }
      }
    }
  }
}
```

### Step 3: Define Mode Overrides

Create mode files with ONLY changed tokens:

**flavor-dark.json**:
```json
{
  "color": {
    "background": {
      "base": { "value": "{color.neutral.900.value}" }
    }
  }
}
```

**flavor-high-contrast.json**:
```json
{
  "color": {
    "background": {
      "base": { "value": "oklch(100% 0 0)" }
    }
  }
}
```

### Step 4: Build Tokens

```bash
pnpm tokens:build
```

The build system generates CSS files with proper `@media` wrappers automatically.

### Step 5: Use New Flavor

```html
<div flavor="new-flavor-name">
  <sando-button>New flavor button</sando-button>
</div>
```

---

## Mode Behavior

### Dark Mode

**Trigger**: User system preference `prefers-color-scheme: dark`

**Typical Changes**:
- Inverted background lightness (light → dark)
- Inverted text lightness (dark → light)
- Adjusted contrast ratios for WCAG compliance
- Reduced saturation for reduced eye strain

**Developer Action**: None required. Activates automatically.

### High Contrast Mode

**Trigger**: User system preference `prefers-contrast: high`

**Typical Changes**:
- Maximum contrast ratios (pure black/white)
- Thicker borders
- Stronger focus indicators
- Simplified color palette

**Developer Action**: None required. Activates automatically.

### Forced Colors Mode

**Trigger**: Windows High Contrast mode (`forced-colors: active`)

**Typical Changes**:
- System color keywords (Canvas, CanvasText, LinkText)
- Respects user-defined color schemes
- Removes backgrounds, uses borders instead

**Developer Action**: None required. Activates automatically.

### Motion Reduce Mode

**Trigger**: User system preference `prefers-reduced-motion: reduce`

**Typical Changes**:
- Disable animations and transitions
- Instant state changes instead of animated
- Reduce parallax and scrolling effects

**Developer Action**: None required. Activates automatically.

---

## Accessibility Requirements

### WCAG Compliance Across Modes

All flavor/mode combinations MUST meet WCAG 2.1 AA:

- ✅ **1.4.3 Contrast (Minimum)**: 4.5:1 text, 3:1 UI components
- ✅ **1.4.6 Contrast (Enhanced)**: 7:1 text, 4.5:1 UI (AAA) for high-contrast mode
- ✅ **2.3.1 Three Flashes**: No animations flash more than 3 times per second
- ✅ **2.3.3 Animation from Interactions**: Respect motion-reduce preference

### Testing Checklist

When creating new flavors:

- [ ] Test base flavor in light mode
- [ ] Test with system dark mode enabled
- [ ] Test with high contrast mode enabled
- [ ] Test with forced colors mode enabled
- [ ] Test with reduced motion preference
- [ ] Verify contrast ratios (automated: axe-core, manual: Contrast Checker)
- [ ] Test with real assistive technologies (NVDA, JAWS, VoiceOver)

---

## Guidelines for Flavor Naming

**Sando-Inspired Naming**: Flavor names reference Japanese sandwich varieties to maintain brand identity.

**Naming Principles**:
- Evocative and memorable
- Single-word when possible
- Related to food, nature, or cultural references
- Avoid generic names (theme1, theme2, blue, red)

**Existing Pattern**: original, strawberry, matcha, tamago, sakura, midnight, ume

---

## Related Guidelines

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) - Three-layer token system rules
- [COLOR_SYSTEM.md](COLOR_SYSTEM.md) - OKLCH color space and palette generation
- [packages/tokens/src/ JSON source files) - Visual identity and flavor inspirations
- [COMPONENT_DESIGN.md](COMPONENT_DESIGN.md) - How components consume theming tokens
- [../04-accessibility/WCAG_COMPLIANCE.md](../../04-accessibility/WCAG_COMPLIANCE.md) - Accessibility standards for all modes

---

## Changelog

- **1.0.0** (2025-11-02): Initial theming strategy guideline establishing Flavors vs Modes distinction, file structure patterns, and build system behavior for the Sando Design System
