---
name: component-creator
description: >-
  Creates minimal boilerplate structure for new Web Components in Sando Design System 
  following COMPONENT_ARCHITECTURE.md 7-file pattern. Generates only what developer 
  requests - no assumptions, no dead code. Ask first, then scaffold component files, 
  tests, stories based on requirements.

  <example>
  User: "Create a new Card component"
  Assistant: "I'll use the component-creator skill to scaffold the sando-card component with the 7-file pattern."
  </example>

  <example>
  User: "I need a new Accordion component with expand/collapse functionality"
  Assistant: "I'll use component-creator to scaffold sando-accordion with the specified behavior."
  </example>

  <example>
  User: "Scaffold a new input field component"
  Assistant: "Using component-creator to generate sando-input with the standard 7-file structure."
  </example>
license: MIT
metadata:
  category: development
  version: "1.0.0"
  author: "Sando Design System Team"
  tags: [web-components, lit, components, scaffolding]
---

# Component Creator Skill

Creates boilerplate for new Web Components in Sando Design System following the monolithic 7-file pattern defined in COMPONENT_ARCHITECTURE.toon.

## Core Principles

### 1. Ask First, Then Scaffold

Never assume component requirements. Always clarify:

- **Component name** (will be prefixed with `sando-`)
- **Brief description** (for JSDoc and Storybook)
- **Props/Events/Slots** if user has specific requirements
- **Variant needs** (solid, outline, ghost, etc.)

### 2. Minimal Output

Generate **only what's requested**. Each file contains TODO comments for developer to complete - no fake implementations, no dead code.

### 3. 7-File Pattern

Every component follows this structure:

```
packages/components/src/components/{name}/
├── sando-{name}.ts           # Component implementation
├── sando-{name}.types.ts     # TypeScript types
├── sando-{name}.test.ts      # Unit tests
├── sando-{name}.a11y.test.ts # Accessibility tests
├── sando-{name}.stories.ts   # Storybook documentation
├── index.ts                  # Barrel export
└── styles/                   # (Optional) Modular CSS
    ├── base.css.ts
    ├── variants.css.ts
    └── index.ts
```

## Quick Start

### Create a Component

1. **User requests**: "Create a Card component"
2. **Gather requirements**:
   - Name: `card` -> `sando-card`
   - Description: "A container for grouping content"
   - Variants needed? (elevated, outlined, filled)
   - Slots needed? (header, body, footer)
3. **Generate files** using templates

### Template Variables

Replace these placeholders in all templates:

| Variable                    | Example                            | Description                               |
| --------------------------- | ---------------------------------- | ----------------------------------------- |
| `{{COMPONENT_NAME}}`        | `card`                             | kebab-case name (without `sando-` prefix) |
| `{{COMPONENT_CLASS}}`       | `Card`                             | PascalCase class name                     |
| `{{COMPONENT_DESCRIPTION}}` | "A container for grouping content" | Brief description                         |

## File Templates

All templates are located in `assets/templates/`:

| Template                | Output File                 | Purpose                 |
| ----------------------- | --------------------------- | ----------------------- |
| `component.ts.template` | `sando-{name}.ts`           | Main Lit component      |
| `types.ts.template`     | `sando-{name}.types.ts`     | TypeScript definitions  |
| `test.ts.template`      | `sando-{name}.test.ts`      | Vitest unit tests       |
| `a11y.test.ts.template` | `sando-{name}.a11y.test.ts` | Accessibility tests     |
| `stories.ts.template`   | `sando-{name}.stories.ts`   | Storybook stories       |
| `index.ts.template`     | `index.ts`                  | Barrel export           |
| `docs.md.template`      | `{name}.md`                 | VitePress documentation |

## Workflow

### Phase 1: Gather Requirements

Ask the user:

```
Before creating the component, I need to understand:

1. **Component name**: What will this component be called?
   (Will be prefixed with `sando-`, e.g., "card" -> "sando-card")

2. **Description**: Brief description of what it does?

3. **Public API** (optional, can add later):
   - Properties/attributes?
   - Events it emits?
   - Slots for content projection?

4. **Variants** (optional):
   - Will it have visual variants (solid, outline, ghost)?
   - Will it have size variants (sm, md, lg)?
```

### Phase 2: Generate Files

1. **Read templates** from `assets/templates/`
2. **Replace variables** with user's values
3. **Write files** to `packages/components/src/components/{name}/`
4. **Update main index** at `packages/components/src/index.ts`

### Phase 3: Post-Creation Checklist

After generation, remind the user:

```
Component scaffolded! Next steps:

1. [ ] Implement component logic in sando-{name}.ts
2. [ ] Define Recipe tokens in packages/tokens/src/recipes/{name}/
3. [ ] Add props, events, slots as needed
4. [ ] Complete unit tests for all functionality
5. [ ] Complete accessibility tests
6. [ ] Add Storybook stories for all variants
7. [ ] Run `pnpm test` to verify tests pass
8. [ ] Run `pnpm storybook` to preview component
```

## File Generation Details

### Component File (sando-{name}.ts)

Uses `FlavorableMixin` for theming support. Minimal implementation with:

- `@customElement` decorator
- Basic `render()` method with default slot
- TODO comments for developer to complete

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sando-{name}')
export class Sando{Name} extends LitElement {
  // TODO: Add static styles = css`...` when ready
  // TODO: Add @property decorators for component props

  render() {
    return html`
      <!-- TODO: Implement component template -->
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-{name}': Sando{Name};
  }
}
```

### Types File (sando-{name}.types.ts)

Basic interface with TODO for developer to add props:

```typescript
export interface Sando{Name}Props {
  // TODO: Add component props with JSDoc comments
}
```

### Test File (sando-{name}.test.ts)

Basic test structure with accessibility check:

```typescript
import { fixture, expect, html } from "@open-wc/testing";
import "./sando-{name}";

describe("sando-{name}", () => {
  it("should render", async () => {
    const el = await fixture(html`<sando-{name}>Content</sando-{name}>`);
    expect(el).to.exist;
    expect(el).to.be.accessible();
  });

  // TODO: Add component-specific tests
});
```

### Index File (index.ts)

Barrel export for clean imports:

```typescript
export { Sando{Name} } from './sando-{name}';
export type * from './sando-{name}.types';
```

## Guidelines Reference

This skill follows these Sando guidelines:

| Guideline              | Path                                                               | Purpose                    |
| ---------------------- | ------------------------------------------------------------------ | -------------------------- |
| Component Architecture | `.opencode/guidelines/02-architecture/COMPONENT_ARCHITECTURE.toon` | 7-file pattern, structure  |
| Naming Conventions     | `.opencode/guidelines/03-development/NAMING_CONVENTIONS.toon`      | File/class naming          |
| Code Style             | `.opencode/guidelines/03-development/CODE_STYLE.toon`              | TypeScript standards       |
| Token Architecture     | `.opencode/guidelines/01-design-system/TOKEN_ARCHITECTURE.toon`    | Recipe token usage         |
| WCAG Compliance        | `.opencode/guidelines/04-accessibility/WCAG_COMPLIANCE.toon`       | Accessibility requirements |

## When to Use This Skill

**Use when:**

- Creating a new component from scratch
- Need consistent boilerplate structure
- Want to ensure 7-file pattern compliance

**Don't use when:**

- Modifying existing components
- Creating tokens (use token workflow instead)
- Writing documentation only (use technical-writer agent)

## Example: Creating a Card Component

**User**: "Create a Card component for grouping content"

**Response**:

1. Ask clarifying questions about variants/slots
2. Generate files:
   - `packages/components/src/components/card/sando-card.ts`
   - `packages/components/src/components/card/sando-card.types.ts`
   - `packages/components/src/components/card/sando-card.test.ts`
   - `packages/components/src/components/card/sando-card.a11y.test.ts`
   - `packages/components/src/components/card/sando-card.stories.ts`
   - `packages/components/src/components/card/index.ts`
3. Update `packages/components/src/index.ts` with export
4. Provide next steps checklist

## Anti-Patterns

| Don't                        | Do Instead                   |
| ---------------------------- | ---------------------------- |
| Generate all possible props  | Start minimal, add as needed |
| Include fake implementations | Use TODO comments            |
| Skip the types file          | Always include types.ts      |
| Forget the index.ts          | Required for clean imports   |
| Hardcode styles              | Use Recipe tokens            |
| Skip accessibility tests     | Always include a11y.test.ts  |

---

**Version:** 1.0.0  
**Author:** Sando Design System Team  
**License:** MIT
