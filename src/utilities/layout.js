/**
 * Layout Utilities
 * Handles: display, position, visibility, box-sizing, top/bottom/left/right/inset
 */

const DISPLAY_MAP = {
  'block': 'block', 'inline-block': 'inline-block', 'inline': 'inline',
  'flex': 'flex', 'inline-flex': 'inline-flex', 'grid': 'grid',
  'inline-grid': 'inline-grid', 'table': 'table', 'contents': 'contents',
  'flow-root': 'flow-root', 'hidden': 'none',
};

const POSITION_MAP = {
  'static': 'static', 'fixed': 'fixed', 'absolute': 'absolute',
  'relative': 'relative', 'sticky': 'sticky',
};

function resolvePositionValue(value, config) {
  if (value.startsWith('[') && value.endsWith(']')) return value.slice(1, -1);
  if (value === 'auto') return 'auto';
  if (value === 'full') return '100%';
  if (config.spacingScale[value]) return config.spacingScale[value];
  return null;
}

export function match(token, config) {
  const { utility, value } = token;
  if (DISPLAY_MAP[utility] !== undefined && !value) return [{ property: 'display', value: DISPLAY_MAP[utility] }];
  if (POSITION_MAP[utility] !== undefined && !value) return [{ property: 'position', value: POSITION_MAP[utility] }];
  const posProps = ['top', 'bottom', 'left', 'right'];
  if (posProps.includes(utility) && value) {
    const r = resolvePositionValue(value, config);
    if (r) return [{ property: utility, value: r }];
  }
  if (utility === 'inset' && value) {
    const r = resolvePositionValue(value, config);
    if (r) return [{ property: 'top', value: r }, { property: 'right', value: r }, { property: 'bottom', value: r }, { property: 'left', value: r }];
  }
  if (utility === 'visible' && !value) return [{ property: 'visibility', value: 'visible' }];
  if (utility === 'invisible' && !value) return [{ property: 'visibility', value: 'hidden' }];
  if (utility === 'box' && value === 'border') return [{ property: 'boxSizing', value: 'border-box' }];
  if (utility === 'box' && value === 'content') return [{ property: 'boxSizing', value: 'content-box' }];
  return null;
}
