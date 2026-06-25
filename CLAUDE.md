# Sando Design System — Claude Code

## Agentic Workflow

This project uses a multi-agent workflow with a central orchestrator and 8 specialist agents. All agent definitions live in `.claude/agents/`.

### Entry Point

Always start with **`sando-orchestrator`** for any Sando DS task. It classifies the request, loads routing rules, and delegates to the correct specialist agent.

```
sando-orchestrator (coordinator)
├── sando-architect    → Architecture, patterns, SDD pipeline
├── sando-tokens       → Token system (Ingredients/Flavors/Recipes)
├── sando-developer    → Web Component implementation (Lit 3+)
├── sando-quality      → Tests, accessibility, guideline validation
├── sando-storybook    → Storybook configuration and stories
├── sando-documenter   → JSDoc, MDX guides, API reference
├── sando-ux-designer  → UX patterns, states, behavior specs
└── sando-ux-writer    → Copy, microcopy, content
```

### Project Knowledge

- **Design language**: `.opencode/SANDO_DESIGN_LANGUAGE.md`
- **Guidelines (32 TOON files)**: `.opencode/guidelines/`
- **Skills** (routing, verification, SDD pipeline): `.opencode/skills/`
- **Decisions log**: `.opencode/decisions/`

### Token Architecture

Three-layer system:
- **L1 Ingredients** — primitives (`packages/tokens/src/ingredients/`)
- **L2 Flavors** — themes (`packages/tokens/src/flavors/`)
- **L3 Recipes** — component tokens (`packages/tokens/src/recipes/`)

Components consume ONLY L3 Recipe tokens via CSS custom properties.

### Component Structure (7-File Pattern)

Every component in `packages/components/src/components/{name}/`:
```
sando-{name}.ts           # Lit 3 component (FlavorableMixin)
sando-{name}.types.ts     # TypeScript types
sando-{name}.test.ts      # Vitest unit tests (≥80% coverage)
sando-{name}.a11y.test.ts # axe-core accessibility tests
sando-{name}.stories.ts   # Storybook CSF 3.0 stories
index.ts                  # Barrel export
styles/                   # Modular CSS (Recipe tokens only)
```

### Git Conventions

Commit format: `type(scope): description`
- No Co-Authored-By trailers
- No AI attribution in commits or PRs
- Git write commands require explicit user confirmation

### Key Commands

```bash
pnpm tokens:build    # Build Style Dictionary tokens
pnpm lint            # ESLint
pnpm typecheck       # TypeScript check
pnpm test            # Vitest
pnpm docs:dev        # Storybook dev server
pnpm docs:build      # Storybook build
```
