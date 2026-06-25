# Accessibility — sando-radio

## ARIA pattern

Follows the [WAI-ARIA Radio Button](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) pattern via native `<input type="radio">`.

| Attribute          | Value                | Purpose                                                             |
| ------------------ | -------------------- | ------------------------------------------------------------------- |
| `aria-checked`     | `"true"` / `"false"` | Communicates the checked state (redundant with native but explicit) |
| `aria-invalid`     | `"true"` / `"false"` | Marks the radio as invalid when `error=true`                        |
| `aria-describedby` | Error/helper text ID | Links error or helper text to the input                             |

The component renders a native `<input type="radio">` inside a shadow `<label>`. The visual radio box uses `role="presentation"` (decorative).

## Keyboard map

| Key                    | Behavior                                                |
| ---------------------- | ------------------------------------------------------- |
| Tab                    | Move focus to the radio group (first or selected radio) |
| Shift+Tab              | Move focus backward                                     |
| ArrowRight / ArrowDown | Select the next radio in the group                      |
| ArrowLeft / ArrowUp    | Select the previous radio in the group                  |
| Space                  | Select the focused radio                                |

When used inside `sando-radio-group`, arrow key navigation between radios is handled by the group component.

## Screen reader behavior

Expected announcement when the element receives focus:

> "Option A, radio button, 1 of 3" (VoiceOver)

When checked:

> "Option A, selected, radio button"

Error state:

> "Please select an option, invalid entry" (from aria-invalid + aria-describedby)

## Color contrast

| Pair                           | Ratio                        | WCAG 2.1 AA |
| ------------------------------ | ---------------------------- | ----------- |
| Radio label text vs background | Verified via axe-core        | ✅          |
| Radio indicator vs background  | Verified via axe-core        | ✅          |
| Focus ring vs adjacent         | Verified via axe-core        | ✅          |
| Disabled state                 | Intentional reduced contrast | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-radio.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- None identified.
