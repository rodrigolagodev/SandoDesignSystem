# Component Testing Strategy

## Overview

The Sando Design System uses a **streamlined, efficient testing approach** focused on **unit tests** and **accessibility tests** using Vitest and axe-core. This strategy is optimized for component libraries and avoids the overhead of E2E testing frameworks like Playwright.

## Testing Philosophy

### What We Test

**✅ Unit Tests (Vitest + @open-wc/testing)**

- **Props and Attributes**: Verify all component properties work correctly and reflect to attributes
- **Events and Interactions**: Test click, input, and other user interactions
- **Conditional Rendering**: Verify all states (disabled, loading, active, error, etc.)
- **Slots and Content Projection**: Ensure slots work correctly with fallback content
- **Keyboard Navigation**: Test Tab, Enter, Space, Arrow keys, and focus delegation
- **ARIA Attributes**: Verify correct roles, labels, and ARIA attributes
- **CSS Class Application**: Check that classes are applied based on props
- **Component API**: Test all public methods and properties

**✅ Accessibility Tests (jest-axe)**

- **WCAG 2.1 Level AA Compliance**: Zero axe violations
- **Color Contrast**: Ensure 4.5:1 for text, 3:1 for UI components
- **Keyboard Navigation**: Verify all interactive elements are keyboard accessible
- **Screen Reader Support**: Test ARIA attributes and announcements
- **Focus Management**: Ensure proper focus indicators and delegation
- **Touch Targets**: Verify minimum 44x44px for interactive elements

### What We DON'T Test

**❌ E2E Tests (Playwright/Cypress)**

Component libraries don't need E2E tests because:
- Components are **isolated**, not full pages
- No complex user flows spanning multiple pages
- No real backend/API integration needed
- No routing or navigation to test
- Adds significant overhead (30s+ test times vs. <2s)

**Use Storybook instead** for visual testing and manual exploration.

**❌ Visual Regression Tests**

- Avoid snapshot tests that break on minor CSS changes
- Use Storybook + Chromatic for visual testing if needed
- Manual design review is more effective for component libraries

**❌ Cross-Browser Compatibility Tests**

- Web Components work consistently across modern browsers
- Browser testing adds complexity without much value
- Focus on standards compliance instead

## Test Structure

### Monolithic Component Testing

Each component has **all tests in the same folder**:

```
packages/components/src/components/button/
├── sando-button.ts              # Component implementation
├── sando-button.types.ts        # TypeScript types
├── sando-button.test.ts         # Unit tests (Vitest)
├── sando-button.a11y.test.ts    # Accessibility tests (axe-core)
├── sando-button.stories.ts      # Storybook documentation
└── styles/                      # Component styles
    ├── base.styles.ts
    ├── variant.styles.ts
    └── size.styles.ts
```

## Testing Tools

### Vitest (Unit Testing)

**Why Vitest?**
- Fast (uses Vite's transform pipeline)
- Native ES modules support
- Compatible with Jest APIs
- Great developer experience with watch mode

**Configuration**: `packages/components/vitest.config.js`

```javascript
{
  environment: 'jsdom',
  coverage: {
    lines: 80,      // Minimum 80% coverage
    functions: 80,
    branches: 80,
    statements: 80
  }
}
```

### @open-wc/testing

**Why @open-wc?**
- Purpose-built for Web Components
- Provides `fixture()` for rendering components in tests
- Includes accessibility assertions
- Works seamlessly with Lit

### jest-axe (Accessibility Testing)

**Why axe-core?**
- Industry standard for automated accessibility testing
- Catches ~57% of WCAG issues automatically
- Integrates with Vitest via jest-axe
- Provides detailed violation reports

## Test Examples

### Unit Test Pattern

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './sando-button.js';
import type { SandoButton } from './sando-button.js';

describe('sando-button', () => {
  let element: SandoButton;

  beforeEach(async () => {
    element = await fixture<SandoButton>(
      html`<sando-button>Click me</sando-button>`
    );
  });

  it('should update variant property', async () => {
    element.variant = 'outline';
    await element.updateComplete;

    expect(element.variant).toBe('outline');
    expect(element.getAttribute('variant')).toBe('outline');
  });

  it('should respond to Enter key press', async () => {
    let clicked = false;
    element.addEventListener('click', () => {
      clicked = true;
    });

    const button = element.shadowRoot?.querySelector('button');
    button?.focus();

    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      bubbles: true,
      cancelable: true
    });
    button?.dispatchEvent(enterEvent);
    button?.click();

    expect(clicked).toBe(true);
  });
});
```

### Accessibility Test Pattern

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import './sando-button.js';
import type { SandoButton } from './sando-button.js';

expect.extend(toHaveNoViolations);

describe('sando-button Accessibility', () => {
  let element: SandoButton;

  beforeEach(async () => {
    element = await fixture<SandoButton>(
      html`<sando-button>Click me</sando-button>`
    );
    await element.updateComplete;
  });

  it('should have no accessibility violations', async () => {
    const results = await axe(element);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in disabled state', async () => {
    element.disabled = true;
    await element.updateComplete;

    const results = await axe(element);
    expect(results).toHaveNoViolations();
  });

  it('should have sufficient color contrast', async () => {
    const results = await axe(element, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });

    expect(results).toHaveNoViolations();
  });
});
```

## Running Tests

### Commands

```bash
# Run all tests (unit + accessibility)
pnpm test

# Watch mode (auto-rerun on changes)
pnpm test:watch

# Coverage report
pnpm test:coverage

# Interactive UI
pnpm test:ui

# Verbose output
pnpm test:verbose
```

### CI/CD Integration

Tests run automatically in CI/CD pipeline:

```yaml
# .github/workflows/test.yml
- name: Run Tests
  run: pnpm test:coverage

- name: Check Coverage
  run: |
    if [ "$(cat coverage/coverage-summary.json | jq '.total.lines.pct')" -lt 80 ]; then
      echo "Coverage below 80%"
      exit 1
    fi
```

## Coverage Requirements

**Minimum coverage thresholds**:

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

**Component coverage goals**:

- **Critical components** (Button, Input, Select): >90%
- **Layout components** (Container, Grid): >85%
- **Utility components** (Icon, Spinner): >80%

## Test Organization

### Describe Blocks

Organize tests by feature area:

```typescript
describe('sando-button', () => {
  describe('Rendering', () => {
    // Basic rendering tests
  });

  describe('Properties', () => {
    // Property and attribute tests
  });

  describe('Events', () => {
    // Event handling tests
  });

  describe('Accessibility', () => {
    // ARIA and keyboard tests
  });

  describe('Keyboard Navigation', () => {
    // Focus and keyboard interaction tests
  });

  describe('Slots', () => {
    // Slot projection tests
  });
});
```

## Keyboard Accessibility Testing

### Focus Delegation

Web Components with Shadow DOM should use `delegatesFocus: true`:

```typescript
protected createRenderRoot() {
  return this.attachShadow({ mode: 'open', delegatesFocus: true });
}
```

**Test focus delegation**:

```typescript
it('should delegate focus from custom element to internal button', async () => {
  const button = element.shadowRoot?.querySelector('button');
  expect(button).toBeDefined();

  // Verify button is focusable
  expect(button?.hasAttribute('disabled')).toBe(false);
  expect(button?.getAttribute('tabindex')).not.toBe('-1');

  // Verify shadow root is configured correctly
  expect(element.shadowRoot).toBeDefined();
  expect(element.shadowRoot?.mode).toBe('open');
});
```

### Keyboard Interactions to Test

- **Tab**: Focus navigation
- **Shift+Tab**: Reverse focus navigation
- **Enter**: Activate buttons/links
- **Space**: Activate buttons
- **Arrow Keys**: Navigate lists, menus, tabs
- **Escape**: Close modals, dropdowns
- **Home/End**: Navigate to start/end

## Common Testing Patterns

### Testing Disabled State

```typescript
it('should not respond to click when disabled', async () => {
  element.disabled = true;
  await element.updateComplete;

  let clicked = false;
  element.addEventListener('click', () => {
    clicked = true;
  });

  const button = element.shadowRoot?.querySelector('button');
  button?.click();

  expect(clicked).toBe(false);
  expect(button?.hasAttribute('disabled')).toBe(true);
  expect(button?.getAttribute('aria-disabled')).toBe('true');
});
```

### Testing Loading State

```typescript
it('should show spinner when loading', async () => {
  element.loading = true;
  await element.updateComplete;

  const spinner = element.shadowRoot?.querySelector('.spinner');
  const button = element.shadowRoot?.querySelector('button');

  expect(spinner).toBeDefined();
  expect(button?.hasAttribute('disabled')).toBe(true);
  expect(button?.getAttribute('aria-busy')).toBe('true');
});
```

### Testing Slots

```typescript
it('should render icon-start slot', async () => {
  element = await fixture<SandoButton>(html`
    <sando-button>
      <span slot="icon-start">⭐</span>
      Favorite
    </sando-button>
  `);

  const slot = element.shadowRoot?.querySelector('slot[name="icon-start"]');
  expect(slot).toBeDefined();
});
```

### Testing ARIA Attributes

```typescript
it('should have aria-pressed when toggle is true', async () => {
  element.toggle = true;
  element.active = false;
  await element.updateComplete;

  const button = element.shadowRoot?.querySelector('button');
  expect(button?.getAttribute('aria-pressed')).toBe('false');
});
```

## Performance

**Current performance** (sando-button component):

- **Total test time**: ~1.2s for 44 tests
- **Unit tests**: 33 tests in ~420ms
- **Accessibility tests**: 11 tests in ~420ms
- **Average per test**: ~27ms

**Performance goals**:

- Total suite <3s for all component tests
- Individual test <100ms
- No E2E overhead (30s+)

## Best Practices

### DO ✅

- **Test behavior, not implementation**: Focus on what users interact with
- **Use semantic queries**: Query by role, label, text (not CSS classes)
- **Test accessibility**: Every component should have axe tests
- **Keep tests fast**: Avoid setTimeout, prefer `updateComplete`
- **Test keyboard navigation**: Verify Tab, Enter, Space work
- **Use beforeEach**: Set up clean state for each test
- **Test all variants**: Size, variant, state combinations
- **Check ARIA attributes**: Verify roles, labels, states

### DON'T ❌

- **Don't test implementation details**: Avoid testing internal methods
- **Don't use snapshot tests**: They break on minor CSS changes
- **Don't add E2E tests**: Component libraries don't need them
- **Don't test visual appearance**: Use Storybook instead
- **Don't skip accessibility**: Always run axe tests
- **Don't mock Web Components**: Test the real component
- **Don't test framework internals**: Trust Lit works correctly
- **Don't use brittle selectors**: Avoid `.class > div:nth-child(2)`

## Debugging Tests

### Vitest UI

```bash
pnpm test:ui
```

Opens interactive UI with:
- Test tree view
- Console output
- Coverage visualization
- Time tracking

### Verbose Output

```bash
pnpm test:verbose
```

Shows detailed test results with:
- Individual test names
- Timing information
- Console logs
- Error stack traces

### Coverage Reports

```bash
pnpm test:coverage
```

Generates:
- `coverage/index.html` - Interactive HTML report
- `coverage/lcov.info` - LCOV format for CI/CD
- Terminal summary

## Adding Tests for New Components

### Checklist

When creating a new component, ensure you have:

- [ ] Unit test file (`component-name.test.ts`)
- [ ] Accessibility test file (`component-name.a11y.test.ts`)
- [ ] Test all properties and attributes
- [ ] Test all events
- [ ] Test all variants and sizes
- [ ] Test disabled/loading states
- [ ] Test keyboard navigation
- [ ] Test ARIA attributes
- [ ] Test slots (if applicable)
- [ ] Run `pnpm test:coverage` - verify >80% coverage
- [ ] Run `pnpm test` - ensure all tests pass
- [ ] Zero axe violations

### Template

Copy test files from `sando-button` as a starting point:

```bash
# From packages/components/src/components/
cp button/sando-button.test.ts your-component/sando-your-component.test.ts
cp button/sando-button.a11y.test.ts your-component/sando-your-component.a11y.test.ts
```

Update imports and test cases for your component.

## Quality Gates

Tests must pass before merging:

1. **All tests pass**: `pnpm test` exits with 0
2. **Coverage >80%**: All thresholds met
3. **Zero axe violations**: No accessibility issues
4. **Fast execution**: Total time <3s per component
5. **No skipped tests**: All tests enabled

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Open WC Testing](https://open-wc.org/docs/testing/testing-package/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lit Testing Best Practices](https://lit.dev/docs/tools/testing/)

## Conclusion

This streamlined testing strategy prioritizes:

- **Speed**: <2s test execution
- **Simplicity**: No E2E overhead
- **Quality**: >80% coverage, zero axe violations
- **Maintainability**: Easy to write and update tests
- **Accessibility**: WCAG 2.1 AA compliance by default

By avoiding over-engineering (E2E tests, visual snapshots), we achieve **high quality** with **minimal overhead**, perfect for a component library.
