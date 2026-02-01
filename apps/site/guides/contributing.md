# Contributing Guide

Thank you for your interest in contributing to Sando Design System! This guide will help you get started.

For the complete contributing guidelines, please see our [CONTRIBUTING.md](https://github.com/rodrigolagodev/SandoDesignSystem/blob/master/CONTRIBUTING.md) in the main repository.

## Quick Links

- [GitHub Repository](https://github.com/rodrigolagodev/SandoDesignSystem)
- [Issues](https://github.com/rodrigolagodev/SandoDesignSystem/issues)
- [Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions)

## Getting Started

### Prerequisites

- **Node.js**: >=18.0.0
- **pnpm**: 8.15.0
- **Git**: Latest version

### Setup

```bash
# Clone the repository with submodules
git clone --recursive https://github.com/rodrigolagodev/SandoDesignSystem.git
cd SandoDesignSystem

# If you already cloned without --recursive:
git submodule update --init --recursive

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

> **Note:** The `--recursive` flag is needed to clone the `skill-creator` and `agent-creator` submodules.

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single for TS, double for HTML
- **Semicolons**: Required
- Run `pnpm format` before committing

## Testing

Every component requires:

- Unit tests (`*.test.ts`)
- E2E tests (`*.spec.ts`)
- Accessibility tests (`*.a11y.test.ts`)

Minimum coverage: 80%

## Commit Format

We use conventional commits:

```
feat: add new button variant
fix: resolve accessibility issue
docs: update README
chore: update dependencies
```

## Pull Request Checklist

- [ ] Tests pass
- [ ] Linting passes
- [ ] Documentation updated
- [ ] Storybook stories added
- [ ] Accessibility tested
- [ ] PR description is clear

## Need Help?

- Ask in [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions)
- Report bugs in [Issues](https://github.com/rodrigolagodev/SandoDesignSystem/issues)
- Read the full [CONTRIBUTING.md](https://github.com/rodrigolagodev/SandoDesignSystem/blob/master/CONTRIBUTING.md)

## AI-Powered Development

When using [Claude Code](https://claude.com/code), you have access to **7 specialized agents** that can help you contribute:

| Agent                  | Use For                                            |
| ---------------------- | -------------------------------------------------- |
| **sando-orchestrator** | Complex multi-step tasks, coordinates other agents |
| **sando-developer**    | Implementing components, features, bug fixes       |
| **sando-quality**      | Writing tests, accessibility audits                |
| **sando-storybook**    | Creating stories, Storybook configuration          |
| **sando-documenter**   | API docs, VitePress guides                         |
| **sando-tokens**       | Creating design tokens                             |
| **sando-architect**    | Architecture decisions                             |

**Quick commands:**

- `/project-status` - Check project health before submitting PR
- Use `component-creator` skill to scaffold new components

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
