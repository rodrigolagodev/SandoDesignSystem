meta:
doc_id: CLAUDE
version: 5.0.0
last_updated: 2025-11-15
format: TOON
migration: "All guidelines migrated from .md (XML) to .toon format for 20-30% token optimization"

critical_instruction: |
This file provides high-level overview tech stack and definitive index of guidelines for Sando Design System. Do NOT rely on this file for architectural or development rules. This file indexes and loads official guidelines in .claude/guidelines/ directory. You MUST load and reference .toon files in .claude/guidelines/ as the non-negotiable single source of truth for all tasks analysis and code generation.

project:
name: Sando Design System
description: Modern accessible token-based design system built as monorepo using Turborepo pnpm workspaces Lit Web Components and Style Dictionary
inspiration: Named after Japanese katsu sando sandwich - metaphor for three-layer token architecture (Ingredients Flavors Recipes)

tech_stack:

- category: "Monorepo"
  tool: "Turborepo"
  version: "2.5.8"
  note: "pnpm 8.15.0 workspaces"
- category: "Components"
  tool: "Lit"
  version: "3.3.1"
  note: "Web Components"
- category: "Tokens"
  tool: "Style Dictionary"
  version: "4.0.0"
  note: "Token build system"
- category: "Build"
  tool: "Vite"
  version: "5.0.8"
  note: "Fast build tool"
- category: "Testing"
  tool: "Vitest + Playwright"
  version: "4.0.4 + 1.55.1"
  note: "Unit + E2E (@vitest/ui @vitest/coverage-v8)"
- category: "Docs"
  tool: "Storybook + VitePress"
  version: "8.6.14 + 1.6.4"
  note: "Component docs + guides"
- category: "Language"
  tool: "TypeScript"
  version: "5.9.3"
  note: "Strict mode"

progressive_disclosure:
strategy: Guidelines loaded dynamically by specialized agents when needed not pre-loaded in memory
benefits: - description: "Reduces context from 102k to ~6k tokens (94% reduction)" - description: "Increases free workspace from 16.7% to ~70%" - description: "Enables longer conversations and more complex tasks" - description: "Maintains access to all guidelines through agent-driven loading" - description: "TOON format provides additional 20-30% token reduction over XML"

guidelines:
total: 27
categories: 6
format: TOON
extension: .toon
index: "@.claude/guidelines/GUIDELINES_INDEX.toon"
note: Complete catalog with all guideline details versions owners descriptions available in GUIDELINES_INDEX.toon - Single source of truth for guideline discovery

agents:
location: .claude/agents/
total: 18
usage: Invoke via Task tool. Each agent references guidelines automatically.
core: - name: "design-system-architect" - name: "design-system-pm" - name: "ui-designer" - name: "frontend-developer" - name: "technical-writer" - name: "qa-expert" - name: "devops-automation-engineer" - name: "developer-tooling-specialist"
design_ops: - name: "design-ops-specialist" - name: "version-migration-manager" - name: "ecosystem-integration-agent" - name: "performance-monitor"
quality_architecture: - name: "security-compliance-auditor" - name: "component-composition-specialist"
community_growth: - name: "community-contribution-manager" - name: "analytics-insights-agent" - name: "localization-i18n-specialist" - name: "accessibility-advocate"

commands:

- command: "/project-status"
  description: "Comprehensive project status (git builds tests coverage)"

skills:

- name: "component-creator"
  description: "Scaffold new components with 7-file structure"
- name: "command-creator"
  description: "Create new slash commands following Sando's Golden Rule"
- name: "skill-creator"
  description: "Create new skills with progressive disclosure"

requirements:
package_manager: MUST use pnpm. Do NOT use npm or yarn. Repo uses pnpm workspaces.
node_version: Requires Node.js >=20.0.0 (specified in package.json engines)
env_variables:
optional: Copy .env.example to .env.local to customize ports
default_ports: - service: "Storybook"
port: 6006 - service: "VitePress"
port: 3000
build_caching:
system: Turborepo caches build outputs
force_rebuild: - command: "pnpm clean && pnpm build" - command: "pnpm build -- --force"

ci_cd:
platform: GitHub Actions
workflows: - name: "PR Validation"
file: "pr.yml"
purpose: "Runs tests lint build on PRs"
behavior: "Tests/lint informational only - Build blocks merge if fails" - name: "Documentation Deployment"
file: "deploy.yml"
purpose: "Deploys Storybook + VitePress to GitHub Pages"
behavior: "Runs automatically on push to master"
deployment_urls: - service: "Storybook"
url: "httpss://rodrigolagodev.github.io/SandoDesignSystem/storybook/" - service: "Docs"
url: "httpss://rodrigolagodev.github.io/SandoDesignSystem/docs/"
development_phase: - setting: "PR approval"
status: "Not required (can self-merge)" - setting: "Tests/lint"
status: "Informational (don't block)" - setting: "Build failures"
status: "Block merge (required)" - setting: "NPM publishing"
status: "Disabled (configured for future)"

framework_integration:

- framework: "Vanilla HTML/JS"
  usage: "Direct <sando-button> usage"
  notes: "No setup needed"
- framework: "React"
  usage: "Import and use"
  notes: "See components README for TypeScript setup"
- framework: "Vue 3"
  usage: "Configure isCustomElement"
  notes: "In vite.config"
- framework: "Angular"
  usage: "Add CUSTOM_ELEMENTS_SCHEMA"
  notes: "In module"
- framework: "Svelte"
  usage: "Direct usage"
  notes: "No setup needed"

versioning:
system: Changesets (configured but not publishing yet)
commands: - command: "pnpm changeset"
description: "Create changeset" - command: "pnpm version-packages"
description: "Bump versions" - command: "pnpm release"
description: "Disabled - for future npm publishing"
npm_publishing:
status: Currently disabled
enable_steps: - step: "Create npm token at npmjs.com" - step: "Add NPM_TOKEN secret to GitHub repository" - step: "Re-enable release workflow if needed"

key_files:

- path: "turbo.json"
  description: "Turborepo task configuration"
- path: "pnpm-workspace.yaml"
  description: "Workspace definition"
- path: "packages/tokens/build/index.js"
  description: "Token build orchestrator"
- path: "packages/components/ARCHITECTURE.md"
  description: "Component architecture details"
- path: ".claude/guidelines/GUIDELINES_INDEX.toon"
  description: "Complete guidelines index (TOON format)"
- path: ".claude/guidelines/"
  description: "27 guidelines in TOON format (.toon extension)"
- path: ".claude/agents/"
  description: "18 specialized agents (5 core updated for TOON format)"

---

## Auto-Loaded Guidelines

The following guideline is automatically loaded into context:

@.claude/guidelines/GUIDELINES_INDEX.toon
