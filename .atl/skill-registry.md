# Skill Registry — Sando Design System

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules,
then injects matching blocks directly into sub-agent prompts as `## Project Standards (auto-resolved)`.
Sub-agents do NOT read this registry or individual SKILL.md files — they receive rules pre-digested.

See `.opencode/skills/_shared/skill-resolver.md` for the full resolution protocol.

---

## User Skills

| Trigger                                                                                           | Skill                            | Path                                                       |
| ------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------- |
| New component, scaffold, 7-file pattern, boilerplate                                              | `component-creator`              | `.opencode/skills/component-creator/SKILL.md`              |
| Full component workflow, create component end-to-end, no deliverable forgotten                    | `component-development-workflow` | `.opencode/skills/component-development-workflow/SKILL.md` |
| Loading state, skeleton, sando-skeleton-\*, \_renderSkeleton                                      | `skeleton-creator`               | `.opencode/skills/skeleton-creator/SKILL.md`               |
| Create agent, new agent file, OpenCode agent, configure tools                                     | `agent-creator`                  | `.opencode/skills/agent-creator/SKILL.md`                  |
| Optimize prompt, improve prompt, prompt engineering, LLM prompt                                   | `prompt-engineer`                | `.opencode/skills/prompt-engineer/SKILL.md`                |
| Create skill, new skill file, skill standard                                                      | `skill-creator`                  | `.opencode/skills/skill-creator/SKILL.md`                  |
| Update skills, skill registry, actualizar skills, update registry                                 | `skill-registry`                 | `.opencode/skills/skill-registry/SKILL.md`                 |
| judgment day, juzgar, que lo juzguen, dual review, review adversarial                             | `judgment-day`                   | `.opencode/skills/judgment-day/SKILL.md`                   |
| Create PR, open PR, pull request, preparar cambios para review                                    | `branch-pr`                      | `.opencode/skills/branch-pr/SKILL.md`                      |
| Create issue, reportar bug, feature request, GitHub issue                                         | `issue-creation`                 | `.opencode/skills/issue-creation/SKILL.md`                 |
| Inject guidelines into sub-agent, compact guidelines, token-efficient rules, pre-digested context | `agent-guidelines-compact`       | `.opencode/skills/agent-guidelines-compact/SKILL.md`       |
| Verification commands, post-work checks, done criteria, blocking thresholds, verify completion    | `verification-protocol`          | `.opencode/skills/verification-protocol/SKILL.md`          |
| Orchestrator routing, keyword→agent mapping, ask protocol, SDD gate, skill injection reference    | `orchestration-routing`          | `.opencode/skills/orchestration-routing/SKILL.md`          |
| SDD pipeline for architectural changes, explore→propose→spec→design→tasks, hybrid mode            | `sdd-architectural-workflow`     | `.opencode/skills/sdd-architectural-workflow/SKILL.md`     |

---

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as
`## Project Standards (auto-resolved)`. These are injected BEFORE task-specific instructions.

---

### component-creator

- Always ask first: component name, description, props/events/slots, variants needed
- Generate minimal 7-file structure with TODO comments — no fake implementations
- Structure: `packages/components/src/components/{name}/` with `sando-{name}.ts`, `.types.ts`, `.test.ts`, `.a11y.test.ts`, `.stories.ts`, `index.ts`, `styles/`
- Component extends `FlavorableMixin(LitElement)` — always
- Register with `@customElement('sando-{name}')` decorator
- Export barrel from `index.ts`: `export { SandoName } from './sando-{name}.js'` (`.js` extension, not `.ts`)
- Update `packages/components/src/index.ts` with new export
- Never add logic beyond what the developer explicitly requests

---

### component-development-workflow

- Follow 8 sequential steps: scaffold → tokens → implement → a11y → tests → stories → changelog → verify
- Read the guideline referenced in each step before executing that step
- Token step: verify Recipe tokens exist in `packages/tokens/src/recipes/` BEFORE writing component styles
- Never skip the verification step at the end (pnpm build + pnpm test)
- Changelog entry is MANDATORY — add to `CHANGELOG.md` under `[Unreleased]`
- Each step must complete successfully before the next begins

---

### skeleton-creator

- Skeletons are implemented as `_renderSkeleton()` private method INSIDE the component file — not a separate file
- Add `@property({ type: Boolean, reflect: true }) loading = false` to the component
- In `render()`: `return this.loading ? this._renderSkeleton() : this._renderContent()`
- Import only the skeleton primitives actually used: `sando-skeleton-text`, `sando-skeleton-avatar`, `sando-skeleton-image`, `sando-skeleton-block`
- Mirror the component's real layout structure — same grid/flex, same approximate dimensions
- Never hardcode pixel values in skeleton — use Recipe spacing tokens

---

### agent-creator

- ALL agent files MUST be in English — frontmatter, prompt, examples
- YAML frontmatter: `description`, `mode` (primary|subagent|all), `tools`, `permission`
- No XML tags in agent body — use standard markdown headings
- `mode: subagent` for specialist agents, `mode: primary` for orchestrators, `mode: all` for general
- Tools: declare only what's needed. `write: false` for read-only agents
- Permission bash: use allowlist pattern — `"*": ask` as default, then explicit `allow`/`deny`
- Agent files live in `.opencode/agents/` in the project root
- Include `## Return Envelope` section for subagents so the orchestrator can parse status

---

### prompt-engineer

- Structure: Role → Context → Task → Constraints → Output format
- One objective per prompt — split multi-goal prompts into separate calls
- Define output format explicitly (JSON, markdown, bullet list, etc.)
- Use imperative mood for instructions: "Return", "List", "Analyze" — not "Please" or "Could you"
- Include 1-2 examples when the output format is non-obvious
- Token efficiency: remove redundant preamble ("As an AI assistant, I will...")
- Negative constraints ("do NOT include X") are often more precise than positive ones

---

### skill-creator

- Skill files use YAML frontmatter + markdown body at `.opencode/skills/{name}/SKILL.md`
- Frontmatter required fields: `name`, `description` (with Trigger phrase), `license`, `metadata.version`
- Description MUST include trigger phrases — these are what the orchestrator matches
- Compact rules section is MANDATORY for every skill (used by skill-registry)
- Keep skills focused: one skill = one domain/pattern
- Include concrete examples, not generic advice
- Version bump on every significant change

---

### skill-registry

- Scan ALL skill directories: `~/.config/opencode/skills/` (global) + `.opencode/skills/` (project)
- Skip: `sdd-*`, `_shared`, `skill-registry` itself
- Generate compact rules: 5-15 lines per skill, actionable only — no motivation or backstory
- Write to `.atl/skill-registry.md` — ALWAYS, regardless of engram availability
- Save to engram with `topic_key: "skill-registry"` if available
- Add `.atl/` to `.gitignore` if not already listed

---

### judgment-day

- Launch TWO judge sub-agents via `delegate` (async, parallel — NEVER sequential via `task`)
- Each judge receives identical criteria but works independently — no cross-contamination
- Classify every warning: WARNING (real) = triggers in normal use; WARNING (theoretical) = contrived scenario
- Verdict synthesis: Confirmed = both found it; Suspect A/B = only one found it; Contradiction = disagree
- Only fix Confirmed CRITICALs and Confirmed real WARNINGs — never auto-fix suspects
- After Round 1: ASK user before fixing. After 2 fix iterations: ASK user before continuing
- NEVER declare APPROVED until re-judgment after fixes shows clean
- Fix Agent is a SEPARATE delegation — never reuse a judge as fixer

---

### branch-pr

- Branch name: `type/description` — regex `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$`
- Commit: `type(scope): description` — no Co-Authored-By, no AI attribution
- Sando CI: `pnpm build` is BLOCKING; `pnpm test` and `pnpm lint` are informational
- PR body: use `.github/PULL_REQUEST_TEMPLATE.md` as base, include Summary (1-3 bullets)
- Valid scopes: component name (button, input), `tokens`, `storybook`, `docs`, `agents`, `build`, `ci`
- Use `gh pr create --title "type(scope): desc" --body "$(cat <<'EOF'...EOF)"`

---

### issue-creation

- Search for duplicates first: `gh issue list --search "keyword"`
- Bug: title `fix(scope): description`; Feature: title `feat(scope): description`
- Required for bugs: description, steps to reproduce, expected vs actual behavior
- Required for features: problem description, proposed solution, affected area
- Sando scopes: component name, `tokens`, `flavor-*`, `storybook`, `docs`, `agents`, `build`, `ci`
- After creating: reference issue in PR body with `Closes #N`

---

### agent-guidelines-compact

- Inject SHARED block into every sub-agent prompt under `## Project Standards (auto-resolved)`
- Select agent-specific block by role: DEVELOPER, TOKENS, QUALITY, STORYBOOK, ARCHITECT, DOCUMENTER, UX_DESIGNER, UX_WRITER
- Inject both blocks BEFORE task-specific instructions — replaces the full `guidelines_protocol` block
- Sub-agents skip reading `.toon` files unless the task involves a NEW pattern or ambiguous requirements
- NOT a substitute for reading guidelines on architectural decisions — only for routine implementation tasks

---

### verification-protocol

- Inject matching agent-role section under `## Verification Protocol (auto-resolved)` in sub-agent prompts
- Agents MUST run specified commands before marking `STATUS: complete` in Return Envelope
- Blocking thresholds: lint 0 errors, typecheck 0 errors, test coverage ≥80% unit / 100% a11y, 0 axe-core violations
- STATUS mapping: `complete` = all checks pass, `partial` = some done but verification failed, `blocked` = cannot proceed
- Never mark complete without actual command run — no "I'll run it later"

---

### orchestration-routing

- Load this skill once per session BEFORE any delegation
- Check SDD Architectural Gate for every ARCHITECTURE-classified request
- Inject `agent-guidelines-compact` + `verification-protocol` into EVERY sub-agent prompt
- Use Ask Protocol template verbatim when unclear — no improvising
- Use `delegate` tool (async) for parallel work, `task` tool (sync) for sequential

---

### sdd-architectural-workflow

- Only fires when SDD Architectural Gate = YES (structural change, breaking change, guideline affecting 2+ agents)
- Mode is always `hybrid` — artifacts persist to both Engram AND `openspec/` in repo
- ALWAYS stop after Phase 2 (propose) and show proposal to user before continuing
- Phases 3 (spec + design) run in PARALLEL — use `delegate` tool, not `task`
- Do NOT start implementation until tasks.md is complete and shown to user
- sdd-archive runs only after sdd-verify returns PASS — never archive with CRITICAL issues
- change-name must be kebab-case, descriptive, and unique (e.g., `rename-recipe-token-convention`)

---

## Project Conventions

| File                   | Path                                                               | Notes                                                                        |
| ---------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Agent instructions     | `.opencode/agents/`                                                | All Sando AI agents — orchestrator + 8 specialists                           |
| Guidelines index       | `.opencode/guidelines/GUIDELINES_INDEX.toon`                       | Master index — 32 guidelines across 7 categories                             |
| Token architecture     | `.opencode/guidelines/01-design-system/TOKEN_ARCHITECTURE.toon`    | 3-layer system: Ingredients → Flavors → Recipes                              |
| Component architecture | `.opencode/guidelines/02-architecture/COMPONENT_ARCHITECTURE.toon` | 7-file pattern, Lit 3+, Shadow DOM                                           |
| Naming conventions     | `.opencode/guidelines/03-development/NAMING_CONVENTIONS.toon`      | sando-\* prefix, camelCase tokens                                            |
| WCAG compliance        | `.opencode/guidelines/04-accessibility/WCAG_COMPLIANCE.toon`       | AA minimum, axe-core validation                                              |
| Test coverage          | `.opencode/guidelines/05-quality/TEST_COVERAGE.toon`               | 80% unit + 100% a11y on interactive                                          |
| Voice & tone           | `.opencode/guidelines/07-communication/VOICE_AND_TONE.toon`        | Copy and microcopy standards                                                 |
| PR template            | `.github/PULL_REQUEST_TEMPLATE.md`                                 | Use for every PR body                                                        |
| Main components index  | `packages/components/src/index.ts`                                 | Update when adding new components                                            |
| Token recipes dir      | `packages/tokens/src/recipes/`                                     | One JSON file per component                                                  |
| Flavors dir            | `packages/tokens/src/flavors/`                                     | 7 flavors: sando, brutalist, egg-salad, kiwi, original, strawberry, tonkatsu |

Read the convention files listed above for project-specific patterns and rules.
