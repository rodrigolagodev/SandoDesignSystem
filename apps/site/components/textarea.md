---
title: Textarea Component
description: A fully accessible multi-line text input component with variants, sizes, resize modes, character limits, and form validation.
---

# Textarea

The `sando-textarea` component is a multi-line text input built for longer content — descriptions, comments, bios, and anything that needs more room to breathe. If the `sando-input` is a single slice of bread, the textarea is a whole loaf — same quality ingredients, more surface area.

## Features

- ✅ **Multiple Variants**: Filled and outlined styles
- ✅ **Flexible Sizing**: `sm`, `md`, and `lg` sizes
- ✅ **Resize Modes**: Vertical, horizontal, both, or none
- ✅ **Character Limits**: Built-in `maxlength` and `minlength` support
- ✅ **Wrap Modes**: Soft, hard, and off text wrapping
- ♿ **Accessible**: WCAG 2.1 AA compliant with full keyboard support
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ✨ **Validation**: Error states with helper text and error messages
- 📝 **Native API**: Exposes `selectionStart`, `selectionEnd`, `textLength`, and more

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-textarea
  label="Description"
  placeholder="Tell us about your favorite Sando..."
></sando-textarea>
```

::: tip Import Path
All components can be imported from `@sando/components`. Individual component imports like `@sando/components/textarea` are also available for tree-shaking.
:::

## Variants

Two visual styles for different contexts.

### Outlined (Default)

Clean border style that provides clear visual boundaries.

```html
<sando-textarea
  variant="outlined"
  label="Notes"
  placeholder="Add your notes..."
></sando-textarea>
```

### Filled

Subtle filled background that blends into the page.

```html
<sando-textarea
  variant="filled"
  label="Notes"
  placeholder="Add your notes..."
></sando-textarea>
```

## Sizes

Three sizes to fit different contexts — from compact forms to spacious editors.

```html
<sando-textarea
  size="sm"
  label="Small"
  placeholder="Compact textarea"
></sando-textarea>

<sando-textarea
  size="md"
  label="Medium (Default)"
  placeholder="Standard textarea"
></sando-textarea>

<sando-textarea
  size="lg"
  label="Large"
  placeholder="Spacious textarea"
></sando-textarea>
```

::: tip Touch Target Compliance
All textarea sizes meet WCAG 2.1 Level AA minimum touch target size of 44x44px.
:::

## Rows

Control the initial visible height with the `rows` attribute:

```html
<sando-textarea
  label="Short note"
  rows="2"
  placeholder="A quick note..."
></sando-textarea>

<sando-textarea
  label="Article"
  rows="10"
  placeholder="Write your article..."
></sando-textarea>
```

## Resize Modes

Control how users can resize the textarea — like choosing whether your cutting board should expand in one direction or both.

### Vertical (Default)

```html
<sando-textarea resize="vertical" label="Vertical resize"> </sando-textarea>
```

### Horizontal

```html
<sando-textarea resize="horizontal" label="Horizontal resize"> </sando-textarea>
```

### Both

```html
<sando-textarea resize="both" label="Resize in both directions">
</sando-textarea>
```

### None

```html
<sando-textarea resize="none" label="Fixed size"> </sando-textarea>
```

## Text Wrapping

Control how text wraps within the textarea:

### Soft (Default)

Text wraps visually but no line breaks are inserted on form submit.

```html
<sando-textarea wrap="soft" label="Soft wrap"></sando-textarea>
```

### Hard

Text wraps and line breaks are inserted on form submit. Requires the `cols` attribute on the native element.

```html
<sando-textarea wrap="hard" label="Hard wrap"></sando-textarea>
```

### Off

No text wrapping — long lines extend horizontally.

```html
<sando-textarea
  wrap="off"
  label="No wrapping"
  placeholder="This text won't wrap..."
></sando-textarea>
```

## Character Limits

Use `maxlength` and `minlength` to enforce text length constraints:

```html
<sando-textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  maxlength="500"
  helper-text="Maximum 500 characters"
></sando-textarea>
```

```html
<sando-textarea
  label="Review"
  placeholder="Share your experience..."
  minlength="20"
  maxlength="1000"
  helper-text="Between 20 and 1,000 characters"
  required
></sando-textarea>
```

## States

### Disabled

```html
<sando-textarea
  label="Disabled"
  value="This textarea is disabled"
  disabled
></sando-textarea>
```

### Read-Only

```html
<sando-textarea
  label="Read-only"
  value="This content cannot be edited but can be selected and copied."
  readonly
></sando-textarea>
```

### Error

```html
<sando-textarea
  label="Feedback"
  error
  error-text="Please provide at least 20 characters"
  required
></sando-textarea>
```

### Helper Text

```html
<sando-textarea
  label="Instructions"
  helper-text="Markdown formatting is supported"
  placeholder="Enter instructions..."
></sando-textarea>
```

## Theming

### Using Flavors

Apply different theme flavors:

```html
<sando-textarea flavor="original" label="Original Theme"></sando-textarea>
<sando-textarea flavor="strawberry" label="Strawberry Theme"></sando-textarea>
```

### Custom Styling

Override CSS custom properties for fine-grained control:

```html
<sando-textarea
  label="Custom Colors"
  style="
    --sando-textarea-outlined-borderColor-focus: oklch(0.65 0.15 250);
    --sando-textarea-focusOutlineColor: oklch(0.65 0.15 250);
  "
  placeholder="Custom focus color..."
></sando-textarea>
```

## API Reference

### Properties

| Property            | Attribute             | Type                                             | Default      | Description                                              |
| ------------------- | --------------------- | ------------------------------------------------ | ------------ | -------------------------------------------------------- |
| `value`             | `value`               | `string`                                         | `''`         | Current text value                                       |
| `placeholder`       | `placeholder`         | `string`                                         | `undefined`  | Placeholder text                                         |
| `label`             | `label`               | `string`                                         | `undefined`  | Label text (alternative to slot)                         |
| `helperText`        | `helper-text`         | `string`                                         | `undefined`  | Helper text displayed below the textarea                 |
| `errorText`         | `error-text`          | `string`                                         | `undefined`  | Error message displayed when `error` is true             |
| `name`              | `name`                | `string`                                         | `undefined`  | Form field name                                          |
| `disabled`          | `disabled`            | `boolean`                                        | `false`      | Whether the textarea is disabled                         |
| `required`          | `required`            | `boolean`                                        | `false`      | Whether the textarea is required for form validation     |
| `readonly`          | `readonly`            | `boolean`                                        | `false`      | Whether the textarea is read-only                        |
| `error`             | `error`               | `boolean`                                        | `false`      | Whether the textarea is in error state                   |
| `rows`              | `rows`                | `number`                                         | `3`          | Initial number of visible text rows                      |
| `minlength`         | `minlength`           | `number`                                         | `undefined`  | Minimum text length                                      |
| `maxlength`         | `maxlength`           | `number`                                         | `undefined`  | Maximum text length                                      |
| `resize`            | `resize`              | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Resize behavior                                          |
| `autocomplete`      | `autocomplete`        | `string`                                         | `undefined`  | Autocomplete attribute                                   |
| `spellcheck`        | `spellcheck`          | `boolean`                                        | `true`       | Spellcheck attribute                                     |
| `wrap`              | `wrap`                | `'soft' \| 'hard' \| 'off'`                      | `'soft'`     | Text wrapping mode                                       |
| `variant`           | `variant`             | `'outlined' \| 'filled'`                         | `'outlined'` | Visual variant of the textarea                           |
| `size`              | `size`                | `'sm' \| 'md' \| 'lg'`                           | `'md'`       | Size variant of the textarea                             |
| `reserveErrorSpace` | `reserve-error-space` | `boolean`                                        | `true`       | Reserve space for error messages to prevent layout shift |
| `flavor`            | `flavor`              | `string`                                         | `'original'` | Design system theme flavor                               |

### Slots

| Slot    | Description                                 |
| ------- | ------------------------------------------- |
| Default | Label content (alternative to `label` prop) |

### Events

| Event          | Type                             | Description                              |
| -------------- | -------------------------------- | ---------------------------------------- |
| `sando-input`  | `CustomEvent<{ value: string }>` | Fired on each input keystroke            |
| `sando-change` | `CustomEvent<{ value: string }>` | Fired on blur when the value has changed |
| `sando-focus`  | `CustomEvent`                    | Fired when the textarea receives focus   |
| `sando-blur`   | `CustomEvent`                    | Fired when the textarea loses focus      |

### Methods

| Method                                      | Returns   | Description                                   |
| ------------------------------------------- | --------- | --------------------------------------------- |
| `focus()`                                   | `void`    | Focus the textarea                            |
| `blur()`                                    | `void`    | Remove focus from the textarea                |
| `select()`                                  | `void`    | Select all text in the textarea               |
| `setSelectionRange(start, end, direction?)` | `void`    | Set the selection range                       |
| `checkValidity()`                           | `boolean` | Check validity (delegates to native textarea) |
| `reportValidity()`                          | `boolean` | Report validity with browser UI               |
| `setCustomValidity(message)`                | `void`    | Set a custom validation message               |

### Read-Only Properties

| Property             | Type                                        | Description                          |
| -------------------- | ------------------------------------------- | ------------------------------------ |
| `validity`           | `ValidityState`                             | The native textarea's validity state |
| `validationMessage`  | `string`                                    | The native validation message        |
| `selectionStart`     | `number \| null`                            | Current selection start position     |
| `selectionEnd`       | `number \| null`                            | Current selection end position       |
| `selectionDirection` | `'forward' \| 'backward' \| 'none' \| null` | Current selection direction          |
| `textLength`         | `number`                                    | Length of the current text value     |

### CSS Custom Properties

Key CSS variables you can override:

```css
/* Outlined variant */
--sando-textarea-outlined-backgroundColor-default
--sando-textarea-outlined-borderColor-default
--sando-textarea-outlined-borderColor-focus

/* Filled variant */
--sando-textarea-filled-backgroundColor-default

/* Size-specific */
--sando-textarea-size-md-paddingBlock
--sando-textarea-size-md-paddingInline

/* Base styles */
--sando-textarea-borderRadius
--sando-textarea-focusOutlineColor
--sando-textarea-transition-duration
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/textarea.json`
:::

## Accessibility

The Textarea component is built with accessibility in mind and meets WCAG 2.1 Level AA requirements:

| WCAG Criterion           | Level | Status  | Implementation                                   |
| ------------------------ | ----- | ------- | ------------------------------------------------ |
| 1.4.3 Contrast (Minimum) | AA    | ✅ Pass | All text meets 4.5:1 contrast ratio              |
| 2.1.1 Keyboard           | A     | ✅ Pass | Fully keyboard accessible                        |
| 2.4.7 Focus Visible      | AA    | ✅ Pass | Visible focus indicator with sufficient contrast |
| 4.1.2 Name, Role, Value  | A     | ✅ Pass | Proper label association and ARIA attributes     |

### Keyboard Navigation

| Key                   | Action                                        |
| --------------------- | --------------------------------------------- |
| `Tab`                 | Move focus to/from textarea                   |
| `Shift + Tab`         | Move focus to previous element                |
| Standard text editing | All native text editing keys work as expected |

### Screen Reader Support

- ✅ Label associated with textarea via `for`/`id` pairing
- ✅ `aria-invalid` communicates error state
- ✅ `aria-required` communicates required state
- ✅ `aria-describedby` links to helper/error text
- ✅ Error messages announced via `sando-help-text` with proper ARIA

### ARIA Attributes

The component automatically manages these ARIA attributes:

- `aria-invalid` — Error state
- `aria-required` — Required state
- `aria-describedby` — Links to helper/error text element

## Best Practices

### Do ✅

- Use descriptive `label` text that explains what to enter
- Use `helper-text` to provide formatting hints or character limits
- Use `placeholder` sparingly — it disappears when the user starts typing
- Set appropriate `rows` for the expected content length
- Use `maxlength` to enforce limits and prevent abuse
- Use `resize="vertical"` (default) for most use cases
- Use `error-text` to explain validation failures with actionable guidance
- Use `readonly` for content that should be viewable and copyable but not editable

### Don't ❌

- Don't use a textarea for single-line input — use `sando-input` instead
- Don't rely solely on `placeholder` for instructions (it disappears)
- Don't set `resize="none"` unless you have a strong reason (it frustrates users)
- Don't forget to set `required` when the field is mandatory
- Don't use `maxlength` without telling the user the limit (add `helper-text`)

## Examples

### Comment Box with Character Count

```html
<sando-textarea
  id="comment"
  label="Comment"
  placeholder="Share your thoughts..."
  maxlength="280"
  rows="4"
  helper-text="0 / 280 characters"
></sando-textarea>

<script>
  const textarea = document.getElementById("comment");
  textarea.addEventListener("sando-input", (e) => {
    const length = e.detail.value.length;
    textarea.helperText = `${length} / 280 characters`;

    if (length > 250) {
      textarea.helperText = `${length} / 280 — running low!`;
    }
  });
</script>
```

### Form with Validation

```html
<sando-form @sando-submit="${handleSubmit}">
  <sando-input name="title" label="Title" required></sando-input>

  <sando-textarea
    name="description"
    label="Description"
    placeholder="Describe the recipe in detail..."
    rows="6"
    minlength="50"
    maxlength="2000"
    helper-text="Between 50 and 2,000 characters"
    required
  ></sando-textarea>

  <sando-button type="submit" variant="solid">Submit Recipe</sando-button>
</sando-form>
```

### Read-Only Recipe Instructions

```html
<sando-textarea
  label="Recipe Instructions"
  readonly
  rows="8"
  resize="none"
  value="1. Slice the shokupan bread into thick slices
2. Prepare the tonkatsu cutlet with panko breadcrumbs
3. Deep fry at 170°C until golden brown
4. Spread tonkatsu sauce on both bread slices
5. Add shredded cabbage and the cutlet
6. Press gently and slice diagonally"
></sando-textarea>
```

## Framework Integration

::: code-group

```tsx [React]
import "@sando/components";

function CommentBox() {
  const handleInput = (e: CustomEvent) => {
    console.log("Value:", e.detail.value);
  };

  return (
    <sando-textarea
      label="Comment"
      placeholder="Write a comment..."
      rows={4}
      maxlength={500}
      onSando-input={handleInput}
    />
  );
}
```

```vue [Vue 3]
<template>
  <sando-textarea
    label="Comment"
    placeholder="Write a comment..."
    :rows="4"
    maxlength="500"
    @sando-input="handleInput"
  />
</template>

<script setup lang="ts">
import "@sando/components";

const handleInput = (e: CustomEvent) => {
  console.log("Value:", e.detail.value);
};
</script>
```

```typescript [Angular]
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@sando/components";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html [Angular Template]
<sando-textarea
  label="Comment"
  placeholder="Write a comment..."
  [rows]="4"
  maxlength="500"
  (sando-input)="handleInput($event)"
></sando-textarea>
```

:::

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Input](/components/input) — Single-line text input
- [Select](/components/select) — Dropdown selection
- [Form](/components/form) — Form wrapper with validation coordination
- [Form Group](/components/form-group) — Layout container for form controls
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
