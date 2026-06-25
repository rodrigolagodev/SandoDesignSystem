# Accessibility — sando-radio-group

## ARIA pattern

Follows the [WAI-ARIA Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) pattern.

| Attribute          | Value                   | Purpose                                                    |
| ------------------ | ----------------------- | ---------------------------------------------------------- |
| `role`             | `radiogroup`            | Groups related radio buttons under a common label          |
| `aria-labelledby`  | Label element ID        | Associates the group label with the radiogroup             |
| `aria-describedby` | Helper/error element ID | Links helper or error text to the group                    |
| `aria-required`    | `"true"`                | Marks the group as required when `required=true`           |
| `aria-disabled`    | `"true"`                | Marks all radios as non-interactive when group is disabled |
| `aria-invalid`     | `"true"`                | Marks the group as invalid when `error=true`               |

The options container uses `role="presentation"` to avoid spurious grouping in the accessibility tree. An error container uses `role="alert"` for assertive error announcements.

## Keyboard map

| Key                    | Behavior                                                     |
| ---------------------- | ------------------------------------------------------------ |
| Tab                    | Move focus into the radio group (to first or selected radio) |
| Shift+Tab              | Move focus out of the radio group                            |
| ArrowRight / ArrowDown | Select the next radio in the group                           |
| ArrowLeft / ArrowUp    | Select the previous radio in the group                       |
| Space                  | Select the focused radio                                     |

## Screen reader behavior

Expected announcement when focus enters the group:

> "Choose a color, group" (VoiceOver)

When navigating radios:

> "Red, radio button, 1 of 3" then "Blue, radio button, 2 of 3"

Error announcement:

> Error text is announced assertively via `role="alert"` when error appears

## Color contrast

| Pair                      | Ratio                        | WCAG 2.1 AA |
| ------------------------- | ---------------------------- | ----------- |
| Group label vs background | Verified via axe-core        | ✅          |
| Error text vs background  | Verified via axe-core        | ✅          |
| Focus ring vs adjacent    | Verified via axe-core        | ✅          |
| Disabled state            | Intentional reduced contrast | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-radio-group.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- None identified.
