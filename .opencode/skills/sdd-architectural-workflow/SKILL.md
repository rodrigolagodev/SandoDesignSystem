---
name: sdd-architectural-workflow
description: >-
  Spec-Driven Development pipeline for architectural changes in Sando Design
  System. Runs explore → propose → spec → design → tasks phases BEFORE any
  implementation is delegated. Mode: hybrid (Engram + openspec/ filesystem).
  Trigger: loaded by the orchestrator when the SDD Architectural Gate fires —
  i.e., when a change is classified as architectural (breaking change, new
  pattern, token system restructure, guideline affecting 2+ agents).

license: MIT
metadata:
  version: 1.0.0
  author: Sando Design System
---

# SDD Architectural Workflow

This skill defines the full Spec-Driven Development pipeline for architectural
changes. The orchestrator runs these phases sequentially BEFORE delegating
implementation to specialist agents.

**Mode: `hybrid`** — artifacts persist to both Engram AND `openspec/` in the
repo so decisions are traceable in git history.

---

## When This Workflow Fires

The orchestrator triggers this workflow when the SDD Architectural Gate (in
`orchestration-routing`) evaluates to YES:

- Token system structural changes (new layer, renaming conventions)
- New component patterns (new mixin, new composition approach)
- Guidelines change affecting 2+ agents or 3+ components
- Breaking changes (public API removal/rename, token naming changes)
- New or structurally modified Flavor

---

## Phase 0: Init Check

Before running the pipeline, verify SDD is initialized for this project:

```
Search engram: mem_search("sdd-init/sandodesignsystem", project: "sandodesignsystem")
IF found → proceed to Phase 1
IF not found → run sdd-init skill first (mode: hybrid), THEN proceed
```

---

## Phase 1: Explore

**Agent:** `sdd-explore` (global skill at `~/.config/opencode/skills/sdd-explore/SKILL.md`)
**Mode:** `hybrid`
**Input:** change name (kebab-case), problem description

Delegate with:

```
## Task for sdd-explore

### Context
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid

### Requirements
Investigate: {problem description}
Read the real codebase — do NOT guess.
Save exploration to: openspec/changes/{change-name}/exploration.md
Persist to Engram with topic_key: sdd/{change-name}/explore

### Deliverables
- [ ] openspec/changes/{change-name}/exploration.md
- [ ] Engram artifact sdd/{change-name}/explore
- [ ] Return Envelope with Current State, Affected Areas, Approaches, Recommendation
```

**Wait for Return Envelope.** Extract recommendation before Phase 2.

---

## Phase 2: Propose

**Agent:** `sdd-propose` (global skill at `~/.config/opencode/skills/sdd-propose/SKILL.md`)
**Mode:** `hybrid`
**Input:** change name, exploration result

Delegate with:

```
## Task for sdd-propose

### Context
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
Exploration: [paste Return Envelope from Phase 1]

### Requirements
Create proposal based on exploration recommendation.
Size budget: under 450 words.
Save to: openspec/changes/{change-name}/proposal.md
Persist to Engram with topic_key: sdd/{change-name}/proposal

### Deliverables
- [ ] openspec/changes/{change-name}/proposal.md
- [ ] Engram artifact sdd/{change-name}/proposal
- [ ] Capabilities section filled (contract with sdd-spec)
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

**Run in parallel** — both consume the proposal, they don't depend on each other.

**Agent A:** `sdd-spec`
**Agent B:** `sdd-design`
**Mode:** `hybrid`

Delegate both simultaneously with `delegate` tool (async):

```
## Task for sdd-spec
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
[Read proposal from Engram: sdd/{change-name}/proposal]
Size budget: under 650 words.
Save specs to: openspec/changes/{change-name}/specs/
Persist to Engram: sdd/{change-name}/spec
```

```
## Task for sdd-design
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
[Read proposal from Engram: sdd/{change-name}/proposal]
Size budget: under 800 words.
Save to: openspec/changes/{change-name}/design.md
Persist to Engram: sdd/{change-name}/design
```

Wait for both Return Envelopes.

---

## Phase 4: Tasks

**Agent:** `sdd-tasks`
**Mode:** `hybrid`
**Input:** spec + design artifacts

Delegate with:

```
## Task for sdd-tasks
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
[Read from Engram: sdd/{change-name}/spec + sdd/{change-name}/design]
Size budget: under 530 words.
Save to: openspec/changes/{change-name}/tasks.md
Persist to Engram: sdd/{change-name}/tasks
```

---

## Phase 5: Handoff to Implementation

After tasks are created, **hand off to the orchestrator's normal workflow**:

```
## SDD Phases Complete — Ready for Implementation

**Change:** {change-name}
**Artifacts:**
- openspec/changes/{change-name}/proposal.md ✅
- openspec/changes/{change-name}/specs/ ✅
- openspec/changes/{change-name}/design.md ✅
- openspec/changes/{change-name}/tasks.md ✅

**Implementation tasks ready:**
[list Phase 1 tasks from tasks.md]

**Next:** Delegate Phase 1 tasks to the appropriate specialist agents
following the task breakdown. Use sdd-apply for implementation guidance.
```

The orchestrator then routes each task to the correct specialist:

- Token tasks → `sando-tokens`
- Component tasks → `sando-developer`
- Test tasks → `sando-quality`
- etc.

---

## Phase 6: Verify + Archive (post-implementation)

After ALL implementation tasks are complete and verified by `sando-quality`:

**Verify with sdd-verify:**

```
## Task for sdd-verify
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
[Read all artifacts from Engram]
Run tests. Build spec compliance matrix.
Save report to: openspec/changes/{change-name}/verify-report.md
```

**If PASS → Archive with sdd-archive:**

```
## Task for sdd-archive
Project: sandodesignsystem
Change name: {change-name}
Artifact store mode: hybrid
Sync delta specs to openspec/specs/
Move change to: openspec/changes/archive/YYYY-MM-DD-{change-name}/
```

**If FAIL → Fix → Re-verify** (do not archive until PASS).

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
- ALWAYS stop after Phase 2 (propose) and show proposal to user before continuing
- Phases 3 (spec + design) run in PARALLEL — use `delegate` tool, not `task`
- Do NOT start implementation until tasks.md is complete and shown to user
- sdd-archive runs only after sdd-verify returns PASS — never archive with CRITICAL issues
- change-name must be kebab-case, descriptive, and unique (e.g., `rename-recipe-token-convention`)
