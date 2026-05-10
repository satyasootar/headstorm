/**
 * Typography Utilities
 * Handles: text-{size}, text-{alignment}, font-{weight}, leading-{value}, tracking-{value},
 *          italic, underline, uppercase, etc.
 */

const TEXT_ALIGNMENT = ['left', 'center', 'right', 'justify', 'start', 'end'];

const TEXT_DECORATION_MAP = {
  'underline': 'underline',
  'overline': 'overline',
  'line-through': 'line-through',
  'no-underline': 'none',
};

const TEXT_TRANSFORM_MAP = {
  'uppercase': 'uppercase',
  'lowercase': 'lowercase',
  'capitalize': 'capitalize',
  'normal-case': 'none',
};

/**
 * Match a parsed token against typography utilities.
 * @param {object} token - { utility, value }
 * @param {object} config
 * @returns {Array<{ property: string, value: string }>|null}
 */
export function match(token, config) {
  const { utility, value } = token;

  // text-{alignment}
  if (utility === 'text' && value && TEXT_ALIGNMENT.includes(value)) {
    return [{ property: 'textAlign', value }];
  }

  // text-{size} — font sizes from config
  if (utility === 'text' && value) {
    // Arbitrary: text-[20px]
    if (value.startsWith('[') && value.endsWith(']')) {
      return [{ property: 'fontSize', value: value.slice(1, -1) }];
    }
    if (config.fontSizes[value]) {
      return [{ property: 'fontSize', value: config.fontSizes[value] }];
    }
  }

  // font-{weight}
  if (utility === 'font' && value) {
    if (value.startsWith('[') && value.endsWith(']')) {
      return [{ property: 'fontWeight', value: value.slice(1, -1) }];
    }
    if (config.fontWeights[value]) {
      return [{ property: 'fontWeight', value: config.fontWeights[value] }];
    }
  }

  // leading-{lineHeight}
  if (utility === 'leading' && value) {
    if (value.startsWith('[') && value.endsWith(']')) {
      return [{ property: 'lineHeight', value: value.slice(1, -1) }];
    }
    if (config.lineHeight[value]) {
      return [{ property: 'lineHeight', value: config.lineHeight[value] }];
    }
  }

  // tracking-{letterSpacing}
  if (utility === 'tracking' && value) {
    if (value.startsWith('[') && value.endsWith(']')) {
      return [{ property: 'letterSpacing', value: value.slice(1, -1) }];
    }
    if (config.letterSpacing[value]) {
      return [{ property: 'letterSpacing', value: config.letterSpacing[value] }];
    }
  }

  // Standalone text decorations
  if (TEXT_DECORATION_MAP[utility]) {
    return [{ property: 'textDecoration', value: TEXT_DECORATION_MAP[utility] }];
  }

  // Standalone text transforms
  if (TEXT_TRANSFORM_MAP[utility]) {
    return [{ property: 'textTransform', value: TEXT_TRANSFORM_MAP[utility] }];
  }

  // italic / not-italic
  if (utility === 'italic') {
    return [{ property: 'fontStyle', value: 'italic' }];
  }
  if (utility === 'not-italic') {
    return [{ property: 'fontStyle', value: 'normal' }];
  }

  // truncate
  if (utility === 'truncate') {
    return [
      { property: 'overflow', value: 'hidden' },
      { property: 'textOverflow', value: 'ellipsis' },
      { property: 'whiteSpace', value: 'nowrap' },
    ];
  }

  // antialiased
  if (utility === 'antialiased') {
    return [
      { property: 'webkitFontSmoothing', value: 'antialiased' },
      { property: 'mozOsxFontSmoothing', value: 'grayscale' },
    ];
  }

  // whitespace
  if (utility === 'whitespace' && value) {
    const allowed = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'];
    if (allowed.includes(value)) {
      return [{ property: 'whiteSpace', value }];
    }
  }

  // break
  if (utility === 'break' && value) {
    if (value === 'normal') return [{ property: 'wordBreak', value: 'normal' }, { property: 'overflowWrap', value: 'normal' }];
    if (value === 'words') return [{ property: 'overflowWrap', value: 'break-word' }];
    if (value === 'all') return [{ property: 'wordBreak', value: 'break-all' }];
    if (value === 'keep') return [{ property: 'wordBreak', value: 'keep-all' }];
  }

  // text-wrap
  if (utility === 'text' && (value === 'wrap' || value === 'nowrap' || value === 'balance' || value === 'pretty')) {
    return [{ property: 'textWrap', value }];
  }

  // font-variant-numeric
  if (utility === 'tabular-nums') {
    return [{ property: 'fontVariantNumeric', value: 'tabular-nums' }];
  }
  if (utility === 'proportional-nums') {
    return [{ property: 'fontVariantNumeric', value: 'proportional-nums' }];
  }

  return null;
}
