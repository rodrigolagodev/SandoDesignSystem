# @sando-ds/components

## 0.2.0

### Minor Changes

- c5912aa: Add `sando-alert` component:
  - Status variants: `info`, `success`, `warning`, `destructive`
  - Appearances: `solid`, `outline`
  - Optional title, dismissible close button
  - Slots for icon and actions
  - Animated enter/exit
  - WCAG 2.1 AA accessibility (`role="status"` / `role="alert"`, `aria-live`, Escape to dismiss)

- c5912aa: Add `sando-card` component:
  - Variants: `elevated`, `outlined`, `filled`
  - Configurable `padding`, `radius`, `orientation`
  - Clickable and link (`href`) interaction modes via the Pseudo-Interactive Surface pattern
  - Skeleton loading state
  - Full WCAG 2.1 AA accessibility

- c5912aa: Add `sando-dialog` component:
  - ARIA `dialog` and `alertdialog` roles
  - 4 size variants (`sm`, `md`, `lg`, `full`)
  - Focus trap via `inert`, focus restoration on close
  - Body scroll lock while open
  - Animated enter/exit (backdrop + panel)
  - Cancelable `sando-request-close` event
  - Public `show()` / `hide()` API
  - `noHeader` mode for headerless dialogs
  - Full WCAG 2.1 AA accessibility

- c5912aa: Add `sando-divider` component:
  - Orientations: `horizontal` (renders `<hr>`) and `vertical` (renders `<div role="separator" aria-orientation="vertical">`)
  - Three weights, three line styles (`solid`, `dashed`, `dotted`)
  - Configurable spacing
  - Optional centered label

- 3d8ec90: Move `lit` from `dependencies` to `peerDependencies` (range `^3.0.0`) to prevent duplicate Lit copies in consumer bundles. Add `sideEffects` allow-list so bundlers preserve the `customElements.define()` calls that register `<sando-*>` elements at module load. Drop `src/` from the published tarball, add `LICENSE` alongside the package, and add `engines.node >=20`, `repository`, `homepage`, and `bugs` metadata.
- c5912aa: Add `sando-switch` component:
  - Variants: solid, outline
  - Sizes: sm, md, lg
  - States: checked, disabled, error, required
  - High-contrast accessibility (5–8:1 contrast ratio)
  - 104 unit + accessibility tests

- c5912aa: Add `sando-tooltip` component:
  - Non-interactive tooltip with hover/focus trigger
  - 4 placements (`top`, `right`, `bottom`, `left`) with auto-flip via Popover API
  - Skip-delay behavior for rapid trigger transitions
  - WCAG 1.4.13 compliant — tooltip stays open when pointer moves from trigger into the bubble

### Patch Changes

- c5912aa: Checkbox improvements:
  - Added Space and Enter key support on the label element for keyboard activation.
  - Wired indeterminate state through ARIA attributes correctly.

- c5912aa: Miscellaneous fixes and additions:
  - Added `focus-ring-offset` token for improved button focus visibility.
  - Storybook theme switching simplified — uses generated CSS instead of manual imports.
  - Improved `argTypes` organization across all component stories.
  - Added flavor switcher to Checkbox, Input, and Icon stories.
  - Fixed `tsconfig.json` to include Vitest globals and test files.

- 961e8ff: Generate and ship Custom Elements Manifest (`custom-elements.json`). The build now runs `custom-elements-manifest analyze` and the manifest is included in the published tarball at the package root. `package.json` declares `"customElements": "./custom-elements.json"` so tools like Storybook, Lit Analyzer, and the VS Code Lit Plugin can auto-discover element metadata (attributes, properties, events, slots, CSS custom properties).
- 9fbdac4: Package now ships TypeScript declarations (`.d.ts` + `.d.ts.map`) for all entry points. Consumers no longer get `Could not find a declaration file for module '@sando-ds/components'` errors and get full IntelliSense plus go-to-definition into the original sources.
- 76fa9de: Accessibility fixes for focus ring behavior in Shadow DOM environments:
  - **Checkbox, Radio, Switch**: Fixed focus ring not appearing when tabbing in Shadow DOM environments. Replaced fragile `:focus-visible` sibling CSS with a robust `_focused` reactive state. Removed problematic `:focus-within:not(:focus-visible)` rules that hid focus rings.
  - **Radio**: Added `delegatesFocus: true` for proper Shadow DOM focus delegation.
  - **Select**: Replaced hardcoded focus ring values with token variables.

- c5912aa: Added a comprehensive Installation guide covering four token import strategies (full bundle, per-layer, per-component, per-flavor) so consumers can pick the right granularity for their bundle-size budget.
- c5912aa: Tag fixes:
  - Action hover opacity bumped from 15% to 25% for better hover affordance.
  - Hover state now uses `currentColor` for chromatic consistency across flavors.
  - Corrected divider height for `sm` size.

- Updated dependencies [5ececd5]
- Updated dependencies [5ececd5]
- Updated dependencies [c5912aa]
- Updated dependencies [3d8ec90]
- Updated dependencies [c5912aa]
  - @sando-ds/tokens@0.2.0
