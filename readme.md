# 🥪 Sando Design System

**The perfect recipe for building delicious UIs.**

Just like a perfectly crafted Japanese katsu sando combines quality **Ingredients**, balanced **Flavors**, and a proven **Recipe** to create something extraordinary, Sando Design System brings these three layers together to help you craft consistent, accessible, and beautiful user interfaces.

We believe that great design systems, like great food, start with quality basics. Our three-layer token architecture gives you the foundation to build once and theme infinitely—whether you're serving light mode, dark mode, or your own custom flavor. Built with Web Components and powered by design tokens, Sando works seamlessly with React, Vue, Angular, or vanilla JavaScript.

**Start with quality Ingredients.** Define your primitives—colors, spacing, typography—as the raw materials of your design language.

**Season with distinctive Flavors.** Transform primitives into semantic tokens that give your interface its unique character and enable effortless theming.

**Follow proven Recipes.** Use component-specific tokens that ensure every button, card, and input tastes just right, every time.

The result? A design system that's accessible by default (WCAG 2.1 AA), framework-agnostic, fully typed with TypeScript, and ready to serve across your entire product ecosystem.

Start with the basics, season with meaning, and serve with style.

---

## ✨ Features

- **🎨 Three-Layer Token Architecture** - Ingredients → Flavors → Recipes for scalable design
- **🌐 Framework-Agnostic** - Web Components that work with React, Vue, Angular, or vanilla JS
- **♿ Accessible by Default** - WCAG 2.1 AA compliant components out of the box
- **🎭 Multi-Theme Support** - Light, dark, high-contrast, and custom flavors
- **📦 Monorepo Structure** - Turborepo-powered with optimized caching and parallel builds
- **🔒 Type-Safe** - Full TypeScript support with strict mode enabled
- **🧪 Well-Tested** - Comprehensive unit, E2E, and accessibility tests
- **📚 Fully Documented** - Interactive Storybook playground and VitePress guides
- **🤖 AI-Powered Workflow** - 20 specialized agents, skills, and commands for development automation

## 🤖 AI-Powered Development

Sando comes with a complete AI agent system built for Claude Code, making design system development faster and more consistent:

### 20 Specialized Agents

Work with expert agents for every aspect of design system development:

- **Core Development** (8 agents): `design-system-architect`, `design-system-pm`, `ui-designer`, `frontend-developer`, `technical-writer`, `qa-expert`, `devops-automation-engineer`, `developer-tooling-specialist`
- **Design Operations** (4 agents): `design-ops-specialist`, `version-migration-manager`, `ecosystem-integration-agent`, `performance-monitor`
- **Quality & Architecture** (2 agents): `security-compliance-auditor`, `component-composition-specialist`
- **Community & Growth** (3 agents): `community-contribution-manager`, `analytics-insights-agent`, `localization-i18n-specialist`
- **Meta Agents** (3 agents): `accessibility-advocate`, `component-builder`, `agent-system-optimizer`

### Skills for Common Tasks

Execute complex workflows with a single command:

- **`component-creator`** - Generate boilerplate for new Web Components
- **`command-creator`** - Create custom slash commands for your workflow
- **`skill-creator`** - Build new skills to extend Claude's capabilities

### Slash Commands

Quick shortcuts for common operations:

- **`/project-status`** - Comprehensive project health check (git, builds, tests, coverage)

> Use agents, skills, and commands via [Claude Code](https://claude.com/code) to streamline your development workflow.

## 🚀 Quick Start

```bash
# Install dependencies (requires pnpm)
pnpm install

# Build all packages
pnpm build

# Start development mode
pnpm dev
```

**Development servers will be available at:**

- 📖 Storybook: http://localhost:6006
- 📚 VitePress: http://localhost:3000

## 🛠️ Tech Stack

Built with modern tools for maximum developer experience:

- **Monorepo**: Turborepo 2.5.8 + pnpm workspaces
- **Components**: Lit 3.3.1 (Web Components)
- **Tokens**: Style Dictionary 4.0.0
- **Testing**: Vitest 4.0.4 + Playwright 1.55.1
- **Docs**: Storybook 8.6.14 + VitePress 1.6.4
- **Language**: TypeScript 5.9.3
- **Build**: Vite 5.0.8

## 📚 Documentation

For detailed guides, API references, and interactive examples:

- **[Storybook](http://localhost:6006)** - Component playground and visual documentation
- **[VitePress](http://localhost:3000)** - Full guides on installation, theming, and architecture

## 📦 Packages

This monorepo contains:

- **[@sando/tokens](./packages/tokens)** - Design tokens (Ingredients, Flavors, Recipes)
- **[@sando/components](./packages/components)** - Web Components library
- **[@sando/docs](./apps/docs)** - Storybook documentation
- **[@sando/site](./apps/site)** - VitePress documentation site

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

MIT © [Rodrigo Lago](https://github.com/rodrigolagodev)

---

**Built with ❤️ and a passion for great design systems.**
