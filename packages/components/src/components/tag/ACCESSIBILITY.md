# Accessibility — sando-tag

## ARIA pattern

Follows the [WAI-ARIA Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) pattern for interactive tags; uses generic `<span>` for static tags.

| Attribute       | Value                | Purpose                                                             |
| --------------- | -------------------- | ------------------------------------------------------------------- |
| `aria-label`    | Remove/action label  | On the action button — provides context (e.g., "Remove JavaScript") |
| `aria-disabled` | `"true"` / `"false"` | On the action button when the tag is disabled                       |
| `tabindex`      | `0` / `-1`           | On the action button — `-1` when disabled                           |
| `aria-hidden`   | `"true"`             | On the divider separator — decorative                               |
| `aria-hidden`   | `"true"`             | On the icon wrapper — icon is decorative                            |

Three modes:

- **Static** (`removable=false`, `clickable=false`): `<span>` — not interactive, not focusable
- **Removable** (`removable=true`): Contains a `<button>` with `aria-label="Remove <tag-text>"`
- **Clickable** (`clickable=true`): Contains a `<button>` with appropriate `aria-label`

## Keyboard map

| Key           | Behavior                                                        |
| ------------- | --------------------------------------------------------------- |
| Tab           | Move focus to the action button (removable/clickable tags only) |
| Shift+Tab     | Move focus backward                                             |
| Enter / Space | Activate the action (remove or click)                           |

Static tags are not keyboard focusable.

## Screen reader behavior

Static tag (browse mode):

> "JavaScript" (text content read inline)

Removable tag (focused on button):

> "Remove JavaScript, button"

Clickable tag (focused on button):

> "JavaScript, button"

## Color contrast

| Pair                   | Ratio                        | WCAG 2.1 AA |
| ---------------------- | ---------------------------- | ----------- |
| Tag text vs background | Verified via axe-core        | ✅          |
| Focus ring vs adjacent | Verified via axe-core        | ✅          |
| Disabled state         | Intentional reduced contrast | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-tag.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- None identified.
