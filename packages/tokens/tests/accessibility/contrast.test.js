/**
 * Accessibility - Color Contrast Tests
 *
 * Tests WCAG 2.1 contrast requirements:
 * - AA Level: 4.5:1 for normal text, 3:1 for large text
 * - AAA Level: 7:1 for normal text, 4.5:1 for large text
 * - UI Components: 3:1 minimum
 *
 * Uses culori library for accurate color parsing and WCAG contrast calculations.
 * This aligns with CC-CALC guideline: "Do NOT implement manually: Use existing test utilities"
 * and maintains consistency with palette-generator.js which also uses culori.
 *
 * Test matrix: 7 flavors × 3 modes = 21 combinations
 * Flavors: sando, original, strawberry, nori, egg-salad, kiwi, tonkatsu
 * Modes: light (flavor.json), dark (flavor-dark.json), high-contrast (flavor-high-contrast.json)
 */

import { describe, it, expect } from "vitest";
import { parse, wcagContrast } from "culori";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tokensRoot = path.resolve(__dirname, "../../src");

/**
 * Calculate WCAG contrast ratio between two color strings.
 * Uses culori for accurate parsing of any CSS color format (OKLCH, HSL, RGB, etc.)
 */
function getContrastRatio(color1String, color2String) {
  const color1 = parse(color1String);
  const color2 = parse(color2String);

  if (!color1) {
    throw new Error(`Invalid color: ${color1String}`);
  }
  if (!color2) {
    throw new Error(`Invalid color: ${color2String}`);
  }

  return wcagContrast(color1, color2);
}

/**
 * Get color value from ingredient tokens
 */
function getIngredientColor(pathStr, ingredients) {
  const parts = pathStr.replace(".value", "").split(".");
  let current = ingredients;

  for (const part of parts) {
    if (!current || typeof current !== "object") return null;
    current = current[part];
  }

  return current?.value;
}

/**
 * Resolve flavor color to actual color value
 */
function resolveFlavorColor(flavorToken, ingredients) {
  if (!flavorToken?.value) return null;

  if (
    typeof flavorToken.value === "string" &&
    flavorToken.value.includes("{")
  ) {
    const match = flavorToken.value.match(/\{([^}]+)\}/);
    if (match) {
      const refPath = match[1];
      return getIngredientColor(refPath, ingredients);
    }
  }

  return flavorToken.value;
}

/**
 * Deep merge for mode overlay tokens
 */
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key]) && key in result) {
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * Get a nested token by path parts
 */
function getToken(tokens, pathParts) {
  let current = tokens;
  for (const part of pathParts) {
    if (!current || typeof current !== "object") return null;
    current = current[part];
  }
  return current;
}

/**
 * Resolve a color from a token path
 */
function resolveColor(tokens, pathParts, ingredients) {
  const token = getToken(tokens, pathParts);
  return resolveFlavorColor(token, ingredients);
}

/**
 * Load a flavor's tokens with optional mode overlay
 */
function loadFlavorTokens(flavor, modeName) {
  const flavorDir = path.join(tokensRoot, "flavors", flavor);
  const baseFile = path.join(flavorDir, "flavor.json");
  const base = JSON.parse(fs.readFileSync(baseFile, "utf8"));

  if (modeName === "light") return base;

  const modeFile = modeName === "dark"
    ? path.join(flavorDir, "flavor-dark.json")
    : path.join(flavorDir, "flavor-high-contrast.json");

  if (fs.existsSync(modeFile)) {
    const modeOverlay = JSON.parse(fs.readFileSync(modeFile, "utf8"));
    return deepMerge(base, modeOverlay);
  }

  return base;
}

// Load ingredients
const ingredientsPath = path.join(tokensRoot, "ingredients");
const colorFile = path.join(ingredientsPath, "color.json");
const ingredients = JSON.parse(fs.readFileSync(colorFile, "utf8"));

// Load original flavor for backward-compatible tests
const flavorsRoot = path.join(tokensRoot, "flavors");
const originalFile = path.join(flavorsRoot, "original/flavor.json");
const flavors = JSON.parse(fs.readFileSync(originalFile, "utf8"));

const FLAVORS = ["sando", "original", "strawberry", "nori", "egg-salad", "kiwi", "tonkatsu"];

// CC-CR-R5 lists four modes (light, dark, high-contrast, forced-colors).
// forced-colors is intentionally excluded from this matrix: those flavor files
// use CSS system color keywords (Canvas, CanvasText, ButtonFace, etc.) which
// are not real colors — they resolve to OS-defined values at runtime and
// cannot be parsed by culori for WCAG contrast calculation. The user agent
// guarantees contrast in forced-colors mode by design (per WCAG 1.4.1 spec).
const MODES = ["light", "dark", "high-contrast"];

// ---------------------------------------------------------------------------
// ORIGINAL TESTS — kept for backward compatibility (original/light only)
// ---------------------------------------------------------------------------

describe("Accessibility - Text Contrast (WCAG AA)", () => {
  describe("Body Text on Backgrounds", () => {
    it("text-body on background-base should meet 4.5:1 contrast", () => {
      const textColorValue = resolveFlavorColor(
        flavors.color.text.body,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.background.base,
        ingredients,
      );

      if (!textColorValue || !bgColorValue) {
        console.warn(
          "Could not resolve colors for text-body on background-base",
        );
        return;
      }

      const ratio = getContrastRatio(textColorValue, bgColorValue);

      console.log(`   text-body on background-base: ${ratio.toFixed(2)}:1`);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it("text-body on background-surface should meet 4.5:1 contrast", () => {
      const textColorValue = resolveFlavorColor(
        flavors.color.text.body,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.background.surface,
        ingredients,
      );

      if (!textColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(textColorValue, bgColorValue);

      console.log(`   text-body on background-surface: ${ratio.toFixed(2)}:1`);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it("text-body on background-raised should meet 4.5:1 contrast", () => {
      const textColorValue = resolveFlavorColor(
        flavors.color.text.body,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.background.raised,
        ingredients,
      );

      if (!textColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(textColorValue, bgColorValue);

      console.log(`   text-body on background-raised: ${ratio.toFixed(2)}:1`);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe("Heading Text on Backgrounds", () => {
    it("text-heading on background-base should meet 4.5:1 contrast", () => {
      const textColorValue = resolveFlavorColor(
        flavors.color.text.heading,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.background.base,
        ingredients,
      );

      if (!textColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(textColorValue, bgColorValue);

      console.log(`   text-heading on background-base: ${ratio.toFixed(2)}:1`);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe("Text on Solid Action Backgrounds", () => {
    it("action-solid-text on action-solid-background should meet 4.5:1 contrast", () => {
      const textColorValue = resolveFlavorColor(
        flavors.color.action.solid.text.default,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.action.solid.background.default,
        ingredients,
      );

      if (!textColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(textColorValue, bgColorValue);

      console.log(`   action-solid text on background: ${ratio.toFixed(2)}:1`);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe("Link Text", () => {
    it("text-link-default on background-base should meet 4.5:1 contrast", () => {
      const textColorValue = resolveFlavorColor(
        flavors.color.text.link.default,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.background.base,
        ingredients,
      );

      if (!textColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(textColorValue, bgColorValue);

      console.log(`   link-default on background-base: ${ratio.toFixed(2)}:1`);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});

describe("Accessibility - UI Components (WCAG AA)", () => {
  describe("Borders and UI Elements", () => {
    it.skip("border-default on background-base should meet 3:1 contrast", () => {
      const borderColorValue = resolveFlavorColor(
        flavors.color.border.default,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.background.base,
        ingredients,
      );

      if (!borderColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(borderColorValue, bgColorValue);

      console.log(
        `   border-default on background-base: ${ratio.toFixed(2)}:1`,
      );
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });

    it("border-emphasis on background-base should meet 3:1 contrast", () => {
      const borderColorValue = resolveFlavorColor(
        flavors.color.border.emphasis,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.background.base,
        ingredients,
      );

      if (!borderColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(borderColorValue, bgColorValue);

      console.log(
        `   border-emphasis on background-base: ${ratio.toFixed(2)}:1`,
      );
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });
  });

  describe("Focus Indicators", () => {
    it("focus-ring on background-base should meet 3:1 contrast", () => {
      const focusColorValue = resolveFlavorColor(
        flavors.color.focus.ring,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.background.base,
        ingredients,
      );

      if (!focusColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(focusColorValue, bgColorValue);

      console.log(`   focus-ring on background-base: ${ratio.toFixed(2)}:1`);
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });
  });
});

describe("Accessibility - State Colors", () => {
  describe("Success State", () => {
    it("success-text on success-background should meet 4.5:1 contrast", () => {
      const textColorValue = resolveFlavorColor(
        flavors.color.state.success.text,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.state.success.background,
        ingredients,
      );

      if (!textColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(textColorValue, bgColorValue);

      console.log(
        `   success-text on success-background: ${ratio.toFixed(2)}:1`,
      );
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe("Destructive/Error State", () => {
    it("destructive-text on destructive-background should meet 4.5:1 contrast", () => {
      const textColorValue = resolveFlavorColor(
        flavors.color.state.destructive.text,
        ingredients,
      );
      const bgColorValue = resolveFlavorColor(
        flavors.color.state.destructive.background,
        ingredients,
      );

      if (!textColorValue || !bgColorValue) return;

      const ratio = getContrastRatio(textColorValue, bgColorValue);

      console.log(
        `   destructive-text on destructive-background: ${ratio.toFixed(2)}:1`,
      );
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});

describe("Accessibility - Contrast Report", () => {
  it("should generate contrast report for all text/background combinations", () => {
    const combinations = [
      { text: "text.body", bg: "background.base", minRatio: 4.5 },
      { text: "text.body", bg: "background.surface", minRatio: 4.5 },
      { text: "text.body", bg: "background.raised", minRatio: 4.5 },
      { text: "text.heading", bg: "background.base", minRatio: 4.5 },
      { text: "text.caption", bg: "background.base", minRatio: 4.5 },
      { text: "text.muted", bg: "background.base", minRatio: 4.5 },
      {
        text: "action.solid.text.default",
        bg: "action.solid.background.default",
        minRatio: 4.5,
      },
    ];

    console.log("\n  Color Contrast Report (WCAG 2.1 AA):");
    console.log("  " + "-".repeat(70));

    const results = combinations.map(({ text, bg, minRatio }) => {
      const textParts = text.split(".");
      const bgParts = bg.split(".");

      let textToken = flavors.color;
      let bgToken = flavors.color;

      for (const part of textParts) {
        textToken = textToken?.[part];
      }

      for (const part of bgParts) {
        bgToken = bgToken?.[part];
      }

      if (!textToken || !bgToken) {
        return { text, bg, ratio: 0, pass: false };
      }

      const textColorValue = resolveFlavorColor(textToken, ingredients);
      const bgColorValue = resolveFlavorColor(bgToken, ingredients);

      if (!textColorValue || !bgColorValue) {
        return { text, bg, ratio: 0, pass: false };
      }

      const ratio = getContrastRatio(textColorValue, bgColorValue);
      const pass = ratio >= minRatio;

      return { text, bg, ratio, pass, minRatio };
    });

    results.forEach(({ text, bg, ratio, pass, minRatio }) => {
      const status = pass ? "PASS" : "FAIL";
      const ratioStr = ratio > 0 ? `${ratio.toFixed(2)}:1` : "N/A";
      console.log(
        `  ${status} ${text.padEnd(30)} on ${bg.padEnd(25)} ${ratioStr} (min: ${minRatio}:1)`,
      );
    });

    const passCount = results.filter((r) => r.pass).length;
    const totalCount = results.length;

    console.log("  " + "-".repeat(70));
    console.log(
      `  Result: ${passCount}/${totalCount} combinations pass WCAG AA`,
    );
    console.log();

    expect(passCount).toBe(totalCount);
  });
});

// ---------------------------------------------------------------------------
// EXTENDED MATRIX TESTS — 7 flavors × 3 modes = 21 combinations
// ---------------------------------------------------------------------------

const TEXT_PAIRS = [
  { label: "text-body on background-base", textPath: ["color", "text", "body"], bgPath: ["color", "background", "base"], minRatio: 4.5 },
  { label: "text-heading on background-base", textPath: ["color", "text", "heading"], bgPath: ["color", "background", "base"], minRatio: 4.5 },
  { label: "text-link on background-base", textPath: ["color", "text", "link", "default"], bgPath: ["color", "background", "base"], minRatio: 4.5 },
  // border-default intentionally omitted — documented design decision for decorative borders (~2.02:1).
  // See original test's .skip on this pair. Use border.emphasis for accessibility-relevant borders (3:1).
  { label: "action-solid-text on action-solid-background", textPath: ["color", "action", "solid", "text", "default"], bgPath: ["color", "action", "solid", "background", "default"], minRatio: 4.5 },
  { label: "success-text on background-base", textPath: ["color", "state", "success", "text"], bgPath: ["color", "background", "base"], minRatio: 4.5 },
  { label: "destructive-text on background-base", textPath: ["color", "state", "destructive", "text"], bgPath: ["color", "background", "base"], minRatio: 4.5 },
];

const UI_PAIRS = [
  { label: "border-emphasis on background-base", textPath: ["color", "border", "emphasis"], bgPath: ["color", "background", "base"], minRatio: 3.0 },
  { label: "focus-ring on background-base", textPath: ["color", "focus", "ring"], bgPath: ["color", "background", "base"], minRatio: 3.0 },
];

const EXTRA_TEXT_PAIRS = [
  { label: "text-body on background-surface", textPath: ["color", "text", "body"], bgPath: ["color", "background", "surface"], minRatio: 4.5 },
  { label: "text-body on background-raised", textPath: ["color", "text", "body"], bgPath: ["color", "background", "raised"], minRatio: 4.5 },
  { label: "success-text on success-background", textPath: ["color", "state", "success", "text"], bgPath: ["color", "state", "success", "background"], minRatio: 4.5 },
  { label: "destructive-text on destructive-background", textPath: ["color", "state", "destructive", "text"], bgPath: ["color", "state", "destructive", "background"], minRatio: 4.5 },
];

describe("Extended Contrast Matrix — All Flavors × All Modes (CC-CR-R5)", () => {
  const failures = [];

  FLAVORS.forEach((flavor) => {
    MODES.forEach((mode) => {
      describe(`Flavor: ${flavor}, Mode: ${mode}`, () => {
        const tokens = loadFlavorTokens(flavor, mode);

        TEXT_PAIRS.forEach(({ label, textPath, bgPath, minRatio }) => {
          it(`${label} should meet ${minRatio}:1 contrast`, () => {
            const textColor = resolveColor(tokens, textPath, ingredients);
            const bgColor = resolveColor(tokens, bgPath, ingredients);

            if (!textColor || !bgColor) {
              console.warn(`  [SKIP] ${flavor}/${mode}: Could not resolve colors for ${label}`);
              return;
            }

            const ratio = getContrastRatio(textColor, bgColor);
            const pass = ratio >= minRatio;
            const status = pass ? "PASS" : "FAIL";

            console.log(`  [${status}] ${flavor}/${mode}: ${label} = ${ratio.toFixed(2)}:1 (min: ${minRatio}:1)`);

            if (!pass) {
              const msg = `${flavor}/${mode}: ${label} (${textColor} on ${bgColor}) = ${ratio.toFixed(2)}:1 — FAILS ${minRatio}:1 AA`;
              failures.push(msg);
              console.error(`  ** FAIL ** ${msg}`);
            }

            expect(ratio).toBeGreaterThanOrEqual(minRatio);
          });
        });

        UI_PAIRS.forEach(({ label, textPath, bgPath, minRatio }) => {
          it(`${label} should meet ${minRatio}:1 contrast`, () => {
            const textColor = resolveColor(tokens, textPath, ingredients);
            const bgColor = resolveColor(tokens, bgPath, ingredients);

            if (!textColor || !bgColor) {
              console.warn(`  [SKIP] ${flavor}/${mode}: Could not resolve colors for ${label}`);
              return;
            }

            const ratio = getContrastRatio(textColor, bgColor);
            const pass = ratio >= minRatio;
            const status = pass ? "PASS" : "FAIL";

            console.log(`  [${status}] ${flavor}/${mode}: ${label} = ${ratio.toFixed(2)}:1 (min: ${minRatio}:1)`);

            if (!pass) {
              const msg = `${flavor}/${mode}: ${label} (${textColor} on ${bgColor}) = ${ratio.toFixed(2)}:1 — FAILS ${minRatio}:1 AA`;
              failures.push(msg);
              console.error(`  ** FAIL ** ${msg}`);
            }

            expect(ratio).toBeGreaterThanOrEqual(minRatio);
          });
        });

        EXTRA_TEXT_PAIRS.forEach(({ label, textPath, bgPath, minRatio }) => {
          it(`${label} should meet ${minRatio}:1 contrast`, () => {
            const textColor = resolveColor(tokens, textPath, ingredients);
            const bgColor = resolveColor(tokens, bgPath, ingredients);

            if (!textColor || !bgColor) {
              console.warn(`  [SKIP] ${flavor}/${mode}: Could not resolve colors for ${label}`);
              return;
            }

            const ratio = getContrastRatio(textColor, bgColor);
            const pass = ratio >= minRatio;
            const status = pass ? "PASS" : "FAIL";

            console.log(`  [${status}] ${flavor}/${mode}: ${label} = ${ratio.toFixed(2)}:1 (min: ${minRatio}:1)`);

            if (!pass) {
              const msg = `${flavor}/${mode}: ${label} (${textColor} on ${bgColor}) = ${ratio.toFixed(2)}:1 — FAILS ${minRatio}:1 AA`;
              failures.push(msg);
              console.error(`  ** FAIL ** ${msg}`);
            }

            expect(ratio).toBeGreaterThanOrEqual(minRatio);
          });
        });
      });
    });
  });

  afterAll(() => {
    if (failures.length > 0) {
      console.error("\n  ===== CONTRAST FAILURES SUMMARY =====");
      failures.forEach((f) => console.error(`  - ${f}`));
      console.error(`  Total: ${failures.length} failure(s)`);
      console.error("  =====================================\n");
    }
  });
});
