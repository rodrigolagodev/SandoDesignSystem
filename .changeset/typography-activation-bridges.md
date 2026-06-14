---
"@sando-ds/tokens": minor
"@sando-ds/components": minor
---

Activate Flavor typography end-to-end via the two-bridge model (ADR-005).

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
