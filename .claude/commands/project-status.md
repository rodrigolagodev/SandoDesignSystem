---
description: Show comprehensive project status (git, builds, tests, coverage)
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git log:*), Bash(ls:*), Read, Glob
---

Show comprehensive status for Sando Design System.

# Git Status

Execute git commands to gather repository information:

```bash
# Current branch
git branch --show-current

# Git status (short format)
git status --short

# Last commit
git log -1 --oneline

# Uncommitted changes statistics
git diff --stat
```

Analyze the git state:

- Are there uncommitted changes?
- Are there untracked files?
- What branch are we on?
- Is the working directory clean?

# Build Status

Check build artifacts for all packages and compare timestamps with source files to detect stale builds.

## @sando/tokens

Check if `packages/tokens/dist/sando-tokens/` exists:

- If exists: Compare modification time with source files in `packages/tokens/src/`
- If dist is older than source → ⚠️ "Tokens need rebuild"
- If dist is recent → ✅ "Tokens are fresh"
- If dist doesn't exist → ❌ "Tokens not built"

Files to check:

- `packages/tokens/dist/sando-tokens/css/ingredients.css`
- `packages/tokens/dist/sando-tokens/css/flavors/`
- `packages/tokens/dist/sando-tokens/css/recipes/`

## @sando/components

Check if `packages/components/dist/` exists:

- If exists: Compare with source files in `packages/components/src/`
- If dist is older than source → ⚠️ "Components need rebuild"
- If dist is recent → ✅ "Components are fresh"
- If dist doesn't exist → ❌ "Components not built"

## @sando/docs (Storybook)

Check if `apps/docs/storybook-static/` exists:

- If exists → ✅ "Storybook built"
- If not exists → ⚠️ "Storybook not built (run `pnpm docs:build`)"

## @sando/site (VitePress)

Check if `apps/site/.vitepress/dist/` exists:

- If exists → ✅ "VitePress built"
- If not exists → ⚠️ "VitePress not built (run `pnpm site:build`)"

# Test Status

Check if coverage reports exist and parse them:

## Coverage Analysis

If `coverage/coverage-summary.json` exists:

1. Read and parse the JSON file
2. Extract overall coverage percentage
3. Extract per-package coverage:
   - @sando/tokens coverage %
   - @sando/components coverage %
4. Identify packages below 85% threshold
5. Show summary with visual indicators

If coverage doesn't exist:

- ⚠️ "No coverage data (run `pnpm test:coverage`)"

## Recent Test Results

Check if tests have been run recently:

- Look for test result files or recent test output
- If recent test failures exist, flag them

# Analysis & Recommendations

Based on all the gathered information, provide actionable recommendations:

## Scenario 1: Everything is Good ✅

- All builds are fresh (dist newer than source)
- No uncommitted changes or only safe untracked files
- Test coverage >85% across all packages
- Recommendation: **"Ready to develop"**

## Scenario 2: Builds are Stale ⚠️

- Tokens source newer than dist
- Components depend on stale tokens
- Recommendation: **"Run `pnpm build` to rebuild stale artifacts"**
- Explain: "Tokens were modified 2 hours ago but components dist is 3 hours old"

## Scenario 3: Tests Failing ❌

- Test failures detected
- Recommendation: **"Fix failing tests before continuing"**
- List which tests are failing if known

## Scenario 4: Uncommitted Changes 🚧

- Multiple uncommitted files detected
- Recommendation: **"Review uncommitted changes in X files before commit"**
- List the files with changes

## Scenario 5: Missing Builds ❌

- dist/ folders don't exist
- Recommendation: **"Run `pnpm build` to build all packages"**
- Explain build order: tokens → components → docs/site

## Scenario 6: Coverage Below Threshold ⚠️

- Some packages below 85% coverage
- Recommendation: **"Increase test coverage for @sando/components (currently 78%)"**

# Output Format

Use emojis and clear formatting for visual clarity:

```
🔍 Sando Design System - Project Status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 GIT STATUS

Branch: master
Status: 3 untracked files
Last commit: d2d7000 chore: update Node.js requirement from 18 to 20
Uncommitted changes: None

Untracked files:
  ?? .claude/skills/
  ?? commands-implementation-plan.md
  ?? skills-implementation-plan.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️  BUILD STATUS

@sando/tokens:
  ✅ Built and fresh
  Last build: 2 hours ago
  Source modified: 3 hours ago
  Status: Up to date

@sando/components:
  ⚠️  Stale build detected
  Last build: 5 hours ago
  Source modified: 1 hour ago
  Status: Needs rebuild

@sando/docs (Storybook):
  ✅ Built (storybook-static/ exists)

@sando/site (VitePress):
  ❌ Not built (run `pnpm site:build`)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧪 TEST STATUS

Overall Coverage: 89.4% ✅ (target: >85%)

By Package:
  @sando/tokens:     95.2% ✅
  @sando/components: 87.1% ✅

Last test run: 30 minutes ago
Test results: All passing ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 RECOMMENDATIONS

⚠️  Action Required:
1. Rebuild components: `pnpm --filter @sando/components build`
   (Source files modified after last build)

2. Build VitePress docs: `pnpm site:build`
   (Documentation site not built)

✅ Optional:
3. Review untracked files before next commit
   (3 files: .claude/skills/, *.md)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Status: ⚠️  Ready to develop after rebuilding components
```

Use these status indicators:

- ✅ Good / Success / Fresh
- ⚠️ Warning / Action Recommended / Stale
- ❌ Error / Critical / Missing / Failing
- 🚧 In Progress / Uncommitted
- 💡 Recommendation / Suggestion
- 📦 Package / Module
- 🔍 Analysis / Review

---

## 💰 Token Cost Justification

**Why this command is worth the token cost:**

- ✅ Combines 4+ sources of information (git, build artifacts, test coverage, file timestamps)
- ✅ Analyzes timestamp relationships to detect stale builds (tokens → components dependency)
- ✅ Parses complex JSON (coverage-summary.json)
- ✅ Generates intelligent, prioritized recommendations based on project state
- ✅ Provides context-aware guidance (understands Turborepo build order)
- ✅ Cannot be replicated with a single bash command

**Estimated tokens per use:** ~800-1200 tokens

**Value added:**

- Saves 5-10 minutes of manual checking across git, multiple dist/ folders, and coverage reports
- Prevents build errors by detecting stale dependencies
- Provides actionable next steps instead of raw data

**ROI:** Positive after 1 use (time saved > token cost)

**Use cases:**

- Daily: Check project health before starting work
- Before commits: Ensure builds are fresh and tests pass
- After pulls: Verify if rebuilds are needed
- Troubleshooting: Quick overview of what might be wrong
