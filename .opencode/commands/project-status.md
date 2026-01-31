# Project Status Command

Comprehensive project health check for Sando Design System.

## Usage

```
/project-status [--full]
```

## What This Does

Gathers and reports on:

1. **Git Status** - Branch, uncommitted changes, ahead/behind
2. **Build Status** - Last build result, errors if any
3. **Test Results** - Pass/fail counts, coverage percentage
4. **Lint Status** - Any lint warnings or errors
5. **Package Health** - Outdated dependencies, security issues

## Options

- `--full`: Include detailed breakdowns (slower, more comprehensive)

## Example Output

```
=== Sando Design System Status ===

Git:     master (clean, 2 ahead)
Build:   OK (cached)
Tests:   124 passed, 0 failed (87% coverage)
Lint:    0 errors, 3 warnings
Deps:    2 outdated, 0 vulnerabilities
```

---

Run the following commands and summarize results:

1. `git status --short && git log --oneline -1`
2. `pnpm build --dry-run 2>&1 | tail -5`
3. `pnpm test --run 2>&1 | tail -10`
4. `pnpm lint 2>&1 | tail -10`

Format the output as a clean status report.
