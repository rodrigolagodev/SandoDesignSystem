---
title: Select Component
description: A fully accessible dropdown select component with single/multiple selection, option groups, search, loading states, and infinite scroll support.
---

# Select

The `sando-select` component is a rich, accessible dropdown that handles single and multiple selection with ease. Think of it as the menu at your favorite Sando shop — a well-organized list of choices, each one clearly presented and easy to pick from.

## Features

- ✅ **Single & Multiple Selection**: Toggle between single-pick and multi-select modes
- ✅ **Option Groups**: Organize choices with labeled categories
- ✅ **Clearable**: One-click button to reset the selection
- ✅ **Loading State**: Built-in spinner for async data fetching
- ✅ **Infinite Scroll**: `sando-scroll-end` event for loading more options on demand
- ♿ **Accessible**: WAI-ARIA combobox pattern with full keyboard navigation and screen reader support
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Uses the native Popover API with intelligent fallback
- 🎯 **Prefix Icon**: Display an icon inside the trigger for visual context

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-select label="Country" placeholder="Select a country">
  <sando-option value="us">United States</sando-option>
  <sando-option value="ca">Canada</sando-option>
  <sando-option value="mx">Mexico</sando-option>
</sando-select>
```

::: tip Import Path
All components can be imported from `@sando/components`. Individual component imports like `@sando/components/select` are also available for tree-shaking.
:::

## Variants

The select comes in two visual styles — like choosing between a clean white plate or a rustic wooden board for your presentation.

### Filled (Default)

A subtly filled background that blends into the page.

```html
<sando-select variant="filled" label="Cuisine" placeholder="Pick one">
  <sando-option value="japanese">Japanese</sando-option>
  <sando-option value="italian">Italian</sando-option>
  <sando-option value="mexican">Mexican</sando-option>
</sando-select>
```

### Outlined

A visible border for higher visual prominence.

```html
<sando-select variant="outlined" label="Cuisine" placeholder="Pick one">
  <sando-option value="japanese">Japanese</sando-option>
  <sando-option value="italian">Italian</sando-option>
  <sando-option value="mexican">Mexican</sando-option>
</sando-select>
```

## Sizes

Three sizes to fit different contexts — compact sidebars, standard forms, or spacious landing pages.

```html
<sando-select size="sm" label="Small" placeholder="Small select">
  <sando-option value="a">Option A</sando-option>
  <sando-option value="b">Option B</sando-option>
</sando-select>

<sando-select size="md" label="Medium (Default)" placeholder="Medium select">
  <sando-option value="a">Option A</sando-option>
  <sando-option value="b">Option B</sando-option>
</sando-select>

<sando-select size="lg" label="Large" placeholder="Large select">
  <sando-option value="a">Option A</sando-option>
  <sando-option value="b">Option B</sando-option>
</sando-select>
```

::: tip Touch Target Compliance
All select sizes meet WCAG 2.1 Level AA minimum touch target size of 44x44px through padding adjustments.
:::

## Multiple Selection

Enable multi-select to let users pick more than one option. Selected values appear as removable tags inside the trigger.

```html
<sando-select
  label="Toppings"
  multiple
  clearable
  placeholder="Pick your toppings"
>
  <sando-option value="lettuce">Lettuce</sando-option>
  <sando-option value="tomato">Tomato</sando-option>
  <sando-option value="cheese">Cheese</sando-option>
  <sando-option value="pickles">Pickles</sando-option>
  <sando-option value="onion">Onion</sando-option>
</sando-select>
```

### Limiting Visible Tags

When users select many options, control how many tags are visible before showing a "+N" overflow count:

```html
<sando-select label="Ingredients" multiple max-tags-visible="2">
  <sando-option value="a" selected>Flour</sando-option>
  <sando-option value="b" selected>Sugar</sando-option>
  <sando-option value="c" selected>Butter</sando-option>
  <sando-option value="d" selected>Eggs</sando-option>
</sando-select>
<!-- Shows: [Flour] [Sugar] +2 -->
```

## Clearable

Add a clear button to let users quickly reset their selection:

```html
<sando-select label="Priority" clearable value="high">
  <sando-option value="low">Low</sando-option>
  <sando-option value="medium">Medium</sando-option>
  <sando-option value="high">High</sando-option>
</sando-select>
```

## Option Groups

Organize related options under labeled categories — like sections on a menu.

```html
<sando-select label="Ingredient" placeholder="Choose an ingredient">
  <sando-option-group label="Proteins">
    <sando-option value="chicken">Chicken</sando-option>
    <sando-option value="tofu">Tofu</sando-option>
    <sando-option value="beef">Beef</sando-option>
  </sando-option-group>
  <sando-option-group label="Vegetables">
    <sando-option value="cabbage">Cabbage</sando-option>
    <sando-option value="carrot">Carrot</sando-option>
    <sando-option value="spinach">Spinach</sando-option>
  </sando-option-group>
  <sando-option-group label="Sauces">
    <sando-option value="tonkatsu">Tonkatsu Sauce</sando-option>
    <sando-option value="mayo">Japanese Mayo</sando-option>
  </sando-option-group>
</sando-select>
```

### Disabled Groups

Disable an entire group to make all its options unavailable:

```html
<sando-select label="Menu" placeholder="Choose a dish">
  <sando-option-group label="Available">
    <sando-option value="katsu">Katsu Sando</sando-option>
    <sando-option value="egg">Egg Sando</sando-option>
  </sando-option-group>
  <sando-option-group label="Sold Out" disabled>
    <sando-option value="wagyu">Wagyu Sando</sando-option>
    <sando-option value="lobster">Lobster Sando</sando-option>
  </sando-option-group>
</sando-select>
```

## Options with Prefix & Suffix

Options support `prefix` and `suffix` slots for richer content.

### Prefix Icons

```html
<sando-select label="Navigation" placeholder="Go to...">
  <sando-option value="home">
    <sando-icon slot="prefix" name="home" size="small" decorative></sando-icon>
    Home
  </sando-option>
  <sando-option value="settings">
    <sando-icon
      slot="prefix"
      name="settings"
      size="small"
      decorative
    ></sando-icon>
    Settings
  </sando-option>
  <sando-option value="profile">
    <sando-icon slot="prefix" name="user" size="small" decorative></sando-icon>
    Profile
  </sando-option>
</sando-select>
```

### Suffix Badges

```html
<sando-select label="Plans" placeholder="Select a plan">
  <sando-option value="free"> Free </sando-option>
  <sando-option value="pro">
    Pro
    <sando-tag slot="suffix" size="sm" variant="solid">Popular</sando-tag>
  </sando-option>
  <sando-option value="enterprise">
    Enterprise
    <sando-tag slot="suffix" size="sm">New</sando-tag>
  </sando-option>
</sando-select>
```

## Prefix Icon on Trigger

Display a context icon inside the select trigger:

```html
<sando-select
  label="Search type"
  prefix-icon="search"
  placeholder="Select type"
>
  <sando-option value="web">Web</sando-option>
  <sando-option value="images">Images</sando-option>
  <sando-option value="videos">Videos</sando-option>
</sando-select>
```

## States

### Disabled

```html
<sando-select label="Country" disabled value="us">
  <sando-option value="us">United States</sando-option>
</sando-select>
```

### Error

```html
<sando-select
  label="Country"
  error
  error-text="Please select a country"
  required
>
  <sando-option value="us">United States</sando-option>
  <sando-option value="ca">Canada</sando-option>
</sando-select>
```

### Helper Text

```html
<sando-select
  label="Region"
  helper-text="This determines your shipping options"
>
  <sando-option value="na">North America</sando-option>
  <sando-option value="eu">Europe</sando-option>
  <sando-option value="asia">Asia</sando-option>
</sando-select>
```

### Loading

Shows a spinner in both the trigger and dropdown. Useful when fetching options asynchronously.

```html
<sando-select label="Users" loading placeholder="Loading users...">
  <!-- Options will be added dynamically -->
</sando-select>
```

## Infinite Scroll

The `sando-scroll-end` event fires when the user scrolls near the bottom of the dropdown. Use it to load more options on demand — perfect for large datasets.

```html
<sando-select id="infinite-select" label="Users" placeholder="Search users...">
  <!-- Initial options loaded here -->
</sando-select>

<script>
  const select = document.getElementById("infinite-select");
  let page = 1;

  select.addEventListener("sando-scroll-end", async () => {
    select.loading = true;
    const newUsers = await fetchUsers(++page);

    newUsers.forEach((user) => {
      const option = document.createElement("sando-option");
      option.value = user.id;
      option.textContent = user.name;
      select.appendChild(option);
    });

    select.loading = false;
  });
</script>
```

## Disabled Options

Individual options can be disabled:

```html
<sando-select label="Status" placeholder="Choose status">
  <sando-option value="active">Active</sando-option>
  <sando-option value="pending" disabled>Pending (unavailable)</sando-option>
  <sando-option value="archived">Archived</sando-option>
</sando-select>
```

## Theming

### Using Flavors

Apply different theme flavors to match your brand:

```html
<sando-select flavor="original" label="Original">
  <sando-option value="a">Option A</sando-option>
</sando-select>

<sando-select flavor="strawberry" label="Strawberry">
  <sando-option value="a">Option A</sando-option>
</sando-select>
```

### Custom Styling

Override CSS custom properties for fine-grained control:

```html
<sando-select
  label="Custom Colors"
  style="
    --sando-select-outlined-borderColor-focus: oklch(0.65 0.15 250);
    --sando-select-dropdown-backgroundColor: oklch(0.98 0.01 250);
  "
>
  <sando-option value="a">Option A</sando-option>
  <sando-option value="b">Option B</sando-option>
</sando-select>
```

## API Reference

### Select Properties

| Property            | Attribute             | Type                     | Default      | Description                                              |
| ------------------- | --------------------- | ------------------------ | ------------ | -------------------------------------------------------- |
| `value`             | `value`               | `string`                 | `''`         | Selected value (single select mode)                      |
| `values`            | —                     | `string[]`               | `[]`         | Selected values (multiple select mode)                   |
| `name`              | `name`                | `string`                 | `undefined`  | Form field name                                          |
| `placeholder`       | `placeholder`         | `string`                 | `undefined`  | Placeholder text when no value is selected               |
| `disabled`          | `disabled`            | `boolean`                | `false`      | Whether the select is disabled                           |
| `required`          | `required`            | `boolean`                | `false`      | Whether selection is required for form validation        |
| `error`             | `error`               | `boolean`                | `false`      | Whether the select is in error state                     |
| `errorText`         | `error-text`          | `string`                 | `undefined`  | Error message displayed when `error` is true             |
| `helperText`        | `helper-text`         | `string`                 | `undefined`  | Helper text displayed below the select                   |
| `label`             | `label`               | `string`                 | `undefined`  | Accessible label for the select                          |
| `variant`           | `variant`             | `'filled' \| 'outlined'` | `'filled'`   | Visual style variant                                     |
| `size`              | `size`                | `'sm' \| 'md' \| 'lg'`   | `'md'`       | Select size                                              |
| `multiple`          | `multiple`            | `boolean`                | `false`      | Whether multiple options can be selected                 |
| `clearable`         | `clearable`           | `boolean`                | `false`      | Whether to show a clear button                           |
| `open`              | `open`                | `boolean`                | `false`      | Whether the dropdown is open                             |
| `placement`         | `placement`           | `'top' \| 'bottom'`      | `'bottom'`   | Placement of the dropdown                                |
| `maxTagsVisible`    | `max-tags-visible`    | `number`                 | `3`          | Maximum tags visible in multi-select                     |
| `prefixIcon`        | `prefix-icon`         | `string`                 | `undefined`  | Icon name to display in trigger                          |
| `loading`           | `loading`             | `boolean`                | `false`      | Whether the select is loading (shows spinner)            |
| `reserveErrorSpace` | `reserve-error-space` | `boolean`                | `true`       | Reserve space for error messages to prevent layout shift |
| `flavor`            | `flavor`              | `string`                 | `'original'` | Design system theme flavor                               |

### Select Slots

| Slot          | Description                                      |
| ------------- | ------------------------------------------------ |
| Default       | `sando-option` and `sando-option-group` elements |
| `prefix-icon` | Custom prefix icon (overrides `prefixIcon` prop) |
| `clear-icon`  | Custom clear icon                                |
| `expand-icon` | Custom expand/caret icon                         |

### Select Events

| Event              | Type                                         | Description                                                             |
| ------------------ | -------------------------------------------- | ----------------------------------------------------------------------- |
| `sando-change`     | `CustomEvent<{ value: string \| string[] }>` | Fired when the selected value changes                                   |
| `sando-clear`      | `CustomEvent`                                | Fired when the clear button is clicked                                  |
| `sando-show`       | `CustomEvent`                                | Fired when the dropdown opens                                           |
| `sando-hide`       | `CustomEvent`                                | Fired when the dropdown closes                                          |
| `sando-scroll-end` | `CustomEvent`                                | Fired when scrolled to the bottom of the dropdown (for infinite scroll) |

### Select Methods

| Method                       | Returns   | Description                                         |
| ---------------------------- | --------- | --------------------------------------------------- |
| `show()`                     | `void`    | Open the dropdown programmatically                  |
| `hide()`                     | `void`    | Close the dropdown programmatically                 |
| `toggle()`                   | `void`    | Toggle the dropdown open/closed                     |
| `clear()`                    | `void`    | Clear all selections                                |
| `focus()`                    | `void`    | Focus the select trigger                            |
| `blur()`                     | `void`    | Remove focus from the select trigger                |
| `checkValidity()`            | `boolean` | Check if the select is valid (for required selects) |
| `reportValidity()`           | `boolean` | Check validity and set error state if invalid       |
| `setCustomValidity(message)` | `void`    | Set a custom validation message                     |

### Select CSS Custom Properties

Key CSS variables you can override:

```css
/* Outlined variant */
--sando-select-outlined-borderColor-default
--sando-select-outlined-borderColor-hover
--sando-select-outlined-borderColor-focus
--sando-select-outlined-borderColor-error
--sando-select-outlined-borderColor-disabled
--sando-select-outlined-backgroundColor-default
--sando-select-outlined-backgroundColor-disabled
--sando-select-outlined-textColor-default
--sando-select-outlined-textColor-placeholder
--sando-select-outlined-textColor-disabled

/* Filled variant */
--sando-select-filled-backgroundColor-default
--sando-select-filled-backgroundColor-hover
--sando-select-filled-backgroundColor-disabled
--sando-select-filled-borderColor-default
--sando-select-filled-borderColor-hover
--sando-select-filled-borderColor-focus
--sando-select-filled-borderColor-error
--sando-select-filled-borderColor-disabled

/* Dropdown */
--sando-select-dropdown-backgroundColor
--sando-select-dropdown-borderColor
--sando-select-dropdown-borderRadius
--sando-select-dropdown-boxShadow
--sando-select-dropdown-maxHeight
```

---

## Option (`sando-option`)

An individual option element for use within `sando-select`. Similar to a native `<option>` element but with enhanced styling, prefix/suffix slots, and accessibility.

### Option Properties

| Property   | Attribute  | Type                   | Default      | Description                                                  |
| ---------- | ---------- | ---------------------- | ------------ | ------------------------------------------------------------ |
| `value`    | `value`    | `string`               | `''`         | The value of this option (submitted with the form)           |
| `disabled` | `disabled` | `boolean`              | `false`      | Whether the option is disabled                               |
| `selected` | `selected` | `boolean`              | `false`      | Whether the option is currently selected (managed by parent) |
| `multiple` | `multiple` | `boolean`              | `false`      | Whether parent is in multi-select mode (set by parent)       |
| `size`     | `size`     | `'sm' \| 'md' \| 'lg'` | `'md'`       | Size of the option (inherited from parent select)            |
| `flavor`   | `flavor`   | `string`               | `'original'` | Design system theme flavor                                   |

### Option Slots

| Slot     | Description                      |
| -------- | -------------------------------- |
| Default  | The option label/content         |
| `prefix` | Icon or content before the label |
| `suffix` | Badge or content after the label |

### Option Events

| Event                 | Type                                            | Description                               |
| --------------------- | ----------------------------------------------- | ----------------------------------------- |
| `sando-option-select` | `CustomEvent<{ value: string, label: string }>` | Fired when the option is clicked/selected |

### Option Methods

| Method       | Returns  | Description                               |
| ------------ | -------- | ----------------------------------------- |
| `getLabel()` | `string` | Get the text content/label of this option |
| `getValue()` | `string` | Get the value of this option              |

### Option CSS Custom Properties

```css
/* Background */
--sando-select-option-backgroundColor-default
--sando-select-option-backgroundColor-hover
--sando-select-option-backgroundColor-focus
--sando-select-option-backgroundColor-selected
--sando-select-option-backgroundColor-selectedHover
--sando-select-option-backgroundColor-disabled

/* Text */
--sando-select-option-textColor-default
--sando-select-option-textColor-hover
--sando-select-option-textColor-focus
--sando-select-option-textColor-selected
--sando-select-option-textColor-disabled

/* Checkmark (multi-select) */
--sando-select-option-checkmarkColor-default
--sando-select-option-checkmarkColor-selected
--sando-select-option-checkmarkColor-disabled

/* Spacing & sizing */
--sando-select-option-paddingInline
--sando-select-option-paddingBlock
--sando-select-option-fontSize
--sando-select-option-gap
--sando-select-option-minHeight
```

---

## Option Group (`sando-option-group`)

A container that groups related options with a label, similar to native `<optgroup>`. Used within `sando-select` to organize options into labeled categories.

### Option Group Properties

| Property   | Attribute  | Type                   | Default      | Description                                              |
| ---------- | ---------- | ---------------------- | ------------ | -------------------------------------------------------- |
| `label`    | `label`    | `string`               | `''`         | The group label text displayed above the options         |
| `disabled` | `disabled` | `boolean`              | `false`      | Whether the group and all its child options are disabled |
| `size`     | `size`     | `'sm' \| 'md' \| 'lg'` | `'md'`       | Size of the option group (inherited from parent select)  |
| `flavor`   | `flavor`   | `string`               | `'original'` | Design system theme flavor                               |

### Option Group Slots

| Slot    | Description                           |
| ------- | ------------------------------------- |
| Default | `sando-option` elements to be grouped |

### Option Group CSS Custom Properties

```css
--sando-select-optionGroup-labelColor
--sando-select-optionGroup-labelFontSize
--sando-select-optionGroup-labelFontWeight
--sando-select-optionGroup-labelPaddingInline
--sando-select-optionGroup-labelPaddingBlock
--sando-select-optionGroup-dividerColor
--sando-select-optionGroup-dividerWidth
--sando-select-optionGroup-marginTop
```

---

## Accessibility

The Select component implements the WAI-ARIA combobox pattern with a listbox popup and exceeds WCAG 2.1 Level AA requirements:

| WCAG Criterion           | Level | Status  | Implementation                                                     |
| ------------------------ | ----- | ------- | ------------------------------------------------------------------ |
| 1.4.3 Contrast (Minimum) | AA    | ✅ Pass | All text meets 4.5:1 contrast ratio                                |
| 2.1.1 Keyboard           | A     | ✅ Pass | Full keyboard navigation with arrow keys, Home/End, and type-ahead |
| 2.4.7 Focus Visible      | AA    | ✅ Pass | Visible focus indicator on trigger and options                     |
| 4.1.2 Name, Role, Value  | A     | ✅ Pass | `role="combobox"` with proper ARIA attributes                      |

### Keyboard Navigation

| Key               | Action                                        |
| ----------------- | --------------------------------------------- |
| `Enter` / `Space` | Open dropdown or select highlighted option    |
| `ArrowDown`       | Open dropdown or highlight next option        |
| `ArrowUp`         | Open dropdown or highlight previous option    |
| `Home`            | Highlight first option                        |
| `End`             | Highlight last option                         |
| `Escape`          | Close dropdown and return focus to trigger    |
| `Tab`             | Close dropdown and move focus to next element |
| Type-ahead        | Type characters to jump to matching option    |

### Screen Reader Support

- ✅ `role="combobox"` on trigger with `aria-haspopup="listbox"`
- ✅ `aria-expanded` communicates open/closed state
- ✅ `aria-activedescendant` tracks the highlighted option
- ✅ `aria-multiselectable` announces multi-select mode
- ✅ `aria-required` and `aria-invalid` communicate validation state
- ✅ `aria-busy` announces loading state
- ✅ Options use `role="option"` with `aria-selected` and `aria-disabled`
- ✅ Option groups use `role="group"` with `aria-label`

## Best Practices

### Do ✅

- Use clear, descriptive labels for the select and each option
- Use `placeholder` to hint at expected input ("Select a country...")
- Use `helper-text` to provide additional context
- Use `clearable` when the selection is optional
- Use `sando-option-group` to organize long option lists into categories
- Use the `loading` state when fetching options asynchronously
- Use `sando-scroll-end` for large datasets instead of loading all options at once
- Use `error-text` to explain what went wrong and how to fix it
- Use `prefix` and `suffix` slots to add visual context to options

### Don't ❌

- Don't use a select with fewer than 3 options — use radio buttons instead
- Don't leave `aria-label` empty if `label` prop is not provided
- Don't nest selects inside other selects
- Don't disable options without a clear reason visible to the user
- Don't mix `value` (single) and `values` (multiple) — choose one mode

## Examples

### Country Selector with Groups

```html
<sando-select
  label="Country"
  placeholder="Choose your country"
  variant="outlined"
  clearable
  required
>
  <sando-option-group label="North America">
    <sando-option value="us">🇺🇸 United States</sando-option>
    <sando-option value="ca">🇨🇦 Canada</sando-option>
    <sando-option value="mx">🇲🇽 Mexico</sando-option>
  </sando-option-group>
  <sando-option-group label="Europe">
    <sando-option value="uk">🇬🇧 United Kingdom</sando-option>
    <sando-option value="de">🇩🇪 Germany</sando-option>
    <sando-option value="fr">🇫🇷 France</sando-option>
  </sando-option-group>
  <sando-option-group label="Asia">
    <sando-option value="jp">🇯🇵 Japan</sando-option>
    <sando-option value="kr">🇰🇷 South Korea</sando-option>
  </sando-option-group>
</sando-select>
```

### Multi-Select with Tags

```html
<sando-select
  id="skills-select"
  label="Skills"
  multiple
  clearable
  max-tags-visible="3"
  placeholder="Select your skills"
  helper-text="Choose up to 5 skills"
>
  <sando-option value="js">JavaScript</sando-option>
  <sando-option value="ts">TypeScript</sando-option>
  <sando-option value="react">React</sando-option>
  <sando-option value="vue">Vue</sando-option>
  <sando-option value="angular">Angular</sando-option>
  <sando-option value="lit">Lit</sando-option>
  <sando-option value="svelte">Svelte</sando-option>
</sando-select>

<script>
  const select = document.getElementById("skills-select");
  select.addEventListener("sando-change", (e) => {
    const selected = e.detail.value;
    if (selected.length > 5) {
      select.error = true;
      select.errorText = "Maximum 5 skills allowed";
    } else {
      select.error = false;
    }
  });
</script>
```

### Async Loading with Infinite Scroll

```html
<sando-select
  id="user-select"
  label="Assign to"
  placeholder="Search for a user..."
  prefix-icon="search"
  clearable
>
  <!-- Options loaded dynamically -->
</sando-select>

<script>
  const select = document.getElementById("user-select");
  let page = 0;
  let hasMore = true;

  async function loadUsers() {
    if (!hasMore) return;
    select.loading = true;

    const response = await fetch(`/api/users?page=${++page}`);
    const { data, total } = await response.json();

    data.forEach((user) => {
      const option = document.createElement("sando-option");
      option.value = user.id;
      option.textContent = user.name;
      select.appendChild(option);
    });

    hasMore = select.querySelectorAll("sando-option").length < total;
    select.loading = false;
  }

  // Load initial batch
  loadUsers();

  // Load more on scroll
  select.addEventListener("sando-scroll-end", loadUsers);
</script>
```

## Framework Integration

::: code-group

```tsx [React]
import "@sando/components";

function CountrySelect() {
  const handleChange = (e: CustomEvent) => {
    console.log("Selected:", e.detail.value);
  };

  return (
    <sando-select
      label="Country"
      placeholder="Select a country"
      clearable
      onSando-change={handleChange}
    >
      <sando-option value="us">United States</sando-option>
      <sando-option value="ca">Canada</sando-option>
      <sando-option value="mx">Mexico</sando-option>
    </sando-select>
  );
}
```

```vue [Vue 3]
<template>
  <sando-select
    label="Country"
    placeholder="Select a country"
    clearable
    @sando-change="handleChange"
  >
    <sando-option value="us">United States</sando-option>
    <sando-option value="ca">Canada</sando-option>
    <sando-option value="mx">Mexico</sando-option>
  </sando-select>
</template>

<script setup lang="ts">
import "@sando/components";

const handleChange = (e: CustomEvent) => {
  console.log("Selected:", e.detail.value);
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
<sando-select
  label="Country"
  placeholder="Select a country"
  clearable
  (sando-change)="handleChange($event)"
>
  <sando-option value="us">United States</sando-option>
  <sando-option value="ca">Canada</sando-option>
  <sando-option value="mx">Mexico</sando-option>
</sando-select>
```

:::

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

::: tip Popover API
The select uses the native [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) for dropdown positioning when available, with an automatic fallback for older browsers.
:::

## Related

- [Input](/components/input) — Single-line text input
- [Textarea](/components/textarea) — Multi-line text input
- [Form](/components/form) — Form wrapper with validation coordination
- [Form Group](/components/form-group) — Layout container for form controls
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
