# Guideline Creation Notes

**Purpose**: Knowledge and context for creating the remaining 16 guidelines (categories 03-06).
**Created**: 2025-11-03
**Status**: Use this for completing remaining guidelines, then archive.

---

## Progress Status

**Completed**: 15/27 guidelines (56%)

- ✅ 01-design-system: 7/7 (100%)
- ✅ 02-architecture: 4/4 (100%)
- ✅ 03-development: 4/4 (100%) 🎉 **JUST COMPLETED**

**Remaining**: 12/27 guidelines (44%)

- ⏳ 04-accessibility: 0/4 (WCAG_COMPLIANCE, KEYBOARD_NAVIGATION, SCREEN_READER_SUPPORT, COLOR_CONTRAST)
- ⏳ 05-quality: 0/4 (TEST_COVERAGE, PERFORMANCE_BUDGETS, SECURITY_STANDARDS, VISUAL_REGRESSION)
- ⏳ 06-documentation: 0/4 (API_REFERENCE, STORYBOOK_STORIES, VITEPRESS_GUIDES, INLINE_CODE_DOCS)

---

## Key Lessons Learned

### 1. ❌ CRITICAL ERRORS TO AVOID

#### Error: Using `flavor="dark"`

```html
<!-- ❌ WRONG -->
<div flavor="dark">Content</div>

<!-- ✅ CORRECT -->
<div flavor="original">
  <!-- Dark mode is AUTOMATIC via @media (prefers-color-scheme: dark) -->
</div>
```

**Why**: Dark is a **Mode** (automatic, system preference), NOT a **Flavor** (manual theme selection).

**Reference**: See `01-design-system/THEMING_STRATEGY.md` for complete Flavors vs Modes explanation.

---

#### Error: Duplicating Content

````markdown
<!-- ❌ WRONG: Copying template code -->

## Button Component Template

```typescript
import { LitElement } from "lit";
// ... 50 lines of boilerplate code ...
```
````

<!-- ✅ CORRECT: Referencing existing files -->

## Button Component Template

**Reference**: See `.claude/skills/component-creator/assets/templates/component.ts.template` for boilerplate.
**Example**: See `packages/components/src/components/button/sando-button.ts` for production implementation.

````

**Why**: Templates and examples already exist. Guidelines provide PRINCIPLES, not full code copies.

---

#### Error: Explaining Three-Layer System in Every Guideline
```markdown
<!-- ❌ WRONG: Full explanation repeated -->
The three-layer token system consists of:
1. Ingredients: Raw primitives with absolute values...
2. Flavors: Semantic tokens that reference Ingredients...
3. Recipes: Component tokens that reference Flavors...
[80+ lines of explanation]

<!-- ✅ CORRECT: Simple reference -->
**Reference**: See [TOKEN_ARCHITECTURE.md](../01-design-system/TOKEN_ARCHITECTURE.md) for the three-layer token system.
````

**Why**: TOKEN_ARCHITECTURE.md is the single source of truth. Other guidelines only need to link to it.

---

### 2. ✅ SUCCESSFUL PATTERNS

#### Pattern: Reference-Based Approach

- **Guidelines**: Explain principles and patterns
- **Source files**: Contain exact values (JSON tokens, TypeScript types)
- **Templates**: Contain boilerplate code
- **Examples**: Show production usage

**Example**:

````markdown
## Color Tokens

**Principles**:

- Use OKLCH color space for perceptual uniformity
- Generate scales algorithmically for consistency

**Complete palette**: See `packages/tokens/src/ingredients/color.json` (165 tokens)

**Example usage**:

```css
.button {
  background: var(--sando-color-orange-700);
}
```
````

````

---

#### Pattern: Optimal Length (400-600 lines)
- **01-design-system guidelines**: Average ~460 lines
- **02-architecture guidelines**: Average ~540 lines
- **Sweet spot**: 400-600 lines per guideline

**Why**:
- Shorter: Missing critical information
- Longer: Overwhelming for AI agents, likely has duplication
- This range: Complete but focused

---

#### Pattern: 5 Core Rules Structure
Every guideline has exactly **5 Core Rules** with:
1. Rule name (clear, imperative)
2. Pattern example (✅ CORRECT)
3. Anti-pattern example (❌ WRONG)
4. "Why This Matters" explanation
5. Reference to related guidelines (if applicable)

**Example**:
```markdown
### Rule 3: Shadow DOM Encapsulation (Non-Negotiable)

**All components MUST use Shadow DOM**.

**Pattern**:
```typescript
// Shadow DOM automatic in Lit
@customElement('sando-card')
export class SandoCard extends LitElement {
  static styles = css`...`;
}
````

**Anti-pattern**:

```typescript
// ❌ WRONG: Disabling Shadow DOM
createRenderRoot() { return this; }
```

**Why This Matters**: Shadow DOM provides style encapsulation and prevents CSS leaks.

````

---

#### Pattern: Validation Checklist
Every guideline ends with a **Validation Checklist** - actionable items to verify compliance.

**Example**:
```markdown
## Validation Checklist

### Component Structure
- [ ] Component folder exists in `src/components/{name}/`
- [ ] All 6 required files present
- [ ] Component uses `sando-*` tag name
- [ ] Shadow DOM enabled

### Token Consumption
- [ ] No hardcoded colors/spacing
- [ ] Uses Recipe tokens: `var(--sando-{component}-*)`
- [ ] No direct Flavor or Ingredient variables
````

---

### 3. 📋 TEMPLATE STRUCTURE (Follow This)

````markdown
# [Guideline Title]

**Category**: [01-design-system / 02-architecture / 03-development / etc.]
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-0X
**Owner**: [Agent/Role Name]

---

## Purpose

[1-2 sentences explaining what this guideline covers and why it exists]

---

## Core Rules

### Rule 1: [Rule Name] (Non-Negotiable if critical)

[Clear statement of the rule]

**Pattern**:

```[language]
// ✅ CORRECT example
```
````

**Anti-pattern**:

```[language]
// ❌ WRONG example
```

**Why This Matters**: [Brief explanation]

[Repeat for Rules 2-5]

---

## [Main Content Sections]

[Detailed explanations, organized by topic]
[Use subsections with ### headings]
[Include code examples where relevant]
[Reference other guidelines/files instead of duplicating]

---

## Validation Checklist

### [Category 1]

- [ ] Checkable item 1
- [ ] Checkable item 2

### [Category 2]

- [ ] Checkable item 3
- [ ] Checkable item 4

---

## Related Guidelines

- [GUIDELINE_NAME.md](path/to/guideline.md) - Brief relationship description
- [ANOTHER_GUIDELINE.md](path/to/guideline.md) - Brief relationship description

---

## External References

- [External Resource Name](URL) - Description
- [Tool Documentation](URL) - Relevant sections

---

## Changelog

### 1.0.0 (2025-11-0X)

- Initial guideline created
- [List key features documented]
- Agent-optimized format (~XXX lines)

---

**[Closing statement emphasizing key principle or importance]**

```

---

## 4. 🔍 PRE-COMPLETION CHECKLIST

Before finalizing ANY guideline, verify:

### Content Quality
- [ ] **No `flavor="dark"`** (only Flavor names: original, strawberry, etc.)
- [ ] **No duplication** of content from other guidelines
- [ ] **References** to source files instead of copying values
- [ ] **References** to templates instead of copying boilerplate
- [ ] **Single source of truth** - TOKEN_ARCHITECTURE.md for 3-layer system

### Structure
- [ ] **Exactly 5 Core Rules** with pattern/anti-pattern
- [ ] **400-600 lines** total length
- [ ] **Validation Checklist** at the end
- [ ] **Related Guidelines** section with correct paths
- [ ] **Changelog** with version and date

### Technical Accuracy
- [ ] **Correct terminology** (Flavors vs Modes, Shadow DOM, etc.)
- [ ] **Working code examples** (tested or verified)
- [ ] **Correct file paths** in references
- [ ] **Valid external URLs** if included

### Consistency
- [ ] **Same header format** as other guidelines
- [ ] **Same markdown style** (headings, code blocks, lists)
- [ ] **Cross-references** match actual file locations
- [ ] **Version 1.0.0** for new guidelines

---

## 5. 📁 REFERENCE FILE PATHS

### Token Source Files
```

packages/tokens/src/
├── ingredients/
│ ├── color.json # 165 color tokens
│ ├── space.json # Spacing scale
│ ├── font.json # Typography
│ └── [others].json
├── flavors/
│ ├── original/
│ │ ├── flavor.json # Base (light mode)
│ │ ├── flavor-dark.json # Dark mode overrides
│ │ └── [modes].json
│ └── [other-flavors]/
└── recipes/
├── button.json # Button tokens
└── [component].json

```

### Component Examples
```

packages/components/src/components/
├── button/
│ ├── sando-button.ts # Production example
│ ├── sando-button.types.ts
│ └── [other files]
└── [other-components]/

```

### Templates
```

.claude/skills/component-creator/assets/templates/
├── component.ts.template
├── types.ts.template
├── test.ts.template
├── a11y.test.ts.template
├── stories.ts.template
└── index.ts.template

```

### Existing Guidelines
```

.claude/guidelines/
├── 01-design-system/
│ ├── TOKEN_ARCHITECTURE.md # Three-layer system (REFERENCE THIS)
│ ├── THEMING_STRATEGY.md # Flavors vs Modes (REFERENCE THIS)
│ ├── COLOR_SYSTEM.md
│ ├── TYPOGRAPHY_SYSTEM.md
│ ├── SPACING_SYSTEM.md
│ ├── COMPONENT_DESIGN.md
│ └── MOTION_DESIGN.md
├── 02-architecture/
│ ├── MONOREPO_STRUCTURE.md
│ ├── COMPONENT_ARCHITECTURE.md
│ ├── TOKEN_BUILD_SYSTEM.md
│ └── FRAMEWORK_INTEGRATION.md
└── GUIDELINES_INDEX.md # Update this after creating guidelines

```

---

## 6. 🚀 WORKFLOW FOR REMAINING GUIDELINES

### Step 1: Choose Next Guideline
Pick from remaining 16 guidelines in order of priority:
1. **03-development** (needed by frontend-developer agent)
2. **04-accessibility** (needed by qa-expert agent)
3. **05-quality** (needed by qa-expert, performance-monitor agents)
4. **06-documentation** (needed by technical-writer agent)

### Step 2: Research Phase
Before writing, gather:
- Existing code/config that implements this guideline
- Related guidelines to reference
- External standards (WCAG, TypeScript, ESLint, etc.)

### Step 3: Write Guideline
Follow template structure:
1. Header (Category, Version, Status, Owner)
2. Purpose (1-2 sentences)
3. 5 Core Rules (with pattern/anti-pattern)
4. Main content (organized sections)
5. Validation Checklist
6. Related Guidelines
7. External References
8. Changelog

### Step 4: Review Against Checklist
Run through Pre-Completion Checklist (section 4 above)

### Step 5: Update Index
Update `GUIDELINES_INDEX.md`:
- Change status: 📝 Planned → ✅ Active
- Add version number and 🆕
- Update description if needed
- Add changelog entry

---

## 7. 📊 QUALITY METRICS

Each completed guideline should meet:
- **Length**: 400-600 lines ✅
- **Rules**: Exactly 5 Core Rules ✅
- **Examples**: Pattern + Anti-pattern for each rule ✅
- **Checklist**: Validation checklist included ✅
- **References**: 3+ cross-references to other guidelines ✅
- **No duplication**: <5% content overlap with other guidelines ✅

---

## 8. 🎯 NEXT PRIORITIES

### Category 03: Development (Most Urgent)
Needed by: frontend-developer, qa-expert agents

1. **CODE_STYLE.md**
   - TypeScript strict mode configuration
   - ESLint rules (existing: `.eslintrc.js`)
   - Prettier configuration (existing: `.prettierrc`)
   - Import organization
   - File structure conventions

2. **NAMING_CONVENTIONS.md**
   - Component naming: `sando-*` prefix, PascalCase classes
   - File naming: kebab-case, extensions
   - Variable naming: camelCase, constants UPPER_CASE
   - Token naming: kebab-case with `--sando-` prefix
   - Test file naming: `*.test.ts`, `*.spec.ts`, `*.a11y.test.ts`

3. **GIT_WORKFLOW.md**
   - Conventional commits format
   - Changesets usage (existing: `.changeset/`)
   - Branching strategy
   - PR process
   - Release workflow (`pnpm release`)

4. **TESTING_STRATEGY.md**
   - Test pyramid (unit, integration, E2E)
   - Vitest configuration (existing: `vitest.config.ts`)
   - Playwright configuration (existing: `playwright.config.ts`)
   - Coverage targets (85% unit, 80% E2E)
   - Mock patterns

---

## 9. 💡 TIPS FOR SUCCESS

### When Stuck
1. Look at existing guidelines in same category
2. Check actual implementation in codebase
3. Reference TOKEN_ARCHITECTURE.md for token questions
4. Reference THEMING_STRATEGY.md for Flavor/Mode questions

### Common Pitfalls
- ❌ Over-explaining (keep focused on principles)
- ❌ Copy-pasting examples (reference instead)
- ❌ Too long (>700 lines means duplication)
- ❌ Too short (<300 lines means incomplete)
- ❌ Missing validation checklist

### Signs of Quality
- ✅ Can be read in 5-10 minutes
- ✅ Clear actionable rules
- ✅ Pattern/anti-pattern makes rules obvious
- ✅ Checklist can be used immediately
- ✅ References other guidelines appropriately

---

## 10. 🎓 LESSONS FROM 03-DEVELOPMENT CATEGORY

### Critical Success: Strict Line Limits Work

**Problem identified**: NAMING_CONVENTIONS.md was created with 858 lines (43% over target)

**Solution applied**:
1. **Hard limit enforcement**: 500 lines maximum (down from 600)
2. **User interruption**: Stopped agent mid-creation to verify approach
3. **Aggressive refactoring**: Reduced NAMING_CONVENTIONS from 858→485 lines (43% reduction)
4. **Stricter agent prompts**: "ABSOLUTE HARD LIMIT: 500 lines", "IF > 500, CUT MORE CONTENT"

**Results**:
- CODE_STYLE: 609 lines ✅
- NAMING_CONVENTIONS: 485 lines (after refactor) ✅
- GIT_WORKFLOW: 521 lines ✅
- TESTING_STRATEGY: 451 lines ✅
- **Average: 516 lines** (perfectly in 400-600 range)

### New Best Practice: Progressive Strictness

**Escalation strategy that works**:

1. **First attempt**: Target 400-600 lines
2. **If over 600**: Set hard limit at 550 lines
3. **If still over**: Set ABSOLUTE hard limit at 500 lines
4. **During creation**: Monitor and interrupt if heading over limit

**Prompt language that works**:
```

ABSOLUTE HARD LIMIT: 500 lines (NON-NEGOTIABLE)
IF YOU EXCEED 500 LINES, CUT CONTENT UNTIL UNDER 500
Priority: UNDER 500 LINES > Completeness

````

### Optimization Techniques Validated

**What works for staying under 500 lines**:

1. **Tables instead of prose** (saves ~30-40%)
   ```markdown
   <!-- ❌ BAD: 50 lines of paragraphs -->
   Vitest is configured with...
   The coverage provider is v8...

   <!-- ✅ GOOD: 15 lines table -->
   | Config | Value | Purpose |
   |--------|-------|---------|
   | Provider | v8 | Coverage |
````

2. **Reference actual files** (saves ~20-30%)

   ````markdown
   <!-- ❌ BAD: Copy vitest config -->

   ```json
   {
     "coverage": { ... }
   }
   ```
   ````

   <!-- ✅ GOOD: Reference -->

   **Config**: `packages/components/vitest.config.js`

   ```

   ```

3. **Minimal code examples** (saves ~15-20%)
   - 0-2 code examples per guideline total
   - Each example max 10 lines
   - Reference production files for details

4. **Aggressive external linking** (saves ~10-15%)
   - Link to official docs (Vitest, TypeScript, WCAG)
   - Don't explain API details
   - Trust developers know basics

5. **Compact validation checklists** (saves ~10-15%)
   - 4-5 categories max
   - 4-5 items per category
   - Total: 20-25 items (not 35+)

### Line Budget Formula (for 500-line limit)

```
Header/Purpose:           15 lines
Core Rules (5 × 25):     125 lines
Main Sections (4-6):     200 lines
Validation Checklist:     60 lines
Related/External:         30 lines
Changelog:                20 lines
Closing:                  10 lines
Buffer:                   40 lines
---------------------------------
TOTAL:                   500 lines
```

### Refactoring Strategy (When Over Limit)

**NAMING_CONVENTIONS.md case study** (858→485 lines):

**What was cut** (~373 lines saved):

1. **Token architecture details** (~120 lines)
   - Removed verbose three-layer explanation
   - Replaced with brief summary + link to TOKEN_ARCHITECTURE.md

2. **Reduced examples** (~100 lines)
   - From 51 examples to 20 examples
   - Kept only essential patterns

3. **Consolidated TypeScript sections** (~60 lines)
   - Converted to compact tables
   - Removed "Types vs Interfaces" deep dive

4. **Streamlined file naming** (~50 lines)
   - File suffixes in table format
   - Removed component structure (linked to COMPONENT_ARCHITECTURE.md)

5. **Reduced validation checklist** (~30 lines)
   - From 35+ items to 25 items

6. **Miscellaneous** (~13 lines)
   - Removed verbose "Why This Matters" explanations
   - Removed private methods debate
   - Removed redundant examples

**What was kept** (essential content):

- All 5 Core Rules with pattern/anti-pattern
- Component naming formulas
- Token naming formulas
- File suffix tables
- Variable naming conventions
- Export patterns

### Production Code Analysis for Testing

**Analyzed files for TESTING_STRATEGY.md**:

- `sando-button.test.ts` (396 lines) - Unit test patterns
- `sando-button.a11y.test.ts` (133 lines) - Accessibility patterns
- `packages/tokens/tests/` - Token testing structure
- `vitest.config.js` - Coverage configuration

**Key insights extracted**:

- Test structure: describe blocks (Rendering, Properties, Events, Accessibility, etc.)
- Vitest + @open-wc/testing patterns
- Shadow DOM testing: `element.shadowRoot?.querySelector()`
- Lit reactivity: `await element.updateComplete`
- jest-axe patterns: `await axe(element)` + `toHaveNoViolations()`
- Coverage targets: 80% (lines, functions, branches, statements)
- Multi-flavor testing for contrast validation

**Referenced instead of duplicated**:

- Linked to actual test files for examples
- Linked to vitest.config.js for configuration
- Linked to external docs (Vitest, @open-wc, jest-axe)

### Agent Prompt Improvements

**Evolution of prompt strictness**:

**Version 1** (resulted in 858 lines):

```
Target: 400-600 lines
```

**Version 2** (resulted in 521 lines):

```
HARD LIMIT: 550 lines maximum (non-negotiable)
```

**Version 3** (resulted in 451 lines):

```
ABSOLUTE HARD LIMIT: 500 lines
IF YOU EXCEED 500 LINES, CUT CONTENT UNTIL UNDER 500
Priority: UNDER 500 LINES > Completeness
```

**Lesson**: Absolute language + consequences + priority statement = better compliance

### Quality Metrics Achieved

**03-development category stats**:

- **Guideline count**: 4/4 (100% complete)
- **Average length**: 516 lines (target: 400-600) ✅
- **Shortest**: TESTING_STRATEGY.md (451 lines)
- **Longest**: CODE_STYLE.md (609 lines)
- **Refactored**: NAMING_CONVENTIONS.md (858→485, -43%)
- **All within range**: Yes ✅

**Optimization achievements**:

- Heavy use of tables (6+ tables per guideline)
- Minimal code examples (0-2 per guideline)
- Aggressive external linking (5+ links per guideline)
- Reference-based approach (<5% content duplication)

### Recommendations for Remaining Categories

**For 04-accessibility (4 guidelines)**:

- Hard limit: 500 lines per guideline
- Reference WCAG 2.1 spec (don't duplicate)
- Use tables for success criteria
- Link to axe-core rules documentation
- Minimal code examples (reference sando-button.a11y.test.ts)

**For 05-quality (4 guidelines)**:

- Hard limit: 500 lines per guideline
- Reference tool documentation (Lighthouse, Percy, etc.)
- Use tables for budgets and thresholds
- Link to industry standards (Web Vitals, OWASP)
- Reference actual CI/CD configs

**For 06-documentation (4 guidelines)**:

- Hard limit: 500 lines per guideline
- Reference actual Storybook stories
- Reference actual VitePress docs
- Use tables for documentation patterns
- Link to Storybook/VitePress official docs

---

## 11. 📝 VERSION HISTORY

- **2.0.0** (2025-11-03): Major update after completing 03-development category
  - Added "Lessons from 03-Development Category" section
  - Documented strict line limit enforcement strategy (500-line hard limit)
  - Added refactoring case study (NAMING_CONVENTIONS 858→485 lines)
  - Documented optimization techniques (tables, references, minimal examples)
  - Added line budget formula for 500-line limit
  - Added agent prompt evolution (progressive strictness)
  - Updated progress: 15/27 guidelines complete (56%)
  - Remaining: 12 guidelines across 3 categories

- **1.0.0** (2025-11-03): Initial creation notes based on completing 02-architecture category
  - Captures lessons learned from creating 11 guidelines
  - Documents patterns, anti-patterns, and workflows
  - Provides checklist for remaining 16 guidelines

---

**Use this document as a reference when creating any of the remaining 12 guidelines. Once all 27 guidelines are complete, this file can be archived.**
