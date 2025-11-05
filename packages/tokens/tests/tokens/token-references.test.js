/**
 * Token Reference Validation Tests
 *
 * Tests the reference integrity across token layers:
 * - Flavors correctly reference Ingredients
 * - Recipes correctly reference Flavors
 * - No circular references
 * - No broken references
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tokensRoot = path.resolve(__dirname, "../../src");

/**
 * Load all JSON files from a directory and merge them (recursively searches subdirectories)
 */
function loadAndMergeTokens(directory) {
  const dirPath = path.join(tokensRoot, directory);

  if (!fs.existsSync(dirPath)) {
    return {};
  }

  let merged = {};

  function loadFromDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recursively load from subdirectories
        loadFromDir(fullPath);
      } else if (entry.name.endsWith(".json")) {
        const content = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        merged = { ...merged, ...content };
      }
    }
  }

  loadFromDir(dirPath);
  return merged;
}

/**
 * Find all token references in an object
 */
function findReferences(obj, currentPath = []) {
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
function validateReference(refPath, tokenObject) {
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
function hasCircularReference(tokenPath, refPath) {
  // Simple check: if reference path starts with token path, it's circular
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

// Load all token layers
const ingredients = loadAndMergeTokens("ingredients");
const flavorsOriginal = loadAndMergeTokens("flavors");
const recipes = loadAndMergeTokens("recipes");

describe("Token References - Ingredients Layer", () => {
  const ingredientRefs = findReferences(ingredients);

  it("should not have any references (primitives only)", () => {
    expect(ingredientRefs).toHaveLength(0);
  });
});

describe("Token References - Flavors Layer", () => {
  const flavorRefs = findReferences(flavorsOriginal);

  it("should have at least one reference to Ingredients", () => {
    expect(flavorRefs.length).toBeGreaterThan(0);
  });

  describe("Reference Integrity", () => {
    flavorRefs.forEach(({ tokenPath, reference }) => {
      it(`${tokenPath} -> {${reference}} should be valid`, () => {
        const isValid = validateReference(reference, ingredients);
        expect(isValid).toBe(true);
      });
    });
  });

  describe("No Circular References", () => {
    flavorRefs.forEach(({ tokenPath, reference }) => {
      it(`${tokenPath} should not reference itself`, () => {
        const isCircular = hasCircularReference(tokenPath, reference);
        expect(isCircular).toBe(false);
      });
    });
  });

  describe("Reference Format", () => {
    flavorRefs.forEach(({ tokenPath, reference }) => {
      it(`${tokenPath} reference should use valid path syntax`, () => {
        // Accept both formats: with or without .value suffix
        const validPathPattern = /^[\w.-]+(\.value)?$/;
        expect(reference).toMatch(validPathPattern);
      });
    });
  });
});

describe("Token References - Recipes Layer", () => {
  const recipeRefs = findReferences(recipes);

  it("should have at least one reference to Flavors", () => {
    expect(recipeRefs.length).toBeGreaterThan(0);
  });

  describe("Reference Integrity", () => {
    recipeRefs.forEach(({ tokenPath, reference }) => {
      it(`${tokenPath} -> {${reference}} should be valid`, () => {
        const isValid = validateReference(reference, flavorsOriginal);
        expect(isValid).toBe(true);
      });
    });
  });

  describe("No Circular References", () => {
    recipeRefs.forEach(({ tokenPath, reference }) => {
      it(`${tokenPath} should not reference itself`, () => {
        const isCircular = hasCircularReference(tokenPath, reference);
        expect(isCircular).toBe(false);
      });
    });
  });

  describe("Reference Format", () => {
    recipeRefs.forEach(({ tokenPath, reference }) => {
      it(`${tokenPath} reference should use valid path syntax`, () => {
        // Accept both formats: with or without .value suffix
        const validPathPattern = /^[\w.-]+(\.value)?$/;
        expect(reference).toMatch(validPathPattern);
      });
    });
  });

  describe("Proper Layering", () => {
    recipeRefs.forEach(({ tokenPath, reference }) => {
      it(`${tokenPath} should not skip layers (reference Ingredients directly)`, () => {
        // Check if the reference exists in Flavors
        const isInFlavors = validateReference(reference, flavorsOriginal);

        // If not in Flavors, check if it's incorrectly referencing Ingredients
        if (!isInFlavors) {
          const isInIngredients = validateReference(reference, ingredients);
          if (isInIngredients) {
            // This is a violation: Recipes should not reference Ingredients directly
            expect(isInIngredients).toBe(false);
          }
        }

        expect(isInFlavors).toBe(true);
      });
    });
  });
});

describe("Cross-Layer Reference Chain", () => {
  it("should have a complete reference chain from Recipes to Ingredients", () => {
    const recipeRefs = findReferences(recipes);

    // Pick a random recipe reference and trace it back
    if (recipeRefs.length > 0) {
      const { tokenPath, reference } = recipeRefs[0];

      // Step 1: Recipe references Flavor
      const flavorExists = validateReference(reference, flavorsOriginal);
      expect(flavorExists).toBe(true);

      // Step 2: Get the flavor token and check if it references an Ingredient
      const flavorPath = reference.replace(".value", "").split(".");
      let flavorToken = flavorsOriginal;

      for (const part of flavorPath) {
        flavorToken = flavorToken[part];
      }

      if (
        flavorToken &&
        flavorToken.value &&
        typeof flavorToken.value === "string" &&
        flavorToken.value.includes("{")
      ) {
        const ingredientRef = flavorToken.value.match(/\{([^}]+)\}/)?.[1];

        if (ingredientRef) {
          // Step 3: Flavor references Ingredient
          const ingredientExists = validateReference(
            ingredientRef,
            ingredients,
          );
          expect(ingredientExists).toBe(true);
        }
      }
    }
  });
});

describe("Reference Statistics", () => {
  const flavorRefs = findReferences(flavorsOriginal);
  const recipeRefs = findReferences(recipes);

  it("should report reference counts", () => {
    console.log(`\n📊 Reference Statistics:`);
    console.log(`   Flavors references: ${flavorRefs.length}`);
    console.log(`   Recipes references: ${recipeRefs.length}`);
    console.log(
      `   Total references: ${flavorRefs.length + recipeRefs.length}`,
    );

    expect(flavorRefs.length).toBeGreaterThan(0);
    expect(recipeRefs.length).toBeGreaterThan(0);
  });

  it("should have all Flavor references pointing to valid Ingredients", () => {
    const invalidRefs = flavorRefs.filter(
      ({ reference }) => !validateReference(reference, ingredients),
    );

    expect(invalidRefs).toHaveLength(0);
  });

  it("should have all Recipe references pointing to valid Flavors", () => {
    const invalidRefs = recipeRefs.filter(
      ({ reference }) => !validateReference(reference, flavorsOriginal),
    );

    expect(invalidRefs).toHaveLength(0);
  });
});
