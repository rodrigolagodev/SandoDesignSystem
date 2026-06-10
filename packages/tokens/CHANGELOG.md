# @sando-ds/tokens

## 0.2.0

### Minor Changes

- 5ececd5: Fix CSS bundle bloat and add pre-bundled flavor entry points (ADR-004, addresses PB-CR-R1 violation).

  **Bundle fix:** the recipe filter in `build/configs/recipes.config.js` had a permissive clause (`|| token.filePath?.includes('/recipes/')`) that caused every recipe CSS file to emit all 25 components' tokens. Each recipe was ~83 KB raw / ~7.5 KB gzipped, and the full bundle measured ~199 KB gzipped — nearly 2× the PB-CR-R1 budget of 100 KB. The filter now correctly emits only the component's own tokens.

  **Measured impact:** total CSS bundle gzipped drops from ~199 KB to ~34 KB. Individual recipe files drop to 2–8 KB each.

  **New subpath exports** for consumers who want to import a single-flavor bundle:
  - `@sando-ds/tokens/css/theme` — global theme bundle
  - `@sando-ds/tokens/css/{flavor}` — per-flavor bundles for `sando`, `original`, `nori`, `strawberry`, `egg-salad`, `kiwi`, `tonkatsu`

  Existing exports (`./css`, `./css/ingredients/*`, `./css/flavors/*`, `./css/recipes/*`) remain unchanged.

### Patch Changes

- 5ececd5: Tighten contrast across multiple flavors after extending the contrast test matrix to cover all 7 flavors × light/dark/high-contrast modes (CC-CR-R5).

  Visible color shifts:
  - **sando, kiwi, tonkatsu**: brand `action.solid.background.default` shifts one step darker (e.g. `orange.600` → `orange.700`) so the default white-on-solid text meets WCAG AA 4.5:1. Link states (`default`, `hover`, `active`, `visited`, `focus`) shift one step darker accordingly to keep state contrast tiers visible.
  - **egg-salad**: `action.solid.text.default` switches from `white` to `neutralWarm.950`. The yellow background is too light for white text; dark text restores readability. `focus.ring` and `border.emphasis` also darkened.
  - **original (dark mode), sando (dark mode)**: `action.solid.background.default` darkened in the dark-mode overlay so on-solid text meets AA.

  No API changes. Token paths and structure unchanged; only resolved color values move within the existing OKLCH scale.

- c5912aa: Added a comprehensive Installation guide covering four token import strategies (full bundle, per-layer, per-component, per-flavor) so consumers can pick the right granularity for their bundle-size budget.
- 3d8ec90: Add `sideEffects` allow-list for CSS files, drop `src/` from the published tarball, add `LICENSE` alongside the package, and add `engines.node >=20`, `repository`, `homepage`, and `bugs` metadata. No API changes.
- c5912aa: Flavor and theming fixes:
  - Dark mode selector now targets `:root[data-color-mode]` instead of the element itself, restoring proper cascade behavior.
  - Removed flavor imports from Shadow DOM so CSS custom properties inherit correctly across component boundaries.
  - Corrected dark-mode `on-solid` color values across all flavors.
  - Improved Egg-Salad flavor contrast and visibility in both light and dark modes.
  - Adjusted Input filled-variant background tokens for better contrast.
  - Added auto-generated CSS barrel files (`index.css`) for convenient flavor imports.
