# Accessibility — sando-label

## ARIA pattern
Follows the [WAI-ARIA Label](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern via native `<label>` element.

| Attribute | Value | Purpose |
|---|---|---|
| `for` | Form control ID | Associates the label with a form control via `htmlFor` |
| `aria-hidden` | `"true"` | On the required asterisk `*` — decorative, "Required" is communicated via the `required` attribute on the control |

The component renders a native `<label>` element. When `sr-only=true`, the label is visually hidden but remains available to screen readers.

## Keyboard map
| Key | Behavior |
|---|---|
| — | Not keyboard focusable — labels are non-interactive |

Clicking the label moves focus to the associated form control (native browser behavior).

## Screen reader behavior
The label is announced as part of the associated form control when that control receives focus:
> "Email address, edit text" — the label text becomes the control's accessible name

When `sr-only=true`:
> Label is visually hidden but still announced by screen readers via the `for` association

Required indicator:
> The `*` is hidden (`aria-hidden="true"`); the `required` attribute on the form control communicates required state

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Label text vs background | Verified via axe-core | ✅ |
| Required indicator vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | n/a — not focusable | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-label.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
