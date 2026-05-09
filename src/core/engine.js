/**
 * Chai-Tailwind Engine
 * Main orchestrator: init, scan, observe, destroy.
 */
import { loadConfig } from '../config/loader.js';
import { parseClassName, extractChaiClasses } from './parser.js';
import { resolve } from './resolver.js';
import { applyStyles, removeProcessedClasses, cleanup as cleanupApplicator } from './applicator.js';
import { StyleCache } from './cache.js';
import { registerUtilityModule, clearPluginModules } from '../utilities/index.js';

let currentConfig = null;
let cache = null;
let observer = null;
let initialized = false;
let debounceTimer = null;

/**
 * Configure the engine without initializing.
 * @param {object} userConfig
 * @returns {object} Frozen config
 */
export function configure(userConfig = {}) {
  currentConfig = loadConfig(userConfig);
  cache = new StyleCache();
  return currentConfig;
}

/**
 * Initialize Chai-Tailwind: load config, scan DOM, start observing.
 * @param {object} [userConfig] - Optional config overrides
 * @param {object} [options]
 * @param {Element} [options.root] - Root element to scan (default: document.body)
 * @param {boolean} [options.observe] - Whether to observe for dynamic changes (default: true)
 */
export function init(userConfig = {}, options = {}) {
  if (initialized) {
    destroy();
  }

  configure(userConfig);

  const root = options.root || document.body;
  const shouldObserve = options.observe !== false;

  scan(root);

  if (shouldObserve) {
    observe(root);
  }

  initialized = true;
}

/**
 * Scan a root element for chai-* classes and apply styles.
 * @param {Element} [root] - Root element (default: document.body)
 */
export function scan(root) {
  if (!currentConfig) {
    currentConfig = loadConfig();
    cache = new StyleCache();
  }

  const target = root || (typeof document !== 'undefined' ? document.body : null);
  if (!target) return;

  const elements = target.querySelectorAll('[class*="' + currentConfig.prefix + '-"]');
  for (const el of elements) {
    processElement(el);
  }

  // Also process the root element itself if it has chai classes
  if (target.classList && target.className.includes(currentConfig.prefix + '-')) {
    processElement(target);
  }
}

/**
 * Process a single element: parse its chai-* classes, resolve, and apply.
 * @param {Element} element
 */
function processElement(element) {
  const chaiClasses = extractChaiClasses(element, currentConfig);
  if (chaiClasses.length === 0) return;

  const styleGroups = [];

  for (const cls of chaiClasses) {
    // Check cache
    let cached = cache.get(cls);
    if (cached !== null) {
      styleGroups.push(cached);
      continue;
    }

    // Parse and resolve
    const token = parseClassName(cls, currentConfig);
    if (!token) {
      cache.set(cls, { declarations: null });
      continue;
    }

    const declarations = resolve(token, currentConfig);
    const group = {
      declarations,
      responsive: token.responsive,
      pseudo: token.pseudo,
    };

    cache.set(cls, group);
    styleGroups.push(group);
  }

  applyStyles(element, styleGroups, currentConfig);

  if (currentConfig.removeClassesAfterProcessing) {
    removeProcessedClasses(element, chaiClasses);
  }
}

/**
 * Start observing the DOM for dynamic changes via MutationObserver.
 * @param {Element} [root] - Root element to observe (default: document.body)
 */
export function observe(root) {
  if (observer) {
    observer.disconnect();
  }

  const target = root || document.body;
  let pendingMutations = [];

  observer = new MutationObserver((mutations) => {
    // Accumulate mutations across rapid-fire callbacks
    pendingMutations.push(...mutations);

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const batch = pendingMutations;
      pendingMutations = [];
      handleMutations(batch);
    }, 16); // ~1 frame
  });

  observer.observe(target, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
}

/**
 * Handle batched mutations efficiently.
 */
function handleMutations(mutations) {
  const processedElements = new Set();

  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;

        // Process the added node itself
        if (node.className && typeof node.className === 'string' && node.className.includes(currentConfig.prefix + '-')) {
          if (!processedElements.has(node)) {
            processElement(node);
            processedElements.add(node);
          }
        }

        // Process descendants
        const descendants = node.querySelectorAll('[class*="' + currentConfig.prefix + '-"]');
        for (const desc of descendants) {
          if (!processedElements.has(desc)) {
            processElement(desc);
            processedElements.add(desc);
          }
        }
      }
    }

    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const el = mutation.target;
      if (el.className && typeof el.className === 'string' && el.className.includes(currentConfig.prefix + '-')) {
        if (!processedElements.has(el)) {
          processElement(el);
          processedElements.add(el);
        }
      }
    }
  }
}

/**
 * Register a plugin.
 * @param {{ name: string, utilities: object }} plugin
 */
export function registerPlugin(plugin) {
  if (!plugin || !plugin.utilities) {
    console.warn('[chai-tailwind] Invalid plugin:', plugin);
    return;
  }

  // Convert plugin utilities into a module-compatible format
  const mod = {
    match(token, config) {
      const handler = plugin.utilities[token.utility];
      if (handler) {
        const result = handler(token.value, config);
        if (result) {
          return Array.isArray(result) ? result : [result];
        }
      }
      return null;
    },
  };

  registerUtilityModule(mod);

  // Clear cache since new utilities may match previously-failed classes
  if (cache) cache.clear();
}

/**
 * Destroy the engine: disconnect observer, clean up styles, clear cache.
 */
export function destroy() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }

  cleanupApplicator();
  clearPluginModules();

  if (cache) cache.clear();
  currentConfig = null;
  initialized = false;
}
