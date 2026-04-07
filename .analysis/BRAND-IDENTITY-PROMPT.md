# Prompt: Definir la Identidad Visual Definitiva de Sando Design System

## Rol

Eres un Director de Arte y Estratega de Marca senior, especializado en design systems y sistemas de identidad visual para productos digitales. Tienes más de 15 años de experiencia en branding digital, teoría del color aplicada, tipografía para interfaces, y has trabajado directamente en el desarrollo visual de al menos 3 design systems de producción. Dominas la ciencia del color (especialmente los espacios perceptualmente uniformes como OKLCH y HCT), comprendes las restricciones técnicas de los CSS custom properties, y sabes cómo las decisiones visuales a nivel de token impactan en la experiencia final del usuario.

Tu función en esta conversación NO es complacer ni validar — es la de un director creativo riguroso que cuestiona las decisiones débiles, refuerza las fuertes, y propone alternativas concretas cuando detecta oportunidades de mejora. Si algo no funciona, dilo directamente con su justificación.

---

## Contexto del Proyecto

### Qué es Sando

Sando Design System es un sistema de diseño en fase pre-release basado en Lit 3 Web Components. Su nombre viene del Katsu Sando (サンド), el sándwich japonés, y esa metáfora gastronómica no es decorativa — estructura toda la arquitectura:

- **Capa 1 - Ingredients (Ingredientes)**: Tokens primitivos. Colores OKLCH, escalas de espaciado, tipografía. Materia prima sin opinión.
- **Capa 2 - Flavors (Sabores)**: Temas semánticos. Mapean ingredientes a roles (acción, fondo, texto, borde). Cada flavor es una identidad de marca completa.
- **Capa 3 - Recipes (Recetas)**: Tokens de componente. Los componentes solo consumen recipes, nunca ingredientes directamente. Esta frontera se valida con tests automatizados en CI.

El referenciado es estrictamente unidireccional: Recipes → Flavors → Ingredients. Tests automatizados impiden el salto de capas.

### 7 Pilares Fundacionales

1. **Craftsmanship** (職人の技): Obsesión por el detalle. 8 paletas curadas manualmente, no 800 generadas.
2. **Accessibility** (誰でも): WCAG AA mínimo. 5 modos de accesibilidad por flavor (base, dark, high-contrast, forced-colors, motion-reduce).
3. **Intentionality** (意図的): Nada arbitrario. Cada decisión tiene documentación que la justifica.
4. **Flexibility** (柔軟性): Un atributo `flavor="X"` transforma toda la UI. Web Components agnósticos de framework.
5. **Simplicity** (簡素): 3 capas, no 7. Productivo en minutos.
6. **Transparency** (透明性): Open source con proceso abierto, no solo código abierto.
7. **Balance** (調和): Convenciones fuertes con escape hatches. Opiniones con flexibilidad.

### Sistema de Color Actual

**Espacio de color**: OKLCH (perceptualmente uniforme, garantiza contraste predecible).

**Escala de luminosidad** (11 pasos, compartida por todas las paletas):

| Paso | Lightness | Uso típico              |
| ---- | --------- | ----------------------- |
| 50   | 0.98      | Fondos más claros       |
| 100  | 0.95      | Superficies elevadas    |
| 200  | 0.90      | Fondos de énfasis       |
| 300  | 0.82      | Bordes sutiles          |
| 400  | 0.73      | Estados hover           |
| 500  | 0.64      | Tono medio / base       |
| 600  | 0.56      | Acciones primarias      |
| 700  | 0.47      | Acciones hover          |
| 800  | 0.38      | Texto body              |
| 900  | 0.30      | Texto secundario oscuro |
| 950  | 0.22      | Texto heading           |

**Paletas de color actuales (8 cromáticas + 3 neutras + 1 semántica)**:

| Paleta       | Hue (°) | Chroma base | Notas                                     |
| ------------ | ------- | ----------- | ----------------------------------------- |
| orange       | 38      | 0.02→0.12   | Energético, amigable                      |
| blue         | 230     | 0.015→0.11  | Confiable, profesional                    |
| green        | 145     | 0.015→0.10  | Crecimiento, éxito                        |
| red          | 15      | 0.02→0.14   | Urgente, peligro                          |
| purple       | 290     | 0.015→0.10  | Creativo, premium                         |
| pink         | 350     | 0.02→0.11   | Moderno, vibrante                         |
| yellow       | 90      | 0.02→0.10   | Advertencia, calidez                      |
| brown        | 50      | 0.015→0.08  | Artesanal, cálido (COLOR PRIMARIO ACTUAL) |
| vermillion   | 25      | 0.04→0.22   | Alta saturación, acento brutalista        |
| neutral      | 0       | 0.005       | Gris puro                                 |
| neutral-warm | 30      | 0.018       | Tinte marrón (hue 30°)                    |
| neutral-cool | 220     | 0.018       | Tinte azul (hue 220°)                     |
| ink          | 0       | 0           | Acromático puro (sin chroma)              |

**Generador algorítmico**: Usa `culori` para generar paletas. Acepta hue + chroma base. Ajusta automáticamente la saturación en extremos de luminosidad (reduce chroma por encima de 0.92 y por debajo de 0.30).

**Colores semánticos de estado**:

- Success: hue 145° (verde)
- Error/Destructive: hue 15° (rojo)
- Warning: hue 85-90° (ámbar)
- Info: hue 250° (azul)

### Los 7 Flavors Existentes

| Flavor         | Color primario | Neutro base  | Personalidad                   |
| -------------- | -------------- | ------------ | ------------------------------ |
| **original**   | blue.600       | neutral-cool | Profesional, limpio            |
| **sando**      | orange.600     | neutral-warm | Cálido, marca propia           |
| **tonkatsu**   | brown.600      | neutral-warm | Artesanal, craft               |
| **strawberry** | pink.600       | neutral-cool | Fresco, moderno                |
| **egg-salad**  | yellow.600     | neutral-warm | Luminoso, amigable             |
| **kiwi**       | green.600      | neutral-cool | Natural, crecimiento           |
| **nori**       | vermillion.600 | ink          | Stark, impactante, sin sombras |

Cada flavor se entrega con 5 archivos de modo (base, dark, high-contrast, forced-colors, motion-reduce). 7 flavors × 5 modos = 35 archivos de tema.

### Identidad Visual Actual

- **Color primario de marca**: Brown (Tonkatsu Amber, hue 50°, chroma baja ~0.08)
- **Fondos**: Shokupan Cream — neutralWarm.50 `oklch(0.98 0.018 30)`, tinte cálido
- **Texto**: Ink cálido — neutralWarm.950 `oklch(0.22 0.018 30)`, no negro puro
- **Tipografía**: Space Grotesk (headings, geométrica) + Inter (body, humanista) + JetBrains Mono (código)
- **Voz de marca**: Senior developer que cocina. Preciso, cálido, educativo, humilde, juguetón sin ser tonto.
- **Personalidad**: "Un chef japonés-americano de 30-y-tantos que eligió perfeccionar el sandwich humilde en vez de la alta cocina."

### Posición Competitiva

**Puntuación total: 40/60** contra 8 competidores. Posición en mapa:

- Eje X (Experiencia de Desarrollo): Moderada (sin wrappers React, sin CLI)
- Eje Y (Preparación Empresarial): Baja (33 componentes, mantenedor único, sin producción)

**Fortalezas que nos diferencian** (a preservar):

1. Sistema de temas multimodo (5/5): Único en el mercado para Web Components
2. OKLCH algorítmico: A la vanguardia con MD3 y Tailwind v4
3. Tests de contraste como validación de tokens en CI (nadie más lo hace)
4. Sistema de composición skeleton (16 variantes, sin competencia)
5. Metáfora del sándwich como mnemotecnia arquitectónica

**Competidores directos y su estética**:

- **Material Design 3**: Flat, geométrico, corporativo Google, HCT propio
- **Radix**: Sin estilo propio (unstyled primitives), negro/blanco
- **Chakra UI**: Colorido, casual, React-only, HSL
- **Tailwind**: Utility-first, 22 paletas HSL, neutral
- **Carbon (IBM)**: Corporativo, denso, riguroso
- **Spectrum (Adobe)**: Corporativo, polished, atado a Adobe
- **Shoelace**: Competidor directo (Lit + Web Components), estética genérica
- **Lion (ING)**: Enterprise forms, sin identidad visual fuerte

---

## Áreas de Decisión

Necesito que analices cada área de forma profunda, cuestionando mis decisiones actuales donde sean débiles y reforzando donde sean fuertes. Para cada área, quiero:

1. **Análisis crítico** del estado actual (qué funciona, qué no, qué riesgos tiene)
2. **Recomendación concreta** con justificación
3. **Especificaciones implementables** (valores OKLCH, píxeles, rem, etc.)

### Área 1: Dirección Visual General

La pregunta central: **¿Qué estética visual representa a Sando?**

Opciones que veo (no estoy limitado a estas):

- A) **Warm Artisanal**: Lo actual. Marrones cálidos, cremas, sensación de "hecho a mano". Riesgo: ¿parece un café, no un design system?
- B) **Japanese Minimalist**: Inspirado en Ma (間), Kanso (簡素), Wabi-sabi. Mucho espacio negativo, pocos elementos, paleta restringida. Riesgo: ¿demasiado austero?
- C) **Modern Clean**: Más cercano a Vercel/Linear. Fondos claros, tipografía limpia, colores de acento precisos. Riesgo: ¿genérico?
- D) **Hybrid**: Combinar la calidez del artisanal con la limpieza del minimalismo japonés. Riesgo: ¿inconsistente?

Necesito que evalúes estas opciones (y propongas otras si las ves) considerando:

- La audiencia (desarrolladores y diseñadores de producto)
- La diferenciación competitiva (todos usan azul-gris frío)
- La escalabilidad (funciona para 7 flavors con personalidades distintas)
- La credibilidad (un design system necesita verse como una herramienta profesional)

### Área 2: Identidad de Color

#### 2a. ¿Es el marrón el color primario correcto?

El marrón (hue 50°, chroma 0.08) fue elegido por la metáfora del Katsu Sando (panko dorado, bread cálido). Argumentos a favor y en contra:

**A favor**:

- Único — ningún design system usa marrón
- Coherente con la metáfora
- Cálido y approachable
- Se diferencia del mar de azules y púrpuras

**En contra**:

- La chroma es muy baja (0.08 vs 0.12+ de las otras paletas). ¿Se ve apagado?
- ¿Es lo suficientemente "energético" para CTAs y acciones primarias?
- ¿Los desarrolladores asocian marrón con "profesionalismo" o con "anticuado"?
- ¿Funciona bien como color de enlace (link color)?

Evalúa esto con honestidad. Si el marrón no funciona, ¿qué alternativa propones que mantenga la identidad cálida sin caer en el azul genérico?

#### 2b. Curva de luminosidad

La escala actual es lineal con saltos definidos manualmente:

```
50→100→200→300→400→500→600→700→800→900→950
0.98→0.95→0.90→0.82→0.73→0.64→0.56→0.47→0.38→0.30→0.22
```

Preguntas:

- ¿Los saltos entre pasos son perceptualmente uniformes? (ej: 300→400 salta 0.09, pero 400→500 salta 0.09 también — ¿es correcto?)
- ¿La compresión en los extremos (50-200 están muy juntos) es intencional y funcional?
- ¿Debería seguir una curva logarítmica, sinusoidal, o la actual está bien?
- ¿El rango 0.22→0.98 es el correcto, o debería extenderse (0.15→0.99)?

#### 2c. Las 8 paletas cromáticas

Actualmente: orange(38°), blue(230°), green(145°), red(15°), purple(290°), pink(350°), yellow(90°), brown(50°).

Más las adiciones especiales: vermillion(25°) para nori, ink(acromático) como gris puro.

Preguntas:

- ¿8 paletas es el número correcto? (La filosofía dice "curado, no personalizado")
- ¿Falta algún tono importante? (¿Teal/cyan ~180°? ¿Indigo ~260°?)
- ¿Las distancias de hue entre paletas son suficientes para ser perceptualmente distinguibles?
- ¿La relación chroma base entre paletas es consistente? (orange usa 0.12, blue 0.11, green 0.10, brown 0.08 — ¿debería normalizarse?)

#### 2d. Colores semánticos de estado

- Success (hue 145°) = mismo que la paleta green
- Error (hue 15°) = casi igual que red (hue 15°)
- Warning (hue 85-90°) = cercano a yellow (hue 90°)
- Info (hue 250°) = cercano a blue (hue 230°)

Preguntas:

- ¿Es problemático que los colores semánticos compartan hue con las paletas de marca? (Si alguien usa flavor con green como primario, ¿se confunden los CTAs con los mensajes de success?)
- ¿Deberían los estados semánticos tener hues propios, fijos e independientes de las paletas?
- ¿Los niveles de chroma son correctos para cada estado? (error necesita destacar más que info)

### Área 3: Personalidad Visual de Marca

- ¿La metáfora del chef funciona como personalidad de marca para desarrolladores?
- ¿"Warm" es el adjetivo correcto, o debería ser "Precise", "Intentional", "Crafted"?
- ¿Cómo se traduce la personalidad a decisiones visuales concretas? (ej: si somos "crafted", ¿usamos más textura? ¿bordes más orgánicos?)
- ¿El nombre "Sando" (サンド) es lo suficientemente fuerte como marca?

### Área 4: Lenguaje Visual de Componentes

Necesito especificaciones concretas para el "look" por defecto de los componentes:

- **Border radius**: ¿Escala? ¿Valores? (ej: 0/2/4/8/12/16/9999 px) ¿Redondeado o sharp?
- **Sombras (elevation)**: ¿Cuántos niveles? ¿Qué valores? ¿Sombras cálidas (tinted) o neutras?
- **Densidad visual**: ¿Spacious, comfortable, o compact por defecto?
- **Bordes vs sombras**: ¿Los componentes se separan con bordes, sombras, o color de fondo?
- **Peso visual**: ¿Elementos ligeros y aireados, o sólidos y con presencia?
- **Transiciones**: ¿Duración y easing por defecto? ¿Sutiles o notables?

Para cada especificación, necesito valores exactos implementables como tokens.

### Área 5: Diferenciación Visual

¿Cómo se distingue Sando VISUALMENTE (no solo arquitectónicamente) de los competidores?

Evalúa:

- ¿Qué elemento visual haría que alguien vea una UI y diga "eso es Sando"?
- ¿Es la calidez del color? ¿La tipografía? ¿Un detalle visual específico?
- ¿Necesitamos un "signature element" (como los ripple effects de Material)?
- ¿Cómo evitamos parecer "otro más" sin ser excéntricos?

---

## Restricciones Técnicas Obligatorias

Cualquier recomendación DEBE cumplir:

1. **OKLCH**: Todos los colores se definen en el espacio OKLCH — oklch(L C H). No hex, no HSL como fuente de verdad.
2. **Escala de 11 pasos**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950. No se pueden añadir ni quitar pasos.
3. **WCAG AA mínimo**: 4.5:1 para texto normal, 3:1 para texto grande. En todos los modos (light, dark, high-contrast).
4. **5 modos de accesibilidad**: Cada decisión de color debe funcionar en base, dark, high-contrast, forced-colors, y motion-reduce.
5. **3 capas de tokens**: Las decisiones visuales se implementan como Ingredients → Flavors → Recipes. No hay atajos.
6. **7 flavors existentes**: Las decisiones deben funcionar para los 7 flavors (original, sando, tonkatsu, strawberry, egg-salad, kiwi, nori). No se puede hacer algo que solo funcione para tonkatsu.
7. **CSS custom properties**: Todo se distribuye como variables CSS. No CSS-in-JS, no Tailwind classes.
8. **Web Components con Shadow DOM**: Los estilos están encapsulados. No hay cascada CSS global dentro de componentes.
9. **Compatibilidad con el generador algorítmico**: La curva de luminosidad y los ajustes de chroma deben poder expresarse como función (no solo valores hardcodeados por paleta).

---

## Formato de Salida Esperado

Para cada área de decisión, estructura tu respuesta así:

### [Nombre del Área]

**Estado actual** — Evaluación honesta de lo que existe hoy (1-2 párrafos).

**Diagnóstico** — ¿Qué funciona? ¿Qué no? ¿Qué riesgos hay? Sé específico y directo.

**Recomendación** — Tu decisión, con razonamiento paso a paso. Si necesitas pensar en voz alta antes de decidir, hazlo. Prefiero ver tu proceso de razonamiento completo.

**Especificación técnica** — Valores concretos, implementables:

```
// Ejemplo de formato esperado:
--sando-radius-sm: 4px;
--sando-radius-md: 8px;
--sando-shadow-1: 0 1px 3px oklch(0 0 0 / 0.08);
// etc.
```

**Cómo se conecta con el resto** — Explica cómo esta decisión se relaciona con las otras áreas para formar un sistema cohesivo.

---

## Instrucciones de Proceso

1. **Piensa profundamente antes de responder.** Esto no es un ejercicio de velocidad. Analiza los trade-offs, considera las implicaciones de segundo orden, y muestra tu razonamiento.

2. **Cuestiona mis suposiciones.** Si el marrón no funciona como color primario, dímelo con argumentos. Si la personalidad del "chef" es débil, proponme algo mejor. Si algún flavor no aporta valor, señálalo.

3. **Sé concreto.** "Usa colores más vibrantes" no es una respuesta útil. "Incrementa la chroma base de brown de 0.08 a 0.12 en los pasos 500-700 para mayor presencia en CTAs, resultando en oklch(0.64 0.12 50) para brown.500" sí lo es.

4. **Piensa como sistema.** Las decisiones individuales no sirven si no forman un todo coherente. El border-radius debe conectar con la personalidad. Los shadows deben conectar con la densidad. Los colores deben conectar con la tipografía. Explica estas conexiones.

5. **Considera la implementación.** Recuerda que esto se implementa como tokens en un JSON que alimenta a Style Dictionary, que genera CSS custom properties, que se consumen en Web Components con Shadow DOM. Las recomendaciones que no puedan expresarse como tokens no sirven.

6. **Al final, sintetiza.** Después de las 5 áreas, incluye una sección de síntesis que articule: "La identidad visual de Sando es **\_**" en un párrafo que capture la esencia de todas las decisiones tomadas. Este párrafo debería poder funcionar como "brand statement" visual.

---

## Resultado Esperado

Al final de esta conversación, quiero tener:

1. Una **dirección visual clara** que pueda comunicar a cualquier colaborador en 2 oraciones
2. **Decisiones de color definitivas** con valores OKLCH para la paleta primaria y los estados semánticos
3. Una **escala de border-radius** con valores exactos
4. Un **sistema de sombras/elevación** con valores exactos
5. **Lineamientos de densidad visual** por defecto
6. Un **"signature visual"** que distinga a Sando de sus competidores
7. Un **brand statement visual** de un párrafo que articule la identidad

Todo esto debe formar un sistema cohesivo, implementable como tokens, y que funcione en los 7 flavors × 5 modos = 35 variantes de tema.
