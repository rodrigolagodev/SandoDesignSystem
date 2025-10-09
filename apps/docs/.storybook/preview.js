/** @type { import('@storybook/web-components').Preview } */

// Import design tokens CSS - Ingredients (primitives, always loaded)
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/color.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/space.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/font.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/border.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/elevation.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/opacity.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/animation.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/z-index.css';

// Import Recipes (component tokens, always loaded)
import '../../../packages/tokens/dist/sando-tokens/css/recipes/button.css';

// Import default flavor (original light mode)
// Other flavors will be loaded dynamically based on toolbar selection
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'surface-light',
          value: '#f5f5f5'
        },
        {
          name: 'dark',
          value: '#0a0a0a'
        },
        {
          name: 'surface-dark',
          value: '#171717'
        }
      ]
    },
    docs: {
      toc: true
    }
  }
};

export default preview;
