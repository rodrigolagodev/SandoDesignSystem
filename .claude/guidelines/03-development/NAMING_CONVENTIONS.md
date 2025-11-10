<guideline doc_id="NC" category="03-development" version="2.0.0" status="Active" last_updated="2025-11-09" owner="Design System Architect">

  <purpose id="NC-PU">
    Establish consistent naming patterns for components, files, variables, tokens, and exports to ensure clarity, prevent naming conflicts, enable automated tooling, and maintain a cohesive developer experience across the Sando Design System.
  </purpose>

<core_rules id="NC-CR">

    <rule id="NC-CR-R1" title="Component Naming (Non-Negotiable)">
      <summary>
        Web Component tag names MUST use the `sando-` prefix with kebab-case. Class names MUST use the `Sando` prefix with PascalCase.
      </summary>

      <pattern lang="typescript">
        // ✅ CORRECT: Component naming from sando-button.ts
        @customElement("sando-button")
        export class SandoButton extends FlavorableMixin(LitElement) {
          // Component implementation
        }

        // Global type declaration
        declare global {
          interface HTMLElementTagNameMap {
            "sando-button": SandoButton;
          }
        }
      </pattern>

      <anti_pattern lang="typescript">
        // ❌ WRONG: Missing prefix
        @customElement("button")
        export class Button extends LitElement {}

        // ❌ WRONG: Wrong case for tag name
        @customElement("SandoButton") // Must be kebab-case
        export class SandoButton extends LitElement {}

        // ❌ WRONG: Missing prefix on class
        @customElement("sando-button")
        export class Button extends LitElement {} // Must be SandoButton
      </anti_pattern>

      <why>
        The `sando-` prefix prevents naming conflicts with native HTML elements and future web standards. Kebab-case is required by the Custom Elements spec. PascalCase for class names follows TypeScript/JavaScript conventions.
      </why>
    </rule>

    <rule id="NC-CR-R2" title="File Naming (Non-Negotiable)">
      <summary>
        File names MUST use kebab-case with specific suffixes indicating file purpose.
      </summary>

      <pattern lang="text">
        ✅ CORRECT: Monolithic component structure
        packages/components/src/components/button/
        ├── sando-button.ts              # Component implementation
        ├── sando-button.types.ts        # Type definitions
        ├── sando-button.stories.ts      # Storybook documentation
        ├── sando-button.test.ts         # Unit tests (Vitest)
        ├── sando-button.spec.ts         # E2E tests (Playwright)
        ├── sando-button.a11y.test.ts    # Accessibility tests (axe-core)
        └── index.ts                     # Component barrel export
      </pattern>

      <anti_pattern lang="text">
        ❌ WRONG: Inconsistent file naming
        ├── SandoButton.ts               # PascalCase (wrong for files)
        ├── sando_button.types.ts        # snake_case (wrong)
        ├── sandoButton.stories.ts       # camelCase (wrong)
        ├── Button.test.ts               # Missing component prefix
        └── sando-button.e2e.test.ts    # Use .spec.ts instead
      </anti_pattern>

      <why>
        Kebab-case works consistently across all operating systems. File suffixes clearly indicate purpose without opening files. Standardized suffixes enable automated tooling.
      </why>

      <reference type="guideline" doc_id="CA" file="../02-architecture/COMPONENT_ARCHITECTURE.md">
        Complete file structure patterns
      </reference>
    </rule>

    <rule id="NC-CR-R3" title="Token Naming (Non-Negotiable)">
      <summary>
        CSS custom properties MUST start with `--sando-` and use kebab-case. Token paths follow the three-layer architecture (Ingredients → Flavors → Recipes).
      </summary>

      <css_naming_formula>--sando-{category}-{property}-{variant?}-{state?}</css_naming_formula>

      <pattern lang="css">
        /* ✅ CORRECT: Token naming at each layer */

        /* Layer 1: Ingredients (primitives) */
        --sando-color-orange-700: hsl(25, 95%, 53%);
        --sando-space-4: 1rem;

        /* Layer 2: Flavors (semantic) */
        --sando-color-background-base: var(--sando-color-neutral-100);
        --sando-color-action-solid-background-default: var(--sando-color-orange-700);

        /* Layer 3: Recipes (component-specific) */
        --sando-button-solid-backgroundColor-default: var(
          --sando-color-action-solid-background-default
        );
        --sando-button-solid-backgroundColor-hover: var(
          --sando-color-action-solid-background-hover
        );
      </pattern>

      <anti_pattern lang="css">
        /* ❌ WRONG: Missing --sando- prefix */
        --button-color: #f97415;

        /* ❌ WRONG: Using camelCase or snake_case */
        --sando-buttonColor: #f97415;
        --sando-button_color: #f97415;
      </anti_pattern>

      <why>
        The `--sando-` prefix creates a namespace preventing conflicts with other libraries. Kebab-case is the CSS standard for custom properties. The hierarchical structure makes tokens self-documenting.
      </why>

      <reference type="guideline" doc_id="TA" file="../01-design-system/TOKEN_ARCHITECTURE.md">
        Three-layer token system architecture
      </reference>
    </rule>

    <rule id="NC-CR-R4" title="Variable Naming (TypeScript/JavaScript)">
      <summary>
        Variables and properties use camelCase. Types and classes use PascalCase. Constants use UPPER_SNAKE_CASE.
      </summary>

      <pattern lang="typescript">
        // ✅ CORRECT: Variable naming

        // camelCase for variables, properties, functions
        const isDisabled = true;
        const buttonVariant = 'solid';
        function handleClick(event: MouseEvent) {}

        // PascalCase for classes, types, interfaces
        class SandoButton extends LitElement {}
        type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';
        interface SandoButtonProps {
          variant?: ButtonVariant;
        }

        // UPPER_SNAKE_CASE for constants
        const MAX_RETRIES = 3;
        const DEFAULT_VARIANT = 'solid';

        // Boolean properties: descriptive prefixes
        const isLoading = true;
        const hasError = false;
        const disabled = true;  // Short form acceptable for common props

        // Event handlers: handle* prefix
        private handleClick(e: MouseEvent) {}
      </pattern>

      <anti_pattern lang="typescript">
        // ❌ WRONG: Inconsistent casing
        const ButtonVariant = "solid"; // Should be camelCase
        const button_size = "medium"; // Should be camelCase

        // ❌ WRONG: Type naming
        type buttonVariant = "solid"; // Should be PascalCase

        // ❌ WRONG: Unclear boolean naming
        const loading = true; // Better: isLoading
        const error = false; // Better: hasError
      </anti_pattern>

      <why>
        Consistent casing conventions improve code readability, prevent naming collisions, follow TypeScript/JavaScript community standards, and enable better IDE autocomplete.
      </why>
    </rule>

    <rule id="NC-CR-R5" title="Export Naming (Modules)">
      <summary>
        Use named exports (not default exports). Export types separately with the `type` keyword. Use barrel exports via `index.ts`.
      </summary>

      <pattern lang="typescript">
        // ✅ CORRECT: Named exports (from sando-button.ts)
        @customElement("sando-button")
        export class SandoButton extends FlavorableMixin(LitElement) {
          // Component implementation
        }

        // ✅ CORRECT: Type exports (from sando-button.types.ts)
        export type ButtonVariant = "solid" | "outline" | "ghost" | "text";
        export interface SandoButtonProps {
          variant?: ButtonVariant;
        }

        // ✅ CORRECT: Barrel export (from index.ts)
        export { SandoButton } from "./sando-button.js";
        export type { ButtonVariant, SandoButtonProps } from "./sando-button.types.js";
      </pattern>

      <anti_pattern lang="typescript">
        // ❌ WRONG: Default exports
        export default class SandoButton extends LitElement {}

        // ❌ WRONG: Not using type keyword for type-only exports
        export { ButtonVariant }; // Should be: export type { ButtonVariant }
      </anti_pattern>

      <why>
        Named exports provide better IDE autocomplete, clearer import statements, easier refactoring, and better tree-shaking. The `type` keyword enables TypeScript to strip type imports at compile time.
      </why>
    </rule>

</core_rules>

<component_naming id="NC-CN">

    <tag_and_class_names>
      <format>sando-{component-name} → Sando{ComponentName}</format>

      <examples>
        <example tag="sando-button" class="SandoButton">Single word component</example>
        <example tag="sando-card" class="SandoCard">Single word component</example>
        <example tag="sando-text-field" class="SandoTextField">Multi-word component</example>
        <example tag="sando-date-picker" class="SandoDatePicker">Multi-word component</example>
      </examples>

      <rules>
        <rule>All lowercase for tag name</rule>
        <rule>Use hyphens for multi-word names</rule>
        <rule>Class name mirrors tag name in PascalCase</rule>
        <rule>Prefix both tag and class with `sando`/`Sando`</rule>
      </rules>
    </tag_and_class_names>

    <global_type_declarations>
      <pattern lang="typescript">
        declare global {
          interface HTMLElementTagNameMap {
            "sando-button": SandoButton;
          }
        }
      </pattern>

      <why>Enables TypeScript autocomplete for HTML elements and `document.querySelector()`</why>
    </global_type_declarations>

</component_naming>

<token_naming_reference id="NC-TNR">

    <three_layer_formula>
      <layer name="Ingredients (Primitives)" format="--sando-{category}-{scale}">
        <example>--sando-color-orange-700</example>
      </layer>

      <layer name="Flavors (Semantic)" format="--sando-{context}-{property}-{variant?}">
        <example>--sando-color-background-base</example>
      </layer>

      <layer name="Recipes (Component)" format="--sando-{component}-{variant}-{property}-{state?}">
        <example>--sando-button-solid-backgroundColor-default</example>
      </layer>
    </three_layer_formula>

    <json_naming>
      <note>JSON keys use camelCase (converted to kebab-case in CSS output)</note>

      <pattern lang="json">
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

      <transform>color.action.solid.background.default → --sando-color-action-solid-background-default</transform>
    </json_naming>

    <reference type="guideline" doc_id="TA" file="../01-design-system/TOKEN_ARCHITECTURE.md">
      Complete architecture details
    </reference>

</token_naming_reference>

<typescript_conventions id="NC-TSC">

    <type_suffix_patterns>
      <pattern name="{Component}Props" example="SandoButtonProps">Component props interface</pattern>
      <pattern name="{Component}{Property}" example="ButtonVariant">Variant unions</pattern>
      <pattern name="{Component}{Event}Detail" example="ButtonClickEventDetail">Event detail interfaces</pattern>
      <pattern name="{Component}{Event}Event" example="ButtonClickEvent">Custom event types</pattern>
    </type_suffix_patterns>

    <types_vs_interfaces>
      <use_type>Union types / primitives</use_type>
      <use_interface>Object shapes</use_interface>

      <pattern lang="typescript">
        // ✅ CORRECT: Type for union types
        export type ButtonVariant = "solid" | "outline" | "ghost" | "text";

        // ✅ CORRECT: Interface for object shapes
        export interface SandoButtonProps {
          variant?: ButtonVariant;
          size?: ButtonSize;
        }
      </pattern>
    </types_vs_interfaces>

    <avoid_enums>
      <pattern lang="typescript">
        // ✅ CORRECT: Union types (preferred)
        export type ButtonVariant = "solid" | "outline" | "ghost" | "text";

        // ❌ WRONG: Enums (avoid)
        export enum ButtonVariant {
          Solid = "solid",
          Outline = "outline",
        }
      </pattern>

      <why>
        Union types are simpler, don't require imports for type checking, tree-shake better, and work seamlessly with string values in HTML attributes.
      </why>
    </avoid_enums>

</typescript_conventions>

<file_naming_table id="NC-FNT">

    <file_suffixes>
      <suffix name=".ts" example="sando-button.ts">Component implementation</suffix>
      <suffix name=".types.ts" example="sando-button.types.ts">Type definitions</suffix>
      <suffix name=".stories.ts" example="sando-button.stories.ts">Storybook documentation</suffix>
      <suffix name=".test.ts" example="sando-button.test.ts">Unit tests (Vitest)</suffix>
      <suffix name=".spec.ts" example="sando-button.spec.ts">E2E tests (Playwright)</suffix>
      <suffix name=".a11y.test.ts" example="sando-button.a11y.test.ts">Accessibility tests</suffix>
      <suffix name=".styles.ts" example="base.styles.ts">Style files</suffix>
      <suffix name="index.ts" example="index.ts">Barrel export</suffix>
    </file_suffixes>

    <style_file_naming>
      <structure>
        styles/
        ├── base.styles.ts               # Base styles (reset, layout)
        ├── variant.styles.ts            # Variant-specific (solid, outline)
        ├── size.styles.ts               # Size variants (xs, small, medium)
        └── index.ts                     # Barrel export
      </structure>

      <convention>{purpose}.styles.ts with descriptive purpose names</convention>
    </style_file_naming>

    <reference type="guideline" doc_id="CA" file="../02-architecture/COMPONENT_ARCHITECTURE.md">
      Complete component folder structure
    </reference>

</file_naming_table>

<variable_function_naming id="NC-VFN">

    <booleans lang="typescript">
      // ✅ CORRECT: Clear boolean naming
      const isLoading = true;
      const hasError = false;
      const canSubmit = true;

      // ✅ CORRECT: Common short forms (acceptable for component props)
      const disabled = false; // Common prop, clear meaning
      const loading = true; // Common prop, clear meaning
    </booleans>

    <event_handlers lang="typescript">
      // ✅ CORRECT: Event handler naming
      private handleClick(e: MouseEvent) {}
      private handleChange(e: Event) {}

      // Callback props use on* prefix
      interface Props {
        onClick?: (e: MouseEvent) => void;
        onChange?: (value: string) => void;
      }
    </event_handlers>

    <constants lang="typescript">
      // ✅ CORRECT: True constants
      const MAX_RETRIES = 3;
      const DEFAULT_VARIANT = "solid";

      // ✅ CORRECT: camelCase for computed/configuration values
      const defaultConfig = { timeout: 5000 };
    </constants>

</variable_function_naming>

<related_guidelines id="NC-RG">
<reference
      type="guideline"
      doc_id="TA"
      file="../01-design-system/TOKEN_ARCHITECTURE.md"
      category="01-design-system">
Token naming structure and three-layer system
</reference>

    <reference
      type="guideline"
      doc_id="CA"
      file="../02-architecture/COMPONENT_ARCHITECTURE.md"
      category="02-architecture">
      Component file structure and organization
    </reference>

    <reference
      type="guideline"
      doc_id="CST"
      file="CODE_STYLE.md"
      category="03-development">
      Code formatting and import organization
    </reference>

    <reference
      type="guideline"
      doc_id="TST"
      file="TESTING_STRATEGY.md"
      category="03-development">
      Test file naming and organization
    </reference>

</related_guidelines>

<external_references id="NC-ER">
<reference
      type="specification"
      url="https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name"
      title="Custom Elements Spec">
Tag name requirements
</reference>

    <reference
      type="specification"
      url="https://www.w3.org/TR/css-variables-1/"
      title="CSS Custom Properties">
      CSS variable naming standards
    </reference>

    <reference
      type="tool"
      url="https://typescript-eslint.io/rules/naming-convention/"
      title="TypeScript Naming Conventions">
      ESLint naming rules
    </reference>

</external_references>

  <changelog id="NC-CL">
    <version number="2.0.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="BREAKING">Reduced from 858 to ~509 lines (41% reduction)</change>
      <change type="IMPROVED">Removed verbose examples (referenced TOKEN_ARCHITECTURE.md)</change>
      <change type="IMPROVED">Consolidated TypeScript conventions into tables</change>
      <change type="IMPROVED">Streamlined validation checklist</change>
    </version>

    <version number="1.0.0" date="2025-11-03" status="Active">
      <change type="INITIAL">Initial NAMING_CONVENTIONS.md guideline created</change>
      <change type="NEW">5 Core Rules: Component, file, token, variable, export naming</change>
    </version>

  </changelog>

  <conclusion>
    Consistent naming is the foundation of a maintainable design system. These conventions ensure clarity, prevent conflicts, enable automated tooling, and create a cohesive developer experience across all Sando Design System code.
  </conclusion>

</guideline>
