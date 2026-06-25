# Accessibility — sando-badge

## ARIA pattern
Follows the [WAI-ARIA Status](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern (status live region).

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `status` | Marks the badge as a live region for polite announcements |
| `aria-label` | Optional, from `label` property | Provides additional context for screen readers when the visual text alone is ambiguous |

The badge renders as `<span role="status">` — a polite live region. When badge content changes dynamically, screen readers announce the new value at the next opportunity.

## Keyboard map
| Key | Behavior |
|---|---|
| — | Not keyboard focusable — the badge is a purely informational element |

Badges are decorative status indicators and are not interactive. They do not appear in the tab order.

## Screen reader behavior
Expected announcement when the badge content is read in browse mode:
> "3" or "New" (the badge text content)

When the count changes dynamically:
> Screen reader announces the new value politely (due to `role="status"`)

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Badge text vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | n/a — not focusable | n/a |
| Disabled state | n/a | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-badge.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
