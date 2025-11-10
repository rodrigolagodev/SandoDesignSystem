<guideline doc_id="CD" category="01-design-system" version="1.0.0" status="Active" last_updated="2025-11-09" owner="UI Designer + Frontend Developer">

  <purpose id="CD-PU">
    This guideline establishes the design philosophy, variant taxonomy, and API conventions for all components in the Sando Design System. It serves as a reference for agents and skills when creating or modifying components, ensuring consistency, predictability, and adherence to the three-layer token architecture.
  </purpose>

<core_rules id="CD-CR">
<principle id="CD-CR-P1" title="Token-Driven Design">
All visual properties derive from Recipe tokens (Layer 3), never hardcoded values
</principle>
<principle id="CD-CR-P2" title="Predictable Patterns">
Variants follow consistent naming and behavior across all components
</principle>
<principle id="CD-CR-P3" title="T-Shirt Sizing">
Unified sizing scale (xs, sm, md, lg, xl) for cognitive simplicity
</principle>
<principle id="CD-CR-P4" title="Accessibility First">
WCAG 2.1 AA minimum for all components
</principle>
<principle id="CD-CR-P5" title="Composition Over Configuration">
Flexible APIs that balance simplicity with extensibility
</principle>
</core_rules>

<variant_taxonomy id="CD-VT">

<summary>
Components use standardized variant categories to ensure predictability and consistency.
</summary>

    <rule id="CD-VT-C1" title="Visual Variants (Appearance)">
      <description>
        Defines the **visual style** and **emphasis level** of a component.
      </description>

      <standard_pattern>
        <variant name="solid" emphasis_level="High" characteristics="Filled background, contrasting text" use_case="Primary actions, high prominence" />
        <variant name="outline" emphasis_level="Medium" characteristics="Border only, transparent background" use_case="Secondary actions, medium prominence" />
        <variant name="ghost" emphasis_level="Low" characteristics="No border, subtle hover state" use_case="Tertiary actions, low prominence" />
        <variant name="text" emphasis_level="Minimal" characteristics="Text only, no background/border" use_case="Inline actions, minimal prominence" />
      </standard_pattern>

      <type_definition_pattern lang="typescript">
        export type ComponentVariant = "solid" | "outline" | "ghost" | "text";
      </type_definition_pattern>

      <applicability>
        Button, Badge, Card, Alert, Chip, Tag, etc.
      </applicability>

      <recipe_token_pattern lang="json">
        {
          "component": {
            "solid": { "backgroundColor": {...}, "textColor": {...} },
            "outline": { "borderColor": {...}, "textColor": {...} },
            "ghost": { "backgroundColor": {...}, "textColor": {...} },
            "text": { "textColor": {...} }
          }
        }
      </recipe_token_pattern>
    </rule>

    <rule id="CD-VT-C2" title="Size Variants (Scale)">
      <description>
        Defines the **physical dimensions** and **density** of a component.
      </description>

      <standard_pattern title="T-Shirt Sizing">
        <size name="xs" purpose="Extra compact" interactive_target="32px" visual_density="Very dense UIs" />
        <size name="sm" purpose="Small" interactive_target="36px" visual_density="Compact layouts" />
        <size name="md" purpose="Medium (default)" interactive_target="44px" visual_density="Standard comfortable" is_default="true" wcag_note="44px (WCAG)" />
        <size name="lg" purpose="Large" interactive_target="52px" visual_density="Prominent elements" />
        <size name="xl" purpose="Extra large" interactive_target="64px" visual_density="Hero/maximum impact" />
      </standard_pattern>

      <type_definition_pattern lang="typescript">
        export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";
      </type_definition_pattern>

      <applicability>
        All interactive components (Button, Input, Select, etc.), Layout components (Card, Modal, etc.)
      </applicability>

      <recipe_token_pattern lang="json">
        {
          "component": {
            "size": {
            "xs": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} },
            "sm": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} },
            "md": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} },
            "lg": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} },
            "xl": { "paddingInline": {...}, "paddingBlock": {...}, "fontSize": {...} }
            }
          }
        }
      </recipe_token_pattern>

      <constraint>
        Always `md` for WCAG 2.5.5 compliance (44px minimum touch target).
      </constraint>

      <pattern_note>
        `paddingInline > paddingBlock` (horizontal > vertical for better click targets).
      </pattern_note>
    </rule>

    <rule id="CD-VT-C3" title="Status Variants (Semantic State)">
      <description>
        Communicates **semantic meaning** through color coding.
      </description>

      <standard_pattern>
        <status name="default" meaning="Neutral, standard" color_scheme="Theme colors" use_cases="Normal state, no specific meaning" />
        <status name="success" meaning="Positive, confirmation" color_scheme="Green palette" use_cases="Success messages, confirmations" />
        <status name="destructive" meaning="Negative, dangerous" color_scheme="Red palette" use_cases="Errors, destructive actions" />
        <status name="warning" meaning="Caution, attention" color_scheme="Yellow/Orange palette" use_cases="Warnings, non-critical issues" />
        <status name="info" meaning="Informational" color_scheme="Blue palette" use_cases="Helpful information, tips" />
      </standard_pattern>

      <type_definition_pattern lang="typescript">
        export type ComponentStatus =
          | "default"
          | "success"
          | "destructive"
          | "warning"
          | "info";
      </type_definition_pattern>

      <applicability>
        Alert, Badge, Button (destructive actions), Input (validation), Toast, Banner, etc.
      </applicability>

      <recipe_token_pattern lang="json">
        {
          "component": {
            "status": {
            "success": { "backgroundColor": {...}, "textColor": {...}, "borderColor": {...} },
            "destructive": { "backgroundColor": {...}, "textColor": {...}, "borderColor": {...} },
            "warning": { "backgroundColor": {...}, "textColor": {...}, "borderColor": {...} },
            "info": { "backgroundColor": {...}, "textColor": {...}, "borderColor": {...} }
            }
          }
        }
      </recipe_token_pattern>
    </rule>

    <rule id="CD-VT-C4" title="Shape Variants (Border Radius)">
      <description>
        Defines the **corner rounding** of a component.
      </description>

      <standard_pattern>
        <shape_variant name="none" value_range="0px" visual_result="Sharp corners" use_cases="Corporate, formal designs" />
        <shape_variant name="default" value_range="4px-8px" visual_result="Subtle rounding" use_cases="Standard, balanced design" />
        <shape_variant name="full" value_range="9999px" visual_result="Pill/circular" use_cases="Pills, badges, icon buttons" />
      </standard_pattern>

      <type_definition_pattern lang="typescript">
        export type ComponentRadius = "none" | "default" | "full";
      </type_definition_pattern>

      <applicability>
      Button, Badge, Card, Input, Avatar, etc.
      </applicability>

      <recipe_token_pattern lang="json">
        {
          "component": {
            "radius": {
              "none": { "value": "0" },
              "default": { "value": "{border.radius.default.value}" },
              "full": { "value": "{border.radius.circle.value}" }
            }
          }
        }
      </recipe_token_pattern>
    </rule>

</variant_taxonomy>

<token_structure_patterns id="CD-TSP">

<summary>
Recipe tokens (Layer 3) for components follow predictable hierarchies.
</summary>

    <rule id="CD-TSP-P1" title="Variant-State-Property">
      <pattern lang="json">
        {
          "component": {
            "variant": {
              "property": {
                "state": { "value": "{flavor.token.value}" }
              }
            }
          }
        }
      </pattern>

      <example lang="json">
        {
          "button": {
            "solid": {
              "backgroundColor": {
                "default": { "value": "{color.action.solid.background.default.value}" },
                "hover": { "value": "{color.action.solid.background.hover.value}" },
                "active": { "value": "{color.action.solid.background.hover.value}" },
                "disabled": { "value": "{color.action.disabled.background.value}" }
              }
            }
          }
        }
      </example>
    </rule>

    <rule id="CD-TSP-P2" title="Size-Property">
      <pattern lang="json">
        {
          "component": {
            "size": {
              "sizeValue": {
                "property": { "value": "{flavor.token.value}" }
              }
            }
          }
        }
      </pattern>

      <example lang="json">
        {
          "button": {
            "size": {
              "md": {
                "paddingInline": { "value": "{space.inset.md.value}" },
                "paddingBlock": { "value": "{space.inset.sm.value}" },
                "fontSize": { "value": "{font.size.body.value}" },
                "minHeight": { "value": "{sizing.control.md.value}" }
              }
            }
          }
        }
      </example>
    </rule>

    <rule id="CD-TSP-P3" title="Component-Level Base Properties">
      <summary>
        Properties that don't change across variants/sizes.
      </summary>

      <pattern lang="json">
        {
          "component": {
            "fontFamily": { "value": "{font.family.body.value}" },
            "fontWeight": { "value": "{font.weight.emphasis.value}" },
            "lineHeight": { "value": "{font.lineHeight.body.value}" },
            "borderRadius": { "value": "{border.radius.default.value}" },
            "transition": {
              "duration": { "value": "{animation.duration.fast.value}" },
              "timing": { "value": "{animation.easing.default.value}" }
            }
          }
        }
      </pattern>

      <constraint>
        Recipes ONLY reference Flavors (Layer 2), NEVER Ingredients (Layer 1).
      </constraint>
    </rule>

</token_structure_patterns>

<standard_interactive_states id="CD-SIS">

<summary>
All interactive components must handle these states:
</summary>

    <rule id="CD-SIS-R1" title="Required States">
      <state name="default" description="Resting state" visual_feedback="Base styling" interactivity="Interactive" />
      <state name="hover" description="Mouse over" visual_feedback="Subtle color change" interactivity="Interactive" />
      <state name="active" description="Being pressed" visual_feedback="Visual "press" feedback" interactivity="Interactive" />
      <state name="focus" description="Keyboard focused" visual_feedback="Visible outline (WCAG 2.4.7)" interactivity="Interactive" />
      <state name="disabled" description="Not available" visual_feedback="Muted colors, cursor change" interactivity="Non-interactive" />
    </rule>

    <rule id="CD-SIS-R2" title="Optional States (Context-Dependent)">
      <state name="loading" description="Processing" when_to_use="Async operations (submit, fetch)" />
      <state name="pressed" description="Toggle active" when_to_use="Toggle buttons, selections" />
      <state name="invalid" description="Validation error" when_to_use="Form inputs, required fields" />
      <state name="readonly" description="View-only" when_to_use="Non-editable form fields" />
    </rule>

    <rule id="CD-SIS-R3" title="Token Pattern for States">
      <pattern lang="json">
        {
          "component": {
            "variant": {
              "property": {
                "default": { "value": "{...}" },
                "hover": { "value": "{...}" },
                "active": { "value": "{...}" },
                "focus": { "value": "{...}" },
                "disabled": { "value": "{...}" }
              }
            }
          }
        }
      </pattern>
    </rule>

</standard_interactive_states>

<api_design_principles id="CD-ADP">
<rule id="CD-ADP-R1" title="Property Design">
<guidelines>
<guideline>Use `reflect: true` for properties that affect styling (variant, size, disabled, etc.)</guideline>
<guideline>Provide sensible defaults (variant: 'solid', size: 'md')</guideline>
<guideline>Use TypeScript union types for variant enums</guideline>
<guideline>Boolean properties for binary states (disabled, loading, etc.)</guideline>
</guidelines>
<naming_conventions>
<convention>Use camelCase for properties (`fullWidth`, not `full-width`)</convention>
<convention>Use kebab-case for attributes (`full-width`, not `fullWidth`)</convention>
<convention>Boolean properties: No `is` prefix (`disabled`, not `isDisabled`)</convention>
</naming_conventions>
</rule>

    <rule id="CD-ADP-R2" title="Event Design">
      <standard_events>
        <event>Use native events when possible (`click`, `change`, `input`)</event>
        <event>Custom events for component-specific actions (`remove`, `select`, `toggle`)</event>
        <event>Set `bubbles: true, composed: true` for cross-shadow-DOM events</event>
      </standard_events>

      <naming_conventions>
        <convention>Use lowercase, no prefix (`remove`, not `onRemove` or `handleRemove`)</convention>
      </naming_conventions>
    </rule>

    <rule id="CD-ADP-R3" title="Slot Design">
      <common_slot_patterns>
        <pattern name="default" description="Main content" />
        <pattern name="header | footer" description="Semantic sections" />
        <pattern name="icon-start | icon-end" description="Icon positioning (when applicable)" />
      </common_slot_patterns>
      <guidelines>
        <guideline>Provide slots for flexible composition</guideline>
        <guideline>Offer prop alternatives for simple cases</guideline>
        <guideline>Document slot purpose and expected content</guideline>
      </guidelines>
    </rule>

</api_design_principles>

<naming_conventions id="CD-NC">
<rule id="CD-NC-R1" title="Component Names">
<pattern_format>
`sando-{component-name}`
</pattern_format>

      <examples>
        <example>`sando-button`</example>
        <example>`sando-input`</example>
        <example>`sando-card`</example>
        <example>`sando-modal`</example>
      </examples>

      <constraints>
        <constraint>Lowercase, hyphen-separated</constraint>
        <constraint>Descriptive, not abbreviated (`sando-button`, not `sando-btn`)</constraint>
        <constraint>Single word when possible (`button`, `input`, `modal`)</constraint>
        <constraint>Compound when necessary (`date-picker`, `combo-box`)</constraint>
      </constraints>
    </rule>

    <rule id="CD-NC-R2" title="CSS Variable Names">
      <pattern_format>
        `--sando-{component}-{variant?}-{property}-{state?}`
      </pattern_format>

      <examples>
        <example>`--sando-button-solid-backgroundColor-default`</example>
        <example>`--sando-input-borderColor-focus`</example>
        <example>`--sando-card-padding`</example>
      </examples>

      <constraints>
        <constraint>Kebab-case for all parts</constraint>
        <constraint>Include variant if property is variant-specific</constraint>
        <constraint>Include state if property is state-specific</constraint>
      </constraints>
    </rule>

    <rule id="CD-NC-R3" title="Type Names">
      <pattern_format>
        `{Component}{Category}` (PascalCase)
      </pattern_format>

      <examples>
        <example>`ButtonVariant`, `InputSize`, `CardStatus`</example>
        <example>`SandoButtonProps`, `SandoInputProps`</example>
      </examples>
    </rule>

</naming_conventions>

<accessibility_baseline id="CD-AB">

<summary>
All components MUST meet WCAG 2.1 Level AA:
</summary>

    <rule id="CD-AB-R1" title="Required (All Components)">
      <wcag_requirement id="1.4.3" name="Contrast">4.5:1 text, 3:1 large text, 3:1 UI components</wcag_requirement>
      <wcag_requirement id="4.1.2" name="Name, Role, Value">Proper ARIA attributes</wcag_requirement>
      <wcag_requirement id="4.1.3" name="Status Messages">Screen reader announcements for dynamic content</wcag_requirement>
    </rule>

    <rule id="CD-AB-R2" title="Required (Interactive Components)">
      <wcag_requirement id="2.1.1" name="Keyboard">All functionality via keyboard</wcag_requirement>
      <wcag_requirement id="2.4.7" name="Focus Visible">Visible focus indicator (≥2px outline, ≥2px offset)</wcag_requirement>
      <wcag_requirement id="2.5.5" name="Target Size">≥44×44px touch targets (use `size="md"` default)</wcag_requirement>
      <wcag_requirement id="3.2.2" name="On Input">No unexpected context changes</wcag_requirement>
    </rule>

    <rule id="CD-AB-R3" title="Required (Form Components)">
      <wcag_requirement id="3.3.1" name="Error Identification">Clear error messages</wcag_requirement>
      <wcag_requirement id="3.3.2" name="Labels or Instructions">Descriptive labels</wcag_requirement>
      <wcag_requirement id="3.3.3" name="Error Suggestion">Helpful error recovery</wcag_requirement>
    </rule>

    <rule id="CD-AB-R4" title="ARIA Patterns">
      <common_attributes>
        <attribute name="aria-label" description="Non-visible label (icon-only components)" />
        <attribute name="aria-labelledby" description="Reference to visible label" />
        <attribute name="aria-describedby" description="Additional description/help text" />
        <attribute name="aria-disabled" description="Disabled state (visual only, not truly disabled)" />
        <attribute name="aria-invalid" description="Validation error state" />
        <attribute name="aria-required" description="Required field indicator" />
        <attribute name="aria-busy" description="Loading state indicator" />
        <attribute name="aria-live" description="Dynamic content announcements" />
      </common_attributes>
    </rule>

</accessibility_baseline>

<decision_matrix id="CD-DMV">

<summary>
When designing a component, use this matrix to decide which variant categories apply:
</summary>

    <matrix_data>
      <component_type
        name="Interactive (Button, Link)"
        visual_variants="✅ solid/outline/ghost"
        size_variants="✅ xs/sm/md/lg/xl"
        status_variants="⚠️ Optional (destructive)"
        shape_variants="✅ Optional"
      />
      <component_type
        name="Input (Input, Select, Textarea)"
        visual_variants="❌ Usually not needed"
        size_variants="✅ xs/sm/md/lg"
        status_variants="⚠️ Validation states"
        shape_variants="✅ Optional"
      />
      <component_type
        name="Feedback (Alert, Toast, Banner)"
        visual_variants="✅ solid/outline"
        size_variants="⚠️ Optional"
        status_variants="✅ success/destructive/warning/info"
        shape_variants="✅ Optional"
      />
      <component_type
        name="Display (Card, Panel, Modal)"
        visual_variants="✅ solid/outline/ghost"
        size_variants="⚠️ Optional"
        status_variants="❌ Usually not needed"
        shape_variants="✅ Optional"
      />
      <component_type
        name="Data (Badge, Tag, Chip)"
        visual_variants="✅ solid/outline/ghost"
        size_variants="✅ xs/sm/md"
        status_variants="✅ Optional (semantic colors)"
        shape_variants="✅ full radius common"
      />
      <component_type
        name="Layout (Container, Grid, Stack)"
        visual_variants="❌ Not applicable"
        size_variants="⚠️ Optional (spacing scale)"
        status_variants="❌ Not applicable"
        shape_variants="❌ Not applicable"
      />
    </matrix_data>

    <legend>
      <key symbol="✅">Recommended</key>
      <key symbol="⚠️">Optional (context-dependent)</key>
      <key symbol="❌">Not applicable</key>
    </legend>

</decision_matrix>

<related_guidelines id="CD-RG">
<reference type="guideline" doc_id="TA" file="TOKEN_ARCHITECTURE.md">
Three-layer token system rules
</reference>
<reference type="guideline" doc_id="SS" file="SPACING_SYSTEM.md">
T-shirt sizing for spacing
</reference>
<reference type="guideline" doc_id="TSYS" file="TYPOGRAPHY_SYSTEM.md">
Type scales and font usage
</reference>
<reference type="guideline" doc_id="CS" file="COLOR_SYSTEM.md">
Color palettes and semantic colors
</reference>
<reference type="guideline" doc_id="TS" file="THEMING_STRATEGY.md">
Flavor system and theming
</reference>
<reference type="guideline" doc_id="CA" file="../02-architecture/COMPONENT_ARCHITECTURE.md">
Component file structure
</reference>
<reference type="guideline" doc_id="WC" file="../04-accessibility/WCAG_COMPLIANCE.md">
Accessibility standards
</reference>
</related_guidelines>

  <changelog id="CD-CL">
    <version number="1.0.0" date="2025-11-02">
      <change type="NOTE">Initial component design guidelines establishing variant taxonomy, token patterns, and API conventions for the Sando Design System</change>
    </version>
  </changelog>

</guideline>
