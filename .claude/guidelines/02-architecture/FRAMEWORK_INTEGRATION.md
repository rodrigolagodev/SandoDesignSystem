# Framework Integration

**Category**: 02-architecture
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-02
**Owner**: Ecosystem Integration Agent

---

## Purpose

Defines how **Sando Web Components integrate with React, Vue, Angular, and Svelte**. This includes TypeScript configuration, event handling, prop passing, SSR considerations, and framework-specific patterns that ensure components work seamlessly in any framework.

---

## Core Rules

### Rule 1: Framework-Agnostic Web Components

**Sando components are framework-agnostic** by design. They work in ANY framework because they follow the Web Components standard.

**Why Web Components**:

- **Universal**: One codebase, all frameworks
- **Future-proof**: Standard-based, not tied to framework versions
- **Encapsulated**: Shadow DOM prevents style leaks
- **Interoperable**: Can mix React, Vue, and vanilla components

**Pattern**:

```html
<!-- Same component works everywhere -->
<!-- Vanilla HTML -->
<sando-button variant="solid">Click me</sando-button>

<!-- React -->
<sando-button variant="solid">Click me</sando-button>

<!-- Vue -->
<sando-button variant="solid">Click me</sando-button>

<!-- Angular -->
<sando-button variant="solid">Click me</sando-button>

<!-- Svelte -->
<sando-button variant="solid">Click me</sando-button>
```

**Anti-pattern**:

```typescript
// L WRONG: Framework-specific components
@sando/react     // Separate React wrappers
@sando/vue       // Separate Vue wrappers
// Maintenance nightmare, duplication
```

---

### Rule 2: Import Before Use

**All frameworks require importing the component** before use (side-effect import for registration).

**Pattern**:

```typescript
// Import component (registers custom element)
import "@sando/components/button";

// Now <sando-button> is available in templates
```

**Why This Matters**: Web Components must be registered before the browser can use them. Importing triggers registration.

**Anti-pattern**:

```typescript
// L WRONG: Not importing
// <sando-button> used in template without import
// Browser doesn't know what <sando-button> is
```

---

### Rule 3: Properties vs Attributes

**Understand the difference**: Properties (JS objects) vs Attributes (HTML strings).

**Properties** (Complex data):

```javascript
const button = document.querySelector("sando-button");
button.options = { variant: "solid", size: "medium" }; // Object
```

**Attributes** (Simple data):

```html
<sando-button variant="solid" size="medium"></sando-button>
```

**Lit Convention**: Use `reflect: true` to sync prop � attribute for simple values (strings, numbers, booleans).

**Pattern** (component definition):

```typescript
@property({ reflect: true })
variant: 'solid' | 'outline' = 'solid';  // � Syncs to attribute

@property({ type: Boolean, reflect: true })
disabled = false;  // � Syncs to attribute
```

**Framework Impact**:

- **React**: Can't pass objects as attributes (use refs)
- **Vue**: Can use `v-bind` for properties
- **Angular**: Use property binding `[disabled]`
- **Svelte**: Can pass objects directly

---

### Rule 4: Event Handling

**Web Components dispatch custom events**. Each framework has its own event handling syntax.

**Event Pattern** (component):

```typescript
// Component dispatches custom event
this.dispatchEvent(
  new CustomEvent("button-click", {
    detail: { value: "data" },
    bubbles: true,
    composed: true, // � Crosses shadow boundary
  }),
);
```

**Framework Patterns**:

```typescript
// React: addEventListener in ref
buttonRef.current.addEventListener('button-click', handler);

// Vue: @event-name
<sando-button @button-click="handler"></sando-button>

// Angular: (eventName)
<sando-button (button-click)="handler($event)"></sando-button>

// Svelte: on:event-name
<sando-button on:button-click={handler}></sando-button>
```

**Why `composed: true`**: Events must cross Shadow DOM boundary to reach framework listeners.

---

### Rule 5: TypeScript Support

**Provide TypeScript definitions** for all components to enable autocomplete and type checking.

**Pattern** (`global.d.ts` or framework-specific types):

```typescript
declare global {
  interface HTMLElementTagNameMap {
    "sando-button": SandoButton;
    "sando-card": SandoCard;
  }
}

// JSX types (React)
declare namespace JSX {
  interface IntrinsicElements {
    "sando-button": React.DetailedHTMLProps<
      React.HTMLAttributes<SandoButton>,
      SandoButton
    >;
  }
}
```

**Benefit**: IDEs provide autocomplete for component props and events.

---

## React Integration

### Basic Setup

```typescript
// 1. Import component
import '@sando/components/button';

// 2. Use in JSX
function App() {
  return <sando-button variant="solid">Click me</sando-button>;
}
```

---

### TypeScript Support

**Create `src/types/web-components.d.ts`**:

```typescript
import { SandoButton } from "@sando/components/button";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "sando-button": React.DetailedHTMLProps<
        React.HTMLAttributes<SandoButton> & {
          variant?: "solid" | "outline" | "ghost";
          size?: "small" | "medium" | "large";
          disabled?: boolean;
        },
        SandoButton
      >;
    }
  }
}
```

**Benefit**: Autocomplete and type checking in JSX.

---

### Event Handling

**Use refs + addEventListener**:

```typescript
import { useRef, useEffect } from 'react';

function App() {
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Clicked:', customEvent.detail);
    };

    button.addEventListener('button-click', handler);
    return () => button.removeEventListener('button-click', handler);
  }, []);

  return <sando-button ref={buttonRef}>Click me</sando-button>;
}
```

**Why**: React's synthetic events don't capture custom events. Must use native addEventListener.

---

### Passing Complex Props

**Use refs**:

```typescript
import { useRef, useEffect } from 'react';

function App() {
  const componentRef = useRef<any>(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.complexData = { /* object */ };
    }
  }, []);

  return <sando-component ref={componentRef}></sando-component>;
}
```

**Why**: Can't pass objects as attributes in React. Must set as property via ref.

---

## Vue 3 Integration

### Basic Setup

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat all tags starting with 'sando-' as custom elements
          isCustomElement: (tag) => tag.startsWith("sando-"),
        },
      },
    }),
  ],
});
```

**Why**: Tells Vue compiler to not treat `<sando-*>` as Vue components.

---

### Usage in Templates

```vue
<script setup lang="ts">
import "@sando/components/button";

function handleClick(e: CustomEvent) {
  console.log("Clicked:", e.detail);
}
</script>

<template>
  <sando-button variant="solid" @button-click="handleClick">
    Click me
  </sando-button>
</template>
```

**Why Vue Works Well**:

- `@event-name` syntax for custom events
- `v-bind` for properties
- `v-model` can work with custom events

---

### TypeScript Support

**Create `src/types/web-components.d.ts`**:

```typescript
import { SandoButton } from "@sando/components/button";

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    "sando-button": typeof SandoButton;
  }
}
```

---

### v-model Support

**Components can support v-model**:

```vue
<!-- Component with value prop + value-changed event -->
<sando-input v-model="text"></sando-input>

<!-- Equivalent to: -->
<sando-input
  :value="text"
  @value-changed="text = $event.detail.value"
></sando-input>
```

**Component Implementation**:

```typescript
@property({ reflect: true })
value = '';

private handleInput(e: Event) {
  this.value = (e.target as HTMLInputElement).value;
  this.dispatchEvent(new CustomEvent('value-changed', {
    detail: { value: this.value },
    bubbles: true,
    composed: true
  }));
}
```

---

## Angular Integration

### Basic Setup

**Add `CUSTOM_ELEMENTS_SCHEMA` to module**:

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // � Allow custom elements
  // ...
})
export class AppModule {}
```

**Why**: Tells Angular compiler to allow unknown HTML tags (Web Components).

---

### Usage in Templates

```typescript
// app.component.ts
import { Component, OnInit } from "@angular/core";
import "@sando/components/button"; // � Import for registration

@Component({
  selector: "app-root",
  template: `
    <sando-button variant="solid" (button-click)="handleClick($event)">
      Click me
    </sando-button>
  `,
})
export class AppComponent {
  handleClick(event: Event) {
    const customEvent = event as CustomEvent;
    console.log("Clicked:", customEvent.detail);
  }
}
```

**Angular Event Syntax**: `(event-name)` for custom events.

---

### Property Binding

**Use Angular property binding**:

```html
<!-- Property binding (not attribute) -->
<sando-component
  [complexData]="myObject"
  [disabled]="isDisabled"
></sando-component>
```

**Why `[prop]`**: Binds to property (JS), not attribute (HTML string).

---

### TypeScript Support

**Declare custom elements**:

```typescript
// typings.d.ts
declare global {
  interface HTMLElementTagNameMap {
    "sando-button": any; // Or import actual type
  }
}
```

---

## Svelte Integration

### Basic Setup

**Svelte works out of the box** with Web Components. No special configuration needed.

```svelte
<script lang="ts">
  import '@sando/components/button';

  function handleClick(e: CustomEvent) {
    console.log('Clicked:', e.detail);
  }
</script>

<sando-button
  variant="solid"
  on:button-click={handleClick}
>
  Click me
</sando-button>
```

**Why Svelte Works Best**:

- No special config needed
- `on:event-name` for custom events
- Can pass objects as props directly
- Full TypeScript support

---

### TypeScript Support

**Create `src/ambient.d.ts`**:

```typescript
declare namespace svelteHTML {
  interface IntrinsicElements {
    "sando-button": {
      variant?: "solid" | "outline" | "ghost";
      size?: "small" | "medium" | "large";
      disabled?: boolean;
    };
  }
}
```

---

### Binding Properties

```svelte
<script>
  import '@sando/components/input';

  let value = '';
</script>

<!-- Two-way binding -->
<sando-input
  bind:value={value}
  on:value-changed={(e) => value = e.detail.value}
></sando-input>

<p>Value: {value}</p>
```

---

## SSR Considerations

### Server-Side Rendering

**Web Components don't render server-side** by default. They require JavaScript to run.

**Strategies**:

1. **Declarative Shadow DOM** (experimental):

```html
<sando-button>
  <template shadowroot="open">
    <!-- Shadow DOM content rendered server-side -->
  </template>
  Click me
</sando-button>
```

2. **Client-only rendering**:

```typescript
// Next.js
import dynamic from "next/dynamic";

const SandoButton = dynamic(
  () =>
    import("@sando/components/button").then(() => ({
      default: "sando-button",
    })),
  { ssr: false },
);
```

3. **Progressive enhancement**:

```html
<!-- Content visible before hydration -->
<sando-button>
  <span slot="fallback">Click me</span>
</sando-button>
```

**Current Recommendation**: Use client-only rendering for SSR frameworks until Declarative Shadow DOM is widely supported.

---

## Common Patterns

### Lazy Loading Components

```typescript
// Load component on demand
async function loadButton() {
  await import("@sando/components/button");
  // <sando-button> now available
}
```

---

### Conditional Rendering

**React**:

```tsx
{
  showButton && <sando-button>Click</sando-button>;
}
```

**Vue**:

```vue
<sando-button v-if="showButton">Click</sando-button>
```

**Angular**:

```html
<sando-button *ngIf="showButton">Click</sando-button>
```

**Svelte**:

```svelte
{#if showButton}
  <sando-button>Click</sando-button>
{/if}
```

---

### Slots (Content Projection)

**All frameworks support slots**:

```html
<!-- Named slots -->
<sando-card>
  <span slot="header">Title</span>
  <p>Content goes here</p>
  <div slot="footer">Actions</div>
</sando-card>
```

**Framework-specific**:

```jsx
// React: Use slot attribute
<sando-card>
  <span slot="header">Title</span>
  <p>Content</p>
</sando-card>

// Vue: Use v-slot
<sando-card>
  <template v-slot:header>
    <span>Title</span>
  </template>
  <p>Content</p>
</sando-card>
```

---

## Validation Checklist

### General Setup

- [ ] Web Components imported before use
- [ ] Components registered (check in browser console)
- [ ] TypeScript definitions created
- [ ] Event handlers working
- [ ] Slots working correctly

### React

- [ ] `CUSTOM_ELEMENTS_SCHEMA` not needed (React supports custom elements)
- [ ] TypeScript JSX definitions created
- [ ] Events handled via refs + addEventListener
- [ ] Complex props passed via refs

### Vue

- [ ] `isCustomElement` configured in vite.config
- [ ] Custom events work with `@event-name`
- [ ] TypeScript GlobalComponents declared
- [ ] v-model works if implemented

### Angular

- [ ] `CUSTOM_ELEMENTS_SCHEMA` added to module
- [ ] Custom events work with `(event-name)`
- [ ] Property binding works with `[prop]`
- [ ] TypeScript HTMLElementTagNameMap declared

### Svelte

- [ ] No config needed (works out of box)
- [ ] Custom events work with `on:event-name`
- [ ] TypeScript svelteHTML declared
- [ ] Props passed directly

---

## Related Guidelines

- [COMPONENT_ARCHITECTURE.md](COMPONENT_ARCHITECTURE.md) - Component structure, Shadow DOM, event patterns
- [../01-design-system/COMPONENT_DESIGN.md](../01-design-system/COMPONENT_DESIGN.md) - Component API conventions
- [MONOREPO_STRUCTURE.md](MONOREPO_STRUCTURE.md) - Package exports, build system

---

## External References

- [Web Components - MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/) - Framework compatibility tests
- [Lit - Framework Integration](https://lit.dev/docs/frameworks/overview/)
- [React - Web Components](https://react.dev/reference/react-dom/components#custom-html-elements)
- [Vue - Web Components](https://vuejs.org/guide/extras/web-components.html)
- [Angular - Web Components](https://angular.io/guide/elements)

---

## Changelog

### 1.0.0 (2025-11-02)

- Initial framework integration guideline
- React, Vue 3, Angular, Svelte patterns
- TypeScript support for each framework
- Event handling patterns
- SSR considerations
- Common patterns and examples
- Agent-optimized format (~480 lines, no duplication)

---

**This guideline ensures Sando Web Components work seamlessly across all major frameworks. The key principle: components are framework-agnostic by design, with framework-specific configuration for optimal integration.**
