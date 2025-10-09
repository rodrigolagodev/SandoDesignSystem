/**
 * Style Dictionary - Main Build Entry Point
 * Sando UI Toolkit
 *
 * Simplified orchestrator using modular architecture
 */

import StyleDictionary from 'style-dictionary';

// Import custom transforms
import cssVarReference from './transforms/css-var-reference.js';
import nameCssSando from './transforms/name-css-sando.js';

// Import custom formats
import cssIngredients from './formats/css/ingredients.js';
import cssFlavors from './formats/css/flavors.js';
import cssRecipes from './formats/css/recipes.js';
import typescriptCSSVariables from './formats/typescript/css-variables.js';
import typescriptPrimitiveValues from './formats/typescript/primitive-values.js';
import typescriptIndexFile from './formats/typescript/index-file.js';

// Import build configurations
import ingredientsConfig from './configs/ingredients.config.js';
import flavorsConfig from './configs/flavors.config.js';
import recipesConfig from './configs/recipes.config.js';

// Import core modules
import { buildAllLayers, validateBuildResults } from './core/orchestrator.js';
import { printBuildSummary } from './core/metrics.js';

// ============================================
// REGISTER CUSTOM HOOKS
// ============================================

// Register transforms
StyleDictionary.registerTransform(nameCssSando);
StyleDictionary.registerTransform(cssVarReference);

// Register transform groups
StyleDictionary.registerTransformGroup({
  name: 'sando/css/ingredients',
  transforms: ['name/css-sando']
});

StyleDictionary.registerTransformGroup({
  name: 'sando/css/flavors',
  transforms: ['name/css-sando', 'name/css-var-reference']
});

StyleDictionary.registerTransformGroup({
  name: 'sando/css/recipes',
  transforms: ['name/css-sando', 'name/css-var-reference']
});

// Register formats
StyleDictionary.registerFormat({ name: 'css/ingredients', format: cssIngredients });
StyleDictionary.registerFormat({ name: 'css/flavors', format: cssFlavors });
StyleDictionary.registerFormat({ name: 'css/recipes', format: cssRecipes });
StyleDictionary.registerFormat({ name: 'typescript/css-variables', format: typescriptCSSVariables });
StyleDictionary.registerFormat({ name: 'typescript/primitive-values', format: typescriptPrimitiveValues });
StyleDictionary.registerFormat({ name: 'typescript/index-file', format: typescriptIndexFile });

// ============================================
// LAYER DEFINITIONS
// ============================================

// Flatten flavors configs (array of configs) into individual layers
const flavorLayers = Array.isArray(flavorsConfig)
  ? flavorsConfig.map((config, index) => ({
      name: `Flavors`,
      emoji: '🎭',
      config,
      cacheKey: index === flavorsConfig.length - 1 ? 'flavors' : null // Only last one updates cache
    }))
  : [{
      name: 'Flavors',
      emoji: '🎭',
      config: flavorsConfig,
      cacheKey: 'flavors'
    }];

const layers = [
  {
    name: 'Ingredients',
    emoji: '📦',
    config: ingredientsConfig,
    cacheKey: 'ingredients'
  },
  ...flavorLayers,
  {
    name: 'Recipes',
    emoji: '🧩',
    config: recipesConfig,
    cacheKey: 'recipes'
  }
];

// ============================================
// MAIN BUILD FUNCTION
// ============================================

async function main() {
  console.log('\n🎨 Sando Design Token Build System\n');
  console.log('Starting build process...\n');

  try {
    // Parse CLI arguments
    const args = process.argv.slice(2);
    const force = args.includes('--force') || args.includes('-f');
    const verbose = args.includes('--verbose') || args.includes('-v');

    // Build all layers
    const results = await buildAllLayers({
      layers,
      force,
      verbose
    });

    // Print summary
    printBuildSummary(results);

    // Validate results
    const allSucceeded = validateBuildResults(results);

    if (allSucceeded) {
      console.log('✅ All tokens built successfully!\n');
      process.exit(0);
    } else {
      console.error('❌ Some builds failed. Check errors above.\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Build failed with error:');
    console.error(error.message);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run build
main();
