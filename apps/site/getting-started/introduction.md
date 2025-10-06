# Introduction

Welcome to **Sando Design System** - a modern, accessible, token-based design system built with Web Components.

## What is Sando?

Sando is inspired by the Japanese "katsu sando" sandwich analogy. Just like a perfect sandwich has carefully crafted layers that work together, our design system has three layers that ensure visual consistency while allowing easy customization:

```
┌─────────────────────────────────┐
│   🍞 Recipes (Components)       │  Component-specific tokens
├─────────────────────────────────┤
│   🥬 Flavors (Semantic)         │  Theme-specific meanings
├─────────────────────────────────┤
│   🥓 Ingredients (Primitives)   │  Raw, atomic values
└─────────────────────────────────┘
```

## Key Features

### 🎨 **Token-Based Architecture** ✅

Our three-layer token system ensures consistency and enables powerful theming:

- **Ingredients**: Primitive values like `color-brand-700`, `space-4`, `font-size-400`
- **Flavors**: Semantic tokens like `color-background-interactive`, `spacing-comfortable`
- **Recipes**: Component tokens like `button-background-color`, `button-padding`

[Learn more about token architecture →](/tokens/architecture)

### ⚡ **Web Components** 🚧

Component library under development. Built with [Lit](https://lit.dev), Sando components will be:

- **Framework-agnostic**: Works with React, Vue, Angular, Svelte, or vanilla JavaScript
- **Standards-based**: Uses native Web Components APIs
- **Future-proof**: Built on web standards, not framework trends
- **TypeScript-first**: Full type safety and autocomplete

### ♿ **Accessibility First**

- WCAG 2.1 AA compliant out of the box
- Comprehensive accessibility testing (4.5:1 text contrast, 3:1 UI contrast)
- Keyboard navigation and screen reader support
- Focus management and ARIA patterns

### 🧪 **Fully Tested**

- **2,200+ tests** covering all aspects of the design system
- Token structure, reference integrity, and value validation
- Accessibility contrast testing
- Build output validation
- Component unit and E2E tests

### 📦 **Monorepo Architecture**

Powered by [Turborepo](https://turbo.build) for optimal developer experience:

- ⚡ Incremental builds (only rebuild what changed)
- 🔄 Smart caching (local and remote)
- ⏱️ Parallel execution
- 📊 Build visualization

## Philosophy

Sando follows these core principles:

1. **Consistency through tokens**: Design decisions are encoded as tokens, ensuring visual consistency across all components

2. **Flexibility through layering**: The three-layer architecture allows teams to customize at any level without breaking the system

3. **Accessibility by default**: Every component is built with accessibility in mind, not as an afterthought

4. **Framework agnostic**: Web Components ensure your design system outlasts framework trends

5. **Developer experience**: Fast builds, great TypeScript support, and comprehensive documentation

## Who is Sando for?

Sando is perfect for:

- **Product teams** building web applications with multiple frameworks
- **Design teams** who need a flexible, token-based system
- **Open source projects** that want framework-agnostic components
- **Enterprise applications** requiring accessibility compliance
- **Portfolio projects** showcasing modern web development skills

## Next Steps

<div class="next-steps">

**New to Sando?**
[Installation Guide →](/getting-started/installation)

**Ready to build?**
[Quick Start →](/getting-started/quick-start)

**Understand the architecture?**
[Token Architecture →](/tokens/architecture)

**Explore components?**
[Component Overview →](/components/overview)

</div>

<style>
.next-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.next-steps > p {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.next-steps strong {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand-1);
}
</style>
