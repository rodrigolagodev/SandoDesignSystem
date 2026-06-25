# Accessibility — sando-skeleton-paragraph

## ARIA pattern
Follows the presentation/none pattern — the skeleton paragraph is a loading placeholder that should be hidden from assistive technology.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `presentation` (on `sando-skeleton` children) | Removes individual skeleton lines from the accessibility tree |
| `aria-hidden` | `"true"` (on `sando-skeleton` children) | Ensures animated placeholders are invisible to AT |

`sando-skeleton-paragraph` composes multiple `sando-skeleton` instances. Each skeleton line carries `role="presentation"` and `aria-hidden="true"`.

## Keyboard map
| Key | Behavior |
|---|---|
| — | Not keyboard focusable — the skeleton paragraph is a decorative loading placeholder |

Skeleton components do not appear in the tab order.

## Screen reader behavior
The skeleton paragraph element is invisible to assistive technology. Screen reader users should receive a loading announcement from the surrounding context.

Recommended pattern:
```html
<div aria-busy="true" aria-label="Loading article">
  <sando-skeleton-paragraph lines="4"></sando-skeleton-paragraph>
</div>
```

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Skeleton lines vs background | n/a — decorative, hidden from AT | n/a |

## Tested with
- jest-axe (automated, runs in `sando-skeleton-paragraph.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- None identified.
