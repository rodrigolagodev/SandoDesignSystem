# Accessibility — sando-spinner

## ARIA pattern
Follows the [WAI-ARIA Live Region](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern using `role="status"`.

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `status` | Marks the spinner as a polite live region that announces loading state |
| `aria-label` | `"Loading"` (default) or custom | Provides the accessible name announced to screen readers |
| `aria-hidden` | `"true"` | On the `<svg>` element — the SVG animation is decorative |

The spinner constant (`SPINNER_ROLE = 'status'`) is defined in `sando-spinner.a11y.ts` and imported by the component implementation.

## Keyboard map
| Key | Behavior |
|---|---|
| — | Not keyboard focusable — the spinner is a non-interactive loading indicator |

Spinners do not appear in the tab order. They are typically rendered inside a container or button that manages its own focus.

## Screen reader behavior
Expected announcement when the spinner appears in the DOM:
> "Loading" (polite, announced at next opportunity via `role="status"`)

With custom label:
> "Processing payment" (when `label="Processing payment"` is set)

The SVG animation is hidden from AT via `aria-hidden="true"` on the `<svg>` element.

## Color contrast
| Pair | Ratio | WCAG 2.1 AA |
|---|---|---|
| Spinner stroke vs background (default) | Verified via axe-core | ✅ |
| Spinner stroke vs background (inverted) | Verified via axe-core | ✅ |
| Focus ring vs adjacent | n/a — not focusable | n/a |

Contrast values are validated against the `original` flavor in both light and dark modes via `jest-axe` in the automated test suite (`sando-spinner.a11y.test.ts`).

## Tested with
- jest-axe (automated, runs in `sando-spinner.a11y.test.ts`)
- VoiceOver (macOS Sequoia, Safari 18)
- NVDA (Windows 11, Firefox 130)

## Known limitations
- The `sando-spinner.a11y.ts` file (without `.test`) is a constants file imported by the component — it is not a test file. The actual accessibility tests live in `sando-spinner.a11y.test.ts`.
