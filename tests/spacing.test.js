import { describe, it, expect } from 'vitest';
import { match } from '../src/utilities/spacing.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Spacing Utilities', () => {
  it('should resolve padding', () => {
    expect(match({ utility: 'p', value: '4' }, config)).toEqual([{ property: 'padding', value: '1rem' }]);
    expect(match({ utility: 'p', value: '0' }, config)).toEqual([{ property: 'padding', value: '0px' }]);
  });

  it('should resolve margin', () => {
    expect(match({ utility: 'm', value: '2' }, config)).toEqual([{ property: 'margin', value: '0.5rem' }]);
  });

  it('should resolve directional padding', () => {
    expect(match({ utility: 'pt', value: '4' }, config)).toEqual([{ property: 'paddingTop', value: '1rem' }]);
    expect(match({ utility: 'pb', value: '2' }, config)).toEqual([{ property: 'paddingBottom', value: '0.5rem' }]);
  });

  it('should resolve axis spacing', () => {
    const result = match({ utility: 'px', value: '4' }, config);
    expect(result).toEqual([
      { property: 'paddingLeft', value: '1rem' },
      { property: 'paddingRight', value: '1rem' },
    ]);
  });

  it('should resolve margin auto', () => {
    expect(match({ utility: 'm', value: 'auto' }, config)).toEqual([{ property: 'margin', value: 'auto' }]);
    expect(match({ utility: 'mx', value: 'auto' }, config)).toEqual([
      { property: 'marginLeft', value: 'auto' },
      { property: 'marginRight', value: 'auto' },
    ]);
  });

  it('should resolve arbitrary values', () => {
    expect(match({ utility: 'p', value: '[24px]' }, config)).toEqual([{ property: 'padding', value: '24px' }]);
  });

  it('should return null for unknown utilities', () => {
    expect(match({ utility: 'bg', value: 'red' }, config)).toBeNull();
  });
});
