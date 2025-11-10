<guideline doc_id="TA" category="01-design-system" version="2.0.0" status="Active" last_updated="2025-11-09" owner="Design System Architect">

  <purpose id="TA-PU">
  Defines the three-layer token architecture (Ingredients → Flavors → Recipes) that enables strict separation of concerns, unlimited theming flexibility, and system scalability. This is the MOST CRITICAL architectural pattern—violations break theming.
  </purpose>

<core_rules id="TA-CR">

    <rule id="TA-CR-R1" title="Strict Layer References (Non-Negotiable)">
      <summary>
        Each layer references ONLY the layer directly below it. This one-way flow is enforced by automated tests.
      </summary>

      <reference_flow>
        Components → Recipes (Layer 3) → Flavors (Layer 2) → Ingredients (Layer 1) → Absolute values
      </reference_flow>

      <critical_rules>
        <constraint for_layer="Ingredients">Absolute values ONLY (no `{...}` references)</constraint>
        <constraint for_layer="Flavors">Reference ONLY Ingredients: `{color.orange.700.value}`</constraint>
        <constraint for_layer="Recipes">Reference ONLY Flavors: `{color.action.solid.background.default.value}`</constraint>
        <constraint for_layer="Components">Use ONLY Recipe CSS variables: `var(--sando-button-solid-backgroundColor-default)`</constraint>
      </critical_rules>

      <anti_pattern lang="json" title="❌ Recipe skipping Flavors layer">
        {
          "button": {
            "solid": {
              "backgroundColor": {
              "default": { "value": "{color.orange.700.value}" } // Recipe → Ingredient (WRONG)
              }
            }
          }
        }
      </anti_pattern>

      <anti_pattern lang="json" title="❌ Flavor referencing another Flavor">
        {
          "color": {
            "text": {
              "link": {
                "value": "{color.action.solid.background.default.value}" // Flavor → Flavor (WRONG)
              }
            }
          }
        }
      </anti_pattern>

      <why>
        Violations break theming (can't swap colors), lose semantic meaning, and create circular dependencies.
      </why>
    </rule>

    <rule id="TA-CR-R2" title="When to Create New Tokens">
      <decision_tree>
        <condition for="new_ingredient">
          <reason>Need absolute value not in existing scale</reason>
          <example>New color hue, spacing value outside 0-64</example>
        </condition>
        <condition for="new_flavor">
          <reason>Need new semantic meaning/use context</reason>
          <example>`color.background.platform` (new use case not covered by `color.background.surface`)</example>
        </condition>
        <condition for="new_recipe">
          <reason>Building a new component</reason>
          <example>`datepicker.json` for DatePicker component</example>
        </condition>
        <condition for="reuse_token">
          <reason>Value exists in scale</reason>
          <reason>Semantic meaning already defined</reason>
          <reason>Can use generic Flavor pattern</reason>
        </condition>
      </decision_tree>

      <anti_pattern lang="json" title="❌ Too specific - should use existing Flavor">
        {
          "color": {
            "button-primary-blue": { ... } // WRONG - too specific, not reusable
          }
        }
      </anti_pattern>

      <pattern lang="json" title="✅ Correct - use existing semantic Flavor">
        {
          "button": {
            "solid": {
              "backgroundColor": {
                "default": { "value": "{color.action.solid.background.default.value}" }
              }
            }
          }
        }
      </pattern>

    </rule>

    <rule id="TA-CR-R3" title="CSS Variable Naming Convention">
      <pattern_format>
        --sando-{category}-{property}-{variant?}-{state?}
      </pattern_format>

      <constraints>
        <constraint>Always kebab-case</constraint>
        <constraint>Include variant if property is variant-specific</constraint>
        <constraint>Include state if property is state-specific</constraint>
        <constraint>Order: variant before state</constraint>
      </constraints>

      <example lang="css">
        /* Ingredients */
        --sando-color-orange-500
        --sando-space-4

        /* Flavors */
        --sando-color-action-solid-background-default
        --sando-space-inset-md

        /* Recipes */
        --sando-button-solid-backgroundColor-default
        --sando-button-solid-backgroundColor-hover
        --sando-button-size-md-paddingInline
      </example>

      <anti_pattern lang="css">
        /* ❌ Wrong order */
        --sando-button-hover-solid-backgroundColor /* state before variant */

        /* ❌ Not kebab-case */
        --sandoButtonSolidBg

        /* ❌ Missing category */
        --sando-orange-500  /* should be --sando-color-orange-500 */
      </anti_pattern>
    </rule>

    <rule id="TA-CR-R4" title="Flavors vs Modes Distinction">
      <summary>
        CRITICAL: Flavors and Modes are fundamentally different concepts.
      </summary>

      <concept id="TA-CR-R4-C1" title="Flavors (Manual brand themes)">
        <characteristics>
          <characteristic>Selected via `flavor="name"` attribute</characteristic>
          <characteristic>Examples: `original`, `strawberry`, `midnight`</characteristic>
          <characteristic>**Developer chooses** which flavor to apply</characteristic>
          <characteristic>Created by adding Flavor files: `src/flavors/{name}/flavor.json`</characteristic>
        </characteristics>
      </concept>

      <concept id="TA-CR-R4-C2" title="Modes (Automatic accessibility)">
        <characteristics>
          <characteristic>Activated via `@media` queries (user's system preference)</characteristic>
          <characteristic>Examples: `dark`, `high-contrast`, `motion-reduce`</characteristic>
          <characteristic>**User's system** determines which mode is active</characteristic>
          <characteristic>Created by adding mode files: `flavor-dark.json`, `flavor-high-contrast.json`</characteristic>
        </characteristics>
      </concept>

      <pattern lang="html" title="✅ Correct: Flavor selection & Automatic mode">
        <div flavor="original">Theme with orange actions</div>
        <div flavor="strawberry">Theme with pink actions</div>

        <div flavor="original"></div>
      </pattern>

      <anti_pattern lang="html" title="❌ WRONG: Dark is a MODE, not a flavor">
        <div flavor="dark">This doesn't work!</div>
        <div flavor="high-contrast">This doesn't work!</div>
      </anti_pattern>

      <why>
        Confusing Flavors with Modes breaks accessibility. Dark mode MUST respond to `prefers-color-scheme`, not manual selection.
      </why>

      <reference type="guideline" doc_id="TS" file="THEMING_STRATEGY.md">
        complete Flavors vs Modes explanation
      </reference>
    </rule>

    <rule id="TA-CR-R5" title="Semantic Meaning Over Values">
      <summary>
        Flavors provide semantic meaning (use context), not value descriptions.
      </summary>

      <pattern lang="json" title="✅ Good - describes USE CONTEXT">
        {
          "color": {
            "action": {
              "solid": {
                "background": {
                  "default": { "value": "{color.orange.700.value}" }
                }
              }
            }
          }
        }
      </pattern>

      <anti_pattern lang="json" title="❌ Bad - describes VALUE">
        {
          "color": {
            "brand": {
              "primary": { "value": "{color.orange.700.value}" } // What is "primary" used for?
            }
          }
        }
      </anti_pattern>

      <why>
        Semantic naming enables brand-agnostic design. `color.action.solid.background` can map to ANY color—orange, purple, blue—without changing component code.
      </why>

    </rule>

</core_rules>

<three_layer_architecture id="TA-TLA">

    <summary>
    This section is the DEFINITIVE source for the three-layer system. Other guidelines reference this.
    </summary>

    <layer_definition id="TA-TLA-L1" title="Layer 1: Ingredients (Primitives)">

      <definition>
        Raw, absolute values with NO references. Brand-agnostic primitives.
      </definition>

      <location>
        `packages/tokens/src/ingredients/*.json`
      </location>

      <file_structure_definition root_path="src/ingredients/">
        <file name="color.json" description="15 colors × 11 steps = 165 tokens" />
        <file name="space.json" description="0-64 (multiples of 4px)" />
        <file name="font.json" description="Families, sizes, weights, line heights" />
        <file name="border.json" description="Radius, widths" />
        <file name="elevation.json" description="Shadow scales" />
        <file name="animation.json" description="Duration, easing" />
        <file name="opacity.json" description="Opacity values" />
        <file name="z-index.json" description="Z-index layers" />
      </file_structure_definition>

      <naming_convention>
        `{category}-{property}-{scale}`
      </naming_convention>

      <examples>
        <example name="color-orange-700" value="oklch(0.47 0.20 25)" />
        <example name="space-4" value="1rem (16px)" />
        <example name="font-size-300" value="1.125rem (18px)" />
      </examples>

      <pattern lang="json">
        {
          "color": {
            "orange": {
              "500": { "value": "oklch(0.64 0.20 25)", "type": "color" },
              "700": { "value": "oklch(0.47 0.20 25)", "type": "color" }
            }
          },
          "space": {
            "4": { "value": "1rem", "type": "dimension" }
          }
        }
      </pattern>

      <constraints>
        <constraint type="MUST">contain only absolute values</constraint>
        <constraint type="NEVER">reference other tokens</constraint>
        <constraint type="MUST">be brand-agnostic (no "primary", "brand")</constraint>
        <constraint type="SHOULD">follow algorithmic generation</constraint>
      </constraints>

      <references>
        <reference type="guideline" doc_id="CS" file="COLOR_SYSTEM.md">
          complete Ingredient specifications
        </reference>
        <reference type="guideline" doc_id="SS" file="SPACING_SYSTEM.md">
          complete Ingredient specifications
        </reference>
      </references>
    </layer_definition>

    <layer_definition id="TA-TLA-L2" title="Layer 2: Flavors (Semantic)">

      <definition>
        Semantic tokens that reference ONLY Ingredients. Enable theming.
      </definition>

      <location>
        `packages/tokens/src/flavors/{flavor-name}/`
      </location>

      <file_structure_definition root_path="src/flavors/original/">
        <file name="flavor.json" description="Base (light mode)" />
        <file name="flavor-dark.json" description="Dark mode overrides" />
        <file name="flavor-high-contrast.json" description="High contrast overrides" />
        <file name="flavor-forced-colors.json" description="Forced colors mode" />
        <file name="flavor-motion-reduce.json" description="Reduced motion overrides" />
      </file_structure_definition>

      <naming_convention>
        `{category}-{element}-{modifier}-{state}`
      </naming_convention>

      <examples>
        <example>`color-action-solid-background-default`</example>
        <example>`color-text-body`</example>
        <example>`space-inset-md`</example>
      </examples>

      <pattern lang="json" title="Base Flavor">
        {
          "color": {
            "action": {
              "solid": {
                "background": {
                  "default": { "value": "{color.orange.700.value}", "type": "color" },
                  "hover": { "value": "{color.orange.800.value}", "type": "color" }
                },
                "text": {
                  "default": {
                    "value": "{color.neutral-warm.50.value}",
                    "type": "color"
                  }
                }
              }
            },
            "text": {
              "body": { "value": "{color.neutral-warm.800.value}", "type": "color" }
            }
          }
        }
      </pattern>

      <mode_override_pattern lang="json" title="Dark Mode Override">
        {
          "color": {
            "action": {
              "solid": {
                "background": {
                 "default": { "value": "{color.orange.600.value}", "type": "color" }
                }
              }
            },
            "text": {
              "body": { "value": "{color.neutral-warm.200.value}", "type": "color" }
            }
          }
        }
      </mode_override_pattern>

      <constraints>
        <constraint type="MUST" status="pass">reference ONLY Ingredients: `{color.orange.700.value}`</constraint>
        <constraint type="NEVER" status="fail">reference other Flavors or Recipes</constraint>
        <constraint type="NEVER" status="fail">contain absolute values (except mode overrides for special cases)</constraint>
        <constraint type="MUST" status="pass">provide semantic context</constraint>
        <constraint type="MUST" status="pass">have base `flavor.json`</constraint>
        <constraint type="MAY" status="pass">have mode files with ONLY overrides</constraint>
      </constraints>
    </layer_definition>

    <layer_definition id="TA-TLA-L3" title="Layer 3: Recipes (Component-Specific)">
      <definition>
        Component-specific tokens that reference ONLY Flavors. One file per component.
      </definition>

      <location>
        `packages/tokens/src/recipes/*.json`
      </location>

      <file_structure_definition root_path="src/recipes/">
        <file name="button.json" description="Button tokens" />
        <file name="input.json" description="Input tokens" />
        <file name="card.json" description="Card tokens" />
        <file name="modal.json" description="Modal tokens" />
      </file_structure_definition>

      <naming_convention>
        `{component}-{variant}-{property}-{state}`
      </naming_convention>

      <examples>
        <example>`button-solid-backgroundColor-default`</example>
        <example>`button-solid-backgroundColor-hover`</example>
        <example>`input-borderColor-error`</example>
      </examples>

      <pattern lang="json">
        {
          "button": {
            "solid": {
              "backgroundColor": {
                "default": {
                  "value": "{color.action.solid.background.default.value}",
                  "type": "color"
                },
                "hover": {
                  "value": "{color.action.solid.background.hover.value}",
                  "type": "color"
                },
                "active": {
                  "value": "{color.action.solid.background.active.value}",
                  "type": "color"
                },
                "disabled": {
                  "value": "{color.action.solid.background.disabled.value}",
                  "type": "color"
                }
              },
              "textColor": {
                "default": {
                  "value": "{color.action.solid.text.default.value}",
                  "type": "color"
                }
              },
            },
            "size": {
              "md": {
                "paddingInline": {
                  "value": "{space.inset.md.value}",
                  "type": "dimension"
                },
                "paddingBlock": {
                  "value": "{space.inset.sm.value}",
                  "type": "dimension"
                },
                "minHeight": {
                  "value": "{sizing.control.md.value}",
                  "type": "dimension"
                }
              }
            }
          }
        }
      </pattern>

      <constraints>
        <constraint status="pass" type="MUST">reference ONLY Flavors: `{color.action.solid.background.default.value}`</constraint>
        <constraint status="fail" type="NEVER">reference Ingredients directly</constraint>
        <constraint status="fail" type="NEVER">reference other Recipes</constraint>
        <constraint status="pass" type="MUST">have one file per component</constraint>
        <constraint status="pass" type="SHOULD">group by variant (solid, outline, ghost)</constraint>
        <constraint status="pass" type="SHOULD">include all states (default, hover, active, focus, disabled)</constraint>
      </constraints>
    </layer_definition>

</three_layer_architecture>

<complete_token_flow_example id="TA-CTF">

<summary>
Scenario: Button component with solid variant
</summary>

    <steps>
      <step number="1" title="INGREDIENT (Layer 1) - Absolute value" file="src/ingredients/color.json">
        <example lang="json">
          {
            "color": {
              "orange": {
                "700": {
                  "value": "oklch(0.47 0.20 25)",  // ← Absolute OKLCH color
                  "type": "color"
                }
              }
            }
          }
        </example>
      </step>

      <step number="2" title="FLAVOR (Layer 2) - Semantic meaning" file="src/flavors/original/flavor.json">
        <example lang="json">
          {
            "color": {
              "action": {
                "solid": {
                  "background": {
                    "default": {
                      "value": "{color.orange.700.value}",  // ← References Ingredient
                      "type": "color",
                      "description": "Primary action button background"
                    }
                  }
                }
              }
            }
          }
        </example>
      </step>

      <step number="3" title="RECIPE (Layer 3) - Component-specific" file="src/recipes/button.json">
        <example lang="json">
          {
            "button": {
              "solid": {
                "backgroundColor": {
                  "default": {
                    "value": "{color.action.solid.background.default.value}",  // ← References Flavor
                    "type": "color"
                  }
                }
              }
            }
          }
        </example>
      </step>

      <step number="4" title="COMPONENT - Uses Recipe token" file="packages/components/src/components/button/sando-button.ts">
        <example lang="typescript">
          import { css } from 'lit';

          static styles = css`
            .button--solid {
              background: var(--sando-button-solid-backgroundColor-default);  // ← Uses Recipe CSS var
            }
          `;
        </example>
      </step>
    </steps>

    <css_output lang="css" title="CSS Output (build generates)">
      /* Layer 1: Ingredient */
      --sando-color-orange-700: oklch(0.47 0.2 25);

      /* Layer 2: Flavor */
      --sando-color-action-solid-background-default: var(--sando-color-orange-700);

      /* Layer 3: Recipe */
      --sando-button-solid-backgroundColor-default: var(--sando-color-action-solid-background-default);
    </css_output>

    <result>
      Component uses `--sando-button-solid-backgroundColor-default`, which resolves through all layers to the final OKLCH color.
    </result>

    <applicability>
      All components (Cards, Inputs, Modals, etc.)
    </applicability>

    <special_cases title="See individual guidelines for domain-specific patterns">
      <reference type="guideline" doc_id="CS" file="COLOR_SYSTEM.md">Colors</reference>
      <reference type="guideline" doc_id="SS" file="SPACING_SYSTEM.md">Spacing</reference>
      <reference type="guideline" doc_id="TSYS" file="TYPOGRAPHY_SYSTEM.md">Typography</reference>
    </special_cases>

</complete_token_flow_example>

<build_system id="TA-BS">

    <summary>
    The token build uses Style Dictionary 4.0.0 with custom orchestrator.
    </summary>

    <build_flow>
      <step number="1">Read source files (ingredients, flavors, recipes)</step>
      <step number="2">Validate references (automated tests enforce layer rules)</step>
      <step number="3">Transform (add --sando- prefix, convert {refs} to var())</step>
      <step number="4">Generate output (CSS + TypeScript)</step>
      <step number="5">Validate output (check for broken references)</step>
    </build_flow>

    <build_commands>
      <example lang="bash">
        pnpm tokens:build           # Build all tokens
        pnpm tokens:build --force   # Bypass cache
        pnpm tokens:dev             # Watch mode (rebuild on changes)
      </example>
    </build_commands>

    <output_structure lang="text">
      dist/sando-tokens/
      ├── css/
      │   ├── ingredients/ingredients.css
      │   ├── flavors/original/flavor.css
      │   ├── flavors/original/flavor-dark.css  # Wrapped in @media (prefers-color-scheme: dark)
      │   └── recipes/button.css
      └── ts/
          ├── ingredients/index.ts
          ├── flavors/original.ts
          └── recipes/button.ts
    </output_structure>

    <cache_definition>
      `.build-cache.json` - Incremental builds (skip unchanged layers)
    </cache_definition>

</build_system>

<related_guidelines id="TA-RG">
<reference type="guideline" doc_id="CS" file="COLOR_SYSTEM.md">
OKLCH color generation, universal lightness scale
</reference>
<reference type="guideline" doc_id="SS" file="SPACING_SYSTEM.md">
4px base unit, t-shirt sizing
</reference>
<reference type="guideline" doc_id="TSYS" file="TYPOGRAPHY_SYSTEM.md">
Font scales, type tokens
</reference>
<reference type="guideline" doc_id="TS" file="THEMING_STRATEGY.md">
Creating Flavors, Flavors vs Modes distinction
</reference>
<reference type="source_file" path="packages/tokens/src/ JSON source files">
Complete token specifications (165 colors, all scales)
</reference>
</related_guidelines>

  <changelog id="TA-CL">
    <version number="2.0.0" date="2025-11-02">
      <change type="BREAKING">Consolidated 5 examples to 1 complete token flow example</change>
      <change type="BREAKING">Removed duplicate explanations (reduced from 1095 to ~550 lines)</change>
      <change type="NEW">Added "When to Create New Tokens" decision tree (Rule 2)</change>
      <change type="NEW">Added "CSS Variable Naming Convention" complete specification (Rule 3)</change>
      <change type="NEW">Added "Flavors vs Modes Distinction" to prevent confusion (Rule 4)</change>
      <change type="IMPROVED">Clearer rules with pattern/anti-pattern examples</change>
      <change type="IMPROVED">Maintained as definitive source for 3-layer architecture</change>
      <change type="NOTE">Reduced from 1095 to ~550 lines (50% reduction)</change>
    </version>

    <version number="1.0.0" date="2025-11-02">
      <change type="NOTE">Initial token architecture guideline with three-layer system</change>
    </version>

  </changelog>

  <conclusion>
    This guideline is the foundation of the Sando Design System. The three-layer architecture is non-negotiable and must be followed strictly to maintain theming flexibility and system scalability.
  </conclusion>
</guideline>
