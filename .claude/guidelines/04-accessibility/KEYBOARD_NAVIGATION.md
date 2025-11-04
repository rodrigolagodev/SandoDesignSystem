# Keyboard Navigation

**Category**: 04-accessibility
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: QA Expert

---

## Purpose

Ensure all Sando Design System components are fully keyboard accessible per WCAG 2.1 Level A/AA standards. This guideline defines keyboard interaction patterns, focus management, tab order, and testing procedures for Web Components with Shadow DOM.

**Target Audience**: Frontend developers, QA engineers, UI designers
**Scope**: All interactive components (buttons, forms, dialogs, menus, tabs)

---

## Core Rules

### Rule 1: All Interactive Elements Keyboard Accessible (Non-Negotiable)

Every interactive element MUST be operable via keyboard without mouse: Tab/Shift+Tab for navigation, Enter/Space for activation.

**Pattern**:
```typescript
// ✅ Native button (automatic keyboard support)
<button type="button">Submit</button>

// ✅ Custom interactive with keyboard handling
<div role="button" tabindex="0" @keydown=${this.handleKeydown}>
```

**Anti-pattern**:
```typescript
// ❌ Div without keyboard support
<div onclick="handleClick">Click me</div>
```

**Why**: WCAG 2.1.1 Level A requirement. Essential for users with motor disabilities, blind users, and power users who prefer keyboard navigation.

**Enforcement**: Automated testing with keyboard event simulation in Vitest tests (see `sando-button.test.ts`).

**Reference**: [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)

### Rule 2: Focus Visible Indicators (Non-Negotiable)

All focusable elements MUST display a visible focus indicator with 3:1 contrast ratio per WCAG 2.4.7 Level AA.

**Pattern**:
```css
button:focus-visible {
  outline: 2px solid var(--sando-color-focus);
  outline-offset: 2px;
}
```

**Anti-pattern**:
```css
/* ❌ Removes focus indicator without replacement */
button:focus {
  outline: none;
}
```

**Why**: Users must see where keyboard focus is located. Critical for keyboard navigation, motor disabilities, and cognitive disabilities.

**Enforcement**: Visual regression tests, manual testing, automated outline detection in unit tests.

**Reference**: [WCAG 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)

### Rule 3: Logical Tab Order

Tab order MUST follow visual reading order (left-to-right, top-to-bottom for LTR). Never use positive `tabindex` values.

**Pattern**:
- DOM order = visual order
- `tabindex="0"` for custom interactive elements
- `tabindex="-1"` for programmatic focus only
- `disabled` removes from tab order

**Anti-pattern**:
```html
<!-- ❌ Positive tabindex creates unpredictable order -->
<button tabindex="3">Third</button>
<button tabindex="1">First</button>
<button tabindex="2">Second</button>
```

**Why**: WCAG 2.4.3 Level A. Predictable navigation reduces cognitive load and prevents confusion.

**Enforcement**: Manual tab order testing, automated DOM order validation.

**Reference**: [WCAG 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)

### Rule 4: No Keyboard Traps (Non-Negotiable)

Users MUST be able to navigate away from any focused element using only keyboard. Provide Escape to close modals/dialogs.

**Pattern**:
- Tab/Shift+Tab always moves focus
- Escape closes dialogs and returns focus
- Focus trap within modals (Tab cycles through modal content)
- Document how to exit custom interactions

**Why**: WCAG 2.1.2 Level A. Keyboard traps prevent users from completing tasks and accessing content.

**Enforcement**: Manual testing, automated trap detection in E2E tests.

**Reference**: [WCAG 2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html)

### Rule 5: Shadow DOM Focus Delegation

Web Components MUST use `delegatesFocus: true` to ensure focus management works correctly in Shadow DOM.

**Pattern**:
```typescript
export class SandoButton extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };
}
```

**Why**: Shadow DOM encapsulation can break focus management. `delegatesFocus` automatically focuses first focusable element in shadow tree when host receives focus.

**Enforcement**: Component creation template includes this by default, verified in unit tests.

**Reference**: `sando-button.test.ts` (focus delegation tests)

---

## WCAG Keyboard Success Criteria

| Criteria | Level | Requirement | Implementation | Test Method |
|----------|-------|-------------|----------------|-------------|
| 2.1.1 Keyboard | A | All functionality available via keyboard | Tab, Enter, Space keys | Tab through all interactive elements |
| 2.1.2 No Keyboard Trap | A | User can navigate away from any element | Escape key, Tab always works | Tab/Escape from all states |
| 2.4.3 Focus Order | A | Tab order matches visual order | DOM structure = visual layout | Manual tab order inspection |
| 2.4.7 Focus Visible | AA | Visible focus indicator present | :focus-visible styles, 3:1 contrast | Visual inspection, contrast tools |

**Additional criteria**:
- **3.2.1 On Focus (Level A)**: Focus alone does not trigger context changes
- **2.5.1 Pointer Gestures (Level A)**: All functionality via single pointer
- **2.5.2 Pointer Cancellation (Level A)**: Can abort/undo activation

**Reference**: [WCAG 2.1 Quick Reference - Keyboard Accessible](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C212%2C243%2C247)

---

## Standard Keyboard Interactions

### Navigation Keys

| Key | Action | Applies To | Notes |
|-----|--------|------------|-------|
| Tab | Move focus forward | All interactive elements | Standard navigation |
| Shift+Tab | Move focus backward | All interactive elements | Reverse navigation |

### Activation Keys

| Key | Action | Applies To | Notes |
|-----|--------|------------|-------|
| Enter | Activate element | Buttons, links, menu items | Primary activation |
| Space | Activate element | Buttons, checkboxes, switches | Toggle/activate |

### Component-Specific Keys

| Key | Action | Applies To | Notes |
|-----|--------|------------|-------|
| Escape | Cancel/close | Modals, dialogs, menus, popovers | Exit interaction, restore focus |
| Arrow Up/Down | Navigate items | Vertical lists, menus, selects, radios | Vertical navigation |
| Arrow Left/Right | Navigate items | Horizontal tabs, sliders | Horizontal navigation |
| Home | First item | Lists, menus, tabs | Jump to start |
| End | Last item | Lists, menus, tabs | Jump to end |
| Page Up/Down | Scroll container | Scrollable regions | Large movements |

**Complete keyboard patterns**: [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

---

## Focus Management

### Shadow DOM Focus Delegation

**Required pattern for all Sando components**:
```typescript
export class SandoComponent extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };
}
```

**What it does**:
- Focuses first focusable element in shadow tree when host receives focus
- Enables Tab to enter shadow tree naturally
- Required for proper keyboard navigation in Web Components

**Test pattern** (from `sando-button.test.ts`):
```typescript
const button = element.shadowRoot?.querySelector('button');
element.focus();
expect(document.activeElement).toBe(element);
expect(element.shadowRoot?.activeElement).toBe(button);
```

### Modal/Dialog Focus Management

**Required pattern**:
1. **On open**: Move focus to first focusable element (usually close button or first input)
2. **During interaction**: Trap focus within modal (Tab cycles through modal content only)
3. **On close**: Restore focus to trigger element
4. **Escape key**: Close modal and restore focus

**Focus trap implementation**: Use `focusTrap` directive or similar (do not implement manually).

### Focus Restoration

**When to restore**:
- Closing dialogs/modals
- Deleting items from lists (focus next/previous item)
- Collapsing expanded sections
- Completing multi-step flows

**Pattern**:
```typescript
const triggerElement = document.activeElement;
// ... open dialog
dialog.close();
(triggerElement as HTMLElement)?.focus();
```

---

## Tab Order Management

### Natural Tab Order

**Principle**: DOM order MUST match visual order.

**Implementation**:
- Use semantic HTML in logical order
- CSS Grid/Flexbox `order` property does NOT change tab order
- Verify tab order matches reading order in all layouts

### Tabindex Usage

| Value | Meaning | Use Case |
|-------|---------|----------|
| `tabindex="0"` | Natural tab order | Custom interactive elements (role="button", etc.) |
| `tabindex="-1"` | Not in tab order, programmatically focusable | Headings, containers, focus targets |
| `tabindex="1+"` | Explicit order (ANTI-PATTERN) | Never use |

**Common mistake**: Using positive `tabindex` values creates unpredictable tab order.

### Removing from Tab Order

**When to remove**:
- `disabled` attribute (buttons, inputs)
- `aria-hidden="true"` elements
- Hidden elements (`display: none`, `visibility: hidden`)
- Inactive tab panels

**Pattern**:
```typescript
// ✅ Disabled removes from tab order
<button disabled>Cannot focus</button>

// ✅ Programmatic focus only
<h2 tabindex="-1" id="section-heading">Section</h2>
```

---

## Focus Visible Styles

### Required Pattern

**Use `:focus-visible` pseudo-class**:
```css
button:focus-visible {
  outline: 2px solid var(--sando-color-focus);
  outline-offset: 2px;
}
```

**Why `:focus-visible` instead of `:focus`**:
- `:focus` shows outline on mouse click (visually distracting)
- `:focus-visible` shows outline only for keyboard navigation
- Browsers automatically determine when focus should be visible

### WCAG Requirements

**1.4.11 Non-text Contrast (Level AA)**:
- Focus indicator MUST have 3:1 contrast ratio against background
- Focus indicator MUST have 3:1 contrast ratio against unfocused state

**2.4.7 Focus Visible (Level AA)**:
- Focus indicator MUST be visible for all focusable elements
- Indicator MUST be visible in all color modes (light, dark, high-contrast)

### Token Usage

**Sando focus color token**:
```css
button:focus-visible {
  outline: 2px solid var(--sando-color-action-focus);
  outline-offset: 2px;
}
```

**Verify in all themes**:
- Original flavor
- Strawberry, Ocean, Forest, Sunset flavors
- Light mode, dark mode, high-contrast mode

---

## Testing Keyboard Navigation

### Manual Testing Procedure

**Test all components**:
1. **Tab navigation**: Tab through all interactive elements, verify order matches visual layout
2. **Shift+Tab navigation**: Reverse tab through all elements
3. **Enter/Space activation**: Activate buttons, links, checkboxes with Enter/Space
4. **Escape cancellation**: Close dialogs, menus, popovers with Escape
5. **Focus visible**: Verify focus indicator visible on all elements
6. **No keyboard traps**: Verify can Tab away from all elements
7. **Disabled state**: Verify disabled elements not in tab order

**Browser testing**: Test in Chrome, Firefox, Safari, Edge (keyboard behavior can differ).

### Automated Testing

**Unit test pattern** (from `sando-button.test.ts`):
```typescript
describe('Keyboard Navigation', () => {
  it('should be focusable via Tab key', async () => {
    const button = element.shadowRoot?.querySelector('button');
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should activate on Enter key', async () => {
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true
    });
    const button = element.shadowRoot?.querySelector('button');
    button?.dispatchEvent(enterEvent);
    // Assert click handler called
  });

  it('should activate on Space key', async () => {
    const spaceEvent = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true
    });
    const button = element.shadowRoot?.querySelector('button');
    button?.dispatchEvent(spaceEvent);
    // Assert click handler called
  });

  it('should not be focusable when disabled', () => {
    element.disabled = true;
    const button = element.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
  });
});
```

**E2E test pattern** (Playwright):
```typescript
test('keyboard navigation', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.locator('button').first()).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.result')).toContainText('Clicked');
});
```

---

## Validation Checklist

### Component Creation

**Keyboard accessibility**:
- [ ] All interactive elements keyboard accessible (Enter/Space activation)
- [ ] Native HTML elements used where possible (button, a, input)
- [ ] Custom interactive elements have `tabindex="0"` and keyboard handlers
- [ ] Shadow DOM configured with `delegatesFocus: true`

**Focus management**:
- [ ] Focus visible styles defined (`:focus-visible`)
- [ ] Focus indicator has 3:1 contrast ratio (WCAG 1.4.11)
- [ ] Focus visible in all themes/modes
- [ ] Focus restoration implemented for modals/dialogs

**Tab order**:
- [ ] Tab order matches visual order
- [ ] No positive `tabindex` values used
- [ ] Disabled elements removed from tab order
- [ ] Hidden elements removed from tab order

### Testing

**Manual keyboard testing**:
- [ ] Tab through all interactive elements (order correct)
- [ ] Shift+Tab reverse navigation works
- [ ] Enter/Space activate buttons/links
- [ ] Escape closes dialogs/menus and restores focus
- [ ] No keyboard traps detected

**Automated testing**:
- [ ] Keyboard navigation unit tests written (Tab, Enter, Space, Escape)
- [ ] Focus delegation tested in Shadow DOM
- [ ] Disabled state keyboard behavior tested
- [ ] E2E keyboard navigation scenarios covered

### Focus Visible

**Visual testing**:
- [ ] Focus indicator visible on all interactive elements
- [ ] Focus indicator visible in all color modes (light, dark, high-contrast)
- [ ] Focus indicator visible in all flavors (original, strawberry, ocean, etc.)
- [ ] Focus indicator contrast ratio ≥3:1 (manual or automated testing)

**Implementation**:
- [ ] `:focus-visible` used (not `:focus`)
- [ ] No `outline: none` without replacement
- [ ] Focus token used (`var(--sando-color-action-focus)`)

### WCAG Compliance

**Level A requirements**:
- [ ] 2.1.1 Keyboard: All functionality available via keyboard
- [ ] 2.1.2 No Keyboard Trap: Can navigate away from all elements
- [ ] 2.4.3 Focus Order: Tab order is logical

**Level AA requirements**:
- [ ] 2.4.7 Focus Visible: Focus indicator visible for all focusable elements

---

## Related Guidelines

- [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md) - Overall WCAG 2.1 compliance strategy
- [SCREEN_READER_SUPPORT.md](./SCREEN_READER_SUPPORT.md) - ARIA patterns and screen reader testing
- [TESTING_STRATEGY.md](../03-development/TESTING_STRATEGY.md) - Test automation patterns

---

## External References

**WCAG Success Criteria**:
- [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [WCAG 2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html)
- [WCAG 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)
- [WCAG 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [WCAG 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

**Keyboard patterns**:
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [WAI-ARIA Keyboard Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)

**Web Components**:
- [Shadow DOM and delegatesFocus](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus)
- [Lit focus delegation](https://lit.dev/docs/components/shadow-dom/#setting-shadowroot-options)

**Testing**:
- [Vitest DOM Testing](https://vitest.dev/guide/)
- [Playwright Keyboard API](https://playwright.dev/docs/api/class-keyboard)

---

## Changelog

### 1.0.0 (2025-11-03)
- Initial guideline based on sando-button keyboard patterns
- Core rules: keyboard accessibility, focus visible, tab order, no traps, Shadow DOM
- WCAG keyboard criteria (2.1.1, 2.1.2, 2.4.3, 2.4.7, 1.4.11)
- Standard keyboard interactions table (Tab, Enter, Space, Escape, Arrows)
- Shadow DOM focus delegation pattern (delegatesFocus: true)
- Focus management for modals/dialogs
- Tab order best practices (no positive tabindex)
- Focus visible styles (:focus-visible, 3:1 contrast)
- Manual and automated testing procedures
- Validation checklist (creation, testing, visual, WCAG)
- Agent-optimized for token efficiency (499 lines)

---

**Keyboard navigation is essential for accessibility, power users, and WCAG compliance. Test every component with keyboard only.**
