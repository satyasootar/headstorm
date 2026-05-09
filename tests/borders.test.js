import { describe, it, expect } from 'vitest';
import { match } from '../src/utilities/borders.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Border Utilities', () => {
  it('should resolve border (default width)', () => {
    expect(match({ utility: 'border', value: null }, config)).toEqual([{ property: 'borderWidth', value: '1px' }]);
  });

  it('should resolve border-{width}', () => {
    expect(match({ utility: 'border', value: '2' }, config)).toEqual([{ property: 'borderWidth', value: '2px' }]);
    expect(match({ utility: 'border', value: '0' }, config)).toEqual([{ property: 'borderWidth', value: '0px' }]);
  });

  it('should resolve border-{color}', () => {
    expect(match({ utility: 'border', value: 'red-500' }, config)).toEqual([{ property: 'borderColor', value: '#ef4444' }]);
  });

  it('should resolve border-{style}', () => {
    expect(match({ utility: 'border', value: 'dashed' }, config)).toEqual([{ property: 'borderStyle', value: 'dashed' }]);
  });

  it('should resolve rounded', () => {
    expect(match({ utility: 'rounded', value: null }, config)).toEqual([{ property: 'borderRadius', value: '0.25rem' }]);
    expect(match({ utility: 'rounded', value: 'lg' }, config)).toEqual([{ property: 'borderRadius', value: '0.5rem' }]);
    expect(match({ utility: 'rounded', value: 'full' }, config)).toEqual([{ property: 'borderRadius', value: '9999px' }]);
  });

  it('should resolve rounded-{corner}', () => {
    const result = match({ utility: 'rounded-t', value: 'lg' }, config);
    expect(result).toEqual([
      { property: 'borderTopLeftRadius', value: '0.5rem' },
      { property: 'borderTopRightRadius', value: '0.5rem' },
    ]);
  });
});
