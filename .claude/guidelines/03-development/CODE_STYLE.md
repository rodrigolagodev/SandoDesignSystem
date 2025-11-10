<guideline doc_id="CST" category="03-development" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Frontend Developer">

  <purpose id="CST-PU">
    Define code formatting, naming, and organization standards for TypeScript, Lit components, and related files to ensure consistency, readability, and maintainability across the Sando Design System codebase.
  </purpose>

<core_rules id="CST-CR">

    <rule id="CST-CR-R1" title="TypeScript Strict Mode (Non-Negotiable)">
      <summary>
        ALL TypeScript code MUST have strict mode enabled with comprehensive linting checks.
      </summary>

      <pattern lang="typescript">
        // ✅ CORRECT: tsconfig.json with strict mode
        {
          "compilerOptions": {
            "strict": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "noFallthroughCasesInSwitch": true
          }
        }

        // Code example with proper typing
        export class SandoButton extends LitElement {
          @property({ type: String, reflect: true })
          variant: ButtonVariant = 'solid'; // Explicit type from union type

          private handleClick(e: MouseEvent): void {
            // Fully typed parameters and return
          }
        }
      </pattern>

      <anti_pattern lang="typescript">
        // ❌ WRONG: Disabling strict mode
        {
          "compilerOptions": {
            "strict": false, // Never do this
            "noImplicitAny": false // Never do this
          }
        }

        // ❌ WRONG: Implicit any types
        export class BadComponent extends LitElement {
          @property()
          data; // No type annotation

          private handleClick(e) { // No parameter type
            // Implicit any
          }
        }
      </anti_pattern>

      <why>
        Strict mode catches bugs at compile time, provides better IDE autocomplete, prevents runtime errors, and serves as living documentation. The small upfront cost of typing saves hours of debugging.
      </why>

      <reference type="config" path="packages/components/tsconfig.json">
        Exact TypeScript configuration
      </reference>
    </rule>

    <rule id="CST-CR-R2" title="Import Organization (Non-Negotiable)">
      <summary>
        Imports MUST be organized in 5 groups with a blank line between each group: external packages, Lit framework, component types, internal modules, and styles.
      </summary>

      <pattern lang="typescript">
        // ✅ CORRECT: Organized imports from sando-button.ts
        // Group 1: External packages (alphabetical)
        import { LitElement, html } from "lit";
        import { customElement, property } from "lit/decorators.js";
        import { classMap } from "lit/directives/class-map.js";

        // Group 2: Types (relative imports)
        import type {
          ButtonVariant,
          ButtonSize,
          ButtonStatus,
          ButtonRadius,
        } from "./sando-button.types.js";

        // Group 3: Internal modules (mixins, utilities)
        import { FlavorableMixin } from "../../mixins/index.js";

        // Group 4: Styles (always last)
        import { tokenStyles } from "../../styles/tokens.css.js";
        import {
          baseStyles,
          variantStyles,
          sizeStyles,
          radiusStyles,
          statusStyles,
          stateStyles,
        } from "./styles/index.js";
      </pattern>

      <anti_pattern lang="typescript">
        // ❌ WRONG: Random import order
        import { baseStyles } from "./styles/index.js";
        import type { ButtonVariant } from "./sando-button.types.js";
        import { LitElement } from "lit";
        import { FlavorableMixin } from "../../mixins/index.js";
        import { property } from "lit/decorators.js";
        // No organization, hard to scan
      </anti_pattern>

      <why>
        Consistent import order makes code reviews easier, reduces merge conflicts in import blocks, and helps identify missing dependencies quickly. The pattern matches ESLint's automatic sorting.
      </why>

      <automation>ESLint with `eslint-plugin-import` (or prettier-plugin-organize-imports) can auto-sort imports</automation>
    </rule>

    <rule id="CST-CR-R3" title="File Naming Conventions (Non-Negotiable)">
      <summary>
        File names MUST use kebab-case with specific suffixes indicating file purpose.
      </summary>

      <pattern lang="text">
        ✅ CORRECT: Component file structure
        packages/components/src/components/button/
        ├── sando-button.ts              # Component implementation
        ├── sando-button.types.ts        # Type definitions
        ├── sando-button.stories.ts      # Storybook documentation
        ├── sando-button.test.ts         # Unit tests (Vitest)
        ├── sando-button.spec.ts         # E2E tests (Playwright)
        ├── sando-button.a11y.test.ts    # Accessibility tests (axe-core)
        └── index.ts                     # Barrel export
      </pattern>

      <why>
        Kebab-case works across all operating systems (case-insensitive Windows vs case-sensitive Linux), matches Web Component tag names (`sando-button`), and prevents filename collisions. Suffixes clearly indicate file purpose without opening the file.
      </why>
    </rule>

    <rule id="CST-CR-R4" title="JSDoc Documentation (Required for Public APIs)">
      <summary>
        ALL public component properties, methods, slots, CSS custom properties, and events MUST have JSDoc comments.
      </summary>

      <pattern lang="typescript">
        // ✅ CORRECT: Comprehensive JSDoc (from sando-button.ts)
        /**
         * Sando Button Component
         *
         * A fully accessible button component built with Lit following industry standards.
         * Supports multiple variants, sizes, states, and can render as button or link.
         *
         * @element sando-button
         *
         * @slot - Button content (text, icons, etc.)
         * @slot icon-start - Icon before the button text
         * @slot icon-end - Icon after the button text
         *
         * @fires click - Fired when the button is clicked (unless disabled)
         *
         * @cssprop --sando-button-fontFamily - Button font family
         * @cssprop --sando-button-borderRadius - Button border radius
         *
         * @example Basic usage
         * <sando-button variant="solid">Click Me</sando-button>
         *
         * @example As link
         * <sando-button href="https://example.com">Visit</sando-button>
         */
        @customElement("sando-button")
        export class SandoButton extends FlavorableMixin(LitElement) {
          /**
           * Visual style variant of the button
           * @default 'solid'
           */
          @property({ reflect: true })
          variant: ButtonVariant = "solid";
        }
      </pattern>

      <why>
        JSDoc generates automatic API documentation, provides inline help in IDEs, documents examples for users, and serves as design documentation. Custom element analyzer tools extract JSDoc to generate reference docs automatically.
      </why>

      <reference type="source_file" path="packages/components/src/components/button/sando-button.ts" lines="1-61">
        Comprehensive JSDoc examples
      </reference>
    </rule>

    <rule id="CST-CR-R5" title="Code Formatting Standards">
      <summary>
        Code MUST be formatted with Prettier using the project configuration. NO manual formatting deviations allowed.
      </summary>

      <why>
        Automated formatting eliminates bikeshedding, ensures git diffs show real changes (not formatting), prevents PR comments about style, and integrates with pre-commit hooks. Prettier is non-negotiable.
      </why>

      <prettier_config path="packages/components/.prettierrc.json">
        Single quotes, 2-space indent, 100-char line width, no trailing commas
      </prettier_config>

      <commands>
        <command>pnpm format</command>
        <command>pnpm format:check</command>
      </commands>
    </rule>

</core_rules>

<configuration_files id="CST-CF">

    <typescript file="tsconfig.json">
      <critical_settings>
        <setting>"strict": true - Enables all strict type checks</setting>
        <setting>"experimentalDecorators": true - Required for Lit @decorators</setting>
        <setting>"useDefineForClassFields": false - Required for Lit compatibility</setting>
      </critical_settings>

      <reference type="config" path="packages/components/tsconfig.json">
        Exact configuration
      </reference>
    </typescript>

    <eslint file=".eslintrc.cjs">
      <plugins>
        <plugin>@typescript-eslint/recommended</plugin>
        <plugin>plugin:wc/recommended</plugin>
        <plugin>plugin:lit/recommended</plugin>
      </plugins>

      <key_rules>
        <rule>@typescript-eslint/no-unused-vars - Error on unused variables (prefix with `_` to bypass)</rule>
        <rule>wc/no-closed-shadow-root - Never create closed shadow roots</rule>
        <rule>lit/no-invalid-html - Validates HTML in templates</rule>
      </key_rules>

      <commands>
        <command>pnpm lint</command>
        <command>pnpm lint --fix</command>
      </commands>

      <reference type="config" path="packages/components/.eslintrc.cjs">
        Exact rules
      </reference>
    </eslint>

    <prettier file=".prettierrc.json">
      <settings>Single quotes, 2-space indent, 100-char line width, no trailing commas</settings>

      <commands>
        <command>pnpm format</command>
        <command>pnpm format:check</command>
      </commands>

      <reference type="config" path="packages/components/.prettierrc.json">
        Exact settings
      </reference>
    </prettier>

</configuration_files>

<component_code_organization id="CST-CCO">

    <property_declaration_order>
      <order>
        <section number="1">Static properties (styles, etc.)</section>
        <section number="2">Public properties (@property with reflect)</section>
        <section number="3">Public boolean properties</section>
        <section number="4">Private/protected properties</section>
        <section number="5">Lifecycle methods (constructor, connectedCallback, etc.)</section>
        <section number="6">Private methods (prefixed with _)</section>
        <section number="7">Render method (always last)</section>
      </order>

      <example lang="typescript">
        @customElement("sando-button")
        export class SandoButton extends FlavorableMixin(LitElement) {
          // 1. Static properties (styles, etc.)
          static styles = [tokenStyles, baseStyles];

          // 2. Public properties (@property with reflect)
          @property({ reflect: true })
          variant: ButtonVariant = "solid";

          // 3. Public boolean properties
          @property({ type: Boolean, reflect: true })
          disabled = false;

          // 4. Private/protected properties
          private _internalState: boolean = false;

          // 5. Lifecycle methods
          connectedCallback() {
            super.connectedCallback();
          }

          // 6. Private methods
          private handleClick(e: MouseEvent) {}

          // 7. Render method (always last)
          render() {
            return html`...`;
          }
        }
      </example>

      <why>
        Static members → Public API → Internal state → Lifecycle → Helpers → Render. This pattern makes the public API immediately visible when opening a file.
      </why>
    </property_declaration_order>

</component_code_organization>

<variable_naming id="CST-VN">

    <conventions lang="typescript">
      // ✅ CORRECT: camelCase for variables, functions, methods
      const isDisabled = true;
      function handleClick() {}

      // ✅ CORRECT: PascalCase for classes, interfaces, types
      class SandoButton extends LitElement {}
      type ButtonVariant = 'solid' | 'outline';

      // ✅ CORRECT: UPPER_CASE for constants
      const MAX_RETRIES = 3;

      // ✅ CORRECT: Prefix unused params with underscore
      protected updated(_changedProperties: Map<string, unknown>) {}
    </conventions>

    <reference type="guideline" doc_id="NC" file="NAMING_CONVENTIONS.md">
      Comprehensive naming standards
    </reference>

</variable_naming>

<file_structure id="CST-FS">

    <monolithic_pattern>
      <structure>
        sando-button/
        ├── sando-button.ts              # Main component (200-400 lines typical)
        ├── sando-button.types.ts        # Type definitions (50-150 lines)
        ├── sando-button.stories.ts      # Storybook stories
        ├── sando-button.test.ts         # Unit tests (Vitest)
        ├── sando-button.spec.ts         # E2E tests (Playwright)
        ├── sando-button.a11y.test.ts    # Accessibility tests
        └── index.ts                     # Barrel export
      </structure>

      <barrel_export lang="typescript">
        // ✅ CORRECT: Clean barrel export
        export { SandoButton } from "./sando-button.js";
        export type {
          ButtonVariant,
          ButtonSize,
          ButtonStatus,
          ButtonRadius,
          SandoButtonProps,
        } from "./sando-button.types.js";
      </barrel_export>

      <why>
        All component files live together, making them easy to find, maintain, and understand. No hunting across multiple folders.
      </why>
    </monolithic_pattern>

    <reference type="guideline" doc_id="CA" file="../02-architecture/COMPONENT_ARCHITECTURE.md">
      Complete architecture details
    </reference>

</file_structure>

<code_comments id="CST-CC">

    <principle>Explain WHY, not WHAT - Code should be self-documenting for the "what"</principle>

    <good_examples lang="typescript">
      // ✅ CORRECT: Document reasoning
      // Disable Shadow DOM for legacy integration (remove in v3.0)
      protected createRenderRoot() { return this; }
    </good_examples>

    <bad_examples lang="typescript">
      // ❌ WRONG: Obvious comments
      // Set variant to solid
      this.variant = 'solid';

      // ❌ WRONG: Commented-out code (use git history)
      // const oldImplementation = () => { ... };
    </bad_examples>

    <jsdoc_vs_inline>
      <use_jsdoc>Public APIs (/** */)</use_jsdoc>
      <use_inline>Implementation details (//)</use_inline>
    </jsdoc_vs_inline>

</code_comments>

<token_consumption id="CST-TC">

    <pattern lang="typescript">
      // ✅ CORRECT: Import from Recipes layer (component-specific tokens)
      import { css } from "lit";

      export class SandoButton extends LitElement {
        static styles = css`
          .button {
            /* Use Recipe tokens for component styles */
            background: var(--sando-button-solid-backgroundColor-default);
            color: var(--sando-button-solid-textColor-default);
            padding: var(--sando-button-medium-padding);

            /* Automatic theming via Flavors layer */
            border-radius: var(--sando-button-borderRadius-default);
          }

          .button:hover {
            background: var(--sando-button-solid-backgroundColor-hover);
          }
        `;
      }
    </pattern>

    <anti_patterns lang="typescript">
      // ❌ WRONG: Hardcoded values (breaks theming)
      static styles = css`
        .button {
          background: #f97415;  // Never hardcode colors
          padding: 12px 24px;   // Never hardcode spacing
        }
      `;

      // ❌ WRONG: Using Ingredient tokens directly (breaks abstraction)
      static styles = css`
        .button {
          background: var(--sando-color-orange-700);  // Should use Recipe token
          padding: var(--sando-space-3);              // Should use Recipe token
        }
      `;
    </anti_patterns>

    <why>
      Components consume Recipe tokens, Recipe tokens reference Flavors, Flavors reference Ingredients. This three-layer architecture enables theming without component changes.
    </why>

    <reference type="guideline" doc_id="TA" file="../01-design-system/TOKEN_ARCHITECTURE.md">
      Token consumption patterns
    </reference>

</token_consumption>

  <validation id="CST-V">

    <typescript>
      <item status="required">`strict: true` enabled in tsconfig.json</item>
      <item status="required">No `any` types (use `unknown` or specific types)</item>
      <item status="required">All public APIs have explicit return types</item>
      <item status="required">All function parameters have type annotations</item>
      <item status="required">`experimentalDecorators: true` for Lit components</item>
    </typescript>

    <code_formatting>
      <item status="required">Prettier configured and running on save</item>
      <item status="required">ESLint passes with no errors or warnings</item>
      <item status="required">Imports organized in 5 groups (external, Lit, types, internal, styles)</item>
      <item status="required">Line length ≤ 100 characters (Prettier enforces)</item>
      <item status="required">Single quotes for strings (Prettier enforces)</item>
    </code_formatting>

    <file_naming>
      <item status="required">All files use kebab-case</item>
      <item status="required">Component files prefixed with `sando-`</item>
      <item status="required">Test files use correct suffixes (`.test.ts`, `.spec.ts`, `.a11y.test.ts`)</item>
      <item status="required">Type files use `.types.ts` suffix</item>
      <item status="required">Story files use `.stories.ts` suffix</item>
    </file_naming>

    <documentation>
      <item status="required">Component class has comprehensive JSDoc with @element, @slot, @fires, @cssprop tags</item>
      <item status="required">All public @property decorators have JSDoc with @default</item>
      <item status="required">Complex logic has inline comments explaining WHY</item>
      <item status="required">External references documented with links</item>
    </documentation>

    <component_structure>
      <item status="required">Static styles array declared first</item>
      <item status="required">Public properties before private properties</item>
      <item status="required">Lifecycle methods before helper methods</item>
      <item status="required">render() method last</item>
      <item status="optional">Private methods prefixed with underscore</item>
    </component_structure>

    <token_usage>
      <item status="required">No hardcoded colors, spacing, or typography values</item>
      <item status="required">Components use Recipe tokens (not Flavors or Ingredients)</item>
      <item status="required">CSS custom properties follow `--sando-*` naming</item>
      <item status="required">Styles reference tokens via `var(--sando-*)`</item>
    </token_usage>

  </validation>

<related_guidelines id="CST-RG">
<reference
      type="guideline"
      doc_id="CA"
      file="../02-architecture/COMPONENT_ARCHITECTURE.md"
      category="02-architecture">
Component file structure and patterns
</reference>

    <reference
      type="guideline"
      doc_id="TA"
      file="../01-design-system/TOKEN_ARCHITECTURE.md"
      category="01-design-system">
      Token consumption patterns
    </reference>

    <reference
      type="guideline"
      doc_id="NC"
      file="NAMING_CONVENTIONS.md"
      category="03-development">
      Comprehensive naming standards
    </reference>

    <reference
      type="guideline"
      doc_id="TST"
      file="TESTING_STRATEGY.md"
      category="03-development">
      Test file organization
    </reference>

</related_guidelines>

<external_references id="CST-ER">
<reference
      type="documentation"
      url="https://www.typescriptlang.org/tsconfig#strict"
      title="TypeScript Strict Mode">
Official documentation
</reference>

    <reference
      type="documentation"
      url="https://lit.dev/docs/components/properties/"
      title="Lit Style Guide">
      Lit best practices
    </reference>

    <reference
      type="documentation"
      url="https://eslint.org/docs/latest/rules/"
      title="ESLint Rules">
      ESLint documentation
    </reference>

    <reference
      type="documentation"
      url="https://prettier.io/docs/en/options.html"
      title="Prettier Options">
      Prettier configuration
    </reference>

    <reference
      type="documentation"
      url="https://jsdoc.app/"
      title="JSDoc Reference">
      JSDoc tag documentation
    </reference>

    <reference
      type="guide"
      url="https://web.dev/custom-elements-best-practices/"
      title="Custom Element Best Practices">
      Web Components patterns
    </reference>

</external_references>

<tooling_support id="CST-TS">

    <vscode_extensions>Prettier, ESLint, Lit Plugin recommended</vscode_extensions>

    <pre_commit_hooks>`pnpm lint-staged` runs on staged files</pre_commit_hooks>

    <scripts location="packages/components/">
      <command>pnpm lint              # ESLint check</command>
      <command>pnpm lint --fix        # Auto-fix</command>
      <command>pnpm format            # Prettier format</command>
      <command>pnpm typecheck         # TypeScript check</command>
    </scripts>

</tooling_support>

  <changelog id="CST-CL">
    <version number="1.0.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="INITIAL">Initial CODE_STYLE.md guideline created</change>
      <change type="NEW">TypeScript strict mode configuration</change>
      <change type="NEW">5 Core Rules: Strict mode, import organization, file naming, JSDoc, Prettier</change>
      <change type="NEW">ESLint configuration and key rules</change>
      <change type="NEW">Component code organization patterns</change>
      <change type="NEW">Token consumption patterns</change>
      <change type="NEW">Validation checklist</change>
    </version>
  </changelog>

  <conclusion>
    These code style standards ensure consistency and quality across the Sando Design System. Follow them precisely, use automated tooling to enforce them, and maintain them as the single source of truth for code formatting decisions.
  </conclusion>

</guideline>
