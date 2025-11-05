# WCAG Compliance

**Category**: 04-accessibility
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: QA Expert

---

## Purpose

Ensure all Sando Design System components meet WCAG 2.1 Level AA standards through automated testing, semantic HTML, and proper ARIA patterns.

---

## Core Rules

### Rule 1: WCAG 2.1 Level AA Compliance (Non-Negotiable)

All components MUST pass WCAG 2.1 Level AA automated testing. Aim for AAA where feasible.

**Pattern**:

```typescript
import { axe, toHaveNoViolations } from "jest-axe";

it("should have no a11y violations", async () => {
  const results = await axe(element);
  expect(results).toHaveNoViolations();
});
```

**Why**: Legal requirement (ADA, Section 508), better UX for all users, inclusive design.

**Reference**: [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

---

### Rule 2: Automated Testing with axe-core (Non-Negotiable)

Every component MUST have `.a11y.test.ts` file using jest-axe with 100% state coverage.

**Pattern**:

```typescript
// sando-button.a11y.test.ts
describe("accessibility", () => {
  it("default state", async () => {
    const el = await fixture("<sando-button>Click</sando-button>");
    expect(await axe(el)).toHaveNoViolations();
  });
});
```

**Why**: Catches 57% of WCAG issues automatically, prevents regressions, fast feedback.

**Reference**: `packages/components/src/components/button/sando-button.a11y.test.ts`

---

### Rule 3: Semantic HTML First

Use native HTML elements over ARIA whenever possible. Progressive enhancement required.

**Pattern**:

```html
<!-- ✅ CORRECT -->
<button type="button">Submit</button>

<!-- ❌ WRONG -->
<div role="button" tabindex="0">Submit</div>
```

**Why**: Native elements have built-in accessibility, keyboard support, screen reader support.

**Reference**: [HTML5 Accessibility](https://www.w3.org/TR/html-aria/)

---

### Rule 4: ARIA Patterns When Needed

Follow WAI-ARIA Authoring Practices. Use ARIA only when semantic HTML insufficient.

**The 5 Rules of ARIA**:

1. Use native HTML if possible
2. Don't change native semantics
3. All interactive ARIA controls must be keyboard accessible
4. Don't use role="presentation" or aria-hidden on focusable elements
5. All interactive elements must have accessible names

**Reference**: [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)

---

### Rule 5: Testing Across States and Themes

Test ALL component states, ALL flavors, ALL modes (dark, high-contrast, reduced motion).

**Pattern**:

```typescript
describe.each(["original", "strawberry", "ocean"])("flavor: %s", (flavor) => {
  it("meets contrast requirements", async () => {
    const el = await fixture(
      `<div flavor="${flavor}"><sando-button>Test</sando-button></div>`,
    );
    expect(await axe(el)).toHaveNoViolations();
  });
});
```

**Why**: Ensures accessibility across all visual variations and user preferences.

**Reference**: `packages/tokens/tests/accessibility/contrast.test.js`

---

## WCAG 2.1 Success Criteria

**Key criteria for design systems** (see [full spec](https://www.w3.org/WAI/WCAG21/quickref/)):

| Criteria                  | Level | Requirement                       | Design System Impact             |
| ------------------------- | ----- | --------------------------------- | -------------------------------- |
| 1.4.3 Contrast (Minimum)  | AA    | 4.5:1 normal text, 3:1 large text | Token contrast validation        |
| 1.4.6 Contrast (Enhanced) | AAA   | 7:1 normal text, 4.5:1 large text | Color system design              |
| 1.4.11 Non-text Contrast  | AA    | 3:1 UI components                 | Icons, borders, focus indicators |
| 2.1.1 Keyboard            | A     | All functionality via keyboard    | Component interaction design     |
| 2.1.2 No Keyboard Trap    | A     | No focus traps                    | Modal, dialog, overlay patterns  |
| 2.4.7 Focus Visible       | AA    | Visible focus indicator           | Focus ring tokens                |
| 4.1.2 Name, Role, Value   | A     | Accessible names/roles            | ARIA labels, semantic HTML       |
| 4.1.3 Status Messages     | AA    | Status announcements              | aria-live, role="status"         |

**Additional relevant criteria**:

- 1.3.1 Info and Relationships (A) - Semantic structure
- 2.4.3 Focus Order (A) - Logical tab order
- 3.2.1 On Focus (A) - No unexpected context changes
- 3.3.1 Error Identification (A) - Clear error messages
- 3.3.2 Labels or Instructions (A) - Form labels

**Testing approach**:

- Automated: axe-core catches Level A and AA violations
- Manual: Keyboard navigation, screen reader testing
- Color contrast: Token validation tests

---

## Automated Testing

### jest-axe Setup

**Installation** (already configured in Sando):

```bash
pnpm add -D jest-axe @axe-core/playwright
```

**Basic test pattern**:

```typescript
import { fixture, expect } from "@open-wc/testing";
import { axe, toHaveNoViolations } from "jest-axe";
import "./sando-button";

expect.extend(toHaveNoViolations);

describe("sando-button a11y", () => {
  it("should have no violations", async () => {
    const el = await fixture("<sando-button>Click me</sando-button>");
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });
});
```

### Testing All States

**Pattern** from `sando-button.a11y.test.ts`:

```typescript
it("disabled state", async () => {
  const el = await fixture("<sando-button disabled>Disabled</sando-button>");
  expect(await axe(el)).toHaveNoViolations();
});

it("loading state", async () => {
  const el = await fixture("<sando-button loading>Loading</sando-button>");
  expect(await axe(el)).toHaveNoViolations();
});
```

### Testing All Flavors

```typescript
const flavors = ["original", "strawberry", "ocean", "forest", "sunset"];

describe.each(flavors)("flavor: %s", (flavor) => {
  it("meets accessibility standards", async () => {
    const el = await fixture(`
      <div flavor="${flavor}">
        <sando-button>Test</sando-button>
      </div>
    `);
    expect(await axe(el)).toHaveNoViolations();
  });
});
```

**Reference**:

- `packages/components/src/components/button/sando-button.a11y.test.ts`
- [axe-core rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [jest-axe docs](https://github.com/nickcolley/jest-axe)

---

## Contrast Requirements

### Minimum Ratios

| Content Type      | Size                | WCAG AA | WCAG AAA | Notes                       |
| ----------------- | ------------------- | ------- | -------- | --------------------------- |
| Normal text       | <18pt or <14pt bold | 4.5:1   | 7:1      | Body copy, labels           |
| Large text        | ≥18pt or ≥14pt bold | 3:1     | 4.5:1    | Headings, large UI          |
| UI components     | Any                 | 3:1     | -        | Borders, icons, focus rings |
| Graphical objects | Any                 | 3:1     | -        | Charts, diagrams, controls  |

### Token Validation

Sando tokens are automatically validated for contrast compliance:

```javascript
// packages/tokens/tests/accessibility/contrast.test.js
describe("WCAG contrast compliance", () => {
  it("text meets AA (4.5:1)", () => {
    const ratio = getContrastRatio(textColor, backgroundColor);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
```

**Contrast calculation**:

1. Convert HSL → RGB
2. Calculate relative luminance
3. Compute contrast ratio: (L1 + 0.05) / (L2 + 0.05)

**Tools**:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)

**Reference**: `packages/tokens/tests/accessibility/contrast.test.js`

---

## Semantic HTML

### Use Native Elements

**Correct patterns**:

```html
<!-- Buttons -->
<button type="button">Action</button>
<button type="submit">Submit Form</button>

<!-- Links -->
<a href="/page">Navigate</a>

<!-- Form controls -->
<input type="text" id="name" />
<label for="name">Name</label>
<select id="options">
  <option>One</option>
</select>
<textarea id="comments"></textarea>
```

**Avoid these anti-patterns**:

```html
<!-- ❌ WRONG - div/span with roles -->
<div role="button" tabindex="0" onclick="...">Click</div>
<span role="link" tabindex="0" onclick="...">Link</span>
<div role="textbox" contenteditable="true"></div>
```

### Progressive Enhancement

1. **Start with HTML**: Semantic, keyboard accessible
2. **Add CSS**: Visual styling via tokens
3. **Enhance with JS**: Interactive behavior, ARIA states

**Example**:

```html
<!-- Works without JS -->
<button type="button" class="toggle">Show details</button>

<!-- Enhanced with JS -->
<button
  type="button"
  class="toggle"
  aria-pressed="false"
  aria-controls="details"
>
  Show details
</button>
```

**Reference**: [HTML5 Accessibility](https://www.w3.org/TR/html-aria/)

---

## ARIA Patterns

### When to Use ARIA

Use ARIA only when:

1. No native HTML element exists
2. Need to add states/properties not in HTML
3. Building complex widgets (combobox, tree, tabs)

**5 Rules of ARIA**:

1. Use native HTML if possible
2. Don't change native semantics (e.g., `<button role="heading">`)
3. All interactive ARIA controls must be keyboard accessible
4. Don't use role="presentation" or aria-hidden on focusable elements
5. All interactive elements must have accessible names

### Common ARIA Patterns

| Pattern | Role   | Key States/Properties       | Keyboard      | Reference         |
| ------- | ------ | --------------------------- | ------------- | ----------------- |
| Button  | button | aria-pressed, aria-disabled | Space, Enter  | sando-button      |
| Alert   | alert  | aria-live="assertive"       | -             | Toast             |
| Status  | status | aria-live="polite"          | -             | Loading indicator |
| Toggle  | button | aria-pressed                | Space, Enter  | Toggle button     |
| Modal   | dialog | aria-modal, aria-labelledby | Esc, Tab trap | Dialog            |

### ARIA in Components

**sando-button example**:

```typescript
// Disabled state
this.hasAttribute("disabled")
  ? html`<button aria-disabled="true" ...></button>`
  : html`<button ...></button>`;

// Loading state
html`
  <button aria-busy="${this.loading}" aria-live="polite">
    ${this.loading ? "Loading..." : "Submit"}
  </button>
`;

// Toggle button
html`
  <button
    type="button"
    aria-pressed="${this.pressed}"
    @click="${this._handleToggle}"
  >
    ${this.label}
  </button>
`;
```

**Common ARIA attributes**:

- `aria-label`: Accessible name when text content insufficient
- `aria-labelledby`: Reference to labeling element(s)
- `aria-describedby`: Reference to description element(s)
- `aria-hidden`: Hide decorative elements from screen readers
- `aria-live`: Announce dynamic content changes
- `aria-disabled`: Disabled state (when cannot use native disabled)
- `aria-pressed`: Toggle button state
- `aria-expanded`: Collapsible content state

**Reference**:

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- `packages/components/src/components/button/sando-button.ts`

---

## Testing Coverage

### Requirements

**100% coverage for**:

- All public components
- All component states (default, hover, focus, active, disabled, loading, error, success)
- All variants (solid, outline, ghost, etc.)
- All sizes (small, medium, large)
- All flavors (original, strawberry, ocean, forest, sunset)
- All modes (light, dark, high-contrast, forced-colors, reduced-motion)

### Test File Structure

```
sando-button/
├── sando-button.ts           # Component implementation
├── sando-button.test.ts      # Unit tests
├── sando-button.spec.ts      # E2E tests
└── sando-button.a11y.test.ts # Accessibility tests ← Required
```

### Test Commands

```bash
# Run all accessibility tests
pnpm test -- --grep "a11y|accessibility"

# Run specific component a11y tests
pnpm test sando-button.a11y.test.ts

# Watch mode
pnpm test:watch -- --grep "a11y"
```

**Reference**: `.claude/guidelines/03-development/TESTING_STRATEGY.md`

---

## Validation Checklist

### Component Creation

- [ ] Uses semantic HTML elements (button, a, input, label, etc.)
- [ ] Keyboard accessible (all interactive elements reachable via Tab)
- [ ] Visible focus indicators (meet 3:1 contrast for focus rings)
- [ ] ARIA labels provided where text content insufficient
- [ ] No keyboard traps (can Tab out of component)
- [ ] Logical tab order (follows visual layout)

### Testing Phase

- [ ] `.a11y.test.ts` file exists
- [ ] axe-core automated tests pass (toHaveNoViolations)
- [ ] All states tested (default, disabled, loading, error, etc.)
- [ ] All variants tested (solid, outline, ghost, etc.)
- [ ] All flavors tested (original, strawberry, ocean, forest, sunset)
- [ ] All modes tested (light, dark, high-contrast, reduced-motion)
- [ ] Manual keyboard testing completed (Tab, Enter, Space, Arrows, Esc)
- [ ] Screen reader testing completed (NVDA/JAWS/VoiceOver)

### PR Review

- [ ] No axe-core violations in CI
- [ ] Manual accessibility testing documented
- [ ] Screen reader testing results included
- [ ] Keyboard navigation verified
- [ ] Focus management reviewed
- [ ] ARIA usage validated against APG patterns

### Release

- [ ] Accessibility features documented in Storybook
- [ ] Known accessibility issues listed
- [ ] Migration guide includes a11y breaking changes
- [ ] Component docs include keyboard shortcuts
- [ ] ARIA patterns documented with examples

---

## Related Guidelines

**Design System**:

- [TESTING_STRATEGY.md](../03-development/TESTING_STRATEGY.md) - Testing requirements
- [COMPONENT_API_STANDARDS.md](../02-design/COMPONENT_API_STANDARDS.md) - Component API design

**Accessibility** (future guidelines):

- `KEYBOARD_NAVIGATION.md` - Keyboard interaction patterns
- `SCREEN_READER_SUPPORT.md` - Screen reader testing guide
- `COLOR_CONTRAST.md` - Color system accessibility
- `FOCUS_MANAGEMENT.md` - Focus indicators and management

---

## External References

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/) - Official spec
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - Patterns and widgets
- [axe-core](https://github.com/dequelabs/axe-core) - Automated testing
- [jest-axe](https://github.com/nickcolley/jest-axe) - Jest integration
- [WebAIM](https://webaim.org/) - Resources and training
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast tool
- [A11y Project](https://www.a11yproject.com/) - Community checklist
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Technical reference

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial guideline creation
- WCAG 2.1 Level AA compliance requirements
- jest-axe automated testing patterns
- Contrast requirements (4.5:1 AA, 7:1 AAA, 3:1 UI)
- Semantic HTML patterns and progressive enhancement
- ARIA patterns with 5 rules and common widgets
- Testing coverage requirements (100% states/flavors/modes)
- Validation checklist for creation, testing, PR, release
- References to production code (sando-button.a11y.test.ts, contrast.test.js)
- Agent-optimized format (490 lines)

---

**Accessibility is non-negotiable. Every component must be usable by everyone.**
