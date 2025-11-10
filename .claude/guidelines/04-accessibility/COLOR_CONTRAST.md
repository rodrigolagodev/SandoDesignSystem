<guideline doc_id="CC" category="04-accessibility" version="1.0.0" status="Active" last_updated="2025-11-09" owner="UI Designer">

  <purpose id="CC-PU">
    Ensure all Sando Design System colors meet WCAG 2.1 contrast requirements for text readability and UI component visibility. Define contrast ratios, automated validation patterns, and tools for maintaining accessible color combinations across all flavors and modes.
  </purpose>

<core_rules id="CC-CR">

    <rule id="CC-CR-R1" title="WCAG Contrast Ratios Required (Non-Negotiable)">
      <summary>
        All text must meet minimum contrast ratios: 4.5:1 for normal text (AA), 7:1 for AAA, and 3:1 for UI components and large text (AA).
      </summary>

      <pattern lang="css">
        /* ✅ CORRECT - Meets 4.5:1 AA requirement */
        .body-text {
          color: var(--sando-color-text-body); /* #1a1a1a */
          background: var(--sando-color-background-base); /* #ffffff */
          /* Actual contrast: 16.9:1 (exceeds AA and AAA) */
        }

        /* ✅ CORRECT - Large text with 3:1 AA */
        .large-heading {
          font-size: 18pt;
          color: var(--sando-color-text-heading); /* #333333 */
          background: var(--sando-color-background-base); /* #ffffff */
          /* Contrast: 12.6:1 */
        }
      </pattern>

      <anti_pattern lang="css">
        /* ❌ WRONG - Only 2.8:1 (fails AA requirement) */
        .subtle-text {
          color: #999999;
          background: #ffffff;
        }

        /* ❌ WRONG - Insufficient UI component contrast */
        .button-border {
          border: 1px solid #cccccc; /* Only 1.6:1 against white */
          background: #ffffff;
        }
      </anti_pattern>

      <why>WCAG 2.1 Level AA is a legal requirement in many jurisdictions. Insufficient contrast causes readability issues for users with low vision, color blindness, or in bright lighting conditions</why>

      <reference type="specification" url="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html">
        WCAG 1.4.3 Contrast (Minimum)
      </reference>
    </rule>

    <rule id="CC-CR-R2" title="Automated Contrast Testing">
      <summary>
        All token combinations must pass automated contrast tests in CI. Tests validate text/background pairs across all flavors and modes.
      </summary>

      <pattern lang="javascript">
        // From packages/tokens/tests/accessibility/contrast.test.js
        describe("Text contrast requirements", () => {
          it("text-body on background-base meets 4.5:1", () => {
            const textColor = resolveToken("color.text.body");
            const bgColor = resolveToken("color.background.base");
            const ratio = getContrastRatio(textColor, bgColor);
            expect(ratio).toBeGreaterThanOrEqual(4.5);
          });
        });
      </pattern>

      <validated_pairs>
        <pair>text-body / background-base → 4.5:1 AA</pair>
        <pair>text-heading / background-base → 4.5:1 AA</pair>
        <pair>text-link / background-base → 4.5:1 AA</pair>
        <pair>border-default / background-base → 3:1 UI components</pair>
        <pair>action-solid-text / action-solid-background → 4.5:1 AA</pair>
        <pair>success-text / background-base → 4.5:1 AA</pair>
        <pair>destructive-text / background-base → 4.5:1 AA</pair>
      </validated_pairs>

      <ci_integration>Tests run on every commit. Failing contrast ratios block merges</ci_integration>

      <why>Manual testing is error-prone. Automated validation catches regressions immediately and ensures consistency across all token updates</why>

      <reference type="source_file" path="packages/tokens/tests/accessibility/contrast.test.js" lines="143-334">
        Complete validation tests
      </reference>
    </rule>

    <rule id="CC-CR-R3" title="Large Text Exception">
      <summary>
        Text ≥18pt (or ≥14pt bold) can use relaxed contrast ratios: 3:1 for AA, 4.5:1 for AAA.
      </summary>

      <pattern lang="css">
        /* ✅ CORRECT - Large text with 3.5:1 meets AA */
        .hero-heading {
          font-size: 48px; /* 36pt - qualifies as large */
          font-weight: 400;
          color: #595959; /* 3.5:1 against white */
          background: #ffffff;
        }

        /* ✅ CORRECT - Bold text with 3.2:1 meets AA */
        .subheading {
          font-size: 18px; /* 13.5pt */
          font-weight: 700; /* Bold qualifies at ≥14pt */
          color: #5e5e5e; /* 3.2:1 */
        }
      </pattern>

      <anti_pattern lang="css">
        /* ❌ WRONG - Small text with large text ratio */
        .body {
          font-size: 14px; /* <18pt - needs 4.5:1 */
          color: #767676; /* Only 3.1:1 - fails AA */
        }
      </anti_pattern>

      <size_thresholds>
        <large_text>≥18pt (24px) regular OR ≥14pt (18.7px) bold</large_text>
        <normal_text>&lt;18pt regular AND &lt;14pt bold</normal_text>
      </size_thresholds>

      <why>Larger text is easier to read with lower contrast. WCAG acknowledges this perceptual difference</why>

      <reference type="specification" url="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#dfn-large-scale">
        WCAG Large Text Definition
      </reference>
    </rule>

    <rule id="CC-CR-R4" title="UI Component Contrast">
      <summary>
        Borders, focus indicators, icons, and graphical objects require 3:1 minimum contrast against adjacent colors.
      </summary>

      <pattern lang="css">
        /* ✅ CORRECT - Focus indicator with 3.5:1 */
        .button:focus {
          outline: 2px solid var(--sando-color-border-focus); /* #0066cc */
          outline-offset: 2px;
          /* Contrast vs white background: 3.5:1 */
        }

        /* ✅ CORRECT - Border with 3.1:1 */
        .input {
          border: 1px solid var(--sando-color-border-default); /* #767676 */
          background: var(--sando-color-background-base); /* #ffffff */
          /* Contrast: 4.5:1 */
        }
      </pattern>

      <anti_pattern lang="css">
        /* ❌ WRONG - Insufficient focus indicator */
        .button:focus {
          outline: 2px solid #dddddd; /* Only 1.3:1 - invisible */
        }

        /* ❌ WRONG - Low contrast icon */
        .icon-subtle {
          color: #d4d4d4; /* 1.7:1 against white - fails 3:1 */
        }
      </anti_pattern>

      <applies_to>
        <item>Input borders</item>
        <item>Button outlines</item>
        <item>Focus indicators (critical for keyboard navigation)</item>
        <item>Icons (especially interactive icons)</item>
        <item>Chart elements</item>
        <item>Disabled states (exempt but test carefully)</item>
      </applies_to>

      <why>WCAG 1.4.11 (Non-text Contrast) ensures UI controls are perceivable. Critical for keyboard users relying on focus indicators</why>

      <reference type="specification" url="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html">
        WCAG 1.4.11 Non-text Contrast
      </reference>
    </rule>

    <rule id="CC-CR-R5" title="Test Across All Flavors and Modes">
      <summary>
        Validate contrast in light mode, dark mode, high-contrast mode, and all custom flavors (strawberry, ocean, forest, sunset).
      </summary>

      <pattern lang="javascript">
        // Test matrix from contrast.test.js
        describe.each(["original", "dark"])("Flavor: %s", (flavor) => {
          it("validates all text/background pairs", () => {
            const tokens = loadFlavorTokens(flavor);
            validateContrastPairs(tokens);
          });
        });
      </pattern>

      <modes_to_test>
        <mode>Light mode (default): @media (prefers-color-scheme: light)</mode>
        <mode>Dark mode: @media (prefers-color-scheme: dark)</mode>
        <mode>High contrast: @media (prefers-contrast: more)</mode>
        <mode>Forced colors: @media (forced-colors: active)</mode>
      </modes_to_test>

      <flavors_to_test>
        <flavor>original (default)</flavor>
        <flavor>strawberry</flavor>
        <flavor>ocean</flavor>
        <flavor>forest</flavor>
        <flavor>sunset</flavor>
      </flavors_to_test>

      <why>Contrast ratios change dramatically in dark mode. A color pair that works in light mode may fail in dark mode. Automated tests must cover all combinations</why>

      <reference type="source_file" path="packages/tokens/tests/accessibility/contrast.test.js" lines="301-334">
        Cross-flavor testing
      </reference>
    </rule>

</core_rules>

<wcag_criteria id="CC-WC">

<summary>WCAG contrast requirements by content type</summary>

    <criteria>
      <criterion type="Normal text (&lt;18pt)" aa="4.5:1" aaa="7:1" wcag="1.4.3, 1.4.6">
        Body copy, small headings, labels
      </criterion>
      <criterion type="Large text (≥18pt or ≥14pt bold)" aa="3:1" aaa="4.5:1" wcag="1.4.3, 1.4.6">
        Large headings, hero text
      </criterion>
      <criterion type="UI components" aa="3:1" aaa="N/A" wcag="1.4.11">
        Borders, focus rings, icons
      </criterion>
      <criterion type="Graphical objects" aa="3:1" aaa="N/A" wcag="1.4.11">
        Charts, diagrams, infographics
      </criterion>
      <criterion type="Disabled controls" aa="Exempt" aaa="Exempt" wcag="N/A">
        Test anyway for usability
      </criterion>
    </criteria>

    <sando_targets>
      <target level="AA">All content (required)</target>
      <target level="AAA">Headings and body text (stretch goal)</target>
      <target level="3:1">All UI components without exception</target>
    </sando_targets>

    <exemptions>
      <exemption>Logotypes (brand logos)</exemption>
      <exemption>Incidental text (text in photos)</exemption>
      <exemption>Inactive UI components (must still be perceivable)</exemption>
    </exemptions>

    <reference type="specification" url="https://www.w3.org/WAI/WCAG21/quickref/#distinguishable">
      WCAG 1.4 Distinguishable
    </reference>

</wcag_criteria>

<contrast_calculation id="CC-CALC">

    <formula>
      Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)

      Where:
      - L1 = Relative luminance of lighter color (0-1)
      - L2 = Relative luminance of darker color (0-1)
      - 0.05 = Constant to avoid division by zero
    </formula>

    <relative_luminance>
      L = 0.2126 x R + 0.7152 x G + 0.0722 x B

      Where R, G, B are linearized sRGB values (gamma correction applied)
    </relative_luminance>

    <implementation_reference>
      See packages/tokens/tests/accessibility/contrast.test.js lines 62-87 for complete luminance and contrast calculation functions
    </implementation_reference>

    <manual_tools>
      <tool url="https://webaim.org/resources/contrastchecker/">WebAIM Contrast Checker - Hex/RGB input</tool>
      <tool url="https://contrast-ratio.com/">Contrast Ratio - Live preview</tool>
      <tool url="https://coolors.co/contrast-checker">Coolors Contrast Checker - Palette testing</tool>
    </manual_tools>

    <warning>
      Do NOT implement manually: Use existing test utilities or online tools. Luminance calculation requires precise gamma correction
    </warning>

    <reference type="specification" url="https://www.w3.org/WAI/GL/wiki/Relative_luminance">
      WCAG Relative Luminance
    </reference>

</contrast_calculation>

<token_validation id="CC-TV">

<summary>Automated testing pattern from contrast.test.js</summary>

    <pattern lang="javascript">
      // 1. Resolve token references
      const textColor = resolveTokenValue(tokens.color.text.body);
      const bgColor = resolveTokenValue(tokens.color.background.base);

      // 2. Convert HSL to RGB
      const textRGB = parseHSL(textColor); // "hsl(0, 0%, 10%)" → {r, g, b}
      const bgRGB = parseHSL(bgColor);

      // 3. Calculate contrast
      const ratio = getContrastRatio(textRGB, bgRGB);

      // 4. Assert WCAG requirement
      expect(ratio).toBeGreaterThanOrEqual(4.5); // AA for normal text
    </pattern>

    <test_coverage>
      <suite lines="143-173">Text contrast on backgrounds</suite>
      <suite lines="175-203">UI component contrast (borders, focus)</suite>
      <suite lines="205-234">Status colors (success, warning, error)</suite>
      <suite lines="236-278">Link states (default, hover, active, visited)</suite>
      <suite lines="280-299">Dark mode validation</suite>
      <suite lines="301-334">Comprehensive contrast report</suite>
    </test_coverage>

    <commands>
      <command>pnpm --filter @sando/tokens test:accessibility</command>
      <command>pnpm --filter @sando/tokens test contrast.test.js</command>
      <command>pnpm --filter @sando/tokens test contrast.test.js --reporter=verbose</command>
    </commands>

    <ci_integration>Tests run automatically on push. Failed contrast ratios block PR merge</ci_integration>

    <reference type="source_file" path="packages/tokens/tests/accessibility/contrast.test.js">
      Complete implementation
    </reference>

</token_validation>

<color_palette_guidelines id="CC-CPG">

    <oklch_advantages>
      OKLCH color space provides perceptual uniformity, making contrast more predictable than HSL
    </oklch_advantages>

    <lightness_scale>
      <range value="0-15">Very dark - Use for text on light backgrounds</range>
      <range value="15-30">Dark - Headings, high-emphasis text</range>
      <range value="30-70">Mid-range - Use carefully, test contrast</range>
      <range value="70-85">Light - Borders, subtle backgrounds</range>
      <range value="85-100">Very light - Backgrounds, surfaces</range>
    </lightness_scale>

    <safe_combinations title="Meets 4.5:1 AA">
      <combo>L10 on L95+ - Dark text on light background (typical body text)</combo>
      <combo>L5-15 on L90+ - Very dark text on very light (high contrast)</combo>
      <combo>L90+ on L5-15 - Light text on dark background (dark mode)</combo>
      <combo>L0-20 on L80+ - Maximum contrast for critical text</combo>
    </safe_combinations>

    <unsafe_combinations title="Fails 4.5:1">
      <combo>L40 on L60 - Mid-range colors rarely meet AA</combo>
      <combo>L50 on L80 - Common mistake - only 2-3:1</combo>
      <combo>L70 on L90 - Light on light - decorative only</combo>
    </unsafe_combinations>

    <chroma_note>
      High chroma (saturation) slightly improves contrast at similar lightness. But lightness difference is primary factor
    </chroma_note>

    <reference type="guideline" doc_id="CS" file="../01-design-system/COLOR_SYSTEM.md">
      OKLCH color space documentation
    </reference>

</color_palette_guidelines>

<tools_and_testing id="CC-TAT">

    <automated_tools>
      <tool name="Token tests" type="CI/Local" usage="pnpm test:accessibility">
        Automated validation
      </tool>
      <tool name="axe DevTools" type="Browser" usage="Page-wide scan" url="https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd">
        Chrome extension
      </tool>
      <tool name="Lighthouse" type="Browser" usage="Audit report">
        Built into Chrome DevTools
      </tool>
      <tool name="WAVE" type="Browser" usage="Visual feedback" url="https://wave.webaim.org/extension/">
        Extension
      </tool>
    </automated_tools>

    <manual_checkers>
      <tool name="WebAIM Contrast Checker" best_for="Quick validation" url="https://webaim.org/resources/contrastchecker/">
        Recommended
      </tool>
      <tool name="Contrast Ratio" best_for="Live preview" url="https://contrast-ratio.com/">
        Fast testing
      </tool>
      <tool name="Who Can Use" best_for="Simulation" url="https://www.whocanuse.com/">
        Vision simulation
      </tool>
      <tool name="Coolors Checker" best_for="Palette testing" url="https://coolors.co/contrast-checker">
        Multiple colors
      </tool>
    </manual_checkers>

    <manual_procedure>
      <step number="1">Identify colors: Extract text and background colors from rendered component</step>
      <step number="2">Check ratio: Use WebAIM or Contrast Ratio tool</step>
      <step number="3">Verify threshold: Confirm ≥4.5:1 (AA) or ≥7:1 (AAA)</step>
      <step number="4">Test all modes: Repeat for dark mode, high contrast, forced colors</step>
      <step number="5">Test all flavors: Validate strawberry, ocean, forest, sunset</step>
      <step number="6">Document: Record ratios in component documentation</step>
    </manual_procedure>

    <spot_check_frequency>Monthly for existing components, always for new tokens</spot_check_frequency>

</tools_and_testing>

<common_issues id="CC-CI">

    <issues>
      <issue problem="Light gray text on white" example="#999999 on #ffffff" contrast="2.8:1" solution="Use #767676 (4.5:1) or darker" />
      <issue problem="Insufficient focus indicator" example="#dddddd border on white" contrast="1.3:1" solution="Use #0066cc (3.5:1)" />
      <issue problem="Brand color fails" example="Custom orange #ff9900" contrast="2.0:1" solution="Darken to #cc7a00 (4.6:1)" />
      <issue problem="Placeholder text too light" example="#aaaaaa" contrast="2.3:1" solution="Use text color at 60% opacity or #757575" />
      <issue problem="Disabled state invisible" example="#e0e0e0 on white" contrast="1.6:1" solution="Use #999999 (2.8:1) - still perceivable" />
      <issue problem="Success green too light" example="#00ff00" contrast="1.4:1" solution="Use #008000 (4.5:1)" />
      <issue problem="Link color too bright" example="#00bbff" contrast="2.1:1" solution="Darken to #0066cc (4.5:1)" />
    </issues>

    <pattern>Most issues involve colors in L40-L70 range (mid-luminance). Push to L0-L30 or L80-L100</pattern>

    <quick_fix>Adjust OKLCH lightness by ±20 points and retest</quick_fix>

</common_issues>

<related_guidelines id="CC-RG">
<reference
      type="guideline"
      doc_id="WC"
      file="WCAG_COMPLIANCE.md"
      category="04-accessibility">
Overall WCAG 2.1 requirements
</reference>

    <reference
      type="guideline"
      doc_id="CS"
      file="../01-design-system/COLOR_SYSTEM.md"
      category="01-design-system">
      OKLCH color space and palette design
    </reference>

    <reference
      type="guideline"
      doc_id="TST"
      file="../03-development/TESTING_STRATEGY.md"
      category="03-development">
      Automated testing approach
    </reference>

</related_guidelines>

<external_references id="CC-ER">
<reference
      type="specification"
      url="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
      title="WCAG 1.4.3 Contrast (Minimum)">
Official specification
</reference>

    <reference
      type="specification"
      url="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html"
      title="WCAG 1.4.11 Non-text Contrast">
      UI components
    </reference>

    <reference
      type="tool"
      url="https://webaim.org/resources/contrastchecker/"
      title="WebAIM Contrast Checker">
      Primary tool
    </reference>

    <reference
      type="tool"
      url="https://contrast-ratio.com/"
      title="Contrast Ratio Calculator">
      Quick testing
    </reference>

    <reference
      type="tool"
      url="https://www.whocanuse.com/"
      title="Who Can Use">
      Vision simulation
    </reference>

    <reference
      type="specification"
      url="https://www.w3.org/WAI/GL/wiki/Relative_luminance"
      title="WCAG Relative Luminance">
      Calculation formula
    </reference>

</external_references>

  <changelog id="CC-CL">
    <version number="1.0.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="INITIAL">Initial guideline extracted from token contrast tests</change>
      <change type="NEW">WCAG contrast ratios: 4.5:1 AA (text), 7:1 AAA, 3:1 UI components</change>
      <change type="NEW">Automated validation pattern from contrast.test.js</change>
      <change type="NEW">Token-based testing approach (text/background pairs)</change>
      <change type="NEW">OKLCH color space guidelines for predictable contrast</change>
      <change type="NEW">Large text exception (≥18pt or ≥14pt bold uses 3:1 AA)</change>
      <change type="NEW">UI component contrast requirements (borders, focus, icons)</change>
      <change type="NEW">Cross-flavor/mode testing (light, dark, high-contrast, forced-colors)</change>
      <change type="NEW">Contrast calculation formula and luminance reference</change>
      <change type="NEW">Common issues table (light gray, focus indicators, brand colors)</change>
      <change type="NEW">Validation checklist (token design, testing, documentation)</change>
      <change type="NEW">Tools reference (WebAIM, Contrast Ratio, axe DevTools, Lighthouse)</change>
    </version>
  </changelog>

  <conclusion>
    Contrast is measurable, testable, and non-negotiable. Automated validation ensures accessibility from design to production.
  </conclusion>

</guideline>
