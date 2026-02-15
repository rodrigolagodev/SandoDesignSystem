---
title: Why Flavors, Not Themes
description: The philosophy behind Sando's unique flavor-based theming system and why it's better than traditional approaches
---

# Why Flavors, Not Themes

Most design systems treat theming as an afterthought—a `data-theme` attribute slapped on the root, or a framework-specific `<ThemeProvider>` that wraps your entire app. Sando takes a fundamentally different approach. Like choosing the filling for a katsu sando, flavors give you granular control over each component's brand identity without the overhead of wrappers, providers, or framework lock-in.

## The Problem with Traditional Theming

### 1. All-or-Nothing Theming

```html
<!-- Traditional approach: data-theme -->
<html data-theme="corporate">
  <body>
    <!-- ALL components must be corporate -->
    <button>Corporate button</button>
    <button>Corporate button</button>
    <button>Corporate button</button>

    <!-- Want ONE different button? Need a wrapper div -->
    <div data-theme="accent">
      <button>Accent button (requires wrapper)</button>
    </div>
  </body>
</html>
```

**Problems:**

- Requires extra wrapper elements for individual overrides
- Cannot mix themes easily in the same context
- Creates unnecessary DOM nesting
- Harder to maintain and reason about

### 2. Framework Lock-In

```tsx
// React-only approach
import { ThemeProvider } from "@my-design-system/react";

function App() {
  return (
    <ThemeProvider theme="corporate">
      <Button>Only works in React</Button>
    </ThemeProvider>
  );
}
```

**Problems:**

- Only works in specific frameworks (React, Vue, Angular)
- Breaks the promise of Web Components (framework-agnostic)
- Requires different implementations for each framework
- Users stuck with your framework choice

### 3. Lack of Granularity

```html
<!-- Context-only theming -->
<div class="theme-corporate">
  <button>I'm corporate</button>
  <button>I'm corporate</button>
  <!-- I want THIS button to stand out, but... -->
  <button class="theme-accent">Still inherits corporate theme</button>
</div>
```

**Problems:**

- Hard to create exceptions or highlights
- Requires complex CSS overrides
- Not intuitive for developers

---

## The Sando Solution: Flavors

Inspired by the Japanese **katsu sando**, Sando uses a **flavor-based system** that treats theming like sandwich fillings: you choose different flavors for different parts, mix them freely, and create unique combinations—all with a single HTML attribute.

### Core Philosophy

> **"Every component can have its own flavor, while respecting inherited context"**

Think of it like a sandwich shop:

- **Ingredients** (the bread): Raw materials (OKLCH colors, spacing, typography)
- **Flavors** (the filling): The brand identity (original, tonkatsu, strawberry, egg-salad, kiwi, sando)
- **Recipes** (the assembled dish): Final component styling

### How It Works

```html
<!-- Sando approach: flavor attribute -->
<html flavor="tonkatsu">
  <body>
    <!-- Components inherit tonkatsu flavor -->
    <sando-button>Tonkatsu button (inherited)</sando-button>
    <sando-button>Tonkatsu button (inherited)</sando-button>

    <!-- Override individual component — NO wrapper needed! -->
    <sando-button flavor="strawberry">Strawberry button</sando-button>

    <!-- Back to tonkatsu -->
    <sando-button>Tonkatsu button (inherited)</sando-button>
  </body>
</html>
```

**Benefits:**

- **Granular control**: Change individual components with a single attribute
- **No wrappers**: Direct attribute on the component itself
- **Mix and match**: Different flavors coexist in the same context
- **Framework-agnostic**: Works everywhere—React, Vue, Angular, Svelte, vanilla HTML
- **Intuitive**: "This button tastes like strawberry"

---

## Real-World Use Cases

### 1. E-commerce: Featured Products

```html
<div flavor="original" class="product-grid">
  <!-- Regular products use original flavor -->
  <product-card>
    <h3>Regular Product</h3>
    <sando-button>Add to Cart</sando-button>
  </product-card>

  <product-card>
    <h3>Regular Product</h3>
    <sando-button>Add to Cart</sando-button>
  </product-card>

  <!-- Featured product stands out with a different flavor -->
  <product-card class="featured">
    <h3>FEATURED</h3>
    <sando-button flavor="strawberry">Buy Now - 50% OFF!</sando-button>
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
<div flavor="sando" class="dashboard">
  <nav>
    <sando-button variant="ghost">Home</sando-button>
    <sando-button variant="ghost">Analytics</sando-button>
    <sando-button variant="ghost">Settings</sando-button>
  </nav>

  <main>
    <h1>Welcome back!</h1>

    <!-- Danger actions use the status prop, not a flavor -->
    <sando-button status="destructive">Delete Account</sando-button>

    <!-- Primary actions use a vibrant flavor for emphasis -->
    <sando-button flavor="strawberry">Upgrade to Pro</sando-button>
  </main>
</div>
```

::: tip Flavors vs. Status
Flavors control **brand identity** (the overall look and feel). The `status` prop controls **semantic state** (success, destructive). Use `status="destructive"` for danger actions—it works consistently across all flavors.
:::

### 3. Marketing Landing Page: Section Themes

```html
<!DOCTYPE html>
<html flavor="original">
  <!-- Hero section: original flavor -->
  <section class="hero">
    <h1>Welcome to Our Product</h1>
    <sando-button size="lg">Get Started</sando-button>
  </section>

  <!-- Features section: tonkatsu flavor for warmth -->
  <section flavor="tonkatsu" class="features">
    <h2>Amazing Features</h2>
    <sando-button variant="outline">Learn More</sando-button>
  </section>

  <!-- Testimonials: back to original (inherited from html) -->
  <section class="testimonials">
    <h2>What Customers Say</h2>
    <sando-button variant="ghost">Read Reviews</sando-button>
  </section>

  <!-- CTA section: strawberry flavor for conversion -->
  <section flavor="strawberry" class="cta">
    <h2>Ready to Start?</h2>
    <!-- This button inherits strawberry, but we can override it -->
    <sando-button flavor="kiwi" size="lg"> Start Free Trial </sando-button>
  </section>
</html>
```

**Why it works:** Each section has its own flavor, components inherit automatically, and individual overrides are still possible.

---

## Flavor Inheritance

Flavors follow a **hierarchical inheritance model**, much like CSS cascading:

```html
<html flavor="original">
  <!-- Level 1: Global -->
  <body>
    <div flavor="tonkatsu">
      <!-- Level 2: Section -->
      <article>
        <!-- Level 3: Inherits tonkatsu -->

        <!-- Inherits tonkatsu from ancestor -->
        <sando-button>Tonkatsu button</sando-button>

        <!-- Override to strawberry -->
        <sando-button flavor="strawberry">Strawberry button</sando-button>

        <!-- Back to tonkatsu -->
        <sando-button>Tonkatsu button</sando-button>
      </article>
    </div>

    <!-- Outside the tonkatsu section, back to original -->
    <sando-button>Original button</sando-button>
  </body>
</html>
```

**Inheritance Rules:**

1. Component looks for an explicit `flavor` attribute on itself
2. If none, looks for nearest ancestor with a `flavor` attribute
3. If none found, falls back to `flavor="original"`

::: tip Dark Mode Is Automatic
Dark mode in Sando is **not** a flavor—it's handled automatically via CSS media queries (`@media (prefers-color-scheme: dark)`). Each flavor has its own dark mode variant built in, so your components adapt to the user's system preference without any extra attributes. No `flavor="dark"` needed.
:::

---

## The Six Flavors

Sando ships with six curated flavors, each inspired by a real sando variety:

| Flavor       | Inspiration                | Character                                      |
| ------------ | -------------------------- | ---------------------------------------------- |
| `original`   | The classic katsu sando    | Warm browns, amber tones—reliable and timeless |
| `sando`      | The house special          | A refined take with distinctive personality    |
| `tonkatsu`   | Deep-fried katsu           | Rich, golden warmth—bold and appetizing        |
| `strawberry` | Fruit sando (ichigo sando) | Pink and red accents—fresh and vibrant         |
| `egg-salad`  | Tamago sando               | Soft yellows—friendly and approachable         |
| `kiwi`       | Fruit sando (kiwi)         | Greens—natural and energizing                  |

```html
<!-- Try them all -->
<sando-button flavor="original">Original</sando-button>
<sando-button flavor="sando">Sando</sando-button>
<sando-button flavor="tonkatsu">Tonkatsu</sando-button>
<sando-button flavor="strawberry">Strawberry</sando-button>
<sando-button flavor="egg-salad">Egg Salad</sando-button>
<sando-button flavor="kiwi">Kiwi</sando-button>
```

---

## Comparison Table

| Feature                  | Traditional `data-theme` | React `ThemeProvider`    | **Sando `flavor`**              |
| ------------------------ | ------------------------ | ------------------------ | ------------------------------- |
| **Framework Agnostic**   | Yes                      | React-only               | **Yes**                         |
| **Individual Overrides** | Requires wrapper         | Requires nested provider | **Direct attribute**            |
| **Mix Themes**           | Difficult                | Difficult                | **Natural**                     |
| **Performance**          | Good                     | Re-renders on change     | **Excellent**                   |
| **Intuitive API**        | Generic                  | Framework-native         | **Flavor analogy**              |
| **DOM Overhead**         | Extra wrappers           | Extra providers          | **None**                        |
| **Dark Mode**            | Manual toggle            | Manual toggle            | **Automatic via media queries** |

---

## The "Katsu Sando" Philosophy

### What is a Katsu Sando?

A **katsu sando** is a Japanese sandwich consisting of:

1. **Shokupan** (milk bread)—soft, pillowy, precisely sliced
2. **Katsu** (breaded cutlet)—the star, golden and crispy
3. **Sauce & fixings**—the finishing touch

### How It Maps to Sando Design System

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

- **Ingredients** = Basic building blocks (flour, oil, panko)
- **Flavors** = The taste and identity (tonkatsu sauce, strawberry jam, egg salad)
- **Recipes** = Final assembled dish (button, input, badge)

Just like you can make:

- **Original katsu sando** (classic tonkatsu sauce)
- **Strawberry sando** (sweet fruit filling)
- **Egg salad sando** (creamy tamago)

You can create:

- **`flavor="original"`** (warm brown theme)
- **`flavor="strawberry"`** (pink/red theme)
- **`flavor="egg-salad"`** (soft yellow theme)

**The key insight:** Different flavors, same structure. Different themes, same architecture.

---

## Technical Implementation

### How Flavors Work Under the Hood

Sando uses a `FlavorableMixin` that adds flavor inheritance to every component:

```typescript
// Simplified version of the FlavorableMixin
export const FlavorableMixin = <T extends Constructor<LitElement>>(Base: T) => {
  class Flavorable extends Base {
    @property({ reflect: true })
    flavor = "original";

    connectedCallback() {
      super.connectedCallback();

      // If no explicit flavor, inherit from nearest ancestor
      if (!this.hasAttribute("flavor")) {
        const ancestor = this.closest("[flavor]");
        if (ancestor) {
          this._inheritedFlavor = ancestor.getAttribute("flavor");
        }
      }
    }

    get effectiveFlavor(): string {
      return this._hasExplicitFlavor
        ? this.flavor
        : this._inheritedFlavor || this.flavor;
    }
  }
  return Flavorable;
};
```

Each flavor maps to a set of design tokens through CSS custom properties. The token system ensures colors are always in OKLCH format for perceptual uniformity:

```css
/* Flavor tokens are applied via CSS custom properties */
/* original flavor (default) */
:host {
  --sando-button-solid-backgroundColor-default: var(
    --sando-flavor-action-solid-bg
  );
  --sando-button-solid-textColor-default: var(--sando-flavor-action-solid-text);
}

/* Each flavor overrides the semantic tokens */
/* e.g., strawberry maps pink OKLCH values to the same token names */
```

### CSS Custom Properties for Overrides

```html
<!-- Global flavor -->
<sando-button flavor="original">Original</sando-button>

<!-- Surgical override via CSS variables -->
<sando-button
  flavor="original"
  style="
    --sando-button-solid-backgroundColor-default: oklch(0.56 0.14 15);
    --sando-button-solid-textColor-default: oklch(1 0 0);
  "
>
  Custom Red
</sando-button>
```

**Three levels of customization:**

1. **Flavor attribute** — Broad brand identity change
2. **CSS custom properties** — Surgical overrides for specific tokens
3. **Inline styles** — One-off customizations

---

## Migration from Other Systems

### From `data-theme`

```html
<!-- Before: data-theme -->
<div data-theme="corporate">
  <button>Corporate button</button>
  <div data-theme="accent">
    <button>Accent button (extra wrapper)</button>
  </div>
</div>

<!-- After: flavor -->
<div flavor="tonkatsu">
  <sando-button>Tonkatsu button</sando-button>
  <sando-button flavor="strawberry"
    >Strawberry button (no wrapper)</sando-button
  >
</div>
```

### From `ThemeProvider`

```tsx
// Before: ThemeProvider (React-only)
<ThemeProvider theme="corporate">
  <Button>Corporate button</Button>
</ThemeProvider>

// After: flavor (framework-agnostic)
<div flavor="tonkatsu">
  <sando-button>Tonkatsu button</sando-button>
</div>
```

---

## Best Practices

### DO

1. **Use flavor for broad brand changes**

   ```html
   <sando-button flavor="tonkatsu">Tonkatsu theme</sando-button>
   ```

2. **Leverage inheritance for sections**

   ```html
   <section flavor="tonkatsu">
     <!-- All components here inherit tonkatsu -->
     <sando-button>Tonkatsu button</sando-button>
     <sando-input placeholder="Tonkatsu input"></sando-input>
   </section>
   ```

3. **Override individuals when needed**

   ```html
   <div flavor="original">
     <sando-button>Original</sando-button>
     <sando-button flavor="strawberry">Call to Action!</sando-button>
   </div>
   ```

4. **Use CSS custom properties for fine-tuning**
   ```html
   <sando-button
     flavor="original"
     style="--sando-button-solid-backgroundColor-default: oklch(0.56 0.11 230);"
   >
     Custom Blue
   </sando-button>
   ```

### DON'T

1. **Don't create wrapper divs for single components**

   ```html
   <!-- Bad -->
   <div flavor="tonkatsu">
     <sando-button>Button</sando-button>
   </div>

   <!-- Good -->
   <sando-button flavor="tonkatsu">Button</sando-button>
   ```

2. **Don't repeat the same flavor on every component**

   ```html
   <!-- Bad (repetitive) -->
   <sando-button flavor="tonkatsu">Button 1</sando-button>
   <sando-button flavor="tonkatsu">Button 2</sando-button>
   <sando-button flavor="tonkatsu">Button 3</sando-button>

   <!-- Good (use inheritance) -->
   <div flavor="tonkatsu">
     <sando-button>Button 1</sando-button>
     <sando-button>Button 2</sando-button>
     <sando-button>Button 3</sando-button>
   </div>
   ```

3. **Don't mix theming paradigms**

   ```html
   <!-- Bad — confusing -->
   <div data-theme="corporate" flavor="tonkatsu">
     <sando-button class="theme-strawberry">What am I?</sando-button>
   </div>

   <!-- Good — consistent -->
   <div flavor="tonkatsu">
     <sando-button flavor="strawberry">Clear intent</sando-button>
   </div>
   ```

4. **Don't use flavor for semantic states**

   ```html
   <!-- Bad — flavors aren't for status -->
   <sando-button flavor="strawberry">Delete Account</sando-button>

   <!-- Good — use the status prop -->
   <sando-button status="destructive">Delete Account</sando-button>
   ```

---

## Conclusion

The Sando flavor system is more than just theming—it's a **philosophy**:

> **"Flexibility without complexity, consistency without rigidity"**

By treating themes as "flavors" rather than rigid contexts, Sando empowers you to:

- Mix brand identities freely across your UI
- Override individual components without wrappers
- Stay framework-agnostic with pure HTML attributes
- Let dark mode happen automatically
- Express intent through a natural, memorable analogy

Like a great katsu sando, the best design systems layer quality ingredients into something greater than the sum of its parts.

---

## Learn More

- **[Flavor Architecture](/tokens/flavors)** — Deep dive into flavor tokens and how they're built
- **[Theming Guide](/getting-started/theming)** — Practical tutorial for applying flavors to your project
- **[Three-Layer System](/tokens/architecture)** — Understand Ingredients, Flavors, and Recipes
