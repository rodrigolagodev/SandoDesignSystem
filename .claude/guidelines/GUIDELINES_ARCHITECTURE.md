# Guidelines Architecture

**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-02

---

## Purpose

This document defines the **centralized guidelines architecture** for the Sando Design System. It establishes a single source of truth for all project standardization, ensuring consistency across agents, skills, slash commands, and developer workflows.

**Core Principle**: Guidelines are centralized and referenced, never duplicated. When a guideline changes, it changes once.

---

## Guidelines Directory Structure

All guidelines are stored in `.claude/guidelines/` with a strict naming convention:

```
.claude/guidelines/
├── GUIDELINES_INDEX.md              # Master index and navigation
├── 01-design-system/                # ALL design-related guidelines
│   ├── DESIGN_IDENTITY.md           # Visual identity and brand philosophy (EXISTING)
│   ├── TOKEN_ARCHITECTURE.md        # Three-layer token system (Ingredients/Flavors/Recipes)
│   ├── COLOR_SYSTEM.md              # OKLCH color space, palettes, semantic colors
│   ├── TYPOGRAPHY_SYSTEM.md         # Type scale, font families, line heights
│   ├── SPACING_SYSTEM.md            # Spatial rhythm, grid system
│   ├── COMPONENT_DESIGN.md          # Component design patterns and variants
│   ├── THEMING_STRATEGY.md          # Flavor switching, theme creation
│   └── MOTION_DESIGN.md             # Animation principles, transitions, timing
├── 02-architecture/                 # Technical architecture patterns
│   ├── MONOREPO_STRUCTURE.md        # Turborepo, pnpm workspaces, build order
│   ├── COMPONENT_ARCHITECTURE.md    # Monolithic component structure (7-file pattern)
│   ├── TOKEN_BUILD_SYSTEM.md        # Style Dictionary orchestrator, custom transforms
│   └── FRAMEWORK_INTEGRATION.md     # React, Vue, Angular, Svelte usage
├── 03-development/                  # Coding standards and workflows
│   ├── CODE_STYLE.md                # TypeScript strict mode, ESLint, Prettier
│   ├── NAMING_CONVENTIONS.md        # Component names (sando-*), files, variables
│   ├── GIT_WORKFLOW.md              # Branching, commits, changesets, versioning
│   └── TESTING_STRATEGY.md          # Unit (Vitest), E2E (Playwright), coverage targets
├── 04-accessibility/                # WCAG and inclusive design
│   ├── WCAG_COMPLIANCE.md           # AA/AAA standards, ARIA patterns
│   ├── KEYBOARD_NAVIGATION.md       # Focus management, tab order, shortcuts
│   ├── SCREEN_READER_SUPPORT.md     # Semantic HTML, ARIA labels, live regions
│   └── COLOR_CONTRAST.md            # Contrast ratios, colorblind-safe palettes
├── 05-quality/                      # Quality assurance standards
│   ├── TEST_COVERAGE.md             # Coverage targets (85%+), test types
│   ├── PERFORMANCE_BUDGETS.md       # Bundle size, Core Web Vitals, Lighthouse
│   ├── SECURITY_STANDARDS.md        # XSS prevention, CSP, dependency scanning
│   └── VISUAL_REGRESSION.md         # Screenshot testing, diff thresholds
└── 06-documentation/                # Documentation standards
    ├── API_REFERENCE.md             # Props, slots, events, CSS variables
    ├── STORYBOOK_STORIES.md         # Story structure, controls, docs blocks
    ├── VITEPRESS_GUIDES.md          # Tutorial format, code examples
    └── INLINE_CODE_DOCS.md          # JSDoc, type annotations, comments
```

---

## Guideline Categories

### 01. Design System (Consolidated Design Guidelines)

**Purpose**: ALL design-related guidelines in one category - visual identity, tokens, components, theming, motion.

**Why consolidated**: Design decisions are interconnected. Token architecture informs color system, which affects theming, which influences component design. Keeping these together ensures designers and developers see the complete picture.

**Key Guidelines**:
- `DESIGN_IDENTITY.md` - Brand philosophy, visual identity, design principles (EXISTING)
- `TOKEN_ARCHITECTURE.md` - Three-layer system rules, reference integrity
- `COLOR_SYSTEM.md` - OKLCH rationale, palette generation, semantic mapping
- `TYPOGRAPHY_SYSTEM.md` - Type scale math, font loading, responsive typography
- `SPACING_SYSTEM.md` - 4px base unit, comfortable/compact modes
- `COMPONENT_DESIGN.md` - Variant patterns, size scales, state design
- `THEMING_STRATEGY.md` - Flavor creation, CSS variable overrides
- `MOTION_DESIGN.md` - Easing curves, duration scales, accessibility preferences

**Referenced by**: `ui-designer` agent, `design-ops-specialist` agent, `component-creator` skill, `flavor-creator` skill

---

### 02. Architecture

**Purpose**: Technical architecture patterns and build system configuration.

**Key Guidelines**:
- `MONOREPO_STRUCTURE.md` - Package organization, Turborepo caching, build order
- `COMPONENT_ARCHITECTURE.md` - 7-file monolithic pattern, Shadow DOM, Lit patterns
- `TOKEN_BUILD_SYSTEM.md` - Style Dictionary config, custom transforms, output formats
- `FRAMEWORK_INTEGRATION.md` - Web Component usage in React/Vue/Angular/Svelte

**Referenced by**: `design-system-architect` agent, `developer-tooling-specialist` agent, `frontend-developer` agent

---

### 03. Development

**Purpose**: Day-to-day coding standards and development workflows.

**Key Guidelines**:
- `CODE_STYLE.md` - TypeScript config, linting rules, formatting
- `NAMING_CONVENTIONS.md` - `sando-*` prefix, file naming, variable naming, token naming
- `GIT_WORKFLOW.md` - Conventional commits, changesets, release process
- `TESTING_STRATEGY.md` - Test pyramid, mocking patterns, test organization

**Referenced by**: `frontend-developer` agent, `qa-expert` agent, `/review-component` command, `/test-component` command

---

### 04. Accessibility

**Purpose**: WCAG compliance and inclusive design standards.

**Key Guidelines**:
- `WCAG_COMPLIANCE.md` - AA/AAA checklist, testing tools (axe-core), audit process
- `KEYBOARD_NAVIGATION.md` - Focus visible, tab order, escape/enter patterns
- `SCREEN_READER_SUPPORT.md` - Semantic HTML, ARIA usage, testing with NVDA/JAWS
- `COLOR_CONTRAST.md` - 4.5:1 normal text, 3:1 large text, tools (Contrast Checker)

**Referenced by**: `accessibility-advocate` agent (if retained), `qa-expert` agent, `frontend-developer` agent, `/check-a11y` command

---

### 05. Quality

**Purpose**: Quality gates and non-functional requirements.

**Key Guidelines**:
- `TEST_COVERAGE.md` - 85% unit, 80% E2E, 100% a11y for public components
- `PERFORMANCE_BUDGETS.md` - 50kb/component, LCP <2.5s, CLS <0.1
- `SECURITY_STANDARDS.md` - CSP headers, npm audit CI, XSS prevention checklist
- `VISUAL_REGRESSION.md` - Percy/Chromatic setup, diff tolerance, review workflow

**Referenced by**: `qa-expert` agent, `performance-monitor` agent, `security-compliance-auditor` agent, `/coverage` command, `/perf` command

---

### 06. Documentation

**Purpose**: Documentation format standards for consistency.

**Key Guidelines**:
- `API_REFERENCE.md` - Property tables, event documentation, CSS variable listings
- `STORYBOOK_STORIES.md` - Story naming, controls setup, MDX docs blocks
- `VITEPRESS_GUIDES.md` - Tutorial structure, code snippet formatting, frontmatter
- `INLINE_CODE_DOCS.md` - JSDoc format, type annotations, helpful comments

**Referenced by**: `technical-writer` agent, `frontend-developer` agent, `/document-component` command

---

## Guideline File Format Standard

All guideline files follow this template:

```markdown
# [Guideline Title]

**Category**: [01-design-system / 02-architecture / 03-development / 04-accessibility / 05-quality / 06-documentation]
**Version**: [Semantic version]
**Status**: [Draft / Active / Deprecated]
**Last Updated**: [YYYY-MM-DD]
**Owner**: [Agent/Role responsible for maintaining this guideline]

---

## Purpose

[1-2 sentences explaining what this guideline covers and why it exists]

---

## Core Principles

[3-5 numbered principles that are non-negotiable]

1. Principle one
2. Principle two
3. Principle three

---

## Standards

### [Standard Category 1]

[Detailed explanation with examples]

**Required**:
- Item 1
- Item 2

**Recommended**:
- Item 3
- Item 4

**Code Example**:
```typescript
// Good
const example = "follows standard";

// Bad
const example = "violates standard";
```

### [Standard Category 2]

[Continue pattern...]

---

## Tools and Automation

[List of tools, linters, scripts, or skills that enforce this guideline]

- Tool 1: [Purpose]
- Skill: `skill-name` - [What it automates]
- Command: `/command-name` - [What it checks]

---

## Validation Checklist

[Bulleted checklist that can be used to verify compliance]

- [ ] Checklist item 1
- [ ] Checklist item 2
- [ ] Checklist item 3

---

## Examples

### Example 1: [Good Example Title]

[Code or screenshot showing correct implementation]

### Example 2: [Bad Example Title]

[Code or screenshot showing violation, with explanation of why it's wrong]

---

## Related Guidelines

[Links to other guidelines that are related or dependent]

- [GUIDELINE_NAME.md](../category/GUIDELINE_NAME.md) - [Relationship description]

---

## Changelog

- **1.0.0** (2025-11-02): Initial guideline created
- **1.1.0** (2025-11-15): Added section X based on team feedback
```

---

## Agent Transition and Guideline Usage

Based on the implementation plans, the agent/skill/command ecosystem will transition as follows:

### Agents That Remain (12)

These agents **reference** guidelines but do NOT duplicate content:

1. **design-system-architect** → References: 01-design-system (all), 02-architecture (all)
2. **design-system-pm** → References: All categories for roadmap planning
3. **ui-designer** → References: 01-design-system (all), 04-accessibility (all)
4. **frontend-developer** → References: 01-design-system (tokens), 02-architecture, 03-development, 04-accessibility
5. **technical-writer** → References: 06-documentation (all), 01-design-system (for API context)
6. **qa-expert** → References: 03-development (testing), 04-accessibility, 05-quality
7. **devops-automation-engineer** → References: 02-architecture (build), 05-quality (CI gates)
8. **developer-tooling-specialist** → References: 02-architecture, 03-development
9. **design-ops-specialist** → References: 01-design-system, 02-architecture (tokens)
10. **ecosystem-integration-agent** → References: 02-architecture (framework integration)
11. **performance-monitor** → References: 05-quality (performance budgets)
12. **security-compliance-auditor** → References: 05-quality (security standards)

### Agents Becoming Skills (5)

These skills **enforce** specific guidelines programmatically:

1. **component-creator** (from component-builder) → Enforces: 02-architecture/COMPONENT_ARCHITECTURE.md, 03-development/NAMING_CONVENTIONS.md
2. **flavor-creator** → Enforces: 01-design-system/TOKEN_ARCHITECTURE.md (Flavors layer)
3. **recipe-creator** → Enforces: 01-design-system/TOKEN_ARCHITECTURE.md (Recipes layer)
4. **token-architecture-validator** → Validates: 01-design-system/TOKEN_ARCHITECTURE.md (reference integrity)
5. **accessibility-validator** → Validates: 04-accessibility (all guidelines)

### Agents Becoming Commands (3)

These commands **analyze** against guidelines:

1. **/review-component** → Checks against: 02-architecture, 03-development, 04-accessibility
2. **/check-a11y** → Checks against: 04-accessibility (all)
3. **/coverage** → Checks against: 05-quality/TEST_COVERAGE.md

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

**Goal**: Establish guideline infrastructure and migrate design guidelines

1. Create `.claude/guidelines/` directory structure
2. Create `GUIDELINES_INDEX.md` (master navigation)
3. Move existing `DESIGN_IDENTITY.md` to `01-design-system/`
4. Create remaining `01-design-system/` guidelines:
   - TOKEN_ARCHITECTURE.md
   - COLOR_SYSTEM.md
   - TYPOGRAPHY_SYSTEM.md
   - SPACING_SYSTEM.md
   - COMPONENT_DESIGN.md
   - THEMING_STRATEGY.md
   - MOTION_DESIGN.md

**Success Criteria**: All design guidelines consolidated and following standard format

---

### Phase 2: Architecture & Development (Weeks 3-4)

**Goal**: Document technical architecture and development standards

1. Create `02-architecture/` guidelines:
   - MONOREPO_STRUCTURE.md
   - COMPONENT_ARCHITECTURE.md
   - TOKEN_BUILD_SYSTEM.md
   - FRAMEWORK_INTEGRATION.md

2. Create `03-development/` guidelines:
   - CODE_STYLE.md
   - NAMING_CONVENTIONS.md
   - GIT_WORKFLOW.md
   - TESTING_STRATEGY.md

**Success Criteria**: Technical standards documented and agents updated to reference them

---

### Phase 3: Quality & Accessibility (Weeks 5-6)

**Goal**: Establish quality gates and accessibility standards

1. Create `04-accessibility/` guidelines:
   - WCAG_COMPLIANCE.md
   - KEYBOARD_NAVIGATION.md
   - SCREEN_READER_SUPPORT.md
   - COLOR_CONTRAST.md

2. Create `05-quality/` guidelines:
   - TEST_COVERAGE.md
   - PERFORMANCE_BUDGETS.md
   - SECURITY_STANDARDS.md
   - VISUAL_REGRESSION.md

**Success Criteria**: Quality gates defined, accessibility checklist available

---

### Phase 4: Documentation & Skills Integration (Weeks 7-8)

**Goal**: Complete documentation standards and integrate with skills/commands

1. Create `06-documentation/` guidelines:
   - API_REFERENCE.md
   - STORYBOOK_STORIES.md
   - VITEPRESS_GUIDES.md
   - INLINE_CODE_DOCS.md

2. Update skills to reference guidelines:
   - `component-creator` → COMPONENT_ARCHITECTURE.md
   - `flavor-creator` → TOKEN_ARCHITECTURE.md
   - `token-architecture-validator` → TOKEN_ARCHITECTURE.md

3. Update commands to analyze against guidelines:
   - `/review-component` → Multiple guidelines
   - `/check-a11y` → Accessibility guidelines

**Success Criteria**: Complete guideline coverage, skills/commands integrated

---

## Guidelines Maintenance

### Ownership Model

Each guideline has an **owner** responsible for:
- Keeping content up-to-date
- Reviewing proposed changes
- Ensuring consistency with project direction

**Ownership assignments**:
- `01-design-system/` → UI Designer + Design System Architect
- `02-architecture/` → Design System Architect
- `03-development/` → Frontend Developer + Developer Tooling Specialist
- `04-accessibility/` → QA Expert (accessibility focus)
- `05-quality/` → QA Expert + Performance Monitor + Security Auditor
- `06-documentation/` → Technical Writer

---

### Change Process

1. **Propose Change**: Create GitHub issue or RFC
2. **Review**: Guideline owner reviews impact
3. **Update**: Modify guideline file (semantic versioning)
4. **Notify**: Update GUIDELINES_INDEX.md changelog
5. **Validate**: Check that referencing agents/skills/commands still work

---

### Versioning

Guidelines use semantic versioning:
- **Major (2.0.0)**: Breaking changes that require agent updates
- **Minor (1.1.0)**: New sections or standards added
- **Patch (1.0.1)**: Clarifications or typo fixes

---

## Reference System for Agents

Agents reference guidelines using this pattern in their prompt files:

```markdown
## Guidelines

This agent follows these guidelines:

- **[TOKEN_ARCHITECTURE.md](../../guidelines/01-design-system/TOKEN_ARCHITECTURE.md)**: Three-layer token system rules
- **[COMPONENT_ARCHITECTURE.md](../../guidelines/02-architecture/COMPONENT_ARCHITECTURE.md)**: 7-file monolithic component pattern
- **[WCAG_COMPLIANCE.md](../../guidelines/04-accessibility/WCAG_COMPLIANCE.md)**: Accessibility standards (AA/AAA)

When making decisions, consult these guidelines first. Do NOT duplicate guideline content in this agent file.
```

This ensures:
- **Single source of truth**: Guideline content lives in one place
- **Easy updates**: Change guideline once, all agents get update
- **Clear traceability**: Know which standards apply to each agent

---

## Success Metrics

### Quantitative
- **Guideline coverage**: 100% of standardization topics covered
- **Reference adoption**: All 12 agents reference guidelines (0% duplication)
- **Skill integration**: 5 skills enforcing guidelines programmatically
- **Command integration**: 3 commands analyzing against guidelines
- **Update efficiency**: Guideline changes propagate without agent edits

### Qualitative
- **Developer clarity**: New contributors can find standards easily
- **Consistency**: All components follow same patterns
- **Maintainability**: Changing a standard doesn't require mass agent updates

---

## Next Steps

1. **Review this architecture** with the team
2. **Create GUIDELINES_INDEX.md** (master navigation file)
3. **Begin Phase 1**: Consolidate design guidelines
4. **Iterate**: Adjust categories and format based on usage

---

## Related Documents

- [skills-implementation-plan.md](../../skills-implementation-plan.md) - Skills replacing agents
- [commands-implementation-plan.md](../../commands-implementation-plan.md) - Slash commands strategy
- [action-plan.md](../../action-plan.md) - Overall project roadmap
- [.claude/agents/team-agents-analysis.md](../agents/team-agents-analysis.md) - Current agent team
