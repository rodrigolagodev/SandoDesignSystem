/**
 * Build Configuration: Flavors Layer
 *
 * Builds semantic design tokens (theme-specific)
 * Output: One CSS file per flavor/theme
 *
 * Automatically detects all JSON files in src/tokens/flavors/
 *
 * IMPORTANT: Returns MULTIPLE configs - one per flavor + one for TypeScript
 * This is because Style Dictionary doesn't support per-platform source arrays
 */

import { discoverFiles } from '../utils/file-discovery.js';

// Discover all flavor files
const flavorFiles = discoverFiles('flavors');

// Export array of configs - one per flavor for CSS + one for all TypeScript
export default flavorFiles.map(flavorName => ({
	// Each flavor gets its own config with specific source files
	source: [`src/ingredients/**/*.json`, `src/flavors/${flavorName}.json`],

	log: {
		warnings: "disabled",
		errors: "error",
		verbosity: "verbose",
	},

	platforms: {
		[`css-flavors-${flavorName}`]: {
			transformGroup: 'sando/css/flavors',
			buildPath: 'dist/sando-tokens/css/flavors/',
			files: [
				{
					destination: `${flavorName}.css`,
					format: 'css/flavors',
					filter: (token) => {
						// Only include tokens that come from the flavors directory
						return token.filePath && token.filePath.includes('/flavors/');
					},
					options: {
						flavorName,
						outputReferences: true
					}
				}
			]
		}
	}
})).concat([{
	// TypeScript config - needs all flavors
	source: ["src/ingredients/**/*.json", "src/flavors/**/*.json"],

	log: {
		warnings: "disabled",
		errors: "error",
		verbosity: "verbose",
	},

	platforms: {
		'ts-flavors': {
			transformGroup: 'js',
			buildPath: 'dist/sando-tokens/ts/flavors/',
			files: [
				// Individual flavor files
				...flavorFiles.map(flavorName => ({
					destination: `${flavorName}.ts`,
					format: 'typescript/css-variables',
					filter: (token) => token.filePath?.includes(`/flavors/${flavorName}.json`),
					options: {
						layerName: 'Flavors'
					}
				})),
				// Index file with re-exports
				{
					destination: 'index.ts',
					format: 'typescript/index-file',
					options: {
						layerName: 'Flavors',
						importPath: 'flavors',
						isValuesExport: false,
						categories: flavorFiles
					}
				}
			]
		}
	}
}]);
