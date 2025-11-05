#!/usr/bin/env node

/**
 * Consolidate Color Palettes
 *
 * Merges all individual color palette files into a single color.json file
 * while preserving state and utility colors.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INGREDIENTS_DIR = path.join(__dirname, "..", "src", "ingredients");

// Palette files to consolidate
const PALETTE_FILES = [
  "color-orange.json",
  "color-blue.json",
  "color-green.json",
  "color-red.json",
  "color-purple.json",
  "color-pink.json",
  "color-neutral.json",
  "color-neutral-warm.json",
  "color-neutral-cool.json",
];

console.log("🔗 Consolidating Color Palettes\n");

// Read the current color.json to preserve state and utility
const colorJsonPath = path.join(INGREDIENTS_DIR, "color.json");
let baseColors = { color: {} };

if (fs.existsSync(colorJsonPath)) {
  console.log("📖 Reading existing color.json...");
  const content = fs.readFileSync(colorJsonPath, "utf-8");
  baseColors = JSON.parse(content);
  console.log("  ✓ Preserved state and utility colors\n");
} else {
  console.log("⚠️  No existing color.json found, creating new file\n");
}

// Start with a fresh color object but preserve state and utility
const consolidatedColors = {
  color: {
    // Keep state and utility from existing file
    ...(baseColors.color.state && { state: baseColors.color.state }),
    ...(baseColors.color.utility && { utility: baseColors.color.utility }),
  },
};

console.log("📦 Merging palette files:\n");

// Read and merge each palette file
PALETTE_FILES.forEach((filename) => {
  const filepath = path.join(INGREDIENTS_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`  • ${filename}`);
    const content = fs.readFileSync(filepath, "utf-8");
    const paletteData = JSON.parse(content);

    // Merge the color data
    Object.assign(consolidatedColors.color, paletteData.color);
  } else {
    console.log(`  ⚠️  ${filename} not found, skipping`);
  }
});

console.log("\n✍️  Writing consolidated color.json...");

// Write the consolidated file with proper formatting
const output = JSON.stringify(consolidatedColors, null, 2);
fs.writeFileSync(colorJsonPath, output, "utf-8");

console.log("  ✓ Saved to src/ingredients/color.json\n");

// Show summary
const paletteCount = Object.keys(consolidatedColors.color).length;
const paletteNames = Object.keys(consolidatedColors.color);

console.log("═══════════════════════════════════════════════════════════\n");
console.log("✨ Consolidation Complete!\n");
console.log(`Total color categories: ${paletteCount}\n`);
console.log("Palettes included:");
paletteNames.forEach((name) => {
  const category = consolidatedColors.color[name];
  const stepCount = Object.keys(category).length;
  console.log(
    `  • ${name.padEnd(15)} (${stepCount} ${stepCount === 11 ? "steps" : "variants"})`,
  );
});

console.log("\n═══════════════════════════════════════════════════════════\n");
console.log("Next steps:\n");
console.log("  1. Review consolidated color.json");
console.log("  2. Delete individual color-*.json files (optional)");
console.log("  3. Run: pnpm tokens:build");
console.log("  4. Create new flavors using these palettes\n");
