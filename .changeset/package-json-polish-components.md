---
"@sando-ds/components": minor
---

Move `lit` from `dependencies` to `peerDependencies` (range `^3.0.0`) to prevent duplicate Lit copies in consumer bundles. Add `sideEffects` allow-list so bundlers preserve the `customElements.define()` calls that register `<sando-*>` elements at module load. Drop `src/` from the published tarball, add `LICENSE` alongside the package, and add `engines.node >=20`, `repository`, `homepage`, and `bugs` metadata.
