import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Sando Design System',
  description: 'A modern, accessible, token-based design system built with Web Components',
  base: '/SandoDesignSystem/docs/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/getting-started/introduction' },
      { text: 'Tokens', link: '/tokens/architecture' },
      { text: 'Components', link: '/components/overview' },
      {
        text: 'Storybook',
        link: 'http://localhost:6006',
        target: '_blank'
      }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started/introduction' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Theming', link: '/getting-started/theming' },
            { text: 'Dependencies', link: '/getting-started/dependencies' }
          ]
        }
      ],

      '/tokens/': [
        {
          text: 'Design Tokens',
          items: [
            { text: 'Architecture', link: '/tokens/architecture' },
            { text: 'Ingredients', link: '/tokens/ingredients' },
            { text: 'Flavors', link: '/tokens/flavors' },
            { text: 'Recipes', link: '/tokens/recipes' },
            { text: 'Testing', link: '/tokens/testing' }
          ]
        }
      ],

      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/overview' },
            { text: 'Button', link: '/components/button' }
          ]
        }
      ],

      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Contributing', link: '/guides/contributing' },
            { text: 'Accessibility', link: '/guides/accessibility' },
            { text: 'Browser Support', link: '/guides/browser-support' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rodrigolagodev/SandoDesignSystem' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Rodrigo Lago'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})
