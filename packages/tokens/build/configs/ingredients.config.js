/**
 * Build Configuration: Ingredients Layer
 *
 * Builds base design tokens (primitives)
 * Output: One CSS file per token category
 *
 * Automatically detects all JSON files in src/tokens/ingredients/
 */

import { discoverFiles, getTopLevelKey } from '../utils/file-discovery.js';

// Discover all ingredient token files
const tokenFiles = discoverFiles('ingredients');

// Generate file configurations dynamically for individual files
const files = tokenFiles.map(filename => ({
	destination: `ingredients/${filename}.css`,
	format: 'css/ingredients',
	filter: (token) => token.path[0] === getTopLevelKey(filename)
}));

export default {
	source: ["src/ingredients/**/*.json"],

	platforms: {
		"css-ingredients": {
			transformGroup: "sando/css/ingredients",
			buildPath: "dist/sando-tokens/css/",
			files: files // Individual files only: dist/sando-tokens/css/ingredients/{name}.css
		},
		"ts-ingredients": {
			transformGroup: "js",
			buildPath: "dist/sando-tokens/ts/ingredients/",
			files: [
				// Individual category files with values
				...tokenFiles.map(filename => {
					const category = getTopLevelKey(filename);
					return {
						destination: `${filename}.ts`,
						format: "typescript/primitive-values",
						filter: (token) => token.path[0] === category,
						options: {
							layerName: "Ingredients",
							category: category
						}
					};
				}),
				// Index file with re-exports
				{
					destination: "index.ts",
					format: "typescript/index-file",
					options: {
						layerName: "Ingredients",
						importPath: "ingredients",
						isValuesExport: true
					}
				}
			]
		},
	},
};
