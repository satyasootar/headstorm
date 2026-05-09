import { describe, it, expect } from 'vitest';
import { match } from '../src/utilities/effects.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Effects Utilities', () => {
  it('should resolve opacity', () => {
    expect(match({ utility: 'opacity', value: '50' }, config)).toEqual([{ property: 'opacity', value: '0.5' }]);
    expect(match({ utility: 'opacity', value: '100' }, config)).toEqual([{ property: 'opacity', value: '1' }]);
    expect(match({ utility: 'opacity', value: '0' }, config)).toEqual([{ property: 'opacity', value: '0' }]);
  });

  it('should resolve shadow', () => {
    const result = match({ utility: 'shadow', value: null }, config);
    expect(result).toHaveLength(1);
    expect(result[0].property).toBe('boxShadow');
  });

  it('should resolve shadow sizes', () => {
    expect(match({ utility: 'shadow', value: 'lg' }, config)[0].property).toBe('boxShadow');
    expect(match({ utility: 'shadow', value: 'none' }, config)[0].value).toBe('0 0 #0000');
  });

  it('should resolve cursor', () => {
    expect(match({ utility: 'cursor', value: 'pointer' }, config)).toEqual([{ property: 'cursor', value: 'pointer' }]);
  });

  it('should resolve overflow', () => {
    expect(match({ utility: 'overflow', value: 'hidden' }, config)).toEqual([{ property: 'overflow', value: 'hidden' }]);
    expect(match({ utility: 'overflow-x', value: 'auto' }, config)).toEqual([{ property: 'overflowX', value: 'auto' }]);
  });

  it('should resolve z-index', () => {
    expect(match({ utility: 'z', value: '10' }, config)).toEqual([{ property: 'zIndex', value: '10' }]);
    expect(match({ utility: 'z', value: 'auto' }, config)).toEqual([{ property: 'zIndex', value: 'auto' }]);
  });
});
