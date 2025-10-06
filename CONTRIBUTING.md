# Contributing to Sando Design System

Thank you for your interest in contributing to Sando Design System! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Component Guidelines](#component-guidelines)

## Code of Conduct

This project follows a Code of Conduct to ensure a welcoming environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- **Node.js**: >=18.0.0
- **pnpm**: 8.15.0 (recommended package manager)
- **Git**: Latest version

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/rodrigolagodev/SandoDesingSystem.git
cd SandoDesingSystem

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development mode
pnpm dev
```

This will start:
- **Storybook** on http://localhost:6006
- **VitePress docs** on http://localhost:3000

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

Follow the [Coding Standards](#coding-standards) and ensure all tests pass.

### 3. Run Quality Checks

```bash
# Run tests
pnpm test

# Run linter
pnpm lint

# Format code
pnpm format

# Type check
pnpm build
```

### 4. Commit Your Changes

We use conventional commits:

```bash
git commit -m "feat: add new button variant"
git commit -m "fix: resolve accessibility issue in modal"
git commit -m "docs: update component API documentation"
git commit -m "chore: update dependencies"
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feat/your-feature-name
```

Then create a pull request on GitHub.

## Project Structure

```
sando-design-system/
├── packages/
│   ├── tokens/          # Design tokens (Style Dictionary)
│   └── components/      # Web Components (Lit)
├── apps/
│   ├── docs/           # Storybook documentation
│   └── site/           # VitePress site
├── .github/            # GitHub workflows
└── README.md
```

## Coding Standards

### TypeScript

- Use **strict mode**
- Provide explicit types for function parameters and return values
- Avoid `any` type - use `unknown` if truly needed
- Use meaningful variable and function names

### Naming Conventions

```typescript
// Components: PascalCase
class SandoButton extends LitElement {}

// Files: kebab-case
sando-button.ts
sando-button.test.ts

// CSS classes: kebab-case
.button-primary

// CSS custom properties: kebab-case with --sando- prefix
--sando-button-background-color

// Functions: camelCase
function handleClick() {}

// Constants: SCREAMING_SNAKE_CASE
const MAX_WIDTH = 1200;
```

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for TypeScript, double quotes for HTML attributes
- **Semicolons**: Required
- **Line length**: 100 characters (soft limit)

Run `pnpm format` to auto-format your code.

## Testing Requirements

### Required Tests for Components

Every component **must** include:

1. **Unit Tests** (`*.test.ts`)
   - Component rendering
   - Property changes
   - Event dispatching
   - Edge cases

2. **E2E Tests** (`*.spec.ts`)
   - User interactions
   - Cross-browser compatibility
   - Real-world scenarios

3. **Accessibility Tests** (`*.a11y.test.ts`)
   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader support
   - Color contrast ratios

### Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

### Coverage Requirements

- **Minimum coverage**: 80% for all metrics
- **Target coverage**: 90%+ for components

## Pull Request Process

### PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows coding standards
- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Types are correct (`pnpm build`)
- [ ] Documentation is updated
- [ ] Storybook stories are added/updated
- [ ] Accessibility tests pass
- [ ] PR description explains changes clearly
- [ ] Commits follow conventional commit format

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
Describe the tests you ran and how to reproduce them

## Screenshots (if applicable)
Add screenshots or GIFs demonstrating the changes

## Related Issues
Closes #issue_number
```

### Review Process

1. Create your PR
2. Automated checks run (tests, linting, build)
3. Code review by maintainers
4. Address feedback if needed
5. PR is merged when approved

## Component Guidelines

### Creating a New Component

1. **Plan the component**
   - Define API (props, events, slots)
   - Design variants and states
   - Consider accessibility requirements

2. **Create component folder** (Monolithic structure)

```
packages/components/src/components/my-component/
├── sando-my-component.ts           # Component implementation
├── sando-my-component.types.ts     # Type definitions
├── sando-my-component.stories.ts   # Storybook documentation
├── sando-my-component.test.ts      # Unit tests
├── sando-my-component.spec.ts      # E2E tests
├── sando-my-component.a11y.test.ts # Accessibility tests
└── index.ts                        # Barrel export
```

3. **Implement the component**
   - Use Lit for Web Components
   - Consume design tokens from `@sando/tokens`
   - Follow accessibility best practices
   - Add comprehensive documentation

4. **Write tests**
   - Unit tests (jest/vitest)
   - E2E tests (Playwright)
   - Accessibility tests (axe-core)

5. **Document in Storybook**
   - Create stories for all variants
   - Document all props, events, and slots
   - Add usage examples

### Component Checklist

- [ ] Implements required props and events
- [ ] Supports theming via `flavor` attribute
- [ ] Uses design tokens (no hardcoded values)
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] Has comprehensive tests (>85% coverage)
- [ ] Documented in Storybook
- [ ] Type definitions exported
- [ ] Works in all supported browsers

## Design Token Guidelines

When adding or modifying tokens:

1. **Follow the three-layer architecture**:
   - **Ingredients**: Primitive values (colors, spacing, etc.)
   - **Flavors**: Semantic tokens (theme-specific)
   - **Recipes**: Component-specific tokens

2. **Use references**:
```json
{
  "button": {
    "backgroundColor": {
      "value": "{color.action.solid.background.default.value}"
    }
  }
}
```

3. **Test accessibility**:
   - Ensure color contrast ratios meet WCAG standards
   - Run `pnpm --filter @sando/tokens test:accessibility`

## Questions or Issues?

- **Bug reports**: [GitHub Issues](https://github.com/rodrigolagodev/SandoDesingSystem/issues)
- **Feature requests**: [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesingSystem/discussions)
- **Questions**: [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesingSystem/discussions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Sando Design System! 🥪
