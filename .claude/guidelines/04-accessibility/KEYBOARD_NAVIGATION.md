<guideline doc_id="KN" category="04-accessibility" version="1.0.0" status="Active" last_updated="2025-11-09" owner="QA Expert">

  <purpose id="KN-PU">
    Ensure all Sando Design System components are fully keyboard accessible per WCAG 2.1 Level A/AA standards. Defines keyboard interaction patterns, focus management, tab order, and testing procedures for Web Components with Shadow DOM.
  </purpose>

<target_audience id="KN-TA">
Frontend developers, QA engineers, UI designers
</target_audience>

  <scope id="KN-SC">
    All interactive components (buttons, forms, dialogs, menus, tabs)
  </scope>

<core_rules id="KN-CR">
<rule id="KN-CR-R1" title="All Interactive Elements Keyboard Accessible (Non-Negotiable)">

<summary>
Every interactive element MUST be operable via keyboard without mouse: Tab/Shift+Tab for navigation, Enter/Space for activation.
</summary>

      <pattern lang="typescript" title="✅ Correct keyboard support">
        // Native button (automatic keyboard support)
        &lt;button type="button"&gt;Submit&lt;/button&gt;

        // Custom interactive with keyboard handling
        &lt;div role="button" tabindex="0" @keydown=${this.handleKeydown}&gt;
      </pattern>

      <anti_pattern lang="typescript" title="❌ No keyboard support">
        // Div without keyboard support
        &lt;div onclick="handleClick"&gt;Click me&lt;/div&gt;
      </anti_pattern>

      <why>
        WCAG 2.1.1 Level A requirement. Essential for users with motor disabilities, blind users, and power users who prefer keyboard navigation.
      </why>

      <enforcement>
        Automated testing with keyboard event simulation in Vitest tests (see sando-button.test.ts).
      </enforcement>

      <reference type="external" url="https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html">
        WCAG 2.1.1 Keyboard
      </reference>
    </rule>

    <rule id="KN-CR-R2" title="Focus Visible Indicators (Non-Negotiable)">
      <summary>
        All focusable elements MUST display a visible focus indicator with 3:1 contrast ratio per WCAG 2.4.7 Level AA.
      </summary>

      <pattern lang="css" title="✅ Visible focus indicator">
        button:focus-visible {
          outline: 2px solid var(--sando-color-focus);
          outline-offset: 2px;
        }
      </pattern>

      <anti_pattern lang="css" title="❌ Removes focus without replacement">
        /* Removes focus indicator without replacement */
        button:focus {
          outline: none;
        }
      </anti_pattern>

      <why>
        Users must see where keyboard focus is located. Critical for keyboard navigation, motor disabilities, and cognitive disabilities.
      </why>

      <enforcement>
        Visual regression tests, manual testing, automated outline detection in unit tests.
      </enforcement>

      <reference type="external" url="https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html">
        WCAG 2.4.7 Focus Visible
      </reference>
    </rule>

    <rule id="KN-CR-R3" title="Logical Tab Order">
      <summary>
        Tab order MUST follow visual reading order (left-to-right, top-to-bottom for LTR). Never use positive tabindex values.
      </summary>

      <allowed_pattern>
        <item>DOM order = visual order</item>
        <item>tabindex="0" for custom interactive elements</item>
        <item>tabindex="-1" for programmatic focus only</item>
        <item>disabled removes from tab order</item>
      </allowed_pattern>

      <anti_pattern lang="html" title="❌ Positive tabindex creates unpredictable order">
        &lt;button tabindex="3"&gt;Third&lt;/button&gt;
        &lt;button tabindex="1"&gt;First&lt;/button&gt;
        &lt;button tabindex="2"&gt;Second&lt;/button&gt;
      </anti_pattern>

      <why>
        WCAG 2.4.3 Level A. Predictable navigation reduces cognitive load and prevents confusion.
      </why>

      <enforcement>
        Manual tab order testing, automated DOM order validation.
      </enforcement>

      <reference type="external" url="https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html">
        WCAG 2.4.3 Focus Order
      </reference>
    </rule>

    <rule id="KN-CR-R4" title="No Keyboard Traps (Non-Negotiable)">
      <summary>
        Users MUST be able to navigate away from any focused element using only keyboard. Provide Escape to close modals/dialogs.
      </summary>

      <requirements>
        <requirement>Tab/Shift+Tab always moves focus</requirement>
        <requirement>Escape closes dialogs and returns focus</requirement>
        <requirement>Focus trap within modals (Tab cycles through modal content)</requirement>
        <requirement>Document how to exit custom interactions</requirement>
      </requirements>

      <why>
        WCAG 2.1.2 Level A. Keyboard traps prevent users from completing tasks and accessing content.
      </why>

      <enforcement>
        Manual testing, automated trap detection in E2E tests.
      </enforcement>

      <reference type="external" url="https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html">
        WCAG 2.1.2 No Keyboard Trap
      </reference>
    </rule>

    <rule id="KN-CR-R5" title="Shadow DOM Focus Delegation">
      <summary>
        Web Components MUST use delegatesFocus: true to ensure focus management works correctly in Shadow DOM.
      </summary>

      <pattern lang="typescript" title="✅ Focus delegation in Shadow DOM">
        export class SandoButton extends LitElement {
          static shadowRootOptions = {
            ...LitElement.shadowRootOptions,
            delegatesFocus: true,
          };
        }
      </pattern>

      <why>
        Shadow DOM encapsulation can break focus management. delegatesFocus automatically focuses first focusable element in shadow tree when host receives focus.
      </why>

      <enforcement>
        Component creation template includes this by default, verified in unit tests.
      </enforcement>

      <reference type="source_file" path="packages/components/src/components/button/sando-button.test.ts">
        focus delegation tests
      </reference>
    </rule>

</core_rules>

<wcag_keyboard_criteria id="KN-WC">
<criteria>
<criterion id="2.1.1" level="A" title="Keyboard">
<requirement>All functionality available via keyboard</requirement>
<implementation>Tab, Enter, Space keys</implementation>
<test_method>Tab through all interactive elements</test_method>
</criterion>

      <criterion id="2.1.2" level="A" title="No Keyboard Trap">
        <requirement>User can navigate away from any element</requirement>
        <implementation>Escape key, Tab always works</implementation>
        <test_method>Tab/Escape from all states</test_method>
      </criterion>

      <criterion id="2.4.3" level="A" title="Focus Order">
        <requirement>Tab order matches visual order</requirement>
        <implementation>DOM structure = visual layout</implementation>
        <test_method>Manual tab order inspection</test_method>
      </criterion>

      <criterion id="2.4.7" level="AA" title="Focus Visible">
        <requirement>Visible focus indicator present</requirement>
        <implementation>:focus-visible styles, 3:1 contrast</implementation>
        <test_method>Visual inspection, contrast tools</test_method>
      </criterion>

      <criterion id="3.2.1" level="A" title="On Focus">
        <requirement>Focus alone does not trigger context changes</requirement>
      </criterion>

      <criterion id="2.5.1" level="A" title="Pointer Gestures">
        <requirement>All functionality via single pointer</requirement>
      </criterion>

      <criterion id="2.5.2" level="A" title="Pointer Cancellation">
        <requirement>Can abort/undo activation</requirement>
      </criterion>
    </criteria>

    <reference type="external" url="https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=211%2C212%2C243%2C247">
      WCAG 2.1 Quick Reference - Keyboard Accessible
    </reference>

</wcag_keyboard_criteria>

<keyboard_interactions id="KN-KI">
<navigation_keys id="KN-KI-NAV">
<key name="Tab">
<action>Move focus forward</action>
<applies_to>All interactive elements</applies_to>
<notes>Standard navigation</notes>
</key>
<key name="Shift+Tab">
<action>Move focus backward</action>
<applies_to>All interactive elements</applies_to>
<notes>Reverse navigation</notes>
</key>
</navigation_keys>

    <activation_keys id="KN-KI-ACT">
      <key name="Enter">
        <action>Activate element</action>
        <applies_to>Buttons, links, menu items</applies_to>
        <notes>Primary activation</notes>
      </key>
      <key name="Space">
        <action>Activate element</action>
        <applies_to>Buttons, checkboxes, switches</applies_to>
        <notes>Toggle/activate</notes>
      </key>
    </activation_keys>

    <component_specific_keys id="KN-KI-CSK">
      <key name="Escape">
        <action>Cancel/close</action>
        <applies_to>Modals, dialogs, menus, popovers</applies_to>
        <notes>Exit interaction, restore focus</notes>
      </key>
      <key name="Arrow Up/Down">
        <action>Navigate items</action>
        <applies_to>Vertical lists, menus, selects, radios</applies_to>
        <notes>Vertical navigation</notes>
      </key>
      <key name="Arrow Left/Right">
        <action>Navigate items</action>
        <applies_to>Horizontal tabs, sliders</applies_to>
        <notes>Horizontal navigation</notes>
      </key>
      <key name="Home">
        <action>First item</action>
        <applies_to>Lists, menus, tabs</applies_to>
        <notes>Jump to start</notes>
      </key>
      <key name="End">
        <action>Last item</action>
        <applies_to>Lists, menus, tabs</applies_to>
        <notes>Jump to end</notes>
      </key>
      <key name="Page Up/Down">
        <action>Scroll container</action>
        <applies_to>Scrollable regions</applies_to>
        <notes>Large movements</notes>
      </key>
    </component_specific_keys>

    <reference type="external" url="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/">
      WAI-ARIA Authoring Practices Guide - Complete keyboard patterns
    </reference>

</keyboard_interactions>

<focus_management id="KN-FM">
<shadow_dom_delegation id="KN-FM-SD">
<required_pattern lang="typescript">
export class SandoComponent extends LitElement {
static shadowRootOptions = {
...LitElement.shadowRootOptions,
delegatesFocus: true,
};
}
</required_pattern>

      <behavior>
        <item>Focuses first focusable element in shadow tree when host receives focus</item>
        <item>Enables Tab to enter shadow tree naturally</item>
        <item>Required for proper keyboard navigation in Web Components</item>
      </behavior>

      <test_pattern lang="typescript" source="sando-button.test.ts">
        const button = element.shadowRoot?.querySelector("button");
        element.focus();
        expect(document.activeElement).toBe(element);
        expect(element.shadowRoot?.activeElement).toBe(button);
      </test_pattern>
    </shadow_dom_delegation>

    <modal_dialog_pattern id="KN-FM-MD">
      <step number="1" phase="On open">
        Move focus to first focusable element (usually close button or first input)
      </step>
      <step number="2" phase="During interaction">
        Trap focus within modal (Tab cycles through modal content only)
      </step>
      <step number="3" phase="On close">
        Restore focus to trigger element
      </step>
      <step number="4" phase="Escape key">
        Close modal and restore focus
      </step>

      <implementation_note>
        Use focusTrap directive or similar (do not implement manually).
      </implementation_note>
    </modal_dialog_pattern>

    <focus_restoration id="KN-FM-FR">
      <when_to_restore>
        <scenario>Closing dialogs/modals</scenario>
        <scenario>Deleting items from lists (focus next/previous item)</scenario>
        <scenario>Collapsing expanded sections</scenario>
        <scenario>Completing multi-step flows</scenario>
      </when_to_restore>

      <pattern lang="typescript">
        const triggerElement = document.activeElement;
        // ... open dialog
        dialog.close();
        (triggerElement as HTMLElement)?.focus();
      </pattern>
    </focus_restoration>

</focus_management>

<tab_order_management id="KN-TOM">
<natural_tab_order id="KN-TOM-NTO">
<principle>
DOM order MUST match visual order.
</principle>

      <implementation>
        <guideline>Use semantic HTML in logical order</guideline>
        <guideline>CSS Grid/Flexbox order property does NOT change tab order</guideline>
        <guideline>Verify tab order matches reading order in all layouts</guideline>
      </implementation>
    </natural_tab_order>

    <tabindex_usage id="KN-TOM-TU">
      <value name='tabindex="0"'>
        <meaning>Natural tab order</meaning>
        <use_case>Custom interactive elements (role="button", etc.)</use_case>
      </value>
      <value name='tabindex="-1"'>
        <meaning>Not in tab order, programmatically focusable</meaning>
        <use_case>Headings, containers, focus targets</use_case>
      </value>
      <value name='tabindex="1+"'>
        <meaning>Explicit order (ANTI-PATTERN)</meaning>
        <use_case>Never use</use_case>
      </value>

      <common_mistake>
        Using positive tabindex values creates unpredictable tab order.
      </common_mistake>
    </tabindex_usage>

    <removing_from_tab_order id="KN-TOM-RTO">
      <when_to_remove>
        <item>disabled attribute (buttons, inputs)</item>
        <item>aria-hidden="true" elements</item>
        <item>Hidden elements (display: none, visibility: hidden)</item>
        <item>Inactive tab panels</item>
      </when_to_remove>

      <pattern lang="typescript">
        // ✅ Disabled removes from tab order
        &lt;button disabled&gt;Cannot focus&lt;/button&gt;

        // ✅ Programmatic focus only
        &lt;h2 tabindex="-1" id="section-heading"&gt;Section&lt;/h2&gt;
      </pattern>
    </removing_from_tab_order>

</tab_order_management>

<focus_visible_styles id="KN-FVS">
<required_pattern id="KN-FVS-RP">

<summary>
Use :focus-visible pseudo-class
</summary>

      <pattern lang="css">
        button:focus-visible {
          outline: 2px solid var(--sando-color-focus);
          outline-offset: 2px;
        }
      </pattern>

      <why_focus_visible>
        <reason>:focus shows outline on mouse click (visually distracting)</reason>
        <reason>:focus-visible shows outline only for keyboard navigation</reason>
        <reason>Browsers automatically determine when focus should be visible</reason>
      </why_focus_visible>
    </required_pattern>

    <wcag_requirements id="KN-FVS-WR">
      <requirement id="1.4.11" level="AA" title="Non-text Contrast">
        <item>Focus indicator MUST have 3:1 contrast ratio against background</item>
        <item>Focus indicator MUST have 3:1 contrast ratio against unfocused state</item>
      </requirement>

      <requirement id="2.4.7" level="AA" title="Focus Visible">
        <item>Focus indicator MUST be visible for all focusable elements</item>
        <item>Indicator MUST be visible in all color modes (light, dark, high-contrast)</item>
      </requirement>
    </wcag_requirements>

    <token_usage id="KN-FVS-TU">
      <pattern lang="css" title="Sando focus color token">
        button:focus-visible {
          outline: 2px solid var(--sando-color-action-focus);
          outline-offset: 2px;
        }
      </pattern>

      <verify_in_all_themes>
        <theme>Original flavor</theme>
        <theme>Strawberry, Ocean, Forest, Sunset flavors</theme>
        <theme>Light mode, dark mode, high-contrast mode</theme>
      </verify_in_all_themes>
    </token_usage>

</focus_visible_styles>

  <testing id="KN-TST">
    <manual_testing id="KN-TST-MT">
      <procedure>
        <step number="1">Tab navigation: Tab through all interactive elements, verify order matches visual layout</step>
        <step number="2">Shift+Tab navigation: Reverse tab through all elements</step>
        <step number="3">Enter/Space activation: Activate buttons, links, checkboxes with Enter/Space</step>
        <step number="4">Escape cancellation: Close dialogs, menus, popovers with Escape</step>
        <step number="5">Focus visible: Verify focus indicator visible on all elements</step>
        <step number="6">No keyboard traps: Verify can Tab away from all elements</step>
        <step number="7">Disabled state: Verify disabled elements not in tab order</step>
      </procedure>

      <browser_testing>
        Test in Chrome, Firefox, Safari, Edge (keyboard behavior can differ).
      </browser_testing>
    </manual_testing>

    <automated_testing id="KN-TST-AT">
      <unit_test_pattern lang="typescript" source="sando-button.test.ts">
        describe("Keyboard Navigation", () => {
          it("should be focusable via Tab key", async () => {
            const button = element.shadowRoot?.querySelector("button");
            element.focus();
            expect(document.activeElement).toBe(element);
          });

          it("should activate on Enter key", async () => {
            const enterEvent = new KeyboardEvent("keydown", {
              key: "Enter",
              bubbles: true,
            });
            const button = element.shadowRoot?.querySelector("button");
            button?.dispatchEvent(enterEvent);
            // Assert click handler called
          });

          it("should activate on Space key", async () => {
            const spaceEvent = new KeyboardEvent("keydown", {
              key: " ",
              bubbles: true,
            });
            const button = element.shadowRoot?.querySelector("button");
            button?.dispatchEvent(spaceEvent);
            // Assert click handler called
          });

          it("should not be focusable when disabled", () => {
            element.disabled = true;
            const button = element.shadowRoot?.querySelector("button");
            expect(button?.hasAttribute("disabled")).toBe(true);
          });
        });
      </unit_test_pattern>

      <e2e_test_pattern lang="typescript" tool="Playwright">
        test("keyboard navigation", async ({ page }) => {
          await page.keyboard.press("Tab");
          await expect(page.locator("button").first()).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(page.locator(".result")).toContainText("Clicked");
        });
      </e2e_test_pattern>
    </automated_testing>

  </testing>

<related_guidelines id="KN-RG">
<reference type="guideline" doc_id="WC" file="WCAG_COMPLIANCE.md">
Overall WCAG 2.1 compliance strategy
</reference>
<reference type="guideline" doc_id="SR" file="SCREEN_READER_SUPPORT.md">
ARIA patterns and screen reader testing
</reference>
<reference type="guideline" doc_id="TST" file="../03-development/TESTING_STRATEGY.md">
Test automation patterns
</reference>
</related_guidelines>

<external_references id="KN-ER">
<category name="WCAG Success Criteria">
<reference url="https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html">WCAG 2.1.1 Keyboard</reference>
<reference url="https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html">WCAG 2.1.2 No Keyboard Trap</reference>
<reference url="https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html">WCAG 2.4.3 Focus Order</reference>
<reference url="https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html">WCAG 2.4.7 Focus Visible</reference>
<reference url="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html">WCAG 1.4.11 Non-text Contrast</reference>
</category>

    <category name="Keyboard patterns">
      <reference url="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/">WAI-ARIA Authoring Practices Guide</reference>
      <reference url="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA Keyboard Patterns</reference>
    </category>

    <category name="Web Components">
      <reference url="https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus">Shadow DOM and delegatesFocus</reference>
      <reference url="https://lit.dev/docs/components/shadow-dom/#setting-shadowroot-options">Lit focus delegation</reference>
    </category>

    <category name="Testing">
      <reference url="https://vitest.dev/guide/">Vitest DOM Testing</reference>
      <reference url="https://playwright.dev/docs/api/class-keyboard">Playwright Keyboard API</reference>
    </category>

</external_references>

  <changelog id="KN-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline based on sando-button keyboard patterns</change>
      <change type="IMPROVED">Core rules: keyboard accessibility, focus visible, tab order, no traps, Shadow DOM</change>
      <change type="IMPROVED">WCAG keyboard criteria (2.1.1, 2.1.2, 2.4.3, 2.4.7, 1.4.11)</change>
      <change type="IMPROVED">Standard keyboard interactions (Tab, Enter, Space, Escape, Arrows)</change>
      <change type="IMPROVED">Shadow DOM focus delegation pattern (delegatesFocus: true)</change>
      <change type="IMPROVED">Focus management for modals/dialogs</change>
      <change type="IMPROVED">Tab order best practices (no positive tabindex)</change>
      <change type="IMPROVED">Focus visible styles (:focus-visible, 3:1 contrast)</change>
      <change type="IMPROVED">Manual and automated testing procedures</change>
      <change type="IMPROVED">Validation checklist (creation, testing, visual, WCAG)</change>
      <change type="NOTE">Agent-optimized for token efficiency</change>
    </version>
  </changelog>

</guideline>
