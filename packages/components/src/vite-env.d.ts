/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

// CSS files imported with ?inline query parameter
declare module '*.css?inline' {
  const content: string;
  export default content;
}

// Type declarations for jest-axe (no @types available)
declare module 'jest-axe' {
  import type { AxeResults, RunOptions, Spec } from 'axe-core';

  export interface JestAxeConfigureOptions extends RunOptions {
    globalOptions?: Spec;
  }

  export type AxeFn = (
    html: Element | string,
    additionalOptions?: RunOptions
  ) => Promise<AxeResults>;

  export function configureAxe(options?: JestAxeConfigureOptions): AxeFn;
  export const axe: AxeFn;

  export interface ToHaveNoViolationsMatchers {
    toHaveNoViolations(results: AxeResults): {
      actual: AxeResults['violations'];
      message: () => string;
      pass: boolean;
    };
  }

  export const toHaveNoViolations: ToHaveNoViolationsMatchers;
}

// Extend Vitest's expect with jest-axe matchers
declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<T> {
    toHaveNoViolations(): this;
  }

  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
