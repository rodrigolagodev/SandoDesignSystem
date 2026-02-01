# Advanced Prompting Techniques

Advanced patterns for complex tasks, reasoning, and iterative refinement.

---

## 8. Few-Shot Learning

**What:** Provide examples of input-output pairs before your actual request.

**Why:** Shows the pattern you want; more effective than lengthy explanations.

**Pattern:**
```
[TASK DESCRIPTION]

Example 1:
Input: [example input 1]
Output: [example output 1]

Example 2:
Input: [example input 2]
Output: [example output 2]

Now process:
Input: [actual input]
Output:
```

**Example:**
```
Convert these feature requests into user stories.

Example 1:
Input: "Users should be able to reset their password"
Output: "As a user, I want to reset my password so that I can regain access to my account if I forget it."

Example 2:
Input: "Add dark mode"
Output: "As a user, I want to switch to dark mode so that I can use the app comfortably in low-light environments."

Now convert:
Input: "Allow exporting data to CSV"
Output:
```

### When to Use Few-Shot

| Scenario | Recommendation |
|----------|----------------|
| Format is unusual | 2-3 examples |
| Task is ambiguous | 1-2 examples |
| Pattern recognition | 3+ examples |
| Simple, clear task | Zero-shot (no examples) |

---

## 9. Chain-of-Thought (CoT)

**What:** Ask the LLM to show its reasoning step by step.

**Why:** Improves accuracy on complex tasks; catches errors in logic.

### Simple CoT
```
Solve this problem step by step, showing your reasoning:
[PROBLEM]
```

### Structured CoT
```
Analyze this situation using the following steps:

1. **Identify**: What are the key elements?
2. **Analyze**: What relationships or patterns exist?
3. **Evaluate**: What are the pros and cons?
4. **Conclude**: What is your recommendation?

Situation: [SITUATION]
```

### Zero-Shot CoT
```
[PROBLEM]

Let's think through this step by step.
```

### Tree of Thoughts

For complex problems, explore multiple reasoning branches:
```
Consider this problem from 3 different perspectives:

Perspective A: [approach 1]
Perspective B: [approach 2]  
Perspective C: [approach 3]

Evaluate which perspective leads to the best solution.
```

---

## 10. Self-Consistency

**What:** Generate multiple reasoning paths and select the most consistent answer.

**Why:** Reduces errors by cross-validating different approaches.

**Pattern:**
```
Solve this problem using three different approaches, then determine 
which answer is most likely correct:

Problem: [PROBLEM]

Approach 1: [Method A]
Approach 2: [Method B]  
Approach 3: [Method C]

Final answer (most consistent):
```

---

## 11. Constraint Specification

**What:** Explicitly state what the LLM should and shouldn't do.

**Why:** Prevents unwanted behaviors; keeps responses focused.

**Pattern:**
```
[TASK]

DO:
- [Desired behavior 1]
- [Desired behavior 2]

DON'T:
- [Undesired behavior 1]
- [Undesired behavior 2]

IMPORTANT:
- [Critical constraint]
```

**Example:**
```
Write a product description for wireless headphones.

DO:
- Highlight 3 key features
- Use sensory language
- Include a call-to-action
- Keep under 150 words

DON'T:
- Make claims about being "#1" or "best"
- Use technical jargon
- Mention competitors
- Include pricing

IMPORTANT:
- Tone should be enthusiastic but not over-the-top
```

---

## 12. Iterative Refinement

**What:** Build complex prompts through multiple iterations.

**Why:** Allows for correction and improvement; handles complexity incrementally.

**Pattern:**
```
Step 1: [Initial request]
Step 2: "Now improve X aspect"
Step 3: "Adjust Y while keeping Z"
Step 4: "Final polish on W"
```

### Refinement Commands

Use these follow-up prompts:
- "Make it more concise"
- "Add more technical detail"
- "Simplify for a non-technical audience"
- "Restructure as bullet points"
- "Add examples for each point"
- "Remove the introduction, keep only the key points"

---

## 13. Meta-Prompting

**What:** Ask the LLM to help you create better prompts.

**Why:** Leverages LLM's understanding of its own capabilities.

**Pattern:**
```
I want to [GOAL]. 

What information would you need from me to produce the best result?
What format should I provide the information in?
```

**Alternative:**
```
Here's my current prompt:
"""
[YOUR PROMPT]
"""

How can I improve this prompt to get better results?
```

---

## 14. Critique and Revise

**What:** Ask the LLM to critique its own output and improve it.

**Why:** Self-correction often catches issues the initial response missed.

**Pattern:**
```
[INITIAL REQUEST]

After completing, critique your response:
1. What's missing?
2. What could be improved?
3. Any errors or inconsistencies?

Then provide a revised version addressing those issues.
```

---

## 15. Persona Stacking

**What:** Combine multiple perspectives or roles for richer output.

**Why:** Gets multi-faceted analysis without multiple prompts.

**Example:**
```
Review this code from three perspectives:

1. **Security Expert**: Focus on vulnerabilities
2. **Performance Engineer**: Focus on efficiency
3. **Junior Developer**: Focus on readability and learning

Code:
[CODE]

Provide feedback from each perspective, then synthesize into unified recommendations.
```

---

## Quick Reference

| Technique | When to Use | Key Pattern |
|-----------|-------------|-------------|
| Few-Shot | Pattern-based tasks | Example 1, Example 2, Now: |
| Chain-of-Thought | Complex reasoning | "Step by step..." |
| Self-Consistency | High-stakes decisions | Multiple approaches → compare |
| Constraints | Prevent unwanted output | DO: / DON'T: |
| Iterative | Building complex output | Refine in stages |
| Meta-Prompting | Unsure how to prompt | "What do you need from me?" |
| Critique & Revise | Quality improvement | Generate → Critique → Revise |

---

## Related Files

- [Foundational Techniques](foundational-techniques.md) - Context, roles, structure
- [Optimization Patterns](optimization-patterns.md) - Frameworks, efficiency

---

*See also: [../SKILL.md](../SKILL.md) for complete prompt engineering workflow*
