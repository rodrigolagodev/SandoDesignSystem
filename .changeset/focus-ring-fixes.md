---
"@sando/components": patch
---

### Accessibility Fixes

- **Checkbox, Radio, Switch**: Fixed focus ring not appearing when tabbing in Shadow DOM environments
  - Replaced fragile `:focus-visible` sibling CSS with robust `_focused` reactive state
  - Removed problematic `:focus-within:not(:focus-visible)` rules that hid focus rings
  
- **Radio**: Added `delegatesFocus: true` for proper Shadow DOM focus delegation

- **Select**: Replaced hardcoded focus ring values with token variables

### New Component

- **Switch**: Added `sando-switch` component with:
  - Variants: solid, outline
  - Sizes: sm, md, lg
  - States: checked, disabled, error, required
  - High-contrast accessibility (5-8:1 contrast ratio)
  - 104 unit + accessibility tests
