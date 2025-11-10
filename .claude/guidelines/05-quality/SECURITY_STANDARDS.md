<guideline doc_id="SEC" category="05-quality" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Security Compliance Auditor">

  <purpose id="SEC-PU">
    Establish security standards for the Sando Design System to prevent vulnerabilities in components, build processes, and dependencies. Defines XSS prevention, CSP compliance, dependency scanning, secure coding practices, and vulnerability disclosure procedures.
  </purpose>

  <targets id="SEC-TGT">
    <target>Zero high/critical vulnerabilities in production</target>
    <target>Automated dependency scanning in CI</target>
  </targets>

  <scope id="SEC-SC">
    Components, tokens, build scripts, documentation sites, npm packages
  </scope>

  <enforcement id="SEC-ENF">
    CI blocks on vulnerabilities, security audit every release
  </enforcement>

<core_rules id="SEC-CR">
<rule id="SEC-CR-R1" title="No XSS Vulnerabilities (Non-Negotiable)">

<summary>
All user input MUST be sanitized. Never use innerHTML or dangerouslySetInnerHTML without sanitization.
</summary>

      <pattern lang="typescript" title="✅ Lit automatic escaping">
        // Lit automatically escapes expressions
        render() {
          return html`<div>${this.userInput}</div>`; // Safe - escaped
        }
      </pattern>

      <anti_pattern lang="typescript" title="❌ innerHTML bypasses escaping">
        // innerHTML bypasses escaping
        render() {
          const div = document.createElement('div');
          div.innerHTML = this.userInput; // XSS vulnerability
          return div;
        }
      </anti_pattern>

      <lit_security>
        Template expressions are automatically HTML-escaped. SQL injection, XSS, and code injection are prevented by default.
      </lit_security>

      <when_html_required lang="typescript">
        import { unsafeHTML } from 'lit/directives/unsafe-html.js';
        import DOMPurify from 'dompurify';

        render() {
          const sanitized = DOMPurify.sanitize(this.userHTML);
          return html`<div>${unsafeHTML(sanitized)}</div>`;
        }
      </when_html_required>

      <why>
        XSS is the #1 web vulnerability. Even trusted input can be compromised. Always sanitize.
      </why>

      <reference type="external" url="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html">
        OWASP XSS Prevention
      </reference>
    </rule>

    <rule id="SEC-CR-R2" title="Content Security Policy (CSP) Compliance (Required)">
      <summary>
        Components MUST work with strict CSP (no unsafe-inline, no unsafe-eval).
      </summary>

      <pattern lang="http" title="CSP headers">
        Content-Security-Policy:
          default-src 'self';
          script-src 'self';
          style-src 'self';
          img-src 'self' data: https:;
          font-src 'self';
          connect-src 'self';
          frame-ancestors 'none';
      </pattern>

      <component_requirements>
        <requirement>No inline styles (use Shadow DOM CSS)</requirement>
        <requirement>No inline scripts (use external modules)</requirement>
        <requirement>No eval() or new Function()</requirement>
        <requirement>Use nonces/hashes for any required inline content</requirement>
      </component_requirements>

      <testing_csp lang="bash">
        # Test Storybook with strict CSP
        npx http-server apps/docs/dist \
          --cors \
          -p 8080 \
          -H "Content-Security-Policy: default-src 'self'; script-src 'self'"
      </testing_csp>

      <why>
        CSP prevents injection attacks by controlling resource loading. Essential for enterprise adoption.
      </why>

      <reference type="external" url="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">
        MDN CSP
      </reference>
    </rule>

    <rule id="SEC-CR-R3" title="Dependency Vulnerability Scanning (Non-Negotiable)">
      <summary>
        All dependencies MUST be scanned for vulnerabilities. No high/critical vulnerabilities in production.
      </summary>

      <pattern lang="bash" title="npm audit">
        # Audit dependencies
        pnpm audit

        # Auto-fix vulnerabilities
        pnpm audit --fix

        # CI enforcement
        pnpm audit --audit-level=high
        # Exit code 1 if high/critical vulnerabilities found
      </pattern>

      <github_dependabot lang="yaml" path=".github/dependabot.yml">
        version: 2
        updates:
          - package-ecosystem: "npm"
            directory: "/"
            schedule:
              interval: "weekly"
            open-pull-requests-limit: 10
            versioning-strategy: increase
      </github_dependabot>

      <severity_levels>
        <level name="Critical" action="Block merge, emergency patch" timeline="<24 hours"/>
        <level name="High" action="Block merge, schedule fix" timeline="<7 days"/>
        <level name="Moderate" action="Create issue, fix in next release" timeline="<30 days"/>
        <level name="Low" action="Track, fix opportunistically" timeline="Next major"/>
      </severity_levels>

      <why>
        80% of breaches exploit known vulnerabilities. Automated scanning catches issues before production.
      </why>

      <reference type="external" url="https://docs.npmjs.com/cli/v8/commands/npm-audit">
        npm audit docs
      </reference>
    </rule>

    <rule id="SEC-CR-R4" title="Secure Coding Practices (Required)">
      <summary>
        Follow OWASP Top 10 and secure coding guidelines for all component code.
      </summary>

      <key_practices>
        <practice number="1">Input validation: Validate all props/attributes</practice>
        <practice number="2">Output encoding: Use Lit's automatic escaping</practice>
        <practice number="3">Authentication: Never implement auth in components (delegate)</practice>
        <practice number="4">Secrets: Never hardcode API keys, tokens, passwords</practice>
        <practice number="5">Error messages: Don't leak sensitive info in errors</practice>
      </key_practices>

      <pattern lang="typescript" title="Input validation">
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
      </pattern>

      <anti_pattern lang="typescript" title="❌ Hardcoded API key">
        // Hardcoded API key
        const API_KEY = "sk_live_abc123def456";
      </anti_pattern>

      <correct_pattern lang="typescript" title="✅ Environment variables">
        // Use environment variables
        const API_KEY = import.meta.env.VITE_API_KEY;
      </correct_pattern>

      <why>
        Defense in depth. Multiple layers prevent single points of failure.
      </why>

      <reference type="external" url="https://owasp.org/www-project-top-ten/">
        OWASP Top 10
      </reference>
    </rule>

    <rule id="SEC-CR-R5" title="License Compliance (Required)">
      <summary>
        All dependencies MUST have compatible licenses (MIT, Apache 2.0, BSD, ISC). No GPL/AGPL in production.
      </summary>

      <pattern lang="bash" title="License checker">
        # Install
        pnpm add -D license-checker

        # Check licenses
        npx license-checker --summary

        # Fail on incompatible licenses
        npx license-checker --failOn "GPL;AGPL"
      </pattern>

      <acceptable_licenses>
        <license status="✅">MIT, Apache 2.0, BSD (2/3-Clause), ISC</license>
        <license status="⚠️">CC0, Unlicense (verify case-by-case)</license>
        <license status="❌">GPL, AGPL, Commons Clause (copyleft - avoid)</license>
      </acceptable_licenses>

      <ci_integration lang="yaml">
        - name: Check licenses
          run: npx license-checker --failOn "GPL;AGPL;SSPL"
      </ci_integration>

      <why>
        GPL/AGPL require derivative works to be open-sourced. Incompatible with proprietary software using design system.
      </why>

      <reference type="external" url="https://choosealicense.com/">
        Choose a License
      </reference>
    </rule>

</core_rules>

<owasp_top_10 id="SEC-OWASP">
<vulnerability id="SEC-OWASP-V1" number="1" title="Injection (XSS, SQL, Command)">
<risk>Malicious code execution via user input</risk>

      <prevention>
        <method>Use Lit's automatic HTML escaping</method>
        <method>Sanitize with DOMPurify before unsafeHTML</method>
        <method>Validate all prop/attribute inputs</method>
        <method>Never use eval(), new Function(), innerHTML</method>
      </prevention>

      <test lang="typescript">
        it("escapes HTML in user input", async () => {
          element.label = '<script>alert("XSS")</script>';
          await element.updateComplete;
          const text = element.shadowRoot?.textContent;
          expect(text).toContain("</script>"); // Escaped, not executed
        });
      </test>
    </vulnerability>

    <vulnerability id="SEC-OWASP-V2" number="2" title="Broken Authentication">
      <risk>Unauthorized access via weak auth</risk>

      <prevention>
        <method>DO NOT implement authentication in components</method>
        <method>Delegate to app-level auth (OAuth, JWT, etc.)</method>
        <method>Components should only consume auth state, not manage it</method>
      </prevention>

      <anti_pattern lang="typescript" title="❌ Auth logic in component">
        class SandoLogin extends LitElement {
          login(user, pass) {
            if (user === "admin" && pass === "123") {
              // NEVER DO THIS
              this.authenticated = true;
            }
          }
        }
      </anti_pattern>
    </vulnerability>

    <vulnerability id="SEC-OWASP-V3" number="3" title="Sensitive Data Exposure">
      <risk>Leaking secrets, PII, API keys</risk>

      <prevention>
        <method>Never hardcode secrets in components</method>
        <method>Never log sensitive data (PII, tokens, passwords)</method>
        <method>Use environment variables for config</method>
        <method>Sanitize error messages</method>
      </prevention>

      <pattern lang="typescript" title="✅ No sensitive data in logs">
        catch (error) {
          console.error('API request failed'); // Generic message
          // Don't log: error.response.headers.authorization
        }
      </pattern>
    </vulnerability>

    <vulnerability id="SEC-OWASP-V5" number="5" title="Broken Access Control">
      <risk>Unauthorized actions</risk>

      <prevention>
        <method>Components should not enforce access control</method>
        <method>Delegate to backend/app level</method>
        <method>Only show/hide UI based on props (not security boundary)</method>
      </prevention>

      <pattern lang="typescript" title="✅ UI-only restriction">
        render() {
          return this.canDelete
            ? html`<button @click=${this.delete}>Delete</button>`
            : html``;
        }
        // Backend MUST verify canDelete independently
      </pattern>
    </vulnerability>

    <vulnerability id="SEC-OWASP-V6" number="6" title="Security Misconfiguration">
      <risk>Default credentials, verbose errors, open ports</risk>

      <prevention>
        <method>No default passwords/API keys</method>
        <method>Disable debug mode in production</method>
        <method>Secure CSP headers</method>
        <method>Keep dependencies updated</method>
      </prevention>

      <check lang="bash">
        # Audit production build for debug code
        grep -r "console.log" dist/
        grep -r "debugger" dist/
      </check>
    </vulnerability>

    <vulnerability id="SEC-OWASP-V10" number="10" title="Insufficient Logging & Monitoring">
      <risk>Undetected breaches</risk>

      <prevention>
        <method>Log security events (auth failures, validation errors)</method>
        <method>Monitor for anomalies</method>
        <method>Alert on suspicious patterns</method>
      </prevention>

      <pattern lang="typescript">
        // Log security-relevant events
        if (!this.isValidInput(value)) {
          console.warn("[SECURITY] Invalid input detected", {
            component: "sando-input",
            timestamp: Date.now()
            // Don't log the actual invalid value (may contain attack payload)
          });
        }
      </pattern>
    </vulnerability>

</owasp_top_10>

<dependency_security id="SEC-DS">
<npm_audit id="SEC-DS-NA">
<run_on_ci lang="yaml"> - name: Security audit
run: pnpm audit --audit-level=moderate
</run_on_ci>

      <exit_codes>
        <code value="0">No vulnerabilities</code>
        <code value="1">Vulnerabilities found (blocks merge)</code>
      </exit_codes>

      <handling_advisories lang="bash">
        # View details
        pnpm audit

        # Auto-fix (updates to safe versions)
        pnpm audit --fix

        # If no fix available, evaluate risk
        pnpm audit --json > audit.json
        # Review audit.json for severity/exploitability
      </handling_advisories>
    </npm_audit>

    <dependabot id="SEC-DS-DB">
      <summary>
        Automatic PR creation for vulnerable dependencies
      </summary>

      <config lang="yaml" path=".github/dependabot.yml">
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
      </config>

      <benefits>
        <benefit>Automated vulnerability detection</benefit>
        <benefit>PRs with fix suggestions</benefit>
        <benefit>Configurable auto-merge (patch/minor only)</benefit>
      </benefits>
    </dependabot>

    <snyk_integration id="SEC-DS-SI" optional="true">
      <summary>
        Advanced vulnerability scanning
      </summary>

      <installation lang="bash">
        # Install
        pnpm add -D snyk

        # Test
        npx snyk test

        # Monitor in CI
        npx snyk monitor
      </installation>

      <features>
        <feature>Broader vulnerability database than npm audit</feature>
        <feature>License compliance checking</feature>
        <feature>Container scanning (if using Docker)</feature>
      </features>
    </snyk_integration>

</dependency_security>

<secure_build_pipeline id="SEC-SBP">
<code_scanning id="SEC-SBP-CS">
<github_advanced_security lang="yaml" path=".github/workflows/codeql.yml">
name: CodeQL
on: [push, pull_request]
jobs:
analyze:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4 - uses: github/codeql-action/init@v2
with:
languages: javascript - uses: github/codeql-action/analyze@v2
</github_advanced_security>
</code_scanning>

    <secret_scanning id="SEC-SBP-SS">
      <summary>
        Prevent committing secrets
      </summary>

      <installation lang="bash">
        # Install git-secrets
        brew install git-secrets

        # Configure
        git secrets --install
        git secrets --register-aws

        # Scan
        git secrets --scan
      </installation>

      <pre_commit_hook lang="yaml" path=".husky/pre-commit">
        #!/bin/sh
        git secrets --scan
      </pre_commit_hook>
    </secret_scanning>

    <supply_chain_security id="SEC-SBP-SCS">
      <lock_files>
        <item>Commit lock files to version control</item>
        <item>Ensures reproducible builds</item>
        <item>Prevents malicious package updates</item>
      </lock_files>

      <integrity_checks lang="json" file="package.json">
        {
          "dependencies": {
            "lit": "3.3.1" // Pin exact versions for security-critical deps
          }
        }
      </integrity_checks>

      <package_provenance lang="bash" future="true">
        # Verify package signatures
        npm audit signatures
      </package_provenance>
    </supply_chain_security>

</secure_build_pipeline>

<content_security_policy id="SEC-CSP">
<csp_headers id="SEC-CSP-H">
<strict_csp lang="javascript" file="apps/docs/vite.config.js">
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
"frame-ancestors 'none'"
].join("; ")
}
}
});
</strict_csp>
</csp_headers>

    <csp_for_web_components id="SEC-CSP-WC">
      <shadow_dom_css lang="typescript" title="✅ CSP-safe">
        // No inline styles
        static styles = css`
          :host {
            display: block;
          }
        `;
      </shadow_dom_css>

      <avoid_inline_styles>
        <anti_pattern lang="typescript" title="❌ Violates CSP">
          render() {
            return html`<div style="color: red;">Text</div>`;
          }
        </anti_pattern>

        <correct_pattern lang="typescript" title="✅ Use CSS classes">
          render() {
            return html`<div class="error">Text</div>`;
          }
        </correct_pattern>
      </avoid_inline_styles>
    </csp_for_web_components>

    <csp_reporting id="SEC-CSP-R">
      <monitor_violations lang="http">
        Content-Security-Policy-Report-Only:
          default-src 'self';
          report-uri https://example.com/csp-reports
      </monitor_violations>
    </csp_reporting>

</content_security_policy>

<vulnerability_disclosure id="SEC-VD">
<responsible_disclosure id="SEC-VD-RD">
<security_md lang="markdown" path="SECURITY.md"> # Security Policy

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
        - Triage: < 7 days
        - Fix timeline: Based on severity
          - Critical: < 7 days
          - High: < 30 days
          - Medium: < 90 days
          - Low: Next major release

        ## Disclosure Policy

        - Coordinated disclosure (90-day embargo)
        - Public disclosure after fix released
        - Credit given in release notes (if desired)
      </security_md>
    </responsible_disclosure>

    <security_advisories id="SEC-VD-SA">
      <github_advisories>
        <step number="1">Create private advisory</step>
        <step number="2">Assign CVE</step>
        <step number="3">Develop fix</step>
        <step number="4">Coordinate disclosure</step>
        <step number="5">Publish advisory + patch</step>
      </github_advisories>
    </security_advisories>

</vulnerability_disclosure>

<related_guidelines id="SEC-RG">
<reference type="guideline" doc_id="TST" file="../03-development/TESTING_STRATEGY.md">
Security test patterns
</reference>
<reference type="guideline" doc_id="CST" file="../03-development/CODE_STYLE.md">
Secure coding conventions
</reference>
</related_guidelines>

<external_references id="SEC-ER">
<category name="OWASP">
<reference url="https://owasp.org/www-project-top-ten/">OWASP Top 10 - Most critical web vulnerabilities</reference>
<reference url="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html">XSS Prevention Cheat Sheet</reference>
<reference url="https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/">Secure Coding Practices</reference>
</category>

    <category name="CSP">
      <reference url="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">MDN Content Security Policy</reference>
      <reference url="https://csp-evaluator.withgoogle.com/">CSP Evaluator - Test CSP policies</reference>
    </category>

    <category name="Dependency Security">
      <reference url="https://docs.npmjs.com/cli/v8/commands/npm-audit">npm audit - Vulnerability scanning</reference>
      <reference url="https://snyk.io/">Snyk - Advanced dependency scanning</reference>
      <reference url="https://docs.github.com/en/code-security/dependabot">Dependabot - Automated updates</reference>
    </category>

    <category name="Web Components">
      <reference url="https://lit.dev/docs/components/security/">Lit Security - Lit-specific security guidance</reference>
    </category>

</external_references>

  <changelog id="SEC-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline creation</change>
      <change type="IMPROVED">OWASP Top 10 coverage for design systems</change>
      <change type="IMPROVED">XSS prevention: Lit automatic escaping, DOMPurify for unsafeHTML</change>
      <change type="IMPROVED">CSP compliance: No unsafe-inline, Shadow DOM CSS patterns</change>
      <change type="IMPROVED">Dependency scanning: npm audit, Dependabot, Snyk integration</change>
      <change type="IMPROVED">Secure coding practices: Input validation, no hardcoded secrets</change>
      <change type="IMPROVED">License compliance: MIT/Apache/BSD only, avoid GPL/AGPL</change>
      <change type="IMPROVED">Vulnerability severity levels: Critical (less than 24h), High (less than 7d), Moderate (less than 30d), Low (next major)</change>
      <change type="IMPROVED">Secure build pipeline: CodeQL, git-secrets, supply chain security</change>
      <change type="IMPROVED">Vulnerability disclosure policy: SECURITY.md template, coordinated disclosure</change>
      <change type="IMPROVED">Validation checklist: component development, dependencies, build/CI, release</change>
      <change type="NOTE">Agent-optimized format for token efficiency</change>
    </version>
  </changelog>

</guideline>
