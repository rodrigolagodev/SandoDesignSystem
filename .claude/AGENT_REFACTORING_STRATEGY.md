# Agent Refactoring Strategy

**Created**: 2025-11-03
**Goal**: Eliminate duplication, reduce agent size, improve clarity by leveraging guidelines as single source of truth

---

## Problem Statement

Current agents have:
- ❌ **Duplicate content** that exists in guidelines (token architecture, naming conventions, testing patterns)
- ❌ **Excessive length** (300-400 lines) with detailed explanations now covered in guidelines
- ❌ **Mixed responsibilities** - defining standards vs executing them
- ❌ **Unclear separation** between Sando rules (guidelines) and library usage (Context7)

---

## Refactoring Principles

### 1. Agents Should Be EXECUTORS, Not DEFINERS

**Before (Current)**:
```markdown
## Three-Layer Token Architecture

You will design and implement a strict three-layer token system:

### Layer 1: Ingredients (Primitives)
- Raw design values: colors, spacing scales, typography scales
- NEVER reference other tokens - only pure values
- Examples: `color-blue-500: #3b82f6`, `spacing-4: 16px`

### Layer 2: Flavors (Semantic)
- Context-aware tokens providing semantic meaning
- MUST reference Ingredients layer only
- Examples: `color-primary: {color-blue-500}`
...
(50+ lines explaining token architecture)
```

**After (Refactored)**:
```markdown
## Token Architecture

**Guideline**: `.claude/guidelines/01-design-system/TOKEN_ARCHITECTURE.md`

Follow the three-layer system (Ingredients → Flavors → Recipes) defined in TOKEN_ARCHITECTURE.md:
- Use the decision tree (Rule 2) to determine correct token layer
- Follow CSS naming conventions (Rule 3)
- Reference validation checklist before delivery
```

### 2. Keep Only What's Unique to the Agent

**Keep**:
- ✅ Agent role and when to invoke it
- ✅ Specific responsibilities and workflows
- ✅ Integration points with other agents
- ✅ Tool usage patterns specific to this agent
- ✅ Examples of agent invocation

**Remove**:
- ❌ Detailed architectural rules (→ guidelines)
- ❌ Code style examples (→ guidelines)
- ❌ Testing patterns (→ guidelines)
- ❌ Naming conventions (→ guidelines)
- ❌ Complete token/component specifications

### 3. Guidelines Section Template

Every agent gets this concise section:

```markdown
## Guidelines: Single Source of Truth

**All Sando decisions follow**: `.claude/guidelines/`

**Your primary guidelines**:
- [Guideline 1 path] - Brief one-line what it covers
- [Guideline 2 path] - Brief one-line what it covers
- [Guideline 3 path] - Brief one-line what it covers

**Priority**: Sando Guidelines > Context7 Docs > General practices

**Workflow**: Read guideline → Follow patterns → Validate checklist
```

### 4. Context7 Usage Clarity

```markdown
## External Library Documentation (Context7)

**Use Context7 ONLY for external library implementation details**:
- ✅ Lit 3.x reactive controllers, lifecycle methods
- ✅ Style Dictionary 4.x transform API
- ✅ Vite plugin architecture
- ✅ Storybook 8.x Web Components integration

**Never use Context7 for**:
- ❌ Sando token architecture
- ❌ Sando component patterns
- ❌ Sando naming conventions
- ❌ Sando testing strategy
```

---

## Refactored Agent Structure

### Standard Template (100-150 lines target)

```markdown
---
name: agent-name
description: Brief description of when to invoke this agent (2-3 bullet points max)
model: sonnet
---

[Brief introduction paragraph - 2-3 sentences]

## Core Responsibilities

[3-5 bullet points of what this agent does]

## Guidelines: Single Source of Truth

**All Sando decisions follow**: `.claude/guidelines/`

**Your primary guidelines**:
- [3-5 most relevant guidelines for this agent]

**Priority**: Sando Guidelines > Context7 Docs > General practices

## External Library Documentation (Context7)

[If applicable - when to use Context7 for library docs]

## Workflow

### Phase 1: Context Gathering
[Brief - what context to gather]

### Phase 2: Execution
[Brief - main work steps]

### Phase 3: Validation
[Brief - how to validate against guidelines]

## Integration with Other Agents

[Brief collaboration points]

## Key Principles

[3-5 core principles specific to this agent's role]
```

---

## Agent-by-Agent Refactoring Plan

### design-system-architect

**Current**: ~405 lines
**Target**: ~150 lines
**Remove**:
- Lines 115-133: Three-layer token architecture (→ TOKEN_ARCHITECTURE.md)
- Lines 134-170: Technology stack details (→ guidelines + Context7)
- Lines 172-187: Theming system details (→ THEMING_STRATEGY.md)
- Lines 295-316: Component API standards (→ COMPONENT_ARCHITECTURE.md)
- Lines 318-341: Documentation requirements (→ 06-documentation guidelines)
- Lines 343-377: Governance details (→ GIT_WORKFLOW.md, TOKEN_ARCHITECTURE.md)

**Keep**:
- Agent description and invocation examples
- Core responsibilities (high-level)
- Context gathering workflow
- Phase execution structure (simplified)
- Integration with other agents
- Key principles

**Add**:
- Guidelines section with 5 primary guidelines
- Clear separation: Sando guidelines vs Context7
- Reference to decision trees in guidelines

---

### frontend-developer

**Current**: ~300 lines
**Target**: ~120 lines
**Remove**:
- Code style details (→ CODE_STYLE.md)
- Naming conventions (→ NAMING_CONVENTIONS.md)
- Testing patterns (→ TESTING_STRATEGY.md)
- Component structure details (→ COMPONENT_ARCHITECTURE.md)
- JSDoc examples (→ INLINE_CODE_DOCS.md)

**Keep**:
- Agent description and invocation
- Core responsibilities
- Scaffold vs Implementation mode distinction
- Tool usage patterns (component-creator skill)
- Integration points

**Add**:
- Guidelines section with 5 primary guidelines
- Brief workflow: Read guideline → Implement → Validate

---

### component-builder

**Current**: ~350 lines
**Target**: ~130 lines
**Remove**:
- Complete component creation patterns (→ COMPONENT_ARCHITECTURE.md)
- Token consumption examples (→ TOKEN_ARCHITECTURE.md)
- Testing file structure (→ TESTING_STRATEGY.md)
- Documentation templates (→ API_REFERENCE.md, STORYBOOK_STORIES.md)

**Keep**:
- Agent description and when to invoke
- Orchestration workflow (high-level)
- Phase structure (simplified)
- File creation sequence

**Add**:
- Guidelines section with 6 primary guidelines
- Reference to component checklist in COMPONENT_ARCHITECTURE.md

---

### technical-writer

**Current**: ~280 lines
**Target**: ~110 lines
**Remove**:
- Documentation format details (→ all 06-documentation guidelines)
- JSDoc patterns (→ INLINE_CODE_DOCS.md)
- VitePress structure (→ VITEPRESS_GUIDES.md)
- Storybook story templates (→ STORYBOOK_STORIES.md)

**Keep**:
- Agent description and invocation
- Documentation workflow
- Integration with component development

**Add**:
- Guidelines section with 4 documentation guidelines
- Validation workflow referencing checklists

---

### qa-expert

**Current**: ~320 lines
**Target**: ~125 lines
**Remove**:
- Test pyramid details (→ TESTING_STRATEGY.md)
- Coverage thresholds (→ TEST_COVERAGE.md)
- Accessibility testing patterns (→ WCAG_COMPLIANCE.md)
- Test file structure (→ TESTING_STRATEGY.md)

**Keep**:
- Agent description
- Test strategy workflow
- Defect management approach

**Add**:
- Guidelines section with 5 quality guidelines
- Reference to validation checklists

---

### ui-designer

**Current**: ~290 lines
**Target**: ~115 lines
**Remove**:
- Token design details (→ COLOR_SYSTEM.md, TYPOGRAPHY_SYSTEM.md, etc.)
- Design patterns (→ COMPONENT_DESIGN.md)
- Accessibility requirements (→ COLOR_CONTRAST.md)

**Keep**:
- Agent description
- Design workflow
- Figma integration points

**Add**:
- Guidelines section with 5 design system guidelines

---

## Implementation Steps

### Step 1: Create Agent Template

Create a standardized template file that all refactored agents will follow.

### Step 2: Refactor Phase 1 Agents (Critical)

1. design-system-architect
2. frontend-developer
3. component-builder
4. technical-writer

**Process for each**:
1. Read current agent file
2. Identify duplicate content (exists in guidelines)
3. Create refactored version following template
4. Validate: Does it reference guidelines? Is it concise? Is role clear?

### Step 3: Refactor Phase 2-4 Agents

Apply same process to remaining 16 agents.

### Step 4: Update Skills

Refactor 3 skills using same principles.

---

## Validation Checklist

After refactoring each agent:

- [ ] Agent length: 100-150 lines (vs 250-400 before)
- [ ] "Guidelines: Single Source of Truth" section present
- [ ] 3-5 primary guidelines listed with paths
- [ ] No duplicate content from guidelines
- [ ] Clear separation: Sando guidelines vs Context7
- [ ] Examples reference guidelines, don't duplicate them
- [ ] Workflow sections are high-level, not detailed
- [ ] Role and invocation criteria are clear
- [ ] Integration points with other agents maintained

---

## Benefits of Refactoring

✅ **Reduced token usage**: 40-60% reduction in agent size
✅ **Single source of truth**: Guidelines are authoritative
✅ **Easier maintenance**: Update guidelines once, all agents benefit
✅ **Clearer roles**: Agents execute, guidelines define
✅ **Better consistency**: All agents follow same guideline patterns
✅ **Faster updates**: Change guideline vs updating 20 agents
✅ **Improved clarity**: Less noise, clearer purpose

---

## Success Metrics

**Before Refactoring**:
- Average agent size: ~300 lines
- Duplicate content: ~50% overlaps with guidelines
- Guidelines usage: Implicit, not enforced
- Maintenance burden: Update 20 files for pattern changes

**After Refactoring**:
- Average agent size: ~120 lines (60% reduction)
- Duplicate content: 0% (only references)
- Guidelines usage: Explicit, enforced
- Maintenance burden: Update 1 guideline, all agents reference it

---

## Next Steps

1. ✅ Create this strategy document
2. ⏳ Create standardized agent template
3. ⏳ Refactor Phase 1 agents (4 critical agents)
4. ⏳ Review and validate refactored agents
5. ⏳ Refactor Phase 2-4 agents (16 remaining)
6. ⏳ Update skills (3 skills)
7. ⏳ Final validation and testing
