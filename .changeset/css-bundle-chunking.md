---
"@sando-ds/tokens": minor
---

Fix CSS bundle bloat and add pre-bundled flavor entry points (ADR-004, addresses PB-CR-R1 violation).

**Bundle fix:** the recipe filter in `build/configs/recipes.config.js` had a permissive clause (`|| token.filePath?.includes('/recipes/')`) that caused every recipe CSS file to emit all 25 components' tokens. Each recipe was ~83 KB raw / ~7.5 KB gzipped, and the full bundle measured ~199 KB gzipped — nearly 2× the PB-CR-R1 budget of 100 KB. The filter now correctly emits only the component's own tokens.

**Measured impact:** total CSS bundle gzipped drops from ~199 KB to ~34 KB. Individual recipe files drop to 2–8 KB each.

**New subpath exports** for consumers who want to import a single-flavor bundle:

- `@sando-ds/tokens/css/theme` — global theme bundle
- `@sando-ds/tokens/css/{flavor}` — per-flavor bundles for `sando`, `original`, `nori`, `strawberry`, `egg-salad`, `kiwi`, `tonkatsu`

Existing exports (`./css`, `./css/ingredients/*`, `./css/flavors/*`, `./css/recipes/*`) remain unchanged.
