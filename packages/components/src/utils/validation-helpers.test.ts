import {
  isEmpty,
  isValidEmail,
  isValidUrl,
  isInRange,
  clamp,
  isOneOf
} from './validation-helpers.js';

describe('validation-helpers', () => {
  describe('isEmpty', () => {
    it('should return true for null', () => {
      expect(isEmpty(null)).toBe(true);
    });

    it('should return true for undefined', () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('should return true for whitespace-only string', () => {
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('\t\n  ')).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('should return true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should return false for non-empty string', () => {
      expect(isEmpty('hello')).toBe(false);
    });

    it('should return false for non-empty array', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('should return false for non-empty object', () => {
      expect(isEmpty({ key: 'value' })).toBe(false);
    });

    it('should return false for number', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(42)).toBe(false);
    });

    it('should return false for boolean', () => {
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty(true)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should return true for simple valid email', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
    });

    it('should return true for email with subdomain', () => {
      expect(isValidEmail('user@sub.example.com')).toBe(true);
    });

    it('should return true for email with plus sign', () => {
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should return true for email with dots in local part', () => {
      expect(isValidEmail('first.last@example.com')).toBe(true);
    });

    it('should return false when missing @', () => {
      expect(isValidEmail('userexample.com')).toBe(false);
    });

    it('should return false when missing domain', () => {
      expect(isValidEmail('user@')).toBe(false);
    });

    it('should return false when missing TLD', () => {
      expect(isValidEmail('user@example')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isValidEmail('')).toBe(false);
    });

    it('should return false for string with spaces', () => {
      expect(isValidEmail('user @example.com')).toBe(false);
    });

    it('should return false for multiple @ signs', () => {
      expect(isValidEmail('user@domain@example.com')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid http URL', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
    });

    it('should return true for valid https URL', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
    });

    it('should return true for URL with path', () => {
      expect(isValidUrl('https://example.com/path/to/page')).toBe(true);
    });

    it('should return true for URL with query params', () => {
      expect(isValidUrl('https://example.com?q=test&page=1')).toBe(true);
    });

    it('should accept any valid URL protocol (ftp, etc.)', () => {
      // isValidUrl relies on the URL constructor, which accepts any
      // well-formed URI. Restrict to http/https in the implementation if
      // stricter validation is needed for a specific use case.
      expect(isValidUrl('ftp://example.com')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(isValidUrl('')).toBe(false);
    });

    it('should return false for malformed string', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
    });

    it('should return false for random text', () => {
      expect(isValidUrl('hello world')).toBe(false);
    });
  });

  describe('isInRange', () => {
    it('should return true when value is within range', () => {
      expect(isInRange(5, 0, 10)).toBe(true);
    });

    it('should return false when value is below min', () => {
      expect(isInRange(-1, 0, 10)).toBe(false);
    });

    it('should return false when value is above max', () => {
      expect(isInRange(11, 0, 10)).toBe(false);
    });

    it('should return true at exact minimum boundary', () => {
      expect(isInRange(0, 0, 10)).toBe(true);
    });

    it('should return true at exact maximum boundary', () => {
      expect(isInRange(10, 0, 10)).toBe(true);
    });

    it('should handle decimal values', () => {
      expect(isInRange(5.5, 0, 10)).toBe(true);
    });

    it('should handle negative ranges', () => {
      expect(isInRange(-5, -10, 0)).toBe(true);
      expect(isInRange(-11, -10, 0)).toBe(false);
    });
  });

  describe('clamp', () => {
    it('should return min when value is below min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should return max when value is above max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should return value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should return exact min when value equals min', () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    it('should return exact max when value equals max', () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });

    it('should handle min > max edge case', () => {
      expect(clamp(5, 10, 0)).toBe(0);
    });

    it('should handle negative values', () => {
      expect(clamp(-10, -5, 0)).toBe(-5);
      expect(clamp(-3, -5, 0)).toBe(-3);
    });

    it('should handle decimal values', () => {
      expect(clamp(5.5, 0, 10)).toBe(5.5);
      expect(clamp(-1.5, 0, 10)).toBe(0);
    });
  });

  describe('isOneOf', () => {
    it('should return true when value is in allowed list', () => {
      expect(isOneOf('a', ['a', 'b', 'c'])).toBe(true);
    });

    it('should return false when value is not in allowed list', () => {
      expect(isOneOf('d', ['a', 'b', 'c'])).toBe(false);
    });

    it('should return false for empty allowed list', () => {
      expect(isOneOf('a', [])).toBe(false);
    });

    it('should work with numbers', () => {
      expect(isOneOf(2, [1, 2, 3])).toBe(true);
      expect(isOneOf(4, [1, 2, 3])).toBe(false);
    });

    it('should work with mixed types', () => {
      expect(isOneOf(1, [1, 'two', true])).toBe(true);
    });

    it('should return false for undefined when not in list', () => {
      expect(isOneOf(undefined, [null, 'a'])).toBe(false);
    });
  });
});
