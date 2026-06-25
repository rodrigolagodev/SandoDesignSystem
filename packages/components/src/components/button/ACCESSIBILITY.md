# Accessibility — sando-button

## ARIA pattern
Follows the [WAI-ARIA Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) pattern.

| Attribute | Value | Purpose |
|---|---|---|
| `aria-disabled` | `"true"` / `"false"` | Communicates disabled state without removing from tab order |
| `aria-busy` | `"true"` / `"false"` | Communicates loading state to screen readers |

The button renders as a native `<button>` element — no custom role needed. The accessible name comes from slotted text content.

## Keyboard map
| Key | Behavior |
|---|---|
| Tab | Move focus to/from the button |
| Shift+Tab | Move focus backward |
| Enter | Activate the button |
| Space | Activate the button |

## Screen reader behavior
Expected announcement when the element receives focus:
> "Submit, button" (VoiceOver) or "Submit button" (NVDA)

In loading state:
> "Submit, button" — with `aria-busy="true"`, some screen readers append "busy"

In disabled state:
> "Submit, dimmed, button" (VoiceOver) or "Submit button dimmed" (NVDA)

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Button text vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | Verified via axe-core | ✅ |
| Disabled state | Intentional reduced contrast | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-button.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
