# Theming

Learn how to customize and theme Sando using the three-layer token architecture.

::: info Current Status
Currently, only the `original` flavor is implemented. Additional flavors like `dark` and custom themes are planned for future releases. The examples below show the theming capabilities that will be available.
:::

## Understanding Flavors

Sando uses a concept called **"flavors"** for theming. Just like different sandwiches have different flavors, your design system can have multiple themes:

- `original` - The default theme ✅ **Available now**
- `dark` - Dark mode theme 🚧 **Coming soon**
- Custom flavors - Create your own! 🚧 **Coming soon**

## How Theming Works

Sando's three-layer architecture enables powerful theming:

```
Recipes (Components)
    ↓ references
Flavors (Themes) ← You customize this layer!
    ↓ references
Ingredients (Primitives)
```

By changing the **Flavors** layer, you retheme the entire design system without touching components or primitives.

## Applying a Flavor (Future Capability)

::: tip Future Feature
The examples below demonstrate planned theming capabilities. Currently, only the `original` flavor is available.
:::

### Via HTML Attribute

The simplest way to apply a flavor (planned):

```html
<!-- Default flavor - Available now -->
<sando-button variant="solid">
  Original
</sando-button>

<!-- Apply custom flavor - Coming soon -->
<sando-button variant="solid" flavor="dark">
  Dark Theme
</sando-button>
```

### Via Container

Apply a flavor to all children:

```html
<div flavor="strawberry">
  <!-- All Sando components inside inherit the strawberry flavor -->
  <sando-button variant="solid">Button</sando-button>
  <sando-input label="Name"></sando-input>
  <sando-card>Card content</sando-card>
</div>
```

### Via CSS Selector

Target specific elements with CSS:

```css
/* Apply flavor to all buttons in a section */
.hero-section sando-button {
  /* Flavor is applied via the [flavor] attribute */
}
```

```html
<div class="hero-section">
  <sando-button variant="solid" flavor="strawberry">
    CTA Button
  </sando-button>
</div>
```

## Creating a Custom Flavor

### Step 1: Define Your Flavor Tokens

Create a new flavor file in your project:

```json
// flavors/mint.json
{
  "color": {
    "background": {
      "base": {
        "value": "{color.green.50.value}",
        "type": "color"
      },
      "surface": {
        "value": "{color.green.100.value}",
        "type": "color"
      }
    },
    "text": {
      "body": {
        "value": "{color.green.900.value}",
        "type": "color"
      },
      "heading": {
        "value": "{color.green.950.value}",
        "type": "color"
      }
    },
    "action": {
      "solid": {
        "background": {
          "default": {
            "value": "{color.green.600.value}",
            "type": "color"
          },
          "hover": {
            "value": "{color.green.700.value}",
            "type": "color"
          }
        }
      }
    }
  }
}
```

### Step 2: Build Your Custom Tokens

Use Style Dictionary to generate CSS:

```js
// build-tokens.js
import StyleDictionary from 'style-dictionary'

const sd = new StyleDictionary({
  source: ['flavors/mint.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/flavors/',
      files: [{
        destination: 'mint.css',
        format: 'css/variables',
        options: {
          selector: '[flavor="mint"]'
        }
      }]
    }
  }
})

await sd.buildAllPlatforms()
```

### Step 3: Import Your Flavor

```ts
import '@sando/tokens/css'
import './dist/css/flavors/mint.css'  // Your custom flavor
```

### Step 4: Use Your Flavor

```html
<sando-button variant="solid" flavor="mint">
  Mint Button
</sando-button>
```

## Dark Mode

Sando supports dark mode as a flavor:

```html
<!-- Automatically switches based on system preference -->
<html class="auto">
  <sando-button variant="solid">Auto Theme</sando-button>
</html>

<!-- Force dark mode -->
<html flavor="dark">
  <sando-button variant="solid">Dark Theme</sando-button>
</html>

<!-- Force light mode -->
<html flavor="light">
  <sando-button variant="solid">Light Theme</sando-button>
</html>
```

### Implementing Dark Mode Toggle

```ts
function toggleDarkMode() {
  const html = document.documentElement
  const isDark = html.getAttribute('flavor') === 'dark'

  html.setAttribute('flavor', isDark ? 'light' : 'dark')
  localStorage.setItem('theme', isDark ? 'light' : 'dark')
}

// Restore theme on load
const savedTheme = localStorage.getItem('theme')
if (savedTheme) {
  document.documentElement.setAttribute('flavor', savedTheme)
}
```

## Scoped Theming

Apply different themes to different sections:

```html
<div class="container">
  <!-- Header with dark theme -->
  <header flavor="dark">
    <sando-button variant="solid">Sign In</sando-button>
  </header>

  <!-- Main content with light theme -->
  <main flavor="light">
    <sando-card>Content...</sando-card>
  </main>

  <!-- Footer with custom theme -->
  <footer flavor="mint">
    <sando-button variant="outline">Contact</sando-button>
  </footer>
</div>
```

## Runtime Theme Switching

Switch themes dynamically:

```ts
function applyTheme(themeName: string) {
  // Update root element
  document.documentElement.setAttribute('flavor', themeName)

  // Or update specific container
  const container = document.querySelector('.themed-section')
  container?.setAttribute('flavor', themeName)
}

// Usage
applyTheme('strawberry')
```

## Customizing Individual Components

Override specific tokens for a component:

```css
/* Override button colors without creating a full flavor */
.custom-button {
  --sando-button-solid-backgroundColor-default: #ff6b6b;
  --sando-button-solid-backgroundColor-hover: #ff5252;
  --sando-button-solid-textColor-default: white;
}
```

```html
<sando-button class="custom-button" variant="solid">
  Custom Button
</sando-button>
```

## Available Flavor Tokens

All flavor tokens follow this pattern:

### Colors

```css
/* Backgrounds */
--sando-color-background-base
--sando-color-background-surface
--sando-color-background-raised
--sando-color-background-overlay

/* Text */
--sando-color-text-body
--sando-color-text-heading
--sando-color-text-caption
--sando-color-text-muted

/* Actions */
--sando-color-action-solid-background-default
--sando-color-action-solid-background-hover
--sando-color-action-solid-background-active
--sando-color-action-solid-textColor-default

/* Borders */
--sando-color-border-default
--sando-color-border-emphasis
--sando-color-border-muted

/* State */
--sando-color-state-success-background
--sando-color-state-destructive-background
--sando-color-state-warning-background
```

### Spacing (rarely customized per flavor)

```css
--sando-spacing-comfortable
--sando-spacing-compact
```

## Best Practices

### ✅ DO

- Use the `flavor` attribute for theming
- Create semantic flavor names (`dark`, `light`, `brand`)
- Keep flavors consistent across components
- Test color contrast in all flavors (WCAG AA)

### ❌ DON'T

- Override ingredient tokens directly (use flavors instead)
- Create too many flavors (2-3 is usually enough)
- Mix flavors inconsistently
- Forget to test accessibility

## Advanced: Flavor-Specific Components

Some components might need flavor-specific behavior:

```ts
import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'

class MyComponent extends LitElement {
  @property() flavor = 'original'

  render() {
    return html`
      <div class="component" flavor="${this.flavor}">
        ${this.flavor === 'dark'
          ? html`<icon-moon></icon-moon>`
          : html`<icon-sun></icon-sun>`
        }
      </div>
    `
  }
}
```

## Flavor Showcase

Here's how different flavors look:

<div class="flavor-showcase">
  <div flavor="original">
    <h4>Original</h4>
    <sando-button variant="solid">Button</sando-button>
  </div>

  <div flavor="strawberry">
    <h4>Strawberry</h4>
    <sando-button variant="solid">Button</sando-button>
  </div>

  <div flavor="dark">
    <h4>Dark</h4>
    <sando-button variant="solid">Button</sando-button>
  </div>
</div>

<style>
.flavor-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.flavor-showcase > div {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
}
</style>

## Next Steps

- **[Token Architecture](/tokens/architecture)** - Deep dive into the three-layer system
- **[Flavors Reference](/tokens/flavors)** - All available flavor tokens
- **[Accessibility Guide](/guides/accessibility)** - Ensure your themes are accessible
