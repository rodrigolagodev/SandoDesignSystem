# Accessibility — sando-skeleton

## ARIA pattern
Follows the presentation/none pattern — the skeleton is a loading placeholder that should be hidden from assistive technology.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `presentation` | Removes the element from the accessibility tree |
| `aria-hidden` | `"true"` | Ensures the animated placeholder is completely invisible to AT |

Skeleton loaders are purely decorative. The actual content that replaces the skeleton carries its own semantics and accessible names.

## Keyboard map
| Key | Behavior |
|---|---|
| — | Not keyboard focusable — the skeleton is a decorative loading placeholder |

Skeleton components do not appear in the tab order.

## Screen reader behavior
The skeleton element is invisible to assistive technology (`role="presentation"` + `aria-hidden="true"`). Screen reader users should instead receive a loading announcement from the surrounding context (e.g., a parent container with `aria-busy="true"` or `aria-label="Loading..."`).

Recommended pattern for loading states:
```html
<div aria-busy="true" aria-label="Loading content">
  <sando-skeleton></sando-skeleton>
</div>
```

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Skeleton vs background | n/a — decorative, hidden from AT | n/a |
| Animation | n/a — decorative | n/a |

## Tested with
- jest-axe (automated, runs in `sando-skeleton.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
