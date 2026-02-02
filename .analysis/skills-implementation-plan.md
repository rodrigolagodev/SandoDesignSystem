# Skills Implementation Plan - Sando Design System

> **Fecha:** Enero 2025
> **Proyecto:** Sando Design System
> **Propósito:** Análisis y roadmap de implementación de Claude Code Skills para automatizar procesos repetitivos

---

## 📋 Resumen Ejecutivo

Este documento analiza el proyecto Sando Design System para identificar procesos repetitivos que pueden transformarse en **Claude Code Skills**. Se han identificado **15 skills principales** que pueden reducir el tiempo de desarrollo en un 85-90% para tareas comunes.

### Hallazgos Clave

- **15 skills identificadas** distribuidas en 6 categorías
- **ROI positivo** después de crear 5 componentes (inversión: 40-60 horas)
- **Ahorro estimado:** 12-18 horas por componente completo
- **Estrategia híbrida:** Skills para tareas específicas + Agentes para orquestación

---

## 1. ANÁLISIS DEL PROYECTO

### Arquitectura del Proyecto

**Monorepo Turborepo** con 3 capas fundamentales:

```
sando-design-system/
├── packages/
│   ├── tokens/           # Sistema de 3 capas (Ingredients → Flavors → Recipes)
│   └── components/       # Web Components con Lit 3.3.1
├── apps/
│   ├── docs/            # Storybook 8.6.14
│   └── site/            # VitePress 1.6.4
└── .claude/
    └── agents/          # 18 agentes especializados
```

### Principios Arquitectónicos Críticos

**Three-Layer Token Architecture (ESTRICTO):**

- **Ingredients:** Valores raw (NO referencias)
- **Flavors:** Referencian SOLO Ingredients
- **Recipes:** Referencian SOLO Flavors

**Monolithic Component Architecture:**
Cada componente es completamente auto-contenido en 7 archivos obligatorios:

```
component-name/
├── sando-[name].ts              # Lit component
├── sando-[name].types.ts        # TypeScript types
├── sando-[name].stories.ts      # Storybook
├── sando-[name].test.ts         # Unit tests (Vitest)
├── sando-[name].spec.ts         # E2E tests (Playwright)
├── sando-[name].a11y.test.ts    # Accessibility (axe-core)
└── index.ts                     # Barrel export
```

### Tareas Habituales Identificadas

1. **Creación de Componentes** - Proceso de 7 archivos obligatorios (2-3 horas)
2. **Generación de Tokens** - 3 capas con validación estricta (1-2 horas)
3. **Creación de Flavors** - Temas con 5 archivos (3-4 horas)
4. **Generación de Paletas** - OKLCH con validación WCAG (1-2 horas)
5. **Testing Multi-capa** - Unit, E2E, a11y (4-6 horas)
6. **Publicación NPM** - Tokens → Components → Docs (2 horas)
7. **Validación Arquitectónica** - Integridad de 3 capas (30 min)
8. **Documentación** - Storybook + VitePress (2-3 horas)

**Total por componente completo:** 15-23 horas

---

## 2. SKILLS PROPUESTAS

### 🎨 CATEGORÍA 1: CREACIÓN DE COMPONENTES (3 Skills)

---

#### SKILL #1: `component-creator`

**Descripción:**

```yaml
---
name: component-creator
description: Creates a complete new Web Component following Sando's monolithic architecture. Generates all 7 required files (implementation, types, unit tests, a11y, stories, barrel export) with Lit 3.3.1, consumes Recipe tokens, ensures WCAG 2.1 AA compliance. Use when creating Button, Input, Card, Modal, or any new UI component from scratch.
allowed-tools: Read, Write, Edit, Glob, Bash
---
```

**Utilidad:**

- ✅ Crea los 7 archivos obligatorios automáticamente
- ✅ Genera solo el contenido necesario para iniciar el desarrollo del componente
- ✅ Genera código boilerplate consistente
- ✅ Aplica convenciones del proyecto (sando-\*, Shadow DOM, tokens)
- ✅ Reduce tiempo de creación de **2-3 horas a 10-15 minutos** (85-90% ahorro)

**Relación con Agentes:**

- **REEMPLAZA:** `component-builder` agent (simplifica la tarea a skill modelo-invocado)
- **COMPLEMENTA:** `frontend-developer` (quien puede invocar esta skill)

**Archivos Generados:**

```
packages/components/src/components/[name]/
├── sando-[name].ts              # Lit component
├── sando-[name].types.ts        # TypeScript types
├── sando-[name].stories.ts      # Storybook
├── sando-[name].test.ts         # Unit tests (Vitest)
├── sando-[name].a11y.test.ts    # Accessibility (axe-core)
└── index.ts                     # Barrel export
```

**Acciones Automáticas:**

1. Prompt interactivo para detalles del componente
2. Generación de 7 archivos desde template
3. Actualización de `src/index.ts` (barrel export)
4. Actualización de `package.json` exports
5. Validación TypeScript
6. Ejecución de tests iniciales

**Ejemplo de Invocación:**

```
User: "Create a new Card component with elevated, outlined and flat variants"
Claude: [invoca component-creator skill automáticamente]
```

---

#### SKILL #2: `recipe-token-generator`

**Descripción:**

```yaml
---
name: recipe-token-generator
description: Generates Recipe layer tokens for a component. Creates component-specific tokens that ONLY reference Flavors (never Ingredients). Follows naming convention --sando-[component]-[variant]-[property]-[state]. Use when creating tokens for Button, Input, Card, Modal or any component that needs dedicated design tokens.
allowed-tools: Read, Write, Edit, Bash
---
```

**Utilidad:**

- ✅ Genera tokens Recipe para componentes nuevos
- ✅ Valida que SOLO referencien Flavors (nunca Ingredients)
- ✅ Asegura naming conventions correctos
- ✅ Crea estructura completa de estados (default, hover, active, disabled)

**Relación con Agentes:**

- **COMPLEMENTA:** `design-system-architect` (validación de arquitectura)
- **COMPLEMENTA:** `ui-designer` (quien define los valores semánticos)
- **PROCESO NUEVO** (no hay agente específico para esto)

**Ejemplo de Output:**

```json
{
  "button": {
    "solid": {
      "backgroundColor": {
        "default": "{color.action.solid.background.default}",
        "hover": "{color.action.solid.background.hover}",
        "active": "{color.action.solid.background.active}",
        "disabled": "{color.action.solid.background.disabled}"
      },
      "textColor": {
        "default": "{color.action.solid.text.default}",
        "hover": "{color.action.solid.text.hover}",
        "disabled": "{color.action.solid.text.disabled}"
      },
      "borderColor": {
        "default": "{color.action.solid.border.default}",
        "hover": "{color.action.solid.border.hover}"
      }
    },
    "outline": {
      "backgroundColor": {
        "default": "{color.action.outline.background.default}",
        "hover": "{color.action.outline.background.hover}"
      }
    }
  }
}
```

**Validaciones Automáticas:**

- ❌ Rechaza referencias directas a Ingredients
- ✅ Valida naming convention `--sando-[component]-*`
- ✅ Asegura todos los estados requeridos (default, hover, active, disabled)
- ✅ Verifica que las Flavor references existan

---

#### SKILL #3: `component-variant-expander`

**Descripción:**

```yaml
---
name: component-variant-expander
description: Adds new variants to existing components (e.g., add "tertiary" variant to Button). Updates types, styles, tests, stories, and Recipe tokens. Ensures consistency across all component files. Use when extending Button, Input, or any component with new visual variants.
allowed-tools: Read, Edit, Bash
---
```

**Utilidad:**

- ✅ Agrega variantes nuevas a componentes existentes
- ✅ Actualiza automáticamente: types, styles, tests, stories, tokens
- ✅ Mantiene consistencia entre archivos
- ✅ Evita olvidar archivos al agregar variantes

**Relación con Agentes:**

- **COMPLEMENTA:** `frontend-developer` (quien implementa variantes)
- **PROCESO NUEVO** (simplifica expansión de componentes)

**Ejemplo de Uso:**

```
User: "Add a tertiary variant to the Button component"
Claude: [invoca component-variant-expander skill]

Acciones:
1. Lee sando-button.ts actual
2. Agrega "tertiary" a ButtonVariant type
3. Agrega estilos CSS para :host([variant="tertiary"])
4. Actualiza sando-button.test.ts con tests de tertiary
5. Agrega story "Tertiary" en sando-button.stories.ts
6. Genera Recipe tokens para button.tertiary.*
7. Ejecuta tests para verificar
```

---

### 🎨 CATEGORÍA 2: SISTEMA DE TOKENS (4 Skills)

---

#### SKILL #4: `flavor-creator`

**Descripción:**

```yaml
---
name: flavor-creator
description: Creates a complete new flavor (theme) with all 5 required files: base, dark, high-contrast, forced-colors, motion-reduce. Maps semantic roles to Ingredient palettes. Validates 3-layer architecture (Flavors ONLY reference Ingredients). Use when creating "tonkatsu", "egg-salad", "kiwi" flavors or any custom brand theme.
allowed-tools: Read, Write, Glob, Bash
---
```

**Utilidad:**

- ✅ Crea un flavor completo con 5 archivos obligatorios
- ✅ Asegura que Flavors SOLO referencien Ingredients
- ✅ Genera automáticamente variantes (dark, high-contrast, etc.)
- ✅ Reduce tiempo de **3-4 horas a 20-30 minutos** (90% ahorro)

**Relación con Agentes:**

- **COMPLEMENTA:** `ui-designer` (quien define los mappings semánticos)
- **COMPLEMENTA:** `design-ops-specialist` (quien gestiona versioning de flavors)
- **PROCESO NUEVO** (no hay agente específico para creación de flavors)

**Archivos Generados:**

```
packages/tokens/src/flavors/[flavor-name]/
├── flavor.json                  # Base light theme
├── flavor-dark.json             # Dark mode
├── flavor-high-contrast.json    # High contrast mode
├── flavor-forced-colors.json    # Forced colors mode (Windows High Contrast)
└── flavor-motion-reduce.json    # Reduced motion preferences
```

**Prompts Interactivos:**

```
1. Flavor name? (e.g., "tonkatsu", "egg-salad", "kiwi", "lavender")
2. Primary color palette? [orange, blue, green, red, purple, pink]
3. Neutral palette? [neutral, neutral-warm, neutral-cool]
4. Spacing density? [compact, comfortable, spacious]
```

**Ejemplo de Output (flavor.json):**

```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": "{color.blue.500}",
          "hover": "{color.blue.600}",
          "active": "{color.blue.700}",
          "disabled": "{color.neutral.300}"
        },
        "text": {
          "default": "{color.neutral.50}",
          "hover": "{color.neutral.50}",
          "disabled": "{color.neutral.500}"
        }
      }
    },
    "background": {
      "base": "{color.neutral.50}",
      "surface": "{color.neutral.100}",
      "overlay": "{color.neutral.900}"
    }
  }
}
```

---

#### SKILL #5: `color-palette-generator`

**Descripción:**

```yaml
---
name: color-palette-generator
description: Generates OKLCH-based color palettes with 11 steps (50-950) from a single brand color. Ensures perceptual uniformity, WCAG AA compliance (4.5:1 contrast minimum), and automatic light+dark variants. Use when creating custom brand colors not in the 8 core palettes (orange, blue, green, red, purple, pink, neutrals).
allowed-tools: Read, Write, Bash
---
```

**Utilidad:**

- ✅ Genera paletas OKLCH desde un color hex (#FF6B00)
- ✅ Crea 11 pasos perceptualmente uniformes (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
- ✅ Valida WCAG AA compliance automáticamente
- ✅ Genera variantes light y dark
- ✅ Reduce tiempo de **1-2 horas a 5 minutos** (95% ahorro)

**Relación con Agentes:**

- **REEMPLAZA PARCIALMENTE:** Funcionalidad mencionada en `COLOR-PHILOSOPHY.md` (CLI no implementado)
- **COMPLEMENTA:** `ui-designer` (quien valida paletas generadas)
- **PROCESO NUEVO** (herramienta CLI mencionada pero no creada)

**Algoritmo:**

```javascript
// Pseudocódigo del generador OKLCH
function generatePalette(hexColor) {
  const baseOKLCH = hexToOKLCH(hexColor);

  const palette = {
    50:  oklch(lightness: 0.95, chroma: baseOKLCH.c * 0.2, hue: baseOKLCH.h),
    100: oklch(lightness: 0.90, chroma: baseOKLCH.c * 0.3, hue: baseOKLCH.h),
    200: oklch(lightness: 0.80, chroma: baseOKLCH.c * 0.5, hue: baseOKLCH.h),
    300: oklch(lightness: 0.70, chroma: baseOKLCH.c * 0.7, hue: baseOKLCH.h),
    400: oklch(lightness: 0.60, chroma: baseOKLCH.c * 0.9, hue: baseOKLCH.h),
    500: oklch(lightness: 0.50, chroma: baseOKLCH.c * 1.0, hue: baseOKLCH.h), // Base
    600: oklch(lightness: 0.45, chroma: baseOKLCH.c * 0.9, hue: baseOKLCH.h),
    700: oklch(lightness: 0.40, chroma: baseOKLCH.c * 0.8, hue: baseOKLCH.h),
    800: oklch(lightness: 0.30, chroma: baseOKLCH.c * 0.6, hue: baseOKLCH.h),
    900: oklch(lightness: 0.20, chroma: baseOKLCH.c * 0.4, hue: baseOKLCH.h),
    950: oklch(lightness: 0.10, chroma: baseOKLCH.c * 0.2, hue: baseOKLCH.h)
  };

  // Validate WCAG AA compliance
  validateContrastRatios(palette);

  return palette;
}
```

**Ejemplo de Invocación:**

```
User: "Generate a color palette from my brand color #8B5CF6"
Claude: [invoca color-palette-generator skill]

Output:
✅ Generated purple palette (11 steps)
✅ WCAG AA validated (4.5:1 minimum contrast)
✅ Created Ingredient file: packages/tokens/src/ingredients/color-brand.json

{
  "color": {
    "brand": {
      "50": "oklch(0.95 0.02 300)",
      "100": "oklch(0.90 0.04 300)",
      ...
      "500": "oklch(0.50 0.20 300)",
      ...
      "950": "oklch(0.10 0.04 300)"
    }
  }
}
```

---

#### SKILL #6: `token-architecture-validator`

**Descripción:**

```yaml
---
name: token-architecture-validator
description: Validates 3-layer token architecture integrity. Checks that Ingredients have NO references, Flavors ONLY reference Ingredients, Recipes ONLY reference Flavors. Detects violations, circular dependencies, naming convention errors. Use before commits, PRs, or token builds to ensure architectural compliance.
allowed-tools: Read, Glob, Bash
---
```

**Utilidad:**

- ✅ Valida la integridad de la arquitectura de 3 capas
- ✅ Detecta violaciones (e.g., Recipe referenciando Ingredient directamente)
- ✅ Encuentra dependencias circulares
- ✅ Valida naming conventions (--sando-\*)
- ✅ Previene errores arquitectónicos antes de commits

**Relación con Agentes:**

- **COMPLEMENTA:** `design-system-architect` (quien define la arquitectura)
- **COMPLEMENTA:** `qa-expert` (quien valida calidad)
- **PROCESO NUEVO** (existe como tests, pero no como skill interactiva)

**Validaciones Ejecutadas:**

1. **Ingredients Layer:**
   - ❌ NO debe contener referencias `{...}`
   - ✅ Solo valores raw (hex, px, rem, etc.)

2. **Flavors Layer:**
   - ✅ SOLO puede referenciar Ingredients `{color.blue.500}`
   - ❌ NO puede referenciar otros Flavors
   - ❌ NO puede referenciar Recipes

3. **Recipes Layer:**
   - ✅ SOLO puede referenciar Flavors `{color.action.solid.background.default}`
   - ❌ NO puede referenciar Ingredients directamente
   - ❌ NO puede referenciar otros Recipes

4. **Naming Conventions:**
   - ✅ CSS variables: `--sando-[category]-[property]-[variant]-[state]`
   - ✅ JSON structure coherente

5. **Circular Dependencies:**
   - ❌ Detecta referencias circulares (A → B → A)

**Ejemplo de Output:**

```
🔍 Validating Token Architecture...

✅ Ingredients Layer: 0 violations
   - color.json: 8 palettes, all raw values ✓
   - space.json: 20 tokens, all raw values ✓
   - font.json: 12 tokens, all raw values ✓

✅ Flavors Layer: 0 violations
   - tonkatsu/flavor.json: 156 tokens, all reference Ingredients ✓
   - egg-salad/flavor.json: 156 tokens, all reference Ingredients ✓

❌ Recipes Layer: 2 VIOLATIONS FOUND

VIOLATION #1 (CRITICAL):
File: packages/tokens/src/recipes/button.json
Line: 12
Issue: Recipe references Ingredient directly (violates 3-layer architecture)
Found: "backgroundColor": "{color.orange.500}"
Expected: Should reference Flavor like "{color.action.solid.background.default}"
Fix: Update to use Flavor reference

VIOLATION #2 (WARNING):
File: packages/tokens/src/recipes/card.json
Line: 8
Issue: Invalid naming convention
Found: "card-background"
Expected: "card.backgroundColor.default"

❌ BUILD BLOCKED: Fix violations before proceeding
```

---

#### SKILL #7: `ingredient-palette-creator`

**Descripción:**

```yaml
---
name: ingredient-palette-creator
description: Creates a new Ingredient color palette (11 steps: 50-950) with perceptual uniformity (OKLCH). Adds to existing 8 palettes (orange, blue, green, red, purple, pink, neutrals). Validates no references to other tokens (raw values only). Use when expanding core palette set with new brand-specific colors.
allowed-tools: Read, Write, Edit
---
```

**Utilidad:**

- ✅ Agrega nuevas paletas a la capa Ingredients
- ✅ Valida que sean valores raw (NO referencias)
- ✅ Asegura 11 pasos obligatorios (50-950)
- ✅ Integra con paletas existentes

**Relación con Agentes:**

- **COMPLEMENTA:** `ui-designer` (quien define paletas)
- **PROCESO NUEVO** (actualmente manual, skill automatiza)

---

### 🧪 CATEGORÍA 3: TESTING & CALIDAD (3 Skills)

---

#### SKILL #8: `accessibility-auditor`

**Descripción:**

```yaml
---
name: accessibility-auditor
description: Runs comprehensive accessibility audit using axe-core. Tests WCAG 2.1 AA compliance (4.5:1 contrast, keyboard navigation, ARIA, screen reader support). Generates detailed report with violations, warnings, and remediation steps. Use before releases, PR reviews, or when adding accessibility features.
allowed-tools: Read, Bash
---
```

**Utilidad:**

- ✅ Ejecuta auditoría completa con axe-core
- ✅ Valida WCAG 2.1 AA compliance (4.5:1 contrast mínimo)
- ✅ Genera reporte detallado con remediaciones
- ✅ Integrable en CI/CD

**Relación con Agentes:**

- **COMPLEMENTA:** `accessibility-advocate` (usa esta skill)
- **COMPLEMENTA:** `qa-expert` (como parte de test suite)
- **PROCESO NUEVO** (existe como tests, skill lo hace interactivo)

**Ejemplo de Output:**

```
🔍 Running Accessibility Audit (WCAG 2.1 AA)...

Component: sando-button

✅ PASSED (12/15 checks)
   ✓ Color contrast ratio: 7.2:1 (exceeds 4.5:1 minimum)
   ✓ Keyboard navigation: Tab/Enter/Space functional
   ✓ Screen reader: aria-label present
   ✓ Focus indicators: 3:1 contrast ratio

❌ VIOLATIONS (3 critical)

VIOLATION #1 (CRITICAL):
Rule: button-name
Description: Buttons must have discernible text
Impact: Critical
Element: <sando-button variant="solid"></sando-button>
Fix: Add text content or aria-label attribute

VIOLATION #2 (SERIOUS):
Rule: color-contrast
Description: Elements must have sufficient color contrast
Impact: Serious
Element: .button-secondary (contrast ratio: 3.2:1)
Expected: 4.5:1 minimum
Fix: Darken text color or lighten background

VIOLATION #3 (MODERATE):
Rule: focus-order
Description: Focus order should match visual order
Impact: Moderate
Fix: Review tab index sequence

⚠️ WARNINGS (2)
...

📊 Summary:
- Total checks: 15
- Passed: 12 (80%)
- Violations: 3 (20%)
- WCAG 2.1 AA Compliance: ❌ FAILED
```

---

#### SKILL #9: `component-test-generator`

**Descripción:**

```yaml
---
name: component-test-generator
description: Generates comprehensive test suite for components including unit tests (Vitest), E2E tests (Playwright), and accessibility tests (axe-core). Covers all variants, sizes, states, props, events, slots. Ensures >85% coverage. Use when component implementation is complete but tests are missing.
allowed-tools: Read, Write, Bash
---
```

**Utilidad:**

- ✅ Genera tests comprehensivos automáticamente
- ✅ Cubre: unit, E2E, a11y tests
- ✅ Alcanza >85% coverage target
- ✅ Reduce tiempo de testing de **4-6 horas a 30-60 minutos** (80% ahorro)

**Relación con Agentes:**

- **REEMPLAZA PARCIALMENTE:** `qa-expert` para generación de tests (no estrategia)
- **COMPLEMENTA:** `frontend-developer` (quien implementa componentes)

**Tests Generados:**

**1. Unit Tests (Vitest):**

```typescript
// sando-button.test.ts
describe("sando-button", () => {
  describe("Rendering", () => {
    it("should render with default properties");
    it("should be accessible");
  });

  describe("Properties", () => {
    it("should update variant property");
    it("should update size property");
    it("should handle disabled state");
  });

  describe("Events", () => {
    it("should emit click event");
    it("should not emit click when disabled");
  });

  describe("Slots", () => {
    it("should project default slot content");
  });
});
```

**2. E2E Tests (Playwright):**

```typescript
// sando-button.spec.ts
test.describe("sando-button E2E", () => {
  test("should render component");
  test("should match visual snapshot");
  test("should handle keyboard navigation");
  test("should work in all browsers", {
    browsers: ["chromium", "firefox", "webkit"],
  });
});
```

**3. Accessibility Tests (axe-core):**

```typescript
// sando-button.a11y.test.ts
describe("sando-button Accessibility", () => {
  it("should have no accessibility violations");
  it("should have no violations in disabled state");
  it("should have no violations across all variants");
});
```

---

#### SKILL #10: `visual-regression-snapshot`

**Descripción:**

```yaml
---
name: visual-regression-snapshot
description: Captures visual regression snapshots for all component variants, sizes, states across browsers (Chrome, Firefox, Safari). Compares with baseline, highlights pixel differences. Use when components change visually or before releases to ensure no unintended visual regressions.
allowed-tools: Read, Bash
---
```

**Utilidad:**

- ✅ Captura snapshots de componentes en todos los estados
- ✅ Compara con baseline (detecta cambios visuales)
- ✅ Cross-browser (Chrome, Firefox, Safari)
- ✅ Previene regresiones visuales

**Relación con Agentes:**

- **COMPLEMENTA:** `design-ops-specialist` (visual regression testing)
- **COMPLEMENTA:** `qa-expert` (parte de calidad)
- **PROCESO NUEVO** (mencionado pero no implementado completamente)

**Ejemplo de Ejecución:**

```
📸 Capturing Visual Regression Snapshots...

Component: sando-button

Variants: [solid, outline, ghost] × Sizes: [small, medium, large] × Browsers: [chrome, firefox, safari]
Total snapshots: 27

✅ Captured 27/27 snapshots

🔍 Comparing with baseline...

✅ PASSED (25/27 snapshots)
   ✓ solid-small-chrome.png: identical
   ✓ solid-medium-chrome.png: identical
   ...

❌ DIFFERENCES DETECTED (2/27)

DIFF #1:
File: outline-large-firefox.png
Pixels changed: 124 (0.3%)
Visual diff: /snapshots/diff/outline-large-firefox-diff.png
Cause: Border radius increased by 2px

DIFF #2:
File: ghost-medium-safari.png
Pixels changed: 89 (0.2%)
Visual diff: /snapshots/diff/ghost-medium-safari-diff.png
Cause: Text color slightly lighter

Action Required: Review diffs and update baseline if intentional
```

---

### 📦 CATEGORÍA 4: PUBLICACIÓN & DEPLOYMENT (2 Skills)

---

#### SKILL #11: `npm-release-preparer`

**Descripción:**

```yaml
---
name: npm-release-preparer
description: Prepares NPM release following progressive strategy (0.1.0 tokens, 0.2.0-alpha components, 0.5.0-beta, 1.0.0). Validates package.json exports, runs tests, builds packages, generates changelogs with changesets, updates documentation. Use before publishing to npm.
allowed-tools: Read, Edit, Bash
---
```

**Utilidad:**

- ✅ Prepara release siguiendo estrategia progresiva (action-plan.md)
- ✅ Valida package.json exports
- ✅ Ejecuta todos los tests
- ✅ Genera changelogs automáticamente (changesets)
- ✅ Actualiza documentación
- ✅ Reduce tiempo de **2 horas a 15 minutos** (88% ahorro)

**Relación con Agentes:**

- **COMPLEMENTA:** `devops-automation-engineer` (quien maneja CI/CD)
- **COMPLEMENTA:** `version-migration-manager` (changelogs, semver)
- **PROCESO NUEVO** (no hay skill específica para esto)

**Checklist de Release:**

```
📦 NPM Release Preparation

Version: 0.1.0 (tokens-first)
Package: @sando/tokens

✅ Pre-flight Checks:
   ✓ Git status clean
   ✓ On main branch
   ✓ All tests passing (2,200+ tests)
   ✓ Build successful
   ✓ No TypeScript errors

✅ Package Validation:
   ✓ package.json exports correct
   ✓ Dependencies versions valid
   ✓ License file present (MIT)
   ✓ README.md updated

✅ Build Artifacts:
   ✓ dist/sando-tokens/css/ generated
   ✓ dist/sando-tokens/ts/ generated
   ✓ Type definitions (.d.ts) present

✅ Changesets:
   ✓ Changeset created: "Initial tokens release"
   ✓ Changelog generated
   ✓ Version bumped: 0.0.0 → 0.1.0

✅ Documentation:
   ✓ Installation guide updated
   ✓ Usage examples validated
   ✓ Breaking changes documented (N/A)

Ready to publish? (yes/no)
> yes

Publishing @sando/tokens@0.1.0...
✅ Published successfully to npm
🔗 https://www.npmjs.com/package/@sando/tokens

Next steps:
1. Create GitHub release
2. Announce on Twitter/Reddit
3. Monitor npm downloads
4. Start alpha components (0.2.0-alpha)
```

---

#### SKILL #12: `storybook-deployer`

**Descripción:**

```yaml
---
name: storybook-deployer
description: Builds and deploys Storybook to GitHub Pages. Optimizes build (tree-shaking, minification), generates static files, pushes to gh-pages branch, configures custom domain if needed. Use when updating component documentation or before alpha/beta releases.
allowed-tools: Bash
---
```

**Utilidad:**

- ✅ Construye Storybook optimizado
- ✅ Deploya a GitHub Pages automáticamente
- ✅ Configura dominio custom
- ✅ Actualiza documentación pública

**Relación con Agentes:**

- **COMPLEMENTA:** `devops-automation-engineer` (deployment automation)
- **PROCESO NUEVO** (existe proceso manual, skill automatiza)

**Proceso de Deployment:**

```
🚀 Storybook Deployment to GitHub Pages

Step 1: Building Storybook...
✅ Build complete (42.3s)
   - Bundle size: 1.2 MB (gzipped)
   - Static files: 127 files

Step 2: Optimizing...
✅ Minified JavaScript (-32%)
✅ Compressed images (-18%)
✅ Tree-shaking applied

Step 3: Deploying to GitHub Pages...
✅ Pushed to gh-pages branch
✅ GitHub Pages build triggered

Step 4: Verifying deployment...
✅ Live at: https://yourusername.github.io/sando-design-system/

🎉 Deployment successful!

URLs:
- Storybook: https://yourusername.github.io/sando-design-system/
- Components: https://yourusername.github.io/sando-design-system/?path=/docs/components-button--docs
```

---

### 📝 CATEGORÍA 5: DOCUMENTACIÓN (2 Skills)

---

#### SKILL #13: `component-docs-generator`

**Descripción:**

```yaml
---
name: component-docs-generator
description: Generates complete component documentation including API tables (props, events, slots, CSS parts, custom properties), usage examples, code snippets, accessibility notes, theming guide. Outputs Storybook stories and VitePress markdown. Use when component is complete but documentation is missing.
allowed-tools: Read, Write
---
```

**Utilidad:**

- ✅ Genera documentación completa automáticamente
- ✅ Crea API tables para Storybook
- ✅ Genera VitePress markdown
- ✅ Incluye ejemplos de uso y accessibility notes

**Relación con Agentes:**

- **REEMPLAZA PARCIALMENTE:** `technical-writer` para generación (no estrategia de docs)
- **COMPLEMENTA:** `frontend-developer` (quien documenta componentes)

**Output Generado:**

**1. Storybook API Table:**

```markdown
## API Reference

### Properties

| Property   | Type                              | Default    | Description                    |
| ---------- | --------------------------------- | ---------- | ------------------------------ |
| `variant`  | `'solid' \| 'outline' \| 'ghost'` | `'solid'`  | Visual style variant           |
| `size`     | `'small' \| 'medium' \| 'large'`  | `'medium'` | Component size                 |
| `disabled` | `boolean`                         | `false`    | Whether the button is disabled |

### Events

| Event                | Type                 | Description                    |
| -------------------- | -------------------- | ------------------------------ |
| `sando-button-click` | `CustomEvent<{...}>` | Emitted when button is clicked |

### Slots

| Slot      | Description                  |
| --------- | ---------------------------- |
| (default) | Button content (text, icons) |

### CSS Custom Properties

| Property                                       | Default                                              | Description      |
| ---------------------------------------------- | ---------------------------------------------------- | ---------------- |
| `--sando-button-solid-backgroundColor-default` | `var(--sando-color-action-solid-background-default)` | Background color |
| `--sando-button-solid-textColor-default`       | `var(--sando-color-action-solid-text-default)`       | Text color       |
```

**2. VitePress Documentation:**

```markdown
# Button Component

The Button component is a fundamental interactive element...

## Installation

\`\`\`bash
npm install @sando/components
\`\`\`

## Usage

\`\`\`html
<sando-button variant="solid" size="medium">
Click me
</sando-button>
\`\`\`

## Variants

### Solid

Primary action, high emphasis...

### Outline

Secondary actions...

## Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Screen reader support (aria-label)
- ✅ Focus indicators (3:1 contrast)

## Theming

\`\`\`html

<div flavor="tonkatsu">
  <sando-button>Ocean themed</sando-button>
</div>
\`\`\`
```

---

#### SKILL #14: `token-docs-generator`

**Descripción:**

```yaml
---
name: token-docs-generator
description: Generates token documentation with visual swatches, value tables, usage examples, OKLCH/HSL conversions, WCAG contrast ratios. Creates interactive VitePress pages for Ingredients, Flavors, Recipes layers. Use when tokens are added/updated to keep documentation synchronized.
allowed-tools: Read, Write, Bash
---
```

**Utilidad:**

- ✅ Genera docs visuales de tokens
- ✅ Muestra swatches de colores
- ✅ Calcula contrast ratios WCAG
- ✅ Crea páginas VitePress interactivas

**Relación con Agentes:**

- **COMPLEMENTA:** `technical-writer` (documentación de tokens)
- **PROCESO NUEVO** (docs actuales son manuales)

**Ejemplo de Output:**

**Color Token Documentation:**

```markdown
# Color Tokens - Ingredients Layer

## Orange Palette

| Step | Swatch | OKLCH                 | Hex       | HSL                  | Contrast vs White | WCAG Rating |
| ---- | ------ | --------------------- | --------- | -------------------- | ----------------- | ----------- |
| 50   | 🟧     | `oklch(0.95 0.02 45)` | `#FFF7ED` | `hsl(33, 100%, 96%)` | 1.1:1             | ❌          |
| 100  | 🟧     | `oklch(0.90 0.05 45)` | `#FFEDD5` | `hsl(34, 100%, 92%)` | 1.3:1             | ❌          |
| 500  | 🟧     | `oklch(0.65 0.18 45)` | `#F97316` | `hsl(25, 95%, 53%)`  | 3.2:1             | ⚠️ AA Large |
| 600  | 🟧     | `oklch(0.58 0.17 45)` | `#EA580C` | `hsl(21, 90%, 48%)`  | 4.6:1             | ✅ AA       |
| 700  | 🟧     | `oklch(0.50 0.15 45)` | `#C2410C` | `hsl(17, 88%, 40%)`  | 6.8:1             | ✅ AAA      |

## Usage Examples

\`\`\`css
/_ Using in custom components _/
.my-button {
background: var(--sando-color-orange-600);
color: white; /_ 4.6:1 contrast - WCAG AA ✅ _/
}
\`\`\`

\`\`\`typescript
// TypeScript import
import { color } from '@sando/tokens/ingredients';

console.log(color.orange[600]); // "oklch(0.58 0.17 45)"
\`\`\`
```

---

### 🔧 CATEGORÍA 6: HERRAMIENTAS DE DESARROLLO (1 Skill)

---

#### SKILL #15: `monorepo-task-runner`

**Descripción:**

```yaml
---
name: monorepo-task-runner
description: Executes common monorepo tasks with Turborepo including build tokens, build components, run tests, start dev servers, clean cache. Handles correct build order (tokens → components → docs). Shows progress, handles errors, provides troubleshooting. Use for daily development workflows.
allowed-tools: Bash
---
```

**Utilidad:**

- ✅ Ejecuta tareas comunes del monorepo
- ✅ Maneja orden de build correcto (tokens primero)
- ✅ Muestra progreso visual
- ✅ Troubleshooting automático

**Relación con Agentes:**

- **COMPLEMENTA:** `developer-tooling-specialist` (optimización de tooling)
- **PROCESO NUEVO** (simplifica comandos complejos)

**Comandos Simplificados:**

**Antes (manual):**

```bash
# Build tokens
pnpm --filter @sando/tokens build

# Build components (requires tokens built first)
pnpm --filter @sando/components build

# Start Storybook
pnpm --filter @sando/docs dev

# Clean cache when things break
rm -rf node_modules/.cache
rm -rf .turbo
pnpm clean
pnpm install
```

**Después (skill):**

```
User: "Build the entire project"
Claude: [invoca monorepo-task-runner skill]

🏗️  Sando Monorepo Build

Step 1/3: Building @sando/tokens...
✅ Tokens built (3.2s)
   - Ingredients: 8 palettes
   - Flavors: 5 themes
   - Recipes: 2 components
   - Output: dist/sando-tokens/

Step 2/3: Building @sando/components...
✅ Components built (12.8s)
   - Button: ✓
   - [Future components]
   - Output: dist/

Step 3/3: Building @sando/docs (Storybook)...
✅ Storybook built (45.3s)
   - Stories: 8
   - Output: storybook-static/

🎉 Build complete (61.3s)
```

**Error Handling:**

```
User: "Build components"
Claude: [invoca monorepo-task-runner skill]

❌ Build failed: @sando/components

Error: Cannot find module '@sando/tokens/css'
Cause: Tokens not built yet

🔧 Auto-fix: Building tokens first...
✅ Tokens built
✅ Retrying components build...
✅ Components built successfully
```

---

## 3. COMPARACIÓN: SKILLS VS AGENTES

### Filosofía: Skills vs Agentes

**Skills (Modelo-Invocado, Tareas Específicas):**

- ✅ Tareas repetitivas bien definidas
- ✅ Flujos de trabajo de un solo propósito
- ✅ Procesos que requieren pocos pasos (1-5 pasos)
- ✅ Automatización de templates/scaffolding
- ✅ Validaciones y auditorías puntuales
- ✅ Bajo contexto requerido

**Agentes (Orquestación, Tareas Complejas):**

- ✅ Workflows multi-paso que requieren decisiones (>10 pasos)
- ✅ Estrategia y planificación
- ✅ Coordinación entre múltiples sistemas
- ✅ Análisis y recomendaciones
- ✅ Tasks que requieren contexto amplio
- ✅ Toma de decisiones creativas

---

### Agentes que PUEDEN Reemplazarse con Skills

| Agente Actual          | Skill Reemplazo                | Justificación                                                                           |
| ---------------------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| `component-builder`    | `component-creator`            | Tarea bien definida: crear 7 archivos desde template. No requiere decisiones complejas. |
| N/A (proceso manual)   | `flavor-creator`               | Proceso repetitivo que sigue estructura fija de 5 archivos. Algoritmo determinístico.   |
| N/A (proceso manual)   | `color-palette-generator`      | Generación algorítmica de paletas OKLCH. Matemática, no creativa.                       |
| N/A (tests existentes) | `token-architecture-validator` | Validación automática de reglas. Checklist, no análisis.                                |

---

### Agentes que DEBEN Permanecer como Agentes

| Agente                        | Razón para NO Convertir a Skill                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `design-system-architect`     | Requiere decisiones estratégicas sobre arquitectura, evaluación de trade-offs, diseño de APIs complejas. No es un proceso repetitivo. |
| `design-system-pm`            | Gestión de producto compleja: priorización RICE, análisis de métricas, stakeholder management. Requiere contexto amplio.              |
| `qa-expert`                   | Estrategia de testing (no solo generación de tests). Define qué probar, cómo probar, cuándo probar. Requiere experiencia y juicio.    |
| `devops-automation-engineer`  | Configuración compleja de CI/CD, troubleshooting de pipelines, optimización de infraestructura. Multi-sistema.                        |
| `technical-writer`            | Estrategia de documentación, narrative writing, información architecture. Creatividad y comunicación.                                 |
| `ui-designer`                 | Decisiones de diseño creativas, balance estético/funcional, user research. No algorítmico.                                            |
| `frontend-developer`          | Lógica de negocio compleja, state management, performance optimization. Programación, no scaffolding.                                 |
| `accessibility-advocate`      | Auditoría manual con assistive technologies, estrategia de inclusión, educación del equipo. Humano-centrado.                          |
| `design-ops-specialist`       | Orquestación de Figma-to-code, gestión de design token versioning, coordinación design-dev. Multi-herramienta.                        |
| `version-migration-manager`   | Estrategia de breaking changes, comunicación con usuarios, codemods complejos. Requiere juicio.                                       |
| `security-compliance-auditor` | Análisis de vulnerabilidades, threat modeling, compliance con regulaciones. Expertise especializado.                                  |
| `performance-monitor`         | Análisis de performance bottlenecks, optimización basada en métricas, trade-off decisions. Diagnóstico.                               |

---

### Estrategia Híbrida: Skills + Agentes

**Colaboración Recomendada:**

```mermaid
graph LR
    A[Usuario: "Crear componente Modal"] --> B[Agent: design-system-architect]
    B -->|Define API| C[Skill: component-creator]
    C -->|Genera boilerplate| D[Agent: frontend-developer]
    D -->|Implementa lógica| E[Skill: component-test-generator]
    E -->|Genera tests| F[Agent: qa-expert]
    F -->|Revisa cobertura| G[Skill: accessibility-auditor]
    G -->|Valida WCAG| H[Agent: technical-writer]
    H -->|Escribe narrative| I[Skill: component-docs-generator]
    I -->|Genera API tables| J[Deployment]
```

**Flujo Típico:**

1. **Usuario:** "Necesito crear un componente Modal con animaciones"

2. **Agent `design-system-architect`:**
   - Diseña API del Modal
   - Define props (open, onClose, variant, size)
   - Especifica slots (header, content, footer)
   - Define eventos (sando-modal-open, sando-modal-close)

3. **Skill `component-creator`:**
   - Genera 7 archivos boilerplate
   - Aplica convenciones del proyecto
   - Crea estructura base

4. **Agent `frontend-developer`:**
   - Implementa lógica de overlay
   - Añade animaciones (fade-in, slide-up)
   - Implementa focus trap
   - Maneja Escape key

5. **Skill `recipe-token-generator`:**
   - Genera tokens para modal (backgroundColor, overlay opacity, etc.)

6. **Skill `component-test-generator`:**
   - Genera suite de tests comprehensiva
   - Unit tests (props, events, slots)
   - E2E tests (open/close, keyboard)

7. **Agent `qa-expert`:**
   - Revisa cobertura de tests
   - Identifica casos edge (nested modals, scroll lock)
   - Sugiere tests adicionales

8. **Skill `accessibility-auditor`:**
   - Valida WCAG 2.1 AA compliance
   - Verifica focus management
   - Valida aria-modal, role="dialog"

9. **Agent `technical-writer`:**
   - Escribe narrative documentation
   - Explica use cases y best practices
   - Documenta accessibility features

10. **Skill `component-docs-generator`:**
    - Genera API tables (props, events, slots)
    - Crea code snippets
    - Actualiza Storybook

---

## 4. ROADMAP DE IMPLEMENTACIÓN

### Priorización por RICE Framework

| Skill                          | Reach | Impact | Confidence | Effort | RICE Score | Prioridad |
| ------------------------------ | ----- | ------ | ---------- | ------ | ---------- | --------- |
| `component-creator`            | 10    | 3      | 100%       | 3      | **100**    | 🔴 P0     |
| `recipe-token-generator`       | 10    | 3      | 100%       | 2      | **150**    | 🔴 P0     |
| `token-architecture-validator` | 10    | 3      | 100%       | 2      | **150**    | 🔴 P0     |
| `flavor-creator`               | 7     | 3      | 90%        | 3      | **63**     | 🟠 P1     |
| `color-palette-generator`      | 5     | 3      | 80%        | 4      | **30**     | 🟠 P1     |
| `accessibility-auditor`        | 10    | 2      | 100%       | 2      | **100**    | 🟡 P2     |
| `component-test-generator`     | 10    | 2      | 90%        | 3      | **60**     | 🟡 P2     |
| `npm-release-preparer`         | 6     | 2      | 100%       | 2      | **60**     | 🟡 P2     |
| `component-docs-generator`     | 8     | 2      | 90%        | 3      | **48**     | 🟢 P3     |
| `visual-regression-snapshot`   | 5     | 2      | 80%        | 4      | **20**     | 🟢 P3     |
| `storybook-deployer`           | 4     | 2      | 100%       | 2      | **40**     | 🟢 P3     |
| `token-docs-generator`         | 6     | 1      | 90%        | 3      | **18**     | 🔵 P4     |
| `component-variant-expander`   | 7     | 1      | 80%        | 2      | **28**     | 🔵 P4     |
| `ingredient-palette-creator`   | 3     | 2      | 80%        | 3      | **16**     | 🔵 P4     |
| `monorepo-task-runner`         | 5     | 1      | 100%       | 2      | **25**     | 🔵 P4     |

**RICE Formula:** `(Reach × Impact × Confidence) / Effort`

---

### Fase 1: Skills Críticas (P0) - Semanas 1-2

**Objetivo:** Desbloquear desarrollo diario de componentes

**Skills a Implementar:**

1. ✅ `component-creator` (RICE: 100)
2. ✅ `recipe-token-generator` (RICE: 150)
3. ✅ `token-architecture-validator` (RICE: 150)

**Tiempo Estimado:** 10-14 días (40-60 horas)

**Entregables:**

```
.claude/skills/
├── component-creator/
│   ├── SKILL.md
│   └── templates/
│       ├── component.ts.template
│       ├── types.ts.template
│       ├── stories.ts.template
│       ├── test.ts.template
│       ├── spec.ts.template
│       └── a11y.test.ts.template
├── recipe-token-generator/
│   ├── SKILL.md
│   └── recipe.json.template
└── token-architecture-validator/
    └── SKILL.md
```

**Métricas de Éxito:**

- ✅ Crear componente completo en <15 minutos (antes: 2-3 horas)
- ✅ 0 violaciones arquitectónicas en tokens
- ✅ 100% consistencia en estructura de componentes

---

### Fase 2: Skills de Theming (P1) - Semanas 3-4

**Objetivo:** Sistema de theming es feature diferenciador

**Skills a Implementar:** 4. ✅ `flavor-creator` (RICE: 63) 5. ✅ `color-palette-generator` (RICE: 30)

**Tiempo Estimado:** 7-10 días (30-40 horas)

**Entregables:**

```
.claude/skills/
├── flavor-creator/
│   ├── SKILL.md
│   └── templates/
│       ├── flavor.json.template
│       ├── flavor-dark.json.template
│       ├── flavor-high-contrast.json.template
│       ├── flavor-forced-colors.json.template
│       └── flavor-motion-reduce.json.template
└── color-palette-generator/
    ├── SKILL.md
    └── scripts/
        └── oklch-generator.js
```

**Métricas de Éxito:**

- ✅ Crear flavor completo en <30 minutos (antes: 3-4 horas)
- ✅ Generar paleta OKLCH validada en <5 minutos (antes: 1-2 horas)
- ✅ 100% WCAG AA compliance en paletas generadas

---

### Fase 3: Skills de Calidad (P2) - Mes 2

**Objetivo:** Acelerar testing y QA

**Skills a Implementar:** 6. ✅ `accessibility-auditor` (RICE: 100) 7. ✅ `component-test-generator` (RICE: 60) 8. ✅ `npm-release-preparer` (RICE: 60)

**Tiempo Estimado:** 10-14 días (40-60 horas)

**Métricas de Éxito:**

- ✅ Test coverage >85% automáticamente
- ✅ 0 WCAG violations en componentes
- ✅ Release preparado en <15 minutos (antes: 2 horas)

---

### Fase 4: Skills de Publicación (P2) - Mes 3

**Objetivo:** Deployment automation para alpha release

**Skills a Implementar:** 9. ✅ `storybook-deployer` (RICE: 40)

**Tiempo Estimado:** 3-5 días (15-20 horas)

**Métricas de Éxito:**

- ✅ Storybook deployed en <5 minutos
- ✅ Documentación pública siempre actualizada

---

### Fase 5: Skills de Documentación (P3) - Mes 4

**Objetivo:** Automatizar documentación

**Skills a Implementar:** 10. ✅ `component-docs-generator` (RICE: 48) 11. ✅ `token-docs-generator` (RICE: 18) 12. ✅ `visual-regression-snapshot` (RICE: 20)

**Tiempo Estimado:** 10-14 días (40-60 horas)

**Métricas de Éxito:**

- ✅ API documentation 100% coverage
- ✅ Token docs auto-generadas con swatches
- ✅ Visual regression tests en CI/CD

---

### Fase 6: Skills de DX (P4) - Mes 5+

**Objetivo:** Developer experience improvements

**Skills a Implementar:** 13. ✅ `component-variant-expander` (RICE: 28) 14. ✅ `ingredient-palette-creator` (RICE: 16) 15. ✅ `monorepo-task-runner` (RICE: 25)

**Tiempo Estimado:** 7-10 días (30-40 horas)

**Métricas de Éxito:**

- ✅ Agregar variante en <10 minutos
- ✅ Comandos monorepo simplificados
- ✅ Onboarding time <30 minutos

---

## 5. MÉTRICAS DE ÉXITO

### ROI Estimado

**Inversión Total:**

- Fase 1 (P0): 40-60 horas
- Fase 2 (P1): 30-40 horas
- Fase 3-6 (P2-P4): 100-140 horas
- **Total: 170-240 horas** (4-6 semanas full-time)

**Retorno por Componente:**

| Tarea                         | Tiempo Manual | Con Skills | Ahorro          | Ahorro %   |
| ----------------------------- | ------------- | ---------- | --------------- | ---------- |
| Crear componente completo     | 2-3 horas     | 15 min     | 1h 45m - 2h 45m | **85-92%** |
| Crear flavor (5 archivos)     | 3-4 horas     | 20 min     | 2h 40m - 3h 40m | **90-92%** |
| Generar paleta OKLCH          | 1-2 horas     | 5 min      | 55m - 1h 55m    | **92-96%** |
| Escribir tests comprehensivos | 4-6 horas     | 1 hora     | 3h - 5h         | **75-83%** |
| Validar arquitectura tokens   | 30 min        | 2 min      | 28 min          | **93%**    |
| Preparar release NPM          | 2 horas       | 15 min     | 1h 45m          | **88%**    |
| Documentar componente         | 2-3 horas     | 30 min     | 1h 30m - 2h 30m | **75-83%** |

**Ahorro Total por Componente Completo:** 12-18 horas

**Punto de Equilibrio (ROI Positivo):**

- Inversión: 240 horas (peor caso)
- Ahorro por componente: 12 horas (promedio conservador)
- **ROI positivo después de 20 componentes** (240h ÷ 12h)
- **Con 5 componentes:** 60 horas ahorradas (25% ROI)
- **Con 10 componentes:** 120 horas ahorradas (50% ROI)

---

### Métricas de Productividad

**Antes de Skills:**

```
Crear 1 componente completo:
- Scaffolding: 30 min
- Implementación: 2-3 horas
- Tests: 4-6 horas
- Documentación: 2-3 horas
- Tokens: 1 hora
- Validación: 30 min
TOTAL: 10-14 horas
```

**Después de Skills:**

```
Crear 1 componente completo:
- Scaffolding: 5 min (skill: component-creator)
- Implementación: 2-3 horas (manual)
- Tests: 1 hora (skill: component-test-generator)
- Documentación: 30 min (skill: component-docs-generator)
- Tokens: 10 min (skill: recipe-token-generator)
- Validación: 2 min (skill: token-architecture-validator)
TOTAL: 4-5 horas (60% reducción)
```

---

### Beneficios Cualitativos

**1. Consistencia:**

- ✅ 100% de componentes siguen estructura idéntica
- ✅ 0 archivos olvidados (tests, a11y, docs)
- ✅ Naming conventions aplicadas automáticamente

**2. Calidad:**

- ✅ WCAG 2.1 AA compliance verificada antes de commits
- ✅ Test coverage >85% alcanzada automáticamente
- ✅ Token architecture integrity garantizada

**3. Onboarding:**

- ✅ Nuevos developers productivos en <1 día (antes: 1 semana)
- ✅ No necesitan leer 50+ páginas de documentación
- ✅ Skills guían con prompts interactivos

**4. Escalabilidad:**

- ✅ Crear 10 componentes es tan fácil como crear 1
- ✅ Agregar flavors no requiere conocimiento profundo
- ✅ Team de 5 personas puede mantener ritmo de 1 componente/día

**5. Mantenibilidad:**

- ✅ Refactoring masivo facilitado (update templates)
- ✅ Breaking changes comunicados automáticamente
- ✅ Documentation siempre sincronizada con código

---

## 6. PLAN DE IMPLEMENTACIÓN DETALLADO

### Semana 1-2: Skills Críticas (P0)

#### Día 1-2: `token-architecture-validator`

**Objetivo:** Prevenir violaciones arquitectónicas

**Tareas:**

1. Crear `.claude/skills/token-architecture-validator/SKILL.md`
2. Implementar validaciones:
   - Ingredients: NO referencias
   - Flavors: SOLO Ingredients
   - Recipes: SOLO Flavors
3. Detectar circular dependencies
4. Validar naming conventions
5. Generar reporte detallado

**Output:**

````yaml
---
name: token-architecture-validator
description: Validates 3-layer token architecture integrity. Checks that Ingredients have NO references, Flavors ONLY reference Ingredients, Recipes ONLY reference Flavors. Detects violations, circular dependencies, naming convention errors. Use before commits, PRs, or token builds.
allowed-tools: Read, Glob, Bash
---

# Token Architecture Validator

## Algorithm

1. Read all token files from packages/tokens/src/
2. Parse JSON and extract references {color.blue.500}
3. Validate by layer:
   - Ingredients: Assert no references
   - Flavors: Assert references ONLY to Ingredients
   - Recipes: Assert references ONLY to Flavors
4. Check for circular dependencies (A → B → A)
5. Validate naming conventions (--sando-*)
6. Generate violation report

## Example Validation

```bash
# Validate all tokens
node .claude/skills/token-architecture-validator/validate.js

# Output example
✅ Ingredients: 0 violations
❌ Recipes: 1 violation
   - button.json:12 references Ingredient directly
````

```

---

#### Día 3-6: `component-creator`

**Objetivo:** Generar componentes completos automáticamente

**Tareas:**
1. Crear `.claude/skills/component-creator/SKILL.md`
2. Crear templates para 7 archivos
3. Implementar prompts interactivos
4. Script de generación de archivos
5. Actualización de exports
6. Validación TypeScript

**Templates:**
- `component.ts.template` - Lit component
- `types.ts.template` - TypeScript types
- `stories.ts.template` - Storybook
- `test.ts.template` - Vitest
- `spec.ts.template` - Playwright
- `a11y.test.ts.template` - axe-core
- `index.ts.template` - Barrel export

---

#### Día 7-10: `recipe-token-generator`

**Objetivo:** Generar tokens Recipe validados

**Tareas:**
1. Crear `.claude/skills/recipe-token-generator/SKILL.md`
2. Template de recipe tokens
3. Validación de referencias (SOLO Flavors)
4. Generación de estados (default, hover, active, disabled)
5. Naming convention enforcement

---

#### Día 11-14: Testing y Refinamiento P0

**Tareas:**
1. Probar las 3 skills con componentes reales
2. Refinar prompts y mensajes de error
3. Documentar uso de cada skill
4. Crear ejemplos de invocación
5. Integrar en workflow diario

---

### Semana 3-4: Skills de Theming (P1)

#### Día 15-18: `flavor-creator`

**Tareas:**
1. Crear 5 templates (flavor, flavor-dark, flavor-high-contrast, flavor-forced-colors, flavor-motion-reduce)
2. Prompts interactivos para mapping
3. Validación de referencias a Ingredients
4. Generación automática de dark mode

---

#### Día 19-24: `color-palette-generator`

**Tareas:**
1. Implementar algoritmo OKLCH
2. Generación de 11 pasos perceptualmente uniformes
3. Validación WCAG AA (4.5:1 contrast)
4. Fallback a HSL para browsers antiguos
5. Integration con color.json

---

#### Día 25-28: Testing y Refinamiento P1

---

### Mes 2: Skills de Calidad (P2)

#### Semana 5-6: `accessibility-auditor`, `component-test-generator`, `npm-release-preparer`

**Distribución:**
- accessibility-auditor: 5 días
- component-test-generator: 5 días
- npm-release-preparer: 4 días

---

### Mes 3-5: Skills P3 y P4

**Implementación progresiva** de las 7 skills restantes según roadmap.

---

## 7. RECOMENDACIONES FINALES

### Orden de Implementación Óptimo

**🔴 FASE 1 - CRÍTICO (Implementar AHORA):**
1. `token-architecture-validator` - Previene deuda técnica
2. `component-creator` - Desbloquea desarrollo
3. `recipe-token-generator` - Necesario para cada componente

**Razón:** Estas 3 skills son **bloqueantes** para el desarrollo de componentes. Sin ellas, cada componente nuevo toma 10-14 horas. Con ellas, toma 4-5 horas.

---

**🟠 FASE 2 - ALTA PRIORIDAD (Próximas 2 semanas):**
4. `flavor-creator` - Feature diferenciador
5. `color-palette-generator` - USP del proyecto

**Razón:** El sistema de theming con OKLCH es lo que diferencia a Sando de otros design systems. Automatizar esto es **estratégico**.

---

**🟡 FASE 3-6 - MEJORA CONTINUA (Meses 2-5):**
6-15. Resto de skills

**Razón:** Estas skills mejoran DX pero no son bloqueantes. Implementar después de validar valor de Fases 1-2.

---

### Estrategia de Adopción

**Híbrida Skills + Agentes:**

```

┌─────────────────────────────────────────────────────────┐
│ Usuario Request │
└─────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────┐
│ Agent (Estrategia, Decisiones, Análisis) │
│ - Diseña API │
│ - Decide arquitectura │
│ - Revisa calidad │
└─────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────┐
│ Skill (Ejecución, Scaffolding, Validación) │
│ - Genera archivos │
│ - Ejecuta tests │
│ - Valida compliance │
└─────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────┐
│ Agent (Refinamiento, Documentación, Deployment) │
│ - Implementa lógica compleja │
│ - Escribe narrative docs │
│ - Optimiza performance │
└─────────────────────────────────────────────────────────┘

```

**Regla de Oro:**
- Si la tarea es **repetitiva y determinística** → Skill
- Si la tarea requiere **juicio y creatividad** → Agent

---

### Mantenimiento y Evolución

**Skills son Code:**
- Versionar en git (`.claude/skills/`)
- Documentar cambios en CHANGELOG
- Testing de skills (pueden tener tests!)
- Refactoring cuando patrones emergen

**Skills Feedback Loop:**
```

Usuario usa skill → Identifica friction → Reporta issue →
Skill mejorada → Actualización automática (git pull)

```

---

### Métricas de Monitoreo

**KPIs para Skills:**
1. **Adoption Rate:** % de veces que skill se invoca vs manual
2. **Success Rate:** % de invocaciones exitosas
3. **Time Saved:** Tiempo manual vs tiempo con skill
4. **Error Rate:** % de invocaciones con errores
5. **User Satisfaction:** NPS de developers usando skills

**Dashboard Ejemplo:**
```

📊 Skills Analytics (Last 30 days)

component-creator:

- Invocations: 47
- Success Rate: 94%
- Avg Time Saved: 2h 18m
- User Rating: 4.8/5

token-architecture-validator:

- Invocations: 156
- Violations Found: 23
- False Positives: 2 (1.3%)
- User Rating: 4.9/5

flavor-creator:

- Invocations: 12
- Success Rate: 100%
- Avg Time Saved: 3h 12m
- User Rating: 5.0/5

```

---

## 8. CONCLUSIONES

### Resumen de Hallazgos

1. **15 skills identificadas** que automatizan procesos críticos del proyecto
2. **ROI positivo** después de 20 componentes (con inversión conservadora)
3. **Ahorro de 12-18 horas** por componente completo
4. **Estrategia híbrida Skills + Agentes** es óptima (no reemplazar todos los agentes)

### Próximos Pasos Inmediatos

**Esta Semana:**
1. ✅ Revisar este plan de implementación
2. ✅ Aprobar roadmap de Fases 1-2
3. ✅ Crear estructura `.claude/skills/` en el proyecto
4. ✅ Comenzar implementación de `token-architecture-validator`

**Próximas 2 Semanas:**
1. ✅ Completar las 3 skills P0 (critical)
2. ✅ Probar skills con componentes reales
3. ✅ Medir time saved vs baseline
4. ✅ Decidir continuar con Fase 2 basado en resultados

**Mes 2-3:**
1. ✅ Implementar skills de theming (P1)
2. ✅ Implementar skills de calidad (P2)
3. ✅ Medir adoption rate y user satisfaction
4. ✅ Refinar skills basado en feedback

---

### Impacto Esperado

**Desarrollo de Componentes:**
- **Antes:** 10-14 horas/componente
- **Después:** 4-5 horas/componente
- **Reducción:** 60% tiempo

**Creación de Themes:**
- **Antes:** 3-4 horas/flavor
- **Después:** 20-30 minutos/flavor
- **Reducción:** 90% tiempo

**Validación de Calidad:**
- **Antes:** Manual, inconsistente
- **Después:** Automática, 100% coverage
- **Reducción:** 93% tiempo

**Developer Onboarding:**
- **Antes:** 1 semana para productividad
- **Después:** <1 día para productividad
- **Reducción:** 86% tiempo

---

### Reflexión Final

Las **Skills de Claude Code** son herramientas poderosas para automatizar procesos repetitivos en el desarrollo de design systems. Sin embargo, no deben reemplazar la **experiencia, creatividad y juicio** que aportan los agentes especializados.

La **estrategia híbrida** (Skills para ejecución + Agentes para estrategia) maximiza productividad sin sacrificar calidad.

**Sando Design System** tiene la oportunidad de ser un **caso de estudio** de cómo AI-powered workflows pueden acelerar el desarrollo de design systems profesionales.

---

**Última Actualización:** Enero 2025
**Autor:** Análisis generado por Claude (Anthropic)
**Estado:** Listo para Implementación
**Próxima Revisión:** Después de Fase 1 (2 semanas)

---

## Apéndices

### Apéndice A: Estructura de Directorios Propuesta

```

.claude/
├── agents/ # 18 agentes existentes (mantener)
│ ├── design-system-architect.md
│ ├── frontend-developer.md
│ └── ...
└── skills/ # 15 skills nuevas
├── component-creator/
│ ├── SKILL.md
│ └── templates/
│ ├── component.ts.template
│ ├── types.ts.template
│ ├── stories.ts.template
│ ├── test.ts.template
│ ├── spec.ts.template
│ ├── a11y.test.ts.template
│ └── index.ts.template
├── recipe-token-generator/
│ ├── SKILL.md
│ └── recipe.json.template
├── token-architecture-validator/
│ ├── SKILL.md
│ └── validate.js (script opcional)
├── flavor-creator/
│ ├── SKILL.md
│ └── templates/
│ ├── flavor.json.template
│ ├── flavor-dark.json.template
│ ├── flavor-high-contrast.json.template
│ ├── flavor-forced-colors.json.template
│ └── flavor-motion-reduce.json.template
├── color-palette-generator/
│ ├── SKILL.md
│ └── scripts/
│ └── oklch-generator.js
├── accessibility-auditor/
│ └── SKILL.md
├── component-test-generator/
│ ├── SKILL.md
│ └── templates/
│ ├── test.ts.template
│ ├── spec.ts.template
│ └── a11y.test.ts.template
├── visual-regression-snapshot/
│ └── SKILL.md
├── npm-release-preparer/
│ └── SKILL.md
├── storybook-deployer/
│ └── SKILL.md
├── component-docs-generator/
│ └── SKILL.md
├── token-docs-generator/
│ └── SKILL.md
├── component-variant-expander/
│ └── SKILL.md
├── ingredient-palette-creator/
│ └── SKILL.md
└── monorepo-task-runner/
└── SKILL.md

```

### Apéndice B: Referencias

**Claude Code Skills:**
- [Claude Code Skills Documentation](https://docs.claude.com/en/docs/claude-code/skills)

**Sando Design System:**
- `CLAUDE.md` - Project overview
- `action-plan.md` - Progressive release strategy
- `COLOR-PHILOSOPHY.md` - Color system philosophy
- `team-agents-analysis.md` - Agent collaboration workflows
- `packages/components/docs/COMPONENT_TEMPLATE.md` - Component structure

**Design System References:**
- [Design System Checklist](https://designsystemchecklist.com/)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OKLCH Color Space](https://oklch.com/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)

---

**FIN DEL DOCUMENTO**
```
