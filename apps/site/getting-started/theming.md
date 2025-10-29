# Theming & Color Modes

Learn how to customize and theme Sando using the three-layer token architecture with automatic dark mode support.

## Understanding Flavors vs Modes

Sando separates theming into two independent concepts:

### Flavors (Color Palettes)
**Flavors** are complete color palettes - think of them as different "brands" or "themes":
- `original` - The default Sando flavor (neutral-based) ✅ **Available**
- `strawberry` (orange-based), `ocean` (blue-based), `forest` (green-based), `sunset` (orange+warm) ✅ **Available**

Flavors are built from our **8 curated color palettes**: orange, blue, green, red, purple, pink + 3 neutral variants (neutral, neutral-warm, neutral-cool).

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

Each **flavor** has multiple **mode** variants. Modes are **automatically applied** based on user system preferences and cannot be manually overridden.

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

**Note:** Modes are **automatic only** and respect system preferences. They cannot be manually overridden via HTML attributes. This ensures accessibility preferences are always honored.

## Color Modes Reference

### Light Mode (Default)

```html
<!-- Default mode when no system preference is set -->
<sando-button variant="solid">Light Button</sando-button>
```

**When to use:**
- Daytime reading
- Well-lit environments
- Maximum color fidelity
- Default when no system preference

### Dark Mode

```html
<!-- Automatically applies when system dark mode is enabled -->
<sando-button variant="solid">Dark Button</sando-button>
```

**When applied:**
- User has dark mode enabled in system settings
- `@media (prefers-color-scheme: dark)` matches

**Benefits:**
- Low-light environments
- Night reading
- OLED screen battery saving
- Reduced eye strain

### High Contrast Mode

```html
<!-- Automatically applies when system high contrast is enabled -->
<sando-button variant="solid">High Contrast Button</sando-button>
```

**When applied:**
- User has high contrast enabled in system settings
- `@media (prefers-contrast: more)` matches

**Benefits:**
- Visual impairments
- Bright sunlight viewing
- WCAG AAA compliance
- Maximum readability

**Features:**
- Black/white colors only
- Thicker borders
- Maximum contrast ratios (21:1)

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
<!-- Result: Dark colors + No animations (both applied automatically) -->
<sando-button variant="solid">Dark + No Motion</sando-button>

<!-- User has high contrast AND reduced motion -->
<!-- Result: High contrast colors + No animations (both applied automatically) -->
<sando-button variant="solid">High Contrast + No Motion</sando-button>
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

- **Respect system preferences** - Modes are automatic and honor user settings
- **Test all modes** - Verify components work in light, dark, and high contrast modes
- **Maintain contrast** - Ensure WCAG AA in light/dark, AAA in high-contrast
- **Use design tokens** - All colors should reference token CSS variables
- **Support DevTools testing** - Use browser emulation to test different modes

### ❌ DON'T

- **Try to override modes** - System preferences are always honored for accessibility
- **Assume light mode** - Many users prefer dark mode by default
- **Forget motion reduce** - Critical for users with vestibular disorders
- **Override system colors** - Forced colors mode must be respected
- **Hardcode colors** - Use tokens for automatic theme adaptation

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

### Using Our Curated Palettes

Create flavors by mapping our 8 color palettes to semantic roles:

```json
// packages/tokens/src/flavors/lavender.json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.purple.600.value}", "type": "color" }
        }
      }
    },
    "background": {
      "base": { "value": "{color.neutral-cool.50.value}", "type": "color" }
    }
  }
}
```

Then build: `pnpm build`

### Generating Brand-Specific Colors (Coming Soon)

::: warning Generator Under Development
Need an exact brand color (#FF6B00)? We're building a flavor generator:

```bash
npx @sando/flavor-generator create --color "#FF6B00"
```

This will generate a scientifically designed palette using OKLCH and create ready-to-use flavor files.

**Status:** Under development | **Timeline:** Q2 2025 | [Track progress →](https://github.com/your-org/sando-design-system/issues/XX)
:::

## Next Steps

- **[Color Philosophy](/docs/COLOR-PHILOSOPHY.md)** - Why 8 curated palettes
- **[Flavor Tokens](/tokens/flavors)** - All available flavor tokens
- **[Accessibility Guide](/guides/accessibility)** - Complete accessibility documentation
- **[Component Theming](/components/theming)** - Per-component theme customization
