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

// Import Flavors - Original flavor with all modes
// Base mode: default tokens
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor.css';

// Color modes (mutually exclusive) - @media queries + manual overrides
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-light.css';
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-dark.css';
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-high-contrast.css';
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-forced-colors.css';

// Motion mode (independent - combines with any color mode)
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-motion-reduce.css';

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

  // Global toolbar items - Color Mode & Motion Mode selectors
  globalTypes: {
    colorMode: {
      name: 'Color Mode',
      description: 'Color mode variant (mutually exclusive)',
      defaultValue: 'auto',
      toolbar: {
        title: 'Color Mode',
        icon: 'circlehollow',
        items: [
          { value: 'auto', icon: 'circlehollow', title: 'Auto (System Preference)' },
          { value: 'light', icon: 'sun', title: 'Light Mode' },
          { value: 'dark', icon: 'moon', title: 'Dark Mode' },
          { value: 'high-contrast', icon: 'contrast', title: 'High Contrast Mode' }
        ],
        dynamicTitle: true
      }
    },
    motionMode: {
      name: 'Motion Mode',
      description: 'Animation preferences (independent - combines with any color mode)',
      defaultValue: 'auto',
      toolbar: {
        title: 'Motion',
        icon: 'play',
        items: [
          { value: 'auto', icon: 'play', title: 'Auto (System Preference)' },
          { value: 'reduce', icon: 'stop', title: 'Reduced Motion' }
        ],
        dynamicTitle: true
      }
    }
  },

  // Decorators - Apply color mode and motion mode attributes
  decorators: [
    (story, context) => {
      const colorMode = context.globals.colorMode || 'auto';
      const motionMode = context.globals.motionMode || 'auto';

      // Apply color mode to document for global inheritance
      if (colorMode === 'auto') {
        // Auto mode: remove attribute to follow system preference
        document.documentElement.removeAttribute('flavor-mode');
        document.body.removeAttribute('flavor-mode');
      } else {
        // light, dark, high-contrast: apply attribute for manual override
        // Note: 'light' needs explicit attribute to override prefers-color-scheme: dark
        document.documentElement.setAttribute('flavor-mode', colorMode);
        document.body.setAttribute('flavor-mode', colorMode);
      }

      // Motion mode is handled automatically via @media (prefers-reduced-motion)
      // We simulate it by adding a class for testing purposes
      document.documentElement.classList.remove('motion-reduce');
      if (motionMode === 'reduce') {
        document.documentElement.classList.add('motion-reduce');
        // Add CSS rule to simulate prefers-reduced-motion
        const styleId = 'storybook-motion-reduce';
        let styleEl = document.getElementById(styleId);
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = styleId;
          styleEl.textContent = `
            .motion-reduce * {
              animation-duration: 0ms !important;
              transition-duration: 0ms !important;
            }
          `;
          document.head.appendChild(styleEl);
        }
      }

      // Update background and color based on active color mode
      let effectiveColorMode = colorMode;
      if (colorMode === 'auto') {
        // Detect system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          effectiveColorMode = 'dark';
        } else if (window.matchMedia('(prefers-contrast: more)').matches) {
          effectiveColorMode = 'high-contrast';
        } else {
          effectiveColorMode = 'light';
        }
      }

      // Apply background and text color based on effective mode
      if (effectiveColorMode === 'dark') {
        document.documentElement.style.backgroundColor = 'var(--sando-color-background-base, #0a0a0a)';
        document.documentElement.style.color = 'var(--sando-color-text-body, #e5e5e5)';
      } else if (effectiveColorMode === 'high-contrast') {
        document.documentElement.style.backgroundColor = 'var(--sando-color-background-base, #ffffff)';
        document.documentElement.style.color = 'var(--sando-color-text-body, #000000)';
      } else {
        // light mode
        document.documentElement.style.backgroundColor = 'var(--sando-color-background-base, #ffffff)';
        document.documentElement.style.color = 'var(--sando-color-text-body, #1f2937)';
      }

      return story();
    }
  ]
};

export default preview;
