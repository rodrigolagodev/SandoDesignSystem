# Token Generator Research & Design Proposal

> **Date:** January 2025
> **Purpose:** Research and design specification for Sando token generator
> **Status:** Proposal & Validation

---

## 🎯 Problem Statement

**Current State:**

- Users must manually define 11 color steps (50, 100, 200...950) for each color
- Creating a new flavor requires duplicating and editing 200+ color tokens
- No automated generation = high friction for customization
- Difficult for non-technical users to create consistent scales

**User Need:**

> "I want to define my brand colors (#FF6B00, #1A1A1A) and automatically generate a complete, accessible color system with proper scales and dark mode variants."

---

## 🔍 Industry Research: How Others Solve This

### 1. **Radix Colors** - Scientific Approach ⭐ Best-in-Class

**Method:** Pre-computed, scientifically designed scales

- Each scale has 12 steps (1-12)
- Perceptually uniform using OKLCH color space
- Optimized for specific use cases per step:
  - Step 1: App backgrounds
  - Step 9: Solid backgrounds
  - Step 12: High contrast text

**Pros:**

- ✅ Perfect accessibility (WCAG AAA)
- ✅ Scientifically validated
- ✅ Light + dark mode designed together
- ✅ Consistent across hues

**Cons:**

- ❌ No custom colors (only pre-defined palettes)
- ❌ Can't match exact brand colors

**Tool:** https://www.radix-ui.com/colors/custom

- Input: Single hue value
- Output: Complete 12-step scale + dark mode

---

### 2. **Tailwind CSS / UI Colors** - Algorithmic Generation

**Method:** Algorithm-based color scale generation

- Input: Single base color
- Output: 11 steps (50-950)
- Uses HSL interpolation with easing curves

**Tool:** https://uicolors.app/generate

**Algorithm Overview:**

```javascript
// Simplified version
function generateScale(baseColor) {
  const hsl = hexToHSL(baseColor);
  const scale = {};

  // Lightness curve: 50 (95%) -> 500 (base) -> 950 (10%)
  const lightnessSteps = {
    50: 95,
    100: 90,
    200: 80,
    300: 70,
    400: 60,
    500: hsl.l, // Base color
    600: 45,
    700: 35,
    800: 25,
    900: 15,
    950: 10,
  };

  for (const [step, lightness] of Object.entries(lightnessSteps)) {
    scale[step] = hslToHex({
      h: hsl.h,
      s: adjustSaturation(hsl.s, lightness), // Boost at extremes
      l: lightness,
    });
  }

  return scale;
}
```

**Pros:**

- ✅ Works with any brand color
- ✅ Fast generation
- ✅ Consistent methodology
- ✅ Good enough for most use cases

**Cons:**

- ❌ HSL has perceptual issues (not uniform)
- ❌ Requires manual accessibility testing
- ❌ Dark mode scales need separate generation

---

### 3. **Material Design 3** - Tonal Palettes

**Method:** HCT (Hue-Chroma-Tone) color space

- Input: Primary color
- Output: 13 tonal values (0, 10, 20...100)
- Generates complementary palettes (secondary, tertiary, error)

**Tool:** https://m3.material.io/theme-builder#/custom

**Pros:**

- ✅ Scientifically designed (Google research)
- ✅ HCT is perceptually uniform
- ✅ Generates entire theme (not just one scale)
- ✅ Accessibility built-in

**Cons:**

- ❌ Material-specific
- ❌ Complex to implement
- ❌ Opinionated palette structure

---

### 4. **Leonardo (Adobe Spectrum)** - Contrast-Based

**Method:** WCAG contrast-first approach

- Input: Key colors + target contrast ratios
- Output: Scale that meets contrast requirements
- Uses CIELAB/CIELCH for perceptual uniformity

**Tool:** https://leonardocolor.io/

**Unique Feature:** You define contrast ratios, it generates colors

**Example:**

```javascript
// Define what you need
{
  name: 'Brand',
  keyColors: ['#FF6B00'],
  contrastRatios: [1, 1.5, 2, 3, 4.5, 7, 12, 21]
}
// Leonardo outputs colors that hit those exact ratios
```

**Pros:**

- ✅ Accessibility guaranteed
- ✅ Precise contrast control
- ✅ Perceptually uniform (CIELCH)
- ✅ Can work backwards (contrast → color)

**Cons:**

- ❌ More complex to understand
- ❌ Requires understanding of contrast ratios
- ❌ Overkill for simple use cases

---

### 5. **Tokens Studio (Figma Plugin)** - Designer-Friendly

**Method:** JSON configuration with sync

- Designers define tokens in Figma
- Export to JSON
- Sync to GitHub
- Style Dictionary builds to code

**JSON Structure:**

```json
{
  "global": {
    "brand": {
      "500": { "value": "#FF6B00", "type": "color" }
    }
  },
  "light": {
    "background": {
      "base": { "value": "{global.brand.50}" }
    }
  },
  "dark": {
    "background": {
      "base": { "value": "{global.brand.950}" }
    }
  }
}
```

**Pros:**

- ✅ Designer-friendly (visual)
- ✅ Design-dev sync
- ✅ Scales with references (DRY)
- ✅ Version control via JSON

**Cons:**

- ❌ Still requires manual scale creation
- ❌ No automatic generation
- ❌ Figma dependency

---

## 🎨 Color Science: HSL vs OKLCH

### The Problem with HSL

**HSL Issues:**

- Lightness is NOT perceptually uniform
- `hsl(240, 100%, 50%)` (blue) appears darker than `hsl(60, 100%, 50%)` (yellow)
- Same L value = different perceived brightness
- Makes it hard to ensure consistent contrast

**Visual Example:**

```
HSL 50% Lightness:
Red:    hsl(0, 100%, 50%)   → Appears medium bright
Yellow: hsl(60, 100%, 50%)  → Appears very bright  ❌ Inconsistent
Blue:   hsl(240, 100%, 50%) → Appears quite dark   ❌ Inconsistent
```

### OKLCH to the Rescue ⭐ Recommended

**OKLCH = Perceptually Uniform**

- L (Lightness): 0-1, perceptually accurate
- C (Chroma): 0-0.4, similar to saturation
- H (Hue): 0-360 degrees

**Why OKLCH is Better:**

```
OKLCH 60% Lightness:
Red:    oklch(60% 0.25 30)    → All appear same brightness ✅
Yellow: oklch(60% 0.25 100)   → Perceptually uniform ✅
Blue:   oklch(60% 0.25 250)   → Consistent contrast ✅
```

**Browser Support (2024):**

- ✅ Chrome 111+ (March 2023)
- ✅ Safari 15.4+ (March 2022)
- ✅ Firefox 113+ (May 2023)
- ✅ Can fallback to hex/rgb for older browsers

**Recommendation:** Use OKLCH for generation, output to HSL/hex for compatibility

---

## 🛠️ Proposed Solution for Sando

### Approach: Hybrid Configuration + Smart Generation

**User has 3 options:**

#### Option 1: Quick Start (AI-Assisted) ⚡

```javascript
// sando.config.js
export default {
  generator: {
    mode: "auto",
    brand: {
      primary: "#FF6B00",
      // That's it! System generates everything
    },
  },
};
```

**System generates:**

- Brand scale (50-950)
- Complementary neutral scale
- State colors (success, error, warning, info)
- Dark mode variants
- Accessibility tested

---

#### Option 2: Controlled Generation 🎯 Recommended

```javascript
// sando.config.js
export default {
  generator: {
    mode: "guided",
    brand: {
      primary: {
        base: "#FF6B00", // Your brand color
        baseStep: 500, // Which step is this? (default: 500)
        scaleMethod: "oklch", // oklch | hsl | radix-like
        adjustments: {
          lighten: 0.1, // Boost lightness at extremes
          saturate: 0.15, // Boost saturation at mid-tones
        },
      },
      neutral: {
        base: "#64748B",
        warmth: 0.05, // Add slight warmth (0-1)
      },
    },
    states: {
      error: "#EF4444",
      success: "#10B981",
      warning: "#F59E0B",
      info: "#3B82F6",
    },
    darkMode: {
      strategy: "invert", // invert | complementary | custom
      adjustments: {
        lightnessShift: -0.1, // Make dark mode slightly darker
        chromaBoost: 0.05, // Slight saturation boost
      },
    },
  },
};
```

---

#### Option 3: Full Manual Control 🔧

```javascript
// sando.config.js
export default {
  generator: {
    mode: "manual",
    colors: {
      brand: {
        50: "oklch(0.98 0.02 30)",
        100: "oklch(0.95 0.04 30)",
        200: "oklch(0.90 0.08 30)",
        // ... define all steps manually
      },
    },
  },
};
```

---

## 🏗️ Technical Implementation Plan

### Phase 1: Core Generator (MVP)

**Input:**

```json
{
  "brand": {
    "primary": "#FF6B00"
  }
}
```

**Output:**

```json
{
  "color": {
    "brand": {
      "50": { "value": "hsl(33, 100%, 96%)", "type": "color" },
      "100": { "value": "hsl(34, 100%, 92%)", "type": "color" },
      // ... 11 steps
      "950": { "value": "hsl(13, 81%, 15%)", "type": "color" }
    }
  }
}
```

**Algorithm:**

1. Parse base color to OKLCH
2. Generate lightness curve (eased distribution)
3. Adjust chroma based on lightness (boost at mid-tones)
4. Generate 11 steps
5. Convert back to HSL/hex
6. Validate WCAG contrast ratios
7. Output Ingredients JSON

---

### Phase 2: Flavor Generator

**Input:**

```json
{
  "flavorName": "strawberry",
  "baseIngredients": "generated from Phase 1",
  "preferences": {
    "warmth": "high",
    "contrast": "medium"
  }
}
```

**Output:**

```json
{
  "color": {
    "background": {
      "base": { "value": "{color.neutral.100.value}" },
      "surface": { "value": "{color.neutral.200.value}" }
      // ... semantic mappings
    }
  }
}
```

**Logic:**

- Maps ingredient steps to semantic roles
- Uses best practices for accessibility
- Generates light + dark mode variants

---

### Phase 3: CLI Tool

```bash
# Quick start
npx @sando/token-generator init

# Interactive wizard
npx @sando/token-generator create

# From config
npx @sando/token-generator build --config sando.config.js

# Validate existing tokens
npx @sando/token-generator validate
```

---

## 📊 Comparison: Sando's Approach vs Others

| Feature                   | Sando (Proposed) | Radix    | Tailwind   | Material | Leonardo   |
| ------------------------- | ---------------- | -------- | ---------- | -------- | ---------- |
| **Custom Brand Colors**   | ✅ Yes           | ❌ No    | ✅ Yes     | ✅ Yes   | ✅ Yes     |
| **Auto Generation**       | ✅ Yes           | ✅ Yes   | ✅ Yes     | ✅ Yes   | ✅ Yes     |
| **Manual Override**       | ✅ Yes           | ❌ No    | 🟡 Partial | ❌ No    | 🟡 Partial |
| **Dark Mode Auto**        | ✅ Yes           | ✅ Yes   | ❌ No      | ✅ Yes   | ✅ Yes     |
| **Accessibility Check**   | ✅ Yes           | ✅ Yes   | 🟡 Manual  | ✅ Yes   | ✅ Yes     |
| **Perceptual Uniformity** | ✅ OKLCH         | ✅ OKLCH | ❌ HSL     | ✅ HCT   | ✅ CIELCH  |
| **Config-Driven**         | ✅ Yes           | ❌ No    | ❌ No      | ❌ No    | 🟡 Partial |
| **Recipes Untouched**     | ✅ Yes           | N/A      | N/A        | N/A      | N/A        |

**Sando's Unique Value:**

1. **3-Layer Architecture Respect** - Only generates Ingredients & Flavors, never touches Recipes
2. **Progressive Complexity** - Simple by default, powerful when needed
3. **Config-Driven** - Version control your color decisions
4. **Hybrid Approach** - Auto + Manual in perfect balance

---

## 🎯 Recommended Implementation Path

### Phase 1: Foundation (Week 1-2)

**Goal:** Working color scale generator

**Tasks:**

- [ ] Install color manipulation library (culori or colorjs.io)
- [ ] Implement OKLCH color space conversion
- [ ] Create lightness curve algorithm
- [ ] Generate 11-step scale from single color
- [ ] Validate output (WCAG contrast checks)

**Deliverable:**

```javascript
import { generateColorScale } from "@sando/token-generator";

const scale = generateColorScale({
  base: "#FF6B00",
  steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
});

// Output: Complete brand scale
```

---

### Phase 2: Configuration System (Week 3-4)

**Goal:** Config file for customization

**Tasks:**

- [ ] Define sando.config.js schema
- [ ] Implement config parser
- [ ] Add validation
- [ ] Support multiple color families (brand, neutral, state)
- [ ] Generate complete ingredients JSON

**Deliverable:**

```bash
npx @sando/token-generator build
# Reads sando.config.js
# Outputs packages/tokens/src/ingredients/generated/
```

---

### Phase 3: Flavor Generation (Week 5-6)

**Goal:** Auto-generate semantic mappings

**Tasks:**

- [ ] Semantic mapping logic (background.base → neutral.100)
- [ ] Dark mode inversion algorithm
- [ ] High contrast mode generation
- [ ] Accessibility validation
- [ ] Generate complete flavors JSON

**Deliverable:**

```bash
npx @sando/token-generator build --with-flavors
# Outputs ingredients + flavors
```

---

### Phase 4: CLI & DX (Week 7-8)

**Goal:** Excellent developer experience

**Tasks:**

- [ ] Interactive CLI wizard
- [ ] Preview in terminal (color blocks)
- [ ] Accessibility report
- [ ] Migration from manual tokens
- [ ] Documentation

**Deliverable:**

```bash
npx @sando/token-generator init
? What's your primary brand color? #FF6B00
? Generate neutrals automatically? Yes
? Include state colors? Yes
✓ Generated 55 ingredient tokens
✓ Generated 120 flavor tokens (light + dark)
✓ All WCAG AA checks passed
```

---

## 🔬 Algorithm Deep Dive: Color Scale Generation

### Recommended Algorithm (OKLCH-based)

```typescript
interface ColorScaleConfig {
  base: string; // Hex color
  baseStep: number; // Which step is the base? (default: 500)
  steps: number[]; // [50, 100, 200, ...]
  method: "oklch";
}

function generateColorScale(config: ColorScaleConfig) {
  // 1. Parse base color to OKLCH
  const baseOKLCH = hexToOKLCH(config.base);

  // 2. Define lightness curve (perceptually even)
  const lightnessCurve = {
    50: 0.98, // Very light
    100: 0.95,
    200: 0.9,
    300: 0.82,
    400: 0.73,
    500: baseOKLCH.l, // Your brand color
    600: 0.56,
    700: 0.47,
    800: 0.38,
    900: 0.3,
    950: 0.22, // Very dark
  };

  // 3. Chroma adjustment curve (boost at mid-tones)
  function adjustChroma(lightness: number, baseChroma: number): number {
    // Reduce chroma at extremes for better contrast
    if (lightness > 0.9 || lightness < 0.25) {
      return baseChroma * 0.5;
    }
    // Boost chroma at mid-tones for vibrancy
    if (lightness > 0.5 && lightness < 0.75) {
      return baseChroma * 1.2;
    }
    return baseChroma;
  }

  // 4. Generate scale
  const scale = {};
  for (const step of config.steps) {
    const lightness = lightnessCurve[step];
    const chroma = adjustChroma(lightness, baseOKLCH.c);

    scale[step] = {
      oklch: `oklch(${lightness} ${chroma} ${baseOKLCH.h})`,
      hsl: oklchToHSL(lightness, chroma, baseOKLCH.h),
      hex: oklchToHex(lightness, chroma, baseOKLCH.h),
    };
  }

  return scale;
}
```

---

### Dark Mode Generation Strategy

```typescript
interface DarkModeConfig {
  strategy: "invert" | "complementary" | "custom";
  adjustments?: {
    lightnessShift?: number;
    chromaBoost?: number;
  };
}

function generateDarkMode(lightScale, config: DarkModeConfig) {
  if (config.strategy === "invert") {
    // Simple inversion: 50 ↔ 950, 100 ↔ 900, etc.
    return {
      50: lightScale[950],
      100: lightScale[900],
      200: lightScale[800],
      300: lightScale[700],
      400: lightScale[600],
      500: lightScale[500], // Keep middle
      600: lightScale[400],
      700: lightScale[300],
      800: lightScale[200],
      900: lightScale[100],
      950: lightScale[50],
    };
  }

  // For 'complementary' and 'custom', adjust hue/chroma
  // ...
}
```

---

## 💡 User Scenarios

### Scenario 1: Startup with Brand Color

**User:** "I just got brand colors from design agency"

```javascript
// sando.config.js
export default {
  generator: {
    mode: "auto",
    brand: {
      primary: "#FF6B00", // From brand guidelines
    },
  },
};
```

**Output:** Complete design system (55 ingredients, 120 flavors)

---

### Scenario 2: Rebrand Existing System

**User:** "We're changing our brand color from blue to purple"

```bash
# 1. Update config
vim sando.config.js
# Change primary: '#3B82F6' → '#A855F7'

# 2. Regenerate
npx @sando/token-generator build

# 3. Review changes
git diff packages/tokens/src/ingredients/

# 4. Components automatically update (they consume tokens)
```

**Result:** Entire design system updates in seconds

---

### Scenario 3: Design System Consultant

**User:** "I need precise control for client work"

```javascript
// sando.config.js
export default {
  generator: {
    mode: "manual",
    colors: {
      brand: {
        // Client's exact Pantone conversions
        500: "#FF6B00",
        700: "#CC5600",
        // Generate the rest
        _generate: [
          "50",
          "100",
          "200",
          "300",
          "400",
          "600",
          "800",
          "900",
          "950",
        ],
      },
    },
  },
};
```

**Result:** Mix of manual precision + auto generation

---

## 🚧 Open Questions & Decisions Needed

### 1. Should Recipes EVER be generated?

**Current Answer:** NO

- Recipes are component-specific
- They encode design decisions
- Changing them breaks component expectations

**Exception?**

- Maybe for NEW flavors (copy from 'original')
- Never overwrite existing recipes

---

### 2. Config file location?

**Options:**

- A) Root: `sando.config.js`
- B) Tokens package: `packages/tokens/generator.config.js`
- C) Both (root overrides package)

**Recommendation:** A) Root, but support B) for monorepo flexibility

---

### 3. Should generator be separate package?

**Options:**

- A) Part of @sando/tokens (built-in)
- B) Separate @sando/token-generator (install separately)

**Recommendation:** B) Separate package

- Users who don't need generation don't install it
- Cleaner separation of concerns
- Can version independently

---

### 4. How to handle existing manual tokens?

**Options:**

- A) Ignore (generator only writes to generated/ folder)
- B) Merge (combine manual + generated)
- C) Warn (conflict detection)

**Recommendation:** A) with option to merge manually

```
packages/tokens/src/ingredients/
├── color.json              # Manual (preserved)
├── generated/
│   └── color-generated.json  # Auto-generated
└── index.json              # Combines both
```

---

## 📚 Libraries to Use

### Color Manipulation

**Recommended:** [Culori](https://culorijs.org/)

```javascript
import { oklch, formatHex } from "culori";

const color = oklch(0.65, 0.25, 30); // OKLCH
const hex = formatHex(color); // #FF6B00
```

**Why Culori:**

- ✅ Supports OKLCH natively
- ✅ Lightweight (10KB)
- ✅ Tree-shakeable
- ✅ TypeScript support
- ✅ Excellent interpolation

**Alternative:** [Color.js](https://colorjs.io/)

- More features but heavier (30KB)

---

### Contrast Checking

**Recommended:** [colorparrot](https://www.npmjs.com/package/colorparrot)

```javascript
import { checkContrast } from "colorparrot";

const ratio = checkContrast("#FF6B00", "#FFFFFF");
// 3.2:1

if (ratio >= 4.5) {
  console.log("WCAG AA compliant");
}
```

---

## 🎉 Expected Benefits

### For Users

1. **10x Faster** flavor creation
   - Before: 4-6 hours manually
   - After: 5 minutes with config

2. **Guaranteed Accessibility**
   - Auto-validated WCAG ratios
   - No manual testing needed

3. **Consistent Quality**
   - Perceptually uniform scales
   - No "looks wrong" colors

4. **Rebrand-Friendly**
   - Change 1 color → entire system updates
   - Perfect for agencies

### For Sando

1. **Differentiation**
   - Unique 3-layer respect (Recipes untouched)
   - Config-driven (version control)

2. **Adoption**
   - Lower barrier to customization
   - More users try custom flavors

3. **Showcase**
   - Advanced color science
   - Production-grade tooling

---

## 🚀 Next Steps

### Immediate Actions (This Week)

1. **Validate Approach**
   - Review this document
   - Get feedback on config schema
   - Decide on core questions (#1-4 above)

2. **Prototype**
   - Install Culori
   - Build basic scale generator
   - Test with Sando's current brand color
   - Compare output to current manual tokens

3. **Define Scope**
   - MVP features for Phase 1
   - Nice-to-have for later

### Success Criteria

**Phase 1 Success = Can generate current tokens automatically**

```bash
# Input
{
  "brand": {
    "primary": "#f97415"  # Current Sando brand
  }
}

# Output matches (or improves) current color.json
```

---

## 📖 References

- [OKLCH Color Space](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Radix Colors](https://www.radix-ui.com/colors)
- [UI Colors Generator](https://uicolors.app/generate)
- [Leonardo (Adobe)](https://leonardocolor.io/)
- [Culori Library](https://culorijs.org/)
- [Material Design 3 Color System](https://m3.material.io/styles/color/system/overview)

---

**Last Updated:** January 2025
**Status:** Ready for Implementation Decision
**Owner:** Rodrigo Lago
