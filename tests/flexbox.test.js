import { describe, it, expect } from 'vitest';
import { match } from '../src/utilities/flexbox.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Flexbox Utilities', () => {
  it('should resolve justify-content', () => {
    expect(match({ utility: 'justify', value: 'center' }, config)).toEqual([{ property: 'justifyContent', value: 'center' }]);
    expect(match({ utility: 'justify', value: 'between' }, config)).toEqual([{ property: 'justifyContent', value: 'space-between' }]);
  });

  it('should resolve align-items', () => {
    expect(match({ utility: 'items', value: 'center' }, config)).toEqual([{ property: 'alignItems', value: 'center' }]);
    expect(match({ utility: 'items', value: 'stretch' }, config)).toEqual([{ property: 'alignItems', value: 'stretch' }]);
  });

  it('should resolve flex-direction', () => {
    expect(match({ utility: 'flex', value: 'col' }, config)).toEqual([{ property: 'flexDirection', value: 'column' }]);
    expect(match({ utility: 'flex', value: 'row' }, config)).toEqual([{ property: 'flexDirection', value: 'row' }]);
  });

  it('should resolve gap', () => {
    expect(match({ utility: 'gap', value: '4' }, config)).toEqual([{ property: 'gap', value: '1rem' }]);
    expect(match({ utility: 'gap-x', value: '2' }, config)).toEqual([{ property: 'columnGap', value: '0.5rem' }]);
  });

  it('should resolve flex shortcuts', () => {
    expect(match({ utility: 'flex', value: '1' }, config)).toEqual([{ property: 'flex', value: '1 1 0%' }]);
    expect(match({ utility: 'flex', value: 'none' }, config)).toEqual([{ property: 'flex', value: 'none' }]);
  });

  it('should resolve grow and shrink', () => {
    expect(match({ utility: 'grow', value: null }, config)).toEqual([{ property: 'flexGrow', value: '1' }]);
    expect(match({ utility: 'shrink', value: '0' }, config)).toEqual([{ property: 'flexShrink', value: '0' }]);
  });
});
