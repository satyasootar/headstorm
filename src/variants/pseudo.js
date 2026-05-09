/**
 * Pseudo-class Variants
 * Handles: hover:, focus:, active:, visited:, disabled:, focus-within:, focus-visible:
 * These are extracted by the parser and handled by the applicator via injected CSS rules.
 */

const SUPPORTED_PSEUDOS = [
  'hover', 'focus', 'active', 'visited', 'disabled',
  'first', 'last', 'odd', 'even',
  'focus-within', 'focus-visible',
  'first-child', 'last-child',
];

/**
 * Check if a variant string is a valid pseudo-class.
 * @param {string} variant
 * @returns {boolean}
 */
export function isPseudoVariant(variant) {
  return SUPPORTED_PSEUDOS.includes(variant);
}

/**
 * Get the CSS pseudo-class selector suffix.
 * @param {string} variant
 * @returns {string}
 */
export function getPseudoSelector(variant) {
  // Map shorthand to full pseudo-class names
  const map = {
    'first': 'first-child',
    'last': 'last-child',
    'odd': 'nth-child(odd)',
    'even': 'nth-child(even)',
  };
  return map[variant] || variant;
}
