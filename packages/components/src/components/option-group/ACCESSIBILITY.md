# Accessibility — sando-option-group

## ARIA pattern
Follows the [WAI-ARIA Group](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern for grouping options within a listbox.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `group` | Groups related options under a common label |
| `aria-label` | Group label text | Names the group for screen readers |
| `aria-disabled` | `"true"` / `"false"` | Marks all options in the group as non-interactive when group is disabled |

The options container inside the group uses `role="presentation"` to avoid spurious nesting in the accessibility tree.

`sando-option-group` is designed to be used inside `sando-select`. It should not be used outside of a listbox context.

## Keyboard map
| Key | Behavior |
|---|---|
| ArrowUp / ArrowDown | Navigate through options across groups (managed by parent `sando-select`) |

Keyboard navigation is managed by the parent `sando-select` component. The group heading itself is not focusable.

## Screen reader behavior
When navigating into a group, the group name is announced:
> "Fruits group" (VoiceOver) before announcing the first option

When a disabled group is encountered:
> Options within are announced as "dimmed" or "unavailable"

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Group label text vs background | Verified via axe-core | ✅ |
| Disabled group label vs background | Intentional reduced contrast | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-option-group.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
