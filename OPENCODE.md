meta:
doc_id: OPENCODE
version: 2.0.0
last_updated: 2026-01-31
format: TOON
migrated_from: CLAUDE.md v5.0.0
agent_consolidation: Reduced from 18 to 6 agents for clarity and efficiency

critical_instruction: |
This file provides high-level overview, tech stack and definitive index of guidelines for Sando Design System.
Do NOT rely on this file for architectural or development rules.
This file indexes and loads official guidelines in .opencode/guidelines/ directory.
You MUST load and reference .toon files in .opencode/guidelines/ as the non-negotiable single source of truth for all tasks analysis and code generation.

project:
name: Sando Design System
description: Modern accessible token-based design system built as monorepo using Turborepo pnpm workspaces Lit Web Components and Style Dictionary
inspiration: Named after Japanese katsu sando sandwich - metaphor for three-layer token architecture (Ingredients Flavors Recipes)
repository: https://github.com/RodrigoLagoDev/SandoDesignSystem

tech_stack:

- category: Monorepo
  tool: Turborepo
  version: "2.5.8"
  note: pnpm 8.15.0 workspaces
- category: Components
  tool: Lit
  version: "3.3.1"
  note: Web Components
- category: Tokens
  tool: Style Dictionary
  version: "4.0.0"
  note: Token build system
- category: Build
  tool: Vite
  version: "5.0.8"
  note: Fast build tool
- category: Testing
  tool: Vitest + Playwright
  version: "4.0.4 + 1.55.1"
  note: Unit + E2E (@vitest/ui @vitest/coverage-v8)
- category: Docs
  tool: Storybook + VitePress
  version: "8.6.14 + 1.6.4"
  note: Component docs + guides
- category: Language
  tool: TypeScript
  version: "5.9.3"
  note: Strict mode

progressive_disclosure:
strategy: Guidelines loaded dynamically by specialized agents when needed not pre-loaded in memory
benefits: - Reduces context from 102k to ~6k tokens (94% reduction) - Increases free workspace from 16.7% to ~70% - Enables longer conversations and more complex tasks - Maintains access to all guidelines through agent-driven loading - TOON format provides additional 20-30% token reduction over XML

guidelines:
location: .opencode/guidelines/
total: 27
categories: 6
format: TOON
extension: .toon
index: .opencode/guidelines/GUIDELINES_INDEX.toon
structure: - category: 01-design-system
files: - COLOR_SYSTEM.toon - COMPONENT_DESIGN.toon - MOTION_DESIGN.toon - SPACING_SYSTEM.toon - THEMING_STRATEGY.toon - TOKEN_ARCHITECTURE.toon - TYPOGRAPHY_SYSTEM.toon - category: 02-architecture
files: - COMPONENT_ARCHITECTURE.toon - FRAMEWORK_INTEGRATION.toon - MONOREPO_STRUCTURE.toon - TOKEN_BUILD_SYSTEM.toon - category: 03-development
files: - CODE_STYLE.toon - GIT_WORKFLOW.toon - NAMING_CONVENTIONS.toon - TESTING_STRATEGY.toon - category: 04-accessibility
files: - COLOR_CONTRAST.toon - KEYBOARD_NAVIGATION.toon - SCREEN_READER_SUPPORT.toon - WCAG_COMPLIANCE.toon - category: 05-quality
files: - PERFORMANCE_BUDGETS.toon - SECURITY_STANDARDS.toon - TEST_COVERAGE.toon - category: 06-documentation
files: - API_REFERENCE.toon - INLINE_CODE_DOCS.toon - STORYBOOK_STORIES.toon - TOON_FORMAT.toon - VITEPRESS_GUIDES.toon

agents:
location: .opencode/agents/
total: 6
prefix: sando-
architecture: Optimized 2-tier system with orchestrator for autonomous workflows
usage: sando-orchestrator routes requests automatically. Agents can be invoked directly via Task tool.

tier_1_core:
note: Primary agents for daily development (mode: all)
agents: - name: sando-orchestrator
description: Intelligent router that analyzes requests, delegates to specialists, parallelizes tasks, validates deliverables
invoke_for: Any complex task, component creation workflows, multi-step operations - name: sando-developer
description: Component implementation with Lit/TypeScript, 7-file pattern, keyboard navigation, ARIA
invoke_for: Creating components, adding features, fixing bugs, code modifications - name: sando-quality
description: Tests (Vitest), accessibility (axe-core), WCAG validation, guideline compliance
invoke_for: Writing tests, a11y audits, quality gates, coverage checks

tier_2_support:
note: Specialist agents for specific domains (mode: primary)
agents: - name: sando-architect
description: Architecture decisions, token system design, theming strategy, build configuration
invoke_for: New patterns, architectural questions, breaking changes, system-wide decisions - name: sando-tokens
description: Token creation across 3 layers (Ingredients/Flavors/Recipes), Style Dictionary
invoke_for: New tokens, new flavors, Recipe creation, token modifications - name: sando-documenter
description: Storybook stories, API documentation, JSDoc, VitePress guides
invoke_for: Documentation, stories, API reference, usage guides

commands:
location: .opencode/commands/
available: - command: /project-status
description: Comprehensive project status (git builds tests coverage)

skills:
location: .opencode/skills/
available: - name: component-creator
description: Scaffold new components with 7-file structure

requirements:
package_manager: MUST use pnpm. Do NOT use npm or yarn. Repo uses pnpm workspaces.
node_version: Requires Node.js >=20.0.0 (specified in package.json engines)
env_variables:
optional: Copy .env.example to .env.local to customize ports
default_ports: - service: Storybook
port: 6006 - service: VitePress
port: 3000
build_caching:
system: Turborepo caches build outputs
force_rebuild: - pnpm clean && pnpm build - pnpm build -- --force

ci_cd:
platform: GitHub Actions
workflows: - name: PR Validation
file: pr.yml
purpose: Runs tests lint build on PRs
behavior: Tests/lint informational only - Build blocks merge if fails - name: Documentation Deployment
file: deploy.yml
purpose: Deploys Storybook + VitePress to GitHub Pages
behavior: Runs automatically on push to master
deployment_urls: - service: Storybook
url: https://rodrigolagodev.github.io/SandoDesignSystem/storybook/ - service: Docs
url: https://rodrigolagodev.github.io/SandoDesignSystem/docs/
development_phase: - setting: PR approval
status: Not required (can self-merge) - setting: Tests/lint
status: Informational (don't block) - setting: Build failures
status: Block merge (required) - setting: NPM publishing
status: Disabled (configured for future)

framework_integration:

- framework: Vanilla HTML/JS
  usage: Direct <sando-button> usage
  notes: No setup needed
- framework: React
  usage: Import and use
  notes: See components README for TypeScript setup
- framework: Vue 3
  usage: Configure isCustomElement
  notes: In vite.config
- framework: Angular
  usage: Add CUSTOM_ELEMENTS_SCHEMA
  notes: In module
- framework: Svelte
  usage: Direct usage
  notes: No setup needed

versioning:
system: Changesets (configured but not publishing yet)
commands: - command: pnpm changeset
description: Create changeset - command: pnpm version-packages
description: Bump versions - command: pnpm release
description: Disabled - for future npm publishing
npm_publishing:
status: Currently disabled
enable_steps: - Create npm token at npmjs.com - Add NPM_TOKEN secret to GitHub repository - Re-enable release workflow if needed

key_files:

- path: turbo.json
  description: Turborepo task configuration
- path: pnpm-workspace.yaml
  description: Workspace definition
- path: packages/tokens/build/index.js
  description: Token build orchestrator
- path: packages/components/ARCHITECTURE.md
  description: Component architecture details
- path: .opencode/guidelines/GUIDELINES_INDEX.toon
  description: Complete guidelines index (TOON format)
- path: .opencode/guidelines/
  description: 27 guidelines in TOON format
- path: .opencode/agents/
  description: 6 optimized agents (orchestrator + 5 specialists)

quick_start:
setup: - pnpm install - pnpm build
development: - pnpm dev - pnpm storybook
testing: - pnpm test - pnpm test:e2e
linting: - pnpm lint - pnpm format

---

## Auto-Loaded Guidelines

The following guideline index is automatically loaded into context for agent discovery:

@.opencode/guidelines/GUIDELINES_INDEX.toon
