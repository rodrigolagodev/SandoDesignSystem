---
name: skeleton-creator
description: >-
  Adds skeleton loading states to components by composing sando-skeleton primitives.
  Creates _renderSkeleton() method that mirrors the component's visual structure.
  Assumes the calling agent has already determined skeleton is the appropriate loading pattern.

  <example>
  User: "Add skeleton loading state to Card component"
  Assistant: "I'll analyze the Card's layout and create _renderSkeleton() using skeleton primitives."
  </example>

  <example>
  User: "Add skeleton to the Profile component"
  Assistant: "I'll compose avatar and text skeleton primitives to match the Profile layout."
  </example>
license: MIT
metadata:
  category: development
  version: "2.0.0"
---

# Skeleton Creator Skill

Adds skeleton loading states to components by composing `sando-skeleton-*` primitives. The skeleton is an internal render method within the component file, NOT a separate file.

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

Read the component's `render()` method and identify visual elements:

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

**Version:** 2.0.0  
**License:** MIT
