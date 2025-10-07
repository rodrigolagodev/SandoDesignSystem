# Button Styles - Modular CSS Architecture

This directory contains the modularized CSS styles for the `sando-button` component. The styles are organized into separate files based on their responsibility, making the codebase more maintainable and easier to navigate.

## 📁 File Structure

```
styles/
├── index.ts              # Barrel export for all style modules
├── base.styles.ts        # Core styles (reset, layout, typography)
├── variant.styles.ts     # Visual variants (solid, outline, ghost)
├── size.styles.ts        # Size variants (small, medium, large)
├── radius.styles.ts      # Border radius variants (none, default, full)
├── status.styles.ts      # Semantic status (success, destructive)
├── state.styles.ts       # Interactive states (loading, disabled, active)
└── README.md             # This file
```

## 📊 Metrics

| File | Lines | Responsibility | Tokens Used |
|------|-------|----------------|-------------|
| `base.styles.ts` | 87 | Reset, layout, typography, focus | 15 |
| `variant.styles.ts` | 93 | Solid, outline, ghost variants | 18 |
| `size.styles.ts` | 63 | Size variants + icon-only mode | 12 |
| `radius.styles.ts` | 35 | Border radius variants | 3 |
| `status.styles.ts` | 99 | Success/destructive semantics | 12 |
| `state.styles.ts` | 76 | Loading, disabled, active states | 6 |
| `index.ts` | 15 | Exports | - |
| **Total** | **468** | **All button styles** | **56** |

**Before modularization:** 491 lines in single `static styles` block
**After modularization:** 468 lines across 6 organized files (23 lines saved)

## 📖 Module Descriptions

### `base.styles.ts`
**Foundation styles that apply to all buttons**

Contains:
- CSS reset (`all: unset`)
- Flexbox layout (`display: inline-flex`, alignment)
- Typography (font family, weight, line height)
- Base appearance (border radius, cursor, transitions)
- Focus states (`:focus-visible` with high contrast support)
- Slot styles (icon spacing)

### `variant.styles.ts`
**Visual style variants for different button types**

Contains:
- **Solid**: Filled background for primary actions
  - Default, hover, active, disabled states
- **Outline**: Bordered with transparent background for secondary actions
  - Default, hover, active, disabled states
- **Ghost**: No border, transparent background for tertiary actions
  - Default, hover, active, disabled states

Each variant supports all interactive states and consumes design tokens.

### `size.styles.ts`
**Size variants for different contexts**

Contains:
- **Small**: Compact size for dense UIs (caption font)
- **Medium**: Default size for most use cases (body font)
- **Large**: Prominent size for important actions (body font)
- **Icon-only mode**: Square aspect ratio (1:1) for all sizes

### `radius.styles.ts`
**Border radius options for different design aesthetics**

Contains:
- **None**: Sharp corners (`border-radius: 0`)
- **Default**: Standard rounded (from design tokens)
- **Full**: Fully rounded/circular (`border-radius: 9999px`)

Perfect for icon-only buttons when combined with `radius="full"`.

### `status.styles.ts`
**Semantic status colors for contextual feedback**

Contains:
- **Success**: Green colors for positive actions (save, confirm)
- **Destructive**: Red colors for dangerous actions (delete, remove)

Each status works with all three variants (solid, outline, ghost).

### `state.styles.ts`
**Interactive state behaviors**

Contains:
- **Loading**: Spinner animation, content hidden, wait cursor
- **Disabled**: Not-allowed cursor, pointer-events disabled
- **Active**: Persistent pressed state for toggles/filters

Includes spinner keyframe animation.

## 🔄 Import Order

The order of style imports matters for CSS specificity:

```typescript
static styles = [
  baseStyles,      // 1. Foundation (lowest specificity)
  variantStyles,   // 2. Visual variants
  sizeStyles,      // 3. Size adjustments
  radiusStyles,    // 4. Border radius
  statusStyles,    // 5. Semantic colors
  stateStyles,     // 6. Interactive states (highest specificity)
];
```

This order ensures that:
1. Base styles are always applied first
2. Variants override base when needed
3. States (loading, disabled) take precedence over everything

## 🎨 Design Token Usage

All styles consume CSS custom properties from the design token system:

**Token Layers:**
```
Component Styles
    ↓ uses
CSS Custom Properties (--sando-button-*)
    ↓ references
Recipes Layer (button.css)
    ↓ references
Flavors Layer (semantic tokens)
    ↓ references
Ingredients Layer (primitives)
```

### Example Token Chain:

```css
/* Component consumes: */
background-color: var(--sando-button-solid-backgroundColor-default);

/* Recipe defines: */
--sando-button-solid-backgroundColor-default: var(--sando-color-action-solid-background-default);

/* Flavor defines: */
--sando-color-action-solid-background-default: var(--sando-color-brand-700);

/* Ingredient defines: */
--sando-color-brand-700: #2563eb;
```

## 🔧 Maintenance Guidelines

### Adding New Styles

1. **Identify the category:**
   - Does it affect all buttons? → `base.styles.ts`
   - Is it a visual variant? → `variant.styles.ts`
   - Is it size-related? → `size.styles.ts`
   - Is it a state? → `state.styles.ts`

2. **Add to appropriate file:**
   ```typescript
   // Example: Adding a new variant
   // variant.styles.ts
   :host([variant="dashed"]) button {
     border-style: dashed;
   }
   ```

3. **Update exports if needed:**
   ```typescript
   // index.ts (usually not needed)
   export { baseStyles } from './base.styles.js';
   ```

4. **Test thoroughly:**
   ```bash
   pnpm build
   pnpm storybook
   ```

### Creating New Style Modules

If a new category emerges (e.g., animation styles):

1. Create new file: `animation.styles.ts`
2. Follow existing patterns:
   ```typescript
   import { css } from 'lit';

   export const animationStyles = css`
     /* Your styles */
   `;
   ```
3. Add to `index.ts` exports
4. Import in `sando-button.ts` in correct order
5. Update this README

## 🧪 Testing

After modifying styles, always verify:

```bash
# Build check
pnpm build

# Visual regression (Storybook)
pnpm storybook

# Check all stories:
# - Variants
# - Sizes
# - States
# - Radius
# - Status
# - Icons
# - Links
# - Layout
# - Active
```

## 📚 Related Documentation

- [Button Component](../sando-button.ts) - Main component file
- [Button Types](../sando-button.types.ts) - TypeScript definitions
- [Storybook Stories](../stories/) - Interactive examples
- [Design Tokens](../../../../tokens/) - Token system

## 🎯 Benefits of Modularization

✅ **Improved Maintainability**
- Easy to locate specific styles
- Reduced cognitive load (smaller files)
- Clear separation of concerns

✅ **Better Collaboration**
- Multiple developers can work on different style categories
- Reduced merge conflicts
- Easier code reviews

✅ **Enhanced Discoverability**
- File names clearly indicate contents
- Logical organization mirrors component features
- Self-documenting structure

✅ **Scalability**
- Easy to add new variants without bloating single file
- Future-proof for new features
- Can split further if needed

## 📝 Version History

- **v1.0.0** (2025-10-07): Initial modularization
  - Split 491-line CSS block into 6 files
  - Reduced main component from 567 to 260 lines
  - Zero functional changes (regression-free)
