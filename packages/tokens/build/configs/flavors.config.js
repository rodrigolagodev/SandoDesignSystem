/**
 * Build Configuration: Flavors Layer
 *
 * Builds semantic design tokens (theme-specific) with light/dark mode support
 * - Discovers flavor folders (e.g., src/flavors/original/)
 * - Each flavor has: index.json (light mode) + dark.json (dark mode overrides)
 * - Generates CSS with @media (prefers-color-scheme: dark) and [flavor-mode] selectors
 *
 * Output:
 * - CSS: {flavor}.css (light mode) + {flavor}-dark.css (dark mode)
 * - TypeScript: {flavor}.ts (merged light + dark tokens)
 *
 * IMPORTANT: Returns MULTIPLE configs - one per flavor/mode + one for TypeScript
 */

import { discoverFlavorFolders, getFlavorModes } from '../utils/file-discovery.js';

// Discover all flavor folders
const flavorFolders = discoverFlavorFolders('flavors');

// Generate configs for each flavor
const flavorConfigs = flavorFolders.flatMap(flavorName => {
	const modes = getFlavorModes(flavorName);
	const configs = [];

	// Light mode config (always required)
	if (modes.light) {
		configs.push({
			source: [`src/ingredients/**/*.json`, `src/flavors/${flavorName}/index.json`],
			log: {
				warnings: "disabled",
				errors: "error",
				verbosity: "verbose",
			},
			platforms: {
				[`css-flavors-${flavorName}-light`]: {
					transformGroup: 'sando/css/flavors',
					buildPath: `dist/sando-tokens/css/flavors/${flavorName}/`,
					files: [
						{
							destination: 'index.css',
							format: 'css/flavors-modes',
							filter: (token) => token.filePath && token.filePath.includes('/flavors/'),
							options: {
								flavorName,
								mode: 'light',
								outputReferences: true
							}
						}
					]
				}
			}
		});
	}

	// Dark mode config (if dark.json exists)
	if (modes.dark) {
		configs.push({
			// Merge light + dark tokens (dark overrides light)
			source: [`src/ingredients/**/*.json`, `src/flavors/${flavorName}/index.json`, `src/flavors/${flavorName}/dark.json`],
			log: {
				warnings: "disabled",
				errors: "error",
				verbosity: "verbose",
			},
			platforms: {
				[`css-flavors-${flavorName}-dark`]: {
					transformGroup: 'sando/css/flavors',
					buildPath: `dist/sando-tokens/css/flavors/${flavorName}/`,
					files: [
						{
							destination: 'dark.css',
							format: 'css/flavors-modes',
							filter: (token) => {
								// Only include tokens from dark.json (overrides)
								return token.filePath && token.filePath.includes(`/flavors/${flavorName}/dark.json`);
							},
							options: {
								flavorName,
								mode: 'dark',
								outputReferences: true
							}
						}
					]
				}
			}
		});
	}

	return configs;
});

// TypeScript config - merged light + dark tokens for each flavor
const typescriptConfig = {
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
				// Individual flavor files (merged light + dark) - flat structure
				...flavorFolders.map(flavorName => ({
					destination: `${flavorName}.ts`,
					format: 'typescript/css-variables',
					filter: (token) => token.filePath?.includes(`/flavors/${flavorName}/`),
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
						useFolderStructure: false,
						categories: flavorFolders
					}
				}
			]
		}
	}
};

// Export all configs
export default [...flavorConfigs, typescriptConfig];
