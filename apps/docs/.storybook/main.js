import { join, dirname } from "path";
import remarkGfm from "remark-gfm";

/**
 * Sando Design System Storybook Configuration
 * @type { import('@storybook/web-components-vite').StorybookConfig }
 */
const config = {
  // Story file patterns - Welcome first, then docs, then components
  stories: [
    "../stories/Welcome.mdx",
    "../stories/**/*.mdx",
    "../../../packages/components/src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  // Static assets directory
  staticDirs: ["../public"],

  // Addons - Order matters for toolbar positioning
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    // @storybook/addon-themes - Official addon for color mode switching
    // Uses withThemeByDataAttribute to set data-color-mode on html element
    // This prevents flickering by applying themes at the right lifecycle point
    "@storybook/addon-themes",
    "storybook-addon-tag-badges",
    {
      name: "@storybook/addon-essentials",
      options: {
        // Configure docs addon with remark-gfm for MDX tables
        docs: {
          mdxPluginOptions: {
            mdxCompileOptions: {
              remarkPlugins: [remarkGfm],
            },
          },
        },
      },
    },
  ],

  // Framework configuration
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },

  // Autodocs configuration
  docs: {
    autodocs: "tag",
  },

  // Vite configuration
  async viteFinal(config) {
    const tokensPath = join(
      dirname(dirname(dirname(__dirname))),
      "packages",
      "tokens",
      "dist",
      "sando-tokens",
    );
    const tokensDistPath = join(
      dirname(dirname(dirname(__dirname))),
      "packages",
      "tokens",
      "dist",
    );
    const componentsPath = join(
      dirname(dirname(dirname(__dirname))),
      "packages",
      "components",
      "src",
    );

    return {
      ...config,
      base: "/SandoDesignSystem/storybook/",
      resolve: {
        ...config.resolve,
        alias: [
          // Order matters: more specific paths first
          { find: "@sando/tokens/dist", replacement: tokensDistPath },
          { find: "@sando/tokens", replacement: tokensPath },
          { find: "@sando/components", replacement: componentsPath },
          ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
        ],
      },
      server: {
        ...config.server,
        fs: {
          allow: [join(dirname(dirname(dirname(__dirname))))],
        },
      },
      // Optimize Lit dependencies for better HMR
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include ?? []),
          "lit",
          "lit/decorators.js",
          "@lit/reactive-element",
        ],
      },
    };
  },
};

export default config;
