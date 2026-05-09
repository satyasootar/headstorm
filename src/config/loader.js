import { defaultConfig } from './defaults.js';

/**
 * Deep-merges a source object into a target object.
 * Arrays are replaced, not merged.
 */
function deepMerge(target, source) {
  const output = { ...target };

  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }

  return output;
}

/**
 * Loads and merges user configuration with defaults.
 * @param {object} userConfig - Partial config to override defaults
 * @returns {Readonly<object>} Frozen merged config
 */
export function loadConfig(userConfig = {}) {
  const merged = deepMerge(defaultConfig, userConfig);
  return Object.freeze(merged);
}
