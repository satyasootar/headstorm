import { describe, it, expect } from 'vitest';
import { match } from '../src/utilities/sizing.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Sizing Utilities', () => {
  it('should resolve width', () => {
    expect(match({ utility: 'w', value: 'full' }, config)).toEqual([{ property: 'width', value: '100%' }]);
    expect(match({ utility: 'w', value: '64' }, config)).toEqual([{ property: 'width', value: '16rem' }]);
    expect(match({ utility: 'w', value: 'screen' }, config)).toEqual([{ property: 'width', value: '100vw' }]);
  });

  it('should resolve height', () => {
    expect(match({ utility: 'h', value: 'auto' }, config)).toEqual([{ property: 'height', value: 'auto' }]);
    expect(match({ utility: 'h', value: 'screen' }, config)).toEqual([{ property: 'height', value: '100vh' }]);
  });

  it('should resolve min/max', () => {
    expect(match({ utility: 'min-h', value: 'screen' }, config)).toEqual([{ property: 'minHeight', value: '100vh' }]);
    expect(match({ utility: 'max-w', value: 'lg' }, config)).toEqual([{ property: 'maxWidth', value: '32rem' }]);
  });

  it('should resolve arbitrary values', () => {
    expect(match({ utility: 'w', value: '[300px]' }, config)).toEqual([{ property: 'width', value: '300px' }]);
  });

  it('should resolve fractions', () => {
    expect(match({ utility: 'w', value: '1/2' }, config)).toEqual([{ property: 'width', value: '50%' }]);
    expect(match({ utility: 'w', value: '1/3' }, config)).toEqual([{ property: 'width', value: '33.333333%' }]);
  });
});
