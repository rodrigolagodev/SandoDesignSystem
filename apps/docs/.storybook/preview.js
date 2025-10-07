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

// Flavors will be loaded dynamically based on toolbar selection

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
  },

  globalTypes: {
    flavor: {
      name: 'Flavor',
      description: 'Design system theme flavor',
      defaultValue: 'original',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'original', title: 'Original (Light)', icon: 'sun' },
          { value: 'original-dark', title: 'Original Dark', icon: 'moon' }
        ],
        dynamicTitle: true
      }
    }
  },

  decorators: [
    (story, context) => {
      const flavor = context.globals.flavor || 'original';

      // Remove any existing flavor stylesheets
      const existingFlavors = document.querySelectorAll('link[data-flavor]');
      existingFlavors.forEach(link => link.remove());

      // Add the selected flavor stylesheet
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `../../../packages/tokens/dist/sando-tokens/css/flavors/${flavor}.css`;
      link.setAttribute('data-flavor', flavor);
      document.head.appendChild(link);

      // Set flavor attribute on html element (for CSS selector matching)
      document.documentElement.setAttribute('flavor', flavor);

      // Set background color based on flavor
      const isDark = flavor.includes('dark');
      document.body.style.backgroundColor = isDark ? '#0a0a0a' : '#ffffff';
      document.body.style.color = isDark ? '#e5e5e5' : '#171717';

      return story();
    }
  ]
};

export default preview;
