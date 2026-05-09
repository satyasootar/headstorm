import { describe, it, expect } from 'vitest';
import { match } from '../src/utilities/typography.js';
import { loadConfig } from '../src/config/loader.js';

const config = loadConfig();

describe('Typography Utilities', () => {
  it('should resolve text alignment', () => {
    expect(match({ utility: 'text', value: 'center' }, config)).toEqual([{ property: 'textAlign', value: 'center' }]);
    expect(match({ utility: 'text', value: 'right' }, config)).toEqual([{ property: 'textAlign', value: 'right' }]);
  });

  it('should resolve font sizes', () => {
    expect(match({ utility: 'text', value: 'xl' }, config)).toEqual([{ property: 'fontSize', value: '1.25rem' }]);
    expect(match({ utility: 'text', value: 'sm' }, config)).toEqual([{ property: 'fontSize', value: '0.875rem' }]);
  });

  it('should resolve font weights', () => {
    expect(match({ utility: 'font', value: 'bold' }, config)).toEqual([{ property: 'fontWeight', value: '700' }]);
    expect(match({ utility: 'font', value: 'light' }, config)).toEqual([{ property: 'fontWeight', value: '300' }]);
  });

  it('should resolve line height', () => {
    expect(match({ utility: 'leading', value: 'tight' }, config)).toEqual([{ property: 'lineHeight', value: '1.25' }]);
  });

  it('should resolve letter spacing', () => {
    expect(match({ utility: 'tracking', value: 'wide' }, config)).toEqual([{ property: 'letterSpacing', value: '0.025em' }]);
  });

  it('should resolve text decorations', () => {
    expect(match({ utility: 'underline', value: null }, config)).toEqual([{ property: 'textDecoration', value: 'underline' }]);
  });

  it('should resolve text transforms', () => {
    expect(match({ utility: 'uppercase', value: null }, config)).toEqual([{ property: 'textTransform', value: 'uppercase' }]);
  });

  it('should resolve italic', () => {
    expect(match({ utility: 'italic', value: null }, config)).toEqual([{ property: 'fontStyle', value: 'italic' }]);
  });

  it('should resolve truncate', () => {
    const result = match({ utility: 'truncate', value: null }, config);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ property: 'overflow', value: 'hidden' });
  });

  it('should resolve arbitrary font size', () => {
    expect(match({ utility: 'text', value: '[20px]' }, config)).toEqual([{ property: 'fontSize', value: '20px' }]);
  });
});
