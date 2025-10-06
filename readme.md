# 🥪 Sando Design System

A modern, accessible, token-based design system monorepo built with Turborepo.

"Sando" is inspired by the Japanese "katsu sando" sandwich analogy. A flexible UI toolkit built as a Web Components library that serves as a portfolio piece and starter kit for future projects, ensuring visual consistency while allowing easy customization through a theming system.

## 📦 Packages

### [@sando/tokens](./packages/tokens)
Design tokens following a three-layer architecture:
- **Ingredients** - Primitive values (colors, spacing, typography)
- **Flavors** - Semantic tokens (theme-specific)
- **Recipes** - Component-specific tokens

### [@sando/components](./packages/components)
Web Components library built with Lit:
- Framework-agnostic components
- Token-driven styling
- Full TypeScript support
- WCAG 2.1 AA compliant

### [@sando/docs](./apps/docs)
Storybook - Interactive component playground and visual testing

### [@sando/site](./apps/site)
VitePress - Main documentation site with guides, tutorials, and API reference

## 🚀 Quick Start

```bash
# Install pnpm (if not already installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development mode (all packages in parallel)
pnpm dev

# Run tests
pnpm test
```

### 🌐 Development Ports

When running `pnpm dev`, the following applications will be available:

- **Storybook** (Component Development & Playground): http://localhost:6006
- **VitePress** (Documentation Site): http://localhost:3000

> **Note**: Ports can be customized by copying `.env.example` to `.env.local` and modifying the port values.

## 📋 Available Scripts

### Root Commands

```bash
pnpm build              # Build all packages with Turborepo
pnpm dev                # Dev mode for all packages (parallel)
pnpm test               # Run tests in all packages
pnpm test:coverage      # Coverage for all packages
pnpm lint               # Lint all packages
pnpm clean              # Clean all build artifacts
```

### Package-Specific Commands

```bash
pnpm tokens:build       # Build only tokens
pnpm tokens:dev         # Dev mode for tokens (watch mode)

pnpm components:build   # Build only components

pnpm docs:dev           # Start Storybook (localhost:6006)
pnpm docs:build         # Build Storybook

pnpm site:dev           # Start VitePress docs (localhost:3000)
pnpm site:build         # Build VitePress docs
pnpm site:preview       # Preview built docs (localhost:3001)
```

### Versioning & Publishing

```bash
pnpm changeset          # Create a changeset
pnpm version-packages   # Bump versions
pnpm release            # Build and publish to npm
```

## 🏗️ Monorepo Structure

```
sando-design-system/
├── packages/
│   ├── tokens/           # @sando/tokens
│   │   ├── src/          # Token JSON files
│   │   ├── build/        # Style Dictionary config
│   │   ├── tests/        # Token tests
│   │   └── dist/         # Built CSS tokens
│   │
│   └── components/       # @sando/components
│       ├── src/          # Lit components
│       ├── tests/        # Component tests
│       └── dist/         # Built components
│
├── apps/
│   ├── docs/             # @sando/docs (Storybook)
│   │   ├── .storybook/   # Storybook config
│   │   └── stories/      # Documentation
│   │
│   └── site/             # @sando/site (VitePress)
│       └── docs/         # Documentation content
│
├── .env.example          # Environment variables template
├── .env                  # Local environment variables (ports, etc.)
├── turbo.json            # Turborepo configuration
├── pnpm-workspace.yaml   # Workspace definition
└── package.json          # Root package
```

## 🎨 Token Architecture

Sando uses a three-layer token system inspired by the "katsu sando" sandwich:

1. **Ingredients (Primitives)**
   - Raw, atomic values with no opinion
   - Examples: `color-brand-500`, `space-base`, `font-size-base`

2. **Flavors (Semantic)**
   - Context and meaning to ingredients
   - Define theme character
   - Examples: `color-background-interactive`, `spacing-comfortable`

3. **Recipes (Component)**
   - Component-specific tokens
   - Examples: `button-background-color`, `button-padding`

**Theming**: Apply different flavors via HTML attribute:
```html
<sando-button flavor="strawberry">Click me</sando-button>
```

## 🛠️ Tech Stack

- **Monorepo**: [Turborepo](https://turbo.build/repo) 2.5.8 - High-performance build system
- **Package Manager**: [pnpm](https://pnpm.io) 8.15.0 with workspaces
- **Components**: [Lit](https://lit.dev) 3.3.1 - Modern web components
- **Tokens**: [Style Dictionary](https://amzn.github.io/style-dictionary) 4.0.0
- **Testing**: [Vitest](https://vitest.dev) 3.2.4 + [Playwright](https://playwright.dev) 1.55.1
- **Docs**: [Storybook](https://storybook.js.org) 8.6.14 + [VitePress](https://vitepress.dev) 1.6.4
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 5.0.8
- **Linting**: ESLint 8.56.0 + Prettier 3.6.2

## 📈 Performance with Turborepo

- ⚡ **Incremental builds** - Only rebuild what changed
- 🔄 **Smart caching** - Local and remote caching
- ⏱️ **Parallel execution** - Run tasks concurrently
- 📊 **Build visualization** - Understand your build graph

## 🧪 Testing

```bash
# Run all tests (clean output)
pnpm test

# Watch mode (auto-rerun on changes)
pnpm test:watch

# Coverage report
pnpm test:coverage

# Interactive test UI (run individually per package)
pnpm --filter @sando/tokens test:ui       # Tokens UI
pnpm --filter @sando/components test:ui   # Components UI
```

### Test Commands per Package

**Tokens**:
```bash
pnpm test:verbose          # Detailed output
pnpm test:structure        # Token structure tests
pnpm test:references       # Token reference tests
pnpm test:values           # Token value tests
```

**Components**:
```bash
pnpm test:verbose          # Detailed test output
pnpm test:e2e              # End-to-end tests
pnpm test:e2e:ui           # E2E tests UI
```

**Tip**: Use `pnpm test` for CI/terminal or `pnpm test:ui` for interactive debugging.

## 📝 Publishing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing:

```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm version-packages

# Build and publish to npm
pnpm release
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Rodrigo Lago](https://github.com/rodrigolagodev)

## 🔗 Links

- **GitHub**: [rodrigolagodev/SandoDesingSystem](https://github.com/rodrigolagodev/SandoDesingSystem)
- **Issues**: [Report a bug or request a feature](https://github.com/rodrigolagodev/SandoDesingSystem/issues)
- **Storybook**: Component playground and documentation
- **VitePress**: Full documentation site
