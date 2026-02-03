/**
 * Vitest Test Setup
 * Configures global test utilities and custom matchers
 */

/// <reference types="../vite-env.d.ts" />

import { toHaveNoViolations as jestAxeToHaveNoViolations } from 'jest-axe';

// Wrap jest-axe matcher to fix the return type issue with Vitest
// jest-axe's message() returns undefined for passing tests, but Vitest expects string
const toHaveNoViolations = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toHaveNoViolations(results: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = this as any;
    const jestResult = jestAxeToHaveNoViolations.toHaveNoViolations.call(ctx, results);

    return {
      pass: jestResult.pass,
      actual: jestResult.actual,
      // Vitest requires message() to return string, not string | undefined
      message: () => jestResult.message() ?? ''
    };
  }
};

// Extend expect with the fixed matcher (expect is global due to globals: true in vitest.config.js)
expect.extend(toHaveNoViolations);
