---
"@sando-ds/tokens": patch
---

Tighten contrast across multiple flavors after extending the contrast test matrix to cover all 7 flavors × light/dark/high-contrast modes (CC-CR-R5).

Visible color shifts:

- **sando, kiwi, tonkatsu**: brand `action.solid.background.default` shifts one step darker (e.g. `orange.600` → `orange.700`) so the default white-on-solid text meets WCAG AA 4.5:1. Link states (`default`, `hover`, `active`, `visited`, `focus`) shift one step darker accordingly to keep state contrast tiers visible.
- **egg-salad**: `action.solid.text.default` switches from `white` to `neutralWarm.950`. The yellow background is too light for white text; dark text restores readability. `focus.ring` and `border.emphasis` also darkened.
- **original (dark mode), sando (dark mode)**: `action.solid.background.default` darkened in the dark-mode overlay so on-solid text meets AA.

No API changes. Token paths and structure unchanged; only resolved color values move within the existing OKLCH scale.
