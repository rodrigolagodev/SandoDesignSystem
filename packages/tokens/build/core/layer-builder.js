/**
 * Layer Builder
 *
 * Handles building a single token layer with Style Dictionary
 */

import StyleDictionary from 'style-dictionary';
import { calculateTotalSize, getFileSizes } from './metrics.js';

/**
 * Build a single token layer
 * @param {Object} options - Build options
 * @param {string} options.name - Layer name
 * @param {Object} options.config - Style Dictionary configuration
 * @param {boolean} options.verbose - Whether to show verbose output
 * @returns {Promise<Object>} Build result
 */
export async function buildLayer(options) {
  const { name, config, verbose = false } = options;
  const startTime = Date.now();

  try {
    // Create Style Dictionary instance
    const sd = new StyleDictionary(config);

    // Build all platforms
    await sd.buildAllPlatforms();

    // Calculate metrics
    const generatedFiles = extractGeneratedFiles(sd);
    const duration = Date.now() - startTime;

    // Get file sizes
    const buildPath = extractBuildPath(config);
    const totalSize = calculateTotalSize(buildPath, generatedFiles);
    const files = getFileSizes(buildPath, generatedFiles);

    return {
      success: true,
      layer: name,
      fileCount: generatedFiles.length,
      files,
      totalSize,
      duration,
      cached: false
    };
  } catch (error) {
    const duration = Date.now() - startTime;

    return {
      success: false,
      layer: name,
      error: error.message,
      duration
    };
  }
}

/**
 * Extract list of generated files from Style Dictionary instance
 * @param {StyleDictionary} sd - Style Dictionary instance
 * @returns {Array<string>} Array of generated file paths
 */
function extractGeneratedFiles(sd) {
  const files = [];

  // Iterate through platforms
  Object.values(sd.options.platforms || {}).forEach(platform => {
    if (platform.files) {
      platform.files.forEach(file => {
        if (file.destination) {
          files.push(file.destination);
        }
      });
    }
  });

  return files;
}

/**
 * Extract build path from configuration
 * @param {Object} config - Style Dictionary configuration
 * @returns {string} Build path
 */
function extractBuildPath(config) {
  // Try to get from first platform
  const platforms = config.platforms || {};
  const firstPlatform = Object.values(platforms)[0];

  return firstPlatform?.buildPath || 'dist/';
}
