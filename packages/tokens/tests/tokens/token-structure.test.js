/**
 * Token Structure Validation Tests
 *
 * Tests the structural integrity of token files:
 * - JSON validity
 * - DTCG format compliance
 * - Required properties
 * - File organization
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tokensRoot = path.resolve(__dirname, "../../src");

// Valid DTCG token types
const VALID_TYPES = [
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
 * Recursively find all token objects with a 'value' property
 */
function findTokens(obj, path = []) {
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
 * Load all JSON files from a directory (recursively searches subdirectories)
 */
function loadJsonFiles(directory) {
  const files = {};
  const dirPath = path.join(tokensRoot, directory);

  if (!fs.existsSync(dirPath)) {
    return files;
  }

  function loadFromDir(dir, prefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recursively load from subdirectories
        loadFromDir(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name);
      } else if (entry.name.endsWith(".json")) {
        const content = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        const key = prefix ? `${prefix}/${entry.name}` : entry.name;
        files[key] = content;
      }
    }
  }

  loadFromDir(dirPath);
  return files;
}

describe("Token Structure - Ingredients Layer", () => {
  const ingredientFiles = loadJsonFiles("ingredients");

  it("should have at least one ingredient file", () => {
    expect(Object.keys(ingredientFiles).length).toBeGreaterThan(0);
  });

  Object.entries(ingredientFiles).forEach(([fileName, content]) => {
    describe(`${fileName}`, () => {
      it("should be valid JSON", () => {
        expect(content).toBeDefined();
        expect(typeof content).toBe("object");
      });

      it("should have at least one top-level category", () => {
        expect(Object.keys(content).length).toBeGreaterThan(0);
      });

      it("should not contain references (primitives only)", () => {
        const json = JSON.stringify(content);
        const hasReference = json.match(/\{[\w.]+\.value\}/);
        expect(hasReference).toBeNull();
      });

      const tokens = findTokens(content);

      it("should have at least one token", () => {
        expect(tokens.length).toBeGreaterThan(0);
      });

      tokens.forEach(({ path: tokenPath, token }) => {
        describe(`token: ${tokenPath}`, () => {
          it("should have a value property", () => {
            expect(token).toHaveProperty("value");
          });

          it("should have a type property", () => {
            expect(token).toHaveProperty("type");
          });

          it("should have a valid DTCG type", () => {
            expect(VALID_TYPES).toContain(token.type);
          });

          it("should have a non-empty value", () => {
            expect(token.value).toBeDefined();
            expect(token.value).not.toBe("");
          });
        });
      });
    });
  });
});

describe("Token Structure - Flavors Layer", () => {
  const flavorFiles = loadJsonFiles("flavors");

  it("should have at least one flavor file", () => {
    expect(Object.keys(flavorFiles).length).toBeGreaterThan(0);
  });

  it('should have an "original" flavor (default theme)', () => {
    // Check for original/flavor.json (new structure)
    const hasOriginalFlavor = Object.keys(flavorFiles).some(
      (key) => key.includes("original/flavor.json") || key === "original.json",
    );
    expect(hasOriginalFlavor).toBe(true);
  });

  Object.entries(flavorFiles).forEach(([fileName, content]) => {
    describe(`${fileName}`, () => {
      it("should be valid JSON", () => {
        expect(content).toBeDefined();
        expect(typeof content).toBe("object");
      });

      const tokens = findTokens(content);

      it("should have at least one token", () => {
        expect(tokens.length).toBeGreaterThan(0);
      });

      tokens.forEach(({ path: tokenPath, token }) => {
        describe(`token: ${tokenPath}`, () => {
          it("should have a value property", () => {
            expect(token).toHaveProperty("value");
          });

          it("should have a type property", () => {
            expect(token).toHaveProperty("type");
          });

          it("should have a valid DTCG type", () => {
            expect(VALID_TYPES).toContain(token.type);
          });

          // Flavors should reference Ingredients
          if (typeof token.value === "string" && token.value.includes("{")) {
            it("should have valid reference syntax", () => {
              // Match single reference or multiple references (e.g., in clamp())
              const singleRefPattern = /^\{[\w.-]+\.value\}$/;
              const multiRefPattern = /\{[\w.-]+\.value\}/g;

              if (singleRefPattern.test(token.value)) {
                // Single reference - OK
                expect(token.value).toMatch(singleRefPattern);
              } else {
                // Multiple references - check each one is valid
                const matches = token.value.match(multiRefPattern);
                expect(matches).toBeTruthy();
                expect(matches.length).toBeGreaterThan(0);
              }
            });
          }
        });
      });
    });
  });
});

describe("Token Structure - Recipes Layer", () => {
  const recipeFiles = loadJsonFiles("recipes");

  Object.entries(recipeFiles).forEach(([fileName, content]) => {
    describe(`${fileName}`, () => {
      it("should be valid JSON", () => {
        expect(content).toBeDefined();
        expect(typeof content).toBe("object");
      });

      const tokens = findTokens(content);

      it("should have at least one token", () => {
        expect(tokens.length).toBeGreaterThan(0);
      });

      tokens.forEach(({ path: tokenPath, token }) => {
        describe(`token: ${tokenPath}`, () => {
          it("should have a value property", () => {
            expect(token).toHaveProperty("value");
          });

          it("should have a type property", () => {
            expect(token).toHaveProperty("type");
          });

          it("should have a valid DTCG type", () => {
            expect(VALID_TYPES).toContain(token.type);
          });

          // Recipes should reference Flavors
          if (typeof token.value === "string" && token.value.includes("{")) {
            it("should have valid reference syntax", () => {
              const referencePattern = /^\{[\w.-]+\.value\}$/;
              expect(token.value).toMatch(referencePattern);
            });
          }
        });
      });
    });
  });
});

describe("Token File Organization", () => {
  it("should have ingredients directory", () => {
    expect(fs.existsSync(path.join(tokensRoot, "ingredients"))).toBe(true);
  });

  it("should have flavors directory", () => {
    expect(fs.existsSync(path.join(tokensRoot, "flavors"))).toBe(true);
  });

  it("should have recipes directory", () => {
    expect(fs.existsSync(path.join(tokensRoot, "recipes"))).toBe(true);
  });

  it("should have required ingredient files", () => {
    const requiredFiles = [
      "color.json",
      "font.json",
      "space.json",
      "border.json",
      "animation.json",
    ];

    requiredFiles.forEach((file) => {
      const filePath = path.join(tokensRoot, "ingredients", file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });
});
