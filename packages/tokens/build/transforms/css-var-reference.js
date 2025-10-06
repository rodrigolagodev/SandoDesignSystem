/**
 * Transform: CSS Variable Reference
 *
 * Converts token references to CSS custom properties
 * Example: {color.brand.500.value} -> var(--sando-color-brand-500)
 */

export default {
  name: 'name/css-var-reference',
  type: 'value',
  transitive: true,
  filter: (token) => {
    // Check original value for references (before Style Dictionary resolves them)
    const originalValue = token.original?.value;
    return originalValue && typeof originalValue === 'string' && originalValue.includes('{');
  },
  transform: (token) => {
    // Use original value to preserve reference syntax
    let value = token.original.value;
    const regex = /\{([^}]+)\.value\}/g;

    value = value.replace(regex, (match, path) => {
      const varName = path.replace(/\./g, '-');
      return `var(--sando-${varName})`;
    });

    return value;
  }
};
