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
    "storybook-addon-tag-badges",
    {
      name: "@storybook/addon-essentials",
      options: {
        // "Change the background of the preview" dropdown — we control the
        // canvas background through the Mode (light/dark) toolbar instead.
        backgrounds: false,
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
      // Served from the root of sando.rlago.com (Cloudflare Pages).
      base: "/",
      resolve: {
        ...config.resolve,
        alias: [
          { find: "@sando-ds/tokens/dist", replacement: tokensDistPath },
          { find: "@sando-ds/tokens", replacement: tokensPath },
          { find: "@sando-ds/components", replacement: componentsPath },
          ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
        ],
      },
      server: {
        ...config.server,
        fs: {
          allow: [join(dirname(dirname(dirname(__dirname))))],
        },
      },
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
