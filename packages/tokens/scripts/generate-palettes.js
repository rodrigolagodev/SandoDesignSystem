#!/usr/bin/env node

/**
 * Generate All Color Palettes
 *
 * Generates all 8 curated color palettes (6 brand + 3 neutrals) using OKLCH
 * and outputs them as Style Dictionary-compatible JSON files.
 *
 * Usage:
 *   node scripts/generate-palettes.js
 *   pnpm generate:palettes
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  generatePalette,
  generateNeutralPalette,
  validatePaletteContrast,
  CURATED_PALETTES,
  NEUTRAL_PALETTES,
} from "./generators/palette-generator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INGREDIENTS_DIR = path.join(__dirname, "..", "src", "ingredients");

/**
 * Converts generated palette to Style Dictionary JSON format
 */
function convertToStyleDictionary(paletteData) {
  const { name, palette } = paletteData;

  const json = {
    color: {
      [name]: {},
    },
  };

  Object.entries(palette).forEach(([step, data]) => {
    json.color[name][step] = {
      value: data.value,
      type: "color",
      description: `${name} ${step} | OKLCH(${data.oklch.l}, ${data.oklch.c}, ${data.oklch.h || "none"})`,
    };
  });

  return json;
}

/**
 * Saves palette to JSON file
 */
function savePalette(paletteData, filepath) {
  const json = convertToStyleDictionary(paletteData);
  const content = JSON.stringify(json, null, 2);

  fs.writeFileSync(filepath, content, "utf-8");
  console.log(`  ✓ Saved: ${path.basename(filepath)}`);

  return filepath;
}

/**
 * Main execution
 */
async function main() {
  console.log("🎨 Generating Sando Color Palettes\n");
  console.log(
    "Using OKLCH color space for perceptual uniformity and accessibility\n",
  );

  // Ensure ingredients directory exists
  if (!fs.existsSync(INGREDIENTS_DIR)) {
    fs.mkdirSync(INGREDIENTS_DIR, { recursive: true });
  }

  const generatedFiles = [];
  const validationResults = {};

  // Generate brand palettes
  console.log("📦 Generating Brand Palettes (6):\n");

  for (const [key, config] of Object.entries(CURATED_PALETTES)) {
    console.log(`  Generating ${key}...`);

    const paletteData = generatePalette(config);
    const filepath = path.join(INGREDIENTS_DIR, `color-${key}.json`);

    savePalette(paletteData, filepath);
    generatedFiles.push(filepath);

    // Validate WCAG contrast
    const validation = validatePaletteContrast(paletteData.palette);
    validationResults[key] = validation;

    if (validation.valid) {
      console.log(`  ✓ WCAG AA validation passed\n`);
    } else {
      console.log(`  ⚠️  WCAG warnings:`);
      validation.failures.forEach((failure) => {
        console.log(`     - ${failure}`);
      });
      console.log("");
    }
  }

  // Generate neutral palettes
  console.log("📦 Generating Neutral Palettes (3):\n");

  for (const [key, config] of Object.entries(NEUTRAL_PALETTES)) {
    console.log(`  Generating ${key}...`);

    const paletteData = generateNeutralPalette(config);
    const filepath = path.join(INGREDIENTS_DIR, `color-${key}.json`);

    savePalette(paletteData, filepath);
    generatedFiles.push(filepath);

    // Validate WCAG contrast
    const validation = validatePaletteContrast(paletteData.palette);
    validationResults[key] = validation;

    if (validation.valid) {
      console.log(`  ✓ WCAG AA validation passed\n`);
    } else {
      console.log(`  ⚠️  WCAG warnings:`);
      validation.failures.forEach((failure) => {
        console.log(`     - ${failure}`);
      });
      console.log("");
    }
  }

  // Summary
  console.log("═══════════════════════════════════════════════════════════\n");
  console.log("✨ Generation Complete!\n");
  console.log(`Generated ${generatedFiles.length} palette files:\n`);

  generatedFiles.forEach((file) => {
    console.log(`  • ${path.relative(process.cwd(), file)}`);
  });

  console.log("\n📊 WCAG AA Validation Summary:\n");

  const allValid = Object.values(validationResults).every((r) => r.valid);

  Object.entries(validationResults).forEach(([name, result]) => {
    const status = result.valid ? "✅" : "⚠️";
    const tests = result.tests.length;
    const failures = result.failures.length;
    console.log(
      `  ${status} ${name.padEnd(15)} ${tests - failures}/${tests} tests passed`,
    );
  });

  if (allValid) {
    console.log("\n🎉 All palettes pass WCAG AA contrast requirements!\n");
  } else {
    console.log(
      "\n⚠️  Some palettes have WCAG warnings. Review failures above.\n",
    );
  }

  console.log("═══════════════════════════════════════════════════════════\n");
  console.log("Next steps:\n");
  console.log("  1. Review generated files in src/ingredients/");
  console.log("  2. Update src/ingredients/color.json to consolidate palettes");
  console.log("  3. Run: pnpm tokens:build");
  console.log("  4. Create new flavors using these palettes\n");
}

// Execute
main().catch((error) => {
  console.error("❌ Error generating palettes:", error);
  process.exit(1);
});
