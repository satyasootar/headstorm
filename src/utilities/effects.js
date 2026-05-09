/**
 * Effects Utilities
 * Handles: opacity, shadow, cursor, overflow, z-index
 */

export function match(token, config) {
  const { utility, value } = token;

  // opacity
  if (utility === 'opacity' && value) {
    if (value.startsWith('[') && value.endsWith(']')) return [{ property: 'opacity', value: value.slice(1, -1) }];
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= 100) return [{ property: 'opacity', value: String(num / 100) }];
  }

  // shadow
  if (utility === 'shadow') {
    if (!value) return [{ property: 'boxShadow', value: config.boxShadows['DEFAULT'] }];
    if (value.startsWith('[') && value.endsWith(']')) return [{ property: 'boxShadow', value: value.slice(1, -1) }];
    if (config.boxShadows[value]) return [{ property: 'boxShadow', value: config.boxShadows[value] }];
    // shadow-none handled above via config
  }

  // cursor
  if (utility === 'cursor' && value) {
    const cursors = ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help',
      'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair',
      'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing',
      'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize',
      's-resize', 'w-resize', 'zoom-in', 'zoom-out'];
    if (cursors.includes(value)) return [{ property: 'cursor', value }];
    if (value.startsWith('[') && value.endsWith(']')) return [{ property: 'cursor', value: value.slice(1, -1) }];
  }

  // overflow
  if (utility === 'overflow' && value) {
    const vals = ['auto', 'hidden', 'clip', 'visible', 'scroll'];
    if (vals.includes(value)) return [{ property: 'overflow', value }];
  }
  if (utility === 'overflow-x' && value) {
    const vals = ['auto', 'hidden', 'clip', 'visible', 'scroll'];
    if (vals.includes(value)) return [{ property: 'overflowX', value }];
  }
  if (utility === 'overflow-y' && value) {
    const vals = ['auto', 'hidden', 'clip', 'visible', 'scroll'];
    if (vals.includes(value)) return [{ property: 'overflowY', value }];
  }

  // z-index
  if (utility === 'z' && value) {
    if (value === 'auto') return [{ property: 'zIndex', value: 'auto' }];
    if (value.startsWith('[') && value.endsWith(']')) return [{ property: 'zIndex', value: value.slice(1, -1) }];
    if (/^\d+$/.test(value)) return [{ property: 'zIndex', value }];
  }

  return null;
}
