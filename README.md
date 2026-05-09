# ☕ Chai-Tailwind

> A lightweight, zero-dependency, runtime utility-first CSS engine. Write `chai-*` classes in your HTML, get instant inline styles — **no build step required**.

[![npm version](https://img.shields.io/npm/v/chai-tailwind.svg)](https://www.npmjs.com/package/chai-tailwind)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/chai-tailwind)](https://bundlephobia.com/package/chai-tailwind)

---

## ✨ What is Chai-Tailwind?

Chai-Tailwind brings Tailwind-like utility classes to your HTML **at runtime**. No PostCSS, no CLI, no purging — just drop a script tag or import the module and your `chai-*` classes become live styles.

```html
<div class="chai-flex chai-justify-center chai-items-center chai-p-8 chai-bg-blue-500 chai-text-white chai-rounded-xl">
  Hello, Chai! ☕
</div>
```

### Key Features

- 🚀 **Zero build step** — works instantly via `<script>` tag or ESM import
- 📦 **Zero dependencies** — pure JavaScript, ~25KB minified
- 🎨 **100+ utility classes** — spacing, colors, typography, borders, layout, flexbox, sizing, effects
- 📱 **Responsive variants** — `chai-sm:p-4`, `chai-md:flex`, `chai-lg:text-xl`
- 🖱️ **Pseudo-class variants** — `chai-hover:bg-red-500`, `chai-focus:border-blue-500`
- 🔄 **Dynamic DOM updates** — MutationObserver auto-styles new elements
- 🔌 **Plugin system** — extend with custom utilities
- 🎯 **Arbitrary values** — `chai-w-[300px]`, `chai-bg-[#ff6600]`
- ⚡ **Performance optimized** — LRU cache, batched DOM writes, debounced observer

---

## 📦 Installation

### npm / yarn / pnpm

```bash
npm install chai-tailwind
```

### CDN (Script Tag)

```html
<!-- Auto-initializes on DOMContentLoaded -->
<script src="https://unpkg.com/chai-tailwind/dist/index.global.js"></script>
```

---

## 🚀 Quick Start

### Option 1: Script Tag (Zero Config)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/chai-tailwind/dist/index.global.js"></script>
</head>
<body>
  <div class="chai-flex chai-justify-center chai-items-center chai-min-h-screen chai-bg-gray-900">
    <div class="chai-p-8 chai-bg-white chai-rounded-2xl chai-shadow-xl">
      <h1 class="chai-text-3xl chai-font-bold chai-text-gray-800">Hello, World!</h1>
      <p class="chai-mt-4 chai-text-gray-500 chai-text-lg">Powered by Chai-Tailwind ☕</p>
    </div>
  </div>
</body>
</html>
```

### Option 2: ESM Import

```js
import { init } from 'chai-tailwind';

// Initialize with default config
init();

// Or with custom config
init({
  devMode: false,
  removeClassesAfterProcessing: false,
});
```

### Option 3: CommonJS

```js
const { init } = require('chai-tailwind');
init();
```

---

## 📚 Supported Utilities

### Spacing

| Class | CSS Output |
|---|---|
| `chai-p-{n}` | `padding: {scale}` |
| `chai-pt-{n}` / `chai-pb-{n}` / `chai-pl-{n}` / `chai-pr-{n}` | Directional padding |
| `chai-px-{n}` / `chai-py-{n}` | Horizontal / Vertical padding |
| `chai-m-{n}` | `margin: {scale}` |
| `chai-mt-{n}` / `chai-mb-{n}` / `chai-ml-{n}` / `chai-mr-{n}` | Directional margin |
| `chai-mx-auto` | Center horizontally |

**Scale:** 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

### Colors

| Class | CSS Output |
|---|---|
| `chai-bg-{color}` | `background-color: {color}` |
| `chai-text-{color}` | `color: {color}` |
| `chai-border-{color}` | `border-color: {color}` |

**Palette:** slate, gray, zinc, neutral, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose + white, black, transparent

**Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### Typography

| Class | CSS Output |
|---|---|
| `chai-text-{size}` | `font-size` — xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl |
| `chai-font-{weight}` | `font-weight` — thin, extralight, light, normal, medium, semibold, bold, extrabold, black |
| `chai-text-left` / `center` / `right` / `justify` | `text-align` |
| `chai-leading-{value}` | `line-height` |
| `chai-tracking-{value}` | `letter-spacing` |
| `chai-italic` / `chai-not-italic` | `font-style` |
| `chai-underline` / `chai-line-through` / `chai-no-underline` | `text-decoration` |
| `chai-uppercase` / `chai-lowercase` / `chai-capitalize` | `text-transform` |
| `chai-truncate` | Overflow ellipsis |

### Borders

| Class | CSS Output |
|---|---|
| `chai-border` | `border-width: 1px` |
| `chai-border-{0\|2\|4\|8}` | `border-width` |
| `chai-border-{color}` | `border-color` |
| `chai-border-{style}` | solid, dashed, dotted, double, none |
| `chai-rounded` | `border-radius: 0.25rem` |
| `chai-rounded-{size}` | none, sm, md, lg, xl, 2xl, 3xl, full |
| `chai-rounded-{corner}` | t, b, l, r, tl, tr, bl, br |

### Layout

| Class | CSS Output |
|---|---|
| `chai-flex` / `chai-grid` / `chai-block` / `chai-inline` | `display` |
| `chai-inline-flex` / `chai-inline-block` / `chai-inline-grid` | `display` |
| `chai-hidden` | `display: none` |
| `chai-relative` / `chai-absolute` / `chai-fixed` / `chai-sticky` | `position` |
| `chai-top-{n}` / `chai-bottom-{n}` / `chai-left-{n}` / `chai-right-{n}` | Positioning |
| `chai-inset-{n}` | All sides |
| `chai-visible` / `chai-invisible` | `visibility` |

### Flexbox

| Class | CSS Output |
|---|---|
| `chai-flex-row` / `chai-flex-col` | `flex-direction` |
| `chai-flex-wrap` / `chai-flex-nowrap` | `flex-wrap` |
| `chai-justify-{value}` | start, end, center, between, around, evenly |
| `chai-items-{value}` | start, end, center, baseline, stretch |
| `chai-self-{value}` | `align-self` |
| `chai-gap-{n}` | `gap` |
| `chai-gap-x-{n}` / `chai-gap-y-{n}` | Column/row gap |
| `chai-grow` / `chai-shrink` | Flex grow/shrink |
| `chai-flex-1` / `chai-flex-auto` / `chai-flex-none` | Flex shortcuts |

### Sizing

| Class | CSS Output |
|---|---|
| `chai-w-{n}` | `width` — scale values, full, screen, auto, min, max, fit |
| `chai-h-{n}` | `height` |
| `chai-min-w-{n}` / `chai-min-h-{n}` | Min dimensions |
| `chai-max-w-{n}` / `chai-max-h-{n}` | Max dimensions — xs, sm, md, lg, xl, 2xl–7xl, prose, screen-* |
| `chai-w-1/2` / `chai-w-1/3` etc. | Fractional widths |

### Effects

| Class | CSS Output |
|---|---|
| `chai-opacity-{0-100}` | `opacity` |
| `chai-shadow` / `chai-shadow-{size}` | sm, md, lg, xl, 2xl, inner, none |
| `chai-cursor-{type}` | pointer, default, text, move, grab, etc. |
| `chai-overflow-{value}` | auto, hidden, clip, visible, scroll |
| `chai-overflow-x-{value}` / `chai-overflow-y-{value}` | Axis overflow |
| `chai-z-{n}` | `z-index` |

---

## 📱 Responsive Variants

Use breakpoint prefixes to apply styles at specific screen widths:

```html
<div class="chai-p-4 chai-sm:p-6 chai-md:p-8 chai-lg:p-12">
  Responsive padding!
</div>
```

| Prefix | Min Width |
|---|---|
| `chai-sm:` | 640px |
| `chai-md:` | 768px |
| `chai-lg:` | 1024px |
| `chai-xl:` | 1280px |
| `chai-2xl:` | 1536px |

> Note: Responsive variants inject `@media` rules into a managed `<style>` tag since inline styles can't express media queries.

---

## 🖱️ Pseudo-Class Variants

```html
<button class="chai-bg-blue-500 chai-hover:bg-blue-700 chai-focus:border-blue-300 chai-cursor-pointer chai-text-white chai-p-4 chai-rounded-lg">
  Hover me!
</button>
```

Supported: `hover`, `focus`, `active`, `visited`, `disabled`, `focus-within`, `focus-visible`, `first`, `last`, `odd`, `even`

---

## 🎯 Arbitrary Values

Use square brackets for any custom value:

```html
<div class="chai-w-[300px] chai-h-[200px] chai-bg-[#1a1a2e] chai-text-[14px] chai-p-[1.5rem]">
  Custom values!
</div>
```

---

## ⚙️ Configuration

```js
import { init } from 'chai-tailwind';

init({
  // Disable console warnings for unknown classes
  devMode: false,

  // Remove chai-* classes after processing
  removeClassesAfterProcessing: false,

  // Custom breakpoints
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
  },

  // Extend spacing scale
  spacingScale: {
    '100': '25rem',
    '128': '32rem',
  },

  // Extend color palette
  colors: {
    brand: {
      50: '#f0f9ff',
      500: '#0ea5e9',
      900: '#0c4a6e',
    },
  },
});
```

---

## 🔌 Plugin System

Create custom utilities by registering plugins:

```js
import { init, registerPlugin, createPlugin } from 'chai-tailwind';

const gradientPlugin = createPlugin({
  name: 'gradients',
  utilities: {
    'gradient': (value, config) => {
      const gradients = {
        'primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'sunset': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'ocean': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      };
      if (gradients[value]) {
        return { property: 'background', value: gradients[value] };
      }
      return null;
    },
  },
});

init();
registerPlugin(gradientPlugin);

// Now use: <div class="chai-gradient-sunset">...</div>
```

---

## 🔄 Dynamic DOM Updates

Chai-Tailwind automatically watches for DOM changes via MutationObserver:

```js
// Elements added dynamically are automatically styled
const div = document.createElement('div');
div.className = 'chai-p-4 chai-bg-green-500 chai-rounded-lg';
document.body.appendChild(div); // ← styled automatically!
```

---

## 🧪 API Reference

### `init(config?, options?)`
Initialize the engine, scan DOM, start observing.

### `scan(root?)`
Manually scan a root element for chai classes.

### `observe(root?)`
Start MutationObserver on a root element.

### `destroy()`
Disconnect observer, remove injected styles, clear cache.

### `configure(config?)`
Set config without initializing.

### `registerPlugin(plugin)`
Register a plugin for custom utilities.

### `createPlugin(definition)`
Create a validated plugin object.

---

## 📁 Project Structure

```
chai-tailwind/
├── src/
│   ├── index.js              # Public API entry point
│   ├── core/
│   │   ├── engine.js          # Main orchestrator
│   │   ├── parser.js          # Class name tokenizer
│   │   ├── resolver.js        # Token → CSS resolver
│   │   ├── applicator.js      # Style applier + CSS injector
│   │   └── cache.js           # LRU cache
│   ├── utilities/             # 8 utility modules
│   ├── variants/              # Responsive + pseudo handlers
│   ├── plugins/               # Plugin API
│   └── config/                # Config defaults + loader
├── tests/                     # 83 tests (Vitest + jsdom)
├── demo/                      # Interactive demo
└── dist/                      # Built output (ESM + CJS + IIFE)
```

---

## 🤝 Contributing

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build: `npm run build`
5. Submit a pull request

---

## 📄 License

[MIT](LICENSE) © Chai-Tailwind Contributors
