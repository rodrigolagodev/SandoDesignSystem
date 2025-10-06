import { join, dirname } from "path";

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
	stories: [
		"../stories/**/*.mdx",
		"../../../packages/components/src/components/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-a11y",
	],
	framework: {
		name: "@storybook/web-components-vite",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	async viteFinal(config) {
		const tokensPath = join(dirname(dirname(dirname(__dirname))), "packages", "tokens", "dist", "sando-tokens");
		const componentsPath = join(dirname(dirname(dirname(__dirname))), "packages", "components", "src");

		// Customize Vite config for Storybook
		return {
			...config,
			base: '/SandoDesignSystem/storybook/',
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve?.alias,
					"@sando/tokens": tokensPath,
					"@sando/components": componentsPath,
				},
			},
			server: {
				...config.server,
				fs: {
					allow: [
						join(dirname(dirname(dirname(__dirname)))),
					],
				},
			},
		};
	},
};

export default config;
