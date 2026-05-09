/**
 * Flexbox Utilities
 * Handles: justify, items, self, content, flex-direction, flex-wrap, gap, grow, shrink, order
 */

const JUSTIFY_MAP = {
  'start': 'flex-start', 'end': 'flex-end', 'center': 'center',
  'between': 'space-between', 'around': 'space-around', 'evenly': 'space-evenly',
  'stretch': 'stretch', 'normal': 'normal',
};

const ITEMS_MAP = {
  'start': 'flex-start', 'end': 'flex-end', 'center': 'center',
  'baseline': 'baseline', 'stretch': 'stretch',
};

const SELF_MAP = {
  'auto': 'auto', 'start': 'flex-start', 'end': 'flex-end',
  'center': 'center', 'stretch': 'stretch', 'baseline': 'baseline',
};

const CONTENT_MAP = {
  'start': 'flex-start', 'end': 'flex-end', 'center': 'center',
  'between': 'space-between', 'around': 'space-around',
  'evenly': 'space-evenly', 'stretch': 'stretch', 'normal': 'normal',
};

export function match(token, config) {
  const { utility, value } = token;

  // flex-direction
  if (utility === 'flex' && value) {
    const dirMap = { 'row': 'row', 'col': 'column', 'row-reverse': 'row-reverse', 'col-reverse': 'column-reverse' };
    if (dirMap[value]) return [{ property: 'flexDirection', value: dirMap[value] }];
    // flex-wrap variants
    if (value === 'wrap') return [{ property: 'flexWrap', value: 'wrap' }];
    if (value === 'wrap-reverse') return [{ property: 'flexWrap', value: 'wrap-reverse' }];
    if (value === 'nowrap') return [{ property: 'flexWrap', value: 'nowrap' }];
    // flex-1, flex-auto, flex-initial, flex-none
    const flexShort = { '1': '1 1 0%', 'auto': '1 1 auto', 'initial': '0 1 auto', 'none': 'none' };
    if (flexShort[value]) return [{ property: 'flex', value: flexShort[value] }];
  }

  if (utility === 'justify' && value && JUSTIFY_MAP[value]) return [{ property: 'justifyContent', value: JUSTIFY_MAP[value] }];
  if (utility === 'items' && value && ITEMS_MAP[value]) return [{ property: 'alignItems', value: ITEMS_MAP[value] }];
  if (utility === 'self' && value && SELF_MAP[value]) return [{ property: 'alignSelf', value: SELF_MAP[value] }];
  if (utility === 'content' && value && CONTENT_MAP[value]) return [{ property: 'alignContent', value: CONTENT_MAP[value] }];

  // gap
  if (utility === 'gap' && value) {
    const v = resolveGap(value, config);
    if (v) return [{ property: 'gap', value: v }];
  }
  if (utility === 'gap-x' && value) {
    const v = resolveGap(value, config);
    if (v) return [{ property: 'columnGap', value: v }];
  }
  if (utility === 'gap-y' && value) {
    const v = resolveGap(value, config);
    if (v) return [{ property: 'rowGap', value: v }];
  }

  // grow / shrink
  if (utility === 'grow' && !value) return [{ property: 'flexGrow', value: '1' }];
  if (utility === 'grow' && value === '0') return [{ property: 'flexGrow', value: '0' }];
  if (utility === 'shrink' && !value) return [{ property: 'flexShrink', value: '1' }];
  if (utility === 'shrink' && value === '0') return [{ property: 'flexShrink', value: '0' }];

  // order
  if (utility === 'order' && value) {
    const orderMap = { 'first': '-9999', 'last': '9999', 'none': '0' };
    if (orderMap[value]) return [{ property: 'order', value: orderMap[value] }];
    if (value.startsWith('[') && value.endsWith(']')) return [{ property: 'order', value: value.slice(1, -1) }];
    if (/^\d+$/.test(value)) return [{ property: 'order', value }];
  }

  return null;
}

function resolveGap(value, config) {
  if (value.startsWith('[') && value.endsWith(']')) return value.slice(1, -1);
  if (config.spacingScale[value]) return config.spacingScale[value];
  return null;
}
