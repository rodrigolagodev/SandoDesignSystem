<guideline doc_id="SR" category="04-accessibility" version="1.0.0" status="Active" last_updated="2025-11-09" owner="QA Expert">

  <purpose id="SR-PU">
    Ensure all Sando Design System components provide excellent screen reader experience through semantic HTML, ARIA, and live announcements. Screen readers are essential assistive technology used by blind and low-vision users to navigate and interact with web interfaces. Establishes patterns for accessible names, ARIA states, live regions, and screen reader testing based on proven patterns from sando-button.
  </purpose>

  <target id="SR-TGT">
    WCAG 2.1 Level AA compliance for screen reader users.
  </target>

<core_rules id="SR-CR">
<rule id="SR-CR-R1" title="Semantic HTML First (Non-Negotiable)">

<summary>
Use native HTML elements that have built-in screen reader support. Avoid unnecessary ARIA.
</summary>

      <pattern lang="html" title="✅ Native elements">
        <!-- Native button -->
        <button>Click me</button>;

        <!-- Native link -->
        <a href="/home">Home</a>
      </pattern>

      <anti_pattern lang="html" title="❌ Unnecessary ARIA complexity">
        <!-- Div with ARIA (unnecessary complexity) -->
        <div role="button" tabindex="0" aria-pressed="false">Click me</div>
      </anti_pattern>

      <why>
        Native elements announce correctly, have keyboard support built-in, and work reliably across all screen readers without additional ARIA.
      </why>

      <reference type="external" url="https://www.w3.org/TR/html-aria/">
        HTML5 Accessibility
      </reference>
      <reference type="external" url="https://www.w3.org/TR/html-aria/">
        ARIA in HTML
      </reference>
    </rule>

    <rule id="SR-CR-R2" title="Accessible Names Required">
      <summary>
        Every interactive element MUST have an accessible name that screen readers can announce.
      </summary>

      <priority_order>
        <priority level="1" method="Text content" quality="BEST">
          Visible to all users
        </priority>
        <priority level="2" method="aria-label">
          Screen reader only override
        </priority>
        <priority level="3" method="aria-labelledby">
          Reference other element's text
        </priority>
      </priority_order>

      <pattern lang="html" title="✅ Accessible names">
        <!-- Visible text -->
        <button>Save Changes</button>

        <!-- Icon-only with aria-label -->
        <button aria-label="Settings">⚙️</button>
      </pattern>

      <anti_pattern lang="html" title="❌ No accessible name">
        <button><span class="icon"></span></button>
      </anti_pattern>

      <reference type="wcag" criterion="4.1.2" level="A">
        Name, Role, Value
      </reference>
    </rule>

    <rule id="SR-CR-R3" title="ARIA States and Properties">
      <summary>
        Use ARIA to communicate dynamic states and properties that native HTML cannot express.
      </summary>

      <common_aria_attributes>
        <attribute name="aria-pressed">
          <purpose>Toggle button state (true/false)</purpose>
        </attribute>
        <attribute name="aria-expanded">
          <purpose>Disclosure widget state (true/false)</purpose>
        </attribute>
        <attribute name="aria-busy">
          <purpose>Loading state (true/false)</purpose>
        </attribute>
        <attribute name="aria-disabled">
          <purpose>Disabled state on non-native elements (true/false)</purpose>
        </attribute>
        <attribute name="aria-live">
          <purpose>Dynamic content announcements (polite/assertive/off)</purpose>
        </attribute>
      </common_aria_attributes>

      <pattern lang="typescript" title="Pattern from sando-button">
        // Toggle button state
        aria-pressed=${this.toggle ? (this.active ? 'true' : 'false') : ''}

        // Loading state
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-live=${this.loading ? 'polite' : 'off'}
      </pattern>

      <reference type="source_file" path="packages/components/src/components/button/sando-button.ts" lines="277-281">
        sando-button ARIA implementation
      </reference>
    </rule>

    <rule id="SR-CR-R4" title="Live Regions for Announcements">
      <summary>
        Use ARIA live regions to announce dynamic content changes without moving focus.
      </summary>

      <live_region_types>
        <type name='aria-live="polite"'>
          <behavior>Wait for user to finish current task</behavior>
          <usage>Most updates</usage>
        </type>
        <type name='aria-live="assertive"'>
          <behavior>Interrupt immediately</behavior>
          <usage>Urgent alerts only</usage>
        </type>
        <type name='role="status"'>
          <behavior>Implicit polite live region</behavior>
          <usage>Status updates</usage>
        </type>
        <type name='role="alert"'>
          <behavior>Implicit assertive live region</behavior>
          <usage>Errors, warnings</usage>
        </type>
      </live_region_types>

      <pattern lang="html" title="Pattern from sando-button">
        <!-- Loading spinner announcement -->
        <span class="spinner" role="status" aria-label="Loading"></span>
      </pattern>

      <when_to_use>
        Form validation, loading states, async updates, error messages, success confirmations.
      </when_to_use>

      <reference type="wcag" criterion="4.1.3" level="AA">
        Status Messages
      </reference>
    </rule>

    <rule id="SR-CR-R5" title="Test with Actual Screen Readers">
      <summary>
        Automated tools cannot fully validate screen reader experience. Manual testing is REQUIRED.
      </summary>

      <minimum_testing>
        <screen_reader priority="1" name="NVDA" platform="Windows" free="true">
          Primary testing
        </screen_reader>
        <screen_reader priority="2" name="VoiceOver" platform="Mac/iOS" free="true">
          Secondary testing
        </screen_reader>
        <screen_reader priority="3" name="JAWS" platform="Windows" free="false">
          Enterprise validation (if available)
        </screen_reader>
        <screen_reader priority="4" name="TalkBack" platform="Android" free="true">
          Mobile validation
        </screen_reader>
      </minimum_testing>

      <basic_test_procedure>
        <step number="1">Navigate with Tab key</step>
        <step number="2">Listen to announcements (name, role, state)</step>
        <step number="3">Activate with Enter/Space</step>
        <step number="4">Verify state changes announced correctly</step>
      </basic_test_procedure>

      <reference type="external" url="https://webaim.org/articles/screenreader_testing/">
        WebAIM Screen Reader Testing
      </reference>
    </rule>

</core_rules>

<wcag_screen_reader_criteria id="SR-WSC">
<criteria>
<criterion id="4.1.2" level="A" title="Name, Role, Value">
<requirement>All UI components have accessible names, roles, and states</requirement>
<implementation>Text content, aria-label, aria-pressed, aria-expanded</implementation>
</criterion>

      <criterion id="4.1.3" level="AA" title="Status Messages">
        <requirement>Status messages announced without focus change</requirement>
        <implementation>aria-live, role="status", role="alert"</implementation>
      </criterion>

      <criterion id="1.3.1" level="A" title="Info and Relationships">
        <requirement>Semantic structure programmatically determinable</requirement>
        <implementation>Native HTML elements (button, nav, main, heading)</implementation>
      </criterion>

      <criterion id="2.4.6" level="AA" title="Headings and Labels">
        <requirement>Headings and labels are descriptive</requirement>
        <implementation>Clear text, no generic "click here"</implementation>
      </criterion>

      <criterion id="3.3.2" level="A" title="Labels or Instructions">
        <requirement>Labels provided for input</requirement>
        <implementation>label element, aria-label for inputs</implementation>
      </criterion>
    </criteria>

    <reference type="external" url="https://www.w3.org/WAI/WCAG21/quickref/">
      WCAG 2.1 Quick Reference
    </reference>

</wcag_screen_reader_criteria>

<semantic_html id="SR-SH">

<summary>
Use native HTML elements first. They have built-in screen reader support and keyboard behavior.
</summary>

    <elements>
      <element tag="button">
        <announces>"button" + text</announces>
        <when_to_use>Actions, submissions, non-navigation clicks</when_to_use>
      </element>

      <element tag="a href">
        <announces>"link" + text</announces>
        <when_to_use>Navigation to different pages/sections</when_to_use>
      </element>

      <element tag="nav">
        <announces>"navigation landmark"</announces>
        <when_to_use>Main navigation areas</when_to_use>
      </element>

      <element tag="main">
        <announces>"main landmark"</announces>
        <when_to_use>Primary page content</when_to_use>
      </element>

      <element tag="aside">
        <announces>"complementary landmark"</announces>
        <when_to_use>Sidebars, related content</when_to_use>
      </element>

      <element tag="header">
        <announces>"banner landmark" (if in body)</announces>
        <when_to_use>Site/page header</when_to_use>
      </element>

      <element tag="footer">
        <announces>"contentinfo landmark" (if in body)</announces>
        <when_to_use>Site/page footer</when_to_use>
      </element>

      <element tag="h1-h6">
        <announces>"heading level X" + text</announces>
        <when_to_use>Document outline structure</when_to_use>
      </element>

      <element tag="label">
        <announces>Associates with input</announces>
        <when_to_use>Form input labels</when_to_use>
      </element>

      <element tag="input">
        <announces>Type-specific announcement</announces>
        <when_to_use>Form inputs</when_to_use>
      </element>
    </elements>

    <pattern_from_sando_button lang="typescript" source="sando-button.ts" lines="259-306">
      // Native button element used
      return this.href
        ? html`<a ...>${content}</a>` // Native link for navigation
        : html`<button ...>${content}</button>`; // Native button for actions
    </pattern_from_sando_button>

</semantic_html>

<accessible_names id="SR-AN">

<summary>
Every interactive element needs an accessible name for screen readers to announce.
</summary>

    <text_content id="SR-AN-TC" quality="BEST">
      <summary>
        Visible text provides names for both sighted and screen reader users.
      </summary>

      <pattern lang="html">
        <!-- Text content is accessible name -->
        <button>Save Changes</button>
        <a href="/about">About Us</a>
      </pattern>

      <test_pattern lang="typescript" source="sando-button.a11y.test.ts">
        const accessibleName = element.textContent?.trim();
        expect(accessibleName).toBe("Click me");
      </test_pattern>
    </text_content>

    <aria_label id="SR-AN-AL">
      <summary>
        Use for icon-only elements or to provide clearer screen reader text than visible text.
      </summary>

      <pattern lang="html">
        <!-- Icon-only button needs aria-label -->
        <button aria-label="Settings">⚙️</button>

        <!-- Clearer screen reader text -->
        <button aria-label="Close dialog">x</button>
      </pattern>

      <pattern_from_sando_button lang="typescript" source="sando-button.ts" line="89">
        @property({ reflect: true, attribute: 'aria-label' })
        ariaLabel: string | null = null;
      </pattern_from_sando_button>
    </aria_label>

    <aria_labelledby id="SR-AN-ALB">
      <pattern lang="html">
        <h2 id="title">Confirm Deletion</h2>
        <button aria-labelledby="title">OK</button>
      </pattern>

      <validation>
        axe-core flags missing accessible names as critical errors.
      </validation>
    </aria_labelledby>

</accessible_names>

<aria_states_properties id="SR-ASP">

<summary>
Use ARIA to communicate states and properties beyond native HTML capabilities.
</summary>

    <common_attributes>
      <attribute name="aria-pressed">
        <purpose>Toggle button state</purpose>
        <values>true/false</values>
        <announced_as>"pressed" / "not pressed"</announced_as>
      </attribute>

      <attribute name="aria-expanded">
        <purpose>Disclosure widget</purpose>
        <values>true/false</values>
        <announced_as>"expanded" / "collapsed"</announced_as>
      </attribute>

      <attribute name="aria-busy">
        <purpose>Loading state</purpose>
        <values>true/false</values>
        <announced_as>"busy"</announced_as>
      </attribute>

      <attribute name="aria-disabled">
        <purpose>Disabled on non-button</purpose>
        <values>true/false</values>
        <announced_as>"dimmed" / "unavailable"</announced_as>
      </attribute>

      <attribute name="aria-current">
        <purpose>Current item in set</purpose>
        <values>page/step/location/date/time/true/false</values>
        <announced_as>"current page" etc.</announced_as>
      </attribute>

      <attribute name="aria-selected">
        <purpose>Selected item</purpose>
        <values>true/false</values>
        <announced_as>"selected" / "not selected"</announced_as>
      </attribute>

      <attribute name="aria-checked">
        <purpose>Checkbox/radio state</purpose>
        <values>true/false/mixed</values>
        <announced_as>"checked" / "not checked"</announced_as>
      </attribute>
    </common_attributes>

    <pattern_from_sando_button lang="typescript" source="sando-button.ts">
      // Toggle button (lines 277-278)
      aria-pressed=${this.toggle ? (this.active ? 'true' : 'false') : ''}

      // Disabled link (lines 280-281)
      aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}

      // Loading state (lines 279, 281)
      aria-busy=${this.loading ? 'true' : 'false'}
      aria-live=${this.loading ? 'polite' : 'off'}
    </pattern_from_sando_button>

    <when_to_use>
      <use_case attribute="aria-pressed">Toggle buttons (mute/unmute, play/pause)</use_case>
      <use_case attribute="aria-expanded">Accordions, dropdowns, disclosures</use_case>
      <use_case attribute="aria-busy">Loading spinners, async operations</use_case>
      <use_case attribute="aria-disabled">Disabled links (native disabled only works on button/input)</use_case>
    </when_to_use>

    <when_not_to_use>
      <avoid>Don't add aria-label if text content is sufficient</avoid>
      <avoid>Don't use role="button" on native button</avoid>
      <avoid>Don't use aria-disabled on native button (use disabled attribute)</avoid>
    </when_not_to_use>

</aria_states_properties>

<live_regions id="SR-LR">

<summary>
ARIA live regions announce dynamic content changes without moving keyboard focus.
</summary>

    <live_region_types>
      <type name='aria-live="polite"'>
        <politeness>Wait for pause</politeness>
        <usage>Form validation, status updates</usage>
        <interrupts>No</interrupts>
      </type>

      <type name='aria-live="assertive"'>
        <politeness>Immediate</politeness>
        <usage>Urgent alerts, errors</usage>
        <interrupts>Yes</interrupts>
      </type>

      <type name='aria-live="off"'>
        <politeness>None</politeness>
        <usage>Stop announcements</usage>
        <interrupts>N/A</interrupts>
      </type>

      <type name='role="status"'>
        <politeness>Polite (implicit)</politeness>
        <usage>Status messages, loading</usage>
        <interrupts>No</interrupts>
      </type>

      <type name='role="alert"'>
        <politeness>Assertive (implicit)</politeness>
        <usage>Errors, warnings</usage>
        <interrupts>Yes</interrupts>
      </type>
    </live_region_types>

    <pattern_from_sando_button lang="html" source="sando-button.ts" line="287">
      <!-- Loading spinner with status announcement -->
      <span class="spinner" role="status" aria-label="Loading"></span>
    </pattern_from_sando_button>

    <how_it_works>
      <step number="1">role="status" creates implicit aria-live="polite" region</step>
      <step number="2">aria-label="Loading" provides announcement text</step>
      <step number="3">Screen reader announces "Loading" when spinner appears</step>
      <step number="4">Announcement is polite (waits for user to finish current task)</step>
    </how_it_works>

    <best_practices>
      <practice>Use polite for most updates (status, progress, confirmations)</practice>
      <practice>Use assertive only for urgent (errors, time-sensitive alerts)</practice>
      <practice>Don't over-announce (avoid announcing every keystroke)</practice>
      <practice>Pre-render live region container in DOM before content changes</practice>
      <practice>Use clear text ("Loading..." not "Please wait while content loads...")</practice>
    </best_practices>

    <reference type="wcag" criterion="4.1.3" level="AA">
      Status Messages
    </reference>

</live_regions>

<screen_reader_testing id="SR-SRT">

<summary>
Automated tools cannot fully validate screen reader experience. Manual testing is REQUIRED.
</summary>

    <screen_readers_to_test>
      <screen_reader name="NVDA" platform="Windows" free="true" market_share="~35%">
        <notes>Primary Windows testing</notes>
      </screen_reader>

      <screen_reader name="JAWS" platform="Windows" free="false" market_share="~40%">
        <notes>Enterprise standard (expensive)</notes>
      </screen_reader>

      <screen_reader name="VoiceOver" platform="Mac/iOS" free="true" market_share="~10%">
        <notes>Built-in, easy to test</notes>
      </screen_reader>

      <screen_reader name="TalkBack" platform="Android" free="true" market_share="~10%">
        <notes>Mobile testing</notes>
      </screen_reader>

      <screen_reader name="Narrator" platform="Windows" free="true" market_share="~5%">
        <notes>Built-in Windows</notes>
      </screen_reader>

      <minimum_testing>
        NVDA (Windows) + VoiceOver (Mac) covers ~85% of users.
      </minimum_testing>
    </screen_readers_to_test>

    <basic_testing_procedure>
      <step number="1" title="Navigate with keyboard">
        <action>Tab through interactive elements</action>
        <action>Listen to announcements (name, role, state)</action>
        <action>Verify logical tab order</action>
      </step>

      <step number="2" title="Activate elements">
        <action>Press Enter/Space on buttons</action>
        <action>Verify action announcements</action>
        <action>Check state changes announced</action>
      </step>

      <step number="3" title="Test dynamic content">
        <action>Trigger loading states</action>
        <action>Verify live region announcements</action>
        <action>Test error messages</action>
      </step>

      <step number="4" title="Test landmarks">
        <action>Navigate by landmark (NVDA: D key, VoiceOver: VO+U)</action>
        <action>Verify landmarks make sense</action>
        <action>Check main content identified</action>
      </step>
    </basic_testing_procedure>

    <screen_reader_usage>
      <nvda platform="Windows">
        <download>nvaccess.org</download>
        <launch>Ctrl+Alt+N</launch>
        <navigate>Tab</navigate>
        <activate>Enter/Space</activate>
      </nvda>

      <voiceover platform="Mac">
        <toggle>Cmd+F5</toggle>
        <navigate>Tab and VO+Arrow (VO = Ctrl+Option)</navigate>
        <activate>VO+Space</activate>
      </voiceover>
    </screen_reader_usage>

    <reference type="external" url="https://webaim.org/articles/screenreader_testing/">
      WebAIM Screen Reader Testing
    </reference>

</screen_reader_testing>

<common_patterns id="SR-CP">
<pattern name="Icon-only button">
<code lang="html">
<sando-button icon-only aria-label="Settings">⚙️</sando-button>
</code>
</pattern>

    <pattern name="Loading state">
      <code lang="html">
        <span role="status" aria-label="Loading"></span>
      </code>
    </pattern>

    <pattern name="Toggle button">
      <code lang="typescript">
        aria-pressed=${this.active ? 'true' : 'false'}
      </code>
    </pattern>

    <pattern name="Disabled link">
      <code lang="typescript">
        aria-disabled="true"
      </code>
    </pattern>

    <reference type="source_file" path="packages/components/src/components/button/sando-button.ts">
      sando-button implementation
    </reference>
    <reference type="source_file" path="packages/components/src/components/button/sando-button.a11y.test.ts">
      sando-button accessibility tests
    </reference>

</common_patterns>

<related_guidelines id="SR-RG">
<reference type="guideline" doc_id="WC" file="WCAG_COMPLIANCE.md">
Overall WCAG 2.1 Level AA compliance requirements
</reference>
<reference type="guideline" doc_id="KN" file="KEYBOARD_NAVIGATION.md">
Keyboard interaction patterns and focus management
</reference>
<reference type="guideline" doc_id="TST" file="../03-development/TESTING_STRATEGY.md">
Accessibility testing approach with axe-core
</reference>
</related_guidelines>

<external_references id="SR-ER">
<category name="Screen Readers">
<reference url="https://www.nvaccess.org/">NVDA - Free Windows screen reader (primary testing)</reference>
<reference url="https://www.freedomscientific.com/products/software/jaws/">JAWS - Commercial Windows screen reader</reference>
<reference url="https://www.apple.com/accessibility/voiceover/">VoiceOver Guide - Mac/iOS built-in screen reader</reference>
</category>

    <category name="ARIA Specifications">
      <reference url="https://www.w3.org/WAI/ARIA/apg/">ARIA Authoring Practices Guide - ARIA patterns and examples</reference>
      <reference url="https://www.w3.org/TR/html-aria/">ARIA in HTML - Rules for using ARIA with HTML</reference>
    </category>

    <category name="Testing Resources">
      <reference url="https://webaim.org/articles/screenreader_testing/">WebAIM Screen Reader Testing - Comprehensive testing guide</reference>
      <reference url="https://www.powermapper.com/tests/screen-readers/">Screen Reader Compatibility - Browser/SR combinations</reference>
    </category>

</external_references>

  <changelog id="SR-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline created from sando-button patterns</change>
      <change type="IMPROVED">Core rules established (5 rules)</change>
      <change type="IMPROVED">Rule 1: Semantic HTML first (non-negotiable)</change>
      <change type="IMPROVED">Rule 2: Accessible names required (text, aria-label, aria-labelledby)</change>
      <change type="IMPROVED">Rule 3: ARIA states and properties (pressed, expanded, busy, disabled)</change>
      <change type="IMPROVED">Rule 4: Live regions for announcements (aria-live, role="status", role="alert")</change>
      <change type="IMPROVED">Rule 5: Test with actual screen readers (NVDA, JAWS, VoiceOver, TalkBack)</change>
      <change type="IMPROVED">WCAG screen reader criteria (4.1.2, 4.1.3, 1.3.1, 2.4.6, 3.3.2)</change>
      <change type="IMPROVED">Semantic HTML elements table (button, a, nav, main, headings)</change>
      <change type="IMPROVED">Accessible names (text content, aria-label, aria-labelledby priority)</change>
      <change type="IMPROVED">ARIA states and properties table (pressed, expanded, busy, disabled, current, selected, checked)</change>
      <change type="IMPROVED">Live regions (polite vs assertive, role="status", role="alert")</change>
      <change type="IMPROVED">Screen reader testing guide (NVDA, JAWS, VoiceOver, TalkBack)</change>
      <change type="IMPROVED">Validation checklist (accessible names, ARIA usage, live regions, testing)</change>
      <change type="IMPROVED">Testing patterns from sando-button.a11y.test.ts</change>
      <change type="IMPROVED">Common patterns (icon-only, loading, toggle, disabled link)</change>
      <change type="NOTE">Agent-optimized format for token efficiency</change>
      <change type="NOTE">Patterns extracted from sando-button.ts and sando-button.a11y.test.ts</change>
      <change type="NOTE">References: sando-button.ts (lines 89, 259-306, 277-281, 287), sando-button.a11y.test.ts</change>
    </version>
  </changelog>

</guideline>
