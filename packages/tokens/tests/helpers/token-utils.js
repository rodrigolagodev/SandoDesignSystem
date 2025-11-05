/**
 * Shared Test Utilities for Token Validation
 *
 * Common functions used across all token tests
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const tokensRoot = path.resolve(__dirname, "../../src");

/**
 * Valid DTCG token types
 */
export const VALID_DTCG_TYPES = [
  "color",
  "dimension",
  "fontFamily",
  "fontWeight",
  "duration",
  "cubicBezier",
  "number",
  "shadow",
];

/**
 * Load a single token file
 */
export function loadTokenFile(layer, fileName) {
  const filePath = path.join(tokensRoot, layer, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Token file not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * Load all JSON files from a directory and merge them
 */
export function loadAndMergeTokens(directory) {
  const dirPath = path.join(tokensRoot, directory);

  if (!fs.existsSync(dirPath)) {
    return {};
  }

  const fileNames = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
  let merged = {};

  for (const fileName of fileNames) {
    const filePath = path.join(dirPath, fileName);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    merged = { ...merged, ...content };
  }

  return merged;
}

/**
 * Load all JSON files from a directory (without merging)
 */
export function loadJsonFiles(directory) {
  const files = {};
  const dirPath = path.join(tokensRoot, directory);

  if (!fs.existsSync(dirPath)) {
    return files;
  }

  const fileNames = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));

  for (const fileName of fileNames) {
    const filePath = path.join(dirPath, fileName);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    files[fileName] = content;
  }

  return files;
}

/**
 * Recursively find all token objects with a 'value' property
 */
export function findTokens(obj, path = []) {
  const tokens = [];

  for (const key in obj) {
    const value = obj[key];
    const currentPath = [...path, key];

    if (typeof value === "object" && value !== null) {
      if ("value" in value) {
        tokens.push({
          path: currentPath.join("."),
          token: value,
        });
      } else {
        tokens.push(...findTokens(value, currentPath));
      }
    }
  }

  return tokens;
}

/**
 * Find all tokens of a specific type
 */
export function findTokensByType(obj, targetType, currentPath = []) {
  const tokens = [];

  for (const key in obj) {
    const value = obj[key];
    const newPath = [...currentPath, key];

    if (typeof value === "object" && value !== null) {
      if (value.type === targetType && "value" in value) {
        tokens.push({
          path: newPath.join("."),
          value: value.value,
          token: value,
        });
      }
      tokens.push(...findTokensByType(value, targetType, newPath));
    }
  }

  return tokens;
}

/**
 * Find all token references in an object
 */
export function findReferences(obj, currentPath = []) {
  const references = [];

  for (const key in obj) {
    const value = obj[key];
    const newPath = [...currentPath, key];

    if (typeof value === "object" && value !== null) {
      if (value.value && typeof value.value === "string") {
        const match = value.value.match(/\{([^}]+)\}/g);
        if (match) {
          match.forEach((ref) => {
            const cleanRef = ref.slice(1, -1); // Remove { and }
            references.push({
              tokenPath: newPath.join("."),
              reference: cleanRef,
              fullToken: value,
            });
          });
        }
      }
      references.push(...findReferences(value, newPath));
    }
  }

  return references;
}

/**
 * Validate that a reference path exists in a token object
 */
export function validateReference(refPath, tokenObject) {
  const parts = refPath.replace(".value", "").split(".");
  let current = tokenObject;

  for (const part of parts) {
    if (!current || typeof current !== "object") {
      return false;
    }
    current = current[part];
  }

  return current !== undefined;
}

/**
 * Check for circular references
 */
export function hasCircularReference(tokenPath, refPath) {
  const tokenParts = tokenPath.split(".");
  const refParts = refPath.replace(".value", "").split(".");

  // Check if reference is pointing to itself or a parent
  for (let i = 0; i < Math.min(tokenParts.length, refParts.length); i++) {
    if (tokenParts[i] !== refParts[i]) {
      return false;
    }
  }

  return refParts.length <= tokenParts.length;
}

/**
 * Check if a value is a reference (contains {...})
 */
export function isReference(value) {
  return (
    typeof value === "string" && value.includes("{") && value.includes("}")
  );
}

/**
 * Extract reference path from a token value
 */
export function extractReference(value) {
  const match = value.match(/\{([^}]+)\}/);
  return match ? match[1] : null;
}

/**
 * Validate color format (HSL)
 */
export function isValidHSL(value) {
  if (value === "transparent") return true;
  const hslPattern = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
  return hslPattern.test(value);
}

/**
 * Validate dimension format
 */
export function isValidDimension(value) {
  const validUnits = /(rem|px|em|%)$/;
  return validUnits.test(value);
}

/**
 * Validate duration format
 */
export function isValidDuration(value) {
  return /(ms|s)$/.test(value);
}

/**
 * Get all token files in a layer
 */
export function getTokenFiles(layer) {
  const dirPath = path.join(tokensRoot, layer);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
}

/**
 * Count total tokens in an object
 */
export function countTokens(obj) {
  return findTokens(obj).length;
}

/**
 * Get token statistics
 */
export function getTokenStats(layer) {
  const tokens = loadAndMergeTokens(layer);
  const allTokens = findTokens(tokens);
  const references = findReferences(tokens);

  const typeCount = {};
  allTokens.forEach(({ token }) => {
    const type = token.type || "unknown";
    typeCount[type] = (typeCount[type] || 0) + 1;
  });

  return {
    total: allTokens.length,
    references: references.length,
    types: typeCount,
    files: getTokenFiles(layer).length,
  };
}
