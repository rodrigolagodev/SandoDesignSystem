# Create Skeleton Workflow

Step-by-step process for adding skeleton loading state to an existing component.

## Prerequisites

- Component file exists (`sando-{name}.ts`)
- Component has a defined visual structure

## Workflow Steps

### 1. Validate: Is Skeleton the Right Pattern?

**STOP and check before proceeding.** Per `LOADING_STATES.toon`, not all components should use skeletons.

#### Decision Flowchart

```
1. Did the user initiate this action?
   YES → Use SPINNER (not skeleton) → STOP
   NO  → Continue

2. Is this a Content or Media component?
   YES → Use SKELETON → Continue workflow
   NO  → Continue

3. Is it an Action component (Button, IconButton)?
   YES → Use SPINNER (not skeleton) → STOP

4. Is it an Input component (Input, Checkbox, Radio)?
   YES → Use VALIDATION STATES (no loading) → STOP

5. Is it a Selector component (Select, Combobox)?
   YES → Use SPINNER in dropdown → STOP
```

#### Component Categories (from LS-DM)

| Category         | Components                       | Loading Pattern          |
| ---------------- | -------------------------------- | ------------------------ |
| **Content** ✅   | Card, Table, List, Article       | **Skeleton**             |
| **Media** ✅     | Avatar, Image, Thumbnail         | **Skeleton**             |
| **Action** ❌    | Button, IconButton, Link         | Spinner                  |
| **Input** ❌     | Input, Textarea, Checkbox, Radio | None (validation states) |
| **Selector** ❌  | Select, Combobox, Autocomplete   | Spinner in dropdown      |
| **Container** ⚠️ | Modal, Dialog, Drawer            | Depends on context       |

#### Ask the User

If uncertain, ask:

> "The component `{name}` appears to be a [category]. Per LOADING_STATES.toon:
>
> - **Content/Media components** → Use skeleton (this skill)
> - **Action components** → Use spinner (already in component or use sando-spinner)
> - **Input components** → Use validation states, not loading
>
> Should I proceed with adding a skeleton loading state?"

**Only proceed if the component is Content or Media category.**

---

### 2. Read Component File

Read the component's `render()` method to understand its layout structure.

```
Read: packages/components/src/components/{name}/sando-{name}.ts
```

Identify:

- What elements are rendered (text, images, buttons, etc.)
- How they're laid out (horizontal, vertical, grid)
- What CSS classes/parts are used

### 3. Identify Layout Structure

Map each visual element to a skeleton primitive:

| Element Type       | Skeleton Primitive         |
| ------------------ | -------------------------- |
| Avatar/Profile pic | `sando-skeleton-avatar`    |
| Single line text   | `sando-skeleton-text`      |
| Paragraph          | `sando-skeleton-paragraph` |
| Image              | `sando-skeleton-image`     |
| Button             | `sando-skeleton-button`    |
| Horizontal group   | `sando-skeleton-row`       |
| Vertical group     | `sando-skeleton-stack`     |

### 4. Compose Skeleton

Build the `_renderSkeleton()` method using primitives:

```typescript
private _renderSkeleton() {
  return html`
    <div class="component-class" part="skeleton">
      <!-- Compose primitives matching original layout -->
    </div>
  `;
}
```

### 5. Add to Component File

1. **Add imports** for skeleton primitives (top of file)
2. **Add `loading` property** with JSDoc
3. **Add `_renderSkeleton()` method** with `@private` tag
4. **Update `render()`** to check `this.loading`

### 6. (Optional) Add Loading Story

Create a story in `sando-{name}.stories.ts`:

```typescript
export const Loading: Story = {
  args: {
    loading: true,
  },
};
```

### 7. Verify

- [ ] Component renders skeleton when `loading="true"`
- [ ] Component renders normal content when `loading="false"`
- [ ] Skeleton matches approximate layout of real content
- [ ] All primitives imported correctly
- [ ] JSDoc comments complete

## Output Checklist

- [ ] Modified `sando-{name}.ts` with loading state
- [ ] (Optional) Added Loading story to `sando-{name}.stories.ts`
