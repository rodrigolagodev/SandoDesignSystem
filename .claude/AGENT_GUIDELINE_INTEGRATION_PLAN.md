# Agent & Skill Guidelines Integration Plan

**Created**: 2025-11-03
**Updated**: 2025-11-04
**Status**: 🎉 COMPLETE - All Agents & Skills Optimized! 🎉
**Goal**: Update all agents and skills to use Guidelines as single source of truth

---

## Objective

Modify all 20 agents and 3 skills to:

1. **Reference guidelines explicitly** as the authoritative source for Sando-specific decisions
2. **Use Context7 MCP** only for external library documentation (Lit, Vite, Style Dictionary, etc.)
3. **Never duplicate guideline content** - always reference the guideline file
4. **Prioritize guidelines** over general knowledge for architecture/design decisions

---

## Integration Strategy

### Phase 1: Add Guidelines Section to All Agents

Every agent must have a new section immediately after "Core Responsibilities":

````markdown
## Guidelines: Single Source of Truth

**CRITICAL**: All Sando Design System decisions MUST follow the official guidelines located in `.claude/guidelines/`. These guidelines are the authoritative source for:

- Architecture patterns and component structure
- Token system (three-layer: Ingredients/Flavors/Recipes)
- Naming conventions and code style
- Accessibility requirements (WCAG 2.1 AA)
- Testing strategies and coverage thresholds
- Documentation formats and standards

**Your Role**: You are the EXECUTOR of guideline standards, not the DEFINER. When making decisions:

✅ **DO**: Reference specific guidelines for requirements
✅ **DO**: Follow guideline patterns exactly as specified
✅ **DO**: Use guidelines to validate your work
✅ **DO**: Suggest guideline updates if patterns are missing

❌ **DON'T**: Create new patterns that contradict guidelines
❌ **DON'T**: Use general best practices that conflict with guidelines
❌ **DON'T**: Duplicate guideline content in your deliverables

### Guidelines Index

All guidelines are documented in: `.claude/guidelines/GUIDELINES_INDEX.md`

**Your Primary Guidelines** (automatically determined by your role):

- [List 3-5 most relevant guidelines for this agent]

**How to Use Guidelines**:

1. **Before starting work**: Read relevant guidelines to understand requirements
2. **During work**: Reference guidelines for specific patterns and rules
3. **After work**: Validate deliverables against guideline checklists
4. **When uncertain**: Read the guideline - don't guess or use general knowledge

**Example**:

```typescript
// ❌ WRONG: Using general best practice
const buttonColor = "primary-blue"; // Generic naming

// ✅ CORRECT: Following NAMING_CONVENTIONS.md guideline
const buttonColor = "--sando-button-solid-backgroundColor-default"; // Three-layer token
```
````

### When to Use External Documentation (Context7)

Use Context7 MCP for **library-specific** technical documentation ONLY:

- ✅ Lit 3.x reactive patterns and lifecycle methods
- ✅ Style Dictionary 4.x transform API
- ✅ Vite plugin architecture
- ✅ Storybook 8.x addon configuration
- ✅ Playwright testing capabilities

**Never use Context7 for**:

- ❌ Sando token architecture (use TOKEN_ARCHITECTURE.md)
- ❌ Sando component patterns (use COMPONENT_ARCHITECTURE.md)
- ❌ Sando naming conventions (use NAMING_CONVENTIONS.md)
- ❌ Sando testing strategy (use TESTING_STRATEGY.md)

````

---

## Agent-Specific Guideline Mappings

### design-system-architect
**Primary Guidelines**:
- `01-design-system/TOKEN_ARCHITECTURE.md` - Three-layer token system
- `01-design-system/THEMING_STRATEGY.md` - Flavor vs Mode distinction
- `02-architecture/MONOREPO_STRUCTURE.md` - Turborepo + pnpm architecture
- `02-architecture/COMPONENT_ARCHITECTURE.md` - Monolithic 7-file pattern
- `02-architecture/TOKEN_BUILD_SYSTEM.md` - Style Dictionary orchestrator

**Update Required**: Replace sections 115-150 (three-layer architecture explanation) with references to TOKEN_ARCHITECTURE.md

---

### ui-designer
**Primary Guidelines**:
- `01-design-system/COLOR_SYSTEM.md` - OKLCH color space, contrast requirements
- `01-design-system/TYPOGRAPHY_SYSTEM.md` - System fonts, modular scale
- `01-design-system/SPACING_SYSTEM.md` - T-shirt sizing, 4px base unit
- `01-design-system/MOTION_DESIGN.md` - Token-based durations, reduced-motion
- `01-design-system/COMPONENT_DESIGN.md` - Variant taxonomy, API conventions

**Update Required**: Add guideline references to token creation workflows

---

### frontend-developer
**Primary Guidelines**:
- `03-development/CODE_STYLE.md` - TypeScript strict mode, import organization
- `03-development/NAMING_CONVENTIONS.md` - Component/file/variable naming
- `03-development/TESTING_STRATEGY.md` - Test pyramid, Vitest patterns
- `02-architecture/COMPONENT_ARCHITECTURE.md` - Monolithic 7-file pattern
- `06-documentation/INLINE_CODE_DOCS.md` - JSDoc standards

**Update Required**: Replace code style examples with guideline references

---

### qa-expert
**Primary Guidelines**:
- `03-development/TESTING_STRATEGY.md` - Test pyramid, 80% unit coverage
- `05-quality/TEST_COVERAGE.md` - Coverage thresholds, CI enforcement
- `04-accessibility/WCAG_COMPLIANCE.md` - WCAG 2.1 AA, jest-axe
- `04-accessibility/KEYBOARD_NAVIGATION.md` - Keyboard testing patterns
- `04-accessibility/SCREEN_READER_SUPPORT.md` - NVDA/JAWS/VoiceOver testing

**Update Required**: Add coverage threshold references, validation checklists

---

### technical-writer
**Primary Guidelines**:
- `06-documentation/API_REFERENCE.md` - JSDoc headers, VitePress tables
- `06-documentation/STORYBOOK_STORIES.md` - Story organization, argTypes
- `06-documentation/VITEPRESS_GUIDES.md` - Tutorial structure, code groups
- `06-documentation/INLINE_CODE_DOCS.md` - JSDoc tags, type annotations

**Update Required**: Replace documentation templates with guideline references

---

### accessibility-advocate
**Primary Guidelines**:
- `04-accessibility/WCAG_COMPLIANCE.md` - WCAG 2.1 AA standards
- `04-accessibility/KEYBOARD_NAVIGATION.md` - Tab order, focus management
- `04-accessibility/SCREEN_READER_SUPPORT.md` - ARIA patterns, semantic HTML
- `04-accessibility/COLOR_CONTRAST.md` - 4.5:1 AA ratio, OKLCH lightness

**Update Required**: Add guideline validation checklists

---

### performance-monitor
**Primary Guidelines**:
- `05-quality/PERFORMANCE_BUDGETS.md` - Bundle size, Core Web Vitals
- `02-architecture/TOKEN_BUILD_SYSTEM.md` - Build optimization
- `02-architecture/MONOREPO_STRUCTURE.md` - Turborepo caching

**Update Required**: Add budget threshold references

---

### security-compliance-auditor
**Primary Guidelines**:
- `05-quality/SECURITY_STANDARDS.md` - XSS prevention, CSP, OWASP Top 10

**Update Required**: Add security checklist references

---

### devops-automation-engineer
**Primary Guidelines**:
- `03-development/GIT_WORKFLOW.md` - Conventional commits, changesets
- `05-quality/TEST_COVERAGE.md` - CI coverage gates
- `05-quality/PERFORMANCE_BUDGETS.md` - Lighthouse CI integration

**Update Required**: Add CI/CD pipeline references

---

### developer-tooling-specialist
**Primary Guidelines**:
- `02-architecture/TOKEN_BUILD_SYSTEM.md` - Style Dictionary orchestrator
- `02-architecture/MONOREPO_STRUCTURE.md` - Turborepo configuration
- `03-development/CODE_STYLE.md` - ESLint/Prettier configuration

**Update Required**: Add build optimization references

---

### design-ops-specialist
**Primary Guidelines**:
- `01-design-system/TOKEN_ARCHITECTURE.md` - Token versioning
- `03-development/GIT_WORKFLOW.md` - Changesets workflow

**Update Required**: Add token governance references

---

### ecosystem-integration-agent
**Primary Guidelines**:
- `02-architecture/FRAMEWORK_INTEGRATION.md` - React/Vue/Angular patterns

**Update Required**: Add framework wrapper references

---

### version-migration-manager
**Primary Guidelines**:
- `03-development/GIT_WORKFLOW.md` - Changesets, semantic versioning

**Update Required**: Add migration workflow references

---

### component-builder
**Primary Guidelines**:
- `02-architecture/COMPONENT_ARCHITECTURE.md` - Monolithic 7-file pattern
- `03-development/CODE_STYLE.md` - TypeScript conventions
- `03-development/NAMING_CONVENTIONS.md` - Component naming
- `03-development/TESTING_STRATEGY.md` - Test file structure
- `06-documentation/API_REFERENCE.md` - JSDoc headers
- `06-documentation/STORYBOOK_STORIES.md` - Story templates

**Update Required**: Replace component templates with guideline references

---

### design-system-pm
**Primary Guidelines**:
- `01-design-system/TOKEN_ARCHITECTURE.md` - System overview
- `02-architecture/MONOREPO_STRUCTURE.md` - Project structure

**Update Required**: Add roadmap planning references

---

### component-composition-specialist
**Primary Guidelines**:
- `02-architecture/COMPONENT_ARCHITECTURE.md` - Composition patterns
- `01-design-system/COMPONENT_DESIGN.md` - Variant taxonomy

**Update Required**: Add slot-based composition references

---

### community-contribution-manager
**Primary Guidelines**:
- `03-development/GIT_WORKFLOW.md` - PR validation, branch naming
- `03-development/CODE_STYLE.md` - Contribution standards

**Update Required**: Add contributor workflow references

---

### analytics-insights-agent
**Primary Guidelines**:
- `05-quality/PERFORMANCE_BUDGETS.md` - Core Web Vitals tracking

**Update Required**: Add metrics references

---

### localization-i18n-specialist
**Primary Guidelines**:
- `01-design-system/TYPOGRAPHY_SYSTEM.md` - Font stacks
- `01-design-system/SPACING_SYSTEM.md` - Logical properties (RTL)

**Update Required**: Add i18n pattern references

---

## Skill Updates

### component-creator.md
**Primary Guidelines**:
- `02-architecture/COMPONENT_ARCHITECTURE.md` - 7-file structure
- `03-development/NAMING_CONVENTIONS.md` - File naming

**Update Required**: Replace scaffold templates with guideline references

---

### command-creator.md
**Primary Guidelines**:
- `03-development/CODE_STYLE.md` - Script conventions

**Update Required**: Add command validation references

---

### skill-creator.md
**Primary Guidelines**:
- (Meta - no specific guidelines)

**Update Required**: Add skill validation references

---

## Standard Update Template

For each agent/skill, add this section after "Core Responsibilities":

```markdown
## Guidelines: Single Source of Truth

**CRITICAL**: All Sando Design System decisions MUST follow official guidelines in `.claude/guidelines/`.

**Your Primary Guidelines**:
- [Guideline 1 with path]
- [Guideline 2 with path]
- [Guideline 3 with path]

**Before starting work**: Read relevant guidelines
**During work**: Reference guidelines for patterns
**After work**: Validate against guideline checklists

**Full Index**: `.claude/guidelines/GUIDELINES_INDEX.md`

**Guideline Priority**:
1. Sando Guidelines (`.claude/guidelines/`) - HIGHEST PRIORITY
2. Context7 Library Docs (external frameworks) - For implementation details
3. General best practices - Only when guidelines don't specify

**Example Decision Flow**:
````

User asks: "How should I name this button component?"

❌ WRONG: Use general convention like "MyButton"
✅ CORRECT:

1. Check NAMING_CONVENTIONS.md
2. Find: Components use "sando-\*" prefix in kebab-case
3. Answer: "sando-button" following guideline rule

```

```

---

## Validation Checklist

After updating each agent/skill:

- [ ] "Guidelines: Single Source of Truth" section added
- [ ] Primary guidelines listed with file paths
- [ ] Guideline priority explained (Sando > Context7 > General)
- [ ] Example decision flow included
- [ ] Duplicate content removed (replaced with guideline references)
- [ ] Quality checklist references guideline validation sections
- [ ] Context7 usage clearly separated from guideline usage

---

## Implementation Order

1. **Phase 1** (Critical agents) ✅ **COMPLETE**:
   - ✅ design-system-architect (405 → 227 lines, 44% reduction)
   - ✅ frontend-developer (~300 → 269 lines)
   - ⏭️ component-builder (skipped per user request)
   - ✅ technical-writer (357 → 275 lines, 23% reduction)

**Phase 1 Results**: 3/4 agents refactored, 27% average size reduction, 100% guideline integration

---

2. **Phase 2** (Core specialists) ✅ **COMPLETE**:
   - ✅ qa-expert (392 → 223 lines, 43% reduction)
   - ✅ ui-designer (232 → 202 lines, 13% reduction)
   - ✅ accessibility-advocate (816 → 229 lines, 72% reduction!)
   - ✅ developer-tooling-specialist (739 → 229 lines, 69% reduction!)

**Phase 2 Results**: 4/4 agents refactored, 49% average size reduction, 100% guideline integration

3. **Phase 3** (Supporting specialists) ✅ **COMPLETE**:
   - ✅ devops-automation-engineer (244 → 242 lines, 1% reduction)
   - ✅ performance-monitor (408 → 230 lines, 44% reduction)
   - ✅ security-compliance-auditor (468 → 232 lines, 50% reduction)
   - ✅ design-ops-specialist (733 → 239 lines, 67% reduction!)

**Phase 3 Results**: 4/4 agents refactored, 41% average size reduction, 100% guideline integration

4. **Phase 4** (Extended team) ✅ **COMPLETE**:
   - ✅ ecosystem-integration-agent (289 → 246 lines, 15% reduction)
   - ✅ version-migration-manager (943 → 220 lines, 77% reduction!)
   - ✅ component-composition-specialist (483 → 198 lines, 59% reduction)
   - ✅ design-system-pm (296 → 247 lines, 17% reduction)
   - ✅ community-contribution-manager (52 → 205 lines, +295% - added structure)
   - ✅ analytics-insights-agent (72 → 221 lines, +207% - added structure)
   - ✅ localization-i18n-specialist (92 → 264 lines, +187% - added structure)

**Phase 4 Results**: 7/7 agents refactored, comprehensive guideline integration, 100% complete

5. **Skills Refactoring** ✅ **COMPLETE**:
   - ✅ component-creator.md (503 → 264 lines, 48% reduction)
   - ✅ command-creator.md (431 → 293 lines, 32% reduction)
   - ✅ skill-creator.md (210 → 273 lines, +30% - added Sando guidelines section)

**Skills Results**: 3/3 skills refactored, 100% guideline integration, all reference `.claude/guidelines/`

---

## Success Criteria ✅ ALL COMPLETE

✅ All 18 production agents reference guidelines as primary authority
✅ All 3 skills reference guidelines for validation and scaffolding
✅ No duplicate guideline content in agent/skill files
✅ Clear separation: Sando guidelines vs external library docs (Context7)
✅ Decision examples show guideline priority (Sando > Context7 > General)
✅ Validation checklists reference guideline sections
✅ Average agent size reduction: 42% (with comprehensive guideline integration)
✅ Skills now reference `.claude/guidelines/` as single source of truth

---

## Notes

- Agents should **read** guidelines, not **memorize** them
- Guidelines are **rules**, agents are **executors**
- Context7 is for **external libraries**, guidelines are for **Sando**
- When guidelines conflict with general best practices, **guidelines win**
- Agents can **suggest guideline updates**, but must **follow current guidelines**
