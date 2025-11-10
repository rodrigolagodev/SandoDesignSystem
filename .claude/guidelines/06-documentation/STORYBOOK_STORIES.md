<guideline doc_id="SBS" category="06-documentation" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Technical Writer">

  <purpose id="SBS-PU">
    Establish comprehensive standards for creating Storybook stories in the Sando Design System, following Strapi Design System's organization and presentation patterns. This guideline ensures consistent, interactive, and accessible component documentation that serves both designers and developers.
  </purpose>

  <inspiration id="SBS-INSP">
    Strapi Design System (design-system.strapi.io)
  </inspiration>

  <targets id="SBS-TGT">
    <target>All public components, design tokens, and composition patterns</target>
  </targets>

  <scope id="SBS-SC">
    Story organization, argTypes configuration, interactive controls, accessibility
  </scope>

  <enforcement id="SBS-ENF">
    Code review, Storybook build validation
  </enforcement>

<core_rules id="SBS-CR">
<rule id="SBS-CR-R1" title="Three-Section Organization (Strapi Pattern)">

<summary>
Stories MUST be organized into three top-level sections following Strapi's structure: Design Tokens, Components, and Patterns.
</summary>

      <sections>
        <section number="1" name="Design Tokens">Foundation layer showcasing token system</section>
        <section number="2" name="Components">Individual component documentation</section>
        <section number="3" name="Patterns">Composition examples and usage patterns</section>
      </sections>

      <pattern lang="typescript" title="Story title patterns">
        // Design Tokens stories
        const meta: Meta = {
          title: "Design Tokens/Colors/Brand",
          tags: ["autodocs"],
        };

        // Component stories
        const meta: Meta = {
          title: "Components/Button",
          tags: ["autodocs"],
        };

        // Pattern stories
        const meta: Meta = {
          title: "Patterns/Forms/Login Form",
          tags: ["autodocs"],
        };
      </pattern>

      <directory_structure>
        packages/components/src/
        ├── tokens/
        │   └── stories/
        │       ├── colors.stories.ts        # Design Tokens/Colors
        │       ├── spacing.stories.ts       # Design Tokens/Spacing
        │       └── typography.stories.ts    # Design Tokens/Typography
        ├── components/
        │   └── button/
        │       ├── sando-button.stories.ts  # Components/Button
        │       └── stories/                 # Additional focused stories
        └── patterns/
            └── stories/
                ├── forms.stories.ts         # Patterns/Forms
                └── navigation.stories.ts    # Patterns/Navigation
      </directory_structure>

      <why>
        Strapi's three-section approach clearly separates foundation (tokens), building blocks (components), and real-world usage (patterns). This structure helps users understand the system hierarchy and find what they need quickly.
      </why>

      <reference type="external" url="https://design-system.strapi.io">
        Strapi Design System organization
      </reference>
    </rule>

    <rule id="SBS-CR-R2" title="Main Story File Per Component (Required)">
      <summary>
        Each component MUST have ONE main story file (sando-component.stories.ts) that serves as the comprehensive reference and entry point.
      </summary>

      <pattern lang="typescript" title="Main story file structure">
        // packages/components/src/components/button/sando-button.stories.ts
        import { html } from "lit";
        import type { Meta, StoryObj } from "@storybook/web-components";
        import "./sando-button";

        /**
         * # Button Component
         *
         * Buttons trigger actions and events. They communicate calls to action
         * and help users interact with your application.
         *
         * ## Usage
         *
         * Use buttons to trigger immediate actions like:
         * - Submitting forms
         * - Opening dialogs
         * - Navigating between pages
         * - Confirming or canceling operations
         *
         * ## Accessibility
         *
         * - All buttons have visible focus indicators
         * - Disabled buttons are not focusable
         * - Icon-only buttons require aria-label
         * - Loading state announced to screen readers
         */
        const meta: Meta = {
          title: "Components/Button",
          component: "sando-button",
          tags: ["autodocs"],
          argTypes: {
            variant: {
              control: "select",
              options: ["solid", "outline", "ghost"],
              description: "Visual style of the button",
              table: {
                category: "Appearance",
                defaultValue: { summary: "solid" },
              },
            },
          },
          args: {
            variant: "solid",
            size: "medium",
            label: "Button",
          },
        };

        export default meta;
        type Story = StoryObj;

        export const Default: Story = {
          args: { label: "Click me" },
        };

        export const Playground: Story = {
          render: (args) => html`<sando-button>${args.label}</sando-button>`,
        };
      </pattern>

      <why>
        Main story provides comprehensive documentation, interactive playground, and visual reference. All variations in one place help users understand the full component API.
      </why>

      <reference type="external" url="https://design-system.strapi.io">
        Strapi components have single comprehensive story files
      </reference>
    </rule>

    <rule id="SBS-CR-R3" title="Automatic Flavor Modes via @media (Critical)">
      <summary>
        Flavor modes (light, dark, high-contrast) are automatic via CSS @media queries and MUST NOT be manually controllable in Storybook.
      </summary>

      <correct_pattern lang="typescript">
        // ✅ CORRECT - No flavorMode in argTypes
        const meta: Meta = {
          title: "Components/Button",
          argTypes: {
            flavor: {
              control: "select",
              options: ["original", "strawberry", "ocean", "forest", "sunset"],
              description: "Theme flavor (inherited from ancestor)",
            },
            // ❌ DO NOT add flavorMode control - it's automatic
          },
        };
      </correct_pattern>

      <testing_modes>
        <method>Use browser DevTools > Rendering > Emulate CSS media feature</method>
        <method>Change OS system preferences (Settings > Appearance)</method>
        <method>Storybook toolbar "Backgrounds" addon shows mode visually</method>
      </testing_modes>

      <implementation lang="css">
        @media (prefers-color-scheme: dark) {
          [flavor="original"] {
            --sando-color-background-base: var(--sando-color-neutral-900);
          }
        }
      </implementation>

      <why>
        Flavor modes use @media (prefers-color-scheme) for automatic system preference detection. Manual controls would contradict this behavior and confuse users.
      </why>

      <reference type="guideline" doc_id="TS" file="../01-design-system/THEMING_STRATEGY.md">
        Sando theming system uses CSS @media queries for automatic mode switching
      </reference>
    </rule>

    <rule id="SBS-CR-R4" title="Comprehensive argTypes Documentation (Required)">
      <summary>
        All interactive component properties MUST have complete argTypes configuration with controls, descriptions, categories, and default values.
      </summary>

      <pattern lang="typescript">
        const meta: Meta = {
          argTypes: {
            propertyName: {
              control: "select",
              options: ["option1", "option2"],
              description: "Clear explanation of what this property does",
              table: {
                category: "Appearance",
                defaultValue: { summary: "default" },
                type: { summary: "string" },
              },
            },
          },
        };
      </pattern>

      <category_conventions>
        <category name="Appearance">Visual styles (variant, size, color)</category>
        <category name="State">Interactive states (disabled, loading, error)</category>
        <category name="Content">Text, icons, slots</category>
        <category name="Behavior">Event handlers, interaction settings</category>
        <category name="Theming">Flavor, mode-related properties</category>
      </category_conventions>

      <control_types>
        <control type="select">Dropdown selection: control: 'select', options: ['small', 'medium', 'large']</control>
        <control type="boolean">Checkbox toggle: control: 'boolean'</control>
        <control type="text">Text input: control: 'text'</control>
        <control type="number">Number slider: control: { type: 'number', min: 0, max: 100, step: 1 }</control>
        <control type="color">Color picker: control: 'color'</control>
        <control type="date">Date picker: control: 'date'</control>
        <control type="object">Object/Array editor: control: 'object'</control>
        <control type="disabled">Display-only: control: false</control>
      </control_types>

      <why>
        Comprehensive argTypes enable interactive exploration and serve as self-documenting API reference. Categories organize complex components with many properties.
      </why>
    </rule>

    <rule id="SBS-CR-R5" title="Focused Stories for Complex Scenarios (Optional)">
      <summary>
        Complex components MAY have additional focused story files in a stories/ subdirectory for specialized documentation.
      </summary>

      <pattern lang="typescript">
        // packages/components/src/components/button/stories/icons.stories.ts
        import { html } from "lit";
        import type { Meta, StoryObj } from "@storybook/web-components";
        import "../sando-button";

        const meta: Meta = {
          title: "Components/Button/Icons",
          component: "sando-button",
          tags: ["autodocs"],
        };

        export default meta;
        type Story = StoryObj;

        export const LeadingIcon: Story = {
          render: () => html`
            <sando-button>
              <svg slot="icon-start" width="16" height="16">
                <path d="M8 2L2 8l6 6 6-6z" />
              </svg>
              With Icon
            </sando-button>
          `,
        };
      </pattern>

      <when_to_create>
        <criteria>Component has 5+ variants/states/sizes</criteria>
        <criteria>Special use cases (icons, forms, compositions)</criteria>
        <criteria>Integration examples (with other components)</criteria>
        <criteria>Responsive behavior demonstrations</criteria>
        <criteria>Complex slot configurations</criteria>
      </when_to_create>

      <why>
        Focused stories keep main story file manageable while providing deep-dive documentation for advanced scenarios. Strapi uses this pattern for complex components.
      </why>
    </rule>

</core_rules>

<story_templates id="SBS-ST">
<design_tokens_template id="SBS-ST-DTT" lang="typescript">
// packages/components/src/tokens/stories/colors.stories.ts
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

      /**
       * # Color Tokens
       *
       * Sando uses a three-layer token architecture:
       * - Layer 1: Ingredients - Raw color values (#f97415)
       * - Layer 2: Flavors - Semantic color roles (background, text, border)
       * - Layer 3: Recipes - Component-specific colors (button-background)
       */
      const meta: Meta = {
        title: "Design Tokens/Colors",
        tags: ["autodocs"],
      };

      export default meta;
      type Story = StoryObj;

      export const BrandColors: Story = {
        render: () => html`Color swatches display`,
        parameters: { controls: { disable: true } },
      };
    </design_tokens_template>

    <pattern_template id="SBS-ST-PT" lang="typescript">
      // packages/components/src/patterns/stories/forms.stories.ts
      import { html } from "lit";
      import type { Meta, StoryObj } from "@storybook/web-components";

      /**
       * # Form Patterns
       *
       * Common form layouts and compositions using Sando components.
       */
      const meta: Meta = {
        title: "Patterns/Forms",
        tags: ["autodocs"],
      };

      export default meta;
      type Story = StoryObj;

      export const LoginForm: Story = {
        render: () => html`<form>...</form>`,
        parameters: { controls: { disable: true } },
      };
    </pattern_template>

</story_templates>

<story_organization id="SBS-SO">
<naming_conventions id="SBS-SO-NC">
<story_titles>

<title type="Design Tokens">Design Tokens/Colors, Design Tokens/Spacing, Design Tokens/Typography</title>
<title type="Components">Components/Button, Components/Input, Components/Card</title>
<title type="Patterns">Patterns/Forms, Patterns/Navigation, Patterns/Layouts</title>
</story_titles>

      <story_names>
        <convention>Use PascalCase: Default, AllVariants, WithIcons</convention>
        <convention>Descriptive names: LoginForm, BrandColors, ResponsiveGrid</convention>
      </story_names>

      <file_names>
        <convention>Main story per component: sando-button.stories.ts, sando-input.stories.ts</convention>
        <convention>Token stories: colors.stories.ts, spacing.stories.ts</convention>
        <convention>Pattern stories: forms.stories.ts, navigation.stories.ts</convention>
      </file_names>
    </naming_conventions>

    <story_documentation id="SBS-SO-SD">
      <jsdoc_comments>
        JSDoc comments provide context in Storybook UI with Markdown formatting support
      </jsdoc_comments>

      <story_parameters>
        Used for disabling controls, custom documentation, backgrounds, viewport sizes
      </story_parameters>
    </story_documentation>

</story_organization>

<common_patterns id="SBS-CP">
<all_variants_showcase id="SBS-CP-AVS" lang="typescript">
export const AllVariants: Story = {
render: () => html`
          <div style="display: flex; gap: 16px;">
            ${["solid", "outline", "ghost"].map(variant => html`
<sando-button variant="${variant}">${variant}</sando-button>
`)}
          </div>
        `,
parameters: { controls: { disable: true } },
};
</all_variants_showcase>

    <flavor_comparison id="SBS-CP-FC" lang="typescript">
      export const AllFlavors: Story = {
        render: () => html`
          <div style="display: grid; gap: 24px;">
            ${["original", "strawberry", "ocean"].map(flavor => html`
              <div flavor="${flavor}">
                <sando-button>Solid</sando-button>
              </div>
            `)}
          </div>
        `,
        parameters: { controls: { disable: true } },
      };
    </flavor_comparison>

    <interactive_playground id="SBS-CP-IP" lang="typescript">
      export const Playground: Story = {
        render: (args) => html`
          <sando-button
            variant="${args.variant}"
            ?disabled="${args.disabled}"
          >${args.label}</sando-button>
        `,
      };
    </interactive_playground>

</common_patterns>

<accessibility_in_stories id="SBS-AIS">
<testing_accessibility id="SBS-AIS-TA" lang="typescript">
import { expect } from "@storybook/jest";
import { axe, toHaveNoViolations } from "jest-axe";

      expect.extend(toHaveNoViolations);

      export const AccessibilityTest: Story = {
        play: async ({ canvasElement }) => {
          const results = await axe(canvasElement);
          expect(results).toHaveNoViolations();
        },
      };
    </testing_accessibility>

    <keyboard_navigation id="SBS-AIS-KN">
      Document keyboard shortcuts and focus order in story parameters
    </keyboard_navigation>

</accessibility_in_stories>

<related_guidelines id="SBS-RG">
<reference type="guideline" doc_id="API" file="./API_REFERENCE.md">
Component API documentation standards
</reference>
<reference type="guideline" doc_id="VPG" file="./VITEPRESS_GUIDES.md">
Long-form guide writing
</reference>
<reference type="guideline" doc_id="WC" file="../04-accessibility/WCAG_COMPLIANCE.md">
Accessibility requirements
</reference>
<reference type="guideline" doc_id="CS" file="../03-development/CODE_STYLE.md">
TypeScript and Lit conventions
</reference>
</related_guidelines>

<external_references id="SBS-ER">
<category name="Storybook Documentation">
<reference url="https://storybook.js.org/docs">Storybook 8 Docs - Official documentation</reference>
<reference url="https://storybook.js.org/docs/web-components/get-started/introduction">Web Components in Storybook - Framework setup</reference>
<reference url="https://storybook.js.org/docs/api/arg-types">ArgTypes - Control configuration</reference>
</category>

    <category name="Design System References">
      <reference url="https://design-system.strapi.io/">Strapi Design System - Organization inspiration</reference>
      <reference url="https://m3.material.io/">Material Design - Component documentation patterns</reference>
      <reference url="https://carbondesignsystem.com/">Carbon Design System - Story structure examples</reference>
    </category>

</external_references>

  <changelog id="SBS-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline creation following Strapi Design System patterns</change>
      <change type="IMPROVED">Three-section organization (Design Tokens, Components, Patterns)</change>
      <change type="IMPROVED">Main story file pattern with comprehensive argTypes</change>
      <change type="IMPROVED">Automatic flavor mode documentation (no manual controls)</change>
      <change type="IMPROVED">Focused story files for complex scenarios</change>
      <change type="IMPROVED">Design tokens, component, and pattern templates</change>
      <change type="IMPROVED">Common story patterns (variants, flavors, playground, responsive)</change>
      <change type="IMPROVED">Accessibility testing integration</change>
      <change type="IMPROVED">Validation checklist for all story types</change>
      <change type="NOTE">Agent-optimized XML format for token efficiency</change>
      <change type="NOTE">Storybook stories are living documentation - they serve developers, designers, and stakeholders equally. Invest in comprehensive, interactive examples.</change>
    </version>
  </changelog>

</guideline>
