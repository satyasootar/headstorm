/**
 * Spacing Utilities
 * Handles: p, m, pt, pb, pl, pr, px, py, mt, mb, ml, mr, mx, my
 */

const DIRECTION_MAP = {
  t: ['Top'],
  b: ['Bottom'],
  l: ['Left'],
  r: ['Right'],
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

/**
 * Resolve a spacing value from the config scale or arbitrary syntax.
 * @param {string} val
 * @param {object} config
 * @returns {string|null}
 */
function resolveSpacingValue(val, config) {
  if (!val) return null;

  // Arbitrary value: [24px], [2rem], etc.
  if (val.startsWith('[') && val.endsWith(']')) {
    return val.slice(1, -1);
  }

  // "auto" is valid for margin
  if (val === 'auto') return 'auto';

  // Numeric scale lookup
  if (config.spacingScale[val] !== undefined) {
    return config.spacingScale[val];
  }

  // Fractional values like 1/2, 1/3, etc.
  const fractionMatch = val.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1], 10);
    const denominator = parseInt(fractionMatch[2], 10);
    if (denominator !== 0) {
      return `${((numerator / denominator) * 100).toFixed(6).replace(/\.?0+$/, '')}%`;
    }
  }

  return null;
}

/**
 * Match a parsed token against spacing utilities.
 * @param {object} token - { utility, value }
 * @param {object} config
 * @returns {Array<{ property: string, value: string }>|null}
 */
export function match(token, config) {
  const { utility, value } = token;

  // Determine if this is padding or margin
  let property = null;
  let direction = null;

  if (utility === 'p' || utility === 'm') {
    property = utility === 'p' ? 'padding' : 'margin';
    direction = null;
  } else if (utility.length === 2 && (utility[0] === 'p' || utility[0] === 'm')) {
    const dirKey = utility[1];
    if (DIRECTION_MAP[dirKey]) {
      property = utility[0] === 'p' ? 'padding' : 'margin';
      direction = DIRECTION_MAP[dirKey];
    }
  }

  if (!property) return null;

  const resolved = resolveSpacingValue(value, config);
  if (resolved === null) return null;

  // No directional variant → single property
  if (!direction) {
    return [{ property, value: resolved }];
  }

  // Directional → return multiple declarations
  return direction.map(dir => ({
    property: `${property}${dir}`,
    value: resolved,
  }));
}
