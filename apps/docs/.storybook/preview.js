/** @type { import('@storybook/web-components').Preview } */

// Import design tokens CSS
// Note: Tokens are imported from the built CSS files
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/color.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/space.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/font.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/border.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/elevation.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/opacity.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/animation.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/z-index.css';
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original.css';
import '../../../packages/tokens/dist/sando-tokens/css/recipes/button.css';

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
          name: 'dark',
          value: '#1a1a1a'
        }
      ]
    },
    docs: {
      toc: true
    }
  },

  globalTypes: {
    flavor: {
      name: 'Flavor',
      description: 'Design system theme flavor',
      defaultValue: 'original',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'original', title: 'Original' }
        ],
        dynamicTitle: true
      }
    }
  }
};

export default preview;
