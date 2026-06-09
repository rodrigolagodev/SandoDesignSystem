---
"@sando-ds/components": patch
---

Accessibility fixes for focus ring behavior in Shadow DOM environments:

- **Checkbox, Radio, Switch**: Fixed focus ring not appearing when tabbing in Shadow DOM environments. Replaced fragile `:focus-visible` sibling CSS with a robust `_focused` reactive state. Removed problematic `:focus-within:not(:focus-visible)` rules that hid focus rings.
- **Radio**: Added `delegatesFocus: true` for proper Shadow DOM focus delegation.
- **Select**: Replaced hardcoded focus ring values with token variables.
