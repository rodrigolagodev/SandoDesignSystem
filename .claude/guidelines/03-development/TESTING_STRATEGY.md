<guideline doc_id="TST" category="03-development" version="1.0.0" status="Active" last_updated="2025-11-09" owner="QA Expert">

  <purpose id="TST-PU">
    Establish testing approach for Sando Design System ensuring quality, accessibility, and maintainability through automated testing at unit, accessibility, and integration levels.
  </purpose>

<core_rules id="TST-CR">

    <rule id="TST-CR-R1" title="Test Pyramid Structure (Non-Negotiable)">
      <summary>
        All components follow the test pyramid: 80% unit coverage, 100% accessibility for public components, E2E for critical flows only.
      </summary>

      <pattern lang="text">
        // ✅ Complete coverage
        // sando-button.test.ts (unit)
        // sando-button.a11y.test.ts (accessibility)
        // sando-button.spec.ts (E2E - critical only)
      </pattern>

      <anti_pattern lang="text">
        // ❌ Only E2E tests (slow, brittle, expensive)
        // ❌ No accessibility tests (WCAG violations)
      </anti_pattern>

      <why>Fast feedback, maintainability, cost-effective CI/CD</why>

      <reference type="article" url="https://martinfowler.com/articles/practical-test-pyramid.html">
        Test Pyramid
      </reference>
    </rule>

    <rule id="TST-CR-R2" title="Vitest for Unit Testing (Non-Negotiable)">
      <summary>
        Use Vitest with @open-wc/testing for all component unit tests.
      </summary>

      <required_patterns>
        <pattern>Fixture pattern for rendering</pattern>
        <pattern>`updateComplete` for reactivity</pattern>
        <pattern>Shadow DOM queries</pattern>
        <pattern>Property/attribute reflection</pattern>
        <pattern>Event dispatching</pattern>
      </required_patterns>

      <reference type="source_file" path="packages/components/src/components/button/sando-button.test.ts">
        Complete example
      </reference>

      <config type="file" path="packages/components/vitest.config.js">
        Configuration
      </config>

      <why>Fast, Web Components-aware, great DX</why>
    </rule>

    <rule id="TST-CR-R3" title="Accessibility Testing (Non-Negotiable)">
      <summary>
        100% accessibility coverage for all public components using jest-axe.
      </summary>

      <pattern lang="typescript">
        import { fixture } from "@open-wc/testing";
        import { axe, toHaveNoViolations } from "jest-axe";
        expect.extend(toHaveNoViolations);

        test("meets accessibility standards", async () => {
          const el = await fixture(html`<sando-button>Text</sando-button>`);
          const results = await axe(el);
          expect(results).toHaveNoViolations();
        });
      </pattern>

      <file_naming>{component}.a11y.test.ts (separate from unit tests)</file_naming>

      <reference type="source_file" path="packages/components/src/components/button/sando-button.a11y.test.ts">
        Complete example
      </reference>

      <why>WCAG 2.1 AA compliance, early violation detection</why>
    </rule>

    <rule id="TST-CR-R4" title="Token Testing (Non-Negotiable)">
      <summary>
        Validate token structure, references, contrast ratios, and build output.
      </summary>

      <test_categories>
        <category>Structure: Schema validation, layer integrity</category>
        <category>References: No broken token references</category>
        <category>Accessibility: WCAG contrast ratios</category>
        <category>Build: Valid CSS/TypeScript output</category>
      </test_categories>

      <reference type="directory" path="packages/tokens/tests/">
        All token tests
      </reference>

      <why>Ensures theming system integrity and accessibility</why>
    </rule>

    <rule id="TST-CR-R5" title="Test File Organization (Non-Negotiable)">
      <summary>
        Monolithic structure with all test files colocated with component.
      </summary>

      <structure>
        button/
        ├── sando-button.ts              # Implementation
        ├── sando-button.test.ts         # Unit tests
        ├── sando-button.a11y.test.ts    # Accessibility tests
        ├── sando-button.spec.ts         # E2E tests (critical only)
        └── index.ts                     # Exports
      </structure>

      <why>Easy discovery, clear ownership, portable</why>

      <reference type="guideline" doc_id="CA" file="../02-architecture/COMPONENT_ARCHITECTURE.md">
        Component architecture
      </reference>
    </rule>

</core_rules>

<test_pyramid id="TST-TP">

    <layers>
      <layer name="Unit" coverage="80%" tools="Vitest + @open-wc" files="*.test.ts">
        Component behavior, props, events
      </layer>
      <layer name="A11y" coverage="100%" tools="jest-axe" files="*.a11y.test.ts">
        WCAG compliance
      </layer>
      <layer name="E2E" coverage="Critical" tools="Playwright" files="*.spec.ts">
        User flows, integration
      </layer>
      <layer name="Token" coverage="100%" tools="Vitest" files="tokens/tests/">
        Build output, integrity
      </layer>
    </layers>

    <pyramid_ratio>70% unit : 20% a11y : 10% E2E</pyramid_ratio>

    <anti_pattern>Heavy E2E testing (slow CI, flaky tests, high maintenance)</anti_pattern>

</test_pyramid>

<unit_testing id="TST-UT">

    <configuration file="vitest.config.js" path="packages/components/">
      <setting>Environment: `jsdom` (Web Components support)</setting>
      <setting>Coverage: 80% threshold (lines, functions, branches, statements)</setting>
      <setting>Globals: `true` (describe, it, expect)</setting>
      <setting>setupFiles: `vitest.setup.js` (jest-axe matchers)</setting>
    </configuration>

    <test_patterns>
      <pattern name="Fixture">Render component: `await fixture&lt;T&gt;(html\`...\`)`</pattern>
      <pattern name="updateComplete">Wait for reactivity: `await element.updateComplete`</pattern>
      <pattern name="Shadow DOM">Query internal elements: `element.shadowRoot?.querySelector()`</pattern>
      <pattern name="Property reflection">Test property/attribute sync: `element.disabled = true`</pattern>
      <pattern name="Event testing">Verify event dispatch: `element.addEventListener('click', ...)`</pattern>
      <pattern name="Slot testing">Verify slot content: `element.querySelector('[slot="icon"]')`</pattern>
    </test_patterns>

    <test_organization lang="typescript">
      describe("sando-button", () => {
        describe("rendering", () => {
          /* ... */
        });
        describe("properties", () => {
          /* ... */
        });
        describe("events", () => {
          /* ... */
        });
        describe("accessibility", () => {
          /* ... */
        });
      });
    </test_organization>

    <commands>
      <command>pnpm --filter @sando/components test</command>
      <command>pnpm --filter @sando/components test:watch</command>
      <command>pnpm --filter @sando/components test:coverage</command>
      <command>pnpm --filter @sando/components test:ui</command>
    </commands>

    <reference type="source_file" path="packages/components/src/components/button/sando-button.test.ts">
      Reference implementation
    </reference>

</unit_testing>

<accessibility_testing id="TST-AT">

    <requirements>
      <requirement>Coverage: 100% for all public components</requirement>
      <requirement>Tool: jest-axe (automated WCAG validation)</requirement>
      <requirement>Standard: WCAG 2.1 AA compliance minimum</requirement>
      <requirement>File naming: {component}.a11y.test.ts</requirement>
    </requirements>

    <test_cases>
      <case>Default state - Baseline accessibility</case>
      <case>All variants - Variant-specific rules</case>
      <case>Disabled state - Disabled semantics</case>
      <case>Interactive states - Focus, hover, active</case>
      <case>With icons - Icon accessibility</case>
      <case>Custom content - Slot content validation</case>
    </test_cases>

    <common_violations>
      <violation issue="Missing label" fix="Add aria-label or text content" />
      <violation issue="Low contrast" fix="Adjust token values" />
      <violation issue="Missing role" fix="Add ARIA role" />
      <violation issue="Keyboard trap" fix="Fix focus management" />
      <violation issue="Missing alt text" fix="Add alt to images" />
    </common_violations>

    <reference type="source_file" path="packages/components/src/components/button/sando-button.a11y.test.ts">
      Reference test
    </reference>

    <reference type="specification" url="https://www.w3.org/WAI/WCAG21/quickref/">
      WCAG 2.1 Guidelines
    </reference>

</accessibility_testing>

<token_testing id="TST-TT">

    <test_suites location="packages/tokens/tests/">
      <suite name="Structure" files="structure/*.test.ts">
        Schema validation: Token format, required fields
      </suite>
      <suite name="References" files="tokens/*.test.ts">
        Reference integrity: No broken references, correct layer
      </suite>
      <suite name="Accessibility" files="accessibility/*.test.ts">
        WCAG contrast: 4.5:1 AA, 7:1 AAA, 3:1 UI
      </suite>
      <suite name="Build" files="build/*.test.ts">
        Output validation: Valid CSS/TS, correct transforms
      </suite>
    </test_suites>

    <contrast_requirements>
      <requirement type="Body text" ratio="4.5:1" standard="WCAG AA">Normal text</requirement>
      <requirement type="Large text (18pt+)" ratio="3:1" standard="WCAG AA">Headings</requirement>
      <requirement type="UI components" ratio="3:1" standard="WCAG AA">Borders, icons</requirement>
      <requirement type="Enhanced" ratio="7:1" standard="WCAG AAA">High contrast</requirement>
    </contrast_requirements>

    <formula>
      (L1 + 0.05) / (L2 + 0.05) where L1 is lighter color
    </formula>

    <commands>
      <command>pnpm --filter @sando/tokens test</command>
      <command>pnpm --filter @sando/tokens test:structure</command>
      <command>pnpm --filter @sando/tokens test:accessibility</command>
      <command>pnpm --filter @sando/tokens test:build</command>
      <command>pnpm --filter @sando/tokens test:coverage</command>
    </commands>

</token_testing>

<e2e_testing id="TST-E2E">

    <when_to_write>
      <write_for>
        <item>Multi-component interactions</item>
        <item>Critical user flows</item>
        <item>Form submissions</item>
        <item>Navigation flows</item>
        <item>State persistence</item>
      </write_for>

      <dont_write_for>
        <item>Component variants (use unit tests)</item>
        <item>Property changes (use unit tests)</item>
        <item>Styling (use visual regression)</item>
        <item>Isolated components (use unit tests)</item>
      </dont_write_for>
    </when_to_write>

    <tool>Playwright (packages/components/playwright.config.js)</tool>

    <commands>
      <command>pnpm --filter @sando/components test:e2e</command>
      <command>pnpm --filter @sando/components test:e2e:ui</command>
    </commands>

    <reference type="source_file" path="packages/components/src/components/button/sando-button.spec.ts">
      Reference E2E test
    </reference>

</e2e_testing>

<coverage_requirements id="TST-COV">

    <thresholds source="packages/components/vitest.config.js">
      <threshold metric="Lines" value="80%">All component code</threshold>
      <threshold metric="Functions" value="80%">All exported functions</threshold>
      <threshold metric="Branches" value="80%">All code paths</threshold>
      <threshold metric="Statements" value="80%">All statements</threshold>
      <threshold metric="A11y" value="100%">Public components only</threshold>
    </thresholds>

    <exclusions>
      <exclude>*.stories.ts (Storybook documentation)</exclude>
      <exclude>*.types.ts (TypeScript types)</exclude>
      <exclude>index.ts (Barrel exports)</exclude>
      <exclude>*.spec.ts (E2E tests)</exclude>
    </exclusions>

    <viewing_coverage>
      <command>pnpm --filter @sando/components test:coverage</command>
      <view>open packages/components/coverage/index.html</view>
    </viewing_coverage>

</coverage_requirements>

<test_commands id="TST-CMD">

    <global location="root">
      <command>pnpm test                    # All tests (tokens + components)</command>
      <command>pnpm test:watch              # Watch mode</command>
      <command>pnpm test:coverage           # Coverage report</command>
    </global>

    <components location="packages/components">
      <command>pnpm --filter @sando/components test              # Unit + A11y</command>
      <command>pnpm --filter @sando/components test:watch        # Watch mode</command>
      <command>pnpm --filter @sando/components test:ui           # Vitest UI</command>
      <command>pnpm --filter @sando/components test:coverage     # Coverage</command>
      <command>pnpm --filter @sando/components test:e2e          # Playwright E2E</command>
      <command>pnpm --filter @sando/components test:e2e:ui       # Playwright UI</command>
    </components>

    <tokens location="packages/tokens">
      <command>pnpm --filter @sando/tokens test                  # All token tests</command>
      <command>pnpm --filter @sando/tokens test:structure        # Structure validation</command>
      <command>pnpm --filter @sando/tokens test:accessibility    # Contrast tests</command>
      <command>pnpm --filter @sando/tokens test:build            # Build output tests</command>
      <command>pnpm --filter @sando/tokens test:coverage         # Coverage</command>
    </tokens>

</test_commands>

<related_guidelines id="TST-RG">
<reference
      type="guideline"
      doc_id="CST"
      file="CODE_STYLE.md"
      category="03-development">
Code standards
</reference>

    <reference
      type="guideline"
      doc_id="NC"
      file="NAMING_CONVENTIONS.md"
      category="03-development">
      File naming
    </reference>

    <reference
      type="guideline"
      doc_id="CA"
      file="../02-architecture/COMPONENT_ARCHITECTURE.md"
      category="02-architecture">
      Component structure
    </reference>

    <reference
      type="guideline"
      doc_id="TA"
      file="../01-design-system/TOKEN_ARCHITECTURE.md"
      category="01-design-system">
      Token system
    </reference>

</related_guidelines>

<external_references id="TST-ER">

    <tools>
      <tool url="https://vitest.dev/" title="Vitest">
        Unit test framework
      </tool>
      <tool url="https://open-wc.org/docs/testing/testing-package/" title="@open-wc/testing">
        Web Components testing utilities
      </tool>
      <tool url="https://github.com/nickcolley/jest-axe" title="jest-axe">
        Accessibility testing
      </tool>
      <tool url="https://playwright.dev/" title="Playwright">
        E2E testing
      </tool>
    </tools>

    <standards>
      <standard url="https://www.w3.org/WAI/WCAG21/quickref/" title="WCAG 2.1">
        Accessibility guidelines
      </standard>
      <standard url="https://martinfowler.com/articles/practical-test-pyramid.html" title="Test Pyramid">
        Testing strategy
      </standard>
    </standards>

</external_references>

  <changelog id="TST-CL">
    <version number="1.0.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="INITIAL">Initial guideline creation</change>
      <change type="NEW">Test pyramid structure (80% unit, 100% a11y, critical E2E)</change>
      <change type="NEW">Vitest + @open-wc/testing patterns</change>
      <change type="NEW">jest-axe accessibility testing</change>
      <change type="NEW">Token testing strategy</change>
      <change type="NEW">Coverage requirements (80% threshold)</change>
      <change type="NEW">Validation checklists</change>
    </version>
  </changelog>

  <conclusion>
    Testing ensures quality and accessibility across the design system. Start with the basics, season with meaning, and serve with style.
  </conclusion>

</guideline>
