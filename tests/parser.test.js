import { describe, it, expect, beforeEach } from 'vitest';
import { parseClassName, extractChaiClasses } from '../src/core/parser.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Parser', () => {
  describe('parseClassName', () => {
    it('should return null for non-chai classes', () => {
      expect(parseClassName('bg-red', config)).toBeNull();
      expect(parseClassName('tw-p-4', config)).toBeNull();
      expect(parseClassName('', config)).toBeNull();
    });

    it('should parse simple utility classes', () => {
      const result = parseClassName('head-p-4', config);
      expect(result).toBeTruthy();
      expect(result.utility).toBe('p');
      expect(result.value).toBe('4');
      expect(result.responsive).toBeNull();
      expect(result.pseudo).toBeNull();
    });

    it('should parse standalone utilities', () => {
      const result = parseClassName('head-flex', config);
      expect(result).toBeTruthy();
      expect(result.utility).toBe('flex');
      expect(result.value).toBeNull();
    });

    it('should parse responsive variants', () => {
      const result = parseClassName('head-sm:p-4', config);
      expect(result).toBeTruthy();
      expect(result.responsive).toBe('sm');
      expect(result.utility).toBe('p');
      expect(result.value).toBe('4');
    });

    it('should parse pseudo variants', () => {
      const result = parseClassName('head-hover:bg-red-500', config);
      expect(result).toBeTruthy();
      expect(result.pseudo).toBe('hover');
      expect(result.utility).toBe('bg');
      expect(result.value).toBe('red-500');
    });

    it('should parse combined responsive + pseudo variants', () => {
      const result = parseClassName('head-md:hover:text-blue-700', config);
      expect(result).toBeTruthy();
      expect(result.responsive).toBe('md');
      expect(result.pseudo).toBe('hover');
      expect(result.utility).toBe('text');
      expect(result.value).toBe('blue-700');
    });

    it('should parse arbitrary values', () => {
      const result = parseClassName('head-w-[300px]', config);
      expect(result).toBeTruthy();
      expect(result.utility).toBe('w');
      expect(result.value).toBe('[300px]');
    });

    it('should parse directional spacing', () => {
      const result = parseClassName('head-px-4', config);
      expect(result).toBeTruthy();
      expect(result.utility).toBe('px');
      expect(result.value).toBe('4');
    });

    it('should parse color with shade', () => {
      const result = parseClassName('head-bg-red-500', config);
      expect(result).toBeTruthy();
      expect(result.utility).toBe('bg');
      expect(result.value).toBe('red-500');
    });

    it('should parse compound utilities', () => {
      const result = parseClassName('head-flex-col', config);
      expect(result).toBeTruthy();
      expect(result.utility).toBe('flex');
      expect(result.value).toBe('col');
    });
  });

  describe('extractChaiClasses', () => {
    it('should extract only head-* classes', () => {
      const el = document.createElement('div');
      el.className = 'head-p-4 regular-class head-bg-red-500 another-class';
      const classes = extractChaiClasses(el, config);
      expect(classes).toEqual(['head-p-4', 'head-bg-red-500']);
    });

    it('should return empty array for no chai classes', () => {
      const el = document.createElement('div');
      el.className = 'regular-class another-class';
      expect(extractChaiClasses(el, config)).toEqual([]);
    });
  });
});
