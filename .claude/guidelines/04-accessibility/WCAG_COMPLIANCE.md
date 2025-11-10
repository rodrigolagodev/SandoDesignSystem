<guideline doc_id="WC" category="04-accessibility" version="1.0.0" status="Active" last_updated="2025-11-09" owner="QA Expert">

  <purpose id="WC-PU">
    Ensure all Sando Design System components meet WCAG 2.1 Level AA standards through automated testing, semantic HTML, and proper ARIA patterns.
  </purpose>

<core_rules id="WC-CR">

    <rule id="WC-CR-R1" title="WCAG 2.1 Level AA Compliance (Non-Negotiable)">
      <summary>
        All components MUST pass WCAG 2.1 Level AA automated testing. Aim for AAA where feasible.
      </summary>

      <pattern lang="typescript">
        import { axe, toHaveNoViolations } from "jest-axe";

        it("should have no a11y violations", async () => {
          const results = await axe(element);
          expect(results).toHaveNoViolations();
        });
      </pattern>

      <why>Legal requirement (ADA, Section 508), better UX for all users, inclusive design</why>

      <reference type="specification" url="https://www.w3.org/WAI/WCAG21/quickref/">
        WCAG 2.1 Quick Reference
      </reference>
    </rule>

    <rule id="WC-CR-R2" title="Automated Testing with axe-core (Non-Negotiable)">
      <summary>
        Every component MUST have `.a11y.test.ts` file using jest-axe with 100% state coverage.
      </summary>

      <pattern lang="typescript">
        // sando-button.a11y.test.ts
        describe("accessibility", () => {
          it("default state", async () => {
            const el = await fixture("<sando-button>Click</sando-button>");
            expect(await axe(el)).toHaveNoViolations();
          });
        });
      </pattern>

      <why>Catches 57% of WCAG issues automatically, prevents regressions, fast feedback</why>

      <reference type="source_file" path="packages/components/src/components/button/sando-button.a11y.test.ts">
        Complete example
      </reference>
    </rule>

    <rule id="WC-CR-R3" title="Semantic HTML First">
      <summary>
        Use native HTML elements over ARIA whenever possible. Progressive enhancement required.
      </summary>

      <pattern lang="html">
        <!-- ✅ CORRECT -->
        <button type="button">Submit</button>
      </pattern>

      <anti_pattern lang="html">
        <!-- ❌ WRONG -->
        <div role="button" tabindex="0">Submit</div>
      </anti_pattern>

      <why>Native elements have built-in accessibility, keyboard support, screen reader support</why>

      <reference type="specification" url="https://www.w3.org/TR/html-aria/">
        HTML5 Accessibility
      </reference>
    </rule>

    <rule id="WC-CR-R4" title="ARIA Patterns When Needed">
      <summary>
        Follow WAI-ARIA Authoring Practices. Use ARIA only when semantic HTML insufficient.
      </summary>

      <five_rules_of_aria>
        <rule number="1">Use native HTML if possible</rule>
        <rule number="2">Don't change native semantics</rule>
        <rule number="3">All interactive ARIA controls must be keyboard accessible</rule>
        <rule number="4">Don't use role="presentation" or aria-hidden on focusable elements</rule>
        <rule number="5">All interactive elements must have accessible names</rule>
      </five_rules_of_aria>

      <reference type="guide" url="https://www.w3.org/WAI/ARIA/apg/">
        WAI-ARIA APG
      </reference>
    </rule>

    <rule id="WC-CR-R5" title="Testing Across States and Themes">
      <summary>
        Test ALL component states, ALL flavors, ALL modes (dark, high-contrast, reduced motion).
      </summary>

      <pattern lang="typescript">
        describe.each(["original", "strawberry", "ocean"])("flavor: %s", (flavor) => {
          it("meets contrast requirements", async () => {
            const el = await fixture(
              `<div flavor="${flavor}"><sando-button>Test</sando-button></div>`
            );
            expect(await axe(el)).toHaveNoViolations();
          });
        });
      </pattern>

      <why>Ensures accessibility across all visual variations and user preferences</why>

      <reference type="source_file" path="packages/tokens/tests/accessibility/contrast.test.js">
        Token contrast tests
      </reference>
    </rule>

</core_rules>

<wcag_success_criteria id="WC-SC">

<summary>Key criteria for design systems</summary>

    <criteria>
      <criterion id="1.4.3" level="AA" title="Contrast (Minimum)">
        <requirement>4.5:1 normal text, 3:1 large text</requirement>
        <impact>Token contrast validation</impact>
      </criterion>

      <criterion id="1.4.6" level="AAA" title="Contrast (Enhanced)">
        <requirement>7:1 normal text, 4.5:1 large text</requirement>
        <impact>Color system design</impact>
      </criterion>

      <criterion id="1.4.11" level="AA" title="Non-text Contrast">
        <requirement>3:1 UI components</requirement>
        <impact>Icons, borders, focus indicators</impact>
      </criterion>

      <criterion id="2.1.1" level="A" title="Keyboard">
        <requirement>All functionality via keyboard</requirement>
        <impact>Component interaction design</impact>
      </criterion>

      <criterion id="2.1.2" level="A" title="No Keyboard Trap">
        <requirement>No focus traps</requirement>
        <impact>Modal, dialog, overlay patterns</impact>
      </criterion>

      <criterion id="2.4.7" level="AA" title="Focus Visible">
        <requirement>Visible focus indicator</requirement>
        <impact>Focus ring tokens</impact>
      </criterion>

      <criterion id="4.1.2" level="A" title="Name, Role, Value">
        <requirement>Accessible names/roles</requirement>
        <impact>ARIA labels, semantic HTML</impact>
      </criterion>

      <criterion id="4.1.3" level="AA" title="Status Messages">
        <requirement>Status announcements</requirement>
        <impact>aria-live, role="status"</impact>
      </criterion>
    </criteria>

    <additional_criteria>
      <criterion id="1.3.1" level="A">Info and Relationships - Semantic structure</criterion>
      <criterion id="2.4.3" level="A">Focus Order - Logical tab order</criterion>
      <criterion id="3.2.1" level="A">On Focus - No unexpected context changes</criterion>
      <criterion id="3.3.1" level="A">Error Identification - Clear error messages</criterion>
      <criterion id="3.3.2" level="A">Labels or Instructions - Form labels</criterion>
    </additional_criteria>

    <testing_approach>
      <automated>axe-core catches Level A and AA violations</automated>
      <manual>Keyboard navigation, screen reader testing</manual>
      <color_contrast>Token validation tests</color_contrast>
    </testing_approach>

    <reference type="specification" url="https://www.w3.org/WAI/WCAG21/quickref/">
      Full WCAG 2.1 spec
    </reference>

</wcag_success_criteria>

<automated_testing id="WC-AT">

    <jest_axe_setup>
      <installation>Already configured in Sando (pnpm add -D jest-axe @axe-core/playwright)</installation>

      <basic_pattern lang="typescript">
        import { fixture, expect } from "@open-wc/testing";
        import { axe, toHaveNoViolations } from "jest-axe";
        import "./sando-button";

        expect.extend(toHaveNoViolations);

        describe("sando-button a11y", () => {
          it("should have no violations", async () => {
            const el = await fixture("<sando-button>Click me</sando-button>");
            const results = await axe(el);
            expect(results).toHaveNoViolations();
          });
        });
      </basic_pattern>
    </jest_axe_setup>

    <testing_all_states lang="typescript">
      it("disabled state", async () => {
        const el = await fixture("<sando-button disabled>Disabled</sando-button>");
        expect(await axe(el)).toHaveNoViolations();
      });

      it("loading state", async () => {
        const el = await fixture("<sando-button loading>Loading</sando-button>");
        expect(await axe(el)).toHaveNoViolations();
      });
    </testing_all_states>

    <testing_all_flavors lang="typescript">
      const flavors = ["original", "strawberry", "ocean", "forest", "sunset"];

      describe.each(flavors)("flavor: %s", (flavor) => {
        it("meets accessibility standards", async () => {
          const el = await fixture(`
            <div flavor="${flavor}">
              <sando-button>Test</sando-button>
            </div>
          `);
          expect(await axe(el)).toHaveNoViolations();
        });
      });
    </testing_all_flavors>

    <references>
      <file path="packages/components/src/components/button/sando-button.a11y.test.ts">
        Reference implementation
      </file>
      <url href="https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md">
        axe-core rules
      </url>
      <url href="https://github.com/nickcolley/jest-axe">
        jest-axe docs
      </url>
    </references>

</automated_testing>

<contrast_requirements id="WC-CR-CON">

    <minimum_ratios>
      <ratio type="Normal text" size="&lt;18pt or &lt;14pt bold" aa="4.5:1" aaa="7:1">
        Body copy, labels
      </ratio>
      <ratio type="Large text" size="≥18pt or ≥14pt bold" aa="3:1" aaa="4.5:1">
        Headings, large UI
      </ratio>
      <ratio type="UI components" size="Any" aa="3:1" aaa="-">
        Borders, icons, focus rings
      </ratio>
      <ratio type="Graphical objects" size="Any" aa="3:1" aaa="-">
        Charts, diagrams, controls
      </ratio>
    </minimum_ratios>

    <token_validation lang="javascript">
      // packages/tokens/tests/accessibility/contrast.test.js
      describe("WCAG contrast compliance", () => {
        it("text meets AA (4.5:1)", () => {
          const ratio = getContrastRatio(textColor, backgroundColor);
          expect(ratio).toBeGreaterThanOrEqual(4.5);
        });
      });
    </token_validation>

    <contrast_calculation>
      <step number="1">Convert HSL → RGB</step>
      <step number="2">Calculate relative luminance</step>
      <step number="3">Compute contrast ratio: (L1 + 0.05) / (L2 + 0.05)</step>
    </contrast_calculation>

    <tools>
      <tool url="https://webaim.org/resources/contrastchecker/">WebAIM Contrast Checker</tool>
      <tool url="https://contrast-ratio.com/">Contrast Ratio Calculator</tool>
    </tools>

    <reference type="source_file" path="packages/tokens/tests/accessibility/contrast.test.js">
      Complete validation tests
    </reference>

</contrast_requirements>

<semantic_html id="WC-SH">

    <native_elements>
      <pattern lang="html">
        <!-- Buttons -->
        <button type="button">Action</button>
        <button type="submit">Submit Form</button>

        <!-- Links -->
        <a href="/page">Navigate</a>

        <!-- Form controls -->
        <input type="text" id="name" />
        <label for="name">Name</label>
        <select id="options">
          <option>One</option>
        </select>
        <textarea id="comments"></textarea>
      </pattern>

      <anti_patterns lang="html">
        <!-- ❌ WRONG - div/span with roles -->
        <div role="button" tabindex="0" onclick="...">Click</div>
        <span role="link" tabindex="0" onclick="...">Link</span>
        <div role="textbox" contenteditable="true"></div>
      </anti_patterns>
    </native_elements>

    <progressive_enhancement>
      <step number="1">Start with HTML - Semantic, keyboard accessible</step>
      <step number="2">Add CSS - Visual styling via tokens</step>
      <step number="3">Enhance with JS - Interactive behavior, ARIA states</step>

      <example lang="html">
        <!-- Works without JS -->
        <button type="button" class="toggle">Show details</button>

        <!-- Enhanced with JS -->
        <button
          type="button"
          class="toggle"
          aria-pressed="false"
          aria-controls="details"
        >
          Show details
        </button>
      </example>
    </progressive_enhancement>

    <reference type="specification" url="https://www.w3.org/TR/html-aria/">
      HTML5 Accessibility
    </reference>

</semantic_html>

<aria_patterns id="WC-AP">

    <when_to_use>
      <use_case number="1">No native HTML element exists</use_case>
      <use_case number="2">Need to add states/properties not in HTML</use_case>
      <use_case number="3">Building complex widgets (combobox, tree, tabs)</use_case>
    </when_to_use>

    <common_patterns>
      <pattern name="Button" role="button" states="aria-pressed, aria-disabled" keyboard="Space, Enter">
        Reference: sando-button
      </pattern>
      <pattern name="Alert" role="alert" states='aria-live="assertive"' keyboard="-">
        Toast notifications
      </pattern>
      <pattern name="Status" role="status" states='aria-live="polite"' keyboard="-">
        Loading indicator
      </pattern>
      <pattern name="Toggle" role="button" states="aria-pressed" keyboard="Space, Enter">
        Toggle button
      </pattern>
      <pattern name="Modal" role="dialog" states="aria-modal, aria-labelledby" keyboard="Esc, Tab trap">
        Dialog
      </pattern>
    </common_patterns>

    <component_example lang="typescript">
      // sando-button ARIA states
      // Disabled state
      this.hasAttribute("disabled")
        ? html`<button aria-disabled="true" ...></button>`
        : html`<button ...></button>`;

      // Loading state
      html`
        <button aria-busy="${this.loading}" aria-live="polite">
          ${this.loading ? "Loading..." : "Submit"}
        </button>
      `;

      // Toggle button
      html`
        <button
          type="button"
          aria-pressed="${this.pressed}"
          @click="${this._handleToggle}"
        >
          ${this.label}
        </button>
      `;
    </component_example>

    <common_attributes>
      <attribute name="aria-label">Accessible name when text content insufficient</attribute>
      <attribute name="aria-labelledby">Reference to labeling element(s)</attribute>
      <attribute name="aria-describedby">Reference to description element(s)</attribute>
      <attribute name="aria-hidden">Hide decorative elements from screen readers</attribute>
      <attribute name="aria-live">Announce dynamic content changes</attribute>
      <attribute name="aria-disabled">Disabled state (when cannot use native disabled)</attribute>
      <attribute name="aria-pressed">Toggle button state</attribute>
      <attribute name="aria-expanded">Collapsible content state</attribute>
    </common_attributes>

    <references>
      <url href="https://www.w3.org/WAI/ARIA/apg/">WAI-ARIA Authoring Practices</url>
      <url href="https://www.w3.org/TR/html-aria/">ARIA in HTML</url>
      <file path="packages/components/src/components/button/sando-button.ts">
        Production implementation
      </file>
    </references>

</aria_patterns>

<testing_coverage id="WC-TC">

    <requirements>
      <coverage_100_percent_for>
        <item>All public components</item>
        <item>All component states (default, hover, focus, active, disabled, loading, error, success)</item>
        <item>All variants (solid, outline, ghost, etc.)</item>
        <item>All sizes (small, medium, large)</item>
        <item>All flavors (original, strawberry, ocean, forest, sunset)</item>
        <item>All modes (light, dark, high-contrast, forced-colors, reduced-motion)</item>
      </coverage_100_percent_for>
    </requirements>

    <test_file_structure>
      <structure>
        sando-button/
        ├── sando-button.ts           # Component implementation
        ├── sando-button.test.ts      # Unit tests
        ├── sando-button.spec.ts      # E2E tests
        └── sando-button.a11y.test.ts # Accessibility tests ← Required
      </structure>
    </test_file_structure>

    <commands>
      <command>pnpm test -- --grep "a11y|accessibility"</command>
      <command>pnpm test sando-button.a11y.test.ts</command>
      <command>pnpm test:watch -- --grep "a11y"</command>
    </commands>

    <reference type="guideline" doc_id="TST" file="../03-development/TESTING_STRATEGY.md">
      Complete testing strategy
    </reference>

</testing_coverage>

  <validation id="WC-V">

    <component_creation>
      <item status="required">Uses semantic HTML elements (button, a, input, label, etc.)</item>
      <item status="required">Keyboard accessible (all interactive elements reachable via Tab)</item>
      <item status="required">Visible focus indicators (meet 3:1 contrast for focus rings)</item>
      <item status="required">ARIA labels provided where text content insufficient</item>
      <item status="required">No keyboard traps (can Tab out of component)</item>
      <item status="required">Logical tab order (follows visual layout)</item>
    </component_creation>

    <testing_phase>
      <item status="required">`.a11y.test.ts` file exists</item>
      <item status="required">axe-core automated tests pass (toHaveNoViolations)</item>
      <item status="required">All states tested (default, disabled, loading, error, etc.)</item>
      <item status="required">All variants tested (solid, outline, ghost, etc.)</item>
      <item status="required">All flavors tested (original, strawberry, ocean, forest, sunset)</item>
      <item status="required">All modes tested (light, dark, high-contrast, reduced-motion)</item>
      <item status="required">Manual keyboard testing completed (Tab, Enter, Space, Arrows, Esc)</item>
      <item status="required">Screen reader testing completed (NVDA/JAWS/VoiceOver)</item>
    </testing_phase>

    <pr_review>
      <item status="required">No axe-core violations in CI</item>
      <item status="required">Manual accessibility testing documented</item>
      <item status="required">Screen reader testing results included</item>
      <item status="required">Keyboard navigation verified</item>
      <item status="required">Focus management reviewed</item>
      <item status="required">ARIA usage validated against APG patterns</item>
    </pr_review>

    <release>
      <item status="required">Accessibility features documented in Storybook</item>
      <item status="required">Known accessibility issues listed</item>
      <item status="required">Migration guide includes a11y breaking changes</item>
      <item status="required">Component docs include keyboard shortcuts</item>
      <item status="required">ARIA patterns documented with examples</item>
    </release>

  </validation>

<related_guidelines id="WC-RG">
<reference
      type="guideline"
      doc_id="TST"
      file="../03-development/TESTING_STRATEGY.md"
      category="03-development">
Testing requirements
</reference>

    <reference
      type="guideline"
      doc_id="KN"
      file="KEYBOARD_NAVIGATION.md"
      category="04-accessibility">
      Keyboard interaction patterns
    </reference>

    <reference
      type="guideline"
      doc_id="SR"
      file="SCREEN_READER_SUPPORT.md"
      category="04-accessibility">
      Screen reader testing guide
    </reference>

    <reference
      type="guideline"
      doc_id="CC"
      file="COLOR_CONTRAST.md"
      category="04-accessibility">
      Color system accessibility
    </reference>

</related_guidelines>

<external_references id="WC-ER">
<reference
      type="specification"
      url="https://www.w3.org/WAI/WCAG21/quickref/"
      title="WCAG 2.1 Quick Reference">
Official spec
</reference>

    <reference
      type="guide"
      url="https://www.w3.org/WAI/ARIA/apg/"
      title="WAI-ARIA Authoring Practices">
      Patterns and widgets
    </reference>

    <reference
      type="tool"
      url="https://github.com/dequelabs/axe-core"
      title="axe-core">
      Automated testing
    </reference>

    <reference
      type="tool"
      url="https://github.com/nickcolley/jest-axe"
      title="jest-axe">
      Jest integration
    </reference>

    <reference
      type="resource"
      url="https://webaim.org/"
      title="WebAIM">
      Resources and training
    </reference>

    <reference
      type="tool"
      url="https://webaim.org/resources/contrastchecker/"
      title="WebAIM Contrast Checker">
      Color contrast tool
    </reference>

    <reference
      type="resource"
      url="https://www.a11yproject.com/"
      title="A11y Project">
      Community checklist
    </reference>

    <reference
      type="documentation"
      url="https://developer.mozilla.org/en-US/docs/Web/Accessibility"
      title="MDN Accessibility">
      Technical reference
    </reference>

</external_references>

  <changelog id="WC-CL">
    <version number="1.0.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="INITIAL">Initial guideline creation</change>
      <change type="NEW">WCAG 2.1 Level AA compliance requirements</change>
      <change type="NEW">jest-axe automated testing patterns</change>
      <change type="NEW">Contrast requirements (4.5:1 AA, 7:1 AAA, 3:1 UI)</change>
      <change type="NEW">Semantic HTML patterns and progressive enhancement</change>
      <change type="NEW">ARIA patterns with 5 rules and common widgets</change>
      <change type="NEW">Testing coverage requirements (100% states/flavors/modes)</change>
      <change type="NEW">Validation checklist for creation, testing, PR, release</change>
      <change type="NEW">References to production code (sando-button.a11y.test.ts, contrast.test.js)</change>
    </version>
  </changelog>

  <conclusion>
    Accessibility is non-negotiable. Every component must be usable by everyone.
  </conclusion>

</guideline>
