# Accessibility — sando-card

## ARIA pattern

Follows the [WAI-ARIA Article](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern when used as a content container.

| Attribute         | Value                | Purpose                                                                |
| ----------------- | -------------------- | ---------------------------------------------------------------------- |
| `aria-labelledby` | Heading element ID   | Associates the card heading as its accessible name                     |
| `aria-label`      | Optional override    | Replaces `aria-labelledby` when `aria-label` prop is set               |
| `aria-disabled`   | `"true"` / `"false"` | Marks the card as non-interactive without removing it from browse mode |
| `aria-busy`       | `"true"` / `"false"` | Set during loading skeleton state                                      |

The `heading-level` property controls the rendered heading element (`h1`–`h6`) for correct document outline.

## Keyboard map

| Key           | Behavior                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| Tab           | Move focus to the card (when `clickable=true`) or to interactive children |
| Shift+Tab     | Move focus backward                                                       |
| Enter / Space | Activate the card (when `clickable=true`)                                 |

Non-clickable cards are not keyboard focusable themselves; interactive children within slots remain in the tab order.

## Screen reader behavior

Expected announcement when the card receives focus (clickable mode):

> "Card title, article" or "Card title, link" depending on rendering

In loading state:

> Card is marked `aria-busy="true"`, indicating content is still loading

## Color contrast

| Pair                    | Ratio                        | WCAG 2.1 AA |
| ----------------------- | ---------------------------- | ----------- |
| Card text vs background | Verified via axe-core        | ✅          |
| Focus ring vs adjacent  | Verified via axe-core        | ✅          |
| Disabled state          | Intentional reduced contrast | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-card.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- None identified.
