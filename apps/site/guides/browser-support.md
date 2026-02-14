---
title: Browser Support
description: Which browsers Sando Design System supports, minimum versions for OKLCH colors and Web Components, and how to verify compatibility.
---

# Browser Support

Sando is built on modern web standards — Web Components, CSS Custom Properties, and the OKLCH color space. Like choosing the freshest ingredients for your sando, we target browsers that support the full set of features needed for a great experience.

## Supported Browsers

### Desktop

| Browser     | Minimum Version | Status             |
| ----------- | --------------- | ------------------ |
| **Chrome**  | 111+            | ✅ Fully Supported |
| **Edge**    | 111+            | ✅ Fully Supported |
| **Firefox** | 113+            | ✅ Fully Supported |
| **Safari**  | 15.4+           | ✅ Fully Supported |
| **Opera**   | 97+             | ✅ Fully Supported |

### Mobile

| Browser              | Minimum Version | Status             |
| -------------------- | --------------- | ------------------ |
| **Chrome Mobile**    | 111+            | ✅ Fully Supported |
| **Safari iOS**       | 15.4+           | ✅ Fully Supported |
| **Samsung Internet** | 22+             | ✅ Fully Supported |
| **Firefox Mobile**   | 113+            | ✅ Fully Supported |

::: tip Why These Versions?
The minimum versions are driven by **OKLCH color support**. Sando uses `oklch()` for all color definitions — it's the ingredient that makes our contrast guarantees and flavor system possible. These are the first browser versions with full OKLCH support.
:::

## Required Web Platform Features

Sando components rely on these modern capabilities. Think of them as the essential kitchen equipment — without them, you can't prepare the dish.

### OKLCH Color Space

The defining feature of Sando's token system. Every color is defined in OKLCH for perceptual uniformity:

```css
/* Lightness, Chroma, Hue — perceptually uniform */
--sando-color-brown-500: oklch(0.65 0.08 50);
```

| Browser | First Version with OKLCH |
| ------- | ------------------------ |
| Chrome  | 111                      |
| Firefox | 113                      |
| Safari  | 15.4                     |
| Edge    | 111                      |

### Web Components

- **Custom Elements v1** — For defining `<sando-button>`, `<sando-input>`, and all other components
- **Shadow DOM v1** — For style encapsulation (your styles don't leak in, ours don't leak out)
- **HTML Templates** — For efficient DOM cloning

### CSS Features

- **CSS Custom Properties** — The backbone of the token system and flavor switching
- **CSS Grid & Flexbox** — For internal component layouts
- **`gap` property** — For spacing within components
- **`:focus-visible`** — For accessible focus indicators that only appear on keyboard navigation
- **`@media (prefers-color-scheme)`** — For automatic dark mode
- **`@media (prefers-contrast)`** — For high contrast mode
- **`@media (prefers-reduced-motion)`** — For motion-safe animations

### Modern JavaScript

- **ES Modules** — Native `import` / `export`
- **ES2020+** — Optional chaining (`?.`), nullish coalescing (`??`), dynamic `import()`
- **Decorators** — Used internally by Lit 3 (transpiled at build time)

## Polyfills

Sando does **not** include polyfills. The supported browser versions all have native support for every feature Sando requires — Web Components, OKLCH, CSS Custom Properties, and ES Modules.

If you need to support older browsers, you'll need to provide your own polyfills for Web Components:

```bash
npm install @webcomponents/webcomponentsjs
```

```html
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
<script type="module" src="./your-app.js"></script>
```

::: warning OKLCH Cannot Be Polyfilled
While Web Components can be polyfilled, OKLCH colors cannot. Browsers that don't support `oklch()` will ignore those color declarations entirely. There is no JavaScript polyfill for a CSS color function. This is the primary reason Sando requires modern browser versions.
:::

## Testing Matrix

Sando runs automated tests across multiple browsers using Playwright:

- ✅ **Chromium** (latest 2 versions)
- ✅ **Firefox** (latest 2 versions)
- ✅ **WebKit** (latest 2 versions)

```typescript
// playwright.config.ts
export default {
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
};
```

## Performance Targets

We aim for these metrics on supported browsers:

| Metric                    | Target      |
| ------------------------- | ----------- |
| First Contentful Paint    | < 1.5s      |
| Time to Interactive       | < 3.5s      |
| Component Mount Time      | < 100ms     |
| Bundle Size per Component | < 15KB gzip |

## Accessibility Across Browsers

All supported browsers pass Sando's accessibility requirements:

- ✅ Keyboard navigation works consistently
- ✅ Screen readers properly announce components
- ✅ ARIA attributes are respected
- ✅ Focus management works correctly
- ✅ `@media` queries for dark mode, high contrast, and reduced motion respond correctly

### Tested Screen Readers

| Platform | Screen Reader | Browser         |
| -------- | ------------- | --------------- |
| Windows  | NVDA          | Firefox, Chrome |
| Windows  | JAWS          | Chrome, Edge    |
| macOS    | VoiceOver     | Safari          |
| iOS      | VoiceOver     | Safari          |
| Android  | TalkBack      | Chrome          |

## Feature Detection

Use feature detection for progressive enhancement:

```javascript
// Check for all required features
const sandoSupported = {
  customElements: "customElements" in window,
  shadowDOM: "attachShadow" in Element.prototype,
  cssVariables: CSS.supports("(--a: 0)"),
  oklch: CSS.supports("color", "oklch(0.5 0.1 200)"),
  esModules: "noModule" in HTMLScriptElement.prototype,
};

if (Object.values(sandoSupported).every(Boolean)) {
  // All features supported — load Sando components
  import("@sando/components/button");
} else {
  console.warn("Browser missing required features for Sando:", sandoSupported);
}
```

## Unsupported Browsers

We **do not** support:

- ❌ Internet Explorer (all versions)
- ❌ Edge Legacy (pre-Chromium)
- ❌ Safari < 15.4 (no OKLCH support)
- ❌ Chrome < 111 (no OKLCH support)
- ❌ Firefox < 113 (no OKLCH support)

## Deprecation Policy

- We support the **latest 2 major versions** of each browser
- Minimum browser versions may increase as new CSS features are adopted
- Breaking changes to browser support are communicated in release notes
- We provide at least **6 months notice** before dropping support for a browser version

## Resources

- [Can I Use: OKLCH](https://caniuse.com/mdn-css_types_color_oklch) — Check OKLCH browser support
- [Can I Use: Web Components](https://caniuse.com/custom-elementsv1) — Check Custom Elements support
- [GitHub Issues](https://github.com/rodrigolagodev/SandoDesignSystem/issues) — Report browser-specific issues
- [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions) — Ask questions about compatibility
