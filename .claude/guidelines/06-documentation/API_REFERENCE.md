<guideline doc_id="API" category="06-documentation" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Technical Writer">

  <purpose id="API-PU">
    Establish comprehensive standards for documenting component APIs in the Sando Design System, ensuring developers can quickly understand and use components through clear, consistent, and complete reference documentation. This includes JSDoc annotations, property tables, event documentation, CSS custom properties, and type definitions.
  </purpose>

  <targets id="API-TGT">
    <target>All public components, mixins, and utilities</target>
  </targets>

  <scope id="API-SC">
    JSDoc comments, VitePress API tables, TypeScript types, usage examples
  </scope>

  <enforcement id="API-ENF">
    Code review, documentation build validation
  </enforcement>

<core_rules id="API-CR">
<rule id="API-CR-R1" title="Comprehensive JSDoc Component Headers (Non-Negotiable)">

<summary>
Every component file MUST include a complete JSDoc header with @element, description, @slot, @fires, @cssprop tags, and usage examples.
</summary>

      <pattern lang="typescript" title="JSDoc component header structure">
        /**
         * Component Name and Brief Description
         *
         * Extended description explaining purpose, features, and when to use.
         * Multiple paragraphs allowed for complex components.
         *
         * @element tag-name
         *
         * @slot - Default slot description
         * @slot named-slot - Named slot description
         *
         * @fires event-name - Event description with payload details
         *
         * @cssprop --component-property - CSS custom property description
         *
         * @example Basic usage
         * <tag-name attribute="value">Content</tag-name>
         *
         * @example Advanced pattern
         * <tag-name>
         *   <element slot="named-slot">Content</element>
         * </tag-name>
         */
      </pattern>

      <real_example lang="typescript" title="From sando-button.ts">
        /**
         * Sando Button Component
         *
         * A fully accessible button component built with Lit following industry standards.
         * Supports multiple variants, sizes, states, and can render as button or link.
         *
         * @element sando-button
         *
         * @slot - Button content (text, icons, etc.)
         * @slot icon-start - Icon before the button text (alternative: use start-icon prop)
         * @slot icon-end - Icon after the button text (alternative: use end-icon prop)
         *
         * @fires click - Fired when the button is clicked (unless disabled)
         *
         * @cssprop --sando-button-fontFamily - Button font family
         * @cssprop --sando-button-fontWeight - Button font weight
         * @cssprop --sando-button-borderRadius - Button border radius
         * @cssprop --sando-button-transition-duration - Transition duration
         *
         * @example Basic usage with variants
         * <sando-button variant="solid" size="medium">Solid</sando-button>
         * <sando-button variant="outline">Outline</sando-button>
         *
         * @example With icons (slot method)
         * <sando-button>
         *   <span slot="icon-start">⭐</span>
         *   Favorite
         * </sando-button>
         *
         * @example As link
         * <sando-button href="https://example.com" target="_blank">
         *   Visit Site
         * </sando-button>
         */
      </real_example>

      <why>
        JSDoc serves as the single source of truth for component API. IDEs show this documentation on hover, documentation generators extract it, and it stays synchronized with code.
      </why>

      <reference type="source_file" path="sando-button.ts" lines="1-61">
        Complete JSDoc header example
      </reference>
      <reference type="guideline" doc_id="CS" file="../03-development/CODE_STYLE.md">
        JSDoc standards
      </reference>
    </rule>

    <rule id="API-CR-R2" title="Complete Property Tables in VitePress (Required)">
      <summary>
        Every component guide in VitePress MUST include a comprehensive Properties table with columns: Property, Type, Default, Description.
      </summary>

      <api_specification title="VitePress property table structure">
        <summary>
          API Reference
        </summary>

        <property name="propertyName" type="'value1' | 'value2'" default="'value1'">
          Human-readable description of what this property does
        </property>

        <property name="booleanProp" type="boolean" default="false">
          Description of boolean behavior
        </property>

        <property name="optionalProp" type="string" default="undefined">
          Description (note: undefined means optional)
        </property>
      </api_specification>

      <type_notation_conventions>
        <convention>Union types: 'solid' \| 'outline' \| 'ghost'</convention>
        <convention>Literal escape: Use backticks and \| for pipe character</convention>
        <convention>Boolean: boolean (lowercase)</convention>
        <convention>Optional: Show undefined as default</convention>
        <convention>Complex types: Link to TypeScript definition</convention>
      </type_notation_conventions>

      <api_specification_example title="From button.md">
        <property name="variant" type="'solid' | 'outline' | 'ghost' | 'text'" default="'solid'">
          Visual style variant
        </property>

        <property name="size" type="'xs' | 'small' | 'medium' | 'large'" default="'medium'">
          Button size (all WCAG compliant)
        </property>

        <property name="disabled" type="boolean" default="false">
          Whether the button is disabled
        </property>

        <property name="href" type="string" default="undefined">
          URL (renders as `<a>` instead of `<button>`)
        </property>

        <property name="ariaLabel" type="string" default="null">
          Accessible label (overrides visible text)
        </property>
      </api_specification_example>

      <why>
        Tables provide scannable reference format. Developers can quickly find property types, defaults, and usage without reading full documentation.
      </why>

      <reference type="source_file" path="apps/site/components/button.md" lines="254-278">
        Complete property table example
      </reference>
    </rule>

    <rule id="API-CR-R3" title="Inline Property JSDoc with @default Tag (Required)">
      <summary>
        Every @property decorator MUST have JSDoc comment with description and @default tag showing the default value.
      </summary>

      <pattern lang="typescript" title="Property JSDoc patterns">
        /**
         * Human-readable description of what this property does.
         * Can be multiple lines for complex behavior.
         * @default 'defaultValue'
         */
        @property({ reflect: true })
        propertyName: PropertyType = 'defaultValue';

        /**
         * Boolean property description.
         * @default false
         */
        @property({ type: Boolean, reflect: true })
        booleanProperty = false;

        /**
         * Optional property (no default value).
         */
        @property({ reflect: true })
        optionalProperty?: string;
      </pattern>

      <real_examples lang="typescript" title="From sando-button.ts">
        /**
         * Visual style variant of the button
         * @default 'solid'
         */
        @property({ reflect: true })
        variant: ButtonVariant = 'solid';

        /**
         * Whether the button is disabled
         * @default false
         */
        @property({ type: Boolean, reflect: true })
        disabled = false;

        /**
         * URL to navigate to (renders as &lt;a&gt; instead of &lt;button&gt;)
         */
        @property({ reflect: true })
        href?: string;
      </real_examples>

      <why>
        Inline JSDoc keeps documentation synchronized with code. When property defaults change, @default tag must be updated. IDEs show this information on hover.
      </why>

      <reference type="source_file" path="sando-button.ts" lines="80-200">
        Property JSDoc examples
      </reference>
    </rule>

    <rule id="API-CR-R4" title="Slots, Events, and CSS Properties Documentation (Required)">
      <summary>
        Components MUST document slots, events, and CSS custom properties in both JSDoc header and VitePress API tables.
      </summary>

      <api_slots_pattern title="Slots Pattern">
        <slot name="Default" description="Default slot description (what goes in unnamed slot)" />
        <slot name="named-slot" description="Named slot description and usage" />
      </api_slots_pattern>

      <api_events_pattern title="Events Pattern">
        <event name="event-name" type="CustomEvent<PayloadType>" description="When this event fires and what data it contains" />
      </api_events_pattern>

      <api_css_pattern title="CSS Custom Properties Pattern">
        <summary>
          CSS Custom Properties
          Key CSS variables you can override:
        </summary>
        <example lang="css">
          /* Category: Base Styles */
          --component-property: /* Description and default value */

          /* Category: Variant-Specific */
          --component-variant-property: /* Description */
        </example>
        <note>
          Full list of all CSS custom properties available in the component.
        </note>
      </api_css_pattern>

      <real_example title="From button.md">
        <api_slots_example>
          <slot name="Default" description="Button content (text, icons, etc.)" />
          <slot name="icon-start" description="Icon or content before the button text" />
          <slot name="icon-end" description="Icon or content after the button text" />
        </api_slots_example>

        <api_events_example>
          <event name="click" type="CustomEvent" description="Fired when button is clicked (unless disabled or loading)" />
        </api_events_example>

        <api_css_example>
          <summary>
            CSS Custom Properties
          </summary>
          <example lang="css">
            /* Base styles */
            --sando-button-fontFamily
            --sando-button-fontWeight
            --sando-button-borderRadius
            --sando-button-transition-duration

            /* Variant-specific: solid */
            --sando-button-solid-backgroundColor-default
            --sando-button-solid-textColor-default
          </example>
        </api_css_example>
      </real_example>

      <why>
        Complete API reference requires slots, events, and CSS properties. Developers need to know customization points and interaction patterns.
      </why>

      <reference type="source_file" path="apps/site/components/button.md" lines="279-299">
        Complete API tables
      </reference>
      <reference type="source_file" path="sando-button.ts" lines="9-18">
        JSDoc slot/event documentation
      </reference>
    </rule>

    <rule id="API-CR-R5" title="TypeScript Type Definitions with JSDoc (Required)">
      <summary>
        All exported types MUST have JSDoc comments explaining their purpose, allowed values, and usage context.
      </summary>

      <pattern lang="typescript" title="Type definition documentation">
        /**
         * Type description explaining what this type represents and where it's used.
         *
         * @example
         * const variant: ComponentVariant = 'solid';
         */
        export type ComponentVariant = 'value1' | 'value2' | 'value3';

        /**
         * Interface description with property explanations.
         */
        export interface ComponentConfig {
          /**
           * Property description
           * @default 'defaultValue'
           */
          propertyName: string;

          /**
           * Optional property description
           */
          optionalProperty?: boolean;
        }
      </pattern>

      <real_example lang="typescript" title="From sando-button.types.ts">
        /**
         * Visual style variant of the button.
         *
         * - `solid`: High emphasis with filled background (default)
         * - `outline`: Medium emphasis with border
         * - `ghost`: Low emphasis without background or border
         * - `text`: Minimal text-only style for inline links
         */
        export type ButtonVariant = "solid" | "outline" | "ghost" | "text";

        /**
         * Size variants for the button.
         *
         * All sizes meet WCAG 2.1 Level AA minimum touch target size (44x44px).
         *
         * - `xs`: Extra small for compact interfaces
         * - `small`: Small for tight spaces
         * - `medium`: Default size for most use cases
         * - `large`: Large for primary actions
         */
        export type ButtonSize = "xs" | "small" | "medium" | "large";
      </real_example>

      <why>
        Type definitions are part of public API. JSDoc comments explain allowed values, constraints, and usage patterns. Documentation generators extract this information.
      </why>

      <reference type="source_file" path="sando-button.types.ts">
        Type definition examples
      </reference>
      <reference type="guideline" doc_id="NC" file="../03-development/NAMING_CONVENTIONS.md">
        TypeScript conventions
      </reference>
    </rule>

</core_rules>

<vitepress_structure id="API-VPS">
<standard_template id="API-VPS-ST" lang="markdown"> # Component Name

      Brief one-sentence description of the component.

      ## Features

      - ✅ **Feature 1**: Description
      - ♿ **Accessibility**: WCAG compliance level
      - 🎨 **Themeable**: Token-driven styling
      - 🔒 **Type Safe**: Full TypeScript support
      - ⚡ **Performant**: Bundle size

      ## Basic Usage

      ```html
      <!-- Import -->
      <script type="module">
        import "@sando/components/component-name";
      </script>

      <!-- Use -->
      <component-name attribute="value">
        Content
      </component-name>
      ```

      ## Variants

      ### Variant 1 Name

      Description of what this variant does.

      ```html
      <component-name variant="variant1">Example</component-name>
      ```

      ### Variant 2 Name

      Description of what this variant does.

      ```html
      <component-name variant="variant2">Example</component-name>
      ```

      ## States

      ### State 1

      ```html
      <component-name state-attribute>Example</component-name>
      ```

      ## Theming

      ### Using Flavors

      ```html
      <component-name flavor="strawberry">Themed</component-name>
      ```

      ### Custom Styling

      ```html
      <component-name style="--component-property: custom-value;">
        Custom
      </component-name>
      ```

      ## API Reference

      ### Properties

      | Property | Type | Default | Description |
      |----------|------|---------|-------------|
      | ...      | ...  | ...     | ...         |

      ### Slots

      | Slot | Description |
      |------|-------------|
      | ...  | ...         |

      ### Events

      | Event | Type | Description |
      |-------|------|-------------|
      | ...   | ...  | ...         |

      ### CSS Custom Properties

      ```css
      /* List of customizable variables */
      ```

      ## Accessibility

      - ✅ WCAG criterion met
      - ✅ Keyboard navigation details
      - ✅ Screen reader support
      - ⚠️ Important accessibility considerations

      ## Examples

      ### Complex Example 1

      Description of the example.

      ```html
      <example-code></example-code>
      ```

      ### Complex Example 2

      Description of the example.

      ```html
      <example-code></example-code>
      ```

      ## Best Practices

      - ✅ DO: Recommended pattern
      - ❌ DON'T: Anti-pattern to avoid

      ## Framework Integration

      ### React

      ```tsx
      import "@sando/components/component-name";

      function App() {
        return <component-name attribute="value">Content</component-name>;
      }
      ```

      ### Vue 3

      ```vue
      <template>
        <component-name attribute="value">Content</component-name>
      </template>
      ```
    </standard_template>

    <why>
      Consistent structure helps developers find information quickly. Template ensures all components document the same sections in the same order.
    </why>

    <reference type="source_file" path="apps/site/components/button.md">
      Complete structure example
    </reference>

</vitepress_structure>

<property\*patterns id="API-PP">
<string_union_types id="API-PP-SUT">
<typescript_pattern lang="typescript">
/\*\*

- Visual style variant.
  \_ @default 'solid'
  \*/
  @property({ reflect: true })
  variant: 'solid' | 'outline' | 'ghost' = 'solid';
  </typescript_pattern>

        <vitepress_table lang="markdown">
          | `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Visual style variant |
        </vitepress_table>
      </string_union_types>

      <boolean_properties id="API-PP-BP">
        <typescript_pattern lang="typescript">
          /**
           * Whether the button is disabled.
           * @default false
           */
          @property({ type: Boolean, reflect: true })
          disabled = false;
        </typescript_pattern>

        <vitepress_table lang="markdown">
          | `disabled` | `boolean` | `false` | Whether the button is disabled |
        </vitepress_table>
      </boolean_properties>

      <optional_properties id="API-PP-OP">
        <typescript_pattern lang="typescript">
          /**
           * URL to navigate to (renders as &lt;a&gt; instead of &lt;button&gt;).
           */
          @property({ reflect: true })
          href?: string;
        </typescript_pattern>

        <vitepress_table lang="markdown">
          | `href` | `string` | `undefined` | URL (renders as `<a>` instead of `<button>`) |
        </vitepress_table>

        <note>
          Use undefined to indicate optional properties in Default column.
        </note>
      </optional_properties>

      <number_properties id="API-PP-NP">
        <typescript_pattern lang="typescript">
          /**
           * Tab index for keyboard navigation.
           * @default 0
           */
          @property({ type: Number, reflect: true })
          tabindex = 0;
        </typescript_pattern>

        <vitepress_table lang="markdown">
          | `tabindex` | `number` | `0` | Tab index for keyboard navigation |
        </vitepress_table>
      </number_properties>

      <complex_object_properties id="API-PP-COP">
        <typescript_pattern lang="typescript">
          /**
           * Configuration object for advanced behavior.
           * See {@link ComponentConfig} for details.
           */
          @property({ type: Object })
          config?: ComponentConfig;
        </typescript_pattern>

        <vitepress_table lang="markdown">
          | `config` | `ComponentConfig` | `undefined` | Configuration object (see [ComponentConfig](#componentconfig)) |
        </vitepress_table>

        <type_definition lang="markdown">
          #### ComponentConfig

          ```typescript
          interface ComponentConfig {
            propertyA: string;
            propertyB: boolean;
          }
          ```
        </type_definition>
      </complex_object_properties>

</property_patterns>

<event\*patterns id="API-EP">
<custom_events id="API-EP-CE">
<component_implementation lang="typescript">
/\*\*

- Dispatched when selection changes.
  \_/
  private dispatchChangeEvent() {
  this.dispatchEvent(
  new CustomEvent('change', {
  detail: { value: this.value },
  bubbles: true,
  composed: true,
  })
  );
  }
  </component_implementation>

        <jsdoc_header lang="typescript">
          /**
           * @fires change - Fired when selection changes
           * @fires change.detail - { value: string } - The new value
           */
        </jsdoc_header>

        <vitepress_table lang="markdown">
          ### Events

          | Event    | Type                             | Description                                                                   |
          | -------- | -------------------------------- | ----------------------------------------------------------------------------- |
          | `change` | `CustomEvent<{ value: string }>` | Fired when selection changes. Contains the new value in `event.detail.value`. |
        </vitepress_table>
      </custom_events>

      <native_events id="API-EP-NE">
        <jsdoc_header lang="typescript">
          /**
           * @fires click - Native click event (fired unless disabled or loading)
           */
        </jsdoc_header>

        <vitepress_table lang="markdown">
          | `click` | `MouseEvent` | Native click event (only fires when not disabled or loading) |
        </vitepress_table>
      </native_events>

</event_patterns>

<css_properties_documentation id="API-CPD">
<grouping_by_category id="API-CPD-GBC" lang="markdown"> ### CSS Custom Properties

      #### Base Styles

      Variables that apply to all variants:

      ```css
      --component-fontFamily
      --component-fontSize
      --component-fontWeight
      --component-lineHeight
      ```

      #### Variant-Specific: Solid

      ```css
      --component-solid-backgroundColor-default
      --component-solid-backgroundColor-hover
      --component-solid-textColor-default
      ```

      #### Variant-Specific: Outline

      ```css
      --component-outline-borderColor-default
      --component-outline-borderColor-hover
      --component-outline-textColor-default
      ```

      #### State-Specific

      ```css
      --component-disabled-opacity
      --component-loading-spinnerColor
      ```
    </grouping_by_category>

    <why>
      Grouping helps developers find the right CSS variable. Categories match component structure (base, variants, states).
    </why>

    <token_consumption id="API-CPD-TC" lang="markdown">
      ### Design Tokens

      This component consumes tokens from the `button` Recipe:

      - `--sando-button-solid-backgroundColor-default`
      - `--sando-button-solid-backgroundColor-hover`
      - `--sando-button-solid-textColor-default`

      See [Token Architecture](../../design-system/tokens) for the complete three-layer system.
    </token_consumption>

    <token_consumption_why>
      Helps designers understand token usage and enables refactoring. Links component implementation to design system foundations.
    </token_consumption_why>

</css_properties_documentation>

<slot\*patterns id="API-SP">
<default_slot id="API-SP-DS">
<jsdoc lang="typescript">
/\*\*

- @slot - Default slot for button content (text, icons, HTML)
  \_/
  </jsdoc>

        <vitepress_table lang="markdown">
          | Default | Button content (text, icons, HTML elements) |
        </vitepress_table>
      </default_slot>

      <named_slots id="API-SP-NS">
        <jsdoc lang="typescript">
          /**
           * @slot icon-start - Icon or content before the button text
           * @slot icon-end - Icon or content after the button text
           */
        </jsdoc>

        <vitepress_table lang="markdown">
          | `icon-start` | Icon or content before the button text |
          | `icon-end`   | Icon or content after the button text  |
        </vitepress_table>

        <usage_example lang="html">
          <sando-button>
            <svg slot="icon-start">...</svg>
            Button Text
            <span slot="icon-end">→</span>
          </sando-button>
        </usage_example>
      </named_slots>

</slot_patterns>

<accessibility_documentation id="API-AD">
<wcag_compliance_table id="API-AD-WCT" lang="markdown"> ## Accessibility

      | WCAG Criterion           | Level | Status  | Implementation                                |
      | ------------------------ | ----- | ------- | --------------------------------------------- |
      | 1.4.3 Contrast (Minimum) | AA    | ✅ Pass | All text meets 4.5:1 contrast ratio           |
      | 2.1.1 Keyboard           | A     | ✅ Pass | Fully keyboard accessible (Tab, Enter, Space) |
      | 2.4.7 Focus Visible      | AA    | ✅ Pass | Visible focus indicator with 3:1 contrast     |
      | 4.1.2 Name, Role, Value  | A     | ✅ Pass | Proper role, accessible name, and states      |
    </wcag_compliance_table>

    <keyboard_navigation id="API-AD-KN" lang="markdown">
      ### Keyboard Navigation

      | Key                | Action                               |
      | ------------------ | ------------------------------------ |
      | `Tab`              | Move focus to/from button            |
      | `Enter` or `Space` | Activate button                      |
      | `Escape`           | (For dialogs) Close and return focus |
    </keyboard_navigation>

    <screen_reader_support id="API-AD-SRS" lang="markdown">
      ### Screen Reader Support

      - ✅ Announces button role and accessible name
      - ✅ Announces disabled state ("dimmed" or "unavailable")
      - ✅ Announces loading state via `aria-busy="true"`
      - ✅ Announces toggle state via `aria-pressed` (when toggle enabled)
      - ⚠️ Icon-only buttons MUST have `aria-label` attribute
    </screen_reader_support>

</accessibility_documentation>

<examples_documentation id="API-ED">
<basic_example_pattern id="API-ED-BEP" lang="markdown"> ### Example Title

      Brief description of what this example demonstrates.

      ```html
      <component-name attribute="value">
        Content
      </component-name>
      ```

      **Result**: What the user sees or experiences.
    </basic_example_pattern>

    <interactive_javascript id="API-ED-IJ" lang="markdown">
      ### Dynamic Example

      Shows how to update properties programmatically.

      ```html
      <sando-button id="my-button">Click Me</sando-button>

      <script>
        const button = document.getElementById('my-button');
        let count = 0;

        button.addEventListener('click', () => {
          count++;
          button.textContent = `Clicked ${count} times`;
        });
      </script>
      ```
    </interactive_javascript>

    <framework_specific id="API-ED-FS">
      <react_example lang="markdown">
        ### React Example

        ```tsx
        import { useRef } from 'react';
        import '@sando/components/button';

        function App() {
          const buttonRef = useRef<HTMLElement>(null);

          return (
            <sando-button
              ref={buttonRef}
              variant="solid"
              onClick={() => console.log('Clicked')}
            >
              Click Me
            </sando-button>
          );
        }
        ```
      </react_example>

      <vue_example lang="markdown">
        ### Vue 3 Example

        ```vue
        <template>
          <sando-button variant="solid" @click="handleClick">
            Click Me
          </sando-button>
        </template>

        <script setup lang="ts">
        const handleClick = () => console.log("Clicked");
        </script>
        ```
      </vue_example>
    </framework_specific>

</examples_documentation>

<validation_checklist id="API-VC">
<component_jsdoc_header id="API-VC-CJH">
<checks>
<check>Component description (1-2 paragraphs)</check>
<check>@element tag with custom element name</check>
<check>All slots documented with @slot tags</check>
<check>All events documented with @fires tags</check>
<check>Key CSS custom properties documented with @cssprop tags</check>
<check>At least 2-3 @example blocks showing common usage</check>
<check>Examples use valid HTML syntax</check>
</checks>
</component_jsdoc_header>

    <property_documentation id="API-VC-PD">
      <checks>
        <check>Every @property has JSDoc comment</check>
        <check>Every property has @default tag (if applicable)</check>
        <check>Optional properties marked with ? or noted as optional</check>
        <check>Complex types reference TypeScript definitions</check>
        <check>Reflect attribute matches property name (kebab-case vs camelCase)</check>
      </checks>
    </property_documentation>

    <vitepress_api_reference id="API-VC-VAR">
      <checks>
        <check>Properties table complete with all public properties</check>
        <check>Type notation uses proper escaping (\| for union types)</check>
        <check>Default values match component implementation</check>
        <check>Slots table includes default slot (if applicable)</check>
        <check>Events table includes all custom and native events</check>
        <check>CSS custom properties listed and categorized</check>
      </checks>
    </vitepress_api_reference>

    <type_definitions id="API-VC-TD">
      <checks>
        <check>All exported types have JSDoc comments</check>
        <check>Union type values explained (what each value means)</check>
        <check>Interfaces have property-level JSDoc</check>
        <check>Complex types include usage examples</check>
      </checks>
    </type_definitions>

    <accessibility_documentation id="API-VC-AD">
      <checks>
        <check>WCAG criteria table included</check>
        <check>Keyboard navigation documented</check>
        <check>Screen reader support explained</check>
        <check>aria-* attributes documented</check>
        <check>Known limitations or warnings noted</check>
      </checks>
    </accessibility_documentation>

    <examples id="API-VC-EX">
      <checks>
        <check>Basic usage example provided</check>
        <check>Advanced pattern examples (if applicable)</check>
        <check>Framework integration examples (React, Vue)</check>
        <check>Examples are tested and work correctly</check>
        <check>Code snippets follow CODE_STYLE.md conventions</check>
      </checks>
    </examples>

</validation_checklist>

<related_guidelines id="API-RG">
<reference type="guideline" doc_id="CS" file="../03-development/CODE_STYLE.md">
JSDoc format standards
</reference>
<reference type="guideline" doc_id="SBS" file="./STORYBOOK_STORIES.md">
Interactive documentation in Storybook
</reference>
<reference type="guideline" doc_id="VPG" file="./VITEPRESS_GUIDES.md">
Long-form tutorial writing
</reference>
<reference type="guideline" doc_id="NC" file="../03-development/NAMING_CONVENTIONS.md">
Property and type naming
</reference>
<reference type="guideline" doc_id="WC" file="../04-accessibility/WCAG_COMPLIANCE.md">
Accessibility requirements
</reference>
</related_guidelines>

<external_references id="API-ER">
<category name="JSDoc">
<reference url="https://jsdoc.app/">JSDoc Official - Tag reference</reference>
<reference url="https://typedoc.org/">TypeDoc - TypeScript documentation generator</reference>
<reference url="https://custom-elements-manifest.open-wc.org/">Custom Elements Manifest - Web Components analyzer</reference>
</category>

    <category name="VitePress">
      <reference url="https://vitepress.dev/guide/markdown">VitePress Markdown - Markdown features</reference>
      <reference url="https://www.markdownguide.org/extended-syntax/#tables">Markdown Tables - Table syntax</reference>
    </category>

    <category name="Web Components">
      <reference url="https://developer.mozilla.org/en-US/docs/Web/Web_Components">MDN Web Components - Custom elements API</reference>
      <reference url="https://lit.dev/docs/">Lit Documentation - Lit-specific patterns</reference>
    </category>

</external_references>

  <changelog id="API-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline creation</change>
      <change type="IMPROVED">5 Core Rules: JSDoc headers, property tables, inline JSDoc, slots/events/CSS, TypeScript types</change>
      <change type="IMPROVED">VitePress documentation structure template</change>
      <change type="IMPROVED">Property documentation patterns (string unions, booleans, optional, numbers, objects)</change>
      <change type="IMPROVED">Event documentation patterns (custom events, native events)</change>
      <change type="IMPROVED">CSS custom properties grouping by category</change>
      <change type="IMPROVED">Slot documentation patterns (default, named)</change>
      <change type="IMPROVED">Accessibility documentation (WCAG table, keyboard, screen reader)</change>
      <change type="IMPROVED">Examples patterns (basic, interactive, framework-specific)</change>
      <change type="IMPROVED">Validation checklist (JSDoc, properties, VitePress, types, a11y, examples)</change>
      <change type="NOTE">References to sando-button.ts (lines 1-200), button.md (lines 254-299)</change>
      <change type="NOTE">Agent-optimized XML format for token efficiency</change>
      <change type="NOTE">API documentation is the user's first impression of component quality. Invest in clear, complete, accurate reference documentation.</change>
    </version>
  </changelog>

</guideline>
