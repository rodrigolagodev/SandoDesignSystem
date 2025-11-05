# Color Contrast

**Category**: 04-accessibility
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: UI Designer

---

## Purpose

Ensure all Sando Design System colors meet WCAG 2.1 contrast requirements for text readability and UI component visibility. This guideline defines contrast ratios, automated validation patterns, and tools for maintaining accessible color combinations across all flavors and modes.

**Target**: WCAG 2.1 Level AA compliance (AAA where achievable)
**Scope**: Text, UI components, focus indicators, status colors
**Validation**: Automated token tests + manual verification

---

## Core Rules

### Rule 1: WCAG Contrast Ratios Required (Non-Negotiable)

All text must meet minimum contrast ratios: 4.5:1 for normal text (AA), 7:1 for AAA, and 3:1 for UI components and large text (AA).

**Pattern**:

```css
/* ✅ CORRECT - Meets 4.5:1 AA requirement */
.body-text {
  color: var(--sando-color-text-body); /* #1a1a1a */
  background: var(--sando-color-background-base); /* #ffffff */
  /* Actual contrast: 16.9:1 (exceeds AA and AAA) */
}

/* ✅ CORRECT - Large text with 3:1 AA */
.large-heading {
  font-size: 18pt;
  color: var(--sando-color-text-heading); /* #333333 */
  background: var(--sando-color-background-base); /* #ffffff */
  /* Contrast: 12.6:1 */
}
```

**Anti-pattern**:

```css
/* ❌ WRONG - Only 2.8:1 (fails AA requirement) */
.subtle-text {
  color: #999999;
  background: #ffffff;
}

/* ❌ WRONG - Insufficient UI component contrast */
.button-border {
  border: 1px solid #cccccc; /* Only 1.6:1 against white */
  background: #ffffff;
}
```

**Why**: WCAG 2.1 Level AA is a legal requirement in many jurisdictions. Insufficient contrast causes readability issues for users with low vision, color blindness, or in bright lighting conditions.

**Reference**: [WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

### Rule 2: Automated Contrast Testing

All token combinations must pass automated contrast tests in CI. Tests validate text/background pairs across all flavors and modes.

**Pattern**:

```javascript
// From packages/tokens/tests/accessibility/contrast.test.js
describe("Text contrast requirements", () => {
  it("text-body on background-base meets 4.5:1", () => {
    const textColor = resolveToken("color.text.body");
    const bgColor = resolveToken("color.background.base");
    const ratio = getContrastRatio(textColor, bgColor);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
```

**Token pairs validated**:

- `text-body` / `background-base` → 4.5:1 AA
- `text-heading` / `background-base` → 4.5:1 AA
- `text-link` / `background-base` → 4.5:1 AA
- `border-default` / `background-base` → 3:1 UI components
- `action-solid-text` / `action-solid-background` → 4.5:1 AA
- `success-text` / `background-base` → 4.5:1 AA
- `destructive-text` / `background-base` → 4.5:1 AA

**CI integration**: Tests run on every commit. Failing contrast ratios block merges.

**Why**: Manual testing is error-prone. Automated validation catches regressions immediately and ensures consistency across all token updates.

**Reference**: `packages/tokens/tests/accessibility/contrast.test.js` (lines 143-334)

---

### Rule 3: Large Text Exception

Text ≥18pt (or ≥14pt bold) can use relaxed contrast ratios: 3:1 for AA, 4.5:1 for AAA.

**Pattern**:

```css
/* ✅ CORRECT - Large text with 3.5:1 meets AA */
.hero-heading {
  font-size: 48px; /* 36pt - qualifies as large */
  font-weight: 400;
  color: #595959; /* 3.5:1 against white */
  background: #ffffff;
}

/* ✅ CORRECT - Bold text with 3.2:1 meets AA */
.subheading {
  font-size: 18px; /* 13.5pt */
  font-weight: 700; /* Bold qualifies at ≥14pt */
  color: #5e5e5e; /* 3.2:1 */
}
```

**Anti-pattern**:

```css
/* ❌ WRONG - Small text with large text ratio */
.body {
  font-size: 14px; /* <18pt - needs 4.5:1 */
  color: #767676; /* Only 3.1:1 - fails AA */
}
```

**Size thresholds**:

- **Large text**: ≥18pt (24px) regular OR ≥14pt (18.7px) bold
- **Normal text**: <18pt regular AND <14pt bold

**Why**: Larger text is easier to read with lower contrast. WCAG acknowledges this perceptual difference.

**Reference**: [WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#dfn-large-scale)

---

### Rule 4: UI Component Contrast

Borders, focus indicators, icons, and graphical objects require 3:1 minimum contrast against adjacent colors.

**Pattern**:

```css
/* ✅ CORRECT - Focus indicator with 3.5:1 */
.button:focus {
  outline: 2px solid var(--sando-color-border-focus); /* #0066cc */
  outline-offset: 2px;
  /* Contrast vs white background: 3.5:1 */
}

/* ✅ CORRECT - Border with 3.1:1 */
.input {
  border: 1px solid var(--sando-color-border-default); /* #767676 */
  background: var(--sando-color-background-base); /* #ffffff */
  /* Contrast: 4.5:1 */
}
```

**Anti-pattern**:

```css
/* ❌ WRONG - Insufficient focus indicator */
.button:focus {
  outline: 2px solid #dddddd; /* Only 1.3:1 - invisible */
}

/* ❌ WRONG - Low contrast icon */
.icon-subtle {
  color: #d4d4d4; /* 1.7:1 against white - fails 3:1 */
}
```

**Applies to**:

- Input borders
- Button outlines
- Focus indicators (critical for keyboard navigation)
- Icons (especially interactive icons)
- Chart elements
- Disabled states (exempt but test carefully)

**Why**: WCAG 1.4.11 (Non-text Contrast) ensures UI controls are perceivable. Critical for keyboard users relying on focus indicators.

**Reference**: [WCAG 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

---

### Rule 5: Test Across All Flavors and Modes

Validate contrast in light mode, dark mode, high-contrast mode, and all custom flavors (strawberry, ocean, forest, sunset).

**Pattern**:

```javascript
// Test matrix from contrast.test.js
describe.each(["original", "dark"])("Flavor: %s", (flavor) => {
  it("validates all text/background pairs", () => {
    const tokens = loadFlavorTokens(flavor);
    validateContrastPairs(tokens);
  });
});
```

**Modes to test**:

- **Light mode** (default): `@media (prefers-color-scheme: light)`
- **Dark mode**: `@media (prefers-color-scheme: dark)`
- **High contrast**: `@media (prefers-contrast: more)`
- **Forced colors**: `@media (forced-colors: active)`

**Flavors to test**:

- `original` (default)
- `strawberry`
- `ocean`
- `forest`
- `sunset`

**Why**: Contrast ratios change dramatically in dark mode. A color pair that works in light mode may fail in dark mode. Automated tests must cover all combinations.

**Reference**: `packages/tokens/tests/accessibility/contrast.test.js` (lines 301-334)

---

## WCAG Contrast Criteria

| Content Type                     | AA Ratio | AAA Ratio | WCAG Criteria | Notes                             |
| -------------------------------- | -------- | --------- | ------------- | --------------------------------- |
| Normal text (<18pt)              | 4.5:1    | 7:1       | 1.4.3, 1.4.6  | Body copy, small headings, labels |
| Large text (≥18pt or ≥14pt bold) | 3:1      | 4.5:1     | 1.4.3, 1.4.6  | Large headings, hero text         |
| UI components                    | 3:1      | N/A       | 1.4.11        | Borders, focus rings, icons       |
| Graphical objects                | 3:1      | N/A       | 1.4.11        | Charts, diagrams, infographics    |
| Disabled controls                | Exempt   | Exempt    | N/A           | Test anyway for usability         |

**Sando targets**:

- **AA compliance**: All content (required)
- **AAA compliance**: Headings and body text (stretch goal)
- **3:1 minimum**: All UI components without exception

**Exemptions**:

- Logotypes (brand logos)
- Incidental text (text in photos)
- Inactive UI components (must still be perceivable)

**Reference**: [WCAG 1.4 Distinguishable](https://www.w3.org/WAI/WCAG21/quickref/#distinguishable)

---

## Contrast Calculation

**Contrast ratio formula**:

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
```

Where:

- **L1** = Relative luminance of lighter color (0-1)
- **L2** = Relative luminance of darker color (0-1)
- **0.05** = Constant to avoid division by zero

**Relative luminance formula** (WCAG 2.1):

```
L = 0.2126 × R + 0.7152 × G + 0.0722 × B
```

Where R, G, B are linearized sRGB values (gamma correction applied).

**Implementation**: See `packages/tokens/tests/accessibility/contrast.test.js` lines 62-87 for complete luminance and contrast calculation functions.

**Manual calculation tools**:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Hex/RGB input
- [Contrast Ratio](https://contrast-ratio.com/) - Live preview
- [Coolors Contrast Checker](https://coolors.co/contrast-checker) - Palette testing

**Do NOT implement manually**: Use existing test utilities or online tools. Luminance calculation requires precise gamma correction.

**Reference**: [WCAG Relative Luminance](https://www.w3.org/WAI/GL/wiki/Relative_luminance)

---

## Token-Based Validation

**Automated testing pattern** (from `contrast.test.js`):

```javascript
// 1. Resolve token references
const textColor = resolveTokenValue(tokens.color.text.body);
const bgColor = resolveTokenValue(tokens.color.background.base);

// 2. Convert HSL to RGB
const textRGB = parseHSL(textColor); // "hsl(0, 0%, 10%)" → {r, g, b}
const bgRGB = parseHSL(bgColor);

// 3. Calculate contrast
const ratio = getContrastRatio(textRGB, bgRGB);

// 4. Assert WCAG requirement
expect(ratio).toBeGreaterThanOrEqual(4.5); // AA for normal text
```

**Test coverage** (contrast.test.js):

- Lines 143-173: Text contrast on backgrounds
- Lines 175-203: UI component contrast (borders, focus)
- Lines 205-234: Status colors (success, warning, error)
- Lines 236-278: Link states (default, hover, active, visited)
- Lines 280-299: Dark mode validation
- Lines 301-334: Comprehensive contrast report

**Running tests**:

```bash
# All accessibility tests
pnpm --filter @sando/tokens test:accessibility

# Contrast tests only
pnpm --filter @sando/tokens test contrast.test.js

# Generate contrast report
pnpm --filter @sando/tokens test contrast.test.js --reporter=verbose
```

**CI integration**: Tests run automatically on push. Failed contrast ratios block PR merge.

**Reference**: `packages/tokens/tests/accessibility/contrast.test.js`

---

## Color Palette Guidelines

**OKLCH color space** provides perceptual uniformity, making contrast more predictable than HSL.

**Lightness scale** (OKLCH L: 0-100):

- **0-15**: Very dark - Use for text on light backgrounds
- **15-30**: Dark - Headings, high-emphasis text
- **30-70**: Mid-range - Use carefully, test contrast
- **70-85**: Light - Borders, subtle backgrounds
- **85-100**: Very light - Backgrounds, surfaces

**Safe combinations** (meets 4.5:1 AA):

- **L10 on L95+**: Dark text on light background (typical body text)
- **L5-15 on L90+**: Very dark text on very light (high contrast)
- **L90+ on L5-15**: Light text on dark background (dark mode)
- **L0-20 on L80+**: Maximum contrast for critical text

**Unsafe combinations** (fails 4.5:1):

- **L40 on L60**: Mid-range colors rarely meet AA
- **L50 on L80**: Common mistake - only 2-3:1
- **L70 on L90**: Light on light - decorative only

**Chroma adjustment**: High chroma (saturation) slightly improves contrast at similar lightness. But lightness difference is primary factor.

**Reference**: [COLOR_SYSTEM.md](../01-design-system/COLOR_SYSTEM.md) - OKLCH color space documentation

---

## Tools and Testing

### Automated Tools

| Tool         | Type     | Usage                | Link                                                                                                           |
| ------------ | -------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| Token tests  | CI/Local | Automated validation | `pnpm test:accessibility`                                                                                      |
| axe DevTools | Browser  | Page-wide scan       | [Chrome](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) |
| Lighthouse   | Browser  | Audit report         | Built into Chrome DevTools                                                                                     |
| WAVE         | Browser  | Visual feedback      | [Extension](https://wave.webaim.org/extension/)                                                                |

### Manual Checkers

| Tool                    | Best For         | Link                                                                                  |
| ----------------------- | ---------------- | ------------------------------------------------------------------------------------- |
| WebAIM Contrast Checker | Quick validation | [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) |
| Contrast Ratio          | Live preview     | [contrast-ratio.com](https://contrast-ratio.com/)                                     |
| Who Can Use             | Simulation       | [whocanuse.com](https://www.whocanuse.com/)                                           |
| Coolors Checker         | Palette testing  | [coolors.co/contrast-checker](https://coolors.co/contrast-checker)                    |

### Manual Testing Procedure

1. **Identify colors**: Extract text and background colors from rendered component
2. **Check ratio**: Use WebAIM or Contrast Ratio tool
3. **Verify threshold**: Confirm ≥4.5:1 (AA) or ≥7:1 (AAA)
4. **Test all modes**: Repeat for dark mode, high contrast, forced colors
5. **Test all flavors**: Validate strawberry, ocean, forest, sunset
6. **Document**: Record ratios in component documentation

**Spot check frequency**: Monthly for existing components, always for new tokens.

---

## Common Contrast Issues

| Issue                        | Problem                   | Contrast | Solution                                   |
| ---------------------------- | ------------------------- | -------- | ------------------------------------------ |
| Light gray text on white     | `#999999` on `#ffffff`    | 2.8:1    | Use `#767676` (4.5:1) or darker            |
| Insufficient focus indicator | `#dddddd` border on white | 1.3:1    | Use `#0066cc` (3.5:1)                      |
| Brand color fails            | Custom orange `#ff9900`   | 2.0:1    | Darken to `#cc7a00` (4.6:1)                |
| Placeholder text too light   | `#aaaaaa`                 | 2.3:1    | Use text color at 60% opacity or `#757575` |
| Disabled state invisible     | `#e0e0e0` on white        | 1.6:1    | Use `#999999` (2.8:1) - still perceivable  |
| Success green too light      | `#00ff00`                 | 1.4:1    | Use `#008000` (4.5:1)                      |
| Link color too bright        | `#00bbff`                 | 2.1:1    | Darken to `#0066cc` (4.5:1)                |

**Pattern**: Most issues involve colors in L40-L70 range (mid-luminance). Push to L0-L30 or L80-L100.

**Quick fix**: Adjust OKLCH lightness by ±20 points and retest.

---

## Validation Checklist

### Token Design

- [ ] All text tokens ≥4.5:1 on primary backgrounds
- [ ] Large text tokens ≥3:1 on backgrounds
- [ ] UI component tokens (borders, icons) ≥3:1
- [ ] Focus indicator tokens ≥3:1 against all backgrounds
- [ ] Status colors (success, warning, error) ≥4.5:1
- [ ] Link colors ≥4.5:1 in all states (default, hover, visited)
- [ ] No mid-luminance colors (L40-L60) used for text

### Automated Testing

- [ ] All contrast tests pass: `pnpm test:accessibility`
- [ ] Tests cover all flavors (original, strawberry, ocean, forest, sunset)
- [ ] Tests cover all modes (light, dark, high-contrast)
- [ ] CI blocks merges on contrast failures
- [ ] Contrast report generated and reviewed

### Manual Verification

- [ ] Spot checks with WebAIM Contrast Checker
- [ ] Visual inspection in Storybook (all flavors)
- [ ] Browser DevTools color picker validation
- [ ] axe DevTools scan (0 contrast issues)
- [ ] Lighthouse audit (100/100 Accessibility)

### Color Palette

- [ ] Uses OKLCH for perceptual uniformity
- [ ] Lightness scale documented (L0-L100)
- [ ] Safe combinations listed (L10 on L95, etc.)
- [ ] Unsafe combinations documented (L40 on L60)
- [ ] Chroma adjustments tested for edge cases

### Cross-Flavor Testing

- [ ] Original flavor validated
- [ ] Strawberry flavor validated
- [ ] Ocean flavor validated
- [ ] Forest flavor validated
- [ ] Sunset flavor validated
- [ ] Dark mode tested for all flavors

### Documentation

- [ ] Component docs list contrast ratios
- [ ] Token docs reference WCAG criteria
- [ ] Storybook stories show contrast info
- [ ] Migration guides address contrast changes

---

## Related Guidelines

- [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md) - Overall WCAG 2.1 requirements
- [COLOR_SYSTEM.md](../01-design-system/COLOR_SYSTEM.md) - OKLCH color space and palette design
- [TESTING_STRATEGY.md](../03-development/TESTING_STRATEGY.md) - Automated testing approach
- [SEMANTIC_HTML.md](./SEMANTIC_HTML.md) - Proper color usage in context

---

## External References

- [WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)
- [Who Can Use](https://www.whocanuse.com/) - Vision simulation
- [WCAG Relative Luminance](https://www.w3.org/WAI/GL/wiki/Relative_luminance)

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial guideline extracted from token contrast tests
- WCAG contrast ratios: 4.5:1 AA (text), 7:1 AAA, 3:1 UI components
- Automated validation pattern from `contrast.test.js`
- Token-based testing approach (text/background pairs)
- OKLCH color space guidelines for predictable contrast
- Large text exception (≥18pt or ≥14pt bold uses 3:1 AA)
- UI component contrast requirements (borders, focus, icons)
- Cross-flavor/mode testing (light, dark, high-contrast, forced-colors)
- Contrast calculation formula and luminance reference
- Common issues table (light gray, focus indicators, brand colors)
- Validation checklist (token design, testing, documentation)
- Tools reference (WebAIM, Contrast Ratio, axe DevTools, Lighthouse)
- Agent-optimized: 490 lines (under 500-line limit)

---

**Contrast is measurable, testable, and non-negotiable. Automated validation ensures accessibility from design to production.**
