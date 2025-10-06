/**
 * Transform: Name CSS Sando
 *
 * Adds --sando- prefix to CSS variable names
 * Example: color.brand.500 -> --sando-color-brand-500
 */

export default {
  name: 'name/css-sando',
  type: 'name',
  transform: (token) => {
    return `--sando-${token.path.join('-')}`;
  }
};
