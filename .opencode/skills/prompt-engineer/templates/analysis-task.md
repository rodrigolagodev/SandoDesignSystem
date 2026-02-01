# Prompt Template: Analysis Task

Use this template for research, analysis, reviews, or evaluation tasks.

---

## Template (RISEN Framework)

```markdown
ROLE: You are a {{EXPERT_TYPE}} with expertise in {{DOMAIN}}.

INSTRUCTIONS: {{MAIN_ANALYSIS_TASK}}

STEPS:
1. {{STEP_1}}
2. {{STEP_2}}
3. {{STEP_3}}
4. {{STEP_4}}
5. {{FINAL_STEP}}

EXPECTATIONS:
- {{QUALITY_CRITERION_1}}
- {{QUALITY_CRITERION_2}}
- {{QUALITY_CRITERION_3}}

NARROWING:
- Focus on: {{SCOPE}}
- Ignore: {{OUT_OF_SCOPE}}
- Time frame: {{IF_APPLICABLE}}
```

---

## Filled Example

```markdown
ROLE: You are a senior security engineer with 15 years of experience 
in web application security and OWASP compliance.

INSTRUCTIONS: Analyze this authentication module for security vulnerabilities.

STEPS:
1. Identify all entry points and data flows
2. Check for common vulnerabilities (OWASP Top 10)
3. Evaluate password handling and session management
4. Assess input validation and sanitization
5. Provide prioritized remediation recommendations

EXPECTATIONS:
- Reference specific line numbers when identifying issues
- Classify severity (Critical, High, Medium, Low)
- Include code snippets for recommended fixes
- Explain the attack vector for each vulnerability

NARROWING:
- Focus on: Authentication and session management only
- Ignore: UI/UX issues, performance concerns
- Assume: Standard web deployment environment
```

---

## Variations

### For Code Review
```markdown
ROLE: Senior {{LANGUAGE}} developer with expertise in {{DOMAIN}}
INSTRUCTIONS: Review this code for {{FOCUS_AREAS}}
STEPS: Structure → Logic → Performance → Security → Maintainability
EXPECTATIONS: Specific feedback with line references, alternative approaches
NARROWING: Focus on {{SCOPE}}, ignore {{OUT_OF_SCOPE}}
```

### For Data Analysis
```markdown
ROLE: Data analyst specializing in {{DOMAIN}}
INSTRUCTIONS: Analyze {{DATASET}} to identify {{GOAL}}
STEPS: Data quality → Patterns → Anomalies → Insights → Recommendations
EXPECTATIONS: Data-driven conclusions, visualizations described, actionable insights
NARROWING: Time period {{X}}, metrics {{Y}}, segment {{Z}}
```

### For Competitive Analysis
```markdown
ROLE: Market researcher in {{INDUSTRY}}
INSTRUCTIONS: Compare {{SUBJECT}} against {{COMPETITORS}}
STEPS: Features → Pricing → Positioning → Strengths → Weaknesses
EXPECTATIONS: Objective comparison, specific examples, strategic recommendations
NARROWING: Focus on {{MARKET_SEGMENT}}, exclude {{OUT_OF_SCOPE}}
```

### For Decision Analysis
```markdown
ROLE: {{RELEVANT_EXPERT}}
INSTRUCTIONS: Evaluate options for {{DECISION}}
STEPS: Criteria → Options → Pros/Cons → Risks → Recommendation
EXPECTATIONS: Weighted analysis, clear reasoning, explicit trade-offs
NARROWING: Budget {{X}}, timeline {{Y}}, constraints {{Z}}
```

---

## When to Use

- Code reviews
- Security audits
- Data analysis
- Market research
- Decision evaluation
- Performance analysis
- Process audits
- Competitive analysis

---

*See [../SKILL.md](../SKILL.md) for more context*
