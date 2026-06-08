---
name: issue-creation
description: >
  Issue creation workflow for Sando Design System. Creates well-structured GitHub issues
  for bug reports and feature requests following project conventions.
  Trigger: When creating a GitHub issue, reporting a bug, or requesting a feature.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0-sando"
---

## When to Use

Use this skill when:

- Creating a GitHub issue (bug report or feature request)
- Helping a contributor file an issue

---

## Workflow

```
1. Search existing issues for duplicates
2. Choose the correct template (Bug Report or Feature Request)
3. Fill in ALL required fields
4. Submit the issue
5. Once ready, open a PR referencing the issue
```

---

## Issue Types

### Bug Report

Use when: a component, token, story, or agent is behaving incorrectly.

Required fields:

- **Title**: `fix(scope): short description` (conventional commit format)
- **Bug Description**: clear explanation of what's wrong
- **Steps to Reproduce**: numbered, minimal steps
- **Expected Behavior**: what should happen
- **Actual Behavior**: what actually happens (include errors/console output)
- **Affected Area**: component name, token layer, Storybook, agents, CI

```bash
gh issue create \
  --title "fix(input): focus ring not visible in high-contrast mode" \
  --body "## Bug Description
The focus ring on sando-input is invisible when the OS is in high-contrast mode.

## Steps to Reproduce
1. Enable high-contrast mode on macOS/Windows
2. Navigate to any page with a sando-input
3. Tab to the input field

## Expected Behavior
A visible focus ring styled with the flavor's focus.ring token.

## Actual Behavior
No focus ring visible — fails WCAG 2.4.7.

## Affected Area
sando-input component, flavor-high-contrast.json tokens"
```

---

### Feature Request

Use when: proposing a new component, token, story pattern, or agent improvement.

Required fields:

- **Title**: `feat(scope): short description` (conventional commit format)
- **Problem Description**: the pain point this solves
- **Proposed Solution**: how it should work from the user's perspective
- **Affected Area**: component, tokens, Storybook, agents, docs, CI

```bash
gh issue create \
  --title "feat(skeleton): add skeleton loading state to sando-card" \
  --body "## Problem Description
When card data is loading asynchronously, there is no visual placeholder — the UI jumps from empty to populated.

## Proposed Solution
Add a loading boolean prop to sando-card that renders sando-skeleton-* primitives matching the card layout.

## Affected Area
sando-card component, skeleton-creator skill"
```

---

## Sando-specific Scope Reference

Use these scopes in issue titles to match conventional commit scopes:

| Area                 | Scope                                         |
| -------------------- | --------------------------------------------- |
| Component (specific) | component name: `button`, `input`, `checkbox` |
| All components       | `components`                                  |
| Token system         | `tokens`                                      |
| Specific flavor      | `flavor-sando`, `flavor-nori`, etc.           |
| Storybook            | `storybook`                                   |
| Documentation (MDX)  | `docs`                                        |
| AI agents            | `agents`                                      |
| Build / CI           | `build`, `ci`                                 |

---

## Commands

```bash
# Search existing issues before creating
gh issue list --search "keyword"
gh issue list --label "bug"

# Create issue (interactive)
gh issue create

# Create issue with title and body inline
gh issue create --title "fix(scope): description" --body "..."

# View issue
gh issue view <number>
```
