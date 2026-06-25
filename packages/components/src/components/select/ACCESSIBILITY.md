# Accessibility — sando-select

## ARIA pattern
Follows the [WAI-ARIA Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) pattern with a listbox popup.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `combobox` | On the trigger button — marks it as a combobox |
| `aria-haspopup` | `"listbox"` | Indicates that the combobox controls a listbox popup |
| `aria-expanded` | `"true"` / `"false"` | Communicates whether the listbox is open |
| `aria-controls` | Listbox element ID | Associates the trigger with its listbox |
| `aria-activedescendant` | Highlighted option ID | Tracks the currently highlighted option |
| `aria-required` | `"true"` | Marks the select as required |
| `aria-invalid` | `"true"` / `"false"` | Marks the select as invalid when `error=true` |
| `aria-disabled` | `"true"` | Marks the select as non-interactive |
| `aria-busy` | `"true"` | Set during loading state |
| `aria-describedby` | Description element ID | Links helper/error text to the select |
| `role` | `listbox` | On the dropdown container |
| `aria-labelledby` | Label element ID | Associates the label with the listbox |
| `aria-multiselectable` | `"true"` | Set when `multiple=true` |
| `aria-label` | `"Clear selection"` | On the clear button |

## Keyboard map
| Key | Behavior |
|---|---|
| Tab | Move focus to/from the select trigger |
| Shift+Tab | Move focus backward |
| Enter / Space | Open the dropdown / select highlighted option |
| ArrowDown | Open dropdown or move highlight to next option |
| ArrowUp | Move highlight to previous option |
| Home | Move highlight to first option |
| End | Move highlight to last option |
| Escape | Close the dropdown without selecting |
| Printable characters | Type-ahead to jump to matching option |

## Screen reader behavior
Expected announcement when trigger receives focus (closed):
> "Country, combobox, collapsed"

When opened:
> "Country, combobox, expanded"

When navigating options via `aria-activedescendant`:
> "France, 5 of 10"

When selected:
> "France, selected"

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Select text vs background | Verified via axe-core | ✅ |
| Dropdown option vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | Verified via axe-core | ✅ |
| Disabled state | Intentional reduced contrast | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-select.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
