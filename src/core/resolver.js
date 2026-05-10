/**
 * Chai Style Resolver
 * Takes a parsed token and resolves it to CSS property/value pairs.
 */
import { resolveUtility } from '../utilities/index.js';

/**
 * Resolve a parsed class token into CSS declarations.
 * @param {object} token  - Parsed token from parser
 * @param {object} config - Resolved config
 * @returns {Array<{ property: string, value: string }>|null}
 */
export function resolve(token, config) {
  if (!token) return null;

  const result = resolveUtility(token, config);

  if (!result && config.devMode) {
    console.warn(`[chai] Unknown utility class: "${token.original}"`);
  }

  return result;
}
