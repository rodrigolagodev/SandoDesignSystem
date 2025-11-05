# Color System

**Category**: 01-design-system
**Version**: 2.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: UI Designer

---

## Purpose

Defines OKLCH-based color system with algorithmic generation, ensuring perceptual uniformity, predictable contrast, and WCAG 2.1 AA/AAA compliance.

---

## Core Rules

### Rule 1: Use OKLCH for All Colors

**All colors defined in OKLCH color space** (Oklab Lightness Chroma Hue).

**Why**: Perceptually uniform lightness and chroma. L=0.5 looks exactly 50% bright (unlike HSL where L=50% varies by hue).

**Format**: `oklch(L C H)` or `oklch(L C H / A)`

- **L** (Lightness): 0 (black) to 1 (white)
- **C** (Chroma): 0 (gray) to 0.37+ (maximum saturation)
- **H** (Hue): 0-360 degrees on color wheel
- **A** (Alpha): 0 (transparent) to 1 (opaque) - optional

**Pattern**:

```css
--color-orange-500: oklch(0.64 0.2 25); /* L=0.64, C=0.20, H=25° */
```

**Key Advantage**: `orange-500` and `blue-500` have **identical perceived brightness** (both L=0.64).

---

### Rule 2: Universal Lightness Scale

**All colors use the SAME lightness progression** across all hues.

| Step    | Lightness | Use Case                   |
| ------- | --------- | -------------------------- |
| 50      | 0.98      | Near white, subtle tints   |
| 100     | 0.95      | Very light backgrounds     |
| 200     | 0.90      | Light backgrounds          |
| 300     | 0.82      | Muted colors               |
| 400     | 0.73      | Medium colors              |
| **500** | **0.64**  | **BASE COLOR (reference)** |
| 600     | 0.56      | Dark colors                |
| 700     | 0.47      | Very dark colors           |
| 800     | 0.38      | Almost black               |
| 900     | 0.30      | Near black                 |
| 950     | 0.22      | Darkest shade              |

**Why This Matters**: Guarantees consistent contrast ratios across all colors. Any `color-700` text on any `color-50` background has the same contrast ratio.

See [packages/tokens/src/ JSON source files) for complete specification.

---

### Rule 3: Four Saturation Profiles

**Colors are categorized by peak chroma intensity**.

| Profile     | Peak Chroma | When to Use                                   | Examples            |
| ----------- | ----------- | --------------------------------------------- | ------------------- |
| **High**    | 0.20-0.22   | Maximum impact, vibrant accents               | red, pink, violet   |
| **Medium**  | 0.17-0.20   | Professional UI, primary colors **(default)** | blue, green, orange |
| **Low**     | 0.14-0.16   | Soft, approachable, backgrounds               | yellow, amber, lime |
| **Neutral** | 0.005-0.018 | Foundations (text, borders, surfaces)         | All gray variants   |

**Rule**: Select profile by intended use, not preference.

**Pattern**:

```javascript
// Medium saturation (most common)
const orange = generateColorScale("orange", 25, "medium");
// Results in chroma curve: [0.08, 0.08, 0.14, 0.20, 0.20, 0.20, ...]
```

See [packages/tokens/src/ JSON source files) for complete curves.

---

### Rule 4: Brand-Agnostic Ingredients

**Ingredients (Layer 1) have NO semantic meaning**. They are neutral primitives.

**Why**: Enables unlimited brand customization. Semantic meaning is defined in Flavors (Layer 2).

**Pattern**:

```json
// Ingredients - neutral primitives
{
  "color": {
    "orange": {
      "500": { "value": "oklch(0.64 0.20 25)", "type": "color" }
    }
  }
}

// Flavors - define USE CONTEXT
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.orange.500.value}" }  // User chooses orange
        }
      }
    }
  }
}
```

**Anti-pattern**:

```json
// ❌ Don't name Ingredients by use
{
  "color": {
    "primary": { ... }  // Too specific, not reusable
  }
}
```

---

### Rule 5: WCAG Contrast Requirements

**All color combinations MUST meet WCAG 2.1 AA minimum**.

| Context              | Minimum (AA) | Target (AAA) |
| -------------------- | ------------ | ------------ |
| Normal text (< 18px) | 4.5:1        | 7:1          |
| Large text (≥ 18px)  | 3:1          | 4.5:1        |
| UI components        | 3:1          | 4.5:1        |
| Focus indicators     | 3:1          | 4.5:1        |

**Rule**: Target AAA where possible, use AA as minimum.

**Key Pairs** (examples):

- `neutral-warm-950` on `neutral-warm-50`: 14.8:1 (AAA) - headings
- `neutral-warm-800` on `neutral-warm-50`: 10.2:1 (AAA) - body text
- `white` on `orange-600`: 4.9:1 (AA) - button text

See [packages/tokens/src/ JSON source files) for complete matrix.

---

## Token Structure

### Layer 1: Ingredients (Algorithmic Primitives)

**15 colors, 11 steps each = 165 tokens** (+ 3 utilities).

**Complete palette**:

- **Warm** (5): red, rose, orange, amber, yellow
- **Green** (3): lime, green, emerald
- **Cool** (4): cyan, sky, blue, indigo
- **Purple/Pink** (3): purple, violet, pink
- **Neutral** (4): neutral, neutral-warm, neutral-cool, sand
- **Utility** (3): white, black, transparent

**Example - Orange (Hue: 25°, Profile: Medium)**:

```json
{
  "color": {
    "orange": {
      "50": { "value": "oklch(0.98 0.08 25)", "type": "color" },
      "500": { "value": "oklch(0.64 0.20 25)", "type": "color" }, // Base
      "950": { "value": "oklch(0.22 0.12 25)", "type": "color" }
      // ... 11 steps total
    }
  }
}
```

**Pattern**: All colors follow universal lightness + profile chroma curve.

See [packages/tokens/src/ JSON source files) for all 165 tokens.

---

### Layer 2: Flavors (Semantic Mapping)

Flavors map Ingredients to USE CONTEXT (not brand identity).

**Key Categories**:

| Category           | Purpose              | Example Tokens                                                  |
| ------------------ | -------------------- | --------------------------------------------------------------- |
| `color.background` | Canvas and surfaces  | `base`, `surface`, `raised`, `overlay`                          |
| `color.text`       | Text hierarchy       | `heading`, `body`, `caption`, `muted`, `on-solid`               |
| `color.action`     | Interactive elements | `solid`, `outline`, `ghost` (× background/text/border × states) |
| `color.state`      | Feedback states      | `destructive`, `success`, `warning`, `info`                     |
| `color.focus`      | Focus indicators     | `ring`, `ring-offset`, `background`                             |
| `color.border`     | Borders              | `default`, `muted`, `emphasis`                                  |

**Pattern**:

```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.orange.600.value}" }, // User choice
          "hover": { "value": "{color.orange.700.value}" }
        },
        "text": {
          "default": { "value": "{color.neutral.50.value}" }
        }
      }
    },
    "state": {
      "success": {
        "background": { "value": "{color.green.100.value}" },
        "text": { "value": "{color.green.700.value}" }
      }
    }
  }
}
```

**Critical Rules**:

1. ✅ Flavors define USE, not brand: `color.action.solid.background` (not `color.brand.primary`)
2. ✅ User chooses Ingredient mapping: Purple for actions? Blue? Orange? User decides
3. ✅ Consistency within Flavor: If `color.action` uses purple-600, `color.focus.ring` should too
4. ✅ States typically use semantic colors: `destructive` → red, `success` → green

---

### Layer 3: Recipes (Component-Specific)

Recipes reference Flavors for component colors.

**Pattern**:

```json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": { "value": "{color.action.solid.background.default.value}" },
        "hover": { "value": "{color.action.solid.background.hover.value}" }
        // ... states
      },
      "textColor": {
        "default": { "value": "{color.action.solid.text.default.value}" }
      }
    }
  }
}
```

**Anti-pattern**:

```json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": { "value": "{color.orange.600.value}" } // ❌ Skips Flavor layer
      }
    }
  }
}
```

---

## Algorithmic Color Generation

Any new color can be generated following this formula:

```typescript
function generateColorScale(
  colorName: string,
  hue: number, // 0-360 degrees
  profile: "high" | "medium" | "low" | "neutral",
): ColorScale {
  // CONSTANT lightness (perceptual consistency)
  const lightness = [
    0.98, 0.95, 0.9, 0.82, 0.73, 0.64, 0.56, 0.47, 0.38, 0.3, 0.22,
  ];

  // Chroma by profile
  const chromaCurves = {
    high: [
      0.088, 0.088, 0.154, 0.22, 0.22, 0.22, 0.22, 0.22, 0.176, 0.176, 0.132,
    ],
    medium: [0.08, 0.08, 0.14, 0.2, 0.2, 0.2, 0.2, 0.2, 0.16, 0.16, 0.12],
    low: [0.06, 0.06, 0.1, 0.15, 0.15, 0.15, 0.15, 0.15, 0.12, 0.12, 0.09],
    neutral: [
      0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018,
      0.018,
    ],
  };

  const chroma = chromaCurves[profile];
  const steps = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];

  return steps.reduce((acc, step, i) => {
    acc[`${colorName}-${step}`] = {
      value: `oklch(${lightness[i]} ${chroma[i]} ${hue})`,
      type: "color",
    };
    return acc;
  }, {});
}

// Example: Generate "teal" at hue 180°
const teal = generateColorScale("teal", 180, "medium");
// Result: teal-50: oklch(0.98 0.08 180), teal-500: oklch(0.64 0.20 180), ...
```

---

## Colorblind Accessibility

### Critical Rule: Use Lightness Contrast, Not Just Hue

**✅ Good**: `orange-700` (L=0.47) vs `neutral-50` (L=0.98) - 51% lightness difference
**❌ Bad**: `red-500` (L=0.64) vs `green-500` (L=0.64) - 0% lightness difference (indistinguishable)

### Pattern: Combine Color with Non-Color Indicators

- ✅ Icons: Error = red + X icon, Success = green + checkmark
- ✅ Patterns: Graphs use stripes, dots, solid fills (not just colors)
- ✅ Labels: "Error" text + red color, not just red alone

**Why Universal Lightness Matters**: All Sando colors have sufficient lightness contrast for colorblind users.

---

## Validation Checklist

### Token Structure

- [ ] All colors use OKLCH format: `oklch(L C H)`
- [ ] Lightness values match universal scale (0.98, 0.95, 0.90, ..., 0.22)
- [ ] Chroma values match appropriate profile
- [ ] Hue is 0-360 degrees (or `none` for neutrals)
- [ ] Flavors reference ONLY Ingredients: `{color.{name}.{step}.value}`
- [ ] Recipes reference ONLY Flavors: `{color.action.solid.background.value}`

### Contrast Compliance

- [ ] Text contrast ≥ 4.5:1 for normal text
- [ ] Text contrast ≥ 3:1 for large text
- [ ] UI component contrast ≥ 3:1
- [ ] Target AAA (7:1) for critical content

### Colorblind Accessibility

- [ ] Critical information not conveyed by color alone
- [ ] Icons/patterns supplement color indicators
- [ ] Lightness contrast sufficient (different L values)

---

## Related Guidelines

- [packages/tokens/src/ JSON source files) → Complete palette (165 tokens), chroma curves, approved contrast pairs
- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) → Three-layer system rules
- [THEMING_STRATEGY.md](THEMING_STRATEGY.md) → How colors enable theming via Flavors

---

## Changelog

### 2.0.0 (2025-11-02)

- **BREAKING**: Complete palette (165 tokens) available in `packages/tokens/src/ingredients/color.json`
- **BREAKING**: Chroma curve arrays available in source JSON (not duplicated in guidelines)
- **BREAKING**: Approved contrast pairs available in source JSON (not duplicated in guidelines)
- **BREAKING**: Removed OKLCH comparison table (reduced to conceptual advantage)
- **BREAKING**: Consolidated examples to algorithmic pattern only
- **IMPROVED**: Clearer rules with pattern/anti-pattern examples
- **IMPROVED**: Focus on fundamental color system rules for agents
- Reduced from 921 to ~420 lines (54% reduction)

### 1.0.0 (2025-11-02)

- Initial color system with OKLCH, algorithmic generation, WCAG compliance
