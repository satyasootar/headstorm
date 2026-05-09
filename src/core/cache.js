/**
 * head-Tailwind Cache
 * Simple Map-based cache with configurable max size.
 * Evicts oldest entries when capacity is exceeded.
 */
export class StyleCache {
  /**
   * @param {number} maxSize - Maximum number of cached entries
   */
  constructor(maxSize = 10000) {
    this._cache = new Map();
    this._maxSize = maxSize;
  }

  /**
   * Check if a class name has a cached result.
   * @param {string} className
   * @returns {boolean}
   */
  has(className) {
    return this._cache.has(className);
  }

  /**
   * Get the cached style declarations for a class name.
   * @param {string} className
   * @returns {Array<{ property: string, value: string }>|null}
   */
  get(className) {
    const result = this._cache.get(className);
    if (result === undefined) return null;

    // Move to end for LRU behavior
    this._cache.delete(className);
    this._cache.set(className, result);

    return result;
  }

  /**
   * Cache a style result for a class name.
   * @param {string} className
   * @param {Array<{ property: string, value: string }>|null} result
   */
  set(className, result) {
    // Delete first to reset insertion order
    if (this._cache.has(className)) {
      this._cache.delete(className);
    }

    // Evict oldest if at capacity
    if (this._cache.size >= this._maxSize) {
      const oldestKey = this._cache.keys().next().value;
      this._cache.delete(oldestKey);
    }

    this._cache.set(className, result);
  }

  /**
   * Clear all cached entries.
   */
  clear() {
    this._cache.clear();
  }

  /**
   * Get the current number of cached entries.
   * @returns {number}
   */
  get size() {
    return this._cache.size;
  }
}
