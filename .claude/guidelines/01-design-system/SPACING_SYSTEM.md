<guideline doc_id="SS" category="01-design-system" version="2.0.0" status="Active" last_updated="2025-11-09" owner="UI Designer + Design System Architect">

  <purpose id="SS-PU">
    Establishes spatial rhythm using a 4px base unit and unified t-shirt sizing (xs/sm/md/lg/xl) for all spacing and sizing tokens in the Sando Design System.
  </purpose>

<core_rules id="SS-CR">
<rule id="SS-CR-R1" title="4px Base Unit Foundation">

<summary>
All spacing values are multiples of 4px (0.25rem).
</summary>

      <why>
        Ensures pixel-perfect alignment, creates consistent visual rhythm, compatible with common screen densities.
      </why>

      <pattern lang="json">
        {
          "space": {
            "1": { "value": "0.25rem" }, // 4px
            "4": { "value": "1rem" }, // 16px - default
            "8": { "value": "2rem" } // 32px
          }
        }
      </pattern>

      <scale_definition>
        Linear 0-13 (4px increments), exponential 16-64 (larger layouts).
      </scale_definition>
    </rule>

    <rule id="SS-CR-R2" title="Three-Layer Architecture">
      <summary>
        This operates at Layer 2 (Flavors) - provides semantic naming for spacing.
      </summary>

      <constraint>
        Flavors reference ONLY Layer 1 (Ingredients), never Layer 3 (Recipes).
      </constraint>

      <reference type="guideline" doc_id="TA" file="TOKEN_ARCHITECTURE.md">
        complete layer rules
      </reference>

      <pattern lang="json">
        {
          "space": {
            "inset": {
              "md": { "value": "{space.4.value}" } // ✅ References Ingredient
            }
          }
        }
      </pattern>

      <anti_pattern lang="json">
        {
          "space": {
            "inset": {
              "md": { "value": "16px" } // ❌ Absolute value in Flavor
            }
          }
        }
      </anti_pattern>
    </rule>

    <rule id="SS-CR-R3" title="Unified T-Shirt Naming">
      <summary>
        All Flavors use: xs → sm → md → lg → xl
      </summary>

      <why>
        Single mental model, industry standard, predictable scaling.
      </why>

      <t_shirt_sizing_table>
        <size name="xs" inset_padding="4px" stack_spacing="4px" control_height="32px" />
        <size name="sm" inset_padding="8px" stack_spacing="8px" control_height="36px" />
        <size name="md" inset_padding="16px" stack_spacing="16px" control_height="44px" is_default="true" wcag_note="WCAG 2.5.5 minimum" />
        <size name="lg" inset_padding="24px" stack_spacing="24px" control_height="52px" />
        <size name="xl" inset_padding="32px" stack_spacing="32px" control_height="64px" />
      </t_shirt_sizing_table>

      <applicability>
        All spacing and sizing tokens (no exceptions).
      </applicability>
    </rule>

    <rule id="SS-CR-R4" title="Inset vs Stack Distinction">
      <summary>
        Inset = Padding INSIDE components
        Stack = Spacing BETWEEN elements
      </summary>

      <pattern lang="json">
        {
          "space": {
            "inset": {
              "md": { "value": "{space.4.value}" } // Internal padding
            },
            "stack": {
              "md": { "value": "{space.4.value}" } // External spacing
            }
          }
        }
      </pattern>

      <usage_example lang="css">
        .card {
          padding: var(--sando-space-inset-md); /* Internal */
        }

        .card-list {
          gap: var(--sando-space-stack-md); /* Between items */
        }
      </usage_example>
    </rule>

    <rule id="SS-CR-R5" title="Use Logical Properties (RTL Support)">
      <summary>
        Always use logical properties for internationalization.
      </summary>

      <logical_property_map>
        <property physical="padding-left/right" logical="padding-inline" use_case="Horizontal padding" />
        <property physical="padding-top/bottom" logical="padding-block" use_case="Vertical padding" />
        <property physical="margin-left/right" logical="margin-inline" use_case="Horizontal margins" />
      </logical_property_map>

      <pattern lang="css">
        .element {
          padding-inline: var(--sando-space-inset-md); /* ✅ RTL-aware */
          padding-block: var(--sando-space-inset-sm);
        }
      </pattern>

      <anti_pattern lang="css">
        .element {
          padding-left: var(--sando-space-inset-md); /* ❌ Breaks in RTL */
          padding-right: var(--sando-space-inset-md);
        }
      </anti_pattern>
    </rule>

</core_rules>

<token_structure id="SS-TS">
<rule id="SS-TS-L1" title="Layer 1: Ingredients (Primitives)">
<scale_definition lang="json" title="Numeric scale - absolute values, no semantic meaning.">
{
"space": {
"0": { "value": "0rem" },
"1": { "value": "0.25rem" }, // 4px
"2": { "value": "0.5rem" }, // 8px
"4": { "value": "1rem" }, // 16px - default
"6": { "value": "1.5rem" }, // 24px
"8": { "value": "2rem" }, // 32px
"11": { "value": "2.75rem" } // 44px - WCAG minimum
// ... up to space.64 (256px)
}
}
</scale_definition>

      <full_scale_reference>
        <value>0</value>
        <value>1</value>
        <value>2</value>
        <value>3</value>
        <value>4</value>
        <value>5</value>
        <value>6</value>
        <value>7</value>
        <value>8</value>
        <value>9</value>
        <value>10</value>
        <value>11</value>
        <value>12</value>
        <value>13</value>
        <value>16</value>
        <value>20</value>
        <value>24</value>
        <value>32</value>
        <value>40</value>
        <value>48</value>
        <value>64</value>
      </full_scale_reference>
    </rule>

    <rule id="SS-TS-L2" title="Layer 2: Flavors (Semantic T-Shirt Sizing)">
      <inset_tokens title="Inset Tokens (Padding)">
        <token_definition lang="json">
          {
            "space": {
              "inset": {
                "xs": { "value": "{space.1.value}" }, // 4px - micro padding
                "sm": { "value": "{space.2.value}" }, // 8px - compact
                "md": { "value": "{space.4.value}" }, // 16px - default
                "lg": { "value": "{space.6.value}" }, // 24px - comfortable
                "xl": { "value": "{space.8.value}" } // 32px - spacious
              }
            }
          }
        </token_definition>

        <use_cases>
          <case name="xs">Badges, tags, dense elements</case>
          <case name="sm">Small buttons, compact UIs</case>
          <case name="md">Default for most components (cards, panels)</case>
          <case name="lg">Large cards, comfortable layouts</case>
          <case name="xl">Modals, hero sections</case>
        </use_cases>
      </inset_tokens>

      <stack_tokens title="Stack Tokens (Spacing)">
        <token_definition lang="json">
          {
            "space": {
              "stack": {
                "xs": { "value": "{space.1.value}" }, // 4px - tight coupling
                "sm": { "value": "{space.2.value}" }, // 8px - close items
                "md": { "value": "{space.4.value}" }, // 16px - default
                "lg": { "value": "{space.6.value}" }, // 24px - sections
                "xl": { "value": "{space.8.value}" } // 32px - major divisions
              }
            }
          }
        </token_definition>

        <use_cases>
          <case name="xs">Icon + text gap, tightly related elements</case>
          <case name="sm">Form field groups, related list items</case>
          <case name="md">Paragraph spacing, default flexbox gap</case>
          <case name="lg">Section headings, content blocks</case>
          <case name="xl">Major page sections</case>
        </use_cases>
      </stack_tokens>

      <control_sizing title="Control Sizing (Component Heights)">
        <token_definition lang="json">
          {
            "sizing": {
              "control": {
                "xs": { "value": "{space.8.value}" }, // 32px - extra compact
                "sm": { "value": "{space.9.value}" }, // 36px - small
                "md": { "value": "{space.11.value}" }, // 44px - WCAG compliant
                "lg": { "value": "{space.13.value}" }, // 52px - prominent
                "xl": { "value": "{space.16.value}" } // 64px - hero CTAs
              }
            }
          }
        </token_definition>

        <wcag_note standard="WCAG 2.5.5">Minimum 44px touch target (Level AAA).</wcag_note>
        <constraint>Default to `md` for all interactive elements.</constraint>
      </control_sizing>
    </rule>

    <rule id="SS-TS-L3" title="Layer 3: Recipes (Component-Specific)">
      <summary>
        Recipes reference Flavors to define component spacing.
      </summary>

      <recipe_pattern lang="json">
        {
          "button": {
            "size": {
              "md": {
                "paddingInline": { "value": "{space.inset.md.value}" }, // 16px
                "paddingBlock": { "value": "{space.inset.sm.value}" }, // 8px
                "minHeight": { "value": "{sizing.control.md.value}" } // 44px
              }
            }
          }
        }
      </recipe_pattern>

      <pattern_note>
        `paddingInline > paddingBlock` (wider buttons = better click targets)
      </pattern_note>
    </rule>

</token_structure>

<component_implementation id="SS-CI">
<implementation_example id="SS-CI-P1" title="Complete Pattern: Button Component">

      <recipe_tokens lang="json" title="Recipe Tokens" path="packages/tokens/src/recipes/button.json">
        {
          "button": {
            "size": {
              "sm": {
                "paddingInline": { "value": "{space.inset.sm.value}" },
                "paddingBlock": { "value": "{space.inset.sm.value}" },
                "minHeight": { "value": "{sizing.control.sm.value}" }
              },
              "md": {
              "paddingInline": { "value": "{space.inset.md.value}" },
                "paddingBlock": { "value": "{space.inset.md.value}" },
                "minHeight": { "value": "{sizing.control.md.value}" }
              },
              "lg": {
                "paddingInline": { "value": "{space.inset.lg.value}" },
                "paddingBlock": { "value": "{space.inset.lg.value}" },
                "minHeight": { "value": "{sizing.control.lg.value}" }
              }
            }
          }
        }
      </recipe_tokens>

      <component_consumption lang="typescript" title="Component Consumption" file="sando-button.ts">
        import { css } from "lit";

        export const sizeStyles = css`
          :host([size="md"]) button {
            padding-inline: var(--sando-button-size-md-paddingInline);
            padding-block: var(--sando-button-size-md-paddingBlock);
            min-height: var(--sando-button-size-md-minHeight);
          }
        `;
      </component_consumption>

    </implementation_example>

</component_implementation>

<related_guidelines id="SS-RG">
<reference type="guideline" doc_id="TA" file="TOKEN_ARCHITECTURE.md">
Three-layer system rules
</reference>
<reference type="guideline" doc_id="CD" file="COMPONENT_DESIGN.md">
How spacing integrates with variants
</reference>
<reference type="guideline" doc_id="TSYS" file="TYPOGRAPHY_SYSTEM.md">
Type scale coordination
</reference>
<reference type="source_file" path="packages/tokens/src/ JSON source files">
Complete spacing scale reference
</reference>
</related_guidelines>

  <changelog id="SS-CL">
    <version number="2.0.0" date="2025-11-02">
      <change type="BREAKING">Removed migration guide (legacy content)</change>
      <change type="BREAKING">Consolidated examples from 3 to 1 complete pattern</change>
      <change type="BREAKING">Reduced duplicated 3-layer architecture explanation</change>
      <change type="IMPROVED">Clearer rules with pattern/anti-pattern examples</change>
      <change type="IMPROVED">Focus on fundamental rules for agent consumption</change>
      <change type="NOTE">Reduced from 988 to ~450 lines (54% reduction)</change>
    </version>

    <version number="1.0.0" date="2025-11-02">
      <change type="NOTE">Initial spacing system with unified t-shirt naming</change>
    </version>

  </changelog>

</guideline>
