/**
 * Headwind
 * A lightweight runtime utility-first CSS engine.
 *
 * Usage (ESM):
 *   import { init, scan, destroy, registerPlugin, createPlugin } from 'headwind';
 *   init({ devMode: false });
 *
 * Usage (<script> tag):
 *   <script src="headwind/dist/index.global.js"></script>
 *   <!-- Auto-initializes on DOMContentLoaded -->
 */

export { init, scan, observe, destroy, registerPlugin, configure } from './core/engine.js';
export { createPlugin } from './plugins/pluginApi.js';
export { parseClassName } from './core/parser.js';
export { StyleCache } from './core/cache.js';
export { loadConfig } from './config/loader.js';

// Re-export for convenience
import { init } from './core/engine.js';

const api = { init };

// Auto-init when loaded via <script> tag in a browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const autoInit = () => {
    // Only auto-init if no one has called init() manually
    // Check for a global flag or if the engine is already initialized
    if (!window.__headwindInitialized) {
      window.__headwindInitialized = true;
      init();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    // DOM is already ready
    autoInit();
  }
}

export default api;
