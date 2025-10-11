# Why Flavors, Not Themes

## The Problem with Traditional Theming

Most design systems use generic approaches like `data-theme` attributes or framework-specific `<ThemeProvider>` wrappers. While functional, these approaches have significant limitations:

### 1. All-or-Nothing Theming

```html
<!-- ❌ Traditional approach: data-theme -->
<html data-theme="dark">
  <body>
    <!-- ALL components must be dark -->
    <button>Dark button</button>
    <button>Dark button</button>
    <button>Dark button</button>

    <!-- Want ONE light button? Need a wrapper div -->
    <div data-theme="light">
      <button>Light button (requires wrapper 😞)</button>
    </div>
  </body>
</html>
```

**Problems:**
- ❌ Requires extra wrapper elements for individual overrides
- ❌ Cannot mix themes easily in the same context
- ❌ Creates unnecessary DOM nesting
- ❌ Harder to maintain and reason about

### 2. Framework Lock-In

```tsx
// ❌ React-only approach
import { ThemeProvider } from '@my-design-system/react';

function App() {
  return (
    <ThemeProvider theme="dark">
      <Button>Only works in React</Button>
    </ThemeProvider>
  );
}
```

**Problems:**
- ❌ Only works in specific frameworks (React, Vue, Angular)
- ❌ Breaks the promise of Web Components (framework-agnostic)
- ❌ Requires different implementations for each framework
- ❌ Users stuck with your framework choice

### 3. Lack of Granularity

```html
<!-- ❌ Context-only theming -->
<div class="theme-dark">
  <button>I'm dark</button>
  <button>I'm dark</button>
  <!-- I want THIS button to be accent color, but... -->
  <button class="theme-accent">Still inherits dark theme</button>
</div>
```

**Problems:**
- ❌ Hard to create exceptions or highlights
- ❌ Requires complex CSS overrides
- ❌ Not intuitive for developers

---

## The Sando Solution: Flavors 🥪

Inspired by the Japanese **"katsu sando" (sandwich)**, Sando uses a **flavor-based system** that treats theming like sandwich fillings: you can choose different flavors for different parts, mix them freely, and create unique combinations.

### Core Philosophy

> **"Every component can have its own flavor, while respecting inherited context"**

Think of it like a sandwich shop:
- 🍞 **Ingredients** (bottom bread): Raw materials (colors, spacing)
- 🥓 **Flavors** (filling): The theme/taste (original, strawberry, chocolate, dark)
- 🍞 **Recipes** (top bread): Final component styling

### How It Works

```html
<!-- ✅ Sando approach: flavor attribute -->
<html flavor="dark">
  <body>
    <!-- Components inherit dark flavor -->
    <sando-button>Dark button (inherited)</sando-button>
    <sando-button>Dark button (inherited)</sando-button>

    <!-- Override individual component - NO wrapper needed! -->
    <sando-button flavor="strawberry">Strawberry button</sando-button>

    <!-- Back to dark -->
    <sando-button>Dark button (inherited)</sando-button>
  </body>
</html>
```

**Benefits:**
- ✅ **Granular control**: Change individual components
- ✅ **No wrappers**: Direct attribute on component
- ✅ **Mix and match**: Different flavors in same context
- ✅ **Framework-agnostic**: Works everywhere (React, Vue, Angular, Vanilla)
- ✅ **Intuitive**: "This button tastes like strawberry"

---

## Real-World Use Cases

### 1. E-commerce: Featured Products

```html
<div flavor="dark" class="product-grid">
  <!-- Regular products use dark flavor -->
  <product-card>
    <h3>Regular Product</h3>
    <sando-button>Add to Cart</sando-button>
  </product-card>

  <product-card>
    <h3>Regular Product</h3>
    <sando-button>Add to Cart</sando-button>
  </product-card>

  <!-- Featured product stands out with different flavor -->
  <product-card class="featured">
    <h3>⭐ FEATURED</h3>
    <sando-button flavor="gold">Buy Now - 50% OFF!</sando-button>
  </product-card>

  <product-card>
    <h3>Regular Product</h3>
    <sando-button>Add to Cart</sando-button>
  </product-card>
</div>
```

**Why it works:** The featured CTA stands out without changing the entire card's theme.

### 2. SaaS Dashboard: Contextual Actions

```html
<div flavor="light" class="dashboard">
  <nav>
    <sando-button variant="ghost">Home</sando-button>
    <sando-button variant="ghost">Analytics</sando-button>
    <sando-button variant="ghost">Settings</sando-button>
  </nav>

  <main>
    <h1>Welcome back, User!</h1>

    <!-- Danger actions use destructive flavor -->
    <sando-button flavor="destructive" status="destructive">
      Delete Account
    </sando-button>

    <!-- Primary actions use vibrant flavor -->
    <sando-button flavor="vibrant">
      Upgrade to Pro
    </sando-button>
  </main>
</div>
```

**Why it works:** Different actions communicate different intents through flavor.

### 3. Marketing Landing Page: Section Themes

```html
<!DOCTYPE html>
<html flavor="light">
  <!-- Hero section: light flavor -->
  <section class="hero">
    <h1>Welcome to Our Product</h1>
    <sando-button size="large">Get Started</sando-button>
  </section>

  <!-- Features section: changes to dark flavor -->
  <section flavor="dark" class="features">
    <h2>Amazing Features</h2>
    <sando-button variant="outline">Learn More</sando-button>
  </section>

  <!-- Testimonials: back to light (inherited from html) -->
  <section class="testimonials">
    <h2>What Customers Say</h2>
    <sando-button variant="ghost">Read Reviews</sando-button>
  </section>

  <!-- CTA section: vibrant flavor for conversion -->
  <section flavor="vibrant" class="cta">
    <h2>Ready to Start?</h2>
    <!-- This button inherits vibrant, but we override it -->
    <sando-button flavor="strawberry" size="large">
      Start Free Trial
    </sando-button>
  </section>
</html>
```

**Why it works:** Each section has its own flavor, components inherit automatically, and individual overrides are still possible.

---

## Flavor Inheritance

Flavors follow a **hierarchical inheritance model**:

```html
<html flavor="dark">          <!-- Level 1: Global -->
  <body>
    <div flavor="ocean">      <!-- Level 2: Section -->
      <article>               <!-- Level 3: Inherits ocean -->

        <!-- Inherits ocean from ancestor -->
        <sando-button>Ocean button</sando-button>

        <!-- Override to strawberry -->
        <sando-button flavor="strawberry">
          Strawberry button
        </sando-button>

        <!-- Back to ocean -->
        <sando-button>Ocean button</sando-button>

      </article>
    </div>

    <!-- Outside the ocean section, back to dark -->
    <sando-button>Dark button</sando-button>
  </body>
</html>
```

**Inheritance Rules:**
1. Component looks for explicit `flavor` attribute on itself
2. If none, looks for nearest ancestor with `flavor` attribute
3. If none found, uses default `flavor="original"`

---

## Comparison Table

| Feature | Traditional `data-theme` | Strapi `ThemeProvider` | **Sando `flavor`** |
|---------|--------------------------|------------------------|-------------------|
| **Framework Agnostic** | ✅ Yes | ❌ React-only | ✅ Yes |
| **Individual Overrides** | ⚠️ Requires wrapper | ⚠️ Requires nested provider | ✅ Direct attribute |
| **Mix Themes** | ❌ Difficult | ❌ Difficult | ✅ Natural |
| **Performance** | ✅ Good | ⚠️ Re-renders | ✅ Excellent |
| **Intuitive API** | ⚠️ Generic | ✅ Framework-native | ✅ Flavor analogy |
| **Type Safety** | ❌ No | ✅ Yes | ⚠️ Partial (via TS) |
| **DOM Overhead** | ⚠️ Extra wrappers | ⚠️ Extra providers | ✅ None |
| **Unique Philosophy** | ❌ Generic | ❌ Common | ✅ Sandwich analogy |

---

## The "Katsu Sando" Philosophy

### What is a Katsu Sando?

A **katsu sando** is a Japanese sandwich consisting of:
1. **Bread** (top and bottom)
2. **Katsu** (breaded cutlet - the star)
3. **Sauce & fixings**

### How it Maps to Sando Design System

```
┌─────────────────────┐
│   Top Bread         │ ← Recipes (Component tokens)
├─────────────────────┤
│   Katsu + Sauce     │ ← Flavors (Semantic/theme tokens)
├─────────────────────┤
│   Bottom Bread      │ ← Ingredients (Primitive tokens)
└─────────────────────┘
```

### The Analogy

- **Ingredients** = Basic building blocks (flour, oil, eggs)
- **Flavors** = The taste/theme (tonkatsu sauce, curry, strawberry jam)
- **Recipes** = Final assembled dish (button, card, modal)

Just like you can make:
- **Original katsu sando** (classic tonkatsu sauce)
- **Strawberry sando** (sweet fruit filling)
- **Chocolate sando** (dessert version)

You can create:
- **`flavor="original"`** (default theme)
- **`flavor="strawberry"`** (pink/red theme)
- **`flavor="chocolate"`** (brown theme)

**The key insight:** Different flavors, same structure. Different themes, same architecture.

---

## Technical Implementation

### How Flavors Work Under the Hood

```typescript
// 1. Component has flavor property
@customElement('sando-button')
export class SandoButton extends LitElement {
  @property({ reflect: true })
  flavor = 'original';

  connectedCallback() {
    super.connectedCallback();

    // If no explicit flavor, inherit from ancestor
    if (!this.hasAttribute('flavor')) {
      const inherited = this.closest('[flavor]')?.getAttribute('flavor');
      if (inherited) {
        this.flavor = inherited;
      }
    }
  }
}
```

```css
/* 2. CSS selects based on flavor attribute */
:host([flavor="original"]) {
  --button-bg: var(--color-action-solid-background-default);
  --button-text: var(--color-action-solid-text-default);
}

:host([flavor="strawberry"]) {
  --button-bg: #ff6b6b;
  --button-text: white;
}

:host([flavor="dark"]) {
  --button-bg: #1f2937;
  --button-text: white;
}

/* 3. Component styles use the CSS variables */
.button {
  background: var(--button-bg);
  color: var(--button-text);
  /* ... */
}
```

### CSS Custom Properties for Overrides

```html
<!-- Global flavor -->
<sando-button flavor="original">Original</sando-button>

<!-- Surgical override via CSS variables -->
<sando-button
  flavor="original"
  style="
    --sando-button-backgroundColor: purple;
    --sando-button-textColor: white;
  ">
  Custom Purple
</sando-button>
```

**Three levels of customization:**
1. **Flavor attribute** - Broad theme change
2. **CSS variables** - Surgical overrides
3. **Inline styles** - One-off customizations

---

## Migration from Other Systems

### From `data-theme`

```html
<!-- Before: data-theme -->
<div data-theme="dark">
  <button>Dark button</button>
  <div data-theme="light">
    <button>Light button (extra wrapper)</button>
  </div>
</div>

<!-- After: flavor -->
<div flavor="dark">
  <sando-button>Dark button</sando-button>
  <sando-button flavor="light">Light button (no wrapper)</sando-button>
</div>
```

### From `ThemeProvider`

```tsx
// Before: ThemeProvider (React-only)
<ThemeProvider theme="dark">
  <Button>Dark button</Button>
</ThemeProvider>

// After: flavor (framework-agnostic)
<div flavor="dark">
  <sando-button>Dark button</sando-button>
</div>
```

---

## Best Practices

### DO ✅

1. **Use flavor for broad theme changes**
   ```html
   <sando-button flavor="dark">Dark theme</sando-button>
   ```

2. **Leverage inheritance for sections**
   ```html
   <section flavor="ocean">
     <!-- All buttons here are ocean -->
     <sando-button>Ocean button</sando-button>
   </section>
   ```

3. **Override individuals when needed**
   ```html
   <div flavor="dark">
     <sando-button>Dark</sando-button>
     <sando-button flavor="vibrant">Call to Action!</sando-button>
   </div>
   ```

4. **Use CSS variables for fine-tuning**
   ```html
   <sando-button
     flavor="original"
     style="--sando-button-backgroundColor: #custom;">
     Custom
   </sando-button>
   ```

### DON'T ❌

1. **Don't create wrapper divs for theming**
   ```html
   <!-- ❌ Bad -->
   <div flavor="dark">
     <sando-button>Button</sando-button>
   </div>

   <!-- ✅ Good -->
   <sando-button flavor="dark">Button</sando-button>
   ```

2. **Don't override every component**
   ```html
   <!-- ❌ Bad (repetitive) -->
   <sando-button flavor="dark">Button 1</sando-button>
   <sando-button flavor="dark">Button 2</sando-button>
   <sando-button flavor="dark">Button 3</sando-button>

   <!-- ✅ Good (use inheritance) -->
   <div flavor="dark">
     <sando-button>Button 1</sando-button>
     <sando-button>Button 2</sando-button>
     <sando-button>Button 3</sando-button>
   </div>
   ```

3. **Don't mix theming paradigms**
   ```html
   <!-- ❌ Confusing -->
   <div data-theme="dark" flavor="light">
     <sando-button class="theme-ocean">What am I?</sando-button>
   </div>

   <!-- ✅ Consistent -->
   <div flavor="dark">
     <sando-button flavor="ocean">Clear intent</sando-button>
   </div>
   ```

---

## Future Enhancements

### Planned Features

1. **Auto-generated Flavor Palettes**
   ```css
   /* Generate entire flavor from single color */
   :host([flavor="custom"]) {
     --flavor-base: #3b82f6;
     --flavor-light: color-mix(in oklch, var(--flavor-base) 80%, white);
     --flavor-dark: color-mix(in oklch, var(--flavor-base) 80%, black);
   }
   ```

2. **Flavor Presets**
   ```typescript
   // Import pre-made flavor palettes
   import { oceanFlavor, sunsetFlavor } from '@sando/flavors';
   ```

3. **Dynamic Flavor Creation**
   ```typescript
   // Runtime flavor generation
   createFlavor('brand', {
     primary: '#ff6b6b',
     contrast: 'auto', // Automatically ensure WCAG compliance
   });
   ```

---

## Conclusion

The Sando flavor system is more than just theming—it's a **philosophy**:

> **"Flexibility without complexity, consistency without rigidity"**

By treating themes as "flavors" rather than rigid contexts, Sando empowers developers to:
- Mix themes freely
- Override individuals without wrappers
- Stay framework-agnostic
- Express intent through analogy

**Sando isn't trying to be like other design systems. It's trying to be better.**

---

## Learn More

- [Flavor Architecture](/tokens/flavors) - Deep dive into flavor tokens
- [Theming Guide](/getting-started/theming) - Practical theming tutorial
- [Three-Layer System](/tokens/architecture) - Ingredients → Flavors → Recipes

---

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px;">
  <h3>Ready to taste the difference?</h3>
  <p>Start using Sando's unique flavor system today.</p>
  <a href="/getting-started/installation" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background: #f97415; color: white; border-radius: 6px; text-decoration: none; font-weight: 600;">
    Get Started →
  </a>
</div>
