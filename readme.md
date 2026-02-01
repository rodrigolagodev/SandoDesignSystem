# Sando Design System

**The perfect recipe for building delicious UIs.**

Just like a perfectly crafted Japanese katsu sando combines quality **Ingredients**, balanced **Flavors**, and a proven **Recipe** to create something extraordinary, Sando Design System brings these three layers together to help you craft consistent, accessible, and beautiful user interfaces.

We believe that great design systems, like great food, start with quality basics. Our three-layer token architecture gives you the foundation to build once and theme infinitely—whether you're serving light mode, dark mode, or your own custom flavor. Built with Web Components and powered by design tokens, Sando works seamlessly with React, Vue, Angular, or vanilla JavaScript.

**Start with quality Ingredients.** Define your primitives—colors, spacing, typography—as the raw materials of your design language.

**Season with distinctive Flavors.** Transform primitives into semantic tokens that give your interface its unique character and enable effortless theming.

**Follow proven Recipes.** Use component-specific tokens that ensure every button, card, and input tastes just right, every time.

The result? A design system that's accessible by default (WCAG 2.1 AA), framework-agnostic, fully typed with TypeScript, and ready to serve across your entire product ecosystem.

Start with the basics, season with meaning, and serve with style.

---

## Features

- **Three-Layer Token Architecture** - Ingredients → Flavors → Recipes for scalable design
- **Framework-Agnostic** - Web Components that work with React, Vue, Angular, or vanilla JS
- **Accessible by Default** - WCAG 2.1 AA compliant components out of the box
- **Multi-Theme Support** - Light, dark, high-contrast, and custom flavors
- **Monorepo Structure** - Turborepo-powered with optimized caching and parallel builds
- **Type-Safe** - Full TypeScript support with strict mode enabled
- **Well-Tested** - Comprehensive unit, E2E, and accessibility tests
- **Fully Documented** - Interactive Storybook playground and VitePress guides
- **AI-Powered Workflow** - 7 specialized agents with orchestrated workflows for development automation

## AI-Powered Development

Sando comes with a complete AI agent system built for Claude Code, making design system development faster and more consistent.

### Agent Architecture

The system uses an **orchestrated multi-agent architecture** where a central orchestrator coordinates specialized agents for different tasks:

```
                    ┌─────────────────────┐
                    │  sando-orchestrator │
                    │   (Central Brain)   │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌────────────────┐
│sando-architect│    │  sando-tokens   │    │sando-developer │
│ (Architecture)│    │    (Tokens)     │    │ (Components)   │
└───────────────┘    └─────────────────┘    └────────────────┘
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌────────────────┐
│ sando-quality │    │ sando-storybook │    │sando-documenter│
│   (Testing)   │    │   (Stories)     │    │(Documentation) │
└───────────────┘    └─────────────────┘    └────────────────┘
```

### 7 Specialized Agents

| Agent                  | Domain        | Responsibilities                                                               |
| ---------------------- | ------------- | ------------------------------------------------------------------------------ |
| **sando-orchestrator** | Coordination  | Routes requests, manages workflows, parallelizes tasks, validates deliverables |
| **sando-architect**    | Architecture  | Token architecture, patterns, build config, breaking changes, major decisions  |
| **sando-tokens**       | Design Tokens | Creates Ingredients, Flavors, and Recipes; configures Style Dictionary         |
| **sando-developer**    | Components    | Implements Web Components with Lit 3+, styling, interactivity                  |
| **sando-quality**      | Testing       | Unit tests, accessibility tests, WCAG compliance, security validation          |
| **sando-storybook**    | Storybook     | Stories, configuration, addons, troubleshooting                                |
| **sando-documenter**   | Documentation | API docs, JSDoc, VitePress guides, README files                                |

### How Agents Work Together

When you request a new component, the orchestrator coordinates a multi-phase workflow:

```
PHASE 1: Preparation (Sequential)
─────────────────────────────────
1. Orchestrator analyzes requirements
2. sando-tokens creates Recipe tokens

PHASE 2: Implementation (Parallel)
──────────────────────────────────
3. sando-developer implements component
4. sando-quality creates tests        ─┬─ Run in parallel
5. sando-storybook creates stories    ─┘

PHASE 3: Validation (Sequential)
────────────────────────────────
6. sando-quality runs final checks
7. Orchestrator reports completion
```

### Skills for Common Tasks

Execute complex workflows with a single command:

| Skill                 | Description                                         |
| --------------------- | --------------------------------------------------- |
| **component-creator** | Scaffold new Web Components with the 7-file pattern |
| **skill-creator**     | Build new skills to extend agent capabilities       |
| **agent-creator**     | Create and configure new specialized agents         |
| **prompt-engineer**   | Optimize and improve prompts for LLM interactions   |

### Slash Commands

Quick shortcuts for common operations:

| Command                 | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| **/project-status**     | Comprehensive project health check (git, builds, tests, coverage) |
| **/frontend-developer** | Invoke frontend development specialist                            |

> Use agents, skills, and commands via [Claude Code](https://claude.com/code) to streamline your development workflow.

## Quick Start

```bash
# Install dependencies (requires pnpm)
pnpm install

# Build all packages
pnpm build

# Start development mode
pnpm dev
```

**Development servers will be available at:**

- Storybook: http://localhost:6006
- VitePress: http://localhost:3000

## Tech Stack

Built with modern tools for maximum developer experience:

| Category       | Technology                        |
| -------------- | --------------------------------- |
| **Monorepo**   | Turborepo 2.5.8 + pnpm workspaces |
| **Components** | Lit 3.3.1 (Web Components)        |
| **Tokens**     | Style Dictionary 4.0.0            |
| **Testing**    | Vitest 3.2.4 + Playwright 1.55.1  |
| **Docs**       | Storybook 8.6.14 + VitePress      |
| **Language**   | TypeScript 5.9.3                  |
| **Build**      | Vite 6.4.1                        |

## Documentation

For detailed guides, API references, and interactive examples:

- **[Storybook](http://localhost:6006)** - Component playground and visual documentation
- **[VitePress](http://localhost:3000)** - Full guides on installation, theming, and architecture

## Packages

This monorepo contains:

| Package                                        | Description                                   |
| ---------------------------------------------- | --------------------------------------------- |
| **[@sando/tokens](./packages/tokens)**         | Design tokens (Ingredients, Flavors, Recipes) |
| **[@sando/components](./packages/components)** | Web Components library                        |
| **[@sando/docs](./apps/docs)**                 | Storybook documentation                       |
| **[@sando/site](./apps/site)**                 | VitePress documentation site                  |

## Three-Layer Token Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TOKEN ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  LAYER 1: INGREDIENTS (Primitives)                              │
│  packages/tokens/src/ingredients/                                │
│  • color.json     → --sando-color-blue-500                      │
│  • spacing.json   → --sando-spacing-4                           │
│  • typography.json → --sando-font-size-base                     │
│                                                                  │
│  LAYER 2: FLAVORS (Themes)                                      │
│  packages/tokens/src/flavors/{flavor}/                          │
│  • light.json     → --sando-flavor-primary                      │
│  • dark.json      → theme variations                            │
│                                                                  │
│  LAYER 3: RECIPES (Component Tokens)                            │
│  packages/tokens/src/recipes/{component}/                        │
│  • tokens.json    → --sando-button-solid-backgroundColor        │
│                                                                  │
│  ═══════════════════════════════════════════════════════════    │
│  CONSUMPTION: Components ONLY use Layer 3 (Recipes)             │
│  ✅ var(--sando-button-solid-backgroundColor-default)            │
│  ❌ var(--sando-color-blue-500)                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
sando-design-system/
├── packages/
│   ├── tokens/          # Design tokens (Ingredients, Flavors, Recipes)
│   └── components/      # Web Components library
├── apps/
│   ├── docs/            # Storybook documentation
│   └── site/            # VitePress documentation site
└── .opencode/
    ├── agents/          # 7 specialized AI agents
    ├── skills/          # 4 reusable skills
    ├── commands/        # 2 slash commands
    └── guidelines/      # TOON format guidelines
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

When contributing, the AI agent system can help you:

- Create new components following the 7-file pattern
- Ensure accessibility compliance with automated checks
- Generate comprehensive tests and documentation
- Maintain consistency with design system guidelines

## License

MIT © [Rodrigo Lago](https://github.com/rodrigolagodev)

---

**Built with care and a passion for great design systems.**
