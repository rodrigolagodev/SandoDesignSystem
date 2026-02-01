---
name: prompt-engineer
description: >-
  Optimizes and improves prompts for developers working with LLMs. Analyzes existing prompts,
  identifies weaknesses, structures loose ideas, and applies professional prompting techniques
  to maximize results. Use PROACTIVELY when facing complex tasks where optimizing the prompt
  would improve outcomes.

  <example>
  User: "Quiero desarrollar este proyecto pero tengo ideas sueltas, genera un prompt basándote en las siguientes ideas y conceptos."
  Assistant: "I'll use the prompt-engineer skill to help structure your ideas into a clear, effective prompt."
  </example>

  <example>
  User: "This prompt isn't working well, can you improve it?"
  Assistant: "I'll use the prompt-engineer skill to analyze and optimize your prompt."
  </example>

license: MIT
compatibility: agent-skills-standard
metadata:
  category: prompt-engineering
  version: "1.0.0"
  author: "Rodrigo Lago"
  tags: [prompts, optimization, llm, prompt-engineering, best-practices]
---

# Prompt Engineer

Expert system for analyzing, optimizing, and improving prompts to maximize LLM performance. Transforms vague ideas into clear, structured instructions that produce better results.

## Core Principles

### Context & Comprehension

1. **Context is King** - More context = better results. Always gather sufficient context before optimizing.
2. **Optimized for LLMs** - Format prompts for maximum model comprehension.
3. **Token Efficiency** - Consume fewer tokens without sacrificing quality.

### Structure & Organization

4. **Hierarchical Structure** - Organize from general to specific.
5. **Clear Sections** - Use separators, headers, bullets to organize.
6. **One Objective per Prompt** - Avoid prompts that ask for too many things.

### Clarity & Instructions

7. **Explicit Instructions** - Say exactly what to do, don't assume.
8. **Avoid Ambiguity** - Precise words, no double interpretation.
9. **Define the Output** - Specify expected response format.

### Advanced Techniques

10. **Examples Guide Better than Rules** - Few-shot > long instructions.
11. **Role/Persona Improves Quality** - Assign expertise to the model.
12. **Chain-of-Thought for Complexity** - Request step-by-step reasoning for complex tasks.

## When to Use

**Activate this skill when:**

- User asks to improve or optimize a prompt
- User wants to structure or organize instructions better
- User has loose ideas that need to become a clear prompt
- Proactively when facing complex tasks where prompt optimization would improve results

**Do NOT use for:**

- Executing prompts (only process and optimize)
- Generating content described in the prompt
- Replacing user's content or context
- Changing user's ideas or concepts without asking

## Workflow

```
┌─────────────────────────────────────────┐
│  1. USER PROVIDES PROMPT                │
│     Receive prompt or loose ideas       │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  2. ANALYZE                             │
│     • Identify weaknesses               │
│     • Find gaps in context              │
│     • Detect ambiguities                │
│     • Assess structure                  │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  3. ASK CONTEXT QUESTIONS               │
│     Fill gaps to understand:            │
│     • What is the prompt about?         │
│     • What result is expected?          │
│     • Who/what is the target?           │
│     • Any constraints or preferences?   │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  4. OPTIMIZE                            │
│     Apply best practices:               │
│     • Add context                       │
│     • Structure hierarchically          │
│     • Make instructions explicit        │
│     • Define expected output            │
│     • Apply advanced techniques         │
│     • Optimize token usage              │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  5. PRESENT RESULT                      │
│     Show the optimized prompt           │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│  6. OFFER OPTIONS                       │
│     • Explanation of changes?           │
│     • Before/after comparison?          │
│     • Save to .md file?                 │
│     • Further refinements?              │
└─────────────────────────────────────────┘
```

## Analysis Checklist

When analyzing a prompt, check for:

### Context Issues

- [ ] Missing background information
- [ ] Unclear purpose or goal
- [ ] No target audience defined
- [ ] Missing constraints or requirements

### Structure Issues

- [ ] Wall of text (no formatting)
- [ ] Multiple objectives mixed together
- [ ] No clear sections or organization
- [ ] Information in wrong order

### Clarity Issues

- [ ] Vague or ambiguous terms
- [ ] Assumptions not stated
- [ ] Output format not specified
- [ ] Missing examples

### Efficiency Issues

- [ ] Redundant information
- [ ] Overly verbose explanations
- [ ] Could use examples instead of rules
- [ ] Unnecessary repetition

## Optimization Techniques

### Basic Techniques

**1. Add Context**

```
Before: "Write code"
After:  "Write a Python function that validates email addresses
        using regex. Return True for valid, False for invalid."
```

**2. Structure with Sections**

```
Before: "I need a blog post about AI that talks about benefits
        and risks and is for beginners and around 500 words"

After:  "Write a blog post about AI.

        Audience: Beginners (no technical background)
        Length: ~500 words

        Sections:
        1. What is AI (simple definition)
        2. Benefits (3 key points)
        3. Risks (3 key points)
        4. Conclusion"
```

**3. Define Output Format**

```
Before: "Analyze this data"
After:  "Analyze this data and provide:

        1. Summary (2-3 sentences)
        2. Key findings (bullet points)
        3. Recommendations (numbered list)

        Format as markdown."
```

### Advanced Techniques

**4. Role/Persona Assignment**

```
"You are a senior security engineer with 10 years of experience.
Review this code for vulnerabilities..."
```

**5. Few-Shot Examples**

```
"Convert natural language to SQL.

Example 1:
Input: 'Show all users from California'
Output: SELECT * FROM users WHERE state = 'CA';

Example 2:
Input: 'Count orders over $100'
Output: SELECT COUNT(*) FROM orders WHERE total > 100;

Now convert:
Input: 'Find top 5 products by revenue'"
```

**6. Chain-of-Thought**

```
"Solve this problem step by step:

1. First, identify the variables
2. Then, set up the equation
3. Show your work for each step
4. Verify your answer
5. State the final result"
```

**7. Constraints & Boundaries**

```
"Write a product description.

DO:
- Use active voice
- Include 3 key benefits
- End with call-to-action

DON'T:
- Use jargon
- Exceed 150 words
- Make unverifiable claims"
```

## Language Support

This skill works with prompts in **English** and **Spanish**.

- Detect input language automatically
- Optimize in the same language as input
- Apply same principles regardless of language

## Output Options

After presenting the optimized prompt, offer:

1. **Explanation** - "¿Quieres que explique los cambios realizados?"
2. **Comparison** - "¿Te muestro el antes y después lado a lado?"
3. **Save to file** - "¿Guardamos el prompt en un archivo .md?"
4. **Iterate** - "¿Quieres ajustar algo del prompt?"

## Examples

### Example 1: Vague to Specific

**User provides:**

```
write code for a website
```

**After context questions:**

- What kind of website? → Portfolio
- What technology? → React
- What features? → About, Projects, Contact

**Optimized prompt:**

```
Create a personal portfolio website using React.

## Requirements
- Single page application with smooth scrolling
- Responsive design (mobile-first)

## Sections
1. Hero - Name, title, brief intro
2. About - Professional background (2-3 paragraphs)
3. Projects - Grid of 6 project cards with:
   - Screenshot
   - Title
   - Tech stack tags
   - GitHub + Live demo links
4. Contact - Email form (name, email, message)

## Tech Stack
- React 18
- Tailwind CSS
- Framer Motion for animations

## Deliverables
- Component structure
- Clean, commented code
- Instructions to run locally
```

### Example 2: Ideas to Structured Prompt

**User provides:**

```
tengo que hacer una app de tareas, algo simple, que se puedan agregar
y borrar y marcar como hechas, para el celular
```

**Optimized prompt:**

```
Desarrolla una aplicación móvil de gestión de tareas (To-Do List).

## Funcionalidades Core
1. **Agregar tarea** - Campo de texto + botón agregar
2. **Eliminar tarea** - Swipe o botón de borrar
3. **Marcar completada** - Checkbox o tap para tachar
4. **Persistencia** - Guardar tareas localmente

## UI/UX
- Diseño minimalista y limpio
- Lista principal con tareas pendientes
- Sección separada para completadas (opcional)
- Feedback visual al completar (animación)

## Plataforma
- Mobile-first (iOS y Android)
- Framework sugerido: React Native o Flutter

## Entregables
1. Estructura de componentes
2. Código funcional
3. Instrucciones de instalación

Empezar con la versión más simple que funcione.
```

## Capabilities

| Capability    | Description                                        |
| ------------- | -------------------------------------------------- |
| **Analyze**   | Identify weaknesses, gaps, and optimization points |
| **Structure** | Transform loose ideas into organized prompts       |
| **Optimize**  | Apply professional prompting techniques            |
| **Format**    | Reduce tokens while improving comprehension        |
| **Bilingual** | Work with English and Spanish prompts              |
| **Save**      | Export optimized prompts to .md files              |

## Limitations

| What I DON'T do    | Why                                            |
| ------------------ | ---------------------------------------------- |
| Execute prompts    | I only optimize, not execute                   |
| Generate content   | I create the prompt, not what it produces      |
| Replace your ideas | I enhance, not replace - I ask if unclear      |
| Change concepts    | Your vision stays intact, I improve expression |

## References

For detailed prompting techniques, see:

| Document                                                            | Topics                                         |
| ------------------------------------------------------------------- | ---------------------------------------------- |
| [prompting-techniques.md](references/prompting-techniques.md)       | Overview and quick reference                   |
| [foundational-techniques.md](references/foundational-techniques.md) | Context, Role, Instructions, Output, Structure |
| [advanced-techniques.md](references/advanced-techniques.md)         | Few-shot, CoT, Constraints, Refinement         |
| [optimization-patterns.md](references/optimization-patterns.md)     | RISEN, CRAFT, Token efficiency                 |

## Workflows

| Workflow                                           | When to Use                   |
| -------------------------------------------------- | ----------------------------- |
| [analyze-prompt.md](workflows/analyze-prompt.md)   | Optimize an existing prompt   |
| [structure-ideas.md](workflows/structure-ideas.md) | Transform ideas into a prompt |

## Templates

| Template                                             | Best For                                      |
| ---------------------------------------------------- | --------------------------------------------- |
| [code-task.md](templates/code-task.md)               | Code generation, refactoring, technical tasks |
| [content-creation.md](templates/content-creation.md) | Writing, marketing, documentation (CRAFT)     |
| [analysis-task.md](templates/analysis-task.md)       | Reviews, research, evaluation (RISEN)         |

## Quick Commands

Common ways to invoke this skill:

- "Mejora este prompt: [prompt]"
- "Tengo estas ideas, crea un prompt: [ideas]"
- "Optimize this prompt: [prompt]"
- "Structure these requirements into a prompt: [requirements]"
- "This prompt isn't working, help me fix it: [prompt]"

---

**Remember:** A great prompt is clear, contextual, and structured. When in doubt, add more context and be more specific.
