import { describe, it, expect } from 'vitest';
import { match, resolveColor } from '../src/utilities/colors.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Color Utilities', () => {
  describe('resolveColor', () => {
    it('should resolve named colors', () => {
      expect(resolveColor('white', config)).toBe('#ffffff');
      expect(resolveColor('black', config)).toBe('#000000');
      expect(resolveColor('transparent', config)).toBe('transparent');
    });

    it('should resolve palette shades', () => {
      expect(resolveColor('red-500', config)).toBe('#ef4444');
      expect(resolveColor('blue-700', config)).toBe('#1d4ed8');
      expect(resolveColor('green-300', config)).toBe('#86efac');
    });

    it('should resolve arbitrary colors', () => {
      expect(resolveColor('[#ff6600]', config)).toBe('#ff6600');
      expect(resolveColor('[rgb(255,0,0)]', config)).toBe('rgb(255,0,0)');
    });

    it('should return null for unknown colors', () => {
      expect(resolveColor('nonexistent-999', config)).toBeNull();
    });
  });

  describe('match', () => {
    it('should match bg-{color}', () => {
      expect(match({ utility: 'bg', value: 'red-500' }, config)).toEqual([{ property: 'backgroundColor', value: '#ef4444' }]);
      expect(match({ utility: 'bg', value: 'white' }, config)).toEqual([{ property: 'backgroundColor', value: '#ffffff' }]);
    });

    it('should match text-{color}', () => {
      expect(match({ utility: 'text', value: 'blue-700' }, config)).toEqual([{ property: 'color', value: '#1d4ed8' }]);
    });

    it('should return null for non-color values in text utility', () => {
      // 'center' is not a color, should return null from colors module
      expect(match({ utility: 'text', value: 'center' }, config)).toBeNull();
    });
  });
});
