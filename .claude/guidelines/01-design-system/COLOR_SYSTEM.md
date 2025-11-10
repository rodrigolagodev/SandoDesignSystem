<guideline doc_id="CS" category="01-design-system" version="2.0.0" status="Active" last_updated="2025-11-09" owner="Design System Architect">

  <purpose id="CS-PU">
    Defines OKLCH-based color system with algorithmic generation, ensuring perceptual uniformity, predictable contrast, and WCAG 2.1 AA/AAA compliance.
  </purpose>

<core_rules id="CS-CR">

  <rule id="CS-CR-R1" title="Use OKLCH for All Colors">
    <format>
      All colors defined in OKLCH color space (Oklab Lightness Chroma Hue).
    </format>

    <why>
      Perceptually uniform lightness and chroma. L=0.5 looks exactly 50% bright (unlike HSL where L=50% varies by hue).
    </why>

    <specification>
      Format: `oklch(L C H)` or `oklch(L C H / A)`
      - L (Lightness): 0 (black) to 1 (white)
      - C (Chroma): 0 (gray) to 0.37+ (maximum saturation)
      - H (Hue): 0-360 degrees on color wheel
      - A (Alpha): 0 (transparent) to 1 (opaque) - optional
    </specification>

    <pattern lang="css">
      --color-orange-500: oklch(0.64 0.2 25); /* L=0.64, C=0.20, H=25° */
    </pattern>

    <key_advantage>
      `orange-500` and `blue-500` have identical perceived brightness (both L=0.64).
    </key_advantage>

  </rule>

  <rule id="CS-CR-R2" title="Universal Lightness Scale">
    <summary>
      All colors use the SAME lightness progression across all hues.
    </summary>

    <lightness_scale_specification>
      <step value="50" lightness="0.98" use_case="Near white, subtle tints" />
      <step value="100" lightness="0.95" use_case="Very light backgrounds" />
      <step value="200" lightness="0.90" use_case="Light backgrounds" />
      <step value="300" lightness="0.82" use_case="Muted colors" />
      <step value="400" lightness="0.73" use_case="Medium colors" />
      <step value="500" lightness="0.64" use_case="BASE COLOR (reference)" is_base="true" />
      <step value="600" lightness="0.56" use_case="Dark colors" />
      <step value="700" lightness="0.47" use_case="Very dark colors" />
      <step value="800" lightness="0.38" use_case="Almost black" />
      <step value="900" lightness="0.30" use_case="Near black" />
      <step value="950" lightness="0.22" use_case="Darkest shade" />
    </lightness_scale_specification>

    <why>
      Guarantees consistent contrast ratios across all colors. Any `color-700` text on any `color-50` background has the same contrast ratio.
    </why>

    <reference>
      See [packages/tokens/src/ JSON source files) for complete specification.
    </reference>

  </rule>

  <rule id="CS-CR-R3" title="Four Saturation Profiles">
    <summary>
      Colors are categorized by peak chroma intensity.
    </summary>

<saturation_profiles>
<profile 
      name="High" 
      peak_chroma="0.20-0.22" 
      use_case="Maximum impact, vibrant accents" 
      examples="red, pink, violet" 
    />
<profile 
      name="Medium" 
      peak_chroma="0.17-0.20" 
      use_case="Professional UI, primary colors" 
      examples="blue, green, orange" 
      is_default="true" 
    />
<profile 
      name="Low" 
      peak_chroma="0.14-0.16" 
      use_case="Soft, approachable, backgrounds" 
      examples="yellow, amber, lime" 
    />
<profile 
      name="Neutral" 
      peak_chroma="0.005-0.018" 
      use_case="Foundations (text, borders, surfaces)" 
      examples="All gray variants" 
    />
</saturation_profiles>

    <constraint>
      Select profile by intended use, not preference.
    </constraint>

    <pattern lang="javascript">
      // Medium saturation (most common)
      const orange = generateColorScale("orange", 25, "medium");
      // Results in chroma curve: [0.08, 0.08, 0.14, 0.20, 0.20, 0.20, ...]
    </pattern>

    <reference>
      See [packages/tokens/src/ JSON source files) for complete curves.
    </reference>

  </rule>

  <rule id="CS-CR-R4" title="Brand-Agnostic Ingredients">
    <summary>
      Ingredients (Layer 1) have NO semantic meaning. They are neutral primitives.
    </summary>

    <why>
      Enables unlimited brand customization. Semantic meaning is defined in Flavors (Layer 2).
    </why>

    <pattern lang="json">
      // Ingredients - neutral primitives
      {
        "color": {
          "orange": {
            "500": { "value": "oklch(0.64 0.20 25)", "type": "color" }
          }
        }
      }
      // Flavors - define USE CONTEXT
      {
        "color": {
          "action": {
            "solid": {
              "background": {
                "default": { "value": "{color.orange.500.value}" }  // User chooses orange
              }
            }
          }
        }
      }
    </pattern>

    <anti_pattern lang="json">
      // Don't name Ingredients by use
      {
        "color": {
          "primary": { ... } // Too specific, not reusable
        }
      }
    </anti_pattern>

  </rule>

  <rule id="CS-CR-R5" title="WCAG Contrast Requirements">
    <summary>
      All color combinations MUST meet WCAG 2.1 AA minimum.
    </summary>

    <wcag_contrast_requirements>
      <requirement context="Normal text (< 18px)" minimum_aa="4.5:1" target_aaa="7:1" />
      <requirement context="Large text (≥ 18px)" minimum_aa="3:1" target_aaa="4.5:1" />
      <requirement context="UI components" minimum_aa="3:1" target_aaa="4.5:1" />
      <requirement context="Focus indicators" minimum_aa="3:1" target_aaa="4.5:1" />
    </wcag_contrast_requirements>

    <constraint>
      Target AAA where possible, use AA as minimum.
    </constraint>

    <key_pairs>
      <pair example="`neutral-warm-950` on `neutral-warm-50`" ratio="14.8:1" level="AAA" note="headings" />
      <pair example="`neutral-warm-800` on `neutral-warm-50`" ratio="10.2:1" level="AAA" note="body text" />
      <pair example="`white` on `orange-600`" ratio="4.9:1" level="AA" note="button text" />
    </key_pairs>

    <reference>
      See [packages/tokens/src/ JSON source files) for complete matrix.
    </reference>

  </rule>

<token_structure id="CS-TS">

  <rule id="CS-TS-L1" title="Layer 1: Ingredients (Algorithmic Primitives)">
    <summary>
      15 colors, 11 steps each = 165 tokens (+ 3 utilities).
    </summary>

    <palette_groups>
      <group name="Warm" count="5">red, rose, orange, amber, yellow</group>
      <group name="Green" count="3">lime, green, emerald</group>
      <group name="Cool" count="4">cyan, sky, blue, indigo</group>
      <group name="Purple/Pink" count="3">purple, violet, pink</group>
      <group name="Neutral" count="4">neutral, neutral-warm, neutral-cool, sand</group>
      <group name="Utility" count="3">white, black, transparent</group>
    </palette_groups>

    <example lang="json" title="Example - Orange (Hue: 25°, Profile: Medium)">
      {
        "color": {
          "orange": {
            "50": { "value": "oklch(0.98 0.08 25)", "type": "color" },
            "500": { "value": "oklch(0.64 0.20 25)", "type": "color" }, // Base
            "950": { "value": "oklch(0.22 0.12 25)", "type": "color" }
            // ... 11 steps total
          }
        }
      }
    </example>

    <pattern>
      All colors follow universal lightness + profile chroma curve.
    </pattern>

    <reference>
      See [packages/tokens/src/ JSON source files) for all 165 tokens.
    </reference>

  </rule>

  <rule id="CS-TS-L2" title="Layer 2: Flavors (Semantic Mapping)">
    <summary>
      Flavors map Ingredients to USE CONTEXT (not brand identity).
    </summary>

    <flavor_categories>
      <category name="color.background" purpose="Canvas and surfaces" example_tokens="base, surface, raised, overlay" />
      <category name="color.text" purpose="Text hierarchy" example_tokens="heading, body, caption, muted, on-solid" />
      <category name="color.action" purpose="Interactive elements" example_tokens="solid, outline, ghost (× background/text/border × states)" />
      <category name="color.state" purpose="Feedback states" example_tokens="destructive, success, warning, info" />
      <category name="color.focus" purpose="Focus indicators" example_tokens="ring, ring-offset, background" />
      <category name="color.border" purpose="Borders" example_tokens="default, muted, emphasis" />
    </flavor_categories>

    <pattern lang="json">
      {
        "color": {
          "action": {
            "solid": {
              "background": {
                "default": { "value": "{color.orange.600.value}" }, // User choice
                "hover": { "value": "{color.orange.700.value}" }
              },
              "text": {
                "default": { "value": "{color.neutral.50.value}" }
              }
            }
          },
          "state": {
            "success": {
              "background": { "value": "{color.green.100.value}" },
              "text": { "value": "{color.green.700.value}" }
            }
          }
        }
      }
    </pattern>

    <critical_rules>
      <constraint>Flavors define USE, not brand: `color.action.solid.background` (not `color.brand.primary`)</constraint>
      <constraint>User chooses Ingredient mapping: Purple for actions? Blue? Orange? User decides</constraint>
      <constraint>Consistency within Flavor: If `color.action` uses purple-600, `color.focus.ring` should too</constraint>
      <constraint>States typically use semantic colors: `destructive` → red, `success` → green</constraint>
    </critical_rules>

  </rule>

  <rule id="CS-TS-L3" title="Layer 3: Recipes (Component-Specific)">
    <summary>
      Recipes reference Flavors for component colors.
    </summary>

    <pattern lang="json">
      {
        "button": {
          "solid": {
            "backgroundColor": {
              "default": { "value": "{color.action.solid.background.default.value}" },
              "hover": { "value": "{color.action.solid.background.hover.value}" }
              // ... states
            },
            "textColor": {
              "default": { "value": "{color.action.solid.text.default.value}" }
            }
          }
        }
      }
    </pattern>

    <anti_pattern lang="json">
      {
        "button": {
          "solid": {
            "backgroundColor": {
              "default": { "value": "{color.orange.600.value}" } // ❌ Skips Flavor layer
            }
          }
        }
      }
    </anti_pattern>

</token_structure>

<algorithmic_generation id="CS-AG">

<summary>
Any new color can be generated following this formula:
</summary>

    <implementation lang="typescript">
      function generateColorScale(
        colorName: string,
        hue: number, // 0-360 degrees
        profile: "high" | "medium" | "low" | "neutral"
      ): ColorScale {
        // CONSTANT lightness (perceptual consistency)
        const lightness = [
          0.98, 0.95, 0.9, 0.82, 0.73, 0.64, 0.56, 0.47, 0.38, 0.3, 0.22,
      ];

      // Chroma by profile
      const chromaCurves = {
        high: [
        0.088, 0.088, 0.154, 0.22, 0.22, 0.22, 0.22, 0.22, 0.176, 0.176, 0.132,
        ],
        medium: [0.08, 0.08, 0.14, 0.2, 0.2, 0.2, 0.2, 0.2, 0.16, 0.16, 0.12],
        low: [0.06, 0.06, 0.1, 0.15, 0.15, 0.15, 0.15, 0.15, 0.12, 0.12, 0.09],
        neutral: [
          0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018, 0.018,
          0.018,
        ],
      };

      const chroma = chromaCurves[profile];
      const steps = [
        "50",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "950",
      ];

      return steps.reduce((acc, step, i) => {
        acc[`${colorName}-${step}`] = {
            value: `oklch(${lightness[i]} ${chroma[i]} ${hue})`,
            type: "color",
          };
          return acc;
        }, {});
      }
    </implementation>

    <example lang="typescript">
      // Example: Generate "teal" at hue 180°
      const teal = generateColorScale("teal", 180, "medium");
      // Result: teal-50: oklch(0.98 0.08 180), teal-500: oklch(0.64 0.20 180), ...
    </example>

</algorithmic_generation>

<colorblind_accessibility id="CS-CA">
<rule id="CS-CA-R1" title="Critical Rule: Use Lightness Contrast, Not Just Hue">
<pattern>
<comparison type="good" outcome="51% lightness difference">
<item name="orange-700" lightness="0.47" />
<item name="neutral-50" lightness="0.98" />
</comparison>
</pattern>
<anti_pattern>
<comparison type="bad" outcome="0% lightness difference (indistinguishable)">
<item name="red-500" lightness="0.64" />
<item name="green-500" lightness="0.64" />
</comparison>
</anti_pattern>
</rule>

    <rule id="CS-CA-R2" title="Pattern: Combine Color with Non-Color Indicators">
      <indicators>
        <indicator type="Icons">Error = red + X icon, Success = green + checkmark</indicator>
        <indicator type="Patterns">Graphs use stripes, dots, solid fills (not just colors)</indicator>
        <indicator type="Labels">"Error" text + red color, not just red alone</indicator>
      </indicators>
      <why>
        All Sando colors have sufficient lightness contrast for colorblind users.
      </why>
    </rule>

</colorblind_accessibility>

<related_guidelines id="CS-RG">
<reference 
      type="source_file" 
      path="packages/tokens/src/ JSON source files">
Complete palette (165 tokens), chroma curves, approved contrast pairs
</reference>

    <reference
      type="guideline"
      doc_id="TA"
      file="TOKEN_ARCHITECTURE.md">
      Three-layer system rules
    </reference>

    <reference
      type="guideline"
      doc_id="TS"
      file="THEMING_STRATEGY.md">
      How colors enable theming via Flavors
    </reference>

</related_guidelines>

  <changelog id="CS-CL">
    <version number="2.0.0" date="2025-11-02">
      <change type="BREAKING">Complete palette (165 tokens) available in `packages/tokens/src/ingredients/color.json`</change>
      <change type="BREAKING">Chroma curve arrays available in source JSON (not duplicated in guidelines)</change>
      <change type="BREAKING">Approved contrast pairs available in source JSON (not duplicated in guidelines)</change>
      <change type="BREAKING">Removed OKLCH comparison table (reduced to conceptual advantage)</change>
      <change type="BREAKING">Consolidated examples to algorithmic pattern only</change>
      <change type="IMPROVED">Clearer rules with pattern/anti-pattern examples</change>
      <change type="IMPROVED">Focus on fundamental color system rules for agents</change>
      <change type="NOTE">Reduced from 921 to ~420 lines (54% reduction)</change>
    </version>

    <version number="1.0.0" date="2025-11-02">
      <change type="NOTE">Initial color system with OKLCH, algorithmic generation, WCAG compliance</change>
    </version>

  </changelog>

</guideline>
