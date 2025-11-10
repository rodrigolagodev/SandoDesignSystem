<guideline doc_id="TSYS" category="01-design-system" version="2.0.0" status="Active" last_updated="2025-11-09" owner="UI Designer + Design System Architect">

  <purpose id="TSYS-PU">
    Establishes scalable, accessible typographic foundation using system fonts, modular scale, and responsive sizing. Operates through three-layer token architecture.
  </purpose>

<core_rules id="TSYS-CR">
<rule id="TSYS-CR-R1" title="System Font Stack (Performance First)">

<summary>
Use native system fonts for zero network latency and familiar rendering.
</summary>

      <pattern lang="json">
        {
          "font": {
            "family": {
              "sans": {
                "value": "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                "type": "fontFamily"
              },
              "mono": {
                "value": "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
                "type": "fontFamily"
              }
            }
          }
        }
      </pattern>

      <why>
        System fonts are already installed—zero download time, consistent with OS, no FOIT/FOUT issues.
      </why>

      <anti_pattern lang="json" title="❌ Custom web fonts (add latency, FOIT issues)">
        {
          "font": {
            "family": {
              "sans": { "value": "'Inter', 'Helvetica', sans-serif" } // Requires download
            }
          }
        }
      </anti_pattern>

      <reference type="source_file" path="packages/tokens/src/ JSON source files">
        complete stack specifications
      </reference>
    </rule>

    <rule id="TSYS-CR-R2" title="Modular Scale (Consistent Ratio)">
      <summary>
        Font sizes follow modular scale with ~1.125-1.25 ratio (Major Third to Perfect Fourth).
      </summary>

      <scale_definition lang="json" title="Key Sizes">
        {
          "font": {
            "size": {
              "100": { "value": "0.75rem", "type": "dimension" }, // 12px - Captions
              "300": { "value": "1rem", "type": "dimension" }, // 16px - BODY (default)
              "500": { "value": "1.25rem", "type": "dimension" }, // 20px - Small headings
              "700": { "value": "2rem", "type": "dimension" }, // 32px - Large headings
              "900": { "value": "3rem", "type": "dimension" } // 48px - Display
            }
          }
        }
      </scale_definition>

      <constraints>
        <constraint type="MUST">Use `rem` units (respects user preferences)</constraint>
        <constraint type="MUST">Maintain consistent scale ratio</constraint>
        <constraint type="NEVER">add custom sizes outside scale</constraint>
      </constraints>

      <anti_pattern lang="json" title="❌ Arbitrary sizes break scale">
        {
          "font": {
            "size": {
              "custom": { "value": "1.3rem" } // Not in scale
            }
          }
        }
      </anti_pattern>
    </rule>

    <rule id="TSYS-CR-R3" title="Three-Layer Architecture">
      <summary>
        This operates at Layer 2 (Flavors) - provides semantic naming for typography.
      </summary>

      <constraint>
        Flavors reference ONLY Layer 1 (Ingredients), never Layer 3 (Recipes).
      </constraint>

      <reference type="guideline" doc_id="TA" file="TOKEN_ARCHITECTURE.md">
        complete layer rules
      </reference>

      <pattern lang="json">
        // Layer 2: Flavors (semantic)
        {
          "font": {
            "size": {
              "body": { "value": "{font.size.300.value}" },  // ✅ References Ingredient
              "heading": { "value": "{font.size.700.value}" }
            }
          }
        }

        // Layer 3: Recipes (component-specific)
        {
          "button": {
            "fontSize": { "value": "{font.size.body.value}" }  // ✅ References Flavor
          }
        }
      </pattern>

      <anti_pattern lang="json" title="❌ Recipe skipping Flavors layer">
        {
          "button": {
            "fontSize": { "value": "{font.size.300.value}" } // Recipe → Ingredient (WRONG)
          }
        }
      </anti_pattern>
    </rule>

    <rule id="TSYS-CR-R4" title="Semantic Naming (Context Over Size)">

      <summary>
        Flavors use contextual names, not size descriptors.
      </summary>

      <pattern lang="json" title="✅ Good - describes USE CONTEXT">
        {
          "font": {
            "size": {
              "body": { "value": "{font.size.300.value}" }, // Paragraph text
              "caption": { "value": "{font.size.100.value}" }, // Small supplementary
              "heading": { "value": "{font.size.700.value}" } // Titles
            }
          }
        }
      </pattern>

      <anti_pattern lang="json" title="❌ Bad - describes VALUE">
        {
          "font": {
            "size": {
              "small": { "value": "{font.size.100.value}" }, // What is "small" for?
              "medium": { "value": "{font.size.300.value}" },
              "large": { "value": "{font.size.700.value}" }
            }
          }
        }
      </anti_pattern>

      <why>
        `font.size.body` can map to 16px, 18px, or 20px depending on flavor—without changing component code.
      </why>

    </rule>

    <rule id="TSYS-CR-R5" title="Unitless Line Heights (Proportional Scaling)">
      <summary>
        Always use unitless line height values so they scale proportionally with font size.
      </summary>

      <pattern lang="json">
        {
          "font": {
            "lineHeight": {
              "120": { "value": "1.2", "type": "number" }, // ✅ Unitless - scales correctly
              "150": { "value": "1.5", "type": "number" } // WCAG minimum for body
            }
          }
        }
      </pattern>

      <anti_pattern lang="json">
        {
          "font": {
            "lineHeight": {
              "default": { "value": "1.5rem", "type": "dimension" } // ❌ With unit - breaks scaling
            }
          }
        }
      </anti_pattern>

      <constraint standard="WCAG 2.1 AA">
        Body text requires minimum **1.5** line height.
      </constraint>
    </rule>

</core_rules>

<token_structure id="TSYS-TS">
<rule id="TSYS-TS-L1" title="Layer 1: Ingredients (Primitives)">
<font_sizes lang="json" title="Numeric scale - absolute values, no semantic meaning.">
{
"font": {
"size": {
"50": { "value": "0.625rem", "type": "dimension" }, // 10px - Micro
"100": { "value": "0.75rem", "type": "dimension" }, // 12px - Captions
"200": { "value": "0.875rem", "type": "dimension" }, // 14px - Small
"300": { "value": "1rem", "type": "dimension" }, // 16px - DEFAULT
"400": { "value": "1.125rem", "type": "dimension" }, // 18px - Large body
"500": { "value": "1.25rem", "type": "dimension" }, // 20px - Small heading
"600": { "value": "1.5rem", "type": "dimension" }, // 24px - Medium heading
"700": { "value": "2rem", "type": "dimension" }, // 32px - Large heading
"800": { "value": "2.5rem", "type": "dimension" }, // 40px - XL heading
"900": { "value": "3rem", "type": "dimension" } // 48px - Display
}
}
}
</font_sizes>

      <font_weights lang="json" title="Font Weights (100-900 standard)">
        {
          "font": {
            "weight": {
              "400": { "value": "400", "type": "fontWeight" }, // Regular (body default)
              "500": { "value": "500", "type": "fontWeight" }, // Medium
              "700": { "value": "700", "type": "fontWeight" } // Bold (heading default)
            }
          }
        }
      </font_weights>

      <line_heights lang="json" title="Line Heights (unitless multipliers)">
        {
          "font": {
            "lineHeight": {
              "100": { "value": "1", "type": "number" }, // Tight (badges)
              "120": { "value": "1.2", "type": "number" }, // Headings
              "150": { "value": "1.5", "type": "number" }, // Body (WCAG AA)
              "160": { "value": "1.6", "type": "number" } // Comfortable reading
            }
          }
        }
      </line_heights>

    </rule>

    <rule id="TSYS-TS-L2" title="Layer 2: Flavors (Semantic)">
      <summary>
        Semantic tokens that reference ONLY Ingredients.
      </summary>

      <semantic_tokens lang="json">
        {
          "font": {
            "family": {
              "body": { "value": "{font.family.sans.value}", "type": "fontFamily" },
              "heading": { "value": "{font.family.sans.value}", "type": "fontFamily" }
            },
            "size": {
              "body": { "value": "{font.size.300.value}", "type": "dimension" }, // 16px
              "caption": { "value": "{font.size.100.value}", "type": "dimension" }, // 12px
              "heading-sm": { "value": "{font.size.500.value}", "type": "dimension" }, // 20px
              "heading-md": {
                "value": "clamp({font.size.600.value}, 5vw, {font.size.700.value})", // Responsive
                "type": "dimension"
              }
            },
            "weight": {
              "body": { "value": "{font.weight.400.value}", "type": "fontWeight" },
              "heading": { "value": "{font.weight.700.value}", "type": "fontWeight" }
            },
            "lineHeight": {
              "body": { "value": "{font.lineHeight.150.value}", "type": "number" }, // 1.5
              "heading": { "value": "{font.lineHeight.120.value}", "type": "number" } // 1.2
            }
          }
        }
      </semantic_tokens>

      <responsive_note title="Responsive Headings using clamp()">
        <note>Minimum size for mobile</note>
        <note>Fluid scaling via viewport units</note>
        <note>Maximum size for desktop</note>
        <note>Uses `rem` to respect user preferences</note>
      </responsive_note>
    </rule>

    <rule id="TSYS-TS-L3" title="Layer 3: Recipes (Component-Specific)">
      <summary>
        Recipes reference Flavors to define component typography.
      </summary>

      <recipe_tokens lang="json">
      {
        "button": {
          "fontFamily": { "value": "{font.family.body.value}", "type": "fontFamily" },
          "fontSize": { "value": "{font.size.body.value}", "type": "dimension" },
          "fontWeight": { "value": "{font.weight.700.value}", "type": "fontWeight" }, // Emphasis
          "lineHeight": { "value": "{font.lineHeight.body.value}", "type": "number" }
        }
      }
      </recipe_tokens>

    </rule>

</token_structure>

<component_implementation id="TSYS-CI" title="Complete Pattern: Button Component example">
<recipe_tokens lang="json" title="Recipe Tokens" path="packages/tokens/src/recipes/button.json">
{
"button": {
"fontFamily": { "value": "{font.family.body.value}", "type": "fontFamily" },
"fontWeight": { "value": "{font.weight.700.value}", "type": "fontWeight" },
"lineHeight": { "value": "{font.lineHeight.body.value}", "type": "number" },
"size": {
"sm": {
"fontSize": {
"value": "{font.size.caption.value}",
"type": "dimension"
} // 12px
},
"md": {
"fontSize": { "value": "{font.size.body.value}", "type": "dimension" } // 16px
},
"lg": {
"fontSize": { "value": "{font.size.body.value}", "type": "dimension" } // 16px
}
}
}
}
</recipe_tokens>

    <component_consumption lang="typescript" file="sando-button.ts">
      import { css } from "lit";

      export const buttonStyles = css`
        button {
          font-family: var(--sando-button-fontFamily);
          font-weight: var(--sando-button-fontWeight);
          line-height: var(--sando-button-lineHeight);
        }

        :host([size="sm"]) button {
          font-size: var(--sando-button-size-sm-fontSize);
        }

        :host([size="md"]) button {
          font-size: var(--sando-button-size-md-fontSize);
        }

        :host([size="lg"]) button {
          font-size: var(--sando-button-size-lg-fontSize);
        }
      `;
    </component_consumption>

    <applicability>
      All text-containing components (Cards, Inputs, Modals, etc.)
    </applicability>

    <special_cases>
      <case name="Responsive headings">Use `clamp()` in Flavors. See example above.</case>
      <case name="Monospace code">Use `{font.family.mono.value}` for code blocks</case>
      <case name="Different font stacks per flavor">Override in `flavor.json` (e.g. serif theme)</case>
    </special_cases>

</component_implementation>

<responsive*typography id="TSYS-RT">
<rule title="Using `clamp()` for Fluid Scaling">
<pattern lang="css">
/* Fluid scaling without media queries _/
font-size: clamp( 1.5rem, /_ Minimum (mobile) _/ 5vw, /_ Preferred (fluid) _/ 2rem /_ Maximum (desktop) \_/);
</pattern>

      <usage_guidelines>
        <use_case type="RECOMMENDED">
          <typographic_element>Large headings (h1, h2)</typographic_element>
          <typographic_element>Hero text, display typography</typographic_element>
        </use_case>
        <use_case type="NOT_RECOMMENDED">
          <typographic_element>Body text (fixed for readability)</typographic_element>
          <typographic_element>UI controls (buttons, inputs)</typographic_element>
        </use_case>
      </usage_guidelines>
    </rule>

</responsive_typography>

<related_guidelines id="TSYS-RG">
<reference type="guideline" doc_id="TA" file="TOKEN_ARCHITECTURE.md">
Three-layer system rules
</reference>
<reference type="guideline" doc_id="CS" file="COLOR_SYSTEM.md">
Text color contrast requirements
</reference>
<reference type="guideline" doc_id="SS" file="SPACING_SYSTEM.md">
Vertical rhythm coordination
</reference>
<reference type="source_file" path="packages/tokens/src/ JSON source files">
Complete font scales, stacks
</reference>
</related_guidelines>

  <changelog id="TSYS-CL">
    <version number="2.0.0" date="2025-11-02">
      <change type="BREAKING">Consolidated 3 examples to 1 complete pattern</change>
      <change type="BREAKING">Removed duplicate 3-layer architecture explanation (links to TOKEN_ARCHITECTURE.md)</change>
      <change type="BREAKING">Reduced font size table (key sizes only, full scale in packages/tokens/src/ JSON source files)</change>
      <change type="IMPROVED">Clearer rules with pattern/anti-pattern examples</change>
      <change type="IMPROVED">Focus on fundamental rules for agent consumption</change>
      <change type="NOTE">Reduced from 736 to ~450 lines (39% reduction)</change>
    </version>

    <version number="1.0.0" date="2025-11-02">
      <change type="NOTE">Initial typography system with modular scale, system fonts</change>
    </version>

  </changelog>
</guideline>
