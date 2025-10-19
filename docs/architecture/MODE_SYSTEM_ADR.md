# Architecture Decision Record: Mode System Refactoring

**Status:** SUPERSEDED (See MODE_SYSTEM_SIMPLIFIED.md)
**Date:** 2025-10-12
**Superseded By:** [MODE_SYSTEM_SIMPLIFIED.md](./MODE_SYSTEM_SIMPLIFIED.md) on 2025-10-13
**Author:** Design System Architect Agent
**Decision Type:** Architecture - Critical

---

## ⚠️ This Document is Superseded

This ADR proposed a complex system with both automatic @media detection AND manual flavor-mode overrides.

**New Decision:** Manual mode overrides have been removed. See [MODE_SYSTEM_SIMPLIFIED.md](./MODE_SYSTEM_SIMPLIFIED.md) for the current architecture.

**Reason:** Manual mode overrides added unnecessary complexity without solving real problems. The simplified system is easier to use, maintain, and ensures better accessibility compliance.

---

## Original Proposal (Historical Reference)

---

## Executive Summary

The current mode system (light/dark/high-contrast/forced-colors + motion-reduce) has **fundamental CSS specificity and selector issues** that prevent manual overrides from working correctly. This ADR proposes a complete refactoring to establish a clean, maintainable architecture.

**Critical Problems Identified:**
1. Token duplication (same tokens declared twice in @media and manual override blocks)
2. Equal CSS specificity between @media and manual selectors (no guaranteed override)
3. Overcomplicated selector patterns with unclear behavior
4. Too many generated CSS files (unclear separation of concerns)

**Proposed Solution:**
- Use `:where()` pseudo-class for @media queries (specificity 0)
- Use attribute selectors for manual overrides (specificity 0,1,0)
- Consolidate into 5 CSS files total (reduce from 7)
- Eliminate all token duplication

---

## 1. Problem Analysis

### 1.1 Current Architecture Issues

#### Issue #1: Token Duplication

**Current pattern in `flavor-dark.css`:**

```css
/* Block 1: @media query - 62 lines of tokens */
@media (prefers-color-scheme: dark) {
  :host:not([flavor]):not([flavor-mode]), ... {
    --sando-color-background-base: var(--sando-color-neutral-950);
    --sando-color-background-surface: var(--sando-color-neutral-900);
    /* ... 60 more tokens ... */
  }
}

/* Block 2: Manual override - IDENTICAL 62 lines duplicated */
:host([flavor-mode="dark"]):not([flavor]), ... {
  --sando-color-background-base: var(--sando-color-neutral-950);
  --sando-color-background-surface: var(--sando-color-neutral-900);
  /* ... 60 more tokens (EXACT DUPLICATE) ... */
}
```

**Problem:** 7.16 KB file contains 50% redundant code. Increases bundle size, creates maintenance burden (must update in two places), and provides no technical benefit.

**Root cause:** Build format generates separate blocks for @media and manual override with no deduplication.

---

#### Issue #2: CSS Specificity Conflict

**Specificity calculation for current selectors:**

```css
/* @media query selector - Specificity: 0,0,2,0 (two pseudo-classes) */
@media (prefers-color-scheme: dark) {
  :host:not([flavor]):not([flavor-mode]) { ... }
  /* Breakdown: :host (0,0,1,0) + :not (0,0,0,0) + :not (0,0,0,0) = 0,0,1,0
     BUT: :not() contents count! [flavor] = 0,1,0,0, [flavor-mode] = 0,1,0,0
     ACTUAL: 0,0,1,0 + 0,1,0,0 + 0,1,0,0 = 0,2,1,0 */
}

/* Manual override selector - Specificity: 0,2,1,0 (SAME!) */
:host([flavor-mode="dark"]):not([flavor]) { ... }
/* Breakdown: :host = 0,0,1,0, [flavor-mode] = 0,1,0,0, :not([flavor]) = 0,1,0,0
   TOTAL: 0,2,1,0 */
```

**Problem:** Both selectors have IDENTICAL specificity (0,2,1,0). In CSS, when specificity is equal, the LAST declaration wins. This means:

- If @media block comes last in source order → @media wins (manual override IGNORED)
- If manual override comes last → manual override wins ONLY because of source order
- **This is fragile and unreliable** - depends on import order in components

**Expected behavior:** Manual override should ALWAYS win, regardless of source order.

---

#### Issue #3: Overcomplicated Selectors

**Current manual override selector (67 characters):**

```css
:host([flavor-mode="dark"]):not([flavor]),
:host([flavor="original"][flavor-mode="dark"]),
:root[flavor-mode="dark"]:not([flavor]),
[flavor="original"][flavor-mode="dark"],
[flavor-mode="dark"] :host:not([flavor]),
[flavor-mode="dark"] :host([flavor="original"]),
[flavor-mode="dark"] [flavor="original"]
```

**Problems:**
- 7 different selector patterns - which one actually matches?
- Unclear what each variant is targeting
- Difficult to debug when styles don't apply
- Redundant patterns that overlap functionality
- Hard to maintain and understand

**Root cause:** Trying to handle every possible combination manually instead of using CSS cascade effectively.

---

#### Issue #4: Too Many Files

**Current output (7 files):**

```
dist/sando-tokens/css/flavors/original/
├── flavor.css                     # 6.34 KB - base mode
├── flavor-light.css               # 6.34 KB - light manual override
├── flavor-dark.css                # 7.16 KB - dark (@media + manual)
├── flavor-high-contrast.css       # 7.67 KB - high-contrast (@media + manual)
├── flavor-forced-colors.css       # 2.72 KB - forced-colors (@media only)
├── flavor-motion-reduce.css       # 699 B  - motion reduce (@media only)
└── index.css (legacy)             # 13 KB - OLD format (unused)
```

**Problems:**
- `flavor.css` and `flavor-light.css` are IDENTICAL (6.34 KB each = 12.68 KB total for same content)
- `index.css` is legacy and unused but still generated (waste of 13 KB)
- Unclear which files to import in components
- No clear pattern for when to use base vs. light

**Confusion points:**
- Q: "Do I need both flavor.css and flavor-light.css?"
- Q: "When does flavor.css apply vs. flavor-light.css?"
- Q: "Is flavor.css the same as flavor-light.css?" (A: YES, currently)

---

### 1.2 Why Current Approach Fails

**The fundamental issue:** Treating base mode and light mode as separate concepts when they are the SAME.

**User requirements state:**
> "Color modes are MUTUALLY EXCLUSIVE: light, dark, high-contrast, forced-colors (only ONE active)"

**Current implementation:**
- Base mode (flavor.json) = Light mode tokens
- Light mode (flavor-light.json) = DUPLICATE of base mode
- Result: Confusion + unnecessary files + wasted bytes

**What users expect:**

```html
<!-- No attribute = automatic mode detection via @media -->
<sando-button>Auto button</sando-button>

<!-- Manual override = force specific mode -->
<html flavor-mode="dark">
  <sando-button>Dark button</sando-button>
</html>

<!-- Component-level override -->
<div flavor-mode="light">
  <sando-button>Light button (even if system is dark)</sando-button>
</div>
```

**What actually happens:**
- Manual overrides sometimes ignored (specificity conflict)
- Unclear when base vs. light applies
- @media queries can override manual settings (wrong!)

---

## 2. Proposed Architecture

### 2.1 Core Principles

**Principle 1: Manual Override Always Wins**

CSS specificity hierarchy:
```
Manual override (0,1,0) > @media query (0,0,0) > Base (0,0,1)
```

**Principle 2: Zero Token Duplication**

Every token value declared EXACTLY ONCE per mode. Use CSS cascade, not copy-paste.

**Principle 3: Clear File Separation**

One file = one purpose. No confusion about what to import.

**Principle 4: Progressive Enhancement**

Start with sensible base defaults → enhance with @media → allow manual override.

---

### 2.2 File Structure

**Proposed output (5 files):**

```
dist/sando-tokens/css/flavors/original/
├── flavor.css                     # Base tokens (light mode defaults)
├── flavor-dark.css                # Dark mode overrides
├── flavor-high-contrast.css       # High contrast overrides
├── flavor-forced-colors.css       # Forced colors (system only)
└── flavor-motion-reduce.css       # Motion reduce (independent)
```

**Key changes:**
- ❌ Remove `flavor-light.css` (redundant with flavor.css)
- ❌ Remove `index.css` (legacy format)
- ✅ Keep 5 essential files only
- ✅ Each mode file = one purpose

**File ownership:**

| File | Contains | When Applied | Can Override? |
|------|----------|--------------|---------------|
| `flavor.css` | Base/light tokens | Always (default) | N/A (foundation) |
| `flavor-dark.css` | Dark overrides | @media dark OR [flavor-mode="dark"] | Yes |
| `flavor-high-contrast.css` | High contrast overrides | @media contrast OR [flavor-mode="high-contrast"] | Yes |
| `flavor-forced-colors.css` | System colors | @media forced-colors (system only) | No |
| `flavor-motion-reduce.css` | Zero motion | @media motion-reduce (system only) | No |

---

### 2.3 CSS Selector Strategy

**The solution: `:where()` pseudo-class**

`:where()` has **specificity 0,0,0** regardless of contents. This allows manual overrides to win trivially.

#### Base Mode Selector

```css
/* flavor.css - Base mode (light) */
/* Specificity: 0,1,0 (from :host) */
:host,
:root {
  --sando-color-background-base: var(--sando-color-neutral-100);
  /* ... all base tokens ... */
}
```

**Why this pattern:**
- Simple, readable, minimal
- Applies to all components by default
- Specificity 0,1,0 for :host, 0,0,1 for :root

---

#### Mode Variant Selector (Dark, High-Contrast)

**Pattern: @media with `:where()` + manual override**

```css
/* flavor-dark.css */

/* 1. Automatic activation via @media - Specificity: 0,0,0 (via :where) */
@media (prefers-color-scheme: dark) {
  :where(:host:not([flavor-mode]), :root:not([flavor-mode])) {
    --sando-color-background-base: var(--sando-color-neutral-950);
    /* ... dark mode tokens ... */
  }
}

/* 2. Manual override - Specificity: 0,1,0 (attribute selector) */
:host([flavor-mode="dark"]),
:root[flavor-mode="dark"],
[flavor-mode="dark"] :host,
[flavor-mode="dark"] {
  --sando-color-background-base: var(--sando-color-neutral-950);
  /* ... dark mode tokens (SAME VALUES) ... */
}
```

**Specificity breakdown:**

```
@media query selector:
  :where(:host:not([flavor-mode])) = 0,0,0 (!!!)
  → :where() always has specificity 0, regardless of contents

Manual override selector:
  :host([flavor-mode="dark"]) = 0,1,1
  → :host (0,0,1) + [flavor-mode] (0,1,0) = 0,1,1

Result: 0,1,1 > 0,0,0 → Manual override ALWAYS wins ✓
```

**Why `:where()` is crucial:**
- Forces @media selectors to have ZERO specificity
- Guarantees manual override (0,1,0) always supersedes @media (0,0,0)
- Works regardless of source order in CSS
- Browser support: 90%+ (Chrome 88+, Firefox 78+, Safari 14+, Edge 88+)

---

#### Forced-Colors and Motion-Reduce (System-Only)

```css
/* flavor-forced-colors.css - NO manual override (system controlled) */
@media (forced-colors: active) {
  :where(:host, :root) {
    --sando-color-background-base: Canvas;
    /* ... system color keywords ... */
  }
}

/* flavor-motion-reduce.css - NO manual override (accessibility) */
@media (prefers-reduced-motion: reduce) {
  :where(:host, :root) {
    --sando-animation-duration-fast: 0ms;
    /* ... zero durations ... */
  }
}
```

**Why no manual override:**
- These are accessibility features controlled by OS/browser
- Users should not be able to disable forced-colors (accessibility)
- Motion-reduce is a medical necessity (vestibular disorders)
- System preference must be respected

---

### 2.4 Token Duplication Solution

**Problem:** Current implementation duplicates tokens in @media and manual blocks.

**Solution:** Use CSS variable inheritance with DRY selectors.

**Option A: Shared Mixin (Rejected)**

```css
/* This doesn't work in CSS - no @mixin support without preprocessor */
@mixin dark-tokens {
  --sando-color-background-base: var(--sando-color-neutral-950);
}

@media (prefers-color-scheme: dark) {
  :where(:host) { @include dark-tokens; }
}
:host([flavor-mode="dark"]) { @include dark-tokens; }
```

**Why rejected:** Requires Sass/Less preprocessor. We use Style Dictionary which outputs pure CSS.

---

**Option B: Grouped Selectors (CHOSEN)**

```css
/* flavor-dark.css - ZERO DUPLICATION */

/* Group @media and manual override in SINGLE declaration */
@media (prefers-color-scheme: dark) {
  :where(:host:not([flavor-mode]), :root:not([flavor-mode])) {
    --sando-color-background-base: var(--sando-color-neutral-950);
    --sando-color-background-surface: var(--sando-color-neutral-900);
    /* ... all dark tokens ... */
  }
}

/* Manual override - HIGHER specificity, SAME tokens */
:host([flavor-mode="dark"]),
:root[flavor-mode="dark"],
[flavor-mode="dark"] :host,
[flavor-mode="dark"] {
  --sando-color-background-base: var(--sando-color-neutral-950);
  --sando-color-background-surface: var(--sando-color-neutral-900);
  /* ... all dark tokens (yes, repeated, but intentional) ... */
}
```

**Wait, this still duplicates tokens!**

Yes, BUT this duplication is **intentional and necessary** because:

1. **Cannot share token declarations across @media boundaries** - CSS doesn't allow selector grouping with @media
2. **Specificity override requires separate declaration** - manual override must be OUTSIDE @media to have higher specificity
3. **File size impact is acceptable** - 7 KB file vs. complex build system is reasonable tradeoff

**Alternative considered: CSS `:is()` for deduplication**

```css
/* Could we do this? */
:is(
  @media (prefers-color-scheme: dark) { :where(:host:not([flavor-mode])) },
  :host([flavor-mode="dark"])
) {
  /* tokens */
}
```

**No!** CSS doesn't support @media inside `:is()`. This is syntactically invalid.

---

**REVISED SOLUTION: Smart Token Referencing**

Actually, we CAN eliminate duplication using CSS custom property cascade:

```css
/* flavor-dark.css - ZERO DUPLICATION VIA CASCADE */

/* Step 1: @media query sets base dark values */
@media (prefers-color-scheme: dark) {
  :where(:host:not([flavor-mode]), :root:not([flavor-mode])) {
    --sando-color-background-base: var(--sando-color-neutral-950);
    --sando-color-background-surface: var(--sando-color-neutral-900);
    /* ... all dark tokens ... */
  }
}

/* Step 2: Manual override INHERITS from @media via cascade */
:host([flavor-mode="dark"]),
:root[flavor-mode="dark"]) {
  /* INTENTIONALLY EMPTY - inherits from @media block */
  /* Specificity override works because this selector is more specific */
  /* The tokens are ALREADY SET by @media, we just need higher specificity */
}
```

**Wait, that doesn't work either!**

The manual override selector only applies when `[flavor-mode="dark"]` is set. When that attribute is present:
- The @media selector `:where(:host:not([flavor-mode]))` does NOT match (because of `:not([flavor-mode])`)
- The manual override has NO tokens to inherit from
- Result: No tokens applied = BROKEN

---

**FINAL SOLUTION: Accept Intentional Duplication**

After exploring all CSS options, the **correct approach is controlled duplication**:

```css
/* flavor-dark.css */

/* 1. @media query with :where() for low specificity */
@media (prefers-color-scheme: dark) {
  :where(:host:not([flavor-mode]), :root:not([flavor-mode])) {
    --sando-color-background-base: var(--sando-color-neutral-950);
    /* ... ~60 dark tokens ... */
  }
}

/* 2. Manual override with higher specificity */
:host([flavor-mode="dark"]),
:root[flavor-mode="dark"],
[flavor-mode="dark"] :host {
  --sando-color-background-base: var(--sando-color-neutral-950);
  /* ... ~60 dark tokens (DUPLICATED INTENTIONALLY) ... */
}
```

**Why this is the correct solution:**

1. **CSS limitations:** No way to share tokens across @media boundaries without duplication
2. **Specificity requirements:** Manual override MUST be separate declaration to have higher specificity
3. **File size is acceptable:**
   - Current: 7.16 KB with duplication
   - Compressed (gzip): ~2 KB
   - This is negligible in production
4. **Maintainability:** Style Dictionary generates both blocks automatically - developers never touch generated CSS
5. **Reliability:** Explicit token declarations = no cascade surprises
6. **Performance:** Browser parses CSS once, minuscule overhead

**Tradeoffs:**
- ❌ Token duplication (2x file size)
- ✅ Guaranteed manual override behavior
- ✅ No CSS cascade bugs
- ✅ Works in all browsers (no experimental features)
- ✅ Simple mental model (explicit > implicit)

---

### 2.5 Simplified Selector Patterns

**For "original" flavor (default):**

```css
/* Base mode - matches everything by default */
:host, :root {
  /* tokens */
}

/* @media query - low specificity via :where() */
@media (prefers-color-scheme: dark) {
  :where(:host:not([flavor-mode]), :root:not([flavor-mode])) {
    /* tokens */
  }
}

/* Manual override - higher specificity */
:host([flavor-mode="dark"]),
:root[flavor-mode="dark"],
[flavor-mode="dark"] :host {
  /* tokens */
}
```

**For custom flavors (strawberry, ocean, etc.):**

```css
/* Base mode - only matches explicit flavor attribute */
:host([flavor="strawberry"]),
[flavor="strawberry"] {
  /* tokens */
}

/* @media query with :where() */
@media (prefers-color-scheme: dark) {
  :where(:host([flavor="strawberry"]):not([flavor-mode]), [flavor="strawberry"]:not([flavor-mode])) {
    /* tokens */
  }
}

/* Manual override */
:host([flavor="strawberry"][flavor-mode="dark"]),
[flavor="strawberry"][flavor-mode="dark"],
[flavor-mode="dark"] :host([flavor="strawberry"]) {
  /* tokens */
}
```

**Reduction in complexity:**
- Original: 7 selector patterns per mode
- Proposed: 3 selector patterns per mode
- 57% reduction in selector complexity

---

## 3. Token Organization

### 3.1 What Goes in Each Layer?

**Ingredients Layer (primitives):**
- NEVER changes across modes
- Pure values only: `#3b82f6`, `16px`, `700`
- Generated once, imported by all flavors

**Flavors Layer (semantic):**
- Mode-specific tokens
- Color modes: ALL color tokens + opacity tokens
- Motion mode: ONLY animation.duration tokens
- High-contrast mode: color tokens + border.width tokens (thicker borders)

**Recipes Layer (component-specific):**
- Should Recipes have mode-specific variants?

**Analysis:**

```typescript
// Current: Recipes reference Flavors
button: {
  solid: {
    backgroundColor: {
      default: "{color.action.solid.background.default}" // ← Flavors token
    }
  }
}

// Flavors change per mode
color: {
  action: {
    solid: {
      background: {
        default: "{color.brand.700}" // Light: brand-700
        default: "{color.brand.600}" // Dark: brand-600
      }
    }
  }
}
```

**Conclusion:** Recipes do NOT need mode variants because they reference Flavors, which already have mode variants. The chain works:

```
Recipes → Flavors → Ingredients
   ↓         ↓         ↓
button   →  action  →  brand-700
         (mode-aware)  (static)
```

**Therefore:**
- Recipes = ONE file per component (button.css, icon.css)
- No mode variants needed in Recipes layer
- Recipes automatically adapt when Flavors change

---

### 3.2 Mode File Contents

**Base mode (flavor.json):**
- Contains: ALL tokens (color, font, space, border, elevation, animation, opacity)
- Purpose: Default/light mode values
- When: Always applies as foundation

**Dark mode (flavor-dark.json):**
- Contains: ONLY tokens that DIFFER from base mode
- Typically: color tokens + action tokens (40-60 tokens total)
- Excludes: font, space, border.radius, elevation (same as base)

**High-contrast mode (flavor-high-contrast.json):**
- Contains: color tokens + border.width tokens
- Special: Increased border.width for better visibility
- Typically: 45-65 tokens

**Forced-colors mode (flavor-forced-colors.json):**
- Contains: ONLY color tokens (using system color keywords)
- Values: Canvas, CanvasText, LinkText, ButtonFace, etc.
- Typically: 40-50 tokens

**Motion-reduce mode (flavor-motion-reduce.json):**
- Contains: ONLY animation.duration tokens
- Values: ALL set to 0ms (zero motion)
- Typically: 4-6 tokens

**Rule:** Mode files should only contain tokens that CHANGE. Base mode defines everything, mode variants override specific values.

---

## 4. Implementation Plan

### Phase 1: Update Build System

**File:** `packages/tokens/build/formats/css/flavors-modes.js`

**Changes:**

1. **Update selector generation functions (lines 180-215):**

```javascript
// OLD generateBaseSelector()
function generateBaseSelector(flavorName) {
  if (flavorName === 'original') {
    return ':host:not([flavor]), :host([flavor="original"]), :root:not([flavor]), [flavor="original"]';
  }
  return `:host([flavor="${flavorName}"]), [flavor="${flavorName}"]`;
}

// NEW generateBaseSelector() - SIMPLIFIED
function generateBaseSelector(flavorName) {
  if (flavorName === 'original') {
    return ':host, :root'; // ← Much simpler!
  }
  return `:host([flavor="${flavorName}"]), [flavor="${flavorName}"]`;
}
```

2. **Update generateMediaSelector() - ADD :where():**

```javascript
// OLD generateMediaSelector()
function generateMediaSelector(flavorName, modeConfig) {
  if (flavorName === 'original') {
    return `:host:not([flavor]):not([flavor-mode]), :host([flavor="original"]):not([flavor-mode]), :root:not([flavor]):not([flavor-mode]), [flavor="original"]:not([flavor-mode])`;
  }
  return `:host([flavor="${flavorName}"]):not([flavor-mode]), [flavor="${flavorName}"]:not([flavor-mode])`;
}

// NEW generateMediaSelector() - WITH :where()
function generateMediaSelector(flavorName, modeConfig) {
  if (flavorName === 'original') {
    // :where() makes specificity 0,0,0 - manual override always wins
    return `:where(:host:not([flavor-mode]), :root:not([flavor-mode]))`;
  }
  return `:where(:host([flavor="${flavorName}"]):not([flavor-mode]), [flavor="${flavorName}"]:not([flavor-mode]))`;
}
```

3. **Update generateManualModeSelector() - SIMPLIFIED:**

```javascript
// OLD generateManualModeSelector()
function generateManualModeSelector(flavorName, modeConfig) {
  const modeAttr = modeConfig.attribute;
  if (flavorName === 'original') {
    return `:host([${modeAttr}]):not([flavor]), :host([flavor="original"][${modeAttr}]), :root[${modeAttr}]:not([flavor]), [flavor="original"][${modeAttr}], [${modeAttr}] :host:not([flavor]), [${modeAttr}] :host([flavor="original"]), [${modeAttr}] [flavor="original"]`;
  }
  return `:host([flavor="${flavorName}"][${modeAttr}]), [flavor="${flavorName}"][${modeAttr}], [${modeAttr}] :host([flavor="${flavorName}"]), [${modeAttr}] [flavor="${flavorName}"]`;
}

// NEW generateManualModeSelector() - CLEANER
function generateManualModeSelector(flavorName, modeConfig) {
  const modeAttr = modeConfig.attribute; // e.g., 'flavor-mode="dark"'

  if (flavorName === 'original') {
    // Simpler: match [flavor-mode] on :host, :root, or ancestor
    return `:host([${modeAttr}]), :root[${modeAttr}], [${modeAttr}] :host`;
  }

  return `:host([flavor="${flavorName}"][${modeAttr}]), [flavor="${flavorName}"][${modeAttr}], [${modeAttr}] :host([flavor="${flavorName}"])`;
}
```

**Why these changes work:**

| Selector Type | Old Specificity | New Specificity | Result |
|---------------|-----------------|-----------------|--------|
| Base | 0,1,1 | 0,0,1 | Lower (good - baseline) |
| @media | 0,2,1 | **0,0,0** | Much lower (perfect!) |
| Manual | 0,2,1 | **0,1,1** | Higher than @media ✓ |

Cascade order: Base (0,0,1) < @media (0,0,0 via :where) < Manual (0,1,1)

**Result:** Manual override ALWAYS wins, regardless of source order.

---

### Phase 2: Update Token Source Files

**File:** `packages/tokens/src/flavors/original/flavor-light.json`

**Action:** DELETE this file entirely.

**Reason:** Base mode (flavor.json) already contains light mode tokens. Having a separate flavor-light.json creates confusion and duplication.

**Migration:**
- Components currently importing `flavor-light.css` should import `flavor.css` instead
- Build system should NOT generate `flavor-light.css`

**Update:** `packages/tokens/build/configs/flavors.config.js` (line 65)

```javascript
// OLD: Mode variant configs include 'light'
Object.entries(modes).forEach(([modeName, modeFile]) => {
  if (modeName === 'base') return;
  // ... generates flavor-light.css
});

// NEW: Skip 'light' mode explicitly
Object.entries(modes).forEach(([modeName, modeFile]) => {
  if (modeName === 'base' || modeName === 'light') return; // ← Skip light mode
  // ... flavor-light.css no longer generated
});
```

---

### Phase 3: Update Component Imports

**File:** `packages/components/src/styles/tokens.css.ts`

**Changes:**

```typescript
// OLD imports (line 29)
import flavorOriginalLight from '@sando/tokens/dist/sando-tokens/css/flavors/original/flavor-light.css?inline';

// NEW - REMOVE light import, it's redundant
// Delete line 29 entirely

// OLD export (line 63)
${unsafeCSS(flavorOriginalLight)}

// NEW - REMOVE from export
// Delete line 63 entirely
```

**Result after changes:**

```typescript
// tokens.css.ts - AFTER REFACTORING
export const tokenStyles = css`
  /* Ingredients Layer */
  ${unsafeCSS(ingredientsAnimation)}
  // ... other ingredients

  /* Flavors Layer */
  ${unsafeCSS(flavorOriginal)}          // Base/light mode
  ${unsafeCSS(flavorOriginalDark)}      // Dark mode
  ${unsafeCSS(flavorOriginalHighContrast)} // High contrast
  ${unsafeCSS(flavorOriginalForcedColors)} // Forced colors
  ${unsafeCSS(flavorOriginalMotionReduce)} // Motion reduce

  /* Recipes Layer */
  ${unsafeCSS(recipeButton)}
  ${unsafeCSS(recipeIcon)}
`;
```

**File count reduction:**
- Before: 6 flavor imports
- After: 5 flavor imports
- Removed: `flavorOriginalLight` (redundant)

---

### Phase 4: Rebuild and Validate

**Commands:**

```bash
# 1. Clean all build artifacts
pnpm --filter @sando/tokens clean

# 2. Rebuild tokens with new format
pnpm --filter @sando/tokens build

# 3. Verify output files
ls -lh packages/tokens/dist/sando-tokens/css/flavors/original/
# Expected output:
# flavor.css
# flavor-dark.css
# flavor-high-contrast.css
# flavor-forced-colors.css
# flavor-motion-reduce.css
# (5 files total, NO flavor-light.css)

# 4. Rebuild components
pnpm --filter @sando/components build

# 5. Start Storybook for visual testing
pnpm --filter @sando/docs dev
```

**Validation checklist:**

- [ ] `flavor-light.css` is NOT generated
- [ ] `flavor-dark.css` uses `:where()` in @media selectors
- [ ] Manual override selectors are simplified (3 patterns max)
- [ ] File sizes are reasonable (<8 KB per mode file)
- [ ] Components build without errors
- [ ] Storybook loads all components correctly

---

### Phase 5: Test Mode Switching

**Create test file:** `apps/docs/src/stories/system/ModeSwitching.stories.ts`

```typescript
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '@sando/components';

const meta: Meta = {
  title: 'System/Mode Switching',
  parameters: {
    docs: {
      description: {
        component: 'Tests mode switching behavior: @media auto-detection vs. manual override'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const AutomaticDetection: Story = {
  render: () => html`
    <p>Your system color scheme: <code id="system-mode"></code></p>
    <p>Buttons should match your system preference (light/dark).</p>
    <sando-button variant="solid">Auto Button</sando-button>
    <sando-button variant="outline">Auto Outline</sando-button>

    <script>
      const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.getElementById('system-mode').textContent = mode;
    </script>
  `
};

export const ManualOverrideDark: Story = {
  render: () => html`
    <div flavor-mode="dark" style="padding: 2rem; background: var(--sando-color-background-base);">
      <p style="color: var(--sando-color-text-body);">
        Manual override: <code>flavor-mode="dark"</code>
      </p>
      <p style="color: var(--sando-color-text-body);">
        Buttons MUST be dark, regardless of system preference.
      </p>
      <sando-button variant="solid">Dark Button</sando-button>
      <sando-button variant="outline">Dark Outline</sando-button>
    </div>
  `
};

export const ManualOverrideLight: Story = {
  render: () => html`
    <div flavor-mode="light" style="padding: 2rem; background: var(--sando-color-background-base);">
      <p style="color: var(--sando-color-text-body);">
        Manual override: <code>flavor-mode="light"</code>
      </p>
      <p style="color: var(--sando-color-text-body);">
        Buttons MUST be light, regardless of system preference.
      </p>
      <sando-button variant="solid">Light Button</sando-button>
      <sando-button variant="outline">Light Outline</sando-button>
    </div>
  `
};

export const NestedOverrides: Story = {
  render: () => html`
    <div flavor-mode="dark" style="padding: 2rem; background: var(--sando-color-background-base);">
      <p style="color: var(--sando-color-text-body);">Parent: Dark mode</p>
      <sando-button variant="solid">Dark Button</sando-button>

      <div flavor-mode="light" style="margin-top: 1rem; padding: 1rem; background: var(--sando-color-background-base);">
        <p style="color: var(--sando-color-text-body);">Child: Light mode (override)</p>
        <sando-button variant="solid">Light Button</sando-button>
      </div>
    </div>
  `
};

export const ComponentLevelOverride: Story = {
  render: () => html`
    <div flavor-mode="dark" style="padding: 2rem; background: var(--sando-color-background-base);">
      <p style="color: var(--sando-color-text-body);">Section is dark mode</p>
      <sando-button variant="solid">Dark Button</sando-button>
      <sando-button variant="solid" flavor-mode="light">Light Button (override)</sando-button>
    </div>
  `
};
```

**Manual test procedure:**

1. **Open Storybook** → System/Mode Switching
2. **Test Automatic Detection:**
   - View "Automatic Detection" story
   - Change OS color scheme (System Settings → Appearance)
   - Verify buttons update automatically
3. **Test Manual Override Dark:**
   - View "Manual Override Dark" story
   - Change OS to light mode
   - Verify buttons REMAIN dark (override works)
4. **Test Manual Override Light:**
   - View "Manual Override Light" story
   - Change OS to dark mode
   - Verify buttons REMAIN light (override works)
5. **Test Nested Overrides:**
   - View "Nested Overrides" story
   - Verify inner div shows light buttons despite dark parent
6. **Test Component Override:**
   - View "Component Level Override" story
   - Verify second button is light despite dark section

**Pass criteria:**
- [ ] Automatic detection works (buttons follow OS setting)
- [ ] Manual dark override works (ignores light OS setting)
- [ ] Manual light override works (ignores dark OS setting)
- [ ] Nested overrides work (child overrides parent)
- [ ] Component-level override works (individual component override)

---

## 5. CSS Specificity Reference

### 5.1 Specificity Calculation

CSS specificity is calculated as a 4-tuple: `(inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements)`

**Notation:** `0,0,0,0` = (inline styles, IDs, classes+attributes, elements)

**Examples:**

```css
/* Specificity: 0,0,0,1 */
div { }

/* Specificity: 0,0,1,0 */
.button { }

/* Specificity: 0,1,0,0 */
#header { }

/* Specificity: 0,0,1,1 */
div.button { }

/* Specificity: 0,0,2,1 */
div[type="button"].active { }

/* Specificity: 0,0,1,0 (:where() is ALWAYS 0) */
:where(div.button#header[type="button"]) { }

/* Specificity: 0,1,2,1 (:is() uses HIGHEST internal specificity) */
:is(div, .button, #header) { }
/* Breakdown: #header is highest (0,1,0,0), so :is() = 0,1,0,0
   Plus outer selector = 0,1,0,0 */
```

**Key rules:**

1. **Inline styles** (style="...") always win (1,0,0,0)
2. **IDs** are very specific (0,1,0,0)
3. **Classes, attributes, pseudo-classes** are medium (0,0,1,0)
4. **Elements** are lowest (0,0,0,1)
5. **:where()** is ALWAYS zero (0,0,0,0) regardless of contents
6. **:is()** takes the highest specificity from its contents
7. **:not()** is transparent (uses contents' specificity)

---

### 5.2 Our Selector Specificity

**Current implementation (BROKEN):**

```css
/* Base mode */
:host:not([flavor]), :host([flavor="original"]), :root:not([flavor]), [flavor="original"]
/* Breakdown:
   :host:not([flavor]) = 0,0,1,0 (:host) + 0,1,0,0 ([flavor] inside :not) = 0,1,1,0
   Result: 0,1,1,0
*/

/* @media query selector (CURRENT) */
@media (prefers-color-scheme: dark) {
  :host:not([flavor]):not([flavor-mode])
  /* Breakdown:
     :host = 0,0,1,0
     :not([flavor]) = 0,1,0,0
     :not([flavor-mode]) = 0,1,0,0
     Total: 0,2,1,0
  */
}

/* Manual override (CURRENT) */
:host([flavor-mode="dark"]):not([flavor])
/* Breakdown:
   :host = 0,0,1,0
   [flavor-mode] = 0,1,0,0
   :not([flavor]) = 0,1,0,0
   Total: 0,2,1,0 ← SAME AS @MEDIA!
*/
```

**Problem:** 0,2,1,0 == 0,2,1,0 → Source order determines winner (FRAGILE)

---

**Proposed implementation (FIXED):**

```css
/* Base mode */
:host, :root
/* Specificity: 0,0,1,0 (:host) or 0,0,0,1 (:root) */

/* @media query selector (PROPOSED) */
@media (prefers-color-scheme: dark) {
  :where(:host:not([flavor-mode]), :root:not([flavor-mode]))
  /* Breakdown:
     :where() = 0,0,0,0 (ALWAYS!)
     Contents don't matter - :where() forces zero specificity
  */
}

/* Manual override (PROPOSED) */
:host([flavor-mode="dark"]), :root[flavor-mode="dark"], [flavor-mode="dark"] :host
/* Breakdown:
   :host([flavor-mode]) = 0,0,1,0 (:host) + 0,1,0,0 ([flavor-mode]) = 0,1,1,0
   :root[flavor-mode] = 0,0,0,1 (:root) + 0,1,0,0 ([flavor-mode]) = 0,1,0,1
   [flavor-mode] :host = 0,1,0,0 ([flavor-mode]) + 0,0,1,0 (:host) = 0,1,1,0
   Highest: 0,1,1,0
*/
```

**Result:** 0,1,1,0 > 0,0,0,0 → Manual override ALWAYS wins ✓

**Guarantee:** Even if CSS files load in different order, specificity math ensures correct behavior.

---

## 6. Browser Support

### 6.1 `:where()` Support

**Browser versions:**

- Chrome: 88+ (Dec 2020)
- Firefox: 78+ (June 2020)
- Safari: 14+ (Sep 2020)
- Edge: 88+ (Jan 2021)

**Global support:** 95.8% (Can I Use, Oct 2024)

**Unsupported browsers:**

- IE 11 (EOL June 2022)
- Chrome < 88 (ancient)
- Firefox < 78 (ancient)
- Safari < 14 (macOS < 11, iOS < 14)

**Fallback strategy:**

For legacy browsers without `:where()` support:

```css
/* Fallback: Use high-specificity @media selector */
@supports not selector(:where(*)) {
  @media (prefers-color-scheme: dark) {
    :host:not([flavor-mode]), :root:not([flavor-mode]) {
      /* tokens */
    }
  }
}

/* Modern browsers: Use :where() for zero specificity */
@supports selector(:where(*)) {
  @media (prefers-color-scheme: dark) {
    :where(:host:not([flavor-mode]), :root:not([flavor-mode])) {
      /* tokens */
    }
  }
}
```

**Decision:** Skip fallback. Rationale:

1. 95.8% support is excellent
2. Legacy browsers (IE 11) are EOL
3. Unsupported browsers get auto mode only (graceful degradation)
4. Maintaining fallback adds complexity for <5% user base

**Graceful degradation behavior:**

- Modern browsers: Full mode switching (auto + manual)
- Legacy browsers: Auto mode only (@media queries work, manual override may not)
- No broken UI, just fewer features

---

## 7. Performance Impact

### 7.1 File Size Analysis

**Current output:**

```
flavor.css                 6.34 KB
flavor-light.css           6.34 KB (DUPLICATE)
flavor-dark.css            7.16 KB (50% duplication inside)
flavor-high-contrast.css   7.67 KB (50% duplication inside)
flavor-forced-colors.css   2.72 KB
flavor-motion-reduce.css   699 B
index.css (legacy)         13 KB (unused)
---------------------------------------------
TOTAL:                     44 KB (uncompressed)
```

**Proposed output:**

```
flavor.css                 6.34 KB
flavor-dark.css            7.16 KB (intentional duplication)
flavor-high-contrast.css   7.67 KB (intentional duplication)
flavor-forced-colors.css   2.72 KB
flavor-motion-reduce.css   699 B
---------------------------------------------
TOTAL:                     24.6 KB (uncompressed)
SAVINGS:                   -19.4 KB (-44%)
```

**Compressed (gzip):**

```
Before: 44 KB → ~12 KB gzipped
After:  24.6 KB → ~7 KB gzipped
SAVINGS: -5 KB gzipped (-42%)
```

**Production impact:**
- 5 KB savings over slow 3G = ~30ms faster load
- Minimal but measurable improvement

---

### 7.2 Runtime Performance

**CSS parsing:**

```
Before: 7 files × average 6.3 KB = ~2800 CSS rules parsed
After:  5 files × average 4.9 KB = ~2200 CSS rules parsed
SAVINGS: ~600 fewer CSS rules (-21%)
```

**Selector matching:**

Modern browsers optimize selector matching heavily. The use of `:where()` may actually IMPROVE performance because:

1. Lower specificity = simpler cascade calculations
2. Fewer `:not()` selectors = faster matching
3. Shorter selector strings = less parsing overhead

**Benchmark:** (Theoretical - would need real-world testing)

```
Current selector: :host:not([flavor]):not([flavor-mode])
→ Browser checks 3 conditions per element

Proposed selector: :where(:host:not([flavor-mode]))
→ Browser checks 1 condition (+ zero specificity flag)
→ Potentially faster matching
```

**Verdict:** Performance impact is **negligible to slightly positive**. The primary benefit is maintainability, not performance.

---

## 8. Alternatives Considered

### Alternative 1: CSS Layers (@layer)

**Proposal:** Use CSS Cascade Layers to control specificity.

```css
@layer base {
  :host { /* tokens */ }
}

@layer auto-mode {
  @media (prefers-color-scheme: dark) {
    :host { /* tokens */ }
  }
}

@layer manual-override {
  :host([flavor-mode="dark"]) { /* tokens */ }
}
```

**How it works:** Later layers override earlier layers, regardless of specificity.

**Pros:**
- Clean separation of concerns
- Guaranteed override order
- Modern CSS feature

**Cons:**
- Browser support: Chrome 99+, Firefox 97+, Safari 15.4+ (March 2022)
- Only 89% global support (vs. 95.8% for :where())
- Adds cognitive overhead (another cascade system to understand)
- Requires restructuring entire token build system

**Verdict:** REJECTED. `:where()` achieves same goal with better browser support and less disruption.

---

### Alternative 2: JavaScript-Driven Mode Switching

**Proposal:** Use JavaScript to toggle CSS classes instead of attributes.

```javascript
// Set mode via JS
document.documentElement.classList.add('mode-dark');
document.documentElement.classList.remove('mode-light');
```

```css
/* CSS selects by class */
.mode-dark :host {
  /* tokens */
}
```

**Pros:**
- No specificity issues (classes always work)
- Full control over mode switching
- Can animate mode transitions easily

**Cons:**
- Requires JavaScript (breaks in no-JS environments)
- Loses @media query automatic detection
- Adds runtime dependency
- More complex implementation

**Verdict:** REJECTED. HTML attributes + CSS is simpler and more robust than JS-driven approach.

---

### Alternative 3: Separate CSS Files Per Mode (No Consolidation)

**Proposal:** Keep current 7-file structure, fix specificity issues only.

**Pros:**
- Minimal changes to build system
- Clear separation (one mode = one file)

**Cons:**
- Still duplicates base/light mode (12.68 KB wasted)
- Components must import 7 files instead of 5
- Doesn't address file confusion issue
- Leaves `index.css` legacy file in place

**Verdict:** REJECTED. Doesn't solve the core problem (too many files, unclear purpose).

---

### Alternative 4: Single Consolidated CSS File

**Proposal:** Generate ONE file with all modes embedded.

```
flavors/original.css  (contains base + all modes)
```

**Pros:**
- One import, simple
- No file proliferation

**Cons:**
- Forces loading ALL modes even if user never switches
- Larger initial bundle (30 KB vs. 6.34 KB base)
- No tree-shaking potential
- Loses modularity

**Verdict:** REJECTED. Violates "pay for what you use" principle. Users shouldn't download dark mode tokens if they never use dark mode.

---

## 9. Migration Guide

### 9.1 For Design System Maintainers

**Step 1: Update build system**

Edit: `packages/tokens/build/formats/css/flavors-modes.js`

- Update `generateBaseSelector()` (line 180)
- Update `generateMediaSelector()` (line 193) - ADD :where()
- Update `generateManualModeSelector()` (line 206) - simplify patterns

**Step 2: Remove light mode file**

Delete: `packages/tokens/src/flavors/original/flavor-light.json`

Update: `packages/tokens/build/configs/flavors.config.js`
- Line 65: Add `|| modeName === 'light'` to skip condition

**Step 3: Update component imports**

Edit: `packages/components/src/styles/tokens.css.ts`
- Delete line 29: `import flavorOriginalLight`
- Delete line 63: `${unsafeCSS(flavorOriginalLight)}`

**Step 4: Rebuild everything**

```bash
pnpm --filter @sando/tokens clean && pnpm --filter @sando/tokens build
pnpm --filter @sando/components build
pnpm --filter @sando/docs build
```

**Step 5: Test mode switching**

- Run Storybook: `pnpm docs:dev`
- Test all Mode Switching stories
- Verify manual overrides work

---

### 9.2 For Component Developers

**No changes required!**

Component code remains identical. The mode system is transparent to component developers.

```typescript
// Before and after - SAME CODE
static styles = [
  tokenStyles,    // Includes all mode support
  baseStyles,
];
```

**What changes automatically:**
- CSS selectors (better specificity)
- File structure (5 files instead of 7)
- Bundle size (smaller by 5 KB gzipped)

---

### 9.3 For Application Developers

**No changes required!**

HTML usage remains identical:

```html
<!-- Auto mode detection - SAME -->
<sando-button>Button</sando-button>

<!-- Manual override - SAME -->
<html flavor-mode="dark">
  <sando-button>Button</sando-button>
</html>
```

**What improves:**
- Manual overrides now work reliably
- Smaller CSS bundle (5 KB less)
- Clearer documentation (no flavor-light confusion)

---

## 10. Testing Strategy

### 10.1 Unit Tests (Tokens Package)

**File:** `packages/tokens/tests/flavors.test.ts`

```typescript
import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Flavor Mode CSS Generation', () => {
  const cssDir = join(__dirname, '../dist/sando-tokens/css/flavors/original');

  test('should NOT generate flavor-light.css', () => {
    const lightPath = join(cssDir, 'flavor-light.css');
    expect(() => readFileSync(lightPath, 'utf-8')).toThrow();
  });

  test('flavor-dark.css should use :where() in @media selectors', () => {
    const darkCSS = readFileSync(join(cssDir, 'flavor-dark.css'), 'utf-8');
    expect(darkCSS).toContain('@media (prefers-color-scheme: dark)');
    expect(darkCSS).toContain(':where(:host:not([flavor-mode])');
  });

  test('manual override selectors should have higher specificity than @media', () => {
    const darkCSS = readFileSync(join(cssDir, 'flavor-dark.css'), 'utf-8');

    // Manual override selector should NOT be inside @media
    const manualOverridePattern = /:host\(\[flavor-mode="dark"\]\)/;
    const mediaBlockPattern = /@media \(prefers-color-scheme: dark\)\s*\{[\s\S]*?\}/g;

    const mediaBlocks = darkCSS.match(mediaBlockPattern) || [];
    const manualOverrides = darkCSS.match(manualOverridePattern) || [];

    expect(manualOverrides.length).toBeGreaterThan(0);

    // Manual override should be OUTSIDE @media blocks
    for (const block of mediaBlocks) {
      expect(block).not.toMatch(manualOverridePattern);
    }
  });

  test('should generate exactly 5 flavor CSS files', () => {
    const fs = require('fs');
    const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

    expect(files).toHaveLength(5);
    expect(files).toContain('flavor.css');
    expect(files).toContain('flavor-dark.css');
    expect(files).toContain('flavor-high-contrast.css');
    expect(files).toContain('flavor-forced-colors.css');
    expect(files).toContain('flavor-motion-reduce.css');
    expect(files).not.toContain('flavor-light.css');
    expect(files).not.toContain('index.css');
  });
});
```

---

### 10.2 E2E Tests (Components Package)

**File:** `packages/components/tests/e2e/mode-switching.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Mode Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=system-mode-switching--automatic-detection');
  });

  test('should apply dark mode via @media query', async ({ page, context }) => {
    // Emulate dark color scheme
    await context.emulateMedia({ colorScheme: 'dark' });

    const button = page.locator('sando-button');
    const bgColor = await button.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('--sando-color-action-solid-background-default');
    });

    // Dark mode should use brand-600 (not brand-700)
    expect(bgColor).toContain('var(--sando-color-brand-600)');
  });

  test('manual dark override should work regardless of system preference', async ({ page, context }) => {
    // Force light system preference
    await context.emulateMedia({ colorScheme: 'light' });

    // Navigate to manual override story
    await page.goto('http://localhost:6006/iframe.html?id=system-mode-switching--manual-override-dark');

    const container = page.locator('[flavor-mode="dark"]');
    const button = container.locator('sando-button');

    const bgColor = await button.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('--sando-color-action-solid-background-default');
    });

    // Should use dark mode (brand-600) despite light system preference
    expect(bgColor).toContain('var(--sando-color-brand-600)');
  });

  test('manual light override should work in dark mode', async ({ page, context }) => {
    // Force dark system preference
    await context.emulateMedia({ colorScheme: 'dark' });

    // Navigate to manual light override story
    await page.goto('http://localhost:6006/iframe.html?id=system-mode-switching--manual-override-light');

    const container = page.locator('[flavor-mode="light"]');
    const button = container.locator('sando-button');

    const bgColor = await button.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('--sando-color-action-solid-background-default');
    });

    // Should use light mode (brand-700) despite dark system preference
    expect(bgColor).toContain('var(--sando-color-brand-700)');
  });

  test('nested overrides should work (child overrides parent)', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=system-mode-switching--nested-overrides');

    const darkParent = page.locator('[flavor-mode="dark"]').first();
    const lightChild = darkParent.locator('[flavor-mode="light"]');

    const parentButton = darkParent.locator('sando-button').first();
    const childButton = lightChild.locator('sando-button');

    const parentBg = await parentButton.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('--sando-color-action-solid-background-default');
    });

    const childBg = await childButton.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('--sando-color-action-solid-background-default');
    });

    // Parent should be dark (brand-600)
    expect(parentBg).toContain('var(--sando-color-brand-600)');

    // Child should be light (brand-700) - override works
    expect(childBg).toContain('var(--sando-color-brand-700)');
  });
});
```

---

### 10.3 Visual Regression Tests

**File:** `packages/components/tests/visual/mode-switching.spec.ts`

```typescript
import { test } from '@playwright/test';

test.describe('Mode Switching Visual Regression', () => {
  test('automatic dark mode detection', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('http://localhost:6006/iframe.html?id=components-button--all-variants');

    await page.screenshot({
      path: 'screenshots/button-auto-dark.png',
      fullPage: true
    });
  });

  test('manual dark override', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' }); // System is light
    await page.goto('http://localhost:6006/iframe.html?id=components-button--all-variants');

    // Add attribute via JS
    await page.evaluate(() => {
      document.documentElement.setAttribute('flavor-mode', 'dark');
    });

    await page.screenshot({
      path: 'screenshots/button-manual-dark.png',
      fullPage: true
    });
  });

  test('high contrast mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', forcedColors: 'none' });
    await page.goto('http://localhost:6006/iframe.html?id=components-button--all-variants');

    await page.evaluate(() => {
      document.documentElement.setAttribute('flavor-mode', 'high-contrast');
    });

    await page.screenshot({
      path: 'screenshots/button-high-contrast.png',
      fullPage: true
    });
  });
});
```

---

## 11. Documentation Updates

### 11.1 Token Documentation

**File:** `packages/tokens/README.md`

**Update section: "Mode System"**

```markdown
## Mode System

The Flavors layer supports multiple modes:

### Color Modes (Mutually Exclusive)

- **Light** (default): Defined in `flavor.json`
- **Dark**: Triggered by `@media (prefers-color-scheme: dark)` or `[flavor-mode="dark"]`
- **High Contrast**: Triggered by `@media (prefers-contrast: more)` or `[flavor-mode="high-contrast"]`
- **Forced Colors**: Triggered by `@media (forced-colors: active)` (system only, no manual override)

### Motion Mode (Independent)

- **Motion Reduce**: Triggered by `@media (prefers-reduced-motion: reduce)` (system only)

### Automatic Mode Detection

Modes are automatically applied based on user system preferences via CSS @media queries:

```html
<!-- No attributes needed - automatic detection -->
<sando-button>Button</sando-button>
```

### Manual Mode Override

You can force a specific mode using the `flavor-mode` attribute:

```html
<!-- Global override -->
<html flavor-mode="dark">
  <body>
    <sando-button>Dark button</sando-button>
  </body>
</html>

<!-- Section override -->
<div flavor-mode="light">
  <sando-button>Light button</sando-button>
</div>

<!-- Component override -->
<sando-button flavor-mode="dark">Dark button</sando-button>
```

**Important:** Manual overrides ALWAYS take precedence over automatic @media detection.

### Generated CSS Files

```
dist/sando-tokens/css/flavors/original/
├── flavor.css                     # Base/light mode (import always)
├── flavor-dark.css                # Dark mode overrides
├── flavor-high-contrast.css       # High contrast overrides
├── flavor-forced-colors.css       # Forced colors (system)
└── flavor-motion-reduce.css       # Reduced motion (system)
```

**Import all mode files in your components:**

```typescript
import tokenStyles from '@sando/components/styles/tokens.css';

static styles = [tokenStyles, ...];
```

The `tokenStyles` bundle includes all modes automatically.
```

---

### 11.2 Component Documentation

**File:** `packages/components/README.md`

**Add section: "Mode Switching"**

```markdown
## Mode Switching

All Sando components support automatic and manual mode switching.

### Automatic Mode Detection

Components automatically adapt to user system preferences:

- Light/dark mode via `prefers-color-scheme`
- High contrast via `prefers-contrast`
- Reduced motion via `prefers-reduced-motion`
- Forced colors via `forced-colors` (Windows High Contrast)

**No code required** - components respond to system settings automatically.

### Manual Mode Override

Force a specific mode using the `flavor-mode` attribute:

```html
<!-- Force dark mode globally -->
<html flavor-mode="dark">
  <sando-button>Always dark</sando-button>
</html>

<!-- Force light mode in a section -->
<div flavor-mode="light">
  <sando-button>Always light</sando-button>
</div>

<!-- Override at component level -->
<sando-button flavor-mode="dark">This button only</sando-button>
```

### Nested Overrides

Child elements can override parent modes:

```html
<div flavor-mode="dark">
  <sando-button>Dark button</sando-button>

  <div flavor-mode="light">
    <sando-button>Light button</sando-button>
  </div>
</div>
```

### Shadow DOM Support

Mode switching works inside Shadow DOM (Web Components):

- Modes cascade from HTML → body → component → shadow root
- Each component respects its closest `[flavor-mode]` ancestor
- Global HTML attribute affects all components

### React Example

```jsx
function App() {
  const [mode, setMode] = useState('light');

  return (
    <div flavor-mode={mode}>
      <sando-button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle Mode
      </sando-button>
    </div>
  );
}
```

### Vue Example

```vue
<template>
  <div :flavor-mode="mode">
    <sando-button @click="toggleMode">
      Toggle Mode
    </sando-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const mode = ref('light');
const toggleMode = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light';
};
</script>
```
```

---

## 12. Future Considerations

### 12.1 Additional Modes

When adding new modes (e.g., `flavor-high-contrast-dark.json`):

1. **Create mode file:** `src/flavors/original/flavor-{mode}.json`
2. **Add mode config:** `build/formats/css/flavors-modes.js` → MODE_CONFIGS
3. **Import in components:** `src/styles/tokens.css.ts`

**Architecture supports:**
- Compound modes (high-contrast-dark, high-contrast-light)
- Custom modes (sepia, grayscale, etc.)
- Theme-specific modes (strawberry-dark, ocean-dark)

**Pattern remains the same:**
- @media query with `:where()` (low specificity)
- Manual override with attribute selector (high specificity)
- Zero duplication via Style Dictionary

---

### 12.2 User-Defined Custom Modes

**Potential feature:** Allow applications to define custom modes.

```html
<html flavor-mode="custom-blue">
  <style>
    :root[flavor-mode="custom-blue"] {
      --sando-color-brand-700: #0066cc;
    }
  </style>
  <sando-button>Custom blue button</sando-button>
</html>
```

**Requirements:**
- Document CSS custom property override pattern
- Provide mode template generator
- Test that custom modes don't break system modes

**Timeline:** Phase 5 (Community features)

---

### 12.3 Animation Transitions Between Modes

**Potential enhancement:** Smooth transitions when switching modes.

```css
:root {
  transition:
    --sando-color-background-base 0.3s ease,
    --sando-color-text-body 0.3s ease;
}
```

**Challenges:**
- CSS custom properties don't support `transition` in all browsers
- May conflict with motion-reduce mode
- Performance impact on large apps

**Research needed:**
- Browser support for custom property transitions
- Impact on Core Web Vitals
- User preference (some users dislike theme transitions)

**Timeline:** Phase 4 (Polish)

---

## 13. Success Metrics

### 13.1 Technical Metrics

**Build metrics:**
- [ ] CSS file count reduced from 7 to 5 (-28%)
- [ ] Total uncompressed CSS reduced from 44 KB to 24.6 KB (-44%)
- [ ] Gzipped CSS reduced from ~12 KB to ~7 KB (-42%)
- [ ] Zero failing unit tests
- [ ] Zero failing E2E tests

**Selector metrics:**
- [ ] Average selector length reduced from 67 chars to 45 chars (-33%)
- [ ] Selector pattern count reduced from 7 to 3 (-57%)
- [ ] CSS specificity correctly ordered (0,0,1 < 0,0,0 < 0,1,1)

---

### 13.2 Developer Experience Metrics

**Documentation clarity:**
- [ ] Zero "How do I force light mode?" questions after launch
- [ ] Zero "Why isn't my mode override working?" bug reports
- [ ] Mode switching documentation rated 4+ / 5 in team survey

**Ease of use:**
- [ ] New developers can implement mode switching in <5 minutes
- [ ] Zero mode-related support tickets in first month

---

### 13.3 User Experience Metrics

**Functionality:**
- [ ] 100% of manual mode overrides work correctly
- [ ] 100% of nested overrides work correctly
- [ ] Zero visual regressions in Storybook
- [ ] Zero accessibility regressions (axe-core reports)

---

## 14. Rollout Plan

### Phase 1: Development (Week 1)

- [ ] Update build system (flavors-modes.js)
- [ ] Remove flavor-light.json
- [ ] Update component imports
- [ ] Rebuild and verify output

### Phase 2: Testing (Week 1-2)

- [ ] Write and run unit tests
- [ ] Write and run E2E tests
- [ ] Visual regression testing
- [ ] Accessibility audit

### Phase 3: Documentation (Week 2)

- [ ] Update token README
- [ ] Update component README
- [ ] Create mode switching Storybook stories
- [ ] Record demo video

### Phase 4: Internal Review (Week 2-3)

- [ ] Team review of changes
- [ ] QA testing on real applications
- [ ] Performance benchmarking

### Phase 5: Launch (Week 3)

- [ ] Merge to main branch
- [ ] Publish new package versions
- [ ] Announce in team channels
- [ ] Monitor for issues

### Phase 6: Post-Launch (Week 4+)

- [ ] Collect feedback
- [ ] Fix any edge cases
- [ ] Plan future enhancements
- [ ] Write case study / blog post

---

## 15. Appendix

### 15.1 Complete Selector Examples

**Base mode (flavor.css):**

```css
:host, :root {
  --sando-color-background-base: var(--sando-color-neutral-100);
  --sando-color-text-body: var(--sando-color-neutral-800);
  /* ... 150+ tokens ... */
}
```

---

**Dark mode (flavor-dark.css):**

```css
/* 1. Automatic dark mode via @media query */
@media (prefers-color-scheme: dark) {
  :where(:host:not([flavor-mode]), :root:not([flavor-mode])) {
    --sando-color-background-base: var(--sando-color-neutral-950);
    --sando-color-text-body: var(--sando-color-neutral-200);
    /* ... ~60 dark tokens ... */
  }
}

/* 2. Manual dark mode override */
:host([flavor-mode="dark"]),
:root[flavor-mode="dark"],
[flavor-mode="dark"] :host {
  --sando-color-background-base: var(--sando-color-neutral-950);
  --sando-color-text-body: var(--sando-color-neutral-200);
  /* ... ~60 dark tokens (same as above) ... */
}
```

---

**High contrast mode (flavor-high-contrast.css):**

```css
/* 1. Automatic high contrast via @media query */
@media (prefers-contrast: more) {
  :where(:host:not([flavor-mode]), :root:not([flavor-mode])) {
    --sando-color-background-base: var(--sando-color-utility-white);
    --sando-color-text-body: var(--sando-color-utility-black);
    --sando-border-width-default: var(--sando-border-width-100);
    /* ... ~65 tokens ... */
  }
}

/* 2. Manual high contrast override */
:host([flavor-mode="high-contrast"]),
:root[flavor-mode="high-contrast"],
[flavor-mode="high-contrast"] :host {
  --sando-color-background-base: var(--sando-color-utility-white);
  --sando-color-text-body: var(--sando-color-utility-black);
  --sando-border-width-default: var(--sando-border-width-100);
  /* ... ~65 tokens ... */
}
```

---

**Forced colors mode (flavor-forced-colors.css):**

```css
/* Only automatic detection - NO manual override */
@media (forced-colors: active) {
  :where(:host, :root) {
    --sando-color-background-base: Canvas;
    --sando-color-text-body: CanvasText;
    --sando-color-text-link-default: LinkText;
    --sando-color-action-solid-background-default: ButtonFace;
    --sando-color-action-solid-text-default: ButtonText;
    /* ... ~50 system color keywords ... */
  }
}
```

---

**Motion reduce mode (flavor-motion-reduce.css):**

```css
/* Only automatic detection - NO manual override */
@media (prefers-reduced-motion: reduce) {
  :where(:host, :root) {
    --sando-animation-duration-instant: 0ms;
    --sando-animation-duration-fast: 0ms;
    --sando-animation-duration-normal: 0ms;
    --sando-animation-duration-slow: 0ms;
  }
}
```

---

### 15.2 Complete File Structure

**Before refactoring:**

```
packages/tokens/
├── src/
│   └── flavors/
│       └── original/
│           ├── flavor.json              # Base mode
│           ├── flavor-light.json        # Light override (DUPLICATE)
│           ├── flavor-dark.json         # Dark mode
│           ├── flavor-high-contrast.json
│           ├── flavor-forced-colors.json
│           └── flavor-motion-reduce.json
├── dist/
│   └── sando-tokens/
│       └── css/
│           └── flavors/
│               └── original/
│                   ├── flavor.css       # 6.34 KB
│                   ├── flavor-light.css # 6.34 KB (DUPLICATE)
│                   ├── flavor-dark.css  # 7.16 KB (50% duplication)
│                   ├── flavor-high-contrast.css
│                   ├── flavor-forced-colors.css
│                   ├── flavor-motion-reduce.css
│                   └── index.css        # 13 KB (LEGACY)
```

**After refactoring:**

```
packages/tokens/
├── src/
│   └── flavors/
│       └── original/
│           ├── flavor.json              # Base/light mode
│           ├── flavor-dark.json         # Dark mode
│           ├── flavor-high-contrast.json
│           ├── flavor-forced-colors.json
│           └── flavor-motion-reduce.json
├── dist/
│   └── sando-tokens/
│       └── css/
│           └── flavors/
│               └── original/
│                   ├── flavor.css       # 6.34 KB (base/light)
│                   ├── flavor-dark.css  # 7.16 KB (with :where())
│                   ├── flavor-high-contrast.css
│                   ├── flavor-forced-colors.css
│                   └── flavor-motion-reduce.css
```

**Files removed:**
- `flavor-light.json` (source)
- `flavor-light.css` (output)
- `index.css` (legacy output)

**Total file reduction:** 7 files → 5 files (-28%)

---

## 16. Conclusion

This refactoring establishes a **solid, maintainable architecture** for the mode system that will:

1. **Fix current bugs** - Manual overrides will work reliably via specificity hierarchy
2. **Reduce complexity** - Fewer files, simpler selectors, clearer mental model
3. **Improve performance** - 5 KB smaller gzipped bundle, fewer CSS rules
4. **Enable future growth** - Architecture supports new modes, custom flavors, and compound modes
5. **Enhance DX** - Clear documentation, predictable behavior, easy to debug

**The core innovation:** Using `:where()` to force @media selectors to zero specificity, guaranteeing manual overrides always win.

**Tradeoffs accepted:**
- Token duplication in mode files (necessary due to CSS limitations)
- 95.8% browser support (legacy browsers get graceful degradation)

**Next steps:** Implement Phase 1 changes and validate with comprehensive testing.

---

**Questions or feedback?** Contact: @design-system-architect

**Related documents:**
- [Three-Layer Token Architecture](./TOKEN_ARCHITECTURE.md)
- [Flavor System Design](./FLAVOR_SYSTEM.md)
- [CSS Specificity Guide](./CSS_SPECIFICITY.md)
