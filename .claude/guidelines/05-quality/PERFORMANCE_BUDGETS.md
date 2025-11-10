<guideline doc_id="PB" category="05-quality" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Performance Monitor">

  <purpose id="PB-PU">
    Establish performance budgets for the Sando Design System to ensure fast, efficient component delivery. Defines bundle size limits, Core Web Vitals targets, Lighthouse CI integration, and monitoring strategies to prevent performance regressions.
  </purpose>

  <targets id="PB-TGT">
    <target>Sub-100KB component library (gzipped)</target>
    <target>LCP less than 2.5s</target>
    <target>CLS less than 0.1</target>
    <target>FID less than 100ms</target>
  </targets>

  <scope id="PB-SC">
    Components, tokens, documentation sites
  </scope>

  <enforcement id="PB-ENF">
    CI fails on budget violations
  </enforcement>

<core_rules id="PB-CR">
<rule id="PB-CR-R1" title="Component Bundle Size Budgets (Non-Negotiable)">

<summary>
Individual components MUST stay under 10KB (gzipped), full library under 100KB (gzipped).
</summary>

      <pattern lang="javascript" title="Vite code splitting configuration">
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
      </pattern>

      <budgets>
        <budget asset="Single component" uncompressed="<30KB" gzipped="<10KB" brotli="<8KB" enforcement="CI warning at 80%"/>
        <budget asset="Component + styles" uncompressed="<40KB" gzipped="<12KB" brotli="<10KB" enforcement="CI fails at 100%"/>
        <budget asset="Full library" uncompressed="<300KB" gzipped="<100KB" brotli="<80KB" enforcement="CI fails at 100%"/>
        <budget asset="Vendor (Lit)" uncompressed="External" gzipped="External" brotli="External" enforcement="Peer dependency"/>
      </budgets>

      <why>
        Users may import only 1-2 components. Large bundles slow initial load, hurt Core Web Vitals, and penalize mobile users on slow networks.
      </why>

      <reference type="source_file" path="packages/components/vite.config.js" lines="16-27">
        Code splitting configuration
      </reference>
    </rule>

    <rule id="PB-CR-R2" title="Core Web Vitals Targets (Non-Negotiable)">
      <summary>
        Documentation sites (Storybook, VitePress) MUST meet Core Web Vitals thresholds for "Good" rating.
      </summary>

      <targets>
        <metric name="LCP" unit="Largest Contentful Paint" good="<2.5s" needs_improvement="2.5-4.0s" poor=">4.0s">
          Time to largest content
        </metric>
        <metric name="FID" unit="First Input Delay" good="<100ms" needs_improvement="100-300ms" poor=">300ms">
          Time to interactive
        </metric>
        <metric name="CLS" unit="Cumulative Layout Shift" good="<0.1" needs_improvement="0.1-0.25" poor=">0.25">
          Visual stability
        </metric>
        <metric name="INP" unit="Interaction to Next Paint" good="<200ms" needs_improvement="200-500ms" poor=">500ms">
          Responsiveness (new)
        </metric>
        <metric name="TTFB" unit="Time to First Byte" good="<800ms" needs_improvement="800-1800ms" poor=">1800ms">
          Server response
        </metric>
        <metric name="FCP" unit="First Contentful Paint" good="<1.8s" needs_improvement="1.8-3.0s" poor=">3.0s">
          Time to first content
        </metric>
      </targets>

      <measurement>
        Use Lighthouse CI, Chrome User Experience Report (CrUX), or Real User Monitoring (RUM).
      </measurement>

      <why>
        Core Web Vitals are Google ranking factors and directly impact user experience. 53% of mobile users abandon sites that take greater than 3s to load.
      </why>

      <reference type="external" url="https://web.dev/vitals/">
        Web Vitals
      </reference>
    </rule>

    <rule id="PB-CR-R3" title="Lighthouse Performance Score ≥90 (Required)">
      <summary>
        Storybook and VitePress sites MUST score ≥90 in Lighthouse Performance audits.
      </summary>

      <pattern lang="json" title="Lighthouse CI configuration">
        // .lighthouserc.json
        {
          "ci": {
            "assert": {
              "preset": "lighthouse:recommended",
              "assertions": {
                "categories:performance": ["error", { "minScore": 0.9 }],
                "categories:accessibility": ["error", { "minScore": 1.0 }],
                "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
                "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
                "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
              }
            }
          }
        }
      </pattern>

      <enforcement>
        <item>CI runs Lighthouse on every PR</item>
        <item>Scores less than 90 block merge</item>
        <item>Generate before/after comparison reports</item>
      </enforcement>

      <why>
        Lighthouse audits catch common performance issues (unoptimized images, render-blocking resources, excessive JavaScript).
      </why>

      <reference type="external" url="https://github.com/GoogleChrome/lighthouse-ci">
        Lighthouse CI
      </reference>
    </rule>

    <rule id="PB-CR-R4" title="Tree-Shaking and Code Splitting (Required)">
      <summary>
        Components MUST support tree-shaking. Documentation sites MUST use code splitting for routes.
      </summary>

      <pattern lang="javascript" title="Vite preserveModules for tree-shaking">
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
      </pattern>

      <correct_usage lang="javascript" title="✅ Tree-shakable import">
        // Only button loaded
        import { SandoButton } from "@sando/components/button";
      </correct_usage>

      <anti_pattern lang="javascript" title="❌ Imports entire library">
        import { SandoButton } from "@sando/components";
      </anti_pattern>

      <why>
        Tree-shaking eliminates dead code. A user importing 1 button should not download 50 components.
      </why>

      <reference type="source_file" path="packages/components/vite.config.js" lines="24-26">
        preserveModules configuration
      </reference>
    </rule>

    <rule id="PB-CR-R5" title="Monitor Performance Trends (Required)">
      <summary>
        Track bundle sizes and Core Web Vitals over time to detect regressions early.
      </summary>

      <pattern lang="bash">
        # Generate bundle analysis
        pnpm --filter @sando/components build
        pnpm exec vite-bundle-analyzer dist

        # Track sizes over time (CI)
        echo "Button: $(gzip -c dist/components/button/sando-button.js | wc -c) bytes" >> metrics.txt
      </pattern>

      <tools>
        <tool name="Bundlephobia">Analyze published package sizes</tool>
        <tool name="Lighthouse CI Trend">Track Core Web Vitals over time</tool>
        <tool name="Size Limit">Automated bundle size checks in CI</tool>
      </tools>

      <why>
        Performance degrades incrementally. Monitoring catches regressions before they accumulate.
      </why>

      <reference type="external" url="https://bundlephobia.com/">
        Bundlephobia
      </reference>
    </rule>

</core_rules>

<bundle_size_budgets id="PB-BSB">
<component_level id="PB-BSB-CL">

<summary>
From sando-button analysis (~8KB gzipped)
</summary>

      <components>
        <component name="sando-button" uncompressed="28KB" gzipped="8KB" brotli="6KB" status="✅ Baseline"/>
        <component name="sando-input" uncompressed="<30KB" gzipped="<10KB" brotli="<8KB" status="🎯 Target"/>
        <component name="sando-select" uncompressed="<35KB" gzipped="<12KB" brotli="<10KB" status="🎯 Target (complex)"/>
        <component name="sando-modal" uncompressed="<40KB" gzipped="<14KB" brotli="<12KB" status="🎯 Target (overlay)"/>
        <component name="sando-card" uncompressed="<25KB" gzipped="<8KB" brotli="<6KB" status="🎯 Target (simple)"/>
      </components>

      <categories>
        <category name="Simple" examples="button, icon, badge" gzipped="<10KB"/>
        <category name="Medium" examples="input, checkbox, radio" gzipped="<12KB"/>
        <category name="Complex" examples="select, dropdown, tabs" gzipped="<15KB"/>
        <category name="Overlays" examples="modal, dialog, tooltip" gzipped="<18KB"/>
      </categories>
    </component_level>

    <library_level id="PB-BSB-LL">
      <bundles>
        <bundle name="Full library (@sando/components)" uncompressed="<300KB" gzipped="<100KB" brotli="<80KB">
          All components
        </bundle>
        <bundle name="Tokens (@sando/tokens CSS)" uncompressed="<150KB" gzipped="<40KB" brotli="<30KB">
          All flavors CSS
        </bundle>
        <bundle name="Individual component import" uncompressed="<40KB" gzipped="<12KB" brotli="<10KB">
          Average component
        </bundle>
        <bundle name="Vendor dependencies (Lit)" uncompressed="External" gzipped="External" brotli="External">
          Peer dependency
        </bundle>
      </bundles>

      <future_optimizations>
        <optimization>Lazy-load component variants (defer ghost/outline until needed)</optimization>
        <optimization>Split modular styles (load only used size/variant CSS)</optimization>
        <optimization>Minify SVG icons aggressively</optimization>
      </future_optimizations>
    </library_level>

    <documentation_sites id="PB-BSB-DS">
      <sites>
        <site name="Storybook (@sando/docs)" initial_load="<500KB" gzipped="<150KB" lcp_target="<2.0s">
          Component showcase
        </site>
        <site name="VitePress (@sando/site)" initial_load="<300KB" gzipped="<100KB" lcp_target="<1.8s">
          Marketing/docs
        </site>
      </sites>

      <storybook_note>
        Storybook bundles are large by nature (~3MB). Focus on component iframe performance, not Storybook shell.
      </storybook_note>
    </documentation_sites>

</bundle_size_budgets>

<core_web_vitals id="PB-CWV">
<measurement_strategy id="PB-CWV-MS">
<lab_data title="Synthetic">
<method>Lighthouse CI (automated)</method>
<method>WebPageTest (manual spot checks)</method>
<method>Chrome DevTools Performance panel</method>
</lab_data>

      <field_data title="Real users">
        <method>Chrome User Experience Report (CrUX)</method>
        <method>Real User Monitoring (RUM) - future</method>
        <method>Google Search Console Core Web Vitals report</method>
      </field_data>

      <frequency>
        <check type="Every PR">Lighthouse CI</check>
        <check type="Weekly">WebPageTest</check>
        <check type="Monthly">CrUX review</check>
      </frequency>
    </measurement_strategy>

    <target_breakdown id="PB-CWV-TB">
      <metrics>
        <metric name="LCP" target="<2.5s" measurement="Time to largest content" impact="Page load speed"/>
        <metric name="FID" target="<100ms" measurement="First input delay" impact="Interactivity"/>
        <metric name="CLS" target="<0.1" measurement="Layout shift score" impact="Visual stability"/>
        <metric name="INP" target="<200ms" measurement="Interaction delay (new)" impact="Responsiveness"/>
        <metric name="TTFB" target="<800ms" measurement="Server response time" impact="CDN/hosting"/>
        <metric name="TBT" target="<200ms" measurement="Total blocking time" impact="Main thread work"/>
      </metrics>

      <optimizations>
        <lcp_optimization>
          <technique>Preload critical resources</technique>
          <technique>Optimize images (WebP, AVIF)</technique>
          <technique>Minimize render-blocking JavaScript</technique>
          <technique>Use CDN for static assets</technique>
        </lcp_optimization>

        <fid_inp_optimization>
          <technique>Minimize main thread work</technique>
          <technique>Break up long tasks (less than 50ms chunks)</technique>
          <technique>Use web workers for heavy computation</technique>
          <technique>Defer non-critical JavaScript</technique>
        </fid_inp_optimization>

        <cls_optimization>
          <technique>Reserve space for images/iframes (width/height)</technique>
          <technique>Avoid inserting content above existing content</technique>
          <technique>Use transform/opacity for animations (not top/left)</technique>
          <technique>Preload fonts to avoid FOIT/FOUT</technique>
        </cls_optimization>
      </optimizations>
    </target_breakdown>

</core_web_vitals>

<lighthouse_ci id="PB-LCI">
<configuration id="PB-LCI-CFG">
<config_file lang="json" path=".lighthouserc.json">
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
</config_file>
</configuration>

    <github_actions id="PB-LCI-GHA">
      <workflow lang="yaml">
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
      </workflow>

      <result>
        Lighthouse scores in PR comments, automatic failure if less than 90.
      </result>
    </github_actions>

</lighthouse_ci>

<bundle_analysis_tools id="PB-BAT">
<vite_bundle_analyzer id="PB-BAT-VBA">
<installation lang="bash"> # Install
pnpm add -D vite-bundle-visualizer

        # Add to vite.config.js
        import { visualizer } from 'vite-bundle-visualizer';

        export default defineConfig({
          plugins: [visualizer({ open: true })]
        });

        # Generate report
        pnpm --filter @sando/components build
        # Opens interactive tree map in browser
      </installation>
    </vite_bundle_analyzer>

    <rollup_plugin_visualizer id="PB-BAT-RPV">
      <installation lang="bash">
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
      </installation>
    </rollup_plugin_visualizer>

    <size_limit id="PB-BAT-SL">
      <installation lang="bash">
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
      </installation>

      <result>
        CI fails if bundle exceeds limit.
      </result>
    </size_limit>

</bundle_analysis_tools>

<performance_optimization id="PB-PO">
<code_splitting id="PB-PO-CS">
<route_based_splitting lang="javascript" site="VitePress">
// .vitepress/config.js
export default {
vite: {
build: {
rollupOptions: {
output: {
manualChunks(id) {
if (id.includes('node_modules')) {
return 'vendor';
}
if (id.includes('/components/')) {
return 'components';
}
}
}
}
}
}
};
</route_based_splitting>
</code_splitting>

    <lazy_loading id="PB-PO-LL">
      <component_lazy_loading lang="javascript">
        // Defer non-critical components
        const SandoModal = () => import("@sando/components/modal");
      </component_lazy_loading>
    </lazy_loading>

    <image_optimization id="PB-PO-IO">
      <modern_formats lang="html">
        <picture;>
          <source srcset="image.avif" type="image/avif" />
          <source srcset="image.webp" type="image/webp" />
          <img src="image.jpg" alt="Description" width="800" height="600" />
        </picture>
      </modern_formats>

      <dimensions_required>
        Always specify width/height to prevent CLS.
      </dimensions_required>
    </image_optimization>

    <font_optimization id="PB-PO-FO">
      <preload_critical lang="html">
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
      </preload_critical>

      <font_display lang="css">
        @font-face {
          font-family: "Inter";
          src: url("/fonts/inter.woff2") format("woff2");
          font-display: swap; /* Prevents FOIT (Flash of Invisible Text) */
        }
      </font_display>
    </font_optimization>

    <css_optimization id="PB-PO-CO">
      <critical_css lang="html">
        <style>
          /* Inline critical above-the-fold CSS */
          body { font-family: Inter, sans-serif; }
          .hero { /* ... */ }
        </style>
      </critical_css>

      <defer_non_critical lang="html">
        <link rel="preload" href="/styles/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
      </defer_non_critical>
    </css_optimization>

</performance_optimization>

<monitoring_alerts id="PB-MA">
<ci_budget_enforcement id="PB-MA-CBE">
<bundle_size_check lang="yaml"> - name: Check bundle size
run: |
BUTTON_SIZE=$(gzip -c dist/components/button/sando-button.js | wc -c)
if [ $BUTTON_SIZE -gt 10240 ]; then
echo "Button size $BUTTON_SIZE exceeds 10KB limit"
exit 1
fi
</bundle_size_check>
</ci_budget_enforcement>

    <performance_regression id="PB-MA-PRD">
      <compare_against_main lang="yaml">
        - name: Compare bundle sizes
          run: |
            git checkout main
            pnpm build
            mv dist dist-main
            git checkout -
            pnpm build
            diff -u <(du -sh dist-main/*) <(du -sh dist/*)
      </compare_against_main>
    </performance_regression>

    <alerting_strategy id="PB-MA-AS">
      <thresholds>
        <threshold level="80% of budget" action="Warning in PR" notification="GitHub comment"/>
        <threshold level="100% of budget" action="Block merge" notification="CI failure + Slack"/>
        <threshold level="Lighthouse <90" action="Block merge" notification="CI failure + PR comment"/>
        <threshold level='CrUX "Poor" rating' action="Investigation" notification="Weekly report"/>
      </thresholds>
    </alerting_strategy>

</monitoring_alerts>

<related_guidelines id="PB-RG">
<reference type="guideline" doc_id="TST" file="../03-development/TESTING_STRATEGY.md">
E2E performance testing
</reference>
<reference type="guideline" doc_id="CA" file="../02-architecture/COMPONENT_ARCHITECTURE.md">
Monolithic structure enables tree-shaking
</reference>
</related_guidelines>

<external_references id="PB-ER">
<category name="Core Web Vitals">
<reference url="https://web.dev/vitals/">Web Vitals - Official documentation</reference>
<reference url="https://developers.google.com/web/tools/chrome-user-experience-report">Chrome User Experience Report - Field data</reference>
</category>

    <category name="Tools">
      <reference url="https://github.com/GoogleChrome/lighthouse-ci">Lighthouse CI - Automated audits</reference>
      <reference url="https://bundlephobia.com/">Bundlephobia - Package size analysis</reference>
      <reference url="https://github.com/ai/size-limit">Size Limit - Bundle size enforcement</reference>
      <reference url="https://www.webpagetest.org/">WebPageTest - Real-world testing</reference>
    </category>

    <category name="Optimization">
      <reference url="https://web.dev/performance/">web.dev Performance - Best practices</reference>
      <reference url="https://vitejs.dev/guide/build.html">Vite Build Optimizations - Tree-shaking and code splitting</reference>
    </category>

</external_references>

  <changelog id="PB-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline creation</change>
      <change type="IMPROVED">Component budgets: less than 10KB gzipped (simple), less than 15KB (complex)</change>
      <change type="IMPROVED">Library budget: less than 100KB gzipped (full library)</change>
      <change type="IMPROVED">Core Web Vitals targets: LCP less than 2.5s, FID less than 100ms, CLS less than 0.1, INP less than 200ms</change>
      <change type="IMPROVED">Lighthouse CI integration: ≥90 Performance score required</change>
      <change type="IMPROVED">Tree-shaking configuration (preserveModules: true)</change>
      <change type="IMPROVED">Bundle analysis tools (vite-bundle-visualizer, size-limit)</change>
      <change type="IMPROVED">Performance optimization techniques (code splitting, lazy loading, image/font optimization)</change>
      <change type="IMPROVED">CI enforcement patterns (bundle size checks, Lighthouse CI, regression detection)</change>
      <change type="IMPROVED">Validation checklist (component, build, documentation, CI/CD)</change>
      <change type="NOTE">References to vite.config.js (lines 16-27, preserveModules pattern)</change>
      <change type="NOTE">Agent-optimized format for token efficiency</change>
    </version>
  </changelog>

</guideline>
