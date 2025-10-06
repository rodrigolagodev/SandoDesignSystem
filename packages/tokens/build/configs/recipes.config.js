/**
 * Build Configuration: Recipes Layer
 *
 * Builds component design tokens
 * Output: One CSS file per component
 *
 * Automatically detects all JSON files in src/tokens/recipes/
 */

import { discoverFiles, getTopLevelKey } from '../utils/file-discovery.js';

// Discover all recipe files
const recipeFiles = discoverFiles('recipes');

// Alias for clarity in recipes context
const getComponentName = getTopLevelKey;

// Generate file configurations dynamically
const files = recipeFiles.map(filename => ({
	destination: `${filename}.css`,
	format: 'css/recipes',
	filter: (token) => {
		const componentName = getComponentName(filename);
		return token.path[0] === componentName || token.filePath?.includes('/recipes/');
	},
	options: {
		outputReferences: true
	}
}));

export default {
	source: [
		"src/ingredients/**/*.json",
		"src/flavors/**/*.json",
		"src/recipes/**/*.json",
	],

	log: {
		warnings: "disabled",
		errors: "error",
		verbosity: "verbose",
	},

	platforms: {
		"css-recipes": {
			transformGroup: "sando/css/recipes",
			buildPath: "dist/sando-tokens/css/recipes/",
			files
		},
		"ts-recipes": {
			transformGroup: "js",
			buildPath: "dist/sando-tokens/ts/recipes/",
			files: [
				// Individual component files
				...recipeFiles.map(filename => {
					const componentName = getComponentName(filename);
					return {
						destination: `${filename}.ts`,
						format: "typescript/css-variables",
						filter: (token) => token.path[0] === componentName,
						options: {
							layerName: "Recipes"
							// NO category filter - recipes son componentes completos
						}
					};
				}),
				// Index file with re-exports
				{
					destination: "index.ts",
					format: "typescript/index-file",
					options: {
						layerName: "Recipes",
						importPath: "recipes",
						isValuesExport: false,
						categories: recipeFiles // Explicit: ['button']
					}
				}
			]
		},
	},
};
