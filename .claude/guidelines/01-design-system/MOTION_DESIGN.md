<guideline doc_id="MD" category="01-design-system" version="2.0.0" status="Active" last_updated="2025-11-09" owner="UI Designer + Frontend Developer">

  <purpose id="MD-PU">
    Establishes motion and animation principles using token-based durations and easing curves. Ensures consistent, purposeful, and accessible motion with automatic `prefers-reduced-motion` support.
  </purpose>

<core_rules id="MD-CR">

    <rule id="MD-CR-R1" title="Token-Based Durations (No Hardcoded Values)">
      <summary>
        All animations use token-based durations, not hardcoded values.
      </summary>

      <pattern lang="json">
        {
          "animation": {
            "duration": {
              "0": { "value": "0ms", "type": "duration" }, // Instant
              "200": { "value": "200ms", "type": "duration" }, // Fast
              "300": { "value": "300ms", "type": "duration" }, // Normal (default)
              "500": { "value": "500ms", "type": "duration" } // Slow
            }
          }
        }
      </pattern>

      <usage_in_recipes lang="json">
        {
          "button": {
            "transition": {
              "duration": { "value": "{animation.duration.200.value}" } // Fast hover
            }
          }
        }
      </usage_in_recipes>

      <anti_pattern lang="css">
        /* ❌ Hardcoded duration */
        .button {
          transition: background-color 200ms; /* Not responsive to prefers-reduced-motion */
        }

        /* ✅ Token-based */
        .button {
          transition: background-color var(--sando-button-transition-duration);
        }
      </anti_pattern>

      <why>
        Token-based durations enable automatic `prefers-reduced-motion` support—all durations become 0ms when user has motion sensitivity.
      </why>
    </rule>

    <rule id="MD-CR-R2" title="Automatic Reduced Motion (No Developer Action)">
      <summary>
        System automatically disables animations for users with `prefers-reduced-motion: reduce`.
      </summary>

      <pattern_override_file lang="json" title="flavor-motion-reduce.json (for ALL Flavors)">
        {
          "$description": "Reduced motion mode. Disables animations for users with motion sensitivity.",
          "animation": {
            "duration": {
              "instant": { "value": "0ms" },
              "fast": { "value": "0ms" },
              "normal": { "value": "0ms" },
              "slow": { "value": "0ms" }
            }
          }
        }
      </pattern_override_file>

      <build_system_note>
        Wraps in `@media (prefers-reduced-motion: reduce)` automatically.
      </build_system_note>

      <fallback_pattern lang="css" title="Component-Level Fallback (optional defense-in-depth)">
        @media (prefers-reduced-motion: reduce) {
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }

          .button:active {
            transform: none; /* Remove scale transforms */
          }
        }
      </fallback_pattern>

      <explanation>
        Allows transitions to fire (for state tracking) without visible animation.
      </explanation>

      <why>
        Accessibility compliance (WCAG 2.3.3) without manual developer intervention.
      </why>
    </rule>

    <rule id="MD-CR-R3" title="Fast Motion (100-300ms Default)">
      <summary>
        Most UI animations should be FAST (100-300ms) to avoid perceived slowness.
      </summary>

      <duration_guidelines>
        <duration_guideline name="instant" value="0ms" use_case="Reduced motion mode, immediate state changes" />
        <duration_guideline name="fast" value="200ms" use_case="Hover, focus, small transitions (most common)" />
        <duration_guideline name="normal" value="300ms" use_case="Modal entrance, dropdown, tab switching" />
        <duration_guideline name="slow" value="500ms" use_case="Page transitions, complex animations" />
      </duration_guidelines>

      <pattern lang="json">
        {
          "button": {
            "transition": {
              "duration": { "value": "{animation.duration.fast.value}" } // 200ms - snappy
            }
          },
          "modal": {
            "animation": {
              "duration": { "value": "{animation.duration.normal.value}" } // 300ms - noticeable but not slow
            }
          }
        }
      </pattern>

      <anti_pattern lang="json">
        // ❌ Too slow - feels sluggish
        {
          "button": {
            "transition": {
              "duration": { "value": "1000ms" } // Users perceive as lag
            }
          }
        }
      </anti_pattern>
    </rule>

    <rule id="MD-CR-R4" title="GPU-Accelerated Properties Only">
      <summary>
        Animate ONLY GPU-accelerated properties to avoid layout thrashing.
      </summary>

      <good_properties note="hardware accelerated">
        <property name="transform" details="(translate, scale, rotate)" />
        <property name="opacity" />
        <property name="filter" details="(blur, brightness)" />
      </good_properties>

      <bad_properties note="triggers layout/paint">
        <property name="width" />
        <property name="height" />
        <property name="margin" />
        <property name="padding" />
        <property name="top | left | right | bottom" note="use transform: translate() instead" />
        <property name="font-size" />
      </bad_properties>

      <pattern lang="css" title="✅ Good - GPU accelerated">
        .modal {
          animation: fadeIn 300ms ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px); /* GPU accelerated */
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </pattern>

      <anti_pattern lang="css" title="❌ Bad - triggers layout reflow">
        .modal {
          animation: slideDown 300ms ease-out;
        }

        @keyframes slideDown {
          from {
            top: -20px; /* Causes layout reflow */
          }
          to {
            top: 0;
          }
        }
      </anti_pattern>

      <why>
        GPU properties run at 60fps. Layout properties can drop to < 30fps, causing jank.
      </why>
    </rule>

    <rule id="MD-CR-R5" title="Semantic Easing (Context-Appropriate)">
      <summary>
        Use semantic easing tokens matched to animation context.
      </summary>

      <token_definition lang="json">
        {
          "animation": {
            "easing": {
              "default": { "value": "cubic-bezier(0.4, 0, 0.2, 1)" }, // Smooth transitions
              "entrance": { "value": "cubic-bezier(0, 0, 0.2, 1)" }, // Elements entering (ease-out)
              "exit": { "value": "cubic-bezier(0.4, 0, 1, 1)" } // Elements leaving (ease-in)
            }
          }
        }
      </token_definition>

      <usage_guidelines>
        <guideline name="entrance" type="ease-out">Elements appearing—starts fast, settles into place</guideline>
        <guideline name="exit" type="ease-in">Elements leaving—accelerates away</guideline>
        <guideline name="default" type="ease-in-out">State transitions—smooth throughout</guideline>
      </usage_guidelines>

      <usage_example lang="css">
        /* Entrance animations */
        .modal {
          animation: fadeIn 300ms var(--sando-animation-easing-entrance);
        }

        /* Exit animations */
        .notification-leaving {
          animation: fadeOut 200ms var(--sando-animation-easing-exit);
        }

        /* State transitions */
        .button {
          transition: background-color 200ms var(--sando-animation-easing-default);
        }
      </usage_example>
    </rule>

</core_rules>

<token_structure id="MD-TS">
<rule id="MD-TS-L1" title="Layer 1: Ingredients (Primitives)">
<duration_scale lang="json" title="Duration Scale (milliseconds)">
{
"animation": {
"duration": {
"0": { "value": "0ms", "type": "duration" },
"100": { "value": "100ms", "type": "duration" },
"200": { "value": "200ms", "type": "duration" },
"300": { "value": "300ms", "type": "duration" },
"500": { "value": "500ms", "type": "duration" },
"700": { "value": "700ms", "type": "duration" }
}
}
}
</duration_scale>

      <easing_functions lang="json" title="Easing Functions">
        {
          "animation": {
            "easing": {
              "linear": { "value": "linear", "type": "cubicBezier" },
              "ease-in": {
                "value": "cubic-bezier(0.4, 0, 1, 1)",
                "type": "cubicBezier"
              },
              "ease-out": {
                "value": "cubic-bezier(0, 0, 0.2, 1)",
                  "type": "cubicBezier"
              },
              "ease-in-out": {
                "value": "cubic-bezier(0.4, 0, 0.2, 1)",
                "type": "cubicBezier"
              }
            }
          }
        }
      </easing_functions>
    </rule>

    <rule id="MD-TS-L2" title="Layer 2: Flavors (Semantic)">
      <semantic_duration_tokens lang="json" title="Semantic Duration Tokens">
        {
          "animation": {
            "duration": {
              "instant": { "value": "{animation.duration.0.value}" },
              "fast": { "value": "{animation.duration.200.value}" },
              "normal": { "value": "{animation.duration.300.value}" },
              "slow": { "value": "{animation.duration.500.value}" }
            }
          }
        }
      </semantic_duration_tokens>

      <semantic_easing_tokens lang="json" title="Semantic Easing Tokens">
        {
          "animation": {
            "easing": {
              "default": { "value": "{animation.easing.ease-in-out.value}" },
              "entrance": { "value": "{animation.easing.ease-out.value}" },
              "exit": { "value": "{animation.easing.ease-in.value}" }
            }
          }
        }
      </semantic_easing_tokens>

      <mode_override lang="json" title="Mode Override (flavor-motion-reduce.json)">
      {
        "animation": {
          "duration": {
            "instant": { "value": "0ms" },
            "fast": { "value": "0ms" },
            "normal": { "value": "0ms" },
            "slow": { "value": "0ms" }
          }
        }
      }
      </mode_override>
    </rule>

    <rule id="MD-TS-L3" title="Layer 3: Recipes (Component-Specific)">
      <summary>
      Components consume semantic animation tokens:
      </summary>

      <recipe_pattern lang="json">
      {
        "button": {
          "transition": {
            "duration": { "value": "{animation.duration.fast.value}" },
            "timing": { "value": "{animation.easing.default.value}" }
          }
        },
        "modal": {
          "animation": {
            "duration": { "value": "{animation.duration.normal.value}" },
            "entrance": { "value": "{animation.easing.entrance.value}" },
            "exit": { "value": "{animation.easing.exit.value}" }
          }
        }
      }
      </recipe_pattern>
    </rule>

</token_structure>

<animation_patterns id="MD-AP">
<rule id="MD-AP-P1" title="State Transitions (Hover, Focus, Active)">
<use_case>
Interactive elements changing state.
</use_case>

      <pattern lang="css">
        .button {
          transition-property: background-color, transform, box-shadow;
          transition-duration: var(--sando-button-transition-duration); /* 200ms */
          transition-timing-function: var(
            --sando-button-transition-timing
          ); /* ease-in-out */
        }

        .button:hover {
          background-color: var(--sando-button-solid-backgroundColor-hover);
        }

        .button:active {
          transform: scale(0.98); /* Subtle press feedback */
        }
      </pattern>

      <animatable_properties>
        <property>background-color</property>
        <property>color</property>
        <property>border-color</property>
        <property>transform</property>
        <property>opacity</property>
        <property>box-shadow</property>
      </animatable_properties>
    </rule>

    <rule id="MD-AP-P2" title="Entrance Animations (Fade In, Slide In)">
      <use_case>
        Elements appearing in viewport.
      </use_case>

      <pattern lang="css">
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal {
          animation: fadeIn var(--sando-animation-duration-normal)
            var(--sando-animation-easing-entrance);
        }
      </pattern>
    </rule>

    <rule id="MD-AP-P3" title="Exit Animations (Fade Out, Slide Out)">
      <use_case>
        Elements leaving viewport.
      </use_case>

      <pattern lang="css">
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-8px);
          }
        }

        .notification-leaving {
          animation: fadeOut var(--sando-animation-duration-fast)
            var(--sando-animation-easing-exit);
        }
      </pattern>
    </rule>

</animation_patterns>

<component_implementation id="MD-CI">
<implementation_example id="MD-CI-P1" title="Complete Pattern: Button with Transitions">
<recipe_tokens lang="json">
{
"button": {
"transition": {
"duration": { "value": "{animation.duration.fast.value}" },
"timing": { "value": "{animation.easing.default.value}" }
}
}
}
</recipe_tokens>

      <component_consumption lang="typescript">
        import { css } from "lit";

        export const buttonStyles = css`
          .button {
            transition-property: background-color, color, transform, box-shadow;
            transition-duration: var(--sando-button-transition-duration);
            transition-timing-function: var(--sando-button-transition-timing);
          }

          @media (prefers-reduced-motion: reduce) {
            .button {
              transition-duration: 0.01ms !important;
            }
          }
        `;
      </component_consumption>

      <applicability>
        All interactive components (Buttons, Inputs, Links, Cards with hover)
      </applicability>

      <special_cases>
        <case name="Loading spinners">Use `linear` easing, longer duration (600ms)</case>
        <case name="Modals/Dialogs">Use `entrance` easing for opening, `exit` for closing</case>
        <case name="Micro-interactions (checkbox check, toggle switch)">200ms with slight scale</case>
      </special_cases>
    </implementation_example>

</component_implementation>

<motion_vs_modes id="MD-MVM">
<distinction id="MD-MVM-D1" title="Critical Distinction">

<summary>
Motion operates independently from color modes (dark, high-contrast).
</summary>

      <pattern_example>
        <note>User can have:</note>
        <stack>
          <item name="flavor" value="original" description="brand theme" />
          <item name="media_query" value="prefers-color-scheme: dark" description="dark mode" />
          <item name="media_query" value="prefers-reduced-motion: reduce" description="motion disabled" />
        </stack>
      </pattern_example>

      <explanation>
        All three apply simultaneously via separate media queries.
      </explanation>

      <reference type="guideline" doc_id="TS" file="THEMING_STRATEGY.md">
        complete Flavors vs Modes explanation
      </reference>
    </distinction>

</motion_vs_modes>

<related_guidelines id="MD-RG">
<reference type="guideline" doc_id="TS" file="THEMING_STRATEGY.md">
Flavors vs Modes, automatic mode activation
</reference>
<reference type="guideline" doc_id="TA" file="TOKEN_ARCHITECTURE.md">
Three-layer token system structure
</reference>
<reference type="guideline" doc_id="CD" file="COMPONENT_DESIGN.md">
Interactive state patterns requiring motion
</reference>
</related_guidelines>

  <changelog id="MD-CL">
    <version number="2.0.0" date="2025-11-02">
      <change type="BREAKING">Consolidated 5 animation patterns to 3 core patterns</change>
      <change type="BREAKING">Removed duplicate explanations (reduced from 631 to ~400 lines)</change>
      <change type="BREAKING">Removed extensive anti-pattern examples</change>
      <change type="IMPROVED">Clearer rules with pattern/anti-pattern examples</change>
      <change type="IMPROVED">Focus on fundamental motion rules for agent consumption</change>
      <change type="NOTE">Reduced from 631 to ~400 lines (37% reduction)</change>
    </version>

    <version number="1.0.0" date="2025-11-02">
      <change type="NOTE">
        Initial motion design guideline with duration scales, easing patterns, accessibility
      </change>
    </version>

  </changelog>

</guideline>
