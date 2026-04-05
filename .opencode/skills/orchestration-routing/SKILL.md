---
name: orchestration-routing
description: >-
  Routing table, classification protocol, and ask protocol for the Sando
  Orchestrator. Extracted from the orchestrator to reduce its context size.
  Contains the keyword → agent mapping, multi-agent workflow definitions,
  skill injection reference, and the SDD architectural gate. Trigger: loaded
  once per session by the orchestrator before any delegation.

license: MIT
metadata:
  version: 1.0.0
  author: Sando Design System
---

# Orchestration Routing

Routing intelligence for the Sando Orchestrator. This skill replaces the inline
`classification_system`, `ask_protocol`, `delegation_protocol`, and
`multi_agent_workflows` sections.

---

## Automatic Routing Table

Scan the user request for keywords and route immediately:

| Keywords Detected                                                                                   | Classification | Route To            |
| --------------------------------------------------------------------------------------------------- | -------------- | ------------------- |
| `token`, `color`, `spacing`, `typography`, `flavor`, `ingredient`, `recipe`, `theme`, `--sando-`    | TOKEN_WORK     | `sando-tokens`      |
| `implement`, `component`, `fix bug`, `add feature`, `refactor`, `Lit`, `render`, `@property`        | COMPONENT_CODE | `sando-developer`   |
| `test`, `coverage`, `a11y`, `accessibility`, `axe`, `WCAG`, `audit`, `quality`, `validate`          | QUALITY_WORK   | `sando-quality`     |
| `story`, `stories`, `storybook`, `argTypes`, `controls`, `addon`, `CSF`, `preview.ts`               | STORYBOOK_WORK | `sando-storybook`   |
| `document`, `docs`, `JSDoc`, `VitePress`, `README`, `API reference`, `guide`                        | DOCUMENTATION  | `sando-documenter`  |
| `architecture`, `pattern`, `structure`, `breaking change`, `decision`, `RFC`, `ADR`, `build system` | ARCHITECTURE   | `sando-architect`   |
| `UX`, `user experience`, `states`, `behavior`, `flow`, `empty state`, `error message`, `motion`     | UX_DESIGN      | `sando-ux-designer` |
| `copy`, `microcopy`, `write text`, `tagline`, `changelog entry`, `content audit`, `tone`            | UX_WRITING     | `sando-ux-writer`   |
| `create component`, `new component`, `scaffold`, `build [component-name]`                           | FULL_WORKFLOW  | Multi-agent         |

### Classification Protocol

```
1. READ the user's request
2. SCAN for keywords above
3. MATCH to a classification
4. IF single classification → DELEGATE IMMEDIATELY (Task tool)
5. IF multiple classifications → plan multi-agent workflow
6. IF no match or unclear → ASK THE USER
```

---

## SDD Architectural Gate

**Before delegating ARCHITECTURE requests**, check if the change is architectural:

```
IS THIS ARCHITECTURAL?
├── Modifies token system layers (new layer, renames, structural changes)? → YES
├── Introduces a new component pattern (new mixin, new composition approach)? → YES
├── Changes a guideline that affects 2+ agents or 3+ components? → YES
├── Is a breaking change (removes/renames public API, changes token naming)? → YES
├── Adds or modifies a Flavor (theme)? → YES (if structural, not just values)
└── Everything else (new component, bug fix, new token values, new story) → NO
```

**If YES → Run SDD Workflow FIRST, then delegate implementation:**

```
Load skill: sdd-architectural-workflow
Execute: SDD pipeline (explore → propose → spec → design → tasks)
ONLY AFTER all SDD phases complete → delegate implementation to specialists
```

**If NO → Route normally** using the routing table above.

---

## Ask Protocol

Use this template when the request is unclear:

```
No puedo determinar automáticamente qué agente debe manejar esta tarea.

**Tu solicitud:** "[quote]"

**Mi duda:** [why unclear]

**Opciones:**
1. Si quieres [A] → delegaré a `[agent]`
2. Si quieres [B] → delegaré a `[agent]`

¿Cuál es tu intención?
```

**When to ask instead of delegate:**

- No keyword matches
- 2+ agents could handle it equally
- Scope is ambiguous ("fix the button" — fix what?)
- New territory not covered by any agent

**Cardinal rule:**

```
IF IN DOUBT → ASK
IF NOT IN DOUBT → DELEGATE
IF TEMPTED TO DO IT YOURSELF → YOU ARE IN DOUBT → ASK
```

---

## Skill Injection Reference

When delegating, always inject compact rules from `.atl/skill-registry.md`:

| If delegating to...                       | Inject these skills                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| **Any agent (always)**                    | `agent-guidelines-compact` (SHARED + role block), `verification-protocol` |
| `sando-developer` for a **new component** | + `component-creator`, `component-development-workflow`                   |
| `sando-developer` for a **loading state** | + `skeleton-creator`                                                      |
| `sando-developer` for any component work  | + `component-creator` (structural rules always useful)                    |
| Any agent creating a **PR**               | + `branch-pr`                                                             |
| Any agent creating a **GitHub issue**     | + `issue-creation`                                                        |

**Judgment Day:** inject compact rules for ALL skills relevant to the files being reviewed.

---

## Standard Delegation Prompt Format

```
## Task for [agent-name]

### Context
[Relevant background — what exists, what's needed]

### Requirements
[Specific list of what to accomplish]

### Deliverables
- [ ] File or outcome 1
- [ ] File or outcome 2

### Constraints
[Any rules or limitations]
```

---

## Multi-Agent Workflows

### Full Component Creation

```
USER: "Create a Checkbox component"

1. Create TODO list with phases
2. Load skill registry (Step 0) — inject component-creator + component-development-workflow
3. DELEGATE sando-tokens → Create Recipe tokens
4. WAIT — check Return Envelope STATUS
5. DELEGATE sando-developer → Implement component
   Inject: component-creator + component-development-workflow
6. WAIT — check Return Envelope STATUS
7. PARALLEL DELEGATE (delegate tool — true async):
   - sando-quality → Write tests
   - sando-storybook → Write stories
8. WAIT for all — check both Return Envelopes
9. IF any STATUS = partial/blocked → fix before continuing
10. DELEGATE sando-quality → Final validation
11. Report summary to user
```

### Component Modification

```
USER: "Add a loading state to Button"

1. Check if token changes needed (quick read)
2. If tokens needed → DELEGATE sando-tokens first
3. WAIT — check Return Envelope STATUS
4. DELEGATE sando-developer → Add feature (inject skeleton-creator if loading state)
5. WAIT — check Return Envelope STATUS
6. PARALLEL DELEGATE: sando-quality + sando-storybook
7. WAIT for all — check Return Envelopes
8. Report summary
```

### Token + Component Change

```
USER: "Add a new primary-alt color and use it in Card"

1. DELEGATE sando-tokens → Create token
2. WAIT for completion
3. DELEGATE sando-developer → Update component
4. Report summary
```

---

## Parallelization Rules

**CAN run in parallel:** Tests + Stories (after component exists), multiple independent components,
documentation for different components.

**MUST run sequentially:** Tokens → Component, Component → Tests, Architecture decision →
Implementation.

---

## Compact Rules (for skill-registry)

- Load this skill once per session BEFORE any delegation
- Check SDD Architectural Gate for every ARCHITECTURE-classified request
- Inject `agent-guidelines-compact` + `verification-protocol` into EVERY sub-agent prompt
- Use Ask Protocol template verbatim when unclear — no improvising
- Use `delegate` tool (async) for parallel work, `task` tool (sync) for sequential
