# Accessibility Guide

Sando Design System is built with accessibility as a core principle, not an afterthought.

## Our Commitment

All components in Sando Design System are designed to meet **WCAG 2.1 Level AA** standards.

## Accessibility Features

### 🎨 Color Contrast

All color combinations in our token system are tested for proper contrast:

- **Text**: Minimum 4.5:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio
- **Large Text** (18pt+): Minimum 3:1 contrast ratio

We use automated testing to ensure every token combination meets these requirements:

```bash
# Run accessibility tests
pnpm --filter @sando/tokens test:accessibility
```

### ⌨️ Keyboard Navigation

All interactive components are fully keyboard accessible:

- **Tab**: Navigate between focusable elements
- **Shift + Tab**: Navigate backwards
- **Enter/Space**: Activate buttons and controls
- **Escape**: Close modals and dismissible elements
- **Arrow Keys**: Navigate within compound widgets

### 🔊 Screen Reader Support

Components include proper ARIA attributes:

- Semantic HTML elements
- ARIA roles where necessary
- ARIA labels for context
- ARIA live regions for dynamic content
- Proper heading hierarchy

### 👁️ Focus Management

- Clear focus indicators on all interactive elements
- Focus trapped in modals
- Focus restored when closing overlays
- Skip links for keyboard users

## Testing for Accessibility

### Automated Testing

We use multiple tools to catch accessibility issues:

```bash
# Run all accessibility tests
pnpm test:a11y

# Specific component tests
pnpm --filter @sando/components test:a11y
```

Tools used:
- **axe-core**: Automated accessibility testing
- **Playwright**: E2E accessibility testing
- **Vitest**: Unit testing for WCAG compliance

### Manual Testing

Automated tests catch many issues, but manual testing is crucial:

#### Keyboard Navigation Checklist

- [ ] All interactive elements are reachable via Tab
- [ ] Tab order is logical
- [ ] Focus is visible
- [ ] Escape key closes modals/overlays
- [ ] No keyboard traps

#### Screen Reader Checklist

Test with:
- **NVDA** (Windows, free)
- **JAWS** (Windows)
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)

Verify:
- [ ] All content is announced
- [ ] Interactive elements have clear labels
- [ ] Form errors are announced
- [ ] Dynamic content updates are announced
- [ ] Landmarks are properly identified

#### Visual Checklist

- [ ] Text is readable at 200% zoom
- [ ] Color is not the only means of conveying information
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Content reflows without horizontal scrolling

## Component-Specific Guidance

### Buttons

```html
<!-- Good: Clear, descriptive text -->
<sando-button>Save Changes</sando-button>

<!-- Bad: Generic text -->
<sando-button>Click Here</sando-button>

<!-- Good: Icon with accessible label -->
<sando-button aria-label="Close dialog">
  <span aria-hidden="true">×</span>
</sando-button>
```

### Forms

```html
<!-- Good: Associated label -->
<label for="email">Email Address</label>
<input type="email" id="email" required>

<!-- Good: Error message -->
<input
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
>
<div id="email-error" role="alert">
  Please enter a valid email address
</div>
```

### Focus Indicators

All Sando components include visible focus indicators that meet WCAG requirements:

```css
/* Focus indicator style */
:focus-visible {
  outline: 2px solid var(--sando-color-focus-ring);
  outline-offset: 2px;
}
```

## ARIA Patterns

We follow [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for common patterns:

- **Button**: Native `<button>` elements when possible
- **Modal Dialog**: Focus trap, Escape to close, return focus
- **Combobox**: Proper autocomplete semantics
- **Tabs**: Arrow key navigation, automatic activation

## Motion and Animation

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

All Sando components respect this preference.

## Resources

### Official Guidelines

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built into Chrome DevTools

### Screen Readers

- [NVDA](https://www.nvaccess.org/) - Free for Windows
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) - Built into macOS/iOS
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Commercial for Windows

## Reporting Accessibility Issues

If you find an accessibility issue:

1. Check if it's already [reported](https://github.com/rodrigolagodev/SandoDesingSystem/issues)
2. Create a new issue with:
   - WCAG criterion it violates
   - Steps to reproduce
   - Affected component(s)
   - Testing tool used (if applicable)

We treat accessibility issues as **high priority** bugs.

## Contributing

When contributing components:

1. Include accessibility tests
2. Follow ARIA patterns
3. Test with keyboard
4. Test with screen reader
5. Verify color contrast
6. Document accessibility features

See our [Contributing Guide](/guides/contributing) for more details.
