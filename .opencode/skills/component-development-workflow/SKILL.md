---
name: component-development-workflow
description: >-
  Step-by-step workflow for creating components in Sando Design System.
  Ensures no deliverable is forgotten: structure, tokens, logic, tests, 
  stories, changelog, and verification. Each step references specific 
  guidelines for the agent to consult.

  <example>
  User: "Create a Card component"
  Assistant: "I'll follow the component-development-workflow to create sando-card with all deliverables."
  </example>

  <example>
  User: "Build a new Tooltip component"
  Assistant: "Using component-development-workflow to ensure structure, tokens, tests, stories, and changelog are all completed."
  </example>
license: MIT
metadata:
  category: development
  version: "1.0.0"
  author: "Sando Design System Team"
  tags: [web-components, lit, workflow, components, checklist]
---

# Component Development Workflow

## Purpose

Guide agents through a **complete component creation workflow** ensuring all deliverables are produced. This is a high-level checklist—implementation details are decided by the agent per component.

## When to Use

- Creating a **new component** from scratch
- Ensuring **no deliverable is missed** (tests, stories, changelog, etc.)
- Need a **structured workflow** to follow step-by-step

## Workflow Steps

### Step 1: 📁 Create Component Structure

**Objective:** Scaffold the component directory and base files.

**Actions:**

- Create component directory in `packages/components/src/components/{name}/`
- Generate base files following the 7-file pattern
- Ensure proper naming conventions (`sando-{name}`)

**Consult Guidelines:**
| Guideline | Path | Purpose |
|-----------|------|---------|
| Component Architecture | `.opencode/guidelines/02-architecture/COMPONENT_ARCHITECTURE.toon` | 7-file pattern, structure |
| Monorepo Structure | `.opencode/guidelines/02-architecture/MONOREPO_STRUCTURE.toon` | Package organization |
| Naming Conventions | `.opencode/guidelines/03-development/NAMING_CONVENTIONS.toon` | File and class naming |

---

### Step 2: 🎨 Create/Verify Tokens

**Objective:** Ensure Recipe tokens exist for the component.

**Actions:**

- Check if component needs Recipe tokens
- Create tokens in `packages/tokens/src/recipes/{name}/`
- Verify tokens build correctly with Style Dictionary

**Consult Guidelines:**
| Guideline | Path | Purpose |
|-----------|------|---------|
| Token Architecture | `.opencode/guidelines/01-design-system/TOKEN_ARCHITECTURE.toon` | 3-layer system |
| Token Build System | `.opencode/guidelines/02-architecture/TOKEN_BUILD_SYSTEM.toon` | Style Dictionary config |
| Theming Strategy | `.opencode/guidelines/01-design-system/THEMING_STRATEGY.toon` | Flavor system |

**Contextual Guidelines (if applicable):**
| Context | Guideline |
|---------|-----------|
| Uses colors | `01-design-system/COLOR_SYSTEM.toon` |
| Uses typography | `01-design-system/TYPOGRAPHY_SYSTEM.toon` |
| Uses spacing | `01-design-system/SPACING_SYSTEM.toon` |

---

### Step 3: ⚙️ Implement Component Logic

**Objective:** Write the component's TypeScript/Lit code.

**Actions:**

- Implement component class with `FlavorableMixin`
- Add properties, events, slots as needed
- Implement keyboard navigation if interactive
- Apply styles using Recipe tokens

**Consult Guidelines:**
| Guideline | Path | Purpose |
|-----------|------|---------|
| Code Style | `.opencode/guidelines/03-development/CODE_STYLE.toon` | TypeScript standards |
| Component Design | `.opencode/guidelines/01-design-system/COMPONENT_DESIGN.toon` | UX patterns |
| Keyboard Navigation | `.opencode/guidelines/04-accessibility/KEYBOARD_NAVIGATION.toon` | A11y interactions |

**Contextual Guidelines (if applicable):**
| Context | Guideline |
|---------|-----------|
| Has animations | `01-design-system/MOTION_DESIGN.toon` |
| Has loading states | `01-design-system/LOADING_STATES.toon` |
| Uses screen reader | `04-accessibility/SCREEN_READER_SUPPORT.toon` |

---

### Step 4: 🧪 Create Tests

**Objective:** Write unit tests and accessibility tests.

**Actions:**

- Create `sando-{name}.test.ts` with unit tests
- Create `sando-{name}.a11y.test.ts` with accessibility tests
- Ensure coverage meets minimum threshold (≥80%)
- Run tests to verify they pass

**Consult Guidelines:**
| Guideline | Path | Purpose |
|-----------|------|---------|
| Testing Strategy | `.opencode/guidelines/03-development/TESTING_STRATEGY.toon` | Test patterns |
| Test Coverage | `.opencode/guidelines/05-quality/TEST_COVERAGE.toon` | Coverage requirements |
| WCAG Compliance | `.opencode/guidelines/04-accessibility/WCAG_COMPLIANCE.toon` | A11y requirements |

**Contextual Guidelines (if applicable):**
| Context | Guideline |
|---------|-----------|
| Color contrast tests | `04-accessibility/COLOR_CONTRAST.toon` |

---

### Step 5: 📖 Create Storybook Stories

**Objective:** Document component in Storybook with interactive examples.

**Actions:**

- Create `sando-{name}.stories.ts`
- Add stories for all variants and states
- Configure argTypes for controls
- Add accessibility addon checks

**Consult Guidelines:**
| Guideline | Path | Purpose |
|-----------|------|---------|
| Storybook Stories | `.opencode/guidelines/06-documentation/STORYBOOK_STORIES.toon` | Story patterns, CSF 3.0 |

---

### Step 6: 📝 Update CHANGELOG

**Objective:** Document the new component in the changelog.

**Actions:**

- Add entry to `CHANGELOG.md` under "Unreleased" or current version
- Follow conventional changelog format
- Include component name, brief description, and any breaking changes

**Consult Guidelines:**
| Guideline | Path | Purpose |
|-----------|------|---------|
| Git Workflow | `.opencode/guidelines/03-development/GIT_WORKFLOW.toon` | Commit and changelog format |

---

### Step 7: ✅ Verify Integration

**Objective:** Ensure component is properly exported and integrated.

**Actions:**

- Export component from `packages/components/src/index.ts`
- Verify TypeScript types are exported
- Run full test suite: `pnpm test`
- Run Storybook build: `pnpm storybook:build`
- Verify no linting errors: `pnpm lint`

**Consult Guidelines:**
| Guideline | Path | Purpose |
|-----------|------|---------|
| Monorepo Structure | `.opencode/guidelines/02-architecture/MONOREPO_STRUCTURE.toon` | Export patterns |
| Test Coverage | `.opencode/guidelines/05-quality/TEST_COVERAGE.toon` | Quality gates |

---

## Completion Checklist

Before marking the component as complete:

- [ ] Component directory created with proper structure
- [ ] Recipe tokens created (if needed)
- [ ] Component logic implemented and working
- [ ] Unit tests written and passing
- [ ] Accessibility tests written and passing
- [ ] Storybook stories created for all variants
- [ ] CHANGELOG updated
- [ ] Component exported from main index
- [ ] All tests pass (`pnpm test`)
- [ ] No linting errors (`pnpm lint`)

## Anti-Patterns

| ❌ Don't                            | ✅ Do                                     |
| ----------------------------------- | ----------------------------------------- |
| Skip steps because "it's simple"    | Follow all steps regardless of complexity |
| Forget to update CHANGELOG          | Always update CHANGELOG as final step     |
| Create stories without all variants | Include all variants and states           |
| Skip accessibility tests            | A11y tests are mandatory                  |
| Hardcode values instead of tokens   | Always use Recipe tokens for styling      |

## Example Usage

**Agent receives:** "Create a Card component"

**Agent follows workflow:**

1. 📁 Creates `packages/components/src/components/card/`
2. 🎨 Creates tokens in `packages/tokens/src/recipes/card/`
3. ⚙️ Implements `sando-card.ts` with slots and variants
4. 🧪 Creates `sando-card.test.ts` and `sando-card.a11y.test.ts`
5. 📖 Creates `sando-card.stories.ts` with all variants
6. 📝 Updates `CHANGELOG.md` with new component entry
7. ✅ Exports from index, runs tests, verifies build

---

**Version:** 1.0.0
**Author:** Sando Design System Team
