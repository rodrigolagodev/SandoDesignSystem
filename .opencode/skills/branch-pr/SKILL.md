---
name: branch-pr
description: >
  PR creation workflow for Sando Design System. Ensures conventional commits,
  correct branch naming, CI-passing PRs, and well-structured PR bodies.
  Trigger: When creating a pull request, opening a PR, or preparing changes for review.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0-sando"
---

## When to Use

Use this skill when:

- Creating a pull request for any change
- Preparing a branch for submission
- Helping a contributor open a PR

---

## Critical Rules

1. **Conventional commits** — every commit MUST follow `type(scope): description`
2. **Branch naming** — must match `type/description` pattern
3. **CI must pass** — build is blocking; tests and lint are informational
4. **No Co-Authored-By or AI attribution** in commits — ever

---

## Workflow

```
1. Create branch: type/description (see Branch Naming below)
2. Implement changes with conventional commits
3. Push and open PR using the template at .github/PULL_REQUEST_TEMPLATE.md
4. Verify CI passes (build is blocking)
```

---

## Branch Naming

Branch names MUST match:

```
^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$
```

**Format:** `type/description` — lowercase, no spaces, only `a-z0-9._-` in description.

| Type        | Branch pattern           | Example                             |
| ----------- | ------------------------ | ----------------------------------- |
| Feature     | `feat/<description>`     | `feat/sando-card-component`         |
| Bug fix     | `fix/<description>`      | `fix/focus-ring-input`              |
| Chore       | `chore/<description>`    | `chore/update-dependencies`         |
| Docs        | `docs/<description>`     | `docs/button-api-reference`         |
| Style       | `style/<description>`    | `style/storybook-theme`             |
| Refactor    | `refactor/<description>` | `refactor/extract-flavorable-mixin` |
| Performance | `perf/<description>`     | `perf/reduce-token-build-time`      |
| Test        | `test/<description>`     | `test/add-a11y-coverage`            |
| Build       | `build/<description>`    | `build/update-vite-config`          |
| CI          | `ci/<description>`       | `ci/add-token-validation`           |
| Revert      | `revert/<description>`   | `revert/broken-skeleton-change`     |

---

## PR Body Format

The PR template is at `.github/PULL_REQUEST_TEMPLATE.md`. Every PR body MUST contain a clear **Summary** section (1-3 bullet points) describing what was done and why.

---

## CI Checks (Sando)

The `pr.yml` workflow runs on every PR:

| Check                | Blocking?        | What it verifies                    |
| -------------------- | ---------------- | ----------------------------------- |
| Build (`pnpm build`) | ✅ Yes           | Full monorepo builds without errors |
| Tests (`pnpm test`)  | ℹ️ Informational | Unit + a11y tests pass              |
| Lint (`pnpm lint`)   | ℹ️ Informational | TypeScript + ESLint                 |

**The PR cannot merge if build fails.** Test and lint failures are reported but non-blocking.

---

## Conventional Commits

Commit messages MUST match:

```
^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9\._-]+\))?!?: .+
```

**Format:** `type(scope): description`

- `type` — required: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
- `(scope)` — optional, use component/package name: `button`, `tokens`, `storybook`, `agents`
- `!` — optional, indicates breaking change
- `description` — required, imperative mood, lowercase

Examples for Sando:

```
feat(button): add loading state with spinner
fix(input): correct focus ring visibility in dark mode
refactor(checkbox): extract interaction logic to mixin
docs(api): add JSDoc to sando-select properties
chore(tokens): update amber scale to match new brand
test(badge): add a11y tests for status variant
style(storybook): align preview colors with sando flavor tokens
```

---

## Commands

```bash
# Create branch
git checkout -b feat/my-component main

# Push and create PR
git push -u origin feat/my-component
gh pr create --title "feat(scope): description" --body "$(cat .github/PULL_REQUEST_TEMPLATE.md)"
```
