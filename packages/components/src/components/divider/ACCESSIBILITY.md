# Accessibility — sando-divider

## ARIA pattern

Follows the [WAI-ARIA Separator](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern.

| Attribute          | Value                            | Purpose                                                           |
| ------------------ | -------------------------------- | ----------------------------------------------------------------- |
| `role`             | `separator` (implicit on `<hr>`) | Marks the element as a thematic separator                         |
| `aria-label`       | Label text                       | Set when a text label is present — announces the section division |
| `aria-orientation` | `"vertical"`                     | Set on vertical dividers to distinguish orientation               |

Three rendering modes:

- **Horizontal without label** → native `<hr>` (implicit `role="separator"`)
- **Horizontal with label** → `<div role="separator" aria-label="...">` with pseudo-element decorative lines
- **Vertical** → `<div role="separator" aria-orientation="vertical">`

## Keyboard map

| Key | Behavior                                                                |
| --- | ----------------------------------------------------------------------- |
| —   | Not keyboard focusable — the divider is a structural/decorative element |

Dividers are non-interactive. They do not appear in the tab order.

## Screen reader behavior

Expected announcement in browse mode:

- Without label: "separator" (NVDA) or no announcement (VoiceOver skips separators)
- With label: "Section name, separator"

## Color contrast

| Pair                       | Ratio                 | WCAG 2.1 AA |
| -------------------------- | --------------------- | ----------- |
| Divider line vs background | Verified via axe-core | ✅          |
| Label text vs background   | Verified via axe-core | ✅          |
| Focus ring vs adjacent     | n/a — not focusable   | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-divider.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- None identified.
