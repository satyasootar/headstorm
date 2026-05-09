/**
 * Border Utilities
 * Handles: border, border-{width}, border-{color}, border-{side},
 *          rounded, rounded-{size}, rounded-{corner}
 */
import { resolveColor } from './colors.js';

const BORDER_SIDES = {
  't': ['Top'],
  'b': ['Bottom'],
  'l': ['Left'],
  'r': ['Right'],
};

const ROUNDED_CORNERS = {
  't': ['TopLeft', 'TopRight'],
  'b': ['BottomLeft', 'BottomRight'],
  'l': ['TopLeft', 'BottomLeft'],
  'r': ['TopRight', 'BottomRight'],
  'tl': ['TopLeft'],
  'tr': ['TopRight'],
  'bl': ['BottomLeft'],
  'br': ['BottomRight'],
};

/**
 * Match a parsed token against border utilities.
 * @param {object} token - { utility, value }
 * @param {object} config
 * @returns {Array<{ property: string, value: string }>|null}
 */
export function match(token, config) {
  const { utility, value } = token;

  // --- Border width ---
  if (utility === 'border' && !value) {
    return [{ property: 'borderWidth', value: '1px' }];
  }

  // border-{side} without value: border-t → border-top-width: 1px
  for (const [sideKey, sides] of Object.entries(BORDER_SIDES)) {
    if (utility === `border-${sideKey}`) {
      if (!value) {
        return sides.map(s => ({ property: `border${s}Width`, value: '1px' }));
      }
      // border-t-2 → border-top-width: 2px
      const width = resolveWidth(value);
      if (width) {
        return sides.map(s => ({ property: `border${s}Width`, value: width }));
      }
      // border-t-red-500 → border-top-color
      const color = resolveColor(value, config);
      if (color) {
        return sides.map(s => ({ property: `border${s}Color`, value: color }));
      }
    }
  }

  // border-{width} or border-{color}
  if (utility === 'border' && value) {
    // Arbitrary
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1);
      // Guess: if it looks like a width, apply as width
      if (/^\d/.test(inner)) {
        return [{ property: 'borderWidth', value: inner }];
      }
      return [{ property: 'borderColor', value: inner }];
    }

    // Width: border-0, border-2, border-4, border-8
    const width = resolveWidth(value);
    if (width) {
      return [{ property: 'borderWidth', value: width }];
    }

    // Color
    const color = resolveColor(value, config);
    if (color) {
      return [{ property: 'borderColor', value: color }];
    }

    // Style
    const styles = ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'];
    if (styles.includes(value)) {
      return [{ property: 'borderStyle', value }];
    }
  }

  // --- Border radius ---
  if (utility === 'rounded') {
    if (!value) {
      return [{ property: 'borderRadius', value: config.borderRadius['DEFAULT'] || '0.25rem' }];
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      return [{ property: 'borderRadius', value: value.slice(1, -1) }];
    }

    if (config.borderRadius[value]) {
      return [{ property: 'borderRadius', value: config.borderRadius[value] }];
    }
  }

  // rounded-{corner}-{size}: rounded-t, rounded-tl-lg, etc.
  for (const [cornerKey, corners] of Object.entries(ROUNDED_CORNERS)) {
    if (utility === `rounded-${cornerKey}`) {
      let radiusValue;
      if (!value) {
        radiusValue = config.borderRadius['DEFAULT'] || '0.25rem';
      } else if (value.startsWith('[') && value.endsWith(']')) {
        radiusValue = value.slice(1, -1);
      } else if (config.borderRadius[value]) {
        radiusValue = config.borderRadius[value];
      }

      if (radiusValue) {
        return corners.map(c => ({ property: `border${c}Radius`, value: radiusValue }));
      }
    }
  }

  return null;
}

function resolveWidth(value) {
  const widthMap = { '0': '0px', '2': '2px', '4': '4px', '8': '8px' };
  return widthMap[value] || null;
}
