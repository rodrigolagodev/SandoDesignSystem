---
layout: home

hero:
  name: Sando
  text: Design System
  tagline: A modern, accessible, token-based design system with a powerful three-layer token architecture
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/introduction
    - theme: alt
      text: Explore Tokens
      link: /tokens/architecture
    - theme: alt
      text: GitHub
      link: https://github.com/rodrigolagodev/SandoDesignSystem

features:
  - icon: 🎨
    title: Token-Based Architecture ✅
    details: Three-layer token system (Ingredients → Flavors → Recipes) fully implemented and production-ready.

  - icon: ⚡
    title: Web Components 🚧
    details: Component library built with Lit coming soon. Framework-agnostic design for React, Vue, Angular, or vanilla JS.

  - icon: ♿
    title: Accessibility First
    details: WCAG 2.1 AA compliance baked into token system. Color contrast testing ensures accessible designs.

  - icon: 🧪
    title: Fully Tested ✅
    details: 2,200+ tests covering token structure, references, values, accessibility, and build output. 99.8% pass rate.

  - icon: 📦
    title: Monorepo Architecture ✅
    details: Powered by Turborepo with incremental builds, smart caching, and parallel execution. 73% faster builds.

  - icon: 🎭
    title: Flexible Theming 🚧
    details: Flavor system ready for multiple themes. Original flavor available, dark mode and custom themes coming soon.

  - icon: 🚀
    title: Developer Experience ✅
    details: TypeScript support, hot module replacement, comprehensive documentation, and automated builds.

  - icon: 📊
    title: Style Dictionary ✅
    details: Automated token transformation to CSS. Build once, use everywhere. Smart caching for instant rebuilds.
---

## Quick Example

```html
<!-- Install the package -->
<script type="module">
  import '@sando/components/button'
</script>

<!-- Use the component -->
<sando-button variant="solid" flavor="strawberry">
  Click me
</sando-button>
```

## Philosophy

Sando is inspired by the Japanese "katsu sando" sandwich. Just like a sandwich has layers that work together to create something delicious, our design system has three layers:

1. **Ingredients** - Raw, atomic values (colors, spacing, typography)
2. **Flavors** - Semantic tokens that give meaning and context
3. **Recipes** - Component-specific tokens that bring it all together

This architecture ensures consistency while allowing complete flexibility through theming.
