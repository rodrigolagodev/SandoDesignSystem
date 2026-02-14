---
title: Components Overview
description: The complete catalog of Sando Web Components — accessible, themeable, framework-agnostic building blocks ready to serve
---

# Components Overview

A full kitchen of accessible, themeable Web Components built with [Lit 3](https://lit.dev/) and TypeScript. Framework-agnostic by nature — they work anywhere HTML does.

- ⚡ **Framework-agnostic** — Works with React, Vue, Angular, Svelte, or vanilla JS
- ♿ **Accessible** — WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- 🎨 **Themeable** — Token-driven styling with 6 flavors and full customization
- 📦 **Tree-shakeable** — Import only the components you need
- 🔒 **TypeScript** — Full type safety for properties, events, and slots
- 🧪 **Tested** — Comprehensive unit and accessibility tests

## Form Controls

Interactive components for building forms and capturing user input. Think of these as the heart of any recipe — the ingredients that make your forms work.

### Button

Versatile action button with multiple variants, sizes, and advanced features including toggle support, icon-only mode, and link functionality.

**Variants:** solid, outline, ghost, text
**Sizes:** sm, md, lg
**Features:** icon-only, toggle buttons, render as link (href), icon props (start-icon/end-icon), compact mode

[View Button Documentation →](/components/button)

### Input

Text input field with built-in validation states, placeholder support, and prefix/suffix slots.

**Variants:** filled, outlined
**Sizes:** sm, md, lg

[View Input Documentation →](/components/input)

### Textarea

Multi-line text input with configurable resize behavior and wrap modes.

**Variants:** outlined, filled
**Sizes:** sm, md, lg

### Select

Dropdown selector with option and option-group support for organized selections. Supports single and multiple selection, clearable values, and async loading.

**Variants:** filled, outlined
**Sizes:** sm, md, lg

### Checkbox

Selection control with checked, unchecked, and indeterminate states.

**Variants:** solid, outline
**Sizes:** sm, md, lg

### Radio

Single selection control, designed to work within radio groups.

### Radio Group

Container for radio buttons that manages single-selection behavior and keyboard navigation.

### Switch

Toggle control for binary on/off states with smooth transitions.

**Variants:** solid, outline
**Sizes:** sm, md, lg

### Option

Individual option item for use inside select components.

### Option Group

Grouped container for organizing related options within a select.

### Label

Accessible label component that associates with form controls.

### Form Group

Layout container that groups a label, form control, and help text together.

[View Form Group Documentation →](/components/form-group)

### Form

Form wrapper that manages validation and submission.

### Help Text

Descriptive or error text that provides context for form controls.

## Feedback & Status

Components for communicating state and information to users.

### Spinner

Loading indicator with multiple sizes and accessible labeling.

**Sizes:** xs, sm, md, lg, xl
**Variants:** default, inverted

[View Spinner Documentation →](/components/spinner)

### Badge

Status indicator with semantic color variants and multiple visual styles. Non-interactive — purely informative.

**Colors:** neutral, primary, success, warning, danger, info
**Variants:** solid, soft, outline, surface
**Sizes:** sm, md, lg

### Tag

Interactive label for categorization and filtering. Features a mandatory icon area that serves as the interactive target for clickable and removable behaviors.

**Variants:** solid, outline, soft
**Sizes:** sm, md, lg

## Media

### Icon

Flexible icon component powered by Lucide icons, with multiple sizes and color variants. Supports rotation, flipping, and custom color overrides.

**Sizes:** xs, sm, md, lg, xl
**Colors:** default, muted, emphasis, brand, onSolid

## Skeleton / Loading

Pre-built skeleton patterns for common UI layouts. Compose them to match your content structure while data loads — like plating a dish before the main course is ready.

### Primitives

| Component         | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| **Skeleton**      | Base skeleton element — rectangular, circular, or custom shapes |
| **Skeleton Text** | Text-line placeholder with variable widths                      |

### Composed Patterns

| Component               | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| **Skeleton Article**    | Article layout with heading, paragraphs, and optional image |
| **Skeleton Avatar**     | Circular avatar placeholder                                 |
| **Skeleton Button**     | Button-shaped placeholder                                   |
| **Skeleton Card**       | Card layout with image area and text lines                  |
| **Skeleton Comment**    | Comment layout with avatar and text block                   |
| **Skeleton Composer**   | Text composer / editor placeholder                          |
| **Skeleton Image**      | Image area placeholder                                      |
| **Skeleton List Item**  | Single list item with icon and text                         |
| **Skeleton Media Card** | Card with prominent media area                              |
| **Skeleton Paragraph**  | Multiple text lines simulating a paragraph                  |
| **Skeleton Profile**    | Profile layout with avatar, name, and details               |
| **Skeleton Row**        | Horizontal row placeholder for tables or lists              |
| **Skeleton Stack**      | Vertical stack of skeleton elements                         |
| **Skeleton Table Row**  | Table row with multiple cell placeholders                   |

[View Skeleton Documentation →](/components/skeleton)

## Installation

```bash
pnpm add @sando/components @sando/tokens
```

## Usage

### Import

```js
// Import tokens (CSS custom properties)
import "@sando/tokens/css";

// Import all components via the main entry point
import "@sando/components";

// Or import only the button (the only component with an individual export path)
import "@sando/components/button";
```

::: tip Selective Imports
Currently, only `@sando/components/button` has a dedicated export path. All other components are available through the main `@sando/components` entry point, which auto-registers every component.
:::

### Use in HTML

```html
<sando-button variant="solid" size="md" flavor="original">
  Save Changes
</sando-button>

<sando-input placeholder="Enter your email" type="email"></sando-input>

<sando-checkbox>Accept terms and conditions</sando-checkbox>
```

### With TypeScript

```ts
import "@sando/components/button";

const button = document.querySelector("sando-button");
button.variant = "solid"; // Type-safe property access
button.addEventListener("sando-click", (e) => {
  console.log("Clicked!", e.detail);
});
```

## Framework Integration

::: code-group

```tsx [React]
import "@sando/components";

function App() {
  return (
    <sando-button variant="solid" onClick={(e) => console.log("Clicked!")}>
      Click me
    </sando-button>
  );
}
```

```vue [Vue]
<template>
  <sando-button variant="solid" @click="handleClick"> Click me </sando-button>
</template>

<script setup>
import "@sando/components";

const handleClick = () => console.log("Clicked!");
</script>
```

```ts [Angular]
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html [Angular Template]
<!-- component.html -->
<sando-button variant="solid" (click)="handleClick()"> Click me </sando-button>
```

:::

## Customization

Override recipe tokens to customize any component:

```css
sando-button {
  --sando-button-solid-backgroundColor-default: oklch(0.65 0.12 38);
  --sando-button-solid-textColor-default: oklch(1 0 0);
}
```

Or apply a flavor for system-wide theming:

```html
<sando-button variant="solid" flavor="strawberry"> Themed Button </sando-button>
```

## Accessibility

Every component is built with accessibility as a core requirement — not as an afterthought, but as the foundation:

- Keyboard navigation with visible focus indicators
- Screen reader support with proper ARIA attributes
- Focus management for complex interactions
- Color contrast meeting WCAG AA standards
- Automatic dark mode and reduced-motion support via CSS media queries

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Explore More

- **[Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/)** — Interactive component playground
- **[Token Architecture](/tokens/architecture)** — Understand the three-layer system
- **[Theming Guide](/getting-started/theming)** — How the flavor system works
- **[GitHub](https://github.com/rodrigolagodev/SandoDesignSystem)** — Source code and contributions
