---
title: "Sando Design System — Análisis Competitivo Integral"
date: 2026-02-21
language: es
note: "Traducido del análisis original en inglés. Se han mantenido en inglés los nombres propios de sistemas, términos técnicos, nombres de archivos, paquetes npm, variables CSS, código y acrónimos técnicos."
---

# Sando Design System — Análisis Competitivo Integral

## 1. Resumen Ejecutivo

**Sando Design System es un sistema en fase pre-release arquitectónicamente ambicioso que supera con creces lo esperable para su madurez en arquitectura de tokens, sofisticación de temas y infraestructura de accesibilidad.** Su sistema de tokens de tres capas con referenciado unidireccional estricto, 7 flavors completamente modales (cada uno con 5 modos de accesibilidad = 35 archivos de tema), y su ciencia del color basada en OKLCH lo sitúan por delante de la mayoría de competidores en decisiones fundacionales de diseño. La biblioteca de 33 componentes (incluyendo 16 componentes skeleton especializados), 59 archivos de test con umbrales obligatorios de cobertura del 80%, y 19 archivos de test dedicados a accesibilidad demuestran un rigor ingenieril genuino — no solo promesas en la documentación.

**Sin embargo, Sando se enfrenta a tres retos críticos para estar listo para producción.** En primer lugar, su catálogo de componentes está centrado en formularios y es estrecho — carece de componentes de maquetación (grid, stack, divider), componentes de feedback (toast, alert, dialog, modal), componentes de navegación (tabs, breadcrumb, menu, navbar), y componentes de visualización de datos (table, accordion, card, avatar). Los equipos medianos que adopten Sando chocarán con un muro en el primer sprint. En segundo lugar, aunque la arquitectura es sólida, su madurez de ecosistema es esencialmente nula — sin comunidad, sin integraciones de terceros, sin despliegues en producción probados y un único mantenedor. En tercer lugar, la historia de integración con React (el framework frontend con mayor cuota de mercado) sigue siendo una intención documentada en lugar de una solución entregada.

**La recomendación estratégica es clara: Sando NO debería intentar competir en amplitud. En su lugar, debería apoyarse en sus diferenciadores genuinos** — el sistema de tokens con metáfora del sándwich, el sistema de temas multimodo líder en su clase, y la filosofía de curado frente a personalizado — al tiempo que expande rápidamente el catálogo de componentes para cubrir los 15-20 componentes que constituyen el 90% de las necesidades típicas de UI de producto. Es preferible lanzar un v1.0 seguro con menos componentes excelentes que 60 componentes a medio hacer.

---

## 2. Cuadro de Madurez

| Dimensión                       | Sando  | MD3    | Radix  | Chakra | Tailwind | Carbon | Spectrum | Shoelace | Lion   |
| ------------------------------- | ------ | ------ | ------ | ------ | -------- | ------ | -------- | -------- | ------ |
| **Arquitectura de Tokens**      | 4      | 4      | 2      | 3      | 3        | 5      | 5        | 3        | 3      |
| **Sistema de Color**            | 4      | 5      | 2      | 3      | 3        | 4      | 4        | 3        | 2      |
| **Estrategia de Temas**         | 5      | 4      | 3      | 3      | 2        | 4      | 4        | 3        | 4      |
| **Sistema Tipográfico**         | 3      | 4      | 2      | 3      | 4        | 4      | 4        | 3        | 3      |
| **Sistema de Espaciado**        | 4      | 3      | 2      | 4      | 4        | 4      | 4        | 3        | 3      |
| **Diseño de Movimiento**        | 3      | 4      | 2      | 2      | 1        | 3      | 4        | 2        | 2      |
| **Arquitectura de Componentes** | 4      | 4      | 5      | 3      | 3        | 4      | 5        | 4        | 5      |
| **Accesibilidad**               | 4      | 4      | 4      | 3      | 3        | 5      | 5        | 3        | 4      |
| **Experiencia de Desarrollo**   | 3      | 4      | 5      | 5      | 5        | 3      | 3        | 4        | 3      |
| **Integración con Frameworks**  | 2      | 4      | 2      | 2      | 5        | 4      | 3        | 4        | 3      |
| **Madurez del Ecosistema**      | 1      | 5      | 4      | 4      | 5        | 5      | 4        | 3        | 2      |
| **Build y Distribución**        | 3      | 4      | 4      | 3      | 5        | 5      | 4        | 3        | 3      |
| **TOTAL**                       | **40** | **49** | **37** | **38** | **43**   | **50** | **49**   | **38**   | **37** |

### Justificación de Puntuación para Sando

| Dimensión                       | Puntuación                                                                                                                                                                                                                                                                                                                                                                                                               | Justificación |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| Arquitectura de Tokens (4)      | Tres capas con referenciado unidireccional estricto validado por tests, Style Dictionary 4.0, salida dual CSS+TS, 9 archivos ingredient, 18 archivos recipe. Se descuenta del 5 por no cumplir el formato W3C DTCG más allá de la validación estructural, y por carecer de sincronización con herramientas de diseño (Figma Tokens).                                                                                     |
| Sistema de Color (4)            | OKLCH está genuinamente a la vanguardia (la mayoría de competidores aún usan HSL o hex). Generación algorítmica de paletas mediante culori, validación automática de contraste WCAG, más de 170 tokens. Se descuenta del 5 por no tener generación dinámica de color en tiempo de ejecución (Material You de MD3 lo hace), y por carecer de herramientas de simulación de daltonismo.                                    |
| Estrategia de Temas (5)         | Esta es la joya de la corona de Sando. 7 flavors × 5 modos = 35 archivos de tema. Modos de accesibilidad automáticos vía `@media` queries. FlavorableMixin con recorrido del árbol DOM incluyendo Shadow DOM. Sobrecargas a nivel de sección y de componente. Ningún competidor iguala esta completitud para un sistema Web Components.                                                                                  |
| Sistema Tipográfico (3)         | Fuentes del sistema (bueno para rendimiento), escala modular, unidades rem, clamp() para responsive. Pero no se encontró implementación de escala tipográfica fluida en los tokens, no hay sistema de ritmo vertical, y la documentación es limitada comparada con las directrices tipográficas de Carbon o Spectrum.                                                                                                    |
| Sistema de Espaciado (4)        | Unidad base de 4px, nomenclatura por tallas, propiedades lógicas obligatorias, conceptos separados de inset/stack/control. Implementación sólida. Se descuenta del 5 por carecer de sistema de densidad (modos compact/comfortable/spacious como MD3/Carbon).                                                                                                                                                            |
| Diseño de Movimiento (3)        | Duraciones basadas en tokens, easing semántico, mandato de propiedades solo GPU, reduced-motion automático mediante archivos de modo, estilos de animación compartidos. Pero sistema de coreografía limitado, sin primitivas de stagger/sequence, y los tokens de movimiento son básicos comparados con el sistema de movimiento integral de Spectrum.                                                                   |
| Arquitectura de Componentes (4) | Patrón limpio de 7 archivos, FlavorableMixin, Shadow DOM aplicado consistentemente, buena capa de utilidades (dom-helpers, event-helpers, etc.), sistema de estilos compartidos. Se descuenta del 5 por no tener patrón de componentes compuestos (como Dialog.Trigger de Radix), sin validación de slots, y el patrón no ha sido probado a escala con componentes complejos (solo elementos de formulario hasta ahora). |
| Accesibilidad (4)               | 19 archivos de test a11y dedicados, integración con axe-core, soporte de forced-colors, navegación por teclado con roving tabindex, captura de foco, objetivos táctiles de 44px, tests de contraste. Se descuenta del 5 por carecer de gestión de live regions, sin documentación de tests con lectores de pantalla, y sin demostración de tests de modo de alto contraste más allá de las definiciones de tokens.       |
| Experiencia de Desarrollo (3)   | TypeScript en modo strict, Custom Elements Manifest, conventional commits, changesets. Pero sin CLI generador de componentes, mensajes de error no documentados, sin guías de migración, la documentación de superficie de API está en VitePress pero su completitud es desconocida. El sistema de agentes OpenCode es innovador pero no estándar.                                                                       |
| Integración con Frameworks (2)  | Web Components proporcionan soporte cross-framework de base, pero no se envían wrappers `@lit/react`, no hay estrategia de SSR documentada, sin ejemplos específicos por framework en la documentación. Los eventos usan `composed: true` (bien), pero la integración con React requiere trabajo manual.                                                                                                                 |
| Madurez del Ecosistema (1)      | Mantenedor único, sin comunidad, sin despliegues en producción, sin integraciones de terceros, sin presencia en Stack Overflow, sin ponencias en conferencias. Esta es la dura realidad de un sistema en fase pre-release.                                                                                                                                                                                               |
| Build y Distribución (3)        | Turborepo + pnpm workspaces, exports individuales por componente, GitHub Actions CI con pipeline de despliegue, changesets para versionado. Pero sin distribución CDN, sin monitorización de tamaño de bundle, sin tests de regresión visual, y el sistema de caché del pipeline de build es personalizado (frágil).                                                                                                     |

---

## 3. Innovaciones Únicas de Sando

### 🥇 Innovación 1: Arquitectura de Tokens de Tres Capas con Fronteras Validadas por Tests

**Qué es**: Ingredients → Flavors → Recipes con referenciado unidireccional estricto. `token-references.test.js` valida activamente que ningún recipe referencie directamente un ingredient, impidiendo el salto de capas. Esto no es solo una convención de nombres — es una restricción arquitectónica testeada.

**Por qué importa**: La mayoría de design systems documentan capas de tokens pero no las imponen. Con el tiempo, los desarrolladores toman atajos y referencian primitivos directamente desde los componentes, creando un acoplamiento frágil. La validación por tests de Sando hace que la arquitectura se auto-repare — el CI detecta las violaciones antes de que se fusionen.

**Competidores que carecen de esto**: Shoelace y Chakra no tienen imposición de capas. Tailwind no tiene capa semántica en absoluto. Radix tiene una arquitectura de tokens mínima. Incluso Carbon y Spectrum, aunque tienen sistemas de tokens rigurosos, no publican sus tests de imposición como característica de primera clase.

**Veredicto**: **MANTENER y MEJORAR.** Este es un diferenciador genuino. Mejorar añadiendo una regla de lint o un plugin de ESLint que detecte violaciones de capas en el CSS de componentes en tiempo de desarrollo (no solo en el JSON de tokens), y documentar esto como característica estrella.

### 🥇 Innovación 2: Sistema Integral de Flavors Multimodo

**Qué es**: Cada flavor se entrega con 5 archivos de modo (base, dark, high-contrast, forced-colors, motion-reduce), todos aplicados automáticamente vía `@media` queries. 7 flavors × 5 modos = 35 archivos de tema, todos ciudadanos de primera clase sin intervención del desarrollador.

**Por qué importa**: La mayoría de competidores tratan el modo oscuro como el único modo, y forced-colors/alto contraste como consideraciones secundarias. El enfoque de Sando significa que cuando se crea un nuevo flavor, se está obligado a considerar todos los modos de accesibilidad desde el primer día. El modo `forced-colors` usando palabras clave de color del sistema CSS (Canvas, CanvasText, ButtonFace, etc.) es particularmente raro.

**Competidores que carecen de esto**: Shoelace solo tiene modo oscuro. Chakra tiene modo de color pero no forced-colors. Tailwind tiene modo oscuro mediante estrategia de clase pero no forced-colors/alto contraste. Radix tiene modo oscuro básico. Solo Carbon y Spectrum se acercan a una completitud similar, pero ninguno usa el elegante patrón de "archivos de modo por flavor".

**Veredicto**: **MANTENER y PROMOCIONAR.** Este debería ser el diferenciador de marketing número 1 de Sando. Crear una página dedicada mostrando cómo un único atributo `flavor="strawberry"` obtiene automáticamente modo oscuro, alto contraste, forced-colors y reduced-motion de forma gratuita.

### 🥈 Innovación 3: FlavorableMixin con Recorrido del Árbol Shadow DOM

**Qué es**: El FlavorableMixin (284 líneas) recorre el árbol DOM incluyendo fronteras de Shadow DOM para resolver la herencia de flavors. Un componente hijo dentro de un shadow root puede seguir heredando el atributo flavor de su ancestro.

**Por qué importa**: La encapsulación de Shadow DOM normalmente rompe los patrones de herencia de CSS variables. El mixin de Sando resuelve esto con elegancia — se puede establecer `flavor="kiwi"` en una sección de página y cada componente Sando dentro (incluso anidado en Shadow DOM) lo hereda. Esto no es trivial de implementar correctamente.

**Cómo lo gestionan los competidores**: Shoelace no tiene herencia multi-flavor — usa un único tema global. Lion tiene un modelo de extensión pero no cascading de flavors a través de Shadow DOM. Spectrum usa protocolos de contexto pero vinculados a su framework. Carbon usa scoping por clases CSS.

**Veredicto**: **MANTENER y DOCUMENTAR.** La implementación es sofisticada. Añadir documentación exhaustiva mostrando escenarios de flavors anidados, y añadir tests para casos límite profundamente anidados (3+ niveles de anidamiento Shadow DOM).

### 🥈 Innovación 4: Sistema de Color OKLCH con Generación Algorítmica de Paletas

**Qué es**: Todos los colores definidos en el espacio de color OKLCH con una escala universal de luminosidad de 11 pasos. El `palette-generator.js` usa la librería `culori` para generar paletas perceptualmente uniformes a partir de un ángulo de tono y un perfil de saturación. La validación automática de contraste WCAG está integrada en el pipeline de generación.

**Por qué importa**: OKLCH es objetivamente superior a HSL para uniformidad perceptual — un paso 500 azul y un paso 500 amarillo se verán igualmente "medios" para el ojo humano. La mayoría de competidores aún usan HSL o hex, lo que produce escalas perceptualmente inconsistentes. La generación algorítmica significa que añadir un nuevo color de marca es un cambio de una sola línea.

**Competidores**: MD3 usa HCT (enfoque perceptual similar, propietario). Tailwind v4 migró a OKLCH. Carbon y Spectrum aún usan hex/HSL. Radix usa paletas hex ajustadas manualmente. Shoelace usa HSL.

**Veredicto**: **MANTENER y MEJORAR.** Sando está junto a MD3 y Tailwind v4 en la frontera de la ciencia del color. Mejorar añadiendo una herramienta visual de exploración de paletas (demo interactiva que muestre valores OKLCH y ratios de contraste) y documentando la historia de seguridad para daltonismo con capturas de simulación reales.

### 🥈 Innovación 5: Sistema de Composición de Componentes Skeleton

**Qué es**: 16 componentes skeleton — no solo un único primitivo `<skeleton>`, sino un sistema de composición completo: `skeleton-text`, `skeleton-paragraph`, `skeleton-avatar`, `skeleton-button`, `skeleton-card`, `skeleton-article`, `skeleton-profile`, `skeleton-comment`, `skeleton-media-card`, `skeleton-composer`, etc.

**Por qué importa**: La mayoría de design systems entregan un componente skeleton/placeholder básico y dejan la composición a los desarrolladores. Las variantes skeleton precompuestas de Sando permiten a los desarrolladores mostrar estados de carga realistas que coinciden con su UI real sin trabajo personalizado. El patrón `skeleton-composer` permite composiciones a medida.

**Competidores**: Carbon tiene `SkeletonText` y `SkeletonPlaceholder` (2 primitivos). Chakra tiene `Skeleton`, `SkeletonText`, `SkeletonCircle` (3). Spectrum no tiene ninguno integrado. Shoelace no tiene ninguno. Ninguno ofrece skeletons de maquetación precompuestos.

**Veredicto**: **MANTENER y PROMOCIONAR.** Este es un diferenciador sorprendentemente práctico que los equipos adorarán. Demuestra la filosofía "curado, no personalizado" de Sando en acción. Asegurar que cada variante skeleton coincide visualmente con el componente real al que representa.

### 🥉 Innovación 6: La Metáfora del Sándwich como Mnemotecnia Arquitectónica

**Qué es**: La nomenclatura Ingredients/Flavors/Recipes se mapea directamente con la elaboración de un sándwich, haciendo que la arquitectura de tres capas sea intuitivamente memorable.

**Por qué importa**: La terminología de arquitectura de tokens suele ser opaca (primitivos, alias, semánticos, nivel de componente). La metáfora gastronómica de Sando hace que el modelo mental sea pegadizo — "los recipes usan flavors que usan ingredients" es inmediatamente comprensible, incluso para diseñadores que no programan.

**Veredicto**: **MANTENER.** Es encantador, memorable y funcionalmente preciso. No dejar que se convierta en un truco — asegurar que la metáfora siempre se mapee a conceptos arquitectónicos reales.

### 🥉 Innovación 7: Tests de Contraste como Validación de Tokens de Primera Clase

**Qué es**: `contrast.test.js` usa `wcagContrast()` de culori para validar que todos los emparejamientos semánticos de color (texto sobre fondo, enlaces sobre superficies, anillos de foco, etc.) cumplen los mínimos de WCAG AA. Esto se ejecuta en CI junto con las builds de tokens.

**Por qué importa**: La mayoría de sistemas validan el contraste en herramientas de diseño (plugins de Figma) o lo dejan a revisión manual. Tener el contraste como un test automatizado significa que los cambios de color no pueden romper accidentalmente la accesibilidad — el CI fallará.

**Competidores**: Spectrum tiene herramientas de contraste en tiempo de diseño. Carbon tiene verificaciones de accesibilidad pero principalmente en tests de componentes. Ningún competidor testea el contraste a nivel de build de tokens como puerta de validación.

**Veredicto**: **MANTENER y MEJORAR.** Añadir informes de contraste AAA (no solo aprobado/suspenso), y añadir tests para emparejamientos en modo oscuro y alto contraste también (no solo el tema claro base).

---

## 4. Carencias Críticas

### P0 — Bloquean el Lanzamiento a Producción

| #    | Carencia                            | Descripción                                                                                                                                                                                                                         | Impacto                                                                                                                                                                                            | Referencia Best-in-Class                                                                                                                            | Acción Recomendada                                                                                                                                                                                                                                                 |
| ---- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P0-1 | **Faltan componentes críticos**     | No hay dialog/modal, toast/notification, alert, tabs, dropdown menu, tooltip, popover, accordion, table, avatar, card (como componente), breadcrumb, pagination, navbar/sidebar. Solo elementos de formulario + badges + skeletons. | Los equipos no pueden construir una aplicación real solo con Sando. Necesitarán mezclar Sando con otra librería, rompiendo la consistencia de temas. Este es el bloqueante número 1.               | Carbon (50+ componentes), Spectrum (60+ componentes), Shoelace (30+ componentes cubriendo todas las categorías)                                     | **Añadir un mínimo de 12 componentes antes de v1.0**: dialog, toast, alert, tabs, dropdown-menu, tooltip, popover, accordion, card, avatar, table, divider. Priorizar los componentes de overlay/feedback primero — son los más difíciles de construir desde cero. |
| P0-2 | **Sin capa de wrappers para React** | React no puede enlazar propiedades de Web Components ni escuchar eventos personalizados sin trabajo manual. No se entregan wrappers `@lit/react`.                                                                                   | React tiene ~40% de cuota del mercado de frameworks frontend. Sin wrappers, Sando es inutilizable para la mayor audiencia de desarrolladores. Los equipos medianos suelen usar React.              | Shoelace entrega wrappers React vía `@shoelace-style/react`. Spectrum tiene `@spectrum-web-components/react`.                                       | **Entregar el paquete `@sando/react`** usando `createComponent()` de `@lit/react`. Se puede auto-generar desde el Custom Elements Manifest. Esfuerzo: M.                                                                                                           |
| P0-3 | **Sin estrategia de SSR**           | Sin soporte de Declarative Shadow DOM (DSD), sin documentación de SSR, sin estrategia de renderizado en servidor.                                                                                                                   | Los frameworks con renderizado en servidor (Next.js, Nuxt, Astro, SvelteKit) son dominantes. Los componentes que parpadean o requieren JavaScript para renderizarse son un problema crítico de DX. | Lit 3 tiene soporte DSD integrado vía `@lit-labs/ssr`. Shoelace documenta las limitaciones de SSR. Spectrum tiene guías de renderizado en servidor. | **Documentar la estrategia de SSR con honestidad** (mínimo: explicar limitaciones, proporcionar soluciones alternativas). Idealmente, añadir soporte `@lit-labs/ssr`. Esfuerzo: L.                                                                                 |

### P1 — Deberían Corregirse Antes de v1.0

| #    | Carencia                                             | Descripción                                                                                                                                                                 | Impacto                                                                                                                                                                                | Referencia Best-in-Class                                                                                                                                                              | Acción Recomendada                                                                                                                                                                                                              |
| ---- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1-1 | **Sin sistema de densidad**                          | No hay modos compact/comfortable/spacious para el espaciado.                                                                                                                | Las UI empresariales (tablas de datos, paneles de administración) necesitan densidad compacta. Sin ella, Sando no puede servir UI con alta densidad de información.                    | MD3 tiene 3 niveles de densidad. Carbon tiene `condensed` y `normal`.                                                                                                                 | **Añadir tokens de densidad** como cuarta dimensión de modo (junto a dark, high-contrast, forced-colors, reduced-motion). Esfuerzo: M.                                                                                          |
| P1-2 | **Sin patrones de validación de formularios**        | Existen controles de formulario individuales pero no hay composición de formularios validados, ni agregación de errores, ni estrategia de validación a nivel de formulario. | Los desarrolladores construirán validaciones de formulario inconsistentes, derivando en mala UX y problemas de accesibilidad (anuncios de errores, gestión de foco en errores).        | Carbon tiene patrones estructurados de validación de formularios. Lion se construyó específicamente para aplicaciones empresariales centradas en formularios con validación completa. | **Documentar e implementar patrones de validación de formularios** — componente de resumen de errores, validación inline a nivel de campo, anuncios aria-live al enviar. Tomar como referencia el enfoque de Lion. Esfuerzo: L. |
| P1-3 | **Sin monitorización de tamaño de bundle**           | Sin size-limit, sin bundlewatch, sin comprobación en CI para presupuestos de tamaño de componentes.                                                                         | El objetivo declarado de <10KB gzipped por componente es inverificable. Las regresiones de tamaño pasarán desapercibidas.                                                              | Carbon usa size-limit. Spectrum monitoriza el impacto de bundle por PR.                                                                                                               | **Añadir size-limit o bundlewatch** al pipeline de CI. Configurar presupuestos por componente. Esfuerzo: S.                                                                                                                     |
| P1-4 | **Sin tests de regresión visual**                    | Sin Chromatic, sin Percy, sin comparaciones de capturas de pantalla con Playwright.                                                                                         | Los cambios de estilo pueden romper la apariencia visual sin que ningún test lo detecte. Particularmente arriesgado con 35 archivos de tema — un cambio en un modo podría romper otro. | Carbon usa Percy. Spectrum usa Chromatic. Shoelace usa capturas de Playwright.                                                                                                        | **Añadir regresión visual con Playwright** (gratuito, ya instalado en CI). Capturar estados clave en los 7 flavors × claro/oscuro como mínimo. Esfuerzo: M.                                                                     |
| P1-5 | **Sin CLI generador de componentes**                 | Sin herramienta de scaffolding para crear nuevos componentes. Los desarrolladores deben crear manualmente los 7 archivos siguiendo los patrones.                            | Ralentiza el desarrollo de componentes, aumenta el riesgo de inconsistencia, eleva la fricción de onboarding para colaboradores.                                                       | Carbon tiene `@carbon/cli`. Spectrum tiene generadores de componentes.                                                                                                                | **Construir un CLI o script sencillo** (`pnpm create-component sando-dialog`) que genere el patrón de 7 archivos. El sistema de agentes OpenCode existe pero no es estándar. Esfuerzo: S.                                       |
| P1-6 | **Mensajería de errores limitada**                   | No hay mensajes de error documentados para props inválidas, flavors inválidos, slots ausentes o mala configuración.                                                         | Los desarrolladores verán fallos silenciosos o errores crípticos del navegador en lugar de orientación útil.                                                                           | Chakra destaca aquí — advertencias en tiempo de ejecución con enlaces a la documentación. Radix tiene mensajes claros de validación de props.                                         | **Añadir advertencias en modo desarrollo** para errores comunes: nombres de flavor inválidos, slots obligatorios ausentes, valores de variante inválidos. Eliminarlas en las builds de producción. Esfuerzo: M.                 |
| P1-7 | **Sin distribución CDN**                             | Solo npm. Sin bundle para unpkg/jsDelivr/CDN.                                                                                                                               | Impide el uso en entornos sin build (prototipos, CodePen, WordPress, aplicaciones legacy). Los Web Components son especialmente adecuados para uso vía CDN.                            | Shoelace tiene distribución CDN de primera clase con auto-loader.                                                                                                                     | **Añadir bundle listo para CDN** con auto-loader (carga lazy de componentes en el primer uso). Esfuerzo: M.                                                                                                                     |
| P1-8 | **Sin integración con Figma/herramientas de diseño** | Sin librería de Figma, sin integración con Tokens Studio, sin sincronización diseño-código.                                                                                 | Diseñadores y desarrolladores trabajan desde fuentes de verdad diferentes. Los cambios de tokens requieren sincronización manual.                                                      | Spectrum tiene un kit de Figma completo. Carbon tiene librerías de Figma exhaustivas. MD3 tiene Material Theme Builder.                                                               | **Crear librería de Figma** al menos para tokens (colores, tipografía, espaciado) y componentes principales. Considerar Tokens Studio para sincronización bidireccional. Esfuerzo: XL.                                          |

### P2 — Objetivo para v1.x / v2.0

| #    | Carencia                                         | Descripción                                                                                                                                  | Impacto                                                                                                                                       | Referencia Best-in-Class                                                                                      | Acción Recomendada                                                                                                                                                          |
| ---- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2-1 | **Sin soporte de internacionalización**          | Sin tests RTL (solo se exigen propiedades lógicas), sin formateo consciente del locale, sin manejo de texto bidireccional.                   | Bloquea la adopción por equipos internacionales. Las propiedades lógicas son necesarias pero no suficientes.                                  | Carbon y Spectrum tienen soporte integral de i18n/RTL con tests direccionales.                                | **Añadir tests RTL** a al menos 5 componentes principales. Añadir stories con `dir="rtl"`. Esfuerzo: M.                                                                     |
| P2-2 | **Sin patrón de componentes compuestos**         | Todos los componentes son monolíticos. No existe un patrón como `<Dialog><Dialog.Trigger><Dialog.Content>` de Radix para partes componibles. | Los componentes complejos (dialog, popover, dropdown) serán más difíciles de construir con flexibilidad sin primitivas de composición.        | Radix fue pionero en esto en React. Lion tiene un modelo de extensión similar para Web Components.            | **Diseñar un patrón de composición** para el contexto Web Component de Sando (slots + protocolo de contexto). Esfuerzo: L (decisión arquitectónica primero).                |
| P2-3 | **Sin formato W3C Design Token Community Group** | El JSON de tokens usa una estructura personalizada, no el estándar emergente DTCG (`$value`, `$type`, `$description`).                       | Limita la interoperabilidad con herramientas de diseño y otros sistemas que adopten el estándar.                                              | Style Dictionary 4 soporta formato DTCG de forma nativa. Spectrum está alineado con DTCG.                     | **Migrar a formato DTCG** en los archivos JSON de tokens. Style Dictionary 4 lo soporta. Esfuerzo: M.                                                                       |
| P2-4 | **Riesgo de mantenedor único**                   | Un desarrollador (Rodrigo Lago), sin comunidad de colaboradores, sin modelo de gobernanza.                                                   | Factor bus de 1. Riesgo de sostenibilidad para cualquier equipo que considere la adopción.                                                    | Todos los sistemas maduros tienen equipos multipersona y guías de contribución.                               | **Añadir CONTRIBUTING.md**, crear etiquetas "good first issue", escribir registros de decisiones arquitectónicas (ADRs) para facilitar colaboradores externos. Esfuerzo: S. |
| P2-5 | **Sin benchmarks de rendimiento**                | Sin Lighthouse CI, sin monitorización de rendimiento en tiempo de ejecución, sin benchmarks de tiempo de renderizado.                        | No se pueden demostrar las afirmaciones de rendimiento ni detectar regresiones.                                                               | Carbon ejecuta Lighthouse en CI. Spectrum tiene monitorización de rendimiento.                                | **Añadir Lighthouse CI** y benchmarks de renderizado de componentes. Esfuerzo: M.                                                                                           |
| P2-6 | **Sin gestión de live regions**                  | Sin utilidad para anuncios aria-live, notificaciones toast o actualizaciones de contenido dinámico.                                          | Los usuarios de lectores de pantalla no serán informados de cambios dinámicos (errores de formulario, mensajes toast, finalización de carga). | Spectrum tiene una utilidad de live announcer. Carbon tiene patrones de notificación inline con live regions. | **Crear una utilidad AriaLive** que los componentes puedan usar para anunciar cambios dinámicos. Esfuerzo: M.                                                               |

---

## 5. Mapa de Posición Competitiva

```
                        PREPARACIÓN EMPRESARIAL
                              ALTA
                               │
                    Carbon ◆   │   ◆ Spectrum
                               │
                               │
                   Lion ◆      │        ◆ MD3
                               │
                               │
                        ───────┼─────────────────── EXPERIENCIA
                   BAJA        │              ALTA  DE DESARROLLO
                               │
              Sando ◆          │        ◆ Radix
                               │
                   Shoelace ◆  │   ◆ Chakra
                               │
                               │        ◆ Tailwind
                               │
                              BAJA
```

### Análisis de Posicionamiento

**Sando se sitúa actualmente en el cuadrante inferior izquierdo** — baja preparación empresarial (catálogo de componentes reducido, sin despliegues en producción, mantenedor único) y experiencia de desarrollo moderada (buen TypeScript, pero sin wrappers React, herramientas CLI ni mensajes de error).

**El vecindario competitivo natural de Sando** está junto a Shoelace y Lion — librerías de Web Components basadas en Lit dirigidas a desarrolladores que quieren soluciones agnósticas de framework. Sin embargo, el sistema de temas y la infraestructura de accesibilidad de Sando son arquitectónicamente superiores a ambos.

**El movimiento estratégico** es hacia el noreste — mejorar la DX (wrappers React, CLI, CDN, mejor documentación) al tiempo que se expande el catálogo de componentes hacia las necesidades empresariales. Sando no necesita alcanzar el nivel empresarial de Carbon/Spectrum para v1.0, pero necesita cruzar el umbral de "utilizable para productos reales".

**Posición objetivo para v1.0**: Moverse al centro del mapa — DX competitiva con suficientes componentes y calidad para servir con confianza a equipos de producto de tamaño medio.

---

## 6. Plan de Acción Priorizado

### P0 — Imprescindible para el Lanzamiento a Producción

| #    | Acción                                 | Esfuerzo | Referencia Modelo                                     | Detalles                                                                                                                                                                                                                                                                                                                                            |
| ---- | -------------------------------------- | -------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0-1 | **Entregar 12 componentes esenciales** | XL       | Shoelace (alcance de componentes), Spectrum (calidad) | Orden de prioridad: (1) Dialog/Modal, (2) Toast/Notification, (3) Alert, (4) Tabs, (5) Dropdown Menu, (6) Tooltip, (7) Popover, (8) Accordion, (9) Card, (10) Avatar, (11) Divider, (12) Table. Usar Shoelace como referencia de API — stack tecnológico similar. Cada uno necesita el tratamiento completo de 7 archivos incluyendo tests de a11y. |
| P0-2 | **Entregar wrappers `@sando/react`**   | M        | `@shoelace-style/react` de Shoelace                   | Usar `createComponent()` de `@lit/react` para auto-generar wrappers React desde el Custom Elements Manifest. Entregar como paquete separado. Incluir mapeo de eventos adecuado (patrón onSlChange → onChange). Probar con una app Next.js.                                                                                                          |
| P0-3 | **Documentar la estrategia de SSR**    | M        | Documentación de Lit SSR, guía de SSR de Shoelace     | Como mínimo: documentar qué funciona y qué no con Next.js/Nuxt/Astro/SvelteKit. Idealmente, añadir soporte `@lit-labs/ssr` para DSD. Proporcionar ejemplos de código para cada framework.                                                                                                                                                           |

### P1 — Debería Corregirse para v1.0

| #    | Acción                                                                   | Esfuerzo | Referencia Modelo                             |
| ---- | ------------------------------------------------------------------------ | -------- | --------------------------------------------- |
| P1-1 | Añadir sistema de densidad (compact/comfortable/spacious)                | M        | Documentación de densidad de MD3              |
| P1-2 | Implementar patrones de validación de formularios con resumen de errores | L        | Sistema de formularios de Lion Web Components |
| P1-3 | Añadir monitorización de tamaño de bundle (size-limit)                   | S        | Configuración de size-limit de Carbon         |
| P1-4 | Añadir tests de regresión visual con Playwright                          | M        | Enfoque de testing visual de Shoelace         |
| P1-5 | Construir CLI generador de componentes                                   | S        | `pnpm create-component <name>`                |
| P1-6 | Añadir advertencias de validación de props en modo desarrollo            | M        | Sistema de advertencias de Chakra UI          |
| P1-7 | Añadir bundle CDN con auto-loader                                        | M        | Patrón CDN/auto-loader de Shoelace            |
| P1-8 | Crear librería de tokens en Figma (mínimo)                               | L        | Estructura del kit Figma de Spectrum          |

### P2 — Objetivo para v1.x / v2.0

| #    | Acción                                           | Esfuerzo | Referencia Modelo                        |
| ---- | ------------------------------------------------ | -------- | ---------------------------------------- |
| P2-1 | Tests RTL y soporte de texto bidireccional       | M        | Testing RTL de Carbon                    |
| P2-2 | Diseñar patrón de componentes compuestos         | L        | Modelo de extensión de Lion (nativo WC)  |
| P2-3 | Migrar tokens a formato W3C DTCG                 | M        | Documentación DTCG de Style Dictionary 4 |
| P2-4 | Crear CONTRIBUTING.md y modelo de gobernanza     | S        | Guía de colaboradores de Shoelace        |
| P2-5 | Añadir Lighthouse CI y benchmarks de renderizado | M        | Lighthouse CI de Carbon                  |
| P2-6 | Construir utilidad AriaLive announcer            | M        | Live announcer de Spectrum               |

---

## 7. Matriz de Decisiones

| Carencia                             | Decisión                           | Justificación                                                                                                                                                  | Sistema de Referencia                                |
| ------------------------------------ | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Componentes ausentes (P0-1)          | **Añadir**                         | No se puede lanzar un design system con el que no se puede construir una aplicación real. El catálogo de componentes es el producto.                           | Shoelace (patrones de API de componentes)            |
| Sin wrappers React (P0-2)            | **Añadir**                         | La cuota de mercado de React hace que esto sea innegociable. `@lit/react` lo convierte en bajo esfuerzo.                                                       | `@shoelace-style/react` de Shoelace                  |
| Sin estrategia de SSR (P0-3)         | **Añadir (documentación primero)** | Documentar con honestidad las limitaciones es mejor que el silencio. El soporte DSD puede venir después.                                                       | Lit SSR, documentación de integración con Astro      |
| Sin sistema de densidad (P1-1)       | **Añadir**                         | Las UI con alta densidad de información son un caso de uso frecuente en equipos de producto de tamaño medio.                                                   | Sistema de densidad de MD3                           |
| Sin validación de formularios (P1-2) | **Añadir**                         | Los formularios son la categoría de componentes más fuerte de Sando — no tener patrones de validación debilita esta fortaleza.                                 | Lion Web Components                                  |
| Sin monitorización de bundle (P1-3)  | **Añadir**                         | Victoria rápida que protege las afirmaciones de rendimiento y previene regresiones silenciosas.                                                                | Carbon                                               |
| Sin regresión visual (P1-4)          | **Añadir**                         | 35 archivos de tema hacen que la regresión visual sea de riesgo extremadamente alto sin testing automatizado.                                                  | Shoelace (Playwright)                                |
| Sin CLI de componentes (P1-5)        | **Añadir**                         | Victoria rápida que acelera el impulso de componentes P0-1 y mejora el onboarding de colaboradores.                                                            | Personalizado (script Node sencillo)                 |
| Sin advertencias en modo dev (P1-6)  | **Añadir**                         | Poco esfuerzo, gran mejora de DX. Crítico para la adopción por equipos sin experiencia en design systems.                                                      | Chakra UI                                            |
| Sin distribución CDN (P1-7)          | **Añadir**                         | Web Components + CDN es una combinación natural y una ventaja única frente a sistemas solo React.                                                              | Shoelace                                             |
| Sin integración con Figma (P1-8)     | **Añadir (tokens primero)**        | La adopción por diseñadores requiere una librería de Figma. Empezar con sincronización de tokens, expandir al kit de componentes.                              | Spectrum, Tokens Studio                              |
| Sin tests RTL (P2-1)                 | **Aplazar a v1.x**                 | El mandato de propiedades lógicas es una buena base. Los tests RTL completos pueden venir después.                                                             | Carbon                                               |
| Sin patrón compuesto (P2-2)          | **Aplazar a v1.x**                 | Requiere decisión arquitectónica. El patrón monolítico actual funciona para los componentes de v1.0.                                                           | Lion, Radix (conceptualmente)                        |
| Sin formato DTCG (P2-3)              | **Aplazar a v1.x**                 | El formato actual funciona. El estándar DTCG aún está evolucionando. Migrar cuando se estabilice más.                                                          | Style Dictionary 4                                   |
| Mantenedor único (P2-4)              | **Modificar (añadir gobernanza)**  | CONTRIBUTING.md y ADRs son pasos de bajo esfuerzo hacia la sostenibilidad.                                                                                     | Shoelace                                             |
| Sin benchmarks de rendimiento (P2-5) | **Aplazar a v1.x**                 | No bloquea el uso en producción. Importante para la credibilidad a medida que crece la adopción.                                                               | Carbon                                               |
| Sin utilidad AriaLive (P2-6)         | **Añadir (con Toast/Alert)**       | Se construye naturalmente junto a los componentes Toast y Alert (P0-1).                                                                                        | Spectrum                                             |
| Arquitectura de tokens de tres capas | **Mantener**                       | Innovación genuina. Las fronteras impuestas por tests son líderes en la industria.                                                                             | —                                                    |
| Sistema de flavors multimodo         | **Mantener y Promocionar**         | Temas best-in-class. Diferenciador principal para marketing.                                                                                                   | —                                                    |
| FlavorableMixin                      | **Mantener**                       | Recorrido sofisticado de Shadow DOM. Documentar casos límite.                                                                                                  | —                                                    |
| Sistema de color OKLCH               | **Mantener**                       | En la frontera con MD3 y Tailwind v4. Elección a prueba de futuro.                                                                                             | —                                                    |
| Sistema de composición skeleton      | **Mantener y Promocionar**         | Único en el mercado. Demuestra la filosofía curada.                                                                                                            | —                                                    |
| Metáfora del sándwich                | **Mantener**                       | Memorable, precisa, diferenciadora. No diluir.                                                                                                                 | —                                                    |
| Patrón de componente de 7 archivos   | **Mantener**                       | Bueno para la consistencia. Validar que escala con componentes complejos (dialog, table).                                                                      | —                                                    |
| Mandato de Shadow DOM                | **Mantener**                       | Decisión arquitectónica correcta para un design system. La encapsulación merece la complejidad de SSR.                                                         | —                                                    |
| Filosofía "Curado, No Personalizado" | **Mantener**                       | El foso estratégico de Sando. 8 flavors curados > configuración infinita. Apostar por ello.                                                                    | —                                                    |
| Fuentes del sistema                  | **Modificar**                      | Buen valor por defecto, pero añadir una escapatoria documentada para fuentes de marca. Mostrar cómo sobreescribir vía tokens sin romper la escala tipográfica. | Carbon (patrón de sobreescritura de token de fuente) |

---

## Valoración Final

**Sando es arquitectónicamente uno de los design systems más reflexivos que he analizado en fase pre-release.** El sistema de tokens de tres capas con imposición por tests, el sistema de temas multimodo integral, la ciencia del color OKLCH y el sistema de composición skeleton son innovaciones genuinas que los competidores o bien carecen o implementan con menos rigor. La filosofía de los 7 pilares no es branding vacío — se refleja en decisiones de ingeniería reales (archivos de modo forced-colors, tests de contraste en CI, mandato de propiedades lógicas).

**La distancia hasta la preparación para producción es principalmente de amplitud, no de profundidad.** Los cimientos son sólidos, pero no se puede construir una aplicación real solo con elementos de formulario y badges. Los elementos de acción P0 (12 nuevos componentes, wrappers React, documentación de SSR) representan aproximadamente 3-4 meses de trabajo enfocado para un desarrollador en solitario, o 6-8 semanas para un equipo pequeño.

**La oportunidad estratégica es real.** Ninguna otra librería de Web Components basada en Lit combina la sofisticación de temas de Sando con su rigor en accesibilidad. Shoelace tiene más componentes pero un sistema de temas más débil. Lion tiene mejores patrones empresariales de formularios pero menos identidad visual. Spectrum tiene los recursos de Adobe pero está ligado al ecosistema de Adobe. La filosofía "curado, no personalizado" de Sando, su identidad visual cálida y la memorable metáfora del sándwich crean una diferenciación de marca genuina en un espacio dominado por design systems fríos y corporativos.

**Entregar los componentes. Entregar los wrappers React. Contar la historia del sistema de temas a los cuatro vientos. Eso es la v1.0.**
