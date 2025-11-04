## Summary

<!-- Brief description of changes and motivation -->

## Changes

<!-- Detailed list of specific changes -->

-
-
-

## Test Plan

<!-- Verify all applicable items -->

- [ ] Unit tests pass (`pnpm test`)
- [ ] E2E tests pass (`pnpm --filter @sando/components test:e2e`)
- [ ] Accessibility tests pass (jest-axe)
- [ ] Manual testing completed
- [ ] Storybook stories added/updated (if component changes)
- [ ] VitePress docs updated (if public API changes)

## Changeset

<!-- Required for public API changes -->

- [ ] Changeset created (run `pnpm changeset` if this PR changes public APIs)
- [ ] Breaking changes documented (if major version bump)

**Public API changes include:**

- Component props, events, slots, CSS parts, methods
- Token values or structure
- Build output or distribution format
- Peer dependency requirements

**Skip changeset for:**

- Documentation only (Storybook stories, VitePress guides)
- Internal implementation (no API changes)
- Test files
- Development tooling

## Screenshots/Videos

<!-- If applicable, add visual evidence of changes -->

<!--
Example:
**Before:**
![before](url)

**After:**
![after](url)
-->

---

## Checklist for Reviewer

- [ ] Code follows [CODE_STYLE.md](https://github.com/rodrigolagodev/sandodesignsystem/blob/master/.claude/guidelines/03-development/CODE_STYLE.md)
- [ ] Naming follows [NAMING_CONVENTIONS.md](https://github.com/rodrigolagodev/sandodesignsystem/blob/master/.claude/guidelines/03-development/NAMING_CONVENTIONS.md)
- [ ] Tests follow [TESTING_STRATEGY.md](https://github.com/rodrigolagodev/sandodesignsystem/blob/master/.claude/guidelines/03-development/TESTING_STRATEGY.md)
- [ ] Commits follow [GIT_WORKFLOW.md](https://github.com/rodrigolagodev/sandodesignsystem/blob/master/.claude/guidelines/03-development/GIT_WORKFLOW.md)
- [ ] PR title follows conventional commit format
- [ ] All CI checks pass (test, lint, build)
