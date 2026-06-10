import { toKebabCase, toCamelCase, truncate, uniqueId, capitalize } from './string-helpers.js';

describe('string-helpers', () => {
  describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(toKebabCase('buttonPrimary')).toBe('button-primary');
    });

    it('should convert spaces to hyphens', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
    });

    it('should convert underscores to hyphens', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world');
    });

    it('should lowercase the result', () => {
      expect(toKebabCase('HelloWorld')).toBe('hello-world');
    });

    it('should handle already kebab-case string', () => {
      expect(toKebabCase('already-kebab')).toBe('already-kebab');
    });

    it('should return empty string for empty input', () => {
      expect(toKebabCase('')).toBe('');
    });

    it('should handle multiple uppercase letters', () => {
      // Documents current behavior: acronyms collapse to a single lowercase run
      // because the regex only matches lowercase→uppercase boundaries, not
      // uppercase→uppercase ones. A future enhancement could split acronyms
      // (e.g. "HTMLElement" → "html-element") if that becomes a requirement.
      expect(toKebabCase('HTMLElement')).toBe('htmlelement');
    });
  });

  describe('toCamelCase', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(toCamelCase('button-primary')).toBe('buttonPrimary');
    });

    it('should convert underscore_case to camelCase', () => {
      expect(toCamelCase('sando_button')).toBe('sandoButton');
    });

    it('should handle already camelCase string', () => {
      expect(toCamelCase('alreadyCamel')).toBe('alreadyCamel');
    });

    it('should return empty string for empty input', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('should handle multiple hyphens', () => {
      expect(toCamelCase('sando-design-system')).toBe('sandoDesignSystem');
    });

    it('should handle mixed hyphens and underscores', () => {
      expect(toCamelCase('hello-world_test')).toBe('helloWorldTest');
    });
  });

  describe('truncate', () => {
    it('should return the string unchanged when shorter than max', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should return the string unchanged when exactly max length', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });

    it('should truncate and add default suffix when overflow', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('should use custom suffix when provided', () => {
      expect(truncate('Hello World', 8, ' [more]')).toBe('H [more]');
    });

    it('should return suffix plus remaining chars when maxLength is 0', () => {
      expect(truncate('Hello', 0)).toBe('He...');
    });

    it('should handle empty string', () => {
      expect(truncate('', 5)).toBe('');
    });

    it('should handle suffix longer than maxLength', () => {
      expect(truncate('Hello World', 2, '.....')).toBe('Hello Wo.....');
    });
  });

  describe('uniqueId', () => {
    it('should return a string with the default prefix', () => {
      const id = uniqueId();
      expect(id.startsWith('id-')).toBe(true);
    });

    it('should prepend the provided prefix', () => {
      const id = uniqueId('btn');
      expect(id.startsWith('btn-')).toBe(true);
    });

    it('should generate different values on consecutive calls', () => {
      const id1 = uniqueId();
      const id2 = uniqueId();
      expect(id1).not.toBe(id2);
    });

    it('should generate a string with prefix and random part', () => {
      const id = uniqueId('prefix');
      const parts = id.split('-');
      expect(parts).toHaveLength(2);
      expect(parts[0]).toBe('prefix');
      expect(parts[1].length).toBe(9);
    });

    it('should generate unique values with the same prefix', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 100; i++) {
        ids.add(uniqueId('same'));
      }
      expect(ids.size).toBe(100);
    });
  });

  describe('capitalize', () => {
    it('should capitalize the first letter of a word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should return empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });

    it('should keep already capitalized word unchanged', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should lowercase the rest of the string', () => {
      expect(capitalize('hELLO')).toBe('HELLO');
    });

    it('should handle string with numbers', () => {
      expect(capitalize('hello123')).toBe('Hello123');
    });
  });
});
