# Screen Reader Support

**Category**: 04-accessibility
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: QA Expert

---

## Purpose

Ensure all Sando Design System components provide excellent screen reader experience through semantic HTML, ARIA, and live announcements. Screen readers are essential assistive technology used by blind and low-vision users to navigate and interact with web interfaces.

This guideline establishes patterns for accessible names, ARIA states, live regions, and screen reader testing based on proven patterns from sando-button.

**Target**: WCAG 2.1 Level AA compliance for screen reader users.

---

## Core Rules

### Rule 1: Semantic HTML First (Non-Negotiable)

Use native HTML elements that have built-in screen reader support. Avoid unnecessary ARIA.

**Pattern**:

```html
<!-- ✅ CORRECT - Native button -->
<button>Click me</button>

<!-- ✅ CORRECT - Native link -->
<a href="/home">Home</a>
```

**Anti-pattern**:

```html
<!-- ❌ WRONG - Div with ARIA (unnecessary complexity) -->
<div role="button" tabindex="0" aria-pressed="false">Click me</div>
```

**Why**: Native elements announce correctly, have keyboard support built-in, and work reliably across all screen readers without additional ARIA.

**Reference**: [HTML5 Accessibility](https://www.w3.org/TR/html-aria/) | [ARIA in HTML](https://www.w3.org/TR/html-aria/)

---

### Rule 2: Accessible Names Required

Every interactive element MUST have an accessible name that screen readers can announce.

**Priority order**:

1. **Text content** (visible to all users) - BEST
2. **aria-label** (screen reader only override)
3. **aria-labelledby** (reference other element's text)

**Pattern**:

```html
<!-- ✅ CORRECT - Visible text -->
<button>Save Changes</button>

<!-- ✅ CORRECT - Icon-only with aria-label -->
<button aria-label="Settings">⚙️</button>

<!-- ❌ WRONG - No accessible name -->
<button><span class="icon"></span></button>
```

**Reference**: WCAG 4.1.2 Name, Role, Value (Level A)

---

### Rule 3: ARIA States and Properties

Use ARIA to communicate dynamic states and properties that native HTML cannot express.

**Common ARIA attributes**:

- **aria-pressed**: Toggle button state (true/false)
- **aria-expanded**: Disclosure widget state (true/false)
- **aria-busy**: Loading state (true/false)
- **aria-disabled**: Disabled state on non-native elements (true/false)
- **aria-live**: Dynamic content announcements (polite/assertive/off)

**Pattern from sando-button**:

```typescript
// Toggle button state
aria-pressed=${this.toggle ? (this.active ? 'true' : 'false') : ''}

// Loading state
aria-busy=${this.loading ? 'true' : 'false'}
aria-live=${this.loading ? 'polite' : 'off'}
```

**Reference**: `packages/components/src/components/button/sando-button.ts` (lines 277-281)

---

### Rule 4: Live Regions for Announcements

Use ARIA live regions to announce dynamic content changes without moving focus.

**Types**:

- **aria-live="polite"**: Wait for user to finish current task (most updates)
- **aria-live="assertive"**: Interrupt immediately (urgent alerts only)
- **role="status"**: Implicit polite live region (status updates)
- **role="alert"**: Implicit assertive live region (errors, warnings)

**Pattern from sando-button**:

```html
<!-- Loading spinner announcement -->
<span class="spinner" role="status" aria-label="Loading"></span>
```

**When to use**: Form validation, loading states, async updates, error messages, success confirmations.

**Reference**: WCAG 4.1.3 Status Messages (Level AA)

---

### Rule 5: Test with Actual Screen Readers

Automated tools cannot fully validate screen reader experience. Manual testing is REQUIRED.

**Minimum testing**:

1. **NVDA** (Windows, free) - Primary testing
2. **VoiceOver** (Mac/iOS, built-in) - Secondary testing
3. **JAWS** (Windows, commercial) - Enterprise validation (if available)
4. **TalkBack** (Android, built-in) - Mobile validation

**Basic test procedure**:

1. Navigate with Tab key
2. Listen to announcements (name, role, state)
3. Activate with Enter/Space
4. Verify state changes announced correctly

**Reference**: [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

---

## WCAG Screen Reader Criteria

| Criteria                     | Level | Requirement                                                | Implementation                                        |
| ---------------------------- | ----- | ---------------------------------------------------------- | ----------------------------------------------------- |
| 4.1.2 Name, Role, Value      | A     | All UI components have accessible names, roles, and states | Text content, aria-label, aria-pressed, aria-expanded |
| 4.1.3 Status Messages        | AA    | Status messages announced without focus change             | aria-live, role="status", role="alert"                |
| 1.3.1 Info and Relationships | A     | Semantic structure programmatically determinable           | Native HTML elements (button, nav, main, heading)     |
| 2.4.6 Headings and Labels    | AA    | Headings and labels are descriptive                        | Clear text, no generic "click here"                   |
| 3.3.2 Labels or Instructions | A     | Labels provided for input                                  | label element, aria-label for inputs                  |

**Reference**: [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Semantic HTML Elements

Use native HTML elements first. They have built-in screen reader support and keyboard behavior.

| Element       | Screen Reader Announces             | When to Use                                 |
| ------------- | ----------------------------------- | ------------------------------------------- |
| `<button>`    | "button" + text                     | Actions, submissions, non-navigation clicks |
| `<a href>`    | "link" + text                       | Navigation to different pages/sections      |
| `<nav>`       | "navigation landmark"               | Main navigation areas                       |
| `<main>`      | "main landmark"                     | Primary page content                        |
| `<aside>`     | "complementary landmark"            | Sidebars, related content                   |
| `<header>`    | "banner landmark" (if in body)      | Site/page header                            |
| `<footer>`    | "contentinfo landmark" (if in body) | Site/page footer                            |
| `<h1>`-`<h6>` | "heading level X" + text            | Document outline structure                  |
| `<label>`     | Associates with input               | Form input labels                           |
| `<input>`     | Type-specific announcement          | Form inputs                                 |

**Pattern from sando-button**:

```typescript
// Native button element used
return this.href
  ? html`<a ...>${content}</a>` // Native link for navigation
  : html`<button ...>${content}</button>`; // Native button for actions
```

**Reference**: `sando-button.ts` (lines 259-306)

---

## Accessible Names

Every interactive element needs an accessible name for screen readers to announce.

### Text Content (Best)

Visible text provides names for both sighted and screen reader users.

```html
<!-- ✅ CORRECT - Text content is accessible name -->
<button>Save Changes</button>
<a href="/about">About Us</a>
```

**Test**: `sando-button.a11y.test.ts` validates text content as accessible name:

```typescript
const accessibleName = element.textContent?.trim();
expect(accessibleName).toBe("Click me");
```

### aria-label (Override)

Use for icon-only elements or to provide clearer screen reader text than visible text.

```html
<!-- ✅ CORRECT - Icon-only button needs aria-label -->
<button aria-label="Settings">⚙️</button>

<!-- ✅ CORRECT - Clearer screen reader text -->
<button aria-label="Close dialog">×</button>
```

**Pattern from sando-button**:

```typescript
@property({ reflect: true, attribute: 'aria-label' })
ariaLabel: string | null = null;
```

**Reference**: `sando-button.ts` (line 89)

### aria-labelledby (Reference)

```html
<h2 id="title">Confirm Deletion</h2>
<button aria-labelledby="title">OK</button>
```

axe-core flags missing accessible names as critical errors.

---

## ARIA States and Properties

Use ARIA to communicate states and properties beyond native HTML capabilities.

### Common ARIA Attributes

| ARIA Attribute | Purpose                | Values                                  | Announced As                |
| -------------- | ---------------------- | --------------------------------------- | --------------------------- |
| aria-pressed   | Toggle button state    | true/false                              | "pressed" / "not pressed"   |
| aria-expanded  | Disclosure widget      | true/false                              | "expanded" / "collapsed"    |
| aria-busy      | Loading state          | true/false                              | "busy"                      |
| aria-disabled  | Disabled on non-button | true/false                              | "dimmed" / "unavailable"    |
| aria-current   | Current item in set    | page/step/location/date/time/true/false | "current page" etc.         |
| aria-selected  | Selected item          | true/false                              | "selected" / "not selected" |
| aria-checked   | Checkbox/radio state   | true/false/mixed                        | "checked" / "not checked"   |

### Pattern from sando-button

```typescript
// Toggle button (lines 277-278)
aria-pressed=${this.toggle ? (this.active ? 'true' : 'false') : ''}

// Disabled link (lines 280-281)
aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}

// Loading state (lines 279, 281)
aria-busy=${this.loading ? 'true' : 'false'}
aria-live=${this.loading ? 'polite' : 'off'}
```

**Reference**: `packages/components/src/components/button/sando-button.ts`

### When to Use

- **aria-pressed**: Toggle buttons (mute/unmute, play/pause)
- **aria-expanded**: Accordions, dropdowns, disclosures
- **aria-busy**: Loading spinners, async operations
- **aria-disabled**: Disabled links (native disabled only works on button/input)

### When NOT to Use

- **Don't** add aria-label if text content is sufficient
- **Don't** use role="button" on native `<button>`
- **Don't** use aria-disabled on native `<button>` (use disabled attribute)

---

## Live Regions

ARIA live regions announce dynamic content changes without moving keyboard focus.

### Live Region Types

| Type                  | Politeness           | Usage                           | Interrupts |
| --------------------- | -------------------- | ------------------------------- | ---------- |
| aria-live="polite"    | Wait for pause       | Form validation, status updates | No         |
| aria-live="assertive" | Immediate            | Urgent alerts, errors           | Yes        |
| aria-live="off"       | None                 | Stop announcements              | N/A        |
| role="status"         | Polite (implicit)    | Status messages, loading        | No         |
| role="alert"          | Assertive (implicit) | Errors, warnings                | Yes        |

### Pattern from sando-button

```html
<!-- Loading spinner with status announcement (line 287) -->
<span class="spinner" role="status" aria-label="Loading"></span>
```

**How it works**:

1. `role="status"` creates implicit `aria-live="polite"` region
2. `aria-label="Loading"` provides announcement text
3. Screen reader announces "Loading" when spinner appears
4. Announcement is polite (waits for user to finish current task)

### Best Practices

- Use polite for most updates (status, progress, confirmations)
- Use assertive only for urgent (errors, time-sensitive alerts)
- Don't over-announce (avoid announcing every keystroke)
- Pre-render live region container in DOM before content changes
- Use clear text ("Loading..." not "Please wait while content loads...")

**Reference**: WCAG 4.1.3 Status Messages (Level AA)

---

## Screen Reader Testing

Automated tools cannot fully validate screen reader experience. Manual testing is REQUIRED.

### Screen Readers to Test

| Screen Reader | Platform | Free   | Market Share | Notes                           |
| ------------- | -------- | ------ | ------------ | ------------------------------- |
| NVDA          | Windows  | ✅ Yes | ~35%         | Primary Windows testing         |
| JAWS          | Windows  | ❌ No  | ~40%         | Enterprise standard (expensive) |
| VoiceOver     | Mac/iOS  | ✅ Yes | ~10%         | Built-in, easy to test          |
| TalkBack      | Android  | ✅ Yes | ~10%         | Mobile testing                  |
| Narrator      | Windows  | ✅ Yes | ~5%          | Built-in Windows                |

**Minimum testing**: NVDA (Windows) + VoiceOver (Mac) covers ~85% of users.

### Basic Testing Procedure

**1. Navigate with keyboard**:

- Tab through interactive elements
- Listen to announcements (name, role, state)
- Verify logical tab order

**2. Activate elements**:

- Press Enter/Space on buttons
- Verify action announcements
- Check state changes announced

**3. Test dynamic content**:

- Trigger loading states
- Verify live region announcements
- Test error messages

**4. Test landmarks**:

- Navigate by landmark (NVDA: D key, VoiceOver: VO+U)
- Verify landmarks make sense
- Check main content identified

**NVDA (Windows)**: Download from nvaccess.org, launch with Ctrl+Alt+N, navigate with Tab, activate with Enter/Space

**VoiceOver (Mac)**: Toggle with Cmd+F5, navigate with Tab and VO+Arrow (VO = Ctrl+Option), activate with VO+Space

**Reference**: [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

---

## Validation Checklist

Use this checklist for every component before marking accessibility complete.

### Accessible Names (WCAG 4.1.2)

- [ ] All interactive elements have accessible names
- [ ] Icon-only buttons have aria-label
- [ ] Names are descriptive and clear
- [ ] No generic text like "click here" or "read more"
- [ ] Images have alt text (or alt="" if decorative)

### ARIA Usage

- [ ] Semantic HTML used first (button, a, nav, etc.)
- [ ] ARIA added only when native HTML insufficient
- [ ] No conflicting roles (e.g., role="button" on `<button>`)
- [ ] States update correctly (aria-pressed, aria-expanded)
- [ ] Values are valid (true/false, not "yes"/"no")

### Live Regions (WCAG 4.1.3)

- [ ] Loading states announced with role="status"
- [ ] Errors announced with role="alert"
- [ ] Success messages announced
- [ ] Not over-announcing (every keystroke)
- [ ] Live regions pre-rendered in DOM

### Screen Reader Testing

- [ ] Tested with NVDA or JAWS (Windows)
- [ ] Tested with VoiceOver (Mac)
- [ ] All interactive elements reachable
- [ ] Names, roles, states announced correctly
- [ ] No missing context or confusing announcements
- [ ] Landmarks present and logical

### Automated Testing

- [ ] axe-core passes (no critical/serious issues)
- [ ] WAVE browser extension shows no errors
- [ ] Accessibility tree inspected in DevTools
- [ ] Tests validate accessible names exist

**Reference**: See `sando-button.a11y.test.ts` for automated testing patterns.

---

## Common Patterns

**Icon-only button**:

```html
<sando-button icon-only aria-label="Settings">⚙️</sando-button>
```

**Loading state**:

```html
<span role="status" aria-label="Loading"></span>
```

**Toggle button**:

```typescript
aria-pressed=${this.active ? 'true' : 'false'}
```

**Disabled link**:

```typescript
aria-disabled="true"
```

**Reference**: `sando-button.ts`, `sando-button.a11y.test.ts`

---

## Related Guidelines

- [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md) - Overall WCAG 2.1 Level AA compliance requirements
- [KEYBOARD_NAVIGATION.md](./KEYBOARD_NAVIGATION.md) - Keyboard interaction patterns and focus management
- [TESTING_STRATEGY.md](../03-development/TESTING_STRATEGY.md) - Accessibility testing approach with axe-core

---

## External References

**Screen Readers**:

- [NVDA](https://www.nvaccess.org/) - Free Windows screen reader (primary testing)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Commercial Windows screen reader
- [VoiceOver Guide](https://www.apple.com/accessibility/voiceover/) - Mac/iOS built-in screen reader

**ARIA Specifications**:

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) - ARIA patterns and examples
- [ARIA in HTML](https://www.w3.org/TR/html-aria/) - Rules for using ARIA with HTML

**Testing Resources**:

- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/) - Comprehensive testing guide
- [Screen Reader Compatibility](https://www.powermapper.com/tests/screen-readers/) - Browser/SR combinations

---

## Changelog

### 1.0.0 (2025-11-03)

**Initial guideline created from sando-button patterns**.

**Core rules established**:

- Rule 1: Semantic HTML first (non-negotiable)
- Rule 2: Accessible names required (text, aria-label, aria-labelledby)
- Rule 3: ARIA states and properties (pressed, expanded, busy, disabled)
- Rule 4: Live regions for announcements (aria-live, role="status", role="alert")
- Rule 5: Test with actual screen readers (NVDA, JAWS, VoiceOver, TalkBack)

**Content sections**:

- WCAG screen reader criteria (4.1.2, 4.1.3, 1.3.1, 2.4.6, 3.3.2)
- Semantic HTML elements table (button, a, nav, main, headings)
- Accessible names (text content, aria-label, aria-labelledby priority)
- ARIA states and properties table (pressed, expanded, busy, disabled, current, selected, checked)
- Live regions (polite vs assertive, role="status", role="alert")
- Screen reader testing guide (NVDA, JAWS, VoiceOver, TalkBack)
- Validation checklist (accessible names, ARIA usage, live regions, testing)
- Testing patterns from sando-button.a11y.test.ts
- Common patterns (icon-only, loading, toggle, disabled link)

**Optimizations**:

- Agent-optimized format (497 lines - within 500 limit)
- Compact tables for quick reference
- Patterns extracted from sando-button.ts and sando-button.a11y.test.ts
- One focused example per concept
- External links for detailed documentation

**References**: sando-button.ts (lines 89, 259-306, 277-281, 287), sando-button.a11y.test.ts

---

**Screen readers are essential assistive technology. Test with actual screen readers, not just automated tools.**
