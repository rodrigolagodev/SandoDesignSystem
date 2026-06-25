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

- 1eb122c: Activate Flavor typography end-to-end via the two-bridge model (ADR-005).

  Before this change the design system declared `--sando-font-family-body`, `--sando-color-text-body`, etc., but no rule applied them, so pages and components rendered with browser-default typography and the Flavor toolbar didn't change visible text.

  **`@sando-ds/tokens`**
  - New export `@sando-ds/tokens/css/base` — a preflight that wires semantic flavor tokens to `:where(:root, [data-flavor])` (font-family, font-size, font-weight, line-height, color, background-color). Zero specificity so consumer rules trivially override.
  - Recipes now declare `fontFamily` for `alert`, `card`, `dialog`, `form`, `tooltip` (previously missing).
  - `card` recipe adds `heading.fontFamily`, `heading.lineHeight`, and a full `body.*` group (font-size/weight/line-height/color) so slot content has a typography contract.
  - `dialog` recipe adds `header.titleFontFamily`.

  **`@sando-ds/components`**
  - `resetStyles` now reads `--sando-font-family-body`, `--sando-font-lineHeight-body`, and `--sando-color-text-body` on `:host`, with `inherit` fallback. Slot content inherits from the host so light-DOM children share the active flavor without per-component `::slotted()` rules.
  - `sando-alert` applies `--sando-alert-fontFamily` on `.alert-content`.
  - `sando-card` applies the new heading/body recipe tokens; the temporary `line-height: 1.3` hardcode is gone.
  - `sando-dialog` applies `--sando-dialog-fontFamily` on the panel and `--sando-dialog-header-titleFontFamily` on the title.
  - `sando-form` applies `--sando-form-fontFamily` on the host.
  - `sando-tooltip` applies `--sando-tooltip-fontFamily` on the bubble.
  - `sando-option` now references `--sando-option-fontFamily` / `--sando-option-lineHeight` instead of cross-layer `--sando-select-*` (fixes TA-CR-R1 violation).
  - `tokens.css.ts` switches from a hand-maintained list of recipe imports to the auto-generated `ingredients/index.css` + `recipes/index.css` barrels so future components are picked up automatically.

  Consumer migration: load `@sando-ds/tokens/css/base` after your flavor/theme import to activate typography in Light DOM. Storybook does this automatically.

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
