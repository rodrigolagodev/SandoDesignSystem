---
title: Accessibility Guide
description: How Sando Design System ensures WCAG 2.1 Level AA compliance through automatic accessibility modes, OKLCH-based color contrast, and built-in keyboard and screen reader support.
---

# Accessibility

Accessibility isn't a feature in Sando — it's the foundation. Like quality bread in a sandwich, if the foundation doesn't work for everyone, nothing else matters. Every component, every flavor, every mode is built to meet **WCAG 2.1 Level AA** standards, with AAA where achievable.

## How Sando Makes Accessibility Automatic

Most design systems ask you to _add_ accessibility. Sando _starts with it_. Three architectural decisions make this possible:

### 1. OKLCH Color Space

Sando uses [OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) for all color definitions. Unlike hex or HSL, OKLCH guarantees **perceptual uniformity** — when two colors have the same lightness value, they actually _look_ equally bright to human eyes.

Why this matters for accessibility:

- **Lightness-based contrast** — Contrast ratios are predictable because OKLCH lightness maps directly to perceived brightness
- **Colorblind-safe** — Sando relies on lightness differences, not hue differences, to distinguish elements. A `green.600` success message and a `red.600` error are distinguishable even without seeing color
- **Consistent across palettes** — `orange.500` and `green.500` have the same visual weight, so swapping flavors never breaks contrast

```css
/* OKLCH: Lightness, Chroma, Hue */
/* L=0.65 means "65% perceived brightness" — always. */
--sando-color-brown-500: oklch(0.65 0.08 50);
--sando-color-green-500: oklch(0.65 0.1 145);
/* Both look equally bright → same contrast against any background */
```

### 2. Automatic Accessibility Modes

Every flavor ships with 5 mode variants that activate via CSS `@media` queries — no JavaScript, no configuration:

| Mode              | Trigger                                   | What It Does                                  |
| ----------------- | ----------------------------------------- | --------------------------------------------- |
| **Light**         | Default                                   | Standard palette, WCAG AA compliant           |
| **Dark**          | `@media (prefers-color-scheme: dark)`     | Inverted palette, maintains AA contrast       |
| **High Contrast** | `@media (prefers-contrast: more)`         | Black/white palette, WCAG AAA (7:1+)          |
| **Forced Colors** | `@media (forced-colors: active)`          | Defers to Windows High Contrast system colors |
| **Motion Reduce** | `@media (prefers-reduced-motion: reduce)` | All durations → `0ms`, transitions disabled   |

```html
<!-- Nothing to configure. Modes respond to user system preferences. -->
<body flavor="kiwi">
  <sando-button variant="solid">Always Accessible</sando-button>
</body>
```

::: tip Modes Combine Automatically
A user with both dark mode and reduced motion enabled gets both adaptations simultaneously. Color modes (light/dark/high-contrast/forced-colors) are mutually exclusive, but motion reduce combines with any of them.
:::

### 3. Semantic HTML First

Sando components use native HTML elements wherever possible. A `<sando-button>` renders a real `<button>` internally. A `<sando-input>` renders a real `<input>`. This gives you free keyboard support, screen reader support, and form behavior — no ARIA gymnastics required.

```html
<!-- sando-button renders a native <button> inside its shadow DOM -->
<sando-button variant="solid">Save Changes</sando-button>

<!-- Result: keyboard focusable, screen reader announces "Save Changes, button" -->
```

## Color Contrast

### Standards

All Sando flavors meet these contrast requirements in every mode:

| Content Type  | WCAG Level | Minimum Ratio | What It Covers                 |
| ------------- | ---------- | ------------- | ------------------------------ |
| Normal text   | AA         | 4.5:1         | Body copy, labels, captions    |
| Large text    | AA         | 3:1           | Headings (≥18pt or ≥14pt bold) |
| UI components | AA         | 3:1           | Borders, icons, focus rings    |
| High contrast | AAA        | 7:1           | All text in high contrast mode |

### Real Contrast Ratios (Sando Flavor)

| Combination           | Ratio  | Level | Use Case           |
| --------------------- | ------ | ----- | ------------------ |
| Ink 950 on Cream 50   | 14.8:1 | AAA   | Headings           |
| Ink 800 on Cream 50   | 10.2:1 | AAA   | Body text          |
| White on Brown 600    | 4.9:1  | AA    | Button text        |
| Ink 500 on Cream 50   | 4.5:1  | AA    | Muted/caption text |
| Brown 600 on Cream 50 | 5.2:1  | AA    | Links              |

::: info Color Is Never the Only Signal
Per WCAG 1.4.1, Sando never uses color as the sole means of conveying information. Error states use icons + text + color. Success states use icons + text + color. This ensures the UI communicates clearly for colorblind users and in forced-colors mode.
:::

## Keyboard Navigation

All interactive Sando components are fully keyboard accessible. Here's how keyboard interaction works for real components:

### `<sando-button>`

| Key           | Action                                    |
| ------------- | ----------------------------------------- |
| `Tab`         | Focuses the button                        |
| `Shift + Tab` | Moves focus to previous focusable element |
| `Enter`       | Activates the button                      |
| `Space`       | Activates the button                      |

```html
<!-- Keyboard accessible by default. No tabindex needed. -->
<sando-button variant="solid">Save</sando-button>
<sando-button variant="outline">Cancel</sando-button>
<!-- Tab moves between them, Enter/Space activates -->
```

### `<sando-input>`

| Key           | Action                             |
| ------------- | ---------------------------------- |
| `Tab`         | Focuses the input                  |
| `Shift + Tab` | Moves focus to previous element    |
| `Escape`      | Clears the input (when applicable) |
| Type          | Enters text naturally              |

### `<sando-checkbox>`

| Key     | Action                           |
| ------- | -------------------------------- |
| `Tab`   | Focuses the checkbox             |
| `Space` | Toggles checked state            |
| `Enter` | Toggles checked state (enhanced) |

### General Patterns

| Key               | When It Applies              | Action                           |
| ----------------- | ---------------------------- | -------------------------------- |
| `Tab`             | All interactive elements     | Move focus forward               |
| `Shift + Tab`     | All interactive elements     | Move focus backward              |
| `Enter` / `Space` | Buttons, toggles, checkboxes | Activate the control             |
| `Escape`          | Modals, overlays, dropdowns  | Close/dismiss                    |
| `Arrow Keys`      | Radio groups, tabs, menus    | Navigate within compound widgets |

## Focus Management

### Visible Focus Indicators

Every interactive Sando component shows a clear focus ring when navigated via keyboard. The focus ring uses the flavor's `--sando-color-focus-ring` token:

```css
/* Built into every interactive component */
:focus-visible {
  outline: 2px solid var(--sando-color-focus-ring);
  outline-offset: 2px;
}
```

The focus ring:

- Is always **2px solid** for WCAG 2.4.7 compliance
- Uses a **2px offset** so it doesn't overlap the component's border
- Only appears on **keyboard focus** (`:focus-visible`), not mouse clicks
- Adapts to each flavor's brand color

### Focus Trapping (Pattern Guidance)

When building modal or dialog patterns with Sando components, implement focus trapping to keep keyboard users within the dialog:

- `Tab` should cycle through focusable elements inside the dialog
- `Shift + Tab` should cycle backward
- `Escape` should close the dialog and return focus to the trigger

### Focus Restoration

When a dialog or overlay closes, focus should return to the element that triggered it. This ensures users never lose their place on the page. Sando's focus ring tokens (`--sando-color-focus-ring`) and `:focus-visible` styling apply automatically to any interactive element that receives focus.

## Screen Reader Support

### ARIA Patterns

Sando follows the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for all interactive components:

| Component Pattern | ARIA Approach                                        |
| ----------------- | ---------------------------------------------------- |
| Button            | Native `<button>`, `aria-disabled`, `aria-pressed`   |
| Input             | Native `<input>`, `aria-invalid`, `aria-describedby` |
| Checkbox          | Native `<input type="checkbox">`, `aria-checked`     |
| Toggle            | `<button aria-pressed="true/false">`                 |
| Dialog (pattern)  | `role="dialog"`, `aria-modal`, `aria-labelledby`     |
| Loading states    | `aria-busy="true"`, `aria-live="polite"`             |
| Error messages    | `role="alert"`, `aria-live="assertive"`              |

### Writing Accessible Content with Sando Components

```html
<!-- ✅ Good: Descriptive button text -->
<sando-button>Save Changes</sando-button>

<!-- ❌ Bad: Generic, meaningless text -->
<sando-button>Click Here</sando-button>

<!-- ✅ Good: Icon button with accessible label -->
<sando-button aria-label="Close dialog">
  <span aria-hidden="true">×</span>
</sando-button>

<!-- ✅ Good: Input with error description -->
<sando-input
  label="Email Address"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
></sando-input>
<div id="email-error" role="alert">Please enter a valid email address</div>
```

## Motion and Animation

Sando handles reduced motion automatically through the motion-reduce mode variant:

```css
/* When @media (prefers-reduced-motion: reduce) matches: */
--sando-animation-duration-fast: 0ms;
--sando-animation-duration-normal: 0ms;
--sando-animation-duration-slow: 0ms;
```

This means:

- Button press animations → instant
- Page transitions → instant
- Loading spinners → still visible (static frame)
- Hover color changes → still applied (only duration is removed)

::: tip Motion Preferences Are About Safety
Reduced motion isn't a preference like "dark mode is easier on my eyes." For users with vestibular disorders, unexpected motion can cause dizziness, nausea, or seizures. Sando treats `prefers-reduced-motion` as a safety requirement, not a cosmetic choice.
:::

## High Contrast and Forced Colors

### High Contrast Mode

When `@media (prefers-contrast: more)` matches, Sando switches to maximum contrast values:

- Text becomes black on white (or white on black in dark mode)
- Borders thicken for visibility
- Backgrounds lose subtle gradients and shadows
- All text achieves **7:1+ contrast** (WCAG AAA)

### Forced Colors Mode (Windows High Contrast)

When `@media (forced-colors: active)` matches, Sando defers entirely to the operating system's color scheme:

```css
/* Sando uses CSS system colors in forced-colors mode */
--sando-color-text-body: CanvasText;
--sando-color-background-base: Canvas;
--sando-color-text-link-default: LinkText;
--sando-color-focus-ring: Highlight;
```

The system colors (`Canvas`, `CanvasText`, `LinkText`, `Highlight`, `ButtonFace`, `ButtonText`) are defined by the user's Windows High Contrast theme, ensuring their personal preferences are always respected.

## Testing Accessibility

### Automated Testing

Every Sando component includes a dedicated accessibility test file (`*.a11y.test.ts`) using [axe-core](https://github.com/dequelabs/axe-core):

```ts
// sando-button.a11y.test.ts
import { fixture, expect } from "@open-wc/testing";
import { axe, toHaveNoViolations } from "jest-axe";

describe("sando-button a11y", () => {
  it("default state has no violations", async () => {
    const el = await fixture("<sando-button>Click me</sando-button>");
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it("disabled state has no violations", async () => {
    const el = await fixture("<sando-button disabled>Disabled</sando-button>");
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });
});
```

Tests cover every component state, every variant, every size, and every flavor.

### Manual Testing Checklist

Automated tests catch about 57% of accessibility issues. For the rest, test manually:

#### Keyboard Navigation

- [ ] All interactive elements reachable via `Tab`
- [ ] Tab order follows logical reading order
- [ ] Focus indicator is clearly visible
- [ ] `Escape` closes modals and overlays
- [ ] No keyboard traps — focus never gets stuck

#### Screen Reader

Test with at least one screen reader:

| Platform    | Screen Reader | Cost       |
| ----------- | ------------- | ---------- |
| Windows     | NVDA          | Free       |
| Windows     | JAWS          | Commercial |
| macOS / iOS | VoiceOver     | Built-in   |
| Android     | TalkBack      | Built-in   |

Verify:

- [ ] All content is announced in logical order
- [ ] Interactive elements have clear, descriptive labels
- [ ] Form errors are announced when they appear
- [ ] Dynamic content updates are announced via `aria-live`
- [ ] Decorative elements are hidden with `aria-hidden="true"`

#### Visual

- [ ] Text readable at 200% browser zoom
- [ ] No horizontal scrolling at 320px viewport width
- [ ] Color is not the only means of conveying information
- [ ] All modes work: light, dark, high contrast, forced colors

### Browser DevTools Testing

::: code-group

```text [Chrome / Edge]
1. Open DevTools → Rendering tab
2. Scroll to "Emulate CSS media feature"
3. Test these one at a time:
   - prefers-color-scheme: dark
   - prefers-contrast: more
   - prefers-reduced-motion: reduce
   - forced-colors: active
```

```text [Firefox]
1. Open DevTools → Accessibility tab
2. Use simulation controls:
   - Dark theme
   - High contrast
   - Reduced motion
```

:::

## Reporting Accessibility Issues

Found an accessibility issue? We treat them as **high priority bugs**.

1. Check if it's already [reported](https://github.com/rodrigolagodev/SandoDesignSystem/issues)
2. Create a new issue with:
   - **WCAG criterion** it violates (e.g., "1.4.3 Contrast Minimum")
   - **Steps to reproduce** (flavor, mode, component, action)
   - **Affected component(s)** (e.g., `sando-button` in dark mode)
   - **Testing tool used** (axe DevTools, NVDA, VoiceOver, etc.)
   - **Expected vs. actual behavior**

## Resources

### Official Standards

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/) — The definitive accessibility checklist
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) — Patterns for interactive widgets
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) — Technical reference

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/) — Browser extension for in-page testing
- [WAVE](https://wave.webaim.org/) — Web accessibility evaluation tool
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Verify color contrast ratios
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) — Built into Chrome DevTools

### Screen Readers

- [NVDA](https://www.nvaccess.org/) — Free, open source (Windows)
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) — Built into macOS and iOS
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) — Commercial (Windows)

## Next Steps

- **[Flavors Reference](/tokens/flavors)** — See how each flavor handles accessibility modes
- **[Theming Guide](/getting-started/theming)** — Apply flavors and customize your theme
- **[Contributing Guide](/guides/contributing)** — Learn how to contribute accessible components
