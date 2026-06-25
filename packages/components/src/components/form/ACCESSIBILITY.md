# Accessibility — sando-form

## ARIA pattern

Follows the [WAI-ARIA Form](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern using the native `<form>` element.

| Attribute     | Value                | Purpose                                                         |
| ------------- | -------------------- | --------------------------------------------------------------- |
| `aria-busy`   | `"true"` / `"false"` | Marks the form as busy during async submission (`loading=true`) |
| `aria-hidden` | `"true"`             | On the loading overlay — decorative spinner is hidden from AT   |

The component wraps a native `<form>` element. Individual form controls within slots manage their own ARIA attributes.

## Keyboard map

| Key       | Behavior                                                     |
| --------- | ------------------------------------------------------------ |
| Tab       | Move focus between form fields                               |
| Shift+Tab | Move focus backward between form fields                      |
| Enter     | Submit the form (when focus is on an input or submit button) |

During loading state (`loading=true`), the form submit button is disabled to prevent double-submission.

## Screen reader behavior

Expected announcement when loading state activates:

> Screen readers may announce `aria-busy="true"` as "busy" when reading the form region

On validation error (built-in form validation):

> Browser-native error announcements for required fields, format errors, etc.

## Color contrast

| Pair                           | Ratio                        | WCAG 2.1 AA |
| ------------------------------ | ---------------------------- | ----------- |
| Form fields text vs background | Verified via axe-core        | ✅          |
| Focus ring vs adjacent         | Verified via axe-core        | ✅          |
| Disabled/loading state         | Intentional reduced contrast | n/a         |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite.

## Tested with

- jest-axe (automated, runs in `sando-form.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations

- None identified.
