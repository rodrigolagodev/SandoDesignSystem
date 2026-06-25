# Accessibility — sando-tooltip

## ARIA pattern
Follows the [WAI-ARIA Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) pattern.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `tooltip` | Marks the tooltip bubble as a tooltip |
| `aria-hidden` | `"true"` (closed) / `"false"` (open) | Hides the tooltip from AT when not visible |
| `aria-describedby` | Tooltip element ID | Injected onto the slotted trigger element to associate the tooltip |

The tooltip component injects `aria-describedby` onto the first slotted element (the trigger) pointing to the tooltip bubble's ID. This is cleaned up when the tooltip is disconnected.

Implements WCAG 1.4.13 (Content on Hover or Focus): the tooltip remains visible when the pointer moves from trigger into the tooltip bubble.

## Keyboard map
| Key | Behavior |
|---|---|
| Tab | Move focus to the trigger element (tooltip appears) |
| Shift+Tab | Move focus backward (tooltip hides) |
| Escape | Hide the tooltip |
| Mouse hover | Show the tooltip |
| Mouse move to tooltip | Tooltip remains visible (WCAG 1.4.13) |

The tooltip trigger itself is a slotted element — keyboard behavior of the trigger (Enter/Space) depends on the trigger element type (button, link, etc.).

## Screen reader behavior
Expected announcement when the trigger receives focus:
> "Delete item, button. Permanently removes this record." (button text + tooltip via aria-describedby)

The tooltip content is announced as supplementary description, not as a separate element.

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Tooltip text vs tooltip background | Verified via axe-core | ✅ |
| Trigger focus ring vs adjacent | Verified via axe-core | ✅ |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-tooltip.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
