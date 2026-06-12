---
"@sando-ds/components": minor
---

Deprecate 13 preset skeleton components in favor of composing the two primitives `<sando-skeleton>` and `<sando-skeleton-paragraph>`:

- `sando-skeleton-article`, `sando-skeleton-avatar`, `sando-skeleton-button`, `sando-skeleton-card`, `sando-skeleton-comment`, `sando-skeleton-composer`, `sando-skeleton-image`, `sando-skeleton-list-item`, `sando-skeleton-media-card`, `sando-skeleton-profile`, `sando-skeleton-row`, `sando-skeleton-stack`, `sando-skeleton-table-row`.

Each component now emits a `@deprecated` JSDoc marker and a one-time `console.warn` on first connection. No props or rendering behavior change in this release — actual removal is tracked in #126.

Migration: see the new **Components → Skeleton → Patterns** story for direct, copy-pasteable replacements.
