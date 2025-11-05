# Testing Strategy

**Category**: 03-development
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: QA Expert

---

## Purpose

Establish testing approach for Sando Design System ensuring quality, accessibility, and maintainability through automated testing at unit, accessibility, and integration levels.

---

## Core Rules

### Rule 1: Test Pyramid Structure (Non-Negotiable)

All components follow the test pyramid: 80% unit coverage, 100% accessibility for public components, E2E for critical flows only.

**Pattern**:

```typescript
// ✅ Complete coverage
// sando-button.test.ts (unit)
// sando-button.a11y.test.ts (accessibility)
// sando-button.spec.ts (E2E - critical only)
```

**Anti-pattern**:

```typescript
// ❌ Only E2E tests (slow, brittle, expensive)
// ❌ No accessibility tests (WCAG violations)
```

**Why**: Fast feedback, maintainability, cost-effective CI/CD.

**Reference**: [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

---

### Rule 2: Vitest for Unit Testing (Non-Negotiable)

Use Vitest with @open-wc/testing for all component unit tests.

**Required patterns**:

- Fixture pattern for rendering
- `updateComplete` for reactivity
- Shadow DOM queries
- Property/attribute reflection
- Event dispatching

**Reference**: `packages/components/src/components/button/sando-button.test.ts`

**Config**: `packages/components/vitest.config.js`

**Why**: Fast, Web Components-aware, great DX.

---

### Rule 3: Accessibility Testing (Non-Negotiable)

100% accessibility coverage for all public components using jest-axe.

**Pattern**:

```typescript
import { fixture } from "@open-wc/testing";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

test("meets accessibility standards", async () => {
  const el = await fixture(html`<sando-button>Text</sando-button>`);
  const results = await axe(el);
  expect(results).toHaveNoViolations();
});
```

**File**: `{component}.a11y.test.ts` (separate from unit tests)

**Reference**: `packages/components/src/components/button/sando-button.a11y.test.ts`

**Why**: WCAG 2.1 AA compliance, early violation detection.

---

### Rule 4: Token Testing (Non-Negotiable)

Validate token structure, references, contrast ratios, and build output.

**Test categories**:

- Structure: Schema validation, layer integrity
- References: No broken token references
- Accessibility: WCAG contrast ratios
- Build: Valid CSS/TypeScript output

**Reference**: `packages/tokens/tests/` directory

**Why**: Ensures theming system integrity and accessibility.

---

### Rule 5: Test File Organization (Non-Negotiable)

Monolithic structure with all test files colocated with component.

**Structure**:

```
button/
├── sando-button.ts              # Implementation
├── sando-button.test.ts         # Unit tests
├── sando-button.a11y.test.ts    # Accessibility tests
├── sando-button.spec.ts         # E2E tests (critical only)
└── index.ts                     # Exports
```

**Why**: Easy discovery, clear ownership, portable.

**Reference**: [COMPONENT_ARCHITECTURE.md](../02-architecture/COMPONENT_ARCHITECTURE.md)

---

## Test Pyramid

| Layer | Coverage | Tools             | Files            | Purpose                           | When to Write         |
| ----- | -------- | ----------------- | ---------------- | --------------------------------- | --------------------- |
| Unit  | 80%      | Vitest + @open-wc | `*.test.ts`      | Component behavior, props, events | Always                |
| A11y  | 100%     | jest-axe          | `*.a11y.test.ts` | WCAG compliance                   | All public components |
| E2E   | Critical | Playwright        | `*.spec.ts`      | User flows, integration           | Multi-component flows |
| Token | 100%     | Vitest            | `tokens/tests/`  | Build output, integrity           | On token changes      |

**Pyramid ratio**: 70% unit : 20% a11y : 10% E2E

**Anti-pattern**: Heavy E2E testing (slow CI, flaky tests, high maintenance)

---

## Unit Testing

### Configuration

**Location**: `packages/components/vitest.config.js`

**Key settings**:

- Environment: `jsdom` (Web Components support)
- Coverage: 80% threshold (lines, functions, branches, statements)
- Globals: `true` (describe, it, expect)
- setupFiles: `vitest.setup.js` (jest-axe matchers)

### Test Patterns

**Reference implementation**: `packages/components/src/components/button/sando-button.test.ts`

**Required patterns**:

| Pattern             | Purpose                      | Example                                  |
| ------------------- | ---------------------------- | ---------------------------------------- |
| Fixture             | Render component             | `await fixture<T>(html\`...\`)`          |
| updateComplete      | Wait for reactivity          | `await element.updateComplete`           |
| Shadow DOM          | Query internal elements      | `element.shadowRoot?.querySelector()`    |
| Property reflection | Test property/attribute sync | `element.disabled = true`                |
| Event testing       | Verify event dispatch        | `element.addEventListener('click', ...)` |
| Slot testing        | Verify slot content          | `element.querySelector('[slot="icon"]')` |

### Test Organization

Use `describe` blocks for logical grouping:

```typescript
describe("sando-button", () => {
  describe("rendering", () => {
    /* ... */
  });
  describe("properties", () => {
    /* ... */
  });
  describe("events", () => {
    /* ... */
  });
  describe("accessibility", () => {
    /* ... */
  });
});
```

### Running Tests

```bash
# All unit tests
pnpm --filter @sando/components test

# Watch mode
pnpm --filter @sando/components test:watch

# Coverage report
pnpm --filter @sando/components test:coverage

# UI mode
pnpm --filter @sando/components test:ui
```

---

## Accessibility Testing

### Requirements

- **Coverage**: 100% for all public components
- **Tool**: jest-axe (automated WCAG validation)
- **Standard**: WCAG 2.1 AA compliance minimum
- **File naming**: `{component}.a11y.test.ts`

### Test Structure

**Reference**: `packages/components/src/components/button/sando-button.a11y.test.ts`

**Required test cases**:

| Test Case          | Purpose                 |
| ------------------ | ----------------------- |
| Default state      | Baseline accessibility  |
| All variants       | Variant-specific rules  |
| Disabled state     | Disabled semantics      |
| Interactive states | Focus, hover, active    |
| With icons         | Icon accessibility      |
| Custom content     | Slot content validation |

### Common Violations

| Violation        | Fix                            |
| ---------------- | ------------------------------ |
| Missing label    | Add aria-label or text content |
| Low contrast     | Adjust token values            |
| Missing role     | Add ARIA role                  |
| Keyboard trap    | Fix focus management           |
| Missing alt text | Add alt to images              |

**Reference**: [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Token Testing

### Test Suites

**Location**: `packages/tokens/tests/`

| Suite         | File                      | Purpose             | Validation                          |
| ------------- | ------------------------- | ------------------- | ----------------------------------- |
| Structure     | `structure/*.test.ts`     | Schema validation   | Token format, required fields       |
| References    | `tokens/*.test.ts`        | Reference integrity | No broken references, correct layer |
| Accessibility | `accessibility/*.test.ts` | WCAG contrast       | 4.5:1 AA, 7:1 AAA, 3:1 UI           |
| Build         | `build/*.test.ts`         | Output validation   | Valid CSS/TS, correct transforms    |

### Contrast Requirements

| Use Case           | Ratio | Standard | Test           |
| ------------------ | ----- | -------- | -------------- |
| Body text          | 4.5:1 | WCAG AA  | Normal text    |
| Large text (18pt+) | 3:1   | WCAG AA  | Headings       |
| UI components      | 3:1   | WCAG AA  | Borders, icons |
| Enhanced           | 7:1   | WCAG AAA | High contrast  |

**Formula**: `(L1 + 0.05) / (L2 + 0.05)` where L1 is lighter color

### Running Token Tests

```bash
# All token tests
pnpm --filter @sando/tokens test

# Specific suites
pnpm --filter @sando/tokens test:structure
pnpm --filter @sando/tokens test:accessibility
pnpm --filter @sando/tokens test:build

# Coverage
pnpm --filter @sando/tokens test:coverage
```

---

## E2E Testing

### When to Write E2E Tests

**Write E2E tests for**:

- Multi-component interactions
- Critical user flows
- Form submissions
- Navigation flows
- State persistence

**Don't write E2E tests for**:

- Component variants (use unit tests)
- Property changes (use unit tests)
- Styling (use visual regression)
- Isolated components (use unit tests)

### Tool

**Playwright** (`packages/components/playwright.config.js`)

### Running E2E Tests

```bash
# Headless
pnpm --filter @sando/components test:e2e

# UI mode
pnpm --filter @sando/components test:e2e:ui
```

**Reference**: `packages/components/src/components/button/sando-button.spec.ts`

---

## Coverage Requirements

### Thresholds

From `packages/components/vitest.config.js`:

| Metric     | Threshold | Applies To             |
| ---------- | --------- | ---------------------- |
| Lines      | 80%       | All component code     |
| Functions  | 80%       | All exported functions |
| Branches   | 80%       | All code paths         |
| Statements | 80%       | All statements         |
| A11y       | 100%      | Public components only |

### Exclusions

Files excluded from coverage:

- `*.stories.ts` (Storybook documentation)
- `*.types.ts` (TypeScript types)
- `index.ts` (Barrel exports)
- `*.spec.ts` (E2E tests)

### Viewing Coverage

```bash
# Generate coverage report
pnpm --filter @sando/components test:coverage

# View HTML report
open packages/components/coverage/index.html
```

---

## Test Commands Reference

### Global (from root)

```bash
pnpm test                    # All tests (tokens + components)
pnpm test:watch              # Watch mode
pnpm test:coverage           # Coverage report
```

### Components

```bash
pnpm --filter @sando/components test              # Unit + A11y
pnpm --filter @sando/components test:watch        # Watch mode
pnpm --filter @sando/components test:ui           # Vitest UI
pnpm --filter @sando/components test:coverage     # Coverage
pnpm --filter @sando/components test:e2e          # Playwright E2E
pnpm --filter @sando/components test:e2e:ui       # Playwright UI
```

### Tokens

```bash
pnpm --filter @sando/tokens test                  # All token tests
pnpm --filter @sando/tokens test:structure        # Structure validation
pnpm --filter @sando/tokens test:accessibility    # Contrast tests
pnpm --filter @sando/tokens test:build            # Build output tests
pnpm --filter @sando/tokens test:coverage         # Coverage
```

---

## Validation Checklist

### Before Creating Component

- [ ] Test files planned in monolithic structure
- [ ] Unit test coverage strategy defined
- [ ] Accessibility test cases identified
- [ ] E2E tests evaluated (needed?)

### Before Committing

- [ ] All tests pass locally
- [ ] 80%+ unit test coverage
- [ ] 100% accessibility coverage (public components)
- [ ] No accessibility violations
- [ ] Token contrast ratios valid
- [ ] Test files follow naming conventions

### Before PR

- [ ] CI tests pass
- [ ] Coverage thresholds met
- [ ] New tests documented in PR description
- [ ] Manual testing completed

### Before Release

- [ ] Full test suite passes
- [ ] E2E tests pass on all browsers
- [ ] Visual regression tests reviewed
- [ ] Performance tests baseline established

---

## Related Guidelines

- [CODE_STYLE.md](./CODE_STYLE.md) - Code standards
- [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md) - File naming
- [COMPONENT_ARCHITECTURE.md](../02-architecture/COMPONENT_ARCHITECTURE.md) - Component structure
- [TOKEN_ARCHITECTURE.md](../02-architecture/TOKEN_ARCHITECTURE.md) - Token system

---

## External References

### Tools

- [Vitest](https://vitest.dev/) - Unit test framework
- [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/) - Web Components testing utilities
- [jest-axe](https://github.com/nickcolley/jest-axe) - Accessibility testing
- [Playwright](https://playwright.dev/) - E2E testing

### Standards

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility guidelines
- [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) - Testing strategy

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial guideline creation
- Test pyramid structure (80% unit, 100% a11y, critical E2E)
- Vitest + @open-wc/testing patterns
- jest-axe accessibility testing
- Token testing strategy
- Coverage requirements (80% threshold)
- Validation checklists
- Agent-optimized format (under 500 lines)

---

**Testing ensures quality and accessibility across the design system. Start with the basics, season with meaning, and serve with style.**
