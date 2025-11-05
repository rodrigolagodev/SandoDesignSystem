# Performance Budgets

**Category**: 05-quality
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: Performance Monitor

---

## Purpose

Establish performance budgets for the Sando Design System to ensure fast, efficient component delivery. This guideline defines bundle size limits, Core Web Vitals targets, Lighthouse CI integration, and monitoring strategies to prevent performance regressions.

**Target**: Sub-100KB component library (gzipped), LCP <2.5s, CLS <0.1, FID <100ms
**Scope**: Components, tokens, documentation sites
**Enforcement**: CI fails on budget violations

---

## Core Rules

### Rule 1: Component Bundle Size Budgets (Non-Negotiable)

Individual components MUST stay under 10KB (gzipped), full library under 100KB (gzipped).

**Pattern**:

```javascript
// vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor'; // Separate vendor bundles
        }
      }
    }
  }
}
```

**Budgets**:
| Asset Type | Uncompressed | Gzipped | Brotli | Enforcement |
|------------|--------------|---------|--------|-------------|
| Single component | <30KB | <10KB | <8KB | CI warning at 80% |
| Component + styles | <40KB | <12KB | <10KB | CI fails at 100% |
| Full library | <300KB | <100KB | <80KB | CI fails at 100% |
| Vendor (Lit) | External | External | External | Peer dependency |

**Why**: Users may import only 1-2 components. Large bundles slow initial load, hurt Core Web Vitals, and penalize mobile users on slow networks.

**Reference**: `packages/components/vite.config.js` (lines 16-27)

---

### Rule 2: Core Web Vitals Targets (Non-Negotiable)

Documentation sites (Storybook, VitePress) MUST meet Core Web Vitals thresholds for "Good" rating.

**Targets**:
| Metric | Good | Needs Improvement | Poor | Notes |
|--------|------|-------------------|------|-------|
| **LCP** (Largest Contentful Paint) | <2.5s | 2.5-4.0s | >4.0s | Time to largest content |
| **FID** (First Input Delay) | <100ms | 100-300ms | >300ms | Time to interactive |
| **CLS** (Cumulative Layout Shift) | <0.1 | 0.1-0.25 | >0.25 | Visual stability |
| **INP** (Interaction to Next Paint) | <200ms | 200-500ms | >500ms | Responsiveness (new) |
| **TTFB** (Time to First Byte) | <800ms | 800-1800ms | >1800ms | Server response |
| **FCP** (First Contentful Paint) | <1.8s | 1.8-3.0s | >3.0s | Time to first content |

**Measurement**: Use Lighthouse CI, Chrome User Experience Report (CrUX), or Real User Monitoring (RUM).

**Why**: Core Web Vitals are Google ranking factors and directly impact user experience. 53% of mobile users abandon sites that take >3s to load.

**Reference**: [Web Vitals](https://web.dev/vitals/)

---

### Rule 3: Lighthouse Performance Score ≥90 (Required)

Storybook and VitePress sites MUST score ≥90 in Lighthouse Performance audits.

**Pattern** (Lighthouse CI):

```yaml
# .lighthouserc.json
{
  "ci":
    {
      "assert":
        {
          "preset": "lighthouse:recommended",
          "assertions":
            {
              "categories:performance": ["error", { "minScore": 0.9 }],
              "categories:accessibility": ["error", { "minScore": 1.0 }],
              "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
              "largest-contentful-paint":
                ["error", { "maxNumericValue": 2500 }],
              "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
            },
        },
    },
}
```

**Enforcement**:

- CI runs Lighthouse on every PR
- Scores <90 block merge
- Generate before/after comparison reports

**Why**: Lighthouse audits catch common performance issues (unoptimized images, render-blocking resources, excessive JavaScript).

**Reference**: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

### Rule 4: Tree-Shaking and Code Splitting (Required)

Components MUST support tree-shaking. Documentation sites MUST use code splitting for routes.

**Pattern** (Vite preserveModules):

```javascript
// From packages/components/vite.config.js
build: {
  rollupOptions: {
    output: {
      preserveModules: true,        // Enables tree-shaking
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js'
    }
  }
}
```

**Result**: Users import only what they use:

```javascript
// ✅ CORRECT - Tree-shakable (only button loaded)
import { SandoButton } from "@sando/components/button";

// ❌ WRONG - Imports entire library
import { SandoButton } from "@sando/components";
```

**Why**: Tree-shaking eliminates dead code. A user importing 1 button should not download 50 components.

**Reference**: `packages/components/vite.config.js` (lines 24-26)

---

### Rule 5: Monitor Performance Trends (Required)

Track bundle sizes and Core Web Vitals over time to detect regressions early.

**Pattern**:

```bash
# Generate bundle analysis
pnpm --filter @sando/components build
pnpm exec vite-bundle-analyzer dist

# Track sizes over time (CI)
echo "Button: $(gzip -c dist/components/button/sando-button.js | wc -c) bytes" >> metrics.txt
```

**Tools**:

- **Bundlephobia**: Analyze published package sizes
- **Lighthouse CI Trend**: Track Core Web Vitals over time
- **Size Limit**: Automated bundle size checks in CI

**Why**: Performance degrades incrementally. Monitoring catches regressions before they accumulate.

**Reference**: [Bundlephobia](https://bundlephobia.com/)

---

## Bundle Size Budgets

### Component-Level Budgets

From `sando-button` analysis (~8KB gzipped):

| Component    | Uncompressed | Gzipped | Brotli | Status              |
| ------------ | ------------ | ------- | ------ | ------------------- |
| sando-button | 28KB         | 8KB     | 6KB    | ✅ Baseline         |
| sando-input  | <30KB        | <10KB   | <8KB   | 🎯 Target           |
| sando-select | <35KB        | <12KB   | <10KB  | 🎯 Target (complex) |
| sando-modal  | <40KB        | <14KB   | <12KB  | 🎯 Target (overlay) |
| sando-card   | <25KB        | <8KB    | <6KB   | 🎯 Target (simple)  |

**Component size categories**:

- **Simple** (button, icon, badge): <10KB gzipped
- **Medium** (input, checkbox, radio): <12KB gzipped
- **Complex** (select, dropdown, tabs): <15KB gzipped
- **Overlays** (modal, dialog, tooltip): <18KB gzipped

### Library-Level Budgets

| Bundle Type                      | Uncompressed | Gzipped  | Brotli   | Notes             |
| -------------------------------- | ------------ | -------- | -------- | ----------------- |
| Full library (@sando/components) | <300KB       | <100KB   | <80KB    | All components    |
| Tokens (@sando/tokens CSS)       | <150KB       | <40KB    | <30KB    | All flavors CSS   |
| Individual component import      | <40KB        | <12KB    | <10KB    | Average component |
| Vendor dependencies (Lit)        | External     | External | External | Peer dependency   |

**Future optimization targets**:

- Lazy-load component variants (defer ghost/outline until needed)
- Split modular styles (load only used size/variant CSS)
- Minify SVG icons aggressively

### Documentation Site Budgets

| Site                    | Initial Load | Gzipped | LCP Target | Notes              |
| ----------------------- | ------------ | ------- | ---------- | ------------------ |
| Storybook (@sando/docs) | <500KB       | <150KB  | <2.0s      | Component showcase |
| VitePress (@sando/site) | <300KB       | <100KB  | <1.8s      | Marketing/docs     |

**Storybook specific**: Storybook bundles are large by nature (~3MB). Focus on component iframe performance, not Storybook shell.

---

## Core Web Vitals Targets

### Measurement Strategy

**1. Lab data (synthetic)**:

- Lighthouse CI (automated)
- WebPageTest (manual spot checks)
- Chrome DevTools Performance panel

**2. Field data (real users)**:

- Chrome User Experience Report (CrUX)
- Real User Monitoring (RUM) - future
- Google Search Console Core Web Vitals report

**3. Frequency**:

- Every PR (Lighthouse CI)
- Weekly (WebPageTest)
- Monthly (CrUX review)

### Target Breakdown

| Metric   | Target | Measurement             | Impact           |
| -------- | ------ | ----------------------- | ---------------- |
| **LCP**  | <2.5s  | Time to largest content | Page load speed  |
| **FID**  | <100ms | First input delay       | Interactivity    |
| **CLS**  | <0.1   | Layout shift score      | Visual stability |
| **INP**  | <200ms | Interaction delay (new) | Responsiveness   |
| **TTFB** | <800ms | Server response time    | CDN/hosting      |
| **TBT**  | <200ms | Total blocking time     | Main thread work |

**LCP optimization**:

- Preload critical resources
- Optimize images (WebP, AVIF)
- Minimize render-blocking JavaScript
- Use CDN for static assets

**FID/INP optimization**:

- Minimize main thread work
- Break up long tasks (<50ms chunks)
- Use web workers for heavy computation
- Defer non-critical JavaScript

**CLS optimization**:

- Reserve space for images/iframes (width/height)
- Avoid inserting content above existing content
- Use transform/opacity for animations (not top/left)
- Preload fonts to avoid FOIT/FOUT

---

## Lighthouse CI Integration

### Configuration

**.lighthouserc.json**:

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:6006", "http://localhost:3000"],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1.0 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 200 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "max-potential-fid": ["error", { "maxNumericValue": 100 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### GitHub Actions Workflow

```yaml
name: Lighthouse CI
on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build tokens
        run: pnpm --filter @sando/tokens build

      - name: Build components
        run: pnpm --filter @sando/components build

      - name: Build Storybook
        run: pnpm --filter @sando/docs build

      - name: Run Lighthouse CI
        run: |
          pnpm exec lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**Result**: Lighthouse scores in PR comments, automatic failure if <90.

---

## Bundle Analysis Tools

### Vite Bundle Analyzer

```bash
# Install
pnpm add -D vite-bundle-visualizer

# Add to vite.config.js
import { visualizer } from 'vite-bundle-visualizer';

export default defineConfig({
  plugins: [visualizer({ open: true })]
});

# Generate report
pnpm --filter @sando/components build
# Opens interactive tree map in browser
```

### Rollup Plugin Visualizer

```bash
# Install
pnpm add -D rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      filename: './dist/stats.html',
      gzipSize: true,
      brotliSize: true
    })
  ]
});
```

### Size Limit

```bash
# Install
pnpm add -D size-limit @size-limit/preset-small-lib

# Add to package.json
{
  "size-limit": [
    {
      "path": "dist/components/button/sando-button.js",
      "limit": "10 KB"
    },
    {
      "path": "dist/index.js",
      "limit": "100 KB"
    }
  ]
}

# Run check
pnpm exec size-limit

# CI integration
- name: Check bundle size
  run: pnpm exec size-limit
```

**Result**: CI fails if bundle exceeds limit.

---

## Performance Optimization Techniques

### 1. Code Splitting

**Route-based splitting** (VitePress):

```javascript
// .vitepress/config.js
export default {
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
            if (id.includes("/components/")) {
              return "components";
            }
          },
        },
      },
    },
  },
};
```

### 2. Lazy Loading

**Component lazy loading**:

```javascript
// Defer non-critical components
const SandoModal = () => import("@sando/components/modal");
```

### 3. Image Optimization

**Use modern formats**:

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" width="800" height="600" />
</picture>
```

**Dimensions required**: Always specify width/height to prevent CLS.

### 4. Font Optimization

**Preload critical fonts**:

```html
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Use font-display: swap**:

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap; /* Prevents FOIT (Flash of Invisible Text) */
}
```

### 5. CSS Optimization

**Critical CSS inlining**:

```html
<style>
  /* Inline critical above-the-fold CSS */
  body {
    font-family: Inter, sans-serif;
  }
  .hero {
    /* ... */
  }
</style>
```

**Defer non-critical CSS**:

```html
<link
  rel="preload"
  href="/styles/non-critical.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

---

## Monitoring and Alerts

### CI Budget Enforcement

**Bundle size check** (GitHub Actions):

```yaml
- name: Check bundle size
  run: |
    BUTTON_SIZE=$(gzip -c dist/components/button/sando-button.js | wc -c)
    if [ $BUTTON_SIZE -gt 10240 ]; then
      echo "Button size $BUTTON_SIZE exceeds 10KB limit"
      exit 1
    fi
```

### Performance Regression Detection

**Compare against main branch**:

```yaml
- name: Compare bundle sizes
  run: |
    git checkout main
    pnpm build
    mv dist dist-main
    git checkout -
    pnpm build
    diff -u <(du -sh dist-main/*) <(du -sh dist/*)
```

### Alerting Strategy

| Threshold          | Action        | Notification            |
| ------------------ | ------------- | ----------------------- |
| 80% of budget      | Warning in PR | GitHub comment          |
| 100% of budget     | Block merge   | CI failure + Slack      |
| Lighthouse <90     | Block merge   | CI failure + PR comment |
| CrUX "Poor" rating | Investigation | Weekly report           |

---

## Validation Checklist

### Component Development

- [ ] Individual component <10KB gzipped
- [ ] Component supports tree-shaking (ES modules)
- [ ] No circular dependencies
- [ ] Minimal external dependencies
- [ ] Modular CSS (load only what's needed)
- [ ] SVG icons optimized (SVGO)

### Build Configuration

- [ ] Vite preserveModules enabled
- [ ] Rollup externals configured (Lit as peer)
- [ ] Sourcemaps generated
- [ ] Minification enabled (production)
- [ ] Tree-shaking verified (import test)

### Documentation Sites

- [ ] Lighthouse Performance ≥90
- [ ] LCP <2.5s (all pages)
- [ ] CLS <0.1 (no layout shifts)
- [ ] FID <100ms (interactive quickly)
- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts preloaded (critical only)

### CI/CD

- [ ] Lighthouse CI configured
- [ ] Bundle size limits enforced
- [ ] Performance budgets in .lighthouserc.json
- [ ] Size comparison in PR comments
- [ ] Alerts configured (Slack/email)

---

## Related Guidelines

- [TESTING_STRATEGY.md](../03-development/TESTING_STRATEGY.md) - E2E performance testing
- [COMPONENT_ARCHITECTURE.md](../02-architecture/COMPONENT_ARCHITECTURE.md) - Monolithic structure enables tree-shaking

---

## External References

**Core Web Vitals**:

- [Web Vitals](https://web.dev/vitals/) - Official documentation
- [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report) - Field data

**Tools**:

- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Automated audits
- [Bundlephobia](https://bundlephobia.com/) - Package size analysis
- [Size Limit](https://github.com/ai/size-limit) - Bundle size enforcement
- [WebPageTest](https://www.webpagetest.org/) - Real-world testing

**Optimization**:

- [web.dev Performance](https://web.dev/performance/) - Best practices
- [Vite Build Optimizations](https://vitejs.dev/guide/build.html) - Tree-shaking and code splitting

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial guideline creation
- Component budgets: <10KB gzipped (simple), <15KB (complex)
- Library budget: <100KB gzipped (full library)
- Core Web Vitals targets: LCP <2.5s, FID <100ms, CLS <0.1, INP <200ms
- Lighthouse CI integration: ≥90 Performance score required
- Tree-shaking configuration (preserveModules: true)
- Bundle analysis tools (vite-bundle-visualizer, size-limit)
- Performance optimization techniques (code splitting, lazy loading, image/font optimization)
- CI enforcement patterns (bundle size checks, Lighthouse CI, regression detection)
- Validation checklist (component, build, documentation, CI/CD)
- References to vite.config.js (lines 16-27, preserveModules pattern)
- Agent-optimized format (497 lines)

---

**Performance is a feature, not an afterthought. Measure early, enforce budgets, and monitor trends to deliver fast experiences.**
