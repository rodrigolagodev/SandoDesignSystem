/**
 * TypeScript Output Validation Tests
 *
 * Tests the generated TypeScript files:
 * - Files exist
 * - Valid TypeScript/JavaScript syntax
 * - Correct exports
 * - Type definitions
 * - Token structure integrity
 */

import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const distPath = path.join(projectRoot, 'dist/sando-tokens/ts');

// Build tokens before running tests
beforeAll(() => {
  console.log('Building tokens for TypeScript output tests...');
  execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
}, 30000); // 30 second timeout for build

describe('TypeScript Output - File Structure', () => {
  it('should have dist/sando-tokens/ts directory', () => {
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
});

describe('TypeScript Output - Ingredients Layer (Primitive Values)', () => {
  const ingredientsPath = path.join(distPath, 'ingredients');

  const expectedFiles = [
    'animation.ts',
    'border.ts',
    'color.ts',
    'elevation.ts',
    'font.ts',
    'opacity.ts',
    'space.ts',
    'z-index.ts',
    'index.ts'
  ];

  expectedFiles.forEach(file => {
    it(`should have ${file}`, () => {
      const filePath = path.join(ingredientsPath, file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  describe('color.ts', () => {
    let content;

    beforeAll(() => {
      const filePath = path.join(ingredientsPath, 'color.ts');
      content = fs.readFileSync(filePath, 'utf-8');
    });

    it('should export values object', () => {
      expect(content).toMatch(/export const values = {/);
    });

    it('should have absolute color values (hex, hsl, etc)', () => {
      expect(content).toMatch(/['"]#[0-9a-fA-F]{6}['"]/); // hex colors
    });

    it('should NOT have CSS var() references', () => {
      expect(content).not.toMatch(/var\(--/);
    });

    it('should export Values type', () => {
      expect(content).toMatch(/export type Values/);
    });

    it('should have JSDoc documentation', () => {
      expect(content).toMatch(/\/\*\*/);
    });

    it('should have brand colors', () => {
      expect(content).toMatch(/brand/i);
    });
  });

  describe('z-index.ts', () => {
    let content;

    beforeAll(() => {
      const filePath = path.join(ingredientsPath, 'z-index.ts');
      content = fs.readFileSync(filePath, 'utf-8');
    });

    it('should export values object', () => {
      expect(content).toMatch(/export const values = {/);
    });

    it('should have integer values', () => {
      expect(content).toMatch(/-?\d+/);
    });

    it('should NOT have CSS var() references', () => {
      expect(content).not.toMatch(/var\(--/);
    });
  });

  describe('index.ts', () => {
    let content;

    beforeAll(() => {
      const filePath = path.join(ingredientsPath, 'index.ts');
      content = fs.readFileSync(filePath, 'utf-8');
    });

    it('should re-export all category values', () => {
      expect(content).toMatch(/export \{ values as \w+ \}/);
    });

    it('should export types', () => {
      expect(content).toMatch(/export type \{ Tokens as \w+Tokens \}/);
    });

    it('should have JSDoc header', () => {
      expect(content).toMatch(/\/\*\*[\s\S]*Ingredients[\s\S]*\*\//);
    });

    it('should have @generated tag', () => {
      expect(content).toMatch(/@generated/);
    });
  });
});

describe('TypeScript Output - Flavors Layer (CSS Variable Names)', () => {
  const flavorsPath = path.join(distPath, 'flavors');

  it('should have original.ts', () => {
    const filePath = path.join(flavorsPath, 'original.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have index.ts', () => {
    const filePath = path.join(flavorsPath, 'index.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  describe('original.ts', () => {
    let content;

    beforeAll(() => {
      const filePath = path.join(flavorsPath, 'original.ts');
      content = fs.readFileSync(filePath, 'utf-8');
    });

    it('should export tokens object', () => {
      expect(content).toMatch(/export const tokens = {/);
    });

    it('should have CSS custom property names as strings', () => {
      expect(content).toMatch(/['"]--sando-/);
    });

    it('should NOT have absolute values', () => {
      expect(content).not.toMatch(/['"]#[0-9a-fA-F]{6}['"]/);
      expect(content).not.toMatch(/hsl\(/);
    });

    it('should export Tokens type', () => {
      expect(content).toMatch(/export type Tokens/);
    });

    it('should have semantic color tokens', () => {
      expect(content).toMatch(/background|text|border/i);
    });
  });

  describe('index.ts', () => {
    let content;

    beforeAll(() => {
      const filePath = path.join(flavorsPath, 'index.ts');
      content = fs.readFileSync(filePath, 'utf-8');
    });

    it('should re-export tokens from original', () => {
      expect(content).toMatch(/export \{ tokens as original \}/);
    });

    it('should export type', () => {
      expect(content).toMatch(/export type \{ Tokens as OriginalTokens \}/);
    });
  });
});

describe('TypeScript Output - Recipes Layer (CSS Variable Names)', () => {
  const recipesPath = path.join(distPath, 'recipes');

  it('should have button.ts', () => {
    const filePath = path.join(recipesPath, 'button.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have index.ts', () => {
    const filePath = path.join(recipesPath, 'index.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  describe('button.ts', () => {
    let content;

    beforeAll(() => {
      const filePath = path.join(recipesPath, 'button.ts');
      content = fs.readFileSync(filePath, 'utf-8');
    });

    it('should export tokens object', () => {
      expect(content).toMatch(/export const tokens = {/);
    });

    it('should have CSS custom property names', () => {
      expect(content).toMatch(/['"]--sando-/);
    });

    it('should NOT reference ingredients layer directly', () => {
      expect(content).not.toMatch(/--sando-color-brand-/);
      expect(content).not.toMatch(/--sando-space-\d+/);
    });

    it('should reference flavors layer', () => {
      expect(content).toMatch(/--sando-color-(action|background|text|border|state)/);
    });

    it('should export Tokens type', () => {
      expect(content).toMatch(/export type Tokens/);
    });

    it('should export TokenValue type', () => {
      expect(content).toMatch(/export type TokenValue/);
    });

    it('should have as const assertion', () => {
      expect(content).toMatch(/\} as const;/);
    });

    it('should have button variants (solid, outline, ghost)', () => {
      expect(content).toMatch(/solid/);
      expect(content).toMatch(/outline/);
      expect(content).toMatch(/ghost/);
    });

    it('should have button states (default, hover, active, disabled)', () => {
      expect(content).toMatch(/default/);
      expect(content).toMatch(/hover/);
      expect(content).toMatch(/active/);
      expect(content).toMatch(/disabled/);
    });

    it('should have button sizes (sm, md, lg)', () => {
      expect(content).toMatch(/sm/);
      expect(content).toMatch(/md/);
      expect(content).toMatch(/lg/);
    });

    it('should have JSDoc with usage example', () => {
      expect(content).toMatch(/@example/);
      expect(content).toMatch(/import.*tokens.*from/);
    });
  });

  describe('index.ts', () => {
    let content;

    beforeAll(() => {
      const filePath = path.join(recipesPath, 'index.ts');
      content = fs.readFileSync(filePath, 'utf-8');
    });

    it('should re-export tokens from button', () => {
      expect(content).toMatch(/export \{ tokens as button \}/);
    });

    it('should export type', () => {
      expect(content).toMatch(/export type \{ Tokens as ButtonTokens \}/);
    });

    it('should have JSDoc header', () => {
      expect(content).toMatch(/\/\*\*[\s\S]*Recipes[\s\S]*\*\//);
    });
  });
});

describe('TypeScript Output - Token Count Metadata', () => {
  it('ingredients index should report token categories', () => {
    const filePath = path.join(distPath, 'ingredients/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/@categories \d+ categories available/);
  });

  it('recipes index should report token categories', () => {
    const filePath = path.join(distPath, 'recipes/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/@categories \d+ categories available/);
  });

  it('button.ts should report token count', () => {
    const filePath = path.join(distPath, 'recipes/button.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/@tokens \d+ tokens available/);
  });
});

describe('TypeScript Output - Syntax Validation', () => {
  it('all .ts files should be valid JavaScript (ES modules)', () => {
    const allFiles = [
      ...fs.readdirSync(path.join(distPath, 'ingredients')).map(f => path.join(distPath, 'ingredients', f)),
      ...fs.readdirSync(path.join(distPath, 'flavors')).map(f => path.join(distPath, 'flavors', f)),
      ...fs.readdirSync(path.join(distPath, 'recipes')).map(f => path.join(distPath, 'recipes', f))
    ].filter(f => f.endsWith('.ts'));

    allFiles.forEach(filePath => {
      expect(() => {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Basic syntax checks
        expect(content).not.toMatch(/undefined/); // No undefined values
        expect(content).not.toMatch(/\[object Object\]/); // No object stringification errors

        // Valid exports
        const hasExport = content.match(/export (const|type|{)/);
        expect(hasExport).toBeTruthy();
      }).not.toThrow();
    });
  });

  it('all exported objects should be properly closed', () => {
    const buttonPath = path.join(distPath, 'recipes/button.ts');
    const content = fs.readFileSync(buttonPath, 'utf-8');

    // Count opening and closing braces
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;

    expect(openBraces).toBe(closeBraces);
  });
});
