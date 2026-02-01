# Workflow: Analyze and Optimize a Prompt

Step-by-step guide to analyze an existing prompt and improve its effectiveness.

---

## When to Use

- User says "improve this prompt" or "optimize my prompt"
- User shares a prompt that isn't working well
- Proactively when you see a prompt that could be more effective

---

## Phase 1: Receive and Understand

### Step 1.1: Get the Prompt

Ask the user to share their current prompt:

```
Please share the prompt you'd like me to analyze.
Include any context about what it's for and what results you're getting.
```

### Step 1.2: Quick Assessment

Read the prompt and identify:

- **Length**: Short (<50 words), Medium (50-200), Long (>200)
- **Structure**: None, Minimal, Well-structured
- **Clarity**: Vague, Somewhat clear, Very clear
- **Context level**: None, Some, Sufficient

---

## Phase 2: Diagnose Issues

### Step 2.1: Apply Analysis Checklist

Check each category:

**Context Issues**

- [ ] Missing background information
- [ ] Unclear purpose or goal
- [ ] No target audience defined
- [ ] Missing constraints or requirements

**Structure Issues**

- [ ] Wall of text (no formatting)
- [ ] Multiple objectives mixed together
- [ ] No clear sections or organization
- [ ] Information in wrong order

**Clarity Issues**

- [ ] Vague or ambiguous terms
- [ ] Assumptions not stated
- [ ] Output format not specified
- [ ] Missing examples

**Efficiency Issues**

- [ ] Redundant information
- [ ] Overly verbose explanations
- [ ] Could use examples instead of rules
- [ ] Unnecessary repetition

### Step 2.2: Identify Top 3 Problems

Prioritize the issues that will have the biggest impact:

1. [Most critical issue]
2. [Second issue]
3. [Third issue]

---

## Phase 3: Gather Missing Information

### Step 3.1: Ask Clarifying Questions

Based on gaps identified, ask (only what's needed):

**Context questions:**

- "What is the ultimate goal of this prompt?"
- "Who will use the output? (audience/target)"
- "What context or background should the model know?"

**Requirements questions:**

- "What must the output include?"
- "What should it NOT include?"
- "Any specific format requirements?"

**Quality questions:**

- "What does 'good' look like for this task?"
- "Can you show me an example of desired output?"

### Step 3.2: Confirm Understanding

Summarize what you understand:

```
So you want a prompt that:
- Does [X]
- For [audience]
- With output format [Y]
- Avoiding [Z]

Is that correct?
```

---

## Phase 4: Apply Optimization Techniques

### Step 4.1: Select Techniques

Based on the task type, choose appropriate techniques:

| Task Type         | Recommended Techniques                       |
| ----------------- | -------------------------------------------- |
| Simple task       | Context + Clear instructions + Output format |
| Complex reasoning | Chain-of-thought + Structured steps          |
| Pattern matching  | Few-shot examples                            |
| Expert domain     | Role/persona assignment                      |
| Content creation  | CRAFT framework                              |
| Analysis          | RISEN framework                              |

### Step 4.2: Restructure the Prompt

Apply in this order:

1. Add context/background
2. Assign role if beneficial
3. Structure with clear sections
4. Make instructions explicit
5. Add constraints (DO/DON'T)
6. Specify output format
7. Add examples if pattern-based
8. Optimize for token efficiency

---

## Phase 5: Present and Iterate

### Step 5.1: Show the Optimized Prompt

Present the result clearly:

```
## Optimized Prompt

[The new prompt here]
```

### Step 5.2: Explain Key Changes

Briefly explain what was improved:

```
## Key Improvements

1. **Added context**: [what was added]
2. **Restructured**: [how it was organized]
3. **Clarified**: [what was made explicit]
```

### Step 5.3: Offer Options

```
Would you like me to:
1. Explain each change in detail?
2. Show before/after comparison?
3. Save this to a .md file?
4. Make adjustments to the optimized version?
```

---

## Phase 6: Finalize

### If user wants adjustments:

- Make specific changes requested
- Re-present the updated version

### If user is satisfied:

- Offer to save to file if not already done
- Suggest testing with the target LLM

---

## Quick Reference: Common Fixes

| Problem         | Quick Fix                               |
| --------------- | --------------------------------------- |
| Too vague       | Add specific details and examples       |
| No structure    | Break into ## sections                  |
| Missing context | Add "Context:" or "Background:" section |
| Output unclear  | Add "Output format:" specification      |
| Too wordy       | Convert paragraphs to bullet points     |
| Assumptions     | State them explicitly                   |

---

_See [../SKILL.md](../SKILL.md) for core principles_
_See [../references/prompting-techniques.md](../references/prompting-techniques.md) for technique details_
