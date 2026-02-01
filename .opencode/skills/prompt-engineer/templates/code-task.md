# Prompt Template: Code Task

Use this template for code generation, refactoring, or technical tasks.

---

## Template

```markdown
## Context
{{BACKGROUND_INFO}}
Tech stack: {{TECHNOLOGIES}}
Current state: {{CURRENT_SITUATION}}

## Task
{{CLEAR_TASK_DESCRIPTION}}

## Requirements
- {{REQUIREMENT_1}}
- {{REQUIREMENT_2}}
- {{REQUIREMENT_3}}

## Constraints
- DO: {{DESIRED_BEHAVIOR}}
- DON'T: {{UNDESIRED_BEHAVIOR}}

## Output Format
{{FORMAT_SPECIFICATION}}

## Example (if pattern-based)
Input: {{EXAMPLE_INPUT}}
Output: {{EXAMPLE_OUTPUT}}
```

---

## Filled Example

```markdown
## Context
Building a REST API for a task management app.
Tech stack: Node.js, Express, PostgreSQL, Prisma ORM
Current state: Database schema exists, need endpoint implementation

## Task
Create CRUD endpoints for the Task resource.

## Requirements
- RESTful conventions (GET, POST, PUT, DELETE)
- Input validation on all endpoints
- Proper error handling with status codes
- Pagination for list endpoint (default 20 items)
- Filter by status (pending, completed, all)

## Constraints
- DO: Use async/await, return consistent JSON structure
- DON'T: Use callbacks, expose internal errors to client

## Output Format
For each endpoint provide:
1. Route definition
2. Controller function
3. Example request/response
```

---

## When to Use

- Code generation
- API development
- Refactoring tasks
- Bug fixing
- Feature implementation

---

*See [../SKILL.md](../SKILL.md) for more context*
