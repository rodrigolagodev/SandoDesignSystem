# Quick Start

Get started with Sando design tokens in your project.

::: warning Components Coming Soon
This guide focuses on using Sando's token system. Component examples are provided for future reference but are not yet implemented.
:::

## Step 1: Create a New Project

::: code-group

```bash [Vite]
pnpm create vite my-app --template vanilla-ts
cd my-app
```

```bash [Next.js]
pnpm create next-app my-app
cd my-app
```

:::

## Step 2: Install Sando

```bash
pnpm add @sando/components @sando/tokens
```

## Step 3: Import Styles and Components

```ts
// main.ts or App.tsx
import '@sando/tokens/css'
import '@sando/components/button'
```

## Step 4: Use Your First Component

```html
<sando-button variant="solid" size="medium">
  Hello Sando!
</sando-button>
```

## Full Example

Here's a complete working example:

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Sando App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/main.ts"></script>
</body>
</html>
```

```ts [main.ts]
import '@sando/tokens/css'
import '@sando/components/button'

const app = document.querySelector('#app')!

app.innerHTML = `
  <div style="padding: 2rem;">
    <h1>Welcome to Sando!</h1>

    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
      <sando-button variant="solid" size="small">
        Small
      </sando-button>

      <sando-button variant="solid" size="medium">
        Medium
      </sando-button>

      <sando-button variant="solid" size="large">
        Large
      </sando-button>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
      <sando-button variant="outline">
        Outline
      </sando-button>

      <sando-button variant="ghost">
        Ghost
      </sando-button>

      <sando-button variant="solid" disabled>
        Disabled
      </sando-button>
    </div>
  </div>
`
```

:::

## Interactive Example

::: warning Coming Soon
Interactive component demos will be available once the component library is published. For now, see the code examples above or visit the [Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/).
:::

## Using with TypeScript

Enable full type safety and autocomplete:

```ts
// vite-env.d.ts or global.d.ts
/// <reference types="@sando/components" />
```

Now you get full IntelliSense:

```tsx
import { SandoButton } from '@sando/components/button'

// TypeScript knows all props and methods
const button = new SandoButton()
button.variant = 'solid'  // ✅ Autocomplete works!
button.size = 'medium'    // ✅ Type-checked
button.onClick = (e) => { // ✅ Event types
  console.log(e)
}
```

## Adding Event Listeners

Sando components emit standard DOM events:

```ts
const button = document.querySelector('sando-button')

button?.addEventListener('click', (event) => {
  console.log('Button clicked!', event)
})
```

In React:

```tsx
<sando-button
  variant="solid"
  onClick={(e) => console.log('Clicked!', e)}
>
  Click me
</sando-button>
```

## Using Custom Properties

Override design tokens with CSS custom properties:

```css
sando-button {
  /* Override button colors */
  --sando-button-solid-backgroundColor-default: #ff6b6b;
  --sando-button-solid-textColor-default: white;
}

/* Or create a custom class */
.my-custom-button {
  --sando-button-solid-backgroundColor-default: var(--my-brand-color);
  --sando-button-solid-backgroundColor-hover: var(--my-brand-color-dark);
}
```

```html
<sando-button class="my-custom-button" variant="solid">
  Custom Style
</sando-button>
```

## Theming

Apply different flavors to components:

```html
<!-- Default flavor (original) -->
<sando-button variant="solid">
  Original Flavor
</sando-button>

<!-- Strawberry flavor -->
<sando-button variant="solid" flavor="strawberry">
  Strawberry Flavor
</sando-button>
```

[Learn more about theming →](/getting-started/theming)

## Next Steps

Now that you've built your first component, explore:

- **[Theming Guide](/getting-started/theming)** - Learn how to customize your design system
- **[Token Architecture](/tokens/architecture)** - Understand the three-layer token system
- **[Component API](/components/button)** - Explore all available components
- **[Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/)** - Interactive component playground

## Common Patterns

### Form with Sando Components

```html
<form>
  <sando-input
    label="Email"
    type="email"
    placeholder="you@example.com"
    required
  ></sando-input>

  <sando-input
    label="Password"
    type="password"
    required
  ></sando-input>

  <sando-button variant="solid" type="submit">
    Sign In
  </sando-button>
</form>
```

### Modal Dialog

```html
<sando-dialog>
  <h2 slot="header">Confirm Action</h2>
  <p>Are you sure you want to continue?</p>
  <div slot="footer">
    <sando-button variant="ghost">Cancel</sando-button>
    <sando-button variant="solid">Confirm</sando-button>
  </div>
</sando-dialog>
```

### Card Layout

```html
<sando-card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
  <sando-button variant="outline">Learn More</sando-button>
</sando-card>
```

## Troubleshooting

### Components not rendering?

Make sure you've imported both the CSS tokens and the component:

```ts
import '@sando/tokens/css'      // ← Don't forget this!
import '@sando/components/button'
```

### TypeScript errors in JSX?

Add the types reference:

```ts
/// <reference types="@sando/components" />
```

### Styles not applying?

Check that CSS custom properties are loaded before components render.

## Get Help

- 📚 [Documentation](/)
- 💬 [GitHub Discussions](https://github.com/yourusername/sando-design-system/discussions)
- 🐛 [Report a Bug](https://github.com/yourusername/sando-design-system/issues)
