# Foundational Prompting Techniques

Core techniques for effective LLM interactions. Master these before moving to advanced patterns.

---

## 1. Context Setting

**What:** Provide background information before making requests.

**Why:** LLMs perform better with context - they can tailor responses appropriately.

**Pattern:**

```
[CONTEXT]
Background information about the situation, domain, or problem.

[TASK]
What you want the LLM to do.
```

**Example:**

```
I'm building a fintech startup for small business loans. Our target users
are small business owners with limited tech experience. We value simplicity
and trust.

Write copy for our homepage hero section.
```

---

## 2. Role Assignment

**What:** Assign a specific persona or expertise to the LLM.

**Why:** Activates relevant knowledge patterns and adjusts response style.

**Pattern:**

```
You are a [ROLE] with [EXPERIENCE/EXPERTISE].
Your approach is [CHARACTERISTICS].

[TASK]
```

**Examples:**

```
You are a senior backend engineer with 15 years of experience in
distributed systems. You prioritize scalability and maintainability.

Review this database schema for a high-traffic e-commerce platform.
```

```
You are a UX writer who specializes in fintech applications.
You write in a friendly but professional tone, avoiding jargon.

Write error messages for failed payment scenarios.
```

---

## 3. Explicit Instructions

**What:** State exactly what you want, leaving nothing to interpretation.

**Why:** Eliminates ambiguity and reduces unwanted variations.

**Before:**

```
Help me with my resume
```

**After:**

```
Review my resume and provide:
1. 3 strengths (what's working well)
2. 3 areas for improvement (with specific suggestions)
3. Rewritten version of my summary section

Focus on: clarity, action verbs, quantifiable achievements.
Do not: change my job titles or dates.
```

---

## 4. Output Specification

**What:** Define the exact format and structure of the response.

**Why:** Gets consistent, usable outputs without reformatting.

**Pattern:**

```
[TASK]

Respond in this format:
[FORMAT SPECIFICATION]
```

**Examples:**

```
Analyze this code for bugs.

Format your response as:
## Bugs Found
- **Line X**: [description] → [fix]

## Suggestions
1. [suggestion]

## Overall Assessment
[1-2 sentences]
```

```
Provide your answer as JSON:
{
  "summary": "string",
  "keyPoints": ["string"],
  "sentiment": "positive|negative|neutral",
  "confidence": 0.0-1.0
}
```

---

## 5. Hierarchical Organization

**What:** Organize information from general to specific, using clear hierarchy.

**Why:** Mirrors how LLMs process information; improves comprehension.

**Pattern:**

```
# Main Objective
High-level goal

## Context
Background information

## Requirements
### Must Have
- Requirement 1
- Requirement 2

### Nice to Have
- Optional 1

## Constraints
- Limitation 1
- Limitation 2

## Expected Output
What success looks like
```

---

## 6. Sectioned Prompts

**What:** Use markdown-style sections to separate concerns.

**Why:** Easier to parse; each section can be processed distinctly.

**Section Types:**

```
## Context / Background
## Task / Objective
## Requirements / Specifications
## Constraints / Limitations
## Examples
## Output Format
## Additional Notes
```

**Example:**

```
## Context
Building a REST API for a task management app.

## Task
Design the endpoint structure for task CRUD operations.

## Requirements
- RESTful conventions
- Support for task assignment to users
- Due date filtering
- Pagination

## Constraints
- Must be compatible with existing /users endpoints
- Maximum 5 endpoints

## Output Format
Table with: Endpoint, Method, Description, Request Body, Response
```

---

## 7. Delimiter Usage

**What:** Use clear delimiters to separate different parts of input.

**Why:** Prevents confusion between instructions and content to process.

**Common Delimiters:**

````
Triple backticks: ```content```
XML tags: <content>...</content>
Triple quotes: """content"""
Brackets: [content]
Dashes: ---content---
````

**Example:**

```
Translate the following text to Spanish.
Maintain the original formatting and tone.

Text to translate:
"""
Welcome to our platform! We're excited to have you here.
Please complete your profile to get started.
"""
```

---

## Quick Reference

| Technique             | When to Use               | Key Pattern                   |
| --------------------- | ------------------------- | ----------------------------- |
| Context Setting       | Always                    | Background → Task             |
| Role Assignment       | Expert knowledge needed   | "You are a [role]..."         |
| Explicit Instructions | Complex or specific tasks | Numbered list of requirements |
| Output Format         | Structured responses      | "Format as: ..."              |
| Hierarchical Org      | Complex requirements      | # → ## → ###                  |
| Sections              | Multi-part prompts        | ## Context, ## Task, etc.     |
| Delimiters            | Separating content        | \`\`\` or """ or <tags>       |

---

## Related Files

- [Advanced Techniques](advanced-techniques.md) - Few-shot, CoT, constraints
- [Optimization Patterns](optimization-patterns.md) - Frameworks, efficiency, tips

---

_See also: [../SKILL.md](../SKILL.md) for complete prompt engineering workflow_
