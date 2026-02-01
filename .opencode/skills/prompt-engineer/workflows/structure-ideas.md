# Workflow: Structure Ideas into a Prompt

Step-by-step guide to transform loose ideas, requirements, or concepts into a well-structured prompt.

---

## When to Use

- User says "I have these ideas, create a prompt"
- User provides unorganized requirements
- User needs help articulating what they want from an LLM

---

## Phase 1: Gather Raw Input

### Step 1.1: Receive the Ideas

Let the user brain-dump:

```
Share all your ideas, requirements, and concepts - don't worry about
organization. I'll help you structure them into a clear prompt.
```

### Step 1.2: Capture Everything

As user shares, note:

- **Goals**: What do they want to achieve?
- **Requirements**: What must the output have?
- **Constraints**: What should be avoided?
- **Context**: Background information
- **Examples**: Any references or samples?
- **Format**: How should output look?

---

## Phase 2: Clarify and Complete

### Step 2.1: Identify Missing Pieces

Check if you have:

| Element          | Have it? | If missing, ask:                    |
| ---------------- | -------- | ----------------------------------- |
| **Goal**         | □        | "What's the main objective?"        |
| **Audience**     | □        | "Who will use/see the output?"      |
| **Context**      | □        | "What background info is relevant?" |
| **Requirements** | □        | "What must be included?"            |
| **Constraints**  | □        | "What should be avoided?"           |
| **Format**       | □        | "How should the output look?"       |
| **Quality bar**  | □        | "What does 'good' look like?"       |

### Step 2.2: Ask Focused Questions

Ask only 2-3 most important questions:

```
Before I structure your prompt, I need to clarify:

1. [Most important question]
2. [Second question]
3. [Third question if needed]
```

### Step 2.3: Confirm Understanding

```
Let me make sure I understand:
- Goal: [summarize]
- Key requirements: [list]
- Must avoid: [constraints]

Anything to add or correct?
```

---

## Phase 3: Choose Framework

### Step 3.1: Match Task to Framework

| Task Type         | Best Framework                  |
| ----------------- | ------------------------------- |
| Content creation  | CRAFT                           |
| Analysis/research | RISEN                           |
| Simple task       | Context + Instructions + Format |
| Complex process   | Step-by-step structure          |
| Pattern-based     | Few-shot examples               |

### Step 3.2: Select Structure

**For CRAFT (content):**

```
CONTEXT: [background]
ROLE: [persona]
ACTION: [what to do]
FORMAT: [output structure]
TARGET: [audience]
```

**For RISEN (analysis):**

```
ROLE: [persona]
INSTRUCTIONS: [task]
STEPS: [process]
EXPECTATIONS: [quality]
NARROWING: [constraints]
```

**For Simple tasks:**

```
## Context
[background]

## Task
[what to do]

## Requirements
[must-haves]

## Output Format
[structure]
```

---

## Phase 4: Assemble the Prompt

### Step 4.1: Order the Elements

Optimal order:

1. Context/Background
2. Role (if using persona)
3. Main task/objective
4. Requirements (what to include)
5. Constraints (what to avoid)
6. Format specification
7. Examples (if pattern-based)

### Step 4.2: Write Each Section

Apply these principles:

- **Be specific**: Replace vague terms with concrete ones
- **Use bullets**: Easier to parse than paragraphs
- **One idea per point**: Don't bundle multiple things
- **Active voice**: "Write X" not "X should be written"

### Step 4.3: Add Polish

- Verify no contradictions
- Check for redundancy
- Ensure logical flow
- Confirm output format is clear

---

## Phase 5: Present and Refine

### Step 5.1: Show the Prompt

```
## Your Structured Prompt

[The complete prompt]
```

### Step 5.2: Highlight Structure

```
## How It's Organized

1. **Context section**: Sets the background
2. **Task section**: Defines the objective
3. **Requirements**: Lists must-haves
4. **Format**: Specifies output structure
```

### Step 5.3: Offer Next Steps

```
Would you like me to:
1. Adjust any section?
2. Add more examples?
3. Make it more/less detailed?
4. Save to a .md file?
5. Test it now?
```

---

## Phase 6: Iterate if Needed

### Common Adjustments

| Request           | Action                                   |
| ----------------- | ---------------------------------------- |
| "More detailed"   | Expand requirements, add examples        |
| "Simpler"         | Remove optional elements, merge sections |
| "Different focus" | Reorder priorities, adjust emphasis      |
| "Add examples"    | Include 2-3 input/output pairs           |

---

## Example: Ideas to Prompt

### User's Raw Ideas:

```
quiero hacer una landing page para mi producto saas,
algo moderno, con hero section, features, pricing,
que convierta bien, para desarrolladores
```

### Resulting Prompt:

```
## Context
Building a landing page for a SaaS product targeted at developers.
The goal is high conversion (sign-ups/trials).

## Task
Design and code a modern landing page with these sections.

## Sections Required
1. **Hero**: Headline, subheadline, CTA button, product screenshot
2. **Features**: 3-4 key features with icons and descriptions
3. **Pricing**: 3 tiers (Free, Pro, Enterprise) with feature comparison
4. **Social Proof**: Testimonials or logos of companies using it
5. **CTA**: Final call-to-action with email capture

## Design Requirements
- Modern, clean aesthetic
- Developer-friendly tone (can use technical terms)
- Dark mode as primary theme
- Responsive (mobile-first)

## Tech Stack
- Next.js 14
- Tailwind CSS
- Framer Motion for animations

## Deliverables
- Component structure
- Full code for each section
- Responsive breakpoints
```

---

_See [../SKILL.md](../SKILL.md) for core principles_
_See [../references/prompting-techniques.md](../references/prompting-techniques.md) for technique details_
