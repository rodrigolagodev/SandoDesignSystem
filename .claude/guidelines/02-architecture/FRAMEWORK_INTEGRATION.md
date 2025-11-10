<guideline doc_id="FI" category="02-architecture" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Ecosystem Integration Agent">

  <purpose id="FI-PU">
    Defines how Sando Web Components integrate with React, Vue, Angular, and Svelte. This includes TypeScript configuration, event handling, prop passing, SSR considerations, and framework-specific patterns that ensure components work seamlessly in any framework.
  </purpose>

<core_rules id="FI-CR">

    <rule id="FI-CR-R1" title="Framework-Agnostic Web Components">
      <summary>
        Sando components are framework-agnostic by design. They work in ANY framework because they follow the Web Components standard.
      </summary>

      <why>
        <reason name="Universal">One codebase, all frameworks</reason>
        <reason name="Future-proof">Standard-based, not tied to framework versions</reason>
        <reason name="Encapsulated">Shadow DOM prevents style leaks</reason>
        <reason name="Interoperable">Can mix React, Vue, and vanilla components</reason>
      </why>

      <pattern lang="html">
        <!-- Same component works everywhere -->
        <!-- Vanilla HTML -->
        <sando-button variant="solid">Click me</sando-button>

        <!-- React -->
        <sando-button variant="solid">Click me</sando-button>

        <!-- Vue -->
        <sando-button variant="solid">Click me</sando-button>

        <!-- Angular -->
        <sando-button variant="solid">Click me</sando-button>

        <!-- Svelte -->
        <sando-button variant="solid">Click me</sando-button>
      </pattern>

      <anti_pattern lang="typescript">
        // WRONG: Framework-specific components
        @sando/react     // Separate React wrappers
        @sando/vue       // Separate Vue wrappers
        // Maintenance nightmare, duplication
      </anti_pattern>
    </rule>

    <rule id="FI-CR-R2" title="Import Before Use">
      <summary>
        All frameworks require importing the component before use (side-effect import for registration).
      </summary>

      <pattern lang="typescript">
        // Import component (registers custom element)
        import "@sando/components/button";

        // Now <sando-button> is available in templates
      </pattern>

      <why>
        Web Components must be registered before the browser can use them. Importing triggers registration.
      </why>

      <anti_pattern lang="typescript">
        // WRONG: Not importing
        // <sando-button> used in template without import
        // Browser doesn't know what <sando-button> is
      </anti_pattern>
    </rule>

    <rule id="FI-CR-R3" title="Properties vs Attributes">
      <summary>
        Understand the difference: Properties (JS objects) vs Attributes (HTML strings).
      </summary>

      <properties_definition>
        <purpose>Complex data (objects, arrays)</purpose>
        <example lang="javascript">
          const button = document.querySelector("sando-button");
          button.options = { variant: "solid", size: "medium" }; // Object
        </example>
      </properties_definition>

      <attributes_definition>
        <purpose>Simple data (strings, numbers, booleans)</purpose>
        <example lang="html">
          <sando-button variant="solid" size="medium"></sando-button>
        </example>
      </attributes_definition>

      <lit_convention>
        Use `reflect: true` to sync prop ↔ attribute for simple values (strings, numbers, booleans).
      </lit_convention>

      <component_pattern lang="typescript">
        @property({ reflect: true })
        variant: 'solid' | 'outline' = 'solid';  // ↔ Syncs to attribute

        @property({ type: Boolean, reflect: true })
        disabled = false;  // ↔ Syncs to attribute
      </component_pattern>

      <framework_impact>
        <framework name="React">Can't pass objects as attributes (use refs)</framework>
        <framework name="Vue">Can use `v-bind` for properties</framework>
        <framework name="Angular">Use property binding `[disabled]`</framework>
        <framework name="Svelte">Can pass objects directly</framework>
      </framework_impact>
    </rule>

    <rule id="FI-CR-R4" title="Event Handling">
      <summary>
        Web Components dispatch custom events. Each framework has its own event handling syntax.
      </summary>

      <event_dispatch_pattern lang="typescript">
        // Component dispatches custom event
        this.dispatchEvent(
          new CustomEvent("button-click", {
            detail: { value: "data" },
            bubbles: true,
            composed: true, // ✓ Crosses shadow boundary
          })
        );
      </event_dispatch_pattern>

      <framework_patterns>
        <framework name="React" syntax="addEventListener">
          buttonRef.current.addEventListener('button-click', handler);
        </framework>
        <framework name="Vue" syntax="@event-name">
          <sando-button @button-click="handler"></sando-button>
        </framework>
        <framework name="Angular" syntax="(eventName)">
          <sando-button (button-click)="handler($event)"></sando-button>
        </framework>
        <framework name="Svelte" syntax="on:event-name">
          <sando-button on:button-click={handler}></sando-button>
        </framework>
      </framework_patterns>

      <why>
        Events must use `composed: true` to cross Shadow DOM boundary and reach framework listeners.
      </why>
    </rule>

    <rule id="FI-CR-R5" title="TypeScript Support">
      <summary>
        Provide TypeScript definitions for all components to enable autocomplete and type checking.
      </summary>

      <global_types_pattern lang="typescript">
        declare global {
          interface HTMLElementTagNameMap {
            "sando-button": SandoButton;
            "sando-card": SandoCard;
          }
        }

        // JSX types (React)
        declare namespace JSX {
          interface IntrinsicElements {
            "sando-button": React.DetailedHTMLProps<
              React.HTMLAttributes<SandoButton>,
              SandoButton
            >;
          }
        }
      </global_types_pattern>

      <benefit>
        IDEs provide autocomplete for component props and events.
      </benefit>
    </rule>

</core_rules>

<react_integration id="FI-REACT">

    <basic_setup>
      <pattern lang="typescript">
        // 1. Import component
        import '@sando/components/button';

        // 2. Use in JSX
        function App() {
          return <sando-button variant="solid">Click me</sando-button>;
        }
      </pattern>
    </basic_setup>

    <typescript_support>
      <file_path>src/types/web-components.d.ts</file_path>
      <pattern lang="typescript">
        import { SandoButton } from "@sando/components/button";

        declare global {
          namespace JSX {
            interface IntrinsicElements {
              "sando-button": React.DetailedHTMLProps<
                React.HTMLAttributes<SandoButton> & {
                  variant?: "solid" | "outline" | "ghost";
                  size?: "small" | "medium" | "large";
                  disabled?: boolean;
                },
                SandoButton
              >;
            }
          }
        }
      </pattern>
      <benefit>Autocomplete and type checking in JSX</benefit>
    </typescript_support>

    <event_handling>
      <approach>Use refs + addEventListener</approach>
      <pattern lang="typescript">
        import { useRef, useEffect } from 'react';

        function App() {
          const buttonRef = useRef<HTMLElement>(null);

          useEffect(() => {
            const button = buttonRef.current;
            if (!button) return;

            const handler = (e: Event) => {
              const customEvent = e as CustomEvent;
              console.log('Clicked:', customEvent.detail);
            };

            button.addEventListener('button-click', handler);
            return () => button.removeEventListener('button-click', handler);
          }, []);

          return <sando-button ref={buttonRef}>Click me</sando-button>;
        }
      </pattern>
      <why>React's synthetic events don't capture custom events. Must use native addEventListener.</why>
    </event_handling>

    <complex_props>
      <approach>Use refs to set properties</approach>
      <pattern lang="typescript">
        import { useRef, useEffect } from 'react';

        function App() {
          const componentRef = useRef<any>(null);

          useEffect(() => {
            if (componentRef.current) {
              componentRef.current.complexData = { /* object */ };
            }
          }, []);

          return <sando-component ref={componentRef}></sando-component>;
        }
      </pattern>
      <why>Can't pass objects as attributes in React. Must set as property via ref.</why>
    </complex_props>

</react_integration>

<vue_integration id="FI-VUE">

    <basic_setup>
      <config_file>vite.config.ts</config_file>
      <pattern lang="typescript">
        import { defineConfig } from "vite";
        import vue from "@vitejs/plugin-vue";

        export default defineConfig({
          plugins: [
            vue({
              template: {
                compilerOptions: {
                  // Treat all tags starting with 'sando-' as custom elements
                  isCustomElement: (tag) => tag.startsWith("sando-"),
                },
              },
            }),
          ],
        });
      </pattern>
      <why>Tells Vue compiler to not treat `sando-*` as Vue components</why>
    </basic_setup>

    <template_usage>
      <pattern lang="vue">
        <script setup lang="ts">
        import "@sando/components/button";

        function handleClick(e: CustomEvent) {
          console.log("Clicked:", e.detail);
        }
        </script>

        <template>
          <sando-button variant="solid" @button-click="handleClick">
            Click me
          </sando-button>
        </template>
      </pattern>
      <advantages>
        <advantage>`@event-name` syntax for custom events</advantage>
        <advantage>`v-bind` for properties</advantage>
        <advantage>`v-model` can work with custom events</advantage>
      </advantages>
    </template_usage>

    <typescript_support>
      <file_path>src/types/web-components.d.ts</file_path>
      <pattern lang="typescript">
        import { SandoButton } from "@sando/components/button";

        declare module "@vue/runtime-core" {
          interface GlobalComponents {
            "sando-button": typeof SandoButton;
          }
        }
      </pattern>
    </typescript_support>

    <vmodel_support>
      <usage lang="vue">
        <!-- Component with value prop + value-changed event -->
        <sando-input v-model="text"></sando-input>

        <!-- Equivalent to: -->
        <sando-input
          :value="text"
          @value-changed="text = $event.detail.value"
        ></sando-input>
      </usage>

      <component_implementation lang="typescript">
        @property({ reflect: true })
        value = '';

        private handleInput(e: Event) {
          this.value = (e.target as HTMLInputElement).value;
          this.dispatchEvent(new CustomEvent('value-changed', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
          }));
        }
      </component_implementation>
    </vmodel_support>

</vue_integration>

<angular_integration id="FI-ANGULAR">

    <basic_setup>
      <file_path>app.module.ts</file_path>
      <pattern lang="typescript">
        import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

        @NgModule({
          schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✓ Allow custom elements
          // ...
        })
        export class AppModule {}
      </pattern>
      <why>Tells Angular compiler to allow unknown HTML tags (Web Components)</why>
    </basic_setup>

    <template_usage>
      <pattern lang="typescript">
        // app.component.ts
        import { Component, OnInit } from "@angular/core";
        import "@sando/components/button"; // ✓ Import for registration

        @Component({
          selector: "app-root",
          template: `
            <sando-button variant="solid" (button-click)="handleClick($event)">
              Click me
            </sando-button>
          `,
        })
        export class AppComponent {
          handleClick(event: Event) {
            const customEvent = event as CustomEvent;
            console.log("Clicked:", customEvent.detail);
          }
        }
      </pattern>
      <event_syntax>(event-name) for custom events</event_syntax>
    </template_usage>

    <property_binding>
      <pattern lang="html">
        <!-- Property binding (not attribute) -->
        <sando-component
          [complexData]="myObject"
          [disabled]="isDisabled"
        ></sando-component>
      </pattern>
      <why>[prop] binds to property (JS), not attribute (HTML string)</why>
    </property_binding>

    <typescript_support>
      <file_path>typings.d.ts</file_path>
      <pattern lang="typescript">
        declare global {
          interface HTMLElementTagNameMap {
            "sando-button": any; // Or import actual type
          }
        }
      </pattern>
    </typescript_support>

</angular_integration>

<svelte_integration id="FI-SVELTE">

    <basic_setup>
      <note>Svelte works out of the box with Web Components. No special configuration needed.</note>
      <pattern lang="svelte">
        <script lang="ts">
          import '@sando/components/button';

          function handleClick(e: CustomEvent) {
            console.log('Clicked:', e.detail);
          }
        </script>

        <sando-button
          variant="solid"
          on:button-click={handleClick}
        >
          Click me
        </sando-button>
      </pattern>
      <advantages>
        <advantage>No special config needed</advantage>
        <advantage>`on:event-name` for custom events</advantage>
        <advantage>Can pass objects as props directly</advantage>
        <advantage>Full TypeScript support</advantage>
      </advantages>
    </basic_setup>

    <typescript_support>
      <file_path>src/ambient.d.ts</file_path>
      <pattern lang="typescript">
        declare namespace svelteHTML {
          interface IntrinsicElements {
            "sando-button": {
              variant?: "solid" | "outline" | "ghost";
              size?: "small" | "medium" | "large";
              disabled?: boolean;
            };
          }
        }
      </pattern>
    </typescript_support>

    <property_binding>
      <pattern lang="svelte">
        <script>
          import '@sando/components/input';

          let value = '';
        </script>

        <!-- Two-way binding -->
        <sando-input
          bind:value={value}
          on:value-changed={(e) => value = e.detail.value}
        ></sando-input>

        <p>Value: {value}</p>
      </pattern>
    </property_binding>

</svelte_integration>

<ssr_considerations id="FI-SSR">

<summary>
Web Components don't render server-side by default. They require JavaScript to run.
</summary>

    <strategies>

      <strategy id="FI-SSR-S1" name="Declarative Shadow DOM" status="experimental">
        <pattern lang="html">
          <sando-button>
            <template shadowroot="open">
              <!-- Shadow DOM content rendered server-side -->
            </template>
            Click me
          </sando-button>
        </pattern>
      </strategy>

      <strategy id="FI-SSR-S2" name="Client-only rendering">
        <pattern lang="typescript" framework="Next.js">
          import dynamic from "next/dynamic";

          const SandoButton = dynamic(
            () =>
              import("@sando/components/button").then(() => ({
                default: "sando-button",
              })),
            { ssr: false }
          );
        </pattern>
      </strategy>

      <strategy id="FI-SSR-S3" name="Progressive enhancement">
        <pattern lang="html">
          <!-- Content visible before hydration -->
          <sando-button>
            <span slot="fallback">Click me</span>
          </sando-button>
        </pattern>
      </strategy>

    </strategies>

    <recommendation>
      Use client-only rendering for SSR frameworks until Declarative Shadow DOM is widely supported.
    </recommendation>

</ssr_considerations>

<common_patterns id="FI-CP">

    <lazy_loading>
      <pattern lang="typescript">
        // Load component on demand
        async function loadButton() {
          await import("@sando/components/button");
          // <sando-button> now available
        }
      </pattern>
    </lazy_loading>

    <conditional_rendering>
      <framework name="React" lang="tsx">
        {showButton && <sando-button>Click</sando-button>}
      </framework>
      <framework name="Vue" lang="vue">
        <sando-button v-if="showButton">Click</sando-button>
      </framework>
      <framework name="Angular" lang="html">
        <sando-button *ngIf="showButton">Click</sando-button>
      </framework>
      <framework name="Svelte" lang="svelte">
        {#if showButton}
          <sando-button>Click</sando-button>
        {/if}
      </framework>
    </conditional_rendering>

    <slots>
      <summary>All frameworks support slots for content projection</summary>
      <pattern lang="html">
        <!-- Named slots -->
        <sando-card>
          <span slot="header">Title</span>
          <p>Content goes here</p>
          <div slot="footer">Actions</div>
        </sando-card>
      </pattern>
      <framework_specific>
        <framework name="React" lang="jsx">
          <sando-card>
            <span slot="header">Title</span>
            <p>Content</p>
          </sando-card>
        </framework>
        <framework name="Vue" lang="vue">
          <sando-card>
            <template v-slot:header>
              <span>Title</span>
            </template>
            <p>Content</p>
          </sando-card>
        </framework>
      </framework_specific>
    </slots>

</common_patterns>

  <validation id="FI-V">

    <general_setup>
      <item status="required">Web Components imported before use</item>
      <item status="required">Components registered (check in browser console)</item>
      <item status="required">TypeScript definitions created</item>
      <item status="required">Event handlers working</item>
      <item status="required">Slots working correctly</item>
    </general_setup>

    <react_checklist>
      <item status="required">TypeScript JSX definitions created</item>
      <item status="required">Events handled via refs + addEventListener</item>
      <item status="required">Complex props passed via refs</item>
    </react_checklist>

    <vue_checklist>
      <item status="required">`isCustomElement` configured in vite.config</item>
      <item status="required">Custom events work with `@event-name`</item>
      <item status="required">TypeScript GlobalComponents declared</item>
      <item status="optional">v-model works if implemented</item>
    </vue_checklist>

    <angular_checklist>
      <item status="required">`CUSTOM_ELEMENTS_SCHEMA` added to module</item>
      <item status="required">Custom events work with `(event-name)`</item>
      <item status="required">Property binding works with `[prop]`</item>
      <item status="required">TypeScript HTMLElementTagNameMap declared</item>
    </angular_checklist>

    <svelte_checklist>
      <item status="required">No config needed (works out of box)</item>
      <item status="required">Custom events work with `on:event-name`</item>
      <item status="required">TypeScript svelteHTML declared</item>
      <item status="required">Props passed directly</item>
    </svelte_checklist>

  </validation>

<related_guidelines id="FI-RG">
<reference
      type="guideline"
      doc_id="CA"
      file="COMPONENT_ARCHITECTURE.md"
      category="02-architecture">
Component structure, Shadow DOM, event patterns
</reference>

    <reference
      type="guideline"
      doc_id="CD"
      file="../01-design-system/COMPONENT_DESIGN.md"
      category="01-design-system">
      Component API conventions
    </reference>

    <reference
      type="guideline"
      doc_id="MS"
      file="MONOREPO_STRUCTURE.md"
      category="02-architecture">
      Package exports, build system
    </reference>

</related_guidelines>

<external_references id="FI-ER">
<reference
      type="standard"
      url="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
      title="Web Components - MDN">
Web Components standard documentation
</reference>

    <reference
      type="tool"
      url="https://custom-elements-everywhere.com/"
      title="Custom Elements Everywhere">
      Framework compatibility tests
    </reference>

    <reference
      type="documentation"
      url="https://lit.dev/docs/frameworks/overview/"
      title="Lit - Framework Integration">
      Official Lit framework integration guide
    </reference>

    <reference
      type="documentation"
      url="https://react.dev/reference/react-dom/components#custom-html-elements"
      title="React - Web Components">
      React Web Components documentation
    </reference>

    <reference
      type="documentation"
      url="https://vuejs.org/guide/extras/web-components.html"
      title="Vue - Web Components">
      Vue Web Components integration
    </reference>

    <reference
      type="documentation"
      url="https://angular.io/guide/elements"
      title="Angular - Web Components">
      Angular Elements guide
    </reference>

</external_references>

  <changelog id="FI-CL">
    <version number="1.0.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="INITIAL">Initial framework integration guideline</change>
      <change type="NEW">React, Vue 3, Angular, Svelte patterns</change>
      <change type="NEW">TypeScript support for each framework</change>
      <change type="NEW">Event handling patterns</change>
      <change type="NEW">SSR considerations</change>
      <change type="NEW">Common patterns and examples</change>
    </version>
  </changelog>

  <conclusion>
    This guideline ensures Sando Web Components work seamlessly across all major frameworks. The key principle: components are framework-agnostic by design, with framework-specific configuration for optimal integration.
  </conclusion>

</guideline>
