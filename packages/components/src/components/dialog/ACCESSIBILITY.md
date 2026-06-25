# Accessibility — sando-dialog

## ARIA pattern

Follows the [WAI-ARIA Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) pattern.

| Attribute          | Value                    | Purpose                                                                                |
| ------------------ | ------------------------ | -------------------------------------------------------------------------------------- |
| `role`             | `dialog` / `alertdialog` | `dialog` for standard modals; `alertdialog` for confirmations requiring acknowledgment |
| `aria-modal`       | `"true"`                 | Tells assistive technology that content behind the dialog is inert                     |
| `aria-labelledby`  | `"dialog-title"`         | Associates the dialog title as its accessible name                                     |
| `aria-describedby` | Description element ID   | Associates optional description text with the dialog                                   |

When `no-header=true` is set, an `aria-label` must be provided on the element for accessibility.

## Keyboard map

| Key       | Behavior                                                                 |
| --------- | ------------------------------------------------------------------------ |
| Tab       | Move focus to the next focusable element within the dialog (trapped)     |
| Shift+Tab | Move focus to the previous focusable element within the dialog (trapped) |
| Escape    | Close the dialog (when `dismissible=true`, which is the default)         |

Focus is trapped within the dialog while open. Focus moves to `[autofocus]` element or the dialog panel on open. Focus returns to the previously focused element on close.

## Screen reader behavior

Expected announcement when the dialog opens:

> "Dialog title, dialog" followed by the dialog description (if present)

For `alertdialog`:

> Immediately announces dialog title and content — does not wait for user navigation

## Color contrast

| Pair                      | Ratio                 | WCAG 2.1 AA |
| ------------------------- | --------------------- | ----------- |
| Dialog text vs background | Verified via axe-core | ✅          |
| Focus ring vs adjacent    | Verified via axe-core | ✅          |
| Backdrop overlay          | n/a — decorative      | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-dialog.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- Focus trap uses the `inert` attribute on sibling elements. Browsers without `inert` support may allow focus to escape the dialog.
