# Accessibility — sando-avatar

## ARIA pattern

Follows the [WAI-ARIA Image](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern (img role).

| Attribute     | Value                 | Purpose                                                                         |
| ------------- | --------------------- | ------------------------------------------------------------------------------- |
| `role`        | `img`                 | Exposes the avatar as an image to assistive technology                          |
| `aria-label`  | `name` property value | Provides an accessible name for the avatar                                      |
| `aria-hidden` | `true`                | On the initials `<span>` — text is decorative (label already names the element) |
| `aria-hidden` | `true`                | On the presence indicator image — decorative                                    |

When a clickable avatar is rendered as `<a>` or `<button>`, it receives the appropriate interactive role and the `aria-label` from the `name` property.

## Keyboard map

| Key           | Behavior                                                                       |
| ------------- | ------------------------------------------------------------------------------ |
| Tab           | Move focus to/from the avatar (only when `clickable=true` or rendered as link) |
| Shift+Tab     | Move focus backward                                                            |
| Enter / Space | Activate (only when clickable)                                                 |

Non-clickable avatars (default) are not keyboard focusable — they are informational.

## Screen reader behavior

Expected announcement when the element receives focus (clickable mode):

> "Jane Doe, image" (VoiceOver) or "Jane Doe graphic" (NVDA)

For static (non-clickable) avatars, the element is not in the tab order. Screen readers reading the page in browse mode will announce: "Jane Doe, image".

## Color contrast

| Pair                        | Ratio                 | WCAG 2.1 AA |
| --------------------------- | --------------------- | ----------- |
| Initials text vs background | Verified via axe-core | ✅          |
| Focus ring vs adjacent      | Verified via axe-core | ✅          |
| Disabled state              | n/a                   | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-avatar.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- None identified.
