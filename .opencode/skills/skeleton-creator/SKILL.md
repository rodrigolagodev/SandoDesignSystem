---
name: skeleton-creator
description: >-
  Adds skeleton loading states to Content/Media components by composing sando-skeleton primitives.
  IMPORTANT: First validates if the component is appropriate for skeleton (vs spinner).
  Modifies component file to add loading prop and _renderSkeleton() method.

  <example>
  User: "Add skeleton loading state to Card component"
  Assistant: "Card is a Content component, so skeleton is appropriate. I'll add _renderSkeleton() to sando-card.ts."
  </example>

  <example>
  User: "Add skeleton to Button component"
  Assistant: "Button is an Action component. Per LOADING_STATES.toon, it should use Spinner, not Skeleton. Button already has a loading prop that shows a spinner."
  </example>

  <example>
  User: "Add loading state to the Profile component"
  Assistant: "Profile is a Content component. I'll add skeleton state composing avatar and text primitives."
  </example>
license: MIT
metadata:
  category: development
  version: "1.1.0"
---

# Skeleton Creator Skill

Adds skeleton loading states to **Content and Media** components by composing `sando-skeleton-*` primitives. The skeleton is an internal render method within the component file, NOT a separate file.

## ⚠️ First: Validate Component Type

**Not all components should use skeletons.** Per `.opencode/guidelines/01-design-system/LOADING_STATES.toon` (LS-CR-R1):

| Category     | Components                 | Loading Pattern     | This Skill? |
| ------------ | -------------------------- | ------------------- | ----------- |
| **Content**  | Card, Table, List, Article | Skeleton            | ✅ YES      |
| **Media**    | Avatar, Image, Thumbnail   | Skeleton            | ✅ YES      |
| **Action**   | Button, IconButton, Link   | Spinner             | ❌ NO       |
| **Input**    | Input, Textarea, Checkbox  | None (validation)   | ❌ NO       |
| **Selector** | Select, Combobox           | Spinner in dropdown | ❌ NO       |

### Decision Flowchart

```
User asks for skeleton on component X:

1. Is X an Action component (Button, IconButton)?
   → NO skeleton. Use spinner. Button already has `loading` prop.

2. Is X an Input component (Input, Checkbox, Radio)?
   → NO loading state. Use validation states instead.

3. Is X a Selector component (Select, Combobox)?
   → NO skeleton. Use spinner in dropdown (already implemented).

4. Is X a Content/Media component?
   → ✅ YES, proceed with skeleton.
```

### If Component is NOT Appropriate

Respond to user:

> "The component `{name}` is a [Action/Input/Selector] component. Per LOADING_STATES.toon, it should use [Spinner/validation states], not Skeleton. [Component already has loading prop / This component doesn't need loading state]."

---

## What It Does

This skill modifies **one file** (the component) to add:

1. A `loading` boolean property
2. A private `_renderSkeleton()` method
3. Logic in `render()` to return skeleton when loading

## The Pattern

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
// 1. Import skeleton primitives you need
import "../skeleton/sando-skeleton.js";
import "../skeleton-text/sando-skeleton-text.js";
import "../skeleton-avatar/sando-skeleton-avatar.js";

@customElement("sando-example")
export class SandoExample extends LitElement {
  // 2. Add loading property
  /**
   * Shows skeleton loading state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  // 3. Add private _renderSkeleton() method
  /**
   * Internal: Renders skeleton loading state
   * @private
   */
  private _renderSkeleton() {
    return html`
      <div class="example" part="skeleton">
        <sando-skeleton-avatar size="md"></sando-skeleton-avatar>
        <sando-skeleton-text width="80%"></sando-skeleton-text>
        <sando-skeleton-text width="60%"></sando-skeleton-text>
      </div>
    `;
  }

  // 4. Modify render() to check loading
  render() {
    if (this.loading) {
      return this._renderSkeleton();
    }

    return html`
      <div class="example">
        <!-- Normal component content -->
      </div>
    `;
  }
}
```

## Available Primitives

| Primitive                   | Use For                           | Key Props                     |
| --------------------------- | --------------------------------- | ----------------------------- |
| `sando-skeleton`            | Base shape (text, rect, circular) | `shape`, `width`, `height`    |
| `sando-skeleton-text`       | Text lines                        | `width`, `lines`              |
| `sando-skeleton-avatar`     | Profile images                    | `size` (sm, md, lg, xl)       |
| `sando-skeleton-paragraph`  | Multiple text lines               | `lines`, `gap`                |
| `sando-skeleton-button`     | Button placeholders               | `size`, `width`               |
| `sando-skeleton-image`      | Image placeholders                | `ratio` (1/1, 4/3, 16/9)      |
| `sando-skeleton-row`        | Horizontal layouts                | `gap`, `align`                |
| `sando-skeleton-stack`      | Vertical layouts                  | `gap`                         |
| `sando-skeleton-card`       | Card containers                   | `show-image`, `show-actions`  |
| `sando-skeleton-list-item`  | List items with avatar            | `lines`, `avatar-size`        |
| `sando-skeleton-profile`    | User profiles                     | `avatar-size`, `bio-lines`    |
| `sando-skeleton-media-card` | Media cards                       | `image-ratio`, `show-actions` |
| `sando-skeleton-table-row`  | Table rows                        | `columns`                     |
| `sando-skeleton-article`    | Article layouts                   | `show-image`, `lines`         |
| `sando-skeleton-comment`    | Comment layouts                   | `lines`, `nested`             |
| `sando-skeleton-composer`   | Sync animations                   | `sync`, `stagger`             |

## How to Use

### Step 1: Analyze Component Layout

Identify the visual elements in the component:

- Text content -> `sando-skeleton-text` or `sando-skeleton-paragraph`
- Avatar/image -> `sando-skeleton-avatar` or `sando-skeleton-image`
- Buttons -> `sando-skeleton-button`
- Layout -> `sando-skeleton-row` (horizontal) or `sando-skeleton-stack` (vertical)

### Step 2: Map Elements to Primitives

| Component Element | Skeleton Primitive         |
| ----------------- | -------------------------- |
| Avatar            | `sando-skeleton-avatar`    |
| Single text line  | `sando-skeleton-text`      |
| Multiple lines    | `sando-skeleton-paragraph` |
| Image             | `sando-skeleton-image`     |
| Button            | `sando-skeleton-button`    |
| Horizontal group  | `sando-skeleton-row`       |
| Vertical group    | `sando-skeleton-stack`     |

### Step 3: Add Code to Component

1. Import needed skeleton primitives
2. Add `loading` property with JSDoc
3. Add `_renderSkeleton()` private method
4. Update `render()` to check loading state

### Step 4: (Optional) Add Loading Story

Add a Storybook story to showcase the loading state:

```typescript
export const Loading: Story = {
  args: {
    loading: true,
  },
};
```

## Example: Before and After

### Before (sando-user-card.ts)

```typescript
render() {
  return html`
    <div class="user-card">
      <img class="avatar" src=${this.avatarUrl} />
      <span class="name">${this.name}</span>
      <span class="role">${this.role}</span>
    </div>
  `;
}
```

### After (sando-user-card.ts)

```typescript
import '../skeleton-avatar/sando-skeleton-avatar.js';
import '../skeleton-text/sando-skeleton-text.js';
import '../skeleton-stack/sando-skeleton-stack.js';
import '../skeleton-row/sando-skeleton-row.js';

// ...

/**
 * Shows skeleton loading state
 * @default false
 */
@property({ type: Boolean, reflect: true })
loading = false;

/**
 * Internal: Renders skeleton loading state
 * @private
 */
private _renderSkeleton() {
  return html`
    <div class="user-card" part="skeleton">
      <sando-skeleton-row gap="md" align="center">
        <sando-skeleton-avatar size="md"></sando-skeleton-avatar>
        <sando-skeleton-stack gap="xs">
          <sando-skeleton-text width="120px"></sando-skeleton-text>
          <sando-skeleton-text width="80px"></sando-skeleton-text>
        </sando-skeleton-stack>
      </sando-skeleton-row>
    </div>
  `;
}

render() {
  if (this.loading) {
    return this._renderSkeleton();
  }

  return html`
    <div class="user-card">
      <img class="avatar" src=${this.avatarUrl} />
      <span class="name">${this.name}</span>
      <span class="role">${this.role}</span>
    </div>
  `;
}
```

## What NOT to Do

| Don't                                | Do Instead                           |
| ------------------------------------ | ------------------------------------ |
| Create separate skeleton files       | Add `_renderSkeleton()` to component |
| Add timing/delay controllers         | Let consumer control loading state   |
| Over-engineer with complex logic     | Keep skeleton simple and static      |
| Forget `@private` JSDoc tag          | Always document private methods      |
| Skip the `part="skeleton"` attribute | Add it for styling hooks             |
| Import all skeleton primitives       | Import only what you need            |

## Guidelines Reference

| Guideline              | Path                                                               | Purpose                   |
| ---------------------- | ------------------------------------------------------------------ | ------------------------- |
| Component Architecture | `.opencode/guidelines/02-architecture/COMPONENT_ARCHITECTURE.toon` | Component structure       |
| Inline Code Docs       | `.opencode/guidelines/06-documentation/INLINE_CODE_DOCS.toon`      | JSDoc patterns            |
| WCAG Compliance        | `.opencode/guidelines/04-accessibility/WCAG_COMPLIANCE.toon`       | Accessibility (aria-busy) |

---

**Version:** 1.0.0  
**License:** MIT
