# 🎯 Ejemplo de Uso: TypeScript Tokens en Lit

Ejemplo completo de cómo usar los tokens TypeScript en componentes Lit con autocomplete y type safety.

## Ejemplo Completo de Componente

```typescript
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// ✅ Import tokens con autocomplete
import { tokens } from '@sando/tokens/recipes';

// ✅ Import helper para convertir a CSS vars
import { token } from '../styles/tokens';

@customElement('sando-button')
export class SandoButton extends LitElement {
  // Props
  @property({ reflect: true }) variant: 'solid' | 'outline' | 'ghost' = 'solid';
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      /* Base styles - type-safe token access with autocomplete */
      font-family: ${token(tokens.button.fontFamily)};
      font-weight: ${token(tokens.button.fontWeight)};
      line-height: ${token(tokens.button.lineHeight)};
      border-radius: ${token(tokens.button.borderRadius)};
      border: none;
      cursor: pointer;
      transition-property: background-color, color, border-color;
      transition-duration: ${token(tokens.button.transition.duration)};
      transition-timing-function: ${token(tokens.button.transition.timing)};
    }

    /* Variant: Solid */
    :host([variant='solid']) button {
      background: ${token(tokens.button.solid.backgroundColor.default)};
      color: ${token(tokens.button.solid.textColor.default)};
    }

    :host([variant='solid']) button:hover:not(:disabled) {
      background: ${token(tokens.button.solid.backgroundColor.hover)};
    }

    :host([variant='solid']) button:active:not(:disabled) {
      background: ${token(tokens.button.solid.backgroundColor.active)};
    }

    /* Variant: Outline */
    :host([variant='outline']) button {
      background: transparent;
      color: ${token(tokens.button.outline.textColor.default)};
      border: 2px solid ${token(tokens.button.outline.borderColor.default)};
    }

    :host([variant='outline']) button:hover:not(:disabled) {
      background: ${token(tokens.button.outline.backgroundColor.hover)};
      border-color: ${token(tokens.button.outline.borderColor.hover)};
    }

    /* Variant: Ghost */
    :host([variant='ghost']) button {
      background: transparent;
      color: ${token(tokens.button.ghost.textColor.default)};
    }

    :host([variant='ghost']) button:hover:not(:disabled) {
      background: ${token(tokens.button.ghost.backgroundColor.hover)};
    }

    /* Size: Small */
    :host([size='small']) button {
      padding-inline: ${token(tokens.button.size.small.paddingInline)};
      padding-block: ${token(tokens.button.size.small.paddingBlock)};
      font-size: ${token(tokens.button.size.small.fontSize)};
    }

    /* Size: Medium */
    :host([size='medium']) button {
      padding-inline: ${token(tokens.button.size.medium.paddingInline)};
      padding-block: ${token(tokens.button.size.medium.paddingBlock)};
      font-size: ${token(tokens.button.size.medium.fontSize)};
    }

    /* Size: Large */
    :host([size='large']) button {
      padding-inline: ${token(tokens.button.size.large.paddingInline)};
      padding-block: ${token(tokens.button.size.large.paddingBlock)};
      font-size: ${token(tokens.button.size.large.fontSize)};
    }

    /* Disabled State */
    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([variant='solid']) button:disabled {
      background: ${token(tokens.button.solid.backgroundColor.disabled)};
      color: ${token(tokens.button.solid.textColor.disabled)};
    }

    /* Focus State */
    button:focus-visible {
      outline: ${token(tokens.button.focusOutlineWidth)} solid
        ${token(tokens.button.focusOutlineColor)};
      outline-offset: 2px;
    }
  `;

  render() {
    return html`
      <button ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-button': SandoButton;
  }
}
```

## ✨ Beneficios que Obtienes

### 1. Autocomplete Completo

Al escribir `tokens.button.`, IntelliSense te muestra:

```
tokens.button.
  ├─ solid
  │  ├─ backgroundColor
  │  │  ├─ default      ← Autocomplete aquí
  │  │  ├─ hover
  │  │  ├─ active
  │  │  └─ disabled
  │  └─ textColor
  ├─ outline
  ├─ ghost
  ├─ size
  │  ├─ small
  │  ├─ medium
  │  └─ large
  ├─ fontFamily
  ├─ fontWeight
  └─ borderRadius
```

### 2. Type Safety

```typescript
// ✅ Correcto
background: ${token(tokens.button.solid.backgroundColor.default)};

// ❌ Error en compile-time
background: ${token(tokens.button.soldi.backgroundColor.default)};
//                                ^^^^^
// Property 'soldi' does not exist on type 'ButtonTokens'
```

### 3. Refactoring Seguro

Si renombras `backgroundColor` → `bgColor` en los tokens:

- TypeScript te muestra TODOS los lugares que necesitas actualizar
- No puedes hacer commit con errores
- Find & Replace funciona perfectamente

### 4. Documentación Inline

```typescript
// Hover sobre tokens.button.fontFamily muestra:
/**
 * Font family for button text
 * Value: --sando-button-fontFamily
 * References: --sando-font-family-body
 */
```

## 📝 Uso en HTML

```html
<!-- En tu aplicación -->
<sando-button variant="solid" size="medium"> Click me </sando-button>

<sando-button variant="outline" size="large"> Outline Large </sando-button>

<sando-button variant="ghost" size="small" disabled> Disabled Ghost </sando-button>
```

## 🎨 Theming Dinámico

Los tokens siguen siendo CSS custom properties, así que el theming funciona:

```html
<div flavor="dark">
  <!-- Button usa theme dark automáticamente -->
  <sando-button variant="solid">Dark Theme</sando-button>
</div>

<div flavor="strawberry">
  <!-- Button usa theme strawberry -->
  <sando-button variant="solid">Strawberry Theme</sando-button>
</div>
```

## 🔄 Comparación: Antes vs Después

### ❌ Antes (Sin TypeScript tokens)

```typescript
static styles = css`
  button {
    /* Sin autocomplete, fácil equivocarse */
    background: var(--sando-button-soldi-backgroundColor-defualt);
    /*                            ^^^^^ typo ^^^^^^^ typo */
  }
`;
// Compila OK, pero runtime error silencioso
```

### ✅ Después (Con TypeScript tokens)

```typescript
static styles = css`
  button {
    /* Autocomplete + Type safety */
    background: ${token(tokens.button.solid.backgroundColor.default)};
    /*                  ↑ IntelliSense aquí
                        ↑ Error si typo */
  }
`;
// Error en compile-time si typo
```

## 🚀 Próximos Pasos

1. **Crear más componentes** usando los mismos tokens
2. **Agregar más tokens** según necesites
3. **Crear flavors adicionales** (dark, custom) - los componentes ya los soportan

## 💡 Tips

### Use el helper `token()`

```typescript
// ✅ Recomendado
background: ${token(tokens.button.backgroundColor.default)};

// ❌ NO hagas esto
background: var(${tokens.button.backgroundColor.default});
// Pierde consistencia y legibilidad
```

### Importa solo lo que necesitas

```typescript
// ✅ Tree-shakeable
import { tokens } from '@sando/tokens/recipes';

// ⚠️ Importa todo (más pesado)
import { recipes } from '@sando/tokens';
```

### Usa `tokenWithFallback` para casos edge

```typescript
import { tokenWithFallback } from '../styles/tokens';

// Si el token no existe, usa fallback
background: ${tokenWithFallback(tokens.button.customColor, '#ff0000')};
```

---

**¡Listo para crear componentes con DX perfecto!** 🎉
