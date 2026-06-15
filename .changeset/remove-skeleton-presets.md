---
"@sando-ds/components": minor
---

Remove 13 preset skeleton components. Compose `<sando-skeleton>` and `<sando-skeleton-paragraph>` directly — see **Components → Skeleton → Patterns** for canonical recipes.

Removed (each had a single canonical replacement in the Patterns story):

- `sando-skeleton-article`
- `sando-skeleton-avatar`
- `sando-skeleton-button`
- `sando-skeleton-card`
- `sando-skeleton-comment`
- `sando-skeleton-composer`
- `sando-skeleton-image`
- `sando-skeleton-list-item`
- `sando-skeleton-media-card`
- `sando-skeleton-profile`
- `sando-skeleton-row`
- `sando-skeleton-stack`
- `sando-skeleton-table-row`

Public API surface now: `<sando-skeleton>`, `<sando-skeleton-text>`, `<sando-skeleton-paragraph>`. `<sando-card loading>` internally composes the same two primitives instead of the removed `<sando-skeleton-card>` (behavior unchanged from the consumer's perspective).
