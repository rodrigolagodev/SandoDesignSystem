---
"@sando/components": patch
---

Generate and ship Custom Elements Manifest (`custom-elements.json`). The build now runs `custom-elements-manifest analyze` and the manifest is included in the published tarball at the package root. `package.json` declares `"customElements": "./custom-elements.json"` so tools like Storybook, Lit Analyzer, and the VS Code Lit Plugin can auto-discover element metadata (attributes, properties, events, slots, CSS custom properties).
