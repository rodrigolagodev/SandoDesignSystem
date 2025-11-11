# Form Group

A form group component that provides consistent layout and labeling for form controls with support for labels, helper text, error messages, and required field indicators.

## Features

- ✅ **Accessible Labels**: Proper label association with form controls
- ♿ **WCAG 2.1 AA Compliant**: Error messages with `role="alert"` and `aria-live="polite"`
- 🎨 **Themeable**: Token-driven styling (tokens to be added)
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Lightweight**: Minimal footprint

## Basic Usage

```html
<!-- Import -->
<script type="module">
  import "@sando/components/form-group";
</script>

<!-- Basic usage -->
<sando-form-group label="Email">
  <input type="email" />
</sando-form-group>
```

## Properties

| Property     | Type      | Default     | Description                                    |
| ------------ | --------- | ----------- | ---------------------------------------------- |
| `label`      | `string`  | `undefined` | Label text for the form field                  |
| `error`      | `string`  | `undefined` | Error message to display (shows error state)   |
| `helperText` | `string`  | `undefined` | Helper text to display below the field         |
| `required`   | `boolean` | `false`     | Whether the field is required (shows asterisk) |

## Slots

| Slot          | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| Default       | Form control elements (input, select, textarea, etc.)       |
| `label`       | Custom label content (alternative to label prop)            |
| `helper-text` | Custom helper text content (alternative to helperText prop) |
| `error`       | Custom error message content (alternative to error prop)    |

## Events

| Event               | Type                                           | Description                                    |
| ------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `focus`             | `CustomEvent`                                  | Fired when a child form control receives focus |
| `blur`              | `CustomEvent`                                  | Fired when a child form control loses focus    |
| `validation-change` | `CustomEvent<FormGroupValidationChangeDetail>` | Fired when validation state changes            |

### Event Details

**validation-change event detail:**

```typescript
interface FormGroupValidationChangeDetail {
  isValid: boolean;
  errorMessage: string | null;
}
```

## Examples

### With Helper Text

```html
<sando-form-group
  label="Username"
  helperText="Choose a unique username (4-20 characters)"
>
  <input type="text" />
</sando-form-group>
```

### With Error Message

```html
<sando-form-group label="Email" error="Please enter a valid email address">
  <input type="email" value="invalid-email" aria-invalid="true" />
</sando-form-group>
```

### Required Field

```html
<sando-form-group
  label="Password"
  helperText="Must be at least 8 characters"
  required
>
  <input type="password" required />
</sando-form-group>
```

### Using Slots

```html
<sando-form-group>
  <span slot="label">Email <em>(required)</em></span>
  <input type="email" required />
  <span slot="helper-text">We'll never share your email</span>
</sando-form-group>
```

### With Different Form Controls

```html
<!-- Text Input -->
<sando-form-group label="Name">
  <input type="text" />
</sando-form-group>

<!-- Select -->
<sando-form-group label="Country">
  <select>
    <option>United States</option>
    <option>Canada</option>
  </select>
</sando-form-group>

<!-- Textarea -->
<sando-form-group label="Bio">
  <textarea rows="4"></textarea>
</sando-form-group>
```

## Accessibility

### WCAG Compliance

| Criterion                    | Level | Status  | Implementation                                        |
| ---------------------------- | ----- | ------- | ----------------------------------------------------- |
| 1.3.1 Info and Relationships | A     | ✅ Pass | Semantic HTML structure with proper label association |
| 3.3.1 Error Identification   | A     | ✅ Pass | Error messages use `role="alert"`                     |
| 3.3.2 Labels or Instructions | A     | ✅ Pass | Labels and helper text provide clear guidance         |
| 4.1.3 Status Messages        | AA    | ✅ Pass | Error messages announced via `aria-live="polite"`     |

### Keyboard Navigation

The form group component does not trap or interfere with keyboard navigation. All slotted form controls maintain their native keyboard behavior:

- **Tab**: Move focus between form controls
- **Form-specific keys**: Work as expected (Enter, Space, Arrow keys, etc.)

### Screen Reader Support

- ✅ Labels are properly associated with form controls
- ✅ Error messages are announced when they appear (via `aria-live="polite"`)
- ✅ Helper text provides additional context
- ✅ Required fields are indicated both visually and semantically

## CSS Custom Properties

**Note:** Token-based styling will be added in the next phase.

```css
/* Base Styles (to be implemented) */
--sando-form-group-spacing
--sando-form-group-label-color
--sando-form-group-helperText-color
--sando-form-group-error-color
--sando-form-group-required-color
```

## Best Practices

### ✅ DO

- Use semantic HTML form controls inside the form group
- Provide clear, concise labels
- Use helper text to provide additional guidance
- Set `aria-invalid="true"` on form controls when showing errors
- Use the `required` prop for required fields

### ❌ DON'T

- Don't use form group without a label (either prop or slot)
- Don't rely solely on color to indicate error state
- Don't nest form groups inside each other
- Don't use both prop and slot for the same content type (choose one)

## Framework Integration

### React

```tsx
import "@sando/components/form-group";

function LoginForm() {
  const [error, setError] = useState<string>();

  return (
    <sando-form-group label="Email" error={error} required>
      <input type="email" required />
    </sando-form-group>
  );
}
```

### Vue 3

```vue
<template>
  <sando-form-group label="Email" :error="error" :required="true">
    <input type="email" required />
  </sando-form-group>
</template>

<script setup>
import { ref } from "vue";
import "@sando/components/form-group";

const error = ref("");
</script>
```

## Next Steps

1. **Add Recipe Tokens**: Create `packages/tokens/src/recipes/form-group.json`
2. **Add Styles**: Implement visual design using Recipe tokens
3. **Complete Tests**: Achieve >85% unit coverage, 100% a11y coverage
4. **Enhanced Features**: Add more advanced validation patterns

## Related Components

- Input (coming soon)
- Select (coming soon)
- Textarea (coming soon)
- Checkbox (coming soon)
- Radio (coming soon)
