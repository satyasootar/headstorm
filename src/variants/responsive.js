/**
 * Responsive Variants
 * Handles breakpoint prefixes: sm:, md:, lg:, xl:, 2xl:
 * These are extracted by the parser and passed through to the applicator.
 */

/**
 * Check if a variant string is a valid responsive breakpoint.
 * @param {string} variant
 * @param {object} config
 * @returns {boolean}
 */
export function isResponsiveVariant(variant, config) {
  return config.breakpoints && config.breakpoints[variant] !== undefined;
}

/**
 * Get the media query for a responsive breakpoint.
 * @param {string} variant
 * @param {object} config
 * @returns {string|null}
 */
export function getMediaQuery(variant, config) {
  if (!config.breakpoints || !config.breakpoints[variant]) return null;
  return `(min-width: ${config.breakpoints[variant]})`;
}
