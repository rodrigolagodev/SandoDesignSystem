/**
 * Build Configuration: Flavors Layer
 *
 * Builds semantic design tokens with mode support:
 * - Discovers flavor folders (e.g., src/flavors/original/)
 * - Each flavor has: flavor.json (base) + flavor-{mode}.json (mode variants)
 * - Generates CSS with @media queries and [flavor-mode] selectors
 *
 * Supported modes:
 * - Base: flavor.json (default/light)
 * - Color modes: flavor-dark.json, flavor-high-contrast.json, flavor-forced-colors.json
 * - Motion mode: flavor-motion-reduce.json
 *
 * Output:
 * - CSS: flavor.css (base) + flavor-{mode}.css (per mode)
 * - TypeScript: {flavor}.ts (merged all modes)
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

	// Base mode config (always required: flavor.json or index.json)
	if (modes.base) {
		const baseFile = modes.base; // 'flavor.json' or 'index.json' (legacy)
		const destFile = baseFile === 'flavor.json' ? 'flavor.css' : 'index.css'; // Legacy: keep index.css

		configs.push({
			source: [`src/ingredients/**/*.json`, `src/flavors/${flavorName}/${baseFile}`],
			log: {
				warnings: "disabled",
				errors: "error",
				verbosity: "verbose",
			},
			platforms: {
				[`css-flavors-${flavorName}-base`]: {
					transformGroup: 'sando/css/flavors',
					buildPath: `dist/sando-tokens/css/flavors/${flavorName}/`,
					files: [
						{
							destination: destFile,
							format: 'css/flavors-modes',
							filter: (token) => token.filePath && token.filePath.includes('/flavors/'),
							options: {
								flavorName,
								mode: 'base',
								outputReferences: true
							}
						}
					]
				}
			}
		});
	}

	// Mode variant configs (dark, high-contrast, forced-colors, motion-reduce, etc.)
	Object.entries(modes).forEach(([modeName, modeFile]) => {
		// Skip base mode (already processed)
		if (modeName === 'base') return;

		// Destination filename: flavor-dark.css, flavor-high-contrast.css, etc.
		const destFile = modeFile.replace('.json', '.css');

		configs.push({
			// Include ingredients + base + mode file
			source: [
				`src/ingredients/**/*.json`,
				`src/flavors/${flavorName}/${modes.base}`,
				`src/flavors/${flavorName}/${modeFile}`
			],
			log: {
				warnings: "disabled",
				errors: "error",
				verbosity: "verbose",
			},
			platforms: {
				[`css-flavors-${flavorName}-${modeName}`]: {
					transformGroup: 'sando/css/flavors',
					buildPath: `dist/sando-tokens/css/flavors/${flavorName}/`,
					files: [
						{
							destination: destFile,
							format: 'css/flavors-modes',
							filter: (token) => {
								// Only include tokens from the mode file (overrides)
								return token.filePath && token.filePath.includes(`/flavors/${flavorName}/${modeFile}`);
							},
							options: {
								flavorName,
								mode: modeName,
								outputReferences: true
							}
						}
					]
				}
			}
		});
	});

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

// Export all configs: individual mode files + typescript
export default [...flavorConfigs, typescriptConfig];
