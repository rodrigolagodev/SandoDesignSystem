# Accessibility — sando-checkbox

## ARIA pattern
Follows the [WAI-ARIA Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) pattern.

| Attribute | Value | Purpose |
|---|---|---|
| `aria-checked` | `"true"` / `"false"` / `"mixed"` | Communicates checked, unchecked, and indeterminate states |
| `aria-invalid` | `"true"` / `"false"` | Marks the field as invalid when `error=true` |
| `aria-describedby` | Helper/error text element ID | Associates helper or error text with the input |
| `required` | Native attribute | Marks the input as required for form validation |

The checkbox renders using a native `<input type="checkbox">` hidden inside a shadow `<label>` — accessible name comes from the `label` property or slotted content.

## Keyboard map
| Key | Behavior |
|---|---|
| Tab | Move focus to/from the checkbox |
| Shift+Tab | Move focus backward |
| Space | Toggle the checked state |
| Enter | Toggle the checked state |

## Screen reader behavior
Expected announcement when the element receives focus:
> "Accept terms, checkbox, unchecked" (VoiceOver)

When checked:
> "Accept terms, checkbox, checked"

When indeterminate:
> "Select all, checkbox, mixed"

Error state:
> "This field is required, error" (from `sando-help-text` with `role="alert"`)

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Label text vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | Verified via axe-core | ✅ |
| Disabled state | Intentional reduced contrast | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-checkbox.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
