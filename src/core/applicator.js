/**
 * head-Tailwind Applicator
 * Applies resolved styles to DOM elements.
 * Handles inline styles, responsive (@media), and pseudo-class variants.
 */

let idCounter = 0;
let styleElement = null;
const injectedRules = new Map();

/**
 * Get or create the managed <style> element for dynamic CSS rules.
 */
function getStyleElement() {
  if (styleElement && styleElement.parentNode) return styleElement;
  styleElement = document.createElement('style');
  styleElement.id = 'headwind-dynamic';
  styleElement.setAttribute('data-head', 'true');
  document.head.appendChild(styleElement);
  return styleElement;
}

/**
 * Generate a unique ID for an element (for CSS targeting).
 */
function getElementId(element) {
  let id = element.getAttribute('data-head-id');
  if (!id) {
    id = 'head-' + (++idCounter);
    element.setAttribute('data-head-id', id);
  }
  return id;
}

/**
 * Apply resolved style declarations to a DOM element.
 * @param {Element} element
 * @param {Array<{ declarations: Array<{property,value}>, responsive: string|null, pseudo: string|null }>} styleGroups
 * @param {object} config
 */
export function applyStyles(element, styleGroups, config) {
  const inlineStyles = [];
  const cssRules = [];

  for (const group of styleGroups) {
    if (!group.declarations) continue;

    if (group.responsive || group.pseudo) {
      cssRules.push(group);
    } else {
      inlineStyles.push(...group.declarations);
    }
  }

  // Batch inline style writes
  for (const { property, value } of inlineStyles) {
    element.style[property] = value;
  }

  // Inject CSS rules for responsive / pseudo variants
  if (cssRules.length > 0) {
    const elementId = getElementId(element);
    const sheet = getStyleElement();

    for (const group of cssRules) {
      const selector = `[data-head-id="${elementId}"]`;
      const pseudoSuffix = group.pseudo ? `:${group.pseudo}` : '';
      const declarations = group.declarations
        .map(d => `${camelToKebab(d.property)}: ${d.value}`)
        .join('; ');

      const rule = `${selector}${pseudoSuffix} { ${declarations} !important; }`;
      const ruleKey = `${elementId}:${group.responsive || ''}:${group.pseudo || ''}:${declarations}`;

      if (injectedRules.has(ruleKey)) continue;

      let fullRule = rule;
      if (group.responsive && config.breakpoints[group.responsive]) {
        fullRule = `@media (min-width: ${config.breakpoints[group.responsive]}) { ${rule} }`;
      }

      sheet.textContent += fullRule + '\n';
      injectedRules.set(ruleKey, true);
    }
  }
}

/**
 * Remove processed head-* classes from an element.
 * @param {Element} element
 * @param {string[]} classNames
 */
export function removeProcessedClasses(element, classNames) {
  for (const cls of classNames) {
    element.classList.remove(cls);
  }
}

/**
 * Clean up all injected styles and state.
 */
export function cleanup() {
  if (styleElement && styleElement.parentNode) {
    styleElement.parentNode.removeChild(styleElement);
  }
  styleElement = null;
  injectedRules.clear();
  idCounter = 0;
}

/**
 * Convert camelCase to kebab-case for CSS properties.
 */
function camelToKebab(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
    .replace(/^webkit-/, '-webkit-')
    .replace(/^moz-/, '-moz-');
}
