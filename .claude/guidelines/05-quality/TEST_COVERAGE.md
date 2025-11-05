# Test Coverage

**Category**: 05-quality
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: QA Expert

---

## Purpose

Ensure comprehensive test coverage across the Sando Design System through automated thresholds, coverage gates in CI, and continuous monitoring. This guideline defines coverage requirements, exclusion patterns, reporting strategies, and quality enforcement for unit tests, accessibility tests, and integration tests.

**Target**: 80% coverage minimum (unit), 100% coverage (accessibility for public components)
**Scope**: Components, tokens, utilities, build scripts
**Enforcement**: CI blocks PRs below thresholds

---

## Core Rules

### Rule 1: 80% Coverage Minimum (Non-Negotiable)

All production code MUST meet 80% coverage across lines, functions, branches, and statements.

**Pattern**:

```javascript
// From packages/components/vitest.config.js
coverage: {
  lines: 80,
  functions: 80,
  branches: 80,
  statements: 80
}
```

**Metrics defined**:

- **Lines**: % of executable lines covered by tests
- **Functions**: % of functions/methods called during tests
- **Branches**: % of conditional paths (if/else, switch, ternary) tested
- **Statements**: % of statements executed (similar to lines)

**Why**: 80% is industry standard balancing thoroughness with diminishing returns. Higher thresholds require exponentially more effort for marginal gains.

**Reference**: `packages/components/vitest.config.js` (lines 40-43)

---

### Rule 2: 100% Accessibility Coverage (Non-Negotiable)

All public components MUST have dedicated `.a11y.test.ts` files with jest-axe validation for ALL states, variants, and flavors.

**Pattern**:

```typescript
// sando-button.a11y.test.ts
describe.each(["original", "strawberry", "ocean"])("flavor: %s", (flavor) => {
  it("meets WCAG 2.1 AA", async () => {
    const el = await fixture(
      `<div flavor="${flavor}"><sando-button>Test</sando-button></div>`,
    );
    expect(await axe(el)).toHaveNoViolations();
  });
});
```

**Coverage includes**:

- Default state
- All variants (solid, outline, ghost, etc.)
- All sizes (small, medium, large)
- Disabled, loading, error states
- All 5 flavors (original, strawberry, ocean, forest, sunset)
- Dark mode (if mode-specific behavior exists)

**Why**: WCAG compliance is non-negotiable. Accessibility regressions can exclude users and create legal liability.

**Reference**: [WCAG_COMPLIANCE.md](../04-accessibility/WCAG_COMPLIANCE.md)

---

### Rule 3: Coverage Gates in CI (Non-Negotiable)

CI MUST fail if coverage drops below 80% threshold or if accessibility tests fail.

**Pattern** (GitHub Actions):

```yaml
- name: Run tests with coverage
  run: pnpm test:coverage

- name: Check coverage thresholds
  run: |
    # Vitest automatically fails if below thresholds
    # No additional check needed
```

**Enforcement**:

- Vitest exits with code 1 if below 80%
- PR merge blocked automatically
- Coverage report uploaded to PR comments

**Why**: Prevents coverage regression. Thresholds are meaningless without enforcement.

**Reference**: `.github/workflows/test.yml` (CI configuration)

---

### Rule 4: Exclude Non-Production Code (Required)

Test files, stories, type definitions, and barrel exports MUST be excluded from coverage calculation.

**Pattern**:

```javascript
// From vitest.config.js
coverage: {
  exclude: [
    "**/*.test.ts", // Unit tests
    "**/*.spec.ts", // E2E tests
    "**/*.a11y.test.ts", // Accessibility tests
    "**/*.stories.ts", // Storybook documentation
    "**/*.types.ts", // TypeScript type definitions
    "index.ts", // Barrel exports
  ];
}
```

**Why**: Including test files inflates coverage artificially. Barrel exports are trivial re-exports with no logic to test.

**Reference**: `packages/components/vitest.config.js` (lines 29-36)

---

### Rule 5: Monitor Coverage Trends (Required)

Track coverage over time to detect regressions and identify low-coverage areas.

**Pattern**:

```bash
# Generate coverage report
pnpm test:coverage

# View HTML report
open packages/components/coverage/index.html

# CI uploads to Codecov/Coveralls (future)
```

**Metrics to track**:

- Overall coverage % (target: 80%+)
- Per-file coverage (identify gaps)
- Trend over time (detect regressions)
- Uncovered lines/branches (prioritize testing)

**Why**: 80% is minimum, not target. Monitoring identifies opportunities for improvement and prevents gradual erosion.

**Reference**: `packages/components/coverage/` directory

---

## Coverage Thresholds

### Component Coverage (Vitest)

From `packages/components/vitest.config.js`:

| Metric     | Threshold | Applies To                | Enforcement             |
| ---------- | --------- | ------------------------- | ----------------------- |
| Lines      | 80%       | All `.ts` files in `src/` | Vitest exits 1 if below |
| Functions  | 80%       | All exported functions    | Vitest exits 1 if below |
| Branches   | 80%       | All conditional paths     | Vitest exits 1 if below |
| Statements | 80%       | All statements            | Vitest exits 1 if below |

**Exclusions**: `*.test.ts`, `*.spec.ts`, `*.a11y.test.ts`, `*.stories.ts`, `*.types.ts`, `index.ts`

### Token Coverage (Vitest)

From `packages/tokens/vitest.config.js`:

| Metric     | Threshold | Applies To                     | Enforcement             |
| ---------- | --------- | ------------------------------ | ----------------------- |
| Lines      | 80%       | Build scripts in `build/`      | Vitest exits 1 if below |
| Functions  | 80%       | Build orchestrator, transforms | Vitest exits 1 if below |
| Branches   | 80%       | Conditional logic in builds    | Vitest exits 1 if below |
| Statements | 80%       | All statements                 | Vitest exits 1 if below |

**Exclusions**: `tests/`, `*.test.js`, `*.spec.js`, `vitest.config.js`

**Note**: Token JSON files are validated via structure/reference tests, not coverage metrics.

### Accessibility Coverage (Manual)

| Requirement       | Threshold | Enforcement                   |
| ----------------- | --------- | ----------------------------- |
| Public components | 100%      | Manual checklist verification |
| Component states  | 100%      | All states/variants tested    |
| Flavors           | 100%      | All 5 flavors validated       |
| WCAG violations   | 0         | jest-axe toHaveNoViolations   |

**Reference**: [WCAG_COMPLIANCE.md](../04-accessibility/WCAG_COMPLIANCE.md)

---

## Coverage Reports

### Vitest Coverage Providers

**v8 (default)**: Fast, accurate, built into Node.js

```javascript
coverage: {
  provider: 'v8',
  reporter: ['text', 'html', 'lcov'],
  reportsDirectory: './coverage'
}
```

**istanbul (alternative)**: More mature, slower, better IDE integration

```javascript
coverage: {
  provider: 'istanbul',
  reporter: ['text', 'html', 'json-summary']
}
```

**Sando uses**: v8 provider (default)

### Report Formats

| Format | Purpose                  | Generated File                 | View Command                |
| ------ | ------------------------ | ------------------------------ | --------------------------- |
| `text` | Terminal output          | stdout                         | Automatic in CI             |
| `html` | Interactive browser UI   | `coverage/index.html`          | `open coverage/index.html`  |
| `lcov` | CI integration (Codecov) | `coverage/lcov.info`           | Upload to Codecov/Coveralls |
| `json` | Programmatic parsing     | `coverage/coverage-final.json` | Parse with scripts          |

**Example text output**:

```
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |   85.23 |    82.45 |   88.12 |   85.67 |
 sando-button.ts       |   92.45 |    89.23 |   95.12 |   93.23 | 127-130, 245
 sando-input.ts        |   78.34 |    75.67 |   81.23 |   79.12 | 45-52, 89-95
```

### Viewing Coverage Reports

```bash
# Generate coverage (components)
cd packages/components
pnpm test:coverage

# View HTML report (interactive)
open coverage/index.html

# Generate coverage (tokens)
cd packages/tokens
pnpm test:coverage
open coverage/index.html
```

**HTML report features**:

- File-by-file breakdown
- Line-by-line highlighting (green=covered, red=uncovered, yellow=partial branch)
- Sortable by coverage %
- Drill-down to specific uncovered lines

---

## CI Integration

### GitHub Actions Workflow

```yaml
name: Test Coverage
on: [push, pull_request]

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build tokens (required before components)
        run: pnpm --filter @sando/tokens build

      - name: Run component tests with coverage
        run: pnpm --filter @sando/components test:coverage

      - name: Run token tests with coverage
        run: pnpm --filter @sando/tokens test:coverage

      # Vitest automatically fails if below 80% threshold
      # No additional checks needed

      - name: Upload coverage to Codecov (future)
        uses: codecov/codecov-action@v3
        with:
          files: ./packages/components/coverage/lcov.info
```

**Coverage enforcement**:

- Vitest exits with code 1 if below thresholds
- GitHub Actions marks job as failed
- PR merge blocked by branch protection rules

**Future enhancements**:

- Upload to Codecov/Coveralls for PR comments
- Generate coverage badges
- Trend tracking over time

---

## Improving Low Coverage

### Identifying Gaps

**1. View HTML report**:

```bash
pnpm test:coverage
open coverage/index.html
```

**2. Sort by coverage %**: Click "% Stmts" column header

**3. Focus on red files**: <80% coverage

**4. Drill down**: Click filename to see uncovered lines

### Common Low-Coverage Patterns

| Pattern              | Coverage | Why                 | Solution                              |
| -------------------- | -------- | ------------------- | ------------------------------------- |
| Error handlers       | 40-60%   | Hard to trigger     | Mock errors, test edge cases          |
| Private methods      | 0%       | Not called directly | Test via public API                   |
| Legacy code          | 20-40%   | Pre-testing era     | Incremental refactoring + tests       |
| Complex conditionals | 50-70%   | Many branches       | Parametrized tests (`describe.each`)  |
| Async code           | 60-75%   | Race conditions     | Use `await` properly, test all states |

### Strategies for Improvement

**Parametrized tests** (cover many cases with one test):

```typescript
describe.each([
  ["small", "32px"],
  ["medium", "40px"],
  ["large", "48px"],
])("size: %s", (size, expectedHeight) => {
  it(`renders ${size} with ${expectedHeight} height`, async () => {
    const el = await fixture(
      `<sando-button size="${size}">Test</sando-button>`,
    );
    expect(el.clientHeight).toBe(parseInt(expectedHeight));
  });
});
```

**Test edge cases**:

```typescript
it("handles empty string gracefully", () => {
  element.label = "";
  expect(element.hasAttribute("aria-label")).toBe(false);
});

it("handles very long text", () => {
  element.label = "A".repeat(1000);
  expect(element.shadowRoot.textContent.length).toBeLessThanOrEqual(1000);
});
```

**Mock external dependencies**:

```typescript
import { vi } from "vitest";

it("handles fetch errors", async () => {
  vi.spyOn(window, "fetch").mockRejectedValue(new Error("Network error"));
  await expect(fetchData()).rejects.toThrow("Network error");
});
```

---

## Coverage Anti-Patterns

### Anti-Pattern 1: Testing Implementation Details

**❌ WRONG**:

```typescript
it("calls _handleClick private method", () => {
  const spy = vi.spyOn(element, "_handleClick");
  element.click();
  expect(spy).toHaveBeenCalled();
});
```

**✅ CORRECT**:

```typescript
it("dispatches click event when clicked", () => {
  const handler = vi.fn();
  element.addEventListener("click", handler);
  element.click();
  expect(handler).toHaveBeenCalled();
});
```

**Why**: Private methods are implementation details. Test behavior, not implementation.

### Anti-Pattern 2: Coverage for Coverage's Sake

**❌ WRONG**:

```typescript
it("covers line 127", () => {
  element._internalFlag = true; // Just to hit the line
  expect(element._internalFlag).toBe(true);
});
```

**✅ CORRECT**:

```typescript
it("disables button when loading", () => {
  element.loading = true;
  expect(element.disabled).toBe(true);
});
```

**Why**: Tests should validate behavior meaningful to users, not arbitrary code execution.

### Anti-Pattern 3: Ignoring Branch Coverage

**❌ WRONG** (only tests happy path):

```typescript
it("validates email", () => {
  expect(validateEmail("test@example.com")).toBe(true);
});
```

**✅ CORRECT** (tests both branches):

```typescript
describe("email validation", () => {
  it("accepts valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(validateEmail("invalid")).toBe(false);
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("test@")).toBe(false);
  });
});
```

**Why**: Branch coverage ensures all conditional paths are tested.

---

## Validation Checklist

### Component Creation

- [ ] Unit tests exist (`sando-component.test.ts`)
- [ ] Accessibility tests exist (`sando-component.a11y.test.ts`)
- [ ] Coverage meets 80% threshold (all metrics)
- [ ] All public methods tested
- [ ] All component states tested (default, disabled, loading, error)
- [ ] All variants tested (solid, outline, ghost, etc.)
- [ ] All sizes tested (small, medium, large)
- [ ] Edge cases covered (empty, null, very long input)

### Accessibility Testing

- [ ] Default state tested with jest-axe
- [ ] All variants tested (100% coverage)
- [ ] All flavors tested (original, strawberry, ocean, forest, sunset)
- [ ] Dark mode tested (if mode-specific behavior)
- [ ] No axe violations (toHaveNoViolations passes)
- [ ] Keyboard navigation tested
- [ ] Screen reader announcements verified

### CI/CD Integration

- [ ] Coverage tests run on every PR
- [ ] CI fails if coverage <80%
- [ ] Coverage report available in PR
- [ ] No hardcoded test skips (`it.skip`, `describe.skip`)
- [ ] Tests pass locally before pushing

### Coverage Monitoring

- [ ] HTML report generated (`pnpm test:coverage`)
- [ ] Coverage % reviewed for new code
- [ ] Uncovered lines identified and justified
- [ ] Coverage trend tracked over time
- [ ] Low-coverage files flagged for improvement

---

## Related Guidelines

- [TESTING_STRATEGY.md](../03-development/TESTING_STRATEGY.md) - Overall testing approach (pyramid, tools, file structure)
- [WCAG_COMPLIANCE.md](../04-accessibility/WCAG_COMPLIANCE.md) - Accessibility testing requirements
- [CODE_STYLE.md](../03-development/CODE_STYLE.md) - Code organization for testability

---

## External References

**Coverage Tools**:

- [Vitest Coverage](https://vitest.dev/guide/coverage.html) - Official Vitest coverage documentation
- [v8 Coverage](https://v8.dev/blog/javascript-code-coverage) - V8 native coverage
- [Istanbul](https://istanbul.js.org/) - Alternative coverage tool

**Best Practices**:

- [Martin Fowler - Test Coverage](https://martinfowler.com/bliki/TestCoverage.html) - Coverage philosophy
- [Google Testing Blog](https://testing.googleblog.com/) - Industry best practices

**CI Integration**:

- [Codecov](https://codecov.io/) - Coverage tracking service
- [Coveralls](https://coveralls.io/) - Coverage badges and trends

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial guideline creation
- 80% coverage threshold across lines, functions, branches, statements
- 100% accessibility coverage requirement for public components
- CI enforcement with Vitest automatic failure
- Coverage exclusion patterns (test files, stories, types, index files)
- Report formats (text, html, lcov, json)
- HTML report viewing instructions
- GitHub Actions CI integration pattern
- Strategies for improving low coverage (parametrized tests, edge cases, mocks)
- Coverage anti-patterns (implementation details, coverage for sake, ignoring branches)
- Validation checklist (creation, accessibility, CI/CD, monitoring)
- References to vitest.config.js (components lines 40-43, tokens lines 29-33)
- Agent-optimized format (498 lines)

---

**Coverage is a means to an end: high-quality, well-tested code. Focus on meaningful tests, not arbitrary metrics.**
