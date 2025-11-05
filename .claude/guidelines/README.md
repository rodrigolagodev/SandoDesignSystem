# Sando Design System Guidelines

This directory contains the centralized source of truth for all project guidelines, standards, and best practices. These guidelines are referenced by agents, skills, and commands to ensure consistency without duplication.

## Guidelines Architecture

### Purpose

Centralized guidelines provide:

- **Single source of truth** for all standardization decisions
- **Consistent formatting** across all guideline files
- **Easy maintenance** - update once, reflect everywhere
- **Clear reference system** for agents, skills, and commands
- **Alignment with project vision** and design philosophy

### Directory Structure

```
.claude/guidelines/
├── README.md                           # This file - overview and index
├── _TEMPLATE.md                        # Standard template for all guidelines
│
├── design-system/                      # ALL design-related guidelines
│   ├── visual-identity.md             # Brand, colors, typography, spacing (based on packages/tokens/src/ JSON source files)
│   ├── token-architecture.md          # 3-layer system, naming, references
│   ├── component-design.md            # Component philosophy, patterns, composition
│   ├── theming-strategy.md            # Flavors, theme switching, customization
│   ├── accessibility-standards.md     # WCAG 2.1 AA/AAA, inclusive design
│   └── design-ops.md                  # Figma-to-code, visual regression, versioning
│
├── technical-architecture/            # System architecture guidelines
│   ├── monorepo-structure.md          # Turborepo, pnpm workspaces, dependencies
│   ├── build-system.md                # Style Dictionary, Vite, build pipelines
│   ├── component-architecture.md      # Monolithic structure, 7-file pattern
│   └── framework-integration.md       # React/Vue/Angular wrappers, SSR
│
├── development-standards/             # Coding and workflow standards
│   ├── typescript-conventions.md      # Types, strict mode, naming
│   ├── lit-best-practices.md          # Web Components patterns, lifecycle
│   ├── naming-conventions.md          # Files, variables, CSS classes, tokens
│   ├── git-workflow.md                # Branching, commits, changesets
│   └── code-style.md                  # ESLint, Prettier, formatting rules
│
├── quality-assurance/                 # Testing and quality standards
│   ├── testing-strategy.md            # Unit, E2E, a11y test requirements
│   ├── accessibility-testing.md       # axe-core, screen readers, keyboard nav
│   ├── performance-standards.md       # Core Web Vitals, bundle sizes, benchmarks
│   └── security-standards.md          # XSS prevention, dependency scanning, CSP
│
└── documentation/                     # Documentation standards
    ├── api-documentation.md           # Storybook stories, TSDoc, examples
    ├── vitepress-content.md           # VitePress structure, markdown style
    └── contribution-guides.md         # RFC process, PR templates, issue triage
```

## Agent/Skills/Commands Transition Plan

Based on `skills-implementation-plan.md` and `commands-implementation-plan.md`:

### Agents Remaining (12)

Core strategic and specialized agents that require deep context and multi-step decision making:

- design-system-architect
- design-system-pm
- ui-designer
- frontend-developer
- technical-writer
- qa-expert
- devops-automation-engineer
- developer-tooling-specialist
- design-ops-specialist
- ecosystem-integration-agent
- accessibility-advocate
- agent-system-optimizer

### Becoming Skills (5)

Repetitive, automatable tasks with clear inputs/outputs:

- component-builder → `component-creator` skill
- token operations → `flavor-creator`, `recipe-creator` skills
- architecture validation → `token-architecture-validator` skill
- Testing automation → test-generator patterns in skills

### Becoming Slash Commands (3)

Analysis and information retrieval that adds intelligent value:

- Status reporting → `/project-status` command
- Component review → `/review-component` command
- Coverage analysis → `/coverage` command

## Guideline Usage

### For Agents

Agents reference guidelines in their context to:

- Understand design philosophy and brand identity
- Follow architectural patterns and conventions
- Apply consistent standards across tasks
- Make decisions aligned with project vision

**Example reference in agent prompt:**

```markdown
## Design Guidelines

Refer to `.claude/guidelines/design-system/visual-identity.md` for:

- OKLCH color system and brand palette
- Typography scale and font families
- Spacing system and grid
- Visual design principles
```

### For Skills

Skills embed guideline references to:

- Generate code following conventions
- Create tokens with correct naming
- Scaffold components with proper structure
- Validate outputs against standards

**Example in skill:**

```markdown
When creating components, follow:

- `.claude/guidelines/technical-architecture/component-architecture.md`
- `.claude/guidelines/development-standards/naming-conventions.md`
- `.claude/guidelines/design-system/token-architecture.md`
```

### For Slash Commands

Commands use guidelines to:

- Analyze code against standards
- Report deviations from conventions
- Provide context-aware recommendations
- Generate compliance reports

## Guideline Maintenance

### When to Update

- New architectural decisions
- Design system evolution
- Framework/tool version changes
- Community feedback incorporation
- Accessibility standard updates

### How to Update

1. **Edit the specific guideline file** in `.claude/guidelines/`
2. **Update version/date** in the guideline frontmatter
3. **Test with affected agents/skills/commands** to ensure references work
4. **Document the change** in the guideline's changelog section

### Benefits of Centralization

- ✅ Update once, reflect everywhere
- ✅ No agent prompt duplication
- ✅ Easier to maintain consistency
- ✅ Clear audit trail of decisions
- ✅ Faster onboarding for new contributors

## Standard Guideline Format

All guidelines follow the template in `_TEMPLATE.md`:

```markdown
---
guideline_id: unique-kebab-case-id
title: Human Readable Title
category: design-system | technical-architecture | development-standards | quality-assurance | documentation
version: 1.0.0
last_updated: 2025-11-01
status: active | draft | deprecated
applies_to: [agents, skills, commands]
related_guidelines: [list-of-related-ids]
---

# Title

## Overview

Brief description of what this guideline covers and why it exists.

## Principles

Core principles and philosophy behind these standards.

## Standards

Specific, actionable standards with examples.

## Examples

Code examples, before/after comparisons, usage patterns.

## Anti-patterns

What NOT to do, common mistakes to avoid.

## Validation

How to validate compliance with this guideline.

## References

Links to external resources, RFCs, documentation.

## Changelog

Version history of this guideline.
```

## Quick Reference

### Most Referenced Guidelines

1. **visual-identity.md** - Brand colors, typography, spacing (from packages/tokens/src/ JSON source files)
2. **token-architecture.md** - 3-layer system, Ingredients → Flavors → Recipes
3. **component-architecture.md** - Monolithic 7-file structure
4. **naming-conventions.md** - Consistent naming across tokens, components, files
5. **accessibility-standards.md** - WCAG 2.1 AA compliance requirements

### Getting Started

1. Read this README to understand the architecture
2. Review `_TEMPLATE.md` to understand guideline format
3. Explore `design-system/` for design-related standards
4. Check `technical-architecture/` for system architecture
5. Reference specific guidelines as needed in your work

## Integration with Project Plans

This guidelines architecture aligns with:

- **skills-implementation-plan.md**: Skills reference guidelines for code generation
- **commands-implementation-plan.md**: Commands analyze against guideline standards
- **action-plan.md**: Progressive release incorporates guideline compliance at each phase

## Contributing

To propose a new guideline or modify existing ones:

1. Open a discussion in the team about the proposed standard
2. Draft using `_TEMPLATE.md` format
3. Get review from relevant agent specialists (design-system-architect, ui-designer, etc.)
4. Place in appropriate category directory
5. Update this README's index
6. Update affected agents/skills/commands references

---

**Last Updated**: 2025-11-01
**Maintained By**: Design System Team
**Questions?**: Review the guideline files or consult with design-system-architect agent
