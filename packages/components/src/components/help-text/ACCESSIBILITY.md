# Accessibility — sando-help-text

## ARIA pattern
Follows the [WAI-ARIA Live Region](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) pattern — `status` (polite) or `alert` (assertive) depending on `variant`.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `status` (default, info, warning, success) / `alert` (error) | Determines announcement urgency |
| `aria-live` | `polite` / `assertive` | Matches `role` — `error` variant uses `assertive` |

The inner `<div>` carries the role and live region attributes. The outer custom element is transparent to AT.

## Keyboard map
| Key | Behavior |
|---|---|
| — | Not keyboard focusable — the help text is an informational element |

Help text is typically associated with a form control via `aria-describedby` on the control. It is not interactive.

## Screen reader behavior
When content appears or changes:
- Default/info/success/warning: Announced politely at next opportunity (`role="status"`)
- Error variant: Announced immediately (`role="alert"` / `aria-live="assertive"`)

Example error announcement:
> "This field is required." (announced assertively when error text appears)

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Help text vs background | Verified via axe-core | ✅ |
| Error text vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | n/a — not focusable | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-help-text.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
