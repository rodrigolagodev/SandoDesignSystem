---
guideline_id: unique-kebab-case-id
title: Human Readable Title
category: design-system | technical-architecture | development-standards | quality-assurance | documentation
version: 1.0.0
last_updated: 2025-11-01
status: active | draft | deprecated
applies_to: [agents, skills, commands]
related_guidelines: [list-of-related-guideline-ids]
---

# [Title]

> **Purpose**: One-sentence description of what this guideline covers and why it exists.

## Overview

Provide a comprehensive introduction to this guideline:

- **What** does this guideline cover?
- **Why** is this important for the Sando Design System?
- **Who** should follow this guideline? (agents, skills, commands, contributors)
- **When** should this guideline be applied?

### Context

Explain the background and motivation:

- Problem this guideline solves
- Design decisions that led to these standards
- Alignment with project vision and goals

## Principles

Core philosophical principles that underpin these standards:

1. **Principle Name**: Description of the principle and why it matters
2. **Principle Name**: Description of the principle and why it matters
3. **Principle Name**: Description of the principle and why it matters

> These principles guide all specific standards and should be referenced when making decisions not explicitly covered below.

## Standards

### Standard Category 1

**Rule**: Clear, actionable statement of the standard.

**Rationale**: Why this standard exists.

**Examples**:

```typescript
// ✅ Good - follows the standard
const goodExample = "example code";
```

```typescript
// ❌ Bad - violates the standard
const badExample = "counter-example";
```

**Exceptions**: Rare cases where deviation is acceptable.

---

### Standard Category 2

**Rule**: Clear, actionable statement of the standard.

**Rationale**: Why this standard exists.

**Examples**:

```typescript
// ✅ Good
const anotherGoodExample = "example";
```

```typescript
// ❌ Bad
const anotherBadExample = "counter-example";
```

**Exceptions**: When this rule doesn't apply.

---

## Detailed Examples

### Use Case 1: [Scenario Name]

**Scenario**: Describe a common real-world situation.

**Solution**:

```typescript
// Complete, production-ready example
export const properImplementation = () => {
  // Implementation following all standards
};
```

**Explanation**: Why this solution follows the guidelines.

---

### Use Case 2: [Scenario Name]

**Scenario**: Another common situation.

**Solution**:

```typescript
// Another complete example
export const anotherImplementation = () => {
  // Implementation details
};
```

**Explanation**: Key aspects that make this compliant.

---

## Anti-patterns

Common mistakes and patterns to avoid:

### Anti-pattern 1: [Name]

**Problem**: What makes this an anti-pattern.

```typescript
// ❌ DON'T DO THIS
const badPattern = "problematic code";
```

**Why It's Wrong**: Specific issues this creates.

**Instead, Do This**:

```typescript
// ✅ CORRECT APPROACH
const goodPattern = "proper implementation";
```

---

### Anti-pattern 2: [Name]

**Problem**: Description of the anti-pattern.

```typescript
// ❌ AVOID
const anotherBadPattern = "code to avoid";
```

**Why It's Wrong**: Consequences and issues.

**Instead, Do This**:

```typescript
// ✅ BETTER
const betterApproach = "improved code";
```

---

## Validation

### Automated Validation

How to automatically check compliance:

```bash
# Command to run validation
pnpm run validate:guideline-name
```

**What It Checks**:

- Specific validation criteria 1
- Specific validation criteria 2
- Specific validation criteria 3

### Manual Review Checklist

When reviewing code/designs manually, verify:

- [ ] Checklist item 1
- [ ] Checklist item 2
- [ ] Checklist item 3
- [ ] Checklist item 4
- [ ] Checklist item 5

### Common Issues

**Issue**: Description of common violation.
**Detection**: How to spot this issue.
**Fix**: How to correct it.

---

## Integration Points

### For Agents

How agents should use this guideline:

```markdown
## [Guideline Context]

Reference `.claude/guidelines/[category]/[this-file].md` for:

- Key aspect 1
- Key aspect 2
- Key aspect 3
```

**Relevant Agents**:

- agent-name-1: How they use it
- agent-name-2: How they use it
- agent-name-3: How they use it

---

### For Skills

How skills should reference this guideline:

```markdown
When [performing task], follow:

- `.claude/guidelines/[category]/[this-file].md`
- Specific section reference
```

**Relevant Skills**:

- skill-name-1: Usage scenario
- skill-name-2: Usage scenario
- skill-name-3: Usage scenario

---

### For Commands

How slash commands should use this guideline:

```markdown
Analyze compliance with:

- `.claude/guidelines/[category]/[this-file].md`
- Report deviations from [specific standards]
```

**Relevant Commands**:

- /command-name-1: How it uses guideline
- /command-name-2: How it uses guideline

---

## Migration Guide

If this guideline introduces changes to existing patterns:

### From Previous Approach

**Old Way**:

```typescript
// Previous implementation
const oldApproach = "deprecated pattern";
```

**New Way**:

```typescript
// Current standard
const newApproach = "updated pattern";
```

**Migration Steps**:

1. Step to identify old pattern
2. Step to refactor to new pattern
3. Step to validate the change
4. Step to test the migration

**Breaking Changes**: List any breaking changes introduced.

**Backward Compatibility**: How to maintain compatibility during transition.

---

## Related Guidelines

Links to related guidelines that should be consulted:

- **[guideline-id-1]**: `category/filename.md` - How it relates
- **[guideline-id-2]**: `category/filename.md` - How it relates
- **[guideline-id-3]**: `category/filename.md` - How it relates

## External References

Links to external documentation, standards, and resources:

- [External Resource Name](URL) - Description
- [Standard/Specification](URL) - Relevant sections
- [Tool Documentation](URL) - Related configuration
- [Research/Article](URL) - Background reading

## Tooling Support

Tools and configurations that support this guideline:

### ESLint Rules

```json
{
  "rules": {
    "rule-name": ["error", { "option": "value" }]
  }
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "option": "value"
  }
}
```

### Custom Scripts

```bash
# Script to enforce or validate this guideline
pnpm run script-name
```

---

## FAQ

### Question 1?

Answer providing clarity on common confusion points.

### Question 2?

Answer addressing frequent questions.

### Question 3?

Answer explaining edge cases or exceptions.

---

## Changelog

### Version 1.0.0 (2025-11-01)

**Initial Release**

- Standard 1 established
- Standard 2 defined
- Examples added

---

### Version 0.9.0 (2025-10-15) [Draft]

**Draft Version**

- Initial draft of standards
- Examples under review
- Seeking feedback

---

## Approval

**Approved By**: Design System Team
**Approval Date**: 2025-11-01
**Review Cycle**: Quarterly (next review: 2025-02-01)

---

## Contributing

To propose changes to this guideline:

1. Open a discussion with rationale for the change
2. Draft proposed modifications using this template
3. Get review from relevant stakeholders:
   - design-system-architect (architecture changes)
   - ui-designer (design-related changes)
   - qa-expert (quality/testing changes)
   - technical-writer (documentation clarity)
4. Update version number following semantic versioning
5. Document in changelog
6. Update affected agents/skills/commands

---

**Guideline Owner**: [Role/Person responsible for maintaining this]
**Last Reviewed**: 2025-11-01
**Next Review**: 2025-02-01
