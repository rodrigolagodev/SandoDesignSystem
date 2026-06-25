# Accessibility — sando-form-group

## ARIA pattern
Follows the [WAI-ARIA Group](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern for grouping form controls.

| Attribute | Value | Purpose |
|---|---|---|
| `aria-describedby` | Description element ID | Injected onto the slotted form control to link helper/error text |
| `aria-invalid` | `"true"` / `"false"` | Injected onto the slotted form control when `error=true` |
| `role` | `"alert"` + `aria-live="polite"` | On the error message container for assertive error announcements |

The form-group acts as a wrapper — it injects `aria-describedby` and `aria-invalid` directly onto slotted `input`, `select`, `textarea`, or elements with `role="textbox"`, `role="combobox"`, or `role="listbox"`.

## Keyboard map
| Key | Behavior |
|---|---|
| Tab | Move focus to/from the slotted form control |
| Shift+Tab | Move focus backward |

The form-group itself is not focusable — focus goes to the slotted control.

## Screen reader behavior
Expected announcement when the slotted input receives focus:
> "Email address, edit text" followed by helper text via `aria-describedby`

When error is set:
> "Please enter a valid email, invalid entry" (aria-invalid triggers "invalid")
> Error text is announced via `role="alert"` as soon as it appears

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Label text vs background | Verified via axe-core | ✅ |
| Error text vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | Verified via axe-core | ✅ |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-form-group.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
