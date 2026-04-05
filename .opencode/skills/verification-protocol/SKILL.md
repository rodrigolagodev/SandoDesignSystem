---
name: verification-protocol
description: >-
  Canonical verification protocol for Sando Design System agents. Provides
  the exact commands, decision trees, and thresholds each specialist agent
  must run after completing work. Replaces per-agent `<verification>` blocks
  that are duplicated with slight variations across agents. Trigger: inject
  into sub-agent prompts so each agent knows exactly what to run and what
  "done" means.

license: MIT
metadata:
  version: 1.0.0
  author: Sando Design System
---

# Verification Protocol

Canonical post-work verification for every Sando specialist agent.
Inject the matching section into sub-agent prompts under
`## Verification Protocol (auto-resolved)`.

---

## DEVELOPER Verification

Run **in sequence** after any code change:

```bash
pnpm lint        # ESLint — must pass (0 errors)
pnpm typecheck   # TypeScript — must pass (0 errors)
pnpm test        # Vitest — must pass (all green)
```

**Decision tree:**

```
lint fails    → fix lint errors → re-run lint
typecheck fails → fix type errors → re-run typecheck
tests fail    → fix tests (or update if behavior intentionally changed) → re-run tests

ALL PASS → mark complete
ANY FAIL → mark partial/blocked — never mark complete
```

**Quick path** (small non-logic changes): `pnpm lint && pnpm typecheck`

---

## TOKENS Verification

Run after any token file change:

```bash
pnpm tokens:build          # Style Dictionary — must succeed
ls packages/tokens/dist/css/  # Verify output exists
```

**Decision tree:**

```
build fails → check JSON syntax → verify all references exist → fix → rebuild
output missing → re-run build → check config

BUILD PASSES + output present → mark complete
BUILD FAILS → mark partial — never mark complete
```

---

## QUALITY Verification

Run after writing or modifying tests:

```bash
pnpm test              # All tests must pass
pnpm test:coverage     # Coverage report
```

**Thresholds (blocking):**

| Metric              | Threshold                  |
| ------------------- | -------------------------- |
| Unit test coverage  | ≥ 80%                      |
| A11y test coverage  | 100% for public components |
| axe-core violations | 0 critical or serious      |

**Decision tree:**

```
tests fail       → fix test or report bug in component → re-run tests
coverage < 80%   → add more tests → re-run coverage
a11y violations  → report to sando-developer for fix → re-test

ALL THRESHOLDS MET → mark complete
ANY THRESHOLD MISSED → mark partial — never mark complete
```

---

## STORYBOOK Verification

After creating or modifying stories:

```bash
pnpm storybook:build   # Must succeed (0 errors)
```

**Manual checklist:**

- [ ] All story controls render correctly
- [ ] FlavorDecorator applies without errors
- [ ] No console errors in browser
- [ ] A11y addon shows 0 violations per story

**Decision tree:**

```
build fails   → fix story syntax/imports → rebuild
a11y failures → report to sando-developer or sando-quality

BUILD PASSES → mark complete
BUILD FAILS  → mark partial
```

---

## ARCHITECT Verification

After proposing a design or ADR:

```bash
pnpm build     # Full monorepo build — must still pass
```

**Checklist:**

- [ ] Decision documented in ADR format (title, status, context, decision, consequences)
- [ ] Token layer references are correct (no layer violations)
- [ ] Breaking changes flagged with migration guide
- [ ] Affected .toon guideline files updated or flagged for update

---

## DOCUMENTER Verification

After writing docs or JSDoc:

```bash
pnpm typecheck   # JSDoc types must be valid
```

**Checklist:**

- [ ] All public `@property` decorators have JSDoc
- [ ] `@fires` documented for all custom events
- [ ] `@slot` documented for all named slots
- [ ] `@csspart` documented for all CSS parts
- [ ] No broken links in VitePress docs

---

## Compact Rules (for skill-registry)

- Inject the matching agent-role section into sub-agent prompts under `## Verification Protocol (auto-resolved)`
- Agents MUST run the specified commands before marking STATUS: complete
- Never mark `complete` if any blocking check fails — use `partial` or `blocked`
- The Return Envelope STATUS field maps directly to these outcomes:
  - `complete` = all verification checks passed
  - `partial` = some deliverables done but verification failed
  - `blocked` = cannot proceed (missing dependency, critical build error)
