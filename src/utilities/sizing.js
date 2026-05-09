/**
 * Sizing Utilities
 * Handles: w, h, min-w, min-h, max-w, max-h
 */

const KEYWORD_MAP = {
  'auto': 'auto', 'full': '100%', 'screen': '100vw', 'svw': '100svw', 'lvw': '100lvw',
  'dvw': '100dvw', 'min': 'min-content', 'max': 'max-content', 'fit': 'fit-content',
};
const H_KEYWORDS = {
  'auto': 'auto', 'full': '100%', 'screen': '100vh', 'svh': '100svh', 'lvh': '100lvh',
  'dvh': '100dvh', 'min': 'min-content', 'max': 'max-content', 'fit': 'fit-content',
};

function resolveSizeValue(value, config, keywords) {
  if (!value) return null;
  if (value.startsWith('[') && value.endsWith(']')) return value.slice(1, -1);
  if (keywords[value]) return keywords[value];
  if (config.spacingScale[value]) return config.spacingScale[value];
  const fm = value.match(/^(\d+)\/(\d+)$/);
  if (fm) return `${((parseInt(fm[1]) / parseInt(fm[2])) * 100).toFixed(6).replace(/\.?0+$/, '')}%`;
  return null;
}

export function match(token, config) {
  const { utility, value } = token;

  if (utility === 'w' && value) {
    const v = resolveSizeValue(value, config, KEYWORD_MAP);
    if (v) return [{ property: 'width', value: v }];
  }
  if (utility === 'h' && value) {
    const v = resolveSizeValue(value, config, H_KEYWORDS);
    if (v) return [{ property: 'height', value: v }];
  }
  if (utility === 'min-w' && value) {
    const v = resolveSizeValue(value, config, KEYWORD_MAP);
    if (v) return [{ property: 'minWidth', value: v }];
  }
  if (utility === 'min-h' && value) {
    const v = resolveSizeValue(value, config, H_KEYWORDS);
    if (v) return [{ property: 'minHeight', value: v }];
  }
  if (utility === 'max-w' && value) {
    if (value.startsWith('[') && value.endsWith(']')) return [{ property: 'maxWidth', value: value.slice(1, -1) }];
    if (config.maxWidths[value]) return [{ property: 'maxWidth', value: config.maxWidths[value] }];
    const v = resolveSizeValue(value, config, KEYWORD_MAP);
    if (v) return [{ property: 'maxWidth', value: v }];
  }
  if (utility === 'max-h' && value) {
    const v = resolveSizeValue(value, config, H_KEYWORDS);
    if (v) return [{ property: 'maxHeight', value: v }];
  }

  return null;
}
