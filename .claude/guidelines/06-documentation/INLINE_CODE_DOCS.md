<guideline doc_id="ICD" category="06-documentation" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Frontend Developer">

  <purpose id="ICD-PU">
    Establish comprehensive standards for inline code documentation (JSDoc comments, TypeScript type annotations, and helpful comments) across the Sando Design System codebase. This ensures code is self-documenting, maintainable, and provides excellent IDE IntelliSense support for developers.
  </purpose>

  <targets id="ICD-TGT">
    <target>All TypeScript files, JavaScript build scripts, mixins, utilities</target>
  </targets>

  <scope id="ICD-SC">
    JSDoc comments, type annotations, inline comments, code examples
  </scope>

  <enforcement id="ICD-ENF">
    Code review, ESLint JSDoc rules
  </enforcement>

<core_rules id="ICD-CR">
<rule id="ICD-CR-R1" title="JSDoc for All Public APIs (Non-Negotiable)">

<summary>
Every exported function, class, method, and property MUST have a JSDoc comment with description, parameter types, and return types.
</summary>

      <pattern lang="typescript" title="JSDoc public API pattern">
        /**
         * Brief one-line description of what this does.
         *
         * Extended description with more details if needed.
         * Multiple paragraphs are allowed for complex functionality.
         *
         * @param paramName - Description of parameter
         * @param optionalParam - Description of optional parameter
         * @returns Description of return value
         * @throws ErrorType - When this error occurs
         * @example
         * ```typescript
         * const result = functionName('value');
         * console.log(result); // Output: expected value
         * ```
         */
        export function functionName(
          paramName: string,
          optionalParam?: boolean,
        ): ReturnType {
          // Implementation
        }
      </pattern>

      <real_example lang="typescript" title="From flavorable.ts">
        /**
         * Flavorable Mixin
         *
         * Adds flavor property with automatic inheritance from ancestor elements.
         * Components can override the inherited flavor by setting an explicit flavor attribute.
         *
         * **Inheritance Rules:**
         * 1. Explicit `flavor` attribute on component (highest priority)
         * 2. Inherited `flavor` from nearest ancestor with `[flavor]` attribute
         * 3. Default `'original'` flavor (fallback)
         *
         * @param Base - Base class (usually LitElement or subclass)
         * @returns Class with Flavorable functionality
         */
        export const FlavorableMixin = <T extends Constructor<LitElement>>(Base: T) => {
          // Implementation
        };
      </real_example>

      <why>
        JSDoc serves as the contract between code author and consumers. IDEs show this documentation on hover. Documentation generators extract it automatically.
      </why>

      <reference type="source_file" path="flavorable.ts" lines="64-76">
        Flavorable mixin JSDoc
      </reference>
      <reference type="source_file" path="sando-button.ts" lines="1-61">
        Button component JSDoc
      </reference>
    </rule>

    <rule id="ICD-CR-R2" title="Property JSDoc with @default and @example (Required)">
      <summary>
        Every class property MUST have JSDoc with description, @default tag (if applicable), and @example for non-trivial properties.
      </summary>

      <pattern lang="typescript" title="Property JSDoc patterns">
        /**
         * Description of what this property controls or represents.
         *
         * Additional context about behavior, constraints, or side effects.
         *
         * @default 'defaultValue'
         * @example
         * ```typescript
         * component.propertyName = 'newValue';
         * ```
         */
        @property({ reflect: true })
        propertyName: PropertyType = 'defaultValue';

        /**
         * Boolean property description.
         * @default false
         */
        @property({ type: Boolean })
        booleanProperty = false;

        /**
         * Optional property (no default).
         */
        @property()
        optionalProperty?: string;
      </pattern>

      <real_example lang="typescript" title="From flavorable.ts">
        /**
         * Design system flavor/theme
         *
         * If not explicitly set, will inherit from nearest ancestor with `[flavor]` attribute.
         * Falls back to 'original' if no ancestor flavor is found.
         *
         * @default 'original'
         * @example
         * ```html
         * <!-- Explicit flavor -->
         * <sando-button flavor="strawberry">Strawberry</sando-button>
         *
         * <!-- Inherited flavor -->
         * <div flavor="dark">
         *   <sando-button>Inherits dark</sando-button>
         * </div>
         * ```
         */
        @property({ reflect: true })
        flavor = 'original';
      </real_example>

      <why>
        Property documentation helps users understand how to configure components. @default shows the fallback value. @example demonstrates typical usage.
      </why>

      <reference type="source_file" path="flavorable.ts" lines="79-98">
        Flavor property JSDoc
      </reference>
      <reference type="source_file" path="sando-button.ts" lines="80-200">
        Button properties JSDoc
      </reference>
    </rule>

    <rule id="ICD-CR-R3" title="Private/Internal Documentation with @private (Required)">
      <summary>
        Private methods and internal properties MUST have JSDoc with @private tag and brief description explaining purpose.
      </summary>

      <pattern lang="typescript" title="Private API documentation">
        /**
         * Internal: Brief description of what this private method does.
         *
         * Explain implementation details that aren't relevant to public API
         * but help maintainers understand the code.
         *
         * @private
         * @param param - Parameter description
         * @returns Return value description
         */
        private _privateMethod(param: string): ReturnType {
          // Implementation
        }

        /**
         * Internal: Description of private property.
         * @private
         */
        private _internalState: StateType;
      </pattern>

      <real_example lang="typescript" title="From flavorable.ts">
        /**
         * Internal: Inherited flavor from ancestor element
         * @private
         */
        private _inheritedFlavor?: string;

        /**
         * Internal: Whether flavor was explicitly set by user
         * @private
         */
        private _hasExplicitFlavor = false;

        /**
         * Setup flavor inheritance from ancestor elements
         *
         * Walks up the DOM tree to find the nearest ancestor with a `[flavor]` attribute.
         * If found, stores the inherited flavor value.
         *
         * @private
         */
        private _setupFlavorInheritance() {
          // Implementation
        }
      </real_example>

      <why>
        Private APIs still need documentation for maintainers. @private tag tells documentation generators to exclude from public API docs. "Internal:" prefix clearly marks non-public code.
      </why>

      <reference type="source_file" path="flavorable.ts" lines="101-186">
        Private methods and properties
      </reference>
    </rule>

    <rule id="ICD-CR-R4" title="Lifecycle Method Documentation (Required)">
      <summary>
        Lifecycle methods MUST have JSDoc explaining when they're called and what they do, following standard patterns.
      </summary>

      <pattern lang="typescript" title="Lifecycle method documentation">
        /**
         * Lifecycle: Called when element is added to DOM
         *
         * Additional setup or initialization logic explanation.
         */
        override connectedCallback() {
          super.connectedCallback();
          // Setup code
        }

        /**
         * Lifecycle: Called when element is removed from DOM
         *
         * Cleanup logic explanation.
         */
        override disconnectedCallback() {
          super.disconnectedCallback();
          // Cleanup code
        }

        /**
         * Lifecycle: Called when properties change
         *
         * Explain which property changes trigger what behavior.
         */
        override updated(changedProperties: PropertyValues) {
          super.updated(changedProperties);
          // Update logic
        }

        /**
         * Lifecycle: Called before first update
         *
         * One-time initialization logic explanation.
         */
        override willUpdate(changedProperties: PropertyValues) {
          super.willUpdate(changedProperties);
          // Pre-update logic
        }
      </pattern>

      <real_example lang="typescript" title="From flavorable.ts">
        /**
         * Lifecycle: Called when element is added to DOM
         * Sets up flavor inheritance from ancestors
         */
        override connectedCallback() {
          super.connectedCallback();
          this._setupFlavorInheritance();
        }

        /**
         * Lifecycle: Called when properties change
         * Updates explicit flags
         */
        override updated(changedProperties: PropertyValues) {
          super.updated(changedProperties);

          if (changedProperties.has('flavor')) {
            // Check if flavor was explicitly set via attribute
            this._hasExplicitFlavor = this.hasAttribute('flavor');
          }
        }
      </real_example>

      <why>
        Lifecycle methods are critical to component behavior. Standard "Lifecycle:" prefix helps identify them quickly. Clear explanation prevents confusion about execution order.
      </why>

      <reference type="source_file" path="flavorable.ts" lines="136-156">
        Lifecycle method examples
      </reference>
    </rule>

    <rule id="ICD-CR-R5" title="Complex Logic Inline Comments (Required)">
      <summary>
        Complex algorithms, workarounds, or non-obvious code MUST have inline comments explaining the "why" not just the "what".
      </summary>

      <pattern lang="typescript" title="Inline comment patterns">
        // Explain WHY this approach is used, not WHAT the code does
        // Good: "Use closure to preserve context in event handler"
        // Bad: "Create function that returns function"

        // Document workarounds with issue references
        // WORKAROUND: Safari bug with Shadow DOM focus (https://bugs.webkit.org/show_bug.cgi?id=12345)

        // Explain non-obvious algorithms
        // Binary search for performance on large datasets (O(log n) vs O(n))

        // Warn about critical behavior
        // CRITICAL: Don't modify this.flavor - it removes the attribute
      </pattern>

      <real_example lang="typescript" title="From flavorable.ts">
        if (ancestorWithFlavor) {
          const inheritedFlavor = ancestorWithFlavor.getAttribute("flavor");
          if (inheritedFlavor) {
            this._inheritedFlavor = inheritedFlavor;
            // CRITICAL FIX: Don't modify this.flavor - it removes the attribute
            // The effectiveFlavor getter will return the inherited value
            // But the DOM attribute stays empty, allowing CSS inheritance to work
            this._hasExplicitFlavor = false; // Mark as inherited, not explicit
          }
        }
      </real_example>

      <why>
        Complex code needs explanation. Future maintainers (including yourself) need to understand WHY decisions were made. Inline comments are for implementation details, JSDoc is for API contracts.
      </why>

      <reference type="source_file" path="flavorable.ts" lines="175-185">
        Critical comment example
      </reference>
    </rule>

</core_rules>

<jsdoc\*tag_reference id="ICD-JTR">
<essential_tags id="ICD-JTR-ET">
<tag name="@param">
<description>Parameter description</description>
<example lang="typescript">
/\*\*

- @param name - User's full name
  _ @param age - User's age in years
  _ @param options - Optional configuration object
  \_/
  function createUser(name: string, age: number, options?: UserOptions) {}
  </example>
  </tag>

        <tag name="@returns">
          <description>Return value description</description>
          <example lang="typescript">
            /**
             * @returns The calculated total price including tax
             */
            function calculateTotal(): number {}
          </example>
        </tag>

        <tag name="@throws">
          <description>Exceptions thrown</description>
          <example lang="typescript">
            /**
             * @throws {ValidationError} When email format is invalid
             * @throws {NetworkError} When API request fails
             */
            async function submitForm() {}
          </example>
        </tag>

        <tag name="@example">
          <description>Usage examples</description>
          <example lang="typescript">
            /**
             * @example
             * ```typescript
             * const button = new Button();
             * button.variant = 'solid';
             * ```
             */
          </example>
        </tag>

        <tag name="@default">
          <description>Default value</description>
          <example lang="typescript">
            /**
             * @default 'medium'
             */
            @property()
            size: Size = 'medium';
          </example>
        </tag>

        <tag name="@deprecated">
          <description>Deprecated API</description>
          <example lang="typescript">
            /**
             * @deprecated Use `newMethod()` instead. Will be removed in v3.0.0.
             */
            function oldMethod() {}
          </example>
        </tag>
      </essential_tags>

      <advanced_tags id="ICD-JTR-AT">
        <tag name="@private">
          <description>Private/internal API</description>
          <example lang="typescript">
            /**
             * @private
             */
            private _internalMethod() {}
          </example>
        </tag>

        <tag name="@readonly">
          <description>Read-only property</description>
          <example lang="typescript">
            /**
             * @readonly
             */
            get effectiveFlavor(): string {}
          </example>
        </tag>

        <tag name="@see">
          <description>Cross-reference</description>
          <example lang="typescript">
            /**
             * @see {@link FlavorableMixin} for inheritance details
             */
          </example>
        </tag>

        <tag name="@since">
          <description>Version introduced</description>
          <example lang="typescript">
            /**
             * @since 2.0.0
             */
            export function newFeature() {}
          </example>
        </tag>

        <tag name="@experimental">
          <description>Experimental API</description>
          <example lang="typescript">
            /**
             * @experimental This API may change in future releases
             */
            export function experimentalFeature() {}
          </example>
        </tag>
      </advanced_tags>

</jsdoc_tag_reference>

<typescript_type_annotations id="ICD-TTA">
<explicit_return_types id="ICD-TTA-ERT">

<summary>
All functions MUST have explicit return types, even if TypeScript can infer them.
</summary>

      <correct_examples lang="typescript">
        // ✅ CORRECT: Explicit return type
        function calculateTotal(price: number, tax: number): number {
          return price + tax;
        }

        // ✅ CORRECT: Explicit void
        function logMessage(message: string): void {
          console.log(message);
        }

        // ✅ CORRECT: Explicit Promise
        async function fetchData(): Promise<DataType> {
          return await api.get("/data");
        }
      </correct_examples>

      <anti_pattern lang="typescript">
        // ❌ WRONG: Inferred return type
        function calculateTotal(price: number, tax: number) {
          return price + tax;
        }
      </anti_pattern>

      <why>
        Explicit return types prevent accidental API changes, improve compiler performance, and serve as documentation.
      </why>

      <reference type="guideline" doc_id="CS" file="../03-development/CODE_STYLE.md">
        TypeScript strict mode
      </reference>
    </explicit_return_types>

    <parameter_types id="ICD-TTA-PT">
      <summary>
        All function parameters MUST have explicit types.
      </summary>

      <correct_examples lang="typescript">
        // ✅ CORRECT: All parameters typed
        function createButton(
          label: string,
          variant: ButtonVariant,
          disabled: boolean = false,
        ): HTMLElement {
          // Implementation
        }

        // ✅ CORRECT: Destructured parameters with type
        function createCard({ title, description, actions }: CardOptions): HTMLElement {
          // Implementation
        }
      </correct_examples>

      <anti_pattern lang="typescript">
        // ❌ WRONG: Implicit any
        function createButton(label, variant, disabled) {
          // Implementation
        }
      </anti_pattern>

      <why>
        TypeScript strict mode requires explicit types. Parameter types provide IntelliSense and catch errors at compile time.
      </why>
    </parameter_types>

    <type_narrowing_comments id="ICD-TTA-TNC">
      <summary>
        Use comments to explain type narrowing logic.
      </summary>

      <pattern lang="typescript">
        function processElement(element: Element | null) {
          // Type guard: Ensure element exists before accessing properties
          if (!element) {
            return;
          }

          // TypeScript now knows element is non-null
          console.log(element.tagName);

          // Type guard: Check if element is HTMLInputElement
          if (element instanceof HTMLInputElement) {
            // TypeScript now knows element has value property
            console.log(element.value);
          }
        }
      </pattern>

      <real_example lang="typescript" title="From flavorable.ts">
        while (current) {
          // Check if current node is an Element and has flavor attribute
          if (current instanceof Element && current.hasAttribute("flavor")) {
            return current;
          }

          // Move to parent (handles both regular DOM and Shadow DOM)
          if (current instanceof ShadowRoot) {
            current = current.host;
          } else if (current instanceof Element) {
            current = current.parentNode;
          } else {
            break;
          }
        }
      </real_example>

      <why>
        Type narrowing logic can be confusing. Comments explain the intent behind type guards and instanceof checks.
      </why>

      <reference type="source_file" path="flavorable.ts" lines="197-217">
        Type narrowing example
      </reference>
    </type_narrowing_comments>

</typescript_type_annotations>

<documentation_patterns id="ICD-DP">
<file_header_documentation id="ICD-DP-FHD">

<summary>
Every file SHOULD start with a JSDoc comment explaining the file's purpose.
</summary>

      <pattern lang="typescript">
        /**
         * Component Name / Module Name
         *
         * Brief description of what this file contains and its purpose
         * in the design system architecture.
         *
         * @module path/to/module
         */

        import statements...
      </pattern>

      <real_example lang="typescript" title="From flavorable.ts">
        /**
         * Flavorable Mixin
         *
         * Adds flavor inheritance functionality to Sando Web Components.
         * This mixin enables components to inherit flavor from ancestor elements,
         * implementing the core "flavor philosophy" of the Sando Design System.
         *
         * @example
         * ```typescript
         * import { LitElement } from 'lit';
         * import { customElement } from 'lit/decorators.js';
         * import { FlavorableMixin } from '../../mixins/flavorable.js';
         *
         * @customElement('my-component')
         * export class MyComponent extends FlavorableMixin(LitElement) {
         *   // Component automatically has flavor property and inheritance
         * }
         * ```
         */
      </real_example>

      <why>
        File headers provide high-level context. New developers can understand a file's purpose without reading implementation.
      </why>

      <reference type="source_file" path="flavorable.ts" lines="1-37">
        File header example
      </reference>
    </file_header_documentation>

    <interface_type_documentation id="ICD-DP-ITD">
      <summary>
        All exported interfaces and types MUST have JSDoc with property descriptions.
      </summary>

      <pattern lang="typescript">
        /**
         * Interface description explaining what this represents.
         *
         * @example
         * ```typescript
         * const config: InterfaceName = {
         *   property1: 'value',
         *   property2: true
         * };
         * ```
         */
        export interface InterfaceName {
          /**
           * Description of property1
           * @default 'defaultValue'
           */
          property1: string;

          /**
           * Description of property2
           */
          property2: boolean;

          /**
           * Optional property description
           */
          property3?: number;
        }

        /**
         * Type description explaining allowed values and usage.
         *
         * - `value1`: Description of what this value means
         * - `value2`: Description of what this value means
         *
         * @example
         * ```typescript
         * const myValue: TypeName = 'value1';
         * ```
         */
        export type TypeName = "value1" | "value2" | "value3";
      </pattern>

      <real_example lang="typescript" title="From flavorable.ts">
        /**
         * Interface for Flavorable components
         */
        export interface FlavorableInterface {
          /**
           * Design system flavor/theme
           * @default 'original'
           */
          flavor: string;

          /**
           * Get the effective flavor (explicit or inherited)
           */
          readonly effectiveFlavor: string;
        }

        /**
         * Type helper for components using FlavorableMixin
         *
         * @example
         * ```typescript
         * export class MyButton extends FlavorableMixin(LitElement) {
         *   // TypeScript knows about flavor property and effectiveFlavor getter
         * }
         *
         * // Type assertion helper
         * const button = document.querySelector('my-button') as Flavorable<MyButton>;
         * console.log(button.effectiveFlavor);
         * ```
         */
        export type Flavorable<T = LitElement> = T & FlavorableInterface;
      </real_example>

      <why>
        Interfaces are contracts. Every property needs explanation. Examples show typical usage patterns.
      </why>

      <reference type="source_file" path="flavorable.ts" lines="42-61, 244-258">
        Interface and type examples
      </reference>
    </interface_type_documentation>

    <build_script_documentation id="ICD-DP-BSD">
      <summary>
        Build scripts (JavaScript/Node.js) MUST use JSDoc with type hints for IDE support.
      </summary>

      <pattern lang="javascript">
        /**
         * Function description
         *
         * @param {Object} options - Options object
         * @param {string} options.name - Option description
         * @param {boolean} [options.verbose] - Optional option (note square brackets)
         * @returns {Promise<Object>} Return value description
         */
        export async function buildFunction(options) {
          const { name, verbose = false } = options;
          // Implementation
        }

        /**
         * @typedef {Object} ConfigType
         * @property {string} name - Config property
         * @property {number} value - Config value
         */

        /**
         * Function using typedef
         * @param {ConfigType} config - Configuration object
         * @returns {boolean} Success status
         */
        export function processConfig(config) {
          // Implementation
        }
      </pattern>

      <real_example lang="javascript" title="From orchestrator.js">
        /**
         * Build all token layers
         * @param {Object} options - Build options
         * @param {Array} options.layers - Layer configurations
         * @param {boolean} options.force - Force rebuild ignoring cache
         * @param {boolean} options.verbose - Show verbose output
         * @returns {Promise<Object>} Build results for all layers
         */
        export async function buildAllLayers(options) {
          const { layers, force = false, verbose = false } = options;
          // Implementation
        }

        /**
         * Validate build results
         * @param {Object} results - Build results from all layers
         * @returns {boolean} True if all builds succeeded
         */
        export function validateBuildResults(results) {
          return Object.values(results).every((result) => result.success);
        }
      </real_example>

      <why>
        JavaScript lacks TypeScript's type system. JSDoc provides type hints for IDEs and documents parameter shapes.
      </why>

      <reference type="source_file" path="orchestrator.js" lines="11-64">
        JavaScript JSDoc examples
      </reference>
    </build_script_documentation>

</documentation_patterns>

<inline_comment_best_practices id="ICD-ICBP">
<when_to_comment id="ICD-ICBP-WTC">
<do_comment>
<item>Complex algorithms or logic</item>
<item>Workarounds for bugs or browser issues</item>
<item>Performance optimizations</item>
<item>Non-obvious behavior or side effects</item>
<item>Critical code that must not be changed without understanding</item>
<item>TODO items with issue references</item>
</do_comment>

      <dont_comment>
        <item>Obvious code (let x = 5; // Set x to 5)</item>
        <item>Repeating what code does without explaining why</item>
        <item>Code that can be improved to be self-explanatory</item>
        <item>Commented-out code (delete it instead)</item>
      </dont_comment>
    </when_to_comment>

    <comment_style id="ICD-ICBP-CS">
      <good_comments title="Explain WHY" lang="typescript">
        // Use MutationObserver for performance (faster than polling)
        const observer = new MutationObserver(callback);

        // Debounce to prevent excessive API calls
        const debouncedSearch = debounce(searchFunction, 300);

        // Cache result for repeat queries (60% perf improvement in tests)
        const cachedData = memoize(expensiveFunction);
      </good_comments>

      <bad_comments title="Explain WHAT (code already shows this)" lang="typescript">
        // Create observer
        const observer = new MutationObserver(callback);

        // Call debounce function
        const debouncedSearch = debounce(searchFunction, 300);

        // Memoize the function
        const cachedData = memoize(expensiveFunction);
      </bad_comments>
    </comment_style>

    <todo_comments id="ICD-ICBP-TODO">
      <summary>
        Use TODO comments with issue references.
      </summary>

      <examples lang="typescript">
        // TODO(#123): Implement keyboard navigation for nested menus
        // FIXME(#456): Safari focus bug when dialog opens
        // HACK: Workaround for IE11 Promise support - remove when IE11 dropped
        // NOTE: This approach is temporary until Web Components v2 ships
      </examples>

      <format>
        KEYWORD(issue-ref): Description
      </format>

      <keywords>
        <keyword name="TODO">Feature to implement</keyword>
        <keyword name="FIXME">Known bug to fix</keyword>
        <keyword name="HACK">Temporary workaround</keyword>
        <keyword name="NOTE">Important context</keyword>
      </keywords>
    </todo_comments>

</inline_comment_best_practices>

<validation_checklist id="ICD-VC">
<public_api_documentation id="ICD-VC-PAD">
<checks>
<check>All exported functions have JSDoc</check>
<check>All exported classes have JSDoc</check>
<check>All public methods have JSDoc</check>
<check>All @property decorators have JSDoc with @default</check>
<check>Complex properties have @example</check>
<check>JSDoc includes @param for all parameters</check>
<check>JSDoc includes @returns for non-void returns</check>
<check>JSDoc includes @throws for exceptions</check>
</checks>
</public_api_documentation>

    <type_annotations id="ICD-VC-TA">
      <checks>
        <check>All function parameters have explicit types</check>
        <check>All functions have explicit return types</check>
        <check>No implicit any types (TypeScript strict mode)</check>
        <check>Type narrowing logic is commented</check>
        <check>Complex types have JSDoc explanations</check>
      </checks>
    </type_annotations>

    <private_internal_code id="ICD-VC-PIC">
      <checks>
        <check>Private methods have JSDoc with @private</check>
        <check>Private properties have "Internal:" prefix</check>
        <check>Lifecycle methods have "Lifecycle:" prefix</check>
        <check>Complex internal logic has inline comments</check>
      </checks>
    </private_internal_code>

    <code_quality id="ICD-VC-CQ">
      <checks>
        <check>Comments explain WHY not WHAT</check>
        <check>No commented-out code</check>
        <check>TODO comments have issue references</check>
        <check>Examples in JSDoc are tested and working</check>
        <check>File header explains module purpose</check>
      </checks>
    </code_quality>

</validation_checklist>

<related_guidelines id="ICD-RG">
<reference type="guideline" doc_id="API" file="./API_REFERENCE.md">
External API documentation format
</reference>
<reference type="guideline" doc_id="CS" file="../03-development/CODE_STYLE.md">
TypeScript and code organization
</reference>
<reference type="guideline" doc_id="NC" file="../03-development/NAMING_CONVENTIONS.md">
Variable and type naming
</reference>
</related_guidelines>

<external_references id="ICD-ER">
<category name="JSDoc">
<reference url="https://jsdoc.app/">JSDoc Official - Complete tag reference</reference>
<reference url="https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html">TypeScript JSDoc - JSDoc in TypeScript</reference>
</category>

    <category name="TypeScript">
      <reference url="https://www.typescriptlang.org/docs/handbook/intro.html">TypeScript Handbook - Type system guide</reference>
      <reference url="https://www.typescriptlang.org/tsconfig#strict">Strict Mode - Strict compiler options</reference>
    </category>

    <category name="Best Practices">
      <reference url="https://google.github.io/styleguide/tsguide.html">Google TypeScript Style Guide - Documentation standards</reference>
      <reference url="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882">Clean Code - Chapter on comments</reference>
    </category>

</external_references>

  <changelog id="ICD-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline creation</change>
      <change type="IMPROVED">5 Core Rules: public API JSDoc, property JSDoc with @default, private documentation with @private, lifecycle method docs, complex logic inline comments</change>
      <change type="IMPROVED">JSDoc tag reference: essential tags (@param, @returns, @throws, @example, @default, @deprecated) and advanced tags (@private, @readonly, @see, @since, @experimental)</change>
      <change type="IMPROVED">TypeScript type annotations: explicit return types, parameter types, type narrowing comments</change>
      <change type="IMPROVED">Documentation patterns: file headers, interface/type docs, build script docs (JavaScript)</change>
      <change type="IMPROVED">Inline comment best practices: when to comment, comment style (WHY not WHAT), TODO format</change>
      <change type="IMPROVED">Validation checklist: public API, type annotations, private/internal, code quality</change>
      <change type="NOTE">References to flavorable.ts (lines 1-259), orchestrator.js (lines 11-64), sando-button.ts</change>
      <change type="NOTE">Agent-optimized XML format for token efficiency</change>
      <change type="NOTE">Code is read more often than it's written. Invest in documentation that helps future readers (including yourself) understand the code quickly.</change>
    </version>
  </changelog>

</guideline>
