<guideline doc_id="TC" category="05-quality" version="1.0.0" status="Active" last_updated="2025-11-09" owner="QA Expert">

  <purpose id="TC-PU">
    Ensure comprehensive test coverage across the Sando Design System through automated thresholds, coverage gates in CI, and continuous monitoring. Defines coverage requirements, exclusion patterns, reporting strategies, and quality enforcement for unit tests, accessibility tests, and integration tests.
  </purpose>

  <targets id="TC-TGT">
    <target>80% coverage minimum (unit tests)</target>
    <target>100% coverage (accessibility for public components)</target>
  </targets>

  <scope id="TC-SC">
    Components, tokens, utilities, build scripts
  </scope>

  <enforcement id="TC-ENF">
    CI blocks PRs below thresholds
  </enforcement>

<core_rules id="TC-CR">
<rule id="TC-CR-R1" title="80% Coverage Minimum (Non-Negotiable)">

<summary>
All production code MUST meet 80% coverage across lines, functions, branches, and statements.
</summary>

      <pattern lang="javascript" title="Vitest coverage configuration">
        // From packages/components/vitest.config.js
        coverage: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80
        }
      </pattern>

      <metrics>
        <metric name="Lines">% of executable lines covered by tests</metric>
        <metric name="Functions">% of functions/methods called during tests</metric>
        <metric name="Branches">% of conditional paths (if/else, switch, ternary) tested</metric>
        <metric name="Statements">% of statements executed (similar to lines)</metric>
      </metrics>

      <why>
        80% is industry standard balancing thoroughness with diminishing returns. Higher thresholds require exponentially more effort for marginal gains.
      </why>

      <reference type="source_file" path="packages/components/vitest.config.js" lines="40-43">
        Coverage thresholds configuration
      </reference>
    </rule>

    <rule id="TC-CR-R2" title="100% Accessibility Coverage (Non-Negotiable)">
      <summary>
        All public components MUST have dedicated .a11y.test.ts files with jest-axe validation for ALL states, variants, and flavors.
      </summary>

      <pattern lang="typescript" title="Accessibility test example">
        // sando-button.a11y.test.ts
        describe.each(["original", "strawberry", "ocean"])("flavor: %s", (flavor) => {
          it("meets WCAG 2.1 AA", async () => {
            const el = await fixture(
              `<div flavor="${flavor}"><sando-button>Test</sando-button></div>`,
            );
            expect(await axe(el)).toHaveNoViolations();
          });
        });
      </pattern>

      <coverage_includes>
        <item>Default state</item>
        <item>All variants (solid, outline, ghost, etc.)</item>
        <item>All sizes (small, medium, large)</item>
        <item>Disabled, loading, error states</item>
        <item>All 5 flavors (original, strawberry, ocean, forest, sunset)</item>
        <item>Dark mode (if mode-specific behavior exists)</item>
      </coverage_includes>

      <why>
        WCAG compliance is non-negotiable. Accessibility regressions can exclude users and create legal liability.
      </why>

      <reference type="guideline" doc_id="WC" file="../04-accessibility/WCAG_COMPLIANCE.md">
        WCAG compliance requirements
      </reference>
    </rule>

    <rule id="TC-CR-R3" title="Coverage Gates in CI (Non-Negotiable)">
      <summary>
        CI MUST fail if coverage drops below 80% threshold or if accessibility tests fail.
      </summary>

      <pattern lang="yaml" title="GitHub Actions coverage workflow">
        - name: Run tests with coverage
          run: pnpm test:coverage

        - name: Check coverage thresholds
          run: |
            # Vitest automatically fails if below thresholds
            # No additional check needed
      </pattern>

      <enforcement>
        <item>Vitest exits with code 1 if below 80%</item>
        <item>PR merge blocked automatically</item>
        <item>Coverage report uploaded to PR comments</item>
      </enforcement>

      <why>
        Prevents coverage regression. Thresholds are meaningless without enforcement.
      </why>

      <reference type="source_file" path=".github/workflows/test.yml">
        CI configuration
      </reference>
    </rule>

    <rule id="TC-CR-R4" title="Exclude Non-Production Code (Required)">
      <summary>
        Test files, stories, type definitions, and barrel exports MUST be excluded from coverage calculation.
      </summary>

      <pattern lang="javascript" title="Coverage exclusions">
        // From vitest.config.js
        coverage: {
          exclude: [
            "**/*.test.ts",      // Unit tests
            "**/*.spec.ts",      // E2E tests
            "**/*.a11y.test.ts", // Accessibility tests
            "**/*.stories.ts",   // Storybook documentation
            "**/*.types.ts",     // TypeScript type definitions
            "index.ts",          // Barrel exports
          ]
        }
      </pattern>

      <why>
        Including test files inflates coverage artificially. Barrel exports are trivial re-exports with no logic to test.
      </why>

      <reference type="source_file" path="packages/components/vitest.config.js" lines="29-36">
        Exclusion patterns
      </reference>
    </rule>

    <rule id="TC-CR-R5" title="Monitor Coverage Trends (Required)">
      <summary>
        Track coverage over time to detect regressions and identify low-coverage areas.
      </summary>

      <pattern lang="bash">
        # Generate coverage report
        pnpm test:coverage

        # View HTML report
        open packages/components/coverage/index.html

        # CI uploads to Codecov/Coveralls (future)
      </pattern>

      <metrics_to_track>
        <metric>Overall coverage % (target: 80%+)</metric>
        <metric>Per-file coverage (identify gaps)</metric>
        <metric>Trend over time (detect regressions)</metric>
        <metric>Uncovered lines/branches (prioritize testing)</metric>
      </metrics_to_track>

      <why>
        80% is minimum, not target. Monitoring identifies opportunities for improvement and prevents gradual erosion.
      </why>

      <reference type="source_file" path="packages/components/coverage/">
        Coverage reports directory
      </reference>
    </rule>

</core_rules>

<coverage_thresholds id="TC-CT">
<component_coverage id="TC-CT-CC">

  <summary>
  From packages/components/vitest.config.js
  </summary>

        <thresholds>
          <threshold metric="Lines" value="80%" applies_to="All .ts files in src/" enforcement="Vitest exits 1 if below"/>
          <threshold metric="Functions" value="80%" applies_to="All exported functions" enforcement="Vitest exits 1 if below"/>
          <threshold metric="Branches" value="80%" applies_to="All conditional paths" enforcement="Vitest exits 1 if below"/>
          <threshold metric="Statements" value="80%" applies_to="All statements" enforcement="Vitest exits 1 if below"/>
        </thresholds>

        <exclusions>
          *.test.ts, *.spec.ts, *.a11y.test.ts, *.stories.ts, *.types.ts, index.ts
        </exclusions>
      </component_coverage>

      <token_coverage id="TC-CT-TKC">
        <summary>
          From packages/tokens/vitest.config.js
        </summary>

        <thresholds>
          <threshold metric="Lines" value="80%" applies_to="Build scripts in build/" enforcement="Vitest exits 1 if below"/>
          <threshold metric="Functions" value="80%" applies_to="Build orchestrator, transforms" enforcement="Vitest exits 1 if below"/>
          <threshold metric="Branches" value="80%" applies_to="Conditional logic in builds" enforcement="Vitest exits 1 if below"/>
          <threshold metric="Statements" value="80%" applies_to="All statements" enforcement="Vitest exits 1 if below"/>
        </thresholds>

        <exclusions>
          tests/, *.test.js, *.spec.js, vitest.config.js
        </exclusions>

        <note>
          Token JSON files are validated via structure/reference tests, not coverage metrics.
        </note>
      </token_coverage>

      <accessibility_coverage id="TC-CT-A11Y">
        <requirements>
          <requirement area="Public components" threshold="100%" enforcement="Manual checklist verification"/>
          <requirement area="Component states" threshold="100%" enforcement="All states/variants tested"/>
          <requirement area="Flavors" threshold="100%" enforcement="All 5 flavors validated"/>
          <requirement area="WCAG violations" threshold="0" enforcement="jest-axe toHaveNoViolations"/>
        </requirements>

        <reference type="guideline" doc_id="WC" file="../04-accessibility/WCAG_COMPLIANCE.md">
          WCAG compliance requirements
        </reference>
      </accessibility_coverage>

</coverage_thresholds>

<coverage_reports id="TC-CR">
<providers id="TC-CR-PRV">
<provider name="v8" status="default">
<description>Fast, accurate, built into Node.js</description>
<config lang="javascript">
coverage: {
provider: 'v8',
reporter: ['text', 'html', 'lcov'],
reportsDirectory: './coverage'
}
</config>
</provider>

      <provider name="istanbul" status="alternative">
        <description>More mature, slower, better IDE integration</description>
        <config lang="javascript">
          coverage: {
            provider: 'istanbul',
            reporter: ['text', 'html', 'json-summary']
          }
        </config>
      </provider>

      <sando_uses>
        v8 provider (default)
      </sando_uses>
    </providers>

    <report_formats id="TC-CR-RF">
      <formats>
        <format name="text" purpose="Terminal output" file="stdout" view="Automatic in CI"/>
        <format name="html" purpose="Interactive browser UI" file="coverage/index.html" view="open coverage/index.html"/>
        <format name="lcov" purpose="CI integration (Codecov)" file="coverage/lcov.info" view="Upload to Codecov/Coveralls"/>
        <format name="json" purpose="Programmatic parsing" file="coverage/coverage-final.json" view="Parse with scripts"/>
      </formats>

      <example_output lang="text">
        File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
        -----------------------|---------|----------|---------|---------|-------------------
        All files              |   85.23 |    82.45 |   88.12 |   85.67 |
         sando-button.ts       |   92.45 |    89.23 |   95.12 |   93.23 | 127-130, 245
         sando-input.ts        |   78.34 |    75.67 |   81.23 |   79.12 | 45-52, 89-95
      </example_output>
    </report_formats>

    <viewing_reports id="TC-CR-VR">
      <pattern lang="bash">
        # Generate coverage (components)
        cd packages/components
        pnpm test:coverage

        # View HTML report (interactive)
        open coverage/index.html

        # Generate coverage (tokens)
        cd packages/tokens
        pnpm test:coverage
        open coverage/index.html
      </pattern>

      <html_report_features>
        <feature>File-by-file breakdown</feature>
        <feature>Line-by-line highlighting (green=covered, red=uncovered, yellow=partial branch)</feature>
        <feature>Sortable by coverage %</feature>
        <feature>Drill-down to specific uncovered lines</feature>
      </html_report_features>
    </viewing_reports>

</coverage_reports>

<ci_integration id="TC-CI">
<github_actions id="TC-CI-GHA">
<workflow lang="yaml">
name: Test Coverage
on: [push, pull_request]

        jobs:
          coverage:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@v4
              - uses: pnpm/action-setup@v2
                with:
                  version: 8

              - name: Install dependencies
                run: pnpm install

              - name: Build tokens (required before components)
                run: pnpm --filter @sando/tokens build

              - name: Run component tests with coverage
                run: pnpm --filter @sando/components test:coverage

              - name: Run token tests with coverage
                run: pnpm --filter @sando/tokens test:coverage

              # Vitest automatically fails if below 80% threshold
              # No additional checks needed

              - name: Upload coverage to Codecov (future)
                uses: codecov/codecov-action@v3
                with:
                  files: ./packages/components/coverage/lcov.info
      </workflow>

      <coverage_enforcement>
        <item>Vitest exits with code 1 if below thresholds</item>
        <item>GitHub Actions marks job as failed</item>
        <item>PR merge blocked by branch protection rules</item>
      </coverage_enforcement>

      <future_enhancements>
        <enhancement>Upload to Codecov/Coveralls for PR comments</enhancement>
        <enhancement>Generate coverage badges</enhancement>
        <enhancement>Trend tracking over time</enhancement>
      </future_enhancements>
    </github_actions>

</ci_integration>

<improving_low_coverage id="TC-ILC">
<identifying_gaps id="TC-ILC-IG">
<steps>
<step number="1">View HTML report: pnpm test:coverage && open coverage/index.html</step>
<step number="2">Sort by coverage %: Click "% Stmts" column header</step>
<step number="3">Focus on red files: less than 80% coverage</step>
<step number="4">Drill down: Click filename to see uncovered lines</step>
</steps>
</identifying_gaps>

    <common_patterns id="TC-ILC-CP">
      <patterns>
        <pattern area="Error handlers" typical_coverage="40-60%" reason="Hard to trigger" solution="Mock errors, test edge cases"/>
        <pattern area="Private methods" typical_coverage="0%" reason="Not called directly" solution="Test via public API"/>
        <pattern area="Legacy code" typical_coverage="20-40%" reason="Pre-testing era" solution="Incremental refactoring + tests"/>
        <pattern area="Complex conditionals" typical_coverage="50-70%" reason="Many branches" solution="Parametrized tests (describe.each)"/>
        <pattern area="Async code" typical_coverage="60-75%" reason="Race conditions" solution="Use await properly, test all states"/>
      </patterns>
    </common_patterns>

    <improvement_strategies id="TC-ILC-IS">
      <parametrized_tests title="Cover many cases with one test">
        <pattern lang="typescript">
          describe.each([
            ["small", "32px"],
            ["medium", "40px"],
            ["large", "48px"],
          ])("size: %s", (size, expectedHeight) => {
            it(`renders ${size} with ${expectedHeight} height`, async () => {
              const el = await fixture(
                `<sando-button size="${size}">Test</sando-button>`,
              );
              expect(el.clientHeight).toBe(parseInt(expectedHeight));
            });
          });
        </pattern>
      </parametrized_tests>

      <edge_cases title="Test boundary conditions">
        <pattern lang="typescript">
          it("handles empty string gracefully", () => {
            element.label = "";
            expect(element.hasAttribute("aria-label")).toBe(false);
          });

          it("handles very long text", () => {
            element.label = "A".repeat(1000);
            expect(element.shadowRoot.textContent.length).toBeLessThanOrEqual(1000);
          });
        </pattern>
      </edge_cases>

      <mock_dependencies title="Test error scenarios">
        <pattern lang="typescript">
          import { vi } from "vitest";

          it("handles fetch errors", async () => {
            vi.spyOn(window, "fetch").mockRejectedValue(new Error("Network error"));
            await expect(fetchData()).rejects.toThrow("Network error");
          });
        </pattern>
      </mock_dependencies>
    </improvement_strategies>

</improving_low_coverage>

<coverage_anti_patterns id="TC-AP">
<anti_pattern id="TC-AP-AP1" title="Testing Implementation Details">
<wrong lang="typescript">
it("calls \_handleClick private method", () => {
const spy = vi.spyOn(element, "\_handleClick");
element.click();
expect(spy).toHaveBeenCalled();
});
</wrong>

      <correct lang="typescript">
        it("dispatches click event when clicked", () => {
          const handler = vi.fn();
          element.addEventListener("click", handler);
          element.click();
          expect(handler).toHaveBeenCalled();
        });
      </correct>

      <why>
        Private methods are implementation details. Test behavior, not implementation.
      </why>
    </anti_pattern>

    <anti_pattern id="TC-AP-AP2" title="Coverage for Coverage's Sake">
      <wrong lang="typescript">
        it("covers line 127", () => {
          element._internalFlag = true; // Just to hit the line
          expect(element._internalFlag).toBe(true);
        });
      </wrong>

      <correct lang="typescript">
        it("disables button when loading", () => {
          element.loading = true;
          expect(element.disabled).toBe(true);
        });
      </correct>

      <why>
        Tests should validate behavior meaningful to users, not arbitrary code execution.
      </why>
    </anti_pattern>

    <anti_pattern id="TC-AP-AP3" title="Ignoring Branch Coverage">
      <wrong lang="typescript" title="Only tests happy path">
        it("validates email", () => {
          expect(validateEmail("test@example.com")).toBe(true);
        });
      </wrong>

      <correct lang="typescript" title="Tests both branches">
        describe("email validation", () => {
          it("accepts valid emails", () => {
            expect(validateEmail("test@example.com")).toBe(true);
          });

          it("rejects invalid emails", () => {
            expect(validateEmail("invalid")).toBe(false);
            expect(validateEmail("")).toBe(false);
            expect(validateEmail("test@")).toBe(false);
          });
        });
      </correct>

      <why>
        Branch coverage ensures all conditional paths are tested.
      </why>
    </anti_pattern>

</coverage_anti_patterns>

<related_guidelines id="TC-RG">
<reference type="guideline" doc_id="TST" file="../03-development/TESTING_STRATEGY.md">
Overall testing approach (pyramid, tools, file structure)
</reference>
<reference type="guideline" doc_id="WC" file="../04-accessibility/WCAG_COMPLIANCE.md">
Accessibility testing requirements
</reference>
<reference type="guideline" doc_id="CS" file="../03-development/CODE_STYLE.md">
Code organization for testability
</reference>
</related_guidelines>

<external_references id="TC-ER">
<category name="Coverage Tools">
<reference url="https://vitest.dev/guide/coverage.html">Vitest Coverage - Official documentation</reference>
<reference url="https://v8.dev/blog/javascript-code-coverage">V8 Coverage - V8 native coverage</reference>
<reference url="https://istanbul.js.org/">Istanbul - Alternative coverage tool</reference>
</category>

    <category name="Best Practices">
      <reference url="https://martinfowler.com/bliki/TestCoverage.html">Martin Fowler - Test Coverage philosophy</reference>
      <reference url="https://testing.googleblog.com/">Google Testing Blog - Industry best practices</reference>
    </category>

    <category name="CI Integration">
      <reference url="https://codecov.io/">Codecov - Coverage tracking service</reference>
      <reference url="https://coveralls.io/">Coveralls - Coverage badges and trends</reference>
    </category>

</external_references>

  <changelog id="TC-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline creation</change>
      <change type="IMPROVED">80% coverage threshold across lines, functions, branches, statements</change>
      <change type="IMPROVED">100% accessibility coverage requirement for public components</change>
      <change type="IMPROVED">CI enforcement with Vitest automatic failure</change>
      <change type="IMPROVED">Coverage exclusion patterns (test files, stories, types, index files)</change>
      <change type="IMPROVED">Report formats (text, html, lcov, json)</change>
      <change type="IMPROVED">HTML report viewing instructions</change>
      <change type="IMPROVED">GitHub Actions CI integration pattern</change>
      <change type="IMPROVED">Strategies for improving low coverage (parametrized tests, edge cases, mocks)</change>
      <change type="IMPROVED">Coverage anti-patterns (implementation details, coverage for sake, ignoring branches)</change>
      <change type="IMPROVED">Validation checklist (creation, accessibility, CI/CD, monitoring)</change>
      <change type="NOTE">References to vitest.config.js (components lines 40-43, tokens lines 29-33)</change>
      <change type="NOTE">Agent-optimized XML format for token efficiency</change>
      <change type="NOTE">Coverage is a means to an end: high-quality, well-tested code. Focus on meaningful tests, not arbitrary metrics.</change>
    </version>
  </changelog>

</guideline>
