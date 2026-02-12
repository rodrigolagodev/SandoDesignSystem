# Create Skeleton Workflow

Step-by-step process for adding skeleton loading state to an existing component.

## Prerequisites

- Component file exists (`sando-{name}.ts`)
- Component has a defined visual structure
- Agent has determined skeleton is the appropriate loading pattern

## Workflow Steps

### 1. Read Component File

Read the component's `render()` method to understand its layout structure.

```
Read: packages/components/src/components/{name}/sando-{name}.ts
```

Identify:

- What elements are rendered (text, images, buttons, etc.)
- How they're laid out (horizontal, vertical, grid)
- What CSS classes/parts are used

### 2. Identify Layout Structure

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

### 3. Compose Skeleton

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

### 4. Add to Component File

1. **Add imports** for skeleton primitives (top of file)
2. **Add `loading` property** with JSDoc
3. **Add `_renderSkeleton()` method** with `@private` tag
4. **Update `render()`** to check `this.loading`

### 5. (Optional) Add Loading Story

Create a story in `sando-{name}.stories.ts`:

```typescript
export const Loading: Story = {
  args: {
    loading: true,
  },
};
```

### 6. Verify

- [ ] Component renders skeleton when `loading="true"`
- [ ] Component renders normal content when `loading="false"`
- [ ] Skeleton matches approximate layout of real content
- [ ] All primitives imported correctly
- [ ] JSDoc comments complete

## Output Checklist

- [ ] Modified `sando-{name}.ts` with loading state
- [ ] (Optional) Added Loading story to `sando-{name}.stories.ts`
