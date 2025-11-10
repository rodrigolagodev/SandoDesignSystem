<guideline doc_id="TS" category="01-design-system" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Design System Architect + Design Ops Specialist">

  <purpose id="TS-PU">
    This guideline establishes the theming architecture for the Sando Design System, explaining the critical distinction between **Flavors** (manual brand themes) and **Modes** (automatic accessibility variants), and how the system enables flexible theming while maintaining accessibility standards.
  </purpose>

<core_principles id="TS-CP">
<principle id="TS-CP-P1" title="Flavors and Modes are Separate Concerns">
Flavors provide brand identity, Modes ensure accessibility
</principle>
<principle id="TS-CP-P2" title="Automatic Accessibility">
Modes activate automatically via user preferences (no manual selection needed)
</principle>
<principle id="TS-CP-P3" title="Flavor Inheritance">
Components inherit flavor from ancestors via FlavorableMixin
</principle>
<principle id="TS-CP-P4" title="Token-Layer Separation">
Theming happens at Flavors layer (Layer 2), never Ingredients (Layer 1)
</principle>
<principle id="TS-CP-P5" title="Developer Choice">
Developers choose flavors, users control modes via system preferences
</principle>
</core_principles>

<flavors_vs_modes id="TS-FVM">
<construct id="TS-FVM-F1" title="Flavors (Brand Themes)">
<definition>
Brand color schemes and visual identities applied manually by developers.
</definition>

      <characteristics>
        <characteristic>Selected via HTML `flavor` attribute</characteristic>
        <characteristic>Brand-focused (sando-inspired naming)</characteristic>
        <characteristic>Developer-controlled</characteristic>
        <characteristic>Persistent across the application or sections</characteristic>
      </characteristics>

      <examples>
        <example>original</example>
        <example>strawberry</example>
        <example>matcha</example>
        <example>tamago</example>
        <example>sakura</example>
        <example>midnight</example>
      </examples>

      <application_example lang="html">
        <html flavor="original">
          <body>
            <sando-button>Original themed button</sando-button>
          </body>
        </html>

        <section flavor="strawberry">
          <sando-card>Strawberry themed card</sando-card>
        </section>

        <sando-button flavor="matcha">Matcha themed button</sando-button>
      </application_example>
    </construct>

    <construct id="TS-FVM-M1" title="Modes (Accessibility Variants)">
      <definition>
        Accessibility-focused variations that respond to user system preferences automatically.
      </definition>

      <characteristics>
        <characteristic>Activated via CSS `@media` queries</characteristic>
        <characteristic>User-controlled (system preferences)</characteristic>
        <characteristic>Automatic (no manual selection)</characteristic>
        <characteristic>Apply on top of any flavor</characteristic>
      </characteristics>

      <supported_modes>
        <mode name="dark" query="prefers-color-scheme: dark">Dark color scheme</mode>
        <mode name="high-contrast" query="prefers-contrast: high">Enhanced contrast</mode>
        <mode name="forced-colors" query="forced-colors: active">System color overrides</mode>
        <mode name="motion-reduce" query="prefers-reduced-motion: reduce">Reduced motion</mode>
      </supported_modes>

      <application_note>
        Automatic via media queries, no developer action required.
      </application_note>
    </construct>

</flavors_vs_modes>

<theming_architecture id="TS-TA" title="Theming Architecture Pattern">

<summary>
This section defines the File Structure Pattern.
Each flavor is defined in a directory with 5 separate files:
</summary>

    <file_structure root_path="packages/tokens/src/flavors/{flavor-name}/">
      <file name="flavor.json" description="Base flavor (default mode)" />
      <file name="flavor-dark.json" description="Dark mode overrides" />
      <file name="flavor-high-contrast.json" description="High contrast overrides" />
      <file name="flavor-forced-colors.json" description="Forced colors overrides" />
      <file name="flavor-motion-reduce.json" description="Motion reduce overrides" />
    </file_structure>

    <constraint>
      Mode files contain only changed tokens, not full token set.
    </constraint>

    <example lang="json" title="Example - flavor-dark.json">
      {
        "color": {
          "background": {
            "base": { "value": "{color.neutral.900.value}" },
            "subtle": { "value": "{color.neutral.800.value}" }
          },
          "text": {
            "primary": { "value": "{color.neutral.50.value}" }
          }
        }
      }
    </example>

    <explanation>
      Only tokens that differ in dark mode are redefined (inverted lightness, adjusted contrast).
    </explanation>

</theming_architecture>

<build_system_pattern id="TS-BSP">

<summary>
This section defines the CSS Output Structure pattern.
The build system generates CSS files wrapped in appropriate `@media` queries:
</summary>

    <example lang="css" title="Base Flavor (flavor-original.css)">
      :host([flavor="original"]),
      [flavor="original"] {
        --sando-color-background-base: oklch(98% 0.02 120);
        --sando-color-text-primary: oklch(20% 0.02 120);
      }
    </example>

    <example lang="css" title="Dark Mode (flavor-original-dark.css)">
      @media (prefers-color-scheme: dark) {
        :host([flavor="original"]),
        [flavor="original"] {
          --sando-color-background-base: oklch(15% 0.02 120);
          --sando-color-text-primary: oklch(95% 0.02 120);
        }
      }
    </example>

    <example lang="css" title="High Contrast Mode (flavor-original-high-contrast.css)">
      @media (prefers-contrast: high) {
        :host([flavor="original"]),
        [flavor="original"] {
          --sando-color-background-base: oklch(100% 0 0);
          --sando-color-text-primary: oklch(0% 0 0);
        }
      }
    </example>

    <pattern_note>
      Each mode file is wrapped in its corresponding `@media` query during build.
    </pattern_note>

</build_system_pattern>

<flavorable_mixin_integration id="TS-FMI" title="Flavorable Mixins (Automatic Inheritance)">

<summary>
The FlavorableMixin enables automatic flavor inheritance from ancestor elements:
</summary>

    <behavior_steps>
      <step number="1">Component checks its own `flavor` attribute</step>
      <step number="2">If not set, traverses DOM ancestors to find nearest `[flavor]`</step>
      <step number="3">Falls back to default flavor if none found</step>
      <step number="4">Applies flavor by updating internal state</step>
    </behavior_steps>

    <example lang="html">
      <div flavor="strawberry">
        <sando-card>
          <sando-button>Inherits strawberry theme</sando-button>
        </sando-card>
      </div>
    </example>

    <implementation_pattern>
      All themeable components use `FlavorableMixin` to enable this behavior.
    </implementation_pattern>

</flavorable_mixin_integration>

<token_layer_responsibilities id="TS-TLR">

<layer_definition id="TS-TLR-L1" title="Layer 1: Ingredients (Primitives)">

    <role>
      Provides raw color values in OKLCH format.
    </role>

    <constraint>
      Ingredients are absolute values, never change per theme.
    </constraint>

    <example lang="json">
      {
        "color": {
          "brand": {
            "500": { "value": "oklch(65% 0.19 35)" }
          }
        }
      }
    </example>

</layer_definition>

<layer_definition id="TS-TLR-L2" title="Layer 2: Flavors (Semantic Theming)">
<role>
This is where theming happens
</role>

    <responsibilities>
      <responsibility>Map semantic names to Ingredient colors</responsibility>
      <responsibility>Define different mappings per flavor</responsibility>
      <responsibility>Provide mode-specific overrides (dark, high-contrast, etc.)</responsibility>
    </responsibilities>

    <pattern lang="json">
      {
        "color": {
          "action": {
            "solid": {
              "background": {
                "default": { "value": "{color.brand.500.value}" },
                "hover": { "value": "{color.brand.600.value}" }
              }
            }
          }
        }
      }
    </pattern>

    <mode_override_pattern lang="json" title="flavor-dark.json">
      {
        "color": {
          "action": {
            "solid": {
              "background": {
                "default": { "value": "{color.brand.400.value}" }
              }
            }
          }
        }
      }
    </mode_override_pattern>

</layer_definition>

<layer_definition id="TS-TLR-L3" title="Layer 3: Recipes (Component Tokens)">
<role>
Consume Flavor tokens, remain theme-agnostic.
</role>

    <constraint>
      Recipes reference Flavors, don't change per theme.
    </constraint>

    <pattern lang="json">
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

    <constraint>
      Recipes ONLY reference Flavors, never Ingredients. This ensures theming works correctly.
    </constraint>

</layer_definition>

<theming_patterns id="TS-TP">
<rule id="TS-TP-P1" title="Global Theme">

<summary>
Apply a single flavor across the entire application:
</summary>

      <example lang="html">
        <html flavor="original">
          <body>
          </body>
        </html>
      </example>
    </rule>

    <rule id="TS-TP-P2" title="Section Themes">
      <summary>
        Different flavors for different sections:
      </summary>

      <example lang="html">
        <html flavor="original">
          <body>
            <header flavor="midnight"></header>
            <main></main>
            <aside flavor="strawberry"></aside>
          </body>
        </html>
      </example>
    </rule>

    <rule id="TS-TP-P3" title="Component-Level Override">
      <summary>
        Override flavor for specific components:
      </summary>

      <example lang="html">
        <section flavor="original">
          <sando-button>Original themed</sando-button>
          <sando-button flavor="matcha">Matcha override</sando-button>
        </section>
      </example>
    </rule>

    <rule id="TS-TP-P4" title="CSS Variable Override">
      <summary>
        Direct CSS custom property override for one-off customization:
      </summary>

      <example lang="html">
        <sando-button style="--sando-button-solid-backgroundColor-default: oklch(50% 0.2 280);" >
          Custom color button
        </sando-button>
      </example>

      <constraint>
        This bypasses the token system. Prefer creating new flavors for reusable themes.
      </constraint>
    </rule>

</theming_patterns>

<creating_new_flavors id="TS-CNF">
<step id="TS-CNF-S1" title="Create Flavor Directory">
<example lang="bash">
packages/tokens/src/flavors/{new-flavor-name}/
</example>
</step>

    <step id="TS-CNF-S2" title="Define Base Flavor">
      <summary>
        Create `flavor.json` with semantic token mappings
      </summary>

      <example lang="json">
        {
          "color": {
            "background": {
              "base": { "value": "{color.neutral.50.value}" }
            },
            "action": {
              "solid": {
                "background": {
                  "default": { "value": "{color.brand.500.value}" }
                }
              }
            }
          }
        }
      </example>
    </step>

    <step id="TS-CNF-S3" title="Define Mode Overrides">
      <summary>
        Create mode files with ONLY changed tokens
      </summary>

      <example lang="json" title="flavor-dark.json">
        {
          "color": {
            "background": {
              "base": { "value": "{color.neutral.900.value}" }
            }
          }
        }
      </example>

      <example lang="json" title="flavor-high-contrast.json">
        {
          "color": {
            "background": {
              "base": { "value": "oklch(100% 0 0)" }
            }
          }
        }
      </example>
    </step>

    <step id="TS-CNF-S4" title="Step 4: Build Tokens">
      <example lang="bash">
        pnpm tokens:build
      </example>

      <explanation>
        The build system generates CSS files with proper `@media` wrappers automatically.
      </explanation>
    </step>

    <step id="TS-CNF-S5" title="Step 5: Use New Flavor">
      <example lang="html">
        <div flavor="new-flavor-name">
          <sando-button>New flavor button</sando-button>
        </div>
      </example>
    </step>

</creating_new_flavors>

<mode_behavior id="TS-MB">
<mode_definition id="TS-MB-M1" title="Dark Mode">
<trigger>User system preference `prefers-color-scheme: dark`</trigger>
<typical_changes>
<change>Inverted background lightness (light → dark)</change>
<change>Inverted text lightness (dark → light)</change>
<change>Adjusted contrast ratios for WCAG compliance</change>
<change>Reduced saturation for reduced eye strain</change>
</typical_changes>
<developer_action>None required. Activates automatically.</developer_action>
</mode_definition>

    <mode_definition id="TS-MB-M2" title="High Contrast Mode">
      <trigger>User system preference `prefers-contrast: high`</trigger>
      <typical_changes>
        <change>Maximum contrast ratios (pure black/white)</change>
        <change>Thicker borders</change>
        <change>Stronger focus indicators</change>
        <change>Simplified color palette</change>
      </typical_changes>
      <developer_action>None required. Activates automatically.</developer_action>
    </mode_definition>

    <mode_definition id="TS-MB-M3" title="Forced Colors Mode">
      <trigger>Windows High Contrast mode (`forced-colors: active`)</trigger>
      <typical_changes>
        <change>System color keywords (Canvas, CanvasText, LinkText)</change>
        <change>Respects user-defined color schemes</change>
        <change>Removes backgrounds, uses borders instead</change>
      </typical_changes>
      <developer_action>None required. Activates automatically.</developer_action>
    </mode_definition>

    <mode_definition id="TS-MB-M4" title="Motion Reduce Mode">
      <trigger>User system preference `prefers-reduced-motion: reduce`</trigger>
      <typical_changes>
        <change>Disable animations and transitions</change>
        <change>Instant state changes instead of animated</change>
        <change>Reduce parallax and scrolling effects</change>
      </typical_changes>
      <developer_action>None required. Activates automatically.</developer_action>
    </mode_definition>

</mode_behavior>

<accessibility_requirements id="TS-AR">
<rule id="TS-AR-R1" title="WCAG Compliance Across Modes">

<summary>
All flavor/mode combinations MUST meet WCAG 2.1 AA
</summary>

      <requirements_list>
        <wcag_requirement id="1.4.3" name="Contrast (Minimum)">4.5:1 text, 3:1 UI components</wcag_requirement>
        <wcag_requirement id="1.4.6" name="Contrast (Enhanced)">7:1 text, 4.5:1 UI (AAA) for high-contrast mode</wcag_requirement>
        <wcag_requirement id="2.3.1" name="Three Flashes">No animations flash more than 3 times per second</wcag_requirement>
        <wcag_requirement id="2.3.3" name="Animation from Interactions">Respect motion-reduce preference</wcag_requirement>
      </requirements_list>
    </rule>

</accessibility_requirements>

<guidelines_for_flavor_naming id="TS-GFN">

<summary>
Sando-Inspired Naming: Flavor names reference Japanese sandwich varieties to maintain brand identity.
</summary>

    <rule id="TS-GFN-R1" title="Naming Principles">
      <principles>
        <principle>Evocative and memorable</principle>
        <principle>Single-word when possible</principle>
        <principle>Related to food, nature, or cultural references</principle>
        <principle>Avoid generic names (theme1, theme2, blue, red)</principle>
      </principles>
    </rule>

    <rule id="TS-GFN-R2" title="Existing Pattern">
      <examples>
        <example>original</example>
        <example>strawberry</example>
        <example>matcha</example>
        <example>tamago</example>
        <example>sakura</example>
        <example>midnight</example>
        <example>ume</example>
      </examples>
    </rule>

</guidelines_for_flavor_naming>

<related_guidelines id="TS-RG">
<reference type="guideline" doc_id="TA" file="TOKEN_ARCHITECTURE.md">
Three-layer token system rules
</reference>
<reference type="guideline" doc_id="CS" file="COLOR_SYSTEM.md">
OKLCH color space and palette generation
</reference>
<reference type="source_file" path="packages/tokens/src/ JSON source files">
Visual identity and flavor inspirations
</reference>
<reference type="guideline" doc_id="CD" file="COMPONENT_DESIGN.md">
How components consume theming tokens
</reference>
<reference type="guideline" doc_id="WC" file="../04-accessibility/WCAG_COMPLIANCE.md">
Accessibility standards for all modes
</reference>
</related_guidelines>

  <changelog id="TS-CL">
    <version number="1.0.0" date="2025-11-02">
      <change type="NOTE">Initial theming strategy guideline establishing Flavors vs Modes distinction, file structure patterns, and build system behavior for the Sando Design System</change>
    </version>
  </changelog>

</guideline>
