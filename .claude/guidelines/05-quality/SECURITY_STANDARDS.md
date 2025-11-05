# Security Standards

**Category**: 05-quality
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: Security Compliance Auditor

---

## Purpose

Establish security standards for the Sando Design System to prevent vulnerabilities in components, build processes, and dependencies. This guideline defines XSS prevention, CSP compliance, dependency scanning, secure coding practices, and vulnerability disclosure procedures.

**Target**: Zero high/critical vulnerabilities in production, automated dependency scanning in CI
**Scope**: Components, tokens, build scripts, documentation sites, npm packages
**Enforcement**: CI blocks on vulnerabilities, security audit every release

---

## Core Rules

### Rule 1: No XSS Vulnerabilities (Non-Negotiable)

All user input MUST be sanitized. Never use `innerHTML` or `dangerouslySetInnerHTML` without sanitization.

**Pattern** (Lit automatic escaping):

```typescript
// ✅ CORRECT - Lit automatically escapes expressions
render() {
  return html`<div>${this.userInput}</div>`; // Safe - escaped
}

// ❌ WRONG - innerHTML bypasses escaping
render() {
  const div = document.createElement('div');
  div.innerHTML = this.userInput; // XSS vulnerability
  return div;
}
```

**Lit security**: Template expressions are automatically HTML-escaped. SQL injection, XSS, and code injection are prevented by default.

**When HTML is required**:

```typescript
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import DOMPurify from 'dompurify';

render() {
  const sanitized = DOMPurify.sanitize(this.userHTML);
  return html`<div>${unsafeHTML(sanitized)}</div>`;
}
```

**Why**: XSS is the #1 web vulnerability. Even trusted input can be compromised. Always sanitize.

**Reference**: [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

---

### Rule 2: Content Security Policy (CSP) Compliance (Required)

Components MUST work with strict CSP (no `unsafe-inline`, no `unsafe-eval`).

**Pattern** (CSP headers):

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
```

**Component requirements**:

- No inline styles (use Shadow DOM CSS)
- No inline scripts (use external modules)
- No `eval()` or `new Function()`
- Use nonces/hashes for any required inline content

**Testing CSP**:

```bash
# Test Storybook with strict CSP
npx http-server apps/docs/dist \
  --cors \
  -p 8080 \
  -H "Content-Security-Policy: default-src 'self'; script-src 'self'"
```

**Why**: CSP prevents injection attacks by controlling resource loading. Essential for enterprise adoption.

**Reference**: [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

### Rule 3: Dependency Vulnerability Scanning (Non-Negotiable)

All dependencies MUST be scanned for vulnerabilities. No high/critical vulnerabilities in production.

**Pattern** (npm audit):

```bash
# Audit dependencies
pnpm audit

# Auto-fix vulnerabilities
pnpm audit --fix

# CI enforcement
pnpm audit --audit-level=high
# Exit code 1 if high/critical vulnerabilities found
```

**GitHub Dependabot**:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    versioning-strategy: increase
```

**Severity levels**:
| Level | Action | Timeline |
|-------|--------|----------|
| Critical | Block merge, emergency patch | <24 hours |
| High | Block merge, schedule fix | <7 days |
| Moderate | Create issue, fix in next release | <30 days |
| Low | Track, fix opportunistically | Next major |

**Why**: 80% of breaches exploit known vulnerabilities. Automated scanning catches issues before production.

**Reference**: [npm audit docs](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

### Rule 4: Secure Coding Practices (Required)

Follow OWASP Top 10 and secure coding guidelines for all component code.

**Key practices**:

1. **Input validation**: Validate all props/attributes
2. **Output encoding**: Use Lit's automatic escaping
3. **Authentication**: Never implement auth in components (delegate)
4. **Secrets**: Never hardcode API keys, tokens, passwords
5. **Error messages**: Don't leak sensitive info in errors

**Pattern** (input validation):

```typescript
@property({ type: String })
set email(value: string) {
  // Validate before setting
  if (!this.isValidEmail(value)) {
    console.warn('Invalid email format');
    return;
  }
  this._email = value;
}

private isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

**Anti-pattern** (secrets in code):

```typescript
// ❌ WRONG - Hardcoded API key
const API_KEY = "sk_live_abc123def456";

// ✅ CORRECT - Use environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
```

**Why**: Defense in depth. Multiple layers prevent single points of failure.

**Reference**: [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

### Rule 5: License Compliance (Required)

All dependencies MUST have compatible licenses (MIT, Apache 2.0, BSD, ISC). No GPL/AGPL in production.

**Pattern** (license checker):

```bash
# Install
pnpm add -D license-checker

# Check licenses
npx license-checker --summary

# Fail on incompatible licenses
npx license-checker --failOn "GPL;AGPL"
```

**Acceptable licenses**:

- ✅ MIT, Apache 2.0, BSD (2/3-Clause), ISC
- ⚠️ CC0, Unlicense (verify case-by-case)
- ❌ GPL, AGPL, Commons Clause (copyleft - avoid)

**CI integration**:

```yaml
- name: Check licenses
  run: npx license-checker --failOn "GPL;AGPL;SSPL"
```

**Why**: GPL/AGPL require derivative works to be open-sourced. Incompatible with proprietary software using design system.

**Reference**: [Choose a License](https://choosealicense.com/)

---

## OWASP Top 10 for Design Systems

### 1. Injection (XSS, SQL, Command)

**Risk**: Malicious code execution via user input

**Prevention**:

- Use Lit's automatic HTML escaping
- Sanitize with DOMPurify before `unsafeHTML`
- Validate all prop/attribute inputs
- Never use `eval()`, `new Function()`, `innerHTML`

**Test**:

```typescript
it("escapes HTML in user input", async () => {
  element.label = '<script>alert("XSS")</script>';
  await element.updateComplete;
  const text = element.shadowRoot?.textContent;
  expect(text).toContain("<script>"); // Escaped, not executed
});
```

### 2. Broken Authentication

**Risk**: Unauthorized access via weak auth

**Prevention**:

- **DO NOT implement authentication in components**
- Delegate to app-level auth (OAuth, JWT, etc.)
- Components should only consume auth state, not manage it

**Anti-pattern**:

```typescript
// ❌ WRONG - Auth logic in component
class SandoLogin extends LitElement {
  login(user, pass) {
    if (user === "admin" && pass === "123") {
      // NEVER DO THIS
      this.authenticated = true;
    }
  }
}
```

### 3. Sensitive Data Exposure

**Risk**: Leaking secrets, PII, API keys

**Prevention**:

- Never hardcode secrets in components
- Never log sensitive data (PII, tokens, passwords)
- Use environment variables for config
- Sanitize error messages

**Pattern**:

```typescript
// ✅ CORRECT - No sensitive data in logs
catch (error) {
  console.error('API request failed'); // Generic message
  // Don't log: error.response.headers.authorization
}
```

### 4. XML External Entities (XXE)

**Risk**: XML parsing vulnerabilities

**Prevention**:

- Use JSON instead of XML for data exchange
- If XML required, disable external entities
- Validate XML against schema

**Not applicable**: Design system components rarely parse XML.

### 5. Broken Access Control

**Risk**: Unauthorized actions

**Prevention**:

- Components should not enforce access control
- Delegate to backend/app level
- Only show/hide UI based on props (not security boundary)

**Pattern**:

```typescript
// ✅ CORRECT - UI-only restriction
render() {
  return this.canDelete
    ? html`<button @click=${this.delete}>Delete</button>`
    : html``;
}
// Backend MUST verify canDelete independently
```

### 6. Security Misconfiguration

**Risk**: Default credentials, verbose errors, open ports

**Prevention**:

- No default passwords/API keys
- Disable debug mode in production
- Secure CSP headers
- Keep dependencies updated

**Check**:

```bash
# Audit production build for debug code
grep -r "console.log" dist/
grep -r "debugger" dist/
```

### 7. Cross-Site Scripting (XSS)

**Risk**: JavaScript injection via user input

**Prevention**: See Rule 1 (No XSS Vulnerabilities)

### 8. Insecure Deserialization

**Risk**: Code execution via malicious serialized objects

**Prevention**:

- Avoid deserializing untrusted data
- Use JSON (safer than pickle/YAML)
- Validate schema after deserialization

**Not highly applicable**: Components receive typed props, not serialized objects.

### 9. Using Components with Known Vulnerabilities

**Risk**: Exploiting outdated dependencies

**Prevention**: See Rule 3 (Dependency Scanning)

### 10. Insufficient Logging & Monitoring

**Risk**: Undetected breaches

**Prevention**:

- Log security events (auth failures, validation errors)
- Monitor for anomalies
- Alert on suspicious patterns

**Pattern**:

```typescript
// Log security-relevant events
if (!this.isValidInput(value)) {
  console.warn("[SECURITY] Invalid input detected", {
    component: "sando-input",
    timestamp: Date.now(),
    // Don't log the actual invalid value (may contain attack payload)
  });
}
```

---

## Dependency Security

### npm audit

**Run on every CI build**:

```yaml
- name: Security audit
  run: pnpm audit --audit-level=moderate
```

**Exit codes**:

- `0` - No vulnerabilities
- `1` - Vulnerabilities found (blocks merge)

**Handling advisories**:

```bash
# View details
pnpm audit

# Auto-fix (updates to safe versions)
pnpm audit --fix

# If no fix available, evaluate risk
pnpm audit --json > audit.json
# Review audit.json for severity/exploitability
```

### Dependabot

**Automatic PR creation** for vulnerable dependencies:

**.github/dependabot.yml**:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "security"
    reviewers:
      - "security-team"
```

**Benefits**:

- Automated vulnerability detection
- PRs with fix suggestions
- Configurable auto-merge (patch/minor only)

### Snyk Integration (Optional)

**Advanced vulnerability scanning**:

```bash
# Install
pnpm add -D snyk

# Test
npx snyk test

# Monitor in CI
npx snyk monitor
```

**Features**:

- Broader vulnerability database than npm audit
- License compliance checking
- Container scanning (if using Docker)

---

## Secure Build Pipeline

### Code Scanning

**GitHub Advanced Security** (if available):

```yaml
# .github/workflows/codeql.yml
name: CodeQL
on: [push, pull_request]
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v2
        with:
          languages: javascript
      - uses: github/codeql-action/analyze@v2
```

### Secret Scanning

**Prevent committing secrets**:

```bash
# Install git-secrets
brew install git-secrets

# Configure
git secrets --install
git secrets --register-aws

# Scan
git secrets --scan
```

**Pre-commit hook**:

```yaml
# .husky/pre-commit
#!/bin/sh
git secrets --scan
```

### Supply Chain Security

**Lock files** (`pnpm-lock.yaml`):

- Commit lock files to version control
- Ensures reproducible builds
- Prevents malicious package updates

**Integrity checks**:

```json
// package.json
{
  "dependencies": {
    "lit": "3.3.1" // Pin exact versions for security-critical deps
  }
}
```

**Package provenance** (future):

```bash
# Verify package signatures
npm audit signatures
```

---

## Content Security Policy

### CSP Headers

**Strict CSP for documentation sites**:

```javascript
// apps/docs/vite.config.js
export default defineConfig({
  server: {
    headers: {
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self'",
        "frame-ancestors 'none'",
      ].join("; "),
    },
  },
});
```

### CSP for Web Components

**Shadow DOM CSS** (CSP-safe):

```typescript
// ✅ CORRECT - No inline styles
static styles = css`
  :host {
    display: block;
  }
`;
```

**Avoid inline styles**:

```typescript
// ❌ WRONG - Inline style violates CSP
render() {
  return html`<div style="color: red;">Text</div>`;
}

// ✅ CORRECT - Use CSS classes
render() {
  return html`<div class="error">Text</div>`;
}
```

### CSP Reporting

**Monitor violations**:

```http
Content-Security-Policy-Report-Only:
  default-src 'self';
  report-uri https://example.com/csp-reports
```

---

## Vulnerability Disclosure

### Responsible Disclosure Policy

**SECURITY.md** (repository root):

```markdown
# Security Policy

## Reporting Vulnerabilities

**DO NOT** create public GitHub issues for security vulnerabilities.

Email: security@sando-design.com
PGP Key: [link to public key]

Include:

- Vulnerability description
- Steps to reproduce
- Impact assessment
- Suggested fix (if available)

## Response Timeline

- Initial response: <48 hours
- Triage: <7 days
- Fix timeline: Based on severity
  - Critical: <7 days
  - High: <30 days
  - Medium: <90 days
  - Low: Next major release

## Disclosure Policy

- Coordinated disclosure (90-day embargo)
- Public disclosure after fix released
- Credit given in release notes (if desired)
```

### Security Advisories

**GitHub Security Advisories**:

1. Create private advisory
2. Assign CVE
3. Develop fix
4. Coordinate disclosure
5. Publish advisory + patch

---

## Validation Checklist

### Component Development

- [ ] No `innerHTML`, `eval()`, `new Function()`
- [ ] All user input validated/sanitized
- [ ] Lit automatic escaping used for all dynamic content
- [ ] No hardcoded secrets/API keys
- [ ] Error messages don't leak sensitive info
- [ ] Works with strict CSP (no `unsafe-inline`)

### Dependency Management

- [ ] `pnpm audit` passes (no high/critical)
- [ ] All dependencies have compatible licenses (MIT, Apache, BSD)
- [ ] Lock files (`pnpm-lock.yaml`) committed
- [ ] Dependabot configured and monitored
- [ ] Dependencies updated regularly (weekly)

### Build & CI

- [ ] Security audit runs on every PR
- [ ] CSP headers configured for docs sites
- [ ] Secret scanning enabled (git-secrets, GitHub)
- [ ] Code scanning enabled (CodeQL or similar)
- [ ] Build artifacts scanned for debug code

### Release

- [ ] Security audit clean before release
- [ ] CHANGELOG includes security fixes (if any)
- [ ] GitHub Security Advisory published (if applicable)
- [ ] Vulnerable dependencies updated/patched
- [ ] Release notes mention security improvements

---

## Related Guidelines

- [TESTING_STRATEGY.md](../03-development/TESTING_STRATEGY.md) - Security test patterns
- [CODE_STYLE.md](../03-development/CODE_STYLE.md) - Secure coding conventions

---

## External References

**OWASP**:

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Most critical web vulnerabilities
- [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

**CSP**:

- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Test CSP policies

**Dependency Security**:

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Vulnerability scanning
- [Snyk](https://snyk.io/) - Advanced dependency scanning
- [Dependabot](https://docs.github.com/en/code-security/dependabot) - Automated updates

**Web Components**:

- [Lit Security](https://lit.dev/docs/components/security/) - Lit-specific security guidance

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial guideline creation
- OWASP Top 10 coverage for design systems
- XSS prevention: Lit automatic escaping, DOMPurify for `unsafeHTML`
- CSP compliance: No `unsafe-inline`, Shadow DOM CSS patterns
- Dependency scanning: npm audit, Dependabot, Snyk integration
- Secure coding practices: Input validation, no hardcoded secrets
- License compliance: MIT/Apache/BSD only, avoid GPL/AGPL
- Vulnerability severity levels: Critical (<24h), High (<7d), Moderate (<30d), Low (next major)
- Secure build pipeline: CodeQL, git-secrets, supply chain security
- Vulnerability disclosure policy: SECURITY.md template, coordinated disclosure
- Validation checklist: component development, dependencies, build/CI, release
- Agent-optimized format (496 lines)

---

**Security is not optional. Prevent vulnerabilities early, scan continuously, and disclose responsibly.**
