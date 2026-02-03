# Changelog

All notable changes to the Sando Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Checkbox Component** - Full accessibility support with keyboard navigation, indeterminate state, and ARIA attributes
- **Installation Guide** - Comprehensive documentation for importing tokens with 4 different strategies
- **CSS Barrel Files** - Auto-generated `index.css` files for convenient imports (`@sando/tokens/css`)
- **Flavor Control in Stories** - Added flavor switching to Checkbox, Input, and Icon Storybook stories
- **Focus Ring Offset Token** - Improved button focus visibility with dedicated token

### Fixed

- **Checkbox Keyboard Navigation** - Added Space and Enter key support on label element for accessibility
- **TypeScript Test Types** - Fixed tsconfig.json to include Vitest globals and test files
- **Dark Mode Selector** - Corrected selector to check `data-color-mode` on `:root` instead of element itself
- **Flavor Inheritance** - Removed flavor imports from Shadow DOM to enable proper CSS custom property inheritance
- **Input Filled Variant** - Adjusted background tokens for better contrast
- **Egg-Salad Flavor** - Improved contrast and visibility in both modes
- **On-Solid Colors** - Corrected dark mode flavor on-solid color values

### Changed

- **Storybook Theme Switching** - Simplified with generated CSS instead of manual imports
- **ArgTypes Organization** - Improved structure across all component stories

---

## [0.1.0] - 2026-01-15

### Added

#### Components

- **Button Component** (`sando-button`) - Fully accessible button with variants (solid, outline, ghost, text), sizes (xs, sm, md, lg), and states
- **Input Component** (`sando-input`) - Form input with label, helper text, error states, and filled variant
- **FormGroup Component** (`sando-form-group`) - Layout wrapper for form elements with validation support
- **Icon Component** (`sando-icon`) - Integration with Lucide icons library (1,637+ icons)
- **Checkbox Component** (`sando-checkbox`) - Accessible checkbox with indeterminate state support

#### Token System (3-Layer Architecture)

- **Ingredients** (Layer 1) - Primitive tokens: colors, spacing, typography, radii, shadows, borders, motion
- **Flavors** (Layer 2) - 5 Japanese Sando-themed semantic token sets:
  - `original` - Classic balanced flavor (default)
  - `strawberry` - Vibrant pink/red accents
  - `egg-salad` - Warm golden tones
  - `katsu` - Rich warm browns
  - `wagyu` - Deep luxurious darks
- **Recipes** (Layer 3) - Component-specific tokens for Button, Input, Checkbox
- **Dual Mode Support** - Automatic (prefers-color-scheme) and manual (data-color-mode) dark/light modes

#### Documentation (Storybook)

- Complete component stories with all variants and states
- **Foundations Section** - Colors, Typography, Spacing, Shadows documentation
- **Getting Started** - Welcome, Quick Start, Theming guides
- **Dark/Light Mode Toggle** - Visual testing for both color schemes
- **Flavor Switcher** - Test components across all 5 themes
- WCAG-compliant documentation styling

#### Developer Experience

- **FlavorableMixin** - Automatic theme inheritance for components
- **Style Dictionary Build** - Automated token generation with custom formats
- **Vitest Testing** - Unit and accessibility tests
- **GitHub Actions CI/CD** - Automated testing and Storybook deployment

#### Agent System (OpenCode)

- **sando-orchestrator** - Central coordinator for all design system tasks
- **sando-architect** - Architecture and pattern decisions
- **sando-developer** - Component implementation specialist
- **sando-tokens** - Token creation and management
- **sando-quality** - Testing and accessibility validation
- **sando-storybook** - Storybook configuration and stories
- **sando-documenter** - Documentation specialist
- Custom skills: component-creator, prompt-engineer, skill-creator, agent-creator

### Infrastructure

- Monorepo structure with Turborepo
- Packages: `@sando/tokens`, `@sando/components`
- Apps: `docs` (Storybook)
- Node.js 20+ requirement
- pnpm 8.15.0 package manager

---

## Pull Request History

| PR  | Branch                                             | Description                                                 |
| --- | -------------------------------------------------- | ----------------------------------------------------------- |
| #17 | feat/storybook-improvements-and-checkbox           | Fix dark mode selector, add barrel files, installation docs |
| #16 | feat/storybook-improvements-and-checkbox           | Storybook improvements, checkbox enhancements               |
| #15 | feat/improve-orchestrator-ask-protocol             | Add mandatory guidelines protocol for agents                |
| #14 | feat/sando-theme-flavors-and-docs-reorg            | Rename flavors to Japanese Sando theme                      |
| #13 | fix/storybook-dynamic-tokens-for-component-preview | Dynamic tokens for component preview                        |
| #12 | docs/add-gitmodules-config                         | Submodule configuration and clone instructions              |
| #11 | chore/update-submodule-refs                        | Update skill submodule references                           |
| #10 | feature/upgrade-skills-creators                    | Upgrade skills and creators (iteration 3)                   |
| #9  | feature/upgrade-skills-creators                    | Upgrade skills and creators (iteration 2)                   |
| #8  | feature/upgrade-skills-creators                    | Upgrade skills and creators (iteration 1)                   |
| #7  | refactor/opencode-migration                        | Migrate to OpenCode agent system                            |
| #6  | feature/update-design-system                       | Design system updates                                       |
| #5  | feat/add-form-group-input-components               | Add FormGroup and Input components                          |
| #4  | chore/simplify-workflows                           | Simplify CI/CD workflows                                    |
| #3  | fix/guidelines-xml-transformation-v2               | Fix guidelines XML transformation                           |
| #2  | -                                                  | Implement GitHub Flow with automated CI/CD                  |

---

[Unreleased]: https://github.com/rodrigolagodev/SandoDesignSystem/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/rodrigolagodev/SandoDesignSystem/releases/tag/v0.1.0
