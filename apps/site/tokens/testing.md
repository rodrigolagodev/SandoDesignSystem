---
title: Token Testing
description: Comprehensive test suite ensuring token quality, reference integrity, accessibility compliance, and build output correctness
---

# Token Testing

Comprehensive test suite ensuring token quality and integrity. Just like a chef tastes every component of a dish before serving, Sando validates every token before it reaches your project.

## Philosophy

**Tests replace validators.** All validation logic is implemented as tests, providing better error messages, watch mode, coverage tracking, and IDE integration. No separate validation step — if the tests pass, the tokens are sound.

## Test Layers

### 1. Structure Validation

Ensures tokens follow DTCG format:

```bash
pnpm test:structure
```

✅ JSON validity
✅ Required properties (`value`, `type`)
✅ Valid DTCG types
✅ File organization

### 2. Reference Integrity

Validates the three-layer architecture — Ingredients, Flavors, and Recipes must respect the reference chain:

```bash
pnpm test:references
```

✅ Ingredients → No references (primitives only)
✅ Flavors → Reference Ingredients only
✅ Recipes → Reference Flavors only
✅ No circular references
✅ No broken references

### 3. Value Correctness

Validates token values match their expected formats:

```bash
pnpm test:values
```

✅ Color format (OKLCH)
✅ Dimensions (rem, px, em, %)
✅ Font weights (100-900)
✅ Durations (ms, s)
✅ Opacity (0-1)
✅ Z-index hierarchy

### 4. Accessibility

WCAG compliance — making sure every color combination is accessible out of the box:

```bash
pnpm test:accessibility
```

✅ Text contrast 4.5:1
✅ Large text 3:1
✅ UI components 3:1
✅ Brand colors accessible

### 5. Build Output

Validates CSS generation — the final plating of your tokens:

```bash
pnpm test:build
```

✅ Files generated
✅ CSS variables correct
✅ Selectors valid (`:root`, `[flavor]`)
✅ Reference resolution

## Running Tests

```bash
# All tests
pnpm test

# Watch mode (recommended during development)
pnpm test:watch

# Coverage report
pnpm test:coverage
```

## Test Statistics

**2,210 total tests**
✅ 2,206 passing (99.8%)
⚠️ 4 failing (accessibility issues in tokens, not tests)

## Test-Driven Token Development

### Workflow

1. **Write test first**:

```js
it("should have button-background-color", () => {
  expect(recipes.button.backgroundColor).toBeDefined();
});
```

2. **Run test** (fails): `pnpm test:watch`

3. **Implement token**:

```json
{
  "button": {
    "backgroundColor": {
      "value": "{color.action.solid.background.default.value}",
      "type": "color"
    }
  }
}
```

4. **Test passes** ✅

5. **Build & verify**: `pnpm build && pnpm test:build`

## Adding New Token Types

When adding a new token type:

1. **Define in JSON**: Add to appropriate layer
2. **Add DTCG type** (if new): Update `VALID_DTCG_TYPES`
3. **Add value validation tests**: Test format/range
4. **Add build transforms** (if needed): Custom transformers
5. **Add output tests**: Verify CSS generation

See the [token testing guide on GitHub](https://github.com/rodrigolagodev/SandoDesignSystem/blob/master/packages/tokens/TESTING.md) for the detailed walkthrough.

## Coverage Goals

| Category      | Target | Status |
| ------------- | ------ | ------ |
| Structure     | 100%   | ✅     |
| References    | 100%   | ✅     |
| Values        | 95%    | ✅     |
| Accessibility | 100%   | ✅     |
| Build         | 90%    | ✅     |

## Next Steps

- **[Token Architecture](/tokens/architecture)** — Understand the three-layer system
- **[Ingredients](/tokens/ingredients)** — Explore the primitive values
- **[Flavors](/tokens/flavors)** — Learn about theming
- **[Contributing](/guides/contributing)** — Add new tokens
