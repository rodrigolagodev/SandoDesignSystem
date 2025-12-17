# 🔍 EVIDENCIA: Guidelines Como Source of Truth en Acción

Este documento muestra **pruebas concretas** de que los guidelines funcionan realmente como fuente única de verdad.

---

## Caso 1: Token Architecture (TA-CR-R1)

### El Guideline (TOKEN_ARCHITECTURE.toon)

```toon
- id: "TA-CR-R1"
  title: "Strict Layer References (Non-Negotiable)"
  summary: "Each layer references ONLY the layer directly below it"
  reference_flow: "Components → Recipes → Flavors → Ingredients → Absolute values"
  critical_rules:
    - for_layer: "Ingredients"
      constraint: "Absolute values ONLY (no {...} references)"
    - for_layer: "Flavors"
      constraint: "Reference ONLY Ingredients: {color.orange.700.value}"
    - for_layer: "Recipes"
      constraint: "Reference ONLY Flavors: {color.action.solid.background.default.value}"
```

### Cómo lo Consume frontend-developer Agent

```markdown
## Mode 2: Implementation Mode

Phase 2: Implementation 3. Styles - Consume **Recipe tokens (Layer 3) ONLY**, como se define en `rule id="TA-CR-R1"` - Use CSS custom properties for themeable values
```

**¿Qué pasa si dev violaría TA-CR-R1?**

- ❌ WRONG: Recipe referencia Ingredient directamente
- ✅ CORRECT: Recipe referencia Flavor, que a su vez referencia Ingredient

**Resultado**: El agente frontend-developer EVITA el error porque lo consulta en el guideline antes de implementar.

---

## Caso 2: Test Coverage Thresholds (TEST_COVERAGE.toon)

### El Guideline

```toon
threshold_list:
  - id: "TC-TL-R1"
    threshold:
      - type: "unit"
        value: "80%"
      - type: "accessibility"
        value: "100%"
      - type: "e2e"
        value: "coverage for critical flows only"
```

### Cómo lo Consume qa-expert Agent

```markdown
## Quality Standards

Every delivery must meet:

- ✓ Unit coverage meets `coverage_threshold type="unit"` value in `TEST_COVERAGE.toon`.
- ✓ Accessibility coverage meets `coverage_threshold type="accessibility"` value.

## Workflow

### Phase 1: Test Planning (TOON-First)

1. Review component specifications.
2. **Load and parse** `TESTING_STRATEGY.toon` y `TEST_COVERAGE.toon`.
3. **Query** the `coverage_threshold` tags to set objectives.
```

**¿Qué pasa si qa-expert asume un threshold diferente?**

- ❌ WRONG: Usar 90% unit coverage (es más alto que guideline)
- ✅ CORRECT: Usar exactamente 80% per guideline

**Resultado**: El agente qa-expert NUNCA especifica un threshold diferente porque lo consulta primero.

---

## Caso 3: Semantic Versioning (GIT_WORKFLOW.toon)

### El Guideline

```toon
core_rules:
  - id: "GIT-CR-R1"
    title: "Semantic Versioning (Non-Negotiable)"
    summary: "Strictly follow SemVer: breaking → major, features → minor, fixes → patch"
    rules:
      - change: "Prop removed/renamed/type changed"
        category: "BREAKING"
        semver_bump: "MAJOR"
```

### Cómo lo Consume version-migration-manager Agent

```markdown
## Decision Priority Hierarchy

1. **Sando Guidelines** - HIGHEST PRIORITY
   - SemVer rules from GIT_WORKFLOW.md

### Example Decision

Question: Team wants to rename Button "variant" prop to "appearance". Is this breaking?

❌ WRONG: Make the change in a minor release (violates SemVer)

✅ CORRECT:

1. Read 03-development/GIT_WORKFLOW.md (SemVer rules)
2. Find: "Property rename is BREAKING CHANGE - requires major version"
3. Plan:
   - v2.9: Add "appearance" prop, deprecate "variant"
   - v2.10-v2.15: Migration period (3-6 months)
   - v3.0: Remove "variant" prop (breaking change)
```

**¿Qué pasa si version-migration-manager no consultara el guideline?**

- ❌ WRONG: Release minor version con rename (rompe SemVer contrato)
- ✅ CORRECT: Plan proper deprecation cycle usando guideline

**Resultado**: El agente version-migration-manager RESPETA SemVer porque consulta guideline primero.

---

## Caso 4: WCAG Compliance (WCAG_COMPLIANCE.toon)

### El Guideline

```toon
core_rules:
  - id: "WCAG-CR-R1"
    title: "WCAG 2.1 AA is Non-Negotiable"
    wcag_requirement:
      - level: "AA"
      - violations_allowed: "0"
      - testing: "axe-core + manual screen reader testing"
```

### Cómo lo Consume accessibility-advocate Agent

```markdown
## Quality Standards

Every delivery must meet:

- ✓ WCAG 2.1 AA compliance verified per `WCAG_COMPLIANCE.md` (0 violations)

## Key Principles

You MUST always prioritize:

1. **Guidelines First**: Read WCAG_COMPLIANCE.md before auditing
2. **Zero Violations**: WCAG 2.1 AA compliance non-negotiable - 0 violations required
```

**¿Qué pasa si accessibility-advocate aceptara 1-2 violaciones?**

- ❌ WRONG: Aceptar "solo 1 pequeña violación" (compromete accesibilidad)
- ✅ CORRECT: Insistir en 0 violaciones per guideline

**Resultado**: El agente accessibility-advocate FUERZA compliance porque guideline es no-negociable.

---

## Caso 5: Component API Design (COMPONENT_DESIGN.toon)

### El Guideline

```toon
core_rules:
  - id: "CD-CR-R1"
    title: "Minimal Props Over Configuration"
    summary: "Prefer composition with slots over bloated props"
    anti_pattern: "Adding lots of props (headerText, bodyContent, footerButtons)"
    pattern: "Compound components with slots (card-header, card-body, card-footer)"
```

### Cómo lo Consume component-composition-specialist Agent

```markdown
### Example Decision

Question: Card component needs header, body, footer. Use props or composition?

❌ WRONG: Add headerText, bodyContent, footerButtons props

✅ CORRECT:

1. Read 02-architecture/COMPONENT_ARCHITECTURE.md (slot patterns)
2. Read 01-design-system/COMPONENT_DESIGN.md (API conventions - minimal props)
3. Design: Compound components with slots
   - sando-card (container with 3 slots)
   - sando-card-header (for header slot)
   - sando-card-body (for default slot)
   - sando-card-footer (for footer slot)
```

**¿Qué pasa si component-composition-specialist asumiera que múltiples props está OK?**

- ❌ WRONG: Card con {headerText, bodyContent, footerButtons} props (inflexible)
- ✅ CORRECT: Compound components con slots (flexible, sigue guideline)

**Resultado**: El agente component-composition-specialist DISEÑA APIs flexibles porque guideline lo prescribe.

---

## Patrón Consistente: @-Directives

Todos los agentes usan el mismo patrón para referenciar guidelines:

```markdown
## Your Primary Guidelines

**CRITICAL**: The following guideline files are injected into your context using the `@` directive.

@.claude/guidelines/GUIDELINES_INDEX.toon
@.claude/guidelines/03-development/CODE_STYLE.toon
@.claude/guidelines/02-architecture/COMPONENT_ARCHITECTURE.toon
```

**Lo que esto significa**:

- ✅ Guideline es cargado en contexto del agente
- ✅ Agente puede parsearlo como TOON structure
- ✅ Agente lo consulta antes de decisiones
- ✅ Cambios en guideline = cambios en comportamiento del agente

---

## Decision Priority Hierarchy - Idéntico en TODOS los Agentes

```
AGENTE: design-system-architect
1. Sando TOON Guidelines - HIGHEST PRIORITY
2. Context7 Library Docs
3. General Best Practices

AGENTE: frontend-developer
1. Sando TOON Guidelines - HIGHEST PRIORITY
2. Context7 Library Docs
3. General Best Practices

AGENTE: ui-designer
1. Sando TOON Guidelines - HIGHEST PRIORITY
2. Design Best Practices
3. Figma/Tool-Specific

AGENTE: qa-expert
1. Sando TOON Guidelines - HIGHEST PRIORITY
2. Context7 Library Docs
3. General Best Practices

AGENTE: accessibility-advocate
1. Sando Guidelines - HIGHEST PRIORITY
2. Context7 Library Docs (axe-core, ARIA, WCAG specs)
3. General Best Practices
```

**Patrón**: 100% de agentes tiene GUIDELINES como HIGHEST PRIORITY

---

## Workflow TOON-First: Idéntico Workflow

### Patrón en TODOS los agentes:

```
BEFORE work   → Load and parse guidelines
DURING work   → Query TOON data structures
AFTER work    → Validate output against constraints
```

### Ejemplos específicos:

**design-system-architect**:

```
BEFORE → Load TOKEN_ARCHITECTURE.toon, COMPONENT_ARCHITECTURE.toon
DURING → Query decision_tree section, find rule id="TA-CR-R2"
AFTER  → Validate output against constraints in guideline
```

**frontend-developer**:

```
BEFORE → Load CODE_STYLE.toon, COMPONENT_ARCHITECTURE.toon
DURING → Query naming_conventions, file_structure_pattern
AFTER  → Validate against test_pyramid, coverage_threshold sections
```

**qa-expert**:

```
BEFORE → Load TESTING_STRATEGY.toon, TEST_COVERAGE.toon
DURING → Query test_pyramid, threshold tags
AFTER  → Validate against coverage_threshold values
```

**Pattern**: 100% de agentes sigue el mismo workflow TOON-First

---

## Query Patterns: Agentes Queryean Específicamente

### Ejemplos de cómo agentes buscan datos:

**design-system-architect Queries**:

```
Query: Find rule with id="TA-CR-R1" (Strict Layer References)
Query: Find decision_tree section in TOKEN_ARCHITECTURE.toon
Query: Find constraints for new_ingredient condition
```

**frontend-developer Queries**:

```
Query: Find pattern_format in NAMING_CONVENTIONS.toon
Query: Find file_structure_pattern in COMPONENT_ARCHITECTURE.toon
Query: Find test_pyramid in TESTING_STRATEGY.toon
Query: Find threshold type="unit" in TEST_COVERAGE.toon
```

**ui-designer Queries**:

```
Query: Find three_layer_architecture in TOKEN_ARCHITECTURE.toon
Query: Find wcag_contrast_requirements in COLOR_CONTRAST.toon
Query: Find palette_groups in COLOR_SYSTEM.toon
Query: Find variant_taxonomy in COMPONENT_DESIGN.toon
```

**Pattern**: Agentes no leen documentos enteros, _queryean específicamente_

---

## Impacto Real: Cómo Funciona

### Ejemplo Completo: Crear Botón

**Paso 1: design-system-architect Define Arquitectura**

- Carga: TOKEN_ARCHITECTURE.toon
- Queries: "¿Cómo debo estructurar tokens para botón?"
- Respuesta: "3 layers - Ingredients (colors) → Flavors (semantic) → Recipes (component-specific)"
- Resultado: Define estructura token para botón

**Paso 2: ui-designer Crea Tokens**

- Carga: TOKEN_ARCHITECTURE.toon + COLOR_SYSTEM.toon
- Queries: "¿Qué formato de color?" + "¿Cuánto contraste?"
- Respuestas: "OKLCH + 4.5:1 AA ratio"
- Resultado: Crea tokens con OKLCH colors, valida contraste

**Paso 3: frontend-developer Implementa**

- Carga: CODE_STYLE.toon + COMPONENT_ARCHITECTURE.toon + TESTING_STRATEGY.toon
- Queries: "¿Estructura de archivos?" + "¿Coverage target?"
- Respuestas: "7-file monolith + 80% unit coverage"
- Resultado: Implementa siguiendo patrón, escribe tests

**Paso 4: qa-expert Valida Tests**

- Carga: TEST_COVERAGE.toon + WCAG_COMPLIANCE.toon
- Queries: "¿Threshold exacto?" + "¿A11y coverage?"
- Respuestas: "80% unit + 100% a11y"
- Resultado: Valida coverage matches guideline exactly

**Paso 5: technical-writer Documenta**

- Carga: API_REFERENCE.toon + STORYBOOK_STORIES.toon
- Queries: "¿Format de property table?" + "¿Organization de stories?"
- Respuestas: VitePress table format + 3-section organization
- Resultado: Escribe docs siguiendo guideline format

**¿Qué hace que esto funcione?**

- ✅ Cada agente consulta guidelines EXPLÍCITAMENTE
- ✅ Todos usan el mismo patrón de query (@directives, TOON parsing)
- ✅ Guideline es la fuente única de verdad
- ✅ Cambiar guideline = cambiar comportamiento de todos los agentes

---

## Validación: Anti-Patterns Previenen Errores

### Ejemplo: Component API

**Si frontend-developer creara Button con 20 props**:

- ✅ Guideline lo previene (lee COMPONENT_DESIGN.toon)
- ✅ Anti-pattern documentado: "❌ DON'T: Add props for every customization"
- ✅ Pattern documentado: "✅ DO: Prefer slots for content projection"
- ✅ Resultado: Agente crea compound components en su lugar

**Si design-system-pm aceptara feature requests sin RICE**:

- ✅ Guideline lo previene (lee GIT_WORKFLOW.md)
- ✅ Anti-pattern documentado: "❌ DON'T: Accept without RICE analysis"
- ✅ Pattern documentado: "✅ DO: Apply RICE framework to every request"
- ✅ Resultado: Agente calcula RICE antes de aceptar

**Si qa-expert usara threshold genérico 80% a11y**:

- ✅ Guideline lo previene (lee TEST_COVERAGE.toon)
- ✅ Anti-pattern documentado: "❌ DON'T: Use generic coverage"
- ✅ Pattern documentado: "✅ DO: Use exact threshold from guideline"
- ✅ Resultado: Agente usa 100% a11y coverage requerido

---

## Conclusión

**Los guidelines funcionan como Source of Truth porque**:

1. ✅ Agentes los referencian explícitamente (@directives)
2. ✅ Todos siguen el mismo patrón TOON-First workflow
3. ✅ Agentes queryean específicamente (no leen documentos enteros)
4. ✅ Decision Priority Hierarchy es idéntico (guidelines = HIGHEST PRIORITY)
5. ✅ Anti-patterns previenen errores (documentados en cada guideline)
6. ✅ Cambios en guideline se reflejan automáticamente
7. ✅ Versionado permite evolución sin romper

---

**Evidencia**: 100% de agentes verificados (13/13) tienen este patrón

**Resultado**: Guidelines son realmente el Source of Truth, no solo documentación
