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
 * Discover flavor folders (supports nested folder structure)
 * @param {string} dir - Directory path relative to project root (default: 'flavors')
 * @returns {string[]} Array of flavor folder names
 */
export function discoverFlavorFolders(dir = 'flavors') {
  const fullPath = path.join(process.cwd(), 'src', dir);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
}

/**
 * Get available mode files for a flavor
 * Supports new naming convention: flavor.json (base), flavor-{mode}.json (variants)
 * Also supports legacy: index.json (base), dark.json (dark mode)
 *
 * @param {string} flavorName - Flavor folder name
 * @returns {Object} Object with available modes and their filenames
 *
 * @example
 * getFlavorModes('original')
 * // Returns: { base: 'flavor.json', dark: 'flavor-dark.json', 'high-contrast': 'flavor-high-contrast.json' }
 */
export function getFlavorModes(flavorName) {
  const flavorPath = path.join(process.cwd(), 'src', 'flavors', flavorName);

  if (!fs.existsSync(flavorPath)) {
    return {};
  }

  const files = fs.readdirSync(flavorPath);
  const modes = {};

  // Check for base mode files (new: flavor.json, legacy: index.json)
  if (files.includes('flavor.json')) {
    modes.base = 'flavor.json';
  } else if (files.includes('index.json')) {
    modes.base = 'index.json'; // Legacy support
  }

  // Check for mode variant files (new convention)
  const modeFiles = files.filter(file => file.startsWith('flavor-') && file.endsWith('.json'));

  modeFiles.forEach(file => {
    // Extract mode name: 'flavor-dark.json' -> 'dark'
    const modeName = file.replace('flavor-', '').replace('.json', '');
    modes[modeName] = file;
  });

  // Legacy support: dark.json -> flavor-dark.json
  if (files.includes('dark.json') && !modes.dark) {
    modes.dark = 'dark.json';
  }

  return modes;
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
