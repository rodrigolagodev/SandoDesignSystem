# Accessibility — sando-alert

## ARIA pattern
Follows the [WAI-ARIA Live Region](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) pattern.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `status` (default) / `alert` | `status` = polite live region; `alert` = assertive live region for urgent messages |
| `aria-live` | `polite` (default) / `assertive` | Controls urgency of screen reader announcement |
| `aria-atomic` | `true` | Announces the entire container as a unit |
| `aria-label` | `"Dismiss alert"` | On the close button when `dismissible=true` |
| `aria-hidden` | `true` | On the icon wrapper — icon is decorative |

When `role="none"` is set, the container has no `role` or `aria-live` attributes (purely decorative use).

## Keyboard map
| Key | Behavior |
|---|---|
| Tab | Move focus to the Dismiss button (when `dismissible=true`) |
| Shift+Tab | Move focus backward from the Dismiss button |
| Enter / Space | Activate the Dismiss button to close the alert |
| Escape | Dismiss the alert (when `dismissible=true`) |

## Screen reader behavior
Expected announcement when the alert appears in the DOM:
> "Session expiring. Your session will expire soon." (for `role="status"` — polite, read at next pause)

For `role="alert"`:
> "An error has occurred." (assertive — interrupts current speech immediately)

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Text vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | Verified via axe-core | ✅ |
| Disabled state | n/a — alert has no disabled state | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-alert.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- JSDOM does not fire `animationend` events; dismiss animation tests simulate the event manually. Real browser behavior is tested manually.
