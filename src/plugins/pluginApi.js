/**
 * Chai-Tailwind Plugin API
 * Provides a clean interface for creating and registering plugins.
 *
 * Usage:
 *   import { createPlugin } from 'chai-tailwind';
 *
 *   const myPlugin = createPlugin({
 *     name: 'gradient',
 *     utilities: {
 *       'gradient': (value, config) => ({
 *         property: 'background',
 *         value: `linear-gradient(${value})`
 *       })
 *     }
 *   });
 */

/**
 * Create a validated plugin object.
 * @param {{ name: string, utilities: object }} definition
 * @returns {{ name: string, utilities: object }}
 */
export function createPlugin(definition) {
  if (!definition || typeof definition !== 'object') {
    throw new Error('[chai-tailwind] Plugin definition must be an object');
  }

  if (!definition.name || typeof definition.name !== 'string') {
    throw new Error('[chai-tailwind] Plugin must have a string "name" property');
  }

  if (!definition.utilities || typeof definition.utilities !== 'object') {
    throw new Error('[chai-tailwind] Plugin must have a "utilities" object');
  }

  for (const [key, handler] of Object.entries(definition.utilities)) {
    if (typeof handler !== 'function') {
      throw new Error(`[chai-tailwind] Plugin "${definition.name}" utility "${key}" must be a function`);
    }
  }

  return {
    name: definition.name,
    utilities: { ...definition.utilities },
  };
}
