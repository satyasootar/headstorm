# ☕ head-Tailwind

> A lightweight, zero-dependency, runtime utility-first CSS engine. Write `head-*` classes in your HTML, get instant inline styles — **no build step required**.

[![npm version](https://img.shields.io/npm/v/head-tailwind.svg)](https://www.npmjs.com/package/head-tailwind)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/head-tailwind)](https://bundlephobia.com/package/head-tailwind)

---

## ✨ What is head-Tailwind?

head-Tailwind brings Tailwind-like utility classes to your HTML **at runtime**. No PostCSS, no CLI, no purging — just drop a script tag or import the module and your `head-*` classes become live styles.

```html
<div class="head-flex head-justify-center head-items-center head-p-8 head-bg-blue-500 head-text-white head-rounded-xl">
  Hello, Chai! ☕
</div>
```

### Key Features

- 🚀 **Zero build step** — works instantly via `<script>` tag or ESM import
- 📦 **Zero dependencies** — pure JavaScript, ~25KB minified
- 🎨 **100+ utility classes** — spacing, colors, typography, borders, layout, flexbox, sizing, effects
- 📱 **Responsive variants** — `head-sm:p-4`, `head-md:flex`, `head-lg:text-xl`
- 🖱️ **Pseudo-class variants** — `head-hover:bg-red-500`, `head-focus:border-blue-500`
- 🔄 **Dynamic DOM updates** — MutationObserver auto-styles new elements
- 🔌 **Plugin system** — extend with custom utilities
- 🎯 **Arbitrary values** — `head-w-[300px]`, `head-bg-[#ff6600]`
- ⚡ **Performance optimized** — LRU cache, batched DOM writes, debounced observer

---

## 📦 Installation

### npm / yarn / pnpm

```bash
npm install head-tailwind
```

### CDN (Script Tag)

```html
<!-- Auto-initializes on DOMContentLoaded -->
<script src="https://unpkg.com/head-tailwind/dist/index.global.js"></script>
```

---

## 🚀 Quick Start

### Option 1: Script Tag (Zero Config)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/head-tailwind/dist/index.global.js"></script>
</head>
<body>
  <div class="head-flex head-justify-center head-items-center head-min-h-screen head-bg-gray-900">
    <div class="head-p-8 head-bg-white head-rounded-2xl head-shadow-xl">
      <h1 class="head-text-3xl head-font-bold head-text-gray-800">Hello, World!</h1>
      <p class="head-mt-4 head-text-gray-500 head-text-lg">Powered by head-Tailwind ☕</p>
    </div>
  </div>
</body>
</html>
```

### Option 2: ESM Import

```js
import { init } from 'head-tailwind';

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
const { init } = require('head-tailwind');
init();
```

---

## 📚 Supported Utilities

### Spacing

| Class | CSS Output |
|---|---|
| `head-p-{n}` | `padding: {scale}` |
| `head-pt-{n}` / `head-pb-{n}` / `head-pl-{n}` / `head-pr-{n}` | Directional padding |
| `head-px-{n}` / `head-py-{n}` | Horizontal / Vertical padding |
| `head-m-{n}` | `margin: {scale}` |
| `head-mt-{n}` / `head-mb-{n}` / `head-ml-{n}` / `head-mr-{n}` | Directional margin |
| `head-mx-auto` | Center horizontally |

**Scale:** 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

### Colors

| Class | CSS Output |
|---|---|
| `head-bg-{color}` | `background-color: {color}` |
| `head-text-{color}` | `color: {color}` |
| `head-border-{color}` | `border-color: {color}` |

**Palette:** slate, gray, zinc, neutral, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose + white, black, transparent

**Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### Typography

| Class | CSS Output |
|---|---|
| `head-text-{size}` | `font-size` — xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl |
| `head-font-{weight}` | `font-weight` — thin, extralight, light, normal, medium, semibold, bold, extrabold, black |
| `head-text-left` / `center` / `right` / `justify` | `text-align` |
| `head-leading-{value}` | `line-height` |
| `head-tracking-{value}` | `letter-spacing` |
| `head-italic` / `head-not-italic` | `font-style` |
| `head-underline` / `head-line-through` / `head-no-underline` | `text-decoration` |
| `head-uppercase` / `head-lowercase` / `head-capitalize` | `text-transform` |
| `head-truncate` | Overflow ellipsis |

### Borders

| Class | CSS Output |
|---|---|
| `head-border` | `border-width: 1px` |
| `head-border-{0\|2\|4\|8}` | `border-width` |
| `head-border-{color}` | `border-color` |
| `head-border-{style}` | solid, dashed, dotted, double, none |
| `head-rounded` | `border-radius: 0.25rem` |
| `head-rounded-{size}` | none, sm, md, lg, xl, 2xl, 3xl, full |
| `head-rounded-{corner}` | t, b, l, r, tl, tr, bl, br |

### Layout

| Class | CSS Output |
|---|---|
| `head-flex` / `head-grid` / `head-block` / `head-inline` | `display` |
| `head-inline-flex` / `head-inline-block` / `head-inline-grid` | `display` |
| `head-hidden` | `display: none` |
| `head-relative` / `head-absolute` / `head-fixed` / `head-sticky` | `position` |
| `head-top-{n}` / `head-bottom-{n}` / `head-left-{n}` / `head-right-{n}` | Positioning |
| `head-inset-{n}` | All sides |
| `head-visible` / `head-invisible` | `visibility` |

### Flexbox

| Class | CSS Output |
|---|---|
| `head-flex-row` / `head-flex-col` | `flex-direction` |
| `head-flex-wrap` / `head-flex-nowrap` | `flex-wrap` |
| `head-justify-{value}` | start, end, center, between, around, evenly |
| `head-items-{value}` | start, end, center, baseline, stretch |
| `head-self-{value}` | `align-self` |
| `head-gap-{n}` | `gap` |
| `head-gap-x-{n}` / `head-gap-y-{n}` | Column/row gap |
| `head-grow` / `head-shrink` | Flex grow/shrink |
| `head-flex-1` / `head-flex-auto` / `head-flex-none` | Flex shortcuts |

### Sizing

| Class | CSS Output |
|---|---|
| `head-w-{n}` | `width` — scale values, full, screen, auto, min, max, fit |
| `head-h-{n}` | `height` |
| `head-min-w-{n}` / `head-min-h-{n}` | Min dimensions |
| `head-max-w-{n}` / `head-max-h-{n}` | Max dimensions — xs, sm, md, lg, xl, 2xl–7xl, prose, screen-* |
| `head-w-1/2` / `head-w-1/3` etc. | Fractional widths |

### Effects

| Class | CSS Output |
|---|---|
| `head-opacity-{0-100}` | `opacity` |
| `head-shadow` / `head-shadow-{size}` | sm, md, lg, xl, 2xl, inner, none |
| `head-cursor-{type}` | pointer, default, text, move, grab, etc. |
| `head-overflow-{value}` | auto, hidden, clip, visible, scroll |
| `head-overflow-x-{value}` / `head-overflow-y-{value}` | Axis overflow |
| `head-z-{n}` | `z-index` |

---

## 📱 Responsive Variants

Use breakpoint prefixes to apply styles at specific screen widths:

```html
<div class="head-p-4 head-sm:p-6 head-md:p-8 head-lg:p-12">
  Responsive padding!
</div>
```

| Prefix | Min Width |
|---|---|
| `head-sm:` | 640px |
| `head-md:` | 768px |
| `head-lg:` | 1024px |
| `head-xl:` | 1280px |
| `head-2xl:` | 1536px |

> Note: Responsive variants inject `@media` rules into a managed `<style>` tag since inline styles can't express media queries.

---

## 🖱️ Pseudo-Class Variants

```html
<button class="head-bg-blue-500 head-hover:bg-blue-700 head-focus:border-blue-300 head-cursor-pointer head-text-white head-p-4 head-rounded-lg">
  Hover me!
</button>
```

Supported: `hover`, `focus`, `active`, `visited`, `disabled`, `focus-within`, `focus-visible`, `first`, `last`, `odd`, `even`

---

## 🎯 Arbitrary Values

Use square brackets for any custom value:

```html
<div class="head-w-[300px] head-h-[200px] head-bg-[#1a1a2e] head-text-[14px] head-p-[1.5rem]">
  Custom values!
</div>
```

---

## ⚙️ Configuration

```js
import { init } from 'head-tailwind';

init({
  // Disable console warnings for unknown classes
  devMode: false,

  // Remove head-* classes after processing
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
import { init, registerPlugin, createPlugin } from 'head-tailwind';

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

// Now use: <div class="head-gradient-sunset">...</div>
```

---

## 🔄 Dynamic DOM Updates

head-Tailwind automatically watches for DOM changes via MutationObserver:

```js
// Elements added dynamically are automatically styled
const div = document.createElement('div');
div.className = 'head-p-4 head-bg-green-500 head-rounded-lg';
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
head-tailwind/
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

[MIT](LICENSE) © head-Tailwind Contributors
