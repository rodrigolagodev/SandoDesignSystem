---
title: Introduction to Sando Design System
description: Learn why Sando exists, how its three-layer architecture works, and what makes it different from other design systems.
---

# Introduction

**The perfect recipe for building delicious UIs.**

Welcome to **Sando Design System** — a framework-agnostic, accessible-by-default component library with a three-layer token architecture inspired by the art of the Japanese Katsu Sando.

## Why "Sando"?

_Sando_ (サンド) is the Japanese word for sandwich. But calling a Katsu Sando "just a sandwich" is like calling a design system "just some components."

A proper Katsu Sando is deceptively simple — soft milk bread, a crispy tonkatsu cutlet, and balanced sauce. Behind that simplicity lies the Japanese philosophy of **Shokunin** (職人気質): the craftsman's dedication to mastering each layer individually before assembling the whole.

That's exactly how this design system works. We obsess over each layer so you can assemble beautiful, accessible interfaces in minutes.

## The Three-Layer Architecture

Think of building a UI like making a sandwich. You don't just throw everything together — you start with quality ingredients, add your signature flavor, and follow a trusted recipe.

```
┌─────────────────────────────────────┐
│  🍞 Recipes (Component Tokens)      │  The finished dish — ready to serve
├─────────────────────────────────────┤
│  🥬 Flavors (Semantic Tokens)       │  The chef's signature — your brand
├─────────────────────────────────────┤
│  🥓 Ingredients (Primitive Tokens)  │  Pantry staples — raw, no opinion
└─────────────────────────────────────┘
```

### 🥓 Ingredients — Your Pantry Staples

Raw, atomic values with no opinion. Like having flour, eggs, and salt in your pantry — they don't decide what you're cooking.

```css
--sando-color-orange-500: oklch(0.65 0.12 38);
--sando-space-4: 1rem;
--sando-font-size-300: 1rem;
```

These are concrete values in OKLCH color space — perceptually uniform so that `orange-500` and `blue-500` actually _look_ equally vibrant.

### 🥬 Flavors — The Chef's Signature

Flavors give meaning to ingredients and define your brand personality. Same ingredients, different flavor — entirely different experience.

```css
/* Original flavor → warm orange tones */
--sando-color-action-solid-background-default: var(--sando-color-orange-700);

/* Strawberry flavor → pink tones */
--sando-color-action-solid-background-default: var(--sando-color-pink-600);
```

Change `flavor="original"` to `flavor="strawberry"` and the entire UI transforms — no component changes needed.

### 🍞 Recipes — The Finished Dish

Component-specific tokens that reference flavors. Recipes are what components actually consume.

```css
--sando-button-solid-backgroundColor-default: var(
  --sando-color-action-solid-background-default
);
```

Components never hardcode colors or spacing — they always reference recipes, which reference flavors, which reference ingredients. That's what makes the system infinitely themeable.

[Learn more about token architecture →](/tokens/architecture)

## Key Features

### 🎨 6 Handcrafted Flavors

Each flavor is a complete brand identity, hand-tuned for harmony across light, dark, and high-contrast modes:

| Flavor       | Inspired By            | Primary Vibe |
| ------------ | ---------------------- | ------------ |
| `original`   | Classic Sando          | Warm orange  |
| `sando`      | The Katsu Sando itself | Golden amber |
| `tonkatsu`   | Craft kitchen          | Rich brown   |
| `strawberry` | Fresh fruit            | Pink/red     |
| `egg-salad`  | Sunny tamago           | Yellow       |
| `kiwi`       | Fresh fruit            | Green        |

### 🌐 Framework-Agnostic Web Components

Built with [Lit](https://lit.dev), Sando components work everywhere — React, Vue, Angular, Svelte, or plain HTML. No wrappers, no adapters. They're native Web Components that work with any stack.

### ♿ Accessible by Default

Accessibility isn't an afterthought — it's baked into every ingredient:

- **WCAG 2.1 AA** compliant out of the box
- **4.5:1** text contrast and **3:1** UI contrast validated
- **Keyboard navigation** and **screen reader** support in every component
- **Automatic dark mode**, **high contrast**, and **reduced motion** via CSS media queries
- **OKLCH color space** — lightness-based contrast, not just hue differences

### 🧩 19+ Production Components

From buttons to complex form elements, everything you need to build real applications:

`sando-button` · `sando-input` · `sando-checkbox` · `sando-switch` · `sando-select` · `sando-textarea` · `sando-radio` · `sando-radio-group` · `sando-badge` · `sando-tag` · `sando-spinner` · `sando-icon` · `sando-label` · `sando-help-text` · `sando-form-group` · `sando-option` · `sando-option-group` · plus **14 skeleton loading patterns** for polished loading states.

### 🎯 8 OKLCH Color Palettes

Every color is defined in [OKLCH](https://oklch.com/) — a perceptually uniform color space where `L=0.5` actually _looks_ 50% bright:

- **orange** · **blue** · **green** · **red** · **purple** · **pink** · **yellow** · **brown**
- **3 neutral scales** — neutral, neutral-warm, neutral-cool
- **4 semantic state colors** — error, warning, success, info

### 🔒 TypeScript-First

Full type definitions, autocomplete, and compile-time safety for every component, property, and event.

### 📦 Monorepo Power

Powered by [Turborepo](https://turbo.build) with incremental builds, smart caching, and parallel execution.

## Design Philosophy

Sando is built on seven principles:

1. **Craftsmanship** — We spend months perfecting each component so you can use them in minutes
2. **Accessibility** — Every user, every context, always
3. **Intentionality** — Nothing arbitrary, everything has a documented reason
4. **Flexibility** — Build once, theme infinitely
5. **Simplicity** — Complex problems, elegant solutions
6. **Transparency** — Open source, open process, open mind
7. **Balance** — Strong conventions with escape hatches when you need them

::: tip The Sando Way
_"Start with the basics, season with meaning, and serve with style."_
:::

## Who is Sando For?

- **Product teams** building web apps across multiple frameworks
- **Design teams** who need a flexible, token-based system
- **Open source projects** that want framework-agnostic components
- **Enterprise applications** requiring accessibility compliance
- **Developers** who value great DX and thorough documentation

## Next Steps

<div class="next-steps">

**New to Sando?**
[Installation Guide →](/getting-started/installation)

**Ready to build?**
[Quick Start →](/getting-started/quick-start)

**Understand the token system?**
[Token Architecture →](/tokens/architecture)

**Explore components?**
[Component Overview →](/components/overview)

**See it in action?**
[Storybook →](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/)

</div>

---

**Start with the basics, season with meaning, and serve with style.** 🍱

<style>
.next-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
