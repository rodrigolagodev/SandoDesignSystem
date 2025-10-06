/**
 * Build Metrics Collection and Reporting
 *
 * Handles all metrics-related functionality for the token build system
 */

import fs from 'fs';
import path from 'path';
import { formatFileSize, formatDuration } from '../utils/formatting.js';

/**
 * Calculate total size of generated files
 * @param {string} buildPath - Path to build directory
 * @param {Array} files - Array of generated file paths
 * @returns {number} Total size in bytes
 */
export function calculateTotalSize(buildPath, files) {
  let totalSize = 0;

  files.forEach(filePath => {
    const fullPath = path.join(buildPath, filePath);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      totalSize += stats.size;
    }
  });

  return totalSize;
}

/**
 * Get file sizes for individual files
 * @param {string} buildPath - Path to build directory
 * @param {Array} files - Array of generated file paths
 * @returns {Array} Array of {file, size} objects
 */
export function getFileSizes(buildPath, files) {
  return files.map(filePath => {
    const fullPath = path.join(buildPath, filePath);
    let size = 0;

    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      size = stats.size;
    }

    return {
      file: path.basename(filePath),
      size
    };
  }).sort((a, b) => b.size - a.size); // Sort by size descending
}

/**
 * Print build summary for all layers
 * @param {Object} results - Build results for all layers
 */
export function printBuildSummary(results) {
  console.log('\n' + '='.repeat(70));
  console.log('📊 BUILD SUMMARY');
  console.log('='.repeat(70));
  console.log('');

  let totalFiles = 0;
  let totalSize = 0;
  let totalDuration = 0;

  // Print each layer summary
  Object.entries(results).forEach(([layerName, result]) => {
    if (!result || !result.success) return;

    const { fileCount, totalSize: layerSize, duration, files } = result;

    totalFiles += fileCount;
    totalSize += layerSize;
    totalDuration += duration;

    console.log(`${layerName.toUpperCase()} `);
    console.log(`  Tokens:   N/A`);
    console.log(`  Files:    ${fileCount}`);
    console.log(`  Size:     ${formatFileSize(layerSize)}`);
    console.log(`  Duration: ${duration}ms`);

    // Print top files
    if (files && files.length > 0) {
      files.slice(0, 10).forEach(({ file, size }) => {
        console.log(`    → ${file} (${formatFileSize(size)})`);
      });
    }

    console.log('');
  });

  // Print totals
  console.log('-'.repeat(70));
  console.log(`Total Tokens:    0`);
  console.log(`Total Files:     ${totalFiles}`);
  console.log(`Total Size:      ${formatFileSize(totalSize)}`);
  console.log(`Total Duration:  ${totalDuration}ms (${formatDuration(totalDuration)})`);
  console.log('='.repeat(70));
  console.log('');
}

/**
 * Print layer build start message
 * @param {string} layerName - Name of the layer
 * @param {string} emoji - Emoji for the layer
 */
export function printLayerStart(layerName, emoji) {
  console.log(`\n${emoji} Building ${layerName} layer...`);
}

/**
 * Print layer build completion message
 * @param {string} layerName - Name of the layer
 * @param {Object} result - Build result
 */
export function printLayerComplete(layerName, result) {
  const { fileCount, totalSize, duration, cached } = result;

  if (cached) {
    console.log(`   ⚡ Using cached build (${duration}ms)`);
  } else {
    console.log(`   ✅ Generated ${fileCount} files in ${duration}ms`);
  }

  console.log(`   📦 Total size: ${formatFileSize(totalSize)}`);
}

/**
 * Print cache status
 * @param {boolean} isCached - Whether build was cached
 * @param {string} reason - Reason for cache hit/miss
 */
export function printCacheStatus(isCached, reason = '') {
  if (isCached) {
    console.log(`   ⚡ Cache hit${reason ? `: ${reason}` : ''}`);
  } else {
    console.log(`   🔨 No cache found${reason ? `: ${reason}` : ''}`);
  }
}
