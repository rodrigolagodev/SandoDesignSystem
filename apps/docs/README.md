# @sando/docs

Documentation and component playground for Sando Design System using Storybook.

## 🚀 Development

```bash
# Start Storybook dev server
npm run dev

# Build static documentation
npm run build

# Preview build
npm run preview
```

## 📁 Structure

```
apps/docs/
├── .storybook/
│   ├── main.js          # Storybook configuration
│   └── preview.js       # Global preview settings
├── stories/
│   ├── Introduction.mdx # Welcome page
│   └── *.stories.ts     # Component stories
└── package.json
```

## 🎨 Writing Stories

Stories are located in:
- `apps/docs/stories/` - Documentation stories
- `packages/components/src/**/*.stories.ts` - Component stories

Example story:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@sando/components/button';

const meta: Meta = {
  title: 'Components/Button',
  component: 'sando-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary']
    }
  }
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => html\`
    <sando-button variant="\${args.variant}">
      Click me
    </sando-button>
  \`
};
```

## 🔗 Dependencies

- `@sando/components` - Component library (workspace)
- `@sando/tokens` - Design tokens (workspace)
- `@storybook/web-components` - Storybook for Web Components

## 📖 License

MIT © Sando Design System Team
