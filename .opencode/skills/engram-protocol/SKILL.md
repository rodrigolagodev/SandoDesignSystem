---
name: engram-protocol
description: >-
  Engram persistent memory protocol for Sando Design System sub-agents.
  Defines WHEN to save, WHAT to save, HOW to tag observations, and HOW to
  search memory before starting work. Inject into every sub-agent prompt
  alongside agent-guidelines-compact and verification-protocol.
  Trigger: injected by the orchestrator into every specialist sub-agent.

license: MIT
metadata:
  version: 1.0.0
  author: Sando Design System
---

# Engram Protocol — Sando Design System

Persistent memory rules for specialist sub-agents. This protocol is MANDATORY
and ALWAYS ACTIVE once injected. Do NOT wait for instructions to save.

---

## Part 1 — SEARCH FIRST (Before Starting Any Work)

**Before writing any code or making any change**, search memory for prior context:

```
SEARCH TRIGGERS (run ALL that apply):
├── Working on component X?  → mem_search("component/{x}", project: "sandodesignsystem")
├── Working on tokens?       → mem_search("token/{layer}", project: "sandodesignsystem")
├── Fixing a bug?            → mem_search("bug/{component}", project: "sandodesignsystem")
├── Applying a pattern?      → mem_search("pattern/{name}", project: "sandodesignsystem")
└── General context?         → mem_search("{task keywords}", project: "sandodesignsystem")
```

**Progressive Disclosure** — Engram uses a 3-step pattern for memory retrieval:

```
Step 1: mem_search(query, project) → returns 300-char previews
Step 2: mem_timeline(session_id)   → returns full session context (if you need broader picture)
Step 3: mem_get_observation(id)    → returns full untruncated content of a single observation
```

**When to use each step:**

- `mem_search` → **always first** — find relevant observations by keyword
- `mem_timeline` → when you need the **full context** of a session, not just one observation
- `mem_get_observation` → when a preview looks relevant and you need the **complete content**

Do NOT skip the search to "save time". A prior session may have solved this exact problem.

---

## Part 2 — SAVE TRIGGERS (Mandatory — Do NOT Wait to Be Asked)

Call `mem_save` IMMEDIATELY after any of these events:

| Event                                 | What to save                                            |
| ------------------------------------- | ------------------------------------------------------- |
| Component implemented / feature added | What was built, files changed, non-obvious decisions    |
| Bug fixed                             | Root cause, what broke, how fixed, affected files       |
| Pattern established                   | Pattern name, why it was chosen, where it applies       |
| Token work completed                  | What tokens changed, layer, naming rationale            |
| Build/config issue resolved           | Command that fixed it, what was wrong                   |
| A11y issue discovered or fixed        | Violation type, component, fix applied                  |
| Non-obvious behavior found            | What the surprise was, where it lives                   |
| Story authoring decision              | CSF pattern used, why argTypes were configured that way |
| Guideline clarification applied       | Which guideline, what the correct interpretation was    |

**Self-check after EVERY deliverable:**

> "Did I make a decision, fix something, learn something non-obvious, or establish a convention?"
> If YES → call `mem_save` NOW, before returning the Return Envelope.

---

## Part 3 — TAG TAXONOMY (Mandatory — Always Tag Correctly)

Every observation saved by a Sando sub-agent SHOULD use a `topic_key` from this taxonomy.
The taxonomy is a **GUIDE**, not a rigid constraint. Tags should be deterministic — the same
thing always gets the same tag.

**When the taxonomy doesn't fit**: call `mem_suggest_topic_key(title, type)` to generate a
stable key dynamically. This is the fallback for topics that don't map cleanly to the
categories below (e.g., cross-cutting concerns, tooling decisions, workflow changes).

### Primary Tags

```
component/{name}
  └── Work on a specific component
  └── Examples: component/button, component/dialog, component/checkbox
  └── Use for: implementations, bug fixes, feature additions

token/ingredient
  └── Work on L1 Ingredient tokens
  └── Use for: new color scales, spacing values, typography

token/flavor/{name}
  └── Work on a specific L2 Flavor
  └── Examples: token/flavor/sando, token/flavor/nori
  └── Use for: new flavors, flavor overrides, dark mode tokens

token/recipe/{component}
  └── Work on L3 Recipe tokens for a component
  └── Examples: token/recipe/button, token/recipe/dialog
  └── Use for: new component recipes, token additions

pattern/{name}
  └── A reusable pattern established or clarified
  └── Examples: pattern/flavorable-mixin, pattern/compound-component
  └── Use for: conventions that should be followed in future work

bug/{component}
  └── A bug found and fixed
  └── Examples: bug/dialog-popover, bug/focus-ring
  └── Use for: root causes, gotchas, regression risks

config/{tool}
  └── Configuration of build tools, test runners, etc.
  └── Examples: config/style-dictionary, config/vitest, config/storybook
  └── Use for: non-obvious config changes, env setup

guideline/{area}
  └── A guideline clarification or newly established convention
  └── Examples: guideline/token-naming, guideline/aria-pattern
  └── Use for: when correct behavior was ambiguous and resolved

sdd/{change-name}/{phase}
  └── SDD pipeline artifacts (reserved for sando-architect and orchestrator)
  └── Examples: sdd/rename-token-convention/explore
  └── Use for: explore, proposal, spec, design, tasks, verify-report
```

### Compound Tags (when work spans multiple areas)

If work touches multiple areas, pick the **most specific** primary tag.
Add context in the content's **Where** field.

```
Bug in dialog component that required token fix:
  → topic_key: "bug/dialog-popover"   (bug is the primary type)
  → content.Where: "dialog component + token/recipe/dialog"

New component with full token set:
  → topic_key: "component/accordion"  (component is primary)
  → content.Where: "sando-accordion.ts + token/recipe/accordion"
```

---

## Part 4 — SAVE FORMAT (Structured Content)

Every `mem_save` call MUST use this format:

```
mem_save(
  title: "{Verb} {What} — {short searchable description}",
  type: "{bugfix | pattern | decision | discovery | config | architecture}",
  topic_key: "{tag from taxonomy above}",
  project: "sandodesignsystem",
  scope: "project",
  content: "
    **What**: {one sentence — what was done or found}
    **Why**: {what caused this — user request, bug, requirement}
    **Where**: {exact file paths affected, comma-separated}
    **Learned**: {gotchas, edge cases, non-obvious things — omit if none}
  "
)
```

### Title Conventions

| Type         | Title pattern             | Example                                   |
| ------------ | ------------------------- | ----------------------------------------- |
| bugfix       | "Fixed {what} in {where}" | "Fixed Popover z-index in dialog"         |
| pattern      | "Pattern: {name}"         | "Pattern: FlavorableMixin usage"          |
| decision     | "Decision: {topic}"       | "Decision: dialog width API"              |
| discovery    | "Discovered {what}"       | "Discovered Vitest shadow DOM limitation" |
| config       | "Configured {tool}"       | "Configured Style Dictionary for recipes" |
| architecture | "Architecture: {topic}"   | "Architecture: compound tab component"    |
| feature      | "Implemented {what}"      | "Implemented sando-accordion"             |

### Type Reference

| Type           | When to use                                               |
| -------------- | --------------------------------------------------------- |
| `bugfix`       | A bug was found and fixed                                 |
| `pattern`      | A reusable pattern was established or clarified           |
| `decision`     | An architectural or API decision was made                 |
| `discovery`    | A non-obvious behavior was found in the codebase or tools |
| `config`       | Build tool or environment configuration changed           |
| `architecture` | System-level design decision (usually from sdd pipeline)  |
| `feature`      | New component or capability implemented                   |

---

## Part 5 — UPSERT RULES (Avoid Duplicates)

Before saving an observation about a topic that probably has prior memory:

```
1. mem_search(topic_key, project: "sandodesignsystem") → check for existing
2. IF found AND same topic → use mem_update(id: {existing_id}, content: "{updated}")
3. IF not found → use mem_save with the topic_key
```

**When to upsert vs new save:**

| Situation                                         | Action                             |
| ------------------------------------------------- | ---------------------------------- |
| Adding to an existing component's knowledge       | upsert (same topic_key)            |
| New bug in a component that already has bug notes | new save (different type)          |
| Clarifying an established pattern                 | upsert (same topic_key)            |
| New pattern discovered                            | new save                           |
| Second fix to same bug                            | upsert (update root cause section) |

---

## Part 6 — PASSIVE CAPTURE (Safety Net)

After completing a long or complex task, call `mem_capture_passive` with your task output.
This tool automatically extracts structured learnings from text containing a
`## Key Learnings:` section. It's a safety net — catches knowledge you might have
forgotten to save explicitly.

**When to use:**

- After completing a multi-step implementation
- After resolving a complex debugging session
- After any task where you produced a detailed report or summary
- Before returning your Return Envelope on complex tasks

**How to use:**

```
mem_capture_passive(
  content: "{your task output or summary — include a '## Key Learnings:' section}",
  project: "sandodesignsystem",
  source: "subagent-{your-role}"
)
```

Duplicates are automatically detected and skipped — safe to call multiple times.

---

## Part 7 — QUICK REFERENCE

```
BEFORE WORK (Progressive Disclosure):
  mem_search("{component or topic}", project: "sandodesignsystem")
  mem_timeline(session_id)         ← if you need broader session context
  mem_get_observation(id)          ← if preview is relevant, get full content

AFTER WORK (mandatory):
  mem_save(title, type, topic_key, project, content)
  OR
  mem_update(id, content) ← if updating existing

SAFETY NET (after complex tasks):
  mem_capture_passive(content, project, source) ← extracts missed learnings

TOPIC_KEY:
  Taxonomy first → mem_suggest_topic_key fallback if taxonomy doesn't fit

TOPIC_KEY EXAMPLES:
  component/button          ← button work
  token/recipe/dialog       ← dialog recipe tokens
  bug/checkbox-focus        ← focus bug in checkbox
  pattern/compound-tabs     ← tabs compound pattern
  config/storybook-lit      ← Storybook/Lit config
  guideline/recipe-naming   ← token naming convention
  sdd/refactor-tokens/spec  ← SDD spec artifact
```

---

## Compact Rules (for skill-registry)

- Inject this skill into every sub-agent prompt (after agent-guidelines-compact)
- Sub-agents MUST search memory BEFORE starting work on any component or token
- Sub-agents MUST save after EVERY deliverable — do not batch saves
- topic_key SHOULD come from the taxonomy — use `mem_suggest_topic_key` as fallback for edge cases
- Use `mem_update` when updating an existing observation about the same topic
- `sdd/` prefix is reserved for sando-architect and orchestrator only
- Save to `project: "sandodesignsystem"` always — never omit the project field
- Use 3-step Progressive Disclosure: `mem_search` → `mem_timeline` → `mem_get_observation`
- Use `mem_capture_passive` after long tasks to extract learnings you may have missed
