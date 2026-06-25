import { join, dirname, resolve } from "path";
import remarkGfm from "remark-gfm";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

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
    "../stories/tools/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/tools/**/*.mdx",
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
    const generatorsPath = join(
      dirname(dirname(dirname(__dirname))),
      "packages",
      "tokens",
      "scripts",
      "generators",
    );

    // Resolve culori from root node_modules (it is hoisted as a dependency of @sando-ds/tokens)
    const culoriPath = resolve(
      dirname(dirname(dirname(__dirname))),
      "node_modules",
      ".pnpm",
      "culori@4.0.2",
      "node_modules",
      "culori",
      "bundled",
      "culori.min.mjs",
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
          { find: "@sando-tokens/generators", replacement: generatorsPath },
          { find: "culori", replacement: culoriPath },
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
          "culori",
        ],
      },
    };
  },
};

export default config;
