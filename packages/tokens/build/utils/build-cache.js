/**
 * Build Cache Utilities
 *
 * Provides incremental build support by tracking file modification times
 * and determining when rebuilds are necessary
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_FILE = '.build-cache.json';

/**
 * Get file modification time
 */
function getFileMtime(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtimeMs;
  } catch (error) {
    return 0;
  }
}

/**
 * Get all files in a directory recursively
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

/**
 * Generate hash for file contents
 */
function hashFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    return '';
  }
}

/**
 * Load build cache
 */
export function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    }
  } catch (error) {
    console.warn('⚠️  Warning: Could not load build cache');
  }
  return {};
}

/**
 * Save build cache
 */
export function saveCache(cache) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('⚠️  Warning: Could not save build cache');
  }
}

/**
 * Check if layer needs rebuild
 */
export function needsRebuild(layer, sourceDir, outputDir) {
  const cache = loadCache();

  // No cache exists - needs rebuild
  if (!cache[layer]) {
    return { needsRebuild: true, reason: 'No cache found' };
  }

  // Check if output directory exists
  if (!fs.existsSync(outputDir)) {
    return { needsRebuild: true, reason: 'Output directory missing' };
  }

  // Get all source files
  const sourceFiles = getAllFiles(sourceDir).filter(file => file.endsWith('.json'));

  if (sourceFiles.length === 0) {
    return { needsRebuild: false, reason: 'No source files' };
  }

  // Check if any source file has changed
  for (const file of sourceFiles) {
    const currentHash = hashFile(file);
    const cachedHash = cache[layer]?.files?.[file];

    if (currentHash !== cachedHash) {
      return {
        needsRebuild: true,
        reason: `Source file changed: ${path.basename(file)}`
      };
    }
  }

  // Check if output files are older than source files
  const outputFiles = getAllFiles(outputDir);
  if (outputFiles.length === 0) {
    return { needsRebuild: true, reason: 'No output files' };
  }

  const newestSource = Math.max(...sourceFiles.map(getFileMtime));
  const oldestOutput = Math.min(...outputFiles.map(getFileMtime));

  if (newestSource > oldestOutput) {
    return {
      needsRebuild: true,
      reason: 'Source files newer than output'
    };
  }

  return { needsRebuild: false, reason: 'Cache valid' };
}

/**
 * Update cache for a layer
 */
export function updateCache(layer, sourceDir) {
  const cache = loadCache();

  const sourceFiles = getAllFiles(sourceDir).filter(file => file.endsWith('.json'));
  const fileHashes = {};

  sourceFiles.forEach(file => {
    fileHashes[file] = hashFile(file);
  });

  cache[layer] = {
    timestamp: Date.now(),
    files: fileHashes
  };

  saveCache(cache);
}

/**
 * Clear build cache
 */
export function clearCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      fs.unlinkSync(CACHE_FILE);
      console.log('✅ Build cache cleared');
    }
  } catch (error) {
    console.error('❌ Error clearing cache:', error.message);
  }
}
