---
layout: home

hero:
  name: Sando
  text: Design System
  tagline: Crafted with the care of a katsu sando — layered, balanced, and made to satisfy.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/introduction
    - theme: alt
      text: Storybook
      link: https://rodrigolagodev.github.io/SandoDesignSystem/storybook/
    - theme: alt
      text: GitHub
      link: https://github.com/rodrigolagodev/SandoDesignSystem

features:
  - icon: 🧩
    title: 33 Web Components
    details: From buttons and inputs to skeletons and badges — a full kitchen of framework-agnostic components built with Lit 3 and ready to serve.

  - icon: 🎨
    title: 3-Layer Token Architecture
    details: Ingredients (primitives) → Flavors (semantic themes) → Recipes (component tokens). Built on the OKLCH color space for perceptual uniformity.

  - icon: 🎭
    title: 6 Flavors
    details: Original, Tonkatsu, Strawberry, Kiwi, Egg Salad, and Sando — each with light, dark, high-contrast, motion-reduce, and forced-colors variants.

  - icon: ♿
    title: Accessibility First
    details: WCAG 2.1 AA compliance baked into every component. Keyboard navigation, screen reader support, ARIA attributes, and focus management included.

  - icon: 📦
    title: Tree-Shakeable
    details: Import only what you need. Each component is independently importable — no bloated bundles, just the ingredients your project requires.

  - icon: 🔒
    title: TypeScript
    details: Full type safety across components, tokens, and events. Autocomplete-friendly APIs that catch errors at compile time, not runtime.

  - icon: ⚡
    title: Monorepo Performance
    details: Powered by Turborepo with incremental builds, smart caching, and parallel execution. Style Dictionary transforms tokens to CSS automatically.

  - icon: 🧪
    title: Tested
    details: Comprehensive unit tests, accessibility tests, and token validation. Every component ships with confidence.
---

## Quick Example

```html
<!-- Import tokens and components -->
<script type="module">
  import "@sando/tokens/css";
  import "@sando/components/button";
</script>

<!-- Use the component -->
<sando-button variant="solid" flavor="strawberry"> Click me </sando-button>
```

## Philosophy

Sando is inspired by the Japanese _katsu sando_ sandwich. Just like a great sandwich has layers that work together to create something delicious, our design system has three layers:

1. **Ingredients** — Raw, atomic values (11 OKLCH color palettes, spacing, typography, animation, and more). The pantry staples that never change.
2. **Flavors** — Semantic tokens that give meaning and context. They map ingredients to purposes like "action," "background," and "text."
3. **Recipes** — Component-specific tokens that bring it all together. The final dish, plated and ready to serve.

This architecture ensures consistency while giving you complete flexibility through theming. Swap a flavor, and every component updates — like changing the filling in your sando while the bread stays perfectly toasted.
