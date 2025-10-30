# Slash Commands Implementation Plan - Sando Design System

> **Fecha:** Enero 2025 (Revisado)
> **Proyecto:** Sando Design System
> **Propósito:** Slash Commands que AGREGAN VALOR sobre bash commands

---

## 📋 Resumen Ejecutivo

Este documento identifica **17 Slash Commands** que justifican su costo en tokens porque **agregan valor inteligente** sobre simples comandos bash.

### ⚠️ Cambio Crítico: De 25 → 17 Comandos

**Eliminados 8 comandos** que eran solo wrappers de `package.json` scripts sin valor agregado:

- ❌ `/build` → usa `pnpm build` (gratis, sin tokens)
- ❌ `/dev` → usa `pnpm dev` (gratis, sin tokens)
- ❌ `/test` → usa `pnpm test` (gratis, sin tokens)
- ❌ `/lint` → usa `pnpm lint` (gratis, sin tokens)
- ❌ `/clean` → usa `pnpm clean` (gratis, sin tokens)
- ❌ `/storybook` → usa `pnpm docs:dev` (gratis, sin tokens)
- ❌ `/tokens-build` → usa `pnpm tokens:build` (gratis, sin tokens)
- ❌ `/cache-clear` → usa bash script (gratis, sin tokens)

**Razón:** No tiene sentido gastar tokens en comandos que ya existen en `package.json` sin agregar análisis, contexto o inteligencia.

---

## 🎯 REGLA DE ORO: ¿Vale la Pena Este Comando?

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

### Criterio de Validación

Antes de crear un slash command, pregúntate:

1. **¿Ya existe un script en package.json que hace esto?**
   - SÍ → Usa el script directamente, NO crear comando
   - NO → Continuar evaluación

2. **¿El comando agrega análisis/inteligencia sobre bash?**
   - NO → No crear comando
   - SÍ → Continuar evaluación

3. **¿Combina múltiples fuentes o provee insights?**
   - NO → Probablemente no vale la pena
   - SÍ → Probablemente sí vale la pena

4. **¿El usuario necesita interpretación de resultados?**
   - NO → Bash es suficiente
   - SÍ → Comando justificado

---

## 1. COMANDOS APROBADOS (17 COMANDOS)

### 📊 CATEGORÍA 1: ANÁLISIS INTELIGENTE (7 Comandos)

Comandos que **combinan múltiples fuentes** y **generan insights**.

---

#### COMANDO #1: `/status`

**¿Por qué vale la pena?**

- ✅ Combina: git status + build artifacts + test results + coverage
- ✅ Analiza estado global del proyecto
- ✅ Genera recomendaciones ("run pnpm build", "fix failing tests")
- ✅ Reporte unificado imposible con un solo bash command

**Archivo:** `.claude/commands/status/status.md`

```markdown
---
description: Show comprehensive project status (git, builds, tests, coverage)
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git log:*), Bash(ls:*), Read, Glob
---

Show comprehensive status for Sando Design System.

# Git Status

Current branch: !`git branch --show-current`
Git status: !`git status --short`
Last commit: !`git log -1 --oneline`
Uncommitted changes: !`git diff --stat`

# Build Status

Check build artifacts:

- @sando/tokens: Check if dist/sando-tokens/ exists and is recent
- @sando/components: Check if dist/ exists and is recent
- @sando/docs: Check if storybook-static/ exists
- @sando/site: Check if .vitepress/dist/ exists

Compare timestamps with source files to detect stale builds.

# Test Status

If coverage/ exists:

- Parse coverage summary from coverage/coverage-summary.json
- Show overall % and per-package %
- Highlight packages below 85% threshold

# Analysis & Recommendations

Based on status, provide actionable recommendations:

- ✅ "Ready to develop" (all builds fresh, tests passing)
- ⚠️ "Run `pnpm build` (tokens modified, components need rebuild)"
- ❌ "Fix failing tests before continuing"
- 🚧 "Uncommitted changes in 3 files - review before commit"

# Output Format

Use emojis for visual clarity:

- ✅ Good
- ⚠️ Warning
- ❌ Error
- 🚧 In Progress
```

**Justificación del costo de tokens:**

- Combina 4+ fuentes de información
- Detecta dependencias obsoletas (tokens → components)
- Genera recomendaciones inteligentes
- **No se puede hacer con un solo bash command**

---

#### COMANDO #2: `/coverage`

**¿Por qué vale la pena?**

- ✅ Parsea resultados de coverage (JSON complejo)
- ✅ Identifica archivos bajo threshold (<85%)
- ✅ Prioriza qué testear primero (mayor impacto)
- ✅ Genera reporte legible con insights

**Archivo:** `.claude/commands/status/coverage.md`

```markdown
---
description: Show detailed test coverage with insights and priorities
allowed-tools: Bash, Read, Glob
argument-hint: [package-name (optional)]
---

Show test coverage for Sando Design System with intelligent analysis.

# Execute Coverage

Run: pnpm test:coverage $ARGUMENTS

# Parse Results

Read: coverage/coverage-summary.json
Read: coverage/lcov-report/index.html

# Analysis

1. **Overall Coverage:**
   - Total coverage %
   - Compare with target (85%)
   - Trend (improving/declining if history available)

2. **By Package:**
   - @sando/tokens: X%
   - @sando/components: X%
   - Show which packages are below target

3. **Files Needing Tests:**
   - List files with coverage <85%
   - Sort by:
     - Priority (critical files first)
     - Gap to target (largest gaps first)
   - Show how many test cases needed (estimate)

4. **Coverage Insights:**
   - Which component has best/worst coverage?
   - Which types of tests are missing? (unit vs E2E vs a11y)
   - Untested critical paths

# Recommendations

Provide 3-5 actionable recommendations:

1. "Add 12 test cases to sando-modal.test.ts (priority: high)"
2. "sando-dropdown.ts is almost there! (83.1% → need 2% more)"
3. "Focus on E2E tests - unit coverage is good but E2E is lacking"

# Output Format
```

📊 Test Coverage Report

Overall: 89.4% ✅ (target: >85%)

By Package:
@sando/tokens 95.2% ✅ (2,200+ tests)
@sando/components 87.1% ✅ (234 tests)

Files Below Target (<85%):
❌ sando-modal.ts (76.3%)
Missing: Event handlers, edge cases
Estimated: 23 more test cases needed
Priority: HIGH (critical component)

⚠️ sando-dropdown.ts (83.1%)
Missing: Keyboard navigation edge cases
Estimated: 5 more test cases needed
Priority: MEDIUM (almost there!)

Recommendations:

1. Focus on sando-modal.ts first (highest gap, critical component)
2. Add E2E tests for user interactions
3. Review a11y coverage (some components missing axe-core tests)

Coverage report: coverage/lcov-report/index.html

```

```

**Justificación del costo de tokens:**

- Parsea JSON complejo
- Calcula brechas y prioridades
- Genera recomendaciones específicas
- **No es solo `cat coverage-summary.json`**

---

#### COMANDO #3: `/review-component`

**¿Por qué vale la pena?**

- ✅ Analiza 7 archivos del componente
- ✅ Valida contra checklist de 50+ criterios
- ✅ Revisa arquitectura, a11y, tests, docs
- ✅ Genera recomendaciones priorizadas

**Archivo:** `.claude/commands/review/review-component.md`

```markdown
---
description: Deep component review (code, architecture, a11y, tests, docs)
argument-hint: <component-name>
---

Review component: $ARGUMENTS

# Read All Component Files

Read:

- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.ts
- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.types.ts
- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.test.ts
- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.spec.ts
- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.a11y.test.ts
- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.stories.ts
- @packages/components/src/components/$ARGUMENTS/index.ts

# Comprehensive Analysis

## 1. Code Quality (0-10)

- [ ] TypeScript strict mode enabled
- [ ] No `any` types (exceptions must be justified)
- [ ] Lit best practices (reactive properties, lifecycle)
- [ ] Proper error handling
- [ ] Code comments for complex logic
- [ ] No code smells (long methods, deep nesting)

## 2. Architecture (0-10)

- [ ] All 7 files present
- [ ] Types properly defined in .types.ts
- [ ] Proper barrel export in index.ts
- [ ] Exported in src/index.ts
- [ ] Follows monolithic component pattern
- [ ] Clear separation of concerns

## 3. Token Consumption (0-10)

- [ ] Uses Recipe tokens (--sando-$ARGUMENTS-\*)
- [ ] No hardcoded colors/spacing/typography
- [ ] Supports flavor theming via CSS cascade
- [ ] CSS custom properties used correctly
- [ ] Token references are semantic, not primitive

## 4. Accessibility (0-10)

- [ ] ARIA attributes correct (role, aria-label, aria-describedby)
- [ ] Keyboard navigation (Tab, Enter, Space, Escape)
- [ ] Focus indicators visible (3:1 contrast minimum)
- [ ] Color contrast 4.5:1 minimum (7:1 for AAA)
- [ ] Screen reader friendly (test with NVDA/JAWS)
- [ ] Focus management (focus trap if modal)
- [ ] Reduced motion support (@media prefers-reduced-motion)

## 5. Tests (0-10)

- [ ] Unit tests >85% coverage (branches, statements, functions)
- [ ] A11y tests with axe-core (0 violations)
- [ ] Tests all variants and sizes
- [ ] Tests all states (default, hover, active, disabled)
- [ ] Tests all props and events
- [ ] Tests edge cases (rapid clicks, invalid props)
- [ ] Visual regression tests (if applicable)

## 6. Documentation (0-10)

- [ ] Storybook stories complete (all variants)
- [ ] Usage examples clear and comprehensive
- [ ] API documented (props, events, slots, CSS parts)
- [ ] Accessibility features documented
- [ ] Migration notes (if breaking changes)

# Scoring

Calculate weighted score:

- Code Quality: X/10 (weight: 15%)
- Architecture: X/10 (weight: 15%)
- Token Consumption: X/10 (weight: 15%)
- Accessibility: X/10 (weight: 25%)
- Tests: X/10 (weight: 20%)
- Documentation: X/10 (weight: 10%)

Overall: XX/10

# Critical Issues

List any BLOCKING issues that must be fixed:

- ❌ WCAG violations
- ❌ Missing required tests
- ❌ Broken architecture patterns

# Recommendations

Provide 3-5 actionable recommendations prioritized by impact:

**Priority 1 (CRITICAL):**

1. Fix WCAG violation: color contrast 3.2:1 on disabled state (needs 4.5:1)

**Priority 2 (HIGH):** 2. Add E2E test for keyboard navigation (Tab → Enter → Escape flow) 3. Document focus management behavior in Storybook

**Priority 3 (MEDIUM):** 4. Consider adding loading state (spinner while async action completes)

# Output Format
```

🔍 Component Review: sando-$ARGUMENTS

Code Quality: 9/10 ✅
✓ TypeScript strict mode
✓ Lit best practices
⚠️ One complex method could be refactored (handleComplexInteraction)

Architecture: 10/10 ✅
✓ All 7 files present
✓ Clean separation of concerns
✓ Proper exports

Token Consumption: 8/10 ⚠️
✓ Uses Recipe tokens
⚠️ One hardcoded spacing value (line 142: padding: 8px)
→ Should use: var(--sando-space-2)

Accessibility: 7/10 ⚠️
✓ ARIA attributes correct
✓ Keyboard navigation
❌ Color contrast 3.2:1 on disabled state (needs 4.5:1)
⚠️ Missing reduced motion support

Tests: 9/10 ✅
✓ Coverage: 91.2%
✓ E2E tests present
✓ A11y tests with axe-core
⚠️ Missing test for rapid double-clicks

Documentation: 10/10 ✅
✓ 8 Storybook stories
✓ API fully documented
✓ Accessibility notes comprehensive

Overall Score: 8.8/10 ✅ (GOOD)

Critical Issues: 1
❌ Fix color contrast on disabled state (WCAG violation)

Recommendations:

1. [CRITICAL] Update disabled state text color to meet 4.5:1 ratio
2. [HIGH] Add @media (prefers-reduced-motion: reduce) support
3. [HIGH] Add test for rapid clicking (debounce behavior)
4. [MEDIUM] Refactor handleComplexInteraction into smaller methods
5. [LOW] Replace hardcoded spacing with token

Estimated fix time: 2-3 hours

```

```

**Justificación del costo de tokens:**

- Analiza 7 archivos con criterios específicos
- Ejecuta checklist de 50+ items
- Genera scoring ponderado
- Prioriza recomendaciones por impacto
- **Imposible con grep/cat**

---

#### COMANDO #4: `/review-tokens`

**¿Por qué vale la pena?**

- ✅ Valida arquitectura de 3 capas
- ✅ Detecta violaciones (Recipe → Ingredient directo)
- ✅ Encuentra dependencias circulares
- ✅ Valida naming conventions

**Archivo:** `.claude/commands/review/review-tokens.md`

```markdown
---
description: Validate 3-layer token architecture (Ingredients → Flavors → Recipes)
allowed-tools: Read, Glob
---

Review token architecture for violations.

# Scan All Token Files

Glob:

- packages/tokens/src/ingredients/\*.json
- packages/tokens/src/flavors/_/_.json
- packages/tokens/src/recipes/\*.json

# Validation Rules

## Layer 1: Ingredients

- ❌ MUST NOT contain references {color.blue.500}
- ✅ MUST be raw values (hex, px, rem, etc.)
- ✅ Naming: simple (color.blue.500, space.4)

## Layer 2: Flavors

- ✅ MUST ONLY reference Ingredients {color.blue.500}
- ❌ MUST NOT reference other Flavors
- ❌ MUST NOT reference Recipes
- ✅ Naming: semantic (color.action.solid.background.default)

## Layer 3: Recipes

- ✅ MUST ONLY reference Flavors {color.action.solid.background.default}
- ❌ MUST NOT reference Ingredients directly
- ❌ MUST NOT reference other Recipes
- ✅ Naming: component-specific (button.solid.backgroundColor.default)

# Checks

1. **Reference Validation:**
   - Parse all {token.reference} in each layer
   - Validate reference targets exist
   - Validate reference direction (correct layer)

2. **Circular Dependencies:**
   - Build dependency graph
   - Detect cycles (A → B → A)

3. **Naming Conventions:**
   - CSS variables: --sando-[category]-[property]-[variant]-[state]
   - JSON structure: nested objects coherent

4. **WCAG Compliance:**
   - Color combinations meet 4.5:1 minimum
   - Text on background sufficient contrast

# Output Format
```

🎨 Token Architecture Review

✅ Ingredients Layer: 0 violations (127 tokens)
✓ color.json: 8 palettes, all raw hex values
✓ space.json: 20 tokens, all raw rem values
✓ font.json: 12 tokens, all raw values

✅ Flavors Layer: 0 violations (780 tokens)
✓ ocean/flavor.json: 156 tokens, all reference Ingredients
✓ sunset/flavor.json: 156 tokens, all reference Ingredients
✓ forest/flavor.json: 156 tokens, all reference Ingredients

❌ Recipes Layer: 2 VIOLATIONS FOUND (45 tokens)

VIOLATION #1 (CRITICAL):
File: packages/tokens/src/recipes/button.json
Line: 12
Rule: Recipe references Ingredient directly (violates 3-layer architecture)
Found: "backgroundColor": "{color.orange.500}"
Expected: "backgroundColor": "{color.action.solid.background.default}"
Impact: Breaks theming system (flavor switching won't work)
Fix: Update to reference Flavor token

VIOLATION #2 (WARNING):
File: packages/tokens/src/recipes/card.json
Line: 8
Rule: Invalid naming convention
Found: "card-background"
Expected: "card.backgroundColor.default"
Impact: Inconsistent API
Fix: Rename to match convention

❌ BUILD BLOCKED: Fix 1 critical violation before proceeding

Recommendations:

1. [CRITICAL] Fix button.json line 12 (breaks theming)
2. [WARNING] Standardize card.json naming
3. [SUGGESTION] Add automated validation to CI/CD

```

```

**Justificación del costo de tokens:**

- Valida reglas complejas de arquitectura
- Detecta violaciones sutiles
- Construye grafo de dependencias
- **Requiere análisis semántico, no solo grep**

---

#### COMANDO #5: `/review-a11y`

**¿Por qué vale la pena?**

- ✅ Ejecuta axe-core y parsea resultados
- ✅ Agrupa violaciones por severidad
- ✅ Genera pasos de remediación específicos
- ✅ Verifica conformidad WCAG 2.1 AA

**Archivo:** `.claude/commands/review/review-a11y.md`

```markdown
---
description: Comprehensive accessibility audit (WCAG 2.1 AA compliance)
allowed-tools: Bash, Read
argument-hint: [component-name (optional)]
---

Run accessibility audit for WCAG 2.1 AA compliance.

# Execute A11y Tests

If $ARGUMENTS provided:
  Run: pnpm test packages/components/src/components/$ARGUMENTS/\*.a11y.test.ts
Else:
Run: pnpm test --grep "a11y"

# Parse Results

Extract from test output:

- Total violations
- Violations by severity (critical, serious, moderate, minor)
- Violations by rule (color-contrast, button-name, etc.)
- Affected elements

# Analysis

1. **WCAG Compliance Status:**
   - ✅ COMPLIANT if 0 critical + 0 serious violations
   - ⚠️ PARTIAL if only moderate/minor violations
   - ❌ NON-COMPLIANT if critical or serious violations

2. **Violation Grouping:**
   - By severity (critical → minor)
   - By component (if multiple)
   - By WCAG criterion (1.4.3, 2.1.1, etc.)

3. **Impact Assessment:**
   - Which users affected? (blind, low vision, motor, cognitive)
   - Severity of impact (blocker, high, medium, low)

# Remediation Steps

For each violation, provide:

- What's wrong
- Why it matters
- How to fix (specific code changes)
- WCAG success criterion reference

# Output Format
```

♿ Accessibility Audit: sando-button

WCAG 2.1 AA Compliance: ❌ NON-COMPLIANT (2 critical violations)

Total Violations: 5
Critical: 2
Serious: 0
Moderate: 2
Minor: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL VIOLATIONS (must fix immediately)

❌ VIOLATION #1: color-contrast
Rule: Elements must have sufficient color contrast
WCAG: 1.4.3 Contrast (Minimum) - Level AA
Impact: Users with low vision cannot read text
Affected: .button--disabled state
Current: 3.2:1 (text: #999 on background: #f5f5f5)
Required: 4.5:1 minimum

How to Fix:

1. Darken text color or lighten background
2. Suggested: text: #666 (achieves 5.2:1 ratio)
3. Update: packages/tokens/src/recipes/button.json
   "button.solid.textColor.disabled": "{color.neutral.700}"

Code change:

```css
/* Before */
:host([disabled]) .button {
	color: var(--sando-color-neutral-400); /* 3.2:1 */
}

/* After */
:host([disabled]) .button {
	color: var(--sando-color-neutral-700); /* 5.2:1 ✅ */
}
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ VIOLATION #2: button-name
Rule: Buttons must have discernible text
WCAG: 4.1.2 Name, Role, Value - Level A
Impact: Screen reader users cannot identify button purpose
Affected: <sando-button> with no text content or aria-label
Current: <sando-button variant="solid"></sando-button>

How to Fix:
Option 1: Add text content
<sando-button>Click me</sando-button>

Option 2: Add aria-label for icon-only buttons
<sando-button aria-label="Close modal">
<sando-icon name="close"></sando-icon>
</sando-button>

Update documentation to require one of these.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODERATE VIOLATIONS (should fix)

⚠️ VIOLATION #3: focus-visible
... (continue for remaining violations)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:

- Fix 2 critical violations to achieve WCAG AA compliance
- Estimated fix time: 1-2 hours
- Re-run audit after fixes: pnpm test button.a11y.test.ts

Next Steps:

1. Fix color contrast (priority 1)
2. Document aria-label requirement (priority 1)
3. Address moderate violations (priority 2)

```

```

**Justificación del costo de tokens:**

- Parsea output complejo de axe-core
- Agrupa y prioriza violaciones
- Genera remediaciones específicas con código
- **No es solo `pnpm test`**

---

#### COMANDO #6: `/review-pr`

**¿Por qué vale la pena?**

- ✅ Analiza diff completo del PR
- ✅ Valida arquitectura, tests, docs
- ✅ Detecta breaking changes
- ✅ Genera recomendación de aprobación

**Archivo:** `.claude/commands/review/review-pr.md`

```markdown
---
description: Comprehensive Pull Request review (code, tests, docs, architecture)
allowed-tools: Bash(git diff:*), Bash(git show:*), Read, Glob
argument-hint: [PR-number or branch-name]
---

Review Pull Request: $ARGUMENTS

# Get PR Changes

If $ARGUMENTS is PR number:
  Fetch: gh pr diff $ARGUMENTS
Else if $ARGUMENTS is branch:
  Diff: git diff main..$ARGUMENTS
Else:
Diff: git diff main

# Analysis Checklist

## 1. Changed Files Analysis

- Count files changed
- Identify types (components, tokens, docs, tests)
- Detect critical files (package.json, tsconfig.json)

## 2. Code Quality

- TypeScript errors? (run tsc --noEmit)
- Lint violations? (run pnpm lint)
- Code smells? (long methods, deep nesting, duplicates)
- New `any` types introduced?

## 3. Architecture Compliance

- Token architecture violations?
- Component structure follows monolithic pattern?
- Proper barrel exports?
- Breaking changes to public API?

## 4. Tests

- New features have tests?
- Modified components have updated tests?
- Coverage increased/decreased?
- All tests passing?

## 5. Documentation

- Storybook stories updated?
- README changes if needed?
- CHANGELOG entry added?
- API docs updated?

## 6. Accessibility

- A11y impact assessment
- New components have a11y tests?
- WCAG compliance maintained?

## 7. Breaking Changes

- Detect breaking changes:
  - Removed public props/events
  - Changed prop types
  - Renamed components
- Migration guide provided?

# Scoring

Provide weighted score:

- Code Quality: X/10 (20%)
- Architecture: X/10 (20%)
- Tests: X/10 (25%)
- Documentation: X/10 (15%)
- Accessibility: X/10 (20%)

Overall: XX/10

# Recommendation

Based on analysis, provide one of:

- ✅ **APPROVE** - Excellent PR, ready to merge
- ⚠️ **APPROVE WITH COMMENTS** - Good PR, minor suggestions
- 🔄 **REQUEST CHANGES** - Issues that should be addressed
- ❌ **BLOCK** - Critical issues, do not merge

# Output Format
```

🔍 Pull Request Review: #$ARGUMENTS

Title: Add Modal component with animations
Author: @developer
Branch: feature/modal-component → main
Changed Files: 12 (+847, -23)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files Changed:
New Components: + packages/components/src/components/modal/ (7 files)
Token Changes:
M packages/tokens/src/recipes/modal.json
Documentation: + apps/docs/stories/modal.stories.ts
M CHANGELOG.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Code Quality: 9/10 ✅
✓ TypeScript strict mode
✓ No lint violations
✓ Clean code structure
⚠️ One 80-line method (consider splitting)

Architecture: 10/10 ✅
✓ Follows monolithic component pattern
✓ All 7 files present
✓ Token architecture correct (Recipes → Flavors)
✓ Proper exports

Tests: 7/10 ⚠️
✓ Unit tests added (coverage: 82%)
✓ E2E tests for open/close flow
❌ Missing a11y tests (focus trap, Escape key)
⚠️ Coverage below target (82% < 85%)

Documentation: 8/10 ⚠️
✓ Storybook stories complete
✓ CHANGELOG entry added
⚠️ Missing usage examples for nested modals

Accessibility: 6/10 ⚠️
⚠️ Focus trap implementation needs review
❌ Missing aria-modal="true"
❌ Missing a11y tests with axe-core
⚠️ Keyboard navigation works but not tested

Overall Score: 8.0/10 ⚠️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issues Found:

❌ BLOCKING:

1. Add aria-modal="true" to modal element (WCAG requirement)
2. Add a11y tests (sando-modal.a11y.test.ts missing)

⚠️ RECOMMENDED: 3. Increase test coverage to >85% (currently 82%) 4. Add example for nested modal usage 5. Review focus trap implementation (ensure Escape key tested)

💡 SUGGESTIONS: 6. Consider splitting handleModalInteraction (80 lines → 2-3 methods) 7. Add visual regression tests for animations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Breaking Changes: None ✅

Migration Required: No

Estimated Fix Time: 2-3 hours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDATION: 🔄 REQUEST CHANGES

Reasoning:

- Solid implementation overall
- Missing critical a11y features (aria-modal, tests)
- Test coverage below threshold
- Easy fixes, high value

Suggested Action:

1. Address 2 blocking issues (aria-modal, a11y tests)
2. Increase test coverage to 85%
3. Re-request review

Once addressed, this PR will be ready to merge.

```

```

**Justificación del costo de tokens:**

- Analiza diff completo con contexto
- Ejecuta múltiples validaciones
- Detecta breaking changes automáticamente
- Genera recomendaciones priorizadas
- **Mucho más que `git diff`**

---

#### COMANDO #7: `/explain-component`

**¿Por qué vale la pena?**

- ✅ Genera tutorial dinámico del componente
- ✅ Extrae API desde código (no solo docs)
- ✅ Crea ejemplos de uso contextuales
- ✅ Adapta explicación al nivel del usuario

**Archivo:** `.claude/commands/review/explain-component.md`

````markdown
---
description: Generate comprehensive component tutorial (API, usage, examples)
argument-hint: <component-name>
---

Explain component: $ARGUMENTS in tutorial format.

# Read Component Files

Read:

- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.ts (implementation)
- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.types.ts (types)
- @packages/components/src/components/$ARGUMENTS/sando-$ARGUMENTS.stories.ts (examples)

# Extract Information

From code, extract:

- Component purpose
- All @property decorators (props)
- All @event decorators (events)
- All slots (from render method)
- CSS custom properties (CSS variables)
- Variants and sizes

# Generate Tutorial

## 1. Overview

- What is this component?
- When should you use it?
- When NOT to use it?

## 2. Basic Usage

```html
<!-- Simplest possible usage -->
<sando-$ARGUMENTS> Basic content </sando-$ARGUMENTS>
```
````

## 3. API Reference

### Props

| Prop                             | Type | Default | Description |
| -------------------------------- | ---- | ------- | ----------- |
| ... extracted from @property ... |

### Events

| Event                         | Type | Description |
| ----------------------------- | ---- | ----------- |
| ... extracted from @event ... |

### Slots

| Slot                            | Description |
| ------------------------------- | ----------- |
| ... extracted from render() ... |

### CSS Custom Properties

| Property                      | Default | Description |
| ----------------------------- | ------- | ----------- |
| ... extracted from styles ... |

## 4. Examples

### All Variants

```html
<sando-$ARGUMENTS variant="solid">Solid</sando-$ARGUMENTS>
<sando-$ARGUMENTS variant="outline">Outline</sando-$ARGUMENTS>
...
```

### All Sizes

```html
<sando-$ARGUMENTS size="small">Small</sando-$ARGUMENTS>
<sando-$ARGUMENTS size="medium">Medium</sando-$ARGUMENTS>
...
```

### Theming

```html
<!-- Global theme -->
<html flavor="ocean">
	<sando-$ARGUMENTS>Ocean themed</sando-$ARGUMENTS>
</html>

<!-- Section theme -->
<div flavor="sunset">
	<sando-$ARGUMENTS>Sunset themed</sando-$ARGUMENTS>
</div>

<!-- CSS override -->
<sando-$ARGUMENTS style="--sando-$ARGUMENTS-backgroundColor: #custom;">
	Custom color
</sando-$ARGUMENTS>
```

## 5. Accessibility

- Keyboard navigation: (extracted from code/tests)
- ARIA attributes: (extracted from code)
- Screen reader support: (extracted from tests)
- WCAG compliance: (from a11y tests)

## 6. Common Patterns

Provide 3-5 real-world usage patterns:

- Form integration
- Loading states
- Error handling
- Responsive behavior

## 7. Troubleshooting

Common issues and solutions:

- "Component not rendering" → Check if tokens built
- "Styles not applying" → Verify flavor attribute
- etc.

# Output Format

Present as friendly, scannable tutorial with:

- Clear section headers
- Code examples (runnable)
- Visual aids (emojis, boxes)
- Progressive complexity (basic → advanced)

````

**Justificación del costo de tokens:**
- Extrae API desde código real (no manual)
- Genera ejemplos contextuales
- Crea tutorial adaptado
- **No es solo copy-paste de README**

---

### 🔍 CATEGORÍA 2: TROUBLESHOOTING INTELIGENTE (2 Comandos)

Comandos que **diagnostican problemas** y **sugieren fixes**.

---

#### COMANDO #8: `/why-failing`

**¿Por qué vale la pena?**
- ✅ Ejecuta tests y parsea errors
- ✅ Identifica root cause (no solo síntoma)
- ✅ Sugiere fixes específicos con código
- ✅ Debugging guiado paso a paso

**Archivo:** `.claude/commands/troubleshoot/why-failing.md`

```markdown
---
description: Debug why tests are failing (root cause analysis + fixes)
allowed-tools: Bash, Read, Glob
---

Analyze test failures and provide debugging guidance.

# Run Tests

Execute: pnpm test --reporter=verbose

Capture:
- Failed test names
- Error messages
- Stack traces
- Expected vs actual values

# Root Cause Analysis

For each failure, determine:

1. **Error Category:**
   - Syntax error (TypeScript, import)
   - Assertion failure (expected !== actual)
   - Timeout (async, infinite loop)
   - Missing dependency (tokens not built)
   - Environment issue (DOM, Node version)

2. **Root Cause:**
   - Not just "assertion failed"
   - But WHY: "tokens not built, CSS variables undefined"

3. **Related Files:**
   - Which files are involved?
   - Which files need fixing?

# Generate Fixes

For each failure, provide:
- What's wrong (specific)
- Why it's failing (root cause)
- How to fix (step-by-step)
- Code changes (if applicable)

# Prioritization

Order failures by:
1. Blockers (prevent all other tests)
2. Critical (core functionality)
3. Medium (edge cases)
4. Low (nice-to-have)

# Output Format

````

🐛 Test Failure Analysis

Running tests... ❌ 3 failures detected (234 passing, 3 failing)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FAILURE #1 (BLOCKER):
Test: sando-button.test.ts → "should render with default properties"
Error: Cannot find module '@sando/tokens/recipes'

Root Cause Analysis:
✗ Tokens package not built
✗ dist/sando-tokens/ does not exist
→ Components depend on tokens (build order violation)

Impact:
❌ BLOCKS all component tests (tokens required)

Fix (Step-by-Step):

1. Build tokens first:
   $ pnpm tokens:build

2. Verify build:
   $ ls dist/sando-tokens/css/
   (should see: ingredients.css, flavors/, recipes/)

3. Re-run tests:
   $ pnpm test

Estimated fix time: 30 seconds

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FAILURE #2 (CRITICAL):
Test: sando-modal.spec.ts → "should close on Escape key"
Error: Timeout waiting for modal to close (10s exceeded)

Root Cause Analysis:
✗ Event listener not attached in test
✓ Implementation correct (src/sando-modal.ts:142)
✗ Test setup missing: modal.open = true before test

Code Issue:

```typescript
// Current test (WRONG)
test("should close on Escape", async ({ page }) => {
	await page.press("Escape");
	// ❌ Modal not opened first!
	await expect(modal).not.toBeVisible();
});

// Fixed test
test("should close on Escape", async ({ page }) => {
	const modal = page.locator("sando-modal");

	// 1. Open modal first
	await modal.evaluate((el) => (el.open = true));
	await expect(modal).toBeVisible();

	// 2. Then press Escape
	await page.press("Escape");

	// 3. Verify closed
	await expect(modal).not.toBeVisible();
});
```

Fix Location:
File: packages/components/src/components/modal/sando-modal.spec.ts
Line: 67

Estimated fix time: 5 minutes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FAILURE #3 (MEDIUM):
Test: sando-dropdown.a11y.test.ts → "should have no WCAG violations"
Error: 1 violation found (color-contrast)

Root Cause Analysis:
✓ Test working correctly
✗ Actual WCAG violation in component
→ Contrast ratio 3.2:1 (needs 4.5:1)

Violation Details:
Element: .dropdown\_\_item--disabled
Current: color: #999 on background: #f5f5f5
Ratio: 3.2:1 ❌
Required: 4.5:1 minimum

Fix:
Update Recipe token in packages/tokens/src/recipes/dropdown.json:

```json
{
	"dropdown": {
		"item": {
			"textColor": {
				"disabled": "{color.neutral.600}" // Was: neutral.400
			}
		}
	}
}
```

Then rebuild tokens:
$ pnpm tokens:build

Estimated fix time: 2 minutes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:

Failures by Priority:
Blocker: 1 (tokens not built)
Critical: 1 (test setup issue)
Medium: 1 (WCAG violation)

Quick Fix Order:

1. Build tokens (30s) → unblocks all tests
2. Fix modal test setup (5 min)
3. Fix dropdown color contrast (2 min)

Total Estimated Time: ~8 minutes

Run this to fix:
$ pnpm tokens:build && pnpm test

If failures persist after token build, address #2 and #3.

```

```

**Justificación del costo de tokens:**

- Parsea errores complejos
- Identifica root cause (no solo síntoma)
- Genera fixes específicos con código
- **No es solo leer el error en consola**

---

#### COMANDO #9: `/fix-imports`

**¿Por qué vale la pena?**

- ✅ Ejecuta TypeScript compiler
- ✅ Analiza errores de imports
- ✅ Sugiere auto-fixes
- ✅ Detecta circular dependencies

**Archivo:** `.claude/commands/troubleshoot/fix-imports.md`

```markdown
---
description: Find and fix broken imports (missing, incorrect paths, circular deps)
allowed-tools: Bash, Read, Edit, Glob
---

Analyze and fix import issues across the project.

# Run TypeScript Compiler

Execute: pnpm tsc --noEmit

Capture:

- Import errors (cannot find module)
- Type errors related to imports
- Circular dependency warnings

# Analysis

1. **Missing Imports:**
   - Module doesn't exist
   - Incorrect path
   - Missing file extension

2. **Incorrect Paths:**
   - Relative path wrong (../../ vs ../)
   - Alias not configured (@sando/tokens)
   - Case sensitivity (Button.ts vs button.ts)

3. **Circular Dependencies:**
   - A imports B, B imports A
   - Causes: poor architecture, shared types

4. **Type Imports:**
   - Missing `type` keyword (import type { Foo })
   - Type-only imports compiled unnecessarily

# Suggestions

For each error, provide:

- Current import (broken)
- Fixed import (corrected)
- Why it's broken
- Auto-fix option (if safe)

# Output Format
```

🔧 Import Analysis

Running TypeScript compiler... ❌ 8 import errors found

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERROR #1: Cannot find module
File: packages/components/src/components/modal/sando-modal.ts
Line: 3

Current (BROKEN):

```typescript
import { tokens } from "@sando/tokens/recipe";
//                                    ^^^^^^
// ERROR: Cannot find module '@sando/tokens/recipe'
```

Root Cause:

- Typo in path: 'recipe' should be 'recipes' (plural)

Fixed:

```typescript
import { tokens } from "@sando/tokens/recipes";
//                                    ^^^^^^^
```

Auto-fix available: Yes
Apply fix? (y/n)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERROR #2: Circular dependency
Files:

- packages/components/src/components/button/sando-button.ts
- packages/components/src/components/icon/sando-icon.ts

Circular chain:
sando-button.ts → imports SandoIcon
sando-icon.ts → imports SandoButton

Root Cause:

- Poor separation of concerns
- Shared types should be in separate file

Fix (Recommended):

1. Extract shared types to types.ts
2. Both import from types.ts (no circular dependency)

```typescript
// NEW FILE: packages/components/src/types/shared.ts
export interface BaseComponentProps {
	size: "small" | "medium" | "large";
	disabled: boolean;
}

// sando-button.ts
import { BaseComponentProps } from "../types/shared.js";
import { SandoIcon } from "../icon/sando-icon.js"; // ✅ OK now

// sando-icon.ts
import { BaseComponentProps } from "../types/shared.js";
// ✅ No longer imports SandoButton
```

Auto-fix available: No (requires refactoring)
Manual action required.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERROR #3: Missing type keyword
File: packages/components/src/components/dropdown/sando-dropdown.ts
Line: 5

Current (INEFFICIENT):

```typescript
import { DropdownOption } from "./sando-dropdown.types.js";
// This imports the type at runtime (unnecessary)
```

Fixed:

```typescript
import type { DropdownOption } from "./sando-dropdown.types.js";
// Type-only import (removed at compile time)
```

Impact:

- Reduces bundle size (type removed in production)
- Clearer intent (this is type-only)

Auto-fix available: Yes
Apply fix? (y/n)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:

Import Errors:
Cannot find module: 3 errors
Circular dependencies: 2 errors
Missing type keyword: 3 errors

Auto-fixable: 6 errors
Manual fixes required: 2 errors (circular deps)

Apply all auto-fixes? (y/n)

If yes:

- 6 files will be updated
- TypeScript errors reduced from 8 → 2
- Remaining 2 require manual refactoring

```

```

**Justificación del costo de tokens:**

- Parsea errores complejos de TypeScript
- Detecta circular dependencies (análisis de grafo)
- Genera fixes automáticos seguros
- **No es solo `tsc --noEmit`**

---

### 📊 CATEGORÍA 3: INFORMACIÓN AGREGADA (3 Comandos)

Comandos que **combinan fuentes** y **generan insights**.

---

#### COMANDO #10: `/tokens-stats`

**¿Por qué vale la pena?**

- ✅ Escanea todos los archivos de tokens
- ✅ Calcula estadísticas agregadas
- ✅ Muestra tendencias y distribución
- ✅ Detecta anomalías

**Archivo:** `.claude/commands/status/tokens-stats.md`

```markdown
---
description: Design token statistics (counts, sizes, distribution, insights)
allowed-tools: Read, Glob, Bash
---

Analyze design token system comprehensively.

# Scan Token Files

Glob and read:

- packages/tokens/src/ingredients/\*.json
- packages/tokens/src/flavors/_/_.json
- packages/tokens/src/recipes/\*.json

# Count Tokens

For each layer:

- Total tokens
- Tokens by category (color, spacing, typography, etc.)
- Tokens by file

# Analyze Distribution

1. **Ingredients:**
   - Color palettes: 8 (count tokens per palette)
   - Spacing scale: X tokens
   - Typography: X tokens
   - Other categories

2. **Flavors:**
   - Themes count: X
   - Tokens per theme: X
   - Variants per theme: 5 (base, dark, high-contrast, etc.)

3. **Recipes:**
   - Components with tokens: X
   - Tokens per component (average, min, max)

# Calculate Sizes

Check dist/ folder:

- CSS output size (total, gzipped)
- TypeScript output size
- Per-layer breakdown

# Detect Insights

- Most token-heavy component
- Least token-heavy component
- Unused tokens (defined but not consumed)
- Missing tokens (referenced but not defined)

# Output Format
```

🎨 Design Token Statistics

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INGREDIENTS LAYER (Primitives)
Total: 127 tokens

By Category:
Color palettes: 88 tokens (8 palettes × 11 steps)
├─ orange: 11 tokens
├─ blue: 11 tokens
├─ green: 11 tokens
├─ red: 11 tokens
├─ purple: 11 tokens
├─ pink: 11 tokens
├─ neutral: 11 tokens
└─ neutral-warm: 11 tokens

Spacing: 20 tokens (0.25rem - 16rem)
Typography: 12 tokens (font families, sizes, weights)
Border: 3 tokens (widths)
Border Radius: 5 tokens (rounded corners)
Shadows: 8 tokens (elevation levels)
Z-index: 6 tokens (stacking order)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FLAVORS LAYER (Semantic)
Total: 780 tokens (5 themes × 156 tokens)

By Theme:
├─ original: 156 tokens (5 variants)
├─ ocean: 156 tokens (5 variants)
├─ sunset: 156 tokens (5 variants)
├─ forest: 156 tokens (5 variants)
└─ strawberry: 156 tokens (5 variants)

Variants per theme:
├─ base (light): 156 tokens
├─ dark: 156 tokens
├─ high-contrast: 156 tokens
├─ forced-colors: 156 tokens
└─ motion-reduce: 156 tokens

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECIPES LAYER (Component-specific)
Total: 45 tokens (2 components)

By Component:
├─ button: 32 tokens
│ ├─ solid variant: 12 tokens
│ ├─ outline variant: 10 tokens
│ └─ ghost variant: 10 tokens
│
└─ icon: 13 tokens
└─ size variants: 13 tokens

Average tokens per component: 22.5
Most token-heavy: button (32)
Least token-heavy: icon (13)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUILD OUTPUTS

CSS Files:
Total size: 47.2 KB (12.3 KB gzipped) ✅
Target: <50 KB gzipped

By layer:
ingredients.css: 8.4 KB
flavors/: 32.1 KB (5 themes)
recipes/: 6.7 KB

TypeScript Files:
Total size: 23.8 KB

ingredients.ts: 4.2 KB
flavors.ts: 15.3 KB
recipes.ts: 4.3 KB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INSIGHTS

✅ Token system is healthy
✓ All layers properly populated
✓ Consistent structure across themes
✓ Output sizes within budget

📈 Growth trends:

- 2 components implemented (15% of roadmap)
- 5 themes available (good variety)
- Room for 10+ more components before hitting size limit

⚠️ Recommendations:

1. Add 3-5 more components to justify Recipe layer
2. Consider adding "midnight" theme (dark blue palette)
3. Document token consumption patterns

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Token Generation Time: 3.2s
Last built: 14 minutes ago
Build cache: .build-cache.json (fresh)

```

```

**Justificación del costo de tokens:**

- Escanea y parsea múltiples archivos JSON
- Calcula estadísticas agregadas
- Genera insights sobre tendencias
- **No es solo `wc -l *.json`**

---

#### COMANDO #11: `/components-list`

**¿Por qué vale la pena?**

- ✅ Escanea estructura de componentes
- ✅ Valida completitud (7 archivos)
- ✅ Extrae metadata (variantes, cobertura)
- ✅ Genera reporte de estado

**Archivo:** `.claude/commands/status/components-list.md`

```markdown
---
description: List all components with status, variants, coverage, documentation
allowed-tools: Read, Glob, Bash
---

List all Sando components with comprehensive status.

# Scan Components

Glob: packages/components/src/components/\*/

For each component:

1. Check if all 7 files exist
2. Read implementation file to extract:
   - Variants (@property variant)
   - Sizes (@property size)
   - Props count
3. Check test coverage (if coverage/ exists)
4. Check Storybook stories count
5. Detect status:
   - ✅ COMPLETE: All 7 files, coverage >85%, stories present
   - 🚧 IN PROGRESS: Missing files or coverage <85%
   - 📝 PLANNED: Folder exists but empty

# Extract Information

From each component:

- Name
- Element tag (sando-X)
- Variants available
- Size options
- Test coverage %
- Number of Storybook stories
- A11y status (a11y tests exist?)
- Last modified date

# Calculate Metrics

- Total components
- Components by status
- Average test coverage
- Components with WCAG AA compliance

# Output Format
```

📦 Sando Components Inventory

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPLETE COMPONENTS (1)

✅ sando-button
Element: <sando-button>
Variants: solid, outline, ghost (3)
Sizes: small, medium, large (3)

Files: 7/7 ✅
✓ sando-button.ts
✓ sando-button.types.ts
✓ sando-button.test.ts
✓ sando-button.spec.ts
✓ sando-button.a11y.test.ts
✓ sando-button.stories.ts
✓ index.ts

Quality:
Coverage: 91.2% ✅ (target: >85%)
Storybook: 8 stories ✅
A11y: WCAG AA ✅ (0 violations)

Last modified: 2 days ago

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IN PROGRESS (1)

🚧 sando-modal
Element: <sando-modal>
Variants: center, fullscreen (2)
Sizes: N/A (fills viewport)

Files: 6/7 ⚠️
✓ sando-modal.ts
✓ sando-modal.types.ts
✓ sando-modal.test.ts
✓ sando-modal.spec.ts
❌ sando-modal.a11y.test.ts (MISSING)
✓ sando-modal.stories.ts
✓ index.ts

Quality:
Coverage: 76.3% ⚠️ (needs +8.7%)
Storybook: 4 stories ⚠️ (could use more)
A11y: PENDING ❌ (no axe-core tests)

Last modified: 3 hours ago

TODO: 1. Add sando-modal.a11y.test.ts 2. Increase coverage to >85% 3. Add more Storybook examples

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PLANNED (1)

📝 sando-dropdown
Status: Folder exists, no files yet

Planned Features (from roadmap): - Single select dropdown - Keyboard navigation - Search/filter - Multi-select variant

Priority: HIGH
Estimated effort: 2-3 days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY

Components by Status:
✅ Complete: 1 (33%)
🚧 In Progress: 1 (33%)
📝 Planned: 1 (33%)

Total: 3 components

Quality Metrics:
Average coverage: 83.8% ⚠️ (target: >85%)
WCAG AA compliant: 1/2 (50%) - need a11y tests for modal

Storybook:
Total stories: 12 (avg: 4 per component)

Roadmap:
Next components: Input, Select, Checkbox, Card
Completion: 3/20 (15% of planned components)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDATIONS

1. Complete sando-modal (add a11y tests, increase coverage)
2. Start sando-input (highest priority, form components needed)
3. Review component API consistency (ensure all follow same patterns)

```

```

**Justificación del costo de tokens:**

- Escanea estructura de directorios
- Valida completitud de archivos
- Extrae metadata desde código
- Calcula métricas agregadas
- **No es solo `ls -l`**

---

#### COMANDO #12: `/flavors-list`

**¿Por qué vale la pena?**

- ✅ Escanea todos los flavors
- ✅ Extrae colores primarios (parsing JSON)
- ✅ Muestra ejemplos de uso
- ✅ Valida estructura (5 archivos obligatorios)

**Archivo:** `.claude/commands/status/flavors-list.md`

```markdown
---
description: List all available flavors/themes with colors and usage examples
allowed-tools: Read, Glob
---

List all Sando flavors (themes) with comprehensive information.

# Scan Flavors

Glob: packages/tokens/src/flavors/\*/

For each flavor:

1. Check if all 5 files exist:
   - flavor.json (base)
   - flavor-dark.json
   - flavor-high-contrast.json
   - flavor-forced-colors.json
   - flavor-motion-reduce.json

2. Read flavor.json to extract:
   - Primary color palette (action.solid.background.default)
   - Neutral palette
   - Background colors
   - Text colors

# Extract Color Info

Parse flavor.json:

- Resolve token references to Ingredient values
- Convert to hex for display
- Show color swatches (if terminal supports)

# Generate Usage Examples

For each flavor, show:

- HTML attribute usage
- CSS override example
- Component preview (if possible)

# Output Format
```

🎨 Sando Flavors (Themes)

Available Flavors: 5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ original (Default)
Primary: orange (#f97316)
Neutral: neutral-warm

Color Palette:
■ Primary: #f97316 (orange.600)
■ Background: #fafafa (neutral-warm.50)
■ Text: #171717 (neutral-warm.900)

Files: 5/5 ✅
✓ flavor.json
✓ flavor-dark.json
✓ flavor-high-contrast.json
✓ flavor-forced-colors.json
✓ flavor-motion-reduce.json

Usage:
HTML: <html flavor="original">
CSS: [flavor="original"] { ... }

Status: Production-ready ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ ocean
Primary: blue (#3b82f6)
Neutral: neutral-cool

Color Palette:
■ Primary: #3b82f6 (blue.500)
■ Background: #f8fafc (neutral-cool.50)
■ Text: #0f172a (neutral-cool.900)

Files: 5/5 ✅

Usage:
HTML: <html flavor="ocean">
CSS: [flavor="ocean"] { ... }

Status: Production-ready ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ sunset
Primary: orange (#fb923c)
Neutral: neutral-warm

Color Palette:
■ Primary: #fb923c (orange.400)
■ Background: #fef3e2 (neutral-warm.100)
■ Text: #431407 (neutral-warm.950)

Files: 5/5 ✅
Status: Production-ready ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ forest
Primary: green (#22c55e)
Neutral: neutral

Color Palette:
■ Primary: #22c55e (green.500)
■ Background: #f9fafb (neutral.50)
■ Text: #111827 (neutral.900)

Files: 5/5 ✅
Status: Production-ready ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ strawberry
Primary: pink (#ec4899)
Neutral: neutral

Color Palette:
■ Primary: #ec4899 (pink.500)
■ Background: #fef2f2 (neutral.50 with pink tint)
■ Text: #1f2937 (neutral.800)

Files: 5/5 ✅
Status: Production-ready ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY

Total Flavors: 5
Production-ready: 5 (100%)
Average tokens per flavor: 156

Supported Variants:
✓ Light mode (base)
✓ Dark mode
✓ High contrast
✓ Forced colors (Windows High Contrast)
✓ Reduced motion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

USAGE EXAMPLES

Global theme:

  <html flavor="ocean">
    <body>
      <sando-button>Ocean themed</sando-button>
    </body>
  </html>

Section theme:

  <div flavor="sunset">
    <sando-button>Sunset themed</sando-button>
  </div>

Multiple themes on page:

  <header flavor="forest">...</header>
  <main flavor="ocean">...</main>
  <footer flavor="original">...</footer>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDATIONS

1. All flavors production-ready ✅
2. Consider adding:
   - "midnight" (dark blue palette)
   - "lavender" (purple palette)
3. Document flavor selection guide for clients

```

```

**Justificación del costo de tokens:**

- Escanea y parsea múltiples JSON
- Resuelve referencias de tokens
- Extrae colores y genera swatches
- **No es solo `ls flavors/`**

---

### ⚡ CATEGORÍA 4: SHORTCUTS DE SKILLS (4 Comandos)

Comandos que **invocan skills explícitamente** (conveniencia).

---

#### COMANDO #13: `/new-component`

**¿Por qué vale la pena?**

- ✅ Shortcut más rápido que frase natural
- ✅ Invoca skill component-creator
- ✅ Workflow frecuente merece comando dedicado

**Archivo:** `.claude/commands/generate/new-component.md`

```markdown
---
description: Create new component (invokes component-creator skill)
argument-hint: <component-name>
---

Create new component: $ARGUMENTS

This command invokes the **component-creator** skill to generate all 7 required files.

Interactive prompts will ask for:

- Variants (e.g., solid, outline, ghost)
- Sizes (e.g., small, medium, large)
- Additional props

Files generated:

- sando-$ARGUMENTS.ts
- sando-$ARGUMENTS.types.ts
- sando-$ARGUMENTS.stories.ts
- sando-$ARGUMENTS.test.ts
- sando-$ARGUMENTS.spec.ts
- sando-$ARGUMENTS.a11y.test.ts
- index.ts

Invoking component-creator skill...
```

**Justificación:**

- Es un **shortcut** de una skill existente
- Más rápido escribir `/new-component card` que "Create a Card component"
- **No duplica funcionalidad**, solo facilita invocación

---

#### COMANDO #14: `/new-flavor`

**¿Por qué vale la pena?**

- ✅ Shortcut para crear themes
- ✅ Invoca skill flavor-creator
- ✅ Workflow común en proyectos multi-cliente

**Archivo:** `.claude/commands/generate/new-flavor.md`

```markdown
---
description: Create new flavor/theme (invokes flavor-creator skill)
argument-hint: <flavor-name>
---

Create new flavor: $ARGUMENTS

This command invokes the **flavor-creator** skill to generate all 5 required files.

Interactive prompts will ask for:

- Primary color palette (orange, blue, green, etc.)
- Neutral palette (neutral, neutral-warm, neutral-cool)
- Spacing density (compact, comfortable, spacious)

Files generated:

- packages/tokens/src/flavors/$ARGUMENTS/flavor.json
- packages/tokens/src/flavors/$ARGUMENTS/flavor-dark.json
- packages/tokens/src/flavors/$ARGUMENTS/flavor-high-contrast.json
- packages/tokens/src/flavors/$ARGUMENTS/flavor-forced-colors.json
- packages/tokens/src/flavors/$ARGUMENTS/flavor-motion-reduce.json

Invoking flavor-creator skill...
```

**Justificación:**

- Shortcut de skill existente
- Crear flavors es común en agencias/multi-cliente
- Más rápido que frase natural

---

#### COMANDO #15: `/add-variant`

**¿Por qué vale la pena?**

- ✅ Shortcut para expandir componentes
- ✅ Invoca skill component-variant-expander
- ✅ Tarea frecuente durante iteración

**Archivo:** `.claude/commands/generate/add-variant.md`

```markdown
---
description: Add variant to component (invokes component-variant-expander skill)
argument-hint: <component-name> <variant-name>
---

Add variant to component: $1 → variant: $2

This command invokes the **component-variant-expander** skill to:

1. Update types (add variant to type union)
2. Add CSS styles for new variant
3. Generate Recipe tokens
4. Add tests for new variant
5. Add Storybook story

Example: /add-variant button tertiary

Invoking component-variant-expander skill...
```

**Justificación:**

- Shortcut de skill existente
- Agregar variantes es común durante desarrollo
- Sintaxis clara: `/add-variant [component] [variant]`

---

#### COMANDO #16: `/generate-palette`

**¿Por qué vale la pena?**

- ✅ Shortcut para generar paletas OKLCH
- ✅ Invoca skill color-palette-generator
- ✅ Feature diferenciador del proyecto

**Archivo:** `.claude/commands/generate/generate-palette.md`

```markdown
---
description: Generate OKLCH palette from hex (invokes color-palette-generator skill)
argument-hint: <hex-color>
---

Generate color palette from: $ARGUMENTS

This command invokes the **color-palette-generator** skill to:

1. Convert hex to OKLCH
2. Generate 11 steps (50-950) with perceptual uniformity
3. Validate WCAG AA compliance (4.5:1 contrast)
4. Output as Ingredient JSON

Example:
/generate-palette #8B5CF6
/generate-palette #FF6B00

Invoking color-palette-generator skill...
```

**Justificación:**

- Shortcut de skill existente
- Generar paletas es feature clave del proyecto
- Sintaxis clara: `/generate-palette [hex]`

---

### 📏 CATEGORÍA 5: ANÁLISIS DE PERFORMANCE (1 Comando)

---

#### COMANDO #17: `/bundle-size`

**¿Por qué vale la pena?**

- ✅ Analiza tamaños de bundles
- ✅ Compara con targets (presupuesto)
- ✅ Detecta regresiones de tamaño
- ✅ Genera alertas si excede límites

**Archivo:** `.claude/commands/status/bundle-size.md`

```markdown
---
description: Analyze bundle sizes with budget alerts (tokens, components)
allowed-tools: Bash, Read, Glob
---

Analyze bundle sizes and compare with performance budget.

# Check Build Artifacts

Scan:

- dist/sando-tokens/css/ (CSS sizes)
- dist/ (component bundles)
- storybook-static/ (Storybook size)

# Calculate Sizes

For each artifact:

- Raw size (KB)
- Gzipped size (KB)
- Brotli size (KB, if available)

# Performance Budget

Compare with targets:

- Tokens CSS: <50 KB gzipped
- Component bundles: <15 KB gzipped each
- Storybook: <5 MB total

# Trend Analysis

If history available:

- Size trend (increasing/decreasing)
- Largest contributors
- Optimization opportunities

# Output Format
```

📦 Bundle Size Analysis

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN TOKENS (CSS)

Total: 47.2 KB (12.3 KB gzipped) ✅
Budget: <50 KB gzipped
Remaining: 37.7 KB (75% headroom)

By Layer:
ingredients.css: 8.4 KB (2.1 KB gzipped)
flavors/: 32.1 KB (8.2 KB gzipped) - 5 themes
recipes/: 6.7 KB (2.0 KB gzipped) - 2 components

Optimization:
✅ Well within budget
💡 CSS minification working correctly
💡 Tree-shaking effective

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTS (JavaScript)

sando-button:
Raw: 23.4 KB
Gzipped: 8.2 KB ✅
Budget: <15 KB gzipped
Status: 45% of budget used

sando-modal:
Raw: 41.2 KB
Gzipped: 13.7 KB ✅
Budget: <15 KB gzipped
Status: 91% of budget used ⚠️
Warning: Close to budget limit

Total Components: 64.6 KB (21.9 KB gzipped)
Average per component: 32.3 KB (10.95 KB gzipped)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STORYBOOK BUILD

Total: 2.3 MB ✅
Budget: <5 MB
Status: 46% of budget used

Largest files:

1. vendors~main.js: 1.2 MB
2. main.js: 0.8 MB
3. iframe.html: 0.3 MB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDATIONS

✅ All bundles within budget

⚠️ Warnings:

1. sando-modal is 91% of budget (consider optimization)
   - Review animation library size
   - Lazy-load non-critical features

💡 Optimization opportunities:

1. Enable Brotli compression (30% smaller than gzip)
2. Consider code splitting for modal (separate chunk)
3. Tree-shake unused Lit features

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TREND (Last 7 days)

Tokens: +2.1 KB (+4.7%) - added 2 new flavors
Components: +8.2 KB (+12%) - added modal component
Storybook: +0.3 MB (+15%) - added stories

Overall trend: Growing as expected (new components)
Budget risk: LOW (still 50%+ headroom)

```

```

**Justificación del costo de tokens:**

- Calcula tamaños con múltiples compresiones
- Compara con presupuesto de performance
- Detecta tendencias y regresiones
- **No es solo `du -h dist/`**

---

## 2. ROADMAP DE IMPLEMENTACIÓN REVISADO

### Fase 1: Análisis Inteligente (Semana 1-2)

**7 comandos de alto valor:**

1. `/status`
2. `/coverage`
3. `/review-component`
4. `/review-tokens`
5. `/review-a11y`
6. `/review-pr`
7. `/explain-component`

**Tiempo:** 10-14 días
**Impacto:** Alto (uso diario)

---

### Fase 2: Troubleshooting (Semana 3)

**2 comandos críticos:** 8. `/why-failing` 9. `/fix-imports`

**Tiempo:** 5-7 días
**Impacto:** Alto (reduce fricción)

---

### Fase 3: Información (Semana 4)

**3 comandos de insights:** 10. `/tokens-stats` 11. `/components-list` 12. `/flavors-list`

**Tiempo:** 4-6 días
**Impacto:** Medio (visibilidad)

---

### Fase 4: Shortcuts (Semana 5)

**4 comandos de conveniencia:** 13. `/new-component` 14. `/new-flavor` 15. `/add-variant` 16. `/generate-palette`

**Tiempo:** 2-3 días
**Impacto:** Medio (DX)

---

### Fase 5: Performance (Semana 5)

**1 comando de monitoreo:** 17. `/bundle-size`

**Tiempo:** 2 días
**Impacto:** Medio (prevención)

---

**Total:** 17 comandos en 5 semanas (vs 25 en plan anterior)

---

## 3. ESTRUCTURA DE ARCHIVOS REVISADA

```
.claude/
├── commands/                        # 17 slash commands (vs 25)
│   ├── status/                     # Análisis Inteligente (7)
│   │   ├── status.md
│   │   ├── coverage.md
│   │   ├── tokens-stats.md
│   │   ├── components-list.md
│   │   ├── flavors-list.md
│   │   └── bundle-size.md
│   ├── review/                     # Review & Análisis (5)
│   │   ├── review-component.md
│   │   ├── review-tokens.md
│   │   ├── review-a11y.md
│   │   ├── review-pr.md
│   │   └── explain-component.md
│   ├── generate/                   # Shortcuts de Skills (4)
│   │   ├── new-component.md
│   │   ├── new-flavor.md
│   │   ├── add-variant.md
│   │   └── generate-palette.md
│   └── troubleshoot/               # Troubleshooting (2)
│       ├── why-failing.md
│       └── fix-imports.md
├── skills/                         # 15 skills + 1 nueva
│   ├── component-creator/
│   ├── command-creator/            # ⭐ NUEVA SKILL
│   └── ...
└── agents/                         # 18 agents existentes
    └── ...
```

---

## 4. MÉTRICAS DE ÉXITO REVISADAS

### ROI Mejorado

**Inversión:**

- 17 comandos × 0.5 días promedio = **8.5 días** (vs 12.5 días antes)
- Ahorro de tiempo: **4 días de desarrollo**

**Costo de Tokens Reducido:**

- Eliminados 8 comandos wrapper = **0 tokens desperdiciados**
- Cada invocación de comando ahora **justifica su costo**

### Eficiencia de Uso

**Comandos más usados (predicción):**

1. `/status` - Diario
2. `/review-component` - Múltiples veces/semana
3. `/why-failing` - Cuando tests fallan
4. `/coverage` - Antes de PR
5. `/new-component` - Cada componente nuevo

**Comandos menos usados:**

- `/bundle-size` - Semanal
- `/fix-imports` - Ocasional
- `/generate-palette` - Raro

---

## 5. REGLA DE ORO (Repetida para énfasis)

```
┌────────────────────────────────────────────────────────────┐
│         ANTES DE CREAR UN SLASH COMMAND, PREGUNTA:         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  1. ¿Ya existe un script en package.json?                  │
│     SÍ → USA EL SCRIPT DIRECTAMENTE (gratis)               │
│                                                             │
│  2. ¿Este comando solo ejecuta bash sin análisis?          │
│     SÍ → NO CREAR COMANDO (usa bash)                       │
│                                                             │
│  3. ¿Combina múltiples fuentes o provee insights?          │
│     NO → NO VALE LA PENA                                   │
│     SÍ → CONTINUAR                                         │
│                                                             │
│  4. ¿La IA agrega valor sobre bash/grep/cat?               │
│     NO → NO CREAR COMANDO                                  │
│     SÍ → ✅ COMANDO JUSTIFICADO                            │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 6. COMPARACIÓN: ANTES vs DESPUÉS

| Métrica                   | Plan Original | Plan Revisado | Mejora |
| ------------------------- | ------------- | ------------- | ------ |
| **Total comandos**        | 25            | 17            | -32%   |
| **Comandos wrapper**      | 8             | 0             | -100%  |
| **Tiempo implementación** | 12.5 días     | 8.5 días      | -32%   |
| **Tokens desperdiciados** | Alto          | 0             | -100%  |
| **Valor por comando**     | Mixto         | Alto          | +100%  |
| **ROI**                   | 5 componentes | 3 componentes | +40%   |

---

## 7. CONCLUSIONES

### Cambios Clave

1. **Eliminados 8 comandos wrapper** que solo ejecutaban `package.json` scripts
2. **Mantenidos 17 comandos** que agregan valor inteligente
3. **Definida Regla de Oro** para evaluar futuros comandos
4. **ROI mejorado** (menos tiempo, más valor)

### Filosofía Actualizada

**Slash Commands son para:**

- ✅ Análisis inteligente (combinar fuentes, generar insights)
- ✅ Troubleshooting guiado (root cause analysis)
- ✅ Reviews automatizados (checklists, recomendaciones)
- ✅ Shortcuts de skills (conveniencia, no duplicación)

**Slash Commands NO son para:**

- ❌ Wrappers de package.json scripts (usa bash directamente)
- ❌ Comandos simples sin análisis (usa bash)
- ❌ Tareas que no justifican costo de tokens

### Próximos Pasos

1. ✅ Implementar Fase 1 (comandos de análisis)
2. ✅ Crear skill `command-creator` para generar comandos consistentes
3. ✅ Validar ROI después de 2 semanas
4. ✅ Iterar basado en feedback real

---

**Última Actualización:** Enero 2025 (Revisado)
**Autor:** Análisis generado por Claude (Anthropic)
**Estado:** Listo para Implementación
**Cambio Principal:** Eliminados comandos wrapper, enfoque en valor inteligente

---

## Apéndice A: Comandos Eliminados y Sus Alternativas

| Comando Eliminado | Alternativa Gratis            | Tiempo Ahorrado |
| ----------------- | ----------------------------- | --------------- |
| `/build`          | `pnpm build`                  | 0 tokens        |
| `/dev`            | `pnpm dev`                    | 0 tokens        |
| `/test`           | `pnpm test`                   | 0 tokens        |
| `/lint`           | `pnpm lint`                   | 0 tokens        |
| `/clean`          | `pnpm clean`                  | 0 tokens        |
| `/storybook`      | `pnpm docs:dev`               | 0 tokens        |
| `/tokens-build`   | `pnpm tokens:build`           | 0 tokens        |
| `/cache-clear`    | `rm -rf .turbo && pnpm clean` | 0 tokens        |

**Total tokens ahorrados por día:** Depende de uso, pero si cada desarrollador ejecuta `/build` 10 veces/día, ahorras tokens significativos.

---

**FIN DEL DOCUMENTO**
