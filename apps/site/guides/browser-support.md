# Browser Support

Sando Design System is built with modern web standards and supports all evergreen browsers.

## Supported Browsers

### Desktop

| Browser     | Minimum Version | Status             |
| ----------- | --------------- | ------------------ |
| **Chrome**  | 90+             | ✅ Fully Supported |
| **Edge**    | 90+             | ✅ Fully Supported |
| **Firefox** | 88+             | ✅ Fully Supported |
| **Safari**  | 14+             | ✅ Fully Supported |
| **Opera**   | 76+             | ✅ Fully Supported |

### Mobile

| Browser              | Minimum Version | Status             |
| -------------------- | --------------- | ------------------ |
| **Chrome Mobile**    | 90+             | ✅ Fully Supported |
| **Safari iOS**       | 14+             | ✅ Fully Supported |
| **Samsung Internet** | 15+             | ✅ Fully Supported |
| **Firefox Mobile**   | 88+             | ✅ Fully Supported |

## Required Web Platform Features

Sando components rely on these modern web platform features:

### ES2020

All JavaScript features from ES2020 are required:

- Optional chaining (`?.`)
- Nullish coalescing (`??`)
- `BigInt`
- `Promise.allSettled()`
- `String.prototype.matchAll()`
- `import()` dynamic imports

### Web Components

- **Custom Elements v1**: For defining custom HTML elements
- **Shadow DOM v1**: For style encapsulation
- **HTML Templates**: For efficient DOM cloning

### CSS Features

- **CSS Custom Properties**: For theming and design tokens
- **CSS Grid**: For layout
- **CSS Flexbox**: For component layouts
- **CSS `gap` property**: For spacing
- **`:focus-visible`**: For accessible focus indicators

### Modern JavaScript APIs

- **ES Modules**: Native module support
- **Promises**: Async operations
- **Fetch API**: HTTP requests (if needed)
- **IntersectionObserver**: For lazy loading (if used)

## Polyfills

Sando does **not** include polyfills by default. If you need to support older browsers, you'll need to provide your own polyfills.

### Web Components Polyfills

For browsers that don't support Web Components natively:

```bash
npm install @webcomponents/webcomponentsjs
```

```html
<!-- Load polyfills -->
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>

<!-- Then load your components -->
<script type="module" src="./your-app.js"></script>
```

## Testing Matrix

We test Sando components on:

- ✅ **Chrome** (latest 2 versions)
- ✅ **Firefox** (latest 2 versions)
- ✅ **Safari** (latest 2 versions)
- ✅ **Edge** (latest 2 versions)

### Automated Testing

Our CI/CD pipeline runs tests on multiple browsers using Playwright:

```javascript
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

We aim for these performance metrics on supported browsers:

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Component Mount Time**: < 100ms
- **Bundle Size**: < 15KB gzipped per component

## Known Issues

### Safari 14.0 - 14.1

- **Issue**: Shadow DOM CSS inheritance quirks
- **Status**: Fixed in Safari 14.1+
- **Workaround**: Update to Safari 14.1 or later

### Firefox < 90

- **Issue**: CSS `:focus-visible` not supported
- **Status**: Supported in Firefox 85+ with `-moz-` prefix
- **Workaround**: We automatically include the prefix

## Feature Detection

We recommend using feature detection for progressive enhancement:

```javascript
// Check for Web Components support
if ("customElements" in window) {
  // Load Web Components
  import("@sando/components/button");
} else {
  // Provide fallback or load polyfills
  console.warn("Web Components not supported");
}
```

## Accessibility Across Browsers

All supported browsers pass our accessibility requirements:

- ✅ Keyboard navigation works consistently
- ✅ Screen readers properly announce components
- ✅ ARIA attributes are respected
- ✅ Focus management works correctly

### Tested Screen Readers

- **NVDA** (Windows, Firefox/Chrome)
- **JAWS** (Windows, Chrome/Edge)
- **VoiceOver** (macOS, Safari)
- **VoiceOver** (iOS, Safari)
- **TalkBack** (Android, Chrome)

## Build Targets

Our build process targets these environments:

```json
{
  "targets": {
    "chrome": "90",
    "edge": "90",
    "firefox": "88",
    "safari": "14",
    "ios": "14"
  }
}
```

## Unsupported Browsers

We **do not** support:

- ❌ Internet Explorer (all versions)
- ❌ Edge Legacy (pre-Chromium)
- ❌ Safari < 14
- ❌ Chrome < 90
- ❌ Firefox < 88

## Checking Your Browser

Want to verify your browser is compatible? Open your browser's console and run:

```javascript
console.log({
  customElements: "customElements" in window,
  shadowDOM: "attachShadow" in Element.prototype,
  cssVariables: CSS.supports("(--a: 0)"),
  esModules: "noModule" in HTMLScriptElement.prototype,
});
```

All values should be `true` for full compatibility.

## Updates and Deprecation Policy

- We support the **latest 2 major versions** of each browser
- Minimum browser versions may increase as new features are adopted
- Breaking changes to browser support will be communicated in release notes
- We'll provide at least **6 months notice** before dropping support for a browser version

## Questions?

If you have questions about browser support:

- Check [Can I Use](https://caniuse.com/) for feature compatibility
- Ask in [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions)
- Report issues in [GitHub Issues](https://github.com/rodrigolagodev/SandoDesignSystem/issues)
