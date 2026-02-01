# Prompting Techniques Reference

Comprehensive guide to professional prompting techniques for optimizing LLM interactions.

This reference has been organized into three focused documents for easier navigation.

---

## Quick Navigation

| Document | Topics | Lines |
|----------|--------|-------|
| [Foundational Techniques](foundational-techniques.md) | Context, Role, Instructions, Output, Structure | ~200 |
| [Advanced Techniques](advanced-techniques.md) | Few-shot, CoT, Constraints, Refinement, Meta-prompting | ~220 |
| [Optimization Patterns](optimization-patterns.md) | RISEN, CRAFT, Token efficiency, Anti-patterns | ~200 |

---

## Technique Overview

### Foundational (Start Here)

1. **Context Setting** - Provide background before requests
2. **Role Assignment** - Assign persona or expertise
3. **Explicit Instructions** - State exactly what you want
4. **Output Specification** - Define format and structure
5. **Hierarchical Organization** - General to specific structure
6. **Sectioned Prompts** - Markdown sections for clarity
7. **Delimiter Usage** - Separate instructions from content

### Advanced

8. **Few-Shot Learning** - Examples before actual request
9. **Chain-of-Thought (CoT)** - Step-by-step reasoning
10. **Self-Consistency** - Multiple approaches, compare results
11. **Constraint Specification** - DO/DON'T lists
12. **Iterative Refinement** - Build through iterations
13. **Meta-Prompting** - Ask LLM to help with prompts
14. **Critique and Revise** - Self-correction pattern
15. **Persona Stacking** - Multiple perspectives

### Optimization

16. **RISEN Framework** - Role, Instructions, Steps, Expectations, Narrowing
17. **CRAFT Framework** - Context, Role, Action, Format, Target
18. **Prompt Chaining** - Sequential prompts
19. **Token Efficiency** - Concise, lists, abbreviations

---

## Quick Reference Card

| Technique | When to Use | Key Pattern |
|-----------|-------------|-------------|
| Context Setting | Always | Background → Task |
| Role Assignment | Expert knowledge needed | "You are a [role]..." |
| Few-Shot | Pattern-based tasks | Example 1, Example 2, Now: |
| Chain-of-Thought | Complex reasoning | "Step by step..." |
| Output Format | Structured responses | "Format as: ..." |
| Constraints | Prevent unwanted output | DO: / DON'T: |
| RISEN | Comprehensive tasks | R → I → S → E → N |
| CRAFT | Content creation | C → R → A → F → T |

---

## Resources

- **OpenAI Prompt Engineering Guide**: https://platform.openai.com/docs/guides/prompt-engineering
- **Anthropic Prompt Library**: https://docs.anthropic.com/claude/prompt-library
- **Learn Prompting**: https://learnprompting.org/
- **Prompt Engineering Guide**: https://www.promptingguide.ai/

---

*Last updated: 2025-01-25*
