/**
 * Build Orchestrator
 *
 * Coordinates the building of all token layers
 */

import { buildLayer } from './layer-builder.js';
import { needsRebuild, updateCache } from '../utils/build-cache.js';
import { printLayerStart, printLayerComplete, printCacheStatus } from './metrics.js';
import { generateCssBarrels, getDefaultDistDir } from '../utils/barrel-generator.js';

/**
 * Build all token layers
 * @param {Object} options - Build options
 * @param {Array} options.layers - Layer configurations
 * @param {boolean} options.force - Force rebuild ignoring cache
 * @param {boolean} options.verbose - Show verbose output
 * @returns {Promise<Object>} Build results for all layers
 */
export async function buildAllLayers(options) {
  const { layers, force = false, verbose = false } = options;
  const results = {};

  for (const layer of layers) {
    const { name, emoji, config, cacheKey } = layer;

    // Print layer start
    printLayerStart(name, emoji);

    // Check cache (simplified - always rebuild for now)
    printCacheStatus(false);

    // Build layer
    const result = await buildLayer({
      name,
      config,
      verbose
    });

    results[name] = result;

    if (result.success) {
      printLayerComplete(name, result);

      // Update cache
      if (cacheKey) {
        const sourceDir = `src/${cacheKey}`;
        updateCache(cacheKey, sourceDir);
      }
    } else {
      console.error(`   ❌ Build failed: ${result.error}`);
    }
  }

  return results;
}

/**
 * Validate build results
 * @param {Object} results - Build results from all layers
 * @returns {boolean} True if all builds succeeded
 */
export function validateBuildResults(results) {
  return Object.values(results).every(result => result.success);
}

/**
 * Run post-build tasks
 * Executes after all layers are successfully built
 * @param {Object} options - Post-build options
 * @param {string} options.distDir - Distribution directory path
 * @returns {Promise<Object>} Post-build results
 */
export async function runPostBuildTasks(options = {}) {
  const distDir = options.distDir || getDefaultDistDir();

  const results = {
    barrels: await generateCssBarrels(distDir)
  };

  return results;
}
