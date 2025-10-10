/** @type { import('@storybook/web-components').Preview } */

// Import Storybook preview global styles
import './preview-styles.css';

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
import '../../../packages/tokens/dist/sando-tokens/css/recipes/icon.css';

// Import Flavors - Original flavor with light and dark modes
// Light mode: index.css (all tokens)
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/index.css';
// Dark mode: dark.css (color overrides with @media query + manual override)
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/dark.css';

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

  // Global toolbar items - Flavor Mode selector
  globalTypes: {
    flavorMode: {
      name: 'Flavor Mode',
      description: 'Light or Dark mode',
      defaultValue: 'auto',
      toolbar: {
        title: 'Flavor Mode',
        icon: 'circlehollow',
        items: [
          { value: 'auto', icon: 'circlehollow', title: 'Auto (System Preference)' },
          { value: 'light', icon: 'sun', title: 'Light Mode' },
          { value: 'dark', icon: 'moon', title: 'Dark Mode' }
        ],
        dynamicTitle: true
      }
    }
  },

  // Decorators - Apply flavor-mode attribute to HTML element
  decorators: [
    (story, context) => {
      const flavorMode = context.globals.flavorMode;

      // Remove any existing flavor-mode attribute
      document.documentElement.removeAttribute('flavor-mode');

      // Apply flavor-mode if not 'auto' (auto uses @media query)
      if (flavorMode === 'light' || flavorMode === 'dark') {
        document.documentElement.setAttribute('flavor-mode', flavorMode);
      }

      // Update background based on mode
      const isDark = flavorMode === 'dark' ||
                     (flavorMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      document.documentElement.style.backgroundColor = isDark
        ? 'var(--sando-color-background-base, #0a0a0a)'
        : 'var(--sando-color-background-base, #ffffff)';

      return story();
    }
  ]
};

export default preview;
