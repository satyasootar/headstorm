/**
 * Utility Registry
 * Aggregates all utility modules and provides a unified resolution function.
 */
import * as spacing from './spacing.js';
import * as colors from './colors.js';
import * as typography from './typography.js';
import * as borders from './borders.js';
import * as layout from './layout.js';
import * as flexbox from './flexbox.js';
import * as sizing from './sizing.js';
import * as effects from './effects.js';

const builtinModules = [
  layout,
  flexbox,
  spacing,
  sizing,
  typography,
  colors,
  borders,
  effects,
];

/** Plugin modules appended at runtime */
const pluginModules = [];

/**
 * Register a plugin module (must have a `match(token, config)` function).
 * @param {{ match: Function }} mod
 */
export function registerUtilityModule(mod) {
  if (mod && typeof mod.match === 'function') {
    pluginModules.push(mod);
  }
}

/**
 * Clear all registered plugin modules.
 */
export function clearPluginModules() {
  pluginModules.length = 0;
}

/**
 * Try to resolve a parsed token into CSS declarations.
 * Iterates through all utility modules (built-in first, then plugins).
 * @param {object} token - { utility, value }
 * @param {object} config
 * @returns {Array<{ property: string, value: string }>|null}
 */
export function resolveUtility(token, config) {
  // Built-in modules first
  for (const mod of builtinModules) {
    const result = mod.match(token, config);
    if (result) return result;
  }

  // Plugin modules
  for (const mod of pluginModules) {
    const result = mod.match(token, config);
    if (result) return result;
  }

  return null;
}
