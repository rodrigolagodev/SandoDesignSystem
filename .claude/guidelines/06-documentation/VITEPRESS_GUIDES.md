# VitePress Guide Documentation

**Category**: 06-documentation
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: Technical Writer

---

## Purpose

Establish comprehensive standards for writing long-form tutorial and guide documentation in VitePress for the Sando Design System. This includes frontmatter configuration, markdown features, code examples, navigation structure, and content organization to ensure guides are clear, accessible, and maintainable.

**Target**: Getting Started guides, conceptual tutorials, integration guides, accessibility guides
**Scope**: Markdown structure, frontmatter, code blocks, containers, navigation
**Enforcement**: Documentation review, VitePress build validation

---

## Core Rules

### Rule 1: Frontmatter with Title and Description (Required for SEO)

Every guide page SHOULD include frontmatter with title and description for SEO and social sharing, though VitePress can generate these from content if omitted.

**Pattern**:

```markdown
---
title: Page Title for SEO and Browser Tabs
description: Brief one-sentence description for search engines and social media previews
---

# Main Heading (h1)

First paragraph starts immediately after heading...
```

**Real example from quick-start.md**:

```markdown
---
title: Quick Start Guide
description: Get started with Sando Design System in your project with this step-by-step tutorial
---

# Quick Start

Get started with Sando design tokens in your project.
```

**Why**: Frontmatter title/description improve SEO, control browser tab text, and customize social media preview cards. VitePress uses h1 as fallback if omitted.

**Note**: Frontmatter is OPTIONAL. VitePress will extract title from first h1 and description from first paragraph if frontmatter is missing. Use frontmatter when you need explicit control over SEO metadata.

**Reference**: VitePress frontmatter docs, quick-start.md

---

### Rule 2: Progressive Step-by-Step Structure (Required for Tutorials)

Tutorial guides MUST use numbered headings (h2) for sequential steps, creating clear progression from start to finish.

**Pattern**:

````markdown
# Tutorial Title

Brief introduction explaining what the user will learn.

## Step 1: First Action

Instructions for the first step...

```code
Example code for step 1
```
````

## Step 2: Second Action

Instructions for the second step...

## Step 3: Third Action

Instructions for the third step...

## Next Steps

Where to go after completing the tutorial.

````

**Real example from quick-start.md**:
```markdown
# Quick Start

Get started with Sando design tokens in your project.

## Step 1: Create a New Project

::: code-group

```bash [Vite]
pnpm create vite my-app --template vanilla-ts
cd my-app
````

```bash [Next.js]
pnpm create next-app my-app
cd my-app
```

:::

## Step 2: Install Sando

```bash
pnpm add @sando/components @sando/tokens
```

## Step 3: Import Styles and Components

```ts
// main.ts or App.tsx
import "@sando/tokens/css";
import "@sando/components/button";
```

## Next Steps

Now that you've built your first component, explore:

- **[Theming Guide](/getting-started/theming)** - Learn how to customize
- **[Token Architecture](/tokens/architecture)** - Understand the system

````

**Why**: Numbered steps provide clear progression. Users can follow along sequentially without getting lost. Next Steps section prevents dead ends.

**Reference**: quick-start.md (lines 9-213)

---

### Rule 3: VitePress Containers for Contextual Information (Required)

Use VitePress custom containers (tip, warning, danger, details) to highlight important information without disrupting reading flow.

**Pattern**:
```markdown
::: tip Optional Title
Helpful information that enhances understanding but isn't critical.
:::

::: warning Important Notice
Cautionary information the user should be aware of.
:::

::: danger Critical Warning
Information about potential breaking changes or serious issues.
:::

::: details Click to Expand
Collapsible content for additional details that some users may want.
:::
````

**Container types**:

- **tip**: Helpful hints, best practices, pro tips
- **warning**: Important notices, deprecation warnings, prerequisites
- **danger**: Breaking changes, critical security issues, destructive actions
- **details**: Collapsible extra information, advanced topics, troubleshooting

**Real examples from quick-start.md**:

```markdown
::: warning Components Coming Soon
This guide focuses on using Sando's token system. Component examples are provided for future reference but are not yet implemented.
:::

::: warning Coming Soon
Interactive component demos will be available once the component library is published.
:::
```

**Real example from accessibility.md**:

```markdown
::: tip Touch Target Compliance
All button sizes meet WCAG 2.1 Level AA minimum touch target size of 44x44px through padding adjustments.
:::
```

**Why**: Containers visually differentiate contextual information from main content. Icons and colors draw attention without requiring bold text or excessive formatting.

**Reference**: VitePress container docs, quick-start.md (lines 5-7, 113-115), button.md (line 77-79)

---

### Rule 4: Code Groups for Multi-Framework Examples (Required)

Use VitePress code groups (`::: code-group`) when showing the same example in multiple languages, frameworks, or tools.

**Pattern**:

````markdown
::: code-group

```language [Tab Label 1]
code for option 1
```
````

```language [Tab Label 2]
code for option 2
```

```language [Tab Label 3]
code for option 3
```

:::

````

**Real examples from quick-start.md**:
```markdown
::: code-group

```bash [Vite]
pnpm create vite my-app --template vanilla-ts
cd my-app
````

```bash [Next.js]
pnpm create next-app my-app
cd my-app
```

:::

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Sando App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/main.ts"></script>
  </body>
</html>
```

```ts [main.ts]
import "@sando/tokens/css";
import "@sando/components/button";

const app = document.querySelector("#app")!;
app.innerHTML = `
  <sando-button variant="solid">Hello!</sando-button>
`;
```

:::

````

**When to use code groups**:
- Multiple framework implementations (React, Vue, Angular)
- Multiple build tool setups (Vite, Webpack, Rollup)
- Alternative approaches to same task
- Related files in a project (HTML + TS, CSS + JS)

**Why**: Code groups let users choose their preferred framework/tool without scrolling through irrelevant examples. Tabs save space and improve scannability.

**Reference**: VitePress code groups docs, quick-start.md (lines 11-23, 52-109)

---

### Rule 5: Inline Code and Syntax Highlighting (Required)

Use proper syntax highlighting for all code blocks and inline code formatting for technical terms.

**Inline code pattern**:
```markdown
The `sando-button` component accepts a `variant` property that can be `'solid'`, `'outline'`, or `'ghost'`.

Install with `pnpm add @sando/components` to get started.
````

**Code block pattern**:

````markdown
```language
code here
```
````

````

**Supported languages**:
- `html` - HTML markup
- `css` - CSS styles
- `typescript` / `ts` - TypeScript code
- `javascript` / `js` - JavaScript code
- `tsx` - React/TypeScript JSX
- `jsx` - React/JavaScript JSX
- `vue` - Vue single-file components
- `bash` / `sh` - Shell commands
- `json` - JSON data
- `yaml` - YAML configuration

**Real examples from quick-start.md**:
```markdown
```bash
pnpm add @sando/components @sando/tokens
````

```ts
// main.ts or App.tsx
import "@sando/tokens/css";
import "@sando/components/button";
```

```html
<sando-button variant="solid" size="medium"> Hello Sando! </sando-button>
```

```css
sando-button {
  /* Override button colors */
  --sando-button-solid-backgroundColor-default: #ff6b6b;
}
```

````

**Why**: Syntax highlighting improves code readability. Inline code formatting distinguishes technical terms from prose. Proper language tags enable VitePress code features (copy button, line numbers).

**Reference**: VitePress markdown docs, quick-start.md (lines 13-16, 27-29, 33-45, 167-179)

---

## VitePress Guide Patterns

### Tutorial Structure

```markdown
---
title: Tutorial Title
description: What the user will learn in one sentence
---

# Tutorial Title

Brief introduction (1-2 paragraphs) explaining:
- What the user will build/learn
- Prerequisites (if any)
- Estimated time (optional)

## Step 1: First Action

Clear instruction for what to do.

```code
Example code
````

**Result**: What the user should see or expect after this step.

## Step 2: Second Action

Next instruction...

## Step 3: Third Action

Continue progression...

## Full Example

Complete working code showing all steps together.

::: code-group

```language [File 1]
complete code
```

```language [File 2]
complete code
```

:::

## Troubleshooting

### Problem 1

**Solution**: How to fix it.

### Problem 2

**Solution**: How to fix it.

## Next Steps

Where to go after completing this tutorial:

- **[Related Guide](../path)** - Description
- **[Next Tutorial](../path)** - Description

````

**Why**: Consistent structure helps users know what to expect. Troubleshooting section addresses common issues proactively.

**Reference**: quick-start.md complete structure

---

### Conceptual Guide Structure

```markdown
---
title: Concept Title
description: Brief explanation of the concept
---

# Concept Title

Opening paragraph explaining what this concept is and why it matters.

## What is [Concept]?

Detailed explanation of the concept with:
- Clear definitions
- Real-world analogies
- Visual diagrams (if helpful)

## Why Use [Concept]?

Benefits and use cases:
- **Benefit 1**: Explanation
- **Benefit 2**: Explanation
- **Benefit 3**: Explanation

## How [Concept] Works

Technical explanation with code examples:

```code
Examples showing the concept in practice
````

## Common Patterns

### Pattern 1

Description and example.

### Pattern 2

Description and example.

## Best Practices

- ✅ DO: Recommended approach with example
- ❌ DON'T: Anti-pattern to avoid with explanation

## Related Concepts

- **[Related Topic 1](../path)** - How it relates
- **[Related Topic 2](../path)** - How it relates

````

**Why**: Conceptual guides explain "why" not just "how". Structure moves from high-level understanding to practical application.

**Reference**: guides/flavor-philosophy.md, guides/accessibility.md

---

### Integration Guide Structure

```markdown
---
title: Integration with [Framework/Tool]
description: How to use Sando with [Framework/Tool]
---

# Integration with [Framework/Tool]

Brief introduction to the integration.

## Prerequisites

- Node.js ≥20.0.0
- [Framework] ≥[version]
- Basic knowledge of [Framework]

## Installation

```bash
pnpm add @sando/components @sando/tokens
````

## Configuration

### Step 1: Setup [Framework] Config

```config
Configuration code
```

### Step 2: Import Components

```framework
Import code
```

### Step 3: Use Components

```framework
Usage example
```

## TypeScript Support

```typescript
Type definitions and configuration
```

## Common Patterns

### Pattern 1: [Common Use Case]

```framework
Example code
```

### Pattern 2: [Another Use Case]

```framework
Example code
```

## Troubleshooting

Common issues and solutions.

## Example Project

Link to complete working example repository or CodeSandbox.

````

**Why**: Integration guides need special attention to framework-specific configuration and common gotchas.

**Reference**: FRAMEWORK_INTEGRATION.md guideline patterns

---

## Markdown Features

### Internal Links

```markdown
[Link Text](/path/to/page)
[Link Text](../relative/path)

<!-- Links with descriptions -->
- **[Link Text](/path)** - Brief description of linked content
````

**Navigation links pattern**:

```markdown
## Next Steps

- **[Theming Guide](/getting-started/theming)** - Learn how to customize
- **[Token Architecture](/tokens/architecture)** - Understand the system
- **[Component API](/components/button)** - Explore components
```

**Why**: Internal links use VitePress routing. Bold links with descriptions provide context before clicking.

**Reference**: quick-start.md (lines 207-213)

---

### External Links

```markdown
[GitHub Repository](https://github.com/user/repo)

<!-- Open in new tab -->

[Storybook](https://example.com){target="\_blank"}
```

**Why**: External links use full URLs. `{target="_blank"}` opens in new tab for external references.

---

### Emoji in Documentation

```markdown
## Features

- ✅ **Feature Name**: Description
- 🎨 **Themeable**: Token-driven styling
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Lightweight bundle size
```

**Common emoji conventions**:

- ✅ Checkmark: Completed features, best practices
- ❌ Cross: Anti-patterns, things to avoid
- ⚠️ Warning: Important notices, breaking changes
- 💡 Lightbulb: Tips, ideas, insights
- 📚 Books: Documentation, learning resources
- 🎨 Palette: Design, theming, styling
- ♿ Accessibility: A11y features
- 🔒 Lock: Security, type safety
- ⚡ Lightning: Performance, speed
- 🔧 Wrench: Tools, configuration
- 📝 Memo: Notes, documentation

**Why**: Emoji add visual interest and help users scan content quickly. Use sparingly for emphasis, not decoration.

**Reference**: button.md (lines 7-14), accessibility.md (lines 11-51)

---

### Lists and Formatting

```markdown
<!-- Unordered list -->

- Item 1
- Item 2
  - Nested item
  - Nested item

<!-- Ordered list -->

1. First step
2. Second step
3. Third step

<!-- Task list -->

- [ ] Task not done
- [x] Task completed

<!-- Bold and italic -->

**Bold text** for emphasis
_Italic text_ for subtle emphasis
`Code text` for technical terms
```

**Why**: Lists organize information. Bold emphasizes key points. Inline code distinguishes technical terms.

---

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Value A  | Value B  | Value C  |
| Value D  | Value E  | Value F  |

<!-- Aligned columns -->

| Left | Center | Right |
| :--- | :----: | ----: |
| L1   |   C1   |    R1 |
| L2   |   C2   |    R2 |
```

**When to use tables**:

- API reference (see API_REFERENCE.md)
- Comparison matrices
- Configuration options
- WCAG compliance checklists

**Reference**: API_REFERENCE.md patterns, accessibility.md

---

## Navigation Configuration

### Sidebar Configuration

**Pattern in .vitepress/config.ts**:

```typescript
sidebar: {
  '/getting-started/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/getting-started/introduction' },
        { text: 'Installation', link: '/getting-started/installation' },
        { text: 'Quick Start', link: '/getting-started/quick-start' },
      ]
    }
  ],

  '/guides/': [
    {
      text: 'Philosophy',
      items: [
        { text: 'Why Flavors', link: '/guides/flavor-philosophy' }
      ]
    },
    {
      text: 'Guides',
      items: [
        { text: 'Accessibility', link: '/guides/accessibility' },
        { text: 'Contributing', link: '/guides/contributing' }
      ]
    }
  ]
}
```

**Organization principles**:

- Group related pages under collapsible sections
- Use descriptive section titles
- Order pages by learning progression (beginner → advanced)
- Place overview/introduction pages first

**Reference**: .vitepress/config.ts (lines 23-76)

---

### Top Navigation

**Pattern in .vitepress/config.ts**:

```typescript
nav: [
  { text: "Guide", link: "/getting-started/introduction" },
  { text: "Tokens", link: "/tokens/architecture" },
  { text: "Components", link: "/components/overview" },
  {
    text: "Storybook",
    link: "https://example.com/storybook",
    target: "_blank",
  },
];
```

**Why**: Top nav provides primary navigation. Link to section landing pages (overview/introduction). External links use `target: '_blank'`.

**Reference**: .vitepress/config.ts (lines 12-21)

---

## Content Organization

### File Naming

```
apps/site/
├── getting-started/
│   ├── introduction.md          # Kebab-case
│   ├── installation.md
│   ├── quick-start.md
│   └── theming.md
├── guides/
│   ├── accessibility.md
│   ├── contributing.md
│   └── flavor-philosophy.md
├── tokens/
│   ├── architecture.md
│   ├── ingredients.md
│   └── flavors.md
└── components/
    ├── overview.md
    └── button.md
```

**Conventions**:

- Use kebab-case for file names
- Name matches page title (lowercased, spaces → hyphens)
- Use descriptive names (quick-start.md not qs.md)
- Group by category in folders

---

### Directory Structure

**Category organization**:

- `getting-started/` - Onboarding, installation, first steps
- `guides/` - Conceptual topics, philosophy, best practices
- `tokens/` - Design token documentation
- `components/` - Component API reference
- `examples/` - Complete example projects (optional)

**Why**: Clear categories help users find content. Mirrors sidebar structure in config.ts.

**Reference**: apps/site/ directory structure

---

## Writing Guidelines

### Tone and Voice

- **Clear and Direct**: Avoid unnecessary words
- **Active Voice**: "Import the component" not "The component should be imported"
- **Second Person**: Address the user as "you"
- **Present Tense**: "The button renders..." not "The button will render..."
- **Inclusive**: Use "they/them" for generic users
- **Positive**: Focus on what to do, not just what to avoid

---

### Code Examples

**Always include**:

- Complete, working code
- Comments explaining non-obvious parts
- Expected output or result
- Syntax highlighting (proper language tags)

**Example**:

````markdown
```ts
// Import the component
import "@sando/components/button";

// Use in your HTML
const app = document.querySelector("#app")!;
app.innerHTML = `
  <sando-button variant="solid">
    Click me
  </sando-button>
`;

// Add event listener
const button = app.querySelector("sando-button")!;
button.addEventListener("click", () => {
  console.log("Clicked!"); // Output: "Clicked!"
});
```
````

````

**Why**: Complete examples reduce confusion. Comments guide understanding. Expected output shows what success looks like.

---

### Accessibility in Documentation

- Provide alt text for images (when images added)
- Use semantic headings (h2, h3, not bold text)
- Write descriptive link text (not "click here")
- Test documentation with screen readers
- Ensure code examples are keyboard accessible

**Example**:
```markdown
<!-- ❌ BAD -->
[Click here](../guide) to learn more.

<!-- ✅ GOOD -->
[Learn more about theming](../guide)
````

---

## Validation Checklist

### Page Structure

- [ ] Frontmatter included (title, description) OR first h1 is descriptive
- [ ] One h1 heading (page title)
- [ ] Logical h2/h3 hierarchy (no skipping levels)
- [ ] Introduction paragraph after h1
- [ ] Next Steps or Related sections at end

### Content Quality

- [ ] Clear, concise writing in active voice
- [ ] Technical terms explained or linked to glossary
- [ ] Code examples are complete and working
- [ ] Syntax highlighting applied (correct language tags)
- [ ] Links use descriptive text (not "click here")

### Code Examples

- [ ] All code blocks have language tags
- [ ] Examples are self-contained and runnable
- [ ] Comments explain non-obvious code
- [ ] Multi-framework examples use code groups
- [ ] Expected output or result documented

### VitePress Features

- [ ] Containers used for tips/warnings/danger
- [ ] Code groups used for multi-option examples
- [ ] Internal links use VitePress routing format
- [ ] External links open in new tab (if appropriate)
- [ ] Line numbers enabled for long code blocks

### Navigation

- [ ] Page added to sidebar config (.vitepress/config.ts)
- [ ] Sidebar grouping is logical
- [ ] File name matches URL pattern (kebab-case)
- [ ] Previous/Next navigation makes sense

### Accessibility

- [ ] Semantic heading structure (h1 → h2 → h3)
- [ ] Link text is descriptive
- [ ] Images have alt text (if images present)
- [ ] Code examples include keyboard interaction notes
- [ ] Tables have proper headers

---

## Related Guidelines

- [API_REFERENCE.md](./API_REFERENCE.md) - Component API documentation format
- [STORYBOOK_STORIES.md](./STORYBOOK_STORIES.md) - Interactive component stories
- [CODE_STYLE.md](../03-development/CODE_STYLE.md) - Code example formatting
- [WCAG_COMPLIANCE.md](../04-accessibility/WCAG_COMPLIANCE.md) - Documentation accessibility

---

## External References

**VitePress Documentation**:

- [VitePress Guide](https://vitepress.dev/guide/what-is-vitepress) - Official documentation
- [Markdown Extensions](https://vitepress.dev/guide/markdown) - Markdown features
- [Frontmatter](https://vitepress.dev/reference/frontmatter-config) - Page configuration
- [Theme Config](https://vitepress.dev/reference/default-theme-config) - Navigation/sidebar setup

**Markdown**:

- [Markdown Guide](https://www.markdownguide.org/) - Basic/extended syntax
- [CommonMark Spec](https://commonmark.org/) - Markdown specification

**Writing**:

- [Google Developer Docs Style Guide](https://developers.google.com/style) - Technical writing best practices
- [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/) - Writing for developers

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial guideline creation
- 5 Core Rules: frontmatter, step-by-step structure, containers, code groups, syntax highlighting
- VitePress guide patterns: tutorial, conceptual, integration structures
- Markdown features: links, emoji, lists, tables
- Navigation configuration: sidebar, top nav patterns
- Content organization: file naming, directory structure
- Writing guidelines: tone, voice, code examples, accessibility
- Validation checklist: structure, content, code, VitePress features, navigation, a11y
- References to quick-start.md (lines 9-213), accessibility.md, button.md
- References to .vitepress/config.ts (lines 12-76)
- Agent-optimized format (500 lines)

---

**Great documentation teaches, not just tells. Write guides that empower users to succeed independently.**
