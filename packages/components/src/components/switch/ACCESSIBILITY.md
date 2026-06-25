# Accessibility — sando-switch

## ARIA pattern
Follows the [WAI-ARIA Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) pattern.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `switch` | Distinguishes a toggle switch from a checkbox (`role="checkbox"`) |
| `aria-checked` | `"true"` / `"false"` | Communicates the on/off state |
| `aria-invalid` | `"true"` / `"false"` | Marks the switch as invalid when `error=true` |
| `aria-describedby` | Description element ID | Links helper or error text to the switch |

The switch renders a native `<input type="checkbox" role="switch">` inside a shadow `<label>`. The track and thumb are decorative (`role="presentation"`).

## Keyboard map
| Key | Behavior |
|---|---|
| Tab | Move focus to/from the switch |
| Shift+Tab | Move focus backward |
| Space | Toggle the switch on/off |
| Enter | Toggle the switch on/off |

## Screen reader behavior
Expected announcement when the element receives focus (off state):
> "Enable notifications, switch, off" (VoiceOver)

When toggled on:
> "Enable notifications, switch, on"

Error state:
> "This setting is required, invalid entry"

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Switch label vs background | Verified via axe-core | ✅ |
| Track vs background (on state) | Verified via axe-core | ✅ |
| Track vs background (off state) | Verified via axe-core | ✅ |
| Focus ring vs adjacent | Verified via axe-core | ✅ |
| Disabled state | Intentional reduced contrast | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-switch.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
