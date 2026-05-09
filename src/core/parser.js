/**
 * head-Tailwind Parser
 * Tokenizes a head-* class name into a structured descriptor object.
 *
 * Examples:
 *   "head-p-4"              → { utility: "p",  value: "4",   responsive: null, pseudo: null }
 *   "head-sm:hover:bg-red-500" → { utility: "bg", value: "red-500", responsive: "sm", pseudo: "hover" }
 *   "head-w-[300px]"        → { utility: "w",  value: "[300px]", responsive: null, pseudo: null }
 */

const VARIANT_REGEX = /^(.+):(.+)$/;

/**
 * Parse a single class name into a structured token.
 * @param {string} className - The full class name (e.g., "head-p-4")
 * @param {object} config    - The resolved config
 * @returns {object|null}    - Parsed token or null if not a valid chai class
 */
export function parseClassName(className, config) {
  const prefix = config.prefix + '-';

  if (!className.startsWith(prefix)) {
    return null;
  }

  // Strip the prefix
  let raw = className.slice(prefix.length);

  // Extract variants (responsive / pseudo)
  let responsive = null;
  let pseudo = null;

  // Variants are colon-separated prefixes: "sm:hover:bg-red-500"
  // We need to split by colon but only for variant prefixes
  const colonParts = raw.split(':');

  if (colonParts.length > 1) {
    // Last part is the actual utility
    raw = colonParts.pop();

    for (const part of colonParts) {
      if (config.breakpoints && config.breakpoints[part]) {
        responsive = part;
      } else if (['hover', 'focus', 'active', 'visited', 'disabled', 'first', 'last', 'odd', 'even', 'focus-within', 'focus-visible'].includes(part)) {
        pseudo = part;
      }
    }
  }

  // Parse the utility + value from raw (e.g., "bg-red-500", "p-4", "flex")
  const parsed = parseUtilityValue(raw);

  if (!parsed) {
    return null;
  }

  return {
    original: className,
    prefix: config.prefix,
    responsive,
    pseudo,
    utility: parsed.utility,
    value: parsed.value,
    raw,
  };
}

/**
 * Split a raw utility string into utility key and value.
 *
 * Strategy:
 *   1. Check for arbitrary value: "w-[300px]" → { utility: "w", value: "[300px]" }
 *   2. Try known compound utilities first: "inline-flex", "flex-col", etc.
 *   3. Greedily match from the left for simple utilities
 *
 * @param {string} raw - e.g., "bg-red-500", "p-4", "flex", "text-center"
 * @returns {{ utility: string, value: string|null }|null}
 */
function parseUtilityValue(raw) {
  if (!raw || raw.length === 0) {
    return null;
  }

  // Check for arbitrary value syntax: utility-[arbitrary]
  const arbitraryMatch = raw.match(/^(.+?)-(\[.+\])$/);
  if (arbitraryMatch) {
    return { utility: arbitraryMatch[1], value: arbitraryMatch[2] };
  }

  // Known standalone utilities (no value)
  const standaloneUtils = [
    'flex', 'grid', 'block', 'hidden', 'inline', 'inline-block', 'inline-flex',
    'inline-grid', 'table', 'contents', 'flow-root',
    'border', 'grow', 'shrink',
    'static', 'fixed', 'absolute', 'relative', 'sticky',
    'italic', 'not-italic', 'underline', 'overline', 'line-through', 'no-underline',
    'uppercase', 'lowercase', 'capitalize', 'normal-case',
    'truncate', 'antialiased',
    'flex-row', 'flex-col', 'flex-row-reverse', 'flex-col-reverse',
    'flex-wrap', 'flex-wrap-reverse', 'flex-nowrap',
    'shadow', 'shadow-inner', 'shadow-none',
  ];

  if (standaloneUtils.includes(raw)) {
    // For compound standalone utilities, split at first hyphen for utility-value pairs
    const compoundMatch = raw.match(/^(flex|shadow|inline)[-](.+)$/);
    if (compoundMatch) {
      return { utility: compoundMatch[1], value: compoundMatch[2] };
    }
    return { utility: raw, value: null };
  }

  // Known utility prefixes — ordered longest-first to greedily match
  const prefixes = [
    'overflow-x', 'overflow-y',
    'min-w', 'min-h', 'max-w', 'max-h',
    'flex-grow', 'flex-shrink',
    'border-t', 'border-b', 'border-l', 'border-r',
    'rounded-t', 'rounded-b', 'rounded-l', 'rounded-r',
    'rounded-tl', 'rounded-tr', 'rounded-bl', 'rounded-br',
    'justify', 'items', 'self', 'content',
    'gap-x', 'gap-y',
    'tracking', 'leading',
    'font', 'text', 'bg', 'border', 'rounded',
    'opacity', 'shadow', 'cursor', 'overflow', 'whitespace', 'break',
    'gap', 'order',
    'top', 'bottom', 'left', 'right', 'inset',
    'pt', 'pb', 'pl', 'pr', 'px', 'py',
    'mt', 'mb', 'ml', 'mr', 'mx', 'my',
    'w', 'h', 'p', 'm', 'z',
  ];

  for (const pre of prefixes) {
    if (raw === pre) {
      return { utility: pre, value: null };
    }
    if (raw.startsWith(pre + '-')) {
      return { utility: pre, value: raw.slice(pre.length + 1) };
    }
  }

  // Fallback: treat the entire string as the utility with no value
  return { utility: raw, value: null };
}

/**
 * Extract all head-* class names from an element's classList.
 * @param {Element} element
 * @param {object} config
 * @returns {string[]}
 */
export function extractChaiClasses(element, config) {
  const prefix = config.prefix + '-';
  const classes = [];
  for (const cls of element.classList) {
    if (cls.startsWith(prefix)) {
      classes.push(cls);
    }
  }
  return classes;
}
