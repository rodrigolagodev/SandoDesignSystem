# Input

A fully accessible input component with multiple variants, sizes, and states.

## Features

- ✅ **Multiple Variants**: Outlined and filled styles
- ✅ **Flexible Sizing**: Small, medium, and large sizes
- ♿ **Accessibility**: WCAG 2.1 AA compliant with full keyboard support
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ✨ **Validation**: Error states with helper text and error messages
- 🎯 **Customizable**: Prefix and suffix slots for icons and actions

## Basic Usage

```html
<!-- Import -->
<script type="module">
  import "@sando/components/input";
</script>

<!-- Basic input -->
<sando-input label="Email" placeholder="you@example.com"></sando-input>
```

## Variants

### Outlined (Default)

Input with visible border.

```html
<sando-input variant="outlined" label="Username"></sando-input>
```

### Filled

Input with filled background.

```html
<sando-input variant="filled" label="Username"></sando-input>
```

## Sizes

### Small

Compact size for tight spaces.

```html
<sando-input size="small" label="Compact"></sando-input>
```

### Medium (Default)

Standard size for most use cases.

```html
<sando-input size="medium" label="Standard"></sando-input>
```

### Large

Larger size for emphasis.

```html
<sando-input size="large" label="Large"></sando-input>
```

## States

### With Helper Text

```html
<sando-input
  label="Password"
  type="password"
  helper-text="Must be at least 8 characters"
></sando-input>
```

### Error State

```html
<sando-input label="Email" error error-text="Email is required"></sando-input>
```

### Required

```html
<sando-input
  label="Email"
  required
  helper-text="We'll never share your email"
></sando-input>
```

### Disabled

```html
<sando-input label="Account ID" value="ACC-12345" disabled></sando-input>
```

### Readonly

```html
<sando-input label="Company" value="Acme Corp" readonly></sando-input>
```

## With Slots

### Prefix Icon

```html
<sando-input label="Search" placeholder="Search...">
  <span slot="prefix">🔍</span>
</sando-input>
```

### Suffix Button

```html
<sando-input label="Search" value="query">
  <button slot="suffix" aria-label="Clear">✕</button>
</sando-input>
```

### Both Prefix and Suffix

```html
<sando-input label="Amount" type="number" value="100">
  <span slot="prefix">$</span>
  <span slot="suffix">.00</span>
</sando-input>
```

## Input Types

Supports standard HTML input types:

```html
<sando-input label="Text" type="text"></sando-input>
<sando-input label="Email" type="email"></sando-input>
<sando-input label="Password" type="password"></sando-input>
<sando-input label="Number" type="number"></sando-input>
<sando-input label="Tel" type="tel"></sando-input>
<sando-input label="URL" type="url"></sando-input>
<sando-input label="Search" type="search"></sando-input>
```

## API Reference

### Properties

| Property      | Type                                                                        | Default      | Description                      |
| ------------- | --------------------------------------------------------------------------- | ------------ | -------------------------------- |
| `variant`     | `'outlined' \| 'filled'`                                                    | `'outlined'` | Visual style variant             |
| `size`        | `'small' \| 'medium' \| 'large'`                                            | `'medium'`   | Input size                       |
| `type`        | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'`     | HTML input type                  |
| `value`       | `string`                                                                    | `''`         | Input value                      |
| `placeholder` | `string`                                                                    | `undefined`  | Placeholder text                 |
| `label`       | `string`                                                                    | `undefined`  | Accessible label                 |
| `helperText`  | `string`                                                                    | `undefined`  | Helper text below input          |
| `errorText`   | `string`                                                                    | `undefined`  | Error message when error is true |
| `disabled`    | `boolean`                                                                   | `false`      | Whether input is disabled        |
| `readonly`    | `boolean`                                                                   | `false`      | Whether input is readonly        |
| `required`    | `boolean`                                                                   | `false`      | Whether input is required        |
| `error`       | `boolean`                                                                   | `false`      | Whether input has error          |

### Slots

| Slot     | Description                              |
| -------- | ---------------------------------------- |
| `prefix` | Content before the input (icons, text)   |
| `suffix` | Content after the input (icons, actions) |

### Events

| Event    | Type                             | Description                                     |
| -------- | -------------------------------- | ----------------------------------------------- |
| `input`  | `Event`                          | Fired when input value changes                  |
| `change` | `CustomEvent<{ value: string }>` | Fired when input loses focus with changed value |
| `focus`  | `FocusEvent`                     | Fired when input gains focus                    |
| `blur`   | `FocusEvent`                     | Fired when input loses focus                    |

### Methods

| Method     | Description                  |
| ---------- | ---------------------------- |
| `focus()`  | Programmatically focus input |
| `blur()`   | Programmatically blur input  |
| `select()` | Select all input text        |

### CSS Custom Properties

```css
/* Border colors (outlined variant) */
--sando-input-outlined-borderColor-default
--sando-input-outlined-borderColor-hover
--sando-input-outlined-borderColor-focus
--sando-input-outlined-borderColor-error

/* Background colors */
--sando-input-outlined-backgroundColor-default
--sando-input-filled-backgroundColor-default

/* Text colors */
--sando-input-textColor-default
--sando-input-textColor-placeholder

/* Sizes */
--sando-input-size-small-height
--sando-input-size-medium-height
--sando-input-size-large-height
--sando-input-size-small-paddingInline
--sando-input-size-medium-paddingInline
--sando-input-size-large-paddingInline
```

## Accessibility

| WCAG Criterion           | Level | Status  | Implementation                           |
| ------------------------ | ----- | ------- | ---------------------------------------- |
| 1.4.3 Contrast (Minimum) | AA    | ✅ Pass | All text meets 4.5:1 contrast ratio      |
| 2.1.1 Keyboard           | A     | ✅ Pass | Fully keyboard accessible                |
| 2.4.7 Focus Visible      | AA    | ✅ Pass | Visible focus indicator                  |
| 3.3.2 Labels             | A     | ✅ Pass | Labels properly associated               |
| 4.1.2 Name, Role, Value  | A     | ✅ Pass | Proper semantic HTML and ARIA attributes |

### Keyboard Navigation

| Key   | Action                   |
| ----- | ------------------------ |
| `Tab` | Move focus to/from input |

### Screen Reader Support

- ✅ Announces label and input type
- ✅ Announces helper text via `aria-describedby`
- ✅ Announces error messages via `aria-describedby` and `role="alert"`
- ✅ Announces disabled/readonly states
- ✅ Announces required fields

## Examples

### Login Form

```html
<form>
  <sando-input
    label="Email"
    type="email"
    required
    placeholder="you@example.com"
  ></sando-input>

  <sando-input
    label="Password"
    type="password"
    required
    helper-text="Must be at least 8 characters"
  ></sando-input>

  <button type="submit">Sign In</button>
</form>
```

### Search Input

```html
<sando-input label="Search" type="search" placeholder="Search documentation...">
  <span slot="prefix">🔍</span>
  <button slot="suffix" aria-label="Clear search">✕</button>
</sando-input>
```

### Validation Example

```html
<sando-input
  label="Email Address"
  type="email"
  value="invalid-email"
  error
  error-text="Please enter a valid email address"
></sando-input>
```

## Best Practices

- ✅ **DO**: Always provide a label for accessibility
- ✅ **DO**: Use helper text to guide users
- ✅ **DO**: Show clear error messages
- ✅ **DO**: Use appropriate input types (email, tel, url, etc.)
- ❌ **DON'T**: Use placeholder as the only label
- ❌ **DON'T**: Disable inputs unnecessarily
- ❌ **DON'T**: Use custom validation without proper error messages

## Framework Integration

### React

```tsx
import "@sando/components/input";

function LoginForm() {
  const [email, setEmail] = useState("");

  return (
    <sando-input
      label="Email"
      type="email"
      value={email}
      onInput={(e: any) => setEmail(e.target.value)}
    />
  );
}
```

### Vue 3

```vue
<template>
  <sando-input
    label="Email"
    type="email"
    :value="email"
    @input="email = $event.target.value"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "@sando/components/input";

const email = ref("");
</script>
```

## Related Components

- [Button](./button.md) - For form submissions
- [Form](./form.md) - For form layouts (TODO)
- [Select](./select.md) - For dropdown selections (TODO)

## TODO: Next Steps

- [ ] Create Recipe tokens in `packages/tokens/src/recipes/input.json`
- [ ] Replace temporary styles with token consumption
- [ ] Add advanced validation patterns
- [ ] Create additional input-related components (textarea, select)
