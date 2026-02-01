# Optimization Patterns & Token Efficiency

Frameworks, efficiency techniques, and practical tips for production prompts.

---

## Prompt Frameworks

### The RISEN Framework

**R**ole - Assign a persona
**I**nstructions - Clear task description
**S**teps - Break down the process
**E**xpectations - Define success criteria
**N**arrowing - Add constraints

**Example:**

```
ROLE: You are a senior data analyst at a retail company.

INSTRUCTIONS: Analyze our Q4 sales data to identify trends and anomalies.

STEPS:
1. Summarize overall performance vs Q3
2. Identify top 5 performing products
3. Flag any unusual patterns or anomalies
4. Provide 3 actionable recommendations

EXPECTATIONS:
- Data-driven insights (cite specific numbers)
- Executive-friendly language
- Visualizations described in text

NARROWING:
- Focus only on online sales channel
- Exclude returns from analysis
- Time period: Oct 1 - Dec 31, 2025
```

---

### The CRAFT Framework

**C**ontext - Background information
**R**ole - Who the AI should be
**A**ction - What to do
**F**ormat - How to structure output
**T**arget - Who is the audience

**Example:**

```
CONTEXT: We're launching a new mobile banking app for Gen Z users.

ROLE: You are a social media marketing specialist.

ACTION: Create 5 tweet ideas announcing the app launch.

FORMAT:
- Each tweet under 280 characters
- Include relevant emoji
- Include hashtag suggestions

TARGET: 18-25 year olds who are skeptical of traditional banking.
```

---

### Prompt Chaining

**What:** Break complex tasks into sequential prompts, where each output feeds the next.

**Why:** Manages complexity; allows for quality control at each step.

**Pattern:**

```
Prompt 1: Research/Gather → Output A
Prompt 2: Analyze [Output A] → Output B
Prompt 3: Synthesize [Output B] → Output C
Prompt 4: Refine [Output C] → Final Output
```

**Example for writing an article:**

```
Prompt 1: "List 10 key points about [topic]"
Prompt 2: "Organize these points into 3 main sections with headers"
Prompt 3: "Write the full article using this outline"
Prompt 4: "Edit for clarity and add a compelling introduction"
```

---

## Token Efficiency

### Concise Instructions

**Before (verbose):**

```
I would really like it if you could please help me to write
something that would be appropriate for a situation where I
need to send an email to my boss to ask for some time off
from work for a vacation.
```

**After (efficient):**

```
Write a vacation request email to my manager.
- Dates: Dec 20-27
- Tone: Professional but friendly
- Length: 3-4 sentences
```

---

### Use Lists Over Paragraphs

**Before:**

```
I want you to review this code and look for any bugs that might
cause issues, and also check if there are any security vulnerabilities
that could be exploited, and additionally see if there are ways to
make it run faster, and finally suggest any improvements to make
the code more readable and maintainable.
```

**After:**

```
Review this code for:
1. Bugs
2. Security vulnerabilities
3. Performance optimizations
4. Readability improvements
```

---

### Abbreviations and Symbols

Use when context is clear:

| Long Form            | Short Form |
| -------------------- | ---------- |
| leads to, results in | →          |
| and also             | +          |
| versus, compared to  | vs         |
| with                 | w/         |
| for example          | e.g.       |
| requirements         | req        |
| implementation       | impl       |
| configuration        | config     |
| documentation        | docs       |

---

### Reference Don't Repeat

**Instead of repeating:**

```
Write a Python function. The Python function should...
Make sure the Python function handles...
```

**Reference once:**

```
Write a Python function that:
- Validates input
- Handles errors gracefully
- Returns structured response
```

---

## Language-Specific Tips

### Bilingual Prompts

```
Provide your response in both English and Spanish.

Format:
## English
[response]

## Español
[response]
```

### Technical vs Non-Technical

**Technical audience:**

```
Implement a Redis-based rate limiter using sliding window algorithm.
Constraints: 100 req/min, O(1) time complexity, handle distributed env.
```

**Non-technical audience:**

```
Create a system that prevents users from making too many requests.
Like a bouncer that only lets 100 people per minute through the door.
Should work even if we have multiple servers.
```

---

## Quick Reference Card

| Technique | When to Use         | Key Pattern                                            |
| --------- | ------------------- | ------------------------------------------------------ |
| RISEN     | Comprehensive tasks | Role → Instructions → Steps → Expectations → Narrowing |
| CRAFT     | Content creation    | Context → Role → Action → Format → Target              |
| Chaining  | Multi-step tasks    | Output A → Input B → Output B → ...                    |
| Concise   | Always              | Bullets > paragraphs                                   |
| Symbols   | Clear context       | → + vs w/ e.g.                                         |
| Lists     | Multiple items      | Numbered or bulleted                                   |

---

## Anti-Patterns to Avoid

| Anti-Pattern     | Problem                  | Fix                        |
| ---------------- | ------------------------ | -------------------------- |
| "Make it good"   | Subjective, unmeasurable | Define "good" specifically |
| "Be creative"    | Too vague                | Specify type of creativity |
| Long paragraphs  | Hard to parse            | Use bullets and sections   |
| Multiple asks    | Confuses priority        | One clear objective        |
| No examples      | Ambiguous expectations   | Add 1-2 examples           |
| Assuming context | LLM lacks info           | State context explicitly   |
| Repeating info   | Wastes tokens            | Reference once             |

---

## Resources

- **OpenAI Prompt Engineering Guide**: https://platform.openai.com/docs/guides/prompt-engineering
- **Anthropic Prompt Library**: https://docs.anthropic.com/claude/prompt-library
- **Learn Prompting**: https://learnprompting.org/
- **Prompt Engineering Guide**: https://www.promptingguide.ai/

---

## Related Files

- [Foundational Techniques](foundational-techniques.md) - Context, roles, structure
- [Advanced Techniques](advanced-techniques.md) - Few-shot, CoT, constraints

---

_See also: [../SKILL.md](../SKILL.md) for complete prompt engineering workflow_
