---
name: sdd-architectural-workflow
description: >-
  Spec-Driven Development pipeline for architectural changes in Sando Design
  System. Runs explore → propose → spec → design → tasks phases BEFORE any
  implementation is delegated. Mode: hybrid (Engram + openspec/ filesystem).
  Trigger: loaded by the orchestrator when the SDD Architectural Gate fires —
  i.e., when a change is classified as architectural (breaking change, new
  pattern, token system restructure, guideline affecting 2+ agents).
  NOTE: sando-architect IS the domain expert for all SDD phases in this project.
  Generic sdd-* phase agents are used only for persistence boilerplate.

license: MIT
metadata:
  version: 2.0.0
  author: Sando Design System
---

# SDD Architectural Workflow — Sando Design System

This skill defines the full Spec-Driven Development pipeline for architectural
changes **in the Sando Design System context**.

**Key principle:** `sando-architect` is the domain expert who DRIVES all phases.
The SDD phase skills (`sdd-explore`, `sdd-spec`, etc.) handle PERSISTENCE
boilerplate. Implementation is ALWAYS delegated to the appropriate Sando
specialist — never to the generic `sdd-apply`.

**Mode: `hybrid`** — artifacts persist to both Engram AND `openspec/` in the
repo so decisions are traceable in git history.

---

## When This Workflow Fires

The orchestrator triggers this workflow when the SDD Architectural Gate evaluates to YES:

- Token system structural changes (new layer, renaming conventions)
- New component patterns (new mixin, new composition approach)
- Guidelines change affecting 2+ agents or 3+ components
- Breaking changes (public API removal/rename, token naming changes)
- New or structurally modified Flavor

For anything that does NOT hit the gate → route normally through the routing table.

---

## Agent Roles in This Pipeline

| Phase     | Who drives it     | Who persists it                     |
| --------- | ----------------- | ----------------------------------- |
| Explore   | `sando-architect` | `sdd-explore` skill (via architect) |
| Propose   | `sando-architect` | `sdd-propose` skill (via architect) |
| Spec      | `sando-architect` | `sdd-spec` skill (via architect)    |
| Design    | `sando-architect` | `sdd-design` skill (via architect)  |
| Tasks     | `sando-architect` | `sdd-tasks` skill (via architect)   |
| Implement | Sando specialists | Their own Return Envelopes          |
| Verify    | `sando-quality`   | `sdd-verify` skill (via quality)    |
| Archive   | orchestrator      | `sdd-archive` skill                 |

`sando-architect` loads the SDD phase skills to follow their persistence protocol.
It does NOT launch separate sub-agents for each phase — it IS the executor.

---

## Phase 0: Init Check

Before running the pipeline, verify SDD is initialized for this project:

```
Search engram: mem_search("sdd-init/sandodesignsystem", project: "sandodesignsystem")
IF found → proceed to Phase 1
IF not found → save a minimal sdd-init entry and proceed:
  mem_save(title: "sdd-init/sandodesignsystem", topic_key: "sdd-init/sandodesignsystem",
           type: "architecture", project: "sandodesignsystem",
           content: "Project: sandodesignsystem\nStack: Lit 3+, TypeScript 5+, Web Components\nMode: hybrid\nTokens: packages/tokens/\nComponents: packages/components/\nSpecs: openspec/\n")
```

---

## Phase 1: Explore

**Executor:** `sando-architect`
**Skill to load:** `sdd-explore` (from `.opencode/skills/sdd-explore/SKILL.md`)

Delegate to `sando-architect` with:

```
## Task for sando-architect

### Context
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
SDD Phase: EXPLORE

Load skill: .opencode/skills/sdd-explore/SKILL.md

### Requirements
Investigate: {problem description}
Read the real codebase — consult .opencode/guidelines/ as needed.
Produce the Exploration artifact following sdd-explore skill format.
Save exploration to: openspec/changes/{change-name}/exploration.md
Persist to Engram with topic_key: sdd/{change-name}/explore

### Deliverables
- [ ] openspec/changes/{change-name}/exploration.md
- [ ] Engram artifact sdd/{change-name}/explore
- [ ] Return Envelope: Current State, Affected Areas, Approaches, Recommendation
```

**Wait for Return Envelope.** Extract recommendation before Phase 2.

---

## Phase 2: Propose

**Executor:** `sando-architect`
**Skill to load:** `sdd-propose` (from `.opencode/skills/sdd-propose/SKILL.md`)

Delegate to `sando-architect` with:

```
## Task for sando-architect

### Context
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
SDD Phase: PROPOSE

Load skill: .opencode/skills/sdd-propose/SKILL.md

Exploration result: [paste Return Envelope from Phase 1]

### Requirements
Create proposal based on exploration recommendation.
Size budget: under 450 words.
Save to: openspec/changes/{change-name}/proposal.md
Persist to Engram with topic_key: sdd/{change-name}/proposal
Capabilities section MUST be filled — it is the contract with sdd-spec.

### Deliverables
- [ ] openspec/changes/{change-name}/proposal.md
- [ ] Engram artifact sdd/{change-name}/proposal
- [ ] Capabilities section filled (New + Modified)
- [ ] Rollback plan included
- [ ] Success criteria defined
```

**STOP — Show proposal to user. Ask for approval before continuing.**

```
He completado la propuesta para `{change-name}`.

📄 Guardada en: openspec/changes/{change-name}/proposal.md

**Resumen:**
- Intent: {one-line from proposal}
- Scope: {N deliverables}
- Risk: {Low/Medium/High}

¿Aprobás la propuesta para continuar con spec + design?
```

---

## Phase 3: Spec + Design (parallel)

**Run in parallel** — both are executed by `sando-architect` loading the respective skills.
Use the `delegate` tool (async) for true parallelism.

**Delegation A — Spec:**

```
## Task for sando-architect (SPEC phase)

Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
SDD Phase: SPEC

Load skill: .opencode/skills/sdd-spec/SKILL.md

[Read proposal from Engram: sdd/{change-name}/proposal]
Size budget: under 650 words.
Save specs to: openspec/changes/{change-name}/specs/
Persist to Engram: sdd/{change-name}/spec
```

**Delegation B — Design:**

```
## Task for sando-architect (DESIGN phase)

Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
SDD Phase: DESIGN

Load skill: .opencode/skills/sdd-design/SKILL.md

[Read proposal from Engram: sdd/{change-name}/proposal]
Size budget: under 800 words.
Save to: openspec/changes/{change-name}/design.md
Persist to Engram: sdd/{change-name}/design
Include Sando-specific sections: Token Layer Impact, Component Impact, Guideline Changes Needed
```

Wait for both Return Envelopes.

---

## Phase 4: Tasks

**Executor:** `sando-architect`
**Skill to load:** `sdd-tasks` (from `.opencode/skills/sdd-tasks/SKILL.md`)

Delegate to `sando-architect` with:

```
## Task for sando-architect (TASKS phase)

Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
SDD Phase: TASKS

Load skill: .opencode/skills/sdd-tasks/SKILL.md

[Read from Engram: sdd/{change-name}/spec + sdd/{change-name}/design]
Size budget: under 530 words.
Save to: openspec/changes/{change-name}/tasks.md
Persist to Engram: sdd/{change-name}/tasks

IMPORTANT: tag each task with the Sando specialist that will implement it:
  [sando-tokens], [sando-developer], [sando-quality], [sando-storybook], etc.
```

---

## Phase 5: Handoff to Implementation

After tasks are created, route each task to the correct Sando specialist.
**NEVER use sdd-apply for implementation in this project.**

```
## SDD Phases Complete — Ready for Implementation

**Change:** {change-name}
**Artifacts:**
- openspec/changes/{change-name}/proposal.md ✅
- openspec/changes/{change-name}/specs/ ✅
- openspec/changes/{change-name}/design.md ✅
- openspec/changes/{change-name}/tasks.md ✅

**Implementation routing (from tasks.md):**
- [sando-tokens] tasks → delegate to sando-tokens
- [sando-developer] tasks → delegate to sando-developer
- [sando-quality] tasks → delegate to sando-quality
- [sando-storybook] tasks → delegate to sando-storybook
```

The orchestrator then routes each task using the standard routing table.
Each specialist receives the relevant tasks + context from `design.md`.

---

## Phase 6: Verify + Archive (post-implementation)

After ALL implementation tasks are complete:

**Verify with sando-quality (loading sdd-verify skill):**

```
## Task for sando-quality

Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
SDD Phase: VERIFY

Load skill: .opencode/skills/sdd-verify/SKILL.md

[Read all artifacts from Engram]
Run: pnpm lint && pnpm typecheck && pnpm test
Build spec compliance matrix.
Save report to: openspec/changes/{change-name}/verify-report.md
```

**If PASS → Archive:**

```bash
# The orchestrator runs sdd-archive skill directly:
Load skill: .opencode/skills/sdd-archive/SKILL.md
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
Sync delta specs to openspec/specs/
Move change to: openspec/changes/archive/YYYY-MM-DD-{change-name}/
```

**If FAIL → delegate fix to the appropriate Sando specialist → re-verify.**

---

## Artifact Map

```
openspec/
├── changes/
│   ├── {change-name}/          ← Active change
│   │   ├── exploration.md
│   │   ├── proposal.md
│   │   ├── specs/
│   │   │   └── {domain}/spec.md
│   │   ├── design.md
│   │   ├── tasks.md
│   │   └── verify-report.md
│   └── archive/
│       └── YYYY-MM-DD-{change-name}/  ← Completed change
└── specs/
    └── {domain}/spec.md        ← Source of truth (merged from deltas)
```

---

## Compact Rules (for skill-registry)

- Only fires when SDD Architectural Gate = YES (structural change, breaking change, guideline affecting 2+ agents)
- Mode is always `hybrid` — artifacts persist to both Engram AND `openspec/` in repo
- `sando-architect` is the executor of ALL SDD phases (explore → tasks)
- `sando-architect` loads each phase's SDD skill for persistence protocol
- NEVER use `sdd-apply` for implementation — route tasks to the correct Sando specialist
- ALWAYS stop after Phase 2 (propose) and show proposal to user before continuing
- Phases 3 (spec + design) run in PARALLEL — use `delegate` tool, not `task`
- Do NOT start implementation until tasks.md is complete and shown to user
- sdd-archive runs only after sando-quality + sdd-verify returns PASS
- change-name must be kebab-case, descriptive, unique (e.g., `rename-recipe-token-convention`)
- Each task in tasks.md MUST be tagged with the Sando specialist responsible
