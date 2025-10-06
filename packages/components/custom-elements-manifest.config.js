/**
 * Custom Elements Manifest Configuration
 * Generates custom-elements.json for documentation and IDE support
 * @see https://custom-elements-manifest.open-wc.org/
 */
export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.stories.ts'],
  outdir: '.',
  litelement: true,
  dev: false,
  plugins: []
};
