# Contributing to Sando Design System

Thank you for your interest in contributing to Sando Design System! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [GitHub Flow](#github-flow)
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
git clone https://github.com/rodrigolagodev/SandoDesignSystem.git
cd SandoDesignSystem

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

## GitHub Flow

Sando Design System follows **GitHub Flow** - a lightweight, branch-based workflow designed for rapid iteration and continuous deployment.

### Core Principles

1. **Master is always deployable** - Every commit to `master` is production-ready
2. **Feature branches are short-lived** - Merge within 3 days to avoid drift
3. **Pull requests are the unit of work** - All changes go through PR review
4. **Deploy frequently** - Continuous deployment from `master`
5. **Delete branches after merge** - Keep repository clean

### Typical Workflow

```bash
# 1. Create feature branch from master
git checkout master
git pull
git checkout -b feat/add-tooltip-component

# 2. Make changes and commit frequently
git add .
git commit -m "feat(components): add tooltip base structure"
git commit -m "feat(components): add tooltip positioning logic"

# 3. Push branch and create PR
git push -u origin feat/add-tooltip-component
# Open PR on GitHub

# 4. Address review feedback
git add .
git commit -m "fix(components): address review feedback"
git push

# 5. Merge when CI passes and approved
# Merging triggers automatic deployment to production
# Branch is automatically deleted after merge
```

### Branch Naming Convention

Use the format: `type/description`

**Examples:**

- `feat/button-component` - New feature
- `fix/dark-mode-contrast` - Bug fix
- `docs/theming-guide` - Documentation
- `refactor/flavor-mixin` - Code refactoring
- `chore/upgrade-lit` - Maintenance

**Why This Matters:** Short-lived branches reduce merge conflicts and enable rapid feedback loops.

For complete details, see [`.claude/guidelines/03-development/GIT_WORKFLOW.md`](.claude/guidelines/03-development/GIT_WORKFLOW.md)

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
sando - button.ts;
sando -
  // CSS classes: kebab-case
  button.test.ts.button -
  primary;

// CSS custom properties: kebab-case with --sando- prefix
--sando - button - background - color;

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

## AI-Powered Development Workflow

Sando includes **7 specialized AI agents** that can help you contribute more effectively when using [Claude Code](https://claude.com/code):

### Agent Architecture

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
└───────────────┘    └─────────────────┘    └────────────────┘
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌────────────────┐
│ sando-quality │    │ sando-storybook │    │sando-documenter│
└───────────────┘    └─────────────────┘    └────────────────┘
```

### Available Agents

| Agent                  | Domain        | Use For                                        |
| ---------------------- | ------------- | ---------------------------------------------- |
| **sando-orchestrator** | Coordination  | Complex tasks, multi-step workflows            |
| **sando-architect**    | Architecture  | Patterns, token architecture, breaking changes |
| **sando-tokens**       | Design Tokens | Creating Ingredients, Flavors, Recipes         |
| **sando-developer**    | Components    | Implementing components, features, bug fixes   |
| **sando-quality**      | Testing       | Unit tests, a11y tests, WCAG compliance        |
| **sando-storybook**    | Storybook     | Stories, configuration, troubleshooting        |
| **sando-documenter**   | Documentation | API docs, JSDoc, VitePress guides              |

### Skills & Commands

**Skills** (reusable workflows):

- `component-creator` - Scaffold new components with 7-file pattern
- `skill-creator` - Create new skills
- `agent-creator` - Create new agents
- `prompt-engineer` - Optimize LLM prompts

**Commands** (quick actions):

- `/project-status` - Project health check (git, builds, tests, coverage)

### How to Use

When working with Claude Code, the agents help you:

1. **Create new components** - Orchestrator coordinates tokens → developer → quality → storybook
2. **Add features** - Developer implements, quality validates
3. **Fix bugs** - Developer fixes, quality ensures tests pass
4. **Write documentation** - Documenter creates API docs, Storybook handles stories

## Questions or Issues?

- **Bug reports**: [GitHub Issues](https://github.com/rodrigolagodev/SandoDesignSystem/issues)
- **Feature requests**: [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions)
- **Questions**: [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Sando Design System! 🥪
