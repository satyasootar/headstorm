/**
 * Color Utilities
 * Handles: bg-{color}, text-{color}
 */

/**
 * Resolve a color value from the config palette or arbitrary syntax.
 * @param {string} val - e.g., "red-500", "white", "[#ff6600]", "[rgb(255,0,0)]"
 * @param {object} config
 * @returns {string|null}
 */
export function resolveColor(val, config) {
  if (!val) return null;

  // Arbitrary color: [#ff6600], [rgb(...)], [hsl(...)]
  if (val.startsWith('[') && val.endsWith(']')) {
    return val.slice(1, -1);
  }

  // Direct named colors (white, black, transparent, current)
  if (typeof config.colors[val] === 'string') {
    return config.colors[val];
  }

  // Shade syntax: "red-500" → colors.red[500]
  const lastDash = val.lastIndexOf('-');
  if (lastDash > 0) {
    const colorName = val.slice(0, lastDash);
    const shade = val.slice(lastDash + 1);
    const palette = config.colors[colorName];
    if (palette && typeof palette === 'object' && palette[shade]) {
      return palette[shade];
    }
  }

  // Try as a plain CSS color name (e.g., "red", "blue")
  const cssColors = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque',
    'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue',
    'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson',
    'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen',
    'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid',
    'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray',
    'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray',
    'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
    'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green',
    'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory',
    'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon',
    'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray',
    'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue',
    'lightslategray', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen',
    'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue',
    'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
    'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue',
    'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace',
    'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
    'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff',
    'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red',
    'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen',
    'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray',
    'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato',
    'turquoise', 'violet', 'wheat', 'whitesmoke', 'yellow', 'yellowgreen',
  ];

  if (cssColors.includes(val)) {
    return val;
  }

  return null;
}

/**
 * Match a parsed token against color utilities.
 * @param {object} token - { utility, value }
 * @param {object} config
 * @returns {Array<{ property: string, value: string }>|null}
 */
export function match(token, config) {
  const { utility, value } = token;

  if (!value) return null;

  if (utility === 'bg') {
    const color = resolveColor(value, config);
    if (color) {
      return [{ property: 'backgroundColor', value: color }];
    }
  }

  if (utility === 'text') {
    const color = resolveColor(value, config);
    if (color) {
      return [{ property: 'color', value: color }];
    }
  }

  return null;
}
