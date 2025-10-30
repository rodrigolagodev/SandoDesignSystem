---
name: command-creator
description: Creates slash commands for Claude Code following Sando Design System's Golden Rule. Only creates commands that add intelligent value over bash commands (analysis, insights, multi-source aggregation, troubleshooting). Use when user requests a new slash command, wants to automate a workflow, or needs a shortcut for repetitive tasks.
allowed-tools: Read, Write, Edit, Glob, Bash
---

# Command Creator Skill

This skill generates **slash commands** for Claude Code that follow the Sando Design System philosophy: **only create commands that justify their token cost by adding intelligent value**.

## 🎯 GOLDEN RULE: Command Justification

Before creating ANY slash command, validate against this criterion:

```
┌────────────────────────────────────────────────────────────┐
│  ¿ESTE SLASH COMMAND JUSTIFICA EL COSTO DE TOKENS?         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ❌ NO si solo ejecuta un comando bash                     │
│     - Wrapper tonto de package.json script                 │
│     - No agrega análisis ni contexto                       │
│     - Ejemplo: /build → pnpm build                         │
│     - Acción: Usar bash directamente (gratis)              │
│                                                             │
│  ✅ SÍ si agrega valor inteligente:                        │
│     ✓ Combina múltiples fuentes de información             │
│     ✓ Analiza e interpreta resultados                      │
│     ✓ Genera recomendaciones con IA                        │
│     ✓ Provee contexto que requiere inteligencia            │
│     ✓ Debugging o troubleshooting automático               │
│     ✓ Ejemplo: /status → git + builds + tests + análisis   │
│                                                             │
│  ✅ SÍ si es shortcut de skill (conveniencia):             │
│     ✓ /new-component es más rápido que frase completa      │
│     ✓ Invoca skill explícitamente                          │
│     ✓ Workflow frecuente que merece shortcut               │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

## 📋 Validation Checklist

Before creating a command, ask these 4 questions:

### 1. ¿Ya existe un script en package.json que hace esto?

```bash
# Check package.json scripts
cat package.json | grep -A 50 '"scripts"'
```

- **SÍ existe script** → ❌ NO crear comando, usar bash directamente
- **NO existe script** → ✅ Continuar evaluación

### 2. ¿El comando agrega análisis/inteligencia sobre bash?

- **NO agrega valor** → ❌ NO crear comando
- **SÍ agrega valor** → ✅ Continuar evaluación

### 3. ¿Combina múltiples fuentes o provee insights?

- **NO combina fuentes** → ⚠️  Probablemente no vale la pena
- **SÍ combina fuentes** → ✅ Probablemente sí vale la pena

### 4. ¿El usuario necesita interpretación de resultados?

- **NO necesita interpretación** → ❌ Bash es suficiente
- **SÍ necesita interpretación** → ✅ Comando justificado

## 📁 Command File Structure

Slash commands are stored in `.claude/commands/category-name/command-name.md`:

```
.claude/commands/
├── status/
│   ├── status.md              # /status command
│   ├── coverage.md            # /coverage command
│   └── why-failing.md         # /why-failing command
├── review/
│   ├── component.md           # /review-component command
│   ├── tokens.md              # /review-tokens command
│   └── a11y.md                # /review-a11y command
└── new/
    ├── component.md           # /new-component command
    ├── flavor.md              # /new-flavor command
    └── variant.md             # /add-variant command
```

## 📝 Command Template

Every command file must follow this structure:

```markdown
---
description: Brief description of what the command does (shown in /help)
allowed-tools: Tool1, Tool2, Tool3
argument-hint: [arg-name (optional)]  # If command accepts arguments
---

Brief introduction explaining what this command does.

# Section 1: Data Gathering

Explain what information to collect and from where.

# Section 2: Analysis

Explain how to interpret and analyze the data.

# Section 3: Recommendations

Explain what actionable recommendations to provide.

# Output Format

Show example output format with emojis and structure.
```

## ✅ Examples of GOOD Commands (Add Value)

### Example 1: `/status` - Multi-Source Analysis

**Why it's good:**
- ✅ Combines git status + build artifacts + test results + coverage
- ✅ Analyzes timestamps to detect stale builds
- ✅ Generates actionable recommendations
- ✅ Cannot be replicated with single bash command

**Command structure:**

```markdown
---
description: Show comprehensive project status (git, builds, tests, coverage)
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git log:*), Read, Glob
---

Show comprehensive status for Sando Design System.

# Git Status
Current branch: !`git branch --show-current`
Git status: !`git status --short`
Last commit: !`git log -1 --oneline`

# Build Status
Check build artifacts:
- @sando/tokens: Check if dist/sando-tokens/ exists and is recent
- @sando/components: Check if dist/ exists and is recent

Compare timestamps with source files to detect stale builds.

# Analysis & Recommendations
Based on status, provide actionable recommendations:
- ✅ "Ready to develop" (all builds fresh, tests passing)
- ⚠️  "Run `pnpm build` (tokens modified, components need rebuild)"
- ❌ "Fix failing tests before continuing"
```

### Example 2: `/coverage` - Intelligent Insights

**Why it's good:**
- ✅ Parses complex JSON coverage reports
- ✅ Identifies files below threshold (<85%)
- ✅ Prioritizes what to test first (impact-based)
- ✅ Generates estimated effort (test cases needed)

### Example 3: `/review-component <name>` - 50+ Criteria Checklist

**Why it's good:**
- ✅ Validates 7 mandatory files against checklist
- ✅ Checks token consumption (Recipes layer only)
- ✅ Validates WCAG 2.1 AA compliance
- ✅ Analyzes test coverage across unit/E2E/a11y
- ✅ Cannot be done with grep/find alone

### Example 4: `/new-component <name>` - Skill Shortcut

**Why it's good:**
- ✅ Shortcut for frequently-used `component-creator` skill
- ✅ `/new-component card` faster than full sentence
- ✅ Explicit invocation for known workflow

## ❌ Examples of BAD Commands (No Value)

### Example 1: `/build` - Simple Wrapper

**Why it's bad:**
- ❌ Only executes `pnpm build`
- ❌ No analysis or intelligence added
- ❌ Wastes tokens for zero value
- ✅ **Alternative:** Use `pnpm build` directly (free)

### Example 2: `/dev` - Script Already Exists

**Why it's bad:**
- ❌ Only executes `pnpm dev`
- ❌ `package.json` already has this script
- ❌ No insights or recommendations
- ✅ **Alternative:** Use `pnpm dev` directly (free)

### Example 3: `/test` - No Added Value

**Why it's bad:**
- ❌ Only executes `pnpm test`
- ❌ Doesn't parse results or suggest fixes
- ❌ Simple bash wrapper
- ✅ **Alternative:** Use `pnpm test` directly (free)

## 🔧 Command Categories

Commands that add value fall into these categories:

### 1. Análisis Inteligente (Intelligent Analysis)

Commands that **combine multiple sources** and **generate insights**.

**Examples:**
- `/status` - git + builds + tests + coverage with recommendations
- `/coverage` - parse coverage, identify gaps, prioritize fixes
- `/review-component` - validate 50+ criteria checklist
- `/review-tokens` - validate 3-layer architecture
- `/review-a11y` - run axe-core and generate remediation steps

### 2. Troubleshooting

Commands that **diagnose problems** and **suggest fixes**.

**Examples:**
- `/why-failing` - root cause analysis of test failures
- `/fix-imports` - analyze TypeScript errors, auto-suggest fixes

### 3. Información Agregada (Aggregated Information)

Commands that **collect and organize** complex information.

**Examples:**
- `/tokens-stats` - comprehensive token statistics with insights
- `/components-list` - scan structure, validate completeness
- `/flavors-list` - list all themes with color extraction

### 4. Shortcuts de Skills (Skill Shortcuts)

Commands that **invoke existing skills** explicitly.

**Examples:**
- `/new-component` → invokes `component-creator` skill
- `/new-flavor` → invokes `flavor-creator` skill
- `/add-variant` → invokes `component-variant-expander` skill

### 5. Performance

Commands that **analyze performance metrics** and **detect regressions**.

**Examples:**
- `/bundle-size` - analyze bundles, compare with budget, detect regressions

## 🚀 Command Creation Workflow

When a user requests a new slash command:

### Step 1: Validate Against Golden Rule

```bash
# Check if package.json script already exists
cat package.json | grep -A 50 '"scripts"' | grep "command-name"

# If exists → STOP, use bash directly
# If not exists → Continue to Step 2
```

### Step 2: Determine Command Type

Ask user or analyze context:

1. **Is it intelligent analysis?** (combines sources + insights)
2. **Is it troubleshooting?** (diagnoses + suggests fixes)
3. **Is it aggregated info?** (collects + organizes complex data)
4. **Is it a skill shortcut?** (explicit invocation of existing skill)
5. **Is it performance analysis?** (metrics + regressions)

If **none of the above** → ❌ Command NOT justified

### Step 3: Determine Command Location

Based on category:

- **Status/Info:** `.claude/commands/status/`
- **Review/Analysis:** `.claude/commands/review/`
- **Creation/Generation:** `.claude/commands/new/`
- **Troubleshooting:** `.claude/commands/debug/`
- **Performance:** `.claude/commands/performance/`

### Step 4: Create Command File

Using the template structure:

```markdown
---
description: Clear, concise description (max 100 chars)
allowed-tools: List of required tools (Read, Write, Bash, Glob, etc.)
argument-hint: [argument-name (optional)]  # If accepts args
---

# Command implementation following template
```

### Step 5: Add Justification Comment

At the end of the command file, add:

```markdown
---

## 💰 Token Cost Justification

**Why this command is worth the token cost:**

- ✅ Combines X sources of information
- ✅ Analyzes and interprets Y
- ✅ Generates Z actionable recommendations
- ✅ Cannot be done with single bash command

**Estimated tokens per use:** ~XXX tokens
**Value added:** [Specific value description]
**ROI:** Positive after X uses
```

### Step 6: Test Command

```bash
# Test the command
/command-name [arguments]

# Verify it:
# 1. Executes without errors
# 2. Provides intelligent analysis
# 3. Generates actionable recommendations
# 4. Justifies token cost
```

## 📊 Token Cost Analysis

Calculate if command is worth it:

```
Token Cost per Use: ~500-2000 tokens (depends on complexity)
Bash Alternative: 0 tokens

Break-even Point:
- If command saves 5+ minutes of manual analysis → WORTH IT
- If command provides insights not available via bash → WORTH IT
- If command just wraps bash command → NOT WORTH IT
```

**Examples:**

| Command | Tokens | Value Added | ROI |
|---------|--------|-------------|-----|
| `/status` | ~800 | git + builds + tests + analysis | ✅ Positive after 1 use |
| `/coverage` | ~1200 | Parse JSON + prioritize + insights | ✅ Positive after 2 uses |
| `/build` | ~200 | None (just runs `pnpm build`) | ❌ Never positive (use bash) |

## 🎯 Sando-Specific Command Considerations

When creating commands for Sando Design System, ensure:

### 1. Three-Layer Token Architecture Awareness

Commands that work with tokens must understand:
- **Ingredients** (primitives, no references)
- **Flavors** (semantic, reference Ingredients only)
- **Recipes** (component-specific, reference Flavors only)

**Example:** `/review-tokens` validates this architecture

### 2. Monolithic Component Structure

Commands that work with components must validate:
- 7 mandatory files (implementation, types, stories, unit tests, E2E, a11y, index)
- Token consumption from Recipes layer only
- WCAG 2.1 AA compliance

**Example:** `/review-component` checks all 7 files

### 3. OKLCH Color Space

Commands that analyze colors must understand:
- OKLCH vs HSL/RGB
- Perceptual uniformity requirements
- WCAG contrast ratio calculations

**Example:** `/review-a11y` validates contrast ratios

### 4. Monorepo Structure

Commands must understand:
- Turborepo task orchestration
- pnpm workspaces
- Build dependencies (@sando/tokens → @sando/components)

**Example:** `/status` checks build artifact timestamps

## 🔄 Command Update Workflow

When updating an existing command:

1. **Verify Golden Rule still applies** (command still adds value)
2. **Update YAML frontmatter** if tools or arguments changed
3. **Update implementation** with new logic
4. **Update justification** if value proposition changed
5. **Test thoroughly** to ensure no regressions

## 📚 Reference Documentation

- **Claude Code Commands Docs:** https://docs.claude.com/en/docs/claude-code/commands
- **Sando Commands Plan:** `commands-implementation-plan.md`
- **Sando Skills Plan:** `skills-implementation-plan.md`
- **Project Guidelines:** `CLAUDE.md`

## ✨ Final Reminder

> "El mejor comando es el que no necesitas crear porque bash ya lo hace gratis."

Only create commands that **justify their token cost** through **intelligent analysis**, **multi-source aggregation**, **troubleshooting automation**, or **convenience shortcuts** to existing skills.

When in doubt, ask: **"¿Puedo hacer esto con bash directamente?"**

If the answer is YES → Use bash (free, no tokens)
If the answer is NO → Create command (adds value)
