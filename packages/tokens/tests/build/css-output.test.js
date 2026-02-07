/**
 * CSS Output Validation Tests
 *
 * Tests the generated CSS files:
 * - Files exist
 * - Valid CSS syntax
 * - Correct selectors
 * - Proper variable naming
 * - Reference preservation
 */

import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const distPath = path.join(projectRoot, 'dist/sando-tokens/css');

// Build tokens before running tests
beforeAll(() => {
  console.log('Building tokens for CSS output tests...');
  execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
}, 30000); // 30 second timeout for build

describe('CSS Output - File Structure', () => {
  it('should have dist directory', () => {
    expect(fs.existsSync(distPath)).toBe(true);
  });

  it('should have ingredients directory', () => {
    const ingredientsPath = path.join(distPath, 'ingredients');
    expect(fs.existsSync(ingredientsPath)).toBe(true);
  });

  it('should have flavors directory', () => {
    const flavorsPath = path.join(distPath, 'flavors');
    expect(fs.existsSync(flavorsPath)).toBe(true);
  });

  it('should have recipes directory', () => {
    const recipesPath = path.join(distPath, 'recipes');
    expect(fs.existsSync(recipesPath)).toBe(true);
  });

  describe('Ingredients Files', () => {
    const expectedFiles = [
      'animation.css',
      'border.css',
      'color.css',
      'elevation.css',
      'font.css',
      'opacity.css',
      'space.css',
      'z-index.css'
    ];

    expectedFiles.forEach(file => {
      it(`should have ${file}`, () => {
        const filePath = path.join(distPath, 'ingredients', file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });
  });

  describe('Flavors Files', () => {
    it('should have original/flavor.css (default theme)', () => {
      const filePath = path.join(distPath, 'flavors/original/flavor.css');
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  describe('Recipes Files', () => {
    it('should have button.css', () => {
      const filePath = path.join(distPath, 'recipes/button.css');
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });
});

describe('CSS Output - Ingredients Layer', () => {
  const ingredientsPath = path.join(distPath, 'ingredients');

  const testCSSFile = (fileName, customTests) => {
    describe(fileName, () => {
      let content;

      beforeAll(() => {
        const filePath = path.join(ingredientsPath, fileName);
        content = fs.readFileSync(filePath, 'utf8');
      });

      it('should have DO NOT EDIT warning', () => {
        expect(content).toMatch(/DO NOT EDIT MANUALLY/);
      });

      it('should have generation timestamp', () => {
        expect(content).toMatch(/Generated on/);
      });

      it('should use :root selector', () => {
        expect(content).toMatch(/:root\s*\{/);
      });

      it('should have closing brace', () => {
        expect(content).toMatch(/\}\s*$/);
      });

      it('should have --sando- prefixed variables', () => {
        expect(content).toMatch(/--sando-/);
      });

      it('should NOT have var() references (literals only)', () => {
        // Extract content inside :root { ... }
        const match = content.match(/:root\s*\{([^}]+)\}/s);
        if (match) {
          const variables = match[1];
          expect(variables).not.toMatch(/var\(/);
        }
      });

      // Run custom tests - they will have access to content through closure
      if (customTests) {
        customTests(() => content);
      }
    });
  };

  testCSSFile('color.css', (getContent) => {
    it('should have brand colors', () => {
      const content = getContent();
      // Primary brand color is orange in the design system
      expect(content).toMatch(/--sando-color-orange-/);
    });

    it('should use HSL format', () => {
      const content = getContent();
      expect(content).toMatch(/hsl\(/);
    });
  });

  testCSSFile('space.css', (getContent) => {
    it('should use rem units', () => {
      const content = getContent();
      expect(content).toMatch(/rem/);
    });
  });

  testCSSFile('animation.css', (getContent) => {
    it('should have duration values in ms', () => {
      const content = getContent();
      expect(content).toMatch(/\d+ms/);
    });

    it('should have easing functions', () => {
      const content = getContent();
      expect(content).toMatch(/cubic-bezier/);
    });
  });

  testCSSFile('opacity.css', (getContent) => {
    it('should have decimal values', () => {
      const content = getContent();
      expect(content).toMatch(/0\.\d+/);
    });
  });

  testCSSFile('z-index.css', (getContent) => {
    it('should have integer values', () => {
      const content = getContent();
      expect(content).toMatch(/--sando-z-index-\w+:\s*-?\d+;/);
    });
  });
});

describe('CSS Output - Flavors Layer', () => {
  let content;

  beforeAll(() => {
    const filePath = path.join(distPath, 'flavors/original/flavor.css');
    content = fs.readFileSync(filePath, 'utf8');
  });

  it('should include :root in selector (default theme)', () => {
    // Flavor files use complex selectors including :root
    expect(content).toMatch(/:root/);
  });

  it('should have DO NOT EDIT warning', () => {
    expect(content).toMatch(/DO NOT EDIT MANUALLY/);
  });

  it('should have var() references to Ingredients', () => {
    expect(content).toMatch(/var\(--sando-/);
  });

  it('should NOT have literal HSL values (should reference Ingredients)', () => {
    // Extract content inside :root { ... }
    const match = content.match(/:root\s*\{([^}]+)\}/s);
    if (match) {
      const variables = match[1];
      // Check that we don't have direct HSL values, only var() references
      const hasDirectHSL = /:\s*hsl\(/.test(variables);
      expect(hasDirectHSL).toBe(false);
    }
  });

  it('should have semantic color tokens', () => {
    expect(content).toMatch(/--sando-color-background-/);
    expect(content).toMatch(/--sando-color-text-/);
    expect(content).toMatch(/--sando-color-action-/);
  });

  it('should have proper CSS comments for organization', () => {
    expect(content).toMatch(/\/\* \w+ \*\//);
  });
});

describe('CSS Output - Recipes Layer', () => {
  let content;

  beforeAll(() => {
    const filePath = path.join(distPath, 'recipes/button.css');
    content = fs.readFileSync(filePath, 'utf8');
  });

  it('should use :root selector', () => {
    expect(content).toMatch(/:root\s*\{/);
  });

  it('should have DO NOT EDIT warning', () => {
    expect(content).toMatch(/DO NOT EDIT MANUALLY/);
  });

  it('should have var() references to Flavors', () => {
    expect(content).toMatch(/var\(--sando-/);
  });

  it('should have button component tokens', () => {
    expect(content).toMatch(/--sando-button-/);
  });

  it('should have variant tokens (solid, outline, ghost)', () => {
    expect(content).toMatch(/--sando-button-solid-/);
    expect(content).toMatch(/--sando-button-outline-/);
    expect(content).toMatch(/--sando-button-ghost-/);
  });

  it('should have state tokens (default, hover, active, disabled)', () => {
    expect(content).toMatch(/-default/);
    expect(content).toMatch(/-hover/);
    expect(content).toMatch(/-active/);
    expect(content).toMatch(/-disabled/);
  });

  it('should have size tokens (sm, md, lg)', () => {
    expect(content).toMatch(/--sando-button-size-sm-/);
    expect(content).toMatch(/--sando-button-size-md-/);
    expect(content).toMatch(/--sando-button-size-lg-/);
  });

  it('should primarily use var() references (some literal values allowed)', () => {
    // Extract content inside :root { ... }
    const match = content.match(/:root\s*\{([^}]+)\}/s);
    if (match) {
      const variables = match[1];
      // Most values should be var() references
      const varReferences = (variables.match(/var\(--sando-/g) || []).length;
      // Some literal values are intentionally allowed for specific use cases
      // (e.g., boxSize, maxHeight for checkboxes, dropdowns, etc.)
      // The token-references.test.js validates proper layering
      expect(varReferences).toBeGreaterThan(10); // Ensure there are many var() references
    }
  });
});

describe('CSS Output - Variable Naming', () => {
  it('all variables should start with --sando-', () => {
    // Recursively collect all CSS files
    function collectCssFiles(dir, prefix = '') {
      const files = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

        if (entry.isDirectory()) {
          files.push(...collectCssFiles(fullPath, relativePath));
        } else if (entry.name.endsWith('.css')) {
          files.push(relativePath);
        }
      }

      return files;
    }

    const allFiles = [
      ...collectCssFiles(path.join(distPath, 'ingredients'), 'ingredients'),
      ...collectCssFiles(path.join(distPath, 'flavors'), 'flavors'),
      ...collectCssFiles(path.join(distPath, 'recipes'), 'recipes')
    ];

    allFiles.forEach(file => {
      const content = fs.readFileSync(path.join(distPath, file), 'utf8');
      const variablePattern = /--[\w-]+:/g;
      const matches = content.match(variablePattern);

      if (matches) {
        matches.forEach(match => {
          expect(match).toMatch(/^--sando-/);
        });
      }
    });
  });

  it('variables should use kebab-case', () => {
    const content = fs.readFileSync(path.join(distPath, 'ingredients/color.css'), 'utf8');
    const variablePattern = /--sando-[a-z0-9-]+:/g;
    const matches = content.match(variablePattern);

    if (matches) {
      matches.forEach(match => {
        // Should not have uppercase or underscores
        expect(match).not.toMatch(/[A-Z_]/);
      });
    }
  });
});

describe('CSS Output - Reference Chain Integrity', () => {
  it('should have valid reference chain: Recipes → Flavors → Ingredients', () => {
    const recipesContent = fs.readFileSync(path.join(distPath, 'recipes/button.css'), 'utf8');
    const flavorsContent = fs.readFileSync(path.join(distPath, 'flavors/original/flavor.css'), 'utf8');
    const ingredientsColor = fs.readFileSync(path.join(distPath, 'ingredients/color.css'), 'utf8');

    // Example: trace button-solid-backgroundColor-default
    // Recipe: --sando-button-solid-backgroundColor-default: var(--sando-color-action-solid-background-default);
    expect(recipesContent).toMatch(/--sando-button-solid-backgroundColor-default:\s*var\(--sando-color-action-solid-background-default\)/);

    // Flavor: --sando-color-action-solid-background-default: var(--sando-color-orange-700);
    expect(flavorsContent).toMatch(/--sando-color-action-solid-background-default:\s*var\(--sando-color-orange-700\)/);

    // Ingredient: --sando-color-orange-700: hsl(...);
    expect(ingredientsColor).toMatch(/--sando-color-orange-700:\s*hsl\(/);
  });
});

describe('CSS Output - File Sizes', () => {
  // Note: These thresholds are guidelines, not strict limits.
  // The project has 5 flavors (original, strawberry, tonkatsu, egg-salad, kiwi),
  // each with 5 mode variants (light, dark, high-contrast, forced-colors, motion-reduce)
  // Plus ingredients and recipes for all components.
  // Total size is expected to grow as new components and flavors are added.

  it('should have reasonable file sizes', () => {
    const maxSizes = {
      'ingredients/color.css': 10000, // ~10KB (includes all color palettes)
      'ingredients/font.css': 3000,   // ~3KB
      'flavors/original/flavor.css': 10000, // ~10KB per flavor
      'recipes/button.css': 40000     // ~40KB (button is the largest recipe)
    };

    Object.entries(maxSizes).forEach(([file, maxSize]) => {
      const filePath = path.join(distPath, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeLessThan(maxSize);
      }
    });
  });

  it('should report total bundle size', () => {
    let totalSize = 0;

    const countDirSize = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          countDirSize(filePath);
        } else {
          totalSize += stats.size;
        }
      });
    };

    countDirSize(distPath);

    console.log(`\n📦 Total CSS bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
    expect(totalSize).toBeLessThan(700000); // Less than 700KB total (multiple flavors with all variants)
  });
});
