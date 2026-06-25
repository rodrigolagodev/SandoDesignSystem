# Accessibility — sando-textarea

## ARIA pattern

Follows the [WAI-ARIA Textbox (multiline)](https://www.w3.org/WAI/ARIA/apg/patterns/textbox/) pattern via native `<textarea>` element.

| Attribute          | Value                   | Purpose                                    |
| ------------------ | ----------------------- | ------------------------------------------ |
| `aria-invalid`     | `"true"` / `"false"`    | Communicates validation error state        |
| `aria-required`    | `"true"` / `"false"`    | Communicates required state                |
| `aria-describedby` | Helper/error element ID | Links helper or error text to the textarea |

The component renders a native `<textarea>` element. Label association uses a `<label>` element linked via `for`/`id`.

## Keyboard map

| Key       | Behavior                                        |
| --------- | ----------------------------------------------- |
| Tab       | Move focus to/from the textarea                 |
| Shift+Tab | Move focus backward                             |
| Type      | Enter text                                      |
| Enter     | Insert new line                                 |
| Escape    | Deselect text / release focus (browser default) |

## Screen reader behavior

Expected announcement when the element receives focus:

> "Comment, text area" (VoiceOver)
> "Comment multi-line edit" (NVDA)

With helper text:

> "Comment, text area. Maximum 500 characters." (via aria-describedby)

In error state:

> "Comment, invalid data, text area. Please enter at least 10 characters."

## Color contrast

| Pair                        | Ratio                        | WCAG 2.1 AA |
| --------------------------- | ---------------------------- | ----------- |
| Textarea text vs background | Verified via axe-core        | ✅          |
| Placeholder vs background   | Verified via axe-core        | ✅          |
| Focus ring vs adjacent      | Verified via axe-core        | ✅          |
| Disabled state              | Intentional reduced contrast | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-textarea.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- None identified.
