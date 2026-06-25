# Accessibility — sando-input

## ARIA pattern
Follows the [WAI-ARIA Textbox](https://www.w3.org/WAI/ARIA/apg/patterns/textbox/) pattern via native `<input>` element.

| Attribute | Value | Purpose |
|---|---|---|
| `aria-invalid` | `"true"` / `"false"` | Communicates validation error state |
| `aria-describedby` | Helper/error element ID | Links helper or error text to the input for context |
| `type` | `text`, `email`, `password`, `number`, etc. | Configures input semantics and keyboard type on mobile |

The component renders a native `<input>` element. Label association is handled by the `label` property which renders a `<label>` element linked via `for`/`id`.

## Keyboard map
| Key | Behavior |
|---|---|
| Tab | Move focus to/from the input |
| Shift+Tab | Move focus backward |
| Type | Enter text |
| Escape | Clear focus (browser default) |

## Screen reader behavior
Expected announcement when the element receives focus:
> "Email address, edit text" (VoiceOver)
> "Email address edit" (NVDA)

With helper text:
> "Email address, edit text. Must be a valid email address." (aria-describedby)

In error state:
> "Email address, invalid data, edit text. Please enter a valid email." (aria-invalid + aria-describedby)

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Input text vs background | Verified via axe-core | ✅ |
| Placeholder vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | Verified via axe-core | ✅ |
| Disabled state | Intentional reduced contrast | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-input.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
