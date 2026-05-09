import { describe, it, expect } from 'vitest';
import { match } from '../src/utilities/layout.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Layout Utilities', () => {
  it('should resolve display utilities', () => {
    expect(match({ utility: 'flex', value: null }, config)).toEqual([{ property: 'display', value: 'flex' }]);
    expect(match({ utility: 'grid', value: null }, config)).toEqual([{ property: 'display', value: 'grid' }]);
    expect(match({ utility: 'block', value: null }, config)).toEqual([{ property: 'display', value: 'block' }]);
    expect(match({ utility: 'hidden', value: null }, config)).toEqual([{ property: 'display', value: 'none' }]);
    expect(match({ utility: 'inline-flex', value: null }, config)).toEqual([{ property: 'display', value: 'inline-flex' }]);
  });

  it('should resolve position utilities', () => {
    expect(match({ utility: 'relative', value: null }, config)).toEqual([{ property: 'position', value: 'relative' }]);
    expect(match({ utility: 'absolute', value: null }, config)).toEqual([{ property: 'position', value: 'absolute' }]);
    expect(match({ utility: 'fixed', value: null }, config)).toEqual([{ property: 'position', value: 'fixed' }]);
  });

  it('should resolve positional values', () => {
    expect(match({ utility: 'top', value: '0' }, config)).toEqual([{ property: 'top', value: '0px' }]);
    expect(match({ utility: 'left', value: '4' }, config)).toEqual([{ property: 'left', value: '1rem' }]);
  });

  it('should resolve inset', () => {
    const result = match({ utility: 'inset', value: '0' }, config);
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ property: 'top', value: '0px' });
  });

  it('should resolve visibility', () => {
    expect(match({ utility: 'visible', value: null }, config)).toEqual([{ property: 'visibility', value: 'visible' }]);
    expect(match({ utility: 'invisible', value: null }, config)).toEqual([{ property: 'visibility', value: 'hidden' }]);
  });
});
