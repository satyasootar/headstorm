import { describe, it, expect } from 'vitest';
import { StyleCache } from '../src/core/cache.js';

describe('StyleCache', () => {
  it('should store and retrieve values', () => {
    const cache = new StyleCache();
    const styles = [{ property: 'padding', value: '1rem' }];
    cache.set('chai-p-4', styles);
    expect(cache.has('chai-p-4')).toBe(true);
    expect(cache.get('chai-p-4')).toEqual(styles);
  });

  it('should return null for missing keys', () => {
    const cache = new StyleCache();
    expect(cache.get('chai-nonexistent')).toBeNull();
    expect(cache.has('chai-nonexistent')).toBe(false);
  });

  it('should evict oldest entries when at capacity', () => {
    const cache = new StyleCache(3);
    cache.set('a', []);
    cache.set('b', []);
    cache.set('c', []);
    cache.set('d', []); // should evict 'a'
    expect(cache.has('a')).toBe(false);
    expect(cache.has('d')).toBe(true);
    expect(cache.size).toBe(3);
  });

  it('should update LRU order on get', () => {
    const cache = new StyleCache(3);
    cache.set('a', [{ property: 'a', value: 'a' }]);
    cache.set('b', []);
    cache.set('c', []);
    cache.get('a'); // moves 'a' to end
    cache.set('d', []); // should evict 'b' (oldest after LRU update)
    expect(cache.has('a')).toBe(true);
    expect(cache.has('b')).toBe(false);
  });

  it('should clear all entries', () => {
    const cache = new StyleCache();
    cache.set('a', []);
    cache.set('b', []);
    cache.clear();
    expect(cache.size).toBe(0);
  });
});
