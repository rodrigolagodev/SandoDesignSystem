# Análisis de PR #140

**PR:** `feat(tokens,components): activate flavor typography via two-bridge model (ADR-005)`
**Branch:** `refactor/consolidate-skeletons` → `master`
**URL:** https://github.com/rodrigolagodev/SandoDesignSystem/pull/140
**Fecha:** 2026-06-14

---

## Resumen del Cambio

El PR introduce el **modelo de activación de tipografía two-bridge** (ADR-005) que cierra la brecha entre tener tokens de tipografía declarados y que realmente se apliquen en el DOM. Adicionalmente, depreca 13 componentes skeleton preset.

### Componentes del cambio

| Área              | Descripción                                                                                                                                                                       | Archivos |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **Tokens**        | Nuevo export `@sando-ds/tokens/css/base` (preflight), recipes completados con fontFamily para 5 componentes, barrel generator                                                     | 7        |
| **Componentes**   | `resetStyles` mejorado, 5 componentes aplican nuevos tokens, `option` corrige violación TA-CR-R1, `tokens.css.ts` refactorizado a barrels auto-generados, 13 skeletons deprecados | ~40      |
| **Documentación** | ADR-005, TYPOGRAPHY_SYSTEM v3.1.0, COMPONENT_ARCHITECTURE v2.2.0, THEMING_STRATEGY v2.1.0, TEST_COVERAGE v2                                                                       | 5        |
| **Storybook**     | `preview.js` importa `base.css`                                                                                                                                                   | 1        |
| **Changesets**    | `typography-activation-bridges.md`, `deprecate-skeleton-presets.md`                                                                                                               | 2        |

---

## Revisiones por Agente

### 1. 🏛️ sando-architect — Revisión Arquitectónica

**Estado:** ✅ Completo

| Aspecto                                             | Veredicto                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------ |
| ADR-005 (Two-Bridge Model)                          | ✅ Sólido — Option D es la decisión correcta                                   |
| Two-rule `:where(:root)` vs `:where([data-flavor])` | ✅ Verificado contra FlavorableMixin y SD format                               |
| `font-size: inherit` en resetStyles                 | ✅ Correcto — Tree scoping cascade confirmado                                  |
| Nested flavor overrides                             | ✅ Consistente — cadena de atributos completa verificada                       |
| CA-CR-R6 host_typography_activation                 | ✅ Correcto                                                                    |
| TS-CP-P6 "Variables Are Not Enough"                 | ⚠️ Ligeramente sobre-generalizado (específico de tipografía)                   |
| THEMING_STRATEGY CSS examples                       | ⚠️ Pre-existente: usa `[flavor="..."]` en vez de `[data-flavor="..."]`/`:root` |

**Hallazgos:**

- El diagnosis del problema es exhaustivo y basado en evidencia (grep con 0 resultados)
- Option analysis (A/B/C/D) es completo y lógico
- La separación background-color solo en `:root` (no en `[data-flavor]`) es correcta para no clobberear `:host` backgrounds

---

### 2. 🎨 sando-tokens — Revisión de Tokens

**Estado:** ✅ Completo

| Aspecto                                                  | Veredicto                                |
| -------------------------------------------------------- | ---------------------------------------- |
| `base.css` preflight (two-rule design)                   | ✅ Correcto                              |
| Variables referenciadas existen                          | ✅ 6 variables confirmadas en flavor CSS |
| `package.json` export `./css/base`                       | ✅ Linea 9, correctamente listado        |
| Recipe `alert.json` fontFamily                           | ✅ Correcto                              |
| Recipe `card.json` fontFamily + heading._ + body._       | ✅ Correcto                              |
| Recipe `dialog.json` fontFamily + header.titleFontFamily | ✅ Correcto                              |
| Recipe `form.json` fontFamily                            | ✅ Correcto                              |
| Recipe `tooltip.json` fontFamily                         | ✅ Correcto                              |
| `tokens.css.ts` barrel refactor                          | ✅ Elimina 79 líneas de imports manuales |
| TA-CR-R1 fix (option)                                    | ✅ Corregido                             |

**Hallazgos:**

- `card.json body.fontSize` tipo "dimension" vs ingredient "fontSize" — mismatch DTCG menor
- `dialog.json` recipe declara body.\* tokens pero el componente no los consume en este PR

---

### 3. 💻 sando-developer — Revisión de Componentes

**Estado:** ✅ Completo (con fixes aplicados)

| Componente              | Veredicto                                                               |
| ----------------------- | ----------------------------------------------------------------------- |
| `resetStyles` (`:host`) | ✅ Correcto — font-family/line-height/color con fallback inherit        |
| Alert                   | ✅ `.alert-content` con `--sando-alert-fontFamily`                      |
| Card                    | ✅ heading/body tokens aplicados, hardcode `line-height: 1.3` eliminado |
| Dialog                  | ✅ panel fontFamily + title fontFamily                                  |
| Form                    | ✅ `:host` con `--sando-form-fontFamily`                                |
| Tooltip                 | ✅ (pre-existente, recipe se completa)                                  |
| Option                  | 🔴 **Tenía 2 violaciones TA-CR-R1 remanentes** → ✅ **FIXED**           |
| Checkbox                | 🔴 **Tenía 2 violaciones TA-CR-R1 remanentes** → Ya estaba limpio       |
| 13 skeleton presets     | ✅ Deprecation pattern consistente                                      |

**Fixes aplicados:**

1. `option/styles/base.css.ts:29-30` — `--sando-select-transition-*` → `--sando-option-transition-*` ✅
2. `checkbox/styles/base.css.ts:28-29` — Ya estaba limpio, no requería cambios ✅
3. 13 skeleton console.warn — ruta actualizada a `Components → Skeleton → Patterns. Tracked in #126.` ✅
4. 13 skeleton console.warn — añadido `NODE_ENV === 'test'` guard ✅
5. Tests: 2,777/2,777 pasan después de fixes ✅

---

### 4. 🧪 sando-quality — Revisión de Calidad

**Estado:** ✅ Completo

| Aspecto                            | Veredicto                                                     |
| ---------------------------------- | ------------------------------------------------------------- |
| TC-CR-R1-EX1 (data-only exception) | ✅ Justificado, bien scoped                                   |
| Test results (22,528 + 2,777)      | ✅ Todos pasan                                                |
| 18 snapshots actualizados          | ✅ Esperados — reflejan nuevo `:host` reset                   |
| `console.warn` en test runs        | ⚠️ **FIXED** — se añadió guardia NODE_ENV                     |
| `base.css` two-block structure     | ⚠️ No testeado — sugerencia: agregar test en barrel-generator |
| Regresión de accesibilidad         | ✅ Ninguna — font-size, line-height, color preservados        |

---

### 5. 📖 sando-storybook — Revisión de Storybook

**Estado:** ✅ Completo

| Aspecto                              | Veredicto                                             |
| ------------------------------------ | ----------------------------------------------------- |
| Import de `base.css` en `preview.js` | ✅ Correcto — después de flavors, antes de decorators |
| Ruta relativa                        | ✅ Correcta                                           |
| Build de Storybook                   | ✅ Pasa                                               |

---

### 6. 📝 sando-documenter — Revisión de Documentación

**Estado:** ✅ Completo

| Documento                                | Veredicto                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ADR-005                                  | ✅ Completo — estructura Context → Decision → Options → Consequences → Migration → Verification |
| TYPOGRAPHY_SYSTEM v3.1.0 (TSYS-LDA)      | ✅ Sólido — code examples, rule con 3 alternatives                                              |
| COMPONENT_ARCHITECTURE v2.2.0 (CA-CR-R6) | ✅ host_typography_activation section profunda                                                  |
| THEMING_STRATEGY v2.1.0 (TS-CP-P6)       | ✅ Conciso pero completo                                                                        |

**Hallazgos:**

- ⚠️ PR mezcla 2 cambios no relacionados: tipografía + deprecación skeletons
- ⚠️ Branch name `refactor/consolidate-skeletons` no coincide con PR title
- 💡 THEMING_STRATEGY CSS examples usan `[flavor="..."]` pero build produce `[data-flavor="..."]`/`:root`

---

### 7. ✍️ sando-ux-writer — Revisión de Copy

**Estado:** ✅ Completo

| Aspecto                          | Veredicto                                                |
| -------------------------------- | -------------------------------------------------------- |
| Deprecation warnings consistency | ✅ 10 fortalezas identificadas                           |
| VT-CR-R1 (Warm)                  | ✅ Sin lenguaje culpa, respetuoso                        |
| VT-CR-R2 (Precision)             | ✅ Consistente, preciso                                  |
| VT-CR-R3 (Educational)           | ✅ Incluye qué usar en vez y dónde encontrar replacement |

**Hallazgos:**

- ⚠️ Ruta Storybook no coincide: JSDoc dice "Components →" pero console.warn no → **FIXED**
- 💡 Faltaba `#126` en runtime warning → **FIXED**
- 💡 Componentes de layout (composer/row/stack) tienen mensaje genérico que no describe su función exacta

---

## Issues Encontrados y Resueltos

| #   | Severidad | Issue                                                       | Archivo(s)                         | Estado       |
| --- | --------- | ----------------------------------------------------------- | ---------------------------------- | ------------ |
| 1   | ⚠️ Medio  | Violación TA-CR-R1: `--sando-select-transition-*` en option | `option/styles/base.css.ts`        | ✅ **FIXED** |
| 2   | ⚠️ Medio  | Ruta Storybook no coincide entre JSDoc y console.warn       | 13 skeleton `*.ts`                 | ✅ **FIXED** |
| 3   | ⚠️ Medio  | `console.warn` sin guardia NODE_ENV en tests                | 13 skeleton `*.ts`                 | ✅ **FIXED** |
| 4   | 💡 Bajo   | ADR-005: falta nota de font-weight en Bridge 2              | `ADR-005-typography-activation.md` | ✅ **FIXED** |
| 5   | 💡 Bajo   | ADR-005: falta tradeoff de background-color en Bridge 1     | `ADR-005-typography-activation.md` | ✅ **FIXED** |

---

## Issues Remanentes (no blocking, sugerencias)

| #   | Área     | Issue                                                                      | Propuesto por |
| --- | -------- | -------------------------------------------------------------------------- | ------------- |
| 1   | PR Scope | PR mezcla 2 cambios no relacionados (tipografía + skeletons)               | documenter    |
| 2   | Tokens   | `card.json body.fontSize` DTCG type mismatch ("dimension" vs "fontSize")   | tokens        |
| 3   | Calidad  | `base.css` two-block structure no testeada                                 | quality       |
| 4   | Docs     | THEMING_STRATEGY CSS examples desactualizados (pre-existente)              | architect     |
| 5   | Docs     | THEMING_STRATEGY.CSS examples attribute selector inconsistency             | architect     |
| 6   | Copy     | Layout skeletons (composer/row/stack) tienen mensaje de reemplazo genérico | ux-writer     |

---

## Agentes Participantes

| Agente             | Rol           | Revisó                                                  |
| ------------------ | ------------- | ------------------------------------------------------- |
| `sando-architect`  | Arquitectura  | ADR-005, decisiones estructurales, guidelines           |
| `sando-tokens`     | Tokens        | base.css, recipes, barrel generator                     |
| `sando-developer`  | Componentes   | resetStyles, 5 componentes, 13 skeletons, tokens.css.ts |
| `sando-quality`    | Calidad       | TEST_COVERAGE, tests, snapshots, a11y                   |
| `sando-storybook`  | Storybook     | preview.js import base.css                              |
| `sando-documenter` | Documentación | ADR-005, 3 guidelines actualizados                      |
| `sando-ux-writer`  | UX Writing    | Deprecation messages, changesets, PR body               |

---

_Generado por Sando Orchestrator — 2026-06-14_
