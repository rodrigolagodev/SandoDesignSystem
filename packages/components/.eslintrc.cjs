module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:wc/recommended',
    'plugin:lit/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint', 'wc', 'lit'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // Web Components best practices
    'wc/guard-super-call': 'off', // Disabled - not needed with Lit (LitElement always has lifecycle methods)
    'wc/no-closed-shadow-root': 'error',
    'wc/no-constructor-attributes': 'error',
    'wc/no-invalid-element-name': 'error',
    'wc/no-self-class': 'error',

    // Lit specific rules
    'lit/no-invalid-html': 'error',
    'lit/no-useless-template-literals': 'warn',
    'lit/no-value-attribute': 'error',
    'lit/no-legacy-template-syntax': 'error',
    'lit/attribute-value-entities': 'off', // Disabled - causes false positives with arrow functions in event handlers

    // General code quality
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error'
  },
  overrides: [
    {
      // Relax rules for test files
      files: ['**/*.test.ts', '**/*.spec.ts', '**/*.a11y.test.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ],
  ignorePatterns: ['dist', 'coverage', 'node_modules', '*.config.js', '*.config.ts', '**/scripts/**']
};
