---
name: component-creator
description: Creates minimal boilerplate structure for new Web Components in Sando Design System. Generates only what the developer needs - no default variants, sizes, or styles. Asks first, then generates component files, tests, stories, and VitePress documentation based on requirements. Use when user says "create a new component" or "I need a Card component".
---

# Component Creator Skill

This skill generates **minimal boilerplate structure** for new Web Components following Sando's monolithic architecture. It creates **only what the developer needs** - no assumptions, no dead code to delete.

## When to Use This Skill

Use when the user requests:
- "Create a new component"
- "I need a Card component"
- "Crea componente modal para comenzar a desarrollarlo"
- Any request to scaffold a new UI component

## What This Skill Creates

**8 minimal files** with only requested features:

```
packages/components/src/components/{name}/
├── sando-{name}.ts              # Minimal Lit component
├── sando-{name}.types.ts        # Only requested types
├── sando-{name}.test.ts         # Basic tests structure
├── sando-{name}.a11y.test.ts    # Basic a11y tests
├── sando-{name}.stories.ts      # Minimal stories
└── index.ts                     # Barrel export

apps/site/components/
└── {name}.md                    # Documentation placeholder

packages/components/src/index.ts # Updated with export
```

## Step 1: Ask What the Developer Needs

Use AskUserQuestion tool to gather requirements. **DO NOT assume anything.**

**Questions to ask:**

1. **Component name** (required)
   - Example: "card", "modal", "input"

2. **Does this component need variants?**
   - If YES: "What variants?" (e.g., "solid, outline, ghost")
   - If NO: Don't add variant property

3. **Does this component need sizes?**
   - If YES: "What sizes?" (e.g., "small, medium, large")
   - If NO: Don't add size property

4. **What props does this component need?**
   - Examples: "open, onClose" for Modal, "disabled, loading" for Button
   - If none: Only include basic structure

5. **What events should this component emit?**
   - Examples: "modal-open, modal-close" for Modal
   - If none: Don't add event handling

6. **What slots does this component need?**
   - Examples: "header, content, footer" for Modal
   - If only default: Only include default slot

7. **Brief description** (1-2 sentences)
   - Example: "A modal dialog component for displaying content in an overlay"

**Important:** Only generate code for what was explicitly requested.

## Step 2: Validate Component Name

- Name must be lowercase, alphanumeric, may contain hyphens
- Component class: `Sando{PascalCase}` (e.g., `SandoCard`)
- HTML tag: `sando-{name}` (e.g., `sando-card`)

## Step 3: Generate Files Based on Requirements

Generate **only the code requested**. Use conditional logic:

### File 1: `sando-{name}.types.ts`

Generate TypeScript types **only for what was requested**:

```typescript
/**
 * Type definitions for sando-{name} component
 */

// Only include if variants were requested
{{#if HAS_VARIANTS}}
export type {{COMPONENT_CLASS}}Variant = {{VARIANTS}};
{{/if}}

// Only include if sizes were requested
{{#if HAS_SIZES}}
export type {{COMPONENT_CLASS}}Size = {{SIZES}};
{{/if}}

// Always include props interface, but only with requested props
export interface Sando{{COMPONENT_CLASS}}Props {
  {{#if HAS_VARIANTS}}
  variant?: {{COMPONENT_CLASS}}Variant;
  {{/if}}

  {{#if HAS_SIZES}}
  size?: {{COMPONENT_CLASS}}Size;
  {{/if}}

  {{#each PROPS}}
  {{this.name}}?: {{this.type}};
  {{/each}}
}

// Only include if events were requested
{{#if HAS_EVENTS}}
export interface {{COMPONENT_CLASS}}EventDetail {
  // TODO: Define event payload
}

export type {{COMPONENT_CLASS}}Event = CustomEvent<{{COMPONENT_CLASS}}EventDetail>;
{{/if}}
```

### File 2: `sando-{name}.ts`

Generate minimal Lit component **without styles**:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Sando{{COMPONENT_CLASS}}Props } from './sando-{{COMPONENT_NAME}}.types';

/**
 * @tag sando-{{COMPONENT_NAME}}
 * @summary {{COMPONENT_DESCRIPTION}}
 *
 * @slot - Default slot content
 * {{#each SLOTS}}
 * @slot {{this}} - {{this}} content
 * {{/each}}
 */
@customElement('sando-{{COMPONENT_NAME}}')
export class Sando{{COMPONENT_CLASS}} extends LitElement implements Sando{{COMPONENT_CLASS}}Props {
  // TODO: Add styles here when ready
  // static styles = css``;

  {{#if HAS_VARIANTS}}
  @property({ type: String, reflect: true })
  variant: {{COMPONENT_CLASS}}Variant = {{DEFAULT_VARIANT}};
  {{/if}}

  {{#if HAS_SIZES}}
  @property({ type: String, reflect: true })
  size: {{COMPONENT_CLASS}}Size = {{DEFAULT_SIZE}};
  {{/if}}

  {{#each PROPS}}
  @property({ type: {{this.propertyType}}, reflect: {{this.reflect}} })
  {{this.name}}{{#if this.optional}}?{{/if}}: {{this.type}}{{#if this.defaultValue}} = {{this.defaultValue}}{{/if}};
  {{/each}}

  render() {
    return html`
      <!-- TODO: Implement component template -->
      <slot></slot>
      {{#each SLOTS}}
      <slot name="{{this}}"></slot>
      {{/each}}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-{{COMPONENT_NAME}}': Sando{{COMPONENT_CLASS}};
  }
}
```

**Key points:**
- No `static styles` - Developer adds when ready
- Only requested @property decorators
- Minimal render() with requested slots
- No event handlers unless requested

### File 3: `sando-{name}.test.ts`

Minimal test structure:

```typescript
import { fixture, expect, html } from '@open-wc/testing';
import './sando-{{COMPONENT_NAME}}';
import type { Sando{{COMPONENT_CLASS}} } from './sando-{{COMPONENT_NAME}}';

describe('sando-{{COMPONENT_NAME}}', () => {
  it('should render', async () => {
    const el = await fixture<Sando{{COMPONENT_CLASS}}>(html`
      <sando-{{COMPONENT_NAME}}>Content</sando-{{COMPONENT_NAME}}>
    `);

    expect(el).to.exist;
    expect(el).to.be.accessible();
  });

  {{#if HAS_VARIANTS}}
  it('should have variant property', async () => {
    const el = await fixture<Sando{{COMPONENT_CLASS}}>(html`
      <sando-{{COMPONENT_NAME}} variant="{{FIRST_VARIANT}}">Content</sando-{{COMPONENT_NAME}}>
    `);
    expect(el.variant).to.equal('{{FIRST_VARIANT}}');
  });
  {{/if}}

  {{#if HAS_SIZES}}
  it('should have size property', async () => {
    const el = await fixture<Sando{{COMPONENT_CLASS}}>(html`
      <sando-{{COMPONENT_NAME}} size="{{FIRST_SIZE}}">Content</sando-{{COMPONENT_NAME}}>
    `);
    expect(el.size).to.equal('{{FIRST_SIZE}}');
  });
  {{/if}}

  // TODO: Add component-specific tests
});
```

### File 4: `sando-{name}.a11y.test.ts`

Minimal accessibility test:

```typescript
import { fixture, expect, html } from '@open-wc/testing';
import './sando-{{COMPONENT_NAME}}';
import type { Sando{{COMPONENT_CLASS}} } from './sando-{{COMPONENT_NAME}}';

describe('sando-{{COMPONENT_NAME}} Accessibility', () => {
  it('should be accessible', async () => {
    const el = await fixture<Sando{{COMPONENT_CLASS}}>(html`
      <sando-{{COMPONENT_NAME}}>Accessible content</sando-{{COMPONENT_NAME}}>
    `);

    await expect(el).to.be.accessible();
  });

  // TODO: Add specific accessibility tests for component behavior
});
```

### File 5: `sando-{name}.stories.ts`

Minimal Storybook story:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-{{COMPONENT_NAME}}';
import type { Sando{{COMPONENT_CLASS}} } from './sando-{{COMPONENT_NAME}}';

const meta: Meta<Sando{{COMPONENT_CLASS}}> = {
  title: 'Components/{{COMPONENT_CLASS}}',
  component: 'sando-{{COMPONENT_NAME}}',
  tags: ['autodocs'],
  argTypes: {
    {{#if HAS_VARIANTS}}
    variant: {
      control: 'select',
      options: [{{VARIANT_LIST}}],
    },
    {{/if}}
    {{#if HAS_SIZES}}
    size: {
      control: 'select',
      options: [{{SIZE_LIST}}],
    },
    {{/if}}
  },
};

export default meta;
type Story = StoryObj<Sando{{COMPONENT_CLASS}}>;

export const Default: Story = {
  render: () => html`
    <sando-{{COMPONENT_NAME}}>
      {{COMPONENT_CLASS}} Content
    </sando-{{COMPONENT_NAME}}>
  `,
};

// TODO: Add more stories for different states
```

### File 6: `index.ts`

```typescript
export { Sando{{COMPONENT_CLASS}} } from './sando-{{COMPONENT_NAME}}';
export type * from './sando-{{COMPONENT_NAME}}.types';
```

### File 7: `{name}.md` (VitePress Documentation)

Minimal documentation placeholder:

```markdown
# {{COMPONENT_CLASS}} Component

{{COMPONENT_DESCRIPTION}}

## Installation

\`\`\`bash
npm install @sando/components
\`\`\`

## Basic Usage

\`\`\`html
<sando-{{COMPONENT_NAME}}>
  Content
</sando-{{COMPONENT_NAME}}>
\`\`\`

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
{{#if HAS_VARIANTS}}
| `variant` | {{VARIANT_TYPE}} | {{DEFAULT_VARIANT}} | TODO: Describe variants |
{{/if}}
{{#if HAS_SIZES}}
| `size` | {{SIZE_TYPE}} | {{DEFAULT_SIZE}} | TODO: Describe sizes |
{{/if}}
{{#each PROPS}}
| `{{this.name}}` | `{{this.type}}` | `{{this.defaultValue}}` | TODO: Describe prop |
{{/each}}

### Events

{{#if HAS_EVENTS}}
| Event | Description |
|-------|-------------|
{{#each EVENTS}}
| `{{this}}` | TODO: Describe when this event fires |
{{/each}}
{{else}}
No custom events.
{{/if}}

### Slots

| Slot | Description |
|------|-------------|
| Default | TODO: Describe default slot |
{{#each SLOTS}}
| `{{this}}` | TODO: Describe {{this}} slot |
{{/each}}

## TODO: Complete Documentation

- [ ] Add usage examples for all variants
- [ ] Document all props with examples
- [ ] Add accessibility notes
- [ ] Add framework integration examples
- [ ] Document CSS custom properties (after tokens created)
- [ ] Add best practices section

## Related

- [Component Overview](/components/overview)
- [Button Component](/components/button) (reference example)
```

## Step 4: Update Package Exports

Add to `packages/components/src/index.ts`:

```typescript
export * from './components/{{COMPONENT_NAME}}';
```

## Step 5: Inform Developer

```
✅ Component scaffolding created!

📁 Location: packages/components/src/components/{{COMPONENT_NAME}}/

📄 Files Created:
  ✅ sando-{{COMPONENT_NAME}}.ts (minimal Lit structure)
  ✅ sando-{{COMPONENT_NAME}}.types.ts (only requested types)
  ✅ sando-{{COMPONENT_NAME}}.test.ts (basic tests)
  ✅ sando-{{COMPONENT_NAME}}.a11y.test.ts (accessibility tests)
  ✅ sando-{{COMPONENT_NAME}}.stories.ts (Storybook)
  ✅ index.ts (barrel export)

📝 Documentation:
  ✅ apps/site/components/{{COMPONENT_NAME}}.md (placeholder)

✅ Package exports updated

🎯 What was generated:
{{#if HAS_VARIANTS}}  ✅ Variants: {{VARIANT_LIST}}{{/if}}
{{#if HAS_SIZES}}  ✅ Sizes: {{SIZE_LIST}}{{/if}}
{{#if HAS_PROPS}}  ✅ Props: {{PROP_LIST}}{{/if}}
{{#if HAS_EVENTS}}  ✅ Events: {{EVENT_LIST}}{{/if}}
{{#if HAS_SLOTS}}  ✅ Slots: {{SLOT_LIST}}{{/if}}

⚠️  Next Steps:

1. **Add Styles** (when ready)
   - Edit: sando-{{COMPONENT_NAME}}.ts
   - Add `static styles = css\`...\``
   - Use Recipe tokens: var(--sando-{{COMPONENT_NAME}}-*)

2. **Create Recipe Tokens**
   - Create: packages/tokens/src/recipes/{{COMPONENT_NAME}}.json
   - Reference ONLY Flavors: {color.*, {space.*}, etc.
   - Rebuild: `pnpm tokens:build`

3. **Implement Logic**
   - Add component behavior
   - Add event handlers (if needed)
   - Add state management (if needed)

4. **Complete Tests**
   - Add component-specific test cases
   - Test all props, events, slots
   - Ensure >85% coverage

5. **Complete Documentation**
   - Fill API tables in {{COMPONENT_NAME}}.md
   - Add usage examples
   - Document accessibility features

6. **Preview**
   - Tests: `pnpm --filter @sando/components test`
   - Storybook: `pnpm docs:dev` (localhost:6006)
   - Docs: `pnpm site:dev` (localhost:3000)

📚 Reference: packages/components/src/components/button/
```

## Important Rules

**DO:**
- ✅ Ask first, generate only what was requested
- ✅ Keep templates minimal - no assumptions
- ✅ Use TODO comments for developer to fill
- ✅ Follow Sando naming: `sando-{name}`, `Sando{Class}`
- ✅ Create documentation placeholder

**DO NOT:**
- ❌ Add default variants/sizes not requested
- ❌ Add CSS styles by default
- ❌ Add props/events not requested
- ❌ Generate code developer will delete
- ❌ Assume component behavior

## Conditional Generation Logic

Use this logic when generating files:

```javascript
const componentData = {
  hasVariants: variants && variants.length > 0,
  hasSizes: sizes && sizes.length > 0,
  hasProps: props && props.length > 0,
  hasEvents: events && events.length > 0,
  hasSlots: slots && slots.length > 1, // More than default

  // Only include sections if requested
  includeVariantProperty: hasVariants,
  includeSizeProperty: hasSizes,
  includeEventHandlers: hasEvents,
  includeNamedSlots: hasSlots,
};
```

## Example: Minimal Modal

**User:** "Crea componente modal para comenzar a desarrollarlo"

**Questions:**
1. Component name? → "modal"
2. Variants? → "No"
3. Sizes? → "No"
4. Props? → "open, onClose"
5. Events? → "modal-open, modal-close"
6. Slots? → "header, content, footer"
7. Description? → "Modal dialog component"

**Generated code will ONLY have:**
- Props: open, onClose (no variant, no size)
- Events: modal-open, modal-close
- Slots: header, content, footer
- No CSS styles
- Basic tests for requested features

**Time Saved:** 2-3 hours → 5 minutes (95%)
