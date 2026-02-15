---
title: Form Component
description: A smart form wrapper that coordinates validation, collects form data, manages loading states, and provides progressive enhancement.
---

# Form

The `sando-form` component is the chef's workstation where all your ingredients come together. It wraps your form controls, coordinates validation, collects data, and handles submission — so you can focus on the recipe instead of the plumbing.

## Features

- ✅ **Validation Coordination**: Validates all child controls and focuses the first invalid field
- ✅ **Data Collection**: `getJson()` and `getFormData()` methods to extract form values
- ✅ **Loading State**: Disables all controls and shows an overlay during submission
- ✅ **Dirty Tracking**: Knows when users have modified form values
- ✅ **Progressive Enhancement**: Renders a native `<form>` with `action` and `method` support
- ✅ **Custom Validation**: `sando-validate` event for server-side or cross-field validation
- ♿ **Accessible**: `aria-busy` state and focus management for invalid fields
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Lightweight**: Thin wrapper with no heavy dependencies

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-form id="login-form">
  <sando-input name="email" label="Email" type="email" required></sando-input>
  <sando-input
    name="password"
    label="Password"
    type="password"
    required
  ></sando-input>
  <sando-button type="submit" variant="solid">Sign In</sando-button>
</sando-form>

<script>
  const form = document.getElementById("login-form");
  form.addEventListener("sando-submit", (e) => {
    console.log("Form data:", e.detail.json);
    // { email: "user@example.com", password: "..." }
  });
</script>
```

::: tip Import Path
All components can be imported from `@sando/components`. Individual component imports like `@sando/components/form` are also available for tree-shaking.
:::

## How It Works

`sando-form` renders a native `<form>` element in its Shadow DOM and manages submission through events. When a `sando-button[type="submit"]` is clicked or the native form submit fires:

1. **Validates** all child form controls (unless `novalidate` is set)
2. **Focuses** the first invalid field (if validation fails)
3. **Emits** `sando-submit` with the form data (if valid) or `sando-invalid` with errors (if invalid)

::: warning Sando Button Integration
Use `sando-button type="submit"` inside the form — it automatically delegates to the form's submit handler. Native `<button type="submit">` works too.
:::

## Supported Form Controls

`sando-form` recognizes these controls when they have a `name` attribute:

| Sando Components          | Native Elements  |
| ------------------------- | ---------------- |
| `sando-input[name]`       | `input[name]`    |
| `sando-select[name]`      | `select[name]`   |
| `sando-textarea[name]`    | `textarea[name]` |
| `sando-checkbox[name]`    | —                |
| `sando-switch[name]`      | —                |
| `sando-radio-group[name]` | —                |

## Validation

### Automatic Validation

By default, `sando-form` validates all controls on submit. Controls with `required`, `minlength`, `maxlength`, and other constraints are checked automatically.

```html
<sando-form id="signup-form">
  <sando-input
    name="username"
    label="Username"
    required
    minlength="3"
  ></sando-input>

  <sando-input name="email" label="Email" type="email" required></sando-input>

  <sando-textarea name="bio" label="Bio" maxlength="500"></sando-textarea>

  <sando-button type="submit" variant="solid">Create Account</sando-button>
</sando-form>

<script>
  const form = document.getElementById("signup-form");

  form.addEventListener("sando-submit", (e) => {
    console.log("Valid form data:", e.detail.json);
  });

  form.addEventListener("sando-invalid", (e) => {
    console.log("Validation errors:", e.detail.errors);
    // [{ name: "email", message: "...", element: <sando-input> }]
  });
</script>
```

### Skipping Validation

Use `novalidate` to skip built-in validation:

```html
<sando-form novalidate>
  <sando-input name="draft" label="Draft (no validation)"></sando-input>
  <sando-button type="submit">Save Draft</sando-button>
</sando-form>
```

### Custom Validation

Use the `sando-validate` event to add server-side or cross-field validation logic. Call `e.preventDefault()` to block submission and `e.detail.addError()` to set field errors.

```html
<sando-form id="register-form">
  <sando-input
    name="password"
    label="Password"
    type="password"
    required
  ></sando-input>
  <sando-input
    name="confirm"
    label="Confirm Password"
    type="password"
    required
  ></sando-input>
  <sando-button type="submit">Register</sando-button>
</sando-form>

<script>
  const form = document.getElementById("register-form");

  form.addEventListener("sando-validate", (e) => {
    const { json, addError } = e.detail;

    if (json.password !== json.confirm) {
      addError("confirm", "Passwords do not match");
      e.preventDefault(); // Block submission
    }
  });

  form.addEventListener("sando-submit", (e) => {
    console.log("Passwords match! Submitting:", e.detail.json);
  });
</script>
```

### Programmatic Validation

Validate without submitting using the `validate()` method:

```html
<sando-form id="step-form">
  <sando-input name="name" label="Name" required></sando-input>
  <sando-button type="button" onclick="validateStep()">Next Step</sando-button>
</sando-form>

<script>
  function validateStep() {
    const form = document.getElementById("step-form");
    if (form.validate()) {
      // Move to next step
      console.log("Step valid:", form.getJson());
    }
  }
</script>
```

## Loading State

When `loading` is set, the form:

- Disables all child form controls
- Sets `loading` on `sando-button[type="submit"]` (showing its spinner)
- Shows a semi-transparent overlay with a spinner
- Announces the loading state via `aria-busy`

```html
<sando-form id="save-form">
  <sando-input name="title" label="Title" required></sando-input>
  <sando-textarea name="content" label="Content" rows="5"></sando-textarea>
  <sando-button type="submit" variant="solid">Save</sando-button>
</sando-form>

<script>
  const form = document.getElementById("save-form");

  form.addEventListener("sando-submit", async (e) => {
    form.loading = true;
    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e.detail.json),
      });
      form.markAsPristine(); // Reset dirty state
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      form.loading = false;
    }
  });
</script>
```

### Custom Loading Label

Customize the loading spinner's accessible label:

```html
<sando-form loading loading-label="Saving your recipe...">
  <!-- form content -->
</sando-form>
```

## Dirty Tracking

`sando-form` tracks whether any field has been modified from its initial value. Use `dirty` and `pristine` to enable/disable save buttons or show unsaved changes warnings.

```html
<sando-form id="edit-form">
  <sando-input name="title" label="Title" value="My Recipe"></sando-input>
  <sando-textarea name="notes" label="Notes"></sando-textarea>
  <sando-button type="submit" id="save-btn" disabled>Save Changes</sando-button>
</sando-form>

<script>
  const form = document.getElementById("edit-form");
  const saveBtn = document.getElementById("save-btn");

  form.addEventListener("sando-change", () => {
    saveBtn.disabled = form.pristine;
  });

  form.addEventListener("sando-submit", async (e) => {
    await saveData(e.detail.json);
    form.markAsPristine(); // Current values become the new baseline
    saveBtn.disabled = true;
  });
</script>
```

## Form Reset

Reset all fields to their initial values:

```html
<sando-form id="my-form">
  <sando-input name="name" label="Name" value="Default Name"></sando-input>
  <sando-select name="role" label="Role" value="viewer">
    <sando-option value="viewer">Viewer</sando-option>
    <sando-option value="editor">Editor</sando-option>
    <sando-option value="admin">Admin</sando-option>
  </sando-select>
  <sando-button type="submit" variant="solid">Save</sando-button>
  <sando-button type="reset" variant="outline">Reset</sando-button>
</sando-form>

<script>
  const form = document.getElementById("my-form");
  form.addEventListener("sando-reset", () => {
    console.log("Form reset to initial values");
  });
</script>
```

## Getting Form Data

Two convenient methods to extract form values:

### As JSON

```html
<script>
  const form = document.querySelector("sando-form");
  const data = form.getJson();
  // { name: "Katsu Sando", category: "japanese", description: "..." }
</script>
```

### As FormData

```html
<script>
  const form = document.querySelector("sando-form");
  const formData = form.getFormData();

  // Use with fetch
  await fetch("/api/submit", {
    method: "POST",
    body: formData,
  });
</script>
```

## Progressive Enhancement

For server-rendered applications, use `action` and `method` to enable native form submission as a fallback:

```html
<sando-form action="/api/login" method="post">
  <sando-input name="email" label="Email" required></sando-input>
  <sando-input
    name="password"
    label="Password"
    type="password"
    required
  ></sando-input>
  <sando-button type="submit">Login</sando-button>
</sando-form>
```

::: tip
The `sando-submit` event always fires first. If you handle it with JavaScript, the native form submission is prevented. If JavaScript is unavailable, the native `<form>` with `action` and `method` takes over.
:::

## Change Tracking

Listen for `sando-change` to react to any field modification:

```html
<sando-form id="tracked-form">
  <sando-input name="email" label="Email"></sando-input>
  <sando-select name="role" label="Role">
    <sando-option value="user">User</sando-option>
    <sando-option value="admin">Admin</sando-option>
  </sando-select>
</sando-form>

<script>
  const form = document.getElementById("tracked-form");
  form.addEventListener("sando-change", (e) => {
    console.log("Field changed:", e.detail.field);
    console.log("New value:", e.detail.value);
    console.log("All form data:", e.detail.json);
  });
</script>
```

## Theming

### Using Flavors

Apply different theme flavors. The flavor propagates to child components:

```html
<sando-form flavor="original">
  <sando-input name="name" label="Name" flavor="original"></sando-input>
  <sando-button type="submit" flavor="original">Submit</sando-button>
</sando-form>
```

## API Reference

### Properties

| Property       | Attribute       | Type                                                                           | Default             | Description                                       |
| -------------- | --------------- | ------------------------------------------------------------------------------ | ------------------- | ------------------------------------------------- |
| `loading`      | `loading`       | `boolean`                                                                      | `false`             | Disables all controls and shows a loading overlay |
| `loadingLabel` | `loading-label` | `string`                                                                       | `'Submitting form'` | Accessible label for the loading spinner          |
| `novalidate`   | `novalidate`    | `boolean`                                                                      | `false`             | Skip native HTML validation on submit             |
| `name`         | `name`          | `string`                                                                       | `undefined`         | Form name attribute                               |
| `action`       | `action`        | `string`                                                                       | `undefined`         | Form action URL (for progressive enhancement)     |
| `method`       | `method`        | `'get' \| 'post'`                                                              | `'post'`            | Form HTTP method                                  |
| `enctype`      | `enctype`       | `'application/x-www-form-urlencoded' \| 'multipart/form-data' \| 'text/plain'` | `undefined`         | Form encoding type (for file uploads)             |
| `flavor`       | `flavor`        | `string`                                                                       | `'original'`        | Design system theme flavor                        |

### Read-Only Properties

| Property   | Type      | Description                                                 |
| ---------- | --------- | ----------------------------------------------------------- |
| `dirty`    | `boolean` | Whether any form field has been modified                    |
| `pristine` | `boolean` | Whether the form is in its initial state (no modifications) |

### Slots

| Slot    | Description                                                        |
| ------- | ------------------------------------------------------------------ |
| Default | Form content (`sando-input`, `sando-select`, `sando-button`, etc.) |

### Events

| Event            | Type                                   | Description                                     |
| ---------------- | -------------------------------------- | ----------------------------------------------- |
| `sando-submit`   | `CustomEvent<FormSubmitEventDetail>`   | Emitted on valid form submission                |
| `sando-invalid`  | `CustomEvent<FormInvalidEventDetail>`  | Emitted when validation fails                   |
| `sando-reset`    | `CustomEvent<FormResetEventDetail>`    | Emitted when the form is reset                  |
| `sando-change`   | `CustomEvent<FormChangeEventDetail>`   | Emitted when any field value changes            |
| `sando-validate` | `CustomEvent<FormValidateEventDetail>` | Emitted before submission for custom validation |

### Event Detail Types

```typescript
// sando-submit
interface FormSubmitEventDetail {
  formData: FormData; // FormData with all named fields
  json: Record<string, unknown>; // Plain object with field values
  isValid: boolean; // Always true (only fires on valid submit)
}

// sando-invalid
interface FormInvalidEventDetail {
  errors: FormValidationError[]; // Array of validation errors
}

interface FormValidationError {
  name: string; // Name attribute of the invalid control
  message: string; // Validation error message
  element: HTMLElement; // Reference to the invalid element
}

// sando-change
interface FormChangeEventDetail {
  field: string | null; // Name of the changed field
  value: unknown; // Current value of the field
  json: Record<string, unknown>; // Current form data as JSON
}

// sando-validate
interface FormValidateEventDetail {
  json: Record<string, unknown>; // Current form data
  isValid: boolean; // Whether built-in validation passed
  errors: FormValidationError[]; // Current validation errors
  addError: (name: string, message: string) => void; // Add a custom error
}
```

### Methods

| Method                | Returns                   | Description                                                  |
| --------------------- | ------------------------- | ------------------------------------------------------------ |
| `submit()`            | `void`                    | Programmatically trigger form submission (validates first)   |
| `reset()`             | `void`                    | Reset all fields to initial values and clear errors          |
| `validate()`          | `boolean`                 | Validate all fields without submitting                       |
| `clearErrors()`       | `void`                    | Clear all error states on form controls                      |
| `getFormData()`       | `FormData`                | Get a FormData object with all named fields                  |
| `getJson()`           | `Record<string, unknown>` | Get a plain object with field name/value pairs               |
| `setLoading(loading)` | `void`                    | Set the loading state                                        |
| `markAsPristine()`    | `void`                    | Mark current values as the new baseline (resets dirty state) |

## Accessibility

The Form component provides accessible form handling:

| WCAG Criterion               | Level | Status  | Implementation                                           |
| ---------------------------- | ----- | ------- | -------------------------------------------------------- |
| 1.3.1 Info and Relationships | A     | ✅ Pass | Native `<form>` element with proper structure            |
| 2.1.1 Keyboard               | A     | ✅ Pass | All form controls are keyboard accessible                |
| 2.4.3 Focus Order            | A     | ✅ Pass | Focus moves to first invalid field on validation failure |
| 3.3.1 Error Identification   | A     | ✅ Pass | Invalid fields are identified with error messages        |
| 3.3.3 Error Suggestion       | AA    | ✅ Pass | Error messages explain how to fix the issue              |

### Screen Reader Support

- ✅ `aria-busy` announces loading state
- ✅ First invalid field receives focus on validation failure
- ✅ Error messages on child controls are announced via `aria-describedby`
- ✅ Loading spinner has an accessible label (`loading-label`)

## Best Practices

### Do ✅

- Use `sando-form` to wrap all related form controls
- Give every control a `name` attribute for data collection
- Handle `sando-submit` for async operations instead of native form submission
- Use `loading` state during async operations to prevent double-submission
- Use `sando-validate` for cross-field validation (e.g., password confirmation)
- Use `markAsPristine()` after a successful save
- Provide clear `error-text` on individual controls
- Use `sando-button type="reset"` for form reset functionality
- Use `action` and `method` for progressive enhancement in server-rendered apps

### Don't ❌

- Don't nest `sando-form` elements inside each other
- Don't forget `name` attributes on form controls (they won't be collected)
- Don't use `novalidate` unless you're implementing entirely custom validation
- Don't manipulate the internal `<form>` element directly — use the component's API
- Don't set `loading` without eventually clearing it (users will be stuck)

## Examples

### Login Form

```html
<sando-form id="login">
  <sando-input
    name="email"
    label="Email"
    type="email"
    required
    placeholder="you@example.com"
  ></sando-input>

  <sando-input
    name="password"
    label="Password"
    type="password"
    required
    minlength="8"
  ></sando-input>

  <sando-checkbox name="remember">Remember me</sando-checkbox>

  <sando-button type="submit" variant="solid" full-width>Sign In</sando-button>
</sando-form>

<script>
  document
    .getElementById("login")
    .addEventListener("sando-submit", async (e) => {
      const form = e.target;
      form.loading = true;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e.detail.json),
        });

        if (!response.ok) {
          const error = await response.json();
          form.loading = false;
          // Show server-side error on the relevant field
          const emailInput = form.querySelector('[name="email"]');
          emailInput.error = true;
          emailInput.errorText = error.message;
          return;
        }

        window.location.href = "/dashboard";
      } catch {
        form.loading = false;
      }
    });
</script>
```

### Registration with Custom Validation

```html
<sando-form id="register">
  <sando-input
    name="username"
    label="Username"
    required
    minlength="3"
  ></sando-input>
  <sando-input name="email" label="Email" type="email" required></sando-input>
  <sando-input
    name="password"
    label="Password"
    type="password"
    required
    minlength="8"
  ></sando-input>
  <sando-input
    name="confirmPassword"
    label="Confirm Password"
    type="password"
    required
  ></sando-input>

  <sando-checkbox name="terms" required>
    I agree to the Terms of Service
  </sando-checkbox>

  <sando-button type="submit" variant="solid">Create Account</sando-button>
  <sando-button type="reset" variant="ghost">Clear</sando-button>
</sando-form>

<script>
  const form = document.getElementById("register");

  form.addEventListener("sando-validate", (e) => {
    const { json, addError } = e.detail;

    if (json.password !== json.confirmPassword) {
      addError("confirmPassword", "Passwords do not match");
      e.preventDefault();
    }

    if (json.password && json.password.length < 8) {
      addError("password", "Password must be at least 8 characters");
      e.preventDefault();
    }
  });

  form.addEventListener("sando-submit", async (e) => {
    form.loading = true;
    try {
      await createAccount(e.detail.json);
      window.location.href = "/welcome";
    } finally {
      form.loading = false;
    }
  });
</script>
```

### Multi-Step Form

```html
<sando-form id="step1-form">
  <sando-input name="firstName" label="First Name" required></sando-input>
  <sando-input name="lastName" label="Last Name" required></sando-input>
  <sando-input name="email" label="Email" type="email" required></sando-input>
  <sando-button type="button" id="next-btn" variant="solid"
    >Next Step →</sando-button
  >
</sando-form>

<script>
  document.getElementById("next-btn").addEventListener("click", () => {
    const form = document.getElementById("step1-form");

    if (form.validate()) {
      const stepData = form.getJson();
      console.log("Step 1 data:", stepData);
      // Navigate to step 2 with collected data
    }
  });
</script>
```

## Framework Integration

::: code-group

```tsx [React]
import "@sando/components";

function ContactForm() {
  const handleSubmit = (e: CustomEvent) => {
    console.log("Submitted:", e.detail.json);
  };

  const handleInvalid = (e: CustomEvent) => {
    console.log("Errors:", e.detail.errors);
  };

  return (
    <sando-form onSando-submit={handleSubmit} onSando-invalid={handleInvalid}>
      <sando-input name="name" label="Name" required />
      <sando-input name="email" label="Email" type="email" required />
      <sando-textarea name="message" label="Message" rows={4} required />
      <sando-button type="submit" variant="solid">
        Send Message
      </sando-button>
    </sando-form>
  );
}
```

```vue [Vue 3]
<template>
  <sando-form @sando-submit="handleSubmit" @sando-invalid="handleInvalid">
    <sando-input name="name" label="Name" required />
    <sando-input name="email" label="Email" type="email" required />
    <sando-textarea name="message" label="Message" :rows="4" required />
    <sando-button type="submit" variant="solid">Send Message</sando-button>
  </sando-form>
</template>

<script setup lang="ts">
import "@sando/components";

const handleSubmit = (e: CustomEvent) => {
  console.log("Submitted:", e.detail.json);
};

const handleInvalid = (e: CustomEvent) => {
  console.log("Errors:", e.detail.errors);
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
<sando-form
  (sando-submit)="handleSubmit($event)"
  (sando-invalid)="handleInvalid($event)"
>
  <sando-input name="name" label="Name" required></sando-input>
  <sando-input name="email" label="Email" type="email" required></sando-input>
  <sando-textarea
    name="message"
    label="Message"
    [rows]="4"
    required
  ></sando-textarea>
  <sando-button type="submit" variant="solid">Send Message</sando-button>
</sando-form>
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
- [Textarea](/components/textarea) — Multi-line text input
- [Form Group](/components/form-group) — Layout container for form controls
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
