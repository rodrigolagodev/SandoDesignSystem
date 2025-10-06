/**
 * File Discovery Utilities
 *
 * Shared utilities for discovering and organizing token source files
 */

import fs from 'fs';
import path from 'path';

/**
 * Discover all JSON files in a directory
 * @param {string} dir - Directory path relative to project root
 * @param {string} pattern - Glob pattern (default: '*.json')
 * @returns {string[]} Array of file basenames without extension
 */
export function discoverFiles(dir, pattern = '*.json') {
  const fullPath = path.join(process.cwd(), 'src', dir);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);

  return files
    .filter(file => {
      if (pattern === '*.json') {
        return file.endsWith('.json');
      }
      // Support other patterns if needed
      return file.match(new RegExp(pattern.replace('*', '.*')));
    })
    .map(file => path.basename(file, '.json'))
    .sort();
}

/**
 * Extract the top-level category key from a filename
 * @param {string} filename - Filename with or without extension
 * @returns {string} Category name
 *
 * @example
 * getTopLevelKey('color.json') // 'color'
 * getTopLevelKey('button') // 'button'
 */
export function getTopLevelKey(filename) {
  return path.basename(filename, '.json');
}

/**
 * Get all source file paths for a layer
 * @param {string} layer - Layer name (ingredients, flavors, recipes)
 * @returns {string[]} Array of absolute file paths
 */
export function getSourceFiles(layer) {
  const sourceDir = path.join(process.cwd(), 'src', layer);

  if (!fs.existsSync(sourceDir)) {
    return [];
  }

  const files = fs.readdirSync(sourceDir);

  return files
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(sourceDir, file))
    .sort();
}

/**
 * Check if a file path matches a specific source file
 * @param {string} tokenFilePath - Token's file path from Style Dictionary
 * @param {string} targetFile - Target filename to match
 * @returns {boolean} True if paths match
 *
 * @example
 * matchesSourceFile('/path/to/src/flavors/original.json', 'original')
 */
export function matchesSourceFile(tokenFilePath, targetFile) {
  if (!tokenFilePath) return false;

  const normalized = tokenFilePath.replace(/\\/g, '/');
  const filename = path.basename(targetFile, '.json');

  return normalized.includes(`/${filename}.json`);
}
