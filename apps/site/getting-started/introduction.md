# Introduction

**The perfect recipe for building delicious UIs.**

Welcome to **Sando Design System**! Just like a perfectly crafted Japanese katsu sando combines quality **Ingredients**, balanced **Flavors**, and a proven **Recipe** to create something extraordinary, Sando brings these three layers together to help you craft consistent, accessible, and beautiful user interfaces.

## What is Sando?

We believe that great design systems, like great food, start with quality basics. Our three-layer token architecture gives you the foundation to build once and theme infinitely—whether you're serving light mode, dark mode, or your own custom flavor.

Think of it like making the perfect sandwich: you don't just throw everything together. You start with quality ingredients, add your signature flavor, and follow a trusted recipe.

```
┌─────────────────────────────────┐
│   🍞 Recipes (Components)       │  Component-specific tokens
├─────────────────────────────────┤
│   🥬 Flavors (Semantic)         │  Theme-specific meanings
├─────────────────────────────────┤
│   🥓 Ingredients (Primitives)   │  Raw, atomic values
└─────────────────────────────────┘
```

### Start with quality Ingredients

Define your primitives—colors, spacing, typography—as the raw materials of your design language. These are absolute values with no opinion, like `color-orange-700: hsl(25, 95%, 53%)` or `space-4: 1rem`.

### Season with distinctive Flavors

Transform primitives into semantic tokens that give your interface its unique character and enable effortless theming. Examples: `color-background-base`, `color-action-solid-background-default`, `color-text-body`.

### Follow proven Recipes

Use component-specific tokens that ensure every button, card, and input tastes just right, every time. Like `button-solid-backgroundColor-default` or `button-outline-textColor-default`.

[Learn more about token architecture →](/tokens/architecture)

## Key Features

### 🎨 Three-Layer Token Architecture

Our layered token system ensures consistency and enables powerful theming:

- **Ingredients**: Primitives like `color-orange-700`, `space-4`, `font-size-400`
- **Flavors**: Semantic tokens like `color-background-base`, `color-action-solid-background-default`, `color-text-body`
- **Recipes**: Component tokens like `button-solid-backgroundColor-default`, `button-outline-textColor-default`

The result? A design system that's accessible by default (WCAG 2.1 AA), framework-agnostic, fully typed with TypeScript, and ready to serve across your entire product ecosystem.

### 🌐 Framework-Agnostic Web Components

Built with [Lit](https://lit.dev), Sando components work everywhere:

- **Works with any framework**: React, Vue, Angular, Svelte, or vanilla JavaScript
- **Standards-based**: Uses native Web Components APIs
- **Future-proof**: Built on web standards, not framework trends
- **TypeScript-first**: Full type safety and autocomplete

### ♿ Accessible by Default

Accessibility isn't an afterthought—it's baked into every component:

- WCAG 2.1 AA compliant out of the box
- Comprehensive contrast testing (4.5:1 text, 3:1 UI)
- Keyboard navigation and screen reader support
- Focus management and ARIA patterns
- High contrast mode support

### 🎭 Multi-Theme Support

Theme your entire application with a single attribute:

- **Light mode** - Clean and bright (default)
- **Dark mode** - Easy on the eyes
- **High contrast** - Maximum accessibility
- **Custom flavors** - Your brand, your way

### 🧪 Battle-Tested Quality

Over **2,200+ tests** ensure everything works perfectly:

- Token structure and reference integrity
- Accessibility contrast validation
- Build output verification
- Component unit and E2E tests
- Coverage tracking across the system

### 📦 Monorepo Power

Powered by [Turborepo](https://turbo.build) for lightning-fast development:

- ⚡ Incremental builds - Only rebuild what changed
- 🔄 Smart caching - Local and remote
- ⏱️ Parallel execution - Maximum speed
- 📊 Build visualization - Understand your build graph

### 🤖 AI-Powered Development

Built for modern workflows with **20 specialized AI agents** that help you:

- Create components faster with `component-creator` skill
- Generate custom commands with `command-creator` skill
- Get comprehensive project status with `/project-status`
- Work with expert agents for design, development, QA, and DevOps

> Use these tools via [Claude Code](https://claude.com/code) to supercharge your workflow.

## Design Philosophy

Sando follows these core principles:

1. **Start with the basics** - Quality ingredients make quality products
2. **Season with meaning** - Semantic tokens enable effortless theming
3. **Serve with style** - Components that work everywhere, look great everywhere
4. **Accessible by default** - Everyone deserves a great experience
5. **Build once, theme infinitely** - The three-layer system gives you flexibility without chaos

## Who is Sando for?

Sando is perfect for:

- **Product teams** building web applications across multiple frameworks
- **Design teams** who need a flexible, token-based system
- **Open source projects** that want framework-agnostic components
- **Enterprise applications** requiring accessibility compliance
- **Developers** who value great DX and comprehensive documentation

## Next Steps

<div class="next-steps">

**New to Sando?**
[Installation Guide →](/getting-started/installation)

**Ready to build?**
[Quick Start →](/getting-started/quick-start)

**Understand tokens?**
[Token Architecture →](/tokens/architecture)

**Explore components?**
[Component Overview →](/components/overview)

</div>

---

**Start with the basics, season with meaning, and serve with style.**

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
