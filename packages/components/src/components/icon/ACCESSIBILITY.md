# Accessibility — sando-icon

## ARIA pattern
Follows the [WAI-ARIA Image](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern — either `img` (semantic) or `presentation` (decorative).

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `img` (default) / `presentation` (when `decorative=true`) | Semantic: exposed as image; Decorative: hidden from AT |
| `aria-label` | Icon name or custom label | Provides the accessible name for semantic icons |
| `aria-hidden` | `"true"` (when `decorative=true`) | Completely hides decorative icons from assistive technology |

Usage guidelines:
- Use `decorative` attribute when the icon is accompanied by visible text that already communicates the meaning.
- Provide `aria-label="Delete item"` on semantic icons that convey meaning without accompanying text.

## Keyboard map
| Key | Behavior |
|---|---|
| — | Not keyboard focusable — icons are non-interactive presentational elements |

## Screen reader behavior
Semantic icon (default):
> "trash, image" (VoiceOver) or "trash graphic" (NVDA) — using the icon name as label

With custom `aria-label="Delete item"`:
> "Delete item, image"

Decorative icon (`decorative` attribute):
> Not announced — completely hidden from assistive technology

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Icon fill vs background | Verified via axe-core | ✅ |
| Focus ring vs adjacent | n/a — not focusable | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with
- jest-axe (automated, runs in `sando-icon.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
