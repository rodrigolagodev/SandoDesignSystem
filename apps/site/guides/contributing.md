# Contributing Guide

Thank you for your interest in contributing to Sando Design System! This guide will help you get started.

For the complete contributing guidelines, please see our [CONTRIBUTING.md](https://github.com/rodrigolagodev/SandoDesingSystem/blob/master/CONTRIBUTING.md) in the main repository.

## Quick Links

- [GitHub Repository](https://github.com/rodrigolagodev/SandoDesingSystem)
- [Issues](https://github.com/rodrigolagodev/SandoDesingSystem/issues)
- [Discussions](https://github.com/rodrigolagodev/SandoDesingSystem/discussions)

## Getting Started

### Prerequisites

- **Node.js**: >=18.0.0
- **pnpm**: 8.15.0
- **Git**: Latest version

### Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/rodrigolagodev/SandoDesingSystem.git
cd SandoDesingSystem

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
\`\`\`

## Development Workflow

1. **Create a branch**: `git checkout -b feat/your-feature`
2. **Make changes**: Follow our [coding standards](#coding-standards)
3. **Run tests**: `pnpm test`
4. **Commit**: Use [conventional commits](#commit-format)
5. **Push**: `git push origin feat/your-feature`
6. **Create PR**: Open a pull request on GitHub

## Coding Standards

### TypeScript

- Use strict mode
- Provide explicit types
- Avoid `any`, use `unknown` if needed
- Use meaningful names

### Naming Conventions

```typescript
// Components: PascalCase
class SandoButton extends LitElement {}

// Files: kebab-case
sando-button.ts

// CSS custom properties: --sando- prefix
--sando-button-background-color

// Functions: camelCase
function handleClick() {}
```

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

- Ask in [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesingSystem/discussions)
- Report bugs in [Issues](https://github.com/rodrigolagodev/SandoDesingSystem/issues)
- Read the full [CONTRIBUTING.md](https://github.com/rodrigolagodev/SandoDesingSystem/blob/master/CONTRIBUTING.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
