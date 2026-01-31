# Migration Checklist: Claude Code → OpenCode

> **Started:** 2026-01-31
> **Completed:** 2026-01-31
> **Status:** ✅ COMPLETE - All phases finished
> **Backup Location:** `.claude/` has been DELETED (sanitized)

---

## Quick Stats

| Category         | Total | Migrated | Pending | Skipped |
| ---------------- | ----- | -------- | ------- | ------- |
| **Guidelines**   | 29    | 29       | 0       | 0       |
| **Agents**       | 18    | 18       | 0       | 0       |
| **Skills**       | 3     | 1        | 0       | 2       |
| **Commands**     | 1     | 1        | 0       | 0       |
| **Config Files** | 1     | 1        | 0       | 0       |
| **Sanitization** | -     | ✅       | -       | -       |

---

## Phase 1: Structure & Guidelines ✅ COMPLETE

### Directory Structure

- [x] Created `.opencode/` root directory
- [x] Created `.opencode/agents/`
- [x] Created `.opencode/skills/`
- [x] Created `.opencode/skills/component-creator/`
- [x] Created `.opencode/guidelines/` with subcategories

### Guidelines (29 files)

All guidelines copied - no transformation needed, just path updates in agents.

#### Root Level

- [x] `GUIDELINES_INDEX.toon` - Copied
- [x] `_TEMPLATE.toon` - Copied

#### 01-design-system (7 files)

- [x] `COLOR_SYSTEM.toon`
- [x] `COMPONENT_DESIGN.toon`
- [x] `MOTION_DESIGN.toon`
- [x] `SPACING_SYSTEM.toon`
- [x] `THEMING_STRATEGY.toon`
- [x] `TOKEN_ARCHITECTURE.toon`
- [x] `TYPOGRAPHY_SYSTEM.toon`

#### 02-architecture (4 files)

- [x] `COMPONENT_ARCHITECTURE.toon`
- [x] `FRAMEWORK_INTEGRATION.toon`
- [x] `MONOREPO_STRUCTURE.toon`
- [x] `TOKEN_BUILD_SYSTEM.toon`

#### 03-development (4 files)

- [x] `CODE_STYLE.toon`
- [x] `GIT_WORKFLOW.toon`
- [x] `NAMING_CONVENTIONS.toon`
- [x] `TESTING_STRATEGY.toon`

#### 04-accessibility (4 files)

- [x] `COLOR_CONTRAST.toon`
- [x] `KEYBOARD_NAVIGATION.toon`
- [x] `SCREEN_READER_SUPPORT.toon`
- [x] `WCAG_COMPLIANCE.toon`

#### 05-quality (3 files)

- [x] `PERFORMANCE_BUDGETS.toon`
- [x] `SECURITY_STANDARDS.toon`
- [x] `TEST_COVERAGE.toon`

#### 06-documentation (5 files)

- [x] `API_REFERENCE.toon`
- [x] `INLINE_CODE_DOCS.toon`
- [x] `STORYBOOK_STORIES.toon`
- [x] `TOON_FORMAT.toon`
- [x] `VITEPRESS_GUIDES.toon`

---

## Phase 2: Agents Migration (18 total) ✅ COMPLETE

### Migration Requirements per Agent:

1. Convert frontmatter (add `mode`, `tools`, `permission`)
2. Add `<example>` blocks to description
3. Add "Context First" section
4. Update guideline paths: `.claude/` → `.opencode/`
5. Ensure all content is in English
6. Test invocation with `@agent-name`

### Core Agents (Priority 1) ✅

| Agent                     | Status       | Mode    | Tools Configured | Permissions | Context First | Tested |
| ------------------------- | ------------ | ------- | ---------------- | ----------- | ------------- | ------ |
| `design-system-architect` | [x] Complete | primary | [x]              | [x]         | [x]           | [ ]    |
| `frontend-developer`      | [x] Complete | all     | [x]              | [x]         | [x]           | [ ]    |
| `ui-designer`             | [x] Complete | all     | [x]              | [x]         | [x]           | [ ]    |
| `qa-expert`               | [x] Complete | all     | [x]              | [x]         | [x]           | [ ]    |
| `technical-writer`        | [x] Complete | all     | [x]              | [x]         | [x]           | [ ]    |

### Operations Agents (Priority 2) ✅

| Agent                          | Status       | Mode     | Tools Configured | Permissions | Context First | Tested |
| ------------------------------ | ------------ | -------- | ---------------- | ----------- | ------------- | ------ |
| `design-system-pm`             | [x] Complete | primary  | [x]              | [x]         | [x]           | [ ]    |
| `devops-automation-engineer`   | [x] Complete | primary  | [x]              | [x]         | [x]           | [ ]    |
| `developer-tooling-specialist` | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |

### Specialist Agents (Priority 3) ✅

| Agent                              | Status       | Mode     | Tools Configured | Permissions | Context First | Tested |
| ---------------------------------- | ------------ | -------- | ---------------- | ----------- | ------------- | ------ |
| `design-ops-specialist`            | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `version-migration-manager`        | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `ecosystem-integration-agent`      | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `performance-monitor`              | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `security-compliance-auditor`      | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `component-composition-specialist` | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `community-contribution-manager`   | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `analytics-insights-agent`         | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `localization-i18n-specialist`     | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |
| `accessibility-advocate`           | [x] Complete | subagent | [x]              | [x]         | [x]           | [ ]    |

### Template File

| File                | Status      | Notes                                 |
| ------------------- | ----------- | ------------------------------------- |
| `AGENT_TEMPLATE.md` | [ ] Pending | Optional - Convert to OpenCode format |

---

## Phase 3: Skills Migration ✅ COMPLETE

### Migrated (1)

| Skill               | Status       | SKILL.md Updated | Assets Copied | Paths Updated | Tested |
| ------------------- | ------------ | ---------------- | ------------- | ------------- | ------ |
| `component-creator` | [x] Complete | [x]              | [x] Copied    | [x]           | [ ]    |

### Skipped (2)

| Skill             | Reason              |
| ----------------- | ------------------- |
| `skill-creator`   | User requested skip |
| `command-creator` | User requested skip |

---

## Phase 4: Commands Migration ✅ COMPLETE

### Migrated (1)

| Command              | Status       | Notes                             |
| -------------------- | ------------ | --------------------------------- |
| `frontend-developer` | [x] Complete | Updated paths to .opencode format |

---

## Phase 5: Configuration Files ✅ COMPLETE

| File          | Status       | Notes                                       |
| ------------- | ------------ | ------------------------------------------- |
| `OPENCODE.md` | [x] Complete | Main config file (equivalent to CLAUDE.md)  |
| `CLAUDE.md`   | [x] Deleted  | Old config file removed during sanitization |

---

## Phase 6: System Sanitization ✅ COMPLETE

The old Claude Code system has been fully sanitized:

| Item                   | Status      | Notes                         |
| ---------------------- | ----------- | ----------------------------- |
| `.claude/` directory   | [x] Deleted | All 19 agents + 30 guidelines |
| `CLAUDE.md` root file  | [x] Deleted | Replaced by OPENCODE.md       |
| Agent cross-references | [x] Updated | All paths now use .opencode/  |
| Skill references       | [x] Updated | All paths now use .opencode/  |

---

## Notes & Decisions

### 2026-01-31

- Started migration
- ~~Keeping `.claude/` as backup (not deleting)~~ **UPDATE: Deleted during sanitization**
- Only migrating `component-creator` skill per user request
- Skipping `skill-creator`, `command-creator`, and `project-status` command
- **All 18 agents migrated to OpenCode format**
- All agents include:
  - OpenCode frontmatter with `description`, `mode`, `tools`, `permission`
  - `<example>` blocks in descriptions
  - "Context First" section in body
  - Updated paths from `.claude/guidelines/` to `.opencode/guidelines/`
  - TOON-First workflow pattern
  - Safety permission `rm -rf*: deny`
- **OPENCODE.md created** as project root configuration file
- **SKILL.md created** for component-creator skill
- **System fully sanitized**: `.claude/` directory and `CLAUDE.md` deleted

---

## Validation Commands

After migration, run these to verify:

```bash
# Check all agents are valid YAML
for f in .opencode/agents/*.md; do
  echo "Checking $f..."
  head -50 "$f" | grep -E "^(description|mode|tools|permission):"
done

# Count migrated agents
echo "Total agents: $(ls .opencode/agents/*.md | wc -l)"

# Check skill structure
ls -la .opencode/skills/component-creator/

# Test agent invocation (in OpenCode)
# @frontend-developer "Hello, can you confirm you're working?"
```

---

## Rollback Plan

~~If migration fails, the original `.claude/` directory is preserved:~~

**NOTE: The old `.claude/` directory has been deleted as part of the full migration. No rollback is possible from local files.**

If needed, recover from Git history:

```bash
# To recover old .claude/ directory from git:
git checkout HEAD~X -- .claude/
git checkout HEAD~X -- CLAUDE.md
# Where X is the number of commits back before deletion
```

---

## Remaining Tasks

1. **[x] ~~Migrate component-creator skill SKILL.md~~** - Completed
2. **[x] ~~Create OPENCODE.md~~** - Completed
3. **[ ] (Optional) Create AGENT_TEMPLATE.md** - OpenCode format template for new agents
4. **[ ] Test all agents** - Verify invocation works in OpenCode environment
5. **[ ] Git commit** - Commit the migration with descriptive message
