# Accessibility — sando-option

## ARIA pattern
Follows the [WAI-ARIA Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) pattern — specifically the `option` role used within a `listbox`.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `option` | Marks the element as a selectable option in a listbox |
| `aria-selected` | `"true"` / `"false"` | Communicates the selected state |
| `aria-disabled` | `"true"` | Marks the option as non-interactive when `disabled=true` |

`sando-option` is designed to be used inside `sando-select` (which provides the `role="listbox"` container). It should not be used standalone outside of a listbox context.

## Keyboard map
| Key | Behavior |
|---|---|
| ArrowUp / ArrowDown | Navigate between options (managed by parent `sando-select`) |
| Enter / Space | Select the highlighted option (managed by parent `sando-select`) |
| Home | Move highlight to first option (managed by parent) |
| End | Move highlight to last option (managed by parent) |

Keyboard navigation is managed by the parent `sando-select` component using `aria-activedescendant`.

## Screen reader behavior
Expected announcement when an option is highlighted (via `aria-activedescendant`):
> "Option label, 3 of 10" (VoiceOver in a 10-item list)

When selected:
> "Option label, selected"

When disabled:
> "Option label, dimmed"

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Option text vs background | Verified via axe-core | ✅ |
| Selected option vs background | Verified via axe-core | ✅ |
| Disabled option vs background | Intentional reduced contrast | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-option.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
