/// <reference types="vite/client" />

// CSS files imported with ?inline query parameter
declare module '*.css?inline' {
  const content: string;
  export default content;
}

// Extend Vitest's expect with jest-axe matchers
declare module 'vitest' {
  interface Assertion<T> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
