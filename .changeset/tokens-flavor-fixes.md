---
"@sando-ds/tokens": patch
---

Flavor and theming fixes:

- Dark mode selector now targets `:root[data-color-mode]` instead of the element itself, restoring proper cascade behavior.
- Removed flavor imports from Shadow DOM so CSS custom properties inherit correctly across component boundaries.
- Corrected dark-mode `on-solid` color values across all flavors.
- Improved Egg-Salad flavor contrast and visibility in both light and dark modes.
- Adjusted Input filled-variant background tokens for better contrast.
- Added auto-generated CSS barrel files (`index.css`) for convenient flavor imports.
