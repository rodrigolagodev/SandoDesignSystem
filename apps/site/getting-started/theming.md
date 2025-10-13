# Theming & Color Modes

Learn how to customize and theme Sando using the three-layer token architecture with automatic dark mode support.

## Understanding Flavors vs Modes

Sando separates theming into two independent concepts:

### Flavors (Color Palettes)
**Flavors** are complete color palettes - think of them as different "brands" or "themes":
- `original` - The default Sando palette ✅ **Available**
- `strawberry`, `ocean`, `mint` - Custom palettes 🚧 **Coming soon**

### Modes (Accessibility Variants)
**Modes** are accessibility-focused variants that work with ANY flavor:

**Color Modes** (mutually exclusive - only one at a time):
- **Light** (default) - Base colors for daytime use
- **Dark** (`flavor-mode="dark"`) - Inverted colors for low-light
- **High Contrast** (`flavor-mode="high-contrast"`) - Maximum contrast for WCAG AAA
- **Forced Colors** (system-only) - Windows High Contrast mode

**Motion Mode** (independent - combines with any color mode):
- **Motion Reduce** (auto via `@media`) - Disables animations for accessibility

## How It Works

```
┌─────────────────────────────────────────┐
│  Flavor: original                       │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ Light Mode  │  │ Dark Mode   │     │
│  │ (default)   │  │ (dark)      │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ High        │  │ Forced      │     │
│  │ Contrast    │  │ Colors      │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│  + Motion Reduce (works with all)      │
└─────────────────────────────────────────┘
```

Each **flavor** has multiple **mode** variants. Modes are automatically applied based on user preferences or can be manually overridden.

## Automatic Mode Detection

Sando automatically detects and applies modes based on system preferences:

```html
<!-- User has dark mode enabled? Automatically applies dark colors -->
<sando-button variant="solid">Auto Dark</sando-button>

<!-- User has reduced motion enabled? Animations disabled automatically -->
<sando-button variant="solid">No Animations</sando-button>

<!-- User has high contrast enabled? Maximum contrast applied -->
<sando-button variant="solid">High Contrast</sando-button>
```

**No JavaScript required!** Sando uses CSS `@media` queries:
- `@media (prefers-color-scheme: dark)` → Dark mode
- `@media (prefers-contrast: more)` → High contrast
- `@media (prefers-reduced-motion: reduce)` → No animations
- `@media (forced-colors: active)` → Windows High Contrast

## Manual Mode Override

Override automatic detection for testing or user preference:

### Global Override (Entire Page)

```html
<!-- Force dark mode for entire page -->
<html flavor-mode="dark">
  <body>
    <!-- All components inherit dark mode -->
    <sando-button variant="solid">Dark Button</sando-button>
    <sando-card>Dark Card</sando-card>
  </body>
</html>

<!-- Force high contrast -->
<html flavor-mode="high-contrast">
  <body>
    <sando-button variant="solid">High Contrast Button</sando-button>
  </body>
</html>
```

### Section Override

```html
<body>
  <!-- Light mode section -->
  <header>
    <sando-button variant="solid">Light Button</sando-button>
  </header>

  <!-- Dark mode section -->
  <section flavor-mode="dark">
    <sando-button variant="solid">Dark Button</sando-button>
    <sando-card>Dark Card</sando-card>
  </section>

  <!-- High contrast footer -->
  <footer flavor-mode="high-contrast">
    <sando-button variant="solid">High Contrast Button</sando-button>
  </footer>
</body>
```

### Component Override

```html
<!-- Override specific component -->
<sando-button flavor-mode="dark" variant="solid">
  Dark Button
</sando-button>

<!-- While others use auto mode -->
<sando-button variant="solid">
  Auto Mode Button
</sando-button>
```

## Dark Mode Toggle

Implement a dark mode toggle with JavaScript:

```ts
function toggleDarkMode() {
  const html = document.documentElement
  const currentMode = html.getAttribute('flavor-mode')

  if (currentMode === 'dark') {
    // Remove attribute to use auto mode
    html.removeAttribute('flavor-mode')
    localStorage.setItem('theme', 'auto')
  } else {
    // Force dark mode
    html.setAttribute('flavor-mode', 'dark')
    localStorage.setItem('theme', 'dark')
  }
}

// Restore theme on load
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('flavor-mode', 'dark')
}
```

### Three-State Toggle (Auto/Light/Dark)

```ts
type Theme = 'auto' | 'light' | 'dark'

function cycleTheme() {
  const html = document.documentElement
  const currentMode = html.getAttribute('flavor-mode') || 'auto'

  const modes: Theme[] = ['auto', 'light', 'dark']
  const currentIndex = modes.indexOf(currentMode as Theme)
  const nextMode = modes[(currentIndex + 1) % modes.length]

  if (nextMode === 'auto') {
    html.removeAttribute('flavor-mode')
  } else {
    html.setAttribute('flavor-mode', nextMode)
  }

  localStorage.setItem('theme', nextMode)
}
```

## Color Modes Reference

### Light Mode (Default)

```html
<!-- No attribute needed - this is the default -->
<sando-button variant="solid">Light Button</sando-button>

<!-- Or explicitly set (same as no attribute) -->
<div flavor-mode="light">
  <sando-button variant="solid">Light Button</sando-button>
</div>
```

**When to use:**
- Daytime reading
- Well-lit environments
- Maximum color fidelity

### Dark Mode

```html
<!-- Auto via system preference -->
<sando-button variant="solid">Auto Dark</sando-button>

<!-- Manual override -->
<div flavor-mode="dark">
  <sando-button variant="solid">Dark Button</sando-button>
</div>
```

**When to use:**
- Low-light environments
- Night reading
- OLED screen battery saving
- User preference

**Automatic trigger:** `@media (prefers-color-scheme: dark)`

### High Contrast Mode

```html
<!-- Auto via system preference -->
<sando-button variant="solid">Auto High Contrast</sando-button>

<!-- Manual override -->
<div flavor-mode="high-contrast">
  <sando-button variant="solid">High Contrast Button</sando-button>
</div>
```

**When to use:**
- Visual impairments
- Bright sunlight viewing
- WCAG AAA compliance
- Maximum readability

**Features:**
- Black/white colors only
- Thicker borders
- Maximum contrast ratios (21:1)

**Automatic trigger:** `@media (prefers-contrast: more)`

### Forced Colors Mode

```html
<!-- Automatically applied by Windows High Contrast -->
<sando-button variant="solid">System Colors</sando-button>
```

**When to use:**
- Windows High Contrast users
- System-defined color schemes
- Screen reader users

**Features:**
- Uses CSS system colors (`Canvas`, `CanvasText`, `LinkText`, etc.)
- Automatically applied - no manual override available
- Respects user's OS color choices

**Automatic trigger:** `@media (forced-colors: active)`

## Motion Reduce Mode

```html
<!-- Auto via system preference -->
<sando-button variant="solid">No Animations</sando-button>
```

**When to use:**
- Vestibular disorders
- Motion sensitivity
- Reduced distraction
- Better performance

**Features:**
- All animation durations set to `0ms`
- Transitions disabled
- Auto-applied via CSS media query
- No manual override needed

**Automatic trigger:** `@media (prefers-reduced-motion: reduce)`

## Combining Modes

Motion mode is **independent** and combines with any color mode:

```html
<!-- User has BOTH dark mode AND reduced motion enabled -->
<!-- Result: Dark colors + No animations -->
<sando-button variant="solid">Dark + No Motion</sando-button>

<!-- User has high contrast AND reduced motion -->
<!-- Result: High contrast colors + No animations -->
<div flavor-mode="high-contrast">
  <sando-button variant="solid">High Contrast + No Motion</sando-button>
</div>
```

## Customizing Individual Components

Override specific tokens without changing modes:

```css
/* Override button colors */
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

## Mode-Specific Tokens

### Color Tokens (vary by mode)

```css
/* Backgrounds - adapt to light/dark/high-contrast */
--sando-color-background-base
--sando-color-background-surface
--sando-color-background-raised
--sando-color-background-overlay

/* Text - optimal contrast for each mode */
--sando-color-text-body
--sando-color-text-heading
--sando-color-text-caption

/* Actions - accessible in all modes */
--sando-color-action-solid-background-default
--sando-color-action-solid-background-hover
```

### Animation Tokens (vary by motion mode)

```css
/* Durations - 0ms when motion reduced */
--sando-animation-duration-fast
--sando-animation-duration-normal
--sando-animation-duration-slow
```

## Best Practices

### ✅ DO

- **Respect system preferences** - Use auto mode by default
- **Provide manual override** - Let users choose their preference
- **Test all modes** - Verify components work in all modes
- **Maintain contrast** - Ensure WCAG AA in light/dark, AAA in high-contrast
- **Persist user choice** - Save theme preference to localStorage

### ❌ DON'T

- **Force a mode** - Let users control their experience
- **Assume light mode** - Many users prefer dark
- **Forget motion reduce** - Critical for accessibility
- **Override system colors** - Forced colors mode must be respected
- **Hardcode colors** - Use tokens for themability

## Accessibility Compliance

| Mode | WCAG Level | Min Contrast |
|------|------------|--------------|
| Light | AA | 4.5:1 |
| Dark | AA | 4.5:1 |
| High Contrast | AAA | 7:1 |
| Forced Colors | System | System-defined |

All Sando modes meet or exceed WCAG 2.1 Level AA. High Contrast mode achieves Level AAA.

## Testing Modes

### In Browser DevTools

**Chrome/Edge:**
1. Open DevTools → Rendering
2. Emulate CSS media features:
   - `prefers-color-scheme: dark`
   - `prefers-contrast: more`
   - `prefers-reduced-motion: reduce`
   - `forced-colors: active`

**Firefox:**
1. Open DevTools → Accessibility
2. Simulate: Dark theme, High contrast, Reduced motion

### Programmatically

```ts
// Check current system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  console.log('Dark mode:', e.matches)
})
```

## Advanced: Creating Custom Flavors

Coming soon - custom flavor creation guide for `strawberry`, `ocean`, etc.

## Next Steps

- **[Flavor Tokens](/tokens/flavors)** - All available flavor tokens
- **[Accessibility Guide](/guides/accessibility)** - Complete accessibility documentation
- **[Component Theming](/components/theming)** - Per-component theme customization
